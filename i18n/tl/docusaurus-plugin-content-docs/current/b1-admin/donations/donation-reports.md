---
title: "Mga Ulat sa Donasyon"
---

# Mga Ulat sa Donasyon

<div class="article-intro">

Ang B1 Admin ay nagbibigay sa iyo ng ilang mga paraan upang tingnan at suriin ang data ng pagbibigay ng iyong simbahan. Ang Donations Summary page ay nagbibigay ng isang visual overview na may mga chart at filter, habang ang Reports section ay nag-aalok ng isang mas detalyadong Donation Summary report. Gamitin ang mga tool na ito upang subaybayan ang mga uso sa pagbibigay, maghanda para sa mga pagpupulong ng board, o magsama ng iyong mga talaan.

</div>

<div class="prereqs">
<h4>Bago ka magsimula</h4>

- Tiyakin na ang mga donasyon ay [naitala sa mga batch](recording-donations.md) o [na-import mula sa Stripe](stripe-import.md)
- Suriin na ang iyong [funds](funds.md) ay na-setup nang tama upang ang mga donasyon ay maayos na naka-kategorya

</div>

## Dashboard ng Pagbibigay

Ang **Giving Dashboard** ay ang unang bagay na nakikita mo kapag binuksan mo ang seksyon ng **Donations**. Ito ay nagbibigay ng mataas na antas na paningin ng iyong aktibidad ng pagbibigay na may mga pangunahing tagapagpahiwatig ng pagganap.

1. Buksan ang **section menu** sa itaas na sulok sa kaliwa at piliin ang **Donations** upang buksan ang dashboard.
2. Sa tuktok, apat na **KPI cards** ay nagpapakita ng iyong mga sukatan ng pagbibigay sa isang sulyap:
   - **Total Giving** -- Ang kabuuang halaga ng na-donate sa napiling panahon.
   - **Average Gift** -- Ang average na halaga ng donasyon.
   - **Unique Donors** -- Ang bilang ng mga natatanging tao na nagbigay.
   - **Total Donations** -- Ang kabuuang bilang ng mga indibidwal na donasyon.
3. Gamitin ang **period toggle** upang lumipat sa pagitan ng **Weekly**, **Monthly**, at **Quarterly** na mga paninindigan.
4. Sa ibaba ng KPIs, isang chart ay nagpapakita ng mga uso sa pagbibigay para sa napiling panahon.
5. I-click ang **Download** upang mag-export ng CSV file na may kabuuang halaga ng pagbibigay.

Kung ang mga donasyon sa panahon ay ibinigay sa higit sa isang currency, ang kabuuan ng KPI ay kinukonberto sa iyong currency ng simbahan at isang notang **Converted at current exchange rates** ay lumilitaw sa ibaba ng mga kard. Makita ang [Multi-Currency Support](./multi-currency.md#converted-totals) para sa mga detalye.

## Mga Lapsed na Nag-ibigay

Ang tab na **Lapsed Givers** sa tabi ng dashboard ay naglalista ng mga taong nagbigay sa isang panahon ngunit hindi pa. Sa default ito ay inihahambing ang nakaraang taon ng kalendaryo na may ngayong taon hanggang sa kasalukuyan; baguhin ang kahit na saklaw ng petsa upang palawakin o paliitin ang paghahanap. Bawat hilera ay nagpapakita ng tao, ang petsa ng kanilang huling regalo at ang kanilang kabuuan para sa mas maaga na panahon, at ang **Export** ay nag-download ng listahan bilang CSV para sa isang follow-up mailing o call list.

## Pahina ng Donation Summary

Ang **Summary** page ay nagbibigay ng mas detalyadong aggregate data ng pagbibigay.

1. Buksan ang **section menu** sa itaas na sulok sa kaliwa at piliin ang **Donations** upang buksan ang Summary page.
2. Gamitin ang **date range filter** upang pumili ng panahon na nais mong suriin. Itakda ang mas maagap na petsa sa tuktok at ang mas kamakailang petsa sa ibaba.
3. Ang pahina ay nagpapakita ng chart ng pagbibigay bawat linggo upang makita mo ang mga uso sa isang sulyap.
4. I-click ang **Download** upang mag-export ng CSV file na may kabuuang halaga na ibinigay, ang linggo na ibinigay, at ang fund na ibinigay.

:::info
Ang Summary page ay nagpapakita ng aggregate data ng pagbibigay. Hindi ito kasama ang mga pangalang nag-iindibidwal na nag-ibigay. Para sa mga detalye sa antas ng donor, gamitin ang [Batches](batches.md) page.
:::

## Pagsusuri ng Detalye sa Antas ng Nag-donor

Para sa isang breakdown kung sino ang nagbigay, magkano, at sa anong fund:

1. Mag-navigate sa **Donations > Batches**.
2. I-click ang **batch name** upang buksan ito.
3. Ang batch detail page ay naglalista ng bawat donasyon na may pangalan ng donor, halaga, fund, petsa, at paraan ng pagbabayad.
4. I-click ang **pangalan ng donor** upang makita ang isang breakdown kung gaano karaming beses sila nagbigay at kung gaano kalaki ang bawat oras.
5. I-click ang **donation ID** upang buksan ang isang side panel na may buong mga detalye para sa indibidwal na donasyon.
6. I-click ang **Download** upang mag-export ng CSV na may lahat ng impormasyon ng donor at donasyon para sa batch na iyon.

## Donation Summary Report

Ang umuulat ng donasyon ay direktang nakabalot sa seksyon ng Donations -- ang Summary page ay nagsisilbing iyong ulat sa donasyon na pagbubuod:

1. Buksan ang **section menu** sa itaas na sulok sa kaliwa at piliin ang **Donations** upang buksan ang Summary page.
2. Gamitin ang **date range filter** upang pumili ng panahon na nais mong iulat.
3. I-click ang **Download** upang mag-export ng ulat bilang CSV file.

## Pag-export ng Data

Maaari mong i-export ang data ng donasyon mula sa maraming lugar:

- **Summary page** -- mag-download ng CSV ng weekly na kabuuan ng pagbibigay ayon sa fund
- **Batch detail page** -- mag-download ng CSV ng mga indibidwal na donasyon na may mga detalye ng donor
- **Funds detail page** -- mag-download ng kasaysayan ng donasyon para sa isang tiyak na fund

:::tip
Para sa umuulat sa pagtatapos ng taon, pagsama ang Summary page export gamit ang tool na [Giving Statements](giving-statements.md) upang makakuha ng parehong aggregate trends at mga indibidwal na statement ng donor.
:::

## Mga Susunod na Hakbang

- Lumikha ng [Giving Statements](giving-statements.md) para sa iyong mga donor sa pagtatapos ng taon
- Suriin ang indibidwal na [batches](batches.md) upang tiyakin ang mga detalye ng donasyon
- Suriin ang [fund](funds.md) detail pages para sa mga breakdown ng pagbibigay ayon sa kategorya
