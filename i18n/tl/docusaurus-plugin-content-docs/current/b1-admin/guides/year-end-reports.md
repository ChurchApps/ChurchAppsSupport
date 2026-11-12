---
title: "Gabay: Gumawa ng Year-End Giving Report"
description: "Sa B1 Admin, tapusin ang mga talaan ng donasyon ng taon, suriin ang mga tax setting ng pondo, at gumawa ng mga tax-deductible na giving statement para sa bawat donor."
---

# Gumawa ng Year-End Giving Report

<div class="article-intro">

Dumaan sa proseso ng year-end para tapusin ang iyong mga talaan ng donasyon, i-verify ang mga setting ng pondo, at gumawa ng mga tax-deductible na giving statement para sa bawat donor. Karaniwang ginagawa ito sa unang bahagi ng Enero para sa nakaraang taong kalendaryo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- B1 Admin account na may financial access
- Mga donasyong naitala sa buong taon (online sa pamamagitan ng Stripe at/o manu-manong inilagay)
- Access sa iyong Stripe account kung tumatanggap ka ng online na donasyon

</div>

## Hakbang 1: I-import ang Huling mga Transaksyon sa Stripe {#step-1-import-final-stripe-transactions}

Siguraduhing nasa iyong sistema na ang lahat ng online na donasyon mula sa katapusan ng taon.

Sundin ang gabay na [Stripe Import](../donations/stripe-import.md) para:

1. Sa [Jump menu](../introduction.md#getting-around-with-the-jump-menu), piliin ang **Donations > Stripe Import** (lumalabas lang ito kapag Stripe ang iyong giving provider)
2. Itakda ang **Start Date** at **End Date** para masakop ang katapusan ng taon (hal., Disyembre 1 - Disyembre 31)
3. I-click muna ang **Preview** para suriin, pagkatapos ay i-click ang **Import Missing** para tapusin

:::warning
Patakbuhin muna ang import na ito bago gumawa ng mga statement. Ang anumang transaksyong hindi mo na-import ay hindi lalabas sa mga statement ng donor.
:::

## Hakbang 2: Suriin ang mga Donation Report {#step-2-review-donation-reports}

I-verify na tama ang iyong mga talaan bago gumawa ng mga statement.

Sundin ang gabay na [Donation Reports](../donations/donation-reports.md) para:

1. Sa Jump menu, piliin ang **Donations > Summary**, itakda ang **Start Date** at **End Date** sa **Filter Report** para sa buong taon, at i-click ang **Run Report**
2. Suriin ang mga kabuuan kada pondo at ihambing sa iyong bank statement para mahuli ang anumang pagkakaiba. I-click ang **Download Options** at piliin ang **Summary** para sa CSV
3. Buksan ang mga indibidwal na batch sa ilalim ng **Donations > Batches** para i-verify ang mga detalye kada donor kung kailangan

## Hakbang 3: I-verify ang Tax Status ng Pondo {#step-3-verify-fund-tax-status}

Siguraduhing tama ang tax-deductible setting ng bawat pondo para tumpak ang mga statement.

Sundin ang gabay na [Funds](../donations/funds.md) para:

1. Sa Jump menu, piliin ang **Donations > Funds** at suriin ang **Tax Status** ng bawat pondo
2. I-click ang **Edit** sa isang pondo para baguhin ang setting nitong **Tax Deductible**

:::info
Tanging ang mga donasyon sa mga pondong minarkahang tax-deductible ang lalabas sa mga giving statement. Kung dapat tax-deductible ang isang pondo pero hindi ito minarkahan nang ganoon, i-update ito bago gumawa ng mga statement.
:::

## Hakbang 4: Gumawa ng mga Giving Statement {#step-4-generate-giving-statements}

Gumawa ng opisyal na mga giving statement para sa iyong mga donor.

Sundin ang gabay na [Giving Statements](../donations/giving-statements.md) para:

1. Sa Jump menu, piliin ang **Donations > Giving Statements**
2. Piliin ang **Year** at suriin ang mga summary statistic. Ang mga simbahan sa Canada, Australia, o New Zealand ay puwedeng i-click ang **Statement format** para lumipat sa opisyal na resibo layout ng kanilang bansa
3. Piliin ang paraan ng pag-download:
   - **Download ZIP** — mga indibidwal na CSV file, isa kada donor
   - **Print All** — printable na view na may bawat statement sa bagong pahina, at logo ng iyong simbahan sa itaas (kung nag-upload ka na nito)

:::tip
Gumawa ng mga statement nang maaga sa Enero habang sariwa pa ang mga talaan. Magkakaroon ka ng panahong ayusin ang anumang problema bago ipadala.
:::

## Hakbang 5: Ipamahagi sa mga Donor {#step-5-distribute-to-donors}

Ihatid ang mga statement sa mga kamay ng iyong mga donor.

1. I-print at i-mail ang mga statement, o i-email ang mga indibidwal na CSV sa mga donor
2. Puwede ring tingnan ng mga miyembro ang sarili nilang kasaysayan ng pagbibigay at i-print ang mga statement sa [B1.church o sa B1 App](../../b1-church/giving/donation-history.md)

## Tapos Ka Na! {#youre-done}

Kumpleto na ang iyong year-end giving report. Nakuha na ng mga donor ang kanilang tax-deductible na statement, at tapos na ang iyong mga talaang pinansyal para sa taon.

## Mga Kaugnay na Artikulo {#related-articles}

- [Stripe Import](../donations/stripe-import.md) — i-import ang mga online na transaksyon
- [Donation Reports](../donations/donation-reports.md) — tingnan ang mga trend at kabuuan ng pagbibigay
- [Funds](../donations/funds.md) — pamahalaan ang mga pondo at tax-deductible setting
- [Giving Statements](../donations/giving-statements.md) — gumawa ng year-end statement
- [Recording Donations](../donations/recording-donations.md) — manu-manong ilagay ang cash/check na donasyon
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — self-service na view para sa mga miyembro
- [Set Up Online Giving Guide](./online-giving.md) — paunang setup ng Stripe at giving
