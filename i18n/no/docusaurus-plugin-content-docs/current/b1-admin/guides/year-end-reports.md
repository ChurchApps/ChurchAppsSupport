---
title: "Guide: Generer arsrapporter for givertjenesten"
---

# Generer arsrapporter for givertjenesten

<div class="article-intro">

Ga gjennom arsskifteprosessen med a ferdigstille donasjonspostene, verifisere fondinnstillinger og generere skattefradragsberettigede giverutskrifter for alle givere. Dette gjores vanligvis tidlig i januar for det foregaende kalendraret.

</div>

<div class="prereqs">
<h4>For du begynner</h4>

- B1 Admin-konto med finansiell tilgang
- Donasjoner registrert gjennom aret (pa nett via Stripe og/eller manuelt registrert)
- Tilgang til Stripe-kontoen hvis du tar imot nettbaserte donasjoner

</div>

## Steg 1: Importer siste Stripe-transaksjoner

Sorge for at alle nettbaserte donasjoner fra arets slutt er i systemet.

Folg guiden [Stripe-import](../donations/stripe-import.md) for a:

1. Navigere til Donations > Batches > Stripe Import
2. Velge et datointervall som dekker slutten av aret (f.eks. 1. desember - 31. desember)
3. Klikke Preview forst for a gjennomga, deretter Import Missing for a ferdigstille

:::warning
Kjor denne importen for du genererer utskrifter. Transaksjoner du ikke har importert vil ikke vises pa giverutskriftene.
:::

## Steg 2: Gjennomga donasjonsrapporter

Bekreft at postene er korrekte for du genererer utskrifter.

Folg guiden [Donasjonsrapporter](../donations/donation-reports.md) for a:

1. Sjekke donasjonsoversiktssiden for hele aret
2. Gjennomga totaler per fond og sammenligne med kontoutskrifter for a avdekke avvik
3. Klikke inn i individuelle bunter for a verifisere giverniva-detaljer om nodvendig

## Steg 3: Verifiser fondenes skattestatus

Sorge for at hvert fonds skattefradragsinnstilling er korrekt slik at utskriftene blir riktige.

Folg guiden [Fond](../donations/funds.md) for a:

1. Apne hvert fond og bekrefte at skattefradragsinnstillingen er korrekt

:::info
Bare donasjoner til fond merket som skattefradragsberettigede vil vises pa giverutskriftene. Hvis et fond burde vaere skattefradragsberettiget men ikke er merket slik, oppdater det for du genererer utskrifter.
:::

## Steg 4: Generer giverutskrifter

Opprett de offisielle giverutskriftene for giverne.

Folg guiden [Giverutskrifter](../donations/giving-statements.md) for a:

1. Navigere til Donations > Statements
2. Velge aret fra rullegardinmenyen og gjennomga oppsummeringsstatistikken
3. Velge nedlastingsmetode:
   - **Last ned ZIP** -- individuelle CSV-filer, en per giver
   - **Skriv ut alle** -- utskriftsvennlig visning med hver utskrift pa en ny side

:::tip
Generer utskrifter tidlig i januar mens postene er ferske. Dette gir deg tid til a fange opp eventuelle problemer for du sender dem ut.
:::

## Steg 5: Distribuer til givere

Fa utskriftene ut til giverne.

1. Skriv ut og send utskrifter per post, eller send individuelle CSV-er pa e-post til givere
2. Medlemmer kan ogsa se sin egen giverhistorikk og skrive ut utskrifter fra [B1.church](../../b1-church/giving/donation-history.md) og [B1 Mobile-appen](../../b1-mobile/giving/donation-history.md)

## Du er ferdig!

Arsrapportene for givertjenesten er fullforte. Givere har sine skattefradragsberettigede utskrifter, og de finansielle postene er ferdigstilt for aret.

## Relaterte artikler

- [Stripe-import](../donations/stripe-import.md) -- importer nettbaserte transaksjoner
- [Donasjonsrapporter](../donations/donation-reports.md) -- se givertrender og totaler
- [Fond](../donations/funds.md) -- administrer fond og skattefradragsinnstillinger
- [Giverutskrifter](../donations/giving-statements.md) -- generer arsskifteutskrifter
- [Registrere donasjoner](../donations/recording-donations.md) -- legg inn kontant-/sjekkdonasjoner manuelt
- [Donasjonshistorikk (Nett)](../../b1-church/giving/donation-history.md) -- medlemmenes selvbetjeningsvisning
- [Guide for oppsett av nettbasert givertjeneste](./online-giving.md) -- forste oppsett av Stripe og givertjeneste
