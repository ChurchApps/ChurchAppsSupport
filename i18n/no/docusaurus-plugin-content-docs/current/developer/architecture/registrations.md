---
title: "Arrangementregistreringer"
---

# Arrangementregistreringer

<div class="article-intro">

Innebygd arrangementregistrering lever i innhold modulen og, siden de betalt-registreringer bølge, bærer full handel modellen: prisatte deltager typer, prisatte tillegg-valg, rabatt koder, betalinger gjennom kirken sin eksisterende donerings gateway, og status-drevet venteliste. Pengene sti bevisst gjenbruk donerings stabel — registrerings kontroller ladet gjennom samme `GatewayService` / `IGatewayProvider` abstraksjon dokumentert i [Donering](./giving), så nei kort data eller gateway SDK kunnskap lever i innhold modulen. Denne siden kartlegger data modellen, prissetting og kapasitet regler, og registrering, betaling, og venteliste flyter.

</div>

## Oversikt

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (medlem portal)        │            │ Api — innhold modul                         │
│  registrering tryllstav ·    │   HTTPS    │  RegistrationController                     │
│  Mine registreringer         │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server prissetting) │
│ B1Admin (stab)               │            │  RegistrationHelper (e-poster)              │
│  arrangement registrering innstillinger │  └───────────────┬─────────────────────────────┘
│  · list · CSV eksport        │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ delt gateway abstraksjon (donering)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regler holder på tvers av stabelen:

1. **Serveren eier prisen.** Klienter leverer type ids, valg ids, og mengder; `RegistrationPricingHelper.computeTotal()` beregner totalen server-side og kupongene blir re-validert på charge tid. En klient-levert beløp er aldri tiltrodd.
2. **Kapasitet blir gjennomtvunget atomisk på innsettings tid.** Hver kapasitets-begrenset innsetting bruk ein `INSERT … SELECT … FROM dual WHERE (antall av aktive rader) < kapasitet` utsagn, så to samtidig registreringer kan ikke begge ta siste spot. Antall blir utledet fra status (`pending`/`confirmed`), aldri lagret.
3. **Betalinger rir donerings skinner.** `RegistrationController` kaller delt `GatewayService.processCharge` med kirken sin konfigurert gateway — samme leverandør abstraksjon, tokenisering modell, og SCA håndtering som donasjoner.

## Datamodell (`Api/src/modules/content`)

Modeller er i `models/Registration.ts`; tabell kartlegginger i `db/DatabaseTypes.ts`; ein repo per tabell under `repositories/`.

| Tabell | Betydning | Nøkkel felt |
|-------|---------|-----------|
| `registrations` | Ein registrering (ein husholdning/party for ein arrangement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Ein deltager på ein registrering | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Deltager typer per arrangement (f.eks. Voksen / Barn) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Navngitt tillegg-alternativ med ein pris (f.eks. T-skjorte) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-registrering tak), sort, active |
| `registrationSelectionChoices` | Mengde av ein valg valgt av ein registrering/medlem | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Ein vellykket lading mot ein registrering | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabatt koder per arrangement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Noter:

- **Det er nei venteliste tabell.** Venteliste parties er `registrations` rader med `status = 'waitlisted'`; hele venteliste livssyklus er status overganger på den ein tabell.
- **Nei lagret tellere.** "Solgt" / "brukt" antall (arrangement kapasitet, per-type kapasitet, per-valg kapasitet, kupong bruk) blir beregnet med korrelert underforespørsel over rader hvis status er i `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Avbrytelse ein registrering derfor frigjør kapasitet med nei bokholding.
- Priser er MySQL DECIMAL kolonner (strenger over tråden) tvunget med `Number()` innsiden prissetting hjelper.

## REST flate

Alt er under `/content/registrations` (`controllers/RegistrationController.ts`), port av `Permissions.registrations` (`view` / `edit`):

| Rute | Tilgang | Formål |
|-------|--------|---------|
| `POST /register` | anonym | Full innsending: gjest eller medlem, server prissetting, kapasitets sjekk, valgfri lading |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | offentlig | Typer/valg med utledet `used` / `remainingCapacity` for tryllstaven |
| `POST /types`, `DELETE /types/:id` (samme for `/selections`, `/coupons`) | `registrations.edit` | Stab innstillinger CRUD |
| `POST /coupons/validate` | offentlig | Inline rabatt-kode validering under tryllstaven |
| `GET /coupons/event/:eventId` | stab | Kupongene med bruk antall |
| `GET /event/:eventId` · `GET /event/:eventId/count` | stab · offentlig | List; aktivt-antall for kapasitets display |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autentisert | Mine registreringer, detalj, betalings historie |
| `PUT /:id` | eier/stab | Etter-innsending redigering — erstat medlemmer og valg valg med frisk atomisk kapasitets sjekk, beregne `totalAmount`; aldri auto-ladet eller refunder |
| `POST /:id/pay` | eier | "Fullfør betaling": ladet `totalAmount − amountPaid`, flip `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | stab | Manuell venteliste promotering |
| `POST /:id/cancel` · `DELETE /:id` | eier · stab | Avbryt / slett; begge trigger venteliste auto-promotering |

En ikke-avbrutt eksisterende registrering for samme `personId` på samme arrangement blir avvist med ein 409, og hver opprettet registrering sender ein `registration.created` webhook via `WebhookDispatcher`.

## Prissetting og rabatt koder

`helpers/RegistrationPricingHelper.ts` er den eneste penge-matte autority:

