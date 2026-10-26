---
title: "Mga Custom Field"
---

# Mga Custom Field

<div class="article-intro">

Ang **Custom Field** ay nagbibigay-daan sa iyong subaybayan ang sarili mong impormasyon sa bawat person record -- mga bagay na walang built-in na field sa B1, tulad ng petsa ng pag-expire ng background check, laki ng T-shirt, o status ng baptism class. Itinatakda mo ang field nang isang beses sa Settings, pagkatapos ay punan ang value sa profile ng bawat tao at maghanap o gumawa ng mga listahan batay dito. Pinapalitan nito ang lumang paraan ng paggawa ng People form para lamang mag-imbak ng iisang custom na datos.

</div>

## Training Video

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **People** edit permission para magtakda ng mga field at maglagay ng value, at access sa **Settings** area. Ang sinumang may People view permission ay makakakita ng mga value. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Magpasya kung ano ang gusto mong subaybayan at kung aling uri ang pinakabagay (text, numero, petsa, oo/hindi, o pick-list) bago ka magsimula.

</div>

## Pagbubukas ng Custom Fields

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), piliin ang **Settings > Settings**, at i-click ang **Custom Fields** sa listahan sa kaliwa para mapunta sa seksyong **Custom Fields**. Maaari mo rin itong puntahan nang direkta sa **/settings/custom-fields**. Makikita mo ang listahan ng lahat ng field na iyong ginawa, na nagpapakita ng **Name** at **Field Type**. Kung wala ka pang nagawa, ang panel ay magsasabing *"No custom fields have been added yet."*

## Pagdaragdag ng Field

1. I-click ang **Add Field**.
2. Sa editor na lalabas sa kanan, ilagay ang **Name** -- ito ang label na makikita ng staff sa mga profile ng tao at sa paghahanap (halimbawa, *Background check expires*).
3. Pumili ng **Field Type**:
   - **Textbox** -- maikling text na malayang maisusulat.
   - **Whole Number** -- mga numerong walang decimal (halimbawa, bilang).
   - **Decimal** -- mga numerong maaaring may decimal.
   - **Date** -- isang petsa sa kalendaryo.
   - **Yes/No** -- simpleng oo o hindi na sagot.
   - **Multiple Choice** -- isang pick-list. Kapag ito ang pinili mo, lalabas ang **choices editor** para makapagdagdag ka ng bawat opsyong maaaring piliin ng mga tao.
4. I-click ang **Save**.

Makikita na ang field sa profile ng bawat tao.

:::info
Ang mga uri ng field ay kapareho ng mga ginagamit sa [form questions](../forms/creating-forms.md), kaya magkakapareho ang kilos ng mga value sa buong B1.
:::

## Pag-e-edit ng Field

I-click ang alinmang row ng field sa listahan para buksan itong muli sa editor. Baguhin ang pangalan, uri, o mga pagpipilian at i-click ang **Save**.

:::warning
Ang pagbabago ng **Field Type** ng field na may mga value na (halimbawa, mula Textbox patungong Date) ay maaaring mag-iwan ng dating inilagay na mga value sa format na hindi na tugma sa bagong uri. Mag-ingat sa pagbabago ng uri kapag nagsimula nang maglagay ng value ang staff sa field.
:::

## Pagbura ng Field

Buksan ang field para i-edit at i-click ang **Delete**. Hihingan ka ng kumpirmasyon: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Ang pagbura ng field ay permanenteng magtatanggal dito **at sa bawat value na naka-imbak dito** sa lahat ng tao -- hindi ito maaaring bawiin.

## Paglalagay ng Value sa Isang Tao

Kapag mayroon nang kahit isang custom field, ang mga value nito ay nasa tabi mismo ng mga built-in na detalye sa record ng bawat tao -- makikita mo ang mga ito kasama ng contact details ng tao sa kaliwa ng kanyang profile, at mae-edit sa parehong form na ginagamit mo para sa iba pang impormasyon ng tao. Walang lalabas na dagdag hangga't hindi ka pa nakakapagtakda ng unang field.

