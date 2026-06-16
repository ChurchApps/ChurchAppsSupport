---
title: "Mga Miyembro ng Grupo"
---

# Mga Miyembro ng Grupo

<div class="article-intro">

Kapag lumikha na ng grupo, ang susunod na hakbang ay ang pagdagdag ng mga miyembro. Mula sa pahina ng detalye ng grupo ay maaari mong hanapin ang mga tao, idagdag sila sa grupo, italagang mga lider, magpadala ng mga mensahe, at i-export ang listahan ng mga miyembro. Ang pamamahala ng pagiging miyembro ng grupo ay mahalaga para sa pag-coordinate ng mga maliit na grupo, komite, at mga klase.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng hindi bababa sa isang grupo na itinakda sa B1 Admin. Tingnan ang [Paglikha ng mga Grupo](creating-groups.md) kung hindi mo pa ito ginawa.
- Ang mga taong nais mong idagdag ay dapat nang magsisimula sa iyong [Mga Tao](../people/adding-people.md) na direktoyo.

</div>

## Pagdagdag ng Mga Miyembro sa isang Grupo

1. Mag-navigate sa **Mga Grupo** na pahina at mag-click sa grupo na nais mong pamahalaan.
2. Mag-click sa **Mga Miyembro** na tab.
3. Sa search box, i-type ang pangalan ng taong nais mong idagdag.
4. Mag-click **Idagdag** sa tabi ng pangalan ng tao sa mga resulta ng paghahanap.
5. Ang tao ay lilitaw na sa listahan ng mga miyembro ng grupo.

:::tip
Iwanan ang search box na walang laman at mag-click **Maghanap** upang mag-browse sa buong iyong direktoyo. Ito ay kapaki-pakinabang kung hindi ka sigurado sa eksaktong pagbabaybay ng pangalan ng isang tao.
:::

## Pagtatalaga ng mga Lider ng Grupo

Ang mga lider ng grupo ay may mga espesyal na pribilehiyo -- maaari nilang baguhin ang [calendar ng grupo](group-calendar.md), pamahalaan ang mga kaganapan, at tumulong sa pag-coordinate ng grupo.

1. Sa listahan ng mga miyembro ng grupo, hanapin ang taong nais mong gawing lider.
2. Mag-click sa **berdeng key icon** sa tabi ng kanilang pangalan.
3. Ang tao ay ngayon na itinalaga bilang lider ng grupo.

Upang alisin ang status ng lider, mag-click sa berdeng key icon muli.

:::info
Anumang miyembro ng grupo ay maaaring tingnan ang calendar ng grupo at mga kaganapan, ngunit tanging ang mga lider lamang ang maaaring magdagdag o magbago ng mga kaganapang pang-kalendaryo.
:::

## Pagpapadala ng Mga Mensahe sa mga Miyembro ng Grupo

Maaari kang makipag-ugnayan sa lahat ng miyembro ng isang grupo nang direkta mula sa B1 Admin:

1. Mula sa pahina ng detalye ng grupo, hanapin ang messaging area.
2. I-type ang iyong mensahe sa text box.
3. Mag-click **Magpadala**.

Ang iyong mensahe ay maipapamahagi sa lahat ng miyembro ng grupo.

## Pagpapadala ng Email sa mga Miyembro ng Grupo

Maaari kang magpadala ng mga naka-format na email sa lahat ng miyembro ng isang grupo:

1. Mula sa pahina ng detalye ng grupo, mag-click sa **icon ng email**.
2. Ang dialog na Magpadala ng Email ay magbubukas, na nagpapakita kung ilang miyembro ang makakatanggap ng email at ilang wala nang email address sa file.
3. Bilang opsyonal na pumili ng **email template** mula sa dropdown, o bumuo ng mensahe mula sa simula. Mag-click **Pamahalaan ang Mga Template** upang lumikha o baguhin ang mga template.
4. Magpasok ng **subject line**. Maaari kang magpasok ng mga merge field sa pamamagat ng pag-click sa field chips: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Bumuo ng **email body** gamit ang HTML editor. Ang parehong mga merge field ay makukuha dito.
6. Mag-click **Magpadala**.
7. Ang isang buod ay nagpapakita kung ilang email ang matagumpay na ipinadala at ilang miyembro ang nalampasan (walang email sa file).

