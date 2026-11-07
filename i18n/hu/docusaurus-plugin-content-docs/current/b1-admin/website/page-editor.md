---
title: "A oldalszerkesztő használata"
---

# A oldalszerkesztő használata

<div class="article-intro">

A B1 oldalszerkesztő egy vizuális, húzd-és-ejtsd típusú szerkesztő, amellyel kód írása nélkül megtervezheted a gyülekezeti weboldalad oldalait. Szakaszokat és tartalmi blokkokat adhatsz hozzá, testreszabhatod a stílusokat, megnézheted az előnézetet, és visszavonhatod a módosításokat – mindezt a böngésződből.

</div>

## Oktatóvideó

<YouTube id="m2B_JxmfFm4" title="Oldalak és navigáció szerkesztése a B1-ben" next="Egyéni domain csatlakoztatása a B1-ben" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Végezd el a [kezdeti beállítást](initial-setup), hogy a weboldalad konfigurálva legyen
- Hozz létre legalább egy oldalt a [Oldalak kezelése](managing-pages) részben
- A szerkesztő eléréséhez szükséged van a **content.edit** jogosultságra

</div>

## A szerkesztő megnyitása

1. A B1 Adminban nyisd meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsd ki a **Weboldal** menüpontot, majd kattints a **Oldalak** elemre.
2. Keresd meg az oldalt az Oldalak táblázatban, amelyet szerkeszteni szeretnél, és kattints az **Tartalom szerkesztése** gombra.

A szerkesztő teljes képernyős módban nyílik meg. A bal oldali panelen látod az oldal szerkezetét és az elérhető tartalmi elemeket; a középső területen az oldal élő előnézete található.

:::info
A szerkesztő mindig világos módban jelenik meg, a B1 Admin témabeállításától függetlenül, és az [Megjelenés](appearance) részben kiválasztott címsor- és szövegtípusokat használja. Ez biztosítja, hogy az előnézet pontosan úgy nézzen ki, ahogy az oldal a látogatóknak meg fog jelenni.
:::

## Az oldal szerkezete: szakaszok és elemek

Minden oldal két szintből épül fel:

- **Szakaszok** – A legfelső szintű tárolók, amelyek az oldalt vízszintes sávokra osztják (például egy főszekció, egy tartalmi blokk vagy egy láblécsáv). Minden oldalnak legalább egy szakaszt kell tartalmaznia, mielőtt tartalmat adhatnál hozzá.
- **Elemek** – A szakaszokon belül elhelyezett egyedi tartalmi részek, mint például szöveg, képek, gombok, kártyák, űrlapok és naptárak.

### Szakasz hozzáadása

1. Kattints a **Szakasz hozzáadása** gombra (vagy a bal panel tetején lévő **+** gombra).
2. Válaszd ki, hogyan szeretnél kezdeni:
   - **Sablonból** – Böngészd a szakaszsablonok galériáját kategóriák szerint (Főszekció, Rólunk, Szolgáltatások, Adakozás stb.), és kattints egyre, hogy teljesen formázott, előre kitöltött szakaszként szúrd be. Hozzáadás után mindent testreszabhatsz.
   - **Üres szakasz** – Válassz oszlopelrendezést (egy oszlop, két oszlop, három oszlop stb.), és építsd fel nulláról.
3. Az új szakasz megjelenik az előnézetben. Kattints rá a kijelöléséhez, és állítsd be a háttérszínét, a belső margót és egyéb stílusbeállításait.

### Egy szakasz elrendezésének módosítása

Már összeállítottál egy szakaszt, de másik szerkezetre vágysz? Használd a szakasz elrendezésváltóját, hogy a galériából egy másik oszlopelrendezésre cseréld, miközben a meglévő tartalmak és elemek megmaradnak.

### Elemek hozzáadása egy szakaszhoz

