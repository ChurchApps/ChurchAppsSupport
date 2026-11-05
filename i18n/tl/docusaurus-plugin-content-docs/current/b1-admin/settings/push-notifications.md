---
title: "Mga Push Notification"
---

# Mga Push Notification

<div class="article-intro">

Hinahayaan ka ng pahinang **Push Notifications** na magpadala ng push notification sa lahat ng gumagamit ng B1.church app ng iyong simbahan, o sa isang grupo, alinman agad o sa oras na iniskedyul mo. Inililista rin nito ang mga notification na naghihintay pang maipadala, para ma-edit, maipadala, o makansela mo ang mga ito, at ipinapakita kung paano naihatid ang mga kamakailang notification.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Para magpadala sa **Everyone with the app**, kailangan mo ang **Edit Content** permission. Para magpadala sa grupo, kailangan mo ang **Edit Group Members**. Sa alinman sa dalawa, lalabas ang pahinang **Push Notifications** sa ilalim ng **Mobile**. Tingnan ang [Roles & Permissions](./roles-permissions.md).
- Makakarating lang ang mga notification sa mga miyembrong nag-install ng [B1.church app](/docs/b1-church/getting-started/installing-pwa) at pumayag na tumanggap ng notification.

</div>

## Pagbubukas ng Pahina

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at palawakin ang **Mobile**.
2. I-click ang **Push Notifications** (`/mobile/notifications`).

Lahat ng oras sa pahina ay ipinapakita sa time zone ng iyong simbahan (o sa time zone ng iyong browser, kung walang nakatakda sa simbahan). Sinasabi ng pahina kung alin ang ginagamit, halimbawa *"Times are in America/Chicago."*

## Pagpapadala o Pag-iskedyul ng Notification

1. I-click ang **Send Notification** sa itaas ng pahina.
2. Sa ilalim ng **Audience**, piliin ang **Everyone with the app** o isa sa iyong mga grupo.
3. Punan ang notification:
   - **Title** *(kinakailangan)* -- Maikling buod, hanggang 80 character.
   - **Message** *(kinakailangan)* -- Ang katawan ng notification, hanggang 240 character.
   - **Open link or flyer URL** *(opsyonal)* -- Isang relative na app path (halimbawa, `/mobile/groups`) o buong `https://` URL na bubukas kapag na-tap ang notification. Kung walang link, ang notification ng buong simbahan ay magbubukas sa listahan ng notification ng miyembro, at ang notification ng grupo ay magbubukas sa grupong iyon.
   - **Image URL** *(opsyonal)* -- Isang `https://` na larawang ipapakita kasama ng notification sa mga sinusuportahang device.
4. Sa ilalim ng **When**, piliin ang **Send now**, o **Schedule for later** at pumili ng petsa at oras sa **Send at**. Dapat nasa hinaharap ang oras.
5. I-click ang **Send Notification** (o **Schedule Notification** para sa nakaiskedyul na notification).

Ipinapakita ng preview sa dialog kung paano lilitaw ang notification at kung ilang tao ang maaaring tumanggap nito. Ang notification na ipinadala ngayon ay nangangailangan ng kahit isang maaabot na tao. Ang nakaiskedyul ay maaaring i-save kahit walang maaabot pa sa ngayon, dahil muling sinusuri ang mga tatanggap kapag ipinadala na ito.

Pagkatapos mag-iskedyul, kinukumpirma ng dialog ang oras ng pagpapadala at nagpapaalalang makikita, ma-e-edit, o makakansela mo ito sa ilalim ng **Mobile > Push Notifications**.

:::tip
Maaari ka ring magpadala o mag-iskedyul ng notification sa isang grupo mula sa pahina ng grupong iyon gamit ang butones nitong **Notify**. Tingnan ang [Sending Push Notifications to Group Members](../groups/group-members.md#sending-push-notifications-to-group-members).
:::

## Pamamahala ng Mga Nakaiskedyul na Notification

Ipinapakita ng card na **Scheduled** ang mga notification na naghihintay pang maipadala, kasama ang oras na **Send at**, **Audience**, at teksto ng **Notification**. May tatlong aksyon ang bawat isa:

- **Edit** -- Baguhin ang title, message, link, image, o oras ng pagpapadala. Hindi mababago ang audience; kanselahin ang notification at gumawa ng bago sa halip.
- **Send now** -- Ipadala agad sa halip na maghintay. Kumpirmahin gamit ang **Send now**.
- **Cancel** -- Pigilan ang pagpapadala nito. Kumpirmahin gamit ang **Cancel notification**.

Kapag walang naghihintay, sinasabi ng card na *"Nothing is scheduled."*

## Pagrepaso sa Mga Kamakailang Notification

Inililista ng card na **Recent** ang mga notification na naipadala na o itinigil, kasama ang oras na **Sent at**, **Audience**, teksto ng **Notification**, at **Status**:

- **Sent: X of Y** -- Ilan sa mga tao sa audience ang naabot nito.
- **Failed** -- Nabigo ang pagpapadala, kasama ang error. Sumusubok ang B1 ng hanggang tatlong beses bago ito markahang failed.
- **Cancelled** -- Kinansela ito ng isang tao bago pa naipadala.
- **Missed (the send time passed)** -- Hindi ito naipadala sa loob ng 30 minuto mula sa oras ng pagpapadala, kaya nilaktawan ito sa halip na ipadala nang huli.

## Sino ang Tumatanggap ng Notification

- Maaabot ng **Everyone with the app** ang bawat taong nasa simbahan mo na nag-install ng B1.church app at pinayagan ang notification, maliban sa taong nagpadala nito.
- Ang notification ng grupo ay makakarating sa mga miyembro ng grupo na may app at pinayagan ang notification.
- Ang mga miyembrong pinatay ang push para sa **Church Announcements** sa kanilang [Notification Preferences](/docs/b1-church/getting-started/notification-preferences) ay hindi makakatanggap ng notification ng buong simbahan.

## Mga Kaugnay na Artikulo

- [Sending Push Notifications to Group Members](../groups/group-members.md#sending-push-notifications-to-group-members)
- [Mobile App Settings](./mobile-app.md)
- [Event Reminders](../calendars/event-reminders.md)
- [Notification Preferences](/docs/b1-church/getting-started/notification-preferences)
