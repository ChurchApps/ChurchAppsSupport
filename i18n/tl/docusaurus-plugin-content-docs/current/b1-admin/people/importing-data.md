---
title: "Pag-import ng Datos"
---

# Pag-import ng Datos

<div class="article-intro">

Pinapadali ng B1 Transfer tool ang pagdadala ng iyong umiiral na datos sa B1, nagsisimula ka man mula sa isang spreadsheet, lumilipat mula sa ibang church management platform, o nag-i-import ng mga talaan ng pagbibigay. Magagamit din ito para i-export o i-back up ang iyong datos anumang oras.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may access sa **Settings**.
- Ihanda na ang iyong datos na na-export mula sa dati mong sistema bago magsimula.
- Ang tool na ito ay para sa unang paglilipat ng datos. Kung matagal mo na ring ginagamit ang B1, maaaring magdulot ng mga duplicate na record ang muling pag-import.

</div>

## Pag-access sa Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Settings**, at i-click ang **Settings**.
3. I-click ang button na **Import/Export** sa kanang itaas ng header ng pahina.
4. Bubuksan nito ang **B1 Transfer** tool sa bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ginagabayan ka ng transfer tool sa apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Iyong Source

Piliin kung saan galing ang iyong datos. May pitong opsyon:

- **B1 Database** — Direktang kumukuha ng datos mula sa umiiral mong B1 church. Kapaki-pakinabang sa paggawa ng backup o pag-convert ng iyong datos sa ibang format. Kailangan mong naka-log in para magamit ang opsyong ito.
- **B1 Import Zip** — Isang zip file sa sariling format ng B1. Pangunahing ginagamit ito para ibalik ang naunang B1 export.
- **Breeze Import Zip** — Isang zip file na naglalaman ng mga na-export na file mula sa Breeze ChMS.
- **Planning Center Zip** — Isang zip o CSV file na na-export mula sa Planning Center.
- **Custom CSV / Excel** — Anumang CSV o Excel file na naglalaman ng datos ng mga tao. Pagkatapos mag-upload, ima-map mo ang iyong mga column sa mga field ng B1 bago magpatuloy ang import.
- **Tithe.ly CSV** — Isang export file ng mga tao o pagbibigay mula sa Tithe.ly (tinatanggap ang CSV o Excel format).
- **CCB / Pushpay CSV** — Isang export CSV ng mga tao o pagbibigay mula sa Church Community Builder o Pushpay.

Maaari mong i-drag and drop ang iyong file sa upload area, o mag-click para hanapin ito.

---

## Hakbang 1b - I-map ang Iyong mga Field (Custom CSV / Excel lang)

Kung pinili mo ang **Custom CSV / Excel**, pagkatapos mong i-upload ang file, magpapakita ang tool ng screen ng field mapping bago lumipat sa preview.

Nakalista ang bawat column mula sa iyong file kasama ang sample na halaga. Para sa bawat column, gamitin ang dropdown para piliin ang katugmang field ng B1. Awtomatikong makikilala ng tool ang mga karaniwang pangalan ng column tulad ng "First Name," "Email," o "Zip Code," ngunit dapat mong suriin ang bawat hilera at itama ang anumang hindi nito nakilala.

Kabilang sa mga magagamit na field ng B1 ang:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — itinatalaga ang tao sa isang grupo ayon sa pangalan
- **Custom Field (match by name)** — sine-save ang column sa isa sa mga [custom na field ng tao](../settings/custom-fields.md) ng inyong simbahan. Lilitaw ang kahong **B1 field name**, na napunan na ng header ng column. Palitan ito ng pangalan ng field nang eksakto kung paano ito lumilitaw sa B1 (hindi mahalaga ang malaki o maliit na titik).
- **Form Answer (custom field)** — sine-save ang halaga ng column na iyon bilang custom field na nakakabit sa record ng tao. Kung gagamitin mo ang opsyong ito, hihilingin sa iyong pangalanan ang form.

Maaaring nasa karaniwang format ang mga petsa tulad ng `9/17/1994` at awtomatiko itong kino-convert. Para sa mga custom field, tinatanggap ng mga field na Yes/No ang mga halagang tulad ng Yes, No, Y, N, True, False, 1, at 0, at tinatanggap ng mga multiple-choice na field ang alinman sa teksto ng pagpipilian o ang halaga nito.

:::info
Likhain ang iyong mga custom na field ng tao sa B1 Admin bago mag-import. Kapag natapos ang import, inililista ng hakbang na **Custom Fields** ang anumang pangalan ng column na hindi tumutugma sa isang field ng B1 at binibilang ang anumang halagang hindi akma sa uri ng field. Lalaktawan ang mga halagang iyon, at matatapos pa rin ang natitirang bahagi ng import.
:::

Maaaring itakda sa **(Skip)** ang mga column na ayaw mong i-import. Kailangang may na-map na kahit isang field ng pangalan (First Name o Last Name) bago ka makapagpatuloy.

I-click ang **Confirm Mapping & Import** para magpatuloy sa preview.

---

## Hakbang 2 - I-preview ang Iyong Datos

Pagkatapos mag-upload, magpapakita ang tool ng preview ng lahat ng ii-import. Gamitin ang mga tab para suriin ang bawat uri ng datos:

- **People** — Nakalista ayon sa sambahayan, kasama ang mga larawan kung may kasama.
- **Groups** — Nakaayos ayon sa campus, serbisyo, oras, at kategorya.
- **Attendance** — Mga petsa ng session, grupo, at bilang ng pagbisita.
- **Donations** — Mga batch, pondo, donor, at halaga.
- **Forms** — Mga pangalan ng form at uri ng nilalaman.

