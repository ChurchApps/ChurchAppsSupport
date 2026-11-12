---
title: "Mga Ulat ng Attendance"
description: "Alamin ang tatlong attendance report ng B1 Admin (Attendance Trend, Group Attendance, at Daily Group Attendance) at kung ano ang ipinapakita ng bawat isa, kasama ang mga hakbang sa pagpapatakbo at pag-export ng mga ito."
---

# Mga Ulat ng Attendance

<div class="article-intro">

Nagbibigay ang B1 Admin ng tatlong attendance report para matulungan kang maunawaan kung paano nakikilahok ang mga tao sa iyong mga serbisyo at grupo. Nag-aalok ang bawat report ng ibang pananaw sa iyong datos ng attendance, mula sa pangkalahatang trend hanggang sa pang-araw-araw na breakdown.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing [tuloy-tuloy na sinusubaybayan](../attendance/tracking-attendance.md) ang attendance para sa iyong mga serbisyo at grupo
- Tiyaking naka-configure sa B1 Admin ang iyong [mga grupo](../groups/creating-groups.md) at mga serbisyo
- Kailangan mo ng angkop na [mga permiso](../settings/roles-permissions.md) para ma-access ang mga report

</div>

## Attendance Trend {#attendance-trend}

Ipinapakita ng Attendance Trend report kung paano nagbabago ang attendance sa paglipas ng panahon para sa iyong mga serbisyo.

1. Direktang pumunta sa **admin.b1.church/reports/attendanceTrend** sa iyong browser (walang entry ang mga report sa navigation menu -- ang pinakamadaling paraan para makabalik dito ay i-bookmark ang address). Nasa Attendance page din ang parehong report: i-click ang **All years**, pagkatapos piliin ang tab na **Attendance Trend**.
2. Opsyonal na pumili ng **Campus**, **Service**, **Service Time**, o **Group** para i-filter ang mga resulta.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sinasaklaw ng report ang nakaraang taon, mula isang taon na ang nakalipas hanggang ngayon, at kasama nang buo ang end date. I-click ang **Run Report**.
4. Ipinapakita ng report ang bar chart at table ng kabuuang pagbisita kada linggo. Ang bawat linggo ay may label na petsa ng Linggo ng linggong iyon, at nakalista sa column na **Session Dates** ng table ang mga aktwal na petsa sa linggong iyon na may attendance (halimbawa, "9/27, 9/30").

Kapaki-pakinabang ang report na ito para makita ang mga pattern gaya ng seasonal na pagbaba, paglago ng trend, o epekto ng mga espesyal na event.

:::tip
Ang **All years** view ng Attendance page ay may tab na **Headcount Trend** sa pagitan ng dalawa pang tab, na nagpapakita sa chart ng mga headcount total na manual mong inilalagay (hindi mula sa indibidwal na check-in) para sa bawat linggo. Pareho ang mga filter nito na **Campus**, **Service**, **Service Time**, at **Group**.
:::

## Group Attendance {#group-attendance}

Ipinapakita ng Group Attendance report kung sino ang dumalo sa bawat session ng grupo sa isang saklaw ng petsa.

1. Direktang pumunta sa **admin.b1.church/reports/groupAttendance** sa iyong browser, o sa Attendance page i-click ang **All years** at piliin ang tab na **Group Attendance**.
2. Opsyonal na pumili ng **Campus** at **Service**.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sinasaklaw ng report ang mula sa nakaraang Linggo hanggang ngayon, at kasama nang buo ang end date.
4. I-click ang **Run Report**.

Nakapangkat ang mga resulta ayon sa session date, pagkatapos ayon sa service time, pagkatapos ayon sa grupo, kasama ang mga taong dumalo na nakalista sa ilalim ng bawat grupo. Nakaayos nang alpabeto ang mga service time, grupo, at pangalan. Sa tabi ng pangalan ng bawat tao, ipinapakita ng column na **Checked In** ang oras na naitala ang kanilang attendance (blangko kapag walang oras na nakatala), at ipinapakita ng column na **Membership Status** ang kanilang status, gaya ng Member o Visitor. Kasama rin ang mga session para sa mga grupong hindi nagkikita sa isang service time; lumalabas ang mga ito nang walang service time.

Para mag-download ng spreadsheet, i-click ang **Download Options** at piliin ang **Summary**. Ang CSV ay may:

- Isang row bawat miyembro ng bawat grupong nagkita sa saklaw ng petsa, nakaayos ayon sa grupo at pagkatapos ayon sa pangalan.
- Ang pangalan ng tao at pangalan ng grupo sa mga unang column.
- Isang column bawat may petsang session, na pinangalanan ayon sa service, service time, at petsa (halimbawa, "Sunday - 9:00 AM (2026-09-27)"), kung saan may markang **present** o **absent** ang bawat tao. Ang session na walang service time ay pinangalanan ayon sa petsa lamang.

Gamitin ang report na ito para ikumpara ang attendance ng iba't ibang grupo at tukuyin kung aling mga grupo ang lumalago o nangangailangan ng pansin.

## Daily Group Attendance {#daily-group-attendance}

Ang Daily Group Attendance report (may titulong **Group attendance by day**) ay nagbibigay ng bilang kada araw ng kung ilan ang dumalo sa isang grupo.

1. Direktang pumunta sa **admin.b1.church/reports/dailyGroupAttendance** sa iyong browser.
2. Gamitin ang mga dropdown na **Campus**, **Service**, at **Service Time** para paliitin ang listahan, pagkatapos piliin ang **Group** na gusto mong suriin.
3. Patakbuhin ang report. Inililista nito ang bawat araw na nagkita ang grupo, mula sa pinakamatanda, kasama ang **Date** at ang bilang ng **Attendees** na naitala sa araw na iyon.

Nagbibigay ang report na ito ng detalyadong impormasyon, na kapaki-pakinabang para maunawaan ang pagkakaiba-iba linggo-linggo o para matukoy ang mga partikular na araw na may hindi karaniwang mataas o mababang attendance.

:::tip
Gamitin ang Attendance Trend report para sa pangkalahatang overview, at ang Daily Group Attendance report kapag kailangan mong tingnan nang mas malalim ang mga partikular na petsa.
:::

## Mga Praktikal na Gamit {#practical-uses}

- **Pagpaplano** -- Gamitin ang mga attendance trend para planuhin ang upuan, staffing, at mga resources para sa mga darating na serbisyo.
- **Outreach** -- Tukuyin nang maaga ang pagbaba ng attendance para makapag-follow up ka sa mga miyembro.
- **Board reports** -- Isama ang datos ng attendance sa iyong regular na leadership reports para ipakita ang kalusugan ng ministeryo.
- **Pagsusuri ng event** -- Ikumpara ang attendance bago at pagkatapos ng mga espesyal na event para masukat ang epekto nito.

:::warning
Naitatala ang datos ng attendance sa pamamagitan ng iyong mga proseso ng check-in sa grupo at serbisyo. Kapag hindi tuloy-tuloy ang pagsubaybay sa attendance, hindi tutugma sa aktwal na pakikilahok ang iyong mga report. Tingnan ang [Pagsubaybay sa Attendance](../attendance/tracking-attendance.md) para sa mga tagubilin sa setup.
:::
