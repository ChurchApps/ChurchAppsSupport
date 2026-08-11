---
title: "Pag-manage ng Mga Pahina"
---

# Pag-manage ng Mga Pahina

<div class="article-intro">

Ang Website Pages view ay iyong sentral na hub para sa paglikha, pag-edit, at pag-ayos ng lahat ng mga pahina sa iyong website ng simbahan. Maaari mong pamahalaan ang parehong nilalaman ng pahina at navigation ng iyong site mula sa isang solong screen.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Paunang Setup](initial-setup) upang i-configure ang iyong domain at mga pangunahing setting ng site
- Handa na ang iyong nilalaman at mga larawan. Gamitin ang [Mga File](files) manager upang i-upload ang mga asset ng media muna.

</div>

:::info
Kung ang iyong simbahan ay may mahigit isang website (halimbawa, mga hiwalay na site bawat campus), gamitin ang site switcher sa tuktok ng Website Pages view upang tumalon sa pagitan nila. Bawat site ay may sariling mga pahina, navigation, at [hitsura](appearance) settings.
:::

## Pag-unawa sa Mga Uri ng Pahina

Ang **Mga Pahina** na talahanayan ay naglalista ng bawat pahina sa iyong site kasama ang kanyang status:

- **Nabuo** -- Mga pahina na awtomatikong ginawa ng system batay sa data ng iyong simbahan (halimbawa, isang Mga Grupo page, isang Mga Sermon page, o isang individual na pahina para sa bawat sermon sa iyong library). Ang mga pahina na ito ay nag-aaral-aral sa kanilang sarili habang nagbabago ang iyong data.
- **Custom** -- Mga pahina na ikaw ay lumikha sa sarili mo na may iyong sariling nilalaman at layout.

Maaari mong ikonberta ang anumang auto-generated na pahina sa custom na pahina kung gusto mo ang buong kontrol sa kanyang nilalaman at disenyo.

## Pagdaragdag at Pag-edit ng Mga Pahina

1. I-click ang pindutan ng **Magdagdag ng Pahina** sa sulok sa itaas-kanan ng Mga Pahina talahanayan.
2. Pumili ng uri ng pahina (blank o isang template) at bigyan ito ng pangalan.
3. I-click ang **Edit** sa tabi ng anumang pahina upang buksan ang [page editor](page-editor), kung saan maaari kang magdagdag ng mga seksyon, teksto, mga larawan, at iba pang mga elemento.
4. I-click ang **Mga Ayos ng Pahina** upang i-update ang pamagat ng pahina, URL path, at iba pang metadata.
5. Gamitin ang pindutan ng **Preview** upang buksan ang iyong pahina sa isang bagong window at makita kung paano ito magmukhang sa mga bisita.

:::tip
Para sa iyong home page, itakda ang URL path sa lamang `/`. Para sa lahat ng iba pang mga pahina, gumamit ng isang deskriptibong path tulad ng `/about` o `/contact`.
:::

### Mga Ayos ng Pahina

Buksan ang **Mga Ayos ng Pahina** sa anumang pahina upang i-configure ang:

- **Pamagat at URL Path** -- Ang pangalan ng pahina at ang kanyang address sa iyong site.
- **Visibility** -- Pumili kung sino ang makakakita ng pahina: lahat, mga miyembro lamang, kawani lamang, o mga miyembro ng mga partikular na grupo. Ito ay isang mabilis na paraan upang i-gate ang isang pribadong pahina (tulad ng pahina ng mapagkukunang pangkawani) nang walang hiwalay na password.
- **Paglalarawan ng Meta** -- Isang maikling buod na ipinakita sa mga resulta ng search engine at social media link previews.
- **Mga Redirect** -- Ituro ang isang lumang URL path sa pahina na ito, upang ang mga link at bookmark sa isang retired na pahina ay patuloy na gumagana.

## Pag-manage ng Navigation

Ang Website Pages view ay nagpapakita ng iyong mga link sa navigation. Ang mga link na ito ay kumokontrol sa menu na nakikita ng mga bisita sa iyong website.

