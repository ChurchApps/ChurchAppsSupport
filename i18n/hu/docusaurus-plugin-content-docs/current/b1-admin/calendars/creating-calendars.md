---
title: "Naptárak létrehozása"
---

# Naptárak létrehozása

<div class="article-intro">

A naptár létrehozásával a B1 Adminban egy vagy több csoport összekapcsolásával összeállíthatja az események saját nézetét. Az eseményeket a csoportvezetők kezelik a saját csoportjukon belül, a naptár pedig ezeket az eseményeket egy helyen jeleníti meg. A szerkesztési joggal rendelkező adminisztrátorok bármely csoporthoz hozzáadhatnak eseményeket vagy szerkeszthetik azokat. Az adminisztrátori jogkörrel nem rendelkező csoportvezetők csak a saját csoportjuk eseményeit kezelhetik.

</div>

## Oktatóvideó

<YouTube id="Ko3kgsCSLFs" title="Naptárak, események és teremfoglalások létrehozása a B1-ben" next="Eseményregisztráció és fizetős események a B1-ben" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Hozza létre azokat a [csoportokat](../groups/creating-groups.md), amelyek eseményeit szeretné szerepeltetni a naptárban
- Szüksége van adminisztrátori hozzáférésre a B1 Admin Naptárak szakaszához

</div>

## Új naptár létrehozása

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki a **Naptárak** menüpontot, majd kattintson a **Naptárak** elemre.
2. Kattintson a lap tetején lévő **Naptár hozzáadása** gombra. Az új naptár űrlap a naptárlista alatt nyílik meg.
3. Adja meg a naptár **nevét** (például „Ifjúsági események” vagy „Fő gyülekezeti naptár”).
4. Opcionálisan adjon meg egy **leírást**, hogy csapata lássa, mire szolgál ez a naptár.
5. Kattintson a **Létrehozás** gombra az új naptár mentéséhez.

## A naptár részletező oldala

A naptár létrehozása után kattintson a sorában lévő **Események kezelése** gombra a részletező oldal megnyitásához. Ez az oldal két fő részből áll:

- **Bal oszlop** -- A naptár neve a műveletekkel (**Új esemény**, **Szerkesztés**, **.ics importálása** és **Nyomtatás**), alatta pedig a **Csoportok a naptárban** lista, amely megmutatja, mely csoportok szerepelnek ebben a naptárban. Egy csoport mellett kattintson az **Eltávolítás** gombra, ha ki szeretné venni a naptárból.
- **Fő terület** -- Az **Naptáresemények** nézet, amely a kapcsolódó csoportokból származó eseményeket jeleníti meg, felette a **Feliratkozás** és a **Csoport hozzáadása** gombokkal.

## Csoportok összekapcsolása

Azok a csoportok, amelyeknek vannak eseményeik a naptárban, automatikusan megjelennek a részletező oldal bal oldalán lévő **Csoportok a naptárban** listában.

1. Kattintson a naptár feletti **Csoport hozzáadása** gombra, hogy csoportot rendeljen a naptárhoz.
2. Válassza ki a csoportot a legördülő listából. A lista a gyülekezet összes csoportját tartalmazza, nem csak azokat, amelyeknek Ön tagja.
3. Válassza ki, hogy a csoport **összes eseményét** szeretné-e hozzáadni, vagy csak **bizonyos eseményeket**.
4. Kattintson a **Mentés** gombra.

Minden esemény csak egyszer jelenik meg a naptárban. Ha egy teljes csoportot ad hozzá, a korábban egyenként hozzáadott eseményei beolvadnak a csoportbejegyzésbe. Ha olyan csoportból választ ki konkrét eseményeket, amely már szerepel a naptárban, nem történik változás. A **Csoportok a naptárban** listában csak a teljes egészében hozzáadott csoportok szerepelnek.

### .ics fájl importálása

Kattintson az **.ics importálása** gombra, ha más naptárból szeretne eseményeket átvenni. Válassza ki azt a **csoportot**, amelyhez az eseményeknek tartozniuk kell, majd kattintson a **.ics fájl kiválasztása** gombra, vagy illessze be a fájl tartalmát, és kattintson az **Importálás** gombra. Az események létrejönnek a kiválasztott csoportban, a csoport pedig hozzáadódik abból a naptárból, amelybe importált, így az események azonnal megjelennek ott.

### Esemény eltávolítása a naptárból

Kattintson a naptárban lévő eseményre, majd az **Eltávolítás a naptárból** gombra. Ez csak az eseményt veszi ki ebből a naptárból, maga az esemény a csoportjában marad. Ha az esemény azért szerepel a naptárban, mert a teljes csoportját hozzáadták, az eltávolítás az adott csoport összes eseményét kiveszi ebből a naptárból (az események továbbra is a csoportban maradnak). Ha az eseményt véglegesen törölni szeretné, törölje a [csoport naptárából](../groups/group-calendar.md).

