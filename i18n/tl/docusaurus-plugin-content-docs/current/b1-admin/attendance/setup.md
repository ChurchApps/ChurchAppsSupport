---
title: "Attendance Setup"
---

# Attendance Setup

<div class="article-intro">

Bago mo masubaybayan ang attendance, kailangan mong sabihin sa B1 Admin ang mga pisikal na lokasyon ng iyong simbahan, kung kailan nagaganap ang mga serbisyo, at kung aling grupo ang nagpupulong sa bawat serbisyo. Ang one-time setup na ito ang lumilikha ng istrakturang nagpapagana sa lahat ng pagsubaybay at pag-uulat ng attendance sa buong simbahan mo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may permiso para pamahalaan ang attendance. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung hindi ka sigurado sa iyong antas ng access.
- Kung balak mong magtalaga ng mga grupo sa service time, siguraduhing [nagawa na ang iyong mga grupo](../groups/creating-groups.md) muna.

</div>

## Mga Pangunahing Konsepto

- **Campus** -- isang pisikal na lokasyon kung saan nagpupulong ang iyong simbahan (hal. "Main Campus," "North Campus"). Pinamamahalaan ang mga campus sa ilalim ng **Settings**.
- **Service** -- isang paulit-ulit na pagtitipon sa isang campus (hal. "Sunday Service," "Midweek").
- **Service Time** -- partikular na oras kung kailan nagaganap ang isang serbisyo (hal. "9:00 AM," "11:00 AM").
- **Scheduled Group** -- grupong nakatalaga sa partikular na service time. Sinusubaybayan ang attendance sa konteksto ng serbisyong iyon.
- **Unscheduled Group** -- grupong sariling sinusubaybayan ang attendance, hindi nakatali sa anumang service time.

