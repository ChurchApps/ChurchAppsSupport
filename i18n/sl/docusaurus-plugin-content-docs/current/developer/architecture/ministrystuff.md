# MinistryStuff (plačljiva shramba in SMS)

MinistryStuff.org je ločena plačljiva storitev, ki financira dve stvari, ki jih ChurchApps ne more ponuditi brezplačno: obsežno shrambo datotek (1 TB+) in SMS kredite. Oboje je na voljo kot paušalne mesečne naročnine. ChurchApps sam ostaja 100 % brezplačen. Nič v B1 ne zahteva naročnine na MinistryStuff, vsaka integracijska točka pa je vmesnik ponudnika (provider seam), ki ga lahko implementira tudi kateri koli drug ponudnik.

## Sestavni deli

| Sestavni del | Repozitorij | Vloga |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 razvoj) | Obračunavanje (Stripe), pošiljanje SMS-ov in evidenca kreditov (AWS End User Messaging), shramba (S3 + obračunavanje kvote). Ena sama baza MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 razvoj) | ministrystuff.org: trženje, cene in portal za račun (paketi, poraba, preusmeritve na Stripe Checkout/Customer Portal). |
| Ponudnik SMS-ov | `Packages/texting` → `MinistryStuffProvider` | Registriran kot `ministrystuff` poleg Clearstream/TextInChurch. |
| Vmesnik shrambe | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (privzeti, brezplačni) ovije izvirno preklapljanje S3/disk; `FileStorageHelper` ga nespremenjen preusmerja na privzetega ponudnika. |
| Povezava API-ja | `Api/` vsebina + moduli sporočanja | `MinistryStuffStorageProvider` + `StorageResolver` (vsebina), vbrizgavanje servisnega ključa v `TextingConfigHelper` (sporočanje), tabela `storageProviders`, končne točke `/content/storage/*` + `/messaging/texting/credits`. |

## Identiteta in zaupanje

- Isti računi, iste cerkve: MinistryStuffApi preverja JWT-žetone ChurchApps z deljenim `JWT_SECRET` (vzorec sorodnih aplikacij, kot pri B1Transfer). Portal se prijavlja prek MembershipApi in sprejema prenose `?jwt=`.
- Strežnik-strežnik (osnovni Api → MinistryStuffApi): glava `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, na obeh straneh) + izrecen `churchId`. Pravica do storitve se vedno preverja glede na naročnino te cerkve. Cerkve nikoli ne hranijo poverilnic za MinistryStuff. Dovolj je, da v B1Admin izberejo ponudnika.

## Potek pošiljanja SMS-ov

B1Admin Pošlji besedilo → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → število segmentov se odšteje od `smsCreditGrants` tekočega obračunskega obdobja → AWS End User Messaging (ali `smsMode: mock` v razvoju).

Krediti so **trda meja**: ko krediti pošljejo, se pošiljanje v celoti zavrne (`insufficient_credits`, v B1Admin prikazano kot prijazen poziv k nadgradnji). Nikoli ne pride do delnih pošiljanj in nikoli do obračuna presežnih količin.

Dodeljevanje kreditov je idempotentno in poteka za vsako obračunsko obdobje na podlagi webhookov `invoice.paid` iz Stripe. Odjave (`smsOptOuts`) se filtrirajo pred vsakim pošiljanjem.

Do istega vmesnika ponudnika pridejo tudi druge poti, ki ne gredo prek `TextingController`: opozorila ob prijavi (`CheckinController` → `MessagingModuleGateway.sendBulkText`) in korak poteka dela **Pošlji besedilo** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, ki zapiše vrstice v `sentTexts` in `deliveryLogs` z ničelnim pošiljateljem).

Polja za združevanje (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se za vsakega prejemnika razrešijo z `MergeFieldHelper.resolve`, rezultat pa je omejen na 1.600 znakov. V `TextingController` se skupinsko sporočilo, ki vsebuje `{{`, pošlje kot en `sendMessage` na vsakega prejemnika namesto enega `sendBulk`. Sporočilo brez namestitvenih oznak se še vedno pošlje kot eno skupinsko pošiljanje.

## Potek shranjevanja

Vrstica ponudnika cerkve (`content.storageProviders`, upravljana v B1Admin → Settings → File Storage) določa, kam gredo **nove** naložitve. `contentPath` je absolutni URL posamezne datoteke, zato mešani ponudniki sobivajo brez kakršnekoli selitve: stare datoteke se še naprej stregajo iz `content.churchapps.org`, nove pa iz `content.ministrystuff.org`.

Naložitve potekajo: Api → `StorageResolver.forChurch` → ponudnik `store`/`getUploadUrl` (predpodpisan POST z `content-length-range` v načinu S3; nadomestna možnost base64 v načinu disk/razvoj). Brisanja se usmerjajo glede na shranjeni URL (`StorageResolver.forUrl`).

Kvota = bajti paketa, šteti iz `storageObjects` (rezervacije `stored` + `pending`). Ko je kvota presežena, se nove naložitve blokirajo (`storage_quota_exceeded`). Nič se nikoli ne izbriše in nič se ne zaračuna dodatno.

Brezplačna stopnja ChurchApps ostaja nespremenjena (enake omejitve kot prej; brez kvote na ravni cerkve).

Opomba o obsegu: izbira ponudnika zajema potek **datotek/virov** vsebine (kjer so shranjeni obsežni mediji). Naložitve galerije, logotipov in fotografij ostanejo pri privzetem ponudniku. Iz shrambe naštevajo ključe in URL-je gradijo na strani odjemalca, zato usmerjanje po cerkvah še ne velja.

Isti vmesnik poganja tudi [Shrambo z lastnimi ponudniki (Bring-Your-Own Storage)](./byos-storage): cerkve lahko namesto paketa MinistryStuff povežejo Google Drive, Dropbox, OneDrive ali lastno shrambeno vedro, združljivo s S3.

## Obračunavanje

Stripe Checkout (gostovan) se uporablja za naročnino, Stripe Customer Portal pa za posodobitev kartice, preklic in račune. MinistryStuffWeb nima obrazcev za kartice.

Ena vrstica `subscriptions` pripada paru (cerkev, izdelek). Paketi in stopnje so v kodi (`MinistryStuffApi/src/helpers/Plans.ts`), ID-ji cen v Stripe pa so v konfiguraciji.

Webhook (`/billing/webhook`, preverjanje podpisa surovega telesa, odpravljanje podvojitev v `webhookEvents`) vodi življenjski cikel naročnine: aktivna → past_due (odlog) → preklicana.

## Nastavitev za razvoj

Zaženite MinistryStuffApi (`yarn dev`, 8097; potrebuje `.env` z deljenim `JWT_SECRET` in `MINISTRYSTUFF_SERVICE_KEY`) in nastavite isti servisni ključ v `Api/.env`.

`Api/config/dev.json` že kaže `ministryStuffApi` na `localhost:8097`.

MinistryStuffWeb potrebuje `.env` z `VITE_STAGE=dev`.

Razvojno okolje uporablja `smsMode: mock` in shrambo na disku. AWS ni potreben.
