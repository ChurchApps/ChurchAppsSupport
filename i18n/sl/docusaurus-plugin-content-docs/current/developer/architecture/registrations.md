---
title: "Prijave na dogodke"
description: "Kako delujejo prijave na dogodke v B1 Admin in B1App: vrste udeležencev, plačljivi dodatki, popustne kode, plačila prek prehoda ter čakalni seznam."
---

# Prijave na dogodke

<div class="article-intro">

Neposredna prijava na dogodke se nahaja v modulu vsebine in ima od vala plačljivih prijav naprej popoln model poslovanja: udeleženci z določenimi cenami, dodatne izbire z določenimi cenami, kode za popust, plačila prek obstoječega plačilnega prehoda za darovanja v cerkvi ter seznam čakajočih, ki ga določa status. Pot denarja namenoma ponovno uporablja sklad za darovanja. Krmilnik prijav zaračunava prek iste abstrakcije `GatewayService` / `IGatewayProvider`, ki je opisana na strani [Darovanja](./giving.md), zato modul vsebine ne vsebuje podatkov o karticah in ne potrebuje poznavanja SDK-ja plačilnega prehoda. Ta stran opisuje podatkovni model, pravila za cene in zmogljivost ter tokove prijave, plačila in čakalnega seznama.

</div>

## Pregled

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (portal za člane)      │            │ Api — modul vsebine                         │
│  čarovnik za prijavo ·       │   HTTPS    │  RegistrationController                     │
│  Moje prijave                │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (cene na         │
│ B1Admin (osebje)             │            │   strežniku)                                │
│  nastavitve prijave na dogodek│           │  RegistrationHelper (e-poštna sporočila)    │
│  · seznam · izvoz CSV        │            └───────────────┬─────────────────────────────┘
└──────────────────────────────┘                            │ processCharge
                                                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ skupna abstrakcija plačilnega prehoda       │
                                            │  (darovanja)                                │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Tri pravila veljajo v celotnem skladu:

1. **Cena pripada strežniku.** Odjemalci pošljejo ID-je vrst, ID-je izbir in količine. `RegistrationPricingHelper.computeTotal()` izračuna skupni znesek na strežniku, kupone pa se ob zaračunavanju ponovno preveri. Znesku, ki ga pošlje odjemalec, se nikoli ne zaupa.
2. **Zmogljivost se uveljavi atomarno ob vstavljanju.** Vsak vstavek z omejeno zmogljivostjo uporablja stavek `INSERT … SELECT … FROM dual WHERE (število aktivnih vrstic) < zmogljivost`, zato dve sočasni prijavi ne moreta obe zasesti zadnjega mesta. Števila so izpeljana iz statusa (`pending`/`confirmed`) in se nikoli ne shranjujejo.
3. **Plačila tečejo po darovalnih tirnicah.** `RegistrationController` kliče skupno metodo `GatewayService.processCharge` s konfiguriranim plačilnim prehodom cerkve. Gre za isto abstrakcijo ponudnika, isti model tokenizacije in isto obravnavo SCA kot pri donacijah.

## Podatkovni model (`Api/src/modules/content`)

Modeli so v datoteki `models/Registration.ts`, preslikave tabel v `db/DatabaseTypes.ts`, en repozitorij za vsako tabelo pa v mapi `repositories/`.

| Tabela | Pomen | Ključna polja |
|-------|---------|-----------|
| `registrations` | Ena prijava (ena družina ali skupina za en dogodek) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | En udeleženec pri prijavi | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Vrste udeležencev po dogodku (npr. odrasli / otrok) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Poimenovane dodatne možnosti s ceno (npr. majica) | eventId, name, description, **price**, **capacity**, **maxQuantity** (največ na eno prijavo), sort, active |
| `registrationSelectionChoices` | Količina izbire, ki jo je pri prijavi/udeležencu izbral udeleženec | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Eno uspešno zaračunavanje za prijavo | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Kode za popust po dogodku | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Opombe:

