---
title: "Mga Giving Statement"
description: "Gumawa ng taunang giving statement para sa bawat donor sa B1 Admin, pagkatapos i-download ang mga ito bilang CSV file o i-print para ipadala sa koreo na may tax-deductible na kabuuan."
---

# Giving Statements {#giving-statements}

<div class="article-intro">

Sa pagtatapos ng bawat taon, kailangan ng iyong mga donor ng buod ng kanilang tax-deductible na giving para sa kanilang talaan. Ginagawang madali ng B1 Admin ang paggawa ng mga statement na ito para sa lahat ng donor nang sabay-sabay, na nakakatipid ng maraming oras sa manu-manong trabaho.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Tiyaking tama ang pagkakamarka ng iyong [mga fund](funds.md) bilang **Tax Deductible** -- tanging ang mga donasyon sa tax-deductible na fund ang lumalabas sa mga statement
- Siguraduhing naitala na ang lahat ng donasyon [sa pamamagitan ng pagtatala](recording-donations.md) at na-import na ang anumang online transaction [mula sa Stripe](stripe-import.md)

</div>

## Pagpunta sa Giving Statements {#accessing-giving-statements}

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas) at i-expand ang **Donations**.
2. I-click ang **Giving Statements**. Bubukas ang **Batch Giving Statements** page.

## Paggawa ng Mga Statement {#generating-statements}

1. Sa **Select Year** panel, piliin ang **Year** mula sa dropdown. Maaari mong piliin ang kasalukuyang taon o alinman sa limang nakaraang taon.
2. Tanging ang mga donasyong may petsa sa taóng iyon (Enero 1 hanggang Disyembre 31) ang kinukuha ng pahina, kaya mabilis itong bumubukas kahit maraming taon na ng kasaysayan ng giving ang iyong simbahan. Kapag pumili ka ng ibang taon, nire-refresh ang buod gamit ang mga donasyon ng taóng iyon. Ipinapakita ng **Summary** panel sa ibaba ng taon ang estadistika para sa taóng iyon, binibilang ang parehong handog na kasama sa mga statement (hindi kasama ang mga handog na para lamang sa non-deductible na fund):
   - **Total Donors** -- ang bilang ng mga taong nagbigay
   - **Total Donations** -- ang bilang ng indibidwal na talaan ng donasyon
   - **Total Amount** -- ang pinagsamang halaga ng kanilang giving

## Pag-download ng Mga Statement {#downloading-statements}

Nagbibigay ang **Download Options** panel ng dalawang opsyon para maibigay sa iyong mga donor ang kanilang mga statement:

### I-download bilang CSV Files {#download-as-csv-files}

Sa ilalim ng **Individual CSV Files**, i-click ang **Download ZIP** (ipinapakita ng button ang bilang ng mga file) para i-download ang ZIP file na naglalaman ng hiwalay na CSV file para sa bawat donor. Kapaki-pakinabang ito kung gusto mong i-email nang isa-isa ang mga statement o i-import ang mga ito sa ibang sistema.

### I-print ang Lahat ng Statement {#print-all-statements}

Sa ilalim ng **Printable Statements**, i-click ang **Print All** (ipinapakita ng button ang bilang ng mga statement) para buksan sa iyong browser ang printable na view ng statement ng bawat donor para sa napiling taon. Mula roon, gamitin ang print function ng iyong browser para ipadala ang mga ito sa printer. Nagsisimula ang bawat statement sa bagong pahina para handa nang tupiin at ipadala sa koreo, at nakaayos ang mga statement ayon sa apelyido ng donor, saka ayon sa unang pangalan.

Kung nag-upload ka ng **Light Background Logo** sa [Website > Appearance](../website/appearance.md), ito ay ipi-print sa gitna ng itaas ng bawat statement, sa itaas ng pamagat ng statement. Nalalapat ito sa **Print All**, sa statement ng isang donor na naka-print mula sa kanyang record, at sa mga statement na sariling iniimprenta ng mga miyembro mula sa **Giving** page ng B1.church.

:::tip
Patakbuhin ang iyong mga statement nang maaga sa Enero habang sariwa pa ang iyong mga talaan. Suriing mabuti na tama ang pagkakamarka ng iyong mga fund bilang tax-deductible bago gumawa ng mga statement -- tanging ang mga donasyon sa tax-deductible na fund ang kasama.
:::

