---
title: "Pagmamanage ng mga Pahina"
---

# Pagmamanage ng mga Pahina

<div class="article-intro">

Ang Website Pages view ay ang iyong sentral na hub para sa paglikha, pag-edit, at pag-organize ng lahat ng pahina sa iyong website ng simbahan. Maaari mong pamahalaan ang parehong iyong nilalaman ng pahina at ang navigasyon ng iyong site mula sa iisang screen.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Tapusin ang [Initial Setup](initial-setup) upang i-configure ang iyong domain at mga pangunahing setting ng site
- Handa na ang iyong nilalaman at mga imahe. Gamitin ang [Files](files) manager upang mag-upload ng mga media asset una.

</div>

## Pag-unawa sa mga Uri ng Pahina

Ang **Mga Pahina** na talahanayan ay naglalista ng bawat pahina sa iyong site kasama ang nito na status:

- **Nabuo** -- Mga pahina na automatically na nilikha ng system batay sa datos ng iyong simbahan (halimbawa, isang Mga Grupo na pahina o Mga Sermon na pahina). Ang mga pahina na ito ay nag-update ng sarili habang nagbabago ang iyong data.
- **Custom** -- Mga pahina na kinilha mo ng iyong sarili na may iyong sariling nilalaman at layout.

Maaari mong i-convert ang anumang auto-generated na pahina sa isang custom na pahina kung nais mo ang buong kontrol sa nilalaman at disenyo nito.

## Pagdagdag at Pag-edit ng mga Pahina

1. Mag-click sa **Add Page** button sa itaas na kanan ng Mga Pahina na talahanayan.
2. Pumili ng uri ng pahina (blangko o isang template) at magbigay ng pangalan nito.
3. Mag-click **Baguhin** sa tabi ng anumang pahina upang buksan ang [page editor](page-editor), kung saan maaari kang magdagdag ng mga seksyon, teksto, mga imahe, at ibang mga elemento.
4. Mag-click **Page Settings** upang i-update ang pamagat ng pahina, URL path, at ibang metadata.
5. Gamitin ang **Preview** button upang buksan ang iyong pahina sa isang bagong window at makita kung paano ito makikita ng mga bisita.

:::tip
Para sa iyong home page, itakda ang URL path sa `/`. Para sa lahat ng ibang mga pahina, gumamit ng deskriptibong path tulad ng `/about` o `/contact`.
:::

## Pagmamanage ng Navigation

Ang kaliwang sidebar ng Website Pages view ay nagpapakita ng iyong mga link sa navigation. Ang mga link na ito ay kumokontrol sa menu na nakikita ng mga bisita sa iyong website.

1. Mag-click **Idagdag** upang lumikha ng isang bagong link sa navigation. Maaari mong ituro ito sa anumang pahina sa iyong site o sa isang panlabas na URL.
2. Upang i-reorder ang mga link, i-drag at i-drop ang mga ito sa pagkakasunod-sunod na gusto mo. Maaari mo rin inam ng mga link sa ilalim ng isang parent item upang lumikha ng mga dropdown na menu.
3. Mag-click ang **Edit** icon sa tabi ng anumang link upang baguhin ang label, URL, o posisyon nito.
4. Upang alisin ang isang link mula sa navigation, mag-click sa **Delete** icon.

:::info
Ang pag-aalis ng isang link sa navigation ay hindi nag-delete ng pahina mismo. Ang pahina ay patuloy na umiiral at maaaring i-access nang direkta sa pamamagat ng nito na URL -- ito ay simpleng hindi na lilitaw sa menu.
:::

## Mga Tip para sa Pag-organize ng Iyong Site

- Panatilihin ang iyong top-level navigation sa lima o anim na item upang ang mga bisita ay maaaring mahanap ang mga bagay nang mabilis.
- Gumamit ng nested links para sa mga kaugnay na sub-pages (halimbawa, isang "Tungkol" dropdown na may "Aming Team," "Mga Pananiniwala," at "Kasaysayan").
- Suriin ang iyong navigation sa mobile sa pamamagat ng pag-click **Mobile Preview** upang masiguro na gumagana ito nang maayos sa mas maliit na screen.
- Magbigay ng mga pahina ng malinaw, deskriptibong mga pangalan na tumutulong sa mga bisita na maunawaan kung ano ang makakahanap nila.

:::tip
Maaari kang magdagdag ng [forms](../forms/creating-forms.md) sa iyong mga pahina upang magbigay ng mga pagpaparehistro, mga hiling ng panalangin, o ibang impormasyon mula sa mga bisita.
:::

## Magsimula mula sa isang Site Template

Kung bumubuo ka ng iyong site mula sa simula, maaari mong i-bootstrap gamit ang **Site Template** sa halip na lumikha ng mga pahina ng isa sa isang pagkakataon. Ang isang site template ay lumilikha ng isang set ng pre-built na mga pahina -- home, tungkol, makipag-ugnayan, magbigay, at iba pa -- na may placeholder na nilalaman at mga link sa navigation na wired up na.

1. Sa Mga Pahina na screen, mag-click sa **Site Templates** button (sa tabi ng **Add Page** button).
2. I-browse ang mga available na template at mag-click ng isa upang makita ang preview ng nito na page structure.
3. Kapag nahanap mo ang isang kagustuhan mo, mag-click **Apply Template**.
4. Ang mga pahina na hindi pa umiiral ay nilikha at idinagdag sa iyong navigation. Ang mga umiiral na pahina ay naiwan bilang-ay.

Pagkatapos na mag-apply ng template, buksan ang bawat pahina sa [page editor](page-editor) upang palitan ang placeholder text at mga imahe na may tunay na nilalaman ng iyong simbahan.

:::info
Ang mga site template ay lumilikha ng page structure at navigation. Hindi nila sinasagot ang kulay ng scheme ng iyong site o mga font -- ang mga ito ay kinokontrol ng [Appearance](appearance).
:::

## Image Lightbox

Kapag nag-click ang mga bisita sa isang imahe sa iyong website, ito ay bumubukas sa isang buong-screen lightbox overlay. Ito ay nagbibigay-daan sa mga tao na tingnan ang mga larawan sa isang mas malaking laki nang hindi umaalis sa pahina. Walang kinakailangang configuration -- ang lightbox ay automatically na-enable para sa mga imahe sa iyong page content.

## Mga Susunod na Hakbang

- [Initial Setup](initial-setup) -- First-time setup instructions
- [Paggamit ng Page Editor](page-editor) -- Matutunan kung paano bumuo at mag-style ng page content
- [Appearance](appearance) -- I-customize ang visual theme ng iyong site
- [Files](files) -- Mag-upload at pamahalaan ang mga media asset para sa iyong mga pahina
