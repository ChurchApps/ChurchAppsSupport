---
title: "Event Registrations"
description: "B1 Admin और B1App में कार्यक्रम पंजीकरण कैसे काम करते हैं: प्रतिभागी प्रकार, भुगतान वाले ऐड-ऑन, छूट कोड, गेटवे के माध्यम से भुगतान और प्रतीक्षा सूची से पदोन्नति।"
---

# Event Registrations

<div class="article-intro">

मूल इवेंट पंजीकरण content मॉड्यूल में रहता है और paid-registrations वेव के बाद से एक पूर्ण कॉमर्स मॉडल रखता है: मूल्य वाले attendee types, मूल्य वाले add-on selections, डिस्काउंट कोड, चर्च के मौजूदा giving gateway के माध्यम से भुगतान, और स्थिति-संचालित प्रतीक्षा सूची। भुगतान पथ जानबूझकर giving स्टैक का पुन: उपयोग करता है -- पंजीकरण नियंत्रक उसी `GatewayService` / `IGatewayProvider` abstraction के माध्यम से charge करता है जो [Giving](./giving.md) में वर्णित है, इसलिए content मॉड्यूल में कोई कार्ड डेटा या gateway SDK ज्ञान नहीं रहता। यह पृष्ठ डेटा मॉडल, मूल्य निर्धारण और क्षमता नियम, और पंजीकरण, भुगतान, और प्रतीक्षा सूची प्रवाह का मानचित्र देता है।

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

स्टैक में तीन नियम लागू होते हैं:

1. **सर्वर कीमत का मालिक है।** क्लाइंट type ids, selection ids, और मात्राएँ सबमिट करते हैं; `RegistrationPricingHelper.computeTotal()` कुल की गणना सर्वर-साइड करता है और कूपन charge के समय फिर से सत्यापित होते हैं। क्लाइंट द्वारा भेजी राशि कभी भरोसेमंद नहीं मानी जाती।
2. **क्षमता insert के समय परमाणु रूप से लागू होती है।** हर क्षमता-सीमित insert `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` statement का उपयोग करता है, ताकि दो एक साथ पंजीकरण आखिरी स्थान न ले सकें। गिनतियाँ स्थिति से व्युत्पन्न होती हैं (`pending`/`confirmed`), कभी संग्रहीत नहीं।
3. **भुगतान giving रेल पर चलते हैं।** `RegistrationController` चर्च के कॉन्फ़िगर किए gateway के साथ साझा `GatewayService.processCharge` को कॉल करता है -- वही provider abstraction, tokenization मॉडल, और SCA हैंडलिंग जो दानों के लिए है।

## डेटा मॉडल (`Api/src/modules/content`)

मॉडल `models/Registration.ts` में हैं; तालिका मैपिंग `db/DatabaseTypes.ts` में; हर तालिका के लिए `repositories/` के अंतर्गत एक repo।

| तालिका | अर्थ | मुख्य फ़ील्ड |
|-------|---------|-----------|
| `registrations` | एक पंजीकरण (एक इवेंट के लिए एक परिवार/पक्ष) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | एक पंजीकरण पर एक उपस्थित व्यक्ति | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | प्रति इवेंट उपस्थित प्रकार (जैसे Adult / Child) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | मूल्य वाले नामित add-on विकल्प (जैसे T-shirt) | eventId, name, description, **price**, **capacity**, **maxQuantity** (प्रति-पंजीकरण सीमा), sort, active |
| `registrationSelectionChoices` | एक पंजीकरण/सदस्य द्वारा चुनी गई selection की मात्रा | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | एक पंजीकरण के विरुद्ध एक सफल charge | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | प्रति इवेंट डिस्काउंट कोड | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

नोट्स:

