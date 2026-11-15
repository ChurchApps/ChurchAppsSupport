---
title: "Utseende"
description: "Angi farger, skrifter, avstand, logo og navigasjon for menighetens nettside i B1 Admin, samt widgets, GA4-analyse, omdirigeringer og egendefinert CSS."
---

# Utseende

<div class="article-intro">

Siden Utseende lar deg tilpasse det generelle utseendet og følelsen på menighetens nettside. Fra farger og skrifter til avstand og egendefinert CSS kan du styre alle visuelle sider ved nettstedet ditt fra ett sted.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](./initial-setup.md) for nettstedet ditt
- Ha menighetens logo klar i PNG-format med gjennomsiktig bakgrunn og et sideforhold på 4:1
- Kjenn menighetens merkevarefarger (heksadesimale verdier) hvis dere har en eksisterende stilguide

</div>

## Åpne innstillinger for utseende {#accessing-appearance-settings}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Nettside**.
2. Klikk på **Utseende**.
3. Siden **Stilarter for nettstedet** lastes. Kortet **Tema, skrifter og bunntekst** viser listen **Stilinnstillinger** til venstre og en forhåndsvisning av et eksempelnettsted til høyre. Under den finner du kortene **Kunngjøring og widgets** og **Omdirigeringer og analyse**.

## Fargepalett {#color-palette}

1. Klikk på **Fargepalett** i panelet Stilinnstillinger.
2. Du ser **grunnfarger** (lyse, aksent- og mørke nyanser) og **semantiske farger** (Primær, Sekundær, Suksess, Advarsel og Feil).
3. Klikk på en fargeprøve for å åpne fargevelgeren. Dra velgeren eller skriv inn en heksadesimal verdi for å velge fargen din.
4. **Forhåndsvisningen av fargekombinasjoner** viser hvordan de valgte fargene fungerer sammen.
5. Bruk **Foreslåtte paletter** for å starte fra et ferdig fargeskjema. Når du klikker på en palett, lastes bare fargene inn i redigeringsverktøyet.
6. Klikk på **Lagre palett** for å bruke fargene på nettstedet, eller **Avbryt** for å forkaste dem.

## Typografi {#typography}

1. Klikk på **Skrifter** i panelet Stilinnstillinger.
2. Klikk på knappen **Overskriftsskrift** eller **Brødtekstskrift** for å åpne **Velg en skrift**, som lister Google Fonts etter popularitet, ti per side. Skriv i **Søk** for å finne en skrift på navn, eller bruk **Kategorifilteret** (Serif, Sans Serif, Dekorativ, Håndskrift eller Monospace). Klikk på en skrift for å velge den. Du kan også klikke på en av **Populære skriftkombinasjoner** for å sette begge skriftene samtidig.
3. Klikk på **Lagre skrifter** for å bruke skriftvalgene dine.
4. For å justere størrelseshierarkiet for overskrift 1 til 4, klikker du på **Typografiskala** i panelet Stilinnstillinger. Bruk feltene **Typeskala-multiplikator**, **Grunnstørrelse** og **Linjehøyde** for å finjustere, og klikk deretter på **Lagre typografi**.

## Avstand {#spacing}

1. Klikk på **Avstandsskala** i panelet Stilinnstillinger.
2. Juster avstandsverdiene fra Ekstra liten til Ekstra stor. Praktiske eksempler viser hvordan hver verdi påvirker oppsettet.
3. Klikk på **Lagre avstand** for å bruke verdiene på hele nettstedet.

## Logo og merkevare {#logo-and-branding}

1. Klikk på **Logo** i panelet Stilinnstillinger.
2. Last opp **logo for lys bakgrunn** og **logo for mørk bakgrunn**. Bruk bilder med gjennomsiktig bakgrunn og et sideforhold på 4:1 for best resultat.
3. Last opp et **bilde for sosiale medier** for forhåndsvisning av lenker og et **favikon** for ikonet i nettleserfanen.
4. Du kan eventuelt skrive inn et **kortnavn for PWA** (opptil 12 tegn) -- navnet som vises under menighetens appikon når noen legger det til på startskjermen på telefonen sin.
5. Klikk på **Lagre endringer**. Opplastede bilder lagres ikke før du lagrer, så hvis du prøver å lukke eller laste nettleserfanen på nytt først, advarer nettleseren deg om at du har ulagrede endringer.

Logoene deles av alle menighetens nettsider, og av appen din og trykte materialer som oppmøtelister.

:::tip
For best resultat bruker du en logo med gjennomsiktig bakgrunn i PNG-format. Det sikrer at den ser bra ut på både lys og mørk bakgrunn på nettstedet ditt og i [mobilappen](../settings/mobile-app.md).
:::

## Navigasjonsstiler {#navigation-styles}

Tilpass fargene på navigasjonslinjen for nettstedet ditt, både for solid og gjennomsiktig modus:

1. Klikk på **Navigasjon** i panelet Stilinnstillinger
2. Konfigurer farger for **Topptekst (solid)** og **Topptekst over hovedbilde (gjennomsiktig)**
3. Klikk på **Lagre navigasjon** for å bruke navigasjonsfargene dine

For detaljerte instruksjoner, se [Navigasjonsstiler](./navigation-styles.md).

