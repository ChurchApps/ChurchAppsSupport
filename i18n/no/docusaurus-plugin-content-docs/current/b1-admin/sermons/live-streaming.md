---
title: "Direkteoverføring"
---

# Direkteoverføring

<div class="article-intro">

Siden Direkteoverføringstider lar deg konfigurere kirkens strøm-schema, administrere gudstjenesteklokkeslett og tilpasse seertilstanden. Sett opp gjentakende ukentlige gudstjenester eller engangs-hendelser, konfigurér chat- og videoinnstillinger, og kontroller når strømmen går live.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **contentApi.streamingServices.edit**-tillatelsen. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Ha YouTube-kanal-ID-en klar hvis du planlegger å bruke automatisert direkteoverføring
- Legg til minst en [prediken](managing-sermons) eller permanent live-URL for å bruke som strøm-kilden

</div>

Siden har to hovedfaner: **Gudstjenester** for administrering av direkteoverførings-planen og **Innstillinger** for konfigurering av strøm-siden.

## Administrering av gudstjenester

### Legge til en gudstjeneste

1. I B1 Admin, åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen) og velg **Prekener**, deretter klikker du **Direkteoverføringstider**-fanen.
2. Klikk **Legg til gudstjeneste**-knappen for å opprette en ny planlagt gudstjeneste.
3. Angi **gudstjeneste navn** (for eksempel, "Søndags morgen").
4. Sett **gudstjenesteklokkeslett** -- velg dag og tidspunkt gudstjenesten starter.
5. Sett **Gjentas ukentlig** til **Ja** for vanlige ukentlige gudstjenester, eller **Nei** for en engangs-hendelse.

### Konfigurering av chat- og videoinnstillinger

6. Under **Chat-innstillinger**, sett hvor mange minutter før og etter gudstjenesten chat skal være aktivert. Dette lar besøkende begynne å chatte før gudstjenesten starter og fortsette etterpå.
7. Under **Videoinnstillinger**, sett hvor tidlig du skal starte videostrømmen for nedtelling eller før-gudstjeneste-innhold.
8. Velg hvilken prediken som skal spilles fra rullemenyene:
   - **Siste prediken** -- Automatisk avspilling av den senest tilførte videoen.
   - **Gjeldende direktegudstjeneste** -- Spiller gjeldende direkteoverføring fra YouTube ved hjelp av kanal-ID-en.
   - Du kan også velge en hvilken som helst spesifikk prediken du allerede har lagret.
9. Klikk **Lagre** for å planlegge gudstjenesten.

:::info
Gudstjenesten vil automatisk oppdateres hver uke hvis den er satt til gjentakelse. Du kan legge til så mange gudstjenester som du trenger. Besøkende vil se neste planlagte gudstjenesteklokkeslett når de besøker strøm-siden.
:::

## Innstillinger for strøm-siden

Klikk **Innstillinger**-fanen for å tilpasse fanene og linkene som vises ved siden av direkteoverføringen.

### Legge til faner

1. Klikk **Legg til**-knappen for å legge til en ny fane på direkteoverførings-siden.
2. Velg **Chat**-forhåndsfastsatt fane eller legg til en egendefinert fane med en ekstern URL.
3. For Chat-fanen, gi den bare et navn i **Fanetekst**-boksen og oppsettet er fullført.
4. For en lenket fane, angi fanenavnet, velg et ikon ved å klikke ikonknappen, og angi URL-en.
5. De konfigurerte fanene dine vil vises på direkteoverførings-siden for seere for å få tilgang til tilleggsmidler og interaktive funksjoner.

### Forhåndsvisning av strømmen

Klikk **Vis strømmen**-knappen for å se nøyaktig hvordan direkteoverførings-siden vil se ut for besøkende, inkludert logoen, gudstjenesteklokkeslett og konfigurerte faner.

## Sette opp YouTube direkteoverføring

For å koble YouTube-kanalen for automatisert direkteoverføring:

