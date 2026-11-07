---
title: "Ta med egen lagring"
description: "Anslut din egen Google Drive, Dropbox, OneDrive eller S3-kompatibla bucket i B1 Admin så att församlingens filuppladdningar kringgår plattformens gräns på 100 MB."
---

# Ta med egen lagring (BYOS)

Kyrkor får ungefär 100 MB gratis hostad fillagring (ytorna `/content/files`: filer på webbplatsen och gruppresurser). BYOS gör det möjligt för en kyrka att koppla sin egen molnlagring — **Google Drive, Dropbox, OneDrive eller valfri S3-kompatibel bucket (AWS S3, Cloudflare R2, Backblaze B2)** — så att nya uppladdningar hamnar på kyrkans eget konto utan någon plattformsgräns. ChurchApps förblir gratis; kyrkans eget konto är gränsen.

## Leverantörslagret

BYOS återanvänder lagringsgränssnittet som byggdes för [MinistryStuff](./ministrystuff.md): `IStorageProvider` (`Packages/apihelper`), som per kyrka löses upp av `StorageResolver` utifrån tabellen `content.storageProviders`. Till skillnad från de singleton-baserade leverantörerna `churchapps`/`ministrystuff` har BYOS-leverantörer autentiseringsuppgifter per kyrka, så `StorageResolver.forChurch` skapar en instans per förfrågan utifrån kyrkans rad. Implementationerna finns bredvid resolvern i `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, samt `ByosAuth` (OAuth-tokenutbyte och uppdatering med single-flight — Dropbox roterar uppdateringstokens, så uppdateringar dedupliceras på samma sätt som `ProviderProxyController` gör).

`storageProviders` innehåller autentiseringsuppgifterna: `accessToken`/`refreshToken`/`tokenExpiresAt` (krypterade, OAuth-trion) eller `apiKey`/`apiSecret` + `settings`-JSON (`{endpoint, region, bucket, publicBase}`, S3). Tokens når aldrig klienten — `GET /content/storage/providers` maskerar hemligheter och returnerar en boolean `connected`.

## Uppladdningsflödet

Samma trestegskontrakt som tidigare, men med utökad presign-struktur. `POST /content/files/postUrl` returnerar `PresignedPostData`, som nu valfritt innehåller `method`, `rawBody`, `headers`, `chunkSize` och `externalIdField`:

| Leverantör | Presign | Klienten skickar bytes |
|---|---|---|
| churchapps (standard) | S3 presigned POST | multipart-formulär (äldre) |
| Google Drive | återupptagbar uppladdningssession (`drive.file`-scope) | en enda PUT till sessions-URI:n |
| Dropbox | `files/get_temporary_upload_link` (4 timmar) | rå POST |
| OneDrive | `createUploadSession` (approot) | delad PUT (20 MiB, flera av 320 KiB i Graph) |
| S3-kompatibel | presigned PUT (B2 har inga POST-policyer) | rå PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) hanterar alla varianter och returnerar leverantörens fil-id när svaret innehåller ett sådant (Drive). Klienten skickar det som `externalId` i registreringen via `POST /content/files`; `files.provider` + `files.externalId` anger var bytes finns (Drive-fil-id; sökväg för de övriga). Kontrollen av 100 MB-kvoten gäller endast när den upplösta leverantören är `churchapps`.

## Offentliga nedladdningar

Konsumenttjänster i molnet kan inte hotlinkas (Drive-länkar blir över kvoten, och Dropbox- och OneDrive-länkar löper ut). För OAuth-trion pekar därför `contentPath` på en stabil Api-rutt: `GET /content/files/download/:id` (anonym) läser filraden, skapar en kortlivad direktlänk via leverantörens `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), cachar den i minnet i 30 minuter och omdirigerar med 302 och `Cache-Control: max-age=300`. Bandbredden går mellan webbläsaren och leverantören, aldrig genom Api:t. S3-kompatibla hoppar över omdirigeringen helt — `contentPath` är då den stabila URL:en `publicBase + key` (bucketen måste tillåta offentlig läsning och CORS PUT).

Borttagningar och nedladdningar dirigeras via `files.provider` (`StorageResolver.forFile`). Äldre rader utan fältet faller tillbaka på dirigering via URL-prefix. Namnbyten sker enbart i databasen för BYOS-filer (bytes adresseras via `externalId`, inte via namn). När en leverantör som fortfarande har filer kopplas bort inaktiveras raden mjukt i stället för att tas bort. Tokens behålls då, så att nedladdningar och borttagningar fortsätter att fungera.

## Ansluta (B1Admin → Inställningar → Fillagring)

OAuth-trion använder samma reläflöde som innehållsleverantörer: popup → leverantörens samtycke → `{membershipApi}/oauth/relay/callback` → B1Admin frågar reläsessionen → `POST /content/storage/exchange` utför kod-till-token-utbytet på servern. Klienthemligheter lämnar aldrig servern: Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, medan Dropbox är en publik PKCE-klient. Klient-ID:n finns i `B1Admin/src/settings/components/byosProviders.ts` och `Api .../ByosAuth.ts`. Behörigheterna (scopes) är medvetet minimala: Google `drive.file` (endast appskapade filer, ingen verifiering av begränsade scopes), OneDrive `Files.ReadWrite.AppFolder` och Dropbox åtkomst till appmappen. S3 är ett enkelt formulär för autentiseringsuppgifter.

Obs. om omfång: BYOS omfattar endast ytorna under `/content/files`. Galleribilder, miniatyrer, logotyper och personfoton ligger kvar hos standardleverantören, eftersom de är små, levereras via CDN och är bildoptimerade. En klient kan dessutom skicka `platformStorage: true` i `postUrl`-begäran för att låsa en uppladdning till standardleverantören churchapps, oavsett kyrkans BYOS-inställning. FreeShow använder detta för synkroniseringstillståndet `files/group/{teamId}/current.zip`, som läses direkt från den publika innehållsvärden och aldrig registreras som en filrad.
