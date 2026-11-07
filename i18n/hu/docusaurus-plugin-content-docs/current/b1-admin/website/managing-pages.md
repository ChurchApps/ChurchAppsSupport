---
title: "Oldalak kezelése"
description: "Oldalak és navigáció létrehozása, szerkesztése és rendezése a B1 Admin Weboldal-oldalak nézetében: oldalbeállítások, átirányítások és webhelysablonok."
---

# Oldalak kezelése

<div class="article-intro">

A Weboldal oldalai nézet az egyik központi felület, ahol létrehozhatja, szerkesztheti és rendszerezheti a gyülekezete weboldalának összes oldalát. Az oldalak tartalmát és a webhely navigációját is ebben a nézetben kezelheti.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Végezze el a [Kezdeti beállítás](./initial-setup.md) lépéseit a domain és az alapvető webhelybeállítások megadásához
- Készítse elő a tartalmát és a képeit. Először a [Fájlok](./files.md) kezelőben töltse fel a médiafájlokat.

</div>

:::info
Ha a gyülekezetének több weboldala van (például gyülekezeti helyszínenként külön webhely), a Weboldal oldalai nézet tetején lévő webhelyváltóval válthat közöttük. Minden webhelynek saját oldalai, navigációja és [megjelenési](./appearance.md) beállításai vannak.
:::

## Az oldaltípusok megismerése

Az **Oldalak** táblázat a webhely minden oldalát felsorolja **Útvonal** és **Cím** szerint. Kétféle oldal létezik:

- **Automatikusan létrehozott** -- A rendszer által a gyülekezete adatai alapján automatikusan létrehozott oldalak (például a Csoportok oldal, a Igehirdetések oldal vagy az egyes igehirdetésekhez tartozó oldalak a könyvtárában). Ezeken a **Automatikusan létrehozott** jelvény látható, és a tartalmuk az adatok változásával együtt frissül.
- **Egyéni** -- Az Ön által saját tartalommal és elrendezéssel létrehozott oldalak.

Bármelyik automatikusan létrehozott oldalt egyéni oldallá alakíthatja, ha teljes kontrollt szeretne a tartalma és a kialakítása felett. Kattintson az automatikusan létrehozott oldal melletti **Átalakítás** gombra, majd erősítse meg.

## Oldalak hozzáadása és szerkesztése

1. Kattintson a Weboldal oldalai nézet jobb felső sarkában lévő **Oldal hozzáadása** gombra.
2. Válasszon oldaltípust (üres vagy sablon), és adjon neki nevet.
3. Kattintson bármelyik oldal melletti **Tartalom szerkesztése** gombra, hogy megnyissa az [oldalszerkesztőt](./page-editor.md), ahol szakaszokat, szöveget, képeket és más elemeket adhat hozzá.
4. Kattintson az oldal melletti **Oldalbeállítások** gombra az oldal címének, URL-útvonalának és egyéb metaadatainak módosításához.
5. Kattintson az oldal útvonalára az **Útvonal** oszlopban, hogy az élő oldal új lapon nyíljon meg, és pontosan láthassa, hogyan fog megjelenni a látogatók számára.

:::tip
A kezdőlap URL-útvonalát állítsa csak `/`-re. Az összes többi oldalhoz válasszon leíró útvonalat, például `/about` vagy `/contact`.
:::

### Oldalbeállítások

Bármelyik oldalon nyissa meg az **Oldalbeállításokat**, és állítsa be:

- **Cím és URL-útvonal** -- Az oldal neve és címe a webhelyen.
- **Láthatóság** -- Adja meg, ki láthatja az oldalt: mindenki, csak a tagok, csak a munkatársak vagy meghatározott csoportok tagjai. Így külön jelszó nélkül is gyorsan korlátozhatja egy privát oldal (például egy munkatársi forrásoldal) elérését.
- **Meta-leírás** -- Rövid összefoglaló, amely a keresőmotorok találatai és a közösségi médiás hivatkozások előnézete között jelenik meg.
- **Átirányítások** -- Egy régi URL-útvonalat erre az oldalra irányíthat, így a megszűnt oldalakra mutató hivatkozások és könyvjelzők továbbra is működnek.

## A navigáció kezelése

A Weboldal oldalai nézet jobb oldalán található **Fő navigáció** panel a navigációs hivatkozásokat jeleníti meg. Ezek a hivatkozások határozzák meg, milyen menü látszik a látogatók számára a weboldalon.

1. Kattintson a **Hozzáadás** gombra új navigációs hivatkozás létrehozásához. Megadhatja a webhely bármelyik oldalát vagy egy külső URL-t célnak.
2. A hivatkozások sorrendjének módosításához húzza őket a kívánt helyre. Hivatkozásokat egy szülőelem alá is beágyazhat, így legördülő menüket hozhat létre.
3. Bármelyik hivatkozásra kattintva megnyithatja a **Hivatkozás beállításai** részt, ahol módosíthatja a szövegét, az URL-jét vagy a szülőoldalát.
4. Ha el szeretne távolítani egy hivatkozást a navigációból, nyissa meg a **Hivatkozás beállításait**, majd kattintson a **Törlés** gombra.

:::info
A navigációs hivatkozás eltávolítása nem törli magát az oldalt. Az oldal továbbra is létezik, és közvetlenül az URL-jén keresztül érhető el -- csak a menüben nem jelenik meg.
:::

