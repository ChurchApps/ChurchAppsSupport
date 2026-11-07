---
title: "Stocare proprie (BYOS)"
---

# Stocare proprie (BYOS)

Bisericile primesc ~100MB de stocare gratuită de fișiere găzduită (suprafețele `/content/files`: fișierele site-ului web, resursele grupurilor). BYOS permite unei biserici să conecteze propriul spațiu de stocare în cloud — **Google Drive, Dropbox, OneDrive sau orice bucket compatibil S3** (AWS S3, Cloudflare R2, Backblaze B2) — astfel încât noile încărcări ajung în contul propriu al bisericii, fără limită impusă de platformă. ChurchApps rămâne gratuit; limita este contul propriu al bisericii.

## Stratul de furnizori

BYOS reutilizează stratul de stocare creat pentru [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), rezolvat pentru fiecare biserică de `StorageResolver` din tabela `content.storageProviders`. Spre deosebire de furnizorii singleton `churchapps`/`ministrystuff`, furnizorii BYOS au credențiale specifice fiecărei biserici, deci `StorageResolver.forChurch` creează o instanță per cerere, pe baza rândului bisericii. Implementările se află lângă resolver, în `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, plus `ByosAuth` (schimbul de token-uri OAuth și reîmprospătarea single-flight — Dropbox rotește token-urile de reîmprospătare, deci reîmprospătările sunt deduplicate în același mod ca în `ProviderProxyController`).

`storageProviders` conține credențialele: `accessToken`/`refreshToken`/`tokenExpiresAt` (criptate, trio-ul OAuth) sau `apiKey`/`apiSecret` și JSON-ul `settings` (`{endpoint, region, bucket, publicBase}`, pentru S3). Token-urile nu ajung niciodată la client — `GET /content/storage/providers` mascează secretele și returnează o valoare booleană `connected`.

## Fluxul de încărcare

Același contract în trei pași ca înainte, cu o structură extinsă a presign-ului. `POST /content/files/postUrl` returnează `PresignedPostData`, care acum poartă opțional `method`, `rawBody`, `headers`, `chunkSize` și `externalIdField`:

| Furnizor | Presign | Clientul trimite octeții |
|---|---|---|
| churchapps (implicit) | POST presemnat S3 | formular multipart (vechi) |
| Google Drive | sesiune de încărcare reluabilă (scope `drive.file`) | un singur PUT către URI-ul sesiunii |
| Dropbox | `files/get_temporary_upload_link` (4h) | POST brut |
| OneDrive | `createUploadSession` (approot) | PUT fragmentat (20MiB, multiplu de 320KiB Graph) |
| Compatibil S3 | PUT presemnat (B2 nu are politici POST) | PUT brut |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) gestionează toate formele și returnează id-ul fișierului de la furnizor atunci când răspunsul îl conține (Drive). Clientul îl transmite ca `externalId` în înregistrarea `POST /content/files`; `files.provider` și `files.externalId` înregistrează unde se află octeții (id-ul fișierului Drive; calea pentru celelalte). Verificarea cotei de 100MB se aplică doar când furnizorul rezolvat este `churchapps`.

## Descărcări publice

Serviciile cloud de consum nu pot fi legate direct (linkurile Drive depășesc cota, iar cele Dropbox și OneDrive expiră), deci pentru trio-ul OAuth `contentPath` indică o rută Api stabilă: `GET /content/files/download/:id` (anonimă) încarcă rândul fișierului, generează un link direct de scurtă durată prin `getDownloadUrl` al furnizorului (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), îl păstrează în memorie 30 de minute și răspunde cu redirecționare 302 și `Cache-Control: max-age=300`. Traficul merge între browser și furnizor, niciodată prin Api. S3-compatibil omite complet redirecționarea — `contentPath` este URL-ul stabil `publicBase + key` (bucket-ul trebuie să permită citirea publică și CORS PUT).

Ștergerile și descărcările sunt rutate după `files.provider` (`StorageResolver.forFile`); rândurile vechi fără acest câmp revin la rutarea după prefixul URL-ului. Redenumirile sunt doar în baza de date pentru fișierele BYOS (octeții sunt adresați prin `externalId`, nu prin nume). Deconectarea unui furnizor care mai are fișiere dezactivează rândul în mod soft (păstrează token-urile, ca descărcările și ștergerile să funcționeze în continuare), în loc să-l șteargă.

## Conectarea (B1Admin → Settings → File Storage)

Trio-ul OAuth folosește același flux de releu ca furnizorii de conținut: fereastră pop-up → consimțământul furnizorului → `{membershipApi}/oauth/relay/callback` → B1Admin interoghează sesiunea de releu → `POST /content/storage/exchange` efectuează schimbul de cod pe token pe server (secretele clientului nu părăsesc niciodată serverul; `GOOGLE_DRIVE_CLIENT_SECRET` pentru Google, `ONEDRIVE_CLIENT_SECRET` pentru OneDrive; Dropbox este un client public PKCE). ID-urile clientului se află în `B1Admin/src/settings/components/byosProviders.ts` și `Api .../ByosAuth.ts`. Scope-urile sunt intenționat minime: `drive.file` pentru Google (doar fișierele create de aplicație, fără verificare pentru scope-uri restricționate), `Files.ReadWrite.AppFolder` pentru OneDrive, acces la folderul aplicației pentru Dropbox. S3 este un simplu formular de credențiale.

Notă privind domeniul: BYOS acoperă doar suprafețele `/content/files`. Imaginile din galerie, miniaturile, siglele și fotografiile persoanelor rămân pe furnizorul implicit (mici, servite prin CDN, optimizate pentru imagini). Un client poate trimite și `platformStorage: true` în corpul `postUrl` pentru a fixa o încărcare pe furnizorul implicit churchapps, indiferent de setarea BYOS a bisericii. FreeShow folosește aceasta pentru starea sincronizării `files/group/{teamId}/current.zip`, care este citită direct de pe gazda publică de conținut și nu este niciodată înregistrată ca rând de fișier.
