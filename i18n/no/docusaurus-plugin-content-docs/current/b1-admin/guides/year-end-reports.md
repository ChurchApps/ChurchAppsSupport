---
title: "Veiledning: Generer årsoppgaver for gaver"
description: "I B1 Admin fullfører du årets gaveregistreringer, kontrollerer skatteinnstillingene for fondene og genererer skattefradragsberettigede gaveoppgaver for hver giver."
---

# Generer årsoppgaver for gaver

<div class="article-intro">

Gå gjennom årsprosessen med å fullføre gaveregistreringene, kontrollere fondsinnstillingene og generere skattefradragsberettigede gaveoppgaver for hver giver. Dette gjøres vanligvis tidlig i januar for forrige kalenderår.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med tilgang til økonomi
- Gaver registrert gjennom året (online via Stripe og/eller manuelt registrert)
- Tilgang til din Stripe-konto hvis du tar imot online-gaver

</div>

## Steg 1: Importer siste Stripe-transaksjoner

Sørg for at alle online-gaver fra slutten av året er i systemet ditt.

Følg veiledningen [Stripe-import](../donations/stripe-import.md) for å:

1. Gå til Donasjoner > Stripe-import
2. Velg en datoperiode som dekker slutten av året (f.eks. 1. desember – 31. desember)
3. Klikk på Forhåndsvis først for å gjennomgå, og deretter på Importer manglende for å fullføre

:::warning
Kjør denne importen før du genererer oppgavene. Transaksjoner du ikke har importert, vil ikke vises på giveroppgavene.
:::

## Steg 2: Gjennomgå gaverapporter

Kontroller at registreringene dine er korrekte før du genererer oppgavene.

Følg veiledningen [Gaverapporter](../donations/donation-reports.md) for å:

1. Sjekk sammendragssiden for hele året
2. Gå gjennom summene per fond og sammenlign dem med banksaldoen din for å finne eventuelle avvik
3. Klikk inn på enkelte batcher for å kontrollere detaljer per giver ved behov

## Steg 3: Kontroller skattestatus for fond

Sørg for at skattefradragsinnstillingen for hvert fond er riktig, slik at oppgavene blir korrekte.

Følg veiledningen [Fond](../donations/funds.md) for å:

1. Åpne hvert fond og bekreft at innstillingen for skattefradrag er riktig

:::info
Bare gaver til fond som er merket som skattefradragsberettigede, vises på gaveoppgavene. Hvis et fond skulle vært skattefradragsberettiget, men ikke er merket slik, oppdater det før du genererer oppgavene.
:::

## Steg 4: Generer gaveoppgaver

Lag de offisielle gaveoppgavene for giverne dine.

Følg veiledningen [Gaveoppgaver](../donations/giving-statements.md) for å:

1. Gå til **Donasjoner > Gaveoppgaver**
2. Velg året i nedtrekkslisten og gjennomgå oppsummeringstallene
3. Velg nedlastingsmetode:
   - **Last ned ZIP** — individuelle CSV-filer, én per giver
   - **Skriv ut alle** — utskriftsvisning med hver oppgave på en egen side, med kirkens logo øverst (hvis du har lastet opp en)

:::tip
Generer oppgavene tidlig i januar mens registreringene er ferske. Da har du tid til å fange opp eventuelle problemer før de sendes ut.
:::

## Steg 5: Distribuer til givere

Sørg for at oppgavene kommer frem til giverne.

1. Skriv ut og send oppgavene med post, eller send individuelle CSV-filer på e-post til giverne
2. Medlemmer kan også se sin egen gavehistorikk og skrive ut oppgaver på [B1.church eller i B1 App](../../b1-church/giving/donation-history.md)

## Du er ferdig!

Årets gaverapporter er fullført. Giverne har sine skattefradragsberettigede oppgaver, og de økonomiske registreringene dine er avsluttet for året.

## Relaterte artikler

- [Stripe-import](../donations/stripe-import.md) — importer online-transaksjoner
- [Gaverapporter](../donations/donation-reports.md) — se gavetrender og summer
- [Fond](../donations/funds.md) — administrer fond og skattefradragsinnstillinger
- [Gaveoppgaver](../donations/giving-statements.md) — generer årsoppgaver for gaver
- [Registrer gaver](../donations/recording-donations.md) — registrer kontant- og sjekkgaver manuelt
- [Gavehistorikk (web)](../../b1-church/giving/donation-history.md) — selvbetjeningsvisning for medlemmer
- [Veiledning: Sett opp online-giving](./online-giving.md) — første oppsett av Stripe og gaver