## Webhely-szintű kapcsolók

A **Fő navigáció** panelen a hivatkozások alatt két kapcsoló található, amelyek az egész gyülekezeti weboldalra vonatkoznak:

- **Bejelentkezés megjelenítése** -- Bejelentkezés gombot jelenít meg a weboldal navigációs sávjában.
- **Nyilvános weboldal letiltása** -- Kikapcsolja a nyilvános weboldalát. Akkor használja, ha a gyülekezete a B1-et csak a tagi portálhoz, az adakozáshoz és a regisztrációkhoz használja, a fő weboldalát pedig máshol tartja.

### Mit csinál a nyilvános weboldal letiltása

Ha a **Nyilvános weboldal letiltása** be van kapcsolva:

- Minden nyilvános oldal, beleértve a kezdőlapot és az egyéni oldalakat is, a be nem jelentkezett látogatókat a bejelentkezési képernyőre irányítja. Bejelentkezés után visszakerülnek ahhoz az oldalhoz, amelyet kértek.
- A bejelentkezett tagok a szokásos módon látják a teljes weboldalt, beleértve a navigációt és a beépített **Automatikusan létrehozott** oldalakat (például a Csoportokat és az Igehirdetéseket). Az automatikusan létrehozott oldalak már nem jelennek meg az Oldalak táblázatában.
- A keresőmotorok arra kapnak utasítást, hogy ne indexeljék a webhelyet. Az oldaltérkép üres, a `robots.txt` pedig minden feltérképezést letilt.

Az alábbi hivatkozások továbbra is működnek, így a tagok és a vendégek is elérhetik őket:

- Bejelentkezés és kijelentkezés
- A tagi portál (mindaz, ami a `/mobile` alatt található)
- [Eseményregisztrációs](../guides/event-registration.md) hivatkozások és vendégregisztráció

Amíg a nyilvános weboldal ki van kapcsolva, a kapcsoló alatt figyelmeztetés jelenik meg. Az oldalai visszaállításához kapcsolja vissza a kapcsolót. A webhely letiltása alatt semmi sem törlődik.

:::info
Ez a beállítás a teljes gyülekezetre vonatkozik. Ha több webhelye van, mindegyiket letiltja, nem csak azt, amelyik a webhelyváltóban ki van jelölve.
:::

## Tippek a webhely rendszerezéséhez

- A felső szintű navigációt öt-hat elemre korlátozza, hogy a látogatók gyorsan megtalálhassák, amit keresnek.
- A kapcsolódó almenüpontokhoz használjon beágyazott hivatkozásokat (például egy „Rólunk” legördülő menü alatt „Csapatunk”, „Hitvallásunk” és „Történetünk” oldalakkal).
- Ellenőrizze a navigációt telefonon is, hogy kisebb képernyőkön is jól működjön.
- Adjon az oldalaknak világos, leíró neveket, amelyek segítenek a látogatóknak megérteni, mit találnak rajtuk.

:::tip
Az oldalaihoz [űrlapokat](../forms/creating-forms.md) is hozzáadhat, hogy regisztrációkat, imakéréseket vagy egyéb információkat gyűjtsön a látogatóktól.
:::

## Indítás webhelysablonból

Ha a webhelyét az alapoktól építi, oldalanként létrehozni helyett használhat **Webhelysablont** is. A webhelysablon előre elkészített oldalakat hoz létre -- kezdőlap, rólunk, kapcsolat, adakozás és további oldalak -- helyőrző tartalommal és már bekötött navigációs hivatkozásokkal.

1. Az Oldalak képernyőn kattintson az **Indítás sablonból** gombra (az **Oldal hozzáadása** gomb mellett).
2. Tekintse át az elérhető sablonokat, és kattintson egyre, hogy megnézze az oldalszerkezetét.
3. Ha talált egyet, amely tetszik, kattintson a **Sablon alkalmazása** gombra.
4. A még nem létező oldalak létrejönnek, és hozzáadódnak a navigációhoz. A meglévő oldalak változatlanok maradnak.

A sablon alkalmazása után nyissa meg az egyes oldalakat az [oldalszerkesztőben](./page-editor.md), és cserélje le a helyőrző szöveget és képeket a gyülekezete valódi tartalmára.

:::info
A webhelysablonok oldalszerkezetet és navigációt hoznak létre. Nem írják felül a webhely színsémáját vagy betűtípusait -- ezeket a [Megjelenés](./appearance.md) szabályozza.
:::

## Képnézegető (lightbox)

Amikor a látogatók a weboldalon egy képre kattintanak, az a teljes képernyős lightbox rétegben nyílik meg. Így a képeket az oldal elhagyása nélkül, nagyobb méretben nézhetik meg. Nincs szükség beállításra -- a lightbox automatikusan engedélyezve van az oldaltartalomban lévő képekhez.

## Következő lépések

- [Kezdeti beállítás](./initial-setup.md) -- Az első beállítás lépései
- [Az oldalszerkesztő használata](./page-editor.md) -- Oldaltartalmak összeállítása és formázása
- [Megjelenés](./appearance.md) -- A webhely vizuális témájának testreszabása
- [Fájlok](./files.md) -- Médiafájlok feltöltése és kezelése az oldalakhoz
