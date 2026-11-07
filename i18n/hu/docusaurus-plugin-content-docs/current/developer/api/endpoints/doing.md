---
title: "Doing végpontok"
description: "Végpontreferencia a Doing API-hoz, amely a szolgálati terveket, önkéntes kiosztásokat, feladatokat és automatizálásokat kezeli a B1 Adminban, elérési utakkal, hitelesítéssel és jogosultságokkal."
---

# Doing végpontok

<div class="article-intro">

A Doing modul a szolgálatok tervezését, az önkéntesek beosztását, a feladatkezelést és az automatizálásokat kezeli. Eszközöket biztosít szolgálati tervek létrehozásához időpontokkal és pozíciókkal, önkéntesek hozzárendeléséhez, tiltott dátumok kezeléséhez, szolgálati sorrendi elemek összeállításához, külső tartalomszolgáltatókhoz való kapcsolódáshoz, valamint feltételekkel és műveletekkel rendelkező automatizált munkafolyamatok beállításához.

</div>

**Alap útvonal:** `/doing`

## Tervek

Alap útvonal: `/doing/plans`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/` | JWT | — | A gyülekezet összes tervének listázása |
| GET | `/:id` | JWT | — | Egy terv lekérése azonosító alapján |
| GET | `/ids?ids=` | JWT | — | Több terv lekérése vesszővel elválasztott azonosítók alapján |
| GET | `/types/:planTypeId` | JWT | — | Tervek lekérése tervtípus szerint |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + szolgálat szerkesztése | A **Szolgálatra beosztott önkénteknek** küldendő szöveges üzenetek áttekintése a megadott tartományban beosztott önkéntesekre: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` (személyenként egy, a leiratkozott és a telefonszám nélküli személyek kihagyva, a megosztott számok deduplikálva, 200-zal korlátozva) |
| GET | `/presenter` | JWT | — | A következő 7 nap tervei (előadói nézet) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Szolgálat szerkesztése | Aktív szolgálati beosztás-megerősítési munkafolyamatok (`workflowType = "assignmentConfirmation"`), amelyeket egy terv kiválaszthat: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Nyilvános | — | Egy tervtípus aktuális tervének lekérése |
| GET | `/public/signup/:churchId` | Nyilvános | — | Az önjelentkezésre nyitott tervek, a legkorábbiak elöl, mindegyikhez az önjelentkezési pozíciókkal (rendezve a `categoryName`, majd a `name` szerint, valamint az Elfogadott/Megerősítésre váró beosztások `filledCount` értékével) és időpontokkal. Önkéntesek nevei nem szerepelnek. Ha a gyülekezeti `volunteerSignupNextOnly` beállítás értéke `"true"`, tervtípusonként csak az első terv kerül visszaadásra. Minden `plan` tartalmaz egy számított `signupDeadline` értéket (ISO időpont vagy `null`), amely `signupDeadlineHours` órával a terv legkorábbi `service` típusú időpontja előtt van (ha nincs szolgálati időpont, bármely időzített bejegyzés; ha a tervnek nincs időpontja, a gyülekezet időzónájában 9:00 a `serviceDate` napján) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` a terv önjelentkezési pozícióira (az Elfogadott/Megerősítésre váró beosztásokkal rendelkezők megjelenített nevei). `[]`-t ad vissza, hacsak a terv `showVolunteerNames` beállítása nincs bekapcsolva |
| POST | `/` | JWT | — | Tervek létrehozása vagy frissítése (egyetlen objektumot vagy tömböt fogad el). A `confirmationWorkflowId` beállításával a terv bekapcsolható egy szolgálati megerősítési munkafolyamatba, a `null` érték pedig a további kérésekre nézve kikapcsolja. A `signupDeadlineHours: null` küldésével törölhető a határidő; ha a mező kimarad, a mentett érték megmarad |
| POST | `/copy/:id` | JWT | Szolgálat szerkesztése | Egy terv másolása pozíciókkal, időpontokkal, beosztásokkal és szolgálati sorrendi elemekkel. A kérés törzse tartalmazza a `ministryId`, `serviceDate`, `copyMode` („none”, „positions”, „all”) és `copyServiceOrder` (logikai érték) mezőket. `targetPlanId` nélkül új terv jön létre, és a `notes`, `signupDeadlineHours`, `showVolunteerNames` és `autoReplaceOnDecline` értékek a forrásterv értékeit örökölik, kivéve, ha a kérés törzse megad másikat. `targetPlanId` megadásakor a másolás a meglévő tervet tölti fel (a hívónak szerkesztési joggal kell rendelkeznie hozzá). A B1Admin **Heti ismétlés** lehetősége hetente egyszer hívja ezt meg, minden alkalommal az előző héten létrehozott tervből másolva |
| POST | `/textRange` | JWT | `texting.send` + szolgálat szerkesztése | Üzenet küldése a megadott dátumtartományban beosztott összes önkéntesnek a gyülekezet szöveges üzenetküldő szolgáltatóján keresztül. Kérés törzse: `{ startDate, endDate, ministryId, planTypeId?, message }` (az üzenet legfeljebb 1600 karakter; az összevonási mezők címzettenként oldódnak fel). Visszaadja az előnézeti számokat, valamint a `recipientCount`, `successCount`, `failCount` értékeket, és ha a küldés idő előtt megszakad, az `error` mezőt (`no_provider` vagy `insufficient_credits`) |
| POST | `/:id/issueRequests` | JWT | Terv szerkesztése | A terv új, még nem értesített, Megerősítésre váró beosztásainak kiküldése a megerősítési munkafolyamaton keresztül: minden beosztást értesítettnek jelöl, és beosztásonként egy munkafolyamat-kártyát indít. Üres kérés törzs; a válasz `{ issued }`. Sikertelen, ha a terv nincs közzétéve (`prepared` állapotban van), nincs aktív `confirmationWorkflowId` legalább egy lépéssel, vagy a válaszadási határidő már lejárt |
| POST | `/autofill/:id` | JWT | — | Önkéntes-beosztások automatikus kitöltése egy tervhez. Kérés törzse: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Egy terv és az összes kapcsolódó időpont, beosztás, pozíció és tervelem törlése |

### Példa: Terv másolása

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Tervtípusok

Alap útvonal: `/doing/planTypes`

A CRUD alaposztályt bővíti (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — jogosultság-ellenőrzés nélkül).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Az összes tervtípus listázása |
| GET | `/:id` | JWT | — | Egy tervtípus lekérése azonosító alapján |
| GET | `/ids?ids=` | JWT | — | Több tervtípus lekérése vesszővel elválasztott azonosítók alapján |
| GET | `/ministryId/:ministryId` | JWT | — | Egy szolgálat tervtípusainak lekérése |
| POST | `/` | JWT | — | Tervtípusok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Tervtípus törlése |

## Tervelemek

Alap útvonal: `/doing/planItems`

Szolgálati sorrendi elemek (fejlécek, szakaszok, énekek stb.) kezelése, szülő-gyermek fastruktúrában szervezve.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Egy tervelem lekérése azonosító alapján |
| GET | `/ids?ids=` | JWT | — | Több tervelem lekérése vesszővel elválasztott azonosítók alapján |
| GET | `/plan/:planId` | JWT | — | Egy terv összes tervelemének lekérése (fastruktúrában tér vissza) |
| GET | `/presenter/:churchId/:planId` | Nyilvános | — | Tervelemek lekérése előadói nézethez (fastruktúrában tér vissza) |
| POST | `/` | JWT | — | Tervelemek létrehozása vagy frissítése |
| POST | `/sort` | JWT | — | Egy tervelem rendezési sorrendjének frissítése (a testvérelemeket újrarendezi) |
| DELETE | `/:id` | JWT | — | Tervelem törlése |

## Tervhíradó

Alap útvonal: `/doing/planFeed`

Tervelem-hírcsatornákat biztosít az előadó számára. Ha nincsenek tervelemek, a rendszer a terv `contentId` értéke alapján automatikusan feltölti azokat a Lessons.church helyszíni hírcsatornából.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:planId` | Nyilvános | — | Tervhíradó lekérése előadónak (üres esetén automatikusan feltöltődik a helyszíni hírcsatornából) |

