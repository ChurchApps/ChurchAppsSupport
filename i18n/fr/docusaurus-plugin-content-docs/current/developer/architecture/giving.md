---
title: "Architecture des Dons"
---

# Architecture des Dons

<div class="article-intro">

ChurchApps exécute les dons selon un modèle « gateway-rail » : l'église conserve son propre compte Stripe (ou PayPal, Kingdom Funding, ou Paystack), et B1 ne se place jamais dans le chemin de l'argent en tant que processeur de plateforme. Les données de carte sont tokenisées dans le navigateur et ne atteignent jamais un serveur ChurchApps. Cette page cartographie toute la pile — le registre de fournisseurs côté client dans `@churchapps/apphelper`, l'abstraction de passerelle GivingApi, le modèle de données de donation, et comment les webhooks de passerelle se réconcillient dans la base de données.

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

Trois principes maintiennent la cohérence de la pile :

1. **La passerelle détient la carte.** Le widget d'entrée de chaque fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un token, nonce, ou ID de commande.
2. **Une abstraction, de nombreux fournisseurs.** Le navigateur résout un `PaymentProvider` à partir d'un registre ; le serveur résout un `IGatewayProvider` à partir d'une usine. Les deux utilisent le même nom de fournisseur normalisé stocké sur l'enregistrement de passerelle.
3. **Les webhooks sont la source de vérité pour le règlement.** Une réponse de facturation est enregistrée de manière optimiste, mais le webhook signé de la passerelle est ce qui confirme (ou crée) la donation complétée, avec des gardes d'idempotence des deux côtés.

## Côté client : le registre de fournisseur de paiement (`@churchapps/apphelper`)

