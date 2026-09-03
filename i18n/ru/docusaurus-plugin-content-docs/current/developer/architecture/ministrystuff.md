---
title: "MinistryStuff (оплачиваемое хранилище и текстирование)"
---

# MinistryStuff (оплачиваемое хранилище и текстирование)

MinistryStuff.org - это отдельная платная услуга, которая финансирует две вещи, которые ChurchApps не может раздать -- массовое хранилище файлов (1TB+) и кредиты SMS -- как плоскую подписку в месяц. ChurchApps сам остается 100% бесплатным; ничего в B1 не требует подписки MinistryStuff, и каждая точка интеграции - это провайдер шов, который третья сторона также могла бы реализовать.

## Components

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), SMS send + credit ledger (AWS End User Messaging), storage (S3 + quota accounting). Single MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org -- маркетинг, цены и портал учетной записи (планы, использование, перенаправления Stripe Checkout/Customer Portal). |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Зарегистрирован как `ministrystuff` рядом с Clearstream/TextInChurch. |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, free) оборачивает оригинальный S3/disk switch; `FileStorageHelper` делегирует поставщику по умолчанию без изменений. |
| Api wiring | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` service-key injection (messaging), `storageProviders` table, `/content/storage/*` + `/messaging/texting/credits` endpoints. |

## Identity & trust

- Те же учетные записи, те же церкви: MinistryStuffApi проверяет ChurchApps JWT с общим `JWT_SECRET` (sibling-app pattern, как B1Transfer). Портал входит против MembershipApi и принимает ручные переводы `?jwt=`.
- Server-to-server (core Api → MinistryStuffApi): заголовок `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, обе стороны) + явное `churchId`. Право всегда проверяется против подписки церкви. Церкви никогда не держат учетные данные MinistryStuff -- выбор поставщика в B1Admin - это все, что требуется.

## Texting flow
