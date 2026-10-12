---
title: "Pag-import ng Datos"
---

# Pag-import ng Datos

<div class="article-intro">

Pinapadali ng B1 Transfer tool ang pagdadala ng inyong kasalukuyang datos sa B1, kahit nagsisimula pa lamang kayo mula sa isang spreadsheet, lumilipat mula sa ibang church management platform, o nag-i-import ng mga talaan ng handog. Magagamit din ito para i-export o i-backup ang inyong datos anumang oras.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng aktibong B1 Admin account na may access sa **Settings**.
- Ihanda at i-export na ang inyong datos mula sa dati ninyong sistema bago magsimula.
- Ang tool na ito ay para sa paunang paglilipat ng datos. Kung matagal na kayong gumagamit ng B1, maaaring magdulot ng duplicate na record ang muling pag-import.

</div>

## Pag-access sa Transfer Tool {#accessing-the-transfer-tool}

1. Mag-log in sa **B1 Admin**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Settings**, at i-click ang **Settings**.
3. I-click ang link na **Import/Export** sa ilalim ng pangalan ng inyong simbahan sa itaas ng kaliwang settings menu.
4. Magbubukas ang **B1 Transfer** tool sa bagong tab sa [transfer.b1.church](https://transfer.b1.church).

Gagabayan kayo ng transfer tool sa apat na hakbang: Source, Preview, Destination, at Run.

---

## Hakbang 1 - Piliin ang Iyong Source {#step-1---choose-your-source}

Piliin kung saan galing ang inyong datos. May pitong opsyon:

- **B1 Database** — Kinukuha ang datos direkta mula sa kasalukuyang B1 database ng inyong simbahan. Kapaki-pakinabang para sa backup o para i-convert ang datos sa ibang format. Kailangan kayong naka-log in para magamit ang opsyong ito.
- **B1 Import Zip** — Isang zip file sa sariling format ng B1. Pangunahing ginagamit ito para ibalik ang isang nakaraang B1 export.
- **Breeze Import Zip** — Isang zip file na naglalaman ng mga file na na-export mula sa Breeze ChMS.
- **Planning Center Zip** — Isang zip o CSV file na na-export mula sa Planning Center.
- **Custom CSV / Excel** — Anumang CSV o Excel file na naglalaman ng datos ng mga tao. Pagkatapos mag-upload, ima-map ninyo ang inyong mga column sa mga field ng B1 bago magpatuloy ang import.
- **Tithe.ly CSV** — Isang people o giving export file mula sa Tithe.ly (tinatanggap ang CSV o Excel format).
- **CCB / Pushpay CSV** — Isang people o giving export CSV mula sa Church Community Builder o Pushpay.

Maaari ninyong i-drag at i-drop ang file sa upload area, o i-click para hanapin ito.

---

## Hakbang 1b - I-map ang Inyong mga Field (Custom CSV / Excel lamang) {#step-1b---map-your-fields-custom-csv--excel-only}

Kung pinili ninyo ang **Custom CSV / Excel**, pagkatapos mag-upload ng file ay magpapakita ang tool ng screen ng field mapping bago lumipat sa preview.

Nakalista ang bawat column ng inyong file kasama ang isang halimbawang value. Para sa bawat column, gamitin ang dropdown para piliin ang katugmang field ng B1. Awtomatikong tutukuyin ng tool ang mga karaniwang pangalan ng column tulad ng "First Name," "Email," o "Zip Code," pero dapat ninyong suriin ang bawat hilera at itama ang anumang hindi nito natukoy.

Kabilang sa mga available na field ng B1:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — itinatalaga ang tao sa isang group ayon sa pangalan
- **Custom Field (match by name)** — sine-save ang column sa isa sa mga [custom person field](../settings/custom-fields.md) ng inyong simbahan. Lalabas ang kahon na **B1 field name**, na may laman na pangalan ng column header. Palitan ito ng eksaktong pangalan ng field gaya ng lumalabas sa B1 (hindi mahalaga ang malaki o maliit na titik).
- **Form Answer (custom field)** — sine-save ang value ng column na iyon bilang custom field na nakakabit sa record ng tao. Kung gagamitin ninyo ang opsyong ito, hihingan kayo ng pangalan para sa form.

Maaaring nasa mga karaniwang format ang mga petsa, gaya ng `9/17/1994`, at awtomatiko itong iko-convert. Para sa mga custom field, tumatanggap ang mga Yes/No field ng mga value gaya ng Yes, No, Y, N, True, False, 1, at 0, at tumatanggap ang mga multiple-choice field ng alinman sa text ng pagpipilian o sa value nito.

:::info
Gumawa ng inyong mga custom person field sa B1 Admin bago mag-import. Pagkatapos ng import, ililista ng hakbang na **Custom Fields** ang anumang pangalan ng column na hindi tugma sa field ng B1 at bibilangin ang mga value na hindi akma sa uri ng field. Lalaktawan ang mga value na iyon, at matutuloy pa rin ang natitirang bahagi ng import.
:::

Maaaring itakda sa **(Skip)** ang mga column na ayaw ninyong i-import. Kailangang ma-map muna ang kahit isang name field (First Name o Last Name) bago kayo makapagpatuloy.

I-click ang **Confirm Mapping & Import** para magpatuloy sa preview.

---

## Hakbang 2 - I-preview ang Inyong Datos {#step-2---preview-your-data}

Pagkatapos mag-upload, ipapakita ng tool ang preview ng lahat ng ii-import. Gamitin ang mga tab para suriin ang bawat uri ng datos:

- **People** — Nakalista ayon sa household, kasama ang mga larawan kung kasama ang mga ito.
- **Groups** — Nakaayos ayon sa campus, service, oras, at kategorya.
- **Attendance** — Mga petsa ng session, group, at bilang ng pagbisita.
- **Donations** — Mga batch, fund, donor, at halaga.
- **Forms** — Mga pangalan ng form at uri ng nilalaman.

Suriin itong mabuti bago magpatuloy. Kung may mali, i-click ang **Start Over** at itama ang inyong source file.

---

## Hakbang 3 - Piliin ang Inyong Destination {#step-3---choose-your-destination}

Piliin kung saan ninyo gustong pumunta ang datos:

- **B1 Database** — Direktang ini-import sa B1 database ng inyong simbahan. Pagkatapos piliin ito, ipapakita ng tool ang huling bilang ng mga record na idaragdag. I-click ang **Start Transfer** para kumpirmahin.
- **B1 Export Zip** — Dina-download ang datos ninyo bilang zip file sa format ng B1. Mainam para sa backup.
- **Breeze Export Zip** — Kino-convert ang datos ninyo sa format ng Breeze.
- **Planning Center Zip** — Kino-convert ang datos ninyo sa format ng Planning Center.

:::warning
Hindi maaaring pareho ang format ng source at destination. Kung magkapareho sila, magbabala ang tool para maiwasan ang di-sinasadyang pagdodoble ng datos.
:::

---

## Hakbang 4 - Run {#step-4---run}

Pinoproseso ng tool ang transfer at ipinapakita ang progreso ng bawat hakbang:

- Campuses, Services, at Times
- People
- Photos
- Groups at Group Members
- Donations
- Attendance
- Forms, Questions, Answers, at Form Submissions
- Custom Fields (kapag nag-map kayo ng anumang Custom Field column)
- Compressing (para sa mga zip file destination lamang)

Kapag ang destination ay **B1 Database**, ang progress card ay pinamagatang **Import Progress** at matatapos sa **Import Complete!** (o **Import Completed with Errors**). Para sa mga zip file destination, ang parehong mensahe ay nagsasabing **Export**.

:::warning
Huwag isara ang inyong browser habang tumatakbo ang transfer. Maghintay hanggang lumitaw na kumpleto ang lahat ng hakbang.
:::

---

## Paghahanda ng Breeze Import Zip {#preparing-a-breeze-import-zip}

1. Sa Breeze, pumunta sa **Settings** at i-click ang **Export** sa kaliwang sidebar.
2. I-export ang tatlong magkakahiwalay na file: **People**, **Tags**, at **Contributions**.
3. Piliin ang lahat ng tatlong file, i-right-click, at i-compress ang mga ito sa iisang zip file.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, saka ang **Compressed (zipped) folder**.
4. I-upload ang zip file gamit ang opsyong **Breeze Import Zip** sa Hakbang 1.

Awtomatikong inililipat ng Breeze import ang mga tao, group (tags), at mga talaan ng donasyon.

---

## Paghahanda ng Planning Center Export {#preparing-a-planning-center-export}

1. Mag-log in sa Planning Center at buksan ang produktong **People**.
2. Sa kaliwang sidebar, i-click ang **Lists** at gumawa ng list na may kasamang lahat ng nais ninyong ilipat. (Kung mayroon na kayong list ng buong kongregasyon, gamitin iyon.)
3. Buksan ang list at gamitin ang opsyong **export** para i-download ang inyong mga tao bilang **CSV** file. Isama ang mga field na nais ninyong panatilihin—lahat ng name, email, phone, address, birthdate, gender, at membership status ay maililipat sa B1.
4. Kung higit sa isang file ang ibinigay ng Planning Center, piliin silang lahat, i-right-click, at i-compress sa iisang zip.
   - Sa Mac: piliin ang mga file, i-right-click, at piliin ang **Compress**.
   - Sa PC: piliin ang mga file, i-right-click, piliin ang **Send to**, saka ang **Compressed (zipped) folder**.
5. I-upload ang CSV o zip gamit ang opsyong **Planning Center Zip** sa Hakbang 1.

Pagkatapos mag-upload, magpatuloy sa preview at tiyaking tama ang mga tao at household bago patakbuhin ang import.

---

## Paghahanda ng Tithe.ly Export {#preparing-a-tithely-export}

1. Sa Tithe.ly, i-export ang inyong datos ng **People** bilang CSV o Excel file. Maaari rin kayong mag-export ng hiwalay na **Giving** file kung nais ninyong ilipat ang mga talaan ng donasyon.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng mga tao o ng giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **Tithe.ly CSV** sa Hakbang 1.

:::info
Maaaring i-import ang mga Tithe.ly export nang isang file sa bawat pagkakataon. Patakbuhin ang proseso nang dalawang beses kung kailangan ninyong i-import nang hiwalay ang datos ng mga tao at giving.
:::

---

## Paghahanda ng CCB o Pushpay Export {#preparing-a-ccb-or-pushpay-export}

1. Sa Church Community Builder o Pushpay, i-export ang inyong datos ng **People** bilang CSV file. Maaari rin kayong mag-export ng hiwalay na giving/contributions file.
2. Awtomatikong tutukuyin ng tool kung ang file ay naglalaman ng datos ng mga tao o ng giving batay sa mga pangalan ng column.
3. I-upload ang file gamit ang opsyong **CCB / Pushpay CSV** sa Hakbang 1.

---

## Pagkatapos ng Import {#after-importing}

Kapag tapos na ang transfer, maglaan ng ilang minuto para i-verify ang inyong datos:

1. Bisitahin ang pahina ng [People](../people/adding-people.md) at tingnan nang mabilis ang ilang profile.
2. Kumpirmahin na tama ang pagkakalipat ng mga pangalan, email, numero ng telepono, at address.
3. Tiyaking buo pa rin ang mga koneksyon ng household. Naipapasa ang role ng bawat tao sa household (Head, Spouse, Child, o Other) kapag mayroon nito ang source: ang column na **householdRole** sa B1 Import Zip, ang **Family Role** sa Breeze o Tithe.ly, at ang **Family Position** sa CCB / Pushpay. Ang mga role tulad ng "Head of Household", "Primary", "Wife", o "Son" ay iko-convert sa katugmang role ng B1. Walang column ng role ang mga import mula sa Planning Center at Custom CSV / Excel, kaya nakatakda sa **Other** ang mga taong ito; maaari ninyong baguhin ang role mula sa household ng tao sa pahina ng [People](../people/adding-people.md#managing-households).
4. Suriin ang anumang na-import na group at talaan ng giving.

Kung may mapansin kayong problema, maaari ninyong i-edit ang mga indibidwal na profile mula sa pahina ng People. Maaari ninyo ring patakbuhin muli ang transfer tool para [i-export ang inyong datos](exporting-data.md) bilang backup.
