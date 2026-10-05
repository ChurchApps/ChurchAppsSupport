---
title: "Paggamit ng Page Editor"
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang B1 page editor ay isang visual na drag-and-drop builder na nagbibigay-daan sa iyong magdisenyo ng mga pahina ng website ng inyong simbahan nang hindi nagsusulat ng anumang code. Maaari kang magdagdag ng mga section at content block, mag-customize ng mga style, mag-preview ng iyong gawa, at mag-undo ng mga pagbabago -- lahat sa loob ng iyong browser.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) para ma-configure ang iyong website
- Gumawa ng kahit isang pahina sa [Pamamahala ng mga Pahina](managing-pages)
- Kailangan mo ng **content.edit** na pahintulot para magamit ang editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Website**, at i-click ang **Pages**.
2. Hanapin ang pahinang gusto mong i-edit sa Pages table at i-click ang **Edit**.

Bubukas ang editor sa full-screen mode. Ipinapakita ng kaliwang panel ang istruktura ng iyong pahina at ang mga available na content element; ipinapakita naman ng gitnang bahagi ang live preview ng iyong pahina.

:::info
Palaging ipinapakita ang editor sa light mode, anuman ang theme setting ng iyong B1 Admin. Tinitiyak nito na eksaktong tumutugma ang preview sa magiging itsura ng iyong pahina sa mga bisita ng website.
:::

## Istruktura ng Pahina: mga Section at Element

Ang bawat pahina ay binubuo ng dalawang antas:

- **Sections** -- Ang mga top-level na lalagyan na naghahati sa iyong pahina sa mga pahalang na banda (halimbawa, isang hero section, isang content block, o isang footer strip). Bawat pahina ay dapat may kahit isang section bago ka makapagdagdag ng nilalaman.
- **Elements** -- Ang mga indibidwal na piraso ng nilalaman na inilalagay sa loob ng isang section, tulad ng text, mga larawan, button, card, form, at calendar.

### Pagdaragdag ng Section

1. I-click ang **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Pumili kung paano magsisimula:
   - **Mula sa template** — mag-browse sa section template gallery na nakaayos ayon sa kategorya (Hero, About, Services, Giving, atbp.) at mag-click ng isa para ipasok ito bilang ganap na naka-style at may laman nang section. Maaari mong i-customize ang lahat pagkatapos itong maidagdag.
   - **Blank section** — pumili ng column layout (isa, dalawang column, tatlong column, atbp.) at bumuo mula sa simula.
3. Lalabas ang bagong section sa preview. I-click ito para piliin at i-configure ang background color, padding, at iba pang opsyon sa style nito.

### Pagpapalit ng Layout ng Section

Nakabuo mo na ba ang isang section pero gusto mo ng ibang istruktura? Gamitin ang layout switcher sa section na iyon para palitan ang ayos ng mga column nito ng iba mula sa gallery habang nananatili sa lugar ang iyong kasalukuyang nilalaman at mga element.

### Pagdaragdag ng mga Element sa Section