- **कोई प्रतीक्षा सूची तालिका नहीं है।** प्रतीक्षा सूची के पक्ष `registrations` पंक्तियाँ हैं जिनका `status = 'waitlisted'` है; पूरा प्रतीक्षा सूची जीवनचक्र उस एक तालिका पर स्थिति संक्रमण है।
- **कोई संग्रहीत काउंटर नहीं।** "Sold" / "used" गिनतियाँ (इवेंट क्षमता, प्रति-प्रकार क्षमता, प्रति-selection क्षमता, कूपन उपयोग) उन पंक्तियों पर correlated subqueries से गणना की जाती हैं जिनकी स्थिति `('pending','confirmed')` में है (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`)। इसलिए पंजीकरण रद्द करने से बिना किसी bookkeeping के क्षमता मुक्त होती है।
- कीमतें MySQL DECIMAL कॉलम हैं (wire पर strings) जिन्हें मूल्य helper के भीतर `Number()` से बदला जाता है।

## REST सतह

सब कुछ `/content/registrations` के अंतर्गत है (`controllers/RegistrationController.ts`), `Permissions.registrations` (`view` / `edit`) द्वारा गेट:

| रूट | पहुँच | उद्देश्य |
|-------|--------|---------|
| `POST /register` | गुमनाम | पूर्ण सबमिशन: अतिथि, सदस्य, या स्टाफ़ Add Attendee; सर्वर मूल्य निर्धारण, क्षमता जाँच, वैकल्पिक charge |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | सार्वजनिक | wizard के लिए `used` / `remainingCapacity` के साथ types/selections |
| `POST /types`, `DELETE /types/:id` (`/selections`, `/coupons` के लिए भी) | `registrations.edit` | स्टाफ़ सेटिंग्स CRUD |
| `POST /coupons/validate` | सार्वजनिक | wizard के दौरान इनलाइन डिस्काउंट कोड सत्यापन |
| `GET /coupons/event/:eventId` | स्टाफ़ | uses गिनती के साथ कूपन |
| `GET /event/:eventId` · `GET /event/:eventId/count` | स्टाफ़ · सार्वजनिक | रोस्टर; क्षमता प्रदर्शन के लिए सक्रिय गिनती |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | प्रमाणित | My Registrations, विवरण, भुगतान इतिहास |
| `PUT /:id` | मालिक/स्टाफ़ | सबमिशन के बाद संपादन -- ताज़ा परमाणु क्षमता जाँच के साथ सदस्यों और selection choices को बदलता है, `totalAmount` पुनर्गणना करता है; कभी स्वतः charge या रिफ़ंड नहीं |
| `POST /:id/pay` | मालिक | "Complete payment": `totalAmount − amountPaid` charge करता है, `waitlisted`/`pending` → `confirmed` करता है |
| `POST /:id/promote` | स्टाफ़ | मैन्युअल प्रतीक्षा सूची प्रमोशन |
| `POST /:id/cancel` · `DELETE /:id` | मालिक · स्टाफ़ | रद्द / हटाएँ; दोनों प्रतीक्षा सूची स्वतः-प्रमोशन ट्रिगर करते हैं |

उसी `personId` के उसी इवेंट पर एक गैर-रद्द मौजूदा पंजीकरण 409 से अस्वीकार होता है, और बनाया गया हर पंजीकरण `WebhookDispatcher` के माध्यम से `registration.created` webhook भेजता है।

## मूल्य निर्धारण और डिस्काउंट कोड

`helpers/RegistrationPricingHelper.ts` एकल धन-गणित प्राधिकरण है:

- `computeTotal()` हर सदस्य के type मूल्य और हर selection choice के `price × quantity` को जोड़ता है।
- `validateCoupon()` सक्रिय फ़्लैग, तारीख सीमा (`startDate`/`endDate`), सबमिट किए गए पक्ष आकार के विरुद्ध `minMembers`, और स्थिति-व्युत्पन्न भुनाई गई संख्या के विरुद्ध `maxUses` लागू करता है।
- `applyDiscount()` -- `percent` `total × value/100` घटाता है; `amount` `value` घटाता है; दोनों शून्य पर रुकते हैं।

wizard इनलाइन फ़ीडबैक के लिए `POST /coupons/validate` कॉल करता है, लेकिन `register` कूपन को सर्वर-साइड पर फिर से सत्यापित और लागू करता है -- क्लाइंट द्वारा दिखाया गया कुल केवल सलाहकार है।

## परमाणु क्षमता मुहावरा

हर क्षमता-सीमित insert transactions या locks के बिना सुरक्षित रूप से दौड़ता है, क्षमता जाँच को `INSERT` का ही हिस्सा बनाकर। इवेंट-स्तर (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

शून्य प्रभावित पंक्तियों का अर्थ है "क्षमता पर।" वही मुहावरा प्रति-प्रकार insert की रक्षा करता है (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, सक्रिय पंजीकरणों से जुड़े सदस्यों की गिनती) और प्रति-selection मात्रा (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` का उपयोग)। जब किसी सदस्य या selection insert का पंजीकरण के बीच विफल होता है, तो नियंत्रक `deleteCascade()` से आंशिक पंजीकरण वापस लेता है और बताता है कि कौन सा type या selection बिक गया।

