---
title: "Veiledning: Sett opp nettbasert giving"
description: "Sett opp gaver på nett i B1 Admin: opprett gavefond, koble til Stripe og legg til en Donate-side på B1.church-nettstedet for medlemmer."
---

# Sett opp nettbasert giving

<div class="article-intro">

Gå gjennom alt du trenger for å ta imot nettbaserte gaver i menigheten din, fra å opprette gavefond, til å koble til Stripe for betalingsbehandling, til å dele givesiden med menigheten. Når du er ferdig, kan medlemmene gi på nett via nettstedet og mobilappen din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang, se [Roller og tilganger](../people/roles-permissions.md)
- En Stripe-konto (opprett en gratis på [stripe.com](https://stripe.com) om nødvendig)

</div>

## Steg 1: Opprett gavefond

Fond er kategoriene givere kan gi til. Du trenger minst ett fond før du kan ta imot gaver.

Følg veiledningen om [Fond](../donations/funds.md) for å sette opp giving-kategoriene dine:

1. Opprett de vanligste fondene dine (f.eks. «Generelt fond», «Byggefond», «Misjon»)
2. Merk skattefradragsberettigede fond riktig, dette påvirker årsoppgavene for gaver

:::tip
Du kan legge til flere fond når som helst. Start med de vanligste giving-kategoriene dine.
:::

## Steg 2: Koble til Stripe

Stripe håndterer all betalingsbehandling. Du kobler Stripe-kontoen din til B1 Admin, slik at gavene går inn på bankkontoen din.

Følg veiledningen [Oppsett av nettbasert giving](../donations/online-giving-setup.md) for å koble til Stripe:

1. Logg inn på Stripe-dashbordet ditt og hent ut din publiserbare nøkkel (Publishable Key) og hemmelige nøkkel (Secret Key)
2. I B1 Admin går du til Innstillinger og legger inn begge nøklene

:::warning
Stripe viser den hemmelige nøkkelen (Secret Key) bare én gang. Kopier og lagre den før du forlater Stripe-dashbordet. Hvis du mister den, må du generere en ny.
:::

## Steg 3: Legg til en givside på nettstedet ditt

Gjør det enkelt å gi ved å legge til en gavesside på B1-nettstedet ditt.

Følg veiledningene [Oppsett av nettbasert giving](../donations/online-giving-setup.md) og [Administrere sider](../website/managing-pages.md) for å:

1. Legge til en fane «Gi» (Donate) på B1.church-nettstedet ditt
2. Giving-adressen din blir: `https://dittundernavn.b1.church/donate`
3. Medlemmer kan gi uten å logge inn (offentlig side), eller logge inn for å lagre betalingsmetoder og se gavehistorikken sin

## Steg 4: Gjør en testgave

Før du kunngjør det for menigheten, bekreft at alt fungerer.

1. Gjør en liten testgave for å kontrollere at flyten fungerer fra start til slutt
2. Kontroller at gaven vises i B1 Admin under Gaver

:::tip
Bruk Stripes testmodus først hvis du vil verifisere uten ekte trekk, og bytt deretter til live-modus før du kunngjør det for menigheten.
:::

## Steg 5: Kunngjør det for menigheten

Spre budskapet slik at medlemmene vet at de kan gi på nett.

1. Del giving-adressen via nettstedet ditt, e-postnyhetsbrev, menighetsblad og sosiale medier
2. Medlemmer kan også gi via [B1 Mobile-appen](../../b1-mobile/giving/index.md), gitfunksjonen er innebygd

:::info
Medlemmer som logger inn, kan lagre betalingsmetoder, sette opp faste gaver og se gavehistorikken sin. Anonym giving fungerer også, uten innlogging.
:::

## Steg 6: Løpende drift

Hold gaveregistreringene dine oppdaterte og lag rapporter gjennom hele året.

1. [Importer Stripe-transaksjoner](../donations/stripe-import.md) regelmessig (ukentlig eller månedlig) for å holde registreringene oppdatert
2. [Se gaverapporter](../donations/donation-reports.md) for å følge utviklingen i giving og totalsummer per fond
3. [Lag årsoppgaver for gaver](../donations/giving-statements.md) til givernes skattedokumentasjon

:::tip
Kjør Stripe-importer minst månedlig, slik at registreringene dine holder seg oppdatert. Se [veiledningen for årsrapporter](./year-end-reports.md) for hele prosessen ved årsskifte.
:::

## Ferdig!

Menigheten din tar nå imot nettbaserte gaver. Medlemmene kan gi via nettstedet ditt, B1 Mobile-appen eller en hvilken som helst enhet med nettleser. Alle gaver registreres automatisk i B1 Admin.

## Relaterte artikler

- [Fond](../donations/funds.md): opprett og administrer gavekategorier
- [Batcher](../donations/batches.md): organiser gaver i grupper
- [Registrere gaver](../donations/recording-donations.md): legg inn kontant- og sjekkgaver manuelt
- [Stripe-import](../donations/stripe-import.md): hent nettbaserte transaksjoner inn i B1 Admin
- [Gaverapporter](../donations/donation-reports.md): se utvikling i giving og totalsummer
- [Årsoppgaver for gaver](../donations/giving-statements.md): lag skatteoppgaver for hele året
- [Gi gaver (web)](../../b1-church/giving/making-donations.md): opplevelsen for medlemmene når de gir
- [Gi gaver (mobil)](../../b1-mobile/giving/making-donations.md): gi via mobilappen