- **Tabele za čakalni seznam ni.** Prijave na čakalnem seznamu so vrstice v tabeli `registrations` s statusom `status = 'waitlisted'`. Celoten življenjski cikel čakalnega seznama je prehajanje statusov v tej eni tabeli.
- **Ni shranjenih števcev.** Števila „prodanih“ / „uporabljenih“ mest (zmogljivost dogodka, zmogljivost po vrsti, zmogljivost po izbiri, uporabe kupona) se izračunajo s koreliranimi podpoizpraševanji nad vrsticami, katerih status je v `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Preklic prijave zato sprosti zmogljivost brez dodatnega knjigovodstva.
- Cene so stolpci MySQL DECIMAL (po omrežju prihajajo kot nizi), ki jih znotraj pomočnika za cene pretvorimo s funkcijo `Number()`.

## Površina REST

Vse je pod potjo `/content/registrations` (`controllers/RegistrationController.ts`), za dostop pa je potrebna pravica `Permissions.registrations` (`view` / `edit`):

| Pot | Dostop | Namen |
|-------|---------|-----------|
| `POST /register` | anonimno | Celotna oddaja: gost, član ali osebje z možnostjo Dodaj udeleženca; cene na strežniku, preverjanje zmogljivosti, po potrebi zaračunavanje |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | javno | Vrste/izbire z izpeljanima `used` / `remainingCapacity` za čarovnik |
| `POST /types`, `DELETE /types/:id` (enako za `/selections`, `/coupons`) | `registrations.edit` | Ustvarjanje, branje, posodabljanje in brisanje nastavitev za osebje |
| `POST /coupons/validate` | javno | Vgradno preverjanje kode za popust med čarovnikom |
| `GET /coupons/event/:eventId` | osebje | Kuponi s številom uporab |
| `GET /event/:eventId` · `GET /event/:eventId/count` | osebje · javno | Seznam udeležencev; število aktivnih za prikaz zmogljivosti |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | prijavljeni | Moje prijave, podrobnosti, zgodovina plačil |
| `PUT /:id` | lastnik/osebje | Urejanje po oddaji: zamenja udeležence in izbire z novim atomarnim preverjanjem zmogljivosti ter ponovno izračuna `totalAmount`; nikoli samodejno ne zaračuna ali vrne denarja |
| `POST /:id/pay` | lastnik | „Dokončaj plačilo“: zaračuna `totalAmount − amountPaid` in spremeni `waitlisted`/`pending` v `confirmed` |
| `POST /:id/promote` | osebje | Ročno premaknjena iz čakalnega seznama |
| `POST /:id/cancel` · `DELETE /:id` | lastnik · osebje | Preklic / brisanje; oba sprožita samodejno premikanje iz čakalnega seznama |

Če za isti `personId` na istem dogodku že obstaja nepreklicana prijava, se nova zavrne s kodo 409. Vsaka ustvarjena prijava prek `WebhookDispatcher` pošlje webhook `registration.created`.

## Cene in kode za popust

`helpers/RegistrationPricingHelper.ts` je edina avtoriteta za izračune denarja:

- `computeTotal()` sešteje ceno vrste vsakega udeleženca in za vsako izbiro `cena × količina`.
- `validateCoupon()` preveri aktivnost, časovno obdobje (`startDate`/`endDate`), `minMembers` glede na velikost poslane skupine in `maxUses` glede na število uporab, izpeljano iz statusa.
- `applyDiscount()` — `percent` odšteje `total × value/100`; `amount` odšteje `value`; oba primera se omejita na nič.

Čarovnik kliče `POST /coupons/validate` za vgradne povratne informacije, vendar `register` kupon ponovno preveri in ponovno uporabi na strežniku. Prikazani znesek v odjemalcu je zgolj informativen.

## Idiom atomarne zmogljivosti

Vsak vstavek z omejeno zmogljivostjo varno obravnava sočasne zahteve brez transakcij ali zaklepanj, tako da je preverjanje zmogljivosti del samega `INSERT`. Na ravni dogodka (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Če je število prizadetih vrstic nič, to pomeni „zmogljivost je polna“. Isti idiom varuje vstavke po vrsti (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, ki šteje udeležence, povezane z aktivnimi prijavami) in količine po izbiri (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, ki uporablja `COALESCE(SUM(quantity),0) + ? <= capacity`). Če vstavljanje katerega koli udeleženca ali izbire med prijavo spodleti, krmilnik nepopolno prijavo povrne z `deleteCascade()` in sporoči, katera vrsta ali izbira je bila razprodana.

## Tok plačila

`processRegistrationCharge` v krmilniku je edino mesto, kjer se prijave dotaknejo denarja, in je tanek odjemalec darovalnega sklada:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Tokenizacija poteka v brskalniku natanko kot pri donacijah (glej [Darovanja](./giving.md)). Čarovnik uporablja register ponudnikov plačil apphelper, zato se prijavljeni člani lahko plačajo s shranjenimi karticami, gostje pa tokenizirajo novo kartico. Krmilnik zrcali posebnosti ponudnikov iz `DonateController` (ID-ji metod plačila `pm-{id}` pri Kingdom Funding, odgovori Stripe SCA `requires_action`, ki se vrnejo odjemalcu brez beleženja plačila). Uspešno zaračunavanje zapiše vrstico v `registrationPayments`, poveča `amountPaid` in potrdi prijavo. **Vračila niso implementirana.** Preklicana plačana prijava obdrži vrstice plačil, morebitna vračila pa se izvedejo zunaj sistema, v nadzorni plošči plačilnega prehoda.

Obe vstopni točki potekata po isti kodni poti: `register` (plačilo ob prijavi) in `pay` (plačilo preostanka / dokončanje čakalnega seznama).

`register` preskoči zaračunavanje v dveh primerih in prijavo shrani kot `pending` z `amountPaid = 0`, s celotnim zneskom kot preostankom za plačilo:

- **Dodaj udeleženca s strani osebja.** Telo zahteve vsebuje `personId`, ki ni osebni ID klicatelja, nima `guestInfo`, klicatelj pa ima pravico `registrations.edit` v tej cerkvi. Oseba mora obstajati (sicer 404), filter člana gospodinjstva se preskoči in kartica se ne zaračuna.
- **Brez plačilnega prehoda.** Cerkev nima darovalnega plačilnega prehoda (`hasGateway` preveri `gateway.loadAll`). Korak plačila v B1App namesto obrazca za kartico prikaže gumb **Registriraj se in plačaj pozneje**.

Gostje (brez `au.id`) pri plačljivih prijavah morajo poslati `captchaPass` iz `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (zdaj v `shared/helpers`) se izvede tik pred zaračunavanjem, zato čakalni seznam in brezplačne prijave ostanejo nedotaknjeni. Če je `CAPTCHA_ENFORCE=true` in je prepustnica manjkajoča ali neveljavna, se nova prijava povrne z `deleteCascade()` in klic vrne 403. Komponenta `RegistrationPaymentForm` v B1App gostom prikaže potrditveno polje reCAPTCHA in prepustnico pošlje skupaj s shranjevanjem kartice in prijavo.

