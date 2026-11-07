---
title: "Własna pamięć masowa (BYOS)"
description: "Połącz własny Dysk Google, Dropbox, OneDrive lub bucket S3 w B1 Admin, aby przesyły plików kościoła omijały limit platformy 100 MB."
---

# Własna pamięć masowa (BYOS)

Parafie otrzymują około 100 MB bezpłatnej hostowanej pamięci plików (powierzchnie `/content/files`: pliki witryny, zasoby grup). BYOS pozwala parafii podłączyć własną chmurę — **Google Drive, Dropbox, OneDrive lub dowolny zasobnik zgodny z S3** (AWS S3, Cloudflare R2, Backblaze B2) — dzięki czemu nowe przesyłane pliki trafiają na konto parafii, bez limitu platformy. ChurchApps pozostaje bezpłatne; jedynym ograniczeniem jest konto samej parafii.

## Warstwa dostawców

BYOS wykorzystuje warstwę pamięci przygotowaną dla [MinistryStuff](./ministrystuff.md): `IStorageProvider` (`Packages/apihelper`), rozwiązywany dla każdej parafii przez `StorageResolver` na podstawie tabeli `content.storageProviders`. W odróżnieniu od singletonowych dostawców `churchapps`/`ministrystuff`, dostawcy BYOS przechowują dane uwierzytelniające przypisane do parafii, dlatego `StorageResolver.forChurch` tworzy instancję dla każdego żądania na podstawie wiersza parafii. Implementacje znajdują się obok resolvera w `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` oraz `ByosAuth` (wymiana tokenów OAuth i odświeżanie w trybie single-flight — Dropbox rotuje tokeny odświeżania, więc odświeżenia są deduplikowane w ten sam sposób, co w `ProviderProxyController`).

`storageProviders` przechowuje dane uwierzytelniające: `accessToken`/`refreshToken`/`tokenExpiresAt` (zaszyfrowane, trójka OAuth) lub `apiKey`/`apiSecret` oraz JSON `settings` (`{endpoint, region, bucket, publicBase}`, dla S3). Tokeny nigdy nie trafiają do klienta — `GET /content/storage/providers` ukrywa sekrety i zwraca wartość logiczną `connected`.

## Przebieg przesyłania

Ten sam trzyetapowy kontrakt co dotychczas, z rozszerzonym kształtem podpisanego żądania. `POST /content/files/postUrl` zwraca `PresignedPostData`, która teraz opcjonalnie zawiera `method`, `rawBody`, `headers`, `chunkSize` oraz `externalIdField`:

| Dostawca | Podpisanie | Klient wysyła dane |
|---|---|---|
| churchapps (domyślny) | podpisane żądanie POST do S3 | formularz multipart (wersja starsza) |
| Google Drive | sesja wznawialnego przesyłania (zakres `drive.file`) | pojedyncze żądanie PUT na URI sesji |
| Dropbox | `files/get_temporary_upload_link` (4 h) | surowe żądanie POST |
| OneDrive | `createUploadSession` (approot) | podzielony PUT (20 MiB, wielokrotność 320 KiB wymagana przez Graph) |
| Zgodne z S3 | podpisane żądanie PUT (B2 nie obsługuje polityk POST) | surowe żądanie PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) obsługuje wszystkie warianty i zwraca identyfikator pliku u dostawcy, gdy odpowiedź go zawiera (Drive). Klient przekazuje go jako `externalId` podczas rejestracji `POST /content/files`; pola `files.provider` oraz `files.externalId` zapisują, gdzie znajdują się dane (identyfikator pliku na Drive; ścieżka w pozostałych przypadkach). Kontrola limitu 100 MB dotyczy tylko sytuacji, gdy rozwiązanym dostawcą jest `churchapps`.

## Publiczne pobieranie

Prywatnych chmur nie da się linkować bezpośrednio (linki Drive przekraczają limit transferu, linki Dropbox i OneDrive wygasają), dlatego w przypadku trójki OAuth `contentPath` wskazuje stabilną trasę Api: `GET /content/files/download/:id` (dla anonimowych użytkowników) pobiera wiersz pliku, generuje krótkotrwały bezpośredni link za pomocą `getDownloadUrl` danego dostawcy (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), przechowuje go w pamięci podręcznej przez 30 minut i przekierowuje (302) z nagłówkiem `Cache-Control: max-age=300`. Transfer danych przebiega między przeglądarką a dostawcą, nigdy przez Api. Dostawca zgodny z S3 w ogóle nie stosuje przekierowania — `contentPath` to stabilny adres `publicBase + key` (zasobnik musi zezwalać na publiczny odczyt i CORS PUT).

Usuwanie i pobieranie są kierowane według `files.provider` (`StorageResolver.forFile`); starsze wiersze bez tego pola korzystają z routingu opartego na prefiksie adresu URL. Zmiana nazwy plików BYOS dotyczy wyłącznie bazy danych (dane są adresowane przez `externalId`, a nie nazwę). Odłączenie dostawcy, u którego nadal są pliki, wyłącza wiersz programowo (tokeny zostają zachowane, dzięki czemu pobieranie i usuwanie nadal działają), zamiast go usuwać.

## Łączenie (B1Admin → Settings → File Storage)

Trójka OAuth korzysta z tego samego przekaźnika co dostawcy treści: wyskakujące okno → zgoda dostawcy → `{membershipApi}/oauth/relay/callback` → B1Admin odpytuje sesję przekaźnika → `POST /content/storage/exchange` wykonuje po stronie serwera wymianę kodu na token (sekrety klienta nigdy nie opuszczają serwera; `GOOGLE_DRIVE_CLIENT_SECRET` dla Google, `ONEDRIVE_CLIENT_SECRET` dla OneDrive; Dropbox to publiczny klient PKCE). Identyfikatory klientów znajdują się w `B1Admin/src/settings/components/byosProviders.ts` oraz `Api .../ByosAuth.ts`. Zakresy są celowo minimalne: Google `drive.file` (wyłącznie pliki utworzone przez aplikację — bez weryfikacji zakresów ograniczonych), OneDrive `Files.ReadWrite.AppFolder`, Dropbox dostęp do folderu aplikacji. S3 wymaga po prostu formularza z danymi uwierzytelniającymi.

Uwaga dotycząca zakresu: BYOS obejmuje wyłącznie powierzchnie `/content/files`. Obrazy galerii, miniatury, logo i zdjęcia osób pozostają u domyślnego dostawcy (są małe, serwowane przez CDN i zoptymalizowane pod kątem obrazów). Klient może też przekazać `platformStorage: true` w treści `postUrl`, aby przypiąć przesyłanie do domyślnego dostawcy churchapps, niezależnie od ustawienia BYOS parafii. FreeShow korzysta z tego w przypadku stanu synchronizacji `files/group/{teamId}/current.zip`, który jest odczytywany bezpośrednio z publicznego hosta treści i nigdy nie jest rejestrowany jako wiersz pliku.
