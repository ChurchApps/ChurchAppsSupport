---
title: "Pagkonekta sa mga Provider"
---

# Pagkonekta sa mga Provider

<div class="article-intro">

Bago ka makapag-browse ng content mula sa isang provider, kailangan mo munang kumonekta dito. Ang ilang provider ay nangangailangan ng authentication sa pamamagitan ng QR code o email login, habang ang iba ay maaaring ikonekta sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install at buksan ang FreePlay -- tingnan ang [Getting Started](../getting-started/)
- Ihanda ang remote ng iyong TV para sa pag-navigate
- Para sa mga provider na humihingi ng login, ihanda ang iyong account credentials

</div>

:::tip Nagse-set up ng B1 Admin + FreePlay nang sabay?
Ang aming **<a href="/guides/freeplay-b1admin" target="_blank">step-by-step na gabay</a>** ay gagabay sa pag-link ng B1 Admin, pag-iskedyul ng lesson, at pagkonekta ng FreePlay -- lahat sa iisang lugar. Buksan ito sa bagong tab para masundan.
:::

## Pag-browse ng mga Available na Provider

1. Buksan ang **Settings** sa ibaba ng sidebar, pagkatapos ay piliin ang **Providers** para buksan ang screen na **Content Providers**
2. Makikita mo ang isang grid ng mga provider card, na bawat isa ay nagpapakita ng logo at pangalan ng provider
3. Ang mga nakakonektang provider ay nagpapakita ng berdeng badge na **Connected** sa ilalim ng kanilang pangalan
4. Ang mga provider na hindi pa available ay nagpapakita ng label na **Coming Soon**

## Pagkonekta Nang Walang Authentication

Ang ilang provider ay hindi nangangailangan ng login. Kapag pinili mo ang isa sa mga ito, agad kakonekta ang FreePlay at bubuksan ang content browser. Walang kailangang credentials.

## Device Flow Authentication (QR Code)

Gumagamit ang ilang provider ng device flow, katulad ng kung paano ka nag-sign in sa mga streaming app sa TV:

1. Piliin ang provider card sa screen na **Content Providers**
2. Magpapakita ang FreePlay ng screen na **Connect to** na may pangalan ng provider, QR code, at verification URL
3. I-scan ang QR code gamit ang iyong telepono, o bisitahin ang ipinapakitang URL sa anumang device
4. Ilagay ang code na nakikita sa screen ng TV
5. Kumpletuhin ang proseso ng sign-in sa iyong telepono o computer
6. Mapapansin ng FreePlay ang matagumpay na login at ipapakita ang **Connected!**
7. Awtomatikong magbubukas ang content browser

:::info
Ang kumikislap na indicator na **Waiting for confirmation** ay nagpapakita na tinitingnan ng FreePlay ang iyong login. Ipinapakita ng screen kung ilang minuto na lang ang natitira bago mag-expire ang code, kaya kumpletuhin agad ang proseso. Piliin ang **Generate New Code** kung maubos ang oras.
:::

## Phone Sign-In (QR Code Lang)

Ang **Dropbox**, **OneDrive**, at **Go Curriculum** ay gumagamit ng bahagyang ibang QR-code sign-in, na walang code na kailangang i-type:

1. Piliin ang provider card sa screen na **Content Providers**
2. Magpapakita ang FreePlay ng screen na **Connect to** na may pangalan ng provider at QR code
3. I-scan ang QR code gamit ang iyong telepono at mag-sign in sa account mo sa provider na iyon (ang iyong Microsoft account para sa OneDrive, o ang iyong gocurriculum.com account para sa Go Curriculum)
4. Aprubahan ang access. Awtomatikong kakonekta ang TV at ipapakita ang **Connected!**

Ipinapakita ng screen kung ilang minuto ang natitira para tapusin ang sign-in.

## Form Login

Ang ibang provider ay gumagamit ng tradisyonal na email at password login:

1. Piliin ang provider card
2. Ilagay ang iyong **Email** at **Password** gamit ang on-screen keyboard
3. Piliin ang button na **Sign In**
4. Kung tama ang iyong credentials, ipapakita ng FreePlay ang **Connected!** at bubuksan ang content browser

:::tip
Gamitin ang directional pad ng remote para lumipat sa pagitan ng email field, password field, at sign-in button. Pindutin ang **Piliin** sa isang text field para buksan ang on-screen keyboard.
:::

## Mga Setting ng Provider

Ang pagpili ng provider card na may badge na **Connected** ay magbubukas ng screen nitong **Provider Settings**:

- **Browse Library** -- Ipakita o itago ang content library ng provider na ito sa sidebar
- **Auto-Download Today's Lesson** -- Gamitin ang provider na ito bilang pinagmumulan ng lesson ngayong araw at i-pre-download ang mga file nito (lumalabas lang para sa mga provider na may kasalukuyang lesson)
- **Use for Announcements** -- Pumili ng folder mula sa provider na ito para mag-loop mula sa item na **Announcements** sa sidebar. Tingnan ang [Announcements](./announcements)
- **Check for Announcement Updates** -- Lumalabas kapag napili na ang announcements folder; nagda-download ng mga bagong slide at nag-aalis ng mga na-delete na
- **Disconnect** -- Alisin ang koneksyon

## Pag-disconnect sa Provider

Para mag-disconnect sa provider na nakakonekta mo na:

1. Pumunta sa screen na **Content Providers** (**Settings** > **Providers**)
2. Piliin ang provider card na may badge na **Connected**
3. Sa screen ng **Provider Settings**, piliin ang **Disconnect**

Pagkatapos mag-disconnect, hindi na lalabas sa iyong sidebar ang content ng provider. Kung ginagamit mo ang isa sa mga folder nito para sa announcements, aalisin din ang mga slide na iyon.

:::warning
Inaalis ng pag-disconnect ang naka-save na authentication sa iyong device. Kakailanganin mong mag-sign in muli kung gusto mong kumonekta ulit sa hinaharap.
:::

## Mga Kaugnay na Artikulo

- **[Browsing and Downloading Content](./browsing-content)** - Mag-navigate sa mga folder at magpatugtog ng content pagkatapos kumonekta
- **[Announcements](./announcements)** - Mag-loop ng folder ng mga slide mula sa nakakonektang provider
- **[Content Providers Overview](./index.md)** - Tingnan ang lahat ng available na provider
