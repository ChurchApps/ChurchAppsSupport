# MinistryStuff (betalt lagring og tekstbeskeder)

MinistryStuff.org er den separate, betalte tjeneste, der finansierer de to ting, ChurchApps ikke kan tilbyde gratis: massefillagring (1 TB+) og SMS-kreditter. Begge sælges som faste månedlige abonnementer. ChurchApps selv forbliver 100 % gratis. Intet i B1 kræver et MinistryStuff-abonnement, og hvert integrationspunkt er en udbydergrænseflade, som en tredjepart også kunne implementere.

## Komponenter

| Del | Repo | Rolle |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 i udvikling) | Fakturering (Stripe), afsendelse af SMS og kreditregnskab (AWS End User Messaging), lagring (S3 + kvoteopgørelse). Én MySQL-database: `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 i udvikling) | ministrystuff.org: markedsføring, priser og kontoportalen (abonnementer, forbrug, omdirigeringer til Stripe Checkout og Customer Portal). |
| Tekstbeskedudbyder | `Packages/texting` → `MinistryStuffProvider` | Registreret som `ministrystuff` sammen med Clearstream og TextInChurch. |
| Lagringsgrænseflade | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (standard, gratis) indpakker den oprindelige S3/disk-omskifter. `FileStorageHelper` delegerer til standardudbyderen uændret. |
| Api-tilslutning | `Api/`-indhold og beskedmoduler | `MinistryStuffStorageProvider` + `StorageResolver` (indhold), `TextingConfigHelper` til indsprøjtning af tjenestenøgle (beskeder), tabellen `storageProviders`, endepunkterne `/content/storage/*` og `/messaging/texting/credits`. |

## Identitet og tillid

- Samme konti, samme kirker: MinistryStuffApi verificerer ChurchApps-JWT'er med den delte `JWT_SECRET` (søsterapp-mønsteret, som B1Transfer bruger). Portalen logger ind via MembershipApi og accepterer `?jwt=`-overdragelser.
- Server-til-server (kerne-Api → MinistryStuffApi): `X-Service-Key`-header (`MINISTRYSTUFF_SERVICE_KEY`, på begge sider) + eksplicit `churchId`. Berettigelse kontrolleres altid mod den pågældende kirkes abonnement. Kirker har aldrig MinistryStuff-legitimationsoplysninger. Det eneste, der kræves, er at vælge udbyderen i B1Admin.

## Tekstbeskedflow

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segmentantal trækkes fra den aktuelle periodes `smsCreditGrants` → AWS End User Messaging (eller `smsMode: mock` i udvikling). Kreditter er et **hårdt stop**: opbrugte kreditter afviser hele afsendelsen (`insufficient_credits`, som vises i B1Admin som en venlig opgraderingsprompt). Der sker aldrig delvise afsendelser, og der faktureres aldrig for overforbrug. Kreditudstedelser udstedes idempotent pr. faktureringsperiode ud fra Stripe-webhooks for `invoice.paid`. Fravalg (`smsOptOuts`) filtreres fra før hver afsendelse.

Andre veje når samme udbydergrænseflade uden om `TextingController`: check-in-advarsler (`CheckinController` → `MessagingModuleGateway.sendBulkText`) og workflow-trinhandlingen **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, som skriver rækker i `sentTexts` og `deliveryLogs` med en tom afsender). Flettefelter (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) udfyldes pr. modtager af `MergeFieldHelper.resolve`, og resultatet begrænses til 1.600 tegn. I `TextingController` sendes en gruppebesked, der indeholder `{{`, som ét `sendMessage` pr. modtager i stedet for ét enkelt `sendBulk`. En besked uden pladsholdere sendes stadig som ét massekald.

## Lagringsflow

En kirkes udbyderrække (`content.storageProviders`, administreret i B1Admin → Settings → File Storage) vælger, hvor **nye** uploads placeres. `contentPath` er en absolut URL pr. fil, så blandede udbydere kan sameksistere uden migrering: gamle filer leveres fortsat fra `content.churchapps.org`, mens nye leveres fra `content.ministrystuff.org`. Uploads går fra Api → `StorageResolver.forChurch` → udbyderens `store`/`getUploadUrl` (presignet POST med `content-length-range` i S3-tilstand, base64-fallback i disk/udviklingstilstand). Sletninger rutes efter den gemte URL (`StorageResolver.forUrl`). Kvoten er planens bytes, talt fra `storageObjects` (`stored` + `pending`-reservationer). En overskreden kvote blokerer nye uploads (`storage_quota_exceeded`). Intet slettes nogensinde, og der faktureres aldrig ekstra. Den gratis ChurchApps-plan er uberørt: samme grænser som før og ingen kirkedækkende kvote.

Scope-note: Udbydervalget dækker filer og ressourcer i indholdsflowet, hvor de store medier ligger. Galleri-, logo- og fotouploads bliver på standardudbyderen. De lister nøgler fra lagringen og bygger URL'er på klientsiden, så kirkespecifik rodplacering gælder endnu ikke.

Den samme grænseflade driver også [Bring-Your-Own Storage](./byos-storage.md) (egen lagring): kirker kan forbinde Google Drive, Dropbox, OneDrive eller deres egen S3-kompatible bucket i stedet for en MinistryStuff-plan.

## Fakturering

Stripe Checkout (hostet) bruges til tilmelding, og Stripe Customer Portal bruges til kortopdatering, annullering og fakturaer. MinistryStuffWeb har ingen kortformularer. Der er én `subscriptions`-række pr. (kirke, produkt). Planer og niveauer ligger i koden (`MinistryStuffApi/src/helpers/Plans.ts`) med Stripe-pris-id'er fra konfigurationen. Webhooken (`/billing/webhook`, med verifikation af signatur på den rå body og deduplikering via `webhookEvents`) styrer abonnementets livscyklus: active → past_due (karenstid) → canceled.

## Udviklingsopsætning

Kør MinistryStuffApi (`yarn dev`, port 8097; kræver en `.env` med den delte `JWT_SECRET` og `MINISTRYSTUFF_SERVICE_KEY`), og sæt den samme tjenestenøgle i `Api/.env`. `Api/config/dev.json` peger allerede `ministryStuffApi` på `localhost:8097`. MinistryStuffWeb kræver en `.env` med `VITE_STAGE=dev`. Udvikling bruger `smsMode: mock` og disk-lagring, så der er ingen behov for AWS.
