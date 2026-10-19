---
title: "Giverbekreftelser"
---

# Giverbekreftelser

<div class="article-intro">

Ved slutten av hvert år trenger giverne dine en oppsummering av sin skattefradragsberettigede giving for sine egne registre. B1 Admin gjør det enkelt å generere disse bekreftelsene for alle givere samtidig, og sparer deg for mange timer med manuelt arbeid.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at dine [fond](funds.md) er riktig merket som **Skattefradragsberettiget** – bare gaver til skattefradragsberettigede fond vises på bekreftelsene
- Sørg for at alle donasjoner er [registrert](recording-donations.md), og at eventuelle nettransaksjoner er [importert fra Stripe](stripe-import.md)

</div>

## Åpne giverbekreftelser

1. I **B1 Admin** åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Donasjoner**.
2. Klikk på **Giverbekreftelser**. Siden **Batch-giverbekreftelser** åpnes.

## Generere bekreftelser

1. I panelet **Velg år** velger du **År** i rullegardinlisten. Du kan velge inneværende år eller et av de fem foregående årene.
2. Siden laster bare donasjoner datert i det året (1. januar til 31. desember), slik at den åpnes raskt selv om menigheten din har mange års giverhistorikk. Når du velger et annet år, oppdateres oppsummeringen med donasjonene for det året. Panelet **Sammendrag** under året viser statistikk for det året, inkludert:
   - **Totalt antall givere** – antall personer som ga
   - **Totalt antall donasjoner** – antall enkeltregistreringer av gaver
   - **Totalbeløp** – det samlede beløpet for all giving

## Laste ned bekreftelser

Panelet **Nedlastingsalternativer** gir deg to måter å få bekreftelsene til giverne dine:

### Last ned som CSV-filer

Under **Individuelle CSV-filer** klikker du på **Last ned ZIP** for å laste ned en ZIP-fil som inneholder en individuell CSV-fil for hver giver. Dette er nyttig hvis du vil sende bekreftelser enkeltvis på e-post eller importere dem til et annet system.

### Skriv ut alle bekreftelser

Under **Utskrivbare bekreftelser** klikker du på **Skriv ut alle** (knappen viser antall bekreftelser) for å åpne en utskriftsvisning av alle givernes bekreftelser for det valgte året i nettleseren din. Derfra bruker du nettleserens utskriftsfunksjon for å sende dem til en skriver. Hver bekreftelse starter på en ny side, slik at de er klare til å brettes og sendes i posten, og bekreftelsene er sortert etter giverens etternavn, deretter fornavn.

Hvis du har lastet opp en **logo for lys bakgrunn** under [Nettsted > Utseende](../website/appearance.md), skrives den ut sentrert øverst på hver bekreftelse, over tittelen på bekreftelsen. Dette gjelder både **Skriv ut alle** og en enkelt givers bekreftelse skrevet ut fra vedkommendes registrering.

:::tip
Kjør bekreftelsene tidlig i januar mens registreringene fortsatt er ferske. Dobbeltsjekk at fondene dine er riktig merket som skattefradragsberettiget før du genererer bekreftelser – bare donasjoner til skattefradragsberettigede fond er med.
:::

:::info
Giverbekreftelser inkluderer bare donasjoner til fond som har innstillingen **Skattefradragsberettiget** aktivert. Hvis et fond ikke er merket som skattefradragsberettiget, vises ikke donasjonene fra det på bekreftelsen. Du kan administrere denne innstillingen på siden [Fond](funds.md).
:::

## Kvitteringsformater for Canada, Australia og New Zealand

Menigheter utenfor USA kan bytte bekreftelsen til landets offisielle kvitteringsoppsett. Klikk på **Bekreftelsesformat** øverst på siden Giverbekreftelser (eller gå til **Innstillinger** og åpne seksjonen **Giving**), og sett **Bekreftelsesformat** til **Canada**, **Australia** eller **New Zealand**. Fyll deretter inn feltene som vises: registreringsnummeret ditt (CRA-registreringsnummer, ABN eller NZ-registreringsnummer for veldedige organisasjoner), organisasjonens adresse, navnet på personen som er autorisert til å signere kvitteringer, og for Canada byen der kvitteringer utstedes.

Bekreftelser inneholder da den formuleringen skattemyndigheten din forventer (for Canada, «Official Receipt for Income Tax Purposes» med CRA-referansen), et kvitteringsnummer i formatet `YEAR-DONORID`, det kvalifiserte beløpet som bare telles fra skattefradragsberettigede fond, og en egen linje for eventuelle gaver til ikke-fradragsberettigede fond. Givere ser den samme kvitteringsblokken når de skriver ut sin egen bekreftelse fra B1.church.

## Neste steg

Hvis du må gå gjennom donasjonsdetaljer før du genererer bekreftelser, kan du besøke siden [Donasjonsrapporter](donation-reports.md) eller sjekke enkeltvise [batcher](batches.md).
