---
title: "Eseménynyilvántartások"
description: "Hogyan működnek az eseményregisztrációk a B1 Adminban és a B1App-ban: résztvevőtípusok, fizetős kiegészítők, kedvezménykódok, fizetés az adakozási átjárón keresztül és várólista-előléptetés."
---

# Eseménynyilvántartások

<div class="article-intro">

Az eseményekre történő natív regisztráció a tartalommodulban él, és a fizetős regisztrációk bevezetése óta teljes kereskedelmi modellt kínál: árazott résztvevőtípusokat, árazott kiegészítő választásokat, kedvezménykódokat, fizetést a gyülekezet meglévő adományozási átjárón keresztül, valamint állapotvezérelt várólistát. A fizetési útvonal szándékosan újrahasználja az adományozási rendszert: a regisztrációs vezérlő ugyanazon `GatewayService` / `IGatewayProvider` absztrakción keresztül terheli a számlát, amelyet az [Adományozás](./giving.md) oldal ismertet, így a tartalommodulban sem kártyaadat, sem átjáró SDK-ismeret nincs. Ez az oldal a adatmodellt, az árazási és kapacitási szabályokat, valamint a regisztrációs, fizetési és várólistás folyamatokat írja le.

</div>

## Áttekintés

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (tagi portál)          │            │ Api — tartalommodul                         │
│  regisztrációs varázsló ·    │   HTTPS    │  RegistrationController                     │
│  Regisztrációim              │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (szerveroldali   │
│ B1Admin (munkatársak)        │            │  árazás)                                    │
│  eseményregisztrációs        │            │  RegistrationHelper (e-mailek)              │
│  beállítások                 │            └───────────────┬─────────────────────────────┘
│  · névsor · CSV-export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ közös átjáró-absztrakció (adományozás)      │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

A teljes rendszerben három szabály érvényes:

1. **A szerver határozza meg az árat.** A kliensek típusazonosítókat, választásazonosítókat és mennyiségeket küldenek; a `RegistrationPricingHelper.computeTotal()` szerveroldalon számítja ki a végösszeget, a kuponokat pedig terheléskor újra ellenőrzi. Kliens által küldött összegben soha nem bízunk.
2. **A kapacitást beszúráskor, atomikusan érvényesítjük.** Minden kapacitáshoz kötött beszúrás `INSERT … SELECT … FROM dual WHERE (aktív sorok száma) < kapacitás` utasítást használ, így két egyidejű regisztráció nem foglalhatja el ugyanazt az utolsó helyet. A számokat az állapotból (`pending`/`confirmed`) származtatjuk, nem tároljuk.
3. **A fizetések az adományozási csatornákon futnak.** A `RegistrationController` a közös `GatewayService.processCharge` függvényt hívja a gyülekezet beállított átjárójával – ugyanazt a szolgáltató-absztrakciót, tokenizálási modellt és SCA-kezelést használva, mint az adományok esetén.

## Adatmodell (`Api/src/modules/content`)

A modellek a `models/Registration.ts` fájlban, a táblaleképezések a `db/DatabaseTypes.ts` fájlban találhatók; minden táblához egy-egy repó tartozik a `repositories/` mappában.

| Tábla | Jelentés | Fontos mezők |
|-------|----------|--------------|
| `registrations` | Egy regisztráció (egy háztartás/csoport egy eseményre) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Egy résztvevő egy regisztrációban | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Résztvevőtípusok eseményenként (pl. felnőtt / gyermek) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Nevesített, árazott kiegészítő lehetőségek (pl. póló) | eventId, name, description, **price**, **capacity**, **maxQuantity** (regisztrációnként), sort, active |
| `registrationSelectionChoices` | Egy regisztráció/résztvevő által kiválasztott egy választás mennyisége | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Egy sikeres terhelés egy regisztrációhoz | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Eseményenkénti kedvezménykódok | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Megjegyzések:

