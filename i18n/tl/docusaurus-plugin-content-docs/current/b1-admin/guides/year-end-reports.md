---
title: "Gabay: Lumikha ng Year-End Giving Reports"
---

# Lumikha ng Year-End Giving Reports

<div class="article-intro">

Dumaan sa proseso ng taon-taon ng pag-finalize ng iyong mga record ng donation, pag-verify ng mga setting ng fund, at pagbuo ng mga tax-deductible giving statement para sa bawat donor. Ito ay karaniwang ginagawa sa simula ng Enero para sa nakaraang taon ng kalendaryo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- B1 Admin account na may financial access
- Mga donation na narekord sa buong taon (online sa pamamagitan ng Stripe at/o manually entered)
- Access sa iyong Stripe account kung tumatanggap ka ng online donations

</div>

## Hakbang 1: Ilunsad ang Panghuling Stripe Transactions

Siguraduhin na ang lahat ng online donations mula sa dulo ng taon ay nasa iyong sistema.

Sundin ang [Stripe Import](../donations/stripe-import.md) gabay upang:

1. Mag-navigate sa Donations > Batches > Stripe Import
2. Piliin ang date range na sumasaklaw sa dulo ng taon (hal., Disyembre 1 - Disyembre 31)
3. I-click ang Preview una upang suriin, pagkatapos ay Import Missing upang tapusin

:::warning
Patakbuhin ang import na ito bago lumikha ng mga statement. Ang anumang transaksyon na hindi mo na-import ay hindi lilitaw sa mga donor statement.
:::

## Hakbang 2: Suriin ang Mga Donation Reports

Patunayan ang iyong mga record bago lumikha ng mga statement.

Sundin ang [Donation Reports](../donations/donation-reports.md) gabay upang:

1. Suriin ang pahina ng donation summary para sa buong taon
2. Suriin ang mga kabuuan sa pamamagitan ng fund at ihambing ang iyong bank statements upang makuha ang anumang mga diskrepansya
3. Mag-click sa mga indibidwal na batch upang patunayan ang mga detalye sa antas ng donor kung kinakailangan

## Hakbang 3: Patunayan ang Fund Tax Status

Siguraduhin na ang setting na tax-deductible ng bawat fund ay tama upang ang mga statement ay tumpak.

Sundin ang [Funds](../donations/funds.md) gabay upang:

1. Buksan ang bawat fund at kumpirmahin ang setting na tax-deductible ay tama

:::info
Lamang ang mga donation sa mga fund na minarkahan bilang tax-deductible ay lilitaw sa mga giving statement. Kung ang isang fund ay dapat na tax-deductible ngunit hindi ito minarkahan, i-update ito bago lumikha ng mga statement.
:::

## Hakbang 4: Lumikha ng Mga Giving Statement

Lumikha ng mga opisyal na giving statement para sa iyong mga donor.

Sundin ang [Giving Statements](../donations/giving-statements.md) gabay upang:

1. Mag-navigate sa **Donations > Giving Statements**
2. Piliin ang taon mula sa dropdown at suriin ang mga istatistika ng summary
3. Piliin ang iyong pamamaraan ng pag-download:
   - **Download ZIP** -- mga indibidwal na CSV files, isa bawat donor
   - **Print All** -- printable view na may bawat statement sa isang bagong pahina

:::tip
Lumikha ng mga statement sa simula ng Enero habang ang mga record ay sariwa. Ito ay nagbibigay sa iyo ng oras upang makuha ang anumang mga isyu bago i-mail ang mga ito.
:::

## Hakbang 5: Ihatid sa mga Donor

Ihatid ang mga statement sa iyong mga donor.

1. I-print at i-mail ang mga statement, o i-email ang mga indibidwal na CSV sa mga donor
2. Ang mga miyembro ay maaari ding tingnan ang kanilang sariling kasaysayan ng pagbibigay at i-print ang mga statement mula sa [B1.church](../../b1-church/giving/donation-history.md) at ang [B1 Mobile app](../../b1-mobile/giving/donation-history.md)

## Tapos Ka Na!

Ang iyong mga year-end giving reports ay kumpleto. Ang mga donor ay may kanilang mga tax-deductible statement, at ang iyong mga record ng pinansyal ay natapos para sa taon.

## Mga Kaugnay na Artikulo

- [Stripe Import](../donations/stripe-import.md) -- ilunsad ang mga online transaction
- [Donation Reports](../donations/donation-reports.md) -- tingnan ang mga trend at kabuuan ng pagbibigay
- [Funds](../donations/funds.md) -- pamahalaan ang mga fund at mga setting na tax-deductible
- [Giving Statements](../donations/giving-statements.md) -- lumikha ng mga year-end statement
- [Recording Donations](../donations/recording-donations.md) -- manu-manong ipasok ang mga cash/check donations
- [Donation History (Web)](../../b1-church/giving/donation-history.md) -- miyembro ng self-service view
- [Set Up Online Giving Guide](./online-giving.md) -- paunang Stripe at giving setup
