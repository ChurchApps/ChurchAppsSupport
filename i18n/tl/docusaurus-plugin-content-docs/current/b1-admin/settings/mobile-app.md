---
title: "Mga Setting ng Mobile App"
---

# Mga Setting ng Mobile App

<div class="article-intro">

Hinahayaan ka ng pahina ng Mobile App Settings na i-configure ang mga navigation tab na lumalabas sa **karanasan ng B1.church sa mobile (PWA)** para sa mga miyembro ng iyong simbahan. Kinokontrol mo kung aling mga tab ang nakikita, saan ang mga ito dinidirekta, at paano ipinapakita ang mga ito.

</div>

:::info Deprecated na ang native na B1 Mobile app
Ang mga tab na naka-configure dito ay inihahatid sa pamamagitan ng [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), na pumalit sa native na B1 Mobile app. Ibahagi sa mga miyembro ang install page ng iyong simbahan -- `https://yourchurchname.b1.church/mobile/install` -- na gagabay sa kanila sa pag-install ng app sa kanilang device, nang walang kinakailangang download mula sa App Store o Google Play.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng "Edit Church Settings" permission. Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala ka nito.
- I-configure muna ang iyong [Church Settings](./church-settings.md), kabilang ang pangalan ng simbahan at branding nito.

</div>

## Pag-access sa Navigation Settings

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Mobile**.
2. I-click ang **Navigation** (`/mobile/navigation`).
3. Ipinapakita ng pahinang Navigation ang kasalukuyan mong mga app tab.

## Pagdaragdag ng Bagong Tab

