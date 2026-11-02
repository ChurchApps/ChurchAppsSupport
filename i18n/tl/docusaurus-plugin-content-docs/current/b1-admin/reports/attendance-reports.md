---
title: "Mga Ulat ng Attendance"
---

# Mga Ulat ng Attendance

<div class="article-intro">

Nagbibigay ang B1 Admin ng tatlong ulat ng attendance para matulungan kang maunawaan kung paano nakikilahok ang mga tao sa iyong mga serbisyo at grupo. Nag-aalok ang bawat ulat ng ibang pananaw sa iyong datos ng attendance, mula sa pangkalahatang trend hanggang sa pang-araw-araw na breakdown.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing [tuloy-tuloy na sinusubaybayan](../attendance/tracking-attendance.md) ang attendance para sa iyong mga serbisyo at grupo
- Tiyaking naka-configure sa B1 Admin ang iyong [mga grupo](../groups/creating-groups.md) at mga serbisyo
- Kailangan mo ng angkop na [mga permiso](../settings/roles-permissions.md) para ma-access ang mga ulat

</div>

## Attendance Trend

Ipinapakita ng ulat na Attendance Trend kung paano nagbabago ang attendance sa paglipas ng panahon para sa iyong mga serbisyo.

1. Direktang pumunta sa **admin.b1.church/reports/attendanceTrend** sa iyong browser (walang entry ang mga ulat sa navigation menu -- ang pinakamadaling paraan para makabalik dito ay i-bookmark ang address). Nasa pahina rin ng Attendance ang parehong ulat: i-click ang **All years**, pagkatapos piliin ang tab na **Attendance Trend**.
2. Opsyonal na pumili ng **Campus**, **Service**, **Service Time**, o **Group** para i-filter ang mga resulta.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sinasaklaw ng ulat ang nakaraang taon, mula isang taon na ang nakalipas hanggang ngayon, at kasama nang buo ang end date. I-click ang **Run Report**.
4. Ipinapakita ng ulat ang bar chart at table ng kabuuang pagbisita kada linggo. Ang bawat linggo ay may label ng petsa ng Linggo ng linggong iyon, at nakalista sa column na **Session Dates** ng table ang aktwal na mga petsa sa linggong iyon na may attendance (halimbawa, "9/27, 9/30").

Kapaki-pakinabang ang ulat na ito para makita ang mga pattern gaya ng seasonal na pagbaba, paglago ng trend, o epekto ng mga espesyal na event.

## Group Attendance {#group-attendance}

Ipinapakita ng ulat na Group Attendance kung sino ang dumalo sa bawat session ng grupo sa isang saklaw ng petsa.

1. Direktang pumunta sa **admin.b1.church/reports/groupAttendance** sa iyong browser, o sa pahina ng Attendance i-click ang **All years** at piliin ang tab na **Group Attendance**.
2. Opsyonal na pumili ng **Campus** at **Service**.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sinasaklaw ng ulat ang mula sa nakaraang Linggo hanggang ngayon, at kasama nang buo ang end date.
4. I-click ang **Run Report**.

Ang mga resulta ay nakapangkat ayon sa petsa ng session, pagkatapos oras ng serbisyo, pagkatapos grupo, kasama ang mga taong dumalo na nakalista sa ilalim ng bawat grupo. Nakaayos nang alpabeto ang mga oras ng serbisyo, grupo, at pangalan. Sa tabi ng pangalan ng bawat tao, ipinapakita ng column na **Checked In** ang oras kung kailan naitala ang kanyang attendance (blangko kapag walang oras na nakatala), at ipinapakita ng column na **Membership Status** ang kanyang status, gaya ng Member o Visitor. Kasama rin ang mga session ng mga grupong hindi nagpupulong sa oras ng serbisyo; lalabas ang mga ito nang walang oras ng serbisyo.

Para mag-download ng spreadsheet, i-click ang **Download Options** at piliin ang **Summary**. Ang CSV ay may:

- Isang row bawat miyembro ng bawat grupong nagpulong sa saklaw ng petsa, nakaayos ayon sa grupo at pagkatapos ayon sa pangalan.
- Ang pangalan ng tao at pangalan ng grupo sa mga unang column.
- Isang column bawat session na may petsa, pinangalanan ayon sa serbisyo, oras ng serbisyo, at petsa (halimbawa, "Sunday - 9:00 AM (2026-09-27)"), kung saan minarkahan ang bawat tao bilang **present** o **absent**. Ang session na walang oras ng serbisyo ay pinangalanan ayon sa petsa lamang.

Gamitin ang ulat na ito para ihambing ang attendance sa mga grupo at tukuyin kung aling mga grupo ang lumalago o nangangailangan ng pansin.

## Daily Group Attendance

Ang ulat na Daily Group Attendance (may pamagat na **Group attendance by day**) ay nagbibigay ng bilang kada araw kung ilan ang dumalo sa isang grupo.

1. Direktang pumunta sa **admin.b1.church/reports/dailyGroupAttendance** sa iyong browser.
2. Gamitin ang mga dropdown na **Campus**, **Service**, at **Service Time** para paliitin ang listahan, pagkatapos piliin ang **Group** na gusto mong suriin.
3. Patakbuhin ang ulat. Nililista nito ang bawat araw na nagpulong ang grupo, mula pinakamatanda, kasama ang **Date** at ang bilang ng **Attendees** na naitala sa araw na iyon.

Nagbibigay ang ulat na ito ng detalyadong impormasyon, na nakatutulong para maunawaan ang pagkakaiba-iba linggo-sa-linggo o para matukoy ang mga partikular na araw na may hindi pangkaraniwang mataas o mababang attendance.

:::tip
Gamitin ang ulat na Attendance Trend para sa pangkalahatang-tanaw, at ang ulat na Daily Group Attendance kapag kailangan mong tingnan nang mas malalim ang mga partikular na petsa.
:::

## Mga Praktikal na Gamit

- **Pagpaplano** -- Gamitin ang mga trend ng attendance para magplano ng upuan, tauhan, at mga resource para sa mga paparating na serbisyo.
- **Outreach** -- Maagang tukuyin ang mga pattern ng pagbaba ng attendance para makapag-follow up ka sa mga miyembro.
- **Mga ulat sa board** -- Isama ang datos ng attendance sa iyong regular na ulat sa pamunuan para ipakita ang kalusugan ng ministry.
- **Pagsusuri ng event** -- Ihambing ang attendance bago at pagkatapos ng mga espesyal na event para masukat ang epekto nito.

:::warning
Naitatala ang datos ng attendance sa pamamagitan ng iyong mga proseso ng grupo at service check-in. Kung hindi tuloy-tuloy ang pagsubaybay ng attendance, hindi tumpak na maipapakita ng iyong mga ulat ang aktwal na partisipasyon. Tingnan ang [Tracking Attendance](../attendance/tracking-attendance.md) para sa mga tagubilin sa setup.
:::
