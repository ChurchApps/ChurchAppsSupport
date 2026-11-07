---
title: "Adatbiztonság"
description: "Hogyan védi a ChurchApps egyháza adatait a B1 Admin: kivonatolt jelszavak, HTTPS, elkülönített adatbázisok és GDPR-eszközök."
---

# Adatbiztonság

<div class="article-intro">

Tökéletesen biztonságos rendszer nincs, de a ChurchApps komolyan veszi az adatbiztonságot. Ez az oldal bemutatja azokat az intézkedéseket, amelyekkel a B1.church Adminisztrációba és más ChurchApps termékekbe bevitt összes adatot védjük.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Tekintse át ezt az oldalt, hogy megértse, hogyan védik gyülekezete adatait
- Állítsa be a [Szerepkörök és jogosultságok](./roles-permissions.md) funkciót, hogy szabályozza, ki férhet hozzá a bizalmas információkhoz
- Ismerkedjen meg az [adatvédelmi szabályzattal](https://churchapps.org/privacy)

</div>

## Érzékeny adatok tárolásának korlátozása

Első megközelítésünk, hogy ne tároljunk több érzékeny adatot, mint amennyi szükséges. Ez azt jelenti, hogy soha nem tárolunk adományozáshoz használt bankkártya- vagy bankszámlaadatokat. Amikor a felhasználó a B1.church Adminisztráción vagy a B1-en keresztül ad adományt, a bankkártya-adatok soha nem kerülnek szervereinkre, csak a fizetési szolgáltatójához (Stripe). Ez azt jelenti, hogy adatvédelmi incidens esetén bankkártya- vagy bankadatok nem kerülnének veszélybe.

Jelszavakat sem tárolunk a rendszerünkben. Minden jelszót egyirányú hash-algoritmussal dolgozunk fel, amely az adatok egy részét eltávolítja, így senki sem tudja visszafejteni a jelszavakat az adatbázisból, még mi sem. A jelszavak ellenőrzéséhez a megadott értéket ugyanazon az egyirányú hash-en kell átvezetni, és ugyanazt az eredményt kell kapni.

E két forrás kizárása után az egyetlen megmaradó érzékeny adat a nevek és elérhetőségek listája.

:::tip
Mivel a ChurchApps soha nem tárol bankkártya- vagy bankszámla-információkat, még a legrosszabb esetű adatvédelmi incidens sem tenne ki pénzügyi számlaadatokat. Csak a nevek és az elérhetőségek lennének veszélyben.
:::

## Szokásos legjobb gyakorlatok alkalmazása

Az biztonság terén az iparági szabványos legjobb gyakorlatokat alkalmazzuk, beleértve a szervereinkre irányuló és onnan érkező összes adat titkosítását HTTPS-en keresztül. Minden szerverünk biztonságos fizikai adatközpontban fut az Amazon Web Services szolgáltatásánál. Minden adatbázis-szerver tűzfal mögött található, és az internetről nem érhető el.

## Adatok szétválasztása

Az adatokat hatókörük szerint különböző adatbázisokban tároljuk. Az API-ink (Tagság, Adakozás, Részvétel, Üzenetküldés, Feladatok és Leckék) mindegyike független adatsilót alkot, saját adatbázissal. Ha az egyiket feltörik, az adatok hasznossága korlátozott marad anélkül, hogy a többi is veszélybe kerülne. Például ha az Adakozás API/adatbázis került volna veszélybe, a rosszindulatú szereplő hozzájuthatott volna az adományok listájához és dátumaihoz (de soha a kártya- vagy bankadatokhoz). Viszont nem tudná meg, mely felhasználók adtak az adományokat, vagy melyik gyülekezetnek szántak, mert ezek az adatok a külön Tagság-adatbázisban vannak tárolva.

:::info
Az adatok szétválasztása azt jelenti, hogy egy rendszer kompromittálása nem ad hozzáférést a gyülekezet összes adatához. Minden API önállóan működik, saját adatbázissal, így egy esetleges adatvédelmi incidens hatása korlátozott.
:::

## Korlátozott hozzáférés

Az éles szerverekhez való hozzáférés szigorúan korlátozott, és csak azok a szerveradminisztrátorok kaphatnak, akiknek szükségük van rá. Jelenleg ez két személy, akik egyben a testület tagjai is. Fejlesztők, önkéntesek és más testületi tagok nem férhetnek hozzá az éles szerverekhez.

## Adatvédelmi szabályzat

Az adatok az Önéi, és soha nem adjuk el harmadik feleknek. A teljes adatvédelmi szabályzatot [itt](https://churchapps.org/privacy) olvashatja el.

## GDPR-megfelelés

A ChurchApps támogatja a GDPR-megfelelést az Egyesült Királyságban vagy az Európai Unióban tagokkal rendelkező gyülekezetek számára. Így kezeljük a főbb követelményeket:

### Érintetti jogok

A ChurchApps olyan eszközöket biztosít, amelyekkel a gyülekezetek válaszolhatnak az érintetti kérelmekre:

- **Hozzáférési jog (15. cikk)** — A tagok kérhetik személyes adataik másolatát, ha felveszik a kapcsolatot gyülekezetükkel. Az adminisztrátorok bármely személy adatait exportálhatják a személy részletei oldal **Adatkezelés** szakaszából a B1.church Adminisztrációban.
- **Törléshez való jog (17. cikk)** — A tagok maguk kérhetik fiókjuk törlését a Profil oldalukról (lásd: [Fiók-törlési kérelmek kezelése](../profile/account-deletion.md)), vagy közvetlenül gyülekezetükön keresztül. Az adminisztrátorok a személy részletei oldal **Adatkezelés** szakaszából is anonimizálhatják a személy adatait minden modulban. Az anonimizálás a személyes adatokat általános értékekre cseréli, miközben megőrzi a gyülekezeti pénzügyi jelentéshez szükséges összesített rekordokat (adományösszegek, részvételi számok).
- **Korlátozáshoz való jog (18. cikk)** — A tagok kérhetik az adatkezelés korlátozását gyülekezetükön keresztül, beleértve a kommunikációból való leiratkozást is.
- **Adathordozhatósághoz való jog (20. cikk)** — Az adminisztrátorok a kérelmet benyújtó tagok nevében strukturált, géppel olvasható JSON formátumban exportálhatják a személyes adatokat.

### Az Adatkezelési eszközök használata

Egy személy GDPR-adatainak eléréséhez:

1. Nyissa meg a **Személyek** menüpontot a B1 Adminban, és nyissa meg a személy nyilvántartását.
2. Kattintson a **Szerkesztés** gombra a szerkesztési mód bekapcsolásához.
3. Görgessen le az **Adatkezelés** szakaszhoz (alapértelmezetten összecsukva), és kattintson rá a kibontáshoz.
4. Az **Adatok exportálása** gombbal töltsön le egy JSON-fájlt az adott személyről tárolt összes adattal.
5. Az **Anonimizálás** gombbal cserélje le a személyes adatokat általános értékekre. Meg kell adnia a `ANONYMIZE` szót a megerősítéshez — ez a művelet nem vonható vissza.

:::warning
Az anonimizálás végleges. Az adományösszegek és a részvételi számok pénzügyi jelentési célokra megmaradnak, de az összes személyazonosító (név, e-mail, cím stb.) eltávolításra kerül, és nem állítható helyre.
:::

### Adatfeldolgozás

A ChurchApps a gyülekezete nevében **adatfeldolgozóként** jár el (a **adatkezelő** a gyülekezet). Az [Adatfeldolgozási megállapodásunk](https://churchapps.org/terms) részletezi az egyes felek felelősségét, beleértve az alfeldolgozók használatát, az adatvédelmi incidensek bejelentésének eljárásait és az adatkezelést a szerződés megszűnésekor.

### Nemzetközi adattovábbítás

A ChurchApps adatai az Amazon Web Services (AWS) szolgáltatásnál, az Egyesült Államokban tárolódnak. Az Egyesült Királyságból/EU-ból történő nemzetközi adattovábbítást az AWS Általános szerződési feltételei (SCC) fedezik, az [AWS adatfeldolgozási kiegészítő](https://aws.amazon.com/compliance/data-processing-addendum/) alapján. Az AWS adatfeldolgozási kiegészítő automatikusan beépül az AWS szolgáltatási feltételeibe minden ügyfél számára. Uniós székhelyű tárolás nem szükséges, ha megfelelő átvitelei mechanizmusok, például SCC-k vannak érvényben.

Az átvitelei kockázatok értékelésének részleteiért lásd az [Átviteli kockázatértékelést](./transfer-risk-assessment.md).

### Alfeldolgozók

- **Amazon Web Services (AWS)** — Infrastruktúra-üzemeltetés, adattárolás és tartalomkézbesítés
- **Stripe** — Adományok fizetésfeldolgozása (a ChurchApps nem tárol kártyaadatokat)

:::info
A személyes adatok kezelésére vonatkozó részletes információkért tekintse meg [Adatvédelmi szabályzatunkat](https://churchapps.org/privacy) és [Általános szerződési feltételeinket](https://churchapps.org/terms). Ha kérdése van a GDPR-megfelelésről, írjon nekünk a support@churchapps.org címre.
:::
