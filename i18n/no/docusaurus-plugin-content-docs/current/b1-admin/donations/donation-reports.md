---
title: "Donasjonsrapporter"
---

# Donasjonsrapporter

<div class="article-intro">

B1 Admin gir deg flere måter å se på og analysere menighetens givingdata. Givingdashbordet på **Oppsummering**-siden under Donasjoner gir en visuell oversikt med diagrammer og filtre, mens Rapporter-delen har en mer detaljert donasjonsoppsummering. Bruk disse verktøyene til å følge utviklingen i giving, forberede styremøter eller avstemme registreringene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Pass på at donasjoner er [registrert i gavebunter](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Kontroller at [fondene](funds.md) dine er riktig satt opp, slik at donasjonene blir kategorisert riktig

</div>

## Givingdashbord

Givingdashbordet er visningen **Dashbord** på **Oppsummering**-siden, som er den første siden du ser når du åpner **Donasjoner**-delen.

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Donasjoner** og klikk på **Oppsummering**. **Oppsummering**-siden åpnes i visningen **Dashbord**. Bryteren **Visning** øverst til høyre veksler mellom **Dashbord** og **Givere som har sluttet å gi**.
2. Bruk bryteren **Ukentlig**, **Månedlig** og **Kvartalsvis** over rapporten for å velge hvordan givingen grupperes.
3. I panelet **Filtrer rapport** angir du **startdato** og **sluttdato** (som standard det siste året frem til i går) og kan velge et **fond**, og klikker deretter på **Kjør rapport**. Rapporten kjøres automatisk med standardverdiene når siden åpnes.
4. Fire **KPI-kort** viser givingtallene for det valgte tidsrommet:
   - **Total giving** -- Det totale donerte beløpet.
   - **Gjennomsnittlig gave** -- Det gjennomsnittlige donasjonsbeløpet.
   - **Unike givere** -- Antall forskjellige personer som har gitt.
   - **Totalt antall donasjoner** -- Det totale antallet enkeltdonasjoner.
5. Under KPI-ene viser et stolpediagram giving per uke, måned eller kvartal, fordelt på fond.
6. Klikk på **Nedlastingsalternativer** og velg **Oppsummering** for å eksportere en CSV med totaler per periode og fond, eller klikk på utskriftsikonet for å skrive ut rapporten. Menighetens navn vises øverst på den utskrevne rapporten.

Hvis donasjonene i perioden er gitt i mer enn én valuta, blir KPI-totalene omregnet til menighetens valuta, og en merknad, **Omregnet til gjeldende vekslingskurs**, vises under kortene. Se [Støtte for flere valutaer](./multi-currency.md#converted-totals) for mer informasjon.

:::info
Dashbordet viser samlede givingdata. Det inneholder ikke navn på enkeltgivere. For detaljer på giver-nivå bruker du siden [Gavebunter](batches.md).
:::

## Givere som har sluttet å gi

Velg **Givere som har sluttet å gi** i bryteren **Visning** for å se personer som ga i én periode, men ikke siden. Som standard sammenlignes fjorårets kalenderår med inneværende år frem til i dag. Endre en av datoperiodene for å utvide eller snevre inn søket. Hver rad viser personen, datoen for siste gave og totalbeløpet for den tidligere perioden, og **Nedlastingsalternativer > Oppsummering** laster ned listen som en CSV til bruk i en oppfølgingsutsendelse eller ringeliste.

## Se detaljer på giver-nivå

For en oversikt over hvem som ga, hvor mye og til hvilket fond:

1. Gå til **Donasjoner > Gavebunter**.
2. Klikk på **navnet på en gavebunt** for å åpne den.
3. Detaljsiden for gavebunten viser hver donasjon med betalingsmetode (og sjekknummer eller kortsiffer), giverens navn, dato, notater og beløp, med en totalsum nederst.
4. Klikk på **Rediger** på en donasjonsrad for å åpne alle detaljer om den enkelte donasjonen, inkludert fondet.
5. Klikk på **Eksporter** over listen for å laste ned en CSV med all giver- og donasjonsinformasjon for den gavebunten.

## Donasjonsoppsummering

Donasjonsrapportering er bygget rett inn i Donasjoner-delen -- Oppsummering-siden fungerer som donasjonsoppsummeringen din:

1. Velg **Donasjoner > Oppsummering** i Jump-menyen.
2. I visningen **Dashbord** angir du **startdato** og **sluttdato** i panelet **Filtrer rapport** og klikker på **Kjør rapport**.
3. Klikk på **Nedlastingsalternativer** og velg **Oppsummering** for å eksportere rapporten som en CSV-fil.

## Eksportere data

Du kan eksportere donasjonsdata fra flere steder:

- **Oppsummering-siden** -- last ned en CSV med givingtotaler per uke, måned eller kvartal og fond
- **Detaljsiden for gavebunt** -- last ned en CSV med enkeltdonasjoner og giverdetaljer
- **Detaljsiden for fond** -- last ned donasjonshistorikken for et bestemt fond

:::tip
Til årsrapportering kan du kombinere eksporten fra Oppsummering-siden med verktøyet [Giveroppgaver](giving-statements.md), slik at du får både samlede trender og individuelle giveroppgaver.
:::

## Neste steg

- Lag [giveroppgaver](giving-statements.md) til giverne dine ved årsskiftet
- Gå gjennom enkeltstående [gavebunter](batches.md) for å kontrollere donasjonsdetaljene
- Se detaljsidene for [fond](funds.md) for en oversikt over giving fordelt på kategori
