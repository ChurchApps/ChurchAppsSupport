---
title: "Evenemangsregistreringar"
---

# Evenemangsregistreringar

<div class="article-intro">

Inbyggd evenemangsregistrering finns i innehållsmodulen och har sedan betalda registreringar-vågen en komplett handelsmodell: prissatta deltagartyper, prissatta tilläggsval, rabattkoder, betalningar via kyrkans befintliga givandegateway samt en statusstyrd väntelista. Betalningsvägen återanvänder avsiktligt givandestacken. Registreringskontrollern debiterar via samma `GatewayService` / `IGatewayProvider`-abstraktion som beskrivs i [Givande](./giving), så varken kortdata eller kunskap om gateway-SDK:er finns i innehållsmodulen. Den här sidan beskriver datamodellen, reglerna för priser och kapacitet samt flödena för registrering, betalning och väntelista.

</div>

## Översikt

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (medlemsportal)        │            │ Api — innehållsmodul                        │
│  registreringsguide ·        │   HTTPS    │  RegistrationController                     │
│  Mina registreringar         │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (serverpriser)   │
│ B1Admin (personal)           │            │  RegistrationHelper (e-post)                │
│  inställningar för evenemangs│            └───────────────┬─────────────────────────────┘
│  registrering · deltagarlista│                            │ processCharge
│  · CSV-export                │                            ▼
└──────────────────────────────┘            ┌─────────────────────────────────────────────┐
                                            │ delad gateway-abstraktion (givande)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tre regler gäller genom hela stacken:

1. **Servern äger priset.** Klienter skickar typ-id:n, val-id:n och antal. `RegistrationPricingHelper.computeTotal()` beräknar totalsumman på servern, och kuponger valideras på nytt vid debitering. Ett belopp från klienten litar man aldrig på.
2. **Kapaciteten upprätthålls atomärt vid insättning.** Varje kapacitetsbegränsad insättning använder en `INSERT … SELECT … FROM dual WHERE (antal aktiva rader) < kapacitet`-sats, så att två samtidiga registreringar inte kan ta den sista platsen. Antalen härleds från status (`pending`/`confirmed`) och lagras aldrig.
3. **Betalningar går via givandespåren.** `RegistrationController` anropar den delade `GatewayService.processCharge` med kyrkans konfigurerade gateway. Det är samma leverantörsabstraktion, tokeniseringsmodell och SCA-hantering som för donationer.

## Datamodell (`Api/src/modules/content`)

Modellerna finns i `models/Registration.ts`, tabellmappningarna i `db/DatabaseTypes.ts`, och det finns en repo per tabell under `repositories/`.

