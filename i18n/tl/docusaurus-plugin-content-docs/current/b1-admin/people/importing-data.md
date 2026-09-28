---
title: "Pag-import ng Data"
---

# Pag-import ng Data

<div class="article-intro">

Ang B1 Transfer tool ay ginagawang madali ang pagdadala ng iyong umiiral na data sa B1, kung magsisimula ka mula sa isang spreadsheet, lumipat mula sa ibang church management platform, o pag-import ng mga record ng pagbibigay. Maaari din itong gamitin upang i-export o mag-backup ng iyong data anumang oras.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng isang active B1 Admin account na may access sa **Settings**.
- Handa na ang iyong data na na-export at handa mula sa iyong nakaraang sistema bago magsimula.
- Ang tool na ito ay inilaan para sa paunang data migration. Kung matagal ka nang gumagamit ng B1, ang pag-import ulit ay maaaring lumikha ng mga duplicate record.

</div>

## Pag-access sa Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang **section menu** sa itaas-kaliwa na sulok (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Settings**.
3. I-click ang **Import/Export** button sa itaas na kanang bahagi ng page header.
4. Ito ay bubuksan ang **B1 Transfer** tool sa isang bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ang transfer tool ay gumagabay sa iyo sa pamamagit ng apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Iyong Source

Piliin kung saan nanggaling ang iyong data. May pitong opsyon:

- **B1 Database** -- Kinuha nang direkta ang data mula sa iyong umiiral na B1 church. Kapaki-pakinabang para sa paglikha ng isang backup o pag-convert ng iyong data sa ibang format. Dapat kang naka-log in upang gamitin ang opsyon na ito.
- **B1 Import Zip** -- Isang zip file sa sariling format ng B1. Ito ay pangunahing ginagamit upang ibalik ang isang nakaraang B1 export.
- **Breeze Import Zip** -- Isang zip file na naglalaman ng na-export na mga file mula sa Breeze ChMS.
- **Planning Center Zip** -- Isang zip o CSV file na na-export mula sa Planning Center.
- **Custom CSV / Excel** -- Anumang CSV o Excel file na naglalaman ng data ng mga tao. Pagkatapos mag-upload, ie-map mo ang iyong mga haligi sa mga larangan ng B1 bago ang import ay magpatuloy.
- **Tithe.ly CSV** -- Isang file ng pagbibigay o pag-export ng mga tao mula sa Tithe.ly (CSV o Excel format ay tinatanggap).
- **CCB / Pushpay CSV** -- Isang CSV mula sa Church Community Builder o Pushpay na nag-export ng mga tao o pagbibigay.

Maaari mong i-drag at i-drop ang iyong file sa upload area, o i-click upang tuklasin ito.

---

## Hakbang 1b - Map Ang Iyong Mga Larangan (Custom CSV / Excel lamang)

Kung pinili mo ang **Custom CSV / Excel**, pagkatapos mag-upload ng iyong file ang tool ay magpapakita ng isang field mapping screen bago lumipat sa preview.

Bawat haligi mula sa iyong file ay nakalista kasama ng isang sample value. Para sa bawat haligi, gamitin ang dropdown upang pumili ng tumutugmang larangan ng B1. Ang tool ay awtomatikong tutukoy ng mga pangalan ng haligi tulad ng "First Name," "Email," o "Zip Code," ngunit dapat mong suriin ang bawat hilera at itama ang anumang hindi nito nabigo.

Ang mga available na larangan ng B1 ay may kasamang:

- Pangalan, Pangalawang Pangalan, Pangalawang Pangalan, Pangalan, Pangalan na Ipakita, Pamagat/Prefix, Suffix
- Email, Telepono sa Bahay, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, Lungsod, Estado, Zip Code
- Araw ng Pagkapanganakan, Anniversary, Kasarian, Status ng Kasal, Status ng Pagiging Miyembro
- Pangalan ng Tahanan/Pamilya
- Pangalan ng Grupo -- nagtatalaga ng tao sa isang grupo ayon sa pangalan
- **Custom Field (tugma ayon sa pangalan)** -- nagsasave ng haligi sa isa sa iyong [custom person fields](../settings/custom-fields.md) ng simbahan. Ang **B1 field name** box ay lilitaw, puno sa pangalan ng haligi. Baguhin ito sa pangalan ng larangan nang eksaktong tulad ng lumilitaw ito sa B1 (ang capitalization ay hindi mahalaga).
- **Form Answer (custom field)** -- nagsasave ng halaga ng haligi na iyon bilang isang customized na larangan na nakalakay sa record ng tao. Kung gumagamit ka ng opsyon na ito, hihilingin ka na bigyan ng pangalan ang form.

