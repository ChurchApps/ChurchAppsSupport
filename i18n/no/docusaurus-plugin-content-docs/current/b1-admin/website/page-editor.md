---
title: "Bruke sideeditoren"
---

# Bruke sideeditoren

<div class="article-intro">

B1 sideeditor er en visuell dra-og-slipp-bygger som lar deg designe nettstedessidene dine uten å skrive noen kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer – alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Initialoppsett](initial-setup) for å få nettstedet ditt konfigurert
- Opprett minst én side i [Administrere sider](managing-pages)
- Du må ha tillatelsen **content.edit** for å få tilgang til editoren

</div>

## Åpne editoren

1. I B1 Admin klikker du **Nettsted** i venstremenyen.
2. Finn siden du vil redigere i tabellen Sider og klikk **Rediger**.

Editoren åpnes i fullskjermmodus. Venstre panel viser sidestrukturen og tilgjengelige innholdselementer; midtområdet viser en direktevisning av siden.

:::info
Editoren vises alltid i lysemodus, uavhengig av B1 Admin-temainnstillingen. Dette sikrer at forhåndsvisningen nøyaktig samsvarer med hvordan siden ser ut for besøkende.
:::

## Sidestruktur: Seksjoner og elementer

Hver side er bygd fra to nivåer:

- **Seksjoner** – De øverste beholderne som deler siden inn i horisontale bånd (for eksempel en heroseksjon, en innholdsblokk eller en bunntekstflis). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** – De enkelte innholdsstummene som er plassert i en seksjon, som tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk **Legg til seksjon** (eller **+**-knappen øverst i venstre panel).
2. Velg hvordan du vil starte:
   - **Fra mal** – bla gjennom seksjonsmalgalleriet organisert etter kategori (Hero, Om, Tjenester, Gi osv.) og klikk en for å sette inn den som en fullt stilisert, forhåndsutfylt seksjon. Du kan tilpasse alt etter at den er lagt til.
   - **Tom seksjon** – velg et kolonneoppsett (enkelt, to kolonner, tre kolonner osv.) og bygg fra bunnen av.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurer bakgrunnsfarge, polstring og andre stilalternativer.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** – Overskrifter, avsnitt og rik tekst
   - **Bilde** – Last opp eller lenk til et fotografi
   - **Knapp** – En klikkbar handlingslenke
   - **Kort** – Et bilde med tittel og beskrivelse
   - **Skjema** – Bygd inn et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** – Vis en arrangementskalender
   - **Vanlige spørsmål** – Trekkspill-stilte spørsmål og svarblokker
   - **Video** – Bygg inn en video etter nettadresse
   - **Gruppekatalog** – En søkbar katalog over alle kirkens grupper med valgfritt søk, kategorifitering og etikett-filter
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Omorganisere innhold

Dra seksjoner eller elementer ved hjelp av håndtaksikonet (seks prikker) på venstre side av hvert element for å omorganisere dem. Du kan dra elementer innen en seksjon eller flytte dem mellom seksjoner.

## Styling av siden

### Seksjonsstiler

Klikk på en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** – Solid farge, gradient eller bilde
- **Polstring** – Topp- og bunneavstand inne i seksjonen
- **Bredde** – Fullbredde eller sentrert/begrenset

### Elementstiler

Klikk på et element for å åpne stilpanelet. Vanlige alternativer inkluderer skriftstørrelse, farge, justering, margin og polstring. For bilder kan du angi alt-tekst og lenkedetaljer.

### Egendefinert CSS

For avansert styling har hver seksjon og element et **Egendefinert CSS**-felt hvor du kan skrive dine egne CSS-regler. Disse er begrenset til det elementet, så de vil ikke utilsiktet påvirke resten av siden.

:::tip
Hvis du må bruke stiler på hele nettstedet – for eksempel en egendefinert skrift eller global farge – bruk [Utseende](appearance)-innstillingene i stedet for egendefinert CSS på enkelte sider.
:::

## Forhåndsvisning av siden

Bruk forhåndsvisningskontrollene i verktøylisten for å sjekke hvordan siden ser ut på ulike skjermstørrelser:

- **Stasjonær** – Fullbredde-nettleserview
- **Mobil** – Smalere telefonformat

Klikk **Forhåndsvisning** for å åpne en direkteversjon av siden i en ny nettleserfane, nøyaktig som besøkende vil se den.

## Angre endringer

Editoren sporer redigeringshistorikken automatisk. Bruk verktøylinjens knapper eller tastatursnarvei for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) – Tilbakestill den siste handlingen
- **Gjenta** (Ctrl+Y / Cmd+Y) – Bruk en angret handling på nytt

Du kan også gjenopprette siden til et tidligere øyeblikk. Klikk **Historikk** i verktøylinja for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk en oppføring for å gjenopprette til det punktet.

:::warning
Gjenoppretting av et øyeblikk erstatter gjeldende sideinnhold med øyeblikk-versjonen. Dette kan ikke angres med den vanlige angre-knappen. Lagre et øyeblikk av gjeldende tilstand før du gjenoppretter en gammel hvis du vil beholde muligheten til å returnere.
:::

## Lagring og publisering

Endringer blir lagret automatisk mens du arbeider. En statusindikator i verktøylinja viser om endringene er lagret.

### Utkast og publisert tilstand

Sider kan ha en **publisert** tilstand som styrer når besøkende ser endringene dine. Verktøylinja viser en statusbrikke som viser gjeldende tilstand:

- **Direkteavsluttet ved lagring** – Siden bruker ikke arbeitsflyt for publisering. Hver lagret endring blir direkteavsluttet. Dette er standard for nye sider.
- **Ulagret endringer** – Siden har blitt publisert før, men du har gjort endringer siden sist publisering. Besøkende ser fortsatt den tidligere publiserte versjonen.
- **Publisert** – Siden er direkteavsluttet og det lagrede innholdet ditt samsvarer med det besøkende ser.

For å publisere endringene dine klikker du **Publiser**-knappen i verktøylinja. Siden blir direkteavsluttet umiddelbart.

For å tilbakestille til sist publiserte versjon uten å påvirke det besøkende ser, åpner du overflytmenyen (⋮) og klikker **Forkast endringer**.

For å ta en side offline helt åpner du overflytmenyen og klikker **Avpubliser**. Besøkende vil ikke lenger se siden til du publiserer den igjen.

:::tip
Bruk utkastvarslingsarbeidsflyt når du vil forberede en side – for eksempel for et kommende arrangement – og bare gjøre den direkteavsluttet på riktig tid. Bygg og forhåndsvis siden, deretter klikker du Publiser når du er klar.
:::

## Relaterte artikler

- [Administrere sider](managing-pages) – Opprett sider, angi nettadresser og administrer nettstednavigasjon
- [Utseende](appearance) – Angi nettstedsfargene, skriftene og merkevaren
- [Filer](files) – Last opp bilder og dokumenter for bruk i editoren
- [Opprette skjemaer](../forms/creating-forms) – Bygg skjemaer som du kan bygge inn på sider