## Bunntekst {#site-footer}

Klikk på **Bunntekst** i panelet Stilinnstillinger for å åpne bunnteksten i blokkeditoren. Bygg den som en vanlig sideseksjon -- for eksempel adressen din, gudstjenestetider og lenker til sosiale medier -- og klikk på **Avslutt** når du er ferdig. Bunnteksten vises nederst på alle sider som bruker oppsettet **Topptekst og bunntekst**. Hvert av nettstedene dine har sin egen bunntekst.

## Kunngjøring og widgets {#announcement--widgets}

Nettstedwidgets vises på alle sider på nettstedet ditt, svevende over sidens innhold:

- **Kunngjøringsbanner** -- En linje øverst på nettstedet som kan lukkes, for tidssensitive meldinger, som et kommende arrangement eller en endring i gudstjenesten.
- **Launcher** -- En svevende knapp som åpner en hurtigmeny, for eksempel lenker til gave, innsjekking eller menighetsbladet.

1. Finn kortet **Kunngjøring og widgets** under panelet Stilinnstillinger.
2. For **kunngjøringsbanneret** krysser du av for **Aktivert** og fyller inn **tekst**, en valgfri **lenke-URL** og **lenketekst**, samt **bakgrunnsfarge** og **tekstfarge**. Sett en **startdato** og **sluttdato** for å vise banneret bare i det tidsrommet.
3. For **Launcheren** krysser du av for **Aktivert**, og klikker deretter på **Legg til handling** for hver lenke (opptil fem) og gir den en **etikett**, en **URL** og et **ikon**. Velg **plassering** (nederst til høyre eller nederst til venstre) og **farge**.
4. Klikk på **Lagre**.

Fjern avkryssingen for **Aktivert** og klikk på **Lagre** for å slå av en widget. Disse widgetene gjelder for alle menighetens nettsider.

## Omdirigeringer og analyse {#redirects--analytics}

Kortet **Omdirigeringer og analyse** (under panelet Stilinnstillinger) inneholder to ulike, men ofte nødvendige innstillinger:

- **Analyse** -- Legg til din **GA4-måle-ID** (format `G-XXXXXXXXXX`) og klikk på **Lagre** for å spore besøkstrafikken på nettstedet ditt. Den samme ID-en sporer også sidevisninger i menighetens B1-app (medlemsportalen på `/mobile`, inkludert den installerte appen), merket med en `display_mode` på `installed` eller `browser`, slik at du kan skille besøk fra den installerte appen fra besøk i nettleseren i Google Analytics.
- **Omdirigeringer** -- Knytt en gammel URL-sti til en ny, slik at lenker til en side du har flyttet eller gitt nytt navn fortsatt fungerer i stedet for å gi 404. Skriv inn den gamle **Fra-sti** og den nye **Til-sti**, og klikk deretter på **Legg til**. Omdirigeringen lagres med en gang og listes over feltene; klikk på slettikonet for å fjerne den. Stier lagres med små bokstaver, med en innledende skråstrek og uten etterfølgende skråstrek. En omdirigering har også forrang over B1s innebygde sider (`/sermons`, `/stream`, `/donate`, `/bible` og `/votd`), slik at du kan sende den adressen et annet sted (for eksempel til din egen prekenside eller en YouTube-kanal). Den overstyrer ikke en side du har laget selv på samme adresse. Slett den siden først hvis du vil at omdirigeringen skal gjelde.

## Egendefinert CSS og JavaScript {#custom-css-and-javascript}

1. Klikk på **CSS og JavaScript** i panelet Stilinnstillinger.
2. Legg til **egendefinert CSS** for å overstyre standardstiler til avansert tilpasning.
3. Legg til **egendefinert HTML** for sporingskoder eller andre skript.
4. Bruk seksjonene **Vanlige CSS-eksempler** og **Vanlige JavaScript-eksempler** for ferdige utdrag, og klikk deretter på **Lagre endringer**.

:::warning
Egendefinert CSS er kraftig, men kan ødelegge oppsettet på nettstedet ditt hvis den brukes feil. De fleste menigheter kan oppnå ønsket utseende med de innebygde kontrollene for farger, skrifter og avstand. Bruk bare egendefinert CSS hvis du er komfortabel med webutvikling.
:::

:::info
Nettstedet ditt håndhever en innholdssikkerhetspolicy som blokkerer innebygde skript fra alle andre kilder. Feltet **Egendefinert HTML** her, og [HTML-elementet](./page-editor.md#using-the-html-element) på enkeltsider, er de betrodde unntakene -- kode du lagrer der kjøres som den er, så lim bare inn skript fra kilder du stoler på (sporingskoder for analyse, chat-widgeter og lignende innbygginger).
:::

## Stiltemaer {#style-themes}

Hvis du vil ha et raskt utgangspunkt, tilbyr **Foreslåtte paletter** i delen Fargepalett ferdige temaer med samordnede farger. Klikk på et for å laste det inn, juster hvilken som helst farge du vil, og klikk deretter på **Lagre palett**.

## Neste steg {#next-steps}

- [Administrere sider](./managing-pages.md) -- Bygg og organiser sidene på nettstedet ditt
- [Filer](./files.md) -- Last opp mediefiler til nettstedet ditt