Ang mga petsa ay maaaring sa mga karaniwang format tulad ng `9/17/1994` at awtomatikong na-convert. Para sa mga customized na larangan, ang Oo/Hindi field ay tumatanggap ng mga halaga tulad ng Oo, Hindi, Y, N, Totoo, Mali, 1, at 0, at maraming pagpipilian ang tumatanggap ng teksto ng pagpipilian o halaga nito.

:::info
Lumikha ng iyong mga customized na larangan ng tao sa B1 Admin bago ang import. Kapag ang import ay tapos na, ang hakbang ng **Custom Fields** ay naglalista ng anumang mga pangalan ng haligi na hindi tumutugma sa larangan ng B1 at binibilang ang anumang mga halaga na hindi umaangkop sa uri ng larangan. Ang mga halaga na iyon ay natatapusan, at ang natitira ng import ay patuloy pa rin.
:::

Ang mga haligi na hindi mo nais na i-import ay maaaring itakda sa **(Skip)**. Kahit isang field ng pangalan (Pangalan o Pangalawang Pangalan) ay dapat na ma-map bago ka maaaring magpatuloy.

I-click ang **Kumpirmahin ang Pag-map & I-import** upang magpatuloy sa preview.

---

## Hakbang 2 - I-preview ang Iyong Data

Pagkatapos mag-upload, ang tool ay nagpapakita ng isang preview ng lahat ng mga bagay na ia-import. Gamitin ang mga tab upang suriin ang bawat uri ng data:

- **Mga Tao** -- Nalista ayon sa tahanan, na may mga larawan kung kasama.
- **Mga Grupo** -- Naayos ayon sa campus, serbisyo, oras, at kategorya.
- **Dumalo** -- Mga petsa ng session, mga grupo, at mga bilang ng pagbisita.
- **Mga Donation** -- Mga batch, mga pondo, mga donor, at mga halaga.
- **Mga Form** -- Mga pangalan ng form at mga uri ng nilalaman.

Suriin ito nang maingat bago magpatuloy. Kung may problema, i-click ang **Magsimula Ulit** at itama ang iyong source file.

---

## Hakbang 3 - Piliin ang Iyong Destinasyon

Pumili kung saan gusto mong pumunta ang data:

- **B1 Database** -- Nag-import nang direkta sa database ng B1 ng iyong simbahan. Pagkatapos pumili nito, ang tool ay magpapakita ng isang panghuling bilang ng mga record na maidagdag. I-click ang **Simulan ang Transfer** upang kumpirmahin.
- **B1 Export Zip** -- Nag-download ng iyong data bilang isang B1-format na zip file. Mabuti para sa mga backup.
- **Breeze Export Zip** -- I-convert ang iyong data sa Breeze format.
- **Planning Center Zip** -- I-convert ang iyong data sa Planning Center format.

:::warning
Ang source at destination ay hindi maaaring maging parehong format. Kung tugma sila, ang tool ay babagal sa iyo upang pumigil sa aksidental na pagbalik.
:::

---

## Hakbang 4 - Patakbuhin

Ang tool ay nagpoproseso ng transfer at nagpapakita ng progreso para sa bawat hakbang:

- Mga Campus, Mga Serbisyo, at Oras
- Mga Tao
- Mga Larawan
- Mga Grupo at Mga Miyembro ng Grupo
- Mga Donation
- Dumalo
- Mga Form, Mga Tanong, Mga Sagot, at Mga Pagsusumite ng Form
- Mga Customized na Larangan (kapag na-map mo ang anumang Custom Field columns)
- Pag-compress (para sa mga destinasyon ng zip file lamang)

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Maghintay hanggang sa lahat ng mga hakbang ay kumpleto.
:::

---

