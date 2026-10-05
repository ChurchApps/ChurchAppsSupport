# MinistryStuff (платное хранилище и текстовые сообщения)

MinistryStuff.org это отдельный платный сервис что финансирует две вещи ChurchApps не может раздать бесплатно — bulk file storage (1TB+) и SMS credits — как flat-rate monthly subscriptions. ChurchApps itself остается 100% free; nothing в B1 requires MinistryStuff subscription, и каждый integration point это provider seam third party также может implement.

## Components

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), SMS send + credit ledger (AWS End User Messaging), storage (S3 + quota accounting). Single MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org — marketing, pricing, и account portal (plans, usage, Stripe Checkout/Customer Portal redirects). |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Registered как `ministrystuff` alongside Clearstream/TextInChurch. |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, free) wraps original S3/disk switch; `FileStorageHelper` delegates к default provider unchanged. |
| Api wiring | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` service-key injection (messaging), `storageProviders` table, `/content/storage/*` + `/messaging/texting/credits` endpoints. |

## Identity & trust

- Same accounts, same churches: MinistryStuffApi verifies ChurchApps JWTs с shared `JWT_SECRET` (sibling-app pattern, как B1Transfer). Portal logs in против MembershipApi и accepts `?jwt=` hand-offs.
- Server-to-server (core Api → MinistryStuffApi): `X-Service-Key` header (`MINISTRYSTUFF_SERVICE_KEY`, both sides) + explicit `churchId`. Entitlement это always checked против that church's subscription. Churches никогда не hold MinistryStuff credentials — selecting provider в B1Admin это all что's needed.

## Texting flow

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segment count debited против current period's `smsCreditGrants` → AWS End User Messaging (или `smsMode: mock` в dev). Credits это **hard stop**: exhausted credits reject wholesale (`insufficient_credits`, surfaced как friendly upgrade prompt в B1Admin) — никогда partial sends, никогда overage billing. Credit grants это issued idempotently per billing period из Stripe `invoice.paid` webhooks. Opt-outs (`smsOptOuts`) это filtered перед every send.

Other paths reach same provider seam без going через `TextingController`: check-in alerts (`CheckinController` → `MessagingModuleGateway.sendBulkText`) и workflow **Send Text** step action (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, что writes `sentTexts` + `deliveryLogs` rows с null sender). Merge fields (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) это resolved per recipient by `MergeFieldHelper.resolve` и result это capped в 1,600 characters. In `TextingController` group message containing `{{` это sent как one `sendMessage` per recipient вместо single `sendBulk`; message без placeholders still goes out как one bulk send.

## Storage flow

Church's provider row (`content.storageProviders`, managed в B1Admin → Settings → File Storage) selects where **new** uploads go. `contentPath` это absolute per-file URL, поэтому mixed providers coexist с zero migration: old files keep serving из `content.churchapps.org`, new ones из `content.ministrystuff.org`. Uploads flow Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (presigned POST с `content-length-range` в S3 mode; base64 fallback в disk/dev mode); deletes route by stored URL (`StorageResolver.forUrl`). Quota = plan bytes, counted из `storageObjects` (`stored` + `pending` reservations); exceeded quota blocks new uploads (`storage_quota_exceeded`) — nothing это ever deleted или billed extra. Free ChurchApps tier это untouched (same limits как before; no church-wide quota).

Scope note: provider selection covers **files/resources** flow (где bulk media lives). Gallery/logo/photo uploads stay на default provider — they list keys из storage и build URLs client-side, поэтому per-church rooting не applies yet.

Same seam также powers [Bring-Your-Own Storage](./byos-storage): churches могут link Google Drive, Dropbox, OneDrive, или their own S3-compatible bucket вместо MinistryStuff plan.

## Billing

Stripe Checkout (hosted) для subscribe, Stripe Customer Portal для card update/cancel/invoices — MinistryStuffWeb has no card forms. One `subscriptions` row per (church, product); plans/tiers live в code (`MinistryStuffApi/src/helpers/Plans.ts`) с Stripe price ids из config. Webhook (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) drives subscription lifecycle: active → past_due (grace) → canceled.

## Dev setup

Run MinistryStuffApi (`yarn dev`, 8097; needs `.env` с shared `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) и set same service key в `Api/.env`. `Api/config/dev.json` already points `ministryStuffApi` в `localhost:8097`. MinistryStuffWeb needs `.env` с `VITE_STAGE=dev`. Dev uses `smsMode: mock` и disk storage — no AWS needed.
