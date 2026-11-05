---
title: "Live-streaming"
---

# Live-streaming

<div class="article-intro">

Siden Live Stream Times lar deg konfigurere menighetens streamingplan, administrere gudstjenestetider og tilpasse opplevelsen for seerne. Sett opp faste ukentlige gudstjenester eller engangsarrangementer, konfigurer chat og video, og bestem når streamen din går live.

</div>

## Opplæringsvideo

<YouTube id="tpEY-sEYW6A" title="Setting Up Live Streaming in B1" next="Customizing Your Church's Member App in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Ha YouTube Channel ID klar hvis du vil bruke automatisk live-streaming
- Legg til minst én [preken](managing-sermons) eller en fast live-URL som kildet for streamen din

</div>

Live-streaming administreres fra to sider i **Sermons**-delen av Jump-menyen: **Live Stream Times** for å administrere planen for live-sendingen din, og **Settings** for å konfigurere fanene på streamingsiden.

## Administrere gudstjenester

### Legge til en gudstjeneste

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Sermons** og klikker på **Live Stream Times**.
2. Klikk på knappen **Add Service** øverst på siden for å lage en ny planlagt gudstjeneste. Eksisterende gudstjenester vises i en tabell med navn, tidspunkt, leverandør og varighet for hver. Klikk på redigeringsikonet på en rad for å endre den.
3. Skriv inn et **Service Name** (for eksempel «Sunday Morning»).
4. Angi **Service Time** -- velg dagen og klokkeslettet gudstjenesten starter.
5. Sett **Recurs Weekly** til **Yes** for vanlige ukentlige gudstjenester, eller **No** for et engangsarrangement.

### Konfigurere chat og video

6. Under **Chat Settings** angir du hvor mange minutter før og etter gudstjenesten chatten skal være aktiv. Da kan besøkende begynne å chatte før gudstjenesten starter, og fortsette etterpå.
7. Under **Video Settings** angir du hvor tidlig videostrømmen skal starte, for nedtelling eller innhold før gudstjenesten. Chatten åpner så mange minutter *før* den tidlige videoen starter, så tiden som vises ved siden av innstillingen for chat-minutter før, teller begge tallene. For eksempel: en gudstjeneste kl. 10:00 med 15 minutters chat før og en tidlig start på 5 minutter åpner chatten kl. 09:40.
8. Velg hvilken preken som skal spilles fra nedtrekkslisten:
   - **Latest Sermon** -- Spiller automatisk den sist lagt til videoen din.
   - **Current Live Service** -- Spiller den pågående live-sendingen din fra YouTube, ved hjelp av Channel ID-en din.
   - Du kan også velge en bestemt preken du allerede har lagret.
9. Klikk på **Save** for å planlegge gudstjenesten.

:::info
Gudstjenesten oppdateres automatisk hver uke hvis den er satt til å gjentas. Den beholder samme lokale klokkeslett når sommertid starter eller slutter. Du kan legge til så mange gudstjenester du trenger. Besøkende ser neste planlagte gudstjeneste når de besøker streamingsiden din.
:::

## Innstillinger for streamingsiden

For å tilpasse fanene og lenkene som vises ved siden av live-sendingen, åpner du Jump-menyen, utvider **Sermons** og klikker på **Settings**. Siden **Stream Settings** viser listen din over **Content Tabs**.

### Legge til faner

1. Klikk på knappen **Add** for å legge til en ny fane på live-streamingsiden din.
2. Velg en **Link Type**: **External URL** for en egendefinert lenke, eller en av de ferdigdesignede fanene **Chat** eller **Prayer**.
3. For chat-fanen gir du den bare et navn i feltet **Tab Text**, så er oppsettet ferdig.
4. For en lenket fane skriver du inn fanens navn, velger et ikon ved å klikke på ikonknappen, og skriver inn URL-en.
5. De konfigurerte fanene vises på live-streamingsiden, slik at seerne kan få tilgang til flere ressurser og interaktive funksjoner.

### Forhåndsvise streamen din

