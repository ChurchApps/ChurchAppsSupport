---
title: "Renginių registracijos"
description: "Renginių registracijos B1 Admin ir B1App: dalyvių tipai, mokami priedai, nuolaidų kodai, mokėjimai per aukų tarpininką ir laukiančiųjų sąrašas."
---

# Renginių registracijos

<div class="article-intro">

Vietinė renginių registracija gyvena turinio modulyje ir nuo mokamų registracijų etapo turi visą komercinį modelį: įkainotus dalyvių tipus, įkainotus papildomus pasirinkimus, nuolaidų kodus, mokėjimus per esamą bažnyčios aukojimo šliuzą ir būsenomis valdomą laukiamojo sąrašą. Mokėjimo kelias tyčia pakartoja aukojimo sistemą: registracijos valdiklis mokėjimus apdoroja per tą pačią `GatewayService` / `IGatewayProvider` abstrakciją, aprašytą [Aukojimas](./giving.md) puslapyje, todėl turinio modulyje nėra jokių kortelių duomenų ar šliuzo SDK žinių. Šiame puslapyje aprašomas duomenų modelis, kainodaros ir talpos taisyklės bei registracijos, mokėjimo ir laukiamojo sąrašo eigos.

</div>

## Apžvalga

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (narių portalas)       │            │ Api — turinio modulis                       │
│  registracijos vedlys ·      │   HTTPS    │  RegistrationController                     │
│  Mano registracijos          │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (serverio kainos)│
│ B1Admin (darbuotojai)        │            │  RegistrationHelper (el. laiškai)           │
│  renginio registracijos      │            └───────────────┬─────────────────────────────┘
│  nustatymai · sąrašas ·      │                            │ processCharge
│  CSV eksportas               │                            ▼
└──────────────────────────────┘            ┌─────────────────────────────────────────────┐
                                            │ bendra šliuzo abstrakcija (aukojimas)       │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Trys taisyklės galioja visoje sistemoje:

1. **Kainą valdo serveris.** Klientai pateikia tipų ID, pasirinkimų ID ir kiekius; `RegistrationPricingHelper.computeTotal()` apskaičiuoja bendrą sumą serveryje, o kuponai patikrinami iš naujo mokėjimo metu. Klientų pateiktai sumai niekada nepasitikima.
2. **Talpa tikrinama atomiškai įterpimo metu.** Kiekvienas įrašas su talpos riba naudoja `INSERT … SELECT … FROM dual WHERE (aktyvių įrašų skaičius) < talpa` sakinį, todėl dvi vienu metu vykstančios registracijos negali abi užimti paskutinės vietos. Skaičiai skaičiuojami pagal būseną (`pending`/`confirmed`), jie niekada nesaugomi atskirai.
3. **Mokėjimai eina aukojimo keliu.** `RegistrationController` kviečia bendrą `GatewayService.processCharge` su bažnyčios sukonfigūruotu šliuzu. Tai ta pati teikėjo abstrakcija, tokenizavimo modelis ir SCA apdorojimas kaip aukojimams.

## Duomenų modelis (`Api/src/modules/content`)

Modeliai yra `models/Registration.ts`, lentelių atitikmenys `db/DatabaseTypes.ts`, o kiekvienai lentelei yra atskiras saugykla `repositories/` kataloge.

| Lentelė | Reikšmė | Pagrindiniai laukai |
|-------|---------|-----------|
| `registrations` | Viena registracija (viena šeima / grupė vienam renginiui) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Vienas dalyvis registracijoje | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Dalyvių tipai kiekvienam renginiui (pvz., Suaugęs / Vaikas) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Pavadinti papildomi pasirinkimai su kaina (pvz., marškinėliai) | eventId, name, description, **price**, **capacity**, **maxQuantity** (vienos registracijos riba), sort, active |
| `registrationSelectionChoices` | Pasirinkto pasirinkimo kiekis registracijai ar dalyviui | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Vienas sėkmingas mokėjimas už registraciją | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Nuolaidų kodai kiekvienam renginiui | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Pastabos:

