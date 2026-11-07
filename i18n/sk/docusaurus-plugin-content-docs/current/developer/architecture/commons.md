---
title: "Content Commons"
description: "Ako sa používateľom odoslané piesne, lekcie a šablóny pohybujú cez spoločný moderačný front v Server Admin v B1 Admin, od odoslania až po zverejnenie."
---

# Content Commons — zdieľaná knižnica obsahu a moderovanie

Obsah, ktorý používatelia posielajú a zdieľajú naprieč produktmi (piesne WorshipCommons, lekcie Lessons.church, šablóny FreeShow, šablóny webu B1), prechádza jednou frontou moderovania, nie samostatným procesom kontroly pre každý produkt. Táto stránka popisuje životný cyklus odoslania a schválenia, dátový model zdieľaných aktív a miesto, kde moderovanie prebieha.

## Základ aktív

Každú položku commons nesú dve tabuľky bez ohľadu na produkt:

- **`assets`** — verejný identifikačný záznam. `status`: `pending` | `published` | `unpublished` | `removed`. Údaje špecifické pre typ (podrobnosti o piesni, autori) sú uložené v pridružených tabuľkách prepojených cez `assetId`.
- **`assetFiles`** — každý súbor pripojený k aktívu (zvuk, obrázky, dokumenty). Nahrádza staršie stĺpce `path` a `files` oddelené čiarkami v jednotlivých tabuľkách obsahu.
- **`submissions`** — jednotka moderovania. Životný cyklus: `draft → pending → approved | rejected | withdrawn`. Odoslanie môže byť nové aktívum alebo úprava existujúceho publikovaného aktíva (od pôvodného autora alebo tretej strany).

Schválenie odoslania spustí publikačný hook špecifický pre produkt (`Api/src/modules/commons/helpers/publishHooks/`, napr. `song.ts`), ktorý odoslanie rozvinie do vlastných záznamov daného produktu.

## Tok odoslania

`CommonsSubmissionController` (`Api/src/modules/commons/`) je API určené koncovým používateľom: vytvorenie konceptu, pripojenie súborov (presign a priloženie), odoslanie na kontrolu alebo stiahnutie odoslania. Jeho skutočnými klientmi sú externé stránky producentov (stránka WorshipCommons, Lessons.church, FreeShow, galéria šablón webu B1), nie B1Admin.

## Využitie pre cirkvi

Okrem moderovania B1Admin číta zdieľaný základ priamo aj z commons. Vyhľadávanie „Pridať pieseň“ v časti Slúženie → Piesne posiela požiadavku `GET /songs?sundayReady=true` spolu s existujúcou externou databázou piesní. Zobrazí publikované piesne WorshipCommons, ktoré zamestnanci označili ako pripravené na nedeľu (pozri bránu vypočutia nižšie), s odznakom licencie. Po výbere sa nový `SongDetail` prepojí so zdrojom cez `songDetailLinks`. Ide o jediný prípad, keď B1Admin jednotlivej cirkvi pracuje s dátami commons priamo, a nie cez nástroje správy servera určené len pre zamestnancov. Popis pre cirkvi nájdete v časti [Bezplatné piesne z WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) v dokumentácii pre podporu.

## Fronta moderovania

Fronta je v **B1Admin → Správa servera → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`). Prístup je obmedzený oprávnením `Permissions.server.admin`, to isté oprávnenie, ktoré na tejto stránke chráni Cirkvi/Impersonate/Úlohy. Ide o interný nástroj len pre zamestnancov ChurchApps, ktorý jednotlivé cirkvi nevidia.

Tri podkarty:

- **Fronta** — všetky čakajúce odoslania naprieč produktmi, filtrovateľné podľa produktu alebo typu aktíva. Každý riadok zobrazuje odznak nového aktíva, úpravy od autora alebo úpravy od tretej strany, prehľad schválení odosielateľa, súhrn rozdielov v poliach a súboroch a vek odoslania (označený, ak je starší ako 72 h). Tlačidlo **Kontrola** otvorí panel s rozdielmi po poliach, náhľadmi súborov a vloženým náhľadom produktu len na čítanie. Schváliť a Zamietnuť podporujú klávesové skratky: j/k na pohyb a a/r na vykonanie akcie.
- **Hlásenia** — hlásenia o autorských právach a o zásadách a kvalite publikovaných aktív, rozdelené do dvoch front plus história vyriešených hlásení. Zamestnanec si hlásenie prevezme a potom ho vyrieši výsledkom (potvrdené / zamietnuté / duplicitné) a akciou (žiadna / zrušiť publikovanie / odstrániť).
- **Aktíva** — prehľadávač publikovaného obsahu s akciami pre jednotlivé aktíva: zvýrazniť, zrušiť alebo obnoviť publikovanie, alebo odstrániť (dôvod: autorské práva / zásady). Pri piesňach sa tu nastavuje **brána vypočutia** (listen gate), ktorá piesň označí ako pripravenú na nedeľu. Zamestnanci ju označia až po vypočutí každej publikovanej tóniny a potvrdení, že noty, akordy a snímky sú všetky prítomné.

Každý koncový bod pod `/commons/admin/*` (`CommonsAdminController.ts`) znovu nezávisle overuje oprávnenie správcu servera.

:::info
Tento návrh má zámerne jedinú frontu: vlastné rozhranie moderovania `/admin` od WorshipCommons bolo vyradené, aby sa odoslania všetkých produktov smerovali cez nástroje Správy servera v B1Admin.
:::

## Rozsah

Api (modul commons), B1Admin (Správa servera) a externé stránky producentov: WorshipCommons, Lessons.church, FreeShow, šablóny tvorby webov B1.
