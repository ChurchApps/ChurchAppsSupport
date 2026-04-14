---
title: "Donasjonsrapporter"
---

# Donasjonsrapporter

<div class="article-intro">

B1 Admin gir deg flere måter å vise og analysere givingsdataene til kirken. Giving Dashboard-siden gir et visuelt oversikt med diagrammer og filtre, mens Rapporter-delen tilbyr en mer detaljert Donasjonsoversikt-rapport. Bruk disse verktøyene for å spore givingtrender, forberede deg til styremøter eller samsvare postene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sikre at donasjoner har blitt [registrert i partier](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Verifiser at [fondene dine](funds.md) er satt opp korrekt slik at donasjoner blir riktig kategorisert

</div>

## Giving Dashboard

**Giving Dashboard** er det første du ser når du klikker **Donasjoner** i sidestolpen. Det gir et høynivåoversikt over givingsaktiviteten din med nøkkelindikatorer.

1. Gå til **Donasjoner** i sidestolpen for å åpne dashbordet.
2. På toppen viser fire **KPI-kort** givingsmetrikker på et øyeblikk:
   - **Total giving** -- Det totale beløpet som ble donert i den valgte perioden.
   - **Gjennomsnittlig gave** -- Det gjennomsnittlige donasjonsbeløpet.
   - **Unike givere** -- Antallet distinkte personer som ga.
   - **Totale donasjoner** -- Totalt antall individuelle donasjoner.
3. Bruk **periodeknappen** for å bytte mellom **Ukentlig**, **Månedlig** og **Kvartalsvis** visninger.
4. Under KPI-ene viser et diagram givingtrender for den valgte perioden.
5. Klikk **Last ned** for å eksportere en CSV-fil med givingtotaler.

## Donasjonssammendragside

**Sammendrag**-siden gir mer detaljert samlet givingsdata.

1. Gå til **Donasjoner** i sidestolpen for å åpne Sammendrag-siden.
2. Bruk **datoområdefilteret** for å velge tidsperioden du vil gjennomgå. Angi den tidligere datoen på toppen og den mer nylige datoen på bunnen.
3. Siden viser et ukentlig givingsdiagram slik at du kan se trender på et øyeblikk.
4. Klikk **Last ned** for å eksportere en CSV-fil med det totale beløpet som ble gitt, uken det ble gitt og fondet det ble gitt til.

:::info
Sammendrag-siden viser samlet givingsdata. Den inkluderer ikke individuelle givernavn. For givernivådetaljer, bruk [Partier](batches.md)-siden.
:::

## Visning av giverspesifikke detaljer

For en fordeling av hvem som ga, hvor mye og til hvilket fond:

1. Gå til **Donasjoner > Partier**.
2. Klikk på et **partisnavn** for å åpne det.
3. Partierdetaljsiden viser hver donasjon med giverens navn, beløp, fond, dato og betalingsmåte.
4. Klikk på en **givers navn** for å se en fordeling av hvor mange ganger de donerte og hvor mye hver gang.
5. Klikk på en **donasjon-ID** for å åpne en sidepanel med fullstendige detaljer for den individuelle donasjonen.
6. Klikk **Last ned** for å eksportere en CSV med all giver- og donasjonsopplysninger for det partiet.

## Donasjonssammendragsrapport

B1 Admin inkluderer også en **Donasjonssammendrag**-rapport i Rapporter-delen:

1. Klikk **Rapporter** i sidestolpen.
2. Velg **Donasjonssammendrag**-rapporten.
3. Velg filtrene dine (datoområde, fond, campus osv.) og kjør rapporten.

## Eksportering av data

Du kan eksportere donasjonsdata fra flere steder:

- **Sammendrag-siden** -- last ned en CSV av ukentlige givingtotaler etter fond
- **Partidetaljside** -- last ned en CSV av individuelle donasjoner med giverdetaljer
- **Fonddetaljside** -- last ned donasjonshistorikk for et spesifikt fond

:::tip
For årssluttrapportering, kombiner Sammendrag-siden-eksporten med [Givingerklæringer](giving-statements.md)-verktøyet for å få både samlet trender og individuelle givererklæringer.
:::

## Neste trinn

- Generer [Givingerklæringer](giving-statements.md) for giverne dine ved årsslutting
- Gjennomgå individuelle [partier](batches.md) for å verifisere donasjonsdetaljer
- Sjekk [fond](funds.md)-detaljsidene for givingsfordelinger etter kategori
