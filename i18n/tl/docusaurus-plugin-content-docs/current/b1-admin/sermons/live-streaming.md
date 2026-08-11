---
title: "Live Streaming"
---

# Live Streaming

<div class="article-intro">

Ang Live Stream Times page ay nagbibigay-daan sa iyo na mag-configure ng schedule ng streaming ng iyong simbahan, pamahalaan ang service time, at i-customize ang karanasan ng viewer. I-set up ang umuulit na weekly service o one-time event, i-configure ang chat at video setting, at kontrolin kung kailan mapupunta live ang iyong stream.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **contentApi.streamingServices.edit** permission. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung walang access.
- Handa ang iyong YouTube Channel ID kung plano mong gumamit ng automated live streaming
- Magdagdag ng hindi bababa sa isa na [sermon](managing-sermons) o permanent live URL upang gamitin bilang stream source

</div>

Ang page ay may dalawang pangunahing tab: **Services** para sa pagpapahalaga ng iyong live stream schedule at **Settings** para sa pag-configure ng iyong streaming page.

## Pagpapahalaga ng Serbisyo

### Pagdadagdag ng Serbisyo

1. Sa B1 Admin, buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow) at piliin ang **Sermons**, pagkatapos i-click ang **Live Stream Times** tab.
2. I-click ang **Add Service** button upang lumikha ng bagong scheduled service.
3. Ipasok ang **Service Name** (halimbawa, "Sunday Morning").
4. Itakda ang **Service Time** -- piliin ang araw at oras na nagsisimula ang iyong serbisyo.
5. Itakda ang **Recurs Weekly** sa **Yes** para sa regular na weekly service, o **No** para sa one-time event.

### Pag-configure ng Chat at Video Setting

6. Sa ilalim ng **Chat Setting**, itakda kung ilang minuto bago at pagkatapos ng serbisyo ang chat ay dapat na i-enable. Ito ay nagbibigay-daan sa bisita na magsimulang makipag-usap bago magsimula ang serbisyo at magpatuloy pagkatapos.
7. Sa ilalim ng **Video Setting**, itakda kung gaano ka-maaga ang magsisimula ng video stream para sa countdown o pre-service content.
8. Piliin kung aling sermon ang maglalaro mula sa dropdown:
   - **Latest Sermon** -- Awtomatikong maglalaro ng iyong pinakabagong na-add na video.
   - **Current Live Service** -- Maglalaro ng iyong kasalukuyang live stream mula sa YouTube gamit ang iyong Channel ID.
   - Maaari mo ring pumili ng anumang specific na sermon na nakatipid na mo.
9. I-click ang **Save** upang i-schedule ang iyong serbisyo.

:::info
Ang iyong serbisyo ay awtomatikong magiging update bawat linggo kung itakda na maging umuulit. Maaari kang magdagdag ng kasing daming serbisyo tulad ng kailangan. Ang mga bisita ay makikita ang susunod na scheduled service time kapag bumisita sila sa iyong streaming page.
:::

## Streaming Page Setting

I-click ang **Settings** tab upang i-customize ang tab at link na lumalabas sa tabi ng iyong live stream.

### Pagdadagdag ng Tab

1. I-click ang **Add** button upang magdagdag ng bagong tab sa iyong live stream page.
2. Pumili ng **Chat** pre-designed tab o magdagdag ng custom tab na may external URL.
3. Para sa Chat tab, bigyan lamang ng pangalan sa **Tab Text** box at kumpleto na ang pag-setup.
4. Para sa linked tab, ipasok ang tab name, pumili ng icon sa pamamagitan ng pag-click ng icon button, at ipasok ang URL.
5. Ang iyong configured na tab ay lalabas sa live streaming page para sa viewer na maabot ang karagdagang resource at interactive feature.

### Pag-preview ng Iyong Stream

I-click ang **View Your Stream** button upang makita kung paano eksaktong mukhang ang iyong live streaming page sa bisita, kasama ang iyong logo, service time, at configured na tab.

## Pag-set Up ng Iyong YouTube Live Stream

Upang ikonekta ang iyong YouTube channel para sa automatic live streaming:

