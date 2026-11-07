# MinistryStuff (плаћено складиштење и слање порука)

MinistryStuff.org је посебна плаћена услуга која финансира две ствари које ChurchApps не може да поклони: масовно складиштење датотека (1TB+) и SMS кредите. Оба се naplaćuju као паушалне месечне претплате. ChurchApps сам по себи остаје 100% бесплатан. Ништа у B1 не захтева MinistryStuff претплату, а свака тачка интеграције је провајдерски оквир који би могла да имплементира и нека трећа страна.

## Компоненте

| Део | Репозиторијум | Улога |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Наплата (Stripe), слање SMS порука и евиденција кредита (AWS End User Messaging), складиштење (S3 + обрачун квоте). Јединствена MySQL база `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org: маркетинг, цене и портал за налог (планови, коришћење, преусмеравања на Stripe Checkout и Customer Portal). |
| Провајдер за слање порука | `Packages/texting` → `MinistryStuffProvider` | Регистрован као `ministrystuff` уз Clearstream и TextInChurch. |
| Шав за складиштење | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (подразумевани, бесплатан) омотава оригинални S3/disk прекидач. `FileStorageHelper` прослеђује захтев подразумеваном провајдеру без измена. |
| Повезивање API-ја | Модули `Api/` за садржај и поруке | `MinistryStuffStorageProvider` и `StorageResolver` (садржај), `TextingConfigHelper` за убацивање сервисног кључа (поруке), табела `storageProviders`, крајње тачке `/content/storage/*` и `/messaging/texting/credits`. |

## Идентитет и поверење

- **Исти налози, исте цркве:** MinistryStuffApi проверава ChurchApps JWT токене дељеним `JWT_SECRET`-ом (образац сестринских апликација, као B1Transfer). Портал се пријављује преко MembershipApi и прихвата предају сесије преко `?jwt=`.
- **Сервер-на-сервер (основни Api → MinistryStuffApi):** заглавље `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, на обе стране) и експлицитан `churchId`. Право приступа се увек проверава према претплати те цркве. Цркве никада не чувају MinistryStuff акредитиве. Довољно је изабрати провајдера у B1Admin.

## Ток слања порука

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → број сегмената се одузима од `smsCreditGrants` текућег периода → AWS End User Messaging (или `smsMode: mock` у развоју).

Кредити су **чврсто ограничење**. Када се кредити potroše, цела пошиљка се одбија (`insufficient_credits`, а у B1Admin се приказује пријатељска порука са позивом на надоградњу). Никада нема делимичних слања нити naplate прекорачења. Додела кредита је идемпотентна по периоду наплате и издаје се из Stripe `invoice.paid` webhook-ova. Одјаве (`smsOptOuts`) се филтрирају пре сваког слања.

Остали путеви долазе до истог провајдерског шава без `TextingController`-а: обавештења о пријави (check-in) (`CheckinController` → `MessagingModuleGateway.sendBulkText`) и корак тока рада **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, који уписује редове у `sentTexts` и `deliveryLogs` са празним пошиљаоцем). Поља за спајање (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) за сваког примаоца разрешава `MergeFieldHelper.resolve`, а резултат је ограничен на 1.600 знакова. У `TextingController`-у се групна порука која садржи `{{` шаље као један `sendMessage` по примаоцу, уместо једног `sendBulk`. Порука без поља за попуњавање и даље иде као једно масовно слање.

## Ток складиштења

Ред провајдера цркве (`content.storageProviders`, којим се управља у B1Admin → Settings → File Storage) одређује где иду **нова** отпремања. `contentPath` је апсолутан URL по датотеци, па провајдери могу да коегзистирају без икакве миграције: старе датотеке се и даље послужују са `content.churchapps.org`, а нове са `content.ministrystuff.org`.

Отпремања теку овако: Api → `StorageResolver.forChurch` → провајдер `store` / `getUploadUrl` (потписани POST са `content-length-range` у S3 режиму, base64 резерва у disk/dev режиму). Брисања се усмеравају према сачуваном URL-у (`StorageResolver.forUrl`).

Квота је једнака бајтовима плана и броји се из `storageObjects` (`stored` + `pending` резервације). Прекорачена квота блокира нова отпремања (`storage_quota_exceeded`). Ништа се никада не брише нити naplaćuje додатно. Бесплатни ChurchApps ниво није промењен: иста ограничења као раније, без квоте на нивоу целе цркве.

**Напомена о обиму:** избор провајдера обухвата ток **датотека и ресурса** садржаја, тј. место на којем се чувају велики медији. Отпремања галерије, логотипа и фотографија остају код подразумеваног провајдера. Она листају кључеве из складишта и градe URL-ове на клијенту, па усмеравање по цркви за сада не важи.

Исти шав омогућава и [Сопствено складиште](./byos-storage.md): цркве могу да повежу Google Drive, Dropbox, OneDrive или сопствени S3-компатибилан bucket уместо MinistryStuff плана.

## Наплата

Stripe Checkout (хостован) служи за претплату, а Stripe Customer Portal за ажурирање картице, отказивање и фактуре. MinistryStuffWeb нема обрасце за картице. Постоји по један ред `subscriptions` за сваку комбинацију (црква, производ). Планови и нивои живе у коду (`MinistryStuffApi/src/helpers/Plans.ts`), са Stripe ID-јевима цена из конфигурације. Webhook (`/billing/webhook`, верификација потписа над сировим телом, дедупликација путем `webhookEvents`) покреће животни циклус претплате: active → past_due (грејс период) → canceled.

## Подешавање развојног окружења

Покрените MinistryStuffApi (`yarn dev`, 8097; потребан је `.env` са дељеним `JWT_SECRET` и `MINISTRYSTUFF_SERVICE_KEY`) и поставите исти сервисни кључ у `Api/.env`. `Api/config/dev.json` већ упућује `ministryStuffApi` на `localhost:8097`. MinistryStuffWeb треба `.env` са `VITE_STAGE=dev`. Развој користи `smsMode: mock` и disk складиште, па AWS није потребан.
