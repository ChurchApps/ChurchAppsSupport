# MinistryStuff (Betalt lagring & tekstering)

MinistryStuff.org er den separate betalt service som finansierer de to tingene ChurchApps ikke kan gi bort -- bulk fillagring (1TB+) og SMS kreditter -- som flat-rate månedlige abonnement. ChurchApps selv forblir 100% gratis; ingenting i B1 krever en MinistryStuff abonnement, og hver integrasjonspunkt er en leverandør søm en tredjepart også kunne implementere.

## Komponenter

| Stykke | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 dev) | Fakturering (Stripe), SMS send + kreditthovedbok (AWS End User Messaging), lagring (S3 + kvota regnskap). Enkelt MySQL DB `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 dev) | ministrystuff.org -- markedsføring, prising og konto portalen (planer, bruk, Stripe Checkout/Customer Portal omdirigering). |
| Tekstering leverandør | `Packages/texting` → `MinistryStuffProvider` | Registrert som `ministrystuff` ved siden av Clearstream/TextInChurch. |
| Lagring søm | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (standard, gratis) omkranser original S3/disk bryter; `FileStorageHelper` delegat til standard leverandør uendret. |
| Api kabling | `Api/` innhold + meldinger moduler | `MinistryStuffStorageProvider` + `StorageResolver` (innhold), `TextingConfigHelper` service-nøkkel injeksjon (meldinger), `storageProviders` tabell, `/content/storage/*` + `/messaging/texting/credits` endepunkter. |

## Identitet & tillit

- Samme kontoer, samme kirker: MinistryStuffApi verifiserer ChurchApps JWTs med delt `JWT_SECRET` (sibling-app mønster, som B1Transfer). Portal logger inn mot MembershipApi og godtar `?jwt=` hand-offs.
- Server-til-server (kjerne Api → MinistryStuffApi): `X-Service-Key` topptekst (`MINISTRYSTUFF_SERVICE_KEY`, begge sider) + eksplisitt `churchId`. Rettighet er alltid kontrollert mot den kirkens abonnement. Kirker aldri hold MinistryStuff legitimasjon -- valg av leverandør i B1Admin er alt som trengs.

## Tekstering flyt

B1Admin Send tekst → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segment antall debitert mot gjeldende periods `smsCreditGrants` → AWS End User Messaging (eller `smsMode: mock` i dev). Kreditter er en **hard stopp**: uttømt kreditter avvise engros (`insufficient_credits`, overflateavdeling som et vennlig oppgraderings forslag i B1Admin) -- aldri del sender, aldri overskudd fakturering. Kredittgrant er utstedt idempotent per faktureringsperiode fra Stripe `invoice.paid` webhooks. Opt-outs (`smsOptOuts`) er filtrert før hver send.

## Lagring flyt

En kirkes leverandør rad (`content.storageProviders`, administrert i B1Admin → innstillinger → fillagring) velg der **nye** opplastinger går. `contentPath` er en absolutt per-fil URL, slik blendet leverandører eksisterer med null migrasjon: gamle filer holde tjene fra `content.churchapps.org`, nye fra `content.ministrystuff.org`. Opplastinger strømme Api → `StorageResolver.forChurch` → leverandør `store`/`getUploadUrl` (presigned POST med `content-length-range` i S3 modus; base64 tilbakefallende i disk/dev modus); slettinger rute etter lagret URL (`StorageResolver.forUrl`). Kvota = plan bytes, regnet fra `storageObjects` (`stored` + `pending` reservasjoner); overskredet kvota blokk nye opplastinger (`storage_quota_exceeded`) -- ingenting er noen gang slettet eller fakturert ekstra. Gratis ChurchApps tier er uendret (samme grenser som før; ingen kirke-vid kvota).

Omfang merknad: leverandør valg dekk innholdet **filer/ressurser** flyt (der bulk media lever). Galleri/logo/foto opplastinger forblir på standard leverandør -- de liste nøkler fra lagring og bygge URLs klient-side, slik per-kirke rooting ikke brukes ennå.

Den samme søm også makter [Bring-Your-Own lagring](./byos-storage): kirker kan koble Google Drive, Dropbox, OneDrive eller deres egen S3-kompatibel bøtte i stedet for en MinistryStuff plan.

## Fakturering

Stripe Checkout (hosted) for abonner, Stripe Customer Portal for kort oppdater/avbryt/fakturaer -- MinistryStuffWeb har ingen kort skjemaer. En `subscriptions` rad per (kirke, produkt); planer/nivåer lever i kode (`MinistryStuffApi/src/helpers/Plans.ts`) med Stripe pris ids fra konfig. Webhook (`/billing/webhook`, rå-kropp signatur verifisering, `webhookEvents` dedup) kjør abonnement livssyklus: aktiv → forsinket (nåde) → avbryt.

## Dev oppsett

Kjør MinistryStuffApi (`yarn dev`, 8097; trenger `.env` med delt `JWT_SECRET` + `MINISTRYSTUFF_SERVICE_KEY`) og sett samme service nøkkel i `Api/.env`. `Api/config/dev.json` allerede peker `ministryStuffApi` på `localhost:8097`. MinistryStuffWeb trenger `.env` med `VITE_STAGE=dev`. Dev bruker `smsMode: mock` og disk lagring -- ingen AWS nødvendig.
