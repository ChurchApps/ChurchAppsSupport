---
title: "Gyülekezeti beállítások"
description: "Állítsa be gyülekezete nevét, címét, aldomainjét, időzónáját, régióformátumát, SMS-szolgáltatóját és fájltárolását a B1 Admin Gyülekezeti beállítások oldalán."
---

# Gyülekezeti beállítások

<div class="article-intro">

A Gyülekezeti beállítások oldalon adhatja meg gyülekezete alapvető adatait, elérhetőségeit és arculati elemeit. Ezek az adatok minden ChurchApps eszközben megjelennek, beleértve a B1.church webhelyet és a B1 App alkalmazást.

</div>

## Oktatóvideó

<YouTube id="634zSbzDkYA" title="Gyülekezeti adatok és arculat beállítása a B1-ben" next="Szerepkörök, jogosultságok és csapattagok meghívása a B1-ben" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van a „Gyülekezeti beállítások szerkesztése” jogosultságra. Ha nincs hozzáférése, olvassa el a [Szerepkörök és jogosultságok](./roles-permissions.md) oldalt.
- Készítse elő gyülekezete címét, elérhetőségeit és logóját.

</div>

## A gyülekezet adatainak szerkesztése

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsa ki a **Beállítások** menüpontot, majd kattintson a **Beállítások** gombra.
2. A **Gyülekezeti információk** szakaszban (az oldal tetején) kattintson a **Szerkesztés** gombra.
3. Módosítsa az alábbi mezők bármelyikét:
   - **Gyülekezet neve** -- Ez a név jelenik meg minden ChurchApps terméken.
   - **Cím** -- Gyülekezete fizikai címe.
   - **Elérhetőségek** -- Telefonszám, e-mail-cím és egyéb kapcsolattartási adatok.
   - **Időzóna** -- Gyülekezete időzónája. Lásd alább: [Időzóna](#time-zone).
4. A módosítások mentéséhez kattintson a **Mentés** gombra.

## Aldomain beállítása

Gyülekezete ingyenes aldomaint kap a **gyulekezetneve.1.church** címen. Ezen a webcímen érhetik el a tagok és a látogatók gyülekezete online jelenlétét.

1. A Beállítások oldalon kattintson a **Gyülekezeti információk** szakaszban a **Szerkesztés** gombra, majd keresse meg az **Aldomain** mezőt.
2. Adja meg a kívánt aldomaint (például „gracechurch” a gracechurch.1.church címhez).
3. Mentse a módosításokat.

:::info
Az aldomainnek egyedinek kell lennie az összes ChurchApps gyülekezet között. Ha a kívánt név foglalt, próbálja meg hozzáadni a város vagy az állam nevét (például „gracechurch-dallas”).
:::

Ha azt szeretné, hogy a látogatók saját domainjén érjék el a webhelyét (például **`www.gracechurch.org`**), olvassa el az [Egyedi domain](./custom-domain.md) oldalt.

## Arculat beállítása

Testreszabhatja, hogyan jelenik meg gyülekezete az összes ChurchApps eszközben:

1. Töltse fel a **gyülekezeti logót** a logóterületre kattintva, majd válasszon ki egy képfájlt.
2. Adjon hozzá további **gyülekezeti képeket**, amelyeket a webhelyén és a [mobilalkalmazásban](./mobile-app.md) használhat.

:::tip
A legjobb eredmény érdekében használjon PNG formátumú, átlátszó hátterű logót. Így mindkét, világos és sötét hátterű felületen jól fog kinézni.
:::

## A hét első napja

Válassza ki, melyik napon kezdődjenek a naptárai. A Gyülekezeti információk szakasz **A hét első napja** legördülő menüjében alapértelmezetten a **vasárnap** van beállítva, de bármelyik napra módosítható. A módosítás után a B1 Adminban és a B1.church tagi portálon a naptárrácsok is ezzel a nappal kezdődnek: a csoportnaptárak, a szerkesztett naptárak és az eseményszerkesztő is a kiválasztott napon kezdi a heteket.

## Időzóna

A Gyülekezeti információk szakasz **Időzóna** legördülő menüje állítja be gyülekezete időzónáját (például *America/Chicago*). Ha üresen szeretné hagyni, válassza a **Nincs** lehetőséget. Mentés után az időzóna megjelenik a Gyülekezeti információk összefoglalójában.

A B1 ezt az időzónát használja a gyülekezet egészére érvényes időpontokhoz, például az eseményemlékeztetőkhöz és a [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) televíziókon megjelenő beosztásokhoz. A [bejelentkezési időpontok](../attendance/setup.md#setting-a-check-in-schedule) mérésénél először az istentisztelet [gyülekezeti helyszínének](./campuses.md) időzónáját veszi figyelembe, és csak akkor használja a gyülekezet időzónáját, ha a helyszínnek nincs saját időzónája. Ha összes helyszíne ugyanabban az időzónában van, állítsa be a gyülekezetnél és minden helyszínnél is.

## Régió (dátum- és telefonformátum)

A **Régió** beállítás határozza meg, hogyan jelennek meg a dátumok és az időpontok az egész B1-ben. Alapértelmezetten az Egyesült Államok formátumát használja a rendszer (például „Sep 28, 2026” és „9/28/2026”). Az Egyesült Államokon kívüli gyülekezetek átválthatnak saját formátumukra. Ha például az angol (Egyesült Királyság) lehetőséget választja, a dátumok „28 Sept 2026” és „28/09/2026” alakban jelennek meg.

1. A Beállítások oldalon kattintson a bal oldali listában a **Régió** menüpontra, majd a **Régió** szakaszban a **Szerkesztés** gombra.
2. Válassza ki régióját a **Régió** legördülő menüből. Minden lehetőség mutat egy mintadátumot, így pontosan láthatja, hogyan fognak megjelenni a dátumok.
3. Kattintson a **Mentés** gombra.

A Régió szakasz ezután megmutatja a kiválasztott régiót, a **Dátumformátum** mintáját és a **Telefonszámok** formátumát.

### Telefonszámok formátuma

Ugyanebben a Régió szakaszban található a **Telefonszámok** beállítás, amely azt szabályozza, hogyan lehet telefonszámokat megadni a személyek adatlapjain:

- **Nemzetközi (országkóddal)** -- Ez az alapértelmezett beállítás. A telefonmezőkben országzászló-választó jelenik meg, és a számok országkóddal mentődnek (például +1 918 555 1234).
- **Helyi (ahogy beírja)** -- A telefonmezők egyszerű szövegmezőkké válnak, és a számokat pontosan úgy mentik, ahogy beírja, országkód hozzáadása nélkül (például 0701 234 5678). Ezt válassza, ha gyülekezete helyi formátumban írja a számokat, és nem szeretné, hogy a B1 országkódot adjon hozzájuk.

Ha a **Helyi** lehetőség van kiválasztva, a Régió szakasz a régió neve mellett a „Helyi telefonszámok” feliratot is megjeleníti.

:::tip
Az SMS-küldés akkor működik a legjobban, ha a számok tartalmazzák az országkódot. Ha a B1-ből küld szöveges üzeneteket, tartsa meg a **Nemzetközi** formátumot, vagy gondoskodjon arról, hogy a Helyi módban megadott számok tartalmazzák az országkódot.
:::

A régió beállítása a B1 Adminban és a B1.church webhelyen és tagi portálon is érvényes a dátumokra és időpontokra, beleértve az igehirdetéseket, a blogbejegyzéseket, a csoportnaptárakat és a szolgálati terveket. Így a tagok ugyanabban a formátumban látják a dátumokat, mint a munkatársak.

## SMS-küldés {#texting}

Csatlakoztasson SMS-szolgáltatót, hogy a B1 Adminból egy személynek vagy egy teljes csoportnak küldhessen SMS-üzeneteket. Az üzeneteket az Ön saját szolgáltatói fiókján keresztül küldi a rendszer, ezért a szolgáltató díjai és korlátai érvényesek rájuk.

1. A Beállítások oldalon kattintson a bal oldali listában az **SMS-küldés** menüpontra, majd az **SMS-küldés** szakaszban a **Szerkesztés** gombra.
2. Válasszon **Szolgáltatót**:
   - **Clearstream** -- Adja meg az **API-kulcsot**. A kulcsot a Clearstream fiókbeállításaiban hozhatja létre, az API-kulcsok alatt.
   - **Text In Church** -- Adja meg az **API-kulcsot**. Először kérjen fejlesztői API-hozzáférést a Text In Church ügyfélszolgálatától, majd a fiókbeállításokban, a Fiók beállítások > Fejlesztői API szakaszban hozzon létre egy kulcsot.
   - **Nalo Solutions** (Ghána) -- Adja meg a Nalo Solutions fiókjához tartozó hitelesítési kulcsot **API-kulcsként**, valamint egy **Feladó azonosítót** (legfeljebb 11 karakter), amelyet a Nalo jóváhagyott az Ön számára.
   - **Twilio** -- Használja gyülekezete saját Twilio-fiókját. A Twilio közvetlenül Önnek számláz. Másolja ki a **Fiókazonosítót (Account SID)** és a **Hitelesítési tokent (Auth Token)** a [Twilio konzolról](https://console.twilio.com), és adjon meg egy **Küldő számot (From Number)**. Ez egy A2P 10DLC-re regisztrált Twilio telefonszám legyen, például `+15551234567` formátumban. Mentés után illessze be a bejövő webhook URL-t (lásd lent) a szám **Üzenet érkezésekor (A message comes in)** webhookjába a Twilio-ban, hogy a STOP válaszok a B1-ben is rögzüljenek.
3. Kattintson a **Mentés** gombra.

Az SMS-küldés leállításához állítsa a **Szolgáltató** mezőt **Nincs** értékre, majd mentse. Ez eltávolítja a mentett szolgáltatót.

### Leiratkoztatás azoknál, akik STOP üzenettel válaszolnak

Miután elmentett egy szolgáltatót, nyissa meg újra az SMS-küldés szakaszt a **Szerkesztés** gombbal. A szolgáltató beállításai alatt egy csak olvasható **Bejövő (STOP) webhook URL** mező jelenik meg, amely gyülekezetére egyedi webcímet mutat. Kattintson a mezőre a cím kijelöléséhez, másolja ki, majd illessze be a szolgáltatója bejövő üzenet (válasz) webhook-beállításába. Ez a fent felsorolt szolgáltatók közül bármelyikkel működik, amely továbbítani tudja a beérkező válaszokat webhookra.

Ezt követően, ha valaki a küldött üzenetei egyikére **STOP** (vagy STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT vagy REVOKE) választ küld, a B1 megkeresi az összes olyan személyt, akinek a mobilszáma egyezik, megjelöli őket leiratkozottként, és kikapcsolja az SMS-emlékeztetőiket. Ezután kimaradnak a csoportos SMS-üzenetekből. A többi válasz figyelmen kívül marad.

:::info
Ez ugyanazt a leiratkozási beállítást használja, mint a **Rejtse el a tagmappából** beállítás, ezért a STOP választ küldő személyek profilján is a **Elrejtve a tagmappából** felirat jelenik meg. Ez a mező csak akkor látszik, ha a mentett szolgáltató van kiválasztva. Ha egy másik szolgáltatóra vált a legördülő menüben, előbb mentse a módosítást, hogy újra megjelenjen az URL.
:::

Ha egy szolgáltató már csatlakoztatva van, az SMS-küldési jogosultsággal rendelkező munkatársak a csoport oldalán a **SMS küldése** gombot (**SMS küldése ennek a csoportnak**), a mobiltelefonszámmal rendelkező személy oldalán pedig a **Szöveges üzenet küldése** gombot (**Szöveges üzenet küldése**) látják. Írja be az üzenetet, majd kattintson a **Küldés** gombra. A párbeszédablak számolja a karaktereket és az SMS-szegmenseket. Csoport esetén a küldés előtt megmutatja, hány tag fogja megkapni az üzenetet:

- A mobiltelefonszám nélküli tagok kimaradnak.
- Azok a tagok, akik a **Rejtse el a tagmappából** beállítást választották, leiratkozottnak számítanak, és kimaradnak.
- Azok a családtagok, akik ugyanazt a mobilszámot használják, csak egyszer kapják meg az üzenetet.

### Üzenetek személyre szabása összevonó mezőkkel {#personalizing-texts-with-merge-fields}

Az üzenetmező alatt a szöveges üzenet párbeszédablak helyőrző-címkéket jelenít meg: **Keresztnév**, **Vezetéknév**, **Megjelenített név** és **Gyülekezet neve**. Kattintson egy címkére, hogy a helyőrzőt (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` vagy `{{churchName}}`) a kurzor helyére illessze. Küldéskor minden helyőrzőt az adott címzett adataira cserél a rendszer, így egy ilyen csoportos üzenet: `Hi {{firstName}}, see you Sunday!` mindenkinek a saját nevével érkezik. A helyőrzők csoportos és egyéni üzeneteknél is működnek. A csoportos üzenetek esetében elérhető a **Csoport neve** címke (`{{groupName}}`) is, amelyet a csoport nevével helyettesít a rendszer.

Ha újra szeretne használni egy üzenetet, mentse el [szöveges sablonként](./email-templates.md#text-templates) (e-mail sablonként, a **Szöveg** kategóriával), majd válassza ki a **Sablon betöltése (opcionális)** mezőből a Szöveges üzenet ablak tetején.

:::info
Az 1600 karakteres korlát arra az üzenetre vonatkozik, amelyet gépel. A helyőrzők kitöltése után az 1600 karakternél hosszabb szöveg ezen a hosszon lesz levágva.
:::

Az üzenetek a [munkafolyamat](../serving/workflows.md#sending-a-text) egy lépéseként is automatikusan kiküldhetők a **Szöveges üzenet küldése** művelettel. Ez ugyanazt a szolgáltatót és ugyanazokat a helyőrzőket használja.

## Fájltárolás

Alapértelmezetten a webhelyére feltöltött fájlok ([Fájlok](../website/files.md)) és más tartalomterületek a B1 ingyenes, tárhelyezett tárolóját használják, legfeljebb 100 MB-ig. Ha több helyre van szüksége, csatlakoztathatja saját felhőtárhelyét. Ebben az esetben az új feltöltések közvetlenül az Ön fiókjába kerülnek, platformkorlát nélkül.

1. A Beállítások oldalon kattintson a bal oldali listában a **Fájltárolás** menüpontra, majd a **Fájltárolás** szakaszban a **Szerkesztés** gombra.
2. Válasszon szolgáltatót: **Google Drive**, **Dropbox**, **OneDrive** vagy **S3-kompatibilis tároló** (AWS S3, Cloudflare R2, Backblaze B2 stb.).
3. Google Drive, Dropbox vagy OneDrive esetén kattintson a **Csatlakozás** gombra, majd jelentkezzen be a hozzáférés engedélyezéséhez. S3-kompatibilis tároló esetén adja meg a hozzáférési kulcsot, a titkos kulcsot, a tároló nevét és a nyilvános URL alapot.
4. Kattintson a **Mentés** gombra.

:::info
Ez csak a webhelye Fájlok részébe és a hasonló tartalomterületekre érkező új feltöltésekre vonatkozik. A galéria képei, bélyegképei, logói és a személyek fotói mindig a B1 alapértelmezett tárolóján maradnak.
:::

## Évfolyam-előrelépés

Ha a gyermekek és tanulók **évfolyamát** nyilvántartja, a B1 automatikusan egy évfolyammal feljebb léptetheti mindenkit az Ön által megadott napon (például augusztus 1-jén). Így nem kell minden profilt kézzel szerkesztenie. A 12. évfolyamosok ilyenkor **Végzett** státuszt kapnak.

1. A Beállítások oldalon kattintson a bal oldali listában az **Évfolyam-előrelépés** menüpontra, majd az **Évfolyam-előrelépés** szakaszban a **Szerkesztés** gombra.
2. Kapcsolja be a kapcsolót (ha bekapcsolt, az **Engedélyezve** felirat látszik), és válassza ki azt a **hónapot** és **napot**, amikor évente az évfolyamok léptetése történik. Ezen a napon mindenki, akinek van évfolyama, egy évfolyammal feljebb lép, a 12. évfolyamosok pedig **Végzett** státuszt kapnak.
3. Mentse a módosításokat.

Az automatikus léptetés leállításához kapcsolja ki a kapcsolót, hogy a **Letiltva** felirat jelenjen meg, majd mentse. A léptetés dátuma törlődik, és az évfolyamok többé nem változnak automatikusan.

## Önkéntes jelentkezés {#volunteer-signup}

Alapértelmezetten a tagok, akik böngészik az [önkéntes jelentkezéseket](../../b1-church/serving/volunteer-signup.md), minden olyan közelgő hetet látnak, amelyre van szabad pozíció. Ha ez a lista túl hosszú lenne, megjelenítheti csak minden tervtípus következő hetét.

1. A Beállítások oldalon kattintson a bal oldali listában az **Önkéntes jelentkezés** menüpontra, majd az **Önkéntes jelentkezés** szakaszban a **Szerkesztés** gombra.
2. Kapcsolja be a **Csak az egyes tervtípusok következő hetét mutassa** beállítást.
3. Mentse a módosításokat.

Ha ez be van kapcsolva, minden tervtípusnál csak a következő közelgő terv jelenik meg. A következő hét akkor látszik, amikor az aktuális dátum elmúlt. A szakasz **Megjelenített hetek** sora a **Csak minden tervtípus következő hete** vagy az **Összes közelgő hét** feliratot mutatja.

## Adományozási adatvédelem {#giving-privacy}

Az adományozási jogosultsággal rendelkező személyek általában látják a személyek adatlapján szereplő adománytotálokat ([személyi adatlap](../people/adding-people.md#editing-details)). Ha nem szeretné, hogy minden alkalommal megjelenjenek az összegek, amikor valaki megnyit egy adatlapot, elrejtheti őket addig, amíg valaki kifejezetten nem kéri.

1. A Beállítások oldalon kattintson a bal oldali listában az **Adományozási adatvédelem** menüpontra, majd az **Adományozási adatvédelem** szakaszban a **Szerkesztés** gombra.
2. Kapcsolja be a **Adományok elrejtése a személyi adatlapokon, amíg rá nem kattintanak** beállítást.
3. Mentse a módosításokat.

Ha ez be van kapcsolva, a személyi adatlap adománykártyáján ez a felirat jelenik meg: „Az adományok el vannak rejtve a személyi adatlapokon.” A személy adományainak betöltéséhez és megjelenítéséhez kattintson a **Adományok megjelenítése** gombra. Más személy megnyitásakor újra elrejtődnek. Az adományok megtekintésének jogosultsága nem változik: a kártyát továbbra is csak azok látják, akiknek van adományozási hozzáférésük.

## Importálás és exportálás

A Beállítások oldalon, a gyülekezet neve alatt található **Importálás/Exportálás** hivatkozás egy külön eszközt nyit meg új böngészőablakban. Ezzel:

- importálhat tagadatokat egy másik egyházkezelő rendszerből,
- exportálhatja ChurchApps-adatait biztonsági mentés vagy adatátvitel céljából.

Ez különösen hasznos, amikor most állítja be a gyülekezetét, és a meglévő nyilvántartásokat át kell vinnie a ChurchApps-be.

:::warning
Adatok importálása előtt mindig készítsen biztonsági mentést a meglévő nyilvántartásokról. Az importálási műveletek adatokat adnak a rendszerhez, és többszöri futtatás esetén duplikált bejegyzéseket hozhatnak létre.
:::
