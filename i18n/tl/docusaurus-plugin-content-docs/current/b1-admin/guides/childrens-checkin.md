---
title: "Gabay: Pag-set Up ng Check-In para sa Children's Ministry"
---

# Pag-set Up ng Check-In para sa Children's Ministry

<div class="article-intro">

Ginagabayan ka ng gabay na ito sa lahat ng kailangan para mapatakbo ang sistema ng check-in para sa mga bata sa iyong simbahan -- mula sa pagpasok ng mga pamilya sa database, pag-configure ng mga grupong angkop sa edad, hanggang sa pag-print ng name tag tuwing Linggo ng umaga. Pagkatapos nito, maaari nang i-check in ng mga magulang ang kanilang mga anak sa kiosk tablet at makakatanggap ng katugmang security tag.

</div>

## Training Video

<YouTube id="Ep9CBUcJwPI" title="Setting Up Children's Check-In in B1" next="Recording and Tracking Attendance in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng account ng iyong simbahan sa [admin.b1.church](https://admin.b1.church)
- Siguraduhing may admin access ka -- tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung kailangan
- Opsyonal: Maghanda ng CSV file ng mga pamilya kung manggagaling ka sa ibang sistema

</div>

## Hakbang 1: Idagdag ang Mga Pamilya sa Iyong Database

Bago gumana ang check-in, kailangang malaman ng sistema ang tungkol sa iyong mga pamilya. Kailangang naka-link ang bawat bata sa magulang sa pamamagitan ng household feature.

Sundin ang gabay na [Adding People](../people/adding-people.md) para magdagdag ng kahit isang pamilya. Siguraduhing:

- Idagdag muna ang magulang (mga magulang)
- Idagdag ang bawat bata
- I-link sila sa iisang household gamit ang [household editor](../people/adding-people.md#managing-households)

:::tip
Kung higit sa ilang pamilya ang idaragdag mo, gamitin ang [CSV Import](../people/importing-data.md) tool sa halip na isa-isahin sila. Maaari mong i-import ang buong directory sa loob ng ilang minuto.
:::

## Hakbang 2: Gumawa ng Mga Grupo ng Mga Bata

Tinutukoy ng mga grupo ang mga klaseng pinapasukan ng mga bata. Karaniwan, gusto mo ng isang grupo bawat saklaw ng edad.

Sundin ang gabay na [Creating Groups](../groups/creating-groups.md) para gumawa ng mga grupong gaya ng:

- **Nursery** (edad 0–2)
- **Preschool** (edad 3–5)
- **Elementary** (edad 6–10)

Maaari mong baguhin ang mga pangalan at saklaw ng edad para tumugma sa istruktura ng iyong ministry.

## Hakbang 3: I-configure ang Mga Campus at Serbisyo

Nakatali ang check-in sa partikular na oras ng serbisyo. Kailangan mo ng kahit isang campus at isang serbisyong naka-configure.

Sundin ang gabay na [Attendance Setup](../attendance/setup.md) para:

1. Idagdag ang iyong campus (halimbawa, "Main Campus")
2. Magdagdag ng serbisyo (halimbawa, "Sunday Morning")
3. Itakda ang oras ng serbisyo (halimbawa, "9:00 AM") at, opsyonal, isang [check-in schedule](../attendance/setup.md#setting-a-check-in-schedule) para awtomatikong magbukas ang check-in bago ang bawat serbisyo at magsara pagkatapos nito
4. Italaga ang mga grupo ng iyong mga bata sa serbisyo

## Hakbang 4: I-set Up ang Check-In App

Ngayon, pagdugtungin ang lahat sa pamamagitan ng pag-install ng check-in app sa isang tablet.

1. I-install ang **B1 Checkin app** -- tingnan ang artikulong [Check-In](../attendance/check-in.md) para sa mga download link
2. Mag-sign in gamit ang iyong B1 Admin credentials
3. Piliin ang iyong campus at oras ng serbisyo

Tingnan ang buong artikulong [Check-In](../attendance/check-in.md) para sa detalyadong hakbang ng setup.

## Hakbang 5: Kumuha ng Hardware

Kailangan mo ng tablet para sa kiosk at, opsyonal, isang Brother label printer para sa mga name tag.

Sa pinakamababa:
- **Isang Android o Amazon Fire tablet** -- tingnan ang [recommended tablets](../attendance/check-in.md#recommended-hardware)
- **Isang Brother label printer** -- inirerekomenda ang QL-1110NWB dahil sa suporta nito sa Bluetooth at WiFi
- **Brother DK-1201 labels** (1-1/7" x 3-1/2")

:::warning
Tanging mga Brother label printer lang ang tugma sa B1 Checkin app. Hindi gagana ang ibang brand ng printer.
:::

## Hakbang 6: Magpatakbo ng Test Check-In

Bago ang Linggo ng umaga, gumawa ng test run:

1. Buksan ang B1 Checkin app sa iyong tablet
2. Piliin ang iyong campus at ang tamang oras ng serbisyo
3. Hanapin ang isa sa mga pamilyang idinagdag mo
4. I-check in ang isang bata at i-verify ang:
   - Lumalabas ang attendance sa B1 Admin sa ilalim ng **Attendance**
   - Kung gumagamit ng printer, tama ang pag-print ng name tag

:::tip
Sanayin ang iyong mga boluntaryo sa welcome team tungkol sa proseso ng check-in bago ilunsad. Karaniwang sapat na ang maikling 5-minutong walkthrough.
:::

## Tapos Ka Na!

Handa na ang check-in ng iyong children's ministry. Maaaring hanapin ng mga magulang ang kanilang pamilya, piliin ang kanilang mga anak, at mag-check in sa kiosk. Awtomatikong nire-record ang attendance sa B1 Admin.

## Mga Kaugnay na Artikulo

- [Adding People](../people/adding-people.md) -- magdagdag ng mas maraming pamilya habang bumibisita sila
- [Creating Groups](../groups/creating-groups.md) -- pamahalaan ang mga grupo ng iyong mga bata
- [Attendance Setup](../attendance/setup.md) -- i-configure ang mga campus at serbisyo
- [Check-In](../attendance/check-in.md) -- detalyadong setup ng check-in app at hardware
- [Tracking Attendance](../attendance/tracking-attendance.md) -- tingnan ang mga ulat ng check-in
