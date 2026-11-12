---
title: "Gavebatcher"
description: "Grupper offergaver i gavebatcher i B1 Admin, og lukk, skriv ut eller eksporter hver enkelt slik at summene stemmer med bankinnskuddene dine."
---

# Gavebatcher

<div class="article-intro">

Batcher grupperer gavene dine sammen for enklere sporing og avstemming. En typisk batch representerer én innsamling, for eksempel en søndagsoffer eller et spesielt arrangement. Ved å bruke batcher holder du orden og gjør det enkelt å kontrollere at registreringene stemmer med de faktiske innskuddene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at du har [satt opp fondene dine](funds.md), slik at de er tilgjengelige når du registrerer gaver
- Du trenger tillatelsen **View Donation Summaries**, **Edit Donations** eller **Enter Donations** for å se siden Batcher (se [Hvem kan endre en batch](#who-can-change-a-batch))

</div>

## Siden Batcher {#the-batches-page}

Når du går til **Donations > Batches**, ser du en liste over batchene dine. Hver rad viser:

- **Name** – navnet du ga batchen
- **Date** – datoen for innsamlingen
- **Donations** – antall enkeltgaver i batchen
- **Total** – samlet beløp i dollar
- **Status** – **Open** eller **Closed** (se [Lukke og gjenåpne en batch](#closing-and-reopening-a-batch))

Over listen lar årsknapper deg vise bare batcher fra ett år, eller alle batcher med **All**. Et sammendrag på én linje viser antall batcher, antall gaver og totalbeløpet for batchene som vises.

## Opprette en ny batch {#creating-a-new-batch}

1. Klikk **Add Batch** øverst på siden.
2. Skriv inn et beskrivende navn (f.eks. «Søndagsoffer – 9. feb»). Navnet er valgfritt, men et tydelig navn gjør batchen lettere å finne senere.
3. Velg datoen for innsamlingen. Den starter med dagens dato.
4. Klikk **Save**.

Den nye batchen vises i listen, klar for at du kan legge til gaver.

## Arbeide med batcher {#working-with-batches}

- **Vise gaver** – klikk på navnet til en batch for å åpne den og se alle enkeltgavene den inneholder. Derfra kan du legge til, redigere eller fjerne gaver, eller klikke **Import CSV** for å legge til mange gaver på én gang fra et regneark (se [Importere gaver fra en CSV-fil](recording-donations.md#importing-donations-from-a-csv-file)).
- **Redigere batchdetaljer** – klikk på knappen **Edit** på en batchrad (eller **Edit Batch** øverst i en åpen batch) for å endre navnet eller datoen. Bare personer med **Edit Donations** ser **Delete** der. Å slette en batch fjerner gavene i den, og hvis du sletter den fra batchens egen side, kommer du tilbake til listen over batcher.
- **Sortere** – bruk kolonneoverskriftene for å sortere batcher etter navn eller dato.
- **Eksportere** – klikk **Export** øverst på siden for å laste ned batchene som vises, som et regneark (CSV).
- **Mislykkede hendelser** – hvis betalingsløsningen din har rapportert problemer, vises en knapp **Failed events** (med antall uløste hendelser) øverst på siden. Klikk på den for å vise eller skjule listen over hendelser under batchene.
- **Importere fra Stripe** – klikk **Import missing Stripe transactions** øverst på siden for å åpne verktøyet [Stripe-import](stripe-import.md). Knappen vises bare når menighetens giveløsning er Stripe.

## Hvem som registrerte hver gave {#who-entered-each-gift}

Hver gave som er lagt inn i en batch, viser **Entered by** og personens navn under giverens navn, slik at du kan se hvem som registrerte den uten en signaturliste. B1 registrerer dette automatisk ut fra hvem som er innlogget, og hvis du redigerer gaven senere, endres det ikke. Gaver som er hentet inn med **Import CSV**, viser personen som kjørte importen.

Nettgaver, gaver lagt til med verktøyet [Stripe-import](stripe-import.md), og gaver som ble registrert før dette ble lagt til i november 2026, viser ikke et navn.

## Lukke og gjenåpne en batch {#closing-and-reopening-a-batch}

Når en batch er talt opp og innsatt, lukker du den slik at gavene forblir nøyaktig som de var da du lukket den.

1. Åpne batchen.
2. Klikk **Close Batch** øverst på siden.

Statusmerket ved siden av batchnavnet endres fra **Open** til **Closed**, batchen viser **Closed** i kolonnen **Status** på siden Batcher, og en melding øverst i batchen forklarer at den er lukket. Mens en batch er lukket, kan personer med **Enter Donations** fortsatt se den, men de kan ikke legge til, redigere eller slette gavene i den, eller endre navnet eller datoen til batchen.

For å gjøre endringer igjen åpner du batchen og klikker **Reopen Batch**. Nye batcher starter alltid åpne.

:::info
Bare personer med **Edit Donations** ser knappene **Close Batch** og **Reopen Batch**. De kan også fortsatt endre gaver i en lukket batch hvis det trengs en rettelse, uten å gjenåpne den.
:::

## Hvem kan endre en batch {#who-can-change-a-batch}

To [rolletillatelser](../settings/roles-permissions.md) lar noen arbeide med batcher:

- **Edit Donations** – full tilgang: legge til og slette batcher, lukke og gjenåpne dem, og legge til, redigere eller slette alle gaver, enten batchen er åpen eller lukket.
- **Enter Donations** – for telleteam og frivillige som registrerer offergaver. De kan legge til batcher og legge til, redigere eller slette gaver, men bare mens batchen er åpen. De kan ikke slette batcher, lukke eller gjenåpne dem, eller endre gaver som er kommet inn via nettbasert giving.

Noen med **Enter Donations** men uten **View Donation Summaries** ser **Donations** i B1 Admin-menyen, som går rett til siden Batcher. **Summary**, **Funds**, **Campaigns** og **Giving Statements** er skjult for dem. For å åpne en batch og se gavene i den, må rollen også ha **View Donations**.

:::tip
Et vanlig oppsett er en rolle «Telleteam» med **Enter Donations** og **View Donations**, og en kasserer med **Edit Donations** som lukker hver batch når innskuddet er avstemt.
:::

## Skrive ut en batch {#printing-a-batch}

Åpne en batch og klikk **Print** over gavelisten for å skrive ut en papirkopi til telleteamet eller til innskuddsarkivet ditt. Utskriften inneholder:

- Menighetens brevhode – logoen din (**Light Background Logo** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) med menighetens navn under, deretter batchnavnet og batchdatoen
- Alle gaver i batchen, med giverens navn, hvem som registrerte den, metode, notater, dato og beløp (refunderte gaver er streket over og merket som refundert)
- **Fund Subtotals** – summen som er gitt til hvert fond i batchen
- **Batch Total** – det samlede beløpet for hele batchen

Knappen **Print** vises først når batchen har minst én gave.

### Skrive ut flere batcher samtidig {#printing-several-batches-at-once}

For å skrive ut alle batcher fra en periode på én gang – for eksempel alle innskuddene fra forrige måned – klikker du **Print** øverst på siden **Batches**, ved siden av **Export**. Siden **Print Batches** åpnes med en **Start Date** og **End Date** som samsvarer med batchene på skjermen: 1. januar til 31. desember for året du valgte, eller fra den tidligste til den seneste batchdatoen når **All** er valgt. Endre en av datoene for å velge et annet tidsrom.

Alle batcher med dato innenfor perioden (inkludert start- og sluttdato) skrives ut i datorekkefølge, én batch per side, med samme oppsett som for en enkeltbatch. Batcher uten gaver utelates, og hvis ingen av batchene i perioden har gaver, ser du meldingen «No batches with donations in this date range.». Klikk **Print** for å åpne nettleserens utskriftsdialog, eller **Close** for å gå tilbake til listen over batcher.

## Eksportere en batch til QuickBooks Online {#exporting-a-batch-to-quickbooks-online}

Åpne en batch og klikk **Export for QuickBooks** for å laste ned batchen som et journalbilag som QuickBooks Online kan importere (**Settings > Import Data > Journal Entries**). Filen inneholder én debet til **Undeposited Funds** for batchens totalbeløp og én kredit per fond, med fondets navn som kontonavn. QuickBooks ber deg matche disse navnene med kontoplanen din under importen. Gi derfor fondene dine samme navn som regnskapsføreren din bruker for inntektskontoene, eller sett opp koblingen en gang ved import.

:::tip
Gi batchene dine konsekvente navn, slik at de er lette å finne senere. Å ta med dato og type innsamling (f.eks. «Søndag formiddag – 2025-02-09») holder listen din ryddig etter hvert som den vokser.
:::

## Neste steg {#next-steps}

Når du har en batch, se [Registrere gaver](recording-donations.md) for å lære hvordan du legger til enkeltgaver i den. Du kan også [importere Stripe-transaksjoner](stripe-import.md) for automatisk å opprette batcher fra nettbasert giving.
