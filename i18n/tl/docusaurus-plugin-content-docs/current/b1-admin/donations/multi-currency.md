---
title: "Suporta sa Maraming Pera"
---

# Suporta sa Maraming Pera

<div class="article-intro">

Ang multi-currency feature ng B1 ay nagbibigay-daan sa inyong parokya na tumanggap at subaybayan ang mga donasyon sa iba't ibang pera. Ito ay partikular na kapaki-pakinabang para sa mga parokya na may mga international na miyembro, missionary, o maraming campus sa iba't ibang bansa.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng pahintulot upang pamahalaan ang mga donasyon. Tingnan ang [Mga Papel at Pahintulot](../people/roles-permissions.md) para sa mga detalye.
- I-setup ang inyong [online giving](./online-giving-setup.md) gamit ang Stripe, na sumusuporta sa multi-currency transactions.
- Maintindihan ang pangangailangan ng accounting ng inyong parokya para sa pagharap sa maraming pera.

</div>

## Pagpapagana ng Multi-Currency

Ang multi-currency support ay ngayon na naka-enable by default sa B1. Kapag na-enable na:

- Ang mga miyembro ay maaaring magbigay sa kanilang lokal na pera kapag nag-donate online
- Maaari ninyong manu-manually na mag-record ng mga donasyon sa anumang pera
- Ang mga ulat sa donasyon ay nagpapakita ng mga halaga sa kanilang orihinal na pera
- Ang Stripe ay awtomatikong nangangasiwang sa currency conversion para sa online giving

## Sinusuportadong mga Pera

Ang system ay sumusuporta sa lahat ng pangunahing mundo currencies, kasama ang:

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

Ang available currencies para sa online giving ay depende sa sinusuportadong currencies ng inyong Stripe account.

## Pag-record ng Mga Donasyon sa Iba't ibang Pera

### Online Donations

Kapag ang isang miyembro ay nag-donate online sa pamamagit ng Stripe:

1. Pumipili sila ng kanilang preferred currency sa checkout
2. Ang Stripe ay nagpoproseso ng pagbabayad sa pitung pera
3. Ang donasyon ay nire-record sa B1 kasama ang orihinal na currency amount
4. Ang Stripe ay awtomatikong nangangasiwang sa anumang kinakailangang currency conversion sa default currency ng inyong account

### Manual Entry

Upang mag-record ng cash o check donation sa ibang pera:

1. Mag-navigate sa **Donations** sa B1 Admin
2. I-click ang **Add Donation**
3. Pumili ng pera mula sa currency dropdown
4. Isulat ang halaga sa pitung pera
5. Kumpletuhin ang ibang detalye ng donasyon
6. I-click ang **Save**

## Pagtingin sa Multi-Currency Donations

### Donation Reports

Ang mga ulat sa donasyon ay nagpapakita ng mga halaga sa kanilang orihinal na pera:

- Ang mga indibidwal na donation records ay nagpapakita ng currency code (e.g., "$100.00 USD")
- Ang mga total ay kinakalkula per currency
- Maaari ninyong i-filter ayon sa tiyak na pera

### Giving Statements

Kapag gumagawa ng giving statements:

- Bawat donasyon ay lilitaw kasama ang orihinal na pera
- Ang mga total ay nahahati ayon sa pera
- Ang mga miyembro ay nakikita kung ano talaga ang kanilang ibinigay sa bawat pera

## Stripe Integration

Para sa online giving, ang Stripe ay nangangasiwang ng multi-currency transactions:

- **Awtomatikong conversion** -- Ang Stripe ay nagsasalin ng pera sa default currency ng inyong account
- **Exchange rates** -- Ang Stripe ay gumagamit ng mga kasalukuyang market exchange rates
- **Bayad** -- Ang currency conversion ay maaaring magdulot ng karagdagang bayad sa Stripe
- **Payout currency** -- Ang mga pondo ay idineposito sa default currency ng inyong account

:::info
Sumubaybay sa inyong Stripe dashboard upang makita ang kasalukuyang conversion rates at anumang bayad na nauugnay sa multi-currency transactions.
:::

## Accounting Considerations

Kapag nagtatrabaho sa maraming pera:

- **Record-keeping** -- Panatilihin ang bakas ng orihinal na donation amounts at currencies para sa tumpak na pag-ulat
- **Exchange rates** -- Tandaan na ang conversion rates ng Stripe ay maaaring magkaiba sa rates ng inyong bangko
- **Tax receipts** -- Kumunsulta sa inyong accountant tungkol sa paano mag-ulat ng mga donasyon sa iba't ibang pera para sa tax purposes
- **Fund allocation** -- Maaari ninyong ilaan ang mga donasyon sa tiyak na funds anuman ang pera

## Best Practices

- **Default currency** -- Itakda ang inyong pangunahing parokya currency bilang default para sa karamihan ng transactions
- **Clear communication** -- Sabihin sa mga donors kung anong pera ang kanilang ibinibigay sa proseso ng checkout
- **Consistent reporting** -- Magpasya kung dapat ba mag-ulat sa orihinal na pera o gumawa ng iisang pera para sa mga summary
- **Regular reconciliation** -- Tiyakin ang Stripe payouts kasama ang inyong donation records, na isinasaalang-alang ang currency conversions

## Limitations

- Ang currency conversion ay inangkop lamang ng Stripe para sa online giving
- Ang manual donations ay nire-record kung paano isinasulat nang walang automatic conversion
- Ang mga historical reports ay nagpapakita ng donations sa kanilang orihinal na pera
- Ang pagkalkula ng total ay ginagawa per-currency, hindi sa buong currencies

## Related Articles

- [Online Giving Setup](./online-giving-setup.md) -- I-configure ang Stripe para sa pagtanggap ng mga donasyon
- [Recording Donations](./recording-donations.md) -- Manu-manually na ipasok ang mga donation records
- [Donation Reports](./donation-reports.md) -- Lumikha at tingnan ang donation summaries
- [Giving Statements](./giving-statements.md) -- Lumikha ng year-end giving statements
