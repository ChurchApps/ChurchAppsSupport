---
title: "Veiledning: Lansere menighetens nettsted"
---

# Lansere menighetens nettsted

<div class="article-intro">

B1.church inkluderer en komplett nettstedsbygger uten ekstra kostnad. Denne veiledningen går gjennom hvordan du lager menighetens nettsted fra bunnen av -- med å sette opp startsiden, konfigurere utseendet, legge til viktige sider og eventuelt koble til online giving og påmeldingsskjemaer for arrangementer.

</div>

## Opplæringsvideo

<YouTube id="aA4UahZpmXg" title="Launching Your Church Website in B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Ha menighetens logo klar (PNG med gjennomsiktig bakgrunn fungerer best)
- Velg 2–3 merkefarger for nettstedet ditt
- Hvis du bruker eget domene (for eksempel dinmenighet.no), må du ha tilgang til DNS-leverandøren din (GoDaddy, Cloudflare osv.)
- Hvis du vil ha online giving på nettstedet ditt, fullfør [Oppsett av online giving](../donations/online-giving-setup.md) (Stripe) først

</div>

## Steg 1: Førstegangsoppsett av nettstedet

Start med å lage startsiden din og den grunnleggende strukturen for nettstedet.

Følg veiledningen [Førstegangsoppsett av nettsted](../website/initial-setup.md) for å:

1. Gå til **Website** i B1 Admin
2. Lag startsiden din med en heltebolk (hero-seksjon), velkomstmelding og viktig informasjon
3. Legg til menighetens navn og slagord

## Steg 2: Konfigurer utseendet

Angi nettstedets visuelle identitet -- farger, skrifttyper, logo og bunntekst.

Følg veiledningen [Appearance](../website/appearance.md) for å:

1. Laste opp menighetens logo
2. Angi primær- og aksentfarge
3. Konfigurere navigasjonsfeltet og bunnteksten
4. Forhåndsvise endringene dine

:::tip
Hold fargepaletten enkel -- én primærfarge pluss én aksentfarge er vanligvis nok. Nettstedsbyggeren tar seg av resten.
:::

## Steg 3: Legg til innholdssider

Bygg ut sidene besøkende trenger mest.

Følg veiledningen [Administrere sider](../website/managing-pages.md) for å lage sider som:

- **About** -- Menighetens historie, tro og ledelse
- **Sermons** -- Lenke til [sermonbiblioteket ditt](../sermons/managing-sermons.md)
- **Events** -- Kommende arrangementer og påmelding
- **Give** -- Side for online giving (krever [Stripe-oppsett](../donations/online-giving-setup.md))
- **Contact** -- Adresse, gudstjenestetider og kontaktinformasjon

## Steg 4: Koble til domenet ditt

Hvis du vil bruke ditt eget domenenavn (for eksempel dinmenighet.no) i stedet for standard B1-nettadresse:

1. Gå til **Settings** i B1 Admin og åpne seksjonen **Domains**
2. Skriv inn ditt eget domene
3. Oppdater DNS-postene hos domeneleverandøren din, slik at de peker til B1

:::info
Det kan ta opptil 48 timer før DNS-endringer slår igjennom. Nettstedet ditt er kanskje ikke tilgjengelig via eget domene med en gang. Standard B1-nettadresse fungerer fortsatt i denne perioden.
:::

## Steg 5: Legg til giving og skjemaer

Gjør nettstedet ditt mer interaktivt:

- **Online Giving** -- Legg til en giveseksjon, slik at medlemmer kan gi direkte fra nettstedet ditt. Se [Oppsett av online giving](../donations/online-giving-setup.md) for å konfigurere Stripe først.
- **Registration Forms** -- Bygg inn [frittstående skjemaer](../forms/creating-forms.md) for påmelding til arrangementer, besøkskort eller frivillighetssøknader. Se [Administrere sider](../website/managing-pages.md) for hvordan du legger til et skjemaelement på en side.

## Du er ferdig!

Menighetens nettsted er nå live. Del nettadressen med menigheten din og på sosiale medier. Du kan oppdatere innhold, legge til nye sider og justere utseendet når som helst fra dashbordet i B1 Admin.

## Relaterte artikler

- [Førstegangsoppsett av nettsted](../website/initial-setup.md) -- detaljert gjennomgang av oppsettet
- [Administrere sider](../website/managing-pages.md) -- legg til og rediger sider
- [Appearance](../website/appearance.md) -- farger, logo og layout
- [Administrere filer](../website/files.md) -- last opp bilder og dokumenter
- [Oppsett av online giving](../donations/online-giving-setup.md) -- konfigurer Stripe
- [Opprette skjemaer](../forms/creating-forms.md) -- lag påmeldings- og undersøkelsesskjemaer
