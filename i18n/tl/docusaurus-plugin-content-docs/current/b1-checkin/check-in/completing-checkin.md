---
title: "Pagkumpleto ng Check-In"
---

# Pagkumpleto ng Check-In

<div class="article-intro">

Kapag nasuri mo na ang iyong household at nagawa na ang mga kinakailangang group assignment, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa kiosk workflow -- isinusumite ng app ang attendance, nagpi-print ng mga label, at nagre-reset para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Suriin ang iyong household](./household-review) sa household review screen
- [Mag-assign ng mga grupo](./group-assignment) sa sinumang miyembro ng pamilya na kailangang mag-check in sa isang partikular na klase o programa
- Opsyonal na [magdagdag ng mga bisita](./adding-guests) na bumibisita sa iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **household review screen**, i-tap ang **Check-in** button sa ibaba ng screen.
2. Isinusumite ng app ang attendance data sa server at nagpapakita ng **success screen** na may berdeng checkmark at welcome message.

Iyon na ang lahat. Naitala na ang attendance ng iyong pamilya.

## Pag-print ng Label

Kung may naka-configure na network printer, awtomatikong nagpi-print ng mga label ang app pagkatapos ng check-in:

- Ang **mga name label** ay ini-print para sa bawat tao na naka-assign sa isang grupo na may naka-enable na **Print Nametag** setting. Kasama sa mga name label ang pangalan ng tao, kanilang group assignment, at impormasyon tungkol sa allergy/notes kung mayroon sa file.
- Ang **mga parent pickup slip** ay ini-print kapag ang sinumang naka-check in na tao ay nasa grupo na may naka-enable na **Parent Pickup** setting. Ang pickup slip ay naglilista ng mga bata, kanilang mga group assignment, at isang natatanging **4-character security code**.

:::info
Ang parehong security code ay lumalabas sa name label ng bata at sa parent pickup slip. Sa oras ng pickup, tinutugma ng mga volunteer ang mga code para ma-verify na ang tamang adult ang kumukuha sa bawat bata.
:::

Ang security code ay binubuo nang panibago sa bawat check-in at gumagamit lamang ng mga consonant at digit (ang mga vowel ay hindi kasama para maiwasan ang pagbuo ng hindi naaangkop na mga salita).

:::warning
Kung hindi nagpi-print ang mga label, suriin ang printer status bar sa itaas ng screen. Maaari mo itong i-tap para ma-access ang printer settings at i-verify ang koneksyon. Tingnan ang [Pag-setup ng Printer](../getting-started/printer-setup) para sa mga hakbang sa troubleshooting.
:::

## Ano ang Nangyayari Pagkatapos ng Check-In

- Kung may naka-configure na printer, nagpi-print ang app ng lahat ng label at pagkatapos ay awtomatikong bumabalik sa **lookup screen**, handa na para sa susunod na pamilya.
- Kung walang naka-configure na printer, ang success screen ay ipinapakita nang ilang segundo at pagkatapos ay awtomatikong bumabalik sa **lookup screen**.

Hindi mo kailangang mag-tap ng anuman para bumalik sa lookup screen -- awtomatikong hinahawakan ng app ang transition.

:::tip
Ganap na nagre-reset ang app pagkatapos ng bawat check-in, kaya walang panganib na makita ng isang pamilya ang impormasyon ng ibang pamilya.
:::

## Ano ang Naitatala

Kapag nag-tap ka ng **Check-in**, ipinapadala ng app ang sumusunod sa server para sa bawat miyembro ng household na may group assignment:

- Ang **tao** na nagche-check in
- Ang **serbisyo** na kanilang dinaluhan
- Ang **oras ng serbisyo** at **grupo** na kanilang naka-assign

Ang data na ito ay lumalabas sa B1 Admin sa ilalim ng Attendance section, kung saan maaaring tingnan at pamahalaan ng mga administrator ng iyong simbahan ang mga attendance record. Tingnan ang [gabay sa administrasyon ng check-in](../../b1-admin/attendance/check-in.md) para sa mga detalye.
