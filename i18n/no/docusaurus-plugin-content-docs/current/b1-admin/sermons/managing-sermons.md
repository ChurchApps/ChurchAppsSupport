---
title: "Administrering av prekener"
---

# Administrering av prekener

<div class="article-intro">

Prekener-siden viser hele predikenbiblioteket. Herfra kan du legge til nye prekener, redigere eksisterende oppføringer og organisere innholdet etter playliste. Hver prediken kan linke til video eller lyd vert på YouTube, Vimeo, Facebook eller en egendefinert URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **contentApi.streamingServices.edit**-tillatelsen. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst en [playliste](playlists) for å organisere predikenene
- Ha video-ID-ene eller URL-ene klare fra YouTube, Vimeo eller Facebook

</div>

## Visning av predikenbiblioteket

1. I B1 Admin, åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen) og velg **Prekener**.
2. Prekener-siden viser alle predikenoppføringer, organisert etter playliste. Hver prediken viser miniatyrbildet, tittel og dato.
3. Klikk på en hvilken som helst prediken for å vise eller redigere detaljene.

## Legge til en prediken

1. Klikk **Legg til prediken**-knappen i øvre høyre hjørnet og velg **Legg til prediken** fra rullemenyene.
2. Velg en **Playliste** for å tildele prekenen til.
3. Velg **videoleverandør** -- YouTube, Vimeo, Facebook eller egendefinert URL. Vi anbefaler YouTube da det fungerer best med B1-systemet.
4. Angi video-ID-en eller URL-en og klikk **Hent**. For YouTube er video-ID-en strengen med tegn etter `v=` i YouTube-URL-en.
5. Når du klikker **Hent**, importeres predikendetaljene automatisk, inkludert publiseringsdato, varighet, tittel, beskrivelse og miniatyrbilder.
6. Gjør endringer som du vil og klikk **Lagre**.

:::tip
Du kan også legge til en permanent direkteoverførings-URL ved å velge **Legg til permanent live-URL** fra **Legg til prediken**-rullemenyene. Dette oppretter en varig tilkobling til YouTube-kanalens direkteoverføring ved hjelp av kanal-ID-en. Se [Direkteoverføring](live-streaming) for mer informasjon.
:::

## Redigering av en prediken

1. Klikk på en hvilken som helst prediken i biblioteket for å åpne detaljer.
2. Oppdater tittel, taler, dato, beskrivelse, miniatyrbilder eller media-lenker etter behov.
3. Klikk **Lagre** for å anvende endringene.

## Predikendetaljer

Hver predikenoppføring kan inkludere:

- **Tittel** -- Predikenavn som vises for besøkende
- **Taler** -- Hvem som holdt prekenen
- **Dato** -- Publiserings- eller leveringsdatoen
- **Beskrivelse** -- En sammendrag av predikeninnholdet
- **Miniatyrbilder** -- Et forhåndsvisningsbilde som vises i predikenbiblioteket
- **Video-/lydlenker** -- URL-er til predikenmediet på YouTube, Vimeo, Facebook eller egendefinert vert

## Planlegging av en prediken for direkteoverføring

Etter å ha lagt til en prediken, kan du planlegge den for kringkasting på direkteoverførings-siden:

1. Gå til **Direkteoverføringstider**-fanen.
2. Rediger en gudstjeneste og under **Videoinnstillinger**, velg prekenen fra rullemenyene.
3. Prekenen blir avspilt på det planlagte gudstjenesteklokkeslettets tid.

:::info
For å importere flere prekener på en gang i stedet for å legge dem til en etter en, bruk [Bulk import](bulk-import)-verktøyet for å trekke videoer direkte fra YouTube- eller Vimeo-kontoen.
:::

## Neste trinn

- [Playlister](playlists) -- Organiser prekener i serier
- [Direkteoverføring](live-streaming) -- Konfigurere direkteoverførings-planen
- [Bulk import](bulk-import) -- Importer flere prekener på en gang
