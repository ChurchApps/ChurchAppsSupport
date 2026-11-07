---
title: "Paggamit ng Page Editor"
description: "I-set up ang page editor sa B1 Admin: magdagdag ng seksyon at element, i-style, i-preview sa mobile, at i-publish ang draft. Sakop din ang undo at version history."
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang page editor ng B1 ay isang visual na drag-and-drop na builder na nagpapahintulot sa iyong idisenyo ang mga pahina ng website ng iyong simbahan nang walang sinusulat na code. Maaari kang magdagdag ng mga seksyon at content block, i-customize ang mga istilo, i-preview ang iyong gawa, at i-undo ang mga pagbabago -- lahat mula sa loob ng iyong browser.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](./initial-setup.md) para ma-configure ang iyong website
- Gumawa ng kahit isang pahina sa [Managing Pages](./managing-pages.md)
- Kailangan mo ng permiso na **content.edit** para ma-access ang editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Website**, at i-click ang **Pages**.
2. Hanapin ang pahinang gusto mong i-edit sa Pages table at i-click ang **Edit Content**.

Bumubukas ang editor sa full-screen mode. Ipinapakita ng kaliwang panel ang istruktura ng iyong pahina at ang mga available na content element; ipinapakita ng gitnang bahagi ang live preview ng iyong pahina.

:::info
Laging nasa light mode ang editor, anuman ang theme setting ng iyong B1 Admin, at ginagamit nito ang heading at body font na pinili mo sa [Appearance](./appearance.md). Tinitiyak nito na tumutugma nang tama ang preview sa itsura ng iyong pahina para sa mga bisita ng website.
:::

## Istruktura ng Pahina: Mga Seksyon at Elemento

Binubuo ang bawat pahina ng dalawang antas:

- **Mga Seksyon** -- Ang mga pangunahing container na naghahati sa iyong pahina sa mga pahalang na banda (halimbawa, hero section, content block, o footer strip). Dapat may kahit isang seksyon ang bawat pahina bago ka makapagdagdag ng nilalaman.
- **Mga Elemento** -- Ang mga indibidwal na piraso ng nilalaman na nakalagay sa loob ng seksyon, gaya ng teksto, larawan, button, card, form, at calendar.

### Pagdaragdag ng Seksyon

1. I-click ang **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Piliin kung paano magsisimula:
   - **Mula sa template** -- mag-browse sa gallery ng section template na nakaayos ayon sa kategorya (Hero, About, Services, Giving, atbp.) at i-click ang isa para ipasok ito bilang kumpleto nang istilong, nakapunan nang seksyon. Maaari mong i-customize ang lahat pagkatapos itong idagdag.
   - **Blank section** -- pumili ng column layout (single, two columns, three columns, atbp.) at buuin mula sa simula.
3. Lalabas ang bagong seksyon sa preview. I-click ito para piliin at i-configure ang kulay ng background, padding, at iba pang opsyon sa istilo.

### Pagpapalit ng Layout ng Seksyon

Nabuo mo na ang isang seksyon pero gusto mo ng ibang istruktura? Gamitin ang layout switcher sa seksyong iyon para palitan ang column arrangement nito ng iba mula sa gallery, habang nananatili sa lugar ang umiiral mong nilalaman at mga elemento.

### Pagdaragdag ng Mga Elemento sa Seksyon