1. Mag-click sa loob ng isang section sa preview para piliin ito.
2. I-click ang **Add Content** at pumili ng uri ng element mula sa listahan:
   - **Text** -- Mga heading, talata, at rich text
   - **Image** -- Mag-upload o mag-link ng larawan
   - **Button** -- Isang link na call-to-action na maaaring i-click
   - **Card** -- Isang larawan na may pamagat at paglalarawan
   - **Form** -- Mag-embed ng [form](../forms/creating-forms) direkta sa pahina
   - **Calendar** -- Magpakita ng event calendar
   - **FAQ** -- Mga block ng tanong at sagot na accordion-style
   - **Video** -- Mag-embed ng video gamit ang URL
   - **Groups Browser** -- Isang directory ng lahat ng grupo ng simbahan na maaaring i-filter, na may opsyonal na search, category filter, at label filter
   - **Icon Feature** -- Isang icon na may pamagat at maikling paglalarawan, para sa mga tampok o ministeryo
   - **Gallery** -- Isang multi-photo na grid o masonry layout
   - **Testimonial** -- Isa o higit pang sipi na may pangalan ng may-akda, tungkulin, at larawan
   - **Social Icons** -- Mga naka-link na icon para sa mga social media profile ng inyong simbahan
   - **Countdown** -- Isang timer na nagbibilang pababa papunta sa isang petsa o lingguhang oras ng serbisyo
   - **Stats** -- Isang hanay ng malalaking numero na may mga label (mga miyembro, taon, mga campus)
   - **Campaign Progress** -- Isang live na progress bar para sa isang giving campaign, na nagpapakita ng kabuuang nalikom para sa layunin ng pondo
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang grupo; dapat naka-on ang **public roster** na opsyon ng grupo
   - **Service Times** -- Ang iskedyul ng serbisyo ng iyong mga campus, awtomatikong kinukuha mula sa attendance setup
   - **Sermons** -- Ang iyong sermon library, bilang buong browser o bilang grid, list, o featured-latest na layout
   - **Map** -- Isang naka-embed na mapa na nakasentro sa address ng inyong simbahan
   - **Table** -- Isang simpleng grid ng mga row at column para sa tabular na nilalaman
   - **Text with Photo** -- Text at larawan na magkatabi
   - **Logo** -- Ang logo ng inyong simbahan, kinukuha mula sa [Appearance](appearance)
   - **Live Stream** -- Ang iyong live stream player, naka-embed direkta sa pahina
   - **Podcast** -- Isang listahan ng mga episode na kinukuha mula sa isang external na podcast RSS feed URL na ibibigay mo, na may mga setting kung ilang episode ang ipapakita at kung ipapakita ang mga petsa at paglalarawan. Para ito sa pagtatampok ng anumang podcast feed sa iyong site; para i-publish ang sarili mong mga sermon bilang podcast, tingnan na lamang ang [Pamamahala ng mga Sermon](../sermons/managing-sermons.md#your-podcast-feed).
   - **Donation** -- Isang giving button o naka-embed na donation form
   - **Raw HTML** -- Custom na HTML markup para sa mga advanced na gamit
   - **iFrame** -- Mag-embed ng external na nilalaman gamit ang URL
3. I-configure ang element gamit ang settings panel na lalabas.

### Pagbabago ng Ayos ng Nilalaman

I-drag ang mga section o element gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item para baguhin ang ayos ng mga ito. Maaari mong i-drag ang mga element sa loob ng isang section o ilipat ang mga ito sa pagitan ng mga section.

## Pag-istilo ng Iyong Pahina

### Mga Style ng Section

I-click ang anumang section para buksan ang style panel nito. Maaari mong itakda ang:

- **Background** -- Solid na kulay, gradient, o larawan. Kapag larawan ang gamit na background, hinahayaan ka ng **Focal Point** picker na mag-click para itakda kung aling bahagi ng larawan ang mananatiling nasa gitna habang nagbabago ang laki ng section, at nagbibigay-daan ang **Overlay** color na opsyon na magdagdag ng semi-transparent na tint sa ibabaw ng larawan para mas madaling mabasa ang text.
- **Padding** -- Espasyo sa itaas at ibaba sa loob ng section
- **Width** -- Full-width o nakasentro/naka-contain
- **Dividers** -- Mga pandekorasyong shape divider (wave, slant, curve, triangle, at iba pa) sa itaas o ibabang gilid ng section, na may mga opsyon sa kulay, taas, at flip

### Mga Style ng Element

I-click ang anumang element para buksan ang style panel nito. Kabilang sa mga karaniwang opsyon ang font size, kulay, alignment, margin, at padding. Para sa mga larawan, maaari kang magtakda ng alt text at mga link target.

### Custom CSS

Para sa advanced na pag-istilo, bawat section at element ay may **Custom CSS** na field kung saan maaari kang magsulat ng sarili mong mga CSS rule. Naka-scope ang mga ito sa element na iyon, kaya hindi nila sinasadyang maaapektuhan ang natitirang bahagi ng pahina.

:::tip
Kung kailangan mong mag-apply ng mga style sa buong site mo -- tulad ng custom na font o global na kulay -- gamitin na lang ang mga setting ng [Appearance](appearance) sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Iyong Pahina

Gamitin ang mga preview control sa toolbar para tingnan kung ano ang itsura ng iyong pahina sa iba't ibang laki ng screen:

- **Desktop** -- Full-width na view ng browser
- **Mobile** -- Makitid na view na kasinlaki ng telepono

I-click ang **Preview** para magbukas ng live na bersyon ng pahina sa bagong browser tab, eksakto kung paano ito makikita ng mga bisita.

## Pagsusuri ng Accessibility

I-click ang **Accessibility** icon sa toolbar para magpatakbo ng mabilis na pagsusuri para sa mga karaniwang isyu -- mga larawang walang alt text, mababang color contrast, o mga heading na hindi maayos ang pagkakasunod-sunod. Ang bawat isyu ay direktang may link sa elementong kailangang ayusin para maayos mo ito mismo sa lugar.

## Pag-undo ng mga Pagbabago

Awtomatikong sinusubaybayan ng editor ang iyong kasaysayan ng pag-edit. Gamitin ang mga button sa toolbar o mga keyboard shortcut para mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang huli mong ginawa
- **Redo** (Ctrl+Y / Cmd+Y) -- I-apply muli ang isang na-undo na aksyon

Maaari mo ring ibalik ang pahina sa naunang snapshot. I-click ang **History** sa toolbar para makita ang listahan ng mga na-save na snapshot na may mga paglalarawan, at i-click ang anumang entry para bumalik sa puntong iyon.

:::warning
Pinapalitan ng pagbabalik ng snapshot ang kasalukuyang nilalaman ng iyong pahina ng bersyon ng snapshot. Hindi ito maaaring i-undo gamit ang karaniwang undo button. Mag-save ng snapshot ng kasalukuyan mong estado bago magbalik sa luma kung gusto mong may pagkakataon ka pang bumalik.
:::

## Pag-save at Pag-publish

Awtomatikong sine-save ang mga pagbabago habang nagtatrabaho ka. Ipinapakita ng status indicator sa toolbar kung na-save na ang iyong mga pagbabago.

### Draft at published na estado

Ang mga pahina ay maaaring magkaroon ng **published** na estado, na kumokontrol kung kailan makikita ng mga bisita ang iyong mga pagbabago. Ipinapakita ng toolbar ang isang status chip na nagsasaad ng kasalukuyang estado:

- **Live on Save** -- Hindi gumagamit ng publish workflow ang pahina. Bawat na-save na pagbabago ay agad na nagiging live. Ito ang default para sa mga bagong pahina.
- **Unpublished Changes** -- Na-publish na dati ang pahina, ngunit may mga pagbabago kang ginawa mula noong huling publish. Nakikita pa rin ng mga bisita ang dating na-publish na bersyon.
- **Published** -- Live ang pahina at tumutugma ang na-save mong nilalaman sa nakikita ng mga bisita.

Para i-publish ang iyong mga pagbabago, i-click ang **Publish** na button sa toolbar. Agad na magiging live ang pahina.

Para bumalik sa huling na-publish na bersyon nang hindi naaapektuhan ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard Changes**.

Para tuluyang i-offline ang isang pahina, buksan ang overflow menu at i-click ang **Unpublish**. Hindi na makikita ng mga bisita ang pahinang iyon hanggang sa i-publish mo itong muli.

:::tip
Gamitin ang draft/publish workflow kapag gusto mong ihanda ang isang pahina -- halimbawa, para sa paparating na event -- at gawin lamang itong live sa tamang sandali. Buuin at i-preview ang pahina, pagkatapos ay i-click ang Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo

- [Pamamahala ng mga Pahina](managing-pages) -- Gumawa ng mga pahina, magtakda ng mga URL, at pamahalaan ang navigation ng site
- [Appearance](appearance) -- Magtakda ng mga kulay, font, at branding para sa buong site
- [Files](files) -- Mag-upload ng mga larawan at dokumento na gagamitin sa editor
- [Paggawa ng mga Form](../forms/creating-forms) -- Bumuo ng mga form na maaari mong i-embed sa mga pahina
