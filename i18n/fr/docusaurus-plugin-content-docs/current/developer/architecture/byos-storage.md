---
title: "Apportez votre propre stockage"
---

# Apportez votre propre stockage (BYOS)

Les églises obtiennent ~100 Mo de stockage de fichiers gratuits hébergés (les surfaces `/content/files` : Fichiers de site web, ressources de groupe). BYOS permet à une église de lier son propre stockage cloud -- **Google Drive, Dropbox, OneDrive ou tout bucket compatible S3 (AWS S3, Cloudflare R2, Backblaze B2)** -- pour que les nouveaux uploads atterrissent dans le compte de l'église sans limite de plateforme. ChurchApps reste gratuit ; le compte de l'église est la limite.

## La couture du fournisseur

BYOS réutilise la couture de stockage construite pour [MinistryStuff](./ministrystuff) : `IStorageProvider` (`Packages/apihelper`) résolu par église par `StorageResolver` à partir du tableau `content.storageProviders`. Contrairement aux fournisseurs `churchapps`/`ministrystuff` singleton, les fournisseurs BYOS détiennent les identifiants par église, donc `StorageResolver.forChurch` construit une instance par demande à partir de la ligne de l'église. Les implémentations vivent à côté du résolveur dans `Api/src/modules/content/helpers/` : `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, plus `ByosAuth` (échange de token OAuth + rafraîchissement simple-vol -- Dropbox fait tourner les jetons de rafraîchissement, donc les rafraîchissements sont dédupliqués de la même manière que `ProviderProxyController` le fait).

`storageProviders` porte les identifiants : `accessToken`/`refreshToken`/`tokenExpiresAt` (chiffré, trio OAuth) ou `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Les jetons ne atteignent jamais le client -- `GET /content/storage/providers` masque les secrets et retourne un booléen `connected`.

## Flux de chargement

Même contrat en trois étapes qu'avant, avec une forme de presign étendue. `POST /content/files/postUrl` retourne `PresignedPostData` qui porte maintenant opérationnellement `method`, `rawBody`, `headers`, `chunkSize` et `externalIdField` :

| Fournisseur | Presign | Le client envoie des octets |
|---|---|---|
| churchapps (par défaut) | POST présigné S3 | multipart form (hérité) |
| Google Drive | session de chargement reprendre (`drive.file` scope) | PUT unique à l'URI de session |
| Dropbox | `files/get_temporary_upload_link` (4h) | POST brut |
| OneDrive | `createUploadSession` (approot) | PUT découpé (20 Mo, Graph 320 Ko multiple) |
| S3-compatible | PUT présigné (B2 n'a pas de stratégies POST) | PUT brut |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) gère toutes les formes et retourne l'ID de fichier du fournisseur quand la réponse en porte un (Drive). Le client le passe comme `externalId` dans l'enregistrement `POST /content/files` ; `files.provider` + `files.externalId` enregistrent où vivent les octets (ID de fichier Drive ; chemin pour les autres). La vérification de quota 100 Mo s'applique uniquement quand le fournisseur résolu est `churchapps`.

## Téléchargements publics

Les nuages consommateurs ne peuvent pas être hotlinked (les liens Drive font le quota, les liens Dropbox/OneDrive expirent), donc pour le trio OAuth, `contentPath` pointe vers une route Api stable : `GET /content/files/download/:id` (anonyme) charge la ligne de fichier, frappe un lien direct de courte durée via le `getDownloadUrl` du fournisseur (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), le met en cache en mémoire pendant 30 minutes et redirection 302 avec `Cache-Control: max-age=300`. La bande passante s'écoule navigateur↔fournisseur, jamais via l'Api. S3-compatible ignore entièrement la redirection -- `contentPath` est l'URL `publicBase + key` stable (le bucket doit autoriser la lecture publique et CORS PUT).

Les suppressions et les téléchargements s'acheminent par `files.provider` (`StorageResolver.forFile`) ; les lignes héritées sans lui retombent sur le routage par préfixe d'URL. Les renommages sont DB-uniquement pour les fichiers BYOS (les octets sont adressés par `externalId`, pas le nom). La déconnexion d'un fournisseur qui a toujours des fichiers désactive doucement la ligne (garde les jetons donc les téléchargements/suppressions continuent de fonctionner) au lieu de la supprimer.

## Connexion (B1Admin → Paramètres → Stockage de fichiers)

Le trio OAuth utilise le même flux de relais que les fournisseurs de contenu : popup → consentement du fournisseur → `{membershipApi}/oauth/relay/callback` → B1Admin sonde la session de relais → `POST /content/storage/exchange` effectue l'échange de code côté serveur (les secrets client ne quittent jamais le serveur ; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox est un client public PKCE). Les IDs clients vivent dans `B1Admin/src/settings/components/byosProviders.ts` et `Api .../ByosAuth.ts`. Les portées sont délibérément minimales : Google `drive.file` (fichiers créés par l'application uniquement -- aucune vérification de portée restreinte), OneDrive `Files.ReadWrite.AppFolder`, accès au dossier d'application Dropbox. S3 est une forme d'identifiant simple.

Remarque de portée : BYOS couvre les surfaces `/content/files` uniquement. Les images de galerie, les miniatures, les logos et les photos de personnes restent sur le fournisseur par défaut (petit, servi par CDN, optimisé en image).
