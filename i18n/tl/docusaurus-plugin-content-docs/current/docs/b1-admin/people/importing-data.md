---
title: "Importing Data"
---

# Importing Data

<div class="article-intro">

Ang B1 Transfer tool ay ginagawang madali na magdala ng iyong umiiral na data sa B1, kung gumagawa ka ng simula mula sa isang spreadsheet, migrante mula sa ibang church management platform, o nag-import ng giving records. Maaari din itong gamitin upang mag-export o mag-backup ng iyong data anumang oras.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Kailangan mo ng isang aktibong B1 Admin account na may access sa **Settings**.
- Mag-export at ihanda ang iyong data mula sa iyong nakaraang sistema bago magsimula.
- Ang tool na ito ay inilaan para sa paunang data migration. Kung gumagamit ka na ng B1 sa loob ng ilang panahon, ang pag-import ulit ay maaaring lumikha ng duplicate records.

</div>

## Accessing the Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang **section menu** sa tuktok na sulok ng kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Settings**.
3. I-click ang **Import/Export** button sa tuktok na kanang bahagi ng page header.
4. Ito ay magbubukas ng **B1 Transfer** tool sa isang bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ang transfer tool ay gumagabay sa iyo sa pamamagitan ng apat na hakbang: Source, Preview, Destination, at Run.

---

## Step 1 - Choose Your Source

Piliin kung saan nanggaling ang iyong data. Mayroong pitong pagpipilian:

- **B1 Database** — Kumukuha ng data nang direkta mula sa iyong umiiral na B1 church. Kapaki-pakinabang para sa paggawa ng isang backup o pag-convert ng iyong data sa ibang format. Dapat ka ay naka-log in upang gamitin ang opsyong ito.
- **B1 Import Zip** — Isang zip file sa format ng B1. Ito ay pangunahing ginagamit upang i-restore ang isang nakaraang B1 export.
- **Breeze Import Zip** — Isang zip file na naglalaman ng mga exported files mula sa Breeze ChMS.
- **Planning Center Zip** — Isang zip o CSV file na i-export mula sa Planning Center.
- **Custom CSV / Excel** — Anumang CSV o Excel file na naglalaman ng data ng tao. Pagkatapos mag-upload, i-map mo ang iyong mga column sa B1 fields bago magpatuloy ang import.
- **Tithe.ly CSV** — Isang export file ng tao o giving mula sa Tithe.ly (tinatanggap ang CSV o Excel format).
- **CCB / Pushpay CSV** — Isang export CSV ng tao o giving mula sa Church Community Builder o Pushpay.

Maaari mong i-drag at i-drop ang iyong file sa upload area, o i-click upang browser para sa ito.

---

## Step 1b - Map Your Fields (Custom CSV / Excel only)

Kung pumili ka ng **Custom CSV / Excel**, pagkatapos mag-upload ng iyong file ang tool ay magpapakita ng isang field mapping screen bago lumipat sa preview.

Bawat column mula sa iyong file ay nakalista sa tabi ng isang sample value. Para sa bawat column, gamitin ang dropdown upang pumili ng matching B1 field. Ang tool ay awtomatikong mag-detect ng mga karaniwang pangalan ng column tulad ng "First Name," "Email," o "Zip Code," ngunit dapat mo na suriin ang bawat hilera at i-correct ang kahit ano na nawawala.

Ang mga available na B1 fields ay kinabibilangan ng:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — nagtatalaga ng tao sa isang grupo ayon sa pangalan
- **Form Answer (custom field)** -- nag-save ng halaga ng column na iyon bilang isang custom field na kakabit sa record ng tao. Kung gumagamit ka ng opsyong ito, hihilingin mo na magbigay ng pangalan sa form.

Ang mga column na hindi mo gustong i-import ay maaaring itakda sa **(Skip)**. Hindi bababa sa isang pangalan field (First Name o Last Name) ay dapat na ma-map bago maaari kang magpatuloy.

I-click ang **Confirm Mapping & Import** upang magpatuloy sa preview.

---

## Step 2 - Preview Your Data

Pagkatapos mag-upload, ang tool ay nagpapakita ng isang preview ng lahat na ia-import. Gamitin ang mga tab upang suriin ang bawat uri ng data:

- **People** — Nakalista ayon sa sambahayan, na may mga larawan kung kasama.
- **Groups** — Organized ayon sa campus, service, time, at kategorya.
- **Attendance** — Session dates, groups, at visit counts.
- **Donations** — Batches, funds, donors, at amounts.
- **Forms** — Form names at content types.

Tukuyin ito nang mabuti bago magpatuloy. Kung ang isang bagay ay mukhang hindi tama, i-click ang **Start Over** at i-correct ang iyong source file.

---

## Step 3 - Choose Your Destination

Piliin kung saan mo nais na pumunta ang data:

