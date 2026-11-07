---
title: "Twilio BYOK (javaslat)"
description: "Javasolt egyházi tulajdonú Twilio-integráció, hozzájárulási modell, megvalósítási terjedelem és kiadási feltételek."
---

# Twilio BYOK-integráció javaslat

:::caution Javaslat — nem elérhető integráció
Ez egy tervezet a karbantartók általi felülvizsgálatra, amely a nyilvános forráskódon és a Twilio dokumentációján alapul, amelyet 2026. október 22-én vizsgáltunk át. Azóta egy alapvető Twilio-szolgáltató került kiadásra (`@churchapps/texting` 0.6.0 és B1 Admin **Settings > Texting**): az egyház megadja a Account SID-jét, Auth Tokenjét és egy From számot (a szolgáltató elfogadja a `MG` előtaggal kezdődő Messaging Service SID-et is, de a `fromNumber` oszlop továbbra is `varchar(20)`, ami túl rövid egy 34 karakteres SID-hez), az SMS-ek címzettenként egy-egy kéréssel mennek ki a Twilio Messages API-ján keresztül, a STOP válaszok pedig a meglévő bejövő webhookon keresztül jutnak el a B1-be. Lásd: [Egyházi beállítások: SMS-küldés](../../b1-admin/settings/church-settings.md#texting). Az alábbi hozzájárulási modell, a Speciális leiratkozás kezelése, a kézbesítési állapot és a beállítás-készültségi ellenőrzések továbbra is csak javaslatok, nem kiadott működés. Az [egyházi bevezető tervezet](./twilio-byok-onboarding-draft) javasolt beállítási útmutatót és egyházspecifikus példákat tartalmaz.
:::

## Javasolt út

Adja hozzá a Twilio-t a B1 meglévő SMS-szolgáltatói rendszeréhez **egyházi tulajdonú Twilio-fiókkal, API-hitelesítő adatokkal, Messaging Service-szel és SMS-képes telefonszámmal**. Az egyház saját jogi személyét és üzenetküldési kampányát regisztrálja, közvetlenül fizet a Twilio-nak, fenntartja a címzettek hozzájárulását, és a jóváhagyást a Twilio Console-ban kezeli. A ChurchApps biztosítja az integrációt és a dokumentációt.

Kezdésként egy üzenetküldési programmal, egy Messaging Service-szel és egy amerikai helyi 10DLC feladóval indulunk B1 egyházanként. A meglévő B1-képernyőkön keresztül támogassa az egyéni üzeneteket, a csoportos üzeneteket, a munkafolyamat-üzeneteket és a részvételi emlékeztetőket. Egy kezdeti program jól használható a szolgálati változásokra, eseményemlékeztetőkre és önkéntes beosztásokra, ha mindhárom szerepel az adott egyház hozzájárulási szövegében és jóváhagyott kampányában. A gyűjtési vagy promóciós üzenetekhez külön felmérés és külön hozzájárulás szükséges; ezeket nem szabad csendben hozzáadni ehhez a programhoz.

| Felelősség | Egyház | B1 / ChurchApps |
|---|---|---|
| Twilio-fiók, számlázás, a telefonszám tulajdonjoga | Birtokolja és kezeli őket | Nem hoz létre platformfiókot és nem értékesít kreditet |
| Márka, kampány, számregisztráció | Pontos egyházi adatokat ad meg; kezeli az átvizsgálást és a javításokat | Ismerteti az előfeltételeket és olvassa a rendelkezésre álló készültségi információkat |
| Regisztrációs oldal, szabályzatok, az üzenet célja | Közzéteszi és karbantartja őket | Kompatibilis űrlapelemeket, példákat és hozzájárulási nyilvántartást biztosít |
| A címzettek jogosultsága és a STOP kezelése | Átnézi a hozzájárulás bizonyítékait és kezeli az SMS-en kívül kapott kéréseket | Érvényesíti a hozzájárulást, a letiltást, a jogosultságokat és az aláírt webhookokat |
| Kézbesítés és támogatás | Figyeli a Twilio-hibákat, a fiók állapotát és a bejövő válaszokat | Megjeleníti a beküldési és kézbesítési állapotot anélkül, hogy jóváhagyást garantálna |

A ChurchApps által üzemeltetett Twilio szülőfiókot, az ügyfél-alfiókokat, a számvásárlást, a Trust Hub-beküldéseket, a számlázást, a beszélgetési postafiókot, az MMS/WhatsApp-ot, a nemzetközi küldést és a zöld számos (toll-free) bevezetést egyelőre elhalasztjuk. A zöld szám külön, ellenőrzött feladói útvonal, nem pedig a regisztráció megkerülése. Ezek a határok összhangban tartják az első kiadást a B1 meglévő, saját szolgáltatót hozó modelljével.

## Meglévő alap és hiányosságok

A következő megállapítások konkrét forrás-pillanatképekhez kötődnek, nem pedig ahhoz a feltételezéshez, hogy mi van jelenleg telepítve:

| Összetevő | Jelenlegi működés | Következmény |
|---|---|---|
| [Szolgáltatói nyilvántartás és szerződés](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | Az `ITextingProvider` támogatja az egyedi és tömeges küldést, az érvényesítést, az opcionális feliratkozó- és listakapcsolatokat, valamint a szolgáltatói üzenetazonosítót az eredményekben. Nincs regisztrált Twilio-adapter. | Adja hozzá a Twilio-t a `@churchapps/texting` csomagban; nincs szükség feliratkozó-létrehozásra vagy szolgáltató által kezelt listákra. |
| [SMS-beállítások](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | A Clearstream, a Text In Church és a Nalo kiválasztható; a MinistryStuff funkciókapuval védett. A feladó szerkesztése és mentése jelenleg csak a Nalo-ra specifikus. | Adjon hozzá explicit Twilio-mezőket, érvényesítést, feladómentést és beállítási súgót. Egy legördülő menüpont önmagában nem elég. |
| [Vezérlő](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) és [modulátjáró](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | A hitelesítő adatok titkosítva és maszkolva vannak; a manuális és automatizált küldések feloldják az egyház szolgáltatóját. A csoportos küldések deduplikálják a közös telefonszámokat. | Használja újra ezeket az útvonalakat és őrizze meg a jogosultság-ellenőrzést. Az új hozzájárulási és készültségi feltételeket egy közös szerveroldali útvonalon helyezze el, hogy a munkafolyamatok ne kerülhessék meg őket. |
| [STOP-segédfüggvény](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Feldolgozza a Twilio-stílusú `From`/`Body` mezőket; ellenőriz egy egyházi URL-tokent; beállítja a `person.optedOut` értékét és kikapcsolja az SMS-emlékeztetőket. A többi választ figyelmen kívül hagyja. | Ez hasznos kiindulópont, de nem teljes Twilio-webhook. Adjon hozzá Twilio-aláírásokat és önálló SMS-feliratkozási állapotot. |
| [Üzenetküldési séma](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Tárolja az `apiKey`, `apiSecret` és egy 20 karakteres `fromNumber` mezőt; a kézbesítési naplók a azonnali sikert/hibát tárolják, nem a szolgáltatói azonosítókat vagy a végleges kézbesítési állapotokat. | Egy E.164 feladó illeszkedik, de egy 34 karakteres Messaging Service SID-nek saját mező kell. Adjon hozzá tartós szolgáltatói üzenet- és állapottárolást. |
| [Nyilvános űrlapoldal](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [megosztott űrlapmegjelenítő](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) és [beküldés-vezérlő](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Léteznek korlátozás nélküli űrlapok és opcionális jelölőnégyzetek. A leírások egyszerű szövegek. A beküldések megőrzik a válaszokat, de az SMS-útvonalnak nincs kampányspecifikus hozzájárulási nyilvántartása. | Adjon hozzá konfigurált SMS-hozzájárulási vezérlőt valós szabályzati linkekkel és szerveroldali bizonyíték-rögzítéssel. Az általános jelölőnégyzet vagy csoporttagság nem engedélyezhet automatikusan SMS-küldést. |

A [egyházi beállítások felhasználói dokumentációja](../../b1-admin/settings/church-settings#texting) is ismerteti, hogy a jelenlegi leiratkozási jelzőt a könyvtári adatvédelemmel közösen használják. Ez a csatolás kiadási kockázat: a START válasz soha nem változtathatja meg a könyvtári láthatóságot.

## Konfiguráció és hitelesítő adatok tervezése

Használjon explicit, kiegészítő konfigurációs mezőket, ahelyett hogy túlterhelné a `fromNumber` mezőt, vagy strukturált adatokat tárolna egy API-kulcs szövegben:

| Mező | Javasolt cél |
|---|---|
| `accountSid` | Egyházi tulajdonú Twilio-fiók/projekt azonosító (`AC…`) |
| `apiKey`, `apiSecret` | Dedikált Twilio API Key SID (`SK…`) és titok a kimenő API-hozzáféréshez; titkosítva és maszkolva |
| `webhookAuthToken` | A fiók Auth Tokenje, amelyet a Twilio SDK a bejövő aláírások ellenőrzésére használ; külön titkosítva és maszkolva |
| `messagingServiceSid` | Az egyház Messaging Service-e (`MG…`, 34 karakter) |
| `fromNumber` | A kiválasztott SMS-képes szám E.164 formátumban, ellenőrzött feladóként abban a fiókban/szolgáltatásban |
| Programkonfiguráció | Stabil program-azonosító, név, engedélyezett célok, regisztrációs/szabályzati URL-ek és a nyilatkozat verziója |

A Twilio [az API-kulcsokat részesíti előnyben a REST-hitelesítéshez](https://www.twilio.com/docs/iam/api-keys). A küldést és a szükséges csak olvasható beállítás-ellenőrzéseket lefedő, legszűkebb tesztelt kulcsjogosultságokat használja. A fiók Auth Tokenre továbbra is szükség van a [szabványos Twilio webhook-aláírás-ellenőrzéshez](https://www.twilio.com/docs/usage/security). Ezt a különbséget a felületen magyarázza el: egy API-titok nem azonos a webhook Auth Tokennel. A hitelesítő adatok kizárólag a szerveroldali beállítástárban maradjanak, soha ne jelenjenek meg nyilvános oldalakon, űrlapválaszokban, böngészőből küldött kérésekben vagy támogatási hibajegyekben.

Az egyház ezeket az erőforrásokat a Console-ban hozza létre és kezeli. A B1 érvényesítési művelete csak az konfigurált szolgáltatást, feladókat és regisztrációs adatokat olvashatja. Nem vásárolhat számot, nem hozhat létre kampányt, nem módosíthat Twilio-beállításokat, és nem küldhet tesztüzenetet mellékhatásként. Adjon külön, explicit tesztküldési műveletet, amely csak egy jogosult, hozzájáruló címzettre korlátozódik.

A maszkolt hitelesítő adatokat csak ugyanannak a mentett szolgáltatónak a szerkesztésekor őrizze meg. A Twilio-ra váltáshoz saját hitelesítő adatok szükségesek, és a elavult szolgáltatóspecifikus értékeket törölni kell; ne vigyen át maszkolt Clearstream vagy Nalo kulcsot egy Twilio-konfigurációba.

Minden betöltést és frissítést a hitelesített B1-egyházra kell korlátozni. A visszahívásokat egy mentett integrációhoz és a várt Twilio-fiókhoz/szolgáltatáshoz/feladóhoz kösse, és utasítsa el az egyházak közötti ütköző hozzárendeléseket. A hitelesítő adatok forgatása és a szolgáltató leválasztása érvénytelenítse a készültségi állapotot és szüneteltesse a sorban álló küldéseket, de ne törölje a hozzájárulási vagy a korábbi kézbesítési nyilvántartásokat.

## A hozzájárulás és a letiltás kötelező kiadási munka

Vezessen be telefonszámhoz kötött feliratkozási rekordokat a Twilio-programhoz, valamint csak hozzáfűzhető hozzájárulási/letiltási eseményeket. A javasolt minimális bizonyíték: egyház-azonosító, program-azonosító, normalizált telefonszám, opcionális ellenőrzött személyhez kötés, megerősítő cselekvés, a forrás űrlap/beküldés-azonosítója vagy átvizsgált külső bizonyíték, szerveroldali időbélyeg, a nyilatkozat szövege/verziója, a forrás URL-je, a szabályzati URL-ek, valamint a visszavonási és újraindítási események. A hozzáférést és a megőrzést a meglévő egyházi adatbiztonsági szabályzat szerint korlátozza.

Használjon olyan állapotokat, mint `unknown`, `pending`, `active` és `suppressed`. A meglévő mobilszámok, importált kapcsolatok, részvétel, adomány, csoporttagság, a `person.optedOut = false` érték és az `allowSms` mező nem minősül a program megerősített hozzájárulásának. A dokumentált hozzájárulás importálása engedélyhez kötött, naplózott művelet legyen, rögzített forrással; a migráció nem írathat fel mindenkit.

Az első webes folyamathoz használja a B1 szabványos nyilvános űrlapmódját. Adjon hozzá egy explicit konfigurált SMS-hozzájárulási kérdést, amely kezdetben nincs bejelölve, opcionális, kattintható szabályzati linkeket jelenít meg, és egy programhoz és egy mobilmezőhöz tartozik. Szerveroldalon érvényesítse ezt a megfeleltetést, és mentéskor rögzítse a megjelenített nyilatkozat pillanatfelvételét, ha a válasz megerősítő. Soha ne vezessen le hozzájárulást tetszőleges kérdésfeliratokból, beszélgető MI-ből vagy munkafolyamat-tagságból. A beszélgetésalapú megfelelőt csak akkor engedélyezze, ha az explicit megerősítő interakciót és a bizonyíték-rögzítést tesztelték.

A be nem jelölt beküldés nem hoz létre feliratkozást, és nem vonhat vissza más személy meglévő hozzájárulását. A hozzájárulást a beküldött telefonszámhoz kösse; a munkatársak feloldhatják a kétértelmű személyi kapcsolatokat anélkül, hogy háztartási rekordokat egyesítenének. A megváltozott mobilszámhoz külön hozzájárulás kell. Anonim űrlapok esetén alkalmazzon visszaélés-elleni védelmet, és tegye egyértelművé minden telefonszám-tulajdonjog-ellenőrzési vagy kétszeres feliratkozási lépést; egy bejelölt négyzet önmagában nem bizonyítja, ki birtokolja a telefont. Ha megerősítést használ, a feliratkozás maradjon függőben a befejezésig, és a regisztrációs anyagokban pontosan írja le ezt a folyamatot.

A Twilio esetében válassza el az SMS-letiltást a könyvtári láthatóságtól. A régi leiratkozásokat óvatosan migrálja letiltási rekordba; a többi régi címzettet hagyja `unknown` állapotban. Egy explicit, dokumentált új feliratkozás létrehozhat SMS-hozzájárulást úgy, hogy a könyvtári adatvédelem változatlan marad. A többi szolgáltató viselkedését őrizze meg, amíg a migrációjukat külön nem vizsgálták felül.

Minden tényleges küldésnél ellenőrizze, hogy az egyházi integráció engedélyezett/kész állapotban van-e, hogy a pontos telefonszámra érvényes program-hozzájárulás létezik-e, hogy nincs-e telefonszint letiltás, és hogy a hívó rendelkezik-e a meglévő jogosultsággal. Az emlékeztetők ezen felül tiszteletben tartják az `allowSms` mezőt, a kategória-beállításokat és a csendes időszakokat. Sorba állítás után ismét ellenőrizzen, oldja fel az összevonási mezőket, normalizálja és ellenőrizze a számokat, és deduplikáljon telefonszám szerint. A STOP az adott szolgáltatásra/programra vonatkozóan minden küldést letilt, beleértve a manuális küldéseket és a munkafolyamatokat is; ki kell terjednie arra is, hogy ugyanazt a telefonszámot megosztó összes személyre.

Az egyházi azonosítót és a STOP-utasítást következetesen jelenítse meg a közös Twilio-küldési útvonalon, és mutassa meg a végleges SMS-szöveg és szegmensszám előnézetét. Az összevonási mezők bővítése és a hosszkezelés őrizze meg ezeket az elemeket; ne csonkítson csendben leiratkozási utasítást. Az példák és a tényleges emlékeztető- és munkafolyamat-sablonok legyenek összhangban egymással.

## Twilio-küldések, válaszok és kézbesítési állapot

Valósítsa meg a `TwilioProvider.sendMessage` műveletet a Messages API-n keresztül, a kiválasztott Messaging Service-szel és feladóval. Adjon vissza egy szolgáltatói üzenet SID-et és egy elfogadott/beküldött eredményt; a HTTP-elfogadás nem jelent készülékszintű kézbesítést. Egy csoportos küldés a bemeneti sorrendben adjon vissza címzettenkénti eredményeket.

Korlátozza a kimenő párhuzamosságot **mind** a `sendBulk`, mind az egyéni küldések esetében: a jelenlegi összevonási mezős ág párhuzamosan hívja a `sendMessage` műveletet. A kérési keretbe nem férő csoportokhoz mentse a küldési szándékot és a igényelhető munkát; használja újra a meglévő telepítési modellt, ahelyett hogy az egyházaknak egy újabb szolgáltatást kellene futtatniuk. Az ismert ideiglenes vagy sebességkorlát-hibákat visszalépéses újrapróbálkozással kezelje. A kétértelmű időtúllépéseket ismeretlen kimenetelként kezelje, amelyet egyeztetni kell, nem pedig vakon újraküldeni, mert az duplikált üzeneteket és díjakat eredményezhet.

Állítson be egyházspecifikus bejövő és állapot-visszahívási URL-eket. Ellenőrizze az `X-Twilio-Signature` fejlécet az SDK-val, a pontos konfigurált külső URL-lel, az eredeti űrlapparaméterekkel és a megfelelő fiók Auth Tokennel. Egy titkos URL önmagában nem elegendő. A visszahívásokat illessze mentett egyház/fiók/üzenet rekordokhoz, kezelje a duplikált eseményeket és azokat a visszahívásokat, amelyek a küldési eredmény véglegesítése előtt érkeznek, és akadályozza meg, hogy a régebbi események felülírják a végleges állapotot. A bejövő nyugtázásra adjon üres TwiML választ, az állapotesemények esetén pedig megfelelő sikeres választ. [Twilio biztonság](https://www.twilio.com/docs/usage/security), [állapot-visszahívások](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Javasoljuk a Messaging Service **Speciális leiratkozás** (Advanced Opt-Out) funkciójának használatát. A Twilio kezeli a STOP/START/HELP visszaigazolásait; a B1 a hitelesített `OptOutType` eseményeket fogadja, és nem küld duplikált visszaigazolásokat. A STOP azonnal letiltást rögzít. A START csak egy ismert feliratkozást állít vissza ugyanarra a nyilatkozott programra, friss újraindítási eseménnyel; nem iratkozhat fel vele új telefonszám más, nem kapcsolódó üzenetekre, és nem kapcsolhat be emlékeztető-beállításokat. A HELP nem iratkoztat fel senkit. Más bejövő válaszok a B1 postafiókján kívül esnek; az egyházaknak dokumentált módot kell adni a Twilio-ban történő figyelésükre. [Speciális leiratkozás](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Az üzenet SID-et, a fiók/szolgáltatás-hozzárendelést, a beküldési időt, a végleges állapotot/hibakódot és a visszahívás idejét tárolja a kézbesítési naplóval együtt. Pontosan jelenítse meg a sorban álló/elfogadott, kézbesített, sikertelen, nem kézbesített vagy ismeretlen állapotokat. Tartsa meg a többi szolgáltató meglévő válaszszerződését, és határozza meg, hogy a összesített sikeres számok beküldést vagy kézbesítést jelentenek-e.

## Beállítás-készültség és jóváhagyás-ellenőrzés

Mutasson külön ellenőrző pontokat a hitelesítő adatokhoz, a szolgáltatás/feladó tulajdonjogához, a kampány-ellenőrzéshez, a számregisztrációhoz, a webhook-ellenőrzésekhez és egy kézbesített tesztüzenethez. Soha ne jelenítsen meg egyetlen zöld „jóváhagyva” jelvényt pusztán azért, mert a hitelesítő adatok működnek.

Az amerikai helyi számokhoz olvassa ki a szolgáltatás [Usa2p kampányerőforrását](https://www.twilio.com/docs/messaging/api/usapptoperson-resource), és követelje meg, hogy a releváns kampány `VERIFIED` állapotban legyen. Külön ellenőrizze, hogy a kiválasztott telefonszám hozzá van-e rendelve a szolgáltatáshoz, és befejezte-e a számregisztrációt: egy jóváhagyott kampány mellett a szám regisztrációja még függőben lehet. Ha egy támogatott olvasási API nem teszi elérhetővé a szükséges jelzést, jelenítse meg a **kézi Console-ellenőrzés szükséges** üzenetet, és rögzítse az egyházi adminisztrátor dátumozott megerősítését így, ne jelölje API-val ellenőrzöttnek. Az automatizált számregisztrációs események később is bevezethetők. [Számregisztrációs hibák](https://www.twilio.com/docs/api/errors/30035), [A2P regisztrációs események](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Az SMS-küldés engedélyezése előtt követelje meg az aktuális ellenőrzéseket; rögzítse, hogy mikor és hogyan történt a készültség ellenőrzése, a régi ellenőrzéseket járassa le, és szüneteltesse a küldést visszavont hitelesítő adatok, megváltozott feladók, regisztrációs hibák vagy tartós fiókhibák esetén. Egy tesztüzenet kézbesítése a tesztelt útvonalat igazolja, nem általános vivőszintű jóváhagyást vagy címzetti hozzájárulást. Az egyházi bevezető tervezet határozza meg az egyház küldés előtti, indítás előtti és folyamatos működési ellenőrzéseit.

## Tárolóhely és kiadási terv

Az [szervezeti hozzájárulási útmutató](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) a B1 funkciókéréseket a ChurchAppsSupport-hoz, a megvalósító PR-okat pedig a tulajdonos tárolókhoz irányítja. Használjon egy központi funkciókérést, és kapcsolja ehhez a fókuszált megvalósító PR-okat:

1. **ChurchAppsSupport:** tekintse át ezt a tervet és az egyházi bevezető tervezetet, mielőtt a Twilio-t felhasználói funkcióként jelenítené meg.
2. **Packages:** adja hozzá a Twilio-adaptert, az explicit megosztott konfigurációt/interfészeket, és az SMS-hozzájárulási űrlap megjelenítését ott, ahol a B1Admin/B1App megosztja. Tartalmazzon changeset-eket, és a fogyasztók frissítése előtt a meglévő kiadási munkafolyamaton keresztül publikáljon.
3. **Api:** adjon hozzá additív migrációkat az integrációs metaadatokhoz, a hozzájáruláshoz/letiltáshoz és a kézbesítési állapotokhoz; valósítsa meg a konfigurációs érvényesítést, a közös küldési kapukat, az űrlapbizonyíték-rögzítést, a webhook-kezelést és a küldések perzisztálását.
4. **B1Admin:** adjon hozzá Twilio-konfigurációs/készültségi felületet, program- és hozzájárulás-kezelést, szolgáltatóspecifikus feladómentést és pontos kézbesítési jelentést. Ne tegyen lehetővé SMS-hozzájárulás felülbírálását a szokásos személyszerkesztéseken keresztül.
5. **B1App:** ellenőrizze a nyilvános űrlapot/oldalt és a szabályzati linkek élményét a megosztott vezérlőkkel szemben, beleértve az anonim és a mobil látogatókat is. Nincs szükség külön Twilio böngészőkliensre.
6. **ChurchAppsSupport:** kiadás után alakítsa át az bevezető tervezetet támogatott beállítási/súgó oldalakká, adjon hozzá valódi képernyőképeket, linkelje az SMS-beállításokból, és szervezze meg a fordításokat.

A sémát és a megosztott csomagokat telepítse a fogyasztók előtt. A Twilio-t tartsa funkciókapuval védve egy kis, önkéntes pilotra; a meglévő szolgáltatók működjenek tovább. A visszaállítás letiltja a Twilio-küldést és törli a be nem küldött feladatokat, miközben megőrzi a leiratkozásokat és a bizonyítékokat; nem kapcsolhat automatikusan át a címzetteket másik szolgáltatóra vagy feladóra.

## Munkaráfordítás-becslés

Tervezési becslés egy az ökoszisztémát ismerő közreműködőnek; ez a felmérés nem használt éles hitelesítő adatokat vagy élő SMS-küldést:

| Munka | Fejlesztői napok |
|---|---|
| Adapter, konfiguráció/séma-bővítések, beállítási felület | 2–3 |
| Telefon/program-hozzájárulás, független letiltás, közös küldési kapuk, nyilvános űrlap-integráció | 3–5 |
| Aláírt visszahívások, kézbesítési perzisztencia, korlátozott/tartós küldés | 2–3 |
| Készültségi felület, egyházi útmutató, integrációs és regressziós tesztelés, pilot-javítások | 3–4 |
| **Javasolt indítási terjedelem** | **10–15 összesen** |

Egy alapvető adapter/beállítás-koncepcióbizonyíték nagyjából 1–2 nap. A csak feladóra vonatkozó becslés kizárja a hozzájárulási és bevezetési munkát, amely szükséges ehhez az ajánláshoz. A külső Twilio/vivőszintű felülvizsgálati idő külön és változó; a projekt nem ígérhet jóváhagyási dátumot vagy jóváhagyási kimenetelt.

## Elfogadási kritériumok

- [ ] Az egyház birtokolja és fizeti a fiókot, a szolgáltatást, a regisztrált feladót és a kampányt; nincs szükség ChurchApps által kezelt Twilio-fiókra.
- [ ] A hitelesítő adatok titkosítottak/maszkoltak, bérlőhöz kötöttek, forgathatók, és nem szerepelnek naplókban vagy nyilvános tartalomban; az érvényesítés csak olvasó.
- [ ] Az opcionális, be nem jelölt hozzájárulás valódi szabályzati linkeket jelenít meg, és szerveroldalon menti a program/telefon/nyilatkozat bizonyítékát; az elutasítás továbbra is lehetővé teszi az elsődleges űrlapműveletet.
- [ ] Minden manuális, csoportos, összevonási mezős, munkafolyamat- és emlékeztető-útvonal ugyanazt a Twilio-jogosultsági kaput érvényesíti. Az ismeretlen, nem hozzájáruló, megváltozott telefonszámú vagy letiltott címzetteket hasznos indokkal kihagyja; a bővítés és a hosszkezelés után is megmaradnak az egyházi azonosító és a STOP-utasítás.
- [ ] A régi könyvtári adatvédelem nem iratkoztat fel címzetteket; a STOP/START soha nem változtatja a könyvtári láthatóságot vagy nem kapcsolódó beállításokat. A közös telefonszámú és egyházak közötti eseteket tesztelték.
- [ ] Az aláírt STOP/START/HELP üzenetek, érvénytelen aláírások, hibás fiókok/szolgáltatások, duplikált események, újrajátszott űrlapbeküldések és hamisított hozzájárulási megfeleltetések le vannak fedve.
- [ ] A csoportméret/időtúllépések, sebességkorlátok, részleges hibák, kétértelmű kimenetelek, visszahívási versenyhelyzetek és sorrenden kívüli kézbesítési események duplikált küldések nélkül vannak tesztelve.
- [ ] A kampány-jóváhagyás és a befejezett számregisztráció különbözik a hitelesítő adatok érvényesítésétől. A manuális bizonyíték egyértelműen jelölt; az elavult/visszavont készültség blokkolja a küldéseket.
- [ ] Egy pilot egyház ellenőrzi a regisztrációs oldalát, az elutasított és elfogadott űrlap-útvonalakat, a pontos szabályzati URL-eket és egy hozzájáruló tesztcímzettet a beküldéstől a kézbesítésen, STOP-letiltáson és engedélyezett újra-feliratkozáson át.
- [ ] A meglévő Clearstream, Text In Church és Nalo beállítások és küldési viselkedés átmennek a regressziós ellenőrzéseken; a súgószövegek megkülönböztetik a javaslatokat a kiadott funkcióktól.