1. Pumunta sa **Sermons** at i-click ang **Add Sermon**, pagkatapos piliin ang **Add Permanent Live URL**.
2. Ang video provider ay naka-default sa **Current YouTube Live Stream**. Ipasok ang iyong **YouTube Channel ID**.
3. Magdagdag ng title at paglalarawan, pagkatapos i-click ang **Save**.
4. Sa **Live Stream Times**, lumikha ng service at piliin ang iyong permanent live URL mula sa sermon dropdown.

:::tip
Upang hanapin ang iyong YouTube Channel ID, pumunta sa iyong YouTube channel's advanced setting at gawin ang Channel ID value.
:::

## Pag-customize ng Kulay at Logo

Ang iyong live stream page ay gumagamit ng website mo [Appearance](../website/appearance) setting:

- Ang **light accent color** na may dark text ay ginagamit para sa header.
- Ang **dark accent color** na may light text ay ginagamit para sa sidebar.
- Ang iyong **Light Background Logo** ay lumalabas sa streaming page. Gumamit ng larawan na may transparent background at 4:1 aspect ratio.

Upang baguhin ang mga ito, pumunta sa **Website** pagkatapos **Appearance** at i-update ang iyong [Color Palette](../website/appearance#color-palette) at [Logo](../website/appearance#logo-and-branding) setting.

## Pagdadagdag ng Streaming Host

Upang magbigay sa team member ng access sa host-only chat sa tabi ng public chat:

1. Buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow), pumili ng **Settings**, at i-click ang **Roles**.
2. I-click ang plus button at pumili ng **Add Custom Role**.
3. Bigyan ng pangalan ang role na "Streaming Host" at i-click ang **Save**.
4. I-click ang bagong role, pagkatapos i-click ang **Add** sa Members section upang magdagdag ng tao.
5. Mag-scroll pababa sa **Edit Permission**, palawakin ang **Content** section, at i-check ang **Host Chat**.

Kapag nag-log in ang host sa live stream page, ang private na **Host Chat** tab ay lilitaw sa tabi ng public chat para sa staff-only conversation sa panahon ng broadcast.

:::info
Para sa higit pang detalye sa paglikha ng role at pamamalaan ng permission, tingnan ang [Roles & Permissions](../settings/roles-permissions.md).
:::

## Pag-solve ng Problema

Kung ang iyong automated YouTube live stream ay hindi nagpapakita nang tama kapag gumagamit ng "Current YouTube Live Stream" option na may iyong Channel ID, subukan ang mga sumusunod:

**Symptom:**
- Ang live stream embed ay nagpapakita ng "Video unavailable"
- Ang page ay nag-load ngunit walang video na lumalabas
- Ang direktang YouTube embed ay gumagana, ngunit ang automated channel live stream ay hindi

**Solusyon**
Suriin ang iyong YouTube channel para sa lumang o paparating na scheduled live stream at alisin ang mga ito:

1. Pumunta sa iyong YouTube Studio.
2. Mag-navigate sa **Content** pagkatapos **Live**.
3. Tingnan ang anumang lumang scheduled live o paparating na scheduled stream.
4. Alisin ang mga lumang o scheduled live stream entry na ito.
5. Subukan muli ang iyong live stream page.

:::warning
Ang YouTube's automated channel live stream embed ay maaaring mahabol kapag may maraming scheduled o nakaraang live stream entry sa iyong channel. Ang pag-aalis ng mga ito ay nagbibigay-daan sa YouTube na maayos na tukuyin at maglingkod ang iyong kasalukuyang live stream.
:::

**Karagdagang pangangailangan:**
- Ang iyong live stream ay dapat na itakda sa **Public** (hindi Unlisted o Private).
- Ang pag-embed ay dapat na pinapayagan sa iyong YouTube stream setting.
- Siguraduhin na gumagamit ka ng **Current YouTube Live Stream** provider (na may Channel ID), hindi ng **YouTube** provider (na may Video ID).

## Susunod na Hakbang

- [Managing Sermons](managing-sermons) -- Magdagdag ng sermon sa iyong library
- [Playlists](playlists) -- Ayusin ang sermon sa series
