---
title: "Event Registrations"
---

# Event Registrations

<div class="article-intro">

Native event registration content module में रहता है और, paid-registrations wave के बाद से, एक पूर्ण commerce model को carry करता है: priced attendee types, priced add-on selections, discount codes, church के existing giving gateway के माध्यम से payments, और एक status-driven waitlist। money path deliberately giving stack को reuse करता है — registration controller shared `GatewayService` / `IGatewayProvider` abstraction के माध्यम से charge करता है [Giving](./giving) में documented, तो कोई card data या gateway SDK knowledge content module में नहीं रहता है। यह पृष्ठ data model, pricing और capacity rules, और registration, payment, और waitlist flows को map करता है।

</div>

## अवलोकन

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

तीन rules stack में रखे गए हैं:

1. **सर्वर price को own करता है।** Clients type ids, selection ids, और quantities submit करते हैं; `RegistrationPricingHelper.computeTotal()` total को server-side compute करता है और coupons को charge time पर re-validated किया जाता है। एक client-supplied amount कभी भी trusted नहीं है।
2. **Capacity को atomically insert time पर enforce किया जाता है।** हर capacity-limited insert एक `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` statement का use करता है, तो दो simultaneous registrations दोनों last spot को नहीं ले सकते। Counts status (`pending`/`confirmed`) से derived हैं, कभी stored नहीं।
3. **Payments giving rails को ride करते हैं।** `RegistrationController` church के configured gateway साथ shared `GatewayService.processCharge` को call करता है — same provider abstraction, tokenization model, और SCA handling जैसे donations।

## डेटा मॉडल (`Api/src/modules/content`)

Models `models/Registration.ts` में हैं; table mappings `db/DatabaseTypes.ts` में; `repositories/` के तहत हर table के लिए एक repo।

