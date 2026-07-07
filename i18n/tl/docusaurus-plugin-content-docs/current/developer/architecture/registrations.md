---
title: "Event Registrations"
---

# Event Registrations

<div class="article-intro">

Ang native event registration ay nabubuhay sa content module at, mula sa paid-registrations wave, ay may buong commerce model: priced attendee types, priced add-on selections, discount codes, payments sa pamamagit ng existing giving gateway ng church, at isang status-driven waitlist. Ang money path ay sinandig na ginagamit muli ang giving stack — ang registration controller ay nag-charge sa pamamagit ng parehong `GatewayService` / `IGatewayProvider` abstraction na idine-document sa [Giving](./giving), kaya walang card data o gateway SDK knowledge na nabubuhay sa content module. Ang pahinang ito ay nagsasaad ng data model, ang pricing at capacity rules, at ang registration, payment, at waitlist flows.

</div>

## Pangkalahatang-ideya

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

Tatlong rules ang sumusuporta sa stack:

1. **Ang server ay nagmamay-ari ng presyo.** Ang mga client ay nagpapadala ng type ids, selection ids, at quantities; ang `RegistrationPricingHelper.computeTotal()` ay kinakalkula ang total server-side at ang coupons ay muling nabe-validate sa charge time. Ang client-supplied amount ay hindi kailanman pinagkakatiwalaan.
2. **Ang capacity ay ipinapatupad nang atomic sa insert time.** Bawat capacity-limited insert ay gumagamit ng `INSERT … SELECT … FROM dual WHERE (count ng active rows) < capacity` statement, kaya ang dalawang simultaneous registrations ay hindi maaaring parehong kumuha ng huling spot. Ang mga counts ay galing sa status (`pending`/`confirmed`), hindi kailanman ina-imbak.
3. **Ang mga bayad ay sumasabay sa giving rails.** Ang `RegistrationController` ay tumutawag sa shared `GatewayService.processCharge` na may configured gateway ng church — ang parehong provider abstraction, tokenization model, at SCA handling tulad ng donations.

## Data model (`Api/src/modules/content`)

Ang mga models ay nasa `models/Registration.ts`; ang table mappings ay nasa `db/DatabaseTypes.ts`; isang repo bawat table sa ilalim ng `repositories/`.

