---
title: "Importing Data"
---

# Importing Data

<div class="article-intro">

Ang B1 Transfer tool ay ginagawang simple na magdala ng iyong existing data sa B1, kung baguhan ka, migrando mula sa ibang church management platform, o nag-import ng giving record. Maaari din itong gamitin upang i-export o backup ang iyong data anumang oras.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng active B1 Admin account na may access sa **Settings**.
- Handa ang iyong data na nae-export at handa mula sa iyong nakaraang system bago magsimula.
- Ang tool na ito ay inilaan para sa initial data migration. Kung matagal ka nang gumagamit ng B1, ang pag-import muli ay maaaring lumikha ng duplicate record.

</div>

## Pag-access sa Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow) at piliin ang **Settings**.
3. I-click ang **Import/Export** button sa top right ng page header.
4. Ito ay bubuksan ang **B1 Transfer** tool sa isang bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ang transfer tool ay gumagabay sa iyo sa apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Iyong Source

Piliin kung saan nanggagaling ang iyong data. May pitong opsyon:

- **B1 Database** — Kumukuha ng data direkta mula sa iyong existing B1 church. Kapaki-pakinabang para sa paggawa ng backup o pag-convert ng iyong data sa ibang format. Dapat kang naka-log in upang gamitin ang opsyon na ito.
- **B1 Import Zip** — Isang zip file sa sariling format ng B1. Ito ay pangunahing ginagamit upang i-restore ang nakaraang B1 export.
- **Breeze Import Zip** — Isang zip file na naglalaman ng nae-export na file mula sa Breeze ChMS.
- **Planning Center Zip** — Isang zip o CSV file na nae-export mula sa Planning Center.
- **Custom CSV / Excel** — Anumang CSV o Excel file na naglalaman ng data ng mga tao. Pagkatapos ng pag-upload, ang iyong column ay iyong i-map sa B1 field bago ang import.
- **Tithe.ly CSV** — Isang file ng mga tao o giving export mula sa Tithe.ly (CSV o Excel format ay tinatanggap).
- **CCB / Pushpay CSV** — Isang people o giving export CSV mula sa Church Community Builder o Pushpay.

Maaari mong i-drag at i-drop ang iyong file sa upload area, o i-click upang maghanap para dito.

---

## Hakbang 1b - I-map ang Iyong Field (Custom CSV / Excel lang)

Kung pumili ka ng **Custom CSV / Excel**, pagkatapos ng pag-upload ng iyong file ang tool ay magpapakita ng field mapping screen bago lumipat sa preview.

Bawat column mula sa iyong file ay nakalista sa tabi ng halimbawa ng halaga. Para sa bawat column, gamitin ang dropdown upang piliin ang matching B1 field. Ang tool ay mag-auto-detect ng karaniwang column name tulad ng "First Name," "Email," o "Zip Code," ngunit dapat mong suriin ang bawat row at ayusin ang anumang napalampas nito.

Ang available na B1 field ay sumasaklaw sa:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — italang ang tao sa isang grupo ayon sa pangalan
- **Form Answer (custom field)** — i-save ang column value bilang custom field na naka-attach sa record ng tao. Kung gagamitin mo ang opsyon na ito, tatanungin ka na magbigay ng pangalan sa form.

Ang column na hindi mo gustong i-import ay maaaring itakda sa **(Skip)**. Hindi bababa sa isang field ng pangalan (First Name o Last Name) ay dapat na ma-map bago ka makapagpatuloy.

I-click ang **Confirm Mapping & Import** upang magpatuloy sa preview.

---

## Hakbang 2 - Tukuyin ang Iyong Data

Pagkatapos ng pag-upload, ang tool ay nagpapakita ng preview ng lahat ng idi-import. Gamitin ang tab upang suriin ang bawat uri ng data:

- **People** — Nakalista ayon sa household, na may larawan kung kasama.
- **Groups** — Iniayos ayon sa campus, service, oras, at kategorya.
- **Attendance** — Session date, grupo, at bibilangin ang bisita.
- **Donations** — Batch, fund, donor, at halaga.
- **Forms** — Ang pangalan ng form at uri ng nilalaman.

