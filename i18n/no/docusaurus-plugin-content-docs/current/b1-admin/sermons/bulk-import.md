---
title: "Masseimport"
description: "Importer preken-videoer i bulk fra en YouTube-kanal eller Vimeo-konto, eller podcastepisoder fra en RSS-feed, til B1 Admin, og sorter dem deretter inn i en spilleliste."
---

# Masseimport

<div class="article-intro">

Siden for masseimport lar deg fylle preken-biblioteket ditt raskt ved å importere videoer fra YouTube eller Vimeo, eller episoder fra en podcast-RSS-feed. Dette er den raskeste måten å ta inn eksisterende prekeninnhold på, i stedet for å legge til hver preken én om gangen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger gudstjenester** i delen **Innhold** i rollen din. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst én [spilleliste](./playlists.md) for å importere prekenene dine til
- Ha YouTube-kanal-ID-en, informasjonen om Vimeo-kontoen din eller podcast-feedadressen din klar

</div>

## Velge kilde {#choosing-your-source}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Preken** og klikker på **Preken**. Klikk på **Legg til preken** og velg **Masseimport** fra menyen.
2. Under **Velg importkilde** ser du tre alternativer:
   - **YouTube** -- Importer videoer fra en YouTube-kanal
   - **Vimeo** -- Importer videoer fra en Vimeo-konto
   - **Podcast RSS Feed** -- Importer episoder fra en podcast-feed som lydprekener
3. Klikk på alternativet for plattformen der prekenene dine ligger (eller klikk på **Importer fra YouTube**, **Importer fra Vimeo** eller **Importer fra Podcast Feed** under beskrivelsen). Klikk på **Tilbake** øverst på siden for å gå tilbake til valget av kilde.

:::tip
Du kan gå tilbake og bytte kilde når som helst, hvis du har videoer på begge plattformene.
:::

## Før du importerer {#before-you-import}

Før du importerer videoer trenger du minst én spilleliste å organisere dem i. Hvis du ikke har opprettet noen spillelister ennå:

1. Gå tilbake til siden **Preken** og finn panelet **Spillelister**.
2. Klikk på **Opprett første spilleliste** og fyll inn navn, beskrivelse, publiseringsdato og miniatyrbilde.
3. Klikk på **Lagre**, og gå deretter tilbake til masseimport ved å klikke på **Legg til preken** og velge **Masseimport**.

Se [Spillelister](./playlists.md) for detaljerte instruksjoner om hvordan du oppretter og administrerer spillelister.

## Importere videoer {#importing-videos}

1. Etter at du har valgt YouTube eller Vimeo, skriver du inn **YouTube-kanal-ID** eller **Vimeo-kanal-ID** i feltet som er satt opp.
2. Klikk på knappen **Hent** for å hente videoene fra kanalen din. Hvis videoene ikke kan lastes, eller kanalen ikke har noen, vises en melding om det; kontroller ID-en og prøv igjen.
3. Etter at videoene er hentet, ser du en liste over videoene dine, hver med en avkrysningsboks under **Importer**.
4. Kryss av i boksen ved siden av hver video du vil importere.
5. Klikk på nedtrekkslisten **Importer til spilleliste** for å velge hvilken spilleliste videoene skal legges til i.
6. Klikk på knappen **Importer** for å fullføre masseimporten. Du sendes tilbake til valget av kilde når den er ferdig.

Hvis du klikker på **Importer** uten å velge en spilleliste eller krysse av for noen videoer, ber B1 deg om å gjøre det først. Klikk på **Avbryt** for å gå ut uten å importere.

Videoene importeres med alle detaljene sine, inkludert titler, beskrivelser, datoer og miniatyrbilder. Spesialtegn i YouTube-titler og -beskrivelser, som `&`, apostrofer og anførselstegn, vises slik de er skrevet, og ikke som koder som `&amp;`.

:::info
Masseimport er ideell når du kommer i gang og flytter fra en annen plattform. For å legge til enkeltprekener fremover, bruk siden [Administrere prekener](./managing-sermons.md) i stedet.
:::

## Importere podcast-episoder {#importing-podcast-episodes}

Hvis prekenene dine publiseres som en podcast (Spotify for Podcasters / Anchor, Buzzsprout, Podbean og så videre), kan du hente inn episodene som lydprekener.

1. Velg **Podcast RSS Feed** og lim inn feed-adressen din i **Podcast Feed URL**. Slik finner du den:
   - **Spotify for Podcasters (Anchor)** -- **Settings** > **Availability** > **RSS distribution**. Adressen ser slik ut: `https://anchor.fm/s/…/podcast/rss`.
   - **Buzzsprout** -- lenken **RSS Feed** på dashbordet for podcasten din.
   - De fleste andre tjenester viser RSS-feed-adressen på innstillings- eller distribusjonssiden for podcasten.
2. Klikk på **Fetch**. Podcastens navn vises over en liste over episodene med publiseringsdatoer. Hvis feeden ikke kan lastes eller ikke har noen lydepisoder, får du en melding om det; sjekk adressen og prøv igjen.
3. Nye episoder merkes automatisk for deg. Episoder som allerede finnes i preken-biblioteket ditt, er merket **Already imported** og kan ikke krysses av, så ingenting legges til to ganger.
4. Fjern krysset for episoder du ikke vil ha, velg en spilleliste under **Import Into Playlist**, og klikk **Import**.

Hver episode blir en lydpreken med tittel, beskrivelse, dato, omslagsbilde og lengde. Medlemmer ser **Listen** og **Download audio** på disse prekenene i B1-appen.

Import er en engangskopi, ikke en direkte lenke til feeden. Når du publiserer nye episoder, kommer du tilbake og kjører importen igjen med samme feed-adresse; bare de nye episodene merkes.

:::note
Bare lyd importeres. Videoepisoder fra podcaster importeres ikke; legg dem til gjennom YouTube, Vimeo eller [Administrere prekener](./managing-sermons.md).
:::

:::tip
Vil du ha en liste på nettstedet eller i appen din som alltid speiler podcasten din uten å importere på nytt? Legg til **Podcast**-elementet på en side i nettsidebyggeren, og legg deretter til den siden som en **Page**-fane i mobilappen din.
:::

## Neste steg {#next-steps}

- [Administrere prekener](./managing-sermons.md) -- Rediger detaljene for importerte prekener
- [Spillelister](./playlists.md) -- Opprett og administrer prekenserier
- [Direktesending](./live-streaming.md) -- Sett opp direktesending for gudstjenestene dine
