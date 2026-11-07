---
title: "Adományok rögzítése"
description: "Adományok rögzítése a B1 Admin-ban: tétel létrehozása, ajándékok egyenkénti bevitele, CSV-import, vagy egyetlen ajándék rögzítése az adakozó profiljából."
---

# Adományok rögzítése

<div class="article-intro">

Az adományok rögzítése a B1 Adminban a Kötegek (Batches) rendszerén keresztül történik. Létrehozol egy kötegot, amely egy gyűjtést jelöl (például egy vasárnapi perselyezést), majd ehhez a kötegehez egyenként hozzáadod az adományokat. Így az adománynyilvántartás rendezett marad, és könnyen egyeztethető.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Állítsd be az [alapokat](funds.md), hogy az adományokat a megfelelő kategóriákhoz rendelhesd
- Hozz létre egy [köteget](batches.md), amely a bevinni kívánt adományokat tartalmazza
- Győződj meg róla, hogy az adakozók szerepelnek a [személyek címtárában](../people/adding-people.md), hogy az adományok rögzítésekor kereshess rájuk
- Az adományok köteghez adásához **Adományok szerkesztése** jogosultságra, vagy az **Adományok rögzítése** és **Adományok megtekintése** jogosultság együttesére van szükséged (lásd: [Ki módosíthat egy köteget?](batches.md#who-can-change-a-batch))

</div>

## Köteg létrehozása és adományok hozzáadása

1. A **B1 Adminban** nyisd meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsd ki az **Adományok** pontot, majd kattints a **Kötegek** elemre.
2. Kattints az oldal tetején lévő **Köteg hozzáadása** gombra.
3. Adj nevet a kötegnek (például „Vasárnapi perselyezés - jan. 5."), és válaszd ki a dátumot. Kattints a **Mentés** gombra.
4. Az új köteg megjelenik a listában, nulla adománnyal és 0,00 $ összeggel.
5. Kattints a **köteg nevére** a megnyitásához.

## Egyedi adományok rögzítése

1. A köteg részletező oldalán az adományrögzítő panel az adománylista mellett jelenik meg. A **Személy vagy névtelen kiválasztása** alatt írd be az adakozó nevét a keresőmezőbe, vagy kattints a **Névtelen** gombra. (Az oldal tetején lévő **Adomány hozzáadása** gombra kattintva a panelhez ugrasz.)
2. Miután kiválasztottál egy személyt, az űrlapon a következő mezők jelennek meg: **Dátum**, **Mód** (Csekk, Készpénz, Kártya vagy Természetbeni), **Alap**, **Megjegyzések**, **Összeg**, valamint **Csekkszám** (kártyás adománynál a **Kártya utolsó 4 számjegye**, természetbeni adománynál pedig a **Tétel** mező, amellyel leírhatod az adományt). Az adakozó neve mellett a **Módosítás** gombra kattintva másik személyt választhatsz.
3. Töltsd ki az adatokat, majd kattints az **Adomány hozzáadása** gombra (vagy nyomd meg az Entert).
4. Az adomány bekerül az adománylistába, az űrlap pedig visszaáll, hogy a következőt is rögzíthesd.

:::info
Ha a köteg [le van zárva](batches.md#closing-and-reopening-a-batch), a bejegyzőpanel és a **Szerkesztés** hivatkozások el vannak rejtve azok elől, akiknek nincs **Adományok szerkesztése** jogosultságuk, a köteg tetején pedig értesítés jelzi, hogy le van zárva. Kérd meg valakit, akinek van **Adományok szerkesztése** jogosultsága, hogy nyissa meg újra.
:::

:::tip
Több adományt is gyorsan rögzíthetsz egymás után anélkül, hogy elhagynád a köteg oldalát. Minden bejegyzés után az űrlap visszaáll, így hatékonyan haladhatsz végig egy csekkekből vagy borítékokból álló köteggel.
:::

## Adományok importálása CSV-fájlból {#importing-donations-from-a-csv-file}

Ha az adatok már táblázatban vannak – például egy másik adománykezelő rendszerből exportálva, vagy a számláló csapat összesítő lapján –, minden adományt külön begépelés helyett importálhatod őket egy kötegbe.

1. Nyisd meg a köteget, és kattints az oldal tetején lévő **CSV importálása** gombra. (A gomb akkor jelenik meg, ha módosíthatod a köteget, és az egyházadnak legalább egy [alapja](funds.md) van.)
2. Kattints a **CSV-fájl kiválasztása** gombra, és válaszd ki a fájlt. A fájlnak fejlécsorra van szüksége, az oszlopok sorrendje pedig tetszőleges:
   - **Összeg** (kötelező; a `Total` név is működik) – A pénznemszimbólumokat és a vesszőket a rendszer figyelmen kívül hagyja, így a `$1,250.00` is megfelelő. Az összegnek nagyobbnak kell lennie nullánál.
   - **Dátum** – Használj olyan formátumot, mint a `2026-10-25` vagy a `10/25/2026`. Ha üresen hagyod, a köteg dátumát használja a rendszer.
   - **Alap** – Az alap neve, a kis- és nagybetűk megkülönböztetése nélkül. Ha üresen hagyod, az első alapodat használja a rendszer.
   - **Mód** – **Csekk**, **Készpénz**, **Kártya** vagy **Természetbeni**. Ha üresen hagyod, a **Csekk** lesz az alapértelmezett.
   - **Csekkszám** – A csekk száma (vagy egyéb fizetési adat).
   - **Megjegyzések**
   - **E-mail**, **Név**, vagy **Keresztnév** és **Vezetéknév** – Ezek alapján párosítja a rendszer az adakozót az adatbázisban lévő személlyel. A „Smith, John” alakban megadott nevet a rendszer „John Smith”-ként olvassa.
3. Ellenőrizd az előnézetet. Minden sor megjeleníti a sorszámát, a fájlban szereplő adakozót, az **Egyezés** oszlopot, az alapot és az összeget:
   - Egy személy neve azt jelenti, hogy az adakozó egyezést talált. A B1 először e-mail-cím alapján párosít, majd pontos név alapján, és csak akkor, ha pontosan egy személy illik rá.
   - A **Nem található – névtelen** azt jelenti, hogy nem található egyértelmű egyezés. Az adomány névtelenként kerül importálásra, a megjegyzéseihez pedig hozzáadódik az „Importálva mint:” sor az adakozó nevével, hogy később hozzárendelhesd.
   - A piros üzenet, például **Érvénytelen összeg**, **Ismeretlen alap**, **Ismeretlen mód** vagy **Érvénytelen dátum**, azt jelenti, hogy az adott sort a rendszer kihagyja. Javítsd ki a fájlt, és válaszd ki újra, hogy a sor bekerüljön.
4. Kattints az **Importálás** gombra (a gombon látszik, hány sort importál a rendszer). Az adományok bekerülnek a kötegbe.

:::tip
Az importálás után bármelyik névtelen adománynál használhatod a **Szerkesztés** gombot, és kiválaszthatod a megfelelő személyt. Az „Importálva mint:” megjegyzés megmutatja, hogy a fájl szerint kitől származik.
:::

## Ajándék rögzítése egy személy nyilvántartásából

Ha egyetlen ajándékot szeretnél rögzíteni köteg megnyitása nélkül, nyisd meg az adakozó nyilvántartását a **Személyek** menüben, és kattints az **Ajándék rögzítése** gombra (az adománykimutatásban vagy a személy adományi nézetében).

1. Állítsd be a **Dátumot** és az **Összeget**.
2. Válaszd ki az **Alapot** és a **Módot** (Csekk, Készpénz, Kártya vagy Természetbeni), és szükség esetén add meg a **Csekkszámot**, a **Kártya utolsó 4 számjegyét** vagy a **Tételt** (természetbeni ajándéknál).
3. Opcionálisan adj hozzá **Megjegyzéseket**, majd kattints a **Mentés** gombra.

Az ajándék a megadott dátumhoz tartozó kötegbe kerül. Ha az adott dátumhoz még nincs köteg, a rendszer automatikusan létrehoz egyet, amelynek neve a dátum lesz.

## Adomány elosztása több alap között

Előfordul, hogy egy adakozó egyetlen tranzakcióval több alapnak ad. Ennek kezeléséhez:

1. A bejegyzőpanel alatt kattints a **teljes adományszerkesztő** hivatkozásra (vagy kattints a meglévő adománysor **Szerkesztés** gombjára).
2. A teljes szerkesztőben adj összegeket különböző alapokhoz. A teljes összeg automatikusan kiszámításra kerül az egyes alapok összegeiből.
3. Kattints a **Mentés** gombra az adomány frissítéséhez.

:::info
Az adomány több alap közötti elosztása gyakori, ha az adakozó egyetlen csekket ír több célra, például az Általános alapra és a Misszióra.
:::

## Adományok szerkesztése és törlése

Az adomány szerkesztéséhez kattints a köteg adott sorában lévő **Szerkesztés** gombra. Módosíthatod a dátumot, az összeget, az alapot, a fizetési módot (Csekk, Készpénz, Kártya vagy Természetbeni), vagy bármely más részletet. Természetbeni adománynál a szerkesztő a részletmezőt **Tétel** névvel jelöli, hogy leírhasd, mit adtak. Ha végeztél, kattints a **Mentés** gombra.

:::tip
Az oldal tetején a köteg neve alatti sor automatikusan frissül, és megmutatja a köteg dátumát, az ajándékok számát és a teljes összeget, ahogy bejegyzéseket adsz hozzá vagy szerkesztesz. Ezt használd a befizetési szelvénnyel való egyeztetéshez.
:::

## Adomány visszatérítése

Ha az adakozót tévedésből terhelték meg, vagy visszakéri a pénzét, a teljesített adományt közvetlenül a szerkesztőképernyőjéről visszatérítheted – nem kell a fizetési átjáró irányítópultjára menned.

1. Nyisd meg az adományt, és kattints a **Szerkesztés** gombra.
2. Kattints a **Visszatérítés** gombra, amely az űrlap alján a Törlés mellett található.
3. Erősítsd meg a párbeszédpanelt: „Teljes összegben visszatéríted ezt az adományt a fizetési átjárón keresztül? Ez nem vonható vissza.”

Az adományt a rendszer teljes összegben, az eredeti fizetési átjárón keresztül téríti vissza, és az adománylistákban **Visszatérítve** státuszt kap.

:::warning
A visszatérítés csak teljes összegű lehet – a B1 Adminból nincs lehetőség részleges összeg visszatérítésére. A visszatérítés megerősítés után szintén nem vonható vissza.
:::

:::info
A **Visszatérítés** gomb csak azoknál az adományoknál jelenik meg, amelyeket online fizettek (van átjárós tranzakciójuk), és amelyek még **Teljesített** állapotban vannak. A kézzel rögzített adományoknak (készpénz, csekk) nincs visszatéríthető átjárós tranzakciójuk – ezeket szerkeszd vagy töröld.
:::

## Egyetlen ajándék nyugtájának nyomtatása

Amikor valaki csekket ad át, eseményért vagy pólóért fizet, vagy egy látogató szervezet hoz adományt, nyomtathatsz nyugtát csak az adott ajándékról, ahelyett hogy az egész köteget vagy az év végi kimutatást nyomtatnád.

1. Nyisd meg az adományt tartalmazó köteget.
2. Kattints az adomány sorában a **Szerkesztés** melletti **Nyugta** gombra. Az Adomány szerkesztése űrlap alján is kattinthatsz a **Nyugta** gombra.
3. Kattints a **Nyomtatás** gombra, vagy a **Bezárás** gombra a visszatéréshez.

A nyugta ugyanazt az elrendezést használja, mint az adománykimutatás: az egyházad és az adakozó (vagy „Névtelen”), az ajándék dátuma és módja, minden alap és összeg, a megjegyzés, az egyházad adományozási megjegyzése, valamint a hivatalos nyugtablokk, ha beállítottad a **Kimutatás formátumát** (lásd: [Adománykimutatások](giving-statements.md)). A blokkban szereplő nyugtaszám az adomány azonosítója.

:::info
A „nincs áru vagy szolgáltatás” szöveg csak akkor kerül kinyomtatásra, ha az ajándék minden alapja adólevonható. Ha az ajándék bármely része olyan alapba került, amely nem adólevonható – például eseménydíj vagy vásárlás –, a nyugtáról ez a szöveg elmarad, így az fizetésként, nem pedig adományként olvasható.
:::

:::tip
Az online adományok automatikus köszönőlevelet kapnak, így a nyugta főként a kézzel rögzített ajándékoknál hasznos.
:::

## Következő lépések

- Ellenőrizd a bejegyzéseidet az [Adományjelentések](donation-reports.md) segítségével a pontosság érdekében
- Év végén készíts [Adománykimutatásokat](giving-statements.md) az adakozóidnak
