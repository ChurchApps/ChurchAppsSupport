---
title: "Architecture des dons"
---

# Architecture des dons

<div class="article-intro">

ChurchApps gère les dons selon un modèle de passerelle : l'église conserve son propre compte Stripe (ou PayPal, Kingdom Funding, ou Paystack), et B1 n'intervient jamais dans le circuit de l'argent comme processeur de paiement de la plateforme. Les données de carte sont tokenisées dans le navigateur et ne parviennent jamais à un serveur ChurchApps. Cette page présente toute la pile : le registre des fournisseurs de paiement côté client dans `@churchapps/apphelper`, l'abstraction de passerelle de GivingApi, le modèle de données des dons, et la façon dont les webhooks des passerelles se réconcilient avec la base de données.

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

Trois principes valent pour toute la pile :

1. **La passerelle détient la carte.** Chaque widget de saisie de fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un jeton, un nonce ou un identifiant de commande.
2. **Une abstraction, plusieurs fournisseurs.** Le navigateur résout un `PaymentProvider` depuis un registre ; le serveur résout un `IGatewayProvider` depuis une fabrique. Les deux se basent sur le même nom normalisé du fournisseur, stocké sur l'enregistrement de la passerelle.
3. **Les webhooks font foi pour le règlement.** Une réponse de paiement est consignée de façon optimiste, mais c'est le webhook signé de la passerelle qui confirme (ou crée) le don complété, avec des garde-fous d'idempotence des deux côtés.

## Côté client : le registre des fournisseurs de paiement (`@churchapps/apphelper`)

