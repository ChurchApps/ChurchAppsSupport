---
title: "Pagtatala ng mga Donasyon"
---

# Pagtatala ng mga Donasyon

<div class="article-intro">

Ang pagtatala ng mga donasyon sa B1 Admin ay ginagawa sa pamamagitan ng Batches system. Gagawa kayo ng batch para kumatawan sa isang koleksyon (tulad ng handog tuwing Linggo), pagkatapos ay magdaragdag ng mga indibidwal na donasyon sa batch na iyon. Pinapanatili nitong organisado at madaling i-reconcile ang inyong mga giving record.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang inyong [mga fund](funds.md) para maitalaga ang mga donasyon sa tamang kategorya
- Gumawa ng [batch](batches.md) na paglalagyan ng mga donasyong ipapasok ninyo
- Siguraduhing nasa inyong [people directory](../people/adding-people.md) ang mga nagbibigay para mahanap sila kapag nagpapasok ng mga handog

</div>

## Paggawa ng Batch at Pagdaragdag ng mga Donasyon

1. Sa **B1 Admin**, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Donations**, at i-click ang **Batches**.
2. I-click ang **Add Batch**.
3. Maglagay ng pangalan para sa batch (hal., "Sunday Offering - Jan 5") at piliin ang petsa. I-click ang **Save**.
4. Lalabas ang inyong bagong batch sa listahan na may zero na donasyon at $0.00.
5. I-click ang **pangalan ng batch** para buksan ito.

## Pagpasok ng mga Indibidwal na Donasyon

1. Sa batch detail page, i-type ang pangalan ng nagbibigay sa **search field** para hanapin siya.
2. Pagkatapos pumili ng tao, lalabas ang form para sa pagpasok ng donasyon na may mga field na **Date**, **Payment Method**, **Fund**, **Amount**, at **Check Number**.
3. Punan ang mga detalye at i-click ang **Add Donation**.
4. Idaragdag ang donasyon sa talaan sa ibaba, at magre-reset ang form para makapagpasok kayo ng susunod.

:::tip
Maaari kayong magpasok ng sunud-sunod na donasyon nang hindi umaalis sa batch page. Nagre-reset ang form pagkatapos ng bawat entry para mabilis ninyong maproseso ang isang tumpok ng mga tseke o sobre.
:::

## Paghahati ng Donasyon sa Maraming Fund

Minsan, nagbibigay ang isang donor sa higit sa isang fund sa iisang transaksyon. Para dito:

1. I-click ang button na **Edit** sa row ng donasyon.
2. Sa edit form, magdagdag ng mga halaga sa iba't ibang fund. Awtomatikong kakalkulahin ang kabuuan mula sa mga halaga ng bawat fund.
3. I-click ang **Save** para i-update ang donasyon.

:::info
Karaniwan ang paghahati ng mga donasyon sa iba't ibang fund kapag nagsulat ang isang donor ng iisang tseke para sa maraming layunin, tulad ng General Fund at Missions.
:::

## Pag-edit o Pag-alis ng mga Donasyon

Para i-edit ang isang donasyon, i-click ang button na **Edit** sa row nito sa batch. Maaari ninyong baguhin ang petsa, halaga, fund, payment method, o anumang ibang detalye. I-click ang **Save** kapag tapos na.

:::tip
Awtomatikong nag-a-update ang header ng batch page para ipakita ang kabuuang bilang ng mga donasyon at ang pinagsamang halaga sa dolyar habang nagdaragdag o nag-e-edit kayo ng mga entry. Gamitin ito para i-reconcile sa inyong deposit slip.
:::

## Pag-refund ng Donasyon

Kung nasingil nang mali ang isang donor o humihingi siya ng refund, maaari ninyong i-refund ang isang nakumpletong donasyon direkta mula sa edit screen nito -- hindi na kailangang pumunta sa dashboard ng inyong payment gateway.

1. Buksan ang donasyon at i-click ang **Edit**.
2. I-click ang button na **Refund** sa tabi ng Delete sa ibaba ng form.
3. Kumpirmahin ang dialog: "Refund this donation in full through the payment gateway? This cannot be undone."

Ire-refund nang buo ang donasyon sa pamamagitan ng orihinal na payment gateway at mamarkahan itong **Refunded** sa inyong mga donation list.

:::warning
Buong refund lang ang posible -- walang paraan para mag-refund ng bahagi lang ng halaga mula sa B1 Admin. Hindi na rin maibabalik ang refund kapag nakumpirma na.
:::

:::info
Lalabas lang ang button na **Refund** para sa mga donasyong binayaran online (may gateway transaction ang mga ito) at nasa **Complete** status pa. Ang mga manu-manong ipinasok na donasyon (cash, tseke) ay walang gateway transaction na ire-refund -- i-edit o i-delete na lang ang mga iyon.
:::

## Mga Susunod na Hakbang

- Suriin ang inyong mga entry gamit ang [Mga Donation Report](donation-reports.md) para matiyak na tama ang mga ito
- Sa katapusan ng taon, gumawa ng [Mga Giving Statement](giving-statements.md) para sa inyong mga nagbibigay
