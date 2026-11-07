---
title: "Begivenhedstilmeldinger"
---

# Begivenhedstilmeldinger

<div class="article-intro">

Den indbyggede begivenhedstilmelding findes i content-modulet og har, siden bølgen med betalte tilmeldinger, en fuld kommerciel model: prissatte deltagertyper, prissatte tilvalg, rabatkoder, betalinger gennem kirkens eksisterende giver-gateway og en statusdrevet venteliste. Betalingsflowet genbruger bevidst giving-stakken. Tilmeldingscontrolleren opkræver gennem samme `GatewayService` / `IGatewayProvider`-abstraktion, som er dokumenteret under [Giving](./giving), så der hverken findes kortdata eller gateway-SDK-viden i content-modulet. Denne side beskriver datamodellen, prisfastsættelses- og kapacitetsreglerne samt flowene for tilmelding, betaling og venteliste.

</div>

## Oversigt

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (medlemsportal)        │            │ Api — content-modul                         │
│  tilmeldingsguide ·          │   HTTPS    │  RegistrationController                     │
│  Mine tilmeldinger           │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (serverpriser)   │
│ B1Admin (medarbejdere)       │            │  RegistrationHelper (e-mails)               │
│  indstillinger for tilmelding│            └───────────────┬─────────────────────────────┘
│  · deltagerliste · CSV-eksport│                           │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ fælles gateway-abstraktion (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regler gælder på tværs af hele stakken:

1. **Serveren bestemmer prisen.** Klienter sender type-id'er, tilvalgs-id'er og antal. `RegistrationPricingHelper.computeTotal()` beregner totalen på serveren, og rabatkoder valideres igen på betalingstidspunktet. Et beløb sendt fra klienten stoles aldrig på.
2. **Kapacitet håndhæves atomisk ved indsættelse.** Hver indsættelse med kapacitetsgrænse bruger en `INSERT … SELECT … FROM dual WHERE (antal aktive rækker) < kapacitet`-sætning, så to samtidige tilmeldinger ikke kan få den sidste plads. Antal udledes af status (`pending`/`confirmed`) og gemmes aldrig som et tal.
3. **Betalinger kører på giving-sporet.** `RegistrationController` kalder den fælles `GatewayService.processCharge` med kirkens konfigurerede gateway. Det er samme udbyderabstraktion, tokeniseringsmodel og SCA-håndtering som ved donationer.

## Datamodel (`Api/src/modules/content`)

Modellerne ligger i `models/Registration.ts`, tabelmappingerne i `db/DatabaseTypes.ts`, og der er ét repository pr. tabel under `repositories/`.

| Tabel | Betydning | Nøglefelter |
|-------|-----------|-------------|
| `registrations` | Én tilmelding (én husstand/gruppe til én begivenhed) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Én deltager på en tilmelding | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Deltagertyper pr. begivenhed (f.eks. Voksen / Barn) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Navngivne tilvalg med en pris (f.eks. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (loft pr. tilmelding), sort, active |
| `registrationSelectionChoices` | Antal af et tilvalg valgt af en tilmelding/deltager | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Én vellykket opkrævning på en tilmelding | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabatkoder pr. begivenhed | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Bemærkninger:

- **Der findes ingen ventelistetabel.** Ventelistede grupper er rækker i `registrations` med `status = 'waitlisted'`. Hele ventelistens livscyklus er statusovergange på den ene tabel.
- **Ingen gemte tællere.** "Solgt"- og "brugt"-antal (begivenhedskapacitet, kapacitet pr. type, kapacitet pr. tilvalg, brug af kuponer) beregnes med korrelerede underforespørgsler over rækker, hvis status er i `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Når en tilmelding annulleres, frigives kapaciteten derfor uden nogen bogføring.
- Priser er MySQL DECIMAL-kolonner (strenge over netværket), som konverteres med `Number()` inde i prisberegningshjælperen.

## REST-overflade

Alt ligger under `/content/registrations` (`controllers/RegistrationController.ts`) og er styret af `Permissions.registrations` (`view` / `edit`):

| Rute | Adgang | Formål |
|------|--------|--------|
| `POST /register` | anonym | Fuld indsendelse: gæst, medlem eller medarbejders Tilføj deltager; serverpriser, kapacitetstjek, valgfri opkrævning |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | offentlig | Typer/tilvalg med afledt `used` / `remainingCapacity` til guiden |
| `POST /types`, `DELETE /types/:id` (samme for `/selections`, `/coupons`) | `registrations.edit` | CRUD til medarbejderindstillinger |
| `POST /coupons/validate` | offentlig | Validering af rabatkode direkte i guiden |
| `GET /coupons/event/:eventId` | medarbejder | Kuponer med antal anvendelser |
| `GET /event/:eventId` · `GET /event/:eventId/count` | medarbejder · offentlig | Deltagerliste; antal aktive til visning af kapacitet |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | godkendt bruger | Mine tilmeldinger, detaljer, betalingshistorik |
| `PUT /:id` | ejer/medarbejder | Redigering efter indsendelse — erstatter deltagere og tilvalgsvalg med friske atomiske kapacitetstjek og genberegner `totalAmount`; opkræver eller refunderer aldrig automatisk |
| `POST /:id/pay` | ejer | "Fuldfør betaling": opkræver `totalAmount − amountPaid` og ændrer `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | medarbejder | Manuel forfremmelse fra venteliste |
| `POST /:id/cancel` · `DELETE /:id` | ejer · medarbejder | Annullering / sletning; begge udløser automatisk forfremmelse fra venteliste |

En eksisterende, ikke-annulleret tilmelding for samme `personId` på samme begivenhed afvises med 409, og hver oprettet tilmelding sender en `registration.created`-webhook via `WebhookDispatcher`.

## Priser og rabatkoder

`helpers/RegistrationPricingHelper.ts` er den eneste autoritet for pengeberegningerne:

- `computeTotal()` lægger hver deltagers typepris sammen med `pris × antal` for hvert tilvalgsvalg.
- `validateCoupon()` håndhæver aktiv-flag, datointerval (`startDate`/`endDate`), `minMembers` i forhold til den indsendte gruppestørrelse og `maxUses` i forhold til det statusafledte antal indløsninger.
- `applyDiscount()` — `percent` trækker `total × value/100` fra; `amount` trækker `value` fra; begge sætter bunden til nul.

Guiden kalder `POST /coupons/validate` for feedback undervejs, men `register` validerer og anvender kuponen igen på serveren. Klientens viste total er kun vejledende.

## Det atomiske kapacitetsmønster

Hver indsættelse med kapacitetsgrænse kører sikkert uden transaktioner eller låse, fordi kapacitetstjekket indgår i selve `INSERT`'en. På begivenhedsniveau (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nul berørte rækker betyder "fuldt booket". Det samme mønster bruges til indsættelser pr. type (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, som tæller deltagere joinet til aktive tilmeldinger) og til antal pr. tilvalg (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, der bruger `COALESCE(SUM(quantity),0) + ? <= capacity`). Hvis en indsættelse af deltager eller tilvalg fejler midt i en tilmelding, ruller controlleren den delvise tilmelding tilbage med `deleteCascade()` og oplyser, hvilken type eller hvilket tilvalg der er udsolgt.

## Betalingsflow

`processRegistrationCharge` i controlleren er det eneste sted, hvor tilmeldinger rører ved penge, og det er en tynd klient af giving-stakken:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisering sker i browseren nøjagtig som ved donationer (se [Giving](./giving)). Guiden genbruger apphelper-betalingsudbyderregistret, så indloggede medlemmer kan betale med gemte kort, og gæster tokeniserer et nyt kort. Controlleren spejler `DonateController`s udbyder-særheder (Kingdom Funding `pm-{id}`-betalingsmetode-id'er, Stripe SCA-svar med `requires_action`, som returneres til klienten uden at registrere en betaling). En vellykket opkrævning skriver en `registrationPayments`-række, øger `amountPaid` og bekræfter tilmeldingen. **Refusioner er ikke implementeret.** En annulleret betalt tilmelding beholder sine betalingsrækker, og eventuelle refusioner håndteres uden for systemet i gatewayens dashboard.

Begge indgangspunkter går gennem samme kodesti: `register` (betaling ved tilmelding) og `pay` (restbetaling / fuldførelse af venteliste).

`register` springer opkrævningen over i to tilfælde og gemmer tilmeldingen som `pending` med `amountPaid = 0`, så hele totalen står som restbeløb til betaling:

- **Medarbejders Tilføj deltager.** Body'en indeholder et `personId`, der ikke er kalderens, ingen `guestInfo`, og kalderen har `registrations.edit` i den pågældende kirke. Personen skal eksistere (ellers 404), husstandsmedlemsfilteret omgås, og der opkræves intet kort.
- **Ingen gateway.** Kirken har ingen giver-gateway (`hasGateway` tjekker `gateway.loadAll`). B1App-betalingstrinnet viser **Tilmeld og betal senere** i stedet for en kortformular.

Gæster (uden `au.id`) med betalte tilmeldinger skal medsende et `captchaPass` fra `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (nu i `shared/helpers`) køres lige før opkrævningen, så tilmeldinger til venteliste og gratis tilmeldinger ikke påvirkes. Når `CAPTCHA_ENFORCE=true`, og passet mangler eller er ugyldigt, rulles den nye tilmelding tilbage med `deleteCascade()`, og kaldet returnerer 403. B1Apps `RegistrationPaymentForm` viser reCAPTCHA-afkrydsningsfeltet for gæster og sender passet med både kortgemningen og tilmeldingen.

## Ventelistens livscyklus

Når begivenheden er fuld, og begivenhedens `waitlistEnabled`-flag er slået til, gemmer `register` gruppen som `waitlisted` (springer kapacitetstjekket over) og sender den almindelige bekræftelses-e-mail markeret som en venteliste-plads. Forfremmelse sker på tre måder: `cancel`, `delete` og medarbejder-endpointet `promote`. Alle lander i `RegistrationRepo.promoteFromWaitlist`, som vælger den ældste ventelistede række og ændrer den atomisk:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…aktivt antal for begivenheden…) < ?
```

Vagten `status='waitlisted'` sikrer, at samtidige forfremmelser ikke kan forfremme samme række to gange, og underforespørgslen om kapacitet sikrer, at en forfremmelse ikke kan overbooke. Forfremmede rækker lander på `pending` og ikke `confirmed`, fordi der stadig kan skyldes et beløb. `RegistrationHelper.sendWaitlistAvailabilityEmail` fortæller den tilmeldte, at der er blevet ledig plads. Hvis `totalAmount − amountPaid > 0`, linker mailen til kirkens B1-side `/mobile/registrations` (Mine tilmeldinger), som bygges ud fra `B1AppRoot` og kirkens underdomæne. Ved betaling (eller hvis der ikke er et restbeløb) bekræftes personen.

:::info
En forhøjelse af kapaciteten forfremmer ikke automatisk af sig selv. Medarbejdere bruger handlingen Forfrem på deltagerlisten efter at have forhøjet kapaciteten. Annulleringer og sletninger forfremmer automatisk.
:::

## Klientflader

- **B1App-guiden** — én fælles hook, `B1App/src/components/registration/useEventRegistration.ts`, driver både webstedskomponenten (`components/registration/EventRegister.tsx`) og mobilportalens skærm (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) gennem trinene `info → members → selections → questions → payment → confirm`. De midterste trin vises kun, når begivenheden har tilvalg, et tilknyttet formular eller en total forskellig fra nul. Trinene info/deltagere viser vælgere pr. deltagertype med live resterende kapacitet og udsolgt-status. Betalingstrinnet (`RegistrationPaymentForm.tsx`) viser ordreoversigten, indtastning af rabatkode og — for indloggede medlemmer — gemte betalingsmetoder via apphelper-udbyderregistret, mens gæster tokeniserer et nyt kort. Mobilskærmen **Tilmeldinger** (`screens/RegistrationsPage.tsx`) er Mine tilmeldinger: status, restbeløb til betaling, Fuldfør betaling (`POST /:id/pay`), Rediger (`PUT /:id` — kontaktoplysninger, medlemstyper, antal pr. tilvalg) og Annuller.
- **B1Admin-indstillinger** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` tilføjer kontakten Aktiver venteliste samt accordions for Deltagertyper, Tilvalg og Rabatkoder (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Alle er CRUD mod ruterne `/types`, `/selections` og `/coupons`.
- **B1Admin-deltagerliste** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: kolonnen Type pr. deltager, kolonnen Betalt/Total med saldo-chip, antal-chips pr. type, en dialog med betalingsdetaljer (`RegistrationDetailDialog.tsx`, fra `GET /payments/:registrationId`), handlingen Forfrem fra venteliste samt CSV-eksport med deltagertyper, tilvalg, betalt/total/saldo og spørgsmålssvar.

Opslag på tværs af moduler (oprettelse eller opslag af gæsteperson, indlæsning af kirken til e-mails) går gennem `getMembershipModuleGateway()`. Content-modulet læser aldrig medlemskabstabeller direkte.

## Relaterede sider

- [Giving](./giving) — gateway-abstraktionen, udbyderregistret og tokeniseringsmodellen, som denne funktion genbruger
- [Content-endpoints](../api/endpoints/content) — content-modulets REST-overflade
- [Webhooks](../api/webhooks) — begivenheden `registration.created`
- [Modulstruktur](../api/module-structure) — hvordan content-modulet er organiseret på serversiden
