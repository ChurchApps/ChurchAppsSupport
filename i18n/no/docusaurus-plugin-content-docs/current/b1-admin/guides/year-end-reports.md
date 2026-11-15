---
title: "Veiledning: Lag årsoppgaver for gaver"
description: "Fullfør årets gaveregistreringer i B1 Admin, kontroller skatteinnstillingene for fondene, og lag skattefradragsberettigede gaveoppgaver for hver giver."
---

# Lag årsoppgaver for gaver

<div class="article-intro">

Gå gjennom årsavslutningen: fullfør gaveregistreringene dine, kontroller innstillingene for fondene, og lag skattefradragsberettigede gaveoppgaver for hver giver. Dette gjøres vanligvis tidlig i januar for forrige kalenderår.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med tilgang til økonomi
- Gaver registrert gjennom hele året (på nett via Stripe og/eller lagt inn manuelt)
- Tilgang til Stripe-kontoen din hvis du tar imot gaver på nett

</div>

## Steg 1: Importer siste Stripe-transaksjoner {#step-1-import-final-stripe-transactions}

Sørg for at alle nettgaver fra slutten av året er i systemet ditt.

Følg veiledningen [Stripe-import](../donations/stripe-import.md) for å:

1. I [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu), velg **Gaver > Stripe-import** (dette vises bare når givertjenesten din er Stripe)
2. Sett **Startdato** og **Sluttdato** slik at de dekker slutten av året (f.eks. 1. desember – 31. desember)
3. Klikk først på **Forhåndsvis** for å gjennomgå, og deretter på **Importer manglende** for å fullføre

:::warning
Kjør denne importen før du lager oppgavene. Transaksjoner du ikke har importert, vil ikke vises på giveroppgavene.
:::

## Steg 2: Gjennomgå gaverapporter {#step-2-review-donation-reports}

Kontroller at registreringene dine er riktige før du lager oppgavene.

Følg veiledningen [Gaverapporter](../donations/donation-reports.md) for å:

1. I hurtigmenyen, velg **Gaver > Oppsummering**, sett **Startdato** og **Sluttdato** under **Filtrer rapport** til hele året, og klikk på **Kjør rapport**
2. Gå gjennom summene per fond, og sammenlign dem med kontoutskriftene dine for å finne avvik. Klikk på **Nedlastingsalternativer** og velg **Oppsummering** for å få en CSV-fil
3. Åpne enkeltbatcher under **Gaver > Batcher** for å kontrollere detaljer per giver hvis det er nødvendig

## Steg 3: Kontroller skattestatus for fondene {#step-3-verify-fund-tax-status}

Sørg for at skatteinnstillingen for hvert fond er riktig, slik at oppgavene blir korrekte.

Følg veiledningen [Fond](../donations/funds.md) for å:

1. I hurtigmenyen, velg **Gaver > Fond** og kontroller **Skattestatus** for hvert fond
2. Klikk på **Rediger** for et fond for å endre innstillingen **Skattefradragsberettiget**

:::info
Bare gaver til fond som er merket som skattefradragsberettigede, vises på gaveoppgavene. Hvis et fond skal være skattefradragsberettiget, men ikke er merket slik, oppdater det før du lager oppgavene.
:::

## Steg 4: Lag gaveoppgaver {#step-4-generate-giving-statements}

Lag de offisielle gaveoppgavene for giverne dine.

Følg veiledningen [Gaveoppgaver](../donations/giving-statements.md) for å:

1. I hurtigmenyen, velg **Gaver > Gaveoppgaver**
2. Velg **År** og gjennomgå oppsummeringstallene. Kirker i Canada, Australia eller New Zealand kan klikke på **Oppgaveformat** for å bytte til landets offisielle kvitteringsoppsett
3. Velg nedlastingsmetode:
   - **Last ned ZIP** — individuelle CSV-filer, én per giver
   - **Skriv ut alle** — utskriftsvisning med hver oppgave på ny side, med kirkens logo øverst (hvis du har lastet den opp)

:::tip
Lag oppgavene tidlig i januar mens registreringene fortsatt er ferske. Da har du tid til å rette eventuelle problemer før de sendes ut.
:::

## Steg 5: Del ut til givere {#step-5-distribute-to-donors}

Sørg for at oppgavene kommer frem til giverne.

1. Skriv ut og send oppgavene i posten, eller send de enkelte CSV-filene på e-post til givere
2. Medlemmer kan også se sin egen gavehistorikk og skrive ut oppgaver på [B1.church eller i B1 App](../../b1-church/giving/donation-history.md)

## Du er ferdig! {#youre-done}

Årsoppgavene for gaver er ferdige. Giverne har sine skattefradragsberettigede oppgaver, og regnskapet ditt er avsluttet for året.

## Relaterte artikler {#related-articles}

- [Stripe-import](../donations/stripe-import.md) — importer nettransaksjoner
- [Gaverapporter](../donations/donation-reports.md) — se gavetrender og summer
- [Fond](../donations/funds.md) — administrer fond og innstillinger for skattefradrag
- [Gaveoppgaver](../donations/giving-statements.md) — lag årsoppgaver
- [Registrere gaver](../donations/recording-donations.md) — legg inn kontant- og sjekkgaver manuelt
- [Gavehistorikk (nett)](../../b1-church/giving/donation-history.md) — selvbetjeningsvisning for medlemmer
- [Veiledning: Sett opp nettbasert giving](./online-giving.md) — førstegangsoppsett av Stripe og giving
