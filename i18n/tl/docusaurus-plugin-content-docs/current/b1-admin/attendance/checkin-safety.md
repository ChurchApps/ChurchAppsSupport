---
title: "Kaligtasan sa Check-In"
---

# Kaligtasan sa Check-In

<div class="article-intro">

May kasamang mga kontrol sa kaligtasan ng mga bata ang B1 para sa check-in: limitasyon sa kapasidad ng silid at ratio ng volunteer sa bata, gabay sa edad at grade sa kiosk, mga uri ng check-in na nagbubukod sa miyembro, bisita, at volunteer, at isang listahan ng mapagkakatiwalaang sumusundo para sa bawat sambahayan na bine-verify sa check-out. Tinatalakay ng pahinang ito kung paano i-configure ang bawat tampok pangkaligtasan sa B1 Admin.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang inyong [attendance structure](setup.md) at [mga check-in kiosk](check-in.md)
- Ang mga silid ay [mga grupo](../groups/creating-groups.md) na naka-link sa mga oras ng serbisyo — nasa grupo ang mga setting pangkaligtasan sa ibaba
- Ang page-a-parent at emergency broadcast ay nangangailangan ng nakakonektang texting provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), o Mutual Ministry)

</div>

## Kapasidad ng Silid at Pagsasara ng Silid

Maaaring magpatupad ng sariling limitasyon ang bawat check-in room (grupo). Buksan ang grupo, i-click ang **pencil icon** para i-edit ang mga setting nito, at hanapin ang seksyong **Check-In Capacity**:

- **Capacity** -- Ang pinakamaraming taong maaaring naka-check in sa silid na ito nang sabay-sabay. Kapag puno na ang silid, hinaharangan ang check-in dito at pinangangalanan ng kiosk ang punong silid.
- **Guest Capacity** -- Opsyonal na hiwalay na limitasyon sa dami ng bisitang kayang tanggapin ng silid.
- **Closed for Check-In** -- Itakda sa **Yes** para agad na ihinto ang lahat ng check-in sa silid na ito (halimbawa, kapag kanselado ang klase o hindi magagamit ang silid). Gumagana pa rin ang mga check-out.

## Mga Ratio ng Volunteer

Ang parehong seksyong **Check-In Capacity** sa grupo ay may kasamang mga patakaran sa staffing:

- **Children per Volunteer** -- Ang pinakamaraming batang maaaring bantayan ng bawat naka-check in na volunteer (hal. ang 5 ay nangangahulugang isang volunteer sa bawat limang bata).
- **Minimum Volunteers** -- Ang pinakamaliit na bilang ng volunteer na dapat naka-check in bago makapag-check in ang mga bata sa silid.

