---
title: "Paggamit ng Page Editor"
description: "Gumawa ng mga pahina ng website sa page editor ng B1 Admin: magdagdag ng mga seksyon at elemento, i-istilo ang mga ito, mag-preview sa mobile, mag-publish ng mga draft, at gumamit ng undo at edit history."
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang page editor ng B1 ay isang visual na drag-and-drop na builder na hinahayaan kang idisenyo ang mga pahina ng website ng iyong simbahan nang hindi nagsusulat ng code. Maaari kang magdagdag ng mga seksyon at content block, mag-customize ng mga istilo, mag-preview ng iyong gawa, at mag-undo ng mga pagbabago -- lahat mula sa loob ng iyong browser.

</div>

## Training Video {#training-video}

<YouTube id="m2B_JxmfFm4" title="Pag-edit ng mga Pahina at Navigation sa B1" next="Pagkonekta ng Custom Domain sa B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](./initial-setup.md) para ma-configure ang iyong website
- Gumawa ng kahit isang pahina sa [Managing Pages](./managing-pages.md)
- Kailangan mo ng permiso na **content.edit** para ma-access ang editor

</div>

## Pagbubukas ng Editor {#opening-the-editor}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Website**, at i-click ang **Pages**.
2. Hanapin ang pahinang gusto mong i-edit sa Pages table at i-click ang **Edit Content**.

Bubukas ang editor sa full-screen mode na may live preview ng iyong pahina. Ang toolbar sa itaas ay may **Exit**, ang status ng publish ng pahina, **Undo** at **Redo**, ang save status, **Publish**, ang mga button ng desktop at mobile preview, **Add Content**, ang accessibility check, at menu na **More** (⋮). I-click ang **Add Content** para buksan ang panel na **Add Elements** sa kaliwa; i-click ang seksyon o elemento para buksan ang mga setting nito sa kanan.

Kailangan ng editor ng screen na hindi bababa sa humigit-kumulang 880 pixels ang lapad. Sa telepono, makakakita ka ng mensaheng humihiling na buksan ang pahina sa tablet o computer.

:::info
Palaging nasa light mode ang editor, anuman ang theme setting ng iyong B1 Admin, at ginagamit nito ang heading at body font na pinili mo sa [Appearance](./appearance.md). Tinitiyak nito na tumutugma nang tama ang preview sa itsura ng pahina sa mga bisita ng website.
:::

## Istruktura ng Pahina: Mga Seksyon at Elemento {#page-structure-sections-and-elements}

Binubuo ang bawat pahina ng dalawang antas:

- **Mga Seksyon** -- Ang mga top-level na lalagyan na naghahati sa pahina sa mga pahalang na banda (halimbawa, hero section, content block, o footer strip). Kailangang may kahit isang seksyon ang bawat pahina bago ka makapagdagdag ng nilalaman.
- **Mga Elemento** -- Ang mga indibidwal na piraso ng nilalaman na nakalagay sa loob ng isang seksyon, gaya ng teksto, larawan, button, card, form, at calendar.

### Pagdaragdag ng Seksyon {#adding-a-section}

1. I-click ang **Add Content** at i-drag ang **Section** papunta sa pahina. Maaari ka ring mag-hover sa pagitan ng dalawang seksyon at i-click ang **+** (**Add section**) na button na lilitaw.
2. Sa dialog na **Choose a Section Layout**, pumili kung paano magsisimula:
   - **From a template** -- mag-browse sa mga template ng seksyon ayon sa kategorya (Hero, About, Services, People, Media, Giving, at Call to Action) at i-click ang isa para ipasok ito bilang buong naistilong, paunang-napunang seksyon. Maaari mong i-customize ang lahat pagkatapos idagdag ito.
   - **Blank Section** -- isang walang lamang seksyon para buuin mula sa simula. Para hatiin ito sa mga column, magdagdag ng elementong **Row** sa loob nito.
3. Lalabas ang bagong seksyon sa preview. I-click ito para piliin at i-configure ang background, mga kulay, at iba pang opsyon sa istilo nito.

Kapag nag-hover ka sa isang seksyon, lalabas ang toolbar nito: drag handle, **Section settings**, **Move section up**, **Move section down**, **Duplicate section**, **Try another layout**, at **Delete section**.

### Pagpapalit ng Layout ng Seksyon {#switching-a-sections-layout}

Nabuo mo na ang isang seksyon pero gusto mo ng ibang istruktura? I-click ang **Try another layout** sa toolbar ng seksyon para palitan ang ayos nito ng ibang layout mula sa gallery, habang nananatili ang umiiral mong nilalaman at mga elemento.

