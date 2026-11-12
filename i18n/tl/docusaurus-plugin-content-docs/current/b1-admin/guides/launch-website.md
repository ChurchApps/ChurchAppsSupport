---
title: "Gabay: Ilunsad ang Website ng Iyong Simbahan"
description: "I-set up ang website ng simbahan sa B1 Admin: buuin ang iyong home page, itugma ang mga kulay at logo, magdagdag ng mahahalagang page, ikonekta ang custom domain, at magdagdag ng giving form."
---

# Ilunsad ang Website ng Iyong Simbahan

<div class="article-intro">

Kasama sa B1.church ang kumpletong website builder nang walang dagdag na bayad. Ginagabayan ka ng gabay na ito sa paggawa ng website ng iyong simbahan mula sa simula -- pag-set up ng iyong home page, pag-configure ng itsura at dating nito, pagdaragdag ng mahahalagang page, at opsyonal na pagkonekta ng online giving at event registration form.

</div>

## Training Video {#training-video}

<YouTube id="aA4UahZpmXg" title="Launching Your Church Website in B1" next="Editing Pages and Navigation in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Ihanda ang logo ng iyong simbahan (pinakamainam ang PNG na may transparent na background)
- Pumili ng 2–3 brand color para sa iyong site
- Kung gagamit ng custom domain (hal., yourchurch.com), kailangan mo ng access sa iyong DNS provider (GoDaddy, Cloudflare, atbp.)
- Kung gusto mo ng online giving sa iyong site, kumpletuhin muna ang [Online Giving Setup](../donations/online-giving-setup.md) (Stripe)

</div>

## Hakbang 1: Paunang Pag-set Up ng Website {#step-1-initial-website-setup}

Magsimula sa paggawa ng iyong home page at pangunahing istruktura ng site.

Sundin ang gabay na [Website Initial Setup](../website/initial-setup.md) para:

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **Website > Pages**
2. I-click ang **Add Page**, piliin ang **Blank**, ilagay ang "Home" bilang **Page Title**, at i-click ang **Save**. Sa **Page Settings**, itakda ang **URL Path** sa `/`
3. I-click ang **Edit Content**, magdagdag ng **Section**, pagkatapos idagdag ang iyong hero, welcome message, pangalan at tagline ng simbahan, at iba pang mahalagang impormasyon

:::tip
Magsisimula mula sa simula? Ang [Site Template](../website/managing-pages.md#starting-from-a-site-template) ay gagawa ng hanay ng mga handang page (home, about, connect, give, at iba pa) na may naka-ayos nang navigation link -- palitan lamang ang placeholder na nilalaman ng sarili mo.
:::

## Hakbang 2: I-configure ang Itsura {#step-2-configure-appearance}

Itakda ang visual identity ng iyong site -- mga kulay, font, logo, at footer.

Sundin ang gabay na [Appearance](../website/appearance.md) para:

1. Sa Jump menu, piliin ang **Website > Appearance**
2. Sa ilalim ng **Logo**, mag-upload ng **Light Background Logo** at **Dark Background Logo**
3. Sa ilalim ng **Color Palette**, itakda ang mga brand color mo at i-click ang **Save Palette**, pagkatapos pumili ng iyong **Fonts**
4. Gamitin ang **Navigation** para i-style ang navigation bar at ang **Site Footer** para buuin ang footer na lalabas sa bawat page

:::tip
Panatilihing simple ang iyong color palette -- karaniwang sapat na ang isang pangunahing kulay at isang accent na kulay. Ang website builder na ang bahala sa iba.
:::

## Hakbang 3: Magdagdag ng Mga Content Page {#step-3-add-content-pages}

Buuin ang mga page na pinakakailangan ng iyong mga bisita.

Sundin ang gabay na [Managing Pages](../website/managing-pages.md) para gumawa ng mga page gaya ng:

- **About** -- Kuwento, paniniwala, at pamumuno ng iyong simbahan
- **Sermons** -- Mag-link sa iyong [sermon library](../sermons/managing-sermons.md)
- **Events** -- Mga paparating na event at registration
- **Give** -- Online giving page (kailangan ng [Stripe setup](../donations/online-giving-setup.md))
- **Contact** -- Lokasyon, oras ng serbisyo, at contact info

## Hakbang 4: Ikonekta ang Iyong Domain {#step-4-connect-your-domain}

Kung gusto mong gamitin ang sarili mong domain name (gaya ng yourchurch.com) sa halip na default na B1 URL:

Sundin ang gabay na [Custom Domain](../settings/custom-domain.md) para:

1. Sa iyong domain provider, magdagdag ng **CNAME** record para sa `www` na tumuturo sa `proxy.b1.church` (o isang **A** record para sa root domain mo na tumuturo sa `3.23.251.61`)
2. Sa Jump menu, piliin ang **Settings > Settings**, i-click ang **Edit** sa seksyong **Domains**, i-type ang iyong domain, at i-click ang **Save**

:::info
Unahin ang pag-set up ng DNS: agad na sine-save ng B1 ang domain, pero hindi nito maloload ang iyong site (o makukuha ang SSL certificate nito) hangga't hindi tumuturo sa B1 ang DNS. Maaaring tumagal ng ilang minuto hanggang ilang oras ang mga pagbabago sa DNS. Patuloy na gumagana ang default na B1 URL sa buong panahon.
:::

## Hakbang 5: Magdagdag ng Giving at Mga Form {#step-5-add-giving-and-forms}

Pagandahin ang iyong site gamit ang mga interactive na elemento:

- **Online Giving** -- Magdagdag ng **Donation** element para makapagbigay ang mga miyembro nang direkta mula sa iyong website. Tingnan ang [Online Giving Setup](../donations/online-giving-setup.md) para mai-configure muna ang Stripe.
- **Registration Forms** -- I-embed ang [Stand Alone forms](../forms/creating-forms.md) para sa event sign-up, visitor card, o aplikasyon ng boluntaryo gamit ang **Form** element. Tingnan ang [Page Editor](../website/page-editor.md) para sa kung paano magdagdag ng elemento sa anumang page.

## Tapos Ka Na! {#youre-done}

Live na ang website ng iyong simbahan. Ibahagi ang URL sa iyong kongregasyon at sa social media. Maaari mong i-update ang nilalaman, magdagdag ng bagong page, at baguhin ang itsura anumang oras mula sa seksyong **Website** ng B1 Admin.

## Mga Kaugnay na Artikulo {#related-articles}

- [Website Initial Setup](../website/initial-setup.md) -- detalyadong gabay sa pag-set up
- [Managing Pages](../website/managing-pages.md) -- magdagdag at mag-edit ng mga page
- [Appearance](../website/appearance.md) -- kulay, logo, at layout
- [Page Editor](../website/page-editor.md) -- magdagdag ng section, teksto, larawan, form, at giving
- [Custom Domain](../settings/custom-domain.md) -- gamitin ang sarili mong web address
- [Managing Files](../website/files.md) -- mag-upload ng mga larawan at dokumento
- [Online Giving Setup](../donations/online-giving-setup.md) -- i-configure ang Stripe
- [Creating Forms](../forms/creating-forms.md) -- gumawa ng registration at survey form
