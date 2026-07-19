---
title: "Paggamit ng Page Editor"
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang B1 page editor ay isang visual drag-and-drop builder na nagbibigay-daan sa iyo na magdisenyo ng mga pahina ng website ng iyong simbahan nang walang pagsusulat ng anumang code. Maaari kang magdagdag ng mga section at content block, i-customize ang mga estilo, suriin ang iyong ginagawa, at bawiin ang mga pagbabago -- lahat mula sa loob ng iyong browser.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) upang maayos ang iyong website
- Lumikha ng kahit isang pahina sa [Managing Pages](managing-pages)
- Kailangan mo ng **content.edit** permission upang makuha ang access sa editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, i-click ang **Website** sa kaliwang menu.
2. Hanapin ang pahina na gustong i-edit sa Pages table at i-click ang **Edit**.

Ang editor ay bubuksan sa full-screen mode. Ang kaliwang panel ay nagpapakita ng iyong page structure at available na content element; ang center area ay nagpapakita ng live preview ng iyong pahina.

:::info
Ang editor ay laging nagpapakita sa light mode, anuman ang iyong B1 Admin theme setting. Tinitiyak nito na ang preview ay tumutugma nang eksakto kung paano makikita ng mga bisita sa website ang iyong pahina.
:::

## Page Structure: Sections at Elements

Bawat pahina ay binuo mula sa dalawang level:

- **Sections** -- Ang top-level na mga container na naghahati ng iyong pahina sa horizontal band (halimbawa, isang hero section, isang content block, o isang footer strip). Bawat pahina ay dapat may kahit isang section bago maaari kang magdagdag ng content.
- **Elements** -- Ang indibidwal na content piece na inilagay sa loob ng section, tulad ng text, mga larawan, button, card, form, at mga calendar.

### Pagdagdag ng Section

1. I-click ang **Add Section** (o ang **+** button sa tuktok ng kaliwang panel).
2. Pumili kung paano magsisimula:
   - **From a template** — tuklasin ang section template gallery na inorganisa ayon sa kategorya (Hero, About, Services, Giving, atbp.) at i-click ang isa upang isaksak ito bilang fully styled, pre-filled section. Maaari mong i-customize ang lahat pagkatapos itong idinagdag.
   - **Blank section** — pumili ng column layout (single, dalawang column, tatlong column, atbp.) at bumuo mula sa simula.
3. Ang bagong section ay lumilitaw sa preview. I-click ito upang piliin ito at i-configure ang background color, padding, at iba pang style option.

### Pagdagdag ng Elements sa Section

1. I-click sa loob ng section sa preview upang piliin ito.
2. I-click ang **Add Content** at pumili ng element type mula sa listahan:
   - **Text** -- Mga heading, paragraph, at rich text
   - **Image** -- Mag-upload o mag-link sa isang larawan
   - **Button** -- Isang clickable call-to-action link
   - **Card** -- Isang larawan na may title at description
   - **Form** -- I-embed ang isang [form](../forms/creating-forms) direkta sa pahina
   - **Calendar** -- Ipakita ang isang event calendar
   - **FAQ** -- Accordion-style na tanong at sagot block
   - **Video** -- I-embed ang isang video sa pamamagitan ng URL
   - **Groups Browser** -- Isang filterable directory ng lahat ng church group na may optional search, category filter, at label filter
   - **Icon Feature** -- Isang icon na may title at maikling description, para sa feature o ministry highlight
   - **Gallery** -- Isang multi-photo grid o masonry layout
   - **Testimonial** -- Isa o higit pang mga quote na may author name, role, at larawan
   - **Social Icons** -- Mga naka-link na icon para sa social media profile ng iyong simbahan
   - **Countdown** -- Isang timer na sumusubok ng oras hanggang sa isang date o isang minumang service time
   - **Stats** -- Isang hanay ng malalaking numero na may mga label (member, taon, campus)
   - **Campaign Progress** -- Isang live progress bar para sa isang giving campaign, na nagpapakita ng kabuuang nakolekta patungo sa isang fund goal
   - **Staff Grid** -- Mga photo card para sa mga miyembro ng isang grupo; ang grupo ay dapat may **public roster** option na naka-on
   - **Service Times** -- Ang schedule ng serbisyo ng iyong campus, na awtomatikong kinukuha mula sa attendance setup
   - **Sermons** -- Ang iyong sermon library, bilang isang full browser o isang grid, list, o featured-latest layout
3. I-configure ang element gamit ang settings panel na lumilitaw.

### Pag-reorder ng Content

I-drag ang mga section o element gamit ang handle icon (anim na tuldok) sa kaliwang gilid ng bawat item upang i-reorder ang mga ito. Maaari mong i-drag ang mga element sa loob ng section o ilipat ang mga ito sa pagitan ng mga section.

## Pag-style ng Iyong Pahina

### Section Style

I-click ang anumang section upang buksan ang style panel. Maaari mong itakda ang:

