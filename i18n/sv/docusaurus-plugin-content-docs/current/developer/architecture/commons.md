---
title: "Content Commons"
---

# Content Commons — Delat innehållsbibliotek och moderering

Användarskapat innehåll som delas mellan produkter (WorshipCommons-sånger, Lessons.church-lektioner, FreeShow-mallar, B1-webbplatsmallar) går genom en och samma granskningskö i stället för ett eget granskningsflöde per produkt. Den här sidan beskriver livscykeln för inlämning och godkännande, den delade datamodellen för tillgångar och var modereringen finns.

## Tillgångarnas kärna

Två tabeller bär varje objekt i commons, oavsett produkt:

- **`assets`** – den offentliga identitetsraden. `status`: `pending` | `published` | `unpublished` | `removed`. Typspecifik data (sångdetaljer, upphovspersoner) ligger i satellittabeller som kopplas via `assetId`.
- **`assetFiles`** – varje fil som hör till en tillgång (ljud, bilder, dokument). Den ersätter de äldre kolumnerna `path` och den kommaseparerade `files` i de enskilda innehållstabellerna.
- **`submissions`** – modereringsenheten. Livscykel: `draft → pending → approved | rejected | withdrawn`. En inlämning kan antingen vara en helt ny tillgång eller en ändring av en befintlig publicerad tillgång (av den ursprungliga upphovspersonen eller av en tredje part).

När en inlämning godkänns körs en produktspecifik **publiceringshook** (`Api/src/modules/commons/helpers/publishHooks/`, till exempel `song.ts`) som expanderar inlämningen till produktens egna poster.

## Inlämningsflödet

`CommonsSubmissionController` (`Api/src/modules/commons/`) är det API som slutanvändare använder: skapa ett utkast, förregistrera och bifoga filer, skicka in för granskning eller dra tillbaka inlämningen. Dess faktiska klienter är externa producentwebbplatser (WorshipCommons-webbplatsen, Lessons.church, FreeShow, galleriet med B1-webbplatsmallar), inte B1Admin.

## Konsumtion för kyrkor

Utöver moderering läser B1Admin även direkt från commons-kärnan: sökningen "Add Song" under Serving → Songs anropar `GET /songs?sundayReady=true` tillsammans med den befintliga externa sångdatabasen. Den visar publicerade WorshipCommons-sånger som personalen har markerat som söndagsklara (se lyssningsspärren nedan), med en licensbricka. När en sång väljs kopplas den nya `SongDetail` tillbaka till sin källa via `songDetailLinks`. Detta är den enda väg där en enskild kyrkas B1Admin berör commons-data direkt, i stället för via de verktyg i Server Admin som endast är till för personal. Den kyrkvända beskrivningen finns i supportdokumentationens avsnitt [Gratis sånger från WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons).

## Granskningskön

Kön finns under **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`) och kräver behörigheten `Permissions.server.admin`, samma behörighet som styr Churches/Impersonate/Jobs på den sidan. Det här är ett internt verktyg för ChurchApps-personal och inget som enskilda kyrkor ser.

Tre underflikar:

- **Queue** – alla väntande inlämningar över alla produkter, filtrerbara efter produkt/tillgångstyp. Varje rad visar en bricka för ny tillgång, redigering av upphovsperson eller redigering av tredje part, inlämnarens godkännandehistorik, en sammanfattning av fält- och filskillnader samt ålder (flaggas efter 72 timmar). **Review** öppnar en panel med fältvisa skillnader, filförhandsvisningar och en inbäddad skrivskyddad förhandsvisning av produkten. Godkänn/Avvisa stöder tangentbordsgenvägar (j/k för att navigera, a/r för att agera).
- **Reports** – upphovsrätts- och policy-/kvalitetsrapporter om publicerade tillgångar, uppdelade i två köer plus historik över lösta ärenden. En personalmedlem tar över en rapport och löser den med ett resultat (upprätthållen/avvisad/dubblett) och en åtgärd (ingen/avpublicera/ta bort).
- **Assets** – en sökbar bläddrare för publicerat innehåll med åtgärder per tillgång: markera som utvald, avpublicera/publicera igen eller ta bort (skäl: upphovsrätt/policy). För sånger är **lyssningsspärren** här det som gör en sång "söndagsklar": personalen markerar den när de har lyssnat igenom varje publicerad tonart och bekräftat att noter, ackord och bilder finns med.

Varje endpoint under `/commons/admin/*` (`CommonsAdminController.ts`) kontrollerar oberoende av varandra att användaren har server-admin-behörigheten.

:::info
Designen har med avsikt en enda kö: WorshipCommons egna moderingsgränssnitt under `/admin` har avvecklats, och alla produkters inlämningar dirigeras i stället genom B1Admins Server Admin-verktyg.
:::

## Omfattning

Api (commons-modulen), B1Admin (Server Admin) och de externa producentwebbplatserna: WorshipCommons, Lessons.church, FreeShow och mallar för B1:s webbplatsbyggare.
