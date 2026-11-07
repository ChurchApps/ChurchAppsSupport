---
title: "Egyéni mezők"
description: "Definiáljon egyéni mezőket a B1 Adminban további személyi adatokhoz, pl. háttérellenőrzés lejárata vagy pólóméret, majd keressen és szűrjön rájuk."
---

# Egyéni mezők

<div class="article-intro">

Az **egyéni mezőkkel** saját adatokat követhet nyomon minden személyi rekordon, olyan információkat is, amelyekhez a B1-ben nincs beépített mező, például háttérellenőrzés lejárati dátumát, pólóméretet vagy keresztségi oktatás állapotát. A mezőt egyszer a Beállításokban határozza meg, majd minden személy profiljában kitölti az értéket, és ezek alapján kereshet vagy listákat készíthet. Ez váltja fel azt a korábbi megoldást, amikor csak egyetlen egyéni adat tárolásához külön Személyi űrlapot kellett létrehozni.

</div>

## Oktatóvideó

<YouTube id="yUfDEbp2HQ4" title="Egyéni mezők, tömeges szerkesztés és exportálás a B1-ben" next="Csoportok létrehozása és tagok hozzáadása a B1-ben" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A mezők meghatározásához és az értékek kitöltéséhez **Személyek** szerkesztési jogosultságra van szüksége, valamint hozzáférésre a **Beállítások** részhez. A Személyek megtekintési jogosultsággal rendelkezők láthatják az értékeket. Lásd: [Szerepkörök és jogosultságok](./roles-permissions.md).
- A kezdés előtt döntse el, mit szeretne nyomon követni, és melyik típus illik hozzá a legjobban (szöveg, szám, dátum, igen/nem válasz vagy választólista).

</div>

## Az egyéni mezők megnyitása

A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban található keresősáv), válassza a **Beállítások > Beállítások** pontot, majd a bal oldali listában kattintson az **Egyéni mezők** elemre, hogy az **Egyéni mezők** szakaszhoz jusson. Közvetlenül is eljuthat ide a **/settings/custom-fields** címen. Megjelenik az összes meghatározott mező listája a **Név** és a **Mező típusa** oszlopokkal. Ha még nem hozott létre egyet sem, a panelen ez olvasható: *„Még nem adtak hozzá egyéni mezőt.”*

## Mező hozzáadása

1. Kattintson a **Mező hozzáadása** gombra.
2. A jobb oldalon megnyíló szerkesztőben adja meg a **Nevet**. Ez a címke, amelyet a munkatársak a személyi profilokon és a keresésben látnak (például *Háttérellenőrzés lejár*).
3. Válassza ki a **Mező típusát**:
   - **Szövegdoboz**: szabad formájú rövid szöveg.
   - **Egész szám**: tizedesjegy nélküli számok (például darabszám).
   - **Tizedes szám**: tizedesjegyet is tartalmazhat.
   - **Dátum**: naptári dátum.
   - **Igen/Nem**: egyszerű igen vagy nem válasz.
   - **Választólista**: legördülő lista. Ha ezt a típust választja, megjelenik a **választásszerkesztő**, ahol hozzáadhatja az egyes lehetőségeket, amelyek közül az emberek választhatnak.
4. Kattintson a **Mentés** gombra.

A mező ezután minden személy profilján elérhető.

:::info
A mezőtípusok ugyanazok, mint a [űrlapkérdéseknél](../forms/creating-forms.md), így az értékek a B1-ben egységesen viselkednek.
:::

## Mező szerkesztése

Kattintson a lista bármelyik mezősorára, hogy újra megnyissa a szerkesztőben. Módosítsa a nevet, a típust vagy a választásokat, majd kattintson a **Mentés** gombra.

:::warning
Ha olyan mező **Mező típusát** módosítja, amelyhez már tartoznak értékek (például Szövegdobozról Dátumra), a korábban megadott értékek olyan formátumban maradhatnak, amely már nem felel meg az új típusnak. Ha a munkatársak már elkezdték kitölteni a mezőt, óvatosan változtassa a típusokat.
:::

## Mező törlése

Nyissa meg a mezőt szerkesztésre, majd kattintson a **Törlés** gombra. Megerősítést kér: *„Biztosan törölni szeretné ezt az egyéni mezőt? A tárolt értékei is törlődnek.”* A mező törlése véglegesen eltávolítja azt **és az összes hozzá tartozó értéket** minden személynél. Ez nem vonható vissza.

## Értékek kitöltése egy személynél

