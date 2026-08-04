---
title: "Arrangementspåmeldinger"
---

# Arrangementspåmeldinger

<div class="article-intro">

Native arrangementspåmelding ligger i content-modulen og bærer, siden bølgen med betalte påmeldinger, en full handelsmodell: prissatte deltakertyper, prissatte tilleggsvalg, rabattkoder, betalinger gjennom kirkens eksisterende givertjeneste-gateway, og en statusdrevet venteliste. Pengestien gjenbruker bevisst givertjeneste-stabelen — påmeldingscontrolleren belaster gjennom den samme `GatewayService` / `IGatewayProvider`-abstraksjonen dokumentert i [Givertjeneste](./giving), slik at ingen kortdata- eller gateway-SDK-kunnskap ligger i content-modulen. Denne siden kartlegger datamodellen, prissettings- og kapasitetsreglene, og flytene for påmelding, betaling og venteliste.

</div>

## Oversikt

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (medlemsportal)        │            │ Api — content-modul                         │
│  påmeldingsveiviser ·        │   HTTPS    │  RegistrationController                     │
│  Mine påmeldinger            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (serverprising)  │
│ B1Admin (ansatte)            │            │  RegistrationHelper (e-poster)              │
│  arrangementspåmelding-      │            └───────────────┬─────────────────────────────┘
│  innstillinger · liste ·     │                            │ processCharge
│  CSV-eksport                 │                            ▼
└──────────────────────────────┘            ┌─────────────────────────────────────────────┐
                                            │ delt gateway-abstraksjon (givertjeneste)    │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regler gjelder for hele stabelen:

1. **Serveren eier prisen.** Klienter sender inn type-id-er, valg-id-er, og antall; `RegistrationPricingHelper.computeTotal()` beregner totalen server-side, og kuponger revalideres ved belastningstidspunktet. Et klientlevert beløp stoles aldri på.
2. **Kapasitet håndheves atomisk ved innsettingstidspunktet.** Hver kapasitetsbegrenset innsetting bruker en `INSERT … SELECT … FROM dual WHERE (antall aktive rader) < kapasitet`-setning, slik at to samtidige påmeldinger ikke begge kan ta den siste plassen. Antall utledes fra status (`pending`/`confirmed`), aldri lagret.
3. **Betalinger rir på givertjeneste-skinnene.** `RegistrationController` kaller den delte `GatewayService.processCharge` med kirkens konfigurerte gateway — samme leverandørabstraksjon, tokeniseringsmodell, og SCA-håndtering som donasjoner.

## Datamodell (`Api/src/modules/content`)

Modeller finnes i `models/Registration.ts`; tabellmappinger i `db/DatabaseTypes.ts`; ett repo per tabell under `repositories/`.

| Tabell | Betydning | Nøkkelfelt |
|-------|---------|-----------|
| `registrations` | Én påmelding (én husholdning/gruppe for ett arrangement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Én deltaker på en påmelding | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Deltakertyper per arrangement (f.eks. Voksen / Barn) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Navngitte tilleggsalternativer med en pris (f.eks. T-skjorte) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-påmeldingstak), sort, active |
| `registrationSelectionChoices` | Antall av et valg valgt av en påmelding/deltaker | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Én vellykket belastning mot en påmelding | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabattkoder per arrangement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Merknader:

- **Det finnes ingen ventelistetabell.** Ventelistede grupper er `registrations`-rader med `status = 'waitlisted'`; hele ventelistens livssyklus er statusoverganger på den ene tabellen.
- **Ingen lagrede tellere.** "Solgt"-/"brukt"-antall (arrangementskapasitet, per-type-kapasitet, per-valg-kapasitet, kupongbruk) beregnes med korrelerte underspørringer over rader der status er i `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Å kansellere en påmelding frigjør derfor kapasitet uten noe bokføring.
- Priser er MySQL DECIMAL-kolonner (strenger over ledningen) tvunget om med `Number()` inne i prissettingshjelperen.

## REST-flate

Alt ligger under `/content/registrations` (`controllers/RegistrationController.ts`), sperret av `Permissions.registrations` (`view` / `edit`):

| Rute | Tilgang | Formål |
|-------|--------|---------|
| `POST /register` | anonym | Full innsending: gjest eller medlem, serverprising, kapasitetssjekker, valgfri belastning |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | offentlig | Typer/valg med utledet `used` / `remainingCapacity` for veiviseren |
| `POST /types`, `DELETE /types/:id` (samme for `/selections`, `/coupons`) | `registrations.edit` | CRUD for ansattinnstillinger |
| `POST /coupons/validate` | offentlig | Innebygd rabattkode-validering under veiviseren |
| `GET /coupons/event/:eventId` | ansatt | Kuponger med bruksantall |
| `GET /event/:eventId` · `GET /event/:eventId/count` | ansatt · offentlig | Deltakerliste; aktivt antall for kapasitetsvisning |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autentisert | Mine påmeldinger, detaljer, betalingshistorikk |
| `PUT /:id` | eier/ansatt | Redigering etter innsending — erstatter medlemmer og valg med ferske atomiske kapasitetssjekker, beregner `totalAmount` på nytt; belaster eller refunderer aldri automatisk |
| `POST /:id/pay` | eier | "Fullfør betaling": belaster `totalAmount − amountPaid`, vipper `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | ansatt | Manuell forfremmelse fra venteliste |
| `POST /:id/cancel` · `DELETE /:id` | eier · ansatt | Kanseller / slett; begge utløser automatisk forfremmelse fra venteliste |

En ikke-kansellert eksisterende påmelding for samme `personId` på samme arrangement avvises med en 409, og hver opprettet påmelding sender ut en `registration.created`-webhook via `WebhookDispatcher`.

## Prissetting og rabattkoder

`helpers/RegistrationPricingHelper.ts` er den eneste autoriteten for pengeregning:

- `computeTotal()` summerer hver deltakers typepris pluss hvert valgs `price × quantity`.
- `validateCoupon()` håndhever aktiv-flagg, datovindu (`startDate`/`endDate`), `minMembers` mot den innsendte gruppestørrelsen, og `maxUses` mot det statusutledede innløsningsantallet.
- `applyDiscount()` — `percent` trekker fra `total × value/100`; `amount` trekker fra `value`; begge har null som gulv.

Veiviseren kaller `POST /coupons/validate` for øyeblikkelig tilbakemelding, men `register` revaliderer og reapplikerer kupongen server-side — klientens viste totalsum er kun veiledende.

## Det atomiske kapasitetsidiomet