## Pozíciók

Alap útvonal: `/doing/positions`

A CRUD alaposztályt bővíti (GET `/:id`, POST `/`, DELETE `/:id` — jogosultság-ellenőrzés nélkül).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Egy pozíció lekérése azonosító alapján |
| GET | `/ids?ids=` | JWT | — | Több pozíció lekérése vesszővel elválasztott azonosítók alapján |
| GET | `/plan/ids?planIds=` | JWT | — | Több terv pozícióinak lekérése vesszővel elválasztott tervazonosítók alapján |
| GET | `/plan/:planId` | JWT | — | Egy terv összes pozíciójának lekérése |
| POST | `/` | JWT | — | Pozíciók létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Pozíció törlése |

## Időpontok

Alap útvonal: `/doing/times`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/all` | JWT | — | A gyülekezet összes időpontjának listázása |
| GET | `/:id` | JWT | — | Egy időpont lekérése azonosító alapján |
| GET | `/plans?planIds=` | JWT | — | Több terv időpontjainak lekérése vesszővel elválasztott tervazonosítók alapján |
| GET | `/plan/:planId` | JWT | — | Egy terv összes időpontjának lekérése |
| POST | `/` | JWT | — | Időpontok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Időpont törlése |

## Kiosztások

Alap útvonal: `/doing/assignments`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Az aktuális felhasználó kiosztásainak lekérése |
| GET | `/my/upcoming` | JWT | — | Az aktuális felhasználó legfeljebb 20 kiosztása a mai naptól kezdődő tervekre, a legkorábbiak elöl (a félretett, azaz `prepared` tervek kimaradnak): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. A tagok kezdőlapján megjelenő szolgálati előnézetet szolgálja ki |
| GET | `/:id` | JWT | — | Egy kiosztás lekérése azonosító alapján |
| GET | `/plan/ids?planIds=` | JWT | — | Több terv kiosztásainak lekérése vesszővel elválasztott tervazonosítók alapján |
| GET | `/plan/:planId` | JWT | — | Egy terv összes kiosztásának lekérése |
| POST | `/` | JWT | — | Kiosztások létrehozása vagy frissítése (az állapot alapértelmezetten „Unconfirmed”) |
| POST | `/accept/:id` | JWT | — | Kiosztás elfogadása (csak a hozzárendelt személy teheti meg) |
| POST | `/decline/:id` | JWT | — | Kiosztás elutasítása (csak a hozzárendelt személy teheti meg) |
| POST | `/signup` | JWT | — | Jelentkezés egy pozícióra. Kérés törzse: `{ positionId }`. A pozíciónak engedélyeznie kell az önjelentkezést, és kell lennie szabad helynek; Elfogadott kiosztást hoz létre. Ha a terv önjelentkezési határideje (a fenti módon, az első szolgálati időponttól visszaszámolva) már lejárt, a „Signup deadline has passed” hibaüzenettel utasítja el |
| DELETE | `/signup/:id` | JWT | — | A saját önjelentkezés visszavonása. A terv önjelentkezési határidejének lejárta után a „Removal deadline has passed” hibaüzenettel utasítja el |
| DELETE | `/:id` | JWT | — | Kiosztás törlése |

### Példa: Kiosztás elfogadása

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Tiltott dátumok

Alap útvonal: `/doing/blockoutDates`

A CRUD alaposztályt bővíti (GET `/:id`, DELETE `/:id` — jogosultság-ellenőrzés nélkül).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Egy tiltott dátum lekérése azonosító alapján |
| GET | `/ids?ids=` | JWT | — | Több tiltott dátum lekérése vesszővel elválasztott azonosítók alapján |
| GET | `/my` | JWT | — | Az aktuális felhasználó tiltott dátumainak lekérése |
| GET | `/upcoming` | JWT | — | A gyülekezet összes közelgő tiltott dátumának lekérése |
| POST | `/` | JWT | — | Tiltott dátumok létrehozása vagy frissítése (ha nincs megadva, a `personId` alapértelmezetten az aktuális felhasználó) |
| DELETE | `/:id` | JWT | — | Tiltott dátum törlése |

## Feladatok

Alap útvonal: `/doing/tasks`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Az aktuális felhasználó nyitott feladatainak lekérése |
| GET | `/:id` | JWT | — | Egy feladat lekérése azonosító alapján |
| GET | `/:id/contact` | JWT | A kártya megtekintése | Annak a személynek az elérhetősége, akire a munkafolyamat-kártya vonatkozik: `{ personId, displayName, mobilePhone, email }`. Lehetővé teszi, hogy a hozzárendelt hívó személy, akinek nincs hozzáférése a Személyek modulhoz, elérje a személyt |
| GET | `/closed` | JWT | — | Az aktuális felhasználó lezárt feladatainak lekérése |
| GET | `/timeline?taskIds=` | JWT | — | Feladatok idővonal-adatainak lekérése vesszővel elválasztott feladatazonosítók alapján |
| GET | `/directoryUpdate/:personId` | JWT | — | Egy személy névjegyzék-frissítési feladatának lekérése |
| POST | `/` | JWT | — | Feladatok létrehozása vagy frissítése. A `?type=directoryUpdate` paraméter hozzáadásával névjegyzék-frissítési feladatok kezelhetők (a fotók automatikusan feltöltődnek) |
| POST | `/:id/conversation` | JWT | `tasks.edit` vagy a kártya felelőse | A jegyzetek beszélgetésének csatolása egy kártyához. Kérés törzse: `{ conversationId }`. Az első csatolt beszélgetés marad érvényben; a későbbi hívások a kártyát változatlanul adják vissza |
| POST | `/loadForGroups` | JWT | — | Feladatok betöltése meghatározott csoportokhoz. Kérés törzse: `{ groupIds: [], status: "Open" }` |

## Automatizálások

Alap útvonal: `/doing/automations`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/` | JWT | — | A gyülekezet összes automatizálásának listázása |
| GET | `/:id` | JWT | — | Egy automatizálás lekérése azonosító alapján |
| GET | `/check` | Nyilvános | — | Az összes automatizálás ellenőrzésének elindítása |
| POST | `/` | JWT | — | Automatizálások létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Automatizálás törlése |

