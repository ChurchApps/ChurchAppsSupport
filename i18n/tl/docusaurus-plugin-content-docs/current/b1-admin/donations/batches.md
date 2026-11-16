---
title: "Mga Batch ng Donasyon"
description: "Pagsamahin ang mga handog sa mga donation batch sa B1 Admin, pagkatapos isara, i-print, o i-export ang bawat isa para magtugma ang mga kabuuan sa iyong bank deposit."
---

# Donation Batches {#donation-batches}

<div class="article-intro">

Pinagsasama-sama ng mga batch ang iyong mga donasyon para mas madaling subaybayan at i-reconcile. Ang karaniwang batch ay kumakatawan sa iisang koleksyon, gaya ng handog tuwing Linggo o espesyal na event. Nakakatulong ang paggamit ng mga batch para manatiling organisado at madaling i-verify na tumutugma ang iyong mga talaan sa aktwal na deposito.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing [na-set up mo na ang iyong mga fund](funds.md) para magagamit ang mga ito kapag nagtatala ng donasyon
- Kailangan mo ng permission na **View Donation Summaries**, **Edit Donations**, o **Enter Donations** para makita ang Batches page (tingnan ang [Sino ang Maaaring Magbago ng Batch](#who-can-change-a-batch))

</div>

## Ang Batches Page {#the-batches-page}

Kapag pumunta ka sa **Donations > Batches**, makikita mo ang listahan ng iyong mga batch. Ipinapakita ng bawat row ang:

- **Name** -- ang label na ibinigay mo sa batch
- **Date** -- ang petsa ng koleksyon
- **Donations** -- ang bilang ng indibidwal na donasyon sa batch
- **Total** -- ang pinagsamang halaga sa dolyar
- **Status** -- **Open** o **Closed** (tingnan ang [Pagsasara at Muling Pagbubukas ng Batch](#closing-and-reopening-a-batch))

Sa ibabaw ng listahan, may mga year button na nagpapakita lamang ng mga batch mula sa isang taon, o **All** para sa lahat ng batch. Katabi nila ang mga status button -- **All**, **Open**, at **Closed** -- na nagpapaliit ng listahan sa mga batch na ginagawa pa o sa mga natapos na. Magkasama ang dalawang filter, kaya maaari mong piliin ang **2026** at **Open** para makita ang mga bukas na batch ngayong taon. Isang linyang buod ang nagpapakita ng bilang ng mga batch, bilang ng mga handog, at kabuuang halaga para sa mga batch na ipinapakita.

## Paggawa ng Bagong Batch {#creating-a-new-batch}

1. I-click ang **Add Batch** sa itaas ng pahina.
2. Maglagay ng malinaw na pangalan (hal., "Sunday Offering - Feb 9"). Opsyonal ang pangalan, pero mas madaling hanapin ang batch kung malinaw ang pangalan nito.
3. Piliin ang petsa ng koleksyon. Nagsisimula ito sa petsa ngayon.
4. I-click ang **Save**.

Lalabas sa listahan ang bago mong batch, handa nang lagyan ng mga donasyon.

## Pagtatrabaho sa Mga Batch {#working-with-batches}

- **Tingnan ang mga donasyon** -- i-click ang pangalan ng batch para buksan ito at makita ang lahat ng indibidwal na donasyong nakapaloob dito. Mula roon, maaari kang magdagdag, mag-edit, o mag-alis ng donasyon, o i-click ang **Import CSV** para magdagdag ng maraming donasyon nang sabay-sabay mula sa spreadsheet (tingnan ang [Pag-import ng Donasyon mula sa CSV File](recording-donations.md#importing-donations-from-a-csv-file)).
- **I-edit ang detalye ng batch** -- i-click ang **Edit** button sa row ng batch (o ang **Edit Batch** sa itaas ng bukas na batch) para baguhin ang pangalan o petsa nito. Tanging ang may **Edit Donations** ang makakakita ng **Delete** doon; ang pagbura ng batch ay nag-aalis ng mga donasyong nasa loob nito, at kung ibubura mo ito mula sa sarili nitong page, babalik ka sa listahan ng Batches.
- **Pag-uri-uri** -- gamitin ang mga column header para i-sort ang mga batch ayon sa pangalan o petsa.
- **Export** -- i-click ang **Export** sa itaas ng pahina para i-download ang mga batch na ipinapakita bilang spreadsheet (CSV).
- **Mga pumalyang event** -- kung nag-ulat ang iyong payment gateway ng mga problema, may lalabas na **Failed events** button (kasama ang bilang ng hindi pa naaayos na event) sa itaas ng pahina. I-click ito para ipakita o itago ang listahan ng mga event sa ibaba ng mga batch.
- **Import mula sa Stripe** -- i-click ang **Import missing Stripe transactions** sa itaas ng pahina para buksan ang [Stripe Import](stripe-import.md) tool. Lumalabas lamang ang button na ito kapag Stripe ang giving gateway ng iyong simbahan.

## Sino ang Nagtala ng Bawat Handog {#who-entered-each-gift}

Bawat handog na nailagay sa batch ay nagpapakita ng **Entered by** at pangalan ng taong naglagay nito sa ilalim ng pangalan ng donor, para malaman mo kung sino ang nagtala nito nang walang signature sheet. Awtomatikong itinatala ito ng B1 mula sa sinumang naka-sign in, at hindi ito nagbabago kahit i-edit ang handog pagkatapos. Ang mga handog na dinala sa pamamagitan ng **Import CSV** ay nagpapakita ng taong nagsagawa ng import.

Ang mga online na handog, mga handog na idinagdag ng [Stripe Import](stripe-import.md) tool, at mga handog na naitala bago idinagdag ito noong Nobyembre 2026 ay walang ipinapakitang pangalan.

## Pagsasara at Muling Pagbubukas ng Batch {#closing-and-reopening-a-batch}

Kapag nabilang at nadeposito na ang isang batch, isara ito para manatiling eksakto ang mga donasyon nito gaya noong isinara mo ito.

1. Buksan ang batch.
2. I-click ang **Close Batch** sa itaas ng pahina.

Magbabago ang status chip sa tabi ng pangalan ng batch mula **Open** tungong **Closed**, ipapakita ng batch ang **Closed** sa **Status** column ng Batches page, at lalabas sa itaas ng batch ang paliwanag na sarado na ito. Habang sarado ang batch, makikita pa rin ito ng mga may **Enter Donations**, pero hindi nila maidadagdag, maeedit, o mabubura ang mga donasyon nito, at hindi rin nila mababago ang pangalan o petsa ng batch.

Para makapagbago muli, buksan ang batch at i-click ang **Reopen Batch**. Laging nagsisimulang bukas ang mga bagong batch.

:::info
Tanging ang may **Edit Donations** ang nakakakita ng mga button na **Close Batch** at **Reopen Batch**. Maaari pa rin silang magbago ng mga donasyon sa saradong batch kung kailangan ng pagwawasto, nang hindi ito binubuksang muli.
:::

## Sino ang Maaaring Magbago ng Batch {#who-can-change-a-batch}

Dalawang [role permission](../settings/roles-permissions.md) ang nagbibigay-daan sa isang tao na magtrabaho sa mga batch:

- **Edit Donations** -- buong access: magdagdag at magbura ng mga batch, isara at buksang muli ang mga ito, at magdagdag, mag-edit, o magbura ng alinmang donasyon, bukas man o sarado ang batch.
- **Enter Donations** -- para sa mga counting team at boluntaryong naglalagay ng handog. Maaari silang magdagdag ng mga batch at magdagdag, mag-edit, o magbura ng donasyon, pero habang bukas lamang ang batch. Hindi sila makakapagbura ng batch, makakapagsara o makakapagbukas muli, at hindi nila mababago ang mga handog na galing sa online giving.

Ang taong may **Enter Donations** pero walang **View Donation Summaries** ay makikitang **Donations** sa B1 Admin menu, na dumidiretso sa Batches page. Nakatago sa kanila ang **Summary**, **Funds**, **Campaigns**, at **Giving Statements**. Para mabuksan ang isang batch at makita ang mga donasyong nasa loob, kailangan din ng role ang **View Donations**.

:::tip
Karaniwang setup ang isang "Counting Team" role na may **Enter Donations** at **View Donations**, at isang treasurer na may **Edit Donations** na nagsasara ng bawat batch pagkatapos maayos ang deposito.
:::

## Pag-print ng Batch {#printing-a-batch}

Buksan ang batch at i-click ang **Print** sa itaas ng listahan ng donasyon para mag-print ng papel na kopya para sa iyong counting team o talaan ng deposito. Kasama sa printout ang:

- Ang letterhead ng iyong simbahan -- ang iyong logo (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka nito) na may pangalan ng simbahan sa ilalim -- pagkatapos ang pangalan ng batch at petsa ng batch
- Bawat donasyon sa batch, kasama ang pangalan ng donor, sino ang nagtala, paraan ng bayad, mga notes, petsa, at halaga (ang mga na-refund na handog ay may guhit at minarkahang refunded)
- **Fund Subtotals** -- ang kabuuang ibinigay sa bawat fund sa batch
- **Batch Total** -- ang pinagsamang halaga ng buong batch

Lumalabas lamang ang **Print** button kapag may kahit isang donasyon ang batch.

### Pag-print ng Maraming Batch nang Sabay-sabay {#printing-several-batches-at-once}

Para mag-print ng bawat batch mula sa isang panahon sa isang bagsakan -- halimbawa, lahat ng deposito noong nakaraang buwan -- i-click ang **Print** sa itaas ng **Batches** page, sa tabi ng **Export**. Magbubukas ang **Print Batches** page na may **Start Date** at **End Date** na tumutugma sa mga batch sa screen: Enero 1 hanggang Disyembre 31 ng taóng napili mo, o mula sa pinakaunang hanggang sa pinakahuling petsa ng batch kapag **All** ang napili. Palitan ang alinmang petsa para pumili ng ibang saklaw.

Bawat batch na may petsa sa loob ng saklaw (kasama ang start at end date) ay ipi-print ayon sa petsa, isang batch kada pahina, gamit ang parehong layout ng isahang batch na printout. Hindi isasama ang mga batch na walang donasyon, at kung walang batch sa saklaw na may donasyon, makikita mo ang "No batches with donations in this date range." I-click ang **Print** para buksan ang print dialog ng iyong browser, o ang **Close** para bumalik sa listahan ng batch.

## Pag-export ng Batch sa QuickBooks Online {#exporting-a-batch-to-quickbooks-online}

Buksan ang batch at i-click ang **Export for QuickBooks** para i-download ang batch bilang journal entry na maaaring i-import ng QuickBooks Online (**Settings > Import Data > Journal Entries**). Naglalaman ang file ng isang debit sa **Undeposited Funds** para sa kabuuan ng batch, at isang credit para sa bawat fund, gamit ang pangalan ng bawat fund bilang pangalan ng account. Hihilingin ng QuickBooks na itugma mo ang mga pangalang iyon sa iyong chart of accounts habang nag-i-import, kaya pangalanan ang iyong mga fund ayon sa pagpapangalan ng iyong bookkeeper sa mga income account, o i-map ang mga ito nang minsan lang sa pag-import.

:::tip
Pangalanan nang pare-pareho ang iyong mga batch para madaling hanapin ang mga ito sa hinaharap. Ang paglalagay ng petsa at uri ng koleksyon (hal., "Sunday AM - 2025-02-09") ay nagpapanatiling organisado ang iyong listahan habang lumalaki ito.
:::

## Mga Susunod na Hakbang {#next-steps}

Kapag mayroon ka nang batch, tingnan ang [Recording Donations](recording-donations.md) para matutunan kung paano magdagdag ng indibidwal na donasyon dito. Maaari mo ring [i-import ang mga transaksyon sa Stripe](stripe-import.md) para awtomatikong gumawa ng mga batch mula sa online giving.
