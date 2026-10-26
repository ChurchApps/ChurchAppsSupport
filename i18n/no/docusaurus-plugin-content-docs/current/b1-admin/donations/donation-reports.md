---
title: "Givningsrapporter"
---

# Givningsrapporter

<div class="article-intro">

B1 Admin gir deg flere måter å se på og analysere menighetens givningsdata. Givningsdashbordet på siden **Sammendrag** under Gaver gir en visuell oversikt med diagrammer og filtre, mens delen Rapporter tilbyr en mer detaljert rapport over gaver (Gavesammendrag). Bruk disse verktøyene til å følge givningstrender, forberede styremøter eller avstemme registreringene dine.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at gaver er [registrert i bunter](recording-donations.md) eller [importert fra Stripe](stripe-import.md)
- Kontroller at [fondene](funds.md) dine er riktig satt opp, slik at gavene blir riktig kategorisert

</div>

## Givningsdashbord

Givningsdashbordet er visningen **Dashbord** på siden **Sammendrag**, som er den første siden du ser når du åpner delen **Gaver**.

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Gaver** og klikk **Sammendrag**. Siden **Sammendrag** åpnes i visningen **Dashbord**. Bryteren **Visning** øverst til høyre veksler mellom **Dashbord** og **Givere som har sluttet**.
2. Bruk bryterne **Ukentlig**, **Månedlig** og **Kvartalsvis** over rapporten for å velge hvordan givningen skal grupperes.
3. I panelet **Filtrer rapport** angir du **startdato** og **sluttdato** (som standard fra ett år tilbake til i går), og velger eventuelt et **fond**, og klikker deretter **Kjør rapport**. Rapporten kjøres automatisk med standardverdiene når siden åpnes.
4. Fire **nøkkeltallskort** viser givningstallene dine for det valgte intervallet:
   - **Total givning** -- Det totale beløpet som er gitt.
   - **Gjennomsnittlig gave** -- Gjennomsnittlig gavebeløp.
   - **Unike givere** -- Antall ulike personer som ga.
   - **Totalt antall gaver** -- Det totale antallet enkeltgaver.
5. Under nøkkeltallene viser et søylediagram givningen per uke, måned eller kvartal, fordelt på fond.
6. Klikk **Nedlastingsalternativer** og velg **Sammendrag** for å eksportere en CSV-fil med summene per periode og fond, eller klikk skriverikonet for å skrive ut rapporten. Menighetens logo (**Logo for lys bakgrunn** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) og navn vises sentrert øverst på den utskrevne rapporten. Utskriften bruker mørk tekst og et lyst diagram, selv om du bruker B1 Admin i mørk modus.

Hvis gavene i perioden ble gitt i mer enn én valuta, omregnes nøkkeltallene til menighetens valuta, og en merknad **Omregnet etter dagens valutakurser** vises under kortene. Se [Støtte for flere valutaer](./multi-currency.md#converted-totals) for detaljer.

:::info
Dashbordet viser samlede givningsdata. Det inkluderer ikke navnene på enkeltgivere. For detaljer per giver bruker du siden [Bunter](batches.md).
:::

## Givere som har sluttet

Velg **Givere som har sluttet** i bryteren **Visning** for å liste opp personer som ga i én periode, men ikke siden. Som standard sammenlignes forrige kalenderår med hittil i år; endre begge datointervallene for å utvide eller snevre inn søket. Hver rad viser personen, datoen for den siste gaven og summen for den tidligere perioden, og **Nedlastingsalternativer > Sammendrag** laster ned listen som en CSV-fil, for eksempel som en utsendelsesliste eller ringeliste for oppfølging.

## Vise detaljer per giver

For en oversikt over hvem som ga, hvor mye og til hvilket fond:

1. Gå til **Gaver > Bunter**.
2. Klikk på et **buntnavn** for å åpne det.
3. Detaljsiden for buntet lister opp hver gave med metoden (og sjekknummer eller kortsifre), giverens navn, dato, notater og beløp, med en total nederst.
4. Klikk **Rediger** på en gaverad for å åpne alle detaljene for den enkelte gaven, inkludert fondet.
5. Klikk **Eksporter** over listen for å laste ned en CSV-fil med all giver- og gaveinformasjon for buntet.

## Sammendragsrapport over gaver

Rapportering av gaver er innebygd i delen Gaver -- siden Sammendrag fungerer som din sammendragsrapport over gaver:

1. I Hurtigmenyen velger du **Gaver > Sammendrag**.
2. I visningen **Dashbord** angir du **startdato** og **sluttdato** i panelet **Filtrer rapport** og klikker **Kjør rapport**.
3. Klikk **Nedlastingsalternativer** og velg **Sammendrag** for å eksportere rapporten som en CSV-fil.

## Eksportere data

Du kan eksportere gavedata fra flere steder:

- **Siden Sammendrag** -- last ned en CSV-fil med givningssummer per uke, måned eller kvartal og fond
- **Detaljsiden for bunt** -- last ned en CSV-fil med enkeltgaver og giverdetaljer
- **Detaljsiden for fond** -- last ned gavehistorikken for et bestemt fond

:::tip
For rapportering ved årsslutt kan du kombinere eksporten fra siden Sammendrag med verktøyet [Givertjenester](giving-statements.md) for å få både samlede trender og individuelle giveroppgaver.
:::

## Neste steg

- Lag [Givertjenester](giving-statements.md) for giverne dine ved årsslutt
- Gjennomgå enkelte [bunter](batches.md) for å kontrollere gavedetaljene
- Sjekk detaljsidene for [fond](funds.md) for oversikt over givning per kategori
