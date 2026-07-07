---
title: "Custom Fields"
---

# Custom Fields

<div class="article-intro">

Ang **Custom Fields** ay nagpapahintulot sa iyo na mag-track ng sarili mong information sa bawat person record — mga bagay na B1 ay walang built-in field para, tulad ng background-check expiration date, T-shirt size, o baptism class status. Ikaw ay tumutukoy ng isang field minsan sa Settings, pagkatapos ay punan ang isang value sa profile ng bawat tao at maghanap o bumuo ng mga lists dito. Ito ay nagpapalit sa mas lumang workaround ng paglikha ng People form para lang mag-store ng isang piece ng custom data.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **People** edit permission upang maglarawan ng fields at punan ang mga values, at access sa **Settings** area. Ang sinuman na may People view permission ay maaaring makita ang values. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Magpasya kung ano ang gusto mong i-track at aling uri ang pinakamahusay (text, isang numero, isang date, isang yes/no answer, o isang pick-list) bago ka magsimula.

</div>

## Pagbubukas ng Custom Fields

Sa B1 Admin, pumunta sa **Settings** sa left sidebar at piliin ang **Custom Fields** card. Maaari mo ring direktang pumunta doon sa **/settings/custom-fields**. Makikita mo ang isang lista ng bawat field na tinukoy mo, na nagpapakita ng **Name** at **Field Type** nito. Kung hindi ka pa gumawa ng anuman, ang panel ay nagsasabing *"No custom fields have been added yet."*

## Pagdaragdag ng Field

1. I-click ang **Add Field**.
2. Sa editor na bubukas sa kanan, magpasok ng **Name** — ito ang label na makikita ng staff sa person profiles at sa search (halimbawa, *Background check expires*).
3. Pumili ng **Field Type**:
   - **Textbox** — free-form short text.
   - **Whole Number** — mga numero nang walang decimals (halimbawa, isang count).
   - **Decimal** — mga numero na maaaring kasama ang decimals.
   - **Date** — isang calendar date.
   - **Yes/No** — isang simpleng yes-or-no answer.
   - **Multiple Choice** — isang pick-list. Kapag pumili ka ng ganitong uri, ang **choices editor** ay lilitaw upang maaari kang magdagdag ng bawat opsyon na maaaring piliin ng mga tao.
4. I-click ang **Save**.

Ang field ay ngayon available sa profile ng bawat tao.

:::info
Ang field types ay ang parehong set na ginagamit para sa [form questions](../forms/creating-forms.md), kaya ang values ay kumikilos nang pare-pareho sa buong B1.
:::

## Pag-edit ng Field

I-click ang anumang field row sa listahan upang muling buksan ito sa editor. Baguhin ang name, type, o choices at i-click ang **Save**.

:::warning
Ang pagbabago ng **Field Type** ng isang field na may nang mga values (halimbawa, mula Textbox hanggang Date) ay maaaring iwanan ang dati nang na-enter values sa isang format na hindi na tumutugma sa bagong type. Baguhin ang mga types na may pag-iingat sa pagkatapos na nagsimula na ang staff na punan ang field.
:::

## Pagsasarado ng Field

Buksan ang isang field para sa editing at i-click ang **Delete**. Itatanong ka na mag-confirm: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Ang pag-aalis ng field ay permanent na nag-aalis nito **at bawat value na naka-store para dito** sa lahat ng tao — ito ay hindi maaaring i-undo.

## Pagpuno ng Values sa Isang Person

Sa sandaling umiiral na ang hindi bababa sa isang custom field, ang values nito ay nakatira nang direkta sa built-in details sa record ng bawat tao — tinitingnan mo ang mga ito sa **Personal Details** at dine-edit ang mga ito sa parehong form na ginagamit mo para sa natitirang information ng tao. Walang karagdagang nagpapakita hanggang sa ikaw ay naglarawan ng unang field.

1. Buksan ang record ng isang tao sa **People**.
2. Sa **Personal Details** section, i-click ang **Edit** (pencil) button.
3. I-scroll sa **Custom Fields** area sa ilalim ng edit form at punan ang value para sa bawat field. Bawat field ay nagpapakita ng input na tumutugma sa type nito — isang date picker para sa Date fields, isang yes/no dropdown para sa Yes/No fields, isang pick-list para sa Multiple Choice, at iba pa.
4. I-click ang **Save**. Ang custom-field values ay naka-save kasama ng natitirang detalye ng tao.

Pabalik sa profile, anumang field na may value ay nagpapakita na sa **Personal Details** section (Yes/No answers ay nagsasabing *Yes* o *No*, at Multiple Choice ay nagpapakita ng label ng opsyon). Ang mga fields na iwanan na blank ay simpleng nakatagong. Upang alisin ang value, i-edit ang tao, i-clear ang field, at i-save — ang empty value ay natanggal mula sa record sa halip na ma-store bilang blank.

:::tip
Ang classic use case ay volunteer safety: lumikha ng **Date** field na tinatawag na *Background check expires*, mag-record ng bawat volunteer's date, pagkatapos ay bumuo ng [Saved List](../people/lists.md) na nag-flag sa sinuman na ang date ay lumipas na.
:::

## Paghahanap at Pagbuo ng Lists sa Custom Fields

Ang custom fields ay fully searchable:

1. Sa **People** page, buksan ang [Advanced Search](../people/searching-people.md).
2. Palawakin ang **Custom Fields** category.
3. Suriin ang field na gusto mong mag-filter, pumili ng operator, at magpasok ng value. Ang mga operators na inaalok ay tumutugma sa field's type:
   - **Textbox** — contains, equals, starts with, ends with.
   - **Whole Number / Decimal** — equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** — equals, after (greater than), before (less than).
   - **Yes/No** — equals Yes o No.
   - **Multiple Choice** — equals o contains isa sa mga choices.

Mag-save ng anumang custom-field search bilang [List](../people/lists.md). Ang Lists ay live queries, kaya ang isang list na binuo sa *Background check expires is before today* ay muling sinusuri ang bawat tao bawat oras na binubuksan mo ito — walang manual upkeep.

## Kung Ano ang Nangyayari sa Merge

Kapag nag-merge ka ng dalawang person records, ang custom-field values ay awtomatikong nag-aral. Ang tao na pinapanatili mo ay humahawak sa sarili nilang values; para sa anumang field kung saan lamang ang inalis na tao ay may value, ang value na iyon ay kinokopya upang walang nawalan.

## Related Articles

- [Searching People](../people/searching-people.md) — advanced search, kasama ang Custom Fields category
- [Saved Lists](../people/lists.md) — mag-save ng custom-field search at muling patakbuhin ito live
- [Roles & Permissions](./roles-permissions.md) — sino ang maaaring maglarawan ng fields at mag-edit ng values
- [Creating Forms](../forms/creating-forms.md) — para sa multi-question data collection kung saan ang buong form ay mas angkop kaysa sa single fields
