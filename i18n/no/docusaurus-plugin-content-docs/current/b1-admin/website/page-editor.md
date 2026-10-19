---
title: "Bruke sideredigeringsprogrammet"
---

# Bruke sideredigeringsprogrammet

<div class="article-intro">

Sideredigeringsprogrammet i B1 er et visuelt bygg-verktøy med dra-og-slipp som lar deg designe sidene på kirkens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet og angre endringer -- alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Første oppsett](initial-setup) for å få nettstedet ditt konfigurert
- Opprett minst én side i [Administrere sider](managing-pages)
- Du trenger tillatelsen **content.edit** for å åpne redigeringsprogrammet

</div>

## Åpne redigeringsprogrammet

1. I B1 Admin åpner du [hoppmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettsted** og klikker **Sider**.
2. Finn siden du vil redigere i tabellen over sider og klikk **Rediger innhold**.

Redigeringsprogrammet åpnes i fullskjermmodus. Venstre panel viser sidestrukturen din og tilgjengelige innholdselementer; midtområdet viser en direkte forhåndsvisning av siden.

:::info
Redigeringsprogrammet vises alltid i lys modus, uavhengig av temainnstillingen i B1 Admin, og bruker overskrifts- og brødteksttypografien du valgte i [Utseende](appearance). Dette sikrer at forhåndsvisningen samsvarer nøyaktig med hvordan siden vil se ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer

Hver side bygges opp av to nivåer:

- **Seksjoner** -- De øverste beholderne som deler opp siden i horisontale bånd (for eksempel en heltebanner-seksjon, et innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk **Legg til seksjon** (eller **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **Fra mal** -- bla i malgalleriet for seksjoner, ordnet etter kategori (Heltebanner, Om oss, Tjenester, Givertjeneste osv.), og klikk på en for å sette den inn som en ferdig stilt, forhåndsutfylt seksjon. Du kan tilpasse alt etterpå.
   - **Tom seksjon** -- velg en kolonneoppsett (én kolonne, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, innvendig marg og andre stilvalg.

### Bytte oppsett for en seksjon

Har du allerede bygget en seksjon, men vil ha en annen struktur? Bruk oppsettsvelgeren på seksjonen for å bytte kolonneoppsettet til et annet fra galleriet, mens det eksisterende innholdet og elementene beholdes.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller lenk til et foto
   - **Knapp** -- En klikkbar lenke med oppfordring til handling
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Bygg inn et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** -- Vis en arrangementskalender
   - **Ofte stilte spørsmål** -- Spørsmål og svar i form av trekkspill
   - **Video** -- Bygg inn en video via URL
   - **Gruppeoversikt** -- En filtrerbar katalog over alle kirkens grupper, med valgfritt søk, kategorifilter og etikettfilter
   - **Ikonfunksjon** -- Et ikon med tittel og kort beskrivelse, for fremheving av funksjoner eller tjenester
   - **Galleri** -- Et rutenett eller en murlayout med flere bilder
   - **Vitnesbyrd** -- Ett eller flere sitater med navn, rolle og bilde på forfatteren
   - **Sosiale ikoner** -- Lenkede ikoner til kirkens profiler i sosiale medier
   - **Nedtelling** -- En timer som teller ned til en dato eller en ukentlig gudstjenestetid
   - **Statistikk** -- En rad med store tall og etiketter (medlemmer, år, campuser)
   - **Kampanjefremdrift** -- En levende fremdriftsindikator for en givekampanje, som viser totalt innsamlet beløp mot et fondmål
   - **Stabsrutenett** -- Bildekort for medlemmene i en gruppe; gruppen må ha alternativet **offentlig liste** slått på
   - **Gudstjenestetider** -- Campusenes gudstjenesteplan, hentet automatisk fra oppsettet for oppmøte
   - **Preker** -- Preke-biblioteket ditt, som en full nettleser eller som rutenett, liste eller fremhevet nyeste-layout
   - **Kart** -- Et innbygd kart sentrert på kirkens adresse
   - **Tabell** -- Et enkelt rutenett med rader og kolonner for tabellinnhold
   - **Tekst med bilde** -- Tekst og et bilde side om side
   - **Logo** -- Kirkens logo, hentet fra [Utseende](appearance)
   - **Direktesending** -- Spilleren for direktesendingen din, bygget direkte inn på siden
   - **Podcast** -- En liste over episoder hentet fra en ekstern podcast-RSS-feed-URL du oppgir, med innstillinger for hvor mange episoder som vises og om datoer og beskrivelser skal vises. Dette er for å fremheve en hvilken som helst podcast-feed på nettstedet ditt; for å publisere dine egne preker som podcast, se [Administrere preker](../sermons/managing-sermons.md#your-podcast-feed) i stedet.
   - **Gave** -- En givenknapp eller et innebygd gaveskjema
   - **HTML** -- Din egen rå HTML, for avanserte bruksområder som å bygge inn en tredjepartswidget (se [Bruke HTML-elementet](#using-the-html-element))
   - **iFrame** -- Bygg inn eksternt innhold via URL
3. Konfigurer elementet med innstillingspanelet som vises.

### Bruke HTML-elementet {#using-the-html-element}

**HTML**-elementet har to bokser:

- **HTML-innhold** -- Markupen som skal vises på siden. Eventuelle `<script>`-tagger du legger inn her, kjøres på det direkte nettstedet ditt.
- **JavaScript (uten script-taggen)** -- Skriptkode som kjøres når siden lastes. Du kan også lime inn en leverandørs innbyggingskode her med `<script>`-taggene inkludert, og den kjøres på det direkte nettstedet.

Hvis du limer inn bare en nettadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«Dette er en nettadresse, ikke JavaScript.»* En nakenadresse i den boksen gjør ingenting. For å vise et bilde bruker du et **Bilde**-element, eller legger `<img src="...">` i **HTML-innhold**.

### Bruke kalenderelementet {#using-the-calendar-element}

**Kalender**-elementet viser arrangementer fra en av kalenderne dine:

1. Under **Velg** velger du **Gruppekalender** (arrangementene til én gruppe -- listen viser grupper du er medlem av) eller **Kuratert kalender** (en kalender du har laget under **Kalendere**; se [Kuratert kalender](../calendars/curated-calendar)).
2. Under **Velg kalender** velger du gruppen eller kalenderen.
3. Under **Visning** velger du hvordan den skal vises:
   - **Månedskalender** -- Et månedsrutenett som besøkende kan bla gjennom.
   - **Kommende arrangementer** -- Et rutenett med fliser for de neste 12 kommende arrangementene, der et gjentakende arrangement vises én gang på sin neste dato. Hver flis viser arrangementets bilde (eller tittelen på temaets mørke farge når det ikke har bilde), en datomerkelapp, dag og klokkeslett, og første linje i beskrivelsen. En **Abonner**-knapp over flisene lar besøkende kopiere kalenderens ICS-lenke eller laste den ned.
4. For å vise bare noen arrangementer skriver du en merkelapp i **Bare arrangementer med merkelappen** -- for eksempel `ungdom`. Bare arrangementer der **Merkelapper** inneholder det ordet vises. La feltet stå tomt for å vise alle arrangementer. Merkelapper settes på hvert arrangement; se [Legge til og redigere arrangementer](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på et arrangement sin egen side på nettstedet ditt. Arrangementssiden viser arrangementets bilde, tittel, dato og klokkeslett og beskrivelse, samt en boks med **Når** (inkludert gjentakelsesmønsteret for et gjentakende arrangement) og **Hvor** (rommene som er booket for det). Den har også en knapp **Meld deg på dette arrangementet** når påmelding er slått på, og en lenke **Legg til i min kalender** som laster ned arrangementet som en kalenderfil. Siden er satt opp slik at søkemotorer kan vise arrangementets dato og detaljer i resultatene.

### Endre rekkefølge på innhold

Dra seksjoner eller elementer ved hjelp av håndtaket (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Stile siden din

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** -- Ensfarget, overgang eller bilde. Når du bruker et bildebakgrunn, lar en **Fokuspunkt**-velger deg klikke for å angi hvilken del av bildet som forblir sentrert når seksjonen skaleres, og et alternativ for **Overlegg** lar deg legge en halvtransparent farge over bildet for å gjøre teksten lettere å lese.
- **Innvendig marg** -- Avstand over og under innholdet i seksjonen
- **Bredde** -- Full bredde eller sentrert/begrenset
- **Skillelinjer** -- Dekorative figurskillere (bølge, skrå, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med farge, høyde og speilingsvalg

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige valg inkluderer skriftstørrelse, farge, justering, ytre marg og indre marg. For bilder kan du angi alternativ tekst og lenkemål.

### Egendefinert CSS

For avansert styling har hver seksjon og hvert element et felt for **Egendefinert CSS** der du kan skrive dine egne CSS-regler. Disse er avgrenset til det elementet, slik at de ikke utilsiktet påvirker resten av siden.

:::tip
Hvis du trenger å bruke stiler på hele nettstedet -- for eksempel en egen skrift eller global farge -- bruk innstillingene under [Utseende](appearance) i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å se hvordan siden ser ut på ulike skjermstørrelser:

- **Skrivebord** -- Visning i full nettleserbredde
- **Mobil** -- Smal visning i telefonstørrelse

For å se den direkte siden nøyaktig slik besøkende ser den, gå tilbake til listen over sider og klikk på sidens sti. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet

Klikk på **Tilgjengelighet**-ikonet i verktøylinjen for å kjøre en rask sjekk for vanlige problemer -- bilder uten alternativ tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som må fikses, slik at du kan rette det på stedet.

## Angre endringer

Redigeringsprogrammet holder automatisk styr på redigeringshistorikken din. Bruk verktøylinjeknappene eller tastatursnarveiene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Reverser din siste handling
- **Gjør om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Bruk en angret handling på nytt

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk **Vis historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på et av dem for å gjenopprette til det tidspunktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter det nåværende sideinnholdet med øyeblikksbilde-versjonen. Dette kan ikke angres med den vanlige angre-knappen. Lagre et øyeblikksbilde av den nåværende tilstanden før du gjenoppretter et gammelt, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publiseringsstatus

Sider kan ha en **publisert**-status, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke med gjeldende tilstand:

- **Direkte ved lagring** -- Siden bruker ikke en publiseringsflyt. Hver lagret endring går direkte live. Dette er standard for nye sider.
- **Upubliserte endringer** -- Siden har vært publisert før, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den sist publiserte versjonen.
- **Publisert** -- Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine klikker du **Publiser**-knappen i verktøylinjen. Siden blir live umiddelbart.

For å gå tilbake til sist publiserte versjon uten å påvirke det besøkende ser, åpner du overløpsmenyen (⋮) og klikker **Forkast upubliserte endringer**.

For å slutte å bruke publiseringsflyten, åpner du overløpsmenyen og klikker **Slå av publisering**. Redigeringer går da direkte live igjen.

:::tip
Bruk utkast-/publiseringsflyten når du vil forberede en side -- for eksempel til et kommende arrangement -- og bare gjøre den live i riktig øyeblikk. Bygg og forhåndsvis siden, og klikk deretter Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](managing-pages) -- Opprett sider, angi nettadresser og administrer navigasjon på nettstedet
- [Utseende](appearance) -- Angi farger, skrifter og profil for hele nettstedet
- [Filer](files) -- Last opp bilder og dokumenter du vil bruke i redigeringsprogrammet
- [Opprette skjemaer](../forms/creating-forms) -- Bygg skjemaer du kan bygge inn på sider
