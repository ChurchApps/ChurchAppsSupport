---
title: "Custom Fields"
---

# Custom Fields

<div class="article-intro">

Hinahayaan ka ng **Custom Fields** na subaybayan ang sarili mong impormasyon sa bawat record ng tao — mga bagay na walang built-in na field ang B1, tulad ng petsa ng pag-expire ng background check, sukat ng T-shirt, o katayuan sa baptism class. Isang beses mo lang ide-define ang field sa Settings, pagkatapos ay maglalagay ka ng value sa profile ng bawat tao at maaari kang maghanap o bumuo ng mga listahan batay dito. Pinapalitan nito ang dating paraan ng paggawa ng People form para lang mag-imbak ng iisang custom na datos.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng pahintulot na mag-edit sa **People** para mag-define ng mga field at maglagay ng mga value, at access sa lugar ng **Settings**. Makikita ng sinumang may pahintulot na tumingin sa People ang mga value. Tingnan ang [Mga Tungkulin at Pahintulot](./roles-permissions.md).
- Magpasya muna kung ano ang gusto mong subaybayan at kung anong uri ang pinakaangkop (text, numero, petsa, sagot na oo/hindi, o pick-list) bago magsimula.

</div>

## Pagbubukas ng Custom Fields

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas na kaliwa), piliin ang **Settings > Settings**, at piliin ang card na **Custom Fields**. Maaari ka ring dumiretso rito sa **/settings/custom-fields**. Makikita mo ang listahan ng bawat field na na-define mo, na nagpapakita ng **Name** at **Field Type** nito. Kung wala ka pang nagagawa, ang nakasulat sa panel ay *"No custom fields have been added yet."*

## Pagdaragdag ng Field

1. I-click ang **Add Field**.
2. Sa editor na bubukas sa kanan, maglagay ng **Name** — ito ang label na makikita ng staff sa mga profile ng tao at sa paghahanap (halimbawa, *Background check expires*).
3. Pumili ng **Field Type**:
   - **Textbox** — malayang maikling text.
   - **Whole Number** — mga numerong walang decimal (halimbawa, bilang).
   - **Decimal** — mga numerong maaaring may decimal.
   - **Date** — petsa sa kalendaryo.
   - **Yes/No** — simpleng sagot na oo o hindi.
   - **Multiple Choice** — isang pick-list. Kapag pinili mo ang uring ito, lilitaw ang isang **choices editor** para maidagdag mo ang bawat opsyong mapipili ng mga tao.
4. I-click ang **Save**.

Magagamit na ngayon ang field sa profile ng bawat tao.

:::info
Ang mga uri ng field ay kapareho ng set na ginagamit sa [mga tanong ng form](../forms/creating-forms.md), kaya pare-pareho ang kilos ng mga value sa buong B1.
:::

## Pag-edit ng Field

I-click ang anumang hanay ng field sa listahan para buksan ulit ito sa editor. Baguhin ang pangalan, uri, o mga pagpipilian at i-click ang **Save**.

:::warning
Ang pagpapalit ng **Field Type** ng field na may mga value na (halimbawa, mula Textbox patungong Date) ay maaaring mag-iwan ng mga naunang inilagay na value sa format na hindi na tugma sa bagong uri. Mag-ingat sa pagpapalit ng uri kapag nagsimula nang punan ng staff ang field.
:::

## Pagbura ng Field

Buksan ang isang field para i-edit at i-click ang **Delete**. Hihingan ka ng kumpirmasyon: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* Ang pagbura ng field ay permanenteng nag-aalis dito **at ng bawat value na nakaimbak para rito** sa lahat ng tao — hindi na ito mababawi.

## Paglalagay ng mga Value sa isang Tao

Kapag may kahit isang custom field na, ang mga value nito ay nasa tabi mismo ng mga built-in na detalye sa record ng bawat tao — makikita mo ang mga ito sa **Personal Details** at ine-edit sa parehong form na ginagamit mo para sa iba pang impormasyon ng tao. Walang dagdag na lilitaw hangga't hindi mo pa na-define ang unang field mo.