1. I-click ang **Add** upang lumikha ng isang bagong link sa navigation. Maaari mong ituro ito sa anumang pahina sa iyong site o sa isang panlabas na URL.
2. Upang baguhin ang pagkakasunod-sunod ng mga link, drag at drop ang mga ito sa pagkakasunod-sunod na nais mo. Maaari mo rin nesting ang mga link sa ilalim ng item ng magulang upang lumikha ng mga dropdown menu.
3. I-click ang icon ng **Edit** sa tabi ng anumang link upang baguhin ang kanyang label, URL, o posisyon.
4. Upang alisin ang isang link mula sa navigation, i-click ang icon ng **Delete**.

:::info
Ang pag-aalis ng isang link sa navigation ay hindi nag-aalis ng pahina sa sarili nito. Ang pahina ay patuloy na umiiral at maaaring ma-access nang direkta sa kanyang URL -- ito ay simpleng hindi lalabas sa menu.
:::

## Mga Tip para sa Pag-ayos ng Iyong Site

- Panatilihing ang iyong top-level navigation sa limang o anim na item upang ang mga bisita ay mabilis na makahanap ng mga bagay.
- Gamitin ang nested links para sa mga kaugnay na sub-page (halimbawa, isang "Tungkol" dropdown na may "Ang Aming Koponan", "Mga Paniniwala", at "Kasaysayan").
- Suriin ang iyong navigation sa mobile sa pamamagitan ng pag-click sa **Mobile Preview** upang siguraduhin na gumagana nito nang maayos sa mas maliliit na screen.
- Bigyan ng mga pahina ang malinaw, deskriptibong mga pangalan na tumutulong sa mga bisita na maunawaan kung ano ang makikita nila.

:::tip
Maaari kang magdagdag ng [mga form](../forms/creating-forms.md) sa iyong mga pahina upang makolekta ang mga pagpaparehistro, mga kahilingan sa panalangin, o iba pang impormasyon mula sa mga bisita.
:::

## Pagsisimula mula sa Isang Template ng Site

Kung kayo ay gumagawa ng iyong site mula sa simula, maaari mong bootstrap ito gamit ang isang **Template ng Site** sa halip na lumikha ng mga pahina nang isa-isa. Ang template ng site ay lumilikha ng isang hanay ng pre-built na mga pahina -- home, tungkol, kumonekta, magbigay, at iba pa -- na may placeholder content at navigation links na naka-wire na.

1. Sa screen ng Mga Pahina, i-click ang pindutan ng **Mga Template ng Site** (sa tabi ng **Magdagdag ng Pahina** pindutan).
2. Tuklasin ang mga available na template at i-click ang isa upang i-preview ang kanyang page structure.
3. Kapag nahanap mo ang isang nais mo, i-click ang **I-apply ang Template**.
4. Ang mga pahina na hindi pa umaabot ay ginawa at naidagdag sa iyong navigation. Ang mga umiiral na pahina ay naiwan na tulad nito.

Pagkatapos maglapat ng template, buksan ang bawat pahina sa [page editor](page-editor) upang palitan ang placeholder text at mga larawan ng tunay na nilalaman ng iyong simbahan.

:::info
Ang mga template ng site ay lumilikha ng page structure at navigation. Hindi nila i-override ang color scheme o font ng iyong site -- ang mga ito ay kinokontrol ng [Hitsura](appearance).
:::

## Lightbox ng Larawan

Kapag ang mga bisita ay nag-click sa isang larawan sa iyong website, ito ay bumubukas sa isang full-screen lightbox overlay. Ito ay nagbibigay-daan sa mga tao na tingnan ang mga larawan sa mas malaking sukat nang hindi iniwan ang pahina. Walang kinakailangang pag-configure -- ang lightbox ay naka-enable ng awtomatiko para sa mga larawan sa iyong nilalaman ng pahina.

## Mga Susunod na Hakbang

- [Paunang Setup](initial-setup) -- Mga tagubilin sa unang pagkakataon ng pag-setup
- [Paggamit ng Page Editor](page-editor) -- Matuto kung paano bumuo at istilo ang nilalaman ng pahina
- [Hitsura](appearance) -- I-customize ang visual theme ng iyong site
- [Mga File](files) -- I-upload at pamahalaan ang mga asset ng media para sa iyong mga pahina
