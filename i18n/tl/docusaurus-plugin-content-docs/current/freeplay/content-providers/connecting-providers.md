---
title: "Pagkonekta sa mga Provider"
---

# Pagkonekta sa mga Provider

<div class="article-intro">

Bago mo ma-browse ang nilalaman mula sa isang provider, kailangan mo munang kumonekta rito. May mga provider na nangangailangan ng authentication sa pamamagitan ng QR code o email login, habang ang iba ay maaaring ikonekta sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install at buksan ang FreePlay -- tingnan ang [Pagsisimula](../getting-started/)
- Ihanda ang iyong TV remote para sa pag-navigate
- Para sa mga provider na nangangailangan ng login, ihanda ang mga credential ng iyong account

</div>

:::tip Sabay na isinasetup ang B1 Admin + FreePlay?
Ang aming **<a href="/guides/freeplay-b1admin" target="_blank">step-by-step na gabay</a>** ay gumagabay sa pag-link ng B1 Admin, pag-iiskedyul ng aralin, at pagkonekta ng FreePlay — lahat sa iisang lugar. Buksan ito sa bagong tab para masundan mo habang ginagawa.
:::

## Pag-browse sa mga Available na Provider

1. Buksan ang **Settings** sa ibaba ng sidebar, pagkatapos ay piliin ang **Providers** para buksan ang **Content Providers** screen
2. Makikita mo ang grid ng mga provider card, na bawat isa ay may logo at pangalan ng provider
3. Ang mga nakakonektang provider ay may berdeng badge na **Connected** sa ilalim ng kanilang pangalan
4. Ang mga provider na hindi pa available ay may label na **Coming Soon**

## Pagkonekta Nang Walang Authentication

May mga provider na hindi nangangailangan ng login. Kapag pumili ka ng isa sa mga ito, agad kumokonekta ang FreePlay at binubuksan ang content browser. Walang kailangang credential.

## Device Flow Authentication (QR Code)

Gumagamit ng device flow ang ilang provider, katulad ng pag-sign in mo sa mga streaming app sa TV:

1. Piliin ang provider card sa **Content Providers** screen
2. Magpapakita ang FreePlay ng QR code at verification URL
3. I-scan ang QR code gamit ang iyong telepono, o bisitahin ang ipinapakitang URL sa anumang device
4. Ilagay ang user code na nakikita sa screen ng TV
5. Tapusin ang pag-sign in sa iyong telepono o computer
6. Matutukoy ng FreePlay ang matagumpay na pag-login at magpapakita ng **Connected!**
7. Awtomatikong magbubukas ang content browser

:::info
Ang kumikislap na indicator na **Waiting for authorization** ay nagpapakitang sinusuri ng FreePlay ang iyong pag-login. Mag-e-expire ang code pagkalipas ng ilang minuto, kaya tapusin agad ang proseso.
:::

Ang **Go Curriculum** ay gumagamit ng parehong QR-code na paraan ng pag-sign in -- i-scan ang code at mag-log in gamit ang iyong gocurriculum.com account para kumonekta.

## Form Login

Ang ibang provider ay gumagamit ng tradisyonal na email at password na login:

1. Piliin ang provider card
2. Ilagay ang iyong **Email** at **Password** gamit ang on-screen keyboard
3. Piliin ang button na **Sign In**
4. Kung tama ang iyong mga credential, magpapakita ang FreePlay ng **Connected!** at bubuksan ang content browser

:::tip
Gamitin ang directional pad ng remote para lumipat sa pagitan ng email field, password field, at sign-in button. Pindutin ang **Select** sa isang text field para buksan ang on-screen keyboard.
:::

## Paghahanap ng Provider sa Iyong Network

Ang **FreeShow** ay natatagpuan sa iyong lokal na network sa halip na sa pamamagitan ng sign-in: hinahanap ng FreePlay ang network, inililista ang bawat computer na nagpapatakbo ng FreeShow na nakita nito, at kumokonekta sa pipiliin mo (piliin ang **Scan Again** kung walang lumitaw).

## Mga Setting ng Provider

Ang pagpili sa provider card na may badge na **Connected** ay magbubukas ng **Provider Settings** screen nito:

- **Browse Library** -- Ipakita o itago ang content library ng provider na ito sa sidebar
- **Auto-Download Today's Lesson** -- Gamitin ang provider na ito bilang pinagmumulan ng aralin ngayong araw at i-pre-download ang mga file nito (ipinapakita lamang para sa mga provider na may kasalukuyang aralin)
- **Use for Announcements** -- Pumili ng folder mula sa provider na ito para i-loop mula sa item na **Announcements** sa sidebar. Tingnan ang [Mga Announcement](./announcements)
- **Check for Announcement Updates** -- Lumalabas kapag may napiling announcements folder; nagda-download ng mga bagong slide at nag-aalis ng mga nabura na
- **Disconnect** -- Alisin ang koneksyon

## Pagdidiskonekta ng Provider

Para magdiskonekta sa provider na nakakonekta mo na:

1. Pumunta sa **Content Providers** screen (**Settings** > **Providers**)
2. Piliin ang provider card na may badge na **Connected**
3. Sa **Provider Settings** screen, piliin ang **Disconnect**

Pagkatapos magdiskonekta, hindi na lilitaw ang nilalaman ng provider sa iyong sidebar. Kung gumagamit ka ng isa sa mga folder nito para sa announcements, aalisin din ang mga slide na iyon.

:::warning
Inaalis ng pagdidiskonekta ang naka-save na authentication mula sa iyong device. Kakailanganin mong mag-sign in muli kung gusto mong kumonekta ulit sa hinaharap.
:::

## Mga Kaugnay na Artikulo

- **[Pag-browse at Pag-download ng Nilalaman](./browsing-content)** - Mag-navigate sa mga folder at magpatugtog ng nilalaman pagkatapos kumonekta
- **[Mga Announcement](./announcements)** - I-loop ang folder ng mga slide mula sa nakakonektang provider
- **[Pangkalahatang-ideya ng mga Content Provider](./index.md)** - Tingnan ang lahat ng available na provider
