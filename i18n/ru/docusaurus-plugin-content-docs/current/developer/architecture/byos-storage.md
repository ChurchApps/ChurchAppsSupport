---
title: "Bring-Your-Own Storage"
---

# Bring-Your-Own Storage (BYOS)

Церкви получают ~100MB бесплатного размещенного файлового хранилища (поверхности `/content/files`: Файлы веб-сайта, ресурсы групп). BYOS позволяет церкви связать собственное облачное хранилище -- **Google Drive, Dropbox, OneDrive, или любой S3-совместимый bucket (AWS S3, Cloudflare R2, Backblaze B2)** -- чтобы новые загрузки попадали в счет церкви без ограничения платформы. ChurchApps остается бесплатным; счет собственной церкви - это предел.

## The provider seam

BYOS переиспользует шов хранилища, построенный для [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) разрешен per church по `StorageResolver` из таблицы `content.storageProviders`. В отличие от одноэлементных поставщиков `churchapps`/`ministrystuff`, поставщики BYOS держат per-church учетные данные, поэтому `StorageResolver.forChurch` конструирует экземпляр за запрос из строки церкви. Реализации живут рядом с разрешителем в `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, плюс `ByosAuth` (обмен маркеров OAuth + единственный рейд рефреш -- Dropbox ротирует маркеры рефреш, поэтому рефреши дедублицированы так же, как `ProviderProxyController`).

`storageProviders` несет учетные данные: `accessToken`/`refreshToken`/`tokenExpiresAt` (зашифрованный, трио OAuth) или `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Маркеры никогда не достигают клиента -- `GET /content/storage/providers` маскирует секреты и возвращает `connected` boolean.

## Upload flow

Тот же контракт в три этапа, как раньше, с расширенной формой presign. `POST /content/files/postUrl` возвращает `PresignedPostData`, которые теперь дополнительно несут `method`, `rawBody`, `headers`, `chunkSize` и `externalIdField`:

| Provider | Presign | Client sends bytes |
|---|---|---|
| churchapps (default) | S3 presigned POST | multipart form (legacy) |
| Google Drive | resumable upload session (`drive.file` scope) | single PUT to the session URI |
| Dropbox | `files/get_temporary_upload_link` (4h) | raw POST |
| OneDrive | `createUploadSession` (approot) | chunked PUT (20MiB, Graph 320KiB-multiple) |
| S3-compatible | presigned PUT (B2 has no POST policies) | raw PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) обрабатывает все формы и возвращает id файла поставщика, когда ответ несет один (Drive). Клиент передает его как `externalId` в регистрации `POST /content/files`; `files.provider` + `files.externalId` запись, где живут байты (Drive file id; путь для остальных). Проверка квоты 100MB применяется только, когда разрешенный поставщик - `churchapps`.

## Public downloads

Облака потребителей не могут быть горячо подключены (Drive ссылки квота-выход, Dropbox/OneDrive ссылки истекают), поэтому для трио OAuth `contentPath` указывает на стабильный маршрут Api: `GET /content/files/download/:id` (anonymous) загружает строку файла, монет коротко-жизненную прямую ссылку через `getDownloadUrl` поставщика (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), кэширует ее в памяти на 30 минут, и 302-перенаправляет с `Cache-Control: max-age=300`. Пропускная способность потоков браузер↔провайдер, никогда через Api. S3-compatible пропускает перенаправление полностью -- `contentPath` - это стабильный URL `publicBase + key` (bucket должен разрешить public read и CORS PUT).

Удаляет и загружает маршрут по `files.provider` (`StorageResolver.forFile`); устаревшие строки без него отступают на маршрутизацию URL-префикса. Переименования DB-только для файлов BYOS (байты обращаются по `externalId`, не имени). Отключение поставщика, который все еще имеет файлы, мягко отключает строку (хранит маркеры, поэтому загрузки/удаления продолжают работать) вместо удаления ее.

## Connecting (B1Admin → Settings → File Storage)

Трио OAuth использует тот же поток реле, что и поставщики контента: всплывающее окно → согласие провайдера → `{membershipApi}/oauth/relay/callback` → B1Admin опрашивает сеанс реле → `POST /content/storage/exchange` выполняет обмен кода сервером→маркер (клиентские секреты никогда не оставляют сервер; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox PKCE общедоступный клиент). Идентификаторы клиентов живут в `B1Admin/src/settings/components/byosProviders.ts` и `Api .../ByosAuth.ts`. Области намеренно минимальны: Google `drive.file` (файлы, созданные только приложением -- нет проверки restricted-scope), OneDrive `Files.ReadWrite.AppFolder`, Dropbox app-folder доступ. S3 - это простая форма учетных данных.

Примечание области: BYOS охватывает только поверхности `/content/files`. Изображения галереи, миниатюры, логотипы и фотографии людей остаются на поставщике по умолчанию (малые, CDN-обслуживаемые, оптимизированные для изображений). Клиент также может пройти `platformStorage: true` в теле `postUrl`, чтобы закрепить загрузку к поставщику churchapps по умолчанию независимо от параметра BYOS церкви -- FreeShow использует это для синхронизации `files/group/{teamId}/current.zip`, которая читается непосредственно с общедоступного хоста контента и никогда не регистрируется как строка файла.