Hver kapasitetsbegrenset innsetting kappes trygt uten transaksjoner eller låser ved å gjøre kapasitetssjekken til en del av selve `INSERT`-en. På arrangementsnivå (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Null påvirkede rader betyr "ved kapasitet". Det samme idiomet beskytter per-type-innsettinger (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, som teller medlemmer koblet til aktive påmeldinger) og per-valg-antall (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, som bruker `COALESCE(SUM(quantity),0) + ? <= capacity`). Når en medlems- eller valginnsetting mislykkes midt i en påmelding, ruller controlleren den delvise påmeldingen tilbake med `deleteCascade()` og rapporterer hvilken type eller hvilket valg som ble utsolgt.

## Betalingsflyt

`processRegistrationCharge` i controlleren er det eneste stedet påmeldinger berører penger, og det er en tynn klient av givertjeneste-stabelen:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisering skjer i nettleseren nøyaktig som for donasjoner (se [Givertjeneste](./giving)) — veiviseren gjenbruker apphelpers betalingsleverandørregister, slik at innloggede medlemmer kan betale med lagrede kort og gjester tokeniserer et nytt kort. Controlleren speiler `DonateController`s leverandøregenheter (Kingdom Fundings `pm-{id}`-betalingsmetode-id-er, Stripe SCA `requires_action`-svar returnert til klienten uten å registrere en betaling). En vellykket belastning skriver en `registrationPayments`-rad, øker `amountPaid`, og bekrefter påmeldingen. **Refusjoner er ikke implementert** — en kansellert betalt påmelding beholder sine betalingsrader, og eventuell refusjon håndteres utenfor systemet i gateway-dashbordet.

Begge inngangspunktene ruter gjennom samme kodesti: `register` (betal ved påmelding) og `pay` (saldobetaling / fullføring av venteliste).

## Ventelistens livssyklus

Når arrangementet er fullt og arrangementets `waitlistEnabled`-flagg er på, lagrer `register` gruppen som `waitlisted` (og hopper over kapasitetssjekker), og sender den vanlige bekreftelses-e-posten merket som en ventelisteplass. Forfremmelse skjer på tre måter — `cancel`, `delete`, og ansattendepunktet `promote` — som alle sendes videre til `RegistrationRepo.promoteFromWaitlist`, som velger den eldste ventelisterowen og vipper den atomisk:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…aktivt antall for arrangementet…) < ?
```

`status='waitlisted'`-vakten betyr at samtidige forfremmelser ikke kan dobbeltforfremme en rad, og kapasitetsunderspørringen betyr at en forfremmelse ikke kan overselge. Forfremmede rader lander på `pending` — ikke `confirmed` — fordi det kan gjenstå en saldo; `RegistrationHelper.sendWaitlistAvailabilityEmail` forteller den påmeldte at plassen deres åpnet seg, og lenker til fullfør-betaling-siden når `totalAmount − amountPaid > 0`. Å betale (eller å ikke ha noen saldo) bekrefter dem.

:::info
En kapasitetsøkning forfremmer ikke automatisk av seg selv — ansatte bruker deltakerlistens Forfrem-handling etter å ha økt kapasiteten. Kanselleringer og slettinger forfremmer automatisk.
:::

## Klientflater

- **B1App-veiviser** — én delt hook, `B1App/src/components/registration/useEventRegistration.ts`, driver både nettstedskomponenten (`components/registration/EventRegister.tsx`) og mobilportal-skjermen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) gjennom stegene `info → members → selections → questions → payment → confirm` (de midterste stegene gjengis bare når arrangementet har valg, et tilknyttet skjema, eller en totalsum som ikke er null). Info-/medlemssteg viser velgere per deltakertype med sanntids gjenværende kapasitet og utsolgt-tilstander; betaling (`RegistrationPaymentForm.tsx`) viser ordresammendrag, rabattkode-inntasting, og — for innloggede medlemmer — lagrede betalingsmetoder via apphelper-leverandørregisteret, med gjester som tokeniserer et nytt kort. Mobilskjermen **Påmeldinger** (`screens/RegistrationsPage.tsx`) er Mine påmeldinger: status, utestående saldo, Fullfør betaling (`POST /:id/pay`), Rediger (`PUT /:id` — kontakt, medlemstyper, valgantall), og Kanseller.
- **B1Admin-innstillinger** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` legger til bryteren Aktiver venteliste pluss trekkspill for Deltakertyper, Valg, og Rabattkoder (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), alle med CRUD mot rutene `/types`, `/selections`, `/coupons`.
- **B1Admin-deltakerliste** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: kolonne for type per deltaker, kolonne Betalt/Totalt med saldo-chip, antallschip per type, en betalingsdetalj-dialog (`RegistrationDetailDialog.tsx`, fra `GET /payments/:registrationId`), radhandlingen Forfrem for venteliste, og CSV-eksport inkludert deltakertyper, valg, betalt/totalt/saldo, og spørsmålssvar.

Oppslag på tvers av moduler (å løse eller opprette gjesteperson, laste kirken for e-poster) går gjennom `getMembershipModuleGateway()` — content-modulen leser aldri medlemskapstabeller direkte.

## Relaterte sider

- [Givertjeneste](./giving) — gateway-abstraksjonen, leverandørregisteret, og tokeniseringsmodellen denne funksjonen gjenbruker
- [Content-endepunkter](../api/endpoints/content) — content-modulens REST-flate
- [Webhooker](../api/webhooks) — hendelsen `registration.created`
- [Modulstruktur](../api/module-structure) — hvordan content-modulen er organisert server-side
