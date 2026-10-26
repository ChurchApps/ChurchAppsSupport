---
title: "Pag-iiskedyul ng Kalendaryo"
---

# Pag-iiskedyul ng Kalendaryo

<div class="article-intro">

Kinokontrol ng pahinang **Calendar** sa FreePlay Admin kung ano ang tutugtog ng bawat screen group at kailan. Magdagdag ng schedule para sa isang playlist, isang service plan, o isang provider folder, at itakda itong umulit linggo-linggo o tumugtog nang isang beses. Kapag walang nakaiskedyul, tumutugtog ang default loop ng grupo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng kahit isang screen group. Tingnan ang [Pamamahala ng mga Screen at Grupo](./managing-screens#screen-groups)
- [Gumawa ng playlist](./building-playlists), o magkaroon ng plan type na nakaayos sa B1 Admin

</div>

## Pagbasa sa Kalendaryo

1. Pumunta sa **Calendar**.
2. Pumili ng screen group mula sa mga tab sa itaas. Ipinapakita ng bawat tab kung ilan ang schedule ng grupo.
3. Ang week view ay tumatakbo mula Lunes hanggang Linggo, 6 AM hanggang 10 PM. Ang pulang linya ay nagmamarka ng kasalukuyang oras.
4. Gamitin ang mga arrow para lumipat sa nakaraan o susunod na linggo, o i-click ang **Today** para bumalik sa linggong ito.

Ipinapakita ng subtitle ng pahina ang time zone na ginagamit ng kalendaryo. Sumusunod ang mga schedule sa time zone ng iyong simbahan, na itinatakda mo sa B1 Admin sa ilalim ng [Church Information](../../b1-admin/settings/church-settings.md#time-zone). Kung walang time zone na nakatakda ang iyong simbahan, ginagamit ng FreePlay ang time zone ng iyong campus. Iisa ang time zone ng kalendaryo at ng iyong mga TV, kaya ang block na inilagay sa 9:00 AM sa kalendaryo ay tutugtog nang 9:00 AM sa screen, kahit iba ang time zone ng iyong computer.

Kulay-kulay ang mga schedule ayon sa uri. Ipinapaliwanag ng legend ang mga kulay:

- **Default loop** - May hatched na background, ipinapakita sa likod ng lahat kapag may default loop ang grupo
- **Playlist**
- **Service plan**
- **Provider folder**

Ipinapakita ng bawat block ang pangalan nito, at ang mas matataas na block ay nagpapakita rin ng mga oras, kung umuulit ito (**weekly** o **once**), at kung ano ang mangyayari kapag natapos ito nang maaga.

## Pagtatakda ng Default Loop

Tumutugtog ang default loop sa mga screen ng grupo tuwing walang nakaiskedyul.

1. Sa pahinang **Calendar**, i-click ang **Default loop…** sa header. Kung may nakatakda nang default loop, ipinapakita ng button ang **Default loop:** na sinusundan ng pangalan ng playlist.
2. Pumili ng **Playlist**, o piliin ang **None — screen goes dark**.
3. I-click ang **Save**.

## Pagdaragdag ng Schedule

May tatlong paraan para magsimula ng bagong schedule:

- I-click ang bakanteng bahagi ng kalendaryo. Bukas na ang form na may napunang araw at kalahating oras.
- I-click ang **Add schedule** sa header.
- Piliin ang **Add schedule** mula sa command palette (**Ctrl+K** o **⌘K**).

Pagkatapos, punan ang form:

1. **Play** - Piliin kung ano ang tutugtog:
   - **Playlists** - Anumang playlist na nagawa mo
   - **Service plans** - Isang plan type mula sa B1 Admin, may markang **(current plan)**. Tumutugtog ang screen ng kasalukuyang plan para sa plan type na iyon bawat linggo, kasama ang mga aralin ng Go Curriculum (kasama ang mga na-customize), na gumagamit ng Go login na naka-link sa ministry ng plan type
   - **Provider folder…** - Magbubukas ng **Choose a provider folder**. Mag-browse sa isang folder at i-click ang **Use this folder**. Para pumili ng ibang folder sa susunod, i-click ang **Change**
2. **Repeats** - Piliin ang mga araw ng linggo kung kailan tutugtog ang schedule na ito. Para sa iisang petsa, i-on ang **One time** at piliin ang **Date**.
3. **Start** at **End** - Ang mga oras kung kailan magsisimula at hihinto ang schedule.
4. **If it finishes early** - Ang gagawin kapag naubos ang content bago ang end time:
   - **Loop until the end time** - Magsisimula muli mula sa umpisa. Mainam para sa signage loop, announcement, at countdown
   - **Teacher paced** - Maghihintay ang mga slide sa remote ng guro. Mananatili ang lesson lampas sa end time hanggang sa huling slide
   - **Play once, then go back to the default loop**
5. Para sa mga umuulit na schedule, itakda ang **Starts** sa unang petsa. Sa ilalim ng **Ends**, piliin ang **Never**, o piliin ang **On date** at ilagay ang **End date**.
6. I-click ang **Save**.

:::info
Pumalit ang **Teacher paced** sa mas lumang opsyong "hold the last slide." Ang mga schedule na na-save gamit ang opsyong iyon ay tutugtog na ngayon bilang teacher paced.
:::

## Pag-e-edit o Pagbura ng Schedule

1. I-click ang block ng schedule sa kalendaryo.
2. Baguhin ang anumang field at i-click ang **Save**, o i-click ang **Delete** para burahin ang schedule.

## Mga Nagkakapatong na Schedule

Kapag nagkapatong ang dalawang schedule, magpapakita ang form ng babala: **Overlaps another schedule. The one that starts later wins.** Habang tumatakbo ang mas huling schedule, ito ang itinutugtog ng mga screen. Kapag natapos ito, babalik sila sa mas naunang schedule kung tumatakbo pa rin ito.

## Paano Kinukuha ng mga Screen ang mga Pagbabago

Dina-download ng mga nakapares na screen ang lahat ng nakaiskedyul sa susunod na 7 araw, at sila mismo ang nagsusuri ng mga pagbabago. Hindi mo kailangang hawakan ang TV pagkatapos mong i-edit ang kalendaryo. Para makita kung kumpleto na ang kailangan ng isang screen, tingnan ang **Ready through** sa [pahina ng Screens](./managing-screens).

## Mga Kaugnay na Artikulo

- **[Pagbuo ng mga Playlist](./building-playlists)** - Gumawa ng mga playlist na iniskedyul mo
- **[Scheduled Playback sa TV](./scheduled-playback)** - Paano gumagana ang teacher paced na mga lesson at ang remote sa TV
- **[Pamamahala ng mga Screen at Grupo](./managing-screens)** - Magdagdag ng mga grupo at tingnan ang mga download ng bawat screen
