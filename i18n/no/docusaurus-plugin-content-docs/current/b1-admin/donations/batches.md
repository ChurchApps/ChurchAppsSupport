---
title: "Gavebunter"
---

# Gavebunter

<div class="article-intro">

Bunter samler gavene dine for enklere oppfølging og avstemming. En vanlig bunt representerer én innsamling, for eksempel søndagsoffer eller en spesiell anledning. Ved å bruke bunter holder du orden på tingene og gjør det enkelt å kontrollere at registreringene dine stemmer med de faktiske innskuddene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at du har [satt opp fondene dine](funds.md), slik at de er tilgjengelige når du registrerer gaver
- Du trenger tillatelsen **Vis giversammendrag**, **Rediger gaver** eller **Registrer gaver** for å se siden for bunter (se [Hvem kan endre en bunt](#who-can-change-a-batch))

</div>

## Siden for bunter

Når du går til **Gaver > Bunter**, ser du en liste over buntene dine. Hver rad viser:

- **Navn** -- navnet du ga buntet
- **Dato** -- datoen for innsamlingen
- **Gaver** -- antall enkeltgaver i buntet
- **Totalt** -- det samlede beløpet i kroner
- **Status** -- **Åpen** eller **Lukket** (se [Lukke og gjenåpne en bunt](#closing-and-reopening-a-batch))

Over listen kan du bruke årsknapper for å vise bare buntene fra ett år, eller **Alle** buntene. Et sammendrag på én linje viser antall bunter, antall gaver og totalbeløpet for buntene som vises.

## Opprette en ny bunt

1. Klikk **Legg til bunt** øverst på siden.
2. Skriv inn et beskrivende navn (f.eks. «Søndagsoffer – 9. feb»).
3. Velg datoen for innsamlingen.
4. Klikk **Lagre**.

Den nye buntet vises i listen, klar for at du kan legge til gaver.

## Arbeide med bunter

- **Vis gaver** -- klikk på navnet til en bunt for å åpne den og se alle enkeltgavene den inneholder. Derfra kan du legge til, redigere eller fjerne gaver, eller klikke **Importer CSV** for å legge til mange gaver samtidig fra et regneark (se [Importere gaver fra en CSV-fil](recording-donations.md#importing-donations-from-a-csv-file)).
- **Rediger detaljer for buntet** -- klikk knappen **Rediger** på raden for en bunt for å endre navn eller dato. Bare personer med **Rediger gaver** kan slette en bunt.
- **Sorter** -- bruk kolonneoverskriftene for å sortere buntene etter navn eller dato.
- **Eksporter** -- klikk **Eksporter** øverst på siden for å laste ned buntene som vises, som et regneark (CSV).
- **Mislykkede hendelser** -- hvis betalingsløsningen din har meldt om problemer, vises knappen **Mislykkede hendelser** (med antall uløste hendelser) øverst på siden. Klikk den for å vise eller skjule listen over hendelser under buntene.
- **Importer fra Stripe** -- klikk **Importer manglende Stripe-transaksjoner** øverst på siden for å åpne verktøyet [Stripe-import](stripe-import.md).

## Lukke og gjenåpne en bunt

Når en bunt er talt opp og satt inn på konto, lukker du den, slik at gavene forblir akkurat slik de var da du lukket den.

1. Åpne buntet.
2. Klikk **Lukk bunt** øverst på siden.

Statusbrikken ved siden av buntets navn endres fra **Åpen** til **Lukket**, buntet viser **Lukket** i kolonnen **Status** på siden for bunter, og en melding øverst i buntet forklarer at det er lukket. Mens en bunt er lukket, kan personer med **Registrer gaver** fortsatt se den, men de kan ikke legge til, redigere eller slette gavene i den, eller endre navnet eller datoen til buntet.

For å gjøre endringer igjen åpner du buntet og klikker **Gjenåpne bunt**. Nye bunter starter alltid som åpne.

:::info
Bare personer med **Rediger gaver** ser knappene **Lukk bunt** og **Gjenåpne bunt**. De kan også endre gaver i en lukket bunt dersom en rettelse er nødvendig, uten å gjenåpne den.
:::

## Hvem kan endre en bunt

To [rolletillatelser](../settings/roles-permissions.md) gjør det mulig for noen å arbeide med bunter:

- **Rediger gaver** -- full tilgang: legge til og slette bunter, lukke og gjenåpne dem, og legge til, redigere eller slette alle gaver, enten buntet er åpent eller lukket.
- **Registrer gaver** -- for telleteam og frivillige som registrerer offergaver. De kan legge til bunter og legge til, redigere eller slette gaver, men bare mens buntet er åpent. De kan ikke slette bunter, lukke eller gjenåpne dem, eller endre gaver som kom inn via nettbasert givning.

Noen med **Registrer gaver**, men uten **Vis giversammendrag**, ser **Gaver** i B1 Admin-menyen, som går rett til siden for bunter. **Sammendrag**, **Fond**, **Kampanjer** og **Givertjenester** er skjult for dem. For å åpne en bunt og se gavene i den, trenger rollen også **Vis gaver**.

:::tip
Et vanlig oppsett er en rolle for «Telleteam» med **Registrer gaver** og **Vis gaver**, og en kasserer med **Rediger gaver** som lukker hver bunt når innskuddet er avstemt.
:::

## Skrive ut en bunt

Åpne en bunt og klikk **Skriv ut** over gavelisten for å skrive ut en papirkopi til telleteamet eller til innskuddsregistrene dine. Utskriften inneholder:

- Menighetens navn, buntets navn og buntets dato
- Alle gavene i buntet, med giverens navn, metode, notater, dato og beløp (refunderte gaver er streket over og merket som refundert)
- **Delsummer per fond** -- det samlede beløpet som er gitt til hvert fond i buntet
- **Totalt for bunten** -- det samlede beløpet for hele buntet

Knappen **Skriv ut** vises først når buntet har minst én gave.

### Skrive ut flere bunter samtidig

For å skrive ut alle bunter fra en periode samtidig -- for eksempel alle innskuddene fra forrige måned -- klikker du **Skriv ut** øverst på siden **Bunter**, ved siden av **Eksporter**. Siden **Skriv ut bunter** åpnes med en **startdato** og **sluttdato** som som standard dekker de siste 30 dagene. Endre en av datoene for å velge et annet intervall.

Alle bunter med dato innenfor intervallet (inkludert start- og sluttdatoen) skrives ut i datorekkefølge, én bunt per side, med samme oppsett som en utskrift av én enkelt bunt. Bunter uten gaver utelates, og hvis ingen av buntene i intervallet har gaver, får du meldingen «Ingen bunter med gaver i dette datointervallet.» Klikk **Skriv ut** for å åpne nettleserens utskriftsdialog, eller **Lukk** for å gå tilbake til listen over bunter.

## Eksportere en bunt til QuickBooks Online

Åpne en bunt og klikk **Eksporter for QuickBooks** for å laste ned buntet som et bilag som QuickBooks Online kan importere (**Innstillinger > Importer data > Bilag**). Filen inneholder ett debet på **Uinnsatte midler** for totalbeløpet i buntet, og én kredit per fond, med fondets navn som kontonavn. QuickBooks ber deg matche disse navnene mot kontoplanen din under importen, så gi fondene dine navn slik regnskapsføreren din navngir inntektskontoene, eller sett opp matchingen én gang under importen.

:::tip
Gi buntene dine konsekvente navn, slik at de er lette å finne senere. Å ta med dato og type innsamling (f.eks. «Søndag formiddag – 2025-02-09») holder listen organisert etter hvert som den vokser.
:::

## Neste steg

Når du har en bunt, kan du se [Registrere gaver](recording-donations.md) for å lære hvordan du legger til enkeltgaver i den. Du kan også [importere Stripe-transaksjoner](stripe-import.md) for å opprette bunter automatisk fra nettbasert givning.
