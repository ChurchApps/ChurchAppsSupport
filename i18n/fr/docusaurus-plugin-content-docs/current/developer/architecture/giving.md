---
title: "Architecture Giving"
---

# Architecture Giving

<div class="article-intro">

ChurchApps gère les dons selon un modèle de passerelle : l'église conserve son propre compte Stripe (ou PayPal, Kingdom Funding, ou Paystack), et B1 n'intervient jamais dans le circuit de l'argent en tant que processeur de paiement de la plateforme. Les données de carte sont tokenisées dans le navigateur et n'atteignent jamais un serveur ChurchApps. Cette page présente l'ensemble de la pile — le registre des fournisseurs de paiement côté client dans `@churchapps/apphelper`, l'abstraction de passerelle GivingApi, le modèle de données des dons, et la manière dont les webhooks des passerelles se réconcilient avec la base de données.

</div>

## Vue d'ensemble

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
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Trois principes s'appliquent à l'ensemble de la pile :

1. **La passerelle détient la carte.** Le widget de saisie de chaque fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un jeton, un nonce ou un identifiant de commande.
2. **Une seule abstraction, plusieurs fournisseurs.** Le navigateur résout un `PaymentProvider` à partir d'un registre ; le serveur résout un `IGatewayProvider` à partir d'une fabrique. Les deux utilisent le même nom de fournisseur normalisé stocké sur l'enregistrement de la passerelle.
3. **Les webhooks font foi pour le règlement.** La réponse d'un paiement est enregistrée de manière optimiste, mais le webhook signé de la passerelle est ce qui confirme (ou crée) le don finalisé, avec des garde-fous d'idempotence des deux côtés.

## Côté client : le registre des fournisseurs de paiement (`@churchapps/apphelper`)

