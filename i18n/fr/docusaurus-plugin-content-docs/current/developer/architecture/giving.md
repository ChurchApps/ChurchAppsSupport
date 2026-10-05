---
title: "Architecture des dons"
---

# Architecture des dons

<div class="article-intro">

ChurchApps exécute les dons sur un modèle de passerelle-rail : l'église garde son propre compte Stripe (ou PayPal, Kingdom Funding ou Paystack), et B1 ne s'assoit jamais dans le chemin de l'argent en tant que processeur de plateforme. Les données de carte sont tokenisées dans le navigateur et ne atteignent jamais un serveur ChurchApps. Cette page cartographie la pile complète -- le registre de fournisseur du côté client dans `@churchapps/apphelper`, l'abstraction de passerelle GivingApi, le modèle de données de donation et comment les webhooks de passerelle se réconcilient dans la base de données.

</div>

## Aperçu

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module             │──────────────┘                │
│  DonateController → GatewayService      │                               │
│  → GatewayFactory → IGatewayProvider    │◀──────────────────────────────┘
│  donations · funds · subscriptions · …  │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Trois principes tiennent sur toute la pile :

1. **La passerelle tient la carte.** Le widget d'entrée de chaque fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un jeton, un nonce ou un ID de commande.
2. **Une abstraction, de nombreux fournisseurs.** Le navigateur résout un `PaymentProvider` à partir d'un registre ; le serveur résout un `IGatewayProvider` à partir d'une usine. Les deux appellent par le même nom de fournisseur normalisé stocké sur l'enregistrement de passerelle.
3. **Les webhooks sont la source de vérité pour le règlement.** Une réponse de charge est enregistrée de manière optimiste, mais le webhook signé de la passerelle est ce qui confirme (ou crée) la donation complétée, avec des gardes d'idempotence des deux côtés.

## Côté client : le registre de fournisseur de paiement (`@churchapps/apphelper`)

