---
title: "Mga Ulat ng Donasyon"
---

# Mga Ulat ng Donasyon

<div class="article-intro">

Nagbibigay ang B1 Admin ng iba't ibang paraan para tingnan at suriin ang giving data ng simbahan mo. Ang giving dashboard sa pahinang **Summary** ng Donations ay nagbibigay ng biswal na pangkalahatang-tanaw na may mga chart at filter, habang ang seksyong Reports ay nag-aalok ng mas detalyadong Donation Summary report. Gamitin ang mga tool na ito para subaybayan ang mga trend ng pagbibigay, maghanda para sa mga pulong ng lupon, o i-reconcile ang mga talaan mo.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Tiyaking ang mga donasyon ay [naitala na sa mga batch](recording-donations.md) o [na-import mula sa Stripe](stripe-import.md)
- I-verify na tama ang pagkaka-set up ng iyong mga [fund](funds.md) para maayos na maiuri ang mga donasyon

</div>

## Giving Dashboard

Ang giving dashboard ay ang tab na **Dashboard** ng pahinang **Summary**, ang unang pahinang makikita mo kapag binuksan ang seksyong **Donations**.

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), palawakin ang **Donations**, at i-click ang **Summary**. Magbubukas ang pahinang **Summary** sa tab na **Dashboard**.
2. Gamitin ang toggle na **Weekly**, **Monthly**, at **Quarterly** sa itaas ng ulat para piliin kung paano pagsasama-samahin ang mga handog.
3. Sa panel na **Filter Report**, itakda ang **Start Date** at **End Date** (bilang default, ang nakaraang taon hanggang kahapon) at opsyonal na pumili ng **Fund**, pagkatapos ay i-click ang **Run Report**. Awtomatikong tumatakbo ang ulat gamit ang mga default kapag nagbukas ang pahina.
4. Apat na **KPI card** ang nagpapakita ng mga sukatan ng pagbibigay para sa napiling saklaw:
   - **Total Giving** -- Ang kabuuang halagang naidonasyon.
   - **Average Gift** -- Ang karaniwang halaga ng donasyon.
   - **Unique Donors** -- Ang bilang ng mga natatanging taong nagbigay.
   - **Total Donations** -- Ang kabuuang bilang ng mga indibidwal na donasyon.
5. Sa ibaba ng mga KPI, may bar chart na nagpapakita ng pagbibigay kada linggo, buwan, o quarter, hinati ayon sa fund.
6. I-click ang **Download Options** at piliin ang **Summary** para mag-export ng CSV ng mga kabuuan ayon sa panahon at fund, o i-click ang print icon para i-print ang ulat. Lumalabas ang pangalan ng simbahan mo sa itaas ng na-print na ulat.

Kung ang mga donasyon sa panahong iyon ay ibinigay sa higit sa isang currency, kino-convert ang mga kabuuang KPI sa currency ng simbahan mo at may lalabas na paalalang **Converted at current exchange rates** sa ibaba ng mga card. Tingnan ang [Suporta sa Maraming Currency](./multi-currency.md#converted-totals) para sa mga detalye.

:::info
Ipinapakita ng dashboard ang pinagsama-samang giving data. Hindi nito kasama ang mga pangalan ng indibidwal na nagbigay. Para sa detalye sa antas ng nagbigay, gamitin ang pahina ng [Batches](batches.md).
:::

## Mga Lapsed Giver

Ang tab na **Lapsed Givers** sa tabi ng tab na **Dashboard** ay naglilista ng mga taong nagbigay sa isang panahon ngunit hindi na simula noon. Bilang default, inihahambing nito ang nakaraang taon sa kasalukuyang taon hanggang ngayon; baguhin ang alinmang saklaw ng petsa para palawakin o paliitin ang paghahanap. Ipinapakita ng bawat row ang tao, ang petsa ng huli nilang handog at ang kabuuan nila sa naunang panahon, at ang **Download Options > Summary** ay nagda-download ng listahan bilang CSV para sa follow-up na mailing o listahan ng tatawagan.

## Pagtingin sa Detalye sa Antas ng Nagbigay

Para sa detalye kung sino ang nagbigay, magkano, at para sa aling fund:

1. Pumunta sa **Donations > Batches**.
2. I-click ang **pangalan ng batch** para buksan ito.
3. Inililista ng pahina ng detalye ng batch ang bawat donasyon kasama ang pangalan ng nagbigay, halaga, fund, petsa, at paraan ng pagbabayad.
4. I-click ang **pangalan ng nagbigay** para makita ang detalye kung ilang beses siyang nagdonasyon at magkano sa bawat pagkakataon.
5. I-click ang **donation ID** para magbukas ng side panel na may buong detalye ng indibidwal na donasyong iyon.
6. I-click ang **Download** para mag-export ng CSV na may lahat ng impormasyon ng nagbigay at donasyon para sa batch na iyon.

## Donation Summary Report

Nakapaloob na mismo sa seksyong Donations ang pag-uulat ng donasyon -- ang pahinang Summary ang nagsisilbing donation summary report mo:

1. Sa Jump menu, piliin ang **Donations > Summary**.
2. Sa tab na **Dashboard**, itakda ang **Start Date** at **End Date** sa panel na **Filter Report** at i-click ang **Run Report**.
3. I-click ang **Download Options** at piliin ang **Summary** para i-export ang ulat bilang CSV file.

## Pag-export ng Data

Maaari kang mag-export ng donation data mula sa iba't ibang lugar:

- **Pahina ng Summary** -- mag-download ng CSV ng mga kabuuan ng pagbibigay kada linggo, buwan, o quarter at fund
- **Pahina ng detalye ng Batch** -- mag-download ng CSV ng mga indibidwal na donasyon kasama ang detalye ng nagbigay
- **Pahina ng detalye ng Funds** -- i-download ang kasaysayan ng donasyon para sa isang partikular na fund

:::tip
Para sa pag-uulat sa katapusan ng taon, pagsamahin ang export mula sa pahina ng Summary at ang tool na [Giving Statements](giving-statements.md) para makuha ang parehong pinagsama-samang trend at mga indibidwal na statement ng nagbigay.
:::

## Mga Susunod na Hakbang

- Gumawa ng [Giving Statements](giving-statements.md) para sa mga nagbigay mo sa katapusan ng taon
- Suriin ang mga indibidwal na [batch](batches.md) para i-verify ang detalye ng mga donasyon
- Tingnan ang mga pahina ng detalye ng [fund](funds.md) para sa hati ng pagbibigay ayon sa kategorya
