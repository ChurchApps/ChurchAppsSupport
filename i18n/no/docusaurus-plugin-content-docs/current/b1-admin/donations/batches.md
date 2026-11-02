---
title: "Gavebunter"
---

# Gavebunter

<div class="article-intro">

Bunter samler gavene dine for enklere oppfølging og avstemming. En typisk bunt representerer én innsamling, for eksempel en søndagsgave eller en spesiell anledning. Med bunter er det lettere å holde orden og enkelt å kontrollere at dataene stemmer med de faktiske innskuddene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at du har [satt opp fondene dine](funds.md), slik at de er tilgjengelige når du registrerer gaver
- Du trenger tillatelsen **Vis gavesammendrag**, **Rediger gaver** eller **Registrer gaver** for å se siden for bunter (se [Hvem kan endre en bunt](#who-can-change-a-batch))

</div>

## Siden for bunter

Når du går til **Gaver > Bunter**, ser du en liste over buntene dine. Hver rad viser:

- **Navn** -- navnet du ga bunten
- **Dato** -- datoen for innsamlingen
- **Gaver** -- antall enkeltgaver i bunten
- **Totalt** -- det samlede beløpet i kroner
- **Status** -- **Åpen** eller **Lukket** (se [Lukke og gjenåpne en bunt](#closing-and-reopening-a-batch))

Over listen viser årsknapper kun bunter fra ett år, eller **Alle** bunter. En oppsummeringslinje viser antall bunter, antall gaver og totalbeløpet for buntene som vises.

## Opprette en ny bunt

1. Klikk **Legg til bunt** øverst på siden.
2. Skriv inn et beskrivende navn (f.eks. «Søndagsgave - 9. feb»).
3. Velg datoen for innsamlingen.
4. Klikk **Lagre**.

Den nye bunten vises i listen, klar for at du kan legge til gaver.

## Arbeide med bunter

- **Vis gaver** -- klikk på navnet til en bunt for å åpne den og se alle enkeltgavene den inneholder. Derfra kan du legge til, redigere eller fjerne gaver, eller klikke **Importer CSV** for å legge til mange gaver samtidig fra et regneark (se [Importere gaver fra en CSV-fil](recording-donations.md#importing-donations-from-a-csv-file)).
- **Rediger buntdetaljer** -- klikk på knappen **Rediger** på en buntrad for å endre navn eller dato. Bare personer med **Rediger gaver** kan slette en bunt.
- **Sorter** -- bruk kolonneoverskriftene for å sortere bunter etter navn eller dato.
- **Eksporter** -- klikk **Eksporter** øverst på siden for å laste ned buntene som vises, som regneark (CSV).
- **Mislykkede hendelser** -- hvis betalingsløsningen har rapportert problemer, vises en knapp for **Mislykkede hendelser** (med antall uløste hendelser) øverst på siden. Klikk den for å vise eller skjule listen over hendelser under buntene.
- **Importer fra Stripe** -- klikk **Importer manglende Stripe-transaksjoner** øverst på siden for å åpne [Stripe-import](stripe-import.md)-verktøyet. Knappen vises bare når kirkens giveløsning er Stripe.

## Hvem som registrerte hver gave

Hver gave som er skrevet inn i en bunt, viser **Registrert av** og navnet på personen under giverens navn, slik at du kan se hvem som førte den inn uten en signaturliste. B1 registrerer dette automatisk ut fra hvem som er innlogget, og endring av gaven senere endrer ikke dette. Gaver som er importert med **Importer CSV**, viser personen som kjørte importen.

Nettgaver, gaver lagt til med verktøyet [Stripe-import](stripe-import.md) og gaver som ble registrert før dette ble lagt til i november 2026, viser ikke noe navn.

## Lukke og gjenåpne en bunt {#closing-and-reopening-a-batch}

Når en bunt er talt opp og satt inn på bankkontoen, lukker du den slik at gavene forblir akkurat slik de var da du lukket den.

1. Åpne bunten.
2. Klikk **Lukk bunt** øverst på siden.

Statusbrikken ved siden av buntnavnet endres fra **Åpen** til **Lukket**, bunten viser **Lukket** i kolonnen **Status** på siden for bunter, og en melding øverst i bunten forklarer at den er lukket. Mens en bunt er lukket, kan personer med **Registrer gaver** fortsatt se den, men de kan ikke legge til, redigere eller slette gaver i den, eller endre navnet eller datoen på bunten.

For å gjøre endringer igjen åpner du bunten og klikker **Gjenåpne bunt**. Nye bunter starter alltid som åpne.

:::info
Bare personer med **Rediger gaver** ser knappene **Lukk bunt** og **Gjenåpne bunt**. De kan også endre gaver i en lukket bunt dersom en korreksjon er nødvendig, uten å gjenåpne den.
:::

## Hvem kan endre en bunt {#who-can-change-a-batch}

To [rolletillatelser](../settings/roles-permissions.md) lar noen arbeide med bunter:

- **Rediger gaver** -- full tilgang: legge til og slette bunter, lukke og gjenåpne dem, og legge til, redigere eller slette alle gaver, enten bunten er åpen eller lukket.
- **Registrer gaver** -- for telleteam og frivillige som fører inn gaver. De kan legge til bunter og legge til, redigere eller slette gaver, men bare mens bunten er åpen. De kan ikke slette bunter, lukke eller gjenåpne dem, eller endre gaver som kom inn via nettbasert giving.

Noen med **Registrer gaver**, men ikke **Vis gavesammendrag**, ser **Gaver** i B1 Admin-menyen, som går rett til siden for bunter. **Sammendrag**, **Fond**, **Kampanjer** og **Giveroppgaver** er skjult for dem. For å åpne en bunt og se gavene i den, må rollen også ha **Vis gaver**.

:::tip
Et vanlig oppsett er en rolle for «Telleteam» med **Registrer gaver** og **Vis gaver**, og en kasserer med **Rediger gaver** som lukker hver bunt når innskuddet er avstemt.
:::

## Skrive ut en bunt

Åpne en bunt og klikk **Skriv ut** over gavelisten for å skrive ut en papirkopi til telleteamet eller til innskuddsarkivet. Utskriften inneholder:

- Kirkens brevhode -- logoen din (**logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en), med kirkens navn under -- deretter buntens navn og buntens dato
- Hver gave i bunten, med giverens navn, hvem som registrerte den, metode, notater, dato og beløp (refunderte gaver er streket over og merket som refundert)
- **Fondssummer** -- totalbeløpet som er gitt til hvert fond i bunten
- **Buntsum** -- det samlede beløpet for hele bunten

Knappen **Skriv ut** vises først når bunten har minst én gave.

### Skrive ut flere bunter samtidig

For å skrive ut alle bunter fra en periode på én gang -- for eksempel alle innskuddene fra forrige måned -- klikker du **Skriv ut** øverst på siden **Bunter**, ved siden av **Eksporter**. Siden **Skriv ut bunter** åpnes med en **startdato** og **sluttdato** som samsvarer med buntene på skjermen: 1. januar til 31. desember i året du valgte, eller fra den tidligste til den seneste buntdatoen når **Alle** er valgt. Endre en av datoene for å velge et annet intervall.

Hver bunt med dato innenfor intervallet (inkludert start- og sluttdato) skrives ut i datorekkefølge, én bunt per side, med samme oppsett som en enkeltutskrift. Bunter uten gaver utelates, og hvis ingen av buntene i intervallet har gaver, får du meldingen «Ingen bunter med gaver i dette datointervallet.». Klikk **Skriv ut** for å åpne nettleserens utskriftsdialog, eller **Lukk** for å gå tilbake til buntlisten.

## Eksportere en bunt til QuickBooks Online

Åpne en bunt og klikk **Eksporter for QuickBooks** for å laste ned bunten som en journalpost som QuickBooks Online kan importere (**Innstillinger > Importer data > Journalposter**). Filen inneholder én debet til **Ikke innskutte midler** for buntsummen og én kredit per fond, der hvert fonds navn brukes som kontonavn. QuickBooks ber deg matche disse navnene mot kontoplanen din under importen, så gi fondene dine navn slik regnskapsføreren din navngir inntektskontoene, eller koble dem én gang under importen.

:::tip
Gi buntene dine konsekvente navn, slik at de er lette å finne senere. Å ta med datoen og innsamlingstypen (f.eks. «Søndag formiddag - 2025-02-09») holder listen ryddig etter hvert som den vokser.
:::

## Neste steg

Når du har en bunt, se [Registrere gaver](recording-donations.md) for å lære hvordan du legger til enkeltgaver i den. Du kan også [importere Stripe-transaksjoner](stripe-import.md) for automatisk å opprette bunter fra nettbasert giving.
