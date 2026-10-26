---
title: "Campuses"
---

# Mga Campus

<div class="article-intro">

Kung nagpupulong ang simbahan mo sa higit sa isang lokasyon, pinapayagan ka ng **Campuses** na subaybayan kung aling site nabibilang ang bawat tao at group. Kapag na-configure na, lalabas ang mga campus bilang opsyon sa mga profile ng tao, sa attendance setup, at sa Demographics dashboard. Maaaring i-filter, hanapin, at i-report ayon sa campus ang mga multi-site na simbahan sa buong B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Church Settings** para pamahalaan ang mga campus. Tingnan ang [Roles & Permissions](./roles-permissions.md).

</div>

## Pagbubukas ng Campus Settings

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), piliin ang **Settings > Settings**, at i-click ang **Campuses** sa listahan sa kaliwa para mag-scroll sa seksyong **Campuses**. Maaari ka ring direktang pumunta sa **/settings/campuses**. Makikita mo ang listahan ng lahat ng naka-configure na campus kasama ang kanilang pangalan, lokasyon, at time zone.

## Pagdaragdag ng Campus

1. I-click ang **Add Campus**.
2. Punan ang mga detalye ng campus:
   - **Name** *(kinakailangan)* -- ang pangalang ipinapakita sa buong B1 Admin (halimbawa, "Main Campus" o "North Campus").
   - **Address** -- ang street address ng campus (para sa impormasyon lamang; hindi ito kapareho ng pangunahing address ng simbahan sa Church Settings).
   - **City / State / Zip** -- ang lokasyon ng campus.
   - **Time Zone** -- ang IANA time zone ng campus na ito (halimbawa, *America/Chicago*). Ang [check-in schedules](../attendance/setup.md#setting-a-check-in-schedule) para sa mga serbisyo sa campus na ito ay magbubukas at magsasara ayon sa time zone na ito. Kapag nakatakda sa **None**, gagamitin ang [Time Zone](./church-settings.md#time-zone) ng simbahan mo. Kapaki-pakinabang kapag magkakaiba ang time zone ng mga campus.
   - **Website** -- opsyonal na URL para sa sariling web presence ng campus na ito.
3. I-click ang **Save**.

## Pag-edit ng Campus

I-click ang alinmang hilera ng campus sa listahan para buksan ang editor nito sa panel sa kanan. I-update ang mga field at i-click ang **Save**.

## Pagbura ng Campus

Buksan ang campus para i-edit at i-click ang **Delete**. Hihingan ka ng kumpirmasyon. Hindi binubura ng pagbura ng campus ang mga taong naka-assign dito -- nagiging blangko lamang ang kanilang campus field.

## Pag-assign ng mga Tao sa Campus

Pagkatapos gumawa ng mga campus, maaaring mag-assign ang staff ng tao sa isang campus mula sa kanyang profile:

1. Buksan ang record ng tao sa **People**.
2. I-click ang **Edit**.
3. Piliin ang campus mula sa dropdown na **Campus**.
4. I-click ang **Save**.

Maaari mo ring i-update ang campus nang maramihan mula sa pahina ng People. Pumili ng maraming tao, gamitin ang **Bulk Edit**, at itakda ang Campus field para sa lahat nang sabay.

## Pag-filter ayon sa Campus

Kapag na-set up na ang mga campus, maaari mong i-filter ayon sa campus ang buong B1 Admin:

- **People search** -- magdagdag ng Campus condition sa advanced search, o mag-load ng [Saved List](../people/lists.md) na nakatakda sa isang campus.
- **Demographics** -- ipinapakita ng [Demographics dashboard](../people/demographics.md) ang Campus donut chart kapag may kahit isang tao na may naka-assign na campus.
- **Attendance Setup** -- maaaring i-ugnay ang bawat service time sa Attendance sa isang campus.

:::tip
Hindi kailangang i-configure ng mga simbahang iisang lokasyon lamang ang campus. Opsyonal lahat ng feature ng campus -- kung walang campus, hindi lilitaw ang mga campus field at chart.
:::

## Mga Kaugnay na Artikulo

- [Church Settings](./church-settings.md) -- ang pangunahing address at branding ng simbahan mo (hiwalay sa mga address ng campus)
- [Demographics](../people/demographics.md) -- ang chart ng breakdown ayon sa Campus
- [Attendance Setup](../attendance/setup.md) -- ikonekta ang mga service time sa isang campus
- [Bulk Editing](../people/bulk-editing.md) -- mag-assign ng campus sa maraming tao nang sabay
