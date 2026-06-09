---
title: "Mga Campus"
---

# Mga Campus

<div class="article-intro">

Kung ang iyong simbahan ay nagsasagupan sa higit sa isang lokasyon, ang **Mga Campus** ay nagpapahintulot sa iyo na subaybayan kung aling site ang bawat tao at grupo ay pag-aari. Kapag na-configure na, ang mga campus ay lumalabas bilang isang pagpipilian sa mga profile ng tao, sa attendance setup, at sa dashboard ng Demographics. Ang mga multi-site na simbahan ay maaaring mag-filter, maghanap, at mag-ulat ayon sa campus sa buong B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng pahintulot na **I-edit ang Mga Setting ng Simbahan** upang pamahalaan ang mga campus. Tingnan ang [Mga Tungkulin at Pahintulot](./roles-permissions.md).

</div>

## Pagbubukas ng Mga Setting ng Campus

Sa B1 Admin, pumunta sa **Mga Setting** sa left sidebar at pumili ng **Mga Campus** mula sa navigation ng Settings. Makikita mo ang isang listahan ng lahat ng mga na-configure na campus na may kanilang pangalan, lokasyon, at timezone.

## Pagdadagdag ng isang Campus

1. I-click ang **Magdagdag ng Campus** (o ang button na **+** kung walang mga campus pa).
2. Punan ang mga detalye ng campus:
   - **Pangalan** *(kinakailangan)* — ang pangalang ipinakita sa buong B1 Admin (halimbawa, "Main Campus" o "North Campus").
   - **Tirahan** — ang street address ng campus (ginamit para sa impormasyon display; hindi pareho sa iyong pangunahing address ng simbahan sa Mga Setting ng Simbahan).
   - **Lungsod / Estado / Zip** — ang lokasyon ng campus.
   - **Timezone** — ang IANA timezone para sa campus na ito (halimbawa, *America/Chicago*). Kapaki-pakinabang kapag ang mga campus ay nasa iba't ibang time zone.
   - **Website** — isang opsyonal na URL para sa sariling web presence ng campus na ito.
3. I-click ang **Mag-save**.

## Pag-edit ng isang Campus

I-click ang anumang row ng campus sa listahan upang buksan ang editor nito sa panel sa kanang bahagi. I-update ang mga field at i-click ang **Mag-save**.

## Pagbubuksan ng isang Campus

Buksan ang isang campus para sa pag-edit at i-click ang **Buksang**. Makakatanggap ka ng katanungan upang kumpirmahin. Ang pagbubuksan ng isang campus ay hindi nag-alis ng mga taong na-assign dito — ang kanilang campus field ay nagiging blank lamang.

## Paglalaan ng mga Tao sa isang Campus

Pagkatapos ng paglikha ng mga campus, ang mga tauhan ay maaaring magtalaga ng isang tao sa isang campus mula sa kanilang profile:

1. Buksan ang rekord ng isang tao sa **Mga Tao**.
2. I-click ang **I-edit**.
3. Pumili ng campus mula sa dropdown ng **Campus**.
4. I-click ang **Mag-save**.

Maaari mo ring i-update ang campus sa bulk mula sa pahina ng Mga Tao. Pumili ng maraming mga tao, gamitin ang **Bulk Edit**, at itakda ang Campus field para sa lahat nang sabay-sabay.

## Pag-filter ayon sa Campus

Kapag na-setup na ang mga campus, maaari kang mag-filter sa buong B1 Admin ayon sa campus:

- **Paghahanap ng Mga Tao** — magdagdag ng isang kondisyon ng Campus sa advanced search, o mag-load ng isang [Nakaimbak na Lista](../people/lists.md) na-scope sa isang campus.
- **Demograpiya** — ang dashboard ng [Demograpiya](../people/demographics.md) ay nagpapakita ng isang donut chart ng Campus kapag hindi bababa sa isang tao ang may na-assign na campus.
- **Attendance Setup** — bawat oras ng serbisyo sa Attendance ay maaaring makaugnayan sa isang campus.

:::tip
Ang mga singly-location na simbahan ay hindi na kailangang mag-configure ng mga campus. Lahat ng campus feature ay opsyonal — kung walang mga campus na umiiral, ang mga campus field at chart ay simpleng hindi lumalabas.
:::

## Kaugnay na mga Artikulo

- [Mga Setting ng Simbahan](./church-settings.md) — ang iyong pangunahing address ng simbahan at branding (hiwalay mula sa mga address ng campus)
- [Demograpiya](../people/demographics.md) — ang chart ng Campus breakdown
- [Attendance Setup](../attendance/setup.md) — ikonekta ang mga oras ng serbisyo sa isang campus
- [Bulk Editing](../people/bulk-editing.md) — magtalaga ng campus sa maraming mga tao nang sabay-sabay
