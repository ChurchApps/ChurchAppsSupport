---
title: "Mga Istilo ng Navigation"
---

# Mga Istilo ng Navigation

<div class="article-intro">

I-customize ang mga kulay ng navigation bar ng inyong website ng parokya upang tumugma sa inyong branding. Maaari ninyong makakonfigure ang mga kulay para sa parehong solid backgrounds at transparent overlays, na nagbibigay sa inyo ng kabuuang kontrol sa kung paano ang inyong navigation ay nagmumukhang sa iba't ibang mga pahina.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng pahintulot upang pamahalaan ang inyong website ng parokya. Tingnan ang [Mga Papel at Pahintulot](../people/roles-permissions.md) para sa mga detalye.
- Magkaroon ng inyong brand colors handa, kasama ang hex color codes (e.g., #03A9F4).
- Maintindihan ang pagkakaiba sa pagitan ng solid at transparent navigation styles sa inyong website.

</div>

## Pag-unawa sa Navigation Modes

Ang inyong website navigation ay maaaring lumitaw sa dalawang iba't ibang mga istilo depende sa pahina:

- **Solid navigation** -- Navigation bar na may background color, karaniwang ginagamit sa content pages
- **Transparent navigation** -- Navigation na nag-overlay sa nilalaman ng pahina, karaniwang ginagamit sa mga pahina na may hero images o full-screen backgrounds

Maaari ninyong i-customize ang mga kulay para sa parehong mga mode nang independyente.

## Pag-access ng Navigation Styles

1. Mag-navigate sa **Website** sa B1 Admin
2. I-click ang **Appearance** sa sidebar
3. I-scroll sa **Navigation Styles** section
4. I-click ang **Edit Navigation Styles**

## Pagkakakonfigure ng Solid Navigation

Ang solid navigation ay lumalitaw na may background color sa likod ng navigation bar. Maaari ninyong i-customize ang:

### Background Color

1. I-toggle ang **Override** switch para sa **Background Color**
2. I-click ang color picker
3. Pumili ng inyong nais na background color
4. Ang default ay puti (#FFFFFF)

### Link Color

1. I-toggle ang **Override** switch para sa **Link Color**
2. Pumili ng kulay para sa navigation link text
3. Ito ay nakakaapekto sa mga link sa kanilang default state
4. Ang default ay dark gray (#555555)

### Link Hover Color

1. I-toggle ang **Override** switch para sa **Link Hover Color**
2. Pumili ng kulay na baguhin ang mga link kung ang mga user ay mag-hover sa mga ito
3. Ito ay nagbibigay ng visual feedback para sa clickable links
4. Ang default ay light blue (#03A9F4)

### Active Color

1. I-toggle ang **Override** switch para sa **Active Color**
2. Pumili ng kulay para sa kasalukuyang active page link
3. Ito ay tumutulong sa mga user na malaman kung aling pahina ang kanilang nasa
4. Ang default ay light blue (#03A9F4)

## Pagkakakonfigure ng Transparent Navigation

Ang transparent navigation ay nag-overlay sa inyong nilalaman ng pahina nang walang background. Maaari ninyong i-customize ang:

### Link Color

1. I-toggle ang **Override** switch para sa **Link Color**
2. Pumili ng kulay na sumasalamin nang mabuti sa inyong background ng pahina
3. Madalas na ang puti o maliwanag na mga kulay ay gumagana nang mahusay sa dark backgrounds
4. Ang default ay dark gray (#555555)

### Link Hover Color

1. I-toggle ang **Override** switch para sa **Link Hover Color**
2. Pumili ng hover state color
3. Siguraduhing ito ay nakikita sa inyong background ng pahina
4. Ang default ay light blue (#03A9F4)

### Active Color

1. I-toggle ang **Override** switch para sa **Active Color**
2. Pumili ng active page indicator color
3. Dapat mag-stand out habang umaangkop pa rin sa inyong disenyo
4. Ang default ay light blue (#03A9F4)

:::info
Ang transparent navigation ay walang background color setting dahil nag-overlay ito sa nilalaman ng pahina nang direkta.
:::

## Pag-save ng Inyong Mga Pagbabago

1. Pagkatapos makakonfigure ng inyong mga kulay, i-click ang **Save Navigation Styles**
2. Ang inyong mga pagbabago ay agad na inilalapat sa inyong live website
3. Bisitahin ang inyong website upang makita ang navigation sa parehong mga mode

## Pagbabalik sa Mga Default

Kung gusto ninyong bumalik sa mga default colors:

1. I-toggle off ang **Override** switches para sa anumang customized colors
2. I-click ang **Save Navigation Styles**
3. Ang navigation ay bumabalik sa default color scheme

O i-click ang **Cancel** upang itapon ang lahat ng mga pagbabago nang hindi nagsasave.

## Best Practices

### Color Contrast

- **Readability** -- Siguraduhing ang mga kulay ng link ay may sapat na contrast sa background
- **WCAG compliance** -- Layunin ang hindi bababa sa 4.5:1 contrast ratio para sa accessibility
- **Test both modes** -- I-preview ang inyong site na may parehong solid at transparent navigation

### Brand Consistency

- **Gamitin ang inyong brand colors** -- Tugmahin ang inyong logo at tema ng website
- **Limitahan ang inyong palette** -- Manatiling 2-3 na mga kulay para sa isang cohesive look
- **Isaalang-alang ang inyong mga larawan** -- Kung gumagamit ng transparent navigation, subukan ito laban sa mga tipikong background ng pahina

### Hover at Active States

- **Clear feedback** -- Gawing halatang magkakaiba ang hover states mula sa default links
- **Distinguish active pages** -- Gumamit ng isang bukod na kulay upang ang mga user ay alam kung nasaan sila
- **Smooth transitions** -- Ang system ay awtomatikong nag-animate ng mga pagbabago ng kulay

## Troubleshooting

### Ang Mga Kulay Ay Hindi Magmumukhang Tama

- **Linisin ang inyong cache** -- Ang caching ng browser ay maaaring magpakita ng mga lumang kulay
- **Suriin ang hex codes** -- Siguraduhing isinasulat ninyo ang valid hex color codes
- **Subukan sa iba't ibang backgrounds** -- Ang mga kulay ay maaaring magmukhang magkakaiba depende sa pahina

### Ang Navigation Ay Hindi Nakikita

- **Transparent mode** -- Kung gumagamit ng transparent navigation sa mga maliwanag na imahe, ang dark text ay maaaring mahirap makita
- **Solution** -- Ayusin ang inyong mga kulay ng link o gumamit ng mas dark na backgrounds ng pahina
- **Alternative** -- Magdagdag ng subtle shadow o background overlay sa navigation area

## Technical Details

Ang navigation styles ay nakaimbak bilang JSON at inilalapat gamit ang CSS variables:

- Ang mga pagbabago ay agad na makakaapekto nang hindi kinakailangan ang pagbubuo ng site
- Ang mga kulay ay sumusunod sa lahat ng navigation elements
- Ang mga overrides ay opsyonal; ang mga hindi itinakdang kulay ay gumagamit ng theme defaults

## Related Articles

- [Appearance](./appearance.md) -- I-customize ang pangkalahatang hitsura at pakiramdam ng inyong website
- [Managing Pages](./managing-pages.md) -- Lumikha at i-organize ang inyong mga pahina ng website
- [Page Editor](./page-editor.md) -- I-disenyo ang mga layout ng pahina at nilalaman
