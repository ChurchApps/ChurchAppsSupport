---
title: "Személyek keresése"
description: "Keresés a B1 Admin személyi nyilvántartásában név szerint, rendezés és oszlopok választása táblázatban, Advanced Search szűrők, CSV-export."
---

# Személyek keresése

<div class="article-intro">

A **Személyek** oldal az egyházi névjegyzéket háztartások kereshető listájaként vagy egyéni személyek rendezhető táblázataként jeleníti meg. Gyorsan megtalálhatja a gyülekezet bármely tagját, testreszabhatja, mely adatok látszanak, és exportálhatja az eredményeket. A hatékony keresés elengedhetetlen a napi egyházkormányzati feladatokhoz, például a látogatók utánkövetéséhez, kapcsolattartó listák készítéséhez és a tagnyilvántartás kezeléséhez.

</div>

## Oktatóvideó

<YouTube id="7Y-tN9RmnDQ" title="Személyek keresése és listák készítése a B1-ben" next="Egyéni mezők, tömeges szerkesztés és exportálás a B1-ben" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van egy aktív B1 Admin fiókra, amellyel megtekintheti a személyeket. Ha nem biztos a hozzáférési szintjében, olvassa el a [Szerepkörök és jogosultságok](roles-permissions.md) oldalt.
- A egyházi névjegyzékben legyenek személyek. Ha még senkit nem adott hozzá, lásd a [Személyek hozzáadása](adding-people.md) vagy az [Adatok importálása](importing-data.md) oldalt.

</div>

## Háztartások és táblázatos nézetek

A Személyek oldal a névjegyzéket **háztartások** szerint sorolja fel, betűrendben csoportosítva. Minden sor megjeleníti a háztartás fényképeit, nevét (például „A Smith család”), valamint az abban szereplő összes személy nevét. Kattintson egy háztartásra a háztartásfő profiljának megnyitásához, vagy kattintson bármely tag nevére az adott személy megnyitásához. A lista felett egy számláló mutatja, hány háztartás és személy látszik.

A lista feletti **Megjelenítés** kapcsolóval válthat a **Háztartások** és a **Táblázat** nézet között. A **Táblázat** nézetben soronként egy személy szerepel, és itt rendezheti az adatokat és választhatja ki az oszlopokat (lásd lentebb). A B1 az Ön választását az adott eszközön megjegyzi.

