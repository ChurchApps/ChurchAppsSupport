---
title: "Navigation Styles"
---

# Navigation Styles

<div class="article-intro">

I-customize ang mga kulay ng navigation bar ng website ng iyong simbahan upang tumugma sa iyong branding. Maaari mong i-configure ang mga kulay para sa parehong solid na mga background at transparent na mga overlay, na nagbibigay sa iyo ng kumpletong kontrol sa kung paano mukhang ang iyong nabigasyon sa iba't ibang mga pahina.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso upang pamahalaan ang website ng iyong simbahan. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- Ihanda ang mga kulay ng iyong brand, kabilang ang mga hex color code (hal., #03A9F4).
- Intindihin ang pagkakaiba sa pagitan ng solid at transparent na mga estilo ng nabigasyon sa iyong website.

</div>

## Pag-unawa sa mga Mode ng Nabigasyon

Ang nabigasyon ng iyong website ay maaaring lumitaw sa dalawang magkaibang estilo depende sa pahina:

- **Solid navigation** -- Navigation bar na may kulay ng background, karaniwang ginagamit sa mga pahina ng nilalaman
- **Transparent navigation** -- Nabigasyon na naka-overlay sa nilalaman ng pahina, karaniwang ginagamit sa mga pahinang may mga larawan ng hero o full-screen na mga background

Maaari mong i-customize ang mga kulay para sa parehong mga mode nang independyente.

## Pag-access sa Navigation Styles

1. Pumunta sa **Website** sa B1 Admin
2. I-click ang **Appearance** sa sidebar
3. Mag-scroll pababa sa seksyon ng **Navigation Styles**
4. I-click ang **Edit Navigation Styles**

## Pag-configure ng Solid Navigation

Ang solid navigation ay lumalabas na may kulay ng background sa likod ng navigation bar. Maaari mong i-customize ang:

### Background Color