Le registre réside dans `Packages/apphelper/src/donations/providers/`, avec les widgets et les helpers de chaque fournisseur dans son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — rien en dehors de `providers/` ne se branche sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce qu'une application hôte a besoin pour une passerelle : un `descriptor` (étiquettes d'administration, devises supportées, champs de frais, taux de frais par défaut, URLs de tableau de bord/inscription), un ensemble d'indicateurs `capabilities` (cartes sauvegardées, ACH, récurrent, entrée de nouvelle carte en ligne, sauvegarde implicite lors du tokenage), les widgets React pour l'entrée de membre (`MemberWrapper`/`MemberEntry`), la donation d'invité (`GuestForm`), l'édition de méthode sauvegardée (`MethodEditForm`), et les paiements de questions de formulaire (`FormPayment`), plus `buildChargeRequest(ctx, token)` — l'endroit unique où la forme de la charge diffère par fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique de l'enregistrement de passerelle, donc les applications hôtes n'importent jamais un SDK de passerelle (B1App et B1Admin n'ont aucune dépendance `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise laquelle des passerelles d'une église une surface devrait utiliser.

`providers/registry.ts` contient les intégrés. Ils sont **référencés par valeur**, pas enregistrés via un effet secondaire de module, donc l'élimination des branches mortes d'un bundler ne peut jamais supprimer l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonction | Objectif |
|----------|----------|
| `getPaymentProvider(name)` | Résoudre par nom normalisé ; se replie sur Stripe pour qu'un fournisseur mal configuré ne fasse jamais un crash dur du formulaire de donateur |
| `registerPaymentProvider(p)` | Enregistrer un fournisseur supplémentaire au moment de l'exécution (pour une passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumérer les intégrés + personnalisé — utilisé pour construire le menu déroulant de passerelle d'administration |
| `hasPaymentProvider(name)` | Vérification d'appartenance |

**Fournisseurs clients intégrés : Stripe, PayPal, Kingdom Funding, Paystack.** B1App et B1Admin *lisent* uniquement le registre (`getPaymentProvider`, `listPaymentProviders`) ; ni l'un ni l'autre n'appelle `registerPaymentProvider` — l'enregistrement reste à l'intérieur d'apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte en dehors de B1 :

| Fournisseur | Widget d'entrée | Token retourné à l'API |
|-------------|-----------------|------------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; le formulaire d'invité monte également un `ExpressCheckoutElement` (Apple Pay / Google Pay, cadeaux ponctuels) dont `onConfirm` résout vers le même ID `pm_…` | ID de méthode de paiement (`pm_…`) ; banque via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pour les passerelles USD, PAD canadien `acss_debit` (modal de mandat hébergé, mandate `default_for` invoices/subscriptions, les charges ponctuelles passent l'ID du mandat) pour les passerelles CAD |
| Kingdom Funding | Formulaire de tokeniseur hébergé codé par la clé publique de la passerelle | nonce à usage unique |
| PayPal | PayPal Hosted Fields (carte, récurrent) plus PayPal Smart Buttons avec financement Venmo (ponctuel) ; les deux partagent un chargement SDK et la commande du serveur construite via `/donate/client-token` + `/donate/create-order` | ID de commande capturé |
| Paystack | Paystack Inline popup (`js.paystack.co/v2/inline.js`) — le popup lui-même prend le paiement (carte, mobile money, virement bancaire, USSD) | référence de transaction payée ; les méthodes sauvegardées sont les codes d'autorisation `AUTH_…` de Paystack |

Le `finalizeResult` de Stripe exécute 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que la donation ne soit considérée comme complétée ; le formulaire partagé appelle simplement `provider.finalizeResult(result)` sans connaissance de ce qu'il fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; la plomberie de passerelle réside dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement à un SDK de passerelle — il passe par `GatewayService`, qui résout le bon `IGatewayProvider` à partir de `GatewayFactory` et le confie à un `GatewayConfig` décrypté.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente — cycle de vie des webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), manipulation de méthode sauvegardée (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), et extras facultatifs (customers, orders, SetupIntents, relecture d'événements, `retryFailedPayment` pour une facture d'abonnement échouée, `registerPaymentMethodDomain` pour la vérification du domaine Apple Pay). Un fournisseur qui omet un hook facultatif est signalé comme non pris en charge pour cette action et l'interface utilisateur masque le contrôle. Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises supportées, ACH, remboursements, exigences d'abonnement, limites de transaction) — `GatewayService.getProviderCapabilities(provider)` la lit simplement — et des indicateurs comme `logsDonationsImmediately` pilotent le comportement du contrôleur sans aucun conditionnel de nom de fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|------------|--------------|
| Stripe | Toujours activé |
| PayPal | Toujours activé |
| Kingdom Funding | Toujours activé |
| Paystack | Toujours activé (commerçants Nigeria, Ghana, Afrique du Sud, Kenya, Côte d'Ivoire ; devises NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Opt-in via le flag d'environnement `ENABLE_SQUARE` |
| ePayMints | Opt-in via le flag d'environnement `ENABLE_EPAYMINTS` |

Paystack diffère des autres en ce que l'argent se déplace avant l'implication de GivingApi : le popup facture le donateur, `processCharge` est un `GET /transaction/verify/:reference` dont le montant et la devise payés doivent correspondre à la donation enregistrée (une référence déjà en dossier n'est jamais enregistrée deux fois), et le premier cadeau d'un horaire récurrent est enregistré à partir de `finalizeSubscription` (vérifier → `POST /plan` → `POST /subscription` avec `start_date` un intervalle à l'avance). Les webhooks sont signés avec la clé secrète elle-même (`x-paystack-signature`, HMAC-SHA512 sur le corps brut) et Paystack n'a pas d'API de gestion des webhooks, donc l'écran d'administration affiche l'URL pour que l'église la colle dans son tableau de bord. Les événements de renouvellement `charge.success` ne transportent aucune répartition de fonds ; le fournisseur la récupère à partir des lignes locales `subscriptions`/`subscriptionFunds` du donateur. Seules les autorisations de carte sont `reusable` — les cadeaux de mobile money ne sont que ponctuels, donc `createSubscription` les refuse. Les données de démonstration ensemencent une deuxième église (Accra Community Church, `CHU00000002`) sur une passerelle Paystack en mode test GHS pour que la suite Playwright de Paystack s'exécute à côté de celle de Stripe pour Grace.

Les fournisseurs personnalisés peuvent être enregistrés au moment de l'exécution lorsque `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseurs sont appariés sans distinction de casse.

### Configuration de passerelle et secrets

Un administrateur enregistre les identifiants de passerelle via `POST /giving/gateways` (`GatewayController`). Lors de l'enregistrement, le contrôleur chiffre les clés privée et webhook avec `EncryptionHelper` avant de persister, puis — sur tout hôte non-localhost — supprime le webhook existant de l'église et en configure un nouveau pointant vers `/giving/donate/webhook/{provider}?churchId=…`. Une église conserve une ligne par fournisseur : enregistrer une passerelle ne remplace que la ligne existante pour ce même fournisseur. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ne retournent que des clés publiques.

## Modèle de données

