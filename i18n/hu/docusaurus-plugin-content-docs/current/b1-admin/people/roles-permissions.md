---
title: "Szerepkörök hozzárendelése"
---

# Szerepkörök hozzárendelése

<div class="article-intro">

A B1 Admin szerepkör-alapú jogosultsági rendszert használ, amellyel szabályozhatja, hogy csapata egyes tagjai mit láthatnak és mit tehetnek meg. Szerepkörök hozzárendelésével pontosan azokhoz a területekhez férhetnek hozzá a munkatársak és önkéntesek, amelyekre szükségük van, többhöz nem. A szerepkörök megfelelő kezelése biztonságban tartja egyházi adatait, és hatékonyabb munkát tesz lehetővé a csapat számára.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A B1 Adminban **Domain Admin** hozzáféréssel kell rendelkeznie, vagy olyan szerepkörrel, amely jogosultságot ad a **Beállítások** kezeléséhez.
- Azoknak a személyeknek, akiknek szerepkört szeretne rendelni, már szerepelniük kell a névjegyzékben. Ha előbb fel kell venni őket, olvassa el a [Személyek hozzáadása](adding-people.md) című részt.

</div>

## A szerepkörök működése

A szerepkör olyan jogosultságok halmaza, amelyet egy vagy több felhasználónak rendelhet hozzá. Például létrehozhat egy „Pénzügyi csapat” szerepkört, amely hozzáférést biztosít a [adományrekordokhoz](../donations/recording-donations.md), vagy egy „Bejelentkezés-önkéntes” szerepkört, amely csak a [jelenléti funkciókhoz](../attendance/check-in.md) enged hozzáférést.

Minden szerepkör a B1 Admin egyes területeihez való hozzáférést szabályozza, többek között:

- **Személyek** – tagprofilok megtekintése és szerkesztése. A személyi rekord Jegyzetek szakaszának megnyitásához az **Személyek szerkesztése** jogosultság szükséges, a Bizalmas jegyzetek szakaszhoz való hozzáférést pedig külön **Bizalmas jegyzetek megtekintése** jogosultság szabályozza (lelkigondozási, személyes előzményekre vonatkozó és hasonló érzékeny jegyzetek esetén). A **Csak a személyek nevének megtekintése** jogosultság lehetővé teszi, hogy valaki csak névvel keressen személyeket (csak a nevet, fényképet és tagsági állapotot látja), a teljes névjegyzék megtekintése nélkül. Ha a **Jelenléti adatok megtekintése** vagy a **Jelenléti adatok szerkesztése** jogosultsággal együtt használják, az önkéntes megnyithatja a **Csoportok** részt, és névvel láthatja az osztályok névsorát; a **Jelenléti adatok szerkesztése** jogosultsággal pedig [jelenlétet is rögzíthet](../attendance/recording-attendance.md). Lásd: [Csak a személyek nevei](../settings/roles-permissions.md#people-names-only).
- **Adományok** – adománybevételek és pénzügyi jelentések kezelése. Az **Adományok rögzítése** egy szűkebb lehetőség a számláló csapatok számára: lehetővé teszi, hogy valaki adományokat rögzítsen, de csak azokban a [kötegekben](../donations/batches.md#who-can-change-a-batch), amelyek még nyitva vannak.
- **Jelenlét** – jelenléti adatok rögzítése és megtekintése
- **Űrlapok** – [egyéni űrlapok](../forms/creating-forms.md) létrehozása és kezelése
- **Csoportok** – [csoporttagságok](../groups/group-members.md) és naptárak kezelése
- **Beállítások** – egyházszintű beállítások konfigurálása

:::warning
A **Domain Adminok** a B1 Admin minden területéhez teljes hozzáféréssel rendelkeznek. Jogosultságaik nem szerkeszthetők és nem korlátozhatók. Ezt a szerepkört csak az elsődleges adminisztrátorok számára használja.
:::

## Szerepkörök megtekintése és kezelése

1. Nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a B1 Admin bal felső sarkában lévő keresősáv), és bontsa ki a **Beállítások** menüpontot.
2. Kattintson a **Szerepkörök** elemre.
3. Megjelenik az egyházához beállított összes szerepkör listája, a **Tagok** oszlopban pedig az látható, hogy az egyes szerepkörökben hány felhasználó van.
4. Kattintson bármelyik szerepkörre, hogy megtekintse a tagjait és jogosultságait.

## Felhasználók hozzáadása szerepkörhöz

1. Az Ugrás menüben válassza a **Beállítások > Szerepkörök** lehetőséget.
2. Kattintson arra a szerepkörre, amelyhez felhasználót szeretne hozzáadni.
3. A **Tagok** szakaszban keresse meg a személyt névvel.
4. Kattintson a **Hozzáadás** gombra, hogy hozzárendelje a szerepkörhöz.

A felhasználó a következő bejelentkezésekor már rendelkezik majd az adott szerepkörhöz tartozó összes jogosultsággal.

## Szerepkör jogosultságainak szerkesztése

1. Az Ugrás menüben válassza a **Beállítások > Szerepkörök** lehetőséget.
2. Kattintson a módosítani kívánt szerepkörre.
3. A **Jogosultságok** szakaszban jelölje be vagy törölje a jelölést azoknál a területeknél, amelyekhez a szerepkörnek hozzá kell férnie vagy nem kell hozzáférnie. Minden jogosultsági csoport mutatja, hogy abból hány jogosultság van bejelölve (például **2 / 5**).
4. Minden módosítás azonnal mentésre kerül, amint bejelöli vagy törli a jelölést.

:::tip
Kövesse a legkisebb jogosultság elvét: minden szerepkörnek csak a valóban szükséges jogosultságokat adja meg. Ez biztonságban tartja adatait, és csökkenti a véletlen módosítások esélyét.
:::

## Gyakori szerepkör-példák

- **Irodai munkatársak** – hozzáférés a Személyekhez, Adományokhoz, Jelenléthez és Űrlapokhoz
- **Csoportvezetők** – hozzáférés kizárólag a [Csoportokhoz](../groups/creating-groups.md)
- **Bejelentkezés-önkéntesek** – a **Bejelentkezés** jelenléti jogosultság, amelyre annak a fióknak van szüksége, amellyel a [bejelentkező kioszkba](../attendance/check-in.md) jelentkeznek be
- **Pénzügyi csapat** – hozzáférés az [Adományokhoz](../donations/recording-donations.md) és a jelentésekhez
- **Számláló csapat** – **Adományok rögzítése** és **Adományok megtekintése**, így az önkéntesek nyitott kötegekbe rögzíthetik a perselypénzt anélkül, hogy az adakozási összesítőket látnák

A donáció- és személyjogosultságokról részletesebben lásd: [Szerepkörök és jogosultságok](../settings/roles-permissions.md).
