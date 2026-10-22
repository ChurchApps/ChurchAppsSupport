---
title: "Bruke sideredigeringsverktøyet"
---

# Bruke sideredigeringsverktøyet {#using-the-page-editor}

<div class="article-intro">

Sideredigeringsverktøyet i B1 er en visuell byggeverktøy med dra-og-slipp som lar deg utforme sidene på kirkens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer – alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Førstegangsoppsett](initial-setup) for å få nettstedet ditt konfigurert
- Opprett minst én side under [Administrere sider](managing-pages)
- Du trenger tillatelsen **content.edit** for å åpne redigeringsverktøyet

</div>

## Åpne redigeringsverktøyet {#opening-the-editor}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettsted** og klikker på **Sider**.
2. Finn siden du vil redigere i tabellen over sider, og klikk på **Rediger innhold**.

Redigeringsverktøyet åpnes i fullskjermmodus. Venstre panel viser sidestrukturen din og tilgjengelige innholdselementer; midtområdet viser en levende forhåndsvisning av siden.

:::info
Redigeringsverktøyet vises alltid i lys modus, uavhengig av temainnstillingen din i B1 Admin, og bruker overskrifts- og brødteksttypografien du valgte under [Utseende](appearance). Dette sikrer at forhåndsvisningen samsvarer nøyaktig med hvordan siden vil se ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer {#page-structure-sections-and-elements}

Hver side er bygget opp av to nivåer:

- **Seksjoner** – de øverste beholderne som deler siden inn i horisontale bånd (for eksempel en hero-seksjon, et innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** – de enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon {#adding-a-section}

1. Klikk på **Legg til seksjon** (eller på **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **Fra en mal** – bla i malgalleriet for seksjoner, ordnet etter kategori (Hero, Om oss, Tjenester, Gaver osv.), og klikk på en for å sette den inn som en ferdig stilet, forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** – velg et kolonneoppsett (én kolonne, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, utfylling og andre stilalternativer.

### Bytte oppsett for en seksjon {#switching-a-sections-layout}

Har du allerede bygget en seksjon, men vil ha en annen struktur? Bruk oppsettsbytteren på seksjonen for å bytte kolonneoppsettet til et annet fra galleriet, mens du beholder innholdet og elementene dine på plass.

### Legge til elementer i en seksjon {#adding-elements-to-a-section}

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk på **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** – overskrifter, avsnitt og formatert tekst
   - **Bilde** – last opp eller lenk til et bilde
   - **Knapp** – en klikkbar lenke til handling
   - **Kort** – et bilde med tittel og beskrivelse
   - **Skjema** – bygg inn et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** – vis en hendelseskalender
   - **FAQ** – spørsmål og svar i form av trekkspill
   - **Video** – bygg inn en video med URL
   - **Gruppeoversikt** – en filtrerbar katalog over alle kirkens grupper med valgfritt søk, kategorifilter og etikettfilter
   - **Ikonfunksjon** – et ikon med tittel og kort beskrivelse, for fremheving av funksjoner eller tjenester
   - **Galleri** – et rutenett med flere bilder eller et murverksoppsett
   - **Vitnesbyrd** – ett eller flere sitater med forfatterens navn, rolle og bilde
   - **Sosiale ikoner** – lenkede ikoner til kirkens profiler i sosiale medier
   - **Nedtelling** – en timer som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Statistikk** – en rad med store tall og etiketter (medlemmer, år, campuser)
   - **Kampanjefremdrift** – en levende fremdriftsindikator for en gavekampanje, som viser totalt innsamlet beløp mot et fondsmål
   - **Stabsrutenett** – bildekort for medlemmene i en gruppe; gruppen må ha alternativet **offentlig liste** slått på
   - **Gudstjenestetider** – campusenes gudstjenesteplan, hentet automatisk fra oppmøteoppsettet
   - **Preken** – preken-biblioteket ditt, som en full visning eller et rutenett, en liste eller en utvalgt-nyeste-layout
   - **Kart** – et innebygd kart sentrert på kirkens adresse
   - **Tabell** – et enkelt rutenett med rader og kolonner for tabellinnhold
   - **Tekst med bilde** – tekst og et bilde side om side
   - **Logo** – kirkens logo, hentet fra [Utseende](appearance)
   - **Direktesending** – spilleren for direktesending, innebygd direkte på siden
   - **Podcast** – en liste over episoder hentet fra en ekstern podcast-RSS-URL du oppgir, med innstillinger for hvor mange episoder som vises, og om datoer og beskrivelser skal vises. Hver episode på det publiserte nettstedet har en lydspiller og en lenke **Last ned** som lagrer episodens lydfil under episodetittelen. Dette er for å fremheve en hvilken som helst podcast-feed på nettstedet ditt; for å publisere dine egne prekener som en podcast, se [Administrere prekener](../sermons/managing-sermons.md#your-podcast-feed) i stedet.
   - **Gave** – en gaveknapp eller et innebygd gaveskjema
   - **HTML** – din egen rå HTML, for avansert bruk, for eksempel innbygging av en widget fra en tredjepart (se [Bruke HTML-elementet](#using-the-html-element))
   - **iFrame** – bygg inn eksternt innhold via URL
3. Konfigurer elementet med innstillingspanelet som vises.

### Bruke HTML-elementet {#using-the-html-element}

HTML-elementet har to bokser:

- **HTML-innhold** – markupen som skal vises på siden. Eventuelle `<script>`-tagger du legger inn her, kjøres på det publiserte nettstedet ditt.
- **JavaScript (uten script-tagg)** – skriptkode som kjøres når siden lastes. Du kan også lime inn en leverandørs innbyggingskode her, med `<script>`-taggene inkludert, så kjøres den på det publiserte nettstedet.

Hvis du bare limer inn en webadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«Dette er en webadresse, ikke JavaScript.»* En nakket adresse i den boksen gjør ingenting. For å vise et bilde, bruk et **Bilde**-element eller legg `<img src="...">` i **HTML-innhold**.

### Bruke kalenderelementet {#using-the-calendar-element}

Elementet **Kalender** viser hendelser fra en av kalenderne dine:

1. Under **Velg** velger du **Gruppekalender** (hendelser for én gruppe – listen viser grupper du er medlem av) eller **Kuratert kalender** (en kalender du har laget under **Kalendere**; se [Kuratert kalender](../calendars/curated-calendar)).
2. Under **Velg kalender** velger du gruppen eller kalenderen.
3. Under **Visning** velger du hvordan den skal vises:
   - **Månedskalender** – et månedsrutenett som besøkende kan bla gjennom.
   - **Kommende hendelser** – et rutenett med fliser for de neste 12 kommende hendelsene, der en gjentakende hendelse vises én gang på sin neste dato. Hver flis viser hendelsens bilde (eller tittelen på temaets mørke farge hvis den ikke har bilde), en datomerkelapp, dag og klokkeslett, og den første linjen i beskrivelsen. En knapp **Abonner** over flisene lar besøkende kopiere ICS-lenken til kalenderen eller laste den ned.
4. Hvis du bare vil vise noen hendelser, skriv en tagg i **Bare hendelser med tagg** – for eksempel `ungdom`. Bare hendelser der **Tagger** inneholder det ordet vises. La feltet stå tomt for å vise alle hendelser. Tagger settes på hver hendelse; se [Legge til og redigere hendelser](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på en hendelse sin egen side på nettstedet ditt. Hendelsessiden viser bildet, tittelen, dato og klokkeslett og beskrivelsen, pluss en boks med **Når** (inkludert gjentakelsesmønsteret for en gjentakende hendelse) og **Hvor** (rommene som er booket for den). Den har også en knapp **Meld deg på denne hendelsen** når påmelding er slått på, og en lenke **Legg til i min kalender** som laster ned hendelsen som en kalenderfil. Siden er satt opp slik at søkemotorer kan vise hendelsens dato og detaljer i resultatene.

### Endre rekkefølgen på innhold {#reordering-content}

Dra seksjoner eller elementer ved hjelp av håndtaket (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Style siden din {#styling-your-page}

### Seksjonsstiler {#section-styles}

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** – ensfarget, overgang eller bilde. Når du bruker et bildebakgrunn, lar en **Fokuspunkt**-velger deg klikke for å angi hvilken del av bildet som skal forbli i midten når seksjonen skaleres, og et alternativ for **Overlegg** lar deg legge et halvtransparent fargelag over bildet for å gjøre teksten lettere å lese.
- **Utfylling** – avstand over og under innholdet i seksjonen
- **Bredde** – full bredde eller sentrert/innesluttet
- **Skillelinjer** – dekorative formskillere (bølge, skrå, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med alternativer for farge, høyde og speiling

### Elementstiler {#element-styles}

Klikk på et element for å åpne stilpanelet. Vanlige alternativer er skriftstørrelse, farge, justering, marg og utfylling. For bilder kan du angi alternativ tekst og lenkemål.

### Egendefinert CSS {#custom-css}

For avansert stil har hver seksjon og hvert element et felt **Egendefinert CSS** der du kan skrive dine egne CSS-regler. Disse er avgrenset til det elementet, så de påvirker ikke resten av siden utilsiktet.

:::tip
Hvis du vil bruke stiler på hele nettstedet – for eksempel en egendefinert skrift eller en global farge – bruk innstillingene under [Utseende](appearance) i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din {#previewing-your-page}

Bruk forhåndsvisningskontrollene i verktøylinjen for å se hvordan siden din ser ut på ulike skjermstørrelser:

- **Desktop** – visning i full nettleserbredde
- **Mobil** – smal visning i telefonstørrelse

For å se den publiserte siden nøyaktig slik besøkende ser den, gå tilbake til listen over sider og klikk på sidens sti. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet {#checking-accessibility}

Klikk på **Tilgjengelighet**-ikonet i verktøylinjen for å kjøre en rask sjekk for vanlige problemer – bilder uten alternativ tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som må ses på, slik at du kan rette det på stedet.

## Angre endringer {#undoing-changes}

Redigeringsverktøyet holder automatisk styr på redigeringshistorikken din. Bruk knappene i verktøylinjen eller hurtigtastene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) – tilbakestill den siste handlingen
- **Gjør om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) – bruk en angret handling på nytt

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk på **Vis historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på et av dem for å gå tilbake til det punktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter det nåværende innholdet på siden med øyeblikksbildets versjon. Dette kan ikke angres med den vanlige angre-knappen. Lagre et øyeblikksbilde av den nåværende tilstanden før du gjenoppretter et gammelt, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere {#saving-and-publishing}

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publisert status {#draft-and-published-state}

Sider kan ha en **publisert**-status, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke som angir gjeldende tilstand:

- **Direkte ved lagring** – siden bruker ikke en publiseringsarbeidsflyt. Hver lagret endring blir direkte synlig. Dette er standard for nye sider.
- **Upubliserte endringer** – siden har vært publisert før, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den sist publiserte versjonen.
- **Publisert** – siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene klikker du på knappen **Publiser** i verktøylinjen. Siden blir live med en gang.

For å gå tilbake til sist publiserte versjon uten å påvirke det besøkende ser, åpne overløpsmenyen (⋮) og klikk på **Forkast upubliserte endringer**.

For å slutte å bruke publiseringsarbeidsflyten, åpne overløpsmenyen og klikk på **Slå av publisering**. Redigeringer blir da direkte synlige igjen.

:::tip
Bruk utkast-/publiseringsarbeidsflyten når du vil forberede en side – for eksempel til en kommende hendelse – og bare gjøre den live i riktig øyeblikk. Bygg og forhåndsvis siden, og klikk deretter på Publiser når du er klar.
:::

## Relaterte artikler {#related-articles}

- [Administrere sider](managing-pages) – opprett sider, angi URL-er og administrer navigasjon på nettstedet
- [Utseende](appearance) – angi farger, skrifter og profilering for hele nettstedet
- [Filer](files) – last opp bilder og dokumenter som skal brukes i redigeringsverktøyet
- [Opprette skjemaer](../forms/creating-forms) – bygg skjemaer du kan bygge inn på sider
