---
title: "Architecture des dons"
---

# Architecture des dons

<div class="article-intro">

ChurchApps gère les dons selon un modèle de passerelle de paiement : l'église conserve son propre compte Stripe (ou PayPal, Kingdom Funding ou Paystack), et B1 ne se trouve jamais dans le circuit de l'argent en tant que processeur de paiement de la plateforme. Les données de carte sont tokenisées dans le navigateur et n'atteignent jamais un serveur ChurchApps. Cette page présente l'ensemble de la pile : le registre des fournisseurs de paiement côté client dans `@churchapps/apphelper`, l'abstraction de passerelle GivingApi, le modèle de données des dons, et la manière dont les webhooks de la passerelle se réconcilient avec la base de données.

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

1. **La passerelle détient la carte.** Le widget de saisie de chaque fournisseur tokenise les données dans le navigateur ; l'API ne reçoit jamais qu'un jeton, un nonce ou un identifiant de commande.
2. **Une seule abstraction, plusieurs fournisseurs.** Le navigateur résout un `PaymentProvider` à partir d'un registre ; le serveur résout un `IGatewayProvider` à partir d'une fabrique. Les deux s'appuient sur le même nom de fournisseur normalisé stocké dans l'enregistrement de la passerelle.
3. **Les webhooks font foi pour le règlement.** La réponse à un débit est enregistrée de manière optimiste, mais c'est le webhook signé de la passerelle qui confirme (ou crée) le don finalisé, avec des garde-fous d'idempotence des deux côtés.

## Côté client : le registre des fournisseurs de paiement (`@churchapps/apphelper`)

