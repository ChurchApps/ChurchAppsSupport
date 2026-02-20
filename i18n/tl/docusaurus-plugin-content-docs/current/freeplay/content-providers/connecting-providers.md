---
title: "Pagkonekta sa mga Provider"
---

# Pagkonekta sa mga Provider

<div class="article-intro">

Bago ka makapag-browse ng nilalaman mula sa isang provider, kailangan mong kumonekta dito. Ang ilang provider ay nangangailangan ng authentication sa pamamagitan ng QR code o email login, habang ang iba ay maaaring ikonekta sa isang pag-click lang.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install at ilunsad ang FreePlay -- tingnan ang [Pagsisimula](../getting-started/)
- Ihanda ang iyong TV remote para sa navigation
- Para sa mga provider na nangangailangan ng login, ihanda ang iyong mga account credential

</div>

## Pagba-browse ng mga Available na Provider

1. Buksan ang screen ng **Content Providers** mula sa sidebar (piliin ang icon na **Providers** sa ibaba)
2. Makikita mo ang isang grid ng mga provider card, bawat isa ay nagpapakita ng logo at pangalan ng provider
3. Ang mga nakakonektang provider ay nagpapakita ng berdeng badge na **Connected** sa ibaba ng kanilang pangalan
4. Ang mga provider na hindi pa available ay nagpapakita ng label na **Coming Soon**

## Pagkonekta Nang Walang Authentication

Ang ilang provider ay hindi nangangailangan ng login. Kapag pumili ka ng isa sa mga provider na ito, agad na kumokonekta ang FreePlay at binubuksan ang content browser. Walang mga credential na kailangan.

## Device Flow Authentication (QR Code)

Ang ilang provider ay gumagamit ng device flow, katulad ng kung paano ka nagsa-sign in sa mga streaming app sa isang TV:

1. Piliin ang provider card sa screen ng **Content Providers**
2. Magpapakita ang FreePlay ng QR code at verification URL
3. I-scan ang QR code gamit ang iyong telepono, o bisitahin ang ipinakitang URL sa anumang device
4. Ilagay ang user code na ipinapakita sa TV screen
5. Kumpletuhin ang proseso ng pag-sign in sa iyong telepono o computer
6. Made-detect ng FreePlay ang matagumpay na login at magpapakita ng **Connected!**
7. Awtomatikong magbubukas ang content browser

:::info
Isang pulsing na indicator ng **Waiting for authorization** ang nagpapakita na sinusuri ng FreePlay ang iyong login. Ang code ay mag-e-expire pagkatapos ng ilang minuto, kaya kumpletuhin ang proseso nang mabilis.
:::

## Form Login

Ang ibang provider ay gumagamit ng tradisyunal na email at password login:

1. Piliin ang provider card
2. Ilagay ang iyong **Email** at **Password** gamit ang on-screen keyboard
3. Piliin ang button na **Sign In**
4. Kung tama ang iyong mga credential, magpapakita ang FreePlay ng **Connected!** at bubuksan ang content browser

:::tip
Gamitin ang directional pad sa iyong remote upang lumipat sa pagitan ng email field, password field, at sign-in button. Pindutin ang **Select** sa isang text field upang buksan ang on-screen keyboard.
:::

## Pagdi-disconnect ng Provider

Upang mag-disconnect mula sa isang provider na nakakonekta ka na:

1. Pumunta sa screen ng **Content Providers**
2. Piliin ang provider card na nagpapakita ng badge na **Connected**
3. Isang confirmation prompt ang magtatanong kung gusto mong mag-disconnect
4. Piliin ang **Disconnect** upang alisin ang koneksyon

Pagkatapos mag-disconnect, ang nilalaman ng provider ay hindi na lalabas sa iyong sidebar.

:::warning
Ang pag-disconnect ay nag-aalis ng naka-save na authentication mula sa iyong device. Kakailanganin mong mag-sign in muli kung gusto mong muling kumonekta mamaya.
:::

## Mga Kaugnay na Artikulo

- **[Pagba-browse at Pag-download ng Nilalaman](./browsing-content)** - Mag-navigate sa mga folder at mag-play ng nilalaman pagkatapos kumonekta
- **[Pangkalahatang-tanaw ng mga Content Provider](./index.md)** - Tingnan ang lahat ng available na provider
