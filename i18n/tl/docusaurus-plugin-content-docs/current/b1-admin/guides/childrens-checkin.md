---
title: "Gabay: Pag-set Up ng Check-In para sa Children's Ministry"
description: "I-set up ang children's check-in sa B1 Admin: i-link ang mga pamilya, gumawa ng mga grupong ayon sa edad, mag-configure ng mga serbisyo, at mag-print ng name tag para sa B1 Checkin kiosk."
---

# Pag-set Up ng Check-In para sa Children's Ministry

<div class="article-intro">

Ginagabayan ka ng gabay na ito sa lahat ng kailangan para mapatakbo ang children's check-in system sa iyong simbahan -- mula sa paglalagay ng mga pamilya sa database, hanggang sa pag-configure ng mga grupong angkop sa edad, hanggang sa pag-print ng name tag tuwing Linggo ng umaga. Pagkatapos nito, makapag-check in na ng mga magulang ang kanilang mga anak sa kiosk tablet at makakatanggap ng katugmang security tag.

</div>

## Training Video {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Setting Up Children's Check-In in B1" next="Recording and Tracking Attendance in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng account ng iyong simbahan sa [admin.b1.church](https://admin.b1.church)
- Siguraduhing may admin access ka -- tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung kailangan
- Opsyonal: Maghanda ng CSV file ng mga pamilya kung lilipat ka mula sa ibang sistema

</div>

## Hakbang 1: Magdagdag ng Mga Pamilya sa Iyong Database {#step-1-add-families-to-your-database}

Bago gumana ang check-in, kailangang malaman ng sistema ang tungkol sa iyong mga pamilya. Kailangang naka-link ang bawat bata sa magulang sa pamamagitan ng feature na household.

Sundin ang gabay na [Adding People](../people/adding-people.md) para magdagdag ng kahit isang pamilya. Siguraduhing:

- Idagdag muna ang magulang (mga magulang)
- Idagdag ang bawat bata
- I-link sila sa iisang household gamit ang [household editor](../people/adding-people.md#managing-households)

:::tip
Kung higit sa ilang pamilya ang idadagdag mo, gamitin ang [CSV Import](../people/importing-data.md) tool sa halip na isa-isahin. Maaari mong i-import ang buong directory sa loob lamang ng ilang minuto.
:::

## Hakbang 2: Gumawa ng Mga Grupo ng Bata {#step-2-create-childrens-groups}

Tinutukoy ng mga grupo ang mga klaseng pinagche-check-in-an ng mga bata. Karaniwang gusto mo ng isang grupo kada saklaw ng edad.

Sundin ang gabay na [Creating Groups](../groups/creating-groups.md) para gumawa ng mga grupong gaya ng:

- **Nursery** (edad 0–2)
- **Preschool** (edad 3–5)
- **Elementary** (edad 6–10)

Maaari mong baguhin ang mga pangalan at saklaw ng edad para tumugma sa istruktura ng iyong ministry. Pagkatapos, buksan ang settings ng bawat grupo (i-click ang **Edit** sa page ng grupo) at:

- Itakda ang **Track Attendance** sa **Yes** para maaaring i-check-in-an ang grupo
- I-on ang **Print Nametag** (at ang **Parent Pickup** kung nagpi-print ka ng pickup tag)
- Opsyonal na itakda ang mga limitasyon sa **Age & Grade** para magmungkahi ng tamang kuwarto ang kiosk -- tingnan ang [Check-In Safety](../attendance/checkin-safety.md)

## Hakbang 3: I-configure ang Mga Campus at Serbisyo {#step-3-configure-campuses-and-services}

Nakatali ang check-in sa mga partikular na oras ng serbisyo. Kailangan mo ng kahit isang campus at isang serbisyong naka-configure.

Sundin ang gabay na [Attendance Setup](../attendance/setup.md) para:

1. Pumunta sa **People > Attendance** at i-click ang **Setup**
2. Idagdag ang iyong campus (hal., "Main Campus")
3. Magdagdag ng serbisyo (hal., "Sunday Morning")
4. Idagdag ang oras ng serbisyo (hal., "9:00 AM") at, opsyonal, isang [check-in schedule](../attendance/setup.md#setting-a-check-in-schedule) para kusang magbukas ang check-in bago ang bawat serbisyo at magsara pagkatapos nito
5. I-link ang bawat grupo ng bata sa oras ng serbisyo: buksan ang grupo, i-click ang **Edit**, piliin ang oras sa **Add Service Time**, at i-click ang plus button

## Hakbang 4: I-set Up ang Check-In App {#step-4-set-up-the-check-in-app}

Ngayon, pagdugtungin ang lahat sa pamamagitan ng pag-install ng check-in app sa isang tablet.

1. I-install ang **B1 Checkin app** -- tingnan ang artikulong [Check-In](../attendance/check-in.md) para sa mga download link
2. Mag-sign in gamit ang account na may **Checkin** attendance permission (o **Edit Attendance**) -- tingnan ang [Check-In Kiosk Accounts](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Piliin ang iyong campus at oras ng serbisyo

Tingnan ang buong artikulong [Check-In](../attendance/check-in.md) para sa detalyadong hakbang sa pag-set up.

## Hakbang 5: Kumuha ng Iyong Hardware {#step-5-get-your-hardware}

Kailangan mo ng tablet para sa kiosk at, opsyonal, isang Brother label printer para sa mga name tag.

Sa pinakakaunti:
- **Isang iPad, Android, o Amazon Fire tablet** -- tingnan ang [mga inirerekomendang tablet](../attendance/check-in.md#recommended-hardware)
- **Isang Brother label printer** -- inirerekomenda ang QL-1110NWB dahil sa suporta nito sa Bluetooth at WiFi
- **Brother DK-1201 labels** (1-1/7" x 3-1/2")

:::warning
Tanging mga Brother label printer lamang ang compatible sa B1 Checkin app. Hindi gagana ang ibang brand ng printer.
:::

## Hakbang 6: Magpatakbo ng Test Check-In {#step-6-run-a-test-check-in}

Bago ang Linggo ng umaga, gumawa ng test run:

1. Buksan ang B1 Checkin app sa iyong tablet
2. Piliin ang iyong campus at ang tamang oras ng serbisyo
3. Maghanap ng isa sa mga pamilyang idinagdag mo
4. Mag-check in ng isang bata at tiyakin ang:
   - Lumalabas ang attendance sa B1 Admin sa ilalim ng **People > Attendance**
   - Kung gumagamit ng printer, tama ang pag-print ng name tag

:::tip
Sanayin ang mga boluntaryo ng iyong welcome team sa proseso ng check-in bago ilunsad. Kadalasan, sapat na ang mabilis na 5 minutong walkthrough.
:::

## Tapos Ka Na! {#youre-done}

Handa na ang check-in ng iyong children's ministry. Maaaring hanapin ng mga magulang ang kanilang pamilya, piliin ang kanilang mga anak, at mag-check in sa kiosk. Awtomatikong naitatala ang attendance sa B1 Admin.

## Mga Kaugnay na Artikulo {#related-articles}

- [Adding People](../people/adding-people.md) -- magdagdag pa ng mga pamilya habang bumibisita sila
- [Creating Groups](../groups/creating-groups.md) -- pamahalaan ang mga grupo ng iyong mga bata
- [Attendance Setup](../attendance/setup.md) -- i-configure ang mga campus at serbisyo
- [Check-In](../attendance/check-in.md) -- detalyadong setup ng check-in app at hardware
- [Tracking Attendance](../attendance/tracking-attendance.md) -- tingnan ang mga ulat ng check-in
