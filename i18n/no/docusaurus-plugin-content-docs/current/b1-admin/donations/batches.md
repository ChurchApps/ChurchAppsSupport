---
title: "Gavepartier"
---

# Gavepartier

<div class="article-intro">

Partier samler giftene dine for enklere oppfølging og avstemming. Et typisk parti representerer én innsamling, for eksempel en søndagsoffer eller et spesialarrangement. Å bruke partier hjelper deg å holde orden og gjør det enkelt å kontrollere at dataene dine stemmer med de faktiske innskuddene.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at du har [satt opp fondene dine](funds.md) slik at de er tilgjengelige når du registrerer gaver
- Du trenger tillatelsen **Vis gavesammendrag**, **Rediger gaver** eller **Registrer gaver** for å se siden for partier (se [Hvem kan endre et parti](#who-can-change-a-batch))

</div>

## Partisiden

Når du går til **Gaver > Partier**, ser du en liste over partiene dine. Hver rad viser:

- **Navn** — etiketten du ga partiet
- **Dato** — datoen for innsamlingen
- **Gaver** — antall enkeltgaver i partiet
- **Sum** — det samlede beløpet i kroner
- **Status** — **Åpent** eller **Lukket** (se [Lukke og gjenåpne et parti](#closing-and-reopening-a-batch))

Over listen lar årsknapper deg vise bare partiene fra ett år, eller alle partiene med **Alle**. Et sammendrag på én linje viser antall partier, antall gaver og det samlede beløpet for partiene som vises.

## Opprette et nytt parti

1. Klikk **Legg til parti** øverst på siden.
2. Skriv inn et beskrivende navn (f.eks. «Søndagsoffer – 9. feb»).
3. Velg datoen for innsamlingen.
4. Klikk **Lagre**.

Det nye partiet vises i listen, klart for at du kan legge til gaver.

## Arbeide med partier

- **Se gaver** — klikk på et partinavn for å åpne det og se alle enkeltgavene det inneholder. Derfra kan du legge til, redigere eller fjerne gaver, eller klikke **Importer CSV** for å legge til mange gaver samtidig fra et regneark (se [Importere gaver fra en CSV-fil](recording-donations.md#importing-donations-from-a-csv-file)).
- **Rediger partidetaljer** — klikk **Rediger**-knappen på en partirad for å endre navnet eller datoen. Bare personer med **Rediger gaver** kan slette et parti.
- **Sorter** — bruk kolonneoverskriftene for å sortere partiene etter navn eller dato.
- **Eksporter** — klikk **Eksporter** øverst på siden for å laste ned partiene som vises som et regneark (CSV).
- **Mislykkede hendelser** — hvis betalingsleverandøren din har rapportert problemer, vises en knapp **Mislykkede hendelser** (med antall uløste hendelser) øverst på siden. Klikk den for å vise eller skjule listen over hendelser under partiene.
- **Importer fra Stripe** — klikk **Importer manglende Stripe-transaksjoner** øverst på siden for å åpne [Stripe-import](stripe-import.md)-verktøyet.

## Lukke og gjenåpne et parti

Når et parti er telt og satt inn på konto, lukker du det slik at gavene forblir akkurat slik de var da du lukket det.

1. Åpne partiet.
2. Klikk **Lukk parti** øverst på siden.

Statusbrikken ved siden av partinavnet endres fra **Åpent** til **Lukket**, partiet viser **Lukket** i kolonnen **Status** på Partier-siden, og et varsel øverst i partiet forklarer at det er lukket. Mens et parti er lukket, kan personer med **Registrer gaver** fortsatt se det, men de kan ikke legge til, redigere eller slette gavene i det, eller endre partiets navn eller dato.

For å gjøre endringer igjen åpner du partiet og klikker **Gjenåpne parti**. Nye partier starter alltid som åpne.

:::info
Bare personer med **Rediger gaver** ser knappene **Lukk parti** og **Gjenåpne parti**. De kan også fortsatt endre gaver i et lukket parti dersom det trengs en korreksjon, uten å gjenåpne det.
:::

## Hvem kan endre et parti

To [rolletillatelser](../settings/roles-permissions.md) lar noen arbeide med partier:

- **Rediger gaver** — full tilgang: legge til og slette partier, lukke og gjenåpne dem, og legge til, redigere eller slette enhver gave, enten partiet er åpent eller lukket.
- **Registrer gaver** — for telleteam og frivillige som registrerer gaver. De kan legge til partier og legge til, redigere eller slette gaver, men bare mens partiet er åpent. De kan ikke slette partier, lukke eller gjenåpne dem, eller endre gaver som kom inn via netthandel.

Noen med **Registrer gaver** men uten **Vis gavesammendrag** ser **Gaver** i B1 Admin-menyen, som går rett til Partier-siden. **Sammendrag**, **Fond**, **Kampanjer** og **Gaveoversikter** er skjult for dem. For å åpne et parti og se gavene i det, må rollen også ha **Vis gaver**.

:::tip
Et vanlig oppsett er en rolle for «Telleteam» med **Registrer gaver** og **Vis gaver**, og en kasserer med **Rediger gaver** som lukker hvert parti når innskuddet er avstemt.
:::

## Skrive ut et parti

Åpne et parti og klikk **Skriv ut** over gavelisten for å skrive ut en papirkopi til telleteamet ditt eller til innskuddsregistrene. Utskriften inneholder:

- Kirkens brevhode — logoen din (**Logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) med kirkens navn under — deretter partinavnet og partidatoen
- Hver gave i partiet, med giverens navn, metode, notater, dato og beløp (refunderte gaver er streket over og merket som refundert)
- **Fondsundersummer** — det samlede beløpet som er gitt til hvert fond i partiet
- **Partisum** — det samlede beløpet for hele partiet

Knappen **Skriv ut** vises først når partiet har minst én gave.

### Skrive ut flere partier samtidig

For å skrive ut alle partier fra en periode på en gang — for eksempel alle innskuddene fra forrige måned — klikker du **Skriv ut** øverst på siden **Partier**, ved siden av **Eksporter**. Siden **Skriv ut partier** åpnes med en **Startdato** og **Sluttdato** som samsvarer med partiene på skjermen: 1. januar til 31. desember for året du valgte, eller fra tidligste til seneste partidato når **Alle** er valgt. Endre en av datoene for å velge et annet intervall.

Alle partier med dato innenfor intervallet (inkludert start- og sluttdatoen) skrives ut i datorekkefølge, ett parti per side, med samme oppsett som en utskrift av ett enkelt parti. Partier uten gaver utelates, og hvis ingen av partiene i intervallet har gaver, ser du meldingen «Ingen partier med gaver i dette datointervallet». Klikk **Skriv ut** for å åpne nettleserens utskriftsdialog, eller **Lukk** for å gå tilbake til partilisten.

## Eksportere et parti til QuickBooks Online

Åpne et parti og klikk **Eksporter for QuickBooks** for å laste ned partiet som en journalpost som QuickBooks Online kan importere (**Innstillinger > Importer data > Journalposter**). Filen inneholder ett debet til **Ikke innsatte midler** for partisummen og én kredit per fond, der fondets navn brukes som kontonavn. QuickBooks ber deg matche disse navnene med kontoplanen din under importen, så gi fondene dine navn slik regnskapsføreren din navngir inntektskontoene, eller koble dem én gang ved import.

:::tip
Gi partiene dine konsistente navn, slik at de er lette å finne senere. Å inkludere datoen og typen innsamling (f.eks. «Søndag formiddag – 2025-02-09») holder listen organisert etter hvert som den vokser.
:::

## Neste steg

Når du har et parti, se [Registrere gaver](recording-donations.md) for å lære hvordan du legger til enkeltgaver i det. Du kan også [importere Stripe-transaksjoner](stripe-import.md) for automatisk å opprette partier fra nettgivning.