| Tabell | Betydelse | Nyckelfält |
|--------|-----------|-----------|
| `registrations` | En registrering (ett hushåll/en grupp för ett evenemang) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | En deltagare i en registrering | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Deltagartyper per evenemang (t.ex. vuxen / barn) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Namngivna tilläggsval med pris (t.ex. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (tak per registrering), sort, active |
| `registrationSelectionChoices` | Antal av ett val som valts av en registrering/deltagare | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | En lyckad debitering mot en registrering | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Rabattkoder per evenemang | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Anmärkningar:

- **Det finns ingen väntelistetabell.** Väntelistade grupper är `registrations`-rader med `status = 'waitlisted'`. Hela väntelistans livscykel består av statusövergångar i den tabellen.
- **Inga lagrade räknare.** "Sålda"- och "använda"-antal (evenemangskapacitet, kapacitet per typ, kapacitet per val och kuponganvändningar) beräknas med korrelerade underfrågor över rader vars status ingår i `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Att avbryta en registrering frigör därför kapacitet utan någon bokföring.
- Priser är MySQL DECIMAL-kolumner (strängar över nätverket) som konverteras med `Number()` inuti prisberäkningshjälpen.

## REST-gränssnitt

Allt ligger under `/content/registrations` (`controllers/RegistrationController.ts`) och skyddas av `Permissions.registrations` (`view` / `edit`):

| Rutt | Åtkomst | Syfte |
|------|---------|-------|
| `POST /register` | anonym | Fullständig inlämning: gäst, medlem eller personal via Lägg till deltagare. Serverprissättning, kapacitetskontroller och eventuell debitering |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | publik | Typer och val med härlett `used` / `remainingCapacity` för guiden |
| `POST /types`, `DELETE /types/:id` (samma för `/selections` och `/coupons`) | `registrations.edit` | CRUD för personalens inställningar |
| `POST /coupons/validate` | publik | Validering av rabattkod direkt i guiden |
| `GET /coupons/event/:eventId` | personal | Kuponger med antal användningar |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personal · publik | Deltagarlista; antal aktiva för visning av kapacitet |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | inloggad | Mina registreringar, detaljer, betalningshistorik |
| `PUT /:id` | ägare/personal | Redigering efter inlämning. Ersätter deltagare och valkval med nya atomära kapacitetskontroller och räknar om `totalAmount`. Debiterar eller återbetalar aldrig automatiskt |
| `POST /:id/pay` | ägare | "Slutför betalning": debiterar `totalAmount − amountPaid` och ändrar `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | personal | Manuell flytt från väntelistan |
| `POST /:id/cancel` · `DELETE /:id` | ägare · personal | Avbryt / ta bort. Båda utlöser automatisk uppflyttning från väntelistan |

En befintlig registrering för samma `personId` på samma evenemang som inte är avbruten avvisas med 409. Varje skapad registrering skickar dessutom ett `registration.created`-webhook-meddelande via `WebhookDispatcher`.

## Priser och rabattkoder

`helpers/RegistrationPricingHelper.ts` är den enda auktoriteten för beräkningar av pengar:

- `computeTotal()` summerar varje deltagares typpris plus varje valvals `pris × antal`.
- `validateCoupon()` kontrollerar aktiv-flaggan, datumintervallet (`startDate`/`endDate`), `minMembers` mot antalet deltagare i inlämningen samt `maxUses` mot det statusbaserade antalet inlösningar.
- `applyDiscount()`: `percent` drar av `total × value/100`, `amount` drar av `value`. Båda går inte under noll.

Guiden anropar `POST /coupons/validate` för direkt återkoppling, men `register` validerar och tillämpar kupongen på nytt på servern. Den totalsumma som klienten visar är därför endast vägledande.

## Det atomära kapacitetsmönstret

Varje kapacitetsbegränsad insättning hanteras säkert vid samtidighet utan transaktioner eller lås, eftersom kapacitetskontrollen ingår i själva `INSERT`-satsen. På evenemangsnivå (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Noll påverkade rader betyder "fullbokat". Samma mönster skyddar insättningar per typ (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, som räknar deltagare kopplade till aktiva registreringar) och antal per val (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, som använder `COALESCE(SUM(quantity),0) + ? <= capacity`). Om någon insättning av deltagare eller val misslyckas mitt i en registrering, rullar kontrollern tillbaka den delvisa registreringen med `deleteCascade()` och anger vilken typ eller vilket val som är slutsålt.

## Betalningsflöde

`processRegistrationCharge` i kontrollern är det enda stället där registreringar hanterar pengar, och den är en tunn klient mot givandestacken:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisering sker i webbläsaren precis som för donationer (se [Givande](./giving)). Guiden återanvänder apphelper-registret för betalningsleverantörer, så inloggade medlemmar kan betala med sparade kort och gäster tokeniserar ett nytt kort. Kontrollern speglar `DonateController`:s särdrag för leverantörer (Kingdom Funding-betalmetods-id:n `pm-{id}` samt Stripe SCA-svar `requires_action`, som returneras till klienten utan att någon betalning registreras). En lyckad debitering skriver en rad i `registrationPayments`, ökar `amountPaid` och bekräftar registreringen. **Återbetalningar är inte implementerade.** En avbruten betald registrering behåller sina betalningsrader, och eventuella återbetalningar hanteras utanför systemet i gatewayns instrumentpanel.

Båda ingångspunkterna använder samma kodväg: `register` (betalning vid anmälan) och `pay` (betalning av restbelopp eller slutförande från väntelistan).

`register` hoppar över debiteringen i två fall och sparar registreringen som `pending` med `amountPaid = 0`, så att hela totalbeloppet står kvar som skuld:

- **Personal lägger till deltagare.** Begäran innehåller ett `personId` som inte är anroparens, ingen `guestInfo`, och anroparen har `registrations.edit` i den kyrkan. Personen måste finnas (annars 404), hushållsfiltret för medlemmar kringgås, och inget debiteras.
- **Ingen gateway.** Kyrkan har ingen givandegateway (`hasGateway` kontrollerar `gateway.loadAll`). Betalningssteget i B1App visar **Registrera och betala senare** i stället för ett kortformulär.

Gäster (utan `au.id`) med prissatta registreringar måste skicka med ett `captchaPass` från `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (nu i `shared/helpers`) körs strax före debiteringen, så väntelista- och gratisregistreringar påverkas inte. När `CAPTCHA_ENFORCE=true` och passet saknas eller är ogiltigt rullas den nya registreringen tillbaka med `deleteCascade()`, och anropet returnerar 403. `RegistrationPaymentForm` i B1App visar reCAPTCHA-kryssrutan för gäster och skickar med passet både vid kortsparandet och vid registreringen.

## Väntelistans livscykel

När evenemanget är fullt och flaggan `waitlistEnabled` är aktiverad i evenemanget sparar `register` gruppen som `waitlisted` (utan kapacitetskontroller) och skickar den vanliga bekräftelsen markerad som väntelisteplats. Uppflyttning sker på tre sätt: `cancel`, `delete` och personalens `promote`-endpoint. Alla leder till `RegistrationRepo.promoteFromWaitlist`, som väljer den äldsta väntelistade raden och ändrar den atomärt:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Villkoret `status='waitlisted'` gör att samtidiga uppflyttningar inte kan flytta upp samma rad två gånger, och kapacitetsunderfrågan gör att en uppflyttning inte kan överboka. Uppflyttade rader hamnar som `pending`, inte `confirmed`, eftersom ett restbelopp kan fortfarande vara utestående. `RegistrationHelper.sendWaitlistAvailabilityEmail` meddelar den anmälde att platsen har blivit ledig. Om `totalAmount − amountPaid > 0` länkar mailet till kyrkans B1-sida `/mobile/registrations` (Mina registreringar), som byggs från `B1AppRoot` och kyrkans subdomän. Betalning (eller att det inte finns något saldo) bekräftar platsen.

:::info
En höjning av kapaciteten flyttar inte upp någon automatiskt. Personalen använder åtgärden Flytta upp i deltagarlistan efter att ha höjt kapaciteten. Avbokningar och borttagningar flyttar upp automatiskt.
:::

## Klientgränssnitt

- **B1App-guiden:** en delad hook, `B1App/src/components/registration/useEventRegistration.ts`, styr både webbplatskomponenten (`components/registration/EventRegister.tsx`) och skärmen i mobilportalen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) genom stegen `info → members → selections → questions → payment → confirm`. De mellersta stegen visas endast när evenemanget har val, ett kopplat formulär eller en totalsumma skild från noll. Steg för information och deltagare visarväljare per deltagartyp med kapacitet kvar i realtid och status för slutsåld. Betalningssteget (`RegistrationPaymentForm.tsx`) visar orderöversikten, inmatning av rabattkod och, för inloggade medlemmar, sparade betalningsmetoder via apphelper-registret för betalningsleverantörer. Gäster tokeniserar ett nytt kort. Skärmen **Registreringar** i mobilen (`screens/RegistrationsPage.tsx`) är Mina registreringar: status, utestående belopp, Slutför betalning (`POST /:id/pay`), Redigera (`PUT /:id`, det vill säga kontaktuppgifter, medlemstyper och antal per val) samt Avbryt.
- **B1Admin-inställningar:** `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` innehåller reglaget Aktivera väntelista samt expanderbara sektioner för Deltagartyper, Val och Rabattkoder (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Alla är CRUD mot rutterna `/types`, `/selections` och `/coupons`.
- **B1Admin-deltagarlista:** `B1Admin/src/registrations/RegistrationDetailsPage.tsx` visar en kolumn för typ per deltagare, kolumnen Betalt/Totalt med ett saldomärke, antalsmärken per typ, en dialog med betalningsdetaljer (`RegistrationDetailDialog.tsx`, från `GET /payments/:registrationId`), åtgärden Flytta upp för väntelistan samt CSV-export med deltagartyper, val, betalt/totalt/saldo och svar på frågor.

Uppslag över moduler (att hitta eller skapa gästens person och hämta kyrkan för e-post) går via `getMembershipModuleGateway()`. Innehållsmodulen läser aldrig medlemstabellerna direkt.

## Relaterade sidor

- [Givande](./giving): gateway-abstraktionen, leverantörsregistret och tokeniseringsmodellen som den här funktionen återanvänder
- [Content-endpoints](../api/endpoints/content): innehållsmodulens REST-gränssnitt
- [Webhooks](../api/webhooks): händelsen `registration.created`
- [Modulstruktur](../api/module-structure): hur innehållsmodulen är organiserad på serversidan
