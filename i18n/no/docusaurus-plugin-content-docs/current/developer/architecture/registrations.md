---
title: "Påmeldinger til arrangementer"
description: "Hvordan arrangementspåmeldinger fungerer i B1 Admin og B1App: deltakertyper, betalte tillegg, rabattkoder, betalinger og opprykk fra venteliste."
---

# Påmeldinger til arrangementer

<div class="article-intro">

Innebygd påmelding til arrangementer ligger i content-modulen og har siden bølgen med betalte påmeldinger en fullstendig handelsmodell: prissatte deltakertyper, prissatte tilleggsvalg, rabattkoder, betalinger gjennom kirkens eksisterende giveløsning, og en ventelisteløsning styrt av status. Pengestien gjenbruker bevisst giving-stacken — påmeldingskontrolleren belaster gjennom samme `GatewayService` / `IGatewayProvider`-abstraksjon som er dokumentert i [Giving](./giving.md), slik at ingen kortdata eller kunnskap om gateway-SDK-er ligger i content-modulen. Denne siden kartlegger datamodellen, pris- og kapasitetsreglene, og flytene for påmelding, betaling og venteliste.

</div>

## Oversikt

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (medlemsportal)        │            │ Api — content-modul                        │
│  påmeldingsveiviser ·        │   HTTPS    │  RegistrationController                     │
│  Mine påmeldinger            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (serverpriser)   │
│ B1Admin (ansatte)            │            │  RegistrationHelper (e-poster)              │
│  innstillinger for påmelding │            └───────────────┬─────────────────────────────┘
│  · deltakerliste · CSV-eksp. │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ delt gateway-abstraksjon (giving)           │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regler gjelder på tvers av stacken:

1. **Serveren eier prisen.** Klienter sender inn type-ID-er, valg-ID-er og antall; `RegistrationPricingHelper.computeTotal()` beregner totalen på serveren, og kuponger valideres på nytt ved belastning. Et beløp fra klienten stoles aldri på.
2. **Kapasitet håndheves atomisk ved innsetting.** Hver innsetting med kapasitetsgrense bruker en `INSERT … SELECT … FROM dual WHERE (antall aktive rader) < kapasitet`-setning, slik at to samtidige påmeldinger ikke kan ta den siste plassen. Tellinger utledes fra status (`pending`/`confirmed`), og lagres aldri.
3. **Betalinger følger giving-skinnene.** `RegistrationController` kaller den delte `GatewayService.processCharge` med kirkens konfigurerte gateway — samme leverandørabstraksjon, tokeniseringsmodell og SCA-håndtering som for gaver.

## Datamodell (`Api/src/modules/content`)

Modellene ligger i `models/Registration.ts`; tabellkartleggingene i `db/DatabaseTypes.ts`; ett repo per tabell under `repositories/`.

