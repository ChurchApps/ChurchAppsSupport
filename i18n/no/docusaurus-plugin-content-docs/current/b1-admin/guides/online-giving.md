---
title: "Veiledning: Sett opp gaver på nett"
description: "Sett opp gaver på nett i B1 Admin ved å opprette gavefond, koble til Stripe og legge til en gavesside på B1.church-nettstedet ditt for medlemmene."
---

# Sett opp gaver på nett

<div class="article-intro">

Gå gjennom alt du trenger for å ta imot gaver på nett i menigheten din, fra å opprette gavefond, til å koble til Stripe for betalingsbehandling, til å dele gavesiden med menigheten. Når du er ferdig, kan medlemmene gi på nett via nettstedet og mobilappen din.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang, se [Roller og tillatelser](../people/roles-permissions.md)
- En Stripe-konto (opprett en gratis på [stripe.com](https://stripe.com) om nødvendig)

</div>

## Trinn 1: Opprett gavefond

Fond er kategoriene givere kan gi til. Du trenger minst ett fond før du kan ta imot gaver.

Følg veiledningen om [Fond](../donations/funds.md) for å sette opp gavekategoriene dine:

1. Opprett de vanligste fondene dine (f.eks. «Generalfondet», «Byggefondet», «Misjon»)
2. Merk skattefradragsberettigede fond på riktig måte, dette påvirker gaveoppgavene ved årsslutt

:::tip
Du kan legge til flere fond når som helst. Start med de vanligste gavekategoriene dine.
:::

## Trinn 2: Koble til Stripe

Stripe håndterer all betalingsbehandling. Du kobler Stripe-kontoen din til B1 Admin, slik at gaver går inn på bankkontoen din.

Følg veiledningen [Oppsett av gaver på nett](../donations/online-giving-setup.md) for å koble til Stripe:

1. Logg inn på Stripe-dashbordet ditt og hent frem den publiserbare nøkkelen og den hemmelige nøkkelen din
2. I B1 Admin går du til Innstillinger og legger inn begge nøklene

:::warning
Stripe viser den hemmelige nøkkelen din bare én gang. Kopier og lagre den før du forlater Stripe-dashbordet. Hvis du mister den, må du generere en ny.
:::

## Trinn 3: Legg til en gaveside på nettstedet ditt

Gjør det enkelt å gi ved å legge til en gavefaneside på B1-nettstedet ditt.

Følg veiledningene [Oppsett av gaver på nett](../donations/online-giving-setup.md) og [Administrere sider](../website/managing-pages.md) for å:

1. Legge til en fane «Gi» på B1.church-nettstedet ditt
2. Gave-URL-en din blir: `https://yoursubdomain.b1.church/donate`
3. Medlemmene kan gi uten å logge inn (offentlig side), eller logge inn for å bruke lagrede betalingsmetoder og se gavehistorikk

## Trinn 4: Gjør en testgave

Før du kunngjør dette for menigheten, kontroller at alt fungerer.

1. Gjør en liten testgave for å bekrefte at hele flyten fungerer
2. Kontroller at gaven vises i B1 Admin under Gaver

:::tip
Bruk Stripes testmodus først hvis du vil kontrollere uten ekte belastninger, og bytt deretter til live-modus før du kunngjør for menigheten.
:::

## Trinn 5: Kunngjør for menigheten

Fortell medlemmene at de kan gi på nett.

1. Del gave-URL-en via nettstedet, e-postnyhetsbrev, menighetsbladet og sosiale medier
2. Medlemmene kan også gi via [B1-appen](../../b1-church/giving/index.md). Gavefunksjonen er innebygd

:::info
Medlemmer som logger inn, kan lagre betalingsmetoder, sette opp gjentakende gaver og se gavehistorikken sin. Anonyme gaver fungerer også, uten at det kreves innlogging.
:::

## Trinn 6: Løpende administrasjon

Hold gaveregistreringene dine oppdatert og lag rapporter gjennom hele året.

1. [Importer Stripe-transaksjoner](../donations/stripe-import.md) jevnlig (ukentlig eller månedlig) for å holde registreringene dine oppdatert
2. [Vis gaverapporter](../donations/donation-reports.md) for å følge gavetrender og summer per fond
3. [Lag gaveoppgaver for årsslutt](../donations/giving-statements.md) til giverne dine til skattebruk

:::tip
Kjør Stripe-importer minst månedlig, slik at registreringene dine er oppdatert. Se [veiledningen for årsrapporter](./year-end-reports.md) for hele prosessen ved årsslutt.
:::

## Du er ferdig!

Menigheten din tar nå imot gaver på nett. Medlemmene kan gi via nettstedet ditt, B1-appen eller en hvilken som helst enhet med nettleser. Alle gaver registreres automatisk i B1 Admin.

## Relaterte artikler

- [Fond](../donations/funds.md): opprett og administrer gavekategorier
- [Batcher](../donations/batches.md): organiser gaver i grupper
- [Registrere gaver](../donations/recording-donations.md): legg inn kontant- og sjekkgaver manuelt
- [Stripe-import](../donations/stripe-import.md): hent nettbaserte transaksjoner inn i B1 Admin
- [Gaverapporter](../donations/donation-reports.md): se gavetrender og summer
- [Gaveoppgaver](../donations/giving-statements.md): lag skatteoppgaver for årsslutt
- [Gi gaver](../../b1-church/giving/making-donations.md): gaveopplevelsen for medlemmer på B1.church og i B1-appen
