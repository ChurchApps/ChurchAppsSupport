---
title: "Check-in abschließen"
description: "Schließen Sie den Kiosk-Check-in einer Familie in B1 Checkin ab, mit Raumlimits, Etikettendruck, Abholsicherheitscodes und den nächsten Schritten der App."
---

Wrong language: you asked for Hungarian, and that is what I should produce. Here is the corrected translation.

---
title: "Check-in befejezése"
description: "Fejezze be a családok kioszk-bejelentkezését a B1 Checkinben: terembeli korlátok, címkenyomtatás, átvételi biztonsági kódok és az alkalmazás következő lépései."
---

# Check-in befejezése

<div class="article-intro">

Miután áttekintette a háztartást, és elvégezte a szükséges csoportbeosztásokat, készen áll a bejelentkezés véglegesítésére. Ez a kioszk-munkafolyamat utolsó lépése: az alkalmazás rögzíti a részvételt, kinyomtatja a címkéket, és visszaáll a következő családhoz.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- [Tekintse át a háztartást](./household-review.md) a háztartás-áttekintő képernyőn
- [Rendeljen csoportokat](./group-assignment.md) azoknak a családtagoknak, akiknek egy adott osztályba vagy programba kell bejelentkezniük
- Opcionálisan [adjon hozzá vendégeket](./adding-guests.md), akik a családjával érkeztek

</div>

## Bejelentkezés

1. A **háztartás-áttekintő képernyőn** koppintson a képernyő alján lévő **Check-in** gombra.
2. Az alkalmazás elküldi a részvételi adatokat a szervernek, majd egy zöld pipát és üdvözlő üzenetet tartalmazó **sikeres képernyőt** jelenít meg.

Ennyi az egész. A családja részvétele rögzítésre került.

Ha valaki a kiválasztottak közül már bejelentkezett az aznapi istentiszteletre, először egy **Már bejelentkezett** ablak jelenik meg, amely megnevezi őket. Koppintson a **Bejelentkezés újra** gombra az új csoportválasztások mentéséhez, vagy a **Mégse** gombra a háztartás-képernyőre való visszatéréshez.

## Tele termek és önkéntes-arányok

Ha a gyülekezete [biztonsági korlátokat](../../b1-admin/attendance/checkin-safety.md) állított be a termeihez, a szerver mentés előtt ellenőrzi őket:

- Ha a kiválasztott terem **tele van vagy zárva**, a bejelentkezés nem megy végbe, és az alkalmazás megnevezi a termet, hogy válasszon másikat.
- Ha az istentiszteleti időponthoz tartozik [bejelentkezési menetrend](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), és annak bejelentkezési ideje éppen nincs nyitva, akkor az adott időpont termeibe való bejelentkezést is elutasítja a rendszer. A **Még nem lehet bejelentkezni** képernyő felsorolja a termet a „a bejelentkezés jelenleg nincs nyitva” indokkal; koppintson a **Termek módosítása** gombra másik istentiszteleti időpont vagy csoport kiválasztásához. (A már lezárt időpontok a [háztartás-képernyőn](./household-review.md) **Lezárva** állapotban jelennek meg, és nem választhatók ki, ezért ez általában csak akkor fordul elő, ha az ablak a bejelentkezés közben záródik le.)
- Az a háztartás, amely egy korábbi istentiszteleti időpontra jelentkezett be, később is visszatérhet, és hozzáadhat egy nyitott időpontot, még akkor is, ha a korábbi ablak már bezárult. Meglévő bejelentkezései megmaradnak, és nem okozzák az új bejelentkezés elutasítását.
- Ha egy gyermekterem **kevés önkéntessel** rendelkezik az előírt arányhoz, az alkalmazás vagy figyelmeztetést jelenít meg, amelyet egy munkatárs megerősíthet a folytatáshoz, vagy teljesen blokkolja a bejelentkezést – attól függően, hogy a gyülekezete hogyan állította be az arányok betartatását.

