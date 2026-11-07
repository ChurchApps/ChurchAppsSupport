---
title: "Hantera predikningar"
---

# Hantera predikningar

<div class="article-intro">

Sidan Predikningar visar hela ditt predikningsbibliotek. Härifrån kan du lägga till nya predikningar, redigera befintliga poster och organisera ditt innehåll efter spellista. Varje predikan kan länka till video eller ljud som finns på YouTube, Vimeo, Facebook eller en egen URL.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten **contentApi.streamingServices.edit**. Se [Roller och behörigheter](../settings/roles-permissions.md) om du inte har åtkomst.
- Skapa minst en [spellista](playlists) att organisera dina predikningar i
- Ha dina video-ID:n eller URL:er redo från YouTube, Vimeo eller Facebook

</div>

## Visa ditt predikningsbibliotek

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Predikningar** och klickar på **Predikningar**.
2. Sidan Predikningar visar dina predikningar i en tabell med varje predikans **Spellista**, titel och **Publiceringsdatum**. Använd sökrutan ovanför tabellen för att filtrera listan. Dina spellistor visas i en panel med namnet **Spellistor** bredvid tabellen.
3. Klicka på **Redigera** på valfri predikningsrad för att visa eller redigera dess uppgifter.

## Lägga till en predikan

1. Klicka på knappen **Lägg till predikan** uppe till höger och välj **Lägg till predikan** i rullgardinsmenyn.
2. Välj en **Spellista** att tilldela predikan till.
3. Välj din **Videoleverantör** -- YouTube, Vimeo, Facebook eller Egen URL. Vi rekommenderar YouTube eftersom det fungerar bäst med B1-systemet.
4. Ange video-ID:t eller URL:en och klicka på **Hämta**. För YouTube är video-ID:t teckensträngen efter `v=` i YouTube-URL:en.
5. När du klickar på **Hämta** importeras predikans uppgifter automatiskt, inklusive publiceringsdatum, längd, titel, beskrivning och miniatyrbild.
6. Gör de ändringar du vill och klicka på **Spara**.

:::tip
Du kan också lägga till en permanent livesändnings-URL genom att välja **Lägg till permanent livesändnings-URL** i rullgardinsmenyn **Lägg till predikan**. Detta skapar en permanent koppling till din YouTube-kanals livesändning med hjälp av ditt kanal-ID. Se [Livesändning](live-streaming) för mer information.
:::

## Redigera en predikan

1. Klicka på **Redigera** på valfri predikningsrad i ditt bibliotek för att öppna dess uppgifter.
2. Uppdatera titeln, talaren, datumet, beskrivningen, miniatyrbilden eller mediellänkarna vid behov.
3. Klicka på **Spara** för att tillämpa dina ändringar.

## Predikningsuppgifter

Varje predikningspost kan innehålla:

- **Titel** -- Predikans namn som visas för besökare
- **Talare** -- Vem som höll predikan
- **Datum** -- Publicerings- eller framförandedatum
- **Beskrivning** -- En sammanfattning av predikans innehåll
- **Miniatyrbild** -- En förhandsvisningsbild som visas i ditt predikningsbibliotek
- **Video-/ljudlänkar** -- URL:er till predikans media på YouTube, Vimeo, Facebook eller en egen värd
- **URL till ljudfil (för podcast)** -- En direktlänk till en MP3- eller M4A-fil för denna predikan. Klistra in en URL eller klicka på **Ladda upp ljud** för att ladda upp en fil och fylla i fältet automatiskt. Endast predikningar med detta fält (eller en direktlänk till en videofil) ifyllt tas med i ditt podcastflöde.

## Ditt podcastflöde

När minst en predikan har en ljud- eller videofil kopplad till sig genererar B1 Admin automatiskt ett RSS-podcastflöde för din kyrka -- det finns inget du behöver aktivera. Du hittar det i panelen **Podcastflöde** under predikningslistan: klicka på kopieringsikonen för att kopiera flödets URL och skicka sedan in den URL:en till Apple Podcasts, Spotify eller någon annan podcastkatalog.

:::info
Predikningar som bara länkar till en inbäddad spelare (till exempel ett YouTube- eller Vimeo-video-ID) visas inte i podcastflödet -- podcastappar behöver en direkt nedladdningsbar mediefil. Lägg till en **URL till ljudfil** för att inkludera en predikan.
:::

## Schemalägga en predikan för livesändning

När du har lagt till en predikan kan du schemalägga den för sändning på din livesändningssida:

1. I Hoppmenyen väljer du **Predikningar > Livesändningstider**.
2. Redigera en gudstjänst och välj din predikan i rullgardinsmenyn under **Videoinställningar**.
3. Predikan spelas upp vid den schemalagda gudstjänsttiden.

:::info
För att importera flera predikningar samtidigt i stället för en i taget, använd verktyget [Massimport](bulk-import) för att hämta videor direkt från ditt YouTube- eller Vimeo-konto.
:::

## Nästa steg

- [Spellistor](playlists) -- Organisera predikningar i serier
- [Livesändning](live-streaming) -- Konfigurera ditt sändningsschema
- [Massimport](bulk-import) -- Importera flera predikningar samtidigt
