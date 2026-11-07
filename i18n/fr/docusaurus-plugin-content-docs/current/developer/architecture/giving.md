---
title: "Architecture des dons"
description: "Guide développeur des dons ChurchApps : comment B1 Admin et B1.church envoient les dons via les passerelles Stripe, PayPal, Kingdom Funding ou Paystack."
---

# Architecture des dons

<div class="article-intro">

ChurchApps gère les dons selon un modèle de passerelle : l'église conserve son propre compte Stripe (ou PayPal, Kingdom Funding ou Paystack), et B1 n'intervient jamais dans le circuit de l'argent comme processeur de paiement de la plateforme. Les données de carte sont tokenisées dans le navigateur et n'atteignent jamais un serveur ChurchApps. Cette page décrit l'ensemble de la pile — le registre de fournisseurs de paiement côté client dans `@churchapps/apphelper`, l'abstraction de passerelle de GivingApi, le modèle de données des dons, et la façon dont les webhooks des passerelles se réconcilient avec la base de données.

</div>

## Vue d'ensemble

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (navigateur)│                  │  Passerelle de paiement               │
│                             │                   │  (Stripe / PayPal / KF / Paystack)    │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ saisie de la carte│  Stripe Elements · tokeniseur KF ·    │
│  │ Registre des          │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ fournisseurs de       │  │◀── jeton / nonce ─│  (la carte n'atteint jamais un        │
│  │ paiement              │  │                   │  serveur B1)                          │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            paiement / abonnement│            │ webhook signé
┌─────────────────────────────────────────────┐ (clé secrète)  │                │ événement
│  GivingApi — module /giving                 │────────────────┘                │
│  DonateController → GatewayService          │                                 │
│  → GatewayFactory → IGatewayProvider        │◀────────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  enregistrer donations + fundDonations — dédoublonnage via eventLogs / transactionId
                      ▼
                MySQL (schéma giving)
```

Trois principes tiennent dans toute la pile :

1. **La passerelle détient la carte.** Chaque widget de saisie de fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un jeton, un nonce ou un identifiant de commande.
2. **Une abstraction, plusieurs fournisseurs.** Le navigateur résout un `PaymentProvider` depuis un registre ; le serveur résout un `IGatewayProvider` depuis une fabrique. Les deux se basent sur le même nom normalisé du fournisseur, stocké sur l'enregistrement de la passerelle.
3. **Les webhooks font foi pour le règlement.** Une réponse de paiement est enregistrée de façon optimiste, mais c'est le webhook signé de la passerelle qui confirme (ou crée) le don complété, avec des garde-fous d'idempotence des deux côtés.

## Côté client : le registre des fournisseurs de paiement (`@churchapps/apphelper`)

Le registre se trouve dans `Packages/apphelper/src/donations/providers/`, chaque fournisseur ayant ses widgets et ses aides dans son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — rien en dehors de `providers/` ne se branche sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce dont une application hôte a besoin pour une passerelle : un `descriptor` (libellés d'administration, devises prises en charge, champs de frais, taux de frais par défaut, URL du tableau de bord et d'inscription), un ensemble de `capabilities` (cartes enregistrées, prélèvement ACH, récurrence, saisie de nouvelle carte en ligne, enregistrement implicite à la tokenisation), les widgets React de saisie par le membre (`MemberWrapper`/`MemberEntry`), le don pour visiteurs (`GuestForm`), l'édition d'un moyen enregistré (`MethodEditForm`) et les paiements liés aux questions de formulaire (`FormPayment`), ainsi que `buildChargeRequest(ctx, token)` — le seul endroit où la forme de la charge utile varie selon le fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique de l'enregistrement de passerelle ; les applications hôtes n'importent donc jamais le SDK d'une passerelle (B1App et B1Admin n'ont aucune dépendance à `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise le choix de la passerelle d'une église à utiliser pour chaque surface.

