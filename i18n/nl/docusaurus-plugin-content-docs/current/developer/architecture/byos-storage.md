---
title: "Eigen opslag meenemen (BYOS)"
---

# Eigen opslag meenemen (BYOS)

Kerken krijgen ongeveer 100MB gratis gehoste bestandsopslag (de `/content/files`-onderdelen: bestanden van de website, groepsbronnen). Met BYOS kan een kerk haar eigen cloudopslag koppelen: **Google Drive, Dropbox, OneDrive of elke S3-compatibele bucket (AWS S3, Cloudflare R2, Backblaze B2)**. Nieuwe uploads komen dan terecht in het eigen account van de kerk, zonder platformlimiet. ChurchApps blijft gratis; het eigen account van de kerk bepaalt de limiet.

## De providerkoppeling

BYOS hergebruikt de opslagkoppeling die is gebouwd voor [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), die per kerk wordt opgelost door `StorageResolver` uit de tabel `content.storageProviders`. In tegenstelling tot de singleton-providers `churchapps`/`ministrystuff` bewaren BYOS-providers inloggegevens per kerk. Daarom maakt `StorageResolver.forChurch` per verzoek een instantie aan op basis van de rij van de kerk. De implementaties staan naast de resolver in `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, plus `ByosAuth` (OAuth-tokenuitwisseling + single-flight-vernieuwing — Dropbox roteert refresh-tokens, dus vernieuwingen worden op dezelfde manier ontdubbeld als bij `ProviderProxyController`).

`storageProviders` bevat de inloggegevens: `accessToken`/`refreshToken`/`tokenExpiresAt` (versleuteld, het OAuth-trio) of `apiKey`/`apiSecret` + `settings`-JSON (`{endpoint, region, bucket, publicBase}`, S3). Tokens bereiken nooit de client. `GET /content/storage/providers` maskeert geheimen en geeft een booleaanse `connected`-waarde terug.

## Uploadproces

Hetzelfde driestappencontract als voorheen, met een uitgebreide presign-vorm. `POST /content/files/postUrl` geeft `PresignedPostData` terug, die nu optioneel `method`, `rawBody`, `headers`, `chunkSize` en `externalIdField` kan bevatten:

| Provider | Presign | Client stuurt bytes |
|---|---|---|
| churchapps (standaard) | S3 presigned POST | multipart-formulier (verouderd) |
| Google Drive | uploadsessie met hervatbaar uploaden (`drive.file`-scope) | één PUT naar de sessie-URI |
| Dropbox | `files/get_temporary_upload_link` (4 uur) | ruwe POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, veelvoud van 320KiB volgens Graph) |
| S3-compatibel | presigned PUT (B2 heeft geen POST-policies) | ruwe PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) verwerkt alle vormen en geeft de provider-bestands-ID terug wanneer het antwoord er een bevat (Drive). De client geeft die mee als `externalId` in de registratie via `POST /content/files`. `files.provider` + `files.externalId` leggen vast waar de bytes staan (Drive-bestands-ID; pad voor de andere). De quotacontrole van 100MB geldt alleen wanneer de gevonden provider `churchapps` is.

## Openbare downloads

Consumentenclouds kunnen niet rechtstreeks worden gelinkt (Drive-links raken hun quota kwijt, Dropbox- en OneDrive-links verlopen). Daarom wijst `contentPath` voor het OAuth-trio naar een stabiele Api-route: `GET /content/files/download/:id` (anoniem) laadt de bestandsrij, maakt via de `getDownloadUrl` van de provider een kortlevende directe link (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), bewaart die 30 minuten in het geheugen en stuurt door met een 302-redirect en `Cache-Control: max-age=300`. Het dataverkeer loopt tussen browser en provider, nooit via de Api. S3-compatibel slaat de redirect volledig over: `contentPath` is de stabiele URL `publicBase + key` (de bucket moet openbaar lezen en CORS-PUT toestaan).

Verwijderingen en downloads worden gerouteerd op basis van `files.provider` (`StorageResolver.forFile`). Oudere rijen zonder dit veld vallen terug op routering via het URL-voorvoegsel. Hernoemen gebeurt bij BYOS-bestanden alleen in de database, omdat de bytes worden geadresseerd via `externalId` en niet via de naam. Als een provider wordt losgekoppeld terwijl er nog bestanden aan gekoppeld zijn, wordt de rij alleen uitgeschakeld (tokens blijven bewaard, zodat downloads en verwijderingen blijven werken) in plaats van verwijderd.

## Verbinden (B1Admin → Instellingen → Bestandsopslag)

Het OAuth-trio gebruikt dezelfde relay-flow als contentproviders: pop-up → toestemming van de provider → `{membershipApi}/oauth/relay/callback` → B1Admin pollt de relaysessie → `POST /content/storage/exchange` voert de code-naar-token-uitwisseling aan de serverkant uit (clientgeheimen verlaten nooit de server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox is een publieke PKCE-client). Client-ID's staan in `B1Admin/src/settings/components/byosProviders.ts` en `Api .../ByosAuth.ts`. Scopes zijn bewust minimaal: Google `drive.file` (alleen door de app aangemaakte bestanden, geen verificatie voor beperkte scopes), OneDrive `Files.ReadWrite.AppFolder`, Dropbox-toegang tot de app-map. S3 is een eenvoudig formulier voor inloggegevens.

Reikwijdte: BYOS geldt alleen voor de `/content/files`-onderdelen. Galerijafbeeldingen, miniaturen, logo's en foto's van personen blijven bij de standaardprovider (klein, via CDN geserveerd, geoptimaliseerd voor afbeeldingen). Een client kan ook `platformStorage: true` meegeven in de `postUrl`-body om een upload vast te zetten bij de standaardprovider churchapps, ongeacht de BYOS-instelling van de kerk. FreeShow gebruikt dit voor de synchronisatiestatus `files/group/{teamId}/current.zip`. Die wordt rechtstreeks van de openbare contenthost gelezen en nooit als bestandsrij geregistreerd.
