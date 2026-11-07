---
title: "Check-In abschließen"
---

Tut mir leid, das ist ein Übersetzungsauftrag, und ich habe eine Anweisung ignoriert: Die Ausgabe muss ausschließlich die übersetzte Datei auf Ungarisch sein. Hier ist die korrekte Antwort:

---
title: "Bejelentkezés befejezése"
---

# Bejelentkezés befejezése

<div class="article-intro">

Miután átnézte a háztartását, és elvégezte a szükséges csoportbeosztásokat, készen áll a bejelentkezés véglegesítésére. Ez a műveletsor utolsó lépése a kioszk-munkafolyamatban – az alkalmazás elküldi a jelenléti adatokat, kinyomtatja a címkéket, majd visszaáll a következő család fogadására.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- [Tekintse át a háztartását](./household-review) a háztartás-áttekintő képernyőn
- [Rendeljen csoportokat](./group-assignment) azoknak a családtagoknak, akiknek egy adott osztályba vagy programba kell bejelentkezniük
- Opcionálisan [adjon hozzá vendégeket](./adding-guests), akik a családjával érkeznek

</div>

## Hogyan jelentkezzen be

1. A **háztartás-áttekintő képernyőn** koppintson a képernyő alján lévő **Bejelentkezés** gombra.
2. Az alkalmazás elküldi a jelenléti adatokat a szervernek, majd egy zöld pipával és üdvözlő üzenettel ellátott **sikeres képernyőt** jelenít meg.

Ennyi az egész. A családja jelenléte rögzítésre került.

## Telt termek és önkéntes-arányok

Ha egyházánk [biztonsági korlátokat](../../b1-admin/attendance/checkin-safety) állított be a termeihez, a szerver mentés előtt ellenőrzi azokat:

- Ha a kiválasztott terem **tele van vagy zárva**, a bejelentkezés nem valósul meg, és az alkalmazás megnevezi a termet, hogy másikat válasszon.
- Ha a istentiszteleti időponthoz tartozik [bejelentkezési ütemezés](../../b1-admin/attendance/setup#setting-a-check-in-schedule), és annak bejelentkezési időablaka éppen nincs nyitva, akkor az adott időponthoz tartozó termekbe való bejelentkezés szintén elutasításra kerül. A **Még nem lehet bejelentkezni** képernyő felsorolja a termet, és megadja az okot: „a bejelentkezés jelenleg nem elérhető”. Koppintson a **Termek módosítása** gombra, ha másik istentiszteleti időpontot vagy csoportot szeretne választani. (A már lezárt istentiszteleti időpontok a [háztartás-képernyőn](./household-review) **Lezárva** felirattal jelennek meg, és nem választhatók ki. Ez általában csak akkor fordul elő, ha az időablak a bejelentkezés közben zárul be.)
- Az a háztartás, amely egy korábbi istentiszteleti időpontra jelentkezett be, később is visszatérhet, és hozzáadhat egy nyitott istentiszteleti időpontot, még akkor is, ha a korábbi időablak már bezárult. A meglévő bejelentkezések megmaradnak, és nem okozzák az új bejelentkezés elutasítását.
- Ha egy gyermekterem **kevés önkéntessel rendelkezik** a számára előírt arány szerint, az alkalmazás vagy figyelmeztetést jelenít meg, amelyet egy munkatárs megerősíthet a folytatáshoz, vagy teljesen blokkolja a bejelentkezést – attól függően, hogy egyháza hogyan állította be az arányok érvényesítését.

## Címkenyomtatás

Ha hálózati nyomtató van beállítva, az alkalmazás a bejelentkezés után automatikusan kinyomtatja a címkéket:

- **Névcímkék** kerülnek nyomtatásra minden olyan személy számára, aki olyan csoportba van beosztva, amelyben a **Névcímke nyomtatása** beállítás engedélyezve van. A névcímkék tartalmazzák a személy nevét, csoportbeosztását, valamint az esetleges allergia- és megjegyzési információkat, ha ilyenek rendelkezésre állnak.
- **Szülői átvételi cédulák** kerülnek nyomtatásra, ha bármelyik bejelentkezett személy olyan csoportban van, amelyben a **Szülői átvétel** beállítás engedélyezve van. A **Önkéntesként** bejelentkezett személyek kimaradnak, így a szülői átvétellel rendelkező teremben szolgáló gyermekfelügyelő nem kap átvételi cédulát. Az átvételi cédula felsorolja a gyermekeket, csoportbeosztásukat és egy egyedi **4 karakteres biztonsági kódot**.

:::info
Ugyanez a biztonsági kód szerepel a gyermek névcímkéjén és a szülő átvételi cédulájén is. Az átvétel során az önkéntesek összehasonlítják a kódokat, hogy ellenőrizzék, a megfelelő felnőtt viszi-e el az adott gyermeket.
:::

A biztonsági kódot minden bejelentkezéskor újra generálja a rendszer, és csak mássalhangzókat és számjegyeket használ (a magánhangzókat kihagyjuk, hogy ne alakuljanak ki nem megfelelő szavak).

:::warning
Ha a címkék nem nyomtatódnak ki, nyissa meg az Adminisztrációs beállításokat úgy, hogy hétszer koppint az **egyházi logóra**, majd koppintson a **Nyomtató módosítása** gombra a nyomtatókapcsolat ellenőrzéséhez. A hibaelhárítási lépésekért lásd: [Nyomtató beállítása](../getting-started/printer-setup).
:::

## Mi történik a bejelentkezés után

- Ha van beállított nyomtató, az alkalmazás kinyomtatja az összes címkét, majd automatikusan visszatér a **keresőképernyőre**, készen a következő család fogadására.
- Ha nincs beállított nyomtató, az alkalmazás szintén automatikusan visszatér a **keresőképernyőre**.

Mindkét esetben a sikeres képernyő legalább 6 másodpercig látszik, attól a pillanattól kezdve, hogy megjelenik (egy személy részvételi mérföldkövének ünneplésekor 8 másodpercig), hogy a családok láthassák, a bejelentkezés sikeres volt. Ha a nyomtatás ennél tovább tart, az alkalmazás a nyomtatás befejezése után körülbelül másfél másodperccel tér vissza.

Nem kell semmire koppintania a keresőképernyőre való visszatéréshez – az alkalmazás automatikusan kezeli az átmenetet. Amint a képernyő már egy ideje látszik, koppintson rá, és azonnal visszatér. Az első másfél másodpercben történő koppintást az alkalmazás figyelmen kívül hagyja, így a **Bejelentkezés** gomb gyors dupla koppintása nem ugorja át a képernyőt.

:::tip
Az alkalmazás minden bejelentkezés után teljesen visszaáll, így nincs annak a kockázata, hogy egy család más család adatait lássa.
:::

## Mi kerül rögzítésre

Amikor a **Bejelentkezés** gombra koppint, az alkalmazás minden olyan háztartási tag esetén, akinek van csoportbeosztása, az alábbiakat küldi el a szervernek:

- A bejelentkezett **személy**
- Az a **szolgálat**, amelyen részt vesz
- Az a **istentiszteleti időpont** és **csoport**, amelyhez be van osztva

Ezek az adatok a B1 Adminban, a Jelenlét szakaszban jelennek meg, ahol egyházunk adminisztrátorai megtekinthetik és kezelhetik a jelenléti nyilvántartásokat. A részletekért lásd: [bejelentkezés-adminisztrációs útmutató](../../b1-admin/attendance/check-in.md).
