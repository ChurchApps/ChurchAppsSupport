---
title: "Archiviazione Bring-Your-Own"
---

# Archiviazione Bring-Your-Own (BYOS)

Le chiese ottengono ~100MB di archiviazione di file hosting gratuita (le superfici `/content/files`: File del Sito Web, risorse del Gruppo). BYOS permette a una chiesa di collegare il suo proprio cloud storage -- **Google Drive, Dropbox, OneDrive, o qualsiasi bucket S3-compatibile (AWS S3, Cloudflare R2, Backblaze B2)** -- in modo che i nuovi upload atterrino nell'account della chiesa senza alcun limite della piattaforma. ChurchApps rimane gratuito; il limite è l'account della chiesa.

## Il seam del provider

BYOS riutilizza il seam di archiviazione costruito per [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) risolto per chiesa da `StorageResolver` dalla tabella `content.storageProviders`. A differenza dei provider singleton `churchapps`/`ministrystuff`, i provider BYOS mantengono credenziali per chiesa, quindi `StorageResolver.forChurch` costruisce un'istanza per richiesta dalla riga della chiesa. Le implementazioni vivono accanto al resolver in `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, più `ByosAuth` (scambio di token OAuth + refresh in volo singolo -- Dropbox ruota token di refresh, quindi i refresh sono dedup-licati nello stesso modo `ProviderProxyController` fa).

`storageProviders` porta le credenziali: `accessToken`/`refreshToken`/`tokenExpiresAt` (crittografato, trio OAuth) o `apiKey`/`apiSecret` + JSON `settings` (`{endpoint, region, bucket, publicBase}`, S3). I token non raggiungono mai il client -- `GET /content/storage/providers` maschera i segreti e restituisce un booleano `connected`.

## Flusso di Upload

Stesso contratto in tre passaggi di prima, con una forma di prescrizione estesa. `POST /content/files/postUrl` restituisce `PresignedPostData` che ora opzionalmente porta `method`, `rawBody`, `headers`, `chunkSize` e `externalIdField`:

| Provider | Prescrizione | Il client invia byte |
|---|---|---|
| churchapps (default) | S3 presigned POST | multipart form (legacy) |
| Google Drive | sesione di upload riprendibile (`drive.file` scope) | PUT singolo all'URI della sessione |
| Dropbox | `files/get_temporary_upload_link` (4h) | POST grezzo |
| OneDrive | `createUploadSession` (approot) | PUT a pezzi (20MiB, Graph 320KiB-multiplo) |
| S3-compatibile | PUT prescritto (B2 non ha politiche POST) | PUT grezzo |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) gestisce tutte le forme e restituisce l'id di file del provider quando la risposta ne porta uno (Drive). Il client lo passa come `externalId` nella registrazione `POST /content/files`; `files.provider` + `files.externalId` registrano dove vivono i byte (id file Drive; percorso per gli altri). Il controllo della quota di 100MB si applica solo quando il provider risolto è `churchapps`.

## Download Pubblici

I cloud consumer non possono essere hotlinked (i link Drive superano la quota, i link Dropbox/OneDrive scadono), quindi per il trio OAuth `contentPath` punta a una rotta Api stabile: `GET /content/files/download/:id` (anonimo) carica la riga di file, conia un link diretto di breve durata tramite il `getDownloadUrl` del provider (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), lo memorizza in cache in memoria per 30 minuti e 302-reindirizza con `Cache-Control: max-age=300`. La larghezza di banda scorre browser ↔ provider, mai attraverso l'Api. S3-compatibile salta interamente il reindirizzamento -- `contentPath` è l'URL stabile `publicBase + key` (il bucket deve permettere lettura pubblica e CORS PUT).

Gli elimina e i download instradano per `files.provider` (`StorageResolver.forFile`); le righe legacy senza di esso ricadono in instradamento per prefisso URL. Le ridenominazioni sono DB-only per file BYOS (i byte sono indirizzati da `externalId`, non il nome). La disconnessione di un provider che ha ancora file disabilita delicatamente la riga (mantiene token in modo che download/elimina continuino a funzionare) invece di eliminarla.

## Collegamento (B1Admin → Impostazioni → Archiviazione File)

Il trio OAuth utilizza lo stesso flusso di relè del provider di contenuto: popup → consenso del provider → `{membershipApi}/oauth/relay/callback` → B1Admin esegue il polling della sessione di relè → `POST /content/storage/exchange` esegue lo scambio di codice lato server (i segreti del client non lasciano mai il server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox è un client pubblico PKCE). Gli id dei client vivono in `B1Admin/src/settings/components/byosProviders.ts` e `Api .../ByosAuth.ts`. Gli scope sono deliberatamente minimi: Google `drive.file` (file creati dall'app solo -- nessuna verifica di scope con restrizioni), OneDrive `Files.ReadWrite.AppFolder`, accesso alla cartella di app Dropbox. S3 è un modulo di credenziale normale.

Nota di portata: BYOS copre solo le superfici `/content/files`. Le immagini della galleria, le miniature, i logo e le foto della persona rimangono sul provider default (piccolo, servito da CDN, ottimizzato per l'immagine).
