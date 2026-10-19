---
title: "Mga Pahayag ng Donasyon"
---

# Mga Pahayag ng Donasyon

<div class="article-intro">

Sa pagtatapos ng bawat taon, kailangan ng iyong mga donor ng buod ng kanilang mga kontribusyong maaaring i-deduct sa buwis para sa kanilang mga tala. Pinapadali ng B1 Admin ang paggawa ng mga pahayag na ito para sa lahat ng donor nang sabay-sabay, na nakakatipid ng oras ng manu-manong trabaho.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Tiyaking tama ang pagkakamarka ng iyong [mga pondo](funds.md) bilang **Tax Deductible** -- tanging mga donasyon sa mga pondong maaaring i-deduct sa buwis ang lumalabas sa mga pahayag
- Tiyaking nai-[record](recording-donations.md) na ang lahat ng donasyon at naiangkat na mula sa [Stripe](stripe-import.md) ang anumang online transaction

</div>

## Pag-access sa mga Pahayag ng Donasyon

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Donations**.
2. I-click ang **Giving Statements**. Bubukas ang pahinang **Batch Giving Statements**.

## Paggawa ng mga Pahayag

1. Sa panel na **Select Year**, piliin ang **Year** mula sa dropdown. Maaari mong piliin ang kasalukuyang taon o alinman sa limang nakaraang taon.
2. Ni-load ng pahina ang mga donasyong may petsa lamang sa taong iyon (Enero 1 hanggang Disyembre 31), kaya mabilis itong bumubukas kahit maraming taon na ang kasaysayan ng donasyon ng iyong simbahan. Kapag pumili ka ng ibang taon, nire-refresh ang buod gamit ang mga donasyon ng taong iyon. Ipinapakita ng panel na **Summary** sa ilalim ng taon ang mga estadistika para sa taong iyon, kabilang ang:
   - **Total Donors** -- ang bilang ng mga taong nagbigay
   - **Total Donations** -- ang bilang ng indibidwal na tala ng donasyon
   - **Total Amount** -- ang pinagsamang halaga ng lahat ng donasyon

## Pag-download ng mga Pahayag

Ang panel na **Download Options** ay nagbibigay ng dalawang opsyon para maipadala ang mga pahayag sa iyong mga donor:

### I-download bilang CSV Files

Sa ilalim ng **Individual CSV Files**, i-click ang **Download ZIP** para mag-download ng ZIP file na naglalaman ng hiwalay na CSV file para sa bawat donor. Kapaki-pakinabang ito kung gusto mong i-email nang isa-isa ang mga pahayag o i-import ang mga ito sa ibang sistema.

### I-print ang Lahat ng Pahayag

Sa ilalim ng **Printable Statements**, i-click ang **Print All** (ipinapakita ng button ang bilang ng mga pahayag) para buksan sa browser mo ang isang printable na view ng pahayag ng bawat donor para sa napiling taon. Mula roon, gamitin ang print function ng iyong browser para ipadala ito sa printer. Nagsisimula ang bawat pahayag sa bagong pahina para handa nang tupiin at ipadala sa koreo, at nakaayos ang mga pahayag ayon sa apelyido ng donor, pagkatapos ay pangalan.

Kung nag-upload ka ng **Light Background Logo** sa ilalim ng [Website > Appearance](../website/appearance.md), ito ay ipi-print na nakasentro sa itaas ng bawat pahayag, sa ibabaw ng pamagat ng pahayag. Nalalapat ito sa **Print All** at sa pahayag ng isang donor na ipi-print mula sa kanyang record.

:::tip
Patakbuhin ang iyong mga pahayag nang maaga sa Enero habang sariwa pa ang mga record. Siguraduhing tama ang pagkakamarka ng iyong mga pondo bilang tax-deductible bago gumawa ng mga pahayag -- tanging mga donasyon sa mga pondong tax-deductible lamang ang kasama.
:::

:::info
Tanging mga donasyong nakatalaga sa mga pondong may naka-enable na setting na **Tax Deductible** ang kasama sa mga pahayag ng donasyon. Kung hindi nakamarka bilang tax-deductible ang isang pondo, hindi lalabas sa pahayag ang mga donasyon nito. Maaari mong pamahalaan ang setting na ito sa pahinang [Funds](funds.md).
:::

## Mga Format ng Resibo para sa Canada, Australia at New Zealand

Maaaring lumipat ang mga simbahang nasa labas ng Estados Unidos sa opisyal na layout ng resibo ng kanilang bansa. I-click ang **Statement format** sa itaas ng pahinang Giving Statements (o pumunta sa **Settings** at buksan ang seksyong **Giving**), at itakda ang **Statement Format** sa **Canada**, **Australia** o **New Zealand**. Pagkatapos, punan ang mga field na lalabas: ang iyong registration number (CRA registration number, ABN, o NZ charity registration number), ang address ng iyong organisasyon, ang pangalan ng taong awtorisadong pumirma ng mga resibo, at para sa Canada, ang lungsod kung saan inilalabas ang mga resibo.

Pagkatapos nito, ang mga pahayag ay magtataglay ng wording na inaasahan ng iyong tax authority (para sa Canada, "Official Receipt for Income Tax Purposes" na may CRA reference), isang numero ng resibo sa anyong `YEAR-DONORID`, ang karapat-dapat na halaga na binilang mula sa mga pondong tax-deductible lamang, at hiwalay na linya para sa anumang regalong napunta sa mga hindi tax-deductible na pondo. Makikita ng mga donor ang parehong bloke ng resibo kapag sila mismo ang nag-print ng kanilang pahayag mula sa B1.church.

## Susunod na Hakbang

Kung kailangan mong suriin ang mga detalye ng donasyon bago gumawa ng mga pahayag, bisitahin ang pahinang [Donation Reports](donation-reports.md) o tingnan ang mga indibidwal na [batch](batches.md).
