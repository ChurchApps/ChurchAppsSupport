# MinistryStuff (platené úložisko a SMS)

MinistryStuff.org je samostatná platená služba, ktorá financuje dve veci, ktoré ChurchApps nemôže poskytovať zadarmo: hromadné ukladanie súborov (1 TB a viac) a SMS kredity. Obe sú dostupné ako paušálne mesačné predplatné. ChurchApps zostáva na 100 % bezplatný. Nič v B1 nevyžaduje predplatné MinistryStuff a každé integračné miesto je rozhranie poskytovateľa (provider seam), ktoré by mohla implementovať aj tretia strana.

## Komponenty

| Časť | Repozitár | Úloha |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 vo vývoji) | Fakturácia (Stripe), odosielanie SMS a evidencia kreditov (AWS End User Messaging), úložisko (S3 + účtovanie kvót). Jediná databáza MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 vo vývoji) | ministrystuff.org: marketing, cenník a portál účtu (plány, využitie, presmerovania na Stripe Checkout a Customer Portal). |
| Poskytovateľ SMS | `Packages/texting` → `MinistryStuffProvider` | Registrovaný ako `ministrystuff` spolu s Clearstream a TextInChurch. |
| Rozhranie úložiska | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predvolený, bezplatný) obaľuje pôvodný prepínač S3/disk. `FileStorageHelper` deleguje na predvoleného poskytovateľa bez zmeny. |
| Prepojenie Api | `Api/` obsah + moduly správ | `MinistryStuffStorageProvider` + `StorageResolver` (obsah), vkladanie servisného kľúča v `TextingConfigHelper` (správy), tabuľka `storageProviders`, koncové body `/content/storage/*` a `/messaging/texting/credits`. |

## Identita a dôvera

- Rovnaké účty, rovnaké cirkvi: MinistryStuffApi overuje JWT tokeny ChurchApps pomocou zdieľaného `JWT_SECRET` (vzor sesterskej aplikácie, ako B1Transfer). Portál sa prihlasuje cez MembershipApi a prijíma odovzdania `?jwt=`.
- Komunikácia medzi servermi (základné Api → MinistryStuffApi): hlavička `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, na oboch stranách) a explicitné `churchId`. Oprávnenie sa vždy overuje voči predplatnému danej cirkvi. Cirkvi nikdy nedržia prihlasovacie údaje MinistryStuff. Stačí vybrať poskytovateľa v B1Admin.

## Tok SMS správ

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → počet segmentov sa odpočíta z `smsCreditGrants` aktuálneho fakturačného obdobia → AWS End User Messaging (alebo `smsMode: mock` vo vývoji).

Kredity sú **tvrdé obmedzenie**: ak sú vyčerpané, celá požiadavka sa odmietne (`insufficient_credits`). V B1Admin sa zobrazí priateľská výzva na upgrade. Nikdy neprebehne čiastočné odoslanie ani účtovanie nad limit. Granty kreditov sa vydávajú idempotentne pre každé fakturačné obdobie z webhookov Stripe `invoice.paid`. Odhlásenia (`smsOptOuts`) sa filtrujú pred každým odoslaním.

Ostatné cesty sa dostanú k rovnakému rozhraniu poskytovateľa bez prechodu cez `TextingController`: upozornenia pri check-ine (`CheckinController` → `MessagingModuleGateway.sendBulkText`) a akcia pracovného postupu **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`), ktorá zapisuje riadky do `sentTexts` a `deliveryLogs` s prázdnym odosielateľom. Polia na zlučovanie (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sa pre každého príjemcu vyhodnocujú pomocou `MergeFieldHelper.resolve` a výsledok je obmedzený na 1 600 znakov. V `TextingController` sa skupinová správa obsahujúca `{{` odosiela ako jedno `sendMessage` pre každého príjemcu namiesto jedného `sendBulk`. Správa bez zástupných polí ide stále ako jedno hromadné odoslanie.

## Tok úložiska

Poskytovateľ úložiska danej cirkvi (riadok v `content.storageProviders`, spravovaný v B1Admin → Settings → File Storage) určuje, kam sa ukladajú **nové** nahrávania. `contentPath` je absolútna URL jednotlivého súboru, takže zmiešaní poskytovatelia koexistujú bez akejkoľvek migrácie: staré súbory sa naďalej poskytujú z `content.churchapps.org` a nové z `content.ministrystuff.org`. Nahrávania prechádzajú cestou Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` poskytovateľa (podpísaný presigned POST s `content-length-range` v režime S3; záložný base64 v režime disk/dev). Mazanie sa smeruje podľa uloženej URL (`StorageResolver.forUrl`).

Kvóta = bajty plánu, počítané z `storageObjects` (`stored` + rezervácie `pending`). Po prekročení kvóty sú nové nahrávania zablokované (`storage_quota_exceeded`). Nič sa nikdy nemaže ani neúčtuje navyše. Bezplatná úroveň ChurchApps zostáva nedotknutá: rovnaké limity ako predtým, žiadna kvóta na úrovni cirkvi.

Poznámka k rozsahu: výber poskytovateľa pokrýva tok **súborov a zdrojov** obsahu, teda miesto, kde sa ukladajú hromadné médiá. Nahrávania galérie, log a fotografií zostávajú u predvoleného poskytovateľa. Vypisujú kľúče zo úložiska a URL zostavujú na strane klienta, takže zakorenenie podľa cirkvi sa na ne zatiaľ nevzťahuje.

Rovnaký mechanizmus umožňuje aj [Vlastné úložisko (Bring-Your-Own Storage)](./byos-storage.md): cirkvi môžu namiesto plánu MinistryStuff prepojiť Disk Google, Dropbox, OneDrive alebo vlastný bucket kompatibilný s S3.

## Fakturácia

Stripe Checkout (hostovaný) slúži na predplatné a Stripe Customer Portal na zmenu karty, zrušenie a faktúry. MinistryStuffWeb nemá žiadne formuláre na platobné karty. Jeden riadok `subscriptions` pripadá na dvojicu (cirkev, produkt). Plány a úrovne sú v kóde (`MinistryStuffApi/src/helpers/Plans.ts`) s ID cien Stripe z konfigurácie. Webhook (`/billing/webhook`, overenie podpisu nad surovým telom, deduplikácia cez `webhookEvents`) riadi životný cyklus predplatného: active → past_due (ochranné obdobie) → canceled.

## Nastavenie vývojového prostredia

Spustite MinistryStuffApi (`yarn dev`, port 8097; potrebuje `.env` so zdieľaným `JWT_SECRET` a `MINISTRYSTUFF_SERVICE_KEY`) a nastavte rovnaký servisný kľúč v `Api/.env`. `Api/config/dev.json` už smeruje `ministryStuffApi` na `localhost:8097`. MinistryStuffWeb potrebuje `.env` s `VITE_STAGE=dev`. Vývoj používa `smsMode: mock` a disk ako úložisko, takže AWS nie je potrebné.