| Talahanayan | Kahulugan | Key fields |
|-------|---------|-----------|
| `registrations` | Isang registration (isang household/party para sa isang event) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Isang attendee sa isang registration | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Attendee types bawat event (e.g. Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Named add-on options na may presyo (e.g. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-registration cap), sort, active |
| `registrationSelectionChoices` | Dami ng selection na pinili ng registration/member | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Isang matagumpay na charge laban sa registration | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Mga discount codes bawat event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Ang mga tala:

- **Walang waitlist table.** Ang mga waitlisted parties ay `registrations` rows na may `status = 'waitlisted'`; ang buong waitlist lifecycle ay status transitions sa iisang talahanayan.
- **Walang stored counters.** Ang mga "Sold" / "used" counts (event capacity, per-type capacity, per-selection capacity, coupon uses) ay kinokomputa gamit ang correlated subqueries sa rows na ang status ay nasa `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Ang pag-cancel ng registration ay kaya ay nag-free ng capacity na walang bookkeeping.
- Ang mga presyo ay MySQL DECIMAL columns (strings sa wire) coerced gamit ang `Number()` sa loob ng pricing helper.

## REST surface

Lahat ay nasa ilalim ng `/content/registrations` (`controllers/RegistrationController.ts`), gated ng `Permissions.registrations` (`view` / `edit`):

| Route | Access | Layunin |
|-------|--------|---------|
| `POST /register` | anonymous | Buong submission: guest o member, server pricing, capacity checks, optional charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/selections na may derived `used` / `remainingCapacity` para sa wizard |
| `POST /types`, `DELETE /types/:id` (pareho para sa `/selections`, `/coupons`) | `registrations.edit` | Staff settings CRUD |
| `POST /coupons/validate` | public | Inline discount-code validation sa panahon ng wizard |
| `GET /coupons/event/:eventId` | staff | Coupons na may uses counts |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; active-count para sa capacity display |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, detail, payment history |
| `PUT /:id` | owner/staff | Post-submission edit — replaces members at selection choices na may fresh atomic capacity checks, recomputes `totalAmount`; hindi kailanman auto-charges o refunds |
| `POST /:id/pay` | owner | "Complete payment": charges `totalAmount − amountPaid`, flips `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Manual waitlist promotion |
| `POST /:id/cancel` · `DELETE /:id` | owner · staff | Cancel / delete; pareho ay nag-trigger ng waitlist auto-promotion |

Ang non-cancelled existing registration para sa parehong `personId` sa parehong event ay tinanggihan na may 409, at bawat created registration ay naglalabas ng `registration.created` webhook sa pamamagit ng `WebhookDispatcher`.

## Pricing at discount codes

Ang `helpers/RegistrationPricingHelper.ts` ay ang iisang money-math authority:

- `computeTotal()` ay nagsusum ng bawat member's type price kasama ang bawat selection choice's `price × quantity`.
- `validateCoupon()` ay nag-enforce ng active flag, date window (`startDate`/`endDate`), `minMembers` laban sa submitted party size, at `maxUses` laban sa status-derived redemption count.
- `applyDiscount()` — `percent` ay nagsusubtract ng `total × value/100`; `amount` ay nagsusubtract ng `value`; pareho ay nag-floor sa zero.

Ang wizard ay tumatawag sa `POST /coupons/validate` para sa inline feedback, ngunit ang `register` ay muling navalidate at muling nag-apply ng coupon server-side — ang client's displayed total ay advisory lamang.

## Ang atomic capacity idiom

Bawat capacity-limited insert ay umaatletang ligtas nang walang transactions o locks sa pamamagitan ng paggawang bahagi ng capacity check ang `INSERT` mismo. Event-level (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero affected rows ay nangangahulugang "at capacity". Ang parehong idiom ay nag-guard ng per-type inserts (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, nag-count ng members joined sa active registrations) at per-selection quantities (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, gamit ang `COALESCE(SUM(quantity),0) + ? <= capacity`). Kapag ang anumang member o selection insert ay nabigo mid-registration, ang controller ay nag-roll ng partial registration pabalik na may `deleteCascade()` at nag-report kung aling type o selection ang sold out.

## Payment flow

Ang `processRegistrationCharge` sa controller ay ang tanging lugar na ang registrations ay tumatagos sa pera, at ito ay isang manipis na client ng giving stack:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Ang tokenization ay nangyayari sa browser eksaktong tulad ng para sa donations (tingnan ang [Giving](./giving)) — ang wizard ay ginagamit muli ang apphelper payment provider registry, kaya ang mga naka-log in na members ay maaaring magbayad na may saved cards at ang mga guest ay nag-tokenize ng bagong card. Ang controller ay sumasalamin sa provider quirks ng `DonateController`'s (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` responses na ipinabalik sa client nang walang pag-record ng payment). Ang matagumpay na charge ay nagsusulat ng `registrationPayments` row, nag-bump ng `amountPaid`, at nag-confirm ng registration. **Ang mga refunds ay hindi ipinatupad** — ang cancelled paid registration ay nagpapanatili ng payment rows nito at ang anumang refund ay hinahawakan out-of-band sa gateway dashboard.

Parehong entry points ay nag-route sa pamamagit ng parehong code path: `register` (magbayad sa signup) at `pay` (balance payment / waitlist completion).

## Waitlist lifecycle

Kapag ang event ay puno at ang event's `waitlistEnabled` flag ay on, ang `register` ay nagsave ng party bilang `waitlisted` (nag-skip ng capacity checks) at nagpadala ng normal confirmation email na minarkahan bilang waitlist spot. Ang promotion ay nangyayari sa tatlong paraan — `cancel`, `delete`, at staff `promote` endpoint — lahat ay naglalakad sa `RegistrationRepo.promoteFromWaitlist`, na pumipili ng pinakamatandang waitlisted row at flips ito nang atomic:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count para sa event…) < ?
```

Ang `status='waitlisted'` guard ay nangangahulugang ang concurrent promotions ay hindi maaaring double-promote ang row, at ang capacity subquery ay nangangahulugang ang promotion ay hindi maaaring mag-oversell. Ang promoted rows ay umabot sa `pending` — hindi `confirmed` — dahil ang isang balanse ay maaaring pa ring itatagal; ang `RegistrationHelper.sendWaitlistAvailabilityEmail` ay nagsasabi sa registrant na ang spot nila ay bumukas at, kapag `totalAmount − amountPaid > 0`, ay nag-link sa complete-payment page. Ang pagbabayad (o walang balanse) ay nag-confirm sa kanila.

:::info
Ang isang capacity raise ay hindi awtomatikong nag-promote sa sarili — ang staff ay gumagamit ng roster's Promote action pagkatapos mag-raise ng capacity. Ang mga cancels at deletes ay nag-promote nang awtomatiko.
:::

## Client surfaces

- **B1App wizard** — isang shared hook, `B1App/src/components/registration/useEventRegistration.ts`, ay nagdadrive ng parehong website component (`components/registration/EventRegister.tsx`) at ang mobile portal screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) sa pamamagit ng steps `info → members → selections → questions → payment → confirm` (ang middle steps ay nag-render lamang kapag ang event ay may selections, isang attached form, o isang nonzero total). Ang info/members steps ay nagpapakita ng per-attendee-type pickers na may live remaining-capacity at sold-out states; payment (`RegistrationPaymentForm.tsx`) ay nagpapakita ng order summary, discount-code entry, at — para sa logged-in members — saved payment methods sa pamamagit ng apphelper provider registry, na may guests na nag-tokenize ng bagong card. Ang **Registrations** mobile screen (`screens/RegistrationsPage.tsx`) ay My Registrations: status, balance due, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` — contact, member types, selection quantities), at Cancel.
- **B1Admin settings** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` ay nagdadagdag ng Enable Waitlist switch kasama ang accordions para sa Attendee Types, Selections, at Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), lahat ng CRUD laban sa `/types`, `/selections`, `/coupons` routes.
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-attendee Type column, Paid/Total column na may balance chip, per-type count chips, isang payments detail dialog (`RegistrationDetailDialog.tsx`, mula sa `GET /payments/:registrationId`), ang waitlist Promote row action, at CSV export kasama ang attendee types, selections, paid/total/balance, at question answers.

Ang mga cross-module lookups (pag-resolve o pag-create ng guest person, pag-load ng church para sa emails) ay napupunta sa pamamagitan ng `getMembershipModuleGateway()` — ang content module ay hindi kailanman direktang nagbabasa ng membership tables.

## Mga Kaugnay na Pahina

- [Giving](./giving) — ang gateway abstraction, provider registry, at tokenization model na ginagamit muli ng feature na ito
- [Content Endpoints](../api/endpoints/content) — ang REST surface ng content module
- [Webhooks](../api/webhooks) — ang `registration.created` event
- [Module Structure](../api/module-structure) — kung paano ang content module ay inorganisa sa server-side
