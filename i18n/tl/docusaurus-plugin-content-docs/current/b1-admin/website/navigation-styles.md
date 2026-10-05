---
title: "Navigation Styles"
---

# Navigation Styles

<div class="article-intro">

I-customize ang mga kulay ng navigation bar ng website ng inyong simbahan para tumugma sa inyong branding. Maaari mong i-configure ang mga kulay para sa parehong solid na background at transparent na overlay, kaya ikaw ang may ganap na kontrol sa itsura ng iyong navigation sa iba't ibang pahina.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng pahintulot para pamahalaan ang website ng inyong simbahan. Tingnan ang [Mga Role at Pahintulot](../people/roles-permissions.md) para sa mga detalye.
- Ihanda ang inyong mga brand color, kasama ang mga hex color code (hal., #03A9F4).
- Unawain ang pagkakaiba ng solid at transparent na navigation style sa iyong website.

</div>

## Pag-unawa sa mga Navigation Mode

Maaaring lumabas ang navigation ng iyong website sa dalawang magkaibang style depende sa pahina:

- **Solid navigation** -- Navigation bar na may background color, karaniwang ginagamit sa mga content page
- **Transparent navigation** -- Navigation na nakapatong sa nilalaman ng pahina, karaniwang ginagamit sa mga pahinang may hero image o full-screen na background

Maaari mong i-customize nang hiwalay ang mga kulay para sa bawat mode.

## Pagpunta sa Navigation Styles

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Website**
2. I-click ang **Appearance**
3. Mag-scroll sa seksyong **Navigation Styles**
4. I-click ang **Edit Navigation Styles**

## Pag-configure ng Solid Navigation

Lumalabas ang solid navigation na may background color sa likod ng navigation bar. Maaari mong i-customize ang:

### Background Color

1. I-toggle ang **Override** switch para sa **Background Color**
2. I-click ang color picker
3. Piliin ang gusto mong background color
4. Ang default ay puti (#FFFFFF)

### Link Color

1. I-toggle ang **Override** switch para sa **Link Color**
2. Piliin ang kulay para sa text ng mga navigation link
3. Nakakaapekto ito sa mga link sa kanilang default na estado
4. Ang default ay dark gray (#555555)

### Link Hover Color

1. I-toggle ang **Override** switch para sa **Link Hover Color**
2. Piliin ang kulay na lilipatan ng mga link kapag itinapat ng mga user ang cursor sa mga ito
3. Nagbibigay ito ng visual na tugon para sa mga link na maaaring i-click
4. Ang default ay light blue (#03A9F4)

### Active Color

1. I-toggle ang **Override** switch para sa **Active Color**
2. Piliin ang kulay para sa link ng kasalukuyang aktibong pahina
3. Tinutulungan nito ang mga user na malaman kung nasaang pahina sila
4. Ang default ay light blue (#03A9F4)

## Pag-configure ng Transparent Navigation

Nakapatong ang transparent navigation sa nilalaman ng iyong pahina nang walang background. Maaari mong i-customize ang:

### Link Color

1. I-toggle ang **Override** switch para sa **Link Color**
2. Pumili ng kulay na malinaw ang contrast sa background ng iyong pahina
3. Kadalasan, puti o mapusyaw na mga kulay ang pinakamainam sa ibabaw ng madilim na background
4. Ang default ay dark gray (#555555)

### Link Hover Color

1. I-toggle ang **Override** switch para sa **Link Hover Color**
2. Piliin ang kulay para sa hover state
3. Tiyaking nakikita ito laban sa background ng iyong pahina
4. Ang default ay light blue (#03A9F4)

### Active Color

1. I-toggle ang **Override** switch para sa **Active Color**
2. Piliin ang kulay ng indicator ng aktibong pahina
3. Dapat itong angat pero bagay pa rin sa iyong disenyo
4. Ang default ay light blue (#03A9F4)

:::info
Walang setting ng background color ang transparent navigation dahil direkta itong nakapatong sa nilalaman ng pahina.
:::

## Pag-save ng Iyong mga Pagbabago

1. Pagkatapos i-configure ang iyong mga kulay, i-click ang **Save Navigation Styles**
2. Agad na umiiral ang iyong mga pagbabago sa iyong live na website
3. Bisitahin ang iyong website para makita ang navigation sa parehong mode

## Pag-reset sa mga Default

Kung gusto mong bumalik sa mga default na kulay:

1. I-toggle off ang mga **Override** switch para sa anumang custom na kulay
2. I-click ang **Save Navigation Styles**
3. Babalik ang navigation sa default na color scheme

O i-click ang **Cancel** para itapon ang lahat ng pagbabago nang hindi sine-save.

## Mga Pinakamahusay na Gawi

### Contrast ng Kulay

- **Readability** -- Tiyaking sapat ang contrast ng mga kulay ng link sa background
- **WCAG compliance** -- Layuning magkaroon ng hindi bababa sa 4.5:1 na contrast ratio para sa accessibility
- **Subukan ang parehong mode** -- I-preview ang iyong site gamit ang parehong solid at transparent na navigation

### Pagkakapare-pareho ng Brand

- **Gamitin ang inyong mga brand color** -- Itugma sa logo at tema ng inyong website
- **Limitahan ang iyong palette** -- Manatili sa 2-3 kulay para sa magkakaugnay na itsura
- **Isaalang-alang ang iyong mga larawan** -- Kung gumagamit ng transparent na navigation, subukan ito laban sa mga karaniwang background ng pahina

### Mga Hover at Active na Estado

- **Malinaw na tugon** -- Gawing kapansin-pansing iba ang mga hover state sa mga default na link
- **Ibukod ang mga aktibong pahina** -- Gumamit ng kakaibang kulay para malaman ng mga user kung nasaan sila
- **Maayos na transition** -- Awtomatikong ina-animate ng sistema ang mga pagbabago ng kulay

## Pag-troubleshoot

### Hindi Tama ang Itsura ng mga Kulay

- **I-clear ang iyong cache** -- Maaaring ipakita ng browser caching ang mga lumang kulay
- **Suriin ang mga hex code** -- Siguraduhing tama ang mga hex color code na inilagay mo
- **Subukan sa iba't ibang background** -- Maaaring magkaiba ang itsura ng mga kulay depende sa pahina

### Hindi Nakikita ang Navigation

- **Transparent mode** -- Kung gumagamit ng transparent na navigation sa ibabaw ng mapusyaw na mga larawan, maaaring mahirap makita ang madilim na text
- **Solusyon** -- Ayusin ang mga kulay ng iyong link o gumamit ng mas madilim na background ng pahina
- **Alternatibo** -- Magdagdag ng banayad na anino o background overlay sa bahagi ng navigation

## Mga Teknikal na Detalye

Ang mga navigation style ay iniimbak bilang JSON at ina-apply gamit ang mga CSS variable:

- Agad na nagkakabisa ang mga pagbabago nang hindi kailangang i-rebuild ang site
- Kumakalat ang mga kulay sa lahat ng navigation element
- Opsyonal ang mga override; ang mga kulay na hindi itinakda ay gumagamit ng mga default ng theme

## Mga Kaugnay na Artikulo

- [Appearance](./appearance.md) -- I-customize ang kabuuang itsura at dating ng iyong website
- [Pamamahala ng mga Pahina](./managing-pages.md) -- Gumawa at mag-organisa ng mga pahina ng iyong website
- [Page Editor](./page-editor.md) -- Idisenyo ang mga layout at nilalaman ng pahina
