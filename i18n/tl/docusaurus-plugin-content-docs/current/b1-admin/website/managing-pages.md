---
title: "Pamamahala ng mga Pahina"
---

# Pamamahala ng mga Pahina

<div class="article-intro">

Ang Website Pages view ang sentro mo para sa paggawa, pag-edit, at pag-oorganisa ng lahat ng pahina sa website ng inyong simbahan. Mapamamahalaan mo ang nilalaman ng iyong mga pahina at ang navigation ng iyong site mula sa iisang screen na ito.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para i-configure ang iyong domain at mga pangunahing setting ng site
- Ihanda ang iyong nilalaman at mga larawan. Gamitin muna ang [Files](files) manager para i-upload ang mga media asset.

</div>

:::info
Kung may higit sa isang website ang inyong simbahan (halimbawa, magkakahiwalay na site para sa bawat campus), gamitin ang site switcher sa itaas ng Website Pages view para lumipat sa pagitan ng mga ito. Bawat site ay may sariling mga pahina, navigation, at mga setting ng [appearance](appearance).
:::

## Pag-unawa sa mga Uri ng Pahina

Inililista ng **Pages** table ang bawat pahina sa iyong site kasama ang status nito:

- **Generated** -- Mga pahinang awtomatikong ginawa ng sistema batay sa data ng inyong simbahan (halimbawa, isang Groups page, isang Sermons page, o isang indibidwal na pahina para sa bawat sermon sa iyong library). Ang mga pahinang ito ay kusang nag-a-update habang nagbabago ang iyong data.
- **Custom** -- Mga pahinang ikaw mismo ang gumawa gamit ang sarili mong nilalaman at layout.

Maaari mong gawing custom na pahina ang anumang auto-generated na pahina kung gusto mo ng ganap na kontrol sa nilalaman at disenyo nito.

## Pagdaragdag at Pag-edit ng mga Pahina

1. I-click ang **Add Page** na button sa kanang itaas na sulok ng Pages table.
2. Pumili ng uri ng pahina (blank o isang template) at bigyan ito ng pangalan.
3. I-click ang **Edit Content** sa tabi ng anumang pahina para buksan ang [page editor](page-editor), kung saan maaari kang magdagdag ng mga section, text, larawan, at iba pang element.
4. I-click ang **Page Settings** (ang gear icon) para i-update ang pamagat ng pahina, URL path, at iba pang metadata.
5. Gamitin ang **View live page** na button para buksan ang iyong pahina sa bagong window at makita nang eksakto kung ano ang itsura nito sa mga bisita.

:::tip
Para sa iyong home page, itakda ang URL path sa `/` lamang. Para sa lahat ng iba pang pahina, gumamit ng naglalarawang path tulad ng `/about` o `/contact`.
:::

### Page Settings

Buksan ang **Page Settings** sa anumang pahina para i-configure ang:

- **Title at URL Path** -- Ang pangalan ng pahina at ang address nito sa iyong site.
- **Visibility** -- Piliin kung sino ang makakakita sa pahina: lahat, mga miyembro lamang, mga staff lamang, o mga miyembro ng mga partikular na grupo. Mabilis itong paraan para i-gate ang isang pribadong pahina (tulad ng resource page para sa mga staff) nang walang hiwalay na password.
- **Meta Description** -- Isang maikling buod na makikita sa mga resulta ng search engine at sa mga link preview sa social media.
- **Redirects** -- Ituro ang lumang URL path sa pahinang ito, para patuloy na gumana ang mga link at bookmark sa isang pahinang hindi na ginagamit.

## Pamamahala ng Navigation

Ipinapakita ng Website Pages view ang iyong mga navigation link. Kinokontrol ng mga link na ito ang menu na nakikita ng mga bisita sa iyong website.

1. I-click ang **Add** para gumawa ng bagong navigation link. Maaari mo itong ituro sa anumang pahina sa iyong site o sa isang external na URL.
2. Para baguhin ang pagkakasunod-sunod ng mga link, i-drag at i-drop ang mga ito sa gusto mong ayos. Maaari mo ring isama ang mga link sa ilalim ng isang parent item para gumawa ng mga dropdown menu.
3. I-click ang **Edit** icon sa tabi ng anumang link para baguhin ang label, URL, o posisyon nito.
4. Para alisin ang isang link sa navigation, i-click ang **Delete** icon.

:::info
Hindi nade-delete ang mismong pahina kapag tinanggal ang isang navigation link. Nariyan pa rin ang pahina at maaari pa ring puntahan nang direkta sa pamamagitan ng URL nito -- hindi lang ito lalabas sa menu.
:::

## Mga Switch para sa Buong Site

Sa itaas ng **Main Navigation** sa kaliwang bahagi ng Website Pages view ay may dalawang switch na umiiral sa buong website ng inyong simbahan:

- **Show Login** -- Nagpapakita ng **Login** button sa navigation bar ng iyong website.
- **Disable Public Website** -- Pinapatay ang iyong pampublikong website. Gamitin ito kung B1 lamang ang ginagamit ng inyong simbahan para sa member portal, pagbibigay, at mga registration, at nasa ibang lugar ang pangunahing website nito.

### Ano ang Ginagawa ng Pag-disable sa Pampublikong Website

Kapag naka-on ang **Disable Public Website**:

- Ang bawat pampublikong pahina, kasama ang home page at ang iyong mga custom na pahina, ay nagpapadala sa mga bisitang hindi naka-sign in papunta sa login screen. Pagkatapos nilang mag-sign in, babalik sila sa pahinang hiniling nila.
- Nakikita ng mga naka-sign in na miyembro ang buong website gaya ng dati, kasama ang iyong navigation at ang mga built-in na **Generated** na pahina (tulad ng Groups at Sermons). Hindi na lumalabas ang mga Generated na pahina sa Pages table.
- Sinasabihan ang mga search engine na huwag i-index ang site. Walang laman ang sitemap at hinaharangan ng `robots.txt` ang lahat ng crawling.

Patuloy na gumagana ang mga link na ito, kaya maaari pa ring marating ng mga miyembro at bisita ang mga ito:

- Login at logout
- Ang member portal (lahat ng nasa ilalim ng `/mobile`)
- Mga link ng [event registration](../guides/event-registration.md) at guest registration

May lalabas na babala sa ilalim ng switch habang naka-off ang pampublikong website. I-off muli ang switch para maibalik ang iyong mga pahina. Walang nade-delete habang naka-disable ang site.

:::info
Umiiral ang setting na ito sa buong simbahan ninyo. Kung may higit sa isang site ka, papatayin nito ang lahat ng mga iyon, hindi lamang ang napili sa site switcher.
:::

## Mga Tip sa Pag-oorganisa ng Iyong Site

- Panatilihing lima o anim lamang ang mga item sa iyong top-level na navigation para mabilis makahanap ang mga bisita.
- Gumamit ng mga nested na link para sa magkakaugnay na sub-page (halimbawa, isang "About" dropdown na may "Our Team," "Beliefs," at "History").
- Suriin ang iyong navigation sa mobile sa pamamagitan ng pag-click sa **Mobile Preview** para matiyak na maayos itong gumagana sa mas maliliit na screen.
- Bigyan ang mga pahina ng malinaw at naglalarawang pangalan na tutulong sa mga bisitang maunawaan kung ano ang makikita nila.

:::tip
Maaari kang magdagdag ng mga [form](../forms/creating-forms.md) sa iyong mga pahina para mangolekta ng mga registration, prayer request, o iba pang impormasyon mula sa mga bisita.
:::

## Pagsisimula mula sa Site Template

Kung bumubuo ka ng iyong site mula sa simula, maaari mo itong simulan gamit ang isang **Site Template** sa halip na gumawa ng mga pahina nang isa-isa. Gumagawa ang site template ng isang set ng mga handang pahina — home, about, connect, give, at iba pa — na may placeholder na nilalaman at mga navigation link na nakakabit na.

1. Sa Pages screen, i-click ang **Site Templates** na button (katabi ng **Add Page** na button).
2. Mag-browse sa mga available na template at mag-click ng isa para i-preview ang istruktura ng mga pahina nito.
3. Kapag nakakita ka ng gusto mo, i-click ang **Apply Template**.
4. Ang mga pahinang wala pa ay gagawin at idaragdag sa iyong navigation. Hindi gagalawin ang mga umiiral nang pahina.

Pagkatapos mag-apply ng template, buksan ang bawat pahina sa [page editor](page-editor) para palitan ang placeholder na text at mga larawan ng totoong nilalaman ng inyong simbahan.

:::info
Gumagawa ang mga site template ng istruktura ng pahina at navigation. Hindi nila ino-override ang color scheme o mga font ng iyong site — kinokontrol ang mga iyon ng [Appearance](appearance).
:::

## Image Lightbox

Kapag nag-click ang mga bisita sa isang larawan sa iyong website, bumubukas ito sa full-screen na lightbox overlay. Dahil dito, nakikita ng mga tao ang mga larawan sa mas malaking sukat nang hindi umaalis sa pahina. Hindi kailangan ng anumang configuration — awtomatikong naka-enable ang lightbox para sa mga larawan sa nilalaman ng iyong pahina.

## Mga Susunod na Hakbang

- [Initial Setup](initial-setup) -- Mga tagubilin sa unang beses na setup
- [Paggamit ng Page Editor](page-editor) -- Alamin kung paano buuin at i-style ang nilalaman ng pahina
- [Appearance](appearance) -- I-customize ang visual theme ng iyong site
- [Files](files) -- Mag-upload at mamahala ng mga media asset para sa iyong mga pahina