:::info
Kasama sa mga giving statement ang mga donasyong nakatalaga lamang sa mga fund na naka-enable ang setting na **Tax Deductible**. Kung hindi markado ang isang fund bilang tax-deductible, hindi lilitaw sa statement ang mga donasyon nito. Maaari mong pamahalaan ang setting na ito sa pahinang [Funds](funds.md).
:::

## Mga Gift Memo sa Statement {#gift-memos-on-statements}

Inililista ng bawat statement ang bawat handog kasama ang petsa, paraan, fund, at halaga nito. Kapag may kahit isang handog sa statement na may **Memo**, idinadagdag ang column na **Memo** pagkatapos ng fund para makita ng donor kung para saan ang bawat handog. Ang mga statement na walang memo ay nananatili sa apat-na-column na layout. Ang **Notes** ng handog ay pang-loob lamang at hindi kailanman lumalabas sa statement. Kasama sa mga CSV file sa ZIP ang memo bilang huling column nito.

Para ilagay ang layunin sa statement, ilagay ito bilang **Memo** ng handog kapag [itinatala ang donasyon](recording-donations.md), o bigyan ito ng sariling [fund](funds.md) kung gusto mong ma-total ito nang hiwalay.

## Mga Format ng Resibo para sa Canada, Australia at New Zealand {#receipt-formats-for-canada-australia-and-new-zealand}

Maaaring lumipat ang mga simbahang nasa labas ng United States sa opisyal na layout ng resibo ng kanilang bansa. I-click ang **Statement format** sa itaas ng Giving Statements page (o pumunta sa **Settings** at buksan ang seksyong **Giving**), at itakda ang **Statement Format** (na nagsisimula sa **Standard**) sa **Canada - CRA official receipt**, **Australia**, o **New Zealand**, pagkatapos punan ang mga field na lalabas: ang iyong registration number (**CRA Registration Number**, **ABN**, o **NZ Charity Registration Number**), **Organization Address**, **Authorized Signatory Name**, at para sa Canada, ang **City of Issue**. I-click ang **Save**.

Pagkatapos, dadalhin ng mga statement ang wording na inaasahan ng iyong tax authority (para sa Canada, "Official Receipt for Income Tax Purposes" na may CRA reference), numero ng resibo sa anyong `YEAR-DONORID`, ang eligible na halaga na binibilang mula sa tax-deductible na fund lamang, at hiwalay na linya para sa anumang handog sa non-deductible na fund. Ganoon din ang resibong makikita ng mga donor kapag sila mismo ang nag-print ng kanilang statement mula sa B1.church.

## Ano ang Nakikita ng Mga Miyembro sa B1.church {#what-members-see-in-b1church}

Kinokontrol ng parehong seksyong **Giving** ng settings kung ano ang makikita ng mga miyembro sa sarili nilang giving page sa B1.church:

- Pinipili ng **Member Giving History** kung aling mga taon ang makikita ng mga miyembro. Ang **All years** ang default. Ang **Through 2025** (o anumang ibang taon) ay humihinto sa taong iyon, kaya hindi makikita o maipi-print ng mga miyembro ang mas huling taon hanggang payagan mo ito. Gamitin ito para pigilan muna ang kasalukuyang taon habang tinatapos mo ang mga pagwawasto at refund. Ganap na inaalis ng **Hidden** ang giving history, taunang kabuuan, at pag-print ng statement. Makakapagbigay pa rin ang mga miyembro.
- Ang **Giving Note** ay maikling mensaheng ipinapakita sa giving page at giving history ng miyembro, at ipinapi-print sa ibaba ng bawat giving statement, kasama ang mga statement na iniimprenta mo rito. Gamitin ito para sa mga bagay tulad ng iyong refund policy.

Mga pagbabago lamang sa nakikita ng mga miyembro ang ginagawa ng mga setting na ito. Maaari mo pa ring i-print ang anumang taon mula sa pahinang ito.

## Mga Susunod na Hakbang {#next-steps}

Kung kailangan mong suriin ang detalye ng donasyon bago gumawa ng mga statement, bisitahin ang pahinang [Donation Reports](donation-reports.md) o tingnan ang mga indibidwal na [batch](batches.md).