Le registre se trouve dans `Packages/apphelper/src/donations/providers/`, chaque fournisseur ayant ses widgets et ses utilitaires dans son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — rien en dehors de `providers/` ne se ramifie selon le nom d'un fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce dont une application hôte a besoin pour une passerelle : un `descriptor` (libellés d'administration, devises prises en charge, champs de frais, taux de frais par défaut, URL du tableau de bord et d'inscription), un ensemble de `capabilities` (cartes enregistrées, ACH, récurrence, saisie d'une nouvelle carte en ligne, enregistrement implicite lors de la tokenisation), les widgets React pour la saisie par les membres (`MemberWrapper`/`MemberEntry`), le don des invités (`GuestForm`), l'édition des moyens de paiement enregistrés (`MethodEditForm`) et les paiements de questions de formulaire (`FormPayment`), ainsi que `buildChargeRequest(ctx, token)` — le seul endroit où la forme de la charge utile de paiement diffère selon le fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique de l'enregistrement de la passerelle ; les applications hôtes n'importent donc jamais le SDK d'une passerelle (B1App et B1Admin n'ont aucune dépendance `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise le choix de la passerelle d'une église à utiliser pour chaque interface.

`providers/registry.ts` contient les fournisseurs intégrés. Ils sont **référencés par valeur**, et non enregistrés par un effet de bord de module, afin que le tree-shaking du bundler ne puisse jamais supprimer l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonction | Rôle |
|----------|---------|
| `getPaymentProvider(name)` | Résout par nom normalisé ; se replie sur Stripe afin qu'un fournisseur mal configuré ne fasse jamais planter le formulaire du donateur |
| `registerPaymentProvider(p)` | Enregistre un fournisseur supplémentaire à l'exécution (pour une passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumère les fournisseurs intégrés et personnalisés — utilisé pour construire la liste déroulante des passerelles de l'administration |
| `hasPaymentProvider(name)` | Vérification d'appartenance |

**Fournisseurs client intégrés : Stripe, PayPal, Kingdom Funding, Paystack.** B1App et B1Admin ne font que *lire* le registre (`getPaymentProvider`, `listPaymentProviders`) ; aucun des deux n'appelle `registerPaymentProvider` — l'enregistrement reste dans apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte hors de B1 :

| Fournisseur | Widget de saisie | Jeton renvoyé à l'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)` ; le formulaire invité monte aussi un `ExpressCheckoutElement` (Apple Pay / Google Pay, dons ponctuels) dont `onConfirm` aboutit au même identifiant `pm_…` | identifiant du moyen de paiement (`pm_…`) ; compte bancaire via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pour les passerelles en USD, PAD canadien `acss_debit` (fenêtre de mandat hébergée, mandat `default_for` factures/abonnements, les charges ponctuelles transmettent l'identifiant du mandat) pour les passerelles en CAD |
| Kingdom Funding | Formulaire de tokenisation hébergé, indexé par la clé publique de la passerelle | nonce à usage unique |
| PayPal | PayPal Hosted Fields (carte, récurrence) ainsi que PayPal Smart Buttons avec financement Venmo (ponctuel) ; les deux partagent un seul chargement de SDK et la commande côté serveur construite via `/donate/client-token` + `/donate/create-order` | identifiant de commande capturée |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`) — c'est le popup lui-même qui effectue le paiement (carte, argent mobile, virement bancaire, USSD) | référence de transaction payée ; les moyens enregistrés sont des codes d'autorisation Paystack `AUTH_…` |

La méthode `finalizeResult` de Stripe exécute le 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que le don soit considéré comme finalisé ; le formulaire commun appelle simplement `provider.finalizeResult(result)` sans savoir ce qu'elle fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; la mécanique des passerelles se trouve dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement au SDK d'une passerelle — il passe par `GatewayService`, qui résout le bon `IGatewayProvider` depuis `GatewayFactory` et lui transmet une `GatewayConfig` déchiffrée.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente — cycle de vie des webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion des moyens enregistrés (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), et extensions optionnelles (clients, commandes, SetupIntents, rejeu d'événements, `retryFailedPayment` pour une facture d'abonnement échouée, `registerPaymentMethodDomain` pour la vérification de domaine Apple Pay). Un fournisseur qui omet un point d'extension optionnel est signalé comme non pris en charge pour cette action, et l'interface masque le contrôle correspondant. Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises prises en charge, ACH, remboursements, exigences d'abonnement, limites de transaction) — `GatewayService.getProviderCapabilities(provider)` se contente de la lire — et des indicateurs comme `logsDonationsImmediately` pilotent le comportement des contrôleurs sans aucune condition sur le nom du fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|----------|-------------|
| Stripe | Toujours activé |
| PayPal | Toujours activé |
| Kingdom Funding | Toujours activé |
| Paystack | Toujours activé (commerçants du Nigeria, du Ghana, d'Afrique du Sud, du Kenya et de Côte d'Ivoire ; devises NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Activation facultative via l'indicateur d'environnement `ENABLE_SQUARE` |
| ePayMints | Activation facultative via l'indicateur d'environnement `ENABLE_EPAYMINTS` |

Paystack se distingue des autres en ce que l'argent circule avant que GivingApi n'intervienne : le popup débite le donateur, `processCharge` est un `GET /transaction/verify/:reference` dont le montant payé et la devise doivent correspondre au don enregistré (une référence déjà présente n'est jamais enregistrée deux fois), et le premier versement d'un échéancier récurrent est enregistré depuis `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` avec `start_date` à un intervalle à partir de maintenant). Les webhooks sont signés avec la clé secrète elle-même (`x-paystack-signature`, HMAC-SHA512 sur le corps brut), et Paystack ne propose aucune API de gestion des webhooks ; l'écran d'administration affiche donc l'URL à coller par l'église dans son tableau de bord. Les événements `charge.success` de renouvellement ne transportent aucune répartition par fonds ; le fournisseur la retrouve à partir des lignes locales `subscriptions`/`subscriptionFunds` du donateur. Seules les autorisations par carte sont `reusable` — les dons par argent mobile sont ponctuels uniquement, donc `createSubscription` les refuse. Les données de démonstration ajoutent une seconde église (Accra Community Church, `CHU00000002`) sur une passerelle Paystack en mode test GHS, afin que la suite Playwright Paystack s'exécute à côté de celle de Stripe de Grace.

Des fournisseurs personnalisés peuvent être enregistrés à l'exécution lorsque `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseurs sont comparés sans tenir compte de la casse.

