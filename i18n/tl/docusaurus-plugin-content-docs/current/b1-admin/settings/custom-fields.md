---
title: "Custom Fields"
---

# Custom Fields

<div class="article-intro">

Ang **Custom Fields** ay nagbibigay-daan sa iyong i-track ang sarili mong impormasyon sa bawat person record -- mga bagay na walang built-in na field ang B1, tulad ng petsa ng pag-expire ng background check, sukat ng T-shirt, o status ng baptism class. Idi-define mo ang isang field nang minsan sa Settings, pagkatapos ay punan ang isang value sa profile ng bawat tao at maghanap o gumawa ng listahan batay dito. Pinapalitan nito ang mas lumang paraan ng paggawa ng People form para lamang mag-imbak ng isang piraso ng custom na data.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **People** edit permission para maka-define ng mga field at makapagpuno ng mga value, at access sa lugar ng **Settings**. Sinuman na may People view permission ay makakakita ng mga value. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Magpasya kung ano ang gusto mong i-track at kung aling uri ang pinakabagay (text, numero, petsa, sagot na oo/hindi, o isang pick-list) bago ka magsimula.

</div>

## Pagbubukas ng Custom Fields

Sa B1 Admin, pumunta sa **Settings** sa kaliwang sidebar at piliin ang **Custom Fields** card. Maaari ka ring diretsong pumunta doon sa **/settings/custom-fields**. Makikita mo ang isang listahan ng bawat field na na-define mo, na ipinapakita ang **Name** at **Field Type** nito. Kung wala ka pang nagawa, babasahin ng panel na *"No custom fields have been added yet."*

## Pagdaragdag ng Field

1. I-click ang **Add Field**.
2. Sa editor na bubukas sa kanan, ilagay ang isang **Name** -- ito ang label na makikita ng staff sa mga person profile at sa paghahanap (halimbawa, *Background check expires*).
3. Piliin ang isang **Field Type**:
   - **Textbox** — malayang maikling text.
   - **Whole Number** — mga numero na walang decimal (halimbawa, isang bilang).
   - **Decimal** — mga numero na maaaring may decimal.
   - **Date** — isang petsa sa kalendaryo.
   - **Yes/No** — isang simpleng sagot na oo o hindi.
   - **Multiple Choice** — isang pick-list. Kapag pinili mo ang uring ito, lalabas ang isang **choices editor** para makapagdagdag ka ng bawat opsyon na mapipili ng mga tao.
4. I-click ang **Save**.

Available na ngayon ang field sa profile ng bawat tao.

:::info
Ang mga field type ay parehong set na ginagamit para sa [mga tanong sa form](../forms/creating-forms.md), kaya't magkakatugma ang pag-uugali ng mga value sa buong B1.
:::

## Pag-edit ng Field

I-click ang alinmang row ng field sa listahan para buksan ito ulit sa editor. Baguhin ang pangalan, uri, o mga choice at i-click ang **Save**.

:::warning
Ang pagbabago ng **Field Type** ng isang field na may mga value na sa kasalukuyan (halimbawa, mula sa Textbox tungo sa Date) ay maaaring iwan ang mga naunang nailagay na value sa format na hindi na tugma sa bagong uri. Mag-ingat sa pagpapalit ng uri kapag nagsimula nang punan ng staff ang field.
:::

## Pagbura ng Field

Buksan ang isang field para i-edit at i-click ang **Delete**. Hihilingin sa iyo na kumpirmahin: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Ang pagbura ng isang field ay permanenteng nag-aalis nito **at ng bawat value na naka-imbak dito** sa lahat ng tao -- hindi ito maibabalik.

## Pagpuno ng mga Value sa Isang Tao

Kapag mayroon nang kahit isang custom field, ang mga value nito ay nasa tabi mismo ng mga built-in na detalye sa record ng bawat tao -- makikita mo ang mga ito sa **Personal Details** at ie-edit sa parehong form na ginagamit mo para sa iba pang impormasyon ng tao. Walang karagdagang lalabas hangga't hindi mo pa na-define ang iyong unang field.

1. Buksan ang record ng isang tao sa **People**.
2. Sa seksyong **Personal Details**, i-click ang button na **Edit** (pencil).
3. Mag-scroll pababa sa lugar ng **Custom Fields** sa ilalim ng edit form at punan ang isang value para sa bawat field. Ang bawat field ay nagpapakita ng input na tumutugma sa uri nito -- isang date picker para sa mga Date field, isang oo/hindi dropdown para sa mga Yes/No field, isang pick-list para sa Multiple Choice, at iba pa.
4. I-click ang **Save**. Ang iyong mga custom-field value ay naka-save kasama ng ibang detalye ng tao.

Balik sa profile, anumang field na may value ay lumalabas na ngayon sa seksyong **Personal Details** (ang mga sagot na Yes/No ay babasahin bilang *Yes* o *No*, at ang Multiple Choice ay ipapakita ang label ng opsyon). Ang mga field na iniwang blangko ay basta na lang itinatago. Para tanggalin ang isang value, i-edit ang tao, i-clear ang field, at i-save -- isang blangkong value ay binubura mula sa record sa halip na maimbak bilang blangko.

:::tip
Ang klasikong use case ay kaligtasan ng volunteer: gumawa ng **Date** field na tinatawag na *Background check expires*, itala ang petsa ng bawat volunteer, pagkatapos ay gumawa ng [Saved List](../people/lists.md) na nagbabandila sa sinumang lumagpas na ang petsa.
:::

## Paghahanap at Paggawa ng Listahan Batay sa Custom Fields

Ganap na masasaliksik ang mga custom field:

1. Sa pahinang **People**, buksan ang [Advanced Search](../people/searching-people.md).
2. I-expand ang kategoryang **Custom Fields**.
3. Markahan ang field na gusto mong i-filter, pumili ng operator, at maglagay ng value. Ang mga inaalok na operator ay tumutugma sa uri ng field:
   - **Textbox** — naglalaman, katumbas, nagsisimula sa, nagtatapos sa.
   - **Whole Number / Decimal** — katumbas, mas malaki kaysa, mas malaki kaysa o katumbas, mas maliit kaysa, mas maliit kaysa o katumbas.
   - **Date** — katumbas, pagkatapos (mas malaki kaysa), bago (mas maliit kaysa).
   - **Yes/No** — katumbas ng Yes o No.
   - **Multiple Choice** — katumbas o naglalaman ng isa sa mga choice.

I-save ang anumang paghahanap sa custom field bilang isang [List](../people/lists.md). Ang mga listahan ay live na query, kaya't ang listahang ginawa batay sa *Background check expires is before today* ay muling che-check ang bawat tao tuwing bubuksan mo ito -- walang manu-manong pag-aalaga.

## Ano ang Mangyayari sa Merge

Kapag [pinagsama mo ang dalawang person record](../people/adding-people.md), awtomatikong lumilipat ang mga custom-field value. Ang taong pananatilihin mo ay hawak ang sarili nitong mga value; para sa anumang field na tanging ang tinanggal na tao lamang ang may value, kokopyahin ang value na iyon para walang mawala.

## Kaugnay na mga Artikulo

- [Searching People](../people/searching-people.md) — advanced search, kasama ang kategoryang Custom Fields
- [Saved Lists](../people/lists.md) — i-save ang isang paghahanap sa custom field at patakbuhin itong live
- [Roles & Permissions](./roles-permissions.md) — sino ang maaaring mag-define ng mga field at mag-edit ng mga value
- [Creating Forms](../forms/creating-forms.md) — para sa multi-question na koleksyon ng data kung saan mas angkop ang buong form kaysa sa iisang field
