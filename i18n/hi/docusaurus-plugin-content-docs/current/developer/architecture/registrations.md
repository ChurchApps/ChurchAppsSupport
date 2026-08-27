---
title: "Event Registrations"
---

# Event Registrations

<div class="article-intro">

Native event registration lives in the content module and, since the paid-registrations wave, carries a full commerce model: priced attendee types, priced add-on selections, discount codes, payments through the church's existing giving gateway, and a status-driven waitlist. The money path deliberately reuses the giving stack — the registration controller charges through the same `GatewayService` / `IGatewayProvider` abstraction documented in [Giving](./giving), so no card data or gateway SDK knowledge lives in the content module. This page maps the data model, the pricing and capacity rules, and the registration, payment, and waitlist flows.

</div>

## Overview

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

1. **The server owns the price.** Clients submit type ids, selection ids, and quantities; `RegistrationPricingHelper.computeTotal()` computes the total server-side and coupons are re-validated at charge time. A client-supplied amount is never trusted.
2. **Capacity is enforced atomically at insert time.** Every capacity-limited insert uses an `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` statement, so two simultaneous registrations can't both take the last spot. Counts are derived from status (`pending`/`confirmed`), never stored.
3. **Payments ride the giving rails.** `RegistrationController` calls the shared `GatewayService.processCharge` with the church's configured gateway — the same provider abstraction, tokenization model, and SCA handling as donations.

## Data model (`Api/src/modules/content`)

Models are in `models/Registration.ts`; table mappings in `db/DatabaseTypes.ts`; one repo per table under `repositories/`.

