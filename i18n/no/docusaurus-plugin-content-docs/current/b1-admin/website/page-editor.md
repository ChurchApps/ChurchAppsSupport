---
title: "Bruke sideredigereren"
---

# Bruke sideredigereren

<div class="article-intro">

B1-sideredigereren er en visuell dra-og-slipp-bygger som lar deg designe kirkenettstedssidene dine uten å skrive kode. Du kan legge til seksjoner og innholdsblokker, tilpasse stiler, forhåndsvise arbeidet ditt og angre endringer -- alt fra nettleseren din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [Innledende oppsett](initial-setup) for å få nettstedet ditt konfigurert
- Opprett minst én side i [Administrere sider](managing-pages)
- Du trenger **content.edit**-tillatelsen for å få tilgang til editoren

</div>

## Åpne editoren

1. I B1 Admin, klikk **Nettsted** i venstre meny.
2. Finn siden du vil redigere i Sider-tabellen og klikk **Rediger**.

Editoren åpnes i fullskjermmodus. Venstre panel viser sidestrukturen og tilgjengelige innholdselementer; senterområdet viser en live forhåndsvisning av siden din.

:::info
Editoren vises alltid i lys modus, uavhengig av B1 Admin-temainnstillingen din. Dette sikrer at forhåndsvisningen nøyaktig matcher hvordan siden din vil se ut for nettstedbesøkende.
:::

## Sidestruktur: Seksjoner og elementer

Hver side er bygget fra to nivåer:

- **Seksjoner** -- Toppnivåbeholderne som deler siden din inn i horisontale bånd (for eksempel en hero-seksjon, en innholdsblokk eller en bunntekststrimmel). Hver side må ha minst én seksjon før du kan legge til innhold.
- **Elementer** -- De individuelle innholdsbitene plassert inne i en seksjon, som tekst, bilder, knapper, kort, skjemaer og kalendere.

### Legge til en seksjon

1. Klikk **Legg til seksjon** (eller **+**-knappen øverst i venstre panel).
2. Velg en layout for seksjonen din -- alternativer inkluderer enkelt kolonne, to kolonner, tre kolonner og mer.
3. Den nye seksjonen vises i forhåndsvisningen. Klikk på den for å velge den og konfigurere bakgrunnsfarge, padding og andre stilalternativer.

### Legge til elementer i en seksjon

1. Klikk inne i en seksjon i forhåndsvisningen for å velge den.
2. Klikk **Legg til innhold** og velg en elementtype fra listen:
   - **Tekst** -- Overskrifter, avsnitt og rik tekst
   - **Bilde** -- Last opp eller lenke til et foto
   - **Knapp** -- En klikkbar handlingsoppfordringslenke
   - **Kort** -- Et bilde med tittel og beskrivelse
   - **Skjema** -- Bygg inn et [skjema](../forms/creating-forms) direkte på siden
   - **Kalender** -- Vis en hendelseskalender
   - **FAQ** -- Trekkspill-stil spørsmål og svar-blokker
   - **Video** -- Bygg inn en video etter URL
3. Konfigurer elementet ved hjelp av innstillingspanelet som vises.

### Omorganisere innhold

Dra seksjoner eller elementer ved hjelp av håndtaksikonet (seks prikker) på venstre side av hvert element for å omorganisere dem. Du kan dra elementer innenfor en seksjon eller flytte dem mellom seksjoner.

## Stile siden din

### Seksjonsstiler

Klikk på en hvilken som helst seksjon for å åpne stilpanelet. Du kan sette:

- **Bakgrunn** -- Ensfarget, gradient eller bilde
- **Padding** -- Topp- og bunnav stand inne i seksjonen
- **Bredde** -- Full bredde eller sentrert/inneholdt

### Elementstiler

Klikk på et hvilket som helst element for å åpne stilpanelet. Vanlige alternativer inkluderer fontstørrelse, farge, justering, margin og padding. For bilder kan du sette alt-tekst og lenkemål.

### Tilpasset CSS

For avansert styling har hver seksjon og element et **Tilpasset CSS**-felt hvor du kan skrive dine egne CSS-regler. Disse er begrenset til det elementet, så de vil ikke utilsiktet påvirke resten av siden.

:::tip
Hvis du trenger å bruke stiler på tvers av hele nettstedet -- som en tilpasset font eller global farge -- bruk [Utseende](appearance)-innstillingene i stedet for tilpasset CSS på individuelle sider.
:::

## Forhåndsvise siden din

Bruk forhåndsvisningskontrollene i verktøylinjen for å sjekke hvordan siden din ser ut ved forskjellige skjermstørrelser:

- **Desktop** -- Fullbredde nettleservisning
- **Mobil** -- Smal telefonstørrelse visning

Klikk **Forhåndsvisning** for å åpne en live versjon av siden i en ny nettleserfane, nøyaktig som besøkende vil se den.

## Angre endringer

Editoren sporer redigeringshistorikken din automatisk. Bruk verktøylinjeknappene eller tastatursnarveer for å navigere:

- **Angre** (Ctrl+Z / Cmd+Z) -- Reverser siste handling
- **Gjør om** (Ctrl+Y / Cmd+Y) -- Bruk om igjen en angret handling

Du kan også gjenopprette siden til et tidligere øyeblikksbilde. Klikk **Historikk** i verktøylinjen for å se en liste over lagrede øyeblikksbilder med beskrivelser, og klikk en hvilken som helst oppføring for å gjenopprette til det punktet.

:::warning
Å gjenopprette et øyeblikksbilde erstatter gjeldende sideinnhold med øyebl

ikksbildeversjonen. Dette kan ikke angres med standard angre-knapp. Lagre et øyeblikksbilde av nåværende tilstand før du gjenoppretter et gammelt hvis du vil beholde muligheten til å returnere.
:::

## Lagre arbeidet ditt

Endringer lagres automatisk mens du arbeider. En statusindikator i verktøylinjen viser om endringene dine er lagret. Du kan også klikke **Lagre** når som helst for å tvinge en lagring.

## Relaterte artikler

- [Administrere sider](managing-pages) -- Opprett sider, sett URLer og administrer nettstednavigasjon
- [Utseende](appearance) -- Sett nettstedsomfattende farger, fonter og merkevarebygging
- [Filer](files) -- Last opp bilder og dokumenter for bruk i editoren
- [Opprette skjemaer](../forms/creating-forms) -- Bygg skjemaer du kan bygge inn på sider
