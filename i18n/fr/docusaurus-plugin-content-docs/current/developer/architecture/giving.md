---
title: "Architecture des dons"
---

# Architecture des dons

<div class="article-intro">

ChurchApps fait fonctionner les dons sur un modèle de « rail de passerelle » : l'église conserve son propre compte Stripe (ou PayPal, ou Kingdom Funding), et B1 ne s'insère jamais dans le circuit de l'argent en tant que processeur de plateforme. Les données de carte sont tokenisées dans le navigateur et n'atteignent jamais un serveur ChurchApps. Cette page décrit toute la pile — le registre de fournisseurs de paiement côté client dans `@churchapps/apphelper`, l'abstraction de passerelle de GivingApi, le modèle de données de dons, et comment les webhooks de passerelle se réconcilient dans la base de données.

</div>

## Vue d'ensemble

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (navigateur)│                   │  Passerelle de paiement                │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ saisie de carte    │  Stripe Elements · tokenizer KF ·     │
│  │ Registre de           │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ fournisseur de paiement│  │◀── jeton / nonce ─│  (la carte n'atteint jamais un serveur B1)│
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ événement
┌─────────────────────────────────────────────┐ (clé secrète)│                │ webhook signé
│  GivingApi — module /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  sauvegarde donations + fundDonations — dédup via eventLogs / transactionId
                      ▼
                MySQL (schéma giving)
```

Trois principes tiennent sur l'ensemble de la pile :

1. **La passerelle détient la carte.** Le widget de saisie de chaque fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un jeton, un nonce, ou un id de commande.
2. **Une abstraction, plusieurs fournisseurs.** Le navigateur résout un `PaymentProvider` depuis un registre ; le serveur résout un `IGatewayProvider` depuis une fabrique. Les deux se calent sur le même nom de fournisseur normalisé stocké sur l'enregistrement de passerelle.
3. **Les webhooks sont la source de vérité pour le règlement.** Une réponse de charge est enregistrée de façon optimiste, mais c'est le webhook signé de la passerelle qui confirme (ou crée) le don complété, avec des garde-fous d'idempotence des deux côtés.

## Côté client : le registre de fournisseurs de paiement (`@churchapps/apphelper`)

Le registre vit dans `Packages/apphelper/src/donations/providers/`, avec les widgets et aides de chaque fournisseur dans son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — rien en dehors de `providers/` ne fait de branchement sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce dont une application hôte a besoin pour une passerelle : un `descriptor` (étiquettes d'administration, devises supportées, champs de frais, taux de frais par défaut, URL de tableau de bord/inscription), un ensemble de drapeaux `capabilities` (cartes enregistrées, ACH, récurrent, saisie de nouvelle carte en ligne, sauvegarde implicite à la tokenisation), les widgets React pour la saisie membre (`MemberWrapper`/`MemberEntry`), le don invité (`GuestForm`), l'édition de méthode enregistrée (`MethodEditForm`), et les paiements par question de formulaire (`FormPayment`), plus `buildChargeRequest(ctx, token)` — l'unique endroit où la forme de la charge utile diffère selon le fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK depuis la clé publique de l'enregistrement de passerelle, si bien que les applications hôtes n'importent jamais un SDK de passerelle (B1App et B1Admin n'ont aucune dépendance `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise la passerelle qu'une église doit utiliser pour une surface donnée.

`providers/registry.ts` contient les fournisseurs intégrés. Ils sont **référencés par valeur**, pas enregistrés via un effet de bord de module, si bien que le tree-shaking d'un bundler ne peut jamais supprimer l'enregistrement :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Fonction | Objet |
|----------|-------|
| `getPaymentProvider(name)` | Résout par nom normalisé ; revient à Stripe pour qu'un fournisseur mal configuré ne fasse jamais planter durement le formulaire de donateur |
| `registerPaymentProvider(p)` | Enregistre un fournisseur supplémentaire à l'exécution (pour une passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumère les intégrés + les personnalisés — utilisé pour construire la liste déroulante de passerelle de l'administration |
| `hasPaymentProvider(name)` | Vérification d'appartenance |

**Fournisseurs clients intégrés : Stripe, PayPal, Kingdom Funding.** B1App et B1Admin ne font que *lire* le registre (`getPaymentProvider`, `listPaymentProviders`) ; ni l'un ni l'autre n'appelle `registerPaymentProvider` — l'enregistrement reste interne à apphelper.

Chaque fournisseur tokenise différemment, mais tous gardent la carte hors de B1 :

| Fournisseur | Widget de saisie | Jeton renvoyé à l'API |
|----------|--------------|-----------------------|
| Stripe | `Elements` `CardElement` de Stripe → `stripe.createPaymentMethod(...)` | id de méthode de paiement (`pm_…`) ; banque via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Formulaire tokenizer hébergé, clé par la clé publique de la passerelle | nonce à usage unique |
| PayPal | PayPal Hosted Fields ; commande côté serveur construite via `/donate/client-token` + `/donate/create-order` | id de commande capturée |

Le `finalizeResult` de Stripe exécute 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que le don ne soit considéré comme complet ; le formulaire partagé appelle simplement `provider.finalizeResult(result)` sans savoir ce qu'il fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; le câblage de passerelle vit dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement à un SDK de passerelle — il passe par `GatewayService`, qui résout le bon `IGatewayProvider` depuis `GatewayFactory` et lui remet un `GatewayConfig` déchiffré.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() déchiffre privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente — cycle de vie du webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion des méthodes enregistrées (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), et extras optionnels (clients, commandes, SetupIntents, relecture d'événements). Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises supportées, ACH, remboursements, exigences d'abonnement, limites de transaction) — `GatewayService.getProviderCapabilities(provider)` se contente de la lire — et des drapeaux comme `logsDonationsImmediately` pilotent le comportement du contrôleur sans aucun conditionnel sur le nom du fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|----------|-------------|
| Stripe | Toujours actif |
| PayPal | Toujours actif |
| Kingdom Funding | Toujours actif |
| Square | Opt-in via le drapeau d'environnement `ENABLE_SQUARE` |
| ePayMints | Opt-in via le drapeau d'environnement `ENABLE_EPAYMINTS` |

