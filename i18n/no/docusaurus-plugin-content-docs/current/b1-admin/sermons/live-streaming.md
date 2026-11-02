---
title: "Direktesending"
---

# Direktesending

<div class="article-intro">

Siden Direktesendingstider lar deg konfigurere kirkens sendeplan, administrere gudstjenestetider og tilpasse seeropplevelsen. Sett opp faste ukentlige gudstjenester eller engangsarrangementer, konfigurer chat- og videoinnstillinger, og bestem når sendingen går live.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Ha YouTube-kanal-ID-en din klar hvis du planlegger å bruke automatisk direktesending
- Legg til minst én [preken](managing-sermons) eller en permanent direkte-URL for å bruke som kilde for sendingen

</div>

Direktesending administreres fra to sider i delen **Preken** i hurtigmenyen: **Direktesendingstider** for å administrere plan for direktesendingen, og **Innstillinger** for å konfigurere fanene på sendesiden din.

## Administrere gudstjenester

### Legge til en gudstjeneste

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Preken** og klikker **Direktesendingstider**.
2. Klikk knappen **Legg til gudstjeneste** øverst på siden for å opprette en ny planlagt gudstjeneste. Eksisterende gudstjenester listes i en tabell som viser hver gudstjenestes navn, tid, leverandør og varighet. Klikk redigeringsikonet på en rad for å endre den.
3. Skriv inn et **gudstjenestenavn** (for eksempel «Søndag morgen»).
4. Angi **gudstjenestetiden** -- velg dagen og klokkeslettet gudstjenesten starter.
5. Sett **Gjentas ukentlig** til **Ja** for vanlige ukentlige gudstjenester, eller **Nei** for et engangsarrangement.

### Konfigurere chat- og videoinnstillinger

6. Under **Chatinnstillinger** angir du hvor mange minutter før og etter gudstjenesten chatten skal være aktivert. Dette lar besøkende begynne å chatte før gudstjenesten starter og fortsette etterpå.
7. Under **Videoinnstillinger** angir du hvor tidlig videostrømmen skal starte, for nedtelling eller innhold før gudstjenesten. Chatten åpner så mange minutter *før* den tidlige videoen starter, så tiden som vises ved siden av chatens innstilling for minutter før, teller begge tallene. For eksempel: en gudstjeneste kl. 10.00 med 15 minutters chat før og en tidlig start på 5 minutter, åpner chatten kl. 09.40.
8. Velg hvilken preken som skal spilles av i nedtrekkslisten:
   - **Siste preken** -- Spiller automatisk den videoen du sist la til.
   - **Gjeldende direktesending** -- Spiller din nåværende direktesending fra YouTube ved hjelp av kanal-ID-en din.
   - Du kan også velge en hvilken som helst bestemt preken du allerede har lagret.
9. Klikk **Lagre** for å planlegge gudstjenesten.

:::info
Gudstjenesten din oppdateres automatisk hver uke hvis den er satt til å gjentas. Den beholder samme lokale klokkeslett når sommertid starter eller slutter. Du kan legge til så mange gudstjenester du trenger. Besøkende ser neste planlagte gudstjenestetid når de besøker sendesiden din.
:::

## Innstillinger for sendesiden

For å tilpasse fanene og lenkene som vises ved siden av direktesendingen, åpner du hurtigmenyen, utvider **Preken** og klikker **Innstillinger**. Siden **Sendingsinnstillinger** viser listen din over **innholdsfaner**.

### Legge til faner

1. Klikk knappen **Legg til** for å legge til en ny fane på sendesiden din.
2. Velg en **lenketype**: **Ekstern URL** for en egendefinert lenke, eller en av de ferdigdesignede fanene **Chat** eller **Bønn**.
3. For chatfanen gir du den bare et navn i boksen **Fanetekst**, så er oppsettet ferdig.
4. For en lenket fane skriver du inn fanenavnet, velger et ikon ved å klikke ikonknappen, og skriver inn URL-en.
5. De konfigurerte fanene dine vises på direktesendingssiden, slik at seerne kan få tilgang til ekstra ressurser og interaktive funksjoner.

### Forhåndsvise sendingen din

