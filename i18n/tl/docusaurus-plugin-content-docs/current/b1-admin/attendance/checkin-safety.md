---
title: "Kaligtasan sa Check-In"
---

# Kaligtasan sa Check-In

<div class="article-intro">

Kasama sa B1 ang isang set ng mga kontrol sa kaligtasan ng bata para sa check-in: mga limitasyon sa kapasidad ng silid at ratio ng volunteer sa bata, gabay sa edad at grado sa kiosk, mga uri ng check-in na nagbibigay-pagkakaiba sa mga miyembro, bisita, at volunteer, at isang listahan ng mga pinagkakatiwalaang tagakuha kada sambahayan na bine-verify sa check-out. Sinasaklaw ng pahinang ito kung paano i-configure ang bawat safety feature sa B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [istruktura ng attendance](setup.md) at [check-in kiosks](check-in.md)
- Ang mga silid ay [mga grupo](../groups/creating-groups.md) na naka-link sa mga oras ng serbisyo -- ang mga safety setting sa ibaba ay nasa grupo
- Ang page-a-parent at emergency broadcast ay nangangailangan ng nakakonektang texting provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Kapasidad ng Silid at Pagsasara ng Isang Silid

Ang bawat check-in room (grupo) ay maaaring magpatupad ng sarili nitong mga limitasyon. Buksan ang grupo, i-click ang **pencil icon** para i-edit ang mga setting nito, at hanapin ang seksyong **Check-In Capacity**:

- **Capacity** -- Ang pinakamataas na bilang ng mga taong maaaring i-check in sa silid na ito nang sabay-sabay. Kapag puno na ang silid, hinaharangan ang check-in dito at sinasabi ng kiosk ang pangalan ng punong silid.
- **Guest Capacity** -- Isang opsyonal na hiwalay na limitasyon kung ilang bisita ang kayang tanggapin ng silid.
- **Closed for Check-In** -- I-set sa **Yes** para agad na ihinto ang lahat ng check-in sa silid na ito (halimbawa, kapag kinansela ang isang klase o hindi available ang isang silid). Gumagana pa rin ang mga check-out.

## Ratio ng Volunteer

Ang parehong seksyong **Check-In Capacity** sa grupo ay may kasamang mga panuntunan sa staffing:

- **Children per Volunteer** -- Ang pinakamataas na bilang ng mga batang masasaklaw ng bawat naka-check-in na volunteer (hal. ang 5 ay nangangahulugang isang volunteer bawat limang bata).
- **Minimum Volunteers** -- Ang pinakamaliit na bilang ng mga volunteer na dapat naka-check in bago makapag-check-in ang mga bata sa silid.

