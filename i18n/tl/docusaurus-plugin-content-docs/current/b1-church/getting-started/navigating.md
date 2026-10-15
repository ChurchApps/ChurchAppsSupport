---
title: "Pag-navigate sa B1App"
---

# Pag-navigate sa B1App

<div class="article-intro">

Ang member portal sa B1.church ay isang web app na unang idinisenyo para sa telepono at nasa ilalim ng `/mobile`. Gumagana ito sa anumang browser at maaaring i-install sa home screen mo. Ipinapaliwanag ng pahinang ito ang Home dashboard, ang tab bar sa ibaba, ang More page, at ang Me page.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mong [naka-log in](./logging-in.md) upang makita ang iyong personal na impormasyon. Maaari pa ring mag-browse ng pampublikong nilalaman ang mga bisitang hindi naka-sign in, at bibigyan sila ng button na **Sign In** kapag kailangan ng feature ng account.

</div>

## Home

Kapag binuksan ang `https://yourchurchname.b1.church/mobile`, dadalhin ka sa **Home** dashboard sa `/mobile/dashboard`. Ang Home ang landing page ng member portal. Nagsisimula ito sa isang pagbati ("Good morning", "Good afternoon", o "Good evening" kasama ang iyong first name) at petsa ngayon, kasunod ng mga seksyong lumilitaw lamang kapag may kaugnayan:

- **Latest sermon** -- ang pinakabagong sermon ng iyong simbahan, may link na **All sermons**
- **Verse of the Day** -- ang talata ngayon; i-tap ito upang buksan ang buong pahina ng [Verse of the Day](../content/verse-of-the-day.md)
- **You're serving** -- ang iyong susunod na serving assignment, may link na **All plans**. Kung may assignment pang naghihintay ng sagot mo, ipinapakita ang mga iyon muna na may badge na **Needs reply** at mga button na **Accept** / **Decline** upang makasagot ka mula mismo sa Home; kung hindi, ang susunod mong assignment ay magpapakita ng badge na **Accepted** o **Confirmed**. I-tap ang isang assignment upang buksan ang plano nito.
- **Your groups** -- hanggang tatlong group mo kasama ang oras at lugar ng pagpupulong, at link na **All groups**
- **Giving** -- kung magkano ang naibigay mo ngayong taon ("Given in" ang kasalukuyang taon), button na **Give**, at link na **History** papunta sa iyong [donation history](../giving/donation-history.md)
- **More from** *ang iyong simbahan* -- mga button para sa iba pang tool na in-on ng iyong simbahan na wala pa sa tab bar o nakalitaw sa itaas. Ang mga madalas mong gamitin ay lumilipat sa unahan.

Lumilitaw lamang ang mga seksyong serving, groups, at giving kapag naka-sign in ka, naka-on ang tool na iyon sa iyong simbahan, at may maipapakita -- halimbawa, paparating na assignment o kahit isang group. Sa computer, dalawang column ang layout ng Home.

