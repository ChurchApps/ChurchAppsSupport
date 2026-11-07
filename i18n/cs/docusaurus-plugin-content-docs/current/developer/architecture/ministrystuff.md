# MinistryStuff (placené úložiště a SMS)

MinistryStuff.org je samostatná placená služba, která financuje dvě věci, jež ChurchApps nemůže poskytovat zdarma: hromadné úložiště souborů (1 TB a více) a kredity na SMS. Obojí je nabízeno jako paušální měsíční předplatné. ChurchApps samotný zůstává zcela zdarma. V B1 není žádné předplatné MinistryStuff vyžadováno a každé místo napojení je poskytovatelské rozhraní (provider seam), které by mohla implementovat i třetí strana.

## Komponenty

| Část | Repozitář | Úloha |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 ve vývoji) | Fakturace (Stripe), odesílání SMS a evidence kreditů (AWS End User Messaging), úložiště (S3 + účtování kvót). Jedna databáze MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 ve vývoji) | ministrystuff.org: marketing, ceník a portál účtu (tarify, využití, přesměrování na Stripe Checkout a Customer Portal). |
| Poskytovatel SMS | `Packages/texting` → `MinistryStuffProvider` | Registrován jako `ministrystuff` vedle Clearstream a TextInChurch. |
| Rozhraní úložiště | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (výchozí, zdarma) obaluje původní přepínání S3/disk; `FileStorageHelper` předává volání výchozímu poskytovateli beze změny. |
| Propojení Api | `Api/` obsah + moduly zasílání zpráv | `MinistryStuffStorageProvider` + `StorageResolver` (obsah), vkládání servisního klíče v `TextingConfigHelper` (zasílání zpráv), tabulka `storageProviders`, endpointy `/content/storage/*` a `/messaging/texting/credits`. |

## Identita a důvěra

- **Stejné účty, stejné sbory:** MinistryStuffApi ověřuje JWT tokeny ChurchApps pomocí sdíleného `JWT_SECRET` (vzor sesterských aplikací, jako B1Transfer). Portál se přihlašuje přes MembershipApi a přijímá předání přes `?jwt=`.
- **Komunikace server-server (core Api → MinistryStuffApi):** hlavička `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, na obou stranách) a explicitní `churchId`. Oprávnění se vždy ověřuje podle předplatného daného sboru. Sbory nikdy nedrží přihlašovací údaje MinistryStuff. Stačí v B1Admin vybrat poskytovatele.

## Tok odesílání SMS

Odeslat text v B1Admin → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → počet segmentů se odečte od `smsCreditGrants` aktuálního období → AWS End User Messaging (nebo `smsMode: mock` ve vývoji). Kredity jsou **pevná hranice**: vyčerpané kredity odmítnou celé odeslání (`insufficient_credits`, v B1Admin se zobrazí přátelská výzva k upgradu). Nikdy nedojde k částečnému odeslání ani k doúčtování nad limit. Kreditní granty se pro každé fakturační období vydávají idempotentně z webhooků Stripe `invoice.paid`. Odhlášení (`smsOptOuts`) se filtrují před každým odesláním.

Ostatní cesty se dostanou ke stejnému rozhraní poskytovatele bez průchodu přes `TextingController`: upozornění při check-inu (`CheckinController` → `MessagingModuleGateway.sendBulkText`) a akce kroku pracovního postupu **Odeslat text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`), která zapisuje řádky do `sentTexts` a `deliveryLogs` s prázdným odesílatelem.

Slučovací pole (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se pro každého příjemce vyhodnocují pomocí `MergeFieldHelper.resolve` a výsledek je omezen na 1 600 znaků. V `TextingController` se skupinová zpráva obsahující `{{` odešle jako jedno `sendMessage` pro každého příjemce, nikoli jako jedno `sendBulk`. Zpráva bez zástupných znaků se odešle jako jedno hromadné odeslání.

## Tok úložiště

Řádek poskytovatele úložiště (`content.storageProviders`, spravovaný v B1Admin → Nastavení → Úložiště souborů) určuje, kam se ukládají **nové** nahrávky. `contentPath` je absolutní URL každého souboru, takže smíšení poskytovatelé fungují bez jakékoli migrace: staré soubory se nadále načítají z `content.churchapps.org`, nové z `content.ministrystuff.org`. Nahrávání prochází cestou Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` poskytovatele (podepsaný POST s `content-length-range` v režimu S3; záložní base64 v režimu disk/vývoj). Mazání se směruje podle uložené URL (`StorageResolver.forUrl`). Kvóta = bajty podle tarifu, počítané z `storageObjects` (`stored` + rezervace `pending`). Překročená kvóta blokuje nová nahrávání (`storage_quota_exceeded`). Nic se nikdy nemaže ani nedoúčtovává. Bezplatný tarif ChurchApps zůstává beze změny (stejné limity jako dříve, bez kvóty pro celý sbor).

Rozsah: výběr poskytovatele se týká pouze toku **souborů a zdrojů** (kde je uloženo hromadné médium). Nahrávání galerií, log a fotografií zůstává u výchozího poskytovatele. Ty vypisují klíče z úložiště a sestavují URL na straně klienta, takže zakořenění podle sboru zatím neplatí.

Stejné rozhraní využívá i [Úložiště typu Bring-Your-Own](./byos-storage.md): sbory mohou připojit Disk Google, Dropbox, OneDrive nebo vlastní bucket kompatibilní s S3 místo tarifu MinistryStuff.

## Fakturace

Stripe Checkout (hostovaný) slouží k předplatnému a Stripe Customer Portal ke změně karty, zrušení a fakturám. MinistryStuffWeb nemá žádné formuláře pro platební karty. Existuje jeden řádek `subscriptions` pro každou dvojici (sbor, produkt). Tarify a úrovně jsou v kódu (`MinistryStuffApi/src/helpers/Plans.ts`) s ID cen Stripe z konfigurace. Webhook (`/billing/webhook`, ověření podpisu nad nezpracovaným tělem požadavku, deduplikace přes `webhookEvents`) řídí životní cyklus předplatného: active → past_due (odkladná lhůta) → canceled.

## Nastavení vývojového prostředí

Spusťte MinistryStuffApi (`yarn dev`, port 8097; potřebuje `.env` se sdíleným `JWT_SECRET` a `MINISTRYSTUFF_SERVICE_KEY`) a nastavte stejný servisní klíč v `Api/.env`. `Api/config/dev.json` už odkazuje `ministryStuffApi` na `localhost:8097`. MinistryStuffWeb potřebuje `.env` s `VITE_STAGE=dev`. Vývoj používá `smsMode: mock` a diskové úložiště, takže AWS není potřeba.
