---
title: "Architecture des dons"
---

# Architecture des dons

<div class="article-intro">

ChurchApps exécute les dons sur un modèle de voie de passerelle : l'église conserve son propre compte Stripe (ou PayPal, ou Kingdom Funding), et B1 ne s'assied jamais dans le chemin de l'argent en tant que processeur de plate-forme. Les données de carte sont tokenisées dans le navigateur et n'atteignent jamais un serveur ChurchApps. Cette page mappe toute la pile — le registre de fournisseur de paiement côté client dans `@churchapps/apphelper`, l'abstraction de passerelle GivingApi, le modèle de données de don, et comment les webhooks de passerelle se réconcilient dans la base de données.

</div>

## Aperçu

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Passerelle de paiement                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ entrée de carte   │  Stripe Elements · KF tokenizer ·     │
│  │ Registre fournisseur  │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ de paiement           │  │◀── jeton / nonce ─│  (la carte n'atteint jamais un serveur B1) │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ webhook signé
┌─────────────────────────────────────────────┐ (clé secrète) │                │ événement
│  GivingApi — module /giving                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────┬───────────────────────────┘
                  │  sauvegarder donations + fundDonations — dédupliquer via eventLogs / transactionId
                  ▼
                MySQL (schéma giving)
```

Trois principes tiennent dans toute la pile :

1. **La passerelle détient la carte.** Le widget d'entrée de chaque fournisseur tokenise dans le navigateur ; l'API ne reçoit jamais qu'un jeton, nonce, ou id de commande.
2. **Une abstraction, de nombreux fournisseurs.** Le navigateur résout un `PaymentProvider` à partir d'un registre ; le serveur résout un `IGatewayProvider` à partir d'une usine. Les deux clés off le nom de fournisseur normalisé stocké sur l'enregistrement de passerelle.
3. **Les webhooks sont la source de vérité pour le règlement.** Une réponse de charge est enregistrée de manière optimiste, mais le webhook signé de la passerelle est ce qui confirme (ou crée) le don complété, avec les gardes d'idempotence sur les deux côtés.

## Client-side : le registre de fournisseur de paiement (`@churchapps/apphelper`)

Le registre vit dans `Packages/apphelper/src/donations/providers/`, avec les widgets et aides de chaque fournisseur sous son propre sous-dossier (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) — rien dehors `providers/` ne branche sur un nom de fournisseur. Un `PaymentProvider` (voir `providers/types.ts`) regroupe tout ce qu'une application hôte a besoin pour une passerelle : un `descriptor` (étiquettes d'administration, devises supportées, champs de frais, taux de frais par défaut, URLs de tableau de bord/inscription), un drapeau `capabilities` ensemble (cartes enregistrées, ACH, récurrent, entrée de carte nouvelle en ligne, sauvegarde implicite-sur-tokenize), les widgets React pour l'entrée de membre (`MemberWrapper`/`MemberEntry`), le don d'invité (`GuestForm`), l'édition de méthode enregistrée (`MethodEditForm`), et les paiements de question de formulaire (`FormPayment`), plus `buildChargeRequest(ctx, token)` — l'unique lieu où la forme de charge de la charge diffère par fournisseur. Le `MemberWrapper` de chaque fournisseur charge son propre SDK à partir de la clé publique de l'enregistrement de passerelle, donc les applications hôtes n'importent jamais un SDK de passerelle (B1App et B1Admin n'ont pas de dépendance `@stripe/*`). `pickDefaultGateway(gateways, capability?)` centralise quelle passerelle d'une église une surface devrait utiliser.

`providers/registry.ts` détient les intégrés. Ils sont **référencés par valeur**, pas enregistrés via un effet secondaire du module, donc le tree-shaking d'un bundler ne peut jamais le déposer :

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| Fonction | Objet |
|----------|-------|
| `getPaymentProvider(name)` | Résoudre par nom normalisé ; revenir à Stripe pour qu'un fournisseur mal configuré ne s'écrase jamais dur du formulaire de donateur |
| `registerPaymentProvider(p)` | Enregistrer un fournisseur supplémentaire à l'exécution (pour une passerelle personnalisée d'une application hôte) |
| `listPaymentProviders()` | Énumérer les intégrés + personnalisé — utilisé pour construire la liste déroulante de passerelle d'administration |
| `hasPaymentProvider(name)` | Vérification d'adhésion |

**Fournisseurs clients intégrés : Stripe, PayPal, Kingdom Funding.** B1App et B1Admin seulement *lisent* le registre (`getPaymentProvider`, `listPaymentProviders`) ; ni l'un ni l'autre n'appelle `registerPaymentProvider` — l'enregistrement reste à l'intérieur d'apphelper.

Chaque fournisseur tokenize différemment, mais tous gardent la carte dehors de B1 :

| Fournisseur | Widget d'entrée | Jeton retourné à l'API |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | id de méthode de paiement (`pm_…`) ; banque via Financial Connections / ACH SetupIntent |
| Kingdom Funding | Formulaire tokenizer hébergé clé par la clé publique de la passerelle | nonce d'utilisation unique |
| PayPal | PayPal Hosted Fields ; ordre de serveur construit via `/donate/client-token` + `/donate/create-order` | id de commande capturée |

Le `finalizeResult` de Stripe exécute 3-D Secure / SCA dans le navigateur (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) avant que le don ne soit considéré comme complet ; le formulaire partagé appelle juste `provider.finalizeResult(result)` sans aucune connaissance de ce qu'il fait.

## Côté serveur : l'abstraction de passerelle (GivingApi)

Le module `/giving` (`Api/src/modules/giving`) expose la surface REST ; le câblage de passerelle vit dans `Api/src/shared/helpers`. `DonateController` ne parle jamais directement à un SDK de passerelle — il traverse `GatewayService`, qui résout l'`IGatewayProvider` droite à partir de `GatewayFactory` et lui remet un `GatewayConfig` déchiffré.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() déchiffre privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) est le contrat que chaque passerelle implémente — cycle de vie webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), paiement (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), frais (`calculateFees`), gestion de méthode enregistrée (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), et extras optionnels (clients, commandes, SetupIntents, relecture d'événement). Chaque classe de fournisseur déclare sa propre matrice `capabilities` (devises supportées, ACH, remboursements, exigences d'abonnement, limites de transaction) — `GatewayService.getProviderCapabilities(provider)` la lit juste — et les drapeaux comme `logsDonationsImmediately` pilotent le comportement du contrôleur sans aucun conditionnel de nom de fournisseur dans les contrôleurs.

**Fournisseurs serveur enregistrés dans `GatewayFactory` :**

| Fournisseur | Disponibilité |
|----------|-------------|
| Stripe | Toujours activé |
| PayPal | Toujours activé |
| Kingdom Funding | Toujours activé |
| Square | Opt-in via le drapeau d'environnement `ENABLE_SQUARE` |
| ePayMints | Opt-in via le drapeau d'environnement `ENABLE_EPAYMINTS` |

Les fournisseurs personnalisés peuvent être enregistrés à l'exécution quand `ENABLE_CUSTOM_GATEWAY_PROVIDERS` est défini ; `AbstractExperimentalGatewayProvider` est la classe de base pour ceux-là. Les noms de fournisseur sont appairés insensibles à la casse.

### Configuration de la passerelle & secrets

Un administrateur sauvegarde les credentials de passerelle via `POST /giving/gateways` (`GatewayController`). À la sauvegarde le contrôleur chiffre les clés privées et webhook avec `EncryptionHelper` avant de persister, puis — sur tout hôte non-localhost — supprime le webhook existant de l'église et provisionne un nouveau pointé sur `/giving/donate/webhook/{provider}?churchId=…`. Les lectures publiques (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) retournent seulement les clés publiques.

## Modèle de données

Le schéma giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, modèles dans `models/`) est un schéma MySQL accédé via Kysely :

| Table | Rôle |
|-------|------|
| `gateways` | Configuration de fournisseur par église : `provider`, `publicKey`, chiffré `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Désignations de dons (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Groupement pour entrée/rapport (`name`, `batchDate`) |
| `donations` | Un don : `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | Allocation d'un don sur un ou plusieurs fonds (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Don récurrent ; `id` est l'id d'abonnement de la passerelle, lié à `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Répartition de fonds pour un don récurrent |
| `customers` | Relie un `personId` à son id client de passerelle, par `provider` |
| `gatewayPaymentMethods` | Cartes/banques enregistrées : `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Piste d'audit webhook/événement et clé de dédup (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Campagnes de promesse liées à un fonds, et le montant promis de chaque personne |

Un don est répartit sur les fonds via `fundDonations` — le don porte le total, chaque `fundDonation` porte une tranche. `donations.currency` et `gateways.currency` portent l'ISO monétaire ; chaque fournisseur annonce ses `supportedCurrencies`, et les montants sont formatés avec `CurrencyHelper.formatCurrencyWithLocale`.

## Flux de bout en bout

### Adhérent ponctuel et récurrent (B1App)

L'écran de don authentifié (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) compose trois composants apphelper : `MultiGatewayDonationForm`, `PaymentMethods`, et `RecurringDonations`. B1App fait le chargement de données environnant — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — et passe la liste de passerelle via ; le fournisseur résolu charge son propre SDK à partir de la clé publique de la passerelle. La charge elle-même arrive à l'intérieur d'apphelper : le fournisseur résolu tokenize la méthode (nouvelle ou enregistrée), puis poste à `/giving/donate/charge` pour un don unique ou `/giving/donate/subscribe` pour un récurrent. Les dons récurrents créent une ligne `subscriptions` plus `subscriptionFunds` et remettent l'horaire à la passerelle (Stripe Subscriptions, PayPal Billing Plans, ou un horaire KF récurrent).

### Don d'invité / anonyme

La page de don public (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) et le panneau "donner maintenant" rendent `NonAuthDonationWrapper` à partir de `@churchapps/apphelper/website`, qui injecte reCAPTCHA et le contexte Elements de la passerelle autour du `GuestForm` du fournisseur. Les invités n'ont pas de connexion, aucune méthode enregistrée, et aucun historique. Le flux récupère `GET /giving/funds/churchId/:id` et `GET /giving/donate/gateways/:churchId` (seulement les clés publiques), vérifie le visiteur avec `POST /giving/donate/captcha-verify`, tokenize dans le navigateur, et poste à `/giving/donate/charge` (ou `/subscribe`). Les ACH d'invité utilise l'`POST /giving/paymentmethods/ach-setup-intent-anon` anonyme.

### Enregistrement d'administration et importation Stripe (B1Admin)

La section dons de B1Admin (`B1Admin/src/donations/`) est où les équipes de finance travaillent. L'entrée de lot (`components/BulkDonationEntry.tsx`) enregistre les dons en espèces/chèque/en nature en postant `/giving/donations` puis `/giving/funddonations` — aucune passerelle impliquée. Les fonds, lots, campagnes, et relevés chacun se cartographient à leurs routes `/giving/*` CRUD. Le panneau de style donateur-donateur (`B1Admin/src/donationComponents/`) réutilise les mêmes composants apphelper que B1App.

L'importation Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) remplit les dons faits dehors B1 : elle appelle `POST /giving/donate/replay-stripe-events` avec `dryRun: true` pour un aperçu, puis `dryRun: false` pour importer. Le serveur énumère les événements Stripe pour la plage de date et ignore quoi que ce soit déjà enregistré — appairé d'abord par id du fournisseur `eventLogs`, puis par `DonationRepo.findMatchingDonation` (montant + date + personne) pour qu'une relance n'importent jamais double.

## Webhooks et réconciliation

Les paiements réglés et les changements d'état d'abonnement arrivent à `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Le traitement est intentionnellement idempotent :

1. **Vérifier** — `GatewayService.verifyWebhook` délègue à la vérification de signature du fournisseur ; une signature défaillée retourne 401. Les événements qui n'ont pas besoin de traitement court-circuitent avec 200.
2. **Dédupliquer l'événement** — `EventLogRepo.loadByProviderId` ignore un webhook déjà enregistré dans `eventLogs`.
3. **Dédupliquer le don** — avant de créer quoi que ce soit, `DonationRepo.loadByTransactionId` est vérifié par rapport à tous les id candidats que la charge de paiement pourrait porter. Cela absorbe les livraisons dupliquées, les événements ACH multi-étapes (en attente → réglé), et le cas où `/donate/charge` a déjà enregistré le don de manière optimiste.
4. **Appliquer** — le `classifyWebhookEvent(eventType)` du fournisseur dit ce que l'événement signifie (don `pending`/`complete`, `cancel-subscription`, ou `ignore`) ; les paiements complétés créent un don `complete` (ou promeuvent une `pending` existant), les événements de style ACH atterrissent comme `pending` jusqu'au règlement, et les événements d'annulation suppriment la ligne `subscriptions` locale. Le contrôleur n'inspecte jamais les noms d'événement spécifiques au fournisseur.

Les fournisseurs avec `logsDonationsImmediately` (PayPal, Kingdom Funding) ont leurs charges enregistrées à partir de la réponse `/charge` (aucune ronde webhook requise pour le chemin heureux), tandis que Stripe s'appuie sur `payment_intent.succeeded` / `invoice.paid` et ACH `payment_intent.processing`. La gestion des frais (`POST /giving/donate/fee`, le drapeau de passerelle `payFees`, et le `calculateFees` de chaque fournisseur) calcule le "couvrir les frais" grossissement côté donateur — B1 ne prend aucune réduction de plate-forme, donc aucun frais d'application n'est jamais ajoutée.

:::info
Les chemins de charge et webhook écrivent les mêmes lignes `donations` / `fundDonations`. Le `transactionId` est la clé de jointure qui garde une bûche de charge optimiste et son webhook ultérieur de produire deux dons pour un don.
:::

## Pages connexes

- [Points de terminaison de dons](../api/endpoints/giving) — surface REST complet pour les dons, fonds, lots, passerelles, abonnements, méthodes de paiement, et webhooks
- [AppHelper](../shared-libraries/app-helper) — le package npm qui navire le registre de fournisseur de paiement et les composants de don
- [Structure des modules](../api/module-structure) — comment le module GivingApi est organisé côté serveur
