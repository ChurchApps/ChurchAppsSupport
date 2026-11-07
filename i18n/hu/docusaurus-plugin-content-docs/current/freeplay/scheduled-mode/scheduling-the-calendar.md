---
title: "A naptár ütemezése"
description: "Heti vagy egyszeri ütemezés a FreePlay Admin Naptárában: lejátszólisták, tervek vagy szolgáltatómappák képernyőcsoportokra, alapértelmezett ciklusokkal."
---

# A naptár ütemezése

<div class="article-intro">

A FreePlay Adminban található **Naptár** oldal szabályozza, hogy az egyes képernyőcsoportok mit játszanak le és mikor. Ütemezzen be egy lejátszási listát, egy istentiszteleti tervet vagy egy szolgáltatói mappát, és állítsa be, hogy hetente ismétlődjön, vagy csak egyszer játsszon le. Ha nincs semmi ütemezve, a csoport alapértelmezett ciklusa játszódik le.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Hozzon létre legalább egy képernyőcsoportot. Lásd: [Képernyők és csoportok kezelése](./managing-screens.md#screen-groups)
- [Készítsen egy lejátszási listát](./building-playlists.md), vagy legyen beállítva egy tervtípus a B1 Adminban

</div>

## A naptár olvasása

1. Lépjen a **Naptár** oldalra.
2. Válasszon egy képernyőcsoportot a lap tetején lévő fülek közül. Minden fül megmutatja, hány ütemezése van a csoportnak.
3. A heti nézet hétfőtől vasárnapig tart, reggel 6 órától este 10 óráig. Egy piros vonal jelöli az aktuális időpontot.
4. A nyilakkal léphet az előző vagy a következő hétre, vagy a **Ma** gombra kattintva térhet vissza erre a hétre.

Az oldal alcíme mutatja a naptárban használt időzónát. Az ütemezések az egyházának időzónáját követik, amelyet a B1 Adminban, a [Gyülekezeti információk](../../b1-admin/settings/church-settings.md#time-zone) alatt állíthat be. Ha az egyházához nincs időzóna beállítva, a FreePlay a gyülekezeti helyszínének időzónáját használja. A naptár és a TV-k ugyanazt az időzónát használják, így a naptárban reggel 9:00-ra helyezett blokk a képernyőn is 9:00-kor fut le, még akkor is, ha a számítógépe más időzónára van állítva.

Az ütemezések típus szerint színkódoltak. A jelmagyarázat elmagyarázza a színeket:

- **Alapértelmezett ciklus** - Csíkozott háttér, amely minden mögött látszik, ha a csoportnak van alapértelmezett ciklusa
- **Lejátszási lista**
- **Istentiszteleti terv**
- **Szolgáltatói mappa**

Minden blokk megmutatja a nevét, a magasabb blokkok pedig az időpontokat is, azt, hogy ismétlődik-e (**hetente** vagy **egyszer**), valamint azt, mi történik, ha a tartalom hamarabb véget ér.

## Az alapértelmezett ciklus beállítása

Az alapértelmezett ciklus a csoport képernyőin játszódik le, valahányszor nincs semmi ütemezve.

1. A **Naptár** oldalon kattintson a fejlécben lévő **Alapértelmezett ciklus…** gombra. Ha már be van állítva alapértelmezett ciklus, a gomb az **Alapértelmezett ciklus:** szöveget mutatja, mögötte a lejátszási lista nevével.
2. Válasszon egy **Lejátszási listát**, vagy válassza a **Nincs — a képernyő elsötétül** lehetőséget.
3. Kattintson a **Mentés** gombra.

## Ütemezés hozzáadása

Új ütemezést háromféleképpen kezdhet el:

- Kattintson a naptár egy üres helyére. Az űrlap a megfelelő nappal és félórás időponttal nyílik meg.
- Kattintson a fejlécben lévő **Ütemezés hozzáadása** gombra.
- Válassza az **Ütemezés hozzáadása** lehetőséget a parancspalettából (**Ctrl+K** vagy **⌘K**).

Ezután töltse ki az űrlapot:

1. **Lejátszás** - Válassza ki, mit játsszon le:
   - **Lejátszási listák** - Bármelyik általa összeállított lejátszási lista
   - **Istentiszteleti tervek** - Egy tervtípus a B1 Adminból, a **(aktuális terv)** megjelöléssel. A képernyő minden héten az adott tervtípushoz tartozó aktuális tervet játssza le, beleértve a Go Curriculum leckéket is (a testre szabottakat is), amelyek a tervtípus szolgálatához kapcsolt Go-bejelentkezést használják
   - **Szolgáltatói mappa…** - Megnyitja a **Válasszon szolgáltatói mappát** ablakot. Böngésszen egy mappához, majd kattintson a **Mappa használata** gombra. Ha később másik mappát szeretne választani, kattintson a **Módosítás** gombra
2. **Ismétlődés** - Válassza ki a hét azon napjait, amelyeken az ütemezés lejátszódik. Ha ehelyett egyetlen dátumra szeretné, kapcsolja be az **Egyszer** opciót, és válassza ki a **Dátumot**.
3. **Kezdés** és **Vége** - Azok az időpontok, amikor az ütemezés elindul és leáll.
4. **Ha korábban véget ér** - Mit tegyen, ha a tartalom a záró időpont előtt kifogy:
   - **Ciklus a záró időpontig** - Az elejéről kezdi újra. Jó hirdetési ciklusokhoz, bejelentésekhez és visszaszámlálókhoz
   - **Tanár üteme szerint** - A diák a tanár távirányítójára várnak. A lecke a záró időpont után is látszik, amíg az utolsó dia meg nem jelenik
   - **Egyszer lejátszás, majd vissza az alapértelmezett ciklusra**
5. Ismétlődő ütemezések esetén állítsa be a **Kezdés** dátumát az első napra. Az **Érvényes eddig** résznél válassza a **Soha** lehetőséget, vagy válassza a **Megadott dátumig** lehetőséget, és adja meg a **Befejezés dátumát**.
6. Kattintson a **Mentés** gombra.

:::info
A **Tanár üteme szerint** lehetőség a korábbi „az utolsó dia megtartása” opciót váltotta fel. A régi opcióval mentett ütemezések most már tanár üteme szerint játszódnak le.
:::

## Ütemezés szerkesztése vagy törlése

1. Kattintson az ütemezés blokkjára a naptárban.
2. Módosítson bármely mezőt, majd kattintson a **Mentés** gombra, vagy kattintson a **Törlés** gombra az ütemezés eltávolításához.

## Átfedő ütemezések

Ha két ütemezés átfedi egymást, az űrlap figyelmeztetést jelenít meg: **Átfedésben van egy másik ütemezéssel. A későbbi kezdésű nyer.** Amíg a későbbi ütemezés fut, a képernyők azt játsszák le. Amikor az véget ér, visszatérnek a korábbi ütemezésre, ha az még fut.

## Hogyan veszik át a képernyők a változásokat

A párosított képernyők letöltik a következő 7 napra ütemezett összes tartalmat, és maguktól ellenőrzik a változásokat. A naptár szerkesztése után nem kell a TV-hez nyúlnia. Hogy lássa, mikor van egy képernyőnek minden szükséges tartalma, ellenőrizze a **Készen eddig** oszlopot a [Képernyők oldalon](./managing-screens.md).

## Kapcsolódó cikkek

- **[Lejátszási listák készítése](./building-playlists.md)** - Az ütemezett lejátszási listák létrehozása
- **[Ütemezett lejátszás a TV-n](./scheduled-playback.md)** - Hogyan működik a tanár üteme szerinti lejátszás és a távirányító a TV-n
- **[Képernyők és csoportok kezelése](./managing-screens.md)** - Csoportok hozzáadása és az egyes képernyők letöltéseinek ellenőrzése
- **[Minden lecke egy részének megtartása](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Egy tervtípus minden ütemezett leckéjét csökkentheti azokra a részekre, amelyeket a terme lejátszik
