---
title: "Pag-set Up ng Attendance"
description: "I-set up ang mga campus, serbisyo, oras ng serbisyo, at mga takda ng grupo sa B1 Admin para gumana ang pagsubaybay ng attendance at mga iskedyul ng check-in sa buong simbahan mo."
---

# Pag-set Up ng Attendance

<div class="article-intro">

Bago mo masubaybayan ang attendance, kailangan mong sabihin sa B1 Admin ang mga pisikal na lokasyon ng iyong simbahan, kailan ginaganap ang mga serbisyo, at aling mga grupo ang nagkikita sa bawat serbisyo. Ang one-time na setup na ito ang lumilikha ng istrukturang nagpapagana sa lahat ng pagsubaybay at pag-uulat ng attendance sa iyong simbahan.

</div>

## Training Video {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Setting Up Services and Attendance in B1" next="Setting Up Children's Check-In in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng aktibong B1 Admin account na may **Edit Services** attendance permission. Lumalabas lamang ang opsyong **Setup** para sa mga may nito; hindi sapat ang pagtingin lamang sa attendance. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung hindi ka sigurado sa antas ng iyong access.
- Kung plano mong magtakda ng mga grupo sa mga oras ng serbisyo, siguraduhing [nagawa na ang iyong mga grupo](../groups/creating-groups.md) muna.

</div>

## Mga Pangunahing Konsepto {#key-concepts}

- **Campus** -- isang pisikal na lokasyon kung saan nagkikita ang iyong simbahan (hal., "Main Campus," "North Campus"). Pinamamahalaan ang mga campus sa ilalim ng **Settings**.
- **Service** -- isang paulit-ulit na pagtitipon sa isang campus (hal., "Sunday Service," "Midweek").
- **Service Time** -- isang partikular na oras kung kailan ginaganap ang isang serbisyo (hal., "9:00 AM," "11:00 AM").
- **Scheduled Group** -- isang grupong nakatakda sa isang partikular na oras ng serbisyo. Sinusubaybayan ang attendance sa konteksto ng serbisyong iyon.
- **Unscheduled Group** -- isang grupong nagsusubaybay ng sarili nitong attendance, nang hindi nakatali sa oras ng serbisyo.

