---
title: "Bring-Your-Own lagring"
---

# Bring-Your-Own lagring (BYOS)

Kirker får ~100MB gratis hosted fillagring (den `/content/files` overflatene: nettsted filer, gruppe ressurser). BYOS lar en kirke koble sitt eget sky lagring -- **Google Drive, Dropbox, OneDrive, eller hvilken som helst S3-kompatibel bøtte (AWS S3, Cloudflare R2, Backblaze B2)** -- så nye opplastinger lander i kirkens egen konto med ingen plattform kappe. ChurchApps forblir gratis; kirkens egen konto er grensen.

## Leverandør søm

BYOS gjenbruk lagring søm bygd for [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) løst per kirke av `StorageResolver` fra `content.storageProviders` tabell. I motsetning til singleton `churchapps`/`ministrystuff` leverandører, BYOS leverandører hold per-kirke legitimasjon, slik `StorageResolver.forChurch` konstruer en enstand per forespørsel fra kirkens rad. Implementasjoner lever ved siden av løser i `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, pluss `ByosAuth` (OAuth token utveksling + enkelt-flyvning oppfrisking -- Dropbox roterer oppfrisknings merker, slik oppfriskninger er dedup det samme måte `ProviderProxyController` gjør).

`storageProviders` bærer legitimasjonen: `accessToken`/`refreshToken`/`tokenExpiresAt` (kryptert, OAuth trio) eller `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Merker aldri nå klienten -- `GET /content/storage/providers` masker hemmeligheter og returnerer en `connected` boolsk.

## Opplastings flyt

Samme tre-trinn kontrakt som før, med en utvidet presign form. `POST /content/files/postUrl` returnerer `PresignedPostData` som nå valgfritt bærer `method`, `rawBody`, `headers`, `chunkSize` og `externalIdField`:

| Leverandør | Presign | Klient sender bytes |
|---|---|---|
| churchapps (standard) | S3 presigned POST | multipart form (legacy) |
| Google Drive | resumable opplastings sesjon (`drive.file` omfang) | enkelt PUT til sesjon URI |
| Dropbox | `files/get_temporary_upload_link` (4t) | rå POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multippel) |
| S3-kompatibel | presigned PUT (B2 har ingen POST policier) | rå PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) håndter alle former og returnerer leverandør fil id når respons bærer en (drive). Klienten sender det som `externalId` i `POST /content/files` registrering; `files.provider` + `files.externalId` post der bytes lever (drive fil id; bane for de andre). 100MB kvota kontroll bare bruk når løst leverandør er `churchapps`.

## Offentlig nedlasting

Forbruker skyer kan ikke være hotlinked (drive lenker kvota-ut, Dropbox/OneDrive lenker utløpe), slik for OAuth trio `contentPath` peker på en stabil Api rute: `GET /content/files/download/:id` (anonym) last fil rad, mynter kortsyklet direkte lenke via leverandør `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), cache den in-minne for 30 minutter og 302-omdirigering med `Cache-Control: max-age=300`. Båndbredde strømme nettleser↔leverandør, aldri gjennom Api. S3-kompatibel hopp omdirigering helt -- `contentPath` er stabil `publicBase + key` URL (bøtte må tillate offentlig lese og CORS PUT).

Slettinger og nedlastinger rute etter `files.provider` (`StorageResolver.forFile`); legacy rader uten det falt tilbake til URL-prefiks ruting. Omdøpinger er DB-kun for BYOS filer (bytes er adressert av `externalId`, ikke navn). Frakoble en leverandør som ennå har filer mykt-deaktiverer raden (holder merker slik nedlastinger/slettinger holde jobbende) i stedet for å slette det.

## Koble (B1Admin → innstillinger → fillagring)

OAuth trio bruker samme relè strømning som innholdsleverandører: popup → leverandør samtykke → `{membershipApi}/oauth/relay/callback` → B1Admin avspørringer relè sesjon → `POST /content/storage/exchange` utfører server-side kode→token utveksling (klient hemmeligheter aldri forlate server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox er en PKCE offentlig klient). Klient ids lever i `B1Admin/src/settings/components/byosProviders.ts` og `Api .../ByosAuth.ts`. Omfang er bevisst minimal: Google `drive.file` (app-opprettet filer bare -- ingen begrenset-omfang verifisering), OneDrive `Files.ReadWrite.AppFolder`, Dropbox app-mappe tilgang. S3 er en vanlig legitimasjon form.

Omfang merknad: BYOS dekk `/content/files` overflatene bare. Galleri bilder, miniatyrbilder, logoer og person bilder forblir på standard leverandør (små, CDN-servert, bilde-optimalisert).
