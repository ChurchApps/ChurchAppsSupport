---
title: "Direktesending"
---

# Direktesending

<div class="article-intro">

Siden Tidspunkter for direktesending lar deg konfigurere menighetens sendeplan, administrere gudstjenestetidspunkter og tilpasse seeropplevelsen. Sett opp faste ukentlige gudstjenester eller enkeltstående arrangementer, konfigurer chat- og videoinnstillinger, og styr når sendingen går live.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **contentApi.streamingServices.edit**. Se [Roller og tillatelser](../settings/roles-permissions.md) hvis du ikke har tilgang.
- Ha YouTube-kanal-ID-en klar hvis du planlegger å bruke automatisk direktesending
- Legg til minst én [preken](managing-sermons) eller en permanent live-URL som du kan bruke som sendingskilde

</div>

Siden har to hovedfaner: **Gudstjenester** for å administrere sendeplanen din og **Innstillinger** for å konfigurere sendesiden din.

## Administrere gudstjenester

### Legge til en gudstjeneste

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) i B1 Admin, utvid **Prekener** og klikk på **Tidspunkter for direktesending**.
2. Klikk på knappen **Legg til gudstjeneste** for å opprette en ny planlagt gudstjeneste.
3. Skriv inn et **Gudstjenestenavn** (for eksempel «Søndag formiddag»).
4. Angi **Gudstjenestetidspunkt** -- velg dagen og klokkeslettet gudstjenesten begynner.
5. Sett **Gjentas ukentlig** til **Ja** for faste ukentlige gudstjenester, eller **Nei** for et enkeltstående arrangement.

### Konfigurere chat- og videoinnstillinger

6. Under **Chatinnstillinger** angir du hvor mange minutter før og etter gudstjenesten chatten skal være aktivert. Da kan besøkende begynne å chatte før gudstjenesten starter og fortsette etterpå.
7. Under **Videoinnstillinger** angir du hvor tidlig videosendingen skal starte, for nedtelling eller innhold før gudstjenesten.
8. Velg hvilken preken som skal spilles av, fra nedtrekksmenyen:
   - **Siste preken** -- Spiller automatisk av den nyligst tilføyde videoen din.
   - **Pågående direktesending** -- Spiller av den pågående direktesendingen din fra YouTube ved hjelp av kanal-ID-en din.
   - Du kan også velge en hvilken som helst bestemt preken du allerede har lagret.
9. Klikk på **Lagre** for å planlegge gudstjenesten.

:::info
Gudstjenesten oppdateres automatisk hver uke hvis den er satt til å gjentas. Du kan legge til så mange gudstjenester du trenger. Besøkende ser neste planlagte gudstjenestetidspunkt når de besøker sendesiden din.
:::

## Innstillinger for sendesiden

Klikk på fanen **Innstillinger** for å tilpasse fanene og lenkene som vises ved siden av direktesendingen.

### Legge til faner

1. Klikk på knappen **Legg til** for å legge til en ny fane på direktesendingssiden din.
2. Velg den ferdigdesignede **Chat**-fanen, eller legg til en egendefinert fane med en ekstern URL.
3. For Chat-fanen gir du den bare et navn i boksen **Fanetekst**, så er oppsettet ferdig.
4. For en lenkefane skriver du inn fanenavnet, velger et ikon ved å klikke på ikonknappen, og skriver inn URL-en.
5. De konfigurerte fanene vises på direktesendingssiden, slik at seerne får tilgang til flere ressurser og interaktive funksjoner.

### Forhåndsvise sendingen

Klikk på knappen **Se sendingen din** for å se nøyaktig hvordan direktesendingssiden vil se ut for besøkende, med logo, gudstjenestetidspunkter og de konfigurerte fanene.

## Sette opp YouTube-direktesendingen din

Slik kobler du YouTube-kanalen din til automatisk direktesending:

1. Gå til **Prekener** og klikk på **Legg til preken**, og velg deretter **Legg til permanent live-URL**.
2. Videoleverandøren er som standard **Pågående YouTube-direktesending**. Skriv inn **YouTube-kanal-ID-en** din.
3. Legg til en tittel og en beskrivelse, og klikk deretter på **Lagre**.
4. Opprett en gudstjeneste under **Tidspunkter for direktesending**, og velg den permanente live-URL-en din fra prekenlisten.

:::tip
For å finne YouTube-kanal-ID-en din går du til de avanserte innstillingene for YouTube-kanalen og kopierer verdien for kanal-ID.
:::

## Tilpasse farger og logo

Direktesendingssiden bruker innstillingene under [Utseende](../website/appearance) for nettstedet ditt:

- Den **lyse aksentfargen** med mørk tekst brukes til toppfeltet.
- Den **mørke aksentfargen** med lys tekst brukes til sidefeltet.
- **Logoen for lys bakgrunn** vises på sendesiden. Bruk et bilde med gjennomsiktig bakgrunn og sideforhold 4:1.

For å endre disse går du til **Nettsted** og deretter **Utseende** og oppdaterer innstillingene for [fargepalett](../website/appearance#color-palette) og [logo](../website/appearance#logo-and-branding).

## Legge til programverter for sendingen

Slik gir du teammedlemmer tilgang til vertschatten, som bare er for verter, ved siden av den offentlige chatten:

1. Velg **Innstillinger > Roller** i Jump-menyen.
2. Klikk på plussknappen og velg **Legg til egendefinert rolle**.
3. Gi rollen navnet «Sendingsvert» og klikk på **Lagre**.
4. Klikk på den nye rollen, og klikk deretter på **Legg til** i delen Medlemmer for å legge til personer.
5. Bla ned til **Rediger tillatelser**, utvid delen **Innhold** og huk av for **Vertschat**.

Når verter logger inn på direktesendingssiden, vises en privat fane **Vertschat** ved siden av den offentlige chatten, for samtaler kun for medarbeidere under sendingen.

:::info
For mer om å opprette roller og administrere tillatelser, se [Roller og tillatelser](../settings/roles-permissions.md).
:::

## Feilsøking

Hvis den automatiske YouTube-direktesendingen din ikke vises riktig når du bruker alternativet «Pågående YouTube-direktesending» med kanal-ID-en din, kan du prøve følgende:

**Symptomer:**
- Direktesendingen viser «Video unavailable»
- Siden lastes, men ingen video vises
- Vanlig innbygging fra YouTube fungerer, men den automatiske kanaldirektesendingen gjør det ikke

**Løsning:**
Sjekk YouTube-kanalen din for gamle eller kommende planlagte direktesendinger og slett dem:

1. Gå til YouTube Studio.
2. Gå til **Innhold** og deretter **Live**.
3. Se etter gamle planlagte direktesendinger eller kommende planlagte sendinger.
4. Slett disse gamle eller planlagte direktesendingene.
5. Test direktesendingssiden din på nytt.

:::warning
YouTubes automatiske innbygging av kanaldirektesending kan bli blokkert når det finnes flere planlagte eller tidligere direktesendinger i kanalen din. Hvis du fjerner dem, kan YouTube identifisere og levere den pågående direktesendingen riktig.
:::

**Ytterligere krav:**
- Direktesendingen må være satt til **Offentlig** (ikke Uoppført eller Privat).
- Innbygging må være tillatt i innstillingene for YouTube-sendingen din.
- Pass på at du bruker leverandøren **Pågående YouTube-direktesending** (med kanal-ID), ikke leverandøren **YouTube** (med video-ID).

## Neste steg

- [Administrere prekener](managing-sermons) -- Legg til prekener i biblioteket ditt
- [Spillelister](playlists) -- Organiser prekener i serier
