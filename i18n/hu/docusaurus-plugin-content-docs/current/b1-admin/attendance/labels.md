---
title: "Check-In címkeszerkesztő"
description: "A bejelentkezéskor nyomtatott névcímke- és átvételi szelvény-sablonok testreszabása a B1 Admin-ban: mezők, elhelyezés, születésnap- és megjegyzés-feltételek."
---

# Check-In címkeszerkesztő

<div class="article-intro">

A címkeszerkesztővel létrehozhatja és testreszabhatja azokat a névkártya- és átvételi cédulasablonokat, amelyek akkor nyomtatódnak ki, amikor a családok bejelentkeztetik a gyermekeiket. Pontosan szabályozhatja, hogy melyik információ jelenjen meg az egyes címkéken, hol helyezkedjen el, és milyen legyen a megjelenése.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be a [Jelenlétet](./setup.md), és konfiguráljon legalább egy istentiszteleti időpontot, amelyhez engedélyezve van a bejelentkezés
- Állítsa be a [Bejelentkezést](./check-in.md), hogy a címkék nyomtatódjanak
- Szüksége van adminisztrátori hozzáférésre a Jelenlét részhez

</div>

## A címkeszerkesztő megnyitása

A B1 Adminban nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki a **Mobil** menüpontot, majd kattintson a **B1 CheckIn** elemre. Ezután kattintson a Bejelentkezési címkék kártyán lévő **Címkék tervezése** gombra. Megjelenik a mentett címkesablonok listája, típus szerint elkülönítve: **Névkártya** és **Átvételi cédula**.

## Címketípusok

- **Névkártya** — kinyomtatva a gyermekhez kerül. Általában tartalmazza a gyermek nevét, a foglalkozást vagy csoportot és a biztonsági kódot.
- **Átvételi cédula** — a szülőnek vagy gondviselőnek adják. Általában tartalmazza a biztonsági kódot és a bejelentkeztetett gyermekek listáját.

A B1 alapértelmezett névkártyával és alapértelmezett átvételi cédula-sablonnal indul, amelyek szabványos 3,5 × 1,1 hüvelykes hőcímkékhez igazodnak.

## Címkesablon létrehozása

1. Kattintson a **Hozzáadás** gombra, és válasszon kiindulópontot a menüből: **Névkártya 3,5" x 1,1"**, **Átvételi cédula 3,5" x 1,1"** vagy **Üres**.
2. Az új sablon megnyílik a címkeszerkesztőben.

### Címkeszerkesztő

A szerkesztő a beállított méretnek megfelelően méretezett előnézetet mutat a címkéről. A bal oldali panelen a következőket állíthatja be:

- **Név** — a sablon neve (csak az Ön tájékoztatására)
- **Címketípus** — Névkártya vagy Átvételi cédula
- **Szélesség / Magasság** — a címke mérete hüvelykben

### Blokkok hozzáadása

A címke blokkokból épül fel — a címke vásznán elhelyezett egyes tartalmi elemekből. Kattintson a **Blokk hozzáadása** gombra egy új blokk beszúrásához, majd válassza ki a típusát:

- **Mező** — nyomtatáskor egy adatértéket jelenít meg:
  - `person.displayName` — a személy teljes neve
  - `sessions` — az istentisztelet vagy foglalkozás, amelyre bejelentkezett
  - `securityCode` — a véletlenszerűen generált átvételi biztonsági kód
  - `children` — a gyermekek listája (átvételi cédulákhoz)
  - `person.nametagNotes` — a személy adatlapján szereplő különleges megjegyzések
  - `person.isBirthdayWeek` — igaz, ha a személy születésnapja (hónap és nap) a bejelentkezés dátumától számítva legfeljebb 3 nappal korábban vagy később van
  - `campus` — a campus neve
- **Szöveg** — kézzel beírt statikus szöveg (címsorokhoz, feliratokhoz vagy utasításokhoz)
- **Vonalkód** — a biztonsági kódot kódoló vonalkód

### Blokkok elhelyezése

Minden blokkhoz tartozik egy **X**, **Y**, **Szélesség** és **Magasság** mező, amelyek a címkevászon százalékában vannak megadva (0–100). Ezekkel pontosan pozicionálhatja a tartalmat. Emellett a következőket is beállíthatja:

- **Betűméret** — a szöveg mérete pontban
- **Félkövér** — a félkövér szöveg be- és kikapcsolása
- **Igazítás** — a szöveg balra, középre vagy jobbra igazítása
- **Feltétel** — a blokk elrejtése, ha egy mező üres (például a nametagNotes csak akkor jelenjen meg, ha van értéke). Ez a `person.isBirthdayWeek` mezővel is működik, így születésnapi grafika vagy szöveg csak azoknak a gyermekek névkártyáin jelenik meg, akiknek a születésnapja néhány napon belül van a bejelentkezéshez képest.

### Mentés

A sablon mentéséhez kattintson a **Mentés** gombra. A frissített sablont a következő alkalommal használja a B1 Checkin, amikor címkéket nyomtat.

## Sablonok sorrendjének módosítása

Ha több névkártya- vagy átvételi cédula-sablonja van, a B1 Checkin alapértelmezés szerint a lista első sablonját használja. A sablonok átrendezéséhez húzza őket a kívánt helyre.

## Sablon törlése

Kattintson bármelyik sablonsor törlés ikonjára, majd erősítse meg a műveletet. Egy adott típus utolsó sablonjának törlése visszaállítja az alapértelmezett beépített sablont.

:::tip
Egy sablon szerkesztése után készítsen próbanyomtatást, hogy a következő istentisztelet előtt ellenőrizni tudja, helyes-e az elrendezés.
:::

## Kapcsolódó cikkek

- [Check-In beállítása](./setup.md) — istentiszteletek és csoportok beállítása a bejelentkezéshez
- [A bejelentkezés befejezése](./check-in.md) — a családok bejelentkezési folyamata
- [B1 Checkin első lépések](../../b1-checkin/getting-started/index.md) — a Checkin kioszk alkalmazás
