---
title: "Lastna shramba (BYOS)"
---

# Lastna shramba (BYOS)

Cerkve dobijo približno 100 MB brezplačne gostovane shrambe datotek (površine `/content/files`: datoteke spletnega mesta, viri skupin). BYOS omogoča cerkvi, da poveže lastno oblačno shrambo — **Google Drive, Dropbox, OneDrive ali kateri koli zbirnik, združljiv s S3 (AWS S3, Cloudflare R2, Backblaze B2)** — tako da se nova nalaganja shranijo v lastni račun cerkve brez omejitve platforme. ChurchApps ostaja brezplačen; omejitev je cerkvin lastni račun.

## Vmesnik ponudnika

BYOS ponovno uporablja vmesnik shrambe, zgrajen za [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), ki ga za vsako cerkev razreši `StorageResolver` iz tabele `content.storageProviders`. Za razliko od enojnih ponudnikov `churchapps`/`ministrystuff` imajo ponudniki BYOS poverilnice za posamezno cerkev, zato `StorageResolver.forChurch` ustvari primerek za vsako zahtevo iz vrstice cerkve. Implementacije so poleg razreševalnika v `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, ter `ByosAuth` (izmenjava OAuth žetonov in osvežitev z enojnim letom — Dropbox rotira osvežitvene žetone, zato se osvežitve podvajajo na enak način kot pri `ProviderProxyController`).

`storageProviders` hrani poverilnice: `accessToken`/`refreshToken`/`tokenExpiresAt` (šifrirano, trojica OAuth) ali `apiKey`/`apiSecret` + JSON `settings` (`{endpoint, region, bucket, publicBase}`, S3). Žetoni nikoli ne dosežejo odjemalca — `GET /content/storage/providers` skrije skrivnosti in vrne logično vrednost `connected`.

## Potek nalaganja

Enak trikoračni dogovor kot prej, z razširjeno obliko predpodpisa. `POST /content/files/postUrl` vrne `PresignedPostData`, ki zdaj po želji vsebuje `method`, `rawBody`, `headers`, `chunkSize` in `externalIdField`:

| Ponudnik | Predpodpis | Odjemalec pošlje bajte |
|---|---|---|
| churchapps (privzeto) | S3 predpodpisani POST | obrazec multipart (zastarelo) |
| Google Drive | seja nadaljevalnega nalaganja (obseg `drive.file`) | ena zahteva PUT na URI seje |
| Dropbox | `files/get_temporary_upload_link` (4 h) | surova zahteva POST |
| OneDrive | `createUploadSession` (approot) | deljena zahteva PUT (20 MiB, večkratnik Graph 320 KiB) |
| S3-compatible | predpodpisana zahteva PUT (B2 nima pravilnikov POST) | surova zahteva PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) obravnava vse oblike in vrne ID datoteke pri ponudniku, kadar ga odgovor vsebuje (Drive). Odjemalec ga posreduje kot `externalId` v registraciji `POST /content/files`; `files.provider` in `files.externalId` zabeležita, kje so bajti (ID datoteke na Drive; pot pri drugih). Preverjanje 100 MB kvote velja samo, kadar je razrešeni ponudnik `churchapps`.

## Javni prenosi

Potrošniških oblakov ni mogoče vključiti kot neposredne povezave (povezave Drive presežejo kvoto, povezave Dropbox in OneDrive pa potečejo), zato pri trojici OAuth `contentPath` kaže na stabilno pot Api: `GET /content/files/download/:id` (anonimno) naloži vrstico datoteke, prek metode `getDownloadUrl` ponudnika (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) pridobi kratkotrajno neposredno povezavo, jo 30 minut hrani v pomnilniku in preusmeri s kodo 302 z `Cache-Control: max-age=300`. Pasovna širina teče med brskalnikom in ponudnikom, nikoli prek Api. S3-compatible preusmeritev v celoti preskoči — `contentPath` je stabilen URL `publicBase + key` (vedro mora dovoliti javno branje in CORS PUT).

Brisanja in prenosi se usmerjajo po `files.provider` (`StorageResolver.forFile`); stare vrstice brez tega polja se vrnejo na usmerjanje po predponi URL. Preimenovanja so za datoteke BYOS samo v bazi (bajti so naslovljeni z `externalId`, ne z imenom). Odklop ponudnika, ki še ima datoteke, mehko onemogoči vrstico (ohrani žetone, da prenosi in brisanja še delujejo), namesto da bi jo izbrisal.

## Povezovanje (B1Admin → Settings → File Storage)

Trojica OAuth uporablja isti tok posredovanja kot ponudniki vsebine: pojavno okno → soglasje ponudnika → `{membershipApi}/oauth/relay/callback` → B1Admin anketira sejo posredovanja → `POST /content/storage/exchange` na strežniku izvede izmenjavo kode za žeton (skrivnosti odjemalca nikoli ne zapustijo strežnika; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox je javni odjemalec PKCE). ID-ji odjemalca so v `B1Admin/src/settings/components/byosProviders.ts` in `Api .../ByosAuth.ts`. Obsegi so namerno minimalni: Google `drive.file` (samo datoteke, ustvarjene z aplikacijo — brez preverjanja omejenih obsegov), OneDrive `Files.ReadWrite.AppFolder`, Dropbox dostop do mape aplikacije. S3 je preprost obrazec za poverilnice.

Opomba o obsegu: BYOS zajema samo površine `/content/files`. Slike galerije, sličice, logotipi in fotografije oseb ostanejo pri privzetem ponudniku (majhne, dostavljene prek CDN, optimizirane za slike). Odjemalec lahko v telesu `postUrl` pošlje tudi `platformStorage: true`, da pripne nalaganje na privzetega ponudnika churchapps ne glede na nastavitev BYOS cerkve. FreeShow to uporablja za stanje sinhronizacije `files/group/{teamId}/current.zip`, ki se bere neposredno z javnega gostitelja vsebine in se nikoli ne registrira kot vrstica datoteke.
