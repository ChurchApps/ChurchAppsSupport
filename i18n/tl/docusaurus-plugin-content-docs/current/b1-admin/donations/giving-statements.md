---
title: "Mga Giving Statement"
description: "Gumawa ng taunang giving statement para sa bawat donor sa B1 Admin, saka i-download bilang CSV file o i-print para ipadala sa koreo, kasama ang kabuuang maaaring ibawas sa buwis."
---

# Mga Giving Statement

<div class="article-intro">

Sa pagtatapos ng bawat taon, kailangan ng iyong mga donor ng buod ng kanilang mga donasyong maaaring ibawas sa buwis para sa kanilang talaan. Ginagawang madali ng B1 Admin ang pagbuo ng mga statement na ito para sa lahat ng donor nang sabay-sabay, na nakakatipid ng maraming oras ng manu-manong trabaho.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Tiyaking tama ang pagkakamarka ng iyong [mga pondo](funds.md) bilang **Tax Deductible** -- tanging mga donasyon sa mga pondong maaaring ibawas sa buwis ang lumalabas sa mga statement
- Tiyaking naitala na ang lahat ng donasyon [sa pamamagitan ng pagtatala](recording-donations.md) at na-import na ang mga online transaction [mula sa Stripe](stripe-import.md)

</div>

## Pagbubukas ng Giving Statements

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Donations**.
2. I-click ang **Giving Statements**. Bubukas ang pahinang **Batch Giving Statements**.

## Pagbuo ng mga Statement

1. Sa panel na **Select Year**, piliin ang **Year** mula sa dropdown. Maaari mong piliin ang kasalukuyang taon o alinman sa limang nakaraang taon.
2. Dinadala lamang ng pahina ang mga donasyong may petsa sa taong iyon (Enero 1 hanggang Disyembre 31), kaya mabilis itong bumubukas kahit maraming taon na ng kasaysayan ng pagbibigay ang iyong simbahan. Kapag pumili ka ng ibang taon, nire-refresh ang buod gamit ang mga donasyon ng taong iyon. Ipinapakita ng panel na **Summary** sa ibaba ng taon ang mga estadistika para sa taong iyon, kabilang ang:
   - **Total Donors** -- ang bilang ng mga taong nagbigay
   - **Total Donations** -- ang bilang ng indibidwal na tala ng donasyon
   - **Total Amount** -- ang pinagsamang halaga ng lahat ng ibinigay

## Pag-download ng mga Statement

Nagbibigay ang panel na **Download Options** ng dalawang paraan para maibigay ang mga statement sa iyong mga donor:

### I-download bilang CSV Files

Sa ilalim ng **Individual CSV Files**, i-click ang **Download ZIP** para i-download ang ZIP file na naglalaman ng hiwalay na CSV file para sa bawat donor. Kapaki-pakinabang ito kung gusto mong i-email nang isa-isa ang mga statement o i-import ang mga ito sa ibang sistema.

### I-print ang Lahat ng Statement

Sa ilalim ng **Printable Statements**, i-click ang **Print All** (ipinapakita ng button ang bilang ng mga statement) para buksan sa iyong browser ang isang naka-print na view ng statement ng bawat donor para sa napiling taon. Mula roon, gamitin ang print function ng iyong browser para ipadala sa printer. Nagsisimula ang bawat statement sa bagong pahina para handa nang tiklupin at ipadala sa koreo, at nakaayos ang mga statement ayon sa apelyido ng donor, pagkatapos ang unang pangalan.

Kung nag-upload ka ng **Light Background Logo** sa ilalim ng [Website > Appearance](../website/appearance.md), ipi-print ito sa gitna sa itaas ng bawat statement, sa itaas ng pamagat ng statement. Nalalapat ito sa **Print All**, sa statement ng isang donor kapag ini-print mula sa kanyang record, at sa mga statement na ini-print ng mga miyembro mismo mula sa pahinang **Giving** ng B1.church.

:::tip
Patakbuhin ang iyong mga statement nang maaga sa Enero habang sariwa pa ang iyong mga talaan. Siguraduhing tama ang pagkakamarka ng iyong mga pondo bilang tax-deductible bago bumuo ng mga statement -- tanging mga donasyon sa mga tax-deductible na pondo ang kasama.
:::

:::info
Tanging ang mga donasyong nakatalaga sa mga pondong may naka-enable na setting na **Tax Deductible** ang kasama sa giving statements. Kung hindi minarkahang tax-deductible ang isang pondo, hindi lalabas sa statement ang mga donasyon nito. Maaari mong pamahalaan ang setting na ito sa pahinang [Funds](funds.md).
:::

## Mga Format ng Resibo para sa Canada, Australia, at New Zealand

Maaaring lumipat ang mga simbahang nasa labas ng Estados Unidos sa opisyal na layout ng resibo ng kanilang bansa para sa statement. I-click ang **Statement format** sa itaas ng pahinang Giving Statements (o pumunta sa **Settings** at buksan ang seksyong **Giving**), at itakda ang **Statement Format** sa **Canada**, **Australia**, o **New Zealand**, pagkatapos punan ang mga field na lalabas: ang iyong registration number (CRA registration number, ABN, o NZ charity registration number), ang address ng iyong organisasyon, ang pangalan ng taong awtorisadong pumirma ng mga resibo, at para sa Canada, ang lungsod kung saan inilalabas ang mga resibo.

Dadalhin ng mga statement ang pananalitang inaasahan ng iyong tax authority (para sa Canada, "Official Receipt for Income Tax Purposes" na may CRA reference), numero ng resibo sa anyong `YEAR-DONORID`, ang kwalipikadong halaga na binibilang lamang mula sa mga tax-deductible na pondo, at hiwalay na linya para sa anumang regalong napunta sa mga pondong hindi maaaring ibawas sa buwis. Makikita ng mga donor ang parehong bloke ng resibo kapag ini-print nila ang sarili nilang statement mula sa B1.church.

## Ano ang Nakikita ng mga Miyembro sa B1.church {#what-members-see-in-b1church}

Kinokontrol din ng parehong seksyong **Giving** ng settings kung ano ang makikita ng mga miyembro sa sarili nilang giving page sa B1.church:

- **Member Giving History** ang pumipili kung aling mga taon ang makikita ng mga miyembro. Ang **All years** ang default. Ang **Through 2025** (o ibang taon) ay humihinto sa taong iyon, kaya hindi makakatingin o makakapag-print ang mga miyembro ng susunod na taon hanggang payagan mo ito. Gamitin ito para ipagpaliban ang kasalukuyang taon habang inaayos mo pa ang mga pagwawasto at refund. Ganap na inaalis ng **Hidden** ang giving history, taunang kabuuan, at pag-print ng statement. Maaari pa ring magbigay ang mga miyembro.
- **Giving Note** ay maikling mensaheng ipinapakita sa giving page at giving history ng miyembro, at nakaimprenta sa ibaba ng bawat giving statement, kasama ang mga statement na ini-print mo rito. Gamitin ito para sa mga bagay tulad ng iyong patakaran sa refund.

Binabago lang ng mga setting na ito ang nakikita ng mga miyembro. Maaari mo pa ring i-print ang anumang taon mula sa pahinang ito.

## Mga Susunod na Hakbang

Kung kailangan mong suriin ang mga detalye ng donasyon bago bumuo ng mga statement, bisitahin ang pahinang [Donation Reports](donation-reports.md) o tingnan ang mga indibidwal na [batch](batches.md).
