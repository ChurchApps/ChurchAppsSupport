---
title: "Itsura"
---

# Itsura

<div class="article-intro">

Hinahayaan ka ng pahinang Appearance na i-customize ang kabuuang itsura at dating ng website ng iyong simbahan. Mula sa mga kulay at font hanggang sa espasyo at custom CSS, makokontrol mo ang bawat biswal na aspeto ng iyong site mula sa iisang lugar.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para sa iyong website
- Ihanda ang logo ng iyong simbahan sa PNG format na may transparent na background at 4:1 na aspect ratio
- Alamin ang mga brand color ng iyong simbahan (hex values) kung mayroon kang umiiral na style guide

</div>

## Pag-access sa Mga Setting ng Itsura

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Website**.
2. I-click ang **Appearance**.
3. Lalabas ang pahinang **Site Styles**. Ang card na **Theme, fonts & footer** ay nagpapakita ng listahan ng **Style Settings** sa kaliwa at preview ng isang sample na site sa kanan. Sa ibaba nito ang mga card na **Announcement & widgets** at **Redirects & analytics**.

## Color Palette {#color-palette}

1. I-click ang **Color Palette** sa panel ng Style Settings.
2. Makikita mo ang **Base Colors** (light, accent, at dark na shade) at ang **Semantic Colors** (Primary, Secondary, Success, Warning, at Error).
3. I-click ang alinmang color swatch para buksan ang color picker. I-drag ang selector o maglagay ng hex value para piliin ang iyong kulay.
4. Ipinapakita ng **Color Combinations Preview** kung paano nagtutugma ang mga napili mong kulay.
5. Gamitin ang **Suggested Palettes** para mabilis na ilapat ang isang paunang dinisenyong color scheme.
6. I-click ang **Save Palette** kapag nasiyahan ka na.

## Typography

1. I-click ang **Fonts** sa panel ng Style Settings.
2. I-click ang button na **Heading Font** o **Body Font** para buksan ang font browser. Maaari kang maghanap ayon sa pangalan o mag-browse ayon sa mga kategorya tulad ng Serif, Sans Serif, Display, Handwriting, at Monospace. Maaari ka ring pumili ng isa sa mga **Popular Font Combinations**.
3. I-click ang **Save Fonts** para ilapat ang iyong mga pinili sa font.
4. Para isaayos ang hierarchy ng laki para sa Heading 1 hanggang Heading 4, i-click ang **Typography Scale** sa panel ng Style Settings. Gamitin ang mga field na **Type Scale** multiplier, **Base Size**, at **Line Height** para pinuhin, pagkatapos ay i-click ang **Save Typography**.

## Spacing

1. I-click ang **Spacing Scale** sa panel ng Style Settings.
2. Isaayos ang mga halaga ng espasyo mula Extra Small hanggang Extra Large. Ipinapakita ng mga praktikal na halimbawa kung paano naaapektuhan ng bawat halaga ang layout.
3. I-click ang **Save Spacing** para ilapat ang mga halaga sa buong site mo.

## Logo at Branding {#logo-and-branding}

1. I-click ang **Logo** sa panel ng Style Settings.
2. I-upload ang iyong **Light Background Logo** at **Dark Background Logo**. Gumamit ng mga larawang may transparent na background at 4:1 na aspect ratio para sa pinakamahusay na resulta.
3. I-upload ang **Social Media Image** para sa mga link preview at ang **Favicon** para sa icon ng browser tab.
4. I-click ang **Save Changes**. Hindi naiimbak ang mga na-upload na larawan hangga't hindi mo sini-save, kaya kung susubukan mong isara o i-reload ang browser tab nang una, magbababala ang iyong browser na may hindi pa naisasaving pagbabago.

:::tip
Para sa pinakamahusay na resulta, gumamit ng logo na may transparent na background sa PNG format. Tinitiyak nito na maganda ang itsura nito sa parehong light at dark na background sa iyong website at [mobile app](../settings/mobile-app.md).
:::

## Mga Estilo ng Navigation

I-customize ang mga kulay ng navigation bar ng iyong website para sa parehong solid at transparent na mode:

1. I-click ang **Navigation** sa panel ng Style Settings
2. I-configure ang mga kulay para sa **Header (solid)** at **Header over hero (transparent)**
3. I-click ang **Save Navigation** para ilapat ang mga kulay ng navigation

