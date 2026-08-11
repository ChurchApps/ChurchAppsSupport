---
title: "Attendance Setup"
---

# Attendance Setup

<div class="article-intro">

Bago mo masubaybayan ang attendance, kailangan mong sabihin sa B1 Admin ang tungkol sa physical location ng iyong simbahan, kung kailan naganap ang mga serbisyo, at aling mga grupo ang nakaposisyon sa bawat serbisyo. Ang isang pagkakataong ito na pag-setup ay lumilikha ng istraktura na nag-power sa lahat ng attendance tracking at reporting sa iyong buong simbahan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng active B1 Admin account na may pahintulot na pamahalaan ang attendance. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung hindi ka sigurado tungkol sa iyong access level.
- Kung plano mong italang mga grupo sa service time, siguraduhing ang iyong [mga grupo ay lumilikha](../groups/creating-groups.md) muna.

</div>

## Pangunahing Konsepto

- **Campus** -- isang physical location kung saan nakatipak ang iyong simbahan (halimbawa, "Main Campus," "North Campus"). Ang mga campus ay pinamamahalaan sa ilalim ng **Settings**.
- **Service** -- isang umuulit na gathering sa isang campus (halimbawa, "Sunday Service," "Midweek").
- **Service Time** -- isang tiyak na oras na nangyayari ang isang service (halimbawa, "9:00 AM," "11:00 AM").
- **Scheduled Group** -- isang grupo na italang sa isang tiyak na service time. Ang attendance ay sinusubaybayan sa konteksto ng service na iyon.
- **Unscheduled Group** -- isang grupo na nag-track ng attendance sa sarili nito, nang hindi nakakabit sa service time.

## Pag-set Up ng Iyong Attendance Structure

1. Buksan ang **B1 Admin**, i-click ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow), at piliin ang **People**.
2. Sa navigation bar, i-click ang **Attendance** tab. Ang **Setup** tab ay pinili bilang default.
3. I-click ang **Manage Campuses** (top right ng Setup panel). Ito ay dadalhin ka sa **Settings → Campuses**. I-click ang **Add Campus**, ipasok ang pangalan ng iyong lokasyon (address at time zone ay opsyonal), at i-click ang **Save**.
4. Bumalik sa **People → Attendance → Setup**. Ang iyong campus ay lilitaw na sa setup table.
5. I-click ang **+ button sa Service column** sa ilalim ng iyong campus. Ipasok ang pangalan ng serbisyo tulad ng "Sunday Service" at i-click ang **Save**.
6. I-click ang **+ button sa Time column** sa ilalim ng serbisyo. Ipasok ang oras tulad ng "9:00 AM" at i-click ang **Save**. Ulitin para sa bawat service time.
7. Upang ikonekta ang isang grupo sa isang service time, buksan ang grupo mula sa **Groups** tab, i-click ang **Edit** pencil, at gamitin ang **Add Service Time** — tingnan ang susunod na seksyon.

### Pag-enable ng Track Attendance sa isang Group

Bago ang isang grupo ay maaaring may attendance na nire-record, ang Track Attendance ay dapat na i-on para sa grupo na iyon.

1. I-click ang **Groups** sa sidebar at piliin ang grupo.
2. I-click ang **Edit** pencil icon.
3. Itakda ang **Track Attendance** sa **Yes**.
4. I-click ang **Save**.

:::tip
Kung italang mo ang grupo sa service time sa nakaraang hakbang, gamitin din ang **Add Service Time** option sa screen ng pag-edit ng grupo upang ikonekta ito sa tamang serbisyo. Ito ay nagsisiguro na ang mga session ay konektado sa tamang campus at oras.
:::

:::tip
Kung ang isang grupo ay nagsasama sa labas ng regular na serbisyo -- tulad ng midweek na maliit na grupo na sumusubaybay sa sarili nitong attendance -- maaari mong iwanan ito bilang unscheduled group. Makikita pa rin ito sa Groups tab para sa attendance reporting.
:::

## Pag-edit ng Iyong Setup

Maaari mong i-update ang iyong setup anumang oras. Piliin ang campus, service time, o grupo at i-click ang **Edit** upang baguhin ang detalye, o **Delete** upang alisin ito.

:::info
Ang pag-aalis ng service time ay hindi nag-delete ng nakaraang attendance record. Ang iyong historical data ay nananatiling preserved kahit na magbago ang iyong schedule.
:::

## Ano ang Susunod

Kapag nandoon na ang iyong mga campus, service time, at grupo, handa ka nang magsimula sa [pag-record ng attendance](recording-attendance.md) nang manu-manong o mag-set up ng [self check-in](check-in.md) para sa iyong mga serbisyo.
