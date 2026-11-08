---
title: "Pag-log In sa B1 Church Checkin"
sidebar_label: "Pag-log In"
description: "Mag-sign in sa kiosk app ng B1 Church Checkin, piliin ang iyong simbahan, at unawain ang auto-login, mga admin setting, at logout sa check-in tablet."
---

# Pag-log In

<div class="article-intro">

Bago magamit ang kiosk para sa check-in, kailangan mong mag-sign in gamit ang ChurchApps account na may access sa iyong simbahan. Tinatalakay ng pahinang ito ang proseso ng unang pag-login, pagpili ng simbahan, pag-uugali ng auto-login, at kung paano mag-log out.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang B1 Church Checkin sa iyong Android tablet (tingnan ang [Getting Started](./index.md))
- Ihanda ang email at password ng iyong ChurchApps account
- Kailangan ng account ang **Checkin** permission (o **Edit Attendance**) sa iyong simbahan. Idinadagdag ito ng admin sa B1 Admin sa ilalim ng **Settings > Roles**. Tingnan ang [Check-In Kiosk Accounts](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Unang Pag-login

1. Buksan ang B1 Church Checkin app. Pagkatapos ng splash screen, makikita mo ang login screen na may logo ng B1 Church Checkin.
2. Ilagay ang iyong **email address** sa unang field.
3. Ilagay ang iyong **password** sa ikalawang field.
4. I-tap ang button na **Login**.

Bine-validate ng app ang iyong mga credential at pinapasok ka. Kung mali ang email o password, makikita mo ang mensahe ng error sa ibaba ng screen.

Kung naka-on ang [two-factor sign-in](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) sa account, hihingi ang app ng code. Ilagay ang 6-digit na code mula sa authenticator app ng may-ari ng account, o isa sa kanilang backup codes, at i-tap muli ang **Login**. Kailangan lang ang code sa unang login; pagkatapos nito, mananatiling naka-sign in ang kiosk.

:::info
Ito ang parehong email at password na ginagamit mo sa B1 Admin o sa anumang ibang ChurchApps product. Hindi mo kailangan ng hiwalay na account para sa check-in kiosk.
:::

## Pagpili ng Iyong Simbahan

Pagkatapos ng matagumpay na login, ilo-load ng app ang mga simbahan kung saan may **Checkin** o **Edit Attendance** permission ang iyong account. Hindi isasama ang mga simbahan kung saan iba lang ang permission mo. Kung walang natira, ipapakita ng app ang **No check-in access** at hihilingin sa admin ng iyong simbahan na idagdag ang Checkin permission sa isa sa iyong mga role. Bawat simbahan ay ipinapakita bilang card na may pangalan at logo ng simbahan (kung na-configure ito sa B1 Admin).

- Kung ang account mo ay naka-link sa **isang simbahan lang**, makikita mo pa rin ang screen ng pagpili. I-tap ang iyong simbahan para magpatuloy.
- Kung ang account mo ay naka-link sa **maraming simbahan**, i-tap ang simbahang nais mong pagsilbihan ng kiosk na ito.

Kapag napili mo na ang simbahan, ilo-load ng app ang branding at mga setting ng hitsura ng simbahang iyon. Lalabas ang logo ng iyong simbahan sa header ng lahat ng susunod na screen.

## Auto-Login sa mga Susunod na Pagbisita

Pagkatapos ng unang matagumpay na login, iniimbak ng app sa tablet ang isang secure na sign-in token at ang napili mong simbahan. Hindi nito iniimbak ang iyong password. Sa mga susunod na pagbukas ng app:

- Awtomatikong ka nitong sine-sign in gamit ang naka-save na token.
- Kung dati kang pumili ng simbahan, ibabalik nito ang pagpiling iyon at didiretso ka sa **services screen**.
- Kung hindi na valid ang naka-save na sign-in, babalik ang app sa login screen para makapag-sign in ka muli.

:::tip
Dahil awtomatikong nag-lo-login ang kiosk, kailangan mo lang ilagay ang mga credential minsan sa paunang setup. Pagkatapos nito, puwede nang buksan ang tablet at handa na itong gamitin.
:::

## Mga Admin Setting

Sadyang nakatago ang mga admin setting para hindi hindi sinasadyang mabago ng mga miyembro ng simbahang gumagamit ng kiosk ang configuration. Para ma-access ang mga ito:

1. I-tap ang **logo ng simbahan** sa header nang **pitong beses** nang mabilisan (sa loob ng dalawang segundo).
2. Kung may kiosk PIN na nakatakda, ilagay ang PIN kapag hiningi.
3. Magbubukas ang screen na **Admin Settings** na may mga sumusunod na opsyon:
   - **Change Service**: palitan ang napiling oras ng serbisyo
   - **Change Printer**: buksan ang [printer settings](./printer-setup.md) para maghanap at pumili ng printer
   - **Set Admin PIN** (o **Change Admin PIN** kapag may nakatakda na): itakda o baguhin ang kiosk PIN na nagpoprotekta sa admin access
   - **Emergency broadcast**: magpadala ng text sa mga guardian ng bawat household na na-check in (tingnan ang [Emergency Broadcast](../check-in/checking-out.md#emergency-broadcast))
   - **Manned station mode**: isang switch na nagdaragdag ng check-out, paging, reprint, at profile editing sa station na ito (tingnan ang [Checking Out](../check-in/checking-out.md))
   - **Logout**: mag-sign out at bumalik sa login screen

   I-tap ang **Back to Kiosk** para bumalik sa check-in.

:::warning
Kapag nag-log out, mabubura ang lahat ng naka-save na credential at ang napiling simbahan. Kailangan mong ilagay muli ang iyong email at password para magamit ulit ang kiosk. Mag-log out lang kapag kailangan mong magpalit ng account o i-reconfigure ang kiosk.
:::

## Mga Susunod na Hakbang

Kapag naka-log in na, maaari mo nang [i-set up ang printer](./printer-setup.md) o direktang pumunta sa [check-in workflow](../check-in/index.md).
