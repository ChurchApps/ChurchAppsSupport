---
title: "Tidspunkt for direktesending og oppsett i B1 Admin"
sidebar_label: "Direktesending"
description: "Planlegg ukentlige eller engangs direktesendte gudstjenester, sett tidspunkt for chat og tidlig video, koble til en YouTube-kanal og feilsøk innbygginger i B1 Admin."
---

# Direktesending

<div class="article-intro">

Siden for tidspunkt for direktesending lar deg sette opp menighetens strømmeplan, administrere gudstjenestetider og tilpasse seeropplevelsen. Sett opp gjentakende ukentlige gudstjenester eller engangsarrangementer, konfigurer innstillinger for chat og video, og bestem når strømmen går live.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="tpEY-sEYW6A" title="Sette opp direktesending i B1" next="Tilpasse menighetens medlemsapp i B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Rediger gudstjenester** i delen **Innhold** i rollen din. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Ha YouTube-kanal-ID-en klar hvis du planlegger å bruke automatisk direktesending
- Legg til minst én [preken](./managing-sermons.md) eller en permanent direkte-URL som strømmekilde

</div>

Direktesending administreres fra to sider i delen **Preken** i Hurtigmenyen: **Tidspunkt for direktesending** for å administrere planen din for direktesending, og **Innstillinger** for å konfigurere fanene på strømmesiden din.

## Administrere gudstjenester {#managing-services}

### Legge til en gudstjeneste {#adding-a-service}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Preken** og klikker på **Tidspunkt for direktesending**.
2. Klikk på knappen **Legg til gudstjeneste** øverst på siden for å opprette en ny planlagt gudstjeneste. Eksisterende gudstjenester vises i en tabell som viser navnet på hver gudstjeneste (med et merke for **Ukentlig** for gjentakende gudstjenester), tidspunkt, leverandør og varighet. Hold musepekeren over en rad og klikk på redigeringsikonet for å endre den.
3. Skriv inn et **Gudstjenestenavn** (for eksempel «Søndag formiddag»). Nye gudstjenester starter som «Sunday Morning».
4. Sett **Gudstjenestetid** -- velg datoen og klokkeslettet gudstjenesten starter. Nye gudstjenester starter kl. 09:00 neste søndag.
5. Sett **Gjentas ukentlig** til **Ja** (**Ukentlig**) for vanlige ukentlige gudstjenester, eller **Nei** (**Engangs**) for et engangsarrangement.

### Konfigurere innstillinger for chat og video {#configuring-chat-and-video-settings}

