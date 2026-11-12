---
title: "Custom Fields"
description: "Gumawa ng custom field sa B1 Admin para masubaybayan ang karagdagang detalye ng tao, gaya ng petsa ng pag-expire ng background check o laki ng t-shirt, pagkatapos maghanap at mag-filter gamit ang mga ito."
---

# Custom Fields

<div class="article-intro">

Hinahayaan ka ng **Custom Fields** na subaybayan ang sarili mong impormasyon sa bawat talaan ng tao -- mga bagay na walang built-in na field sa B1, gaya ng petsa ng pag-expire ng background check, laki ng T-shirt, o status ng baptism class. Ide-define mo ang field nang isang beses sa Settings, pagkatapos maglalagay ng value sa profile ng bawat tao at maghahanap o bubuo ng mga listahan gamit ito. Pinapalitan nito ang lumang paraan ng paggawa ng People form para lamang mag-imbak ng iisang custom na datos.

</div>

## Training Video {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, at Exporting sa B1" next="Paggawa ng Groups at Pagdaragdag ng Members sa B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Church Settings** para mabuksan ang Settings page (at para mai-save ang listahan ng Titles), kasama ang permiso sa pag-edit ng **People** para mag-define ng field at maglagay ng value. Makikita ng sinumang may permiso sa pagtingin ng People ang mga value. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Pag-isipan kung ano ang gusto mong subaybayan at kung aling uri ang pinakaangkop (text, numero, petsa, oo/hindi, o pick-list) bago ka magsimula.

</div>

## Pagbubukas ng Custom Fields {#opening-custom-fields}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), piliin ang **Settings > Settings**, at i-click ang **Custom Fields** sa listahan sa kaliwa para mag-scroll sa seksyong **Custom Fields**. Maaari ka ring dumiretso roon sa **/settings/custom-fields**. Makikita mo ang listahan ng bawat field na na-define mo, na nagpapakita ng **Name** at **Field Type** nito. Kung wala ka pang nagagawa, ang panel ay magbabasang *"No custom fields have been added yet."*

## Titles {#titles}

Ang card na **Titles** sa itaas ng seksyong Custom Fields ay naglilista ng mga titulong lumalabas sa kahong **Title** kapag may idinadagdag o inie-edit na tao, sa B1 Admin at sa B1 app (ang profile editor at ang guest registration form). Nagsisimula ang listahan sa Mr, Mrs, Miss, Ms, Dr, Prof, Rev, at Pastor.

1. I-type ang isang title sa **New title** (hanggang 10 karakter), gaya ng *Deacon* o *Elder*, at i-click ang **Add Title**.
2. Para alisin ang isang title sa listahan, i-click ang **×** sa chip nito.
3. I-click ang **Save**. Kukumpirmahin ng mensaheng *Titles saved.* ang pagbabago. Kung idadagdag ang title na nasa listahan na, lalabas ang *That title is already in the list.*

:::tip
Tumatanggap pa rin ng pag-type ang kahong Title, kaya maaaring maglagay ang staff at mga miyembro ng title na wala sa listahan. Ang pag-alis ng title sa listahan ay hindi nagbabago sa mga taong mayroon na nito.
:::

## Pagdaragdag ng Field {#adding-a-field}

1. I-click ang **Add Field**.
2. Sa editor na bubukas sa kanan, maglagay ng **Name** -- ito ang label na makikita ng staff sa mga profile ng tao at sa paghahanap (halimbawa, *Background check expires*).
3. Pumili ng **Field Type**:
   - **Textbox** -- maikling malayang teksto.
   - **Whole Number** -- mga numerong walang decimal (halimbawa, bilang).
   - **Decimal** -- mga numerong maaaring may decimal.
   - **Date** -- isang petsa ng kalendaryo.
   - **Yes/No** -- simpleng oo-o-hindi na sagot.
   - **Multiple Choice** -- pick-list. Kapag ito ang pinili mo, lalabas ang **choices editor** para makapagdagdag ka ng bawat opsyong maaaring piliin ng mga tao.
4. I-click ang **Save**.

Available na ngayon ang field sa profile ng bawat tao.

:::info
Pareho ang mga uri ng field na ginagamit para sa [mga tanong sa form](../forms/creating-forms.md), kaya pare-parehong kumikilos ang mga value sa buong B1.
:::

## Pag-edit ng Field {#editing-a-field}

I-click ang alinmang row ng field sa listahan para buksan itong muli sa editor. Baguhin ang pangalan, uri, o mga pagpipilian at i-click ang **Save**.

:::warning
Ang pagbabago ng **Field Type** ng field na may umiiral nang mga value (halimbawa, mula Textbox papuntang Date) ay maaaring mag-iwan ng mga dating nailagay na value sa format na hindi na tugma sa bagong uri. Mag-ingat sa pagbabago ng uri kapag nagsimula nang maglagay ng value ang staff sa field.
:::

## Pagbura ng Field {#deleting-a-field}

