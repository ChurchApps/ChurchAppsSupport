---
title: "Naptárak létrehozása"
description: "Hozzon létre naptárat a B1 Adminban, kapcsoljon hozzá csoportokat vagy importáljon .ics fájlokat, és kezelje eseményeit, regisztrációit és jegyzeteit egy helyen."
---

# Naptárak létrehozása

<div class="article-intro">

A naptár létrehozása a B1 Adminban lehetővé teszi, hogy egy vagy több csoport összekapcsolásával egy válogatott eseményнézetet állítson össze. Az eseményeket a csoportvezetők kezelik a saját csoportjaikon belül, a naptárában pedig ezek az események egy helyen jelennek meg. A szerkesztési jogosultsággal rendelkező adminisztrátorok bármely csoporthoz hozzáadhatnak vagy szerkeszthetnek eseményeket. A nem adminisztrátor csoportvezetők csak az általuk vezetett csoportok eseményeit kezelhetik.

</div>

## Oktatóvideó

<YouTube id="Ko3kgsCSLFs" title="Naptárak, események és terembefoglalások a B1-ben" next="Eseményregisztráció és fizetős események a B1-ben" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be azokat a [csoportokat](../groups/creating-groups.md), amelyek eseményeit szeretné a naptárában megjeleníteni
- Szüksége van adminisztrátori hozzáférésre a B1 Admin Naptárak szakaszához

</div>

## Új naptár létrehozása

