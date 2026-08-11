# MinistryStuff (Paid Storage & Texting)

MinistryStuff.org वह separate paid service है जो दोनों चीजों को fund करती है जो ChurchApps give away नहीं कर सकता — bulk file storage (1TB+) और SMS credits — flat-rate monthly subscriptions के रूप में। ChurchApps स्वयं 100% free रहता है; B1 में कुछ भी MinistryStuff subscription को require नहीं करता है, और हर integration point एक provider seam है जिसे एक third party भी implement कर सकता है।

## Components

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), SMS send + credit ledger (AWS End User Messaging), storage (S3 + quota accounting)। Single MySQL DB `ministrystuff`। |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org — marketing, pricing, और account portal (plans, usage, Stripe Checkout/Customer Portal redirects)। |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Registered as `ministrystuff` alongside Clearstream/TextInChurch। |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, free) wraps original S3/disk switch; `FileStorageHelper` unchanged default provider को delegate करता है। |
| Api wiring | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` service-key injection (messaging), `storageProviders` table, `/content/storage/*` + `/messaging/texting/credits` endpoints। |

## Identity & trust

- Same accounts, same churches: MinistryStuffApi shared `JWT_SECRET` के साथ ChurchApps JWTs को verify करता है (sibling-app pattern, B1Transfer की तरह)। Portal MembershipApi के विरुद्ध login करता है और `?jwt=` hand-offs को accept करता है।
- Server-to-server (core Api → MinistryStuffApi): `X-Service-Key` header (`MINISTRYSTUFF_SERVICE_KEY`, दोनों sides) + explicit `churchId`। Entitlement हमेशा उस church के subscription के विरुद्ध checked है। Churches कभी MinistryStuff credentials को hold नहीं करते — B1Admin में provider को select करना वह सब है जो needed है।

## Texting flow

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → current period के `smsCreditGrants` के विरुद्ध segment count debited → AWS End User Messaging (या dev में `smsMode: mock`)। Credits एक **hard stop** हैं: exhausted credits wholesale को reject करते हैं (`insufficient_credits`, B1Admin में एक friendly upgrade prompt के रूप में surfaced) — कभी partial sends नहीं, कभी overage billing नहीं। Credit grants idempotently issued होते हैं billing period से Stripe `invoice.paid` webhooks से। Opt-outs (`smsOptOuts`) हर send से पहले filtered होते हैं।

## Storage flow

एक church का provider row (`content.storageProviders`, B1Admin → Settings → File Storage में managed) select करता है कहाँ **new** uploads जाते हैं। `contentPath` एक absolute per-file URL है, तो mixed providers coexist करते हैं zero migration के साथ: old files `content.churchapps.org` से serve करते रहते हैं, new ones `content.ministrystuff.org` से। Uploads flow Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (S3 mode में presigned POST जिसमें `content-length-range` हो; disk/dev mode में base64 fallback); deletes stored URL द्वारा route करते हैं (`StorageResolver.forUrl`)। Quota = plan bytes, `storageObjects` से counted (`stored` + `pending` reservations); exceeded quota new uploads को block करता है (`storage_quota_exceeded`) — कुछ भी never deleted या billed extra है। Free ChurchApps tier untouched है (before के जैसे same limits; कोई church-wide quota नहीं)।

Scope note: provider selection content **files/resources** flow को cover करता है (जहाँ bulk media live करता है)। Gallery/logo/photo uploads default provider पर रहते हैं — वे storage से keys list करते हैं और URLs को client-side build करते हैं, तो per-church rooting apply नहीं होता yet।

Same seam [Bring-Your-Own Storage](./byos-storage) को भी power करता है: churches Google Drive, Dropbox, OneDrive, या अपने स्वयं के S3-compatible bucket को link कर सकते हैं MinistryStuff plan के बजाय।

## Billing

Stripe Checkout (hosted) subscribe के लिए, Stripe Customer Portal card update/cancel/invoices के लिए — MinistryStuffWeb के पास कोई card forms नहीं है। One `subscriptions` row per (church, product); plans/tiers code में live करते हैं (`MinistryStuffApi/src/helpers/Plans.ts`) जिसमें config से Stripe price ids। Webhook (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) subscription lifecycle को drives करता है: active → past_due (grace) → canceled।

## Dev setup

MinistryStuffApi run करें (`yarn dev`, 8097; needs `.env` shared `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY` के साथ) और `Api/.env` में same service key set करें। `Api/config/dev.json` पहले से ही `ministryStuffApi` को `localhost:8097` पर point करता है। MinistryStuffWeb को `.env` के साथ `VITE_STAGE=dev` चाहिए। Dev `smsMode: mock` और disk storage का उपयोग करता है — कोई AWS needed नहीं।
