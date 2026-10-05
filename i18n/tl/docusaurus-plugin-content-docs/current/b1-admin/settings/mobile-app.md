---
title: "Mobile App Settings"
---

# Mobile App Settings

<div class="article-intro">

Hinahayaan ka ng pahina ng Mobile App Settings na i-configure ang mga navigation tab na lumilitaw sa **B1.church mobile experience (PWA)** para sa mga miyembro ng iyong simbahan. Ikaw ang kumokontrol kung aling mga tab ang makikita, kung saan ito nakakonekta, at kung paano ito ipinapakita.

</div>

:::info Hindi na ginagamit ang native na B1 Mobile app
Ang mga tab na kino-configure rito ay inihahatid sa pamamagitan ng [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), na pumalit sa native na B1 Mobile app. Ibahagi sa mga miyembro ang install page ng iyong simbahan — `https://yourchurchname.b1.church/mobile/install` — na gagabay sa kanila sa pag-install ng app sa kanilang device, nang hindi kailangang mag-download sa App Store o Google Play.
:::

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ang pahintulot na "Edit Church Settings". Tingnan ang [Mga Tungkulin at Pahintulot](./roles-permissions.md) kung wala kang access.
- I-configure muna ang iyong [Church Settings](./church-settings.md), kasama ang pangalan at branding ng iyong simbahan

</div>

## Pagpunta sa Navigation Settings

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas na kaliwa) at i-expand ang **Mobile**.
2. I-click ang **Navigation** (`/mobile/navigation`).
3. Ipapakita ng pahina ng Navigation ang iyong kasalukuyang mga app tab.

## Pagdaragdag ng Bagong Tab

1. I-click ang button na **Add Tab** sa itaas ng pahina.
2. Punan ang mga detalye ng tab:
   - **Name** -- Ang label na lumilitaw sa tab (halimbawa, "Sermons" o "Give").
   - **Icon** -- I-click ang icon selector para pumili ng icon para sa iyong tab. Maaari ka ring mag-upload ng custom na larawan.
   - **Tab Type** -- Pumili mula sa mga opsyon tulad ng Bible, Live Stream, Donation, Website, at iba pa.
   - **URL** -- Ilagay ang web address na dapat puntahan ng tab.
   - **Visibility** -- Kontrolin kung sino ang makakakita ng tab na ito (lahat, miyembro lang, atbp.).
3. I-click ang **Save Tab** para idagdag ito sa iyong app.

## Pag-edit ng Umiiral na Tab

1. I-click ang anumang umiiral na tab sa listahan ng **App Tabs**.
2. I-update ang pangalan, icon, URL, uri, o mga setting ng visibility ng tab.
3. I-click ang **Save Tab** para ilapat ang iyong mga pagbabago.

## Pag-aayos ng Pagkakasunod-sunod ng mga Tab

Maaari mong baguhin ang pagkakasunod-sunod ng paglitaw ng mga tab sa mobile app. I-drag and drop ang mga tab sa listahan para ayusin muli ang mga ito. Ang pagkakasunod-sunod na ipinapakita sa pahinang ito ay tugma sa makikita ng iyong mga miyembro sa app.

:::info
Ang ilang tab ay maaaring awtomatikong lumitaw kapag natugunan ang ilang kondisyon -- halimbawa, maaaring lumitaw ang Live Stream tab kapag may aktibong stream. Ang mga manu-manong idinagdag na tab ay nagbibigay sa iyo ng ganap na kontrol sa kung ano ang nakikita ng iyong mga miyembro sa lahat ng oras.
:::

:::tip
Panatilihing makatwiran ang bilang ng iyong mga tab. Maayos ang tatlo hanggang limang tab para sa karamihan ng simbahan. Ang sobrang daming tab ay maaaring makalito sa nabigasyon ng iyong mga miyembro.
:::

## Mga Setting ng Member Directory at Messaging

Ang item na **Member portal** sa parehong seksyong Mobile ang naglalaman ng mga setting na namamahala sa member directory at pribadong messaging sa karanasan ng B1.church:

