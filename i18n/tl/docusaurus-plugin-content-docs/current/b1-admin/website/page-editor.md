---
title: "Paggamit ng Page Editor"
---

# Paggamit ng Page Editor

<div class="article-intro">

Ang B1 page editor ay isang visual drag-and-drop na builder na nagbibigay-daan sa iyo na mag-design ng iyong mga pahina ng website ng simbahan nang hindi nagsusulat ng anumang code. Maaari kang magdagdag ng mga seksyon at content blocks, i-customize ang mga istilo, tingnan ang iyong gawa, at baguhin ang mga pagbabago -- lahat mula sa loob ng iyong browser.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Tapusin ang [Initial Setup](initial-setup) upang makuha ang iyong website na configured
- Lumikha ng hindi bababa sa isang pahina sa [Pagmamanage ng mga Pahina](managing-pages)
- Kailangan mo ng **content.edit** na pahintulot upang i-access ang editor

</div>

## Pagbubukas ng Editor

1. Sa B1 Admin, mag-click **Website** sa kaliwang menu.
2. Hanapin ang pahina na nais mong baguhin sa Mga Pahina na talahanayan at mag-click **Baguhin**.

Ang editor ay bumubukas sa full-screen mode. Ang kaliwang panel ay nagpapakita ng iyong page structure at available na content elements; ang center area ay nagpapakita ng live preview ng iyong pahina.

:::info
Ang editor ay palaging nagpapakita sa light mode, hindi alintana ang iyong B1 Admin theme setting. Ito ay nagsisiguro na ang preview ay tumpak na tumutugma sa kung paano makikita ang iyong pahina sa mga bisita ng website.
:::

## Page Structure: Mga Seksyon at Mga Elemento

Ang bawat pahina ay itinayo mula sa dalawang antas:

- **Mga Seksyon** -- Ang top-level containers na naghahati ng iyong pahina sa horizontal bands (halimbawa, isang hero section, isang content block, o isang footer strip). Ang bawat pahina ay dapat may hindi bababa sa isang seksyon bago ka maaaring magdagdag ng nilalaman.
- **Mga Elemento** -- Ang indibidwal na mga piece ng nilalaman na inilagay sa loob ng isang seksyon, tulad ng teksto, mga imahe, mga pindot, mga card, mga form, at mga kalendaryo.

### Pagdagdag ng isang Seksyon

1. Mag-click **Add Section** (o ang **+** button sa itaas ng kaliwang panel).
2. Pumili kung paano magsimula:
   - **Mula sa isang template** -- i-browse ang gallery ng section template na naka-organize ayon sa kategorya (Hero, Tungkol, Mga Serbisyo, Pagbibigay, atbp.) at mag-click ng isa upang isaksak ito bilang isang ganap na naka-style, pre-filled na seksyon. Maaari mong i-customize ang lahat pagkatapos itong idagdag.
   - **Blank section** -- pumili ng isang layout ng column (single, dalawang column, tatlong column, atbp.) at bumuo mula sa simula.
3. Ang bagong seksyon ay lumalabas sa preview. Mag-click nito upang piliin ito at i-configure ang kulay ng background, padding, at iba pang style options nito.

### Pagdagdag ng mga Elemento sa isang Seksyon

1. Mag-click sa loob ng isang seksyon sa preview upang piliin ito.
2. Mag-click **Add Content** at pumili ng uri ng elemento mula sa listahan:
   - **Teksto** -- Mga Heading, paragrapho, at rich text
   - **Imahe** -- Mag-upload o mag-link sa isang larawan
   - **Pindot** -- Isang clickable call-to-action na link
   - **Card** -- Isang imahe na may pamagat at paglalarawan
   - **Form** -- Mag-embed ng [form](../forms/creating-forms) direkta sa pahina
   - **Kalendaryo** -- Ipakita ang isang event calendar
   - **FAQ** -- Accordion-style na mga tanong at sagot blocks
   - **Video** -- Mag-embed ng isang video sa pamamagat ng URL
   - **Groups Browser** -- Isang filterable na directory ng lahat ng mga grupo ng simbahan na may optional na paghahanap, kategoryang filter, at label filter
3. I-configure ang elemento gamit ang settings panel na lumalabas.

### Pag-reorder ng Content

Drag sections o elements gamit ang handle icon (anim na tuldok) sa kaliwang bahagi ng bawat item upang i-reorder ang mga ito. Maaari mong i-drag ang mga elemento sa loob ng isang seksyon o ilipat ang mga ito sa pagitan ng mga seksyon.

## Pag-style ng Iyong Pahina

### Mga Istilo ng Seksyon

Mag-click sa anumang seksyon upang buksan ang nito na panel ng istilo. Maaari mong itakda:

- **Background** -- Solid na kulay, gradient, o imahe
- **Padding** -- Itaas at ibabang spacing sa loob ng seksyon
- **Lapad** -- Full-width o centered/contained

