---
title: "Suporta sa Maraming Currency"
description: "Itala at iulat ang mga donasyon sa iba't ibang currency sa B1 Admin, kasama ang manu-manong pagpasok, Stripe online giving, at kung paano pinagsasama ang mga kabuuan."
---

# Suporta sa Maraming Currency

<div class="article-intro">

Pinapayagan ng multi-currency feature ng B1 ang iyong simbahan na tumanggap at subaybayan ang mga donasyon sa iba't ibang currency. Lalo itong kapaki-pakinabang para sa mga simbahang may mga internasyonal na miyembro, misyonero, o maraming kampus sa iba't ibang bansa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng pahintulot na mamahala ng mga donasyon. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- I-set up ang iyong [online giving](./online-giving-setup.md) gamit ang Stripe, na sumusuporta sa mga multi-currency transaction. Ang simbahang walang online giving ay maaari pa ring pumili ng currency kung saan itatala ang mga regalong ipinasok nang manu-mano.
- Unawain ang mga pangangailangan sa accounting ng iyong simbahan para sa paghawak ng maraming currency.

</div>

Ang currency ng iyong simbahan ay nagsisimula sa currency ng bansang inilagay noong nag-sign up ang simbahan (halimbawa, Kenyan shilling para sa simbahan sa Kenya), at ito ang ginagamit kung wala pang naka-save na currency. Maaari mo itong baguhin anumang oras sa ilalim ng **Manage Church → Giving**. Kung hindi nakilala ang iyong bansa, magsisimula ito sa US dollars.

## Pag-e-enable ng Multi-Currency

Naka-enable na bilang default ang suporta sa multi-currency sa B1. Kapag naka-enable na:

- Makakapagbigay ang mga miyembro sa kanilang lokal na currency kapag nagdo-donate online
- Maaari kang manu-manong magtala ng mga donasyon sa anumang currency
- Ipinapakita ng mga ulat ng donasyon ang mga halaga sa orihinal nilang currency
- Ang Stripe ang awtomatikong humahawak ng conversion ng currency para sa online giving

## Mga Suportadong Currency

Sinusuportahan ng sistema ang lahat ng pangunahing currency sa mundo, kabilang ang:

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

Ang mga currency na available para sa online giving ay nakadepende sa mga currency na sinusuportahan ng iyong Stripe account.

## Pagtatala ng mga Donasyon sa Iba't Ibang Currency

### Online Donations

Kapag nagbigay ang isang miyembro online sa pamamagitan ng Stripe:

1. Pipiliin nila ang gusto nilang currency sa checkout
2. Pinoproseso ng Stripe ang bayad sa currency na iyon
3. Naitatala ang donasyon sa B1 na may halagang nasa orihinal na currency
4. Awtomatikong hinahawakan ng Stripe ang anumang kinakailangang conversion ng currency sa default na currency ng iyong account

### Manual Entry

