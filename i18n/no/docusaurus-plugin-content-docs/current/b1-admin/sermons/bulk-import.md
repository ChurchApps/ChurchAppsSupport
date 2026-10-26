---
title: "Masseimport"
---

# Masseimport

<div class="article-intro">

Siden for masseimport lar deg raskt fylle opp preken-biblioteket ditt ved å importere videoer fra YouTube eller Vimeo. Dette er den raskeste måten å få inn eksisterende prekeninnhold på, i stedet for å legge til hver video én om gangen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Opprett minst én [spilleliste](playlists) å importere prekenene dine til
- Ha YouTube-kanal-ID-en din eller Vimeo-kontoinformasjonen klar

</div>

## Velge kilde

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Sermons** og klikker på **Sermons**. Klikk på **Add Sermon** og velg **Bulk Import** fra menyen.
2. Under **Choose Import Source** ser du to alternativer:
   - **YouTube** -- Importer videoer fra en YouTube-kanal
   - **Vimeo** -- Importer videoer fra en Vimeo-konto
3. Klikk på alternativet for plattformen der prekenene dine ligger (eller klikk på **Import from YouTube** / **Import from Vimeo** under beskrivelsen). Klikk på **Back** øverst på siden for å gå tilbake til valget av kilde.

:::tip
Du kan gå tilbake og bytte kilde når som helst, hvis du har videoer på begge plattformene.
:::

## Før du importerer

Før du importerer videoer, trenger du minst én spilleliste å organisere dem i. Hvis du ikke har laget noen spillelister ennå:

1. Gå tilbake til **Sermons**-siden og finn panelet **Playlists**.
2. Klikk på **Create First Playlist** og fyll inn navn, beskrivelse, publiseringsdato og miniatyrbilde.
3. Klikk på **Save**, og gå deretter tilbake til masseimport ved å klikke på **Add Sermon** og velge **Bulk Import**.

Se [Spillelister](playlists) for detaljerte instruksjoner om hvordan du lager og administrerer spillelister.

## Importere videoer

1. Etter at du har valgt YouTube eller Vimeo, skriver du inn **YouTube Channel ID** eller **Vimeo account information** i feltet som er tilgjengelig.
2. Klikk på knappen **Fetch** for å hente alle tilgjengelige videoer fra kanalen eller kontoen din.
3. Etter henting ser du en liste over alle videoene dine med avkrysningsbokser.
4. Kryss av i boksene ved siden av videoene du vil importere. Du kan velge alle, eller plukke ut bestemte.
5. Valgfritt: aktiver **Auto Import New Videos** for automatisk å legge til nye opplastinger i biblioteket ditt.
6. Klikk på rullegardinmenyen **Import Into Playlist** for å velge hvilken spilleliste disse videoene skal legges til i.
7. Klikk på knappen **Import** for å fullføre masseimporten.

Videoene dine importeres med alle detaljene sine, inkludert titler, beskrivelser, datoer og miniatyrbilder. Spesialtegn i YouTube-titler og -beskrivelser, som `&`, apostrofer og anførselstegn, kommer over slik de er skrevet, i stedet for som koder som `&amp;`.

:::info
Masseimport er ideell når du kommer i gang og flytter fra en annen plattform. For å legge til enkeltpreken i fremtiden, bruk siden [Administrere prekener](managing-sermons) i stedet.
:::

## Neste steg

- [Administrere prekener](managing-sermons) -- Rediger detaljene for importerte prekener
- [Spillelister](playlists) -- Lag og administrer prekenserier
- [Direktesending](live-streaming) -- Sett opp direktesending for gudstjenestene dine
