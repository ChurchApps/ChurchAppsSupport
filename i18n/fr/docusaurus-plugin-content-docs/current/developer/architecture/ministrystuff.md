# MinistryStuff (Stockage payant et SMS)

MinistryStuff.org est le service payant séparé qui finance les deux choses que ChurchApps ne peut pas offrir gratuitement — le stockage de fichiers en masse (1 To+) et les crédits SMS — sous forme d'abonnements mensuels à taux fixe. ChurchApps lui-même reste 100 % gratuit ; rien dans B1 n'exige un abonnement MinistryStuff, et chaque point d'intégration est un point de contact fournisseur qu'un tiers pourrait tout aussi bien implémenter.

## Composants

| Élément | Dépôt | Rôle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 en dev) | Facturation (Stripe), envoi de SMS + registre de crédits (AWS End User Messaging), stockage (S3 + comptabilisation des quotas). Une seule BD MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 en dev) | ministrystuff.org — marketing, tarification, et le portail de compte (plans, usage, redirections Stripe Checkout/Customer Portal). |
| Fournisseur texting | `Packages/texting` → `MinistryStuffProvider` | Enregistré sous le nom `ministrystuff` aux côtés de Clearstream/TextInChurch. |
| Point de contact stockage | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (par défaut, gratuit) enveloppe le commutateur S3/disque d'origine ; `FileStorageHelper` délègue au fournisseur par défaut sans changement. |
| Câblage Api | Modules content + messaging d'`Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (content), injection de clé de service `TextingConfigHelper` (messaging), table `storageProviders`, points de terminaison `/content/storage/*` + `/messaging/texting/credits`. |

## Identité et confiance

- Mêmes comptes, mêmes églises : MinistryStuffApi vérifie les JWT ChurchApps avec le `JWT_SECRET` partagé (motif d'application sœur, comme B1Transfer). Le portail se connecte contre MembershipApi et accepte les transmissions `?jwt=`.
- Serveur à serveur (Api central → MinistryStuffApi) : en-tête `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, des deux côtés) + `churchId` explicite. Le droit d'accès est toujours vérifié par rapport à l'abonnement de cette église. Les églises ne détiennent jamais d'identifiants MinistryStuff — sélectionner le fournisseur dans B1Admin suffit.

## Flux de messagerie texte

B1Admin Envoyer un SMS → `TextingController` de l'Api → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → nombre de segments débité par rapport aux `smsCreditGrants` de la période en cours → AWS End User Messaging (ou `smsMode: mock` en dev). Les crédits sont une **limite dure** : les crédits épuisés rejettent en bloc (`insufficient_credits`, affiché comme une invite de mise à niveau conviviale dans B1Admin) — jamais d'envois partiels, jamais de facturation de dépassement. Les octrois de crédits sont émis de manière idempotente à chaque période de facturation à partir des webhooks Stripe `invoice.paid`. Les désabonnements (`smsOptOuts`) sont filtrés avant chaque envoi.

## Flux de stockage

La ligne fournisseur d'une église (`content.storageProviders`, gérée dans B1Admin → Paramètres → Stockage de fichiers) sélectionne où vont les **nouveaux** téléversements. `contentPath` est une URL absolue par fichier, si bien que des fournisseurs mixtes coexistent sans aucune migration : les anciens fichiers continuent d'être servis depuis `content.churchapps.org`, les nouveaux depuis `content.ministrystuff.org`. Les téléversements passent par Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` du fournisseur (POST présigné avec `content-length-range` en mode S3 ; repli en base64 en mode disque/dev) ; les suppressions s'acheminent selon l'URL stockée (`StorageResolver.forUrl`). Quota = octets du plan, comptabilisés depuis `storageObjects` (réservations `stored` + `pending`) ; un quota dépassé bloque les nouveaux téléversements (`storage_quota_exceeded`) — rien n'est jamais supprimé ni facturé en supplément. Le palier ChurchApps gratuit reste intact (mêmes limites qu'avant ; pas de quota à l'échelle de l'église).

Remarque de périmètre : la sélection du fournisseur couvre le flux content **fichiers/ressources** (où vivent les médias en masse). Les téléversements de galerie/logo/photo restent sur le fournisseur par défaut — ils listent les clés depuis le stockage et construisent les URL côté client, si bien que le rattachement par église ne s'applique pas encore là.

## Facturation

Stripe Checkout (hébergé) pour l'abonnement, Stripe Customer Portal pour la mise à jour de carte/annulation/factures — MinistryStuffWeb n'a aucun formulaire de carte. Une ligne `subscriptions` par (église, produit) ; les plans/paliers vivent dans le code (`MinistryStuffApi/src/helpers/Plans.ts`) avec des id de prix Stripe issus de la configuration. Le webhook (`/billing/webhook`, vérification de signature en corps brut, déduplication `webhookEvents`) pilote le cycle de vie de l'abonnement : active → past_due (grâce) → canceled.

## Configuration de développement

Lancez MinistryStuffApi (`yarn dev`, 8097 ; nécessite un `.env` avec le `JWT_SECRET` partagé + `MINISTRYSTUFF_SERVICE_KEY`) et définissez la même clé de service dans `Api/.env`. `Api/config/dev.json` pointe déjà `ministryStuffApi` vers `localhost:8097`. MinistryStuffWeb a besoin d'un `.env` avec `VITE_STAGE=dev`. Le dev utilise `smsMode: mock` et le stockage disque — pas besoin d'AWS.
