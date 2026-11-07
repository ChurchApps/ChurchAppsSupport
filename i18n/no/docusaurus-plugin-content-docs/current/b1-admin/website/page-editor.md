---
title: "Bruke sideditoren"
description: "Bruk sideredigereren i B1 Admin: legg til seksjoner og elementer, style dem, forhåndsvis på mobil og publiser utkast. Også angre og versjonshistorikk."
---

# Bruke sideditoren

<div class="article-intro">

Sideditoren i B1 er en visuell byggeverktøy med dra-og-slipp som lar deg designe sidene på kirkens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer -- alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](./initial-setup.md) for å sette opp nettstedet ditt
- Opprett minst én side i [Administrere sider](./managing-pages.md)
- Du trenger tillatelsen **content.edit** for å åpne editoren

</div>

## Åpne editoren

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettsted** og klikker **Sider**.
2. Finn siden du vil redigere i sidetabellen og klikk **Rediger innhold**.

Editoren åpnes i fullskjermmodus. Venstre panel viser sidestrukturen og tilgjengelige innholdselementer; midtområdet viser en direkte forhåndsvisning av siden din.

:::info
Editoren vises alltid i lys modus, uavhengig av temainnstillingen i B1 Admin, og bruker overskrifts- og brødteksttypografien du valgte i [Utseende](./appearance.md). Dette sikrer at forhåndsvisningen stemmer nøyaktig med hvordan siden din vil se ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer

Hver side bygges av to nivåer:

- **Seksjoner** -- De øverste beholderne som deler siden inn i horisontale bånd (for eksempel en hero-seksjon, et innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk **Legg til seksjon** (eller **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **Fra en mal** -- bla i malgalleriet for seksjoner, organisert etter kategori (Hero, Om oss, Tjenester, Giving osv.), og klikk på en for å sette den inn som en ferdigstilt, forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** -- velg et kolonneoppsett (én kolonne, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, innvendig avstand og andre stilalternativer.

### Bytte oppsett for en seksjon

Har du allerede bygget ut en seksjon, men vil ha en annen struktur? Bruk oppsettsvelgeren på seksjonen for å bytte kolonneoppsettet til et annet fra galleriet, mens det eksisterende innholdet og elementene beholdes på plass.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller lenk til et bilde
   - **Knapp** -- En klikkbar lenke med oppfordring til handling
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Legg inn et [skjema](../forms/creating-forms.md) direkte på siden. Hvis skjemaet har et [overskriftsbilde](../forms/creating-forms.md#adding-a-header-photo), vises det over spørsmålene
   - **Kalender** -- Vis en arrangementskalender
   - **Vanlige spørsmål** -- Spørsmål og svar i form av trekkspill
   - **Video** -- Legg inn en video med URL
   - **Gruppeoversikt** -- En søkbar katalog over alle kirkens grupper, med valgfritt søk, kategorifilter og merkelappfilter
   - **Ikonfunksjon** -- Et ikon med tittel og kort beskrivelse, til fremhevede funksjoner eller tjenester
   - **Galleri** -- Et rutenett med flere bilder eller et murlignende oppsett
   - **Vitnesbyrd** -- Ett eller flere sitater med navn, rolle og bilde på forfatteren
   - **Sosiale ikoner** -- Lenkede ikoner til kirkens profiler i sosiale medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo og Podcast. Fyll inn en lenke for hver du vil vise; for **WhatsApp** bruker du en `https://wa.me/`-lenke med nummeret ditt eller en lenke til en gruppeinvitasjon
   - **Nedtelling** -- En timer som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Statistikk** -- En rad med store tall og etiketter (medlemmer, år, kirkesteder)
   - **Kampanjefremdrift** -- En levende fremdriftslinje for en gavekampanje, som viser totalbeløpet som er samlet mot et fondsmål
   - **Personalrutenett** -- Bildekort for medlemmene i en gruppe; gruppen må ha alternativet **offentlig liste** slått på
   - **Gudstjenestetider** -- Gudstjenesteplanen for kirkestedene dine, hentet automatisk fra oppsettet for oppmøte
   - **Prekener** -- Preken-biblioteket ditt, som en full visning eller et rutenett, en liste eller en fremhevet visning av det nyeste
   - **Kart** -- Et innebygd kart sentrert på kirkens adresse
   - **Tabell** -- Et enkelt rutenett med rader og kolonner for tabelldata
   - **Tekst med bilde** -- Tekst og et bilde side om side
   - **Logo** -- Kirkens logo, hentet fra [Utseende](./appearance.md)
   - **Direktesending** -- Spilleren for direktesending, innebygd direkte på siden
   - **Podcast** -- En liste over episoder hentet fra en ekstern podcast-RSS-feed-URL du oppgir, med innstillinger for hvor mange episoder som vises og om datoer og beskrivelser skal vises. Hver episode på den live siden har en lydspiller og en lenke **Last ned** som lagrer episodens lydfil under episodetittelen. Dette er for å fremheve en hvilken som helst podcast-feed på nettstedet ditt; for å publisere dine egne prekener som en podcast, se [Administrere prekener](../sermons/managing-sermons.md#your-podcast-feed) i stedet
   - **Gave** -- En gaveknapp eller et innebygd gaveskjema
   - **HTML** -- Din egen rå HTML, for avanserte bruksområder som å legge inn en tredjepartskomponent (se [Bruke HTML-elementet](#using-the-html-element))
   - **iFrame** -- Legg inn eksternt innhold via URL
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Bruke HTML-elementet {#using-the-html-element}

Elementet **HTML** har to bokser:

- **HTML-innhold** -- Markupen som skal vises på siden. Eventuelle `<script>`-tagger du legger inn her, kjøres på det live nettstedet ditt.
- **JavaScript (uten script-tagg)** -- Skriptkode som kjører når siden lastes. Du kan også lime inn en leverandørs innbyggingskode her med `<script>`-taggene inkludert, og den kjøres på det live nettstedet.

Hvis du limer inn bare en nettadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«Dette er en nettadresse, ikke JavaScript.»* En bar adresse i den boksen gjør ingenting. For å vise et bilde bruker du et **Bilde**-element, eller legger `<img src="...">` i **HTML-innhold**.

### Bruke kalenderelementet {#using-the-calendar-element}

Elementet **Kalender** viser arrangementer fra en av kalenderne dine:

1. Under **Velg** velger du **Gruppekalender** (arrangementene til én gruppe -- listen viser grupper du er medlem av) eller **Utvalgt kalender** (en kalender du har laget under **Kalendere**; se [Utvalgt kalender](../calendars/curated-calendar.md)).
2. Under **Velg kalender** velger du gruppen eller kalenderen.
3. Under **Vis** velger du hvordan den skal vises:
   - **Månedskalender** -- Et månedsrutenett som besøkende kan bla gjennom.
   - **Kommende arrangementer** -- Et rutenett med flis for de neste 12 kommende arrangementene, der et gjentatt arrangement vises én gang på neste dato. Hver flis viser arrangementets bilde (eller tittelen på temaets mørke farge når det ikke har noe bilde), en datobrikke, dag og klokkeslett, og den første linjen i beskrivelsen. En knapp **Abonner** over flisene lar besøkende kopiere kalenderens ICS-lenke eller laste den ned. En innstilling for **Oppsett** vises for denne visningen: **Rutenett** (standard) eller **Rullende (automatisk)**, som legger flisene i én rad som ruller av seg selv.
4. For å vise bare noen arrangementer skriver du en merkelapp i **Bare arrangementer med merkelappen** -- for eksempel `ungdom`. Bare arrangementer der **Merkelapper** inkluderer det ordet vises. La feltet stå tomt for å vise alle arrangementer. Merkelapper settes på hvert arrangement; se [Legge til og redigere arrangementer](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på et arrangement sin egen side på nettstedet ditt. Arrangementssiden viser arrangementets bilde, tittel, dato og klokkeslett, og beskrivelsen, pluss en boks med **Når** (inkludert gjentakelsesmønsteret for et gjentatt arrangement) og **Hvor** (rommene som er reservert for det). Den har også en knapp **Meld deg på dette arrangementet** når påmelding er slått på, og en lenke **Legg til i min kalender** som laster ned arrangementet som en kalenderfil. Siden er satt opp slik at søkemotorer kan vise arrangementets dato og detaljer i resultatene. Arrangementssider fra utvalgte kalendere som vises på sidene dine (for arrangementer de neste seks månedene) står også i nettstedskartet ditt, slik at søkemotorer kan finne dem.

### Endre rekkefølgen på innhold

Dra seksjoner eller elementer ved hjelp av håndtaksikonet (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Style siden din

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** -- Ensfarget, gradient eller bilde. Når du bruker et bildebakgrunn, lar en velger for **Fokuspunkt** deg klikke for å angi hvilken del av bildet som forblir sentrert når seksjonen skaleres, og et alternativ for **Overlegg** lar deg legge et halvtransparent fargetoning over bildet for å bedre lesbarheten på teksten.
- **Innvendig avstand** -- Avstand øverst og nederst inne i seksjonen
- **Bredde** -- Full bredde eller sentrert/begrenset
- **Skillelinjer** -- Dekorative formskiller (bølge, skråstilt, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med alternativer for farge, høyde og speiling

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige alternativer inkluderer skriftstørrelse, farge, justering, marg og innvendig avstand. For bilder kan du angi alternativ tekst og lenkemål.

### Egendefinert CSS

For avansert styling har hver seksjon og hvert element et felt for **Egendefinert CSS** der du kan skrive dine egne CSS-regler. Disse er avgrenset til det elementet, så de påvirker ikke resten av siden utilsiktet.

:::tip
Hvis du trenger å bruke stiler på hele nettstedet -- for eksempel en egendefinert skrifttype eller en global farge -- bruk innstillingene for [Utseende](./appearance.md) i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å sjekke hvordan siden din ser ut på ulike skjermstørrelser:

- **Desktop** -- Visning i full nettleserbredde
- **Mobil** -- Smal visning i telefonstørrelse

På telefoner stables kolonnene i en rad oppå hverandre i full bredde, med mindre du angir en **mobilbredde** for dem i radens innstillinger. Lister med prekener og podcaster stabler også teksten for hver episode under miniatyrbildet på telefoner.

For å se den live siden nøyaktig slik besøkende vil se den, gå tilbake til listen over sider og klikk sidens sti. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet

Klikk på **tilgjengelighetsikonet** i verktøylinjen for å kjøre en rask sjekk for vanlige problemer -- bilder uten alternativ tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som trenger oppmerksomhet, slik at du kan fikse det på stedet.

## Angre endringer

Editoren holder automatisk styr på redigeringshistorikken din. Bruk knappene i verktøylinjen eller hurtigtastene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Tilbakefør den siste handlingen din
- **Gjør om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Bruk en angret handling på nytt

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk **Vis historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på et av dem for å gå tilbake til det punktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter det nåværende innholdet på siden med øyeblikksbildets versjon. Dette kan ikke angres med den vanlige angre-knappen. Lagre et øyeblikksbilde av den nåværende tilstanden før du gjenoppretter et gammelt, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publisert-status

Sider kan ha en **publisert**-status, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke med gjeldende tilstand:

- **Live ved lagring** -- Siden bruker ikke en publiseringsarbeidsflyt. Hver lagret endring går live med en gang. Dette er standard for nye sider.
- **Upubliserte endringer** -- Siden har vært publisert før, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den tidligere publiserte versjonen.
- **Publisert** -- Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine klikker du knappen **Publiser** i verktøylinjen. Siden blir live med en gang.

For å gå tilbake til den sist publiserte versjonen uten å påvirke det besøkende ser, åpner du overløpsmenyen (⋮) og klikker **Forkast upubliserte endringer**.

For å slutte å bruke publiseringsarbeidsflyten, åpner du overløpsmenyen og klikker **Slå av publisering**. Redigeringer går da live med en gang igjen.

:::tip
Bruk arbeidsflyten for utkast og publisering når du vil forberede en side -- for eksempel til et kommende arrangement -- og bare gjøre den live på riktig tidspunkt. Bygg og forhåndsvis siden, og klikk deretter Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](./managing-pages.md) -- Opprett sider, angi nettadresser og administrer navigasjonen på nettstedet
- [Utseende](./appearance.md) -- Angi farger, skrifttyper og profil for hele nettstedet
- [Filer](./files.md) -- Last opp bilder og dokumenter du kan bruke i editoren
- [Opprette skjemaer](../forms/creating-forms.md) -- Bygg skjemaer du kan legge inn på sider
