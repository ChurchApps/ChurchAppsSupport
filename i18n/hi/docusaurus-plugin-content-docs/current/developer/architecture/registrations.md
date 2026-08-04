---
title: "Event Registrations"
---

# Event Registrations

<div class="article-intro">

Native event registration content मॉड्यूल में रहता है और, paid-registrations वेव के बाद से, एक पूर्ण commerce मॉडल carry करता है: priced attendee types, priced add-on selections, discount codes, चर्च के मौजूदा giving गेटवे के माध्यम से payments, और एक status-driven waitlist। Money पाथ जानबूझकर giving stack को दोबारा उपयोग करता है — registration कंट्रोलर उसी shared `GatewayService` / `IGatewayProvider` abstraction के माध्यम से charge करता है जो [Giving](./giving) में डॉक्यूमेंट किया गया है, इसलिए content मॉड्यूल में कोई card डेटा या गेटवे SDK ज्ञान नहीं रहता। यह पृष्ठ data मॉडल, pricing और capacity नियमों, और registration, payment, और waitlist फ़्लो को मैप करता है।

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

पूरे स्टैक में तीन नियम लागू होते हैं:

1. **सर्वर कीमत का मालिक है।** क्लाइंट्स type ids, selection ids, और quantities सबमिट करते हैं; `RegistrationPricingHelper.computeTotal()` सर्वर-साइड कुल की गणना करता है और coupons को charge के समय दोबारा वैलिडेट किया जाता है। क्लाइंट द्वारा दी गई राशि पर कभी भरोसा नहीं किया जाता।
2. **Capacity को insert के समय atomically लागू किया जाता है।** हर capacity-limited insert एक `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` स्टेटमेंट का उपयोग करता है, इसलिए दो एक साथ हो रहे registrations दोनों आखिरी spot नहीं ले सकते। Counts स्टेटस (`pending`/`confirmed`) से derived होते हैं, कभी stored नहीं।
3. **Payments giving rails पर चलते हैं।** `RegistrationController` चर्च के कॉन्फ़िगर किए गए गेटवे के साथ shared `GatewayService.processCharge` को कॉल करता है — donations जैसा ही प्रोवाइडर abstraction, tokenization मॉडल, और SCA हैंडलिंग।

## डेटा मॉडल (`Api/src/modules/content`)

Models `models/Registration.ts` में हैं; table mappings `db/DatabaseTypes.ts` में; `repositories/` के तहत हर table के लिए एक repo।