| तालिका | अर्थ | मुख्य फ़ील्ड |
|-------|---------|-----------|
| `registrations` | एक registration (एक event के लिए एक household/party) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | एक registration पर एक attendee | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Event के लिए Attendee types (जैसे Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Named add-on options एक price के साथ (जैसे T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-registration cap), sort, active |
| `registrationSelectionChoices` | एक registration/member द्वारा चुने गए selection की Quantity | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | एक successful charge एक registration के विरुद्ध | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Discount codes per event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notes:

- **कोई waitlist table नहीं है।** Waitlisted parties `registrations` पंक्तियां हैं `status = 'waitlisted'` के साथ; पूरी waitlist lifecycle उस एक table पर status transitions है।
- **कोई stored counters नहीं।** "Sold" / "used" counts (event capacity, per-type capacity, per-selection capacity, coupon uses) को correlated subqueries के साथ compute किया जाता है पंक्तियों पर जिनकी status `('pending','confirmed')` में है (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`)। एक registration को cancel करना इसलिए capacity को bookkeeping के बिना free करता है।
- Prices MySQL DECIMAL columns हैं (wire पर strings) pricing helper के अंदर `Number()` के साथ coerced।

## REST surface

सब कुछ `/content/registrations` के तहत है (`controllers/RegistrationController.ts`), `Permissions.registrations` द्वारा gated (`view` / `edit`):

| Route | Access | Purpose |
|-------|--------|---------|
| `POST /register` | anonymous | पूर्ण submission: guest या member, server pricing, capacity checks, optional charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/selections derived `used` / `remainingCapacity` के साथ wizard के लिए |
| `POST /types`, `DELETE /types/:id` (same for `/selections`, `/coupons`) | `registrations.edit` | Staff settings CRUD |
| `POST /coupons/validate` | public | Inline discount-code validation wizard के दौरान |
| `GET /coupons/event/:eventId` | staff | Coupons uses counts के साथ |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; capacity display के लिए active-count |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, detail, payment history |
| `PUT /:id` | owner/staff | Post-submission edit — fresh members और selection choices के साथ replaces atomic capacity checks, `totalAmount` को recomputes; कभी भी auto-charges या refunds नहीं |
| `POST /:id/pay` | owner | "Complete payment": `totalAmount − amountPaid` charges करता है, `waitlisted`/`pending` → `confirmed` को flip करता है |
| `POST /:id/promote` | staff | Manual waitlist promotion |
| `POST /:id/cancel` · `DELETE /:id` | owner · staff | Cancel / delete; दोनों waitlist auto-promotion को trigger करते हैं |

Same event पर same `personId` के लिए एक non-cancelled existing registration को 409 के साथ reject किया जाता है, और हर created registration `WebhookDispatcher` के माध्यम से एक `registration.created` webhook को emit करता है।

## Pricing और discount codes

`helpers/RegistrationPricingHelper.ts` single money-math authority है:

- `computeTotal()` हर member के type price को plus हर selection choice के `price × quantity` को sum करता है।
- `validateCoupon()` active flag, date window (`startDate`/`endDate`), `minMembers` को submitted party size के विरुद्ध, और `maxUses` को status-derived redemption count के विरुद्ध enforce करता है।
- `applyDiscount()` — `percent` `total × value/100` को subtract करता है; `amount` `value` को subtract करता है; दोनों zero पर floor करते हैं।

Wizard inline feedback के लिए `POST /coupons/validate` को call करता है, लेकिन `register` को server-side coupon को re-validate और re-apply करता है — client का displayed total केवल advisory है।

## The atomic capacity idiom

हर capacity-limited insert transactions या locks के बिना safely race करता है capacity check को `INSERT` itself का part बनाकर। Event-level (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero affected rows मतलब "at capacity"। same idiom per-type inserts को guard करता है (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, members को active registrations से joined count करता है) और per-selection quantities (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` का use करता है)। जब कोई भी member या selection insert mid-registration को fail करता है, controller `deleteCascade()` के साथ partial registration को roll back करता है और report करता है कि कौन सा type या selection sold out हुआ।

## Payment flow

Controller में `processRegistrationCharge` एकमात्र जगह है जहां registrations money को touch करते हैं, और यह giving stack का एक thin client है:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenization browser में बिल्कुल donations की तरह होता है (देखें [Giving](./giving)) — wizard apphelper payment provider registry को reuse करता है, तो logged-in members saved cards के साथ pay कर सकते हैं और guests एक नया card tokenize करते हैं। controller `DonateController` के provider quirks को mirror करता है (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` responses client को payment record किए बिना return किए जाते हैं)। एक successful charge एक `registrationPayments` row लिखता है, `amountPaid` को bump करता है, और registration को confirm करता है। **Refunds implement नहीं किए गए हैं** — एक cancelled paid registration अपनी payment rows को keep करता है और कोई भी refund को out-of-band में gateway dashboard में handle किया जाता है।

दोनों entry points same code path के माध्यम से route करते हैं: `register` (signup पर pay) और `pay` (balance payment / waitlist completion)।

## Waitlist lifecycle

जब event full है और event का `waitlistEnabled` flag on है, `register` party को `waitlisted` के रूप में save करता है (capacity checks को skipping करता है) और normal confirmation email को एक waitlist spot के रूप में marked भेजता है। Promotion तीन तरीकों से होता है — `cancel`, `delete`, और staff `promote` endpoint — सभी `RegistrationRepo.promoteFromWaitlist` में funneling कर रहे हैं, जो oldest waitlisted row को pick करता है और इसे atomically flip करता है:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` guard का मतलब concurrent promotions एक row को double-promote नहीं कर सकते, और capacity subquery का मतलब एक promotion oversell नहीं कर सकता। Promoted rows `pending` पर land करते हैं — `confirmed` नहीं — क्योंकि एक balance अभी भी owed हो सकता है; `RegistrationHelper.sendWaitlistAvailabilityEmail` registrant को बताता है कि उनकी spot opened और, जब `totalAmount − amountPaid > 0`, complete-payment page को link करता है। Paying (या कोई balance न होना) उन्हें confirm करता है।

:::info
एक capacity raise auto-promote करने के लिए स्वयं को नहीं करता — staff capacity को raise करने के बाद roster के Promote action का use करते हैं। Cancels और deletes automatically promote करते हैं।
:::

## Client surfaces

- **B1App wizard** — एक shared hook, `B1App/src/components/registration/useEventRegistration.ts`, दोनों website component (`components/registration/EventRegister.tsx`) और mobile portal screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) को steps `info → members → selections → questions → payment → confirm` के माध्यम से drive करता है (middle steps केवल तब render होते हैं जब event के पास selections, एक attached form, या एक nonzero total हो)। info/members steps per-attendee-type pickers को show करते हैं live remaining-capacity और sold-out states के साथ; payment (`RegistrationPaymentForm.tsx`) order summary, discount-code entry, और — logged-in members के लिए — saved payment methods apphelper provider registry के माध्यम से दिखाता है, guests एक नया card tokenize करते हैं। **Registrations** mobile screen (`screens/RegistrationsPage.tsx`) My Registrations है: status, balance due, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` — contact, member types, selection quantities), और Cancel।
- **B1Admin settings** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` Enable Waitlist switch को Attendee Types, Selections, और Discount Codes के accordions के साथ add करता है (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), सभी `/types`, `/selections`, `/coupons` routes के विरुद्ध CRUD।
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-attendee Type column, Paid/Total column balance chip के साथ, per-type count chips, एक payments detail dialog (`RegistrationDetailDialog.tsx`, `GET /payments/:registrationId` से), waitlist Promote row action, और CSV export including attendee types, selections, paid/total/balance, और question answers।

Cross-module lookups (guest person को resolve या create करना, emails के लिए church को load करना) `getMembershipModuleGateway()` के माध्यम से जाते हैं — content module कभी भी membership tables को directly read नहीं करता है।

## संबंधित पृष्ठ

- [Giving](./giving) — gateway abstraction, provider registry, और tokenization model यह feature reuse करता है
- [Content Endpoints](../api/endpoints/content) — content module का REST surface
- [Webhooks](../api/webhooks) — `registration.created` event
- [Module Structure](../api/module-structure) — कैसे content module को server-side organize किया जाता है
