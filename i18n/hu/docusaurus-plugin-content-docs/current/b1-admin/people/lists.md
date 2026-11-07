---
title: "Mentett listák"
description: "Személyi keresés mentése a B1 Admin-ban nevesített listaként, betöltés egy kattintással. A listák élők: az új illeszkedő tagok automatikusan megjelennek."
---

# Mentett listák

<div class="article-intro">

A **mentett listák** segítségével egy keresési feltételt névvel tárolhat, és bármikor egyetlen kattintással újra futtathatja. Építsen fel egyszer egy listát — például „Aktív tagok a North kampuszon”, „Látogatók az elmúlt 90 napban” vagy bármilyen összetett szűrő —, és az a Személyek oldal tetején marad, így soha nem kell újra felépítenie a keresést.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Futtasson legalább egy keresést a Személyek részben, hogy legyen mit menteni. Lásd: [Személyek keresése](./searching-people.md) vagy [AI-keresés](./ai-search.md).

</div>

## Keresés mentése listaként

1. Futtasson keresést a **Személyek** oldalon — gyorskeresést, AI-keresést vagy összetett szűrős keresést.
2. Amikor megjelennek az eredmények, a Személyek oldal fejlécében megjelenik a **Mentés listaként** gomb.
3. Kattintson a **Mentés listaként** gombra.
4. Adja meg a **Lista neve** mezőt (kötelező).
5. Opcionálisan adjon meg egy **Kategóriát**, hogy a kapcsolódó listákat csoportosítsa (például „Megkeresés” vagy „Tagság”).
6. A **Ki láthatja ezt a listát** résznél válassza a **Minden munkatárs** vagy a **Csak nekem** lehetőséget.
7. Kattintson a **Mentés** gombra.

A lista most mentésre került, és megjelenik gombként a Személyek oldal tetején lévő mentett listasorban, a **Mindenki** mellett. A **Csak nekem** jelöléssel mentett listák mellett egy kis lakat ikon látható.

:::info
A **Minden munkatárs** értékre állított listák az egész gyülekezetben megoszthatók — bárki, akinek van hozzáférése a Személyekhez, láthatja és betöltheti őket. Csak a megfelelő jogosultsággal rendelkező munkatársak módosíthatják vagy törölhetik a listákat.
:::

## Mentett lista betöltése

A Személyek oldal tetején kattintson bármelyik lista nevére. A keresés azonnal újrafut a tárolt feltétellel, és frissíti az eredményeket. A teljes névjegyzékhez való visszatéréshez kattintson a **Mindenki** gombra.

A listák kategóriák szerint vannak csoportosítva (ha adott meg kategóriát), a kategória nélküli listák pedig a végén jelennek meg.

:::tip
A listák **élő lekérdezések**, nem pillanatfelvételek. A lista minden betöltésekor a keresés friss adatokkal fut le a jelenlegi adatai alapján, így azok a személyek is megjelennek, akik időközben megfelelnek a feltételeknek.
:::

## Listák átnevezése és törlése

A kezelési jogosultsággal rendelkező munkatársak bármelyik listát átnevezhetik vagy törölhetik a Személyek oldalon. Először töltse be a listát a kattintással — ekkor a neve mellett két ikon jelenik meg:

- Kattintson a **Lista beállításai** (fogaskerék) ikonra a lista átnevezéséhez, kategóriájának, megosztásának és egyéb beállításainak módosításához.
- Kattintson a **Törlés** (kuka) ikonra a lista törléséhez (megerősítést kérünk).

## Felhasználási példák

| Forgatókönyv | A lista összeállítása |
|---|---|
| Összes látogató | Összetett keresés: Tagsági állapot = Látogató |
| Tagok egy adott kampuszon | Összetett keresés: Kampusz = [az Ön kampusza] |
| Személyek e-mail-cím nélkül | Összetett keresés: E-mail üres |
| Önkéntesek lejárt erkölcsi bizonyítvánnyal | Összetett keresés: [Egyéni mező](../settings/custom-fields.md) „Erkölcsi bizonyítvány lejár” dátuma a mai nap előtt van |
| Egy AI-kérdés eredményei | Tegyen fel egy kérdést az AI-keresésben, majd mentse el |

## Kapcsolódó cikkek

- [Személyek keresése](./searching-people.md) — gyorskeresés és oszlopok testreszabása
- [AI-keresés](./ai-search.md) — természetes nyelvű lekérdezések, amelyeket listaként menthet
- [Egyéni mezők](../settings/custom-fields.md) — saját személymezők definiálása, majd szűrés és listamentés ezek alapján
- [Demográfia](./demographics.md) — demográfiai diagram átalakítása Személyek-szűrővé, majd mentés listaként
- [Tömeges szerkesztés](./bulk-editing.md) — lista betöltése után az összes tag egyszerre történő frissítése