| Tabell | Betydning | Nøkkelfelt |
|-------|-----------|-----------|
| `registrations` | Én påmelding (én husstand/gruppe for ett arrangement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Én deltaker på en påmelding | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Deltakertyper per arrangement (f.eks. Voksen / Barn) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Navngitte tilleggsvalg med pris (f.eks. t-skjorte) | eventId, name, description, **price**, **capacity**, **maxQuantity** (tak per påmelding), sort, active |
| `registrationSelectionChoices` | Antall av et valg som er gjort av en påmelding/deltaker | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Én vellykket belastning mot en påmelding | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabattkoder per arrangement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Merknader:

- **Det finnes ingen ventelistetabell.** Påmeldinger på venteliste er `registrations`-rader med `status = 'waitlisted'`; hele ventelistens livssyklus er statusoverganger på den ene tabellen.
- **Ingen lagrede tellere.** «Solgt»- / «brukt»-tellinger (arrangementskapasitet, kapasitet per type, kapasitet per valg, kupongbruk) beregnes med korrelerte underspørringer over rader der status er i `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Å avbestille en påmelding frigjør dermed kapasitet uten bokføring.
- Priser er MySQL DECIMAL-kolonner (strenger over nettverket) som gjøres om med `Number()` inne i prishjelperen.

## REST-flate

Alt ligger under `/content/registrations` (`controllers/RegistrationController.ts`), styrt av `Permissions.registrations` (`view` / `edit`):

| Rute | Tilgang | Formål |
|-------|---------|--------|
| `POST /register` | anonym | Full innsending: gjest, medlem eller ansatt «Add Attendee»; serverpriser, kapasitetskontroller, valgfri belastning |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | offentlig | Typer/valg med avledet `used` / `remainingCapacity` for veiviseren |
| `POST /types`, `DELETE /types/:id` (samme for `/selections`, `/coupons`) | `registrations.edit` | CRUD for innstillinger for ansatte |
| `POST /coupons/validate` | offentlig | Validering av rabattkode innen veiviseren |
| `GET /coupons/event/:eventId` | ansatt | Kuponger med bruksantall |
| `GET /event/:eventId` · `GET /event/:eventId/count` | ansatt · offentlig | Deltakerliste; antall aktive for kapasitetsvisning |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | innlogget | Mine påmeldinger, detaljer, betalingshistorikk |
| `PUT /:id` | eier/ansatt | Redigering etter innsending — erstatter deltakere og valgvalg med nye atomiske kapasitetskontroller, beregner `totalAmount` på nytt; belaster eller refunderer aldri automatisk |
| `POST /:id/pay` | eier | «Fullfør betaling»: belaster `totalAmount − amountPaid`, endrer `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | ansatt | Manuell forfremmelse fra venteliste |
| `POST /:id/cancel` · `DELETE /:id` | eier · ansatt | Avbestill / slett; begge utløser automatisk forfremmelse fra venteliste |

En ikke-avbestilt eksisterende påmelding for samme `personId` på samme arrangement avvises med 409, og hver opprettet påmelding sender en `registration.created`-webhook via `WebhookDispatcher`.

## Priser og rabattkoder

`helpers/RegistrationPricingHelper.ts` er den ene autoriteten for pengeberegning:

- `computeTotal()` summerer hver deltakers typepris pluss hvert valgvalgs `pris × antall`.
- `validateCoupon()` håndhever aktiv flagg, datovindu (`startDate`/`endDate`), `minMembers` mot størrelsen på selskapet som sendes inn, og `maxUses` mot antall innløsninger utledet fra status.
- `applyDiscount()` — `percent` trekker fra `total × value/100`; `amount` trekker fra `value`; begge gulver på null.

Veiviseren kaller `POST /coupons/validate` for umiddelbar tilbakemelding, men `register` validerer og bruker kupongen på nytt på serveren — totalen klienten viser er bare veiledende.

## Det atomiske kapasitetsmønsteret

Hver innsetting med kapasitetsgrense kappløper trygt uten transaksjoner eller låser ved å gjøre kapasitetskontrollen til en del av selve `INSERT`-en. På arrangementsnivå (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Null berørte rader betyr «fullt». Det samme mønsteret beskytter innsettinger per type (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, teller medlemmer koblet til aktive påmeldinger) og antall per valg (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, med `COALESCE(SUM(quantity),0) + ? <= capacity`). Når en innsetting av deltaker eller valg mislykkes midt i en påmelding, ruller kontrolleren tilbake den delvise påmeldingen med `deleteCascade()` og rapporterer hvilken type eller hvilket valg som ble utsolgt.

## Betalingsflyt {#payment-flow}

`processRegistrationCharge` i kontrolleren er det eneste stedet påmeldinger berører penger, og det er en tynn klient av giving-stacken:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisering skjer i nettleseren nøyaktig som for gaver (se [Giving](./giving.md)) — veiviseren gjenbruker apphelpers leverandørregister for betalinger, så innloggede medlemmer kan betale med lagrede kort, og gjester tokeniserer et nytt kort. Kontrolleren speiler `DonateController`s leverandørspesialiteter (Kingdom Funding `pm-{id}`-betalingsmetode-ID-er, Stripe SCA-svar `requires_action` returnert til klienten uten å registrere en betaling). En vellykket belastning skriver en `registrationPayments`-rad, øker `amountPaid`, og bekrefter påmeldingen. **Refusjoner er ikke implementert** — en avbestilt betalt påmelding beholder sine betalingsrader, og eventuell refusjon håndteres utenfor systemet i gatewayens dashbord.

Begge inngangspunktene går gjennom samme kodesti: `register` (betaling ved påmelding) og `pay` (restbetaling / fullføring av venteliste).

`register` hopper over belastningen i to tilfeller og lagrer påmeldingen som `pending` med `amountPaid = 0`, med hele totalen som restbeløp:

- **Ansatt Add Attendee.** Body har en `personId` som ikke er innringerens, ingen `guestInfo`, og innringeren har `registrations.edit` i den kirken. Personen må finnes (404 ellers), husstandsmedlemsfilteret omgås, og ingen kort belastes.
- **Ingen gateway.** Kirken har ingen giving-gateway (`hasGateway` sjekker `gateway.loadAll`). B1Apps betalingssteg viser **Register and Pay Later** i stedet for et kortskjema.

Gjester (uten `au.id`) med prisede påmeldinger må ha en `captchaPass` fra `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (nå i `shared/helpers`) kjører rett før belastningen, slik at venteliste- og gratis påmeldinger ikke berøres. Når `CAPTCHA_ENFORCE=true` og passet mangler eller er ugyldig, rulles den nye påmeldingen tilbake med `deleteCascade()`, og kallet returnerer 403. B1Apps `RegistrationPaymentForm` viser reCAPTCHA-avkrysningsboksen til gjester og sender passet med både kortlagringen og påmeldingen.

## Ventelisteløpet

Når arrangementet er fullt og flagget `waitlistEnabled` for arrangementet er på, lagrer `register` gruppen som `waitlisted` (hopper over kapasitetskontroller) og sender den vanlige bekreftelses-e-posten merket som en plass på venteliste. Forfremmelse skjer på tre måter — `cancel`, `delete` og det ansatte `promote`-endepunktet — og alle samles i `RegistrationRepo.promoteFromWaitlist`, som velger den eldste raden på venteliste og snur den atomisk:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…aktiv telling for arrangementet…) < ?
```

Vaktposten `status='waitlisted'` gjør at samtidige forfremmelser ikke kan forfremme samme rad to ganger, og kapasitetsunderspørringen gjør at en forfremmelse ikke kan overselge. Forfremmede rader havner på `pending` — ikke `confirmed` — fordi et restbeløp kan fortsatt skyldes; `RegistrationHelper.sendWaitlistAvailabilityEmail` forteller den påmeldte at plassen deres ble ledig, og når `totalAmount − amountPaid > 0`, lenker den til kirkens B1-side `/mobile/registrations` (Mine påmeldinger), bygget fra `B1AppRoot` og kirkens underdomene. Betaling (eller ingen restbeløp) bekrefter dem.

:::info
En økning av kapasiteten forfremmer ikke automatisk av seg selv — ansatte bruker Promote-handlingen på deltakerlisten etter å ha økt kapasiteten. Avbestillinger og slettinger forfremmer automatisk.
:::

## Klientflater

- **B1Apps veiviser** — én delt hook, `B1App/src/components/registration/useEventRegistration.ts`, driver både nettsidekomponenten (`components/registration/EventRegister.tsx`) og mobilportalskjermen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) gjennom stegene `info → members → selections → questions → payment → confirm` (de midterste stegene vises bare når arrangementet har valg, et vedlagt skjema, eller en totalsum som ikke er null). Info- og medlemsstegene viser velgere per deltakertype med kapasitet som gjenstår og utsolgt-tilstander i sanntid; betaling (`RegistrationPaymentForm.tsx`) viser ordreoversikten, inntasting av rabattkode, og — for innloggede medlemmer — lagrede betalingsmetoder via apphelpers leverandørregister, mens gjester tokeniserer et nytt kort. Skjermen **Registrations** på mobil (`screens/RegistrationsPage.tsx`) er Mine påmeldinger: status, restbeløp, Fullfør betaling (`POST /:id/pay`), Rediger (`PUT /:id` — kontakt, medlemstyper, antall valg), og Avbestill.
- **B1Admin-innstillinger** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` legger til bryteren Enable Waitlist pluss trekkspill for Attendee Types, Selections og Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), alt CRUD mot rutene `/types`, `/selections` og `/coupons`.
- **B1Admin-deltakerliste** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: kolonnen Type per deltaker, kolonnen Paid/Total med restbeløpsbrikke, antallsbrikker per type, en dialog for betalingsdetaljer (`RegistrationDetailDialog.tsx`, fra `GET /payments/:registrationId`), handlingen Promote på venteliste, og CSV-eksport med deltakertyper, valg, betalt/totalt/restbeløp og svar på spørsmål.

Kryssmodulsøk (å finne eller opprette gjestepersonen, laste kirken for e-poster) går gjennom `getMembershipModuleGateway()` — content-modulen leser aldri membership-tabeller direkte.

## Relaterte sider

- [Giving](./giving.md) — gateway-abstraksjonen, leverandørregisteret og tokeniseringsmodellen denne funksjonen gjenbruker
- [Content-endepunkter](../api/endpoints/content.md) — REST-flaten til content-modulen
- [Webhooks](../api/webhooks.md) — hendelsen `registration.created`
- [Modulstruktur](../api/module-structure.md) — hvordan content-modulen er organisert på serversiden
