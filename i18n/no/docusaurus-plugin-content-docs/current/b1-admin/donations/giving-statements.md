---
title: "Gaveoversikter"
description: "Lag årlige gaveoversikter for alle givere i B1 Admin, og last dem ned som CSV-filer eller skriv dem ut for utsending med skattefradragsberettigede summer."
---

# Gaveoversikter

<div class="article-intro">

Ved slutten av hvert år trenger giverne dine en oppsummering av sin skattefradragsberettigede giving til sine egne arkiver. B1 Admin gjør det enkelt å lage disse oversiktene for alle givere samtidig, og sparer deg for mange timer manuelt arbeid.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at dine [fond](funds.md) er riktig merket som **Tax Deductible** – bare gaver til skattefradragsberettigede fond vises på oversiktene
- Sørg for at alle gaver er [registrert](recording-donations.md), og at eventuelle nettransaksjoner er [importert fra Stripe](stripe-import.md)

</div>

## Åpne gaveoversikter {#accessing-giving-statements}

1. I **B1 Admin** åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Donations**.
2. Klikk **Giving Statements**. Siden **Batch Giving Statements** åpnes.

## Lage oversikter {#generating-statements}

1. I panelet **Select Year** velger du **Year** i nedtrekkslisten. Du kan velge inneværende år eller et av de fem foregående årene.
2. Siden laster bare gavene som er datert i det året (1. januar til 31. desember), slik at den åpnes raskt selv om menigheten din har mange års givehistorikk. Når du velger et annet år, oppdateres oppsummeringen med gavene for det året. Panelet **Summary** under året viser statistikk for det året, og teller de samme gavene som oversiktene inkluderer (gaver som bare er gitt til fond som ikke er skattefradragsberettiget, utelates):
   - **Total Donors** – antall personer som ga
   - **Total Donations** – antall enkeltgaveregistreringer
   - **Total Amount** – samlet beløp for deres giving

## Laste ned oversikter {#downloading-statements}

Panelet **Download Options** gir deg to alternativer for å få oversiktene ut til giverne:

### Last ned som CSV-filer {#download-as-csv-files}

Under **Individual CSV Files** klikker du **Download ZIP** (knappen viser antall filer) for å laste ned en ZIP-fil med en egen CSV-fil for hver giver. Dette er nyttig hvis du vil sende oversiktene enkeltvis på e-post eller importere dem til et annet system.

### Skriv ut alle oversikter {#print-all-statements}

Under **Printable Statements** klikker du **Print All** (knappen viser antall oversikter) for å åpne en utskriftsvennlig visning av alle givernes oversikter for valgt år i nettleseren. Derfra bruker du nettleserens utskriftsfunksjon for å sende dem til skriveren. Hver oversikt starter på en ny side, slik at de er klare til å brettes og sendes i post, og oversiktene er sortert etter giverens etternavn, deretter fornavn.

Hvis du har lastet opp en **Light Background Logo** under [Nettside > Utseende](../website/appearance.md), skrives den ut midtstilt øverst på hver oversikt, over oversiktens tittel. Dette gjelder for **Print All**, for oversikten til én giver som skrives ut fra personposten, og for oversiktene medlemmene selv skriver ut fra siden **Giving** på B1.church.

:::tip
Kjør oversiktene tidlig i januar mens registreringene dine er friske. Kontroller at fondene dine er riktig merket som skattefradragsberettiget før du lager oversiktene – bare gaver til skattefradragsberettigede fond er med.
:::

:::info
Gaveoversikter inkluderer bare gaver tilordnet fond der innstillingen **Tax Deductible** er slått på. Hvis et fond ikke er merket som skattefradragsberettiget, vises ikke gavene til fondet på oversikten. Du kan administrere denne innstillingen på siden [Fond](funds.md).
:::

## Gavememoer på oversikter {#gift-memos-on-statements}

Hver oversikt viser hver gave med dato, metode, fond og beløp. Når minst én gave på en oversikt har et **Memo**, legges det til en kolonne **Memo** etter fondet, slik at giveren kan se hva hver gave var ment for. Oversikter uten memoer beholder oppsettet med fire kolonner. En gaves **Notes** er interne og vises aldri på en oversikt. CSV-filene i ZIP-filen har memoet som sin siste kolonne.

For å få et formål med på oversikten, legger du det inn som gavens **Memo** når du [registrerer giften](recording-donations.md), eller gir det et eget [fond](funds.md) hvis du vil at det skal summeres separat.

## Kvitteringsformater for Canada, Australia og New Zealand {#receipt-formats-for-canada-australia-and-new-zealand}

Menigheter utenfor USA kan bytte oversikten til landets offisielle kvitteringsoppsett. Klikk **Statement format** øverst på siden Giving Statements (eller gå til **Settings** og åpne seksjonen **Giving**), og sett **Statement Format** (som starter på **Standard**) til **Canada - CRA official receipt**, **Australia** eller **New Zealand**. Fyll deretter inn feltene som vises: registreringsnummeret ditt (**CRA Registration Number**, **ABN** eller **NZ Charity Registration Number**), **Organization Address**, **Authorized Signatory Name** og for Canada **City of Issue**. Klikk **Save**.

Oversiktene får da den teksten skattemyndigheten forventer (for Canada, «Official Receipt for Income Tax Purposes» med CRA-referansen), et kvitteringsnummer i formen `YEAR-DONORID`, det kvalifiserende beløpet som bare telles fra skattefradragsberettigede fond, og en egen linje for eventuelle gaver til fond som ikke er skattefradragsberettiget. Givere ser den samme kvitteringsblokken når de skriver ut sin egen oversikt fra B1.church.

## Hva medlemmene ser i B1.church {#what-members-see-in-b1church}

Den samme innstillingsseksjonen **Giving** styrer hva medlemmene ser på sin egen giving-side i B1.church:

- **Member Giving History** velger hvilke år medlemmene kan se. **All years** er standard. **Through 2025** (eller et annet år) stopper ved det året, slik at medlemmene ikke kan vise eller skrive ut et senere år før du gir tillatelse. Bruk dette for å holde inneværende år tilbake mens du fullfører rettelser og refusjoner. **Hidden** fjerner giverhistorikk, årssummer og utskrift av oversikter helt. Medlemmer kan fortsatt gi.
- **Giving Note** er en kort melding som vises på medlemmets giving-side og i givehistorikken, og skrives ut nederst på alle gaveoversikter, også oversiktene du skriver ut her. Bruk den til ting som refusjonspolicyen din.

Disse innstillingene endrer bare hva medlemmene ser. Du kan fortsatt skrive ut ethvert år fra denne siden.

## Neste steg {#next-steps}

Hvis du må gå gjennom gavedetaljer før du lager oversiktene, gå til siden [Gaverapporter](donation-reports.md) eller se enkelte [batcher](batches.md).
