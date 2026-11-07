---
title: "Munkafolyamatok"
---

# Munkafolyamatok

<div class="article-intro">

A munkafolyamatok az embereket egy vizuális táblán lévő lépéssorozaton vezetik végig. Minden személy egy kártya, amely egyik lépésből a másikba halad: az első alkalommal érkező vendég utánkövetésétől a tagsági folyamaton át az első alkalommal adakozó köszönetnyilvánításáig, illetve mindenhez, ahol sok embert kell ugyanazon szakaszokon követni. Egy lépés kérhet önkéntestől valamilyen teendőt (telefonálás, beszélgetés) **és** saját maga is futtathat automatikus műveleteket, például e-mail vagy SMS küldését, néhány napos várakozást vagy a személy csoporthoz adását, így a munkafolyamatok a személyes utánkövetést és a körülötte lévő rutinmunkát is kezelik. A munkafolyamatok a [Feladatok](./tasks.md) továbbfejlesztett, húzással mozgatható Kanban-táblává alakítják, hogy senki se essen ki a rendszerből.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Győződjön meg róla, hogy azok a személyek, akiket követni szeretne, léteznek a B1 Adminban
- Ismerje meg, hogyan működnek a [Feladatok](./tasks.md), mert a tábla minden kártyája egy feladat
- A **Küldés e-mailben** művelet használatához előbb hozza létre a küldeni kívánt e-mail sablonokat (a **Beállítások → E-mail sablonok** menüpontban)
- A **Küldés SMS-ben** művelet használatához előbb kösse össze a rendszert egy [SMS-szolgáltatóval](../settings/church-settings.md#texting)
- Szüksége lesz a megfelelő Feladatok-jogosultságra. A megtekintés, a kártyák szerkesztése és a munkafolyamatok kezelése külön jogosultsági szintek (lásd: [Szerepkörök és jogosultságok](../settings/roles-permissions.md))

</div>

## Munkafolyamatok megtekintése

Nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a B1 Admin bal felső sarkában lévő keresősáv), bontsa ki a **Szolgálat** menüpontot, majd kattintson a **Munkafolyamatok** elemre. A munkafolyamatai egy táblázatban jelennek meg, ahol látja mindegyik **Kategóriáját** és **Állapotát** (**Aktív** vagy **Inaktív**). Ha kategóriákat használ, a lista felett lévő fülekkel szűrheti a listát kategória szerint. Bármelyik munkafolyamatra kattintva megnyithatja a táblát.

## Munkafolyamat létrehozása

