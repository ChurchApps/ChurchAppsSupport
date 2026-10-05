---
title: "Administrere prekener"
---

# Administrere prekener

<div class="article-intro">

Prekensiden viser hele prekenbiblioteket ditt. Her kan du legge til nye prekener, redigere eksisterende oppføringer og organisere innholdet etter spilleliste. Hver preken kan lenke til video eller lyd som ligger på YouTube, Vimeo, Facebook eller en egendefinert URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst én [spilleliste](playlists) å organisere prekenene dine i
- Ha video-ID-ene eller URL-ene fra YouTube, Vimeo eller Facebook klare

</div>

## Vise prekenbiblioteket

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), utvid **Prekener** og klikk på **Prekener**.
2. Prekensiden viser alle prekenoppføringene dine, organisert etter spilleliste. Hver preken vises med miniatyrbilde, tittel og dato.
3. Klikk på en preken for å se eller redigere detaljene.

## Legge til en preken

1. Klikk på knappen **Legg til preken** øverst til høyre og velg **Legg til preken** fra nedtrekksmenyen.
2. Velg en **spilleliste** som prekenen skal tilhøre.
3. Velg **videoleverandør** -- YouTube, Vimeo, Facebook eller egendefinert URL. Vi anbefaler YouTube, siden det fungerer best med B1-systemet.
4. Skriv inn video-ID-en eller URL-en og klikk på **Hent**. For YouTube er video-ID-en tegnrekken som kommer etter `v=` i YouTube-URL-en.
5. Når du klikker på **Hent**, importeres prekendetaljene automatisk, blant annet publiseringsdato, varighet, tittel, beskrivelse og miniatyrbilde.
6. Gjør eventuelle endringer du ønsker, og klikk på **Lagre**.

:::tip
Du kan også legge til en permanent direktestrøm-URL ved å velge **Legg til permanent direkte-URL** fra nedtrekksmenyen **Legg til preken**. Da opprettes en fast tilkobling til direktestrømmen på YouTube-kanalen din ved hjelp av kanal-ID-en. Se [Direktesending](live-streaming) for mer informasjon.
:::

## Redigere en preken

1. Klikk på en preken i biblioteket for å åpne detaljene.
2. Oppdater tittel, taler, dato, beskrivelse, miniatyrbilde eller medielenker etter behov.
3. Klikk på **Lagre** for å bruke endringene.

## Prekendetaljer

Hver prekenoppføring kan inneholde:

- **Tittel** -- Navnet på prekenen slik det vises for besøkende
- **Taler** -- Hvem som holdt prekenen
- **Dato** -- Publiserings- eller fremføringsdato
- **Beskrivelse** -- Et sammendrag av prekenens innhold
- **Miniatyrbilde** -- Et forhåndsvisningsbilde som vises i prekenbiblioteket ditt
- **Video-/lydlenker** -- URL-er til prekenmediet på YouTube, Vimeo, Facebook eller en egendefinert vert
- **URL til lydfil (for podkast)** -- En direkte lenke til en MP3-/M4A-fil for denne prekenen. Lim inn en URL, eller klikk på **Last opp lyd** for å laste opp en fil og fylle ut feltet automatisk. Bare prekener der dette feltet (eller en direkte lenke til en videofil) er fylt ut, tas med i podkastfeeden din.

## Podkastfeeden din

Så snart minst én preken har en lyd- eller videofil knyttet til seg, oppretter B1 Admin automatisk en RSS-podkastfeed for menigheten din -- du trenger ikke slå noe på. Du finner den i panelet **Podkastfeed** under prekenlisten: klikk på kopieringsikonet for å kopiere feed-URL-en, og send deretter inn denne URL-en til Apple Podcasts, Spotify eller en annen podkastkatalog.

:::info
Prekener som bare lenker til en innebygd spiller (for eksempel en YouTube- eller Vimeo-video-ID), vises ikke i podkastfeeden -- podkastapper trenger en direkte, nedlastbar mediefil. Legg til en **URL til lydfil** for å ta med en preken.
:::

## Planlegge en preken for direktesending

Etter at du har lagt til en preken, kan du planlegge den for sending på direktesendingssiden din:

1. Velg **Prekener > Tidspunkter for direktesending** i Jump-menyen.
2. Rediger en gudstjeneste, og velg prekenen din fra nedtrekksmenyen under **Videoinnstillinger**.
3. Prekenen spilles av på det planlagte tidspunktet for gudstjenesten.

:::info
Hvis du vil importere flere prekener på én gang i stedet for å legge dem til én etter én, kan du bruke verktøyet [Masseimport](bulk-import) til å hente videoer direkte fra YouTube- eller Vimeo-kontoen din.
:::

## Neste steg

- [Spillelister](playlists) -- Organiser prekener i serier
- [Direktesending](live-streaming) -- Sett opp sendeplanen din
- [Masseimport](bulk-import) -- Importer flere prekener på én gang
