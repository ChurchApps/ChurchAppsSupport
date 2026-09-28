---
title: "Kalusugan ng Mga Grupo"
---

# Kalusugan ng Mga Grupo

<div class="article-intro">

Ang Groups Health dashboard ay nagbibigay sa iyo ng isang panoramikong view kung paano ang lahat ng iyong mga grupo ay gumagana -- ang mga trend ng pagiging miyembro, average na dumalo, at paglaki o attrition sa nakaraang 90 na araw -- lahat sa isang solong sortable na table.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng ilang mga grupo na may mga miyembro upang makita ang makabuluhang data. Tingnan ang [Paglikha ng Mga Grupo](creating-groups).
- Ang attendance data ay kinukuha mula sa mga naka-record na session. Tingnan ang [Dumalo](../attendance/) na seksyon.

</div>

## Pagbubukas ng Groups Health

Sa B1 Admin, buksan ang **section menu** sa itaas-kaliwa na sulok at piliin ang **Mga Tao**, pagkatapos i-click ang **Mga Grupo** sa navigation bar at i-click ang **Group Health** button sa page header. Ang dashboard ay nag-load ng isang table na may isang row bawat grupo.

## Mga Haligi

| Haligi | Kung ano ang ipinakikita |
|--------|--------------|
| **Pangalan** | Ang pangalan ng grupo, na naka-link sa pahina ng detalye ng grupo |
| **Kategorya** | Ang kategorya ng grupo |
| **Mga Miyembro** | Kasalukuyang aktibong bilang ng mga miyembro |
| **Sumali (90d)** | Mga miyembro na sumali sa nakaraang 90 na araw |
| **Naiwan (90d)** | Mga miyembro na nag-iwan sa nakaraang 90 na araw |
| **Churn (90d)** | Net churn rate bilang isang porsyento sa loob ng 90 na araw |
| **Avg Dumalo** | Average headcount bawat attendance session |

I-click ang anumang header ng haligi upang i-sort ang table sa pamamagitan ng haligi na iyon. I-click ulit upang baligtarin ang direksyon ng sorting.

## Paggamit ng Health Data

- **Mataas na churn + mababang joins** -- isang grupo na lumalaki at hindi nagpalit ng mga nawalan na miyembro. Karapat-dapat sa usapan sa lider ng grupo.
- **Mataas na joins + mababang dumalo** -- ang mga tao ay nag-sign up ngunit hindi dumarating. Isaalang-alang ang engagement follow-up.
- **Mataas na average na dumalo** -- isang malusog, aktibong grupo. Potensyal na modelo para sa ibang mga grupo.

:::tip
Ang pag-click sa pangalan ng grupo ay tumutulong sa iyo nang direkta sa pahina ng detalye ng grupo kung saan maaari mong suriin ang mga indibidwal na miyembro, mga record ng dumalo, at mga kaganapang calendar.
:::

## Mga Kaugnay na Artikulo

- [Paglikha ng Mga Grupo](creating-groups) -- mag-set up ng mga grupo
- [Mga Miyembro ng Grupo](group-members) -- pamahalaan ang pagiging miyembro ng grupo
- [Pag-track ng Dumalo](../attendance/tracking-attendance) -- tala sa mga session na dumalo na naipapakain sa dashboard na ito