### Configuration de la passerelle et secrets

Un administrateur enregistre les identifiants de la passerelle via `POST /giving/gateways` (`GatewayController`). Lors de l'enregistrement, le contrôleur chiffre les clés privée et de webhook avec `EncryptionHelper` avant de les persister, puis — sur tout hôte autre que localhost — supprime le webhook existant de l'église et en provisionne un nouveau pointant vers `/giving/donate/webhook/{provider}?churchId=…`. Une église conserve une ligne par fournisseur : l'enregistrement d'une passerelle ne remplace que la ligne existante pour ce même fournisseur. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ne renvoient que les clés publiques.

## Modèle de données

Le schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Table | Rôle |
|-------|------|
| `gateways` | Configuration du fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffrées, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Affectations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour la saisie et les rapports (`name`, `batchDate`) |
| `donations` | Un seul don : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded` ; les relevés, totaux, tableaux de bord et rapports de dons ne comptent que `complete` ou null), `transactionId` |
| `fundDonations` | Répartition d'un don entre un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'identifiant d'abonnement de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition par fonds d'un don récurrent |
| `customers` | Lie un `personId` à son identifiant de client auprès de la passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes/banques enregistrées : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit des webhooks/événements et clé de déduplication (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesses de dons liées à un fonds, et le montant promis par chaque personne |

Un don est réparti entre les fonds via `fundDonations` — le don porte le total, chaque `fundDonation` porte une part. `donations.currency` et `gateways.currency` portent la devise ISO ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Parcours de bout en bout

### Don ponctuel et récurrent pour les membres (B1App)

L'écran de don authentifié (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combine trois composants apphelper : `MultiGatewayDonationForm`, `PaymentMethods` et `RecurringDonations`. B1App assure le chargement des données environnantes — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — et transmet la liste des passerelles ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. La charge proprement dite a lieu à l'intérieur d'apphelper : le fournisseur résolu tokenise le moyen de paiement (nouveau ou enregistré), puis envoie une requête à `/giving/donate/charge` pour un don ponctuel ou à `/giving/donate/subscribe` pour un don récurrent. Les deux points de terminaison attribuent un donateur connecté à son propre `personId` (seuls les détenteurs de `donations.edit` peuvent attribuer à quelqu'un d'autre) et rejettent les répartitions par fonds dont la somme dépasse le montant débité. Les dons récurrents créent une ligne `subscriptions` ainsi que `subscriptionFunds`, et confient l'échéancier à la passerelle (Stripe Subscriptions, PayPal Billing Plans, ou un échéancier récurrent KF).

### Dons des invités et anonymes

La page de don publique (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau « donner maintenant » affichent `NonAuthDonationWrapper` depuis `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte Elements de la passerelle autour du `GuestForm` du fournisseur. Les invités n'ont ni connexion, ni moyens enregistrés, ni historique. Le parcours récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques uniquement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur, puis envoie une requête à `/giving/donate/charge` (ou `/subscribe`). L'ACH pour les invités utilise le point de terminaison anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, qui n'autorise que la vérification instantanée (Financial Connections) : une vérification par micro-dépôts se termine plusieurs jours plus tard, une fois la page de l'invité fermée, et ne pourrait donc jamais aboutir au don. Le formulaire refuse de débiter un SetupIntent non vérifié et oriente le donateur vers la carte ou vers une configuration bancaire réservée aux utilisateurs connectés.

Trois options du formulaire invité passent par le même appel de charge. `?fundId=` et `?amount=` dans l'URL de don présélectionnent la répartition par fonds (lue par le formulaire invité de chaque fournisseur au montage, et acheminée par le gestionnaire normal de changement de fonds afin que les totaux et les frais se mettent à jour). `anonymous: true` fait en sorte que `DonateController.charge` ignore toute personne envoyée par le client et enregistre le don avec `personId = null` ; le formulaire invité ignore `/people/loadOrCreate` ainsi que l'étape client/coffre, et les trois fournisseurs à enregistrement immédiat cessent de résoudre une personne à partir du client de la passerelle. Apple Pay exige que le domaine de la page soit enregistré auprès de Stripe ; un formulaire invité Stripe envoie donc une fois par session une requête à `POST /giving/donate/register-domain`, public et limité en débit, qui n'accepte qu'un domaine appartenant à l'église (`<subDomain>.b1.church`, une ligne de la table des domaines du module de contenu, ou un hôte local) avant d'appeler l'API payment-method-domains de Stripe.

