---
title: "Gaveoversikter"
---

# Gaveoversikter {#giving-statements}

<div class="article-intro">

Ved slutten av hvert år trenger givere en oppsummering av sine skattefradragsberettigede gaver til egne arkiver. B1 Admin gjør det enkelt å generere disse oversiktene for alle givere samtidig, og sparer deg for mange timer med manuelt arbeid.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at [fondene](funds.md) dine er riktig merket som **Skattefradragsberettiget** -- bare gaver til skattefradragsberettigede fond vises på oversiktene
- Sørg for at alle gaver er [registrert](recording-donations.md), og at alle nettbaserte transaksjoner er [importert fra Stripe](stripe-import.md)

</div>

## Gå til gaveoversikter {#accessing-giving-statements}

1. I **B1 Admin** åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Gaver**.
2. Klikk **Gaveoversikter**. Siden **Gaveoversikter i batch** åpnes.

## Generere oversikter {#generating-statements}

1. I panelet **Velg år** velger du **År** i nedtrekkslisten. Du kan velge inneværende år eller et av de fem foregående årene.
2. Siden laster bare gavene som er datert i det året (1. januar til 31. desember), så den åpnes raskt selv om kirken din har mange år med gavehistorikk. Når du velger et annet år, oppdateres sammendraget med gavene for det året. Panelet **Sammendrag** under året viser statistikk for det året, inkludert:
   - **Totalt antall givere** -- antall personer som ga
   - **Totalt antall gaver** -- antall enkeltregistreringer av gaver
   - **Totalbeløp** -- det samlede beløpet for all giving

## Laste ned oversikter {#downloading-statements}

Panelet **Nedlastingsalternativer** gir deg to måter å få oversiktene ut til giverne:

### Last ned som CSV-filer {#download-as-csv-files}

Under **Individuelle CSV-filer** klikker du **Last ned ZIP** for å laste ned en ZIP-fil med en individuell CSV-fil for hver giver. Dette er nyttig hvis du vil sende oversikter enkeltvis på e-post eller importere dem i et annet system.

### Skriv ut alle oversikter {#print-all-statements}

Under **Utskriftsklare oversikter** klikker du **Skriv ut alle** (knappen viser antall oversikter) for å åpne en utskriftsvisning av hver givers oversikt for det valgte året i nettleseren. Derfra bruker du nettleserens utskriftsfunksjon for å sende dem til en skriver. Hver oversikt starter på en ny side, slik at de er klare til å brettes og sendes i posten, og oversiktene er sortert etter giverens etternavn, deretter fornavn.

Hvis du har lastet opp en **logo for lys bakgrunn** under [Nettside > Utseende](../website/appearance.md), skrives den ut sentrert øverst på hver oversikt, over tittelen på oversikten. Dette gjelder både **Skriv ut alle** og en enkelt givers oversikt skrevet ut fra vedkommendes post.

:::tip
Kjør oversiktene tidlig i januar mens postene fortsatt er ferske. Dobbeltsjekk at fondene dine er riktig merket som skattefradragsberettiget før du genererer oversiktene -- bare gaver til skattefradragsberettigede fond tas med.
:::

:::info
Gaveoversikter inkluderer bare gaver som er knyttet til fond der innstillingen **Skattefradragsberettiget** er aktivert. Hvis et fond ikke er merket som skattefradragsberettiget, vises ikke gavene fra det på oversikten. Du kan administrere denne innstillingen på siden [Fond](funds.md).
:::

## Kvitteringsformater for Canada, Australia og New Zealand {#receipt-formats-for-canada-australia-and-new-zealand}

Kirker utenfor USA kan bytte oversikten til sitt lands offisielle kvitteringsoppsett. Klikk **Oversiktsformat** øverst på siden Gaveoversikter (eller gå til **Innstillinger** og åpne delen **Giving**), og sett **Oversiktsformat** til **Canada**, **Australia** eller **New Zealand**. Fyll deretter ut feltene som vises: registreringsnummeret ditt (CRA-registreringsnummer, ABN eller registreringsnummer for NZ-veldedighet), organisasjonens adresse, navnet på personen som er autorisert til å signere kvitteringer, og for Canada byen der kvitteringene utstedes.

Oversiktene inneholder deretter den formuleringen skattemyndigheten forventer (for Canada «Offisiell kvittering for inntektsskatt» med CRA-referansen), et kvitteringsnummer i formatet `ÅR-GIVERID`, det godkjente beløpet som bare teller fra skattefradragsberettigede fond, og en egen linje for eventuelle gaver til ikke-fradragsberettigede fond. Givere ser den samme kvitteringsblokken når de skriver ut sin egen oversikt fra B1.church.

## Hva medlemmene ser i B1.church {#what-members-see-in-b1church}

Den samme delen **Giving** i innstillingene styrer hva medlemmene ser på sin egen giving-side i B1.church:

- **Medlemmets gavehistorikk** bestemmer hvilke år medlemmene kan se. **Alle år** er standard. **Til og med 2025** (eller et annet år) stopper ved det året, slik at medlemmer ikke kan se eller skrive ut et senere år før du tillater det. Bruk dette til å holde tilbake inneværende år mens du fullfører rettelser og refusjoner. **Skjult** fjerner gavehistorikk, årssummer og utskrift av oversikter helt. Medlemmer kan fortsatt gi.
- **Gavenotat** er en kort melding som vises på medlemmets giving-side og i gavehistorikken, og skrives ut nederst på hver gaveoversikt, også oversiktene du skriver ut her. Bruk det til ting som refusjonspolicyen din.

Disse innstillingene endrer bare hva medlemmene ser. Du kan fortsatt skrive ut ethvert år fra denne siden.

## Neste steg {#next-steps}

Hvis du må gjennomgå gavedetaljer før du genererer oversikter, kan du gå til siden [Gaverapporter](donation-reports.md) eller sjekke enkelte [batcher](batches.md).
