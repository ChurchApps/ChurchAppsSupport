---
title: "Mga Ulat ng Donasyon"
---

# Mga Ulat ng Donasyon

<div class="article-intro">

Nagbibigay ang B1 Admin ng ilang paraan para tingnan at suriin ang datos ng pagbibigay ng iyong simbahan. Nag-aalok ang giving dashboard sa **Summary** page ng donasyon ng visual na pangkalahatang-tanaw na may mga chart at filter, habang nagbibigay ang seksyong Reports ng mas detalyadong Donation Summary report. Gamitin ang mga kasangkapang ito para subaybayan ang mga trend ng pagbibigay, maghanda para sa board meeting, o i-reconcile ang iyong mga talaan.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Tiyaking naitala na ang mga donasyon [sa mga batch](recording-donations.md) o [na-import mula sa Stripe](stripe-import.md)
- Tiyaking tama ang pagkaka-set up ng [mga pondo](funds.md) para tama ang pagkakategorya ng mga donasyon

</div>

## Giving Dashboard

Ang giving dashboard ay ang **Dashboard** view ng **Summary** page, ang unang pahinang makikita mo kapag binuksan mo ang seksyong **Donations**.

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa ng B1 Admin), i-expand ang **Donations**, at i-click ang **Summary**. Bubukas ang **Summary** page sa **Dashboard** view. Nagpapalit ang **View** toggle sa kanang itaas sa pagitan ng **Dashboard** at **Lapsed Givers**.
2. Gamitin ang toggle na **Weekly**, **Monthly**, at **Quarterly** sa itaas ng ulat para piliin kung paano pinagpapangkat ang pagbibigay.
3. Sa **Filter Report** panel, itakda ang **Start Date** at **End Date** (bilang default, ang nakaraang taon hanggang kahapon) at opsyonal na pumili ng **Fund**, pagkatapos i-click ang **Run Report**. Awtomatikong tumatakbo ang ulat gamit ang mga default kapag bumukas ang pahina.
4. Apat na **KPI card** ang nagpapakita ng iyong mga sukatan sa pagbibigay para sa napiling saklaw:
   - **Total Giving** -- Ang kabuuang halagang naibigay.
   - **Average Gift** -- Ang karaniwang halaga ng donasyon.
   - **Unique Donors** -- Ang bilang ng magkakaibang taong nagbigay.
   - **Total Donations** -- Ang kabuuang bilang ng indibidwal na donasyon.
5. Sa ilalim ng mga KPI, ipinapakita ng bar chart ang pagbibigay bawat linggo, buwan, o quarter, hinati ayon sa pondo.
6. I-click ang **Download Options** at piliin ang **Summary** para mag-export ng CSV ng mga kabuuan ayon sa panahon at pondo, o i-click ang icon ng print para i-print ang ulat. Nasa gitnang itaas ng naka-print na ulat ang logo ng iyong simbahan (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nakapag-upload ka na nito) at pangalan nito. Gumagamit ang printout ng madilim na teksto at magaan na chart kahit naka-dark mode ka sa B1 Admin.

Kung ang mga donasyon sa panahon ay ibinigay sa higit sa isang currency, kino-convert ang mga KPI total sa currency ng iyong simbahan, at may lalabas na tala na **Converted at current exchange rates** sa ilalim ng mga card. Tingnan ang [Multi-Currency Support](./multi-currency.md#converted-totals) para sa mga detalye.

:::info
Ipinapakita ng dashboard ang pinagsamang datos ng pagbibigay. Hindi kasama rito ang mga pangalan ng indibidwal na donor. Para sa mga detalye sa antas ng donor, gamitin ang pahinang [Batches](batches.md).
:::

## Lapsed Givers

Piliin ang **Lapsed Givers** sa **View** toggle para ilista ang mga taong nagbigay noong isang panahon pero hindi na mula noon. Bilang default, ikinukumpara nito ang nakaraang taong kalendaryo sa taong ito hanggang sa kasalukuyan; palitan ang alinmang saklaw ng petsa para palawakin o paliitin ang paghahanap. Ipinapakita ng bawat row ang tao, ang petsa ng huli nilang regalo at ang kabuuan nila para sa naunang panahon, at dina-download ng **Download Options > Summary** ang listahan bilang CSV para sa follow-up na mailing o listahan ng tawag.

## Pagtingin sa Mga Detalye ng Donor

Para makita kung sino ang nagbigay, magkano, at para sa aling pondo:

1. Pumunta sa **Donations > Batches**.
2. I-click ang **pangalan ng batch** para buksan ito.
3. Inililista ng detalye ng batch page ang bawat donasyon kasama ang paraan nito (at numero ng tseke o huling digit ng card), pangalan ng donor, petsa, mga tala, at halaga, na may kabuuan sa ibaba.
4. I-click ang **Edit** sa row ng donasyon para buksan ang kumpletong detalye ng indibidwal na donasyong iyon, kasama ang pondo nito.
5. I-click ang **Export** sa itaas ng listahan para mag-download ng CSV na may lahat ng impormasyon ng donor at donasyon para sa batch na iyon.

## Ulat ng Buod ng Donasyon

Naka-built in sa seksyong Donations ang pag-uulat ng donasyon -- ang Summary page ang nagsisilbing iyong donation summary report:

1. Sa Jump menu, piliin ang **Donations > Summary**.
2. Sa **Dashboard** view, itakda ang **Start Date** at **End Date** sa **Filter Report** panel at i-click ang **Run Report**.
3. I-click ang **Download Options** at piliin ang **Summary** para i-export ang ulat bilang CSV file.

## Pag-export ng Datos

Maaari kang mag-export ng datos ng donasyon mula sa maraming lugar:

- **Summary page** -- mag-download ng CSV ng mga kabuuan ng pagbibigay ayon sa linggo, buwan, o quarter at pondo
- **Batch detail page** -- mag-download ng CSV ng mga indibidwal na donasyon kasama ang detalye ng donor
- **Funds detail page** -- mag-download ng kasaysayan ng donasyon para sa partikular na pondo

:::tip
Para sa taunang pag-uulat, pagsamahin ang export ng Summary page at ang kasangkapang [Giving Statements](giving-statements.md) para makuha ang parehong pinagsamang trend at mga statement ng indibidwal na donor.
:::

## Mga Susunod na Hakbang

- Gumawa ng [Giving Statements](giving-statements.md) para sa iyong mga donor sa katapusan ng taon
- Suriin ang mga indibidwal na [batch](batches.md) para i-verify ang mga detalye ng donasyon
- Tingnan ang mga detail page ng [pondo](funds.md) para sa breakdown ng pagbibigay ayon sa kategorya
