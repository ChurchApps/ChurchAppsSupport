---
title: "Mga Batch ng Donasyon"
---

# Mga Batch ng Donasyon

<div class="article-intro">

Pinapangkat ng mga batch ang iyong mga donasyon para mas madaling subaybayan at i-reconcile. Karaniwang kumakatawan ang isang batch sa iisang koleksyon, gaya ng handog sa Linggo o espesyal na event. Nakakatulong ang paggamit ng mga batch para manatiling maayos ang lahat at madali mong mapatunayang tugma ang iyong mga talaan sa aktwal na deposito.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing na-set up mo na ang [iyong mga pondo](funds.md) para magagamit ang mga ito kapag nagtatala ng donasyon
- Kailangan mo ng permiso na **View Donation Summaries**, **Edit Donations**, o **Enter Donations** para makita ang Batches page (tingnan ang [Sino ang Maaaring Magbago ng Batch](#who-can-change-a-batch))

</div>

## Ang Batches Page

Kapag pumunta ka sa **Donations > Batches**, makikita mo ang listahan ng iyong mga batch. Ipinapakita ng bawat row ang:

- **Name** -- ang label na ibinigay mo sa batch
- **Date** -- ang petsa ng koleksyon
- **Donations** -- ang bilang ng indibidwal na donasyon sa batch
- **Total** -- ang pinagsamang halaga sa dolyar
- **Status** -- **Open** o **Closed** (tingnan ang [Pagsasara at Muling Pagbubukas ng Batch](#closing-and-reopening-a-batch))

Sa itaas ng listahan, nagbibigay-daan ang mga button ng taon na ipakita lamang ang mga batch ng isang taon, o lahat ng batch sa **All**. Ipinapakita ng isang linyang buod ang bilang ng mga batch, bilang ng mga regalo, at kabuuang halaga para sa mga batch na nakikita.

## Paggawa ng Bagong Batch

1. I-click ang **Add Batch** sa itaas ng pahina.
2. Maglagay ng deskriptibong pangalan (hal., "Sunday Offering - Feb 9").
3. Piliin ang petsa ng koleksyon.
4. I-click ang **Save**.

Lalabas ang bago mong batch sa listahan, handa para sa pagdagdag ng mga donasyon.

## Pagtatrabaho sa mga Batch

- **Tingnan ang mga donasyon** -- i-click ang pangalan ng batch para buksan ito at makita ang lahat ng indibidwal na donasyong nakapaloob dito. Mula roon, maaari kang magdagdag, mag-edit, o mag-alis ng donasyon, o i-click ang **Import CSV** para magdagdag ng maraming donasyon nang sabay mula sa spreadsheet (tingnan ang [Pag-import ng mga Donasyon mula sa CSV File](recording-donations.md#importing-donations-from-a-csv-file)).
- **I-edit ang detalye ng batch** -- i-click ang button na **Edit** sa row ng batch para baguhin ang pangalan o petsa nito. Tanging mga may **Edit Donations** ang maaaring magbura ng batch.
- **Pag-uri-uriin** -- gamitin ang mga header ng column para pag-uriin ang mga batch ayon sa pangalan o petsa.
- **I-export** -- i-click ang **Export** sa itaas ng pahina para i-download ang mga batch na nakikita bilang spreadsheet (CSV).
- **Mga nabigong event** -- kung may iniulat na problema ang iyong payment gateway, lalabas sa itaas ng pahina ang button na **Failed events** (kasama ang bilang ng mga hindi pa naaayos na event). I-click ito para ipakita o itago ang listahan ng mga event sa ibaba ng mga batch.
- **Import mula sa Stripe** -- i-click ang **Import missing Stripe transactions** sa itaas ng pahina para buksan ang [Stripe Import](stripe-import.md) tool.

## Pagsasara at Muling Pagbubukas ng Batch

Kapag nabilang at nadeposito na ang isang batch, isara ito para manatiling eksakto ang mga donasyon nito gaya ng noong isinara mo ito.

1. Buksan ang batch.
2. I-click ang **Close Batch** sa itaas ng pahina.

Nagbabago ang status chip sa tabi ng pangalan ng batch mula **Open** tungong **Closed**, ipinapakita ng batch ang **Closed** sa column na **Status** sa Batches page, at may abiso sa itaas ng batch na nagsasabing sarado ito. Habang sarado ang batch, makikita pa rin ito ng mga may **Enter Donations**, pero hindi nila maaaring magdagdag, mag-edit, o magbura ng mga donasyon nito, o baguhin ang pangalan o petsa ng batch.

Para muling gumawa ng mga pagbabago, buksan ang batch at i-click ang **Reopen Batch**. Palaging nagsisimulang bukas ang mga bagong batch.

:::info
Tanging ang mga may **Edit Donations** ang nakakakita ng mga button na **Close Batch** at **Reopen Batch**. Maaari pa rin nilang baguhin ang mga donasyon sa sarado nang batch kung kailangan ng pagwawasto, nang hindi muna binubuksan ulit ang batch.
:::

## Sino ang Maaaring Magbago ng Batch

Dalawang [role permission](../settings/roles-permissions.md) ang nagbibigay-daan sa isang tao na magtrabaho sa mga batch:

- **Edit Donations** -- buong access: magdagdag at magbura ng mga batch, magsara at muling magbukas ng mga ito, at magdagdag, mag-edit, o magbura ng alinmang donasyon, bukas man o sarado ang batch.
- **Enter Donations** -- para sa mga counting team at boluntaryong naglalagay ng mga handog. Maaari silang magdagdag ng mga batch at magdagdag, mag-edit, o magbura ng mga donasyon, pero habang bukas lang ang batch. Hindi sila maaaring magbura ng mga batch, magsara o magbukas ulit ng mga ito, o baguhin ang mga regalong dumating sa pamamagitan ng online giving.

Ang taong may **Enter Donations** pero walang **View Donation Summaries** ay makikitang **Donations** sa menu ng B1 Admin, na direktang nagdadala sa Batches page. Nakatago sa kanila ang **Summary**, **Funds**, **Campaigns**, at **Giving Statements**. Para mabuksan ang isang batch at makita ang mga donasyong nakapaloob dito, kailangan din ng role ang **View Donations**.

:::tip
Karaniwang setup ang isang "Counting Team" role na may **Enter Donations** at **View Donations**, at isang treasurer na may **Edit Donations** na nagsasara sa bawat batch pagkatapos maayos ang deposito.
:::

## Pag-print ng Batch

Buksan ang batch at i-click ang **Print** sa itaas ng listahan ng donasyon para mag-print ng papel na kopya para sa iyong counting team o mga talaan ng deposito. Kasama sa printout ang:

- Pangalan ng iyong simbahan, pangalan ng batch, at petsa ng batch
- Bawat donasyon sa batch, kasama ang pangalan ng donor, paraan ng pagbabayad, mga tala, petsa, at halaga (ang mga ibinalik na regalo ay may guhit at minarkahang refunded)
- **Fund Subtotals** -- ang kabuuang naibigay sa bawat pondo sa batch
- **Batch Total** -- ang pinagsamang halaga para sa buong batch

Lalabas lang ang button na **Print** kapag may kahit isang donasyon ang batch.

### Pag-print ng Ilang Batch nang Sabay-sabay

Para mag-print ng bawat batch mula sa isang panahon nang isang bagsakan -- halimbawa, lahat ng deposito ng nakaraang buwan -- i-click ang **Print** sa itaas ng **Batches** page, katabi ng **Export**. Magbubukas ang **Print Batches** page na may **Start Date** at **End Date** na default sa nakaraang 30 araw. Palitan ang alinman sa mga petsa para pumili ng ibang saklaw.

Bawat batch na may petsa sa loob ng saklaw (kasama ang start at end date) ay ipinapa-print ayon sa petsa, isang batch bawat pahina, gamit ang parehong layout ng pag-print ng iisang batch. Hindi kasama ang mga batch na walang donasyon, at kung walang batch na may donasyon sa saklaw, makikita mo ang "No batches with donations in this date range." I-click ang **Print** para buksan ang print dialog ng iyong browser, o ang **Close** para bumalik sa listahan ng batch.

## Pag-export ng Batch sa QuickBooks Online

Buksan ang batch at i-click ang **Export for QuickBooks** para i-download ang batch bilang journal entry na maaaring i-import ng QuickBooks Online (**Settings > Import Data > Journal Entries**). Naglalaman ang file ng isang debit sa **Undeposited Funds** para sa kabuuan ng batch at isang credit bawat pondo, gamit ang pangalan ng bawat pondo bilang pangalan ng account. Hinihiling ng QuickBooks na itugma mo ang mga pangalang ito sa iyong chart of accounts habang nag-i-import, kaya pangalanan ang iyong mga pondo ayon sa pagpapangalan ng iyong bookkeeper sa mga income account, o i-map ang mga ito nang isang beses sa pag-import.

:::tip
Pangalanan nang pare-pareho ang iyong mga batch para madaling mahanap ang mga ito sa hinaharap. Ang pagsama ng petsa at uri ng koleksyon (hal., "Sunday AM - 2025-02-09") ay nagpapanatiling maayos ang iyong listahan habang lumalaki ito.
:::

## Mga Susunod na Hakbang

Kapag mayroon ka nang batch, tingnan ang [Pagtatala ng mga Donasyon](recording-donations.md) para matutunan kung paano magdagdag ng indibidwal na donasyon dito. Maaari ka ring [mag-import ng Stripe transactions](stripe-import.md) para awtomatikong gumawa ng mga batch mula sa online giving.
