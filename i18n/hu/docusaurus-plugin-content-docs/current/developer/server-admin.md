---
title: "Szerver-adminisztráció"
---

# Szerver-adminisztráció

<div class="article-intro">

A ChurchApps szerver-adminisztrációs funkciói kizárólag a **Server.Admin** jogosultsággal rendelkező felhasználók számára érhetők el. Ezeket az eszközöket a platform üzemeltetésére, ügyfélszolgálati feladatokra és hibaelhárításra használják a rendszerben szereplő összes gyülekezetnél.

</div>

:::warning Hozzáférés korlátozva
Ez az oldal a **Server.Admin** jogosultságot igénylő funkcióit ismerteti, amelyek nem érhetők el a rendes gyülekezeti adminisztrátorok számára. Kizárólag platformüzemeltetők és ügyfélszolgálati munkatársak számára készültek.
:::

## Hozzáférés a szerver-adminisztrációhoz

A Server.Admin jogosultsággal rendelkező felhasználók a B1 Adminból érhetik el a szerver-adminisztrációs panelt:

1. Jelentkezzen be a [admin.b1.church](https://admin.b1.church) oldalon.
2. Nyissa meg az [Ugrás menüt](../b1-admin/introduction.md#getting-around-with-the-jump-menu), bontsa ki a **Beállítások** menüpontot, majd kattintson a **Szerver-adminisztráció** elemre. (A `admin.b1.church/admin` címre közvetlenül is elmehet.)
3. A szerver-adminisztrációs panel bal oldalán három csoportba rendezve találhatók a szakaszai: **Címtár** (Gyülekezetek, Felhasználók, Felhasználó megszemélyesítése), **Működés** (Háttérfeladatok, Commons, Használati trendek) és **Rendszer** (Fordítási keresések, Szerver állapota, Adatbázis-migrációk).

## Kétfaktoros bejelentkezés visszaállítása

Ha egy felhasználónál be van kapcsolva a [kétfaktoros bejelentkezés](../b1-admin/profile/managing-profile.md#two-factor-sign-in), és elvesztette telefonját és biztonsági kódjait is, a szerver-adminisztrátor kikapcsolhatja azt:

1. Nyissa meg a szerver-adminisztrációs panel **Felhasználók** szakaszát, és keresse meg a felhasználót.
2. A kétfaktoros bejelentkezéssel rendelkező felhasználóknál a **Kétfaktoros bejelentkezés bekapcsolva** jelvény látható. Kattintson mellette a **2FA visszaállítása** gombra.
3. Erősítse meg a felszólítást. Ezt csak azután tegye meg, hogy ellenőrizte, kivel beszél.

A felhasználó ezután már csak a jelszavával tud bejelentkezni, és a profiljában újra beállíthatja a kétfaktoros bejelentkezést. A visszaállításokat a naplóban `mfa_reset` néven rögzítjük. A végpont: `POST /membership/users/mfa/reset/:userId`, és Server.Admin jogosultságot igényel.

## Felhasználó megszemélyesítése

A megszemélyesítési funkcióval a szerver-adminisztrátorok ügyfélszolgálati és hibaelhárítási célból bejelentkezhetnek más felhasználó nevében. Ez hasznos a felhasználók által jelzett problémák kivizsgálásakor, illetve akkor, amikor a gyülekezeteknek segítenek a rendszerük beállításában.

### A megszemélyesítés menete

1. Nyissa meg a szerver-adminisztrációs panel **Felhasználó megszemélyesítése** szakaszát.
2. Írja be a felhasználó nevét vagy e-mail-címét a keresőmezőbe.
3. Kattintson a **Keresés** gombra, vagy nyomjon Entert.
4. A találatok közül kattintson arra a felhasználóra, akit meg szeretne személyesíteni.
5. Erősítse meg a megszemélyesítést a megjelenő párbeszédablakban.
6. Be lesz jelentkezve az adott felhasználóként, és átirányítjuk a fiókjához.

### Fontos tudnivalók

- A megszemélyesítés új munkamenetet hoz létre a célfelhasználó jogosultságaival és gyülekezeti hozzáféréseivel.
- Amikor más felhasználót személyesít meg, az eredeti adminisztrátori munkamenete megszűnik.
- A megszemélyesítés alatt végrehajtott minden művelet bekerül a naplóba.
- Az adminisztrátori fiókjába úgy térhet vissza, hogy kijelentkezik, majd újra bejelentkezik a hitelesítő adataival.
- A megszemélyesítést csak szükség esetén használja ügyfélszolgálati célra, és mindig tájékoztassa a felhasználókat, ha támogatás céljából hozzáfér a fiókjukhoz.

### API-végpont

A megszemélyesítési funkció a Membership API `/users/:userId/impersonate` végpontján alapul. A technikai részletekért lásd: [Membership-végpontok](/docs/developer/api/endpoints/membership#users).

### Biztonsági szempontok

- A megszemélyesítéshez Server.Admin jogosultság szükséges. Ezt a jogosultságot csak óvatosan, kizárólag megbízható platformüzemeltetőknek érdemes megadni.
- Minden megszemélyesítési eseményt rögzítünk az adminisztrátor és a célfelhasználó azonosítójával.
- A gyülekezeteket nem értesítjük, ha megszemélyesítés történik, ezért határozzon meg világos szabályokat arra, hogy mikor és hogyan használják ezt a funkciót.
- Érdemes a megszemélyesítési eseményeket a támogatási jegyrendszerében is dokumentálni az elszámoltathatóság érdekében.

## Commons moderálás

A Commons a termékek között megosztott moderációs sor a felhasználók által beküldött tartalmakhoz. A WorshipCommons-dalok, a Lessons.church-leckék, a FreeShow-sablonok és a B1 weboldal-szerkesztő sablonjai mind ugyanebbe a sorba kerülnek, termékenként külön felülvizsgáló eszközök helyett.

### A Commons elérése

1. Nyissa meg a **Commons** fület a szerver-adminisztrációs panelen.
2. Három almenü látható: **Sor**, **Jelentések** és **Elemek**.

A korlátozott jogosultságú **zenei szerkesztő** szerepkörrel rendelkező felhasználók is látják a Sor fület, de nem hagyhatnak jóvá olyan beküldéseket, amelyek egy dal jogait vagy licencelését módosítják.

### Sor

A Sor a termékek összes függőben lévő beküldését listázza, szűrhető termék és elemtípus szerint. Minden sor megmutatja, hogy a beküldés új elem, az eredeti szerző szerkesztése vagy harmadik fél szerkesztése. Emellett látszik a beküldő jóváhagyási előélete, és az is, hogy mióta vár a beküldés (72 óra után megjelölve).

Kattintson a **Felülvizsgálat** gombra, hogy megnyíljon egy panel a mezőszintű különbségekkel, a fájl-előnézetekkel és a tétel beágyazott, csak olvasható előnézetével. A **a**/**r** billentyűkkel hagyhatja jóvá vagy utasíthatja el a beküldést, a **j**/**k** billentyűkkel pedig a panel bezárása nélkül léphet a következő vagy az előző beküldésre. Elutasításkor ki kell választania egy okot (például minőség, duplikátum, licencelés, CCLI, AI vagy nem témába illő), és meg kell adnia egy megjegyzést.

### Jelentések

A Jelentések fül a már közzétett elemekkel kapcsolatos szerzői jogi és szabályzati/minőségi jelentéseket kezeli. Ezek külön **Szerzői jog** és **Szabályzat és egyéb** sorokban találhatók, a lezártak pedig a **Megoldott** előzményekben. Egy jelentés feldolgozásához igényelje azt, majd oldja meg egy megoldással (helyt adva, elutasítva vagy duplikátum) és egy művelettel (nincs, közzététel visszavonása vagy eltávolítás).

### Elemek

Az Elemek fül a közzétett tartalmak kereshető böngészője. Itt az elemekhez az alábbi műveletek érhetők el: **Kiemelés** (megjelenik a termék kezdőlapján), **Közzététel visszavonása** vagy **Újra közzététel**, illetve **Eltávolítás** (szerzői jogi vagy szabályzati indokkal).

Dalok esetében itt válik egy dal **vasárnapra kész** állapotúvá, ami azt jelenti, hogy megjelenhet a gyülekezet B1 Admin dalkeresőjében. A felülvizsgáló megnyitja az elemet, és minden közzétett **hangnemet** **Meghallgatva** állapotba állít, miután végighallgatta a dalt, és megerősítette, hogy a kotta, az akkordok és a diák mind megvannak. Egy dal csak akkor lesz vasárnapra kész, ha minden hangnem be van jelölve.

:::info
A Commons moderálása csak munkatársak számára érhető el, az egyes gyülekezetek sosem látják ezt a sort. Az egyetlen hely, ahol egy gyülekezet B1 Adminja hozzáfér a Commons adataihoz, a [dalkeresés](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) „WorshipCommons – ingyenes” szakasza, amely kizárólag azokat a dalokat mutatja, amelyek már átestek ezen a felülvizsgálati folyamaton.
:::

A mögöttes adatmodellről és a beküldés életciklusáról lásd: [Content Commons architektúra](/docs/developer/architecture/commons).

## Csoportos e-mail jóváhagyása

A gyülekezetek nem küldhetnek saját szövegű e-mailt (csoportos e-mail, űrlap-utánkövetés, munkafolyamat-e-mailek és fiókmeghívók), amíg egy szerver-adminisztrátor jóvá nem hagyja azt. Így megakadályozható, hogy a botokkal regisztrált gyülekezetek a közös ChurchApps küldőcímet spamelésre használják.

1. Nyissa meg a **Gyülekezetek** fület a szerver-adminisztrációs panelen.
2. Minden gyülekezetnél látható egy **Csoportos e-mail** címke: **Jóváhagyva** (zöld) vagy **Nincs jóváhagyva** (körvonalas).
3. Kattintson a címkére, majd erősítse meg a jóváhagyást vagy a jóváhagyás visszavonását.

Az egyházi munkatársak a B1 Admin e-mail-küldési párbeszédablakában a **Felülvizsgálat kérése** gombbal kérhetnek jóváhagyást. A kérés e-mailben érkezik az ügyfélszolgálati címre, és tartalmazza a gyülekezet nevét, azonosítóját, regisztrációs dátumát, helyét, valamint azt, hogy ki kérte. Egy gyülekezet hetente egy kérést küldhet. A napi keretről és a visszapattanások és panaszok miatti automatikus szüneteltetésről lásd: [Gyülekezet által írt e-mailek korlátai](/docs/developer/architecture/notifications#church-authored-email-limits).

## Adatbázis-migrációk

A **Deploy Prod** munkafolyamat maga alkalmazza a függőben lévő migrációkat. Az üzemi adatbázisok csak az Api hálózatából fogadnak kapcsolatot, így a GitHub futtatókörnyezete nem éri el őket. Ehelyett a `serverless deploy` után közvetlenül a munkafolyamat meghívja az Api `migrate` Lambda-függvényét (`api-Prod-migrate`). Ez minden modul függőben lévő migrációit lefuttatja ugyanazzal a futtatóval, mint ez a fül, és sikertelenné teszi a telepítést, ha bármelyik modul hibázik vagy el lett utasítva. A **Rollback Prod** csak a Lambda-kódot állítja vissza; az alkalmazott migrációk alkalmazva maradnak. Az **Adatbázis-migrációk** fül az állapot ellenőrzésére szolgál, valamint arra, hogy lefuttassuk azokat a migrációkat, amelyeket a telepítés nem futtatott le (például a demo környezetben, ahol a telepítés nem végez migrációt), illetve arra, hogy az előzmények nélküli modulok alapállapotát rögzítsük. (Az önállóan üzemeltetett Docker-telepítésekben a migrációk továbbra is automatikusan futnak, amikor az Api konténer elindul.)

A fül megmutatja az aktuális környezetet, valamint modulonként egy sort (membership, attendance, giving stb.), az állapotukkal, az alkalmazott és a függőben lévő migrációk számával, valamint az utoljára alkalmazott migrációval.

- **Függőben lévő migrációk futtatása**: lefuttatja az összes függőben lévő migrációt, modulonként egyesével, sorrendben. Az első hibánál leáll, és modulonként megmutatja, mi lett alkalmazva.
- Az a modul, amelyet **Nincs előzmény** jelöl, olyan adatbázissal rendelkezik, amely megelőzi a migrációkövetést. Ezt soha nem futtatja automatikusan, mert az régi adatmigrációkat játszana le az élő táblákon. Ehelyett kattintson az adott modulnál a **Séma ellenőrzése** gombra. Az Api összeveti az egyes migrációk által létrehozott táblákat, oszlopokat és indexeket az élő adatbázissal, és minden migrációt megjelöl: **Már alkalmazva**, **Hiányzik**, **Részben alkalmazva** vagy **Csak adat**. Az ellenőrzés nem változtat semmit.
- Az ellenőrzés eredményeiben a **Rögzítés alkalmazottként** gomb (megerősítés után) a felismert migrációkat a migrációs előzményekbe írja anélkül, hogy lefuttatná azokat. Az utolsó **Már alkalmazva** migrációig minden rögzítésre kerül, beleértve a tartományon belüli **Csak adat** migrációkat is. A **Hiányzik** jelzésű migrációk függőben maradnak, és ezután a **Függőben lévő migrációk futtatása** gombbal normálisan lefuttathatók.
- A **Részben alkalmazva** migráció blokkolja a rögzítést. Ha a migráció biztonságosan újrafuttatható (előbb olvassa el), jelölje be az **Újrafuttatás** opciót, hogy függőben maradjon, és elejétől újra lefusson.

A Szerver-adminisztrációs panel és a CLI (`yarn migrate:up`) ugyanazt a Kysely-migrátort és a `kysely_migration` táblát használja, így mindig egyeznek abban, mi lett alkalmazva. A mögöttes végpontok: `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` és `POST .../:module/baseline`. Mindegyikhez kizárólag Server.Admin jogosultsággal lehet hozzáférni.

## Kapcsolódó oldalak

- [Hitelesítés és jogosultságok](/docs/developer/api/endpoints/authentication): a jogosultsági modell és a JWT-hitelesítés
- [Membership-végpontok](/docs/developer/api/endpoints/membership): a felhasználó- és gyülekezetkezelő API
- [Audit-napló](/docs/b1-admin/reports/audit-log): a gyülekezet tevékenységnaplóinak megtekintése
- [Content Commons architektúra](/docs/developer/architecture/commons): a megosztott elemmodell és a moderációs életciklus