1. I-click ang **Add Tab** button sa itaas ng pahina.
2. Punan ang mga detalye ng tab:
   - **Name** -- Ang label na lilitaw sa tab (halimbawa, "Sermons" o "Give").
   - **Icon** -- I-click ang icon selector para pumili ng icon para sa tab.
   - **Image** -- I-click ang **Select Image** (o **Change Image**) para bigyan ang tab ng larawan. Ang mga tab na may larawan ay lumalabas bilang photo tile sa Home screen ng app -- tingnan ang [Home Screen Tiles](#home-screen-tiles).
   - **Tab Type** -- Pumili mula sa mga opsyon tulad ng Bible, Live Stream, Donation, Website, at iba pa.
   - **URL** -- Ilagay ang web address na dapat i-link ng tab.
   - **Visibility** -- Kontrolin kung sino ang makakakita ng tab na ito (lahat, miyembro lamang, atbp.). Para sa **Member Directory** tab, ang setting na ito ay kumokontrol lamang kung sino ang makakakita ng mismong tab; kung sino ang maaaring magbukas ng directory ay itinatakda ng **Show in Directory** sa pahinang Member portal (tingnan ang [Member Directory & Messaging Settings](#member-directory--messaging-settings)).
3. I-click ang **Save Tab** para idagdag ito sa iyong app.

## Pag-e-edit ng Umiiral na Tab

1. I-click ang alinmang tab sa listahan ng **App Tabs**.
2. I-update ang pangalan, icon, URL, uri, o visibility settings ng tab.
3. I-click ang **Save Tab** para ilapat ang mga pagbabago.

## Pagsasaayos ng Pagkakasunod-sunod ng Tab

Maaari mong baguhin ang pagkakasunod-sunod ng mga tab sa mobile app. I-drag at i-drop ang mga tab sa listahan para ayusin ang mga ito. Ang pagkakasunod-sunod na nakikita sa pahinang ito ay tumutugma sa makikita ng mga miyembro sa app.

:::info
Ang ilang tab ay maaaring lumitaw nang kusa kapag natugunan ang ilang kondisyon -- halimbawa, maaaring lumabas ang Live Stream tab kapag aktibo ang isang stream. Ang mga tab na idinagdag nang manu-mano ay nagbibigay sa iyo ng ganap na kontrol sa kung ano ang nakikita ng iyong mga miyembro sa lahat ng oras.
:::

:::tip
Panatilihing mapapamahalaan ang bilang ng tab. Tatlo hanggang limang tab ang angkop para sa karamihan ng simbahan. Ang sobrang dami ng tab ay maaaring makalito sa mga miyembro sa pag-navigate.
:::

## Member Directory at Mga Setting ng Messaging

Ang item na **Member portal** sa parehong seksyong Mobile ay naglalaman ng mga setting na namamahala sa member directory at pribadong messaging sa karanasan ng B1.church:

- **Directory Approval Group** -- Ang grupong nagrerepaso ng mga update sa member directory, at [mga kahilingan sa pagbura ng account](../profile/account-deletion.md), bago ito magkabisa.
- **Show in Directory** -- Sino ang makakabukas ng member directory at sino ang nakalista rito: **Admins Only**, **Members and Above** (ang default), **Regular Attendees and Above**, o **Visitors and Above**. Ang mga taong may membership status na mas mababa sa antas na pipiliin mo ay hindi makakakita ng directory at hindi nakalista rito. Isinasara ng **Admins Only** ang directory sa lahat maliban sa staff na may People > View permission (hindi sapat ang Staff membership status lamang), na palaging makakabukas ng directory at makakakita ng lahat, anuman ang setting na ito. Hindi kasama ang mga Guest, dahil ang sinumang nagpaparehistro online ay nagsisimula bilang guest.
- **Visibility Preference** -- Itinatakda ang default ng buong simbahan para sa mga miyembrong hindi pa pumipili ng sarili nilang setting. Ang **Address**, **Phone Number**, at **Email** ay bawat isa ay may sariling dropdown, na may parehong limang antas na available saanman itinatakda ang visibility:
  - **Everyone** -- nakikita ng sinuman, kabilang ang mga anonymous na bisita
  - **Members** -- nakikita lamang ng mga taong may Member o Staff record
  - **Groups Only** -- nakikita lamang ng mga taong nakabahagi ng grupo sa taong ito, at ng staff
  - **My Group Leaders and Staff** -- nakikita lamang ng mga lider ng grupong kinabibilangan ng taong ito, at ng staff
  - **Staff Only** -- nakikita lamang ng staff (sinumang may membership status na Staff, o may People > View permission), at ng mismong tao

  Ang "Staff" sa mga antas na ito ay sinumang may membership status na Staff o may People > View permission. Agad na nagkakabisa ang mga pagbabago sa grupo: ang sinumang sumali sa grupo, o itinalagang group leader, ay makakakita ng kaukulang detalye ng **Groups Only** o **My Group Leaders and Staff** ng mga miyembro ng grupong iyon nang hindi na kailangang mag-sign out at mag-sign in muli.

  Maaaring i-override ng mga miyembro ang mga default na ito para sa sarili nilang record mula sa tab na **Privacy** ng kanilang profile sa B1.church PWA -- tingnan ang [Editing Your Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Isang kontrol para sa kaligtasan ng mga bata. Hindi magbubukas ang B1 ng **bagong** pribadong usapan kapag alinman sa dalawang tao ay mas bata sa edad na ito, batay sa kanilang birthdate (ginagamit ang household role bilang kapalit kapag walang birthdate na nakatala). Nananatiling ganap na nakikita sa directory ang mga taong wala pa sa edad na ito -- ang direktang messaging lamang ang hinaharangan, sa **parehong direksyon**, para sa lahat kabilang ang staff. Gumagana pa rin ang mga group conversation at ang pag-message sa mga magulang ng bata. Ang mga opsyon ay Off, 13, 16, o 18; ang default ay **18**. Hindi naaapektuhan ang mga umiiral nang usapan.

:::tip
Dahil umaasa ang pagsusuri ng minimum age sa mga birthdate, siguraduhing napunan ang mga birthdate ng mga batang nasa iyong kongregasyon. Ang setting na ito ay kabilang sa parehong pamilya ng mga setting para sa kaligtasan ng bata gaya ng [check-in safety controls](../attendance/checkin-safety.md).
:::

### Sign-In Prompt sa Home Screen

Ang mga bisitang magbukas ng [Home screen](/docs/b1-church/getting-started/navigating#home) ng app nang hindi nag-sign in ay makakakita ng maikling prompt -- bilang default, *"Sign in to see your groups, giving, and more."* -- katabi ng **Sign In** button. Binibigyang-daan ka ng mga setting ng **Home screen sign-in prompt** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) na baguhin ito:

- **Show sign-in prompt on the app home screen** -- I-off ito para itago sa Home screen ang prompt at ang **Sign In** button. Maaari pa ring mag-sign in ang mga bisita mula sa menu ng app.
- **Sign-in prompt text** -- Palitan ang default na pananalita ng sarili mong mensahe (hanggang 150 character). Iwanang blangko para gamitin ang default. Naka-disable ang kahong ito habang naka-off ang prompt.

I-click ang **Save** para ilapat. Ipinapakita ng **Saved** message na naitala ang pagbabago. Ang pag-save ay nagre-refresh ng naka-cache na settings ng app, kaya lalabas ang pagbabago sa susunod na pagbukas ng Home screen.

### Home Screen Tiles

Ang mga tab na may larawan (tingnan ang **Image** sa ilalim ng [Adding a New Tab](#adding-a-new-tab)) ay lumalabas sa [Home screen](/docs/b1-church/getting-started/navigating#home) ng app bilang photo tile, sa isang seksyong may pamagat na pangalan ng iyong simbahan. Kasama rito ang Verse of the Day tab, kung bibigyan mo ito ng larawan. Lumalabas din ang mga photo tab sa tab bar.

Kinokontrol ng setting na **Home screen tiles** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) kung paano nakaayos ang mga tile na iyon. Pumili ng **Layout**:

- **Grid** -- Dalawang tile bawat hanay (ang default). Kapag kakaiba ang bilang ng tile, sasakupin ng unang tile ang buong lapad.
- **Scrolling row** -- Isang hanay ng mga tile na ina-swipe ng mga miyembro nang pahalang.
- **Scrolling (automatic)** -- Ang parehong pahalang na hanay, ngunit kusa rin itong gumagalaw, lumilipat ng isang tile kada humigit-kumulang apat na segundo at bumabalik sa simula pagkatapos ng dulo. Humihinto ito kapag hinawakan, itinuro, o pinindot ng Tab ng miyembro ang hanay, at muling gumagalaw ilang segundo pagkatapos. Sa mga device na naka-set sa reduce motion, nananatiling tahimik ang hanay at gumagana tulad ng **Scrolling row**.
- **List** -- Isang listahan na may maliit na thumbnail na larawan sa tabi ng pangalan ng bawat tab.

I-click ang **Save** para ilapat.

### Home Screen Sections

Palaging nakikita ng mga naka-sign in na miyembro ang sarili nilang kasaysayan ng attendance at mga naisumiteng form sa [Me page](/docs/b1-church/getting-started/me-page). Maaaring ipakita rin ng mga switch ng **Home screen sections** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) ang mga ito sa Home screen:

- **Show My Attendance on Home** -- Nagdaragdag ng seksyong **My Attendance** na nagpapakita kung ilang beses dumalo ang miyembro sa nakalipas na 90 araw, ang kanyang dalawang pinakahuling pagbisita, at isang link na **History** papunta sa kanyang kumpletong listahan ng attendance.
- **Show My Forms on Home** -- Nagdaragdag ng seksyong **My Forms** na nagpapakita ng dalawang pinakahuling form submission ng miyembro at isang link na **All forms**.

Parehong naka-off bilang default. Lalabas lamang ang isang seksyon para sa mga miyembrong naka-sign in at may kahit isang record na maipapakita. I-click ang **Save** para ilapat.

## Saan Lumalabas ang Mga Tab na Ito

Ang mga tab na iyong i-configure dito ay ipinapakita sa **B1.church PWA** na ini-install ng iyong mga miyembro mula sa anumang pahina sa `https://yourchurchname.b1.church`. Makikita ang mga pagbabagong gagawin mo sa pahinang ito sa susunod na pagbukas ng app ng isang miyembro.

Sa telepono, ipinapakita ng ibabang tab bar ang **Home**, hanggang tatlo sa iyong mga tab, at **More**; sa kompyuter, hanggang lima ang ipinapakita ng header. Ang mga built-in na screen (tulad ng Sermons, Giving, o Groups) ang unang kumukuha ng mga puwesto, at ang mga **Internal Page** tab ang pumupuno sa anumang natitirang puwesto. Hindi kailanman nakakakuha ng puwesto ang mga **External URL** at **Verse of the Day** tab. Nakalista ang bawat tab, kabilang ang mga hindi nagkasya, sa pahinang **More** ng app. Tingnan ang [Navigating B1App](/docs/b1-church/getting-started/navigating) para sa nakikita ng mga miyembro. (Ginagamit din ang mga tab ng lumang [B1 Mobile native app](/docs/b1-mobile/) para sa mga miyembrong gumagamit pa nito, ngunit deprecated na ang app na iyon at hindi na ina-update.)

## Mga Susunod na Hakbang

- [Church Settings](./church-settings.md) -- I-configure ang impormasyon at branding ng iyong simbahan
- [Roles & Permissions](./roles-permissions.md) -- Pamahalaan ang access ng iyong team
