---
title: "Masseimport"
description: "Importer preken-videoer i bulk fra en YouTube-kanal eller Vimeo-konto til B1 Admin, og sorter dem deretter inn i en spilleliste."
---

# Masseimport

<div class="article-intro">

Siden for masseimport lar deg fylle preken-biblioteket ditt raskt ved å importere videoer fra YouTube eller Vimeo. Dette er den raskeste måten å ta inn eksisterende prekeninnhold på, i stedet for å legge til hver video én om gangen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger gudstjenester** i delen **Innhold** i rollen din. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst én [spilleliste](./playlists.md) for å importere prekenene dine til
- Ha YouTube-kanal-ID-en eller informasjonen om Vimeo-kontoen din klar

</div>

## Velge kilde {#choosing-your-source}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Preken** og klikker på **Preken**. Klikk på **Legg til preken** og velg **Masseimport** fra menyen.
2. Under **Velg importkilde** ser du to alternativer:
   - **YouTube** -- Importer videoer fra en YouTube-kanal
   - **Vimeo** -- Importer videoer fra en Vimeo-konto
3. Klikk på alternativet for plattformen der prekenene dine ligger (eller klikk på **Importer fra YouTube** / **Importer fra Vimeo** under beskrivelsen). Klikk på **Tilbake** øverst på siden for å gå tilbake til valget av kilde.

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

## Neste steg {#next-steps}

- [Administrere prekener](./managing-sermons.md) -- Rediger detaljene for importerte prekener
- [Spillelister](./playlists.md) -- Opprett og administrer prekenserier
- [Direktesending](./live-streaming.md) -- Sett opp direktesending for gudstjenestene dine
