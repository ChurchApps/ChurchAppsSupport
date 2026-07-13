---
title: "Kubhalisela Imicimbi"
---

# Kubhalisela Imicimbi

<div class="article-intro">

Kubhalisela imicimbi lokwakhelwe ngekwemvelo kuhlala emodyulini yekucuketfwa futsi, kusukela ekufikeni kwe-kubhalisela lokukhokhelwako, kuphetse imodeli legcwele yekuhweba: tinhlobo tebahambeli letinentengo, kukhetsa kwetintfo letengetiwe letinentengo, emakhodi ekunciphisa intengo, kukhokha ngetihlangu tekunikela tesekhona telibandla, kanye neluhlu lwekulinda lolucondziswa sistatus. Indlela yemali ngekucabanga isebentisa kabusha loyo mshini wekunikela, njengobe umlawuli wekubhalisela ukhokha nge-abstraction lefanako ye-`GatewayService` / `IGatewayProvider` lechaziwe ku-[Kunikela](./giving), ngako akukho lwati lwemininingwane yekhadi nome i-gateway SDK loluhlala emodyulini wekucuketfwa. Lelikhasi limephu imodeli yemininingwane, imitsetfo yentengo nesikhala, kanye netindlela tekubhalisa, kukhokha, nekulinda.

</div>

## Sifinyeto

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

Imitsetfo lemitsatfu isebenta kulesakhiwo:

1. **Iseva ngiyo lenayo intengo.** Ema-client atfumela ema-id wetinhlobo, ema-id wekukhetsa, kanye nemanani; i-`RegistrationPricingHelper.computeTotal()` ibala inani lelipheleleko ku-server-side kantsi emakhodi ekunciphisa ahlolwa kabusha ngesikhatsi sekukhokha. Inani lelifakwe yi-client alikaze litfenjwe.
2. **Sikhala sivikelwa ngekungakonakali ngesikhatsi sekufaka.** Kufakwa konkhe lokuvikelwe sikhala kusebentisa umbhalo we-`INSERT … SELECT … FROM dual WHERE (kubalwa kwemigca lesebentako) < sikhala`, ngako kubhaliswa lokubili ngesikhatsi sinye akukhoni kutsatsa sikhundla sekugcina lesisodwa. Kubala kususelwa ku-status (`pending`/`confirmed`), akukagcinwa nanini.
3. **Kukhokha kuhamba ngeliso lekunikela.** I-`RegistrationController` ibita i-`GatewayService.processCharge` lesabelene ngegeyithi lehlelwe yelibandla — abstraction lefanako yomhlinzeki, imodeli yetokheni, kanye nekuphatfwa kwe-SCA njengalokwenteka ngekunikela.

## Imodeli yemininingwane (`Api/src/modules/content`)

Emamodeli asendzaweni ye-`models/Registration.ts`; kufaniswa kwemathebula ku-`db/DatabaseTypes.ts`; repositori linye ngethebula ngaphansi kwe-`repositories/`.

| Lithebula | Lisho | Tinkambu letibalulekile |
|-------|---------|-----------|
| `registrations` | Kubhalisa kunye (umndeni/licembu kumcimbi munye) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Umhambeli munye ekubhalisweni | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tinhlobo tebahambeli ngemcimbi (sib. Umuntfu Lomkhulu / Umntfwana) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Tinketfo letengetiwe letibitwe libito letinentengo (sib. lihembe) | eventId, name, description, **price**, **capacity**, **maxQuantity** (umkhawulo ngekubhalisela) sort, active |
| `registrationSelectionChoices` | Linani lekukhetsa lokhethwe kubhaliso/lilunga | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Kukhokha kunye lokuphumelele kumelene nekubhalisa | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Emakhodi ekunciphisa ngemcimbi | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Emavi:

- **Akukho lithebula lelucwalo lwekulinda.** Emacembu asekulindzeni ngemigca ye-`registrations` lene-`status = 'waitlisted'`; sonkhe sikhatsi sekuphila kwekulinda tinhlelo tesistatus kulelo thebula linye.
- **Akukho tibalo letigciniwe.** Tibalo te-"tesitengiwe" / "tesetjentisiwe" (sikhala semcimbi, sikhala ngehlobo, sikhala ngekukhetsa, kusetjentiswa kwekhodi) tibalwa nge-correlated subquery phezu kwemigca lene-status leku-`('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Kukhansela kubhalisa kungako kukhulula sikhala ngephandle kwekugcina sibalo.
- Tintengo tikholomu te-MySQL DECIMAL (tincwadzi kudlulisela) letishintjwa nge-`Number()` ngekhatsi kwesisiti sentengo.

## Bubanti be-REST

Konkhe kungaphansi kwe-`/content/registrations` (`controllers/RegistrationController.ts`), kuvikelwe yi-`Permissions.registrations` (`view` / `edit`):

| Indlela | Kufinyelela | Injongo |
|-------|--------|---------|
| `POST /register` | leluhlaza | Kutfumela lokugcwele: sihambi nome lilunga, intengo ye-server, kuhlola sikhala, kukhokha lokungakhetfwa |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | phaketi | Tinhlobo/kukhetfwa lokunesikhala lesitfola kusuka ku-`used` / `remainingCapacity` yesikhatsi selikhasi lekubhalisela |
| `POST /types`, `DELETE /types/:id` (kufana ne-`/selections`, `/coupons`) | `registrations.edit` | CRUD yekuhleleka kwebasebenti |
| `POST /coupons/validate` | phaketi | Kuhlola khodi yekunciphisa ngekhatsi kwesikhatsi selikhasi lekubhalisela |
| `GET /coupons/event/:eventId` | basebenti | Emakhodi anemibalo yekusetjentiswa |
| `GET /event/:eventId` · `GET /event/:eventId/count` | basebenti · phaketi | Luhlu lwebahambeli; sibalo lesisebentako sekukhonjiswa kwesikhala |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | levunyelwe | Kubhalisa Kwami, imininingwane, umlandvo wekukhokha |
| `PUT /:id` | umnini/basebenti | Kuhlela ngemuva kwekutfumela — kushintja emalunga kanye nekukhetsa ngetihlolo letisha tesikhala, kubala kabusha `totalAmount`; ayikaze ikhokhe nome ibuyisele imali ngekutitjela |
| `POST /:id/pay` | umnini | "Kuphelelisa kukhokha": ikhokha `totalAmount − amountPaid`, ishintja `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | basebenti | Kunyusa kulinda ngesandla |
| `POST /:id/cancel` · `DELETE /:id` | umnini · basebenti | Khansela / sula; kokubili kuvusa kunyuswa kwekulinda ngekutitjela |

Kubhalisa lokungakakhanselwa lokusekhona lwe-`personId` lefanako emcimbini lofanako kuyalwa nge-409, futsi kubhalisa ngakunye lokwakhiwe kukhicita webhook ye-`registration.created` nge-`WebhookDispatcher`.

## Intengo netikhodi tekunciphisa

I-`helpers/RegistrationPricingHelper.ts` ngiyo sisekelo sinye sekubala imali:

- I-`computeTotal()` ihlanganisa intengo yehlobo lelunga ngalinye kanye nentengo yekukhetsa `price × quantity`.
- I-`validateCoupon()` isebentisa liphawu le-active, sikhala setinsuku (`startDate`/`endDate`), `minMembers` kumelene nebukhulu belicembu lelitfunyelwe, kanye ne-`maxUses` kumelene nesibalo sekusetjentiswa lesitfolwe ku-status.
- I-`applyDiscount()` — `percent` isusa `total × value/100`; `amount` isusa `value`; kokubili akukhoni kwehla ngephasi kwaliteta.

