# MinistryStuff (fizetős tárhely és SMS-küldés)

A MinistryStuff.org egy külön, fizetős szolgáltatás, amely két dolog fedezetét biztosítja, amelyeket a ChurchApps nem adhat ingyen: a nagy mennyiségű fájltárolást (1 TB felett) és az SMS-krediteket. Mindkettő havi, fix díjas előfizetésként érhető el. A ChurchApps maga továbbra is 100%-ban ingyenes. A B1-ben semmi sem követeli meg a MinistryStuff-előfizetést, és minden integrációs pont olyan szolgáltatói csatlakozási pont, amelyet harmadik fél is megvalósíthat.

## Komponensek

| Komponens | Tároló | Szerep |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (fejlesztési port: 8097) | Számlázás (Stripe), SMS-küldés és kreditnyilvántartás (AWS End User Messaging), tárhely (S3 + kvótanyilvántartás). Egyetlen MySQL-adatbázis: `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (fejlesztési port: 3103) | ministrystuff.org: marketing, árazás és az ügyfélportál (csomagok, használat, átirányítások a Stripe Checkouthoz és az Ügyfélportálhoz). |
| Szöveges üzenetküldő szolgáltató | `Packages/texting` → `MinistryStuffProvider` | `ministrystuff` néven regisztrálva a Clearstream és a TextInChurch mellett. |
| Tárhely-csatlakozási pont | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | A `ChurchAppsStorageProvider` (alapértelmezett, ingyenes) becsomagolja az eredeti S3/lemez-kapcsolót. A `FileStorageHelper` változatlanul az alapértelmezett szolgáltatóra delegál. |
| Api-bekötés | `Api/` tartalmi és üzenetküldő modulok | `MinistryStuffStorageProvider` és `StorageResolver` (tartalom), `TextingConfigHelper` szolgáltatókulcs-beillesztés (üzenetküldés), `storageProviders` tábla, `/content/storage/*` és `/messaging/texting/credits` végpontok. |

## Identitás és bizalom

- Ugyanazok a fiókok, ugyanazok a gyülekezetek: a MinistryStuffApi a közös `JWT_SECRET`-tel ellenőrzi a ChurchApps JWT-ket (testvéralkalmazási minta, mint a B1Transfer esetében). A portál a MembershipApi-val szemben jelentkezik be, és elfogadja a `?jwt=` átadásokat.
- Szerver-szerver kommunikáció (a fő Api → MinistryStuffApi): `X-Service-Key` fejléc (`MINISTRYSTUFF_SERVICE_KEY`, mindkét oldalon) és kifejezett `churchId`. A jogosultságot mindig az adott gyülekezet előfizetésével ellenőrzik. A gyülekezetek sosem rendelkeznek MinistryStuff-hitelesítő adatokkal: elég a szolgáltatót kiválasztani a B1Admin-ban.

## Üzenetküldési folyamat

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → a szegmensszám levonása az aktuális időszak `smsCreditGrants` egyenlegéből → AWS End User Messaging (vagy fejlesztésben `smsMode: mock`).

A kreditek **kemény határt** jelentenek: ha elfogynak, a teljes küldés elutasításra kerül (`insufficient_credits`, a B1Admin-ban barátságos frissítési felszólítás jelenik meg). Részleges küldés sosem történik, és túllépési díjat sem számítunk fel. A kreditjóváírás számlázási időszakonként, idempotens módon történik a Stripe `invoice.paid` webhookjaiból. A leiratkozásokat (`smsOptOuts`) minden küldés előtt kiszűrjük.

Más útvonalak is eljutnak ugyanahhoz a szolgáltatói csatlakozási ponthoz a `TextingController` megkerülésével: a bejelentkezési riasztások (`CheckinController` → `MessagingModuleGateway.sendBulkText`), valamint a munkafolyamat **Send Text** lépésművelete (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, amely `sentTexts` és `deliveryLogs` sorokat ír, null feladóval). Az összevonási mezők (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) címzettenként a `MergeFieldHelper.resolve` segítségével oldódnak fel, az eredmény pedig 1 600 karakterre van korlátozva. A `TextingController`-ben a `{{` jelölést tartalmazó csoportos üzenet címzettenként egy-egy `sendMessage` hívásként megy ki, nem egyetlen `sendBulk` hívásként. A helykitöltő nélküli üzenet továbbra is egyetlen tömeges küldésként távozik.

## Tárhelyfolyamat

Egy gyülekezet szolgáltatói sora (`content.storageProviders`, a B1Admin → Settings → File Storage menüpontban kezelve) határozza meg, hová kerülnek az **új** feltöltések. A `contentPath` fájlonkénti abszolút URL, ezért a vegyes szolgáltatók migráció nélkül együtt élhetnek: a régi fájlok továbbra is a `content.churchapps.org` címről szolgálódnak ki, az újak a `content.ministrystuff.org` címről.

A feltöltések útja: Api → `StorageResolver.forChurch` → szolgáltató `store` / `getUploadUrl` (S3 módban aláírt POST `content-length-range` feltétellel; lemez- és fejlesztői módban base64 tartalék megoldás). A törlések a tárolt URL alapján irányítódnak (`StorageResolver.forUrl`).

A kvóta a csomag bájtmennyisége, amelyet a `storageObjects` tábla számol (`stored` + `pending` foglalások). A túllépett kvóta blokkolja az új feltöltéseket (`storage_quota_exceeded`), de soha nem törlünk és nem számítunk fel extra díjat. A ChurchApps ingyenes szintje érintetlen: ugyanazok a korlátok, mint korábban, gyülekezeti szintű kvóta nélkül.

Hatókör: a szolgáltató kiválasztása a tartalmi **fájlok és erőforrások** folyamatát fedi le, ahol a nagy mennyiségű média található. A galéria-, logó- és fotófeltöltések az alapértelmezett szolgáltatón maradnak. Ezek a tárolóból listázzák a kulcsokat, és az URL-eket kliensoldalon építik fel, ezért a gyülekezetenkénti gyökérkönyvtár-beállítás egyelőre nem alkalmazható rájuk.

Ugyanez a csatlakozási pont működteti a [Saját tárhely (Bring-Your-Own Storage)](./byos-storage.md) funkciót is: a gyülekezetek a MinistryStuff-csomag helyett csatlakoztathatják a Google Drive-ot, a Dropboxot, az OneDrive-ot vagy saját S3-kompatibilis tárolójukat.

## Számlázás

Az előfizetéshez a Stripe Checkout (hostolt) felületét használjuk, a kártyafrissítéshez, lemondáshoz és számlákhoz pedig a Stripe Customer Portal szolgál. A MinistryStuffWeb nem tartalmaz bankkártya-űrlapokat. Gyülekezetenként és termékenként egy `subscriptions` sor létezik. A csomagok és szintek a kódban élnek (`MinistryStuffApi/src/helpers/Plans.ts`), a Stripe-árazási azonosítók pedig a konfigurációból származnak.

A webhook (`/billing/webhook`, a nyers törzs aláírás-ellenőrzésével, a `webhookEvents` táblán keresztül történő duplikáció-szűréssel) vezérli az előfizetés életciklusát: aktív → past_due (türelmi idő) → lemondva.

## Fejlesztői környezet

Indítsa el a MinistryStuffApi-t (`yarn dev`, 8097-es port). Ehhez szükség van egy `.env` fájlra, amely tartalmazza a közös `JWT_SECRET`-et és a `MINISTRYSTUFF_SERVICE_KEY`-t. Állítsa be ugyanezt a szolgáltatókulcsot az `Api/.env` fájlban is. Az `Api/config/dev.json` már a `ministryStuffApi`-t a `localhost:8097` címre mutatja. A MinistryStuffWeb-hez egy `.env` fájl szükséges, benne a `VITE_STAGE=dev` beállítással. Fejlesztésben a `smsMode: mock` és a lemezalapú tárhely használatos, AWS nem szükséges.
