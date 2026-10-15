---
title: "Pag-import ng Datos"
---

# Pag-import ng Datos

<div class="article-intro">

Pinapadali ng B1 Transfer tool ang paglipat ng iyong umiiral na datos sa B1, kahit nagsisimula ka sa bagong spreadsheet, lumilipat mula sa ibang church management platform, o nag-i-import ng mga talaan ng giving. Maaari rin itong gamitin upang i-export o i-backup ang iyong datos anumang oras.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may access sa **Settings**.
- I-export at ihanda ang iyong datos mula sa dati mong sistema bago magsimula.
- Ang tool na ito ay para sa paunang paglipat ng datos. Kung matagal ka nang gumagamit ng B1, maaaring gumawa ng duplicate na record ang muling pag-import.

</div>

## Pag-access sa Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Settings**, at i-click ang **Settings**.
3. I-click ang **Import/Export** link sa ilalim ng pangalan ng iyong simbahan sa itaas ng left-hand settings menu.
4. Magbubukas ang **B1 Transfer** tool sa bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ginagabayan ka ng transfer tool sa apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Iyong Source

Piliin kung saan galing ang iyong datos. May pitong opsyon:

- **B1 Database** -- Direktang kumukuha ng datos mula sa iyong kasalukuyang B1 church. Kapaki-pakinabang para sa backup o pag-convert ng iyong datos sa ibang format. Dapat ka naka-log in upang magamit ang opsyong ito.
- **B1 Import Zip** -- Zip file sa sariling format ng B1. Pangunahing ginagamit upang ibalik ang nakaraang B1 export. Ang pag-load ng B1 Export Zip pabalik sa **B1 Database** ay nagbabalik ng lahat ng dala ng export (tingnan ang [Exporting Data](./exporting-data.md#full-data-export-from-settings)). Kung hindi mabasa ang file, ipapakita ng tool ang error sa halip na magsimula muli.
- **Breeze Import Zip** -- Zip file na naglalaman ng mga exported file mula sa Breeze ChMS.
- **Planning Center Zip** -- Zip o CSV file na na-export mula sa Planning Center.
- **Custom CSV / Excel** -- Anumang CSV o Excel file na naglalaman ng datos ng tao. Pagkatapos mag-upload, ima-map mo ang iyong mga column sa mga field ng B1 bago magpatuloy ang import.
- **Tithe.ly CSV** -- Export file ng tao o giving mula sa Tithe.ly (tinatanggap ang CSV o Excel format).
- **CCB / Pushpay CSV** -- Export CSV ng tao o giving mula sa Church Community Builder o Pushpay.

Maaari mong i-drag at i-drop ang iyong file sa upload area, o i-click upang maghanap nito.

---

## Hakbang 1b - I-map ang Iyong Mga Field (Custom CSV / Excel lamang)

Kung pinili mo ang **Custom CSV / Excel**, pagkatapos mag-upload ng iyong file, magpapakita ang tool ng field mapping screen bago lumipat sa preview.

Nakalista ang bawat column ng iyong file kasama ang sample na halaga. Para sa bawat column, gamitin ang dropdown upang piliin ang katugmang field ng B1. Awtomatikong tutukuyin ng tool ang mga karaniwang pangalan ng column gaya ng "First Name," "Email," o "Zip Code," ngunit dapat mong suriin ang bawat row at itama ang anumang hindi nito natukoy.

Kabilang sa mga available na field ng B1:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name -- nag-a-assign ng tao sa isang group ayon sa pangalan
- **Custom Field (match by name)** -- sine-save ang column sa isa sa mga [custom person field](../settings/custom-fields.md) ng iyong simbahan. Lalabas ang kahon na **B1 field name**, na napunan na ng header ng column. Palitan ito ng pangalan ng field nang eksakto gaya ng nasa B1 (hindi mahalaga ang capitalization).
- **Form Answer (custom field)** -- sine-save ang halaga ng column bilang custom field na nakakabit sa record ng tao. Kung gagamitin mo ang opsyong ito, hihilingin sa iyong bigyan ng pangalan ang form.

Maaaring nasa mga karaniwang format ang mga petsa gaya ng `9/17/1994` at awtomatikong ikino-convert. Para sa custom field, tumatanggap ang Yes/No field ng mga halagang gaya ng Yes, No, Y, N, True, False, 1, at 0, at tumatanggap ang multiple-choice field ng alinman sa teksto ng pagpipilian o ng halaga nito.

:::info
Gawin ang iyong custom person field sa B1 Admin bago mag-import. Kapag natapos ang import, ililista ng **Custom Fields** step ang anumang pangalan ng column na hindi tumutugma sa field ng B1 at bibilangin ang anumang halagang hindi tugma sa uri ng field. Lalaktawan ang mga halagang iyon, at matatapos pa rin ang natitirang import.
:::

Maaaring itakda sa **(Skip)** ang mga column na ayaw mong i-import. Kailangang ma-map ang kahit isang name field (First Name o Last Name) bago ka magpatuloy.

I-click ang **Confirm Mapping & Import** upang magpatuloy sa preview.

---

## Hakbang 2 - I-preview ang Iyong Datos

Pagkatapos mag-upload, ipapakita ng tool ang preview ng lahat ng ii-import. Gamitin ang mga tab upang suriin ang bawat uri ng datos:

- **People** -- Nakalista ayon sa household, kasama ang mga larawan kung kasama.
- **Groups** -- Nakaayos ayon sa campus, service, oras, at kategorya.
- **Attendance** -- Mga petsa ng session, group, at bilang ng pagbisita.
- **Donations** -- Mga batch, fund, donor, at halaga.
- **Forms** -- Mga pangalan ng form at uri ng nilalaman.

Suriing mabuti ito bago magpatuloy. Kung may mukhang mali, i-click ang **Start Over** at itama ang iyong source file.

---

## Hakbang 3 - Piliin ang Iyong Destination

Piliin kung saan mo gustong mapunta ang datos:

- **B1 Database** -- Direktang nag-i-import sa database ng iyong simbahan sa B1. Pagkatapos piliin ito, magpapakita ang tool ng huling bilang ng mga record na idaragdag. I-click ang **Start Transfer** upang kumpirmahin.
- **B1 Export Zip** -- Dina-download ang iyong datos bilang zip file sa B1 format na maaaring ibalik sa ibang pagkakataon gamit ang **B1 Import Zip**. Mainam para sa backup.
- **Breeze Export Zip** -- Kino-convert ang iyong datos sa Breeze format.
- **Planning Center Zip** -- Kino-convert ang iyong datos sa Planning Center format.

:::warning
Hindi maaaring magkapareho ang source at destination na format. Kung magkapareho ang mga ito, magbababala ang tool upang maiwasan ang hindi sinasadyang pagdodoble.
:::

---

## Hakbang 4 - Run

Pinoproseso ng tool ang transfer at ipinapakita ang progreso ng bawat hakbang:

- Campuses, Services, at Times
- People
- Photos
- Groups at Group Members
- Donations
- Attendance
- Forms, Questions, Answers, at Form Submissions
- Custom Fields (kapag may na-map kang Custom Field column)
- Compressing (para lamang sa zip file destination)

Kapag ang destination ay **B1 Database**, ang progress card ay pinamagatang **Import Progress** at magtatapos sa **Import Complete!** (o **Import Completed with Errors**). Para sa zip file destination, ang parehong mensahe ay nagsasabing **Export**.

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Maghintay hanggang lumitaw na kumpleto ang lahat ng hakbang.
:::

---

## Paghahanda ng Breeze Import Zip

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. Mag-export ng tatlong magkakahiwalay na file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong file, i-right-click, at i-compress ang mga ito sa iisang zip file.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ang **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang opsyong **Breeze Import Zip** sa Hakbang 1.

Inililipat ng Breeze import ang mga tao, group (tags), at mga talaan ng donasyon nang awtomatiko.

---

## Paghahanda ng Planning Center Export

1. Mag-log in sa Planning Center at buksan ang produktong **People**.
2. Sa kaliwang sidebar, i-click ang **Lists** at gumawa ng listahang naglalaman ng lahat ng nais mong ilipat. (Kung mayroon ka nang listahan ng buong kongregasyon mo, gamitin iyon.)
3. Buksan ang listahan at gamitin ang opsyon nitong **export** upang i-download ang iyong mga tao bilang **CSV** file. Isama ang mga field na nais mong panatilihin -- pangalan, email, telepono, address, birthdate, gender, at membership status ay lahat na-map sa B1.
4. Kung nagbigay ang Planning Center ng higit sa isang file, piliin silang lahat, i-right-click, at i-compress sa iisang zip.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ang **Compressed (zipped) folder**.
5. I-upload ang CSV o zip gamit ang opsyong **Planning Center Zip** sa Hakbang 1.

Pagkatapos mag-upload, magpatuloy sa preview at kumpirmahin na tama ang iyong mga tao at household bago patakbuhin ang import.

---

## Paghahanda ng Tithe.ly Export

1. Sa Tithe.ly, i-export ang iyong datos ng **People** bilang CSV o Excel file. Maaari mo ring i-export ang hiwalay na **Giving** file kung nais mong ilipat ang mga talaan ng donasyon.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng tao o giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **Tithe.ly CSV** sa Hakbang 1.

:::info
Maaaring i-import ang mga Tithe.ly export nang isang file sa bawat pagkakataon. Patakbuhin ang proseso nang dalawang beses kung kailangan mong i-import ang tao at giving records nang hiwalay.
:::

---

## Paghahanda ng CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, i-export ang datos ng iyong **People** bilang CSV file. Maaari mo ring i-export ang hiwalay na giving/contributions file.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng tao o giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **CCB / Pushpay CSV** sa Hakbang 1.

---

## Pagkatapos ng Import

Kapag tapos na ang transfer, maglaan ng ilang minuto upang i-verify ang iyong datos:

1. Bisitahin ang pahina ng [People](../people/adding-people.md) at suriin ang ilang profile.
2. Kumpirmahin na tama ang pagkakalipat ng mga pangalan, email, numero ng telepono, at address.
3. Suriin na buo pa ang mga ugnayan ng household. Naipapasa ang household role ng bawat tao (Head, Spouse, Child, o Other) kapag mayroon nito ang source: ang column na **householdRole** sa B1 Import Zip, ang **Family Role** sa Breeze o Tithe.ly, at ang **Family Position** sa CCB / Pushpay. Ang mga role gaya ng "Head of Household", "Primary", "Wife", o "Son" ay i-convert sa katugmang B1 role. Ang mga import ng Planning Center at Custom CSV / Excel ay walang role column, kaya nakatakda sa **Other** ang mga taong ito; maaari mong baguhin ang role mula sa household ng tao sa pahina ng [People](../people/adding-people.md#managing-households).
4. Suriin ang anumang na-import na group at talaan ng giving.

Kung may napansin kang problema, maaari mong i-edit ang mga indibidwal na profile mula sa People page. Maaari mo ring patakbuhin muli ang transfer tool upang [i-export ang iyong datos](exporting-data.md) bilang backup.