Suriin ito nang mabuti bago magpatuloy. Kung may maling bagay, i-click ang **Start Over** at ayusin ang iyong source file.

---

## Hakbang 3 - Piliin ang Iyong Destination

Piliin kung saan gusto mong mapunta ang data:

- **B1 Database** — Nag-import direkta sa database ng iyong simbahan. Pagkatapos pumili, ang tool ay magpapakita ng final count ng record na idadagdag. I-click ang **Start Transfer** upang mag-confirm.
- **B1 Export Zip** — I-download ang iyong data bilang B1-format zip file. Maganda para sa backup.
- **Breeze Export Zip** — Kung-convert ang iyong data sa Breeze format.
- **Planning Center Zip** — Kung-convert ang iyong data sa Planning Center format.

:::warning
Ang source at destination ay hindi maaaring magkaparehong format. Kung tumutugma sila, ang tool ay babagyo sa iyo upang maiwasan ang accidental duplication.
:::

---

## Hakbang 4 - Run

Ang tool ay nagpoproseso ng transfer at nagpapakita ng progress para sa bawat hakbang:

- Campus, Service, at Oras
- Mga Tao
- Larawan
- Grupo at Group Member
- Donation
- Attendance
- Form, Tanong, Sagot, at Form Submission
- Pag-compress (para sa zip file destination lang)

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Maghintay hanggang sa lahat ng hakbang ay kumpleto.
:::

---

## Paghahanda ng Breeze Import Zip

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. I-export ang tatlong hiwalay na file: **People**, **Tags**, at **Contribution**.
3. Piliin ang lahat ng tatlong file, i-right click, at i-compress ang mga ito sa isang zip file.
   - Sa isang Mac: piliin ang mga file, i-right click, at pumili ng **Compress**.
   - Sa isang PC: piliin ang mga file, i-right click, pumili ng **Send to**, pagkatapos **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang **Breeze Import Zip** option sa Hakbang 1.

Ang Breeze import ay awtomatikong naglilipat ng mga tao, grupo (tag), at donation record.

---

## Paghahanda ng Planning Center Export

1. Sa Planning Center, i-export ang iyong data ng mga tao bilang CSV o zip file.
2. I-upload ito gamit ang **Planning Center Zip** option sa Hakbang 1.

---

## Paghahanda ng Tithe.ly Export

1. Sa Tithe.ly, i-export ang iyong **People** data bilang CSV o Excel file. Maaari mo ring i-export ang hiwalay na **Giving** file kung gusto mong magdala ng donation record.
2. Ang tool ay awtomatikong matutukoy kung ang file ay naglalaman ng data ng mga tao o giving base sa column name.
3. I-upload ang file gamit ang **Tithe.ly CSV** option sa Hakbang 1.

:::info
Ang Tithe.ly export ay maaaring i-import nang isang file nang sabay-sabay. Tatakbo ang proseso ng dalawang beses kung kailangan mong mag-import ng parehong mga tao at giving record.
:::

---

## Paghahanda ng CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, i-export ang iyong **People** data bilang CSV file. Maaari mo ring i-export ang hiwalay na giving/contribution file.
2. Ang tool ay awtomatikong matutukoy kung ang file ay naglalaman ng data ng mga tao o giving base sa column name.
3. I-upload ang file gamit ang **CCB / Pushpay CSV** option sa Hakbang 1.

---

## Pagkatapos ng Pag-import

Kapag kumpleto na ang transfer, kumuha ng ilang minuto upang i-verify ang iyong data:

1. Tuklasin ang [People](../people/adding-people.md) page at mag-spot-check ng ilang profile.
2. Kumpirmahin na ang pangalan, email, numero ng telepono, at address ay dumating nang tama.
3. Suriin na ang household connection ay intakt.
4. Suriin ang anumang nai-import na grupo at giving record.

Kung may makita kang isyu, maaari mong i-edit ang individual na profile mula sa People page. Maaari mo ring i-run ang transfer tool muli upang [i-export ang iyong data](exporting-data.md) bilang backup.
