---
title: "Evenementinschrijvingen"
description: "Hoe evenementinschrijvingen werken in B1 Admin en B1App: deelnemertypen, betaalde add-ons, kortingscodes, betalingen en wachtlijsten."
---

# Evenementinschrijvingen

<div class="article-intro">

Inschrijvingen voor evenementen via de app zitten in de contentmodule en hebben sinds de golf met betaalde inschrijvingen een volledig handelsmodel: deelnemerstypen met prijs, optionele extra's met prijs, kortingscodes, betalingen via de bestaande giftengateway van de kerk, en een op status gebaseerde wachtlijst. De betaalroute hergebruikt bewust de giftenstack. De inschrijvingscontroller rekent af via dezelfde `GatewayService` / `IGatewayProvider`-abstractie die is beschreven in [Geven](./giving.md), zodat er in de contentmodule geen kaartgegevens of gateway-SDK-kennis aanwezig is. Deze pagina beschrijft het datamodel, de prijs- en capaciteitsregels, en de flows voor inschrijving, betaling en wachtlijst.

</div>

## Overzicht

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Drie regels gelden voor de hele stack:

1. **De server bepaalt de prijs.** Clients sturen type-id's, selectie-id's en aantallen. `RegistrationPricingHelper.computeTotal()` berekent het totaal server-side, en kortingscodes worden opnieuw gevalideerd op het moment van afrekenen. Een door de client opgegeven bedrag wordt nooit vertrouwd.
2. **Capaciteit wordt atomair afgedwongen op het moment van invoegen.** Elke invoeging met een capaciteitslimiet gebruikt een `INSERT … SELECT … FROM dual WHERE (aantal actieve rijen) < capaciteit`-statement, zodat twee gelijktijdige inschrijvingen niet allebei de laatste plek kunnen krijgen. Aantallen worden afgeleid van de status (`pending`/`confirmed`) en nooit opgeslagen.
3. **Betalingen lopen via de giftenrails.** `RegistrationController` roept de gedeelde `GatewayService.processCharge` aan met de geconfigureerde gateway van de kerk. Dit is dezelfde providerabstractie, hetzelfde tokenisatiemodel en dezelfde SCA-afhandeling als bij donaties.

## Datamodel (`Api/src/modules/content`)

Modellen staan in `models/Registration.ts`, tabelkoppelingen in `db/DatabaseTypes.ts`, en per tabel is er één repository onder `repositories/`.

