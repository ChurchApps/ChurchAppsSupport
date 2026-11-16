---
title: "Mga Setting ng Mobile App"
description: "I-configure ang mga navigation tab, Home screen tile, sign-in prompt, at privacy setting ng member directory para sa member app ng B1.church sa B1 Admin."
---

# Mga Setting ng Mobile App {#mobile-app-settings}

<div class="article-intro">

Hinahayaan ka ng pahinang Mobile App Settings na i-configure ang mga navigation tab na lumalabas sa **karanasan sa mobile ng B1.church (PWA)** para sa mga miyembro ng iyong simbahan. Ikaw ang nagkokontrol kung aling mga tab ang nakikita, saan sila nagli-link, at paano sila ipinapakita.

</div>

## Training Video {#training-video}

<YouTube id="ydY7WGK16fE" title="Pag-customize ng Member App ng Iyong Simbahan sa B1" />

:::info
Lumalabas sa B1 App ang mga tab na naka-configure dito, na maaaring [i-install ng mga miyembro bilang Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Ibahagi sa mga miyembro ang install page ng iyong simbahan -- `https://yourchurchname.b1.church/mobile/install` -- gagabayan sila nito sa pag-install ng app sa kanilang device, nang walang kailangang i-download mula sa App Store o Google Play.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na "Edit Church Settings". Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- I-configure muna ang iyong [Church Settings](./church-settings.md), kasama ang pangalan at branding ng simbahan

</div>

## Pag-access sa Navigation Settings {#accessing-navigation-settings}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa) at palawakin ang **Mobile**.
2. I-click ang **Navigation** (`/mobile/navigation`). Kailangan mo ng permiso na **Edit Content** para makita ito.
3. Ipinapakita ng listahang **App Tabs** ang iyong kasalukuyang mga tab ayon sa pagkakasunod-sunod, kasama ang visibility ng bawat isa. Ang mga tab sa loob ng folder ay naka-indent sa ilalim nito.

Kasama rin sa menu ng Mobile ang **App Theme**, **Member portal**, **B1 Check-In**, **Labels**, at **Push Notifications**. Nakalahad sa ibaba ang App Theme at Member portal; tingnan ang [Push Notifications](#push-notifications) para sa pag-iskedyul ng mga notification.

## Pagdaragdag ng Bagong Tab {#adding-a-new-tab}

1. I-click ang button na **Add Tab** sa itaas ng pahina.
2. Punan ang mga detalye ng tab:
   - **Tab Name** -- Ang label na lilitaw sa tab (halimbawa, "Sermons" o "Give").
   - **Icon** -- I-click ang icon selector para pumili ng icon para sa iyong tab.
   - **Image** -- I-click ang **Select Image** (o **Change Image**) para bigyan ang tab ng larawan. Ang mga tab na may larawan ay lumalabas bilang photo tile sa Home screen ng app -- tingnan ang [Home Screen Tiles](#home-screen-tiles). Para alisin ang larawan, i-click ang **Remove Image** at i-save; ang tab ay lalabas bilang karaniwang tab, hindi bilang Home tile.
   - **Tab Type** -- **Bible**, **Live Stream**, **Verse of the Day**, **Sermons**, **Check-in**, **Donation**, **Member Directory**, **My Groups**, **Volunteer Opportunities**, **Serving Plans**, **Registrations**, **Requests**, **External URL**, **Internal Page**, o **Folder**. Binubuksan ng **Registrations** ang mga event registration ng miyembro; binubuksan ng **Requests** ang My Requests, kung saan maaaring humiling ng event ang miyembro at makita ang status ng mga nakaraang request. Itakda ang Visibility sa Logged-in Users o Members & Staff para sa mga ito, dahil kailangan nila ng naka-sign-in na miyembro.
   - **URL** -- Ipinapakita para sa mga tab na **External URL**: ang web address na bubuksan ng tab.
   - **Page** -- Ipinapakita para sa mga tab na **Internal Page**: pumili ng isa sa mga pahina ng iyong website.
   - **Parent tab** -- Ilagay ang tab sa loob ng isang **Folder** tab, o iwan sa **None (top level)**. Tingnan ang [Where These Tabs Appear](#where-these-tabs-appear).
   - **Visibility** -- Sino ang makakakita sa tab na ito: **Everyone (including anonymous)**, **Logged-in Users**, **Members & Staff**, **Staff Only**, **Serving Team Members**, o **Specific Groups...** (pagkatapos lagyan ng check ang mga grupo). Para sa tab na **Member Directory**, ang setting na ito ay nagkokontrol lamang kung sino ang makakakita ng tab mismo; kung sino ang makakabukas ng directory ay itinatakda ng **Show in Directory** sa pahinang Member portal (tingnan ang [Member Directory & Messaging Settings](#member-directory--messaging-settings)).
3. I-click ang **Save Tab** para idagdag ito sa iyong app.

## Pag-edit ng Umiiral na Tab {#editing-an-existing-tab}

1. I-click ang edit (lapis) icon sa isang tab sa listahang **App Tabs**.
2. I-update ang pangalan, icon, larawan, uri, o mga setting ng visibility ng tab.
3. I-click ang **Save Tab** para ilapat ang mga pagbabago. Para alisin ang tab, i-click ang **Delete Tab** sa halip. Kapag binura ang folder, ibabalik sa top level ang mga tab nito.

## Pagsasaayos ng Pagkakasunod-sunod ng mga Tab {#reordering-tabs}

Maaari mong baguhin ang pagkakasunod-sunod ng paglitaw ng mga tab sa mobile app. Gamitin ang mga arrow na **Move Up** at **Move Down** sa bawat tab para muling ayusin ang mga ito. Ang mga tab sa loob ng folder ay gumagalaw sa loob ng folder na iyon. Ang pagkakasunod-sunod na ipinapakita sa pahinang ito ay tumutugma sa makikita ng mga miyembro mo sa app.

:::info
Maaaring lumitaw nang kusa ang ilang tab kapag natugunan ang ilang kondisyon -- halimbawa, maaaring lumabas ang tab na Live Stream kapag aktibo ang isang stream. Ang mga tab na idinagdag nang manwal ay nagbibigay sa iyo ng ganap na kontrol sa nakikita ng iyong mga miyembro sa lahat ng oras.
:::

:::tip
Panatilihing mapapamahalaan ang bilang ng tab. Tatlo hanggang limang tab ang angkop para sa karamihan ng simbahan. Ang sobrang dami ng tab ay maaaring magpalito sa navigation para sa iyong mga miyembro.
:::

## App Theme {#app-theme}

Itinatakda ng **Mobile > App Theme** (`/mobile/theme`) ang mga kulay na ginagamit ng B1 app, ng member portal, at ng check-in kiosk. Kailangan mo ng permiso na **Edit Church Settings**.

1. Palawakin ang **Light Mode** o **Dark Mode**.
2. Para sa bawat kulay -- **Background**, **Surface**, **Primary**, **Primary Contrast** (teksto sa mga button at header na may primary na kulay), **Secondary**, at **Text Color** -- i-click ang swatch para pumili ng kulay, o i-type ito sa kahong **Hex**. Ipinapakita ng **Preview** sa ibaba ang isang header, card, at button sa iyong mga kulay.
3. I-click ang **Save**.

I-click ang **Reset to Defaults** para bumalik sa karaniwang mga kulay. Ginagamit din ng sariling **Custom** theme ng B1 Admin ang light-mode na **Primary** color -- tingnan ang [Managing Your Profile](../profile/managing-profile.md).

## Member Directory at Mga Setting ng Messaging {#member-directory--messaging-settings}

Ang item na **Member portal** sa parehong seksyong Mobile (`/mobile/b1-mobile`, pinamagatang **Portal settings**) ay naglalaman ng mga setting na namamahala sa member directory at pribadong messaging sa karanasan ng B1.church. Kailangan mo ng permiso na **Edit Church Settings**. Kapag binago mo ang alinman sa mga setting sa ibaba, i-click ang **Save** sa ilalim ng pahina:

- **Directory Approval Group** -- Ang grupong nagsusuri ng mga update sa member directory, at ng [mga kahilingan sa pagbura ng account](../profile/account-deletion.md), bago magkabisa ang mga ito.
- **Show in Directory** -- Sino ang makakabukas ng member directory at sino ang nakalista rito: **Admins Only**, **Members and Above** (ang default), **Regular Attendees and Above**, o **Visitors and Above**. Hindi nakikita ng directory at hindi nakalista rito ang mga taong ang membership status ay mas mababa sa antas na pipiliin mo. Isinasara ng **Admins Only** ang directory sa lahat maliban sa staff na may permiso na People &gt; View (hindi sapat ang Staff membership status lamang), na laging makakabukas ng directory at makakakita sa lahat, anuman ang setting na ito. Hindi kailanman kasama ang mga Guest, dahil ang sinumang nagpa-register sa sarili online ay nagsisimula bilang guest.
- **Visibility Preference** -- Itinatakda ang default ng buong simbahan para sa mga miyembrong hindi pa pumipili ng sarili nilang setting. May sariling dropdown ang **Address**, **Phone Number**, at **Email** (bawat isa ay nagsisimula sa **Members**), na may parehong limang antas na available saanman itinakda ang visibility:
  - **Everyone** -- nakikita ng sinuman, kasama ang mga anonymous na bisita
  - **Members** -- nakikita lamang ng mga taong may talaang Member o Staff
  - **Groups Only** -- nakikita lamang ng mga taong magkasamang nasa grupo kasama ang taong ito, at ng staff
  - **My Group Leaders and Staff** -- nakikita lamang ng mga leader ng grupong kinabibilangan ng taong ito, at ng staff
  - **Staff Only** -- nakikita lamang ng staff (sinumang may membership status na Staff, o may permiso na People &gt; View), at ng mismong tao

  Ang "Staff" sa mga antas na ito ay sinumang may membership status na Staff o may permiso na People &gt; View. Agad na nagkakabisa ang mga pagbabago sa grupo: ang sinumang sumali sa grupo, o ginawang group leader, ay makakakita ng katugmang detalye ng **Groups Only** o **My Group Leaders and Staff** ng mga miyembro ng grupong iyon nang hindi nagsasara at muling nagla-log in.

  Maaaring i-override ng mga miyembro ang mga default na ito para sa sarili nilang talaan mula sa tab na **Privacy** ng kanilang profile sa B1.church PWA -- tingnan ang [Editing Your Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Isang kontrol para sa kaligtasan ng bata. Hindi bubuksan ng B1 ang **bagong** pribadong usapan kapag alinman sa dalawang tao ay mas bata sa edad na ito, base sa kanilang birthdate (ginagamit ang household role bilang kapalit kapag walang birthdate sa talaan). Nananatiling ganap na nakikita sa directory ang mga taong mas bata sa edad na iyon -- tanging direct messaging lamang ang nai-block, sa **magkabilang direksyon**, para sa lahat kasama ang staff. Gumagana pa rin ang mga group conversation at ang pag-message sa mga magulang ng bata. Ang mga opsyon ay Off, 13, 16, o 18; ang default ay **18**. Hindi naaapektuhan ang mga umiiral na usapan.

:::tip
Dahil umaasa ang pagsusuri ng minimum age sa mga birthdate, siguraduhing napunan ang mga birthdate para sa mga bata sa iyong kongregasyon. Kabilang ang setting na ito sa parehong pamilya ng mga kontrol sa kaligtasan ng bata gaya ng [check-in safety controls](../attendance/checkin-safety.md).
:::

### Sign-In Prompt sa Home Screen {#home-screen-sign-in-prompt}

Ang mga bisitang magbubukas ng [Home screen](/docs/b1-church/getting-started/navigating#home) ng app nang hindi nag-sa-sign in ay makakakita ng maikling prompt -- bilang default, *"Sign in to see your groups, giving, and more."* -- sa tabi ng button na **Sign In**. Hinahayaan ka ng mga setting ng **Home screen sign-in prompt** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) na baguhin ito:

- **Show sign-in prompt on the app home screen** -- I-off ito para itago ang prompt at ang button na **Sign In** sa Home screen. Maaari pa ring mag-sign in ang mga bisita mula sa app menu.
- **Sign-in prompt text** -- Palitan ang karaniwang pagkakasulat ng sarili mong mensahe (hanggang 150 karakter). Iwanang blangko para gamitin ang default. Naka-disable ang kahong ito habang naka-off ang prompt.

I-click ang **Save** para ilapat. Kukumpirmahin ng mensaheng **Saved** ang pagbabago. Ang pag-save ay nagre-refresh sa mga naka-cache na setting ng app, kaya lalabas ang pagbabago sa susunod na mag-load ang Home screen.

### Event Request Page {#event-request-page}

Ang mga miyembrong [nagre-request ng event](../../b1-church/events/requesting-events.md) sa app ay makakakita ng maikling linya sa itaas ng pahinang **Request an Event** -- bilang default, *"Staff will approve each room and item."* Hinahayaan ka ng setting na **Event request page** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) na palitan ito ng sarili mong tagubilin, gaya ng mga patakaran sa booking, gaano kaaga dapat mag-request, o mga tuntunin:

1. I-type ang iyong teksto sa **Event request instructions** (hanggang 1,000 karakter). Pinananatili ang mga line break.
2. I-click ang **Save**.

Iwanang blangko ang kahon para panatilihin ang default na linya.

### Home Screen Tiles {#home-screen-tiles}

Ang mga tab na may larawan (tingnan ang **Image** sa ilalim ng [Adding a New Tab](#adding-a-new-tab)) ay lumalabas sa [Home screen](/docs/b1-church/getting-started/navigating#home) ng app bilang photo tile, sa seksyong may heading na pangalan ng iyong simbahan. Kasama rito ang tab na Verse of the Day, kung bibigyan mo ito ng larawan. Lumalabas pa rin sa tab bar ang mga photo tab.

Kinokontrol ng setting na **Home screen tiles** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) kung paano nakaayos ang mga tile na iyon. Pumili ng **Layout**:

- **Grid** -- Dalawang tile kada row (ang default). Kapag kakaiba ang bilang ng tile, sasakupin ng unang tile ang buong lapad.
- **Scrolling row** -- Isang row ng mga tile na sinasagap ng mga miyembro pahalang.
- **Scrolling (automatic)** -- Ang parehong pahalang na row, pero gumagalaw din ito nang kusa, umuusad ng isang tile kada mga apat na segundo at bumabalik sa unang tile pagkatapos ng huli. Humihinto ito habang hinahawakan, hina-hover, o tina-tab ng miyembro ang row, at muling nagpapatuloy pagkalipas ng ilang segundo. Sa mga device na naka-set sa reduce motion, nananatiling tahimik ang row at gumagana gaya ng **Scrolling row**.
- **List** -- Isang listahan na may maliit na photo thumbnail sa tabi ng pangalan ng bawat tab.
- **Grid and list** -- Ang unang tatlong photo tab bilang grid, kung saan sasakupin ng unang tile ang buong lapad, at ang susunod na tatlo ay nakalista sa ibaba na may maliit na thumbnail sa tabi ng bawat pangalan. Kapag higit sa tatlo, ang heading ng seksyon ay magpapakita ng link na **All** na nagbubukas sa pahinang **More** ng app, na naglilista ng bawat tab.
- **Scrolling (automatic) and list** -- Bawat photo tab sa self-advancing na row na inilarawan sa itaas, kasama ang unang tatlong hindi pa nasa menu ng app (ang tab bar sa telepono, ang header sa computer) na nakalista rin sa ibaba, at ang parehong link na **All** kapag higit sa tatlo.

Sa parehong scrolling layout, kapag mas maraming tile kaysa kasya sa lapad ng screen, may lalabas na hilera ng tuldok sa ilalim ng mga tile, isa para sa bawat tile, at pinupuno ng tuldok ang kasalukuyang tile. Maaaring i-tap ng mga miyembro ang isang tuldok para tumalon sa tile na iyon.

I-click ang **Save** para ilapat.

### Home Screen Sections {#home-screen-sections}

Palaging nakikita ng mga naka-sign-in na miyembro ang sarili nilang kasaysayan ng attendance at mga naisumiteng form sa [Me page](/docs/b1-church/getting-started/me-page). Maaari ring ipakita ng mga switch ng **Home screen sections** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) ang mga ito sa Home screen:

- **Show My Attendance on Home** -- Nagdaragdag ng seksyong **My Attendance** na may bilang kung ilang beses dumalo ang miyembro sa nakaraang 90 araw, ang dalawang pinakahuling pagbisita niya, at link na **History** papunta sa buong listahan ng attendance niya.
- **Show My Forms on Home** -- Nagdaragdag ng seksyong **My Forms** na may dalawang pinakahuling form submission ng miyembro at link na **All forms**.

Parehong naka-off bilang default. Lumalabas lamang ang isang seksyon para sa mga miyembrong naka-sign in at may kahit isang talang maipapakita.

- **Show News on Home** -- Nagdaragdag ng seksyong **News** sa ilalim mismo ng pagbati na nagpapakita ng limang pinakabagong nai-publish na [blog post](../website/blog.md) mo bilang photo card sa isang row na kusang gumagalaw. Ang pag-tap sa card ay nagbubukas ng buong post sa loob ng app, at nagli-list ang link na **All news** ng mga kamakailan mong post. Kapag naka-on na ito, hinahayaan ka ng **Only this category** na pumili ng isang blog category (halimbawa, *Announcements*) para isang uri lamang ng post ang lumitaw; iwanan sa **All posts** para ipakita ang lahat. Nakikita ang News ng lahat ng nagbubukas ng app, naka-sign in man o hindi, dahil pampubliko ang mga blog post sa iyong website. Naka-off ito bilang default at lumalabas lamang kapag may kahit isang nai-publish na post.

I-click ang **Save** para ilapat.

## Push Notifications {#push-notifications}

Ang **Mobile > Push Notifications** (`/mobile/notifications`) ay nagpapadala o nag-iskedyul ng push notification sa mga taong may naka-install na B1 app at naka-on ang notification. Kailangan mo ng **Edit Content** para magpadala sa lahat, o **Edit Group Members** para magpadala sa isang grupo.

1. I-click ang **Send Notification**.
2. Piliin ang **Audience**: **Everyone with the app**, o isa sa iyong mga grupo. Ipinapakita ng B1 kung ilang tao ang aabutin ng push at kung ilan ang naka-off ang push; hindi ka kasama sa sarili mong push.
3. Maglagay ng **Title** (hanggang 80 karakter) at **Message** (hanggang 240 karakter), at opsyonal na **Open link or flyer URL** at **Image URL** (kaparehong field ng [group notification](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Sa ilalim ng **When**, panatilihin ang **Send now**, o piliin ang **Schedule for later** at pumili ng **Send at** na oras sa hinaharap.
5. I-click ang **Send Notification** (o **Schedule Notification**).

Nakalista sa pahina ang mga **Scheduled** na notification (may **Edit**, **Send now**, at **Cancel** sa bawat isa) at ang mga **Recent** na may kanilang status, gaya ng *Sent: 12 of 15*, *Cancelled*, o *Missed (the send time passed)*. I-click ang **Remove** para alisin sa listahan ang tapos nang notification, o ang **Clear all** para alisin ang bawat naipadala, pumalpak, at nakansela. Ipinapakita ang mga oras sa [time zone](./church-settings.md#time-zone) ng simbahan mo, o ng computer mo kung walang nakatakda sa simbahan. Muling kinakalkula kung sino ang makakatanggap ng nakaiskedyul na notification kapag ipinadala na ito.

Ang notification na mahigit 30 minutong huli nang subukan ng B1 na ipadala ay mamarkahang *Missed* at hindi ipapadala; ang notification na pumalya nang tatlong beses ay magpapakitang *Failed* kasama ang error. Ang pag-alis ng notification sa listahan ay hindi ito binabawi sa mga taong nakatanggap na nito. Kapag walang link ang push, ang pag-tap dito ay nagbubukas sa listahan ng notification ng app para sa push na buong simbahan, o sa pahina ng grupo para sa push ng grupo. Hindi nakakatanggap ng mga push na ito ang mga miyembrong nag-off ng **Church Announcements** sa kanilang [notification preferences](../../b1-church/getting-started/notification-preferences.md), kahit ipadala ito sa lahat o sa isang grupo.

## Saan Lumilitaw ang mga Tab na Ito {#where-these-tabs-appear}

Ang mga tab na iyong ini-configure dito ay ipinapakita sa **B1.church PWA** na ini-install ng mga miyembro mo mula sa kahit anong pahina sa `https://yourchurchname.b1.church`. Ang mga pagbabagong gagawin mo sa pahinang ito ay makikita sa susunod na magbukas ang miyembro ng app.

Sa telepono, ipinapakita ng bottom tab bar ang **Home**, hanggang tatlo sa iyong mga tab, at **More**; sa computer, hanggang lima ang ipinapakita ng header. Ang mga built-in na screen (gaya ng Sermons, Giving, o Groups) ang unang nakakakuha ng mga slot, at ang mga **Internal Page** tab ang pumupuno sa mga natitirang slot. Hindi kailanman nakakakuha ng slot ang mga tab na **External URL** at **Verse of the Day**. Nakalista sa pahinang **More** ng app ang bawat tab, kasama ang mga hindi nagkasya.

Ang eksepsyon ay ang mga tab na nasa loob ng **Folder** tab: lumilitaw lamang ang mga ito sa sariling screen ng folder, na binubuksan ng miyembro sa pamamagitan ng pag-tap sa folder. Kapag hindi nakakuha ng slot ang folder sa tab bar o header, nakalista rin sa seksyong **More from** ng Home ang pangalan ng folder kasama ang mga tab nito bilang mga button sa ilalim, ayon sa pagkakasunod-sunod na itinakda dito. Ipinapakita ng screen na iyon ang mga tab bilang photo tile kapag bawat isa ay may larawan, o bilang listahan kung hindi. Ang folder na walang tab na nakikita ng isang miyembro ay nakatago sa miyembrong iyon. Tingnan ang [Folder Tabs](../../b1-church/getting-started/navigating.md#folder-tabs). Tingnan ang [Navigating B1App](../../b1-church/getting-started/navigating.md) para sa makikita ng mga miyembro.

## Mga Susunod na Hakbang {#next-steps}

- [Church Settings](./church-settings.md) -- I-configure ang impormasyon at branding ng simbahan
- [Roles & Permissions](./roles-permissions.md) -- Pamahalaan ang access para sa iyong team
