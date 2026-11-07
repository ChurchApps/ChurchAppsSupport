---
title: "Mga Event Registration"
description: "Paano gumagana ang event registration sa B1 Admin at B1App: uri ng dadalo, bayad na add-on, discount code, bayad sa gateway, at promosyon sa waitlist."
---

# Mga Event Registration

<div class="article-intro">

Nakatira ang native na event registration sa content module at, simula ng paid-registrations wave, nagdadala ng buong commerce model: mga uri ng dadalo na may presyo, mga opsyonal na add-on selection na may presyo, mga discount code, mga bayad sa pamamagitan ng umiiral na giving gateway ng simbahan, at isang waitlist na pinapatakbo ng status. Sadyang muling ginagamit ng daloy ng pera ang giving stack -- ang registration controller ay naniningil sa pamamagitan ng parehong abstraction na `GatewayService` / `IGatewayProvider` na nakadokumento sa [Giving](./giving.md), kaya walang datos ng card o kaalaman sa SDK ng gateway sa content module. Inilalarawan ng pahinang ito ang data model, mga panuntunan sa presyo at capacity, at ang mga daloy ng registration, bayad, at waitlist.

</div>

## Pangkalahatang-tanaw

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

Tatlong panuntunan ang nananatili sa buong stack:

1. **Ang server ang may hawak ng presyo.** Ang mga client ay nagsusumite ng type id, selection id, at dami; kinukuwenta ng `RegistrationPricingHelper.computeTotal()` ang kabuuan sa panig ng server, at muling bine-validate ang mga coupon sa oras ng singil. Hindi kailanman pinagkakatiwalaan ang halagang ipinadala ng client.
2. **Ipinapatupad ang capacity nang atomic sa oras ng insert.** Gumagamit ang bawat capacity-limited na insert ng statement na `INSERT … SELECT … FROM dual WHERE (bilang ng aktibong row) < capacity`, kaya hindi maaaring kunin ng dalawang sabay na registration ang huling puwesto. Hinango mula sa status ang mga bilang (`pending`/`confirmed`), hindi nakatago.
3. **Dumadaan ang mga bayad sa giving rails.** Tinatawag ng `RegistrationController` ang shared na `GatewayService.processCharge` gamit ang naka-configure na gateway ng simbahan -- ang parehong provider abstraction, modelo ng tokenization, at SCA handling gaya ng mga donasyon.

## Data model (`Api/src/modules/content`)

Nasa `models/Registration.ts` ang mga model; nasa `db/DatabaseTypes.ts` ang mga table mapping; isang repo kada table sa ilalim ng `repositories/`.

