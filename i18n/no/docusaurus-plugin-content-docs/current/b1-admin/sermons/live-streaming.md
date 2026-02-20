---
title: "Direktestrømming"
---

# Direktestrømming

<div class="article-intro">

Siden for direktestrømmingstider lar deg konfigurere kirkens strømmingsplan, administrere gudstjenestetider og tilpasse seeropplevelsen. Sett opp faste ukentlige gudstjenester eller enkelthendelser, konfigurer chat- og videoinnstillinger, og kontroller når strømmingen starter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Ha YouTube-kanal-ID-en din klar hvis du planlegger å bruke automatisert direktestrømming
- Legg til minst én [preken](managing-sermons) eller permanent direkte-URL som strømmingskilde

</div>

Siden har to hovedfaner: **Gudstjenester** for administrering av direktestrømmingsplanen og **Innstillinger** for konfigurering av strømmingssiden.

## Administrere gudstjenester

### Legge til en gudstjeneste

1. I B1 Admin, klikk **Prekener** i venstre sidepanel, og klikk deretter fanen **Direktestrømmingstider**.
2. Klikk **Legg til gudstjeneste**-knappen for å opprette en ny planlagt gudstjeneste.
3. Skriv inn et **gudstjenestenavn** (for eksempel «Søndags morgen»).
4. Angi **gudstjenestetid** -- velg dag og tidspunkt for når gudstjenesten begynner.
5. Sett **Gjentas ukentlig** til **Ja** for faste ukentlige gudstjenester, eller **Nei** for en enkelthendelse.

### Konfigurere chat- og videoinnstillinger

6. Under **Chat-innstillinger**, angi hvor mange minutter før og etter gudstjenesten chatten skal være aktivert. Dette lar besøkende begynne å chatte før gudstjenesten starter og fortsette etterpå.
7. Under **Videoinnstillinger**, angi hvor tidlig videostrømmingen skal starte for nedtelling eller innhold før gudstjenesten.
8. Velg hvilken preken som skal spilles fra nedtrekksmenyen:
   - **Nyeste preken** -- Spiller automatisk den sist tillagte videoen din.
   - **Nåværende direktesending** -- Spiller den nåværende direktestrømmingen fra YouTube ved hjelp av kanal-ID-en din.
   - Du kan også velge en spesifikk preken du allerede har lagret.
9. Klikk **Lagre** for å planlegge gudstjenesten.

:::info
Gudstjenesten din oppdateres automatisk hver uke hvis den er satt til gjentakende. Du kan legge til så mange gudstjenester du trenger. Besøkende vil se neste planlagte gudstjenestetid når de besøker strømmingssiden din.
:::

## Innstillinger for strømmingssiden

Klikk fanen **Innstillinger** for å tilpasse fanene og lenkene som vises ved siden av direktestrømmingen.

### Legge til faner

1. Klikk **Legg til**-knappen for å legge til en ny fane på direktestrømmingssiden.
2. Velg blant forhåndsdesignede faner (**Chat** eller **Bønn**) eller legg til en egendefinert fane med en ekstern URL.
3. For forhåndsdesignede faner, gi den bare et navn i boksen **Fanetekst**, og oppsettet er fullført.
4. For en lenket fane, skriv inn fanenavnet, velg et ikon ved å klikke ikonknappen, og skriv inn URL-en.
5. De konfigurerte fanene dine vil vises på direktestrømmingssiden slik at seerne kan få tilgang til tilleggsressurser og interaktive funksjoner.

### Forhåndsvise strømmingen

Klikk **Vis strømmingen din**-knappen for å se nøyaktig hvordan direktestrømmingssiden din vil se ut for besøkende, inkludert logoen din, gudstjenestetider og konfigurerte faner.

## Sette opp YouTube-direktestrømming

For å koble YouTube-kanalen din til automatisk direktestrømming:

1. Gå til **Prekener** og klikk **Legg til preken**, velg deretter **Legg til permanent direkte-URL**.
2. Videoleverandøren er satt til **Nåværende YouTube-direktestrømming** som standard. Skriv inn **YouTube-kanal-ID-en** din.
3. Legg til en tittel og beskrivelse, og klikk deretter **Lagre**.
4. I **Direktestrømmingstider**, opprett en gudstjeneste og velg den permanente direkte-URL-en din fra preken-nedtrekksmenyen.

:::tip
For å finne YouTube-kanal-ID-en din, gå til de avanserte innstillingene for YouTube-kanalen din og kopier kanal-ID-verdien.
:::

## Tilpasse farger og logo

Direktestrømmingssiden bruker nettstedets [Utseende](../website/appearance)-innstillinger:

- Den **lyse aksentfargen** med mørk tekst brukes til toppteksten.
- Den **mørke aksentfargen** med lys tekst brukes til sidefeltet.
- **Logoen for lys bakgrunn** vises på strømmingssiden. Bruk et bilde med gjennomsiktig bakgrunn og et 4:1 sideforhold.

For å endre disse, gå til **Nettsted** og deretter **Utseende** og oppdater innstillingene for [Fargepalett](../website/appearance#color-palette) og [Logo](../website/appearance#logo-and-branding).

## Legge til strømmingsverter

For å gi teammedlemmer vertsfunksjoner (chatmoderasjon, svar på bønneforespørsler):

1. Gå til **Innstillinger** i venstre sidepanel og klikk **Roller**.
2. Klikk plussknappen og velg **Legg til egendefinert rolle**.
3. Gi rollen navnet «Strømmingsvert» og klikk **Lagre**.
4. Klikk den nye rollen, og klikk deretter **Legg til** i Medlemmer-seksjonen for å legge til personer.
5. Bla ned til **Rediger tillatelser**, utvid **Innhold**-seksjonen, og kryss av for **Vert for chat**.

Når verter logger inn på direktestrømmingssiden, vil de ha spesielle funksjoner inkludert chatmoderasjon og administrering av bønneforespørsler.

:::info
For mer informasjon om å opprette roller og administrere tillatelser, se [Roller og tillatelser](../settings/roles-permissions.md).
:::

## Feilsøking

Hvis den automatiserte YouTube-direktestrømmingen din ikke vises riktig når du bruker alternativet «Nåværende YouTube-direktestrømming» med kanal-ID-en din, prøv følgende:

**Symptomer:**
- Den innebygde direktestrømmingen viser «Video utilgjengelig»
- Siden laster, men ingen video vises
- Direkte YouTube-innbygginger fungerer, men den automatiserte kanal-direktestrømmingen gjør det ikke

**Løsning:**
Sjekk YouTube-kanalen din for gamle eller kommende planlagte direktesendinger og slett dem:

1. Gå til YouTube Studio.
2. Naviger til **Innhold** og deretter **Direkte**.
3. Se etter gamle planlagte sendinger eller kommende planlagte strømminger.
4. Slett disse gamle eller planlagte direktesendingsoppføringene.
5. Test direktestrømmingssiden din igjen.

:::warning
YouTubes automatiserte kanal-direktestrømmingsinnbygging kan bli blokkert når det er flere planlagte eller tidligere direktesendingsoppføringer i kanalen din. Fjerning av disse gjør at YouTube kan identifisere og levere din nåværende direktestrømming korrekt.
:::

**Tilleggskrav:**
- Direktestrømmingen din må være satt til **Offentlig** (ikke Uoppført eller Privat).
- Innbygging må være tillatt i YouTube-strømmingsinnstillingene dine.
- Sørg for at du bruker leverandøren **Nåværende YouTube-direktestrømming** (med kanal-ID), ikke **YouTube**-leverandøren (med video-ID).

## Neste steg

- [Administrere prekener](managing-sermons) -- Legg til prekener i biblioteket ditt
- [Spillelister](playlists) -- Organiser prekener i serier
