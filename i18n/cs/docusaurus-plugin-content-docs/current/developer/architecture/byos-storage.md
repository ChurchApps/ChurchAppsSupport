---
title: "Vlastní úložiště"
---

# Vlastní úložiště (BYOS)

Sbory dostávají zhruba 100 MB bezplatného hostovaného úložiště souborů (plochy `/content/files`: soubory webu, zdroje skupin). BYOS umožňuje sboru připojit vlastní cloudové úložiště – **Google Drive, Dropbox, OneDrive nebo libovolný úložiště kompatibilní s S3** (AWS S3, Cloudflare R2, Backblaze B2). Nové nahrávané soubory se tak ukládají na účet sboru bez limitu platformy. ChurchApps zůstává zdarma; jediným omezením je kapacita vlastního účtu sboru.

## Rozhraní poskytovatele

BYOS znovu používá rozhraní úložiště vytvořené pro [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), které pro každý sbor určuje `StorageResolver` na základě tabulky `content.storageProviders`. Na rozdíl od jednoinstančních poskytovatelů `churchapps` a `ministrystuff` drží poskytovatelé BYOS přihlašovací údaje konkrétního sboru, proto `StorageResolver.forChurch` vytváří instanci pro každý požadavek na základě řádku daného sboru. Implementace se nacházejí vedle resolveru v `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` a dále `ByosAuth` (výměna tokenů OAuth a obnova v jediném průchodu – Dropbox obměňuje refresh tokeny, proto se obnovy deduplikují stejně jako v `ProviderProxyController`).

Tabulka `storageProviders` obsahuje přihlašovací údaje: `accessToken`/`refreshToken`/`tokenExpiresAt` (šifrované, trojice OAuth) nebo `apiKey`/`apiSecret` a JSON `settings` (`{endpoint, region, bucket, publicBase}`, u S3). Tokeny se nikdy nedostanou ke klientovi – `GET /content/storage/providers` maskuje tajné údaje a vrací logickou hodnotu `connected`.

## Postup nahrávání

Stejný třístupňový kontrakt jako dříve, s rozšířeným tvarem předpodepsání. `POST /content/files/postUrl` vrací `PresignedPostData`, které nyní může volitelně obsahovat `method`, `rawBody`, `headers`, `chunkSize` a `externalIdField`:

| Poskytovatel | Předpodepsání | Klient odesílá data |
|---|---|---|
| churchapps (výchozí) | předpodepsaný POST na S3 | formulář multipart (starší) |
| Google Drive | relace nahrávání s možností obnovy (rozsah `drive.file`) | jediný PUT na URI relace |
| Dropbox | `files/get_temporary_upload_link` (4 h) | nezpracovaný POST |
| OneDrive | `createUploadSession` (approot) | PUT po částech (20 MiB, násobek 320 KiB podle Graphu) |
| Kompatibilní s S3 | předpodepsaný PUT (B2 nemá POST politiky) | nezpracovaný PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) zpracuje všechny tvary a pokud odpověď obsahuje identifikátor souboru u poskytovatele (Drive), vrátí jej. Klient jej předá jako `externalId` při registraci `POST /content/files`. Pole `files.provider` a `files.externalId` zaznamenávají, kde se data nacházejí (identifikátor souboru na Drive; u ostatních cesta). Kontrola kvóty 100 MB se uplatní pouze tehdy, když je zvoleným poskytovatelem `churchapps`.

## Veřejné stahování

Spotřebitelské cloudy nelze přímo odkazovat (odkazy na Drive překračují kvótu, odkazy na Dropbox a OneDrive vypršují), proto u trojice OAuth `contentPath` ukazuje na stabilní trasu API: `GET /content/files/download/:id` (anonymní) načte řádek souboru, pomocí `getDownloadUrl` poskytovatele vytvoří krátkodobý přímý odkaz (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), uloží jej do paměti na 30 minut a přesměruje pomocí HTTP 302 s hlavičkou `Cache-Control: max-age=300`. Přenos dat tak probíhá mezi prohlížečem a poskytovatelem, nikdy přes API. U úložišť kompatibilních s S3 se přesměrování vynechává – `contentPath` je stabilní URL `publicBase + key` (segment musí povolovat veřejné čtení a CORS PUT).

Mazání a stahování se směrují podle `files.provider` (`StorageResolver.forFile`); starší řádky bez tohoto pole používají směrování podle prefixu URL. Přejmenování u souborů BYOS probíhá pouze v databázi (data se adresují přes `externalId`, ne přes název). Odpojení poskytovatele, který ještě obsahuje soubory, řádek pouze deaktivuje (tokeny ponechá, aby stahování a mazání dál fungovaly), místo aby jej smazal.

## Připojení (B1Admin → Settings → File Storage)

Trojice OAuth používá stejný tok přes přenosový server jako poskytovatelé obsahu: vyskakovací okno → souhlas poskytovatele → `{membershipApi}/oauth/relay/callback` → B1Admin dotazuje relační session přenosového serveru → `POST /content/storage/exchange` na straně serveru provede výměnu kódu za token (klientská tajemství nikdy neopustí server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`; Dropbox je veřejný klient PKCE). ID klientů jsou v `B1Admin/src/settings/components/byosProviders.ts` a `Api .../ByosAuth.ts`. Rozsahy oprávnění jsou záměrně minimální: Google `drive.file` (pouze soubory vytvořené aplikací – bez ověřování omezených rozsahů), OneDrive `Files.ReadWrite.AppFolder`, Dropbox přístup ke složce aplikace. U S3 jde o jednoduchý formulář s přihlašovacími údaji.

Poznámka k rozsahu: BYOS pokrývá pouze plochy `/content/files`. Obrázky galerie, náhledy, loga a fotografie osob zůstávají u výchozího poskytovatele (jsou malé, doručované přes CDN a optimalizované pro obrázky). Klient může také v těle `postUrl` předat `platformStorage: true`, aby se nahrávání přišpendlilo na výchozího poskytovatele churchapps bez ohledu na nastavení BYOS daného sboru. FreeShow to používá pro stav synchronizace `files/group/{teamId}/current.zip`, který se čte přímo z veřejného obsahového hostitele a nikdy se neregistruje jako řádek souboru.
