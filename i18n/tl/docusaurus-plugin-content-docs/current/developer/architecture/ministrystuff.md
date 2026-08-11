# MinistryStuff (Binayaran na Storage & Texting)

Ang MinistryStuff.org ay ang hiwalay na binayaran na serbisyo na nagpopondo sa dalawang bagay na ChurchApps ay hindi maaaring ibigay -- bulk file storage (1TB+) at SMS credits -- bilang flat-rate monthly subscriptions. Ang ChurchApps mismo ay manatili 100% libre; walang sa B1 ay nangangailangan ng subscription ng MinistryStuff, at bawat integration point ay isang provider seam na isang third party ay maaaring ipatupad din.

## Mga Bahagi

| Piece | Repo | Role |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), SMS send + credit ledger (AWS End User Messaging), storage (S3 + quota accounting). Iisang MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org -- marketing, pricing, at ang account portal (plans, usage, Stripe Checkout/Customer Portal redirects). |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Registered bilang `ministrystuff` sa tabi ng Clearstream/TextInChurch. |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, libre) ay tumutulong sa original na S3/disk switch; ang `FileStorageHelper` ay nag-delegate sa default provider nang hindi nabago. |
| Api wiring | `Api/` content + messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper` service-key injection (messaging), `storageProviders` table, `/content/storage/*` + `/messaging/texting/credits` endpoints. |

## Pagkakakilanlan & Tiwala

- Parehong mga account, parehong mga simbahan: Ang MinistryStuffApi ay nagpapatunay ng ChurchApps JWTs na may shared `JWT_SECRET` (sibling-app pattern, tulad ng B1Transfer). Ang portal ay nag-login laban sa MembershipApi at tumatanggap ng `?jwt=` hand-offs.
- Server-to-server (core Api → MinistryStuffApi): `X-Service-Key` header (`MINISTRYSTUFF_SERVICE_KEY`, parehong panig) + explicit `churchId`. Ang entitlement ay palaging sinusuri laban sa subscription ng simbahan na iyon. Ang mga simbahan ay hindi kailanman may MinistryStuff credentials -- ang pagpili ng provider sa B1Admin ay lahat na kailangan.

## Texting flow

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segment count debited laban sa kasalukuyang panahon `smsCreditGrants` → AWS End User Messaging (o `smsMode: mock` sa dev). Ang mga credit ay isang **hard stop**: exhausted credits ay tumatanggi ng wholesale (`insufficient_credits`, ibabahagi bilang isang friendly upgrade prompt sa B1Admin) -- hindi kailanman partial sends, hindi kailanman overage billing. Ang credit grants ay inilabas nang idempotent bawat billing period mula sa Stripe `invoice.paid` webhooks. Ang mga opt-outs (`smsOptOuts`) ay nafi-filter bago ang bawat send.

## Storage flow

Ang row ng provider ng simbahan (`content.storageProviders`, pina-manage sa B1Admin → Mga Ayos → File Storage) ay pumipili kung saan ang **mga bagong** upload ay napupunta. Ang `contentPath` ay isang absolute per-file URL, kaya ang mga mixed provider ay umiiral nang walang migration: ang mga lumang file ay patuloy na naghahatid mula `content.churchapps.org`, mga bago mula `content.ministrystuff.org`. Ang mga upload ay dumadaloy Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (presigned POST na may `content-length-range` sa S3 mode; base64 fallback sa disk/dev mode); ang mga bura ay route sa stored URL (`StorageResolver.forUrl`). Ang Quota = plan bytes, binibilang mula sa `storageObjects` (`stored` + `pending` reservations); ang lampas na quota ay nag-block ng mga bagong upload (`storage_quota_exceeded`) -- walang kailanman na tinanggal o bago ang bill. Ang libre ChurchApps tier ay hindi nabago (parehong mga hangganan tulad ng dati; walang quota ng buong simbahan).

Ang nota ng saklaw: ang pagpili ng provider ay sumasaklaw sa nilalaman **files/resources** flow (kung saan ang bulk media ay buhay). Ang Gallery/logo/photo uploads ay manatili sa default provider -- sila ay naglalista ng mga key mula sa storage at bumuo ng mga URL ng kliyente-panig, kaya ang per-church rooting ay hindi naaangkop pa.

Ang parehong seam ay nagpapalakas din ng [Bring-Your-Own Storage](./byos-storage): ang mga simbahan ay maaaring mag-link ng Google Drive, Dropbox, OneDrive, o ang kanilang sariling S3-compatible bucket sa halip na isang MinistryStuff plan.

## Pagbabayad

Ang Stripe Checkout (hosted) para sa subscribe, Stripe Customer Portal para sa card update/cancel/invoices -- ang MinistryStuffWeb ay walang card forms. Isa `subscriptions` row bawat (simbahan, produkto); ang mga plano/tier ay buhay sa code (`MinistryStuffApi/src/helpers/Plans.ts`) na may mga Stripe price ids mula sa config. Ang Webhook (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) ay gumagabay sa subscription lifecycle: active → past_due (grace) → canceled.

## Dev setup

Patakbuhin ang MinistryStuffApi (`yarn dev`, 8097; kailangan `.env` na may shared `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) at itakda ang parehong service key sa `Api/.env`. Ang `Api/config/dev.json` ay nakatutok na sa `ministryStuffApi` sa `localhost:8097`. Ang MinistryStuffWeb ay kailangan `.env` na may `VITE_STAGE=dev`. Ang dev ay gumagamit ng `smsMode: mock` at disk storage -- walang AWS kailangan.
