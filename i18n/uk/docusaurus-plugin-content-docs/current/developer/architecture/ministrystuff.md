# MinistryStuff (платне сховище та SMS)

MinistryStuff.org — окрема платна послуга, яка фінансує те, що ChurchApps не може надавати безплатно: масове файлове сховище (1 ТБ і більше) та кредити на SMS. Вони продаються як щомісячні підписки з фіксованою ціною. ChurchApps залишається повністю безплатним: для роботи з B1 не потрібна підписка MinistryStuff, а кожна точка інтеграції є провайдерським інтерфейсом, який так само може реалізувати стороння компанія.

## Компоненти

| Компонент | Репозиторій | Роль |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (порт 8097 у розробці) | Білінг (Stripe), надсилання SMS і облік кредитів (AWS End User Messaging), сховище (S3 і облік квот). Єдина база даних MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (порт 3103 у розробці) | ministrystuff.org — маркетингова частина, ціни та портал облікового запису (плани, використання, перенаправлення на Stripe Checkout і Customer Portal). |
| Провайдер текстових повідомлень | `Packages/texting` → `MinistryStuffProvider` | Зареєстрований як `ministrystuff` поруч із Clearstream і TextInChurch. |
| Точка інтеграції сховища | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (типовий, безплатний) обгортає початковий перемикач S3/диск; `FileStorageHelper` передає виклики типовому провайдеру без змін. |
| Підключення в Api | модуліContent та Messaging у `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (content), підстановка сервісного ключа в `TextingConfigHelper` (messaging), таблиця `storageProviders`, ендпоінти `/content/storage/*` і `/messaging/texting/credits`. |

## Ідентичність і довіра

- Ті самі облікові записи, ті самі церкви: MinistryStuffApi перевіряє JWT ChurchApps за спільним `JWT_SECRET` (за шаблоном пов'язаних застосунків, як B1Transfer). Портал входить через MembershipApi і приймає передачу `?jwt=`.
- Взаємодія між серверами (основний Api → MinistryStuffApi): заголовок `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, на обох боках) і явно вказаний `churchId`. Право доступу завжди перевіряється за підпискою цієї церкви. Церкви ніколи не зберігають облікові дані MinistryStuff: щоб підключити послугу, достатньо вибрати провайдера в B1Admin.

## Потік текстових повідомлень

B1Admin «Send Text» → `TextingController` в Api → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send` або `/sms/sendBulk` → кількість сегментів списується з `smsCreditGrants` поточного періоду → AWS End User Messaging (або `smsMode: mock` у розробці). Кредити — це **жорстке обмеження**: якщо їх бракує, весь запит відхиляється (`insufficient_credits`, у B1Admin це показується як зрозумілий запит на оновлення плану). Часткових надсилань і додаткових платежів за перевищення немає. Гранти кредитів видаються ідемпотентно для кожного платіжного періоду на основі вебхуків Stripe `invoice.paid`. Відписки (`smsOptOuts`) відфільтровуються перед кожним надсиланням.

Інші шляхи також використовують цю точку інтеграції провайдера, минаючи `TextingController`: сповіщення про реєстрацію на check-in (`CheckinController` → `MessagingModuleGateway.sendBulkText`) і дія кроку робочого процесу **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts`, `sendText` → `MessagingModuleGateway.sendPersonText`, який записує рядки в `sentTexts` і `deliveryLogs` без відправника). Поля для підстановки (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) заповнюються для кожного одержувача функцією `MergeFieldHelper.resolve`, а результат обмежується 1 600 символами. У `TextingController` групове повідомлення, що містить `{{`, надсилається як окремий `sendMessage` кожному одержувачу, а не одним `sendBulk`. Повідомлення без полів для підстановки надсилається одним масовим запитом.

## Потік сховища

Рядок провайдера церкви (`content.storageProviders`, керується в B1Admin → Settings → File Storage) визначає, де зберігаються **нові** завантаження. `contentPath` — це абсолютна URL-адреса файлу, тож різні провайдери співіснують без міграції: старі файли продовжують віддаватися з `content.churchapps.org`, а нові — з `content.ministrystuff.org`. Завантаження йдуть так: Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` провайдера (presigned POST з `content-length-range` у режимі S3; у режимі диска/розробки — резервний варіант з base64). Видалення маршрутизуються за збереженою URL-адресою (`StorageResolver.forUrl`). Квота дорівнює байтам тарифного плану і рахується за таблицею `storageObjects` (`stored` плюс резерви `pending`). Коли квоту перевищено, нові завантаження блокуються (`storage_quota_exceeded`). Нічого ніколи не видаляється і не тарифікується понад ліміт. Безплатний рівень ChurchApps не змінюється: ліміти такі самі, як і раніше, і загальноцерковної квоти немає.

Примітка щодо обсягу: вибір провайдера стосується лише потоку **файлів і ресурсів** контенту (там, де зберігаються великі медіафайли). Завантаження галереї, логотипів і фотографій лишаються на типовому провайдері: вони отримують ключі зі сховища і будують URL на боці клієнта, тому прив'язка до церкви поки що не застосовується.

Та сама точка інтеграції забезпечує також [Bring-Your-Own Storage](./byos-storage.md): церкви можуть підключити Google Drive, Dropbox, OneDrive або власний S3-сумісний бакет замість плану MinistryStuff.

## Білінг

Для оформлення підписки використовується розміщений Stripe Checkout, для оновлення картки, скасування та перегляду рахунків — Stripe Customer Portal. MinistryStuffWeb не містить форм для карток. Один рядок `subscriptions` відповідає парі (церква, продукт). Плани та рівні зберігаються в коді (`MinistryStuffApi/src/helpers/Plans.ts`), а ідентифікатори цін Stripe беруться з конфігурації. Вебхук (`/billing/webhook`, перевірка підпису на необробленому тілі запиту, дедуплікація через `webhookEvents`) керує життєвим циклом підписки: active → past_due (пільговий період) → canceled.

## Налаштування для розробки

Запустіть MinistryStuffApi (`yarn dev`, порт 8097; потрібен файл `.env` зі спільним `JWT_SECRET` і `MINISTRYSTUFF_SERVICE_KEY`) і вкажіть той самий сервісний ключ у `Api/.env`. Файл `Api/config/dev.json` уже вказує `ministryStuffApi` на `localhost:8097`. Для MinistryStuffWeb потрібен файл `.env` з `VITE_STAGE=dev`. У режимі розробки використовуються `smsMode: mock` і зберігання на диску, тож AWS не потрібен.
