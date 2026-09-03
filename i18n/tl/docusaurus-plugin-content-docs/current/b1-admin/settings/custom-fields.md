---
title: "Custom Fields"
---

# Custom Fields

<div class="article-intro">

Ang **Custom Fields** ay nagbibigay-daan sa iyo na subaybayan ang iyong sariling impormasyon sa bawat person record — mga bagay na B1 ay walang built-in na field para dito, tulad ng isang background-check expiration date, isang T-shirt size, o isang baptism class status. Tinukoy mo ang isang field minsan sa Settings, pagkatapos ay punan ang isang halaga sa bawat profile ng tao at maghanap o bumuo ng mga listahan dito. Ito ay nagpapalit ng mas lumang workaround ng lumilikha ng isang People form lamang upang mag-imbak ng isang solong piraso ng custom data.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **People** edit permission upang tukuyin ang mga field at punan ang mga halaga, at access sa **Settings** area. Ang sinuman na may People view permission ay makikita ang mga halaga. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Magpasya kung ano ang nais mong subaybayan at kung aling uri ang umaangkop nang mejor (teksto, isang numero, isang petsa, isang oo/hindi saguot, o isang pick-list) bago ka magsimula.

</div>

## Pagbubukas ng Custom Fields

Sa B1 Admin, buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow), pumili ng **Settings**, at piliin ang **Custom Fields** card. Maaari ka rin na direktang pumunta doon sa **/settings/custom-fields**. Makikita mo ang isang listahan ng bawat field na tinukoy mo, na nagpapakita ng **Name** at **Field Type**. Kung hindi ka pa lumikha, ang panel ay nagbabasa *"No custom fields have been added yet."*

## Pagdagdag ng Isang Field

1. I-click ang **Add Field**.
2. Sa editor na bumubukas sa kanang bahagi, magpasok ng **Name** — ito ang label na makikita ng staff sa person profiles at sa search (halimbawa, *Background check expires*).
3. Pumili ng **Field Type**:
   - **Textbox** — free-form short text.
   - **Whole Number** — mga numero nang walang decimals (halimbawa, isang bilang).
   - **Decimal** — mga numero na maaaring magsama ng decimals.
   - **Date** — isang calendar date.
   - **Yes/No** — isang simpleng oo-o-hindi saguot.
   - **Multiple Choice** — isang pick-list. Kapag pumili ka ng ganitong uri, isang **choices editor** ay lumalabas upang maaari kang magdagdag ng bawat opsyon na maaaring pumili ng mga tao.
4. I-click ang **Save**.

Ang field ay available na ngayon sa profile ng bawat tao.

:::info
Ang mga uri ng field ay pareho ng hanay na ginagamit para sa [form questions](../forms/creating-forms.md), kaya ang mga halaga ay kumikilos nang pare-pareho sa buong B1.
:::

## Pag-edit ng Isang Field

I-click ang kahit anong row ng field sa listahan upang i-reopen ito sa editor. Baguhin ang pangalan, uri, o mga pagpipilian at i-click ang **Save**.

:::warning
Ang pagbabago ng **Field Type** ng isang field na mayroon na ng mga halaga (halimbawa, mula sa Textbox tungo sa Date) ay maaaring iwanan ang mga dating na-enter na halaga sa isang format na hindi na tumutugma sa bagong uri. Baguhin ang mga uri na may pag-iingat kapag ang staff ay nagsimulang pumuno ng field.
:::

## Pag-delete ng Isang Field

Buksan ang field para sa pag-edit at i-click ang **Delete**. Tatanungin ka na kumpirmahin. Ang pagbabura ng isang field ay permanente na nag-aalis nito **at bawat halaga na naka-imbak para dito** sa lahat ng mga tao — hindi ito mababawi.

## Pagpuno ng Mga Halaga sa Isang Tao

Kapag mayroon na ng hindi bababa sa isang custom field, ang mga halaga nito ay nabubuhay nang direkta sa tabi ng mga built-in na detalye sa bawat person record — tinitingin mo ang mga ito sa **Personal Details** at ine-edit ang mga ito sa parehong form na ginagamit mo para sa natitirang impormasyon ng tao. Walang karagdagang lumalabas hanggang sa tinukoy mo ang iyong unang field.

1. Buksan ang rekord ng isang tao sa **People**.
2. Sa **Personal Details** section, i-click ang **Edit** (pencil) button.
3. Gumalaw sa **Custom Fields** area sa ilalim ng edit form at punan ang halaga para sa bawat field. Bawat field ay nagpapakita ng input na tumutugma sa uri nito — isang date picker para sa Date fields, isang oo/hindi dropdown para sa Yes/No fields, isang pick-list para sa Multiple Choice, at iba pang.
4. I-click ang **Save**. Ang mga custom-field value ay naka-save kasama ang natitirang detalye ng tao.

Bumalik sa profile, anumang field na may halaga ngayon ay nagpapakita sa **Personal Details** section (Ang Yes/No answers ay nagbabasa bilang *Yes* o *No*, at ang Multiple Choice ay nagpapakita ng label ng opsyon). Ang mga field na naiwan blangko ay simpleng nakatago. Upang alisin ang halaga, i-edit ang tao, linawin ang field, at i-save — ang isang walang halaga ay inalis mula sa rekord sa halip na naka-imbak bilang blangko.
