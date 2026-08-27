---
title: "Attendance Setup"
---

# Attendance Setup

<div class="article-intro">

Bago ka magsimula ng pagsubaybay ng attendance, kailangan mong sabihin sa B1 Admin ang tungkol sa mga pisikal na lokasyon ng iyong simbahan, kung kailan nagaganap ang mga serbisyo, at aling mga grupo ang nagtitipon sa bawat serbisyo. Ang isang-pagkakataong setup na ito ay lumilikha ng istruktura na nagpapalakas ng lahat ng attendance tracking at reporting sa buong iyong simbahan.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Kailangan mo ng isang aktibong B1 Admin account na may pahintulot na pamahalaan ang attendance. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) kung hindi ka sigurado sa iyong access level.
- Kung plano mong italaga ang mga grupo sa mga oras ng serbisyo, siguraduhin na ang iyong [mga grupo ay na-create](../groups/creating-groups.md) na muna.

</div>

## Key Concepts

- **Campus** -- isang pisikal na lokasyon kung saan nagtitipon ang iyong simbahan (hal., "Main Campus," "North Campus"). Ang mga campus ay pinamamahalaan sa ilalim ng **Settings**.
- **Service** -- isang recurring na pagtitipon sa isang campus (hal., "Sunday Service," "Midweek").
- **Service Time** -- isang partikular na oras na nagaganap ang serbisyo (hal., "9:00 AM," "11:00 AM").
- **Scheduled Group** -- isang grupo na itinalaga sa isang partikular na oras ng serbisyo. Ang attendance ay sinusubaybayan sa konteksto ng serbisyong iyon.
- **Unscheduled Group** -- isang grupo na nagsusubaybay ng attendance sa sarili nito, nang hindi nakaugnay sa isang oras ng serbisyo.

## Setting Up Your Attendance Structure

1. Buksan ang **B1 Admin**, i-click ang **section menu** sa tuktok na sulok ng kaliwa (ang pangalan ng seksyon na may maliit na arrow), at piliin ang **People**.
2. Sa navigation bar, i-click ang **Attendance** tab. Ang **Setup** tab ay pinili nang default.
3. I-click ang **Manage Campuses** (tuktok na kanang bahagi ng Setup panel). Dadalhin ka nito sa **Settings → Campuses**. I-click ang **Add Campus**, ilagay ang pangalan ng iyong lokasyon (ang address at time zone ay opsyonal), at i-click ang **Save**.
4. Bumalik sa **People → Attendance → Setup**. Ang iyong campus ay lumilitaw na sa setup table.
5. I-click ang **+ button sa Service column** sa ilalim ng iyong campus. Ilagay ang pangalan ng serbisyo tulad ng "Sunday Service" at i-click ang **Save**.
6. I-click ang **+ button sa Time column** sa ilalim ng serbisyo. Ilagay ang isang oras tulad ng "9:00 AM" at i-click ang **Save**. Ulitin para sa bawat oras ng serbisyo.
7. Upang ikonekta ang isang grupo sa isang oras ng serbisyo, buksan ang grupo mula sa **Groups** tab, i-click ang **Edit** pencil, at gamitin ang **Add Service Time** — tingnan ang susunod na seksyon.

### Enabling Track Attendance on a Group

Bago ang isang grupo ay makakakuha ng recorded attendance, ang Track Attendance ay dapat na mai-on para sa grupo na iyon.

1. Buksan ang **section menu** sa tuktok na sulok ng kaliwa at piliin ang **People**, pagkatapos i-click ang **Groups** tab at piliin ang grupo.
2. I-click ang **Edit** pencil icon.
3. Itakda ang **Track Attendance** sa **Yes**.
4. I-click ang **Save**.

:::tip
Kung itinalaga mo na ang grupo sa isang oras ng serbisyo sa nakaraang hakbang, gamitin din ang **Add Service Time** option sa screen ng grupo upang iugnay ito sa tamang serbisyo. Tinutiyak nito na ang mga session ay konektado sa tamang campus at oras.
:::

:::tip
Kung ang isang grupo ay nagtitipon sa labas ng isang regular na serbisyo -- tulad ng isang midweek small group na sumusubaybay sa sariling attendance -- maaari mong iwanan ito bilang isang walang-oras na grupo. Ito ay lalabas pa rin sa Groups tab para sa attendance reporting.
:::

## Editing Your Setup

Maaari mong i-update ang iyong setup anumang oras. Piliin ang isang campus, oras ng serbisyo, o grupo at i-click ang **Edit** upang baguhin ang mga detalye nito, o **Delete** upang alisin ito.

:::info
Ang pag-alisin ng isang oras ng serbisyo ay hindi nag-delete ng mga nakaraang attendance records. Ang iyong historical data ay napanatili kahit na baguhin mo ang iyong schedule.
:::

## What's Next

Kapag ang iyong mga campus, oras ng serbisyo, at mga grupo ay nasa lugar na, handa ka nang magsimula ng [recording attendance](recording-attendance.md) nang manu-mano o i-setup ang [self check-in](check-in.md) para sa iyong mga serbisyo.
