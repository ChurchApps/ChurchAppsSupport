---
title: "Guide: Lanser menighetens nettside"
---

# Lanser menighetens nettside

<div class="article-intro">

B1.church inkluderer en komplett nettstedsbygger uten ekstra kostnad. Denne guiden tar deg gjennom å lage menighetens nettside fra bunnen av — sette opp hjemmesiden, konfigurere utseendet, legge til viktige sider, og valgfritt koble til nettgiving og påmeldingsskjemaer for arrangementer.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Ha menighetens logo klar (PNG med gjennomsiktig bakgrunn fungerer best)
- Velg 2–3 profilfarger for nettsiden din
- Hvis du bruker et eget domene (f.eks. dinmenighet.no), ha tilgang til DNS-leverandøren din (GoDaddy, Cloudflare, osv.)
- Hvis du vil ha nettgiving på nettsiden, fullfør [Oppsett av nettgiving](../donations/online-giving-setup.md) (Stripe) først

</div>

## Trinn 1: Første nettstedoppsett

Start med å lage hjemmesiden din og grunnleggende sidestruktur.

Følg guiden [Første nettstedoppsett](../website/initial-setup.md) for å:

1. Gå til **Nettside** i B1 Admin
2. Lag hjemmesiden din med en hero-seksjon, velkomstmelding og nøkkelinformasjon
3. Legg til menighetens navn og slagord

## Trinn 2: Konfigurer utseendet

Sett nettsidens visuelle identitet — farger, skrifttyper, logo og bunntekst.

Følg guiden [Utseende](../website/appearance.md) for å:

1. Laste opp menighetens logo
2. Sette hoved- og aksentfargene
3. Konfigurere navigasjonslinjen og bunnteksten
4. Forhåndsvise endringene dine

:::tip
Hold fargepaletten enkel — en hovedfarge pluss én aksentfarge er vanligvis nok. Nettstedsbyggeren tar seg av resten.
:::

## Trinn 3: Legg til innholdssider

Bygg ut sidene besøkende trenger mest.

Følg guiden [Administrere sider](../website/managing-pages.md) for å lage sider som:

- **Om oss** — Menighetens historie, trosbekjennelse og lederskap
- **Prekener** — Link til [prekenbiblioteket](../sermons/managing-sermons.md) ditt
- **Arrangementer** — Kommende arrangementer og påmelding
- **Gi** — Nettgivingsside (krever [Stripe-oppsett](../donations/online-giving-setup.md))
- **Kontakt** — Beliggenhet, gudstjenestetider og kontaktinformasjon

## Trinn 4: Koble til domenet ditt

Hvis du vil bruke ditt eget domenenavn (som dinmenighet.no) i stedet for standard B1-URL:

1. Gå til **Nettside > Innstillinger** i B1 Admin
2. Skriv inn ditt egendefinerte domene
3. Oppdater DNS-postene hos domeneleverandøren din slik at de peker til B1

:::info
DNS-endringer kan ta opptil 48 timer å forplante seg. Nettsiden din er kanskje ikke tilgjengelig fra det egendefinerte domenet umiddelbart. Standard B1-URL vil fortsette å fungere i denne perioden.
:::

## Trinn 5: Legg til giving og skjemaer

Forbedre nettsiden din med interaktive elementer:

- **Nettgiving** — Legg til en givingseksjon slik at medlemmer kan gi direkte fra nettsiden din. Se [Oppsett av nettgiving](../donations/online-giving-setup.md) for å konfigurere Stripe først.
- **Påmeldingsskjemaer** — Bygg inn [frittstående skjemaer](../forms/creating-forms.md) for arrangementspåmeldinger, besøkskort eller frivillig-søknader. Se [Administrere sider](../website/managing-pages.md) for hvordan du legger til et skjemaelement på en side.

## Du er ferdig!

Menighetens nettside er aktiv. Del URL-en med menigheten din og på sosiale medier. Du kan oppdatere innhold, legge til nye sider og justere utseendet når som helst fra B1 Admin-dashbordet.

## Relaterte artikler

- [Første nettstedoppsett](../website/initial-setup.md) — detaljert veiledning for oppsett
- [Administrere sider](../website/managing-pages.md) — legg til og rediger sider
- [Utseende](../website/appearance.md) — farger, logo og layout
- [Filhåndtering](../website/files.md) — last opp bilder og dokumenter
- [Oppsett av nettgiving](../donations/online-giving-setup.md) — konfigurer Stripe
- [Lage skjemaer](../forms/creating-forms.md) — lag påmeldings- og undersøkelsesskjemaer