Le registre vit dans `Packages/apphelper/src/donations/providers/`, avec les widgets et les aides de chaque fournisseur sous son propre dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- rien en dehors de `providers/` se branche sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce qu'une application hôte a besoin pour une passerelle : un `descriptor` (étiquettes administrateur, devises supportées, champs de frais, taux de frais par défaut, URLs de tableau de bord/inscription), un drapeau `capabilities` (cartes enregistrées, ACH, récurrent, entrée de nouvelle carte en ligne, enregistrement implicite-sur-tokenize), les widgets React pour l'entrée de membre (`MemberWrapper`/`MemberEntry`), les dons d'invités (`GuestForm`), l'édition de méthode enregistrée (`MethodEditForm`) et les paiements de questions de formulaire (`FormPayment`), plus `buildChargeRequest(ctx, token)` -- l'endroit où la forme de la charge diffère par fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique de l'enregistrement de passerelle, afin que les applications hôtes ne importent jamais un SDK de passerelle (B1App et B1Admin n'ont pas de dépendance `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise laquelle des passerelles d'une église une surface doit utiliser.

`providers/registry.ts` tient les intégrés. Ils sont **référencés par valeur**, pas enregistrés via un effet secondaire du module, donc l'arbre-secouage d'un bundler ne peut jamais laisser tomber l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonction | Objectif |
|----------|---------|
| `getPaymentProvider(name)` | Résoudre par nom normalisé ; se replie sur Stripe pour qu'une passerelle mal configurée ne dépanne jamais durement le formulaire du donateur |
| `registerPaymentProvider(p)` | Enregistrer un fournisseur supplémentaire à l'exécution (pour une passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumérer les intégrés + personnalisé -- utilisé pour construire le menu déroulant de la passerelle administrateur |
| `hasPaymentProvider(name)` | Vérification de l'adhésion |

**Fournisseurs intégrés du client : Stripe, PayPal, Kingdom Funding, Paystack.** B1App et B1Admin seulement *lisent* le registre (`getPaymentProvider`, `listPaymentProviders`) ; ni n'appelle `registerPaymentProvider` -- l'enregistrement reste à l'intérieur d'apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte hors de B1 :

| Fournisseur | Widget d'entrée | Jeton retourné à l'API |
|-------------|----------------|----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` ; le formulaire d'invité monte également un `ExpressCheckoutElement` (Apple Pay / Google Pay, cadeaux uniques) dont `onConfirm` se résout en le même ID `pm_…` | ID de méthode de paiement (`pm_…`) ; banque via `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` pour les passerelles USD, Canadian PAD `acss_debit` (modal de mandat hébergé, mandat `default_for` factures/souscriptions, les charges uniques transmettent l'ID du mandat) pour les passerelles CAD |
| Kingdom Funding | Formulaire de tokenizer hébergé clé par la clé publique de la passerelle | Nonce d'usage unique |
| PayPal | Champs hébergés PayPal (carte, récurrente) plus boutons intelligents PayPal avec financement Venmo (uniques) ; les deux partagent un chargement SDK et la commande serveur via `/donate/client-token` + `/donate/create-order` | ID de commande capturé |
| Paystack | Popup en ligne Paystack (`js.paystack.co/v2/inline.js`) -- la popup elle-même prend le paiement (carte, argent mobile, virement bancaire, USSD) | Référence de transaction payée ; les méthodes enregistrées sont les codes d'autorisation Paystack `AUTH_…` |

Le `finalizeResult` de Stripe exécute 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que la donation soit considérée comme complète ; le formulaire partagé appelle juste `provider.finalizeResult(result)` sans connaissance de ce qu'il fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; la plomberie de passerelle vit dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement à un SDK de passerelle -- elle passe par `GatewayService`, qui résout le bon `IGatewayProvider` de `GatewayFactory` et lui remet une `GatewayConfig` déchiffrée.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente -- cycle de vie du webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion de méthode enregistrée (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) et suppléments optionnels (clients, commandes, SetupIntents, relecture d'événement, `retryFailedPayment` pour une facture de souscription échouée, `registerPaymentMethodDomain` pour la vérification de domaine Apple Pay). Un fournisseur qui omet un crochet optionnel est rapporté comme non pris en charge pour cette action et l'interface cache le contrôle. Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises supportées, ACH, remboursements, exigences de souscription, limites de transaction) -- `GatewayService.getProviderCapabilities(provider)` le lit juste -- et les drapeaux comme `logsDonationsImmediately` conduisent le comportement du contrôleur sans aucune conditionnelle de nom de fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|-------------|-------------|
| Stripe | Toujours activé |
| PayPal | Toujours activé |
| Kingdom Funding | Toujours activé |
| Paystack | Toujours activé (marchands Nigeria, Ghana, Afrique du Sud, Kenya, Côte d'Ivoire ; devises NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via le drapeau d'environnement `ENABLE_SQUARE` |
| ePayMints | Opt-in via le drapeau d'environnement `ENABLE_EPAYMINTS` |

Paystack diffère des autres en ce que l'argent se déplace avant que GivingApi soit impliqué : la popup charge le donateur, `processCharge` est un `GET /transaction/verify/:reference` dont le montant payé et la devise doivent correspondre à la donation en cours d'enregistrement (une référence déjà sur le dossier n'est jamais enregistrée deux fois), et le premier cadeau d'un plan récurrent est enregistré à partir de `finalizeSubscription` (vérifier → `POST /plan` → `POST /subscription` avec `start_date` un intervalle en dehors). Les webhooks sont signés avec la clé secrète elle-même (`x-paystack-signature`, HMAC-SHA512 sur le corps brut) et Paystack n'a pas d'API de gestion de webhook, donc l'écran d'administrateur affiche l'URL pour que l'église la colle dans son tableau de bord. Les événements de renouvellement `charge.success` ne portent pas de répartition de fonds ; le fournisseur la récupère à partir des lignes locales `subscriptions`/`subscriptionFunds` du donateur. Seules les autorisations de carte sont `réutilisables` -- les cadeaux d'argent mobile sont une seule fois, donc `createSubscription` les refuse. Les données de démonstration amorce une deuxième église (Accra Community Church, `CHU00000002`) sur une passerelle Paystack mode test GHS pour que la suite Playwright Paystack s'exécute à côté de celle de Grace Stripe.

Les fournisseurs personnalisés peuvent être enregistrés à l'exécution quand `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseur sont mis en correspondance insensibles à la casse.

### Configuration de passerelle et secrets

Un administrateur enregistre les credentials de passerelle via `POST /giving/gateways` (`GatewayController`). À la sauvegarde, le contrôleur chiffre les clés privées et webhook avec `EncryptionHelper` avant la persistance, puis -- sur tout hôte non-localhost -- supprime le webhook existant de l'église et provisionne un nouveau pointé à `/giving/donate/webhook/{provider}?churchId=…`. Une église garde une ligne par fournisseur : sauvegarder une passerelle remplace uniquement la ligne existante pour ce même fournisseur. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retournent les clés publiques seulement.

## Modèle de données

Le schéma de dons (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Tableau | Rôle |
|--------|------|
| `gateways` | Configuration du fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffrés, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Désignations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour entrée/rapport (`name`, `batchDate`) |
| `donations` | Un cadeau : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded` ; les relevés, les totaux, les tableaux de bord et les rapports de dons comptent seulement `complete` ou null), `transactionId` |
| `fundDonations` | Allocation d'une donation sur un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'ID de souscription de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition des fonds pour un don récurrent |
| `customers` | Lie un `personId` à son ID de client de passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes/banques enregistrées : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit et clé de dédup webhook/événement (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesses liées à un fonds et montant promis de chaque personne |

Une donation est répartie sur les fonds via `fundDonations` -- la donation porte le total, chaque `fundDonation` porte une tranche. `donations.currency` et `gateways.currency` portent la devise ISO ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Flux de bout en bout

### Membre ponctuel et récurrent (B1App)

L'écran de don authentifié (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compose trois composants apphelper : `MultiGatewayDonationForm`, `PaymentMethods` et `RecurringDonations`. B1App fait le chargement de données environnant -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- et transmet la liste de passerelle ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. La charge elle-même se produit à l'intérieur d'apphelper : le fournisseur résolu tokenise la méthode (nouvelle ou enregistrée), puis poste à `/giving/donate/charge` pour un cadeau ponctuel ou `/giving/donate/subscribe` pour un récurrent. Les deux points de terminaison attribuent un donateur connecté à leur propre `personId` (seuls les titulaires `donations.edit` peuvent attribuer à quelqu'un d'autre) et rejettent les répartitions de fonds qui s'ajoutent à plus que le montant chargé. Les cadeaux récurrents créent une ligne `subscriptions` plus `subscriptionFunds` et remettent le calendrier à la passerelle (Stripe Subscriptions, Plans de facturation PayPal ou un calendrier KF récurrent).

### Don d'invité / anonyme

La page de don public (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau "give now" affichent `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte d'Éléments de la passerelle autour du `GuestForm` du fournisseur. Les invités n'obtiennent pas de connexion, pas de méthodes enregistrées et pas d'historique. Le flux récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques seulement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur et poste à `/giving/donate/charge` (ou `/subscribe`). ACH invité utilise le `POST /giving/paymentmethods/ach-setup-intent-anon` anonyme.

Trois options de formulaire d'invité chevauchent le même appel de charge. `?fundId=` et `?amount=` sur l'URL de don pré-sélectionnent la répartition des fonds (lue par le formulaire d'invité de chaque fournisseur au montage, routée via le gestionnaire de changement de fonds normal pour que les totaux et les frais se mettent à jour). `anonymous: true` rend `DonateController.charge` rejeter toute personne que le client a envoyée et enregistrer le cadeau avec `personId = null` ; le formulaire d'invité saute `/people/loadOrCreate` et l'étape du client/vault, et les trois fournisseurs avec journal immédiat arrêtent de résoudre une personne du client de la passerelle. Apple Pay a besoin du domaine de la page enregistré auprès de Stripe, donc un formulaire d'invité Stripe poste une fois par session au `POST /giving/donate/register-domain` limité en taux public, qui n'accepte un domaine que s'il appartient à l'église (`<subDomain>.b1.church`, une ligne dans la table de domaines du module de contenu, ou un localhost) avant d'appeler l'API de domaine de méthode de paiement de Stripe.

### Enregistrement administrateur et importation Stripe (B1Admin)

La section des dons B1Admin (`B1Admin/src/donations/`) est où les équipes financières travaillent. L'entrée par lot (`components/BulkDonationEntry.tsx`) enregistre les cadeaux espèces/chèque/in-kind en postant `/giving/donations` puis `/giving/funddonations` -- pas de passerelle impliquée. Les fonds, les lots, les campagnes et les relevés cartographient chacun à leurs itinéraires CRUD `/giving/*`. Le panneau de don de style membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants apphelper que B1App.

Les rapports et les remises comptables sont un travail côté client ou côté exécution de rapport, pas un travail de passerelle : le CSV d'exportation QuickBooks de la page de lot construirait une entrée de journal à partir du lot's `donations` + `fundDonations` (débiter les Fonds non déposés, un crédit par fonds), l'onglet Donateurs lapsés exécute `Api/reports/lapsedGivers.json` via l'exécution générique du rapport avec les noms de personnes résolus par `ReportOutput`, et les formats de reçu du pays (Canada / Australie / Nouvelle-Zélande) sont les paramètres de l'église dans le magasin clé/valeur d'adhésion affichés par `GivingStatementDocument` et dupliqués sur la page d'impression B1App.

### Conversion des totaux en devises mixtes

N'importe quel point de terminaison qui retourne un total combiné unique sur des dons possiblement de devises mixtes -- les KPIs résumé de dons (`GivingKpiCards`), un total de lot de donation, un total de fonds et les totaux année-à-ce-jour/période de l'écran de don B1App -- convertit à la devise par défaut de l'église du côté serveur plutôt que de faire la somme des devises différentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` récupère les taux de `api.frankfurter.dev` clé par la devise de l'église, les met en cache en processus pendant 12 heures et expose `convertTotals(rows, churchCurrency, rates)` : les lignes sont pré-groupées par devise en SQL (une poignée de groupes, jamais une conversion par don), chaque groupe est converti et additionné, et le résultat porte un drapeau `isConverted` que le client utilise pour afficher une note "Converti aux taux de change actuels". Les enregistrements de donation individuels et les rapports historiques/devise d'origine n'ont jamais été convertis -- seulement les totaux combinés l'ont été.

L'importation Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rétrofait les cadeaux effectués en dehors de B1 : elle appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis `dryRun: false` à importer. Le serveur énumère les événements Stripe pour la plage de dates et saute tout ce qui est déjà enregistré -- appairé d'abord par l'ID du fournisseur `eventLogs`, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) pour qu'un ré-exécution n'importe jamais en double.

## Webhooks et réconciliation

Les paiements réglés et les changements d'état de souscription arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est délibérément idempotent :

1. **Vérifier** -- `GatewayService.verifyWebhook` délègue à la vérification de signature du fournisseur ; une signature échouée retourne 401. Les événements qui ne nécessitent pas de traitement prennent un raccourci avec 200.
2. **Dédup l'événement** -- `EventLogRepo.loadByProviderId` saute un webhook déjà enregistré dans `eventLogs`.
3. **Dédup la donation** -- avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifiée contre chaque ID candidat que la charge pourrait porter. Ceci absorbe les livraisons en double, les événements ACH multi-étapes (en attente → réglé) et le cas où `/donate/charge` a déjà enregistré le cadeau de manière optimiste.
4. **Appliquer** -- le `classifyWebhookEvent(eventType)` du fournisseur dit ce que l'événement signifie (`donation` en attente/complète, `cancel-subscription` ou `ignore`) ; les paiements complétés créent une donation `complete` (ou promeuvent une donation `pending` ou `failed` existante), les événements de style ACH atterrissent comme `pending` jusqu'au règlement, une facture de souscription échouée (Stripe `invoice.payment_failed`) crée une donation `failed` clé sur l'ID de facture, et les événements d'annulation suppriment la ligne `subscriptions` locale. Le contrôleur n'inspecte jamais les noms d'événements spécifiques au fournisseur.

### Cadeaux récurrents échoués et avertissement

Une donation `failed` est l'unité de travail pour la récupération. `GET /giving/donations/failed` les énumère avec le message d'échec de passerelle le plus récent de `eventLogs` et un drapeau `canRetry` des capacités de la passerelle ; `POST /giving/donate/retry/:donationId` appelle le `retryFailedPayment` du fournisseur (Stripe paie la facture ouverte), et le webhook résultant promeut la ligne à `complete` via le chemin de dédup normal. Les emails d'avertissement vont au donateur à partir du gestionnaire de webhook le jour 0, puis à partir de `DunningHelper.run` dans le minuteur minuit (câblé dans à la fois `lambda/timer-handler.ts` et `RailwayCron.ts`) aux jours 3 et 7 ; chaque envoi est enregistré dans `eventLogs` comme `provider: "dunning"`, `providerId: "<donationId>:<day>"`, pour qu'un ré-exécution n'envoie jamais de courrier deux fois. Lorsque Stripe abandonne et annule la souscription (`customer.subscription.deleted` avec `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envoie au donateur une fois (`providerId: "<subscriptionId>:canceled"`); les annulations initiées par le donateur ou l'administrateur restent silencieuses. Stripe n'ajoute jamais d'événements à un point de terminaison existant : après modification `StripeHelper.webhookEvents`, soit resauvegarder la passerelle soit exécuter `tools/manual/stripe-webhook-events.ts` (exécution sèche par défaut, `--apply` pour écrire) contre prod.

Les fournisseurs avec `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ont leurs charges enregistrées à partir de la réponse `/charge` (pas de tour de webhook requis pour le chemin heureux), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et ACH `payment_intent.processing`. La gestion des frais (`POST /giving/donate/fee`, le drapeau `payFees` de la passerelle et le `calculateFees` de chaque fournisseur) calcule la "couvrir les frais" augmentation du côté donateur -- B1 ne prend aucune coupure de plateforme, donc pas de frais d'application n'est jamais ajouté.

:::info
Les chemins de charge et de webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui garde un journal de charge optimiste et son webhook plus tard de produire deux donations pour un cadeau.
:::

## Pages connexes

- [Points de terminaison de dons](../api/endpoints/giving) -- surface REST complète pour donations, fonds, lots, passerelles, souscriptions, méthodes de paiement et webhooks
- [AppHelper](../shared-libraries/app-helper) -- le paquet npm qui expédie le registre de fournisseur de paiement et les composants de donation
- [Structure des modules](../api/module-structure) -- comment le module GivingApi est organisé du côté serveur