Buksan ang isang field para i-edit at i-click ang **Delete**. Hihilingin sa iyong kumpirmahin: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Ang pagbura ng field ay permanenteng nag-aalis nito **at bawat value na nakaimbak dito** sa lahat ng tao -- hindi ito maibabalik.

## Paglalagay ng Value sa Isang Tao {#filling-in-values-on-a-person}

Kapag may kahit isang custom field na, nakatira ang mga value nito kasama mismo ng mga built-in na detalye sa talaan ng bawat tao -- makikita mo ang mga ito kasama ng contact details ng tao sa kaliwa ng kanyang profile, at ie-edit mo ang mga ito sa parehong form na ginagamit mo para sa iba pang impormasyon ng tao. Walang lalabas na dagdag hanggang sa ma-define mo ang una mong field.

1. Buksan ang talaan ng tao sa **People**.
2. I-click ang button na **Edit** sa kaliwa ng profile, sa ilalim ng contact details ng tao.
3. Mag-scroll sa area na **Custom Fields** sa ibaba ng edit form at maglagay ng value para sa bawat field. Ipinapakita ng bawat field ang input na tumutugma sa uri nito -- date picker para sa Date fields, dropdown na oo/hindi para sa Yes/No fields, pick-list para sa Multiple Choice, at iba pa.
4. I-click ang **Save**. Ise-save ang mga value ng custom field kasama ng iba pang detalye ng tao.

Pagbalik sa profile, anumang field na may value ay lalabas na sa ilalim ng contact details ng tao bilang *Field name: value* (ang mga sagot na Yes/No ay babasahing *Yes* o *No*, at ang Multiple Choice ay ipinapakita ang label ng opsyon). Ang mga blangkong field ay simpleng nakatago. Para alisin ang value, i-edit ang tao, burahin ang laman ng field, at i-save -- ang walang-lamang value ay binubura sa talaan sa halip na iniimbak bilang blangko.

:::tip
Ang klasikong gamit nito ay kaligtasan ng mga volunteer: gumawa ng **Date** field na pinamagatang *Background check expires*, itala ang petsa ng bawat volunteer, pagkatapos bumuo ng [Saved List](../people/lists.md) na nagmamarka sa sinumang lampas na ang petsa.
:::

## Paghahanap at Pagbuo ng Listahan gamit ang Custom Fields {#searching-and-building-lists-on-custom-fields}

Ganap na nahahanap ang mga custom field:

1. Sa pahinang **People**, buksan ang [Advanced Search](../people/searching-people.md).
2. Palawakin ang kategoryang **Custom Fields**.
3. Lagyan ng check ang field na gusto mong i-filter, pumili ng operator, at maglagay ng value. Ang mga operator na inaalok ay tumutugma sa uri ng field:
   - **Textbox** -- contains, equals, starts with, ends with.
   - **Whole Number / Decimal** -- equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** -- equals, after (greater than), before (less than).
   - **Yes/No** -- equals Yes o No.
   - **Multiple Choice** -- equals o contains isa sa mga pagpipilian.

I-save ang anumang paghahanap sa custom field bilang [List](../people/lists.md). Live query ang mga listahan, kaya tinitingnang muli ng listahang nakabatay sa *Background check expires is before today* ang bawat tao sa tuwing bubuksan mo ito -- walang manwal na pag-aalaga.

## Pagpapakita ng Custom Field bilang Column {#showing-a-custom-field-as-a-column}

Para makita ang mga value ng isang field para sa lahat nang sabay-sabay, idagdag ito bilang column sa pahinang **People**. Palitan ang **View as** sa **Table**, i-click ang icon na **Select columns** sa header ng pahina, lumipat sa tab na **Custom**, at lagyan ng check ang field. Lalabas ang value ng bawat tao sa sarili nitong column sa tabi ng mga built-in. Tingnan ang [Showing Custom Fields as Columns](../people/searching-people.md#showing-custom-fields-as-columns).

## Ano ang Mangyayari sa Merge {#what-happens-on-merge}

Kapag [nag-merge ka ng dalawang talaan ng tao](../people/adding-people.md), awtomatikong dinadala ang mga value ng custom field. Pinananatili ng taong itinatago mo ang sarili niyang mga value; para sa anumang field kung saan tanging ang tinanggal na tao ang may value, kinokopya ang value na iyon para walang mawala.

## Mga Kaugnay na Artikulo {#related-articles}

- [Searching People](../people/searching-people.md) -- advanced search, kasama ang kategoryang Custom Fields, at pagpapakita ng custom field bilang column
- [Saved Lists](../people/lists.md) -- i-save ang paghahanap sa custom field at patakbuhin ulit nang live
- [Roles & Permissions](./roles-permissions.md) -- sino ang maaaring mag-define ng field at mag-edit ng value
- [Creating Forms](../forms/creating-forms.md) -- para sa pangongolekta ng datos na maraming tanong, kung saan mas angkop ang buong form kaysa sa iisang field
