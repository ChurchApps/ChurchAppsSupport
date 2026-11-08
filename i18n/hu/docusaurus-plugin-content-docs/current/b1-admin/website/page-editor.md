---
title: "A lapszerkesztő használata"
description: "Oldalszerkesztő beállítása a B1 Adminban szakaszok és elemek hozzáadásával, stílusozással, mobilnézet megtekintésével és a piszkozatok közzétételével. Kitér a visszavonásra és a verziótörténetre is."
---

# A lapszerkesztő használata

<div class="article-intro">

A B1 lapszerkesztő egy vizuális, húzással működő szerkesztő, amellyel kód írása nélkül alakíthatja ki gyülekezete weboldalának lapjait. Szakaszokat és tartalmi blokkokat adhat hozzá, testreszabhatja a stílusokat, megtekintheti a munkáját, és visszavonhatja a módosításokat -- mindezt a böngészőjéből.

</div>

## Oktatóvideó

<YouTube id="m2B_JxmfFm4" title="Lapok és navigáció szerkesztése a B1-ben" next="Egyéni domain csatlakoztatása a B1-ben" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Végezze el a [kezdeti beállítást](./initial-setup.md), hogy weboldala konfigurálva legyen
- Hozzon létre legalább egy lapot a [lapok kezelése](./managing-pages.md) részben
- A szerkesztő eléréséhez szüksége van a **content.edit** jogosultságra

</div>

## A szerkesztő megnyitása

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki a **Weboldal** menüpontot, majd kattintson a **Lapok** elemre.
2. A Lapok táblázatában keresse meg a szerkeszteni kívánt lapot, és kattintson az **Tartalom szerkesztése** gombra.

A szerkesztő teljes képernyős módban nyílik meg. A bal oldali panelen látható a lap szerkezete és az elérhető tartalmi elemek; a középső területen a lap élő előnézete jelenik meg.

:::info
A szerkesztő mindig világos módban jelenik meg, függetlenül a B1 Admin témabeállításától, és azokat a címsor- és szövegtípusokat használja, amelyeket a [Megjelenés](./appearance.md) részben választott. Ez biztosítja, hogy az előnézet pontosan úgy nézzen ki, ahogy a lap a weboldal látogatói számára fog megjelenni.
:::

## Lapstruktúra: szakaszok és elemek

Minden lap két szintből épül fel:

- **Szakaszok** -- A legfelső szintű tárolók, amelyek vízszintes sávokra osztják a lapot (például egy főbb kiemelő szakasz, egy tartalmi blokk vagy egy lábléc-sáv). Minden lapnak legalább egy szakaszt kell tartalmaznia, mielőtt tartalmat adhatna hozzá.
- **Elemek** -- A szakaszokon belül elhelyezett egyedi tartalmi darabok, például szöveg, képek, gombok, kártyák, űrlapok és naptárak.

### Szakasz hozzáadása

1. Kattintson a **Szakasz hozzáadása** gombra (vagy a bal oldali panel tetején lévő **+** gombra).
2. Válassza ki, hogyan kezdje:
   - **Sablonból** -- Böngésszen a szakaszsablonok galériájában, amely kategóriák szerint van rendezve (Kiemelés, Rólunk, Szolgálatok, Adakozás stb.), és kattintson egyre, hogy teljesen formázott, előre kitöltött szakaszként szúrja be. A hozzáadás után mindent testreszabhat.
   - **Üres szakasz** -- Válasszon oszlopelrendezést (egy oszlop, két oszlop, három oszlop stb.), és kezdje az elejéről.
3. Az új szakasz megjelenik az előnézetben. Kattintson rá a kijelöléséhez, majd állítsa be a háttérszínt, a belső margót és egyéb stílusbeállításait.

### Egy szakasz elrendezésének váltása

Ha már elkészített egy szakaszt, de más szerkezetet szeretne, használja az adott szakasz elrendezésváltó eszközét. Ezzel a galériából egy másik oszlopelrendezésre cserélheti a szakaszt úgy, hogy a meglévő tartalmai és elemei a helyükön maradnak.

### Elemek hozzáadása egy szakaszhoz

