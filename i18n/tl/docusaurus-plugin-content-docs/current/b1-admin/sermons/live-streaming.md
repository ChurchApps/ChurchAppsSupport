---
title: "Live Stream Times at Setup sa B1 Admin"
sidebar_label: "Live Streaming"
description: "Mag-iskedyul ng lingguhan o one-time na live stream service, itakda ang timing ng chat at maagang video, ikonekta ang YouTube channel, at i-troubleshoot ang mga embed sa B1 Admin."
---

# Live Streaming

<div class="article-intro">

Hinahayaan ka ng pahinang Live Stream Times na i-configure ang iskedyul ng streaming ng iyong simbahan, pamahalaan ang mga oras ng serbisyo, at i-customize ang karanasan ng manonood. Mag-set up ng paulit-ulit na lingguhang serbisyo o one-time na event, i-configure ang chat at video settings, at kontrolin kung kailan magla-live ang iyong stream.

</div>

## Training Video {#training-video}

<YouTube id="tpEY-sEYW6A" title="Pag-set Up ng Live Streaming sa B1" next="Pag-customize ng Member App ng Iyong Simbahan sa B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Services** sa seksyong **Content** ng iyong role. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung wala kang access.
- Ihanda ang iyong YouTube Channel ID kung plano mong gumamit ng automated live streaming
- Magdagdag ng kahit isang [sermon](./managing-sermons.md) o permanenteng live URL para magamit bilang source ng stream

</div>

Pinamamahalaan ang live streaming mula sa dalawang pahina sa seksyong **Sermons** ng Jump menu: ang **Live Stream Times** para sa pamamahala ng iskedyul ng live stream at ang **Settings** para sa pag-configure ng mga tab sa iyong streaming page.

## Pamamahala ng mga Serbisyo {#managing-services}

### Pagdaragdag ng Serbisyo {#adding-a-service}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Sermons**, at i-click ang **Live Stream Times**.
2. I-click ang button na **Add Service** sa itaas ng pahina para gumawa ng bagong nakatakdang serbisyo. Nakalista sa table ang mga umiiral na serbisyo na nagpapakita ng pangalan ng bawat serbisyo (may badge na **Weekly** ang mga paulit-ulit), oras, provider, at tagal; i-hover ang isang row at i-click ang edit icon para baguhin ito.
3. Ilagay ang **Service Name** (halimbawa, "Sunday Morning"). Ang bagong serbisyo ay nagsisimula bilang "Sunday Morning".
4. Itakda ang **Service Time** -- piliin ang petsa at oras ng pagsisimula ng serbisyo. Ang bagong serbisyo ay nagsisimula sa 9:00 AM sa susunod na Linggo.
5. Itakda ang **Recurs Weekly** sa **Yes** (**Weekly**) para sa regular na lingguhang serbisyo, o **No** (**One-time**) para sa isang one-time na event.

### Pag-configure ng Chat at Video Settings {#configuring-chat-and-video-settings}