| Table | Kahulugan | Mga pangunahing field |
|-------|-----------|-----------|
| `registrations` | Isang registration (isang household/party para sa isang event) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Isang dadalo sa isang registration | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Mga uri ng dadalo kada event (hal. Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Mga pinangalanang add-on na opsyon na may presyo (hal. T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (pinakamataas bawat registration), sort, active |
| `registrationSelectionChoices` | Dami ng selection na pinili ng isang registration/miyembro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Isang matagumpay na singil laban sa isang registration | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Mga discount code kada event | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Mga tala:

- **Walang table para sa waitlist.** Ang mga waitlisted na party ay mga row ng `registrations` na may `status = 'waitlisted'`; ang buong lifecycle ng waitlist ay mga transisyon ng status sa iisang table na iyon.
- **Walang nakaimbak na counter.** Ang mga bilang na "sold" / "used" (capacity ng event, capacity kada uri, capacity kada selection, paggamit ng coupon) ay kinukuwenta gamit ang correlated subquery sa mga row na ang status ay nasa `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Kaya ang pagkansela ng registration ay nagpapalaya ng capacity nang walang anumang bookkeeping.
- Ang mga presyo ay MySQL DECIMAL column (mga string sa wire) na kinokonberte gamit ang `Number()` sa loob ng pricing helper.

## REST surface

Lahat ay nasa ilalim ng `/content/registrations` (`controllers/RegistrationController.ts`), binabantayan ng `Permissions.registrations` (`view` / `edit`):

| Route | Access | Layunin |
|-------|--------|---------|
| `POST /register` | anonymous | Kumpletong pagsusumite: guest, miyembro, o Add Attendee ng staff; server pricing, pagsusuri ng capacity, opsyonal na singil |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Mga type/selection na may nakuhang `used` / `remainingCapacity` para sa wizard |
| `POST /types`, `DELETE /types/:id` (kaparehong sa `/selections`, `/coupons`) | `registrations.edit` | CRUD ng settings ng staff |
| `POST /coupons/validate` | public | Inline na validation ng discount code habang nasa wizard |
| `GET /coupons/event/:eventId` | staff | Mga coupon na may bilang ng paggamit |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; bilang ng aktibo para sa display ng capacity |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, detalye, kasaysayan ng bayad |
| `PUT /:id` | may-ari/staff | Pag-edit pagkatapos ng pagsusumite -- pinapalitan ang mga miyembro at pagpili ng selection ng sariwang atomic na pagsusuri ng capacity, muling kinukuwenta ang `totalAmount`; hindi kailanman awtomatikong nagsisingil o nagre-refund |
| `POST /:id/pay` | may-ari | "Complete payment": sinisingil ang `totalAmount − amountPaid`, binabago ang `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | staff | Manual na pag-promote mula sa waitlist |
| `POST /:id/cancel` · `DELETE /:id` | may-ari · staff | Kanselahin / burahin; parehong nagti-trigger ng awtomatikong pag-promote mula sa waitlist |

Ang umiiral na non-cancelled na registration para sa parehong `personId` sa parehong event ay tinatanggihan ng 409, at bawat nilikhang registration ay naglalabas ng webhook na `registration.created` sa pamamagitan ng `WebhookDispatcher`.

## Presyo at mga discount code

Ang `helpers/RegistrationPricingHelper.ts` ang iisang awtoridad ng matematika ng pera:

- `computeTotal()` ay nagsusuma ng presyo ng type ng bawat miyembro kasama ang `presyo × dami` ng bawat choice ng selection.
- `validateCoupon()` ay nagpapatupad ng aktibong flag, saklaw ng petsa (`startDate`/`endDate`), `minMembers` laban sa laki ng party na isinumite, at `maxUses` laban sa bilang ng redemption na hinango mula sa status.
- `applyDiscount()` -- ang `percent` ay nagbabawas ng `total × value/100`; ang `amount` ay nagbabawas ng `value`; kapwa ay bumabagsak sa zero.

Tinatawag ng wizard ang `POST /coupons/validate` para sa inline na feedback, pero muling vina-validate at muling ina-apply ng `register` ang coupon sa panig ng server -- ang kabuuang ipinapakita ng client ay advisory lang.

## Ang atomic na idiom ng capacity

Bawat capacity-limited na insert ay ligtas na nagkakarera nang walang transaction o lock sa pamamagitan ng paggawa ng pagsusuri ng capacity bilang bahagi ng mismong `INSERT`. Sa antas ng event (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Ang zero na apektadong row ay nangangahulugang "at capacity". Ang parehong idiom ang nagbabantay sa insert kada uri (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, na nagbibilang ng mga miyembrong naka-join sa mga aktibong registration) at sa dami kada selection (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, gamit ang `COALESCE(SUM(quantity),0) + ? <= capacity`). Kapag may pumalyang insert ng miyembro o selection sa kalagitnaan ng registration, binabawi ng controller ang bahagyang registration gamit ang `deleteCascade()` at iniuulat kung aling uri o selection ang naubos.

## Daloy ng bayad {#payment-flow}

Ang `processRegistrationCharge` sa controller ang tanging lugar kung saan nakakaapekto ang mga registration sa pera, at ito ay manipis na client ng giving stack:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Nangyayari ang tokenization sa browser gaya ng sa mga donasyon (tingnan ang [Giving](./giving.md)) -- muling ginagamit ng wizard ang apphelper payment provider registry, kaya maaaring magbayad ang mga naka-log in na miyembro gamit ang mga naka-save na card at nagto-tokenize ng bagong card ang mga guest. Sinasalamin ng controller ang mga kakaibang ugali ng provider ng `DonateController` (mga payment-method id ng Kingdom Funding na `pm-{id}`, mga tugon ng Stripe SCA na `requires_action` na ibinabalik sa client nang hindi nagtatala ng bayad). Ang matagumpay na singil ay nagsusulat ng row ng `registrationPayments`, dinadagdagan ang `amountPaid`, at kinukumpirma ang registration. **Hindi pa naipapatupad ang mga refund** -- ang nakanselang bayad na registration ay nananatili ang mga row ng bayad, at anumang refund ay ginagawa sa labas ng sistema sa dashboard ng gateway.

Pareho ang landas ng code ng dalawang entry point: `register` (magbayad sa pag-sign up) at `pay` (bayad ng balanse / pagkumpleto ng waitlist).

Nilalaktawan ng `register` ang singil sa dalawang kaso at sine-save ang registration bilang `pending` na may `amountPaid = 0`, na iniiwan ang buong kabuuan bilang balanseng dapat bayaran:

- **Add Attendee ng staff.** Ang body ay may dalang `personId` na hindi sa caller, walang `guestInfo`, at may `registrations.edit` ang caller sa simbahang iyon. Dapat umiiral ang tao (404 kung hindi), nilalampasan ang filter ng miyembro ng household, at walang singil.
- **Walang gateway.** Walang giving gateway ang simbahan (sinusuri ng `hasGateway` ang `gateway.loadAll`). Ang payment step ng B1App ay nagpapakita ng **Register and Pay Later** sa halip na form ng card.

Ang mga guest (walang `au.id`) na may presyong registration ay dapat magdala ng `captchaPass` mula sa `POST /giving/donate/captcha-verify`. Tumatakbo ang `CaptchaPass.verify` (ngayon ay nasa `shared/helpers`) ilang sandali bago ang singil, kaya hindi naaapektuhan ang mga waitlist at libreng pag-sign up. Kapag `CAPTCHA_ENFORCE=true` at kulang o hindi valid ang pass, ibinabalik ang bagong registration gamit ang `deleteCascade()` at nagbabalik ang tawag ng 403. Ipinapakita ng `RegistrationPaymentForm` ng B1App ang checkbox ng reCAPTCHA sa mga guest at ipinapadala ang pass kasama ng pag-save ng card at ng registration.

## Lifecycle ng waitlist

Kapag puno ang event at naka-on ang flag na `waitlistEnabled` ng event, sine-save ng `register` ang party bilang `waitlisted` (nilalampasan ang pagsusuri ng capacity) at nagpapadala ng normal na email ng kumpirmasyon na minarkahang waitlist spot. Nangyayari ang pag-promote sa tatlong paraan -- `cancel`, `delete`, at ang staff na `promote` endpoint -- na lahat ay dumadaloy sa `RegistrationRepo.promoteFromWaitlist`, na pumipili ng pinakamatandang waitlisted na row at binabago ito nang atomic:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Pinipigilan ng guard na `status='waitlisted'` ang sabay-sabay na pag-promote na mag-doble-promote ng isang row, at pinipigilan ng subquery ng capacity na lumampas sa dapat ibenta ang pag-promote. Napupunta sa `pending` -- hindi `confirmed` -- ang mga na-promote na row dahil maaaring may utang pa na balanse; sinasabi ng `RegistrationHelper.sendWaitlistAvailabilityEmail` sa registrant na nagbukas ang puwesto nila at, kapag `totalAmount − amountPaid > 0`, nagli-link sa pahina ng B1 ng simbahan na `/mobile/registrations` (My Registrations), na binuo mula sa `B1AppRoot` at sa subdomain ng simbahan. Kapag nagbayad sila (o walang babayaran), kinukumpirma sila.

:::info
Hindi kusang nag-a-auto-promote ang pagtaas ng capacity -- ginagamit ng staff ang aksyong Promote ng roster pagkatapos itaas ang capacity. Awtomatikong nagpo-promote ang mga pagkansela at pagbura.
:::

## Mga client surface

- **Wizard ng B1App** -- iisang hook, `B1App/src/components/registration/useEventRegistration.ts`, ang nagpapatakbo sa website component (`components/registration/EventRegister.tsx`) at sa mobile portal screen (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) sa pamamagitan ng mga hakbang na `info → members → selections → questions → payment → confirm` (ang mga gitnang hakbang ay lumilitaw lang kapag may selection ang event, nakakabit na form, o nonzero na kabuuan). Ang mga hakbang ng info/members ay nagpapakita ng mga picker kada uri ng dadalo na may live na natitirang capacity at mga estadong sold-out; ang payment (`RegistrationPaymentForm.tsx`) ay nagpapakita ng order summary, pagpasok ng discount code, at -- para sa mga naka-log in na miyembro -- mga naka-save na paraan ng pagbabayad sa pamamagitan ng apphelper provider registry, habang nagto-tokenize ng bagong card ang mga guest. Ang screen ng **Registrations** sa mobile (`screens/RegistrationsPage.tsx`) ay ang My Registrations: status, balanseng dapat bayaran, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` -- contact, mga uri ng miyembro, dami ng selection), at Cancel.
- **Settings ng B1Admin** -- idinadagdag ng `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` ang switch na Enable Waitlist kasama ang mga accordion para sa Attendee Types, Selections, at Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), lahat ay CRUD laban sa mga route na `/types`, `/selections`, `/coupons`.
- **Roster ng B1Admin** -- `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: column ng Type kada dadalo, column na Paid/Total na may chip ng balanse, mga chip ng bilang kada uri, dialog ng detalye ng bayad (`RegistrationDetailDialog.tsx`, mula sa `GET /payments/:registrationId`), ang row action na Promote ng waitlist, at CSV export na kasama ang mga uri ng dadalo, selection, paid/total/balance, at mga sagot sa tanong.

Ang mga cross-module na lookup (pag-resolve o paggawa ng guest na tao, pag-load ng simbahan para sa mga email) ay dumadaan sa `getMembershipModuleGateway()` -- hindi kailanman direktang binabasa ng content module ang mga table ng membership.

## Mga Kaugnay na Pahina

- [Giving](./giving.md) -- ang gateway abstraction, provider registry, at modelo ng tokenization na muling ginagamit ng feature na ito
- [Content Endpoints](../api/endpoints/content.md) -- ang REST surface ng content module
- [Webhooks](../api/webhooks.md) -- ang event na `registration.created`
- [Module Structure](../api/module-structure.md) -- kung paano inaayos ang content module sa panig ng server
