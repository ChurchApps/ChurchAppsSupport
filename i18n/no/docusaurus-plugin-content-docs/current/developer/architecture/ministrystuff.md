# MinistryStuff (betalt lagring og tekstmeldinger)

MinistryStuff.org er den separate betalte tjenesten som finansierer de to tingene ChurchApps ikke kan gi bort — lagring av store filmengder (1 TB+) og SMS-kreditter — som abonnementer med fast månedspris. ChurchApps i seg selv forblir 100 % gratis; ingenting i B1 krever et MinistryStuff-abonnement, og hvert integrasjonspunkt er et leverandørgrensesnitt som en tredjepart også kunne implementere.

## Komponenter

| Del | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 i dev) | Fakturering (Stripe), sending av SMS + kreditthovedbok (AWS End User Messaging), lagring (S3 + kvoteregnskap). Én enkelt MySQL-database `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 i dev) | ministrystuff.org — markedsføring, priser og kontoportalen (abonnement, bruk, omdirigeringer til Stripe Checkout/Customer Portal). |
| Tekstmeldingsleverandør | `Packages/texting` → `MinistryStuffProvider` | Registrert som `ministrystuff` ved siden av Clearstream/TextInChurch. |
| Lagringsgrensesnitt | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (standard, gratis) pakker inn den opprinnelige S3-/disk-bryteren; `FileStorageHelper` delegerer uendret til standardleverandøren. |
| Api-kobling | `Api/` innholds- og meldingsmoduler | `MinistryStuffStorageProvider` + `StorageResolver` (innhold), injeksjon av tjenestenøkkel i `TextingConfigHelper` (meldinger), tabellen `storageProviders`, endepunktene `/content/storage/*` + `/messaging/texting/credits`. |

## Identitet og tillit

- Samme kontoer, samme menigheter: MinistryStuffApi verifiserer ChurchApps-JWT-er med den delte `JWT_SECRET` (mønster for søsterapper, som B1Transfer). Portalen logger inn mot MembershipApi og godtar overleveringer med `?jwt=`.
- Server-til-server (kjerne-Api → MinistryStuffApi): `X-Service-Key`-header (`MINISTRYSTUFF_SERVICE_KEY`, på begge sider) + eksplisitt `churchId`. Rettigheten sjekkes alltid mot den menighetens abonnement. Menigheter har aldri MinistryStuff-legitimasjon — det eneste som trengs er å velge leverandøren i B1Admin.

## Tekstmeldingsflyt

B1Admin Send tekstmelding → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → antall segmenter trekkes fra gjeldende periodes `smsCreditGrants` → AWS End User Messaging (eller `smsMode: mock` i dev). Kreditter er et **hardt stopp**: oppbrukte kreditter avviser hele sendingen (`insufficient_credits`, vist som en vennlig oppfordring om å oppgradere i B1Admin) — aldri delvise sendinger, aldri fakturering av overforbruk. Kredittbevilgninger utstedes idempotent per faktureringsperiode fra Stripe-webhooks for `invoice.paid`. Reservasjoner mot SMS (`smsOptOuts`) filtreres bort før hver sending.

Andre veier når det samme leverandørgrensesnittet uten å gå gjennom `TextingController`: innsjekkingsvarsler (`CheckinController` → `MessagingModuleGateway.sendBulkText`) og arbeidsflytens trinnhandling **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, som skriver `sentTexts`- + `deliveryLogs`-rader med null som avsender). Flettefelt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) løses opp per mottaker av `MergeFieldHelper.resolve`, og resultatet begrenses til 1 600 tegn. I `TextingController` sendes en gruppemelding som inneholder `{{` som én `sendMessage` per mottaker i stedet for én enkelt `sendBulk`; en melding uten plassholdere går fortsatt ut som én samlet sending.

## Lagringsflyt

En menighets leverandørrad (`content.storageProviders`, administrert i B1Admin → Innstillinger → Fillagring) velger hvor **nye** opplastinger går. `contentPath` er en absolutt URL per fil, så blandede leverandører kan eksistere side om side uten migrering: gamle filer fortsetter å serveres fra `content.churchapps.org`, nye fra `content.ministrystuff.org`. Opplastinger går Api → `StorageResolver.forChurch` → leverandørens `store`/`getUploadUrl` (forhåndssignert POST med `content-length-range` i S3-modus; base64-reserveløsning i disk-/dev-modus); slettinger rutes etter den lagrede URL-en (`StorageResolver.forUrl`). Kvote = abonnementets byte, talt fra `storageObjects` (`stored` + `pending`-reservasjoner); overskredet kvote blokkerer nye opplastinger (`storage_quota_exceeded`) — ingenting slettes eller faktureres ekstra. Det gratis ChurchApps-nivået er urørt (samme grenser som før; ingen kvote for hele menigheten).

Merknad om omfang: valg av leverandør dekker flyten for innholdets **filer/ressurser** (der store mediefiler ligger). Opplastinger av galleri/logo/bilder blir værende hos standardleverandøren — de lister nøkler fra lagringen og bygger URL-er på klienten, så rotfordeling per menighet gjelder ikke ennå.

Det samme grensesnittet driver også [Bring-Your-Own Storage](./byos-storage): menigheter kan koble til Google Drive, Dropbox, OneDrive eller sin egen S3-kompatible bøtte i stedet for et MinistryStuff-abonnement.

## Fakturering

Stripe Checkout (hostet) for å abonnere, Stripe Customer Portal for oppdatering av kort/oppsigelse/fakturaer — MinistryStuffWeb har ingen kortskjemaer. Én `subscriptions`-rad per (menighet, produkt); abonnementer/nivåer ligger i kode (`MinistryStuffApi/src/helpers/Plans.ts`) med Stripe-pris-ID-er fra konfigurasjonen. Webhooken (`/billing/webhook`, signaturverifisering av rå body, duplikatkontroll med `webhookEvents`) styrer abonnementets livssyklus: active → past_due (fristperiode) → canceled.

## Oppsett for utvikling

Kjør MinistryStuffApi (`yarn dev`, 8097; trenger `.env` med den delte `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) og sett den samme tjenestenøkkelen i `Api/.env`. `Api/config/dev.json` peker allerede `ministryStuffApi` til `localhost:8097`. MinistryStuffWeb trenger `.env` med `VITE_STAGE=dev`. Dev bruker `smsMode: mock` og disklagring — ingen AWS nødvendig.