## भुगतान प्रवाह {#payment-flow}

नियंत्रक में `processRegistrationCharge` एकमात्र स्थान है जहाँ पंजीकरण पैसे को छूते हैं, और यह giving स्टैक का एक पतला क्लाइंट है:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenization ठीक दानों की तरह ब्राउज़र में होता है (देखें [Giving](./giving.md)) -- wizard apphelper payment provider रजिस्ट्री का पुन: उपयोग करता है, इसलिए लॉग-इन सदस्य सहेजे कार्डों से भुगतान कर सकते हैं और अतिथि एक नए कार्ड को tokenize करते हैं। नियंत्रक `DonateController` की provider विचित्रताओं को दर्शाता है (Kingdom Funding `pm-{id}` payment-method ids, Stripe SCA `requires_action` प्रतिक्रियाएँ जो भुगतान रिकॉर्ड किए बिना क्लाइंट को लौटाई जाती हैं)। सफल charge एक `registrationPayments` पंक्ति लिखता है, `amountPaid` बढ़ाता है, और पंजीकरण की पुष्टि करता है। **रिफ़ंड लागू नहीं हैं** -- एक रद्द किया गया भुगतान वाला पंजीकरण अपनी भुगतान पंक्तियाँ रखता है और किसी भी रिफ़ंड को gateway डैशबोर्ड में बाहर से संभाला जाता है।

दोनों प्रवेश बिंदु एक ही कोड पथ से गुज़रते हैं: `register` (साइनअप पर भुगतान) और `pay` (शेष भुगतान / प्रतीक्षा सूची पूर्णता)।

`register` दो स्थितियों में charge छोड़ता है और पंजीकरण को `amountPaid = 0` के साथ `pending` के रूप में सहेजता है, पूरा कुल बकाया छोड़ते हुए:

- **स्टाफ़ Add Attendee।** बॉडी में एक `personId` होता है जो कॉलर का नहीं है, कोई `guestInfo` नहीं, और कॉलर के पास उस चर्च में `registrations.edit` है। व्यक्ति का होना आवश्यक है (अन्यथा 404), परिवार सदस्य फ़िल्टर बायपास होता है, और कोई कार्ड charge नहीं होता।
- **कोई gateway नहीं।** चर्च के पास कोई giving gateway नहीं है (`hasGateway` `gateway.loadAll` जाँचता है)। B1App भुगतान चरण कार्ड फ़ॉर्म की जगह **Register and Pay Later** दिखाता है।

अतिथि (कोई `au.id` नहीं) मूल्य वाले पंजीकरणों में `POST /giving/donate/captcha-verify` से एक `captchaPass` होना चाहिए। `CaptchaPass.verify` (अब `shared/helpers` में) charge से ठीक पहले चलता है, इसलिए प्रतीक्षा सूची और मुफ़्त साइनअप प्रभावित नहीं होते। जब `CAPTCHA_ENFORCE=true` हो और pass गायब या अमान्य हो, तो नया पंजीकरण `deleteCascade()` से वापस लिया जाता है और कॉल 403 लौटाता है। B1App का `RegistrationPaymentForm` अतिथियों को reCAPTCHA चेकबॉक्स दिखाता है और कार्ड save और पंजीकरण दोनों के साथ pass भेजता है।

## प्रतीक्षा सूची जीवनचक्र

