---
title: "Veiledning: Lansere menighetens nettsted"
description: "Sett opp et menighetsnettsted i B1 Admin: bygg forsiden, tilpass farger og logo, legg til sentrale sider, koble til eget domene og legg til skjemaer for giving."
---

# Lansere menighetens nettsted

<div class="article-intro">

B1.church inkluderer en fullstendig nettsidebygger uten ekstra kostnad. Denne veiledningen går gjennom hvordan du lager menighetens nettsted fra bunnen av – du setter opp forsiden, konfigurerer utseendet, legger til sentrale sider og kobler eventuelt til skjemaer for nettbasert giving og påmelding til arrangementer.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="aA4UahZpmXg" title="Launching Your Church Website in B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Ha menighetens logo klar (PNG med gjennomsiktig bakgrunn fungerer best)
- Velg 2–3 merkevarefarger for nettstedet ditt
- Hvis du bruker et eget domene (f.eks. yourchurch.com), må du ha tilgang til DNS-leverandøren din (GoDaddy, Cloudflare osv.)
- Hvis du vil ha nettbasert giving på nettstedet ditt, fullfør først [oppsettet for nettbasert giving](../donations/online-giving-setup.md) (Stripe)

</div>

## Steg 1: Førstegangsoppsett av nettstedet {#step-1-initial-website-setup}

Start med å lage forsiden og den grunnleggende strukturen på nettstedet.

Følg veiledningen [Førstegangsoppsett av nettsted](../website/initial-setup.md) for å:

1. I [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Website > Pages**
2. Klikk **Add Page**, velg **Blank**, skriv inn «Home» som **Page Title**, og klikk **Save**. Under **Page Settings** setter du **URL Path** til `/`
3. Klikk **Edit Content**, legg til en **Section**, og legg deretter til banneret, velkomstmeldingen, menighetens navn og slagord, og annen sentral informasjon

:::tip
Starter du fra bunnen av? En [nettstedsmal](../website/managing-pages.md#starting-from-a-site-template) lager et sett med ferdige sider (hjem, om oss, koble til, gi og flere) med navigasjonslenker allerede koblet opp – erstatt plassholderinnholdet med ditt eget.
:::

## Steg 2: Konfigurer utseendet {#step-2-configure-appearance}

Angi nettstedets visuelle identitet – farger, skrifter, logo og bunntekst.

Følg veiledningen [Utseende](../website/appearance.md) for å:

1. I hurtigmenyen velger du **Website > Appearance**
2. Under **Logo** laster du opp en **Light Background Logo** og en **Dark Background Logo**
3. Under **Color Palette** angir du merkevarefargene dine og klikker **Save Palette**, og velger deretter **Fonts**
4. Bruk **Navigation** til å style navigasjonsfeltet, og **Site Footer** til å bygge bunnteksten som vises på hver side

:::tip
Hold fargepaletten enkel – en primærfarge pluss én aksentfarge er vanligvis nok. Nettsidebyggeren tar seg av resten.
:::

## Steg 3: Legg til innholdssider {#step-3-add-content-pages}

Bygg opp sidene besøkende trenger mest.

Følg veiledningen [Administrere sider](../website/managing-pages.md) for å lage sider som:

- **About** – menighetens historie, tro og ledelse
- **Sermons** – lenke til [preken-arkivet ditt](../sermons/managing-sermons.md)
- **Events** – kommende arrangementer og påmelding
- **Give** – side for nettbasert giving (krever [Stripe-oppsett](../donations/online-giving-setup.md))
- **Contact** – adresse, gudstjenestetidspunkter og kontaktinformasjon

## Steg 4: Koble til domenet ditt {#step-4-connect-your-domain}

Hvis du vil bruke ditt eget domenenavn (for eksempel yourchurch.com) i stedet for standard B1-adresse:

Følg veiledningen [Eget domene](../settings/custom-domain.md) for å:

1. Hos domeneleverandøren din legger du til en **CNAME**-post for `www` som peker til `proxy.b1.church` (eller en **A**-post for rotdomenet ditt som peker til `3.23.251.61`)
2. I hurtigmenyen velger du **Settings > Settings**, klikker **Edit** i seksjonen **Domains**, skriver inn domenet ditt og klikker **Save**

:::info
Sett opp DNS først: B1 lagrer domenet med en gang, men nettstedet ditt lastes ikke (og SSL-sertifikatet får ikke utstedt) før DNS peker til B1. DNS-endringer kan ta fra noen minutter til et par timer. Standard B1-adressen fungerer hele tiden.
:::

## Steg 5: Legg til giving og skjemaer {#step-5-add-giving-and-forms}

Gjør nettstedet ditt mer interaktivt:

- **Nettbasert giving** – legg til et **Donation**-element slik at medlemmene kan gi direkte fra nettstedet ditt. Se [Oppsett av nettbasert giving](../donations/online-giving-setup.md) for å konfigurere Stripe først.
- **Påmeldingsskjemaer** – bygg inn [frittstående skjemaer](../forms/creating-forms.md) til påmelding til arrangementer, besøkskort eller frivilligsøknader med elementet **Form**. Se [Sidebygger](../website/page-editor.md) for hvordan du legger til elementer på en hvilken som helst side.

## Ferdig! {#youre-done}

Menighetens nettsted er live. Del adressen med menigheten din og på sosiale medier. Du kan oppdatere innhold, legge til nye sider og justere utseendet når som helst fra seksjonen **Website** i B1 Admin.

## Relaterte artikler {#related-articles}

- [Førstegangsoppsett av nettsted](../website/initial-setup.md) — detaljert gjennomgang av oppsettet
- [Administrere sider](../website/managing-pages.md) — legg til og rediger sider
- [Utseende](../website/appearance.md) — farger, logo og layout
- [Sidebygger](../website/page-editor.md) — legg til seksjoner, tekst, bilder, skjemaer og giving
- [Eget domene](../settings/custom-domain.md) — bruk din egen webadresse
- [Administrere filer](../website/files.md) — last opp bilder og dokumenter
- [Oppsett av nettbasert giving](../donations/online-giving-setup.md) — konfigurer Stripe
- [Opprette skjemaer](../forms/creating-forms.md) — lag påmeldings- og spørreundersøkelsesskjemaer