1. A B1 Adminban nyissa meg az [Ugrásmenüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsa ki a **Naptárak** menüpontot, majd kattintson a **Naptárak** elemre.
2. Kattintson az oldal tetején lévő **Naptár hozzáadása** gombra. Az új naptár űrlapja a naptárlista alatt nyílik meg.
3. Adja meg a naptár **nevét** (például „Ifjúsági események” vagy „Fő gyülekezeti naptár”).
4. Adjon meg egy opcionális **leírást**, hogy csapata megértse, mire szolgál ez a naptár.
5. Kattintson a **Létrehozás** gombra az új naptár mentéséhez.

## A naptár részletező oldala

Miután létrehozta a naptárat, kattintson a sorában lévő **Események kezelése** gombra a részletező oldal megnyitásához. Ennek az oldalnak két fő területe van:

- **Bal oszlop** -- A naptár neve a műveleteivel (**Új esemény**, **Szerkesztés**, **.ics importálása** és **Nyomtatás**), majd a **Csoportok a naptárban** lista, amely megmutatja, mely csoportok szerepelnek ebben a naptárban. Kattintson a csoport melletti **Eltávolítás** gombra, ha ki szeretné venni a csoportot a naptárból.
- **Főterület** -- A **Naptáresemények** nézet, amely a kapcsolt csoportokból származó eseményeket jeleníti meg, felette a **Feliratkozás** és a **Csoport hozzáadása** gombokkal.

## Csoportok összekapcsolása

A naptárban eseménnyel rendelkező csoportok automatikusan megjelennek a részletező oldal bal oldalán lévő **Csoportok a naptárban** listában.

1. Kattintson a naptár fölötti **Csoport hozzáadása** gombra, hogy csoportot rendeljen a naptárhoz.
2. Válassza ki a csoportot a legördülő listából. A lista egyházának összes csoportját tartalmazza, nem csak azokat, amelyeknek Ön tagja.
3. Válassza ki, hogy a csoport **összes eseményét** vagy csak **meghatározott eseményeit** szeretné-e hozzáadni.
4. Kattintson a **Mentés** gombra.

Minden esemény csak egyszer jelenik meg a naptárban. Ha egy egész csoportot ad hozzá, a már egyenként hozzáadott eseményei beolvadnak a csoport bejegyzésébe, a már naptárban lévő csoportból meghatározott események kiválasztása pedig nem ad hozzá semmi újat. A **Csoportok a naptárban** alatt csak az egészként hozzáadott csoportok szerepelnek.

### .ics fájl importálása

Kattintson a **.ics importálása** gombra, hogy más naptárból származó eseményeket hozzon be. Válassza ki azt a **Csoportot**, amelyhez az eseményeknek tartozniuk kell, majd kattintson a **.ics fájl kiválasztása** gombra vagy illessze be a fájl tartalmát, és kattintson az **Importálás** gombra. Az események létrejönnek abban a csoportban, és a csoport hozzáadódik ahhoz a naptárhoz, ahonnan importált, így az események azonnal megjelennek ott.

### Esemény eltávolítása a naptárból

Kattintson a naptáron lévő eseményre, majd kattintson az **Eltávolítás a naptárból** gombra. Ez csak kiveszi az eseményt ebből a naptárból – maga az esemény a csoportjában marad. Ha az esemény azért került a naptárba, mert egész csoportját hozzáadták, annak eltávolítása az adott csoport összes eseményét kiveszi ebből a naptárból (az események továbbra is megmaradnak a csoportban). Ha egy eseményt véglegesen szeretne törölni, törölje a [csoport naptárából](../groups/group-calendar.md).

:::tip
A csoportok naptárhoz kapcsolása hatékony módja az események automatikus összesítésének. Amikor egy csoportvezető eseményt ad hozzá a saját [csoportjához](../groups/creating-groups.md), az extra munka nélkül bekerülhet az egész gyülekezetre kiterjedő naptárba.
:::

:::info
Ha olyan naptárat szeretne létrehozni, amely egyházának számos csoportjából húz eseményeket, a gyorsabb megoldásért lásd a [Válogatott naptár](./curated-calendar.md) részt.
:::

## Események hozzáadása és szerkesztése {#adding-and-editing-events}

Az eseményhez való hozzáadáshoz kattintson az **Új esemény** gombra a naptár részletező oldalán, vagy a naptáron lévő eseményre kattintva, majd a **Szerkesztés** gombra a módosításhoz. Az **Új esemény** / **Esemény szerkesztése** űrlapnak a következő mezői vannak:

- **Csoport** -- Az a csoport, amelyhez az esemény tartozik. Ha egyházában vannak eseménysablonok, a **Sablon** kiválasztásával kitöltheti az űrlapot.
- **Cím**
- **Esemény fotója** -- Kattintson a **Fotó hozzáadása** gombra (vagy az üres fotómezőre) egy kép kiválasztásához vagy feltöltéséhez, amely széles, 16:9 arányú formára lesz vágva. A csere a **Fotó módosítása** gombbal történik. A fotó megjelenik az esemény oldalának tetején a weboldalán, és csempeként, amikor egy Naptár elem a **Közelgő események** elemet jeleníti meg (lásd [Események megjelenítése a weboldalon](#showing-events-on-your-website)).
- **Leírás** -- Az esemény oldalán jelenik meg a weboldalán. Támogatott a félkövér szöveg, a listák és a hivatkozások.
- **Kezdés** és **Vége**, **Ismétlődés** és **Láthatóság** (**Nyilvános** vagy **Privát**).
- **Címkék** -- Vesszővel elválasztott címkék, például `ifjúság, diákok`. A weboldalán lévő Naptár elem beállítható úgy, hogy csak bizonyos címkével rendelkező eseményeket mutasson. Ez ugyanaz a **Címkék** mező, amely az esemény regisztrációs beállításai között is látható.
- **Ki láthatja a jegyzeteket** és **Ki írhat jegyzetet** -- Ki olvashatja és bővítheti az esemény jegyzeteit (lásd [Eseményjegyzetek](#event-notes)). Válassza a **Csak munkatársak** lehetőséget (alapértelmezett), a **Csoportvezetők** lehetőséget (az esemény csoportjának vezetői), vagy a **Csoporttagok** lehetőséget (az esemény csoportjának mindenki, beleértve a vezetőit).
- **Termek** és **Erőforrások** -- Helyet és eszközöket foglalhat az eseményre. Lásd [Termek, erőforrások és ütemezés](./rooms-resources.md).

Kattintson a **Mentés** gombra. Ha az esemény ismétlődik, a B1 megerősítést kér, mert a mentés a sorozat minden előfordulását frissíti.

### Eseményjegyzetek {#event-notes}

Minden eseménynek saját jegyzetszála van a tervezéshez és a nyomon követéshez. Kattintson egy eseményre a naptár részletező oldalán; a párbeszédablak megjeleníti az esemény részleteit, emlékeztetőit, és alatta a **Jegyzetek** részt. Írjon be egy jegyzetet, és küldje el, hogy hozzáadja a szálhoz.

Azok a munkatársak, akiknek jogosultságuk van tartalmak szerkesztésére vagy naptárak kezelésére, mindig olvashatják és közzétehetik az eseményjegyzeteket. Az eseményen található **Ki láthatja a jegyzeteket** és **Ki írhat jegyzetet** beállítások döntik el, hogy az esemény csoportjának vezetői vagy tagjai is megtehetik-e ugyanezt.

### Események megjelenítése a weboldalon {#showing-events-on-your-website}

Ha naptárat szeretne a weboldalán megjeleníteni, adjon hozzá egy **Naptár** elemet egy oldalhoz, és válassza ki ezt a naptárt. Az elem megjeleníthet havi naptárat vagy közelgő eseményeket tartalmazó csempékből álló rácsot, és korlátozható egyetlen címkére. A látogatók, akik egy eseményre kattintanak, megnyitják annak saját eseményoldalát. Lásd [A Naptár elem használata](../website/page-editor.md#using-the-calendar-element).

## Eseményregisztráció engedélyezése {#enabling-event-registration}

Bármely naptáresemény regisztrációját engedélyezheti, hogy a tagok a B1 weboldalon vagy a mobilalkalmazáson keresztül jelentkezhessenek.

1. Kattintson egy meglévő eseményre, vagy hozzon létre újat.
2. Az eseményszerkesztőben kapcsolja be a **Regisztráció** kapcsolót.
3. Állítsa be a regisztrációs beállításokat:
   - **Kapacitás** (opcionális) -- Állítson be maximális regisztrációszámot. Hagyja üresen a korlátlan szám esetén.
   - **Regisztráció nyitása** -- Az a dátum és időpont, amikor a regisztráció elérhetővé válik.
   - **Regisztráció zárása** -- Az a dátum és időpont, amikor a regisztráció lezárul.
   - **Címkék** -- Vesszővel elválasztott címkék (pl. „ifjúság, retreat, vbs”), amelyek segítenek a regisztrálható események kategorizálásában.
   - **Regisztrációs kérdések** -- Opcionálisan csatolhat egy [űrlapot](../forms/creating-forms.md), hogy a regisztrálók további kérdésekre válaszoljanak (étkezési korlátozások, pólóméret, vészhelyzeti kapcsolattartó stb.) a jelentkezés részeként. A kérdések kihagyásához válassza a **Nincs** lehetőséget.
   - **Várólista engedélyezése** -- Ha az esemény megtelik, a további regisztrálók várólistára kerülhetnek ahelyett, hogy elutasítanák őket. Lásd [Fizetős regisztrációk](./paid-registrations.md#waitlist).
4. Mentse az eseményt.

Fizetős események esetén ugyanezen a beállítási oldalon meghatározhatja az árazott **Résztvevőtípusokat**, a választható **Kiegészítőket** (kiegészítő opciók) és a **Kedvezménykódokat**; a fizetést egyháza adományozási szolgáltatóján keresztül gyűjtik be. A teljes útmutatóért lásd a [Fizetős regisztrációk](./paid-registrations.md) részt.

Miután a regisztráció engedélyezve van, a tagok a **Regisztráció erre az eseményre** gombot látják, amikor megtekintik az eseményt a [B1.church oldalon vagy a B1 alkalmazásban](../../b1-church/events/registering.md). Ha űrlapot csatolt, a regisztrálók a regisztráció során egy **Kérdések** lépést látnak, és válaszaik a regisztrációjukkal együtt mentésre kerülnek.

:::info
A regisztrációs kérdések csak olyan űrlapokkal működnek, amelyek **nincsenek** korlátozottként megjelölve. A korlátozott űrlap regisztráció közben automatikusan kimarad, nem jelenik meg, ezért kérdések csatolásakor korlátozásmentes űrlapot használjon.
:::

### Regisztrációk kezelése

A regisztrációk megtekintéséhez és kezeléséhez:

1. Az Ugrásmenüben válassza a **Naptárak > Regisztrációk** menüpontot.
2. Megjelenik egy táblázat az összes olyan eseményről, amelyhez a regisztráció engedélyezve van, az esemény címével, dátumával, az aktuális regisztrációszámmal a kapacitáshoz viszonyítva, valamint a címkékkel.
3. Kattintson egy eseményre a regisztrációk teljes listájának megtekintéséhez, beleértve a neveket, a tagok számát, a résztvevőtípusokat, a fizetési állapotot és a regisztráció dátumát.
4. A részletező oldalról az alábbiakat teheti:
   - **Résztvevő hozzáadása** -- Kézzel regisztrálhat valakit, aki offline vagy telefonon jelentkezett.
   - **Lemondás** egyes regisztrációkat
   - **Törlés** regisztrációk véglegesen
   - **Előléptetés** a várólistán lévő regisztrációkat, amikor felszabadul egy hely
   - **CSV exportálása** -- Töltse le az összes regisztrációt, beleértve a résztvevőtípusokat, a kiegészítőket, a fizetési összegeket és a kérdésekre adott válaszokat

Ha az eseményhez regisztrációs kérdések vannak csatolva, a részletező oldalon megjelenik egy **Csak megválaszolatlan kérdések** szűrő is, amellyel gyorsan megtalálhatók azok a regisztrálók, akik még nem küldtek választ, valamint minden megválaszolt regisztráció mellett egy **Válaszok megtekintése** gomb a válaszaik megtekintéséhez. A fizetős események egy **Típus** oszlopot, egy **Fizetett / Összes** oszlopot, típusonkénti darabszámokat és egy fizetési részletező párbeszédablakot adnak hozzá – lásd [Fizetős regisztrációk](./paid-registrations.md#the-registration-roster).

:::tip
A kapacitási folyamatjelző sávval nyomon követheti, milyen gyorsan telnek meg az események. A sáv pirosra vált, amikor egy esemény eléri vagy meghaladja a kapacitását.
:::

## Következő lépések

- [Válogatott naptár](./curated-calendar.md) -- Olyan naptár létrehozása, amely több csoportból húz eseményeket
- [Fizetős regisztrációk](./paid-registrations.md) -- Résztvevőtípusok, kiegészítő választások, kedvezménykódok, fizetések és várólisták
- [Eseményregisztrációs útmutató](../guides/event-registration.md) -- Lépésről lépésre útmutató az eseményregisztráció beállításához
- [Naptárak áttekintése](./index.md) -- Vissza a naptárak áttekintéséhez
