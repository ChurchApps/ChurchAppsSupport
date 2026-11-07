---
title: "Egyházi beállítások"
---

# Egyházi beállítások

<div class="article-intro">

Az Egyházi beállítások oldalon adhatja meg egyháza alapvető adatait, elérhetőségeit és arculatát. Ezeket az adatokat a ChurchApps minden eszköze használja, beleértve a B1.church weboldalát és a B1 Mobile alkalmazást is.

</div>

## Oktatóvideó

<YouTube id="634zSbzDkYA" title="Egyházi adatok és arculat beállítása a B1-ben" next="Szerepkörök, jogosultságok és csapattagok meghívása a B1-ben" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Szüksége van az „Egyházi beállítások szerkesztése” jogosultságra. Ha nincs hozzáférése, olvassa el a [Szerepkörök és jogosultságok](./roles-permissions.md) részt.
- Készítse elő egyháza címét, elérhetőségeit és logóját

</div>

## Az egyházi adatok szerkesztése

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a bal felső sarokban lévő keresősávot), bontsa ki a **Beállítások** menüpontot, majd kattintson a **Beállítások** gombra.
2. A **Egyházi információk** szakaszban (az oldal tetején) kattintson a **Szerkesztés** gombra.
3. Módosítsa a következő mezők bármelyikét:
   - **Egyház neve** -- Ez a név jelenik meg a ChurchApps termékek mindegyikében.
   - **Cím** -- Egyháza fizikai címe.
   - **Elérhetőségek** -- Telefonszám, e-mail-cím és egyéb kapcsolattartási adatok.
   - **Időzóna** -- Egyháza időzónája. Lásd lentebb: [Időzóna](#time-zone).
4. Kattintson a **Mentés** gombra a módosítások alkalmazásához.

## Az aldomain beállítása

Egyháza ingyenes aldomaint kap a **yourchurch.1.church** címen. Ezen a webcímen érhetik el a tagok és a látogatók egyháza online jelenlétét.

1. A Beállítások oldalon kattintson az **Egyházi információk** szakaszban a **Szerkesztés** gombra, és keresse meg az **Aldomain** mezőt.
2. Adja meg a kívánt aldomaint (például „gracechurch” a gracechurch.1.church címhez).
3. Mentse a módosításokat.

:::info
Az aldomainnek egyedinek kell lennie az összes ChurchApps-egyház között. Ha a kívánt név már foglalt, adja hozzá városa vagy állama nevét (például „gracechurch-dallas”).
:::

Ha azt szeretné, hogy a látogatók saját domainjén érjék el oldalukat (például **`www.gracechurch.org`**), olvassa el az [Egyéni domain](./custom-domain.md) részt.

## Arculat beállítása

Adja meg, hogyan jelenjen meg egyháza a ChurchApps eszközeiben:

1. Töltse fel az **egyházi logót** a logó területére kattintva, majd válasszon egy képfájlt.
2. Adjon hozzá további **egyházi képeket**, amelyeket a weboldalán és a [mobilalkalmazásban](./mobile-app.md) használ.

:::tip
A legjobb eredmény érdekében átlátszó hátterű PNG formátumú logót használjon. Így világos és sötét háttéren egyaránt jól néz ki.
:::

## A hét első napja

Válassza ki, melyik napon kezdődjenek a naptárai. Az Egyházi információk szakaszban található **A hét első napja** legördülő menü alapértelmezés szerint **vasárnap**, de bármelyik napra állítható. A módosítás után a B1 Adminban és a B1.church tagi portálon megjelenő naptárrácsok is a kiválasztott napon kezdik a hetet. Ez vonatkozik a csoportnaptárakra, a kurátorált naptárakra és az eseményszerkesztőre is.

## Időzóna

Az Egyházi információk szakaszban található **Időzóna** legördülő menüben állíthatja be egyháza időzónáját (például *America/Chicago*). Ha üresen szeretné hagyni, válassza a **Nincs** lehetőséget. Mentés után az időzóna megjelenik az Egyházi információk összefoglalójában.

A B1 ezt az időzónát használja az egyházszintű időpontokhoz, például az eseményemlékeztetőkhöz és a [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) tévéken megjelenő menetrendekhez. A [bejelentkezési menetrendek](../attendance/setup.md#setting-a-check-in-schedule) időpontjait először az istentisztelet [gyülekezeti helyének](./campuses.md) időzónája szerint számolja, és csak akkor használja az egyház időzónáját, ha a gyülekezeti helynek nincs saját időzónája. Ha összes gyülekezeti helye egy időzónában van, állítsa be az időzónát az egyházon és minden gyülekezeti helyen is.

## Régió (dátum- és telefonszám-formátum)

A **Régió** beállítás határozza meg, hogyan jelennek meg a dátumok és időpontok a B1-ben. Alapértelmezés szerint az Egyesült Államok formátumát használja (például „Sep 28, 2026” és „9/28/2026”). Az Egyesült Államokon kívüli egyházak áttérhetnek saját formátumukra. Ha például az angol (Egyesült Királyság) lehetőséget választja, a dátumok „28 Sept 2026” és „28/09/2026” formában jelennek meg.

1. A Beállítások oldalon kattintson a bal oldali listában a **Régió** menüpontra, majd a **Régió** szakaszban a **Szerkesztés** gombra.
2. Válassza ki régióját a **Régió** legördülő menüből. Minden lehetőség mellett egy mintadátum látható, így pontosan láthatja, hogyan fognak megjelenni a dátumok.
3. Kattintson a **Mentés** gombra.

A Régió szakasz ezután megjeleníti a kiválasztott régiót, a **Dátumformátum** mintáját és a **Telefonszámok** formátumát.

### Telefonszám-formátum

Ugyanebben a Régió szakaszban található a **Telefonszámok** beállítás, amely azt határozza meg, hogyan kell a telefonszámokat megadni a személyek adatlapjain:

- **Nemzetközi (országkóddal)** -- Ez az alapértelmezett. A telefonmezőkben zászlóválasztó jelenik meg, és a számok országkóddal mentődnek (például +1 918 555 1234).
- **Helyi (ahogy be van írva)** -- A telefonmezők egyszerű szövegmezőkké válnak, és a számokat pontosan úgy mentik, ahogy beírja őket, országkód hozzáadása nélkül (például 0701 234 5678). Ezt válassza, ha egyháza helyi formátumban írja a számokat, és nem szeretné, hogy a B1 országkódot adjon hozzá.

Ha a **Helyi** lehetőség van kiválasztva, a Régió szakasz a régió neve mellett a „Helyi telefonszámok” feliratot is megjeleníti.

:::tip
A SMS-küldés akkor működik a legjobban, ha a számok tartalmazzák az országkódot. Ha a B1-ből küld üzeneteket, tartsa meg a **Nemzetközi** formátumot, vagy gondoskodjon arról, hogy a Helyi módban megadott számok is tartalmazzák az országkódot.
:::

A régió beállítása a B1 Adminban, valamint a B1.church weboldalon és a tagi portálon is érvényes a dátumokra és időpontokra. Ez vonatkozik az igehirdetésekre, a blogbejegyzésekre, a csoportnaptárakra és a szolgálati tervekre is, így a tagok ugyanabban a formátumban látják a dátumokat, mint a munkatársak.

## SMS-küldés {#texting}

Csatlakoztasson SMS-szolgáltatót, hogy a B1 Adminból egy személynek vagy egy teljes csoportnak üzenetet küldhessen. Az üzeneteket az Ön saját szolgáltatói fiókján keresztül küldi el a rendszer, így a szolgáltató díjai és korlátai érvényesek rájuk.

1. A Beállítások oldalon kattintson a bal oldali listában az **SMS-küldés** menüpontra, majd az **SMS-küldés** szakaszban a **Szerkesztés** gombra.
2. Válasszon egy **Szolgáltatót**:
   - **Clearstream** -- Adja meg az **API-kulcsot**. Ezt a Clearstream fiókbeállításaiban hozhatja létre az API-kulcsok alatt.
   - **Text In Church** -- Adja meg az **API-kulcsot**. Először kérjen fejlesztői API-hozzáférést a Text In Church ügyfélszolgálatától, majd hozzon létre egy kulcsot a fiókbeállítások **Developer API** részében.
   - **Nalo Solutions** (Ghána) -- Adja meg a Nalo Solutions fiókjából származó hitelesítési kulcsot **API-kulcsként**, valamint a Nalo által Önnek jóváhagyott **Feladóazonosítót** (legfeljebb 11 karakter).
   - **Twilio** -- Használja egyháza saját Twilio-fiókját; a Twilio közvetlenül Önnek számláz. Másolja ki az **Account SID** és az **Auth Token** értékeket a [Twilio konzolból](https://console.twilio.com), és adja meg a **Feladó számot** -- ez egy A2P 10DLC-re regisztrált Twilio-telefonszám, például `+15551234567` formátumban. Mentés után illessze be a bejövő üzenetek webhook-URL-jét (lásd lentebb) a számhoz tartozó **Érkezik üzenet** webhookba a Twilióban, hogy a STOP válaszok a B1-ben is rögzítésre kerüljenek.
3. Kattintson a **Mentés** gombra.

Az SMS-küldés leállításához állítsa a **Szolgáltatót** **Nincs** értékre, majd mentsen. Ez eltávolítja a mentett szolgáltatót.

### A STOP választ küldők leiratkoztatása

Miután elmentett egy szolgáltatót, nyissa meg újra az SMS-küldés szakaszt a **Szerkesztés** gombbal. A szolgáltatóbeállítások alatt egy csak olvasható **Bejövő (STOP) webhook URL** mező jelenik meg, amely egyháza számára egyedi webcímet mutat. Kattintson a mezőre a cím kijelöléséhez, másolja ki, és illessze be a szolgáltatója bejövő üzenetekhez (válaszokhoz) tartozó webhook-beállításába. Ez a fenti szolgáltatók közül mindazokkal működik, amelyek továbbítani tudják a bejövő válaszokat webhookra.

Ezután, ha valaki a üzenetei egyikére **STOP** (vagy STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT vagy REVOKE) választ küld, a B1 megkeresi az összes olyan személyt, akinek a mobilszáma egyezik, leiratkozottként jelöli meg őket, és kikapcsolja a szöveges emlékeztetőiket. Ezután kimaradnak a csoportos üzenetekből. A többi választ a rendszer figyelmen kívül hagyja.

:::info
Ez ugyanazt a leiratkozási beállítást használja, mint a **Rejtsen el a tagjegyzékből** opció, így a STOP választ küldők profilján is a **Elrejtve a tagjegyzékből** felirat jelenik meg. A mező csak akkor látszik, ha a mentett szolgáltató van kiválasztva. Ha a legördülő menüben másik szolgáltatóra vált, előbb mentsen, hogy újra megjelenjen az URL.
:::

Ha van csatlakoztatott szolgáltató, a küldési jogosultsággal rendelkező munkatársak a csoport oldalán (**Csoport üzenetküldése**) és a mobiltelefonszámmal rendelkező személy oldalán (**SMS küldése**) látni fognak egy **Üzenet** gombot. Írja be üzenetét, majd kattintson a **Küldés** gombra. A párbeszédablak számolja a karaktereket és az SMS-szegmenseket. Csoport esetében a küldés előtt megjeleníti, hány tag kapja meg az üzenetet:

- A mobiltelefonszám nélküli tagok kimaradnak.
- Azok a tagok, akik a **Rejtsen el a tagjegyzékből** opciót választották, leiratkozottnak számítanak, és kimaradnak.
- Azok a családtagok, akik ugyanazt a mobilszámot használják, csak egyszer kapják meg az üzenetet.

### Az üzenetek személyre szabása összevonási mezőkkel {#personalizing-texts-with-merge-fields}

Az üzenetmező alatt az üzenetablak helyettesítő címkéket jelenít meg: **Keresztnév**, **Vezetéknév**, **Megjelenített név** és **Egyház neve**. Kattintson egy címkére, hogy a helyettesítő szöveg (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` vagy `{{churchName}}`) a kurzor helyére kerüljön. Küldéskor minden helyettesítő szöveget az adott címzett adataival cserél le a rendszer, így például a `Hi {{firstName}}, see you Sunday!` típusú csoportos üzenet mindenki számára a saját nevével érkezik meg. A helyettesítő mezők csoportos üzeneteknél és egy személynek küldött üzeneteknél is működnek. A csoportnak szóló üzeneteknél megjelenik a **Csoport neve** címke is (`{{groupName}}`), amelyet a csoport nevével helyettesít a rendszer.

Ha szeretne újra felhasználni egy üzenetet, mentse el [szöveges sablonként](./email-templates.md#text-templates) (olyan e-mail-sablonként, amelynek kategóriája **Szöveg**), majd az üzenetablak tetején lévő **Sablon betöltése (opcionális)** menüből válassza ki.

:::info
Az 1600 karakteres korlát a beírt üzenetre vonatkozik. A helyettesítő mezők kitöltése után minden 1600 karakternél hosszabb szöveg ezen a hosszon lesz levágva.
:::

Az üzenetek egy [munkafolyamat](../serving/workflows.md#sending-a-text) lépéseként is automatikusan kiküldhetők a **Szöveg küldése** művelettel. Ez ugyanazt a szolgáltatót és ugyanazokat a helyettesítő mezőket használja.

## Fájltárolás

Alapértelmezés szerint a weboldalára (a [Fájlok](../website/files.md) menüponton keresztül) és más tartalmi területekre feltöltött fájlok a B1 ingyenes, tárhelyezett tárolóját használják, legfeljebb 100 MB-ig. Ha több helyre van szüksége, csatlakoztathatja saját felhőtárhelyét. Az új feltöltések ekkor közvetlenül az Ön fiókjába kerülnek, platformkorlát nélkül.

1. A Beállítások oldalon kattintson a bal oldali listában a **Fájltárolás** menüpontra, majd a **Fájltárolás** szakaszban a **Szerkesztés** gombra.
2. Válasszon szolgáltatót: **Google Drive**, **Dropbox**, **OneDrive** vagy egy **S3-kompatibilis tárolót** (AWS S3, Cloudflare R2, Backblaze B2 stb.).
3. Google Drive, Dropbox vagy OneDrive esetén kattintson a **Csatlakozás** gombra, és jelentkezzen be a hozzáférés engedélyezéséhez. S3-kompatibilis tároló esetén adja meg a hozzáférési kulcsot, a titkos kulcsot, a tárolónevet és a nyilvános URL alapot.
4. Kattintson a **Mentés** gombra.

:::info
Ez csak a weboldalának Fájljaiba és a hasonló tartalmi területekre érkező új feltöltéseket érinti. A galériaképek, a bélyegképek, a logók és a személyek fotói mindig a B1 alapértelmezett tárolóján maradnak.
:::

## Évfolyam-léptetés

Ha a gyermekek és a tanulók **Évfolyamát** követi nyilvántartásában, a B1 automatikusan egy évfolyammal feljebb léptetheti mindenkit a Ön által megadott napon (például augusztus 1-jén). Így nem kell minden profilt kézzel szerkesztenie.

1. A Beállítások oldalon kattintson a bal oldali listában az **Évfolyam-léptetés** menüpontra, majd az **Évfolyam-léptetés** szakaszban a **Szerkesztés** gombra.
2. Kapcsolja be a kapcsolót (a felirat **Engedélyezve** lesz), és válassza ki azt a **Hónapot** és **Napot**, amikor évente léptetni kell az évfolyamokat. Ezen a napon minden évfolyamba sorolt személy egy évfolyammal feljebb lép, a 12. évfolyamosok pedig **Végzett** státuszt kapnak.
3. Mentse a módosításokat.

Az automatikus léptetés kikapcsolásához állítsa a kapcsolót **Letiltva** állapotba, majd mentsen. A léptetési dátum törlődik, és az évfolyamok nem fognak többé maguktól változni.

## Önkéntes jelentkezés {#volunteer-signup}

Alapértelmezés szerint azok a tagok, akik megnézik a [önkéntes jelentkezéseket](../../b1-church/serving/volunteer-signup.md), minden olyan közelgő hetet látnak, amelyhez van szabad pozíció. Ha ez a lista túl hosszú lenne, megjelenítheti csak az egyes tervtípusok következő hetét.

1. A Beállítások oldalon kattintson a bal oldali listában az **Önkéntes jelentkezés** menüpontra, majd az **Önkéntes jelentkezés** szakaszban a **Szerkesztés** gombra.
2. Kapcsolja be a **Csak az egyes tervtípusok következő hetének megjelenítése** opciót.
3. Mentse a módosításokat.

Ha ez be van kapcsolva, minden tervtípusnál csak a következő közelgő terv látszik. A következő hét a dátum elmúltával jelenik meg. A szakasz **Megjelenített hetek** sora a **Csak az egyes tervtípusok következő hete** vagy az **Összes közelgő hét** szöveget mutatja.

## Adakozási adatvédelem {#giving-privacy}

Az adakozási jogosultsággal rendelkezők általában látják egy személy adakozási összesítőit a [személyi adatlapján](../people/adding-people.md#editing-details). Ha nem szeretné, hogy az összegek minden adatlap megnyitásakor a képernyőn legyenek, elrejtheti őket, amíg valaki kifejezetten kéri.

1. A Beállítások oldalon kattintson a bal oldali listában az **Adakozási adatvédelem** menüpontra, majd az **Adakozási adatvédelem** szakaszban a **Szerkesztés** gombra.
2. Kapcsolja be a **Adakozás elrejtése a személyi adatlapokon, amíg rá nem kattintanak** opciót.
3. Mentse a módosításokat.

Ha ez be van kapcsolva, a személyi adatlap adakozási kártyáján ez a felirat jelenik meg: „Az adakozás a személyi adatlapokon el van rejtve.” Kattintson a **Adakozás megjelenítése** gombra, hogy betöltse és megjelenítse az adott személy adakozását. Ez újra elrejtésre kerül, amikor egy másik személy adatlapját nyitja meg. Az adakozást látók köre nem változik: a kártyát továbbra is csak az adakozási jogosultsággal rendelkezők látják.

## Importálás és exportálás

A Beállítások oldalon egyháza neve alatt található **Importálás/Exportálás** hivatkozás egy külön eszközt nyit meg új böngészőablakban. Ezzel:

- importálhat tagadatokat egy másik egyházkezelő rendszerből;
- exportálhatja ChurchApps-adatait biztonsági mentés vagy átköltöztetés céljából.

Ez különösen hasznos, ha most állítja be egyházát, és a meglévő nyilvántartásokat át kell vinnie a ChurchApps-be.

:::warning
Adatok importálása előtt mindig készítsen biztonsági mentést a meglévő nyilvántartásairól. Az importálási műveletek adatokat adnak a rendszerhez, és ha többször futtatja őket, duplikált bejegyzéseket hozhatnak létre.
:::
