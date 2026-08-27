# MinistryStuff (Paid Storage & Texting)

MinistryStuff.org is the separate paid service that funds the two things ChurchApps cannot give away — bulk file storage (1TB+) and SMS credits — as flat-rate monthly subscriptions. ChurchApps itself stays 100% free; nothing in B1 requires a MinistryStuff subscription, and every integration point is a provider seam a third party could also implement.

## Components

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), SMS send + credit ledger (AWS End User Messaging), storage (S3 + quota accounting). Single MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org — marketing, pricing, and the account portal (plans, usage, Stripe Checkout/Customer Portal redirects). |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Registered as `ministrystuff` alongside Clearstream/TextInChurch. |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, free) wraps the original S3/disk switch; `FileStorageHelper` delegates to the default provider unchanged. |
| Api wiring | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` service-key injection (messaging), `storageProviders` table, `/content/storage/*` + `/messaging/texting/credits` endpoints. |

## Identity & trust

- Same accounts, same churches: MinistryStuffApi verifies ChurchApps JWTs with the shared `JWT_SECRET` (sibling-app pattern, like B1Transfer). The portal logs in against MembershipApi and accepts `?jwt=` hand-offs.
- Server-to-server (core Api → MinistryStuffApi): `X-Service-Key` header (`MINISTRYSTUFF_SERVICE_KEY`, both sides) + explicit `churchId`. Entitlement is always checked against that church's subscription. Churches never hold MinistryStuff credentials — selecting the provider in B1Admin is all that's needed.

## Texting flow

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segment count debited against the current period's `smsCreditGrants` → AWS End User Messaging (or `smsMode: mock` in dev). Credits are a **hard stop**: exhausted credits reject wholesale (`insufficient_credits`, surfaced as a friendly upgrade prompt in B1Admin) — never partial sends, never overage billing. Credit grants are issued idempotently per billing period from Stripe `invoice.paid` webhooks. Opt-outs (`smsOptOuts`) are filtered before every send.

## Storage flow

A church's provider row (`content.storageProviders`, managed in B1Admin → Settings → File Storage) selects where **new** uploads go. `contentPath` is an absolute per-file URL, so mixed providers coexist with zero migration: old files keep serving from `content.churchapps.org`, new ones from `content.ministrystuff.org`. Uploads flow Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (presigned POST with `content-length-range` in S3 mode; base64 fallback in disk/dev mode); deletes route by the stored URL (`StorageResolver.forUrl`). Quota = plan bytes, counted from `storageObjects` (`stored` + `pending` reservations); exceeded quota blocks new uploads (`storage_quota_exceeded`) — nothing is ever deleted or billed extra. The free ChurchApps tier is untouched (same limits as before; no church-wide quota).

Scope note: provider selection covers the content **files/resources** flow (where bulk media lives). Gallery/logo/photo uploads stay on the default provider — they list keys from storage and build URLs client-side, so per-church rooting doesn't apply yet.

The same seam also powers [Bring-Your-Own Storage](./byos-storage): churches can link Google Drive, Dropbox, OneDrive, or their own S3-compatible bucket instead of a MinistryStuff plan.

## Billing

Stripe Checkout (hosted) for subscribe, Stripe Customer Portal for card update/cancel/invoices — MinistryStuffWeb has no card forms. One `subscriptions` row per (church, product); plans/tiers live in code (`MinistryStuffApi/src/helpers/Plans.ts`) with Stripe price ids from config. Webhook (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) drives the subscription lifecycle: active → past_due (grace) → canceled.

## Dev setup

Run MinistryStuffApi (`yarn dev`, 8097; needs `.env` with the shared `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) and set the same service key in `Api/.env`. `Api/config/dev.json` already points `ministryStuffApi` at `localhost:8097`. MinistryStuffWeb needs `.env` with `VITE_STAGE=dev`. Dev uses `smsMode: mock` and disk storage — no AWS needed.
