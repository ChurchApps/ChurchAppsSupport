---
title: "Pagkumpleto ng Check-In"
description: "Tapusin ang kiosk check-in ng isang pamilya sa B1 Checkin, kasama ang mga limitasyon ng kuwarto, pag-print ng label, security code sa pagkuha, at kung ano ang susunod na gagawin ng app."
---

# Pagkumpleto ng Check-In

<div class="article-intro">

Kapag na-review mo na ang iyong sambahayan at nagawa mo na ang anumang kinakailangang pagtatalaga sa grupo, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa daloy ng kiosk -- isinusumite ng app ang attendance, nagpi-print ng mga label, at nire-reset ang sarili para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Suriin ang iyong sambahayan](./household-review.md) sa screen ng pagsusuri ng sambahayan
- [Magtalaga ng mga grupo](./group-assignment.md) sa sinumang miyembro ng pamilya na kailangang mag-check in sa isang partikular na klase o programa
- Opsyonal na [magdagdag ng mga bisita](./adding-guests.md) na kasama ng iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **screen ng pagsusuri ng sambahayan**, i-tap ang button na **Check-in** sa ibaba ng screen.
2. Ipinapadala ng app ang datos ng attendance sa server at nagpapakita ng **success screen** na may berdeng checkmark at mensaheng pagbati.

Ayun lang ang kailangan. Naitala na ang attendance ng iyong pamilya.

Kung may sinumang napili mo na ang nag-check in para sa serbisyong ito ngayong araw, unang lilitaw ang isang **Already Checked In** na window at ipapakita nito ang kanilang pangalan. I-tap ang **Check In Again** para i-save ang bago nilang pinili ng grupo, o ang **Cancel** para bumalik sa screen ng sambahayan.

## Punong Kuwarto at Ratio ng Boluntaryo

Kung na-configure ng iyong simbahan ang [mga limitasyon sa kaligtasan](../../b1-admin/attendance/checkin-safety.md) sa mga kuwarto nito, sinusuri ito ng server bago i-save:

- Kung ang napiling kuwarto ay **puno o sarado**, hindi matutuloy ang check-in at pangalan ng kuwarto ang ipapakita ng app para makapili ka ng iba.
- Kung may [iskedyul ng check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) ang oras ng serbisyo at hindi pa bukas ang check-in window nito ngayon, tatanggihan din ang check-in sa mga kuwarto ng oras ng serbisyong iyon. Ipapakita ng screen na **Can't check in yet** ang kuwarto kasama ang dahilang "check-in isn't open right now"; i-tap ang **Change Rooms** para pumili ng ibang oras ng serbisyo o grupo. (Ang mga oras ng serbisyong sarado na ay makikita bilang **Closed** sa [screen ng sambahayan](./household-review.md) at hindi mapipili, kaya kadalasan makikita mo lamang ito kung nagsara ang window habang may ginagawang check-in.)
- Ang sambahayang nag-check in para sa naunang oras ng serbisyo ay maaaring bumalik sa ibang pagkakataon at magdagdag ng bukas na oras ng serbisyo, kahit sarado na ang naunang window. Mananatili ang kanilang mga dating check-in at hindi nito gagawing tanggihan ang bagong check-in.
- Kung kulang sa boluntaryo ang kuwarto ng mga bata para sa ratio nito, alinman sa magpapakita ang app ng babala na maaaring kumpirmahin ng isang staff para magpatuloy, o tuluyang haharangin ang check-in -- depende sa kung paano na-configure ng iyong simbahan ang pagpapatupad ng ratio.

## Pag-print ng Label

Kung may naka-configure na network printer, awtomatikong nagpi-print ang app ng mga label pagkatapos ng check-in:

- **Name label** ang ipinpi-print para sa bawat taong nakatalaga sa grupong may naka-enable na **Print Nametag** na setting. Kasama sa name label ang pangalan ng tao, ang kanilang pagtatalaga sa grupo, at impormasyon tungkol sa allergy o mga tala, kung mayroon sa rekord.
- **Parent pickup slip** ang ipinpi-print kapag may sinumang nag-check in na nasa grupong may naka-enable na **Parent Pickup** na setting. Nilalaktawan ang mga nag-check in bilang **Volunteer**, kaya hindi makakatanggap ng pickup slip ang isang childcare worker na naglilingkod sa kuwartong may Parent Pickup. Nakalista sa pickup slip ang mga bata, ang kanilang pagtatalaga sa grupo, at isang natatanging **4-character na security code**.

:::info
Lumilitaw ang parehong security code sa name label ng bata at sa pickup slip ng magulang. Sa oras ng pagkuha, itinutugma ng mga boluntaryo ang mga code para matiyak na tamang nasa hustong gulang ang kumukuha sa bawat bata.
:::

Ang security code ay ginagawa nang bago para sa bawat check-in, at gumagamit lamang ito ng mga katinig at numero (hindi kasama ang mga patinig upang maiwasan ang pagbuo ng hindi angkop na mga salita).

:::warning
Kung hindi nagpi-print ang mga label, buksan ang Admin Settings sa pamamagitan ng pag-tap sa **church logo** nang pitong beses, pagkatapos i-tap ang **Change Printer** para suriin ang koneksyon ng printer. Tingnan ang [Printer Setup](../getting-started/printer-setup.md) para sa mga hakbang sa pag-troubleshoot.
:::

## Ano ang Mangyayari Pagkatapos ng Check-In

- Kung may naka-configure na printer, ipi-print ng app ang lahat ng label at pagkatapos ay awtomatikong babalik sa **lookup screen**, handa para sa susunod na pamilya.
- Kung walang naka-configure na printer, awtomatikong babalik din ang app sa **lookup screen**.

Sa alinmang kaso, mananatili ang success screen nang hindi bababa sa 6 na segundo mula nang lumitaw ito (8 segundo kapag ipinagdiriwang nito ang milestone ng attendance ng isang tao), upang makita ng mga pamilya na gumana ang check-in. Kung mas matagal ang pag-print kaysa roon, babalik ang app mga isa at kalahating segundo pagkatapos matapos ang pag-print.

Hindi mo kailangang mag-tap ng anuman para makabalik sa lookup screen -- awtomatiko itong hinahawakan ng app. Kapag nakita na ang screen nang sandali, maaari mo itong i-tap para agad bumalik; ang tap sa unang isa at kalahating segundo ay hindi papansinin, kaya hindi malalaktawan ng mabilisang double tap sa **Check-in** ang screen.

:::tip
Ganap na nire-reset ng app pagkatapos ng bawat check-in, kaya walang panganib na makita ng isang pamilya ang impormasyon ng ibang pamilya.
:::

## Ano ang Naitatala

Kapag i-tap mo ang **Check-in**, ipinapadala ng app sa server ang sumusunod para sa bawat miyembro ng sambahayang may pagtatalaga sa grupo:

- Ang **taong** nagche-check in
- Ang **serbisyong** dinadaluhan nila
- Ang **oras ng serbisyo** at **grupo** kung saan sila nakatalaga

Lumalabas ang datos na ito sa B1 Admin sa ilalim ng seksyong Attendance, kung saan maaaring tingnan at pamahalaan ng mga administrator ng iyong simbahan ang mga talaan ng attendance. Tingnan ang [gabay sa pangangasiwa ng check-in](../../b1-admin/attendance/check-in.md) para sa mga detalye.
