---
title: "Paggamit ng Page Editor"
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang B1 page editor ay isang visual na drag-and-drop na builder na nagpapahintulot sa iyong idisenyo ang mga pahina ng website ng iyong simbahan nang walang anumang code. Maaari kang magdagdag ng mga seksyon at content block, i-customize ang mga style, i-preview ang iyong ginawa, at i-undo ang mga pagbabago -- lahat mula sa loob ng iyong browser.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para ma-configure ang iyong website
- Gumawa ng kahit isang pahina sa [Managing Pages](managing-pages)
- Kailangan mo ng **content.edit** na permission para ma-access ang editor

</div>

## Pagbukas ng Editor

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Website**, at i-click ang **Pages**.
2. Hanapin ang pahinang gusto mong i-edit sa Pages table at i-click ang **Edit Content**.

Nagbubukas ang editor sa full-screen mode. Ipinapakita ng kaliwang panel ang istruktura ng iyong pahina at ang mga available na content element; ipinapakita ng gitnang bahagi ang live preview ng iyong pahina.

:::info
Palaging nasa light mode ang editor, anuman ang theme setting ng iyong B1 Admin, at ginagamit nito ang heading at body font na pinili mo sa [Appearance](appearance). Tinitiyak nito na eksaktong tumutugma ang preview sa itsura ng pahina para sa mga bisita ng website.
:::

## Istruktura ng Pahina: Mga Seksyon at Elemento

Binubuo ang bawat pahina ng dalawang antas:

- **Mga Seksyon** -- Ang mga pinakamataas na container na naghahati sa pahina sa pahalang na mga banda (halimbawa, isang hero section, isang content block, o footer strip). Dapat may kahit isang seksyon ang bawat pahina bago ka makapagdagdag ng content.
- **Mga Elemento** -- Ang mga indibidwal na piraso ng content na nakalagay sa loob ng seksyon, gaya ng text, larawan, button, card, form, at kalendaryo.

### Pagdagdag ng Seksyon

1. I-click ang **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Piliin kung paano magsisimula:
   - **Mula sa template** -- Mag-browse sa section template gallery na nakaayos ayon sa kategorya (Hero, About, Services, Giving, atbp.) at i-click ang isa upang ipasok ito bilang kumpleto nang naistylo at pre-filled na seksyon. Maaari mo nang i-customize ang lahat pagkatapos itong idagdag.
   - **Blank na seksyon** -- Pumili ng column layout (single, two columns, three columns, atbp.) at bumuo mula sa simula.
3. Lalabas ang bagong seksyon sa preview. I-click ito para piliin ito at i-configure ang kulay ng background, padding, at iba pang style option.

### Pagpalit ng Layout ng Seksyon

Nakagawa ka na ng seksyon pero gusto mo ng ibang istruktura? Gamitin ang layout switcher sa seksyong iyon para palitan ang column arrangement nito ng iba mula sa gallery habang nananatili ang iyong umiiral na content at mga elemento.

### Pagdagdag ng mga Elemento sa Seksyon