1. Buksan ang record ng isang tao sa **People**.
2. Sa seksyong **Personal Details**, i-click ang button na **Edit** (lapis).
3. Mag-scroll sa lugar ng **Custom Fields** sa ibaba ng edit form at maglagay ng value para sa bawat field. Ipinapakita ng bawat field ang input na tugma sa uri nito — date picker para sa mga Date field, yes/no dropdown para sa mga Yes/No field, pick-list para sa Multiple Choice, at iba pa.
4. I-click ang **Save**. Sabay na sine-save ang iyong mga custom-field value kasama ng iba pang detalye ng tao.

Pagbalik sa profile, ang anumang field na may value ay makikita na sa seksyong **Personal Details** (ang mga sagot na Yes/No ay mababasa bilang *Yes* o *No*, at ang Multiple Choice ay nagpapakita ng label ng opsyon). Ang mga field na naiwang blangko ay itinatago lang. Para mag-alis ng value, i-edit ang tao, i-clear ang field, at i-save — ang walang lamang value ay binubura sa record sa halip na iimbak bilang blangko.

:::tip
Ang klasikong gamit nito ay kaligtasan ng mga volunteer: gumawa ng **Date** field na tinatawag na *Background check expires*, itala ang petsa ng bawat volunteer, pagkatapos ay bumuo ng [Saved List](../people/lists.md) na magmamarka sa sinumang lumampas na ang petsa.
:::

## Paghahanap at Pagbuo ng mga Listahan gamit ang Custom Fields

Ganap na mahahanap ang mga custom field:

1. Sa pahina ng **People**, buksan ang [Advanced Search](../people/searching-people.md).
2. I-expand ang kategoryang **Custom Fields**.
3. Lagyan ng check ang field na gusto mong i-filter, pumili ng operator, at maglagay ng value. Ang mga alok na operator ay tugma sa uri ng field:
   - **Textbox** — contains, equals, starts with, ends with.
   - **Whole Number / Decimal** — equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** — equals, after (greater than), before (less than).
   - **Yes/No** — equals Yes o No.
   - **Multiple Choice** — equals o contains ang isa sa mga pagpipilian.

I-save ang anumang custom-field na paghahanap bilang [List](../people/lists.md). Ang mga list ay live na query, kaya ang list na binuo sa *Background check expires is before today* ay muling sinusuri ang bawat tao tuwing bubuksan mo ito — walang mano-manong pagmementena.

## Pagpapakita ng Custom Field bilang Column

Para makita ang mga value ng isang field para sa lahat nang sabay-sabay, idagdag ito bilang column sa pahina ng **People**. Buksan ang column chooser, lumipat sa tab na **Custom**, at lagyan ng check ang field. Lalabas ang value ng bawat tao sa sarili nitong column sa tabi ng mga built-in. Tingnan ang [Pagpapakita ng Custom Fields bilang mga Column](../people/searching-people.md#showing-custom-fields-as-columns).

## Ano ang Nangyayari sa Merge

Kapag [pinagsama mo ang dalawang record ng tao](../people/adding-people.md), awtomatikong nalilipat ang mga custom-field value. Pinananatili ng taong itinatago mo ang sarili niyang mga value; para sa anumang field na ang naalis na tao lang ang may value, kokopyahin ang value na iyon para walang mawala.

## Mga Kaugnay na Artikulo

- [Paghahanap ng mga Tao](../people/searching-people.md) — advanced search, kasama ang kategoryang Custom Fields, at pagpapakita ng custom field bilang mga column
- [Mga Saved List](../people/lists.md) — i-save ang custom-field na paghahanap at patakbuhin itong muli nang live
- [Mga Tungkulin at Pahintulot](./roles-permissions.md) — sino ang maaaring mag-define ng mga field at mag-edit ng mga value
- [Paggawa ng mga Form](../forms/creating-forms.md) — para sa pangongolekta ng datos na maraming tanong kung saan mas angkop ang buong form kaysa mga solong field
