---
title: "Szerepkörök és jogosultságok"
description: "Szerepkörök a B1 Adminban: szabályozza, mit láthatnak és módosíthatnak munkatársak és önkéntesek, az adományoktól a személyekig és csoportokig."
---

# Szerepkörök és jogosultságok

<div class="article-intro">

A szerepkörökkel szabályozhatja, hogy a különböző felhasználók mit érhetnek el a ChurchApps-fiókjában. Egyedi szerepköröket hozhat létre munkatársaknak, önkénteseknek és más csapattagoknak, mindegyiknek saját hozzáférési szinttel, így adatai biztonságban maradnak.

</div>

## Oktatóvideó

<YouTube id="ZzCIkinVMnE" title="Szerepkörök, jogosultságok és csapattagok meghívása a B1-ben" next="Szolgáltatások és jelenlét beállítása a B1-ben" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Domain Admin hozzáférésre vagy olyan szerepkörre van szüksége, amely jogosult a szerepkörök kezelésére
- Készítsen listát a csapattagokról és arról, milyen területekhez kell hozzáférniük
- Tekintse át alább az elérhető jogosultságkategóriákat, és tervezze meg szerepköreit

</div>

## Szerepkörök elérése

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), és bontsa ki a **Beállítások** menüpontot.
2. Kattintson a **Szerepkörök** gombra.
3. A Szerepkörök oldalon megjelennek egyháza jelenleg definiált szerepkörei. A **Tagok** oszlop azt mutatja, hány felhasználó van az egyes szerepkörökben, a **(Mindenki)** sorban pedig a **Minden felhasználó** látható.

## A Szerepkörök oldal felépítése

A Szerepkörök oldal két panelre oszlik:

- **Bal oldal** – A kiválasztott szerepkörhöz rendelt tagok listáját mutatja.
- **Jobb oldal** – A szerepkörhöz beállítható jogosultságokat jeleníti meg.

Kattintson bármely szerepkör nevére a tagok és jogosultságok megtekintéséhez és kezeléséhez.

## Felhasználók hozzáadása szerepkörhöz

1. Válassza ki azt a szerepkört, amelyhez tagokat szeretne hozzáadni.
2. A bal oldalon lévő **keresőmezőben** keresse meg a kívánt személyt.
3. Válassza ki a személyt a keresési eredmények közül.
4. A személy azonnal hozzáadódik a szerepkörhöz.

## Felhasználók eltávolítása szerepkörből

1. Válassza ki azt a szerepkört, amelyben a törölni kívánt felhasználó szerepel.
2. Keresse meg a személyt a bal oldali tagok listájában.
3. Kattintson a neve melletti **eltávolítás gombra**.

## Jogosultságok beállítása

Minden szerepkörhöz hozzáférés adható a B1 Admin meghatározott területeihez. Az **Jogosultságok szerkesztése** panelen a jogosultságok kibontható szakaszokba vannak csoportosítva, például **Jelenlét**, **Tartalom**, **Adományok**, **Űrlapok és tervek**, **Leckék**, **Üzenetküldés**, **Személyek és csoportok** és **Feladatok**. Írjon a **Jogosultságok szűrése** mezőbe, hogy csak az egyezőket jelenítse meg.

Jelölje be vagy törölje a jelölést egy jogosultság mellett, hogy megadja vagy elvegye azt a szerepkörtől. Minden szakaszcím megmutatja, hány jogosultsággal rendelkezik a szerepkör, például **2 / 5**, és ez a szám frissül, ahogy a jelölőnégyzeteket bekapcsolja vagy kikapcsolja.

### Adományokkal kapcsolatos jogosultságok

Az **Adományok** szakasz az alábbi jogosultságokat tartalmazza:

- **Adomány-összesítések megtekintése** – Az Adományok szakasz megtekintése, beleértve az Összesítés, Kötegek, Alapok, Kampányok és Adóigazolások oldalakat.
- **Adományok megtekintése** – Egyes adományok megtekintése, például egy köteg adományai.
- **Adományok szerkesztése** – Teljes hozzáférés: adományok és kötegek hozzáadása, szerkesztése és törlése, valamint [kötegek lezárása és újranyitása](../donations/batches.md#closing-and-reopening-a-batch).
- **Adományok rögzítése** – Kötegek hozzáadása, valamint adományok rögzítése, szerkesztése és törlése, de csak olyan kötegekben, amelyek még nyitva vannak. Akik csak ezzel a jogosultsággal rendelkeznek, nem törölhetnek kötegeket, nem zárhatják le vagy nyithatják meg őket, és nem módosíthatják az online adakozáson keresztül érkezett adományokat.
- **Beállítások szerkesztése** – Az adománybeállítások kezelése.

Aki rendelkezik az **Adományok rögzítése** jogosultsággal, de nincs meg neki az **Adomány-összesítések megtekintése** jogosultsága, az Adományok alatt csak a **Kötegek** oldalt látja. Egy számláló csapat szerepkörének adja meg mind az **Adományok rögzítése**, mind az **Adományok megtekintése** jogosultságot, hogy megnyithassák a kötegeket, és láthassák az általuk rögzített adományokat. A részletekért lásd: [Ki módosíthat egy köteget](../donations/batches.md#who-can-change-a-batch).

### Csak nevek megtekintése

A **Személyek és csoportok** szakasz tartalmazza a **Csak a személyek nevének megtekintése** jogosultságot. Ezt olyan önkénteseknek használja, akiknek névvel kell embereket keresniük – például egy keresőmezőből való kiválasztáshoz –, anélkül hogy hozzáférnének a teljes névjegyzékhez. Csak ezzel a jogosultsággal valaki:

- Kereshet személyeket név szerint, és láthatja a nemrég hozzáadott személyek listáját, de minden személynél csak a nevet, a fényképet és a tagsági állapotot látja
- Nem kereshet e-mail-cím alapján, nem láthatja az elérhetőségeket, és nem nyithatja meg a **Személyek** névjegyzéket

A **Csak a személyek nevének megtekintése** jogosultságot párosítsa a **Jelenlét megtekintése** vagy **Jelenlét rögzítése** jogosultsággal azoknál az önkénteseknél, akik órai jelenlétet vezetnek. Ekkor a menüjükben a **Személyek** a **Csoportok** oldalt nyitja meg, ahol megnyithatják az **Összes csoport** listát, és láthatják az egyes órák tagjainak nevét és alkalmait. A **Jelenlét rögzítése** jogosultsággal [jelenlétet is rögzíthetnek](../attendance/recording-attendance.md), és névkereséssel látogatókat is hozzáadhatnak. A nevek nem linkek a személyi adatlapokra, és a bizalmas csoportok rejtve maradnak, hacsak az önkéntes nem tagja azoknak.

A B1 Admin elrejti azokat a hivatkozásokat és gombokat, amelyekhez a szerepkörnek nincs meg a szükséges jogosultsága. Például az **Összes csoport** lista csak azok számára érhető el, akik szerkeszthetik a csoportokat, megtekinthetik a csoporttagokat vagy a személyeket, illetve akiknek van **Csak a személyek nevének megtekintése** jogosultságuk a **Jelenlét megtekintése** vagy **Jelenlét rögzítése** jogosultsággal együtt (a többieket visszairányítja az Irányítópultra). A jelenléti beállítások csak a **Szolgáltatások szerkesztése** jogosultsággal jelennek meg, egy csoport **E-mail** gombja csak a **Csoporttagok szerkesztése** jogosultsággal rendelkezőknek jelenik meg (ez az a jogosultság, amely a csoportos e-mail küldéséhez szükséges), a csoportnévsor nyomtatásához a **Csoporttagok megtekintése** jogosultság vagy az adott csoport vezetése szükséges, naptáresemény törléséhez pedig a **Tartalom szerkesztése** jogosultság kell (vagy saját függőben lévő kérelem visszavonása).

### Check-in kioszk fiókok

A [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kioszkba bejelentkező fióknak a **Jelenlét** szakaszban a **Bejelentkezés** jogosultságra (vagy a **Jelenlét rögzítése** jogosultságra) van szüksége. Csak a **Bejelentkezés** jogosultsággal a kioszk névvel vagy telefonszámmal kereshet családokat, be- és kijelentkeztethet, és megmutathatja, ki viheti haza a gyermeket, anélkül hogy hozzáférne a Személyek névjegyzékhez.

A **Bejelentkezés** jogosultság már nem adható meg a **(Mindenki)** soron keresztül. Más jogosultságokkal rendelkező szerepkörben lévő személy ettől még nem futtathatja a kioszkot; adja hozzá a **Bejelentkezés** jogosultságot egy olyan szerepkörhöz, mint például a „Check-in önkéntesek”, és tegye bele a kioszk-fiókokat.

:::warning
A **Domain Adminok** teljes hozzáféréssel rendelkeznek a ChurchApps-fiókjuk minden területéhez. Jogosultságaik nem módosíthatók és nem korlátozhatók. Ezt a szerepkört csak a legmegbízhatóbb adminisztrátorok számára használja.
:::

:::tip
Hozzon létre konkrét szerepköröket, például „Pénztáros” csak **Adományok** hozzáféréssel, „Számláló csapat” **Adományok rögzítése** és **Adományok megtekintése** jogosultsággal, vagy „Check-in önkéntes” csak **Jelenlét** hozzáféréssel. Ez a legkisebb jogosultság elvét követi, és biztonságban tartja adatait. Arról, hogyan védi a ChurchApps az Ön adatait, bővebben a [Adatbiztonság](./data-security.md) oldalon olvashat.
:::
