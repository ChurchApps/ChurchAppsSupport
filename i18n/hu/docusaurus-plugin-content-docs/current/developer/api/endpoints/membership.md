---
title: "Membership-végpontok"
description: "Végpontreferencia a ChurchApps Membership API-hoz: személyek, háztartások, csoportok, szerepkörök, űrlapok és beállítások, hitelesítési és jogosultsági szabályokkal."
---

# Membership-végpontok

<div class="article-intro">

A Membership modul kezeli a személyeket, gyülekezeteket, csoportokat, háztartásokat, szerepköröket, jogosultságokat, űrlapokat és beállításokat. Ez a legnagyobb modul, és az alapvető azonosítási és jogosultság-kezelési réteget biztosítja a többi modul számára.

</div>

**Alap útvonal:** `/membership`

## Személyek

Alap útvonal: `/membership/people`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | People.View vagy Member | A gyülekezet összes személyének listázása |
| GET | `/:id` | JWT | People.View vagy saját rekord | Egy személy lekérése azonosító alapján (tartalmazza az űrlapbeküldéseket) |
| GET | `/ids?ids=` | JWT | People.View, Member vagy People.ViewNames | Több személy lekérése vesszővel elválasztott azonosítók alapján. A People.ViewNames jogosultsággal, de People.View nélkül rendelkező hívók az alap modellt kapják, a láthatóságot visszavonó személyek nélkül (a hívó kivételével) |
| GET | `/basic?ids=` | JWT | — | Alapinformációk (csak név) lekérése több személyhez |
| GET | `/names?ids=` | JWT | Bármely gyülekezeti jogosultság | `[{ id, name: { display, first, last }, photo }]`, vezetéknév, majd keresztnév szerint rendezve, a hívó által már ismert, vesszővel elválasztott azonosítókhoz, hogy a People.View nélküli szerepkörök (adományok, részvétel) is megjeleníthessék a személyek nevét. Nincs keresés és nincs könyvtári szűrés |
| POST | `/names` | JWT | Bármely gyülekezeti jogosultság | Ugyanaz, mint a `GET /names`. Törzs: `{ peopleIds }` (vagy `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member vagy People.ViewNames | A legutóbb hozzáadott személyek. A People.ViewNames jogosultsággal, de People.View nélkül rendelkező hívók (még a névjegyzékhez hozzáféréssel rendelkező tagok is) az alap modellt kapják (`id`, `name.display`, `photo`, `membershipStatus`), a láthatóságot visszavonó személyek nélkül |
| GET | `/guest-register/options?churchId=` | Nyilvános | — | QR-kódos vendégregisztráció ellenőrzőlistája: visszaadja a `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` objektumot, mindegyik értéke `"off"`, `"optional"` vagy `"required"` (a nyilvános `guestRegistrationFields` beállításból olvasva; hiányzó vagy hibás értékek esetén az e-mail és a telefon opcionális, a többi kikapcsolt). A `enableQRGuestRegistration` beállítást igényli, kivéve ha a kérés egyező webhely- vagy gyülekezeti tokent hordoz; sebességkorlátozott (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member vagy People.ViewNames | Személyek keresése név vagy e-mail alapján (legfeljebb 100, vezetéknév, majd keresztnév szerint rendezve). A People.ViewNames jogosultsággal, de People.View nélkül rendelkező hívók (még a névjegyzékhez hozzáféréssel rendelkező tagok is) névkeresést kapnak, amely az alap modellt adja vissza; az `email` szerinti keresés `[]` értéket ad |
| GET | `/search/phone?number=` | JWT | People.View vagy Member | Keresés telefonszám alapján |
| GET | `/search/group?groupId=` | JWT | People.View vagy Member | Egy adott csoport személyeinek lekérése |
| GET | `/household/:householdId` | JWT | — | Egy háztartás összes személyének lekérése |
| GET | `/attendance` | JWT | People.Edit | Résztvevők betöltése szűrőkkel (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Idővonal-adatok betöltése személyekhez és csoportokhoz |
| GET | `/directory/:id` | JWT | — | Személy lekérése a névjegyzéki nézethez (tiszteletben tartja a láthatósági beállításokat) |
| GET | `/claim/:churchId` | JWT | — | Személyrekord igénylése az aktuális felhasználó számára egy gyülekezetben |
| POST | `/` | JWT | People.Edit vagy EditSelf | Személyek létrehozása vagy frissítése (kötegelt) |
| POST | `/search` | JWT | People.View, Member vagy People.ViewNames | Személyek keresése (POST változat). Törzs: `{ term }` vagy `{ email }`; ugyanazok a csak-név szabályok vonatkoznak rá, mint a `GET /search` végpontra |
| POST | `/advancedSearch` | JWT | People.View vagy Member | Többfeltételes keresés (életkor, birthMonth, membershipStatus stb.). A törzs feltételek tömbje; üres törzs esetén nincs feltétel, minden más, nem tömb típusú törzs 400-as választ ad |
| POST | `/loadOrCreate` | Nyilvános | — | Személy keresése e-mail alapján, vagy létrehozása. Törzs: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Nyilvános | — | QR-kódos vendégregisztráció. Törzs: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 tag; az email/phone/maritalStatus csak az első tagra vonatkozik). A gyülekezet által kikapcsolt mezők elvetésre kerülnek; a hiányzó kötelező vagy érvénytelen értékek 400-as választ eredményeznek. Először a meglévő személyeket használja fel: egy tag akkor egyezik, ha pontosan egy, nem törölt személynek ugyanaz a keresztneve (kis- és nagybetű nélkül), és ugyanaz az e-mail-címe vagy telefonszámának számjegyei (otthoni, munkahelyi vagy mobil); az e-mail-cím vagy telefonszám nélküli tag a megtalált háztartáson belül keresztnév alapján egyezik. Az egyezett személyek adatai soha nem módosulnak. Az egyezés nélküli tagok a megtalált háztartáshoz csatlakoznak, vagy új háztartást kapnak (az első tag vezetékneve alapján elnevezve), `membershipStatus: "Visitor"` státusszal, a közös `address` mezővel. A `comments` mezőt az első tag jegyzeteként menti, mindenkit hozzáad a `guestRegistrationGroupId` privát csoporthoz (ha be van állítva), és – ha a `guestRegistrationRecordAttendance` értéke `"true"` – rögzíti a részvételt a csoport olyan ütemezett istentiszteleti időpontjaira, amelyek bejelentkezési ablaka éppen nyitva van. A `{ householdId, people: [{ id, name }] }` objektumot adja vissza, a beküldött neveket visszhangozva, nem a tárolt neveket. Ugyanazok a bekapcsolási/token- és sebességkorlátozási szabályok vonatkoznak rá, mint az options hívásra |
| POST | `/household/:householdId` | JWT | People.Edit | Háztartási tagok hozzárendelésének frissítése |
| POST | `/public/email` | Nyilvános | — | E-mail küldése egy személynek. Törzs: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Belső | — | Személyek e-mail-címeinek betöltése azonosítók alapján (szerverek közötti kommunikáció, jwtSecret szükséges) |
| DELETE | `/:id` | JWT | People.Edit | Személy törlése |

### Példa: Személyek keresése

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Példa: Személy létrehozása

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Felhasználók

Alap útvonal: `/membership/users`

A bejelentkezéssel, regisztrációval és jelszókezeléssel kapcsolatos végpontokért lásd: [Hitelesítés és jogosultságok](./authentication.md).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| POST | `/login` | Nyilvános | — | Bejelentkezés (e-mail/jelszó, JWT-frissítés vagy authGuid) |
| POST | `/register` | Nyilvános | — | Új felhasználó regisztrálása |
| POST | `/forgot` | Nyilvános | — | Jelszó-visszaállító e-mail küldése |
| POST | `/setPasswordGuid` | Nyilvános | — | Jelszó beállítása az e-mailben kapott hivatkozásban szereplő auth GUID alapján |
| POST | `/verifyCredentials` | Nyilvános | — | E-mail/jelszó ellenőrzése, és a hozzájuk tartozó gyülekezetek visszaadása |
| POST | `/loadOrCreate` | JWT | — | Felhasználó keresése e-mail/userId alapján, vagy létrehozása |
| POST | `/setDisplayName` | JWT | — | A felhasználó keresztnevének és vezetéknevének frissítése |
| POST | `/updateEmail` | JWT | — | A felhasználó e-mail-címének módosítása |
| POST | `/updatePassword` | JWT | — | A felhasználó jelszavának módosítása (min. 6 karakter) |
| POST | `/updateOptedOut` | JWT | — | Egy személy leiratkozott állapotának beállítása |
| POST | `/sendInviteEmail` | JWT | People.Edit | Meghívó e-mail küldése a gyülekezet egy személyének (`email`, `personName`, `contextName`). A gomb **Regisztráció** feliratú, ha a személynek nincs fiókja, és **Bejelentkezés** feliratú, ha már létező felhasználó. Aki még soha nem jelentkezett be, az 7 napig érvényes **Jelszó beállítása** hivatkozást kap. Fix sablon, ezért nem számít bele a gyülekezet napi e-mail-korlátjába |
| GET | `/search?term=` | JWT | Server.Admin | Összes felhasználó keresése név/e-mail alapján |
| DELETE | `/` | JWT | — | Az aktuális felhasználói fiók törlése |

## Gyülekezetek

Alap útvonal: `/membership/churches`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Az aktuális felhasználó összes gyülekezetének betöltése |
| GET | `/:id` | JWT | — | Gyülekezet lekérése azonosító alapján |
| GET | `/:id/getDomainAdmin` | JWT | — | Egy gyülekezet domain-adminisztrátor felhasználójának lekérése |
| GET | `/:id/impersonate` | JWT | Server.Admin | Gyülekezet nevében történő bejelentkezés (csak szerveradminisztrátor) |
| GET | `/all?term=` | JWT | Server.Admin | Összes gyülekezet keresése (adminisztrátor) |
| GET | `/search/?name=` | Nyilvános | — | Gyülekezetek keresése név alapján |
| GET | `/lookup/?subDomain=&id=` | Nyilvános | — | Gyülekezet keresése aldomén vagy azonosító alapján |
| POST | `/` | JWT | Settings.Edit | A gyülekezet adatainak frissítése |
| POST | `/add` | JWT | — | Új gyülekezet regisztrálása. Kötelező mezők: name, address1, city, state, zip, country |
| POST | `/search` | Nyilvános | — | Gyülekezetek keresése név alapján (POST változat) |
| POST | `/select` | JWT | — | Gyülekezet kiválasztása/váltás. Törzs: `{ churchId }` vagy `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Gyülekezet archiválása vagy archiválásának visszavonása |
| POST | `/byIds` | Nyilvános | — | Több gyülekezet betöltése azonosítók alapján |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Legalább 7 napja elhagyott gyülekezetek törlése |

## Csoportok

Alap útvonal: `/membership/groups`

A szabványos CRUD-műveleteket bővíti (GET `/`, GET `/:id` az alaposztályból).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Összes csoport listázása |
| GET | `/:id` | JWT | — | Csoport lekérése azonosító alapján |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Csoportok keresése istentiszteleti szűrők alapján |
| GET | `/my` | JWT | — | Az aktuális felhasználó csoportjainak lekérése |
| GET | `/my/:tag` | JWT | — | Az aktuális felhasználó csoportjainak lekérése címke szerint szűrve |
| GET | `/tag/:tag` | JWT | — | Egy adott címkével rendelkező összes csoport lekérése |
| GET | `/public/:churchId/:id` | Nyilvános | — | Nyilvános csoport lekérése gyülekezet és azonosító alapján |
| GET | `/public/:churchId/tag/:tag` | Nyilvános | — | Nyilvános csoportok lekérése címke alapján |
| GET | `/public/:churchId/label?label=` | Nyilvános | — | Nyilvános csoportok lekérése címke-megjelölés alapján |
| GET | `/public/:churchId/slug/:slug` | Nyilvános | — | Nyilvános csoport lekérése slug alapján |
| POST | `/` | JWT | Groups.Edit | Csoportok létrehozása vagy frissítése (automatikusan generál slugot) |
| DELETE | `/:id` | JWT | Groups.Edit | Csoport törlése (a szolgálati csoportok gyermekcsapatait is törli) |

## Csoporttagok

Alap útvonal: `/membership/groupmembers`

A szabványos CRUD-műveleteket bővíti (GET `/:id`, DELETE `/:id` az alaposztályból).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Csoporttag lekérése azonosító alapján |
| GET | `/` | JWT | GroupMembers.View* | Csoporttagok listázása. Szűrés: `?groupId=`, `?groupIds=` vagy `?personId=`. *Engedélyezett továbbá, ha a felhasználó tagja a csoportnak, vagy a saját personId-ját kérdezi le, valamint bármely nem bizalmas csoport `?groupId=` lekérdezése esetén, ha a felhasználónak van Attendance.View vagy Attendance.Edit jogosultsága (ilyenkor a 13 év alatti tagok is szerepelnek) |
| GET | `/my` | JWT | — | Az aktuális felhasználó csoporttagságainak lekérése |
| GET | `/basic/:groupId` | JWT | — | Egy csoport alapvető tagjainak listája |
| GET | `/public/leaders/:churchId/:groupId` | Nyilvános | — | Csoportvezetők lekérése (nyilvános) |
| GET | `/public/:churchId/:groupId` | Nyilvános | — | Csoport nyilvános névsorának lekérése (minimális mezők: `personId`, `displayName`, `leader`, fénykép). Csak akkor, ha a csoport a `publicRoster` beállítással bekapcsolta; a weboldal-szerkesztő `staffGrid` elemét táplálja |
| POST | `/` | JWT | GroupMembers.Edit | Csoporttagok hozzáadása vagy frissítése |
| DELETE | `/:id` | JWT | GroupMembers.View | Csoporttag eltávolítása |

## Háztartások

Alap útvonal: `/membership/households`

Szabványos CRUD-vezérlő.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Összes háztartás listázása |
| GET | `/:id` | JWT | — | Háztartás lekérése azonosító alapján |
| POST | `/` | JWT | People.Edit | Háztartások létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | People.Edit | Háztartás törlése |

## Szerepkörök

Alap útvonal: `/membership/roles`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | Roles.View | Szerepkör lekérése azonosító alapján |
| GET | `/church/:churchId` | JWT | Roles.View | Egy gyülekezet összes szerepkörének lekérése. Minden szerepkör tartalmazza a `memberCount` értéket, vagyis a benne szereplő különböző felhasználók számát |
| POST | `/` | JWT | Roles.Edit | Szerepkörök létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Roles.Edit | Szerepkör törlése (eltávolítja a jogosultságait és tagjait is) |

## Szerepkör-tagok

Alap útvonal: `/membership/rolemembers`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Egy szerepkör tagjainak lekérése. Az `?include=users` hozzáadásával a felhasználói adatok is szerepelnek |
| POST | `/` | JWT | Roles.Edit | Tagok hozzáadása egy szerepkörhöz (ha az e-mail-cím nem létezik, felhasználót hoz létre) |
| DELETE | `/:id` | JWT | Roles.View | Szerepkör-tag eltávolítása |
| DELETE | `/self/:churchId/:userId` | JWT | — | Saját magunk eltávolítása egy gyülekezetből |

## Szerepkör-jogosultságok

Alap útvonal: `/membership/rolepermissions`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Egy szerepkör jogosultságainak lekérése (az azonosító helyett `null` használandó a „Mindenki” szerepkörhöz) |
| POST | `/` | JWT | Roles.Edit | Szerepkör-jogosultságok létrehozása vagy frissítése |
| DELETE | `/:id` | JWT | Roles.Edit | Szerepkör-jogosultság törlése |

## Jogosultságok

Alap útvonal: `/membership/permissions`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Az elérhető jogosultságok teljes listájának lekérése |

Minden bejegyzés tartalmazza az `apiName`, `section` (tartalomtípus), `action` mezőket, valamint a `displaySection` és `displayAction` címkéket, amelyeket a B1Admin szerepkör-szerkesztője megjelenít. Legutóbbi újdonságok: `MembershipApi` / `People` / `View Names` (**Csak személynevek megtekintése**, a Személyek és csoportok alatt) és `GivingApi` / `Donations` / `Enter` (**Adományok rögzítése**, az Adományok alatt; lásd: [Adománykötegek](./giving.md#donation-batches)).

## Űrlapok

Alap útvonal: `/membership/forms`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin vagy Forms.Edit | Összes űrlap listázása (az adminisztrátor mindet látja; a szerkesztők a hozzájuk rendelt és a nem tagoknak szóló űrlapokat) |
| GET | `/:id` | JWT | Űrlap-hozzáférés | Űrlap lekérése azonosító alapján |
| GET | `/archived` | JWT | Forms.Admin vagy Forms.Edit | Archivált űrlapok listázása |
| GET | `/group/:groupId` | JWT | Csoporttag, csoportvezető vagy Forms.Admin | A csoporthoz kapcsolt önálló űrlapok (`forms.groupId`), az archiváltak kivételével, név szerint rendezve. Visszaadja az `id`, `name`, `description` és `open` (a rendelkezésre állási időablakon belül) mezőket. A tagok csak a nyitott űrlapokat kapják; a vezetők és az űrlapadminok a zártakat is. A csoportoldal kapcsolt űrlapjait táplálja |
| GET | `/standalone/:id?churchId=` | JWT | — | Önálló űrlap lekérése (a korlátozott űrlapokhoz hitelesítés szükséges) |
| POST | `/` | JWT | Forms.Admin vagy Forms.Edit | Űrlapok létrehozása vagy frissítése. Az önálló űrlapok elfogadják a választható `photoUrl` (az űrlap fölött megjelenő fejlécfotó) és `groupId` (kapcsolt csoport) mezőket |
| DELETE | `/:id` | JWT | Űrlap-hozzáférés | Űrlap törlése |

## Űrlapbeküldések

Alap útvonal: `/membership/formsubmissions`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin vagy Forms.Edit | Beküldések listázása. Szűrés: `?personId=` vagy `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Saját hatókörű: legfeljebb 50 önálló űrlapbeküldés (nem személyi űrlap), amelyet a bejelentkezett tag küldött, vagy amely a személyéhez kapcsolódik (`contentType` `person`, `contentId` = a saját személyazonosítója – például egy adminisztrátor személyváltoztatása után), a legújabbtól a legrégebbi felé rendezve, mindegyik a `form.name` mezővel. Az `include` paraméter csatolja az egyes űrlapok kérdéseit és a beküldés válaszait. `401`-et ad vissza, ha a felhasználó nincs személyhez kapcsolva. A B1 Me oldal **Űrlapjaim** szakaszát táplálja |
| GET | `/group/:groupId` | JWT | A csoport vezetője | Válaszok a csoport vezetői számára: egy bejegyzés minden kapcsolt űrlaphoz és minden regisztrációs űrlappal rendelkező csoportesemény-hez, mindegyik tartalmazza a `form`, `event` (`id`, `title`, `start`; csak eseménybejegyzéseknél), `questions` és `submissions` mezőket (az `answers` és `personName` mezőkkel, név nélküli beküldés esetén `null`) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit vagy megtekintési hozzáférés | Beküldés lekérése azonosító alapján. Az `?include=form,questions,answers` hozzáadásával. Az űrlaphoz kapcsolt csoport vezetői, valamint az események regisztrációjához tartozó csoport vezetői is olvashatják |
| GET | `/formId/:formId` | JWT | Űrlap-hozzáférés (megtekintés) | Egy űrlap összes beküldésének lekérése (tartalmazza az űrlapot, a kérdéseket és a válaszokat). Az űrlaphoz kapcsolt csoport vezetőinek megtekintési hozzáférésük van |
| POST | `/` | JWT | — | Űrlapválaszok beküldése (kezeli a korlátozott és nem korlátozott űrlapokat, e-mail értesítéseket küld). Ha az űrlapnál be van állítva az `autoCreatePerson`, e-mail alapján megkeresi vagy létrehozza a Guest típusú személyt, és összekapcsolja a beküldéssel; ha az űrlaphoz `groupId` is tartozik, a személyt hozzáadja a csoporthoz; ha a `followUpSubject`/`followUpBody` be van állítva, sablonos utánkövető e-mailt küld a beküldőnek. Ha a hívó nem kezelheti az űrlapot, a `submittedBy` mindig a bejelentkezett tag személye lesz (névtelen beküldés esetén üres) |
| DELETE | `/:id` | JWT | Forms.Admin vagy Forms.Edit | Beküldés és válaszainak törlése |

## Kérdések

Alap útvonal: `/membership/questions`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Űrlap-hozzáférés | Egy űrlap kérdéseinek listázása. A `?formId=` megadása kötelező |
| GET | `/:id` | JWT | Űrlap-hozzáférés | Kérdés lekérése azonosító alapján |
| GET | `/unrestricted?formId=` | JWT | — | Egy nem korlátozott űrlap kérdéseinek lekérése |
| GET | `/sort/:id/up` | JWT | — | Kérdés mozgatása feljebb a sorrendben |
| GET | `/sort/:id/down` | JWT | — | Kérdés mozgatása lejjebb a sorrendben |
| POST | `/` | JWT | Űrlap-hozzáférés | Kérdések létrehozása vagy frissítése (automatikusan hozzárendeli a sorrendet) |
| DELETE | `/:id?formId=` | JWT | Űrlap-hozzáférés | Kérdés törlése |

## Válaszok

Alap útvonal: `/membership/answers`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin vagy Forms.Edit | Válaszok listázása. Szűrés: `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin vagy Forms.Edit | Válaszok létrehozása vagy frissítése |

## Tagjogosultságok

Alap útvonal: `/membership/memberpermissions`

Tagonkénti hozzáférést szabályoz bizonyos űrlapokhoz.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | Űrlap-hozzáférés | Tagjogosultság lekérése azonosító alapján |
| GET | `/member/:id` | JWT | Űrlap-hozzáférés | Egy tag összes űrlap-jogosultságának lekérése |
| GET | `/form/:id` | JWT | Űrlap-hozzáférés | Egy űrlap összes tagjogosultságának lekérése |
| GET | `/form/:id/my` | JWT | Űrlap-hozzáférés | Az aktuális felhasználó jogosultsága egy űrlapra |
| POST | `/` | JWT | Űrlap-hozzáférés | Tagjogosultságok létrehozása vagy frissítése |
| DELETE | `/:id?formId=` | JWT | Űrlap-hozzáférés | Tagjogosultság törlése |
| DELETE | `/member/:id?formId=` | JWT | Űrlap-hozzáférés | Egy tag összes jogosultságának törlése egy űrlapon |

## Beállítások

Alap útvonal: `/membership/settings`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Settings.Edit | A gyülekezet összes beállításának lekérése |
| GET | `/public/:churchId` | Nyilvános | — | Egy gyülekezet nyilvános beállításainak lekérése |
| POST | `/` | JWT | Settings.Edit | Beállítások mentése (base64 képfeltöltést is támogat) |

## Domainek

Alap útvonal: `/membership/domains`

A szabványos CRUD-műveleteket bővíti (GET `/:id`, GET `/`, DELETE `/:id` az alaposztályból).

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Összes domain listázása |
| GET | `/:id` | JWT | — | Domain lekérése azonosító alapján |
| GET | `/lookup/:domainName` | JWT | — | Domain keresése név alapján |
| GET | `/public/lookup/:domainName` | Nyilvános | — | Nyilvános domainkeresés név alapján |
| GET | `/health/check` | Nyilvános | — | Állapotellenőrzés futtatása az ellenőrizetlen domaineken |
| POST | `/` | JWT | Settings.Edit | Domainek létrehozása vagy frissítése (frissíti a Caddy konfigurációt) |
| DELETE | `/:id` | JWT | Settings.Edit | Domain törlése |

## Felhasználó–gyülekezet

Alap útvonal: `/membership/userchurch`

A felhasználók és gyülekezetek közötti kapcsolatot kezeli.

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/userid/:userId` | JWT | — | Felhasználó–gyülekezet rekord lekérése felhasználói azonosító alapján |
| GET | `/personid/:personId` | JWT | — | Egy személyhez kapcsolt felhasználó e-mail-címének lekérése |
| GET | `/user/:userId` | JWT | Server.Admin | Egy felhasználó összes gyülekezetének betöltése |
| POST | `/` | JWT | — | Felhasználó–gyülekezet kapcsolat létrehozása |
| PATCH | `/:userId` | JWT | — | Utolsó hozzáférési időpont frissítése és a hozzáférés naplózása |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Felhasználó–gyülekezet rekord törlése |

## Láthatósági beállítások

Alap útvonal: `/membership/visibilityPreferences`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Az aktuális felhasználó láthatósági beállításainak lekérése |
| POST | `/` | JWT | — | Láthatósági beállítások mentése (cím, telefon, e-mail láthatósága) |

## Lekérdezés

Alap útvonal: `/membership/query`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| POST | `/members` | JWT | — | Természetes nyelvű tagkeresés mesterséges intelligencia segítségével. Törzs: `{ text, subDomain, siteUrl }` |

## Kliensoldali hibák

Alap útvonal: `/membership/clientErrors`

| Metódus | Útvonal | Hitelesítés | Jogosultság | Leírás |
|--------|------|------|------|-------------|
| POST | `/` | JWT | — | Kliensoldali hiba naplózása |

## Kapcsolódó oldalak

- [Hitelesítés és jogosultságok](./authentication.md) — Bejelentkezési folyamat, JWT, OAuth, jogosultsági modell
- [Részvétel-végpontok](./attendance.md) — Istentiszteletek és látogatások nyilvántartása
- [Modulstruktúra](../module-structure.md) — Kódszervezési minták
