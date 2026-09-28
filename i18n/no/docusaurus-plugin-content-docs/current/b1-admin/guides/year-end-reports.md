---
title: "Veiledning: Generer årsavslutningsdonasjonsrapporter"
---

# Generer årsavslutningsdonasjonsrapporter

<div class="article-intro">

Gå gjennom årsavslutningsprosessen med å avsluttende dine donasjonsposter, verifisere fondinnstillinger, og generer skattemessig fradragsberettigede donasjonserklæringer for hver donor. Dette gjøres vanligvis tidlig i januar for forrige kalenderår.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med finanstilgang
- Donasjoner registrert gjennom året (online via Stripe og/eller manuelt lagt inn)
- Tilgang til Stripe-kontoen din hvis du godtar online donasjoner

</div>

## Trinn 1: Importer endelige Stripe-transaksjoner

Sørg for at alle online donasjoner fra slutten av året er i systemet ditt.

Følg [Stripe-import](../donations/stripe-import.md)-veiledningen for å:

1. Gå til Donasjoner > Batcher > Stripe-import
2. Velg et datoområde som dekker slutten av året (f.eks. 1. desember - 31. desember)
3. Klikk Forhåndsvis først for å gjennomgå, deretter Importer manglende for å fullføre

:::warning
Kjør denne importen før du genererer erklæringer. Eventuelle transaksjoner som du ikke har importert, vil ikke vises på donatorerklæringer.
:::

## Trinn 2: Se over donasjonrapporter

Verifiser at postene dine er nøyaktige før du genererer erklæringer.

Følg [Donasjonrapporter](../donations/donation-reports.md)-veiledningen for å:

1. Sjekk donasjonsoversiktssiden for hele året
2. Se over totaler etter fond og sammenlign med bankkontoutskrifter for å fange eventuelle avvik
3. Klikk inn i individuelle batcher for å verifisere donator-nivådetaljer hvis nødvendig

## Trinn 3: Verifiser fondskattestatus

Sørg for at hver fonds skattemessig fradragsberettigede innstilling er korrekt slik at erklæringer er nøyaktige.

Følg [Fond](../donations/funds.md)-veiledningen for å:

1. Åpne hvert fond og bekreft at den skattemessig fradragsberettigede innstillingen er korrekt

:::info
Bare donasjoner til fond merket som skattemessig fradragsberettiget vises på donasjonserklæringer. Hvis et fond burde være skattemessig fradragsberettiget, men ikke er merket på den måten, oppdater det før du genererer erklæringer.
:::

## Trinn 4: Generer donasjonserklæringer

Opprett de offisielle donasjonserklæringene for donatorene dine.

Følg [Donasjonserklæringer](../donations/giving-statements.md)-veiledningen for å:

1. Gå til **Donasjoner > Donasjonserklæringer**
2. Velg året fra rullegardinmenyen og se over oppsummeringsstatistikken
3. Velg nedlastingsmetode:
   - **Last ned ZIP** -- individuelle CSV-filer, en per donor
   - **Skriv ut alt** -- utskrivbar visning med hver erklæring på en ny side

:::tip
Generer erklæringer tidlig i januar mens postene er friske. Dette gir deg tid til å fange eventuelle problemer før du sender dem ut.
:::

## Trinn 5: Distribuer til donatorer

Få erklæringene i donatorenes hender.

1. Skriv ut og send per post erklæringer, eller send e-post individuelle CSV-er til donatorer
2. Medlemmer kan også vise sin egen donasjonhistorie og skrive ut erklæringer fra [B1.church](../../b1-church/giving/donation-history.md) og [B1-mobilappen](../../b1-mobile/giving/donation-history.md)

## Du er ferdig!

Årsavslutningsdonasjonrapportene dine er fullstendige. Donatorer har sine skattemessig fradragsberettigede erklæringer, og dine finansielle poster er avsluttende for året.

## Relaterte artikler

- [Stripe-import](../donations/stripe-import.md) -- importer online transaksjoner
- [Donasjonrapporter](../donations/donation-reports.md) -- vis donasjontrender og totaler
- [Fond](../donations/funds.md) -- administrer fond og skattemessig fradragsberettigede innstillinger
- [Donasjonserklæringer](../donations/giving-statements.md) -- generer årsavslutningserklæringer
- [Registrer donasjoner](../donations/recording-donations.md) -- manuelt skriv inn kontant-/sjekkdonasjoner
- [Donasjonhistorie (nett)](../../b1-church/giving/donation-history.md) -- medlem selvbetjeningsvisning
- [Sett opp online donasjonsveiledning](./online-giving.md) -- innledende Stripe og donasjonoppsett
