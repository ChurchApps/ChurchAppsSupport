---
title: "Bruke sideeditoren"
---

# Bruke sideeditoren

<div class="article-intro">

B1-sideeditoren er en visuell dra-og-slipp-bygger som lar deg designe kirkens nettstedssider uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvis arbeidet ditt og angre endringer -- alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [startoppsett](initial-setup) for å få nettstedet ditt konfigurert
- Opprett minst én side i [Administrering av sider](managing-pages)
- Du trenger **content.edit**-tillatelsen for å få tilgang til editoren

</div>

## Åpning av editoren

1. I B1 Admin klikker du **Nettsted** i venstre meny.
2. Finn siden du vil redigere i siden-tabellen og klikk **Rediger**.

Editoren åpnes i fullskjermsmodus. Venstre panel viser sidestrukturen din og tilgjengelige innholdsélementene; midtområdet viser en live-forhåndsvisning av siden din.

:::info
Editoren vises alltid i lysmodus, uavhengig av B1 Admin-temainnstillingen. Dette sikrer at forhåndsvisningen nøyaktig samsvarer med hvordan siden vil se ut for nettstedsbesøkende.
:::

## Sidestruktur: seksjoner og elementer

Hver side er bygget fra to nivåer:

- **Seksjoner** -- Toppnivåbeholdere som deler siden i horisontale bånd (for eksempel en heltseksjon, en innholdsblokk eller en bunntripling). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De individuelle innholdsdelpene plassert innenfor en seksjon, som tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk **Legg til seksjon** (eller **+**-knappen øverst i venstre panel).
2. Velg et oppsett for seksjonen -- alternativer inkluderer enkolonne, to kolonner, tre kolonner og mer.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk den for å velge den og konfigurer bakgrunnsfarge, polstring og andre stilalternativer.

### Legge til elementer i en seksjon

1. Klikk innenfor en seksjon i forhåndsvisningen for å velge den.
2. Klikk **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller koble til et bilde
   - **Knapp** -- En klikkbar oppfordring til handling-lenke
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Integrer et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** -- Vis en hendelseskalender
   - **FAQ** -- Akkordion-stilspørsmål og svarblokker
   - **Video** -- Integrer en video ved URL
   - **Gruppeleseren** -- En filtrerbar katalog over alle kirkgrupper med valgfri søk, kategorifilter og merketatfilter
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Omsortering av innhold

Dra seksjoner eller elementer ved hjelp av håndtaksikonen (seks prikker) på venstre side av hvert element for å omorganisere dem. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Styling av siden din

### Seksjonstiler

Klikk en seksjon for å åpne stilpanelet. Du kan angi:

- **Bakgrunn** -- Solid farge, gradient eller bilde
- **Polstring** -- Topp- og bundavstand inne i seksjonen
- **Bredde** -- Helfull-bredde eller sentrert/inneholdt

### Elementstiler

Klikk et element for å åpne stilpanelet. Vanlige alternativer inkluderer skriftstørrelse, farge, justering, margin og polstring. For bilder kan du sette alternativ tekst og koblemål.

### Egendefinert CSS

For avansert styling, hver seksjon og element har et **egendefinert CSS**-felt hvor du kan skrive dine egne CSS-regler. Disse er avgrenset til det elementet, så de vil ikke utilsiktet påvirke resten av siden.

:::tip
Hvis du trenger å bruke stiler på hele nettstedet -- som en egendefinert skrift eller global farge -- bruk [Utseende](appearance)-innstillinger i stedet for egendefinert CSS på individuelle sider.
:::

## Forhåndsvisning av siden din

Bruk forhåndsvisningskontrollene i verktøyslinja for å sjekke hvordan siden din ser ut i ulike skjermstørrelser:

- **Skrivebord** -- Full-bredde nettlesersyn
- **Mobil** -- Smaltelefonstørrelses syn

Klikk **Forhåndsvisning** for å åpne en live-versjon av siden i en ny nettleserfane, nøyaktig som besøkende vil se det.

## Angre endringer

Editoren sporer redigeringshistorikken automatisk. Bruk verktøylinjeknapperene eller tastaturgenveiene for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Tilbakestill siste handling
- **Gjenta** (Ctrl+Y / Cmd+Y) -- Bruk en angret handling på nytt

Du kan også gjenopprette siden til et tidligere øyeblikk. Klikk **Historikk** i verktøyslinja for å se en liste over lagrede øyeblikk med beskrivelser, og klikk en hvilken som helst post for å gjenopprette til det punktet.

:::warning
Gjenoppretting av et øyeblikk erstattar gjeldende sideinnhold med øyeblikksversjonen. Dette kan ikke angres med standardangre-knappen. Lagre et øyeblikk av gjeldende tilstand før du gjenoppretter en gammel hvis du vil beholde muligheten til å vende tilbake.
:::

## Lagring av arbeidet ditt

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøyslinja viser om endringene er lagret. Du kan også klikke **Lagre** når som helst for å tvinge en lagring.

## Relaterte artikler

- [Administrering av sider](managing-pages) -- Opprett sider, angi URL-er og administrer nettstedsnavigasjon
- [Utseende](appearance) -- Angi nettstedets farger, skrifter og merkvaringstil
- [Filer](files) -- Last opp bilder og dokumenter for bruk i editoren
- [Opprett skjemaer](../forms/creating-forms) -- Lag skjemaer du kan legge inn på sider