Nabibilang ang mga volunteer sa mga patakarang ito kapag nag-check in sila gamit ang uri na **Volunteer** sa kiosk (tingnan ang [Mga Uri ng Check-In](#check-in-types) sa ibaba).

### Pagpili sa Warn o Block

Ang higpit ng pagpapatupad ng mga ratio ay isang setting para sa buong simbahan:

1. Sa B1 Admin, pumunta sa **Settings** at buksan ang seksyong **Check-In**.
2. I-set ang **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Nagpapakita ang kiosk ng babala kapag sobra na ang ratio ng silid o kulang ito sa minimum na volunteer, at maaaring kumpirmahin ng staff na magpatuloy pa rin. Ito ang default.
   - **Block (prevent check-in)** -- Tatanggihan ang check-in sa silid hangga't hindi sapat ang mga naka-check in na volunteer.

:::info
Ang Capacity at Closed for Check-In ay palaging mahigpit na limitasyon — ang pagpili ng warn/block ay para lamang sa mga ratio ng volunteer.
:::

## Mga Uri ng Check-In

Itinatala ng bawat check-in kung ang tao ay **Member**, **Guest**, o **Volunteer**. Pinipili ang uri gamit ang mga chip sa household screen ng kiosk (ang Member ang default). Nakakaapekto ang mga uri sa mga patakarang pangkaligtasan — ang mga volunteer ang nagbibigay ng saklaw sa ratio, at ang mga bisita ay nabibilang sa Guest Capacity ng silid.

## Gabay sa Edad at Grade ng Silid

Maaari kayong magtakda ng saklaw ng edad o grade sa bawat silid para magabayan ng kiosk ang mga pamilya sa angkop na silid:

- Sa mga setting ng grupo, gamitin ang seksyong **Age & Grade** para itakda ang minimum/maximum na edad (taon at buwan) at/o grade para sa silid.
- Sa kiosk, naka-highlight ang mga silid na akma sa bata at malabo ang mga hindi. Maaari pa ring piliin ang malabong silid kung may kumpirmasyon ng staff — hindi kailanman ganap na humaharang ang gabay na ito.

Nagpapalit ang mga grade sa **grade promotion date** ng inyong simbahan:

1. Sa B1 Admin, pumunta sa **Settings** at buksan ang seksyong **Grade Promotion**.
2. Itakda ang buwan at araw kung kailan nagpo-promote ng mga estudyante ang inyong simbahan (halimbawa, Agosto 1). Kinakalkula ang mga edad at grade sa kiosk batay sa pinakahuling promotion date.

## Mga Mapagkakatiwalaan at Hindi Awtorisadong Sumusundo

Maaaring magkaroon ang bawat sambahayan ng listahan ng mga taong pinapayagan — o hindi pinapayagan — na sumundo sa mga anak nito.

1. Buksan ang pahina ng isang tao sa **People** at hanapin ang card na **Pickup**.
2. I-click ang **Add**. Maghanap ng kasalukuyang tao, o magdagdag ng taong wala pa sa sistema sa pamamagitan ng paglalagay ng kanyang **Name**, **Relationship**, at larawan.
3. Itakda ang **Status**:
   - **Trusted** -- Sa check-out, lalabas ang taong ito bilang pickup card na maaaring i-tap, kasama ang kanyang larawan, para mabilis ang na-verify na pagsundo.
   - **Not Authorized** -- Kung may magtangkang sumundo gamit ang pangalang ito, haharangin ng kiosk ang check-out at magpapakita ng babala. Maaaring mag-override ang isang staff, at naitatala ang override sa attendance record.

I-click ang status chip ng isang tao sa card para magpalit sa pagitan ng Trusted at Not Authorized.

:::tip
Magdagdag ng mga larawan sa mga mapagkakatiwalaang sumusundo hangga't maaari — ipinapakita ng check-out screen ang larawan para makumpirma ng mga volunteer sa pamamagitan ng paningin ang taong nasa harap nila.
:::

## Page-a-Parent at Emergency Broadcast

Parehong nagpapadala ng text message ang dalawang tampok sa pamamagitan ng nakakonektang texting provider ng inyong simbahan — walang built-in na SMS service, kaya dapat munang i-configure ang isa sa mga sinusuportahang provider.

- **Page a parent** -- Mula sa check-out screen ng kiosk na may nagbabantay, maaaring i-text ng staff ang mga magulang/guardian ng isang naka-check in na bata (halimbawa, "Pakipuntahan po ang nursery").
- **Emergency broadcast** -- Mula sa admin settings ng kiosk, maaaring i-text ng staff nang sabay-sabay ang mga guardian ng bawat naka-check in na sambahayan para sa napiling serbisyo. Kailangang i-type ang **EMERGENCY** para makumpirma ang pagpapadala.

Awtomatikong nilalaktawan ang mga taong nag-opt out sa mga text, o walang mobile number na nakatala — iuulat ng kiosk kung ilang mensahe ang naipadala at ilan ang nalaktawan.

Tingnan ang gabay sa panig ng kiosk sa [Check-Out at Kaligtasan ng Bata](../../b1-checkin/check-in/checking-out).

## Mga Kaugnay na Artikulo

- [Check-In](check-in.md) — setup ng kiosk at hardware
- [Check-Out at Kaligtasan ng Bata](../../b1-checkin/check-in/checking-out) — ang check-out sa kiosk, pag-verify ng sumusundo, at mga paraan ng paging
- [Paglikha ng mga Grupo](../groups/creating-groups.md) — kung nasaan ang mga setting ng silid
- [Attendance Setup](setup.md) — mga serbisyo, oras ng serbisyo, at pagtatalaga ng silid
- [Minimum na Edad para sa Private Message](../settings/mobile-app.md#member-directory--messaging-settings) — hinaharangan ang bagong private-message na usapan sa mga bata habang nananatili sila sa directory
