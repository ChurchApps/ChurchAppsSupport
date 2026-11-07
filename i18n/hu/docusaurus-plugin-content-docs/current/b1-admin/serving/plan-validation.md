---
title: "Tervellenőrzés és értesítések"
description: "Ellenőrizze a szolgálati terveket betöltetlen pozíciókra, ütemezési ütközésekre és nem elérhető önkéntesekre a B1 Adminban, majd egy kattintással értesítse csapatát."
---

# Tervellenőrzés és önkéntesek értesítése

<div class="article-intro">

A B1 Admin vasárnap előtt automatikusan ellenőrzi a terveit, hogy nincs-e bennük probléma: betöltetlen pozíciók, időbeli ütközések és azok az önkéntesek, akik lezárták az adott napot. Ha minden rendben van, egyetlen kattintással értesítheti a teljes csapatot.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Hozzon létre egy [istentiszteleti tervet](./plans.md), és rendeljen hozzá önkénteseket a pozíciókhoz
- Adjon [istentiszteleti időpontokat](./plans.md) a tervhez, hogy az ütközésészlelés át tudja vizsgálni az átfedéseket
- Győződjön meg róla, hogy az önkénteseknek telepítve van a B1 Mobile alkalmazás, hogy push-értesítéseket kapjanak

</div>

## Az ellenőrző panel

Minden tervnek van egy **Ellenőrzés** panelje, amely automatikusan fut, miközben Ön építi a tervet. Három dolgot vizsgál:

### Betöltetlen pozíciók
Ha egy pozícióhoz több emberre van szükség, mint amennyi jelenleg hozzá van rendelve, az ellenőrző panel pontosan felsorolja, mi hiányzik, például *„Hangtechnikus: még 1 személy szükséges."* Egy pillantással láthatja, hogy a terv teljesen be van-e osztva, mielőtt megérkezik a hét.

### Időbeli ütközések
Ha egy önkéntest két olyan pozícióba is beosztottak, amelyek időben átfedik egymást ugyanabban a tervben, az ellenőrző panel jelzi az ütközést, például *„Jane Smith: időbeli ütközés a Dicsőítésvezető és a gyermek-check-in között a vasárnapi istentiszteleten."* Ez még azelőtt észreveszi a kettős foglalásokat, hogy vasárnap reggel gondot okoznának.

### Lezárt dátumok
Az önkéntesek a B1 Mobile alkalmazásban megadhatják azokat a dátumokat, amelyeken nem érnek rá. Ha valakit olyan tervbe osztanak be, amely valamelyik lezárt dátumára esik, az ellenőrző panel automatikusan megjeleníti az ütközést, hogy csereembert találhasson.

### Tervek közötti ütközések
Az ellenőrzés egyszerre az összes terve között is vizsgál. Ha ugyanazt az önkéntest két különböző tervbe is beosztották, amelyek időben átfedik egymást, például egy 9 órás és egy 10 órás istentisztelet, amely mindkettő 10:30-ig tart, a B1 Admin kettős foglalásként jelöli meg az illetőt a tervek között.

:::tip
Az ellenőrzés futtatásához semmit sem kell tennie. Minden alkalommal automatikusan frissül, amikor hozzáad vagy módosít egy beosztást. Csak figyelje a panelt, miközben építi a tervet.
:::

## Önkéntesek értesítése

Miután a terv elkészült, az ellenőrző panelről egyszerre értesítheti az összes hozzárendelt önkéntest.

1. Nyissa meg a tervet, és görgessen le az **Ellenőrzés** panelhez
2. Ha vannak még nem értesített önkéntesek, egy hivatkozást lát, amely megmutatja, hányan várnak értesítésre (pl. *„8 önkéntes értesítése"*)
3. Kattintson a hivatkozásra, hogy push-értesítést küldjön mindenkinek, akit még nem értesítettek
4. Az önkéntesek értesítést kapnak a telefonjukon, amely tájékoztatja őket a beosztásról, és arra kéri őket, hogy erősítsék meg a részvételüket

:::info
Csak azok az önkéntesek kerülnek bele, akiket még nem értesítettek. Ha később valakit hozzáad a tervhez, a hivatkozás újra megjelenik, így az újonnan hozzáadottat értesítheti anélkül, hogy a csapat többi tagját újra értesítené.
:::

### Megerősítési munkafolyamattal rendelkező tervek

Ha a terv beállításai egy [megerősítési munkafolyamatot](./workflows.md#serving-assignment-confirmations) határoznak meg, a panel ezt jeleníti meg: *„Az új kérések a megerősítési munkafolyamatot használják. Az alkalmazásbeli értesítések engedélyezve maradnak. A követő üzenetek addig küldődnek, amíg minden kérést el nem fogadnak vagy el nem utasítanak."* Ebben az esetben:

- Az értesítési hivatkozás csak azokat az önkénteseket számolja, akiket még nem értesítettek, és akik még nem válaszoltak.
- A hivatkozásra kattintva a szokásos alkalmazásbeli értesítés megy ki, és a munkafolyamat táblájára minden kéréshez egy kártya kerül. A munkafolyamat ezután elküldi az e-mailes és SMS-es követő üzeneteket, és ha szükséges, a kérést átadja valakinek, aki felhívja az illetőt.
- A tervet közzé kell tenni (nem csak ideiglenesen jelölni), és a munkafolyamatnak aktívnak kell lennie. Ellenkező esetben a panel ezt jeleníti meg: *„A kéréseket nem lehetett kiküldeni. Ellenőrizze, hogy a kiválasztott munkafolyamat aktív-e, és a terv közzé van-e téve, majd próbálja újra."*

:::warning
Az önkénteseknek telepítve kell lennie a B1.church mobilalkalmazás-élményt (PWA a kezdőképernyőn, vagy az elavult B1 Mobile natív alkalmazás azoknak, akiknél még megvan), és az értesítéseknek engedélyezve kell lenniük a push-értesítések fogadásához. A telepítési útmutatóért lásd: [Telepítés alkalmazásként (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Kapcsolódó cikkek

- [Istentiszteleti tervek](./plans.md)
- [Munkafolyamatok](./workflows.md)
- [A B1.church PWA telepítése](/docs/b1-church/getting-started/installing-pwa)