1. I-click ang loob ng isang seksyon sa preview para piliin ito.
2. I-click ang **Add Content** at pumili ng uri ng elemento mula sa listahan:
   - **Text** -- Mga heading, talata, at rich text
   - **Image** -- Mag-upload o mag-link ng larawan
   - **Button** -- Isang clickable na call-to-action link
   - **Card** -- Isang larawan na may title at paglalarawan
   - **Form** -- I-embed ang isang [form](../forms/creating-forms) nang direkta sa pahina
   - **Calendar** -- Ipakita ang kalendaryo ng event
   - **FAQ** -- Mga accordion-style na tanong at sagot
   - **Video** -- I-embed ang video gamit ang URL
   - **Groups Browser** -- Isang filterable na directory ng lahat ng group ng simbahan, na may opsyonal na search, category filter, at label filter
   - **Icon Feature** -- Isang icon na may title at maikling paglalarawan, para sa mga highlight ng feature o ministry
   - **Gallery** -- Isang multi-photo grid o masonry layout
   - **Testimonial** -- Isa o higit pang quote na may pangalan ng author, role, at larawan
   - **Social Icons** -- Mga naka-link na icon para sa mga social media profile ng simbahan
   - **Countdown** -- Isang timer na nagbibilang pababa sa isang petsa o sa weekly na oras ng serbisyo
   - **Stats** -- Isang hanay ng malalaking numero na may label (mga miyembro, taon, campus)
   - **Campaign Progress** -- Isang live na progress bar para sa giving campaign, na nagpapakita ng kabuuang nalikom para sa fund goal
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang group; dapat naka-on ang **public roster** option ng group
   - **Service Times** -- Ang iskedyul ng serbisyo ng iyong mga campus, awtomatikong kinuha mula sa attendance setup
   - **Sermons** -- Ang iyong sermon library, bilang buong browser o sa grid, list, o featured-latest layout
   - **Map** -- Isang naka-embed na mapa na nakasentro sa address ng iyong simbahan
   - **Table** -- Isang simpleng grid ng mga row at column para sa tabular na content
   - **Text with Photo** -- Text at isang larawan na magkatabi
   - **Logo** -- Ang logo ng iyong simbahan, galing sa [Appearance](appearance)
   - **Live Stream** -- Ang iyong live stream player, direktang naka-embed sa pahina
   - **Podcast** -- Isang listahan ng mga episode na kinuha mula sa external na podcast RSS feed URL na ibibigay mo, na may mga setting para sa kung ilang episode ang ipapakita at kung ipapakita ang mga petsa at paglalarawan. Ito ay para i-feature ang anumang podcast feed sa iyong site; para i-publish ang sarili mong mga sermon bilang podcast, tingnan ang [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) sa halip.
   - **Donation** -- Isang giving button o naka-embed na donation form
   - **HTML** -- Sarili mong raw HTML, para sa advanced na gamit gaya ng pag-embed ng third-party widget (tingnan ang [Paggamit ng HTML element](#using-the-html-element))
   - **iFrame** -- I-embed ang external na content gamit ang URL
3. I-configure ang elemento gamit ang settings panel na lalabas.

### Paggamit ng HTML element {#using-the-html-element}

May dalawang kahon ang **HTML** element:

- **HTML Content** -- Ang markup na ipapakita sa pahina. Anumang `<script>` tag na isasama mo rito ay tatakbo sa iyong live na site.
- **JavaScript (exclude script tag)** -- Script code na tatakbo kapag na-load ang pahina. Maaari ka ring mag-paste ng embed snippet ng vendor dito na may kasamang `<script>` tag, at tatakbo ito sa live na site.

Kung ang ipe-paste mo lang sa JavaScript box ay web address (gaya ng image link), magiging pula ang kahon at lalabas ang babala na *"This is a web address, not JavaScript."* Walang gagawin ang bare address sa kahong iyon. Para magpakita ng larawan, gamitin ang **Image** element o ilagay ang `<img src="...">` sa **HTML Content**.

### Paggamit ng Calendar element {#using-the-calendar-element}

Ipinapakita ng **Calendar** element ang mga event mula sa isa sa iyong kalendaryo:

1. Sa ilalim ng **Select**, piliin ang **Group Calendar** (mga event ng isang group -- ang listahan ay nagpapakita ng mga group na kasapi ka) o **Curated Calendar** (isang kalendaryong ginawa mo sa ilalim ng **Calendars**; tingnan ang [Curated Calendar](../calendars/curated-calendar)).
2. Sa ilalim ng **Select Calendar**, piliin ang group o kalendaryo.
3. Sa ilalim ng **Display**, piliin kung paano ito ipapakita:
   - **Month calendar** -- Isang month grid na maaaring i-page ng mga bisita.
   - **Upcoming events** -- Isang grid ng mga tile para sa susunod na 12 event, kung saan ang paulit-ulit na event ay ipinapakita nang isang beses sa susunod nitong petsa. Ipinapakita ng bawat tile ang larawan ng event (o ang title nito sa dark color ng theme kapag walang larawan), date badge, araw at oras, at ang unang linya ng paglalarawan. May button na **Subscribe** sa itaas ng mga tile na nagpapahintulot sa mga bisita na kopyahin ang ICS link ng kalendaryo o i-download ito.
4. Para ipakita lang ang ilang event, mag-type ng tag sa **Only events tagged** -- halimbawa, `youth`. Tanging mga event na may salitang iyon sa **Tags** nila ang lalabas. Iwanang walang laman para ipakita ang lahat ng event. Itinatakda ang mga tag sa bawat event; tingnan ang [Adding and Editing Events](../calendars/creating-calendars.md#adding-and-editing-events).

Sa alinmang display, ang pag-click sa isang event ay magbubukas ng sarili nitong pahina sa iyong website. Ipinapakita ng event page ang larawan ng event, title, petsa at oras, at paglalarawan, kasama ang isang kahon na may **When** (kasama ang repeat pattern para sa paulit-ulit na event) at **Where** (ang mga kuwartong naka-book para dito). Mayroon din itong button na **Register for this Event** kapag naka-on ang registration, at link na **Add to my calendar** na nagda-download ng event bilang calendar file. Naka-set up ang pahina para maipakita ng mga search engine ang petsa at detalye ng event sa kanilang mga resulta.

### Pag-aayos Muli ng Content

I-drag ang mga seksyon o elemento gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item para ayusin ang pagkakasunod-sunod nito. Maaari mong i-drag ang mga elemento sa loob ng isang seksyon o ilipat ang mga ito sa pagitan ng mga seksyon.

## Pag-istilo ng Pahina

### Mga Style ng Seksyon

I-click ang anumang seksyon para buksan ang style panel nito. Maaari mong itakda ang:

- **Background** -- Solid na kulay, gradient, o larawan. Kapag gumagamit ng larawan bilang background, binibigyan ka ng **Focal Point** picker ng pagkakataong i-click kung aling bahagi ng larawan ang mananatiling nakasentro habang nag-i-scale ang seksyon, at ang opsyong **Overlay** na kulay ay nagpapahintulot sa iyong maglagay ng semi-transparent na tint sa ibabaw ng larawan para mas mabasa ang text.
- **Padding** -- Itaas at ibabang espasyo sa loob ng seksyon
- **Width** -- Full-width o nakasentro/nakalimit ang lapad
- **Dividers** -- Pandekorasyon na shape divider (wave, slant, curve, triangle, at iba pa) sa itaas o ibabang gilid ng seksyon, na may kulay, taas, at flip option

### Mga Style ng Elemento

I-click ang anumang elemento para buksan ang style panel nito. Kabilang sa mga karaniwang option ang font size, kulay, alignment, margin, at padding. Para sa mga larawan, maaari kang magtakda ng alt text at link target.

### Custom CSS

Para sa advanced na pag-istilo, may field na **Custom CSS** ang bawat seksyon at elemento kung saan maaari kang sumulat ng sarili mong CSS rule. Nakatutok ang mga ito sa elementong iyon, kaya hindi nito aksidenteng maaapektuhan ang iba pang bahagi ng pahina.

:::tip
Kung kailangan mong mag-apply ng style sa buong site -- gaya ng custom na font o global na kulay -- gamitin ang mga setting ng [Appearance](appearance) sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Pahina

Gamitin ang mga preview control sa toolbar para tingnan kung paano itsura ng pahina sa iba't ibang laki ng screen:

- **Desktop** -- Full-width na view ng browser
- **Mobile** -- Makitid na view na kasing-laki ng telepono

Para makita ang live na pahina nang eksakto gaya ng makikita ng mga bisita, bumalik sa listahan ng Pages at i-click ang path ng pahina. Magbubukas ito sa bagong browser tab.

## Pagsuri ng Accessibility

I-click ang **Accessibility** icon sa toolbar para magpatakbo ng mabilis na pagsusuri sa mga karaniwang problema -- mga larawang walang alt text, mababang color contrast, o mga heading na wala sa tamang ayos. Bawat isyu ay direktang nagli-link sa elementong kailangang ayusin para maayos mo ito sa mismong lugar.

## Pag-undo ng mga Pagbabago

Awtomatikong sinusubaybayan ng editor ang kasaysayan ng iyong pag-edit. Gamitin ang mga button sa toolbar o keyboard shortcut para mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang iyong huling aksyon
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Ulitin ang aksyong na-undo

Maaari mo ring ibalik ang pahina sa naunang snapshot. I-click ang **View history** sa toolbar para makita ang listahan ng mga na-save na snapshot na may mga paglalarawan, at i-click ang anumang entry para bumalik sa puntong iyon.

:::warning
Ang pagbalik sa isang snapshot ay papalitan ang kasalukuyang content ng pahina ng bersyon ng snapshot. Hindi ito maaaring i-undo gamit ang karaniwang undo button. I-save muna ang snapshot ng kasalukuyang estado bago bumalik sa lumang snapshot kung gusto mong may opsyon kang bumalik.
:::

## Pag-save at Pag-publish

Awtomatikong nase-save ang mga pagbabago habang nagtatrabaho ka. Ipinapakita ng status indicator sa toolbar kung nase-save na ang iyong mga pagbabago.

### Estado ng draft at published

Maaaring may **published** na estado ang mga pahina, na kumokontrol kung kailan makikita ng mga bisita ang iyong mga pagbabago. Ipinapakita ng toolbar ang status chip na nagpapakita ng kasalukuyang estado:

- **Live on save** -- Hindi gumagamit ng publish workflow ang pahina. Agad na nagiging live ang bawat na-save na pagbabago. Ito ang default para sa mga bagong pahina.
- **Unpublished changes** -- Na-publish na dati ang pahina, pero may mga pagbabago ka mula noong huling publish. Nakikita pa rin ng mga bisita ang dating na-publish na bersyon.
- **Published** -- Live ang pahina at tugma ang iyong na-save na content sa nakikita ng mga bisita.

Para i-publish ang iyong mga pagbabago, i-click ang **Publish** button sa toolbar. Agad na magiging live ang pahina.

Para bumalik sa huling na-publish na bersyon nang hindi naaapektuhan ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard unpublished changes**.

Para itigil ang paggamit ng publish workflow, buksan ang overflow menu at i-click ang **Turn off publishing**. Pagkatapos nito, agad nang magiging live ang mga pag-edit.

:::tip
Gamitin ang draft/publish workflow kapag gusto mong ihanda ang isang pahina -- halimbawa, para sa paparating na event -- at gawin lang itong live sa tamang sandali. Buuin at i-preview ang pahina, pagkatapos i-click ang Publish kapag handa ka na.
:::

## Kaugnay na Artikulo

- [Managing Pages](managing-pages) -- Gumawa ng mga pahina, magtakda ng URL, at pamahalaan ang site navigation
- [Appearance](appearance) -- Magtakda ng site-wide na kulay, font, at branding
- [Files](files) -- Mag-upload ng mga larawan at dokumento na gagamitin sa editor
- [Creating Forms](../forms/creating-forms) -- Gumawa ng mga form na maaaring i-embed sa mga pahina