På siden **Direktesendingstider** klikker du **Vis sendingen din** øverst på siden for å se nøyaktig hvordan sendesiden din vil se ut for besøkende, inkludert logoen din, gudstjenestetidene og de konfigurerte fanene.

## Sette opp YouTube-direktesending

For å koble YouTube-kanalen din til for automatisk direktesending:

1. Gå til **Preken** og klikk **Legg til preken**, og velg deretter **Legg til permanent direkte-URL**.
2. Videoleverandøren står som standard på **Gjeldende YouTube-direktesending**. Skriv inn **YouTube-kanal-ID-en din**.
3. Legg til en tittel og beskrivelse, og klikk deretter **Lagre**.
4. Under **Direktesendingstider** oppretter du en gudstjeneste og velger den permanente direkte-URL-en din fra nedtrekkslisten for preken.

:::tip
For å finne YouTube-kanal-ID-en din går du til avanserte innstillinger for YouTube-kanalen din og kopierer verdien for kanal-ID.
:::

## Tilpasse farger og logo

Sendesiden din bruker innstillingene for [utseende](../website/appearance) på nettstedet ditt:

- **Lys aksentfarge** med mørk tekst brukes til toppteksten.
- **Mørk aksentfarge** med lys tekst brukes til sidepanelet.
- **Logoen din for lys bakgrunn** vises på sendesiden. Bruk et bilde med gjennomsiktig bakgrunn og et sideforhold på 4:1.

For å endre disse, gå til **Nettsted** og deretter **Utseende**, og oppdater innstillingene for [fargepalett](../website/appearance#color-palette) og [logo](../website/appearance#logo-and-branding).

## Legge til vertskap for direktesending

For å gi teammedlemmer tilgang til chat kun for verter, sammen med den offentlige chatten:

1. I hurtigmenyen velger du **Innstillinger > Roller**.
2. Klikk på plusknappen og velg **Legg til egendefinert rolle**.
3. Gi rollen navnet «Vert for direktesending» og klikk **Lagre**.
4. Klikk på den nye rollen, og klikk deretter **Legg til** i seksjonen Medlemmer for å legge til personer.
5. Rull ned til **Rediger tillatelser**, utvid seksjonen **Innhold**, og kryss av for **Vertschat**.

Når verter logger inn på direktesendingssiden, vises en privat fane **Vertschat** ved siden av den offentlige chatten, for samtaler som kun er for ansatte under sendingen.

:::info
For mer informasjon om å lage roller og administrere tillatelser, se [Roller og tillatelser](../settings/roles-permissions.md).
:::

## Feilsøking

Hvis den automatiske YouTube-direktesendingen ikke vises riktig når du bruker alternativet «Gjeldende YouTube-direktesending» med kanal-ID-en din, prøv følgende:

**Symptomer:**
- Direktesendingens innebygging viser «Video utilgjengelig»
- Siden lastes, men ingen video vises
- Direkte YouTube-innbygginger fungerer, men den automatiske kanal-direktesendingen gjør det ikke

**Løsning:**
Gå gjennom YouTube-kanalen din for gamle eller kommende planlagte direktesendinger, og slett dem:

1. Gå til YouTube Studio.
2. Gå til **Innhold** og deretter **Direkte**.
3. Se etter gamle planlagte direktesendinger eller kommende planlagte sendinger.
4. Slett disse gamle eller planlagte direktesendingsoppføringene.
5. Test direktesendingssiden din på nytt.

:::warning
YouTubes automatiske innbygging av kanalens direktesending kan blokkeres når det finnes flere planlagte eller tidligere direktesendinger i kanalen din. Å fjerne dem gjør at YouTube kan identifisere og vise din gjeldende direktesending på riktig måte.
:::

**Ytterligere krav:**
- Direktesendingen din må være satt til **Offentlig** (ikke Uoppført eller Privat).
- Innbygging må være tillatt i innstillingene for direktesending på YouTube.
- Kontroller at du bruker leverandøren **Gjeldende YouTube-direktesending** (med kanal-ID), ikke leverandøren **YouTube** (med video-ID).

## Neste steg

- [Administrere prekener](managing-sermons) -- Legg til prekener i biblioteket ditt
- [Spillelister](playlists) -- Organiser prekener i serier
