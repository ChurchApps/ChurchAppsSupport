---
title: "Utseende"
---

# Utseende

<div class="article-intro">

Siden Utseende lar deg tilpasse det samlede utseendet og inntrykket av menighetens nettside. Fra farger og skrifttyper til avstand og egen CSS kan du styre alle visuelle sider ved nettstedet fra ett sted.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Første oppsett](initial-setup) for nettstedet ditt
- Ha menighetens logo klar i PNG-format med gjennomsiktig bakgrunn og et sideforhold på 4:1
- Kjenn til menighetens merkefarger (heksadesimale verdier) hvis du har en eksisterende stilguide

</div>

## Åpne innstillinger for utseende

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettsted**.
2. Klikk på **Utseende**.
3. Siden **Stilarter for nettstedet** lastes. Kortet **Tema, skrifter og bunntekst** viser listen **Stilinnstillinger** til venstre og en forhåndsvisning av et eksempelnettsted til høyre. Under den ligger kortene **Kunngjøring og moduler** og **Omdirigeringer og analyse**.

## Fargepalett {#color-palette}

1. Klikk på **Fargepalett** i panelet Stilinnstillinger.
2. Du ser **Grunnfarger** (lyse, aksent- og mørke nyanser) og **Semantiske farger** (Primær, Sekundær, Suksess, Advarsel og Feil).
3. Klikk på en fargeprøve for å åpne fargevelgeren. Dra velgeren eller skriv inn en heksadesimal verdi for å velge fargen din.
4. Forhåndsvisningen **Fargekombinasjoner** viser hvordan de valgte fargene fungerer sammen.
5. Bruk **Foreslåtte paletter** for raskt å ta i bruk en ferdig fargeskjema.
6. Klikk på **Lagre palett** når du er fornøyd.

## Typografi

1. Klikk på **Skrifter** i panelet Stilinnstillinger.
2. Klikk på knappen **Overskriftsskrift** eller **Brødtekstskrift** for å åpne skriftleseren. Du kan søke etter navn eller bla i kategorier som Serif, Sans Serif, Dekorativ, Håndskrift og Monospace. Du kan også velge en av **Populære skriftkombinasjoner**.
3. Klikk på **Lagre skrifter** for å ta i bruk valgene dine.
4. For å justere størrelseshierarkiet for Overskrift 1 til 4, klikker du på **Typografiskala** i panelet Stilinnstillinger. Bruk feltene **Typeskala-multiplikator**, **Grunnstørrelse** og **Linjehøyde** for å finjustere, og klikk deretter på **Lagre typografi**.

## Avstand

1. Klikk på **Avstandsskala** i panelet Stilinnstillinger.
2. Juster avstandsverdiene fra Ekstra liten til Ekstra stor. Praktiske eksempler viser hvordan hver verdi påvirker oppsettet.
3. Klikk på **Lagre avstand** for å ta i bruk verdiene på hele nettstedet ditt.

## Logo og profilering {#logo-and-branding}

1. Klikk på **Logo** i panelet Stilinnstillinger.
2. Last opp din **Logo for lys bakgrunn** og **Logo for mørk bakgrunn**. Bruk bilder med gjennomsiktig bakgrunn og et sideforhold på 4:1 for best resultat.
3. Last opp et **Bilde for sosiale medier** for lenkeforhåndsvisninger og et **Favicon** for ikonet i nettleserfanen.
4. Klikk på **Lagre endringer**. Opplastede bilder lagres ikke før du lagrer, så hvis du prøver å lukke eller laste nettleserfanen på nytt først, varsler nettleseren deg om at du har ulagrede endringer.

:::tip
For best resultat bruker du en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut på både lys og mørk bakgrunn på nettstedet ditt og i [mobilappen](../settings/mobile-app.md).
:::

## Navigasjonsstiler

Tilpass fargene på navigasjonslinjen for nettstedet ditt, både for fast og gjennomsiktig modus:

1. Klikk på **Navigasjon** i panelet Stilinnstillinger
2. Konfigurer farger for **Topptekst (fast)** og **Topptekst over hero (gjennomsiktig)**
3. Klikk på **Lagre navigasjon** for å ta i bruk navigasjonsfargene

For detaljerte instruksjoner, se [Navigasjonsstiler](./navigation-styles.md).

## Kunngjøring og moduler

Modulene på nettstedet vises på hver side og flyter over sideinnholdet:

- **Kunngjøringsbanner** -- En lukkbar linje øverst på nettstedet for tidssensitive meldinger, for eksempel en kommende hendelse eller en endring i gudstjenesten.
- **Startknapp** -- En flytende knapp som åpner en hurtigmeny, for eksempel lenker til gave, innsjekking eller visning av menighetsbladet.

1. Finn kortet **Kunngjøring og moduler** under panelet Stilinnstillinger.
2. Slå på modulene du vil bruke, og konfigurer teksten, lenkene og fargene deres.
3. Klikk på **Lagre**.

## Omdirigeringer og analyse

Kortet **Omdirigeringer og analyse** (under panelet Stilinnstillinger) inneholder to ulike, men ofte nødvendige innstillinger:

- **Analyse** -- Legg til din **GA4-måle-ID** (format `G-XXXXXXXXXX`) for å spore besøkstrafikken på nettstedet ditt. Den samme ID-en sporer også sidevisninger i menighetens B1-app (medlemsportalen på `/mobile`, inkludert den installerte appen), merket med `display_mode` som `installed` eller `browser`, slik at du kan skille besøk fra den installerte appen fra besøk i nettleser i Google Analytics.
- **Omdirigeringer** -- Knytt en gammel URL-bane til en ny, slik at lenker til en side du har flyttet eller gitt nytt navn fortsatt fungerer i stedet for å gi 404-feil. Skriv inn den gamle banen i **Fra** og den nye banen i **Til**, og klikk deretter på **Lagre**. En omdirigering har også forrang over B1s innebygde sider (`/sermons`, `/stream`, `/donate`, `/bible` og `/votd`), slik at du kan sende den adressen et annet sted (for eksempel til din egen preken-side eller en YouTube-kanal). Den overstyrer ikke en side du har bygget selv på samme adresse. Slett den siden først hvis du vil at omdirigeringen skal gjelde.

## Egen CSS og JavaScript

1. Klikk på **CSS og JavaScript** i panelet Stilinnstillinger.
2. Legg til **Egen CSS** for å overstyre standardstiler for avansert tilpasning.
3. Legg til **Egen HTML** for sporingskoder eller andre skript.
4. Bruk seksjonen **Vanlige JavaScript-eksempler** for kodesnutter, for eksempel integrasjon med Google Analytics.

:::warning
Egen CSS er kraftig, men kan ødelegge oppsettet på nettstedet ditt hvis den brukes feil. De fleste menigheter kan oppnå det utseendet de ønsker ved hjelp av de innebygde kontrollene for farger, skrifter og avstand. Bruk bare egen CSS hvis du er komfortabel med webutvikling.
:::

:::info
Nettstedet ditt håndhever en innholdssikkerhetspolicy som blokkerer innebygde skript fra alle andre kilder. Feltet **Egen HTML** her, og [HTML-elementet](page-editor#using-the-html-element) på enkeltsider, er de betrodde unntakene -- kode du lagrer der kjøres uendret, så lim bare inn skript fra kilder du stoler på (analysekoder, chat-moduler og lignende innbygginger).
:::

## Stilmaler

Hvis du vil ha et raskt utgangspunkt, tilbyr **Foreslåtte paletter** i delen Fargepalett ferdige temaer som setter sammenhengende farger med ett klikk. Du kan alltid finjustere enkeltinnstillinger etter at du har tatt i bruk et tema.

## Neste steg

- [Administrere sider](managing-pages) -- Bygg og organiser nettstedets sider
- [Filer](files) -- Last opp mediefiler for nettstedet ditt
