---
title: "Pagtatala ng Mga Donasyon"
description: "Magtala ng donasyon ng simbahan sa B1 Admin sa pamamagitan ng paggawa ng batch, pagpasok ng handog nang isa-isa, pag-import ng CSV, o pagtala ng isang handog mula sa profile ng donor."
---

# Pagtatala ng Mga Donasyon

<div class="article-intro">

Ang pagtatala ng donasyon sa B1 Admin ay ginagawa sa pamamagitan ng sistema ng Batches. Gagawa ka ng batch para kumatawan sa isang koleksyon (gaya ng handog tuwing Linggo), pagkatapos magdadagdag ng indibidwal na donasyon sa batch na iyon. Pinananatiling organisado nito ang iyong mga talaan ng giving at madaling i-reconcile.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [mga fund](funds.md) para maitalaga mo ang mga donasyon sa tamang kategorya
- Gumawa ng [batch](batches.md) na paglalagyan ng mga donasyong ilalagay mo
- Siguraduhing nasa iyong [people directory](../people/adding-people.md) ang mga donor para mahanap mo sila kapag naglalagay ng handog
- Kailangan mo ng **Edit Donations**, o **Enter Donations** kasama ang **View Donations**, para maglagay ng handog sa batch (tingnan ang [Sino ang Maaaring Magbago ng Batch](batches.md#who-can-change-a-batch))

</div>

## Paggawa ng Batch at Pagdaragdag ng Donasyon {#creating-a-batch-and-adding-donations}

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Donations**, at i-click ang **Batches**.
2. I-click ang **Add Batch** sa itaas ng pahina.
3. Maglagay ng pangalan para sa batch (hal., "Sunday Offering - Jan 5") at piliin ang petsa. I-click ang **Save**.
4. Lalabas sa listahan ang bago mong batch na nagpapakitang zero ang donasyon at $0.00.
5. I-click ang **pangalan ng batch** para buksan ito.

## Pagpasok ng Indibidwal na Donasyon {#entering-individual-donations}

1. Sa batch detail page, lalabas ang donation entry panel sa tabi ng listahan ng donasyon. Sa ilalim ng **Select Person or Anonymous**, i-type ang pangalan ng donor sa search field para mahanap sila, o i-click ang **Anonymous**. (Ang pag-click sa **Add Donation** sa itaas ng pahina ay dadalhin ka sa panel na ito.)
2. Pagkatapos pumili ng tao, ipinapakita ng entry form ang mga field para sa **Date** (nagsisimula sa petsa ng batch), **Method** (Check, Cash, Card, o In-Kind), **Fund** (lumalabas kapag higit sa isang fund ang iyong simbahan), **Notes**, **Amount**, at **Check #** (o **Last 4 digits** para sa card na handog, o **Item** para ilarawan ang in-kind na handog; walang detail field ang cash na handog). I-click ang **Change** sa tabi ng pangalan ng donor para pumili ng iba.
3. Punan ang mga detalye at i-click ang **Add Donation** (o pindutin ang Enter). Kung walang laman o zero ang halaga, hihilingin ng form na maglagay ng halagang mas malaki sa zero bago mag-save.
4. Idinadagdag ang donasyon sa listahan ng donasyon, at nire-reset ang form para makapaglagay ka ng susunod. Nananatili ang petsa, method, fund, at notes gaya ng itinakda mo, kaya ang sunud-sunod na magkakatulad na tseke ay kailangan lamang ng donor, halaga, at numero ng tseke.

:::info
Kapag [nakasara](batches.md#closing-and-reopening-a-batch) na ang batch, nakatago ang entry panel at mga link na **Edit** para sa sinumang walang **Edit Donations**, at may paalalang lalabas sa itaas ng batch na sarado na ito. Hilingin sa may **Edit Donations** na buksan muli ito.
:::

:::tip
Mabilis kang makapaglagay ng maraming donasyon nang sunud-sunod nang hindi umaalis sa pahina ng batch. Nire-reset ang form pagkatapos ng bawat entry para mabilis mong maproseso ang isang tumpok ng tseke o sobre.
:::

## Pag-import ng Donasyon mula sa CSV File {#importing-donations-from-a-csv-file}

Kung nasa spreadsheet na ang iyong mga donasyon -- halimbawa, export mula sa ibang giving system o tally sheet ng counting team -- maaari mo silang i-import sa batch sa halip na i-type ang bawat isa.

1. Buksan ang batch at i-click ang **Import CSV** sa itaas ng pahina. (Lumalabas ang button kapag maaari mong baguhin ang batch at may kahit isang [fund](funds.md) ang iyong simbahan.)
2. I-click ang **Choose CSV File** at piliin ang iyong file. Kailangan ng file ng header row, at maaaring nasa anumang pagkakasunod-sunod ang mga column:
   - **Amount** (kinakailangan; gumagana rin ang `Total`) -- Hindi pinapansin ang mga simbolo ng currency at kuwit, kaya ayos lang ang `$1,250.00`. Dapat mas malaki sa zero ang halaga.
   - **Date** -- Gumamit ng format gaya ng `2026-10-25` o `10/25/2026`. Kung blangko, gagamitin ang petsa ng batch.
   - **Fund** -- Ang pangalan ng fund, itinutugma nang hindi isinasaalang-alang ang malaki o maliit na letra. Kung blangko, gagamitin ang una mong fund.
   - **Method** -- **Check**, **Cash**, **Card**, o **In-Kind**. Kung blangko, gagamitin ang **Check**.
   - **Check Number** -- Ang numero ng tseke (o ibang detalye ng bayad).
   - **Notes**
   - **Email**, **Name**, o **First Name** at **Last Name** -- Ginagamit para itugma ang donor sa isang tao sa iyong database. Ang pangalang nakasulat na "Smith, John" ay binabasang "John Smith".
3. Suriin ang preview. Ipinapakita ng bawat row ang numero ng linya nito, ang donor mula sa file, ang **Match**, ang fund, at ang halaga:
   - Ang pangalan ng tao ay nangangahulugang natugmaan ang donor. Itinutugma ng B1 ayon sa email muna, saka ayon sa eksaktong pangalan, at kapag eksaktong isang tao lamang ang bagay.
   - Ang **Not found — anonymous** ay nangangahulugang walang iisang natugmang tao. Ini-import ang handog bilang anonymous, at idinadagdag ang "Imported as:" kasama ang pangalan ng donor sa notes nito para maitalaga mo ito sa ibang pagkakataon.
   - Ang pulang mensahe gaya ng **Invalid amount**, **Unknown fund**, **Unknown method**, o **Invalid date** ay nangangahulugang lalaktawan ang row na iyon. Ayusin ang file at piliin itong muli para maisama.
4. I-click ang **Import** (ipinapakita ng button kung ilang row ang ii-import). Idinadagdag ang mga donasyon sa batch.

:::tip
Pagkatapos mag-import, gamitin ang **Edit** sa sinumang anonymous na donasyon para piliin ang tamang tao. Sinasabi ng "Imported as:" na note kung sino ang sinabi ng file na nagbigay nito.
:::

## Pagtatala ng Handog mula sa Record ng Tao {#logging-a-gift-from-a-persons-record}

Para magtala ng iisang handog nang hindi binubuksan ang batch, buksan ang record ng donor sa **People** at i-click ang **Log a gift** (sa giving summary, o sa giving view ng tao).

1. Itakda ang **Date** at **Amount**.
2. Piliin ang **Fund** at **Method** (Check, Cash, Card, o In-Kind), at ilagay ang **Check #**, **Last 4 digits**, o **Item** (para sa in-kind na handog) kung kailangan.
3. Opsyonal na magdagdag ng **Notes**, pagkatapos i-click ang **Save**.

Naka-save ang handog sa batch para sa petsang iyon. Kung wala pang batch para sa petsang iyon, awtomatiko itong gagawin para sa iyo, at papangalanan ayon sa petsa.

## Paghahati ng Donasyon sa Maraming Fund {#splitting-a-donation-across-multiple-funds}

Minsan, sa iisang transaksyon, nagbibigay ang isang donor sa higit sa isang fund. Para ito hawakan:

1. Sa ibaba ng entry panel, i-click ang link na **full donation editor** (o i-click ang **Edit** sa umiiral na row ng donasyon). Nagsisimula ang bagong handog sa petsa ng batch.
2. Sa buong editor, maglagay ng halaga at fund, pagkatapos i-click ang **Add More** para magdagdag ng isa pang fund at halaga. Kinukuwenta ang kabuuan mula sa mga halaga ng bawat fund.
3. I-click ang **Save**. Hindi nase-save ang handog na walang halaga sa alinmang fund; hihilingin ng editor ang halagang mas malaki sa zero.

:::info
Karaniwan ang paghahati ng donasyon sa maraming fund kapag isang tseke ang isinulat ng donor para sa maraming layunin, gaya ng General Fund at Missions.
:::

## Pag-edit o Pag-alis ng Donasyon {#editing-or-removing-donations}

Para i-edit ang donasyon, i-click ang button na **Edit** sa row nito sa batch. Maaari mong palitan ang petsa, halaga, fund, paraan ng bayad (Check, Cash, Card, o In-Kind), o ibang detalye. Para sa in-kind na handog, lalagyan ng label ng editor ang detail field ng **Item** para mailarawan mo kung ano ang ibinigay. I-click ang **Save** kapag tapos ka na.

:::tip
Awtomatikong nag-a-update ang linya sa ilalim ng pangalan ng batch sa itaas ng pahina para ipakita ang petsa ng batch, bilang ng handog, at pinagsamang halaga habang nagdadagdag o nag-e-edit ka ng entry. Gamitin ito para mag-reconcile sa iyong deposit slip.
:::

## Pag-refund ng Donasyon {#refunding-a-donation}

Kung nasingil ang donor nang mali o humiling ng pagbabalik ng kanyang pera, maaari mong i-refund ang natapos na donasyon nang direkta mula sa edit screen nito -- hindi na kailangang pumunta sa dashboard ng iyong payment gateway.

1. Buksan ang donasyon at i-click ang **Edit**.
2. I-click ang **Refund** button sa tabi ng Delete sa ibaba ng form.
3. Kumpirmahin ang dialog: "Refund this donation in full through the payment gateway? This cannot be undone."

Ire-refund nang buo ang donasyon sa orihinal na payment gateway at mamarkahang **Refunded** sa iyong mga listahan ng donasyon.

:::warning
Buong refund lamang ang pinapayagan -- walang paraan para mag-refund ng bahagi ng halaga mula sa B1 Admin. Hindi rin ito mababawi kapag nakumpirma na.
:::

:::info
Lumalabas lamang ang **Refund** button para sa mga donasyong binayaran online (may gateway transaction) at nasa **Complete** status pa rin. Ang mga manu-manong inilagay na donasyon (cash, check) ay walang gateway transaction na ire-refund -- i-edit o burahin na lamang ang mga iyon.
:::

## Pag-print ng Resibo para sa Isang Handog {#printing-a-receipt-for-one-gift}

Kapag may nag-abot ng tseke, nagbayad para sa event o t-shirt, o may bisitang organisasyong nagdala ng donasyon, maaari kang mag-print ng resibo para lamang sa handog na iyon, sa halip na para sa buong batch o taunang statement.

1. Buksan ang batch na naglalaman ng donasyon.
2. I-click ang **Receipt** sa tabi ng **Edit** sa row ng donasyon. Maaari ka ring mag-click ng **Receipt** sa ibaba ng Edit Donation form.
3. I-click ang **Print**, o ang **Close** para bumalik.

Gumagamit ang resibo ng parehong layout ng giving statement: ang iyong simbahan at ang donor (o "Anonymous"), petsa at paraan ng handog, bawat fund at halaga, ang note, ang iyong Giving Note, at ang official receipt block kung nagtakda ka ng **Statement format** (tingnan ang [Giving Statements](giving-statements.md)). Ang numero ng resibo sa block na iyon ay ang ID ng donasyon.

:::info
Ang wording na "no goods or services" ay iniimprenta lamang kapag bawat fund sa handog ay markado bilang tax-deductible. Kung may bahaging napunta sa fund na hindi tax-deductible, gaya ng bayad sa event o pagbili, inaalis ng resibo ang wording na iyon para mabasa itong bayad at hindi kawanggawang handog.
:::

:::tip
Ang mga online na handog ay may awtomatikong thank-you email na, kaya pangunahing kapaki-pakinabang ang resibo para sa mga handog na manu-manong inilagay mo.
:::

## Mga Susunod na Hakbang {#next-steps}

- Suriin ang iyong mga entry gamit ang [Donation Reports](donation-reports.md) para i-verify ang katumpakan
- Sa katapusan ng taon, gumawa ng [Giving Statements](giving-statements.md) para sa iyong mga donor
