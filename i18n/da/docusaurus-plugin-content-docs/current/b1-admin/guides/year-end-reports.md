---
title: "Vejledning: Generer årsopgørelser over gaver"
description: "I B1 Admin afslutter du årets donationsregistreringer, kontrollerer skatteindstillingerne for fonde og genererer skattefradragsberettigede gaveopgørelser til hver donor."
---

# Generer årsopgørelser over gaver

<div class="article-intro">

Gennemgå processen for at afslutte årets donationsregistreringer, kontrollere fondsindstillinger og generere skattefradragsberettigede gaveopgørelser til hver donor. Dette gøres typisk i begyndelsen af januar for det foregående kalenderår.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- B1 Admin-konto med adgang til økonomi
- Donationer registreret i løbet af året (online via Stripe og/eller manuelt indtastet)
- Adgang til din Stripe-konto, hvis du modtager online-donationer

</div>

## Trin 1: Importér de endelige Stripe-transaktioner

Sørg for, at alle online-donationer fra slutningen af året er i dit system.

Følg vejledningen [Stripe-import](../donations/stripe-import.md) for at:

1. Gå til Donationer > Stripe-import
2. Vælg en datoperiode, der dækker slutningen af året (f.eks. 1. december - 31. december)
3. Klik på Forhåndsvisning først for at gennemgå, og derefter på Importér manglende for at færdiggøre

:::warning
Kør denne import, før du genererer opgørelserne. Transaktioner, du ikke har importeret, vises ikke på donorernes opgørelser.
:::

## Trin 2: Gennemgå donationsrapporter

Kontrollér, at dine registreringer er korrekte, før du genererer opgørelserne.

Følg vejledningen [Donationsrapporter](../donations/donation-reports.md) for at:

1. Kontrollere donationsoversigten for hele året
2. Gennemgå totalerne pr. fond og sammenligne dem med dine kontoudtog for at finde eventuelle uoverensstemmelser
3. Klik ind på de enkelte batches for at kontrollere donorspecifikke oplysninger, hvis det er nødvendigt

## Trin 3: Kontrollér fondenes skattestatus

Sørg for, at hvert fonds skattefradragsindstilling er korrekt, så opgørelserne er præcise.

Følg vejledningen [Fonde](../donations/funds.md) for at:

1. Åbne hvert fond og bekræfte, at indstillingen for skattefradrag er korrekt

:::info
Kun donationer til fonde, der er markeret som skattefradragsberettigede, vises på gaveopgørelserne. Hvis et fond skulle være skattefradragsberettiget, men ikke er markeret sådan, skal du opdatere det, før du genererer opgørelserne.
:::

## Trin 4: Generer gaveopgørelser

Opret de officielle gaveopgørelser til dine donorer.

Følg vejledningen [Gaveopgørelser](../donations/giving-statements.md) for at:

1. Gå til **Donationer > Gaveopgørelser**
2. Vælg året i rullemenuen, og gennemgå oversigtsstatistikkerne
3. Vælg din downloadmetode:
   - **Download ZIP** — individuelle CSV-filer, én pr. donor
   - **Udskriv alle** — udskriftsvenlig visning med hver opgørelse på en ny side og dit kirkelogo øverst (hvis du har uploadet et)

:::tip
Generer opgørelserne tidligt i januar, mens registreringerne stadig er friske. Så har du tid til at rette eventuelle problemer, før de sendes ud.
:::

## Trin 5: Distribuer til donorerne

Sørg for, at opgørelserne kommer frem til dine donorer.

1. Udskriv og send opgørelserne med posten, eller send de individuelle CSV-filer til donorerne via e-mail
2. Medlemmer kan også se deres egen gavehistorik og udskrive opgørelser på [B1.church eller i B1 App](../../b1-church/giving/donation-history.md)

## Så er du færdig!

Dine årsopgørelser over gaver er nu færdige. Donorerne har fået deres skattefradragsberettigede opgørelser, og dine økonomiske registreringer for året er afsluttet.

## Relaterede artikler

- [Stripe-import](../donations/stripe-import.md) — importér online-transaktioner
- [Donationsrapporter](../donations/donation-reports.md) — se udviklinger og totaler for gaver
- [Fonde](../donations/funds.md) — administrér fonde og indstillinger for skattefradrag
- [Gaveopgørelser](../donations/giving-statements.md) — generer årsopgørelser
- [Registrering af donationer](../donations/recording-donations.md) — indtast kontant- og checkdonationer manuelt
- [Donationshistorik (web)](../../b1-church/giving/donation-history.md) — selvbetjeningsvisning for medlemmer
- [Vejledning: Opsæt online-gaver](./online-giving.md) — indledende opsætning af Stripe og gaver
