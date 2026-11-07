---
title: "Feladatok"
---

# Feladatok

<div class="article-intro">

A feladatokkal teendőket rendelhetsz egyénekhez vagy csoportokhoz a gyülekezetedben. Akár egyszeri teendőről, akár ismétlődő felelősségről van szó, a feladatok segítenek nyomon követni, mi a teendő és ki a felelős, hogy semmi ne maradjon ki.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Győződj meg róla, hogy azok a személyek vagy [csoportok](../groups/creating-groups.md), akiknek feladatot szeretnél rendelni, léteznek a B1 Adminban
- A [Ugrás menüben](../introduction.md#getting-around-with-the-jump-menu) válaszd a **Szolgálat > Munkám** menüpontot a feladatok megtekintéséhez

</div>

## Feladatok megtekintése

Az Ugrás menüben válaszd a **Szolgálat > Munkám** menüpontot (vagy keresd a „Munkám” kifejezést). A **Feladatok** listában látható minden feladat címe, az, akihez kapcsolódik, az, akinek ki van osztva, a megnyitás dátuma és az állapota. A [munkafolyamat](./workflows.md) kártyáid a lista mellett, a **Kártyáim** alatt jelennek meg. A kijelölt személyek a B1 alkalmazás **Én** képernyőjén is láthatják és kezelhetik kártyáikat és nyitott feladataikat.

A lista feletti fülekkel válthatsz a **Hozzám rendelt**, a **Csoportjaimhoz rendelt** és a **Tőlem kért** feladatok között. Minden fül mellett látszik, hány feladat található benne.

:::tip
Alapértelmezés szerint csak a nyitott feladatok jelennek meg. A lista felett válaszd a **Lezárt** lehetőséget a befejezett feladatok megtekintéséhez.
:::

## Feladat létrehozása

1. A **Munkám** oldalon kattints a **Feladat hozzáadása** gombra. Megnyílik az **Új feladat** űrlap.
2. Ha szeretnéd, kattints a **Kapcsolódik ehhez** mezőre, és válaszd ki azt a személyt vagy csoportot, akire a feladat vonatkozik. Hagyd üresen, ha egyszerű teendőről van szó, amely senkire sem vonatkozik, például egy emlékeztető magadnak.
3. Kattints a **Kiosztva neki** mezőre. A **Válassz személyt vagy csoportot** ablakban keress a **Személy** fülön, vagy válts a **Csoport** fülre, keress csoportot, majd válaszd ki a találatot.
4. Add meg a feladat **Címét**.
5. Ha szeretnéd, válassz **Határidőt**.
6. Adj hozzá **Megjegyzéseket** a címzettnek szóló részletekkel vagy utasításokkal.
7. Kattints a **Mentés** gombra.

A feladat ezután megjelenik a feladatlistában, és a címzett láthatja a műszerfalán és a mobilalkalmazásban.

## Feladat kezelése

Kattints bármelyik feladatra a részletező oldal megnyitásához. Itt a következőket teheted:

- **Feladat lezárása vagy újranyitása** -- Kattints a **Feladat lezárása** gombra, amikor a munka elkészült, vagy a **Feladat újranyitása** gombra, ha újra nyitott állapotba szeretnéd tenni.
- **Feladat újrakiosztása** -- Kattints a **Kiosztás** gombra, és válassz másik személyt vagy csoportot.
- **Az érintett személy vagy csoport módosítása** -- Kattints a **Kapcsolás** gombra másik személy vagy csoport kiválasztásához, vagy válaszd a **Nincs személy vagy csoport** lehetőséget a törléshez.
- **Határidő módosítása** -- Válassz dátumot a **Határidő** mezőben; a módosítás a mező elhagyásakor mentődik. (A [szolgálati beosztás megerősítéséhez](./workflows.md#serving-assignment-confirmations) létrehozott feladatoknál a határidő látszik, de itt nem módosítható.)
- **Megjegyzések hozzáadása** -- Írj frissítéseket vagy részleteket a címzettnek a feladat megjegyzéseihez.
- **Emlékeztetők beállítása** -- Lásd lentebb: [Feladat-emlékeztetők](#task-reminders).

## Feladat-emlékeztetők

A határidős feladat emlékeztetőt küldhet a címzettnek a határidő előtt.

1. A feladat oldalán kattints a **Szerkesztés** gombra a **Emlékeztetők** mező mellett.
2. Kapcsold be a **Emlékeztetők küldése ehhez a feladathoz** opciót.
3. A **Mikor küldjük az emlékeztetőket?** résznél legfeljebb három időpontot válassz: **7 nappal előtte**, **3 nappal előtte**, **1 nappal előtte** vagy **Aznap**.
4. Add meg a **Napszakot**, és ha szeretnéd, az **Üzenetet** is.
5. A **Küldés módja** résznél válaszd a **Push**, az **Email** és, ha a gyülekezeted csatlakoztatott [SMS-szolgáltatót](../settings/church-settings.md#texting), a **SMS** lehetőséget.
6. Kattints a **Emlékeztetők mentése** gombra.

Ha a feladatnak nincs határideje, a B1 figyelmeztet, hogy addig nem küld emlékeztetőt, amíg nincs beállítva határidő a **Határidő** mezőben. SMS-emlékeztetőt csak azok a személyek kapnak, akik bekapcsolták a **SMS-üzenetek** opciót a [Értesítési beállításaikban](../../b1-church/getting-started/notification-preferences.md), és minden SMS költséget jelenthet a gyülekezet számára.

## A feladat életciklusa

1. Az új feladat **Nyitott** állapotban indul.
2. A címzett értesítést kap, és megtekintheti a feladatot a műszerfalán, a **Szolgálat > Munkám** menüpontban vagy a mobilalkalmazásban.
3. Amint a munka elkészül, a címzett (vagy egy adminisztrátor) kattint a **Feladat lezárása** gombra.
4. A lezárt feladatok eltűnnek az alapértelmezett nézetből, de a feladatlista feletti **Lezárt** lehetőséggel továbbra is megtalálhatók.

:::info
A B1 Admin már nem hoz létre ütemezett ismétlődő feladatokat. Személyekkel való ismétlődő utánkövetéshez használj [munkafolyamatot](./workflows.md) [ütemezett indítóval](./workflows.md#schedule-triggers).
:::

:::tip
Ha sok embert kell ugyanazon szakaszokon végigvezetned -- például új látogatók utánkövetését vagy egy tagsági folyamatot --, használd a [Munkafolyamatokat](./workflows.md). A munkafolyamatok a feladatokat húzható táblán lévő kártyákká alakítják, lépésekkel, határidőkkel és továbbítással.
:::

:::info
Egyes feladatokat a B1 más részei hoznak létre automatikusan, és ezek a szokásos jegyzet/újrakiosztás nézet helyett egy speciális áttekintő kártyát nyitnak meg -- például a [csoportcsatlakozási kérelmek](../groups/group-join-requests.md#approving-from-the-tasks-page), a [profilmódosítási kérelmek](../profile/approving-profile-changes.md) és a [fióktörlési kérelmek](../profile/account-deletion.md) mind így működnek.
:::

## Következő lépések

- Vezess végig személyeket többlépcsős folyamaton a [Munkafolyamatokkal](./workflows.md)
- Használd a [Munkafolyamatokat](./workflows.md) az ismétlődő folyamatokon való automatikus végigvezetéshez
- Használd a feladatokat a [Istentiszteleti terveivel](./plans.md) együtt az istentiszteleti előkészítés teendőinek nyomon követéséhez
