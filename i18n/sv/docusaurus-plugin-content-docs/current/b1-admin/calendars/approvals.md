---
title: "Kalendergodkännanden"
---

# Kalendergodkännanden

<div class="article-intro">

Sidan Godkännanden är där administratörer granskar och hanterar väntande bokningsförfrågningar för rum och resurser, samt kalenderhändelser som måste godkännas innan de publiceras.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera rum eller resurser med en **godkännandegrupp** under [Rum och resurser](rooms-resources)
- Du behöver behörigheten **Kalenderadministratör** eller behörigheten **content.edit**

</div>

## Öppna godkännanden

I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Kalendrar** och klickar på **Godkännanden**. Väntande bokningsförfrågningar och händelser som väntar på granskning visas här.

## Bokningsförfrågningar

När en grupp skapar en händelse och begär ett rum eller en resurs visas förfrågan i avsnittet **Rums- och resursförfrågningar**. Varje rad visar:

- Händelsens namn och datum/tid
- Rummet eller resursen som begärs (med antal för resurser med flera enheter)
- En statusbricka som visar om förfrågan har konflikter

### Konfliktindikatorer

Om en förfrågan överlappar en annan bokning eller spärrtid för samma rum eller resurs visar statusen en bricka med **Konflikter**; håll muspekaren över den för att se detaljerna. Förfrågningar utan överlappningar visar **Inga konflikter**. Granska konfliktande förfrågningar noggrant innan du godkänner någon av dem.

### Godkänna eller avvisa

Klicka på **Godkänn** eller **Avvisa** på valfri bokningsförfrågan (vid avvisning måste du först bekräfta). Den begärande gruppen meddelas om beslutet. Godkända bokningar låses till det rummet eller den resursen för händelsen; avvisade bokningar frigör platsen för andra.

När du klickar på **Godkänn** öppnas dialogrutan **Godkänn bokning**, där du också kan publicera händelsen i samma steg:

1. Markera **Publicera i den offentliga kalendern** för att göra händelsen offentlig i gruppens kalender. Lämna den omarkerad för att godkänna bokningen utan att ändra händelsens synlighet.
2. När **Publicera i den offentliga kalendern** är markerad kan du eventuellt välja en kuraterad kalender under **Lägg även till i kalender** för att även lägga till händelsen i en av dina [kuraterade kalendrar](curated-calendar). Lämna det inställt på **Ingen** för att hoppa över detta. (Alternativet visas endast om du har behörigheten **content.edit**.)
3. Klicka på **Godkänn**.

## Väntande händelser

Om ditt kalenderarbetsflöde kräver godkännande av händelser innan de blir synliga för allmänheten visas väntande händelser i avsnittet **Händelseförfrågningar**. Klicka på **Godkänn** för att publicera en händelse i kalendern, eller på **Avvisa** för att meddela avsändaren att ändringar behövs.

:::tip
Ställ in en godkännandegrupp på ett rum under [Rum och resurser](rooms-resources) för att kräva godkännande för det rummet. Grupper med åtkomst kan sedan begära rummet när de skapar händelser, och dessa förfrågningar hamnar på den här sidan.
:::

## Relaterade artiklar

- [Rum, resurser och schemaläggning](rooms-resources) — konfigurera bokningsbara rum och resurser
- [Skapa kalendrar](creating-calendars) — hantera kalendrar och händelser