- **B1 Database** — Nag-import nang direkta sa database ng B1 ng iyong simbahan. Pagkatapos piliin ito, ang tool ay magpapakita ng isang final count ng mga record na maidadagdag. I-click ang **Start Transfer** upang kumpirmahin.
- **B1 Export Zip** — Nag-download ng iyong data bilang isang B1-format zip file. Mabuti para sa mga backup.
- **Breeze Export Zip** — Kino-convert ang iyong data sa Breeze format.
- **Planning Center Zip** — Kino-convert ang iyong data sa Planning Center format.

:::warning
Ang source at destination ay hindi maaaring maging parehong format. Kung tumutugma sila, ang tool ay babagabagin ka upang maiwasan ang aksidenteng duplication.
:::

---

## Step 4 - Run

Ang tool ay nagpoproseso ng transfer at nagpapakita ng pag-unlad para sa bawat hakbang:

- Campuses, Services, at Times
- People
- Photos
- Groups at Group Members
- Donations
- Attendance
- Forms, Questions, Answers, at Form Submissions
- Compressing (para sa mga zip file destinations lamang)

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Maghintay hanggang sa lahat ng mga hakbang ay ipakita bilang kumpleto.
:::

---

## Preparing a Breeze Import Zip

1. Sa Breeze, magpunta sa **Settings** at i-click ang **Export** sa left sidebar.
2. Mag-export ng tatlong hiwalay na file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong file, right-click, at i-compress ang mga ito sa isang solong zip file.
   - Sa isang Mac: piliin ang mga file, right-click, at pumili ng **Compress**.
   - Sa isang PC: piliin ang mga file, right-click, pumili ng **Send to**, pagkatapos **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang **Breeze Import Zip** option sa Step 1.

Ang Breeze import ay nag-transfer ng mga tao, grupo (tags), at donation records nang awtomatiko.

---

## Preparing a Planning Center Export

1. Mag-log in sa Planning Center at buksan ang **People** product.
2. Sa left sidebar, i-click ang **Lists** at lumikha ng isang listahan na kasama ang lahat ng nais mong dalhin. (Kung mayroon ka nang isang listahan ng iyong buong congregasyon, gamitin iyon.)
3. Buksan ang listahan at gamitin ang **export** option nito upang mag-download ng iyong mga tao bilang isang **CSV** file. Isama ang mga field na gusto mong panatilihin -- ang pangalan, email, telepono, address, birthdate, kasarian, at membership status ay lahat ay nag-map sa B1.
4. Kung binigyan ka ng Planning Center ng higit sa isang file, piliin ang lahat, right-click, at i-compress ang mga ito sa isang solong zip.
   - Sa isang Mac: piliin ang mga file, right-click, at pumili ng **Compress**.
   - Sa isang PC: piliin ang mga file, right-click, pumili ng **Send to**, pagkatapos **Compressed (zipped) folder**.
5. I-upload ang CSV o zip gamit ang **Planning Center Zip** option sa Step 1.

Pagkatapos mag-upload, magpatuloy sa preview at kumpirmahin ang iyong mga tao at sambahayan bago patakbuhin ang import.

---

## Preparing a Tithe.ly Export

1. Sa Tithe.ly, mag-export ng iyong **People** data bilang isang CSV o Excel file. Maaari ka rin mag-export ng isang hiwalay na **Giving** file kung gusto mong magdala ng donation records.
2. Ang tool ay awtomatikong makikita kung ang file ay naglalaman ng data ng tao o giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang **Tithe.ly CSV** option sa Step 1.

:::info
Ang mga Tithe.ly exports ay maaaring i-import nang isa sa isang pagkakataon. Patakbuhin ang proseso nang dalawang beses kung kailangan mong mag-import ng data ng tao at giving nang hiwalay.
:::

---

## Preparing a CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, mag-export ng iyong **People** data bilang isang CSV file. Maaari ka rin mag-export ng isang hiwalay na giving/contributions file.
2. Ang tool ay awtomatikong makikita kung ang file ay naglalaman ng data ng tao o giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang **CCB / Pushpay CSV** option sa Step 1.

---

## After Importing

Kapag kumpleto na ang transfer, gumugol ng ilang minuto upang i-verify ang iyong data:

1. Mag-browse sa [People](../people/adding-people.md) page at spot-check ng ilang mga profile.
2. Kumpirmahin na ang mga pangalan, email, mga numero ng telepono, at mga address ay dumating nang tama.
3. Suriin na ang mga koneksyon sa sambahayan ay buo pa.
4. Suriin ang anumang mga imported na mga grupo at giving records.

Kung makakita ka ng mga isyu, maaari mong i-edit ang mga indibidwal na profile mula sa People page. Maaari mo ring patakbuhin ang transfer tool ulit upang [mag-export ng iyong data](exporting-data.md) bilang isang backup.
