---
title: "Pagtatala ng mga Donasyon"
---

# Pagtatala ng mga Donasyon

<div class="article-intro">

Ang pagtatala ng mga donasyon sa B1 Admin ay ginagawa sa pamamagitan ng sistemang Batches. Gagawa ka ng batch para kumatawan sa isang koleksyon (gaya ng handog ng Linggo), pagkatapos ay magdadagdag ka ng mga indibidwal na donasyon sa batch na iyon. Pinananatiling maayos at madaling i-reconcile nito ang iyong mga talaan ng pagbibigay.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang iyong [funds](funds.md) para maitalaga mo ang mga donasyon sa tamang kategorya
- Gumawa ng [batch](batches.md) na maglalaman ng mga donasyong ilalagay mo
- Siguraduhing nasa [people directory](../people/adding-people.md) ang mga donor para mahanap mo sila kapag nagtatala ng mga kaloob
- Kailangan mo ng **I-edit ang mga Donasyon**, o **Maglagay ng Donasyon** kasama ang **Tingnan ang mga Donasyon**, para magpasok ng mga kaloob sa batch (tingnan ang [Who Can Change a Batch](batches.md#who-can-change-a-batch))

</div>

## Paggawa ng Batch at Pagdagdag ng mga Donasyon

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Mga Donasyon**, at i-click ang **Mga Batch**.
2. I-click ang **Magdagdag ng Batch** sa itaas ng pahina.
3. Maglagay ng pangalan para sa batch (halimbawa, "Handog sa Linggo - Ene 5") at piliin ang petsa. I-click ang **I-save**.
4. Lalabas ang bagong batch mo sa listahan na nagpapakitang zero ang donasyon at $0.00.
5. I-click ang **pangalan ng batch** para buksan ito.

## Pagpasok ng mga Indibidwal na Donasyon

1. Sa detail page ng batch, lalabas ang donation entry panel sa tabi ng listahan ng mga donasyon. Sa ilalim ng **Pumili ng Tao o Anonymous**, i-type ang pangalan ng donor sa search field para mahanap siya, o i-click ang **Anonymous**. (Ang pag-click sa **Magdagdag ng Donasyon** sa itaas ng pahina ay dadalhin ka sa panel na ito.)
2. Pagkatapos pumili ng tao, magpapakita ang entry form ng mga field para sa **Petsa**, **Paraan** (Check, Cash, Card, o In-Kind), **Pondo**, **Mga Tala**, **Halaga**, at **Tseke #** (o **Huling 4 na digit** para sa card, o **Item** para ilarawan ang in-kind na kaloob). I-click ang **Palitan** sa tabi ng pangalan ng donor para pumili ng iba.
3. Punan ang mga detalye at i-click ang **Magdagdag ng Donasyon** (o pindutin ang Enter).
4. Idaragdag ang donasyon sa listahan ng mga donasyon, at magre-reset ang form para makapagpasok ka ng susunod.

:::info
Kapag [sarado](batches.md#closing-and-reopening-a-batch) ang batch, nakatago ang entry panel at mga link na **I-edit** para sa sinumang walang **I-edit ang mga Donasyon**, at may abiso sa itaas ng batch na nagsasabing sarado ito. Humingi ng tulong sa may **I-edit ang mga Donasyon** para mabuksang muli ito.
:::

:::tip
Mabilis kang makapagpapasok ng maraming donasyon nang sunud-sunod nang hindi umaalis sa pahina ng batch. Nagre-reset ang form pagkatapos ng bawat entry para mabilis mong maproseso ang isang tumpok ng tseke o sobre.
:::

## Pagtatala ng Kaloob mula sa Record ng Isang Tao

Para magtala ng iisang kaloob nang hindi binubuksan ang batch, buksan ang record ng donor sa **Mga Tao** at i-click ang **I-log ang kaloob** (sa giving summary, o sa giving view ng tao).

1. Itakda ang **Petsa** at **Halaga**.
2. Piliin ang **Pondo** at **Paraan** (Check, Cash, Card, o In-Kind), at ilagay ang **Tseke #**, **Huling 4 na digit**, o **Item** (para sa in-kind na kaloob) kung kailangan.
3. Opsyonal na magdagdag ng **Mga Tala**, pagkatapos i-click ang **I-save**.

Ise-save ang kaloob sa batch para sa petsang iyon. Kung wala pang batch para sa petsang iyon, gagawa ito ng isa para sa iyo, na pinangalanan ayon sa petsa.

## Paghahati ng Donasyon sa Maraming Fund

Minsan, isang donor ang nagbibigay sa higit sa isang fund sa iisang transaksyon. Para hawakan ito:

1. Sa ilalim ng entry panel, i-click ang link na **buong donation editor** (o i-click ang **I-edit** sa row ng umiiral na donasyon).
2. Sa full editor, maglagay ng mga halaga sa iba't ibang fund. Awtomatikong kakalkulahin ang kabuuan mula sa mga halaga ng bawat fund.
3. I-click ang **I-save** para i-update ang donasyon.

:::info
Karaniwan ang paghahati ng donasyon sa mga fund kapag isinulat ng donor ang iisang tseke para sa maraming layunin, gaya ng General Fund at Missions.
:::

## Pag-edit o Pag-alis ng mga Donasyon

Para i-edit ang donasyon, i-click ang button na **I-edit** sa row nito sa batch. Maaari mong baguhin ang date, amount, fund, paraan ng pagbabayad (Check, Cash, Card, o In-Kind), o anumang ibang detalye. Para sa in-kind na kaloob, lalagyan ng label na **Item** ng editor ang detail field para mailarawan mo kung ano ang ibinigay. I-click ang **I-save** kapag tapos ka na.

:::tip
Awtomatikong nag-a-update ang linyang nasa ilalim ng pangalan ng batch sa itaas ng pahina para ipakita ang petsa ng batch, bilang ng mga kaloob, at pinagsamang halaga habang nagdadagdag o nag-e-edit ka ng entry. Gamitin ito para i-reconcile laban sa deposit slip mo.
:::

## Pag-refund ng Donasyon

Kung na-charge nang mali ang isang donor o humiling ng balik ng pera, maaari mong i-refund ang isang kumpletong donasyon direkta mula sa edit screen nito -- hindi na kailangang pumunta sa dashboard ng payment gateway mo.

1. Buksan ang donasyon at i-click ang **I-edit**.
2. I-click ang button na **I-refund** sa tabi ng Delete sa ibaba ng form.
3. Kumpirmahin ang dialog: "Refund this donation in full through the payment gateway? This cannot be undone."

Ire-refund nang buo ang donasyon sa orihinal na payment gateway at mamarkahan itong **Na-refund** sa mga listahan ng donasyon mo.

:::warning
Buong refund lamang ang mga refund -- walang paraan para mag-refund ng bahagyang halaga mula sa B1 Admin. Hindi rin ito mababawi kapag nakumpirma na.
:::

:::info
Lumalabas lamang ang button na **I-refund** para sa mga donasyong binayaran online (may gateway transaction ang mga ito) at nasa status pa ring **Kumpleto**. Ang mga donasyong manu-manong inilagay (cash, check) ay walang gateway transaction na ire-refund -- i-edit o burahin na lamang ang mga iyon.
:::

## Mga Susunod na Hakbang

- Suriin ang mga entry mo gamit ang [Donation Reports](donation-reports.md) para matiyak na tama ang mga ito
- Sa katapusan ng taon, gumawa ng [Giving Statements](giving-statements.md) para sa mga donor mo
