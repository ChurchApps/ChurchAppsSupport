---
title: "Pag-import ng Datos"
---

# Pag-import ng Datos

<div class="article-intro">

Ginagawang madali ng B1 Transfer tool na dalhin ang iyong umiiral na datos sa B1, kahit nagsisimula ka pa lamang mula sa isang spreadsheet, lumilipat mula sa ibang church management platform, o nag-i-import ng mga tala ng giving. Magagamit din ito para i-export o i-back up ang iyong datos anumang oras.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may access sa **Settings**.
- Ihanda at i-export ang iyong datos mula sa dating sistema bago magsimula.
- Para sa paunang paglilipat ng datos ang tool na ito. Kung matagal ka nang gumagamit ng B1, maaaring gumawa ng mga duplicate na tala kung mag-i-import ka muli.

</div>

## Pagpunta sa Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Settings**, at i-click ang **Settings**.
3. I-click ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa kaliwang menu ng settings.
4. Magbubukas ang **B1 Transfer** tool sa bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ginagabayan ka ng transfer tool sa apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Source

Piliin kung saan galing ang iyong datos. May pitong opsyon:

- **B1 Database** — Direktang kinukuha ang datos mula sa kasalukuyang B1 church mo. Kapaki-pakinabang para sa backup o pag-convert ng datos sa ibang format. Kailangan kang naka-log in para magamit ang opsyong ito.
- **B1 Import Zip** — Isang zip file sa sarili ng B1 na format. Pangunahing ginagamit para ibalik ang dating B1 export. Kapag ni-load ang B1 Export Zip pabalik sa **B1 Database**, naibabalik ang lahat ng laman ng export (tingnan ang [Pag-export ng Datos](./exporting-data.md#full-data-export-from-settings)). Kung hindi mabasa ang file, ipinapakita ng tool ang error sa halip na magsimulang muli.
- **Breeze Import Zip** — Isang zip file na naglalaman ng mga na-export na file mula sa Breeze ChMS.
- **Planning Center Zip** — Isang zip o CSV file na na-export mula sa Planning Center.
- **Custom CSV / Excel** — Anumang CSV o Excel file na may datos ng tao. Pagkatapos mag-upload, imamapa mo ang iyong mga column sa mga field ng B1 bago magpatuloy ang import.
- **Tithe.ly CSV** — Isang people o giving export file mula sa Tithe.ly (tinatanggap ang CSV o Excel format).
- **CCB / Pushpay CSV** — Isang people o giving export CSV mula sa Church Community Builder o Pushpay.

Maaari mong i-drag at i-drop ang iyong file sa upload area, o i-click para mag-browse at hanapin ito.

---

## Hakbang 1b - Imapa ang Iyong mga Field (Custom CSV / Excel lamang)

Kung pinili mo ang **Custom CSV / Excel**, pagkatapos mag-upload ng file, magpapakita ang tool ng screen ng pagmamapa ng field bago lumipat sa preview.

Nakalista ang bawat column ng iyong file kasama ang isang halimbawang value. Para sa bawat column, gamitin ang dropdown para piliin ang katugmang field ng B1. Susubukan ng tool na awtomatikong tukuyin ang mga karaniwang pangalan ng column gaya ng "First Name," "Email," o "Zip Code," ngunit dapat mong suriin ang bawat row at itama ang anumang hindi nito natukoy.

Kabilang sa mga available na field ng B1:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — itinatalaga ang tao sa isang grupo ayon sa pangalan
- **Custom Field (match by name)** — ini-save ang column sa isa sa mga [custom person field](../settings/custom-fields.md) ng iyong simbahan. Lilitaw ang isang kahon na **B1 field name** na pupunan ng header ng column. Palitan ito ng eksaktong pangalan ng field gaya ng makikita sa B1 (hindi mahalaga ang malaki/maliit na titik).
- **Form Answer (custom field)** — ini-save ang value ng column na iyon bilang custom field na nakakabit sa record ng tao. Kapag ginamit mo ang opsyong ito, hihilingin sa iyong bigyan ng pangalan ang form.

Maaaring nasa mga karaniwang format ang mga petsa, gaya ng `9/17/1994`, at awtomatiko itong kino-convert. Para sa mga custom field, tumatanggap ang Yes/No fields ng mga value gaya ng Yes, No, Y, N, True, False, 1, at 0, at tumatanggap ang multiple-choice fields ng alinman sa teksto ng pagpipilian o sa value nito.

:::info
Gumawa ng iyong mga custom person field sa B1 Admin bago mag-import. Pagkatapos matapos ang import, inililista ng hakbang na **Custom Fields** ang anumang pangalan ng column na hindi tumutugma sa field ng B1, at binibilang ang anumang value na hindi akma sa uri ng field. Nilalaktawan ang mga value na iyon, at natatapos pa rin ang natitirang bahagi ng import.
:::

Maaaring itakda sa **(Skip)** ang mga column na ayaw mong i-import. Kailangang nakamapa muna ang kahit isang field ng pangalan (First Name o Last Name) bago ka makapagpatuloy.

I-click ang **Confirm Mapping & Import** para magpatuloy sa preview.

---

## Hakbang 2 - I-preview ang Iyong Datos

Pagkatapos mag-upload, ipinapakita ng tool ang preview ng lahat ng ii-import. Gamitin ang mga tab para suriin ang bawat uri ng datos:

- **People** — Nakalista ayon sa household, kasama ang mga litrato kung kasama ang mga ito.
- **Groups** — Nakaayos ayon sa campus, service, oras, at kategorya.
- **Attendance** — Mga petsa ng session, grupo, at bilang ng pagbisita.
- **Donations** — Mga batch, pondo, donor, at halaga.
- **Forms** — Mga pangalan ng form at uri ng nilalaman.

Suriing mabuti ito bago magpatuloy. Kung may mukhang mali, i-click ang **Start Over** at itama ang iyong source file.

---

## Hakbang 3 - Piliin ang Destination

Piliin kung saan mo gustong mapunta ang datos:

- **B1 Database** — Direktang nag-iimport sa B1 database ng iyong simbahan. Pagkatapos piliin ito, ipapakita ng tool ang huling bilang ng mga record na idadagdag. I-click ang **Start Transfer** para kumpirmahin.
- **B1 Export Zip** — Dinadownload ang iyong datos bilang zip file sa B1 format na maibabalik sa ibang pagkakataon gamit ang **B1 Import Zip**. Mainam para sa backup.
- **Breeze Export Zip** — Kino-convert ang iyong datos sa Breeze format.
- **Planning Center Zip** — Kino-convert ang iyong datos sa Planning Center format.

:::warning
Hindi maaaring pareho ang format ng source at destination. Kapag pareho sila, magbababala ang tool para maiwasan ang aksidenteng pagdodoble.
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
- Custom Fields (kapag nakamapa ka ng anumang Custom Field column)
- Compressing (para sa mga zip file destination lamang)

Kapag ang destination ay **B1 Database**, pinamagatang **Import Progress** ang progress card at nagtatapos sa **Import Complete!** (o **Import Completed with Errors**). Para sa mga zip file destination, ang parehong mensahe ay nagsasabing **Export**.

:::info
Kapag nire-restore ang **B1 Import Zip**, nilalaktawan ang mga record na tumuturo sa bagay na wala na sa file sa halip na itigil ang import: mga membership ng grupo para sa mga taong o grupong wala sa zip, attendance para sa mga binurang grupo o tao, at mga link sa pagitan ng mga grupo at binurang service time. Naibabalik pa rin ang mga attendance session na hindi kailanman naitali sa isang service time. Gayundin, kapag nag-e-export, inaalis ang litratong hindi ma-download o mabasa para magpatuloy ang hakbang na **Photos**.
:::

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Maghintay hanggang ipakita ng lahat ng hakbang na kumpleto na ang mga ito.
:::

---

## Paghahanda ng Breeze Import Zip

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. I-export ang tatlong magkakahiwalay na file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong file, i-right-click, at i-compress ang mga ito sa iisang zip file.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ang **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang opsyong **Breeze Import Zip** sa Hakbang 1.

Awtomatikong inililipat ng Breeze import ang mga tao, grupo (tags), at mga tala ng donasyon.

---

## Paghahanda ng Planning Center Export

1. Mag-log in sa Planning Center at buksan ang produktong **People**.
2. Sa kaliwang sidebar, i-click ang **Lists** at gumawa ng list na may kasamang lahat ng gusto mong ilipat. (Kung mayroon ka nang list ng buong kongregasyon mo, gamitin iyon.)
3. Buksan ang list at gamitin ang opsyong **export** nito para i-download ang iyong mga tao bilang **CSV** file. Isama ang mga field na gusto mong panatilihin: ang pangalan, email, telepono, address, birthdate, kasarian, at membership status ay lahat namamapa sa B1.
4. Kung higit sa isang file ang ibinigay ng Planning Center, piliin silang lahat, i-right-click, at i-compress sa iisang zip.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ang **Compressed (zipped) folder**.
5. I-upload ang CSV o zip gamit ang opsyong **Planning Center Zip** sa Hakbang 1.

Pagkatapos mag-upload, magpatuloy sa preview at kumpirmahing tama ang iyong mga tao at household bago patakbuhin ang import.

---

## Paghahanda ng Tithe.ly Export

1. Sa Tithe.ly, i-export ang iyong datos ng **People** bilang CSV o Excel file. Maaari mo ring i-export ang hiwalay na **Giving** file kung gusto mong dalhin ang mga tala ng donasyon.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng tao o giving, batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **Tithe.ly CSV** sa Hakbang 1.

:::info
Maaaring i-import ang mga Tithe.ly export nang isang file sa bawat pagkakataon. Patakbuhin ang proseso nang dalawang beses kung kailangan mong i-import nang hiwalay ang datos ng tao at giving.
:::

---

## Paghahanda ng CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, i-export ang iyong datos ng **People** bilang CSV file. Maaari mo ring i-export ang hiwalay na giving/contributions file.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng tao o giving, batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **CCB / Pushpay CSV** sa Hakbang 1.

---

## Pagkatapos ng Pag-import

Kapag natapos na ang transfer, maglaan ng ilang minuto para suriin ang iyong datos:

1. Bisitahin ang pahina ng [People](../people/adding-people.md) at silipin ang ilang profile.
2. Tiyaking tama ang pagkakalabas ng mga pangalan, email, numero ng telepono, at address.
3. Suriin kung buo pa ang mga koneksyon ng household. Dinadala ang role ng bawat tao sa household (Head, Spouse, Child, o Other) kapag mayroon nito ang source: ang column na **householdRole** sa B1 Import Zip, ang **Family Role** sa Breeze o Tithe.ly, at ang **Family Position** sa CCB / Pushpay. Ang mga role gaya ng "Head of Household", "Primary", "Wife", o "Son" ay kino-convert sa katugmang role ng B1. Walang role column ang mga import ng Planning Center at Custom CSV / Excel, kaya itinatakda sa **Other** ang mga taong iyon. Maaari mong baguhin ang role mula sa household ng tao sa pahina ng [People](../people/adding-people.md#managing-households).
4. Suriin ang anumang na-import na grupo at tala ng giving.

Kung may napansin kang problema, maaari mong i-edit ang mga indibidwal na profile mula sa pahina ng People. Maaari mo ring patakbuhin muli ang transfer tool para [i-export ang iyong datos](exporting-data.md) bilang backup.