6. Sa ilalim ng **Chat Settings**, itakda ang **Enable Chat - Minutes Before** at **Enable Chat - Minutes After** -- ilang minuto bago at pagkatapos ng serbisyo dapat paganahin ang chat (tig-10 para sa bagong serbisyo). Pinapayagan nito ang mga bisita na makapag-chat bago magsimula ang serbisyo at magpatuloy pagkatapos. Ipinapakita ng oras sa tabi ng bawat kahon kung kailan magbubukas at magsasara ang chat.
7. Sa ilalim ng **Video Settings**, itakda ang **Start Video Early** -- ilang minuto nang mas maaga sisimulan ang video stream para sa countdown o content bago ang serbisyo. Magbubukas ang chat nang ganoon karaming minuto *bago* magsimula ang maagang video, kaya kasama sa oras na ipinapakita sa tabi ng setting ng chat na minutes-before ang dalawang numerong ito. Halimbawa, ang serbisyong 10:00 na may 15 minuto ng chat bago at 5 minutong maagang simula ay magbubukas ng chat sa 9:40.
8. Piliin kung ano ang ipe-play mula sa dropdown na **Sermon**:
   - **Latest Sermon** (**Auto**) -- Awtomatikong ipe-play ang pinakabagong idinagdag mong video.
   - Ang iyong [mga permanenteng live URL](#setting-up-your-youtube-live-stream), nakalista sa sumunod -- bawat isa ay nagpe-play ng kasalukuyang live stream ng iyong channel mula sa YouTube gamit ang iyong Channel ID. Ang bago ay pinangalanang **Current Live Service** maliban kung palitan mo ang pangalan.
   - Sa ibaba nila, anumang partikular na sermon na nai-save mo na.
9. I-click ang **Save** para iiskedyul ang iyong serbisyo, o **Cancel** para isara ang form.

Para tanggalin ang serbisyo, i-edit ito, i-click ang **Delete**, at kumpirmahin.

:::info
Awtomatikong mag-a-update ang iyong serbisyo tuwing linggo kung nakatakdang paulit-ulit. Nananatili ito sa parehong lokal na oras kapag nagsimula o natapos ang daylight saving time. Maaari kang magdagdag ng kasing-dami ng serbisyo na kailangan mo. Makikita ng mga bisita ang susunod na nakatakdang oras ng serbisyo kapag binisita nila ang iyong streaming page.
:::

## Streaming Page Settings {#streaming-page-settings}

Para i-customize ang mga tab at link na lumalabas sa tabi ng iyong live stream, buksan ang Jump menu, palawakin ang **Sermons**, at i-click ang **Settings**. Ipinapakita ng pahinang **Stream Settings** ang listahan ng iyong **Content Tabs**, ayon sa pagkakasunod-sunod na nakikita ng mga manonood. Ang mga external link tab ay nagbubukas ng kanilang link sa bagong browser tab kapag na-click.

### Pagdaragdag ng mga Tab {#adding-tabs}

1. I-click ang button na **Add** para magdagdag ng bagong tab sa iyong live stream page. Magbubukas ang dialog na **Create New Tab**.
2. Ilagay ang pangalan ng tab sa kahon na **Tab Text**, at pumili ng **Icon** sa pamamagitan ng pag-click sa icon button.
3. Pumili ng **Link Type**: **External URL** para sa custom na link (ang default), o isa sa mga built-in na tab na **Chat** o **Prayer**.
4. Para sa External URL tab, ilagay ang address sa kahon na **External URL**. Ang mga Chat at Prayer tab ay hindi na nangangailangan ng iba pa.
5. I-click ang **Save Tab**. Idinaragdag ang mga bagong tab sa dulo ng listahan.

Lalabas ang mga naka-configure mong tab sa live streaming page para ma-access ng mga manonood ang karagdagang resources at mga interactive na feature.

### Pag-edit, Pagsasaayos ng Pagkakasunod-sunod, at Pagtanggal ng mga Tab {#editing-reordering-and-deleting-tabs}

I-hover ang isang tab at gamitin ang mga button nito:

- **Move up** at **Move down** na arrow -- Baguhin ang pagkakasunod-sunod ng mga tab.
- **Edit** (lapis) -- Baguhin ang text, icon, uri, o URL ng tab, pagkatapos i-click ang **Save Tab**. Para alisin ang tab, i-click ang **Delete** at kumpirmahin sa dialog na **Delete Tab**.

### Pag-preview ng Iyong Stream {#previewing-your-stream}

Sa pahinang **Live Stream Times**, i-click ang **View Your Stream** sa itaas ng pahina para makita kung paano eksaktong magmumukha ang iyong live streaming page sa mga bisita, kabilang ang iyong logo, mga oras ng serbisyo, at mga naka-configure na tab.

## Pag-set Up ng Iyong YouTube Live Stream {#setting-up-your-youtube-live-stream}

Para ikonekta ang iyong YouTube channel para sa automatic live streaming:

1. Pumunta sa **Sermons** at i-click ang **Add Sermon**, pagkatapos piliin ang **Add Permanent Live URL**. Magbubukas ang form na **Edit Permanent Live Url**.
2. Ang **Video Provider** ay naka-default sa **Current YouTube Live Stream**. Ilagay ang iyong **YouTube Channel ID** (hindi ang URL ng channel mo; i-click ang **Get Your Channel Id** para sa tulong).
3. Ang pamagat ay nagsisimula bilang **Current Live Service**. Palitan ito kung gusto mo, magdagdag ng paglalarawan, pagkatapos i-click ang **Save**. Ang mga permanenteng live URL ay walang playlist o petsa ng publish.
4. Sa **Live Stream Times**, gumawa ng serbisyo at piliin ang iyong permanenteng live URL mula sa dropdown na **Sermon**.

:::tip
Para mahanap ang iyong YouTube Channel ID, pumunta sa advanced settings ng iyong YouTube channel at kopyahin ang value ng Channel ID.
:::

## Pag-customize ng Kulay at Logo {#customizing-colors-and-logo}

Ginagamit ng iyong live stream page ang mga setting ng [Appearance](../website/appearance.md) ng iyong website:

- Ang **light accent color** na may dark na teksto ang ginagamit sa header.
- Ang **dark accent color** na may light na teksto ang ginagamit sa sidebar.
- Lumalabas ang iyong **Light Background Logo** sa streaming page. Gumamit ng larawang may transparent na background at 4:1 na aspect ratio.

Para baguhin ang mga ito, pumunta sa **Website** at pagkatapos sa **Appearance**, at i-update ang iyong mga setting ng [Color Palette](../website/appearance.md#color-palette) at [Logo](../website/appearance.md#logo-and-branding).

## Pagdaragdag ng Streaming Hosts {#adding-streaming-hosts}

Para bigyan ng access ang mga miyembro ng team sa host-only chat kasabay ng public chat:

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang **Add role** at piliin ang **Add Custom Role**.
3. Pangalanan ang role na "Streaming Host" at i-click ang **Save**.
4. I-click ang bagong role, pagkatapos maghanap ng mga tao sa member list nito at idagdag sila (tingnan ang [Adding Users to a Role](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Mag-scroll pababa sa **Edit Permissions**, palawakin ang seksyong **Content**, at lagyan ng check ang **Host Chat**.

Kapag nag-log in ang mga host sa live stream page, lalabas ang pribadong tab na **Host Chat** sa tabi ng public chat para sa usapan ng staff lamang habang nagbo-broadcast.

:::info
Para sa higit pang detalye tungkol sa paggawa ng mga role at pamamahala ng permiso, tingnan ang [Roles & Permissions](../settings/roles-permissions.md).
:::

## Troubleshooting {#troubleshooting}

Kung hindi maayos na lumalabas ang iyong automated YouTube live stream kapag ginamit mo ang opsyong "Current YouTube Live Stream" kasama ang iyong Channel ID, subukan ang mga sumusunod:

**Mga sintomas:**
- Nagpapakita ang live stream embed ng "Video unavailable"
- Naglo-load ang pahina pero walang lumalabas na video
- Gumagana ang direktang YouTube embed, pero hindi gumagana ang automated na live stream ng channel

**Solusyon:**
Suriin ang iyong YouTube channel para sa mga luma o paparating na naka-iskedyul na live stream at burahin ang mga ito:

1. Pumunta sa iyong YouTube Studio.
2. Pumunta sa **Content** at pagkatapos sa **Live**.
3. Hanapin ang anumang lumang naka-iskedyul na live o paparating na naka-iskedyul na stream.
4. Burahin ang mga lumang live o naka-iskedyul na live stream entry na ito.
5. Subukan ulit ang iyong live stream page.

:::warning
Maaaring ma-block ang automated na channel live stream embed ng YouTube kapag maraming naka-iskedyul o nakaraang live stream entry sa iyong channel. Ang pagtanggal sa mga ito ay nagbibigay-daan sa YouTube na maayos na matukoy at maipakita ang iyong kasalukuyang live stream.
:::

**Karagdagang kinakailangan:**
- Dapat naka-set sa **Public** ang iyong live stream (hindi Unlisted o Private).
- Dapat pinapayagan ang embedding sa iyong YouTube stream settings.
- Siguraduhing ginagamit mo ang provider na **Current YouTube Live Stream** (kasama ang Channel ID), hindi ang provider na **YouTube** (kasama ang Video ID).

## Mga Susunod na Hakbang {#next-steps}

- [Managing Sermons](./managing-sermons.md) -- Magdagdag ng mga sermon sa iyong library
- [Playlists](./playlists.md) -- Ayusin ang mga sermon sa mga series