जब इवेंट भरा हो और इवेंट का `waitlistEnabled` फ़्लैग चालू हो, तो `register` पक्ष को `waitlisted` के रूप में सहेजता है (क्षमता जाँच छोड़ते हुए) और सामान्य पुष्टि ईमेल को प्रतीक्षा सूची स्थान के रूप में चिह्नित करके भेजता है। प्रमोशन तीन तरीकों से होता है -- `cancel`, `delete`, और स्टाफ़ `promote` endpoint -- सभी `RegistrationRepo.promoteFromWaitlist` में मिलते हैं, जो सबसे पुरानी प्रतीक्षा सूची वाली पंक्ति चुनता है और उसे परमाणु रूप से पलटता है:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` guard का अर्थ है कि समवर्ती प्रमोशन एक ही पंक्ति को दो बार प्रमोट नहीं कर सकते, और क्षमता subquery का अर्थ है कि प्रमोशन ओवरसेल नहीं कर सकता। प्रमोट की गई पंक्तियाँ `confirmed` के बजाय `pending` पर उतरती हैं, क्योंकि शेष राशि अब भी देय हो सकती है; `RegistrationHelper.sendWaitlistAvailabilityEmail` पंजीकरणकर्ता को बताता है कि उनका स्थान खुल गया है और, जब `totalAmount − amountPaid > 0` हो, चर्च के B1 `/mobile/registrations` पृष्ठ (My Registrations) से लिंक करता है, जो `B1AppRoot` और चर्च सबडोमेन से बनता है। भुगतान करने (या कोई शेष न होने) पर वे पुष्ट होते हैं।

:::info
क्षमता बढ़ाने से अपने आप प्रमोशन नहीं होता -- स्टाफ़ क्षमता बढ़ाने के बाद रोस्टर की Promote क्रिया उपयोग करते हैं। रद्द और हटाना स्वचालित रूप से प्रमोट करते हैं।
:::

## क्लाइंट सतहें

- **B1App wizard** -- एक साझा hook, `B1App/src/components/registration/useEventRegistration.ts`, वेबसाइट कंपोनेंट (`components/registration/EventRegister.tsx`) और मोबाइल portal स्क्रीन (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) दोनों को चरणों `info → members → selections → questions → payment → confirm` के माध्यम से चलाता है (बीच के चरण केवल तभी रेंडर होते हैं जब इवेंट में selections, संलग्न फ़ॉर्म, या शून्येतर कुल हो)। info/members चरण प्रति-attendee-type पिकर दिखाते हैं जिनमें लाइव शेष क्षमता और बिके-हुए (sold-out) स्थितियाँ होती हैं; भुगतान (`RegistrationPaymentForm.tsx`) order summary, डिस्काउंट कोड प्रविष्टि, और -- लॉग-इन सदस्यों के लिए -- apphelper provider रजिस्ट्री के माध्यम से सहेजी भुगतान विधियाँ दिखाता है, जबकि अतिथि नया कार्ड tokenize करते हैं। **Registrations** मोबाइल स्क्रीन (`screens/RegistrationsPage.tsx`) My Registrations है: स्थिति, बकाया राशि, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` -- संपर्क, सदस्य प्रकार, selection मात्राएँ), और Cancel।
- **B1Admin सेटिंग्स** -- `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` Enable Waitlist स्विच के साथ Attendee Types, Selections, और Discount Codes के accordions जोड़ता है (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), सभी `/types`, `/selections`, `/coupons` रूट्स के विरुद्ध CRUD।
- **B1Admin रोस्टर** -- `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: प्रति-attendee Type कॉलम, Paid/Total कॉलम बकाया चिप के साथ, प्रति-type गिनती चिप्स, एक भुगतान विवरण डायलॉग (`RegistrationDetailDialog.tsx`, `GET /payments/:registrationId` से), प्रतीक्षा सूची Promote पंक्ति क्रिया, और CSV निर्यात जिसमें attendee types, selections, paid/total/balance, और प्रश्नों के उत्तर शामिल हैं।

Cross-module lookups (अतिथि व्यक्ति को हल या बनाना, ईमेल के लिए चर्च लोड करना) `getMembershipModuleGateway()` के माध्यम से जाते हैं -- content मॉड्यूल membership तालिकाएँ सीधे कभी नहीं पढ़ता।

## संबंधित पृष्ठ

- [Giving](./giving.md) -- gateway abstraction, provider रजिस्ट्री, और tokenization मॉडल जिनका यह फ़ीचर पुन: उपयोग करता है
- [Content Endpoints](../api/endpoints/content.md) -- content मॉड्यूल की REST सतह
- [Webhooks](../api/webhooks.md) -- `registration.created` इवेंट
- [Module Structure](../api/module-structure.md) -- content मॉड्यूल सर्वर-साइड पर कैसे व्यवस्थित है
