---
title: "A B1App használata"
---

# A B1App használata

<div class="article-intro">

A B1.church tagi portálja telefonra optimalizált webalkalmazás, amely a `/mobile` útvonal alatt érhető el. Bármely böngészőben működik, és a kezdőképernyőre is telepíthető. Ez az oldal ismerteti a Főoldal irányítópultját, az alsó navigációs sávot, a Továbbiak oldalt és a Saját oldalt.

</div>

## Bemutató videó

<YouTube id="8XKRZvvAbXg" title="A B1.church tagi alkalmazás bemutatója" next="A B1 Check-In bemutatója" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Személyes adatainak megtekintéséhez be kell [jelentkeznie](./logging-in.md). A kijelentkezett látogatók továbbra is böngészhetik a nyilvános tartalmakat, és ahol egy funkció fiókot igényel, megjelenik a **Bejelentkezés** gomb.

</div>

## Főoldal {#home}

Ha megnyitja a `https://yourchurchname.b1.church/mobile` címet, a **Főoldal** irányítópultjára jut a `/mobile/dashboard` útvonalon. A Főoldal a tagi portál kezdőoldala. Üdvözlő szöveggel indul („Jó reggelt”, „Jó napot” vagy „Jó estét”, a keresztnevével), majd a mai dátum következik, ezt pedig csak akkor megjelenő szakaszok követik:

- **Fotócsempék** -- azok a lapok, amelyekhez gyülekezete fotót rendelt (beleértve a Napi igét), fotócsempeként jelennek meg gyülekezete neve alatt. Gyülekezete beállításától függően kétoszlopos rácsban, oldalra húzható sorban (ami magától is továbbgörgethet), vagy listában jelennek meg, mindegyik név mellett kis előnézeti képpel -- lásd: [Főoldali csempék](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Minden fotós lap itt jelenik meg, még akkor is, ha a navigációs sávban is van helye.
- **Legutóbbi igehirdetés** -- gyülekezete legújabb igehirdetése, **Összes igehirdetés** hivatkozással
- **Napi ige** -- a mai ige; koppintson rá a teljes [Napi ige](../content/verse-of-the-day.md) oldal megnyitásához
- **Szolgálatban részt veszel** -- a következő szolgálati feladataid, **Összes terv** hivatkozással. Ha valamelyik feladathoz még válaszra van szükség, azok jelennek meg először, **Válasz szükséges** jelvénnyel, valamint **Elfogadom** és **Elutasítom** gombokkal, így a Főoldalról közvetlenül válaszolhat (az **Elutasítom** gombnál előbb megerősítést kérünk). Egyébként a következő feladataidnál **Elfogadva** vagy **Megerősítve** jelvény látszik. Koppintson egy feladatra a hozzá tartozó terv megnyitásához.
- **Csoportjaid** -- legfeljebb három csoportod a találkozási idővel és helyszínnel, valamint **Összes csoport** hivatkozással
- **Közelgő események** -- bejelentkezés után azoknak a csoportoknak a következő három közelgő eseménye, amelyekben tag vagy, mindegyik dátummal és időponttal (ha az eseményhez fotó tartozik, kis előnézeti képpel is). Koppintson egy eseményre, hogy megnyissa annak csoportjának eseményeit. A **Összes közelgő esemény** gombra koppintva megnyithatja a teljes listát a [Saját oldalán](./me-page.md#upcoming), amely a szolgálati feladataidat és a regisztrációidat is tartalmazza.
- **Részvételem** és **Űrlapjaim** -- ha gyülekezete bekapcsolja, megmutatja, hányszor vett részt az elmúlt 90 napban a két legutóbbi látogatásával, valamint a két legutóbbi űrlapbeküldésével, a teljes listákra mutató hivatkozásokkal. Ezek mindenképpen megjelennek a [Saját oldalán](./me-page.md) is -- lásd: [Főoldali szakaszok](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Adakozás** -- mennyit adott az idei évben („Ebben az évben adott” összeg), egy **Adakozás** gomb (csak akkor látszik, ha gyülekezete online adakozást kínál), valamint **Előzmények** hivatkozás az [adománytörténetéhez](../giving/donation-history.md). Ez a rész rejtve marad, ha gyülekezete a tagok adakozási előzményeit korábbi évre korlátozta vagy elrejtette. Ilyenkor gyülekezete adakozási eszköze a **Továbbiak innen** alatt gombként jelenik meg.
- **Továbbiak innen** *gyülekezete* -- gombok a gyülekezete által bekapcsolt többi eszközhöz, amelyek nincsenek már a navigációs sávban vagy a fenti részekben. A leggyakrabban használtak kerülnek elöl.

A szolgálati, csoport-, részvételi, űrlap- és adakozási részek csak akkor jelennek meg, ha be van jelentkezve, gyülekezete bekapcsolta az adott eszközt, és van megjeleníthető tartalma -- például egy közelgő feladat vagy legalább egy csoport. Számítógépen a Főoldal két oszlopban jelenik meg.

Ha nincs bejelentkezve, a Főoldalon az üdvözlés helyett egy **Üdvözöljük** címsor látszik, rövid felszólítással („Jelentkezzen be, hogy lássa a csoportjait, az adakozást és még többet.”) és egy **Bejelentkezés** gombbal. A felszólítás akkor is megjelenik, ha gyülekezete még semmi mást nem állított be a Főoldalhoz. Gyülekezete átfogalmazhatja vagy elrejtheti ezt a felszólítást -- lásd: [Mobilalkalmazás-beállítások](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Ha el van rejtve, a **Továbbiak** oldalról vagy a **Saját** oldalról is be tud jelentkezni.

## Az alsó navigációs sáv

Telefonon a navigációs sáv a képernyő alján rögzítve van:

- **Főoldal** -- mindig az első lap
- Legfeljebb három olyan lap, amelyet gyülekezete beállított
- **Továbbiak** -- megnyitja a Továbbiak oldalt

A beépített képernyők (például a Csoportok, az Adakozás vagy a Tervek) kapják meg először a lapok helyeit; a fennmaradó helyek gyülekezete egyéni oldalaihoz kerülnek. Külső weboldalakra mutató hivatkozások és a Napi ige soha nem kapnak lapot. Ha gyülekezete több lapot állított be, mint amennyi elfér, a többi nem vész el: megjelenik a **Továbbiak** oldalon és a Főoldal **Továbbiak innen** részében. A gyülekezeti adminisztrátorok a B1 Adminban, a **Mobil → Navigáció** alatt állítják be a lapok sorrendjét.

## Számítógépen

Szélesebb képernyőn, például számítógépen vagy nagyobb táblagépen, az alsó navigációs sávot a képernyő tetején futó, gyülekezete színeiben pompázó fejléc váltja fel. Ez megjeleníti gyülekezete logóját, vagy ha nincs logó beállítva, a nevét (kattintson rá a Főoldalra való visszatéréshez), a **Főoldal** linket, legfeljebb öt olyan lapot, amelyet gyülekezete beállított, valamint a **Továbbiak** linket. A jobb oldalon a harang és a profilfotó látszik. Ha egy részletes képernyőt nyit meg, az oldal tartalma fölött megjelenik egy **Vissza** hivatkozás.

## A Továbbiak oldal

A **Továbbiak** gombra koppintva megnyílik a `/mobile/more` oldal. Ez a következőket tartalmazza:

- Az Ön neve és fotója, valamint a **Profil szerkesztése** hivatkozás — lásd: [Profil szerkesztése](./editing-your-profile.md)
- Gyülekezete által beállított összes lap, a sorrendnek megfelelően, gyülekezete neve alatt. A külső weboldalakra mutató hivatkozások új böngészőlapon nyílnak meg.
- Egy **Fiók** szakasz, amely a következőket tartalmazza:
  - **Saját** -- az Ön személyes oldala (csak bejelentkezve)
  - **Megjelenés** -- váltás a **Világos mód** és a **Sötét mód** között
  - **Adminisztrációs felület** -- csak akkor látszik, ha gyülekezetében adminisztrátori jogosultsággal rendelkezik; új lapon megnyitja a B1 Admint
  - **Alkalmazás telepítése** -- megnyitja a [telepítési útmutatót](./installing-pwa.md) a `/mobile/install` útvonalon (az alkalmazás telepítése után rejtve)
- **Kijelentkezés**, vagy ha nincs bejelentkezve, a **Bejelentkezés** gomb
- Gyülekezete neve és az adatvédelmi szabályzatra mutató hivatkozás

## Az alkalmazássáv

Telefonon a képernyők tetején futó sáv a következőket mutatja:

- Gyülekezete logóját (vagy nevét, ha nem töltött fel logót) a Főoldalon és a többi fő képernyőn, illetve vissza nyilat, ha egy részletes képernyőn jár. A képernyő címe magán az oldal tetején jelenik meg.
- Egy **harang** ikont az értesítésekhez és üzenetekhez, az olvasatlan elemek jelvényével -- lásd lent: [Értesítések és üzenetek](#notifications-and-messages)
- Az Ön **profilfotóját**, amely megnyitja a profilját a `/mobile/profileEdit` útvonalon -- lásd: [Profil szerkesztése](./editing-your-profile.md)

A harang és a profilfotó csak bejelentkezve látszik.

## Értesítések és üzenetek

A harangra koppintva két szakaszt tartalmazó panel nyílik meg:

- **Üzenetek** -- legutóbbi privát beszélgetéseid, **Új üzenet** hivatkozással egy újabb indításához
- **Értesítések** -- legutóbbi értesítéseid, az olvasatlanokon **Új** jelvénnyel. Koppintson egy értesítésre, hogy odajusson, ahonnan származik: a csoporthoz, a tervhez vagy a beszélgetéshez.

Mindkét szakasz megmutatja, hány olvasatlan eleme van. Koppintson a lenti **Összes megtekintése** gombra, hogy megnyissa teljes postaládáját a `/mobile/notifications` útvonalon.

## Szakaszokból álló oldalak

A részletes oldalak -- egy csoport, egy terv, a Saját oldala, valamint a Tervek és az Adakozás képernyők -- lapok helyett egyetlen, szakaszokra osztott oldalként jelennek meg. Minden szakasz rövid előnézetet mutat, a szakasz fejlécében lévő hivatkozás (például **Összes tag**, **Összes esemény** vagy **Teljes istentiszteleti rend**) pedig megnyitja a teljes listát. Az adott nézet tetején lévő **Vissza ide** hivatkozás visszavisz arra az oldalra, ahonnan érkezett.

## A Saját oldal

A **Saját** (`/mobile/me`) az Ön személyes központja. Megmutatja a nevét és fotóját a **Profil szerkesztése** és a **Beállítások** ([értesítési beállítások](./notification-preferences.md)) gombokkal, majd azt, ami Önre vár -- szolgálati feladatok, eseményregisztrációk és csoportesemények --, ezt követi a háztartása, a csoportjai, az idei [adakozása](../giving/), az Ön által beküldött űrlapok, a részvételi előzményei, a [regisztrációi](../events/my-registrations.md), valamint a legutóbbi értesítései és üzenetei. Részletekért lásd: [A Saját oldal](./me-page).

Ha nincs bejelentkezve, a Saját oldalon helyette a **Bejelentkezés** gomb látszik.

## Telepítés a főképernyőre

A tagi portál egy progresszív webalkalmazás (PWA). Látogasson el a `/mobile/install` oldalra (vagy válassza az **Alkalmazás telepítése** lehetőséget a Továbbiak oldalon), ahol eszközéhez lépésről lépésre útmutatót talál. Telepítés után a főképernyőről böngészősáv nélkül, teljes képernyőn nyílik meg. Lásd: [Alkalmazásként telepítés (PWA)](./installing-pwa.md).

## Gyülekezete nyilvános weboldala

A tagi portálon kívül gyülekezete nyilvános weboldalának saját fejlécnavigációja van, a gyülekezeti adminisztrátorok által beállított hivatkozásokkal -- olyan oldalakkal, mint az [igehirdetések](../content/sermons.md), a [Biblia](../content/bible.md), az [élő közvetítés](../content/live-streaming.md) és a nyilvános csoportlista. Telefonon ezek a hivatkozások a fejléc jobb felső sarkában lévő hamburger-ikon mögött találhatók.

:::info
A látható lapok és eszközök gyülekezetenként eltérnek. Az adminisztrátorok a B1 Adminon keresztül szabályozzák, hogy a tagok mely szakaszokat lássák, ezért ha nem látja az itt leírt funkciót, lehet, hogy gyülekezete nem kapcsolta be.
:::