| टेबल | अर्थ | मुख्य फ़ील्ड |
|-------|---------|-----------|
| `registrations` | एक registration (एक event के लिए एक household/party) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | एक registration पर एक attendee | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | प्रति-event attendee types (जैसे Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | कीमत वाले नामित add-on विकल्प (जैसे T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (प्रति-registration cap), sort, active |
| `registrationSelectionChoices` | एक registration/member द्वारा चुनी गई selection की मात्रा | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | एक registration के विरुद्ध एक सफल charge | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | प्रति-event discount codes | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

नोट्स:

- **कोई waitlist table नहीं है।** Waitlisted parties `status = 'waitlisted'` वाली `registrations` rows हैं; पूरा waitlist lifecycle उसी एक table पर स्टेटस transitions है।
- **कोई stored counters नहीं।** "Sold" / "used" counts (event capacity, per-type capacity, per-selection capacity, coupon uses) उन rows पर correlated subqueries से compute की जाती हैं जिनकी status `('pending','confirmed')` में है (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`)। इसलिए एक registration को cancel करना बिना किसी bookkeeping के capacity को खाली कर देता है।
- कीमतें MySQL DECIMAL columns हैं (wire पर strings) जिन्हें pricing helper के अंदर `Number()` से coerce किया जाता है।

## REST सतह

सब कुछ `/content/registrations` (`controllers/RegistrationController.ts`) के तहत है, जो `Permissions.registrations` (`view` / `edit`) से gated है:

| Route | Access | उद्देश्य |
|-------|--------|---------|
| `POST /register` | anonymous | पूर्ण submission: guest या member, सर्वर pricing, capacity checks, वैकल्पिक charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | public | Wizard के लिए derived `used` / `remainingCapacity` के साथ types/selections |
| `POST /types`, `DELETE /types/:id` (`/selections`, `/coupons` के लिए भी वही) | `registrations.edit` | स्टाफ़ सेटिंग्स CRUD |
| `POST /coupons/validate` | public | Wizard के दौरान inline discount-code वैलिडेशन |
| `GET /coupons/event/:eventId` | staff | Uses counts के साथ Coupons |
| `GET /event/:eventId` · `GET /event/:eventId/count` | staff · public | Roster; capacity display के लिए active-count |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | authed | My Registrations, विवरण, payment इतिहास |
| `PUT /:id` | owner/staff | Submission के बाद संपादन — fresh atomic capacity checks के साथ members और selection choices को बदलता है, `totalAmount` को recompute करता है; कभी auto-charge या refund नहीं करता |
| `POST /:id/pay` | owner | "Complete payment": `totalAmount − amountPaid` को charge करता है, `waitlisted`/`pending` → `confirmed` को flip करता है |
| `POST /:id/promote` | staff | मैनुअल waitlist प्रमोशन |
| `POST /:id/cancel` · `DELETE /:id` | owner · staff | Cancel / delete; दोनों waitlist auto-promotion ट्रिगर करते हैं |

एक ही event पर एक ही `personId` के लिए एक non-cancelled मौजूदा registration को 409 के साथ रिजेक्ट किया जाता है, और हर बना registration `WebhookDispatcher` के माध्यम से एक `registration.created` webhook भेजता है।

## Pricing और discount codes

`helpers/RegistrationPricingHelper.ts` एकमात्र money-math authority है:

- `computeTotal()` हर member की type कीमत को हर selection choice की `price × quantity` के साथ जोड़ता है।
- `validateCoupon()` active फ़्लैग, date window (`startDate`/`endDate`), submitted party size के विरुद्ध `minMembers`, और status-derived redemption count के विरुद्ध `maxUses` को लागू करता है।
- `applyDiscount()` — `percent` `total × value/100` को घटाता है; `amount` `value` को घटाता है; दोनों शून्य पर floor होते हैं।

Wizard inline फ़ीडबैक के लिए `POST /coupons/validate` को कॉल करता है, लेकिन `register` सर्वर-साइड coupon को दोबारा वैलिडेट और लागू करता है — क्लाइंट का दिखाया गया कुल केवल सलाहकारी है।

## Atomic capacity idiom

हर capacity-limited insert capacity जाँच को `INSERT` का ही हिस्सा बनाकर बिना transactions या locks के सुरक्षित रूप से race करता है। Event-level (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

शून्य प्रभावित rows का मतलब है "क्षमता पर"। वही idiom per-type inserts की रक्षा करता है (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, active registrations से जुड़े members को गिनते हुए) और per-selection quantities की (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` का उपयोग करते हुए)। जब कोई member या selection insert registration के बीच में विफल होता है, कंट्रोलर `deleteCascade()` के साथ आंशिक registration को वापस रोल करता है और बताता है कि कौन सा type या selection sold out हुआ।

## Payment फ़्लो

कंट्रोलर में `processRegistrationCharge` एकमात्र जगह है जहाँ registrations पैसे को छूते हैं, और यह giving stack का एक पतला client है:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenization ब्राउज़र में बिल्कुल donations की तरह होता है (देखें [Giving](./giving)) — wizard apphelper payment provider रजिस्ट्री को दोबारा उपयोग करता है, इसलिए लॉग-इन members saved कार्ड से पे कर सकते हैं और guests एक नया कार्ड टोकनाइज़ करते हैं। कंट्रोलर `DonateController` की प्रोवाइडर quirks को mirror करता है (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` responses कोई payment रिकॉर्ड किए बिना क्लाइंट को लौटाए जाते हैं)। एक सफल charge एक `registrationPayments` row लिखता है, `amountPaid` को बढ़ाता है, और registration की पुष्टि करता है। **Refunds लागू नहीं किए गए हैं** — एक cancelled paid registration अपनी payment rows रखता है और कोई भी refund गेटवे dashboard में out-of-band हैंडल किया जाता है।

दोनों entry points एक ही code path से route होते हैं: `register` (साइनअप पर pay) और `pay` (शेष payment / waitlist completion)।

## Waitlist lifecycle

जब event भरा हो और event का `waitlistEnabled` फ़्लैग चालू हो, `register` party को `waitlisted` के रूप में सेव करता है (capacity checks को skip करते हुए) और सामान्य confirmation ईमेल को एक waitlist spot के रूप में चिह्नित करके भेजता है। Promotion तीन तरीकों से होता है — `cancel`, `delete`, और staff `promote` endpoint — सभी `RegistrationRepo.promoteFromWaitlist` में funnel होते हैं, जो सबसे पुरानी waitlisted row चुनता है और इसे atomically flip करता है:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` गार्ड का मतलब है कि समवर्ती promotions एक row को double-promote नहीं कर सकते, और capacity subquery का मतलब है कि एक promotion oversell नहीं कर सकता। Promoted rows `pending` पर लैंड करते हैं — `confirmed` नहीं — क्योंकि एक शेष राशि अभी भी बकाया हो सकती है; `RegistrationHelper.sendWaitlistAvailabilityEmail` registrant को बताता है कि उनकी spot खुल गई और, जब `totalAmount − amountPaid > 0`, complete-payment पेज को लिंक करता है। भुगतान करना (या कोई शेष न होना) उन्हें confirm कर देता है।

:::info
एक capacity बढ़ाना अपने आप auto-promote नहीं करता — capacity बढ़ाने के बाद स्टाफ़ roster की Promote क्रिया का उपयोग करते हैं। Cancels और deletes स्वचालित रूप से promote करते हैं।
:::

## क्लाइंट सतहें

- **B1App wizard** — एक shared hook, `B1App/src/components/registration/useEventRegistration.ts`, वेबसाइट component (`components/registration/EventRegister.tsx`) और mobile पोर्टल स्क्रीन (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) दोनों को `info → members → selections → questions → payment → confirm` steps से चलाता है (बीच के steps केवल तभी render होते हैं जब event के पास selections, एक जुड़ा हुआ form, या एक nonzero total हो)। Info/members steps लाइव remaining-capacity और sold-out स्टेटस के साथ प्रति-attendee-type pickers दिखाते हैं; payment (`RegistrationPaymentForm.tsx`) order summary, discount-code entry, और — लॉग-इन members के लिए — apphelper प्रोवाइडर रजिस्ट्री के माध्यम से saved payment methods दिखाता है, guests एक नया कार्ड टोकनाइज़ करते हैं। **Registrations** mobile स्क्रीन (`screens/RegistrationsPage.tsx`) My Registrations है: स्टेटस, बकाया राशि, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` — संपर्क, member types, selection quantities), और Cancel।
- **B1Admin settings** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` Attendee Types, Selections, और Discount Codes के accordions के साथ Enable Waitlist स्विच जोड़ता है (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), सभी `/types`, `/selections`, `/coupons` routes के विरुद्ध CRUD।
- **B1Admin roster** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: प्रति-attendee Type column, balance chip के साथ Paid/Total column, प्रति-type count chips, एक payments detail dialog (`RegistrationDetailDialog.tsx`, `GET /payments/:registrationId` से), waitlist Promote row action, और attendee types, selections, paid/total/balance, और question answers सहित CSV export।

Cross-module lookups (guest person को resolve या बनाना, ईमेल के लिए चर्च लोड करना) `getMembershipModuleGateway()` से होकर जाते हैं — content मॉड्यूल कभी membership tables को सीधे नहीं पढ़ता।

## संबंधित पृष्ठ

- [Giving](./giving) — गेटवे abstraction, प्रोवाइडर रजिस्ट्री, और tokenization मॉडल जिसे यह फ़ीचर दोबारा उपयोग करता है
- [Content Endpoints](../api/endpoints/content) — content मॉड्यूल की REST सतह
- [Webhooks](../api/webhooks) — `registration.created` event
- [Module Structure](../api/module-structure) — content मॉड्यूल को सर्वर-साइड कैसे व्यवस्थित किया जाता है