## Műveletek

Alap útvonal: `/doing/actions`

A műveletek határozzák meg, mi történjen, amikor egy automatizálás elindul.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Egy művelet lekérése azonosító alapján |
| GET | `/automation/:id` | JWT | — | Egy automatizálás összes műveletének lekérése |
| POST | `/` | JWT | — | Műveletek létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Művelet törlése |

## Feltételek

Alap útvonal: `/doing/conditions`

A feltételek határozzák meg azokat a kritériumokat, amelyek elindítják az automatizálást.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Egy feltétel lekérése azonosító alapján |
| GET | `/automation/:id` | JWT | — | Egy automatizálás összes feltételének lekérése |
| POST | `/` | JWT | — | Feltételek létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Feltétel törlése |

## Kapcsolók

Alap útvonal: `/doing/conjunctions`

A kapcsolók több feltételt kapcsolnak össze egy automatizálásban (ÉS/VAGY logika).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Egy kapcsoló lekérése azonosító alapján |
| GET | `/automation/:id` | JWT | — | Egy automatizálás összes kapcsolójának lekérése |
| POST | `/` | JWT | — | Kapcsolók létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Kapcsoló törlése |

## Tartalomszolgáltató-hitelesítések

Alap útvonal: `/doing/contentProviderAuths`