Ang mga cash at check na donasyong ipinasok mo nang manu-mano ay naitatala sa currency ng iyong simbahan -- ang **Currency** na nakatakda sa ilalim ng **Settings > Giving** (tingnan ang [Pagtatakda ng Currency ng Iyong Simbahan](./online-giving-setup.md#choosing-your-currency)). Walang pagpili ng currency kada regalo. Ipinapakita ng kahon na **Amount** ang currency code sa dulo nito (halimbawa, *PHP*) para malaman mo kung anong currency ang iyong tina-type.

1. Pumunta sa **Donations > Batches** sa B1 Admin at buksan ang batch
2. I-click ang **Add Donation** sa itaas ng pahina ng batch
3. Ilagay ang halaga sa currency ng iyong simbahan
4. Kumpletuhin ang natitirang detalye ng donasyon
5. I-click ang **Save**

Ang pag-e-edit ng umiiral na regalo ay nananatili sa currency kung saan ito unang naitala.

## Pagtingin sa mga Donasyong Maraming Currency

### Mga Ulat ng Donasyon

Ipinapakita ng mga ulat ng donasyon ang mga halaga sa orihinal nilang currency:

- Ipinapakita ng mga indibidwal na tala ng donasyon ang currency code (hal., "$100.00 USD")
- Kinakalkula ang mga kabuuan kada currency
- Maaari mong i-filter ayon sa partikular na currency

### Mga Kabuuang Na-convert {#converted-totals}

Saanman nagpapakita ang B1 ng iisang pinagsamang kabuuan -- ang mga KPI card ng buod ng giving, ang kabuuan ng isang batch ng donasyon, at ang kabuuan ng isang pondo -- ang mga donasyong naitala sa currency na iba sa default ng iyong simbahan ay kinokonberte sa currency ng simbahan gamit ang kasalukuyang exchange rate, kaya isang makabuluhang numero ang kabuuan sa halip na pagsamahin ang magkakaibang currency. Lumalabas ang nota na **Converted at current exchange rates** sa ilalim ng kabuuan kapag may ginawang conversion. Ipinapakita pa rin sa orihinal na currency ang mga indibidwal na line item ng donasyon.

### Mga Giving Statement

Kapag bumubuo ng mga giving statement:

- Lumalabas ang bawat donasyon sa orihinal nitong currency
- Hinahati ang mga kabuuan ayon sa currency
- Makikita ng mga miyembro nang eksakto kung magkano ang ibinigay nila sa bawat currency

## Integrasyon sa Stripe

Para sa online giving, ang Stripe ang humahawak ng mga multi-currency transaction:

- **Automatic conversion** -- Kino-convert ng Stripe ang mga currency sa default na currency ng iyong account
- **Exchange rates** -- Gumagamit ang Stripe ng kasalukuyang market exchange rate
- **Fees** -- Maaaring may dagdag na Stripe fee ang conversion ng currency
- **Payout currency** -- Idedeposito ang mga pondo sa default na currency ng iyong account

:::info
Tingnan ang iyong Stripe dashboard para makita ang kasalukuyang conversion rate at anumang bayad na kaugnay ng mga multi-currency transaction.
:::

## Mga Konsiderasyon sa Accounting

Kapag nagtatrabaho sa maraming currency:

- **Record-keeping** -- Subaybayan ang orihinal na halaga ng donasyon at mga currency para sa tumpak na pag-uulat
- **Exchange rates** -- Tandaan na maaaring magkaiba ang conversion rate ng Stripe sa rate ng iyong bangko
- **Tax receipts** -- Kumonsulta sa iyong accountant kung paano iuulat ang mga donasyon sa iba't ibang currency para sa layuning buwis
- **Fund allocation** -- Maaari mong italaga ang mga donasyon sa partikular na pondo anuman ang currency

## Mga Best Practice

- **Default currency** -- Itakda ang pangunahing currency ng iyong simbahan sa ilalim ng **Settings > Giving** para gamitin ito ng mga manu-manong regalo at ng mga kabuuan ng giving
- **Malinaw na komunikasyon** -- Sabihin sa mga donor kung anong currency ang ibinibigay nila habang nasa checkout
- **Pare-parehong pag-uulat** -- Awtomatikong kino-convert sa currency ng iyong simbahan ang mga pinagsamang kabuuan; gamitin ang per-donation currency filter kapag kailangan mong makita ang orihinal na halaga
- **Regular na reconciliation** -- I-reconcile ang mga Stripe payout sa iyong mga tala ng donasyon, isinasaalang-alang ang mga conversion ng currency

## Mga Limitasyon

- Ang conversion ng currency para sa pagproseso ng bayad ay ginagawa lamang ng Stripe para sa online giving; ang mga manu-manong donasyon ay naitatala ayon sa pagkakapasok nang walang awtomatikong conversion
- Palaging ipinapakita ng mga historical report at ng mga indibidwal na line item ng donasyon ang orihinal na currency kung saan naitala ang regalo
- Ang mga pinagsamang kabuuan (KPI card, batch total, fund total) ay kino-convert sa currency ng iyong simbahan gamit ang kasalukuyang exchange rate -- maaaring bahagyang magkaiba ang mga rate na ito sa rate ng iyong bangko o ng Stripe sa panahon ng settlement ng mga pondo

## Mga Kaugnay na Artikulo

- [Online Giving Setup](./online-giving-setup.md) -- I-configure ang Stripe para makatanggap ng mga donasyon
- [Recording Donations](./recording-donations.md) -- Manu-manong ilagay ang mga tala ng donasyon
- [Donation Reports](./donation-reports.md) -- Gumawa at tingnan ang mga buod ng donasyon
- [Giving Statements](./giving-statements.md) -- Gumawa ng mga giving statement sa pagtatapos ng taon