Nabibilang ang mga volunteer sa mga panuntunang ito kapag nag-check in sila gamit ang uri na **Volunteer** sa kiosk (tingnan ang [Check-In Types](#check-in-types) sa ibaba).

### Pagpili sa Pagitan ng Warn at Block

Kung gaano kahigpit ipinapatupad ang mga ratio ay isang setting na para sa buong simbahan:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang **Check-In** tile.
2. I-set ang **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Nagpapakita ang kiosk ng babala kapag lampas sa ratio o kulang sa minimum na bilang ng volunteer ang isang silid, at maaaring kumpirmahin ng isang staff member na magpatuloy pa rin. Ito ang default.
   - **Block (prevent check-in)** -- Tinatanggihan ang check-in sa silid hanggang sa may sapat nang naka-check-in na volunteer.

:::info
Ang Capacity at Closed for Check-In ay palaging hard limit -- ang pagpili sa warn/block ay para lamang sa mga ratio ng volunteer.
:::

## Mga Uri ng Check-In

Bawat check-in ay nagtatala kung ang tao ay **Member**, **Guest**, o **Volunteer**. Pinipili ang uri gamit ang mga chip sa household screen ng kiosk (Member ang default). Nagpapakain ang mga uri sa mga safety rule -- nagbibigay ang mga volunteer ng ratio coverage, at nabibilang ang mga bisita laban sa Guest Capacity ng silid.

## Gabay sa Edad at Grado ng Silid

Maaari mong bigyan ang bawat silid ng saklaw ng edad o grado para gabayan ng kiosk ang mga pamilya sa tamang silid:

- Sa mga setting ng grupo, gamitin ang seksyong **Age & Grade** para i-set ang minimum/maximum na edad (taon at buwan) at/o grado para sa silid.
- Sa kiosk, ang mga silid na kwalipikado ang isang bata ay i-hi-highlight at ang mga hindi ay dini-dim. Ang isang dinim na silid ay maaari pa ring piliin sa pamamagitan ng kumpirmasyon ng staff -- kailanman ay hindi ganap na hinaharang ng gabay.

Nag-ro-rollover ang mga grado sa **petsa ng grade promotion** ng iyong simbahan:

1. Sa B1 Admin, pumunta sa **Settings > Manage Church** at buksan ang grade promotion tile.
2. I-set ang buwan at araw kung kailan pinoprumote ng iyong simbahan ang mga estudyante (halimbawa, Agosto 1). Ang mga edad at grado sa kiosk ay kinakalkula batay sa pinakahuling petsa ng promotion.

## Mga Pinagkakatiwalaan at Hindi Awtorisadong Tagakuha

Ang bawat sambahayan ay maaaring magkaroon ng listahan ng mga taong pinapayagan -- o hindi pinapayagan -- na kumuha ng kanilang mga anak.

1. Buksan ang pahina ng isang tao sa **People** at hanapin ang **Pickup** card.
2. I-click ang **Add**. Maghanap ng umiiral nang tao, o magdagdag ng taong wala sa sistema sa pamamagitan ng paglalagay ng kanilang **Name**, **Relationship**, at isang larawan.
3. I-set ang **Status**:
   - **Trusted** -- Sa check-out, lalabas ang taong ito bilang isang matatapik na pickup card na may kasamang larawan nila, na nagpapabilis sa berepikadong pagkuha.
   - **Not Authorized** -- Kung may susubukang kumuha sa ilalim ng pangalang ito, hinaharangan ng kiosk ang check-out na may babala. Maaaring i-override ito ng isang staff member, at itinatala ang override sa attendance record.

I-click ang status chip ng isang tao sa card para lumipat sa pagitan ng Trusted at Not Authorized.

:::tip
Magdagdag ng mga larawan sa mga pinagkakatiwalaang tagakuha kapag posible -- ipinapakita ng check-out screen ang larawan para ma-verify nang biswal ng mga volunteer ang taong nakatayo sa harap nila.
:::

## Page-a-Parent at Emergency Broadcast

Parehong nagpapadala ang mga feature na ito ng mga text message sa pamamagitan ng nakakonektang texting provider ng iyong simbahan -- walang built-in na serbisyo ng SMS, kaya kailangan munang i-configure ang isa sa mga suportadong provider.

- **Page a parent** -- Mula sa check-out screen ng isang manned na kiosk, maaaring mag-text ang staff sa mga magulang/tagapag-alaga ng isang naka-check-in na bata (halimbawa, "Mangyaring pumunta sa nursery").
- **Emergency broadcast** -- Mula sa admin settings ng kiosk, maaaring mag-text ang staff sa lahat ng tagapag-alaga ng bawat naka-check-in na sambahayan para sa napiling serbisyo nang sabay-sabay. Kinakailangang i-type ang **EMERGENCY** para kumpirmahin ang pagpapadala.

Ang mga taong nag-opt-out sa mga text, o walang naka-file na mobile number, ay awtomatikong nalalaktawan -- inuulat ng kiosk kung ilang mensahe ang naipadala at ilan ang nalaktawan.

Tingnan ang walkthrough sa panig ng kiosk sa [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out).

## Kaugnay na mga Artikulo

- [Check-In](check-in.md) — pag-setup ng kiosk at hardware
- [Check-Out & Child Safety](../../b1-checkin/check-in/checking-out) — ang check-out ng kiosk, pag-verify ng pagkuha, at mga proseso ng pag-page
- [Creating Groups](../groups/creating-groups.md) — kung saan nasa mga setting ng silid
- [Attendance Setup](setup.md) — mga serbisyo, oras ng serbisyo, at mga takdang silid
