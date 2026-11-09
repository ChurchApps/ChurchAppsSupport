---
title: "Mga Custom Field"
description: "Gumawa ng mga custom field sa B1 Admin para subaybayan ang karagdagang detalye ng tao, gaya ng expiration ng background check o laki ng shirt, at maghanap at mag-filter gamit ang mga ito."
---

# Mga Custom Field

<div class="article-intro">

Hinahayaan ka ng **Custom Fields** na subaybayan ang sarili mong impormasyon sa bawat person record -- mga bagay na walang built-in na field sa B1, gaya ng petsa ng pag-expire ng background check, laki ng T-shirt, o status ng baptism class. Itinatakda mo ang field nang isang beses sa Settings, pagkatapos ay pinupunan ang value sa profile ng bawat tao at naghahanap o gumagawa ng mga listahan batay dito. Pinapalitan nito ang lumang paraan ng paggawa ng People form para lang mag-imbak ng iisang custom na datos.

</div>

## Training Video

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **People** edit permission para magtakda ng mga field at maglagay ng mga value, at access sa lugar ng **Settings**. Ang sinumang may People view permission ay makakakita ng mga value. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Pagpasyahan kung ano ang gusto mong subaybayan at kung aling uri ang pinakaangkop (text, numero, petsa, oo/hindi, o pick-list) bago ka magsimula.

</div>

## Pagbubukas ng Custom Fields

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), piliin ang **Settings > Settings**, at i-click ang **Custom Fields** sa listahan sa kaliwa para mag-scroll sa seksyong **Custom Fields**. Maaari ka ring pumunta nang direkta sa **/settings/custom-fields**. Makikita mo ang listahan ng bawat field na iyong ginawa, na nagpapakita ng **Name** at **Field Type**. Kung wala ka pang nagagawa, ang panel ay magsasabing *"No custom fields have been added yet."*

## Mga Titulo

Ang card na **Titles** sa itaas ng seksyong Custom Fields ay naglilista ng mga titulong inaalok sa kahong **Title** kapag may idinaragdag o ine-edit na tao, sa B1 Admin at sa B1 app (ang profile editor at ang guest registration form). Nagsisimula ang listahan sa Mr, Mrs, Miss, Ms, Dr, Prof, Rev, at Pastor.

1. I-type ang isang titulo sa **New title** (hanggang 10 karakter), gaya ng *Deacon* o *Elder*, at i-click ang **Add Title**.
2. Para alisin ang isang titulo sa listahan, i-click ang **×** sa chip nito.
3. I-click ang **Save**.

:::tip
Tumatanggap pa rin ng pag-type ang kahon ng Title, kaya maaaring maglagay ng titulong wala sa listahan ang staff at mga miyembro. Ang pag-alis ng titulo sa listahan ay hindi nagbabago sa mga taong mayroon na nito.
:::

## Pagdaragdag ng Field

1. I-click ang **Add Field**.
2. Sa editor na bumubukas sa kanan, ilagay ang **Name** -- ito ang label na makikita ng staff sa mga profile ng tao at sa paghahanap (halimbawa, *Background check expires*).
3. Pumili ng **Field Type**:
   - **Textbox** -- maikling text na malayang isusulat.
   - **Whole Number** -- mga numerong walang decimal (halimbawa, bilang).
   - **Decimal** -- mga numerong maaaring may decimal.
   - **Date** -- isang petsa sa kalendaryo.
   - **Yes/No** -- simpleng sagot na oo o hindi.
   - **Multiple Choice** -- isang pick-list. Kapag ito ang pinili mo, lalabas ang **choices editor** para madagdagan mo ng bawat opsyong maaaring piliin ng mga tao.
4. I-click ang **Save**.

Makikita na ang field sa profile ng bawat tao.

:::info
Pareho ang mga uri ng field na ginagamit sa [form questions](../forms/creating-forms.md), kaya magkakapareho ang kilos ng mga value sa buong B1.
:::

## Pag-e-edit ng Field

I-click ang alinmang row ng field sa listahan para buksan itong muli sa editor. Baguhin ang pangalan, uri, o mga pagpipilian, at i-click ang **Save**.

:::warning
Ang pagbabago ng **Field Type** ng field na may mga value na (halimbawa, mula Textbox patungong Date) ay maaaring mag-iwan ng mga naunang value sa format na hindi na tugma sa bagong uri. Mag-ingat sa pagbabago ng uri kapag nagsimula nang maglagay ng value ang staff sa field.
:::

## Pagbura ng Field

