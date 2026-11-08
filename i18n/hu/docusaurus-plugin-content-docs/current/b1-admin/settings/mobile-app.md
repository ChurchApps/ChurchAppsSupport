---
title: "Mobilalkalmazás beállításai"
description: "A B1 Adminban a B1.church tagi alkalmazás navigációs füleinek, a főoldali csempéknek, a bejelentkezési felszólításnak és a tagjegyzék adatvédelmi beállításainak konfigurálása."
---

# Mobilalkalmazás beállításai

<div class="article-intro">

A Mobilalkalmazás beállításai oldalon konfigurálhatja a **B1.church mobil felületén (PWA)** a gyülekezeti tagok számára megjelenő navigációs füleket. Szabályozhatja, hogy mely fülek legyenek láthatók, mire mutassanak, és hogyan jelenjenek meg.

</div>

## Oktatóvideó

<YouTube id="ydY7WGK16fE" title="A gyülekezete tagi alkalmazásának testreszabása a B1-ben" />

:::info
Az itt beállított fülek a B1 Appban jelennek meg, amelyet a tagok [Progresszív webalkalmazásként (PWA) is telepíthetnek](../../b1-church/getting-started/installing-pwa.md). Ossza meg a tagokkal a gyülekezete telepítési oldalát — `https://yourchurchname.b1.church/mobile/install` —, amely lépésről lépésre végigvezeti őket az alkalmazás telepítésén az eszközükre, App Store vagy Google Play letöltés nélkül.
:::

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van a „Gyülekezeti beállítások szerkesztése” jogosultságra. Ha nincs hozzáférése, tekintse meg a [Szerepkörök és jogosultságok](./roles-permissions.md) oldalt.
- Először állítsa be a [Gyülekezeti beállításokat](./church-settings.md), beleértve a gyülekezet nevét és arculatát

</div>

## A navigációs beállítások elérése

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősáv), majd bontsa ki a **Mobil** pontot.
2. Kattintson a **Navigáció** elemre (`/mobile/navigation`).
3. A Navigáció oldalon látja az alkalmazás jelenlegi füleit.

## Új fül hozzáadása