`providers/registry.ts` contient les fournisseurs intégrés. Ils sont **référencés par valeur**, et non enregistrés par un effet de bord de module, de sorte que le secouage d'arbre (tree-shaking) d'un bundler ne puisse jamais supprimer l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonction | Rôle |
|----------|---------|
| `getPaymentProvider(name)` | Résout par nom normalisé ; se rabat sur Stripe pour qu'un fournisseur mal configuré ne fasse jamais planter le formulaire de don |
| `registerPaymentProvider(p)` | Enregistre un fournisseur supplémentaire à l'exécution (pour une passerelle personnalisée de l'application hôte) |
| `listPaymentProviders()` | Énumère les fournisseurs intégrés et personnalisés — sert à construire la liste déroulante des passerelles de l'administration |
| `hasPaymentProvider(name)` | Vérification d'appartenance |

**Fournisseurs client intégrés : Stripe, PayPal, Kingdom Funding, Paystack.** B1App et B1Admin ne font que *lire* le registre (`getPaymentProvider`, `listPaymentProviders`) ; aucun des deux n'appelle `registerPaymentProvider` — l'enregistrement reste à l'intérieur d'apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte hors de B1 :

| Fournisseur | Widget de saisie | Jeton renvoyé à l'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)` ; le formulaire pour visiteurs monte aussi un `ExpressCheckoutElement` (Apple Pay / Google Pay, dons ponctuels) dont `onConfirm` aboutit au même identifiant `pm_…` | identifiant de moyen de paiement (`pm_…`) ; compte bancaire via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pour les passerelles en USD, PAD canadien `acss_debit` (fenêtre de mandat hébergée, mandat `default_for` factures/abonnements, les prélèvements ponctuels transmettent l'identifiant du mandat) pour les passerelles en CAD |
| Kingdom Funding | Formulaire de tokenisation hébergé, indexé par la clé publique de la passerelle | nonce à usage unique |
| PayPal | PayPal Hosted Fields (carte, récurrence) plus boutons intelligents PayPal avec financement Venmo (ponctuel) ; les deux partagent un seul chargement de SDK et la commande côté serveur construite via `/donate/client-token` + `/donate/create-order` | identifiant de commande capturé |
| Paystack | Fenêtre Paystack Inline (`js.paystack.co/v2/inline.js`) — la fenêtre elle-même effectue le paiement (carte, argent mobile, virement bancaire, USSD) | référence de transaction payée ; les moyens enregistrés sont des codes d'autorisation Paystack `AUTH_…` |

