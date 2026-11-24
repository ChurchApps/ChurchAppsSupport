---
title: "Event Registrations"
description: "How event registrations work in B1 Admin and B1App: attendee types, deposits, paid add-ons, discount codes, gateway and offline payments, refunds, waitlist promotion, and cancellation."
---

# Event Registrations

<div class="article-intro">

Native event registration lives in the content module and, since the paid-registrations wave, carries a full commerce model: priced attendee types, priced add-on selections, discount codes, payments through the church's existing giving gateway, and a status-driven waitlist. The money path deliberately reuses the giving stack — the registration controller charges through the same `GatewayService` / `IGatewayProvider` abstraction documented in [Giving](./giving.md), so no card data or gateway SDK knowledge lives in the content module. This page maps the data model, the pricing and capacity rules, and the registration, payment, refund, waitlist, and cancellation flows.

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
| `registrationTypes` | Attendee types per event (e.g. Adult / Child) | eventId, name, description, **price**, **depositAmount** (nullable; charged per attendee at checkout instead of price), **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Named add-on options with a price (e.g. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-registration cap), sort, active |
| `registrationSelectionChoices` | Quantity of a selection chosen by a registration/member | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | The payment ledger: one row per money movement on a registration | registrationId, gatewayId, provider, transactionId, method, amount, currency, **kind** (`charge` online / `payment` staff-recorded offline / `refund`), **status** (`succeeded`, or `pending` while a gateway refund is in flight), personId |
| `registrationCoupons` | Discount codes per event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Registration settings live on the `events` row: `registrationEnabled`, `capacity`, `registrationOpenDate` / `registrationCloseDate`, `formId`, `waitlistEnabled`, **`allowSelfCancel`** (bit, default 1), **`allowPayLater`** (bit, default 0), and **`confirmationMessage`** (nullable VARCHAR(2000), plain text). The last three came in the `content/2026-11-24_registration_payment_options` and `content/2026-11-24_event_confirmation_message` migrations, alongside `registrationTypes.depositAmount` (DECIMAL(10,2) NULL). Events also gained an unrelated free-text `location` (VARCHAR(255)) in `content/2026-11-23_event_location`.

Notes:

