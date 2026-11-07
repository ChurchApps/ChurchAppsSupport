---
title: "Сопствено складиште (BYOS)"
---

# Сопствено складиште (BYOS)

Црквама се додељује око 100MB бесплатног хостованог простора за датотеке (површине `/content/files`: датотеке веб-сајта и ресурси група). BYOS омогућава цркви да повеже сопствено облачно складиште, било **Google Drive, Dropbox, OneDrive или било који S3-компатибилни бакет (AWS S3, Cloudflare R2, Backblaze B2)**, тако да се нове отпремљене датотеке чувају на налогу цркве, без ограничења платформе. ChurchApps остаје бесплатан, а ограничење је налог саме цркве.

## Слој провајдера складишта

BYOS поново користи слој складишта направљен за [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`), који за сваку цркву разрешава `StorageResolver` на основу табеле `content.storageProviders`. За разлику од јединствених провајдера `churchapps` и `ministrystuff`, BYOS провајдери чувају креденцијале за сваку цркву, па `StorageResolver.forChurch` при сваком захтеву прави инстанцу на основу реда те цркве. Имплементације се налазе поред резолвера у `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` и `ByosAuth` (размена OAuth токена и освежавање у једном кораку; Dropbox ротира refresh токене, па се освежавања дедупликују на исти начин као у `ProviderProxyController`).

`storageProviders` чува креденцијале: `accessToken`/`refreshToken`/`tokenExpiresAt` (шифровани, OAuth трио) или `apiKey`/`apiSecret` и `settings` JSON (`{endpoint, region, bucket, publicBase}`, за S3). Токени никада не стижу до клијента. `GET /content/storage/providers` маскира тајне и враћа логичку вредност `connected`.

## Ток отпремања

Исти троетапни уговор као и раније, са проширеним обликом потписаног захтева. `POST /content/files/postUrl` враћа `PresignedPostData`, који сада опционо садржи `method`, `rawBody`, `headers`, `chunkSize` и `externalIdField`:

| Провајдер | Потписивање | Клијент шаље бајтове |
|---|---|---|
| churchapps (подразумевано) | S3 потписани POST | мултипарт форма (застарело) |
| Google Drive | сесија отпремања која се може наставити (обим `drive.file`) | један PUT на URI сесије |
| Dropbox | `files/get_temporary_upload_link` (4 сата) | сирови POST |
| OneDrive | `createUploadSession` (approot) | PUT по деловима (20MiB, умножак од 320KiB за Graph) |
| S3-компатибилни | потписани PUT (B2 nema POST политике) | сирови PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) обрађује све облике и враћа ид датотеке код провајдера када одговор садржи један (Drive). Клијент га прослеђује као `externalId` у регистрацији `POST /content/files`. `files.provider` и `files.externalId` бележе где се бајтови налазе (ид Drive датотеке, а за остале путању). Провера квоте од 100MB примењује се само када је разрешени провајдер `churchapps`.

## Јавна преузимања

Потрошачки облаци не могу да се користе као директни линкови (Drive линкови се гасе када се потроши квота, а Dropbox и OneDrive линкови истичу), па за OAuth трио `contentPath` указује на стабилну Api руту: `GET /content/files/download/:id` (анонимно). Ова рута учитава ред датотеке, преко провајдеровог `getDownloadUrl` (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) добија кратковечни директни линк, кешира га у меморији 30 минута и преусмерава са 302 и `Cache-Control: max-age=300`. Саобраћај тече између прегледача и провајдера, никада кроз Api. S3-компатибилни провајдери потпуно прескачу преусмеравање: `contentPath` је стабилан URL `publicBase + key` (бакет мора да дозвољава јавно читање и CORS PUT).

Брисања и преузимања се усмеравају према `files.provider` (`StorageResolver.forFile`). Старији редови без тог поља враћају се на усмеравање по префиксу URL-а. Преименовања за BYOS датотеке раде само у бази, јер се бајтовима приступа преко `externalId`, а не преко имена. Када се провајдер искључи, а и даље има датотеке, ред се меко онемогућава: токени се задржавају да би преузимања и брисања и даље радила. Ред се не брише.

## Повезивање (B1Admin → Подешавања → Складиште датотека)

OAuth трио користи исти релеј-ток као и провајдери садржаја: искачући прозор → сагласност провајдера → `{membershipApi}/oauth/relay/callback` → B1Admin проверава сесију релеја → `POST /content/storage/exchange` извршава размену кода за токен на серверу. Тајне клијента никада не напуштају сервер: Google користи `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, а Dropbox је PKCE јавни клијент. Идентификатори клијента налазе се у `B1Admin/src/settings/components/byosProviders.ts` и `Api .../ByosAuth.ts`. Обими су намерно минимални: Google `drive.file` (само датотеке које је направила апликација, без верификације ограничених обима), OneDrive `Files.ReadWrite.AppFolder` и Dropbox приступ фасцикли апликације. S3 користи једноставан образац за креденцијале.

Напомена о обиму: BYOS покрива само површине `/content/files`. Слике из галерије, сличице, логотипи и фотографије особа остају на подразумеваном провајдеру, јер су мале, послужује их CDN и оптимизоване су за слике. Клијент може у тело `postUrl` захтева такође проследити `platformStorage: true` да би отпремање било везано за подразумевани провајдер `churchapps`, без обзира на BYOS подешавање цркве. FreeShow ово користи за стање синхронизације `files/group/{teamId}/current.zip`. То стање се чита директно са јавног хоста садржаја и никада се не региструје као ред датотеке.