| Table | Meaning | Key fields |
|-------|---------|-----------|
| `registrations` | One registration (one household/party for one event) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | One attendee on a registration | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Attendee types per event (e.g. Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Named add-on options with a price (e.g. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-registration cap), sort, active |
| `registrationSelectionChoices` | Quantity of a selection chosen by a registration/member | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | One successful charge against a registration | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Discount codes per event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notes:

- **There is no waitlist table.** Waitlisted parties are `registrations` rows with `status = 'waitlisted'`; the whole waitlist lifecycle is status transitions on that one table.
- **No stored counters.** "Sold" / "used" counts (event capacity, per-type capacity, per-selection capacity, coupon uses) are computed with correlated subqueries over rows whose status is in `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelling a registration therefore frees capacity with no bookkeeping.
- Prices are MySQL DECIMAL columns (strings over the wire) coerced with `Number()` inside the pricing helper.

## REST surface

Everything is under `/content/registrations` (`controllers/RegistrationController.ts`), gated by `Permissions.registrations` (`view` / `edit`):

| Route | Access | Purpose |
|-------|--------|---------|
| `POST /register` | anonymous | Full submission: guest or member, server pricing, capacity checks, optional charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/selections with derived `used` / `remainingCapacity` for the wizard |
| `POST /types`, `DELETE /types/:id` (same for `/selections`, `/coupons`) | `registrations.edit` | Staff settings CRUD |
| `POST /coupons/validate` | public | Inline discount-code validation during the wizard |
| `GET /coupons/event/:eventId` | staff | Coupons with uses counts |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; active-count for capacity display |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, detail, payment history |
| `PUT /:id` | owner/staff | Post-submission edit — replaces members and selection choices with fresh atomic capacity checks, recomputes `totalAmount`; never auto-charges or refunds |
| `POST /:id/pay` | owner | "Complete payment": charges `totalAmount − amountPaid`, flips `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Manual waitlist promotion |
| `POST /:id/cancel` · `DELETE /:id` | owner · staff | Cancel / delete; both trigger waitlist auto-promotion |

A non-cancelled existing registration for the same `personId` on the same event is rejected with a 409, and each created registration emits a `registration.created` webhook via `WebhookDispatcher`.

## Pricing and discount codes

`helpers/RegistrationPricingHelper.ts` is the single money-math authority:

- `computeTotal()` sums each member's type price plus each selection choice's `price × quantity`.
- `validateCoupon()` enforces active flag, date window (`startDate`/`endDate`), `minMembers` against the submitted party size, and `maxUses` against the status-derived redemption count.
- `applyDiscount()` — `percent` subtracts `total × value/100`; `amount` subtracts `value`; both floor at zero.

The wizard calls `POST /coupons/validate` for inline feedback, but `register` re-validates and re-applies the coupon server-side — the client's displayed total is advisory only.

## The atomic capacity idiom

Every capacity-limited insert races safely without transactions or locks by making the capacity check part of the `INSERT` itself. Event-level (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero affected rows means "at capacity". The same idiom guards per-type inserts (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, counting members joined to active registrations) and per-selection quantities (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, using `COALESCE(SUM(quantity),0) + ? <= capacity`). When any member or selection insert fails mid-registration, the controller rolls the partial registration back with `deleteCascade()` and reports which type or selection sold out.

## Payment flow

`processRegistrationCharge` in the controller is the only place registrations touch money, and it is a thin client of the giving stack:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenization happens in the browser exactly as for donations (see [Giving](./giving)) — the wizard reuses the apphelper payment provider registry, so logged-in members can pay with saved cards and guests tokenize a new card. The controller mirrors `DonateController`'s provider quirks (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` responses returned to the client without recording a payment). A successful charge writes a `registrationPayments` row, bumps `amountPaid`, and confirms the registration. **Refunds are not implemented** — a cancelled paid registration keeps its payment rows and any refund is handled out-of-band in the gateway dashboard.

Both entry points route through the same code path: `register` (pay at signup) and `pay` (balance payment / waitlist completion).

## Waitlist lifecycle

When the event is full and the event's `waitlistEnabled` flag is on, `register` saves the party as `waitlisted` (skipping capacity checks) and sends the normal confirmation email marked as a waitlist spot. Promotion happens three ways — `cancel`, `delete`, and the staff `promote` endpoint — all funneling into `RegistrationRepo.promoteFromWaitlist`, which picks the oldest waitlisted row and flips it atomically:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

The `status='waitlisted'` guard means concurrent promotions can't double-promote a row, and the capacity subquery means a promotion can't oversell. Promoted rows land on `pending` — not `confirmed` — because a balance may still be owed; `RegistrationHelper.sendWaitlistAvailabilityEmail` tells the registrant their spot opened and, when `totalAmount − amountPaid > 0`, links to the complete-payment page. Paying (or having no balance) confirms them.

:::info
A capacity raise does not auto-promote by itself — staff use the roster's Promote action after raising capacity. Cancels and deletes promote automatically.
:::

## Client surfaces

- **B1App wizard** — one shared hook, `B1App/src/components/registration/useEventRegistration.ts`, drives both the website component (`components/registration/EventRegister.tsx`) and the mobile portal screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) through the steps `info → members → selections → questions → payment → confirm` (the middle steps render only when the event has selections, an attached form, or a nonzero total). The info/members steps show per-attendee-type pickers with live remaining-capacity and sold-out states; payment (`RegistrationPaymentForm.tsx`) shows the order summary, discount-code entry, and — for logged-in members — saved payment methods via the apphelper provider registry, with guests tokenizing a new card. The **Registrations** mobile screen (`screens/RegistrationsPage.tsx`) is My Registrations: status, balance due, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` — contact, member types, selection quantities), and Cancel.
- **B1Admin settings** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` adds the Enable Waitlist switch plus accordions for Attendee Types, Selections, and Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), all CRUD against the `/types`, `/selections`, `/coupons` routes.
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-attendee Type column, Paid/Total column with balance chip, per-type count chips, a payments detail dialog (`RegistrationDetailDialog.tsx`, from `GET /payments/:registrationId`), the waitlist Promote row action, and CSV export including attendee types, selections, paid/total/balance, and question answers.

Cross-module lookups (resolving or creating the guest person, loading the church for emails) go through `getMembershipModuleGateway()` — the content module never reads membership tables directly.

## Related Pages

- [Giving](./giving) — the gateway abstraction, provider registry, and tokenization model this feature reuses
- [Content Endpoints](../api/endpoints/content) — the content module's REST surface
- [Webhooks](../api/webhooks) — the `registration.created` event
- [Module Structure](../api/module-structure) — how the content module is organized server-side
