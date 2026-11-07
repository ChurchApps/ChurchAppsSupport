---
title: "Paghahanap ng Tao"
description: "Maghanap sa People directory ng B1 Admin ayon sa pangalan, mag-sort ng column sa table view, mag-filter gamit ang Advanced Search, at i-export ang tugma sa CSV."
---

# Paghahanap ng Tao

<div class="article-intro">

Ipinapakita ng pahinang **People** ang direktoryo ng iyong simbahan bilang listahan ng mga household na maaaring hanapin, o bilang table ng mga indibidwal na tao na maaaring pag-uriin. Mabilis mong mahahanap ang sinumang miyembro ng iyong kongregasyon, mapipili kung anong impormasyon ang ipapakita, at maie-export ang iyong mga resulta. Mahalaga ang mabilis na paghahanap sa pang-araw-araw na administrasyon ng simbahan, gaya ng pag-follow up sa mga bisita, paghahanda ng listahan ng contact, at pamamahala ng mga tala ng miyembro.

</div>

## Training Video

<YouTube id="7Y-tN9RmnDQ" title="Searching People and Building Lists in B1" next="Custom Fields, Bulk Editing, and Exporting in B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may permisong tingnan ang mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Dapat may mga tao sa direktoryo ng iyong simbahan. Kung wala ka pang naidadagdag na sinuman, tingnan ang [Adding People](adding-people.md) o [Importing Data](importing-data.md).

</div>

## Mga Household at Table View

Inililista ng pahinang People ang iyong direktoryo ayon sa **household**, nakaayos nang alpabeto. Ipinapakita ng bawat row ang mga larawan ng household, ang pangalan nito (halimbawa, "The Smith Family"), at ang mga pangalan ng lahat ng nasa loob nito. I-click ang isang household para buksan ang profile ng head of household, o i-click ang pangalan ng sinumang miyembro para buksan ang taong iyon. May bilang sa itaas ng listahan na nagpapakita kung ilang household at tao ang ipinapakita.

Gamitin ang toggle na **View as** sa itaas ng listahan para lumipat sa pagitan ng **Households** at **Table**. Nakalista sa view na **Table** ang isang tao kada row, at dito mo maaaring ayusin at piliin ang mga column (tingnan sa ibaba). Naaalala ng B1 ang iyong pinili sa device na iyon.

