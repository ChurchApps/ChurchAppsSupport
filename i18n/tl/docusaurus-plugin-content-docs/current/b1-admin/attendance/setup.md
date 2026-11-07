---
title: "Attendance Setup"
description: "I-set up ang mga campus, serbisyo, oras ng serbisyo, at grupo sa B1 Admin para gumana ang attendance tracking at check-in sa buong simbahan."
---

# Attendance Setup

<div class="article-intro">

Bago ka makapag-track ng attendance, kailangan mong sabihin sa B1 Admin ang mga pisikal na lokasyon ng iyong simbahan, kung kailan nagaganap ang mga serbisyo, at aling mga grupo ang nagpupulong sa bawat serbisyo. Ang one-time na setup na ito ang gumagawa ng istrukturang nagpapatakbo sa lahat ng attendance tracking at pag-uulat sa buong simbahan mo.

</div>

## Training Video

<YouTube id="LQPc2gVlXvQ" title="Setting Up Services and Attendance in B1" next="Setting Up Children's Check-In in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may **Edit Services** attendance permission. Lalabas lang ang opsyong **Setup** para sa mga taong mayroon nito; hindi sapat ang pagtingin lang sa attendance. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Kung balak mong magtalaga ng mga grupo sa mga oras ng serbisyo, siguraduhing [nagawa na ang iyong mga grupo](../groups/creating-groups.md) muna.

</div>

## Mga Pangunahing Konsepto

- **Campus** -- isang pisikal na lokasyon kung saan nagpupulong ang iyong simbahan (halimbawa, "Main Campus," "North Campus"). Pinamamahalaan ang mga campus sa ilalim ng **Settings**.
- **Service** -- isang paulit-ulit na pagtitipon sa isang campus (halimbawa, "Sunday Service," "Midweek").
- **Service Time** -- isang partikular na oras kung kailan nagaganap ang serbisyo (halimbawa, "9:00 AM," "11:00 AM").
- **Scheduled Group** -- grupong nakatalaga sa isang partikular na oras ng serbisyo. Sinusubaybayan ang attendance sa konteksto ng serbisyong iyon.
- **Unscheduled Group** -- grupong nagtatrack ng sarili nitong attendance, hindi nakatali sa oras ng serbisyo.

