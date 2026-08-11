# MinistryStuff (stockage et textos rémunérés)

MinistryStuff.org est le service rémunéré séparé qui finance les deux choses que ChurchApps ne peut pas donner -- stockage de fichiers en vrac (1 To +) et crédits SMS -- en tant que souscriptions mensuelles forfaitaires. ChurchApps lui-même reste 100% gratuit ; rien dans B1 n'exige un abonnement MinistryStuff, et chaque point d'intégration est une couture de fournisseur qu'une tierce partie pourrait également implémenter.

## Composants

| Pièce | Référentiel | Rôle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Facturation (Stripe), envoi SMS + ledger de crédit (AWS End User Messaging), stockage (S3 + comptabilité de quota). Base de données MySQL unique `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org -- marketing, tarification et portail de compte (plans, utilisation, redirections Stripe Checkout/Customer Portal). |
| Fournisseur de textos | `Packages/texting` → `MinistryStuffProvider` | Enregistré comme `ministrystuff` à côté de Clearstream/TextInChurch. |
| Couture de stockage | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (par défaut, gratuit) enveloppe le commutateur S3/disque d'origine ; `FileStorageHelper` délègue au fournisseur par défaut inchangé. |
| Câblage Api | `Api/` modules content + messaging | `MinistryStuffStorageProvider` + `StorageResolver` (content), injection de service-key `TextingConfigHelper` (messaging), tableau `storageProviders`, points d'extrémité `/content/storage/*` + `/messaging/texting/credits`. |

## Identité et confiance

- Mêmes comptes, mêmes églises : MinistryStuffApi vérifie les JWTs ChurchApps avec le `JWT_SECRET` partagé (modèle d'application frère, comme B1Transfer). Le portail se connecte contre MembershipApi et accepte les remises `?jwt=`.
- Serveur-à-serveur (Api principal → MinistryStuffApi) : en-tête `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, les deux côtés) + `churchId` explicite. L'admissibilité est toujours vérifiée contre l'abonnement de cette église. Les églises ne détiennent jamais les identifiants MinistryStuff -- sélectionner le fournisseur dans B1Admin est tout ce qui est nécessaire.

## Flux de textos

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → nombre de segments débité contre les `smsCreditGrants` de la période actuelle → AWS End User Messaging (ou `smsMode: mock` en dev). Les crédits sont un **arrêt dur** : les crédits épuisés rejettent en gros (`insufficient_credits`, remontés comme une invite de mise à niveau conviviale dans B1Admin) -- jamais de dépassements partiels, jamais de facturation excessive. Les subventions de crédit sont émises de manière idempotente par période de facturation à partir des webhooks `invoice.paid` de Stripe. Les refus (`smsOptOuts`) sont filtrés avant chaque envoi.

## Flux de stockage

La ligne de fournisseur d'une église (`content.storageProviders`, gérée dans B1Admin → Paramètres → Stockage de fichiers) sélectionne le lieu où les **nouveaux** uploads vont. `contentPath` est une URL absolue par fichier, donc les fournisseurs mixtes coexistent avec zéro migration : les vieux fichiers continuent de servir à partir de `content.churchapps.org`, les nouveaux depuis `content.ministrystuff.org`. Les uploads s'écoulent Api → `StorageResolver.forChurch` → fournisseur `store`/`getUploadUrl` (POST présigné avec `content-length-range` en mode S3 ; base64 fallback en mode disque/dev) ; les suppressions s'acheminent par l'URL stockée (`StorageResolver.forUrl`). Quota = octets du plan, compté à partir de `storageObjects` (réservations `stored` + `pending`) ; dépassement de quota bloque les nouveaux uploads (`storage_quota_exceeded`) -- rien n'est jamais supprimé ou facturé en supplément. Le niveau libre ChurchApps est inchangé (mêmes limites qu'avant ; pas de quota d'église).

Remarque de portée : la sélection du fournisseur couvre le flux de **fichiers/ressources** de contenu (où vivent les médias en vrac). Les uploads de galerie/logo/photo restent sur le fournisseur par défaut -- ils énumèrent les clés du stockage et construisent des URL côté client, donc le rootage par église ne s'applique pas encore.

La même couture alimente également [Apportez votre propre stockage](./byos-storage) : les églises peuvent lier Google Drive, Dropbox, OneDrive ou leur propre bucket compatible S3 au lieu d'un plan MinistryStuff.

## Facturation

Stripe Checkout (hébergé) pour souscrire, Stripe Customer Portal pour mise à jour de carte/annulation/factures -- MinistryStuffWeb n'a pas de formulaires de carte. Une ligne `subscriptions` par (église, produit) ; les plans/niveaux vivent dans le code (`MinistryStuffApi/src/helpers/Plans.ts`) avec les IDs de prix Stripe de la configuration. Webhook (`/billing/webhook`, vérification de signature body brut, dédupée `webhookEvents`) pilote le cycle de vie de l'abonnement : actif → en retard (grâce) → annulé.

## Configuration de dev

Exécutez MinistryStuffApi (`yarn dev`, 8097 ; nécessite `.env` avec le `JWT_SECRET` partagé + `MINISTRYSTUFF_SERVICE_KEY`) et définissez la même clé de service dans `Api/.env`. `Api/config/dev.json` pointe déjà `ministryStuffApi` vers `localhost:8097`. MinistryStuffWeb nécessite `.env` avec `VITE_STAGE=dev`. Dev utilise `smsMode: mock` et le stockage sur disque -- pas d'AWS nécessaire.
