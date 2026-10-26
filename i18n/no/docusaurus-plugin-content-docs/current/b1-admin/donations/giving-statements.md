---
title: "Givertjenester"
---

# Givertjenester

<div class="article-intro">

Ved slutten av hvert år trenger giverne dine en oppsummering av sine fradragsberettigede gaver for sine egne registre. B1 Admin gjør det enkelt å lage disse oppgavene for alle givere samtidig, noe som sparer deg for mange timer med manuelt arbeid.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at [fondene](funds.md) dine er riktig merket som **Fradragsberettiget** -- bare gaver til fradragsberettigede fond vises på oppgavene
- Sørg for at alle gaver er [registrert](recording-donations.md), og at eventuelle nettbaserte transaksjoner er [importert fra Stripe](stripe-import.md)

</div>

## Gå til givertjenester

1. I **B1 Admin** åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Gaver**.
2. Klikk **Givertjenester**. Siden **Givertjenester for bunter** åpnes.

## Lage oppgaver

1. I panelet **Velg år** velger du **år** i rullegardinmenyen. Du kan velge inneværende år eller et av de fem foregående årene.
2. Siden laster bare inn gavene som er datert i det året (1. januar til 31. desember), slik at den åpnes raskt selv om menigheten din har mange års givningshistorikk. Når du velger et annet år, oppdateres sammendraget med gavene fra det året. Panelet **Sammendrag** under året viser statistikk for det året, blant annet:
   - **Totalt antall givere** -- antall personer som ga
   - **Totalt antall gaver** -- antall enkeltstående gaveregistreringer
   - **Totalt beløp** -- det samlede beløpet for all givning

## Laste ned oppgavene

Panelet **Nedlastingsalternativer** gir deg to måter å få oppgavene ut til giverne dine:

### Last ned som CSV-filer

Under **Individuelle CSV-filer** klikker du **Last ned ZIP** for å laste ned en ZIP-fil med en egen CSV-fil for hver giver. Dette er nyttig hvis du vil sende oppgavene enkeltvis på e-post eller importere dem i et annet system.

### Skriv ut alle oppgavene

Under **Utskrivbare oppgaver** klikker du **Skriv ut alle** (knappen viser antall oppgaver) for å åpne en utskriftsvennlig visning av hver giverens oppgave for valgt år i nettleseren. Derfra bruker du nettleserens utskriftsfunksjon for å sende dem til en skriver. Hver oppgave starter på en ny side, slik at de er klare til å brettes og sendes i posten, og oppgavene er sortert etter giverens etternavn, deretter fornavn.

Hvis du har lastet opp en **Logo for lys bakgrunn** under [Nettside > Utseende](../website/appearance.md), skrives den ut sentrert øverst på hver oppgave, over oppgavens tittel. Dette gjelder både **Skriv ut alle** og en enkelt givers oppgave som skrives ut fra vedkommendes post.

:::tip
Kjør oppgavene tidlig i januar, mens registreringene dine fortsatt er friske. Kontroller dobbelt at fondene dine er riktig merket som fradragsberettiget før du lager oppgavene -- bare gaver til fradragsberettigede fond er med.
:::

:::info
Givertjenester inkluderer bare gaver knyttet til fond der innstillingen **Fradragsberettiget** er aktivert. Hvis et fond ikke er merket som fradragsberettiget, vises ikke gavene fra det fondet på oppgaven. Du kan administrere denne innstillingen på siden [Fond](funds.md).
:::

## Kvitteringsformater for Canada, Australia og New Zealand

Menigheter utenfor USA kan bytte oppgaven til landets offisielle kvitteringsoppsett. Klikk **Oppgaveformat** øverst på siden Givertjenester (eller gå til **Innstillinger** og åpne delen **Givning**), og sett **Oppgaveformat** til **Canada**, **Australia** eller **New Zealand**. Fyll deretter inn feltene som vises: registreringsnummeret ditt (CRA-registreringsnummer, ABN eller registreringsnummer for NZ-veldedighet), organisasjonens adresse, navnet på personen som er autorisert til å signere kvitteringer, og for Canada byen der kvitteringene utstedes.

Oppgavene får da den teksten skattemyndigheten forventer (for Canada «Offisiell kvittering for inntektsskatt» med CRA-referansen), et kvitteringsnummer på formen `ÅR-GIVERID`, det godkjente beløpet som bare teller med fra fradragsberettigede fond, og en egen linje for eventuelle gaver til ikke-fradragsberettigede fond. Givere ser den samme kvitteringsblokken når de skriver ut sin egen oppgave fra B1.church.

## Hva medlemmer ser i B1.church

Den samme delen **Givning** i innstillingene styrer hva medlemmer ser på sin egen givingsside i B1.church:

- **Medlemmets givningshistorikk** styrer hvilke år medlemmene kan se. **Alle år** er standard. **Til og med 2025** (eller et annet år) stopper ved det året, slik at medlemmer ikke kan se eller skrive ut et senere år før du tillater det. Bruk dette til å holde tilbake inneværende år mens du fullfører rettelser og refusjoner. **Skjult** fjerner givningshistorikken, årssummene og utskrift av oppgaver helt. Medlemmer kan fortsatt gi.
- **Givernotat** er en kort melding som vises på medlemmets givingsside og i givningshistorikken, og som skrives ut nederst på hver givertjeneste, inkludert oppgavene du skriver ut her. Bruk det til ting som retningslinjer for refusjon.

Disse innstillingene endrer bare det medlemmene ser. Du kan fortsatt skrive ut ethvert år fra denne siden.

## Neste steg

Hvis du trenger å gjennomgå gavedetaljer før du lager oppgavene, kan du gå til siden [Gaverapporter](donation-reports.md) eller sjekke enkelte [bunter](batches.md).
