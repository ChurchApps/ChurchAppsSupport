---
title: "Medbring din egen lagring"
---

# Medbring din egen lagring (BYOS)

Kirker får ca. 100 MB gratis hostet filplads (`/content/files`-områderne: filer på hjemmesiden og gruppe-ressourcer). BYOS giver en kirke mulighed for at forbinde sin egen skylagring — **Google Drive, Dropbox, OneDrive eller en hvilken som helst S3-kompatibel bucket (AWS S3, Cloudflare R2, Backblaze B2)** — så nye uploads havner på kirkens egen konto uden nogen platformsgrænse. ChurchApps forbliver gratis; det er kirkens egen konto, der sætter grænsen.

## Udbyderlaget

BYOS genbruger det lagringslag, der blev bygget til [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), som for hver kirke slås op via `StorageResolver` fra tabellen `content.storageProviders`. I modsætning til de singleton-udbydere `churchapps`/`ministrystuff` har BYOS-udbydere kirkespecifikke legitimationsoplysninger, så `StorageResolver.forChurch` opretter en instans pr. anmodning ud fra kirkens række. Implementeringerne ligger ved siden af resolveren i `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` samt `ByosAuth` (OAuth-tokenudveksling og opdatering med single-flight-deduplikering — Dropbox roterer opdaterings-tokens, så opdateringer deduplikeres på samme måde som i `ProviderProxyController`).

`storageProviders` indeholder legitimationsoplysningerne: `accessToken`/`refreshToken`/`tokenExpiresAt` (krypteret, OAuth-trioen) eller `apiKey`/`apiSecret` + `settings`-JSON (`{endpoint, region, bucket, publicBase}`, S3). Tokens sendes aldrig til klienten — `GET /content/storage/providers` skjuler hemmeligheder og returnerer en boolesk værdi `connected`.

## Upload-flow

Samme tretrinskontrakt som tidligere, men med en udvidet presign-struktur. `POST /content/files/postUrl` returnerer `PresignedPostData`, som nu valgfrit indeholder `method`, `rawBody`, `headers`, `chunkSize` og `externalIdField`:

| Udbyder | Presign | Klienten sender bytes |
|---|---|---|
| churchapps (standard) | S3 presigned POST | multipart-formular (ældre) |
| Google Drive | genoptagelig uploadsession (`drive.file`-scope) | enkelt PUT til session-URI'en |
| Dropbox | `files/get_temporary_upload_link` (4 t.) | rå POST |
| OneDrive | `createUploadSession` (approot) | opdelt PUT (20 MiB, Graph-multipla af 320 KiB) |
| S3-kompatibel | presigned PUT (B2 understøtter ikke POST-policies) | rå PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) håndterer alle formaterne og returnerer udbyderens fil-id, når svaret indeholder et (Drive). Klienten sender det som `externalId` i registreringen `POST /content/files`; `files.provider` + `files.externalId` registrerer, hvor bytes'ne ligger (Drive-fil-id; sti for de øvrige). 100 MB-kvotetjekket gælder kun, når den valgte udbyder er `churchapps`.

## Offentlige downloads

Forbruger-skytjenester kan ikke direkte linkes (Drive-links rammer kvoten, Dropbox/OneDrive-links udløber), så for OAuth-trioen peger `contentPath` på en stabil Api-rute: `GET /content/files/download/:id` (anonym) indlæser filrækken, opretter et kortlivet direkte link via udbyderens `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), cacher det i hukommelsen i 30 minutter og laver en 302-omdirigering med `Cache-Control: max-age=300`. Båndbredden går mellem browser og udbyder, aldrig gennem Api'et. S3-kompatible udbydere springer omdirigeringen helt over — `contentPath` er den stabile URL `publicBase + key` (bucket'en skal tillade offentlig læsning og CORS PUT).

Sletninger og downloads dirigeres efter `files.provider` (`StorageResolver.forFile`); ældre rækker uden feltet falder tilbage til routing efter URL-præfiks. Omdøbninger sker kun i databasen for BYOS-filer (bytes adresseres via `externalId`, ikke navn). Når man afbryder en udbyder, som stadig har filer, deaktiveres rækken blødt (tokens bevares, så downloads og sletninger fortsat virker) i stedet for at blive slettet.

## Forbindelse (B1Admin → Settings → File Storage)

OAuth-trioen bruger samme relæ-flow som indholdsudbydere: pop-up → udbyderens samtykke → `{membershipApi}/oauth/relay/callback` → B1Admin poller relæ-sessionen → `POST /content/storage/exchange` udfører udvekslingen af kode til token på serversiden (klienthemmeligheder forlader aldrig serveren; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox er en offentlig PKCE-klient). Klient-id'er findes i `B1Admin/src/settings/components/byosProviders.ts` og `Api .../ByosAuth.ts`. Scopes er bevidst minimale: Google `drive.file` (kun app-oprettede filer — ingen verifikation af begrænsede scopes), OneDrive `Files.ReadWrite.AppFolder`, Dropbox-adgang til app-mappen. S3 er en almindelig formular til legitimationsoplysninger.

Omfangsnote: BYOS dækker kun `/content/files`-områderne. Galleribilleder, miniaturer, logoer og personfotos bliver på standardudbyderen (små, leveret via CDN og billedoptimeret). En klient kan desuden sende `platformStorage: true` i `postUrl`-kroppen for at fastlåse en upload til standardudbyderen churchapps uanset kirkens BYOS-indstilling — FreeShow bruger dette til sin synkroniseringstilstand `files/group/{teamId}/current.zip`, som læses direkte fra den offentlige indholdsvært og aldrig registreres som filrække.
