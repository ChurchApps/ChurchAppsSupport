---
title: "Átviteli kockázatértékelés"
---

# Átviteli kockázatértékelés

<div class="article-intro">

Ez a dokumentum rögzíti a ChurchApps értékelését az Egyesült Királyságból/EGT-ből az Egyesült Államokba irányuló személyes adatátvitelekkel kapcsolatos kockázatokról, az Egyesült Királyság GDPR-ja és az EU GDPR-ja szerint. Ez a ChurchApps mint adatfeldolgozó által vezetett belső megfelelési nyilvántartás.

</div>

**Utolsó felülvizsgálat:** 2026. április

## 1. Az átvitel részletei

| Tétel | Részletek |
|---|---|
| **Adatexportáló** | Az Egyesült Királyságban/EGT-ben található, ChurchApps-et használó egyházak (adatkezelők) |
| **Adatimportáló** | ChurchApps (adatfeldolgozó), Egyesült Államokból működik |
| **Érintettek kategóriái** | Egyházi tagok, látogatók, vendégek, adományozók, önkéntesek, gyermekek (szülők/adminisztrátorok kezelik) |
| **Személyes adatok kategóriái** | Nevek, e-mail-címek, telefonszámok, postai címek, születési dátumok, nem, családi állapot, profilfotók, adományi nyilvántartások, részvételi nyilvántartások, csoporttagságok, önkéntes feladatkiosztások, üzenetváltások előzményei |
| **Érzékeny adatok** | Szándékosan nem gyűjtünk ilyet. Nem tárolunk egészségügyi, biometrikus adatokat vagy büntetett előéletre vonatkozó információkat. A pénzügyi számlaadatokat (bankkártyák, bankszámlák) a ChurchApps soha nem tárolja, ezeket közvetlenül a Stripe kezeli. |
| **Az átvitel célja** | Egyházkezelő szoftverszolgáltatások nyújtása (tagnyilvántartás, adományozás, részvételi nyilvántartás, kommunikáció, önkéntes beosztás, eseményregisztráció) |
| **Célország** | Egyesült Államok |
| **Átviteli mechanizmus** | EU-s Általános Szerződési Feltételek (SCC-k) és az Egyesült Királyság nemzetközi adattovábbítási kiegészítője (IDTA), az AWS adatfeldolgozási kiegészítőn keresztül beépítve |

## 2. Al-feldolgozók

| Al-feldolgozó | Szerep | Helyszín | Átviteli mechanizmus |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktúra-üzemeltetés, adattárolás, tartalomkézbesítés (us-east-2 régió) | Egyesült Államok | AWS DPA SCC-kkel (automatikusan szerepel az AWS szolgáltatási feltételekben) |
| **Stripe** | Adományok fizetésfeldolgozása | Egyesült Államok | Stripe DPA SCC-kkel |

A bankkártya- és bankszámla-adatokat a felhasználó böngészőjéből közvetlenül a Stripe-nak továbbítjuk, és azok soha nem kerülnek a ChurchApps szervereire, és nem is haladnak azokon keresztül.

## 3. Kockázatértékelés

### 3.1 Titkosítás

- **Átvitel közben:** Minden adat TLS/HTTPS-sel van titkosítva a felhasználók és a ChurchApps szerverei közötti összes kommunikáció során.
- **Nyugalmi állapotban:** Az AWS-en tárolt adatok AWS által kezelt titkosítással vannak védve nyugalmi állapotban.

### 3.2 Hozzáférés-vezérlés

- Az éles szerverekhez való hozzáférés két személyre korlátozott, akik a ChurchApps igazgatótanácsának tagjai.
- A fejlesztők, önkéntesek és a többi igazgatótanácsi tag nem fér hozzá az éles szerverekhez vagy adatbázisokhoz.
- Az adatbázis-szerverek tűzfal mögött vannak, és nem érhetők el közvetlenül az internetről.
- Az egyházi adatok logikailag el vannak választva: minden egyház csak a saját adataihoz férhet hozzá, alkalmazásszintű hozzáférés-vezérlés révén.

### 3.3 Adatszegregáció

