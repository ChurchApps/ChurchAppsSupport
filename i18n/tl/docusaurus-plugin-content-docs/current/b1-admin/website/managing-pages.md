---
title: "Pamamahala ng Mga Pahina"
description: "Gumawa, mag-edit, at mag-ayos ng mga pahina at navigation sa Website Pages view ng B1 Admin, kabilang ang page settings, redirect, at site template."
---

# Pamamahala ng Mga Pahina

<div class="article-intro">

Ang Website Pages view ang sentro mo para gumawa, mag-edit, at mag-ayos ng lahat ng pahina sa website ng iyong simbahan. Mula sa iisang screen na ito, mapamamahalaan mo ang nilalaman ng iyong mga pahina at ang navigation ng iyong site.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](./initial-setup.md) para ma-configure ang iyong domain at mga pangunahing setting ng site
- Ihanda ang iyong nilalaman at mga larawan. Gamitin muna ang [Files](./files.md) manager para mag-upload ng mga media asset.
- Gumamit ng computer o tablet. Kailangan ng Website Pages view at ng page editor ng screen na hindi bababa sa humigit-kumulang 880 pixels ang lapad; sa telepono, makakakita ka ng mensaheng nagsasabing lumipat sa mas malaking screen.

</div>

:::info
Kung may higit sa isang website ang simbahan mo (halimbawa, hiwalay na site bawat campus), gamitin ang site switcher sa itaas ng Website Pages view para lumipat sa pagitan ng mga ito. May sariling pahina, navigation, at [appearance](./appearance.md) settings ang bawat site. Tingnan ang [Multiple Websites](#multiple-websites) sa ibaba.
:::

## Pag-unawa sa Mga Uri ng Pahina {#understanding-page-types}

Inililista ng talahanayang **Pages** ang bawat pahina sa iyong site ayon sa **Path** at **Title**. May dalawang uri ng pahina:

- **Generated** -- Mga pahinang awtomatikong nalikha ng sistema batay sa datos ng iyong simbahan (halimbawa, pahina ng Groups, pahina ng Sermons, o indibidwal na pahina para sa bawat sermon sa iyong library). Ang mga pahinang ito ay may badge na **Generated** at kusang nag-a-update habang nagbabago ang iyong datos.
- **Custom** -- Mga pahinang ikaw mismo ang gumawa, na may sarili mong nilalaman at layout.

Maaari mong gawing custom na pahina ang anumang awtomatikong nalikhang pahina kung gusto mo ng ganap na kontrol sa nilalaman at disenyo nito. I-click ang **Convert** sa tabi ng generated na pahina at i-click ang **Confirm**. Magbubukas ang dialog na **New Page**; bigyan ng pamagat ang pahina at i-click ang **Save**. Aagawin ng bagong custom na pahina mo ang path ng generated na pahina, at maaari mo na itong buuin sa [page editor](./page-editor.md).

## Pagdaragdag at Pag-edit ng Mga Pahina {#adding-and-editing-pages}

1. I-click ang button na **Add Page** sa kanang-itaas ng Website Pages view.
2. Pumili ng uri ng pahina at maglagay ng **Page Title**, pagkatapos i-click ang **Save**. Ang **Blank** ay nagsisimula ng walang lamang pahina; ang **Sermons**, **About Us**, **Donate**, at **Location** ay naglalagay ng iminumungkahing pamagat para sa ganoong uri ng pahina; ang **AI** ay bumubuo ng unang draft ng pahina mula sa maikling paglalarawang ita-type mo. Ang path ng pahina ay ginagawa mula sa pamagat nito (halimbawa, ang "Our Team" ay nagiging `/our-team`), at maaari mo itong palitan sa **Page Settings** sa ibang pagkakataon.
3. I-click ang **Edit Content** sa tabi ng alinmang pahina para buksan ang [page editor](./page-editor.md), kung saan maaari kang magdagdag ng mga seksyon, teksto, larawan, at iba pang elemento.
4. I-click ang **Page Settings** sa tabi ng pahina para i-update ang pamagat ng pahina, URL path, at iba pang metadata.
5. I-click ang path ng pahina sa column na **Path** para buksan ang live na pahina sa bagong tab at makita nang eksakto kung paano ito lalabas sa mga bisita.

:::tip
Para sa home page mo, itakda ang URL path sa `/` lamang. Para sa lahat ng ibang pahina, gumamit ng mapaglarawang path gaya ng `/about` o `/contact`.
:::

### Page Settings {#page-settings}

Buksan ang **Page Settings** sa alinmang pahina para i-configure ang:

- **Page Title** -- Ang pangalan ng pahina.
- **Layout** -- **Header & Footer** (ang navigation bar at footer ng iyong site sa paligid ng pahina, ang default) o **Clean Centered Content** (nilalaman lamang ng pahina, sa centered na card sa light gray na background, walang navigation bar o footer -- kapaki-pakinabang para sa simpleng sign-up o landing page).
- **URL Path** -- Ang address ng pahina sa iyong site. I-click ang lapis para baguhin ito, pagkatapos i-click ang **Check** para tiyaking tama ang path at hindi pa ginagamit.
- **Visibility** -- Piliin kung sino ang makakakita ng pahina: **Everyone**, **Logged-in Users**, **Members & Staff**, **Staff Only**, **Team Members**, o **Specific Groups** (pagkatapos lagyan ng check ang mga grupo). Mabilis itong paraan para protektahan ang isang pribadong pahina (gaya ng staff resource page) nang walang hiwalay na password. Ang mga bisitang hindi naka-sign in ay makakakita ng "This page is for church members" na may button na **Login**; ang mga naka-sign in na hindi kabilang sa pinagbahaginan ng pahina ay makakakita ng "You don't have access to this page." Hindi kasama sa sitemap mo ang mga protektadong pahina.
- **Meta Description** -- Maikling buod na ipinapakita sa mga resulta ng search engine at sa link preview ng social media. Layunin ang humigit-kumulang 155 karakter, o i-click ang **Generate with AI** para gumawa ng draft mula sa nilalaman ng pahina.

Mayroon ding button na **Duplicate** ang dialog, na gumagawa ng kopya ng pahina at ng lahat ng nilalaman nito, at button na **Delete**, na tuluyang nagbubura ng pahina.

:::tip
Para ipadala ang lumang address sa isang pahina (halimbawa, pagkatapos mong palitan ang pangalan ng `/about-us` papuntang `/about`), magdagdag ng redirect sa ilalim ng **Redirects & analytics** sa [Appearance](./appearance.md#redirects--analytics).
:::

## Pamamahala ng Navigation {#managing-navigation}

Ipinapakita ng panel na **Main Navigation** sa kanang bahagi ng Website Pages view ang iyong mga navigation link. Kinokontrol ng mga link na ito ang menu na nakikita ng mga bisita sa iyong website.

1. I-click ang **Add** para gumawa ng bagong navigation link. Maaari mo itong ituro sa alinmang pahina ng iyong site o sa external na URL.
2. Para muling ayusin ang mga link, i-drag at i-drop ang mga ito sa pagkakasunod-sunod na gusto mo. Maaari ka ring mag-nest ng mga link sa ilalim ng parent item para gumawa ng dropdown na menu.
3. I-click ang alinmang link para buksan ang **Link Settings** nito, kung saan maaari mong baguhin ang text, URL, o parent page nito.
4. Para alisin ang isang link sa navigation, buksan ang **Link Settings** nito at i-click ang **Delete**.

:::info
Ang pag-alis ng navigation link ay hindi nagbubura ng mismong pahina. Umiiral pa rin ang pahina at maa-access ito nang direkta sa URL nito -- hindi lang ito lilitaw sa menu.
:::

## Mga Switch para sa Buong Site {#site-wide-switches}

Sa ibaba ng mga link sa panel na **Main Navigation** ay may dalawang switch na nalalapat sa buong website ng simbahan mo:

- **Show Login** -- Nagpapakita ng button na **Login** sa navigation bar ng iyong website.
- **Disable Public Website** -- Ino-off ang iyong pampublikong website. Gamitin ito kung ginagamit lamang ng simbahan mo ang B1 para sa member portal, giving, at registration, at nasa ibang lugar ang pangunahing website nito.

### Ano ang Ginagawa ng Pag-disable sa Pampublikong Website {#what-disabling-the-public-website-does}

Kapag naka-on ang **Disable Public Website**:

- Ang bawat pampublikong pahina, kasama ang home page at mga custom na pahina mo, ay magpapadala ng mga bisitang hindi naka-sign in sa login screen. Pagkatapos mag-sign in, babalik sila sa pahinang hiniling nila.
- Makikita ng mga naka-sign-in na miyembro ang buong website gaya ng dati, kasama ang navigation mo at ang mga built-in na **Generated** na pahina (gaya ng Groups at Sermons). Hindi na lumalabas sa Pages table ang mga generated na pahina.
- Sinasabihan ang mga search engine na huwag i-index ang site. Walang laman ang sitemap at hinaharangan ng `robots.txt` ang lahat ng crawling.

Patuloy na gumagana ang mga link na ito, kaya maaari pa ring makarating dito ang mga miyembro at bisita:

- Login at logout
- Ang member portal (lahat ng nasa ilalim ng `/mobile`)
- Mga link ng [event registration](../guides/event-registration.md) at guest registration

Lumalabas ang babala sa ilalim ng switch habang naka-off ang pampublikong website. I-off muli ang switch para maibalik ang iyong mga pahina. Walang nabubura habang naka-disable ang site.

:::info
Nalalapat ang setting na ito sa buong simbahan mo. Kung may higit sa isang site ka, io-off nito ang lahat ng ito, hindi lamang ang napili sa site switcher.
:::

## Mga Tip sa Pag-oorganisa ng Iyong Site {#tips-for-organizing-your-site}

- Panatilihing lima o anim na item lamang ang iyong top-level na navigation para mabilis makita ng mga bisita ang mga bagay-bagay.
- Gumamit ng nested na link para sa mga kaugnay na sub-page (halimbawa, isang dropdown na "About" na may "Our Team," "Beliefs," at "History").
- Suriin ang iyong navigation sa telepono para matiyak na maayos itong gumagana sa mas maliliit na screen.
- Bigyan ang mga pahina ng malinaw at mapaglarawang pangalan na tumutulong sa mga bisita na maunawaan kung ano ang makikita nila.

:::tip
Maaari kang magdagdag ng [forms](../forms/creating-forms.md) sa iyong mga pahina para mangolekta ng registration, prayer request, o iba pang impormasyon mula sa mga bisita.
:::

## Pagsisimula mula sa Site Template {#starting-from-a-site-template}

Kung binubuo mo ang iyong site mula sa simula, maaari mo itong simulan gamit ang **Site Template** sa halip na gumawa ng mga pahina nang isa-isa. Ang site template ay lumilikha ng hanay ng mga paunang-gawang pahina -- home, about, connect, give, at iba pa -- na may placeholder na nilalaman at mga navigation link na nakakabit na.

1. Sa Pages screen, i-click ang button na **Start From a Template** (katabi ng button na **Add Page**).
2. Mag-browse sa mga available na template (gaya ng **Classic**, **Modern**, **Community**, at **Visitor Focused**) at i-click ang isa para makita ang preview ng mga pahina nito at ng mga navigation link na idinadagdag nito.
3. Kapag nakita mo ang gusto mo, i-click ang **Create Site**.
4. Ang mga pahinang wala pa ay lilikhain at idadagdag sa iyong navigation. Ang mga pahinang mayroon ka na ay mamarkahang **Already exists** at iiwang gaya ng mga ito. Bubukas ang unang bagong pahina para masuri mo ito.

Pagkatapos maglapat ng template, buksan ang bawat pahina sa [page editor](./page-editor.md) para palitan ang placeholder na teksto at mga larawan ng tunay na nilalaman ng iyong simbahan.

:::info
Nagtatakda lamang ang template ng mga kulay at font sa isang site na hindi pa nagkaroon ng naka-save na color palette. Kapag napili mo na ang sarili mong palette, hindi ginagalaw ng paglalapat ng template ang iyong mga kulay at font -- nananatili ang mga ito sa ilalim ng [Appearance](./appearance.md).
:::

## Maraming Website {#multiple-websites}

Maaaring magpatakbo ang isang simbahan ng higit sa isang website mula sa parehong account -- halimbawa, isa bawat campus o hiwalay na site para sa isang paaralan.

1. Sa Pages screen, buksan ang site switcher (nagpapakita ito ng **Main Website** sa simula) at piliin ang **Manage websites…**.
2. Sa dialog na **Websites**, maglagay ng **Name** at **Subdomain** (mga lowercase na letra at numero lamang -- nagiging `{subdomain}.b1.church` ito) at i-click ang **Add Website**.
3. Piliin ang bagong site sa site switcher para buuin ang mga pahina, navigation, block, at appearance nito.

Para alisin ang isang site, buksan ang **Manage websites…** at i-click ang **Delete** sa tabi nito. Tuluyang mabubura ang mga pahina, navigation, at appearance nito, at ang mga custom domain nito ay mapupunta sa pangunahing website.

## Image Lightbox {#image-lightbox}

Kapag nag-click ang mga bisita ng larawan sa iyong website, bumubukas ito sa full-screen na lightbox overlay. Nagbibigay-daan ito sa mga tao na makita ang mga larawan nang mas malaki nang hindi umaalis sa pahina. Walang kinakailangang configuration -- awtomatikong naka-enable ang lightbox para sa mga larawan sa nilalaman ng iyong pahina.

## Mga Susunod na Hakbang {#next-steps}

- [Initial Setup](./initial-setup.md) -- Mga tagubilin sa unang pag-set up
- [Using the Page Editor](./page-editor.md) -- Alamin kung paano buuin at istilohan ang nilalaman ng pahina
- [Appearance](./appearance.md) -- I-customize ang visual theme ng iyong site
- [Files](./files.md) -- Mag-upload at mamahala ng media asset para sa iyong mga pahina