Sa view na **Table**, lumalabas ang membership status ng bawat tao sa ilalim ng kanyang pangalan, at bawat isa sa pitong status ay may sariling kulay, ang parehong kulay na ginagamit sa profile ng tao. Ang sinumang ang household role ay nakatakda sa **Child** ay nagpapakita rin ng tag na **Child** sa tabi ng status. Para markahang bata ang isang tao, itakda ang kanyang role sa [household panel](./adding-people.md#managing-households) sa kanyang profile.

Bilang default, inilo-load ng pahina ang unang bahagi ng iyong direktoryo. Kung mas maraming tao ka pa, i-click ang **Show All Members** sa ilalim ng listahan para ma-load ang lahat.

## Mabilisang Paghahanap

Ang kahon na **Find a household or person** sa itaas ng pahinang People ay nagpapahintulot na mahanap ang mga miyembro nang real time:

1. I-click ang **search box** sa itaas ng pahinang People.
2. Simulang mag-type ng pangalan.
3. Awtomatikong sasala ang mga resulta habang nagta-type ka (may kaunting paghihintay na mga kalahating segundo para hindi tumakbo ang paghahanap sa bawat keystroke).
4. Nag-a-update ang listahan sa ibaba para ipakita lamang ang mga tugmang resulta.

I-click ang **Clear** (sa ilalim ng search box) para i-reset ang paghahanap at ipakitang muli ang buong direktoryo.

:::tip
Hindi mo kailangang pindutin ang Enter. Awtomatikong tumatakbo ang paghahanap pagkatapos mong tumigil sa pag-type.
:::

## Pag-uuri ng Mga Resulta

Sa view na **Table**, nakalista ang mga tao ayon sa last name, pagkatapos first name. Maaari mong i-ayos nang iba ang direktoryo sa pamamagitan ng pag-click sa alinmang column header:

1. I-click ang isang **column header** (halimbawa, **Name** o **Email**) para i-sort ayon sa column na iyon.
2. I-click ulit ang parehong header para baligtarin ang ayos.

Madali nitong mahahanap ang mga tao nang alpabeto, ayon sa edad, o ayon sa alinmang nakikitang column.

## Pag-customize ng Mga Column

Hindi kailangang nakikita nang sabay-sabay ang lahat ng impormasyon. Maaari mong piliin kung aling mga column ang lalabas sa table:

1. I-click ang icon na **Select columns** sa header ng pahinang People. (Nalalapat ang mga column sa view na **Table**.)
2. Lagyan ng check o alisin ang check sa mga column para ipakita o itago ang mga ito. Kabilang sa mga available na column ang:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
   - **Date Added** -- kailan ginawa ang record ng tao
3. Agad mag-a-update ang table para ipakita ang iyong mga pinili. I-click ang **Done** para isara ang dialog na **Select Columns**.

### Pagpapakita ng Mga Custom Field Bilang Column {#showing-custom-fields-as-columns}

May dalawang tab ang column chooser: ang **Standard** ay naglalaman ng mga built-in na column na nakalista sa itaas, at ang **Custom** ay naglalaman ng mga [Custom Field](../settings/custom-fields.md) ng iyong simbahan kasama ang mga tanong mula sa anumang People form. Lagyan ng check ang isang custom field sa tab na **Custom** para idagdag ito bilang column, at lalabas sa table ang halaga ng bawat tao para sa field na iyon. Ipinapakita ang mga halaga gaya ng sa profile ng tao -- ang Yes/No na field ay nagpapakita ng *Yes* o *No*, ang Multiple Choice na field ay nagpapakita ng label ng opsyon, at ang mga petsa ay ipinapakita bilang maikling petsa. Ang mga taong walang halaga para sa field ay may blangkong cell.

## Pag-export ng Mga Resulta ng Paghahanap

Maaari mong i-download ang kasalukuyang resulta ng paghahanap bilang CSV file anumang oras:

1. Maglapat ng anumang paghahanap o filter na gusto mo.
2. I-click ang butones na **Export** sa header ng pahinang People.
3. Made-download sa iyong computer ang CSV file, handa nang buksan sa Excel, Google Sheets, o anumang spreadsheet application.

Para sa higit pang detalye sa pag-export, tingnan ang [Exporting Data](./exporting-data.md).

:::tip
Para sa mas advanced na query -- gaya ng paghahanap sa lahat ng hindi dumalo sa nakaraang tatlong buwan -- subukan ang feature na [AI Search](./ai-search.md), na nagpapahintulot na maghanap gamit ang mga tanong sa simpleng wika.
:::

## Advanced Search {#advanced-search}

Pinapayagan ka ng Advanced Search na bumuo ng tumpak na filter sa pamamagitan ng pagsasama-sama ng mga kondisyon. Buksan ito sa pamamagitan ng pag-click sa **Advanced** sa ilalim ng search box sa pahinang People, pagkatapos palawakin ang isang kategorya at lagyan ng check ang mga field na gusto mong i-filter (maaari mong i-click ang pangalan ng field o ang checkbox nito), pumipili ng operator at halaga para sa bawat isa. Kabilang sa mga kategorya ang **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (donasyon at attendance), at **Custom Fields**.

Para makahanap ng mga bagong tao, buksan ang **Membership** at lagyan ng check ang **Date Added**. Nagsisimula ito sa **in the last N days** na may 30 na nakalagay, para mahanap mo ang lahat ng naidagdag sa nakaraang buwan sa isang click lang; baguhin ang bilang ng mga araw, o lumipat sa *equals / after / before* para pumili ng petsa. Nag-aalok din ng **in the last N days** ang **Birth Date** at **Anniversary**. Naitatala lang ang Date Added para sa mga taong nagawa mula huling bahagi ng Oktubre 2026; ang mga naidagdag nang mas maaga ay walang petsa, kaya hindi sila mahahanap ng filter na ito.

Ang kategoryang **Custom Fields** ay naglilista ng mga [Custom Field](../settings/custom-fields.md) ng iyong simbahan -- ang mga field na ginawa mo sa Settings para subaybayan ang sarili mong impormasyon (gaya ng petsa ng pag-expire ng background check). Tumutugma ang mga operator na inaalok sa uri ng bawat field: sinusuportahan ng mga text field ang *contains / equals / starts with / ends with*, sinusuportahan ng mga number field ang mga comparison operator, sinusuportahan ng mga date field ang *equals / after / before*, at pinapayagan ka ng mga Yes/No at Multiple Choice na field na pumili ng halaga. Ang sinumang field na maaari mong i-filter dito ay maaaring i-save bilang buhay na [List](./lists.md).

## Pag-save ng Mga Paghahanap Bilang Listahan

Pagkatapos magpatakbo ng paghahanap, lalabas ang butones na **Save as List** sa header ng pahinang People. I-click ito para itago ang iyong kasalukuyang query sa ilalim ng pangalan at opsyonal na kategorya, para agad itong ma-load muli sa mga susunod na session. Tingnan ang [Saved Lists](./lists.md) para sa kumpletong detalye.
