---
title: "Pag-record ng Attendance"
description: "I-record ang attendance sa bawat pulong ng grupo sa B1 Admin: gumawa ng session, markahan ang dumalo, magsulat ng tala, at mag-print o mag-export ng roll sheet."
---

# Pag-record ng Attendance

<div class="article-intro">

Kapag naka-set up na ang iyong mga campus, oras ng serbisyo, at grupo, maaari mong i-record nang manual ang attendance pagkatapos ng bawat pagtitipon. Inaayos ng B1 Admin ang attendance ayon sa **mga session** -- isang session bawat grupo bawat petsa ng pagpupulong. Gagawin mo ang session, mamarkahan mo kung sino ang dumating, at direktang papasok ang datos sa iyong mga ulat ng attendance.

</div>

## Training Video

<YouTube id="gS8h2rhyMys" title="Recording and Tracking Attendance in B1" next="Creating Plans and Scheduling Volunteers in B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat naka-configure ang iyong mga campus, oras ng serbisyo, at grupo. Tingnan ang [Attendance Setup](setup.md) kung hindi mo pa ito nagagawa.
- Dapat naka-enable ang **Track Attendance** para sa mga grupong gusto mong subaybayan. Tingnan ang [Attendance Setup](setup.md) para sa mga detalye.
- Kailangan mo ang **Edit Attendance** permission para ma-save ang attendance. Maaari pa ring mag-take ng attendance sa ganitong paraan ang mga boluntaryong may **View People Names Only** lang para sa mga tao -- binubuksan nila ang mga klase mula sa **Groups** at nakikita lang ang mga miyembro ayon sa pangalan. Tingnan ang [People Names Only](../settings/roles-permissions.md#people-names-only).

</div>

## Paggawa ng Session

Ang session ay kumakatawan sa isang pagkakataon ng pagpupulong ng grupo -- halimbawa, ang iyong klase ng K--3rd grade sa isang partikular na Linggo.

1. Buksan ang **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **People**, at i-click ang **Groups**.
2. Piliin ang grupong gusto mong i-record ang attendance.
3. Sa seksyong **Sessions** ng pahina ng grupo, i-click ang **All sessions**.
4. I-click ang **New** para gumawa ng bagong session.
5. Kung nakatalaga sa oras ng serbisyo ang grupo, piliin ang **Service Time**. Kung hindi naka-iskedyul ang grupo, hindi lalabas ang field na ito.
6. Piliin ang **Session Date** -- maaaring ngayon, nakaraang petsa, o hinaharap na petsa.
7. I-click ang **Save**.

### Pagdagdag ng Session para sa Bawat Klase sa Isang Oras ng Serbisyo {#adding-sessions-for-every-class-in-a-service-time}

Kung may ibang grupong nagpupulong sa parehong oras ng serbisyo (halimbawa, lahat ng klase ng mga bata sa Linggo 9:00 AM), maaari mong gawin ang kanilang mga session sa iisang hakbang sa halip na bisitahin ang bawat grupo.

1. Sundin ang mga hakbang sa itaas at pumili ng **Service Time**.
2. Lagyan ng check ang **Also add for the other _N_ groups in _service time_**. Ipinapakita ng checkbox kung ilan pang grupo ang nakatalaga sa oras ng serbisyong iyon. Lumalabas lang ito kapag nagdaragdag ng bagong session at kahit isang iba pang grupo ang nagpupulong sa oras na iyon.
3. I-click ang **Save**.

Gagawa ng session para sa kasalukuyang grupo at para sa bawat iba pang grupo sa parehong petsa at oras ng serbisyo. Nilalaktawan ang mga grupong mayroon nang session para sa petsa at oras ng serbisyong iyon, kaya hindi ka magkakaroon ng duplicate.

:::tip
Maaari kang gumawa ng session para sa mga nakaraang petsa para habulin ang attendance na hindi mo pa naitala, o gumawa nang maaga para handa na ang mga ito kapag nagpulong ang iyong grupo.
:::

## Mga Tala ng Session {#session-notes}

Maaaring may tala ang bawat session -- buod ng tinalakay, mga anunsyo, o mga prayer request.

1. Kapag nagdaragdag ng session, o pagkatapos i-click ang **Edit** (lapis) na icon sa tabi ng session sa listahan, mag-type sa kahon ng **Notes (what was covered, announcements, prayer requests)** sa ilalim ng petsa. Pinapayagan ka ng toolbar na maglagay ng bold na teksto, listahan, at link.
2. I-click ang **Save**.

Lumalabas ang mga tala sa itaas ng listahan ng attendance ng session. Ang mga ito rin ang meeting notes na binabasa ng mga miyembro ng grupo sa seksyong **Meetings** ng pahina ng grupo sa B1.church, kung saan maaari ring magsulat at mag-edit ang mga group leader. Tingnan ang [Group Details](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Pagmarka ng Attendance

Piliin ang isang session para makita ang listahan ng attendance nito. Nakalista ang bawat miyembro ng grupo na may checkbox, nakaayos ayon sa last name, at ang sinumang nairekord na nang present ay naka-check na.

1. Lagyan ng check ang kahon sa tabi ng bawat taong dumalo. Gamitin ang **Select All** o **Select None** para baguhin ang lahat nang sabay-sabay.
2. Nag-a-update ang bilang sa itaas ng listahan (halimbawa, "12 of 15 present") habang naglalagay ka ng check.
3. I-click ang **Save Attendance**. Walang nare-record hangga't hindi mo na-save, at may mensaheng nagkukumpirma kapag tapos na ang pag-save. Kung susubukan mong isara o i-reload ang browser tab habang may nagpapatuloy pang pag-save, magbibigay muna ng babala ang browser para hindi mawala ang mga pagbabago.

Ang pag-uncheck sa taong dati nang naitalang present at pag-save pagkatapos nito ay nag-aalis sa kanya sa session.

### Pagdagdag ng Bisita

Para mairekord ang isang taong hindi miyembro ng grupo, hanapin siya sa person search sa tabi ng listahan ng attendance. Kung wala pa siya sa iyong database, maaari mo siyang gawin mula sa search. Sa alinmang paraan, idinadagdag siya sa listahan na naka-check na. I-click ang **Save Attendance** para mairekord siya.

Ang mga taong nag-check in sa kiosk ay may **Volunteer** o **Guest** chip. Ang mga taong hindi miyembro ng grupo ay may **Guest** chip.

## Pagtingin Kung Aling mga Grupo ang Kailangan Pa ng Attendance

Kapag ilang klase ang nagpupulong sa parehong oras ng serbisyo, makikita mo agad kung alin ang kailangan pang maglagay ng attendance para sa petsang iyon.

1. Buksan ang session na may oras ng serbisyo.
2. I-click ang **Who Still Needs Attendance** sa itaas ng listahan ng attendance.
3. Naglilista ang dialog ng bawat grupong nakatalaga sa oras ng serbisyong iyon, na may buod gaya ng "5 of 8 groups entered" sa itaas.

Ang mga grupong walang minarkahang present para sa petsang iyon ay nagpapakita ng **Not entered** chip at nauuna sa listahan. Ang mga grupong may attendance ay nagpapakita ng **Entered** kasama ang bilang ng mga taong minarkahang present (halimbawa, "Entered (12)"). I-click ang pangalan ng grupo para buksan ang mga session nito na nakapili na ang session ng parehong petsa, para agad mong maitala ang attendance nito. Kung wala pang session ang grupo para sa petsang iyon, bubukas ang listahan ng session nito para makapagdagdag ka ng isa.

:::tip
Pagsamahin ito sa **Print All Classes** at [pagdagdag ng session para sa bawat klase sa oras ng serbisyo](#adding-sessions-for-every-class-in-a-service-time): gumawa ng mga session, ipamigay ang mga roll sheet, pagkatapos gamitin ang **Who Still Needs Attendance** para makita kung aling mga sheet ang hindi pa naitatala.
:::

## Pag-print ng Roll Sheet {#printing-a-roll-sheet}

Ang roll sheet ay isang printable na listahan ng klase na maaaring markahan ng kamay ng mga guro at ibalik sa iyo para ilagay sa sistema sa ibang pagkakataon. Ipinapakita ng bawat sheet ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) na may pangalan ng simbahan sa ilalim, ang klase, isang malaking linyang **Date** sa ilalim ng pangalan ng klase, at ang oras ng serbisyo. Nakalista ang mga miyembro sa dalawang column (basahin pababa sa kaliwang column, pagkatapos sa kanan) para magkasya ang mas maraming pangalan sa isang pahina, at may kahon na **Present** at **Absent** ang bawat miyembro. May mga blangkong linya para sa mga bisita at isang lugar na **Teacher / Notes**.

- **Mula sa session** -- I-click ang **Print Roll Sheet** (printer) na icon sa itaas ng listahan ng attendance ng session. Nilalagyan ng petsa ng session ang sheet at ipinapakita ang oras ng serbisyo ng session na iyon.
- **Lahat ng klase para sa isang serbisyo** -- Kung may oras ng serbisyo ang session, i-click ang **Print All Classes** para mag-print ng isang sheet bawat klaseng nakatalaga sa oras ng serbisyong iyon. Bawat klase ay nagpi-print sa sarili nitong pahina.
- **Mula sa listahan ng miyembro** -- Sa pahina ng grupo, i-click ang **All members**, pagkatapos i-click ang **Print Roll Sheet** na icon sa itaas ng listahan ng miyembro at piliin ang **Attendance Sheet** para mag-print ng sheet na walang petsa. Mayroon ding layout na **Contact Roster** ang parehong menu na may telepono, email, at address ng bawat miyembro -- tingnan ang [Printing the Member List](../groups/group-members.md#printing-the-member-list).

Bumubukas ang sheet sa bagong tab at awtomatikong lumalabas ang print dialog ng iyong browser.

## Pag-export ng Attendance sa Spreadsheet

Maaari mong i-download ang record ng session bilang CSV file para magamit sa Excel, Numbers, o Google Sheets.

1. Buksan ang session na gusto mong i-export.
2. I-click ang **Export** na button sa itaas ng listahan ng attendance.
3. Buksan ang na-download na file sa iyong spreadsheet application.

## Pagtingin sa Naitalang Attendance

Pagkatapos mag-record ng mga session, lalabas ang datos sa iyong mga ulat ng attendance.

- **Attendance Trend tab** (sa ilalim ng **All years** sa pahina ng Attendance) -- nagpapakita ng mga trend ng buong simbahan sa paglipas ng panahon. Tingnan ang [Tracking Attendance](tracking-attendance.md).
- **Group Attendance tab** -- nagpapakita ng attendance ayon sa bawat indibidwal na grupo. Tingnan ang [Attendance Reports](../reports/attendance-reports.md#group-attendance).

:::tip
Kung hindi agad lumabas sa mga ulat ang session na kakagawa mo lang, tiyaking nasa loob ng saklaw ng petsa na napili sa mga filter ng ulat ang petsa ng session.
:::
