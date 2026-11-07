---
title: "Massimport"
description: "Importera predikningsvideor i bulk från en YouTube-kanal eller ett Vimeo-konto till B1 Admin och sortera dem sedan i en spellista."
---

# Massimport

<div class="article-intro">

Sidan Massimport låter dig snabbt fylla på ditt predikningsbibliotek genom att importera videor från YouTube eller Vimeo. Det här är det snabbaste sättet att föra över ditt befintliga predikningsinnehåll, i stället för att lägga till varje video en i taget.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörigheten **contentApi.streamingServices.edit**. Se [Roller och behörigheter](../settings/roles-permissions.md) om du saknar åtkomst.
- Skapa minst en [spellista](./playlists.md) att importera dina predikningar till
- Ha ditt YouTube-kanal-ID eller din Vimeo-kontoinformation redo

</div>

## Välj din källa

1. I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expanderar **Predikningar** och klickar på **Predikningar**. Klicka på **Lägg till predikning** och välj **Massimport** i menyn.
2. Under **Välj importkälla** ser du två alternativ:
   - **YouTube** -- Importera videor från en YouTube-kanal
   - **Vimeo** -- Importera videor från ett Vimeo-konto
3. Klicka på alternativet för den plattform där dina predikningar finns (eller klicka på **Importera från YouTube** / **Importera från Vimeo** under beskrivningen). Klicka på **Tillbaka** överst på sidan för att återgå till valet av källa.

:::tip
Du kan när som helst gå tillbaka och byta källa om du har videor på båda plattformarna.
:::

## Innan du importerar

Innan du importerar videor behöver du minst en spellista att sortera dem i. Om du ännu inte har skapat några spellistor:

1. Gå tillbaka till sidan **Predikningar** och hitta panelen **Spellistor**.
2. Klicka på **Skapa första spellistan** och fyll i namn, beskrivning, publiceringsdatum och miniatyrbild.
3. Klicka på **Spara** och gå sedan tillbaka till Massimport genom att klicka på **Lägg till predikning** och välja **Massimport**.

Se [Spellistor](./playlists.md) för detaljerade instruktioner om hur du skapar och hanterar spellistor.

## Importera videor

1. Efter att du valt YouTube eller Vimeo anger du ditt **YouTube-kanal-ID** eller **Vimeo-kontoinformation** i fältet som visas.
2. Klicka på knappen **Hämta** för att hämta alla tillgängliga videor från din kanal eller ditt konto.
3. När hämtningen är klar ser du en lista över alla dina videor med kryssrutor.
4. Markera kryssrutorna bredvid de videor du vill importera. Du kan markera alla eller välja specifika videor.
5. Aktivera eventuellt **Importera nya videor automatiskt** för att lägga till framtida uppladdningar i ditt bibliotek automatiskt.
6. Klicka på rullgardinsmenyn **Importera till spellista** för att välja vilken spellista videorna ska läggas till i.
7. Klicka på knappen **Importera** för att slutföra massimporten.

Dina videor importeras med alla sina uppgifter, inklusive titlar, beskrivningar, datum och miniatyrbilder. Specialtecken i YouTube-titlar och -beskrivningar, till exempel `&`, apostrofer och citattecken, överförs så som de skrivits i stället för som koder som `&amp;`.

:::info
Massimport är idealiskt för att komma igång när du flyttar från en annan plattform. För att lägga till enskilda predikningar framöver använder du i stället sidan [Hantera predikningar](./managing-sermons.md).
:::

## Nästa steg

- [Hantera predikningar](./managing-sermons.md) -- Redigera uppgifter för importerade predikningar
- [Spellistor](./playlists.md) -- Skapa och hantera predikningsserier
- [Livestreaming](./live-streaming.md) -- Ställ in livestreaming för dina gudstjänster