Le registre se trouve dans `Packages/apphelper/src/donations/providers/`, chaque fournisseur ayant ses widgets et ses utilitaires dans son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Rien en dehors de `providers/` ne fait de branchement sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce dont une application hôte a besoin pour une passerelle : un `descriptor` (libellés d'administration, devises prises en charge, champs de frais, taux de frais par défaut, URL du tableau de bord et d'inscription), un ensemble de drapeaux `capabilities` (cartes enregistrées, prélèvement ACH, récurrence, saisie d'une nouvelle carte en ligne, enregistrement implicite lors de la tokenisation), les widgets React de saisie pour les membres (`MemberWrapper`/`MemberEntry`), le don d'un invité (`GuestForm`), la modification d'un mode de paiement enregistré (`MethodEditForm`) et les paiements liés aux questions de formulaire (`FormPayment`), ainsi que `buildChargeRequest(ctx, token)`, l'unique endroit où la structure de la charge utile de débit varie selon le fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique figurant dans l'enregistrement de la passerelle ; les applications hôtes n'importent donc jamais le SDK d'une passerelle (B1App et B1Admin n'ont aucune dépendance à `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise le choix de la passerelle que doit utiliser une interface parmi celles de l'église.

`providers/registry.ts` contient les fournisseurs intégrés. Ils sont **référencés par valeur**, et non enregistrés par un effet de bord de module, afin que le « tree-shaking » du bundler ne puisse jamais supprimer l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Fonction | Rôle |
|----------|---------|
| `getPaymentProvider(name)` | Résout par nom normalisé ; se replie sur Stripe afin qu'un fournisseur mal configuré ne fasse jamais planter le formulaire du donateur |
| `registerPaymentProvider(p)` | Enregistre un fournisseur supplémentaire à l'exécution (pour la passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumère les fournisseurs intégrés et personnalisés — utilisé pour construire la liste déroulante des passerelles dans l'administration |
| `hasPaymentProvider(name)` | Vérifie l'appartenance |

**Fournisseurs client intégrés : Stripe, PayPal, Kingdom Funding, Paystack.** B1App et B1Admin ne font que *lire* le registre (`getPaymentProvider`, `listPaymentProviders`) ; aucune des deux n'appelle `registerPaymentProvider` — l'enregistrement reste dans apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte hors de B1 :

| Fournisseur | Widget de saisie | Jeton renvoyé à l'API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` ; le formulaire invité monte aussi un `ExpressCheckoutElement` (Apple Pay / Google Pay, dons ponctuels) dont `onConfirm` aboutit au même identifiant `pm_…` | identifiant de moyen de paiement (`pm_…`) ; banque via `/paymentmethods/ach-setup-intent` — Financial Connections `us_bank_account` pour les passerelles en USD, prélèvement pré-autorisé canadien `acss_debit` (fenêtre modale de mandat hébergée, mandat `default_for` factures/abonnements, les débits ponctuels transmettent l'identifiant du mandat) pour les passerelles en CAD |
| Kingdom Funding | Formulaire de tokenisation hébergé, associé à la clé publique de la passerelle | nonce à usage unique |
| PayPal | PayPal Hosted Fields (carte, récurrence) plus PayPal Smart Buttons avec financement Venmo (ponctuel) ; les deux partagent un seul chargement du SDK et la commande côté serveur créée via `/donate/client-token` + `/donate/create-order` | identifiant de commande capturée |
| Paystack | Fenêtre Paystack Inline (`js.paystack.co/v2/inline.js`) — c'est la fenêtre elle-même qui effectue le paiement (carte, argent mobile, virement bancaire, USSD) | référence de transaction payée ; les moyens de paiement enregistrés sont des codes d'autorisation Paystack `AUTH_…` |

La méthode `finalizeResult` de Stripe exécute l'authentification 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que le don soit considéré comme finalisé ; le formulaire commun se contente d'appeler `provider.finalizeResult(result)` sans connaître son fonctionnement.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; la mécanique des passerelles se trouve dans `Api/src/shared/helpers`. `DonateController` n'appelle jamais directement le SDK d'une passerelle : il passe par `GatewayService`, qui résout le bon `IGatewayProvider` à partir de `GatewayFactory` et lui transmet une `GatewayConfig` déchiffrée.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente : cycle de vie des webhooks (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion des moyens de paiement enregistrés (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), et fonctions optionnelles (clients, commandes, SetupIntents, rejeu d'événements, `retryFailedPayment` pour une facture d'abonnement en échec, `registerPaymentMethodDomain` pour la vérification de domaine Apple Pay). Un fournisseur qui omet une fonction optionnelle est signalé comme non pris en charge pour cette action, et l'interface masque le contrôle correspondant. Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises prises en charge, ACH, remboursements, exigences d'abonnement, limites de transaction) — `GatewayService.getProviderCapabilities(provider)` se contente de la lire — et des drapeaux comme `logsDonationsImmediately` pilotent le comportement des contrôleurs sans aucune condition sur le nom du fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|----------|-------------|
| Stripe | Toujours activé |
| PayPal | Toujours activé |
| Kingdom Funding | Toujours activé |
| Paystack | Toujours activé (marchands du Nigeria, du Ghana, d'Afrique du Sud, du Kenya et de Côte d'Ivoire ; devises NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Sur option, via l'indicateur d'environnement `ENABLE_SQUARE` |
| ePayMints | Sur option, via l'indicateur d'environnement `ENABLE_EPAYMINTS` |

Paystack se distingue des autres en ce que l'argent circule avant que GivingApi n'intervienne : la fenêtre débite le donateur, `processCharge` est un `GET /transaction/verify/:reference` dont le montant payé et la devise doivent correspondre au don enregistré (une référence déjà présente n'est jamais enregistrée deux fois), et le premier don d'un échéancier récurrent est enregistré depuis `finalizeSubscription` (vérification → `POST /plan` → `POST /subscription` avec `start_date` à un intervalle de distance). Les webhooks sont signés avec la clé secrète elle-même (`x-paystack-signature`, HMAC-SHA512 sur le corps brut), et Paystack ne propose aucune API de gestion des webhooks ; l'écran d'administration affiche donc l'URL à coller par l'église dans son tableau de bord. Les événements `charge.success` de renouvellement ne contiennent pas la répartition par fonds ; le fournisseur la retrouve à partir des lignes locales `subscriptions`/`subscriptionFunds` du donateur. Seules les autorisations par carte sont `reusable` — les dons par argent mobile sont uniquement ponctuels, si bien que `createSubscription` les refuse. Les données de démonstration ajoutent une seconde église (Accra Community Church, `CHU00000002`) reliée à une passerelle Paystack en mode test avec la devise GHS, afin que la suite Playwright de Paystack s'exécute à côté de celle de Stripe de Grace.

Des fournisseurs personnalisés peuvent être enregistrés à l'exécution lorsque `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseurs sont comparés sans tenir compte de la casse.

### Configuration de la passerelle et secrets

Un administrateur enregistre les identifiants de la passerelle via `POST /giving/gateways` (`GatewayController`). Lors de l'enregistrement, le contrôleur chiffre les clés privée et de webhook avec `EncryptionHelper` avant de les persister, puis — sur tout hôte autre que localhost — supprime le webhook existant de l'église et en provisionne un nouveau pointant vers `/giving/donate/webhook/{provider}?churchId=…`. Une église conserve une seule ligne par fournisseur : enregistrer une passerelle ne remplace que la ligne existante pour ce même fournisseur. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ne renvoient que les clés publiques.

## Modèle de données

Le schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Table | Rôle |
|-------|------|
| `gateways` | Configuration du fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffrées, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Affectations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour la saisie et les rapports (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Un don : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded` ; les relevés, totaux, tableaux de bord et rapports de dons ne comptent que les statuts `complete` ou null), `transactionId` |
| `fundDonations` | Répartition d'un don entre un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'identifiant d'abonnement de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition par fonds d'un don récurrent |
| `customers` | Relie un `personId` à son identifiant client chez la passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes et comptes bancaires enregistrés : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Journal d'audit des webhooks et événements, et clé de déduplication (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesses de dons liées à un fonds, et montant promis par chaque personne |

Un don est réparti entre les fonds par l'intermédiaire de `fundDonations` — le don porte le total, chaque `fundDonation` porte une part. `donations.currency` et `gateways.currency` portent le code de devise ISO ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Parcours de bout en bout

### Dons ponctuels et récurrents des membres (B1App)

L'écran de don authentifié (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) combine trois composants d'apphelper : `MultiGatewayDonationForm`, `PaymentMethods` et `RecurringDonations`. B1App assure le chargement des données environnantes — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — et transmet la liste des passerelles ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. Le débit lui-même a lieu dans apphelper : le fournisseur résolu tokenise le moyen de paiement (nouveau ou enregistré), puis envoie une requête à `/giving/donate/charge` pour un don ponctuel ou à `/giving/donate/subscribe` pour un don récurrent. Les deux points de terminaison attribuent un donateur connecté à son propre `personId` (seuls les détenteurs de `donations.edit` peuvent attribuer un don à quelqu'un d'autre) et rejettent les répartitions par fonds dont la somme dépasse le montant débité. Les dons récurrents créent une ligne `subscriptions` ainsi que `subscriptionFunds`, et confient l'échéancier à la passerelle (Stripe Subscriptions, PayPal Billing Plans ou un échéancier récurrent KF).

### Dons des visiteurs et anonymes

La page publique de don (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau « donner maintenant » affichent `NonAuthDonationWrapper` depuis `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte Elements de la passerelle autour du `GuestForm` du fournisseur. Les visiteurs n'ont ni connexion, ni moyens de paiement enregistrés, ni historique. Le parcours récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques uniquement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur, puis envoie une requête à `/giving/donate/charge` (ou `/subscribe`). Le prélèvement ACH pour un visiteur utilise le point de terminaison anonyme `POST /giving/paymentmethods/ach-setup-intent-anon`, qui n'autorise que la vérification instantanée (Financial Connections) : une vérification par micro-dépôts se termine plusieurs jours plus tard, une fois la page du visiteur fermée, et ne pourrait donc jamais aboutir au don. Le formulaire refuse de débiter un SetupIntent non vérifié et oriente le donateur vers la carte ou une configuration bancaire avec connexion.

Trois options du formulaire visiteur utilisent le même appel de débit. `?fundId=` et `?amount=` dans l'URL de don présélectionnent la répartition par fonds (lues par le formulaire visiteur de chaque fournisseur au montage, et transmises au gestionnaire de changement de fonds habituel afin que les totaux et les frais se mettent à jour). `anonymous: true` fait en sorte que `DonateController.charge` ignore toute personne envoyée par le client et enregistre le don avec `personId = null` ; le formulaire visiteur ignore `/people/loadOrCreate` ainsi que l'étape client/coffre-fort, et les trois fournisseurs à enregistrement immédiat cessent de rechercher une personne à partir du client de la passerelle. Apple Pay exige que le domaine de la page soit enregistré auprès de Stripe ; un formulaire visiteur Stripe envoie donc une fois par session une requête à `POST /giving/donate/register-domain`, public et limité en débit, qui n'accepte qu'un domaine appartenant à l'église (`<subDomain>.b1.church`, une ligne de la table des domaines du module de contenu, ou un hôte local) avant d'appeler l'API des domaines de moyens de paiement de Stripe.

### Saisie par l'administration et import Stripe (B1Admin)

La section des dons de B1Admin (`B1Admin/src/donations/`) est l'espace de travail des équipes financières. La saisie par lots (`components/BulkDonationEntry.tsx`) enregistre les dons en espèces, par chèque ou en nature en envoyant des requêtes à `/giving/donations` puis à `/giving/funddonations` — sans passerelle. La fiche de la personne, la feuille **Enregistrer un don** (`components/LogGiftDialog.tsx`), fait de même pour un seul don : elle recherche d'abord le lot dont `batchDate` correspond à la date du don, ou en crée un portant le nom de cette date (`POST /giving/donationbatches`), et supprime à nouveau le don ou le nouveau lot si une étape ultérieure échoue. Les fonds, lots, campagnes et relevés correspondent chacun à leurs routes CRUD `/giving/*`. Les pages de relevés de dons (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) demandent une année civile avec `GET /donations?startDate=&endDate=` et `GET /fundDonations?startDate=&endDate=`, plutôt que l'historique complet de l'église, qui pourrait dépasser la limite de taille de réponse de Lambda. Le panneau de don de style membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants apphelper que B1App.

Les transferts vers la comptabilité et les rapports relèvent du côté client ou du moteur de rapports, et non de la passerelle : l'export QuickBooks de la page de lot construit un fichier CSV d'écriture de journal à partir des `donations` + `fundDonations` du lot (débit Fonds non déposés, un crédit par fonds) ; la vue **Donateurs inactifs** de la page Résumé exécute `Api/reports/lapsedGivers.json` via le moteur de rapports générique, les noms des personnes étant résolus par `ReportOutput` ; et les formats de reçus par pays (Canada / Australie / Nouvelle-Zélande) sont des paramètres d'église stockés dans le magasin clé/valeur de l'adhésion, rendus par `GivingStatementDocument` et dupliqués dans la page d'impression de B1App. Les pages d'impression des relevés de B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) transmettent le paramètre `logoLight` de l'église (via `usePrintLogo` dans `B1Admin/src/components/PrintChurchHeader.tsx`) afin que le logo s'imprime en haut de chaque relevé, et attendent le chargement de l'image avant l'impression automatique.

### Statut des lots et autorisation de saisie des dons

Les lots peuvent être clôturés afin qu'un dépôt compté reste tel quel. `POST /giving/donationbatches/:id/close` et `/:id/reopen` (réservés à Donations.Edit) sont les seuls écrivains de `status`, `closedDate` et `closedBy` (`DonationBatchRepo.setStatus`) ; un enregistrement normal d'un lot ne les modifie jamais, de sorte que la validation d'un lot ne peut pas le rouvrir. L'accès en écriture est centralisé dans `Api/src/modules/giving/helpers/BatchAccessHelper.ts` : Donations.Edit peut tout modifier, tandis que la permission plus restreinte Donations.Enter (`GivingApi` / `Donations` / `Enter`, « Saisir des dons » dans l'éditeur de rôles) peut créer des lots, et enregistrer ou supprimer des dons et des répartitions par fonds, uniquement lorsque le lot actuel du don et son lot cible sont tous deux ouverts, et jamais pour un don de passerelle (c'est-à-dire un don portant un `transactionId`). Une écriture bloquée renvoie `403 { error: "This batch is closed." }`. La lecture des lots accepte Donations.ViewSummary ou Donations.Enter, afin qu'un compteur puisse choisir le lot dans lequel il saisit. Côté client, `B1Admin/src/donations/batchAccess.ts` reprend ces règles (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), et `Header` / `SecondaryMenuHelper` affichent **Dons > Lots** à quiconque peut voir les lots, même sans Afficher le résumé.

### Conversion des totaux en plusieurs devises

Tout point de terminaison qui renvoie un total combiné unique pour des dons potentiellement libellés dans plusieurs devises — les indicateurs de synthèse des dons (`GivingKpiCards`), le total d'un lot de dons, le total d'un fonds, et les totaux annuels ou de période de l'écran de don de B1App — convertit les montants dans la devise par défaut de l'église côté serveur, au lieu d'additionner des devises différentes. `Api/src/shared/helpers/ExchangeRateHelper.ts` récupère les taux auprès de `api.frankfurter.dev` selon la devise de l'église, les met en cache en mémoire pendant 12 heures, et expose `convertTotals(rows, churchCurrency, rates)` : les lignes sont pré-regroupées par devise en SQL (quelques groupes seulement, jamais une conversion par don), chaque groupe est converti puis additionné, et le résultat porte un indicateur `isConverted` que le client utilise pour afficher une note « Converti au taux de change actuel ». `GET /donations/exchange-rates` expose la table des taux aux clients qui en ont besoin (l'écran de don de B1App) ; les taux eux-mêmes ne sont jamais acceptés depuis une requête, ils sont toujours récupérés côté serveur, de sorte qu'un client ne puisse pas influencer un total présenté. Les enregistrements de dons individuels et les rapports historiques ou dans la devise d'origine ne sont jamais convertis — seuls les totaux combinés le sont.

L'import Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) reprend les dons effectués en dehors de B1 : il appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis avec `dryRun: false` pour importer. Le serveur liste les événements Stripe de la plage de dates et ignore ceux déjà enregistrés — d'abord par identifiant de fournisseur dans `eventLogs`, puis par identifiant de transaction, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) — de sorte qu'une nouvelle exécution n'importe jamais deux fois un même don. Les événements `charge.succeeded` / `payment_intent.succeeded` des abonnements sont ignorés, car `invoice.paid` enregistre déjà ces dons ; les versions plus récentes de l'API Stripe ne fournissent plus `PaymentIntent.invoice`, si bien que l'ignorance repose aussi sur la description « Subscription … ».

## Webhooks et réconciliation

Les paiements réglés et les changements d'état des abonnements arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est volontairement idempotent :

1. **Vérifier** — `GatewayService.verifyWebhook` délègue la vérification de la signature au fournisseur ; une signature invalide renvoie 401. Les événements qui n'ont pas besoin de traitement retournent immédiatement 200.
2. **Dédupliquer l'événement** — `EventLogRepo.loadByProviderId` ignore un webhook déjà enregistré dans `eventLogs`.
3. **Dédupliquer le don** — avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié pour chaque identifiant candidat que la charge utile pourrait contenir. Cela absorbe les livraisons en double, les événements ACH en plusieurs étapes (en attente → réglé), et le cas où `/donate/charge` a déjà enregistré le don de manière optimiste.
4. **Appliquer** — `classifyWebhookEvent(eventType)` du fournisseur indique ce que signifie l'événement (`donation` en attente/terminé, `cancel-subscription` ou `ignore`) ; les paiements terminés créent un don `complete` (ou font passer un don `pending` ou `failed` existant à ce statut), les événements de type ACH sont enregistrés comme `pending` jusqu'au règlement, une facture d'abonnement en échec (`invoice.payment_failed` de Stripe) crée un don `failed` identifié par l'identifiant de la facture, et les événements d'annulation suppriment la ligne locale `subscriptions`. Le contrôleur n'inspecte jamais les noms d'événements propres à un fournisseur.

### Dons récurrents en échec et relances

Un don `failed` est l'unité de travail pour le recouvrement. `GET /giving/donations/failed` les liste avec le dernier message d'échec de la passerelle issu de `eventLogs`, ainsi qu'un indicateur `canRetry` tiré des capacités de la passerelle ; `POST /giving/donate/retry/:donationId` appelle `retryFailedPayment` du fournisseur (Stripe règle la facture ouverte), et le webhook qui en résulte fait passer la ligne à `complete` par le chemin de déduplication habituel. Les courriels de relance sont envoyés au donateur par le gestionnaire de webhook le jour 0, puis par `DunningHelper.run` dans la minuterie de minuit (branchée à la fois dans `lambda/timer-handler.ts` et `RailwayCron.ts`) aux jours 3 et 7 ; chaque envoi est enregistré dans `eventLogs` avec `provider: "dunning"` et `providerId: "<donationId>:<day>"`, de sorte qu'une nouvelle exécution n'envoie jamais deux fois le même courriel. Lorsque Stripe abandonne et annule l'abonnement (`customer.subscription.deleted` avec `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` envoie au donateur un courriel unique (`providerId: "<subscriptionId>:canceled"`) ; les annulations à l'initiative du donateur ou de l'administrateur restent silencieuses. Stripe n'ajoute jamais d'événements à un point de terminaison existant : après avoir modifié `StripeHelper.webhookEvents`, enregistrez à nouveau la passerelle ou exécutez `tools/manual/stripe-webhook-events.ts` (simulation par défaut, `--apply` pour écrire) sur la production.

Les fournisseurs dotés de `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) ont leurs débits enregistrés à partir de la réponse de `/charge` (aucun aller-retour par webhook n'est nécessaire dans le cas nominal), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et `payment_intent.processing` pour l'ACH. La gestion des frais (`POST /giving/donate/fee`, l'indicateur de passerelle `payFees` et `calculateFees` de chaque fournisseur) calcule la majoration « couvrir les frais » côté donateur — B1 ne prélève aucune commission de plateforme, si bien qu'aucun frais d'application n'est jamais ajouté.

:::info
Le chemin du débit et celui du webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui empêche un journal de débit optimiste et son webhook ultérieur de produire deux dons pour un même cadeau.
:::

## Pages connexes

- [Points de terminaison des dons](../api/endpoints/giving) — surface REST complète pour les dons, fonds, lots, passerelles, abonnements, moyens de paiement et webhooks
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui livre le registre des fournisseurs de paiement et les composants de don
- [Structure des modules](../api/module-structure) — organisation côté serveur du module GivingApi