## Življenjski cikel čakalnega seznama

Ko je dogodek poln in je zastavica `waitlistEnabled` dogodka vklopljena, `register` skupino shrani kot `waitlisted` (preskoči preverjanja zmogljivosti) in pošlje običajno potrditveno e-poštno sporočilo, označeno kot mesto na čakalnem seznamu. Premik iz čakalnega seznama poteka na tri načine: `cancel`, `delete` in osebna končna točka `promote`. Vsi trije vodijo v `RegistrationRepo.promoteFromWaitlist`, ki izbere najstarejšo vrstico na čakalnem seznamu in jo atomarno spremeni:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Zaščita `status='waitlisted'` preprečuje, da bi sočasni premiki dvakrat premaknili isto vrstico, podpoizpraševanje o zmogljivosti pa prepreči preprodajo. Premaknjene vrstice pristanejo v stanju `pending`, ne `confirmed`, ker je morda še treba plačati preostanek. `RegistrationHelper.sendWaitlistAvailabilityEmail` obvesti prijavljenega, da je mesto na voljo, in če je `totalAmount − amountPaid > 0`, vključi povezavo do strani `/mobile/registrations` cerkve v B1 (Moje prijave), zgrajeno iz `B1AppRoot` in poddomene cerkve. Po plačilu (ali če ni preostanka) je prijava potrjena.

:::info
Samo povečanje zmogljivosti ne premakne nikogar iz čakalnega seznama. Osebje po povečanju zmogljivosti uporabi dejanje Premakni v seznamu udeležencev. Preklici in brisanja premikajo samodejno.
:::

## Odjemalske površine

- **Čarovnik B1App** — en skupni hook, `B1App/src/components/registration/useEventRegistration.ts`, poganja obe površini: komponento za spletno stran (`components/registration/EventRegister.tsx`) in zaslon v mobilnem portalu (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`). Koraki so `info → members → selections → questions → payment → confirm` (vmesni koraki se prikažejo samo, če dogodek vsebuje izbire, priložen obrazec ali neničelni skupni znesek). Koraka z informacijami in udeleženci prikazujeta izbirnike po vrsti udeleženca z živim prikazom preostale zmogljivosti in stanja razprodano. Plačilo (`RegistrationPaymentForm.tsx`) prikaže povzetek naročila, vnos kode za popust in — za prijavljene člane — shranjene načine plačila prek registra ponudnikov apphelper, gostje pa tokenizirajo novo kartico. Zaslon **Prijave** v mobilni aplikaciji (`screens/RegistrationsPage.tsx`) je Moje prijave: status, zapadli preostanek, Dokončaj plačilo (`POST /:id/pay`), Uredi (`PUT /:id` — kontakt, vrste članov, količine izbir) in Prekliči.
- **Nastavitve B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` doda stikalo Omogoči čakalni seznam ter zložljive razdelke Vrste udeležencev, Izbire in Kode za popust (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Vsi omogočajo ustvarjanje, branje, posodabljanje in brisanje prek poti `/types`, `/selections` in `/coupons`.
- **Seznam udeležencev B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: stolpec Vrsta za vsakega udeleženca, stolpec Plačano/Skupaj z oznako preostanka, številske oznake po vrstah, pogovorno okno s podrobnostmi plačil (`RegistrationDetailDialog.tsx`, iz `GET /payments/:registrationId`), dejanje Premakni za vrstice na čakalnem seznamu ter izvoz CSV, ki vključuje vrste udeležencev, izbire, plačano/skupaj/preostanek in odgovore na vprašanja.

Medmodulne poizvedbe (iskanje ali ustvarjanje osebe gosta, nalaganje cerkve za e-poštna sporočila) potekajo prek `getMembershipModuleGateway()`. Modul vsebine nikoli neposredno ne bere tabel članstva.

## Sorodne strani

- [Darovanja](./giving.md) — abstrakcija plačilnega prehoda, register ponudnikov in model tokenizacije, ki jih ta funkcionalnost ponovno uporablja
- [Končne točke vsebine](../api/endpoints/content.md) — površina REST modula vsebine
- [Webhooki](../api/webhooks.md) — dogodek `registration.created`
- [Struktura modulov](../api/module-structure.md) — kako je modul vsebine organiziran na strani strežnika
