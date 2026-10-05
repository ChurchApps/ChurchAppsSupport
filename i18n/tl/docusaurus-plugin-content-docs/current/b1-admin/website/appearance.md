---
title: "Hitsura"
---

# Hitsura

<div class="article-intro">

Ang pahinang Appearance (Hitsura) ay nagbibigay-daan sa iyong i-customize ang kabuuang itsura at dating ng website ng inyong simbahan. Mula sa mga kulay at font hanggang sa spacing at custom CSS, makokontrol mo ang bawat visual na aspeto ng iyong site mula sa iisang lugar.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para sa iyong website
- Ihanda ang logo ng inyong simbahan sa PNG format na may transparent na background at 4:1 na aspect ratio
- Alamin ang mga brand color ng inyong simbahan (hex values) kung mayroon na kayong style guide

</div>

## Pagpunta sa Appearance Settings

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Website**.
2. I-click ang **Appearance**.
3. Magloload ang pahinang Site Styles na may live preview ng iyong website sa kaliwa at mga opsyon ng **Style Settings** sa kanan.

## Color Palette

1. I-click ang **Color Palette** sa Style Settings panel.
2. Makikita mo ang **Base Colors** (light, accent, at dark na mga shade) at **Semantic Colors** (Primary, Secondary, Success, Warning, at Error).
3. I-click ang anumang color swatch para buksan ang color picker. I-drag ang selector o maglagay ng hex value para piliin ang iyong kulay.
4. Ipinapakita ng **Color Combinations Preview** kung paano nagtutugma ang mga napili mong kulay.
5. Gamitin ang **Suggested Palettes** para mabilis na mag-apply ng handang color scheme.
6. I-click ang **Save** kapag kuntento ka na.

## Typography

1. I-click ang **Typography Settings** sa Style Settings panel.
2. I-click ang **Select a Font** para buksan ang font browser. Maaari kang maghanap ayon sa pangalan o mag-browse ng mga kategorya tulad ng Serif, Sans Serif, Display, Handwriting, at Monospace.
3. Magtakda ng font para sa mga heading at sa body text.
4. I-click ang **Typography Scale** para ayusin ang hierarchy ng laki mula Heading 1 hanggang Heading 4. Gamitin ang scale multiplier at base size na mga field para sa mas pinong pag-aayos.
5. I-click ang **Save** para i-apply ang mga napili mong font.

## Spacing

1. I-click ang **Spacing Scale** sa Style Settings panel.
2. Ayusin ang mga spacing value mula Extra Small hanggang Extra Large. May mga praktikal na halimbawa na nagpapakita kung paano nakakaapekto ang bawat value sa layout.
3. I-click ang **Save Spacing** para i-apply ang mga value sa buong site mo.

## Logo at Branding

1. I-click ang **Logo** sa Style Settings panel.
2. I-upload ang iyong **Light Background Logo** at **Dark Background Logo**. Gumamit ng mga larawang may transparent na background at 4:1 na aspect ratio para sa pinakamagandang resulta.
3. Mag-upload ng **Social Media Image** para sa mga link preview at ng **Favicon** para sa icon sa tab ng browser.

:::tip
Para sa pinakamagandang resulta, gumamit ng logo na may transparent na background sa PNG format. Sa ganitong paraan, magiging maganda ito sa parehong light at dark na background sa buong website mo at sa [mobile app](../settings/mobile-app.md).
:::

## Navigation Styles

I-customize ang mga kulay ng navigation bar ng iyong website para sa parehong solid at transparent na mode:

1. Mag-scroll sa seksyong **Navigation Styles**
2. I-click ang **Edit Navigation Styles**
3. I-configure ang mga kulay para sa solid na navigation (may background) at transparent na navigation (overlay mode)
4. I-click ang **Save** para i-apply ang mga kulay ng iyong navigation

Para sa detalyadong tagubilin, tingnan ang [Navigation Styles](./navigation-styles.md).

## Announcement at Widgets

Lumalabas ang mga site widget sa bawat pahina ng iyong site, na nakalutang sa ibabaw ng nilalaman ng pahina:

- **Announcement Banner** -- Isang bar sa itaas ng iyong site na maaaring isara, para sa mga mensaheng may takdang oras, tulad ng paparating na event o pagbabago sa oras ng serbisyo.
- **Launcher** -- Isang lumulutang na button na nagbubukas ng quick-access menu, halimbawa mga link para magbigay, mag-check in, o tingnan ang bulletin.

1. I-click ang **Announcement & Widgets** sa Style Settings panel.
2. I-on ang mga widget na gusto mo at i-configure ang kanilang text, mga link, at mga kulay.
3. I-click ang **Save**.

## Redirects at Analytics

Ang panel na **Redirects & Analytics** sa Style Settings ay may dalawang magkaibang setting na madalas kailanganin:

- **Analytics** -- Idagdag ang iyong **Google Analytics 4 Measurement ID** para masubaybayan ang trapiko ng mga bisita sa iyong website.
- **Redirects** -- I-map ang lumang URL path sa bago, para patuloy na gumana ang mga link sa pahinang inilipat o pinalitan ng pangalan at hindi mauwi sa 404. Ilagay ang lumang **From** path at ang bagong **To** path, pagkatapos ay i-click ang **Save**.

## Custom CSS at JavaScript

1. I-click ang **CSS and Javascript** sa Style Settings panel.
2. Magdagdag ng **Custom CSS** para i-override ang mga default na style para sa advanced na customization.
3. Magdagdag ng **Custom HTML** para sa mga tracking code o iba pang script.
4. Gamitin ang seksyong **Common Javascript Examples** para sa mga snippet tulad ng integrasyon ng Google Analytics.

:::warning
Makapangyarihan ang Custom CSS ngunit maaari nitong masira ang layout ng iyong site kung hindi tama ang paggamit. Karamihan ng mga simbahan ay nakukuha ang itsurang gusto nila gamit ang built-in na mga kontrol sa kulay, font, at spacing. Gumamit lamang ng custom CSS kung komportable ka sa web development.
:::

:::info
Nagpapatupad ang iyong site ng Content Security Policy na humaharang sa mga inline script mula sa anumang ibang pinagmulan. Ang field na **Custom JavaScript** ang nag-iisang pinagkakatiwalaang eksepsiyon -- ang code na isinave mo roon ay tatakbo nang kung ano ito, kaya mag-paste lamang ng mga script mula sa mga pinagkakatiwalaan mong pinagmulan (analytics tag, chat widget, at mga katulad na embed).
:::

## Style Themes

Kung gusto mo ng mabilis na panimulang punto, ang **Suggested Palettes** sa seksyong Color Palette ay may mga handang theme na nagtatakda ng magkakatugmang kulay sa isang click lang. Maaari mo pa ring ayusin ang mga indibidwal na setting pagkatapos mag-apply ng theme.

## Mga Susunod na Hakbang

- [Pamamahala ng mga Pahina](managing-pages) -- Buuin at ayusin ang mga pahina ng iyong website
- [Files](files) -- Mag-upload ng mga media asset para sa iyong site
