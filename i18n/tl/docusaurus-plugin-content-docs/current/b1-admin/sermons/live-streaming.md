---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Hinahayaan ka ng pahinang Live Stream Times na i-configure ang iskedyul ng streaming ng iyong simbahan, pamahalaan ang mga oras ng serbisyo, at i-customize ang karanasan ng manonood. Mag-set up ng paulit-ulit na lingguhang serbisyo o one-time na event, i-configure ang chat at video settings, at kontrolin kung kailan magiging live ang iyong stream.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **contentApi.streamingServices.edit**. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung wala kang access.
- Ihanda ang iyong YouTube Channel ID kung plano mong gumamit ng awtomatikong live streaming
- Magdagdag ng kahit isang [sermon](managing-sermons) o permanenteng live URL para gamiting pinagmumulan ng iyong stream

</div>

Pinamamahalaan ang live streaming mula sa dalawang pahina sa seksyong **Sermons** ng Jump menu: **Live Stream Times** para sa pamamahala ng iskedyul ng iyong live stream, at **Settings** para sa pag-configure ng mga tab sa iyong streaming page.

## Pamamahala ng Mga Serbisyo

### Pagdaragdag ng Serbisyo

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Sermons**, at i-click ang **Live Stream Times**.
2. I-click ang butones na **Add Service** sa itaas ng pahina para gumawa ng bagong nakaiskedyul na serbisyo. Nakalista ang mga umiiral na serbisyo sa isang table na nagpapakita ng pangalan, oras, provider, at tagal ng bawat serbisyo; i-click ang edit icon sa isang row para baguhin ito.
3. Ilagay ang **Service Name** (halimbawa, "Sunday Morning").
4. Itakda ang **Service Time** -- piliin ang araw at oras kung kailan magsisimula ang serbisyo.
5. Itakda ang **Recurs Weekly** sa **Yes** para sa regular na lingguhang serbisyo, o **No** para sa one-time na event.

### Pag-configure ng Chat at Video Settings

6. Sa ilalim ng **Chat Settings**, itakda kung ilang minuto bago at pagkatapos ng serbisyo dapat paganahin ang chat. Pinapayagan nito ang mga bisitang makapagsimulang mag-chat bago magsimula ang serbisyo at magpatuloy pagkatapos nito.
7. Sa ilalim ng **Video Settings**, itakda kung gaano kaaga magsisimula ang video stream para sa countdown o nilalamang bago ang serbisyo. Nagbubukas ang chat ng ganoon karaming minuto *bago* magsimula ang maagang video, kaya binibilang ng oras na nakalagay sa tabi ng setting ng chat na minuto-bago ang parehong numero. Halimbawa, para sa serbisyong 10:00 na may 15 minutong chat bago at 5-minutong maagang simula, magbubukas ang chat ng 9:40.
8. Piliin kung aling sermon ang ipe-play mula sa dropdown:
   - **Latest Sermon** -- Awtomatikong ipe-play ang pinakabagong idinagdag mong video.
   - **Current Live Service** -- Ipe-play ang kasalukuyan mong live stream mula sa YouTube gamit ang iyong Channel ID.
   - Maaari ka ring pumili ng anumang partikular na sermon na na-save mo na.
9. I-click ang **Save** para i-iskedyul ang iyong serbisyo.

:::info
Awtomatikong mag-a-update ang iyong serbisyo kada linggo kung nakatakdang paulit-ulit. Nananatili ito sa parehong lokal na oras kapag nagsimula o natapos ang daylight saving time. Maaari kang magdagdag ng kasing dami ng serbisyong kailangan mo. Makikita ng mga manonood ang susunod na nakaiskedyul na oras ng serbisyo kapag binisita nila ang iyong streaming page.
:::

## Mga Setting ng Streaming Page

Para i-customize ang mga tab at link na lalabas sa tabi ng iyong live stream, buksan ang Jump menu, palawakin ang **Sermons**, at i-click ang **Settings**. Ipinapakita ng pahinang **Stream Settings** ang iyong listahan ng **Content Tabs**.

### Pagdaragdag ng Tab

1. I-click ang butones na **Add** para magdagdag ng bagong tab sa iyong live stream page.
2. Pumili ng **Link Type**: **External URL** para sa sariling link, o isa sa mga nakadisenyong tab na **Chat** o **Prayer**.
3. Para sa tab na Chat, bigyan lang ito ng pangalan sa kahon na **Tab Text** at kumpleto na ang setup.
4. Para sa naka-link na tab, ilagay ang pangalan ng tab, pumili ng icon sa pamamagitan ng pag-click sa icon button, at ilagay ang URL.
5. Lilitaw ang mga naka-configure mong tab sa live streaming page para ma-access ng mga manonood ang karagdagang resource at mga interactive na feature.

