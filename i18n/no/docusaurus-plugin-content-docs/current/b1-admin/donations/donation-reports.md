---
title: "Gaverapporter"
description: "Gjennomgå givertall, givere som har sluttet å gi, og detaljer på batchnivå i B1 Admin med oversiktspanelet for gaver, visningen Lapsed Givers og CSV-eksporter."
---

# Gaverapporter

<div class="article-intro">

B1 Admin gir deg flere måter å se på og analysere menighetens givedata. Giving-oversikten på siden **Summary** under Gaver gir et visuelt sammendrag med diagrammer og filtre, mens rapportdelen tilbyr en mer detaljert rapport over gaver. Bruk disse verktøyene til å følge givertrender, forberede styremøter eller avstemme registreringene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at gaver er [registrert i batcher](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Kontroller at dine [fond](funds.md) er riktig satt opp, slik at gavene blir kategorisert riktig

</div>

## Giving-oversikt {#giving-dashboard}

Giving-oversikten er visningen **Dashboard** på siden **Summary**, den første siden du ser når du åpner **Donations**-seksjonen.

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Donations** og klikk **Summary**. Siden **Summary** åpnes i visningen **Dashboard**. Bryteren **View** øverst til høyre veksler mellom **Dashboard** og **Lapsed Givers**.
2. Bruk bryterne **Weekly**, **Monthly** og **Quarterly** over rapporten for å velge hvordan gavene skal grupperes.
3. I panelet **Filter Report** angir du **Start Date** og **End Date** (som standard siste år frem til i går), og velger eventuelt et **Fund**, og klikker deretter **Run Report**. Rapporten kjøres automatisk med standardverdiene når siden åpnes.
4. Fire **KPI-kort** viser nøkkeltallene for valgt periode:
   - **Total Giving** – totalt donert beløp.
   - **Average Gift** – gjennomsnittlig gavebeløp.
   - **Unique Donors** – antall ulike personer som ga.
   - **Total Donations** – totalt antall enkeltgaver.
5. Under nøkkeltallene viser et søylediagram giving per uke, måned eller kvartal, fordelt på fond.
6. Klikk **Download Options** og velg **Summary** for å eksportere en CSV med summene per periode og fond, eller klikk utskriftsikonet for å skrive ut rapporten. Menighetens logo (**Light Background Logo** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) og navn vises midtstilt øverst på den utskrevne rapporten. Utskriften bruker mørk tekst og en lys graf, selv om du bruker B1 Admin i mørk modus.

Hvis gavene i perioden ble gitt i mer enn én valuta, omregnes nøkkeltallene til menighetens valuta, og en merknad **Converted at current exchange rates** vises under kortene. Se [Flervalutastøtte](./multi-currency.md#converted-totals) for detaljer.

:::info
Oversikten viser samlede givedata. Den inneholder ikke navnene på enkeltgivere. For detaljer på givernivå bruker du siden [Batcher](batches.md).
:::

## Lapsed Givers {#lapsed-givers}

Velg **Lapsed Givers** i bryteren **View** for å liste personer som ga i én periode, men ikke siden. Som standard sammenlignes forrige kalenderår med inneværende år så langt; endre **Previous Period Start**, **Previous Period End**, **Current Period Start** eller **Current Period End** i panelet **Filter Report** og klikk **Run Report** for å utvide eller snevre inn søket. Denne visningen krever tillatelsen **View Donations**. Hver rad viser personen, datoen for den siste gaven og summen for den tidligere perioden, og **Download Options > Summary** laster ned listen som CSV til en oppfølgingsutsending eller ringeliste.

## Se detaljer på givernivå {#viewing-donor-level-details}

For en oversikt over hvem som ga, hvor mye, og til hvilket fond:

1. Gå til **Donations > Batches**.
2. Klikk på et **batchnavn** for å åpne det.
3. Detaljsiden for batchen lister hver gave med metode (og sjekknummer eller kortsiffer), giverens navn, dato, notater og beløp, med en totalsum nederst.
4. Klikk **Edit** på en gaverad for å åpne alle detaljene for den enkelte gaven, inkludert fondet.
5. Klikk **Export** over listen for å laste ned en CSV med all giver- og gaveinformasjon for batchen.

## Gaverapport {#donation-summary-report}

Gaverapportering er innebygd i Gaver-seksjonen – siden Summary fungerer som gaverapporten din:

1. I hurtigmenyen velger du **Donations > Summary**.
2. I visningen **Dashboard** angir du **Start Date** og **End Date** i panelet **Filter Report** og klikker **Run Report**.
3. Klikk **Download Options** og velg **Summary** for å eksportere rapporten som en CSV-fil.

## Eksportere data {#exporting-data}

Du kan eksportere givedata fra flere steder:

- **Siden Summary** – last ned en CSV med givertotaler per uke, måned eller kvartal og fond
- **Detaljsiden for batch** – last ned en CSV med enkeltgaver og giverdetaljer
- **Detaljsiden for fond** – last ned gavehistorikken for et bestemt fond

:::tip
Til årsrapportering kan du kombinere eksporten fra siden Summary med verktøyet [Giving Statements](giving-statements.md) for å få både samlede trender og gaveoversikter for enkeltgivere.
:::

## Neste steg {#next-steps}

- Lag [gaveoversikter](giving-statements.md) for givere ved årsslutt
- Gå gjennom enkelte [batcher](batches.md) for å kontrollere gavedetaljene
- Sjekk detaljsidene for [fond](funds.md) for giving fordelt etter kategori
