---
title: "Sdílená knihovna obsahu"
description: "Jak se uživatelsky odeslané písně, lekce a šablony pohybují sdílenou frontou moderování v Server Admin B1 Admin, od odeslání po publikování."
---

# Content Commons — sdílená knihovna položek a moderace

Obsah nahraný uživateli a sdílený napříč produkty (písně WorshipCommons, lekce Lessons.church, šablony FreeShow, šablony webu B1) prochází jednou frontou ke schválení, a ne samostatným procesem kontroly pro každý produkt. Tato stránka popisuje životní cyklus odeslání a schválení, datový model sdílených položek a místo, kde moderace probíhá.

## Páteř položek

Každou položku Commons nesou dvě tabulky bez ohledu na produkt:

- **`assets`** — veřejný identifikační záznam. `status`: `pending` | `published` | `unpublished` | `removed`. Údaje specifické pro typ (podrobnosti o písni, autoři) jsou uloženy v navazujících tabulkách propojených přes `assetId`.
- **`assetFiles`** — každý soubor připojený k položce (audio, obrázky, dokumenty). Nahrazuje starší sloupce `path` a `files` oddělené čárkami v jednotlivých tabulkách obsahu.
- **`submissions`** — jednotka moderace. Životní cyklus: `draft → pending → approved | rejected | withdrawn`. Odeslání může být zcela nová položka nebo úprava již publikované položky (od původního autora nebo třetí strany).

Schválení odeslání spustí publikační hook specifický pro produkt (`Api/src/modules/commons/helpers/publishHooks/`, např. `song.ts`), který odeslání rozbalí do vlastních záznamů produktu.

## Postup odeslání

`CommonsSubmissionController` (`Api/src/modules/commons/`) je API určené koncovým uživatelům: vytvoření konceptu, předpřipravení a připojení souborů, odeslání ke kontrole nebo stažení odeslání. Jeho skutečnými klienty jsou externí weby producentů (web WorshipCommons, Lessons.church, FreeShow, galerie šablon webu B1), nikoli B1Admin.

## Využití směrem k církvi

Kromě moderace čte B1Admin ze sdílené páteře i přímo. Vyhledávání „Add Song“ v sekci Serving → Songs přes `GET /songs?sundayReady=true` prohledává vedle existující externí databáze písní také publikované písně WorshipCommons, které personál označil jako připravené na nedělní bohoslužbu (viz poslechová brána níže), a zobrazuje jejich štítek licence. Výběr položky propojí nový `SongDetail` s jeho zdrojem přes `songDetailLinks`. Je to jediná cesta, kterou se B1Admin jednotlivé církve dotýkají dat Commons přímo, místo prostřednictvím nástrojů Server Admin určených jen pro personál. Popis pro církve najdete v části [Bezplatné písně z WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) v podpůrné dokumentaci.

## Fronta moderace

Fronta je v **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) a je chráněna oprávněním `Permissions.server.admin`, tedy stejným oprávněním, které na této stránce chrání také Churches, Impersonate a Jobs. Jde o interní nástroj určený výhradně pro personál ChurchApps; jednotlivé církve jej nevidí.

Jsou tu tři podzáložky:

- **Queue** — všechna čekající odeslání napříč produkty, filtrovatelná podle produktu a typu položky. Každý řádek ukazuje odznak typu (nová položka, úprava od autora, úprava od třetí strany), přehled schválení odesílatele, souhrn rozdílů v polích a souborech a stáří (od 72 hodin označené). Tlačítko **Review** otevře panel s rozdíly na úrovni polí, náhledy souborů a vloženým náhledem produktu pouze pro čtení. Akce Approve a Reject podporují klávesové zkratky (j/k pro pohyb, a/r pro provedení akce).
- **Reports** — hlášení o autorských právech a o zásadách a kvalitě u publikovaných položek, rozdělená do dvou front a historie vyřešených hlášení. Člen personálu si hlášení převezme a poté ho vyřeší zvolením výsledku (upheld/dismissed/duplicate) a akce (none/unpublish/remove).
- **Assets** — prohledávatelný přehled publikovaného obsahu s akcemi u jednotlivých položek: zvýraznit, zrušit publikaci nebo znovu publikovat, či odstranit (důvod: autorská práva/zásady). U písní je zde **poslechová brána** tím, jak se píseň stane „připravenou na nedělní bohoslužbu“: personál ji označí poté, co poslechne všechny publikované tóniny a potvrdí, že jsou přítomny notový zápis, akordy i slajdy.

Každý endpoint pod `/commons/admin/*` (`CommonsAdminController.ts`) samostatně znovu ověřuje oprávnění server-admin.

:::info
Tento návrh záměrně používá jedinou frontu: vlastní moderační rozhraní `/admin` projektu WorshipCommons bylo vyřazeno, aby se odeslání všech produktů směrovala přes nástroje Server Admin v B1Admin.
:::

## Oblasti

Api (modul commons), B1Admin (Server Admin) a externí weby producentů: WorshipCommons, Lessons.church, FreeShow, šablony tvůrce webu B1.
