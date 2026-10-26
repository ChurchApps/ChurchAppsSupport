---
title: "Mga Ulat ng Pagdalo"
---

# Mga Ulat ng Pagdalo

<div class="article-intro">

Nagbibigay ang B1 Admin ng tatlong ulat ng pagdalo para matulungan kang maunawaan kung paano nakikilahok ang mga tao sa iyong mga serbisyo at group. Bawat ulat ay nag-aalok ng ibang pananaw sa datos ng iyong pagdalo, mula sa mataas na antas na trend hanggang sa pang-araw-araw na breakdown.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing [tuloy-tuloy na sinusubaybayan](../attendance/tracking-attendance.md) ang pagdalo para sa iyong mga serbisyo at group
- Tiyaking naka-configure sa B1 Admin ang iyong [mga group](../groups/creating-groups.md) at serbisyo
- Kailangan mo ng angkop na [pahintulot](../settings/roles-permissions.md) para ma-access ang mga ulat

</div>

## Trend ng Pagdalo

Ipinapakita ng ulat na Attendance Trend kung paano nagbabago ang pagdalo sa paglipas ng panahon para sa iyong mga serbisyo.

1. Direktang pumunta sa **admin.b1.church/reports/attendanceTrend** sa iyong browser (walang entry ang mga ulat sa navigation menu — ang pinakamadaling paraan para makabalik dito ay i-bookmark ang address). Nasa pahinang Attendance din ang parehong ulat: i-click ang **All years**, pagkatapos piliin ang tab na **Attendance Trend**.
2. Opsyonal na pumili ng **Campus**, **Service**, **Service Time**, o **Group** para i-filter ang mga resulta.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sakop ng ulat ang nakalipas na taon, mula isang taon na ang nakalipas hanggang ngayon, at kasama nang buo ang end date. I-click ang **Run Report**.
4. Nagpapakita ang ulat ng bar chart at table ng kabuuang pagbisita bawat linggo. Nilalagyan ng label ang bawat linggo ng petsa ng Linggo ng linggong iyon, at inililista ng column na **Session Dates** ng table ang aktwal na mga petsa sa linggong iyon na may attendance (halimbawa, "9/27, 9/30").

Kapaki-pakinabang ang ulat na ito para makita ang mga pattern tulad ng pana-panahong pagbaba, paglago ng trend, o epekto ng mga espesyal na event.

## Group Attendance

Ipinapakita ng ulat na Group Attendance kung sino ang dumalo sa bawat session ng group sa isang saklaw ng petsa.

1. Direktang pumunta sa **admin.b1.church/reports/groupAttendance** sa iyong browser, o sa pahinang Attendance i-click ang **All years** at piliin ang tab na **Group Attendance**.
2. Opsyonal na pumili ng **Campus** at **Service**.
3. Itakda ang **Start Date** at **End Date**. Bilang default, sakop ng ulat ang nakaraang Linggo hanggang ngayon, at kasama nang buo ang end date.
4. I-click ang **Run Report**.

Ang mga resulta ay pinagpapangkat ayon sa petsa ng session, pagkatapos ayon sa oras ng serbisyo, pagkatapos ayon sa group, kasama ang mga taong dumalo na nakalista sa ilalim ng bawat group. Alpabetikong nakaayos ang mga oras ng serbisyo, group, at pangalan. Sa tabi ng pangalan ng bawat tao, ipinapakita ng column na **Checked In** ang oras na naitala ang kanyang pagdalo (blangko kapag walang oras na nakatala) at ipinapakita ng column na **Membership Status** ang kanyang status, gaya ng Member o Visitor.

Para mag-download ng spreadsheet, i-click ang **Download Options** at piliin ang **Summary**. Ang CSV ay may:

- Isang hilera bawat miyembro ng bawat group na nagpulong sa saklaw ng petsa, nakaayos ayon sa group at pagkatapos ayon sa pangalan.
- Ang pangalan ng tao at pangalan ng group sa mga unang column.
- Isang column bawat may-petsang session, pinangalanan ayon sa serbisyo, oras ng serbisyo, at petsa (halimbawa, "Sunday - 9:00 AM (2026-09-27)"), kung saan may markang **present** o **absent** ang bawat tao.

Gamitin ang ulat na ito para ihambing ang pagdalo sa iba't ibang group at tukuyin kung aling mga group ang lumalago o nangangailangan ng pansin.

## Pang-araw-araw na Group Attendance

Ang ulat na Daily Group Attendance (may pamagat na **Group attendance by day**) ay nagbibigay ng araw-araw na bilang ng kung ilang tao ang dumalo sa isang group.

1. Direktang pumunta sa **admin.b1.church/reports/dailyGroupAttendance** sa iyong browser.
2. Gamitin ang mga dropdown na **Campus**, **Service**, at **Service Time** para paliitin ang listahan, pagkatapos piliin ang **Group** na gusto mong suriin.
3. Patakbuhin ang ulat. Inililista nito ang bawat araw na nagpulong ang group, pinakamatanda muna, kasama ang **Date** at ang bilang ng **Attendees** na naitala sa araw na iyon.

Nagbibigay ang ulat na ito ng detalyadong impormasyon, na nakakatulong para maunawaan ang pagkakaiba-iba linggo-linggo o para matukoy ang mga partikular na araw na may hindi pangkaraniwang mataas o mababang pagdalo.

:::tip
Gamitin ang ulat na Attendance Trend para sa mataas na antas na pangkalahatang-tanaw, at ang ulat na Daily Group Attendance kapag kailangan mong sumisid sa mga partikular na petsa.
:::

## Mga Praktikal na Gamit

- **Pagpaplano** -- Gamitin ang mga trend ng pagdalo para planuhin ang upuan, tauhan, at mga mapagkukunan para sa mga darating na serbisyo.
- **Outreach** -- Tukuyin nang maaga ang mga pattern ng pagbaba ng pagdalo para makapag-follow up ka sa mga miyembro.
- **Mga ulat sa board** -- Isama ang datos ng pagdalo sa iyong regular na mga ulat sa pamunuan para maipakita ang kalusugan ng ministeryo.
- **Pagsusuri ng event** -- Ihambing ang pagdalo bago at pagkatapos ng mga espesyal na event para masukat ang epekto nito.

:::warning
Naitatala ang datos ng pagdalo sa pamamagitan ng mga proseso ng check-in ng iyong mga group at serbisyo. Kung hindi tuloy-tuloy na sinusubaybayan ang pagdalo, hindi tumpak na maipapakita ng iyong mga ulat ang aktwal na partisipasyon. Tingnan ang [Tracking Attendance](../attendance/tracking-attendance.md) para sa mga tagubilin sa pag-set up.
:::
