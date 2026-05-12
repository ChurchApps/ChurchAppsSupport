---
title: "Multi-Currency Support"
---

# Multi-Currency Support

<div class="article-intro">

Ang multi-currency feature ng B1 ay nagbibigay-daan sa iyong simbahan na tumanggap at subaybayan ang mga donasyon sa iba't ibang currency. Ito ay partikular na kapaki-pakinabang para sa mga simbahang may mga internasyonal na miyembro, misyonero, o maraming campus sa iba't ibang bansa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso upang pamahalaan ang mga donasyon. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- I-set up ang iyong [online giving](./online-giving-setup.md) gamit ang Stripe, na sumusuporta sa multi-currency transactions.
- Intindihin ang mga pangangailangan sa accounting ng iyong simbahan para sa paghawak ng maraming currency.

</div>

## Pag-enable ng Multi-Currency

Ang multi-currency support ay naka-enable na ngayon by default sa B1. Kapag naka-enable na:

- Maaaring magbigay ang mga miyembro sa kanilang lokal na currency kapag nag-donate online
- Maaari kang manu-manong magtala ng mga donasyon sa anumang currency
- Ang mga ulat ng donasyon ay nagpapakita ng mga halaga sa kanilang orihinal na currency
- Ang Stripe ay awtomatikong humahawak ng currency conversion para sa online giving

## Mga Suportadong Currency

Sumusuporta ang system sa lahat ng pangunahing pandaigdigang currency, kabilang ang:

- **USD** -- United States Dollar
- **EUR** -- Euro
- **GBP** -- British Pound
- **CAD** -- Canadian Dollar
- **AUD** -- Australian Dollar
- **MXN** -- Mexican Peso
- **BRL** -- Brazilian Real
- **INR** -- Indian Rupee
- **CNY** -- Chinese Yuan
- **JPY** -- Japanese Yen
- At marami pang iba...

Ang mga available na currency para sa online giving ay nakadepende sa mga suportadong currency ng iyong Stripe account.

## Pagtala ng mga Donasyon sa Iba't ibang Currency

### Mga Online na Donasyon

Kapag ang isang miyembro ay nag-donate online sa pamamagitan ng Stripe:

1. Pumipili sila ng kanilang ginustong currency sa checkout
2. Pinoproseso ng Stripe ang pagbabayad sa currency na iyon
3. Ang donasyon ay naitala sa B1 na may orihinal na halaga ng currency
4. Awtomatikong humahawak ang Stripe ng anumang kinakailangang currency conversion sa default na currency ng iyong account

### Manu-manong Pagpasok

Upang magtala ng cash o check donation sa ibang currency:

1. Pumunta sa **Donations** sa B1 Admin
2. I-click ang **Add Donation**
3. Piliin ang currency mula sa currency dropdown
4. Ilagay ang halaga sa currency na iyon
5. Kumpletuhin ang natitirang mga detalye ng donasyon
6. I-click ang **Save**

## Pagtingin sa Multi-Currency Donations

### Mga Ulat ng Donasyon

Ang mga ulat ng donasyon ay nagpapakita ng mga halaga sa kanilang orihinal na currency:

- Ang mga indibidwal na tala ng donasyon ay nagpapakita ng currency code (hal., "$100.00 USD")
- Ang mga kabuuan ay kinakalkula bawat currency
- Maaari kang mag-filter ayon sa mga partikular na currency

### Mga Giving Statement

Kapag gumagawa ng mga giving statement:

- Ang bawat donasyon ay lumalabas na may orihinal na currency nito
- Ang mga kabuuan ay hinati-hati ayon sa currency
- Nakikita ng mga miyembro kung ano eksaktong ibinigay nila sa bawat currency

## Stripe Integration

Para sa online giving, hinahahawakan ng Stripe ang mga multi-currency transaction:

- **Automatic conversion** -- Kino-convert ng Stripe ang mga currency sa default na currency ng iyong account
- **Exchange rates** -- Gumagamit ang Stripe ng kasalukuyang market exchange rates
- **Mga bayad** -- Ang currency conversion ay maaaring magsanhi ng karagdagang bayad sa Stripe
- **Payout currency** -- Ang mga pondo ay inidedeposito sa default na currency ng iyong account

:::info
Tingnan ang iyong Stripe dashboard upang makita ang kasalukuyang mga conversion rate at anumang mga bayad na nauugnay sa multi-currency transactions.
:::

## Mga Pagsasaalang-alang sa Accounting

Kapag gumagamit ng maraming currency:

- **Pagtala ng tala** -- Panatilihing subaybayan ang mga orihinal na halaga at currency ng donasyon para sa tumpak na pag-uulat
- **Mga palitan** -- Tandaan na ang mga conversion rate ng Stripe ay maaaring mag-iba sa mga rate ng iyong bangko
- **Mga resibo para sa buwis** -- Kumonsulta sa iyong accountant tungkol sa kung paano iulat ang mga donasyon sa iba't ibang currency para sa mga layunin ng buwis
- **Paglalaan ng pondo** -- Maaari mong ilaan ang mga donasyon sa mga partikular na pondo anuman ang currency

## Mga Best Practice

- **Default currency** -- Itakda ang iyong pangunahing currency ng simbahan bilang default para sa karamihan ng mga transaksyon
- **Malinaw na komunikasyon** -- Sabihin sa mga donor kung anong currency ang kanilang ginagamit sa panahon ng checkout process
- **Consistent na pag-uulat** -- Magpasya kung mag-uulat sa orihinal na mga currency o mag-convert sa isang currency para sa mga buod
- **Regular na reconciliation** -- Ipag-reconcile ang mga payout ng Stripe sa iyong mga tala ng donasyon, isinasaalang-alang ang mga currency conversion

## Mga Limitasyon

- Ang currency conversion ay hinahawakan ng Stripe para sa online giving lamang
- Ang mga manu-manong donasyon ay naitala kung paano ipinasok nang walang awtomatikong conversion
- Ang mga ulat ng kasaysayan ay nagpapakita ng mga donasyon sa kanilang orihinal na mga currency
- Ang mga kalkulasyon ng kabuuan ay ginagawa bawat currency, hindi sa lahat ng currency

## Mga Kaugnay na Artikulo

- [Online Giving Setup](./online-giving-setup.md) -- I-configure ang Stripe para sa pagtanggap ng mga donasyon
- [Recording Donations](./recording-donations.md) -- Manu-manong magpasok ng mga tala ng donasyon
- [Donation Reports](./donation-reports.md) -- Gumawa at tingnan ang mga buod ng donasyon
- [Giving Statements](./giving-statements.md) -- Gumawa ng mga giving statement sa katapusan ng taon
