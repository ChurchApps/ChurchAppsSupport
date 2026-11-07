---
title: "Eszköz párosítása"
description: "FreePlay TV párosítása B1 Adminban egy tervtípushoz a képernyőn látható négybetűs kóddal, majd a terv médiájának letöltése Tervmódhoz."
---

# Eszköz párosítása

<div class="article-intro">

A Tervezési mód használatához a TV-t párosítani kell egy tervtípussal a B1 Adminban. A FreePlay rövid párosítókódot jelenít meg a TV-n. Ezt a kódot beírja a B1 Adminban, és kiválasztja a követendő tervtípust. A TV ezután minden héten automatikusan megkapja az adott terv tartalmát.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Telepítse és indítsa el a FreePlayt. Lásd: [Első lépések](../getting-started/index.md)
- Legyen hozzáférése a **B1 Adminhoz** számítógépen vagy telefonon a párosítás elvégzéséhez

</div>

## A párosítókód létrehozása

1. A TV-n nyissa meg a **Beállítások** menüpontot az oldalsáv alján.
2. Válassza a **Párosítás naptárral** lehetőséget.
3. A FreePlay egy négybetűs párosítókódot jelenít meg nagy betűkkel, egy QR-kód mellett.
4. A kód alatt egy pulzáló **Megerősítésre vár** jelzés mutatja, hogy a FreePlay várja a párosítás befejezését.

Ugyanez a kód működik a FreePlay Adminban használható [Ütemezett móddal](../scheduled-mode/index.md) és a B1 Adminban használható Tervezési móddal. A QR-kód és a képernyőn látható **freeplay.church/pair** cím a FreePlay Adminba visz. Tervezési módban ezekre ne figyeljen, hanem az alábbiak szerint írja be a kódot a B1 Adminban.

## A kód megadása a B1 Adminban

1. A B1 Adminban lépjen a **Profil** > **Eszközök** menüpontra, és kattintson a **Kijelző hozzáadása** gombra.
2. Írja be a TV-n látható négy betűt a **Párosítókód** mezőbe.
3. A **Terv megjelenítése ehhez** résznél válassza ki azt a tervtípust, amelyet ez a kijelző kövessen, például „Vasárnapi istentisztelet”.
4. Mentés.

A FreePlay néhány másodpercenként ellenőrzi, hogy a párosítás elkészült-e. Amint a B1 Admin megerősíti, a TV megjeleníti a **Csatlakoztatva!** üzenetet, és átvált a tervletöltő képernyőre.

## A tervtartalom letöltése

A párosítás után a FreePlay betölti az adott tervtípus aktuális tervét. Megjeleníti:

- A terv nevét és a szolgálat dátumát
- A lecke nevét, ha a terv tartalmaz leckéjét
- Haladásjelzőt, amely a **Letöltés: X. elem / Y** szöveget mutatja

Amikor minden médiafájl letöltődött, megjelenik a **Terv indítása** gomb. A lejátszás elindításához nyomja meg a távirányítón a **Kiválasztás** gombot.

:::tip
A terv óránként automatikusan frissül. Ha valaki a nap folyamán módosítja a tervet, a FreePlay magától átveszi a változásokat.
:::

## Ha a párosítás nem sikerül

Ha a FreePlay nem tud párosítókódot létrehozni (például hálózati probléma miatt), hibaüzenetet lát **Újrapróbálkozás** gombbal. Ellenőrizze, hogy a TV csatlakozik-e az internetre, majd próbálja újra.

:::warning
A párosítókódok 15 perc múlva lejárnak. Amikor a régi kód lejár, a FreePlay automatikusan új kódot jelenít meg, a **Új kód létrehozása** gombbal pedig bármikor kérhet új kódot. Ha a beírt kód nem működik, használja azt a kódot, amelyet a TV most mutat.
:::

## Kapcsolódó cikkek

- **[A Tervezési mód áttekintése](./index.md)** - A Tervezési mód és az Ütemezett mód közötti különbségek
- **[Kijelző párosítása](../scheduled-mode/pairing-a-screen.md)** - Ugyanezt a TV-t párosíthatja naptárral a FreePlay Adminban
- **[Tartalom lejátszása](../content-providers/playing-content.md)** - A lejátszó vezérlőelemei tervlejátszáshoz