## Pag-set Up ng Iyong Attendance Structure

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), at palawakin ang **People**.
2. I-click ang **Attendance**, pagkatapos i-click ang **Setup** sa kaliwang column. Bubukas ang **Service structure** table, na may bilang ng iyong mga campus, oras ng serbisyo, at naka-iskedyul at hindi naka-iskedyul na grupo sa itaas. Nag-a-update ang mga bilang sa sandaling magdagdag, mag-edit, o mag-alis ka ng isang bagay sa table.
3. I-click ang **Manage Campuses** (sa kanang itaas ng **Service structure** panel). Dadalhin ka nito sa **Settings → Campuses**. I-click ang **Add Campus**, ilagay ang pangalan ng iyong lokasyon (opsyonal ang address at time zone), at i-click ang **Save**.
4. Bumalik sa **People → Attendance** at i-click ang **Setup**. Lalabas na ngayon ang iyong campus sa setup table.
5. I-click ang **+ button sa Service column** sa ilalim ng iyong campus. Ilagay ang pangalan ng serbisyo gaya ng "Sunday Service" at i-click ang **Save**.
6. I-click ang **+ button sa Time column** sa ilalim ng serbisyo. Ilagay ang pangalan ng **Service Time** gaya ng "9:00 AM", opsyonal na punan ang [check-in schedule](#setting-a-check-in-schedule), at i-click ang **Save**. Ulitin para sa bawat oras ng serbisyo.
7. Para ikonekta ang isang grupo sa oras ng serbisyo, buksan ang grupo mula sa **People > Groups**, i-click ang **Edit**, at gamitin ang **Add Service Time** -- tingnan ang susunod na seksyon.

### Pag-enable ng Track Attendance sa Grupo

Bago ma-record ang attendance ng isang grupo, dapat naka-on ang Track Attendance para sa grupong iyon.

1. Sa Jump menu, piliin ang **People > Groups** at piliin ang grupo.
2. I-click ang **Edit** na button sa ilalim ng pangalan ng grupo.
3. Itakda ang **Track Attendance** sa **Yes**.
4. I-click ang **Save**.

:::tip
Kung itinalaga mo ang grupo sa oras ng serbisyo sa nakaraang hakbang, gamitin din ang opsyong **Add Service Time** sa edit screen ng grupo para ikonekta ito sa tamang serbisyo. Tinitiyak nito na nakakonekta ang mga session sa tamang campus at oras.
:::

:::tip
Kung nagpupulong ang grupo sa labas ng regular na serbisyo -- gaya ng midweek small group na nagtatrack ng sarili nitong attendance -- maaari mo itong iwan bilang unscheduled group. Lalabas pa rin ito sa ulat na **Group Attendance** para sa pag-uulat ng attendance.
:::

## Pagtatakda ng Check-in Schedule {#setting-a-check-in-schedule}

Maaaring magkaroon ng opsyonal na check-in schedule ang bawat oras ng serbisyo para [magbukas at magsara ang self check-in](check-in.md) nang kusa kada linggo. Kung walang schedule, nananatiling available ang check-in para sa oras na iyon anumang oras (basta hindi sarado ang kuwarto dahil sa ibang dahilan, gaya ng puno na).

1. Sa **Setup** view, i-click ang pangalan ng oras ng serbisyo sa **Time** column (o magdagdag ng bago).
2. Sa ilalim ng **Check-in Schedule**, piliin ang **Day** ng linggo kung kailan nagpupulong ang oras ng serbisyo.
3. Itakda ang **Start Time** at, opsyonal, ang **End Time**.
4. Ilagay ang **Open check-in (minutes before start)** -- halimbawa, ang `30` ay nagbubukas ng check-in kalahating oras bago magsimula ang serbisyo.
5. Ilagay ang **Close check-in (minutes after end)** -- halimbawa, ang `15` ay nagpapanatiling bukas ang check-in ng 15 minuto pagkatapos ng oras ng pagtatapos. Kung hindi ka nagtakda ng end time, binibilang ito mula sa start time.
6. I-click ang **Save**.

Inuulit ang schedule kada linggo at sinusukat ito sa time zone ng campus ng serbisyo. Kung walang time zone ang campus na iyon, ginagamit ang [Time Zone](../settings/church-settings.md#time-zone) ng iyong simbahan, pagkatapos ang time zone ng una mong campus na may nakatakda, at panghuli ang Eastern time (America/New_York). Kung mali ang oras ng pagbubukas ng check-in, tingnan ang **Time Zone** ng campus sa [Campuses](../settings/campuses.md). Para alisin ang schedule, itakda ang **Day** pabalik sa **No schedule** at i-click ang **Save**. Magkakabisa lang ang schedule kapag nakatakda ang parehong **Day** at **Start Time**.

Habang sarado ang check-in window ng isang oras ng serbisyo:

- **Self check-in sa B1.church** ay ipinapakita ang oras ng serbisyong iyon bilang **Closed** (o, halimbawa, **Closed · opens Sun 9:30 AM**), at hindi ito mapipili. Kung walang bukas na oras ang isang serbisyo, makikita ng mga pamilya kung kailan magbubukas ang check-in, gaya ng "Check-in opens Sun 9:30 AM."
- **Ang B1 Checkin kiosk app** ay nagpapakita rin ng oras ng serbisyo bilang **Closed** kasama ang kung kailan ito magbubukas. Kung sarado ang bawat oras ng isang serbisyo, sinasabi ng kiosk kung kailan magbubukas ang check-in para sa serbisyong iyon. Ang taong naka-check in na sa saradong oras ng serbisyo ay makikitang naka-check in ang kanyang grupo sa halip. Kung magsara ang window habang may check-in na nagaganap, hindi ito matatapos ng kiosk at magpapakita ng screen na **Can't check in yet** na naglilista sa apektadong kuwarto para makapili ng ibang kuwarto ang pamilya.

Maaaring bumalik ang isang household na naka-check in na para sa naunang oras ng serbisyo at magdagdag ng mas huling oras ng serbisyo na bukas, kahit sarado na ang naunang window. Pananatilihin ang mga umiiral nilang check-in.

:::tip
Magtakda ng maluwag na open window (halimbawa, 45 minuto bago magsimula) para makapag-check in ang mga pamilya at boluntaryong dumarating nang maaga, at maikling close window para makapag-check in pa rin ang mga huling dumating kapag nagsimula na ang serbisyo.
:::

## Pag-edit ng Iyong Setup

Maaari mong i-update ang iyong setup anumang oras. Piliin ang campus, oras ng serbisyo, o grupo at i-click ang **Edit** para baguhin ang mga detalye nito, o **Delete** para alisin ito.

:::info
Hindi nabubura ng pag-alis ng oras ng serbisyo ang mga nakaraang attendance record. Nananatili ang iyong historical na datos kahit baguhin mo ang iyong schedule.
:::

## Ano ang Susunod

Kapag nakalagay na ang iyong mga campus, oras ng serbisyo, at grupo, handa ka nang magsimulang [mag-record ng attendance](recording-attendance.md) nang manual o mag-set up ng [self check-in](check-in.md) para sa iyong mga serbisyo.
