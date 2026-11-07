---
title: "Mga Donation Batch"
description: "Pagsamahin ang handog sa donation batch sa B1 Admin, saka isara, i-print, o i-export ang bawat isa para tugma ang kabuuan sa bank deposit."
---

# Mga Donation Batch

<div class="article-intro">

Pinagsasama-sama ng mga batch ang iyong mga donasyon para mas madaling subaybayan at i-reconcile. Karaniwang kumakatawan ang isang batch sa isang koleksyon, gaya ng offering tuwing Linggo o espesyal na event. Nakakatulong ang paggamit ng batch para manatiling organisado at mas madaling i-verify na tugma ang iyong mga tala sa aktwal na deposito.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing [naitakda mo na ang iyong mga fund](funds.md) para magagamit ang mga ito sa pagtatala ng donasyon
- Kakailanganin mo ang permiso na **View Donation Summaries**, **Edit Donations**, o **Enter Donations** para makita ang pahina ng Batches (tingnan ang [Who Can Change a Batch](#who-can-change-a-batch))

</div>

## Ang Pahina ng Batches

Kapag pumunta ka sa **Donations > Batches**, makikita mo ang listahan ng iyong mga batch. Ipinapakita ng bawat row ang:

- **Name** -- ang label na ibinigay mo sa batch
- **Date** -- ang petsa ng koleksyon
- **Donations** -- ang bilang ng indibidwal na donasyon sa batch
- **Total** -- ang pinagsamang halagang pera
- **Status** -- **Open** o **Closed** (tingnan ang [Closing and Reopening a Batch](#closing-and-reopening-a-batch))

Sa itaas ng listahan, pinapayagan ka ng mga year button na ipakita lang ang mga batch ng isang taon, o lahat ng batch na **All**. Nagpapakita ang isang linyang buod ng bilang ng mga batch, bilang ng mga regalo, at kabuuang halaga para sa mga batch na ipinapakita.

## Paggawa ng Bagong Batch

1. I-click ang **Add Batch** sa itaas ng pahina.
2. Maglagay ng malinaw na pangalan (halimbawa, "Sunday Offering - Feb 9").
3. Piliin ang petsa ng koleksyon.
4. I-click ang **Save**.

Lalabas ang bago mong batch sa listahan, handa nang lagyan ng donasyon.

## Pagtatrabaho sa Mga Batch

- **Tingnan ang mga donasyon** -- i-click ang pangalan ng batch para buksan ito at makita ang lahat ng indibidwal na donasyong nasa loob. Mula roon, maaari kang magdagdag, mag-edit, o mag-alis ng donasyon, o i-click ang **Import CSV** para sabay-sabay na magdagdag ng maraming donasyon mula sa spreadsheet (tingnan ang [Importing Donations from a CSV File](recording-donations.md#importing-donations-from-a-csv-file)).
- **I-edit ang detalye ng batch** -- i-click ang butones na **Edit** sa row ng batch para baguhin ang pangalan o petsa nito. Tanging mga taong may **Edit Donations** ang maaaring magbura ng batch.
- **Pag-uuri** -- gamitin ang mga header ng column para ayusin ang mga batch ayon sa pangalan o petsa.
- **Export** -- i-click ang **Export** sa itaas ng pahina para i-download ang mga ipinapakitang batch bilang spreadsheet (CSV).
- **Mga nabigong event** -- kung may iniulat na problema ang iyong payment gateway, lalabas ang butones na **Failed events** (kasama ang bilang ng mga hindi pa nareresolba) sa itaas ng pahina. I-click ito para ipakita o itago ang listahan ng mga event sa ibaba ng mga batch.
- **Import mula sa Stripe** -- i-click ang **Import missing Stripe transactions** sa itaas ng pahina para buksan ang [Stripe Import](stripe-import.md) tool. Lumalabas lang ang butones na ito kapag Stripe ang giving gateway ng iyong simbahan.

## Sino ang Nagtala ng Bawat Regalo

Ang bawat regalong inilagay sa batch ay nagpapakita ng **Entered by** at pangalan ng tao sa ilalim ng pangalan ng donor, kaya malalaman mo kung sino ang naglagay nito nang walang signature sheet. Awtomatikong itinatala ito ng B1 mula sa kasalukuyang naka-sign in, at hindi nagbabago ito kahit i-edit ang regalo pagkatapos.

Ang mga online na regalo, mga regalong idinagdag ng [Stripe Import](stripe-import.md) tool, at mga regalong naitala bago idinagdag ang feature na ito noong Nobyembre 2026 ay hindi nagpapakita ng pangalan.

## Pagsasara at Muling Pagbubukas ng Batch {#closing-and-reopening-a-batch}

Kapag nabilang at nadeposito na ang isang batch, isara ito para manatiling eksakto ang mga donasyon nito gaya noong isinara mo ito.

1. Buksan ang batch.
2. I-click ang **Close Batch** sa itaas ng pahina.

Magbabago ang status chip sa tabi ng pangalan ng batch mula **Open** patungong **Closed**, ipapakita ng batch ang **Closed** sa column na **Status** sa pahina ng Batches, at may abisong magpapaliwanag sa itaas ng batch na sarado na ito. Habang sarado ang batch, makakakita pa rin nito ang mga taong may **Enter Donations**, pero hindi nila maidadagdag, mae-edit, o maaalis ang mga donasyon nito, at hindi rin nila mababago ang pangalan o petsa ng batch.

Para makapagbago muli, buksan ang batch at i-click ang **Reopen Batch**. Palaging nagsisimulang bukas ang mga bagong batch.

:::info
Tanging mga taong may **Edit Donations** ang nakakakita ng butones na **Close Batch** at **Reopen Batch**. Maaari pa rin nilang baguhin ang mga donasyon sa saradong batch kung may kailangang itama, nang hindi muna binubuksan ulit ang batch.
:::

## Sino ang Maaaring Magbago ng Batch {#who-can-change-a-batch}

Dalawang [role permission](../settings/roles-permissions.md) ang nagpapahintulot sa isang tao na magtrabaho sa mga batch:

- **Edit Donations** -- buong access: magdagdag at magbura ng batch, isara at buksan muli ang mga ito, at magdagdag, mag-edit, o magbura ng anumang donasyon, bukas man o sarado ang batch.
- **Enter Donations** -- para sa mga counting team at boluntaryong naglalagay ng mga offering. Makakagawa sila ng batch at makakapagdagdag, makakapag-edit, o makakapagbura ng donasyon, pero habang bukas lang ang batch. Hindi nila maaaring burahin ang batch, isara o buksan ang mga ito, o baguhin ang mga regalong dumating sa pamamagitan ng online giving.

Ang taong may **Enter Donations** pero walang **View Donation Summaries** ay makikitang **Donations** sa menu ng B1 Admin, na diretsong dadalhin sila sa pahina ng Batches. Nakatago sa kanila ang **Summary**, **Funds**, **Campaigns**, at **Giving Statements**. Para mabuksan ang isang batch at makita ang mga donasyon sa loob nito, kailangan din ng role ang **View Donations**.

:::tip
Karaniwang setup ang isang "Counting Team" na role na may **Enter Donations** at **View Donations**, at isang treasurer na may **Edit Donations** na nagsasara ng bawat batch matapos maayos ang reconciliation ng deposito.
:::

## Pag-print ng Batch

Buksan ang isang batch at i-click ang **Print** sa itaas ng listahan ng donasyon para mag-print ng papel na kopya para sa iyong counting team o mga tala ng deposito. Kasama sa printout ang:

- Ang letterhead ng iyong simbahan -- ang iyong logo (ang **Light Background Logo** mula sa [Website > Appearance](../website/appearance.md), kung nag-upload ka na nito) na may pangalan ng simbahan sa ilalim -- pagkatapos ang pangalan ng batch at petsa ng batch
- Bawat donasyon sa batch, kasama ang pangalan ng donor, sino ang naglagay nito, paraan, mga tala, petsa, at halaga (ang mga ibinalik na regalo ay naka-cross out at minarkahang refunded)
- **Fund Subtotals** -- ang kabuuang ibinigay sa bawat fund sa batch
- **Batch Total** -- ang pinagsamang halaga ng buong batch

Lalabas lang ang butones na **Print** kapag may kahit isang donasyon ang batch.

### Pag-print ng Maraming Batch Nang Sabay

Para i-print ang bawat batch mula sa isang panahon nang sabay -- halimbawa, lahat ng deposito noong nakaraang buwan -- i-click ang **Print** sa itaas ng pahina ng **Batches**, sa tabi ng **Export**. Bubukas ang pahinang **Print Batches** na may **Start Date** at **End Date** na tumutugma sa mga batch sa screen: Enero 1 hanggang Disyembre 31 ng taong pinili mo, o mula sa pinakaunang hanggang sa pinakahuling petsa ng batch kapag napili ang **All**. Baguhin ang alinman sa dalawang petsa para pumili ng ibang saklaw.

Bawat batch na may petsang nasa loob ng saklaw (kasama ang start at end date) ay ipi-print ayon sa petsa, isang batch bawat pahina, gamit ang parehong layout ng single-batch printout. Hindi isasama ang mga batch na walang donasyon, at kung wala sa lahat ng batch sa saklaw ang may donasyon, makakakita ka ng "No batches with donations in this date range." I-click ang **Print** para buksan ang print dialog ng iyong browser, o ang **Close** para bumalik sa listahan ng batch.

## Pag-export ng Batch sa QuickBooks Online

Buksan ang batch at i-click ang **Export for QuickBooks** para i-download ang batch bilang journal entry na maaaring i-import ng QuickBooks Online (**Settings > Import Data > Journal Entries**). Naglalaman ang file ng isang debit sa **Undeposited Funds** para sa kabuuan ng batch, at isang credit bawat fund, gamit ang pangalan ng bawat fund bilang pangalan ng account. Hihilingin ng QuickBooks na itugma mo ang mga pangalang iyon sa iyong chart of accounts habang nag-i-import, kaya pangalanan ang iyong mga fund ayon sa pagpapangalan ng iyong bookkeeper sa mga income account, o i-map ang mga ito nang isang beses sa pag-import.

:::tip
Pangalanan nang pare-pareho ang iyong mga batch para madaling mahanap sa hinaharap. Ang pagsama ng petsa at uri ng koleksyon (halimbawa, "Sunday AM - 2025-02-09") ay nagpapanatiling organisado ang iyong listahan habang lumalaki ito.
:::

## Mga Susunod na Hakbang

Kapag mayroon ka nang batch, tingnan ang [Recording Donations](recording-donations.md) para matutunan kung paano magdagdag ng indibidwal na donasyon dito. Maaari ka ring [mag-import ng Stripe transactions](stripe-import.md) para awtomatikong gumawa ng mga batch mula sa online giving.
