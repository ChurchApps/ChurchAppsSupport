---
title: "Bruke sideeditoren"
description: "Bygg nettsider i B1 Admins sideeditor: legg til seksjoner og elementer, stil dem, forhåndsvis på mobil, publiser utkast, og bruk angre og redigeringshistorikk."
---

# Bruke sideeditoren

<div class="article-intro">

Sideeditoren i B1 er en visuell dra-og-slipp-bygger som lar deg designe sidene på menighetens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer -- alt fra nettleseren din.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="m2B_JxmfFm4" title="Redigere sider og navigasjon i B1" next="Koble til et eget domene i B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](./initial-setup.md) for å konfigurere nettstedet ditt
- Opprett minst én side i [Administrere sider](./managing-pages.md)
- Du trenger tillatelsen **content.edit** for å åpne editoren

</div>

## Åpne editoren {#opening-the-editor}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettside** og klikker på **Sider**.
2. Finn siden du vil redigere i tabellen Sider og klikk på **Rediger innhold**.

Editoren åpnes i fullskjermmodus med en live forhåndsvisning av siden din. Verktøylinjen øverst har **Avslutt**, sidens publiseringsstatus, **Angre** og **Gjør om**, lagringsstatusen, **Publiser**, knappene for forhåndsvisning på desktop og mobil, **Legg til innhold**, tilgjengelighetssjekken og en meny **Mer** (⋮). Klikk på **Legg til innhold** for å åpne panelet **Legg til elementer** til venstre; klikk på en seksjon eller et element for å åpne innstillingene for det til høyre.

Editoren krever en skjerm som er minst rundt 880 piksler bred. På telefon ser du en melding som ber deg åpne siden på et nettbrett eller en datamaskin.

:::info
Editoren vises alltid i lys modus, uavhengig av temainnstillingen i B1 Admin, og bruker overskrifts- og brødtekstskriftene du valgte i [Utseende](./appearance.md). Dette sikrer at forhåndsvisningen stemmer med hvordan siden din vil se ut for besøkende.
:::

## Sidestruktur: seksjoner og elementer {#page-structure-sections-and-elements}

Hver side er bygget av to nivåer:

- **Seksjoner** -- De øverste beholderne som deler siden inn i horisontale bånd (for eksempel en hovedseksjon, en innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De enkelte innholdsbitene som plasseres inne i en seksjon, for eksempel tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon {#adding-a-section}

1. Klikk på **Legg til innhold** og dra **Seksjon** inn på siden. Du kan også holde musepekeren mellom to seksjoner og klikke på **+**-knappen (**Legg til seksjon**) som dukker opp.
2. I dialogen **Velg et seksjonsoppsett** velger du hvordan du vil starte:
   - **Fra en mal** — bla gjennom seksjonsmalene etter kategori (Hovedbilde, Om oss, Tjenester, Personer, Media, Giving og Oppfordring til handling) og klikk på en for å sette den inn som en ferdigstilt, forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** — en tom seksjon å bygge fra bunnen av. For å dele den i kolonner legger du til et **Rad**-element inni den.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunn, farger og andre stilalternativer.

Når du holder musepekeren over en seksjon, vises verktøylinjen: dra-håndtak, **Seksjonsinnstillinger**, **Flytt seksjon opp**, **Flytt seksjon ned**, **Dupliser seksjon**, **Prøv et annet oppsett** og **Slett seksjon**.

### Bytte oppsett for en seksjon {#switching-a-sections-layout}

Har du allerede bygget en seksjon, men vil ha en annen struktur? Klikk på **Prøv et annet oppsett** på seksjonens verktøylinje for å bytte arrangementet til et annet fra galleriet, mens det eksisterende innholdet og elementene dine beholdes på plass.

### Legge til elementer i en seksjon {#adding-elements-to-a-section}

1. Klikk på **Legg til innhold** for å åpne panelet **Legg til elementer**. Bruk **Søk i elementer** eller fanene (**Alle**, **Vanlige**, **Media**, **Menighet**, **Avansert** og **Blokker** når du har [gjenbrukbare blokker](./blocks.md)) for å finne et element.
2. Dra elementet inn i en seksjon i forhåndsvisningen, eller velg et element på siden og klikk deretter på et kort for å legge det nye elementet rett etter det. Elementene er:
   - **Rad** -- Deler en seksjon i kolonner ved siden av hverandre
   - **Boks** -- Grupperer elementer sammen i en stilisert beholder
   - **Karusell** -- Blar gjennom et sett med lysbilder i full bredde
   - **Mellomrom** -- Legger til tomt vertikalt rom
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller lenk til et bilde
   - **Knapplenke** -- En klikkbar knapp for oppfordring til handling
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Bygg inn et [skjema](../forms/creating-forms.md) direkte på siden. Hvis skjemaet har et [overskriftsbilde](../forms/creating-forms.md#adding-a-header-photo), vises det over spørsmålene
   - **Kalender** -- Vis en arrangementskalender
   - **Utvidbar** -- Spørsmål og svar i form av trekkspillblokker
   - **Video** -- Bygg inn en video med URL
   - **Gruppeoversikt** -- En filtrerbar katalog over alle menighetens grupper med valgfritt søk, kategorifilter og etikettfilter. Dens **oppsett** kan være **Rutenett** (standard) eller **Rulling (automatisk)** -- se [Rulleoppsett](#scrolling-layouts)
   - **Gruppeliste** -- Fliser for de offentlige gruppene dine, eventuelt bare gruppene med en gitt etikett. Dens **oppsett** kan være **Rutenett** (standard; opptil tre fliser per rad) eller **Rulling (automatisk)** -- se [Rulleoppsett](#scrolling-layouts)
   - **Ikonfunksjon** -- Et ikon med tittel og kort beskrivelse, for fremhevinger av tjenester eller tiltak
   - **Galleri** -- Et rutenett med flere bilder eller et murverksoppsett
   - **Vitnesbyrd** -- Ett eller flere sitater med navn på forfatter, rolle og bilde
   - **Sosiale ikoner** -- Lenkede ikoner for menighetens profiler i sosiale medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo og Podcast. Fyll inn en lenke for hver du vil vise; for **WhatsApp** bruker du en `https://wa.me/`-lenke med nummeret ditt eller en invitasjonslenke til en gruppe
   - **Nedtelling** -- En timer som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Statistikk** -- En rad med store tall og etiketter (medlemmer, år, menighetsenheter)
   - **Kampanjefremdrift** -- En live fremdriftslinje for en giving-kampanje, som viser totalt innsamlet beløp mot et fondsmål
   - **Stabsrutenett** -- Bildekort for medlemmene i en gruppe; gruppen må ha alternativet **offentlig liste** slått på
   - **Gudstjenestetider** -- Menighetsenhetenes gudstjenesteplan, hentet automatisk fra oppsettet for oppmøte
   - **Preken** -- Preken-biblioteket ditt, som en fullstendig nettleser eller et rutenett, en liste eller en fremhevet nyeste-oppsett
   - **Sted** -- Et innbygd kart sentrert på menighetens adresse
   - **Tabell** -- Et enkelt rutenett med rader og kolonner for tabelldata
   - **Tekst med bilde** -- Tekst og et bilde side om side
   - **Logo** -- Menighetens logo, hentet fra [Utseende](./appearance.md)
   - **Strøm** -- Din spiller for direktesending, innbygd direkte på siden
   - **Podcast** -- En liste over episoder hentet fra en ekstern podcast-RSS-feed-URL du oppgir, med innstillinger for hvor mange episoder som vises, og om datoer og beskrivelser skal vises. Hver episode på det live nettstedet har en lydspiller og en lenke for **Last ned** som lagrer episodens lydfil under episodetittelen. Dette er for å vise frem en hvilken som helst podcast-feed på nettstedet ditt; for å publisere dine egne prekener som podcast, se [Administrere prekener](../sermons/managing-sermons.md#your-podcast-feed) i stedet
   - **Gave** -- Et fullstendig givingsskjema innbygd på siden
   - **Gavelenke** -- En knapp som åpner gavesiden din
   - **HTML** -- Din egen rå HTML, for avanserte bruksområder som å bygge inn en tredjepartswidget (se [Bruke HTML-elementet](#using-the-html-element))
   - **Innebygd side** -- Bygg inn en annen nettside via URL i en ramme
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Bruke HTML-elementet {#using-the-html-element}

**HTML**-elementet har to bokser:

- **HTML-innhold** -- Markupen som skal vises på siden. Eventuelle `<script>`-tagger du legger inn her, kjøres på det live nettstedet ditt.
- **JavaScript (uten script-tagg)** -- Skriptkode som kjøres når siden lastes. Du kan også lime inn en leverandørs innbyggingskode her, med `<script>`-taggene inkludert, og den kjøres på det live nettstedet.

Hvis du limer inn bare en webadresse (for eksempel en bildelenke) i JavaScript-boksen, blir boksen rød med advarselen *«Dette er en webadresse, ikke JavaScript.»* En nakenadresse i den boksen gjør ingenting. For å vise et bilde bruker du et **Bilde**-element, eller legger `<img src="...">` i **HTML-innhold**.

### Bruke kalenderelementet {#using-the-calendar-element}

**Kalender**-elementet viser arrangementer fra en av kalenderne dine:

1. Under **Velg** velger du **Gruppekalender** (en gruppes arrangementer -- listen viser grupper du er medlem av) eller **Kuratert kalender** (en kalender du har laget under **Kalendere**; se [Kuratert kalender](../calendars/curated-calendar.md)).
2. Under **Velg kalender** velger du gruppen eller kalenderen.
3. Under **Visning** velger du hvordan den skal vises:
   - **Månedskalender** -- Et månedsrutenett besøkende kan bla gjennom. Hvert arrangement har farge etter gruppen det tilhører, slik at en gruppes arrangementer har samme farge i hver kalender. B1 velger fargene automatisk; det er ingenting å sette opp.
   - **Kommende arrangementer** -- Et rutenett med fliser for de neste 12 kommende arrangementene, der et gjentakende arrangement vises én gang på sin neste dato. Hver flis viser arrangementets bilde (eller tittelen på temaets mørke farge når det ikke har bilde), et datomerke, dag og tidspunkt, og første linje i beskrivelsen. En knapp for **Abonner** over flisene lar besøkende kopiere kalenderens ICS-lenke eller laste den ned. Det finnes en innstilling for **Oppsett** for denne visningen: **Rutenett** (standard) eller **Rulling (automatisk)**, som plasserer flisene i én rad som ruller av seg selv (se [Rulleoppsett](#scrolling-layouts)). For en **Kuratert kalender** slår du på innstillingen **Gruppemerke** for å vise hvert arrangements gruppenavn i øverste høyre hjørne av flisen, i gruppens kalenderfarge. Arrangementer fra arkiverte eller konfidensielle grupper får ikke merke.
4. For å vise bare noen av arrangementene skriver du inn en etikett under **Bare arrangementer med etikett** -- for eksempel `youth`. Bare arrangementer der **Etiketter** inneholder det ordet vises. La feltet stå tomt for å vise alle arrangementene. Etiketter settes på hvert arrangement; se [Legge til og redigere arrangementer](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visningene åpner et klikk på et arrangement sin egen side på nettstedet ditt. Arrangementssiden viser bildet, tittelen, dato og klokkeslett og beskrivelsen, i tillegg til en boks med **Når** (inkludert gjentakelsesmønsteret for et gjentakende arrangement) og **Hvor** (rommene som er reservert for det). Den har også en knapp **Meld deg på dette arrangementet** når påmelding er slått på, og en lenke **Legg til i min kalender** som laster ned arrangementet som en kalenderfil. Siden er satt opp slik at søkemotorer kan vise arrangementets dato og detaljer i resultatene. Arrangementssider fra kuraterte kalendere som vises på sidene dine (for arrangementer de neste seks månedene), står også i nettstedkartet ditt, slik at søkemotorer kan finne dem.

### Rulleoppsett {#scrolling-layouts}

Oppsettet **Rulling (automatisk)** på **Gruppeoversikt**, **Gruppeliste** og visningen **Kommende arrangementer** i Kalender-elementet plasserer flisene i én rad i stedet for et rutenett. På telefon fyller hver flis raden; på datamaskin får to fliser plass ved siden av hverandre. Når det er flere fliser enn det som får plass, gjør raden følgende:

- Går videre én flis omtrent hvert fjerde sekund, og starter igjen fra første flis etter den siste.
- Stopper mens en besøkende holder musepekeren over, berører eller tabulerer seg inn i den, og fortsetter noen sekunder senere.
- Viser en rad med prikker under, én per flis, med prikken for gjeldende flis fylt ut. Besøkende kan klikke på en prikk for å hoppe til den flisen.

På enheter der redusert bevegelse er slått på, står raden stille, og besøkende sveiper eller ruller den selv. Hvis alle flisene får plass, beveger ikke raden seg, og det vises ingen prikker.

### Omorganisere innhold {#reordering-content}

Dra seksjoner eller elementer med håndtaket (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Stile siden din {#styling-your-page}

### Seksjonsstiler {#section-styles}

Klikk på en hvilken som helst seksjon for å åpne stilpanelet. Du kan angi:

- **Farger** -- Under fanen **Foreslått** klikker du på en av fargekombinasjonene fra paletten din. Under fanen **Egendefinert** setter du **bakgrunnstype** (**Farge**, **Bilde** eller **YouTube-video**) og farger for overskrift, tekst og lenker. Med et bildebakgrunn klikker du på bildet for å sette fokuspunktet (delen som holdes synlig når bildet beskjæres), og bruker **Overlegg-farge** og **Bakgrunnsdekkevne** for å farge bildet slik at teksten forblir lesbar.
- **Synlighet** -- **Skjul på desktop** eller **Skjul på mobil**
- **Stiler** -- Legg til enkeltstiler, for eksempel topp- og bunnmarg, for alle enheter, bare desktop eller bare mobil
- **Animasjoner** -- En effekt og hastighet for når seksjonen scroller inn i synsfeltet
- **Formdelere** -- Dekorative former (bølge, bølger, skråning, kurve, topper og trekant) på øvre eller nedre kant av seksjonen, med alternativer for farge, høyde og speiling

Seksjonsinnstillingene har også **Dupliser** og **Konverter til blokk**, som kopierer seksjonen til en ny [gjenbrukbar blokk](./blocks.md).

### Elementstiler {#element-styles}

Klikk på et hvilket som helst element for å åpne stilpanelet. Vanlige alternativer er skriftstørrelse, farge, justering, margin og padding. For bilder kan du angi alternativ tekst og lenkemål.

### Stiler for én seksjon eller ett element {#styles-for-one-section-or-element}

For mer finjustert kontroll åpner du panelet **Stiler** i innstillingene til en seksjon eller et element og klikker på **Legg til en stil** under **Alle**, **Bare desktop** eller **Bare mobil**. Hver stil gjelder bare for den seksjonen eller det elementet, så den påvirker ikke resten av siden.

:::tip
Hvis du trenger å bruke stiler på hele nettstedet ditt -- for eksempel en egendefinert skrift eller en global farge -- bruk innstillingene under [Utseende](./appearance.md) i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din {#previewing-your-page}

Bruk forhåndsvisningskontrollene i verktøylinjen for å sjekke hvordan siden ser ut i ulike skjermstørrelser:

- **Desktop** -- Visning i nettleser i full bredde
- **Mobil** -- Smal visning i telefonstørrelse

På telefon stables kolonnene i en rad oppå hverandre i full bredde, med mindre du setter en **mobilbredde** for dem i radens innstillinger. Lister med prekener og podcast-episoder stabler også teksten for hver episode under miniatyrbildet på telefon.

For å se den live siden akkurat slik besøkende ser den, gå tilbake til listen over sider og klikk på sidens sti. Den åpnes i en ny nettleserfane.

## Sjekke tilgjengelighet {#checking-accessibility}

Klikk på ikonet **Sjekk tilgjengelighet** i verktøylinjen (det viser et antall når problemer blir funnet) for å kjøre en rask sjekk av vanlige problemer -- bilder uten alternativ tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som trenger oppmerksomhet, slik at du kan fikse det på stedet.

## Angre endringer {#undoing-changes}

Editoren holder automatisk oversikt over redigeringshistorikken din. Bruk knappene i verktøylinjen eller hurtigtastene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Tilbakefør den siste handlingen din
- **Gjør om** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Utfør en angret handling på nytt

Du kan også hoppe tilbake til et tidligere punkt. Åpne menyen **Mer** (⋮) i verktøylinjen og klikk på **Vis historikk**. Dialogen **Redigeringshistorikk** lister hver endring med tidspunkt, og markerer der du er nå med **(gjeldende)**. Klikk på en oppføring (eller knappen **Gjenopprett til dette punktet**) for å sette siden tilbake slik den var på det tidspunktet.

:::info
Endringer som er gjort etter punktet du gjenopprettet, blir værende i historikken, slik at du kan bruke **Gjør om** eller velge en senere oppføring for å gå fremover igjen. Når du gjør en ny redigering, erstattes disse senere oppføringene av den.
:::

## Lagre og publisere {#saving-and-publishing}

Endringer lagres automatisk mens du jobber. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publiseringsstatus {#draft-and-published-state}

Sider kan ha en **publisert**-status, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusbrikke med gjeldende tilstand:

- **Live ved lagring** -- Siden bruker ikke en publiseringsarbeidsflyt. Hver lagret endring går live med en gang. Dette er standard for nye sider.
- **Upublisert endring** -- Siden har vært publisert før, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den sist publiserte versjonen.
- **Publisert** -- Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine klikker du på knappen **Publiser** i verktøylinjen. Siden blir live med en gang.

For å gå tilbake til sist publiserte versjon uten å påvirke det besøkende ser, åpner du overløpsmenyen (⋮) og klikker på **Forkast upublisert endring**.

For å slutte å bruke publiseringsarbeidsflyten, åpner du overløpsmenyen og klikker på **Slå av publisering**. Redigeringer går da live med en gang igjen.

:::tip
Bruk utkast-/publiseringsarbeidsflyten når du vil forberede en side -- for eksempel til et kommende arrangement -- og bare gjøre den live i riktig øyeblikk. Bygg og forhåndsvis siden, og klikk deretter på Publiser når du er klar.
:::

## Relaterte artikler {#related-articles}

- [Administrere sider](./managing-pages.md) -- Lag sider, sett URL-er og administrer navigasjonen på nettstedet
- [Utseende](./appearance.md) -- Angi farger, skrifter og merkevare for hele nettstedet
- [Filer](./files.md) -- Last opp bilder og dokumenter til bruk i editoren
- [Lage skjemaer](../forms/creating-forms.md) -- Bygg skjemaer du kan bygge inn på sider