## Pag-set Up ng Iyong Istruktura ng Attendance {#setting-up-your-attendance-structure}

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), at i-expand ang **People**.
2. I-click ang **Attendance**, pagkatapos i-click ang **Setup** sa kaliwang column. Bubukas ang **Service structure** table, kasama ang mga bilang ng iyong mga campus, oras ng serbisyo, naka-iskedyul at hindi naka-iskedyul na grupo, at kabuuang grupo sa itaas. Agad na nag-a-update ang mga bilang kapag may idinagdag, na-edit, o inalis ka sa table. Nakalista sa bawat campus ang mga serbisyo nito, ang mga oras nito, at ang mga grupong nakatakda sa bawat oras, na nakapangkat ayon sa kategorya (lumalabas ang serving team sa ilalim ng pangalan ng ministry nito). Ang mga grupong nagsusubaybay ng attendance pero walang oras ng serbisyo ay nakalista sa ibaba sa ilalim ng **Unassigned**.
3. I-click ang **Manage Campuses** (sa kanang itaas ng **Service structure** panel). Dadalhin ka nito sa **Settings → Campuses**. I-click ang **Add Campus**, ilagay ang pangalan ng iyong lokasyon (opsyonal ang address at time zone), at i-click ang **Save**.
4. Bumalik sa **People → Attendance** at i-click ang **Setup**. Lumalabas na ngayon ang iyong campus sa setup table.
5. I-click ang **+ button sa Service column** sa ilalim ng iyong campus. Ilagay ang pangalan ng serbisyo gaya ng "Sunday Service" at i-click ang **Save**.
6. I-click ang **+ button sa Time column** sa ilalim ng serbisyo. Ilagay ang pangalan ng **Service Time** gaya ng "9:00 AM", opsyonal na punan ang [check-in schedule](#setting-a-check-in-schedule), at i-click ang **Save**. Ulitin para sa bawat oras ng serbisyo.
7. Para ikonekta ang isang grupo sa oras ng serbisyo, buksan ang grupo mula sa **People > Groups**, i-click ang **Edit**, at gamitin ang **Add Service Time** -- tingnan ang susunod na seksyon.

### Pag-enable ng Track Attendance sa Grupo {#enabling-track-attendance-on-a-group}

Bago makapagtala ng attendance ang isang grupo, dapat naka-on ang Track Attendance para sa grupong iyon.

1. Sa Jump menu, piliin ang **People > Groups** at piliin ang grupo.
2. I-click ang **Edit** button sa ilalim ng pangalan ng grupo.
3. Itakda ang **Track Attendance** sa **Yes**.
4. I-click ang **Save**.

:::tip
Kung itinakda mo ang grupo sa isang oras ng serbisyo sa naunang hakbang, gamitin din ang opsyong **Add Service Time** sa edit screen ng grupo para ikonekta ito sa tamang serbisyo. Tinitiyak nito na nakakonekta ang mga session sa tamang campus at oras.
:::

:::tip
Kung nagkikita ang isang grupo sa labas ng regular na serbisyo -- gaya ng midweek small group na sarili ang pagsubaybay ng attendance -- maaari mo itong iwanan bilang unscheduled group. Lalabas pa rin ito sa **Group Attendance** report para sa pag-uulat ng attendance.
:::

## Pagtatakda ng Check-in Schedule {#setting-a-check-in-schedule}

Maaaring magkaroon ng opsyonal na check-in schedule ang bawat oras ng serbisyo para ang [self check-in](check-in.md) ay kusang magbukas at magsara kada linggo. Kung walang iskedyul, nananatiling available ang check-in para sa oras ng serbisyong iyon anumang oras (basta hindi sarado ang kuwarto sa ibang dahilan, gaya ng puno na).

1. Sa **Setup** view, i-click ang pangalan ng oras ng serbisyo sa **Time** column (o magdagdag ng bago).
2. Sa ilalim ng **Check-in Schedule**, piliin ang **Day** ng linggo kung kailan nagkikita ang oras ng serbisyo.
3. Itakda ang **Start Time** at, opsyonal, ang **End Time**.
4. Ilagay ang **Open check-in (minutes before start)** -- halimbawa, ang `30` ay magbubukas ng check-in kalahating oras bago magsimula ang serbisyo.
5. Ilagay ang **Close check-in (minutes after end)** -- halimbawa, ang `15` ay magpapanatiling bukas ng check-in nang 15 minuto pagkatapos ng end time. Kung hindi ka nagtakda ng end time, bibilangin ito mula sa start time. Kung iiwan mong blangko ang parehong **End Time** at **Close check-in**, mananatiling bukas ang check-in hanggang sa katapusan ng araw na iyon.
6. I-click ang **Save**.

Inuulit ang iskedyul kada linggo at sinusukat ito sa time zone ng campus ng serbisyo. Kung walang time zone ang campus na iyon, gagamitin ang [Time Zone](../settings/church-settings.md#time-zone) ng iyong simbahan, pagkatapos ang time zone ng unang campus na mayroon nito, at sa huli ang Eastern time (America/New_York). Kung nagbubukas ang check-in sa maling oras, tingnan ang **Time Zone** ng campus sa [Campuses](../settings/campuses.md). Para alisin ang iskedyul, ibalik ang **Day** sa **No schedule** at i-click ang **Save**. Magkakabisa lamang ang iskedyul kapag nakatakda ang parehong **Day** at **Start Time**.

Habang sarado ang check-in window ng isang oras ng serbisyo:

- Ang **self check-in sa B1.church** ay nagpapakita ng oras ng serbisyong iyon bilang **Closed** (o, halimbawa, **Closed · opens Sun 9:30 AM**) at hindi ito mapipili. Kung wala sa mga oras ng isang serbisyo ang bukas, makikita ng mga pamilya kung kailan magbubukas ang check-in, gaya ng "Check-in opens Sun 9:30 AM."
- Ipinapakita rin ng **B1 Checkin kiosk app** ang oras ng serbisyo bilang **Closed** kasama kung kailan ito magbubukas. Kung sarado ang lahat ng oras ng isang serbisyo, sinasabi ng kiosk kung kailan magbubukas ang check-in para sa serbisyong iyon. Ang taong naka-check in na sa isang saradong oras ng serbisyo ay makikitang nasa grupo nila na may **Checked in** sa halip. Kung magsara ang window habang may check-in na nagaganap, hindi ito matatapos ng kiosk at magpapakita ito ng screen na **Can't check in yet** na naglilista ng apektadong kuwarto para makapili ng ibang kuwarto ang pamilya.

Maaaring bumalik pa rin ang isang sambahayan na naka-check in na para sa naunang oras ng serbisyo at magdagdag ng mas huling oras ng serbisyo na bukas, kahit sarado na ang naunang window. Mananatili ang kanilang mga umiiral na check-in.

:::tip
Magtakda ng malawak na open window (halimbawa, 45 minuto bago magsimula) para makapag-check in ang mga pamilya at boluntaryong maagang dumarating, at maikling close window para makapag-check in pa rin ang mga huling dumating kapag nagsimula na ang serbisyo.
:::

## Pag-edit ng Iyong Setup {#editing-your-setup}

Maaari mong i-update ang iyong setup anumang oras:

- **Mga serbisyo at oras ng serbisyo** -- I-click ang pangalan ng serbisyo o oras ng serbisyo sa table para buksan ang form nito. Baguhin ang mga detalye at i-click ang **Save**, o i-click ang **Delete** para alisin ito.
- **Mga campus** -- I-click ang **Manage Campuses** para magdagdag, magpalit ng pangalan, o mag-alis ng mga campus sa ilalim ng **Settings**.
- **Mga grupo** -- I-click ang pangalan ng grupo para buksan ito, pagkatapos i-click ang **Edit** para baguhin ang mga oras ng serbisyo nito o i-on o i-off ang **Track Attendance**.

Dinadala ka ng button na **Check-in kiosk, QR, and labels** sa itaas ng table sa [B1 CheckIn settings](check-in.md).

:::info
Ang pag-alis ng oras ng serbisyo ay hindi bumubura ng mga nakaraang attendance record. Nananatili ang iyong makasaysayang datos kahit baguhin mo ang iyong iskedyul.
:::

## Ano ang Susunod {#whats-next}

Kapag nakalagay na ang iyong mga campus, oras ng serbisyo, at grupo, handa ka nang simulan ang [pagtatala ng attendance](recording-attendance.md) nang manu-mano o mag-set up ng [self check-in](check-in.md) para sa iyong mga serbisyo.
