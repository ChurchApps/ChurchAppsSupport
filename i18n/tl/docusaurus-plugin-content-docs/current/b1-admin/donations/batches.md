---
title: "Mga Batch ng Donasyon"
---

# Mga Batch ng Donasyon

<div class="article-intro">

Pinagsasama-sama ng mga batch ang iyong mga donasyon para mas madaling subaybayan at i-reconcile. Ang karaniwang batch ay kumakatawan sa iisang koleksyon, gaya ng handog sa Linggo o isang espesyal na event. Nakakatulong ang paggamit ng mga batch para manatiling organisado at mapadali ang pagberipika na tugma ang iyong mga tala sa aktwal na deposito.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Siguraduhing [na-set up mo ang iyong mga pondo](funds.md) para magagamit ang mga ito sa pagtatala ng mga donasyon
- Kakailanganin mo ang pahintulot na **View Donation Summaries**, **Edit Donations**, o **Enter Donations** para makita ang pahina ng Batches (tingnan ang [Sino ang Maaaring Magbago ng Batch](#who-can-change-a-batch))

</div>

## Ang Pahina ng Batches

Kapag pumunta ka sa **Donations > Batches**, makikita mo ang listahan ng iyong mga batch. Ipinapakita ng bawat hilera ang:

- **Name** -- ang pangalang ibinigay mo sa batch
- **Date** -- ang petsa ng koleksyon
- **Donations** -- ang bilang ng indibidwal na donasyon sa batch
- **Total** -- ang pinagsamang halagang pera
- **Status** -- **Open** o **Closed** (tingnan ang [Pagsasara at Muling Pagbubukas ng Batch](#closing-and-reopening-a-batch))

Sa itaas ng listahan, may mga year button na nagpapakita lamang ng mga batch mula sa isang taon, o ng lahat ng batch na **All**. Ipinapakita ng isang linyang buod ang bilang ng mga batch, ang bilang ng mga regalo, at ang kabuuang halaga para sa mga batch na nakikita.

## Paggawa ng Bagong Batch

1. I-click ang **Add Batch** sa itaas ng pahina.
2. Maglagay ng mapaglarawang pangalan (hal., "Sunday Offering - Feb 9").
3. Piliin ang petsa ng koleksyon.
4. I-click ang **Save**.

Lalabas ang bagong batch mo sa listahan, handa para magdagdag ka ng mga donasyon.

## Pagtatrabaho sa mga Batch

- **Tingnan ang mga donasyon** -- i-click ang pangalan ng batch para buksan ito at makita ang lahat ng indibidwal na donasyong nakapaloob dito. Mula roon, maaari kang magdagdag, mag-edit, o mag-alis ng mga donasyon.
- **I-edit ang detalye ng batch** -- i-click ang button na **Edit** sa hilera ng batch para baguhin ang pangalan o petsa nito. Tanging ang mga taong may **Edit Donations** ang makakapagbura ng batch.
- **Pag-uri-uri** -- gamitin ang mga header ng kolum para pag-uriin ang mga batch ayon sa pangalan o petsa.
- **I-export** -- i-click ang **Export** sa itaas ng pahina para i-download ang mga batch na nakikita bilang spreadsheet (CSV).
- **Mga nabigong event** -- kung may iniulat na problema ang iyong payment gateway, lalabas sa itaas ng pahina ang button na **Failed events** (kasama ang bilang ng mga hindi pa nareresolbang event). I-click ito para ipakita o itago ang listahan ng mga event sa ibaba ng mga batch.
- **Mag-import mula sa Stripe** -- i-click ang **Import missing Stripe transactions** sa itaas ng pahina para buksan ang [Stripe Import](stripe-import.md) tool.

## Pagsasara at Muling Pagbubukas ng Batch {#closing-and-reopening-a-batch}

Kapag nabilang at nadeposito na ang isang batch, isara ito para manatiling eksakto ang mga donasyon nito gaya noong isinara mo ito.

1. Buksan ang batch.
2. I-click ang **Close Batch** sa itaas ng pahina.

Nagbabago ang status chip sa tabi ng pangalan ng batch mula **Open** patungong **Closed**, ipinapakita ng batch ang **Closed** sa kolum na **Status** sa pahina ng Batches, at may abiso sa itaas ng batch na nagpapaliwanag na sarado ito. Habang sarado ang batch, maaari pa ring tingnan ito ng mga taong may **Enter Donations**, ngunit hindi nila maaaring magdagdag, mag-edit, o magbura ng mga donasyon nito, o baguhin ang pangalan o petsa ng batch.

Para makapagbago muli, buksan ang batch at i-click ang **Reopen Batch**. Palaging nagsisimulang bukas ang mga bagong batch.

:::info
Tanging ang mga taong may **Edit Donations** ang nakakakita ng mga button na **Close Batch** at **Reopen Batch**. Maaari pa rin nilang baguhin ang mga donasyon sa sarado nang batch kung kailangan ng pagwawasto, nang hindi ito muling binubuksan.
:::

## Sino ang Maaaring Magbago ng Batch {#who-can-change-a-batch}

May dalawang [pahintulot ng tungkulin](../settings/roles-permissions.md) na nagbibigay-daan sa isang tao na magtrabaho sa mga batch:

- **Edit Donations** -- buong access: magdagdag at magbura ng mga batch, isara at buksang muli ang mga ito, at magdagdag, mag-edit, o magbura ng anumang donasyon, bukas man o sarado ang batch.
- **Enter Donations** -- para sa mga counting team at boluntaryong nagtatala ng handog. Maaari silang magdagdag ng mga batch at magdagdag, mag-edit, o magbura ng mga donasyon, ngunit habang bukas lamang ang batch. Hindi sila makakapagbura ng mga batch, makakapagsara o makakapagbukas muli ng mga ito, o makakapagbago ng mga regalong dumating sa pamamagitan ng online giving.

Ang taong may **Enter Donations** ngunit walang **View Donation Summaries** ay makikita ang **Donations** sa menu ng B1 Admin, na direktang papunta sa pahina ng Batches. Nakatago sa kanila ang **Summary**, **Funds**, **Campaigns**, at **Giving Statements**. Para mabuksan ang isang batch at makita ang mga donasyong nakapaloob dito, kailangan din ng tungkulin ang **View Donations**.

:::tip
Karaniwang setup ang tungkuling "Counting Team" na may **Enter Donations** at **View Donations**, at isang treasurer na may **Edit Donations** na nagsasara ng bawat batch matapos maberipika ang deposito.
:::

## Pag-print ng Batch

Buksan ang isang batch at i-click ang **Print** sa itaas ng listahan ng mga donasyon para mag-print ng papel na kopya para sa iyong counting team o mga tala ng deposito. Kasama sa printout ang:

- Ang pangalan ng iyong simbahan, ang pangalan ng batch, at ang petsa ng batch
- Bawat donasyon sa batch, kasama ang pangalan ng donor, paraan, mga tala, petsa, at halaga (ang mga na-refund na regalo ay may guhit at minarkahang refunded)
- **Fund Subtotals** -- ang kabuuang ibinigay sa bawat pondo sa batch
- **Batch Total** -- ang pinagsamang halaga ng buong batch

Lalabas lamang ang button na **Print** kapag may kahit isang donasyon ang batch.

### Pag-print ng Ilang Batch nang Sabay-sabay

Para mag-print ng bawat batch mula sa isang panahon nang sabay-sabay -- halimbawa, lahat ng deposito noong nakaraang buwan -- i-click ang **Print** sa itaas ng pahina ng **Batches**, katabi ng **Export**. Bubukas ang pahinang **Print Batches** na may **Start Date** at **End Date** na nakatakda sa huling 30 araw bilang default. Baguhin ang alinman sa dalawang petsa para pumili ng ibang saklaw.

Ang bawat batch na may petsang nasa saklaw (kasama ang mga petsa ng simula at wakas) ay ipi-print ayon sa pagkakasunud-sunod ng petsa, isang batch bawat pahina, gamit ang parehong layout ng pag-print ng iisang batch. Hindi isasama ang mga batch na walang donasyon, at kung walang batch sa saklaw na may donasyon, makakakita ka ng "No batches with donations in this date range." I-click ang **Print** para buksan ang print dialog ng iyong browser, o ang **Close** para bumalik sa listahan ng batch.

## Pag-export ng Batch sa QuickBooks Online

Buksan ang isang batch at i-click ang **Export for QuickBooks** para i-download ang batch bilang journal entry na maaaring i-import ng QuickBooks Online (**Settings > Import Data > Journal Entries**). Naglalaman ang file ng isang debit sa **Undeposited Funds** para sa kabuuan ng batch at isang credit bawat pondo, gamit ang pangalan ng bawat pondo bilang pangalan ng account. Hinihiling ng QuickBooks na itugma mo ang mga pangalang iyon sa iyong chart of accounts sa panahon ng import, kaya pangalanan ang iyong mga pondo ayon sa pagpapangalan ng iyong bookkeeper sa mga income account, o i-map ang mga ito nang isang beses sa pag-import.

:::tip
Pangalanan nang pare-pareho ang iyong mga batch para madali silang mahanap sa hinaharap. Ang pagsama ng petsa at uri ng koleksyon (hal., "Sunday AM - 2025-02-09") ay nagpapanatiling organisado ang iyong listahan habang lumalaki ito.
:::

## Susunod na Hakbang

Kapag mayroon ka nang batch, tingnan ang [Pagtatala ng mga Donasyon](recording-donations.md) para matutunan kung paano magdagdag ng indibidwal na donasyon dito. Maaari mo ring [i-import ang mga transaksyon sa Stripe](stripe-import.md) para awtomatikong makagawa ng mga batch mula sa online giving.
