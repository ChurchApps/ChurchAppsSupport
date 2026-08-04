---
title: "Bruke sideredigeringsprogrammet"
---

# Bruke sideredigeringsprogrammet

<div class="article-intro">

B1-sideredigeringsprogrammet er en visuell dra-og-slipp-byggeplattform som lar deg designe sidene på kirkens nettsted uten å skrive noen kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer -- alt fra innsiden av nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Førstegangsoppsett](initial-setup) for å få nettstedet ditt konfigurert
- Opprett minst én side i [Administrere sider](managing-pages)
- Du trenger **content.edit**-rettigheten for å få tilgang til redigeringsprogrammet

</div>

## Åpne redigeringsprogrammet

1. I B1 Admin klikker du på **Nettsted** i venstremenyen.
2. Finn siden du vil redigere i tabellen Sider, og klikk **Rediger**.

Redigeringsprogrammet åpnes i fullskjermmodus. Venstre panel viser sidestrukturen din og tilgjengelige innholdselementer; midtområdet viser en live forhåndsvisning av siden din.

:::info
Redigeringsprogrammet vises alltid i lys modus, uansett hvilken temainnstilling B1 Admin har. Dette sikrer at forhåndsvisningen nøyaktig samsvarer med hvordan siden din vil se ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer

Hver side er bygget fra to nivåer:

- **Seksjoner** -- De øverste beholderne som deler siden din inn i horisontale bånd (for eksempel en hero-seksjon, en innholdsblokk eller en bunntekst-stripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De individuelle innholdsdelene plassert inni en seksjon, som tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk **Legg til seksjon** (eller **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **Fra en mal** — bla gjennom galleriet av seksjonsmaler organisert etter kategori (Hero, Om oss, Tjenester, Gaver, osv.) og klikk på én for å sette den inn som en ferdigstilet, ferdigutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Blank seksjon** — velg et kolonneoppsett (én, to kolonner, tre kolonner, osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, innvendig avstand og andre stilalternativer.

### Bytte layout på en seksjon

Har du allerede bygget ut en seksjon, men ønsker en annen struktur? Bruk layoutbryteren på den seksjonen for å bytte ut kolonneoppsettet mot et annet fra galleriet, samtidig som eksisterende innhold og elementer beholdes på plass.

### Legge til elementer i en seksjon

1. Klikk inni en seksjon i forhåndsvisningen for å velge den.
2. Klikk **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rikt formatert tekst
   - **Bilde** -- Last opp eller lenk til et bilde
   - **Knapp** -- En klikkbar handlingslenke
   - **Kort** -- Et bilde med en tittel og beskrivelse
   - **Skjema** -- Bygg inn et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** -- Vis en arrangementskalender
   - **FAQ** -- Trekkspill-stil spørsmål-og-svar-blokker
   - **Video** -- Bygg inn en video via URL
   - **Gruppevisning** -- En filtrerbar katalog over alle kirkegrupper med valgfritt søk, kategorifilter og etikettfilter
   - **Ikonfunksjon** -- Et ikon med en tittel og kort beskrivelse, for å fremheve funksjoner eller tjenesteområder
   - **Galleri** -- Et rutenett med flere bilder eller en murstein-layout (masonry)
   - **Anbefaling** -- Ett eller flere sitater med forfatternavn, rolle og bilde
   - **Sosiale ikoner** -- Lenkede ikoner til kirkens profiler i sosiale medier
   - **Nedtelling** -- En tidtaker som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Statistikk** -- En rad med store tall og etiketter (medlemmer, år, lokasjoner)
   - **Kampanjefremdrift** -- En live fremdriftslinje for en givekampanje, som viser totalen samlet inn mot et fondmål
   - **Ansattgrid** -- Bildekort for medlemmene av en gruppe; gruppen må ha alternativet **offentlig medlemsliste** slått på
   - **Gudstjenestetider** -- Gudstjenesteplanen for lokasjonene dine, hentet automatisk fra oppmøteoppsettet
   - **Prekener** -- Prekenbiblioteket ditt, som en full nettleser eller som en rutenett-, liste- eller fremhevet-siste-layout
   - **Kart** -- Et innebygd kart sentrert på kirkens adresse
   - **Tabell** -- Et enkelt rutenett av rader og kolonner for tabellinnhold
   - **Tekst med bilde** -- Tekst og et bilde side om side
   - **Logo** -- Kirkens logo, hentet fra [Utseende](appearance)
   - **Direktesending** -- Direktesendingsspilleren din, bygget inn direkte på siden
   - **Donasjon** -- En giveknapp eller et innebygd donasjonsskjema
   - **Rå HTML** -- Egendefinert HTML-markup for avanserte bruksområder
   - **iFrame** -- Bygg inn eksternt innhold via URL
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Endre rekkefølgen på innhold

Dra seksjoner eller elementer med håndtak-ikonet (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Style siden din

### Seksjonsstiler

Klikk på en hvilken som helst seksjon for å åpne stilpanelet dens. Du kan angi:

- **Bakgrunn** -- Ensfarget, gradient eller bilde. Når du bruker en bildebakgrunn, lar en **Fokuspunkt**-velger deg klikke for å angi hvilken del av bildet som forblir sentrert etter hvert som seksjonen skalerer, og et **Overlegg**-fargevalg lar deg legge til en halvgjennomsiktig fargetone over bildet for å forbedre tekstens lesbarhet.
- **Innvendig avstand** -- Avstand over og under inni seksjonen
- **Bredde** -- Full bredde eller sentrert/begrenset
- **Delelinjer** -- Dekorative formdelere (bølge, skrå, kurve, trekant og flere) på topp- eller bunnkanten av seksjonen, med farge-, høyde- og speilingsvalg

### Elementstiler

Klikk på et hvilket som helst element for å åpne stilpanelet dets. Vanlige alternativer inkluderer skriftstørrelse, farge, justering, ytre og indre avstand. For bilder kan du angi alt-tekst og lenkemål.

### Egendefinert CSS

For avansert styling har hver seksjon og hvert element et **Egendefinert CSS**-felt der du kan skrive dine egne CSS-regler. Disse er avgrenset til det elementet, slik at de ikke utilsiktet påvirker resten av siden.

:::tip
Hvis du trenger å bruke stiler på tvers av hele nettstedet ditt -- som en egendefinert skrifttype eller en global farge -- bruk [Utseende](appearance)-innstillingene i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å sjekke hvordan siden din ser ut på ulike skjermstørrelser:

- **Desktop** -- Fullbredde nettleservisning
- **Mobil** -- Smal, telefonstørrelse-visning

Klikk **Forhåndsvisning** for å åpne en live versjon av siden i en ny nettleserfane, akkurat slik besøkende vil se den.

## Sjekke tilgjengelighet

Klikk på **Tilgjengelighet**-ikonet i verktøylinjen for å kjøre en rask sjekk for vanlige problemer -- bilder som mangler alt-tekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som trenger oppmerksomhet, slik at du kan fikse det på stedet.

## Angre endringer

Redigeringsprogrammet sporer redigeringshistorikken din automatisk. Bruk verktøylinjeknappene eller tastatursnarveiene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Tilbakestill din siste handling
- **Gjenta** (Ctrl+Y / Cmd+Y) -- Gjenta en angret handling

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk **Historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på en hvilken som helst oppføring for å gjenopprette til det punktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter det gjeldende sideinnholdet med øyeblikksbildeversjonen. Dette kan ikke angres med standard angre-knapp. Lagre et øyeblikksbilde av gjeldende tilstand før du gjenoppretter en gammel versjon, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøylinjen viser om endringene dine er lagret.

### Utkast- og publisert tilstand

Sider kan ha en **publisert**-tilstand, som styrer når besøkende ser endringene dine. Verktøylinjen viser en statusmerke som angir gjeldende tilstand:

- **Live ved lagring** -- Siden bruker ikke en publiseringsarbeidsflyt. Hver lagrede endring blir live umiddelbart. Dette er standard for nye sider.
- **Upubliserte endringer** -- Siden har blitt publisert tidligere, men du har gjort endringer siden siste publisering. Besøkende ser fortsatt den tidligere publiserte versjonen.
- **Publisert** -- Siden er live, og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine klikker du på **Publiser**-knappen i verktøylinjen. Siden blir live umiddelbart.

For å gå tilbake til sist publiserte versjon uten å påvirke det besøkende ser, åpner du overflytmenyen (⋮) og klikker **Forkast endringer**.

For å ta en side helt offline, åpner du overflytmenyen og klikker **Avpubliser**. Besøkende vil ikke lenger se den siden før du publiserer den igjen.

:::tip
Bruk utkast-/publiseringsarbeidsflyten når du vil forberede en side -- for eksempel til et kommende arrangement -- og bare gjøre den live på riktig tidspunkt. Bygg og forhåndsvis siden, og klikk deretter Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](managing-pages) -- Opprett sider, angi URL-er, og administrer nettstedets navigasjon
- [Utseende](appearance) -- Angi nettstedomfattende farger, skrifttyper og merkevareprofil
- [Filer](files) -- Last opp bilder og dokumenter for bruk i redigeringsprogrammet
- [Opprette skjemaer](../forms/creating-forms) -- Bygg skjemaer du kan bygge inn på sider
