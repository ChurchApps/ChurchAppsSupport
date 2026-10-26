---
title: "Pag-import ng Datos"
---

# Pag-import ng Datos

<div class="article-intro">

Pinapadali ng B1 Transfer tool ang pagdadala ng iyong umiiral na datos sa B1, kahit nagsisimula ka pa lang mula sa spreadsheet, lumilipat mula sa ibang church management platform, o nag-i-import ng mga tala ng giving. Magagamit din ito para mag-export o mag-backup ng iyong datos anumang oras.

</div>

## Training Video

<YouTube id="G-VnhzACYIU" title="Importing Your People Database in B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may access sa **Settings**.
- Ihanda at i-export ang iyong datos mula sa dati mong sistema bago magsimula.
- Ang tool na ito ay para sa paunang paglilipat ng datos. Kung matagal ka nang gumagamit ng B1, maaaring magdulot ng duplicate na tala ang muling pag-import.

</div>

## Pag-access sa Transfer Tool

1. Mag-log in sa **B1 Admin**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), buksan ang **Settings**, at i-click ang **Settings**.
3. I-click ang link na **Import/Export** sa ilalim ng pangalan ng iyong simbahan sa itaas ng kaliwang menu ng settings.
4. Magbubukas ang **B1 Transfer** tool sa bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Ginagabayan ka ng transfer tool sa apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Iyong Source

Piliin kung saan galing ang iyong datos. May pitong opsyon:

- **B1 Database** — Kinukuha ang datos direkta mula sa umiiral mong simbahan sa B1. Kapaki-pakinabang para sa backup o para i-convert ang datos mo sa ibang format. Kailangan mong naka-log in para magamit ang opsyong ito.
- **B1 Import Zip** — Isang zip file sa sariling format ng B1. Pangunahing ginagamit para ibalik ang isang nakaraang B1 export. Kapag na-load ang B1 Export Zip pabalik sa **B1 Database**, naibabalik ang lahat ng dala ng export (tingnan ang [Exporting Data](./exporting-data.md#full-data-export-from-settings)). Kung hindi mabasa ang file, ipapakita ng tool ang error sa halip na magsimulang muli.
- **Breeze Import Zip** — Isang zip file na naglalaman ng mga na-export na file mula sa Breeze ChMS.
- **Planning Center Zip** — Isang zip o CSV file na na-export mula sa Planning Center.
- **Custom CSV / Excel** — Anumang CSV o Excel file na may datos ng tao. Pagkatapos i-upload, imamapa mo ang iyong mga column sa mga field ng B1 bago magpatuloy ang import.
- **Tithe.ly CSV** — Isang people o giving export file mula sa Tithe.ly (tinatanggap ang CSV o Excel format).
- **CCB / Pushpay CSV** — Isang people o giving export na CSV mula sa Church Community Builder o Pushpay.

Maaari mong i-drag at i-drop ang iyong file sa upload area, o i-click para hanapin ito.

---

## Hakbang 1b - I-map ang Iyong mga Field (Custom CSV / Excel lamang)

Kung pinili mo ang **Custom CSV / Excel**, pagkatapos i-upload ang iyong file, magpapakita ang tool ng screen ng pagmamapa ng field bago lumipat sa preview.

Nakalista ang bawat column ng iyong file kasama ang isang halimbawang halaga. Para sa bawat column, gamitin ang dropdown para piliin ang katugmang field ng B1. Awtomatikong tutukuyin ng tool ang mga karaniwang pangalan ng column tulad ng "First Name," "Email," o "Zip Code," pero dapat mong suriin ang bawat hilera at itama ang anumang hindi nito natukoy.

Kabilang sa mga available na field ng B1:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — itinatalaga ang tao sa isang group ayon sa pangalan
- **Custom Field (match by name)** — isinasave ang column sa isa sa mga [custom person field](../settings/custom-fields.md) ng iyong simbahan. Lumalabas ang kahon na **B1 field name**, na may laman na pangalan ng column header. Palitan ito ng pangalan ng field nang eksakto gaya ng nakalagay sa B1 (hindi mahalaga ang malaki/maliit na titik).
- **Form Answer (custom field)** — isinasave ang halaga ng column bilang custom field na nakakabit sa tala ng tao. Kapag ginamit mo ang opsyong ito, hihilingin sa iyong bigyan ng pangalan ang form.

Maaaring nasa mga karaniwang format tulad ng `9/17/1994` ang mga petsa at awtomatikong ikino-convert. Para sa mga custom field, tumatanggap ang mga Yes/No field ng mga halagang tulad ng Yes, No, Y, N, True, False, 1, at 0, at tumatanggap ang mga multiple-choice field ng alinman sa teksto ng pagpipilian o sa halaga nito.

:::info
Gawin ang iyong mga custom person field sa B1 Admin bago mag-import. Kapag natapos ang import, inililista ng hakbang na **Custom Fields** ang anumang pangalan ng column na hindi tumutugma sa field ng B1 at binibilang ang mga halagang hindi akma sa uri ng field. Nilalaktawan ang mga halagang iyon, at tuloy pa rin ang natitirang import.
:::

Maaaring itakda sa **(Skip)** ang mga column na ayaw mong i-import. Kailangang may naka-map na kahit isang name field (First Name o Last Name) bago ka makapagpatuloy.

I-click ang **Confirm Mapping & Import** para magpatuloy sa preview.

---

## Hakbang 2 - I-preview ang Iyong Datos

Pagkatapos mag-upload, ipinapakita ng tool ang preview ng lahat ng ii-import. Gamitin ang mga tab para suriin ang bawat uri ng datos:

- **People** — Nakalista ayon sa household, kasama ang mga larawan kung kasama ang mga ito.
- **Groups** — Nakaayos ayon sa campus, serbisyo, oras, at kategorya.
- **Attendance** — Mga petsa ng session, group, at bilang ng pagbisita.
- **Donations** — Mga batch, fund, donor, at halaga.
- **Forms** — Mga pangalan ng form at uri ng nilalaman.

Suriin ito nang mabuti bago magpatuloy. Kung may mali, i-click ang **Start Over** at itama ang iyong source file.

---

## Hakbang 3 - Piliin ang Iyong Destination

Piliin kung saan mo gustong mapunta ang datos:

- **B1 Database** — Direktang nag-i-import sa database ng B1 ng iyong simbahan. Pagkatapos piliin ito, ipapakita ng tool ang panghuling bilang ng mga tala na idaragdag. I-click ang **Start Transfer** para kumpirmahin.
- **B1 Export Zip** — Dina-download ang iyong datos bilang zip file sa format ng B1 na maibabalik sa pamamagitan ng **B1 Import Zip** sa ibang pagkakataon. Maganda para sa backup.
- **Breeze Export Zip** — Kinoconvert ang iyong datos sa format ng Breeze.
- **Planning Center Zip** — Kinoconvert ang iyong datos sa format ng Planning Center.

:::warning
Hindi maaaring pareho ang source at destination na format. Kapag pareho sila, babalaan ka ng tool para maiwasan ang hindi sinasadyang pagdodoble.
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
- Custom Fields (kapag nag-map ka ng anumang Custom Field column)
- Compressing (para sa zip file destinations lamang)

Kapag ang destination ay **B1 Database**, pamagat ng progress card ay **Import Progress** at natatapos ito sa **Import Complete!** (o **Import Completed with Errors**). Para sa zip file destinations, ang parehong mensahe ay nagsasabing **Export**.

:::info
Kapag nagre-restore ng **B1 Import Zip**, nilalaktawan ang mga tala na tumuturo sa bagay na wala na sa file sa halip na itigil ang import: mga membership ng group para sa mga tao o group na wala sa zip, attendance para sa mga tinanggal na group o tao, at mga ugnayan ng group at mga tinanggal na service time. Naibabalik pa rin ang mga attendance session na hindi kailanman naiugnay sa isang service time. Gayundin, kapag nag-e-export, hindi isinasama ang larawang hindi ma-download o mabasa para magpatuloy ang hakbang na **Photos**.
:::

:::warning
Huwag isara ang iyong browser habang tumatakbo ang transfer. Hintayin hanggang ipakita ng lahat ng hakbang na kumpleto na.
:::

---

## Paghahanda ng Breeze Import Zip

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. I-export ang tatlong magkakahiwalay na file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong file, i-right-click, at i-compress ang mga ito sa iisang zip file.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ang **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang opsyong **Breeze Import Zip** sa Hakbang 1.

Awtomatikong inililipat ng Breeze import ang mga tao, group (tags), at mga tala ng donasyon.

---

## Paghahanda ng Planning Center Export

1. Mag-log in sa Planning Center at buksan ang produktong **People**.
2. Sa kaliwang sidebar, i-click ang **Lists** at gumawa ng listahan na kasama ang lahat ng gusto mong dalhin. (Kung mayroon ka nang listahan ng buong kongregasyon mo, gamitin iyon.)
3. Buksan ang listahan at gamitin ang opsyong **export** nito para i-download ang iyong mga tao bilang **CSV** file. Isama ang mga field na gusto mong panatilihin — ang pangalan, email, telepono, address, birthdate, kasarian, at membership status ay lahat nama-map sa B1.
4. Kung higit sa isang file ang ibinigay ng Planning Center, piliin silang lahat, i-right-click, at i-compress sa iisang zip.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, pagkatapos ang **Compressed (zipped) folder**.
5. I-upload ang CSV o zip gamit ang opsyong **Planning Center Zip** sa Hakbang 1.

Pagkatapos mag-upload, magpatuloy sa preview at kumpirmahing tama ang iyong mga tao at household bago patakbuhin ang import.

---

## Paghahanda ng Tithe.ly Export

1. Sa Tithe.ly, i-export ang iyong datos na **People** bilang CSV o Excel file. Maaari ka ring mag-export ng hiwalay na **Giving** file kung gusto mong dalhin ang mga tala ng donasyon.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng tao o giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **Tithe.ly CSV** sa Hakbang 1.

:::info
Ang mga export ng Tithe.ly ay maaaring i-import nang isang file sa isang pagkakataon. Patakbuhin ang proseso nang dalawang beses kung kailangan mong i-import nang hiwalay ang mga tao at giving records.
:::

---

## Paghahanda ng CCB o Pushpay Export

1. Sa Church Community Builder o Pushpay, i-export ang iyong datos na **People** bilang CSV file. Maaari ka ring mag-export ng hiwalay na giving/contributions file.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng tao o giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **CCB / Pushpay CSV** sa Hakbang 1.

---

## Pagkatapos ng Import

Kapag tapos na ang transfer, maglaan ng ilang minuto para i-verify ang iyong datos:

1. Tingnan ang pahinang [People](../people/adding-people.md) at suriin nang mabilisan ang ilang profile.
2. Kumpirmahing tama ang mga pangalan, email, numero ng telepono, at address.
3. Suriin na buo pa ang mga ugnayan ng household. Napapanatili ang household role ng bawat tao (Head, Spouse, Child, o Other) kapag mayroon nito ang source: ang column na **householdRole** sa B1 Import Zip, ang **Family Role** sa Breeze o Tithe.ly, at ang **Family Position** sa CCB / Pushpay. Ang mga tungkulin tulad ng "Head of Household", "Primary", "Wife", o "Son" ay ikino-convert sa katugmang role ng B1. Ang Planning Center at Custom CSV / Excel import ay walang column ng role, kaya ang mga taong ito ay itinatakda sa **Other**; maaari mong palitan ang role mula sa household ng tao sa pahinang [People](../people/adding-people.md#managing-households).
4. Suriin ang anumang na-import na group at mga tala ng giving.

Kung makakita ka ng problema, maaari mong i-edit ang mga indibidwal na profile mula sa pahinang People. Maaari mo ring patakbuhin muli ang transfer tool para [i-export ang iyong datos](exporting-data.md) bilang backup.
