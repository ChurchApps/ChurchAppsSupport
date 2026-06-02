---
title: "Paggamit ng Page Editor"
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang B1 page editor ay isang visual drag-and-drop builder na nagbibigay-daan sa inyo na i-disenyo ang inyong mga pahina ng website ng parokya nang hindi nagsusulat ng anumang code. Maaari kayong magdagdag ng mga section at content blocks, i-customize ang mga style, i-preview ang inyong trabaho, at i-undo ang mga pagbabago -- lahat mula sa loob ng inyong browser.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kumpletuhin ang [Initial Setup](initial-setup) upang makakonfigure ng inyong website
- Lumikha ng hindi bababa sa isang pahina sa [Managing Pages](managing-pages)
- Kailangan ninyo ng **content.edit** permission upang ma-access ang editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, i-click ang **Website** sa kaliwang menu.
2. Hanapin ang pahina na gusto ninyong baguhin sa Pages table at i-click ang **Edit**.

Ang editor ay bumubukas sa full-screen mode. Ang kaliwang panel ay nagpapakita ng inyong page structure at available content elements; ang center area ay nagpapakita ng isang live preview ng inyong pahina.

:::info
Ang editor ay palaging nagpapakita sa light mode, anuman ang inyong B1 Admin theme setting. Ito ay sinisiguro na ang preview ay tumpak na tumutugma sa paano ang inyong pahina ay magmumukhang sa mga bisita ng website.
:::

## Page Structure: Sections at Elements

Bawat pahina ay itinayo mula sa dalawang antas:

- **Sections** -- Ang top-level containers na naghahati ng inyong pahina sa horizontal bands (halimbawa, isang hero section, isang content block, o isang footer strip). Bawat pahina ay dapat magkaroon ng hindi bababa sa isang section bago kayo maaaring magdagdag ng nilalaman.
- **Elements** -- Ang mga indibidwal na piraso ng nilalaman na inilagay sa loob ng isang section, tulad ng teksto, mga larawan, mga button, mga card, mga form, at mga kalendaryo.

### Pagdagdag ng Section

1. I-click ang **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Pumili ng isang layout para sa inyong section -- ang mga opsyon ay kinabibilangan ng single column, dalawang kolumn, tatlong kolumn, at marami pa.
3. Ang bagong section ay lilitaw sa preview. I-click ito upang piliin ito at makakonfigure ng background color, padding, at ibang mga opsyon ng istilo.

### Pagdagdag ng Elements sa Section

1. I-click sa loob ng isang section sa preview upang piliin ito.
2. I-click ang **Add Content** at pumili ng isang uri ng elemento mula sa listahan:
   - **Text** -- Mga heading, paragraph, at rich text
   - **Image** -- I-upload o mag-link sa isang larawan
   - **Button** -- Isang clickable call-to-action link
   - **Card** -- Isang larawan na may pamagat at paglalarawan
   - **Form** -- I-embed ang isang [form](../forms/creating-forms) direkta sa pahina
   - **Calendar** -- Magpakita ng isang event calendar
   - **FAQ** -- Accordion-style question at answer blocks
   - **Video** -- I-embed ang isang video sa pamamagat ng URL
   - **Groups Browser** -- Isang filterable directory ng lahat ng mga grupo ng parokya na may opsyonal na search, category filter, at label filter
3. Makakonfigure ng elemento gamit ang settings panel na lilitaw.

### Pag-reorder ng Content

I-drag ang mga section o elemento gamit ang handle icon (anim na dots) sa kaliwang bahagi ng bawat item upang i-reorder ang mga ito. Maaari ninyong i-drag ang mga elemento sa loob ng isang section o ilipat ang mga ito sa pagitan ng mga section.

## Pag-style ng Inyong Pahina

### Section Styles

I-click ang anumang section upang buksan ang style panel. Maaari ninyong itakda ang:

- **Background** -- Solid color, gradient, o larawan
- **Padding** -- Top at bottom spacing sa loob ng section
- **Width** -- Full-width o centered/contained

### Element Styles

I-click ang anumang elemento upang buksan ang style panel. Ang mga karaniwang opsyon ay kinabibilangan ng font size, kulay, alignment, margin, at padding. Para sa mga larawan, maaari ninyong itakda ang alt text at link targets.

### Custom CSS

Para sa advanced styling, bawat section at elemento ay may **Custom CSS** field kung saan maaari kayong magsulat ng inyong mga CSS rules. Ang mga ito ay naka-scope sa elemento na iyon, kaya hindi sila hindi dapat makaapekto sa natitirang bahagi ng pahina.

:::tip
Kung kailangan ninyong ilapat ang mga istilo sa buong inyong site -- tulad ng isang customized font o global color -- gamitin ang [Appearance](appearance) settings sa halip na custom CSS sa mga indibidwal na pahina.
:::

## Pag-preview ng Inyong Pahina

Gamitin ang preview controls sa toolbar upang suriin kung paano ang inyong pahina ay magmumukhang sa iba't ibang screen sizes:

- **Desktop** -- Full-width browser view
- **Mobile** -- Narrow phone-sized view

I-click ang **Preview** upang buksan ang isang live version ng pahina sa isang bagong browser tab, eksakto kung paano ito makikita ng mga bisita.

## Pag-undo ng Mga Pagbabago

Ang editor ay awtomatikong sinusubaybayan ang inyong editing history. Gamitin ang toolbar buttons o keyboard shortcuts upang mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Ibalik ang inyong huling aksyon
- **Redo** (Ctrl+Y / Cmd+Y) -- I-apply muli ang isang undone action

Maaari din ninyong ibalik ang pahina sa isang mas lumang snapshot. I-click ang **History** sa toolbar upang makita ang isang listahan ng mga nakaimbak na snapshots na may mga paglalarawan, at i-click ang anumang entry upang ibalik sa puntong iyon.

:::warning
Ang pag-restore ng isang snapshot ay nagsasalin ng inyong kasalukuyang nilalaman ng pahina gamit ang snapshot version. Ito ay hindi maaaring ma-undo gamit ang standard undo button. I-save ang isang snapshot ng inyong kasalukuyang estado bago mag-restore ng isang lumang kung gusto ninyong panatilihin ang opsyon na bumalik.
:::

## Pag-save ng Inyong Trabaho

Ang mga pagbabago ay awtomatikong nai-save habang kayo ay nagtatrabaho. Isang status indicator sa toolbar ay nagpapakita kung ang inyong mga pagbabago ay nai-save na. Maaari din ninyong i-click ang **Save** anumang oras upang pisilahin ang isang save.

## Related Articles

- [Managing Pages](managing-pages) -- Lumikha ng mga pahina, itakda ang URLs, at pamahalaan ang navigation ng site
- [Appearance](appearance) -- Itakda ang site-wide na mga kulay, fonts, at branding
- [Files](files) -- I-upload ang mga larawan at dokumento upang gamitin sa editor
- [Creating Forms](../forms/creating-forms) -- Bumuo ng mga form na maaari ninyong i-embed sa mga pahina
