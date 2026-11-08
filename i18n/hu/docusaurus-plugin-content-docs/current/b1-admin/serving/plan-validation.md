---
title: "Tervellenőrzés és értesítések"
description: "Ellenőrizze a szolgálati terveket a B1 Adminban a be nem töltött pozíciók, az ütemezési ütközések és a nem elérhető önkéntesek szempontjából, majd egyetlen kattintással push-értesítést küldhet a teljes csapatnak."
---

# Tervellenőrzés és önkéntesek értesítése

<div class="article-intro">

A B1 Admin automatikusan ellenőrzi a terveket a vasárnap előtt keletkező problémák szempontjából: be nem töltött pozíciók, ütemezési ütközések és azok az önkéntesek, akik megjelölték a dátumot nem elérhetőként. Ha minden rendben van, egyetlen kattintással értesítheti a teljes csapatát.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Hozzon létre egy [szolgálati tervet](./plans.md), és rendeljen önkénteseket a pozíciókhoz
- Adjon hozzá [istentiszteleti időpontokat](./plans.md) a tervhez, hogy az ütközésfelismerés át tudja vizsgálni az átfedéseket
- Gondoskodjon arról, hogy az önkéntesek telepítve legyen a [B1 App](../../b1-church/getting-started/installing-pwa.md) az eszközükön, hogy push-értesítéseket kaphassanak

</div>

## Az ellenőrző panel

Minden tervhez tartozik egy **Ellenőrzés** panel, amely automatikusan fut, miközben Ön összeállítja a tervet. Három dolgot vizsgál:

### Be nem töltött pozíciók
Ha egy pozícióhoz több személy szükséges, mint amennyi jelenleg hozzá van rendelve, az ellenőrző panel pontosan felsorolja, mi hiányzik, például: *„Hangtechnikus: 1 további személy szükséges.”* Első pillantásra láthatja, hogy a terv teljesen be van-e töltve, mielőtt megérkezik a hét.

### Ütemezési ütközések
Ha egy önkéntest két olyan pozícióhoz rendeltek, amelyek időben átfedik egymást ugyanazon a terven belül, az ellenőrző panel jelzi az ütközést, például: *„Jane Smith: időbeli ütközés az Istentiszteletvezető és a Gyermekek bejelentkezése között a vasárnapi istentiszteleten.”* Ez még azelőtt kiszűri a kettős foglalásokat, mielőtt vasárnap reggeli problémát okoznának.

### Nem elérhető dátumok
Az önkéntesek a B1 Appban megjelölhetik azokat a dátumokat, amikor nem állnak rendelkezésre. Ha valakit olyan tervhez rendelnek, amely valamelyik nem elérhető dátumára esik, az ellenőrző panel automatikusan megjeleníti az ütközést, hogy Ön helyettest találhasson.

### Tervek közötti ütközések
Az ellenőrzés az összes terve között is végigfut egyszerre. Ha ugyanazt az önkéntest két különböző tervhez rendelték, amelyek időben átfedik egymást, például egy 9 órás és egy 10 órás istentisztelet, amelyek 10:30-ig tartanak, a B1 Admin kettős foglalásként jelöli meg az illetőt a tervek között.

:::tip
Az ellenőrzés futtatásához nincs szükség semmilyen lépésre: minden alkalommal automatikusan frissül, amikor hozzáad vagy módosít egy hozzárendelést. Csak figyelje a panelt, miközben összeállítja a tervet.
:::

## Az önkéntesek értesítése

Amint a terv véglegesen elkészült, az ellenőrző paneltől közvetlenül értesítheti az összes hozzárendelt önkéntest egyszerre.

1. Nyissa meg a tervet, és görgessen le az **Ellenőrzés** panelhez
2. Ha vannak nem értesített önkéntesek, látni fog egy hivatkozást, amely megmutatja, hányan értesítendők (például: *„8 önkéntes értesítése”*)
3. Kattintson a hivatkozásra, hogy push-értesítést küldjön mindenkinek, akit még nem értesítettek
4. Az önkéntesek értesítést kapnak a telefonjukon, amely tájékoztatja őket arról, hogy beosztották őket, és felkéri őket a részvétel megerősítésére

:::info
Csak azok az önkéntesek kapnak értesítést, akiket még nem értesítettek. Ha később ad hozzá valakit a tervhez, a hivatkozás újra megjelenik, így az újonnan hozzáadottat értesítheti anélkül, hogy a többieket újra értesítené.
:::

### Megerősítési munkafolyamattal rendelkező tervek

Ha a terv beállításai egy [megerősítési munkafolyamatot](./workflows.md#serving-assignment-confirmations) neveznek meg, a panel ezt jeleníti meg: *„Az új kérések a megerősítési munkafolyamatot használják. Az alkalmazás-értesítések engedélyezve maradnak. A további emlékeztetők addig állnak le, amíg minden kérést el nem fogadnak vagy el nem utasítanak.”* Ebben az esetben:

- A értesítési hivatkozás csak azokat az önkénteseket számolja, akiket még nem értesítettek, és akik még nem válaszoltak.
- Kattintásra elküldi a szokásos alkalmazáson belüli értesítést, és a munkafolyamat táblájára minden kéréshez létrehoz egy kártyát. A munkafolyamat ezután elküldi az e-mailes és SMS-es emlékeztetőket, és szükség esetén a kérést továbbadja valakinek, aki felhívja az illetőt.
- A tervet közzé kell tenni (nem csak ideiglenesen tervezni), a munkafolyamatnak pedig aktívnak kell lennie. Ellenkező esetben a panel ezt jeleníti meg: *„A kéréseket nem sikerült kiadni. Ellenőrizze, hogy a kiválasztott munkafolyamat aktív-e, és a terv közzé van-e téve, majd próbálja újra.”*

:::warning
Ahhoz, hogy az önkéntesek push-értesítéseket kapjanak, a B1 Appnak telepítve kell lennie a kezdőképernyőjükön, és az értesítéseknek engedélyezve kell lenniük. A beállítási útmutatóért lásd: [Telepítés alkalmazásként (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Kapcsolódó cikkek

- [Szolgálati tervek](./plans.md)
- [Munkafolyamatok](./workflows.md)
- [A B1.church PWA telepítése](/docs/b1-church/getting-started/installing-pwa)
