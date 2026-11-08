---
title: "Önellenőrzéses bejelentkezés beállítása a B1 Checkin és a B1 Admin segítségével"
sidebar_label: "Bejelentkezés"
description: "Önellenőrzéses bejelentkezés beállítása az istentiszteletekre a B1 Admin B1 Checkin alkalmazásával: eszközök, kioszk-fiókok, ütemezések, arculat és QR-kódos vendégregisztráció."
---

# Bejelentkezés

<div class="article-intro">

A B1 Admin támogatja az istentiszteleteken történő önellenőrzéses bejelentkezést a kísérő **B1 Checkin** alkalmazással. A tagok érkezéskor kioszkokon vagy erre a célra szolgáló eszközökön maguk és családjuk tagjai számára is bejelentkezhetnek, ami gyorsabbá teszi a folyamatot, és csökkenti az önkéntesek munkaterhét. Minden bejelentkezés automatikusan jelenlétként rögzül.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A gyülekezeti helyszíneket, istentiszteleti időpontokat és csoportokat a [Jelenlét beállításában](setup.md) kell beállítania.
- Szüksége lesz [személyekre az adatbázisában](../people/adding-people.md), akiket [háztartásokba](../people/adding-people.md#managing-households) rendezett, hogy a családok együtt tudjanak bejelentkezni.
- Szüksége lesz egy táblagépre, és opcionálisan egy Brother címkenyomtatóra (lásd alább a [hardverajánlásokat](#recommended-hardware)).

</div>

## Hogyan működik

A B1 Checkin alkalmazás a B1 Admin jelenléti beállításaihoz kapcsolódik. Amikor egy tag bejelentkezik, a jelenléte automatikusan a megfelelő helyszínhez, istentiszteleti időponthoz és csoporthoz kerül rögzítésre. Azoknál, akik a bejelentkezési rendszert használják, nem kell kézzel jelenlétet rögzítenie.

## A bejelentkezés beállítása

1. **Először állítsa be a jelenléti struktúrát.** A B1 Adminban lépjen a **Személyek > Jelenlét** menüpontra, és kattintson a **Beállítás** gombra, hogy a helyszínei, istentiszteleti időpontjai és csoportjai megfelelően legyenek beállítva. A bejelentkező alkalmazás ezen a beállításon alapul. Opcionálisan adjon minden istentiszteleti időpontnak [bejelentkezési ütemezést](setup.md#setting-a-check-in-schedule), hogy a bejelentkezés minden héten automatikusan nyíljon és záródjon. Az ütemezések az istentiszteleti helyszín időzónáját használják, vagy a gyülekezete időzónáját, ha a helyszínhez nincs időzóna beállítva. A kioszk a lezárt időablakkal rendelkező istentiszteleti időpontokat **Zárva** állapotban jeleníti meg, és közli a családokkal, mikor nyílik meg a bejelentkezés. Részletekért lásd a [Jelenlét beállítása](setup.md) oldalt.
2. **Telepítse a B1 Checkin alkalmazást** a használni kívánt eszközökre. Az alkalmazás a következő platformokon érhető el:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung táblagépek:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire táblagépek:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Jelentkezzen be a B1 Checkin alkalmazásba** olyan fiókkal, amelynek van **Bejelentkezés** jelenléti jogosultsága (vagy **Jelenlét szerkesztése** jogosultsága). Lásd: [Kioszk-fiókok bejelentkezéshez](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Válassza ki a helyszínt és az istentiszteleti időpontot** az aktuális alkalomhoz.
5. A tagok most már megkereshetik a nevüket az eszközön, és bejelentkezhetnek.

:::tip
Helyezze a bejelentkező eszközöket jól látható, könnyen elérhető helyekre, például a bejárati előtérbe vagy az üdvözlő pulthoz. Egy rövid bejelentés az istentiszteleten segít abban, hogy a tagok tudjanak a lehetőségről.
:::

:::tip
Ha gyülekezetének több helyszíne van, a beállítást minden helyszínre meg kell ismételnie a [Jelenlét beállításában](setup.md). Minden bejelentkező eszköz beállítható más-más helyszínre.
:::

## Ajánlott hardver

**Táblagépek** – ezek mindegyike jól működik az alkalmazással:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Nagy képernyő:** Samsung Galaxy Tab A8 10,5"
- **Költségkímélő:** Amazon Fire HD 10

**Nyomtatók** – a bejelentkezés Brother címkenyomtatókkal működik, névkitűzők nyomtatásához:

- **Legjobb:** Brother QL-1110NWB (több táblagépet támogat Bluetooth-on és WiFi-n keresztül)
- **Jó:** Brother QL-810W (több táblagépet támogat WiFi-n keresztül)
- **Költségkímélő:** Brother QL-1100 (csak WiFi)

**Címkék:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
A B1 Checkin alkalmazással csak Brother címkenyomtatók kompatibilisek. Más márkájú nyomtatók nem fognak működni névkitűzők nyomtatásához.
:::

:::info
A nyomtatót a gyártó útmutatója szerint csatlakoztassa ugyanahhoz a WiFi-hálózathoz, mint a táblagépet. A Brother nyomtatók illesztőprogramjait és beállítási útmutatóit a [Brother támogatási oldalán](https://support.brother.com) találja.
:::

## A kioszk megjelenésének testreszabása

A B1 Checkin alkalmazás megjelenését és hangulatát a gyülekezete arculatához igazíthatja. A B1 Adminban lépjen a **Mobil > B1 CheckIn** menüpontra, és a **Kioszk téma** kártyán állítsa be:

### Színek

Nyolc színbeállítás segítségével igazíthatja a gyülekezete arculatához:

- **Elsődleges** és **Elsődleges kontraszt** -- Fő márkaszín és a hozzá tartozó szövegszín.
- **Másodlagos** és **Másodlagos kontraszt** -- Kiemelőszín és a hozzá tartozó szövegszín.
- **Fejléc háttere** és **Alcím háttere** -- A kioszk fejléceinek színei.
- **Gomb háttere** és **Gomb szövege** -- Az interaktív gombok színei.

### Háttérkép

A kioszk üdvözlő és keresési képernyőjéhez opcionálisan feltölthet háttérképet. Az ajánlott méret 1920x1080 pixel.

### Üresjárati képernyő / képernyővédő

Állítson be egy képernyővédőt, amely adott ideig tartó inaktivitás után indul:

1. Kapcsolja az üresjárati képernyőt **be** vagy **ki** állapotba.
2. Állítsa be az **időkorlátot** (hány másodpercnyi inaktivitás után induljon a képernyővédő, legalább 10 másodperc).
3. Adjon hozzá egy vagy több **diát** -- minden diához tartozik egy kép és egy megjelenítési idő (legalább 3 másodperc).

:::tip
Használja az üresjárati képernyőt bejelentések, közelgő események vagy üdvözlő üzenetek megjelenítésére, amikor a kioszkot éppen nem használják.
:::

## Vendégregisztráció QR-kóddal

A bejelentkező kioszk QR-kódot jeleníthet meg, amelyet a látogatók beolvasva saját telefonjukon regisztrálhatják magukat és családjukat. Ez felgyorsítja a bejelentkezést az első alkalommal érkező vendégek számára.

Amikor egy vendég beolvassa a QR-kódot, a [vendégregisztrációs oldalra](../../b1-church/checkin/guest-registration.md) kerül, ahol megadja családja tagjainak nevét, valamint minden egyéb adatot, amelyet Ön kér. Egy önkéntes ezután megkeresheti őt a kioszkon, és bejelentkeztetheti.

### QR-kódos vendégregisztráció bekapcsolása

A QR-kód megjelenítésének bekapcsolásához:

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), és bontsa ki a **Mobil** menüpontot.
2. Kattintson a **B1 CheckIn** menüpontra.
3. Kapcsolja be a **QR-kódos vendégregisztráció** opciót, majd kattintson a **Mentés** gombra.

:::note
Ez a beállítás a **Mobil > B1 CheckIn** alatt található (ugyanazon az oldalon, mint a **Kioszk téma** kártya), nem a Jelenlét alatt. A Jelenlét oldalon lévő **Kioszk** műveletnél található egy hivatkozás erre az oldalra.
:::

Miután a kapcsoló be van kapcsolva, a többi lehetőség megjelenik ugyanabban a **QR-kódos vendégregisztráció** kártyában. Bármelyik beállítás módosítása után kattintson a kártyán lévő **Mentés** gombra.

### A regisztrációs mezők kiválasztása

A **Regisztrációs mezők** lista határozza meg, hogy mit kérjen a regisztrációs űrlap. A **Keresztnév** és a **Vezetéknév** mindig szerepel az űrlapon, és minden családtagnál kötelező. A többi mezőnél kapcsolja be a **Szerepeltetés** opciót, hogy a mező bekerüljön az űrlapba, majd kapcsolja be a **Kötelező** opciót, ha a vendégeknek ki kell tölteniük. A **Kötelező** csak szerepeltetett mezőnél kapcsolható be, a **Szerepeltetés** kikapcsolása pedig törli azt.

| Mező | Mit kérdez | Alapértelmezetten szerepel |
|------|-----------|---------------------|
| **Megszólítás** | Minden családtagnál, a név előtt legördülő listából (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nem |
| **Email** | Csak az elsődleges kapcsolattartónál | Igen (nem kötelező) |
| **Telefon** | Minden családtagnál. Ha kötelező, csak az elsődleges kapcsolattartónak kell megadnia. | Igen (nem kötelező) |
| **Családi szerep** | Minden családtagnál az elsődleges kapcsolattartó után -- Házastárs, Gyermek vagy Egyéb. Az elsődleges kapcsolattartó az új háztartás feje. Szerep nélkül megadott tag Egyéb szerepet kap. | Igen (nem kötelező) |
| **Lakcím** | A családnál egyszer -- utca, címsor 2, város, megye és irányítószám. Ha kötelező, a címsor 2 kivételével mindent ki kell tölteni. A címet minden családtag mentésre kerül. | Nem |
| **Születési dátum** | Minden családtagnál | Nem |
| **Nem** | Minden családtagnál | Nem |
| **Családi állapot** | Csak az elsődleges kapcsolattartónál | Nem |
| **Évfolyam** | Minden családtagnál (óvodától a 12. évfolyamig, vagy Végzett) | Nem |
| **Megjegyzések** | Egyszer, a családtagok alatti dobozban (legfeljebb 1000 karakter) | Nem |

A kikapcsolt mezők akkor sem kerülnek mentésre, ha valaki más módon küldi el őket a regisztrációnak. A megjegyzések az elsődleges kapcsolattartó rekordjában jegyzetként mentődnek (a "Vendégregisztráció" néven), így a személy profiljának **Jegyzetek** szakaszában olvashatók.

### Vendégek hozzáadása csoporthoz

Az **Új vendégek hozzáadása csoporthoz** lehetőséggel automatikusan bekerülnek egy csoportba mindazok, akik regisztrálnak -- például egy "Újonnan érkezők" csoportba vagy a hétvégi esemény csoportjába. Az alapértelmezett **Nincs** választással kihagyhatja ezt a lépést. A vendégek nem látják és nem választhatják ki a csoportot, azt csak itt lehet beállítani. Minden esemény előtt módosítsa, hogy az adott esemény vendégeit együtt követhesse nyomon.

### Jelenlét rögzítése

Ha csoportot választ, megjelenik az **Jelenlét rögzítése is** kapcsoló. Kapcsolja be, hogy a vendégek a regisztrációjuk pillanatában jelenlévőként legyenek megjelölve, így nem kell őket külön bejelentkeztetnie.

A jelenlét csak akkor kerül rögzítésre, ha a regisztráció a kiválasztott csoport egyik **ütemezett** istentiszteleti időpontja alatt történik:

- A csoportnak egy vagy több istentiszteleti időponthoz kell kapcsolódnia, és ezeknek az időpontoknak rendelkezniük kell [bejelentkezési ütemezéssel](setup.md#setting-a-check-in-schedule) (egy **Nap** és egy **Kezdési időpont** megadásával).
- "Alatt" azt jelenti, hogy a regisztráció az adott istentiszteleti időpont bejelentkezési ablakán belül történik -- a kezdés előtti **Bejelentkezés nyitása** perctől a befejezés utáni **Bejelentkezés zárása** percig (vagy ha nincs befejezési idő, a kezdés utáni percig; ha sem befejezési idő, sem zárási perc nincs megadva, akkor az adott nap végéig), a bejelentkezési ütemezés időzónáját használva.
- Minden családtag jelenlétként kerül megjelölésre a csoportban az összes olyan istentiszteleti időpontnál, amely abban a pillanatban nyitva van, a mai dátumra.
- Más időpontban történő regisztrációk, illetve olyan csoportnál, amelynek istentiszteleti időpontjaihoz nincs ütemezés, a csoportba kerülnek, de nem számítanak jelenlétnek.

### Fejlécfotó

A **Fejlécfotó** alatt kattintson a **Fotó módosítása** gombra egy kép kiválasztásához vagy feltöltéséhez (16:9 arányra vágva), amely a regisztrációs oldal tetején jelenik meg az alapértelmezett ikon helyett. Az ikonhoz való visszatéréshez kattintson az **Eltávolítás** gombra.

### A regisztrációs link megosztása

Amint a QR-kódos vendégregisztráció be van kapcsolva, a kártya alján megjelenik a **Regisztrációs QR-kód megosztása** szakasz. Ez a kioszk QR-kódján kívül két módot kínál arra, hogy a vendégek eljussanak a regisztrációs űrlapra:

- **Link másolása** -- Másolja a regisztrációs URL-t, hogy beillesztheti a gyülekezete weboldalára, e-mailekbe vagy bárhová az interneten.
- **PNG letöltése** -- Letölti a QR-kódot képként, amelyet szórólapokra, hírlevelekbe vagy táblákra nyomtathat.

:::tip
Adja hozzá a regisztrációs linket a gyülekezete weboldalának "Látogatás tervezése" vagy "Új vagyok" oldalához, hogy a vendégek még az érkezésük előtt regisztrálhassanak.
:::

### Mi történik, miután egy vendég regisztrált

A B1 először azokat a személyeket keresi, akik már szerepelnek a **Személyek** között. Egy családtag akkor kapcsolódik egy meglévő személyhez, ha pontosan egy személynek van ugyanaz a keresztneve és ugyanaz az e-mail-címe vagy telefonszáma. Az e-mail-cím vagy telefonszám nélkül megadott gyermeket a keresztneve alapján párosítja a rendszer azon a háztartáson belül, amelyhez már hozzárendelt személyt. Az egyeztetett személyek adatai változatlanok maradnak -- a regisztráció nem módosítja az adataikat vagy tagsági státuszukat --, az új személyek pedig az egyeztetett háztartás tagjaként kerülnek hozzáadásra.

Ha senki sem egyezik, a regisztráció új háztartást hoz létre az elsődleges kapcsolattartó vezetékneve alapján, és minden családtagnak személyrekordot készít. Minden új személy a **Személyek** közé kerül **Látogató** tagsági státusszal, az elsődleges kapcsolattartó pedig a háztartás feje lesz.

Az egyeztetett és az új személyek egyaránt bekerülnek az Ön által választott csoportba (ha még nincsenek benne), és ha a jelenlét rögzítése be van kapcsolva, a jelenlétük is rögzítésre kerül. A megjegyzések az elsődleges kapcsolattartó jegyzeteként mentésre kerülnek.

Az automatikus követéshez adjon hozzá egy [munkafolyamat-indítót](../serving/workflows.md#triggers), például **Személy · Létrehozva** eseményt a *Tagsági státusz egyenlő Látogatóval* feltétellel, vagy **Csoport · Tag csatlakozott** eseményt a fent kiválasztott csoporthoz.

## Mi kerül rögzítésre

Minden bejelentkezés jelenléti rekordot hoz létre a B1 Adminban. Ezeket a rekordokat a [Jelenlét](tracking-attendance.md) oldalon és az egyes [csoportok](../groups/group-members.md) alkalmai között is megtekintheti, pontosan úgy, mint a kézzel rögzített jelenlétet. Az adatok megjelenése nem különbözik: mindkét módszer ugyanabba a jelentésekbe kerül.
