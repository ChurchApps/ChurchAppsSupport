---
title: "Bruke sideredigeringsverktøyet"
description: "Sett opp en sideredigerer i B1 Admin ved å legge til seksjoner og elementer, style dem, forhåndsvise på mobil og publisere utkast. Dekker også angre og versjonshistorikk."
---

# Bruke sideredigeringsverktøyet

<div class="article-intro">

Sideredigeringsverktøyet i B1 er en visuell byggeløsning med dra-og-slipp som lar deg designe nettsidene for menigheten din uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer – alt fra nettleseren.

</div>

## Opplæringsvideo

<YouTube id="m2B_JxmfFm4" title="Redigere sider og navigasjon i B1" next="Koble til et eget domene i B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Første oppsett](./initial-setup.md) for å få nettsiden din konfigurert
- Opprett minst én side i [Administrere sider](./managing-pages.md)
- Du trenger tillatelsen **content.edit** for å åpne redigeringsverktøyet

</div>

## Åpne redigeringsverktøyet

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettside** og klikker på **Sider**.
2. Finn siden du vil redigere i tabellen over sider, og klikk på **Rediger innhold**.

Redigeringsverktøyet åpnes i fullskjermmodus. Den venstre panelet viser sidestrukturen din og tilgjengelige innholdselementer; midtområdet viser en levende forhåndsvisning av siden.

:::info
Redigeringsverktøyet vises alltid i lys modus, uavhengig av hvilket tema du har valgt i B1 Admin, og bruker overskrifts- og brødteksttypografien du valgte i [Utseende](./appearance.md). Dette sikrer at forhåndsvisningen stemmer med hvordan siden vil se ut for besøkende på nettsiden.
:::

## Sidestruktur: seksjoner og elementer

Hver side er bygget opp av to nivåer:

- **Seksjoner** – De øverste beholderne som deler siden inn i horisontale bånd (for eksempel en hero-seksjon, et innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** – De enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk på **Legg til seksjon** (eller på **+**-knappen øverst i det venstre panelet).
2. Velg hvordan du vil starte:
   - **Fra en mal** – Bla gjennom malgalleriet for seksjoner, sortert etter kategori (Hero, Om oss, Tjenester, Gaver osv.), og klikk på en for å sette den inn som en ferdigstilt, forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** – Velg et kolonneoppsett (én kolonne, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, polstring og andre stilalternativer.

### Bytte oppsett for en seksjon

Har du allerede bygget en seksjon, men vil ha en annen struktur? Bruk oppsettbytteren på seksjonen for å bytte kolonneoppsett til et annet fra galleriet, mens eksisterende innhold og elementer beholdes.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk på **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** – Overskrifter, avsnitt og formatert tekst
   - **Bilde** – Last opp eller lenk til et bilde
   - **Knapp** – En klikkbar lenke med handlingsoppfordring
   - **Kort** – Et bilde med en tittel og beskrivelse
   - **Skjema** – Legg inn et [skjema](../forms/creating-forms.md) direkte på siden. Hvis skjemaet har et [overskriftsbilde](../forms/creating-forms.md#adding-a-header-photo), vises det over spørsmålene
   - **Kalender** – Vis en arrangementskalender
   - **Ofte stilte spørsmål** – Spørsmål og svar i form av trekkspillblokker
   - **Video** – Legg inn en video via URL
   - **Gruppeoversikt** – En filtrerbar katalog over alle menighetens grupper, med valgfritt søk, kategorifilter og etikettfilter. **Oppsett** kan være **Rutenett** (standard) eller **Rullende (automatisk)** – se [Rullende oppsett](#scrolling-layouts)
   - **Gruppeliste** – Fliser for de offentlige gruppene dine, eventuelt bare gruppene med en bestemt etikett. **Oppsett** kan være **Rutenett** (standard; opptil tre fliser per rad) eller **Rullende (automatisk)** – se [Rullende oppsett](#scrolling-layouts)
   - **Ikonfunksjon** – Et ikon med en tittel og kort beskrivelse, til fremhevelse av funksjoner eller tjenester
   - **Galleri** – Et rutenett eller en murlayout med flere bilder
   - **Vitnesbyrd** – Ett eller flere sitater med navn, rolle og bilde på forfatteren
   - **Sosiale ikoner** – Lenkede ikoner for menighetens profiler på sosiale medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo og Podcast. Fyll inn en lenke for hver du vil vise; for **WhatsApp** bruker du en `https://wa.me/`-lenke med nummeret ditt eller en gruppeinvitasjonslenke
   - **Nedtelling** – En tidtaker som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Nøkkeltall** – En rad med store tall og etiketter (medlemmer, år, lokasjoner)
   - **Kampanjefremdrift** – En live fremdriftslinje for en gaveinnsamling, som viser totalt innsamlet beløp mot et fondsmål
   - **Stabsoversikt** – Bildekort for medlemmene i en gruppe; gruppen må ha alternativet **offentlig medlemsliste** slått på
   - **Gudstjenestetider** – Gudstjenesteplanen for menighetens lokasjoner, hentet automatisk fra oppsettet for oppmøte
   - **Taler** – Taleabiblioteket ditt, som en fullstendig nettleser eller i et rutenett, liste eller med fremhevet siste tale
   - **Kart** – Et innebygd kart sentrert på menighetens adresse
   - **Tabell** – Et enkelt rutenett med rader og kolonner for tabelldata
   - **Tekst med bilde** – Tekst og et bilde side om side
   - **Logo** – Menighetens logo, hentet fra [Utseende](./appearance.md)
   - **Direktesending** – Avspilleren for direktesendinger, innebygd direkte på siden
   - **Podcast** – En liste over episoder hentet fra en ekstern podcast-RSS-URL du oppgir, med innstillinger for hvor mange episoder som skal vises, og om datoer og beskrivelser skal vises. Hver episode på den publiserte siden har en lydavspiller og en **Last ned**-lenke som lagrer episodens lydfil under episodetittelen. Dette er for å vise en hvilken som helst podcast-feed på nettsiden din; for å publisere dine egne taler som podcast, se i stedet [Administrere taler](../sermons/managing-sermons.md#your-podcast-feed)
   - **Gave** – En gaveknapp eller et innebygd giveskjema
   - **HTML** – Din egen rå HTML, for avanserte bruksområder som å legge inn en widget fra en tredjepart (se [Bruke HTML-elementet](#using-the-html-element))
   - **iFrame** – Legg inn eksternt innhold via URL
3. Konfigurer elementet med innstillingspanelet som vises.

### Bruke HTML-elementet

**HTML**-elementet har to bokser:

- **HTML-innhold** – Markeringen som skal vises på siden. Eventuelle `<script>`-tagger du legger inn her, kjøres på den publiserte nettsiden.
- **JavaScript (uten script-tagg)** – Skriptkode som kjøres når siden lastes. Du kan også lime inn et leverandørs innbyggingsutdrag her, med `<script>`-taggene inkludert, og det vil kjøres på den publiserte nettsiden.

Hvis du limer inn bare en webadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«Dette er en webadresse, ikke JavaScript.»* En adresse alene i den boksen gjør ingenting. For å vise et bilde bruker du et **Bilde**-element, eller legger `<img src="...">` i **HTML-innhold**.

### Bruke kalenderelementet {#using-the-calendar-element}

**Kalender**-elementet viser arrangementer fra en av kalenderne dine:

1. Under **Velg** velger du **Gruppekalender** (arrangementene til én gruppe – listen viser grupper du er medlem av) eller **Kuratert kalender** (en kalender du har laget under **Kalendere**; se [Kuratert kalender](../calendars/curated-calendar.md)).
2. Under **Velg kalender** velger du gruppen eller kalenderen.
3. Under **Visning** velger du hvordan den skal vises:
   - **Månedskalender** – Et månedsrutenett som besøkende kan bla i. Hvert arrangement får en farge etter gruppen det tilhører, slik at en gruppes arrangementer har samme farge i alle kalendere. B1 velger fargene automatisk; det er ingenting du må sette opp.
   - **Kommende arrangementer** – Et rutenett med fliser for de neste 12 kommende arrangementene, der et gjentakende arrangement vises én gang på neste dato. Hver flis viser arrangementets bilde (eller tittelen på temaets mørke farge hvis det ikke har bilde), en datomerkelapp, dag og klokkeslett, og første linje i beskrivelsen. En **Abonner**-knapp over fliser lar besøkende kopiere kalenderens ICS-lenke eller laste den ned. Et **Oppsett**-alternativ vises for denne visningen: **Rutenett** (standard) eller **Rullende (automatisk)**, som plasserer fliene på én rad som ruller av seg selv (se [Rullende oppsett](#scrolling-layouts)). For en **Kuratert kalender** slår du på innstillingen **Gruppemerke** for å vise hvert arrangements gruppenavn øverst til høyre på flisen, i gruppens kalenderfarge. Arrangementer fra arkiverte eller konfidensielle grupper får ikke merke.
4. For å vise bare noen arrangementer skriver du inn en etikett under **Bare arrangementer merket med** – for eksempel `ungdom`. Bare arrangementer der **Etiketter** inneholder det ordet vises. La feltet stå tomt for å vise alle arrangementer. Etiketter settes på hvert arrangement; se [Legge til og redigere arrangementer](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på et arrangement sin egen side på nettsiden. Arrangementssiden viser arrangementsbildet, tittel, dato og klokkeslett, og beskrivelse, samt en boks med **Når** (inkludert gjentakelsesmønsteret for et gjentakende arrangement) og **Hvor** (rommene som er reservert for det). Den har også knappen **Meld deg på dette arrangementet** når påmelding er slått på, og en lenke **Legg til i min kalender** som laster ned arrangementet som en kalenderfil. Siden er satt opp slik at søkemotorer kan vise arrangementets dato og detaljer i resultatene. Arrangementssider fra kuraterte kalendere som vises på sidene dine (for arrangementer de neste seks månedene) listes også i nettstedets sitemap, slik at søkemotorer kan finne dem.

### Rullende oppsett {#scrolling-layouts}

Oppsettet **Rullende (automatisk)** i **Gruppeoversikt**, **Gruppeliste** og visningen **Kommende arrangementer** i Kalender-elementet plasserer fliene på én rad i stedet for et rutenett. På en telefon fyller hver flis hele raden; på en datamaskin passer to fliser ved siden av hverandre. Når det er flere fliser enn det som får plass, gjør raden følgende:

- Flytter seg fremover én flis omtrent hvert fjerde sekund, og begynner på nytt med første flis etter den siste.
- Pauser mens en besøkende holder musepekeren over, berører eller tabber inn i den, og fortsetter noen sekunder senere.
- Viser en rad med prikker under, én per flis, der prikken for gjeldende flis er fylt. Besøkende kan klikke på en prikk for å hoppe til den flisen.

På enheter der bevegelse er redusert, står raden stille, og besøkende sveiper eller ruller selv. Hvis alle fliene får plass, beveger ikke raden seg, og det vises ingen prikker.

### Endre rekkefølgen på innhold

Dra seksjoner eller elementer ved hjelp av håndtaket (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Style siden din

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** – Ensfarget, overgang eller bilde. Når du bruker et bildebakgrunn, lar en **Fokuspunkt**-velger deg klikke for å angi hvilken del av bildet som skal forbli sentrert når seksjonen skaleres, og et **Overlegg**-fargealternativ lar deg legge et halvgjennomsiktig fargelag over bildet for bedre lesbarhet av teksten
- **Polstring** – Avstand over og under innholdet i seksjonen
- **Bredde** – Full bredde eller sentrert/begrenset
- **Skillelinjer** – Dekorative skilleformer (bølge, skråstilt, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med alternativer for farge, høyde og speiling

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige alternativer er skriftstørrelse, farge, justering, margin og polstring. For bilder kan du angi alternativ tekst og lenkemål.

### Egendefinert CSS

For avansert styling har hver seksjon og hvert element et felt for **Egendefinert CSS**, der du kan skrive egne CSS-regler. Disse er avgrenset til det elementet, så de påvirker ikke resten av siden utilsiktet.

:::tip
Hvis du trenger å bruke stiler over hele nettstedet – for eksempel en egendefinert skrifttype eller en global farge – bruker du innstillingene under [Utseende](./appearance.md) i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å sjekke hvordan siden ser ut på ulike skjermstørrelser:

- **Datamaskin** – Visning i full nettleserbredde
- **Mobil** – Smal visning i telefonstørrelse

På telefoner stables kolonnene i en rad oppå hverandre i full bredde, med mindre du angir en **Mobilbredde** for dem i radens innstillinger. Lister med taler og podcast-episoder stables også slik at teksten for hver episode vises under miniatyrbildet på telefoner.

For å se den publiserte siden nøyaktig slik besøkende ser den, gå tilbake til listen over sider og klikk på sidens sti. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet

Klikk på **Tilgjengelighet**-ikonet i verktøylinjen for å kjøre en rask sjekk for vanlige problemer – bilder uten alternativ tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som må rettes, slik at du kan fikse det der det står.

## Angre endringer

Redigeringsverktøyet holder automatisk styr på redigeringshistorikken din. Bruk knappene i verktøylinjen eller hurtigtastene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) – Tilbakestiller den siste handlingen din
- **Gjør om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) – Gjenoppretter en angret handling

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk på **Vis historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på et av dem for å gå tilbake til det punktet.

:::warning
Gjenoppretting av et øyeblikksbilde erstatter det nåværende sidens innhold med øyeblikksbildets versjon. Dette kan ikke angres med den vanlige angreknappen. Lagre et øyeblikksbilde av den nåværende tilstanden før du gjenoppretter et gammelt, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du jobber. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publiseringstilstand

Sider kan ha en **publisert**-tilstand, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke med gjeldende tilstand:

- **Direkte ved lagring** – Siden bruker ikke en publiseringsarbeidsflyt. Hver lagret endring blir publisert med en gang. Dette er standard for nye sider.
- **Upubliserte endringer** – Siden har vært publisert tidligere, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den sist publiserte versjonen.
- **Publisert** – Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine klikker du på **Publiser**-knappen i verktøylinjen. Siden blir umiddelbart live.

For å gå tilbake til sist publiserte versjon uten å påvirke det besøkende ser, åpner du overflowmenyen (⋮) og klikker på **Forkast upubliserte endringer**.

For å slutte å bruke publiseringsarbeidsflyten, åpner du overflowmenyen og klikker på **Slå av publisering**. Redigeringer blir da publisert med en gang igjen.

:::tip
Bruk utkast- og publiseringsarbeidsflyten når du vil forberede en side – for eksempel for et kommende arrangement – og bare gjøre den live på riktig tidspunkt. Bygg og forhåndsvis siden, og klikk deretter på Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](./managing-pages.md) – Opprett sider, angi nettadresser og administrer navigasjon på nettstedet
- [Utseende](./appearance.md) – Angi farger, skrifttyper og merkevarebygging for hele nettstedet
- [Filer](./files.md) – Last opp bilder og dokumenter som du kan bruke i redigeringsverktøyet
- [Opprette skjemaer](../forms/creating-forms.md) – Lag skjemaer du kan legge inn på sider
