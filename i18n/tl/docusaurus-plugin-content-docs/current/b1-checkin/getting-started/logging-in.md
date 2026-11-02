---
title: "Pag-log In"
---

# Pag-log In

<div class="article-intro">

Bago magamit ang kiosk para sa check-in, kailangan mong mag-sign in gamit ang ChurchApps account na may access sa iyong simbahan. Sakop ng pahinang ito ang proseso ng unang pag-log in, pagpili ng simbahan, pag-uugali ng auto-login, at kung paano mag-log out.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang B1 Church Checkin sa iyong Android tablet (tingnan ang [Getting Started](./index.md))
- Ihanda ang email at password ng iyong ChurchApps account
- Kailangan ng account ang permiso na **Checkin** (o **Edit Attendance**) sa iyong simbahan. Idinadagdag ito ng admin sa B1 Admin sa ilalim ng **Settings > Roles** -- tingnan ang [Check-In Kiosk Accounts](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Unang Pag-log In

1. Buksan ang B1 Church Checkin app. Pagkatapos ng splash screen, makikita mo ang login screen na may logo ng B1 Church Checkin.
2. Ilagay ang iyong **email address** sa unang field.
3. Ilagay ang iyong **password** sa ikalawang field.
4. I-tap ang butones na **Login**.

Bina-validate ng app ang iyong mga kredensyal at pinapasok ka. Kung mali ang email o password, makakakita ka ng mensahe ng error sa ibaba ng screen.

Kung naka-on ang [two-factor sign-in](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) ng account, hihingi ang app ng code. Ilagay ang 6-digit na code mula sa authenticator app ng may-ari ng account, o isa sa kanyang mga backup code, at i-tap muli ang **Login**. Kailangan lang ang code para sa unang pag-log in na ito; pagkatapos nito, mananatiling naka-sign in ang kiosk.

:::info
Ito ang parehong email at password na ginagamit mo sa B1 Admin o sa anumang ibang ChurchApps product. Hindi mo kailangan ng hiwalay na account para sa check-in kiosk.
:::

## Pagpili ng Iyong Simbahan

Pagkatapos ng matagumpay na pag-log in, nilo-load ng app ang mga simbahang may permiso ang iyong account na **Checkin** o **Edit Attendance**. Hindi kasama ang mga simbahang may ibang permiso lang. Kung walang natira, ipapakita ng app ang **No check-in access** at hihilingin sa admin ng iyong simbahan na idagdag ang permiso na Checkin sa isa sa iyong mga role. Bawat simbahan ay ipinapakita bilang card na may pangalan at logo ng simbahan (kung na-configure na ito sa B1 Admin).

- Kung **isang simbahan lang** ang naka-link sa iyong account, makikita mo pa rin ang screen ng pagpili. I-tap ang iyong simbahan para magpatuloy.
- Kung **higit sa isang simbahan** ang naka-link sa iyong account, i-tap ang simbahang gusto mong pagsilbihan ng kiosk na ito.

Kapag napili mo na ang simbahan, nilo-load ng app ang branding at mga setting ng itsura ng simbahang iyon. Lalabas ang logo ng iyong simbahan sa header sa lahat ng susunod na screen.

## Auto-Login sa Mga Susunod na Pagbisita

Pagkatapos ng unang matagumpay na pag-log in, itinatago ng app ang isang secure na sign-in token at ang napili mong simbahan sa tablet. Hindi nito itinatago ang iyong password. Sa mga susunod na pagbukas ng app:

- Pinapasok ka ulit ng app gamit ang naka-save na token.
- Kung dati mo nang napili ang isang simbahan, ibinabalik nito ang pagpiling iyon at dinadala ka nang diretso sa **services screen**.
- Kung hindi na wasto ang naka-save na sign-in, babalik ang app sa login screen para makapag-sign in ka ulit.

:::tip
Dahil awtomatikong nag-lo-log in ang kiosk, kailangan mo lang ilagay ang mga kredensyal nang isang beses sa paunang setup. Pagkatapos nito, maaari nang buksan ang tablet at handa na itong gamitin.
:::

## Mga Setting ng Admin

Sadyang nakatago ang mga setting ng admin para hindi aksidenteng mabago ng mga miyembro ng simbahang gumagamit ng kiosk ang configuration. Para mapuntahan ang mga ito:

1. I-tap ang **logo ng simbahan** sa header nang **pitong beses** nang mabilis na sunod-sunod (sa loob ng dalawang segundo).
2. Kung may nakatakdang kiosk PIN, ilagay ang PIN kapag hiningi.
3. Magbubukas ang screen na **Admin Settings** na may mga sumusunod na opsyon:
   - **Change Service** -- palitan ang napiling oras ng serbisyo
   - **Change Printer** -- buksan ang [mga setting ng printer](./printer-setup) para mag-scan at pumili ng printer
   - **Set/Change PIN** -- itakda o palitan ang kiosk PIN na nagpoprotekta sa admin access
   - **Logout** -- mag-sign out at bumalik sa login screen

:::warning
Binubura ng pag-log out ang lahat ng naka-save na kredensyal at ang pagpili ng simbahan. Kailangan mong ilagay ulit ang iyong email at password para magamit muli ang kiosk. Mag-log out lang kapag kailangan mong magpalit ng account o i-reconfigure ang kiosk.
:::

## Mga Susunod na Hakbang

Kapag naka-log in na, maaari mong [i-set up ang printer](./printer-setup) o direktang pumunta sa [check-in workflow](../check-in/).
