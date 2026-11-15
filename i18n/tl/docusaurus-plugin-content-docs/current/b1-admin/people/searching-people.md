---
title: "Paghahanap ng mga Tao"
description: "Hanapin ang directory ng mga tao sa B1 Admin ayon sa pangalan, mag-sort at pumili ng mga column sa table view, bumuo ng filter gamit ang Advanced Search, at mag-export ng mga tugma bilang CSV."
---

# Paghahanap ng mga Tao

<div class="article-intro">

Ipinapakita ng pahinang **People** ang directory ng iyong simbahan bilang listahan ng household na maaaring hanapin, o bilang table ng mga indibidwal na maaaring i-sort. Mabilis mong mahahanap ang sinumang nasa iyong kongregasyon, mapipili kung anong impormasyon ang ipapakita, at mae-export ang iyong mga resulta. Mahalaga ang mahusay na paghahanap sa pang-araw-araw na administrasyon ng simbahan, gaya ng pag-follow up sa mga bisita, paghahanda ng listahan ng contact, at pamamahala ng mga record ng miyembro.

</div>

## Training Video {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Paghahanap ng mga Tao at Pagbuo ng mga Listahan sa B1" next="Custom Fields, Bulk Editing, at Exporting sa B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may pahintulot na tingnan ang mga tao. Tingnan ang [Roles & Permissions](roles-permissions.md) kung hindi ka sigurado sa antas ng access mo.
- Dapat may mga tao na sa directory ng iyong simbahan. Kung wala ka pang nadagdag, tingnan ang [Adding People](adding-people.md) o [Importing Data](importing-data.md).

</div>

## Mga View ng Household at Table {#households-and-table-views}

Nakalista ayon sa **household** ang directory sa pahinang People, pinagpapangkat alpabetikal. Ipinapakita ng bawat hilera ang mga larawan ng household, ang pangalan nito (halimbawa, "The Smith Family"), at ang mga pangalan ng lahat ng nasa loob nito. I-click ang isang household para buksan ang profile ng head of household, o i-click ang pangalan ng sinumang miyembro para buksan ang taong iyon. May bilang sa itaas ng listahan na nagpapakita kung ilang household at tao ang ipinapakita.

Gamitin ang toggle na **View as** sa itaas ng listahan para lumipat sa pagitan ng **Households** at **Table**. Isang tao bawat hilera ang view na **Table** at dito ka makakapag-sort at makakapili ng mga column (tingnan sa ibaba). Tinatandaan ng B1 ang iyong pinili sa device na iyon.

