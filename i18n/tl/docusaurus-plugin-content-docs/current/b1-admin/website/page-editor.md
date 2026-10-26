---
title: "Paggamit ng Page Editor"
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang page editor ng B1 ay isang visual na drag-and-drop na builder na nagbibigay-daan sa iyong idisenyo ang mga pahina ng website ng iyong simbahan nang hindi nagsusulat ng code. Maaari kang magdagdag ng mga seksyon at content block, i-customize ang mga estilo, i-preview ang iyong gawa, at i-undo ang mga pagbabago -- lahat mula sa loob ng iyong browser.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para maayos ang iyong website
- Gumawa ng kahit isang pahina sa [Managing Pages](managing-pages)
- Kailangan mo ng **content.edit** permission para mabuksan ang editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Website**, at i-click ang **Pages**.
2. Hanapin ang pahinang nais mong i-edit sa Pages table at i-click ang **Edit Content**.

Bubukas ang editor sa full-screen mode. Ipinapakita ng kaliwang panel ang istruktura ng iyong pahina at ang mga available na elemento ng content; ipinapakita ng gitnang bahagi ang live na preview ng iyong pahina.

:::info
Palaging nakikita ang editor sa light mode, anuman ang theme setting ng iyong B1 Admin, at ginagamit nito ang heading at body font na pinili mo sa [Appearance](appearance). Tinitiyak nito na eksaktong tumutugma ang preview sa itsura ng pahina para sa mga bisita ng website.
:::

## Istruktura ng Pahina: Mga Seksyon at Elemento

Binubuo ang bawat pahina ng dalawang antas:

- **Sections** -- Ang mga pinakamataas na container na naghahati sa pahina sa pahalang na banda (halimbawa, isang hero section, isang content block, o isang footer strip). Kailangan ng bawat pahina ng kahit isang seksyon bago ka makapagdagdag ng content.
- **Elements** -- Ang mga indibidwal na piraso ng content na nakalagay sa loob ng isang seksyon, tulad ng text, mga larawan, button, card, form, at kalendaryo.

### Pagdaragdag ng Seksyon

1. I-click ang **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Pumili kung paano magsisimula:
   - **From a template** -- mag-browse sa gallery ng section template na nakaayos ayon sa kategorya (Hero, About, Services, Giving, atbp.) at i-click ang isa para ipasok ito bilang isang ganap na naistilong, paunang napunong seksyon. Maaari mong i-customize ang lahat pagkatapos itong maidagdag.
   - **Blank section** -- pumili ng column layout (isang column, dalawang column, tatlong column, atbp.) at bumuo mula sa simula.
3. Lalabas ang bagong seksyon sa preview. I-click ito para piliin at i-configure ang background color, padding, at iba pang opsyon sa estilo nito.

### Pagpapalit ng Layout ng Seksyon

Nakagawa ka na ng seksyon ngunit gusto mo ng ibang istruktura? Gamitin ang layout switcher sa seksyong iyon para palitan ang ayos ng column nito ng iba mula sa gallery, habang nananatili sa lugar ang umiiral mong content at mga elemento.

### Pagdaragdag ng Mga Elemento sa Seksyon

