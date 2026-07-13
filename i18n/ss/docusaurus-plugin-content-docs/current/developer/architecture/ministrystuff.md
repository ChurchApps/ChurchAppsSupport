# MinistryStuff (Kugcinwa Lokukhokhelwako Netekutfumela Imilayeto)

MinistryStuff.org yinsita lekhokhelwako lehlukanisiwe lefaka imali endlweni tetintfo letimbili ChurchApps lengeke ikwati kupha mahhala -- kugcinwa lokukhulu kwemafayela (1TB+) ne-credit yema-SMS -- njengekukhokha kwenyanga ngenani lelifanako. ChurchApps ngekwayo ihlala imahhala ngalokuphelele; akukho lutfo ku-B1 loludzinga umbhalisi we-MinistryStuff, futsi yonkhe indzawo yekuhlanganiswa iyindzawo yebahlinzeki lengasetjentiswa nangumunye wangaphandle.

## Tincenye

| Incenye | Repository | Umsebenti |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (i-port 8097 ekuhluleleni) | Kukhokha (Stripe), kutfumela ema-SMS kanye nesibatje se-credit (AWS End User Messaging), kugcinwa (S3 kanye nekubalwa kwesabelo). I-database yinye ye-MySQL lebitwa `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (i-port 3103 ekuhluleleni) | ministrystuff.org -- kutsengiswa, emanani, kanye ne-portal ye-akhawunti (tinhlelo, kusetjentiswa, kutsintselwa ku-Stripe Checkout/Customer Portal). |
| Bahlinzeki bekutfumela imilayeto | `Packages/texting` → `MinistryStuffProvider` | Ibhaliswe njenge-`ministrystuff` kanye ne-Clearstream/TextInChurch. |
| Indzawo yekugcina | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (leyendlalelwe, mahhala) igoqela luketjani lwekucala lwe-S3/disk; `FileStorageHelper` idlulisela kubahlinzeki labendlalelwe ngaphandle kwekushintja. |
| Kuhlanganiswa kwe-Api | Ema-module a-`Api/` a-content ne-messaging | `MinistryStuffStorageProvider` ne-`StorageResolver` (content), kufakwa kwekhiya se-`TextingConfigHelper` (messaging), lithebula le-`storageProviders`, kanye nema-endpoint e-`/content/storage/*` ne-`/messaging/texting/credits`. |

## Kutivela Nekutsembeka

- Ema-akhawunti afanako, emabandla afanako: MinistryStuffApi ihlola ema-JWT e-ChurchApps ngendlela ye-`JWT_SECRET` lebelwanako (indlela lefanako yema-app langakini, njenge-B1Transfer). I-portal ingena ngekutivela ku-MembershipApi futsi yemukela kudluliselwa nge-`?jwt=`.
- Kusuka ku-server kuya ku-server (i-core Api kuya ku-MinistryStuffApi): sihloko se-`X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, kuwo womabili emacala) kanye ne-`churchId` lecacile. Emalungelo ahlala ahlolwa kumelene nombhalisi walelobandla. Emabandla akakaze abambe imininingwane yekungena ye-MinistryStuff -- kukhetsa umhlinzeki ku-B1Admin nguko konkhe lokudzingekako.

## Luketjani Lwekutfumela Imilayeto

B1Admin Tfumela Umlayeto → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → linani lema-segment likhitjwa ku-`smsCreditGrants` yesikhatsi lesikhona → AWS End User Messaging (nome `smsMode: mock` ekuhluleleni). Ema-credit ayi-**sivimbo lesicinile**: ema-credit lasetjentisiwe onkhe ayala ngalokuphelele (`insufficient_credits`, leyivela njengesincomo lesimnandzi sekunyusa ku-B1Admin) -- akukho kutfunyelwa lokungakapheli, futsi akukho kukhokhelwa lokwengetiwe. Kunikwa kwema-credit kwentiwa kanye ngesikhatsi ngasinye sekukhokha kusuka kuma-webhook e-Stripe `invoice.paid`, futsi ngendlela lengeke iphindze. Labo labatikhiphile (`smsOptOuts`) bahlungwa ngembi kwekutfunyelwa konkhe.

## Luketjani Lwekugcina

Umugca webahlinzeki webandla (`content.storageProviders`, lolawulwa ku-B1Admin → Settings → File Storage) ukhetsa lapho kufakwa khona emafayela **lamasha**. `contentPath` yi-URL yefayela ngalinye legcwele, ngako-ke bahlinzeki labehlukene bangahlala ndzawonye ngaphandle kwekutfutfukiswa: emafayela emadzala aciniseka kutfumela kusuka ku-`content.churchapps.org`, lamasha kusuka ku-`content.ministrystuff.org`. Kufaka kuhamba kusuka ku-Api → `StorageResolver.forChurch` → umhlinzeki `store`/`getUploadUrl` (i-presigned POST lene-`content-length-range` endzaweni ye-S3; kubuyela ku-base64 endzaweni ye-disk/dev); kususa kuhamba ngendlela ye-URL legciniwe (`StorageResolver.forUrl`). Isabelo = emabhayithi ohlelo, abalwa kusuka ku-`storageObjects` (`stored` kanye ne`pending` kubekwa eceleni); kweqa isabelo kuvimba kufakwa lokusha (`storage_quota_exceeded`) -- akukho lokususwako nome lokukhokhiswa lokwengetiwe. Lizinga lemahhala le-ChurchApps alishintji (emalungelo afanana naleyakadze; akukho sabelo sebandla lonkhe).

Luphawu: kukhetfwa kwemhlinzeki kugoqela kuphela luketjani lwemafayela/emathulusi e-content (lapho khona kugcinwa khona umfanekiso lomkhulu). Kufaka kwe-gallery/logo/emafotfo kusala ku-provider lolokhu iyindlalelwe -- akhipha emakhiya kusuka ekugcinweni futsi akhe ma-URL ngasekhaya, ngako-ke kucondzisa ngebandla ngalinye akukafinyeleli lapho.

## Kukhokha

Stripe Checkout (lelaliwe) yekubhalisa, Stripe Customer Portal yekushintja likhadi/kukhansela/tinvoyisi -- MinistryStuffWeb ayinawo emafomu emakhadi. Umugca munye we-`subscriptions` ngalinye (libandla, umkhicito); tinhlelo/emazinga ahlala ekhodini (`MinistryStuffApi/src/helpers/Plans.ts`) nema-price id e-Stripe kusuka ekulungiselelweni. I-webhook (`/billing/webhook`, kuhlola sinyatselo se-raw-body, kususwa kwekuphindzaphindza nge-`webhookEvents`) icondzisa imphilo yombhalisi: kusebenta → past_due (sikhatsi sekuphefumula) → kukhanselwa.

## Kulungiselela Kwekusebenta

Sebentisa MinistryStuffApi (`yarn dev`, 8097; kudzingeka i-`.env` lene-`JWT_SECRET` lebelwanako kanye ne-`MINISTRYSTUFF_SERVICE_KEY`) bese ufaka lelokhiya lekusebenta lelifanako ku-`Api/.env`. I-`Api/config/dev.json` seyicondzisa i-`ministryStuffApi` ku-`localhost:8097`. MinistryStuffWeb idzinga i-`.env` lene-`VITE_STAGE=dev`. Kuhlulela kusebentisa `smsMode: mock` nekugcinwa nge-disk -- akudzingeki i-AWS.
