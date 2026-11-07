---
title: "Vlastné úložisko (BYOS)"
description: "Pripojte si vlastný Google Drive, Dropbox, OneDrive alebo bucket kompatibilný s S3 v B1 Admin, aby nahrávanie súborov cirkvi obišlo platformový limit 100 MB."
---

# Vlastné úložisko (BYOS)

Cirkvi dostávajú ~100 MB bezplatného hostovaného úložiska na súbory (povrchy `/content/files`: súbory webu, zdroje skupín). BYOS umožňuje cirkvi pripojiť vlastné cloudové úložisko — **Disk Google, Dropbox, OneDrive alebo ľubovoľný S3-kompatibilný bucket (AWS S3, Cloudflare R2, Backblaze B2)** — takže nové nahrávania skončia v účte cirkvi bez limitu platformy. ChurchApps zostáva bezplatná; limitom je vlastný účet cirkvi.

## Rozhranie poskytovateľa

BYOS znovu používa rozhranie úložiska vytvorené pre [MinistryStuff](./ministrystuff.md): `IStorageProvider` (`Packages/apihelper`), ktoré pre každú cirkev rieši `StorageResolver` z tabuľky `content.storageProviders`. Na rozdiel od jednoinštančných poskytovateľov `churchapps`/`ministrystuff` majú poskytovatelia BYOS poverenia viazané na cirkev, preto `StorageResolver.forChurch` vytvorí inštanciu pre každú požiadavku z riadku danej cirkvi. Implementácie sú vedľa resolvera v `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, a tiež `ByosAuth` (výmena OAuth tokenov + jednoduché obnovenie — Dropbox rotuje obnovovacie tokeny, takže obnovenia sa deduplikujú rovnako ako v `ProviderProxyController`).

`storageProviders` obsahuje poverenia: `accessToken`/`refreshToken`/`tokenExpiresAt` (šifrované, trojica OAuth) alebo `apiKey`/`apiSecret` + JSON `settings` (`{endpoint, region, bucket, publicBase}`, S3). Tokeny sa nikdy nedostanú ku klientovi — `GET /content/storage/providers` maskuje tajomstvá a vracia booleovskú hodnotu `connected`.

## Postup nahrávania

Rovnaký trojkrokový kontrakt ako predtým, s rozšíreným tvarom presignu. `POST /content/files/postUrl` vracia `PresignedPostData`, ktorý teraz voliteľne obsahuje `method`, `rawBody`, `headers`, `chunkSize` a `externalIdField`:

| Poskytovateľ | Presign | Klient posiela bajty |
|---|---|---|
| churchapps (predvolený) | S3 presigned POST | multipart formulár (pôvodný) |
| Disk Google | relačná relácia nahrávania (rozsah `drive.file`) | jedno PUT na URI relácie |
| Dropbox | `files/get_temporary_upload_link` (4 h) | surový POST |
| OneDrive | `createUploadSession` (approot) | chunkované PUT (20 MiB, násobky 320 KiB Graph) |
| S3-kompatibilný | presigned PUT (B2 nemá POST politiky) | surový PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) spracuje všetky tvary a vracia identifikátor súboru poskytovateľa, ak ho odpoveď obsahuje (Disk). Klient ho odošle ako `externalId` pri registrácii `POST /content/files`; `files.provider` + `files.externalId` zaznamenávajú, kde bajty ležia (ID súboru na Disku; cesta pri ostatných). Kontrola kvóty 100 MB sa uplatní iba vtedy, keď je vyriešený poskytovateľ `churchapps`.

## Verejné sťahovanie

Spotrebiteľské cloudy nemožno priamo prepájať (odkazy na Disk prekročia kvótu, odkazy na Dropbox/OneDrive vypršia), preto pri trojici OAuth `contentPath` ukazuje na stabilnú trasu Api: `GET /content/files/download/:id` (anonymná) načíta riadok súboru, získa krátkoživý priamy odkaz cez `getDownloadUrl` poskytovateľa (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), uloží ho do pamäte na 30 minút a presmeruje cez 302 s `Cache-Control: max-age=300`. Prenos dát ide medzi prehliadačom a poskytovateľom, nikdy cez Api. S3-kompatibilné úložisko presmerovanie úplne preskakuje — `contentPath` je stabilná URL `publicBase + key` (bucket musí povoliť verejné čítanie a CORS PUT).

Mazania a sťahovania smerujú podľa `files.provider` (`StorageResolver.forFile`); staršie riadky bez tohto poľa sa vrátia k smerovaniu podľa predpony URL. Premenovanie je pri súboroch BYOS iba v databáze (bajty sa adresujú cez `externalId`, nie cez názov). Odpojenie poskytovateľa, ktorý ešte obsahuje súbory, riadok len mäkko deaktivuje (ponechá tokeny, aby sťahovania a mazania fungovali ďalej), namiesto jeho vymazania.

## Pripojenie (B1Admin → Settings → File Storage)

Trojica OAuth používa rovnaký reléový tok ako poskytovatelia obsahu: vyskakovacie okno → súhlas poskytovateľa → `{membershipApi}/oauth/relay/callback` → B1Admin dotazuje reléovú reláciu → `POST /content/storage/exchange` vykoná výmenu kódu za token na strane servera (klientske tajomstvá neopúšťajú server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox je verejný klient PKCE). ID klientov sú v `B1Admin/src/settings/components/byosProviders.ts` a `Api .../ByosAuth.ts`. Rozsahy sú úmyselne minimálne: Google `drive.file` (iba súbory vytvorené aplikáciou — bez overovania obmedzeného rozsahu), OneDrive `Files.ReadWrite.AppFolder`, Dropbox prístup k priečinku aplikácie. S3 je jednoduchý formulár s poverením.

Poznámka k rozsahu: BYOS pokrýva iba povrchy `/content/files`. Obrázky galérie, miniatúry, logá a fotografie osôb zostávajú pri predvolenom poskytovateľovi (malé, doručované cez CDN, optimalizované obrázky). Klient môže tiež v tele `postUrl` odoslať `platformStorage: true`, aby pripol nahrávanie k predvolenému poskytovateľovi churchapps bez ohľadu na nastavenie BYOS cirkvi. FreeShow to používa pre stav synchronizácie `files/group/{teamId}/current.zip`, ktorý sa číta priamo z verejného obsahového hostiteľa a nikdy sa nezaregistruje ako riadok súboru.
