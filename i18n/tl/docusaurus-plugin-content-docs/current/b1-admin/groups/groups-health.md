---
title: "Kalusugan ng Grupo"
description: "Suriin ang kalusugan ng grupo sa B1 Admin gamit ang 90-araw na table ng miyembro, join, pag-alis, churn, at average na attendance para matukoy ang mga grupong nangangailangan ng follow-up."
---

# Kalusugan ng Grupo

<div class="article-intro">

Binibigyan ka ng dashboard na Groups Health ng malawakang pagtingin kung paano nagpe-perform ang lahat ng iyong grupo -- mga trend ng pagiging miyembro, average ng attendance, at paglago o pagbaba sa nakaraang 90 araw -- lahat sa iisang table na maaaring i-sort.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng kahit ilang grupong may miyembro para makita ang makabuluhang datos. Tingnan ang [Creating Groups](./creating-groups.md).
- Kinukuha ang datos ng attendance mula sa mga naitalang session. Tingnan ang seksyong [Attendance](../attendance/index.md).

</div>

## Pagbubukas ng Groups Health {#opening-groups-health}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **People**, i-click ang **Groups**, at pagkatapos i-click ang button na **Group Health** sa header ng pahina. Naglo-load ang dashboard ng table na may isang row kada grupo.

## Mga Column {#columns}

| Column | Ano ang ipinapakita |
|--------|--------------|
| **Name** | Pangalan ng grupo, naka-link sa detail page ng grupo |
| **Category** | Kategorya ng grupo |
| **Members** | Kasalukuyang bilang ng aktibong miyembro |
| **Joined (90d)** | Mga miyembrong sumali sa nakaraang 90 araw |
| **Left (90d)** | Mga miyembrong umalis sa nakaraang 90 araw |
| **Churn (90d)** | Netong churn rate bilang porsyento sa loob ng 90 araw |
| **Avg Attendance** | Average na headcount kada session ng attendance, o "-" kung walang naitalang attendance |
| **Avg Age** | Average na edad ng mga miyembrong may naka-file na birth date |
| **Female** / **Male** | Ilan sa mga miyembro ang babae at lalaki |

Nakaayos ayon sa pangalan ang table sa simula. I-click ang alinmang column header para i-sort ang table ayon sa column na iyon. I-click muli para baligtarin ang direksyon ng pag-sort. I-click ang **Groups** sa itaas ng pahina para bumalik sa listahan ng Groups.

## Kalusugan ng Isang Grupo {#one-groups-health}

May seksyong **Health** ang sariling page ng bawat grupo na may isang linyang buod (mga miyembro, sumali, at umalis sa nakaraang 90 araw). I-click ang **See health** para buksan ang health view ng grupo: ang mga numerong **Members**, **Joined (90d)**, **Left (90d)**, at **Churn (90d)** nito, chart na **Membership Changes (12 months)**, chart na **Attendance Trend** para sa mga grupong nagsusubaybay ng attendance, at mga chart na **Age** at **Gender** ng mga miyembro nito.

## Paggamit ng Datos ng Kalusugan {#using-health-data}

- **Mataas na churn + mababang join** -- grupong lumiliit at hindi napapalitan ang mga nawalang miyembro. Sulit na kausapin ang lider ng grupo.
- **Mataas na join + mababang attendance** -- nagpapatala ang mga tao pero hindi sumisipot. Isaalang-alang ang follow-up para sa partisipasyon.
- **Mataas na average na attendance** -- malusog at aktibong grupo. Maaaring maging modelo para sa ibang grupo.

:::tip
Ang pag-click sa pangalan ng grupo ay direktang magdadala sa detail page ng grupo kung saan maaari mong suriin ang mga indibidwal na miyembro, talaan ng attendance, at calendar event.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Creating Groups](./creating-groups.md) — mag-set up ng mga grupo
- [Group Members](./group-members.md) — pamahalaan ang pagiging miyembro ng grupo
- [Tracking Attendance](../attendance/tracking-attendance.md) — itala ang mga session ng attendance na nagpapakain sa dashboard na ito