- **Laukiamojo sąrašo lentelės nėra.** Laukiamojo sąrašo grupės yra `registrations` įrašai su `status = 'waitlisted'`; visas laukiamojo sąrašo ciklas yra būsenų pakeitimai toje vienoje lentelėje.
- **Skaitliukai nesaugomi.** „Parduotų“ / „panaudotų“ vietų skaičius (renginio talpa, talpa pagal tipą, talpa pagal pasirinkimą, kupono panaudojimai) skaičiuojamas koreliuotais subužklausomis, veikiančiomis su įrašais, kurių būsena yra `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Todėl registracijos atšaukimas atlaisvina vietą be jokio papildomo apskaitos darbo.
- Kainos yra MySQL DECIMAL stulpeliai (perduodami kaip eilutės), kuriuos kainodaros pagalbinė funkcija konvertuoja su `Number()`.

## REST sąsaja

Visi maršrutai yra po `/content/registrations` (`controllers/RegistrationController.ts`) ir saugomi `Permissions.registrations` (`view` / `edit`) leidimais:

| Maršrutas | Prieiga | Paskirtis |
|-------|--------|---------|
| `POST /register` | anoniminė | Pilnas pateikimas: svečias, narys ar darbuotojo pridėtas dalyvis; serverio kainodara, talpos tikrinimas, nebūtinas mokėjimas |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | viešas | Tipai / pasirinkimai su apskaičiuotais `used` / `remainingCapacity` vedliui |
| `POST /types`, `DELETE /types/:id` (tas pats su `/selections`, `/coupons`) | `registrations.edit` | Darbuotojų nustatymų CRUD |
| `POST /coupons/validate` | viešas | Nuolaidos kodo tikrinimas vedlio metu |
| `GET /coupons/event/:eventId` | darbuotojai | Kuponai su panaudojimo skaičiais |
| `GET /event/:eventId` · `GET /event/:eventId/count` | darbuotojai · viešas | Sąrašas; aktyvių dalyvių skaičius talpos rodymui |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | prisijungęs | Mano registracijos, informacija, mokėjimų istorija |
| `PUT /:id` | savininkas / darbuotojas | Redagavimas po pateikimo: pakeičia dalyvius ir pasirinkimus naujais atominiais talpos tikrinimais, perskaičiuoja `totalAmount`; niekada automatiškai nemoka ir negrąžina pinigų |
| `POST /:id/pay` | savininkas | „Užbaigti mokėjimą“: nurašo `totalAmount − amountPaid`, pakeičia `waitlisted` / `pending` į `confirmed` |
| `POST /:id/promote` | darbuotojai | Rankinis perkėlimas iš laukiamojo sąrašo |
| `POST /:id/cancel` · `DELETE /:id` | savininkas · darbuotojai | Atšaukimas / ištrynimas; abu automatiškai perkelia iš laukiamojo sąrašo |

Jei tam pačiam `personId` tame pačiame renginyje jau yra neatšauktas registracijos įrašas, grąžinama 409 klaida, o kiekviena sukurta registracija išsiunčia `registration.created` webhook įvykį per `WebhookDispatcher`.

## Kainodara ir nuolaidų kodai

`helpers/RegistrationPricingHelper.ts` yra vienintelis pinigų skaičiavimų šaltinis:

- `computeTotal()` sudeda kiekvieno dalyvio tipo kainą ir kiekvieno pasirinkimo `kaina × kiekis`.
- `validateCoupon()` tikrina aktyvumo žymą, datų intervalą (`startDate`/`endDate`), `minMembers` pagal pateiktos grupės dydį ir `maxUses` pagal būsena apskaičiuotą panaudojimų skaičių.
- `applyDiscount()` — `percent` atima `total × value/100`; `amount` atima `value`; abiem atvejais rezultatas neiškrenta žemiau nulio.

Vedlys kviečia `POST /coupons/validate` grįžtamajam ryšiui, tačiau `register` kuponą patikrina ir pritaiko iš naujo serveryje. Kliento rodoma suma yra tik orientacinė.

## Atominis talpos mechanizmas

Kiekvienas įrašas su talpos riba saugiai sprendžia lenktynių sąlygas be transakcijų ar užraktų, nes talpos tikrinimas yra pačiame `INSERT` sakinyje. Renginio lygmeniu (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nulis paveiktų eilučių reiškia „talpa išnaudota“. Tas pats mechanizmas saugo įrašus pagal tipą (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, skaičiuojant dalyvius, susietus su aktyviomis registracijomis) ir kiekius pagal pasirinkimą (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, naudojant `COALESCE(SUM(quantity),0) + ? <= capacity`). Kai kurio nors dalyvio ar pasirinkimo įrašymas nepavyksta registracijos viduryje, valdiklis iš dalies sukurtą registraciją atšaukia su `deleteCascade()` ir praneša, kuris tipas ar pasirinkimas išparduotas.

## Mokėjimo eiga

`processRegistrationCharge` valdiklyje yra vienintelė vieta, kur registracijos liečiasi su pinigais, ir ji yra plona bendro aukojimo sistemos klientė:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenizavimas vyksta naršyklėje tiksliai taip pat kaip aukojimams (žr. [Aukojimas](./giving.md)): vedlys naudoja apphelper mokėjimo teikėjų registrą, todėl prisijungę nariai gali mokėti išsaugotomis kortelėmis, o svečiai tokenizuoja naują kortelę. Valdiklis atkartoja `DonateController` teikėjų ypatumus (Kingdom Funding `pm-{id}` mokėjimo metodų ID, Stripe SCA `requires_action` atsakymus, kurie grąžinami klientui be mokėjimo įrašymo). Sėkmingas mokėjimas įrašo `registrationPayments` eilutę, padidina `amountPaid` ir patvirtina registraciją. **Grąžinimai neįgyvendinti:** atšaukta apmokėta registracija išlaiko savo mokėjimų įrašus, o bet koks grąžinimas tvarkomas atskirai šliuzo valdymo skydelyje.

Abu įėjimo taškai eina tuo pačiu kodo keliu: `register` (mokėjimas registruojantis) ir `pay` (likučio mokėjimas / laukiamojo sąrašo užbaigimas).

`register` praleidžia mokėjimą dviem atvejais ir išsaugo registraciją kaip `pending` su `amountPaid = 0`, todėl visa suma lieka kaip mokėtina:

- **Darbuotojo pridėtas dalyvis.** Užklausos kūne yra `personId`, kuris nėra iškvietėjo, nėra `guestInfo`, o iškvietėjas turi `registrations.edit` teises toje bažnyčioje. Asmuo turi egzistuoti (kitu atveju 404), šeimos narių filtras praleidžiamas ir kortelė nenurašoma.
- **Nėra šliuzo.** Bažnyčia neturi aukojimo šliuzo (`hasGateway` tikrina `gateway.loadAll`). B1App mokėjimo žingsnyje rodomas mygtukas **Registruotis ir mokėti vėliau** vietoj kortelės formos.

Svečių (be `au.id`) registracijoms su kaina privalomas `captchaPass` iš `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (dabar `shared/helpers`) veikia prieš pat mokėjimą, todėl laukiamojo sąrašo ir nemokamos registracijos nepaveikiamos. Kai `CAPTCHA_ENFORCE=true` ir pateikimas trūksta arba yra neteisingas, nauja registracija atšaukiama su `deleteCascade()` ir iškvietimas grąžina 403. B1App komponentas `RegistrationPaymentForm` svečiams rodo reCAPTCHA žymės langelį ir siunčia pateikimą kartu su kortelės išsaugojimu bei registracija.

