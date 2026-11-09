---
title: "Mga Push Notification"
description: "Magpadala o mag-iskedyul ng push notification sa lahat ng may app ng iyong simbahan o sa isang grupo mula sa B1 Admin, saka i-edit, ipadala, kanselahin, o burahin ang mga ito."
---

# Mga Push Notification

<div class="article-intro">

Hinahayaan ka ng pahinang **Push Notifications** sa ilalim ng **Mobile** na magpadala ng push notification sa lahat ng gumagamit ng app ng iyong simbahan, o sa mga miyembro ng isang grupo, agad o sa oras na pipiliin mo. Inililista nito ang mga nakaiskedyul, para maaari mong i-edit, ipadala, o kanselahin ang isang notification bago ito lumabas, at ipinapakita nito ang kasaysayan ng mga kamakailang notification na maaari mong burahin.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para magpadala sa **Everyone with the app**, kailangan mo ng permiso na mag-edit ng content. Para magpadala sa isang grupo, kailangan mo ng permiso na mag-edit ng mga miyembro ng grupo. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Makakatanggap lang ng push ang mga miyembro pagkatapos nilang [i-install ang app ng iyong simbahan](../../b1-church/getting-started/installing-pwa.md) at payagan ang mga notification.

</div>

## Pagbubukas ng Pahina

Sa B1 Admin, pumunta sa **Mobile** at i-click ang **Push Notifications**. May card na **Scheduled** at card na **Recent** ang pahina. Ipinapakita ang mga oras sa pahina ayon sa time zone ng iyong simbahan (o ng iyong computer, kung walang time zone na nakatakda sa simbahan), at nakasulat ang pangalan nito sa itaas ng listahang Scheduled.

## Pagpapadala o Pag-iskedyul ng Notification

1. I-click ang **Send Notification**.
2. Piliin ang **Audience**: **Everyone with the app**, o isa sa mga grupo mo. Makikita mo lamang ang mga pagpipiliang pinapayagan ng iyong mga permiso.
3. Ipinapakita ng B1 kung ilang tao ang maaabot ng push -- halimbawa, *42 of 60 people using the app have push enabled* -- at kung ilan ang may naka-off na push. Hindi ka kasama sa sarili mong push.
4. Sa ilalim ng **When**, piliin ang **Send now**, o **Schedule for later** at pumili ng **Send at** na petsa at oras sa hinaharap.
5. Maglagay ng **Title** (hanggang 80 karakter) at **Message** (hanggang 240 karakter).
6. Opsyonal, magdagdag ng **Open link or flyer URL** (isang `https` address o app path gaya ng `/mobile/groups`) na bubuksan ng push, at **Image URL** (isang `https` address) na ipapakita kasama nito.
7. I-click ang **Send Notification** (o **Schedule Notification**).

Para sa nakaiskedyul na push, muling sinusuri kung sino ang maaabot nito kapag ipapadala na, kaya kasama ang sinumang sumali sa grupo o nag-on ng notification sa pagitan ng panahon.

Maaari ka ring magpadala sa isang grupo mula sa sariling pahina ng grupo gamit ang **Notify**. Tingnan ang [Sending Push Notifications to Group Members](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Kapag walang link ang push, ang pag-tap dito ay magbubukas ng listahan ng notification ng app para sa push na buong simbahan, o ng pahina ng grupo para sa push ng grupo.
:::

## Pamamahala ng mga Nakaiskedyul na Notification

Ipinapakita ng card na **Scheduled** ang bawat notification na naghihintay pang ipadala, kasama ang oras nitong **Send at**, **Audience**, title, at message. Para sa bawat isa, maaari mo:

- **Edit** -- baguhin ang audience, oras, o teksto, pagkatapos i-click ang **Save Changes**.
- **Send now** -- ipadala ito kaagad sa halip na maghintay.
- **Cancel** -- pigilan ito sa pagpapadala. Ang kinanselang notification ay lilipat sa card na Recent.

Ang notification na papalabas na sa sandaling iyon ay nagpapakita ng **Sending** at hindi na mababago.

## Mga Kamakailang Notification

Ipinapakita ng card na **Recent** ang mga notification na naipadala na o huminto na, na may **Status** ang bawat isa:

| Status | Kahulugan |
|--------|---------|
| **Sent: X of Y** | Naipadala ang push. *Y* ang bilang ng taong maaaring makatanggap nito, at *X* ang nakatanggap nito bilang push notification. |
| **Missed (the send time passed)** | Mahigit 30 minuto nang huli nang sinubukan ng B1 na ipadala ang notification, kaya hindi ito naipadala. |
| **Failed** | Nabigo ang pagpapadala nang tatlong beses. Ipinapakita ang error sa ilalim ng status. |
| **Cancelled** | Kinansela ito ng isang tao bago ito naipadala. |

Para alisin ang isang notification sa listahan, i-click ang **Remove** sa row nito. Para walang laman ang listahan, i-click ang **Clear all** sa itaas ng card; tinatanggal nito ang bawat naipadala, pumalya, at kinanselang notification na pinapayagan mong pamahalaan. Parehong humihingi ng kumpirmasyon ang dalawa, at hindi na maibabalik ang alinman. Hindi nito binabawi ang notification sa mga taong nakatanggap na nito.

:::info
Ang mga miyembrong nag-off ng **Church Announcements** sa kanilang [notification preferences](../../b1-church/getting-started/notification-preferences.md) ay hindi makakatanggap ng mga push na ito, maging ipinadala man sa lahat o sa isang grupo.
:::

## Mga Kaugnay na Artikulo

- [Mobile App Settings](./mobile-app.md)
- [Group Members](../groups/group-members.md)
- [Roles & Permissions](./roles-permissions.md)
- [Notification Preferences](../../b1-church/getting-started/notification-preferences.md)