1. Kattintson az előnézetben egy szakasz belsejébe, hogy kijelölje.
2. Kattintson az **Tartalom hozzáadása** gombra, és a listából válasszon egy elemtípust:
   - **Szöveg** -- Címsorok, bekezdések és formázott szöveg
   - **Kép** -- Fénykép feltöltése vagy hivatkozása
   - **Gomb** -- Kattintható felhívás a cselekvésre (hivatkozás)
   - **Kártya** -- Kép címmel és leírással
   - **Űrlap** -- [Űrlap](../forms/creating-forms.md) beágyazása közvetlenül a lapra. Ha az űrlapnak van [fejlécképe](../forms/creating-forms.md#adding-a-header-photo), az a kérdések felett jelenik meg
   - **Naptár** -- Eseménynaptár megjelenítése
   - **GYIK** -- Lenyitható kérdés-válasz blokkok
   - **Videó** -- Videó beágyazása URL-cím alapján
   - **Csoportböngésző** -- Az összes gyülekezeti csoport szűrhető listája, opcionális kereséssel, kategória- és címkeszűrővel. Az **Elrendezés** lehet **Rács** (alapértelmezett) vagy **Görgetett (automatikus)** -- lásd a [görgethető elrendezéseket](#scrolling-layouts)
   - **Csoportlista** -- Csempék a nyilvános csoportokhoz, opcionálisan csak az adott címkével rendelkező csoportokhoz. Az **Elrendezés** lehet **Rács** (alapértelmezett; soronként legfeljebb három csempe) vagy **Görgetett (automatikus)** -- lásd a [görgethető elrendezéseket](#scrolling-layouts)
   - **Ikonos jellemző** -- Ikon címmel és rövid leírással, funkciók vagy szolgálati területek kiemelésére
   - **Galéria** -- Több fényképes rács vagy mozaikelrendezés
   - **Idézet** -- Egy vagy több idézet szerzővel, beosztással és fényképpel
   - **Közösségi ikonok** -- Hivatkozásokat tartalmazó ikonok gyülekezete közösségi média-profiljaihoz: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo és Podcast. Minden megjelenítendő profilhoz adjon meg egy hivatkozást; a **WhatsApp** esetében használjon `https://wa.me/` hivatkozást a telefonszámával, vagy egy csoport-meghívó hivatkozást
   - **Visszaszámláló** -- Időzítő, amely egy dátumig vagy egy heti istentiszteleti időpontig számol vissza
   - **Statisztika** -- Nagy számok sora címkékkel (tagok, évek, telephelyek)
   - **Adománygyűjtési előrehaladás** -- Élő folyamatjelző sáv egy adománygyűjtő kampányhoz, amely a gyűjtési célhoz képest összegyűjtött teljes összeget mutatja
   - **Munkatársrács** -- Fotós kártyák egy csoport tagjainak; a csoportnál be kell kapcsolni a **nyilvános névsor** opciót
   - **Istentiszteleti időpontok** -- A telephelyei istentiszteleti rendje, automatikusan a jelenléti beállításokból
   - **Prédikációk** -- A prédikációkönyvtára, teljes böngészőként vagy rács-, lista- vagy kiemelt legújabb elrendezésben
   - **Térkép** -- Beágyazott térkép, amely a gyülekezet címére van központosítva
   - **Táblázat** -- Egyszerű sor- és oszlopracs táblázatos tartalomhoz
   - **Szöveg fotóval** -- Szöveg és kép egymás mellett
   - **Logó** -- A gyülekezet logója, a [Megjelenés](./appearance.md) részből
   - **Élő közvetítés** -- Az élő közvetítés lejátszója, közvetlenül a lapba ágyazva
   - **Podcast** -- Epizódok listája az Ön által megadott külső podcast RSS-hírforrás URL-címéből, beállításokkal arra, hogy hány epizód jelenjen meg, és hogy megjelenjenek-e a dátumok és a leírások. Az élő oldalon minden epizódnál van hanglejátszó és egy **Letöltés** hivatkozás, amely az epizód hangfájlját az epizód címe alatt menti el. Ez bármely podcast-hírforrás megjelenítésére szolgál a weboldalon; ha saját prédikációit szeretné podcastként közzétenni, lásd helyette a [prédikációk kezelését](../sermons/managing-sermons.md#your-podcast-feed)
   - **Adomány** -- Adakozás gomb vagy beágyazott adományűrlap
   - **HTML** -- Saját nyers HTML-kód, speciális esetekhez, például harmadik féltől származó widget beágyazásához (lásd [A HTML elem használata](#using-the-html-element))
   - **iFrame** -- Külső tartalom beágyazása URL-cím alapján
3. Állítsa be az elemet a megjelenő beállítópanelen.

### A HTML elem használata

A **HTML** elemnek két mezője van:

- **HTML-tartalom** -- Az oldalon megjelenítendő jelölés. Ide írt bármely `<script>` címke az élő weboldalon fut le.
- **JavaScript (a script címke nélkül)** -- Olyan szkriptkód, amely a lap betöltésekor fut le. Ide beillesztheti egy szolgáltató beágyazási kódrészletét a `<script>` címkéivel együtt is, és az az élő weboldalon le fog futni.

Ha a JavaScript mezőbe csak webcímet (például képhivatkozást) illeszt be, a mező pirosra vált, és megjelenik a figyelmeztetés: *„Ez egy webcím, nem JavaScript."* A mezőbe írt puszta cím nem tesz semmit. Kép megjelenítéséhez használjon **Kép** elemet, vagy írja a `<img src="...">` kódot a **HTML-tartalom** mezőbe.

### A Naptár elem használata {#using-the-calendar-element}

A **Naptár** elem az egyik naptárából jeleníti meg az eseményeket:

1. A **Kiválasztás** alatt válassza a **Csoportnaptár** lehetőséget (egy csoport eseményei -- a listában azok a csoportok szerepelnek, amelyeknek tagja) vagy a **Válogatott naptár** lehetőséget (a **Naptárak** alatt összeállított naptár; lásd [Válogatott naptár](../calendars/curated-calendar.md)).
2. A **Naptár kiválasztása** alatt válassza ki a csoportot vagy a naptárat.
3. A **Megjelenítés** alatt válassza ki, hogyan jelenjen meg:
   - **Havi naptár** -- Havi rács, amelyben a látogatók lapozhatnak. Minden eseményt az a csoport színez, amelyhez tartozik, így egy csoport eseményei minden naptáron ugyanolyan színűek. A B1 automatikusan választja ki a színeket; nincs szükség beállításra.
   - **Közelgő események** -- Csempék rácsa a következő 12 eseményhez; az ismétlődő esemény a következő dátumán jelenik meg egyszer. Minden csempén megjelenik az esemény fotója (vagy a címe a téma sötét színén, ha nincs fotó), egy dátumjelző, a nap és az időpont, valamint a leírás első sora. A csempék felett lévő **Feliratkozás** gombbal a látogatók másolhatják a naptár ICS-hivatkozását, vagy letölthetik azt. Ehhez a megjelenítési módhoz megjelenik egy **Elrendezés** beállítás: **Rács** (alapértelmezett) vagy **Görgetett (automatikus)**, amely a csempéket egyetlen sorba rendezi, és az magától görget tovább (lásd [görgethető elrendezéseket](#scrolling-layouts)). **Válogatott naptár** esetén kapcsolja be a **Csoportjelvény** beállítást, hogy minden csempe jobb felső sarkában megjelenjen az esemény csoportjának neve, az adott csoport naptárszínében. Archivált vagy bizalmas csoportok eseményei nem kapnak jelvényt.
4. Ha csak néhány eseményt szeretne megjeleníteni, írjon egy címkét a **Csak ezzel a címkével rendelkező események** mezőbe -- például `youth`. Csak azok az események jelennek meg, amelyek **Címkéi** között szerepel ez a szó. Ha üresen hagyja, minden esemény megjelenik. A címkéket minden eseménynél külön kell beállítani; lásd [Események hozzáadása és szerkesztése](../calendars/creating-calendars.md#adding-and-editing-events).

Mindkét megjelenítési módban az eseményre kattintva annak saját oldala nyílik meg a weboldalán. Az eseményoldalon látható az esemény fotója, címe, dátuma és időpontja, valamint leírása, továbbá egy doboz a **Mikor** (ismétlődő esemény esetén az ismétlődési minta is) és a **Hol** (az eseményre foglalt termek) adataival. Ha a regisztráció be van kapcsolva, megjelenik a **Regisztráció erre az eseményre** gomb is, valamint egy **Hozzáadás a naptáramhoz** hivatkozás, amely az eseményt naptárfájlként tölti le. Az oldal úgy van felépítve, hogy a keresőmotorok megjeleníthessék az esemény dátumát és részleteit a találataikban. A lapjain megjelenő válogatott naptárak eseményoldalai (a következő hat hónap eseményei) szintén szerepelnek a weboldal oldaltérképében, így a keresőmotorok megtalálhatják őket.

### Görgethető elrendezések {#scrolling-layouts}

A **Görgetett (automatikus)** elrendezés a **Csoportböngészőn**, a **Csoportlistán** és a Naptár elem **Közelgő események** megjelenítésén rácsos helyett egyetlen sorba rendezi a csempéket. Telefonon minden csempe kitölti a sort; számítógépen két csempe fér el egymás mellett. Ha több csempe van, mint amennyi elfér, a sor:

- Körülbelül négymásodpercenként egy csempével tovább halad, és az utolsó után újra az elsőnél folytatja.
- Megáll, amikor a látogató fölé viszi az egeret, megérinti, vagy a billentyűzettel belép a sorba, majd néhány másodperc múlva újra elindul.
- Alatta pöttyök sorát mutatja, csempénként egyet; az aktuális csempe pöttye ki van töltve. A látogatók a pöttyökre kattintva egy adott csempéhez ugorhatnak.

Azokon az eszközökön, amelyeken a mozgás csökkentése be van kapcsolva, a sor mozdulatlan marad, és a látogatók maguk húzhatják vagy görgethetik. Ha minden csempe elfér, a sor nem mozdul, és nem jelennek meg pöttyök.

### A tartalom sorrendjének módosítása

Húzza a szakaszokat vagy elemeket az egyes elemek bal oldalán lévő fogantyúval (hat pont), hogy átrendezze őket. Húzhat elemeket egy szakaszon belül, vagy áthelyezheti őket szakaszok között.

## A lap stílusozása

### Szakaszstílusok

Kattintson bármely szakaszra a stíluspanel megnyitásához. Az alábbiakat állíthatja be:

- **Háttér** -- Egyszínű, színátmenet vagy kép. Képes háttér használatakor a **Fókuszpont** választóval kattintással megadhatja, hogy a kép melyik része maradjon középen a szakasz méretezésekor, az **Átfedés** színbeállítással pedig félig áttetsző színárnyalatot adhat a képre, így javítva a szöveg olvashatóságát.
- **Belső margó** -- A szakaszon belüli felső és alsó térköz
- **Szélesség** -- Teljes szélesség vagy középre igazított, korlátozott szélesség
- **Elválasztók** -- Dekoratív alakzat-elválasztók (hullám, ferde, ív, háromszög és más) a szakasz felső vagy alsó szélén, színnel, magassággal és tükrözési beállításokkal

### Elemstílusok

Kattintson bármely elemre a stíluspanel megnyitásához. Gyakori beállítások a betűméret, a szín, az igazítás, a külső és a belső margó. Képek esetén beállítható az alternatív szöveg és a hivatkozások célja.

### Egyéni CSS

Haladó stílusozáshoz minden szakasznak és elemnek van egy **Egyéni CSS** mezője, ahová saját CSS-szabályokat írhat. Ezek csak az adott elemre vonatkoznak, így nem befolyásolják akaratlanul a lap többi részét.

:::tip
Ha stílusokat szeretne alkalmazni a teljes weboldalon -- például egyéni betűtípust vagy globális színt --, használja a [Megjelenés](./appearance.md) beállításait az egyes lapokon található egyéni CSS helyett.
:::

## A lap előnézete

Az eszköztáron lévő előnézeti vezérlőkkel ellenőrizheti, hogyan néz ki a lap különböző képernyőméreteken:

- **Asztali** -- Teljes szélességű böngészőnézet
- **Mobil** -- Keskeny, telefonméretű nézet

Telefonon a sorokban lévő oszlopok egymás alá kerülnek, teljes szélességben, kivéve, ha a sor beállításaiban **Mobil szélességet** adott meg nekik. A prédikáció- és podcastlisták telefonon is úgy jelennek meg, hogy minden epizód szövege a bélyegképe alatt van.

Az élő lap pontosan úgy megtekintéséhez, ahogy a látogatók fogják látni, térjen vissza a Lapok listájához, és kattintson a lap elérési útjára. Az új böngészőlapon nyílik meg.

## Akadálymentesség ellenőrzése

Kattintson az eszköztár **Akadálymentesség** ikonjára egy gyors ellenőrzéshez a gyakori problémákra -- hiányzó alternatív szöveg a képeknél, gyenge színkontraszt vagy sorrendben nem álló címsorok. Minden probléma közvetlenül a javítandó elemhez vezet, így helyben javíthatja.

## A módosítások visszavonása

A szerkesztő automatikusan nyilvántartja a szerkesztési előzményeit. Az eszköztár gombjaival vagy billentyűparancsokkal navigálhat:

- **Visszavonás** (Ctrl+Z / Cmd+Z) -- Az utolsó művelet visszavonása
- **Újra** (Ctrl+Shift+Z vagy Ctrl+Y / Cmd+Shift+Z) -- Egy visszavont művelet újbóli alkalmazása

A lapot egy korábbi pillanatfelvételre is visszaállíthatja. Kattintson az eszköztár **Előzmények megtekintése** gombjára a mentett pillanatfelvételek listájához, amelyhez leírások is tartoznak, majd kattintson bármelyik bejegyzésre az adott állapot visszaállításához.

:::warning
A pillanatfelvétel visszaállítása a jelenlegi laptartalmat a pillanatfelvétel verziójával helyettesíti. Ezt a szokásos visszavonás gombbal nem lehet visszacsinálni. Ha meg szeretné őrizni a visszatérés lehetőségét, a régi állapot visszaállítása előtt mentsen egy pillanatfelvételt a jelenlegi állapotról.
:::

## Mentés és közzététel

A módosítások munka közben automatikusan mentésre kerülnek. Az eszköztárban lévő állapotjelző mutatja, hogy a módosításai mentve vannak-e.

### Piszkozat és közzétett állapot

A lapoknak lehet **közzétett** állapotuk, amely szabályozza, hogy a látogatók mikor látják a módosításokat. Az eszköztár az aktuális állapotot jelző címkét mutat:

- **Mentéskor élő** -- A lap nem használ közzétételi munkafolyamatot. Minden mentett módosítás azonnal élő lesz. Ez az alapértelmezett beállítás az új lapokon.
- **Közzé nem tett módosítások** -- A lapot már korábban közzétették, de azóta módosított rajta. A látogatók továbbra is a korábban közzétett változatot látják.
- **Közzétéve** -- A lap élő, és a mentett tartalom megegyezik azzal, amit a látogatók látnak.

A módosítások közzétételéhez kattintson az eszköztár **Közzététel** gombjára. A lap azonnal élő lesz.

Ha a látogatók számára látható tartalom változtatása nélkül a legutóbb közzétett változatra szeretne visszatérni, nyissa meg a továbbiak menüt (⋮), és kattintson a **Nem közzétett módosítások elvetése** lehetőségre.

A közzétételi munkafolyamat használatának abbahagyásához nyissa meg a továbbiak menüt, és kattintson a **Közzététel kikapcsolása** lehetőségre. Ezután a szerkesztések ismét azonnal élőek lesznek.

:::tip
A piszkozat/közzététel munkafolyamatot akkor használja, ha előkészít egy lapot -- például egy közelgő eseményhez --, és csak a megfelelő pillanatban szeretné élővé tenni. Készítse el és tekintse meg az előnézetet, majd amikor készen áll, kattintson a Közzététel gombra.
:::

## Kapcsolódó cikkek

- [Lapok kezelése](./managing-pages.md) -- Lapok létrehozása, URL-címek beállítása és a weboldal navigációjának kezelése
- [Megjelenés](./appearance.md) -- Weboldal-szintű színek, betűtípusok és arculat beállítása
- [Fájlok](./files.md) -- Képek és dokumentumok feltöltése, amelyeket a szerkesztőben használhat
- [Űrlapok létrehozása](../forms/creating-forms.md) -- Olyan űrlapok készítése, amelyeket lapokba ágyazhat