## Pag-handa ng Breeze Import Zip

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. I-export ang tatlong magkakaibang mga file: **Mga Tao**, **Mga Tag**, at **Mga Kontribusyon**.
3. Pumili ng lahat ng tatlong file, right-click, at i-compress ang mga ito sa isang zip file.
   - Sa isang Mac: pumili ng mga file, right-click, at pumili ng **Compress**.
   - Sa isang PC: pumili ng mga file, right-click, pumili ng **I-padala sa**, pagkatapos ay **Compressed (zipped) folder**.
4. Mag-upload ng zip file gamit ang opsyon na **Breeze Import Zip** sa Hakbang 1.

Ang Breeze import ay awtomatikong naglilipat ng mga tao, mga grupo (tag), at mga record ng donation.

---

## Pag-handa ng Planning Center Export

1. Mag-log in sa Planning Center at buksan ang produkto ng **Mga Tao**.
2. Sa kaliwang sidebar, i-click ang **Mga Listahan** at lumikha ng isang listahan na kinabibilangan ang lahat na nais mong dalhin. (Kung mayroon ka nang isang listahan ng buong congregation, gamitin ang iyon.)
3. Buksan ang listahan at gamitin ang opsyon ng **export** upang i-download ang iyong mga tao bilang isang **CSV** file. Isama ang mga larangan na nais mong panatilihin -- ang pangalan, email, telepono, address, birthdate, kasarian, at membership status ay lahat ng mapa sa B1.
4. Kung ang Planning Center ay nagbigay sa iyo ng higit sa isang file, pumili ng mga ito, right-click, at i-compress ang mga ito sa isang zip.
   - Sa isang Mac: pumili ng mga file, right-click, at pumili ng **Compress**.
   - Sa isang PC: pumili ng mga file, right-click, pumili ng **I-padala sa**, pagkatapos ay **Compressed (zipped) folder**.
5. Mag-upload ng CSV o zip gamit ang opsyon na **Planning Center Zip** sa Hakbang 1.

Pagkatapos mag-upload, magpatuloy sa preview at kumpirmahin ang iyong mga tao at mga tahanan ay mukhang tama bago patakbuhin ang import.

---

## Pag-handa ng Tithe.ly Export

1. Sa Tithe.ly, i-export ang iyong data ng **Mga Tao** bilang isang CSV o Excel file. Maaari mo ring i-export ang isang magkakaibang file ng **Pagbibigay** kung nais mong magdala ng mga record ng donation.
2. Ang tool ay awtomatikong matutukoy kung ang file ay naglalaman ng data ng mga tao o pagbibigay base sa mga pangalan ng haligi.
3. Mag-upload ng file gamit ang opsyon na **Tithe.ly CSV** sa Hakbang 1.

:::info
Ang Tithe.ly exports ay maaaring i-import nang isa't isa. Patakbuhin ang proseso nang dalawang beses kung kailangan mong i-import ang parehong mga tao at pagbibigay na mga record nang magkakahiwalay.
:::

---

## Pag-handa ng CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, i-export ang iyong data ng **Mga Tao** bilang isang CSV file. Maaari mo ring i-export ang isang magkakaibang file ng pagbibigay/mga kontribusyon.
2. Ang tool ay awtomatikong matutukoy kung ang file ay naglalaman ng data ng mga tao o pagbibigay base sa mga pangalan ng haligi.
3. Mag-upload ng file gamit ang opsyon na **CCB / Pushpay CSV** sa Hakbang 1.

---

## Pagkatapos ng Pag-import

Kapag ang transfer ay kumpleto, maglaan ng ilang minuto upang patunayan ang iyong data:

1. Tuklasin ang [Mga Tao](../people/adding-people.md) na pahina at spot-check ng ilang mga profile.
2. Kumpirmahin na ang mga pangalan, email, mga telepono, at mga address ay dumating nang tama.
3. Suriin na ang mga koneksyon ng tahanan ay buo.
4. Suriin ang anumang mga na-import na grupo at mga record ng pagbibigay.

Kung napapansin mo ang mga isyu, maaari mong i-edit ang mga indibidwal na profile mula sa Mga Tao na pahina. Maaari mo ring ipatakbo ang transfer tool ulit upang [i-export ang iyong data](exporting-data.md) bilang isang backup.
