---
title: "Gabay: I-set Up ang Check-In para sa Ministeryo ng mga Bata"
---

# I-set Up ang Check-In para sa Ministeryo ng mga Bata

<div class="article-intro">

Inaakay ka ng gabay na ito sa lahat ng kailangan para mapatakbo ang isang children's check-in system sa iyong simbahan — mula sa paglalagay ng mga pamilya sa database, hanggang sa pag-configure ng mga grupo ayon sa edad, hanggang sa pag-print ng mga name tag sa umaga ng Linggo. Sa bandang huli, maaaring i-check in ng mga magulang ang kanilang mga anak sa isang kiosk tablet at makatanggap ng katugmang security tag.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng account ng iyong simbahan sa [admin.b1.church](https://admin.b1.church)
- Siguraduhing mayroon kang admin access — tingnan ang [Mga Tungkulin at Pahintulot](../people/roles-permissions.md) kung kinakailangan
- Opsyonal: Maghanda ng CSV file ng mga pamilya kung lumilipat ka mula sa ibang sistema

</div>

## Hakbang 1: Magdagdag ng mga Pamilya sa Iyong Database

Bago gumana ang check-in, kailangang malaman ng sistema ang tungkol sa iyong mga pamilya. Ang bawat bata ay kailangang maiugnay sa isang magulang sa pamamagitan ng household feature.

Sundin ang gabay na [Pagdaragdag ng mga Tao](../people/adding-people.md) para magdagdag ng kahit isang pamilya. Siguraduhing:

- Idagdag muna ang (mga) magulang
- Idagdag ang bawat bata
- I-link sila sa parehong household gamit ang [household editor](../people/adding-people.md#managing-households)

:::tip
Kung mayroon kang higit sa ilang pamilyang idadagdag, gamitin ang [CSV Import](../people/importing-data.md) tool sa halip na idagdag sila isa-isa. Maaari mong i-import ang iyong buong directory sa loob ng ilang minuto.
:::

## Hakbang 2: Gumawa ng mga Grupo para sa mga Bata

Tinutukoy ng mga grupo ang mga klase kung saan nagche-check in ang mga bata. Karaniwang gusto mo ng isang grupo bawat saklaw ng edad.

Sundin ang gabay na [Paggawa ng mga Grupo](../groups/creating-groups.md) para gumawa ng mga grupo tulad ng:

- **Nursery** (edad 0–2)
- **Preschool** (edad 3–5)
- **Elementary** (edad 6–10)

Maaari mong i-adjust ang mga pangalan at saklaw ng edad para tumugma sa istruktura ng iyong ministeryo.

## Hakbang 3: I-configure ang mga Campus at Serbisyo

Nakatali ang check-in sa mga partikular na oras ng serbisyo. Kailangan mo ng kahit isang campus at isang serbisyong naka-configure.

Sundin ang gabay na [Pag-setup ng Attendance](../attendance/setup.md) para:

1. Idagdag ang iyong campus (hal., "Pangunahing Campus")
2. Magdagdag ng serbisyo (hal., "Linggo ng Umaga")
3. I-set ang oras ng serbisyo (hal., "9:00 AM")
4. I-assign ang iyong mga grupo ng bata sa serbisyo

## Hakbang 4: I-set Up ang Check-In App

Ngayon, ikonekta ang lahat sa pamamagitan ng pag-install ng check-in app sa isang tablet.

1. I-install ang **B1 Checkin app** — tingnan ang artikulo ng [Check-In](../attendance/check-in.md) para sa mga download link
2. Mag-sign in gamit ang iyong B1 Admin credentials
3. Piliin ang iyong campus at oras ng serbisyo

Tingnan ang buong artikulo ng [Check-In](../attendance/check-in.md) para sa mga detalyadong hakbang sa pag-setup.

## Hakbang 5: Kunin ang Iyong Hardware

Kailangan mo ng isang tablet para sa kiosk at opsyonal na isang Brother label printer para sa mga name tag.

Sa pinakamababa:
- **Isang Android o Amazon Fire tablet** — tingnan ang [mga inirerekomendang tablet](../attendance/check-in.md#recommended-hardware)
- **Isang Brother label printer** — ang QL-1110NWB ay inirerekomenda para sa Bluetooth at WiFi support nito
- **Brother DK-1201 labels** (1-1/7" x 3-1/2")

:::warning
Ang mga Brother label printer lang ang compatible sa B1 Checkin app. Hindi gagana ang ibang brand ng printer.
:::

## Hakbang 6: Magsagawa ng Test Check-In

Bago ang umaga ng Linggo, magsagawa ng pagsubok:

1. Buksan ang B1 Checkin app sa iyong tablet
2. Piliin ang iyong campus at tamang oras ng serbisyo
3. Hanapin ang isa sa mga pamilyang idinagdag mo
4. I-check in ang isang bata at i-verify:
   - Lumilitaw ang attendance sa B1 Admin sa ilalim ng **Attendance**
   - Kung gumagamit ng printer, nai-print nang tama ang name tag

:::tip
Sanayin ang iyong mga welcome team volunteer sa proseso ng check-in bago ilunsad. Karaniwang sapat na ang isang mabilis na 5-minutong walkthrough.
:::

## Tapos Ka Na!

Handa na ang check-in ng iyong ministeryo ng mga bata. Maaaring maghanap ang mga magulang ng kanilang pamilya, piliin ang kanilang mga anak, at mag-check in sa kiosk. Awtomatikong naitala ang attendance sa B1 Admin.

## Mga Kaugnay na Artikulo

- [Pagdaragdag ng mga Tao](../people/adding-people.md) — magdagdag ng mga pamilya habang bumibisita sila
- [Paggawa ng mga Grupo](../groups/creating-groups.md) — pamahalaan ang iyong mga grupo ng bata
- [Pag-setup ng Attendance](../attendance/setup.md) — i-configure ang mga campus at serbisyo
- [Check-In](../attendance/check-in.md) — detalyadong pag-setup ng check-in app at hardware
- [Pagsubaybay ng Attendance](../attendance/tracking-attendance.md) — tingnan ang mga ulat ng check-in
