---
title: "Appearance"
description: "I-set ang mga kulay, font, spacing, logo, at navigation ng website ng iyong simbahan sa B1 Admin, kasama ang mga widget, GA4 analytics, redirect, at custom CSS."
---

# Appearance

<div class="article-intro">

Hinahayaan ka ng pahinang Appearance na i-customize ang kabuuang itsura ng website ng iyong simbahan. Mula sa mga kulay at font hanggang sa spacing at custom CSS, makokontrol mo ang bawat aspeto ng biswal ng iyong site mula sa iisang lugar.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](./initial-setup.md) para sa iyong website
- Ihanda ang logo ng simbahan sa PNG format na may transparent na background at 4:1 na aspect ratio
- Alamin ang mga brand color ng simbahan (hex values) kung may umiiral kang style guide

</div>

## Pag-access sa Appearance Settings {#accessing-appearance-settings}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Website**.
2. I-click ang **Appearance**.
3. Bubukas ang pahinang **Site Styles**. Ipinapakita ng card na **Theme, fonts & footer** ang listahan ng **Style Settings** sa kaliwa at preview ng sample na site sa kanan. Sa ibaba nito ang mga card na **Announcement & widgets** at **Redirects & analytics**.

## Color Palette {#color-palette}

1. I-click ang **Color Palette** sa panel na Style Settings.
2. Makikita mo ang **Base Colors** (light, accent, at dark na shade) at **Semantic Colors** (Primary, Secondary, Success, Warning, at Error).
3. I-click ang alinmang color swatch para buksan ang color picker. I-drag ang selector o maglagay ng hex value para piliin ang kulay mo.
4. Ipinapakita ng **Color Combinations Preview** kung paano nagtutugma ang mga napili mong kulay.
5. Gamitin ang **Suggested Palettes** para magsimula sa paunang-dinisenyong color scheme. Ang pag-click sa isang palette ay naglo-load lamang ng mga kulay nito sa editor.
6. I-click ang **Save Palette** para ilapat ang mga kulay sa site, o **Cancel** para itapon ang mga ito.

## Typography {#typography}

1. I-click ang **Fonts** sa panel na Style Settings.
2. I-click ang button na **Heading Font** o **Body Font** para buksan ang **Select a Font** browser, na naglilista ng Google Fonts ayon sa kasikatan, sampu kada pahina. I-type sa **Search** para hanapin ang font ayon sa pangalan, o gamitin ang **Category Filter** (Serif, Sans Serif, Display, Handwriting, o Monospace). I-click ang font para piliin ito. Maaari mo ring i-click ang isa sa **Popular Font Combinations** para sabay na itakda ang parehong font.
3. I-click ang **Save Fonts** para ilapat ang iyong mga pagpili ng font.
4. Para ayusin ang hierarchy ng laki para sa Heading 1 hanggang Heading 4, i-click ang **Typography Scale** sa panel na Style Settings. Gamitin ang mga field na **Type Scale** multiplier, **Base Size**, at **Line Height** para pinuhin, pagkatapos i-click ang **Save Typography**.

## Spacing {#spacing}

1. I-click ang **Spacing Scale** sa panel na Style Settings.
2. Ayusin ang mga spacing value mula Extra Small hanggang Extra Large. May mga praktikal na halimbawang nagpapakita kung paano nakakaapekto ang bawat value sa layout.
3. I-click ang **Save Spacing** para ilapat ang mga value sa buong site mo.

## Logo at Branding {#logo-and-branding}

1. I-click ang **Logo** sa panel na Style Settings.
2. I-upload ang iyong **Light Background Logo** at **Dark Background Logo**. Gumamit ng mga larawang may transparent na background at 4:1 na aspect ratio para sa pinakamagandang resulta.
3. Mag-upload ng **Social Media Image** para sa link preview at **Favicon** para sa icon ng browser tab.
4. Opsyonal na maglagay ng **PWA Short Name** (hanggang 12 karakter) -- ang pangalang ipinapakita sa ilalim ng app icon ng simbahan mo kapag may nagdagdag nito sa home screen ng kanyang telepono.
5. I-click ang **Save Changes**. Hindi maiimbak ang mga na-upload na larawan hangga't hindi ka nagse-save, kaya kung susubukan mong isara o i-reload muna ang browser tab, babalaan ka ng browser na may hindi pa naseseguradong pagbabago.

Ginagamit ng lahat ng website ng iyong simbahan ang mga logo, pati na ng iyong app at mga naka-print na materyal gaya ng roll sheet.

:::tip
Para sa pinakamagandang resulta, gumamit ng logo na may transparent na background sa PNG format. Tinitiyak nito na maganda ang itsura nito sa parehong light at dark na background sa iyong website at [mobile app](../settings/mobile-app.md).
:::

## Navigation Styles {#navigation-styles}

I-customize ang mga kulay ng navigation bar ng iyong website para sa parehong solid at transparent na mode:

1. I-click ang **Navigation** sa panel na Style Settings
2. I-configure ang mga kulay para sa **Header (solid)** at **Header over hero (transparent)**
3. I-click ang **Save Navigation** para ilapat ang mga kulay ng navigation mo

Para sa detalyadong tagubilin, tingnan ang [Navigation Styles](./navigation-styles.md).

## Site Footer {#site-footer}

I-click ang **Site Footer** sa panel na Style Settings para buksan ang footer mo sa block editor. Buuin ito tulad ng alinmang seksyon ng pahina -- halimbawa, ang address mo, mga oras ng serbisyo, at social link -- at i-click ang **Exit** kapag tapos ka na. Lumalabas ang footer sa ibaba ng bawat pahinang gumagamit ng layout na **Header & Footer**. May sariling footer ang bawat isa sa iyong mga website.

