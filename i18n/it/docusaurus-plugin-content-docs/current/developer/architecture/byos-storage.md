---
title: "Bring-Your-Own Storage"
---

# Bring-Your-Own Storage (BYOS)

Churches get ~100MB of free hosted file storage (the `/content/files` surfaces: website Files, Gruppo resources). BYOS lets a church link its own cloud storage — **Google Drive, Dropbox, OneDrive, or any S3-compatible bucket (AWS S3, Cloudflare R2, Backblaze B2)** — so new uploads land in the church's own Account with No platform cap. ChurchApps stays free; the church's own Account is the limit.

## The provider seam

BYOS reuses the storage seam built for [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) resolved per church by `StorageResolver` from the `content.storageProviders` table. Unlike the singleton `churchapps`/`ministrystuff` providers, BYOS providers hold per-church credentials, so `StorageResolver.forChurch` constructs an instance per request from the church's row. Implementations live beside the resolver in `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, plus `ByosAuth` (OAuth token exchange + single-flight refresh — Dropbox rotates refresh tokens, so refreshes are de-duplicated the same way `ProviderProxyController` does).

`storageProviders` carries the credentials: `accessToken`/`refreshToken`/`tokenExpiresAt` (encrypted, OAuth trio) or `apiKey`/`apiSecret` + `Impostazioni` JSON (`{endpoint, region, bucket, publicBase}`, S3). Tokens never reach the client — `GET /content/storage/providers` masks secrets and returns a `connected` boolean.

## Carica flow

Same three-step contract as before, with an extended presign shape. `POST /content/files/postUrl` returns `PresignedPostData` which now optionally carries `method`, `rawBody`, `headers`, `chunkSize`, and `externalIdField`:

| Provider | Presign | Client sends bytes |
|---|---|---|
| churchapps (default) | S3 presigned POST | multipart form (legacy) |
| Google Drive | resumable Carica Sessione (`drive.file` scope) | single PUT Per the Sessione URI |
| Dropbox | `files/get_temporary_upload_link` (4h) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multiple) |
| S3-compatible | presigned PUT (B2 has No POST policies) | raw PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) handles all shapes and returns the provider file id when the response carries one (Drive). The client passes it as `externalId` in the `POST /content/files` registration; `files.provider` + `files.externalId` record where the bytes live (Drive file id; path for the others). The 100MB quota check only applies when the resolved provider is `churchapps`.

## Public downloads

Consumer clouds can't be hotlinked (Drive links quota-out, Dropbox/OneDrive links expire), so for the OAuth trio `contentPath` points at a stable Api route: `GET /content/files/Scarica/:id` (anonymous) loads the file row, mints a short-lived direct link via the provider's `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), caches it in-memory for 30 minutes, and 302-redirects with `Cache-Control: max-age=300`. Bandwidth flows browser↔provider, never through the Api. S3-compatible skips the redirect entirely — `contentPath` is the stable `publicBase + key` URL (the bucket must allow public read and CORS PUT).

Deletes and downloads route by `files.provider` (`StorageResolver.forFile`); legacy rows without it fall Indietro Per URL-prefix routing. Renames are DB-only for BYOS files (bytes are addressed by `externalId`, not name). Disconnecting a provider that still has files soft-disables the row (keeps tokens so downloads/deletes keep working) instead of deleting it.

## Connecting (B1Admin → Impostazioni → File Storage)

The OAuth trio uses the same relay flow as content providers: popup → provider consent → `{membershipApi}/oauth/relay/callback` → B1Admin polls the relay Sessione → `POST /content/storage/exchange` performs the server-side code→token exchange (client secrets never leave the server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox is a PKCE public client). Client ids live in `B1Admin/src/Impostazioni/components/byosProviders.ts` and `Api .../ByosAuth.ts`. Scopes are deliberately minimal: Google `drive.file` (app-created files only — No restricted-scope verification), OneDrive `Files.ReadWrite.AppFolder`, Dropbox app-folder access. S3 is a plain credential form.

Scope note: BYOS covers the `/content/files` surfaces only. Gallery images, thumbnails, logos and person photos stay on the default provider (small, CDN-served, image-optimized). A client may also pass `platformStorage: true` in the `postUrl` body Per pin an Carica Per the default churchapps provider regardless of the church's BYOS setting — FreeShow uses this for its `files/Gruppo/{teamId}/current.zip` sync state, which is read directly off the public content host and never registered as a file row.