## Laukiamojo sąrašo ciklas

Kai renginys pilnas ir įjungta renginio `waitlistEnabled` žymė, `register` grupę išsaugo kaip `waitlisted` (praleisdamas talpos tikrinimus) ir išsiunčia įprastą patvirtinimo laišką, pažymėtą kaip laukiamojo sąrašo vieta. Perkėlimas įvyksta trimis būdais: `cancel`, `delete` ir darbuotojų `promote` galutinis taškas. Visi jie kreipiasi į `RegistrationRepo.promoteFromWaitlist`, kuris pasirenka seniausią laukiamojo sąrašo įrašą ir jį atomiškai pakeičia:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Sąlyga `status='waitlisted'` užtikrina, kad lygiagretūs perkėlimai nepakels to paties įrašo du kartus, o talpos subužklausa neleidžia perkėlimui viršyti talpos. Perkelti įrašai atsiduria būsenoje `pending`, o ne `confirmed`, nes gali būti dar likęs mokėtinas likutis. `RegistrationHelper.sendWaitlistAvailabilityEmail` praneša registruotajam, kad atsirado vieta, o jei `totalAmount − amountPaid > 0`, pateikia nuorodą į bažnyčios B1 `/mobile/registrations` puslapį (Mano registracijos). Nuoroda sudaroma iš `B1AppRoot` ir bažnyčios subdomeno. Sumokėjus (arba jei likučio nėra), registracija patvirtinama.