| Tabel | Betekenis | Belangrijkste velden |
|-------|-----------|----------------------|
| `registrations` | Eén inschrijving (één huishouden/groep voor één evenement) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Eén deelnemer aan een inschrijving | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Deelnemerstypen per evenement (bijv. Volwassene / Kind) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Benoemde extra opties met prijs (bijv. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (maximum per inschrijving), sort, active |
| `registrationSelectionChoices` | Aantal van een selectie dat door een inschrijving of deelnemer is gekozen | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Eén geslaagde betaling voor een inschrijving | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Kortingscodes per evenement | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Opmerkingen:

- **Er is geen wachtlijsttabel.** Wachtlijstgroepen zijn `registrations`-rijen met `status = 'waitlisted'`. De hele wachtlijstcyclus bestaat uit statusovergangen op die ene tabel.
- **Geen opgeslagen tellers.** "Verkocht"- en "gebruikt"-aantallen (evenementcapaciteit, capaciteit per type, capaciteit per selectie, couponinwisselingen) worden berekend met gecorreleerde subquery's over rijen waarvan de status in `('pending','confirmed')` zit (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Een geannuleerde inschrijving maakt daardoor capaciteit vrij zonder extra administratie.
- Prijzen zijn MySQL DECIMAL-kolommen (strings over de lijn), die binnen de prijshelper met `Number()` worden omgezet.

## REST-interface

Alles staat onder `/content/registrations` (`controllers/RegistrationController.ts`) en is afgeschermd door `Permissions.registrations` (`view` / `edit`):

| Route | Toegang | Doel |
|-------|---------|------|
| `POST /register` | anoniem | Volledige indiening: gast, lid, of door een medewerker toegevoegde deelnemer; serverprijzen, capaciteitscontroles, optionele betaling |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | openbaar | Typen en selecties met afgeleide `used` / `remainingCapacity` voor de wizard |
| `POST /types`, `DELETE /types/:id` (idem voor `/selections`, `/coupons`) | `registrations.edit` | CRUD-instellingen voor medewerkers |
| `POST /coupons/validate` | openbaar | Directe validatie van kortingscodes tijdens de wizard |
| `GET /coupons/event/:eventId` | medewerker | Kortingscodes met gebruiksaantallen |
| `GET /event/:eventId` · `GET /event/:eventId/count` | medewerker · openbaar | Deelnemerslijst; aantal actieve inschrijvingen voor de capaciteitsweergave |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | ingelogd | Mijn inschrijvingen, details, betalingsgeschiedenis |
| `PUT /:id` | eigenaar/medewerker | Bewerken na indiening: vervangt deelnemers en selectiekeuzes met verse atomische capaciteitscontroles, en herberekent `totalAmount`. Laadt nooit automatisch af en restitueert nooit. |
| `POST /:id/pay` | eigenaar | "Betaling voltooien": rekent `totalAmount − amountPaid` af en zet `waitlisted`/`pending` om naar `confirmed` |
| `POST /:id/promote` | medewerker | Handmatige promotie vanaf de wachtlijst |
| `POST /:id/cancel` · `DELETE /:id` | eigenaar · medewerker | Annuleren of verwijderen; beide activeren automatische promotie vanaf de wachtlijst |

Een bestaande, niet-geannuleerde inschrijving voor dezelfde `personId` op hetzelfde evenement wordt afgewezen met een 409. Elke aangemaakte inschrijving stuurt een `registration.created`-webhook via `WebhookDispatcher`.

## Prijzen en kortingscodes

`helpers/RegistrationPricingHelper.ts` is de enige autoriteit voor geldberekeningen:

- `computeTotal()` telt de typeprijs van elke deelnemer op, plus `prijs × aantal` van elke selectiekeuze.
- `validateCoupon()` controleert de actieve vlag, het datumvenster (`startDate`/`endDate`), `minMembers` ten opzichte van de grootte van de ingediende groep, en `maxUses` ten opzichte van het aantal inwisselingen dat uit de status wordt afgeleid.
- `applyDiscount()`: `percent` trekt `total × value/100` af; `amount` trekt `value` af. Beide worden afgerond op nul.

De wizard roept `POST /coupons/validate` aan voor directe feedback, maar `register` valideert de code opnieuw en past deze server-side opnieuw toe. Het totaal dat de client toont is alleen indicatief.

## Het atomische capaciteitspatroon

Elke invoeging met een capaciteitslimiet is veilig tegen race conditions, zonder transacties of locks, doordat de capaciteitscontrole deel uitmaakt van de `INSERT` zelf. Op evenementniveau (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nul geraakte rijen betekent "vol". Hetzelfde patroon beveiligt invoegingen per type (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, dat leden telt die gekoppeld zijn aan actieve inschrijvingen) en per selectiehoeveelheid (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, met `COALESCE(SUM(quantity),0) + ? <= capacity`). Wanneer een invoeging van een deelnemer of selectie halverwege de inschrijving mislukt, draait de controller de gedeeltelijke inschrijving terug met `deleteCascade()` en meldt welk type of welke selectie is uitverkocht.

## Betalingsflow

`processRegistrationCharge` in de controller is de enige plek waar inschrijvingen met geld in aanraking komen. Het is een dunne client van de giftenstack:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenisatie gebeurt in de browser precies zoals bij donaties (zie [Geven](./giving.md)). De wizard hergebruikt het apphelper-providerregister, zodat ingelogde leden met opgeslagen kaarten kunnen betalen en gasten een nieuwe kaart kunnen tokeniseren. De controller volgt de providerspecifieke eigenaardigheden van `DonateController`: Kingdom Funding `pm-{id}`-betaalmethode-id's (`` `pm-{id}` ``) en Stripe SCA-`requires_action`-antwoorden die naar de client worden teruggestuurd zonder dat er een betaling wordt vastgelegd. Een geslaagde betaling schrijft een `registrationPayments`-rij, verhoogt `amountPaid` en bevestigt de inschrijving. **Terugbetalingen zijn niet geïmplementeerd.** Een geannuleerde betaalde inschrijving behoudt zijn betalingsrijen, en eventuele terugbetaling wordt buiten het systeem om afgehandeld via het dashboard van de gateway.

Beide toegangspunten lopen via dezelfde codepad: `register` (betalen bij aanmelding) en `pay` (saldobetaling of voltooiing van de wachtlijst).

`register` slaat de betaling in twee gevallen over. De inschrijving wordt dan opgeslagen als `pending` met `amountPaid = 0`, waarbij het volledige totaal als openstaand saldo blijft staan:

- **Door een medewerker toegevoegde deelnemer.** De body bevat een `personId` dat niet van de aanroeper is, geen `guestInfo`, en de aanroeper heeft `registrations.edit` in die kerk. De persoon moet bestaan (anders 404), het filter op huishoudleden wordt omzeild, en er wordt niets afgeschreven.
- **Geen gateway.** De kerk heeft geen giftengateway (`hasGateway` controleert `gateway.loadAll`). De betaalstap in B1App toont **Nu registreren, later betalen** in plaats van een kaartformulier.

Gastinschrijvingen (zonder `au.id`) met een prijs moeten een `captchaPass` meesturen, afkomstig van `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (nu in `shared/helpers`) wordt vlak voor de betaling uitgevoerd, zodat wachtlijst- en gratis inschrijvingen er niet door worden geraakt. Wanneer `CAPTCHA_ENFORCE=true` is ingesteld en de pass ontbreekt of ongeldig is, wordt de nieuwe inschrijving teruggedraaid met `deleteCascade()` en retourneert de aanroep 403. Het `RegistrationPaymentForm` van B1App toont het reCAPTCHA-vinkje aan gasten en stuurt de pass mee, zowel bij het opslaan van de kaart als bij de inschrijving.

## Wachtlijstcyclus

Wanneer het evenement vol is en de vlag `waitlistEnabled` van het evenement aanstaat, slaat `register` de groep op als `waitlisted`, waarbij de capaciteitscontroles worden overgeslagen. Vervolgens wordt de normale bevestigingsmail verstuurd, gemarkeerd als wachtlijstplek. Promotie gebeurt op drie manieren: `cancel`, `delete` en het medewerkerseindpunt `promote`. Alle drie komen uit in `RegistrationRepo.promoteFromWaitlist`, dat de oudste wachtlijstrij kiest en deze atomisch omzet:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

De `status='waitlisted'`-controle voorkomt dat gelijktijdige promoties dezelfde rij dubbel promoveren. De capaciteitssubquery voorkomt dat een promotie overboekt. Gepromoveerde rijen komen op `pending` terecht, niet op `confirmed`, omdat er mogelijk nog een saldo openstaat. `RegistrationHelper.sendWaitlistAvailabilityEmail` laat de registrant weten dat er een plek is vrijgekomen en, wanneer `totalAmount − amountPaid > 0`, verwijst het naar de B1-pagina `/mobile/registrations` van de kerk (Mijn inschrijvingen), opgebouwd vanuit `B1AppRoot` en het subdomein van de kerk. Betalen, of geen openstaand saldo hebben, bevestigt de inschrijving.

:::info
Een capaciteitsverhoging promoveert op zichzelf niet automatisch. Medewerkers gebruiken de actie Promoveren in de deelnemerslijst nadat de capaciteit is verhoogd. Annuleringen en verwijderingen promoveren automatisch.
:::

## Clientoppervlakken

- **B1App-wizard**: één gedeelde hook, `B1App/src/components/registration/useEventRegistration.ts`, stuurt zowel de websitecomponent (`components/registration/EventRegister.tsx`) als het mobiele portaalscherm (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) door de stappen `info → members → selections → questions → payment → confirm`. De middelste stappen worden alleen getoond wanneer het evenement selecties heeft, een gekoppeld formulier, of een totaal ongelijk aan nul. De info- en deelnemerstappen tonen per deelnemerstype keuzelijsten met live resterende capaciteit en uitverkochtstatus. De betaalstap (`RegistrationPaymentForm.tsx`) toont het besteloverzicht, het invoerveld voor kortingscodes en, voor ingelogde leden, opgeslagen betaalmethoden via het apphelper-providerregister. Gasten tokeniseren een nieuwe kaart. Het mobiele scherm **Inschrijvingen** (`screens/RegistrationsPage.tsx`) is Mijn inschrijvingen: met status, openstaand saldo, Betaling voltooien (`POST /:id/pay`), Bewerken (`PUT /:id`: contactgegevens, deelnemerstypen, selectiehoeveelheden) en Annuleren.
- **B1Admin-instellingen**: `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` voegt de schakelaar Wachtlijst inschakelen toe, plus accordeons voor Deelnemerstypen, Selecties en Kortingscodes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Alle drie doen CRUD tegen de routes `/types`, `/selections` en `/coupons`.
- **B1Admin-deelnemerslijst**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx`, met per deelnemer een kolom Type, een kolom Betaald/Totaal met saldochip, chips met het aantal per type, een dialoog met betaaldetails (`RegistrationDetailDialog.tsx`, van `GET /payments/:registrationId`), de rijactie Promoveren voor de wachtlijst, en CSV-export met deelnemerstypen, selecties, betaald/totaal/saldo en antwoorden op vragen.

Opzoekingen over modulegrenzen heen (het oplossen of aanmaken van de gastpersoon, het laden van de kerk voor e-mails) lopen via `getMembershipModuleGateway()`. De contentmodule leest nooit direct ledentabellen.

## Gerelateerde pagina's

- [Geven](./giving.md): de gateway-abstractie, het providerregister en het tokenisatiemodel die deze functie hergebruikt
- [Content-endpoints](../api/endpoints/content.md): de REST-interface van de contentmodule
- [Webhooks](../api/webhooks.md): het evenement `registration.created`
- [Modulestructuur](../api/module-structure.md): hoe de contentmodule server-side is georganiseerd
