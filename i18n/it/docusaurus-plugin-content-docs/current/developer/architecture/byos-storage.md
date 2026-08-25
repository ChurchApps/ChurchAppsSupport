---
title: "Archiviazione Portata dalla Chiesa (BYOS)"
---

# Archiviazione Portata dalla Chiesa (BYOS)

Le chiese ottengono ~100 MB di archiviazione file ospitata gratuitamente. BYOS consente a una chiesa di collegare il suo archivio cloud -- **Google Drive, Dropbox, OneDrive o qualsiasi bucket compatibile S3** -- in modo che i nuovi caricamenti vadano direttamente all'account della chiesa senza limite di piattaforma.

## La Seam del Provider

BYOS riutilizza l'interfaccia di archiviazione costruita per MinistryStuff: `IStorageProvider` (in Packages/apihelper) risolta per chiesa da `StorageResolver` dalla tabella `content.storageProviders`. A differenza dei provider singleton `churchapps`/`ministrystuff`, i provider BYOS mantengono le credenziali per chiesa, quindi `StorageResolver.forChurch` costruisce un'istanza per richiesta dal file della chiesa.

Le implementazioni vivono vicino al resolver in `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, più `ByosAuth` (scambio di token OAuth + refresh a singolo volo).

`storageProviders` trasporta le credenziali: `accessToken`/`refreshToken`/`tokenExpiresAt` (tripletta OAuth crittografata) o `apiKey`/`apiSecret` + `settings` JSON (S3). I token non raggiungono mai il client — `GET /content/storage/providers` maschera i segreti.

## Flusso di Caricamento

Lo stesso contratto in tre passaggi come prima, con una forma di presignazione estesa. `POST /content/files/postUrl` restituisce `PresignedPostData` che ora trasporta facoltativamente `method`, `rawBody`, `headers`, `chunkSize` e `externalIdField`:

| Provider | Presignazione | Il client invia byte |
|---|---|---|
| churchapps (predefinito) | POST presignato S3 | multipart form |
| Google Drive | sessione di caricamento ripristinabile | singolo PUT |
| Dropbox | `files/get_temporary_upload_link` | raw POST |
| OneDrive | `createUploadSession` | chunked PUT |
| S3-compatible | presigned PUT | raw PUT |

`FileHelper.uploadPresignedFile` (in @churchapps/helpers) gestisce tutte le forme e restituisce l'ID file del provider quando la risposta ne trasporta uno. Il client lo passa come `externalId` nella registrazione `POST /content/files`; `files.provider` + `files.externalId` registrano dove vivono i byte.

## Download Pubblici

I cloud consumer non possono essere hotlinked, quindi per la tripletta OAuth, `contentPath` punta a una rotta Api stabile: `GET /content/files/download/:id` (anonimo) carica il file, conia un link diretto di breve durata tramite il `getDownloadUrl` del provider e reindirizza 302.

Le eliminazioni e i download si instradano tramite `files.provider` (`StorageResolver.forFile`); le file legacy senza di esso ricadono nel routing del prefisso URL.

## Connessione (B1Admin → Impostazioni → Archiviazione File)

La tripletta OAuth utilizza lo stesso flusso di relay dei provider di contenuto: popup → consenso del provider → scambio di codice del server (i segreti client non lasciano mai il server).

I client sono configurati in `B1Admin/src/settings/components/byosProviders.ts` e `Api .../ByosAuth.ts`.

Gli ambiti sono intenzionalmente minimi: Google `drive.file`, OneDrive `Files.ReadWrite.AppFolder`, Dropbox accesso alla cartella dell'app.
