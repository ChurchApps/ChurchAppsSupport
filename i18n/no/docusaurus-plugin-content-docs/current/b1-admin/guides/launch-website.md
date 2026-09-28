---
title: "Veiledning: Start kirchens nettsted"
---

# Start kirchens nettsted

<div class="article-intro">

B1.church inkluderer en full nettstedbygger uten ekstra kostnader. Denne veiledningen leder deg gjennom opprettelse av kirchens nettsted fra bunnen av -- innstilling av hjemmesiden, konfigurering av utseende og følelse, tillegg av nøkkelsider, og valgfritt tilkobling av online donasjon og eventregistreringsskjemaer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Ha kirchens logo klart (PNG med gjennomsiktig bakgrunn fungerer best)
- Velg 2–3 merkefarger for nettstedet ditt
- Hvis du bruker et egendefinert domene (f.eks. dinkirke.no), ha tilgang til DNS-leverandøren din (GoDaddy, Cloudflare, osv.)
- Hvis du vil ha online donasjon på nettstedet ditt, fullfør [Online donasjonoppsett](../donations/online-giving-setup.md) (Stripe) først

</div>

## Trinn 1: Innledende nettstedsoppsett

Start med å opprette hjemmesiden og den grunnleggende nettstedstrukturen.

Følg [Innledende nettstedsoppsett](../website/initial-setup.md)-veiledningen for å:

1. Navigere til **Nettsted** i B1 Admin
2. Opprett hjemmesiden med en heltaktseksjon, velkomstmelding og nøkkelinformasjon
3. Legg til kirchens navn og tagline

## Trinn 2: Konfigurer utseende

Angi nettstedets visuelle identitet -- farger, skrifter, logo og bunntekst.

Følg [Utseende](../website/appearance.md)-veiledningen for å:

1. Last opp kirchens logo
2. Angi primær og aksent-farger
3. Konfigurer navigasjonslinjen og bunnteksten
4. Forhåndsvis endringene dine

:::tip
Hold fargepaletten enkel -- en primærfarge pluss en aksent-farge er vanligvis nok. Nettstedbyggeren vil håndtere resten.
:::

## Trinn 3: Legg til innholdssider

Bygge ut sidene besøkende trenger mest.

Følg [Administrer sider](../website/managing-pages.md)-veiledningen for å opprette sider som:

- **Om** -- Kirchens historie, tro og lederskap
- **Prekener** -- Lenke til [prekenbiblioteket ditt](../sermons/managing-sermons.md)
- **Arrangementer** -- Kommende arrangementer og registrering
- **Doner** -- Online donasjonsside (krever [Stripe-oppsett](../donations/online-giving-setup.md))
- **Kontakt** -- Plassering, servicetider og kontaktinformasjon

## Trinn 4: Koble domenet ditt

Hvis du vil bruke ditt eget domenenavn (som dinkirke.no) i stedet for standard-B1-URLen:

1. Gå til **Innstillinger** i B1 Admin og åpne **Domener**-seksjonen
2. Skriv inn egendefinert domene ditt
3. Oppdater DNS-oppføringene hos domeneleverandøren din til å peke på B1

:::info
DNS-endringer kan ta opptil 48 timer å forplante. Nettstedet ditt er kanskje ikke tilgjengelig fra egendefinert domene umiddelbart. Standard B1-URLen vil fortsette å fungere i denne tiden.
:::

## Trinn 5: Legg til donasjon og skjemaer

Forbedre nettstedet ditt med interaktive elementer:

- **Online donasjon** -- Legg til en doneringsseksjon slik at medlemmer kan donere direkte fra nettstedet ditt. Se [Online donasjonoppsett](../donations/online-giving-setup.md) for å konfigurere Stripe først.
- **Registreringsskjemaer** -- Inneby [frittstående skjemaer](../forms/creating-forms.md) for påmeldinger til arrangementer, besøkskort eller frivillig søknader. Se [Administrer sider](../website/managing-pages.md) for hvordan du legger til et skjemaelement på en hvilken som helst side.

## Du er ferdig!

Kirchens nettsted er live. Del URLen med menigheten din og på sosiale medier. Du kan oppdatere innhold, legge til nye sider og justere utseendet når som helst fra B1 Admin-instrumentbordet.

## Relaterte artikler

- [Innledende nettstedsoppsett](../website/initial-setup.md) -- detaljert oppsettsvandring
- [Administrer sider](../website/managing-pages.md) -- legg til og rediger sider
- [Utseende](../website/appearance.md) -- farger, logo og oppsett
- [Administrer filer](../website/files.md) -- last opp bilder og dokumenter
- [Online donasjonoppsett](../donations/online-giving-setup.md) -- konfigurer Stripe
- [Opprett skjemaer](../forms/creating-forms.md) -- bygg registrerings- og spørreundersøkelsesskjemaer
