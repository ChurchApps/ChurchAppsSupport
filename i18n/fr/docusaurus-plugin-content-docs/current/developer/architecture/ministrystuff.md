# MinistryStuff (Stockage et texte payants)

MinistryStuff.org est le service payant séparé qui finance les deux choses que ChurchApps ne peut pas donner gratuitement -- le stockage de fichiers en masse (1 To+) et les crédits SMS -- en tant que souscriptions mensuelles à tarif fixe. ChurchApps lui-même reste 100% gratuit ; rien dans B1 ne nécessite une souscription MinistryStuff, et chaque point d'intégration est une couture de fournisseur qu'un tiers pourrait également implémenter.

## Composants

| Pièce | Repo | Rôle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Facturation (Stripe), envoi SMS + grand livre de crédit (AWS End User Messaging), stockage (S3 + comptabilité de quota). Unique base de données MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org -- marketing, tarification et le portail de compte (plans, utilisation, redirects Stripe Checkout/Customer Portal). |
| Fournisseur de texte | `Packages/texting` → `MinistryStuffProvider` | Enregistré en tant que `ministrystuff` à côté de Clearstream/TextInChurch. |
| Couture de stockage | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (par défaut, gratuit) enveloppe le commutateur S3/disque d'origine ; `FileStorageHelper` délègue au fournisseur par défaut inchangé. |
| Câblage Api | `Api/` contenu + modules de messagerie | `MinistryStuffStorageProvider` + `StorageResolver` (contenu), injection de clé de service `TextingConfigHelper` (messagerie), tableau `storageProviders`, points de terminaison `/content/storage/*` + `/messaging/texting/credits`. |

## Identité et confiance

- Mêmes comptes, mêmes églises : MinistryStuffApi vérifie les JWTs ChurchApps avec le `JWT_SECRET` partagé (motif d'application frère, comme B1Transfer). Le portail se connecte contre MembershipApi et accepte les remises `?jwt=`.
- Serveur à serveur (Api principal → MinistryStuffApi) : en-tête `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, les deux côtés) + `churchId` explicite. L'droit est toujours vérifié contre la souscription de cette église. Les églises ne détiennent jamais les credentials MinistryStuff -- la sélection du fournisseur dans B1Admin est tout ce qui est nécessaire.

## Flux de texte

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → nombre de segments débité contre les `smsCreditGrants` de la période actuelle → AWS End User Messaging (ou `smsMode: mock` en dev). Les crédits sont un **arrêt dur** : les crédits épuisés rejettent en gros (`insufficient_credits`, surfacé comme une invite de mise à jour conviviale dans B1Admin) -- jamais des envois partiels, jamais une facturation de dépassement. Les octrois de crédit sont émis idempotent par période de facturation à partir des webhooks `invoice.paid` de Stripe. Les opt-outs (`smsOptOuts`) sont filtrés avant chaque envoi.

D'autres chemins atteignent la même couture de fournisseur sans passer par `TextingController` : les alertes de check-in (`CheckinController` → `MessagingModuleGateway.sendBulkText`) et l'étape d'action de flux **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, qui écrit des lignes `sentTexts` + `deliveryLogs` avec un expéditeur nul). Les champs de fusion (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sont résolus par destinataire par `MergeFieldHelper.resolve` et le résultat est plafonné à 1 600 caractères. Dans `TextingController` un message de groupe contenant `{{` est envoyé comme une `sendMessage` par destinataire à la place d'un unique `sendBulk` ; un message sans espaces réservés s'en va toujours comme un envoi de masse unique.

## Flux de stockage

La ligne de fournisseur d'une église (`content.storageProviders`, gérée dans B1Admin → Paramètres → Stockage de fichiers) sélectionne où les **nouveaux** téléchargements vont. `contentPath` est une URL absolue par fichier, pour que les fournisseurs mixtes coexistent avec une zéro migration : les anciens fichiers continuent de servir de `content.churchapps.org`, les nouveaux de `content.ministrystuff.org`. Les uploads flux Api → `StorageResolver.forChurch` → fournisseur `store`/`getUploadUrl` (POST pré-signé avec `content-length-range` en mode S3 ; secours base64 en mode disque/dev) ; les suppressions itinéraire par l'URL stockée (`StorageResolver.forUrl`). Quota = octets du plan, comptés à partir de `storageObjects` (réservations `stored` + `pending`) ; le quota dépassé bloque les nouveaux uploads (`storage_quota_exceeded`) -- rien n'est jamais supprimé ou facturé en supplément. Le niveau ChurchApps gratuit ne change pas (mêmes limites qu'avant ; pas de quota à l'échelle de l'église).

Portée note : la sélection du fournisseur couvre le flux **fichiers/ressources** de contenu (où vivent les médias en masse). Les uploads galerie/logo/photo restent sur le fournisseur par défaut -- ils listent les clés du stockage et construisent les URLs côté client, pour que le renvoi par église ne s'applique pas encore.

La même couture alimente également le [Bring-Your-Own Storage](./byos-storage) : les églises peuvent lier Google Drive, Dropbox, OneDrive ou leur propre seau S3-compatible à la place d'un plan MinistryStuff.

## Facturation

Stripe Checkout (hébergé) pour souscrire, Stripe Customer Portal pour mise à jour de carte/annulation/factures -- MinistryStuffWeb n'a pas de formulaires de carte. Un ligne `subscriptions` par (église, produit) ; les plans/niveaux vivent en code (`MinistryStuffApi/src/helpers/Plans.ts`) avec les IDs de prix Stripe de la configuration. Webhook (`/billing/webhook`, vérification de signature de corps brut, dédup `webhookEvents`) conduit le cycle de vie de la souscription : actif → past_due (grâce) → annulé.

## Configuration dev

Exécutez MinistryStuffApi (`yarn dev`, 8097 ; a besoin de `.env` avec le `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY` partagés) et définissez la même clé de service dans `Api/.env`. `Api/config/dev.json` pointe déjà `ministryStuffApi` à `localhost:8097`. MinistryStuffWeb a besoin de `.env` avec `VITE_STAGE=dev`. Le dev utilise `smsMode: mock` et le stockage sur disque -- pas d'AWS nécessaire.
