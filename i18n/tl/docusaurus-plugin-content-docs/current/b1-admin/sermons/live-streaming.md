---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Hinahayaan kayo ng pahinang Live Stream Times na i-configure ang iskedyul ng streaming ng inyong simbahan, pamahalaan ang mga oras ng serbisyo, at i-customize ang karanasan ng mga manonood. Mag-set up ng umuulit na lingguhang serbisyo o minsanang kaganapan, i-configure ang mga setting ng chat at video, at kontrolin kung kailan magla-live ang inyong stream.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng pahintulot na **contentApi.streamingServices.edit**. Tingnan ang [Mga Role at Pahintulot](../settings/roles-permissions.md) kung wala kayong access.
- Ihanda ang inyong YouTube Channel ID kung plano ninyong gumamit ng awtomatikong live streaming
- Magdagdag ng kahit isang [sermon](managing-sermons) o permanenteng live URL na gagamiting pinagmulan ng stream

</div>

May dalawang pangunahing tab ang pahina: **Services** para sa pamamahala ng inyong iskedyul ng live stream at **Settings** para sa pag-configure ng inyong streaming page.

## Pamamahala ng mga Serbisyo

### Pagdaragdag ng Serbisyo

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), palawakin ang **Sermons**, at i-click ang **Live Stream Times**.
2. I-click ang button na **Add Service** para gumawa ng bagong naka-iskedyul na serbisyo.
3. Maglagay ng **Service Name** (halimbawa, "Sunday Morning").
4. I-set ang **Service Time** -- piliin ang araw at oras ng pagsisimula ng inyong serbisyo.
5. I-set ang **Recurs Weekly** sa **Yes** para sa regular na lingguhang serbisyo, o **No** para sa minsanang kaganapan.

### Pag-configure ng mga Setting ng Chat at Video

6. Sa ilalim ng **Chat Settings**, itakda kung ilang minuto bago at pagkatapos ng serbisyo dapat naka-enable ang chat. Nagbibigay-daan ito sa mga bisita na magsimulang mag-chat bago magsimula ang serbisyo at magpatuloy pagkatapos.
7. Sa ilalim ng **Video Settings**, itakda kung gaano kaaga sisimulan ang video stream para sa countdown o nilalamang bago ang serbisyo.
8. Piliin sa dropdown kung aling sermon ang ipe-play:
   - **Latest Sermon** -- Awtomatikong ipe-play ang pinakabagong video na idinagdag ninyo.
   - **Current Live Service** -- Ipe-play ang kasalukuyan ninyong live stream mula sa YouTube gamit ang inyong Channel ID.
   - Maaari rin kayong pumili ng anumang partikular na sermon na na-save na ninyo.
9. I-click ang **Save** para i-iskedyul ang inyong serbisyo.

:::info
Awtomatikong mag-a-update ang inyong serbisyo kada linggo kung naka-set ito bilang umuulit. Maaari kayong magdagdag ng kasing dami ng serbisyong kailangan ninyo. Makikita ng mga bisita ang susunod na naka-iskedyul na oras ng serbisyo kapag binisita nila ang inyong streaming page.
:::

## Mga Setting ng Streaming Page

I-click ang tab na **Settings** para i-customize ang mga tab at link na lalabas kasabay ng inyong live stream.

### Pagdaragdag ng mga Tab

1. I-click ang button na **Add** para magdagdag ng bagong tab sa inyong live stream page.
2. Piliin ang pre-designed na tab na **Chat** o magdagdag ng custom na tab na may external URL.
3. Para sa tab na Chat, bigyan lang ito ng pangalan sa kahon na **Tab Text** at tapos na ang setup.
4. Para sa tab na may link, ilagay ang pangalan ng tab, pumili ng icon sa pamamagitan ng pag-click sa icon button, at ilagay ang URL.
5. Lalabas ang inyong mga na-configure na tab sa live streaming page para ma-access ng mga manonood ang karagdagang resource at interactive na mga tampok.

### Pag-preview ng Inyong Stream

I-click ang button na **View Your Stream** para makita nang eksakto kung paano lalabas ang inyong live streaming page sa mga bisita, kasama ang inyong logo, mga oras ng serbisyo, at mga na-configure na tab.

## Pag-set Up ng Inyong YouTube Live Stream

Para ikonekta ang inyong YouTube channel para sa awtomatikong live streaming:

