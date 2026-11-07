---
title: "Власне сховище (BYOS)"
---

# Власне сховище (BYOS)

Церкви отримують ~100 МБ безкоштовного хмарного сховища для файлів (поверхні `/content/files`: файли веб-сайту, матеріали груп). BYOS дозволяє церкві під'єднати власне хмарне сховище — **Google Drive, Dropbox, OneDrive або будь-який S3-сумісний бакет (AWS S3, Cloudflare R2, Backblaze B2)** — щоб нові завантаження зберігалися в облікового записі церкви без обмежень платформи. ChurchApps залишається безкоштовним; обмеженням є обліковий запис самої церкви.

## Точка підключення провайдерів

BYOS використовує ту саму архітектуру сховища, що й [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), який для кожної церкви визначає `StorageResolver` на основі таблиці `content.storageProviders`. На відміну від єдиних провайдерів `churchapps`/`ministrystuff`, провайдери BYOS зберігають облікові дані конкретної церкви, тому `StorageResolver.forChurch` створює екземпляр для кожного запиту на основі рядка церкви. Реалізації розташовані поруч із резолвером у `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, а також `ByosAuth` (обмін токенів OAuth + оновлення з єдиним польотом — Dropbox ротує refresh-токени, тому оновлення дедуплікуються так само, як це робить `ProviderProxyController`).

`storageProviders` містить облікові дані: `accessToken`/`refreshToken`/`tokenExpiresAt` (зашифровані, трійка OAuth) або `apiKey`/`apiSecret` + JSON у `settings` (`{endpoint, region, bucket, publicBase}`, для S3). Токени ніколи не потрапляють до клієнта — `GET /content/storage/providers` маскує секрети та повертає булеве значення `connected`.

## Процес завантаження

Той самий трикроковий контракт, що й раніше, але з розширеною структурою попереднього підпису. `POST /content/files/postUrl` повертає `PresignedPostData`, яка тепер необов'язково містить `method`, `rawBody`, `headers`, `chunkSize` і `externalIdField`:

| Провайдер | Попередній підпис | Клієнт надсилає байти |
|---|---|---|
| churchapps (за замовчуванням) | попередньо підписаний POST-запит S3 | multipart-форма (застаріла) |
| Google Drive | сесія відновлюваного завантаження (область `drive.file`) | один PUT-запит на URI сесії |
| Dropbox | `files/get_temporary_upload_link` (4 години) | сирий POST |
| OneDrive | `createUploadSession` (approot) | PUT частинами (20 МіБ, кратні 320 КіБ для Graph) |
| S3-сумісний | попередньо підписаний PUT (B2 не підтримує політики POST) | сирий PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) обробляє всі варіанти та повертає ідентифікатор файлу провайдера, якщо відповідь його містить (Drive). Клієнт передає його як `externalId` під час реєстрації `POST /content/files`. Поля `files.provider` і `files.externalId` зберігають, де знаходяться байти (ідентифікатор файлу Drive; шлях для інших). Перевірка квоти 100 МБ застосовується лише тоді, коли обраний провайдер — `churchapps`.

## Публічні завантаження

Споживчі хмари не можна вбудовувати напряму (посилання Drive вичерпують квоту, посилання Dropbox/OneDrive спливають), тому для трійки OAuth `contentPath` вказує на стабільний маршрут Api: `GET /content/files/download/:id` (анонімний) завантажує рядок файлу, створює короткоживуче пряме посилання через `getDownloadUrl` провайдера (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), кешує його в пам'яті на 30 хвилин і виконує перенаправлення 302 з `Cache-Control: max-age=300`. Трафік іде між браузером і провайдером, ніколи не через Api. S3-сумісні сховища взагалі не використовують перенаправлення — `contentPath` є стабільною URL-адресою `publicBase + key` (бакет має дозволяти публічне читання та CORS PUT).

Видалення та завантаження маршрутизуються за `files.provider` (`StorageResolver.forFile`); старі рядки без цього поля використовують маршрутизацію за префіксом URL. Перейменування для файлів BYOS виконуються лише в базі даних (байти адресуються через `externalId`, а не за назвою). Відключення провайдера, у якого ще є файли, м'яко вимикає рядки (токени зберігаються, тож завантаження та видалення продовжують працювати), а не видаляє їх.

## Підключення (B1Admin → Налаштування → Файлове сховище)

Трійка OAuth використовує той самий потік relay, що й провайдери контенту: спливаюче вікно → згода провайдера → `{membershipApi}/oauth/relay/callback` → B1Admin опитує сесію relay → `POST /content/storage/exchange` виконує обмін коду на токен на стороні сервера (клієнтські секрети ніколи не покидають сервер; Google — `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive — `ONEDRIVE_CLIENT_SECRET`, Dropbox є публічним клієнтом PKCE). Ідентифікатори клієнтів містяться в `B1Admin/src/settings/components/byosProviders.ts` та `Api .../ByosAuth.ts`. Області доступу навмисно мінімальні: Google `drive.file` (лише файли, створені застосунком, без перевірки для обмежених областей), OneDrive `Files.ReadWrite.AppFolder`, Dropbox — доступ до папки застосунку. S3 — це звичайна форма з обліковими даними.

Примітка щодо областей: BYOS охоплює лише поверхні `/content/files`. Зображення галереї, мініатюри, логотипи та фото людей залишаються на провайдері за замовчуванням (вони невеликі, роздаються через CDN і оптимізовані для зображень). Клієнт також може передати `platformStorage: true` у тілі `postUrl`, щоб закріпити завантаження за провайдером churchapps за замовчуванням, незалежно від налаштування BYOS церкви. FreeShow використовує це для стану синхронізації `files/group/{teamId}/current.zip`, який читається безпосередньо з публічного хоста контенту і ніколи не реєструється як рядок файлу.
