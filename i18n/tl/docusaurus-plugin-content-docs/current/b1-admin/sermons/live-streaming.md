---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Ang pahina ng Live Stream Times ay nagbibigay-daan sa inyo na i-configure ang iskedyul ng streaming ng inyong simbahan, pamahalaan ang mga oras ng serbisyo, at i-customize ang karanasan ng manonood. Mag-set up ng mga paulit-ulit na lingguhang serbisyo o isahang kaganapan, i-configure ang mga setting ng chat at video, at kontrolin kung kailan mag-live ang inyong stream.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **contentApi.streamingServices.edit** na pahintulot. Tingnan ang [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md) kung wala kang access.
- Ihanda ang inyong YouTube Channel ID kung plano ninyong gumamit ng automated live streaming
- Magdagdag ng kahit isang [sermon](managing-sermons) o permanenteng live URL para gamitin bilang inyong stream source

</div>

Ang pahina ay may dalawang pangunahing tab: **Services** para sa pamamahala ng inyong iskedyul ng live stream at **Settings** para sa pag-configure ng inyong streaming page.

## Pamamahala ng mga Serbisyo

### Pagdagdag ng Serbisyo

1. Sa B1 Admin, i-click ang **Sermons** sa kaliwang sidebar, pagkatapos i-click ang **Live Stream Times** tab.
2. I-click ang **Add Service** button para gumawa ng bagong naka-iskedyul na serbisyo.
3. Ilagay ang **Pangalan ng Serbisyo** (halimbawa, "Sunday Morning").
4. Itakda ang **Oras ng Serbisyo** -- piliin ang araw at oras kung kailan magsisimula ang inyong serbisyo.
5. Itakda ang **Recurs Weekly** sa **Yes** para sa mga regular na lingguhang serbisyo, o **No** para sa isahang kaganapan.

### Pag-configure ng mga Setting ng Chat at Video

6. Sa ilalim ng **Chat Settings**, itakda kung ilang minuto bago at pagkatapos ng serbisyo ang dapat i-enable ang chat. Nagbibigay-daan ito sa mga bisita na magsimulang mag-chat bago magsimula ang serbisyo at magpatuloy pagkatapos.
7. Sa ilalim ng **Video Settings**, itakda kung gaano kaaga magsisimula ang video stream para sa countdown o pre-service content.
8. Piliin kung aling sermon ang ipe-play mula sa dropdown:
   - **Latest Sermon** -- Awtomatikong pine-play ang inyong pinakabagong idinagdag na video.
   - **Current Live Service** -- Pine-play ang inyong kasalukuyang live stream mula sa YouTube gamit ang inyong Channel ID.
   - Maaari rin ninyong piliin ang anumang tiyak na sermon na nai-save na ninyo.
9. I-click ang **Save** para i-schedule ang inyong serbisyo.

:::info
Awtomatikong mag-a-update ang inyong serbisyo bawat linggo kung nakatakda bilang paulit-ulit. Maaari kayong magdagdag ng maraming serbisyo hangga't kailangan. Makikita ng mga bisita ang susunod na naka-iskedyul na oras ng serbisyo kapag binisita nila ang inyong streaming page.
:::

## Mga Setting ng Streaming Page

I-click ang **Settings** tab para i-customize ang mga tab at link na lumalabas kasama ng inyong live stream.

### Pagdagdag ng mga Tab

1. I-click ang **Add** button para magdagdag ng bagong tab sa inyong live stream page.
2. Pumili mula sa mga pre-designed na tab (**Chat** o **Prayer**) o magdagdag ng custom na tab na may external URL.
3. Para sa mga pre-designed na tab, bigyan lang ito ng pangalan sa **Tab Text** box at kumpleto na ang setup.
4. Para sa linked tab, ilagay ang pangalan ng tab, pumili ng icon sa pamamagitan ng pag-click sa icon button, at ilagay ang URL.
5. Ang inyong mga na-configure na tab ay lalabas sa live streaming page para ma-access ng mga manonood ang mga karagdagang resource at interactive feature.

### Pag-preview ng Inyong Stream

I-click ang **View Your Stream** button para makita kung paano eksaktong ang hitsura ng inyong live streaming page sa mga bisita, kasama ang inyong logo, mga oras ng serbisyo, at mga na-configure na tab.

## Pag-set Up ng Inyong YouTube Live Stream

Para ikonekta ang inyong YouTube channel para sa awtomatikong live streaming:

1. Pumunta sa **Sermons** at i-click ang **Add Sermon**, pagkatapos piliin ang **Add Permanent Live URL**.
2. Ang video provider ay naka-default sa **Current YouTube Live Stream**. Ilagay ang inyong **YouTube Channel ID**.
3. Magdagdag ng pamagat at paglalarawan, pagkatapos i-click ang **Save**.
4. Sa **Live Stream Times**, gumawa ng serbisyo at piliin ang inyong permanenteng live URL mula sa sermon dropdown.

:::tip
Para mahanap ang inyong YouTube Channel ID, pumunta sa advanced settings ng inyong YouTube channel at kopyahin ang Channel ID value.
:::

## Pag-customize ng mga Kulay at Logo

Ginagamit ng inyong live stream page ang mga setting ng [Hitsura](../website/appearance) ng inyong website:

- Ang **maliwanag na accent color** na may madilim na teksto ay ginagamit para sa header.
- Ang **madilim na accent color** na may maliwanag na teksto ay ginagamit para sa sidebar.
- Ang inyong **Light Background Logo** ay lumalabas sa streaming page. Gumamit ng larawang may transparent na background at 4:1 aspect ratio.

Para baguhin ang mga ito, pumunta sa **Website** pagkatapos **Appearance** at i-update ang inyong mga setting ng [Color Palette](../website/appearance#color-palette) at [Logo](../website/appearance#logo-and-branding).

## Pagdagdag ng mga Streaming Host

Para bigyan ang mga miyembro ng koponan ng mga kakayahan bilang host (pag-moderate ng chat, pagtugon sa mga kahilingan sa panalangin):

1. Pumunta sa **Settings** sa kaliwang sidebar at i-click ang **Roles**.
2. I-click ang plus button at piliin ang **Add Custom Role**.
3. Pangalanan ang tungkulin na "Streaming Host" at i-click ang **Save**.
4. I-click ang bagong tungkulin, pagkatapos i-click ang **Add** sa seksyon ng Members para magdagdag ng mga tao.
5. Mag-scroll pababa sa **Edit Permissions**, i-expand ang seksyon ng **Content**, at i-check ang **Host Chat**.

Kapag nag-log in ang mga host sa live stream page, magkakaroon sila ng mga espesyal na kakayahan kabilang ang pag-moderate ng chat at pamamahala ng mga kahilingan sa panalangin.

:::info
Para sa karagdagang detalye sa paggawa ng mga tungkulin at pamamahala ng mga pahintulot, tingnan ang [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md).
:::

## Pag-troubleshoot

Kung ang inyong automated YouTube live stream ay hindi tamang lumalabas kapag ginagamit ang opsyong "Current YouTube Live Stream" na may inyong Channel ID, subukan ang sumusunod:

**Mga Sintomas:**
- Ang live stream embed ay nagpapakita ng "Video unavailable"
- Naglo-load ang pahina pero walang video na lumalabas
- Gumagana ang mga direktang YouTube embed, pero hindi ang automated channel live stream

**Solusyon:**
Suriin ang inyong YouTube channel para sa mga luma o paparating na naka-iskedyul na live stream at burahin ang mga ito:

1. Pumunta sa inyong YouTube Studio.
2. Pumunta sa **Content** pagkatapos **Live**.
3. Hanapin ang anumang mga lumang naka-iskedyul na live o paparating na naka-iskedyul na stream.
4. Burahin ang mga lumang ito o naka-iskedyul na live stream entry.
5. Subukan muli ang inyong live stream page.

:::warning
Ang automated channel live stream embed ng YouTube ay maaaring ma-block kapag may maraming naka-iskedyul o nakaraang live stream entry sa inyong channel. Ang pag-alis ng mga ito ay nagbibigay-daan sa YouTube na maayos na matukoy at i-serve ang inyong kasalukuyang live stream.
:::

**Mga karagdagang kinakailangan:**
- Ang inyong live stream ay dapat nakatakda sa **Public** (hindi Unlisted o Private).
- Dapat pinapayagan ang embedding sa inyong YouTube stream settings.
- Siguraduhing ginagamit ninyo ang **Current YouTube Live Stream** provider (na may Channel ID), hindi ang **YouTube** provider (na may Video ID).

## Mga Susunod na Hakbang

- [Pamamahala ng mga Sermon](managing-sermons) -- Magdagdag ng mga sermon sa inyong library
- [Mga Playlist](playlists) -- Ayusin ang mga sermon sa mga serye