1. Kattints az előnézetben egy szakaszon belül, hogy kijelöld.
2. Kattints a **Tartalom hozzáadása** gombra, és válassz egy elemtípust a listából:
   - **Szöveg** – Címsorok, bekezdések és formázott szöveg
   - **Kép** – Fénykép feltöltése vagy hivatkozás egy képre
   - **Gomb** – Kattintható hívás a cselekvésre (linkgomb)
   - **Kártya** – Kép címmel és leírással
   - **Űrlap** – [Űrlap](../forms/creating-forms) beágyazása közvetlenül az oldalra. Ha az űrlapnak van [fejlécképe](../forms/creating-forms.md#adding-a-header-photo), az a kérdések fölött jelenik meg
   - **Naptár** – Eseménynaptár megjelenítése
   - **GYIK** – Harmonikaszerű kérdés-válasz blokkok
   - **Videó** – Videó beágyazása URL alapján
   - **Csoportböngésző** – Az összes gyülekezeti csoport szűrhető könyvtára, opcionális kereséssel, kategória- és címkeszűrővel
   - **Ikonos kiemelés** – Ikon címmel és rövid leírással, funkciók vagy szolgálati területek kiemelésére
   - **Galéria** – Több fényképből álló rács vagy mozaikelrendezés
   - **Vélemény** – Egy vagy több idézet szerzővel, szereppel és fotóval
   - **Közösségi ikonok** – Hivatkozott ikonok a gyülekezet közösségi média profiljaihoz: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo és Podcast. Minden megjeleníteni kívánt platformhoz adj meg egy hivatkozást; a **WhatsApp** esetében használj `https://wa.me/` hivatkozást a telefonszámoddal vagy egy csoportmeghívó hivatkozással
   - **Visszaszámláló** – Időzítő, amely egy dátumig vagy a heti istentisztelet időpontjáig számol vissza
   - **Statisztika** – Nagy számok sora címkékkel (tagok, évek, gyülekezeti helyszínek)
   - **Adománygyűjtés állása** – Élő folyamatjelző sáv egy adománygyűjtő kampányhoz, amely megmutatja az alap céljához összegyűlt teljes összeget
   - **Munkatársrács** – Fotókártyák egy csoport tagjairól; a csoportnak be kell kapcsolnia a **nyilvános névsor** opciót
   - **Istentiszteleti időpontok** – A gyülekezeti helyszíneid istentiszteleti rendje, automatikusan a részvételi beállításokból
   - **Igehirdetések** – Az igehirdetés-könyvtárad teljes böngészőként vagy rács, lista vagy kiemelt legutóbbi elrendezésben
   - **Térkép** – Beágyazott térkép, amely a gyülekezet címére van középre igazítva
   - **Táblázat** – Egyszerű sor- és oszlopracs táblázatos tartalomhoz
   - **Szöveg képpel** – Szöveg és kép egymás mellett
   - **Logó** – A gyülekezeti logód, amelyet az [Megjelenés](appearance) részből vesz át
   - **Élő közvetítés** – Az élő közvetítés lejátszója, közvetlenül az oldalba ágyazva
   - **Podcast** – Epizódok listája egy általad megadott külső podcast RSS-feed URL-ből, beállításokkal arra, hány epizódot mutasson és megjelenjenek-e a dátumok és leírások. Az élő oldalon minden epizódnál van hanglejátszó és egy **Letöltés** hivatkozás, amely az epizód hangfájlját az epizód címe alatt menti el. Ez bármely podcast-feed megjelenítésére szolgál az oldaladon; ha a saját igehirdetéseidet szeretnéd podcastként közzétenni, lásd helyette: [Igehirdetések kezelése](../sermons/managing-sermons.md#your-podcast-feed)
   - **Adakozás** – Adománygomb vagy beágyazott adományűrlap
   - **HTML** – Saját nyers HTML-kódod haladó felhasználáshoz, például harmadik féltől származó widget beágyazásához (lásd: [A HTML elem használata](#using-the-html-element))
   - **iFrame** – Külső tartalom beágyazása URL alapján
3. Állítsd be az elemet a megjelenő beállítási panelen.

### A HTML elem használata

A **HTML** elemnek két mezője van:

- **HTML-tartalom** – Az oldalon megjelenítendő jelölés. Az ide beírt `<script>` címkék élőben futnak a weboldaladon.
- **JavaScript (a script címke nélkül)** – Az oldal betöltésekor futó szkriptkód. Ide beillesztheted egy szolgáltató beágyazó kódrészletét a `<script>` címkékkel együtt is, és az élőben fog futni.

Ha csak egy webcímet (például egy képhivatkozást) illesztesz be a JavaScript mezőbe, a mező pirosra vált, és megjelenik a figyelmeztetés: *„Ez egy webcím, nem JavaScript.”* Egy puszta cím ebben a mezőben nem tesz semmit. Kép megjelenítéséhez használj **Kép** elemet, vagy írd a `<img src="...">` kódot a **HTML-tartalom** mezőbe.

### A Naptár elem használata {#using-the-calendar-element}

A **Naptár** elem az egyik naptáradból mutat eseményeket:

1. A **Kiválasztás** alatt válaszd a **Csoportnaptár** lehetőséget (egy csoport eseményei – a listában azok a csoportok szerepelnek, amelyek tagja vagy) vagy a **Válogatott naptár** lehetőséget (a **Naptárak** alatt összeállított naptár; lásd: [Válogatott naptár](../calendars/curated-calendar)).
2. A **Naptár kiválasztása** alatt válaszd ki a csoportot vagy naptárat.
3. A **Megjelenítés** alatt válaszd ki, hogyan jelenjen meg:
   - **Havi naptár** – Havi rács, amelyen a látogatók lapozhatnak.
   - **Közelgő események** – A következő 12 eseményt mutató csempéknek a rácsa; az ismétlődő esemény a következő dátumán jelenik meg egyszer. Minden csempén látszik az esemény fotója (vagy a címe a témád sötét színén, ha nincs fotó), egy dátumjelölő, a nap és az időpont, valamint a leírás első sora. A csempék felett lévő **Feliratkozás** gomb lehetővé teszi a látogatók számára, hogy a naptár ICS-hivatkozását másolják vagy letöltsék. Ehhez a megjelenítéshez megjelenik a **Elrendezés** beállítás: **Rács** (alapértelmezett) vagy **Görgethető (automatikus)**, amely a csempéket egyetlen sorba rendezi, és az magától görgeti tovább.
4. Ha csak néhány eseményt szeretnél megjeleníteni, írj egy címkét a **Csak ezzel megcímkézett események** mezőbe – például `ifjúság`. Csak azok az események jelennek meg, amelyek **Címkéi** között szerepel ez a szó. Hagyd üresen, ha az összes eseményt meg szeretnéd mutatni. A címkéket minden eseménynél külön állíthatod be; lásd: [Események hozzáadása és szerkesztése](../calendars/creating-calendars.md#adding-and-editing-events).

Mindkét megjelenítési módban az eseményre kattintva annak saját oldala nyílik meg a weboldaladon. Az eseményoldalon látszik az esemény fotója, címe, dátuma és időpontja, valamint leírása, továbbá egy doboz a **Mikor** (ismétlődő esemény esetén az ismétlődési mintával) és a **Hol** (az eseményre foglalt termek) adataival. Ha a regisztráció be van kapcsolva, megjelenik egy **Regisztráció erre az eseményre** gomb is, és egy **Hozzáadás a naptáramhoz** hivatkozás, amely az eseményt naptárfájlként tölti le. Az oldal úgy készül, hogy a keresőmotorok a találatokban megjeleníthessék az esemény dátumát és részleteit. A válogatott naptárak azon eseményoldalai, amelyek az oldalaidon jelennek meg (a következő hat hónapra), szintén szerepelnek a webhely oldaltérképében, így a keresőmotorok is megtalálják őket.

### A tartalom átrendezése

A szakaszokat és elemeket az egyes elemek bal oldalán található fogantyú-ikonnal (hat pont) húzva rendezheted át. Húzhatsz elemeket egy szakaszon belül, vagy áthelyezheted őket más szakaszok közé.

## Az oldal formázása

### Szakasz stílusai

Kattints bármelyik szakaszra a stíluspanel megnyitásához. Ezeket állíthatod be:

- **Háttér** – Egyszínű, átmenetes vagy képes háttér. Képes háttér használatakor a **Fókuszpont** választóval kattintással megadhatod, hogy a kép melyik része maradjon középen a szakasz átméretezésekor, az **Átfedés** színbeállítással pedig félig áttetsző színt rakhatsz a kép fölé a szöveg olvashatóságának javítására.
- **Belső margó** – A szakaszon belüli felső és alsó térköz
- **Szélesség** – Teljes szélesség vagy középre igazított, keretezett elrendezés
- **Elválasztók** – Dekoratív formaelválasztók (hullám, ferde vonal, ív, háromszög és további) a szakasz felső vagy alsó szélén, színnel, magassággal és tükrözési beállításokkal

### Elemek stílusai

Kattints bármelyik elemre a stíluspanel megnyitásához. Gyakori beállítások a betűméret, szín, igazítás, külső margó és belső margó. Képeknél beállíthatod az alternatív szöveget és a hivatkozások céljait.

### Egyéni CSS

Haladó formázáshoz minden szakasznak és elemnek van egy **Egyéni CSS** mezője, ahol saját CSS-szabályokat írhatsz. Ezek csak az adott elemre vonatkoznak, így nem befolyásolják véletlenül az oldal többi részét.

:::tip
Ha az egész weboldalon szeretnél stílusokat alkalmazni – például egyéni betűtípust vagy globális színt –, használd a [Megjelenés](appearance) beállításait, ne egyéni CSS-t az egyes oldalakon.
:::

## Az oldal előnézete

Az eszköztár előnézeti vezérlőivel ellenőrizheted, hogyan néz ki az oldal különböző képernyőméreteken:

- **Asztali** – Teljes szélességű böngészőnézet
- **Mobil** – Keskeny, telefonméretű nézet

Telefonon a sorban lévő oszlopok egymás alá kerülnek, teljes szélességben, kivéve, ha a sor beállításaiban **Mobil szélesség** értéket adsz meg nekik. Az igehirdetés- és podcastlisták telefonon is úgy jelennek meg, hogy minden epizód szövege a bélyegkép alatt helyezkedik el.

Az élő oldal pontosan úgy megtekintéséhez, ahogy a látogatók látják, menj vissza az Oldalak listához, és kattints az oldal elérési útjára. Az új böngészőlapon nyílik meg.

## A akadálymentesség ellenőrzése

Kattints az eszköztár **Akadálymentesség** ikonjára, hogy gyors ellenőrzést futtass a gyakori problémákra – hiányzó alternatív szöveg a képeknél, gyenge színkontraszt vagy sorrendben nem álló címsorok. Minden probléma közvetlenül a javítandó elemre mutat, így helyben kijavíthatod.

## Módosítások visszavonása

A szerkesztő automatikusan nyilvántartja a szerkesztési előzményeidet. Az eszköztár gombjaival vagy billentyűparancsokkal navigálhatsz:

- **Visszavonás** (Ctrl+Z / Cmd+Z) – Az utolsó művelet visszavonása
- **Újra** (Ctrl+Shift+Z vagy Ctrl+Y / Cmd+Shift+Z) – A visszavont művelet újbóli alkalmazása

Az oldalt egy korábbi pillanatfelvételre is visszaállíthatod. Kattints az eszköztár **Előzmények megtekintése** gombjára, hogy lásd a mentett pillanatfelvételek listáját leírásokkal, majd kattints bármelyik bejegyzésre a visszaállításhoz.

:::warning
A pillanatfelvétel visszaállítása felülírja az aktuális oldaltartalmat a pillanatfelvétel verziójával. Ezt a szokásos visszavonás gombbal nem lehet visszacsinálni. Ha meg szeretnéd tartani a visszatérés lehetőségét, a régi állapot visszaállítása előtt készíts pillanatfelvételt az aktuális állapotról.
:::

## Mentés és közzététel

A módosítások munka közben automatikusan mentésre kerülnek. Az eszköztárban lévő állapotjelző mutatja, hogy a módosításaid el lettek-e mentve.

### Piszkozat és közzétett állapot

Az oldalak rendelkezhetnek **közzétett** állapottal, amely szabályozza, mikor látják a látogatók a módosításaidat. Az eszköztár az aktuális állapotot egy címkében jeleníti meg:

- **Mentéskor élő** – Az oldal nem használ közzétételi folyamatot. Minden mentett módosítás azonnal élő lesz. Ez az alapértelmezés az új oldalaknál.
- **Nem közzétett módosítások** – Az oldalt már közzétették korábban, de az utolsó közzététel óta módosítottad. A látogatók továbbra is a korábban közzétett verziót látják.
- **Közzétéve** – Az oldal élő, és a mentett tartalom megegyezik azzal, amit a látogatók látnak.

A módosítások közzétételéhez kattints az eszköztár **Közzététel** gombjára. Az oldal azonnal élő lesz.

Az utolsó közzétett verzióhoz való visszatéréshez anélkül, hogy a látogatók látnák a változásokat, nyisd meg a túlcsordulás menüt (⋮), és kattints a **Nem közzétett módosítások elvetése** lehetőségre.

A közzétételi folyamat kikapcsolásához nyisd meg a túlcsordulás menüt, és kattints a **Közzététel kikapcsolása** lehetőségre. Ezután a szerkesztések újra azonnal élővé válnak.

:::tip
Használd a piszkozat/közzététel folyamatot, ha egy oldalt előre szeretnél elkészíteni – például egy közelgő eseményhez –, és csak a megfelelő pillanatban szeretnéd élővé tenni. Építsd fel és nézd meg az oldalt, majd amikor készen állsz, kattints a Közzététel gombra.
:::

## Kapcsolódó cikkek

- [Oldalak kezelése](managing-pages) – Oldalak létrehozása, URL-ek beállítása és a webhely navigációjának kezelése
- [Megjelenés](appearance) – Webhelyszintű színek, betűtípusok és arculat beállítása
- [Fájlok](files) – Képek és dokumentumok feltöltése a szerkesztőben való használathoz
- [Űrlapok létrehozása](../forms/creating-forms) – Oldalakba beágyazható űrlapok készítése