A **Táblázat** nézetben minden személy tagsági állapota a neve alatt jelenik meg. A hét állapot mindegyike saját színt kap, ugyanazt, amelyet a személy profilján is használunk. Ha valakinek a háztartásbeli szerepe **Gyermek**, az állapot mellett egy **Gyermek** címke is megjelenik. Ha valakit gyermekként szeretne megjelölni, állítsa be a szerepét a profiljának [háztartás panelén](./adding-people.md#managing-households).

Alapértelmezés szerint az oldal a névjegyzék első részét tölti be. Ha több személy van, kattintson a lista alatti **Összes tag megjelenítése** gombra, hogy mindenki betöltődjön.

## Gyorskeresés

A Személyek oldal tetején lévő **Háztartás vagy személy keresése** mezővel valós időben találhat meg tagokat:

1. Kattintson a **keresőmezőre** a Személyek oldal tetején.
2. Kezdje el beírni a nevet.
3. Az eredmények gépelés közben automatikusan szűrődnek. Rövid, körülbelül fél másodperces késleltetés van, hogy a keresés ne fusson le minden billentyűleütésnél.
4. Az alatta lévő lista csak a találatokat mutatja.

A keresőmező alatti **Törlés** gombra kattintva visszaállíthatja a keresést, és újra megjelenítheti a teljes névjegyzéket.

:::tip
Nem kell Entert nyomnia. A keresés automatikusan fut, miután abbahagyta a gépelést.
:::

## Eredmények rendezése

A **Táblázat** nézetben a személyek vezetéknév, majd keresztnév szerint vannak felsorolva. A névjegyzéket más sorrendben is rendezheti, ha rákattint bármely oszlopfejlécre:

1. Kattintson egy **oszlopfejlécre** (például a **Név** vagy az **E-mail** fejlécre) a rendezéshez az adott oszlop szerint.
2. Ugyanerre a fejlécre újra kattintva megfordíthatja a rendezési sorrendet.

Így könnyen megtalálhatja a személyeket betűrend szerint, életkor alapján vagy bármely más látható oszlop szerint.

## Oszlopok testreszabása

Nem kell minden adatnak egyszerre látszania. Kiválaszthatja, mely oszlopok jelenjenek meg a táblázatban:

1. Kattintson a **Oszlopok kiválasztása** ikonra a Személyek oldal fejlécében. (Az oszlopok a **Táblázat** nézetre vonatkoznak.)
2. Jelölje be vagy törölje a jelölést az oszlopok megjelenítéséhez vagy elrejtéséhez. Elérhető oszlopok:
   - **Fénykép**
   - **Név**
   - **E-mail**
   - **Telefon**
   - **Cím**
   - **Születési dátum**
   - **Kor**
   - **Nem**
   - **Tagsági állapot**
   - **Campus**
   - **Hozzáadás dátuma** -- amikor a személy rekordját létrehozták
3. A táblázat azonnal frissül a kiválasztásának megfelelően. Az **Oszlopok kiválasztása** párbeszédpanel bezárásához kattintson a **Kész** gombra.

### Egyéni mezők megjelenítése oszlopként

Az oszlopválasztónak két lapja van: a **Általános** lap a fent felsorolt beépített oszlopokat tartalmazza, a **Egyéni** lap pedig egyházának [Egyéni mezőit](../settings/custom-fields.md) és a Személyek űrlapjainak kérdéseit. Jelöljön be egy egyéni mezőt az **Egyéni** lapon, hogy oszlopként adja hozzá, és minden személy értéke megjelenik a táblázatban. Az értékek ugyanúgy jelennek meg, mint a személy profilján: az Igen/Nem mezők *Igen* vagy *Nem* értéket mutatnak, a feleletválasztós mezők a választási lehetőség címkéjét, a dátumok pedig rövid dátumformátumban jelennek meg. Ha valakinek nincs értéke a mezőhöz, üres cella látszik.


## Keresési eredmények exportálása

Az aktuális keresési eredményeit bármikor letöltheti CSV-fájlként:

1. Alkalmazzon a kívánt keresést vagy szűrőket.
2. Kattintson az **Exportálás** gombra a Személyek oldal fejlécében.
3. A CSV-fájl letöltődik a számítógépére, és megnyitható Excelben, a Google Táblázatokban vagy bármely más táblázatkezelő programban.

Az exportálásról további részleteket az [Adatok exportálása](./exporting-data.md) oldalon talál.

:::tip
Összetettebb lekérdezésekhez, például ahhoz, hogy megtalálja mindazokat, akik az elmúlt három hónapban nem jártak istentiszteleten, próbálja ki az [AI-keresést](./ai-search.md), amellyel egyszerű nyelvi kérdésekkel kereshet.
:::

## Speciális keresés

A Speciális keresés lehetővé teszi, hogy feltételek kombinálásával pontos szűrőket állítson össze. Nyissa meg a Személyek oldalon a keresőmező alatti **Speciális** gombra kattintva, majd bontson ki egy kategóriát, és jelölje be a szűrni kívánt mezőket (a mező nevére vagy a jelölőnégyzetre is kattinthat), minden mezőhöz választva egy operátort és értéket. A kategóriák: **Nevek**, **Demográfia**, **Kapcsolat**, **Tagság**, **Aktivitás** (adományok és részvétel) és **Egyéni mezők**.

Az új személyek megtalálásához nyissa meg a **Tagság** kategóriát, és jelölje be a **Hozzáadás dátuma** mezőt. Alapértelmezés szerint az **elmúlt N napban** lehetőség van beállítva, 30 napra kitöltve, így egyetlen kattintással megtalálhatja az elmúlt egy hónapban hozzáadott mindenkit. A napok számát megváltoztathatja, vagy az *egyenlő / utána / előtte* lehetőségre válthat, ha konkrét dátumot szeretne választani. A **Születési dátum** és a **Évforduló** mezők szintén kínálják az **elmúlt N napban** lehetőséget. A Hozzáadás dátuma csak 2026 októbere vége óta létrehozott személyeknél van rögzítve; a korábban hozzáadott személyeknek nincs dátumuk, így ez a szűrő nem találja meg őket.

Az **Egyéni mezők** kategória egyházának [Egyéni mezőit](../settings/custom-fields.md) sorolja fel, vagyis azokat a mezőket, amelyeket a Beállításokban saját adatainak nyilvántartására definiált (például egy háttérellenőrzés lejárati dátuma). Az operátorok az egyes mezők típusához igazodnak: a szövegmezők a *tartalmazza / egyenlő / ezzel kezdődik / ezzel végződik* operátorokat, a számmezők az összehasonlító operátorokat, a dátummezők az *egyenlő / utána / előtte* operátorokat támogatják, az Igen/Nem és a feleletválasztós mezőknél pedig értéket választhat. Bármely mező, amelyre itt szűrhet, mentheti élő [Listaként](./lists.md).

## Keresések mentése listaként

Egy keresés futtatása után a Személyek oldal fejlécében megjelenik a **Mentés listaként** gomb. Kattintson rá, hogy a jelenlegi lekérdezést névvel és opcionálisan kategóriával mentse, így a jövőbeli munkamenetekben azonnal újratöltheti. Részletekért lásd a [Mentett listák](./lists.md) oldalt.
