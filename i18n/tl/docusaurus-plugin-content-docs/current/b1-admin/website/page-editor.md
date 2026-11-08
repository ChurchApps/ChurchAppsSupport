---
title: "Paggamit ng Page Editor"
description: "Mag-set up ng page editor sa B1 Admin sa pamamagitan ng pagdagdag ng mga section at element, pag-istilo sa mga ito, pag-preview sa mobile, at pag-publish ng mga draft. Saklaw din ang undo at version history."
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang B1 page editor ay isang visual na drag-and-drop builder na nagbibigay-daan sa iyong idisenyo ang mga pahina ng website ng iyong simbahan nang hindi nagsusulat ng anumang code. Maaari kang magdagdag ng mga section at content block, i-customize ang mga istilo, i-preview ang iyong ginawa, at i-undo ang mga pagbabago -- lahat ito ay magagawa mula sa loob ng iyong browser.

</div>

## Training Video

<YouTube id="m2B_JxmfFm4" title="Pag-e-edit ng Mga Pahina at Navigation sa B1" next="Connecting a Custom Domain in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](./initial-setup.md) para ma-configure ang iyong website
- Gumawa ng kahit isang pahina sa [Managing Pages](./managing-pages.md)
- Kailangan mo ang **content.edit** permission para mabuksan ang editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), i-expand ang **Website**, at i-click ang **Pages**.
2. Hanapin ang pahinang nais mong i-edit sa Pages table at i-click ang **Edit Content**.

Bubukas ang editor sa full-screen mode. Ipinapakita ng kaliwang panel ang istruktura ng iyong pahina at ang mga available na content element; ang gitnang bahagi naman ay nagpapakita ng live preview ng iyong pahina.

:::info
Palaging naka-light mode ang editor, anuman ang theme setting ng iyong B1 Admin, at ginagamit nito ang heading at body font na pinili mo sa [Appearance](./appearance.md). Tinitiyak nito na tumutugma nang tama ang preview sa itsura ng pahina para sa mga bisita ng website.
:::

## Istruktura ng Pahina: Mga Section at Element

Binubuo ang bawat pahina ng dalawang antas:

- **Sections** -- Ang mga pangunahing container na naghahati sa pahina sa pahalang na mga bahagi (halimbawa, isang hero section, isang content block, o isang footer strip). Kailangan ng bawat pahina ng kahit isang section bago ka makapagdagdag ng content.
- **Elements** -- Ang mga indibidwal na piraso ng content sa loob ng isang section, tulad ng teksto, mga larawan, button, card, form, at kalendaryo.

### Pagdagdag ng Section

1. I-click ang **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Piliin kung paano magsisimula:
   - **Mula sa template** -- Mag-browse sa section template gallery na nakaayos ayon sa kategorya (Hero, About, Services, Giving, atbp.) at i-click ang isa para ipasok ito bilang section na may kumpletong istilo at paunang napunan. Maaari mong i-customize ang lahat pagkatapos itong idagdag.
   - **Blangkong section** -- Pumili ng column layout (isang column, dalawang column, tatlong column, atbp.) at bumuo mula sa simula.
3. Lumilitaw ang bagong section sa preview. I-click ito para piliin at i-configure ang background color, padding, at iba pang style option nito.

### Pagpapalit ng Layout ng Section

Nakagawa ka na ng section pero gusto mo ng ibang istruktura? Gamitin ang layout switcher sa section na iyon para palitan ang ayos ng mga column nito ng iba mula sa gallery habang nananatili ang iyong umiiral na content at mga element.

### Pagdagdag ng Element sa Section

