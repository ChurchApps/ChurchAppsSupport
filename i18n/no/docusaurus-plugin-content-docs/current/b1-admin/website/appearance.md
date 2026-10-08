---
title: "Utseende"
---

# Utseende

<div class="article-intro">

På siden Utseende kan du tilpasse det overordnede uttrykket til kirkens nettsted. Fra farger og skrifttyper til avstander og egendefinert CSS kan du styre alle visuelle sider ved nettstedet fra ett sted.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](initial-setup) for nettstedet ditt
- Ha kirkens logo klar i PNG-format med gjennomsiktig bakgrunn og sideforhold 4:1
- Finn ut hva som er kirkens profilfarger (hex-verdier) hvis dere har en eksisterende designmanual

</div>

## Åpne utseendeinnstillingene

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre) og utvid **Nettsted**.
2. Klikk på **Utseende**.
3. Siden Nettstedsstiler åpnes med en live forhåndsvisning av nettstedet til venstre og **Stilinnstillinger** til høyre.

## Fargepalett

1. Klikk på **Fargepalett** i panelet Stilinnstillinger.
2. Du ser **Grunnfarger** (lyse, aksent- og mørke toner) og **Semantiske farger** (primær, sekundær, suksess, advarsel og feil).
3. Klikk på en fargeprøve for å åpne fargevelgeren. Dra i velgeren eller skriv inn en hex-verdi for å velge farge.
4. **Forhåndsvisning av fargekombinasjoner** viser hvordan de valgte fargene fungerer sammen.
5. Bruk **Foreslåtte paletter** for raskt å ta i bruk et ferdig fargevalg.
6. Klikk på **Lagre** når du er fornøyd.

## Typografi

1. Klikk på **Typografiinnstillinger** i panelet Stilinnstillinger.
2. Klikk på **Velg en skrifttype** for å åpne skriftleseren. Du kan søke etter navn eller bla gjennom kategorier som Serif, Sans Serif, Display, Håndskrift og Monospace.
3. Velg skrifttyper både for overskrifter og brødtekst.
4. Klikk på **Typografiskala** for å justere størrelseshierarkiet fra overskrift 1 til overskrift 4. Bruk skaleringsfaktoren og grunnstørrelsen til å finjustere.
5. Klikk på **Lagre** for å ta i bruk skriftvalgene.

## Avstander

1. Klikk på **Avstandsskala** i panelet Stilinnstillinger.
2. Juster avstandsverdiene fra ekstra liten til ekstra stor. Praktiske eksempler viser hvordan hver verdi påvirker oppsettet.
3. Klikk på **Lagre avstander** for å bruke verdiene på hele nettstedet.

## Logo og profilering

1. Klikk på **Logo** i panelet Stilinnstillinger.
2. Last opp **Logo for lys bakgrunn** og **Logo for mørk bakgrunn**. Bruk bilder med gjennomsiktig bakgrunn og sideforhold 4:1 for best resultat.
3. Last opp et **Bilde for sosiale medier** til lenkeforhåndsvisninger og et **Favikon** til ikonet i nettleserfanen.

:::tip
For best resultat bør du bruke en logo med gjennomsiktig bakgrunn i PNG-format. Da ser den bra ut både på lys og mørk bakgrunn, på nettstedet og i [mobilappen](../settings/mobile-app.md).
:::

## Navigasjonsstiler

Tilpass fargene i nettstedets navigasjonslinje, både for solid og gjennomsiktig modus:

1. Bla til delen **Navigasjonsstiler**
2. Klikk på **Rediger navigasjonsstiler**
3. Angi farger for solid navigasjon (med bakgrunn) og gjennomsiktig navigasjon (overlegg)
4. Klikk på **Lagre** for å ta i bruk navigasjonsfargene

Du finner en detaljert veiledning under [Navigasjonsstiler](./navigation-styles.md).

## Kunngjøring og widgeter

Nettstedswidgeter vises på hver side og svever over sideinnholdet:

- **Kunngjøringsbanner** -- En stripe øverst på nettstedet som kan lukkes, til tidsbegrensede meldinger, for eksempel et kommende arrangement eller en endring i gudstjenesten.
- **Hurtigmeny** -- En flytende knapp som åpner en meny med snarveier, for eksempel lenker til gaver, innsjekking eller søndagsbladet.

1. Klikk på **Kunngjøring og widgeter** i panelet Stilinnstillinger.
2. Slå på widgetene du vil bruke, og angi tekst, lenker og farger.
3. Klikk på **Lagre**.

## Omdirigeringer og statistikk

Panelet **Omdirigeringer og statistikk** i Stilinnstillinger inneholder to urelaterte, men ofte nødvendige innstillinger:

- **Statistikk** -- Legg inn **målings-ID-en for Google Analytics 4** for å følge med på besøkstrafikken på nettstedet.
- **Omdirigeringer** -- Koble en gammel URL-bane til en ny, slik at lenker til en side du har flyttet eller gitt nytt navn fortsetter å fungere i stedet for å gi 404-feil. Skriv inn den gamle banen under **Fra** og den nye under **Til**, og klikk på **Lagre**. En omdirigering har også forrang over B1s innebygde sider (`/sermons`, `/stream`, `/donate`, `/bible` og `/votd`), slik at du kan sende den adressen et annet sted (for eksempel til din egen prekenside eller en YouTube-kanal). Den overstyrer ikke en side du har bygget selv på samme adresse. Slett den siden først hvis du vil at omdirigeringen skal gjelde.

## Egendefinert CSS og JavaScript

1. Klikk på **CSS og Javascript** i panelet Stilinnstillinger.
2. Legg til **Egendefinert CSS** for å overstyre standardstilene ved avansert tilpasning.
3. Legg til **Egendefinert HTML** for sporingskoder eller andre skript.
4. Bruk delen **Vanlige Javascript-eksempler** for kodebiter, for eksempel integrasjon med Google Analytics.

:::warning
Egendefinert CSS er kraftig, men kan ødelegge oppsettet på nettstedet hvis det brukes feil. De fleste kirker kan få det utseendet de ønsker med de innebygde kontrollene for farger, skrifttyper og avstander. Bruk bare egendefinert CSS hvis du er komfortabel med webutvikling.
:::

:::info
Nettstedet ditt bruker en Content Security Policy som blokkerer innebygde skript fra alle andre kilder. Feltet **Egendefinert JavaScript** er det eneste betrodde unntaket -- kode du lagrer der kjøres som den er, så lim bare inn skript fra kilder du stoler på (analysekoder, chatwidgeter og lignende innbygginger).
:::

## Stiltemaer

Hvis du vil ha et raskt utgangspunkt, finner du ferdiglagde temaer under **Foreslåtte paletter** i fargepaletten. De setter koordinerte farger med ett klikk. Du kan alltid finjustere enkeltinnstillinger etter at du har tatt i bruk et tema.

## Neste steg

- [Administrere sider](managing-pages) -- Bygg og organiser sidene på nettstedet
- [Filer](files) -- Last opp mediefiler til nettstedet