## Címkenyomtatás

Ha hálózati nyomtató van beállítva, az alkalmazás a bejelentkezés után automatikusan kinyomtatja a címkéket:

- **Névcímkék** készülnek minden olyan személyről, akit olyan csoportba osztottak be, amelynél a **Névcímke nyomtatása** beállítás be van kapcsolva. A névcímkék tartalmazzák a személy nevét, a csoportbeosztását, valamint az esetleges allergia- vagy megjegyzési adatokat.
- **Szülői átvételi cetlik** nyomtatódnak, ha bármely bejelentkezett személy olyan csoportban van, amelynél a **Szülői átvétel** beállítás be van kapcsolva. A **Önkéntes** szerepkörben bejelentkezett személyek kimaradnak, így a Szülői átvétel szobában szolgáló gyermekfelügyelő nem kap átvételi cetlit. Az átvételi cetli felsorolja a gyermekeket, a csoportbeosztásukat, valamint egy egyedi **4 karakteres biztonsági kódot**.

:::info
Ugyanez a biztonsági kód szerepel a gyermek névcímkéjén és a szülő átvételi cetliján is. Átvételkor az önkéntesek ezeket a kódokat összevetik, hogy ellenőrizzék, a megfelelő felnőtt viszi-e el az egyes gyermekeket.
:::

A biztonsági kódot minden bejelentkezéshez újonnan generálja a rendszer, és csak mássalhangzókat és számjegyeket használ (a magánhangzókat kihagyják, hogy ne alkothassanak nem megfelelő szavakat).

:::warning
Ha a címkék nem nyomtatódnak ki, koppintson hétszer a **gyülekezeti logóra** az Adminisztrátori beállítások megnyitásához, majd koppintson a **Nyomtató módosítása** gombra a nyomtatókapcsolat ellenőrzéséhez. A hibaelhárítási lépésekért lásd a [Nyomtató beállítása](../getting-started/printer-setup.md) oldalt.
:::

## Mi történik a bejelentkezés után

- Ha van beállított nyomtató, az alkalmazás kinyomtatja az összes címkét, majd automatikusan visszatér a **keresőképernyőre**, készen a következő családra.
- Ha nincs beállított nyomtató, az alkalmazás szintén automatikusan visszatér a **keresőképernyőre**.

Mindkét esetben a sikeres képernyő legalább 6 másodpercig látható a megjelenésétől (8 másodpercig, ha valakinek a részvételi mérföldkövét ünnepli), hogy a családok láthassák, a bejelentkezés sikerült. Ha a nyomtatás ennél tovább tart, az alkalmazás a nyomtatás befejezése után körülbelül másfél másodperccel tér vissza.

Nem kell semmit megnyomnia a keresőképernyőre való visszatéréshez – az alkalmazás automatikusan kezeli az átmenetet. Amint a képernyő egy pillanatig látszott, koppintással azonnal visszatérhet; az első másfél másodpercben tett koppintásokat a rendszer figyelmen kívül hagyja, így a **Check-in** gomb gyors dupla koppintása nem ugorja át a képernyőt.

:::tip
Minden bejelentkezés után az alkalmazás teljesen visszaáll, így nincs kockázat, hogy egy család más család adatait lássa.
:::

## Mit rögzít a rendszer

Amikor a **Check-in** gombra koppint, az alkalmazás minden olyan háztartási tag számára, akinek van csoportbeosztása, a következőket küldi el a szervernek:

- Az **a személy**, akit bejelentkeztetnek
- Az a **szolgálat**, amelyen részt vesz
- Az az **istentiszteleti időpont** és **csoport**, amelyhez be van osztva

Ezek az adatok a B1 Adminban, a Részvétel szakaszban jelennek meg, ahol a gyülekezet adminisztrátorai megtekinthetik és kezelhetik a részvételi nyilvántartásokat. A részletekért lásd a [bejelentkezés-adminisztrációs útmutatót](../../b1-admin/attendance/check-in.md).
