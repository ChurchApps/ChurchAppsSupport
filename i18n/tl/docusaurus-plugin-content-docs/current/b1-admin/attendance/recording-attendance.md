---
title: "Pagtatala ng Attendance"
---

# Pagtatala ng Attendance

<div class="article-intro">

Kapag na-set up na ang iyong mga campus, service time, at group, maaari mo nang manual na itala ang attendance pagkatapos ng bawat pagtitipon. Inaayos ng B1 Admin ang attendance sa paligid ng **sessions** -- isang session bawat group bawat petsa ng pagpupulong. Gagawa ka ng session, markahan kung sino ang dumating, at direktang mapupunta ang datos sa iyong mga attendance report.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat na naka-configure ang iyong mga campus, service time, at group. Tingnan ang [Attendance Setup](setup.md) kung hindi mo pa ito nagagawa.
- Dapat naka-enable ang **Track Attendance** sa mga group na nais mong subaybayan. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.

</div>

## Paggawa ng Session

Ang session ay kumakatawan sa isang pagpupulong ng group -- halimbawa, ang iyong klase ng K--3rd grade sa isang partikular na Linggo.

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, at i-click ang **Groups**.
2. Piliin ang group na nais mong italaan ng attendance.
3. Sa seksyong **Sessions** ng pahina ng group, i-click ang **All sessions**.
4. I-click ang **New** upang gumawa ng bagong session.
5. Kung naka-assign ang group sa isang service time, piliin ang **Service Time**. Kung ito ay unscheduled group, hindi lalabas ang field na ito.
6. Piliin ang **Session Date** -- maaaring ngayon, nakaraang petsa, o hinaharap na petsa.
7. I-click ang **Save**.

### Pagdagdag ng Sessions para sa Bawat Klase sa Isang Service Time

Kung may iba pang group na nagpupulong sa parehong service time (halimbawa, lahat ng klase ng iyong mga anak tuwing Linggo 9:00 AM), maaari mong gawin ang kanilang mga session sa isang hakbang lamang sa halip na bisitahin ang bawat group.

1. Sundin ang mga hakbang sa itaas at pumili ng **Service Time**.
2. Lagyan ng check ang **Also add for the other _N_ groups in _service time_**. Ipinapakita ng checkbox kung ilan pang group ang naka-assign sa service time na iyon. Lumalabas lamang ito kapag nagdaragdag ng bagong session at kahit isang iba pang group ang nagpupulong sa oras na iyon.
3. I-click ang **Save**.

Isang session ang gagawin para sa kasalukuyang group at para sa bawat iba pang group sa parehong petsa at service time. Ang mga group na mayroon nang session para sa petsa at service time na iyon ay nilalaktawan, kaya walang madodoble.

:::tip
Maaari kang gumawa ng session para sa mga nakaraang petsa upang habulin ang attendance na hindi mo pa naitala, o gawin ang mga ito nang maaga para handa na kapag nagpupulong ang iyong group.
:::

## Pagmamarka ng Attendance

Piliin ang isang session upang makita ang listahan ng attendance nito. Nakalista ang bawat miyembro ng group na may checkbox, nakaayos ayon sa apelyido, at ang sinumang naitala na nang present ay naka-check na.

1. Lagyan ng check ang kahon sa tabi ng bawat taong dumalo. Gamitin ang **Select All** o **Select None** upang baguhin ang lahat nang sabay-sabay.
2. Ang bilang sa itaas ng listahan (halimbawa, "12 of 15 present") ay nag-a-update habang naglalagay ka ng check.
3. I-click ang **Save Attendance**. Walang maitatala hangga't hindi mo sine-save, at may mensaheng magkukumpirma kapag tapos na ang pag-save.

Kung i-uncheck mo ang taong dati nang naitalang present at pagkatapos ay i-save, aalisin siya sa session.

### Pagdagdag ng Bisita

Upang itala ang taong hindi miyembro ng group, hanapin siya sa person search sa tabi ng listahan ng attendance. Kung wala pa siya sa iyong database, maaari mo siyang gawin mula sa search. Sa alinmang paraan, idadagdag siya sa listahan na naka-check na. I-click ang **Save Attendance** upang maitala siya.

Ang mga taong nag-check in sa kiosk ay may **Volunteer** o **Guest** chip. Ang mga taong hindi miyembro ng group ay may **Guest** chip.