- **Background** -- Solid color, gradient, o larawan. Kapag gumagamit ng isang larawan na background, ang isang **Focal Point** picker ay nagbibigay-daan sa iyo na mag-click upang itakda kung aling bahagi ng larawan ang nanatiling nakasentro habang nag-scale ang section, at ang isang **Overlay** color option ay nagbibigay-daan sa iyo na magdagdag ng isang semi-transparent tint sa larawan upang mapabuti ang text legibility.
- **Padding** -- Itaas at ibaba ang spacing sa loob ng section
- **Width** -- Full-width o centered/contained
- **Divider** -- Mga dekoratibong shape divider (wave, slant, curve, triangle, at marami pang iba) sa itaas o ibaba ng edge ng section, na may color, height, at flip option

### Element Style

I-click ang anumang element upang buksan ang style panel. Ang karaniwang option ay kinabibilangan ng font size, color, alignment, margin, at padding. Para sa mga larawan, maaari mong itakda ang alt text at link target.

### Custom CSS

Para sa advanced styling, bawat section at element ay may **Custom CSS** field kung saan maaari kang magsulat ng iyong sariling CSS rule. Ang mga ito ay nakabalot sa elemento na iyon, kaya hindi nila hindi sinasadyang makakaapekto sa natitirang bahagi ng pahina.

:::tip
Kung kailangan mong mag-apply ng mga estilo sa buong site -- tulad ng custom font o global color -- gamitin ang [Appearance](appearance) setting sa halip na custom CSS sa indibidwal na mga pahina.
:::

## Sinusuri ang Iyong Pahina

Gamitin ang preview control sa toolbar upang suriin kung paano ang iyong pahina ay nagmukhang sa iba't ibang screen size:

- **Desktop** -- Full-width browser view
- **Mobile** -- Narrow phone-sized view

I-click ang **Preview** upang buksan ang isang live version ng pahina sa isang bagong browser tab, eksakto tulad ng makikita ng mga bisita.

## Pag-undo ng Pagbabago

Ang editor ay sinusubaybayan ang iyong editing history nang awtomatiko. Gamitin ang toolbar button o keyboard shortcut upang mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Bawiin ang iyong huling aksyon
- **Redo** (Ctrl+Y / Cmd+Y) -- I-re-apply ang isang undo action

Maaari mo rin ibalik ang pahina sa isang mas maaga na snapshot. I-click ang **History** sa toolbar upang makita ang isang listahan ng mga naka-save na snapshot na may mga description, at i-click ang anumang entry upang ibalik sa puntong iyon.

:::warning
Ang pag-restore ng isang snapshot ay pinalitan ang iyong kasalukuyang page content ng snapshot version. Hindi ito maaaring bawiin gamit ang standard undo button. Magsave ng snapshot ng iyong kasalukuyang estado bago mag-restore ng isang lumang bago kung gusto mong manatiling may opsyon upang bumalik.
:::

## Pag-save at Pag-publish

Ang mga pagbabago ay awtomatikong nasasave habang nagtatrabaho ka. Ang isang status indicator sa toolbar ay nagpapakita kung ang iyong mga pagbabago ay nasave na.

### Draft at published state

Ang mga pahina ay maaaring may **published** state, na kumokontrol sa kung kailan makikita ng mga bisita ang iyong mga pagbabago. Ang toolbar ay nagpapakita ng isang status chip na nagpapakita ng kasalukuyang estado:

- **Live on Save** -- Ang pahina ay hindi gumagamit ng publish workflow. Bawat naka-save na pagbabago ay direktang nagiging live. Ito ang default para sa bagong pahina.
- **Unpublished Changes** -- Ang pahina ay nai-publish na dati, ngunit gumawa ka ng mga pagbabago mula sa huling publish. Ang mga bisita ay nakikita pa rin ang nakaraang nai-publish na bersyon.
- **Published** -- Ang pahina ay live at ang iyong naka-save na content ay tumutugma sa iyong makikita ng mga bisita.

Upang i-publish ang iyong mga pagbabago, i-click ang **Publish** button sa toolbar. Ang pahina ay direktang nagiging live.

Upang bumalik sa huling nai-publish na bersyon nang hindi nakakaapekto sa makikita ng mga bisita, buksan ang overflow menu (⋮) at i-click ang **Discard Changes**.

Upang dalhin ang isang pahina offline nang lubusan, buksan ang overflow menu at i-click ang **Unpublish**. Ang mga bisita ay hindi na makikita ang pahinang iyon hanggang sa i-publish mo ito muli.

:::tip
Gamitin ang draft/publish workflow kapag nais mong maghanda ng isang pahina -- halimbawa, para sa isang darating na kaganapan -- at gawing live lamang ito sa tamang sandali. Bumuo at suriin ang pahina, at pagkatapos i-click ang Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo

- [Managing Pages](managing-pages) -- Lumikha ng mga pahina, itakda ang mga URL, at pamahalaan ang site navigation
- [Appearance](appearance) -- Itakda ang site-wide na mga kulay, font, at branding
- [Files](files) -- Mag-upload ng mga larawan at dokumento upang gamitin sa editor
- [Creating Forms](../forms/creating-forms) -- Bumuo ng mga form na maaari mong i-embed sa mga pahina