A CRUD alaposztályt bővíti (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — jogosultság-ellenőrzés nélkül).

Külső tartalomszolgáltatók (például prezentációs szoftveres integrációk) OAuth-hitelesítési rekordjait kezeli.

Az `accessToken` és a `refreshToken` mezőket az `EncryptionHelper` titkosítja tárolás közben, olvasáskor pedig visszafejti, így az API továbbra is sima tokeneket ad vissza. A titkosítás bevezetése előtt mentett sorok sima szöveget tartalmaznak (amely soha nem tartalmaz `|` karaktert); ezeket változtatás nélkül adja vissza a rendszer, és a következő mentéskor titkosítja őket.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Az összes tartalomszolgáltató-hitelesítés listázása |
| GET | `/:id` | JWT | — | Egy tartalomszolgáltató-hitelesítés lekérése azonosító alapján |
| GET | `/ids?ids=` | JWT | — | Több tartalomszolgáltató-hitelesítés lekérése vesszővel elválasztott azonosítók alapján |
| GET | `/ministry/:ministryId` | JWT | — | Egy szolgálat összes tartalomszolgáltató-hitelesítésének lekérése |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Egy adott szolgálathoz és szolgáltatóhoz tartozó hitelesítési rekord lekérése |
| POST | `/` | JWT | — | Tartalomszolgáltató-hitelesítések létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | — | Tartalomszolgáltató-hitelesítés törlése |

## Szolgáltató-proxy

Alap útvonal: `/doing/providerProxy`

Kéréseket továbbít külső tartalomszolgáltatóknak (például ProPresenter, EasyWorship). A lejárt tokeneket automatikusan frissíti.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|------|
| POST | `/browse` | JWT | — | Tartalomszolgáltató fájljainak böngészése. Kérés törzse: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Prezentációk lekérése tartalomszolgáltatótól. Kérés törzse: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Lejátszási lista lekérése tartalomszolgáltatótól. Kérés törzse: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Egy tartalomelem utasításainak lekérése. Kérés törzse: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Egy tartalomelem bővített utasításainak lekérése. Kérés törzse: `{ ministryId, providerId, path }` |

## Kapcsolódó oldalak

- [Tagsági végpontok](./membership.md) — Személyek, csoportok, szerepkörök és jogosultságok
- [Részvételi végpontok](./attendance.md) — Istentiszteletek és látogatások nyilvántartása
- [Modulszerkezet](../module-structure.md) — Kódszervezési minták
