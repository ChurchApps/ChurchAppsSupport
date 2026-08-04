---
title: "Pagkumpleto ng Check-In"
---

# Pagkumpleto ng Check-In

<div class="article-intro">

Kapag nasuri mo na ang iyong sambahayan at nagawa na ang anumang kinakailangang pagtatalaga ng grupo, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa daloy ng gawain ng kiosk -- isinusumite ng app ang attendance, nagli-print ng mga label, at nagre-reset para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- [Suriin ang iyong sambahayan](./household-review) sa screen ng pagsusuri ng sambahayan
- [Magtalaga ng mga grupo](./group-assignment) sa anumang miyembro ng pamilya na kailangang mag-check in sa isang partikular na klase o programa
- Opsyonal na [magdagdag ng anumang bisita](./adding-guests) na dumadalaw kasama ang iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **screen ng pagsusuri ng sambahayan**, i-tap ang pindutang **Check-in** sa ibaba ng screen.
2. Isinusumite ng app ang datos ng attendance sa server at nagpapakita ng **success screen** na may berdeng check mark at mensahe ng pagbati.

Iyon lang ang kailangan. Naitala na ang attendance ng iyong pamilya.

## Puno na mga Kuwarto at Ratio ng Boluntaryo

Kung nakonpigura ng iyong simbahan ang [mga limitasyon sa kaligtasan](../../b1-admin/attendance/checkin-safety) sa mga kuwarto nito, sinusuri ito ng server bago mag-save:

- Kung **puno o sarado** ang piniling kuwarto, hindi tuloy ang check-in at binabanggit ng app ang pangalan ng kuwarto upang makapili ka ng iba.
- Kung **kulang sa boluntaryo** ang isang kuwarto ng bata para sa ratio nito, magpapakita ang app ng babala na maaaring kumpirmahin ng isang staff member upang magpatuloy, o buo na blinoblokan ang check-in -- depende sa kung paano nakonpigura ng iyong simbahan ang pagpapatupad ng ratio.

## Pag-print ng Label

Kung may nakonpigurang network printer, awtomatikong nagli-print ang app ng mga label pagkatapos mag-check in:

- Nagpi-print ang **mga label ng pangalan** para sa bawat taong itinalaga sa isang grupong may naka-enable na setting na **Print Nametag**. Kasama sa mga label ng pangalan ang pangalan ng tao, ang kanilang pagtatalaga ng grupo, at impormasyon ng allergy/tala kung mayroon.
- Nagpi-print ang **mga pickup slip ng magulang** kapag ang sinumang naka-check-in ay nasa isang grupong may naka-enable na setting na **Parent Pickup**. Nakalista sa pickup slip ang mga bata, ang kanilang mga pagtatalaga ng grupo, at isang natatanging **4-karakter na security code**.

:::info
Lumilitaw ang parehong security code sa parehong label ng pangalan ng bata at pickup slip ng magulang. Sa oras ng pagkuha, itinutugma ng mga boluntaryo ang mga code upang tiyakin na ang tamang adulto ang kumukuha sa bawat bata.
:::

Bagong binubuo ang security code para sa bawat check-in at gumagamit lamang ng mga katinig at digit (hindi kasama ang mga patinig upang maiwasan ang pagbuo ng mga hindi angkop na salita).

:::warning
Kung hindi nagli-print ang mga label, buksan ang Admin Settings sa pamamagitan ng pag-tap sa **logo ng simbahan** nang pitong beses, pagkatapos ay i-tap ang **Change Printer** upang i-verify ang koneksyon ng printer. Tingnan ang [Printer Setup](../getting-started/printer-setup) para sa mga hakbang sa pag-troubleshoot.
:::

## Ano ang Nangyayari Pagkatapos ng Check-In

- Kung may nakonpigurang printer, nagli-print ang app ng lahat ng label at pagkatapos ay awtomatikong bumabalik sa **screen ng lookup**, handa para sa susunod na pamilya.
- Kung walang nakonpigurang printer, ipinapakita ang success screen sa loob ng ilang segundo at pagkatapos ay awtomatikong bumabalik sa **screen ng lookup**.

Hindi mo na kailangang mag-tap ng kahit ano upang bumalik sa screen ng lookup -- hinahandle ng app ang paglipat nang awtomatiko.

:::tip
Lubos na nagre-reset ang app pagkatapos ng bawat check-in, kaya walang panganib na makita ng isang pamilya ang impormasyon ng ibang pamilya.
:::

## Ano ang Naitatala

Kapag na-tap mo ang **Check-in**, ipinapadala ng app ang mga sumusunod sa server para sa bawat miyembro ng sambahayan na may pagtatalaga ng grupo:

- Ang **taong** naka-check in
- Ang **serbisyong** kanilang dinadaluhan
- Ang **oras ng serbisyo** at **grupong** kung saan sila itinalaga

Lumilitaw ang datos na ito sa B1 Admin sa ilalim ng seksyong Attendance, kung saan maaaring tingnan at pamahalaan ng mga administrador ng iyong simbahan ang mga rekord ng attendance. Tingnan ang [gabay sa pangangasiwa ng check-in](../../b1-admin/attendance/check-in.md) para sa mga detalye.
