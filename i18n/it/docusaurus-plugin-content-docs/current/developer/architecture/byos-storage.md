---
title: "Archiviazione Bring-Your-Own (BYOS)"
---

# Archiviazione Bring-Your-Own (BYOS)

<div class="article-intro">

Le chiese ottengono ~100MB di archiviazione di file ospitata gratuitamente. BYOS consente a una chiesa di collegare il suo proprio archiviazione cloud — **Google Drive, Dropbox, OneDrive o qualsiasi bucket compatibile con S3** — in modo che i nuovi upload vengono memorizzati nell'account della chiesa senza limite di piattaforma.

</div>

## Il Seam del Fornitore

BYOS riutilizza il seam di archiviazione costruito per MinistryStuff: `IStorageProvider` risolto per chiesa da `StorageResolver` dalla tabella `content.storageProviders`. A differenza dei provider singleton, i provider BYOS contengono credenziali per chiesa, in modo che `StorageResolver.forChurch` costruisce un'istanza per richiesta.

## Flusso di Upload

Lo stesso contratto a tre passaggi, con una forma di presign estesa. `POST /content/files/postUrl` ritorna `PresignedPostData` che ora facoltativamente contiene `method`, `rawBody`, `headers`, `chunkSize` e `externalIdField`.

## Download Pubblici

I cloud consumer non possono essere hotlinked, quindi per il trio OAuth `contentPath` punta a una route Api stabile. Per S3-compatibile, `contentPath` è l'URL stabile.

## Connessione (B1Admin → Impostazioni → Archiviazione File)

Il trio OAuth utilizza lo stesso flusso di relais di content provider: popup → consenso del fornitore → scambio del codice. Le credenziali S3 sono un modulo di credenziali semplice.