1. Pumunta sa **Sermons** at i-click ang **Add Sermon**, pagkatapos piliin ang **Add Permanent Live URL**.
2. Ang video provider ay naka-default sa **Current YouTube Live Stream**. Ilagay ang inyong **YouTube Channel ID**.
3. Magdagdag ng pamagat at paglalarawan, pagkatapos ay i-click ang **Save**.
4. Sa **Live Stream Times**, gumawa ng serbisyo at piliin ang inyong permanenteng live URL mula sa sermon dropdown.

:::tip
Para mahanap ang inyong YouTube Channel ID, pumunta sa advanced settings ng inyong YouTube channel at kopyahin ang halaga ng Channel ID.
:::

## Pag-customize ng mga Kulay at Logo

Ginagamit ng inyong live stream page ang mga setting ng [Appearance](../website/appearance) ng inyong website:

- Ang **light accent color** na may madilim na teksto ay ginagamit para sa header.
- Ang **dark accent color** na may maliwanag na teksto ay ginagamit para sa sidebar.
- Lalabas sa streaming page ang inyong **Light Background Logo**. Gumamit ng larawang may transparent na background at 4:1 na aspect ratio.

Para baguhin ang mga ito, pumunta sa **Website** at pagkatapos ay **Appearance**, at i-update ang inyong mga setting ng [Color Palette](../website/appearance#color-palette) at [Logo](../website/appearance#logo-and-branding).

## Pagdaragdag ng mga Streaming Host

Para bigyan ang mga miyembro ng team ng access sa host-only na chat kasabay ng pampublikong chat:

1. Sa Jump menu, piliin ang **Settings > Roles**.
2. I-click ang plus button at piliin ang **Add Custom Role**.
3. Pangalanan ang role na "Streaming Host" at i-click ang **Save**.
4. I-click ang bagong role, pagkatapos ay i-click ang **Add** sa seksyong Members para magdagdag ng mga tao.
5. Mag-scroll pababa sa **Edit Permissions**, palawakin ang seksyong **Content**, at lagyan ng check ang **Host Chat**.

Kapag nag-log in ang mga host sa live stream page, may lalabas na pribadong tab na **Host Chat** kasabay ng pampublikong chat para sa usapan ng mga staff lang habang nagbo-broadcast.

:::info
Para sa higit pang detalye tungkol sa paggawa ng mga role at pamamahala ng mga pahintulot, tingnan ang [Mga Role at Pahintulot](../settings/roles-permissions.md).
:::

## Pag-troubleshoot

Kung hindi tama ang pagpapakita ng inyong awtomatikong YouTube live stream kapag ginagamit ang opsyong "Current YouTube Live Stream" kasama ang inyong Channel ID, subukan ang sumusunod:

**Mga Sintomas:**
- Ipinapakita ng live stream embed ang "Video unavailable"
- Naglo-load ang pahina pero walang lumalabas na video
- Gumagana ang mga direktang YouTube embed, pero hindi gumagana ang awtomatikong channel live stream

**Solusyon:**
Tingnan ang inyong YouTube channel para sa mga luma o paparating na naka-iskedyul na live stream at burahin ang mga ito:

1. Pumunta sa inyong YouTube Studio.
2. Mag-navigate sa **Content** at pagkatapos ay **Live**.
3. Hanapin ang anumang lumang naka-iskedyul na live o paparating na naka-iskedyul na stream.
4. Burahin ang mga lumang entry o naka-iskedyul na live stream na ito.
5. Subukan muli ang inyong live stream page.

:::warning
Maaaring ma-block ang awtomatikong channel live stream embed ng YouTube kapag maraming naka-iskedyul o nakaraang live stream entry sa inyong channel. Kapag inalis ang mga ito, nagagawa ng YouTube na tama nang matukoy at maihatid ang inyong kasalukuyang live stream.
:::

**Karagdagang mga kinakailangan:**
- Dapat naka-set sa **Public** ang inyong live stream (hindi Unlisted o Private).
- Dapat pinapayagan ang embedding sa mga setting ng inyong YouTube stream.
- Siguraduhing ginagamit ninyo ang provider na **Current YouTube Live Stream** (gamit ang Channel ID), hindi ang provider na **YouTube** (gamit ang Video ID).

## Mga Susunod na Hakbang

- [Pamamahala ng mga Sermon](managing-sermons) -- Magdagdag ng mga sermon sa inyong library
- [Mga Playlist](playlists) -- Ayusin ang mga sermon sa mga serye
