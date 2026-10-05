---
title: "Mga Ulat sa Attendance"
---

# Mga Ulat sa Attendance

<div class="article-intro">

Nagbibigay ang B1 Admin ng tatlong ulat sa attendance para matulungan kayong maunawaan kung paano nakikilahok ang mga tao sa inyong mga serbisyo at group. Bawat ulat ay nag-aalok ng ibang pananaw sa inyong datos ng attendance, mula sa pangkalahatang trend hanggang sa araw-araw na detalye.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Tiyaking [palagiang sinusubaybayan ang attendance](../attendance/tracking-attendance.md) para sa inyong mga serbisyo at group
- Tiyaking naka-configure sa B1 Admin ang inyong [mga group](../groups/creating-groups.md) at mga serbisyo
- Kailangan ninyo ng angkop na [mga pahintulot](../settings/roles-permissions.md) para ma-access ang mga ulat

</div>

## Attendance Trend

Ipinapakita ng ulat na Attendance Trend kung paano nagbabago ang attendance sa paglipas ng panahon para sa inyong mga serbisyo.

1. Pumunta nang direkta sa **admin.b1.church/reports/attendanceTrend** sa inyong browser (walang entry ang mga ulat sa navigation menu — ang pinakamadaling paraan para makabalik ay i-bookmark ang address). Makikita rin ang parehong ulat sa tab na **Attendance Trend** ng pahinang Attendance.
2. Opsyonal na pumili ng **Campus**, **Service**, **Service Time**, o **Group** para i-filter ang mga resulta.
3. I-set ang **Start Date** at **End Date**. Bilang default, sakop ng ulat ang nakaraang isang taon, mula isang taon na ang nakalipas hanggang ngayon, at buong isinasama ang end date. I-click ang **Run Report**.
4. Ipinapakita ng ulat ang bar chart at talahanayan ng kabuuang bilang ng pagdalo bawat linggo. Ang bawat linggo ay may label na petsa ng Linggo ng linggong iyon, at ang column na **Session Dates** ng talahanayan ay naglilista ng mga aktwal na petsa sa linggong iyon na may attendance (halimbawa, "9/27, 9/30").

Kapaki-pakinabang ang ulat na ito para makita ang mga pattern tulad ng pana-panahong pagbaba, trend ng paglago, o epekto ng mga espesyal na kaganapan.

## Group Attendance

Ipinapakita ng ulat na Group Attendance kung sino ang dumalo sa bawat session ng group sa isang saklaw ng petsa.

1. Pumunta nang direkta sa **admin.b1.church/reports/groupAttendance** sa inyong browser, o buksan ang tab na **Group Attendance** ng pahinang Attendance.
2. Opsyonal na pumili ng **Campus** at **Service**.
3. I-set ang **Start Date** at **End Date**. Bilang default, sakop ng ulat ang nakaraang Linggo hanggang ngayon, at buong isinasama ang end date.
4. I-click ang **Run Report**.

Pinagsasama-sama ang mga resulta ayon sa petsa ng session, pagkatapos ay oras ng serbisyo, pagkatapos ay group, at nakalista sa ilalim ng bawat group ang mga taong dumalo. Naka-alpabeto ang pagkakasunod ng mga oras ng serbisyo, group, at pangalan. Sa tabi ng pangalan ng bawat tao, ipinapakita ng column na **Checked In** ang oras na naitala ang kanyang attendance (blangko kung walang naka-file na oras) at ipinapakita ng column na **Membership Status** ang kanyang status, tulad ng Member o Visitor.

Para mag-download ng spreadsheet, i-click ang **Download Options** at piliin ang **Summary**. Ang CSV ay may:

- Isang row para sa bawat miyembro ng bawat group na nagpulong sa saklaw ng petsa, naka-sort ayon sa group at pagkatapos ay pangalan.
- Ang pangalan ng tao at pangalan ng group sa mga unang column.
- Isang column para sa bawat session na may petsa, na ipinangalan gamit ang serbisyo, oras ng serbisyo, at petsa (halimbawa, "Sunday - 9:00 AM (2026-09-27)"), kung saan minarkahan ang bawat tao bilang **present** o **absent**.

Gamitin ang ulat na ito para ihambing ang attendance sa iba't ibang group at tukuyin kung aling mga group ang lumalago o nangangailangan ng pansin.

## Daily Group Attendance

Nagbibigay ang ulat na Daily Group Attendance ng araw-araw na detalye ng datos ng attendance para sa inyong mga group.

1. Pumunta nang direkta sa **admin.b1.church/reports/dailyGroupAttendance** sa inyong browser.
2. I-set ang **saklaw ng petsa** para sa ulat.
3. Piliin ang **mga group** na gusto ninyong suriin.
4. Ipinapakita ng ulat ang bilang ng attendance para sa bawat araw sa loob ng saklaw.

Nagbibigay ang ulat na ito ng detalyadong impormasyon, na makakatulong para maunawaan ang pagkakaiba-iba kada linggo o matukoy ang mga partikular na araw na hindi karaniwang mataas o mababa ang attendance.

:::tip
Gamitin ang ulat na Attendance Trend para sa pangkalahatang tanaw at ang ulat na Daily Group Attendance kapag kailangan ninyong suriin nang malapitan ang mga partikular na petsa.
:::

## Mga Praktikal na Gamit

- **Pagpaplano** -- Gamitin ang mga trend ng attendance para magplano ng upuan, tauhan, at mga resource para sa mga susunod na serbisyo.
- **Outreach** -- Tukuyin nang maaga ang mga pattern ng pagbaba ng attendance para ma-follow up ang mga miyembro.
- **Mga ulat sa board** -- Isama ang datos ng attendance sa inyong regular na ulat sa pamunuan para ipakita ang kalusugan ng ministeryo.
- **Pagsusuri ng kaganapan** -- Ihambing ang attendance bago at pagkatapos ng mga espesyal na kaganapan para masukat ang epekto nito.

:::warning
Naitatala ang datos ng attendance sa pamamagitan ng check-in process ng inyong mga group at serbisyo. Kung hindi palagiang sinusubaybayan ang attendance, hindi tumpak na maipapakita ng inyong mga ulat ang aktwal na pakikilahok. Tingnan ang [Pagsubaybay ng Attendance](../attendance/tracking-attendance.md) para sa mga tagubilin sa pag-set up.
:::
