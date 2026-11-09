---
title: "Gaveoppgaver"
description: "Lag årlige gaveoppgaver for alle givere i B1 Admin, og last dem ned som CSV-filer eller skriv dem ut for utsending med skattefradragsberettigede summer."
---

# Gaveoppgaver

<div class="article-intro">

Ved slutten av hvert år trenger giverne dine en oppsummering av sine skattefradragsberettigede gaver til sine egne arkiver. B1 Admin gjør det enkelt å lage disse oppgavene for alle givere samtidig, og sparer deg for mange timer med manuelt arbeid.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at [fondene](funds.md) dine er riktig merket som **Skattefradragsberettiget** -- bare gaver til skattefradragsberettigede fond vises på oppgavene
- Kontroller at alle gaver er [registrert](recording-donations.md), og at alle transaksjoner på nett er [importert fra Stripe](stripe-import.md)

</div>

## Åpne gaveoppgaver

1. I **B1 Admin** åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Donasjoner**.
2. Klikk **Gaveoppgaver**. Siden **Gaveoppgaver i batch** åpnes.

## Lage oppgaver

1. I panelet **Velg år** velger du **År** i nedtrekkslisten. Du kan velge inneværende år eller et av de fem foregående årene.
2. Siden laster bare gavene som er datert i det året (1. januar til 31. desember), slik at den åpnes raskt selv om menigheten din har mange år med giving-historikk. Når du velger et annet år, oppdateres oppsummeringen med gavene for det året. Panelet **Oppsummering** under året viser statistikk for det året, blant annet:
   - **Totalt antall givere** -- antall personer som ga
   - **Totalt antall donasjoner** -- antall enkeltstående gaveregistreringer
   - **Totalbeløp** -- det samlede beløpet for all giving

## Laste ned oppgaver

Panelet **Nedlastingsalternativer** gir deg to måter å få oppgavene til giverne dine på:

### Last ned som CSV-filer

Under **Individuelle CSV-filer** klikker du **Last ned ZIP** for å laste ned en ZIP-fil med en egen CSV-fil for hver giver. Dette er nyttig hvis du vil sende oppgavene enkeltvis på e-post eller importere dem i et annet system.

### Skriv ut alle oppgaver

Under **Utskrivbare oppgaver** klikker du **Skriv ut alle** (knappen viser antall oppgaver) for å åpne en utskriftsvisning av hver givers oppgave for valgt år i nettleseren din. Derfra bruker du nettleserens utskriftsfunksjon for å sende dem til en skriver. Hver oppgave starter på en ny side slik at de er klare til å brettes og sendes i post, og oppgavene er sortert etter giverens etternavn, deretter fornavn.

Hvis du har lastet opp en **Logo for lys bakgrunn** under [Nettsted > Utseende](../website/appearance.md), skrives den ut midtstilt øverst på hver oppgave, over oppgavetittelen. Dette gjelder for **Skriv ut alle**, for en enkelt givers oppgave skrevet ut fra vedkommendes post, og for oppgavene medlemmer selv skriver ut fra siden **Giving** i B1.church.

:::tip
Kjør oppgavene tidlig i januar mens opplysningene er friske. Kontroller at fondene dine er riktig merket som skattefradragsberettiget før du lager oppgavene -- bare gaver til skattefradragsberettigede fond tas med.
:::

:::info
Gaveoppgaver inkluderer bare gaver til fond der innstillingen **Skattefradragsberettiget** er slått på. Hvis et fond ikke er merket som skattefradragsberettiget, vises ikke gavene til det fondet på oppgaven. Du kan administrere denne innstillingen på siden [Fond](funds.md).
:::

## Kvitteringsformater for Canada, Australia og New Zealand

Menigheter utenfor USA kan bytte oppgaven til det offisielle kvitteringsoppsettet i sitt land. Klikk **Oppgaveformat** øverst på siden Gaveoppgaver (eller gå til **Innstillinger** og åpne seksjonen **Giving**), og sett **Oppgaveformat** til **Canada**, **Australia** eller **New Zealand**. Fyll deretter ut feltene som vises: registreringsnummeret ditt (CRA-registreringsnummer, ABN eller NZ-registreringsnummer for veldedig virksomhet), organisasjonens adresse, navnet på personen som er autorisert til å signere kvitteringer, og for Canada byen der kvitteringene utstedes.

Oppgavene inneholder da den teksten skattemyndigheten forventer (for Canada, «Offisiell kvittering for inntektsskatt» med CRA-referansen), et kvitteringsnummer i formatet `ÅR-GIVERID`, det fradragsberettigede beløpet som bare teller fra skattefradragsberettigede fond, og en egen linje for eventuelle gaver til ikke-fradragsberettigede fond. Givere ser den samme kvitteringsblokken når de skriver ut sin egen oppgave fra B1.church.

## Hva medlemmene ser i B1.church {#what-members-see-in-b1church}

Den samme seksjonen **Giving** i innstillingene styrer hva medlemmene ser på sin egen giving-side i B1.church:

- **Medlemmenes giving-historikk** bestemmer hvilke år medlemmene kan se. **Alle år** er standard. **Til og med 2025** (eller et annet år) stopper ved det året, slik at medlemmene ikke kan se eller skrive ut et senere år før du tillater det. Bruk dette til å holde tilbake inneværende år mens du fullfører rettelser og refusjoner. **Skjult** fjerner giving-historikk, årssummer og utskrift av oppgaver helt. Medlemmene kan fortsatt gi.
- **Givernotat** er en kort melding som vises på medlemmets giving-side og i giving-historikken, og skrives ut nederst på hver gaveoppgave, inkludert oppgavene du skriver ut her. Bruk det til ting som retningslinjer for refusjon.

Disse innstillingene endrer bare hva medlemmene ser. Du kan fortsatt skrive ut et hvilket som helst år fra denne siden.

## Neste steg

Hvis du må gå gjennom donasjonsdetaljer før du lager oppgavene, besøk siden [Donasjonsrapporter](donation-reports.md) eller sjekk enkelte [batcher](batches.md).