1. A Munkafolyamatok oldalon kattintson a **Munkafolyamat hozzáadása** gombra.
2. Válassza ki, hogyan kezdje:
   - **Üres munkafolyamat** – nulláról indul, és saját lépéseket épít.
   - **Sablonból** – kész lépéssorral indul, amelyet szerkeszthet. A beépített sablonok:
     - **Új látogató utánkövetése** – Üdvözlő e-mail küldése → Személyes telefonhívás → Meghívás a következő lépésre → Kapcsolatban
     - **Tagsági osztály** – Érdeklődés kifejezése → Regisztráció az osztályra → Részvétel az osztályon → Tagság lezárása
     - **Első alkalommal adakozó köszönete** – Köszönőlevél küldése → Az adomány hatásának megosztása → Gondnokolt
     - **Szolgálati feladat megerősítése** – Kérés kiküldése és válaszra várakozás → Telefonhívás az önkéntesnek a válasz nélkül maradt kérés miatt (lásd: [Szolgálati feladatok megerősítése](#serving-assignment-confirmations))

   A sablon lépéseinek elkészítése eltarthat egy ideig. Amíg a rendszer dolgozik, a **Munkafolyamat hozzáadása** gomb felirata **Létrehozás…** lesz, és nem kattintható újra, így nem keletkezik duplikált munkafolyamat. Ha valami hiba történik, az oldalon ez az üzenet jelenik meg: *„A munkafolyamatot nem sikerült létrehozni. Kérjük, próbálja újra.”*
3. Adjon meg a munkafolyamatnak egy **Nevet**.
4. Opcionálisan rendeljen hozzá egy **Kategóriát**, hogy a kapcsolódó munkafolyamatok együtt legyenek. Új kategóriát a legördülő listából is létrehozhat.
   Üres munkafolyamat esetén itt kell megadnia a **Munkafolyamat célját** is: **Személyek utánkövetése** (a szokásos típus) vagy **Szolgálati feladat megerősítése**. A célt a munkafolyamat létrehozása után már nem lehet megváltoztatni.
5. Hagyja a munkafolyamatot **Aktív** állapotban, hogy lehessen hozzá embereket adni, vagy állítsa **Inaktívra**, hogy ne jelenjen meg a munkafolyamatba-adás listákban.
6. Kattintson a **Mentés** gombra.

:::tip
A munkafolyamatok listájában lévő **Duplikálás** gombbal másolhat egy meglévő munkafolyamatot – a lépéseivel, automatikus műveleteivel és útválasztásával együtt –, és kiindulópontként használhatja egy újhoz.
:::

## A tábla felépítése lépésekkel

Minden munkafolyamat tábla **lépésekből** áll, amelyek balról jobbra oszlopokként jelennek meg. Nyisson meg egy munkafolyamatot, és az **Lépés hozzáadása** gombbal hozza létre a folyamat minden szakaszát.

Egy lépés hozzáadásakor vagy szerkesztésekor a következőket állíthatja be:

- **Lépés neve** – az oszlop fejléce (például „Üdvözlő hívás” vagy „Regisztrációra várva”).
- **Határidő (napok)** – automatikusan határidőt állít be, amikor egy kártya belép ebbe a lépésbe. A határidőn túl lévő kártyák **Lejárt** jelzést kapnak.
- **Alapértelmezett felelős** – az a személy vagy csoport, akihez az ebbe a lépésbe érkező új kártyák automatikusan hozzárendelődnek. Ha az alapértelmezett felelős személy, akkor értesítést kap arról, hogy neki lett kiosztva egy kártya.
- **Automatikus műveletek** – a rendszer által önállóan végrehajtott teendők, amikor egy kártya megérkezik (lásd lent).
- **Útválasztás** – az, hogy a kártya a lépés elhagyásakor hová kerül (lásd: [Útválasztás](#routing-cards-with-outcomes-and-conditions)).

A lépés oszlopait húzással rendezze a folyamatának megfelelő sorrendbe. A sorrend határozza meg azt is, hogy a kártya alapértelmezés szerint milyen úton halad, ha semmilyen más útválasztási szabály nem érvényes.

:::info
Először mentse el az új lépést. Az automatikus műveletek és az útválasztás a lépéshez kapcsolódnak, ezért a szerkesztő csak akkor engedélyezi ezeket a részeket, miután a lépés létezik.
:::

## Automatikus műveletek

Minden lépéshez tartozhat automatikus műveletek listája, amelyek magától lefutnak abban a pillanatban, amikor egy kártya **belép** a lépésbe – még mielőtt bárki hozzányúlna. Így a lépés egyszerre késztet önkéntest a cselekvésre, és intézi a követéshez kapcsolódó rutinmunkát is.

A lépésszerkesztőben nyissa meg az **Automatikus műveletek** részt, kattintson a **Művelet hozzáadása** gombra, válasszon egy típust, majd töltse ki a beállításait. Annyi műveletet adhat hozzá, amennyit szeretne; ezek **felülről lefelé, sorrendben** futnak le. A lépés **Mentés** gombjával a lépést és az összes műveletét együtt menti el. A művelet kukás ikonjával való eltávolítása azonnal érvényes.

| Művelet | Mit csinál |
|---|---|
| **Küldés e-mailben** | E-mailt küld a személynek a kiválasztott e-mail sablonnal. Felülírhatja a tárgysort. |
| **Küldés SMS-ben** | Az Ön által írt üzenetet SMS-ben küldi a személynek, az egyházának [SMS-szolgáltatóján](../settings/church-settings.md#texting) keresztül. |
| **Várakozás** | A kártyát megadott számú napig tartja, mielőtt tovább haladna (lásd lent). |
| **Hozzáadás csoporthoz** | Hozzáadja a személyt a kiválasztott [csoporthoz](../groups/index.md). |
| **Eltávolítás csoportból** | Eltávolítja a személyt a kiválasztott csoportból. |
| **Részvétel rögzítése** | A személyt jelenlévőnek jelöli a csoport éppen zajló istentiszteleti idejében (lásd lent). |
| **Hozzáadás munkafolyamathoz** | Másik munkafolyamatba indítja a személyt – hasznos folyamatok közötti átadáshoz. |
| **Jegyzet hozzáadása** | Feljegyzést ír a kártya előzményei közé. |
| **Mező beállítása** | Frissít egy mezőt a személy adatlapján: Tagsági állapot, Családi állapot, Nem, Település, Megye vagy Irányítószám. |
| **Webhook** | A kártya adatait elküldi az Ön által megadott külső webcímre (URL), más rendszerekhez való kapcsolódáshoz. |
| **Feladat létrehozása** | Létrehoz egy [feladatot](./tasks.md) az Ön által megadott címmel és leírással, a kiválasztott személynek kiosztva. |
| **Személy értesítése** | E-mailt és B1-értesítést küld a kiválasztott munkatársnak vagy önkéntesnek a kártyáról (lásd lent). |

A lépés összes művelete lefutása után a kártya **az adott lépésen marad**, hogy valaki elvégezhesse rajta a teendőit – kivéve, ha a lépésnek van automatikus útvonala, amely tovább viszi (lásd: [Teljesen automatizált lépések](#fully-automated-steps)).

:::info
Az automatikus műveletek csak akkor futnak le, ha a kártya a szokásos folyamaton keresztül érkezik – amikor először kerül be, amikor egy kimenet vagy egy automatikus útvonal hozza be, vagy amikor egy Várakozás befejeződik. Ezek **nem** futnak le újra, ha egy munkatárs kézzel húzza a kártyát a lépésre vagy visszaküldi, így a személy nem kap ugyanazt az e-mailt kétszer.
:::

### E-mail küldése

Válassza a **Küldés e-mailben** műveletet, válasszon ki egy e-mail sablont, és ha szeretné, írjon egyedi tárgysort. Amikor egy kártya belép a lépésbe, a személy automatikusan megkapja az e-mailt. (Ha a személynek nincs e-mail-címe rögzítve, a lépés egyszerűen kihagyja ezt a műveletet.) A sablonban szereplő [összefésülő mezők](../settings/email-templates.md#merge-fields), például `{{firstName}}`, a személy saját adataival töltődnek ki.

Amikor az e-mail kimegy, a kártya előzményei között megjelenik az **E-mail elküldve** bejegyzés. Ha nem sikerül elküldeni – például mert az egyház e-mail-címe még nincs jóváhagyva, vagy elérte a napi korlátot –, nem kerül be „E-mail elküldve” bejegyzés.

:::info
A munkafolyamat e-mailjei csak azután mennek ki, hogy az egyházát jóváhagyták csoportos e-mailek küldésére, és beleszámítanak az egyház napi e-mail-korlátjába. Lásd: [Csoportos e-mail bekapcsolása az egyházának](../groups/group-members.md#turning-on-group-email-for-your-church). A **Küldés e-mailben** művelet figyelmeztet a lépésszerkesztőben, ha ezek az e-mailek nem fognak kimenni: *„Az egyház e-mail-címét még nem hagyták jóvá…”*, ha a jóváhagyás még függőben van, vagy *„Az egyház e-mail-küldése szüneteltetve van…”*, ha a közelmúltbeli üzenetek visszapattantak vagy spamként lettek megjelölve.
:::

### Részvétel rögzítése

Válassza a **Részvétel rögzítése** műveletet, majd kattintson a **Csoport kiválasztása** gombra, és jelölje ki azt a csoportot, amelynek a részvételét rögzíteni kell. A művelet futtatásakor a személy jelenlévőnek lesz jelölve a csoport éppen zajló istentiszteleti idejére – ugyanúgy, mintha bejelentkezett volna. Ez akkor hasznos, ha olyan eseményindítóval kombinálja, amely a munkafolyamathoz adja az embereket, amint megérkeznek, így külön bejelentkezés nélkül is beszámítanak.

- A részvétel abban a pillanatban kerül mérésre, amikor a kártya **létrejött**, így a munkafolyamatban korábban lévő **Várakozás** nem tolja a kártyát az istentisztelet után.
- Csak az olyan istentiszteleti időpontok számítanak, amelyeknek megvan a napja és a kezdési ideje. Ha a csoport egyik istentiszteleti időpontja sincs abban a pillanatban folyamatban, semmi nem kerül rögzítésre, és a kártya előzményei ezt jegyzik meg: **Nincs folyamatban lévő istentisztelet – a részvétel nincs rögzítve**.
- Ha a részvétel rögzítésre került, a kártya előzményei között megjelenik a **Részvétel rögzítve** bejegyzés, mellette a csoport nevével. Ha ugyanezt a műveletet ugyanarra az istentiszteletre újra lefuttatja, a személy nem számít kétszer.

### Személy értesítése

Válassza a **Személy értesítése** műveletet, kattintson a **Személy kiválasztása** gombra, és ha szeretné, írjon egy **Üzenetet**. Amikor egy kártya belép a lépésbe, az adott személy e-mailt és B1-értesítést kap, amely tartalmazza a kártyán lévő személy nevét, a munkafolyamat és a lépés nevét, az Ön üzenetét, valamint egy hivatkozást a kártya megnyitásához. Használja arra, hogy előre tájékoztasson egy munkatársat vagy szolgálati vezetőt – például: *„Értesítsd a lelkészt, amikor valaki eléri a Tagsági interjú lépést.”* A kártya előzményei a **Értesítve** bejegyzést rögzítik, mellette a személy nevével.

### SMS küldése

Válassza a **SMS küldése** műveletet, és írja be a **Szöveges üzenetet** (legfeljebb 1600 karakter). Amikor egy kártya belép a lépésbe, a személy ezt az üzenetet kapja a mobiltelefonján. Az üzenet személyre szabásához kattintson az üzenetmező alatti egyik gombra – **Keresztnév**, **Vezetéknév**, **Megjelenített név** vagy **Egyház neve** –, hogy a kurzor helyére beillessze a `{{firstName}}`, `{{lastName}}`, `{{displayName}}` vagy `{{churchName}}` mezőt. Az SMS elküldésekor mindegyiket a személy adataival tölti ki a rendszer.

- Ha a személynek nincs mobiltelefonszáma rögzítve, nem megy ki SMS, és a kártya előzményei ezt rögzítik: **SMS kihagyva: nincs mobiltelefonszám**.
- Ha a személy leiratkozott, nem megy ki SMS, és a kártya előzményei ezt rögzítik: **SMS kihagyva: leiratkozott**.
- Amikor az SMS kimegy, a kártya előzményei között megjelenik az **SMS elküldve** bejegyzés. Ha a küldés sikertelen – például mert nincs SMS-szolgáltató csatlakoztatva, vagy elfogytak az egyház SMS-kreditjei –, a hiba bekerül a kártya előzményei közé, a lépés többi művelete pedig továbbra is lefut.

:::warning
Az SMS-eket az egyháza saját [SMS-szolgáltatóján](../settings/church-settings.md#texting) keresztül küldik. Ha nincs szolgáltató csatlakoztatva, a műveletszerkesztő figyelmeztet: *„Nincs SMS-szolgáltató beállítva”*, és az SMS-ek nem mennek ki.
:::

### Várakozás néhány napig (csepegtetéses sorozatok)

A **Várakozás** művelet a kártyát az Ön által megadott napokig tartja. Amíg vár, a kártya **Elnapolva** állapotban látszik. A B1 30 percenként ellenőrzi a lejárt várakozásokat, így a kártya nagyjából fél órán belül folytatódik, miután a várakozás véget ért. Amikor a várakozás lejár:

1. Az **ugyanazon lépés hátralévő műveletei** lefutnak – így összeállíthat egy ilyen csepegtetést: **E-mail küldése → Várakozás 3 napig → Emlékeztető e-mail küldése**.
2. Ezután, ha a lépésnek van automatikus útvonala, a kártya tovább halad; ellenkező esetben a lépésen marad, hogy valaki elvégezhesse rajta a teendőt.

:::tip
A lépés elején lévő **Várakozás** egyszerű módja annak, hogy a kártyát „visszatartsa”, mielőtt egy önkéntes elé kerülne – például: *Várjon 7 napot, majd egy mentor felveszi a kapcsolatot*.
:::

## Személyek hozzáadása kártyaként

Többféleképpen helyezhet embereket a táblára:

- **A tábláról** – Kattintson a lépésoszlop alján lévő **Kártya hozzáadása** gombra, és válasszon egy személyt. Választhat csoportot is, és a csoport minden tagja kártyaként kerül be.
- **A személy adatlapjáról** – A személy oldalán használja a **Hozzáadás munkafolyamathoz** gombot, hogy egy munkafolyamatba helyezze.
- **Személy keresésből** – Jelöljön ki több embert, és használja a tömeges **Hozzáadás munkafolyamathoz** műveletet, hogy mindet egyszerre adja hozzá.
- **Automatikusan eseményindítóval** – Adjon embereket hozzá, amikor valami történik, például űrlapbeküldés vagy az első adomány esetén (lásd lent: [Eseményindítók](#triggers)).

Ha valakit kézzel adja hozzá, vagy egy **Hozzáadás munkafolyamathoz** lépésművelettel, a személynek soha nem lesz második nyitott kártyája ugyanazon a munkafolyamaton. Ha már van nyitott kártyája, kimarad (tömeges hozzáadásnál csak azok kapnak új kártyát, akiknek még nincs). Miután a kártyájuk le lett zárva, újra hozzáadhatja őket. Az eseményindítók ehelyett a saját **Csak egyszer személyenként** beállításukat követik.

## A tábla kezelése

Nyisson meg egy munkafolyamatot a tábla megtekintéséhez. Minden kártya megmutatja a személy nevét, azt, hogy kinek van kiosztva, valamint egy határidő- vagy állapotcímkét (**Lejárt** vagy **Elnapolva**). A lépésoszlopok apró jelvényekkel mutatják, milyen automatikus műveleteket futtatnak, és feliratokkal az útválasztásukat, így egy pillantással láthatja, hogyan haladnak a kártyák.

- **Kártya mozgatása** – Húzza a kártyát egyik oszlopból a másikba, ahogy a személy halad előre.
- **Kártya megnyitása** – Kattintson duplán a kártyára (vagy egyszer kattintson rá), hogy megnyissa a részletező panelt, ahol megváltoztathatja a lépést, újra kioszthatja, jegyzetet fűzhet hozzá, és áttekintheti, mi történt már.

A kártya panelről a következőket teheti:

- **Kiosztás** – A kártyát másik személynek vagy csoportnak oszthatja ki.
- **Elnapolás** – 1 napra, 3 napra vagy 1 hétre elnapolhatja a kártyát, hogy ideiglenesen elrejtse a határidejét.
- **Vissza küldés** az előző lépésre vagy **Átugrás** a következő lépésre.
- **Kiosztás rögzítése** – Megtarthatja ugyanazt a felelőst a kártyán akkor is, amikor az lépésről lépésre halad. Alapértelmezés szerint, ha a kártyát új lépésre helyezi, a rendszer hozzárendeli az adott lépés alapértelmezett felelősének; a rögzítés pedig a jelenlegi személyt tartja felelősnek végig.
- **Befejezés** – A kártya lezárása, vagy ha a lépéshez be vannak állítva kimenetek, válasszon egy **Kimenet** gombot (lásd: [Útválasztás](#routing-cards-with-outcomes-and-conditions)).
- **Kártya eltávolítása** – A kártya eltávolítása a tábláról anélkül, hogy befejezné, például ha valakit tévedésből adott hozzá. A megerősítés után a kártya lezárul, és eltűnik mindenki listájáról. Kimenetek, útvonalak vagy lépésműveletek nem futnak le, az előzményei pedig megmaradnak egy **Eltávolítva** bejegyzéssel. Egy [szolgálati feladat megerősítése](#serving-assignment-confirmations) kártya eltávolítása ugyanígy zárja le a kérést.
- **Jegyzetek hozzáadása** és a kártya **Tevékenység** részének megtekintése – az automatikus műveletek naplója (elküldött e-mailek, várakozások stb.), mindegyik a lefutásának dátumával és idejével.

Egy személyről szóló kártya esetén a panel megmutatja a személy mobiltelefonszámát és e-mail-címét is, hivatkozásként, amelyre koppintva hívhatja vagy írhat neki. Ha van jogosultsága a személyek megtekintéséhez, egy **Adatlap megtekintése** hivatkozás is megjelenik. A személy, akinek a kártya ki van osztva, a Személyek modulhoz való hozzáférés nélkül is látja a telefonszámot és az e-mail-címet.

A jegyzetek a kártyához kerülnek mentésre. Bárki, aki meg tudja nyitni a kártyát – beleértve azt a személyt vagy csoportot, akinek ki van osztva –, elolvashatja a jegyzeteket, és hozzáadhatja a sajátjait. Akik nem nyithatják meg a kártyát, nem látják a jegyzeteit.

### Tömeges műveletek

Több kártya kijelöléséhez jelölje be a négyzeteket. Ha egy lépés összes kártyáját egyszerre szeretné kijelölni, jelölje be a **Összes kijelölése** négyzetet az adott lépés oszlopának fejlécében; újbóli bejelöléssel törölheti a kijelölést. Megjelenik egy eszköztár, amely lehetővé teszi, hogy a kijelölt összes kártyán egyszerre **Befejezze**, **Elnapolja**, **Kiossza** (újra hozzárendeli) vagy **Áthelyezze…** egy másik lépésre.

## Kártyák útválasztása kimenetekkel és feltételekkel

Az útválasztás határozza meg, hová megy a kártya, amikor elhagy egy lépést. A lépés szerkesztőjének megnyitásával kétfajta útválasztást állíthat be.

### Kimeneti gombok

A kimenetek a kártya panelen megjelenő gombok, amelyek akkor látszanak, amikor az adott lépésen lévő kártyát befejezi. Egyetlen **Befejezés** gomb helyett olyan választásokat is kínálhat, mint „Csatlakozott egy csoporthoz” vagy „Nem érdekli”. Minden kimenet képes:

- a kártyát egy **másik lépésre** küldeni ebben a munkafolyamatban,
- a kártyát teljesen egy másik munkafolyamatnak **átadni**, vagy
- a kártyát **lezárni**.

Így egyetlen döntés a személyt különböző útvonalakra ágaztathatja.

### Automatikus útválasztás (feltételes)

Az automatikus útvonalak a kártyát **abban a pillanatban** továbbviszik, amikor az belép egy lépésbe (és az automatikus műveletek befejezése után), anélkül hogy bárkinek rá kellene kattintania, ha a személy megfelel a feltételeknek. Adjon hozzá egy útvonalat, válassza ki a célként szolgáló lépést, és határozzon meg egy vagy több **feltételt** (például a személy gyülekezeti helyszínét, életkorát vagy tagsági állapotát). A szöveges mezőket pontosan lehet egyeztetni, vagy a **tartalmazza**, **ezzel kezdődik** vagy **ezzel végződik** feltételekkel. Feltétel nélküli útvonal mindenkire illeszkedik.

A dátumfeltételek (Mai dátum, Születési dátum vagy Évforduló) összehasonlíthatják a teljes dátumot, vagy annak csak egy részét – a hét napját, a **Hónap napját**, a **Hónapot** vagy a eltelt éveket. A személy Születési dátumánál vagy Évfordulójánál a **Hónap napja** egy relatív **Ma** lehetőséget kínál, így az olyan feltétel, mint *Születési dátum · Hónap napja = Ma*, azokra a személyekre illeszkedik, akiknek a születésnapja az adott hónap napjára esik. A **Hónap** lehetőségei: **Előző hónap**, **Aktuális hónap** és **Következő hónap**. Az ilyen relatív értékeket az egyháza időzónája szerint számolja a rendszer, így az egyház naptári napjához igazodnak, nem pedig a szerver idejéhez.

A **Adakozás** feltételcsoportban található a **Rendszeresen adakozó, lemaradt**, amely azokat a személyeket keresi meg, akik korábban rendszeresen adakoztak, majd abbahagyták. Három számot kell megadni: *Legalább* **3** *alkalommal adakozott az elmúlt* **12** *hétben, majd az elmúlt* **3** *hétben semmit* (ezek az alapértékek). A hetek a mai naptól visszafelé számítanak, az egyháza időzónája szerint, és a visszatérített adomány nem számít bele. Leginkább [ütemezett eseményindítóval](#schedule-triggers) hasznos – például egy heti szabály, amely a lemaradt adakozókat egy lelkigondozói utánkövetési táblához adja hozzá. A feltétel csak az adományok dátumát nézi, az összegeket soha, és a kártyák és riasztások sem mutatnak összegeket. Mivel azt is feltárja, kik hagytak abba az adakozást, ezt a lehetőséget csak azok látják, akik megtekinthetik az adományokat, és csak ők tudják hozzáadni, módosítani vagy eltávolítani.

Ha egy útvonal feltételeit valamilyen okból nem lehet ellenőrizni, az útvonal nem illeszkedőnek számít. A kártya a lépésen marad (vagy egy másik illeszkedő útvonalat követ), ahelyett hogy elakadna.

:::info
A táblán minden lépésoszlop apró feliratokkal mutatja az útválasztását – például egy kimenet nevét, vagy „ha illeszkedik” szöveget, amelyet egy nyíl követ a célként szolgáló lépés vagy munkafolyamat felé.
:::

## Teljesen automatizált lépések

Úgy is beállíthat egy lépést, hogy teljesen magától fusson, senki sem dolgozik rajta. Adja meg a lépés **automatikus műveleteit**, és vegyen fel egy **automatikus útvonalat** (feltételek nélkül), amely a következő lépésre mutat. Amikor egy kártya belép, a műveletek lefutnak, majd az útvonal azonnal tovább viszi – a kártya egyenesen áthalad.

:::tip
Kombinálja a **Várakozással**: *Üdvözlő e-mail küldése → Várakozás 3 napig → automatikus továbbítás a „Személyes hívás” lépésre.* Az e-mailt és az időzítést a rendszer intézi, a önkéntes pedig csak akkor látja a kártyát, amikor eljön az ideje az emberi kapcsolatfelvételnek.
:::

## Eseményindítók

Az eseményindítók automatikusan adnak embereket egy munkafolyamathoz, amikor valami történik, így soha nem kell kézzel kártyákat hozzáadnia. Egy munkafolyamat táblán kattintson a **Eseményindítók** fülre, majd a **Eseményindító hozzáadása** gombra. Kétféle van:

### Eseményindítók

Azonnal elsülnek, amint egy rekord megváltozik a B1-ben. Válassza ki az eseményt, majd ha szeretné, adjon hozzá **feltételeket**, hogy csak az illeszkedő személyek kerüljenek be:

- **Személy · Létrehozva / Frissítve** – például bárki, akinek az állapota *Látogató* vagy *Vendég* lesz (az az állapot, amelyet azok kapnak, akik maguk regisztrálnak).
- **Adomány · Létrehozva** – például egy első alkalommal vagy nagy összegben adakozó személy hozzáadása egy köszönő munkafolyamathoz (összeg, alap vagy fizetési mód alapján).
- **Csoport · Tag csatlakozott** / **Csoport · Létrehozva**.
- **Űrlap · Beküldve** – bárki hozzáadása, aki egy kiválasztott űrlapot beküld (remek egy „Új vagyok” vagy „Kapcsolat” kártyához).

### Ütemezett eseményindítók

Ismétlődően futnak – naponta, hetente, havonta vagy évente – a megadott feltételek alapján. Ezeket időalapú megkeresésre használja, például *mindenkinek, akinek ma van a születésnapja* (Születési dátum · Hónap napja = **Ma**, a hónap pedig **Aktuális hónap**), vagy *havi* látogatás-ellenőrzésre. Még a **Csak egyszer személyenként** beállítás nélkül is igaz, hogy az ütemezett eseményindító nem ad hozzá újra ugyanazt a személyt egyetlen ismétlési időszakon belül (egy napon, héten, hónapon vagy éven belül, attól függően, milyen gyakran fut).

Bármelyik eseményindítónál a következőket is beállíthatja:

- A **Kezdő lépést**, ahová az új kártya kerül (alapértelmezés szerint az első lépés).
- **Csak egyszer személyenként** – így ugyanaz a személy nem kerül kétszer a munkafolyamatba az eseményindító által. Ezzel bekapcsolva, aki már rendelkezik kártyával ezen a munkafolyamaton, kimarad.
  - **Újra hozzáadás, miután a kártyájuk le lett zárva** – a **Csak egyszer személyenként** bekapcsolása esetén jelenik meg. Jelölje be, hogy az eseményindító újra hozzáadja a személyt, miután a korábbi kártyája ezen a munkafolyamaton le lett zárva. Egy személynek továbbra sincs egyszerre két nyitott kártyája a munkafolyamaton. Ezt olyan dolgoknál használja, amelyek többször is megtörténhetnek, például visszatérő vendégnél vagy éves folyamatnál.
- **Aktív** – az eseményindító bekapcsolása vagy kikapcsolása anélkül, hogy törölné.

:::tip
Párosítsa a **Űrlap · Beküldve** eseményindítót az **Új látogató utánkövetése** sablonnal, hogy a „Kapcsolat kártya” vagy „Új vagyok” űrlapjából automatikus utánkövetési folyamat legyen.
:::

## Szolgálati feladatok megerősítése

A munkafolyamatok egy különleges fajtája utánkövetheti a [szolgálati kéréseket](./plans.md#assigning-team-members), amíg minden önkéntes el nem fogadja vagy el nem utasítja őket. Személyek helyett a tábla minden kártyája **egy feladatot** követ nyomon – egy személyt egy pozícióban, egy tervben. Ugyanannak a személynek két szerepköre vagy két szolgálata külön kártyákat kap. Ez opcionális: semmi nem változik egy terv számára, amíg a beállításaiban ki nem választ egy megerősítő munkafolyamatot.

### Beállítás

1. A Munkafolyamatok oldalon kattintson a **Munkafolyamat hozzáadása** gombra, és válassza a **Szolgálati feladat megerősítése** sablont. (Vagy indítson egy **Üres munkafolyamatot**, és állítsa a **Munkafolyamat célját** **Szolgálati feladat megerősítése** értékre.) A sablonból való létrehozáshoz SMS küldési jogosultság szükséges, mert tartalmaz egy SMS-lépést.
2. Tekintse át a lépéseket. A sablon ezekkel indul:
   - **Kérés kiküldése és válaszra várakozás** – e-mailben és SMS-ben elküldi a szolgálati kérést, vár 2 napot, emlékeztető e-mailt küld, vár még 1 napot, majd automatikusan továbbviszi a kártyát.
   - **Telefonhívás az önkéntesnek a válasz nélkül maradt kérés miatt** – egy lépés, amelyben valaki felhívja az önkéntest, határidő: 1 nap. Állítson be **Alapértelmezett felelőst** ezen a lépésen. Ha nincs, a kártya a szolgálat vezetőjéhez kerül, vagy ha nincs vezető, a szolgálati csapathoz.
3. Szerkessze a várakozásokat, üzeneteket és lépéseket, hogy illeszkedjenek az egyházához.
4. Nyissa meg a [terv beállításait](./plans.md#plan-settings), és a **Megerősítő munkafolyamat** alatt válassza ki ezt a munkafolyamatot.

Ezek a munkafolyamatok a **Szolgálati kérés küldése** műveletet használják az **E-mail küldése** és **SMS küldése** helyett. Válassza az **E-mail** vagy a **Szöveges üzenet** lehetőséget, és ha szeretné, írjon egy **Kérési üzenetet**. A kérés mindig tartalmazza a szerepkört, a tervet, a szolgálat dátumát és a válaszadási hivatkozást; az üzenetben használhatja a `{{planName}}`, `{{positionName}}` és `{{serviceDate}}` mezőket. Ha üresen hagyja az üzenetet, az alapértelmezett kérés megy ki. Az önkéntesek értesítési beállításai, SMS-hozzájárulásuk, az SMS-szolgáltatója és az egyháza e-mail-jóváhagyása mind érvényesek, és minden kihagyott vagy blokkolt próbálkozás rögzítésre kerül a kártyán. A **Küldés e-mailben**, **Küldés SMS-ben** és **Hozzáadás munkafolyamathoz** műveletek ezeken a táblákon nem érhetők el.

A megerősítő munkafolyamat **Eseményindítók** fülén nem eseményindítók találhatók, hanem az látszik, hogyan indulnak a kártyák, és ezek a munkafolyamatok nem jelennek meg az emberek **Hozzáadás munkafolyamathoz** listáiban.

### Hogyan indulnak és záródnak a kártyák

- A kártyák akkor indulnak, amikor közzétett terv esetén **Értesítést** küld az önkénteseknek (lásd: [Önkéntesek értesítése](./plan-validation.md#notifying-volunteers)). Minden új, még meg nem válaszolt feladat egy kártyát kap. A tervek mentése, közzététele, másolása vagy automatikus kitöltése önmagában senkihez nem fordul, a ceruzával vázolt (vázlatos) tervek pedig semmit nem küldenek.
- Az önkéntesek továbbra is megkapják a szokásos alkalmazáson belüli riasztást. Az e-mailes és SMS-es utánkövetést a munkafolyamat végzi.
- Amikor az önkéntes **elfogadja vagy elutasítja** a kérést, a kártyája automatikusan lezárul, a hozzá kapcsolt utánkövető feladatokkal együtt.
- A kártya panel megmutatja a pozíciót, a szolgálat dátumát és a terv hivatkozását. A **Befejezés** helyett a gomb felirata **Utánkövetés elvégezve rögzítése** lesz. Ha rákattint, a rendszer rögzíti, hogy valaki utánakövetett, de a kártya nyitva és kiosztva marad (**Válaszra várva** állapotban), amíg az önkéntes nem válaszol, vagy le nem jár a válaszadási határidő.
- A válaszadási határidő annak a szolgálati időpontnak a vége, amelyen a pozíció csapata utoljára szolgál. Ha a tervben nincs megfelelő időpont, a szolgálati nap vége lesz a határidő. Ha addig senki nem válaszolt, a kártya **Válaszadási határidő lejárt** állapottal lezárul, és egy **Válasz nélküli szolgálati kérés áttekintése** feladat kerül a kártya aktuális felelőséhez vagy a szolgálat vezetőjéhez, hogy valaki eldönthesse, hogyan töltse be a helyet. A feladat **Megerősítetlen** marad.
- A feladat eltávolítása, a személy, a pozíció vagy a tervdátum megváltoztatása, a terv visszaállítása vázlatos állapotba, vagy a terv másik megerősítő munkafolyamatra való átállítása lezárja a kártyát. A lezárt kártyát másik **Értesítés** sem nyitja meg újra; új kérés kiküldéséhez adjon hozzá új feladatot.

:::info
A megerősítő munkafolyamaton keresztül küldött kérések esetén a [önkéntes emlékeztetők](./plans.md#volunteer-reminders) csak azoknak az önkénteseknek mennek ki, akik **elfogadták** a kérést, így a válaszra váró emberek nem kapnak emlékeztetőt a munkafolyamat utánkövetése mellé.
:::

## Saját kártyáim

Az önkénteseknek és munkatársaknak nem kell minden táblát átnézniük, hogy megtalálják a munkájukat. A **Saját munkám** oldal **Saját kártyáim** listája megmutatja az aktuális felhasználónak kiosztott összes kártyát, minden munkafolyamatban. Az oldalra a Munkafolyamatok oldal tetején lévő **Saját kártyáim** gombbal jut el, vagy az Ugrás menüben a **Szolgálat > Saját munkám** menüponttal. Egy kártyára kattintva a részletező panel közvetlenül a Saját munkám oldalon nyílik meg, ahol a kártyát elvégezheti vagy eltávolíthatja anélkül, hogy elhagyná az oldalt. Ha megtekintheti a munkafolyamatokat, a panelen megjelenik egy **Munkafolyamat tábla megnyitása** hivatkozás is, amely a kártya táblájára visz.

## Jelentések

Nyisson meg egy munkafolyamatot, és kattintson a **Jelentések** gombra, hogy lássa az adott munkafolyamat statisztikáit:

- **Lejárt** – azon kártyák száma, amelyek túlléptek a határidejükön.
- **Kártyák lépésenként** – hány kártya van jelenleg az egyes lépéseken, oszlopdiagramon ábrázolva.
- **Befejezett (30 nap)** – az elmúlt 30 nap áteresztőképessége, vonaldiagramon ábrázolva.

Ezekkel szűkítő pontokat találhat – például egy lépést, ahol a kártyák felhalmozódnak és soha nem haladnak tovább.

## Kapcsolódó cikkek

- [Feladatok](./tasks.md) – az egyes teendők, amelyekre a munkafolyamat kártyái épülnek
- [Űrlapok](../forms/index.md) – az űrlapok, amelyek munkafolyamatot indíthatnak
- [Csoportok](../groups/index.md) – azok a csoportok, amelyekbe a „Hozzáadás csoporthoz” művelet helyezheti az embereket
- [Szolgálati tervek](./plans.md) – megerősítő munkafolyamat kiválasztása egy terv szolgálati kéréseihez
- [Szerepkörök és jogosultságok](../settings/roles-permissions.md) – annak szabályozása, ki tekintheti meg, szerkesztheti és kezelheti a munkafolyamatokat
