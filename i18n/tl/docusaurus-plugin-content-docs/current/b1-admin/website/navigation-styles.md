---
title: "Mga Istilo ng Navigation"
description: "I-customize ang mga kulay ng solid at transparent na navigation bar ng website sa B1 Admin, kabilang ang mga estado ng link, hover, at active para sa site ng iyong simbahan."
---

# Mga Istilo ng Navigation

<div class="article-intro">

I-customize ang mga kulay ng navigation bar ng website ng iyong simbahan para tumugma sa iyong branding. Maaari mong i-configure ang mga kulay para sa parehong solid na background at transparent na overlay, para ganap mong makontrol kung paano lumilitaw ang iyong navigation sa iba't ibang pahina.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na mag-edit ng nilalaman ng website. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mga detalye.
- Ihanda ang mga brand color mo, kasama ang hex color code (hal., #03A9F4).
- Unawain ang pagkakaiba ng solid at transparent na istilo ng navigation sa iyong website.

</div>

## Pag-unawa sa Mga Mode ng Navigation {#understanding-navigation-modes}

Maaaring lumitaw ang navigation ng iyong website sa dalawang magkaibang istilo depende sa pahina:

- **Solid navigation** -- Navigation bar na may kulay ng background, karaniwang ginagamit sa mga content page
- **Transparent navigation** -- Navigation na nasa ibabaw ng nilalaman ng pahina, karaniwang ginagamit sa mga pahinang may hero image o full-screen na background

Maaari mong i-customize ang mga kulay para sa parehong mode nang hiwalay.

## Pag-access sa Mga Istilo ng Navigation {#accessing-navigation-styles}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Website**
2. I-click ang **Appearance**
3. Sa listahang **Style Settings**, i-click ang **Navigation**

May dalawang card ang editor na **Navigation Styling**: ang **Header (solid)** at ang **Header over hero (transparent)**.

## Pag-configure ng Solid Navigation {#configuring-solid-navigation}

Lumilitaw ang solid navigation na may kulay ng background sa likod ng navigation bar. Nasa card na **Header (solid)** ang mga setting na ito. Opsyonal ang bawat kulay: habang naka-off ang switch na **Override** nito, pinananatili ng navigation ang normal na kulay ng iyong site. Maaari mong i-customize ang:

### Background Color {#background-color}

1. I-toggle ang switch na **Override** para sa **Background color**
2. I-click ang color picker
3. Piliin ang gusto mong background color (nagsisimula ang picker sa puti, #FFFFFF)

### Link Color {#link-color}

1. I-toggle ang switch na **Override** para sa **Link color**
2. Piliin ang kulay ng teksto ng navigation link
3. Nakakaapekto ito sa mga link sa karaniwang estado nila (nagsisimula ang picker sa dark gray, #555555)

### Link Hover Color {#link-hover-color}

1. I-toggle ang switch na **Override** para sa **Link hover color**
2. Piliin ang kulay na magiging link kapag itinapat ng mga user ang mouse dito
3. Nagbibigay ito ng visual na feedback para sa mga clickable na link (nagsisimula ang picker sa light blue, #03A9F4)

### Active Color {#active-color}

1. I-toggle ang switch na **Override** para sa **Active link color**
2. Piliin ang kulay para sa link ng kasalukuyang pahina
3. Nakakatulong ito sa mga user na malaman kung nasaang pahina sila (nagsisimula ang picker sa light blue, #03A9F4)

## Pag-configure ng Transparent Navigation {#configuring-transparent-navigation}

Ang transparent na navigation ay nasa ibabaw ng nilalaman ng pahina nang walang background. Nasa card na **Header over hero (transparent)** ang mga setting na ito. Habang naka-off ang isang switch na **Override**, awtomatikong tumutugma ang kulay na iyon sa kulay ng teksto ng hero section. Maaari mong i-customize ang:

### Link Color {#link-color-1}

1. I-toggle ang switch na **Override** para sa **Link color**
2. Pumili ng kulay na mahusay na nagkakaiba sa background ng iyong pahina
3. Kadalasang pinakamainam ang puti o mapuputing kulay sa ibabaw ng madidilim na background

### Link Hover Color {#link-hover-color-1}

1. I-toggle ang switch na **Override** para sa **Link hover color**
2. Piliin ang kulay ng hover state
3. Siguraduhing nakikita ito laban sa background ng iyong pahina

### Active Color {#active-color-1}

1. I-toggle ang switch na **Override** para sa **Active link color**
2. Piliin ang kulay ng indicator ng aktibong pahina
3. Dapat kitang-kita ito habang bagay pa rin sa disenyo mo

:::info
Walang setting ng background color ang transparent na navigation dahil direktang nakapatong ito sa nilalaman ng pahina.
:::

## Pag-save ng Mga Pagbabago {#saving-your-changes}

1. Pagkatapos i-configure ang mga kulay mo, i-click ang **Save Navigation**
2. Agad na nalalapat ang mga pagbabago sa live mong website
3. Bisitahin ang iyong website para makita ang navigation sa parehong mode

## Pagbabalik sa Default {#resetting-to-defaults}

Kung gusto mong bumalik sa mga karaniwang kulay:

1. I-toggle na naka-off ang mga switch na **Override** para sa anumang custom na kulay
2. I-click ang **Save Navigation**
3. Babalik ang navigation sa normal na kulay ng iyong site (at, sa ibabaw ng hero, sa kulay ng teksto ng hero)

O i-click ang **Cancel** para itapon ang lahat ng pagbabago nang hindi nagse-save.

## Mga Pinakamahusay na Kasanayan {#best-practices}

### Contrast ng Kulay {#color-contrast}

- **Pagkabasa** -- Siguraduhing sapat ang contrast ng mga kulay ng link laban sa background
- **Pagsunod sa WCAG** -- Layunin ang hindi bababa sa 4.5:1 na contrast ratio para sa accessibility
- **Subukan ang parehong mode** -- I-preview ang iyong site gamit ang parehong solid at transparent na navigation

### Pagkakapare-pareho ng Brand {#brand-consistency}

- **Gamitin ang mga brand color mo** -- Itugma sa iyong logo at tema ng website
- **Limitahan ang palette** -- Dumikit sa 2-3 kulay para sa magkakaugnay na itsura
- **Isaalang-alang ang iyong mga larawan** -- Kung gagamit ng transparent na navigation, subukan ito laban sa karaniwang background ng pahina

### Mga Hover at Active State {#hover-and-active-states}

- **Malinaw na feedback** -- Gawing halatang iba ang mga hover state sa karaniwang link
- **Pagkilala sa mga aktibong pahina** -- Gumamit ng natatanging kulay para malaman ng mga user kung nasaan sila
- **Maayos na transition** -- Awtomatikong ina-animate ng sistema ang pagbabago ng kulay

## Troubleshooting {#troubleshooting}

### Hindi Tama ang Itsura ng Mga Kulay {#colors-dont-look-right}

- **I-clear ang iyong cache** -- Maaaring magpakita ng lumang kulay ang browser caching
- **Suriin ang hex code** -- Siguraduhing tama ang mga hex color code na inilagay mo
- **Subukan sa iba't ibang background** -- Maaaring magmukhang iba ang mga kulay depende sa pahina

### Hindi Nakikita ang Navigation {#navigation-not-visible}

- **Transparent mode** -- Kung transparent na navigation sa ibabaw ng magagaan na larawan, maaaring mahirap makita ang maitim na teksto
- **Solusyon** -- Ayusin ang mga kulay ng link o gumamit ng mas madilim na background ng pahina
- **Alternatibo** -- Magdagdag ng banayad na shadow o background overlay sa bahagi ng navigation

## Mga Teknikal na Detalye {#technical-details}

Naka-imbak bilang JSON ang mga istilo ng navigation at inilalapat gamit ang CSS variable:

- Agad na nagkakabisa ang mga pagbabago nang hindi kinakailangang i-rebuild ang site
- Lumalaganap ang mga kulay sa lahat ng elemento ng navigation
- Opsyonal ang mga override; ang mga kulay na walang nakatakda ay gumagamit ng default ng theme

## Mga Kaugnay na Artikulo {#related-articles}

- [Appearance](./appearance.md) -- I-customize ang kabuuang itsura at dating ng website mo
- [Managing Pages](./managing-pages.md) -- Gumawa at mag-ayos ng mga pahina ng website mo
- [Page Editor](./page-editor.md) -- Idisenyo ang mga layout at nilalaman ng pahina