## Announcement at Mga Widget {#announcement--widgets}

Lumalabas ang mga site widget sa bawat pahina ng iyong site, lumulutang sa ibabaw ng nilalaman ng pahina:

- **Announcement Banner** -- Isang bar sa itaas ng iyong site para sa mga mensaheng sensitibo sa oras, gaya ng paparating na event o pagbabago ng serbisyo, na maaaring isara ng bisita.
- **Launcher** -- Isang lumulutang na button na nagbubukas ng menu ng mabilisang access, halimbawa mga link para sa mag-give, mag-check in, o tingnan ang bulletin.

1. Hanapin ang card na **Announcement & widgets** sa ibaba ng Style Settings.
2. Para sa **Announcement Bar**, lagyan ng check ang **Enabled** at punan ang **Text**, opsyonal na **Link URL** at **Link Text**, at ang **Background Color** at **Text Color**. Magtakda ng **Start Date** at **End Date** para ipakita ang bar sa loob lamang ng panahong iyon.
3. Para sa **Launcher**, lagyan ng check ang **Enabled**, pagkatapos i-click ang **Add Action** para sa bawat link (hanggang lima) at bigyan ito ng **Label**, **URL**, at **Icon**. Piliin ang **Position** nito (kanan sa ibaba o kaliwa sa ibaba) at ang **Color** nito.
4. I-click ang **Save**.

Alisin ang check sa **Enabled** at i-click ang **Save** para i-off ang isang widget. Nalalapat ang mga widget na ito sa bawat isa sa mga website ng iyong simbahan.

## Redirects at Analytics {#redirects--analytics}

Ang card na **Redirects & analytics** (sa ibaba ng Style Settings) ay naglalaman ng dalawang magkaibang setting na karaniwang kailangan:

- **Analytics** -- Ilagay ang iyong **GA4 Measurement ID** (format na `G-XXXXXXXXXX`) at i-click ang **Save** para subaybayan ang trapiko ng bisita sa iyong website. Sinusubaybayan din ng parehong ID ang mga page view sa B1 app ng simbahan mo (ang member portal sa `/mobile`, kasama ang naka-install na app), na minarkahan ng `display_mode` na `installed` o `browser` para malaman mo sa Google Analytics kung alin ang bisita mula sa naka-install na app at alin ang mula sa browser.
- **Redirects** -- Imapa ang lumang URL path sa bago, para patuloy na gumana ang mga link sa pahinang inilipat o pinalitan ng pangalan sa halip na mag-404. Ilagay ang lumang **From Path** at ang bagong **To Path**, pagkatapos i-click ang **Add**. Agad na naiimbak ang redirect at nakalista sa itaas ng mga field; i-click ang delete icon nito para alisin. Naka-save sa lowercase ang mga path, may nangungunang slash at walang trailing slash. May prayoridad din ang redirect kaysa sa mga built-in na pahina ng B1 (`/sermons`, `/stream`, `/donate`, `/bible`, at `/votd`), kaya maaari mong ipadala ang address na iyon sa ibang lugar (halimbawa, sa sarili mong sermon page o sa YouTube channel). Hindi nito pinapalitan ang pahinang ginawa mo sa mismong address na iyon. Burahin muna ang pahinang iyon kung gusto mong magkabisa ang redirect.

## Custom CSS at JavaScript {#custom-css-and-javascript}

1. I-click ang **CSS & Javascript** sa panel na Style Settings.
2. Magdagdag ng **Custom CSS** para i-override ang mga karaniwang style para sa advanced na pag-customize.
3. Magdagdag ng **Custom HTML** para sa mga tracking code o iba pang script.
4. Gamitin ang mga seksyong **Common CSS Examples** at **Common JavaScript Examples** para sa mga handang snippet, pagkatapos i-click ang **Save Changes**.

:::warning
Makapangyarihan ang custom CSS pero maaaring masira ang layout ng site mo kapag mali ang gamit. Karamihan sa mga simbahan ay makakamit ang itsurang gusto nila gamit ang mga built-in na kontrol sa kulay, font, at spacing. Gamitin lamang ang custom CSS kung sanay ka sa web development.
:::

:::info
Nagpapatupad ang iyong site ng Content Security Policy na humaharang sa mga inline script mula sa anumang ibang pinagmulan. Ang field na **Custom HTML** dito, at ang [HTML element](./page-editor.md#using-the-html-element) sa mga indibidwal na pahina, ang mga pinagkakatiwalaang eksepsyon -- ang code na sine-save doon ay tumatakbo nang eksakto gaya ng pagkakasulat, kaya i-paste lamang ang mga script mula sa mga pinagkakatiwalaang pinagmulan (mga analytics tag, chat widget, at katulad na embed).
:::

## Style Themes {#style-themes}

Kung gusto mo ng mabilisang panimulang punto, ang **Suggested Palettes** sa seksyong Color Palette ay nag-aalok ng mga paunang-gawang tema na may magkakatugmang kulay. I-click ang isa para i-load ito, ayusin ang anumang kulay na gusto mo, pagkatapos i-click ang **Save Palette**.

## Mga Susunod na Hakbang {#next-steps}

- [Managing Pages](./managing-pages.md) -- Gumawa at mag-ayos ng mga pahina ng iyong website
- [Files](./files.md) -- Mag-upload ng media asset para sa iyong site