Sa view na **Table**, lumalabas ang membership status ng bawat tao sa ilalim ng kanilang pangalan, at bawat isa sa pitong status ay may sariling kulay, ang parehong kulay na ginagamit sa profile ng tao. Ang sinumang may household role na **Child** ay nagpapakita rin ng tag na **Child** sa tabi ng status. Para markahan ang isang tao bilang bata, itakda ang kanilang role sa [household panel](./adding-people.md#managing-households) sa kanilang profile.

Bilang default, ang pahina ay nagla-load ng unang bahagi ng iyong directory. Kung may higit pang tao, i-click ang **Show All Members** sa ilalim ng listahan para i-load ang lahat.

## Mabilisang Paghahanap {#quick-search}

Hinahayaan ka ng kahon na **Find a household or person** sa itaas ng pahinang People na maghanap ng mga miyembro nang real time:

1. I-click ang **search box** sa itaas ng pahinang People.
2. Simulang mag-type ng pangalan.
3. Awtomatikong mag-fi-filter ang mga resulta habang nagta-type ka (may maikling pagkaantala na mga kalahating segundo para hindi tumakbo ang search sa bawat keystroke).
4. Ina-update ng listahan sa ibaba para ipakita lang ang mga tumutugmang resulta.

I-click ang **Clear** (sa ilalim ng search box) para i-reset ang search at ipakitang muli ang buong directory mo.

:::tip
Hindi mo kailangang pindutin ang Enter. Awtomatikong tumatakbo ang search pagkatapos mong huminto sa pag-type.
:::

## Pag-sort ng mga Resulta {#sorting-results}

Sa view na **Table**, nakalista ang mga tao ayon sa apelyido, pagkatapos ang unang pangalan. Puwede mong i-sort ang directory sa ibang paraan sa pamamagitan ng pag-click sa alinmang column header:

1. I-click ang isang **column header** (halimbawa, **Name** o **Email**) para i-sort ayon sa column na iyon.
2. I-click muli ang parehong header para baligtarin ang direksyon ng pag-sort.

Ang unang click ay nag-so-sort ng column nang pataas (A hanggang Z, pinakabata hanggang pinakamatanda, pinakaunang petsa muna), at ipinapakita ng arrow sa tabi ng header ang direksyon. Ang mga taong walang halaga sa column na iyon ay laging nasa huli. Ginagawa nitong madali ang paghahanap ng mga tao ayon sa alpabeto, edad, o anumang ibang nakikitang column.

## Pag-customize ng mga Column {#customizing-columns}

Hindi kailangang nakikita nang sabay-sabay ang bawat impormasyon. Puwede mong piliin kung aling mga column ang lalabas sa table:

1. I-click ang icon na **Select columns** sa header ng pahinang People. (Nalalapat ang mga column sa view na **Table**, kaya ang pag-check ng column ay lumilipat din sa view na **Table**.)
2. Lagyan ng check o alisan ng check ang mga column para ipakita o itago ang mga ito. Nag-aalok ang tab na **Standard** ng:
   - **Photo** at **Display Name** (nakikita bilang default)
   - **Last Name**, **First Name**, at **Middle Name**
   - **Address**, **City**, **State/Province**, at **Zip/Postal**
   - **Primary Email** at **Primary Phone** (ang mobile number, o ang home o work number kapag walang mobile)
   - **Birth Date**, **Birthday (No Year)**, at **Age**
   - **Gender**, **Membership Status**, **Campus**, **Marital Status**, at **Anniversary**
   - **Name Tag Notes**
   - **Date Added** -- kailan ginawa ang record ng tao
   - **Delete Option** -- nagdadagdag ng delete icon sa bawat hilera (iniaalok lang kung kaya mong i-edit ang mga tao)
3. Agad na ina-update ng table ang ipinapakita ayon sa iyong mga pinili. I-click ang **Done** (o **Close**) para isara ang dialog na **Select Columns**. Tinatandaan ng B1 ang iyong mga column sa device na iyon.

### Pagpapakita ng Custom Field bilang mga Column {#showing-custom-fields-as-columns}

May dalawang tab ang column chooser: nasa **Standard** ang mga built-in na column na nakalista sa itaas, at nasa **Custom** ang mga [Custom Field](../settings/custom-fields.md) ng iyong simbahan kasama ang mga tanong mula sa anumang form ng People. Lagyan ng check ang custom field sa tab na **Custom** para idagdag ito bilang column, at lalabas sa table ang halaga ng bawat tao para sa field na iyon. Ipinapakita ang mga halaga sa parehong paraan gaya ng sa profile ng tao -- ang mga field na Yes/No ay nagpapakita ng *Yes* o *No*, ang mga field na Multiple Choice ay nagpapakita ng label ng opsyon, at ang mga petsa ay ipinapakitang maikling petsa. Ang mga taong walang halaga para sa field ay may blangkong cell.


## Pag-export ng mga Resulta ng Search {#exporting-search-results}

Puwede mong i-download ang kasalukuyang resulta ng iyong search bilang CSV file anumang oras:

1. Maglapat ng anumang search o filter na gusto mo.
2. I-click ang button na **Export** sa header ng pahinang People.
3. Made-download sa iyong computer ang CSV file, handang buksan sa Excel, Google Sheets, o alinmang spreadsheet application.

Para sa karagdagang detalye sa pag-export, tingnan ang [Exporting Data](./exporting-data.md).

:::tip
Para sa mas advanced na query -- gaya ng paghahanap sa lahat ng hindi dumalo sa nakaraang tatlong buwan -- subukan ang feature na [AI Search](./ai-search.md), na nagpapahintulot sa iyong mag-search gamit ang mga tanong sa simpleng wika.
:::

## Advanced Search {#advanced-search}

Hinahayaan ka ng Advanced Search na bumuo ng tumpak na filter sa pamamagitan ng pagsasama-sama ng mga kondisyon. Buksan ito sa pamamagitan ng pag-click sa **Advanced** sa ilalim ng search box sa pahinang People, pagkatapos ay buksan ang isang kategorya at lagyan ng check ang mga field na gusto mong i-filter (puwede mong i-click ang pangalan ng field o ang checkbox nito), pumipili ng operator at halaga para sa bawat isa. Kabilang sa mga kategorya ang **Names**, **Demographics**, **Contact Information**, **Membership & Groups** (membership status, campus, date added, at membership sa grupo), **Activity** (donasyon at attendance), at **Custom Fields**.

Walang search button: awtomatikong nag-u-update ang mga resulta mga kalahating segundo pagkatapos mong baguhin ang isang filter, at dapat tumugma ang mga tao sa bawat filter na naka-check. Lumalabas bilang mga chip sa itaas ng mga kategorya ang mga filter na naka-on -- i-click ang **x** sa chip para alisin ang filter na iyon, o ang **Clear All** para alisin silang lahat. I-click muli ang **Advanced** para itago ang panel.

Para makahanap ng mga bagong tao, buksan ang **Membership & Groups** at lagyan ng check ang **Date Added**. Nagsisimula ito sa **in the last N days** na may nakalagay na 30, kaya makikita mo ang lahat ng idinagdag sa nakaraang buwan sa isang click; baguhin ang bilang ng mga araw, o lumipat sa *equals / after / before* para pumili ng petsa. Nag-aalok din ng **in the last N days** ang **Birth Date** at **Anniversary**. Ang Date Added ay naitatala lamang para sa mga taong nagawa mula huling bahagi ng Oktubre 2026; ang mga naidagdag nang mas maaga ay walang petsa, kaya hindi sila mahahanap ng filter na ito.

Inililista ng kategoryang **Custom Fields** ang mga [Custom Field](../settings/custom-fields.md) ng iyong simbahan -- ang mga field na itinakda mo sa Settings para subaybayan ang sarili mong impormasyon (gaya ng petsa ng pag-expire ng background check). Tumutugma ang mga operator na iniaalok sa uri ng bawat field: sinusuportahan ng mga text field ang *contains / equals / starts with / ends with*, sinusuportahan ng mga number field ang mga comparison operator, sinusuportahan ng mga date field ang *equals / after / before*, at hinahayaan ka ng mga field na Yes/No at Multiple Choice na pumili ng halaga. Anumang field na maaari mong i-filter dito ay maaaring i-save bilang live na [List](./lists.md).

## Pag-save ng mga Search bilang Listahan {#saving-searches-as-lists}

Pagkatapos magpatakbo ng search na nagbabalik ng kahit isang tao, lalabas ang button na **Save as List** sa header ng pahinang People (para sa mga staff na kayang mag-edit ng mga tao). I-click ito para itago ang kasalukuyan mong query sa ilalim ng pangalan at opsyonal na category, para mai-load mo ito agad sa mga susunod na session. Tingnan ang [Saved Lists](./lists.md) para sa buong detalye.
