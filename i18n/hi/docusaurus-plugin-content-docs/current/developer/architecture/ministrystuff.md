# MinistryStuff (Paid Storage & Texting)

MinistryStuff.org अलग paid सेवा है जो दो चीजों को fund करता है जो ChurchApps नहीं दे सकता — bulk file storage (1TB+) और SMS credits — flat-rate monthly subscriptions के रूप में। ChurchApps को stay करता है 100% free; B1 में कुछ भी नहीं require करता है एक MinistryStuff subscription, और हर integration point एक provider seam है एक third party भी implement कर सकता है।

## Components

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), SMS send + credit ledger (AWS End User Messaging), storage (S3 + quota accounting)। Single MySQL DB `ministrystuff`। |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org — marketing, pricing, और account portal (plans, usage, Stripe Checkout/Customer Portal redirects)। |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Registered as `ministrystuff` alongside Clearstream/TextInChurch। |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, free) wrap करता है original S3/disk switch; `FileStorageHelper` delegate करता है default provider को unchanged। |
| Api wiring | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` service-key injection (messaging), `storageProviders` table, `/content/storage/*` + `/messaging/texting/credits` endpoints। |

## Identity & trust

- Same accounts, same churches: MinistryStuffApi को verify करता है ChurchApps JWTs shared `JWT_SECRET` के साथ (sibling-app pattern, B1Transfer जैसे)। Portal को log in करता है MembershipApi के विरुद्ध और accept करता है `?jwt=` hand-offs।
- Server-to-server (core Api → MinistryStuffApi): `X-Service-Key` header (`MINISTRYSTUFF_SERVICE_KEY`, दोनों sides) + explicit `churchId`। Entitlement को always check किया जाता है उस church की subscription के विरुद्ध। Churches को कभी MinistryStuff credentials hold नहीं करते — B1Admin में provider को select करना सब कुछ है जो required है।

## Texting flow

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segment count को debit किया जाता है current period के `smsCreditGrants` के विरुद्ध → AWS End User Messaging (या `smsMode: mock` dev में)। Credits एक **hard stop** हैं: exhausted credits को reject करता है wholesale (`insufficient_credits`, surfaced as friendly upgrade prompt in B1Admin) — कभी नहीं partial sends, कभी नहीं overage billing। Credit grants को issue किया जाता है idempotently per billing period से Stripe `invoice.paid` webhooks। Opt-outs (`smsOptOuts`) को filter किया जाता है हर send से पहले।

अन्य paths को reach करते हैं same provider seam बिना जाए `TextingController` के माध्यम से: check-in alerts (`CheckinController` → `MessagingModuleGateway.sendBulkText`) और workflow **Send Text** step action (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, जो write करता है `sentTexts` + `deliveryLogs` rows with null sender)। Merge fields (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) को resolve किया जाता है per recipient by `MergeFieldHelper.resolve` और result को cap किया जाता है 1,600 characters पर। `TextingController` में एक group संदेश containing `{{` को send किया जाता है as एक `sendMessage` per recipient के बजाय एक single `sendBulk`; एक संदेश बिना placeholders को still go out करता है एक bulk send के रूप में।

## Storage flow

एक church का provider row (`content.storageProviders`, B1Admin में managed → Settings → File Storage) को select करता है जहां **new** uploads go। `contentPath` एक absolute per-file URL है, इसलिए mixed providers को coexist करते हैं zero migration के साथ: पुरानी files को keep serving करते हैं `content.churchapps.org` से, नई ones `content.ministrystuff.org` से। Uploads को flow करते हैं Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (S3 mode में presigned POST with `content-length-range` के साथ; disk/dev mode में base64 fallback); deletes को route किया जाता है stored URL द्वारा (`StorageResolver.forUrl`)। Quota = plan bytes, counted from `storageObjects` (`stored` + `pending` reservations); exceeded quota को block नहीं करता है new uploads (`storage_quota_exceeded`) — nothing को ever deleted या billed extra। Free ChurchApps tier को untouched (same limits as before; no church-wide quota)।

Scope note: provider selection को cover करता है content **files/resources** flow (जहां bulk media live)। Gallery/logo/photo uploads को stay करते हैं default provider पर — वे storage से keys को list करते हैं और build करते हैं URLs client-side, इसलिए per-church rooting अभी तक apply नहीं करता है।

Same seam भी power करता है [Bring-Your-Own Storage](./byos-storage): churches को link कर सकते हैं Google Drive, Dropbox, OneDrive, या उनके own S3-compatible bucket एक MinistryStuff plan के बजाय।

## Billing

Stripe Checkout (hosted) subscribe के लिए, Stripe Customer Portal card update/cancel/invoices के लिए — MinistryStuffWeb को कोई card forms नहीं है। एक `subscriptions` row per (church, product); plans/tiers को code में live करते हैं (`MinistryStuffApi/src/helpers/Plans.ts`) config से Stripe price ids के साथ। Webhook (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) को drive करता है subscription lifecycle: active → past_due (grace) → canceled।

## Dev setup

Run करो MinistryStuffApi (`yarn dev`, 8097; needs `.env` shared `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY` के साथ) और set करो same service key in `Api/.env`। `Api/config/dev.json` को already point करता है `ministryStuffApi` को `localhost:8097`। MinistryStuffWeb को need करता है `.env` with `VITE_STAGE=dev`। Dev को use करता है `smsMode: mock` और disk storage — कोई AWS required नहीं।
