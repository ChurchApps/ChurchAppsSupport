---
title: "Mga Ulat ng Donasyon"
description: "Suriin ang mga kabuuan ng giving, lapsed na donor, at detalye sa antas ng batch sa B1 Admin gamit ang Donations Summary dashboard, Lapsed Givers view, at mga CSV export."
---

# Mga Ulat ng Donasyon

<div class="article-intro">

Nagbibigay ang B1 Admin ng ilang paraan para tingnan at suriin ang datos ng giving ng iyong simbahan. Ang giving dashboard sa **Summary** page ng Donations ay nagbibigay ng visual na pangkalahatang-tanaw na may mga chart at filter, habang ang Reports section ay may mas detalyadong Donation Summary report. Gamitin ang mga kasangkapang ito para subaybayan ang mga trend ng giving, maghanda para sa board meeting, o i-reconcile ang iyong mga talaan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing naitala na ang mga donasyon [sa mga batch](recording-donations.md) o [na-import mula sa Stripe](stripe-import.md)
- Tiyaking tama ang pagkaka-set up ng iyong [mga fund](funds.md) para tama ang pagkakategorya ng mga donasyon

</div>

## Giving Dashboard {#giving-dashboard}

Ang giving dashboard ay ang **Dashboard** view ng **Summary** page, ang unang pahinang makikita mo kapag binuksan mo ang seksyong **Donations**.

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin), i-expand ang **Donations**, at i-click ang **Summary**. Bubukas ang **Summary** page sa **Dashboard** view. Lumilipat ang **View** toggle sa kanang itaas sa pagitan ng **Dashboard** at **Lapsed Givers**.
2. Gamitin ang toggle na **Weekly**, **Monthly**, at **Quarterly** sa itaas ng report para piliin kung paano pinagpapangkat ang giving.
3. Sa **Filter Report** panel, itakda ang **Start Date** at **End Date** (bilang default, mula nakaraang taon hanggang kahapon) at opsyonal na pumili ng **Fund**, pagkatapos i-click ang **Run Report**. Awtomatikong tumatakbo ang report gamit ang mga default kapag nagbukas ang pahina.
4. Apat na **KPI card** ang nagpapakita ng iyong mga sukatan ng giving para sa napiling saklaw:
   - **Total Giving** -- Ang kabuuang halagang naidonate.
   - **Average Gift** -- Ang average na halaga ng donasyon.
   - **Unique Donors** -- Ang bilang ng magkakaibang taong nagbigay.
   - **Total Donations** -- Ang kabuuang bilang ng indibidwal na donasyon.
5. Sa ibaba ng mga KPI, ipinapakita ng bar chart ang giving kada linggo, buwan, o quarter, hinati ayon sa fund.
6. I-click ang **Download Options** at piliin ang **Summary** para mag-export ng CSV ng mga kabuuan kada panahon at fund, o i-click ang print icon para i-print ang report. Lumalabas sa gitna ng itaas ng naprintang report ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka nito) at pangalan. Gumagamit ang printout ng madilim na teksto at magaan na chart kahit naka-dark mode ka sa B1 Admin.

Kung nasa higit sa isang currency ang mga donasyon sa panahon, kino-convert sa currency ng iyong simbahan ang mga KPI total at may lalabas na note na **Converted at current exchange rates** sa ilalim ng mga card. Tingnan ang [Multi-Currency Support](./multi-currency.md#converted-totals) para sa mga detalye.

:::info
Pinagsamang datos ng giving ang ipinapakita ng dashboard. Hindi kasama rito ang mga pangalan ng indibidwal na donor. Para sa mga detalye sa antas ng donor, gamitin ang pahina ng [Batches](batches.md).
:::

## Lapsed Givers {#lapsed-givers}

Piliin ang **Lapsed Givers** sa **View** toggle para ilista ang mga taong nagbigay sa isang panahon pero hindi na mula noon. Bilang default, ikinukumpara nito ang nakaraang kalendaryong taon sa taon hanggang ngayon; palitan ang **Previous Period Start**, **Previous Period End**, **Current Period Start**, o **Current Period End** sa **Filter Report** panel at i-click ang **Run Report** para palawakin o paliitin ang paghahanap. Kailangan ng view na ito ang permission na **View Donations**. Ipinapakita ng bawat row ang tao, petsa ng huli nilang handog at kabuuan para sa naunang panahon, at dina-download ng **Download Options > Summary** ang listahan bilang CSV para sa follow-up na mailing o listahan ng tatawagan.

## Pagtingin sa Mga Detalye ng Donor {#viewing-donor-level-details}

Para sa breakdown kung sino ang nagbigay, magkano, at para sa aling fund:

1. Pumunta sa **Donations > Batches**.
2. I-click ang **pangalan ng batch** para buksan ito.
3. Inililista ng batch detail page ang bawat donasyon kasama ang paraan nito (at check number o huling digit ng card), pangalan ng donor, petsa, mga tala, at halaga, kasama ang kabuuan sa ibaba.
4. I-click ang **Edit** sa row ng donasyon para buksan ang kumpletong detalye ng indibidwal na donasyong iyon, kasama ang fund nito.
5. I-click ang **Export** sa itaas ng listahan para i-download ang CSV na may lahat ng impormasyon ng donor at donasyon sa batch na iyon.

## Donation Summary Report {#donation-summary-report}

Nakapaloob na sa seksyong Donations ang pag-uulat ng donasyon -- ang Summary page ang nagsisilbing iyong donation summary report:

1. Sa Jump menu, piliin ang **Donations > Summary**.
2. Sa **Dashboard** view, itakda ang **Start Date** at **End Date** sa **Filter Report** panel at i-click ang **Run Report**.
3. I-click ang **Download Options** at piliin ang **Summary** para i-export ang report bilang CSV file.

## Pag-export ng Datos {#exporting-data}

Maaari kang mag-export ng datos ng donasyon mula sa maraming lugar:

- **Summary page** -- i-download ang CSV ng mga kabuuan ng giving kada linggo, buwan, o quarter at fund
- **Batch detail page** -- i-download ang CSV ng indibidwal na donasyon kasama ang detalye ng donor
- **Funds detail page** -- i-download ang kasaysayan ng donasyon para sa partikular na fund

:::tip
Para sa year-end na pag-uulat, pagsamahin ang export ng Summary page sa [Giving Statements](giving-statements.md) tool para makuha ang parehong pinagsamang trend at indibidwal na statement ng donor.
:::

## Mga Susunod na Hakbang {#next-steps}

- Gumawa ng [Giving Statements](giving-statements.md) para sa iyong mga donor sa katapusan ng taon
- Suriin ang bawat [batch](batches.md) para i-verify ang detalye ng donasyon
- Tingnan ang mga [fund](funds.md) detail page para sa breakdown ng giving kada kategorya
