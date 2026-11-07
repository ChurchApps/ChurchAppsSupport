---
title: "Jelenlét rögzítése"
description: "Részvétel rögzítése csoportalkalmanként a B1 Admin-ban: alkalom létrehozása, jelenlét jelölése, jegyzetek mentése, jelenléti ív nyomtatása vagy táblázat-export."
---

# Jelenlét rögzítése

<div class="article-intro">

Miután beállította a gyülekezeti központokat, az istentiszteleti időpontokat és a csoportokat, minden alkalom után kézzel rögzítheti a jelenlétet. A B1 Admin a jelenlétet **alkalmakhoz** rendeli: csoportonként és találkozónaponként egy alkalom tartozik. Ön létrehozza az alkalmat, megjelöli, kik voltak jelen, és az adatok közvetlenül bekerülnek a jelenléti jelentésekbe.

</div>

## Oktatóvideó

<YouTube id="gS8h2rhyMys" title="Jelenlét rögzítése és nyomon követése a B1-ben" next="Tervek készítése és önkéntesek beosztása a B1-ben" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A gyülekezeti központjait, istentiszteleti időpontjait és csoportjait be kell állítani. Ha ezt még nem tette meg, olvassa el a [Jelenléti beállítások](setup.md) oldalt.
- A nyomon követni kívánt csoportokhoz be kell kapcsolni a **Jelenlét követése** opciót. Részletekért lásd: [Jelenléti beállítások](setup.md).
- A jelenlét mentéséhez a **Jelenlét szerkesztése** jogosultságra van szüksége. Azok az önkéntesek, akiknek a személyeknél csak a **Csak a személyek neveinek megtekintése** jogosultságuk van, így is rögzíthetik a jelenlétet: a **Csoportok** menüpontból nyitják meg az órákat, és csak a tagok nevét látják. Lásd: [Csak nevek megtekintése](../settings/roles-permissions.md#people-names-only).

</div>

## Alkalom létrehozása

Az alkalom egy csoporttalálkozás egy előfordulását jelenti – például a K–3. osztályos hittanórát egy adott vasárnapon.

1. Nyissa meg a **B1 Admin** alkalmazást, nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), bontsa ki a **Személyek** menüpontot, majd kattintson a **Csoportok** elemre.
2. Válassza ki azt a csoportot, amelynek a jelenlétét rögzíteni szeretné.
3. A csoport oldalának **Alkalmak** szakaszában kattintson az **Összes alkalom** gombra.
4. Kattintson az **Új** gombra új alkalom létrehozásához.
5. Ha a csoport hozzá van rendelve istentiszteleti időponthoz, válassza ki az **Istentiszteleti időpontot**. Ha a csoport nincs időponthoz rendelve, ez a mező nem jelenik meg.
6. Válassza ki az **Alkalom dátumát** – ez lehet a mai nap, egy múltbeli vagy egy jövőbeli dátum.
7. Kattintson a **Mentés** gombra.

### Alkalmak létrehozása egy istentiszteleti időpont minden órájához

Ha más csoportok is ugyanabban az istentiszteleti időpontban találkoznak (például a vasárnapi 9:00-as gyermekórák), egyetlen lépésben létrehozhatja az alkalmaikat, anélkül hogy minden csoporthoz külön el kellene mennie.

1. Kövesse a fenti lépéseket, és válasszon **Istentiszteleti időpontot**.
2. Jelölje be a **Hozzáadás a többi _N_ csoporthoz ezen az istentiszteleti időpontban (_istentiszteleti időpont_)** jelölőnégyzetet. A jelölőnégyzet mutatja, hány másik csoport van hozzárendelve az adott időponthoz. Csak új alkalom létrehozásakor jelenik meg, és csak akkor, ha legalább egy másik csoport ugyanabban az időpontban találkozik.
3. Kattintson a **Mentés** gombra.

A rendszer létrehozza az alkalmat az aktuális csoportnak, valamint az ugyanazon a dátumon és időpontban találkozó összes többi csoportnak. Azok a csoportok, amelyeknek már van alkalmuk az adott dátumra és időpontra, kimaradnak, így nem lesznek duplikált bejegyzések.

