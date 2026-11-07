---
title: "Telephelyek"
---

# Telephelyek

<div class="article-intro">

Ha egyháza egynél több helyszínen tartja alkalmait, a **Telephelyek** segítségével nyomon követheti, hogy az egyes személyek és csoportok melyik helyszínhez tartoznak. A beállítás után a telephelyek megjelennek a személyi profilokon, a jelenléti beállításokban és a Demográfiai irányítópulton is. Több helyszínű egyházak a B1 Admin egész területén szűrhetnek, kereshetnek és jelentést készíthetnek telephely szerint.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A telephelyek kezeléséhez az **Egyházi beállítások szerkesztése** jogosultság szükséges. Lásd: [Szerepkörök és jogosultságok](./roles-permissions.md).

</div>

## Telephely-beállítások megnyitása

A B1 Adminban nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősávot), válassza a **Beállítások > Beállítások** menüpontot, majd a bal oldali listában kattintson a **Telephelyek** lehetőségre, hogy a **Telephelyek** szakaszhoz görgessen. A **/settings/campuses** címen közvetlenül is megnyithatja. Megjelenik az összes beállított telephely listája a nevükkel, helyükkel és időzónájukkal.

## Telephely hozzáadása

1. Kattintson a **Telephely hozzáadása** gombra.
2. Töltse ki a telephely adatait:
   - **Név** *(kötelező)* — a megjelenítendő név, amely a B1 Admin egész területén látszik (például „Főtelephely” vagy „Északi telephely”).
   - **Cím** — a telephely utcai címe (tájékoztató jelleggel jelenik meg; nem azonos az Egyházi beállításokban megadott főcímmel).
   - **Település / Megye / Irányítószám** — a telephely helye.
   - **Időzóna** — a telephely IANA-időzónája (például *America/Chicago*). A telephelyen tartott istentiszteletek [bejelentkezési ütemezései](../attendance/setup.md#setting-a-check-in-schedule) ebben az időzónában nyílnak és záródnak. Ha **Nincs** értékre van állítva, helyette az egyház [időzónája](./church-settings.md#time-zone) lesz használva. Hasznos, ha a telephelyek különböző időzónákban találhatók.
   - **Weboldal** — opcionális URL a telephely saját online megjelenéséhez.
3. Kattintson a **Mentés** gombra.

## Telephely szerkesztése

Kattintson a lista bármely telephely-sorára, hogy megnyissa a szerkesztőjét a jobb oldali panelben. Módosítsa a mezőket, majd kattintson a **Mentés** gombra.

## Telephely törlése

Nyissa meg a telephelyet szerkesztésre, majd kattintson a **Törlés** gombra. A rendszer megerősítést kér. A telephely törlése nem távolítja el a hozzá rendelt személyeket — a telephely mezőjük egyszerűen üres lesz.

## Személyek hozzárendelése telephelyhez

A telephelyek létrehozása után a munkatársak a személy profiljából is hozzárendelhetnek egy személyt telephelyhez:

1. Nyissa meg a személy adatlapját a **Személyek** menüben.
2. Kattintson a **Szerkesztés** gombra.
3. Válassza ki a telephelyet a **Telephely** legördülő menüből.
4. Kattintson a **Mentés** gombra.

A telephelyet a Személyek oldalon csoportosan is frissítheti. Jelöljön ki több személyt, használja a **Tömeges szerkesztés** lehetőséget, és állítsa be a Telephely mezőt mindenkinek egyszerre.

## Szűrés telephely szerint

Miután a telephelyeket beállította, a B1 Admin egész területén szűrhet telephely szerint:

- **Személykeresés** — adjon hozzá Telephely feltételt a speciális keresésben, vagy töltsön be egy [mentett listát](../people/lists.md), amely egy adott telephelyre van korlátozva.
- **Demográfia** — a [Demográfiai irányítópult](../people/demographics.md) Telephely kördiagramot jelenít meg, ha legalább egy személyhez telephely van rendelve.
- **Jelenléti beállítások** — a Jelenlétben minden istentiszteleti időpont egy telephelyhez kapcsolható.

:::tip
Egy helyszínes egyházaknak nem kell telephelyeket beállítaniuk. Minden telephely-funkció opcionális — ha nincs telephely, a telephely-mezők és -diagramok egyszerűen nem jelennek meg.
:::

## Kapcsolódó cikkek

- [Egyházi beállítások](./church-settings.md) — az egyház főcíme és arculata (a telephelyek címeitől függetlenül)
- [Demográfia](../people/demographics.md) — a Telephely szerinti bontást mutató diagram
- [Jelenléti beállítások](../attendance/setup.md) — istentiszteleti időpontok összekapcsolása telephellyel
- [Tömeges szerkesztés](../people/bulk-editing.md) — telephely hozzárendelése több személynek egyszerre