1. I-click sa loob ng isang seksyon sa preview para piliin ito.
2. I-click ang **Add Content** at pumili ng uri ng elemento mula sa listahan:
   - **Text** -- Mga heading, talata, at rich text
   - **Image** -- Mag-upload o mag-link sa isang larawan
   - **Button** -- Isang clickable na call-to-action link
   - **Card** -- Isang larawan na may pamagat at paglalarawan
   - **Form** -- I-embed ang isang [form](../forms/creating-forms.md) nang direkta sa pahina. Kung may [header photo](../forms/creating-forms.md#adding-a-header-photo) ang form, lalabas ito sa itaas ng mga tanong
   - **Calendar** -- Ipakita ang isang calendar ng event
   - **FAQ** -- Mga tanong at sagot na istilong accordion
   - **Video** -- I-embed ang video sa pamamagitan ng URL
   - **Groups Browser** -- Isang nasasalang na direktoryo ng lahat ng grupo ng simbahan na may opsyonal na paghahanap, filter ng category, at filter ng label
   - **Icon Feature** -- Isang icon na may pamagat at maikling paglalarawan, para sa mga highlight ng feature o ministry
   - **Gallery** -- Isang multi-photo grid o masonry layout
   - **Testimonial** -- Isa o higit pang quote na may pangalan ng may-akda, role, at larawan
   - **Social Icons** -- Mga naka-link na icon para sa mga social media profile ng iyong simbahan: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo, at Podcast. Maglagay ng link para sa bawat ipapakita mo; para sa **WhatsApp**, gumamit ng `https://wa.me/` na link na may iyong numero o group invite link
   - **Countdown** -- Isang timer na bumibilang pababa sa isang petsa o lingguhang oras ng serbisyo
   - **Stats** -- Isang hilera ng malalaking numero na may label (mga miyembro, taon, campus)
   - **Campaign Progress** -- Isang live na progress bar para sa giving campaign, na nagpapakita ng kabuuang nalikom patungo sa layunin ng fund
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang grupo; dapat naka-on ang opsyong **public roster** ng grupo
   - **Service Times** -- Ang iskedyul ng serbisyo ng iyong mga campus, awtomatikong kinukuha mula sa attendance setup
   - **Sermons** -- Ang iyong sermon library, bilang buong browser o sa layout na grid, list, o featured-latest
   - **Map** -- Isang naka-embed na mapa na nakasentro sa address ng iyong simbahan
   - **Table** -- Simpleng grid ng mga hanay at column para sa tabular na nilalaman
   - **Text with Photo** -- Teksto at larawan na magkatabi
   - **Logo** -- Ang logo ng iyong simbahan, kinuha mula sa [Appearance](./appearance.md)
   - **Live Stream** -- Ang iyong live stream player, direktang naka-embed sa pahina
   - **Podcast** -- Listahan ng mga episode na kinuha mula sa URL ng external na podcast RSS feed na ibibigay mo, na may mga setting kung ilang episode ang ipapakita at kung ipapakita ang mga petsa at paglalarawan. Ang bawat episode sa live na site ay may audio player at **Download** link na nagse-save ng audio file ng episode sa ilalim ng pamagat ng episode. Ito ay para sa pagtatampok ng anumang podcast feed sa iyong site; kung gusto mong i-publish ang sarili mong mga sermon bilang podcast, tingnan ang [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) sa halip
   - **Donation** -- Isang giving button o naka-embed na donation form
   - **HTML** -- Sarili mong raw HTML, para sa mga advanced na gamit gaya ng pag-embed ng third-party widget (tingnan ang [Using the HTML element](#using-the-html-element))
   - **iFrame** -- Mag-embed ng external na nilalaman sa pamamagitan ng URL
3. I-configure ang elemento gamit ang settings panel na lilitaw.

### Paggamit ng HTML Element {#using-the-html-element}

May dalawang kahon ang elementong **HTML**:

- **HTML Content** -- Ang markup na ipapakita sa pahina. Anumang `<script>` tag na isasama mo rito ay tatakbo sa iyong live na site.
- **JavaScript (exclude script tag)** -- Script code na tatakbo kapag na-load ang pahina. Maaari mo ring i-paste dito ang embed snippet ng isang vendor kasama ang mga `<script>` tag nito, at tatakbo ito sa live na site.

Kung ang ilalagay mo lang sa JavaScript box ay web address (gaya ng link ng larawan), magiging pula ang kahon na may babalang *"This is a web address, not JavaScript."* Walang gagawin ang hubad na address sa kahong iyon. Para magpakita ng larawan, gumamit ng **Image** element o ilagay ang `<img src="...">` sa **HTML Content**.

### Paggamit ng Calendar Element {#using-the-calendar-element}

Ipinapakita ng elementong **Calendar** ang mga event mula sa isa sa iyong mga calendar:

1. Sa ilalim ng **Select**, piliin ang **Group Calendar** (mga event ng isang grupo -- ipinapakita ng listahan ang mga grupong kinabibilangan mo) o **Curated Calendar** (isang calendar na ginawa mo sa ilalim ng **Calendars**; tingnan ang [Curated Calendar](../calendars/curated-calendar.md)).
2. Sa ilalim ng **Select Calendar**, piliin ang grupo o calendar.
3. Sa ilalim ng **Display**, piliin kung paano ito ipapakita:
   - **Month calendar** -- Isang grid ng buwan na maaaring pagbuklatin ng mga bisita.
   - **Upcoming events** -- Isang grid ng mga tile para sa susunod na 12 paparating na event, kung saan ang paulit-ulit na event ay ipinapakita nang isang beses sa susunod nitong petsa. Ipinapakita ng bawat tile ang larawan ng event (o ang pamagat nito sa dark color ng iyong theme kapag walang larawan), date badge, araw at oras, at unang linya ng paglalarawan nito. Isang butones na **Subscribe** sa itaas ng mga tile ang nagpapahintulot sa mga bisitang kopyahin ang ICS link ng calendar o i-download ito. May setting na **Layout** para sa display na ito: **Grid** (ang default) o **Scrolling (automatic)**, na naglalagay ng mga tile sa iisang hanay na kusang gumugulong.
4. Para magpakita lang ng ilang event, mag-type ng tag sa **Only events tagged** -- halimbawa, `youth`. Tanging mga event na may salitang iyon sa **Tags** nila ang lalabas. Iwanang blangko para ipakita ang lahat ng event. Itinatakda ang mga tag sa bawat event; tingnan ang [Adding and Editing Events](../calendars/creating-calendars.md#adding-and-editing-events).

Sa alinmang display, ang pag-click sa isang event ay magbubukas sa sarili nitong pahina sa iyong website. Ipinapakita ng pahina ng event ang larawan ng event, pamagat, petsa at oras, at paglalarawan, kasama ang isang kahon na may **When** (kabilang ang pattern ng pag-uulit para sa paulit-ulit na event) at **Where** (ang mga kuwartong naka-book para dito). Mayroon din itong butones na **Register for this Event** kapag naka-on ang registration, at link na **Add to my calendar** na nagda-download ng event bilang calendar file. Ginawa ang pahina para maipakita ng mga search engine ang petsa at detalye ng event sa kanilang resulta. Kasama rin sa sitemap ng iyong site ang mga pahina ng event mula sa mga curated calendar na ipinapakita sa iyong mga pahina (para sa mga event sa susunod na anim na buwan), para mahanap sila ng mga search engine.

### Pagsasaayos Muli ng Nilalaman

I-drag ang mga seksyon o elemento gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item para muling ayusin ang mga ito. Maaari mong i-drag ang mga elemento sa loob ng isang seksyon o ilipat ang mga ito sa pagitan ng mga seksyon.

## Pag-istilo ng Iyong Pahina

### Mga Istilo ng Seksyon

I-click ang alinmang seksyon para buksan ang style panel nito. Maaari mong itakda ang:

- **Background** -- Solid na kulay, gradient, o larawan. Kapag gumagamit ng larawan bilang background, hinahayaan ka ng **Focal Point** picker na i-click kung aling bahagi ng larawan ang mananatiling nasa gitna habang nag-i-scale ang seksyon, at ang opsyon ng kulay na **Overlay** ay nagpapahintulot ng semi-transparent na tint sa ibabaw ng larawan para mas mabasa ang teksto.
- **Padding** -- Espasyo sa itaas at ibaba sa loob ng seksyon
- **Width** -- Full-width o nakasentro/nakapaloob
- **Dividers** -- Pandekorasyong shape divider (wave, slant, curve, triangle, at iba pa) sa itaas o ibabang gilid ng seksyon, na may mga opsyon sa kulay, taas, at flip

### Mga Istilo ng Elemento

I-click ang alinmang elemento para buksan ang style panel nito. Kabilang sa mga karaniwang opsyon ang laki ng font, kulay, alignment, margin, at padding. Para sa mga larawan, maaari kang magtakda ng alt text at mga target ng link.

### Custom CSS

Para sa advanced na pag-istilo, bawat seksyon at elemento ay may field na **Custom CSS** kung saan maaari kang sumulat ng sarili mong CSS rule. Nakatali ang mga ito sa elementong iyon, kaya hindi nila hindi sinasadyang maaapektuhan ang iba pang bahagi ng pahina.

:::tip
Kung kailangan mong ilapat ang mga istilo sa buong site mo -- gaya ng custom na font o global na kulay -- gamitin ang mga setting ng [Appearance](./appearance.md) sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Iyong Pahina

Gamitin ang mga kontrol ng preview sa toolbar para tingnan kung paano lumilitaw ang iyong pahina sa iba't ibang laki ng screen:

- **Desktop** -- Full-width na browser view
- **Mobile** -- Makitid na view na sukat ng telepono

Sa mga telepono, ang mga column sa isang row ay nagsasalansan nang isa sa ibabaw ng isa sa full width, maliban kung nagtakda ka ng **Mobile Width** para sa mga ito sa settings ng row. Ang mga listahan ng sermon at podcast ay nagsasalansan din ng teksto ng bawat episode sa ilalim ng thumbnail nito sa mga telepono.

Para makita ang live na pahina nang eksakto gaya ng makikita ng mga bisita, bumalik sa listahan ng Pages at i-click ang path ng pahina. Bubukas ito sa bagong browser tab.

## Pagsusuri ng Accessibility

I-click ang icon na **Accessibility** sa toolbar para magpatakbo ng mabilisang pagsusuri ng karaniwang problema -- mga larawang walang alt text, mababang color contrast, o heading na wala sa tamang ayos. Bawat isyu ay direktang nagli-link sa elementong nangangailangan ng pansin para maayos mo ito sa mismong lugar.

## Pag-undo ng Mga Pagbabago

Awtomatikong sinusubaybayan ng editor ang kasaysayan ng iyong pag-e-edit. Gamitin ang mga button sa toolbar o keyboard shortcut para mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang huli mong aksyon
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Muling ilapat ang aksyong na-undo

Maaari mo ring ibalik ang pahina sa mas naunang snapshot. I-click ang **View history** sa toolbar para makita ang listahan ng mga naka-save na snapshot na may mga paglalarawan, at i-click ang alinmang entry para bumalik sa puntong iyon.

:::warning
Ang pagbabalik sa snapshot ay papalitan ang kasalukuyang nilalaman ng pahina ng bersyon ng snapshot. Hindi ito maaaring i-undo gamit ang karaniwang undo button. Mag-save ng snapshot ng kasalukuyan mong estado bago ibalik ang luma kung gusto mong may opsyong makabalik.
:::

## Pag-save at Pag-publish

Awtomatikong nase-save ang mga pagbabago habang nagtatrabaho ka. Ipinapakita ng status indicator sa toolbar kung nase-save na ang iyong mga pagbabago.

### Estado ng draft at published

Maaaring may estadong **published** ang mga pahina, na kumokontrol kung kailan makikita ng mga bisita ang iyong mga pagbabago. Ipinapakita ng toolbar ang status chip na nagpapakita ng kasalukuyang estado:

- **Live on save** -- Hindi gumagamit ng publish workflow ang pahina. Bawat na-save na pagbabago ay agad na live. Ito ang default para sa mga bagong pahina.
- **Unpublished changes** -- Naipu-publish na dati ang pahina, pero may mga pagbabago ka mula noong huling publish. Nakikita pa rin ng mga bisita ang dating na-publish na bersyon.
- **Published** -- Live ang pahina at tugma ang na-save mong nilalaman sa nakikita ng mga bisita.

Para i-publish ang iyong mga pagbabago, i-click ang butones na **Publish** sa toolbar. Agad na magiging live ang pahina.

Para bumalik sa huling na-publish na bersyon nang hindi naaapektuhan ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard unpublished changes**.

Para itigil ang paggamit ng publish workflow, buksan ang overflow menu at i-click ang **Turn off publishing**. Agad na magiging live muli ang mga edit.

:::tip
Gamitin ang draft/publish workflow kapag gusto mong ihanda ang pahina -- halimbawa, para sa paparating na event -- at gawin itong live lang sa tamang sandali. Buuin at i-preview ang pahina, pagkatapos i-click ang Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo

- [Managing Pages](./managing-pages.md) -- Gumawa ng mga pahina, magtakda ng URL, at mamahala ng navigation ng site
- [Appearance](./appearance.md) -- Itakda ang mga kulay, font, at branding ng buong site
- [Files](./files.md) -- Mag-upload ng mga larawan at dokumento na gagamitin sa editor
- [Creating Forms](../forms/creating-forms.md) -- Gumawa ng mga form na maaari mong i-embed sa mga pahina
