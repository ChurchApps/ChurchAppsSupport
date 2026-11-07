# MinistryStuff (mokama saugykla ir SMS)

MinistryStuff.org yra atskira mokama paslauga, kuri finansuoja tai, ko ChurchApps negali suteikti nemokamai: didelės apimties failų saugyklą (1 TB ir daugiau) ir SMS kreditus. Abu parduodami kaip fiksuoto mėnesinio mokesčio prenumeratos. ChurchApps pati lieka 100 % nemokama. Jokiai B1 funkcijai nereikia MinistryStuff prenumeratos, o kiekvienas integracijos taškas yra paslaugų sąsaja (provider seam), kurią galėtų įgyvendinti ir trečioji šalis.

## Komponentai

| Dalis | Repozitorija | Vaidmuo |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (kūrimo prievadas 8097) | Atsiskaitymas (Stripe), SMS siuntimas ir kreditų apskaita (AWS End User Messaging), saugykla (S3 ir kvotų apskaita). Viena MySQL duomenų bazė `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (kūrimo prievadas 3103) | ministrystuff.org: rinkodara, kainos ir paskyros portalas (planai, naudojimas, nukreipimai į Stripe Checkout ir Customer Portal). |
| Teksto žinučių tiekėjas | `Packages/texting` → `MinistryStuffProvider` | Registruotas kaip `ministrystuff` kartu su Clearstream ir TextInChurch. |
| Saugyklos sąsaja | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (numatytasis, nemokamas) apgaubia pradinį S3 ir disko perjungiklį. `FileStorageHelper` užklausas perduoda numatytajam tiekėjui nepakeistas. |
| Api sujungimas | `Api/` turinio ir pranešimų moduliai | `MinistryStuffStorageProvider` ir `StorageResolver` (turinys), `TextingConfigHelper` servisinio rakto įterpimas (pranešimai), `storageProviders` lentelė, `/content/storage/*` ir `/messaging/texting/credits` galiniai taškai. |

## Tapatybė ir pasitikėjimas

- Tos pačios paskyros, tos pačios bažnyčios: MinistryStuffApi tikrina ChurchApps JWT naudodama bendrą `JWT_SECRET` (tas pats principas, kaip ir B1Transfer atveju, kai kitos programos naudoja tą patį sesijos mechanizmą). Portalas prisijungia per MembershipApi ir priima `?jwt=` perdavimus.
- Serveris su serveriu (pagrindinis Api → MinistryStuffApi): antraštė `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, abiejose pusėse) ir aiškus `churchId`. Teisė naudotis visada tikrinama pagal tos bažnyčios prenumeratą. Bažnyčios niekada neturi MinistryStuff prisijungimo duomenų. Pakanka B1Admin pasirinkti tiekėją.

## Teksto žinučių eiga

B1Admin „Send Text“ → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segmentų skaičius nurašomas nuo einamojo laikotarpio `smsCreditGrants` → AWS End User Messaging (arba `smsMode: mock` kūrimo aplinkoje). Kreditai yra **griežta riba**: pasibaigus kreditams, visa siunta atmetama (`insufficient_credits`, B1Admin rodomas draugiškas raginimas atnaujinti planą). Dalinių siuntų nebūna, viršijimo mokesčių taip pat. Kreditai suteikiami idempotentiškai kiekvienam atsiskaitymo laikotarpiui pagal Stripe `invoice.paid` webhook įvykius. Atsisakiusieji (`smsOptOuts`) filtruojami prieš kiekvieną siuntimą.

Kiti keliai pasiekia tą pačią tiekėjo sąsają, nepraeidami per `TextingController`: patikrinimo įspėjimai (`CheckinController` → `MessagingModuleGateway.sendBulkText`) ir darbo eigos veiksmas **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, kuris įrašo `sentTexts` ir `deliveryLogs` eilutes su tuščiu siuntėju). Sujungimo laukai (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) kiekvienam gavėjui išsprendžiami per `MergeFieldHelper.resolve`, o rezultatas apribojamas 1 600 simbolių. `TextingController` žinutė, kurioje yra `{{`, siunčiama kaip atskiras `sendMessage` kiekvienam gavėjui, o ne vienu `sendBulk`. Žinutė be vietos žymeklių vis tiek išsiunčiama vienu masiniu siuntimu.

## Saugyklos eiga

Bažnyčios tiekėjo įrašas (`content.storageProviders`, valdomas B1Admin → Settings → File Storage) nusako, kur keliami **nauji** failai. `contentPath` yra absoliutus kiekvieno failo URL, todėl skirtingi tiekėjai sugyvena be jokios migracijos: seni failai toliau pasiekiami iš `content.churchapps.org`, o nauji iš `content.ministrystuff.org`. Įkėlimai eina Api → `StorageResolver.forChurch` → tiekėjo `store`/`getUploadUrl` (presigned POST su `content-length-range` S3 režime; base64 atsarginis variantas disko ir kūrimo režime). Trynimai nukreipiami pagal saugomą URL (`StorageResolver.forUrl`). Kvota lygi plano baitams, skaičiuojamiems iš `storageObjects` (`stored` ir `pending` rezervacijos). Viršijus kvotą, nauji įkėlimai blokuojami (`storage_quota_exceeded`). Niekas niekada neištrinama ir papildomai neapmokestinama. Nemokama ChurchApps pakopa nepakitusi: limitai tokie patys kaip anksčiau, bendros bažnyčios kvotos nėra.

Taikymo apimtis: tiekėjo pasirinkimas apima tik turinio **failų ir išteklių** srautą, kuriame laikoma didelės apimties medija. Galerijos, logotipų ir nuotraukų įkėlimai lieka numatytajame tiekėjuje, nes jie išvardija raktus iš saugyklos ir URL sudaro kliento pusėje. Todėl bažnyčiai priskirta šaknis dar netaikoma.

Ta pati sąsaja taip pat palaiko [Naudok savo saugyklą](./byos-storage.md) funkciją: bažnyčios gali susieti Google Drive, Dropbox, OneDrive arba savo S3 suderinamą saugyklą vietoj MinistryStuff plano.

## Atsiskaitymas

Prenumeratai naudojamas Stripe Checkout (hostinamas), o kortelės atnaujinimui, atsisakymui ir sąskaitoms naudojamas Stripe Customer Portal. MinistryStuffWeb kortelių formų neturi. Kiekvienai porai (bažnyčia, produktas) yra vienas `subscriptions` įrašas. Planai ir pakopos apibrėžti kode (`MinistryStuffApi/src/helpers/Plans.ts`), o Stripe kainų ID paimami iš konfigūracijos. Webhook (`/billing/webhook`, su neapdorotos užklausos turinio parašo tikrinimu ir `webhookEvents` dublikatų šalinimu) valdo prenumeratos ciklą: active → past_due (malonės laikotarpis) → canceled.

## Kūrimo aplinkos paruošimas

Paleiskite MinistryStuffApi (`yarn dev`, 8097). Reikia `.env` failo su bendru `JWT_SECRET` ir `MINISTRYSTUFF_SERVICE_KEY`. `Api/.env` nustatykite tą patį servisinį raktą. `Api/config/dev.json` jau nukreipia `ministryStuffApi` į `localhost:8097`. MinistryStuffWeb reikia `.env` failo su `VITE_STAGE=dev`. Kūrimo aplinkoje naudojami `smsMode: mock` ir diskinė saugykla, todėl AWS nereikia.
