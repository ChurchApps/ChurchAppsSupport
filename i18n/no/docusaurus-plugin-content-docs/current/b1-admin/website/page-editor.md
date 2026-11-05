---
title: "Bruke sideredigereringsverktøyet"
---

# Bruke sideredigereringsverktøyet

<div class="article-intro">

Sideredigereringsverktøyet i B1 er en visuell byggeverktøy med dra-og-slipp som lar deg designe sidene på menighetens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer -- alt fra nettleseren din.

</div>

## Opplæringsvideo

<YouTube id="m2B_JxmfFm4" title="Editing Pages and Navigation in B1" next="Connecting a Custom Domain in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Initial Setup](initial-setup) for å sette opp nettstedet ditt
- Opprett minst én side i [Managing Pages](managing-pages)
- Du trenger tillatelsen **content.edit** for å åpne editoren

</div>

## Åpne editoren

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Website** og klikker på **Pages**.
2. Finn siden du vil redigere i tabellen Pages, og klikk på **Edit Content**.

Editoren åpnes i fullskjermmodus. Venstre panel viser sidens struktur og tilgjengelige innholdselementer. Midtområdet viser en levende forhåndsvisning av siden.

:::info
Editoren vises alltid i lys modus, uavhengig av temainnstillingen i B1 Admin. Den bruker overskrifts- og brødteksttypografien du valgte i [Appearance](appearance). Dermed stemmer forhåndsvisningen med hvordan siden vil se ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer

Hver side bygges opp av to nivåer:

- **Seksjoner** -- De øverste beholderne som deler siden inn i horisontale bånd (for eksempel en heltebolk, en innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk på **Add Section** (eller på **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **From a template** -- Bla i malgalleriet for seksjoner, ordnet etter kategori (Hero, About, Services, Giving osv.), og klikk på én for å sette den inn som en ferdigstilt, forhåndsutfylt seksjon. Du kan tilpasse alt etterpå.
   - **Blank section** -- Velg et kolonneoppsett (enkel, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, padding og andre stilalternativer.

### Bytte oppsett for en seksjon

Har du allerede bygget en seksjon, men vil ha en annen struktur? Bruk layoutbryteren på seksjonen for å bytte kolonneoppsettet til et annet fra galleriet. Det eksisterende innholdet og elementene beholdes på plass.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk på **Add Content** og velg en elementtype fra listen:
   - **Text** -- Overskrifter, avsnitt og rik tekst
   - **Image** -- Last opp eller lenk til et bilde
   - **Button** -- En klikkbar lenke til handling
   - **Card** -- Et bilde med tittel og beskrivelse
   - **Form** -- Bygg inn et [skjema](../forms/creating-forms) direkte på siden. Hvis skjemaet har et [overskriftsbilde](../forms/creating-forms.md#adding-a-header-photo), vises det over spørsmålene
   - **Calendar** -- Vis en arrangementskalender
   - **FAQ** -- Spørsmål og svar i form av trekkspill
   - **Video** -- Bygg inn en video ved hjelp av URL
   - **Groups Browser** -- En filtrerbar katalog over alle menighetens grupper, med valgfritt søk, kategorifilter og etikettfilter
   - **Icon Feature** -- Et ikon med tittel og kort beskrivelse, for å fremheve funksjoner eller tjenester
   - **Gallery** -- Et rutenett med flere bilder eller et murverksoppsett (masonry)
   - **Testimonial** -- Ett eller flere sitater med navn, rolle og bilde til avsenderen
   - **Social Icons** -- Lenkede ikoner for menighetens profiler i sosiale medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo og Podcast. Fyll inn en lenke for hver du vil vise. For **WhatsApp** bruker du en `https://wa.me/`-lenke med nummeret ditt, eller en lenke til en gruppeinvitasjon
   - **Countdown** -- En nedtelling til en dato eller et ukentlig gudstjenestetidspunkt
   - **Stats** -- En rad med store tall og etiketter (medlemmer, år, campuser)
   - **Campaign Progress** -- En levende fremdriftslinje for en giveinnsamling, som viser hvor mye som er samlet inn mot målet for et fond
   - **Staff Grid** -- Kort med bilder for medlemmene i en gruppe. Gruppen må ha alternativet **public roster** slått på
   - **Service Times** -- Gudstjenesteplanen for campusene dine, hentet automatisk fra oppsettet for oppmøte
   - **Sermons** -- Sermonbiblioteket ditt, som en fullstendig nettleser eller i et rutenett, en liste eller et layout med fremhevet nyeste
   - **Map** -- Et innebygd kart sentrert på menighetens adresse
   - **Table** -- Et enkelt rutenett med rader og kolonner for tabelldata
   - **Text with Photo** -- Tekst og et bilde side om side
   - **Logo** -- Menighetens logo, hentet fra [Appearance](appearance)
   - **Live Stream** -- Live-streamingspilleren din, bygget direkte inn på siden
   - **Podcast** -- En liste over episoder hentet fra en ekstern podcast-RSS-feed-URL du oppgir, med innstillinger for hvor mange episoder som skal vises, og om datoer og beskrivelser skal vises. Hver episode på den publiserte siden har en lydspiller og en lenke **Download** som lagrer episodens lydfil under episodetittelen. Dette er for å vise frem en hvilken som helst podcast-feed på nettstedet ditt. Hvis du vil publisere dine egne prekener som podcast, se i stedet [Administrere sermoner](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- En giveknapp eller et innebygd giveskjema
   - **HTML** -- Din egen rå HTML, til avanserte bruksområder som å bygge inn en widget fra tredjepart (se [Bruke HTML-elementet](#using-the-html-element))
   - **iFrame** -- Bygg inn eksternt innhold ved hjelp av URL
3. Konfigurer elementet med innstillingspanelet som vises.

### Bruke HTML-elementet {#using-the-html-element}

HTML-elementet har to bokser:

- **HTML Content** -- Markupen som skal vises på siden. Eventuelle `<script>`-tagger du legger inn her, kjøres på det publiserte nettstedet ditt.
- **JavaScript (exclude script tag)** -- Skriptkode som kjøres når siden lastes. Du kan også lime inn en innbyggingskodebit fra en leverandør her, med `<script>`-taggene inkludert, så kjøres den på det publiserte nettstedet.

Hvis du bare limer inn en nettadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«This is a web address, not JavaScript.»* En nettadresse alene i den boksen gjør ingenting. For å vise et bilde bruker du et **Image**-element, eller legger `<img src="...">` i **HTML Content**.

### Bruke Calendar-elementet {#using-the-calendar-element}

Calendar-elementet viser arrangementer fra en av kalenderne dine:

1. Under **Select** velger du **Group Calendar** (arrangementene til én gruppe -- listen viser grupper du er med i) eller **Curated Calendar** (en kalender du har laget under **Calendars**. Se [Curated Calendar](../calendars/curated-calendar)).
2. Under **Select Calendar** velger du gruppen eller kalenderen.
3. Under **Display** velger du hvordan den skal vises:
   - **Month calendar** -- Et månedsrutenett som besøkende kan bla gjennom.
   - **Upcoming events** -- Et rutenett med fliser for de neste 12 arrangementene. Et gjentakende arrangement vises én gang, på neste dato. Hver flis viser arrangementets bilde (eller tittelen på temaets mørke farge hvis det ikke har et bilde), en datomerkelapp, dag og klokkeslett, og første linje i beskrivelsen. En knapp **Subscribe** over flisene lar besøkende kopiere kalenderens ICS-lenke eller laste den ned. For denne visningen vises en innstilling **Layout**: **Grid** (standard) eller **Scrolling (automatic)**, som setter flisene i én rad som ruller seg videre av seg selv.
4. For å vise bare noen av arrangementene skriver du inn en etikett i **Only events tagged**, for eksempel `youth`. Bare arrangementer der **Tags** inneholder det ordet, vises. La feltet stå tomt for å vise alle arrangementer. Etiketter settes på hvert arrangement. Se [Legge til og redigere arrangementer](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på et arrangement en egen side på nettstedet ditt. Arrangementssiden viser bildet, tittelen, dato og klokkeslett og beskrivelsen. Den har også en boks med **When** (inkludert gjentakelsesmønsteret for et gjentakende arrangement) og **Where** (rommene som er booket til det). Der finnes også en knapp **Register for this Event** når påmelding er slått på, og en lenke **Add to my calendar** som laster ned arrangementet som en kalenderfil. Siden er laget slik at søkemotorer kan vise arrangementets dato og detaljer i resultatene. Arrangementssider fra egendefinerte kalendere som vises på sidene dine (for arrangementer de neste seks månedene), står også i nettstedkartet, slik at søkemotorer kan finne dem.

### Endre rekkefølgen på innhold

Dra seksjoner eller elementer med håndtaket (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon, eller flytte dem mellom seksjoner.

## Style siden din

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Her kan du angi:

- **Background** -- Ensfarget, en overgang (gradient) eller et bilde. Når du bruker et bilde som bakgrunn, lar en velger for **Focal Point** deg klikke for å bestemme hvilken del av bildet som forblir sentrert når seksjonen skaleres. Alternativet **Overlay** lar deg legge en semitransparent fargetone over bildet, slik at teksten blir lettere å lese.
- **Padding** -- Avstand over og under innholdet i seksjonen
- **Width** -- Full bredde, eller sentrert/begrenset bredde
- **Dividers** -- Dekorative formskillere (bølge, skrå kant, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med farge, høyde og speilvending

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige valg er skriftstørrelse, farge, justering, margin og padding. For bilder kan du angi alternativ tekst og lenkemål.

### Egendefinert CSS

For avansert styling har hver seksjon og hvert element et felt **Custom CSS**, der du kan skrive egne CSS-regler. Disse er avgrenset til det elementet, så de påvirker ikke resten av siden utilsiktet.

:::tip
Hvis du vil bruke stiler på hele nettstedet -- for eksempel en egendefinert skrifttype eller en global farge -- bruker du innstillingene under [Appearance](appearance), og ikke egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å se hvordan siden ser ut i ulike skjermstørrelser:

- **Desktop** -- Visning i full nettleserbredde
- **Mobile** -- Smal visning i telefonstørrelse

På telefoner stables kolonnene i en rad oppå hverandre i full bredde, med mindre du angir en **Mobile Width** for dem i radinnstillingene. Lister med prekener og podcast-episoder stabler også teksten for hver episode under miniatyrbildet på telefoner.

For å se den publiserte siden slik besøkende ser den, går du tilbake til listen Pages og klikker på sidens sti. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet

Klikk på ikonet **Accessibility** i verktøylinjen for å kjøre en rask sjekk for vanlige problemer -- bilder uten alternativ tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som må fikses, slik at du kan rette det på stedet.

## Angre endringer

Editoren holder automatisk styr på endringshistorikken din. Bruk verktøylinjeknappene eller hurtigtastene for å navigere:

- **Undo** (Ctrl+Z / Cmd+Z) -- Tilbakestill siste handling
- **Redo** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Gjenta en handling du har angret

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk på **View history** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser. Klikk på et av dem for å gå tilbake til det punktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter det nåværende sideinnholdet med øyeblikksbildets versjon. Dette kan ikke angres med den vanlige angreknappen. Lagre et øyeblikksbilde av den nåværende tilstanden før du gjenoppretter et gammelt, hvis du vil ha muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du jobber. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast og publisert tilstand

Sider kan ha en **published**-tilstand, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke med gjeldende tilstand:

- **Live on save** -- Siden bruker ikke en publiseringsarbeidsflyt. Hver lagrede endring blir synlig med en gang. Dette er standard for nye sider.
- **Unpublished changes** -- Siden har vært publisert før, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den sist publiserte versjonen.
- **Published** -- Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene klikker du på knappen **Publish** i verktøylinjen. Siden blir live med en gang.

For å gå tilbake til den sist publiserte versjonen uten å påvirke det besøkende ser, åpner du overløpsmenyen (⋮) og klikker på **Discard unpublished changes**.

For å slutte å bruke publiseringsarbeidsflyten, åpner du overløpsmenyen og klikker på **Turn off publishing**. Redigeringer blir da synlige med en gang igjen.

:::tip
Bruk arbeidsflyten for utkast og publisering når du vil forberede en side, for eksempel til et kommende arrangement, og bare gjøre den synlig i rett øyeblikk. Bygg og forhåndsvis siden, og klikk på Publish når du er klar.
:::

## Relaterte artikler

- [Managing Pages](managing-pages) -- opprett sider, angi nettadresser og administrer navigasjonen på nettstedet
- [Appearance](appearance) -- angi farger, skrifttyper og merkevare for hele nettstedet
- [Files](files) -- last opp bilder og dokumenter til bruk i editoren
- [Creating Forms](../forms/creating-forms) -- bygg skjemaer du kan bygge inn på sider
