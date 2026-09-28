---
title: "Pag-manage ng Mga Pahina"
---

# Pag-manage ng Mga Pahina

<div class="article-intro">

Ang Website Pages view ay iyong sentral na hub para sa paglikha, pag-edit, at pag-ayos ng lahat ng mga pahina sa iyong website ng simbahan. Maaari mong pamahalaan ang parehong nilalaman ng pahina at navigation ng iyong site mula sa isang solong screen.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) upang i-configure ang iyong domain at mga pangunahing setting ng site
- Handa na ang iyong nilalaman at mga larawan. Gamitin ang [Files](files) manager upang i-upload ang mga asset ng media muna.

</div>

:::info
Kung ang iyong simbahan ay may mahigit isang website (halimbawa, mga hiwalay na site bawat campus), gamitin ang site switcher sa tuktok ng Website Pages view upang tumalon sa pagitan nila. Bawat site ay may sariling mga pahina, navigation, at [appearance](appearance) settings.
:::

## Pag-unawa sa Mga Uri ng Pahina

Ang **Pages** table ay naglalista ng bawat pahina sa iyong site kasama ang kanyang status:

- **Generated** -- Mga pahina na awtomatikong ginawa ng sistema batay sa data ng iyong simbahan (halimbawa, isang Groups page, isang Sermons page, o isang individual na pahina para sa bawat sermon sa iyong library). Ang mga pahina na ito ay nag-aupdate sa kanilang sarili habang nagbabago ang iyong data.
- **Custom** -- Mga pahina na ikaw ay lumikha sa sarili mo na may iyong sariling nilalaman at layout.

Maaari mong ikonberta ang anumang auto-generated na pahina sa custom na pahina kung gusto mo ang buong kontrol sa kanyang nilalaman at disenyo.

## Pagdaragdag at Pag-edit ng Mga Pahina

1. I-click ang **Add Page** button sa tuktok na kanang sulok ng Pages table.
2. Pumili ng uri ng pahina (blank o isang template) at bigyan ito ng pangalan.
3. I-click ang **Edit Content** sa tabi ng anumang pahina upang buksan ang [page editor](page-editor), kung saan maaari kang magdagdag ng mga seksyon, teksto, mga larawan, at iba pang mga elemento.
4. I-click ang **Page Settings** (ang gear icon) upang i-update ang pamagat ng pahina, URL path, at iba pang metadata.
5. Gamitin ang pindutan ng **View live page** upang buksan ang iyong pahina sa isang bagong window at makita kung paano ito magmukhang sa mga bisita.

:::tip
Para sa iyong home page, itakda ang URL path sa lamang `/`. Para sa lahat ng iba pang mga pahina, gumamit ng isang deskriptibong path tulad ng `/about` o `/contact`.
:::

### Page Settings

Buksan ang **Page Settings** sa anumang pahina upang i-configure ang:

- **Title at URL Path** -- Ang pangalan ng pahina at ang kanyang address sa iyong site.
- **Visibility** -- Pumili kung sino ang makakakita ng pahina: lahat, mga miyembro lamang, staff lamang, o mga miyembro ng mga partikular na grupo. Ito ay isang mabilis na paraan upang i-gate ang isang pribadong pahina (tulad ng isang staff resource page) nang walang hiwalay na password.
- **Meta Description** -- Isang maikling buod na ipinakita sa mga resulta ng search engine at social media link previews.
- **Redirects** -- Ituro ang isang lumang URL path sa pahina na ito, upang ang mga link at bookmark sa isang retired na pahina ay patuloy na gumagana.

## Pag-manage ng Navigation

Ang Website Pages view ay nagpapakita ng iyong navigation links. Ang mga link na ito ay kumokontrol sa menu na nakikita ng mga bisita sa iyong website.

1. I-click ang **Add** upang lumikha ng isang bagong navigation link. Maaari mong ituro ito sa anumang pahina sa iyong site o sa isang panlabas na URL.
2. Upang baguhin ang pagkakasunod-sunod ng mga link, i-drag at drop ang mga ito sa pagkakasunod-sunod na nais mo. Maaari mo rin nesting ang mga link sa ilalim ng parent item upang lumikha ng dropdown menus.
3. I-click ang icon ng **Edit** sa tabi ng anumang link upang baguhin ang kanyang label, URL, o posisyon.
4. Upang alisin ang isang link mula sa navigation, i-click ang icon ng **Delete**.

:::info
Ang pag-aalis ng isang navigation link ay hindi nag-aalis ng pahina sa sarili nito. Ang pahina ay patuloy na umiiral at maaaring ma-access nang direkta sa kanyang URL -- ito ay simpleng hindi lalabas sa menu.
:::

## Site-Wide Switches

Sa itaas ng **Main Navigation** sa kaliwang panig ng Website Pages view ay may dalawang switches na nag-apply sa iyong buong church website:

- **Show Login** -- Nagpapakita ng **Login** button sa navigation bar ng iyong website.
- **Disable Public Website** -- Pinapataas ang iyong public website. Gamitin ito kung ang iyong simbahan ay gumagamit ng B1 lamang para sa kanyang member portal, giving, at registrations, at pinapanatili ang kanyang pangunahing website sa ibang lugar.

### Ano ang Ginagawa ng Pag-disable ng Public Website

Kapag ang **Disable Public Website** ay on:

- Bawat public page, kasama ang home page at iyong custom pages, ay nagpapadala ng mga bisita sa login screen.
- Ang built-in **Generated** pages (tulad ng Groups at Sermons) ay hindi na siniserve at hindi na lilitaw sa Pages table.
- Ang site header ay nagpapakita lamang ng **Login** button, na walang navigation links.
- Ang mga search engine ay sinasabihan na huwag i-index ang site. Ang sitemap ay walang laman at `robots.txt` ay humahambat sa lahat ng crawling.

Ang mga link na ito ay patuloy na gumagana, upang ang mga miyembro at bisita ay maaari pa ring maabot ang mga ito:

- Login at logout
- Ang member portal (lahat ng nasa ilalim ng `/mobile`)
- [Event registration](../guides/event-registration.md) links at guest registration

Ang isang babala ay lumilitaw sa ilalim ng switch habang ang public website ay off. I-turn ang switch na ito off muli upang ibalik ang iyong mga pahina. Walang nabura habang ang site ay disabled.

:::info
Ang setting na ito ay nag-apply sa iyong buong simbahan. Kung ikaw ay may mahigit isang site, ito ay pinapataas ang lahat ng mga ito, hindi lamang ang napili sa site switcher.
:::

## Mga Tip para sa Pag-ayos ng Iyong Site

- Panatilihing ang iyong top-level navigation sa limang o anim na item upang ang mga bisita ay mabilis na makahanap ng mga bagay.
- Gamitin ang nested links para sa mga kaugnay na sub-pages (halimbawa, isang "About" dropdown na may "Our Team," "Beliefs," at "History").
- Suriin ang iyong navigation sa mobile sa pamamagitan ng pag-click sa **Mobile Preview** upang siguraduhin na gumagana nito nang maayos sa mas maliliit na screen.
- Bigyan ng mga pahina ang malinaw, deskriptibong mga pangalan na tumutulong sa mga bisita na maunawaan kung ano ang makikita nila.

:::tip
Maaari kang magdagdag ng [forms](../forms/creating-forms.md) sa iyong mga pahina upang makolekta ang mga registrations, prayer requests, o iba pang impormasyon mula sa mga bisita.
:::

## Pagsisimula mula sa Isang Site Template

Kung kayo ay gumagawa ng iyong site mula sa simula, maaari mong bootstrap ito gamit ang isang **Site Template** sa halip na lumikha ng mga pahina nang isa-isa. Ang site template ay lumilikha ng isang hanay ng pre-built na mga pahina -- home, about, connect, give, at iba pa -- na may placeholder content at navigation links na naka-wire na.

1. Sa Pages screen, i-click ang **Site Templates** button (sa tabi ng **Add Page** button).
2. Tuklasin ang mga available na template at i-click ang isa upang i-preview ang kanyang page structure.
3. Kapag nahanap mo ang isang nais mo, i-click ang **Apply Template**.
4. Ang mga pahina na hindi pa umiiral ay ginawa at naidagdag sa iyong navigation. Ang mga umiiral na pahina ay naiwan na tulad nito.

Pagkatapos maglapat ng template, buksan ang bawat pahina sa [page editor](page-editor) upang palitan ang placeholder text at mga larawan ng tunay na nilalaman ng iyong simbahan.

:::info
Ang mga site template ay lumilikha ng page structure at navigation. Hindi nila i-override ang iyong site's color scheme o fonts -- ang mga ito ay kinokontrol ng [Appearance](appearance).
:::

## Image Lightbox

Kapag ang mga bisita ay nag-click sa isang larawan sa iyong website, ito ay bumubukas sa isang full-screen lightbox overlay. Ito ay nagbibigay-daan sa mga tao na tingnan ang mga larawan sa mas malaking sukat nang hindi iniwan ang pahina. Walang kinakailangang pag-configure -- ang lightbox ay naka-enable ng awtomatiko para sa mga larawan sa iyong page content.

## Mga Susunod na Hakbang

- [Initial Setup](initial-setup) -- First-time setup instructions
- [Using the Page Editor](page-editor) -- Matuto kung paano bumuo at istilo ang page content
- [Appearance](appearance) -- I-customize ang visual theme ng iyong site
- [Files](files) -- I-upload at pamahalaan ang media assets para sa iyong mga pahina
