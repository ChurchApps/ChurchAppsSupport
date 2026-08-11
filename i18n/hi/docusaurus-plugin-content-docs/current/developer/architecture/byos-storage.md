---
title: "Bring-Your-Own Storage"
---

# Bring-Your-Own Storage (BYOS)

Churches को ~100MB की free hosted file storage मिली (जो `/content/files` surfaces: website Files, group resources)। BYOS एक church को अपने storage को link करने देता है — **Google Drive, Dropbox, OneDrive, या कोई भी S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2)** — तो new uploads church के own account में land करते हैं platform cap के साथ कोई नहीं। ChurchApps free रहता है; church का own account limit है।

## Provider seam

BYOS [MinistryStuff](./ministrystuff) के लिए built storage seam को reuse करता है: `IStorageProvider` (`Packages/apihelper`) resolved per church द्वारा `StorageResolver` from `content.storageProviders` table। Singleton `churchapps`/`ministrystuff` providers के विपरीत, BYOS providers per-church credentials को hold करते हैं, तो `StorageResolver.forChurch` एक instance per request construct करता है church के row से। Implementations resolver के बगल में live करते हैं `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, plus `ByosAuth` (OAuth token exchange + single-flight refresh — Dropbox rotate करता है refresh tokens, तो refreshes `ProviderProxyController` जैसे ही de-duplicated होते हैं)।

`storageProviders` credentials को carries करता है: `accessToken`/`refreshToken`/`tokenExpiresAt` (encrypted, OAuth trio) या `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3)। Tokens कभी client को reach नहीं करते — `GET /content/storage/providers` secrets को mask करता है और एक `connected` boolean return करता है।

## Upload flow

Same three-step contract के रूप में, एक extended presign shape के साथ। `POST /content/files/postUrl` return करता है `PresignedPostData` जो अब optionally `method`, `rawBody`, `headers`, `chunkSize`, और `externalIdField` को carry करता है:

| Provider | Presign | Client sends bytes |
|---|---|---|
| churchapps (default) | S3 presigned POST | multipart form (legacy) |
| Google Drive | resumable upload session (`drive.file` scope) | single PUT को session URI में |
| Dropbox | `files/get_temporary_upload_link` (4h) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multiple) |
| S3-compatible | presigned PUT (B2 के पास POST policies नहीं है) | raw PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) सभी shapes को handle करता है और provider file id return करता है जब response एक carry करता है (Drive)। Client इसे `externalId` के रूप में pass करता है `POST /content/files` registration में; `files.provider` + `files.externalId` record करते हैं जहाँ bytes live करते हैं (Drive file id; path others के लिए)। 100MB quota check केवल तभी applies होता है जब resolved provider `churchapps` है।

## Public downloads

Consumer clouds को hotlink नहीं किया जा सकता (Drive links quota-out, Dropbox/OneDrive links expire), तो OAuth trio के लिए `contentPath` एक stable Api route को point करता है: `GET /content/files/download/:id` (anonymous) file row को load करता है, provider के `getDownloadUrl` via एक short-lived direct link को mint करता है (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), इसे 30 minutes के लिए in-memory cache करता है, और `Cache-Control: max-age=300` के साथ 302-redirect करता है। Bandwidth browser↔provider को flow करता है, कभी Api के through नहीं। S3-compatible redirect को entirely skip करता है — `contentPath` stable `publicBase + key` URL है (bucket को public read और CORS PUT को allow करना चाहिए)।

Deletes और downloads `files.provider` द्वारा route करते हैं (`StorageResolver.forFile`); बिना इसके legacy rows URL-prefix routing को fallback करते हैं। Renames BYOS files के लिए DB-only होते हैं (bytes को `externalId` से address किया जाता है, नाम से नहीं)। Disconnecting एक provider जिसके पास अभी भी files हैं row को soft-disable करता है (downloads/deletes को keep करने के लिए tokens को keep करता है) उसे delete करने के बजाय।

## Connecting (B1Admin → Settings → File Storage)

OAuth trio same relay flow को use करता है content providers के रूप में: popup → provider consent → `{membershipApi}/oauth/relay/callback` → B1Admin polls relay session → `POST /content/storage/exchange` perform करता है server-side code→token exchange (client secrets कभी server को leave नहीं करते; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox एक PKCE public client है)। Client ids `B1Admin/src/settings/components/byosProviders.ts` और `Api .../ByosAuth.ts` में live करते हैं। Scopes deliberately minimal हैं: Google `drive.file` (app-created files केवल — कोई restricted-scope verification नहीं), OneDrive `Files.ReadWrite.AppFolder`, Dropbox app-folder access। S3 एक plain credential form है।

Scope note: BYOS केवल `/content/files` surfaces को cover करता है। Gallery images, thumbnails, logos और person photos default provider पर रहते हैं (small, CDN-served, image-optimized)।