1. Gå til **Prekener** og klikk **Legg til prediken**, deretter velg **Legg til permanent live-URL**.
2. Videoleverandøren er som standard **Gjeldende YouTube direkteoverføring**. Angi **YouTube-kanal-ID-en**.
3. Legg til en tittel og beskrivelse, deretter klikk **Lagre**.
4. I **Direkteoverføringstider**, opprett en gudstjeneste og velg permanent live-URL-en fra prediken-rullemenyene.

:::tip
For å finne YouTube-kanal-ID-en din, gå til avanserte innstillinger for YouTube-kanalen og kopier kanal-ID-verdien.
:::

## Tilpassing av farger og logo

Direkteoverførings-siden bruker [Utseende](../website/appearance)-innstillinger for nettstedet:

- **Lys aksjefargen** med mørk tekst brukes for hodingen.
- **Mørk aksjefargen** med lys tekst brukes for sidestolpen.
- **Lysbakgrunns-logoen** vises på strøm-siden. Bruk et bilde med gjennomsiktig bakgrunn og et 4:1-sideforhold.

For å endre disse, gå til **Nettsted** deretter **Utseende** og oppdater [Fargepaletten](../website/appearance#color-palette) og [Logo](../website/appearance#logo-and-branding)-innstillingene.

## Legge til strøm-verts

For å gi lagets medlemmer tilgang til host-only-chatten ved siden av den offentlige chatten:

1. Åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen), velg **Innstillinger** og klikk **Roller**.
2. Klikk plusknappen og velg **Legg til egendefinert rolle**.
3. Gi rollen navn "Strøm-vert" og klikk **Lagre**.
4. Klikk den nye rollen, deretter klikk **Legg til** i Medlemmer-seksjonen for å legge til mennesker.
5. Rull ned til **Rediger tillatelser**, utvid **Innhold**-seksjonen og merk **Host Chat**.

Når verter logger inn på direkteoverførings-siden, vises en privat **Host Chat**-fane ved siden av den offentlige chatten for stab-eksklusiv samtale under sendingen.

:::info
For mer informasjon om opprett av roller og administrering av tillatelser, se [Roller og tillatelser](../settings/roles-permissions.md).
:::

## Feilsøking

Hvis den automatiserte YouTube direkteoverføringen ikke vises riktig når du bruker "Gjeldende YouTube direkteoverføring"-alternativet med kanal-ID-en, prøv følgende:

**Symptomer:**
- Direkteoverførings-innlegget viser "Video utilgjengelig"
- Siden laster, men ingen video vises
- Direkte YouTube-innlegg fungerer, men den automatiserte kanalens direkteoverføring gjør det ikke

**Løsning:**
Sjekk YouTube-kanalen for gamle eller kommende planlagte direkteoverføringer og slett dem:

1. Gå til YouTube Studio.
2. Naviger til **Innhold** deretter **Direkte**.
3. Se etter gamle planlagte direkteoverføringer eller kommende planlagte strømmer.
4. Slett disse gamle eller planlagte direkteoverførings-oppføringene.
5. Test direkteoverførings-siden igjen.

:::warning
YouTubes automatiserte kanalens direkteoverførings-innlegg kan blokkeres når det er flere planlagte eller tidligere direkteoverførings-oppføringer i kanalen. Fjerning av disse lar YouTube riktig identifisere og betjene gjeldende direkteoverføring.
:::

**Tilleggs-krav:**
- Direkteoverføringen må settes til **Offentlig** (ikke skjult eller privat).
- Innlegg må tillates i YouTube-strøm-innstillingene.
- Pass på at du bruker **Gjeldende YouTube direkteoverføring**-leverandøren (med kanal-ID), ikke **YouTube**-leverandøren (med video-ID).

## Neste trinn

- [Administrering av prekener](managing-sermons) -- Legg til prekener i biblioteket
- [Playlister](playlists) -- Organiser prekener i serier
