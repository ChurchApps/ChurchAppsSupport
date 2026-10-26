---
title: "Pagkumpleto ng Check-In"
---

# Pagkumpleto ng Check-In

<div class="article-intro">

Kapag nasuri mo na ang iyong household at nagawa ang anumang kinakailangang pagtatalaga ng grupo, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa kiosk workflow -- isinusumite ng app ang attendance, nag-iimprenta ng mga label, at nagre-reset para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Suriin ang iyong household](./household-review) sa household review screen
- [Magtalaga ng grupo](./group-assignment) sa mga miyembro ng pamilyang kailangang mag-check in sa isang partikular na klase o programa
- Opsyonal na [magdagdag ng mga bisita](./adding-guests) na kasama ng iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **household review screen**, pindutin ang **Check-in** button sa ibaba ng screen.
2. Isinusumite ng app ang datos ng attendance sa server at nagpapakita ng **success screen** na may berdeng checkmark at mensaheng pagbati.

Iyon lamang ang kailangan. Naitala na ang attendance ng iyong pamilya.

## Mga Puno na Kuwarto at Ratio ng Volunteer

Kung nagtakda ang iyong simbahan ng [safety limits](../../b1-admin/attendance/checkin-safety) sa mga kuwarto nito, sinusuri ng server ang mga ito bago i-save:

- Kung ang napiling kuwarto ay **puno o sarado**, hindi matutuloy ang check-in at pangangalanan ng app ang kuwarto para makapili ka ng iba.
- Kung may [check-in schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule) ang service time at hindi bukas ang check-in window nito sa ngayon, tatanggihan din ang check-in sa mga kuwarto ng service time na iyon. Ipinapakita ng screen na **Can't check in yet** ang kuwarto kasama ang dahilang "check-in isn't open right now"; pindutin ang **Change Rooms** para pumili ng ibang service time o grupo. (Ang mga service time na sarado na ay ipinapakita bilang **Closed** sa [household screen](./household-review) at hindi maaaring piliin, kaya kadalasan mo lamang ito makikita kung nagsara ang window habang nasa gitna ng check-in.)
- Ang household na nag-check in para sa naunang service time ay maaaring bumalik sa ibang pagkakataon at magdagdag ng bukas na service time, kahit sarado na ang naunang window. Mananatili ang kanilang mga umiiral na check-in at hindi nito maaapektuhan ang bagong check-in.
- Kung **kulang sa volunteer** ang kuwarto ng mga bata para sa ratio nito, alinman ay magpapakita ang app ng babalang maaaring kumpirmahin ng isang staff member para magpatuloy, o ganap na haharangin ang check-in -- depende sa kung paano na-configure ng iyong simbahan ang pagpapatupad ng ratio.

## Pag-iimprenta ng Label

Kung may naka-configure na network printer, awtomatikong nagpi-print ang app ng mga label pagkatapos ng check-in:

- **Name labels** ay iniimprenta para sa bawat taong nakatalaga sa grupong may naka-enable na **Print Nametag** setting. Kabilang sa name label ang pangalan ng tao, ang kanyang pagtatalaga sa grupo, at ang impormasyon tungkol sa allergy o mga tala kung mayroon nito sa file.
- **Parent pickup slips** ay iniimprenta kapag ang sinumang naka-check in na tao ay nasa grupong may naka-enable na **Parent Pickup** setting. Nilalaktawan ang mga naka-check in bilang **Volunteer**, kaya ang childcare worker na naglilingkod sa kuwartong Parent Pickup ay hindi makakatanggap ng pickup slip. Nakalista sa pickup slip ang mga bata, ang kanilang mga pagtatalaga sa grupo, at isang natatanging **4-character security code**.

:::info
Ang parehong security code ay lumalabas sa name label ng bata at sa pickup slip ng magulang. Sa oras ng pagkuha, itinutugma ng mga volunteer ang mga code para mapatunayan na tamang adulto ang kumukuha sa bawat bata.
:::

Ang security code ay ginagawa nang bago sa bawat check-in at gumagamit lamang ng katinig at digit (hindi kasama ang patinig para maiwasan ang pagbuo ng mga hindi angkop na salita).

:::warning
Kung hindi nag-iimprenta ang mga label, buksan ang Admin Settings sa pamamagitan ng pagpindot sa **church logo** nang pitong beses, pagkatapos ay pindutin ang **Change Printer** para i-verify ang koneksyon ng printer. Tingnan ang [Printer Setup](../getting-started/printer-setup) para sa mga hakbang sa pag-troubleshoot.
:::

## Ano ang Mangyayari Pagkatapos ng Check-In

- Kung may naka-configure na printer, ipi-print ng app ang lahat ng label at awtomatikong babalik sa **lookup screen**, handa para sa susunod na pamilya.
- Kung walang naka-configure na printer, awtomatikong bumabalik din ang app sa **lookup screen**.

Sa alinmang kaso, nananatili ang success screen nang hindi bababa sa 6 na segundo mula nang lumitaw ito (8 segundo kapag ipinagdiriwang nito ang milestone ng attendance ng isang tao), para makita ng mga pamilya na gumana ang check-in. Kung mas matagal ang pag-iimprenta kaysa roon, bumabalik ang app humigit-kumulang isa at kalahating segundo pagkatapos matapos ang pag-iimprenta.

Hindi mo kailangang pindutin ang anuman para bumalik sa lookup screen -- awtomatikong hinahawakan ng app ang transisyon. Kapag nakatayo na nang kaunti ang screen, maaari mo itong pindutin para bumalik agad; hindi papansinin ang pindot sa unang isa at kalahating segundo, kaya hindi lalaktawan ng mabilis na double tap sa **Check-in** ang screen.

:::tip
Ganap na nire-reset ng app pagkatapos ng bawat check-in, kaya walang panganib na makita ng isang pamilya ang impormasyon ng ibang pamilya.
:::

## Ano ang Naitatala

Kapag pinindot mo ang **Check-in**, ipinapadala ng app sa server ang sumusunod para sa bawat miyembro ng household na may pagtatalaga ng grupo:

- Ang **taong** ichi-check in
- Ang **serbisyong** dinadaluhan niya
- Ang **service time** at **grupo** na nakatalaga sa kanya

Lumalabas ang datos na ito sa B1 Admin sa ilalim ng seksyong Attendance, kung saan maaaring tingnan at pamahalaan ng mga administrator ng simbahan ang mga tala ng attendance. Tingnan ang [check-in administration guide](../../b1-admin/attendance/check-in.md) para sa mga detalye.