### Pagdaragdag ng Elemento sa Seksyon {#adding-elements-to-a-section}

1. I-click ang **Add Content** para buksan ang panel na **Add Elements**. Gamitin ang **Search Elements** o ang mga tab (**All**, **Common**, **Media**, **Church**, **Advanced**, at **Blocks** kapag mayroon ka nang [reusable blocks](./blocks.md)) para hanapin ang isang elemento.
2. I-drag ang elemento papasok sa isang seksyon sa preview, o pumili ng elemento sa pahina at pagkatapos i-click ang isang card para idagdag ang bagong elemento kaagad pagkatapos nito. Ang mga elemento ay:
   - **Row** -- Hinahati ang seksyon sa magkatabing column
   - **Box** -- Pinagsasama-sama ang mga elemento sa isang naistilong lalagyan
   - **Carousel** -- Umiikot sa hanay ng full-width na slide
   - **White Space** -- Nagdaragdag ng bakanteng patayong espasyo
   - **Text** -- Mga heading, talata, at rich text
   - **Image** -- Mag-upload o mag-link ng larawan
   - **Button Link** -- Isang clickable na call-to-action button
   - **Card** -- Isang larawan na may pamagat at paglalarawan
   - **Form** -- Mag-embed ng [form](../forms/creating-forms.md) nang direkta sa pahina. Kung may [header photo](../forms/creating-forms.md#adding-a-header-photo) ang form, lalabas ito sa itaas ng mga tanong
   - **Calendar** -- Magpakita ng event calendar
   - **Expandable** -- Mga bloke ng tanong at sagot na istilong accordion
   - **Video** -- Mag-embed ng video sa pamamagitan ng URL
   - **Groups Browser** -- Isang nasasalang na directory ng lahat ng grupo ng simbahan, na may opsyonal na paghahanap, filter ng kategorya, at filter ng label. Ang **Layout** nito ay maaaring **Grid** (ang default) o **Scrolling (automatic)** -- tingnan ang [Scrolling layouts](#scrolling-layouts)
   - **Group List** -- Mga tile para sa iyong mga pampublikong grupo, opsyonal na yaong mga may partikular na label lamang. Ang **Layout** nito ay maaaring **Grid** (ang default; hanggang tatlong tile kada row) o **Scrolling (automatic)** -- tingnan ang [Scrolling layouts](#scrolling-layouts)
   - **Icon Feature** -- Isang icon na may pamagat at maikling paglalarawan, para sa mga tampok o highlight ng ministeryo
   - **Gallery** -- Isang multi-photo grid o masonry layout
   - **Testimonial** -- Isa o higit pang quote na may pangalan, papel, at larawan ng may-akda
   - **Social Icons** -- Mga naka-link na icon para sa social media profile ng simbahan mo: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo, at Podcast. Maglagay ng link para sa bawat isa na gusto mong ipakita; para sa **WhatsApp**, gumamit ng `https://wa.me/` na link na may iyong numero o group invite link
   - **Countdown** -- Isang timer na bumibilang papunta sa isang petsa o lingguhang oras ng serbisyo
   - **Stats** -- Isang hilera ng malalaking numero na may label (mga miyembro, taon, campus)
   - **Campaign Progress** -- Isang live na progress bar para sa giving campaign, na nagpapakita ng kabuuang nalikom patungo sa layunin ng isang fund
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang grupo; dapat naka-on ang opsyong **public roster** ng grupo
   - **Service Times** -- Ang iskedyul ng serbisyo ng iyong mga campus, awtomatikong kinukuha mula sa attendance setup
   - **Sermons** -- Ang sermon library mo, bilang buong browser o sa layout na grid, list, o featured-latest
   - **Location** -- Isang naka-embed na mapa na nakasentro sa address ng simbahan mo
   - **Table** -- Simpleng grid ng mga row at column para sa tabular na nilalaman
   - **Text with Photo** -- Teksto at larawan na magkatabi
   - **Logo** -- Ang logo ng simbahan mo, kinukuha mula sa [Appearance](./appearance.md)
   - **Stream** -- Ang iyong live stream player, naka-embed nang direkta sa pahina
   - **Podcast** -- Listahan ng mga episode na kinukuha mula sa external na podcast RSS feed URL na ibibigay mo, may mga setting para sa dami ng episode na ipapakita at kung ipapakita ang mga petsa at paglalarawan. Ang bawat episode sa live site ay may audio player at link na **Download** na nagse-save ng audio file ng episode sa ilalim ng pamagat ng episode. Ito ay para sa pagtatampok ng anumang podcast feed sa iyong site; para mag-publish ng sarili mong mga sermon bilang podcast, tingnan ang [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) sa halip.
   - **Donation** -- Isang buong giving form na naka-embed sa pahina
   - **Donate Link** -- Isang button na nagbubukas ng giving page mo
   - **HTML** -- Sarili mong raw HTML, para sa mga advanced na gamit gaya ng pag-embed ng third-party widget (tingnan ang [Using the HTML element](#using-the-html-element))
   - **Embedded Page** -- Mag-embed ng ibang web page sa pamamagitan ng URL sa isang frame
3. I-configure ang elemento gamit ang panel ng settings na lumilitaw.

### Paggamit ng HTML Element {#using-the-html-element}

May dalawang kahon ang elementong **HTML**:

- **HTML Content** -- Ang markup na ipapakita sa pahina. Anumang `<script>` tag na isasama mo rito ay tatakbo sa live mong site.
- **JavaScript (exclude script tag)** -- Script code na tatakbo kapag nag-load ang pahina. Maaari mo ring i-paste dito ang embed snippet ng isang vendor kasama ang mga `<script>` tag nito, at tatakbo ito sa live site.

Kung ipi-paste mo lamang ang isang web address (gaya ng link ng larawan) sa kahon ng JavaScript, magiging pula ang kahon na may babalang *"This is a web address, not JavaScript."* Walang gagawin ang nag-iisang address sa kahong iyon. Para magpakita ng larawan, gumamit ng elementong **Image** o ilagay ang `<img src="...">` sa **HTML Content**.

### Paggamit ng Calendar Element {#using-the-calendar-element}

Ipinapakita ng elementong **Calendar** ang mga event mula sa isa sa iyong mga calendar:

1. Sa ilalim ng **Select**, piliin ang **Group Calendar** (mga event ng isang grupo -- nakalista ang mga grupong kinabibilangan mo) o **Curated Calendar** (isang calendar na ginawa mo sa ilalim ng **Calendars**; tingnan ang [Curated Calendar](../calendars/curated-calendar.md)).
2. Sa ilalim ng **Select Calendar**, piliin ang grupo o calendar.
3. Sa ilalim ng **Display**, piliin kung paano ito ipapakita:
   - **Month calendar** -- Isang month grid na maaaring i-browse ng mga bisita. Bawat event ay may kulay ayon sa grupong kinabibilangan nito, kaya pareho ang kulay ng mga event ng isang grupo sa bawat calendar. Awtomatikong pumipili ang B1 ng mga kulay; walang kailangang i-set up.
   - **Upcoming events** -- Isang grid ng mga tile para sa susunod na 12 paparating na event, kung saan ang paulit-ulit na event ay ipinapakita nang isang beses sa susunod nitong petsa. Ipinapakita ng bawat tile ang larawan ng event (o ang pamagat nito sa madilim na kulay ng theme mo kapag walang larawan), date badge, araw at oras, at unang linya ng paglalarawan. Pinapayagan ng button na **Subscribe** sa itaas ng mga tile ang mga bisitang kopyahin ang ICS link ng calendar o i-download ito. May setting na **Layout** para sa display na ito: **Grid** (ang default) o **Scrolling (automatic)**, na naglalagay ng mga tile sa iisang row na kusang gumagalaw (tingnan ang [Scrolling layouts](#scrolling-layouts)). Para sa **Curated Calendar**, i-on ang setting na **Group badge** para ipakita ang pangalan ng grupo ng bawat event sa kanang-itaas na sulok ng tile nito, sa kulay ng calendar ng grupong iyon. Walang badge ang mga event mula sa archived o confidential na grupo.
4. Para magpakita lamang ng ilang event, mag-type ng tag sa **Only events tagged** -- halimbawa, `youth`. Tanging ang mga event na may salitang iyon sa **Tags** ang lalabas. Iwanang blangko para ipakita ang bawat event. Itinatakda ang mga tag sa bawat event; tingnan ang [Adding and Editing Events](../calendars/creating-calendars.md#adding-and-editing-events).

Sa alinmang display, ang pag-click sa isang event ay nagbubukas ng sarili nitong pahina sa iyong website. Ipinapakita ng pahina ng event ang larawan, pamagat, petsa at oras, at paglalarawan ng event, kasama ang kahon na may **When** (kasama ang repeat pattern para sa paulit-ulit na event) at **Where** (ang mga kuwartong naka-book para dito). May button din itong **Register for this Event** kapag naka-on ang registration, at link na **Add to my calendar** na nagda-download ng event bilang calendar file. Nakaayos ang pahina para maipakita ng mga search engine ang petsa at detalye ng event sa kanilang mga resulta. Kasama rin sa sitemap ng iyong site ang mga pahina ng event mula sa curated calendar na ipinapakita sa iyong mga pahina (para sa mga event sa susunod na anim na buwan), para mahanap sila ng mga search engine.

### Scrolling Layouts {#scrolling-layouts}

Inilalagay ng layout na **Scrolling (automatic)** sa **Groups Browser**, **Group List**, at sa display na **Upcoming events** ng Calendar element ang mga tile sa iisang row sa halip na grid. Sa telepono, pinupuno ng bawat tile ang row; sa computer, dalawang tile ang kasya nang magkatabi. Kapag higit sa kasya ang mga tile, ang row ay:

- Umuusad ng isang tile kada humigit-kumulang apat na segundo, at bumabalik sa unang tile pagkatapos ng huli.
- Humihinto habang nag-hover, humahawak, o tina-tab ng bisita ito, at muling nagpapatuloy pagkalipas ng ilang segundo.
- Nagpapakita ng hilera ng tuldok sa ibaba, isa para sa bawat tile, na pinupuno ang tuldok ng kasalukuyang tile. Maaaring i-click ng mga bisita ang tuldok para tumalon sa tile na iyon.

Sa mga device na naka-set sa reduce motion, nananatiling tahimik ang row at sila mismo ang nagsa-swipe o nag-i-scroll dito. Kapag kasya ang lahat ng tile, hindi gumagalaw ang row at walang lumalabas na tuldok.

### Pag-aayos Muli ng Nilalaman {#reordering-content}

I-drag ang mga seksyon o elemento gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item para ayusin ang mga ito. Maaari mong i-drag ang mga elemento sa loob ng isang seksyon o ilipat ang mga ito sa pagitan ng mga seksyon.

## Pag-istilo ng Iyong Pahina {#styling-your-page}

### Mga Istilo ng Seksyon {#section-styles}

I-click ang alinmang seksyon para buksan ang panel ng istilo nito. Maaari mong itakda ang:

- **Colors** -- Sa tab na **Suggested**, i-click ang isa sa mga kumbinasyon ng kulay mula sa iyong palette. Sa tab na **Custom**, itakda ang **Background Type** (**Color**, **Image**, o **YouTube Video**) at ang kulay ng heading, teksto, at link. Kapag may image background, i-click ang larawan para itakda ang focal point nito (ang bahaging nananatiling nakikita kapag na-crop ang larawan), at gamitin ang **Overlay Color** at **Background Opacity** para bahagyang kulayan ang larawan para mabasa pa rin ang teksto.
- **Visibility** -- **Hide on desktop** o **Hide on mobile**
- **Styles** -- Magdagdag ng indibidwal na style setting, gaya ng top at bottom padding, para sa lahat ng device, desktop lamang, o mobile lamang
- **Animations** -- Isang effect at bilis para sa pagpasok ng seksyon sa view habang nag-i-scroll
- **Shape Dividers** -- Mga pandekorasyong hugis (wave, waves, slant, curve, peaks, at triangle) sa itaas o ibabang gilid ng seksyon, na may kulay, taas, at mga opsyon sa flip

May mga button na **Duplicate** at **Convert To Block** ang mga setting ng seksyon, na kumokopya sa seksyon sa isang bagong [reusable block](./blocks.md).

### Mga Istilo ng Elemento {#element-styles}

I-click ang alinmang elemento para buksan ang panel ng istilo nito. Kabilang sa mga karaniwang opsyon ang laki ng font, kulay, alignment, margin, at padding. Para sa mga larawan, maaari mong itakda ang alt text at mga target ng link.

### Mga Istilo para sa Isang Seksyon o Elemento {#styles-for-one-section-or-element}

Para sa mas pinong kontrol, buksan ang panel na **Styles** sa mga setting ng seksyon o elemento at i-click ang **Add a style** sa ilalim ng **All**, **Desktop Only**, o **Mobile Only**. Nalalapat ang bawat istilo sa seksyon o elementong iyon lamang, kaya hindi nito maaapektuhan ang iba pang bahagi ng pahina.

:::tip
Kung kailangan mong maglapat ng istilo sa buong site mo -- gaya ng custom na font o pandaigdigang kulay -- gamitin ang mga setting ng [Appearance](./appearance.md) sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Iyong Pahina {#previewing-your-page}

Gamitin ang mga kontrol ng preview sa toolbar para tingnan kung paano lumilitaw ang iyong pahina sa iba't ibang laki ng screen:

- **Desktop** -- Full-width na view ng browser
- **Mobile** -- Makitid na view na sukat ng telepono

Sa mga telepono, nagsasalansan nang patong-patong ang mga column sa isang row sa buong lapad, maliban kung magtatakda ka ng **Mobile Width** para sa mga ito sa mga setting ng row. Nagsasalansan din sa telepono ang teksto ng bawat episode sa ilalim ng thumbnail nito sa mga listahan ng sermon at podcast.

Para makita ang live na pahina nang eksakto gaya ng makikita ng mga bisita, bumalik sa listahan ng Pages at i-click ang path ng pahina. Magbubukas ito sa bagong browser tab.

## Pagsuri sa Accessibility {#checking-accessibility}

I-click ang icon na **Check accessibility** sa toolbar (nagpapakita ito ng bilang kapag may natuklasang isyu) para magpatakbo ng mabilisang pagsusuri sa mga karaniwang problema -- mga larawang walang alt text, mababang contrast ng kulay, o mga heading na wala sa ayos. Bawat isyu ay direktang nagli-link sa elementong nangangailangan ng pansin para maayos mo ito sa mismong lugar.

## Pag-undo ng Mga Pagbabago {#undoing-changes}

Sinusubaybayan ng editor ang kasaysayan ng pag-edit mo nang awtomatiko. Gamitin ang mga button sa toolbar o mga keyboard shortcut para mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang huling aksyon mo
- **Redo** (Ctrl+Shift+Z o Ctrl+Y / Cmd+Shift+Z) -- Muling ilapat ang aksyong na-undo

Maaari ka ring tumalon sa mas naunang punto. Buksan ang menu na **More** (⋮) sa toolbar at i-click ang **View history**. Inililista ng dialog na **Edit History** ang bawat pagbabago kasama ang oras nito, at minamarkahan ang kasalukuyang punto bilang **(current)**. I-click ang isang entry (o ang button nitong **Restore to this point**) para ibalik ang pahina sa kung ano ito noong puntong iyon.

:::info
Nananatili sa kasaysayan ang mga pagbabagong ginawa pagkatapos ng punto na ibinalik mo, kaya maaari mong gamitin ang **Redo** o pumili ng mas huling entry para sumulong muli. Kapag gumawa ka ng bagong pag-edit, papalitan ito ng mga huling entry na iyon.
:::

## Pag-save at Pag-publish {#saving-and-publishing}

Awtomatikong nase-save ang mga pagbabago habang nagtatrabaho ka. Ipinapakita ng status indicator sa toolbar kung na-save na ang mga pagbabago mo.

### Estado ng draft at published {#draft-and-published-state}

Maaaring magkaroon ng estadong **published** ang mga pahina, na kumokontrol kung kailan makikita ng mga bisita ang mga pagbabago mo. Ipinapakita ng toolbar ang status chip na nagpapakita ng kasalukuyang estado:

- **Live on save** -- Hindi gumagamit ng publish workflow ang pahina. Bawat na-save na pagbabago ay agad na nagiging live. Ito ang default para sa mga bagong pahina.
- **Unpublished changes** -- Na-publish na dati ang pahina, pero may mga pagbabago ka mula noong huling publish. Nakikita pa rin ng mga bisita ang dating na-publish na bersyon.
- **Published** -- Live ang pahina at tumutugma ang na-save mong nilalaman sa nakikita ng mga bisita.

Para i-publish ang mga pagbabago mo, i-click ang button na **Publish** sa toolbar. Agad na nagiging live ang pahina.

Para bumalik sa huling na-publish na bersyon nang hindi naaapektuhan ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard unpublished changes**.

Para ihinto ang paggamit ng publish workflow, buksan ang overflow menu at i-click ang **Turn off publishing**. Pagkatapos nito, agad nang nagiging live ang mga pag-edit.

:::tip
Gamitin ang draft/publish workflow kapag gusto mong ihanda ang isang pahina -- halimbawa, para sa paparating na event -- at gawin lamang itong live sa tamang sandali. Buuin at i-preview ang pahina, pagkatapos i-click ang Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Managing Pages](./managing-pages.md) -- Gumawa ng mga pahina, magtakda ng URL, at mamahala ng navigation ng site
- [Appearance](./appearance.md) -- Itakda ang mga kulay, font, at branding sa buong site
- [Files](./files.md) -- Mag-upload ng mga larawan at dokumentong gagamitin sa editor
- [Creating Forms](../forms/creating-forms.md) -- Gumawa ng mga form na maaari mong i-embed sa mga pahina
