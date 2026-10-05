---
title: "Bruke sideredigeringen"
---

# Bruke sideredigeringen

<div class="article-intro">

Sideredigeringen i B1 er et visuelt dra-og-slipp-verktøy som lar deg utforme sidene på kirkens nettsted uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet og angre endringer -- alt direkte i nettleseren.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [førstegangsoppsettet](initial-setup) for å få nettstedet konfigurert
- Opprett minst én side under [Administrere sider](managing-pages)
- Du trenger tillatelsen **content.edit** for å få tilgang til redigeringen

</div>

## Åpne redigeringen

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), utvid **Nettsted** og klikk på **Sider**.
2. Finn siden du vil redigere i tabellen Sider og klikk på **Rediger**.

Redigeringen åpnes i fullskjermmodus. Panelet til venstre viser sidestrukturen og tilgjengelige innholdselementer, og midtpartiet viser en live forhåndsvisning av siden.

:::info
Redigeringen vises alltid i lys modus, uavhengig av temainnstillingen i B1 Admin. Det sikrer at forhåndsvisningen stemmer nøyaktig med hvordan siden ser ut for besøkende på nettstedet.
:::

## Sidestruktur: seksjoner og elementer

Hver side bygges på to nivåer:

- **Seksjoner** -- Beholderne på øverste nivå som deler siden inn i horisontale bånd (for eksempel en hero-seksjon, en innholdsblokk eller en bunnstripe). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De enkelte innholdsdelene som plasseres i en seksjon, som tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk på **Legg til seksjon** (eller knappen **+** øverst i panelet til venstre).
2. Velg hvordan du vil starte:
   - **Fra en mal** — bla gjennom malgalleriet for seksjoner, ordnet etter kategori (Hero, Om oss, Gudstjenester, Gaver osv.), og klikk på en for å sette den inn som en ferdig stilet og forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** — velg et kolonneoppsett (én kolonne, to kolonner, tre kolonner osv.) og bygg fra grunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og angi bakgrunnsfarge, innvendig avstand og andre stilvalg.

### Bytte oppsett for en seksjon

