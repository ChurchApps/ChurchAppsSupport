# MinistryStuff (Bayad na Storage at Texting)

Ang MinistryStuff.org ay ang hiwalay na bayad na serbisyo na nagpopondo sa dalawang bagay na hindi kayang ibigay nang libre ng ChurchApps -- bulk na storage ng file (1TB+) at mga SMS credit -- bilang mga buwanang subscription na may fixed na presyo. Ang ChurchApps mismo ay nananatiling 100% libre; walang anumang bagay sa B1 na nangangailangan ng subscription sa MinistryStuff, at ang bawat punto ng integrasyon ay isang provider seam na maaari ring ipatupad ng third party.

## Mga Bahagi

| Bahagi | Repo | Papel |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 sa dev) | Billing (Stripe), pagpapadala ng SMS + credit ledger (AWS End User Messaging), storage (S3 + accounting ng quota). Iisang MySQL DB na `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 sa dev) | ministrystuff.org -- marketing, pricing, at ang account portal (mga plano, paggamit, mga redirect sa Stripe Checkout/Customer Portal). |
| Texting provider | `Packages/texting` → `MinistryStuffProvider` | Nakarehistro bilang `ministrystuff` kasama ng Clearstream/TextInChurch. |
| Storage seam | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | Ang `ChurchAppsStorageProvider` (default, libre) ay bumabalot sa orihinal na S3/disk switch; ang `FileStorageHelper` ay nagdedelegate sa default na provider nang walang pagbabago. |
| Api wiring | Mga content + messaging module ng `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (content), pag-inject ng service-key ng `TextingConfigHelper` (messaging), table na `storageProviders`, mga endpoint na `/content/storage/*` + `/messaging/texting/credits`. |

## Pagkakakilanlan at tiwala

- Parehong account, parehong simbahan: bine-beripika ng MinistryStuffApi ang mga JWT ng ChurchApps gamit ang nakabahaging `JWT_SECRET` (sibling-app pattern, gaya ng B1Transfer). Ang portal ay nagla-log in laban sa MembershipApi at tumatanggap ng mga hand-off na `?jwt=`.
- Server-to-server (core Api → MinistryStuffApi): header na `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, sa magkabilang panig) + tahasang `churchId`. Ang entitlement ay laging sinusuri laban sa subscription ng simbahang iyon. Ang mga simbahan ay hindi kailanman may hawak ng mga credential ng MinistryStuff -- ang pagpili ng provider sa B1Admin ang tanging kailangan.

## Daloy ng texting

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → ang bilang ng segment ay ibinabawas sa `smsCreditGrants` ng kasalukuyang period → AWS End User Messaging (o `smsMode: mock` sa dev). Ang mga credit ay **hard stop**: kapag naubos ang mga credit, buong tatanggihan ang padala (`insufficient_credits`, ipinapakita bilang magiliw na paalala sa pag-upgrade sa B1Admin) -- hindi kailanman bahagyang padala, hindi kailanman overage billing. Ang mga credit grant ay ibinibigay nang idempotent bawat billing period mula sa mga webhook ng Stripe na `invoice.paid`. Ang mga opt-out (`smsOptOuts`) ay sinasala bago ang bawat padala.

May iba pang landas na umaabot sa parehong provider seam nang hindi dumadaan sa `TextingController`: mga check-in alert (`CheckinController` → `MessagingModuleGateway.sendBulkText`) at ang aksyong **Send Text** ng workflow step (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, na nagsusulat ng mga row ng `sentTexts` + `deliveryLogs` na may null na sender). Ang mga merge field (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ay nireresolba bawat tatanggap ng `MergeFieldHelper.resolve` at ang resulta ay nililimitahan sa 1,600 karakter. Sa `TextingController`, ang mensahe sa grupo na may `{{` ay ipinapadala bilang isang `sendMessage` bawat tatanggap sa halip na iisang `sendBulk`; ang mensaheng walang placeholder ay lumalabas pa rin bilang isang bulk send.

## Daloy ng storage

Ang provider row ng isang simbahan (`content.storageProviders`, pinamamahalaan sa B1Admin → Settings → File Storage) ang pumipili kung saan pupunta ang mga **bagong** upload. Ang `contentPath` ay absolute na URL bawat file, kaya ang magkahalong provider ay magkakasamang umiiral nang walang migration: ang mga lumang file ay patuloy na sineserbisyo mula sa `content.churchapps.org`, ang mga bago mula sa `content.ministrystuff.org`. Ang mga upload ay dumadaloy mula Api → `StorageResolver.forChurch` → provider `store`/`getUploadUrl` (presigned POST na may `content-length-range` sa S3 mode; base64 fallback sa disk/dev mode); ang mga pagbura ay nagrurunta ayon sa naka-store na URL (`StorageResolver.forUrl`). Ang quota = bytes ng plano, binibilang mula sa `storageObjects` (`stored` + `pending` na reserbasyon); ang lampas na quota ay humaharang sa mga bagong upload (`storage_quota_exceeded`) -- walang kailanman binubura o sinisingil nang dagdag. Ang libreng tier ng ChurchApps ay hindi ginagalaw (parehong mga limitasyon gaya ng dati; walang quota para sa buong simbahan).

Tala sa saklaw: ang pagpili ng provider ay sumasaklaw sa daloy ng mga **file/resource** ng content (kung saan nakatira ang bulk na media). Ang mga upload ng gallery/logo/larawan ay nananatili sa default na provider -- naglilista sila ng mga key mula sa storage at bumubuo ng mga URL sa panig ng client, kaya hindi pa naaangkop ang per-church na rooting.

Ang parehong seam ang nagpapagana rin sa [Bring-Your-Own Storage](./byos-storage): maaaring i-link ng mga simbahan ang Google Drive, Dropbox, OneDrive, o ang sarili nilang S3-compatible na bucket sa halip na plano ng MinistryStuff.

## Billing

Stripe Checkout (hosted) para sa pag-subscribe, Stripe Customer Portal para sa pag-update ng card/pagkansela/mga invoice -- ang MinistryStuffWeb ay walang mga card form. Isang row ng `subscriptions` bawat (simbahan, produkto); ang mga plano/tier ay nasa code (`MinistryStuffApi/src/helpers/Plans.ts`) na may mga Stripe price id mula sa config. Ang webhook (`/billing/webhook`, raw-body signature verification, `webhookEvents` dedup) ang nagtutulak sa lifecycle ng subscription: active → past_due (grace) → canceled.

## Dev setup

Patakbuhin ang MinistryStuffApi (`yarn dev`, 8097; kailangan ng `.env` na may nakabahaging `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) at itakda ang parehong service key sa `Api/.env`. Ang `Api/config/dev.json` ay nakaturo na ang `ministryStuffApi` sa `localhost:8097`. Ang MinistryStuffWeb ay nangangailangan ng `.env` na may `VITE_STAGE=dev`. Ang dev ay gumagamit ng `smsMode: mock` at disk storage -- hindi kailangan ng AWS.