1. I-toggle ang **Override** switch para sa **Background Color**
2. I-click ang color picker
3. Pumili ng iyong nais na kulay ng background
4. Ang default ay puti (#FFFFFF)

### Link Color

1. I-toggle ang **Override** switch para sa **Link Color**
2. Pumili ng kulay para sa teksto ng navigation link
3. Ito ay nakakaapekto sa mga link sa kanilang default na estado
4. Ang default ay dark gray (#555555)

### Link Hover Color

1. I-toggle ang **Override** switch para sa **Link Hover Color**
2. Pumili ng kulay na binabago ng mga link kapag nag-hover ang mga user sa kanila
3. Nagbibigay ito ng visual feedback para sa mga clickable na link
4. Ang default ay light blue (#03A9F4)

### Active Color

1. I-toggle ang **Override** switch para sa **Active Color**
2. Pumili ng kulay para sa kasalukuyang aktibong link ng pahina
3. Tumutulong ito sa mga user na malaman kung saang pahina sila
4. Ang default ay light blue (#03A9F4)

## Pag-configure ng Transparent Navigation

Ang transparent navigation ay naka-overlay sa nilalaman ng iyong pahina nang walang background. Maaari mong i-customize ang:

### Link Color

1. I-toggle ang **Override** switch para sa **Link Color**
2. Pumili ng kulay na mahusay na nag-contrast sa background ng iyong pahina
3. Madalas na puti o maliwanag na mga kulay ang gumagana nang pinakamahusay sa itim na mga background
4. Ang default ay dark gray (#555555)

### Link Hover Color

1. I-toggle ang **Override** switch para sa **Link Hover Color**
2. Pumili ng kulay ng hover state
3. Tiyakin na ito ay makikita laban sa background ng iyong pahina
4. Ang default ay light blue (#03A9F4)

### Active Color

1. I-toggle ang **Override** switch para sa **Active Color**
2. Pumili ng kulay ng aktibong indicator ng pahina
3. Dapat itong tumalas habang umaangkop pa rin sa iyong disenyo
4. Ang default ay light blue (#03A9F4)

:::info
Ang transparent navigation ay walang setting ng kulay ng background dahil direktang naka-overlay ito sa nilalaman ng pahina.
:::

## Pag-save ng Iyong mga Pagbabago

1. Pagkatapos i-configure ang iyong mga kulay, i-click ang **Save Navigation Styles**
2. Ang iyong mga pagbabago ay kaagad na inilalapat sa iyong live website
3. Bisitahin ang iyong website upang makita ang nabigasyon sa parehong mga mode

## Pag-reset sa mga Default

Kung gusto mong bumalik sa mga default na kulay:

1. I-toggle off ang mga **Override** switch para sa anumang mga custom na kulay
2. I-click ang **Save Navigation Styles**
3. Ang nabigasyon ay bumabalik sa default na color scheme

O i-click ang **Cancel** upang itapon ang lahat ng mga pagbabago nang hindi nag-se-save.

## Mga Best Practice

### Color Contrast

- **Kakayahang basahin** -- Tiyakin na ang mga kulay ng link ay may sapat na contrast sa background
- **WCAG compliance** -- Magtarget ng hindi bababa sa 4.5:1 contrast ratio para sa accessibility
- **Subukan ang parehong mga mode** -- I-preview ang iyong site na may parehong solid at transparent na nabigasyon

### Pagkakapare-pareho ng Brand

- **Gamitin ang mga kulay ng iyong brand** -- Itugma ang iyong logo at tema ng website
- **Limitahan ang iyong palette** -- Manatili sa 2-3 na mga kulay para sa magkakaugnay na hitsura
- **Isaalang-alang ang iyong mga larawan** -- Kung gumagamit ng transparent navigation, subukan ito laban sa mga karaniwang background ng pahina

### Mga Estado ng Hover at Active

- **Malinaw na feedback** -- Gawing malinaw na iba ang mga hover state sa mga default na link
- **Paghihiwalay ng mga aktibong pahina** -- Gumamit ng natatanging kulay upang malaman ng mga user kung nasaan sila
- **Maayos na mga transition** -- Awtomatikong nag-a-animate ang system ng mga pagbabago sa kulay

## Troubleshooting

### Hindi Tama ang Hitsura ng mga Kulay

- **I-clear ang iyong cache** -- Ang browser caching ay maaaring magpakita ng mga lumang kulay
- **Tingnan ang mga hex code** -- Tiyakin na naglagay ka ng mga valid na hex color code
- **Subukan sa iba't ibang mga background** -- Ang mga kulay ay maaaring magmukhang iba depende sa pahina

### Hindi Nakikita ang Nabigasyon

- **Transparent mode** -- Kung gumagamit ng transparent navigation sa mga light na larawan, ang madilim na teksto ay maaaring mahirap makita
- **Solusyon** -- Ayusin ang mga kulay ng iyong link o gumamit ng mas madilim na mga background ng pahina
- **Alternatibo** -- Magdagdag ng banayad na shadow o background overlay sa lugar ng nabigasyon

## Mga Teknikal na Detalye

Ang mga estilo ng nabigasyon ay nakaimbak bilang JSON at inilalapat gamit ang mga CSS variable:

- Ang mga pagbabago ay epektibo kaagad nang hindi kailangang muling itayo ang site
- Ang mga kulay ay umaagos sa lahat ng elemento ng nabigasyon
- Ang mga override ay opsyonal; ang mga hindi nakatakdang kulay ay gumagamit ng mga default ng tema

## Mga Kaugnay na Artikulo

- [Appearance](./appearance.md) -- I-customize ang pangkalahatang hitsura at pakiwari ng iyong website
- [Managing Pages](./managing-pages.md) -- Gumawa at ayusin ang mga pahina ng iyong website
- [Page Editor](./page-editor.md) -- Magdisenyo ng mga layout at nilalaman ng pahina
