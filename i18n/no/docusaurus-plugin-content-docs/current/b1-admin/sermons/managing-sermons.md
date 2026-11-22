---
title: "Administrere prekener"
description: "Administrer preken-biblioteket ditt i B1 Admin: legg til prekener fra YouTube, Vimeo eller Facebook, rediger detaljer, og få en podcast-feed for menigheten din."
---

# Administrere prekener

<div class="article-intro">

Prekensiden viser hele preken-biblioteket ditt. Herfra kan du legge til nye prekener, redigere eksisterende oppføringer og organisere innholdet ditt etter spilleliste. Hver preken kan lenke til video eller lyd som er lagt ut på YouTube, Vimeo, Facebook eller en egendefinert URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger gudstjenester** i delen **Innhold** i rollen din. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst én [spilleliste](./playlists.md) for å organisere prekenene dine i
- Ha video-ID-ene eller URL-ene dine klare fra YouTube, Vimeo eller Facebook

</div>

## Se preken-biblioteket ditt {#viewing-your-sermon-library}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Preken** og klikker på **Preken**.
2. Prekensiden viser prekenoppføringene dine i en tabell med hver preken sin **spilleliste**, tittel (**Preken**) og **publiseringsdato**, nyeste først, med en teller som «11 av 11 prekener». Skriv i boksen **Søk etter prekener på tittel eller spilleliste...** for å filtrere listen. Spillelistene dine vises i panelet **Spillelister** ved siden av tabellen, med panelet **Podcast-feed** under.
3. Hold musepekeren over en prekenrad og klikk på **Rediger** for å se eller redigere detaljene.

## Legge til en preken {#adding-a-sermon}

1. Klikk på knappen **Legg til preken** øverst til høyre og velg **Legg til preken** i nedtrekksmenyen. Et skjema for **Rediger preken** åpnes over listen.
2. Velg en **spilleliste** å knytte prekenen til (eller la den stå på **Ingen**).
3. Velg **videoleverandør** -- **YouTube**, **Vimeo**, **Facebook** eller **Egendefinert innbygd URL**. Vi anbefaler YouTube, da det fungerer best med B1-systemet.
4. Skriv inn videoens **YouTube-ID**, **Vimeo-ID**, **preken-ID** (Facebook) eller **URL for innbygging av preken**. Du kan lime inn hele videolenken; B1 beholder bare ID-en. For YouTube er video-ID-en tegnene etter `v=` i YouTube-URL-en.
5. For YouTube og Vimeo klikker du på **Hent** for å importere prekendetaljene automatisk, inkludert publiseringsdato, varighet, tittel, beskrivelse og miniatyrbilde. Hvis detaljene ikke kan lastes, vises en melding om det, og du kan fylle dem inn selv.
6. Gjør eventuelle endringer du ønsker, og klikk på **Lagre**.

:::tip
Du kan også legge til en permanent direkte-URL ved å velge **Legg til permanent direkte-URL** i nedtrekksmenyen **Legg til preken**. Dette oppretter en vedvarende forbindelse til YouTube-kanalens direktesending ved hjelp av kanal-ID-en din. Se [Direktesending](./live-streaming.md) for mer informasjon.
:::

## Redigere en preken {#editing-a-sermon}

1. Klikk på **Rediger** på en prekenrad i biblioteket ditt for å åpne detaljene.
2. Oppdater tittel, dato, beskrivelse, miniatyrbilde, varighet eller medielenker etter behov.
3. Klikk på **Lagre** for å bruke endringene, eller **Avbryt** for å lukke skjemaet.

For å fjerne en preken åpner du den, klikker på **Slett** og bekrefter.

### Legge til en preken i en annen spilleliste {#adding-a-sermon-to-another-playlist}

For å vise den samme prekenen i en andre spilleliste (for eksempel en preken som hører til både en serie og en samling med «Best of»), åpner du prekenen, klikker på **Legg til i en annen spilleliste**, velger spillelisten og klikker på **Legg til**. Dette lagrer en kopi av prekenen i den spillelisten.

## Detaljer om prekener {#sermon-details}

Hver prekenoppføring kan inneholde:

- **Spilleliste** -- Serien prekenen tilhører
- **Videoleverandør** og video-ID -- Hvor prekenvideoen ligger: YouTube, Vimeo, Facebook eller en egendefinert URL for innbygging
- **Publiseringsdato** -- Datoen prekenen publiseres; prekener uten dato viser **Ikke planlagt** i listen
- **Total varighet på preken** -- Lengden på prekenen i minutter og sekunder
- **Miniatyrbilde** -- Et forhåndsbilde som vises i preken-biblioteket ditt. Klikk på bildet for å beskjære eller erstatte det (16:9).
- **Tittel** -- Prekennavnet som vises for besøkende
- **Beskrivelse** -- Et sammendrag av prekeninnholdet
- **URL til lydfil (for podcast)** -- En direkte lenke til **én** MP3/M4A-fil for denne prekenen. Dette er ikke stedet for en podcast-feedadresse; en feed som limes inn her, spilles ikke av. For å hente inn en hel podcast, bruk [Masseimport](./bulk-import.md#importing-podcast-episodes). Enten lim inn en URL, eller klikk på **Last opp lyd** når prekenen er lagret, for å laste opp en fil og fylle inn feltet automatisk. Bare prekener med dette feltet utfylt (eller en direkte lenke til en videofil) tas med i podcast-feeden din.

## Podcast-feeden din {#your-podcast-feed}

Når minst én preken har en lyd- eller videofil knyttet til seg, lager B1 Admin automatisk en RSS-podcast-feed for menigheten din -- det er ingenting du må slå på. Du finner den i panelet **Podcast-feed** ved siden av prekenlisten (under panelet **Spillelister**): klikk på kopieringsikonet for å kopiere feed-URL-en, og send den deretter til Apple Podcasts, Spotify eller en annen podcastkatalog.

:::info
Prekener som bare lenker til en innbygd spiller (for eksempel en YouTube- eller Vimeo-video-ID) vises ikke i podcast-feeden -- podcast-apper trenger en direkte mediefil som kan lastes ned. Legg til en **URL til lydfil** for å ta med en preken.
:::

## Planlegge en preken for direktesending {#scheduling-a-sermon-for-live-stream}

Etter at du har lagt til en preken, kan du planlegge den for sending på siden for direktesending:

1. I Hurtigmenyen velger du **Preken > Tidspunkt for direktesending**.
2. Rediger en gudstjeneste, og velg prekenen din i nedtrekkslisten **Preken** under **Videoinnstillinger**.
3. Prekenen spilles av på det planlagte gudstjenestetidspunktet.

:::info
For å importere flere prekener samtidig i stedet for å legge dem til én etter én, bruk verktøyet [Masseimport](./bulk-import.md) til å hente videoer direkte fra YouTube- eller Vimeo-kontoen din.
:::

## Neste steg {#next-steps}

- [Spillelister](./playlists.md) -- Organiser prekener i serier
- [Direktesending](./live-streaming.md) -- Konfigurer planen for direktesending
- [Masseimport](./bulk-import.md) -- Importer flere prekener samtidig