Suriin itong mabuti bago magpatuloy. Kung may mukhang mali, i-click ang **Start Over** at itama ang iyong source file.

---

## Hakbang 3 - Piliin ang Iyong Destination

Piliin kung saan mo gustong mapunta ang datos:

- **B1 Database** — Direktang ii-import sa B1 database ng inyong simbahan. Pagkatapos piliin ito, magpapakita ang tool ng huling bilang ng mga record na idaragdag. I-click ang **Start Transfer** para kumpirmahin.
- **B1 Export Zip** — Dina-download ang iyong datos bilang zip file na nasa format ng B1. Mainam para sa mga backup.
- **Breeze Export Zip** — Kino-convert ang iyong datos sa format ng Breeze.
- **Planning Center Zip** — Kino-convert ang iyong datos sa format ng Planning Center.

:::warning
Hindi maaaring magkapareho ang format ng source at destination. Kung magkapareho ang mga ito, bibigyan ka ng babala ng tool para maiwasan ang aksidenteng pagdoble.
:::

---

## Hakbang 4 - Run

Pino-proseso ng tool ang transfer at ipinapakita ang progreso ng bawat hakbang:

- Mga Campus, Serbisyo, at Oras
- Mga Tao
- Mga Larawan
- Mga Grupo at Miyembro ng Grupo
- Mga Donasyon
- Attendance
- Mga Form, Tanong, Sagot, at Submission ng Form
- Custom Fields (kapag may na-map kang anumang column ng Custom Field)
- Compressing (para lang sa mga destinasyong zip file)

Kapag **B1 Database** ang destinasyon, ang progress card ay may pamagat na **Import Progress** at nagtatapos sa **Import Complete!** (o **Import Completed with Errors**). Para sa mga destinasyong zip file, **Export** ang nakasaad sa parehong mga mensahe.

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Hintaying ipakita ng lahat ng hakbang na tapos na ang mga ito.
:::

---

## Paghahanda ng Breeze Import Zip

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. Mag-export ng tatlong magkakahiwalay na file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong file, i-right-click, at i-compress ang mga ito sa iisang zip file.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ay **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang opsyong **Breeze Import Zip** sa Hakbang 1.

Awtomatikong inililipat ng Breeze import ang mga tao, grupo (tags), at mga talaan ng donasyon.

---

## Paghahanda ng Planning Center Export

1. Mag-log in sa Planning Center at buksan ang produktong **People**.
2. Sa kaliwang sidebar, i-click ang **Lists** at lumikha ng listahang kasama ang lahat ng gusto mong dalhin. (Kung mayroon ka nang listahan ng buong kongregasyon ninyo, gamitin iyon.)
3. Buksan ang listahan at gamitin ang **export** option nito para i-download ang iyong mga tao bilang **CSV** file. Isama ang mga field na gusto mong panatilihin — ang pangalan, email, telepono, address, petsa ng kapanganakan, kasarian, at katayuan ng pagiging miyembro ay lahat nagma-map sa B1.
4. Kung higit sa isang file ang ibinigay ng Planning Center, piliin ang lahat ng mga ito, i-right-click, at i-compress sa iisang zip.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ay **Compressed (zipped) folder**.
5. I-upload ang CSV o zip gamit ang opsyong **Planning Center Zip** sa Hakbang 1.

Pagkatapos mag-upload, magpatuloy sa preview at tiyaking tama ang itsura ng iyong mga tao at sambahayan bago patakbuhin ang import.

---

## Paghahanda ng Tithe.ly Export

1. Sa Tithe.ly, i-export ang iyong datos ng **People** bilang CSV o Excel file. Maaari ka ring mag-export ng hiwalay na file ng **Giving** kung gusto mong dalhin ang mga talaan ng donasyon.
2. Awtomatikong aalamin ng tool kung ang file ay naglalaman ng datos ng mga tao o ng pagbibigay batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **Tithe.ly CSV** sa Hakbang 1.

:::info
Maaaring i-import ang mga export ng Tithe.ly nang isang file sa bawat pagkakataon. Patakbuhin ang proseso nang dalawang beses kung kailangan mong i-import nang magkahiwalay ang mga talaan ng tao at ng pagbibigay.
:::

---

## Paghahanda ng CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, i-export ang iyong datos ng **People** bilang CSV file. Maaari ka ring mag-export ng hiwalay na file ng pagbibigay/mga kontribusyon.
2. Awtomatikong aalamin ng tool kung ang file ay naglalaman ng datos ng mga tao o ng pagbibigay batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **CCB / Pushpay CSV** sa Hakbang 1.

---

## Pagkatapos Mag-import

Kapag natapos na ang transfer, maglaan ng ilang minuto para suriin ang iyong datos:

1. I-browse ang pahina ng [People](../people/adding-people.md) at siyasatin ang ilang profile.
2. Tiyaking tama ang pagkakapasok ng mga pangalan, email, numero ng telepono, at address.
3. Tingnan na buo ang mga koneksyon ng sambahayan.
4. Suriin ang anumang na-import na grupo at mga talaan ng pagbibigay.

Kung may napansin kang problema, maaari mong i-edit ang mga indibidwal na profile mula sa pahina ng People. Maaari mo ring patakbuhin muli ang transfer tool para [i-export ang iyong datos](exporting-data.md) bilang backup.
