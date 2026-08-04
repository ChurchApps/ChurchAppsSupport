# MinistryStuff (Bayad na Storage at Texting)

Ang MinistryStuff.org ay ang hiwalay na bayad na serbisyo na siyang pinagmumulan ng pondo para sa dalawang bagay na hindi kayang ibigay nang libre ng ChurchApps — bulk file storage (1TB+) at SMS credits — bilang flat-rate na buwanang subscription. Nananatiling 100% libre ang ChurchApps mismo; walang anuman sa B1 na nangangailangan ng subscription sa MinistryStuff, at bawat integration point ay isang provider seam na maaari ring ipatupad ng isang third party.

## Mga Bahagi

| Piraso | Repo | Papel |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Billing (Stripe), pagpapadala ng SMS + credit ledger (AWS End User Messaging), storage (S3 + pag-account ng quota). Iisang MySQL DB na `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org — marketing, pagpepresyo, at ang account portal (mga plano, paggamit, mga redirect ng Stripe Checkout/Customer Portal). |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Nakarehistro bilang `ministrystuff` katabi ng Clearstream/TextInChurch. |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, libre) ang bumabalot sa orihinal na S3/disk switch; ipinapasa ng `FileStorageHelper` ang trabaho sa default provider nang walang pagbabago. |
| Api wiring | `Api/` content at messaging modules | `MinistryStuffStorageProvider` + `StorageResolver` (content), pag-inject ng service-key ng `TextingConfigHelper` (messaging), `storageProviders` table, mga endpoint na `/content/storage/*` + `/messaging/texting/credits` |

## Identity at tiwala (trust)

- Parehong account, parehong simbahan: Sinusuri ng MinistryStuffApi ang mga JWT ng ChurchApps gamit ang ibinabahaging `JWT_SECRET` (sibling-app pattern, tulad ng B1Transfer). Naglo-log in ang portal sa MembershipApi at tumatanggap ng mga `?jwt=` na hand-off.
- Server-to-server (core Api → MinistryStuffApi): `X-Service-Key` header (`MINISTRYSTUFF_SERVICE_KEY`, sa magkabilang panig) + tahasang `churchId`. Palaging sinusuri ang entitlement laban sa subscription ng simbahang iyon. Hindi kailanman hawak ng mga simbahan ang mga kredensyal ng MinistryStuff — ang pagpili sa provider sa B1Admin lang ang kailangan.

## Daloy ng texting

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → binabawas ang bilang ng segment laban sa `smsCreditGrants` ng kasalukuyang panahon → AWS End User Messaging (o `smsMode: mock` sa dev). Isang **hard stop** ang mga credit: tinatanggihan nang buo ang naubos na credit (`insufficient_credits`, ipinapakita bilang isang magiliw na prompt para mag-upgrade sa B1Admin) — hindi kailanman partial send, hindi kailanman overage billing. Ipinapadala ang mga credit grant nang idempotent kada billing period mula sa mga webhook ng Stripe `invoice.paid`. Sinasala ang mga opt-out (`smsOptOuts`) bago ang bawat send.

## Daloy ng storage

Ang row ng provider ng isang simbahan (`content.storageProviders`, pinamamahalaan sa B1Admin → Settings → File Storage) ang pumipili kung saan pupunta ang mga **bagong** upload. Isang absolute per-file URL ang `contentPath`, kaya nagsasama-sama ang magkahalong provider nang walang migration: patuloy na naghahatid ang mga lumang file mula sa `content.churchapps.org`, ang mga bago naman mula sa `content.ministrystuff.org`. Dumadaloy ang mga upload sa Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (presigned POST na may `content-length-range` sa S3 mode; base64 fallback sa disk/dev mode); ruruta ang mga delete ayon sa naka-store na URL (`StorageResolver.forUrl`). Quota = bytes ng plano, binibilang mula sa `storageObjects` (mga `stored` + `pending` na reservation); hinaharangan ng lampas na quota ang mga bagong upload (`storage_quota_exceeded`) — walang kailanman binubura o sinisingil nang dagdag. Hindi naaapektuhan ang libreng tier ng ChurchApps (parehong limitasyon tulad noon; walang church-wide na quota).

Tandaan sa saklaw: sinasaklaw ng pagpili ng provider ang daloy ng content **files/resources** (kung saan nakatira ang bulk media). Nananatili sa default provider ang mga upload ng gallery/logo/photo — nagli-list sila ng mga key mula sa storage at gumagawa ng mga URL sa panig ng client, kaya hindi pa ito nasasaklaw ng per-church rooting.

## Billing

Stripe Checkout (hosted) para sa pag-subscribe, Stripe Customer Portal para sa pag-update ng card/pagkansela/mga invoice — walang card form ang MinistryStuffWeb. Isang `subscriptions` row bawat (simbahan, produkto); nasa code ang mga plano/tier (`MinistryStuffApi/src/helpers/Plans.ts`) na may mga Stripe price id mula sa config. Hinihimok ng webhook (`/billing/webhook`, raw-body na pag-verify ng signature, `webhookEvents` dedup) ang lifecycle ng subscription: active → past_due (grace) → canceled.

## Setup para sa dev

Patakbuhin ang MinistryStuffApi (`yarn dev`, 8097; kailangan ng `.env` na may ibinabahaging `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) at itakda ang parehong service key sa `Api/.env`. Itinuturo na ng `Api/config/dev.json` ang `ministryStuffApi` sa `localhost:8097`. Kailangan ng MinistryStuffWeb ng `.env` na may `VITE_STAGE=dev`. Gumagamit ang dev ng `smsMode: mock` at disk storage — walang kailangang AWS.
