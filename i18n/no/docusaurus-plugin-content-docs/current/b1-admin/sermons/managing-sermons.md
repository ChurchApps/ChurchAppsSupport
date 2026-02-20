---
title: "Administrere prekener"
---

# Administrere prekener

<div class="article-intro">

Prekensiden viser hele prekenbiblioteket ditt. Herfra kan du legge til nye prekener, redigere eksisterende oppføringer og organisere innholdet ditt etter spilleliste. Hver preken kan lenkes til video eller lyd som er publisert på YouTube, Vimeo, Facebook eller en egendefinert URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst én [spilleliste](playlists) å organisere prekenene dine i
- Ha video-ID-ene eller URL-ene klare fra YouTube, Vimeo eller Facebook

</div>

## Vise prekenbiblioteket

1. I B1 Admin, klikk **Prekener** i venstre sidepanel.
2. Prekensiden viser alle prekenoppføringene dine, organisert etter spilleliste. Hver preken viser miniatyrbilde, tittel og dato.
3. Klikk på en preken for å vise eller redigere detaljene.

## Legge til en preken

1. Klikk **Legg til preken**-knappen øverst til høyre og velg **Legg til preken** fra nedtrekksmenyen.
2. Velg en **spilleliste** å tilordne prekenen til.
3. Velg **videoleverandør** -- YouTube, Vimeo, Facebook eller egendefinert URL. Vi anbefaler YouTube da det fungerer best med B1-systemet.
4. Skriv inn video-ID-en eller URL-en og klikk **Hent**. For YouTube er video-ID-en tegnstrengen etter `v=` i YouTube-URL-en.
5. Når du klikker **Hent**, importeres prekendetaljene automatisk, inkludert publiseringsdato, varighet, tittel, beskrivelse og miniatyrbilde.
6. Gjør eventuelle endringer du ønsker og klikk **Lagre**.

:::tip
Du kan også legge til en permanent direktestrømmings-URL ved å velge **Legg til permanent direkte-URL** fra **Legg til preken**-nedtrekksmenyen. Dette oppretter en permanent tilkobling til YouTube-kanalens direktestrømming ved hjelp av kanal-ID-en din. Se [Direktestrømming](live-streaming) for mer informasjon.
:::

## Redigere en preken

1. Klikk på en preken i biblioteket for å åpne detaljene.
2. Oppdater tittel, taler, dato, beskrivelse, miniatyrbilde eller medielenker etter behov.
3. Klikk **Lagre** for å ta i bruk endringene.

## Prekendetaljer

Hver prekenoppføring kan inneholde:

- **Tittel** -- Prekennavnet som vises for besøkende
- **Taler** -- Hvem som holdt prekenen
- **Dato** -- Publiserings- eller fremføringsdato
- **Beskrivelse** -- Et sammendrag av prekenens innhold
- **Miniatyrbilde** -- Et forhåndsvisningsbilde som vises i prekenbiblioteket
- **Video-/lydlenker** -- URL-er til prekenmedia på YouTube, Vimeo, Facebook eller en egendefinert vert

## Planlegge en preken for direktestrømming

Etter å ha lagt til en preken, kan du planlegge den for sending på direktestrømmingssiden:

1. Gå til fanen **Direktestrømmingstider**.
2. Rediger en gudstjeneste og velg prekenen din fra nedtrekksmenyen under **Videoinnstillinger**.
3. Prekenen vil spilles på det planlagte gudstjenestetidspunktet.

:::info
For å importere flere prekener samtidig i stedet for å legge dem til én om gangen, bruk [Masseimport](bulk-import)-verktøyet for å hente videoer direkte fra YouTube- eller Vimeo-kontoen din.
:::

## Neste steg

- [Spillelister](playlists) -- Organiser prekener i serier
- [Direktestrømming](live-streaming) -- Konfigurer strømmingsplanen din
- [Masseimport](bulk-import) -- Importer flere prekener samtidig