- **There is no waitlist table.** Waitlisted parties are `registrations` rows with `status = 'waitlisted'`; the whole waitlist lifecycle is status transitions on that one table.
- **No stored counters.** "Sold" / "used" counts (event capacity, per-type capacity, per-selection capacity, coupon uses) are computed with correlated subqueries over rows whose status is in `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelling a registration therefore frees capacity with no bookkeeping.
- Prices are MySQL DECIMAL columns (strings over the wire) coerced with `Number()` inside the pricing helper.
- **`amountPaid` is the net of the ledger.** Charges and offline payments add to it, refunds subtract from it, and the balance due is always `totalAmount − amountPaid` (`RegistrationPaymentHelper.balanceDue`). Refunds never change `status`.

## REST surface

Everything is under `/content/registrations` (`controllers/RegistrationController.ts`), gated by `Permissions.registrations` (`view` / `edit`):

| Route | Access | Purpose |
|-------|--------|---------|
| `POST /register` | anonymous | Full submission: guest, member, or staff Add Attendee; server pricing, capacity checks, optional charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/selections with derived `used` / `remainingCapacity` for the wizard |
| `POST /types`, `DELETE /types/:id` (same for `/selections`, `/coupons`) | `registrations.edit` | Staff settings CRUD |
| `POST /coupons/validate` | public | Inline discount-code validation during the wizard |
| `GET /coupons/event/:eventId` | staff | Coupons with uses counts |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; active-count for capacity display |
| `GET /event/:eventId/household` | authed | `{ personIds }`: which of the caller's own household members are already on an active registration for the event (drives the wizard's **Already registered** marks) |
| `POST /event/:eventId/balance-reminders` | `registrations.edit` | Emails every active registrant who owes money; returns `{ sent }` |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, detail, payment history |
| `PUT /:id` | owner/staff | Post-submission edit — replaces members and selection choices with fresh atomic capacity checks, recomputes `totalAmount`; never auto-charges or refunds. A body with only `formSubmissionId` or `notes` doesn't reprice (used by **Answer questions**) |
| `POST /:id/pay` | owner/staff | "Complete payment": charges `totalAmount − amountPaid` (409 while `waitlisted`), confirms a `pending` registration once paid in full |
| `POST /:id/payments` | `registrations.edit` | Record an offline payment (`cash` / `check` / `other`) |
| `POST /:id/refunds` | `registrations.edit` | Record an offline refund (no gateway call) |
| `POST /payments/:paymentId/refund` | `registrations.edit` | Full or partial refund of an online charge through the gateway |
| `POST /:id/promote` | staff | Manual waitlist promotion |
| `POST /:id/cancel` | owner/staff | Cancel; owner refused with 403 when the event's `allowSelfCancel` is off; triggers waitlist auto-promotion |
| `POST /:id/restore` | `registrations.edit` | Restore a cancelled registration with capacity, type, coupon, and duplicate re-checks |
| `DELETE /:id` | `registrations.edit` | Hard delete; 409 `registration-has-payments` when any ledger row exists; triggers waitlist auto-promotion |

**Duplicate attendees are blocked server-side.** `register` (for non-guest submissions), `PUT /:id`, and `restore` call `RegistrationRepo.loadRegisteredPersonIds` for the registrant plus every linked member `personId` and reject with 409 `already-registered` (and the offending `personIds`) if any of them is already on another active registration for the event. This applies to staff Add Attendee too. Each created registration emits a `registration.created` webhook via `WebhookDispatcher`, and each real cancel emits `registration.cancelled` (see [Cancellation, restore, and delete](#cancellation-restore-and-delete)).

## Pricing and discount codes

`helpers/RegistrationPricingHelper.ts` is the single money-math authority:

- `computeTotal()` sums each member's type price plus each selection choice's `price × quantity`.
- `validateCoupon()` enforces active flag, date window (`startDate`/`endDate`), `minMembers` against the submitted party size, and `maxUses` against the status-derived redemption count.
- `applyDiscount()` — `percent` subtracts `total × value/100`; `amount` subtracts `value`; both floor at zero.
- `computeDueNow()` — what checkout charges today: the same sum as `computeTotal()` but with each type's price replaced by its deposit (`depositFor()` returns the deposit only when it is above zero and below the price), selections at full price, capped at the discounted total. `isValidDeposit()` backs `POST /types`, which rejects a deposit of zero or less, or above the price, with a 400.

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

Tokenization happens in the browser exactly as for donations (see [Giving](./giving.md)) — the wizard reuses the apphelper payment provider registry, so logged-in members can pay with saved cards and guests tokenize a new card. The controller mirrors `DonateController`'s provider quirks (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` responses returned to the client without recording a payment). A successful charge writes a `registrationPayments` row (kind `charge`), bumps `amountPaid`, and confirms the registration.

Both entry points route through the same code path: `register` (pay at signup) and `pay` (balance payment / waitlist completion). At signup `register` charges `computeDueNow()`, not the full total, so a registration with deposit types is confirmed with a balance still owed; `pay` later charges whatever balance is left.

`register` skips the charge in three cases and saves the registration as `pending` with `amountPaid = 0`, leaving the full total as a balance due:

- **Staff Add Attendee.** The body carries a `personId` that is not the caller's, no `guestInfo`, and the caller has `registrations.edit` in that church. The person must exist (404 otherwise), the household member filter is bypassed, and no card is charged.
- **No gateway.** The church has no giving gateway (`hasGateway` checks `gateway.loadAll`). The B1App payment step shows **Register and Pay Later** instead of a card form.
- **Pay later.** The body sends `payLater: true` and the event's `allowPayLater` is on. With a gateway and `allowPayLater` off, `payLater` is refused with a 400. B1App shows the **Register and Pay Later** button beside the card form only when `allowPayLater` is on.