Amint legalább egy egyéni mező létezik, az értékek közvetlenül a beépített adatok mellett jelennek meg minden személy rekordjában. A profil bal oldalán a személy elérhetőségi adatai mellett látja őket, szerkesztésük pedig ugyanazon az űrlapon történik, mint a személy többi adatáé. Az első mező meghatározásáig semmi többlet nem jelenik meg.

1. Nyissa meg egy személy rekordját a **Személyek** menüpontban.
2. Kattintson a profil bal oldalán, a személy elérhetőségi adatai alatt található **Szerkesztés** gombra.
3. Görgessen a szerkesztőűrlap alján lévő **Egyéni mezők** részhez, és töltse ki az egyes mezők értékét. Minden mező a típusának megfelelő beviteli elemet mutatja: dátum mezőknél dátumválasztót, igen/nem mezőknél legördülő menüt, választólistás mezőknél listát, és így tovább.
4. Kattintson a **Mentés** gombra. Az egyéni mezők értékei a személy többi adatával együtt kerülnek mentésre.

A profilra visszatérve minden olyan mező, amelynek van értéke, a személy elérhetőségi adatai alatt *Mező neve: érték* formában jelenik meg. Az igen/nem válaszok *Igen* vagy *Nem* formában látszanak, a választólistás mezőknél pedig a választott lehetőség címkéje jelenik meg. Az üresen hagyott mezők egyszerűen elrejtésre kerülnek. Egy érték eltávolításához szerkessze a személyt, ürítse ki a mezőt, majd mentsen. Az üres érték nem üresként tárolódik, hanem törlődik a rekordból.

:::tip
A klasszikus felhasználási eset az önkéntesek biztonsága: hozzon létre egy *Háttérellenőrzés lejár* nevű **Dátum** mezőt, rögzítse minden önkéntes dátumát, majd készítsen egy [mentett listát](../people/lists.md), amely megjelöli azokat, akiknek a dátuma már lejárt.
:::

## Keresés és listák készítése egyéni mezők alapján

Az egyéni mezők teljes mértékben kereshetők:

1. A **Személyek** oldalon nyissa meg a [Speciális keresést](../people/searching-people.md).
2. Bontsa ki az **Egyéni mezők** kategóriát.
3. Jelölje be a szűrni kívánt mezőt, válasszon operátort, majd adjon meg egy értéket. A felkínált operátorok a mező típusához igazodnak:
   - **Szövegdoboz**: tartalmazza, egyenlő, ezzel kezdődik, ezzel végződik.
   - **Egész szám / Tizedes szám**: egyenlő, nagyobb, nagyobb vagy egyenlő, kisebb, kisebb vagy egyenlő.
   - **Dátum**: egyenlő, későbbi (nagyobb), korábbi (kisebb).
   - **Igen/Nem**: egyenlő Igennel vagy Nemmel.
   - **Választólista**: egyenlő vagy tartalmazza a választások egyikét.

Bármely egyéni mezős keresést elmenthet [listaként](../people/lists.md). A listák élő lekérdezések, így a *Háttérellenőrzés lejár: a mai nap előtt* feltételre épített lista minden megnyitáskor újra ellenőrzi az összes személyt. Kézi karbantartásra nincs szükség.

## Egyéni mező megjelenítése oszlopként

Ha egy mező értékeit mindenkinél egyszerre szeretné látni, adja hozzá oszlopként a **Személyek** oldalon. Állítsa a **Megjelenítés** beállítást **Táblázat** értékre, kattintson az oldalfejlécben található **Oszlopok kiválasztása** ikonra, váltson az **Egyéni** fülre, és jelölje be a mezőt. Minden személy értéke külön oszlopban jelenik meg a beépített oszlopok mellett. Lásd: [Egyéni mezők megjelenítése oszlopokként](../people/searching-people.md#showing-custom-fields-as-columns).

## Mi történik összevonáskor

Amikor [két személyi rekordot összevon](../people/adding-people.md), az egyéni mezők értékei automatikusan átkerülnek. A megtartott személy megőrzi saját értékeit. Minden olyan mezőnél, ahol csak az eltávolított személynek volt értéke, az érték átmásolódik, így semmi sem vész el.

## Kapcsolódó cikkek

- [Személyek keresése](../people/searching-people.md): speciális keresés, beleértve az Egyéni mezők kategóriát és az egyéni mezők oszlopként való megjelenítését
- [Mentett listák](../people/lists.md): egyéni mezős keresés mentése és élő újrafuttatása
- [Szerepkörök és jogosultságok](./roles-permissions.md): kik határozhatnak meg mezőket és szerkeszthetnek értékeket
- [Űrlapok létrehozása](../forms/creating-forms.md): többkérdéses adatgyűjtéshez, ahol egy teljes űrlap jobban megfelel, mint az egyedi mezők
