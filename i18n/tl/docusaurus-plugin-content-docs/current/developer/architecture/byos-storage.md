---
title: "Magdala ng Iyong Sariling Storage"
---

# Magdala ng Iyong Sariling Storage (BYOS)

Ang mga simbahan ay nakakakuha ng ~100MB ng libreng hosted file storage (ang `/content/files` surfaces: website Files, group resources). Ang BYOS ay nagbibigay-daan sa simbahan na mag-link ng sarili nitong cloud storage -- **Google Drive, Dropbox, OneDrive, o anumang S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2)** -- kaya ang mga bagong upload ay umiikot sa account ng simbahan na may walang limit ng platform. Ang ChurchApps ay manatili libre; ang account ng simbahan mismo ang hangganan.

## Ang provider seam

Ang BYOS ay muling gumagamit ng storage seam na itinayo para sa [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) na nalulutas bawat simbahan ng `StorageResolver` mula sa `content.storageProviders` table. Hindi tulad ng singleton `churchapps`/`ministrystuff` providers, ang mga BYOS provider ay may per-church credentials, kaya ang `StorageResolver.forChurch` ay lumilikha ng isang instance bawat request mula sa row ng simbahan. Ang mga implementasyon ay buhay sa tabi ng resolver sa `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, plus `ByosAuth` (OAuth token exchange + single-flight refresh -- ang Dropbox ay nag-rotate ng refresh tokens, kaya ang mga refresh ay de-duplicated sa parehong paraan tulad ng `ProviderProxyController`).

Ang `storageProviders` ay nagdadala ng mga credentials: `accessToken`/`refreshToken`/`tokenExpiresAt` (encrypted, OAuth trio) o `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Ang mga token ay hindi kailanman umaabot sa kliyente -- ang `GET /content/storage/providers` ay nakamasking secrets at nagbabalik ng `connected` boolean.

## Upload flow

Ang parehong three-step contract tulad ng dati, na may pinalawak na presign shape. Ang `POST /content/files/postUrl` ay nagbabalik ng `PresignedPostData` na ngayon ay may opsyon na dalhin ang `method`, `rawBody`, `headers`, `chunkSize`, at `externalIdField`:

| Provider | Presign | Client sends bytes |
|---|---|---|
| churchapps (default) | S3 presigned POST | multipart form (legacy) |
| Google Drive | resumable upload session (`drive.file` scope) | single PUT sa session URI |
| Dropbox | `files/get_temporary_upload_link` (4h) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multiple) |
| S3-compatible | presigned PUT (B2 ay walang POST policies) | raw PUT |

Ang `FileHelper.uploadPresignedFile` (`@churchapps/helpers`) ay humahawak sa lahat ng mga hugis at nagbabalik ng provider file id kapag ang tugon ay may isa (Drive). Ang kliyente ay nagpapasa nito bilang `externalId` sa `POST /content/files` registration; ang `files.provider` + `files.externalId` ay nagtala kung saan ang mga byte ay buhay (Drive file id; path para sa iba). Ang 100MB quota check ay naa-apply lamang kapag ang resolved provider ay `churchapps`.

## Mga pampublikong download

Ang consumer clouds ay hindi maaaring i-hotlink (Drive links quota-out, Dropbox/OneDrive links ay nag-expire), kaya para sa OAuth trio ang `contentPath` ay tumuturo sa isang stable Api route: `GET /content/files/download/:id` (anonymous) ay nag-load ng row ng file, ay nag-mint ng short-lived direct link sa pamamagitan ng provider's `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), ay nag-cache nito sa loob-memorya para sa 30 minuto, at 302-redirects na may `Cache-Control: max-age=300`. Ang bandwidth ay daloy ng browser↔provider, hindi kailanman sa pamamagitan ng Api. Ang S3-compatible ay nag-skip ng redirect nang lubusan -- ang `contentPath` ay ang stable `publicBase + key` URL (ang bucket ay dapat payagan ang public read at CORS PUT).

Ang mga bura at download ay route ng `files.provider` (`StorageResolver.forFile`); ang legacy rows na walang ito ay bumabalik sa URL-prefix routing. Ang mga rename ay DB-only para sa BYOS files (ang mga byte ay natutugunan ng `externalId`, hindi name). Ang pag-disconnect ng provider na mayroon pa ring mga file ay soft-disables ang row (nagpapanatili ng mga token upang ang download/deletes ay patuloy na gumagana) sa halip na alisin ito.

## Pagkonekta (B1Admin → Mga Ayos → File Storage)

Ang OAuth trio ay gumagamit ng parehong relay flow tulad ng content providers: popup → provider consent → `{membershipApi}/oauth/relay/callback` → B1Admin polls ang relay session → `POST /content/storage/exchange` ay gumaganap ng server-side code→token exchange (ang mga client secret ay hindi kailanman niiwan ang server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox ay isang PKCE public client). Ang mga client ids ay buhay sa `B1Admin/src/settings/components/byosProviders.ts` at `Api .../ByosAuth.ts`. Ang mga scope ay deliberately minimal: Google `drive.file` (app-created files lamang -- walang restricted-scope verification), OneDrive `Files.ReadWrite.AppFolder`, Dropbox app-folder access. Ang S3 ay isang plain credential form.

Ang nota ng saklaw: Ang BYOS ay sumasaklaw sa `/content/files` surfaces lamang. Ang mga larawan ng gallery, thumbnails, mga logo at larawan ng tao ay manatili sa default provider (maliit, CDN-served, image-optimized).
