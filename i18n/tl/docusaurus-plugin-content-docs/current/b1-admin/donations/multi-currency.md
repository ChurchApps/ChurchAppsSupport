---
title: "Suporta sa Multi-Currency"
---

# Suporta sa Multi-Currency

<div class="article-intro">

Ang multi-currency feature ng B1 ay nagpapahintulot sa iyong simbahan na tumanggap at subaybayan ang mga donasyon sa iba't ibang mga currency. Ito ay partikular na kapaki-pakinabang para sa mga simbahan na may mga internasyonal na miyembro, mga misyoner, o mga kampus sa iba't ibang bansa.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Kailangan mo ng pahintulot upang pamahalaan ang mga donasyon. Makita ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- I-setup ang iyong [online giving](./online-giving-setup.md) na may Stripe, na sumusuporta sa multi-currency transactions.
- Maunawaan ang mga pangangailangan sa accounting ng iyong simbahan para sa pagharap sa maraming mga currency.

</div>

## Pagpapagana ng Multi-Currency

Ang multi-currency support ay ngayon ay enabled na sa default sa B1. Kapag enabled na:

- Ang mga miyembro ay maaaring magbigay sa kanilang lokal na currency kapag nag-donate online
- Maaari mong manu-manong magtatala ng mga donasyon sa anumang currency
- Ang mga ulat sa donasyon ay nagpapakita ng mga halaga sa kanilang orihinal na currency
- Ang Stripe ay awtomatikong humahawak ng conversion ng currency para sa online giving

## Mga Suportadong Currency

Ang sistema ay sumusuporta sa lahat ng pangunahing mga currency ng mundo, kabilang:

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

Ang mga available na currency para sa online giving ay nakasalalay sa mga suportadong currency ng iyong Stripe account.

## Pag-record ng Mga Donasyon sa Iba't ibang Mga Currency

### Online Donations

Kapag ang isang miyembro ay nag-donate online sa pamamagitan ng Stripe:

1. Pumili sila ng kanilang ginustong currency sa checkout
2. Ang Stripe ay nagpoproseso ng pagbabayad sa currency na iyon
3. Ang donasyon ay naitala sa B1 na may orihinal na halaga ng currency
4. Ang Stripe ay awtomatikong humahawak ng anumang kinakailangang conversion ng currency sa default na currency ng iyong account

### Manual Entry

Upang magtatla ng cash o check donation sa isang iba't ibang currency:

1. Mag-navigate sa **Donations** sa B1 Admin
2. I-click ang **Add Donation**
3. Pumili ng currency mula sa currency dropdown
4. Ipasok ang halaga sa currency na iyon
5. Tapusin ang natitirang mga detalye ng donasyon
6. I-click ang **Save**

## Pagsusuri ng Multi-Currency Donations

### Mga Ulat sa Donasyon

Ang mga ulat sa donasyon ay nagpapakita ng mga halaga sa kanilang orihinal na currency:

- Ang mga indibidwal na talaan ng donasyon ay nagpapakita ng currency code (hal., "$100.00 USD")
- Ang mga kabuuan ay kinakalkula bawat currency
- Maaari mong i-filter sa pamamagitan ng mga tiyak na currency

### Mga Converted na Kabuuan

Saanman ang B1 ay nagpapakita ng isang pinagsama-samang kabuuan -- ang giving summary KPI cards, isang kabuuan ng batch ng donasyon, at isang kabuuan ng fund -- ang mga donasyon na naitala sa isang currency na iba sa default ng iyong simbahan ay kinukonberto sa iyong currency ng simbahan gamit ang kasalukuyang exchange rates, kaya ang kabuuan ay isang solong makabuluhang numero sa halip na magdagdag ng mga hindi katulad na currency. Isang notang **Converted at current exchange rates** ay lumalabas sa ilalim ng kabuuan kapag ang isang conversion ay ginagamit. Ang mga indibidwal na line item ng donasyon ay patuloy na nagpapakita sa kanilang orihinal na currency.

### Mga Statement ng Pagbibigay

Kapag lumilikha ng mga statement ng pagbibigay:

- Bawat donasyon ay lumalabas na may kanyang orihinal na currency
- Ang mga kabuuan ay sinisira ng currency
- Ang mga miyembro ay nakakakita ng eksakto kung ano ang kanilang ibinigay sa bawat currency

## Stripe Integration

Para sa online giving, ang Stripe ay humahawak ng multi-currency transactions:

- **Automatic conversion** -- Ang Stripe ay nag-convert ng mga currency sa default na currency ng iyong account
- **Exchange rates** -- Ang Stripe ay gumagamit ng kasalukuyang market exchange rates
- **Fees** -- Ang currency conversion ay maaaring may dagdag na Stripe fees
- **Payout currency** -- Ang mga pondo ay idideposito sa default na currency ng iyong account

:::info
Suriin ang iyong Stripe dashboard upang makita ang kasalukuyang exchange rates at anumang mga bayad na nauugnay sa multi-currency transactions.
:::

## Mga Pagsasaalang-alang sa Accounting

Kapag nagtatrabaho sa maraming mga currency:

- **Record-keeping** -- Panatilihin ang track ng mga orihinal na halaga ng donasyon at mga currency para sa tumpak na umuulat
- **Exchange rates** -- Tandaan na ang mga exchange rate ng Stripe ay maaaring maging iba sa mga rate ng iyong bangko
- **Tax receipts** -- Konsultahin ang iyong accountant kung paano mag-ulat ng mga donasyon sa iba't ibang mga currency para sa mga layunin ng buwis
- **Fund allocation** -- Maaari mong ikatalagang ang mga donasyon sa mga tiyak na fund anuman ang currency

## Mga Best Practice

- **Default currency** -- Itakda ang iyong pangunahing currency ng simbahan bilang default para sa karamihan ng mga transaksyon
- **Clear communication** -- Sabihin sa mga donor kung anong currency ang kanilang ibinibigay sa panahon ng checkout process
- **Consistent reporting** -- Ang mga pinagsama-samang kabuuan ay laging kinukonberto sa iyong currency ng simbahan nang awtomatiko; gamitin ang per-donation currency filter kapag kailangan mong makita ang mga orihinal na halaga
- **Regular reconciliation** -- Baguhin ang mga Stripe payouts sa iyong mga talaan ng donasyon, accounting para sa mga conversion ng currency

## Mga Limitasyon

- Ang currency conversion para sa payment processing ay hinawakan lamang ng Stripe para sa online giving; ang mga manual na donasyon ay naitala gaya ng-entered na walang awtomatikong conversion
- Ang mga ulat sa kasaysayan at mga indibidwal na line item ng donasyon ay laging nagpapakita ng orihinal na currency na kung saan naitala ang regalo
- Ang mga pinagsama-samang kabuuan (KPI cards, batch totals, fund totals) ay kinukonberto sa iyong currency ng simbahan gamit ang kasalukuyang exchange rates -- ang mga rate na ito ay maaaring maging kaunting iba mula sa iyong bangko o mga rate ng Stripe sa oras ng pag-settle ng mga pondo

## Kaugnay na Mga Artikulo

- [Online Giving Setup](./online-giving-setup.md) -- I-configure ang Stripe para tumanggap ng mga donasyon
- [Recording Donations](./recording-donations.md) -- Manu-manong ipasok ang mga talaan ng donasyon
- [Donation Reports](./donation-reports.md) -- Lumikha at tingnan ang mga pagbubuod ng donasyon
- [Giving Statements](./giving-statements.md) -- Lumikha ng mga statement ng pagbibigay sa pagtatapos ng taon