Le registre se trouve dans `Packages/apphelper/src/donations/providers/`, chaque fournisseur ayant ses widgets et ses aides dans son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) -- rien en dehors de `providers/` ne se branche sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce dont une application hôte a besoin pour une passerelle : un `descriptor` (libellés d'administration, devises prises en charge, champs de frais, taux de frais par défaut, URL du tableau de bord et d'inscription), un ensemble d'indicateurs `capabilities` (cartes enregistrées, PAD, récurrence, saisie de nouvelle carte intégrée, sauvegarde implicite à la tokenisation), les widgets React de saisie pour les membres (`MemberWrapper`/`MemberEntry`), le don des invités (`GuestForm`), l'édition des modes de paiement enregistrés (`MethodEditForm`), et les paiements des questions de formulaire (`FormPayment`), ainsi que `buildChargeRequest(ctx, token)` -- l'unique endroit où la forme de la charge utile de paiement varie selon le fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique de l'enregistrement de la passerelle ; les applications hôtes n'importent donc jamais un SDK de passerelle (B1App et B1Admin n'ont aucune dépendance `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise le choix, parmi les passerelles d'une église, de celle qu'une interface doit utiliser.

`providers/registry.ts` contient les fournisseurs intégrés. Ils sont **référencés par valeur**, et non enregistrés par un effet de bord de module, de sorte que le « tree-shaking » d'un outil de compilation ne puisse jamais supprimer l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonction | Rôle |
|----------|---------|
| `getPaymentProvider(name)` | Résout par nom normalisé ; se replie sur Stripe pour qu'un fournisseur mal configuré ne fasse jamais planter le formulaire de don |
| `registerPaymentProvider(p)` | Enregistre un fournisseur supplémentaire à l'exécution (pour une passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumère les fournisseurs intégrés et personnalisés -- sert à construire la liste déroulante des passerelles d'administration |
| `hasPaymentProvider(name)` | Vérification d'appartenance |

**Fournisseurs clients intégrés : Stripe, PayPal, Kingdom Funding, Paystack.** B1App et B1Admin ne font que *lire* le registre (`getPaymentProvider`, `listPaymentProviders`) ; aucun des deux n'appelle `registerPaymentProvider` -- l'enregistrement reste à l'intérieur d'apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte hors de B1 :

| Fournisseur | Widget de saisie | Jeton renvoyé à l'API |
|----------|--------------|-----------------------|
| Stripe | `CardElement` de Stripe `Elements` → `stripe.createPaymentMethod(...)` ; le formulaire invité monte aussi un `ExpressCheckoutElement` (Apple Pay / Google Pay, dons ponctuels) dont `onConfirm` aboutit au même identifiant `pm_…` | identifiant de mode de paiement (`pm_…`) ; compte bancaire via `/paymentmethods/ach-setup-intent` -- Financial Connections `us_bank_account` pour les passerelles en USD, PAD canadien `acss_debit` (fenêtre de mandat hébergée, mandat `default_for` factures et abonnements, les charges ponctuelles transmettent l'identifiant du mandat) pour les passerelles en CAD |
| Kingdom Funding | Formulaire de tokenisation hébergé, indexé par la clé publique de la passerelle | nonce à usage unique |
| PayPal | PayPal Hosted Fields (carte, récurrence) plus les boutons intelligents PayPal avec le financement Venmo (ponctuel) ; les deux partagent un seul chargement de SDK, et la commande côté serveur est construite via `/donate/client-token` + `/donate/create-order` | identifiant de commande capturée |
| Paystack | Fenêtre Paystack Inline (`js.paystack.co/v2/inline.js`) -- la fenêtre elle-même effectue le paiement (carte, argent mobile, virement bancaire, USSD) | référence de transaction payée ; les modes enregistrés sont des codes d'autorisation Paystack `AUTH_…` |

La méthode `finalizeResult` de Stripe exécute l'authentification 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que le don soit considéré comme complété ; le formulaire partagé appelle simplement `provider.finalizeResult(result)` sans savoir ce qu'elle fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; la plomberie des passerelles se trouve dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement au SDK d'une passerelle -- il passe par `GatewayService`, qui résout le bon `IGatewayProvider` depuis `GatewayFactory` et lui remet une `GatewayConfig` déchiffrée.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente -- cycle de vie des webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion des modes enregistrés (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), et extras facultatifs (clients, commandes, SetupIntents, rejeu d'événements, `retryFailedPayment` pour une facture d'abonnement échouée, `registerPaymentMethodDomain` pour la vérification de domaine Apple Pay). Un fournisseur qui omet un crochet facultatif est signalé comme non pris en charge pour cette action, et l'interface masque la commande correspondante. Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises prises en charge, ACH, remboursements, exigences d'abonnement, limites de transaction) -- `GatewayService.getProviderCapabilities(provider)` se contente de la lire -- et des indicateurs comme `logsDonationsImmediately` pilotent le comportement des contrôleurs sans aucune condition sur le nom du fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|----------|-------------|
| Stripe | Toujours actif |
| PayPal | Toujours actif |
| Kingdom Funding | Toujours actif |
| Paystack | Toujours actif (commerçants du Nigeria, du Ghana, d'Afrique du Sud, du Kenya, de Côte d'Ivoire ; devises NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Activation facultative par l'indicateur d'environnement `ENABLE_SQUARE` |
| ePayMints | Activation facultative par l'indicateur d'environnement `ENABLE_EPAYMINTS` |

Paystack diffère des autres en ce sens que l'argent circule avant que GivingApi n'intervienne : la fenêtre débite le donateur, `processCharge` est un `GET /transaction/verify/:reference` dont le montant payé et la devise doivent correspondre au don consigné (une référence déjà enregistrée n'est jamais consignée deux fois), et le premier versement d'un échéancier récurrent est consigné depuis `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` avec `start_date` un intervalle plus tard). Les webhooks sont signés avec la clé secrète elle-même (`x-paystack-signature`, HMAC-SHA512 sur le corps brut), et Paystack ne propose aucune API de gestion des webhooks ; l'écran d'administration affiche donc l'URL que l'église doit coller dans son tableau de bord. Les événements `charge.success` de renouvellement ne transportent aucune répartition par fonds ; le fournisseur la récupère depuis les lignes locales `subscriptions`/`subscriptionFunds` du donateur. Seules les autorisations de carte sont `reusable` -- les dons par argent mobile sont ponctuels uniquement, donc `createSubscription` les refuse. Les données de démonstration ajoutent une seconde église (Accra Community Church, `CHU00000002`) sur une passerelle Paystack GHS en mode test, afin que la suite Playwright de Paystack s'exécute à côté de celle de Stripe de Grace.

Les fournisseurs personnalisés peuvent être enregistrés à l'exécution lorsque `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseurs sont comparés sans tenir compte de la casse.

### Configuration des passerelles et secrets

Un administrateur enregistre les identifiants d'une passerelle via `POST /giving/gateways` (`GatewayController`). À l'enregistrement, le contrôleur chiffre les clés privée et de webhook avec `EncryptionHelper` avant de les persister, puis -- sur tout hôte autre que localhost -- supprime le webhook existant de l'église et en provisionne un nouveau pointant vers `/giving/donate/webhook/{provider}?churchId=…`. Une église conserve une ligne par fournisseur : enregistrer une passerelle ne remplace que la ligne existante de ce même fournisseur. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ne renvoient que les clés publiques.

## Modèle de données

