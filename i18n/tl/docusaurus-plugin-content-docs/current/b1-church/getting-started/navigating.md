---
title: "Pag-navigate sa B1App"
---

# Pag-navigate sa B1App

<div class="article-intro">

Ang member portal sa B1.church ay isang web app na pang-telepono muna na matatagpuan sa ilalim ng `/mobile`. Gumagana ito sa kahit anong browser at maaaring i-install sa iyong home screen. Ipinapaliwanag ng pahinang ito ang Home dashboard, ang bottom tab bar, ang More menu, at ang Me page.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mong [naka-log in](./logging-in.md) para makita ang iyong personal na impormasyon. Makakapag-browse pa rin ng pampublikong nilalaman ang mga bisitang hindi naka-sign in at bibigyan sila ng button na **Sign In** kung saan kailangan ng account ang isang tampok.

</div>

## Home

Kapag binuksan ang `https://yourchurchname.b1.church/mobile`, dadalhin ka sa **Home** dashboard sa `/mobile/dashboard`. Ang Home ang landing page ng member portal at ipinapakita nito ang:

- Pagbati na may pangalan mo
- Ang talata ng araw
- Isang featured card para sa anumang itinampok ng inyong simbahan
- Isang **Explore** grid ng mga tool na in-on ng inyong simbahan -- mga grupo, pagbibigay, check-in, mga sermon, mga plano, at iba pa

Kapag nag-tap ka ng card sa Explore, bubuksan ang tool na iyon. Kung mas marami ang tool ng inyong simbahan kaysa sa kasya sa dashboard, ang huling card ay **More**, na nagbubukas ng buong listahan sa `/mobile/more`.

Kung naka-sign out ka, ipinapakita ng Home ang heading na **Welcome** kapalit ng pagbati, kasama ang maikling paanyaya ("Sign in to see your groups, giving, and more.") at button na **Sign in**. Maaaring baguhin ng inyong simbahan ang salita ng paanyayang ito o itago ito -- tingnan ang [Mobile App Settings](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Kapag nakatago ito, maaari ka pa ring mag-sign in mula sa menu o sa tab na Me.

## Ang Bottom Tab Bar

Sa telepono, nakapirmi ang tab bar sa ibaba ng screen:

- **Home** -- laging unang tab
- Hanggang tatlo sa mga tab na na-configure ng inyong simbahan
- **More** -- nagbubukas ng navigation menu

Kung higit sa tatlong tab ang na-configure ng inyong simbahan, hindi nawawala ang iba: lumalabas sila sa **More** menu at sa Explore grid ng dashboard. Itinatakda ng mga administrator ng simbahan ang pagkakasunud-sunod ng mga tab sa B1 Admin sa ilalim ng **Mobile → Navigation**.

## Ang Menu

Kapag nag-tap ka sa **More**, magbubukas ang navigation menu. Sa tablet o desktop, laging nakikita ang parehong menu sa kaliwang gilid ng screen. Naglalaman ito ng:

- Ang iyong pangalan at larawan, na may shortcut na **Edit Profile** — tingnan ang [Pag-edit ng Iyong Profile](./editing-your-profile.md)
- **Home** at **Me**
- **Admin Portal** -- lumalabas lamang kung mayroon kang pahintulot bilang administrator sa inyong simbahan; binubuksan nito ang B1 Admin
- Bawat tab na na-configure ng inyong simbahan, ayon sa pagkakasunud-sunod
- **Install App** -- binubuksan ang [mga tagubilin sa pag-install](./installing-pwa.md) sa `/mobile/install`
- Isang toggle ng light/dark mode
- **Sign In** o **Logout**
- Ang pangalan ng inyong simbahan at link sa patakaran sa privacy

## Ang App Bar

Ang bar sa itaas ng bawat screen ay nagpapakita ng:

- Ang pamagat ng screen, o ang pangalan ng inyong simbahan sa Home
- Isang back arrow kapag pumasok ka sa isang detail screen
- Isang icon na **bell** para sa mga notification at mensahe, na may badge para sa mga hindi pa nababasa
- Ang iyong **larawan sa profile**, na nagbubukas ng iyong profile sa `/mobile/profileEdit` — tingnan ang [Pag-edit ng Iyong Profile](./editing-your-profile.md)

## Ang Me Page

Ang **Me** (`/mobile/me`) ang iyong personal na hub. Naglilista ito ng mga shortcut sa iyong profile, [mga kagustuhan sa notification](./notification-preferences.md), mga mensahe, [pagbibigay](../giving/), at [mga rehistrasyon](../events/my-registrations.md), kasunod ang mga paparating para sa iyo -- mga atas sa paglilingkod, rehistrasyon sa event, at mga event ng grupo -- at ang iyong mga pinakabagong notification. Tingnan ang [Ang Me Page](./me-page) para sa detalye.

Kung naka-sign out ka, ipinapakita ng Me page ang button na **Sign In** sa halip.

## Pag-install sa Iyong Home Screen

Ang member portal ay isang Progressive Web App. Bisitahin ang `/mobile/install` (o piliin ang **Install App** sa menu) para sa sunud-sunod na tagubilin para sa iyong device. Kapag na-install na, bubukas ito nang full-screen mula sa iyong home screen nang walang browser chrome. Tingnan ang [Pag-install bilang App (PWA)](./installing-pwa.md).

## Ang Pampublikong Website ng Inyong Simbahan

Sa labas ng member portal, may sariling header navigation ang pampublikong website ng inyong simbahan na may mga link na itinakda ng inyong mga administrator -- mga pahina gaya ng [mga sermon](../content/sermons.md), ang [Biblia](../content/bible.md), [live streaming](../content/live-streaming.md), at pampublikong listahan ng mga grupo. Sa telepono, nasa likod ng hamburger icon sa kanang itaas ng header ang mga link na iyon.

:::info
Nag-iiba ang mga tab at tool na makikita mo sa bawat simbahan. Kinokontrol ng mga administrator sa B1 Admin kung aling mga seksyon ang nakikita ng mga miyembro, kaya kung wala kang nakikitang tampok na inilarawan dito, maaaring hindi pa ito in-on ng inyong simbahan.
:::