1. Kattintson az oldal tetején lévő **Fül hozzáadása** gombra.
2. Töltse ki a fül adatait:
   - **Név** -- Az a felirat, amely a fülön megjelenik (például „Igehirdetések” vagy „Adakozás”).
   - **Ikon** -- Kattintson az ikonválasztóra, és válasszon ikont a füléhez.
   - **Kép** -- Kattintson a **Kép kiválasztása** (vagy **Kép cseréje**) gombra, és adjon a fülnek fotót. A fotóval rendelkező fülek fotócsempeként jelennek meg az alkalmazás főoldalán -- lásd: [Főoldali csempék](#home-screen-tiles).
   - **Fül típusa** -- Válasszon a lehetőségek közül, például Biblia, Élő közvetítés, Adomány, Weboldal és további típusok.
   - **URL** -- Adja meg azt a webcímet, amelyre a fül mutasson.
   - **Láthatóság** -- Szabályozza, hogy ki láthatja a fület (mindenki, csak tagok stb.). A **Tagjegyzék** fül esetében ez csak azt határozza meg, ki láthatja maga a fület; a jegyzéket megnyitni tudókat a Tagi portál oldalon a **Megjelenítés a jegyzékben** beállítás határozza meg (lásd: [Tagjegyzék és üzenetküldés beállításai](#member-directory--messaging-settings)).
3. Kattintson a **Fül mentése** gombra, hogy a fül hozzáadódjon az alkalmazásához.

## Meglévő fül szerkesztése

1. Kattintson bármelyik meglévő fülre az **Alkalmazásfülek** listájában.
2. Módosítsa a fül nevét, ikonját, URL-jét, típusát vagy láthatósági beállításait.
3. A módosítások alkalmazásához kattintson a **Fül mentése** gombra.

## Fülek sorrendjének módosítása

Megváltoztathatja, hogy a fülek milyen sorrendben jelenjenek meg a mobilalkalmazásban. A sorrend módosításához húzza a füleket a listában a kívánt helyre. Az oldalon látható sorrend megegyezik azzal a sorrenddel, amelyet a tagjai az alkalmazásban látnak majd.

:::info
Egyes fülek automatikusan megjelenhetnek, ha bizonyos feltételek teljesülnek -- például az Élő közvetítés fül akkor jelenhet meg, amikor van aktív közvetítés. A kézzel hozzáadott fülek teljes kontrollt adnak arról, mit látnak a tagjai bármikor.
:::

:::tip
Tartsa kezelhető számban a füleket. A legtöbb gyülekezetnek három-öt fül a legmegfelelőbb. Túl sok fül zavarossá teheti a navigációt a tagjai számára.
:::

## Tagjegyzék és üzenetküldés beállításai

A Mobil szakasz **Tagi portál** pontja tartalmazza azokat a beállításokat, amelyek a B1.church felületen a tagjegyzéket és a privát üzenetküldést szabályozzák:

- **Jóváhagyó csoport a jegyzékhez** -- Az a csoport, amely a tagjegyzékben végrehajtott módosításokat, valamint a [fiók törlési kérelmeket](../profile/account-deletion.md) felülvizsgálja, mielőtt hatályba lépnek.
- **Megjelenítés a jegyzékben** -- Ki nyithatja meg a tagjegyzéket, és kik szerepelnek benne: **Csak adminisztrátorok**, **Tagok és feljebb** (alapértelmezett), **Rendszeres látogatók és feljebb** vagy **Vendégek és feljebb**. Akik tagsági státusza a kiválasztott szint alatt van, nem látják a jegyzéket, és nem szerepelnek benne. A **Csak adminisztrátorok** beállítás esetén a jegyzék a Személyek > Megtekintés jogosultsággal rendelkező munkatársak kivételével mindenki számára zárva marad (a Munkatárs tagsági státusz önmagában nem elég), akik a beállítástól függetlenül mindig megnyithatják a jegyzéket, és mindenkit láthatnak. A vendégek soha nem szerepelnek benne, mivel az online regisztrálók kezdetben vendégként kerülnek be.
- **Láthatósági beállítás** -- A gyülekezet szintjén meghatározza az alapértelmezést azoknak a tagoknak, akik még nem választottak saját beállítást. A **Lakcím**, a **Telefonszám** és az **E-mail** mindegyikének saját legördülő menüje van, ugyanazzal az öt szinttel, amely mindenhol elérhető, ahol láthatóság állítható be:
  - **Mindenki** -- bárki számára látható, beleértve a névtelen látogatókat is
  - **Tagok** -- csak Tag vagy Munkatárs nyilvántartással rendelkező személyek számára látható
  - **Csak csoporttagok** -- csak azok számára látható, akik ugyanabban a csoportban vannak az adott személlyel, valamint a munkatársak számára
  - **A csoportvezetőim és a munkatársak** -- csak azoknak a csoportvezetőknek látható, akiknek a csoportjában az adott személy tag, valamint a munkatársak számára
  - **Csak munkatársak** -- csak a munkatársaknak (akiknek tagsági státusza Munkatárs, vagy akik rendelkeznek a Személyek > Megtekintés jogosultsággal), valamint magának az érintett személynek látható

  A „munkatárs” ezekben a szintekben azt jelenti, aki tagsági státusza Munkatárs, vagy akinek van Személyek > Megtekintés jogosultsága. A csoportokkal kapcsolatos változások azonnal érvénybe lépnek: akik csatlakoznak egy csoporthoz, vagy csoportvezetővé válnak, a csoport tagjainak megfelelő **Csak csoporttagok** vagy **A csoportvezetőim és a munkatársak** szintű adatait kijelentkezés és újbóli bejelentkezés nélkül is láthatják.

  A tagok a B1.church PWA-ban a profiljuk **Adatvédelem** lapján felülbírálhatják ezeket az alapértelmezéseket a saját adataikra -- lásd: [Profil szerkesztése](/docs/b1-church/getting-started/me-page).
- **Privát üzenetek minimális életkora** -- Gyermekvédelmi beállítás. A B1 nem nyit **új** privát üzenetváltást, ha valamelyik fél a születési dátuma alapján a megadott kor alatt van (születési dátum hiányában a háztartásbeli szerep szolgál alapul). A megadott kor alatti személyek a jegyzékben továbbra is teljesen láthatók -- csak a közvetlen üzenetküldés tiltott, **mindkét irányban**, mindenki számára, beleértve a munkatársakat is. A csoportos beszélgetések és a gyermek szüleinek üzenetküldése továbbra is működik. A lehetőségek: Ki, 13, 16 vagy 18; az alapértelmezett a **18**. A meglévő beszélgetéseket ez nem érinti.

:::tip
Mivel a minimális életkor ellenőrzése a születési dátumokon alapul, gondoskodjon arról, hogy a gyülekezetében lévő gyermekek születési dátuma ki legyen töltve. Ez a beállítás ugyanahhoz a gyermekvédelmi beállítás-családhoz tartozik, mint a [bejelentkezési biztonsági beállítások](../attendance/checkin-safety.md).
:::

### Bejelentkezési felszólítás a főoldalon

Azok a látogatók, akik bejelentkezés nélkül nyitják meg az alkalmazás [főoldalát](/docs/b1-church/getting-started/navigating#home), egy rövid felszólítást látnak -- alapértelmezés szerint: *„Jelentkezzen be, hogy lássa a csoportjait, adakozásait és további információkat.”* -- egy **Bejelentkezés** gomb mellett. A **Bejelentkezési felszólítás a főoldalon** beállításai ugyanezen a Tagi portál oldalon (`/mobile/b1-mobile`) lehetővé teszik a szöveg módosítását:

- **Bejelentkezési felszólítás megjelenítése az alkalmazás főoldalán** -- Ezt kikapcsolva a felszólítás és a **Bejelentkezés** gomb is eltűnik a főoldalról. A látogatók a alkalmazás menüjéből továbbra is be tudnak jelentkezni.
- **Bejelentkezési felszólítás szövege** -- Cserélje le az alapértelmezett szöveget a saját üzenetére (legfeljebb 150 karakter). Hagyja üresen, ha az alapértelmezettet szeretné használni. Ez a mező letiltott, amíg a felszólítás ki van kapcsolva.

A módosítások alkalmazásához kattintson a **Mentés** gombra. A **Mentve** üzenet visszaigazolja a változtatást. A mentés frissíti az alkalmazás gyorsítótárazott beállításait, így a változás a főoldal legközelebbi betöltésekor látszik.

### Főoldali csempék

Azok a fülek, amelyekhez tartozik fotó (lásd: **Kép** a [Új fül hozzáadása](#adding-a-new-tab) részben), fotócsempeként jelennek meg az alkalmazás [főoldalán](/docs/b1-church/getting-started/navigating#home), a gyülekezete nevét viselő szakaszban. Ide tartozik a Napi ige fül is, ha adott neki fotót. A fotóval rendelkező fülek a fülsávban is megjelennek.

A ugyanezen a Tagi portál oldalon (`/mobile/b1-mobile`) található **Főoldali csempék** beállítás szabályozza ezeknek a csempéknek az elrendezését. Válasszon **Elrendezést**:

- **Rács** -- Soronként két csempe (alapértelmezés). Ha a csempék száma páratlan, az első csempe teljes szélességben jelenik meg.
- **Görgethető sor** -- Egy sor csempe, amelyet a tagok oldalirányban húznak.
- **Görgethető (automatikus)** -- Ugyanaz az oldalirányú sor, de magától is mozog: körülbelül négymásodpercenként egy csempével továbblép, az utolsó után pedig újra az elsőnél folytatódik. Szünetel, amikor a tag megérinti, fölé viszi az egeret vagy a sorba lép a billentyűzettel, majd néhány másodperc múlva újra elindul. Azokon az eszközökön, ahol a mozgáscsökkentés be van kapcsolva, a sor mozdulatlan marad, és a **Görgethető sor** módon működik.
- **Lista** -- Lista, amelyben minden fül neve mellett egy kis fotó-bélyegkép található.

Mindkét görgethető elrendezésnél, ha több csempe van, mint amennyi a képernyő szélességébe fér, a csempék alatt pöttyök sora jelenik meg, csempénként egy, az aktuális csempéhez tartozó pötty kitöltve. A tagok a pöttyökre koppintva a megfelelő csempéhez ugorhatnak.

A módosítások alkalmazásához kattintson a **Mentés** gombra.

### Főoldali szakaszok

A bejelentkezett tagok mindig látják a saját látogatási előzményeiket és a beküldött űrlapjaikat a [Saját oldalon](/docs/b1-church/getting-started/me-page). A ugyanezen a Tagi portál oldalon (`/mobile/b1-mobile`) található **Főoldali szakaszok** kapcsolók segítségével ezeket a főoldalon is megjelenítheti:

- **Saját részvétel megjelenítése a főoldalon** -- Egy **Saját részvétel** szakaszt ad hozzá, amely megmutatja, hány alkalommal vett részt a tag az elmúlt 90 napban, a két legutóbbi látogatását, valamint egy **Előzmények** hivatkozást a teljes részvételi listájához.
- **Saját űrlapok megjelenítése a főoldalon** -- Egy **Saját űrlapok** szakaszt ad hozzá, amely a tag két legutóbbi űrlapbeküldését és egy **Összes űrlap** hivatkozást tartalmaz.

Mindkettő alapértelmezés szerint ki van kapcsolva. A szakasz csak azoknak a bejelentkezett tagoknak jelenik meg, akiknek legalább egy megjeleníthető rekordjuk van. A módosítások alkalmazásához kattintson a **Mentés** gombra.

## Hol jelennek meg ezek a fülek

Az itt beállított füleket a **B1.church PWA** jeleníti meg, amelyet a tagjai a `https://yourchurchname.b1.church` bármelyik oldaláról telepítenek. Az ezen az oldalon végzett módosítások a tag legközelebbi alkalmazásmegnyitásakor érvényesülnek.

Telefonon az alsó fülsávban a **Főoldal**, legfeljebb három saját füle és a **Továbbiak** látható; számítógépen a fejléc legfeljebb öt fület jelenít meg. A beépített képernyők (például Igehirdetések, Adakozás vagy Csoportok) kapják meg elsőként a helyeket, a **Belső oldal** típusú fülek pedig a fennmaradó helyeket töltik ki. Az **Külső URL** és a **Napi ige** típusú fülek soha nem kapnak helyet a fülsávban. Minden fül, beleértve azokat is, amelyek nem férnek el, szerepel az alkalmazás **Továbbiak** oldalán.

Kivételt képeznek a **Mappa** fülbe helyezett fülek: ezek csak a mappa saját képernyőjén jelennek meg, amelyet a tagok a mappára koppintva nyitnak meg. Ez a képernyő fotócsempeként mutatja a füleket, ha mindegyiknek van képe, egyéb esetben listaként. Az a mappa, amely nem tartalmaz olyan füleket, amelyeket az adott tag láthat, el van rejtve az illető elől. Lásd: [Mappa fülek](../../b1-church/getting-started/navigating.md#folder-tabs). A tagok által látottakról lásd: [A B1App használata](../../b1-church/getting-started/navigating.md).

## Következő lépések

- [Gyülekezeti beállítások](./church-settings.md) -- A gyülekezet adatainak és arculatának beállítása
- [Szerepkörök és jogosultságok](./roles-permissions.md) -- A csapat hozzáféréseinek kezelése
