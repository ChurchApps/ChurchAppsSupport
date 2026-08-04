# MinistryStuff (Betalt lagring og tekstmeldinger)

MinistryStuff.org er den separate betalte tjenesten som finansierer de to tingene ChurchApps ikke kan gi bort gratis — bulk fillagring (1 TB+) og SMS-kreditter — som faste månedlige abonnementer. ChurchApps selv forblir 100 % gratis; ingenting i B1 krever et MinistryStuff-abonnement, og hvert integrasjonspunkt er et leverandørskjøt en tredjepart også kunne implementert.

## Komponenter

| Del | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 i utvikling) | Fakturering (Stripe), SMS-sending + kredittledger (AWS End User Messaging), lagring (S3 + kvoteregnskap). Én enkelt MySQL-database `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 i utvikling) | ministrystuff.org — markedsføring, prising, og kontoportalen (planer, bruk, Stripe Checkout-/Customer Portal-omdirigeringer). |
| Tekstmeldingsleverandør | `Packages/texting` → `MinistryStuffProvider` | Registrert som `ministrystuff` sammen med Clearstream/TextInChurch. |
| Lagringsskjøt | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (standard, gratis) pakker inn den opprinnelige S3-/disk-bryteren; `FileStorageHelper` delegerer til standardleverandøren uendret. |
| Api-kobling | `Api/`s content- og messaging-moduler | `MinistryStuffStorageProvider` + `StorageResolver` (content), `TextingConfigHelper`-injeksjon av tjeneste-nøkkel (messaging), tabellen `storageProviders`, endepunktene `/content/storage/*` + `/messaging/texting/credits`. |

## Identitet og tillit

- Samme kontoer, samme kirker: MinistryStuffApi verifiserer ChurchApps-JWT-er med den delte `JWT_SECRET` (søskenapp-mønster, som B1Transfer). Portalen logger inn mot MembershipApi og godtar `?jwt=`-overleveringer.
- Server-til-server (kjerne-Api → MinistryStuffApi): headeren `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, begge sider) + eksplisitt `churchId`. Berettigelse sjekkes alltid mot den kirkens abonnement. Kirker holder aldri MinistryStuff-legitimasjon — å velge leverandøren i B1Admin er alt som trengs.

## Tekstmeldingsflyt

B1Admin Send tekstmelding → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segmentantall trekkes fra inneværende periodes `smsCreditGrants` → AWS End User Messaging (eller `smsMode: mock` i utvikling). Kreditter er en **hard stopp**: oppbrukte kreditter avviser alt (`insufficient_credits`, vist som en vennlig oppgraderingsforespørsel i B1Admin) — aldri delvise sendinger, aldri overforbruksfakturering. Kredittildelinger utstedes idempotent per faktureringsperiode fra Stripe `invoice.paid`-webhooker. Reservasjoner (`smsOptOuts`) filtreres bort før hver sending.

## Lagringsflyt

En kirkes leverandørrad (`content.storageProviders`, administrert i B1Admin → Innstillinger → Fillagring) velger hvor **nye** opplastinger går. `contentPath` er en absolutt per-fil-URL, så blandede leverandører sameksisterer uten migrering: gamle filer fortsetter å betjenes fra `content.churchapps.org`, nye fra `content.ministrystuff.org`. Opplastinger flyter Api → `StorageResolver.forChurch` → leverandørens `store`/`getUploadUrl` (forhåndssignert POST med `content-length-range` i S3-modus; base64-fallback i disk-/utviklingsmodus); slettinger rutes etter den lagrede URL-en (`StorageResolver.forUrl`). Kvote = plan-bytes, telles fra `storageObjects` (`stored` + `pending`-reservasjoner); overskredet kvote blokkerer nye opplastinger (`storage_quota_exceeded`) — ingenting slettes eller faktureres ekstra noensinne. Det gratis ChurchApps-nivået er urørt (samme grenser som før; ingen kirkeomfattende kvote).

Omfangsnotat: leverandørvalg dekker innholdets **filer/ressurser**-flyt (der bulk-medier ligger). Opplastinger av galleri/logo/foto forblir på standardleverandøren — de lister nøkler fra lagring og bygger URL-er klientsidig, så per-kirke-forankring gjelder ikke ennå.

## Fakturering

Stripe Checkout (hostet) for abonnering, Stripe Customer Portal for kortoppdatering/kansellering/fakturaer — MinistryStuffWeb har ingen kortskjemaer. Én `subscriptions`-rad per (kirke, produkt); planer/nivåer ligger i koden (`MinistryStuffApi/src/helpers/Plans.ts`) med Stripe-pris-id-er fra konfigurasjon. Webhook (`/billing/webhook`, rå-body-signaturverifisering, `webhookEvents`-dedup) driver abonnementets livssyklus: aktiv → forfalt (nådeperiode) → kansellert.

## Utviklingsoppsett

Kjør MinistryStuffApi (`yarn dev`, 8097; trenger `.env` med den delte `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) og sett den samme tjeneste-nøkkelen i `Api/.env`. `Api/config/dev.json` peker allerede `ministryStuffApi` mot `localhost:8097`. MinistryStuffWeb trenger `.env` med `VITE_STAGE=dev`. Utvikling bruker `smsMode: mock` og disklagring — ingen AWS nødvendig.
