---
title: "Регистрация на события"
---

# Регистрация на события

<div class="article-intro">

Native регистрация на события lives в content модулю и since paid-registrations wave carries full commerce модель: priced attendee типы priced add-on selections discount коды платежи через church's existing giving gateway и status-driven waitlist. Money путь deliberately reuses giving стек — registration контроллер charges через same `GatewayService` / `IGatewayProvider` abstraction documented в [Giving](./giving) поэтому no карта данные или gateway SDK знание lives в content модулю. На этой странице описывается модель данных pricing и capacity правила и registration платеж и waitlist потоки.

</div>

## Обзор

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content модуль                        │
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

Три правила hold across стек:

1. **Сервер owns цена.** Клиенты submit тип ids selection ids и quantities; `RegistrationPricingHelper.computeTotal()` computes total server-side и coupons это re-validated на charge time. Client-supplied amount это никогда не trusted.
2. **Capacity это enforced atomically на insert time.** Каждый capacity-limited insert uses `INSERT … SELECT … FROM dual WHERE (count из active строки) < capacity` statement поэтому two simultaneous регистрации не могут both take last spot. Counts это derived из status (`pending`/`confirmed`) никогда не stored.
3. **Платежи ride giving rails.** `RegistrationController` calls shared `GatewayService.processCharge` с church's configured gateway — same provider abstraction tokenization модель и SCA handling как donations.

## Модель данных (`Api/src/modules/content`)

Models это в `models/Registration.ts`; table mappings в `db/DatabaseTypes.ts`; one репо per таблица under `repositories/`.

