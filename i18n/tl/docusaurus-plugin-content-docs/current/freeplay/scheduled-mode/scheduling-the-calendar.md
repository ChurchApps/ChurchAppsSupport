---
title: "Pag-iskedyul ng Calendar"
description: "Mag-set up ng lingguhan o isahang iskedyul sa Calendar ng FreePlay Admin para magpatugtog ng mga playlist, service plan, o provider folder sa iyong mga screen group, na may default loop bilang fallback."
---

# Pag-iskedyul ng Calendar

<div class="article-intro">

Kinokontrol ng pahinang **Calendar** sa FreePlay Admin kung ano ang ipinapatugtog ng bawat screen group at kung kailan. Magdagdag ng iskedyul para sa isang playlist, service plan, o provider folder, at itakda itong umulit linggo-linggo o tumugtog nang isang beses. Kapag walang nakaiskedyul, tumutugtog ang default loop ng grupo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Gumawa ng kahit isang screen group. Tingnan ang [Pamamahala ng mga Screen at Grupo](./managing-screens.md#screen-groups)
- [Gumawa ng playlist](./building-playlists.md), o magkaroon ng plan type na naka-set up sa B1 Admin

</div>

## Pagbasa ng Calendar {#reading-the-calendar}

1. Pumunta sa **Calendar**.
2. Pumili ng screen group mula sa mga tab sa itaas. Ipinapakita ng bawat tab kung ilan ang iskedyul ng grupo.
3. Ang week view ay tumatakbo mula Lunes hanggang Linggo, 6 AM hanggang 10 PM. Ang pulang linya ay nagmamarka ng kasalukuyang oras.
4. Gamitin ang mga arrow para lumipat sa nakaraan o susunod na linggo, o i-click ang **Today** para bumalik sa linggong ito.

Ipinapakita ng subtitle ng pahina ang time zone na ginagamit ng calendar. Sumusunod ang mga iskedyul sa time zone ng iyong simbahan, na itinakda mo sa B1 Admin sa ilalim ng [Church Information](../../b1-admin/settings/church-settings.md#time-zone). Kung walang time zone na nakatakda ang iyong simbahan, ginagamit ng FreePlay ang time zone ng iyong campus. Pareho ang time zone ng calendar at ng iyong mga TV, kaya ang blokeng inilagay sa 9:00 AM sa calendar ay tutugtog nang 9:00 AM sa screen, kahit iba ang time zone ng iyong computer.

Kulay-kulay ang mga iskedyul ayon sa uri. Ipinapaliwanag ng legend ang mga kulay:

- **Default loop** - May hatched na background, ipinapakita sa likod ng lahat kapag may default loop ang grupo
- **Playlist**
- **Service plan**
- **Provider folder**

Ipinapakita ng bawat block ang pangalan nito, at ang mas matataas na block ay nagpapakita rin ng mga oras, kung umuulit ba ito (**weekly** o **once**), at kung ano ang mangyayari kapag natapos ito nang maaga.

## Pagtatakda ng Default Loop {#setting-the-default-loop}

Tumutugtog ang default loop sa mga screen ng grupo tuwing walang nakaiskedyul.

1. Sa pahinang **Calendar**, i-click ang **Default loop…** sa header. Kung may nakatakda nang default loop, ipinapakita ng button ang **Default loop:** kasunod ang pangalan ng playlist.
2. Pumili ng **Playlist**, o piliin ang **None — screen goes dark**.
3. I-click ang **Save**.

## Pagdaragdag ng Iskedyul {#adding-a-schedule}

May tatlong paraan para magsimula ng bagong iskedyul:

- I-click ang bakanteng espasyo sa calendar. Bubukas ang form na may nakapunan na araw at kalahating oras na iyon.
- I-click ang **Add schedule** sa header.
- Piliin ang **Add schedule** mula sa command palette (**Ctrl+K** o **⌘K**).

Pagkatapos, punan ang form:

1. **Play** - Piliin kung ano ang ipapatugtog:
   - **Playlists** - Anumang playlist na ginawa mo
   - **Service plans** - Isang plan type mula sa B1 Admin, may markang **(current plan)**. Ang screen ay tumutugtog ng kasalukuyang plano para sa plan type na iyon bawat linggo, kasama ang mga aralin ng GO! Curriculum (pati ang mga na-customize), na gumagamit ng Go login na nakakabit sa ministeryo ng plan type
   - **Provider folder…** - Bubukas ang **Choose a provider folder**. Mag-browse sa isang folder at i-click ang **Use this folder**. Para pumili ng ibang folder sa susunod, i-click ang **Change**
2. **Repeats** - Piliin ang mga araw ng linggo na tutugtog ang iskedyul. Para sa isang partikular na petsa, i-on ang **One time** at pumili ng **Date**.
3. **Start** at **End** - Ang mga oras kung kailan magsisimula at titigil ang iskedyul.
4. **If it finishes early** - Ang gagawin kapag naubos ang content bago ang end time:
   - **Loop until the end time** - Magsisimula muli mula sa umpisa. Mainam para sa signage loop, anunsyo, at countdown
   - **Teacher paced** - Maghihintay ang mga slide sa remote ng guro. Mananatili ang aralin lampas sa end time hanggang sa huling slide
   - **Play once, then go back to the default loop**
5. Para sa mga umuulit na iskedyul, itakda ang **Starts** sa unang petsa. Sa ilalim ng **Ends**, piliin ang **Never**, o piliin ang **On date** at maglagay ng **End date**.
6. I-click ang **Save**.

:::info
Pinalitan ng **Teacher paced** ang mas lumang opsyong "hold the last slide". Ang mga iskedyul na na-save gamit ang opsyong iyon ay tutugtog na ngayon bilang teacher paced.
:::

## Pag-edit o Pagbura ng Iskedyul {#editing-or-deleting-a-schedule}

1. I-click ang block ng iskedyul sa calendar.
2. Baguhin ang alinmang field at i-click ang **Save**, o i-click ang **Delete** para alisin ang iskedyul.

## Nagko-overlap na Iskedyul {#overlapping-schedules}

Kung nagko-overlap ang dalawang iskedyul, magpapakita ang form ng babala: **Overlaps another schedule. The one that starts later wins.** Habang tumatakbo ang mas huling iskedyul, ito ang ipinapatugtog ng mga screen. Kapag natapos ito, babalik sila sa mas naunang iskedyul kung tumatakbo pa rin ito.

## Paano Kinukuha ng mga Screen ang mga Pagbabago {#how-screens-pick-up-changes}

Dina-download ng mga naka-pair na screen ang lahat ng nakaiskedyul sa susunod na 7 araw, at sila mismo ang tumitingin ng mga pagbabago. Hindi mo kailangang galawin ang TV pagkatapos mong i-edit ang calendar. Para makita kung kumpleto na ang kailangan ng isang screen, tingnan ang **Ready through** sa [pahina ng Screens](./managing-screens.md).

## Mga Kaugnay na Artikulo {#related-articles}

- **[Pagbuo ng mga Playlist](./building-playlists.md)** - Gawin ang mga playlist na iyong iiskedyulin
- **[Scheduled Playback sa TV](./scheduled-playback.md)** - Paano gumagana ang teacher paced na mga aralin at ang remote sa TV
- **[Pamamahala ng mga Screen at Grupo](./managing-screens.md)** - Magdagdag ng mga grupo at tingnan ang mga download ng bawat screen
- **[Pagtatago ng Bahagi ng Bawat Aralin](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - I-trim ang bawat naka-iskedyul na aralin sa isang plan type sa mga bahaging pinapatugtog ng iyong kwarto
