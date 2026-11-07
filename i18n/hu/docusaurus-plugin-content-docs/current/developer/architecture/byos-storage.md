---
title: "Saját tárhely (BYOS)"
---

# Saját tárhely (BYOS)

Az egyházak mintegy 100 MB ingyenes, platformon tárolt fájltárhelyet kapnak (a `/content/files` felületek: a weboldal fájljai, csoportos anyagok). A BYOS lehetővé teszi, hogy egy egyház saját felhőtárhelyét csatolja — **Google Drive, Dropbox, OneDrive vagy bármely S3-kompatibilis bucket (AWS S3, Cloudflare R2, Backblaze B2)** —, így az új feltöltések az egyház saját fiókjába kerülnek, platformos korlát nélkül. A ChurchApps továbbra is ingyenes; a korlátot az egyház saját fiókja jelenti.

## A szolgáltatói illesztőpont

A BYOS újrahasználja a [MinistryStuff](./ministrystuff) számára kialakított tárolási illesztőpontot: az `IStorageProvider` (`Packages/apihelper`) interfészt, amelyet a `StorageResolver` oldja fel egyházanként a `content.storageProviders` táblából. A `churchapps`/`ministrystuff` egyedi (singleton) szolgáltatókkal ellentétben a BYOS-szolgáltatók egyházanként tárolják a hitelesítő adataikat, ezért a `StorageResolver.forChurch` minden kéréshez az egyház sorából hoz létre új példányt. A megvalósítások a resolver mellett, az `Api/src/modules/content/helpers/` mappában találhatók: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, valamint a `ByosAuth` (OAuth-tokencsere és egyszeri frissítés — a Dropbox forgatja a frissítő tokeneket, ezért a frissítéseket ugyanúgy szűrjük ki duplikációként, mint a `ProviderProxyController`-ben).

A `storageProviders` tárolja a hitelesítő adatokat: `accessToken`/`refreshToken`/`tokenExpiresAt` (titkosítva, az OAuth-hármas), vagy `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3 esetén). A tokenek soha nem jutnak el a kliensig: a `GET /content/storage/providers` maszkolja a titkos adatokat, és egy `connected` logikai értéket ad vissza.

## Feltöltési folyamat

Ugyanaz a háromlépéses szerződés, mint korábban, bővített előaláírt (presign) struktúrával. A `POST /content/files/postUrl` a `PresignedPostData` objektumot adja vissza, amely mostantól opcionálisan tartalmazza a `method`, `rawBody`, `headers`, `chunkSize` és `externalIdField` mezőket:

| Szolgáltató | Előaláírás | A kliens ezt küldi |
|---|---|---|
| churchapps (alapértelmezett) | S3 előaláírt POST | multipart űrlap (régi) |
| Google Drive | folytatható feltöltési munkamenet (`drive.file` hatókör) | egyetlen PUT a munkamenet URI-ra |
| Dropbox | `files/get_temporary_upload_link` (4 óra) | nyers POST |
| OneDrive | `createUploadSession` (approot) | darabolt PUT (20 MiB, Graph 320 KiB-többszörös) |
| S3-kompatibilis | előaláírt PUT (a B2 nem támogat POST-szabályzatokat) | nyers PUT |

A `FileHelper.uploadPresignedFile` (`@churchapps/helpers`) kezeli az összes formátumot, és ha a válasz tartalmazza, visszaadja a szolgáltató fájlazonosítóját (Drive esetén). A kliens ezt `externalId` mezőként adja át a `POST /content/files` regisztrációban; a `files.provider` + `files.externalId` rögzíti, hol vannak a bájtok (Drive-fájlazonosító; a többinél elérési út). A 100 MB-os kvótaellenőrzés csak akkor érvényes, ha a feloldott szolgáltató `churchapps`.

## Nyilvános letöltések

A fogyasztói felhők nem linkelhetők közvetlenül (a Drive-linkek kvótája kimerülhet, a Dropbox- és OneDrive-linkek lejárnak), ezért az OAuth-hármas esetén a `contentPath` egy stabil Api-útvonalra mutat: a `GET /content/files/download/:id` (anonim) betölti a fájlsort, a szolgáltató `getDownloadUrl` metódusán keresztül (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) rövid életű közvetlen linket készít, ezt 30 percig a memóriában gyorsítótárazza, majd 302-es átirányítással, `Cache-Control: max-age=300` fejléccel továbbít. A sávszélesség böngésző és szolgáltató között folyik, sosem halad át az Apin. Az S3-kompatibilis szolgáltatónál az átirányítás teljesen elmarad: a `contentPath` a stabil `publicBase + key` URL (a bucketnek engednie kell a nyilvános olvasást és a CORS PUT-ot).

A törlések és letöltések a `files.provider` alapján irányítódnak (`StorageResolver.forFile`); a szolgáltatót nem tartalmazó régi sorok az URL-előtag alapú irányításra térnek vissza. A BYOS-fájlok átnevezése csak az adatbázisban történik (a bájtokra az `externalId` hivatkozik, nem a név). Ha egy olyan szolgáltatót csatlakoztatnak le, amelyhez még tartoznak fájlok, a sor csak letiltásra kerül (a tokenek megmaradnak, hogy a letöltések és törlések továbbra is működjenek), nem törlődik.

## Csatlakozás (B1Admin → Beállítások → Fájltárhely)

Az OAuth-hármas ugyanazt a közvetítő (relay) folyamatot használja, mint a tartalomszolgáltatók: előugró ablak → szolgáltatói hozzájárulás → `{membershipApi}/oauth/relay/callback` → a B1Admin lekérdezi a relay-munkamenetet → a `POST /content/storage/exchange` elvégzi a szerveroldali kód–token cserét (a kliens titkai soha nem hagyják el a szervert; Google: `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive: `ONEDRIVE_CLIENT_SECRET`, a Dropbox PKCE-es nyilvános kliens). A kliensazonosítók a `B1Admin/src/settings/components/byosProviders.ts` és az `Api .../ByosAuth.ts` fájlban találhatók. A hatókörök szándékosan minimálisak: Google `drive.file` (csak az alkalmazás által létrehozott fájlok — nincs korlátozott hatókörű ellenőrzés), OneDrive `Files.ReadWrite.AppFolder`, Dropbox alkalmazásmappa-hozzáférés. Az S3 egyszerű hitelesítőadat-űrlap.

Hatókör-megjegyzés: a BYOS csak a `/content/files` felületekre vonatkozik. A galéria-képek, bélyegképek, logók és személyfotók az alapértelmezett szolgáltatón maradnak (kis méretűek, CDN-ről szolgálják ki őket, képoptimalizáltak). A kliens a `postUrl` törzsében megadhatja a `platformStorage: true` értéket is, hogy a feltöltést az egyház BYOS-beállításától függetlenül az alapértelmezett churchapps szolgáltatóhoz rögzítse. A FreeShow ezt a `files/group/{teamId}/current.zip` szinkronizációs állapotához használja, amelyet a rendszer közvetlenül a nyilvános tartalomgazdáról olvas, és soha nem regisztrál fájlsorként.
