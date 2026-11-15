---
title: "Demograpiya"
description: "Tingnan ang edad, kasarian, membership, marital status, at komposisyon ng campus ng iyong kongregasyon sa mga interactive na chart ng B1 Admin, at mag-drill down sa anumang grupo."
---

# Demograpiya

<div class="article-intro">

Ang dashboard na **Demographics** ay nagbibigay ng visual na larawan ng iyong kongregasyon — sino sila, ilan sila, at paano nakakalat ang iyong membership sa mga pangkat ng edad, kasarian, marital status, at campus. Interactive ang bawat chart: i-click ang alinmang bahagi para dumiretso sa na-filter na paghahanap sa People na nagpapakita nang eksakto sa mga taong iyon.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Dapat umiral ang mga tao sa iyong directory. Tingnan ang [Adding People](./adding-people.md) o [Importing Data](./importing-data.md) para makapagsimula.
- Para hatiin ang chart ng Campus ayon sa campus, kailangan mo munang i-configure ang mga campus sa [Settings → Campuses](../settings/campuses.md).

</div>

## Pagbukas ng Demographics {#opening-demographics}

Mula sa pahinang **People**, i-click ang **Demographics** sa header ng pahina. Ipinapakita ng pahina ang kabuuang bilang ng tao (**Total**) sa itaas, kasunod ang mga chart na inilarawan sa ibaba. Nagpapakita rin ang bawat donut chart ng kabuuan nito sa ilalim ng chart. I-click ang **People** sa kanang itaas para bumalik sa directory.

## Mga Chart {#charts}

### Edad {#age}

Isang stacked bar chart na nagpapakita kung ilang tao ang nasa bawat pangkat ng edad: 0–3, 4–11, 12–18, 19–25, 26–35, 36–50, 51–64, at 65+. Hinahati ang bawat bar ayon sa kasarian — **Female**, **Male**, at, kapag may sinumang sa pangkat na iyon na walang nakatalang kasarian, **Unassigned** — para makita mo agad ang breakdown ng kasarian sa bawat pangkat ng edad. Hindi kasama sa chart na ito ang mga taong walang birth date.

### Membership Types {#membership-types}

Isang donut chart na naghahati sa iyong kongregasyon ayon sa membership status (halimbawa, Member, Regular Attendee, Visitor, at iba pa). Lumalabas bilang **Unassigned** ang mga taong walang status.

### Gender {#gender}

Isang donut chart na nagpapakita ng proporsyon ng female, male, at unassigned na record sa iyong directory.

### Marital Status {#marital-status}

Isang donut chart na nagpapakita ng breakdown ayon sa mga halaga ng marital status (halimbawa, Married, Single, Widowed).

### Campus {#campus}

Isang donut chart na nagpapakita kung paano nakakalat ang mga tao sa mga campus ng iyong simbahan. Lumalabas bilang **Unassigned** ang mga taong walang naka-assign na campus, kaya ang simbahang walang campus ay makakakita ng iisang **Unassigned** na hiwa.

## Pag-drill Down sa Datos {#drilling-into-the-data}

I-click ang alinmang hiwa ng donut chart (o ang pangalan nito sa legend) o ang alinmang bahagi ng bar sa chart ng edad para pumunta sa pahinang **People** na naka-filter na para ipakita nang eksakto ang mga taong iyon. Nananatiling nakalapat ang filter pagkatapos mag-load ng pahina, at ipinapakita ng bilang sa itaas ng listahan kung ilang household at tao ang tumugma. Gamitin ito para mabilis na makabuo ng listahan ng contact, magpatakbo ng bulk action, o mag-export ng isang segment — halimbawa, i-click ang hiwa na **Visitor** sa Membership Status para makita ang lahat ng bisita at ipadala sila sa isang workflow.

:::tip
Pagkatapos mag-drill down sa na-filter na resulta, gamitin ang **Save as List** sa People search para i-save ang filter na iyon para sa hinaharap na paggamit. Tingnan ang [Saved Lists](./lists.md).
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Searching People](./searching-people.md) — ang pahinang People na mapupuntahan mo kapag nag-drill down mula sa chart
- [Saved Lists](./lists.md) — i-save ang demographic segment bilang listahang magagamit muli
- [Campuses](../settings/campuses.md) — i-configure ang mga campus para lumabas ang chart ng Campus