La méthode `finalizeResult` de Stripe exécute l'authentification 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que le don soit considéré comme complet ; le formulaire commun appelle simplement `provider.finalizeResult(result)` sans rien savoir de ce qu'elle fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; la plomberie des passerelles se trouve dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement au SDK d'une passerelle — il passe par `GatewayService`, qui résout le bon `IGatewayProvider` depuis `GatewayFactory` et lui remet une `GatewayConfig` déchiffrée.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() déchiffre privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente — cycle de vie des webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion des moyens enregistrés (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`) et extensions facultatives (clients, commandes, SetupIntents, rejeu d'événements, `retryFailedPayment` pour une facture d'abonnement échouée, `registerPaymentMethodDomain` pour la vérification de domaine Apple Pay). Un fournisseur qui omet un crochet facultatif est signalé comme non pris en charge pour cette action, et l'interface masque le contrôle. Chaque classe de fournisseur déclare sa propre matrice de `capabilities` (devises prises en charge, ACH, remboursements, exigences d'abonnement, limites de transaction) — `GatewayService.getProviderCapabilities(provider)` se contente de la lire — et des indicateurs comme `logsDonationsImmediately` pilotent le comportement des contrôleurs sans aucune condition sur le nom du fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|----------|-------------|
| Stripe | Toujours actif |
| PayPal | Toujours actif |
| Kingdom Funding | Toujours actif |
| Paystack | Toujours actif (marchands du Nigeria, du Ghana, d'Afrique du Sud, du Kenya et de Côte d'Ivoire ; devises NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Activation facultative par l'indicateur d'environnement `ENABLE_SQUARE` |
| ePayMints | Activation facultative par l'indicateur d'environnement `ENABLE_EPAYMINTS` |

Paystack diffère des autres en ce que l'argent circule avant même que GivingApi n'intervienne : la fenêtre débite le donateur, `processCharge` est un `GET /transaction/verify/:reference` dont le montant payé et la devise doivent correspondre au don enregistré (une référence déjà présente n'est jamais enregistrée deux fois), et le premier versement d'un échéancier récurrent est enregistré depuis `finalizeSubscription` (vérification → `POST /plan` → `POST /subscription` avec `start_date` à un intervalle d'avance). Les webhooks sont signés avec la clé secrète elle-même (`x-paystack-signature`, HMAC-SHA512 sur le corps brut), et Paystack n'offre aucune API de gestion des webhooks ; l'écran d'administration affiche donc l'URL que l'église doit coller dans son tableau de bord. Les événements `charge.success` de renouvellement ne portent aucune répartition par fonds ; le fournisseur la retrouve à partir des lignes locales `subscriptions`/`subscriptionFunds` du donateur. Seules les autorisations de carte sont `reusable` — les dons par argent mobile sont uniquement ponctuels, donc `createSubscription` les refuse. Les données de démonstration amorcent une seconde église (Accra Community Church, `CHU00000002`) sur une passerelle GHS en mode test Paystack, afin que la suite Playwright Paystack fonctionne à côté de celle de Stripe de Grace.

Des fournisseurs personnalisés peuvent être enregistrés à l'exécution lorsque `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseurs sont comparés sans tenir compte de la casse.

### Configuration et secrets de la passerelle

Un administrateur enregistre les identifiants de la passerelle par `POST /giving/gateways` (`GatewayController`). Lors de l'enregistrement, le contrôleur chiffre les clés privée et de webhook avec `EncryptionHelper` avant de les persister, puis — sur tout hôte autre que localhost — supprime le webhook existant de l'église et en provisionne un neuf pointant vers `/giving/donate/webhook/{provider}?churchId=…`. Une église ne conserve qu'une ligne par fournisseur : enregistrer une passerelle ne remplace que la ligne existante pour ce même fournisseur. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ne renvoient que les clés publiques.

## Modèle de données

Le schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Table | Rôle |
|-------|------|
| `gateways` | Configuration du fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffrés, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Affectations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour la saisie et les rapports (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un don : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded` ; les reçus, totaux, tableaux de bord et rapports de dons ne comptent que `complete` ou null), `transactionId` |
| `fundDonations` | Répartition d'un don entre un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'identifiant d'abonnement de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition par fonds d'un don récurrent |
| `customers` | Relie un `personId` à son identifiant client de la passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes et comptes bancaires enregistrés : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit des webhooks et des événements, et clé de déduplication (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesses de dons rattachées à un fonds, et le montant promis par chaque personne |

Un don est réparti entre les fonds par `fundDonations` — le don porte le total, chaque `fundDonation` porte une tranche. `donations.currency` et `gateways.currency` portent la devise ISO ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Parcours de bout en bout

### Don ponctuel et récurrent par le membre (B1App)

L'écran de don authentifié (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compose trois composants d'apphelper : `MultiGatewayDonationForm`, `PaymentMethods` et `RecurringDonations`. B1App s'occupe du chargement des données qui l'entourent — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — et transmet la liste des passerelles ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. Le paiement lui-même a lieu dans apphelper : le fournisseur résolu tokenise le moyen (nouveau ou enregistré), puis envoie à `/giving/donate/charge` pour un don ponctuel, ou à `/giving/donate/subscribe` pour un don récurrent. Les deux points de terminaison attribuent un donateur connecté à son propre `personId` (seuls les détenteurs de `donations.edit` peuvent attribuer à quelqu'un d'autre) et rejettent les répartitions de fonds dont le total dépasse le montant débité. Les dons récurrents créent une ligne `subscriptions` plus `subscriptionFunds` et confient l'échéancier à la passerelle (Stripe Subscriptions, PayPal Billing Plans, ou un échéancier récurrent KF).

### Don pour visiteurs et anonyme

La page publique de don (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau « donner maintenant » rendent `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte Elements de la passerelle autour du `GuestForm` du fournisseur. Les visiteurs n'ont ni connexion, ni moyens enregistrés, ni historique. Le parcours récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques seulement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur, puis envoie à `/giving/donate/charge` (ou `/subscribe`). L'appel de vérification renvoie un `captchaPass` signé en HMAC valable 10 minutes (`Api/src/modules/giving/helpers/CaptchaPass.ts`) que le formulaire envoie avec chaque appel d'argent d'un visiteur ; avec `CAPTCHA_ENFORCE=true`, l'Api refuse les appels visiteurs `create-order`, `charge`, `subscribe`, `addcard` et `ach-setup-intent-anon` sans laissez-passer valide pour cette église. Les inscriptions payantes d'un visiteur à un événement (`POST /content/registrations/register`) vérifient le même laissez-passer juste avant leur paiement ; voir [Inscriptions aux événements](./registrations.md#payment-flow). Le prélèvement ACH pour visiteurs utilise l'appel anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, qui n'autorise que la vérification instantanée (Financial Connections) : une vérification par micro-dépôts se termine des jours plus tard, une fois la page du visiteur fermée, et ne pourrait donc jamais aboutir au don. Le formulaire refuse de débiter un SetupIntent non vérifié et oriente le donateur vers la carte ou une configuration bancaire pour utilisateur connecté.

Trois options du formulaire pour visiteurs empruntent le même appel de paiement. `?fundId=` et `?amount=` dans l'URL de don préselectionnent la répartition des fonds (lues par le formulaire pour visiteurs de chaque fournisseur au montage, et acheminées par le gestionnaire normal de changement de fonds afin que les totaux et les frais se mettent à jour). `anonymous: true` fait en sorte que `DonateController.charge` écarte toute personne envoyée par le client et enregistre le don avec `personId = null` ; le formulaire pour visiteurs saute `/people/loadOrCreate` et l'étape du client/coffre-fort ; et les trois fournisseurs à enregistrement immédiat cessent de résoudre une personne à partir du client de la passerelle. Apple Pay exige que le domaine de la page soit enregistré auprès de Stripe ; un formulaire Stripe pour visiteurs envoie donc une fois par session à `POST /giving/donate/register-domain`, public et limité en débit, qui n'accepte qu'un domaine appartenant à l'église (`<subDomain>.b1.church`, une ligne de la table des domaines du module content, ou un hôte local) avant d'appeler l'API des domaines de moyens de paiement de Stripe.

### Saisie par l'administration et importation Stripe (B1Admin)

La section des dons de B1Admin (`B1Admin/src/donations/`) est l'endroit où travaillent les équipes financières. La saisie par lots (`components/BulkDonationEntry.tsx`) enregistre les dons en espèces, par chèque ou en nature en envoyant `/giving/donations` puis `/giving/funddonations` — sans aucune passerelle. La feuille **Enregistrer un don** de la fiche d'une personne (`components/LogGiftDialog.tsx`) fait de même pour un seul don, en trouvant d'abord le lot dont `batchDate` correspond à la date du don, ou en créant un lot nommé pour cette date (`POST /giving/donationbatches`), puis en supprimant à nouveau le don ou le nouveau lot si une étape ultérieure échoue. Les fonds, lots, campagnes et reçus correspondent chacun à leurs routes CRUD `/giving/*` ; les pages de reçus de dons (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) demandent une année civile avec `GET /donations?startDate=&endDate=` et `GET /fundDonations?startDate=&endDate=` plutôt que l'historique complet de l'église, qui pourrait dépasser la limite de taille de réponse de Lambda. Le panneau de don de type membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants d'apphelper que B1App.

Les tâches de rapport et de comptabilité se font côté client ou via le moteur de rapports, et non par la passerelle : l'exportation QuickBooks de la page de lot construit un fichier CSV d'écriture de journal à partir de `donations` + `fundDonations` du lot (débit de Fonds non déposés, un crédit par fonds), la vue des donateurs en décrochage de la page Sommaire exécute `Api/reports/lapsedGivers.json` par le moteur de rapports générique avec les noms des personnes résolus par `ReportOutput`, et les formats de reçus par pays (Canada / Australie / Nouvelle-Zélande) sont des paramètres d'église dans le magasin clé-valeur du module membership, rendus par `GivingStatementDocument` et dupliqués dans la page d'impression de B1App. Les pages d'impression des reçus de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) transmettent le paramètre `logoLight` de l'église (via `usePrintLogo` dans `B1Admin/src/components/PrintChurchHeader.tsx`) pour que le logo s'imprime en haut de chaque reçu, et attendent le chargement de l'image avant l'impression automatique.

### Statut des lots et autorisation Saisir les dons

Les lots peuvent être fermés pour qu'un dépôt compté reste tel quel. `POST /giving/donationbatches/:id/close` et `/:id/reopen` (Donations.Edit seulement) sont les seuls écrivains de `status`, `closedDate` et `closedBy` (`DonationBatchRepo.setStatus`) ; un enregistrement normal de lot ne les touche jamais, donc poster un lot ne peut pas le rouvrir. Le droit d'écriture est centralisé dans `Api/src/modules/giving/helpers/BatchAccessHelper.ts` : Donations.Edit peut tout modifier, tandis que l'autorisation plus restreinte Donations.Enter (`GivingApi` / `Donations` / `Enter`, « Saisir les dons » dans l'éditeur de rôles) peut créer des lots et enregistrer ou supprimer des dons et des répartitions de fonds seulement lorsque le lot actuel du don et le lot cible sont tous deux ouverts, et jamais pour un don de passerelle (celui qui porte un `transactionId`). Une écriture bloquée renvoie `403 { error: "This batch is closed." }`. La lecture des lots accepte Donations.ViewSummary ou Donations.Enter afin qu'un compteur puisse choisir le lot dans lequel il saisit. Côté client, `B1Admin/src/donations/batchAccess.ts` reprend ces règles (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), et `Header` / `SecondaryMenuHelper` affichent **Dons > Lots** à quiconque peut voir les lots, même sans Voir le sommaire.

### Conversion des totaux en devises mixtes

Tout point de terminaison qui renvoie un total combiné unique à partir de dons possiblement en devises mixtes — les indicateurs clés du sommaire des dons (`GivingKpiCards`), le total d'un lot de dons, le total d'un fonds, et les totaux de l'année en cours et de la période de l'écran de don de B1App — convertit dans la devise par défaut de l'église côté serveur, au lieu d'additionner des devises incompatibles. `Api/src/shared/helpers/ExchangeRateHelper.ts` récupère les taux auprès de `api.frankfurter.dev` selon la devise de l'église, les met en cache dans le processus pendant 12 heures, et expose `convertTotals(rows, churchCurrency, rates)` : les lignes sont pré-groupées par devise en SQL (quelques groupes, jamais une conversion par don), chaque groupe est converti et additionné, et le résultat porte un indicateur `isConverted` que le client utilise pour afficher une note « Converti aux taux de change actuels ». `GET /donations/exchange-rates` expose la table des taux aux clients qui en ont besoin (l'écran de don de B1App) ; les taux eux-mêmes ne sont jamais acceptés depuis une requête, seulement récupérés côté serveur, de sorte qu'un client ne peut pas influencer un total présenté. Les dons individuels et les rapports historiques ou en devise d'origine ne sont jamais convertis — seuls les totaux combinés le sont.

L'importation Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rattrape les dons faits en dehors de B1 : elle appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour une prévisualisation, puis `dryRun: false` pour importer. Le serveur liste les événements Stripe pour la plage de dates et ignore ceux déjà enregistrés — d'abord par identifiant de fournisseur dans `eventLogs`, puis par identifiant de transaction, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) afin qu'une nouvelle exécution n'importe jamais deux fois. Les événements `charge.succeeded` / `payment_intent.succeeded` des abonnements sont ignorés parce que `invoice.paid` enregistre ces dons ; les versions récentes de l'API Stripe ne fournissent plus `PaymentIntent.invoice`, donc le contrôle se base aussi sur la description « Subscription … ».

## Webhooks et réconciliation

Les paiements réglés et les changements d'état d'abonnement arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est délibérément idempotent :

1. **Vérifier** — `GatewayService.verifyWebhook` délègue la vérification de signature au fournisseur ; une signature invalide renvoie 401. Les événements qui n'ont pas besoin de traitement s'arrêtent avec un 200.
2. **Dédoublonner l'événement** — `EventLogRepo.loadByProviderId` ignore un webhook déjà enregistré dans `eventLogs`.
3. **Dédoublonner le don** — avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié pour chaque identifiant candidat que la charge utile peut contenir. Cela absorbe les livraisons en double, les événements ACH en plusieurs étapes (en attente → réglé), et le cas où `/donate/charge` a déjà enregistré le don de façon optimiste.
4. **Appliquer** — `classifyWebhookEvent(eventType)` du fournisseur indique ce que signifie l'événement (don en attente/complet, `cancel-subscription`, ou `ignore`) ; les paiements complétés créent un don `complete` (ou font passer un don existant `pending` ou `failed` à `complete`), les événements de type ACH arrivent en `pending` jusqu'au règlement, une facture d'abonnement échouée (`invoice.payment_failed` de Stripe) crée un don `failed` clé sur l'identifiant de la facture, et les événements d'annulation suppriment la ligne locale `subscriptions`. Le contrôleur n'examine jamais les noms d'événements propres à un fournisseur.

### Dons récurrents en échec et relances

Un don `failed` est l'unité de travail pour le recouvrement. `GET /giving/donations/failed` les liste avec le message d'échec le plus récent de la passerelle depuis `eventLogs` et un indicateur `canRetry` tiré des capacités de la passerelle ; `POST /giving/donate/retry/:donationId` appelle `retryFailedPayment` du fournisseur (Stripe règle la facture ouverte), et le webhook qui en résulte fait passer la ligne à `complete` par le chemin de déduplication normal. Les courriels de relance partent au donateur depuis le gestionnaire de webhook le jour 0, puis depuis `DunningHelper.run` dans la minuterie de minuit (branchée dans `lambda/timer-handler.ts` et `RailwayCron.ts`) aux jours 3 et 7 ; chaque envoi est consigné dans `eventLogs` comme `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de sorte qu'une nouvelle exécution n'envoie jamais deux fois le même courriel. Lorsque Stripe abandonne et annule l'abonnement (`customer.subscription.deleted` avec `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envoie un seul courriel au donateur (`providerId: "<subscriptionId>:canceled"`) ; les annulations à l'initiative du donateur ou de l'administrateur restent silencieuses. Stripe n'ajoute jamais d'événements à un point de terminaison existant : après avoir modifié `StripeHelper.webhookEvents`, il faut soit enregistrer de nouveau la passerelle, soit exécuter `tools/manual/stripe-webhook-events.ts` (essai à blanc par défaut, `--apply` pour écrire) sur la production.

Les fournisseurs dotés de `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ont leurs paiements enregistrés depuis la réponse de `/charge` (aucun aller-retour de webhook n'est nécessaire dans le cas nominal), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et sur `payment_intent.processing` pour l'ACH. La gestion des frais (`POST /giving/donate/fee`, l'indicateur `payFees` de la passerelle, et `calculateFees` de chaque fournisseur) calcule la majoration « couvrir les frais » côté donateur — B1 ne prélève aucune commission de plateforme, donc aucun frais d'application n'est jamais ajouté.

:::info
Le chemin de paiement et celui des webhooks écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui empêche un paiement enregistré de façon optimiste et son webhook ultérieur de produire deux dons pour un même don.
:::

## Pages connexes

- [Points de terminaison Giving](../api/endpoints/giving.md) — surface REST complète pour les dons, fonds, lots, passerelles, abonnements, moyens de paiement et webhooks
- [AppHelper](../shared-libraries/app-helper.md) — le paquet npm qui fournit le registre des fournisseurs de paiement et les composants de don
- [Structure des modules](../api/module-structure.md) — organisation côté serveur du module GivingApi