Para sa detalyadong mga tagubilin, tingnan ang [Navigation Styles](./navigation-styles.md).

## Announcement at Mga Widget

Lumalabas ang mga site widget sa bawat pahina ng iyong site, nakalutang sa ibabaw ng nilalaman ng pahina:

- **Announcement Banner** -- Isang bar sa itaas ng iyong site na maaaring isara, para sa mga mensaheng sensitibo sa oras, tulad ng paparating na event o pagbabago ng serbisyo.
- **Launcher** -- Isang lumulutang na button na nagbubukas ng menu para sa mabilisang access, halimbawa mga link para mag-give, mag-check in, o tingnan ang bulletin.

1. Hanapin ang card na **Announcement & widgets** sa ibaba ng Style Settings.
2. I-on ang mga widget na nais mo at i-configure ang kanilang text, link, at kulay.
3. I-click ang **Save**.

## Redirects at Analytics

Ang card na **Redirects & analytics** (sa ibaba ng Style Settings) ay naglalaman ng dalawang magkaibang setting na madalas kailanganin:

- **Analytics** -- Idagdag ang iyong **GA4 Measurement ID** (format na `G-XXXXXXXXXX`) para subaybayan ang trapiko ng mga bisita sa iyong website. Ang parehong ID ay nagtatala rin ng mga page view sa app ng B1 ng iyong simbahan (ang member portal sa `/mobile`, kabilang ang naka-install na app), na may markang `display_mode` na `installed` o `browser` para malaman mo sa Google Analytics kung alin ang galing sa naka-install na app at alin ang galing sa browser.
- **Redirects** -- Ituro ang lumang URL path sa bago, para patuloy na gumana ang mga link sa pahinang inilipat o pinalitan ng pangalan sa halip na mag-404. Ilagay ang lumang **From** path at ang bagong **To** path, pagkatapos i-click ang **Save**. Inuuna rin ng redirect ang mga built-in na pahina ng B1 (`/sermons`, `/stream`, `/donate`, `/bible`, at `/votd`), kaya maaari mong ipadala ang address na iyon sa ibang lugar (halimbawa, sa sarili mong pahina ng sermon o isang YouTube channel). Hindi nito pinapalitan ang pahinang ginawa mo mismo sa parehong address. Burahin muna ang pahinang iyon kung nais mong gumana ang redirect.

## Custom CSS at JavaScript

1. I-click ang **CSS & Javascript** sa panel ng Style Settings.
2. Magdagdag ng **Custom CSS** para i-override ang mga default na estilo para sa advanced na pag-customize.
3. Magdagdag ng **Custom HTML** para sa tracking code o iba pang script.
4. Gamitin ang seksyong **Common JavaScript Examples** para sa mga snippet tulad ng integrasyon sa Google Analytics.

:::warning
Makapangyarihan ang custom CSS ngunit maaari nitong sirain ang layout ng iyong site kung mali ang paggamit. Karamihan sa mga simbahan ay makakamit ang itsurang gusto nila gamit ang mga built-in na kontrol sa kulay, font, at espasyo. Gumamit lamang ng custom CSS kung komportable ka sa web development.
:::

:::info
Nagpapatupad ang iyong site ng Content Security Policy na humaharang sa mga inline script mula sa anumang ibang pinagmulan. Ang field na **Custom HTML** dito, at ang [HTML element](page-editor#using-the-html-element) sa mga indibidwal na pahina, ang mga pinagkakatiwalaang eksepsiyon -- ang code na sini-save mo roon ay tatakbo nang eksakto kung paano ito, kaya i-paste lamang ang mga script mula sa mga pinagkakatiwalaang pinagmulan (mga analytics tag, chat widget, at katulad na embed).
:::

## Mga Style Theme

Kung nais mo ng mabilis na panimulang punto, ang **Suggested Palettes** sa seksyong Color Palette ay nag-aalok ng mga paunang handang theme na nagtatakda ng magkakatugmang kulay sa isang click lamang. Maaari mong pinuhin ang mga indibidwal na setting pagkatapos mong ilapat ang isang theme.

## Mga Susunod na Hakbang

- [Managing Pages](managing-pages) -- Gumawa at mag-ayos ng mga pahina ng iyong website
- [Files](files) -- Mag-upload ng media asset para sa iyong site