## Pag-set Up ng Attendance Structure

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), at i-expand ang **People**.
2. I-click ang **Attendance**, pagkatapos i-click ang **Setup** sa kaliwang column. Bubukas ang **Service structure** table, na may bilang ng iyong mga campus, service time, at naka-iskedyul at hindi naka-iskedyul na grupo sa itaas. Nag-a-update ang mga bilang sa sandaling may idagdag, i-edit, o alisin ka sa table.
3. I-click ang **Manage Campuses** (sa kanang itaas ng **Service structure** panel). Dadalhin ka nito sa **Settings → Campuses**. I-click ang **Add Campus**, ilagay ang pangalan ng iyong lokasyon (opsyonal ang address at time zone), at i-click ang **Save**.
4. Bumalik sa **People → Attendance** at i-click ang **Setup**. Lalabas na ang iyong campus sa setup table.
5. I-click ang **+ button sa Service column** sa ilalim ng iyong campus. Ilagay ang pangalan ng serbisyo gaya ng "Sunday Service" at i-click ang **Save**.
6. I-click ang **+ button sa Time column** sa ilalim ng serbisyo. Ilagay ang pangalan ng **Service Time** gaya ng "9:00 AM", opsyonal na punan ang [check-in schedule](#setting-a-check-in-schedule), at i-click ang **Save**. Ulitin para sa bawat service time.
7. Para ikonekta ang grupo sa service time, buksan ang grupo mula sa **People > Groups**, i-click ang **Edit**, at gamitin ang **Add Service Time** -- tingnan ang susunod na seksyon.

### Pag-enable ng Track Attendance sa Grupo

Bago makapagtala ng attendance ang isang grupo, kailangang naka-on ang Track Attendance para sa grupong iyon.

1. Sa Jump menu, piliin ang **People > Groups** at piliin ang grupo.
2. I-click ang button na **Edit** sa ilalim ng pangalan ng grupo.
3. Itakda ang **Track Attendance** sa **Yes**.
4. I-click ang **Save**.

:::tip
Kung itinalaga mo ang grupo sa service time sa nakaraang hakbang, gamitin din ang opsyong **Add Service Time** sa edit screen ng grupo para ikonekta ito sa tamang serbisyo. Tinitiyak nito na nakakonekta ang mga session sa tamang campus at oras.
:::

:::tip
Kung nagpupulong ang grupo sa labas ng regular na serbisyo -- gaya ng midweek small group na sariling sinusubaybayan ang attendance -- maaari mo itong iwanang unscheduled group. Lalabas pa rin ito sa **Group Attendance** report para sa pag-uulat ng attendance.
:::

## Pagtatakda ng Check-in Schedule

Maaaring magkaroon ng opsyonal na check-in schedule ang bawat service time para [self check-in](check-in.md) na awtomatikong magbukas at magsara tuwing linggo. Kung walang schedule, mananatiling available ang check-in para sa service time na iyon anumang oras (basta hindi sarado ang kwarto dahil sa ibang dahilan, gaya ng puno na).

1. Sa **Setup** view, i-click ang pangalan ng service time sa **Time** column (o magdagdag ng bago).
2. Sa ilalim ng **Check-in Schedule**, piliin ang **Day** ng linggo kung kailan nagpupulong ang service time.
3. Itakda ang **Start Time** at, opsyonal, ang **End Time**.
4. Ilagay ang **Open check-in (minutes before start)** -- halimbawa, ang `30` ay magbubukas ng check-in kalahating oras bago magsimula ang serbisyo.
5. Ilagay ang **Close check-in (minutes after end)** -- halimbawa, ang `15` ay magpapanatiling bukas ng check-in nang 15 minuto pagkatapos ng end time. Kung walang itinakdang end time, mula sa start time ito bibilangin.
6. I-click ang **Save**.

Inuulit ang schedule bawat linggo at sinusukat ito sa time zone ng campus ng serbisyo. Kung walang time zone ang campus na iyon, gagamitin ang [Time Zone](../settings/church-settings.md#time-zone) ng iyong simbahan, pagkatapos ang time zone ng unang campus na may nakatakda, at sa huli ang Eastern time (America/New_York). Kung mali ang oras ng pagbukas ng check-in, tingnan ang **Time Zone** ng campus sa [Campuses](../settings/campuses.md). Para alisin ang schedule, itakda ang **Day** pabalik sa **No schedule** at i-click ang **Save**. Magkakabisa lang ang schedule kapag nakatakda ang **Day** at **Start Time**.

Habang sarado ang check-in window ng isang service time:

- **Self check-in sa B1.church** ay ipinapakita ang service time bilang **Closed** (o, halimbawa, **Closed · opens Sun 9:30 AM**) at hindi ito mapipili. Kung wala sa mga service time ng isang serbisyo ang bukas, makikita ng mga pamilya kung kailan magbubukas ang check-in, gaya ng "Check-in opens Sun 9:30 AM."
- **Ipinapakita rin ng B1 Checkin kiosk app** ang service time bilang **Closed** kasama ang oras ng pagbukas nito. Kung sarado ang lahat ng oras ng isang serbisyo, sasabihin ng kiosk kung kailan magbubukas ang check-in para sa serbisyong iyon. Ang taong nakapag-check in na sa sarado nang service time ay makikitang nakalista ang grupo nila bilang **Checked in**. Kung magsara ang window habang may ginagawang check-in, hindi ito makukumpleto ng kiosk at magpapakita ito ng screen na **Can't check in yet** na naglilista ng apektadong kwarto para makapili ng ibang kwarto ang pamilya.

Maaaring bumalik ang isang household na nakapag-check in na para sa naunang service time at idagdag ang isang susunod na service time na bukas, kahit sarado na ang naunang window. Mananatili ang kanilang mga naunang check-in.

:::tip
Magtakda ng maluwag na open window (halimbawa, 45 minuto bago magsimula) para makapag-check in ang mga pamilya at boluntaryong dumarating nang maaga, at maikling close window para makapag-check in pa rin ang mga huling dumating kapag nagsimula na ang serbisyo.
:::

## Pag-edit ng Setup

Maaari mong i-update ang iyong setup anumang oras. Piliin ang campus, service time, o grupo at i-click ang **Edit** para baguhin ang mga detalye nito, o **Delete** para alisin ito.

:::info
Ang pag-alis ng service time ay hindi nagbubura ng mga nakaraang attendance record. Nananatili ang iyong historical na datos kahit baguhin mo ang iyong schedule.
:::

## Ano ang Susunod

Kapag nakalagay na ang iyong mga campus, service time, at grupo, handa ka nang simulan ang [pagtatala ng attendance](recording-attendance.md) nang manu-mano o mag-set up ng [self check-in](check-in.md) para sa iyong mga serbisyo.
