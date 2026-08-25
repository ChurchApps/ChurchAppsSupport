---
title: "Bring-Your-Own Storage"
---

# Bring-Your-Own Storage (BYOS)

Kirker får ~100MB gratis vertede fillagring. BYOS lar en kirke koble sitt eget skylagring -- **Google Drive, Dropbox, OneDrive, eller en S3-kompatibel bøtte (AWS S3, Cloudflare R2, Backblaze B2)** -- slik at nye opplastinger lander på kirkens egen konto med ingen plattformgrense. ChurchApps forblir gratis; kirkens egen konto er grensen.

## Provider-søm

BYOS gjenbruker lagringssømen som er bygget for MinistryStuff: `IStorageProvider` (`Packages/apihelper`) løst per kirke av `StorageResolver` fra `content.storageProviders`-tabellen. I motsetning til singleton `churchapps`/`ministrystuff`-leverandører, holder BYOS-leverandører per-kirke-legitimasjon, slik at `StorageResolver.forChurch` konstruerer en forekomst per forespørsel fra kirkens rad.

## Upload-flyt

Samme tre-trinns kontrakt som tidligere, med en utvidet presign-form. `POST /content/files/postUrl` returnerer `PresignedPostData` som nå valgfritt bærer `method`, `rawBody`, `headers`, `chunkSize` og `externalIdField`.

| Leverandør | Presign | Klient sender bytes |
|---|---|---|
| churchapps (standard) | S3 presignert POST | multipart form (arv) |
| Google Drive | resumable upload session | enkelt PUT til sesjonen URI |
| Dropbox | `files/get_temporary_upload_link` (4h) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT |
| S3-compatible | presigned PUT | raw PUT |

## Offentlige nedlastninger

Forbrukere-skyer kan ikke hotlinkes, så for OAuth-trioen peker `contentPath` på en stabil Api-rute: `GET /content/files/download/:id` (anonym) laster filraden, minter en kortsiktig direkte lenke via leverandørens `getDownloadUrl`, cacherer den i minnet i 30 minutter, og 302-omdiriger med `Cache-Control: max-age=300`.

## Tilkobling (B1Admin → Settings → File Storage)

OAuth-trioen bruker samme relé-flyt som innholdsleverandører: popup → leverandørsamtykke → `{membershipApi}/oauth/relay/callback` → B1Admin polling av relésesjonen → `POST /content/storage/exchange` utfører server-siden kode→token-utveksling.

