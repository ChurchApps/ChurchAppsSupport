---
title: "Собственное хранилище"
---

# Собственное хранилище (BYOS)

Церкви получают примерно 100MB бесплатного размещённого хранилища файлов (поверхности `/content/files`: файлы веб-сайта, ресурсы группы). BYOS позволяет церкви ссылаться свои собственные облачные хранилища — **Google Drive, Dropbox, OneDrive или любой S3-совместимый ведро (AWS S3, Cloudflare R2, Backblaze B2)** — так что новые загрузки приземляются в учётную запись церкви без лимита платформы. ChurchApps остаётся бесплатным; учётная запись церкви это лимит.

## Сеам поставщика

BYOS повторно использует сеам хранилища, построенный для [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) разрешается за церковь по `StorageResolver` с таблицы `content.storageProviders`. В отличие от синглтон поставщиков `churchapps`/`ministrystuff`, поставщики BYOS держат почта-церковь учётные данные, поэтому `StorageResolver.forChurch` создаёт экземпляр за запрос с строки церкви. Реализации живут рядом с разрешением в `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, плюс `ByosAuth` (обмен OAuth токена + одиночный авиализм refresh — Dropbox вращает токены refresh, поэтому refreshes дедупликаты тот же путь как `ProviderProxyController` делает).

`storageProviders` несёт учётные данные: `accessToken`/`refreshToken`/`tokenExpiresAt` (зашифрованные, OAuth трио) или `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Токены никогда не достигают клиента — `GET /content/storage/providers` маски секреты и возвращает `connected` булево.

## Поток загрузки

Тот же трёх-шаговый контракт как перед, с расширенной формой предписания. `POST /content/files/postUrl` возвращает `PresignedPostData` который теперь опционально несёт `method`, `rawBody`, `headers`, `chunkSize` и `externalIdField`:

| Поставщик | Предпись | Клиент отправляет байты |
|---|---|---|
| churchapps (по умолчанию) | S3 предписанный POST | multipart форма (устаревшая) |
| Google Drive | сессия возобновляемой загрузки (`drive.file` область) | один PUT к URI сессии |
| Dropbox | `files/get_temporary_upload_link` (4h) | сырой POST |
| OneDrive | `createUploadSession` (approot) | разбитый PUT (20MiB, Graph 320KiB-кратный) |
| S3-совместимый | предписанный PUT (B2 не имеет политик POST) | сырой PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) обрабатывает все формы и возвращает ID файла поставщика когда ответ несёт один (Drive). Клиент проходит это как `externalId` в `POST /content/files` регистрации; `files.provider` + `files.externalId` запись где байты живут (ID файла Drive; путь для других). Проверка квоты 100MB применяется только когда разрешённый поставщик это `churchapps`.

## Публичные загрузки

Облака потребителя не могут быть горячо связаны (ссылки Drive квота-out, Dropbox/OneDrive ссылки истекают), поэтому для OAuth трио `contentPath` указывает на стабильный маршрут Api: `GET /content/files/download/:id` (анонимные) загружает строку файла, чеканит краткосрочную прямую ссылку через `getDownloadUrl` поставщика (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), кэши это в-памяти на 30 минут, и 302-перенаправления с `Cache-Control: max-age=300`. Пропускная способность потоки браузер↔поставщик, никогда через Api. S3-совместимый пропускает перенаправление полностью — `contentPath` это стабильный `publicBase + key` URL (ведро должно разрешить публичное чтение и CORS PUT).

Удаления и загрузки маршрут по `files.provider` (`StorageResolver.forFile`); устаревшие строки без это fall back к маршрутизации URL-префикса. Переименовывание это DB-только для файлов BYOS (байты адресованы по `externalId`, не имя). Отключение поставщика, который всё ещё имеет файлы мягко-отключает строку (держит токены так загрузки/удаления продолжают работу) вместо удаления этого.

## Подключение (B1Admin → Параметры → Хранилище файлов)

OAuth трио использует тот же поток реле как поставщики содержания: всплывающее окно → согласие поставщика → `{membershipApi}/oauth/relay/callback` → B1Admin опросы сессию реле → `POST /content/storage/exchange` выполняет обмен серверной кода→токен (секреты клиента никогда не покидают сервер; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox это общедоступный клиент PKCE). ID клиента живут в `B1Admin/src/settings/components/byosProviders.ts` и `Api .../ByosAuth.ts`. Области намеренно минимальны: Google `drive.file` (только файлы, созданные приложением — проверка области не ограничена), OneDrive `Files.ReadWrite.AppFolder`, Dropbox доступ папки приложения. S3 это простая форма учётных данных.

Примечание области: BYOS охватывает поверхности `/content/files` только. Изображения галереи, миниатюры, логотипы и фотографии человека остаются на поставщике по умолчанию (мало, CDN-проведённые, оптимизированные изображением).
