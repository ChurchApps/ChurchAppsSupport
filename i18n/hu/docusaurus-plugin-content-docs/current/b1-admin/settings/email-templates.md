---
title: "E-mail sablonok"
description: "E-mail- és SMS-sablonok beállítása a B1 Adminban: személyre szabó mezők, SMS-beállítások és előnézet tömeges kommunikációhoz."
---

# E-mail sablonok

<div class="article-intro">

Az e-mail sablonokkal újrafelhasználható e-mail tartalmakat menthet el, például üdvözlő üzenetet, eseményemlékeztetőt vagy adakozás utáni köszönőlevelet. Így Ön (vagy egy [munkafolyamat](../serving/workflows.md)) egy kattintással elküldheti őket, ahelyett hogy minden alkalommal újra megírná. Ugyanebben a listában vannak a csoportok és személyek SMS-ablakához tartozó szöveges üzenet sablonok is.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van hozzáférésre a B1 Admin Beállítások területéhez.

</div>

## E-mail sablonok elérése

1. A B1 Adminban nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősávot), és bontsa ki a **Beállítások** menüpontot.
2. Kattintson az **E-mail sablonok** gombra.
3. Megjelenik a meglévő sablonok listája a tárgyukkal, kategóriájukkal és az utolsó módosítás dátumával.

## Sablon létrehozása

1. Kattintson az **Új sablon** gombra.
2. Adjon meg egy **Sablon neve** mezőt, amely azonosítja a listában, és válasszon egy **Kategóriát** (Általános, Események, Csoportok, Adakozás, Üdvözlés vagy Szöveg), hogy rendszerezze a sablonokat. Ha szöveges üzenet sablont szeretne készíteni, válassza a **Szöveg** kategóriát (lásd lentebb: [Szöveges sablonok](#text-templates)).
3. Adja meg a **Tárgy** sort.
4. Írja meg a **Törzs** részt a szövegszerkesztővel.
5. Kattintson a **Mentés** gombra.

## Összevonási mezők

Kattintson a tárgy vagy a törzs fölötti összevonási mező gombra, hogy az a kurzor helyére kerüljön. Először kattintson a szövegbe oda, ahová a mezőt szeretné, majd kattintson a gombra. A kurzor a helyén marad, így a beillesztett mező után azonnal folytathatja a gépelést. Ha a törzs gombját úgy nyomja meg, hogy előtte nem kattintott a törzsbe, a mező a törzs végére kerül. Az e-mail küldésekor minden összevonási mező a címzett valódi adataival helyettesítődik:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- A címzett neve
- `{{email}}` -- A címzett e-mail-címe
- `{{churchName}}` -- Az egyháza neve

## Szöveges sablonok

A **Szöveg** kategóriájú sablon egyszerű szöveges üzenet, amely e-mail helyett SMS-küldésre szolgál:

- Nincs tárgya. A szövegszerkesztő helyét egy egyszerű **Szöveges üzenet** mező veszi át, amely legfeljebb 1600 karaktert fogad be.
- A doboz fölötti összevonási mező gombok a kurzor helyére illesztik be a `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` vagy `{{churchName}}` mezőt.
- A szöveges sablonok megjelennek egy [csoport](../groups/group-members.md#texting-group-members) vagy egyetlen személy SMS-ablakának **Sablon betöltése (opcionális)** választójában. Egy sablon kiválasztásakor kitöltődik az üzenet, és az elküldés előtt még szerkeszthető.
- Nem jelennek meg az e-mail sablonválasztókban, beleértve a munkafolyamat **E-mail küldése** műveletét is.

A szöveges üzenetküldéshez csatlakoztatott [SMS-szolgáltató](./church-settings.md#texting) szükséges.

## Sablon előnézete

Kattintson az **Előnézet** gombra, hogy lássa, hogyan fog kinézni a tárgy és a törzs mintaadatokkal kitöltött összevonási mezőkkel, még mentés vagy küldés előtt.

## Sablon használata

A mentett sablonok kiválaszthatók, ha személyeknek vagy csoportnak küld e-mailt, valamint műveletként a [munkafolyamatokban](../serving/workflows.md). Mielőtt az egyháza elküldhetné őket, a ChurchApps csapatának egyszer jóvá kell hagynia a csoportos e-mailezés engedélyezését. Lásd: [Csoportos e-mailezés bekapcsolása az egyházának](../groups/group-members.md#turning-on-group-email-for-your-church).

## Szerkesztés és törlés

Kattintson a sablon melletti **Szerkesztés** ikonra a frissítéshez, vagy a **Törlés** ikonra a végleges eltávolításhoz.

## Következő lépések

- [Munkafolyamatok](../serving/workflows.md) -- Sablon-e-mail automatikus indítása szabályok alapján