| Таблица | Значение | Ключевые поля |
|-------|---------|-----------|
| `registrations` | One регистрация (one домашнее хозяйство/party для one event) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | One attendee на регистрация | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Attendee типы per event (например Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Named add-on опции с price (например T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (per-registration cap), sort, active |
| `registrationSelectionChoices` | Quantity из selection выбран by регистрация/member | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | One успешный charge против регистрация | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Discount коды per event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Примечания:

- **Нет waitlist таблица.** Waitlisted parties это `registrations` строки с `status = 'waitlisted'`; целый waitlist lifecycle это status переходы на это one таблица.
- **No stored счетчики.** "Sold" / "used" count (event capacity, per-type capacity, per-selection capacity, coupon uses) это computed с correlated subqueries over строки whose status это в `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelling регистрация поэтому frees capacity с no bookkeeping.
- Prices это MySQL DECIMAL columns (strings over wire) coerced с `Number()` внутри pricing helper.

## REST поверхность

Всё это under `/content/registrations` (`controllers/RegistrationController.ts`) gated by `Permissions.registrations` (`view` / `edit`):

| Маршрут | Доступ | Цель |
|-------|--------|---------|
| `POST /register` | anonymous | Full submission: guest или member server pricing capacity checks optional charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Types/selections с derived `used` / `remainingCapacity` для wizard |
| `POST /types`, `DELETE /types/:id` (same для `/selections`, `/coupons`) | `registrations.edit` | Staff настройки CRUD |
| `POST /coupons/validate` | public | Inline discount-code validation во время wizard |
| `GET /coupons/event/:eventId` | staff | Coupons с uses counts |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; active-count для capacity дисплей |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations detail payment история |
| `PUT /:id` | owner/staff | Post-submission edit — replaces members и selection choices с fresh atomic capacity checks recomputes `totalAmount`; никогда не auto-charges или refunds |
| `POST /:id/pay` | owner | "Complete payment": charges `totalAmount − amountPaid` flips `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Manual waitlist promotion |
| `POST /:id/cancel` · `DELETE /:id` | owner · staff | Cancel / delete; both trigger waitlist auto-promotion |

Non-cancelled existing регистрация для same `personId` на same event это rejected с 409 и каждый created регистрация emits `registration.created` webhook через `WebhookDispatcher`.

## Pricing и discount коды

`helpers/RegistrationPricingHelper.ts` это single money-math authority:

- `computeTotal()` sums каждый member's type price плюс каждый selection choice's `price × quantity`.
- `validateCoupon()` enforces active flag date window (`startDate`/`endDate`) `minMembers` против submitted party size и `maxUses` против status-derived redemption count.
- `applyDiscount()` — `percent` subtracts `total × value/100`; `amount` subtracts `value`; both floor на zero.

Wizard calls `POST /coupons/validate` для inline feedback но `register` re-validates и re-applies coupon server-side — client's displayed total это advisory only.

## Atomic capacity idiom

Каждый capacity-limited insert races безопасно без transactions или locks by making capacity check часть `INSERT` самый. Event-level (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero affected строки means "на capacity". Same idiom guards per-type inserts (`RegistrationMemberRepo.atomicInsertWithTypeCapacity` counting members joined к active регистрации) и per-selection quantities (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck` using `COALESCE(SUM(quantity),0) + ? <= capacity`). Когда any member или selection insert fails mid-регистрация контроллер rolls partial регистрация back с `deleteCascade()` и reports који type или selection sold out.

## Платеж поток

`processRegistrationCharge` в контроллер это only место регистрации touch money и это thin client из giving стек:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenization happens в браузер exactly як для donations (see [Giving](./giving)) — wizard reuses apphelper payment provider registry поэтому logged-in members могут pay с saved карт и guests токенизе new карта. Контроллер mirrors `DonateController`'s provider quirks (Kingdom Funding `pm-{id}` payment-method ids Stripe SCA `requires_action` ответы returned к client без recording payment). Успешный charge writes `registrationPayments` строка bumps `amountPaid` и confirms регистрация. **Refunds это не implemented** — cancelled paid регистрация keeps его payment строки и any refund это handled out-of-band в gateway dashboard.

Обе entry точки route через same код путь: `register` (pay на signup) и `pay` (balance платеж / waitlist completion).

## Waitlist lifecycle

Когда event это full и event's `waitlistEnabled` flag это on `register` saves party як `waitlisted` (skipping capacity checks) и sends normal confirmation email marked як waitlist spot. Promotion happens three способи — `cancel` `delete` и staff `promote` endpoint — все funneling в `RegistrationRepo.promoteFromWaitlist` який picks oldest waitlisted строка и flips його atomically:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count для event…) < ?
```

`status='waitlisted'` guard means concurrent promotions не могут double-promote строка и capacity subquery means promotion не может oversell. Promoted строки land на `pending` — не `confirmed` — потому balance may все еще be owed; `RegistrationHelper.sendWaitlistAvailabilityEmail` tells registrant їхня spot opened и когда `totalAmount − amountPaid > 0` links к complete-payment page. Paying (або having no balance) confirms їх.

:::info
Capacity raise это не auto-promote by себя — staff use roster's Promote action after raising capacity. Cancels і deletes promote автоматично.
:::

## Client поверхні

- **B1App wizard** — one shared hook `B1App/src/components/registration/useEventRegistration.ts` drives обоє website компонент (`components/registration/EventRegister.tsx`) та мобільний portal екран (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) через steps `info → members → selections → questions → payment → confirm` (середні steps render only коли event has selections attached форма або nonzero total). Info/members steps show per-attendee-type pickers с live remaining-capacity та sold-out стани; payment (`RegistrationPaymentForm.tsx`) shows order summary discount-code entry та — для logged-in members — saved платежні методи via apphelper provider registry з guests tokenizing new карта. **Registrations** мобільний екран (`screens/RegistrationsPage.tsx`) це My Registrations: статус balance due Complete payment (`POST /:id/pay`) Edit (`PUT /:id` — contact member types selection quantities) та Cancel.
- **B1Admin налаштування** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` додає Enable Waitlist switch плюс accordions для Attendee Types Selections та Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`) все CRUD проти `/types` `/selections` `/coupons` маршрути.
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: per-attendee Type стовпець Paid/Total стовпець з balance chip per-type count chips платежі detail діалог (`RegistrationDetailDialog.tsx` з `GET /payments/:registrationId`) waitlist Promote row action та CSV export включаючи attendee типи selections paid/total/balance та question відповіді.

Cross-module lookups (розв'язування або creating guest person loading church для emails) go через `getMembershipModuleGateway()` — content модуль ніколи не reads membership таблиці directly.

## Пов'язані сторінки

- [Giving](./giving) — gateway abstraction provider registry та tokenization модель це feature reuses
- [Content Endpoints](../api/endpoints/content) — content модулю's REST поверхня
- [Webhooks](../api/webhooks) — `registration.created` подія
- [Module Structure](../api/module-structure) — як content модуль це organized server-side
