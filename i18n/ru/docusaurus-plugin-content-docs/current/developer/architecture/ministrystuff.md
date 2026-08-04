# MinistryStuff (платное хранилище и SMS)

MinistryStuff.org — это отдельный платный сервис, который финансирует две вещи, которые ChurchApps не может раздавать бесплатно, — массовое файловое хранилище (1 ТБ+) и SMS-кредиты — в виде подписок с фиксированной ежемесячной платой. Сам ChurchApps остаётся на 100% бесплатным; ничто в B1 не требует подписки MinistryStuff, и каждая точка интеграции — это шов провайдера, который могла бы реализовать и третья сторона.

## Компоненты

| Часть | Репозиторий | Роль |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (порт 8097 в разработке) | Биллинг (Stripe), отправка SMS + учёт кредитов (AWS End User Messaging), хранилище (S3 + учёт квот). Единая база данных MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (порт 3103 в разработке) | ministrystuff.org — маркетинг, тарификация и портал аккаунта (планы, использование, редиректы Stripe Checkout/Customer Portal). |
| Провайдер SMS | `Packages/texting` → `MinistryStuffProvider` | Зарегистрирован как `ministrystuff` наряду с Clearstream/TextInChurch. |
| Шов хранилища | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (по умолчанию, бесплатный) оборачивает исходный переключатель S3/диск; `FileStorageHelper` без изменений делегирует провайдеру по умолчанию. |
| Подключение в Api | Модули content + messaging в `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (content), внедрение служебного ключа `TextingConfigHelper` (messaging), таблица `storageProviders`, конечные точки `/content/storage/*` + `/messaging/texting/credits`. |

## Идентификация и доверие

- Те же аккаунты, те же церкви: MinistryStuffApi проверяет JWT-токены ChurchApps общим `JWT_SECRET` (паттерн приложения-побратима, как у B1Transfer). Портал входит через MembershipApi и принимает передачу `?jwt=`.
- Сервер-сервер (основной Api → MinistryStuffApi): заголовок `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, с обеих сторон) + явный `churchId`. Право доступа всегда проверяется относительно подписки этой церкви. Церкви никогда не хранят учётные данные MinistryStuff — выбора провайдера в B1Admin достаточно.

## Поток SMS

B1Admin «Отправить SMS» → `TextingController` Api → `getProvider("ministrystuff")` из `@churchapps/texting` → MinistryStuffApi `/sms/send|/sms/sendBulk` → количество сегментов списывается с `smsCreditGrants` текущего периода → AWS End User Messaging (или `smsMode: mock` в разработке). Кредиты — это **жёсткая остановка**: исчерпанные кредиты отклоняют отправку целиком (`insufficient_credits`, отображается в B1Admin как дружелюбное предложение апгрейда) — никогда не частичная отправка, никогда не биллинг за перерасход. Выдача кредитов идемпотентна по каждому расчётному периоду, из вебхуков Stripe `invoice.paid`. Отказы от SMS (`smsOptOuts`) отфильтровываются перед каждой отправкой.

## Поток хранилища

Строка провайдера церкви (`content.storageProviders`, управляется в B1Admin → Settings → File Storage) выбирает, куда идут **новые** загрузки. `contentPath` — абсолютный URL для каждого файла, поэтому смешанные провайдеры сосуществуют без миграции: старые файлы продолжают обслуживаться из `content.churchapps.org`, новые — из `content.ministrystuff.org`. Загрузки проходят путь Api → `StorageResolver.forChurch` → метод провайдера `store`/`getUploadUrl` (предварительно подписанный POST с `content-length-range` в режиме S3; резерв на base64 в режиме диска/разработки); удаления маршрутизируются по сохранённому URL (`StorageResolver.forUrl`). Квота = байты по плану, подсчитываются из `storageObjects` (резервации `stored` + `pending`); превышение квоты блокирует новые загрузки (`storage_quota_exceeded`) — ничего никогда не удаляется и не тарифицируется дополнительно. Бесплатный уровень ChurchApps остаётся нетронутым (те же лимиты, что и раньше; без общецерковной квоты).

Примечание об охвате: выбор провайдера покрывает поток файлов/ресурсов контента (где живут массовые медиа). Загрузки галереи/логотипа/фото остаются на провайдере по умолчанию — они перечисляют ключи из хранилища и строят URL на стороне клиента, поэтому привязка по церкви для них пока не применяется.

## Биллинг

Stripe Checkout (хостируемый) для подписки, Stripe Customer Portal для обновления карты/отмены/счетов — у MinistryStuffWeb нет собственных форм для карт. Одна строка `subscriptions` на пару (церковь, продукт); планы/уровни живут в коде (`MinistryStuffApi/src/helpers/Plans.ts`) с id цен Stripe из конфигурации. Вебхук (`/billing/webhook`, проверка подписи по сырому телу, дедупликация `webhookEvents`) управляет жизненным циклом подписки: active → past_due (льготный период) → canceled.

## Настройка для разработки

Запустите MinistryStuffApi (`yarn dev`, 8097; нужен `.env` с общим `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) и установите тот же служебный ключ в `Api/.env`. `Api/config/dev.json` уже указывает `ministryStuffApi` на `localhost:8097`. MinistryStuffWeb нужен `.env` с `VITE_STAGE=dev`. В разработке используется `smsMode: mock` и дисковое хранилище — AWS не требуется.
