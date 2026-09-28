---
title: "Pag-navigate sa B1App"
---

# Pag-navigate sa B1App

<div class="article-intro">

Ang member portal sa B1.church ay isang phone-first web app na nakatira sa ilalim ng `/mobile`. Ito ay gumagana sa anumang browser at maaaring i-install sa iyong home screen. Ang pahiwagang ito ay nagpapaliwanag ng Home dashboard, ang bottom tab bar, ang More menu, at ang Me page.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mong maging [naka-log in](./logging-in.md) upang makita ang iyong personal na impormasyon. Ang mga naka-sign out na bisita ay maaaring pa ring tuklasin ang pampubliko na nilalaman at inaalok ng isang knob ng **Mag-sign In** kung saan ang feature ay nangangailangan ng account.

</div>

## Home

Ang pagbubukas ng `https://yourchurchname.b1.church/mobile` ay dadalhin ka sa **Home** dashboard sa `/mobile/dashboard`. Ang Home ay ang landing page ng member portal at nagpapakita ng:

- Isang pagbati na may iyong pangalan
- Ang alin ng araw
- Isang featured card para sa anumang nai-highlight ng iyong simbahan
- Isang **Explore** grid ng mga tool na nag-on ang iyong simbahan -- mga grupo, pagbibigay, check-in, sermon, mga plano, at marami pa

Ang pag-tap sa isang card sa Explore ay nagbubukas ng tool na iyon. Kung ang iyong simbahan ay may mas maraming tool kaysa sa akma sa dashboard, ang huling card ay **Marami**, na nagbubukas sa buong listahan sa `/mobile/more`.

## Ang Bottom Tab Bar

Sa isang telepono, isang tab bar ay nakalagay sa ibaba ng screen:

- **Home** -- laging ang unang tab
- Hanggang sa tatlo mula sa mga tab na nag-configure ang iyong simbahan
- **Marami** -- nagbubukas ng menu ng navigation

Kung ang iyong simbahan ay nag-configure ng higit sa tatlong tab, ang natitirang ay hindi mawawala: lumilitaw sila sa menu ng **Marami** at sa grid ng Explore ng dashboard. Ang mga administrator ng simbahan ay nagtakda ng tab order sa B1 Admin sa ilalim ng **Mobile → Navigation**.

## Ang Menu

Ang pag-tap sa **Marami** ay nagbubukas ng menu ng navigation. Sa isang tablet o desktop ang parehong menu ay palaging makikita sa kalong ng kaliwang bahagi ng screen. Ito ay naglalaman ng:

- Ang iyong pangalan at larawan, kasama ang isang **I-edit ang Profile** na shortcut — tingnan ang [Pag-edit ng Iyong Profile](./editing-your-profile.md)
- **Home** at **Ako**
- **Admin Portal** -- ipinakikita lamang kung mayroon kang mga pahintulot ng administrator sa iyong simbahan; ito ay nagbubukas ng B1 Admin
- Bawat tab na nag-configure ang iyong simbahan, sa order
- **I-install ang App** -- nagbubukas ng [mga tagubilin sa pag-install](./installing-pwa.md) sa `/mobile/install`
- Isang light/dark mode toggle
- **Mag-sign In** o **I-logout**
- Ang pangalan ng iyong simbahan at isang link sa privacy policy

## Ang App Bar

Ang bar sa buong tuktok ng bawat screen ay nagpapakita ng:

- Ang pamagat ng screen, o ang pangalan ng iyong simbahan sa Home
- Isang pabalik na arrow kapag ikaw ay nag-drill sa isang detail screen
- Isang **kampana** icon para sa mga notipikasyon at mga mensahe, na may badge para sa mga hindi nabasang item
- Ang iyong **profile photo**, na nagbubukas ng iyong profile sa `/mobile/profileEdit` — tingnan ang [Pag-edit ng Iyong Profile](./editing-your-profile.md)

## Ang Me Page

Ang **Ako** (`/mobile/me`) ay ang iyong personal na hub. Ito ay naglalista ng mga shortcut sa iyong profile, [mga kagustuhan sa notipikasyon](./notification-preferences.md), mga mensahe, [pagbibigay](../giving/), at [mga pag-rehistro](../events/my-registrations.md), sinusundan ng kung ano ang paparating para sa iyo -- mga assignment sa paglilingkod, mga pag-rehistro ng kaganapan, at mga kaganapan ng grupo -- at ang iyong pinakabagong mga notipikasyon. Tingnan ang [Ang Me Page](./me-page) para sa mga detalye.

Kung ikaw ay naka-sign out, ang Me page ay nagpapakita ng isang knob ng **Mag-sign In** sa halip.

## Pag-i-install sa Iyong Home Screen

Ang member portal ay isang Progressive Web App. Bisitahin ang `/mobile/install` (o pumili ng **I-install ang App** sa menu) para sa hakbang-hakbang na mga tagubilin para sa iyong device. Pagkatapos na i-install, ito ay bumubukas na buong-screen mula sa iyong home screen nang walang browser chrome. Tingnan ang [Pag-i-install bilang isang App (PWA)](./installing-pwa.md).

## Ang Public Website ng Iyong Simbahan

Sa labas ng member portal, ang public website ng iyong simbahan ay may sariling header navigation na may mga link na nag-configure ang iyong mga administrator -- mga pahina tulad ng [sermon](../content/sermons.md), ang [Bible](../content/bible.md), [live streaming](../content/live-streaming.md), at isang pampubliko na listahan ng grupo. Sa isang telepono ang mga link na ito ay nanatili sa likod ng hamburger icon sa tuktok na kanang sulok ng header.

:::info
Ang mga tab at tool na nakikita mo ay nag-vary sa simbahan. Ang mga administrator ay kumokontrol sa kung aling mga seksyon ay nakikita ng mga miyembro sa pamamagian ng B1 Admin, kaya kung hindi mo nakikita ang feature na ito na inilalarawan dito, ang iyong simbahan ay maaaring hindi nag-on nito.
:::
