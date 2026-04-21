---
title: "administrering af prædikener"
---

# administrering af prædikener

<div class="article-intro">

Prædikener siden viser dit hele prædikenbibliotek. Fra her kan du tilføje nye prædikener, rediger eksisterende poster og organiser dit indhold efter playliste. Hver prædikenindtastning kan forbinde til video eller lyd værtet på YouTube, Vimeo, Facebook eller en brugerdefineret URL.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for **contentApi.streamingServices.edit** tilladelse. Se [roller og tilladelser](../settings/roles-permissions.md) hvis du ikke har adgang.
- Opret mindst en [playliste](playlists) for at organisere dine prædikener ind i
- Har dine video ID'er eller URL'er klar fra YouTube, Vimeo eller Facebook

</div>

## se dit prædikenbibliotek

1. I B1 Admin, klik **prædikener** i venstre sidebar.
2. Prædikener siden viser alle dine prædikenopgaver, organiseret efter playliste. Hver prædikenindtastning viser dens thumbnail, titel og dato.
3. Klik på enhver prædikenindtastning for at se eller rediger dens detaljer.

## Tilføj en prædikenindtastning

1. Klik **Tilføj prædikenindtastning** knap i øverste højre hjørne og vælg **Tilføj prædikenindtastning** fra dropdown.
2. Vælg en **playliste** for at tildele prædikenindtastningen til.
3. Vælg dit **video udbyder** -- YouTube, Vimeo, Facebook eller brugerdefineret URL. Vi anbefaler YouTube da det fungerer bedst med B1 systemet.
4. Anføre video ID eller URL og klik **hent**. Til YouTube, video ID er strengen af tegn efter `v=` i YouTube URL.
5. Når du klikker **hent**, prædikendetaljer importeres automatisk, inkluderet udgiv dato, varighed, titel, beskrivelse og thumbnail.
6. Lav enhver ændringer du ønsker og klik **gem**.

:::tip
Du kan også tilføje en permanent live stream URL ved at vælge **Tilføj permanent live URL** fra **Tilføj prædikenindtastning** dropdown. Dette opbygger en vedvarende forbindelse til din YouTube kanals live stream ved at bruge din kanal ID. Se [live streaming](live-streaming) til mere detaljer.
:::

## rediger en prædikenindtastning

1. Klik på enhver prædikenindtastning i dit bibliotek for at åbne dens detaljer.
2. opdater titel, taler, dato, beskrivelse, thumbnail eller media links efter behov.
3. Klik **gem** for at anvende dine ændringer.

## prædikendetaljer

Hver prædikenopgave kan inkludere:

- **titel** -- prædikennavnet vist til besøgende
- **taler** -- hvem der holdt prædikenen
- **dato** -- udgiv eller leveringsdatoen
- **beskrivelse** -- En sammendrag af prædikenindholdet
- **thumbnail** -- Et forhåndsvisnings billede vist i dit prædikenbibliotek
- **video/lyd links** -- URL'er til prædikenmediet på YouTube, Vimeo, Facebook eller en brugerdefineret vært

## planlægning af en prædikenindtastning til live stream

Efter tilføjelse af en prædikenindtastning, kan du planlægge den til udsendelse på din live stream siden:

1. Gå til **live stream gange** fane.
2. rediger en tjeneste og under **video indstillinger**, vælg din prædikenindtastning fra dropdown.
3. Prædikenindtastningen spilles på den planlagte tjeneste gang.

:::info
Til import af flere prædikener på en gang i stedet for tilføjelse af dem en ad gangen, brug [masseimport](bulk-import) værktøjet for at trække videoer direkte fra din YouTube eller Vimeo konto.
:::

## Næste trin

- [playlister](playlists) -- Organiser prædikener ind i serier
- [live streaming](live-streaming) -- konfigurér dit streaming skema
- [masseimport](bulk-import) -- import flere prædikener på en gang