Har du allerede bygget ut en seksjon, men vil ha en annen struktur? Bruk oppsettvelgeren på seksjonen til å bytte kolonneoppsett til et annet fra galleriet, mens det eksisterende innholdet og elementene blir værende på plass.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk på **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller lenk til et bilde
   - **Knapp** -- En klikkbar lenke med oppfordring til handling
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Bygg inn et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** -- Vis en arrangementskalender
   - **FAQ** -- Spørsmål og svar i trekkspillformat
   - **Video** -- Bygg inn en video med URL
   - **Gruppeleser** -- En filtrerbar oversikt over alle kirkens grupper med valgfritt søk, kategorifilter og etikettfilter
   - **Ikonfremheving** -- Et ikon med tittel og kort beskrivelse, til å fremheve tilbud eller tjenester
   - **Galleri** -- Et rutenett eller murverksoppsett med flere bilder
   - **Vitnesbyrd** -- Ett eller flere sitater med forfatternavn, rolle og bilde
   - **Ikoner for sosiale medier** -- Lenkede ikoner til kirkens profiler i sosiale medier
   - **Nedtelling** -- Et tidsur som teller ned til en dato eller et ukentlig gudstjenestetidspunkt
   - **Statistikk** -- En rad med store tall og etiketter (medlemmer, år, menigheter)
   - **Kampanjefremdrift** -- En live fremdriftslinje for en givekampanje som viser hvor mye som er samlet inn mot målet for et fond
   - **Ansattoversikt** -- Bildekort for medlemmene i en gruppe; gruppen må ha valget **offentlig medlemsliste** slått på
   - **Gudstjenestetider** -- Menighetenes gudstjenesteplan, hentet automatisk fra oppsettet for oppmøte
   - **Prekener** -- Prekenbiblioteket ditt, som full leser eller i rutenett, liste eller med nyeste prekenen fremhevet
   - **Kart** -- Et innebygd kart sentrert på kirkens adresse
   - **Tabell** -- Et enkelt rutenett med rader og kolonner til tabellinnhold
   - **Tekst med bilde** -- Tekst og bilde side om side
   - **Logo** -- Kirkens logo, hentet fra [Utseende](appearance)
   - **Direktesending** -- Direktesendingsspilleren, bygd inn direkte på siden
   - **Podkast** -- En liste over episoder hentet fra en ekstern RSS-strøm for podkaster som du oppgir, med innstillinger for hvor mange episoder som vises og om datoer og beskrivelser skal vises. Dette er for å vise en hvilken som helst podkaststrøm på nettstedet; hvis du vil publisere dine egne prekener som podkast, se i stedet [Administrere prekener](../sermons/managing-sermons.md#your-podcast-feed).
   - **Donasjon** -- En gaveknapp eller et innebygd donasjonsskjema
   - **Rå HTML** -- Egendefinert HTML-kode til avanserte formål
   - **iFrame** -- Bygg inn eksternt innhold med URL
3. Konfigurer elementet i innstillingspanelet som vises.

### Endre rekkefølgen på innhold

Dra seksjoner eller elementer i håndtaksikonet (seks prikker) på venstre side av hvert element for å endre rekkefølgen. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Stilsette siden

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** -- Ensfarget, gradient eller bilde. Når du bruker bildebakgrunn, kan du med en **Fokuspunkt**-velger klikke for å angi hvilken del av bildet som forblir sentrert når seksjonen skaleres, og med valget **Overlegg** legge en halvgjennomsiktig fargetone over bildet for å gjøre teksten lettere å lese.
- **Innvendig avstand** -- Avstand øverst og nederst inne i seksjonen
- **Bredde** -- Full bredde eller sentrert/avgrenset
- **Skillelinjer** -- Dekorative formskiller (bølge, skråstilt, kurve, trekant og flere) på øvre eller nedre kant av seksjonen, med valg for farge, høyde og speiling

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige valg er skriftstørrelse, farge, justering, ytre og indre avstand. For bilder kan du angi alternativtekst og lenkemål.

### Egendefinert CSS

Til avansert stilsetting har hver seksjon og hvert element et felt for **Egendefinert CSS** der du kan skrive egne CSS-regler. De gjelder bare det aktuelle elementet, så de påvirker ikke resten av siden utilsiktet.

:::tip
Hvis du trenger å bruke stiler på hele nettstedet -- for eksempel en egen skrifttype eller en global farge -- bruker du innstillingene under [Utseende](appearance) i stedet for egendefinert CSS på enkeltsider.
:::

## Forhåndsvise siden

Bruk forhåndsvisningskontrollene i verktøylinjen for å se hvordan siden ser ut på ulike skjermstørrelser:

- **Skrivebord** -- Nettleservisning i full bredde
- **Mobil** -- Smal visning i telefonstørrelse

Klikk på **Forhåndsvis** for å åpne en live versjon av siden i en ny nettleserfane, nøyaktig slik besøkende vil se den.

## Kontrollere tilgjengelighet

Klikk på ikonet **Tilgjengelighet** i verktøylinjen for å kjøre en rask kontroll av vanlige problemer -- bilder uten alternativtekst, lav fargekontrast eller overskrifter i feil rekkefølge. Hvert problem lenker direkte til elementet som trenger oppmerksomhet, slik at du kan rette det med en gang.

## Angre endringer

Redigeringen holder automatisk rede på redigeringshistorikken. Bruk knappene i verktøylinjen eller tastatursnarveiene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Tilbakestill siste handling
- **Gjør om** (Ctrl+Y / Cmd+Y) -- Utfør en angret handling på nytt

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk på **Historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk på en oppføring for å gjenopprette til det tidspunktet.

:::warning
Når du gjenoppretter et øyeblikksbilde, erstattes det gjeldende sideinnholdet med versjonen fra øyeblikksbildet. Dette kan ikke angres med den vanlige angreknappen. Lagre et øyeblikksbilde av gjeldende tilstand før du gjenoppretter et gammelt, hvis du vil beholde muligheten til å gå tilbake.
:::

## Lagre og publisere

Endringer lagres automatisk mens du jobber. En statusindikator i verktøylinjen viser om endringene er lagret.

### Utkast og publisert tilstand

Sider kan ha en **publisert** tilstand, som styrer når besøkende ser endringene dine. Verktøylinjen viser et statusmerke med gjeldende tilstand:

- **Live ved lagring** -- Siden bruker ikke publiseringsflyt. Hver lagrede endring går live umiddelbart. Dette er standard for nye sider.
- **Upubliserte endringer** -- Siden har vært publisert før, men du har gjort endringer siden forrige publisering. Besøkende ser fortsatt den tidligere publiserte versjonen.
- **Publisert** -- Siden er live, og det lagrede innholdet stemmer med det besøkende ser.

For å publisere endringene klikker du på knappen **Publiser** i verktøylinjen. Siden går live umiddelbart.

For å gå tilbake til siste publiserte versjon uten å påvirke det besøkende ser, åpner du overflytsmenyen (⋮) og klikker på **Forkast endringer**.

For å ta en side helt av nett åpner du overflytsmenyen og klikker på **Avpubliser**. Besøkende ser ikke siden før du publiserer den igjen.

:::tip
Bruk utkast/publiser-flyten når du vil forberede en side -- for eksempel til et kommende arrangement -- og først gjøre den live til rett tid. Bygg og forhåndsvis siden, og klikk på Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](managing-pages) -- Opprett sider, angi URL-er og administrer nettstedsnavigasjonen
- [Utseende](appearance) -- Angi farger, skrifttyper og profilering for hele nettstedet
- [Filer](files) -- Last opp bilder og dokumenter som skal brukes i redigeringen
- [Opprette skjemaer](../forms/creating-forms) -- Bygg skjemaer du kan bygge inn på sider