Des fournisseurs personnalisés peuvent être enregistrés à l'exécution quand `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-ci. Les noms de fournisseur sont comparés sans distinction de casse.

### Configuration de la passerelle et secrets

Un administrateur sauvegarde les identifiants de passerelle via `POST /giving/gateways` (`GatewayController`). À la sauvegarde, le contrôleur chiffre les clés privées et webhook avec `EncryptionHelper` avant de persister, puis — sur tout hôte non-localhost — supprime le webhook existant de l'église et en provisionne un nouveau pointant vers `/giving/donate/webhook/{provider}?churchId=…`. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) ne renvoient que les clés publiques.

## Modèle de données

Le schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Table | Rôle |
|-------|------|
| `gateways` | Configuration de fournisseur par église : `provider`, `publicKey`, `privateKey`/`webhookKey` chiffrées, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Désignations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Regroupement pour saisie/reporting (`name`, `batchDate`) |
| `donations` | Un don : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Répartition d'un don sur un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'id d'abonnement de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition en fonds pour un don récurrent |
| `customers` | Relie un `personId` à son id client de passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes/comptes bancaires enregistrés : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit webhook/événement et clé de déduplication (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesses de dons liées à un fonds, et le montant promis par chaque personne |

Un don est réparti sur des fonds via `fundDonations` — le don porte le total, chaque `fundDonation` porte une tranche. `donations.currency` et `gateways.currency` portent la devise ISO ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Flux de bout en bout

### Membre, ponctuel et récurrent (B1App)

L'écran de don authentifié (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compose trois composants apphelper : `MultiGatewayDonationForm`, `PaymentMethods`, et `RecurringDonations`. B1App effectue le chargement de données environnant — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — et transmet la liste de passerelles ; le fournisseur résolu charge son propre SDK depuis la clé publique de la passerelle. La charge elle-même se produit à l'intérieur d'apphelper : le fournisseur résolu tokenise la méthode (nouvelle ou enregistrée), puis poste vers `/giving/donate/charge` pour un don ponctuel ou `/giving/donate/subscribe` pour un don récurrent. Les dons récurrents créent une ligne `subscriptions` plus des `subscriptionFunds` et transmettent le calendrier à la passerelle (Stripe Subscriptions, PayPal Billing Plans, ou un calendrier récurrent KF).

### Don d'invité / anonyme

La page de don publique (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau « donner maintenant » affichent `NonAuthDonationWrapper` depuis `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte Elements de la passerelle autour du `GuestForm` du fournisseur. Les invités n'ont ni connexion, ni méthodes enregistrées, ni historique. Le flux récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (clés publiques seulement), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenise dans le navigateur, et poste vers `/giving/donate/charge` (ou `/subscribe`). L'ACH invité utilise le `POST /giving/paymentmethods/ach-setup-intent-anon` anonyme.

### Saisie administrative et importation Stripe (B1Admin)

La section dons de B1Admin (`B1Admin/src/donations/`) est là où les équipes financières travaillent. La saisie en lot (`components/BulkDonationEntry.tsx`) enregistre les dons en espèces/chèque/en nature en postant sur `/giving/donations` puis `/giving/funddonations` — aucune passerelle impliquée. Les fonds, lots, campagnes, et relevés se mappent chacun sur leurs routes CRUD `/giving/*`. Le panneau de don façon membre (`B1Admin/src/donationComponents/`) réutilise les mêmes composants apphelper que B1App.

L'importation Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) rétro-remplit les dons effectués hors de B1 : elle appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis `dryRun: false` pour importer. Le serveur liste les événements Stripe pour la plage de dates et ignore tout ce qui est déjà enregistré — mis en correspondance d'abord par id de fournisseur dans `eventLogs`, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) pour qu'une relance n'importe jamais en double.

## Webhooks et réconciliation

Les paiements réglés et les changements d'état d'abonnement arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est délibérément idempotent :

1. **Vérifier** — `GatewayService.verifyWebhook` délègue à la vérification de signature du fournisseur ; une signature échouée renvoie 401. Les événements qui n'ont pas besoin de traitement court-circuitent avec 200.
2. **Dédupliquer l'événement** — `EventLogRepo.loadByProviderId` ignore un webhook déjà enregistré dans `eventLogs`.
3. **Dédupliquer le don** — avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié pour chaque id candidat que la charge utile pourrait porter. Cela absorbe les livraisons dupliquées, les événements ACH multi-étapes (en attente → réglé), et le cas où `/donate/charge` a déjà enregistré le don de manière optimiste.
4. **Appliquer** — le `classifyWebhookEvent(eventType)` du fournisseur indique ce que signifie l'événement (don `pending`/`complete`, `cancel-subscription`, ou `ignore`) ; les paiements complétés créent un don `complete` (ou font passer un `pending` existant à ce statut), les événements de type ACH sont enregistrés `pending` jusqu'au règlement, et les événements d'annulation suppriment la ligne `subscriptions` locale. Le contrôleur n'inspecte jamais les noms d'événements propres à un fournisseur.

Les fournisseurs avec `logsDonationsImmediately` (PayPal, Kingdom Funding) voient leurs charges enregistrées depuis la réponse `/charge` (pas d'aller-retour webhook nécessaire pour le cas nominal), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et l'ACH sur `payment_intent.processing`. La gestion des frais (`POST /giving/donate/fee`, le drapeau de passerelle `payFees`, et le `calculateFees` de chaque fournisseur) calcule le « couvrir les frais » majoré côté donateur — B1 ne prélève aucune commission de plateforme, donc aucun frais d'application n'est jamais ajouté.

:::info
Les chemins de charge et de webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui empêche un enregistrement de charge optimiste et son webhook ultérieur de produire deux dons pour un seul don.
:::

## Pages connexes

- [Points de terminaison des dons](../api/endpoints/giving) — surface REST complète pour les dons, fonds, lots, passerelles, abonnements, méthodes de paiement, et webhooks
- [AppHelper](../shared-libraries/app-helper) — le paquet npm qui fournit le registre de fournisseurs de paiement et les composants de don
- [Structure des modules](../api/module-structure) — comment le module GivingApi est organisé côté serveur
