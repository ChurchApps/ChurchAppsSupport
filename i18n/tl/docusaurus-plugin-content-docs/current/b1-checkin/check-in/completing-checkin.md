---
title: "Kumpleto ang Check-In"
---

# Kumpleto ang Check-In

<div class="article-intro">

Kapag na-review mo na ang iyong household at gumawa ng anumang kailangan na group assignment, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa kiosk workflow -- ang app ay nagsasumite ng attendance, nag-print ng label, at nag-reset para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Suriin ang iyong household](./household-review) sa household review screen
- [Italag ang mga grupo](./group-assignment) sa anumang miyembro ng pamilya na kailangan mag-check in sa isang specific na klase o programa
- Opsyonal na [magdagdag ng mga bisita](./adding-guests) na bumibisita sa iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **household review screen**, i-tap ang **Check-in** button sa ibaba ng screen.
2. Ang app ay nagsasumite ng attendance data sa server at nagpapakita ng **success screen** na may berdeng checkmark at welcome message.

Iyon na lang ang kailangan. Ang attendance ng iyong pamilya ay naitala na.

## Puno na Mga Kuwarto at Volunteer Ratio

Kung naka-configure ang iyong simbahan ng [safety limits](../../b1-admin/attendance/checkin-safety) sa mga kuwarto nito, sinusuri ng server ang mga ito bago magsave:

- Kung ang isang napiling kuwarto ay **puno o sarado**, ang check-in ay hindi napupunta at ang app ay tinatawag ang kuwarto para sa iyo na pumili ng iba.
- Kung ang isang bata na kuwarto ay **kulang sa volunteer** para sa ratio nito, ang app ay nagpapakita ng warning na maaaring kumpirmahin ng staff member upang magpatuloy, o blokado ang check-in nang buo -- depende sa kung paano naka-configure ang iyong simbahan ng ratio enforcement.

## Label Printing

Kung naka-configure ang network printer, ang app ay awtomatikong nag-print ng label pagkatapos ng check-in:

- Ang **Name label** ay nai-print para sa bawat taong italag sa isang grupo na may **Print Nametag** setting na naka-enable. Ang Name label ay kinabibilangan ng pangalan ng tao, ang kanilang group assignment, at allergy/notes information kung may nakafile.
- Ang **Parent pickup slip** ay nai-print kapag ang anumang naka-check in na tao ay nasa isang grupo na may **Parent Pickup** setting na naka-enable. Ang pickup slip ay naglilista ng mga bata, ang kanilang group assignment, at isang natatanging **4-character security code**.

:::info
Ang parehong security code ay lumilitaw sa parehong name label ng bata at sa pickup slip ng magulang. Sa oras ng pickup, ang mga volunteer ay tumutugma sa mga code upang i-verify na ang tamang adult ay nangongolekta sa bawat bata.
:::

Ang security code ay nabuo nang sariwa para sa bawat check-in at gumagamit lamang ng consonant at digit (ang vowel ay inalis upang iwasan ang pagbuo ng hindi angkop na salita).

:::warning
Kung hindi nag-print ang label, buksan ang Admin Settings sa pamamagitan ng pag-tap ng **church logo** pitong beses, pagkatapos ay i-tap ang **Change Printer** upang i-verify ang printer connection. Tingnan ang [Printer Setup](../getting-started/printer-setup) para sa troubleshooting steps.
:::

## Ano Ang Nangyayari Pagkatapos ng Check-In

- Kung naka-configure ang printer, ang app ay nag-print ng lahat ng label at pagkatapos ay awtomatikong bumalik sa **lookup screen**, handa para sa susunod na pamilya.
- Kung walang naka-configure na printer, ang success screen ay nagpapakita ng ilang segundo at pagkatapos ay awtomatikong bumalik sa **lookup screen**.

Hindi mo kailangang i-tap ang kahit ano upang bumalik sa lookup screen -- ang app ay humahawak ng transition nang awtomatiko.

:::tip
Ang app ay kumpleto na nag-reset pagkatapos ng bawat check-in, kaya walang risk na ang isang pamilya ay nakikita ang impormasyon ng ibang pamilya.
:::

## Ano Ang Naitala

Kapag i-tap mo ang **Check-in**, ang app ay nagpapadala sa server ng sumusunod para sa bawat miyembro ng household na may group assignment:

- Ang **person** na nag-check in
- Ang **service** na dadalohan nila
- Ang **service time** at **group** na italag sa kanila

Ang data na ito ay lumilitaw sa B1 Admin sa ilalim ng Attendance section, kung saan maaaring tingnan at pamahalaan ng iyong church administrator ang attendance record. Tingnan ang [check-in administration guide](../../b1-admin/attendance/check-in.md) para sa detalye.
