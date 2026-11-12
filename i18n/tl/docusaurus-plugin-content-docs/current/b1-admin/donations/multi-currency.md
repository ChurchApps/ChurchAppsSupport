---
title: "Suporta sa Maraming Currency"
description: "Magtala at mag-ulat ng mga donasyon sa iba't ibang currency sa B1 Admin, kabilang ang manu-manong pagpasok, Stripe online giving, at kung paano kino-convert ang pinagsamang kabuuan."
---

# Suporta sa Maraming Currency

<div class="article-intro">

Hinahayaan ng multi-currency feature ng B1 ang iyong simbahan na tumanggap at subaybayan ang mga donasyon sa iba't ibang currency. Lalo itong kapaki-pakinabang para sa mga simbahang may internasyonal na miyembro, misyonero, o maraming campus sa iba't ibang bansa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permission para pamahalaan ang mga donasyon. Tingnan ang [Roles & Permissions](../people/roles-permissions.md) para sa mga detalye.
- I-set up ang iyong [online giving](./online-giving-setup.md) gamit ang Stripe, na sumusuporta sa multi-currency na transaksyon. Ang simbahang walang online giving ay maaari pa ring pumili ng currency kung saan itatala ang mga handog na manu-manong inilagay.
- Unawain ang pangangailangan ng iyong simbahan sa accounting para sa paghawak ng maraming currency.

</div>

Nagsisimula ang currency ng iyong simbahan sa currency ng bansang inilagay noong nagparehistro ang simbahan (halimbawa, Kenyan shillings para sa simbahan sa Kenya), at ito ang ginagamit kung wala pang naka-save na currency. Maaari mo itong palitan anumang oras sa ilalim ng **Settings → Giving** (ang **Currency** dropdown). Kung hindi nakikilala ang iyong bansa, nagsisimula ito sa US dollars.

## Pag-enable ng Multi-Currency {#enabling-multi-currency}

Naka-enable bilang default sa B1 ang suporta sa multi-currency:

- Sinisingil ang mga online na handog sa currency na pinili sa iyong **Giving** settings
- Pinapanatili ng bawat donasyon ang currency kung saan ito naitala, at ipinapakita ng bawat linya ng donasyon ang currency na iyon
- Kino-convert sa currency ng iyong simbahan ang mga pinagsamang kabuuan (tingnan ang [Converted Totals](#converted-totals))
- Ang Stripe ang humahawak ng conversion ng currency tungo sa payout currency mo para sa online giving

## Mga Suportadong Currency {#supported-currencies}

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

Nakadepende sa mga currency na sinusuportahan ng iyong Stripe account ang mga currency na available para sa online giving.

## Pagtatala ng Donasyon sa Iba't Ibang Currency {#recording-donations-in-different-currencies}

### Mga Online na Donasyon {#online-donations}

Kapag nagbigay ang isang miyembro online sa pamamagitan ng Stripe:

1. Sinisingil ang handog sa currency na itinakda sa ilalim ng **Settings → Giving**; hindi pumipili ng currency ang mga donor sa checkout
2. Pinoproseso ng Stripe ang bayad sa currency na iyon
3. Naitatala ang donasyon sa B1 kasama ang currency at halagang iyon
4. Awtomatikong hinaharap ng Stripe ang anumang kinakailangang conversion ng currency tungo sa payout currency ng iyong account

Kung palitan mo ang setting na **Currency** sa hinaharap, ang mga bagong handog ay gagamit ng bagong currency habang ang mga handog na naitala na ay mananatili sa kanilang currency, kaya maaaring maglaman ang iyong mga talaan ng higit sa isang currency.

### Manu-manong Pagpasok {#manual-entry}

Ang mga handog na inilagay mo nang mano-mano -- sa isang batch, gamit ang **Import CSV**, o gamit ang **Log a gift** sa record ng isang tao -- ay laging naitatala sa currency ng iyong simbahan, na ipinapakita sa tabi ng **Amount** field. Walang currency dropdown para sa manu-manong pagpasok, kaya i-convert muna sa currency ng iyong simbahan ang handog na ginawa sa ibang currency bago mo ito ilagay, at isulat ang orihinal na halaga sa **Notes** kung kakailanganin mo ito.

## Pagtingin sa Mga Donasyon sa Maraming Currency {#viewing-multi-currency-donations}

### Mga Donation Report {#donation-reports}

Ipinapakita ng mga indibidwal na linya ng donasyon -- sa isang batch, sa pahina ng fund, at sa giving history ng isang tao -- ang bawat handog sa currency kung saan ito naitala. Kino-convert ang mga pinagsamang kabuuan, gaya ng inilarawan sa ibaba.

### Converted Totals {#converted-totals}

Saanman magpakita ang B1 ng iisang pinagsamang kabuuan -- ang mga KPI card ng giving summary, kabuuan ng donation batch, at kabuuan ng isang fund -- ang mga donasyong naitala sa currency na iba sa default ng iyong simbahan ay kino-convert sa currency ng iyong simbahan gamit ang kasalukuyang exchange rate, para ang kabuuan ay isang makabuluhang numero at hindi pagdaragdag ng magkakaibang currency. May lalabas na note na **Converted at current exchange rates** sa ilalim ng kabuuan sa tuwing may na-apply na conversion. Ipinapakita pa rin sa orihinal na currency ang mga indibidwal na linya ng donasyon.

### Mga Giving Statement {#giving-statements}

Inililista ng mga giving statement ang halaga ng bawat handog gaya ng pagkakatala nito at dinadagdag ang mga halaga nang hindi kino-convert, kaya tumpak lamang ang statement kapag nasa currency ng iyong simbahan ang lahat ng handog ng donor sa taon. Kung nagbigay ang isang donor sa higit sa isang currency, suriin muna ang kanyang statement bago ito ipadala.

## Integrasyon sa Stripe {#stripe-integration}

Para sa online giving, hinahawakan ng Stripe ang mga multi-currency na transaksyon:

- **Awtomatikong conversion** -- kino-convert ng Stripe ang mga currency tungo sa default na currency ng iyong account
- **Exchange rate** -- gumagamit ang Stripe ng kasalukuyang market exchange rate
- **Bayarin** -- maaaring magkaroon ng karagdagang bayarin sa Stripe ang conversion ng currency
- **Payout currency** -- idinedeposito ang pondo sa default na currency ng iyong account

:::info
Tingnan ang iyong Stripe dashboard para makita ang kasalukuyang conversion rate at anumang bayarin na kaugnay ng multi-currency na transaksyon.
:::

## Mga Konsiderasyon sa Accounting {#accounting-considerations}

Kapag nakikitungo sa maraming currency:

- **Pagtatala** -- Itala ang orihinal na halaga at currency ng donasyon para sa tumpak na pag-uulat
- **Exchange rate** -- Tandaang maaaring magkaiba ang conversion rate ng Stripe sa rate ng iyong bangko
- **Mga resibo ng buwis** -- Kumonsulta sa iyong accountant kung paano iuulat ang mga donasyong nasa iba't ibang currency para sa layuning buwis
- **Paglalaan ng fund** -- Maaari mong ilaan ang mga donasyon sa partikular na mga fund anuman ang currency

## Mga Pinakamahusay na Gawi {#best-practices}

- **Default na currency** -- Itakda ang pangunahing currency ng simbahan sa ilalim ng **Settings > Giving** para ang mga manu-manong inilagay na handog at kabuuan ng giving ay gumamit nito
- **Malinaw na komunikasyon** -- Sabihin sa mga donor kung anong currency ang ibibigay nila habang nasa proseso ng checkout
- **Pare-parehong pag-uulat** -- Awtomatikong kino-convert sa currency ng iyong simbahan ang mga pinagsamang kabuuan; magbukas ng batch o fund para makita ang orihinal na halaga at currency ng bawat handog
- **Regular na reconciliation** -- I-reconcile ang mga Stripe payout sa iyong mga talaan ng donasyon, kasama ang mga conversion ng currency

## Mga Limitasyon {#limitations}

- Ang conversion ng currency para sa pagproseso ng bayad ay hawak ng Stripe para sa online giving lamang; ang manu-manong donasyon ay naitatala sa currency ng simbahan gaya ng pagkakalagay
- Palaging ipinapakita ng mga makasaysayang ulat at indibidwal na linya ng donasyon ang orihinal na currency kung saan naitala ang handog
- Ang mga pinagsamang kabuuan (KPI card, kabuuan ng batch, kabuuan ng fund) ay kino-convert sa currency ng iyong simbahan gamit ang kasalukuyang exchange rate -- maaaring bahagyang magkaiba ang mga rate na ito sa rate ng iyong bangko o Stripe sa oras ng pag-settle ng pondo

## Mga Kaugnay na Artikulo {#related-articles}

- [Online Giving Setup](./online-giving-setup.md) -- I-configure ang Stripe para sa pagtanggap ng donasyon
- [Recording Donations](./recording-donations.md) -- Manu-manong ilagay ang mga talaan ng donasyon
- [Donation Reports](./donation-reports.md) -- Gumawa at tingnan ang mga buod ng donasyon
- [Giving Statements](./giving-statements.md) -- Gumawa ng taunang giving statement
