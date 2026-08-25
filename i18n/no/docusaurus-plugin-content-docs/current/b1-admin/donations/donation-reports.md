---
title: "Donasjonsrapporter"
---

# Donasjonsrapporter

<div class="article-intro">

B1 Admin gir deg flere måter å se og analysere kirkens givingsdata. Donasjoner Summary-siden gir en visuell oversikt med diagrammer og filtre, mens Reports-seksjonen tilbyr en mer detaljert Donation Summary-rapport. Bruk disse verktøyene til å spore givingtrender, forberede deg til styremøter, eller forene dine oppføringer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at donasjoner har blitt [registrert i batches](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Verifiser at [fondene dine](funds.md) er satt opp riktig slik at donasjoner kategoriseres korrekt

</div>

## Giving Dashboard

**Giving Dashboard** er det første du ser når du åpner **Donations**-seksjonen. Det gir en høy oversikt over givingsaktiviteten din med nøkkelindikatorer.

1. Åpne **seksjonsmenyen** i øvre venstre hjørne og velg **Donations** for å åpne dashboardet.
2. Øverst viser fire **KPI-kort** givingsmetrikker dine på et øyeblikk:
   - **Total Giving** -- Det totale beløpet donert i den valgte perioden.
   - **Average Gift** -- Gjennomsnittlig donasjonsbeløp.
   - **Unique Donors** -- Antall distinkte personer som ga.
   - **Total Donations** -- Det totale antallet individuelle donasjoner.
3. Bruk **period toggle** for å bytte mellom **Weekly**, **Monthly**, og **Quarterly** visninger.
4. Under KPI-ene vises et diagram som viser givingtrender for den valgte perioden.
5. Klikk **Download** for å eksportere en CSV-fil med givingtotaler.

## Donations Summary Page

**Summary**-siden gir mer detaljerte aggregerte givingsdata.

1. Åpne **seksjonsmenyen** i øvre venstre hjørne og velg **Donations** for å åpne Summary-siden.
2. Bruk **date range filter** for å velge tidsperioden du vil gjennomgå. Sett den tidligere datoen øverst og den mer nylige datoen nederst.
3. Siden viser et ukentlig givingsdiagram slik at du kan se trender på et øyeblikk.
4. Klikk **Download** for å eksportere en CSV-fil med det totale beløpet gitt, uken det ble gitt, og fondet det ble gitt til.

:::info
Summary-siden viser aggregerte givingsdata. Den inkluderer ikke individuelle donornavn. For detaljer på donornivå, bruk [Batches](batches.md)-siden.
:::

## Visning av donordetaljer på donorivå

For en oversikt over hvem som ga, hvor mye og til hvilket fond:

1. Naviger til **Donations > Batches**.
2. Klikk på et **batch-navn** for å åpne det.
3. Batch-detaljesiden viser hver donasjon med donorens navn, beløp, fond, dato og betalingsmåte.
4. Klikk på et **donornavn** for å se en oversikt over hvor mange ganger de donerte og hvor mye hver gang.
5. Klikk på en **donation ID** for å åpne et sidepanel med hele detaljer for den individuelle donasjonen.
6. Klikk **Download** for å eksportere en CSV med all donor- og donasjonsinfo for det batchet.

## Donation Summary Report

Donasjonsrapportering er bygget direkte inn i Donations-seksjonen -- Summary-siden fungerer som donasjonssammendrags rapport:

1. Åpne **seksjonsmenyen** i øvre venstre hjørne og velg **Donations** for å åpne Summary-siden.
2. Bruk **date range filter** for å velge perioden du vil rapportere for.
3. Klikk **Download** for å eksportere rapporten som en CSV-fil.

## Eksportering av data

Du kan eksportere donasjonsdata fra flere steder:

- **Summary page** -- last ned en CSV med ukentlige givingtotaler etter fond
- **Batch detail page** -- last ned en CSV med individuelle donasjoner med donordetaljer
- **Funds detail page** -- last ned donasjonshistorikk for et spesifikt fond

:::tip
For årsavslutningsrapportering kombinerer du Summary-side eksporten med [Giving Statements](giving-statements.md)-verktøyet for å få både aggregerte trender og individuelle donoroppgaver.
:::

## Neste steg

- Generer [Giving Statements](giving-statements.md) for donnorene dine ved årets slutt
- Gjennomgå individuelle [batches](batches.md) for å verifisere donasjonsdetaljer
- Sjekk [fond](funds.md) detaljesider for givingssammendelinger etter kategori