1. I-click sa loob ng isang seksyon sa preview para piliin ito.
2. I-click ang **Add Content** at pumili ng uri ng elemento mula sa listahan:
   - **Text** -- Mga heading, talata, at rich text
   - **Image** -- Mag-upload o mag-link ng larawan
   - **Button** -- Isang clickable na call-to-action link
   - **Card** -- Isang larawan na may pamagat at paglalarawan
   - **Form** -- Mag-embed ng [form](../forms/creating-forms) nang direkta sa pahina. Kung may [header photo](../forms/creating-forms.md#adding-a-header-photo) ang form, lalabas ito sa ibabaw ng mga tanong
   - **Calendar** -- Magpakita ng kalendaryo ng event
   - **FAQ** -- Mga block ng tanong at sagot na istilong accordion
   - **Video** -- Mag-embed ng video gamit ang URL
   - **Groups Browser** -- Isang nasasala na direktoryo ng lahat ng grupo ng simbahan na may opsyonal na paghahanap, filter ng kategorya, at filter ng label
   - **Icon Feature** -- Isang icon na may pamagat at maikling paglalarawan, para sa mga highlight ng feature o ministry
   - **Gallery** -- Isang multi-photo grid o masonry layout
   - **Testimonial** -- Isa o higit pang quote na may pangalan ng may-akda, role, at larawan
   - **Social Icons** -- Mga naka-link na icon para sa mga social media profile ng iyong simbahan: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo, at Podcast. Maglagay ng link para sa bawat isa na nais mong ipakita; para sa **WhatsApp**, gumamit ng `https://wa.me/` link na may iyong numero o invite link ng grupo
   - **Countdown** -- Isang timer na bumibilang pababa sa isang petsa o sa lingguhang oras ng serbisyo
   - **Stats** -- Isang hanay ng malalaking numero na may mga label (mga miyembro, taon, campus)
   - **Campaign Progress** -- Isang live na progress bar para sa giving campaign, na nagpapakita ng kabuuang nalikom patungo sa layunin ng pondo
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang grupo; dapat naka-on ang **public roster** option ng grupo
   - **Service Times** -- Ang iskedyul ng serbisyo ng iyong mga campus, awtomatikong kinukuha mula sa attendance setup
   - **Sermons** -- Ang iyong library ng sermon, bilang buong browser o bilang grid, list, o featured-latest layout
   - **Map** -- Isang naka-embed na mapa na nakasentro sa address ng iyong simbahan
   - **Table** -- Isang simpleng grid ng mga hanay at column para sa tabular na content
   - **Text with Photo** -- Text at larawan na magkatabi
   - **Logo** -- Ang logo ng iyong simbahan, kinukuha mula sa [Appearance](appearance)
   - **Live Stream** -- Ang iyong live stream player, direktang naka-embed sa pahina
   - **Podcast** -- Isang listahan ng mga episode na kinukuha mula sa external na podcast RSS feed URL na iyong ibinigay, na may mga setting kung ilang episode ang ipapakita at kung ipapakita ang mga petsa at paglalarawan. Ang bawat episode sa live na site ay may audio player at isang **Download** link na nagsasave ng audio file ng episode gamit ang pamagat ng episode. Ito ay para sa pagtatampok ng anumang podcast feed sa iyong site; para mag-publish ng sarili mong sermon bilang podcast, tingnan ang [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) sa halip
   - **Donation** -- Isang giving button o naka-embed na donation form
   - **HTML** -- Sarili mong raw HTML, para sa mga advanced na gamit tulad ng pag-embed ng third-party widget (tingnan ang [Using the HTML element](#using-the-html-element))
   - **iFrame** -- Mag-embed ng external na content gamit ang URL
3. I-configure ang elemento gamit ang settings panel na lilitaw.

### Paggamit ng HTML Element

Dalawang kahon ang **HTML** element:

- **HTML Content** -- Ang markup na ipapakita sa pahina. Anumang `<script>` tag na isasama mo rito ay tatakbo sa iyong live na site.
- **JavaScript (exclude script tag)** -- Script code na tatakbo kapag na-load ang pahina. Maaari ka ring mag-paste ng embed snippet ng isang vendor dito na kasama ang kanilang `<script>` tag, at tatakbo ito sa live na site.

Kung mag-paste ka lamang ng web address (gaya ng link ng larawan) sa JavaScript box, magiging pula ang kahon at lilitaw ang babala na *"This is a web address, not JavaScript."* Walang ginagawa ang nakahubad na address sa kahong iyon. Para magpakita ng larawan, gumamit ng **Image** element o ilagay ang `<img src="...">` sa **HTML Content**.

### Paggamit ng Calendar Element {#using-the-calendar-element}

Ipinapakita ng **Calendar** element ang mga event mula sa isa sa iyong mga kalendaryo:

1. Sa ilalim ng **Select**, piliin ang **Group Calendar** (mga event ng isang grupo lamang -- ipinapakita ng listahan ang mga grupong kinabibilangan mo) o **Curated Calendar** (isang kalendaryong ginawa mo sa ilalim ng **Calendars**; tingnan ang [Curated Calendar](../calendars/curated-calendar)).
2. Sa ilalim ng **Select Calendar**, piliin ang grupo o kalendaryo.
3. Sa ilalim ng **Display**, piliin kung paano ito ipapakita:
   - **Month calendar** -- Isang grid ng buwan na maaaring lakaran ng mga bisita.
   - **Upcoming events** -- Isang grid ng mga tile para sa susunod na 12 paparating na event, kung saan ang paulit-ulit na event ay ipinapakita nang isang beses sa susunod nitong petsa. Ipinapakita ng bawat tile ang larawan ng event (o ang pamagat nito sa dark color ng iyong theme kapag walang larawan), isang date badge, ang araw at oras, at ang unang linya ng paglalarawan nito. May **Subscribe** button sa itaas ng mga tile na nagbibigay-daan sa mga bisita na kopyahin ang ICS link ng kalendaryo o i-download ito.
4. Para ipakita lamang ang ilang event, mag-type ng tag sa **Only events tagged** -- halimbawa, `youth`. Tanging ang mga event na may salitang iyon sa **Tags** nila ang lalabas. Iwanang walang laman para ipakita ang lahat ng event. Itinatakda ang mga tag sa bawat event; tingnan ang [Adding and Editing Events](../calendars/creating-calendars.md#adding-and-editing-events).

Sa alinmang display, ang pag-click sa event ay magbubukas ng sarili nitong pahina sa iyong website. Ipinapakita ng pahina ng event ang larawan, pamagat, petsa at oras, at paglalarawan ng event, kasama ang isang kahon na may **When** (kabilang ang pattern ng pag-uulit para sa paulit-ulit na event) at **Where** (ang mga kuwartong naka-book para dito). Mayroon din itong **Register for this Event** button kapag naka-on ang registration, at isang link na **Add to my calendar** na nagda-download ng event bilang calendar file. Ginawa ang pahina para maipakita ng mga search engine ang petsa at detalye ng event sa kanilang mga resulta. Kasama rin sa sitemap ng iyong site ang mga event page mula sa curated calendar na ipinapakita sa iyong mga pahina (para sa mga event sa susunod na anim na buwan), para mahanap ng mga search engine ang mga ito.

### Muling Pag-aayos ng Content

I-drag ang mga seksyon o elemento gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item para ayusin ang pagkakasunod-sunod nito. Maaari mong i-drag ang mga elemento sa loob ng isang seksyon o ilipat ang mga ito sa pagitan ng mga seksyon.

## Pag-istilo ng Iyong Pahina

### Mga Estilo ng Seksyon

I-click ang anumang seksyon para buksan ang panel ng estilo nito. Maaari mong itakda ang:

- **Background** -- Solid na kulay, gradient, o larawan. Kapag gumagamit ng larawan bilang background, pinapayagan ka ng **Focal Point** picker na i-click kung aling bahagi ng larawan ang mananatiling nakasentro habang nag-i-scale ang seksyon, at ang opsyong kulay na **Overlay** ay nagbibigay-daan sa iyong maglagay ng semi-transparent na tint sa ibabaw ng larawan para mapabuti ang pagbasa ng text
- **Padding** -- Espasyo sa itaas at ibaba sa loob ng seksyon
- **Width** -- Buong lapad o nakasentro/nakapaloob
- **Dividers** -- Pandekorasyong shape divider (wave, slant, curve, triangle, at iba pa) sa itaas o ibabang gilid ng seksyon, na may mga opsyon sa kulay, taas, at flip

### Mga Estilo ng Elemento

I-click ang alinmang elemento para buksan ang panel ng estilo nito. Kabilang sa mga karaniwang opsyon ang laki ng font, kulay, alignment, margin, at padding. Para sa mga larawan, maaari mong itakda ang alt text at target ng link.

### Custom CSS

Para sa advanced na pag-istilo, bawat seksyon at elemento ay may field na **Custom CSS** kung saan maaari kang sumulat ng sarili mong CSS rule. Nakasaklaw ang mga ito sa elementong iyon, kaya hindi nila hindi sinasadyang maaapektuhan ang iba pang bahagi ng pahina.

:::tip
Kung kailangan mong ilapat ang mga estilo sa buong site mo -- gaya ng custom na font o pandaigdigang kulay -- gamitin ang mga setting ng [Appearance](appearance) sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Iyong Pahina

Gamitin ang mga kontrol ng preview sa toolbar para tingnan kung paano ang itsura ng pahina sa iba't ibang laki ng screen:

- **Desktop** -- Buong lapad na view ng browser
- **Mobile** -- Makitid na view na sukat ng telepono

Para makita ang live na pahina nang eksakto gaya ng pagkakita ng mga bisita, bumalik sa listahan ng Pages at i-click ang path ng pahina. Magbubukas ito sa bagong browser tab.

## Pagsusuri ng Accessibility

I-click ang **Accessibility** icon sa toolbar para magpatakbo ng mabilisang pagsusuri sa mga karaniwang problema -- mga larawang walang alt text, mababang contrast ng kulay, o mga heading na wala sa tamang ayos. Bawat isyu ay direktang nagli-link sa elementong kailangang ayusin para maayos mo ito sa mismong lugar.

## Pag-undo ng Mga Pagbabago

Awtomatikong sinusubaybayan ng editor ang iyong kasaysayan ng pag-e-edit. Gamitin ang mga button sa toolbar o keyboard shortcut para mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang iyong huling aksyon
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Muling ilapat ang aksyong na-undo

Maaari mo ring ibalik ang pahina sa naunang snapshot. I-click ang **View history** sa toolbar para makita ang listahan ng mga naka-save na snapshot na may mga paglalarawan, at i-click ang alinmang entry para ibalik sa puntong iyon.

:::warning
Ang pagbabalik sa isang snapshot ay papalitan ang kasalukuyang content ng pahina ng bersyon ng snapshot. Hindi ito maaaring bawiin gamit ang karaniwang undo button. I-save muna ang snapshot ng kasalukuyan mong estado bago ibalik ang lumang isa kung nais mong manatili ang opsyong bumalik.
:::

## Pag-save at Pag-publish

Awtomatikong nase-save ang mga pagbabago habang ginagawa mo ang mga ito. Ipinapakita ng status indicator sa toolbar kung na-save na ang iyong mga pagbabago.

### Estado ng draft at published

Maaaring may **published** na estado ang mga pahina, na kumokontrol kung kailan makikita ng mga bisita ang iyong mga pagbabago. Ipinapakita ng toolbar ang status chip na nagpapakita ng kasalukuyang estado:

- **Live on save** -- Hindi gumagamit ng publish workflow ang pahina. Bawat na-save na pagbabago ay agad na nagiging live. Ito ang default para sa mga bagong pahina.
- **Unpublished changes** -- Na-publish na dati ang pahina, ngunit may mga pagbabago ka mula noong huling publish. Makikita pa rin ng mga bisita ang dating na-publish na bersyon.
- **Published** -- Live ang pahina at tumutugma ang na-save mong content sa nakikita ng mga bisita.

Para i-publish ang iyong mga pagbabago, i-click ang **Publish** button sa toolbar. Agad na magiging live ang pahina.

Para bumalik sa huling na-publish na bersyon nang hindi naaapektuhan ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard unpublished changes**.

Para itigil ang paggamit ng publish workflow, buksan ang overflow menu at i-click ang **Turn off publishing**. Pagkatapos nito, babalik na sa pagiging live agad ang mga pag-e-edit.

:::tip
Gamitin ang draft/publish workflow kapag gusto mong ihanda ang isang pahina -- halimbawa, para sa paparating na event -- at gawin lamang itong live sa tamang sandali. Buuin at i-preview ang pahina, pagkatapos i-click ang Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo

- [Managing Pages](managing-pages) -- Gumawa ng mga pahina, magtakda ng URL, at pamahalaan ang nabigasyon ng site
- [Appearance](appearance) -- Itakda ang mga kulay, font, at branding ng buong site
- [Files](files) -- Mag-upload ng mga larawan at dokumento na gagamitin sa editor
- [Creating Forms](../forms/creating-forms) -- Gumawa ng mga form na maaari mong i-embed sa mga pahina