### Saisie par l'administration et import Stripe (B1Admin)

La section dons de B1Admin (`B1Admin/src/donations/`) est l'espace de travail des équipes financières. La saisie par lots (`components/BulkDonationEntry.tsx`) enregistre les dons en espèces, par chèque ou en nature en envoyant une requête à `/giving/donations` puis à `/giving/funddonations` — sans passerelle impliquée. La feuille **Log a gift** de la fiche personne (`components/LogGiftDialog.tsx`) fait de même pour un seul don : elle recherche d'abord le lot dont `batchDate` correspond à la date du don, ou en crée un portant cette date (`POST /giving/donationbatches`), puis supprime à nouveau le don et le nouveau lot si une étape ultérieure échoue. Les fonds, lots, campagnes et relevés correspondent chacun à leurs routes CRUD `/giving/*`. Le panneau de don de style membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants apphelper que B1App.

Les échanges avec la comptabilité et les rapports se font côté client ou via le moteur de rapports, et non via la passerelle : l'export QuickBooks de la page des lots construit un fichier CSV d'écriture de journal à partir des `donations` + `fundDonations` du lot (débit de Undeposited Funds, un crédit par fonds), la vue Lapsed Givers de la page Summary exécute `Api/reports/lapsedGivers.json` via le moteur de rapports générique avec les noms des personnes résolus par `ReportOutput`, et les formats de reçus par pays (Canada / Australie / Nouvelle-Zélande) sont des paramètres d'église stockés dans le magasin clé/valeur de membership, rendus par `GivingStatementDocument` et dupliqués dans la page d'impression de B1App. Les pages d'impression des relevés de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) transmettent le paramètre `logoLight` de l'église (via `usePrintLogo` dans `B1Admin/src/components/PrintChurchHeader.tsx`) afin que le logo s'imprime en haut de chaque relevé, et attendent le chargement de l'image avant l'impression automatique.

### Conversion des totaux de devises mixtes

Tout point de terminaison qui renvoie un total combiné unique pour des dons pouvant être de devises mixtes — les indicateurs clés du résumé des dons (`GivingKpiCards`), le total d'un lot de dons, le total d'un fonds, et les totaux annuels/de période de l'écran de don de B1App — convertit dans la devise par défaut de l'église côté serveur, au lieu d'additionner des devises différentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` récupère les taux auprès de `api.frankfurter.dev` selon la devise de l'église, les met en cache en mémoire pendant 12 heures, et expose `convertTotals(rows, churchCurrency, rates)` : les lignes sont pré-regroupées par devise en SQL (quelques groupes, jamais une conversion par don), chaque groupe est converti puis additionné, et le résultat porte un indicateur `isConverted` que le client utilise pour afficher la note « Converti aux taux de change actuels ». `GET /donations/exchange-rates` expose la table des taux aux clients qui en ont besoin (l'écran de don de B1App) ; les taux eux-mêmes ne sont jamais acceptés depuis une requête, seulement récupérés côté serveur, de sorte qu'un client ne peut pas influencer un total présenté. Les enregistrements de dons individuels et les rapports historiques ou dans la devise d'origine ne sont jamais convertis — seuls les totaux combinés le sont.

L'import Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rattrape les dons effectués hors de B1 : il appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis avec `dryRun: false` pour importer. Le serveur liste les événements Stripe de la plage de dates et ignore ceux déjà enregistrés — d'abord par identifiant de fournisseur dans `eventLogs`, puis par identifiant de transaction, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) afin qu'une nouvelle exécution n'importe jamais deux fois. Les événements d'abonnement `charge.succeeded` / `payment_intent.succeeded` sont ignorés, car `invoice.paid` enregistre ces dons ; les versions récentes de l'API Stripe suppriment `PaymentIntent.invoice`, donc l'ignorance se base aussi sur la description « Subscription … ».

