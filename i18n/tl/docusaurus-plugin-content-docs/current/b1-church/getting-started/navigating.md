---
title: "Pag-navigate sa B1App"
---

# Pag-navigate sa B1App

<div class="article-intro">

Ang member portal sa B1.church ay isang phone-first na web app na nasa ilalim ng `/mobile`. Gumagana ito sa anumang browser at maaaring i-install sa home screen mo. Ipinapaliwanag ng pahinang ito ang Home dashboard, ang bottom tab bar, ang More page, at ang Me page.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mong [naka-log in](./logging-in.md) para makita ang iyong personal na impormasyon. Maaari pa ring mag-browse ng pampublikong content ang mga bisitang hindi naka-log in, at makikita nila ang button na **Mag-sign In** kapag kailangan ng feature ng account.

</div>

## Home {#home}

Kapag binuksan mo ang `https://yourchurchname.b1.church/mobile`, dadalhin ka sa **Home** dashboard sa `/mobile/dashboard`. Ang Home ang landing page ng member portal. Nagsisimula ito sa pagbati ("Good morning", "Good afternoon", o "Good evening" kasama ang una mong pangalan) at ang petsa ngayon, na sinusundan ng mga seksyong lumalabas lamang kapag may kaugnayan:

- **Pinakabagong sermon** -- ang pinakabagong sermon ng simbahan mo, na may link na **Lahat ng sermon**
- **Talata ng Araw** -- ang talata ngayong araw; i-tap ito para buksan ang buong pahina ng [Verse of the Day](../content/verse-of-the-day.md)
- **Naglilingkod ka** -- ang susunod mong nakatakdang serving assignment, na may link na **Lahat ng plan**. Kung may assignment pang nangangailangan ng sagot mo, ang mga iyon ang unang ipinapakita na may badge na **Kailangan ng sagot** at mga button na **Tanggapin** / **Tanggihan**, para makasagot ka agad mula sa Home (kailangan munang kumpirmahin ang **Tanggihan**); kung wala, ang susunod mong mga assignment ay magpapakita ng badge na **Tinanggap** o **Kumpirmado**. I-tap ang isang assignment para buksan ang plan nito.
- **Iyong mga group** -- hanggang tatlo sa mga group mo kasama ang oras ng pagpupulong at lugar, at link na **Lahat ng group**
- **Pagbibigay** -- kung magkano ang naibigay mo ngayong taon ("Given in" ang kasalukuyang taon), button na **Magbigay**, at link na **Kasaysayan** papunta sa iyong [donation history](../giving/donation-history.md)
- **Higit pa mula sa** *ang simbahan mo* -- mga button para sa iba pang tool na in-on ng simbahan mo na wala pa sa tab bar o nasa itaas. Ang mga pinakaginagamit mo ay ililipat sa unahan.

Lumalabas lamang ang mga seksyong serving, groups, at giving kapag naka-log in ka, naka-on sa simbahan mo ang tool na iyon, at may maipapakita -- halimbawa, may paparating na assignment o kahit isang group. Sa computer, dalawang column ang layout ng Home.