Le schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Table | Rôle |
|-------|------|
| `gateways` | Configuration du fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffrés, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Affectations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour la saisie et les rapports (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un don : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded` ; les relevés, totaux, tableaux de bord et rapports de dons ne comptent que `complete` ou null), `transactionId` |
| `fundDonations` | Répartition d'un don entre un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'identifiant d'abonnement de la passerelle, relié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition par fonds d'un don récurrent |
| `customers` | Relie un `personId` à son identifiant de client chez la passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes/comptes bancaires enregistrés : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit des webhooks/événements et clé de déduplication (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesses de dons liées à un fonds, et le montant promis par chaque personne |

Un don est réparti entre les fonds via `fundDonations` -- le don porte le total, chaque `fundDonation` porte une tranche. `donations.currency` et `gateways.currency` portent la devise ISO ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Parcours de bout en bout

### Don ponctuel et récurrent d'un membre (B1App)

L'écran de don connecté (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combine trois composants d'apphelper : `MultiGatewayDonationForm`, `PaymentMethods` et `RecurringDonations`. B1App s'occupe du chargement de données environnant -- `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` -- et transmet la liste des passerelles ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. La charge proprement dite se fait dans apphelper : le fournisseur résolu tokenise le mode de paiement (nouveau ou enregistré), puis envoie à `/giving/donate/charge` pour un don ponctuel ou à `/giving/donate/subscribe` pour un don récurrent. Les deux points de terminaison attribuent un donateur connecté à son propre `personId` (seuls les détenteurs de `donations.edit` peuvent attribuer à quelqu'un d'autre) et rejettent les répartitions par fonds dont la somme dépasse le montant débité. Les dons récurrents créent une ligne `subscriptions` ainsi que `subscriptionFunds`, et confient l'échéancier à la passerelle (Abonnements Stripe, Plans de facturation PayPal, ou un échéancier récurrent KF).

### Dons d'invités et anonymes

La page de don publique (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau « donner maintenant » rendent `NonAuthDonationWrapper` de `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte Elements de la passerelle autour du `GuestForm` du fournisseur. Les invités n'ont ni connexion, ni modes enregistrés, ni historique. Le flux récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques seulement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur, et envoie à `/giving/donate/charge` (ou `/subscribe`). L'appel de vérification renvoie un `captchaPass` signé en HMAC et valable 10 minutes (`Api/src/modules/giving/helpers/CaptchaPass.ts`), que le formulaire envoie avec chaque appel financier d'invité ; avec `CAPTCHA_ENFORCE=true`, l'Api refuse les appels invités `create-order`, `charge`, `subscribe`, `addcard` et `ach-setup-intent-anon` sans laissez-passer valide pour cette église. Le prélèvement bancaire d'invité utilise le point de terminaison anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, qui n'autorise que la vérification instantanée (Financial Connections) : une vérification par micro-dépôts se termine des jours plus tard, une fois la page de l'invité fermée, et ne pourrait donc jamais compléter le don. Le formulaire refuse de débiter un SetupIntent non vérifié et oriente le donateur vers une carte ou un compte bancaire configuré à la connexion.

Trois options du formulaire d'invité empruntent le même appel de charge. `?fundId=` et `?amount=` sur l'URL de don présélectionnent la répartition par fonds (lues par le formulaire d'invité de chaque fournisseur au montage, et acheminées par le gestionnaire normal de changement de fonds afin que les totaux et les frais se mettent à jour). `anonymous: true` fait que `DonateController.charge` écarte toute personne envoyée par le client et consigne le don avec `personId = null` ; le formulaire d'invité saute `/people/loadOrCreate` et l'étape du client/coffre ; et les trois fournisseurs à consignation immédiate cessent de résoudre une personne depuis le client de la passerelle. Apple Pay exige que le domaine de la page soit enregistré chez Stripe ; un formulaire d'invité Stripe envoie donc une fois par session à `POST /giving/donate/register-domain` (public, limité en débit), qui n'accepte qu'un domaine appartenant à l'église (`<subDomain>.b1.church`, une ligne de la table des domaines du module content, ou un hôte local) avant d'appeler l'API des domaines de moyens de paiement de Stripe.

### Saisie et importation Stripe côté administration (B1Admin)

La section Dons de B1Admin (`B1Admin/src/donations/`) est l'endroit où travaillent les équipes financières. La saisie par lot (`components/BulkDonationEntry.tsx`) enregistre les dons en espèces, par chèque ou en nature en envoyant `/giving/donations` puis `/giving/funddonations` -- sans passerelle. La fiche d'une personne, avec la fenêtre **Consigner un don** (`components/LogGiftDialog.tsx`), fait de même pour un seul don : elle trouve d'abord le lot dont `batchDate` correspond à la date du don, ou en crée un nommé d'après cette date (`POST /giving/donationbatches`), et supprime à nouveau le don ou le nouveau lot si une étape ultérieure échoue. Les fonds, les lots, les campagnes et les relevés correspondent chacun à leurs routes CRUD `/giving/*` ; les pages de relevés de dons (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) demandent une année civile avec `GET /donations?startDate=&endDate=` et `GET /fundDonations?startDate=&endDate=` plutôt que l'historique complet de l'église, qui pourrait dépasser la limite de taille de réponse de Lambda. Le panneau de don de style membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants d'apphelper que B1App.

Les échanges de comptabilité et de rapports se font côté client ou via le moteur de rapports, et non via la passerelle : l'export QuickBooks de la page de lot construit un fichier CSV d'écriture de journal à partir des `donations` + `fundDonations` du lot (débit sur Fonds non déposés, un crédit par fonds), la vue Donateurs réguliers en baisse de la page Sommaire exécute `Api/reports/lapsedGivers.json` par le moteur de rapports générique, avec les noms des personnes résolus par `ReportOutput`, et les formats de reçus par pays (Canada / Australie / Nouvelle-Zélande) sont des paramètres d'église, stockés dans le magasin clé-valeur du module membership, rendus par `GivingStatementDocument` et dupliqués dans la page d'impression de B1App. Les pages d'impression des relevés de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) transmettent le paramètre `logoLight` de l'église (via `usePrintLogo` dans `B1Admin/src/components/PrintChurchHeader.tsx`) afin que le logo s'imprime en haut de chaque relevé, et attendent le chargement de l'image avant l'impression automatique.

### Statut des lots et autorisation Saisir les dons

Les lots peuvent être fermés pour que le dépôt compté reste tel quel. `POST /giving/donationbatches/:id/close` et `/:id/reopen` (Donations.Edit seulement) sont les seuls écrivains de `status`, `closedDate` et `closedBy` (`DonationBatchRepo.setStatus`) ; un enregistrement normal de lot ne les touche jamais, de sorte que publier un lot ne peut pas le rouvrir. L'accès en écriture est centralisé dans `Api/src/modules/giving/helpers/BatchAccessHelper.ts` : Donations.Edit peut tout modifier, tandis que l'autorisation plus restreinte Donations.Enter (`GivingApi` / `Donations` / `Enter`, « Saisir les dons » dans l'éditeur de rôles) peut créer des lots et enregistrer ou supprimer des dons et des répartitions de fonds seulement lorsque le lot actuel du don et le lot cible sont tous deux ouverts, et jamais pour un don de passerelle (celui qui porte un `transactionId`). Une écriture bloquée renvoie `403 { error: "This batch is closed." }`. La lecture des lots accepte Donations.ViewSummary ou Donations.Enter afin qu'un compteur puisse choisir le lot dans lequel il saisit. Côté client, `B1Admin/src/donations/batchAccess.ts` reprend ces règles (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), et `Header` / `SecondaryMenuHelper` affichent **Dons > Lots** à quiconque peut voir les lots, même sans Voir le sommaire.

### Conversion des totaux en devises mixtes

Tout point de terminaison qui renvoie un total combiné sur des dons possiblement dans des devises mixtes -- les indicateurs clés du sommaire des dons (`GivingKpiCards`), le total d'un lot de dons, le total d'un fonds, et les totaux de l'année en cours et de la période de l'écran de don de B1App -- convertit vers la devise par défaut de l'église côté serveur plutôt que d'additionner des devises différentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` récupère les taux auprès de `api.frankfurter.dev` selon la devise de l'église, les met en cache dans le processus pendant 12 heures, et expose `convertTotals(rows, churchCurrency, rates)` : les lignes sont pré-regroupées par devise en SQL (quelques groupes, jamais une conversion par don), chaque groupe est converti et additionné, et le résultat porte un indicateur `isConverted` que le client utilise pour afficher la note « Converti aux taux de change actuels ». `GET /donations/exchange-rates` expose la table des taux aux clients qui en ont besoin (l'écran de don de B1App) ; les taux eux-mêmes ne sont jamais acceptés depuis une requête, seulement récupérés côté serveur, de sorte qu'un client ne peut pas influencer un total présenté. Les enregistrements de dons individuels et les rapports dans la devise d'origine ou historiques ne sont jamais convertis -- seuls les totaux combinés le sont.

L'importation Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rattrape les dons faits en dehors de B1 : elle appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis `dryRun: false` pour importer. Le serveur liste les événements Stripe pour la plage de dates et ignore ceux déjà enregistrés -- d'abord par identifiant de fournisseur dans `eventLogs`, puis par identifiant de transaction, puis par `DonationRepo.findMatchingDonation` (montant + date + personne), de sorte qu'une relance n'importe jamais deux fois. Les événements `charge.succeeded` / `payment_intent.succeeded` d'abonnement sont ignorés, car `invoice.paid` consigne ces dons ; les versions récentes de l'API Stripe retirent `PaymentIntent.invoice`, donc l'ignorance se base aussi sur la description « Subscription … ».

## Webhooks et réconciliation

Les paiements réglés et les changements d'état d'abonnement arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est volontairement idempotent :

1. **Vérifier** -- `GatewayService.verifyWebhook` délègue à la vérification de signature du fournisseur ; une signature invalide renvoie 401. Les événements qui n'ont pas besoin d'être traités retournent immédiatement 200.
2. **Dédupliquer l'événement** -- `EventLogRepo.loadByProviderId` ignore un webhook déjà consigné dans `eventLogs`.
3. **Dédupliquer le don** -- avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié pour chaque identifiant candidat que la charge utile pourrait porter. Cela absorbe les livraisons en double, les événements ACH en plusieurs étapes (en attente → réglé), et le cas où `/donate/charge` a déjà consigné le don de façon optimiste.
4. **Appliquer** -- `classifyWebhookEvent(eventType)` du fournisseur indique ce que signifie l'événement (`donation` en attente/complété, `cancel-subscription`, ou `ignore`) ; les paiements complétés créent un don `complete` (ou font passer un don `pending` ou `failed` existant à `complete`), les événements de type ACH restent `pending` jusqu'au règlement, une facture d'abonnement échouée (Stripe `invoice.payment_failed`) crée un don `failed` identifié par l'identifiant de la facture, et les événements d'annulation suppriment la ligne locale `subscriptions`. Le contrôleur n'inspecte jamais les noms d'événements propres à un fournisseur.

### Dons récurrents échoués et relance de paiement

Un don `failed` est l'unité de travail de la récupération. `GET /giving/donations/failed` les liste avec le message d'échec le plus récent de la passerelle provenant de `eventLogs`, et un indicateur `canRetry` tiré des capacités de la passerelle ; `POST /giving/donate/retry/:donationId` appelle `retryFailedPayment` du fournisseur (Stripe règle la facture ouverte), et le webhook qui en résulte fait passer la ligne à `complete` par le chemin de déduplication normal. Les e-mails de relance (dunning) partent vers le donateur depuis le gestionnaire de webhook au jour 0, puis depuis `DunningHelper.run` dans la minuterie de minuit (câblée dans `lambda/timer-handler.ts` et `RailwayCron.ts`) aux jours 3 et 7 ; chaque envoi est consigné dans `eventLogs` comme `provider: "dunning"`, `providerId: "<donationId>:<day>"`, de sorte qu'une relance ne renvoie jamais deux fois le même e-mail. Lorsque Stripe abandonne et annule l'abonnement (`customer.subscription.deleted` avec `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envoie au donateur un seul e-mail (`providerId: "<subscriptionId>:canceled"`) ; les annulations à l'initiative du donateur ou de l'administrateur restent silencieuses. Stripe n'ajoute jamais d'événements à un point de terminaison existant : après avoir modifié `StripeHelper.webhookEvents`, enregistrez de nouveau la passerelle ou exécutez `tools/manual/stripe-webhook-events.ts` (simulation par défaut, `--apply` pour écrire) sur la production.

Les fournisseurs avec `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ont leurs charges consignées depuis la réponse de `/charge` (aucun aller-retour de webhook n'est nécessaire pour le cas nominal), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et sur `payment_intent.processing` pour l'ACH. La gestion des frais (`POST /giving/donate/fee`, l'indicateur de passerelle `payFees`, et `calculateFees` de chaque fournisseur) calcule le « couvrir les frais » côté donateur -- B1 ne prélève aucune commission de plateforme, donc aucun frais d'application n'est jamais ajouté.

:::info
Les chemins de charge et de webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jonction qui empêche une consignation de charge optimiste et son webhook ultérieur de produire deux dons pour un même don.
:::

## Pages connexes

- [Points de terminaison Giving](../api/endpoints/giving) — surface REST complète pour les dons, les fonds, les lots, les passerelles, les abonnements, les modes de paiement et les webhooks
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui livre le registre des fournisseurs de paiement et les composants de don
- [Structure des modules](../api/module-structure) — comment le module GivingApi est organisé côté serveur
