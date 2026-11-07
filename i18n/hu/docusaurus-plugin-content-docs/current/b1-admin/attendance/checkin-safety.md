---
title: "Bejelentkezési biztonság"
description: "Gyermekbiztonsági beállítások a B1 Admin-ban: teremkapacitás, önkéntesarány, megbízott átvételi listák és SMS a szülőknek bejelentkezéskor."
---

# Bejelentkezési biztonság

<div class="article-intro">

A B1 a bejelentkezéshez gyermekbiztonsági funkciókat is tartalmaz: a helyiségek befogadóképesség-korlátait és az önkéntes–gyermek arányt, a korosztályra és évfolyamra vonatkozó útmutatást a kioszknál, a tagokat, vendégeket és önkénteseket megkülönböztető bejelentkezési típusokat, valamint háztartásonként egy megbízható átvételi listát, amelyet kijelentkezéskor ellenőriznek. Ez az oldal azt ismerteti, hogyan állíthatja be az egyes biztonsági funkciókat a B1 Adminban.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be a [jelenléti struktúrát](setup.md) és a [bejelentkező kioszkokat](check-in.md)
- A helyiségek az istentiszteleti időpontokhoz kapcsolt [csoportok](../groups/creating-groups.md) — az alábbi biztonsági beállítások a csoporton találhatók
- A szülőnek szóló értesítés és a vészhelyzeti közlemény összekapcsolt SMS-szolgáltatót igényel ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md) vagy Mutual Ministry)

</div>

## Helyiség kapacitása és a helyiség lezárása

Minden bejelentkezési helyiség (csoport) saját korlátokat állíthat be. Nyissa meg a csoportot, kattintson a **Szerkesztés** gombra a beállítások szerkesztéséhez, és keresse meg a **Check-In kapacitás** szakaszt:

- **Kapacitás** -- Az a legnagyobb létszám, amely egyszerre jelentkezhet be ebbe a helyiségbe. Ha a helyiség megtelt, a bejelentkezés blokkolt, és a kioszk megnevezi a telt helyiséget.
- **Vendégkapacitás** -- Opcionális, külön korlát arra, hány vendéget fogadhat a helyiség.
- **Lezárva a bejelentkezéshez** -- Állítsa **Igen**-re, hogy azonnal leállítsa a bejelentkezéseket ebbe a helyiségbe (például ha egy foglalkozást lemondtak, vagy a helyiség nem használható). A kijelentkezés továbbra is működik.

## Önkéntes-arányok

A csoport ugyanazon **Check-In kapacitás** szakasza személyzeti szabályokat is tartalmaz:

- **Gyermek önkéntesenként** -- Az a legnagyobb gyermekszám, amelyet egy bejelentkezett önkéntes felügyelhet (pl. az 5 azt jelenti, hogy öt gyermekre jut egy önkéntes).
- **Minimális önkéntesszám** -- Az a legkisebb önkéntesszám, amelynek be kell jelentkeznie, mielőtt gyermekek jelentkezhetnek be a helyiségbe.

