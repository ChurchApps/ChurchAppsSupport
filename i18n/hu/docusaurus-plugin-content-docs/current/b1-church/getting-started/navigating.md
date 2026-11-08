---
title: "Eligazodás a B1App-ban"
description: "Eligazodás a B1.church tagi portálon telefonon vagy számítógépen: a Főoldal irányítópult, az alsó fülsor, a További oldal és a Me oldal."
---

# Eligazodás a B1App-ban

<div class="article-intro">

A B1.church tagi portálja telefonra optimalizált webalkalmazás, amely a `/mobile` útvonal alatt érhető el. Bármely böngészőben működik, és a kezdőképernyőre is telepíthető. Ez az oldal a Főoldal irányítópultot, az alsó fülsort, a További oldalt és a Me oldalt mutatja be.

</div>

## Bemutató videó

<YouTube id="8XKRZvvAbXg" title="A B1.church tagi alkalmazás bemutatója" next="A B1 Check-In bemutatása" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Ahhoz, hogy személyes adatait lássa, [be kell jelentkeznie](./logging-in.md). A be nem jelentkezett látogatók továbbra is böngészhetik a nyilvános tartalmakat, és ahol a funkció fiókot igényel, a **Bejelentkezés** gomb jelenik meg.

</div>

## Főoldal {#home}

A `https://yourchurchname.b1.church/mobile` címet megnyitva a **Főoldal** irányítópultra jut, amely a `/mobile/dashboard` címen található. A Főoldal a tagi portál kezdőoldala. Üdvözlő szöveggel indul („Jó reggelt”, „Jó napot” vagy „Jó estét”, a keresztnevével), majd a mai dátummal, és ezt követik azok a szakaszok, amelyek csak akkor jelennek meg, ha relevánsak:

- **Fotócsempék** -- az egyháza által fotóval ellátott fülek (beleértve a Napi igét is) fotócsempeként jelennek meg az egyház neve alatt. Egyháza beállításától függően kétoszlopos rácsban, oldalra görgethető sorban (amely akár magától is továbbhalad), vagy név melletti kis előnézeti képpel ellátott listában láthatók -- lásd [Főoldali csempék](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Ha az oldalra görgethető sorban több csempe van, mint amennyi a képernyőn elfér, a sor alatt pontok mutatják, hol tart; egy pontra koppintva ugorhat az adott csempére. A sor előre halad, és az utolsó csempe után újra az elsőnél kezdődik. Minden fotós fül itt jelenik meg, még akkor is, ha a fülsorban is van helye.
- **Legutóbbi prédikáció** -- egyházának legújabb prédikációja, **Összes prédikáció** hivatkozással
- **Napi ige** -- a mai ige; koppintson rá a teljes [Napi ige](../content/verse-of-the-day.md) oldal megnyitásához
- **Szolgálatban** -- következő közelgő szolgálati feladatai, **Összes terv** hivatkozással. Ha valamelyik feladatra még választ kell adnia, azok jelennek meg először **Válasz szükséges** jelvénnyel és **Elfogadom** / **Elutasítom** gombokkal, így a Főoldalról is válaszolhat (az **Elutasítom** előbb megerősítést kér). Egyébként a következő feladatai **Elfogadva** vagy **Megerősítve** jelvénnyel jelennek meg. Koppintson egy feladatra a hozzá tartozó terv megnyitásához.
- **Csoportjai** -- legfeljebb három csoportja a találkozási idejével és helyszínével, valamint egy **Összes csoport** hivatkozás
- **Közelgő események** -- bejelentkezve a következő három csoportesemény és eseményregisztráció dátum szerinti sorrendben, mindegyik dátummal és idővel (és bélyegképpel, ha az eseménynek van fotója). Minden sort **Esemény** (olyan eseményt jelöl, amely egy Ön által tagjaként követett csoporthoz tartozik) vagy **Regisztráció** (olyan esemény, amelyre [regisztrált](../events/registering.md)) címke jelöl; a regisztrált esemény egyszer, regisztrációként jelenik meg. Koppintson egy eseményre a csoportja eseményeinek megnyitásához, vagy egy regisztrációra a [regisztrációi](../events/my-registrations.md) megnyitásához. Az **Összes közelgő esemény** gombra koppintva a teljes közelgő lista nyílik meg a [Me oldalán](./me-page.md#upcoming), amely a szolgálati feladatait és regisztrációit is tartalmazza.
- **Látogatásaim** és **Űrlapjaim** -- ha egyháza bekapcsolta őket: hány alkalommal vett részt az elmúlt 90 napban a két legutóbbi látogatással, valamint a két legutóbbi űrlapbeküldés, a teljes listákra mutató hivatkozásokkal. Ezek a [Me oldalon](./me-page.md) mindig megjelennek -- lásd [Főoldali szakaszok](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Adakozás** -- mennyit adott az idén („Adakozott összeg” az aktuális évvel), egy **Adakozás** gomb (csak akkor látható, ha egyháza kínál online adakozást), és egy **Előzmények** hivatkozás a [adománytörténetéhez](../giving/donation-history.md). Rejtve marad, ha egyháza a tagok adakozási előzményeit korábbi évre korlátozta vagy elrejtette; ebben az esetben egyháza adakozási eszköze gombként jelenik meg a **Továbbiak innen** alatt.
- **Továbbiak innen** *az Ön egyháza* -- gombok az egyháza által bekapcsolt többi eszközhöz, amelyek még nincsenek az alsó fülsorban vagy fent. A leggyakrabban használtak kerülnek elöl.

A szolgálati, csoport-, látogatási, űrlap- és adakozási szakaszok csak akkor jelennek meg, ha be van jelentkezve, egyháza bekapcsolta az adott eszközt, és van megjeleníthető tartalom -- például közelgő feladat vagy legalább egy csoport. Számítógépen a Főoldal két oszlopban látszik.

Ha ki van jelentkezve, a Főoldalon az üdvözlés helyett **Üdvözöljük** címsor jelenik meg, egy rövid felszólítással („Jelentkezzen be a csoportjai, az adakozás és további információk megtekintéséhez.”) és egy **Bejelentkezés** gombbal. A felszólítás akkor is megjelenik, ha egyháza még semmit sem állított be a Főoldalhoz. Egyháza átfogalmazhatja vagy elrejtheti ezt a felszólítást -- lásd [Mobilalkalmazás beállításai](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Ha el van rejtve, a **További** oldalról vagy a **Me** oldalról is be tud jelentkezni.

## Az alsó fülsor

Telefonon a képernyő aljához rögzített fülsor látható:

- **Főoldal** -- mindig az első fül
- Legfeljebb három, egyháza által beállított fül
- **További** -- megnyitja a További oldalt

A beépített képernyők (például Csoportok, Adakozás vagy Tervek) kapják meg elsőként a fülhelyeket; a szabad helyek az egyház egyedi oldalaira kerülnek. Csak a külső weboldalakra mutató hivatkozások és a Napi ige nem kapnak soha fület. Ha egyháza több fület állított be, mint amennyi elfér, a többi nem vész el: megjelennek a **További** oldalon és a Főoldal **Továbbiak innen** szakaszában. Az egyházi adminisztrátorok a B1 Adminban, a **Mobil → Navigáció** menüpontban állítják be a fülsor sorrendjét.

### Mappás fülek {#folder-tabs}

Egyháza több fület is összevonhat egy **mappába**. A mappa úgy jelenik meg, mint bármely más fül -- a fülsorban, a **További** oldalon vagy fotócsempeként a Főoldalon -- és megnyitásakor a mappa nevét viselő képernyő jelenik meg, amely felsorolja a benne lévő füleket. Ha minden fülnek van fotója, fotócsempeként látszanak; egyébként listaként. A mappán belüli, külső weboldalakra mutató hivatkozások új böngészőlapon nyílnak meg. A mappán belüli fülek csak a mappa képernyőjén látszanak, a fülsorban vagy a **További** oldalon nem. Az a mappa, amelyben nincs látható tartalom, rejtve marad.

## Számítógépen

Szélesebb képernyőn, például számítógépen vagy nagy táblagépen az alsó fülsor helyét egy fejléc veszi át a képernyő tetején, egyháza színében. Ezen látszik egyháza logója (vagy neve, ha nincs logó; kattintásra visszatér a Főoldalra), a **Főoldal**, legfeljebb öt, egyháza által beállított fül és a **További**, jobb oldalon a csengővel és a profilfotójával. Részletes nézet megnyitásakor a tartalom fölött megjelenik egy **Vissza** hivatkozás.

## A További oldal

A **További** gombra koppintva a `/mobile/more` oldal nyílik meg. Tartalma:

- Neve és fotója, **Profil szerkesztése** hivatkozással -- lásd [Profil szerkesztése](./editing-your-profile.md)
- Egyháza nevének alatt, sorrendben, az összes beállított fül. A külső weboldalakra mutató hivatkozások új böngészőlapon nyílnak meg.
- A **Fiók** szakasz:
  - **Me** -- személyes oldala (csak bejelentkezve)
  - **Megjelenés** -- váltás **Világos mód** és **Sötét mód** között
  - **Adminisztrátori felület** -- csak akkor látható, ha egyházánál adminisztrátori jogosultsága van; a B1 Adminra visz, új lapon
  - **Alkalmazás telepítése** -- megnyitja a [telepítési útmutatót](./installing-pwa.md) a `/mobile/install` címen (az alkalmazás telepítése után rejtve)
- **Kijelentkezés**, vagy **Bejelentkezés** gomb, ha ki van jelentkezve
- Egyháza neve és az adatvédelmi szabályzatra mutató hivatkozás

## Az alkalmazássáv

Telefonon a képernyők tetején futó sáv a következőket mutatja:

- Egyháza logóját (vagy nevét, ha nincs feltöltött logó) a Főoldalon és a többi főképernyőn, illetve vissza nyilat, ha részletes képernyőn jár. A képernyő címe magában az oldal tetején jelenik meg.
- Egy **csengő** ikont értesítésekhez és üzenetekhez, olvasatlan elemek jelvényével -- lásd lent: [Értesítések és üzenetek](#notifications-and-messages)
- **Profilfotóját**, amely a `/mobile/profileEdit` oldalon nyitja meg profilját -- lásd [Profil szerkesztése](./editing-your-profile.md)

A csengő és a profilfotó csak bejelentkezve látszik.

## Értesítések és üzenetek

A csengőre koppintva két szakaszból álló panel nyílik:

- **Üzenetek** -- legutóbbi privát beszélgetései, **Új üzenet** hivatkozással egy új indításához
- **Értesítések** -- legutóbbi értesítései, az olvasatlanokon **Új** jelvénnyel. Koppintson egy értesítésre, hogy a csoporthoz, tervhez vagy beszélgetéshez jusson, ahonnan érkezett.

Mindkét szakasz megmutatja, hány olvasatlan eleme van. Az alján lévő **Összes megtekintése** gombra koppintva megnyílik a teljes postafiókja a `/mobile/notifications` címen.

## Szakaszos oldalak

A részletes oldalak -- egy csoport, egy terv, a Me oldal, valamint a Tervek és az Adakozás képernyői -- fülek helyett szakaszokból álló oldalként vannak elrendezve. Minden szakasz rövid előnézetet mutat, a szakasz fejlécében lévő hivatkozás (például **Összes tag**, **Összes esemény** vagy **Teljes istentiszteleti rend**) pedig megnyitja a teljes listát. A nézet tetején lévő **Vissza ide** hivatkozás a korábbi oldalra visz vissza.

## A Me oldal

A **Me** (`/mobile/me`) a személyes központja. Megmutatja nevét és fotóját a **Profil szerkesztése** és a **Beállítások** ([értesítési beállítások](./notification-preferences.md)) gombokkal, majd a közelgő eseményeit -- szolgálati feladatait, eseményregisztrációit és csoporteseményeit --, ezt követi háztartása, csoportjai, [adakozása](../giving/index.md) az idén, az elküldött űrlapjai, látogatási előzményei, [regisztrációi](../events/my-registrations.md), valamint legutóbbi értesítései és üzenetei. Részletekért lásd [A Me oldal](./me-page.md).

Ha ki van jelentkezve, a Me oldalon helyette egy **Bejelentkezés** gomb látszik.

## Telepítés a kezdőképernyőre

A tagi portál egy Progressive Web App (PWA). Látogassa meg a `/mobile/install` oldalt (vagy válassza az **Alkalmazás telepítése** lehetőséget a További oldalon), ahol eszközéhez lépésről lépésre szóló útmutatót talál. Telepítés után a kezdőképernyőről, böngészősáv nélkül, teljes képernyőn nyílik meg. Lásd [Telepítés alkalmazásként (PWA)](./installing-pwa.md).

## Egyháza nyilvános weboldala

A tagi portálon kívül egyháza nyilvános weboldalának saját fejlécnavigációja van, az adminisztrátorok által beállított hivatkozásokkal -- olyan oldalakra, mint a [prédikációk](../content/sermons.md), a [Biblia](../content/bible.md), az [élő közvetítés](../content/live-streaming.md), valamint egy nyilvános csoportlista. Telefonon ezek a hivatkozások a fejléc jobb felső sarkában lévő hamburger-ikon mögött vannak.

:::info
A látható fülek és eszközök egyházanként eltérnek. Az adminisztrátorok a B1 Adminban szabályozzák, mely szakaszok láthatók a tagoknak, így ha valamelyik itt leírt funkciót nem látja, lehet, hogy egyháza nem kapcsolta be.
:::
