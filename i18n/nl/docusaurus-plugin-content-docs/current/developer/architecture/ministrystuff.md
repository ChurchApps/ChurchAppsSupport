# MinistryStuff (Betaalde opslag en sms)

MinistryStuff.org is de afzonderlijke betaalde dienst die de twee zaken financiert die ChurchApps zelf niet gratis kan aanbieden: grootschalige bestandsopslag (1 TB en meer) en sms-tegoed. Beide zijn beschikbaar via vaste maandabonnementen. ChurchApps zelf blijft 100% gratis. Niets in B1 vereist een MinistryStuff-abonnement, en elk integratiepunt is een providerkoppelvlak dat ook door een externe partij geïmplementeerd kan worden.

## Onderdelen

| Onderdeel | Repository | Rol |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (poort 8097 in de ontwikkelomgeving) | Facturering (Stripe), verzending van sms en tegoedadministratie (AWS End User Messaging), opslag (S3 en quotumregistratie). Eén MySQL-database `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (poort 3103 in de ontwikkelomgeving) | ministrystuff.org: marketing, prijzen en het accountportaal (abonnementen, gebruik, doorverwijzingen naar Stripe Checkout en het Stripe Customer Portal). |
| Sms-provider | `Packages/texting` → `MinistryStuffProvider` | Geregistreerd als `ministrystuff`, naast Clearstream en TextInChurch. |
| Opslagkoppelvlak | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (standaard, gratis) omhult de oorspronkelijke S3/schijf-schakeling; `FileStorageHelper` delegeert ongewijzigd naar de standaardprovider. |
| Koppeling in Api | Api-modules voor content en berichtenverkeer | `MinistryStuffStorageProvider` en `StorageResolver` (content), injectie van de servicesleutel in `TextingConfigHelper` (berichtenverkeer), tabel `storageProviders`, endpoints `/content/storage/*` en `/messaging/texting/credits`. |

## Identiteit en vertrouwen

- Dezelfde accounts, dezelfde kerken: MinistryStuffApi verifieert ChurchApps-JWT's met de gedeelde `JWT_SECRET`, vergelijkbaar met het zusterapp-patroon van B1Transfer. Het portaal logt in via MembershipApi en accepteert overdrachten via `?jwt=`.
- Server-naar-server (core Api naar MinistryStuffApi): de `X-Service-Key`-header (`MINISTRYSTUFF_SERVICE_KEY`, aan beide kanten) en een expliciete `churchId`. De rechten worden altijd gecontroleerd tegen het abonnement van die kerk. Kerken beschikken nooit over MinistryStuff-inloggegevens. Het is voldoende om de provider in B1Admin te selecteren.

## Sms-verloop

B1Admin Tekstbericht versturen → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send` of `/sms/sendBulk` → het aantal segmenten wordt afgeschreven van de `smsCreditGrants` van de huidige periode → AWS End User Messaging (of `smsMode: mock` in de ontwikkelomgeving). Tegoed is een **harde grens**: als het tegoed op is, wordt het hele bericht geweigerd (`insufficient_credits`, in B1Admin getoond als een vriendelijke upgrade-melding). Er vinden nooit gedeeltelijke verzendingen plaats en er wordt nooit extra gefactureerd voor overschrijding. Tegoedtoekenningen worden per factureringsperiode idempotent uitgegeven op basis van Stripe-webhooks `invoice.paid`. Afmeldingen (`smsOptOuts`) worden vóór elke verzending uitgefilterd.

Andere routes bereiken dezelfde providerkoppeling zonder via `TextingController` te gaan: meldingen bij het inchecken (`CheckinController` → `MessagingModuleGateway.sendBulkText`) en de workflowactie **Tekstbericht versturen** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, die rijen schrijft naar `sentTexts` en `deliveryLogs` met een lege afzender). Samenvoegvelden (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) worden per ontvanger ingevuld door `MergeFieldHelper.resolve`, en het resultaat is beperkt tot 1.600 tekens. In `TextingController` wordt een groepsbericht dat `{{` bevat als één `sendMessage` per ontvanger verzonden, in plaats van als één `sendBulk`. Een bericht zonder samenvoegvelden gaat nog steeds als één bulkverzending de deur uit.

## Opslagverloop

De providerrij van een kerk (`content.storageProviders`, beheerd in B1Admin → Instellingen → Bestandsopslag) bepaalt waar **nieuwe** uploads naartoe gaan. `contentPath` is een absolute URL per bestand, waardoor providers naast elkaar kunnen bestaan zonder migratie: oude bestanden blijven worden geleverd vanaf `content.churchapps.org`, nieuwe vanaf `content.ministrystuff.org`. Uploads verlopen via Api → `StorageResolver.forChurch` → provider `store` of `getUploadUrl` (een vooraf ondertekende POST met `content-length-range` in S3-modus; base64 als terugval in schijf- of ontwikkelmodus). Verwijderingen worden gerouteerd op basis van de opgeslagen URL (`StorageResolver.forUrl`). Quotum is gelijk aan de bytes van het abonnement en wordt geteld vanuit `storageObjects` (`stored` plus `pending`-reserveringen). Bij overschrijding van het quotum worden nieuwe uploads geblokkeerd (`storage_quota_exceeded`). Er wordt nooit iets verwijderd en er wordt niets extra gefactureerd. De gratis ChurchApps-laag blijft ongewijzigd (dezelfde limieten als voorheen; geen quotum per kerk).

Let op de reikwijdte: de providerkeuze geldt voor de stroom van content-**bestanden en -bronnen** (waar grote mediabestanden staan). Uploads van galerij, logo's en foto's blijven bij de standaardprovider, omdat die sleutels uit de opslag ophalen en URL's aan de clientzijde opbouwen. Toewijzing per kerk is daar nog niet van toepassing.

Dezelfde koppeling wordt ook gebruikt voor [Bring-Your-Own Storage](./byos-storage): kerken kunnen Google Drive, Dropbox, OneDrive of hun eigen S3-compatibele bucket koppelen in plaats van een MinistryStuff-abonnement.

## Facturering

Stripe Checkout (gehost) voor abonneren, en het Stripe Customer Portal voor het wijzigen van de kaart, opzeggen en facturen. MinistryStuffWeb bevat geen kaartformulieren. Er is één rij `subscriptions` per combinatie van (kerk, product). Abonnementen en niveaus staan in de code (`MinistryStuffApi/src/helpers/Plans.ts`), met Stripe-prijs-id's uit de configuratie. De webhook (`/billing/webhook`, met handtekeningcontrole op de ruwe body en ontdubbeling via `webhookEvents`) stuurt de levenscyclus van het abonnement aan: actief → achterstallig (respijtperiode) → opgezegd.

## Ontwikkelomgeving instellen

Start MinistryStuffApi (`yarn dev`, poort 8097; vereist een `.env` met de gedeelde `JWT_SECRET` en `MINISTRYSTUFF_SERVICE_KEY`) en stel dezelfde servicesleutel in `Api/.env` in. `Api/config/dev.json` verwijst al met `ministryStuffApi` naar `localhost:8097`. MinistryStuffWeb heeft een `.env` nodig met `VITE_STAGE=dev`. In de ontwikkelomgeving wordt `smsMode: mock` en schijfopslag gebruikt. AWS is niet nodig.
