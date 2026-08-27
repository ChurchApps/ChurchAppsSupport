---
title: "Event Registrations"
---

# Evento Registrations

<div class="article-intro">

Native Evento registration lives in the content module and, since the paid-registrations wave, carries a full commerce model: priced attendee types, priced Aggiungi-on selections, discount codes, payments through the church's existing giving gateway, and a status-driven waitlist. The money path deliberately reuses the giving stack — the registration controller charges through the same `GatewayService` / `IGatewayProvider` abstraction documented in [Giving](./giving), so No card data or gateway SDK knowledge lives in the content module. This page maps the data model, the pricing and Capacità rules, and the registration, payment, and waitlist flows.

</div>

## Panoramica

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

Three rules hold across the stack:

1. **The server owns the price.** Clients Invia Digita ids, selection ids, and quantities; `RegistrationPricingHelper.computeTotal()` computes the total server-side and coupons are re-validated at charge Ora. A client-supplied amount is never trusted.
2. **Capacità is enforced atomically at insert Ora.** Every Capacità-limited insert uses an `INSERT … Seleziona … FROM dual WHERE (count of Attivo rows) < Capacità` statement, so two simultaneous registrations can't both take the last spot. Counts are derived from status (`In Sospeso`/`confirmed`), never stored.
3. **Payments ride the giving rails.** `RegistrationController` calls the shared `GatewayService.processCharge` with the church's configured gateway — the same provider abstraction, tokenization model, and SCA handling as donations.

## Data model (`Api/src/modules/content`)

Models are in `models/Registration.ts`; table mappings in `db/DatabaseTypes.ts`; one repo per table under `repositories/`.

| Table | Meaning | Key fields |
|-------|---------|-----------|
| `registrations` | One registration (one household/party for one Evento) | eventId, personId, householdId, **status** (`In Sospeso` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | One attendee on a registration | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Attendee types per Evento (e.g. Adult / Child) | eventId, name, description, **price**, **Capacità**, minAgeYears, maxAgeYears, formId, sort, Attivo |
| `registrationSelections` | Named Aggiungi-on options with a price (e.g. T-shirt) | eventId, name, description, **price**, **Capacità**, **maxQuantity** (per-registration cap), sort, Attivo |
| `registrationSelectionChoices` | Quantity of a selection chosen by a registration/Membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | One successful charge against a registration | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Discount codes per Evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, Attivo |

Notes:

- **There is No waitlist table.** Waitlisted parties are `registrations` rows with `status = 'waitlisted'`; the whole waitlist lifecycle is status transitions on that one table.
- **No stored counters.** "Sold" / "used" counts (Evento Capacità, per-Digita Capacità, per-selection Capacità, coupon uses) are computed with correlated subqueries over rows whose status is in `('In Sospeso','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelling a registration therefore frees Capacità with No bookkeeping.
- Prices are MySQL DECIMAL columns (strings over the wire) coerced with `Number()` inside the pricing helper.

## REST surface

Everything is under `/content/registrations` (`controllers/RegistrationController.ts`), gated by `Permessi.registrations` (`Visualizza` / `Modifica`):

| Route | Access | Purpose |
|-------|--------|---------|
| `POST /register` | anonymous | Full submission: Ospite or Membro, server pricing, Capacità checks, Facoltativo charge |
| `GET /types/Evento/:eventId`, `GET /selections/Evento/:eventId` | public | Types/selections with derived `used` / `remainingCapacity` for the wizard |
| `POST /types`, `Elimina /types/:id` (same for `/selections`, `/coupons`) | `registrations.Modifica` | Staff Impostazioni CRUD |
| `POST /coupons/validate` | public | Inline discount-code validation during the wizard |
| `GET /coupons/Evento/:eventId` | Staff | Coupons with uses counts |
| `GET /Evento/:eventId` · `GET /Evento/:eventId/count` | Staff · public | Roster; Attivo-count for Capacità display |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, detail, payment history |
| `PUT /:id` | owner/Staff | Post-submission Modifica — replaces Membri and selection choices with fresh atomic Capacità checks, recomputes `totalAmount`; never auto-charges or refunds |
| `POST /:id/pay` | owner | "Complete payment": charges `totalAmount − amountPaid`, flips `waitlisted`/`In Sospeso` → `confirmed` |
| `POST /:id/promote` | Staff | Manual waitlist promotion |
| `POST /:id/cancel` · `Elimina /:id` | owner · Staff | Cancel / Elimina; both trigger waitlist auto-promotion |

A non-cancelled existing registration for the same `personId` on the same Evento is rejected with a 409, and each created registration emits a `registration.created` webhook via `WebhookDispatcher`.

## Pricing and discount codes

`helpers/RegistrationPricingHelper.ts` is the single money-math authority:

- `computeTotal()` sums each Membro's Digita price plus each selection choice's `price × quantity`.
- `validateCoupon()` enforces Attivo flag, Data window (`startDate`/`endDate`), `minMembers` against the submitted party size, and `maxUses` against the status-derived redemption count.
- `applyDiscount()` — `percent` subtracts `total × value/100`; `amount` subtracts `value`; both floor at zero.

The wizard calls `POST /coupons/validate` for inline feedback, but `register` re-validates and re-applies the coupon server-side — the client's displayed total is advisory only.

## The atomic Capacità idiom

Every Capacità-limited insert races safely without transactions or locks by making the Capacità check part of the `INSERT` itself. Evento-level (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero affected rows means "at Capacità". The same idiom guards per-Digita inserts (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, counting Membri joined Per Attivo registrations) and per-selection quantities (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, using `COALESCE(SUM(quantity),0) + ? <= Capacità`). When any Membro or selection insert fails mid-registration, the controller rolls the partial registration Indietro with `deleteCascade()` and Rapporti which Digita or selection sold out.

## Payment flow

`processRegistrationCharge` in the controller is the only place registrations touch money, and it is a thin client of the giving stack:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenization happens in the browser exactly as for donations (see [Giving](./giving)) — the wizard reuses the apphelper payment provider registry, so logged-in Membri can pay with saved cards and Ospiti tokenize a new card. The controller mirrors `DonateController`'s provider quirks (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` responses returned Per the client without recording a payment). A successful charge writes a `registrationPayments` row, bumps `amountPaid`, and confirms the registration. **Refunds are not implemented** — a cancelled paid registration keeps its payment rows and any refund is handled out-of-band in the gateway dashboard.