Az adatok hat független adatbázis között oszlanak meg (Tagnyilvántartás, Adományozás, Részvétel, Üzenetküldés, Doing, Tartalom). Egy adatbázis kompromittálódása nem teszi ki a többi adatbázis adatait. Például az Adományozási adatbázis az adományok összegeit és dátumait tartalmazza, de az adományozók nevét és elérhetőségét nem (ezek a Tagnyilvántartásban vannak).

### 3.4 Adatminimalizálás

- Bankkártya- vagy bankszámla-információt nem tárolunk (ezeket a Stripe kezeli).
- A jelszavakat egyirányú hashelés formájában tároljuk, és nem lehet azokat visszafejteni.
- Az egyházak maguk döntik el, hogy milyen adatokat gyűjtenek tagjaiktól.

### 3.5 Az érintettek jogai

A ChurchApps technikai eszközöket biztosít, amelyek lehetővé teszik az egyházak számára az érintetti kérelmek teljesítését:

- **Hozzáférés és hordozhatóság:** Teljes adatexport géppel olvasható JSON formátumban.
- **Törlés:** Anonimizálás mind a hat adatbázisban, a személyes adatok általános értékekre cseréjével, miközben a pénzügyi beszámoláshoz szükséges összesítő nyilvántartásokat megőrizzük.
- **Korlátozás:** Az inaktív tagsági státusz kizárja az egyéneket a keresésből, a könyvtárból, a jelentésekből és az üzenetküldésből, miközben nyilvántartásuk megmarad.
- **Helyesbítés:** A tagok és adminisztrátorok az alkalmazáson keresztül szerkeszthetik a személyes adataikat.

### 3.6 Adatvédelmi incidensek bejelentése

A ChurchApps vállalja, hogy a személyes adatokat érintő incidens tudomásra jutásától számított 72 órán belül értesíti az érintett egyházakat, ahogyan azt a [Felhasználási feltételek](https://churchapps.org/terms) (11.6. szakasz) is rögzíti.

### 3.7 Az amerikai kormányzati hozzáférés kockázata

Az Egyesült Államokban tárolt adatokkal kapcsolatos elsődleges kockázat, hogy az amerikai hatóságok a FISA 702. szakasza vagy a 12333. számú végrehajtási rendelet alapján hozzáférhetnek azokhoz. Ezt a kockázatot az alábbi okok miatt **alacsonynak** ítéljük:

- A ChurchApps egyházi tagsági és részvételi adatokat kezel, nem olyan adatokat, amelyek hírszerzési szempontból értékesek lennének.
- Az érintettek egyházi tagok és látogatók, nem olyan csoportok, amelyeket jellemzően a megfigyelési programok céloznak.
- Nem tárolunk érzékeny személyes adatokat (egészségügyi, pénzügyi számlákra vonatkozó, politikai nézetekre vonatkozó adatokat).
- Az AWS adatfeldolgozási kiegészítője vállalásokat tartalmaz a kormányzati megkeresésekkel kapcsolatban és az átláthatósági jelentéstételben.
- Az EU–USA Adatvédelmi Keretmegállapodás (2023-ban jött létre) további garanciákat nyújt a tanúsított amerikai szervezetekbe irányuló adattovábbításokhoz.

## 4. Általános kockázati következtetés

Az érintettekre nézve ez a nemzetközi átvitel járó kockázatot **alacsonynak** ítéljük. Az alábbiak együttes megléte:

- Általános Szerződési Feltételek (SCC-k) mint jogi átviteli mechanizmus
- Titkosítás átvitel közben és nyugalmi állapotban
- Szigorú hozzáférés-vezérlés, mindössze két jogosult személlyel
- Adatszegregáció független adatbázisok között
- Pénzügyi számlaadatok tárolásának hiánya
- A feldolgozott adatok alacsony érzékenysége és alacsony hírszerzési értéke
- Technikai eszközök minden érintetti jog gyakorlásához

megfelelő kiegészítő intézkedéseket jelentenek annak biztosítására, hogy az átvitt adatok lényegében az Egyesült Királyságon/EGT-n belül garantált szinttel azonos védelmet élvezzenek.

## 5. Felülvizsgálati ütemezés

Ezt az értékelést évente, vagy az adatkezelés, az al-feldolgozók vagy a nemzetközi adattovábbításokat szabályozó jogi keret lényeges változása esetén felülvizsgáljuk.