:::tip
Létrehozhat múltbeli dátumokra szóló alkalmakat is, ha olyan jelenlétet szeretne utólag rögzíteni, amelyet még nem vezetett be, vagy előre létrehozhatja őket, hogy készen álljanak, amikor a csoport találkozik.
:::

## Alkalmi jegyzetek {#session-notes}

Minden alkalomhoz tartozhatnak jegyzetek – összefoglaló arról, mi hangzott el, közlemények vagy imakérések.

1. Új alkalom hozzáadásakor, vagy az alkalom melletti **Szerkesztés** (ceruza) ikonra kattintás után írja be a szöveget a dátum alatti **Jegyzetek (mi hangzott el, közlemények, imakérések)** mezőbe. Az eszköztár segítségével félkövér szöveget, listákat és hivatkozásokat adhat hozzá.
2. Kattintson a **Mentés** gombra.

A jegyzetek az alkalom jelenléti listájának tetején jelennek meg. Ezek egyben azok a találkozói jegyzetek is, amelyeket a csoport tagjai a B1.church oldalon, a csoport oldalának **Találkozók** szakaszában olvashatnak, és ahol a csoportvezetők is írhatnak és szerkeszthetnek. Lásd: [Csoport részletei](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Jelenlét rögzítése

Válasszon ki egy alkalmat a jelenléti lista megtekintéséhez. A csoport minden tagja jelölőnégyzettel szerepel, vezetéknév szerint rendezve, és akik már jelenlévőként vannak rögzítve, azok be vannak jelölve.

1. Jelölje be annak a személynek a nevét, aki részt vett. A **Mind kijelölése** vagy a **Kijelölés törlése** gombbal egyszerre mindenkit módosíthat.
2. A lista felett látható szám (például „12 / 15 jelen”) a jelölőnégyzetek bejelölésekor frissül.
3. Kattintson a **Jelenlét mentése** gombra. Mindaddig semmi nem kerül rögzítésre, amíg el nem menti, és egy üzenet jelzi, ha a mentés befejeződött. Ha mentés közben be akarja zárni vagy újra akarja tölteni a böngészőlapot, a böngésző először figyelmeztetni fogja, hogy ne vesszenek el a módosítások.

Ha valakit, aki már jelenlévőként van rögzítve, kijelölés nélkül ment el, a rendszer eltávolítja őt az alkalomból.

### Vendégek hozzáadása

Ha olyasvalakit szeretne rögzíteni, aki nem tagja a csoportnak, keressen rá a jelenléti lista melletti személykeresőben. Ha még nincs az adatbázisában, a keresésből is létrehozhatja. Mindkét esetben a személy már bejelölve kerül a listára. A rögzítéshez kattintson a **Jelenlét mentése** gombra.

A kioszknál bejelentkezett személyeknél **Önkéntes** vagy **Vendég** címke látható. Azoknál, akik nem tagjai a csoportnak, **Vendég** címke jelenik meg.

## Mely csoportoknak van még szükségük jelenlétre

Ha több óra is ugyanabban az istentiszteleti időpontban található, egy pillantással láthatja, melyiknél kell még rögzíteni a jelenlétet az adott dátumra.

1. Nyisson meg egy olyan alkalmat, amelyhez tartozik istentiszteleti időpont.
2. Kattintson a jelenléti lista tetején lévő **Kik hiányoznak még a jelenlétből?** gombra.
3. Megjelenik egy párbeszédablak, amely felsorolja az adott istentiszteleti időponthoz rendelt összes csoportot, a tetején egy összefoglalóval, például „5 / 8 csoport rögzítve”.

Azok a csoportok, ahol az adott dátumra senkit nem jelöltek jelenlévőnek, a **Nincs rögzítve** címkét kapják, és elöl szerepelnek a listán. Azok a csoportok, amelyeknek van jelenléti adatuk, a **Rögzítve** címkét kapják, a jelenlévők számával együtt (például „Rögzítve (12)”). Kattintson a csoport nevére, és megnyílik a csoport alkalmainak listája, ahol az azonos dátumhoz tartozó alkalom már ki van választva, így azonnal rögzítheti a jelenlétet. Ha a csoportnak még nincs alkalma az adott dátumra, az alkalmak listája nyílik meg, ahol hozzáadhat egyet.

:::tip
Ezt kombinálhatja a **Minden óra nyomtatása** funkcióval és [az alkalmak létrehozásával egy istentiszteleti időpont minden órájához](#adding-sessions-for-every-class-in-a-service-time): hozza létre az alkalmakat, adjon ki névsorlapokat, majd a **Kik hiányoznak még a jelenlétből?** funkcióval nézze meg, melyik lapok még nincsenek rögzítve.
:::

## Névsorlap nyomtatása

A névsorlap egy nyomtatható osztálylista, amelyet a tanárok kézzel jelölhetnek meg, és később visszaadhatnak, hogy Ön rögzíthesse az adatokat. Minden lapon megjelenik a gyülekezeti logója (a [Webhely > Megjelenés](../website/appearance.md) oldalon feltöltött **Világos háttérhez való logó**, ha töltött fel ilyet), alatta a gyülekezet neve, az osztály neve, az osztálynév alatt egy nagy **Dátum** mező és az istentiszteleti időpont. A tagok két oszlopban szerepelnek (előbb a bal oszlop, majd a jobb oszlop lefelé olvasva), hogy több név férjen el egy oldalon, és minden tagnak van **Jelen** és **Hiányzik** jelölőnégyzete. Van még üres sor a vendégeknek, valamint egy **Tanár / Jegyzetek** rész.

- **Alkalomból** – Kattintson a jelenléti lista tetején lévő **Névsorlap nyomtatása** (nyomtató) ikonra. A lap az alkalom dátumával készül, és az adott alkalom istentiszteleti időpontját tünteti fel.
- **Egy istentiszteleti időpont összes órája** – Ha az alkalomhoz tartozik istentiszteleti időpont, kattintson a **Minden óra nyomtatása** gombra, hogy az adott időponthoz rendelt minden osztályhoz külön lapot nyomtasson. Minden osztály a saját oldalára kerül.
- **A tagok listájából** – A csoport oldalán kattintson az **Összes tag** gombra, majd a tagok listája felett lévő **Névsorlap nyomtatása** ikonra, és válassza az **Jelenléti lap** lehetőséget egy dátum nélküli lap nyomtatásához. Ugyanebben a menüben található a **Kapcsolattartó névsor** elrendezés is, amely a tagok telefonszámát, e-mail-címét és lakcímét tartalmazza – lásd: [A tagok listájának nyomtatása](../groups/group-members.md#printing-the-member-list).

A lap új lapon nyílik meg, és a böngésző nyomtatási párbeszédablaka automatikusan megjelenik.

## Jelenlét exportálása táblázatba

Az alkalomról készült nyilvántartást CSV-fájlként is letöltheti, és Excelben, a Numbersben vagy a Google Táblázatokban használhatja.

1. Nyissa meg az exportálni kívánt alkalmat.
2. Kattintson a jelenléti lista tetején lévő **Exportálás** gombra.
3. Nyissa meg a letöltött fájlt a táblázatkezelő programjában.

A fájlban minden csoporttag külön sorban szerepel, a nevével és azzal, hogy jelen volt-e vagy hiányzott, valamint megjelenik az alkalom dátuma és az alkalom jegyzetei is.

## Rögzített jelenlét megtekintése

Az alkalmak rögzítése után az adatok megjelennek a jelenléti jelentésekben.

- **Jelenléti trend fül** (az Jelenlét oldalon, az **Összes év** alatt) – a gyülekezet egészének tendenciáit mutatja az idő függvényében. Lásd: [Jelenlét nyomon követése](tracking-attendance.md).
- **Csoportos jelenlét fül** – a jelenlétet csoportonként bontva mutatja. Lásd: [Jelenléti jelentések](../reports/attendance-reports.md#group-attendance).

:::tip
Ha a most létrehozott alkalom nem jelenik meg azonnal a jelentésekben, ellenőrizze, hogy az alkalom dátuma beleesik-e a jelentés szűrőiben kiválasztott időintervallumba.
:::