Kung naka-sign out ka, ipapakita ng Home ang heading na **Welcome** sa halip na pagbati, kasama ang maikling paanyaya ("Sign in to see your groups, giving, and more.") at button na **Sign In**. Maaaring baguhin ng iyong simbahan ang paanyayang ito o itago ito -- tingnan ang [Mobile App Settings](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Kapag nakatago ito, maaari ka pa ring mag-sign in mula sa **More** page o sa **Me** page.

## Ang Tab Bar sa Ibaba

Sa telepono, nakapirmi sa ibaba ng screen ang tab bar:

- **Home** -- palaging unang tab
- Hanggang tatlong tab na in-configure ng iyong simbahan
- **More** -- binubuksan ang More page

Hindi kailanman binibigyan ng tab ang mga link papunta sa mga panlabas na website, custom na pahina, at Verse of the Day. Kung mas maraming tab ang na-configure ng iyong simbahan kaysa kasya, hindi nawawala ang natitira: lalabas ang mga ito sa **More** page at sa seksyong **More from** sa Home. Itinatakda ng mga administrator ng simbahan ang pagkakasunod-sunod ng tab sa B1 Admin sa ilalim ng **Mobile → Navigation**.

## Sa Computer

Sa mas malawak na screen, gaya ng computer o malaking tablet, papalitan ang tab bar sa ibaba ng header sa itaas ng screen na may kulay ng iyong simbahan. Ipinapakita nito ang pangalan ng iyong simbahan (i-click ito upang bumalik sa Home), **Home**, hanggang limang tab na in-configure ng iyong simbahan, at **More**, kasama ang bell at larawan ng iyong profile sa kanan. Kapag nagbukas ka ng detail screen, may lalabas na link na **Back** sa itaas ng nilalaman ng pahina.

## Ang More Page

Kapag tinap mo ang **More**, bubukas ang More page sa `/mobile/more`. Naglalaman ito ng:

- Ang iyong pangalan at larawan, kasama ang link na **Edit Profile** -- tingnan ang [Editing Your Profile](./editing-your-profile.md)
- Bawat tab na in-configure ng iyong simbahan, nakaayos, sa ilalim ng pangalan ng iyong simbahan. Ang mga link sa mga panlabas na website ay bubukas sa bagong tab ng browser.
- Isang seksyong **Account** na may:
  - **Me** -- ang iyong personal na pahina (para sa mga naka-sign in lamang)
  - **Appearance** -- lumipat sa pagitan ng **Light Mode** at **Dark Mode**
  - **Admin Portal** -- lalabas lamang kung may administrator permission ka sa iyong simbahan; binubuksan nito ang B1 Admin sa bagong tab
  - **Install App** -- binubuksan ang [install instructions](./installing-pwa.md) sa `/mobile/install` (nakatago kapag na-install na ang app)
- **Sign out**, o button na **Sign In** kung naka-sign out ka
- Pangalan ng iyong simbahan at link sa privacy policy

## Ang App Bar

Sa telepono, ang bar sa itaas ng bawat screen ay nagpapakita ng:

- Pangalan ng iyong simbahan sa Home at sa iba pang pangunahing screen, o back arrow kapag nasa detail screen ka. Lumalabas ang pamagat ng screen sa itaas mismo ng pahina.
- Icon na **bell** para sa mga notification at mensahe, na may badge para sa mga hindi pa nababasang item -- tingnan ang [Notifications and Messages](#notifications-and-messages) sa ibaba
- Ang iyong **larawan sa profile**, na nagbubukas ng iyong profile sa `/mobile/profileEdit` -- tingnan ang [Editing Your Profile](./editing-your-profile.md)

Lumilitaw lamang ang bell at larawan ng profile kapag naka-sign in ka.

## Mga Notification at Mensahe

Kapag tinap mo ang bell, magbubukas ang isang panel na may dalawang seksyon:

- **Messages** -- ang iyong pinakabagong pribadong usapan, na may link na **New message** upang magsimula ng bago
- **Notifications** -- ang iyong pinakabagong notification, na may badge na **New** sa mga hindi pa nababasa. I-tap ang isang notification upang pumunta sa group, plano, o usapang pinanggalingan nito.

Ipinapakita ng bawat seksyon kung ilang hindi pa nababasang item ang mayroon ito. I-tap ang **See all** sa ibaba upang buksan ang buong inbox mo sa `/mobile/notifications`.

## Mga Pahinang May Seksyon

Ang mga detail page -- isang group, isang plano, ang iyong Me page, at ang mga screen ng Plans at Giving -- ay nakaayos bilang isang pahinang may mga seksyon sa halip na mga tab. Bawat seksyon ay nagpapakita ng maikling preview, at isang link sa header ng seksyon (gaya ng **All members**, **All events**, o **Full service order**) ang nagbubukas ng buong listahan. Ang link na **Back to** sa itaas ng view na iyon ay nagbabalik sa iyo sa pahinang pinanggalingan mo.

## Ang Me Page

Ang **Me** (`/mobile/me`) ang iyong personal na sentro. Ipinapakita nito ang iyong pangalan at larawan kasama ang mga button na **Edit Profile** at **Settings** ([notification preferences](./notification-preferences.md)), pagkatapos ang mga paparating para sa iyo -- mga serving assignment, event registration, at event ng group -- kasunod ang iyong household, iyong mga group, ang iyong [giving](../giving/) ngayong taon, ang iyong [registrations](../events/my-registrations.md), at ang iyong mga kamakailang notification at mensahe. Tingnan ang [The Me Page](./me-page) para sa mga detalye.

Kung naka-sign out ka, button na **Sign In** ang ipapakita ng Me page sa halip.

## Pag-install sa Home Screen

Ang member portal ay isang Progressive Web App. Bisitahin ang `/mobile/install` (o piliin ang **Install App** sa More page) para sa hakbang-hakbang na tagubilin para sa iyong device. Kapag na-install na, magbubukas ito nang full-screen mula sa iyong home screen nang walang browser chrome. Tingnan ang [Installing as an App (PWA)](./installing-pwa.md).

## Ang Public na Website ng Iyong Simbahan

Sa labas ng member portal, may sariling header navigation ang public website ng iyong simbahan na may mga link na in-configure ng iyong mga administrator -- mga pahina gaya ng [sermons](../content/sermons.md), ang [Bible](../content/bible.md), [live streaming](../content/live-streaming.md), at isang pampublikong listahan ng group. Sa telepono, nasa likod ng hamburger icon sa kanang itaas ng header ang mga link na ito.

:::info
Nag-iiba ang mga tab at tool na makikita mo ayon sa simbahan. Kinokontrol ng mga administrator kung aling mga seksyon ang nakikita ng mga miyembro sa pamamagitan ng B1 Admin, kaya kung wala kang makitang feature na inilalarawan dito, maaaring hindi ito in-on ng iyong simbahan.
:::
