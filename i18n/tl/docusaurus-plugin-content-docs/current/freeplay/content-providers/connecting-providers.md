---
title: "Pagkonekta sa mga Provider"
---

# Pagkonekta sa mga Provider

<div class="article-intro">

Bago ka makapag-browse ng content mula sa isang provider, kailangan mo munang kumonekta dito. May mga provider na nangangailangan ng authentication sa pamamagitan ng QR code o email login, habang ang iba naman ay makokonekta sa isang click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install at buksan ang FreePlay -- tingnan ang [Getting Started](../getting-started/)
- Ihanda ang TV remote mo para sa navigation
- Para sa mga provider na nangangailangan ng login, ihanda ang iyong account credentials

</div>

:::tip Sinesetup ang B1 Admin + FreePlay nang magkasabay?
Ang aming **<a href="/guides/freeplay-b1admin" target="_blank">step-by-step guide</a>** ay tumatalakay sa pag-link ng B1 Admin, pag-schedule ng lesson, at pagkonekta ng FreePlay -- lahat sa isang lugar. Buksan ito sa bagong tab para masundan.
:::

## Pagba-browse ng mga Available na Provider

1. Buksan ang **Content Providers** screen mula sa sidebar (piliin ang icon na **Providers** sa ilalim)
2. Makikita mo ang isang grid ng mga provider card, bawat isa ay nagpapakita ng logo at pangalan ng provider
3. Ang mga nakakonektang provider ay nagpapakita ng berdeng **Connected** badge sa ilalim ng kanilang pangalan
4. Ang mga provider na hindi pa available ay nagpapakita ng **Coming Soon** label

## Pagkonekta na Walang Authentication

May mga provider na hindi nangangailangan ng login. Kapag pinili mo ang isa sa mga provider na ito, agad na kumokonekta ang FreePlay at binubuksan ang content browser. Walang kailangang credentials.

## Device Flow Authentication (QR Code)

May mga tiyak na provider na gumagamit ng device flow, katulad ng pagsign-in sa mga streaming app sa TV:

1. Piliin ang provider card sa **Content Providers** screen
2. Magpapakita ang FreePlay ng QR code at isang verification URL
3. I-scan ang QR code gamit ang iyong telepono, o bisitahin ang ipinakitang URL sa anumang device
4. Ilagay ang user code na ipinapakita sa TV screen
5. Kumpletuhin ang proseso ng pag-sign-in sa iyong telepono o computer
6. Made-detect ng FreePlay ang matagumpay na login at magpapakita ng **Connected!**
7. Awtomatikong bubukas ang content browser

:::info
Isang pulsing **Waiting for authorization** indicator ang nagpapakita na chine-check ng FreePlay ang iyong login. Nag-e-expire ang code pagkalipas ng ilang minuto, kaya kumpletuhin agad ang proseso.
:::

Gumagamit ang **Go Curriculum** ng parehong QR-code sign-in pattern -- i-scan ang code at mag-log in gamit ang iyong gocurriculum.com account para kumonekta.

## Form Login

May mga ibang provider na gumagamit ng tradisyunal na email at password login:

1. Piliin ang provider card
2. Ilagay ang iyong **Email** at **Password** gamit ang on-screen keyboard
3. Piliin ang button na **Sign In**
4. Kung tama ang iyong credentials, magpapakita ang FreePlay ng **Connected!** at bubuksan ang content browser

:::tip
Gamitin ang directional pad ng iyong remote para lumipat sa pagitan ng email field, password field, at sign-in button. Pindutin ang **Select** sa isang text field para buksan ang on-screen keyboard.
:::

## Pagdiskonekta sa Isang Provider

Para makadiskonekta mula sa isang provider na nakakonekta ka na:

1. Pumunta sa **Content Providers** screen
2. Piliin ang provider card na nagpapakita ng **Connected** badge
3. May lalabas na confirmation prompt na magtatanong kung gusto mong magdiskonekta
4. Piliin ang **Disconnect** para tanggalin ang koneksyon

Pagkatapos magdiskonekta, hindi na lalabas ang content ng provider sa iyong sidebar.

:::warning
Kapag nagdiskonekta, aalisin ang naka-save na authentication mula sa iyong device. Kakailanganin mong mag-sign in ulit kung gusto mong kumonekta muli sa hinaharap.
:::

## Kaugnay na mga Artikulo

- **[Pagba-browse at Pag-download ng Content](./browsing-content)** - Mag-navigate sa mga folder at mag-play ng content pagkatapos kumonekta
- **[Content Providers Overview](./index.md)** - Tingnan ang lahat ng available na provider