Both entry points route through the same code path: `register` (pay at signup) and `pay` (balance payment / waitlist completion).

## Waitlist lifecycle

When the Evento is full and the Evento's `waitlistEnabled` flag is on, `register` saves the party as `waitlisted` (skipping Capacità checks) and sends the normal confirmation email marked as a waitlist spot. Promotion happens three ways — `cancel`, `Elimina`, and the Staff `promote` endpoint — all funneling into `RegistrationRepo.promoteFromWaitlist`, which picks the oldest waitlisted row and flips it atomically:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

The `status='waitlisted'` guard means concurrent promotions can't double-promote a row, and the Capacità subquery means a promotion can't oversell. Promoted rows land on `In Sospeso` — not `confirmed` — because a balance may still be owed; `RegistrationHelper.sendWaitlistAvailabilityEmail` tells the registrant their spot opened and, when `totalAmount − amountPaid > 0`, links Per the complete-payment page. Paying (or having No balance) confirms them.

:::info
A Capacità raise does not auto-promote by itself — Staff use the roster's Promote action after raising Capacità. Cancels and deletes promote automatically.
:::

## Client surfaces

- **B1App wizard** — one shared hook, `B1App/src/components/registration/useEventRegistration.ts`, drives both the website component (`components/registration/EventRegister.tsx`) and the mobile portal screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) through the steps `info → Membri → selections → questions → payment → confirm` (the middle steps render only when the Evento has selections, an attached form, or a nonzero total). The info/Membri steps show per-attendee-Digita pickers with live remaining-Capacità and sold-out states; payment (`RegistrationPaymentForm.tsx`) shows the order summary, discount-code entry, and — for logged-in Membri — saved payment methods via the apphelper provider registry, with Ospiti tokenizing a new card. The **Registrations** mobile screen (`screens/RegistrationsPage.tsx`) is My Registrations: status, balance due, Complete payment (`POST /:id/pay`), Modifica (`PUT /:id` — contact, Membro types, selection quantities), and Cancel.
- **B1Admin Impostazioni** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` adds the Enable Waitlist switch plus accordions for Attendee Types, Selections, and Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), all CRUD against the `/types`, `/selections`, `/coupons` routes.
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-attendee Digita column, Paid/Total column with balance chip, per-Digita count chips, a payments detail dialog (`RegistrationDetailDialog.tsx`, from `GET /payments/:registrationId`), the waitlist Promote row action, and CSV Esporta including attendee types, selections, paid/total/balance, and question answers.

Cross-module lookups (resolving or creating the Ospite person, loading the church for emails) go through `getMembershipModuleGateway()` — the content module never reads membership tables directly.

## Pagine Correlate

- [Giving](./giving) — the gateway abstraction, provider registry, and tokenization model this feature reuses
- [Content Endpoints](../api/endpoints/content) — the content module's REST surface
- [Webhooks](../api/webhooks) — the `registration.created` Evento
- [Module Structure](../api/module-structure) — how the content module is organized server-side
