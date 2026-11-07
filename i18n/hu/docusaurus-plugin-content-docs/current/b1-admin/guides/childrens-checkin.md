---
title: "Útmutató: A gyermekistentiszteleti bejelentkezés beállítása"
description: "Gyermekbejelentkezés beállítása a B1 Admin-ban: családok összekötése, korcsoportok, szolgálatok beállítása, névcímkék nyomtatása a B1 Checkin kioszkhoz."
---

# A gyermekistentiszteleti bejelentkezés beállítása

<div class="article-intro">

Ez az útmutató végigvezet mindazon lépéseken, amelyek szükségesek ahhoz, hogy gyermekistentiszteleti bejelentkező rendszer működjön a gyülekezetében – a családok adatbázisba vitelétől a korosztálynak megfelelő csoportok beállításán át a névcímkék vasárnap reggeli nyomtatásáig. A végére a szülők egy kiosztabletnél be tudják jelentkeztetni a gyermekeiket, és egyező biztonsági címkét kapnak.

</div>

## Oktatóvideó

<YouTube id="Ep9CBUcJwPI" title="Gyermekbejelentkezés beállítása a B1-ben" next="Részvétel rögzítése és nyomon követése a B1-ben" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Hozza létre gyülekezete fiókját a [admin.b1.church](https://admin.b1.church) oldalon
- Győződjön meg róla, hogy rendelkezik adminisztrátori jogosultsággal – szükség esetén lásd: [Szerepkörök és jogosultságok](../people/roles-permissions.md)
- Opcionálisan: készítsen CSV-fájlt a családokról, ha egy másik rendszerből költözik át

</div>

## 1. lépés: Családok hozzáadása az adatbázishoz

Mielőtt a bejelentkezés működhetne, a rendszernek tudnia kell a családokról. Minden gyermeket a háztartás funkción keresztül kell egy szülőhöz kapcsolni.

Kövesse a [Személyek hozzáadása](../people/adding-people.md) útmutatót legalább egy család felvételéhez. Ügyeljen az alábbiakra:

- Először a szülő(ket) adja hozzá
- Adja hozzá az egyes gyermekeket
- Kapcsolja őket ugyanahhoz a háztartáshoz a [háztartásszerkesztő](../people/adding-people.md#managing-households) segítségével

:::tip
Ha néhány családnál többet kell felvennie, használja a [CSV-importálás](../people/importing-data.md) eszközt a családok egyenkénti felvétele helyett. Percek alatt importálhatja a teljes névjegyzékét.
:::

## 2. lépés: Gyermekcsoportok létrehozása

A csoportok határozzák meg azokat az osztályokat, ahová a gyerekek bejelentkeznek. Általában korosztályonként érdemes egy csoportot létrehozni.

Kövesse a [Csoportok létrehozása](../groups/creating-groups.md) útmutatót az alábbi típusú csoportok létrehozásához:

- **Bölcsőde** (0–2 évesek)
- **Óvoda** (3–5 évesek)
- **Alsó tagozat** (6–10 évesek)

A neveket és a korosztályi tartományokat igazíthatja gyülekezete szolgálati szerkezetéhez.

## 3. lépés: Gyülekezeti helyszínek és istentiszteletek beállítása

A bejelentkezés meghatározott istentiszteleti időpontokhoz kötődik. Legalább egy helyszínt és egy istentiszteletet kell beállítania.

Kövesse a [Részvétel beállítása](../attendance/setup.md) útmutatót, és:

1. Adja hozzá a helyszínt (pl. „Főtemplom”)
2. Adjon hozzá egy istentiszteletet (pl. „Vasárnap délelőtt”)
3. Állítsa be az istentisztelet időpontját (pl. „9:00”), és – opcionálisan – egy [bejelentkezési menetrendet](../attendance/setup.md#setting-a-check-in-schedule), hogy a bejelentkezés automatikusan megnyíljon minden istentisztelet előtt, és az után záródjon be
4. Rendelje hozzá a gyermekcsoportokat az istentiszteletekhez

## 4. lépés: A bejelentkező alkalmazás beállítása

Most kösse össze mindezt a bejelentkező alkalmazás telepítésével egy táblagépen.

1. Telepítse a **B1 Checkin alkalmazást** – a letöltési hivatkozásokért lásd a [Bejelentkezés](../attendance/check-in.md) cikket
2. Jelentkezzen be B1 Admin hitelesítő adataival
3. Válassza ki a helyszínt és az istentisztelet időpontját

A részletes beállítási lépésekért olvassa el a teljes [Bejelentkezés](../attendance/check-in.md) cikket.

## 5. lépés: Hardver beszerzése

A kioszkhoz táblagépre van szüksége, a névcímkékhez pedig opcionálisan egy Brother címkenyomtatóra.

Minimálisan szükséges:
- **Egy Android vagy Amazon Fire táblagép** – lásd: [ajánlott táblagépek](../attendance/check-in.md#recommended-hardware)
- **Egy Brother címkenyomtató** – a QL-1110NWB ajánlott Bluetooth- és WiFi-támogatása miatt
- **Brother DK-1201 címkék** (1-1/7" x 3-1/2")

:::warning
A B1 Checkin alkalmazással kizárólag Brother címkenyomtatók kompatibilisek. Más márkájú nyomtatók nem fognak működni.
:::

## 6. lépés: Próba-bejelentkezés futtatása

Vasárnap reggel előtt végezzen egy próbafutást:

1. Nyissa meg a B1 Checkin alkalmazást a táblagépen
2. Válassza ki a helyszínt és a megfelelő istentisztelet időpontját
3. Keressen rá az egyik felvett családra
4. Jelentkeztessen be egy gyermeket, és ellenőrizze:
   - A részvétel megjelenik a B1 Adminban, a **Részvétel** menüpont alatt
   - Ha nyomtatót használ, a névcímke helyesen nyomtatódik ki

:::tip
Indítás előtt tanítsa be a fogadócsapat önkénteseit a bejelentkezési folyamatra. Általában egy gyors, 5 perces bemutató elegendő.
:::

## Kész!

A gyermekistentiszteleti bejelentkezés készen áll. A szülők megkereshetik a családjukat, kiválaszthatják a gyermekeiket, és bejelentkezhetnek a kioszknál. A részvétel automatikusan rögzítődik a B1 Adminban.

## Kapcsolódó cikkek

- [Személyek hozzáadása](../people/adding-people.md) – további családok felvétele, ahogy látogatnak
- [Csoportok létrehozása](../groups/creating-groups.md) – a gyermekcsoportok kezelése
- [Részvétel beállítása](../attendance/setup.md) – helyszínek és istentiszteletek konfigurálása
- [Bejelentkezés](../attendance/check-in.md) – a bejelentkező alkalmazás és a hardver részletes beállítása
- [Részvétel nyomon követése](../attendance/tracking-attendance.md) – bejelentkezési jelentések megtekintése
