---
title: "Mga Campus"
description: "I-set up ang mga campus sa B1 Admin para masubaybayan kung aling site ang kinabibilangan ng bawat tao at grupo, pagkatapos i-filter ang mga tao, attendance, at demographics ayon sa lokasyon."
---

# Mga Campus

<div class="article-intro">

Kung nagkikita ang iyong simbahan sa higit sa isang lokasyon, hinahayaan ka ng **Campuses** na subaybayan kung aling site ang kinabibilangan ng bawat tao at grupo. Kapag na-configure na, lalabas ang mga campus bilang opsyon sa mga profile ng tao, sa attendance setup, at sa Demographics dashboard. Maaaring i-filter, hanapin, at i-report ayon sa campus ang mga simbahang may maraming site sa buong B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Church Settings** para mamahala ng mga campus. Tingnan ang [Roles & Permissions](./roles-permissions.md).

</div>

## Pagbubukas ng Campus Settings {#opening-campus-settings}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), piliin ang **Settings > Settings**, at i-click ang **Campuses** sa listahan sa kaliwa para mag-scroll sa seksyong **Campuses**. Maaari ka ring dumiretso roon sa **/settings/campuses**. Makikita mo ang listahan ng lahat ng naka-configure na campus kasama ang pangalan, lokasyon, at time zone nito.

## Pagdaragdag ng Campus {#adding-a-campus}

1. I-click ang **Add Campus**.
2. Punan ang mga detalye ng campus:
   - **Name** *(kinakailangan)* -- ang display name na ipinapakita sa buong B1 Admin (halimbawa, "Main Campus" o "North Campus").
   - **Address** at **Address Line 2** -- ang street address ng campus (para sa impormasyon lamang; hindi ito kapareho ng pangunahing address ng simbahan mo sa Church Settings).
   - **City / State / Zip** -- ang lokasyon ng campus.
   - **Time Zone** -- ang IANA time zone ng campus na ito (halimbawa, *America/Chicago*). Ang [mga check-in schedule](../attendance/setup.md#setting-a-check-in-schedule) para sa mga serbisyo sa campus na ito ay nagbubukas at nagsasara sa time zone na ito. Kung nakatakda sa **None**, ginagamit ang [Time Zone](./church-settings.md#time-zone) ng simbahan mo. Kapaki-pakinabang kapag magkakaiba ang time zone ng mga campus.
   - **Website** -- opsyonal na URL para sa sariling online presence ng campus na ito.
3. I-click ang **Save**.

Ipinapakita ng listahan ang **Name**, **Location** (lungsod at estado), at **Time Zone** ng bawat campus, at ipinapakita ng item na **Campuses** sa listahan sa kaliwa kung ilan ang lokasyon mo.

## Pag-edit ng Campus {#editing-a-campus}

I-click ang alinmang row ng campus sa listahan para buksan ang editor nito sa panel sa kanan. I-update ang mga field at i-click ang **Save**, o **Cancel** para isara ang editor nang hindi nagse-save.

## Pagbura ng Campus {#deleting-a-campus}

Buksan ang isang campus para i-edit at i-click ang **Delete**. Hihilingin sa iyong kumpirmahin. Ang pagbura ng campus ay hindi nag-aalis ng mga taong nakatalaga rito -- nagiging blangko lamang ang kanilang campus field.

## Pagtatalaga ng Tao sa Campus {#assigning-people-to-a-campus}

Pagkatapos gumawa ng mga campus, maaaring magtalaga ang staff ng tao sa campus mula sa kanyang profile:

1. Buksan ang talaan ng tao sa **People**.
2. I-click ang **Edit**.
3. Piliin ang campus mula sa dropdown na **Campus**.
4. I-click ang **Save**.

Maaari mo ring i-update nang maramihan ang campus mula sa People page. Pumili ng maraming tao, gamitin ang **Bulk Edit**, at itakda ang Campus field para sa lahat nang sabay-sabay.

## Pag-filter ayon sa Campus {#filtering-by-campus}

Kapag na-set up na ang mga campus, maaari mong i-filter ayon sa campus sa buong B1 Admin:

- **People search** -- magdagdag ng Campus condition sa advanced search, o mag-load ng [Saved List](../people/lists.md) na nakatakda sa isang campus.
- **Demographics** -- ipinapakita ng [Demographics dashboard](../people/demographics.md) ang Campus donut chart kapag may kahit isang taong may nakatalagang campus.
- **Attendance Setup** -- maaaring itali sa isang campus ang bawat service time sa Attendance.

:::tip
Hindi kailangang mag-configure ng mga campus ng simbahang iisa lang ang lokasyon. Opsyonal ang lahat ng feature ng campus -- kung walang campus, hindi lilitaw ang mga campus field at chart.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Church Settings](./church-settings.md) -- ang pangunahing address at branding ng simbahan mo (hiwalay sa mga address ng campus)
- [Demographics](../people/demographics.md) -- ang breakdown chart ng Campus
- [Attendance Setup](../attendance/setup.md) -- i-link ang mga service time sa isang campus
- [Bulk Editing](../people/bulk-editing.md) -- magtalaga ng campus sa maraming tao nang sabay-sabay
