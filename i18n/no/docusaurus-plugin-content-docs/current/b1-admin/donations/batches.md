---
title: "Giveroppgaver"
---

# Giveroppgaver

<div class="article-intro">

Batcher grupperer gavene dine for enklere sporing og avstemming. En typisk batch representerer én innsamling, for eksempel en søndagsoffer eller en spesiell hendelse. Ved å bruke batcher holder du oversikten og gjør det enkelt å kontrollere at registreringene dine stemmer med de faktiske innskuddene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at du har [satt opp fondene dine](funds.md), slik at de er tilgjengelige når du registrerer gaver
- Du trenger tillatelsen **Se donasjonssammendrag**, **Rediger donasjoner** eller **Registrer donasjoner** for å se siden Batcher (se [Hvem kan endre en batch](#who-can-change-a-batch))

</div>

## Batch-siden

Når du navigerer til **Donasjoner > Batcher**, ser du en liste over batcher. Hver rad viser:

- **Navn** – etiketten du ga batchen
- **Dato** – datoen for innsamlingen
- **Donasjoner** – antall enkeltgaver i batchen
- **Totalt** – det samlede beløpet i kroner
- **Status** – **Åpen** eller **Lukket** (se [Lukke og gjenåpne en batch](#closing-and-reopening-a-batch))

Over listen lar årsknapper deg vise bare batcher fra ett år, eller **Alle** batcher. En oppsummeringslinje viser antall batcher, antall gaver og totalbeløpet for batchene som vises.

## Opprette en ny batch

1. Klikk på **Legg til batch** øverst på siden.
2. Skriv inn et beskrivende navn (f.eks. «Søndagsoffer – 9. feb»).
3. Velg datoen for innsamlingen.
4. Klikk på **Lagre**.

Den nye batchen vises i listen, klar for at du kan legge til donasjoner.

## Arbeide med batcher

- **Vis donasjoner** – klikk på et batchnavn for å åpne den og se alle enkeltgavene den inneholder. Derfra kan du legge til, redigere eller fjerne donasjoner.
- **Rediger batchdetaljer** – klikk på knappen **Rediger** på en batchrad for å endre navn eller dato. Bare personer med **Rediger donasjoner** kan slette en batch.
- **Sorter** – bruk kolonneoverskriftene for å sortere batcher etter navn eller dato.
- **Eksporter** – klikk på **Eksporter** øverst på siden for å laste ned batchene som vises, som et regneark (CSV).
- **Mislykkede hendelser** – hvis betalingsleverandøren din har rapportert problemer, vises en knapp **Mislykkede hendelser** (med antall uløste hendelser) øverst på siden. Klikk på den for å vise eller skjule listen over hendelser under batchene.
- **Importer fra Stripe** – klikk på **Importer manglende Stripe-transaksjoner** øverst på siden for å åpne [Stripe-import](stripe-import.md)-verktøyet.

## Lukke og gjenåpne en batch {#closing-and-reopening-a-batch}

Når en batch er talt og satt inn på bankkontoen, lukk den slik at donasjonene forblir nøyaktig slik de var da du lukket den.

1. Åpne batchen.
2. Klikk på **Lukk batch** øverst på siden.

Statusmerket ved siden av batchnavnet endres fra **Åpen** til **Lukket**, batchen viser **Lukket** i kolonnen **Status** på siden Batcher, og en melding øverst i batchen forklarer at den er lukket. Mens en batch er lukket, kan personer med **Registrer donasjoner** fortsatt se den, men de kan ikke legge til, redigere eller slette donasjonene i den, eller endre batchens navn eller dato.

For å gjøre endringer igjen, åpner du batchen og klikker på **Gjenåpne batch**. Nye batcher starter alltid som åpne.

:::info
Bare personer med **Rediger donasjoner** ser knappene **Lukk batch** og **Gjenåpne batch**. De kan også fortsatt endre donasjoner i en lukket batch hvis det trengs en korreksjon, uten å gjenåpne den.
:::

## Hvem kan endre en batch {#who-can-change-a-batch}

To [rolletillatelser](../settings/roles-permissions.md) lar noen arbeide med batcher:

- **Rediger donasjoner** – full tilgang: legge til og slette batcher, lukke og gjenåpne dem, og legge til, redigere eller slette alle donasjoner, enten batchen er åpen eller lukket.
- **Registrer donasjoner** – for telleteam og frivillige som registrerer gaver. De kan legge til batcher og legge til, redigere eller slette donasjoner, men bare mens batchen er åpen. De kan ikke slette batcher, lukke eller gjenåpne dem, eller endre gaver som kom inn via nettgiving.

Noen med **Registrer donasjoner**, men uten **Se donasjonssammendrag**, ser **Donasjoner** i B1 Admin-menyen, som går rett til siden Batcher. **Sammendrag**, **Fond**, **Kampanjer** og **Giverbekreftelser** er skjult for dem. For å åpne en batch og se donasjonene i den, trenger rollen også **Se donasjoner**.

:::tip
Et vanlig oppsett er en rolle «Telleteam» med **Registrer donasjoner** og **Se donasjoner**, og en kasserer med **Rediger donasjoner** som lukker hver batch etter at innskuddet er avstemt.
:::

## Skrive ut en batch

Åpne en batch og klikk på **Skriv ut** over donasjonslisten for å skrive ut en papirkopi til telleteamet eller innskuddsregistrene dine. Utskriften inneholder:

- Menighetens navn, batchnavnet og batchdatoen
- Alle donasjoner i batchen, med giverens navn, metode, notater, dato og beløp (refunderte gaver er gjennomstreket og merket som refundert)
- **Fondsundersummer** – totalbeløpet gitt til hvert fond i batchen
- **Batchtotal** – det samlede beløpet for hele batchen

Knappen **Skriv ut** vises først når batchen har minst én donasjon.

### Skrive ut flere batcher samtidig

For å skrive ut alle batcher fra en periode på én gang – for eksempel alle innskudd fra forrige måned – klikker du på **Skriv ut** øverst på siden **Batcher**, ved siden av **Eksporter**. Siden **Skriv ut batcher** åpnes med en **Startdato** og **Sluttdato** som som standard dekker de siste 30 dagene. Endre en av datoene for å velge et annet intervall.

Hver batch datert innenfor intervallet (inkludert start- og sluttdatoen) skrives ut i datorekkefølge, én batch per side, med samme oppsett som en utskrift av en enkelt batch. Batcher uten donasjoner utelates, og hvis ingen av batchene i intervallet har donasjoner, ser du meldingen «Ingen batcher med donasjoner i dette datointervallet.» Klikk på **Skriv ut** for å åpne nettleserens utskriftsdialog, eller **Lukk** for å gå tilbake til batchlisten.

## Eksportere en batch til QuickBooks Online

Åpne en batch og klikk på **Eksporter for QuickBooks** for å laste den ned som en journalpost som QuickBooks Online kan importere (**Innstillinger > Importer data > Journalposter**). Filen inneholder én debet til **Undeposited Funds** for batchtotalen og én kredit per fond, med fondets navn som kontonavn. QuickBooks ber deg matche disse navnene med kontoplanen din under importen, så gi fondene navn slik regnskapsføreren din navngir inntektskontoene, eller koble dem én gang ved import.

:::tip
Gi batchene dine konsekvente navn, slik at de er lette å finne senere. Å ta med dato og innsamlingstype (f.eks. «Søndag formiddag – 2025-02-09») holder listen organisert etter hvert som den vokser.
:::

## Neste steg

Når du har en batch, se [Registrere donasjoner](recording-donations.md) for å lære hvordan du legger til enkeltdonasjoner i den. Du kan også [importere Stripe-transaksjoner](stripe-import.md) for automatisk å opprette batcher fra nettgiving.
