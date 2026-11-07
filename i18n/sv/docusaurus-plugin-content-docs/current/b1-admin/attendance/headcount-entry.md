---
title: "Närvarande antal & trend"
---

# Närvarande antal & trend

<div class="article-intro">

Med antal kan du registrera ett enkelt totalt närvaroantal -- för en gudstjänst, en gudstjänsttid eller en grupp -- utan att checka in en namngiven lista. Använd detta när du bara behöver veta "hur många var här", och kombinera det med rapporten Trend för antal för att följa siffran över tid.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Dina campus, gudstjänster och gudstjänsttider måste vara konfigurerade. Se [Inställningar för närvaro](setup.md).
- Att registrera ett antal kräver behörigheten **Närvaro &gt; Redigera**; att visa trendrapporten kräver **Närvaro &gt; Visa**. Se [Roller & behörigheter](../settings/roles-permissions.md).

</div>

:::info
Antal är ett alternativ som bara innehåller totalsiffran till [Registrera närvaro](recording-attendance.md). Om du behöver veta **vilka** som var närvarande -- till exempel för att följa upp personer som inte har kommit tillbaka -- fortsätt använda namngiven sessionsnärvaro under en grupps Sessioner. Antal lagrar bara en siffra.
:::

## Registrera ett antal

1. Öppna **B1 Admin**, öppna [Hopp-menyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet upp till vänster), expandera **Personer** och klicka på **Närvaro**.
2. Klicka på **Ange antal** i vänstra kolumnen.
3. Fyll i formuläret:
   - **Gudstjänst** *(obligatoriskt)*
   - **Gudstjänsttid** -- lämna tomt för att registrera en totalsiffra för alla gudstjänsttider
   - **Grupp** -- valfritt; endast grupper med aktiverad närvarospårning visas. Lämna tomt för "Ingen grupp (hela gudstjänsten)."
   - **Datum**
   - **Antal** -- det totala antalet närvarande personer
4. Klicka på **Spara**.

Tabellen **Senaste antal** bredvid formuläret visar dina senaste poster med datum, gudstjänst, gudstjänsttid, grupp och antal. Klicka på en rad för att läsa in den i formuläret om du behöver rätta eller ta bort den.

## Rapporten Trend för antal

1. Klicka på **Alla år** i vänstra kolumnen på samma sida **Närvaro** och välj sedan fliken **Trend för antal**.
2. Använd filtren **Campus**, **Gudstjänst**, **Gudstjänsttid** och **Grupp** för att avgränsa rapporten.

Rapporten visar dina registrerade antal summerade per vecka, både som linjediagram och som tabell -- samma rapportstil som används i [flikarna Närvarotrend och Gruppnärvaro](tracking-attendance.md). Antal som registrerats för innevarande vecka visas också under **Antal denna vecka** på huvudsidan för Närvaro.

## Relaterade sidor

- [Registrera närvaro](recording-attendance.md) -- namngiven närvaro per person och session
- [Följa närvaro](tracking-attendance.md) -- rapporter för närvaro- och gruppntrender
- [Inställningar för närvaro](setup.md) -- konfigurera campus, gudstjänster och gudstjänsttider