- **Directory Approval Group** -- Ang grupong nagrerepaso sa mga update sa member directory, at [mga kahilingan sa pagbura ng account](../profile/account-deletion.md), bago magkabisa ang mga ito.
- **Show in Directory** -- Kung sino ang maaaring lumabas sa member directory (mula Staff Only hanggang Everyone).
- **Visibility Preference** -- Nagtatakda ng default sa buong simbahan para sa mga miyembrong hindi pa pumipili ng sarili nilang setting. Ang **Address**, **Phone Number**, at **Email** ay may kani-kaniyang dropdown, na may parehong limang antas na magagamit saanman isinasaayos ang visibility:
  - **Everyone** -- makikita ng sinuman, kasama ang mga anonymous na bisita
  - **Members** -- makikita lamang ng mga taong may record na Member o Staff
  - **Groups Only** -- makikita lamang ng mga taong kabilang sa parehong grupo ng taong ito
  - **My Group Leaders and Staff** -- makikita lamang ng mga lider ng grupong kinabibilangan ng taong ito, kasama ang staff
  - **Staff Only** -- makikita lamang ng staff na may pahintulot na People &gt; View, at ng tao mismo

  Maaaring baguhin ng mga miyembro ang mga default na ito para sa sarili nilang record mula sa tab na **Privacy** ng kanilang profile sa B1.church PWA -- tingnan ang [Pag-edit ng Iyong Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Isang kontrol para sa kaligtasan ng mga bata. Hindi magbubukas ang B1 ng **bagong** pribadong usapan kapag ang sinuman sa dalawang tao ay mas bata sa edad na ito, batay sa kanilang petsa ng kapanganakan (gagamitin ang tungkulin sa sambahayan bilang pangalawang batayan kapag walang nakatalang petsa ng kapanganakan). Ang mga taong mas bata sa edad na iyon ay nananatiling ganap na nakikita sa directory -- direktang pag-message lang ang hinaharang, sa **magkabilang direksyon**, para sa lahat kasama ang staff. Gumagana pa rin ang mga usapan ng grupo at pag-message sa mga magulang ng bata. Ang mga opsyon ay Off, 13, 16, o 18; ang default ay **18**. Hindi naaapektuhan ang mga umiiral nang usapan.

:::tip
Dahil umaasa ang pagsusuri ng minimum na edad sa mga petsa ng kapanganakan, siguraduhing nakalagay ang petsa ng kapanganakan ng mga bata sa inyong kongregasyon. Ang setting na ito ay kabilang sa parehong pamilya ng kaligtasan ng bata gaya ng mga [kontrol sa kaligtasan ng check-in](../attendance/checkin-safety.md).
:::

### Sign-In Prompt sa Home Screen

Ang mga bisitang magbubukas ng [Home screen](/docs/b1-church/getting-started/navigating#home) ng app nang hindi nagsa-sign in ay makakakita ng maikling prompt -- bilang default, *"Sign in to see your groups, giving, and more."* -- sa tabi ng button na **Sign In**. Hinahayaan kang baguhin ito ng mga setting ng **Home screen sign-in prompt** sa parehong pahina ng Member portal (`/mobile/b1-mobile`):

- **Show sign-in prompt on the app home screen** -- I-off ito para itago ang prompt at ang button na **Sign In** sa Home screen. Maaari pa ring mag-sign in ang mga bisita mula sa menu ng app.
- **Sign-in prompt text** -- Palitan ang default na pananalita ng sarili mong mensahe (hanggang 150 character). Iwanang blangko para gamitin ang default. Naka-disable ang kahong ito habang naka-off ang prompt.

I-click ang **Save** para ilapat. Ire-refresh ng pag-save ang naka-cache na mga setting ng app, kaya lilitaw ang pagbabago sa susunod na pag-load ng Home screen.

## Saan Lumilitaw ang mga Tab na Ito

Ang mga tab na kino-configure mo rito ay ipinapakita sa **B1.church PWA** na ini-install ng iyong mga miyembro mula sa anumang pahina sa `https://yourchurchname.b1.church`. Ang mga pagbabagong gagawin mo sa pahinang ito ay makikita sa susunod na pagbukas ng miyembro ng app. (Ang mga tab ay ipinapakita rin ng lumang [B1 Mobile native app](/docs/b1-mobile/) para sa mga miyembrong gumagamit pa nito, ngunit hindi na ito ginagamit at hindi na ina-update.)

## Mga Susunod na Hakbang

- [Church Settings](./church-settings.md) -- I-configure ang impormasyon at branding ng iyong simbahan
- [Mga Tungkulin at Pahintulot](./roles-permissions.md) -- Pamahalaan ang access ng iyong team
