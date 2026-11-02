---
title: "Pagpapares ng Screen"
---

# Pagpapares ng Screen

<div class="article-intro">

Para ilagay ang isang TV sa calendar, ipares ito sa **FreePlay Admin**. Nagpapakita ang TV ng apat na letrang code. Ilalagay mo ang code na iyon sa [admin.freeplay.church](https://admin.freeplay.church) at pipiliin ang screen group na dapat sundan ng calendar nito. Isang beses lang ito gagawin kada TV.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install at buksan ang FreePlay sa TV. Tingnan ang [Getting Started](../getting-started/)
- Magkaroon ng ChurchApps login para sa iyong simbahan para makapag-sign in ka sa FreePlay Admin
- Opsyonal, [gumawa ng playlist](./building-playlists) at [i-iskedyul ito](./scheduling-the-calendar) muna para may maipapatugtog agad ang TV

</div>

## Pagpapakita ng Code sa TV

1. Sa TV, buksan ang **Settings** sa ilalim ng sidebar.
2. Piliin ang **Pair to a calendar**. Nagpapakita ang row ng **Not paired** kapag hindi pa nakapares ang TV.
3. Ipinapakita ng screen na **Pair this screen** ang QR code at apat na letrang pairing code, kasama ang mensaheng **Scan with your phone, or go to freeplay.church/pair and enter this code**.
4. Sa ilalim ng code, kumikislap ang **Waiting for confirmation** habang naghihintay ang FreePlay na matapos mo ang pagpapares.

Tumatagal ng 15 minuto ang code, at may countdown sa ilalim nito na nagpapakita kung gaano pa karami ang natitirang oras. Kapag naubos na ang oras, awtomatikong magpapakita ang FreePlay ng bagong code. Maaari mo ring piliin ang **Generate New Code** para sa bago, o **Cancel** para bumalik sa Settings.

## Pagpapares sa FreePlay Admin

1. I-scan ang QR code gamit ang telepono mo, o pumunta sa **freeplay.church/pair** sa anumang computer o telepono. Mag-sign in kung hihingin. Bubuksan ng FreePlay Admin ang form na **Pair screen** na nakapunan na ang code.
   - Maaari mo ring buksan ang form nang mag-isa. Pumunta sa **Screens** sa FreePlay Admin at i-click ang **Pair screen**.
2. Tingnan ang **Pairing code**. Ito ang apat na letra sa TV.
3. Maglagay ng **Label** para matukoy mo ang TV na ito sa iba, halimbawa "Lobby left". Opsyonal ito.
4. Sa ilalim ng **Group**, piliin ang screen group na dapat sundan ng calendar ng TV na ito. Para gumawa ng bago, piliin ang **＋ New group…** at ilagay ang **New group name**.
5. Sa ilalim ng **Mode**, iwanang naka-piling **Scheduled**. Susundan ng TV ang calendar ng grupo nang kusa.
6. I-click ang **Pair**.

Ipapakita ng TV ang **Connected!** at pagkatapos ang **Loading your schedule...**. Dina-download nito ang nakaiskedyul at nagsisimulang magpatugtog. Tingnan ang [Scheduled Playback on the TV](./scheduled-playback).

:::info
Kung sinasabi ng FreePlay Admin na **That code didn't match a TV**, tingnan ang code sa screen. Kung nag-expire na ito, gamitin ang bagong code na ipinapakita na ngayon ng TV.
:::

### Scheduled vs. Manual

May dalawang opsyon ang setting na **Mode**:

- **Scheduled** - Nagpapatugtog ayon sa calendar ng grupo nang kusa. Walang kailangang pindutin ang Start.
- **Manual** - Pumipili ang isang tao ng nilalaman gamit ang remote. Lumalabas pa rin sa listahan mo ng **Screens** ang manual na screen, pero hindi ito sumusunod sa calendar, kaya naka-off ang field na **Group**.

Maaari mong palitan ang mode ng screen sa bandang huli mula sa **Edit** sa [Screens page](./managing-screens).

## Pagpapares sa Service Plan sa Halip

Gumagana rin sa B1 Admin ang code na nasa screen na **Pair this screen**. Kung ilalagay mo ito roon at pipili ka ng uri ng plan sa ilalim ng **Show Plans For**, susundan ng TV ang uri ng planong iyon sa [Plan Mode](../plan-mode/) sa halip na calendar. Tingnan ang [Pairing Your Device](../plan-mode/device-pairing).

## Pagpapalit o Pag-alis ng Pares mula sa TV {#changing-or-unpairing-from-the-tv}

Kapag nakapares na ang TV, ipinapakita ng row na **Pair to a calendar** sa **Settings** ang pangalan ng screen group na sinusundan nito. Piliin ang row para buksan ang dialog na **Paired to**, na may tatlong opsyon:

- **Back to schedule** - Isara ang dialog at bumalik sa scheduled player. Walang magbabago sa pagpapares.
- **Unpair** - Itigil ang pagsunod sa iskedyul. Bubuksan ng FreePlay ang screen na **Content Providers**.
- **Pair to a different calendar** - I-unpair, pagkatapos magpakita ng bagong pairing code para mapares muli ang TV.

:::warning
Inaalis ng pag-unpair ang mga file na dinownload ng FreePlay para sa calendar na iyon.
:::

## Pag-unpair mula sa FreePlay Admin

1. Pumunta sa **Screens** at i-click ang label ng screen.
2. I-click ang **More**, pagkatapos **Unpair**.
3. I-click muli ang **Unpair** para kumpirmahin.

Babalik ang TV sa pagpapakita ng pairing code. Ipares muli ito kapag gusto mo na itong bumalik.

## Mga Kaugnay na Artikulo

- **[Managing Screens and Groups](./managing-screens)** - Palitan ang pangalan ng screen, ilipat ito sa ibang grupo, o tingnan ang mga download nito
- **[Scheduling the Calendar](./scheduling-the-calendar)** - Magpasya kung ano ang ipatutugtog ng mga screen ng grupo
- **[Choosing a Pairing Mode](../getting-started/pairing-modes)** - Ihambing ang Scheduled Mode sa Plan Mode at sa sariling pag-browse ng mga provider