6. Under **Innstillinger for chat** setter du **Aktiver chat - minutter før** og **Aktiver chat - minutter etter** -- hvor mange minutter før og etter gudstjenesten chatten skal være aktiv (10 hver for en ny gudstjeneste). Dette lar besøkende begynne å chatte før gudstjenesten starter og fortsette etterpå. Klokkeslettet ved siden av hver boks viser når chatten åpner og lukkes.
7. Under **Videoinnstillinger** setter du **Start video tidlig** -- hvor mange minutter før videostrømmen skal starte, for nedtelling eller innhold før gudstjenesten. Chatten åpner så mange minutter *før* den tidlige videoen starter, så klokkeslettet som vises ved siden av innstillingen for chat før gudstjenesten, teller begge tallene. For eksempel åpner chatten kl. 09:40 for en gudstjeneste kl. 10:00 med 15 minutter chat før og 5 minutters tidlig start.
8. Velg hva som skal spilles av i nedtrekkslisten **Preken**:
   - **Siste preken** (**Automatisk**) -- Spiller automatisk den videoen du sist la til.
   - Dine [permanente direkte-URL-er](#setting-up-your-youtube-live-stream), som listes etterpå -- hver spiller kanalens pågående direktesending fra YouTube ved hjelp av kanal-ID-en din. En ny en heter **Nåværende direktesending** hvis du ikke gir den nytt navn.
   - Under dem vises alle bestemte prekener du allerede har lagret.
9. Klikk på **Lagre** for å planlegge gudstjenesten, eller **Avbryt** for å lukke skjemaet.

For å fjerne en gudstjeneste redigerer du den, klikker på **Slett** og bekrefter.

:::info
Gudstjenesten din oppdateres automatisk hver uke hvis den er satt til å gjentas. Den beholder samme lokale klokkeslett når sommertid starter eller slutter. Du kan legge til så mange gudstjenester du trenger. Besøkende ser neste planlagte gudstjenestetid når de besøker strømmesiden din.
:::

## Innstillinger for strømmesiden {#streaming-page-settings}

For å tilpasse fanene og lenkene som vises ved siden av direktesendingen din, åpner du Hurtigmenyen, utvider **Preken** og klikker på **Innstillinger**. Siden **Innstillinger for strømming** viser listen over **innholdsfaner**, i den rekkefølgen seerne ser dem. Faner med eksterne lenker åpner lenken i en ny nettleserfane når du klikker på dem.

### Legge til faner {#adding-tabs}

1. Klikk på knappen **Legg til** for å legge til en ny fane på direktesendingssiden din. Dialogen **Opprett ny fane** åpnes.
2. Skriv inn fanens navn i boksen **Fanetekst**, og velg et **Ikon** ved å klikke på ikonknappen.
3. Velg en **Lenketype**: **Ekstern URL** for en egendefinert lenke (standard), eller en av de innebygde fanene **Chat** eller **Bønn**.
4. For en fane med ekstern URL skriver du inn adressen i boksen **Ekstern URL**. Faner for chat og bønn trenger ikke mer.
5. Klikk på **Lagre fane**. Nye faner legges til nederst i listen.

De konfigurerte fanene vises på siden for direktesending, slik at seerne får tilgang til flere ressurser og interaktive funksjoner.

### Redigere, endre rekkefølge på og slette faner {#editing-reordering-and-deleting-tabs}

Hold musepekeren over en fane og bruk knappene:

- **Flytt opp** og **Flytt ned**-pilene -- Endre rekkefølgen på fanene.
- **Rediger** (blyant) -- Endre fanens tekst, ikon, type eller URL, og klikk deretter på **Lagre fane**. For å fjerne fanen klikker du på **Slett** og bekrefter i dialogen **Slett fane**.

### Forhåndsvise strømmen din {#previewing-your-stream}

På siden **Tidspunkt for direktesending** klikker du på **Se strømmen din** øverst på siden for å se nøyaktig hvordan siden for direktesending vil se ut for besøkende, inkludert logoen din, gudstjenestetider og konfigurerte faner.

## Sette opp din YouTube-direktesending {#setting-up-your-youtube-live-stream}

Slik kobler du YouTube-kanalen din til for automatisk direktesending:

1. Gå til **Preken** og klikk på **Legg til preken**, og velg deretter **Legg til permanent direkte-URL**. Skjemaet **Rediger permanent direkte-URL** åpnes.
2. **Videoleverandør** står som standard på **Nåværende YouTube-direktesending**. Skriv inn **YouTube-kanal-ID** (ikke kanalens URL; klikk på **Hent kanal-ID** for hjelp).
3. Tittelen starter som **Nåværende direktesending**. Endre den hvis du vil, legg til en beskrivelse, og klikk deretter på **Lagre**. Permanente direkte-URL-er har ingen spilleliste eller publiseringsdato.
4. Under **Tidspunkt for direktesending** oppretter du en gudstjeneste og velger den permanente direkte-URL-en din i nedtrekkslisten **Preken**.

:::tip
For å finne YouTube-kanal-ID-en din går du til avanserte innstillinger for YouTube-kanalen din og kopierer verdien for kanal-ID.
:::

## Tilpasse farger og logo {#customizing-colors-and-logo}

Siden for direktesending bruker innstillingene for [utseende](../website/appearance.md) på nettstedet ditt:

- Den **lyse aksentfargen** med mørk tekst brukes for toppteksten.
- Den **mørke aksentfargen** med lys tekst brukes for sidepanelet.
- Din **logo for lys bakgrunn** vises på strømmesiden. Bruk et bilde med gjennomsiktig bakgrunn og et sideforhold på 4:1.

For å endre disse går du til **Nettside** og deretter **Utseende** og oppdaterer innstillingene for [fargepalett](../website/appearance.md#color-palette) og [logo](../website/appearance.md#logo-and-branding).

## Legge til vertsbrukere for strømming {#adding-streaming-hosts}

For å gi teammedlemmer tilgang til den vertsbegrensede chatten sammen med den offentlige chatten:

1. I Hurtigmenyen velger du **Innstillinger > Roller**.
2. Klikk på **Legg til rolle** og velg **Legg til egendefinert rolle**.
3. Gi rollen navnet «Strømmevert» og klikk på **Lagre**.
4. Klikk på den nye rollen, søk etter personer i medlemslisten og legg dem til (se [Legge til brukere i en rolle](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Scroll ned til **Rediger tillatelser**, utvid delen **Innhold** og kryss av for **Vertschat**.

Når verter logger inn på siden for direktesending, vises en privat fane for **Vertschat** ved siden av den offentlige chatten, for samtaler som bare er for ansatte under sendingen.

:::info
For mer informasjon om oppretting av roller og administrasjon av tillatelser, se [Roller og tillatelser](../settings/roles-permissions.md).
:::

## Feilsøking {#troubleshooting}

Hvis den automatiske YouTube-direktesendingen din ikke vises riktig når du bruker alternativet «Nåværende YouTube-direktesending» med kanal-ID-en din, prøv følgende:

**Symptomer:**
- Innbyggingen av direktesendingen viser «Video utilgjengelig»
- Siden lastes, men ingen video vises
- Direkte YouTube-innbygginger fungerer, men den automatiske direktesendingen fra kanalen fungerer ikke

**Løsning:**
Sjekk YouTube-kanalen din for gamle eller kommende planlagte direktesendinger, og slett dem:

1. Gå til YouTube Studio.
2. Gå til **Innhold** og deretter **Direkte**.
3. Se etter gamle planlagte direktesendinger eller kommende planlagte sendinger.
4. Slett disse gamle eller planlagte direktesendingene.
5. Test siden for direktesending på nytt.

:::warning
Den automatiske innbyggingen av direktesending fra YouTube-kanalen kan blokkeres når det finnes flere planlagte eller tidligere direktesendinger i kanalen din. Hvis du fjerner dem, kan YouTube identifisere og vise din pågående direktesending på riktig måte.
:::

**Ytterligere krav:**
- Direktesendingen din må være satt til **Offentlig** (ikke Uoppført eller Privat).
- Innbygging må være tillatt i innstillingene for direktesending på YouTube.
- Kontroller at du bruker leverandøren **Nåværende YouTube-direktesending** (med kanal-ID), ikke leverandøren **YouTube** (med video-ID).

## Neste steg {#next-steps}

- [Administrere prekener](./managing-sermons.md) -- Legg til prekener i biblioteket ditt
- [Spillelister](./playlists.md) -- Organiser prekener i serier
