# MinistryStuff (betald lagring och SMS)

MinistryStuff.org är den separata betaltjänst som finansierar de två saker som ChurchApps inte kan erbjuda gratis: massfillagring (1 TB+) och SMS-krediter. Båda säljs som fasta månatliga prenumerationer. ChurchApps i sig är helt gratis. Ingenting i B1 kräver en MinistryStuff-prenumeration, och varje integrationspunkt är ett leverantörsgränssnitt som vilken tredje part som helst också kan implementera.

## Komponenter

| Komponent | Repo | Roll |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 i utveckling) | Fakturering (Stripe), SMS-utskick och kreditliggare (AWS End User Messaging), lagring (S3 + kvotredovisning). En enda MySQL-databas: `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 i utveckling) | ministrystuff.org: marknadsföring, prissättning och kontoportalen (planer, användning, omdirigeringar till Stripe Checkout och Customer Portal). |
| Textleverantör | `Packages/texting` → `MinistryStuffProvider` | Registreras som `ministrystuff` tillsammans med Clearstream och TextInChurch. |
| Lagringsgränssnitt | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (standard, gratis) omsluter den ursprungliga S3/disk-växlingen. `FileStorageHelper` delegerar oförändrat till standardleverantören. |
| Api-kopplingar | `Api/`-innehåll och meddelandemoduler | `MinistryStuffStorageProvider` och `StorageResolver` (innehåll), injicering av tjänstnyckel i `TextingConfigHelper` (meddelanden), tabellen `storageProviders`, endpoints `/content/storage/*` och `/messaging/texting/credits`. |

## Identitet och förtroende

- Samma konton, samma kyrkor: MinistryStuffApi verifierar ChurchApps JWT-token med den delade `JWT_SECRET` (samma mönster som systerappar, till exempel B1Transfer). Portalen loggar in mot MembershipApi och accepterar överlämningar via `?jwt=`.
- Server-till-server (kärn-Api → MinistryStuffApi): rubriken `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, på båda sidor) och en explicit `churchId`. Behörighet kontrolleras alltid mot den aktuella kyrkans prenumeration. Kyrkor har aldrig några MinistryStuff-uppgifter. Det enda som krävs är att välja leverantören i B1Admin.

## Textflöde

B1Admin Skicka text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → antalet segment dras från den aktuella periodens `smsCreditGrants` → AWS End User Messaging (eller `smsMode: mock` i utveckling).

Krediterna är en **hård gräns**: när de tar slut avvisas hela utskicket (`insufficient_credits`, som i B1Admin visas som en vänlig uppmaning att uppgradera). Delvisa utskick förekommer aldrig, och övertagsdebitering sker aldrig. Kreditutdelningar skapas idempotent per faktureringsperiod utifrån Stripe-webhooks för `invoice.paid`. Avregistreringar (`smsOptOuts`) filtreras bort före varje utskick.

Andra vägar når samma leverantörsgränssnitt utan att gå via `TextingController`: incheckningsaviseringar (`CheckinController` → `MessagingModuleGateway.sendBulkText`) och arbetsflödets steg **Skicka text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, som skriver rader till `sentTexts` och `deliveryLogs` med en tom avsändare). Sammanfogningsfält (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) löses upp per mottagare av `MergeFieldHelper.resolve`, och resultatet begränsas till 1 600 tecken. I `TextingController` skickas ett gruppmeddelande som innehåller `{{` som ett `sendMessage` per mottagare i stället för ett enda `sendBulk`. Ett meddelande utan platshållare skickas fortfarande som ett enda massutskick.

## Lagringsflöde

Kyrkans leverantörspost (`content.storageProviders`, som hanteras i B1Admin → Inställningar → Fillagring) styr var **nya** uppladdningar hamnar. `contentPath` är en absolut webbadress per fil, så flera leverantörer kan samexistera utan någon migrering: äldre filer fortsätter att levereras från `content.churchapps.org`, medan nya levereras från `content.ministrystuff.org`.

Uppladdningar går från Api → `StorageResolver.forChurch` → leverantörens `store` eller `getUploadUrl` (en presignerad POST med `content-length-range` i S3-läge, och base64 som reserv i disk- eller utvecklingsläge). Borttagningar dirigeras efter den lagrade webbadressen (`StorageResolver.forUrl`). Kvoten är planens byte, räknade från `storageObjects` (`stored` och `pending`-reservationer). En överskriden kvot blockerar nya uppladdningar (`storage_quota_exceeded`). Ingenting raderas, och ingen extra debitering görs. Den kostnadsfria ChurchApps-nivån är oförändrad: samma gränser som tidigare och ingen kyrkövergripande kvot.

Omfattningsnotering: leverantörsvalet gäller flödet för innehållets **filer och resurser**, där bulkmedia lagras. Uppladdningar av galleri, logotyp och foton stannar hos standardleverantören. De listar nycklar från lagringen och bygger webbadresser på klientsidan, så kyrkospecifik rotning gäller ännu inte.

Samma gränssnitt driver också [Ta med egen lagring](./byos-storage.md). Där kan kyrkor koppla Google Drive, Dropbox, OneDrive eller sin egen S3-kompatibla bucket i stället för en MinistryStuff-plan.

## Fakturering

Stripe Checkout (hostad) används för prenumerationer. Stripe Customer Portal används för att uppdatera kort, avsluta och hämta fakturor. MinistryStuffWeb har inga kortformulär.

En rad i `subscriptions` finns per (kyrka, produkt). Planer och nivåer finns i koden (`MinistryStuffApi/src/helpers/Plans.ts`), med Stripe-pris-ID:n från konfigurationen. Webhooken (`/billing/webhook`, med signaturverifiering av den råa begärandekroppen och deduplicering via `webhookEvents`) styr prenumerationens livscykel: active → past_due (karenstid) → canceled.

## Utvecklingsmiljö

Starta MinistryStuffApi (`yarn dev`, port 8097). Den kräver en `.env` med den delade `JWT_SECRET` och `MINISTRYSTUFF_SERVICE_KEY`. Ange samma tjänstnyckel i `Api/.env`. `Api/config/dev.json` pekar redan `ministryStuffApi` mot `localhost:8097`. MinistryStuffWeb kräver en `.env` med `VITE_STAGE=dev`. Utvecklingsmiljön använder `smsMode: mock` och diskbaserad lagring, så ingen AWS behövs.