Az önkéntesek akkor számítanak ezekbe a szabályokba, ha a kioszknál **Önkéntes** típussal jelentkeznek be (lásd lentebb: [Bejelentkezési típusok](#check-in-types)).

### Figyelmeztetés vagy blokkolás kiválasztása

Az arányok betartatásának szigorúsága egyházi szintű beállítás:

1. A B1 Adminban nyissa meg a **Beállítások** menüt, és nyissa meg a **Check-In** szakaszt.
2. Állítsa be az **Önkéntes-arány érvényesítése** beállítást:
   - **Figyelmeztetés (megerősítéssel engedélyezi)** -- A kioszk figyelmeztetést jelenít meg, ha a helyiség túllépi az arányt, vagy nem éri el a minimális önkéntesszámot, és egy munkatárs megerősítheti, hogy mindenképp folytatja. Ez az alapértelmezés.
   - **Blokkolás (megakadályozza a bejelentkezést)** -- A helyiségbe történő bejelentkezés addig nem engedélyezett, amíg elegendő önkéntes nincs bejelentkezve.

:::info
A kapacitás és a Lezárva a bejelentkezéshez mindig kemény korlát — a figyelmeztetés/blokkolás választás csak az önkéntes-arányokra vonatkozik.
:::

## Bejelentkezési típusok

Minden bejelentkezésnél rögzítik, hogy a személy **Tag**, **Vendég** vagy **Önkéntes**. A típust a kioszk háztartási képernyőjén lévő címkékkel választják ki (az alapértelmezés a Tag). A típusok táplálják a biztonsági szabályokat: az önkéntesek biztosítják az arányt, a vendégek pedig beleszámítanak a helyiség vendégkapacitásába.

## Korosztályi és évfolyam szerinti helyiség-útmutatás

Minden helyiséghez megadhat korosztályi vagy évfolyam-határokat, hogy a kioszk a családokat a megfelelő helyiségekhez irányítsa:

- A csoport beállításaiban használja az **Életkor és évfolyam** szakaszt a helyiség minimális/maximális életkorának (években és hónapokban) és/vagy évfolyamának beállításához.
- A kioszknál azok a helyiségek, amelyekre a gyermek jogosult, ki vannak emelve, a többiek pedig halványítva jelennek meg. Egy halványított helyiség munkatársi megerősítéssel mégis kiválasztható — az útmutatás soha nem blokkol kemény korláttal.

Az évfolyamok az egyház **évfolyam-léptetési dátumán** változnak:

1. A B1 Adminban nyissa meg a **Beállítások** menüt, és nyissa meg az **Évfolyam-léptetés** szakaszt.
2. Állítsa be azt a hónapot és napot, amikor egyháza léptet tanulókat (például augusztus 1.). A kioszknál az életkorok és évfolyamok a legutóbbi léptetési dátum szerint számítódnak.

## Megbízható és nem engedélyezett átvevők

Minden háztartásnak lehet listája azokról, akik — vagy akik nem — vihetik el a gyermekeit.

1. Nyissa meg egy személy oldalát a **Személyek** menüben, és keresse meg a **Átvétel** kártyát.
2. Kattintson a **Hozzáadás** gombra. Keressen egy meglévő személyt, vagy adjon hozzá olyat, aki nincs a rendszerben, a **Név**, a **Kapcsolat** megadásával és egy fotóval.
3. Állítsa be az **Állapotot**:
   - **Megbízható** -- Kijelentkezéskor ez a személy megérinthető átvételi kártyaként jelenik meg a fotójával, így az ellenőrzött átvétel gyors.
   - **Nem engedélyezett** -- Ha valaki ezen a néven próbál átvenni, a kioszk figyelmeztetéssel blokkolja a kijelentkezést. Egy munkatárs felülírhatja, és a felülírás rögzítésre kerül a jelenléti nyilvántartásban.

A kártyán a személy állapot-címkéjére kattintva válthat a Megbízható és a Nem engedélyezett között.

:::tip
Adjon fotót a megbízható átvevőkhöz, amikor csak lehet — a kijelentkezési képernyő megmutatja a fotót, így az önkéntesek vizuálisan ellenőrizhetik a előttük álló személyt.
:::

## Szülő értesítése és vészhelyzeti közlemény

Mindkét funkció az egyház összekapcsolt SMS-szolgáltatóján keresztül küld szöveges üzeneteket — nincs beépített SMS-szolgáltatás, ezért az egyik támogatott szolgáltatót előbb be kell állítani.

- **Szülő értesítése** -- Egy felügyelt kioszk kijelentkezési képernyőjéről a munkatársak szöveges üzenetet küldhetnek egy bejelentkezett gyermek szüleinek/gondviselőinek (például: „Kérjük, jöjjön a bébiszobába”).
- **Vészhelyzeti közlemény** -- A kioszk adminisztrátori beállításaiból a munkatársak egyszerre szöveges üzenetet küldhetnek a kiválasztott istentiszteleten bejelentkezett összes háztartás gondviselőinek. A küldéshez be kell gépelni az **EMERGENCY** szót a megerősítéshez.

Azok, akik leiratkoztak az SMS-ekről, vagy nincs mobilszámuk rögzítve, automatikusan kimaradnak — a kioszk jelzi, hány üzenet ment el és hányat hagytak ki.

A kioszkos részletes útmutatóért lásd: [Kijelentkezés és gyermekbiztonság](../../b1-checkin/check-in/checking-out.md).

## Kapcsolódó cikkek

- [Bejelentkezés](check-in.md) — kioszk beállítása és hardver
- [Kijelentkezés és gyermekbiztonság](../../b1-checkin/check-in/checking-out.md) — a kioszk kijelentkezése, az átvétel ellenőrzése és az értesítési folyamatok
- [Csoportok létrehozása](../groups/creating-groups.md) — ahol a helyiségbeállítások találhatók
- [Jelenlét beállítása](setup.md) — szolgáltatások, istentiszteleti időpontok és helyiség-hozzárendelések
- [Minimális életkor a privát üzenetekhez](../settings/mobile-app.md#member-directory--messaging-settings) — új privát üzenetbeszélgetéseket blokkol gyermekekkel, miközben megmarad a névjegyzékben