### Mga Istilo ng Elemento

Mag-click sa anumang elemento upang buksan ang nito na panel ng istilo. Ang mga karaniwang opsyon ay naglalaman ng sukat ng font, kulay, alignment, margin, at padding. Para sa mga imahe, maaari mong itakda ang alt text at mga target ng link.

### Custom CSS

Para sa advanced na pag-style, ang bawat seksyon at elemento ay may **Custom CSS** field kung saan maaari kang sumulat ng iyong sariling mga CSS rules. Ang mga ito ay scoped sa element na iyon, kaya hindi nila hindi sinasadya na makakaapekto sa natitirang bahagi ng pahina.

:::tip
Kung kailangan mong mag-apply ng mga istilo sa buong iyong site -- tulad ng isang custom font o pandaigdigang kulay -- gamitin ang [Appearance](appearance) settings sa halip na custom CSS sa indibidwal na mga pahina.
:::

## Pagtingin ng Iyong Pahina

Gamitin ang mga kontrol sa preview sa toolbar upang suriin kung paano makikita ang iyong pahina sa iba't ibang laki ng screen:

- **Desktop** -- Full-width browser view
- **Mobile** -- Maliit na phone-sized view

Mag-click **Preview** upang magbukas ng isang live version ng pahina sa isang bagong browser tab, eksaktong tulad ng makikita ng mga bisita.

## Pag-undo ng mga Pagbabago

Ang editor ay awtomatikong sumusubaybay sa iyong history ng pag-edit. Gamitin ang mga pindot sa toolbar o keyboard shortcuts upang mag-navigate:

- **Undo** (Ctrl+Z / Cmd+Z) -- Bawiin ang iyong huling aksyon
- **Redo** (Ctrl+Y / Cmd+Y) -- Muling i-apply ang isang undone action

Maaari mo ring maibalik ang pahina sa isang mas maaga na snapshot. Mag-click **History** sa toolbar upang makita ang isang listahan ng mga naka-save na snapshot na may mga paglalarawan, at mag-click ng anumang entry upang maibalik ang papunta sa puntong iyon.

:::warning
Ang pagbabalik ng isang snapshot ay pinalitan ang iyong kasalukuyang content ng pahina na may snapshot version. Hindi ito maaaring baguhin gamit ang standard undo button. Mag-save ng isang snapshot ng iyong kasalukuyang estado bago magbalik ng lumang isa kung nais mong panatilihin ang opsyon na bumalik.
:::

## Pag-save at Pag-publish

Ang mga pagbabago ay awtomatikong ini-save habang nagtratrabaho ka. Ang isang status indicator sa toolbar ay nagpapakita kung ang iyong mga pagbabago ay na-save na.

### Draft at published state

Ang mga pahina ay maaaring magkaroon ng **published** state, na kumokontrol kung kailan nakikita ng mga bisita ang iyong mga pagbabago. Ang toolbar ay nagpapakita ng isang status chip na nagpapakita ng kasalukuyang estado:

- **Live on Save** -- Ang pahina ay hindi gumagamit ng isang publish workflow. Ang bawat naka-save na pagbabago ay direktang live. Ito ay ang default para sa mga bagong pahina.
- **Unpublished Changes** -- Ang pahina ay naglathala na dati, ngunit gumawa ka ng mga pagbabago mula sa huling publish. Ang mga bisita ay nakakakita pa rin ng naglalathang bersyon.
- **Published** -- Ang pahina ay live at ang iyong naka-save na nilalaman ay tumutugma sa kung ano ang nakikita ng mga bisita.

Upang maglathala ng iyong mga pagbabago, mag-click sa **Publish** button sa toolbar. Ang pahina ay direktang live.

Upang bumalik sa huling nailathalayang bersyon nang hindi nakakaapekto kung ano ang nakikita ng mga bisita, buksan ang overflow menu (⋮) at mag-click **Discard Changes**.

Upang dalhin ang isang pahina offline sa kabuuan, buksan ang overflow menu at mag-click **Unpublish**. Ang mga bisita ay hindi na makikita ang pahina na iyon hanggang sa muling ilathala mo ito.

:::tip
Gamitin ang draft/publish workflow kung gusto mong maghanda ng isang pahina -- halimbawa, para sa isang paparating na kaganapan -- at gawin lamang itong live sa tamang sandali. Bumuo at tumingin ng preview ng pahina, pagkatapos mag-click Publish kapag handa ka na.
:::

## Mga Kaugnay na Artikulo

- [Pagmamanage ng mga Pahina](managing-pages) -- Lumikha ng mga pahina, itakda ang mga URL, at pamahalaan ang site navigation
- [Appearance](appearance) -- Itakda ang site-wide colors, fonts, at branding
- [Files](files) -- Mag-upload ng mga imahe at dokumento upang gamitin sa editor
- [Paglikha ng mga Form](../forms/creating-forms) -- Bumuo ng mga form na maaari mong i-embed sa mga pahina