Le schéma de donation (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Tableau | Rôle |
|--------|------|
| `gateways` | Configuration de fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffré, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Désignations de donation (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour l'entrée/rapports (`name`, `batchDate`) |
| `donations` | Un cadeau : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded` ; les relevés, totaux, tableaux de bord et rapports de donation ne comptent que `complete` ou null), `transactionId` |
| `fundDonations` | Allocation d'une donation sur un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Cadeau récurrent ; `id` est l'ID de souscription de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition des fonds pour un cadeau récurrent |
| `customers` | Lie un `personId` à son ID client de passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes/banques sauvegardées : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit webhook/événement et clé de dédup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesse liées à un fonds, et montant de promesse de chaque personne |

Une donation est répartie sur les fonds via `fundDonations` — la donation porte le total, chaque `fundDonation` porte une tranche. `donations.currency` et `gateways.currency` portent la devise ISO ; chaque fournisseur publie ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Flux bout à bout

### Membre ponctuel et récurrent (B1App)

L'écran d'authentification de donation (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compose trois composants apphelper : `MultiGatewayDonationForm`, `PaymentMethods`, et `RecurringDonations`. B1App effectue le chargement de données environnant — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — et transmet la liste des passerelles ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. La charge elle-même se produit à l'intérieur d'apphelper : le fournisseur résolu tokenise la méthode (nouvelle ou sauvegardée), puis envoie à `/giving/donate/charge` pour un cadeau ponctuel ou `/giving/donate/subscribe` pour un cadeau récurrent. Les deux points de terminaison attribuent un donateur connecté à son propre `personId` (seuls les détenteurs de `donations.edit` peuvent attribuer à quelqu'un d'autre) et rejettent les répartitions de fonds qui s'ajoutent à plus que le montant facturé. Les cadeaux récurrents créent une ligne `subscriptions` plus `subscriptionFunds` et remettent l'horaire à la passerelle (Stripe Subscriptions, Forfaits de facturation PayPal, ou un horaire récurrent KF).

### Donation d'invité / anonyme

La page de donation publique (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau « donner maintenant » rendent `NonAuthDonationWrapper` à partir de `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte d'éléments de la passerelle autour de `GuestForm` du fournisseur. Les invités n'obtiennent pas de connexion, pas de méthodes sauvegardées, et pas d'historique. Le flux récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques uniquement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur, et envoie à `/giving/donate/charge` (ou `/subscribe`). L'ACH invité utilise l'anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`.

Trois options de formulaire d'invité se chevauchent sur le même appel de charge. `?fundId=` et `?amount=` sur l'URL de donation présélectionnent la répartition des fonds (lue par le formulaire d'invité de chaque fournisseur au montage, acheminée via le gestionnaire de changement de fonds normal pour que les totaux et frais se mettent à jour). `anonymous: true` fait que `DonateController.charge` rejette toute personne que le client a envoyée et enregistre le cadeau avec `personId = null` ; le formulaire d'invité saute `/people/loadOrCreate` et l'étape client/coffre-fort, et les trois fournisseurs de journal immédiat cessent de résoudre une personne à partir du client de passerelle. Apple Pay a besoin du domaine de la page enregistré auprès de Stripe, donc un formulaire d'invité Stripe envoie une fois par session au public, au taux limité `POST /giving/donate/register-domain`, qui n'accepte qu'un domaine qui appartient à l'église (`<subDomain>.b1.church`, une ligne dans la table des domaines du module de contenu, ou un hôte local) avant d'appeler l'API des domaines de méthode de paiement de Stripe.

### Enregistrement administrateur et importation de Stripe (B1Admin)

La section donations de B1Admin (`B1Admin/src/donations/`) est l'endroit où les équipes de finances travaillent. L'entrée par lot (`components/BulkDonationEntry.tsx`) enregistre les cadeaux en espèces/chèque/autres en affichant `/giving/donations` puis `/giving/funddonations` — aucune passerelle impliquée. Les fonds, lots, campagnes et relevés cartographient chacun à leurs routes `/giving/*` CRUD. Le panneau de donation de style membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants apphelper que B1App.

Le rapportage et les décomptes comptables sont du travail côté client ou du coureur de rapport, pas du travail de passerelle : la page de lot de l'exportation QuickBooks construit un CSV d'entrée de journal à partir des `donations` + `fundDonations` du lot (débit Funds Non Déposés, un crédit par fonds), l'onglet Givers Lapsed exécute `Api/reports/lapsedGivers.json` via le coureur de rapport générique avec noms de personne résolus par `ReportOutput`, et les formats de reçu par pays (Canada / Australie / Nouvelle-Zélande) sont des paramètres d'église dans le magasin de paires clé/valeur d'adhésion rendu par `GivingStatementDocument` et dupliqué dans la page d'impression B1App.

### Conversion de totaux en devises mixtes

Tout point de terminaison qui retourne un total combiné unique sur des cadeaux possiblement en devises mixtes — les KPI de résumé de donation (`GivingKpiCards`), un total de lot de donation, un total de fonds, et les totaux annuels/période de l'écran de donation B1App — convertit à la devise par défaut de l'église côté serveur plutôt que de additionner les devises contrairement. `Api/src/shared/helpers/ExchangeRateHelper.ts` récupère les taux à partir de `api.frankfurter.dev` codés par la devise de l'église, les met en cache en processus pendant 12 heures, et expose `convertTotals(rows, churchCurrency, rates)` : les lignes sont pré-regroupées par devise en SQL (une poignée de groupes, jamais une conversion par cadeau), chaque groupe est converti et additionné, et le résultat porte un flag `isConverted` que le client utilise pour montrer une note « Converti au taux de change actuel ». `GET /donations/exchange-rates` expose le tableau de taux aux clients qui en ont besoin (écran de donation B1App) ; les taux eux-mêmes ne sont jamais acceptés d'une demande, toujours récupérés côté serveur uniquement, donc un client ne peut pas influencer un total rapporté. Les enregistrements de donation individuels et les rapports historiques/devise d'origine ne sont jamais convertis — seuls les totaux combinés le sont.

L'importation Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) remplit les cadeaux faits en dehors de B1 : elle appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis `dryRun: false` pour importer. Le serveur liste les événements Stripe pour la plage de dates et omet tout ce qui est déjà enregistré — d'abord appariés par l'ID du fournisseur `eventLogs`, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) donc une réexécution ne double jamais-importe.

## Webhooks et réconciliation

Les paiements réglés et les changements d'état d'abonnement arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est délibérément idempotent :

1. **Vérifier** — `GatewayService.verifyWebhook` délègue à la vérification de signature du fournisseur ; une signature échouée retourne 401. Les événements qui n'ont pas besoin de traitement se ferment avec 200.
2. **Dedup de l'événement** — `EventLogRepo.loadByProviderId` omet un webhook déjà enregistré dans `eventLogs`.
3. **Dedup de la donation** — avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié contre chaque ID candidat que le payload peut porter. Cela absorbe les livraisons dupliquées, les événements ACH multi-étapes (en attente → réglé), et le cas où `/donate/charge` a déjà enregistré le cadeau de manière optimiste.
4. **Appliquer** — le `classifyWebhookEvent(eventType)` du fournisseur dit ce que l'événement signifie (`donation` en attente/complète, `cancel-subscription`, ou `ignore`) ; les paiements complétés créent une donation `complete` (ou promeuvent une donation `pending` ou `failed` existante), les événements de style ACH atterrissent comme `pending` jusqu'au règlement, une facture d'abonnement échouée (Stripe `invoice.payment_failed`) crée une donation `failed` codée sur l'ID de la facture, et les événements d'annulation suppriment la ligne `subscriptions` locale. Le contrôleur n'inspecte jamais les noms d'événements spécifiques au fournisseur.

### Cadeaux récurrents échoués et dunning

Une donation `failed` est l'unité de travail pour la récupération. `GET /giving/donations/failed` les énumère avec le message d'échec de passerelle le plus récent à partir de `eventLogs` et un flag `canRetry` à partir des capabilities du fournisseur ; `POST /giving/donate/retry/:donationId` appelle le `retryFailedPayment` du fournisseur (Stripe paie la facture ouverte), et le webhook résultant promeut la ligne à `complete` via le chemin de dédup normal. Les emails de dunning vont au donateur à partir du gestionnaire de webhook le jour 0, puis à partir de `DunningHelper.run` dans la minuterie de minuit (câblée dans `lambda/timer-handler.ts` et `RailwayCron.ts`) aux jours 3 et 7 ; chaque envoi est enregistré dans `eventLogs` en tant que `provider: "dunning"`, `providerId: "<donationId>:<day>"`, donc une réexécution ne fait jamais d'email deux fois. Les points de terminaison de webhook Stripe créés avant cette fonctionnalité ne s'abonnent pas à `invoice.payment_failed` ; re-enregistrer la passerelle configure un point de terminaison frais avec l'événement.

Les fournisseurs avec `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ont leurs frais enregistrées à partir de la réponse `/charge` (aucun aller-retour webhook requis pour le chemin heureux), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et ACH `payment_intent.processing`. La manipulation des frais (`POST /giving/donate/fee`, le flag de passerelle `payFees`, et le `calculateFees` de chaque fournisseur) calcule la majoration brute « couvrir les frais » côté donateur — B1 n'enlève aucun frais de plateforme, donc aucun frais d'application n'est jamais ajouté.

:::info
Les chemins de charge et de webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui empêche un journal de charge optimiste et son webhook ultérieur de produire deux donations pour un cadeau.
:::

## Pages connexes

- [Giving Endpoints](../api/endpoints/giving) — surface REST complète pour les donations, fonds, lots, passerelles, abonnements, méthodes de paiement, et webhooks
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui livre le registre de fournisseur de paiement et les composants de donation
- [Module Structure](../api/module-structure) — comment le module GivingApi est organisé côté serveur