1. I-click ang loob ng isang section sa preview para piliin ito.
2. I-click ang **Add Content** at piliin ang uri ng element mula sa listahan:
   - **Text** -- Mga heading, talata, at rich text
   - **Image** -- I-upload o i-link ang isang larawan
   - **Button** -- Isang clickable na call-to-action link
   - **Card** -- Isang larawan na may pamagat at paglalarawan
   - **Form** -- I-embed ang isang [form](../forms/creating-forms.md) nang direkta sa pahina. Kung may [header photo](../forms/creating-forms.md#adding-a-header-photo) ang form, lalabas ito sa itaas ng mga tanong
   - **Calendar** -- Ipakita ang isang kalendaryo ng mga event
   - **FAQ** -- Mga accordion-style na bloke ng tanong at sagot
   - **Video** -- I-embed ang isang video gamit ang URL
   - **Groups Browser** -- Isang nasasala na directory ng lahat ng grupo ng simbahan, na may opsyonal na search, category filter, at label filter. Maaaring **Grid** (ang default) o **Scrolling (automatic)** ang **Layout** nito -- tingnan ang [Scrolling layouts](#scrolling-layouts)
   - **Group List** -- Mga tile para sa iyong mga pampublikong grupo, opsyonal na ang mga grupo lamang na may partikular na label. Maaaring **Grid** (ang default; hanggang tatlong tile bawat hanay) o **Scrolling (automatic)** ang **Layout** nito -- tingnan ang [Scrolling layouts](#scrolling-layouts)
   - **Icon Feature** -- Isang icon na may pamagat at maikling paglalarawan, para sa mga highlight ng feature o ministeryo
   - **Gallery** -- Isang multi-photo grid o masonry layout
   - **Testimonial** -- Isa o higit pang quote na may pangalan ng may-akda, papel, at larawan
   - **Social Icons** -- Mga naka-link na icon para sa mga social media profile ng simbahan mo: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo, at Podcast. Maglagay ng link para sa bawat isa na nais mong ipakita; para sa **WhatsApp**, gumamit ng `https://wa.me/` link na may iyong numero o group invite link
   - **Countdown** -- Isang timer na nagbibilang pababa sa isang petsa o sa lingguhang oras ng serbisyo
   - **Stats** -- Isang hanay ng malalaking numero na may mga label (mga miyembro, taon, campus)
   - **Campaign Progress** -- Isang live na progress bar para sa giving campaign, na nagpapakita ng kabuuang nakolekta para sa layunin ng pondo
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang grupo; dapat naka-on ang opsyong **public roster** ng grupo
   - **Service Times** -- Ang iskedyul ng serbisyo ng iyong mga campus, awtomatikong kinukuha mula sa attendance setup
   - **Sermons** -- Ang iyong library ng sermon, bilang buong browser o sa layout na grid, list, o featured-latest
   - **Map** -- Isang naka-embed na mapa na nakasentro sa address ng iyong simbahan
   - **Table** -- Isang simpleng grid ng mga hanay at column para sa tabular na content
   - **Text with Photo** -- Teksto at larawan na magkatabi
   - **Logo** -- Ang logo ng iyong simbahan, kinukuha mula sa [Appearance](./appearance.md)
   - **Live Stream** -- Ang iyong live stream player, direktang naka-embed sa pahina
   - **Podcast** -- Listahan ng mga episode na kinukuha mula sa external na podcast RSS feed URL na ibibigay mo, na may mga setting kung ilang episode ang ipapakita at kung ipapakita ang mga petsa at paglalarawan. Ang bawat episode sa live na site ay may audio player at isang **Download** link na nagse-save ng audio file ng episode sa ilalim ng pamagat nito. Ito ay para sa pagtatampok ng anumang podcast feed sa iyong site; kung nais mong i-publish ang sarili mong mga sermon bilang podcast, tingnan na lamang ang [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Isang giving button o naka-embed na donation form
   - **HTML** -- Sarili mong raw HTML, para sa mga advanced na gamit tulad ng pag-embed ng third-party widget (tingnan ang [Using the HTML element](#using-the-html-element))
   - **iFrame** -- I-embed ang external na content gamit ang URL
3. I-configure ang element gamit ang settings panel na lumilitaw.

### Paggamit ng HTML Element

Ang **HTML** element ay may dalawang kahon:

- **HTML Content** -- Ang markup na ipapakita sa pahina. Ang anumang `<script>` tag na isasama mo rito ay tatakbo sa iyong live na site.
- **JavaScript (exclude script tag)** -- Script code na tatakbo kapag na-load ang pahina. Maaari ka ring mag-paste dito ng embed snippet ng vendor kasama ang mga `<script>` tag nito, at tatakbo ito sa live na site.

Kung ang ipi-paste mo lamang sa JavaScript box ay web address (tulad ng image link), magiging pula ang kahon at lalabas ang babala na *"This is a web address, not JavaScript."* Walang gagawin ang isang bare address sa kahong iyon. Para magpakita ng larawan, gumamit ng **Image** element o ilagay ang `<img src="...">` sa **HTML Content**.

### Paggamit ng Calendar Element {#using-the-calendar-element}

Ipinapakita ng **Calendar** element ang mga event mula sa isa sa iyong mga kalendaryo:

1. Sa ilalim ng **Select**, piliin ang **Group Calendar** (mga event ng isang grupo -- ipinapakita ng listahan ang mga grupong kinabibilangan mo) o **Curated Calendar** (kalendaryong ginawa mo sa ilalim ng **Calendars**; tingnan ang [Curated Calendar](../calendars/curated-calendar.md)).
2. Sa ilalim ng **Select Calendar**, piliin ang grupo o kalendaryo.
3. Sa ilalim ng **Display**, piliin kung paano ito ipapakita:
   - **Month calendar** -- Isang grid ng buwan na maaaring lapatan ng mga bisita. Ang bawat event ay kinukulayan ayon sa grupong kinabibilangan nito, kaya pareho ang kulay ng mga event ng isang grupo sa bawat kalendaryo. Awtomatikong pumipili ng kulay ang B1; wala kang kailangang i-set up.
   - **Upcoming events** -- Isang grid ng mga tile para sa susunod na 12 event, kung saan ang paulit-ulit na event ay ipinapakita nang isang beses sa susunod nitong petsa. Ipinapakita ng bawat tile ang larawan ng event (o ang pamagat nito sa dark color ng iyong theme kapag walang larawan), isang date badge, ang araw at oras, at ang unang linya ng paglalarawan. May **Subscribe** button sa itaas ng mga tile na nagpapahintulot sa mga bisita na kopyahin ang ICS link ng kalendaryo o i-download ito. May **Layout** setting para sa display na ito: **Grid** (ang default) o **Scrolling (automatic)**, na naglalagay ng mga tile sa iisang hanay na kusang gumagalaw (tingnan ang [Scrolling layouts](#scrolling-layouts)). Para sa **Curated Calendar**, i-on ang **Group badge** setting para ipakita ang pangalan ng grupo ng bawat event sa kanang-itaas na sulok ng tile nito, sa kulay ng kalendaryo ng grupong iyon. Hindi nagkakaroon ng badge ang mga event mula sa mga archived o confidential na grupo.
4. Para magpakita lamang ng ilang event, mag-type ng tag sa **Only events tagged** -- halimbawa, `youth`. Tanging ang mga event na may salitang iyon sa **Tags** nila ang lalabas. Iwanang walang laman para ipakita ang lahat ng event. Itinatakda ang mga tag sa bawat event; tingnan ang [Adding and Editing Events](../calendars/creating-calendars.md#adding-and-editing-events).

Sa alinmang display, ang pag-click sa isang event ay magbubukas ng sarili nitong pahina sa iyong website. Ipinapakita ng event page ang larawan, pamagat, petsa at oras, at paglalarawan ng event, kasama ang isang kahon na may **When** (kasama ang pattern ng pag-uulit para sa paulit-ulit na event) at **Where** (ang mga kuwartong naka-book para dito). Mayroon din itong **Register for this Event** button kapag naka-on ang registration, at isang **Add to my calendar** link na nagda-download ng event bilang calendar file. Ginawa ang pahina para maipakita ng mga search engine ang petsa at detalye ng event sa kanilang mga resulta. Kasama rin sa sitemap ng iyong site ang mga event page mula sa mga curated calendar na ipinapakita sa iyong mga pahina (para sa mga event sa susunod na anim na buwan), para mahanap ito ng mga search engine.

### Scrolling Layouts {#scrolling-layouts}

Ang **Scrolling (automatic)** layout sa **Groups Browser**, **Group List**, at sa **Upcoming events** display ng Calendar element ay naglalagay ng mga tile sa iisang hanay sa halip na grid. Sa telepono, pumupuno ang bawat tile sa buong hanay; sa computer, dalawang tile ang magkatabing kasya. Kapag mas marami ang tile kaysa sa kasya, ang hanay ay:

- Sumusulong ng isang tile bawat mga apat na segundo, at babalik sa unang tile pagkatapos ng huli.
- Humihinto habang itinuturo, hinahawakan, o tina-tab ng bisita ang hanay, at ipinagpapatuloy ito makalipas ang ilang segundo.
- Nagpapakita ng hanay ng mga tuldok sa ilalim, isang tuldok bawat tile, kung saan puno ang tuldok ng kasalukuyang tile. Maaaring i-click ng mga bisita ang isang tuldok para lumipat sa tile na iyon.

Sa mga device na naka-set sa reduce motion, nananatiling hindi gumagalaw ang hanay at ang mga bisita na mismo ang nag-swipe o nag-scroll dito. Kung kasya ang lahat ng tile, hindi gumagalaw ang hanay at walang lalabas na tuldok.

### Muling Pag-aayos ng Content

I-drag ang mga section o element gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item para ayusin ang pagkakasunod-sunod nila. Maaari mong i-drag ang mga element sa loob ng isang section o ilipat ang mga ito sa pagitan ng mga section.

## Pag-istilo ng Iyong Pahina

### Mga Istilo ng Section

I-click ang anumang section para buksan ang style panel nito. Maaari mong itakda ang:

- **Background** -- Solid na kulay, gradient, o larawan. Kapag gumagamit ng larawan bilang background, hinahayaan ka ng **Focal Point** picker na i-click kung aling bahagi ng larawan ang mananatiling nasa gitna habang nagsa-scale ang section, at ang opsyong **Overlay** color naman ay nagbibigay-daan na maglagay ng semi-transparent na tint sa ibabaw ng larawan para mas madaling mabasa ang teksto.
- **Padding** -- Espasyo sa itaas at ibaba sa loob ng section
- **Width** -- Buong lapad o nakasentro/nakakulong
- **Dividers** -- Pandekorasyong shape divider (wave, slant, curve, triangle, at iba pa) sa itaas o ibabang gilid ng section, na may kulay, taas, at flip options

### Mga Istilo ng Element

I-click ang anumang element para buksan ang style panel nito. Kabilang sa mga karaniwang opsyon ang font size, kulay, alignment, margin, at padding. Para sa mga larawan, maaari mong itakda ang alt text at mga link target.

### Custom CSS

Para sa mas advanced na pag-istilo, bawat section at element ay may **Custom CSS** field kung saan maaari kang sumulat ng sarili mong CSS rule. Nakatakda ang mga ito sa element na iyon, kaya hindi nito hindi-sinasadyang maaapektuhan ang iba pang bahagi ng pahina.

:::tip
Kung kailangan mong ilapat ang mga istilo sa buong site mo -- gaya ng custom na font o global na kulay -- gamitin ang mga setting ng [Appearance](./appearance.md) sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Iyong Pahina

Gamitin ang mga preview control sa toolbar para tingnan kung paano itsura ng pahina mo sa iba't ibang laki ng screen:

- **Desktop** -- Buong-lapad na browser view
- **Mobile** -- Makitid na view na laki ng telepono

Sa mga telepono, ang mga column sa isang hanay ay nagsasalansan nang patong-patong sa buong lapad, maliban kung nagtakda ka ng **Mobile Width** para sa mga ito sa settings ng hanay. Nagsasalansan din sa mga telepono ang teksto ng bawat episode sa ilalim ng thumbnail nito sa mga listahan ng sermon at podcast.

Para makita ang live na pahina nang eksakto kung paano ito makikita ng mga bisita, bumalik sa listahan ng Pages at i-click ang path ng pahina. Magbubukas ito sa bagong browser tab.

## Pagsusuri ng Accessibility

I-click ang **Accessibility** icon sa toolbar para magsagawa ng mabilisang pagsusuri sa mga karaniwang isyu -- mga larawang walang alt text, mababang color contrast, o mga heading na wala sa tamang pagkakasunod-sunod. Bawat isyu ay direktang nagli-link sa element na nangangailangan ng pansin para maayos mo ito sa mismong lugar.

## Pag-undo ng mga Pagbabago

Awtomatikong sinusubaybayan ng editor ang kasaysayan ng iyong pag-e-edit. Gamitin ang mga button sa toolbar o keyboard shortcut para mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang huling aksyon mo
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Muling ilapat ang aksyong na-undo

Maaari mo ring ibalik ang pahina sa naunang snapshot. I-click ang **View history** sa toolbar para makita ang listahan ng mga naka-save na snapshot na may mga paglalarawan, at i-click ang alinmang entry para maibalik ang pahina sa puntong iyon.

:::warning
Papalitan ng pagbabalik sa snapshot ang kasalukuyang content ng pahina ng bersyon sa snapshot. Hindi ito maaaring i-undo gamit ang karaniwang undo button. I-save muna ang snapshot ng kasalukuyan mong estado bago ibalik ang lumang snapshot kung nais mong manatili ang opsyong bumalik.
:::

## Pag-save at Pag-publish

Awtomatikong nase-save ang mga pagbabago habang nagtatrabaho ka. Ipinapakita ng status indicator sa toolbar kung na-save na ang iyong mga pagbabago.

### Estado ng Draft at Naka-publish

Maaaring magkaroon ng **published** na estado ang mga pahina, na kumokontrol kung kailan makikita ng mga bisita ang iyong mga pagbabago. Ipinapakita ng toolbar ang status chip na nagpapakita ng kasalukuyang estado:

- **Live on save** -- Hindi gumagamit ng publish workflow ang pahina. Bawat na-save na pagbabago ay agad na nagiging live. Ito ang default para sa mga bagong pahina.
- **Unpublished changes** -- Na-publish na dati ang pahina, pero may mga pagbabago ka mula noong huling publish. Nakikita pa rin ng mga bisita ang dating na-publish na bersyon.
- **Published** -- Live ang pahina at tugma ang na-save mong content sa nakikita ng mga bisita.

Para i-publish ang iyong mga pagbabago, i-click ang **Publish** button sa toolbar. Agad magiging live ang pahina.

Para bumalik sa huling na-publish na bersyon nang hindi naaapektuhan ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard unpublished changes**.

Para itigil ang paggamit ng publish workflow, buksan ang overflow menu at i-click ang **Turn off publishing**. Pagkatapos nito, agad nang made-deploy ang mga edit.

:::tip
Gamitin ang draft/publish workflow kapag gusto mong ihanda ang isang pahina -- halimbawa, para sa paparating na event -- at gawing live lamang sa tamang sandali. I-build at i-preview ang pahina, pagkatapos ay i-click ang Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo

- [Managing Pages](./managing-pages.md) -- Gumawa ng mga pahina, magtakda ng URL, at mamahala ng site navigation
- [Appearance](./appearance.md) -- Itakda ang mga kulay, font, at branding para sa buong site
- [Files](./files.md) -- Mag-upload ng mga larawan at dokumento na gagamitin sa editor
- [Creating Forms](../forms/creating-forms.md) -- Gumawa ng mga form na maaari mong i-embed sa mga pahina