## Pagtingin Kung Aling Groups ang Kailangan Pa ng Attendance

Kapag maraming klase ang nagpupulong sa parehong service time, makikita mo agad kung alin ang kailangan pang ilagay ang attendance para sa petsang iyon.

1. Buksan ang isang session na may service time.
2. I-click ang **Who Still Needs Attendance** sa itaas ng listahan ng attendance.
3. Ipinapakita ng dialog ang bawat group na naka-assign sa service time na iyon, na may buod gaya ng "5 of 8 groups entered" sa itaas.

Ang mga group na walang sinumang namarkahang present para sa petsang iyon ay nagpapakita ng **Not entered** chip at nauuna sa listahan. Ang mga group na may attendance ay nagpapakita ng **Entered** kasama ang bilang ng mga taong namarkahang present (halimbawa, "Entered (12)"). I-click ang pangalan ng group upang buksan ang mga session ng group na iyon na may napili nang session para sa parehong petsa, upang maitala mo agad ang attendance nito. Kung wala pang session ang group para sa petsang iyon, bubukas ang listahan ng sessions nila upang makapagdagdag ka ng isa.

:::tip
Pagsamahin ito sa **Print All Classes** at [pagdagdag ng sessions para sa bawat klase sa isang service time](#adding-sessions-for-every-class-in-a-service-time): gumawa ng mga session, ipamigay ang mga roll sheet, at gamitin ang **Who Still Needs Attendance** upang makita kung aling mga sheet ang hindi pa naitatala.
:::

## Pag-print ng Roll Sheet

Ang roll sheet ay isang printable na listahan ng klase na maaaring markahan ng kamay ng mga guro at ibalik sa iyo para ilagay sa system sa ibang pagkakataon. Ang bawat sheet ay nagpapakita ng logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) na may pangalan ng simbahan sa ilalim, ang klase, isang malaking linya na **Date** sa ilalim ng pangalan ng klase, at ang service time. Nakalista ang mga miyembro sa dalawang column (basahin pababa sa kaliwang column, pagkatapos sa kanan) upang mas maraming pangalan ang kasya sa isang pahina, at may **Present** at **Absent** na kahon ang bawat miyembro. May mga blangkong linya para sa mga bisita at isang lugar para sa **Teacher / Notes**.

- **Mula sa session** -- I-click ang **Print Roll Sheet** (printer) icon sa itaas ng listahan ng attendance ng session. Ang sheet ay may petsa ng session.
- **Lahat ng klase para sa isang service** -- Kung may service time ang session, i-click ang **Print All Classes** upang i-print ang isang sheet para sa bawat klaseng naka-assign sa service time na iyon. Bawat klase ay nagpi-print sa sarili nitong pahina.
- **Mula sa member list** -- Sa pahina ng group, i-click ang **All members**, pagkatapos i-click ang **Print Roll Sheet** icon sa itaas ng listahan ng miyembro at piliin ang **Attendance Sheet** upang mag-print ng sheet na walang petsa. Ang parehong menu ay may **Contact Roster** layout na may telepono, email, at address ng bawat miyembro -- tingnan ang [Printing the Member List](../groups/group-members.md#printing-the-member-list).

Magbubukas ang sheet sa bagong tab at awtomatikong lalabas ang print dialog ng iyong browser.

## Pag-export ng Attendance sa Spreadsheet

Maaari mong i-download ang talaan ng session bilang CSV file upang magamit sa Excel, Numbers, o Google Sheets.

1. Buksan ang session na nais mong i-export.
2. I-click ang **Export** button sa itaas ng listahan ng attendance.
3. Buksan ang na-download na file sa iyong spreadsheet application.

## Pagtingin sa Naitalang Attendance

Pagkatapos maitala ang mga session, lalabas ang datos sa iyong mga attendance report.

- **Attendance Trend tab** (sa ilalim ng **All years** sa Attendance page) -- ipinapakita ang mga trend ng buong simbahan sa paglipas ng panahon. Tingnan ang [Tracking Attendance](tracking-attendance.md).
- **Group Attendance tab** -- ipinapakita ang attendance ayon sa bawat indibidwal na group. Tingnan ang [Attendance Reports](../reports/attendance-reports.md#group-attendance).

:::tip
Kung hindi agad lumabas sa mga report ang session na kakagawa mo lang, tiyaking nasa loob ng date range na napili sa mga filter ng report ang petsa ng session.
:::
