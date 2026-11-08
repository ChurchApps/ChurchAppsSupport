---
title: "Panduan: Gumawa ng mga Taunang Ulat ng Donasyon"
description: "Sa B1 Admin, tapusin ang mga rekord ng donasyon ng taon, suriin ang mga setting ng buwis ng pondo, at gumawa ng mga pahayag ng donasyong maaaring ibawas sa buwis para sa bawat donor."
---

# Gumawa ng mga Taunang Ulat ng Donasyon

<div class="article-intro">

Gabayan ka sa taunang proseso ng pagtatapos ng iyong mga rekord ng donasyon, pag-verify ng mga setting ng pondo, at pagbuo ng mga pahayag ng donasyong maaaring ibawas sa buwis para sa bawat donor. Karaniwan itong ginagawa sa unang bahagi ng Enero para sa nakaraang taon ng kalendaryo.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Account sa B1 Admin na may access sa pananalapi
- Mga donasyong naitala sa buong taon (online sa pamamagitan ng Stripe at/o manwal na inilagay)
- Access sa iyong Stripe account kung tumatanggap ka ng online na donasyon

</div>

## Hakbang 1: I-import ang Huling mga Transaksyon sa Stripe

Siguraduhing nasa iyong sistema ang lahat ng online na donasyon mula sa katapusan ng taon.

Sundin ang gabay na [Stripe Import](../donations/stripe-import.md) upang:

1. Pumunta sa Donations > Stripe Import
2. Pumili ng saklaw ng petsa na sumasaklaw sa katapusan ng taon (hal., Disyembre 1 - Disyembre 31)
3. I-click ang Preview muna upang suriin, pagkatapos ay Import Missing upang tapusin

:::warning
Patakbuhin ang import na ito bago gumawa ng mga pahayag. Ang anumang transaksyong hindi mo na-import ay hindi lilitaw sa mga pahayag ng donor.
:::

## Hakbang 2: Suriin ang mga Ulat ng Donasyon

I-verify na tama ang iyong mga rekord bago gumawa ng mga pahayag.

Sundin ang gabay na [Donation Reports](../donations/donation-reports.md) upang:

1. Suriin ang pahina ng buod ng donasyon para sa buong taon
2. Suriin ang kabuuan ayon sa pondo at ihambing ang mga ito sa iyong mga pahayag sa bangko upang mahuli ang anumang pagkakaiba
3. I-click ang mga indibidwal na batch upang i-verify ang mga detalye ng donor kung kinakailangan

## Hakbang 3: I-verify ang Katayuan ng Buwis ng Pondo

Tiyakin na tama ang setting ng bawat pondo na maaaring ibawas sa buwis upang maging tumpak ang mga pahayag.

Sundin ang gabay na [Funds](../donations/funds.md) upang:

1. Buksan ang bawat pondo at kumpirmahin na tama ang setting na maaaring ibawas sa buwis

:::info
Tanging mga donasyon sa mga pondong may markang maaaring ibawas sa buwis ang lilitaw sa mga pahayag ng donasyon. Kung dapat maibawas sa buwis ang isang pondo ngunit hindi ito minarkahan nang ganoon, i-update ito bago gumawa ng mga pahayag.
:::

## Hakbang 4: Gumawa ng mga Pahayag ng Donasyon

Gumawa ng opisyal na mga pahayag ng donasyon para sa iyong mga donor.

Sundin ang gabay na [Giving Statements](../donations/giving-statements.md) upang:

1. Pumunta sa **Donations > Giving Statements**
2. Piliin ang taon mula sa dropdown at suriin ang mga buod na estadistika
3. Piliin ang iyong paraan ng pag-download:
   - **Download ZIP** — hiwalay na mga CSV file, isa para sa bawat donor
   - **Print All** — naka-print na view na may bawat pahayag sa bagong pahina, kasama ang logo ng iyong simbahan sa itaas (kung nag-upload ka na nito)

:::tip
Gumawa ng mga pahayag nang maaga sa Enero habang sariwa pa ang mga rekord. Bibigyan ka nito ng panahon upang mahuli ang anumang problema bago ipadala ang mga ito.
:::

## Hakbang 5: Ipamahagi sa mga Donor

Iabot ang mga pahayag sa mga kamay ng iyong mga donor.

1. I-print at ipadala sa koreo ang mga pahayag, o i-email ang mga indibidwal na CSV sa mga donor
2. Maaari ring tingnan ng mga miyembro ang sarili nilang kasaysayan ng donasyon at i-print ang mga pahayag sa [B1.church o sa B1 App](../../b1-church/giving/donation-history.md)

## Tapos Ka Na!

Kumpleto na ang iyong mga taunang ulat ng donasyon. Nakuha na ng mga donor ang kanilang mga pahayag na maaaring ibawas sa buwis, at tapos na ang iyong mga rekord pinansyal para sa taon.

## Mga Kaugnay na Artikulo

- [Stripe Import](../donations/stripe-import.md) — mag-import ng mga online na transaksyon
- [Donation Reports](../donations/donation-reports.md) — tingnan ang mga trend at kabuuan ng donasyon
- [Funds](../donations/funds.md) — pamahalaan ang mga pondo at mga setting na maaaring ibawas sa buwis
- [Giving Statements](../donations/giving-statements.md) — gumawa ng mga taunang pahayag
- [Recording Donations](../donations/recording-donations.md) — manwal na ilagay ang mga donasyong cash/tseke
- [Donation History (Web)](../../b1-church/giving/donation-history.md) — view ng miyembro para sa sariling pamamahala
- [Set Up Online Giving Guide](./online-giving.md) — paunang setup ng Stripe at pagbibigay online