:::info
Pati talpos padidinimas automatiškai nepaleidžia perkėlimo. Padidinus talpą, darbuotojai naudoja sąrašo veiksmą Perkelti. Atšaukimai ir ištrynimai perkelia automatiškai.
:::

## Kliento sąsajos

- **B1App vedlys**: vieną bendrą kablį `B1App/src/components/registration/useEventRegistration.ts` naudoja ir svetainės komponentas (`components/registration/EventRegister.tsx`), ir mobilusis portalo ekranas (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`). Žingsniai: `info → members → selections → questions → payment → confirm` (vidurinieji žingsniai rodomi tik tada, kai renginys turi pasirinkimų, pridėtą formą arba nenulinę sumą). Informacijos ir dalyvių žingsniuose rodomi pasirinkimai pagal dalyvio tipą su gyvu likusios talpos ir išparduotumo rodymu. Mokėjimo žingsnis (`RegistrationPaymentForm.tsx`) rodo užsakymo suvestinę, nuolaidos kodo įvedimą ir, prisijungusiems nariams, išsaugotus mokėjimo būdus per apphelper teikėjų registrą; svečiai tokenizuoja naują kortelę. Mobilusis ekranas **Registracijos** (`screens/RegistrationsPage.tsx`) yra Mano registracijos: būsena, likutis mokėtinas, Užbaigti mokėjimą (`POST /:id/pay`), Redaguoti (`PUT /:id`: kontaktai, dalyvių tipai, pasirinkimų kiekiai) ir Atšaukti.
- **B1Admin nustatymai**: `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` prideda perjungiklį Įjungti laukiamąjį sąrašą ir skyrius Dalyvių tipai, Pasirinkimai bei Nuolaidų kodai (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Visi jie atlieka CRUD veiksmus per `/types`, `/selections` ir `/coupons` maršrutus.
- **B1Admin sąrašas**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx`. Yra kiekvieno dalyvio tipo stulpelis, Sumokėta / Iš viso stulpelis su likučio žyme, skaičių žymės pagal tipą, mokėjimų informacijos dialogas (`RegistrationDetailDialog.tsx`, duomenys iš `GET /payments/:registrationId`), laukiamojo sąrašo veiksmas Perkelti ir CSV eksportas, įskaitant dalyvių tipus, pasirinkimus, sumokėta / iš viso / likutį ir klausimų atsakymus.

Tarpmodulinės užklausos (svečio asmens paieška ar sukūrimas, bažnyčios įkėlimas el. laiškams) vyksta per `getMembershipModuleGateway()`. Turinio modulis narystės lentelių niekada nenuskaito tiesiogiai.

## Susiję puslapiai

- [Aukojimas](./giving.md): šliuzo abstrakcija, teikėjų registras ir tokenizavimo modelis, kuriuos naudoja ši funkcija
- [Turinio galutiniai taškai](../api/endpoints/content.md): turinio modulio REST sąsaja
- [Webhook](../api/webhooks.md): įvykis `registration.created`
- [Modulio struktūra](../api/module-structure.md): kaip turinio modulis organizuotas serverio pusėje
