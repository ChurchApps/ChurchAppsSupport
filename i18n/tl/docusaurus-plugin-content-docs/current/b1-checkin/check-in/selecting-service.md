---
title: "Pagpili ng Serbisyo"
---

# Pagpili ng Serbisyo

<div class="article-intro">

Ang unang hakbang sa bawat check-in ay ang pagpili kung aling serbisyo ang iyong dinadaluhan. Lumalabas ang services screen kaagad pagkatapos ma-load ng app, at tinutukoy nito kung aling mga service time at grupo ang available para sa natitirang daloy ng check-in.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Mag-log in](../getting-started/logging-in) sa B1 Church Checkin app at piliin ang iyong simbahan
- Tiyaking [na-configure na ng administrator ng iyong simbahan ang mga serbisyo at service time](../../b1-admin/attendance/setup.md) sa B1 Admin

</div>

## Paano Ito Gumagana

1. Pagkatapos mag-log in (o pagkatapos ng auto-login sa mga susunod na pagbisita), ipinapakita ng app ang **services screen**.
2. Makikita mo ang listahan ng lahat ng serbisyong na-configure para sa iyong simbahan. Bawat serbisyo ay lumalabas bilang card na nagpapakita ng pangalan ng serbisyo (halimbawa, "Sunday Morning" o "Wednesday Evening").
3. I-tap ang serbisyong dinadaluhan mo.

Kinukuha ng app ang mga service time at grupong nauugnay sa serbisyong iyon, at dinadala ka sa [member lookup screen](./looking-up-members).

## Kapag Hindi Bukas ang Check-In

Kung binigyan ng iyong administrator ng service time ng [check-in schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule), papayagan lamang ng app ang mga pamilyang pumili ng service time na iyon habang bukas ang check-in window nito. Ang mga service time na sarado ang window sa ngayon ay lumalabas pa rin sa [household screen](./household-review), ngunit may markang **Closed** (halimbawa, **Closed · opens Sun 9:30 AM**) sa halip na nag-aalok ng group button.

Kung sarado ang lahat ng service time ng serbisyong na-tap mo, sasabihin sa iyo ng app kung kailan magbubukas ang check-in -- halimbawa, **"Check-in for this service opens Sun 9:30 AM."** (Kung walang maipapakitang oras ng pagbubukas, sasabihin nito ang **"Check-in isn't open for this service right now."**) I-tap ang **Back** para bumalik sa listahan ng mga serbisyo at pumili ng ibang serbisyo, o maghintay hanggang magbukas ang window at subukang muli.

:::info
Sumusunod ang mga check-in window sa time zone ng campus ng serbisyo. Kung walang naka-set na time zone ang campus na iyon, ginagamit ang time zone ng iyong simbahan. Kung tila nagbubukas ang isang service time sa maling oras, hilingin sa iyong administrator na suriin ang time zone sa mga setting ng campus o simbahan. Sa household screen, ginagamit din ng kiosk ang sariling orasan ng tablet para buksan at isara ang mga service time, kaya siguraduhing tama ang oras at time zone ng tablet.
:::

:::info
Itinatakda ng administrator ng iyong simbahan ang mga serbisyo sa B1 Admin sa ilalim ng seksyong Attendance. Kung hindi mo makita ang serbisyong inaasahan mo, hilingin sa iyong admin na tiyaking nagawa na ito sa [attendance setup](../../b1-admin/attendance/setup.md).
:::

## Ano ang Nangyayari sa Likod ng Eksena

Kapag pumili ka ng serbisyo, kumukuha ang app ng tatlong bagay mula sa server:

- Ang **mga service time** para sa serbisyong iyon (halimbawa, ang isang serbisyo ay maaaring may 9:00 AM at 11:00 AM na time slot).
- Ang **mga grupong** available sa bawat service time (halimbawa, Nursery, Preschool, Elementary).
- Ang **mga ugnayan ng grupo-sa-service-time** na tumutukoy kung aling mga grupo ang available sa aling mga oras.

Naka-cache sa lokal ang datos na ito para mabilis at responsive ang natitirang proseso ng check-in.

:::tip
Kung isa lamang ang serbisyong naka-configure sa iyong simbahan, kailangan mo pa rin itong i-tap para magpatuloy. Hindi awtomatikong pumipili ng iisang serbisyo ang app.
:::

## Susunod na Hakbang

Pagkatapos pumili ng serbisyo, [hahanapin mo ang iyong pamilya](./looking-up-members) sa pamamagitan ng numero ng telepono o pangalan.
