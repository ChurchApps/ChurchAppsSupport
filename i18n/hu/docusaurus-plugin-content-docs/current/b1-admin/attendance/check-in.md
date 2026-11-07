---
title: "Bejelentkezés"
---

# Bejelentkezés

<div class="article-intro">

A B1 Admin támogatja az önbejelentkezést istentiszteleteken a kísérő **B1 Checkin** alkalmazáson keresztül. A tagok érkezéskor maguk és családtagjaik számára is bejelentkezhetnek kioszkokon vagy erre a célra szolgáló eszközökön, ami gyorsítja a folyamatot, és csökkenti az önkéntesek terhelését. Minden bejelentkezés automatikusan jelenléti rögzítésként kerül nyilvántartásba.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A gyülekezeti helyszíneket, istentiszteleti időpontokat és csoportokat a [Jelenléti beállítások](setup.md) között kell beállítani.
- Szüksége van [személyekre az adatbázisában](../people/adding-people.md), a [háztartásokkal](../people/adding-people.md#managing-households) együtt, hogy a családok közösen jelentkezhessenek be.
- Szüksége lesz egy táblagépre, és opcionálisan egy Brother címkenyomtatóra (lásd alább a [hardverajánlásokat](#recommended-hardware)).

</div>

## Hogyan működik

A B1 Checkin alkalmazás a B1 Admin jelenléti beállításaihoz kapcsolódik. Amikor egy tag bejelentkezik, a jelenléte automatikusan a megfelelő helyszínhez, istentiszteleti időponthoz és csoporthoz rögzítődik. A bejelentkezési rendszert használó személyek jelenlétét nem kell kézzel rögzíteni.

## A bejelentkezés beállítása

1. **Először állítsa be a jelenléti struktúrát.** A B1 Adminban lépjen a **Személyek > Jelenlét** menüpontra, majd kattintson a **Beállítás** gombra, és győződjön meg róla, hogy a helyszínek, istentiszteleti időpontok és csoportok be vannak állítva. A bejelentkezési alkalmazás erre a beállításra épül. Opcionálisan minden istentiszteleti időponthoz beállíthat egy [bejelentkezési ütemezést](setup.md#setting-a-check-in-schedule), hogy a bejelentkezés minden héten automatikusan nyíljon és záruljon. Az ütemezések az istentisztelet helyszínének időzónáját használják, vagy a gyülekezete időzónáját, ha a helyszínhez nincs időzóna beállítva. A kioszk a lezárt időablakkal rendelkező istentiszteleti időpontokat **Lezárva** jelzéssel jeleníti meg, és megmondja a családoknak, mikor nyílik meg a bejelentkezés. Részletekért lásd a [Jelenléti beállításokat](setup.md).
2. **Telepítse a B1 Checkin alkalmazást** a használni kívánt eszközökre. Az alkalmazás az alábbi platformokon érhető el:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung táblagépek:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire táblagépek:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Jelentkezzen be a B1 Checkin alkalmazásba** olyan fiókkal, amelynek van **Checkin** jelenléti jogosultsága (vagy **Jelenlét szerkesztése**). Lásd a [Bejelentkező kioszk fiókok](../settings/roles-permissions.md#check-in-kiosk-accounts) részt.
4. **Válassza ki a helyszínt és az istentiszteleti időpontot** az aktuális összejövetelhez.
5. A tagok most már megkereshetik a nevüket az eszközön, és bejelentkezhetnek.

:::tip
Helyezze a bejelentkező eszközöket jól látható, könnyen elérhető helyekre, például a templom bejáratához vagy az üdvözlőpulthoz. Egy rövid bejelentés az istentisztelet alatt segít a tagoknak tudni, hogy ez a lehetőség elérhető.
:::

:::tip
Ha gyülekezetének több helyszíne van, a beállítást minden helyszínre meg kell ismételnie a [Jelenléti beállításokban](setup.md). Minden bejelentkező eszköz beállítható más-más helyszínhez.
:::

## Ajánlott hardver

**Táblagépek** — ezek mindegyike jól működik az alkalmazással:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Nagy képernyő:** Samsung Galaxy Tab A8 10,5"
- **Költségkímélő:** Amazon Fire HD 10

**Nyomtatók** — a bejelentkezés Brother címkenyomtatókkal működik a névcímkék nyomtatásához:

- **Legjobb:** Brother QL-1110NWB (több táblagépet is támogat Bluetooth-on és WiFi-n keresztül)
- **Jó:** Brother QL-810W (több táblagépet támogat WiFi-n keresztül)
- **Költségkímélő:** Brother QL-1100 (csak WiFi)

**Címkék:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
A B1 Checkin alkalmazással csak Brother címkenyomtatók kompatibilisek. Más márkájú nyomtatók nem működnek névcímkék nyomtatásához.
:::

:::info
A nyomtató csatlakoztatásához kövesse a nyomtató beállítási útmutatóját, és csatlakoztassa ugyanarra a WiFi-hálózatra, mint a táblagépet. A Brother nyomtatóillesztőprogramokat és beállítási útmutatókat a [Brother támogatási oldalán](https://support.brother.com) találja.
:::

## A kioszk megjelenésének testreszabása

A B1 Checkin alkalmazás megjelenését testreszabhatja, hogy illeszkedjen gyülekezete arculatához. A B1 Adminban lépjen a **Mobil > B1 CheckIn** menüpontra, és a **Kioszk téma** kártyán állítsa be:

### Színek

Nyolc színbeállítással szabhatja testre a gyülekezete arculatát:

- **Elsődleges** és **Elsődleges kontraszt** -- A fő márkaszín és annak szövegszíne.
- **Másodlagos** és **Másodlagos kontraszt** -- Kiemelőszín és annak szövegszíne.
- **Fejléc háttere** és **Alcím háttere** -- A kioszk fejlécterületeinek színei.
- **Gomb háttere** és **Gomb szövege** -- Az interaktív gombok színei.

### Háttérkép

Az üdvözlő- és keresőképernyőkhöz opcionális háttérképet tölthet fel. Az ajánlott méret 1920x1080 pixel.

### Üresjárati képernyő / képernyőkímélő

Állítson be egy képernyőkímélőt, amely inaktivitás után aktiválódik:

1. Kapcsolja be vagy ki az üresjárati képernyőt.
2. Állítsa be a **időkorlátot** (hány másodpercnyi inaktivitás után induljon a képernyőkímélő, minimum 10 másodperc).
3. Adjon hozzá egy vagy több **diát** -- minden diához tartozik egy kép és egy megjelenítési időtartam (minimum 3 másodperc).

:::tip
Az üresjárati képernyővel bejelentéseket, közelgő eseményeket vagy üdvözlő üzeneteket jeleníthet meg, amikor a kioszkot éppen nem használják.
:::

## Vendégregisztráció QR-kóddal

A bejelentkező kioszk egy QR-kódot jeleníthet meg, amelyet a látogatók beolvasva maguk és családjuk számára regisztrálhatnak a saját telefonjukon. Ez felgyorsítja a bejelentkezést az első alkalommal érkező vendégeknek.

Amikor egy vendég beolvassa a QR-kódot, egy [vendégregisztrációs oldalra](../../b1-church/checkin/guest-registration) kerül, ahol megadhatja családja neveit, valamint minden egyéb, Ön által kért adatot. Egy önkéntes ezután megkeresheti a kioszkon, és bejelentkeztetheti.

### QR-kódos vendégregisztráció bekapcsolása

A QR-kód megjelenítésének bekapcsolásához:

1. A B1 Adminban nyissa meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), és bontsa ki a **Mobil** menüt.
2. Kattintson a **B1 CheckIn** elemre.
3. Kapcsolja be a **QR-kódos vendégregisztráció** opciót, majd kattintson a **Mentés** gombra.

:::note
Ez a beállítás a **Mobil > B1 CheckIn** alatt található (ugyanazon az oldalon, mint a **Kioszk téma** kártya), nem a Jelenlét alatt. A Jelenlét oldal **Kioszk** műveletének van egy hivatkozása erre az oldalra.
:::

Miután a kapcsoló be van kapcsolva, az alábbi beállítások megjelennek ugyanabban a **QR-kódos vendégregisztráció** kártyában. Bármelyik módosítása után kattintson a kártyán a **Mentés** gombra.

### Regisztrációs mezők kiválasztása

A **Regisztrációs mezők** listája határozza meg, mit kérjen az űrlap. A **Keresztnév** és a **Vezetéknév** mindig szerepel az űrlapon, és minden családtagnál kötelező. Minden más mezőnél kapcsolja be a **Szerepeltetés** opciót, hogy az űrlapra kerüljön, majd kapcsolja be a **Kötelező** opciót, ha a vendégnek ki kell töltenie. A **Kötelező** csak szerepeltetett mezőnél kapcsolható be, a **Szerepeltetés** kikapcsolása pedig törli azt.

| Mező | Kikérve | Alapértelmezetten szerepel |
|------|---------|---------------------------|
| **E-mail** | Csak a elsődleges kapcsolattartótól | Igen (opcionális) |
| **Telefon** | Csak a elsődleges kapcsolattartótól | Igen (opcionális) |
| **Lakcím** | Egyszer, a családra vonatkozóan -- utca, címsor 2, város, állam és irányítószám. Kötelezés esetén a címsor 2 kivételével mindennek ki kell lennie töltve. A cím minden családtag mentett adatai közé kerül. | Nem |
| **Születési dátum** | Minden családtagtól | Nem |
| **Nem** | Minden családtagtól | Nem |
| **Családi állapot** | Csak a elsődleges kapcsolattartótól | Nem |
| **Osztály** | Minden családtagtól (óvodától 12. osztályig, vagy Végzett) | Nem |
| **Megjegyzések** | Egyszer, a családtagok alatti dobozban (legfeljebb 1000 karakter) | Nem |

A kikapcsolt mezők soha nem kerülnek mentésre, még akkor sem, ha valaki más módon elküldi őket a regisztrációban. A megjegyzések a elsődleges kapcsolattartó rekordjában jegyzetként kerülnek mentésre ("Vendégregisztráció" címmel), így a személy profiljának **Jegyzetek** részében olvashatók.

### Vendégek hozzáadása csoporthoz

A **Új vendégek hozzáadása csoporthoz** opcióval automatikusan bekerülhet minden regisztrált személy az egyik csoportjába -- például egy "Újonnan érkezettek" csoportba vagy a hétvégi esemény csoportjába. Válassza a **Nincs** lehetőséget (az alapértelmezett), ha ezt ki szeretné hagyni. A vendégek nem látják és nem választhatják ki a csoportot; azt csak itt lehet beállítani. Minden esemény előtt módosítsa, hogy az adott esemény vendégeit együtt tudja követni.

### Jelenlét rögzítése

Ha csoport van kiválasztva, megjelenik egy **Jelenlét rögzítése is** kapcsoló. Kapcsolja be, hogy a vendégek a regisztráció pillanatában jelenlévőként legyenek megjelölve, és ne kelljen őket külön bejelentkeztetni.

A jelenlét csak akkor kerül rögzítésre, ha a regisztráció a kiválasztott csoport egyik **ütemezett** istentiszteleti időpontja alatt történik:

- A csoportnak egy vagy több istentiszteleti időponthoz kell kapcsolódnia, és ezeknek az időpontoknak rendelkezniük kell [bejelentkezési ütemezéssel](setup.md#setting-a-check-in-schedule) (**Nap** és **Kezdési idő**).
- Az "alatt" azt jelenti, hogy az adott istentiszteleti időpont bejelentkezési ablakán belül vagyunk -- a kezdés előtti **Bejelentkezés nyitása** perctől a befejezés utáni **Bejelentkezés zárása** percig (vagy a kezdés utáni percig, ha nincs befejezési idő; ha sem befejezési idő, sem záró percek nincsenek megadva, akkor a nap végéig), a bejelentkezési ütemezés időzónájában.
- Minden családtag jelenlétet kap a csoportban minden olyan istentiszteleti időpontra, amely abban a pillanatban nyitva van, a mai dátumra.
- Az egyéb időpontokban történő regisztrációk, vagy olyan csoportok esetén, amelyek istentiszteleti időpontjaihoz nincs ütemezés, hozzáadódnak a csoporthoz, de nem számítanak jelenlétnek.

### Fejlécfotó

A **Fejlécfotó** alatt kattintson a **Fotó módosítása** gombra, hogy kiválasszon vagy feltöltsön egy képet (16:9 arányra vágva), amely a regisztrációs oldal tetején jelenik meg az alapértelmezett ikon helyett. A **Eltávolítás** gombra kattintva visszatérhet az ikonhoz.

### A regisztrációs hivatkozás megosztása

Miután a QR-kódos vendégregisztráció be van kapcsolva, a kártya alján megjelenik a **Regisztrációs QR-kód megosztása** rész. Ez a kioszk QR-kódján túl két módot kínál arra, hogy a vendégek eljussanak a regisztrációs űrlaphoz:

- **Hivatkozás másolása** — másolja a regisztrációs URL-t, hogy beillesztheti a gyülekezete weboldalára, e-mailekbe vagy bárhova az interneten.
- **PNG letöltése** — letölti a QR-kódot képként, amelyet szórólapokra, hirdetőlapokra vagy táblákra nyomtathat.

:::tip
Adja hozzá a regisztrációs hivatkozást gyülekezete weboldalának "Tervezze meg látogatását" vagy "Új vagyok" oldalához, hogy a vendégek már érkezés előtt regisztrálhassanak.
:::

### Mi történik, miután egy vendég regisztrált

A B1 először olyan személyeket keres, akik már szerepelnek a **Személyek** között. Egy családtag akkor kapcsolódik egy meglévő személyhez, ha pontosan egy személynek ugyanaz a keresztneve és ugyanaz az e-mail-címe vagy telefonszáma. E-mail vagy telefon nélkül megadott gyermek a megtalált háztartáson belül a keresztneve alapján kapcsolódik. Az egyezést talált személyek a meglévő adataikkal kerülnek felhasználásra -- a regisztráció nem változtatja meg a részleteiket vagy tagsági állapotukat -- az új személyek pedig a megtalált háztartáshoz csatlakoznak.

Ha senki sem egyezik, a regisztráció új háztartást hoz létre, amely az elsődleges kapcsolattartó vezetéknevéről kapja a nevét, és minden családtagnak létrehoz egy személyrekordot. Minden új személy a **Személyek** közé kerül **Látogató** tagsági állapottal, az elsődleges kapcsolattartó pedig a háztartás fejeként szerepel.

Az egyezést talált és az új személyek egyaránt bekerülnek az Ön által választott csoportba (ha még nincsenek benne), és jelenlétük rögzítésre kerül, ha ez be van kapcsolva. A megjegyzések az elsődleges kapcsolattartó jegyzeteként kerülnek mentésre.

Az automatikus követéshez adjon hozzá egy [munkafolyamat-indítót](../serving/workflows.md#triggers), például a **Személy · Létrehozva** eseményt a *Tagsági állapot Látogató* feltétellel, vagy a **Csoport · Tag csatlakozott** eseményt az általa választott csoporthoz.

## Mit rögzít a rendszer

Minden bejelentkezés jelenléti rekordot hoz létre a B1 Adminban. Ezeket a rekordokat a [Jelenlét](tracking-attendance.md) oldalon és az egyes [csoportok](../groups/group-members.md) összejöveteleinél tekintheti meg, ugyanúgy, mint a kézzel rögzített jelenlétet. Az adatok megjelenítése nem különbözik: mindkét módszer ugyanazokba a jelentésekbe kerül.
