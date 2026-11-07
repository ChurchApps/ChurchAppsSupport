---
title: "Content Commons"
description: "Hogyan kerülnek a felhasználók által beküldött énekek, leckék és sablonok a B1 Admin szerveradminisztrációjának közös moderációs sorába, a beküldéstől a közzétételig."
---

# Content Commons — megosztott eszköztár és moderálás

A termékek között megosztott, felhasználók által beküldött tartalmak (WorshipCommons-dalok, Lessons.church-leckék, FreeShow-sablonok, B1 webhely-sablonok) egyetlen moderálási sorba kerülnek, nem termékenként külön áttekintési folyamatban. Ez az oldal a beküldés és jóváhagyás folyamatát, a megosztott eszköz adatmodelljét és a moderálás helyét ismerteti.

## Az eszközök gerince

Minden commons-elemet két tábla tárol, függetlenül a terméktől:

- **`assets`** — a nyilvános azonosító sor. `status`: `pending` | `published` | `unpublished` | `removed`. A típusspecifikus adatok (dal részletei, szerzők) a `assetId` alapján kapcsolódó kiegészítő táblákban találhatók.
- **`assetFiles`** — az eszközökhöz csatolt összes fájl (hang, képek, dokumentumok). Ez váltja fel az egyes tartalomtáblákon található régebbi `path` és vesszővel elválasztott `files` oszlopokat.
- **`submissions`** — a moderálási egység. Életciklusa: `draft → pending → approved | rejected | withdrawn`. A beküldés lehet teljesen új eszköz, vagy egy meglévő, már közzétett eszköz módosítása (az eredeti szerző vagy egy harmadik fél által).

Egy beküldés jóváhagyásakor egy termékspecifikus **közzétételi hook** fut le (`Api/src/modules/commons/helpers/publishHooks/`, például `song.ts`), amely a beküldést az adott termék saját rekordjaivá bontja ki.

## Beküldési folyamat

A `CommonsSubmissionController` (`Api/src/modules/commons/`) a végfelhasználók felé nyitott API: vázlatot hoz létre, fájlokat ír elő és csatol, beküldi áttekintésre, vagy visszavonja. Valódi kliensei külső előállító webhelyek (a WorshipCommons webhely, a Lessons.church, a FreeShow, a B1 webhely-sablon-galéria), nem a B1Admin.

## Gyülekezeti felhasználás

A moderáláson túl a B1Admin közvetlenül is olvassa a commons gerincet: a Szolgálatok → Dalok „Dal hozzáadása” keresése a `GET /songs?sundayReady=true` végpontot kérdezi le a meglévő külső daladatbázis mellett. Így azok a közzétett WorshipCommons-dalok is megjelennek, amelyeket a munkatársak vasárnapra alkalmasnak jelöltek meg (lásd alább a hallgatási kaput), licencjelvénnyel. Egy dal kiválasztásakor az új `SongDetail` a `songDetailLinks` segítségével visszakapcsolódik a forrásához. Ez az egyetlen eset, amikor egy gyülekezet B1Admin-ja közvetlenül érinti a commons adatokat, és nem a csak munkatársak számára elérhető Szerveradmin eszközökön keresztül. A gyülekezeti oldalról szóló leírásért lásd a támogatási dokumentáció [Ingyenes dalok a WorshipCommons-ról](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) szakaszát.

## Moderálási sor

A sor a **B1Admin → Szerveradmin → Commons** alatt található (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`), a `Permissions.server.admin` jogosultsággal védve, ugyanazzal, amely az oldal Gyülekezetek/Bejelentkezés másként/Feladatok részeit is védi. Ez a ChurchApps munkatársainak szánt belső eszköz, nem olyasmi, amit az egyes gyülekezetek látnak.

Három almenü van:

- **Sor** — minden függőben lévő beküldés az összes terméktől, termék/eszköztípus szerint szűrhető. Minden sor megmutatja, hogy új eszközről, szerző által szerkesztett vagy harmadik fél által szerkesztett beküldésről van-e szó (jelvény), a beküldő jóváhagyási előzményeit, a mező- és fájlkülönbségek összefoglalóját, valamint a kort (72 óránál régebbi tételek meg vannak jelölve). Az **Áttekintés** egy oldalsávot nyit meg mezőszintű különbségekkel, fájl-előnézetekkel és egy beágyazott, csak olvasható termékelőnézettel; a Jóváhagyás/Elutasítás billentyűparancsokat támogat (j/k a navigációhoz, a/r a műveletekhez).
- **Jelentések** — a közzétett eszközökre vonatkozó szerzői jogi, valamint szabályzati és minőségi jelentések, két sorra bontva, plusz a lezárt előzmények. Egy munkatárs igényli a jelentést, majd lezárja egy eredménnyel (fenntartva/elutasítva/duplikált) és egy művelettel (nincs/visszavonás közzétételből/eltávolítás).
- **Eszközök** — a közzétett tartalmak kereshető böngészője eszközönkénti műveletekkel: kiemelés, közzététel visszavonása vagy újraközzététel, illetve eltávolítás (indok: szerzői jog/szabályzat). Dalok esetében itt van a **hallgatási kapu**, amely révén egy dal „vasárnapra alkalmas” lesz: a munkatársak akkor jelölik meg, miután végighallgatták az összes közzétett tonalitást, és megerősítették, hogy a kotta, az akkordok és a diák mind megvannak.

A `/commons/admin/*` alatti minden végpont (`CommonsAdminController.ts`) önállóan újraellenőrzi a szerveradmin jogosultságot.

:::info
Ez a kialakítás szándékosan egyetlen sort használ: a WorshipCommons saját `/admin` moderálási felülete megszűnt, és minden termék beküldéseit a B1Admin Szerveradmin eszközei kezelik.
:::

## Területek

Api (commons modul), B1Admin (Szerveradmin) és a külső előállító webhelyek: WorshipCommons, Lessons.church, FreeShow, B1 webhely-építő sablonok.
