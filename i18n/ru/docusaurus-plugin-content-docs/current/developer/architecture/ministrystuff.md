# MinistryStuff (Оплачиваемое хранилище и текстирование)

MinistryStuff.org — это отдельный платный сервис, который финансирует две вещи, которые ChurchApps не может раздать — объёмное хранилище файлов (1TB+) и кредиты SMS — как подписки с фиксированной ставкой. ChurchApps сам остаётся на 100% бесплатным; ничто в B1 не требует подписки MinistryStuff, и каждая точка интеграции — это сеам поставщика, который третья сторона также может реализовать.

## Компоненты

| Кусок | Репо | Роль |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (порт 8097 dev) | Выставление (Stripe), отправка SMS + учёт кредитов (AWS End User Messaging), хранилище (S3 + учёт квоты). Одна БД MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (порт 3103 dev) | ministrystuff.org — маркетинг, ценообразование и портал учётной записи (планы, использование, перенаправления Stripe Checkout/Customer Portal). |
| Поставщик текстирования | `Packages/texting` → `MinistryStuffProvider` | Зарегистрирован как `ministrystuff` рядом с Clearstream/TextInChurch. |
| Сеам хранилища | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (по умолчанию, бесплатно) оборачивает оригинальный переключатель S3/диска; `FileStorageHelper` делегирует поставщику по умолчанию без изменений. |
| Проводка Api | `Api/` модули содержания + обмена сообщениями | `MinistryStuffStorageProvider` + `StorageResolver` (содержание), `TextingConfigHelper` впрыск сервис-ключа (обмена сообщениями), таблица `storageProviders`, конечные точки `/content/storage/*` + `/messaging/texting/credits`. |

## Идентичность и доверие

- Одни и те же учётные записи, одна и та же церковь: MinistryStuffApi проверяет JWT ChurchApps с общим `JWT_SECRET` (шаблон приложения-сибирского, как B1Transfer). Портал входит в MembershipApi и принимает передачи `?jwt=`.
- Сервер-к-серверу (ядро Api → MinistryStuffApi): заголовок `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, обе стороны) + явно `churchId`. Право всегда проверяется против подписки этой церкви. Церкви никогда не держат учётные данные MinistryStuff — выбор поставщика в B1Admin это всё, что нужно.

## Поток текстирования

B1Admin Отправить текст → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → счёт отрезков дебитировался против текущего периода `smsCreditGrants` → AWS End User Messaging (или `smsMode: mock` в dev). Кредиты это **жёсткая остановка**: исчерпанные кредиты отклоняют оптом (`insufficient_credits`, выраженные как дружелюбный запрос обновления в B1Admin) — никогда частичные отправки, никогда выставление перерасхода. Гранты кредитов выпускаются идемпотентно за период выставления из вебхуков Stripe `invoice.paid`. Отказ (`smsOptOuts`) отфильтровывается перед каждой отправкой.

## Поток хранилища

Строка поставщика церкви (`content.storageProviders`, управляемая в B1Admin → Параметры → Хранилище файлов) выбирает где **новые** загрузки идут. `contentPath` является абсолютным URL за файл, поэтому смешанные поставщики сосуществуют с нулевой миграцией: старые файлы продолжают служить с `content.churchapps.org`, новые с `content.ministrystuff.org`. Загрузки текут Api → `StorageResolver.forChurch` → поставщик `store`/`getUploadUrl` (предписанный POST с `content-length-range` в режиме S3; fallback base64 в режиме диска/dev); удаления маршрут на хранимый URL (`StorageResolver.forUrl`). Квота = байты плана, считаются с `storageObjects` (`stored` + `pending` зарезервированные); превышенная квота блокирует новые загрузки (`storage_quota_exceeded`) — ничто никогда не удаляется или не выставляется счётом extra. Свободный уровень ChurchApps не затронут (те же границы как перед; никакой квоты полной церкви).

Примечание области: выбор поставщика охватывает поток **файлы/ресурсы** содержания (где массив мультимедиа живёт). Загрузки галереи/логотипа/фотографии остаются на поставщике по умолчанию — они ключи списка с хранилища и строят URL клиента-сторону, поэтому изоляция за церковь не применяется ещё.

Тот же сеам также питает [Собственное хранилище](./byos-storage): церкви могут ссылаться Google Drive, Dropbox, OneDrive или свой S3-совместимый ведро вместо плана MinistryStuff.

## Выставление

Stripe Checkout (размещённый) для подписания, Stripe Customer Portal для обновления карты/отмены/счётов — MinistryStuffWeb не имеет форм карты. Одна строка `subscriptions` за (церковь, продукт); планы/уровни живут в коде (`MinistryStuffApi/src/helpers/Plans.ts`) с идентификаторами цены Stripe из конфигурации. Вебхук (`/billing/webhook`, проверка подписи сырого тела, дедупликация `webhookEvents`) управляет жизненным циклом подписки: active → past_due (благодать) → canceled.

## Dev Установка

Запустите MinistryStuffApi (`yarn dev`, 8097; требует `.env` с общим `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) и установите тот же сервис-ключ в `Api/.env`. `Api/config/dev.json` уже указывает `ministryStuffApi` на `localhost:8097`. MinistryStuffWeb требует `.env` с `VITE_STAGE=dev`. Dev использует `smsMode: mock` и дисковое хранилище — AWS не требуется.