Kapag hindi ka naka-log in, ang Home ay magpapakita ng heading na **Maligayang pagdating** sa halip na pagbati, kasama ang maikling paanyaya ("Sign in to see your groups, giving, and more.") at button na **Mag-sign In**. Lumalabas ang paanyayang ito kahit wala pang inihanda ang simbahan mo para sa Home. Maaaring baguhin ng simbahan mo ang salita nito o itago ito -- tingnan ang [Mobile App Settings](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Kapag nakatago ito, maaari ka pa ring mag-sign in mula sa pahinang **Higit pa** o sa pahinang **Me**.

## Ang Bottom Tab Bar

Sa telepono, nakapirmi sa ibaba ng screen ang tab bar:

- **Home** -- palaging unang tab
- Hanggang tatlo sa mga tab na in-configure ng simbahan mo
- **Higit pa** -- binubuksan ang More page

Hindi kailanman binibigyan ng tab ang mga link papunta sa mga panlabas na website, custom na pahina, at Verse of the Day. Kung mas maraming tab ang na-configure ng simbahan mo kaysa sa kasya, hindi nawawala ang iba: lumalabas ang mga ito sa pahinang **Higit pa** at sa seksyong **Higit pa mula sa** sa Home. Itinatakda ng mga church administrator ang pagkakasunod-sunod ng tab sa B1 Admin sa ilalim ng **Mobile → Navigasyon**.

## Sa Computer

Sa mas malapad na screen, gaya ng computer o malaking tablet, ang bottom tab bar ay pinapalitan ng header sa itaas ng screen na may kulay ng simbahan mo. Ipinapakita nito ang pangalan ng simbahan mo (i-click ito para bumalik sa Home), **Home**, hanggang limang tab na in-configure ng simbahan mo, at **Higit pa**, kasama ang bell at ang larawan mo sa profile sa kanan. Kapag nagbukas ka ng detail screen, may lalabas na link na **Bumalik** sa itaas ng content ng pahina.

## Ang More Page {#the-more-page}

Kapag tinap mo ang **Higit pa**, bubukas ang More page sa `/mobile/more`. Narito ang laman nito:

- Ang pangalan at larawan mo, kasama ang link na **I-edit ang Profile** -- tingnan ang [Editing Your Profile](./editing-your-profile.md)
- Bawat tab na in-configure ng simbahan mo, nakaayos, sa ilalim ng pangalan ng simbahan mo. Ang mga link papunta sa panlabas na website ay nagbubukas sa bagong browser tab.
- Isang seksyong **Account** na may:
  - **Me** -- ang personal mong pahina (para lamang sa naka-sign in)
  - **Hitsura** -- lumipat sa pagitan ng **Light Mode** at **Dark Mode**
  - **Admin Portal** -- lumalabas lamang kung may permiso kang administrator sa simbahan mo; binubuksan nito ang B1 Admin sa bagong tab
  - **I-install ang App** -- binubuksan ang [install instructions](./installing-pwa.md) sa `/mobile/install` (nawawala kapag na-install na ang app)
- **Mag-sign out**, o button na **Mag-sign In** kung hindi ka naka-log in
- Ang pangalan ng simbahan mo at link papunta sa privacy policy

## Ang App Bar

Sa telepono, ang bar sa itaas ng bawat screen ay nagpapakita ng:

- Ang pangalan ng simbahan mo sa Home at iba pang pangunahing screen, o back arrow kapag nasa detail screen ka. Lumalabas ang pamagat ng screen sa itaas mismo ng pahina.
- Icon na **bell** para sa mga notification at mensahe, na may badge para sa mga hindi pa nababasang item -- tingnan ang [Notifications and Messages](#notifications-and-messages) sa ibaba
- Ang **larawan mo sa profile**, na nagbubukas ng iyong profile sa `/mobile/profileEdit` -- tingnan ang [Editing Your Profile](./editing-your-profile.md)

Lumalabas lamang ang bell at larawan sa profile kapag naka-sign in ka.

## Mga Notification at Mensahe {#notifications-and-messages}

Kapag tinap mo ang bell, bubukas ang isang panel na may dalawang seksyon:

- **Mga Mensahe** -- ang pinakabagong pribadong usapan mo, kasama ang link na **Bagong mensahe** para magsimula ng bago
- **Mga Notipikasyon** -- ang pinakabagong notification mo, na may badge na **Bago** sa mga hindi pa nababasa. I-tap ang isang notification para mapunta sa group, plan, o usapan kung saan ito nanggaling.

Ipinapakita ng bawat seksyon kung ilan ang hindi pa nababasang item nito. I-tap ang **Tingnan lahat** sa ibaba para buksan ang buong inbox mo sa `/mobile/notifications`.

## Mga Pahinang May Seksyon

Ang mga detail page -- isang group, isang plan, ang iyong Me page, at ang mga screen ng Plans at Giving -- ay nakaayos bilang isang pahina ng mga seksyon sa halip na mga tab. Bawat seksyon ay nagpapakita ng maikling preview, at ang isang link sa header ng seksyon (gaya ng **Lahat ng miyembro**, **Lahat ng event**, o **Buong service order**) ay nagbubukas ng buong listahan. Ang link na **Bumalik sa** sa itaas ng view na iyon ay ibabalik ka sa pahinang pinanggalingan mo.

## Ang Me Page

Ang **Me** (`/mobile/me`) ang personal mong hub. Ipinapakita nito ang pangalan at larawan mo kasama ang mga button na **I-edit ang Profile** at **Mga Setting** ([notification preferences](./notification-preferences.md)), pagkatapos ay ang mga paparating para sa iyo -- mga serving assignment, event registration, at group event -- sinundan ng iyong household, mga group mo, ang iyong [giving](../giving/) ngayong taon, ang iyong [registrations](../events/my-registrations.md), at ang iyong mga kamakailang notification at mensahe. Tingnan ang [The Me Page](./me-page) para sa mga detalye.

Kung hindi ka naka-log in, ang button na **Mag-sign In** ang ipapakita ng Me page sa halip.

## Pag-i-install sa Home Screen

Ang member portal ay isang Progressive Web App. Bisitahin ang `/mobile/install` (o piliin ang **I-install ang App** sa More page) para sa step-by-step na instruksyon para sa device mo. Kapag na-install na, magbubukas ito nang full-screen mula sa home screen mo nang walang browser chrome. Tingnan ang [Installing as an App (PWA)](./installing-pwa.md).

## Ang Public Website ng Simbahan Mo

Sa labas ng member portal, may sariling header navigation ang public website ng simbahan mo, na may mga link na in-configure ng mga administrator -- mga pahina gaya ng [sermons](../content/sermons.md), ang [Bible](../content/bible.md), [live streaming](../content/live-streaming.md), at isang public group list. Sa telepono, nasa ilalim ng hamburger icon sa kanang itaas ng header ang mga link na ito.

:::info
Nag-iiba-iba ang mga tab at tool na makikita mo depende sa simbahan. Kinokontrol ng mga administrator sa pamamagitan ng B1 Admin kung aling mga seksyon ang nakikita ng mga miyembro, kaya kung wala kang makitang feature na inilalarawan dito, maaaring hindi ito in-on ng simbahan mo.
:::
