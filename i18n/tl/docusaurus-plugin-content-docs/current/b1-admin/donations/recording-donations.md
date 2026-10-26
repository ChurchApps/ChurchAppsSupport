---
title: "Pagtatala ng mga Donasyon"
---

# Pagtatala ng mga Donasyon

<div class="article-intro">

Ang pagtatala ng mga donasyon sa B1 Admin ay ginagawa gamit ang sistema ng Batches. Gagawa ka ng batch para kumatawan sa isang koleksyon (tulad ng handog tuwing Linggo), at saka mo idaragdag ang mga indibidwal na donasyon sa batch na iyon. Pinapanatiling maayos at madaling i-reconcile nito ang inyong mga tala ng pagbibigay.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [funds](funds.md) para maitalaga mo ang mga donasyon sa tamang kategorya
- Gumawa ng [batch](batches.md) na paglalagyan ng mga donasyong ilalagay mo
- Siguraduhing nasa iyong [people directory](../people/adding-people.md) ang mga donor para mahanap mo sila kapag nagtatala ng kaloob
- Kailangan mo ang **Edit Donations**, o ang **Enter Donations** kasama ang **View Donations**, para makapagpasok ng kaloob sa isang batch (tingnan ang [Who Can Change a Batch](batches.md#who-can-change-a-batch))

</div>

## Paggawa ng Batch at Pagdaragdag ng mga Donasyon

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Donations**, at i-click ang **Batches**.
2. I-click ang **Add Batch** sa itaas ng pahina.
3. Maglagay ng pangalan para sa batch (hal., "Sunday Offering - Jan 5") at piliin ang petsa. I-click ang **Save**.
4. Lilitaw ang bagong batch mo sa listahan na nagpapakitang zero ang donasyon at $0.00.
5. I-click ang **pangalan ng batch** para buksan ito.

## Pagpasok ng Indibidwal na Donasyon

1. Sa detail page ng batch, lalabas ang donation entry panel sa tabi ng listahan ng mga donasyon. Sa ilalim ng **Select Person or Anonymous**, i-type ang pangalan ng donor sa search field para mahanap sila, o i-click ang **Anonymous**. (Ang pag-click sa **Add Donation** sa itaas ng pahina ay didiretso sa panel na ito.)
2. Pagkatapos pumili ng tao, ipapakita ng entry form ang mga field para sa **Date**, **Method** (Check, Cash, Card, o In-Kind), **Fund**, **Notes**, **Amount**, at **Check #** (o **Last 4 digits** para sa card gifts, o **Item** para ilarawan ang in-kind gift). I-click ang **Change** sa tabi ng pangalan ng donor para pumili ng ibang tao.
3. Punan ang mga detalye at i-click ang **Add Donation** (o pindutin ang Enter).
4. Idaragdag ang donasyon sa listahan ng mga donasyon, at magre-reset ang form para makapagpasok ka ng susunod.

:::info
Kapag [closed](batches.md#closing-and-reopening-a-batch) na ang batch, nakatago ang entry panel at ang mga link na **Edit** para sa sinumang walang **Edit Donations**, at may abiso sa itaas ng batch na nagsasabing sarado na ito. Hilingin sa taong may **Edit Donations** na buksan muli ang batch.
:::

:::tip
Mabilis kang makapagpapasok ng maraming donasyon nang sunud-sunod nang hindi umaalis sa batch page. Magre-reset ang form pagkatapos ng bawat entry para mabilis kang makagalaw sa isang tumpok ng tseke o sobre.
:::

## Pag-import ng Donasyon mula sa CSV File {#importing-donations-from-a-csv-file}

Kung nasa spreadsheet na ang mga donasyon mo, halimbawa ay export mula sa ibang giving system o tally sheet ng counting team, maaari mo silang i-import sa isang batch sa halip na i-type ang bawat isa.

1. Buksan ang batch at i-click ang **Import CSV** sa itaas ng pahina. (Lumalabas ang button kapag puwede mong baguhin ang batch at may kahit isang [fund](funds.md) ang iyong simbahan.)
2. I-click ang **Choose CSV File** at piliin ang iyong file. Kailangan ng file ng header row, at maaaring magkakaiba ang ayos ng mga column:
   - **Amount** (kailangan; gumagana rin ang `Total`) -- Hindi pinapansin ang mga simbolo ng pera at kuwit, kaya maayos ang `$1,250.00`. Dapat mas malaki sa zero ang halaga.
   - **Date** -- Gumamit ng format tulad ng `2026-10-25` o `10/25/2026`. Kung walang laman, gagamitin ang petsa ng batch.
   - **Fund** -- Pangalan ng fund, itinutugma nang hindi isinasaalang-alang ang malaki o maliit na titik. Kung walang laman, gagamitin ang una mong fund.
   - **Method** -- **Check**, **Cash**, **Card**, o **In-Kind**. Kung walang laman, gagamitin ang **Check**.
   - **Check Number** -- Ang numero ng tseke (o iba pang detalye ng bayad).
   - **Notes**
   - **Email**, **Name**, o **First Name** at **Last Name** -- Ginagamit para itugma ang donor sa isang tao sa database mo. Ang pangalang nakasulat na "Smith, John" ay babasahing "John Smith".
3. Suriin ang preview. Ipinapakita ng bawat row ang numero ng linya, ang donor mula sa file, ang **Match**, ang fund, at ang halaga:
   - Ang pangalan ng isang tao ay nangangahulugang natugmaan ang donor. Itinutugma muna ng B1 ayon sa email, saka ayon sa eksaktong pangalan, at tanging kapag iisa lang ang akma.
   - Ang **Not found — anonymous** ay nangangahulugang walang iisang tugma. Ia-import ang kaloob bilang anonymous, at idadagdag ang "Imported as:" kasama ang pangalan ng donor sa notes nito para maitalaga mo ito sa ibang pagkakataon.
   - Ang pulang mensahe tulad ng **Invalid amount**, **Unknown fund**, **Unknown method**, o **Invalid date** ay nangangahulugang lalaktawan ang row na iyon. Ayusin ang file at piliin muli ito para maisama.
4. I-click ang **Import** (ipinapakita ng button kung ilang row ang ii-import). Idaragdag ang mga donasyon sa batch.

:::tip
Pagkatapos mag-import, gamitin ang **Edit** sa anumang anonymous na donasyon para piliin ang tamang tao. Sinasabi ng "Imported as:" na note kung sino ang nakasaad sa file.
:::

## Pagtatala ng Kaloob mula sa Record ng Isang Tao

Para magtala ng iisang kaloob nang hindi binubuksan ang batch, buksan ang record ng donor sa **People** at i-click ang **Log a gift** (sa giving summary, o sa giving view ng tao).

1. Itakda ang **Date** at **Amount**.
2. Piliin ang **Fund** at **Method** (Check, Cash, Card, o In-Kind), at ilagay ang **Check #**, **Last 4 digits**, o **Item** (para sa in-kind gifts) kung kailangan.
3. Opsyonal na magdagdag ng **Notes**, saka i-click ang **Save**.

Ang kaloob ay ise-save sa batch para sa petsang iyon. Kung wala pang batch para sa petsang iyon, awtomatikong gagawa ng isa, at ipapangalan ito ayon sa petsa.

## Paghahati ng Donasyon sa Maraming Fund

Minsan, isang donor ay nagbibigay sa higit sa isang fund sa isang transaksyon. Para mahawakan ito:

1. Sa ibaba ng entry panel, i-click ang link na **full donation editor** (o i-click ang **Edit** sa umiiral na donation row).
2. Sa full editor, magdagdag ng mga halaga sa iba't ibang fund. Awtomatikong kakalkulahin ang kabuuan mula sa mga halaga ng bawat fund.
3. I-click ang **Save** para i-update ang donasyon.

:::info
Karaniwan ang paghahati ng donasyon sa maraming fund kapag isang tseke ang isinulat ng donor para sa maraming layunin, tulad ng General Fund at Missions.
:::

## Pag-edit o Pag-alis ng Donasyon

Para i-edit ang donasyon, i-click ang button na **Edit** sa row nito sa batch. Maaari mong baguhin ang petsa, halaga, fund, paraan ng bayad (Check, Cash, Card, o In-Kind), o anumang ibang detalye. Para sa in-kind gift, lalagyan ng editor ng label na **Item** ang detail field para mailarawan mo kung ano ang ibinigay. I-click ang **Save** kapag tapos ka na.

:::tip
Awtomatikong nag-a-update ang linya sa ilalim ng pangalan ng batch sa itaas ng pahina, at ipinapakita nito ang petsa ng batch, bilang ng kaloob, at pinagsamang halaga sa dolyar habang nagdaragdag o nag-e-edit ka ng entry. Gamitin ito para i-reconcile sa deposit slip mo.
:::

## Pag-refund ng Donasyon

Kung nasingil nang mali ang isang donor o humingi ng pera niya pabalik, maaari mong i-refund ang natapos na donasyon mismo mula sa edit screen nito -- hindi na kailangang pumunta sa dashboard ng payment gateway mo.

1. Buksan ang donasyon at i-click ang **Edit**.
2. I-click ang button na **Refund** sa tabi ng Delete sa ibaba ng form.
3. Kumpirmahin ang dialog: "Refund this donation in full through the payment gateway? This cannot be undone."

Ang donasyon ay ire-refund nang buo sa orihinal na payment gateway at mamarkahang **Refunded** sa mga listahan ng donasyon mo.

:::warning
Buong refund lamang ang maaari -- walang paraan para i-refund ang bahagi lang ng halaga mula sa B1 Admin. Hindi rin ito mababawi kapag nakumpirma na.
:::

:::info
Lalabas lang ang button na **Refund** para sa mga donasyong binayaran online (may gateway transaction ang mga ito) at nasa **Complete** status pa rin. Ang mga donasyong manual na inilagay (cash, tseke) ay walang gateway transaction na ma-refund -- i-edit o burahin na lang ang mga iyon.
:::

## Mga Susunod na Hakbang

- Suriin ang mga entry mo gamit ang [Donation Reports](donation-reports.md) para matiyak ang katumpakan
- Sa katapusan ng taon, gumawa ng [Giving Statements](giving-statements.md) para sa iyong mga donor
