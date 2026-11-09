---
title: "Mga Setting ng Mobile App"
description: "I-configure ang mga navigation tab, Home screen tile, sign-in prompt, at mga setting ng privacy ng member directory para sa member app ng B1.church sa B1 Admin."
---

# Mga Setting ng Mobile App

<div class="article-intro">

Binibigyan ka ng pahinang Mobile App Settings ng kakayahang i-configure ang mga navigation tab na lumalabas sa **karanasan ng B1.church sa mobile (PWA)** para sa mga miyembro ng iyong simbahan. Ikaw ang nagpapasya kung aling mga tab ang nakikita, saan sila nagli-link, at paano sila ipinapakita.

</div>

## Training Video

<YouTube id="ydY7WGK16fE" title="Pag-customize ng Member App ng Iyong Simbahan sa B1" />

:::info
Lumalabas sa B1 App ang mga tab na naka-configure dito, na maaaring [i-install ng mga miyembro bilang Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Ibahagi sa mga miyembro ang install page ng iyong simbahan -- `https://yourchurchname.b1.church/mobile/install` -- na gagabay sa kanila sa pag-install ng app sa kanilang device, nang walang kailangang i-download mula sa App Store o Google Play.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ang permiso na "Edit Church Settings." Tingnan ang [Roles & Permissions](./roles-permissions.md) kung wala kang access.
- I-configure muna ang iyong [Church Settings](./church-settings.md), kabilang ang pangalan at branding ng simbahan

</div>

## Pag-access sa Navigation Settings

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Mobile**.
2. I-click ang **Navigation** (`/mobile/navigation`).
3. Ipinapakita ng pahina ng Navigation ang kasalukuyang mga tab ng iyong app.

## Pagdaragdag ng Bagong Tab {#adding-a-new-tab}

1. I-click ang button na **Add Tab** sa itaas ng pahina.
2. Punan ang mga detalye ng tab:
   - **Name** -- Ang label na lumilitaw sa tab (halimbawa, "Sermons" o "Give").
   - **Icon** -- I-click ang icon selector para pumili ng icon para sa iyong tab.
   - **Image** -- I-click ang **Select Image** (o **Change Image**) para bigyan ang tab ng larawan. Ang mga tab na may larawan ay lumilitaw bilang photo tile sa Home screen ng app -- tingnan ang [Home Screen Tiles](#home-screen-tiles).
   - **Tab Type** -- Pumili mula sa mga opsyon tulad ng Bible, Live Stream, Donation, Registrations, Requests, Website, at iba pa. Binubuksan ng **Registrations** ang mga event registration ng miyembro; binubuksan naman ng **Requests** ang My Requests, kung saan maaaring humiling ng event ang miyembro at makita ang status ng mga nakaraang request. Itakda ang Visibility sa Logged-in Users o Members & Staff para sa mga ito, dahil kailangan nila ng naka-sign in na miyembro.
   - **URL** -- Ilagay ang web address na dapat i-link ng tab.
   - **Visibility** -- Kontrolin kung sino ang makakakita ng tab na ito (lahat, members lamang, atbp.). Para sa tab na **Member Directory**, ang setting na ito ay kumokontrol lamang kung sino ang makakakita ng tab mismo; kung sino ang maaaring magbukas ng directory ay itinatakda ng **Show in Directory** sa pahina ng Member portal (tingnan ang [Member Directory & Messaging Settings](#member-directory--messaging-settings)).
3. I-click ang **Save Tab** para idagdag ito sa iyong app.

## Pag-e-edit ng Umiiral na Tab

1. I-click ang anumang umiiral na tab sa listahang **App Tabs**.
2. I-update ang pangalan, icon, URL, uri, o mga setting ng visibility ng tab.
3. I-click ang **Save Tab** para ilapat ang iyong mga pagbabago.

## Muling Pag-aayos ng mga Tab

Maaari mong baguhin ang pagkakasunod-sunod ng mga tab na lumalabas sa mobile app. I-drag at i-drop ang mga tab sa listahan para muling ayusin ang mga ito. Ang pagkakasunod-sunod na ipinapakita sa pahinang ito ay tumutugma sa pagkakasunod-sunod na makikita ng iyong mga miyembro sa app.

:::info
Ang ilang tab ay maaaring lumitaw nang awtomatiko kapag natugunan ang ilang kondisyon -- halimbawa, maaaring lumabas ang tab na Live Stream kapag aktibo ang isang stream. Ang mga manu-manong idinagdag na tab ay nagbibigay sa iyo ng ganap na kontrol sa kung ano ang nakikita ng iyong mga miyembro sa lahat ng oras.
:::

:::tip
Panatilihing mapapamahalaan ang bilang ng iyong mga tab. Tatlo hanggang limang tab ang mainam para sa karamihan ng simbahan. Ang sobrang dami ng tab ay maaaring makalito sa nabigasyon para sa iyong mga miyembro.
:::

## Member Directory & Messaging Settings {#member-directory--messaging-settings}

Ang item na **Member portal** sa parehong seksyong Mobile ay naglalaman ng mga setting na namamahala sa member directory at pribadong messaging sa karanasan ng B1.church:

- **Directory Approval Group** -- Ang grupong nagsusuri ng mga update sa member directory, at [mga kahilingan sa pagbura ng account](../profile/account-deletion.md), bago magkabisa ang mga ito.
- **Show in Directory** -- Sino ang maaaring magbukas ng member directory at sino ang nakalista rito: **Admins Only**, **Members and Above** (ang default), **Regular Attendees and Above**, o **Visitors and Above**. Ang mga taong ang membership status ay mas mababa sa antas na pipiliin mo ay hindi makakakita ng directory at hindi mailalista rito. Isinasara ng **Admins Only** ang directory sa lahat maliban sa mga staff na may permiso na People > View (hindi sapat ang Staff membership status lamang), na palaging makakabukas ng directory at makakakita ng lahat, anuman ang itakda rito. Hindi kailanman kasama ang mga Guest, dahil ang sinumang nagpaparehistro sa sarili online ay nagsisimula bilang guest.
- **Visibility Preference** -- Itinatakda ang default ng buong simbahan para sa mga miyembrong hindi pa pumipili ng sarili nilang setting. Ang **Address**, **Phone Number**, at **Email** ay may kani-kaniyang dropdown, na may parehong limang antas na available saanman itinatakda ang visibility:
  - **Everyone** -- nakikita ng sinuman, kabilang ang mga anonymous na bisita
  - **Members** -- nakikita lamang ng mga taong may Member o Staff record
  - **Groups Only** -- nakikita lamang ng mga taong nagbabahagi ng grupo sa taong ito, kasama ang staff
  - **My Group Leaders and Staff** -- nakikita lamang ng mga leader ng grupong kinabibilangan ng taong ito, kasama ang staff
  - **Staff Only** -- nakikita lamang ng staff (sinumang may membership status na Staff, o may permiso na People > View), at ng mismong tao

  Ang "Staff" sa mga antas na ito ay nangangahulugang sinumang may membership status na Staff o may permiso na People > View. Agad na nagkakabisa ang mga pagbabago sa grupo: ang sinumang sumali sa grupo, o itinalagang group leader, ay makakakita ng katugmang detalye na **Groups Only** o **My Group Leaders and Staff** ng mga miyembro ng grupong iyon nang hindi na kailangang mag-sign out at mag-sign in muli.

  Maaaring i-override ng mga miyembro ang mga default na ito para sa sarili nilang record mula sa tab na **Privacy** ng kanilang profile sa B1.church PWA -- tingnan ang [Editing Your Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Isang kontrol para sa kaligtasan ng bata. Hindi magbubukas ang B1 ng **bagong** pribadong pag-uusap kapag alinman sa dalawang tao ay mas bata sa edad na ito, batay sa kanilang petsa ng kapanganakan (ginagamit ang household role bilang alternatibo kapag walang petsa ng kapanganakan na nakatala). Mananatiling ganap na nakikita sa directory ang mga taong mas bata sa edad na ito -- tanging direct messaging ang hinaharangan, sa **parehong direksyon**, para sa lahat kabilang ang staff. Gumagana pa rin ang mga group conversation at ang pagmemensahe sa mga magulang ng bata. Ang mga opsyon ay Off, 13, 16, o 18; ang default ay **18**. Hindi naaapektuhan ang mga umiiral nang pag-uusap.

:::tip
Dahil umaasa ang minimum-age check sa mga petsa ng kapanganakan, tiyaking napunan ang mga petsa ng kapanganakan para sa mga batang nasa iyong kongregasyon. Kabilang ang setting na ito sa parehong pamilya ng child-safety bilang [mga kontrol sa kaligtasan ng check-in](../attendance/checkin-safety.md).
:::

### Sign-In Prompt sa Home Screen {#home-screen-sign-in-prompt}

Ang mga bisitang magbubukas ng [Home screen](/docs/b1-church/getting-started/navigating#home) ng app nang hindi nag-sign in ay makakakita ng maikling prompt -- bilang default, *"Sign in to see your groups, giving, and more."* -- kasama ang button na **Sign In**. Binabago ito ng mga setting ng **Home screen sign-in prompt** sa parehong pahina ng Member portal (`/mobile/b1-mobile`):

- **Show sign-in prompt on the app home screen** -- I-off ito para itago ang prompt at ang button na **Sign In** sa Home screen. Maaari pa ring mag-sign in ang mga bisita mula sa menu ng app.
- **Sign-in prompt text** -- Palitan ang default na teksto ng sarili mong mensahe (hanggang 150 karakter). Iwanang blangko para gamitin ang default. Naka-disable ang kahon na ito habang naka-off ang prompt.

I-click ang **Save** para ilapat. Kukumpirmahin ng mensaheng **Saved** ang pagbabago. Mare-refresh ng pag-save ang mga naka-cache na setting ng app, kaya lalabas ang pagbabago sa susunod na mag-load ang Home screen.

### Home Screen Tiles {#home-screen-tiles}

Ang mga tab na may larawan (tingnan ang **Image** sa ilalim ng [Pagdaragdag ng Bagong Tab](#adding-a-new-tab)) ay lumilitaw sa [Home screen](/docs/b1-church/getting-started/navigating#home) ng app bilang photo tile, sa isang seksyong may heading na pangalan ng iyong simbahan. Kasama rito ang tab na Verse of the Day, kung bibigyan mo ito ng larawan. Lumilitaw pa rin sa tab bar ang mga photo tab.

Kinokontrol ng setting na **Home screen tiles** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) kung paano nakaayos ang mga tile na iyon. Pumili ng **Layout**:

- **Grid** -- Dalawang tile bawat hilera (ang default). Kapag kakaiba ang bilang ng mga tile, sasakupin ng unang tile ang buong lapad.
- **Scrolling row** -- Isang hilera ng mga tile na sinisilip ng mga miyembro nang pahalang.
- **Scrolling (automatic)** -- Parehong pahalang na hilera, pero kusa rin itong gumagalaw, na lumilipat ng isang tile kada humigit-kumulang apat na segundo at bumabalik sa unang tile pagkatapos ng huli. Humihinto ito kapag hinawakan, itinuro, o na-tab ng miyembro ang hilera, at muling gumagalaw pagkaraan ng ilang segundo. Sa mga device na naka-set sa reduce motion, nananatiling tahimik ang hilera at gumagana na parang **Scrolling row**.
- **List** -- Listahan na may maliit na thumbnail ng larawan sa tabi ng pangalan ng bawat tab.
- **Grid and list** -- Ang unang tatlong photo tab bilang grid, na ang unang tile ay sumasakop sa buong lapad, at ang natitira ay nakalista sa ibaba na may maliit na thumbnail sa tabi ng bawat pangalan. Kapag lumampas sa tatlo, ipinapakita ng heading ng seksyon ang link na **All**, na nagbubukas sa pahinang **More** ng app na naglilista ng bawat tab.
- **Scrolling (automatic) and list** -- Ang unang tatlong photo tab sa self-advancing na hilera na inilarawan sa itaas, at ang natitira ay nakalista sa ibaba, kasama ang parehong link na **All**.

Sa parehong scrolling layout, kapag mas maraming tile kaysa kasya sa screen, may lalabas na hilera ng tuldok sa ilalim ng mga tile, isa para sa bawat tile, at pinupunan ang tuldok ng kasalukuyang tile. Maaaring i-tap ng mga miyembro ang tuldok para tumalon sa tile na iyon.

I-click ang **Save** para ilapat.

### Mga Seksyon ng Home Screen {#home-screen-sections}

Palaging nakikita ng mga naka-sign in na miyembro ang sarili nilang kasaysayan ng pagdalo at mga naisumiteng form sa [Me page](/docs/b1-church/getting-started/me-page). Maaaring ipakita rin ito ng mga switch ng **Home screen sections** sa parehong pahina ng Member portal (`/mobile/b1-mobile`) sa Home screen:

- **Show My Attendance on Home** -- Nagdaragdag ng seksyong **My Attendance** na nagpapakita kung ilang beses dumalo ang miyembro sa nakalipas na 90 araw, ang kanyang dalawang pinakahuling pagbisita, at link na **History** papunta sa buong listahan ng kanyang pagdalo.
- **Show My Forms on Home** -- Nagdaragdag ng seksyong **My Forms** na nagpapakita ng dalawang pinakahuling form submission ng miyembro at link na **All forms**.
- **Show News on Home** -- Nagdaragdag ng seksyong **News** sa ilalim mismo ng pagbati, na nagpapakita ng limang pinakabagong nai-publish na [blog post](../website/blog.md) bilang mga photo card sa isang hilerang gumagalaw nang kusa. Ang pag-tap sa card ay nagbubukas ng buong post sa loob ng app, at inililista ng link na **All news** ang mga kamakailang post mo. Kapag naka-on na ito, pinapayagan ka ng **Only this category** na pumili ng isang kategorya ng blog (halimbawa, *Announcements*) para lumabas lang ang mga post sa kategoryang iyon; iwanan sa **All posts** para ipakita ang lahat. Nakikita ng sinumang magbukas ng app ang News, naka-sign in man o hindi, dahil pampubliko ang mga blog post sa iyong website. Naka-off ito bilang default at lumilitaw lamang kapag may kahit isang nai-publish na post.

Parehong naka-off bilang default. Lumilitaw lamang ang seksyon para sa mga miyembrong naka-sign in at may kahit isang record na maipapakita.

I-click ang **Save** para ilapat.

## Saan Lumilitaw ang mga Tab na Ito

Ipinapakita ang mga tab na iyong i-configure dito sa **B1.church PWA** na ini-install ng mga miyembro mula sa anumang pahina sa `https://yourchurchname.b1.church`. Makikita ang mga pagbabagong gagawin mo sa pahinang ito sa susunod na pagbubukas ng app ng isang miyembro.

Sa telepono, ipinapakita ng bottom tab bar ang **Home**, hanggang tatlo sa iyong mga tab, at **More**; sa computer, hanggang limang tab ang ipinapakita sa header. Unang kumukuha ng puwesto ang mga built-in na screen (gaya ng Sermons, Giving, o Groups), at ang mga tab na **Internal Page** ang pupuno sa anumang natitirang puwesto. Hindi kailanman kumukuha ng puwesto ang mga tab na **External URL** at **Verse of the Day**. Nakalista sa pahinang **More** ng app ang bawat tab, kabilang ang mga hindi kasya.

Ang mga tab na nakalagay sa loob ng isang tab na **Folder** ay isang eksepsiyon: lumalabas lamang ang mga ito sa sarili nilang screen ng folder, na binubuksan ng miyembro sa pamamagitan ng pag-tap sa folder. Ipinapakita ng screen na iyon ang mga tab bilang photo tile kapag may larawan ang lahat ng ito, o bilang listahan kung hindi. Nakatago sa miyembro ang folder na walang tab na nakikita ng miyembrong iyon. Tingnan ang [Folder Tabs](../../b1-church/getting-started/navigating.md#folder-tabs). Tingnan ang [Navigating B1App](../../b1-church/getting-started/navigating.md) para sa nakikita ng mga miyembro.

## App Theme

Sa ilalim ng **Mobile > App Theme**, itakda ang mga kulay ng app ng iyong simbahan para sa parehong **Light** at **Dark** mode: **Background**, **Surface**, **Primary**, **Primary Contrast**, **Secondary**, at **Text Color**. Pumili ng kulay mula sa swatch, o i-type ang halaga nito sa kahong **Hex** sa tabi nito (halimbawa, `#1565C0`; opsyonal ang `#`). Naiaaplay ang na-type na kulay kapag nailagay na ang lahat ng anim na hex digit.

## Push Notifications

Para magpadala o mag-iskedyul ng push notification sa lahat ng may app o sa isang grupo lang, gamitin ang **Mobile > Push Notifications**. Tingnan ang [Push Notifications](./push-notifications.md).

## Mga Susunod na Hakbang

- [Church Settings](./church-settings.md) -- I-configure ang impormasyon at branding ng iyong simbahan
- [Roles & Permissions](./roles-permissions.md) -- Pamahalaan ang access para sa iyong team