1. Buksan ang record ng isang tao sa **People**.
2. I-click ang **Edit** button sa kaliwa ng profile, sa ibaba ng contact details ng tao.
3. Mag-scroll sa **Custom Fields** area sa ibaba ng edit form at maglagay ng value para sa bawat field. Ang bawat field ay may input na tugma sa uri nito -- date picker para sa Date fields, yes/no dropdown para sa Yes/No fields, pick-list para sa Multiple Choice, at iba pa.
4. I-click ang **Save**. Ang mga value ng custom field ay ise-save kasama ng iba pang detalye ng tao.

Pagbalik sa profile, ang anumang field na may value ay makikita na sa ilalim ng contact details ng tao bilang *Field name: value* (ang sagot na Yes/No ay lalabas bilang *Yes* o *No*, at ang Multiple Choice ay ipapakita ang label ng opsyon). Ang mga field na walang laman ay hindi lang ipinapakita. Para magtanggal ng value, i-edit ang tao, burahin ang field, at i-save -- ang walang lamang value ay tinatanggal sa record sa halip na i-save bilang blangko.

:::tip
Ang klasikong gamit nito ay ang kaligtasan ng mga volunteer: gumawa ng **Date** field na may pangalang *Background check expires*, itala ang petsa ng bawat volunteer, at pagkatapos ay gumawa ng [Saved List](../people/lists.md) na magpapakita ng sinumang lumampas na sa petsa.
:::

## Paghahanap at Paggawa ng Listahan Gamit ang Custom Fields

Ganap na maaaring hanapin ang mga custom field:

1. Sa pahinang **People**, buksan ang [Advanced Search](../people/searching-people.md).
2. I-expand ang kategoryang **Custom Fields**.
3. I-check ang field na nais mong salain, pumili ng operator, at maglagay ng value. Ang mga operator na iaalok ay tumutugma sa uri ng field:
   - **Textbox** -- contains, equals, starts with, ends with.
   - **Whole Number / Decimal** -- equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** -- equals, after (greater than), before (less than).
   - **Yes/No** -- equals Yes o No.
   - **Multiple Choice** -- equals o contains ng isa sa mga pagpipilian.

I-save ang anumang custom-field search bilang [List](../people/lists.md). Ang mga List ay live na query, kaya ang listahang ginawa sa *Background check expires is before today* ay muling susuriin ang bawat tao tuwing bubuksan mo ito -- walang manual na pag-aalaga.

## Pagpapakita ng Custom Field bilang Column

Para makita ang value ng isang field para sa lahat nang sabay-sabay, idagdag ito bilang column sa pahinang **People**. Palitan ang **View as** sa **Table**, i-click ang **Select columns** icon sa header ng pahina, lumipat sa **Custom** tab, at i-check ang field. Lalabas ang value ng bawat tao sa sarili nitong column katabi ng mga built-in. Tingnan ang [Showing Custom Fields as Columns](../people/searching-people.md#showing-custom-fields-as-columns).

## Ano ang Mangyayari sa Merge

Kapag [pinagsama mo ang dalawang person record](../people/adding-people.md), awtomatikong ililipat ang mga value ng custom field. Ang taong itinatago mo ay mananatili sa sarili niyang mga value; para sa alinmang field na ang inalis na tao lamang ang may value, kokopyahin ang value na iyon upang walang mawala.

## Mga Kaugnay na Artikulo

- [Searching People](../people/searching-people.md) -- advanced search, kabilang ang kategoryang Custom Fields, at pagpapakita ng custom fields bilang columns
- [Saved Lists](../people/lists.md) -- i-save ang custom-field search at patakbuhin ulit nang live
- [Roles & Permissions](./roles-permissions.md) -- sino ang maaaring magtakda ng field at mag-edit ng value
- [Creating Forms](../forms/creating-forms.md) -- para sa maraming tanong na pagkolekta ng datos kung saan mas angkop ang buong form kaysa sa iisang field