- `computeTotal()` summerer hver medlem sin type pris pluss hver valg valg sin `price × quantity`.
- `validateCoupon()` håndhever aktiv flagg, dato vindu (`startDate`/`endDate`), `minMembers` mot det sendt party størrelse, og `maxUses` mot status-utledet innløsning antall.
- `applyDiscount()` — `percent` trekk `total × value/100`; `amount` trekk `value`; begge gulv på null.

Tryllstaven kaller `POST /coupons/validate` for inline tilbakemelding, men `register` re-validerer og re-påfør kupongen server-side — klienten displayert total er bare rådgivende.

## Det atomiske kapasitets idiom

Hver kapasitets-begrenset innsetting løp sikkert uten transaksjoner eller låser ved å gjøre kapasitets sjekk del av `INSERT` selv. Arrangement-nivå (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Null påvirket rader betyr "på kapasitet". Samme idiom vakt per-type innsettinger (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, antall medlemmer koblet til aktive registreringer) og per-valg mengder (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, bruker `COALESCE(SUM(quantity),0) + ? <= capacity`). Når noe som helst medlem eller valg innsetting mislykkes midt-registrering, kontrolleren rulle den delvis registrering tilbake med `deleteCascade()` og rapport som type eller valg solgt ut.

## Betalings flyt

`processRegistrationCharge` i kontrolleren er det eneste stedet registreringer berør penger, og det er en tynt klient av donerings stabelen:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisering skjer i nettleseren nøyaktig som for donasjoner (se [Donering](./giving)) — tryllstaven gjenbruk apphelper betalings leverandør registeret, så innloggede medlemmer kan betale med lagret kort og gjester tokeniserer ett nytt kort. Kontrolleren speiler `DonateController`'s leverandør særheter (Kingdom Funding `pm-{id}` betalings-metode ids, Stripe SCA `requires_action` respons returnert til klienten uten å registrere ein betaling). Ein vellykket lading skriv ein `registrationPayments` rad, bump `amountPaid`, og bekrefter registreringen. **Refunsjoner er ikke implementert** — en avbrutt betalt registrering holder sin betalings rader og noe som helst refusjon blir håndtert ut-av-bånd i gateway instrumentbrettet.

Begge innsettepunkter rute gjennom samme kode sti: `register` (betaling på påmelding) og `pay` (saldo betaling / venteliste fullføring).

## Venteliste livssyklus

Når arrangement er fullt og arrangement sin `waitlistEnabled` flagg er på, `register` lagrer partiet som `waitlisted` (hoppes kapasitets sjekk) og sender normal bekreftelse e-post merket som ein venteliste spot. Promotering skjer tre måter — `cancel`, `delete`, og stab `promote` endepunkt — alle trakt inn i `RegistrationRepo.promoteFromWaitlist`, som plukker eldste venteliste rad og flip det atomisk:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…aktiv antall for arrangement…) < ?
```

Den `status='waitlisted'` vakt betyr samtidig promoterering kan ikke dobbel-promot ein rad, og kapasitets underforespørsel betyr en promotering kan ikke oversalg. Promoverte rader lande på `pending` — ikke `confirmed` — fordi ein saldo kanskje fortsatt skyldes; `RegistrationHelper.sendWaitlistAvailabilityEmail` forteller registrant deres spot åpne og, når `totalAmount − amountPaid > 0`, lenke til kompletter-betaling side. Betaling (eller å ha keine saldo) bekrefter dem.

:::info
Ein kapasitets raising gjør ikke auto-promot av seg selv — stab bruk roster promotering handling etter å heve kapasitet. Avbrytelse og sletting promot automatisk.
:::

## Klient flater

- **B1App tryllstav** — en delt krok, `B1App/src/components/registration/useEventRegistration.ts`, kjør begge nettsted komponent (`components/registration/EventRegister.tsx`) og mobil portal skjerm (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) gjennom trinn `info → members → selections → questions → payment → confirm` (midten trinn gjengivelse bare når arrangement har valg, ein vedlagt forma, eller ein nonzero total). Info/medlemmer trinn vise per-deltager-type velgere med live gjenværende-kapasitet og solgt-ut tilstand; betaling (`RegistrationPaymentForm.tsx`) vise orden oppsummering, rabatt-kode innsetting, og — for innloggede medlemmer — lagret betalings metoder via apphelper leverandør registrering, med gjester tokenisering ein nytt kort. Den **registreringer** mobil skjerm (`screens/RegistrationsPage.tsx`) er mine registreringer: status, saldo skyldig, Fullfør betaling (`POST /:id/pay`), Redigering (`PUT /:id` — kontakt, medlem typer, valg mengder), og Avbryt.
- **B1Admin innstillinger** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` legger til Aktiver venteliste bryter pluss akkordioner for deltager typer, valg, og rabatt koder (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), alle CRUD mot `/types`, `/selections`, `/coupons` rutene.
- **B1Admin liste** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-deltager type kolonne, betalt/totalt kolonne med saldo chip, per-type antall chip, ein betalings detalj dialog (`RegistrationDetailDialog.tsx`, fra `GET /payments/:registrationId`), venteliste promot rad handling, og CSV eksport inkludert deltager typer, valg, betalt/totalt/saldo, og spørsmål svar.

Kors-modul oppslag (løsning eller opprettelse gjest person, lasting kirke for e-poster) går gjennom `getMembershipModuleGateway()` — innhold modulen aldri leser medlemskaps tabeller direkte.

## Relaterte sider

- [Donering](./giving) — gateway abstraksjon, leverandør registrering, og tokenisering modell denne funksjon gjenbruk
- [Innhold endepunkter](../api/endpoints/content) — innhold modulen REST flate
- [Webhooks](../api/webhooks) — `registration.created` hendelsen
- [Modul struktur](../api/module-structure) — hvordan innhold modulen er organisert server-side