Guest (no `au.id`) priced registrations must carry a `captchaPass` from `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (now in `shared/helpers`) runs just before the charge, so waitlist and free signups are unaffected. When `CAPTCHA_ENFORCE=true` and the pass is missing or invalid, the new registration is rolled back with `deleteCascade()` and the call returns 403. B1App's `RegistrationPaymentForm` shows the reCAPTCHA checkbox to guests and sends the pass with both the card save and the registration.

## Offline payments and refunds

Staff money movements outside checkout go through three `registrations.edit` routes. `RegistrationPaymentHelper` holds the math so the controller and B1Admin's `registrationCommerce.ts` agree on what is allowed.

- **Offline payment** (`POST /:id/payments`, body `{ amount, method, checkNumber? }`). `method` is `cash`, `check`, or `other`; a check number is stored in `transactionId`. The amount must be positive, have at most two decimals, and be no more than the balance due (overpayment is never recorded). Refused for `cancelled` and `waitlisted` registrations. Writes a `kind: "payment"` row and applies `statusAfterPayment()`, so `pending` becomes `confirmed` once paid in full.
- **Offline refund** (`POST /:id/refunds`). Same body; capped at `amountPaid`; writes a `kind: "refund"` row with no gateway call.
- **Gateway refund** (`POST /payments/:paymentId/refund`, body `{ amount }`). Only for an online charge (`isGatewayPayment`: not a refund, has `provider` and `transactionId`, succeeded). The amount is capped by `refundableForPayment()`: the charge minus earlier refunds against the same `transactionId`, and never more than the net `amountPaid`. The controller finds the church's gateway for that provider that `GatewayService.supportsRefund()`, reserves a `pending` refund row atomically (`reservePendingRefund`, which also blocks a second in-flight refund for 15 minutes), then calls the same `GatewayService.refundDonation` path donations use, with an amount and an idempotency key `registration-refund-{rowId}`. On failure the reserved row is deleted and nothing is recorded; on success the row is marked `succeeded` and `amountPaid` is lowered with a compare-and-set retry (`updatePaidIfUnchanged`).

All three reject an identical row keyed in again within 60 seconds as a double submit (409), update `amountPaid` with a compare-and-set, and return the registration plus its refreshed payments. Refunds never change `status`. The giving webhook's `charge.refunded` handler never writes `registrationPayments`, so a registration refund can't be recorded twice.

## Emails and balance reminders

`RegistrationHelper` sends every registration email through `TransactionalEmailHelper`:

- **Confirmation** (`sendConfirmationEmail`) on register, including waitlisted signups. When the event has a `confirmationMessage`, `confirmationMessageHtml()` appends it HTML-escaped with line breaks turned into `<br>`, except for `waitlisted` registrations. The message is left out of anonymous public event responses.
- **Balance reminder** (`sendBalanceReminderEmail`) from `POST /event/:eventId/balance-reminders`. Recipients are `pending` or `confirmed` registrations with a `personId` and a positive balance; the person's email is loaded through the membership gateway and people without one are skipped. The email lists total, paid, and balance in the church currency and links to My Registrations (`/mobile/registrations` on the church's B1 site). Nothing records that a reminder was sent; the response is `{ sent }`.
- **Cancellation** (`sendCancellationEmail`) on cancel, and **waitlist availability** on promotion (below).

## Cancellation, restore, and delete {#cancellation-restore-and-delete}

- **Cancel** (`POST /:id/cancel`). The registrant or `registrations.edit` staff; a registrant is refused with 403 when the event's `allowSelfCancel` is `false`. Already-cancelled rows return 400, so the transition happens once: status becomes `cancelled`, `cancelledDate` is set, `registration.cancelled` is emitted via `WebhookDispatcher` with the same shape as `registration.created` (also exposed as the workflow trigger "Event · Registration Cancelled" in `EventTriggerHelper`), the cancellation email goes out, and the oldest waitlisted registration is promoted. Payment rows are kept.
- **Restore** (`POST /:id/restore`, `registrations.edit`). Only from `cancelled`. Checks, in order: nobody on the registration is on another active registration (409 `already-registered`); event capacity via `RegistrationRepo.restoreWithCapacityCheck`, an atomic update in the same style as the insert idiom (409 `event-full`); then per-type capacity and coupon `maxUses`, undoing the restore with 409 `type-full` or `coupon-max-uses` if either is now over. The restored status is `pending` when a balance is owed and `confirmed` otherwise, and `cancelledDate` is cleared. Restore doesn't promote or send email.
- **Delete** (`DELETE /:id`, `registrations.edit`). Refused with 409 `registration-has-payments` when the registration has any `registrationPayments` rows, so the ledger is never erased; staff cancel instead. Otherwise `deleteCascade()` and waitlist promotion.

## Waitlist lifecycle

When the event is full and the event's `waitlistEnabled` flag is on, `register` saves the party as `waitlisted` (skipping capacity checks) and sends the normal confirmation email marked as a waitlist spot. Promotion happens three ways — `cancel`, `delete`, and the staff `promote` endpoint — all funneling into `RegistrationRepo.promoteFromWaitlist`, which picks the oldest waitlisted row and flips it atomically:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

The `status='waitlisted'` guard means concurrent promotions can't double-promote a row, and the capacity subquery means a promotion can't oversell. Promoted rows land on `pending` — not `confirmed` — because a balance may still be owed; `RegistrationHelper.sendWaitlistAvailabilityEmail` tells the registrant their spot opened and, when `totalAmount − amountPaid > 0`, links to the church's B1 `/mobile/registrations` page (My Registrations), built from `B1AppRoot` and the church subdomain. Paying (or having no balance) confirms them.

:::info
A capacity raise does not auto-promote by itself — staff use the roster's Promote action after raising capacity. Cancels and deletes promote automatically.
:::

## Client surfaces

- **B1App wizard** — one shared hook, `B1App/src/components/registration/useEventRegistration.ts`, drives both the website component (`components/registration/EventRegister.tsx`) and the mobile portal screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) through the steps `info → members → selections → questions → payment → confirm` (the middle steps render only when the event has selections, an attached form, or a nonzero total). For a logged-in user the hook calls `GET /event/:eventId/household` and marks household members already registered (they can't be checked, and the info step refuses to continue if the user is). Checking a household member pre-picks the first type whose `minAgeYears`/`maxAgeYears` range fits their birthdate; types with no range are never auto-picked. The info/members steps show per-attendee-type pickers with live remaining-capacity and sold-out states. The hook also computes `dueNow` with the same deposit rule as the server. Payment (`RegistrationPaymentForm.tsx`) shows the order summary, **Due today** / **Balance due later** when `dueNow` is below the total, discount-code entry, and, for logged-in members, saved payment methods via the apphelper provider registry, with guests tokenizing a new card; the card is charged `dueNow`. When the event's `allowPayLater` is on, a **Register and Pay Later** button submits with `payLater: true`. The **Registrations** mobile screen (`screens/RegistrationsPage.tsx`) is My Registrations: status, balance due, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` — contact, member types, selection quantities), **Answer questions** (shown when the event has a `formId` and the registration has no `formSubmissionId`; saves the submission then links it with a `PUT` that only carries `formSubmissionId`), and Cancel (hidden when the event's `allowSelfCancel` is `false`).
- **B1Admin settings** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` holds the event-level switches (Enable Waitlist, `allowSelfCancel`, `allowPayLater`) and the Confirmation Message, plus accordions for Attendee Types (with Deposit and Min/Max age), Selections, and Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), all CRUD against the `/types`, `/selections`, `/coupons` routes. `CopyRegistrationSetupDialog.tsx` copies another registerable event's capacity, waitlist flag, tags, and form onto this event and posts its types, selections, and coupons as new rows, skipping any whose name (or code) already exists here; it runs entirely client-side over the existing routes.
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-attendee Type column, Paid/Total column with balance chip, per-type count chips, client-side filter chips (status, type, balance due, unanswered), Cancel / Restore / Delete / Promote row actions, **Send Balance Reminder**, and CSV export of the filtered rows including attendee types, selections, paid/total/balance, and question answers. `RegistrationDetailDialog.tsx` shows the ledger from `GET /:id`, edits members and selection quantities through `PUT /:id`, and opens `RegistrationPaymentDialog.tsx` for **Record Payment**, **Record Refund**, and per-charge **Refund** (gateway), gated client-side on `Registrations Edit` to match the server. `RegistrationsPage.tsx` splits the event list into Upcoming and Past client-side (a recurring event stays upcoming while its RRULE has a later date).

Cross-module lookups (resolving or creating the guest person, loading the church for emails) go through `getMembershipModuleGateway()` — the content module never reads membership tables directly.

## Related Pages

- [Giving](./giving.md) — the gateway abstraction, provider registry, and tokenization model this feature reuses
- [Content Endpoints](../api/endpoints/content.md) — the content module's REST surface
- [Webhooks](../api/webhooks.md) — the `registration.created` and `registration.cancelled` events
- [Module Structure](../api/module-structure.md) — how the content module is organized server-side