På siden **Live Stream Times** klikker du på **View Your Stream** øverst på siden for å se nøyaktig hvordan live-streamingsiden ser ut for besøkende, inkludert logoen din, gudstjenestetidene og de konfigurerte fanene.

## Sette opp YouTube-live-streamingen din

For å koble YouTube-kanalen din til automatisk live-streaming:

1. Gå til **Sermons** og klikk på **Add Sermon**, og velg deretter **Add Permanent Live URL**.
2. Videoleverandøren står som standard på **Current YouTube Live Stream**. Skriv inn din **YouTube Channel ID**.
3. Legg til en tittel og beskrivelse, og klikk deretter på **Save**.
4. I **Live Stream Times** oppretter du en gudstjeneste og velger den faste live-URL-en din fra nedtrekkslisten for preken.

:::tip
For å finne YouTube Channel ID-en din går du til innstillingene for avansert kanal på YouTube og kopierer verdien for Channel ID.
:::

## Tilpasse farger og logo

Live-streamingsiden din bruker innstillingene for [Appearance](../website/appearance) på nettstedet ditt:

- Den **lyse aksentfargen** med mørk tekst brukes for topptekstfeltet.
- Den **mørke aksentfargen** med lys tekst brukes for sidepanelet.
- Din **Light Background Logo** vises på streamingsiden. Bruk et bilde med gjennomsiktig bakgrunn og bildeforholdet 4:1.

For å endre disse går du til **Website** og deretter **Appearance**, og oppdaterer innstillingene for [Color Palette](../website/appearance#color-palette) og [Logo](../website/appearance#logo-and-branding).

## Legge til streamingverter

For å gi teammedlemmer tilgang til vertschatten, som er bare for verter, ved siden av den offentlige chatten:

1. I Jump-menyen velger du **Settings > Roles**.
2. Klikk på plusstegnknappen og velg **Add Custom Role**.
3. Gi rollen navnet «Streaming Host» og klikk på **Save**.
4. Klikk på den nye rollen, og klikk deretter på **Add** i seksjonen Members for å legge til personer.
5. Scroll ned til **Edit Permissions**, utvid seksjonen **Content** og kryss av for **Host Chat**.

Når verter logger inn på live-streamingsiden, vises en privat fane **Host Chat** ved siden av den offentlige chatten. Den er til samtaler for ansatte under sendingen.

:::info
For mer informasjon om hvordan du oppretter roller og administrerer tillatelser, se [Roller og tillatelser](../settings/roles-permissions.md).
:::

## Feilsøking

Hvis den automatiske YouTube-live-streamingen ikke vises riktig når du bruker alternativet «Current YouTube Live Stream» med Channel ID-en din, prøv følgende:

**Symptomer:**
- Live-streamingen viser «Video unavailable»
- Siden lastes, men ingen video vises
- Direkte YouTube-innbygginger fungerer, men den automatiske kanal-live-streamingen gjør ikke det

**Løsning:**
Gå gjennom YouTube-kanalen din for gamle eller kommende planlagte live-sendinger, og slett dem:

1. Gå til YouTube Studio.
2. Gå til **Content** og deretter **Live**.
3. Se etter gamle planlagte live-sendinger eller kommende planlagte sendinger.
4. Slett disse gamle eller planlagte live-oppføringene.
5. Test live-streamingsiden din på nytt.

:::warning
YouTubes automatiske innbygging av kanal-live-streaming kan blokkeres når det finnes flere planlagte eller tidligere live-oppføringer i kanalen din. Hvis du fjerner dem, kan YouTube identifisere og vise den pågående live-sendingen din riktig.
:::

**Andre krav:**
- Live-sendingen din må være satt til **Public** (ikke Unlisted eller Private).
- Innbygging må være tillatt i innstillingene for YouTube-streamen din.
- Kontroller at du bruker leverandøren **Current YouTube Live Stream** (med Channel ID), og ikke leverandøren **YouTube** (med Video ID).

## Neste steg

- [Administrere sermoner](managing-sermons) -- legg til prekener i biblioteket ditt
- [Playlists](playlists) -- organiser prekener i serier
