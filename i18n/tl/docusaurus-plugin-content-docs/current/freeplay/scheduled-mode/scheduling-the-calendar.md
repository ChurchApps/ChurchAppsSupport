---
title: "Pag-iskedyul ng Calendar"
---

# Pag-iskedyul ng Calendar

<div class="article-intro">

Kinokontrol ng pahinang **Calendar** sa FreePlay Admin kung ano ang ipe-play ng bawat screen group at kailan. Magdagdag ng iskedyul para sa isang playlist, service plan, o provider folder, at itakda ito na umulit lingguhan o mag-play nang isang beses. Kapag walang nakaiskedyul, tumatakbo ang default loop ng group.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng kahit isang screen group. Tingnan ang [Managing Screens and Groups](./managing-screens#screen-groups)
- [Gumawa ng playlist](./building-playlists), o magkaroon ng plan type na naka-setup sa B1 Admin

</div>

## Pagbasa ng Calendar

1. Pumunta sa **Calendar**.
2. Pumili ng screen group mula sa mga tab sa itaas. Ipinapakita ng bawat tab kung ilang iskedyul ang mayroon ang group.
3. Ang week view ay tumatakbo mula Lunes hanggang Linggo, 6 AM hanggang 10 PM. Minamarkahan ng pulang linya ang kasalukuyang oras.
4. Gamitin ang mga arrow para lumipat sa nakaraan o susunod na linggo, o i-click ang **Today** para bumalik sa linggong ito.

Ipinapakita ng subtitle ng pahina ang time zone na ginagamit ng kalendaryo. Sumusunod ang mga iskedyul sa time zone ng iyong simbahan. Kung walang nakatakdang time zone ang simbahan mo, ginagamit ng FreePlay ang time zone ng iyong campus.

May kulay ang mga iskedyul ayon sa uri. Ipinapaliwanag ng legend ang mga kulay:

- **Default loop** - May hatched na background, ipinapakita sa likod ng lahat kapag may default loop ang group
- **Playlist**
- **Service plan**
- **Provider folder**

Ipinapakita ng bawat block ang pangalan nito, at ang mas matataas na block ay nagpapakita rin ng mga oras, kung umuulit ito (**weekly** o **once**), at kung ano ang mangyayari kapag natapos ito nang maaga.

## Pagtatakda ng Default Loop

Ang default loop ay tumatakbo sa mga screen ng group tuwing walang nakaiskedyul.

1. Sa pahinang **Calendar**, i-click ang **Default loop…** sa header. Kung may nakatakda nang default loop, ipinapakita ng button ang **Default loop:** kasunod ang pangalan ng playlist.
2. Pumili ng **Playlist**, o piliin ang **None — screen goes dark**.
3. I-click ang **Save**.

## Pagdagdag ng Iskedyul

May tatlong paraan para magsimula ng bagong iskedyul:

- I-click ang bakanteng espasyo sa kalendaryo. Bubukas ang form na may napunan nang araw at kalahating oras.
- I-click ang **Add schedule** sa header.
- Piliin ang **Add schedule** mula sa command palette (**Ctrl+K** o **⌘K**).

Pagkatapos, punan ang form:

1. **Play** - Piliin kung ano ang ipe-play:
   - **Playlists** - Anumang playlist na nagawa mo
   - **Service plans** - Isang plan type mula sa B1 Admin, na may markang **(current plan)**. Ang ipe-play ng screen ay ang kasalukuyang plan para sa plan type na iyon sa bawat linggo
   - **Provider folder…** - Bubukas ang **Choose a provider folder**. Mag-browse sa isang folder at i-click ang **Use this folder**. Para pumili ng ibang folder sa susunod, i-click ang **Change**
2. **Repeats** - Piliin ang mga araw ng linggo kung kailan ipe-play ang iskedyul. Para sa iisang petsa, i-on ang **One time** at piliin ang **Date**.
3. **Start** at **End** - Ang mga oras kung kailan magsisimula at titigil ang iskedyul.
4. **If it finishes early** - Ang gagawin kapag naubos ang content bago ang end time:
   - **Loop until the end time** - Magsisimula muli mula sa simula. Mainam para sa signage loop, announcement, at countdown
   - **Teacher paced** - Maghihintay ang mga slide sa remote ng guro. Mananatili ang lesson hanggang lumampas sa end time hanggang sa huling slide
   - **Play once, then go back to the default loop**
5. Para sa mga umuulit na iskedyul, itakda ang **Starts** sa unang petsa. Sa ilalim ng **Ends**, piliin ang **Never**, o piliin ang **On date** at ilagay ang **End date**.
6. I-click ang **Save**.

:::info
Pinalitan ng **Teacher paced** ang mas lumang opsyong "hold the last slide". Ang mga iskedyul na na-save gamit ang opsyong iyon ay ipe-play na bilang teacher paced ngayon.
:::

## Pag-edit o Pagbura ng Iskedyul

1. I-click ang block ng iskedyul sa kalendaryo.
2. Baguhin ang anumang field at i-click ang **Save**, o i-click ang **Delete** para burahin ang iskedyul.

## Mga Nagkakapatong na Iskedyul

Kung nagkakapatong ang dalawang iskedyul, magpapakita ang form ng babala: **Overlaps another schedule. The one that starts later wins.** Habang tumatakbo ang mas huling iskedyul, ito ang ipe-play ng mga screen. Kapag natapos ito, babalik sila sa mas naunang iskedyul kung tumatakbo pa ito.

## Paano Kinukuha ng mga Screen ang mga Pagbabago

Dina-download ng mga naka-pair na screen ang lahat ng nakaiskedyul para sa susunod na 7 araw, at sila mismo ang tumitingin ng mga pagbabago. Hindi mo kailangang hawakan ang TV pagkatapos mong i-edit ang kalendaryo. Para makita kung kumpleto na ang kailangan ng screen, tingnan ang **Ready through** sa [Screens page](./managing-screens).

## Kaugnay na Artikulo

- **[Building Playlists](./building-playlists)** - Gumawa ng mga playlist na iniiskedyul mo
- **[Scheduled Playback on the TV](./scheduled-playback)** - Paano gumagana sa TV ang mga lesson na teacher paced at ang remote
- **[Managing Screens and Groups](./managing-screens)** - Magdagdag ng mga group at tingnan ang download ng bawat screen
