---
title: "Adománycsomagok"
---

# Adománycsomagok

<div class="article-intro">

A csomagokkal az adományokat egy helyre gyűjtheti, így könnyebb nyomon követni és egyeztetni őket. Egy tipikus csomag egyetlen gyűjtést jelent, például egy vasárnapi perselyezést vagy egy különleges esemény adományait. A csomagok használata segít rendszerezve tartani az adatokat, és egyszerűvé teszi annak ellenőrzését, hogy a nyilvántartás megegyezik-e a ténylegesen beérkezett befizetésekkel.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Győződjön meg róla, hogy [beállította az alapjait](funds.md), hogy azok elérhetők legyenek az adományok rögzítésekor
- A Csomagok oldal megtekintéséhez a **Adomány-összesítők megtekintése**, **Adományok szerkesztése** vagy **Adományok rögzítése** jogosultságra lesz szüksége (lásd: [Ki módosíthat egy csomagot](#who-can-change-a-batch))

</div>

## A Csomagok oldal

Ha a **Adományok > Csomagok** menüpontra lép, megjelenik a csomagjainak listája. Minden sor a következőket tartalmazza:

- **Név** -- a csomagnak adott címke
- **Dátum** -- a gyűjtés dátuma
- **Adományok** -- az egyes adományok száma a csomagban
- **Összesen** -- a teljes összeg dollárban
- **Állapot** -- **Nyitott** vagy **Lezárt** (lásd: [Csomag lezárása és újranyitása](#closing-and-reopening-a-batch))

A lista felett évgombok találhatók, amelyekkel csak egy adott év csomagjait jelenítheti meg, vagy az **Összes** csomagot. Egy soros összefoglaló mutatja a megjelenített csomagok számát, az adományok darabszámát és a teljes összeget.

## Új csomag létrehozása

1. Kattintson az oldal tetején lévő **Csomag hozzáadása** gombra.
2. Adjon meg egy leíró nevet (például „Vasárnapi perselyezés - febr. 9.").
3. Válassza ki a gyűjtés dátumát.
4. Kattintson a **Mentés** gombra.

Az új csomag megjelenik a listában, és készen áll az adományok hozzáadására.

## Munka a csomagokkal

- **Adományok megtekintése** -- kattintson a csomag nevére, hogy megnyissa, és lássa a benne lévő egyes adományokat. Innen hozzáadhat, szerkeszthet vagy eltávolíthat adományokat, vagy az **Importálás CSV-ből** gombra kattintva egyszerre sok adományt vehet fel egy táblázatból (lásd: [Adományok importálása CSV-fájlból](recording-donations.md#importing-donations-from-a-csv-file)).
- **Csomag adatainak szerkesztése** -- kattintson a csomag sorában lévő **Szerkesztés** gombra a név vagy a dátum módosításához. Csak a **Adományok szerkesztése** jogosultsággal rendelkezők törölhetnek csomagot.
- **Rendezés** -- az oszlopfejlécekre kattintva név vagy dátum szerint rendezheti a csomagokat.
- **Exportálás** -- kattintson az oldal tetején lévő **Exportálás** gombra, hogy a megjelenített csomagokat táblázatként (CSV) töltse le.
- **Sikertelen események** -- ha a fizetési átjáró hibát jelentett, az oldal tetején megjelenik a **Sikertelen események** gomb (a megoldatlan események számával). Kattintson rá a csomagok alatti eseménylista megjelenítéséhez vagy elrejtéséhez.
- **Importálás Stripe-ból** -- kattintson az oldal tetején a **Hiányzó Stripe-tranzakciók importálása** gombra, hogy megnyissa a [Stripe-import](stripe-import.md) eszközt. A gomb csak akkor jelenik meg, ha egyházának adományozási átjárója a Stripe.

## Ki rögzítette az egyes adományokat

Minden csomagba beírt adománynál az adományozó neve alatt megjelenik a **Rögzítette** felirat és a rögzítő személy neve, így aláírólap nélkül is követhető, ki vette fel az adományt. A B1 ezt automatikusan rögzíti a bejelentkezett felhasználó alapján, és az adomány későbbi szerkesztése nem változtatja meg. Az **Importálás CSV-ből** segítségével bevitt adományoknál az importálást végrehajtó személy neve jelenik meg.

Az online adományok, a [Stripe-import](stripe-import.md) eszközzel hozzáadott adományok, valamint a 2026 novemberében bevezetett funkció előtt rögzített adományok nem mutatnak nevet.

## Csomag lezárása és újranyitása

Miután egy csomagot megszámoltak és befizették, zárja le, hogy az adományai a lezárás pillanatában tapasztalt állapotukban maradjanak.

1. Nyissa meg a csomagot.
2. Kattintson az oldal tetején lévő **Csomag lezárása** gombra.

A csomag neve melletti állapotjelző **Nyitott**-ról **Lezárt**-ra vált, a csomag a Csomagok oldalon az **Állapot** oszlopban **Lezárt** feliratot mutat, a csomag tetején pedig értesítés magyarázza, hogy a csomag lezárt. Amíg a csomag le van zárva, a **Adományok rögzítése** jogosultsággal rendelkezők megtekinthetik, de nem adhatnak hozzá, nem szerkeszthetnek és nem törölhetnek benne adományokat, valamint nem módosíthatják a csomag nevét vagy dátumát.

A csomag ismételt módosításához nyissa meg, és kattintson a **Csomag újranyitása** gombra. Az új csomagok mindig nyitott állapotban indulnak.

:::info
Csak a **Adományok szerkesztése** jogosultsággal rendelkezők látják a **Csomag lezárása** és a **Csomag újranyitása** gombot. Ha javításra van szükség, lezárt csomagban is módosíthatnak adományokat anélkül, hogy újra kellene nyitniuk a csomagot.
:::

## Ki módosíthat egy csomagot

Két [szerepkör-jogosultság](../settings/roles-permissions.md) teszi lehetővé, hogy valaki csomagokkal dolgozzon:

- **Adományok szerkesztése** -- teljes hozzáférés: csomagok hozzáadása és törlése, lezárása és újranyitása, valamint bármely adomány hozzáadása, szerkesztése vagy törlése, függetlenül attól, hogy a csomag nyitott vagy lezárt.
- **Adományok rögzítése** -- a számláló csapatoknak és az adományok felvételét végző önkénteseknek. Csomagokat adhatnak hozzá, és adományokat vehetnek fel, szerkeszthetnek vagy törölhetnek, de csak nyitott csomagban. Nem törölhetnek csomagot, nem zárhatják le vagy nyithatják újra őket, és nem módosíthatnak az online adakozáson keresztül érkezett adományokat.

Ha valakinek van **Adományok rögzítése** jogosultsága, de nincs **Adomány-összesítők megtekintése** jogosultsága, a B1 Admin menüben az **Adományok** menüpontot látja, amely közvetlenül a Csomagok oldalra visz. A **Összesítő**, **Alapok**, **Kampányok** és **Adakozási kimutatások** menüpontok számára rejtve maradnak. Ahhoz, hogy megnyissa a csomagot és lássa a benne lévő adományokat, a szerepkörnek az **Adományok megtekintése** jogosultságra is szüksége van.

:::tip
Gyakori beállítás egy „Számláló csapat" nevű szerepkör, amelyhez az **Adományok rögzítése** és az **Adományok megtekintése** jogosultság tartozik, valamint egy pénztárnok, akinek **Adományok szerkesztése** jogosultsága van, és aki a befizetés egyeztetése után lezárja az egyes csomagokat.
:::

## Csomag nyomtatása

Nyisson meg egy csomagot, és kattintson az adománylista fölötti **Nyomtatás** gombra, hogy papíralapú másolatot nyomtasson a számláló csapatának vagy a befizetési nyilvántartásához. A nyomtatvány a következőket tartalmazza:

- Egyházának fejléce -- a logója (a [Webhely > Megjelenés](../website/appearance.md) menüpontban feltöltött **Világos háttérhez használt logó**, ha töltött fel ilyet), alatta egyházának neve -- majd a csomag neve és dátuma
- A csomagban lévő minden adomány az adományozó nevével, a rögzítővel, a fizetési móddal, a megjegyzésekkel, a dátummal és az összeggel (a visszatérített adományok át vannak húzva és visszatérítettként vannak megjelölve)
- **Alapokra jutó részösszegek** -- a csomagban az egyes alapokra adott összes adomány
- **Csomag összesen** -- a teljes csomag összesített összege

A **Nyomtatás** gomb csak akkor jelenik meg, ha a csomagban legalább egy adomány van.

### Több csomag nyomtatása egyszerre

Ha egy időszak összes csomagját egy lépésben szeretné kinyomtatni -- például az elmúlt hónap összes befizetését --, kattintson a **Csomagok** oldal tetején, az **Exportálás** mellett lévő **Nyomtatás** gombra. Megnyílik a **Csomagok nyomtatása** oldal, amelynek **Kezdő dátuma** és **Záró dátuma** mezője megegyezik a képernyőn látható csomagokkal: a kiválasztott év január 1-jétől december 31-ig, vagy ha az **Összes** lehetőség van kiválasztva, a legkorábbi és a legkésőbbi csomag dátumáig. Bármelyik dátumot módosíthatja egy másik időszak kiválasztásához.

A tartományba eső minden csomag (a kezdő és záró dátumot is beleértve) dátum szerinti sorrendben nyomtatódik ki, csomagonként egy oldalon, ugyanazzal az elrendezéssel, mint az egyes csomag nyomtatványa. Az adomány nélküli csomagok kimaradnak. Ha a tartományban egyik csomagban sincs adomány, a „Nincs adományt tartalmazó csomag ebben a dátumtartományban." üzenet jelenik meg. A **Nyomtatás** gombra kattintva megnyílik a böngésző nyomtatási párbeszédablaka, a **Bezárás** gombra kattintva pedig visszatér a csomaglistához.

## Csomag exportálása QuickBooks Online-ba

Nyisson meg egy csomagot, és kattintson a **Exportálás QuickBooks-hoz** gombra, hogy a csomagot naplóbejegyzésként töltse le, amelyet a QuickBooks Online importálhat (**Beállítások > Adatok importálása > Naplóbejegyzések**). A fájl egy terhelést tartalmaz a **Még nem befizetett alapok** számlán a csomag összegével, valamint egy jóváírást alaponként, az egyes alapok nevét használva számlanévként. A QuickBooks az importáláskor megkéri, hogy párosítsa ezeket a neveket a számlatükörrel, ezért nevezze el az alapjait úgy, ahogy a könyvelője nevezi el a bevételi számlákat, vagy az importáláskor egyszer állítsa be a megfeleltetést.

:::tip
Nevezze el a csomagjait következetesen, hogy később könnyen megtalálja őket. A dátum és a gyűjtés típusának feltüntetése (például „Vasárnap délelőtt - 2025-02-09") a lista áttekinthetőségét is megőrzi, ahogy az bővül.
:::

## Következő lépések

Amint van egy csomagja, az egyes adományok hozzáadásának módjáról a [Adományok rögzítése](recording-donations.md) oldalon olvashat. Az online adakozásból automatikusan csomagokat is létrehozhat a [Stripe-tranzakciók importálásával](stripe-import.md).