### Pag-preview ng Iyong Stream

Sa pahinang **Live Stream Times**, i-click ang **View Your Stream** sa itaas ng pahina para makita nang eksakto kung paano lilitaw sa mga bisita ang iyong live streaming page, kabilang ang iyong logo, oras ng serbisyo, at mga naka-configure na tab.

## Pag-set Up ng Iyong YouTube Live Stream

Para ikonekta ang iyong YouTube channel para sa awtomatikong live streaming:

1. Pumunta sa **Sermons** at i-click ang **Add Sermon**, pagkatapos piliin ang **Add Permanent Live URL**.
2. Ang video provider ay nakatakda bilang default sa **Current YouTube Live Stream**. Ilagay ang iyong **YouTube Channel ID**.
3. Magdagdag ng pamagat at deskripsyon, pagkatapos i-click ang **Save**.
4. Sa **Live Stream Times**, gumawa ng serbisyo at piliin ang iyong permanenteng live URL mula sa sermon dropdown.

:::tip
Para mahanap ang iyong YouTube Channel ID, pumunta sa advanced settings ng iyong YouTube channel at kopyahin ang halaga ng Channel ID.
:::

## Pag-customize ng Kulay at Logo

Ginagamit ng iyong live stream page ang mga setting ng [Appearance](../website/appearance) ng iyong website:

- Ang **light accent color** na may madilim na teksto ang ginagamit para sa header.
- Ang **dark accent color** na may maliwanag na teksto ang ginagamit para sa sidebar.
- Lumalabas ang iyong **Light Background Logo** sa streaming page. Gumamit ng larawang may transparent na background at 4:1 na aspect ratio.

Para baguhin ang mga ito, pumunta sa **Website** at pagkatapos **Appearance**, at i-update ang iyong mga setting ng [Color Palette](../website/appearance#color-palette) at [Logo](../website/appearance#logo-and-branding).

## Pagdaragdag ng Mga Streaming Host

Para mabigyan ang mga miyembro ng team ng access sa host-only na chat kasama ng pampublikong chat:

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang plus button at piliin ang **Add Custom Role**.
3. Pangalanan ang role na "Streaming Host" at i-click ang **Save**.
4. I-click ang bagong role, pagkatapos i-click ang **Add** sa seksyong Members para magdagdag ng mga tao.
5. Mag-scroll pababa sa **Edit Permissions**, palawakin ang seksyong **Content**, at lagyan ng check ang **Host Chat**.

Kapag nag-log in ang mga host sa live stream page, lilitaw ang pribadong tab na **Host Chat** sa tabi ng pampublikong chat para sa usapang para sa staff lang habang nagbo-broadcast.

:::info
Para sa higit pang detalye sa paggawa ng mga role at pamamahala ng mga permiso, tingnan ang [Roles & Permissions](../settings/roles-permissions.md).
:::

## Pag-troubleshoot

Kung hindi maayos na lumalabas ang iyong awtomatikong YouTube live stream kapag ginagamit ang opsyong "Current YouTube Live Stream" kasama ang iyong Channel ID, subukan ang mga sumusunod:

**Mga sintomas:**
- Ang live stream embed ay nagpapakita ng "Video unavailable"
- Naglo-load ang pahina pero walang lumalabas na video
- Gumagana ang direktang YouTube embed, pero hindi gumagana ang awtomatikong live stream ng channel

**Solusyon:**
Suriin ang iyong YouTube channel para sa mga luma o paparating na nakaiskedyul na live stream at burahin ang mga ito:

1. Pumunta sa iyong YouTube Studio.
2. Pumunta sa **Content** at pagkatapos **Live**.
3. Hanapin ang anumang lumang nakaiskedyul na live o paparating na nakaiskedyul na stream.
4. Burahin ang mga lumang live stream entry o nakaiskedyul na ito.
5. Subukan muli ang iyong live stream page.

:::warning
Maaaring ma-block ang awtomatikong embed ng live stream ng channel ng YouTube kapag maraming nakaiskedyul o nakaraang live stream entry sa iyong channel. Ang pag-alis sa mga ito ay nagbibigay-daan sa YouTube na tama nang matukoy at maipakita ang kasalukuyan mong live stream.
:::

**Karagdagang kinakailangan:**
- Dapat nakatakda sa **Public** ang iyong live stream (hindi Unlisted o Private).
- Dapat pinapayagan ang embedding sa iyong YouTube stream settings.
- Siguraduhing ginagamit mo ang provider na **Current YouTube Live Stream** (na may Channel ID), hindi ang provider na **YouTube** (na may Video ID).

## Mga Susunod na Hakbang

- [Managing Sermons](managing-sermons) -- Magdagdag ng mga sermon sa iyong library
- [Playlists](playlists) -- Ayusin ang mga sermon sa mga serye
