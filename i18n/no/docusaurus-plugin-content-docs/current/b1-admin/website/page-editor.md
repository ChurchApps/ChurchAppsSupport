---
title: "Bruke sideredigeringsverktøyet"
---

# Bruke sideredigeringsverktøyet

<div class="article-intro">

Sideredigeringsverktøyet i B1 er en visuell byggeverktøy med dra-og-slipp, som lar deg utforme sidene på menighetens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer -- alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Første oppsett](initial-setup) for å sette opp nettstedet ditt
- Lag minst én side i [Administrere sider](managing-pages)
- Du trenger tillatelsen **content.edit** for å åpne redigeringsverktøyet

</div>

## Åpne redigeringsverktøyet

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettsted** og klikker på **Sider**.
2. Finn siden du vil redigere i tabellen Sider, og klikk på **Rediger innhold**.

Redigeringsverktøyet åpnes i fullskjermmodus. Venstre panel viser sidestrukturen din og tilgjengelige innholdselementer; midtområdet viser en levende forhåndsvisning av siden.

:::info
Redigeringsverktøyet vises alltid i lys modus, uavhengig av temainnstillingen i B1 Admin, og bruker overskrifts- og brødtekstskriftene du valgte i [Utseende](appearance). Dette sørger for at forhåndsvisningen samsvarer nøyaktig med hvordan siden din ser ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer

Hver side er bygget opp av to nivåer:

- **Seksjoner** -- De øverste beholderne som deler siden inn i horisontale bånd (for eksempel en hero-seksjon, en innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk på **Legg til seksjon** (eller på **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **Fra en mal** — bla i malgalleriet for seksjoner, organisert etter kategori (Hero, Om oss, Gudstjenester, Gaver osv.), og klikk på en for å sette den inn som en ferdig stilt og forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** — velg en kolonneoppsett (én kolonne, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, utfylling og andre stilalternativer.

### Bytte oppsett for en seksjon

Har du allerede bygd en seksjon, men vil ha en annen struktur? Bruk oppsettsbyttet på seksjonen for å bytte kolonnearrangementet til et annet fra galleriet, mens du beholder det eksisterende innholdet og elementene på plass.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk på **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller lenk til et bilde
   - **Knapp** -- En klikkbar handlingslenke
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Legg inn et [skjema](../forms/creating-forms) direkte på siden. Hvis skjemaet har et [overskriftsbilde](../forms/creating-forms.md#adding-a-header-photo), vises det over spørsmålene
   - **Kalender** -- Vis en hendelseskalender
   - **Ofte stilte spørsmål** -- Spørsmål og svar i form av trekkspill
   - **Video** -- Legg inn en video med URL
   - **Gruppebla** -- En filtrerbar katalog over alle menighetens grupper, med valgfritt søk, kategorifilter og etikettfilter
   - **Ikonfunksjon** -- Et ikon med tittel og kort beskrivelse, for fremheving av funksjoner eller tjenester
   - **Galleri** -- Et rutenett med flere bilder eller en murstein-layout
   - **Vitnesbyrd** -- Ett eller flere sitater med forfatterens navn, rolle og bilde
   - **Sosiale ikoner** -- Lenkede ikoner for menighetens profiler på sosiale medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo og Podcast. Fyll inn en lenke for hvert av dem du vil vise; for **WhatsApp** bruker du en `https://wa.me/`-lenke med nummeret ditt eller en invitasjonslenke til en gruppe
   - **Nedtelling** -- En tidtaker som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Statistikk** -- En rad med store tall og etiketter (medlemmer, år, campuser)
   - **Fremdrift i kampanje** -- En levende fremdriftslinje for en gavekampanje, som viser totalt innsamlet beløp mot et fondsmål
   - **Personalrutenett** -- Bildekort for medlemmene i en gruppe; gruppen må ha alternativet **offentlig liste** slått på
   - **Gudstjenestetider** -- Gudstjenesteplanen for campusene dine, hentet automatisk fra oppsettet for oppmøte
   - **Prekener** -- Ditt preken-arkiv, som en full nettleser eller et rutenett, en liste eller en fremhevet layout for siste
   - **Kart** -- Et innebygd kart sentrert på menighetens adresse
   - **Tabell** -- Et enkelt rutenett med rader og kolonner for tabellinnhold
   - **Tekst med bilde** -- Tekst og et bilde side om side
   - **Logo** -- Menighetens logo, hentet fra [Utseende](appearance)
   - **Direktesending** -- Din spiller for direktesendinger, innebygd direkte på siden
   - **Podcast** -- En liste over episoder hentet fra en ekstern RSS-feed for podcast som du oppgir, med innstillinger for hvor mange episoder som skal vises, og om datoer og beskrivelser skal vises. Hver episode på det publiserte nettstedet har en lydspiller og en lenke **Last ned** som lagrer episodens lydfil under episodetittelen. Dette er for å fremheve en hvilken som helst podcast-feed på nettstedet ditt; for å publisere dine egne prekener som en podcast, se i stedet [Administrere prekener](../sermons/managing-sermons.md#your-podcast-feed)
   - **Gave** -- En giveknapp eller et innebygd gaveskjema
   - **HTML** -- Din egen rå HTML, for avanserte bruksområder som å bygge inn en widget fra en tredjepart (se [Bruke HTML-elementet](#using-the-html-element))
   - **iFrame** -- Legg inn eksternt innhold etter URL
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Bruke HTML-elementet

HTML-elementet har to bokser:

- **HTML-innhold** -- Markupen som skal vises på siden. Alle `<script>`-tagger du legger inn her, kjører på det publiserte nettstedet ditt.
- **JavaScript (uten script-taggen)** -- Skriptkode som kjører når siden lastes. Du kan også lime inn en leverandørs innbyggingskode her med dens `<script>`-tagger, og den vil kjøre på det publiserte nettstedet.

Hvis du limer inn bare en nettadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«Dette er en nettadresse, ikke JavaScript.»* En nettadresse alene i den boksen gjør ingenting. For å vise et bilde, bruk et **Bilde**-element, eller legg `<img src="...">` i **HTML-innhold**.

### Bruke kalenderelementet {#using-the-calendar-element}

Kalenderelementet viser hendelser fra en av kalenderne dine:

1. Under **Velg** velger du **Gruppekalender** (hendelsene til én gruppe -- listen viser grupper du er med i) eller **Kuratert kalender** (en kalender du har laget under **Kalendere**; se [Kuratert kalender](../calendars/curated-calendar)).
2. Under **Velg kalender** velger du gruppen eller kalenderen.
3. Under **Visning** velger du hvordan den skal vises:
   - **Månedskalender** -- Et månedsrutenett som besøkende kan bla gjennom.
   - **Kommende hendelser** -- Et rutenett med fliser for de neste 12 kommende hendelsene, der en gjentakende hendelse vises én gang på neste dato. Hver flis viser hendelsens bilde (eller tittelen på temaets mørke farge når den ikke har et bilde), en datomerke, dag og klokkeslett, og første linje i beskrivelsen. En knapp **Abonner** over flisene lar besøkende kopiere kalenderens ICS-lenke eller laste den ned.
4. For å vise bare noen hendelser skriver du inn en merkelapp i **Bare hendelser med merkelappen** -- for eksempel `ungdom`. Bare hendelser der **Merkelapper** inneholder det ordet vises. La feltet stå tomt for å vise alle hendelser. Merkelapper settes på hver hendelse; se [Legge til og redigere hendelser](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på en hendelse sin egen side på nettstedet ditt. Hendelsessiden viser hendelsens bilde, tittel, dato og klokkeslett og beskrivelse, pluss en boks med **Når** (inkludert gjentakelsesmønsteret for en gjentakende hendelse) og **Hvor** (rommene som er booket for den). Den har også en knapp **Meld deg på denne hendelsen** når påmelding er slått på, og en lenke **Legg til i min kalender** som laster ned hendelsen som en kalenderfil. Siden er satt opp slik at søkemotorer kan vise hendelsens dato og detaljer i søkeresultatene. Hendelsessider fra kuraterte kalendere som vises på sidene dine (for hendelser de neste seks månedene), listes også i nettstedskartet, slik at søkemotorer kan finne dem.

### Endre rekkefølge på innhold

Dra seksjoner eller elementer ved hjelp av håndtaket (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Style siden din

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** -- Ensfarget, gradient eller bilde. Når du bruker et bildebakgrunn, lar en velger for **Fokuspunkt** deg klikke for å angi hvilken del av bildet som skal forbli sentrert når seksjonen skaleres, og et valg for **Overlegg** lar deg legge en halvtransparent farge over bildet for å gjøre teksten lettere å lese
- **Utfylling** -- Avstand over og under innholdet i seksjonen
- **Bredde** -- Full bredde eller sentrert/begrenset
- **Skillelinjer** -- Dekorative formskillelinjer (bølge, skrå, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med valg for farge, høyde og speiling

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige alternativer er skriftstørrelse, farge, justering, margin og utfylling. For bilder kan du angi alternativ tekst og lenkemål.

### Egen CSS

For avansert styling har hver seksjon og hvert element et felt **Egen CSS** der du kan skrive egne CSS-regler. Disse er avgrenset til det elementet, så de påvirker ikke resten av siden utilsiktet.

:::tip
Hvis du trenger å bruke stiler på hele nettstedet -- for eksempel en egen skrift eller en global farge -- bruk innstillingene for [Utseende](appearance) i stedet for egen CSS på enkeltsider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å sjekke hvordan siden din ser ut i ulike skjermstørrelser:

- **Skrivebord** -- Visning i full nettleserbredde
- **Mobil** -- Smal visning i telefonstørrelse

For å se den publiserte siden nøyaktig slik besøkende ser den, gå tilbake til listen over sider og klikk på sidens bane. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet

Klikk på ikonet **Tilgjengelighet** i verktøylinjen for å kjøre en rask sjekk for vanlige problemer -- bilder uten alternativ tekst, lav fargekontrast, eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som må fikses, slik at du kan rette det på stedet.

## Angre endringer

Redigeringsverktøyet registrerer redigeringshistorikken din automatisk. Bruk knappene i verktøylinjen eller hurtigtastene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Tilbakefør siste handling
- **Gjør om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Bruk på nytt en handling som er angret

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk på **Vis historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på et av dem for å gjenopprette til det punktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter det nåværende sideinnholdet med øyeblikksbildeversjonen. Dette kan ikke angres med den vanlige angre-knappen. Lagre et øyeblikksbilde av den nåværende tilstanden før du gjenoppretter et gammelt, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publiseringsstatus

Sider kan ha en **publisert**-status, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke med gjeldende tilstand:

- **Direkte ved lagring** -- Siden bruker ikke en publiseringsprosess. Hver lagret endring går direkte live. Dette er standard for nye sider.
- **Upubliserte endringer** -- Siden har vært publisert før, men du har gjort endringer siden forrige publisering. Besøkende ser fortsatt den sist publiserte versjonen.
- **Publisert** -- Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine, klikker du på knappen **Publiser** i verktøylinjen. Siden blir live med en gang.

For å gå tilbake til den sist publiserte versjonen uten å påvirke det besøkende ser, åpner du overløpsmenyen (⋮) og klikker på **Forkast upubliserte endringer**.

For å slutte å bruke publiseringsprosessen, åpner du overløpsmenyen og klikker på **Slå av publisering**. Redigeringer går da direkte live igjen.

:::tip
Bruk arbeidsflyten for utkast og publisering når du vil forberede en side -- for eksempel for en kommende hendelse -- og bare gjøre den live i riktig øyeblikk. Bygg og forhåndsvis siden, og klikk deretter på Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](managing-pages) -- Lag sider, sett nettadresser og administrer navigasjon på nettstedet
- [Utseende](appearance) -- Angi farger, skrifter og profilering for hele nettstedet
- [Filer](files) -- Last opp bilder og dokumenter som skal brukes i redigeringsverktøyet
- [Lage skjemaer](../forms/creating-forms) -- Bygg skjemaer du kan legge inn på sider