- **Nincs külön várólista-tábla.** A várólistás csoportok `status = 'waitlisted'` értékű `registrations` sorok; a teljes várólista-életciklus ennek az egy táblának az állapotátmeneteiből áll.
- **Nincsenek tárolt számlálók.** Az „eladott” / „felhasznált” számokat (eseménykapacitás, típusonkénti kapacitás, választásonkénti kapacitás, kuponhasználatok) olyan sorokra épülő korrelált alkérdésekkel számoljuk, amelyek állapota `('pending','confirmed')` közé esik (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Egy regisztráció törlése ezért nyilvántartás vezetése nélkül felszabadítja a kapacitást.
- Az árak MySQL DECIMAL oszlopok (a hálózaton karakterláncként), amelyeket az árazó segédfüggvényen belül a `Number()` függvénnyel alakítunk számmá.

## REST-felület

Minden végpont a `/content/registrations` alatt található (`controllers/RegistrationController.ts`), a `Permissions.registrations` (`view` / `edit`) jogosultsággal védve:

| Útvonal | Hozzáférés | Cél |
|---------|------------|-----|
| `POST /register` | névtelen | Teljes beküldés: vendég, tag vagy munkatárs által hozzáadott résztvevő; szerveroldali árazás, kapacitásellenőrzés, opcionális terhelés |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | nyilvános | Típusok/választások a számított `used` / `remainingCapacity` értékekkel a varázslóhoz |
| `POST /types`, `DELETE /types/:id` (ugyanez a `/selections` és `/coupons` esetén) | `registrations.edit` | Munkatársi beállítások CRUD-művelete |
| `POST /coupons/validate` | nyilvános | Kedvezménykód azonnali ellenőrzése a varázslóban |
| `GET /coupons/event/:eventId` | munkatárs | Kuponok a felhasználási számokkal |
| `GET /event/:eventId` · `GET /event/:eventId/count` | munkatárs · nyilvános | Névsor; aktív létszám a kapacitás megjelenítéséhez |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | bejelentkezett felhasználó | Regisztrációim, részletek, fizetési előzmények |
| `PUT /:id` | tulajdonos/munkatárs | Beküldés utáni módosítás – a tagokat és a választási lehetőségeket friss, atomikus kapacitásellenőrzéssel cseréli le, újraszámolja a `totalAmount` értéket; soha nem terhel és nem térít vissza automatikusan |
| `POST /:id/pay` | tulajdonos | „Fizetés befejezése”: a `totalAmount − amountPaid` összeget terheli, a `waitlisted`/`pending` állapotot `confirmed`-re állítja |
| `POST /:id/promote` | munkatárs | Kézi előrelépés a várólistáról |
| `POST /:id/cancel` · `DELETE /:id` | tulajdonos · munkatárs | Lemondás / törlés; mindkettő automatikus várólista-előrelépést indít |

Ha ugyanazon eseményre ugyanazon `personId` alatt már létezik nem lemondott regisztráció, a kérés 409-es hibát kap, és minden létrehozott regisztráció `registration.created` webhookot indít a `WebhookDispatcher` révén.

## Árazás és kedvezménykódok

A `helpers/RegistrationPricingHelper.ts` az egyetlen hiteles pénzügyi számítási egység:

- A `computeTotal()` összeadja az egyes tagok típusárát és minden választási tétel `ár × mennyiség` értékét.
- A `validateCoupon()` ellenőrzi az aktív jelzőt, a dátumtartományt (`startDate`/`endDate`), a `minMembers` értéket a beküldött csoportlétszámhoz képest, valamint a `maxUses` értéket az állapotból számított felhasználási számhoz képest.
- Az `applyDiscount()` – `percent` esetén levonja a `total × value/100` összeget; `amount` esetén a `value` összeget; mindkettő nullánál nem lehet kisebb.

A varázsló a `POST /coupons/validate` végpontot hívja az azonnali visszajelzéshez, de a `register` szerveroldalon újra ellenőrzi és újra alkalmazza a kupont – a kliens által megjelenített végösszeg csak tájékoztató jellegű.

## Az atomikus kapacitási megoldás

Minden kapacitáshoz kötött beszúrás tranzakciók vagy zárak nélkül, biztonságosan versenyez úgy, hogy a kapacitásellenőrzés magában a `INSERT` utasításban történik. Eseményszinten (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

A nulla érintett sor azt jelenti, hogy a kapacitás betelt. Ugyanez a megoldás védi a típusonkénti beszúrásokat (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, az aktív regisztrációkhoz csatlakozó tagok számolásával), valamint a választásonkénti mennyiségeket (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` feltétellel). Ha egy tag- vagy választásbeszúrás a regisztráció közben meghiúsul, a vezérlő a `deleteCascade()` segítségével visszagörgeti a részleges regisztrációt, és jelzi, melyik típus vagy választás fogyott el.

## Fizetési folyamat

A vezérlőben lévő `processRegistrationCharge` az egyetlen hely, ahol a regisztrációk pénzmozgással érintkeznek, és az adományozási rendszer vékony kliense:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

A tokenizálás a böngészőben történik pontosan úgy, mint az adományoknál (lásd [Adományozás](./giving.md)) – a varázsló újrahasználja az apphelper szolgáltató-nyilvántartását, így a bejelentkezett tagok mentett kártyákkal fizethetnek, a vendégek pedig új kártyát tokenizálhatnak. A vezérlő követi a `DonateController` szolgáltatóspecifikus sajátosságait (a Kingdom Funding `pm-{id}` fizetési mód-azonosítói, valamint a Stripe SCA `requires_action` válaszai, amelyeket fizetés rögzítése nélkül küld vissza az ügyfélnek). Egy sikeres terhelés egy `registrationPayments` sort ír, növeli az `amountPaid` értéket, és megerősíti a regisztrációt. **A visszatérítés nincs megvalósítva** – egy lemondott, fizetett regisztráció megtartja fizetési soreit, a visszatérítést pedig a fizetési átjáró irányítópultján kívül kell kezelni.

Mindkét belépési pont ugyanazon a kódúton halad át: a `register` (fizetés a regisztrációkor) és a `pay` (egyenleg-fizetés / várólistáról történő befejezés).

A `register` két esetben kihagyja a terhelést, és `pending` állapotban, `amountPaid = 0` értékkel menti a regisztrációt, a teljes összeget tartozásként hagyva:

- **Munkatárs által hozzáadott résztvevő.** A kérés törzse olyan `personId`-t tartalmaz, amely nem a hívó felhasználóé, nincs `guestInfo`, és a hívónak van `registrations.edit` jogosultsága az adott gyülekezetben. A személynek léteznie kell (különben 404), a háztartási tagszűrőt kihagyjuk, és nincs kártyás terhelés.
- **Nincs átjáró.** A gyülekezetnek nincs adományozási átjárója (a `hasGateway` a `gateway.loadAll` függvényt ellenőrzi). A B1App fizetési lépése **Regisztráció és fizetés később** gombot jelenít meg kártyaűrlap helyett.

Vendégek (`au.id` nélkül) árazott regisztrációjához érvényes `captchaPass` szükséges a `POST /giving/donate/captcha-verify` végpontról. A `CaptchaPass.verify` (mostantól a `shared/helpers` modulban) közvetlenül a terhelés előtt fut le, így a várólistás és az ingyenes regisztrációk nem érintettek. Ha a `CAPTCHA_ENFORCE=true` be van állítva, és az átmenő jegy hiányzik vagy érvénytelen, az új regisztráció a `deleteCascade()` segítségével visszagörgetésre kerül, a hívás pedig 403-as választ ad. A B1App `RegistrationPaymentForm` komponense vendégeknek megjeleníti a reCAPTCHA jelölőnégyzetet, és az átmenő jegyet mind a kártyamentéssel, mind a regisztrációval együtt elküldi.

## A várólista életciklusa

Ha az esemény betelt, és az esemény `waitlistEnabled` jelzője be van kapcsolva, a `register` a csoportot `waitlisted` állapotban menti (a kapacitásellenőrzést kihagyva), és a szokásos visszaigazoló e-mailt küldi, megjelölve, hogy várólistás helyről van szó. Az előrelépésre három mód van – a `cancel`, a `delete` és a munkatársi `promote` végpont –, mindegyik a `RegistrationRepo.promoteFromWaitlist` függvényen keresztül fut, amely a legrégebbi várólistás sort választja ki, és atomikusan átállítja:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

A `status='waitlisted'` feltétel megakadályozza, hogy egyidejű előrelépések kétszer léptessenek elő egy sort, a kapacitási alkérdés pedig azt, hogy az előrelépés túlfoglalást okozzon. Az előléptetett sorok `pending` állapotba kerülnek, nem `confirmed` állapotba, mert lehet még fennálló egyenleg; a `RegistrationHelper.sendWaitlistAvailabilityEmail` értesíti a regisztrálót, hogy helye felszabadult, és ha `totalAmount − amountPaid > 0`, hivatkozik a gyülekezet B1 `/mobile/registrations` oldalára (Regisztrációim). Ez a hivatkozás a `B1AppRoot` és a gyülekezet aldomainje alapján készül. A fizetés (vagy ha nincs egyenleg) megerősíti a helyet.

:::info
A kapacitás emelése önmagában nem léptet elő senkit – a munkatársak a kapacitás növelése után a névsor **Előléptetés** műveletét használják. A lemondások és törlések automatikusan léptetnek elő.
:::

## Kliens felületek

- **B1App varázsló** – egyetlen közös hook, a `B1App/src/components/registration/useEventRegistration.ts`, vezérli mind a weboldali komponenst (`components/registration/EventRegister.tsx`), mind a mobil tagi portál képernyőjét (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) a következő lépéseken keresztül: `info → members → selections → questions → payment → confirm` (a középső lépések csak akkor jelennek meg, ha az eseményhez tartoznak választások, csatolt űrlap, vagy a végösszeg nem nulla). Az információs és résztvevői lépések típusonkénti választókat jelenítenek meg, élő, fennmaradó kapacitás- és elfogyott állapotokkal; a fizetési lépés (`RegistrationPaymentForm.tsx`) a rendelés összegzését, a kedvezménykód megadását, és – bejelentkezett tagok számára – az apphelper szolgáltató-nyilvántartáson keresztül a mentett fizetési módokat mutatja, a vendégek pedig új kártyát tokenizálnak. A **Regisztrációk** mobil képernyő (`screens/RegistrationsPage.tsx`) a Regisztrációim oldal: státusz, fennálló egyenleg, Fizetés befejezése (`POST /:id/pay`), Szerkesztés (`PUT /:id` – kapcsolattartási adatok, tagtípusok, választási mennyiségek) és Lemondás.
- **B1Admin beállítások** – a `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` fájl tartalmazza a Várólista engedélyezése kapcsolót, valamint az Résztvevőtípusok, Választások és Kedvezménykódok lenyíló szekcióit (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), mindegyik a `/types`, `/selections`, `/coupons` útvonalakon keresztül CRUD-műveleteket végez.
- **B1Admin névsor** – a `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: résztvevőnkénti Típus oszlop, Fizetve/Összesen oszlop egyenleg-jelvénnyel, típusonkénti darabszám-jelvények, fizetési részletek párbeszédablak (`RegistrationDetailDialog.tsx`, a `GET /payments/:registrationId` végpontból), a várólista **Előléptetés** sori művelete, valamint CSV-export a résztvevőtípusokkal, választásokkal, fizetve/összesen/egyenleg adatokkal és a kérdésekre adott válaszokkal.

A modulok közötti keresések (a vendég személy feloldása vagy létrehozása, a gyülekezet betöltése az e-mailekhez) a `getMembershipModuleGateway()` függvényen keresztül történnek – a tartalommodul soha nem olvassa közvetlenül a tagsági táblákat.

## Kapcsolódó oldalak

- [Adományozás](./giving.md) – az átjáró-absztrakció, a szolgáltató-nyilvántartás és a tokenizálási modell, amelyet ez a funkció újrahasznosít
- [Tartalom végpontok](../api/endpoints/content.md) – a tartalommodul REST-felülete
- [Webhookok](../api/webhooks.md) – a `registration.created` esemény
- [Modulok szerkezete](../api/module-structure.md) – a tartalommodul szerveroldali felépítése