:::tip
Lumikha ng mga reusable na email template para sa mga paulit-ulit na komunikasyon tulad ng linggong update, mga abiso ng kaganapan, o mga ikatlong ng panalangin. Ang mga template ay nakakatipid ng oras at nagsisiguro ng pare-parehong messaging.
:::

## Pag-export ng Data ng Grupo

Upang i-download ang listahan ng mga miyembro ng grupo bilang isang file:

1. Mula sa pahina ng detalye ng grupo, mag-click sa **download icon**.
2. Ang isang CSV file na naglalaman ng impormasyon tungkol sa mga miyembro ng grupo ay ide-download sa iyong computer.

Ito ay kapaki-pakinabang para sa paglikha ng mga printed rosters, pag-import ng data sa ibang mga tool, o pagpapanatili ng mga offline na tala. Para sa mas maraming opsyon sa pag-export, tingnan ang [Pag-export ng Data](../people/exporting-data.md).

## Pagpapadala ng Mga Notipikasyon sa Push sa mga Miyembro ng Grupo

Maaari kang magpadala ng isang push notification nang direkta sa lahat ng miyembro ng grupo na may B1.church app na naka-install sa kanilang device na may push notifications na pinagana.

1. Mula sa pahina ng detalye ng grupo, mag-click sa **bell icon** sa header toolbar (sa tabi ng email at SMS icons).
2. Ang isang dialog ay magbubukas na nagpapakita kung ilang miyembro ng iyong grupo ang may push enabled.
3. Punan ang mga detalye ng notipikasyon:
   - **Pamagat** *(kinakailangan)* -- Isang maikling buod, hanggang 80 character.
   - **Mensahe** *(kinakailangan)* -- Ang katawan ng notipikasyon, hanggang 240 character.
   - **Magbukas ng link o flyer URL** *(opsyonal)* -- Isang relative app path (halimbawa, `/mobile/groups`) o isang buong `https://` URL na binubuksan ng notipikasyon kapag na-tap.
   - **Image URL** *(opsyonal)* -- Isang `https://` URL sa isang imahe na lumalabas sa tabi ng notipikasyon sa mga sinusuportahang device.
4. Ang isang live preview ay nagpapakita kung paano makikita ang notipikasyon sa device.
5. Mag-click **Magpadala ng Notipikasyon**.

:::info
Ang mga push notification ay ipinapadala lamang sa mga miyembro ng grupo na may B1.church PWA na naka-install at hindi na nag-disable ng mga push notification. Ang mga miyembro na walang naka-register na push device o na may push na naka-off ay binilang bilang nalampasan, at ang buod ng pagpadala ay nagpapakita kung ilang ang naaabot versus nalampasan.
:::

:::tip
Pagkatapos magpadala, ang dialog ay nagpapakita kung ilang mga notipikasyon ang matagumpay na naqueued. Kung karamihan ng mga miyembro ay nagpapakita bilang nalampasan, ipaalala sa kanila na bisitahin ang kanilang B1.church site, i-install ito bilang isang home-screen app, at payagan ang mga notipikasyon kapag hiniling.
:::

## Pag-aalis ng mga Miyembro

Upang alisin ang isang tao mula sa isang grupo, hanapin ang kanilang pangalan sa listahan ng mga miyembro at mag-click sa **remove** button sa tabi ng kanilang entry.

:::info
Ang pag-aalis ng isang tao mula sa isang grupo ay hindi nag-delete sa kanila mula sa iyong directory ng simbahan. Sila ay lalabas pa rin sa [Mga Tao](../people/adding-people.md) na seksyon at maaaring muling idagdag sa grupo anumang oras.
:::