Ilikhasi lekubhalisela libita i-`POST /coupons/validate` kwentela imphendvulo lesheshako, kodvwa i-`register` iyahlola futsi isebentise khodi kabusha ku-server-side — inani lelikhonjiswa yi-client ngeleluleko kuphela.

## Umkhuba wesikhala lesingakonakali

Kufakwa konkhe lokuvikelwe sikhala kuncintisana ngekuphepha ngephandle kwe-transaction nome ma-lock ngekwenta kutsi kuhlolwa kwesikhala kube incenye ye-`INSERT` ngekwayo. Kulevele yemcimbi (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Kungabi khona imigca letsintekile kusho "sikhala sesigcwele". Umkhuba lofanako uvikela kufakwa ngehlobo ngalinye (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, ibala emalunga lahlangene nekubhalisa lokusebentako) kanye nemanani ngekukhetsa (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, isebentisa `COALESCE(SUM(quantity),0) + ? <= capacity`). Nangabe kufakwa kwelilunga nome kukhetsa kwehluleka ngesikhatsi sekubhalisela, umlawuli ubuyisela emuva kubhalisa lokungakapheleli nge-`deleteCascade()` bese ubika kutsi ngukuphi hlobo nome kukhetsa lokusetengiwe konkhe.

## Umtsetfo wekukhokha

I-`processRegistrationCharge` emlawulini kuyona indzawo yodvwa lapho kubhalisela kutsintsana khona nemali, futsi yi-client leyincane yemshini wekunikela:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Kufakwa kwetokheni kwenteka ku-browser njengalokwenteka ekunikeleni (bona [Kunikela](./giving)) — ilikhasi lekubhalisela lisebentisa kabusha luhlu lwabahlinzeki bekukhokha lwe-apphelper, ngako emalunga lasengenile angakhokha ngemakhadi lasagciniwe kantsi tihambi tifaka khadi lelisha. Umlawuli ufanana netindlela tekwenta te-`DonateController` (ema-id ekukhokha e-`pm-{id}` e-Kingdom Funding, imiphendvulo ye-Stripe SCA `requires_action` letibuyiselwa ku-client ngephandle kwekugcina kukhokha). Kukhokha lokuphumelele kubhala umugca we-`registrationPayments`, kunyusa `amountPaid`, futsi kuciniseka kubhalisa. **Kubuyisela imali akukagcinwa** — kubhalisa lokukhanselwe lokukhokhelwe kugcina imigca yayo yekukhokha futsi nome ngukuphi kubuyisela imali kuphatfwa ngephandle (out-of-band) ku-dashboard yeliso wekunikela.

Tindzawo tombili tekungena tihamba ngendlela lefanako yekhodi: `register` (khokha nasengabhalisela) kanye ne-`pay` (kukhokha lisele / kuphelelisa kulinda).

## Kuphila kwekulinda

Nangabe umcimbi ugcwele futsi liphawu le-`waitlistEnabled` lemcimbi liyasebenta, i-`register` igcina licembu njenge-`waitlisted` (iyeqa kuhlolwa sikhala) bese itfumela imeyili yekwemukela lejwayelekile lemakiwe njengesikhundla sekulinda. Kunyuswa kwenteka ngetindlela letintsatfu — `cancel`, `delete`, kanye ne-endpoint yebasebenti `promote` — konkhe kugeleta kuya ku-`RegistrationRepo.promoteFromWaitlist`, lekhetsa umugca lomdzala kunayo wonkhe wekulinda bese uwushintja ngekungakonakali:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Sivikelo se-`status='waitlisted'` sisho kutsi kunyuswa lokwenteka ngasikhatsi sinye akukhoni kunyusa kabili umugca munye, kantsi i-subquery yesikhala isho kutsi kunyuswa akukhoni kutengisa ngetulu kwesikhala. Imigca lenyusiwe iwela ku-`pending` — hhayi ku-`confirmed` — njengobe kusenokwenzeka kutsi kusesele lisele; i-`RegistrationHelper.sendWaitlistAvailabilityEmail` itjela lobhalisile kutsi sikhundla sakhe sesivulekile futsi, nangabe `totalAmount − amountPaid > 0`, ixhumanisa ekhasini lekuphelelisa kukhokha. Kukhokha (nome kungabi khona lisele) kuyabaciniseka.

:::info
Kunyuswa kwesikhala akuzenyusi ngekwako. Basebenti basebentisa sento se-Promote luhlu lwebahambeli ngemuva kwekunyusa sikhala. Kukhansela nekususa kunyusa ngekutitjela.
:::

## Bubanti be-client

- **Isihloko sekubhalisela se-B1App** — sibambo sinye lesabelene, i-`B1App/src/components/registration/useEventRegistration.ts`, sicondzisa kokubili incenye yewebusayithi (`components/registration/EventRegister.tsx`) kanye nesikrini se-mobile portal (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) kutinyatselo `info → members → selections → questions → payment → confirm` (tinyatselo tekhatsi tikhicitwa kuphela nangabe umcimbi unekukhetsa, i-fomu lehlotene, nome inani lelingasilutfo). Tinyatselo te-info/members tikhombisa kukhetsa ngehlobo lomhambeli ngalinye kunani lesikhala lesisele lokusesikhatsini kanye nesimo se-sold-out. Kukhokha (`RegistrationPaymentForm.tsx`) kukhombisa sifinyeto sekuoda, kufaka khodi yekunciphisa, futsi — kwentela emalunga lasengenile — tindlela tekukhokha letigciniwe nge-provider registry ye-apphelper, kantsi tihambi tifaka khadi lelisha. Sikrini se-mobile se-**Registrations** (`screens/RegistrationsPage.tsx`) ngu-My Registrations: sistatus, lisele lelisamele, Complete payment (`POST /:id/pay`), Edit (`PUT /:id` — tekutsintana, tinhlobo temalunga, manani ekukhetsa), kanye ne-Cancel.
- **Kuhleleka kwe-B1Admin** — i-`B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` yengeta i-switch ye-Enable Waitlist kanye ne-accordion ye-Attendee Types, Selections, kanye ne-Discount Codes (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), konkhe kuyi-CRUD kumele tindlela te-`/types`, `/selections`, `/coupons`.
- **Luhlu lwe-B1Admin** — i-`B1Admin/src/registrations/RegistrationDetailsPage.tsx`: likholomu le-Type ngemhambeli ngamunye, likholomu le-Paid/Total lenechip lelisele, ema-chip webalo ngehlobo ngalinye, i-dialog yemininingwane yekukhokha (`RegistrationDetailDialog.tsx`, kusuka ku-`GET /payments/:registrationId`), sento se-Promote sekulinda, kanye ne-CSV export lehlanganisa tinhlobo tebahambeli, kukhetsa, kukhokhelwe/lokupheleleko/lisele, kanye netimphendvulo temibuto.

Kubuka lokwelula-modyuli (kucaciswa nome kwakhwa kwesihambi, kulayisha libandla kwentela ema-imeyili) kuhamba nge-`getMembershipModuleGateway()` — umodyuli wekucuketfwa awukaze afundze emathebula e-membership ngco.

## Emakhasi Lahlobene

- [Kunikela](./giving) — abstraction yeliso, luhlu lwabahlinzeki, kanye nemodeli yetokheni lokusetjentiswa kabusha kulesikhono
- [Ema-Endpoint Ekucuketfwa](../api/endpoints/content) — bubanti be-REST bemodyuli wekucuketfwa
- [Ema-Webhook](../api/webhooks) — umcimbi we-`registration.created`
- [Sakhiwo Semodyuli](../api/module-structure) — kutsi umodyuli wekucuketfwa uhlelwe njani ku-server-side