:::tip
A csoportok naptárhoz kapcsolása hatékony módja az események automatikus összegyűjtésének. Amikor egy csoportvezető felvesz egy eseményt a saját [csoportjába](../groups/creating-groups.md), az extra munka nélkül bekerülhet a gyülekezet szintű naptárba.
:::

:::info
Ha egy olyan naptárat szeretne létrehozni, amely a gyülekezet számos csoportjának eseményeit gyűjti össze, nézze meg a [Kurált naptár](curated-calendar) leírását, amely egyszerűbb megoldást kínál.
:::

## Események hozzáadása és szerkesztése {#adding-and-editing-events}

Esemény hozzáadásához kattintson az **Új esemény** gombra a naptár részletező oldalán, vagy kattintson a naptárban lévő eseményre, majd a **Szerkesztés** gombra a módosításhoz. Az **Új esemény** / **Esemény szerkesztése** űrlap a következő mezőket tartalmazza:

- **Csoport** -- Az a csoport, amelyhez az esemény tartozik. Ha a gyülekezetben vannak eseménysablonok, a űrlap kitöltéséhez a **Sablon** mezőben is választhat.
- **Cím**
- **Eseményfotó** -- Kattintson a **Fotó hozzáadása** gombra (vagy az üres fotómezőre) egy kép kiválasztásához vagy feltöltéséhez, amely széles, 16:9-es formára van vágva. A **Fotó cseréje** gombra kattintva cserélheti ki. A fotó az esemény oldalának tetején jelenik meg a weboldalán, és csempeként jelenik meg, ha egy Naptár elem a **Közelgő események** megjelenítésre van állítva (lásd: [Események megjelenítése a weboldalán](#showing-events-on-your-website)).
- **Leírás** -- Az esemény oldalán jelenik meg a weboldalán. Támogatott a félkövér szöveg, a listák és a hivatkozások.
- **Kezdés** és **Vége**, **Ismétlődés** és **Láthatóság** (**Nyilvános** vagy **Privát**).
- **Címkék** -- Vesszővel elválasztott címkék, például `youth, students`. A weboldalán lévő Naptár elem beállítható úgy, hogy csak bizonyos címkéjű eseményeket jelenítsen meg. Ez ugyanaz a **Címkék** mező, amely az esemény regisztrációs beállításainál is látható.
- **Ki tekintheti meg a jegyzeteket** és **Ki írhat jegyzetet** -- Megadja, ki olvashatja és bővítheti az esemény jegyzeteit (lásd: [Eseményjegyzetek](#event-notes)). Válassza a **Csak munkatársak** (alapértelmezett), a **Csoportvezetők** (az esemény csoportjának vezetői) vagy a **Csoporttagok** (az esemény csoportjának minden tagja, a vezetőkkel együtt) lehetőséget.
- **Termek** és **Erőforrások** -- Helyet és felszerelést foglalhat le az eseményhez. Lásd: [Termek, erőforrások és ütemezés](rooms-resources).

Kattintson a **Mentés** gombra. Ha az esemény ismétlődik, a B1 kérni fogja a megerősítést, mert a mentés a sorozat minden előfordulását frissíti.

### Eseményjegyzetek {#event-notes}

Minden eseménynek saját jegyzetsora van a tervezéshez és a nyomon követéshez. Kattintson a naptár részletező oldalán lévő eseményre. A párbeszédpanelen megjelennek az esemény részletei, emlékeztetői, valamint alul a **Jegyzetek**. Írjon be egy jegyzetet, és küldje el, hogy hozzáadja a sorhoz.

A tartalom szerkesztésére vagy a naptárak kezelésére jogosult munkatársak mindig olvashatják és írhatnak eseményjegyzeteket. Az eseményen található **Ki tekintheti meg a jegyzeteket** és **Ki írhat jegyzetet** beállítások határozzák meg, hogy az esemény csoportjának vezetői vagy tagjai is megtehetik-e ugyanezt.

### Események megjelenítése a weboldalán {#showing-events-on-your-website}

Ha szeretne naptárat megjeleníteni a weboldalán, adjon hozzá egy **Naptár** elemet egy oldalhoz, és válassza ki ezt a naptárat. Az elem megjelenítheti havi naptárként vagy közelgő események csempéinek rácsaként, és korlátozható egy címkével rendelkező eseményekre. A látogatók az eseményre kattintva megnyitják annak saját eseményoldalát. Lásd: [A Naptár elem használata](../website/page-editor.md#using-the-calendar-element).

## Eseményregisztráció engedélyezése {#enabling-event-registration}

Bármelyik naptáresemény esetén engedélyezheti a regisztrációt, hogy a tagok a B1 weboldalon vagy a mobilalkalmazáson keresztül jelentkezhessenek.

1. Kattintson egy meglévő eseményre, vagy hozzon létre újat.
2. Az eseményszerkesztőben kapcsolja be a **Regisztráció** kapcsolót.
3. Állítsa be a regisztrációs beállításokat:
   - **Kapacitás** (opcionális) -- Adja meg a regisztrációk maximális számát. Üresen hagyva a szám korlátlan.
   - **Regisztráció nyitása** -- Az a dátum és időpont, amikor a regisztráció elérhetővé válik.
   - **Regisztráció zárása** -- Az a dátum és időpont, amikor a regisztráció lezárul.
   - **Címkék** -- Vesszővel elválasztott címkék (például „fiatalok, táborozás, gyermekbibliaiskola”), amelyek segítenek a regisztrálható események kategorizálásában.
   - **Regisztrációs kérdések** -- Opcionálisan csatolhat egy [űrlapot](../forms/creating-forms.md), hogy a regisztrálók a jelentkezés részeként további kérdésekre is válaszoljanak (étkezési korlátozások, pólóméret, vészhelyzeti kapcsolattartó stb.). A **Nincs** lehetőséggel kihagyhatja a kérdéseket.
   - **Várólista engedélyezése** -- Ha az esemény betelik, a további regisztrálók várólistára kerülhetnek ahelyett, hogy elutasítanák őket. Lásd: [Fizetős regisztrációk](paid-registrations#waitlist).
4. Mentse az eseményt.

Fizetős eseményeknél ugyanezen a beállítási oldalon megadhat árazott **résztvevőtípusokat**, opcionális **kiegészítőket** (Selections) és **kedvezménykódokat**. A fizetés a gyülekezete adományozási szolgáltatóján keresztül történik. A teljes útmutatóért lásd: [Fizetős regisztrációk](paid-registrations).

Ha a regisztráció engedélyezve van, a tagok a **Regisztráció erre az eseményre** gombot fogják látni, amikor megtekintik az eseményt a [B1 weboldalon](../../b1-church/events/registering) vagy a [B1 mobilalkalmazásban](../../b1-mobile/events/registering). Ha csatolt egy űrlapot, a regisztrálók a regisztráció során egy **Kérdések** lépést látnak, és válaszaik a regisztrációjukkal együtt mentésre kerülnek.

:::info
A regisztrációs kérdések csak olyan űrlapokkal működnek, amelyek **nincsenek** korlátozottként megjelölve. A korlátozott űrlap regisztráció közben automatikusan kimarad, nem jelenik meg, ezért eseményhez kérdések csatolásakor nem korlátozott űrlapot használjon.
:::

### Regisztrációk kezelése

Az eseményeihez tartozó regisztrációk megtekintéséhez és kezeléséhez:

1. Az Ugrás menüben válassza a **Naptárak > Regisztrációk** menüpontot.
2. Megjelenik egy táblázat az összes olyan eseményről, amelynél a regisztráció engedélyezve van. Ebben látható az esemény címe, dátuma, a jelenlegi regisztrációszám a kapacitáshoz viszonyítva, valamint a címkék.
3. Kattintson egy eseményre a teljes regisztrációs lista megtekintéséhez. Ez tartalmazza a neveket, a tagok számát, a résztvevőtípusokat, a fizetési állapotot és a regisztráció dátumát.
4. A részletező oldalon az alábbiakat teheti meg:
   - **Résztvevő hozzáadása** -- Kézzel regisztrálhat valakit, aki offline vagy telefonon jelentkezett.
   - **Lemondás** egyes regisztrációknál
   - **Törlés** -- Regisztrációk végleges törlése
   - **Előléptetés** -- Várólistás regisztráció előléptetése, amikor felszabadul egy hely
   - **CSV exportálása** -- Az összes regisztráció letöltése, beleértve a résztvevőtípusokat, a kiegészítőket, a fizetett összegeket és a kérdésekre adott válaszokat

Ha az eseményhez regisztrációs kérdések vannak csatolva, a részletező oldalon megjelenik a **Csak a megválaszolatlan kérdések** szűrő, amellyel gyorsan megtalálhatja azokat a regisztrálókat, akik még nem küldtek választ. Minden megválaszolt regisztrációnál megjelenik továbbá a **Válaszok megtekintése** gomb, amellyel megnézheti a válaszaikat. Fizetős eseményeknél egy **Típus** oszlop, egy **Fizetett / Összes** oszlop, típusonkénti darabszámok és egy fizetési részleteket mutató párbeszédpanel is elérhető. Lásd: [Fizetős regisztrációk](paid-registrations#the-registration-roster).

:::tip
A kapacitássáv segítségével nyomon követheti, milyen gyorsan telnek meg az események. A sáv pirosra vált, ha az esemény eléri vagy túllépi a kapacitását.
:::

## Következő lépések

- [Kurált naptár](curated-calendar) -- Több csoportból gyűjtő naptár létrehozása
- [Fizetős regisztrációk](paid-registrations) -- Résztvevőtípusok, kiegészítő választások, kedvezménykódok, fizetések és várólisták
- [Eseményregisztrációs útmutató](../guides/event-registration) -- Lépésenkénti útmutató az eseményregisztráció beállításához
- [Naptárak áttekintése](./) -- Vissza a naptárak áttekintő oldalára
