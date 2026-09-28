---
title: "Pagkumpleto ng Check-In"
---

# Pagkumpleto ng Check-In

<div class="article-intro">

Kapag nasumusuri mo na ang iyong pamilya at nagawa na ang anumang kinakailangang pagtatalaga ng grupo, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa daloy ng gawain ng kiosk -- isinusumite ng app ang attendance, nagli-print ng mga label, at nagre-reset para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Suriin ang iyong sambahayan](./household-review) sa screen ng household review
- [Magtalaga ng mga grupo](./group-assignment) sa anumang miyembro ng pamilya na kailangang mag-check in sa isang partikular na klase o programa
- Opsyonal na [magdagdag ng anumang mga bisita](./adding-guests) na bumibisita kasama ang iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **household review screen**, i-tap ang pindutang **Check-in** sa ibaba ng screen.
2. Isinusumite ng app ang attendance data sa server at nagpapakita ng **success screen** na may berdeng checkmark at welcome message.

Iyon lang ang kailangan. Naitala na ang attendance ng iyong pamilya.

## Puno na mga Kuwarto at Volunteer Ratios

Kung nakonpigura ng iyong simbahan ang [safety limits](../../b1-admin/attendance/checkin-safety) sa mga kuwarto nito, sinusuri ito ng server bago mag-save:

- Kung ang napiling kuwarto ay **puno o sarado**, hindi sumusunod ang check-in at binabanggit ng app ang pangalan ng kuwarto upang makapili ka ng iba.
- Kung **kulang sa mga boluntaryo** ang isang kuwarto ng mga bata para sa kanyang ratio, magpapakita ang app ng isang babala na maaaring kumpirmahin ng isang staff member upang magpatuloy, o ganap na binablokan ang check-in -- depende sa kung paano nakonpigura ng iyong simbahan ang ratio enforcement.

## Label Printing

Kung may nakonpigurang network printer, awtomatikong nagli-print ang app ng mga label pagkatapos ng check-in:

- **Name labels** ay nili-print para sa bawat taong itinalaga sa isang grupo na may naka-enable na setting na **Print Nametag**. Kasama sa mga name label ang pangalan ng tao, ang kanilang grupo assignment, at allergy/notes information kung mayroon sa file.
- **Parent pickup slips** ay nili-print kapag ang sinumang naka-check-in ay nasa isang grupo na may naka-enable na setting na **Parent Pickup**. Ang mga taong naka-check-in bilang **Volunteer** ay nale-skip, kaya ang childcare worker na nagsisilbi sa isang Parent Pickup room ay hindi makakatanggap ng pickup slip. Ang pickup slip ay naglilista ng mga bata, ang kanilang mga grupo assignment, at isang natatanging **4-character security code**.

:::info
Ang parehong security code ay lumalabas sa parehong name label ng bata at sa pickup slip ng magulang. Sa pickup time, tinutugma ng mga boluntaryo ang mga code upang i-verify na ang tamang adulto ang kumukunha ng bawat bata.
:::

Ang security code ay nabubuo nang bago para sa bawat check-in at gumagamit lamang ng consonants at digits (mga vowel ay hindi kasama upang maiwasan ang pagbuo ng mga hindi angkop na salita).

:::warning
Kung hindi nagli-print ang mga label, buksan ang Admin Settings sa pamamagitan ng pag-tap sa **church logo** nang pitong beses, pagkatapos ay i-tap ang **Change Printer** upang i-verify ang printer connection. Tingnan ang [Printer Setup](../getting-started/printer-setup) para sa mga hakbang sa pag-troubleshoot.
:::

## Ano ang Nangyayari Pagkatapos ng Check-In

- Kung may nakonpigurang printer, nagli-print ang app ng lahat ng label at pagkatapos ay awtomatikong bumabalik sa **lookup screen**, handa para sa susunod na pamilya.
- Kung walang nakonpigurang printer, ipinapakita ang success screen sa loob ng ilang segundo at pagkatapos ay awtomatikong bumabalik sa **lookup screen**.

Hindi mo kailangang i-tap ang kahit ano upang bumalik sa lookup screen -- hinahandle ng app ang transition nang awtomatiko.

:::tip
Lubos na nagre-reset ang app pagkatapos ng bawat check-in, kaya walang panganib na makita ng isang pamilya ang impormasyon ng ibang pamilya.
:::

## Ano ang Naitala

Kapag na-tap mo ang **Check-in**, ipinapadala ng app ang mga sumusunod sa server para sa bawat miyembro ng sambahayan na may grupo assignment:

- Ang **taong** naka-check-in
- Ang **serbisyong** kanilang dinadaluhan
- Ang **service time** at **grupong** kung saan sila itinalaga

Lumilitaw ang datos na ito sa B1 Admin sa ilalim ng Attendance section, kung saan maaaring tingnan at pamahalaan ng mga administrator ng iyong simbahan ang mga attendance record. Tingnan ang [check-in administration guide](../../b1-admin/attendance/check-in.md) para sa mga detalye.