## Webhooks et réconciliation

Les paiements réglés et les changements d'état d'abonnement arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est volontairement idempotent :

1. **Vérifier** — `GatewayService.verifyWebhook` délègue au contrôle de signature du fournisseur ; une signature invalide renvoie 401. Les événements qui n'ont pas besoin de traitement court-circuitent avec 200.
2. **Dédupliquer l'événement** — `EventLogRepo.loadByProviderId` ignore un webhook déjà enregistré dans `eventLogs`.
3. **Dédupliquer le don** — avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié pour chaque identifiant candidat que la charge utile peut contenir. Cela absorbe les livraisons en double, les événements ACH en plusieurs étapes (en attente → réglé), et le cas où `/donate/charge` a déjà enregistré le don de manière optimiste.
4. **Appliquer** — `classifyWebhookEvent(eventType)` du fournisseur indique ce que signifie l'événement (`donation` en attente/complet, `cancel-subscription`, ou `ignore`) ; les paiements finalisés créent un don `complete` (ou font passer un don existant `pending` ou `failed` à `complete`), les événements de type ACH restent `pending` jusqu'au règlement, une facture d'abonnement échouée (`invoice.payment_failed` de Stripe) crée un don `failed` identifié par l'identifiant de la facture, et les événements d'annulation suppriment la ligne locale `subscriptions`. Le contrôleur n'inspecte jamais les noms d'événements propres à un fournisseur.

### Dons récurrents échoués et relances

Un don `failed` est l'unité de travail du recouvrement. `GET /giving/donations/failed` les liste avec le message d'échec le plus récent de la passerelle provenant de `eventLogs`, ainsi qu'un indicateur `canRetry` issu des capacités de la passerelle ; `POST /giving/donate/retry/:donationId` appelle `retryFailedPayment` du fournisseur (Stripe règle la facture ouverte), et le webhook qui en résulte fait passer la ligne à `complete` via le chemin de déduplication normal. Les e-mails de relance sont envoyés au donateur par le gestionnaire de webhook au jour 0, puis par `DunningHelper.run` dans la minuterie de minuit (branchée à la fois dans `lambda/timer-handler.ts` et `RailwayCron.ts`) aux jours 3 et 7 ; chaque envoi est enregistré dans `eventLogs` avec `provider: "dunning"` et `providerId: "<donationId>:<day>"`, de sorte qu'une nouvelle exécution n'envoie jamais deux fois le même e-mail. Lorsque Stripe abandonne et annule l'abonnement (`customer.subscription.deleted` avec `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envoie une seule fois un e-mail au donateur (`providerId: "<subscriptionId>:canceled"`) ; les annulations à l'initiative du donateur ou de l'administrateur restent silencieuses. Stripe n'ajoute jamais d'événements à un point de terminaison existant : après avoir modifié `StripeHelper.webhookEvents`, il faut soit réenregistrer la passerelle, soit exécuter `tools/manual/stripe-webhook-events.ts` (simulation par défaut, `--apply` pour écrire) sur la production.

Les fournisseurs disposant de `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ont leurs paiements enregistrés depuis la réponse de `/charge` (aucun aller-retour par webhook n'est nécessaire pour le cas nominal), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et sur `payment_intent.processing` pour l'ACH. La gestion des frais (`POST /giving/donate/fee`, l'indicateur de passerelle `payFees` et la méthode `calculateFees` de chaque fournisseur) calcule la majoration « couvrir les frais » côté donateur — B1 ne prélève aucune commission de plateforme, donc aucun frais d'application n'est jamais ajouté.

:::info
Les chemins de charge et de webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui empêche un journal de paiement optimiste et son webhook ultérieur de produire deux dons pour un même cadeau.
:::

## Pages connexes

- [Points de terminaison Giving](../api/endpoints/giving) — surface REST complète pour les dons, fonds, lots, passerelles, abonnements, moyens de paiement et webhooks
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui livre le registre des fournisseurs de paiement et les composants de don
- [Structure du module](../api/module-structure) — organisation côté serveur du module GivingApi
