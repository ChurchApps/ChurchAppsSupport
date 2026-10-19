---
title: "Pagkumpleto ng Check-In"
---

# Pagkumpleto ng Check-In

<div class="article-intro">

Kapag nasuri mo na ang iyong household at nagawa ang anumang kinakailangang pagtatalaga sa grupo, handa ka nang tapusin ang check-in. Ito ang huling hakbang sa daloy ng kiosk — isinusumite ng app ang attendance, nagpi-print ng mga label, at nagre-reset para sa susunod na pamilya.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Suriin ang iyong household](./household-review) sa household review screen
- [Magtalaga ng mga grupo](./group-assignment) sa sinumang miyembro ng pamilya na kailangang pumasok sa isang partikular na klase o programa
- Opsyonal, [magdagdag ng mga bisita](./adding-guests) na kasama ng iyong pamilya

</div>

## Paano Mag-Check In

1. Mula sa **household review screen**, i-tap ang button na **Check-in** sa ibaba ng screen.
2. Ipinapadala ng app ang datos ng attendance sa server at nagpapakita ng **success screen** na may berdeng check mark at mensaheng pang-welcome.

Iyon lang ang kailangan. Naitala na ang attendance ng iyong pamilya.

## Mga Puno na Silid at Ratio ng Volunteer

Kung na-configure ng iyong simbahan ang [mga limitasyon sa kaligtasan](../../b1-admin/attendance/checkin-safety) sa mga silid, sinusuri ito ng server bago mag-save:

- Kung **puno o sarado** ang napiling silid, hindi matutuloy ang check-in at pangalanan ng app ang silid para makapili ka ng iba.
- Kung may [iskedyul ng check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) ang oras ng serbisyo at hindi bukas ang check-in window nito ngayon, tinatanggihan din ang check-in sa mga silid ng oras ng serbisyong iyon. Ipinapakita ng screen na **Can't check in yet** ang silid kasama ang dahilang "check-in isn't open right now"; i-tap ang **Change Rooms** para pumili ng ibang oras ng serbisyo o grupo. (Ang mga oras ng serbisyong sarado na kapag [pumili ka ng serbisyo](./selecting-service#when-check-in-isnt-open) ay nakatago, kaya kadalasan ay makikita mo lamang ito kung nagsara ang isang window habang may check-in.)
- Kung **kulang ang volunteer** ang silid ng mga bata para sa ratio nito, alinman sa magpapakita ang app ng babala na maaaring kumpirmahin ng isang staff member para magpatuloy, o tuluyang haharangin ang check-in — depende sa kung paano na-configure ng iyong simbahan ang pagpapatupad ng ratio.

## Pag-print ng Label

Kung may naka-configure na network printer, awtomatikong nagpi-print ang app ng mga label pagkatapos ng check-in:

- **Mga name label** ay ipinii-print para sa bawat taong nakatalaga sa grupong may naka-enable na setting na **Print Nametag**. Kasama sa name label ang pangalan ng tao, ang kanilang takda sa grupo, at impormasyon tungkol sa allergy o mga tala kung mayroon sa file.
- **Mga parent pickup slip** ay ipinii-print kapag may sinumang naka-check in na nasa grupong may naka-enable na setting na **Parent Pickup**. Nilalaktawan ang mga naka-check in bilang **Volunteer**, kaya hindi makakakuha ng pickup slip ang isang childcare worker na naglilingkod sa silid na Parent Pickup. Nakalista sa pickup slip ang mga bata, ang kanilang mga takda sa grupo, at isang natatanging **4-character na security code**.

:::info
Pareho ang security code na lumalabas sa name label ng bata at sa pickup slip ng magulang. Sa oras ng pagkuha, itinutugma ng mga volunteer ang mga code para matiyak na tamang adult ang sumusundo sa bawat bata.
:::

Bagong nabubuo ang security code para sa bawat check-in at gumagamit lamang ng mga katinig at numero (hindi kasama ang mga patinig para maiwasan ang pagbuo ng hindi angkop na mga salita).

:::warning
Kung hindi nagpi-print ang mga label, buksan ang Admin Settings sa pamamagitan ng pag-tap sa **logo ng simbahan** nang pitong beses, pagkatapos ay i-tap ang **Change Printer** para i-verify ang koneksyon ng printer. Tingnan ang [Printer Setup](../getting-started/printer-setup) para sa mga hakbang sa pag-troubleshoot.
:::

## Ano ang Mangyayari Pagkatapos ng Check-In

- Kung may naka-configure na printer, ipiniprint ng app ang lahat ng label at pagkatapos ay awtomatikong babalik sa **lookup screen**, handa para sa susunod na pamilya.
- Kung walang naka-configure na printer, ipinapakita ng success screen ang ilang segundo at pagkatapos ay awtomatikong babalik sa **lookup screen**.

Hindi mo kailangang i-tap ang anuman para makabalik sa lookup screen — ang app na ang bahala sa transisyon.

:::tip
Ganap na nire-reset ng app pagkatapos ng bawat check-in, kaya walang panganib na makita ng isang pamilya ang impormasyon ng ibang pamilya.
:::

## Ano ang Naitatala

Kapag na-tap mo ang **Check-in**, ipinapadala ng app sa server ang sumusunod para sa bawat miyembro ng household na may takda sa grupo:

- Ang **taong** ichi-check in
- Ang **serbisyo** na kanilang dinadaluhan
- Ang **oras ng serbisyo** at **grupo** na kanilang nakatalaga

Lumalabas ang datos na ito sa B1 Admin sa ilalim ng seksyong Attendance, kung saan maaaring tingnan at pamahalaan ng mga administrator ng iyong simbahan ang mga record ng attendance. Tingnan ang [check-in administration guide](../../b1-admin/attendance/check-in.md) para sa mga detalye.