Buksan ang field para i-edit at i-click ang **Delete**. Hihingan ka ng kumpirmasyon: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Ang pagbura ng field ay permanenteng magtatanggal dito **at sa bawat value na naka-imbak dito** para sa lahat ng tao -- hindi ito maaaring bawiin.

## Paglalagay ng Value sa Isang Tao

Kapag may kahit isang custom field na, ang mga value nito ay nasa tabi mismo ng mga built-in na detalye sa record ng bawat tao -- makikita mo ang mga ito kasama ng contact details ng tao sa kaliwa ng kanyang profile, at mae-edit sa parehong form na ginagamit mo para sa iba pang impormasyon ng tao. Walang lalabas na dagdag hangga't hindi ka pa nakakapagtakda ng unang field.

1. Buksan ang record ng isang tao sa **People**.
2. I-click ang button na **Edit** sa kaliwa ng profile, sa ibaba ng contact details ng tao.
3. Mag-scroll sa bahaging **Custom Fields** sa ilalim ng edit form at maglagay ng value para sa bawat field. Ang bawat field ay may input na tugma sa uri nito -- date picker para sa Date fields, yes/no dropdown para sa Yes/No fields, pick-list para sa Multiple Choice, at iba pa.
4. I-click ang **Save**. Ise-save ang mga value ng custom field kasama ng iba pang detalye ng tao.

Pagbalik sa profile, ang anumang field na may value ay makikita na sa ilalim ng contact details ng tao bilang *Field name: value* (lumalabas bilang *Yes* o *No* ang mga sagot na Yes/No, at ipinapakita ng Multiple Choice ang label ng opsyon). Nakatago ang mga field na walang laman. Para alisin ang value, i-edit ang tao, burahin ang field, at i-save -- ang walang lamang value ay tinatanggal sa record sa halip na i-save bilang blangko.

:::tip
Ang klasikong gamit nito ay ang kaligtasan ng volunteer: gumawa ng **Date** field na may pangalang *Background check expires*, itala ang petsa ng bawat volunteer, at pagkatapos ay gumawa ng [Saved List](../people/lists.md) na magpapakita ng sinumang lumampas na sa petsa.
:::

## Paghahanap at Paggawa ng mga Listahan Gamit ang Custom Fields

Ganap na nahahanap ang mga custom field:

1. Sa pahinang **People**, buksan ang [Advanced Search](../people/searching-people.md).
2. I-expand ang kategoryang **Custom Fields**.
3. I-check ang field na nais mong i-filter, pumili ng operator, at maglagay ng value. Tumutugma sa uri ng field ang mga operator na iaalok:
   - **Textbox** -- contains, equals, starts with, ends with.
   - **Whole Number / Decimal** -- equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** -- equals, after (greater than), before (less than).
   - **Yes/No** -- equals Yes o No.
   - **Multiple Choice** -- equals o contains ng isa sa mga pagpipilian.

I-save ang anumang custom-field search bilang [List](../people/lists.md). Live na query ang mga List, kaya ang listahang nakabatay sa *Background check expires is before today* ay muling susuriin ang bawat tao sa tuwing bubuksan mo ito -- walang manu-manong pag-aalaga.

## Pagpapakita ng Custom Field bilang Column

Para makita ang mga value ng isang field para sa lahat nang sabay-sabay, idagdag ito bilang column sa pahinang **People**. Palitan ang **View as** sa **Table**, i-click ang icon na **Select columns** sa header ng pahina, lumipat sa tab na **Custom**, at i-check ang field. Lalabas ang value ng bawat tao sa sarili nitong column, katabi ng mga built-in. Tingnan ang [Showing Custom Fields as Columns](../people/searching-people.md#showing-custom-fields-as-columns).

## Ano ang Mangyayari Kapag Nag-merge

Kapag [pinagsama mo ang dalawang person record](../people/adding-people.md), awtomatikong nililipat ang mga custom-field value. Pinananatili ng taong itinatago mo ang sarili niyang mga value; para sa alinmang field na ang inalis na tao lang ang may value, kokopyahin ang value na iyon para walang mawala.

## Mga Kaugnay na Artikulo

- [Searching People](../people/searching-people.md) -- advanced search, kabilang ang kategoryang Custom Fields, at pagpapakita ng custom fields bilang column
- [Saved Lists](../people/lists.md) -- i-save ang isang custom-field search at patakbuhin ulit nang live
- [Roles & Permissions](./roles-permissions.md) -- sino ang maaaring magtakda ng field at mag-edit ng value
- [Creating Forms](../forms/creating-forms.md) -- para sa maraming tanong na pagkolekta ng datos kung saan mas angkop ang buong form kaysa sa iisang field
