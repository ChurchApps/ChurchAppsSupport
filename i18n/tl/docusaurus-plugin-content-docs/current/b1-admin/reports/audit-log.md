---
title: "Audit Log"
description: "Suriin ang audit log sa B1 Admin para makita kung sino ang nag-log in, nag-edit ng mga talaan ng tao, o nagbago ng mga permiso, at i-export ang mga na-filter na entry sa CSV."
---

# Audit Log

<div class="article-intro">

Itinatala ng audit log ang lahat ng mahahalagang aksyon at pagbabago sa iyong church management system. Gamitin ito para suriin ang login activity, subaybayan kung sino ang gumawa ng mga pagbabago sa mga talaan ng tao, bantayan ang mga update sa permiso, at panatilihin ang pananagutan sa iyong team.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang role na may permiso na **Edit Church Settings** (nasa seksyong **Content** ng mga permiso ng role; ito rin ang permisong nagbubukas ng **Settings**). Tingnan ang [Roles & Permissions](../settings/roles-permissions.md).

</div>

## Pagtingin sa Audit Log {#viewing-the-audit-log}

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa ng B1 Admin) at palawakin ang **Settings**.
2. I-click ang **Audit Log**.
3. Ipinapakita ng log ang mga kamakailang entry sa isang table na may sumusunod na column:
   - **Date** -- Kailan naganap ang aksyon.
   - **Module** -- Ang bahagi ng B1 kung saan ginawa ang pagbabago (halimbawa, membership o giving).
   - **Category** -- Ang uri ng talaan o aksyon (may kulay para mabilis mapansin).
   - **Action** -- Ang ginawa (hal., Donation Saved, Login Success, Note Updated).
   - **Entity** -- Ang uri at ID ng talaang naapektuhan.
   - **IP Address** -- Ang IP address ng user na nagsagawa ng aksyon.
4. I-click ang arrow sa simula ng isang row para makita ang mga detalye nito: isang table ng bawat binagong field na may **Old Value** at **New Value**, o ang **Deleted Record** kung delete ang aksyon.

## Pag-filter ng Log {#filtering-the-log}

Gamitin ang mga filter sa itaas ng pahina para paliitin ang mga resulta:

- **Module** -- I-filter ayon sa lugar: **All Modules**, **People**, **Giving**, **Attendance**, **Messaging**, **Content**, **Serving**, o **Lessons**.
- **Category** -- I-filter ayon sa uri ng aksyon:
  - **All Categories** -- Ipakita ang lahat.
  - **Login** -- Mga matagumpay at nabigong login.
  - **People** -- Paggawa, pag-update, o pagbura ng mga talaan ng tao.
  - **Permissions** -- Mga pagbibigay at pagbawi ng permiso.
  - **Donations** -- Mga pagbabago sa talaan ng donasyon.
  - **Groups** -- Mga aksyon sa pamamahala ng grupo.
  - **Forms** -- Aktibidad ng mga form submission.
  - **Settings** -- Mga pagbabago sa configuration.
- **Start Date** -- Ipakita ang mga entry mula sa petsang ito pasulong.
- **End Date** -- Ipakita ang mga entry hanggang sa petsang ito.

I-click ang **Search** pagkatapos itakda ang iyong mga filter para ma-update ang mga resulta.

## Pag-unawa sa mga Category {#understanding-categories}

Ang category ng bawat entry ay ipinapakita bilang chip, may kulay para madaling makilala:

- **login** -- Asul na chip. Sinusubaybayan ang matagumpay at nabigong pagtatangkang mag-login.
- **person** -- Asul na chip. Sinusubaybayan ang paggawa, pag-update, at pagbura ng talaan ng tao.
- **permission** -- Pulang chip. Sinusubaybayan kung kailan ibinibigay o binabawi ang mga karapatan sa access.
- **donation** -- Berdeng chip. Sinusubaybayan ang mga pagbabago sa talaan ng donasyon.
- **form** -- Kahel na chip. Sinusubaybayan ang aktibidad ng form submission.
- **group**, **settings**, at iba pang category (gaya ng **userchurch**) -- Kulay-abong chip.

## Kasaysayan ng Note sa mga Tao at Grupo {#note-history-on-people-and-groups}

Kung kaya mong buksan ang audit log, makikita mo rin ang bakas ng mga binagong note mismo sa lugar ng mga note, sa tab na **Notes** ng isang tao o grupo:

1. Ang na-edit na note ay nagpapakita ng **(edited · view history)** sa tabi ng petsa nito. I-click ito para buksan ang audit log na naka-filter sa kasaysayan ng note ng taong o grupong iyon.
2. Ang binurang note ay nag-iiwan ng kulay-abong markang **Deleted note** sa lugar nito, na nagpapakita kung sino ang sumulat nito, kailan ito ipinost, at kailan ito binura. I-click ang **View history** para buksan ang parehong naka-filter na log.
3. Sa naka-filter na log, palawakin ang entry na **Note Updated** o **Note Deleted** para makita ang lumang teksto at ang account na gumawa ng pagbabago. I-click ang **Show all** para alisin ang filter.
4. Sa column na **Entity**, ang ID ng note ng isang tao o grupo ay nagli-link pabalik sa mga note ng taong o grupong iyon.

Ang mga staff na hindi makabukas ng audit log ay makikita ang listahan ng mga note nang wala ang mga markang ito.

## Pag-export ng Log {#exporting-the-log}

Kapag nakikita ang mga entry ng log, may lalabas na button na **Export CSV** sa itaas ng pahina. I-click ito para i-export ang kasalukuyang na-filter na resulta sa spreadsheet para sa offline na pagsusuri o pag-iingat ng talaan.

## Pagpe-paginate {#pagination}

Gamitin ang mga pagpipilian sa pagpe-paginate sa ibaba ng table para mag-navigate sa mga resulta. Maaari mong ipakita ang 25, 50 (ang default), o 100 na entry kada pahina.

:::info
Awtomatikong itinatago ang mga audit log entry nang isang taon. Tinatanggal ang mga entry na mas matanda sa 365 araw para mapanatiling mabilis ang sistema.
:::

:::tip
Regular na suriin ang audit log, lalo na pagkatapos mag-onboard ng mga bagong miyembro ng team o gumawa ng malalaking pagbabago sa configuration. Nakakatulong ito para maagang matukoy ang hindi inaasahang aktibidad.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Roles & Permissions](../settings/roles-permissions.md) -- Pamahalaan kung sino ang may access sa ano
- [Data Security](../settings/data-security.md) -- Alamin kung paano pinoprotektahan ang iyong datos
- [Reports Overview](./index.md) -- Tingnan ang lahat ng available na report
