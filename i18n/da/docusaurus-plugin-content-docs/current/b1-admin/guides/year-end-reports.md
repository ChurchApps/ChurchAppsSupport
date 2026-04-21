---
title: "Guide: Generer år-slutrapporter"
---

# Generer år-slutrapporter

<div class="article-intro">

Gå gennem år-slutprocessen med at afslutte dine donationsregistreringer, verificere fondsindstillinger og generere skattefradrag givning sætninger for hver donor. Dette gøres typisk i tidlig januar for det foregående kalenderår.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- B1 Admin-konto med økonomisk adgang
- Donationer registreret hele året (online via Stripe og/eller manuelt anført)
- Adgang til din Stripe-konto hvis du accepterer online donationer

</div>

## Trin 1: Importér slutlige Stripe transaktioner

Sørg for at alle online donationer fra årets slutning er i dit system.

Følg vejledningen [Stripe import](../donations/stripe-import.md) for at:

1. Gå til donationer > batches > Stripe import
2. Vælg en dato område der dækker årets slutning (f.eks. december 1 - december 31)
3. Klik forhåndsvisning først til at gennemgå, derefter importér manglende til at afslutte

:::warning
Kør denne import før generering af sætninger. Enhver transaktioner du ikke har importeret vil ikke vises på donor sætninger.
:::

## Trin 2: Gennemgå donationsrapporter

Verificer dine registreringer er nøjagtige før generering af sætninger.

Følg vejledningen [Donationsrapporter](../donations/donation-reports.md) for at:

1. Kontrollér donationsoversigts siden for hele året
2. Gennemgå samlinger efter fond og sammenlign mod dine bankopgørelser for at finde fejl
3. Klik ind i individuelle batches for at verificere donor-niveau detaljer hvis nødvendigt

## Trin 3: Verificer fondsskatstatus

Sørg for at hver fonds skattefradrag indstilling er korrekt så sætninger er nøjagtige.

Følg vejledningen [Fonde](../donations/funds.md) for at:

1. Åbn hver fond og bekræft skattefradrag indstillingen er korrekt

:::info
Kun donationer til fonde markeret som skattefradrag vil vises på givnings sætninger. Hvis en fond burde være skattefradrag men ikke er markeret sådan, opdater det før generering af sætninger.
:::

## Trin 4: Generer givnings sætninger

Opret den officielle givnings sætninger for dine donorer.

Følg vejledningen [Givnings sætninger](../donations/giving-statements.md) for at:

1. Gå til donationer > sætninger
2. Vælg året fra rullemenuen og gennemgå oversigts statistikker
3. Vælg din download metode:
   - **Download ZIP** — individuelle CSV filer, en pr. donor
   - **Print alt** — udskrivelig visning med hver sætning på en ny side

:::tip
Generer sætninger tidlig i januar mens registreringer er friske. Dette giver dig tid til at finde problemer før du sender dem ud.
:::

## Trin 5: Distribuér til donorer

Få sætningerne ind i dine donorers hænder.

1. Print og mail sætninger eller email individuelle CSV-filer til donorer
2. Medlemmer kan også se deres egen givnings historie og print sætninger fra [B1.church](../../b1-church/giving/donation-history.md) og [B1 Mobile app](../../b1-mobile/giving/donation-history.md)

## Du er færdig!

Dine år-slutrapporter er fuldførte. Donorer har deres skattefradrag sætninger og dine økonomiske registreringer er afsluttet for året.

## Relaterede artikler

- [Stripe import](../donations/stripe-import.md) — importér online transaktioner
- [Donationsrapporter](../donations/donation-reports.md) — se givning trends og samlinger
- [Fonde](../donations/funds.md) — administrer fonde og skattefradrag indstillinger
- [Givnings sætninger](../donations/giving-statements.md) — generer år-slut sætninger
- [Registrering af donationer](../donations/recording-donations.md) — manuelt anført kontant/check donationer
- [Givnings historie (Web)](../../b1-church/giving/donation-history.md) — medlemmers selvbetjening visning
- [Opsætning af online givning vejledning](./online-giving.md) — oprindelig Stripe og givning opsætning
