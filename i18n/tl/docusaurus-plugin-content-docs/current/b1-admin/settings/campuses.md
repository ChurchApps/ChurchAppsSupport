---
title: "Campuses"
---

# Campuses

<div class="article-intro">

Kung ang iyong simbahan ay nakatipak sa mahigit isang lokasyon, ang **Campuses** ay nagbibigay-daan sa iyo na i-track kung aling site ang bawat tao at grupo ay pag-aari. Kapag na-configure, ang campus ay lumalabas bilang opsyon sa person profile, sa attendance setup, at sa Demographics dashboard. Ang multi-site na simbahan ay maaaring mag-filter, maghanap, at mag-report ng campus sa buong B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **Edit Church Setting** permission upang pamahalaan ang campus. Tingnan ang [Roles & Permissions](./roles-permissions.md).

</div>

## Pagbubukas ng Campus Setting

Sa B1 Admin, buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow), pumili ng **Settings**, at pumili ng **Campuses** mula sa Settings navigation. Makikita mo ang isang listahan ng lahat ng configured na campus na may pangalan, lokasyon, at timezone.

## Pagdadagdag ng Campus

1. I-click ang **Add Campus** (o ang **+** button kung walang campus pa).
2. Puno ang campus detail:
   - **Name** *(required)* — ang display name na ipinakita sa B1 Admin (halimbawa, "Main Campus" o "North Campus").
   - **Address** — ang campus street address (ginagamit para sa informational display; hindi katulad ng iyong main church address sa Church Setting).
   - **City / State / Zip** — ang campus location.
   - **Timezone** — ang IANA timezone para sa campus na ito (halimbawa, *America/Chicago*). Kapaki-pakinabang kapag ang campus ay nasa iba't ibang time zone.
   - **Website** — isang optional na URL para sa sariling web presence ng campus na ito.
3. I-click ang **Save**.

## Pag-edit ng Campus

I-click ang anumang campus row sa listahan upang buksan ang editor nito sa panel sa kanan. I-update ang field at i-click ang **Save**.

## Pagtanggal ng Campus

Buksan ang isang campus para sa pag-edit at i-click ang **Delete**. Hihilingin ka na mag-confirm. Ang pagtanggal ng campus ay hindi nag-aalis ng mga taong italang nito — ang kanilang campus field ay nagiging blank lamang.

## Pag-assign ng Tao sa Campus

Pagkatapos lumikha ng campus, ang staff ay maaaring italang ang isang tao sa campus mula sa kanilang profile:

1. Buksan ang person record sa **People**.
2. I-click ang **Edit**.
3. Pumili ng campus mula sa **Campus** dropdown.
4. I-click ang **Save**.

Maaari mo ring i-update ang campus nang bulk mula sa People page. Pumili ng maraming tao, gamitin ang **Bulk Edit**, at itakda ang Campus field para sa lahat nang sabay-sabay.

## Pag-filter ng Campus

Kapag na-set up na ang campus, maaari kang mag-filter sa B1 Admin ng campus:

- **People search** — magdagdag ng Campus condition sa advanced search, o mag-load ng [Saved List](../people/lists.md) scoped sa campus.
- **Demographics** — ang [Demographics dashboard](../people/demographics.md) ay nagpapakita ng Campus donut chart kapag hindi bababa sa isang tao ang may assigned na campus.
- **Attendance Setup** — bawat service time sa Attendance ay maaaring nakakabit sa campus.

:::tip
Ang single-location na simbahan ay hindi kailangang mag-configure ng campus. Lahat ng campus feature ay optional — kung walang campus, ang campus field at chart ay hindi lamang lumalabas.
:::

## Mga Kaugnay na Artikulo

- [Church Setting](./church-settings.md) — ang iyong pangunahing church address at branding (hiwalay mula sa address ng campus)
- [Demographics](../people/demographics.md) — ang Campus breakdown chart
- [Attendance Setup](../attendance/setup.md) — ikonekta ang service time sa campus
- [Bulk Editing](../people/bulk-editing.md) — italang ang campus sa maraming tao nang sabay-sabay
