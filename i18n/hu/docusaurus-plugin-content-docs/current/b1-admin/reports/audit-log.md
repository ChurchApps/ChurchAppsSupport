---
title: "Auditnapló"
---

# Auditnapló

<div class="article-intro">

Az auditnapló a church management rendszerben történt összes jelentős műveletet és módosítást nyilvántartja. Segítségével áttekintheti a bejelentkezési tevékenységet, nyomon követheti, ki módosított személyi adatokat, figyelemmel kísérheti a jogosultság-változásokat, és fenntarthatja a felelősségi láncot a csapatában.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- B1 Admin-fiók szerveradminisztrátori jogosultsággal
- Lépjen a **Beállítások** menübe az Auditnapló megtalálásához

</div>

## Az auditnapló megtekintése

1. Nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a B1 Admin bal felső sarkában), és bontsa ki a **Beállítások** menüpontot.
2. Kattintson az **Auditnapló** lehetőségre.
3. A napló legutóbbi bejegyzéseket jeleníti meg táblázatban, a következő oszlopokkal:
   - **Dátum** -- A művelet időpontja.
   - **Kategória** -- A művelet típusa (színkóddal, a gyors áttekintés érdekében).
   - **Művelet** -- Az elvégzett tevékenység (pl. create, update, delete, login_success).
   - **Entitás** -- Az érintett rekord típusa és azonosítója.
   - **IP-cím** -- A műveletet végző felhasználó IP-címe.
   - **Részletek** -- Az elvégzett konkrét módosítások összefoglalása.

## A napló szűrése

Az oldal tetején található szűrőkkel szűkítheti az eredményeket:

- **Kategória** -- Szűrés művelettípus szerint:
  - **Összes kategória** -- Minden bejegyzés megjelenítése.
  - **Bejelentkezés** -- Sikeres és sikertelen bejelentkezések.
  - **Személyek** -- Személyi rekordok létrehozása, módosítása vagy törlése.
  - **Jogosultságok** -- Jogosultságok megadása és visszavonása.
  - **Adományok** -- Adományrekordok módosításai.
  - **Csoportok** -- Csoportkezelési műveletek.
  - **Űrlapok** -- Űrlapbeküldési tevékenység.
  - **Beállítások** -- Konfigurációs módosítások.
- **Kezdő dátum** -- Ettől a dátumtól kezdve megjelenő bejegyzések.
- **Záró dátum** -- Eddig a dátumig megjelenő bejegyzések.

A szűrők beállítása után kattintson a **Keresés** gombra az eredmények frissítéséhez.

## A kategóriák értelmezése

Minden kategória színkóddal jelölt, a gyors azonosítás érdekében:

- **Bejelentkezés** -- Kék címke. A sikeres és sikertelen bejelentkezési kísérleteket követi nyomon.
- **Személyek** -- Lila címke. A személyi rekordok létrehozását, módosítását és törlését követi nyomon.
- **Jogosultságok** -- Piros címke. Azt követi nyomon, mikor adnak meg vagy vonnak vissza hozzáférési jogokat.
- **Adományok** -- Zöld címke. Az adományrekordok módosításait követi nyomon.
- **Csoportok** -- Szürke címke. A csoportkezelési műveleteket követi nyomon.
- **Űrlapok** -- Narancssárga címke. Az űrlapbeküldési tevékenységet követi nyomon.
- **Beállítások** -- Sárga címke. A konfigurációs módosításokat követi nyomon.

## A napló exportálása

Amikor naplóbejegyzések láthatók, megjelenik a **CSV letöltése** gomb. Kattintson rá, hogy a jelenleg szűrt eredményeket táblázatkezelőbe exportálja, offline áttekintéshez vagy nyilvántartási célra.

## Lapozás

A táblázat alján található lapozóvezérlőkkel navigálhat az eredmények között. Oldalanként 25, 50 vagy 100 bejegyzést jeleníthet meg.

:::info
Az auditnapló bejegyzéseit automatikusan egy évig őrizzük meg. A 365 napnál régebbi bejegyzések eltávolításra kerülnek, hogy a rendszer gyors maradjon.
:::

:::tip
Rendszeresen tekintse át az auditnaplót, különösen új csapattagok betanítása után vagy jelentős konfigurációs változtatások előtt. Segít korán felismerni a váratlan tevékenységet.
:::

## Kapcsolódó cikkek

- [Szerepkörök és jogosultságok](../settings/roles-permissions) -- Annak kezelése, hogy ki mihez férhet hozzá
- [Adatbiztonság](../settings/data-security) -- Az adatai védelmének megismerése
- [Jelentések áttekintése](./index.md) -- Az összes elérhető jelentés megtekintése
