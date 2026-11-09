---
title: "Audit Log"
description: "Suriin ang audit log sa B1 Admin para makita kung sino ang nag-log in, nag-edit ng mga record ng tao, o nagbago ng mga pahintulot, at i-export sa CSV ang mga na-filter na entry."
---

# Audit Log

<div class="article-intro">

Sinusubaybayan ng audit log ang lahat ng mahahalagang aksyon at pagbabago sa buong sistema ng pamamahala ng iyong simbahan. Gamitin ito para suriin ang aktibidad sa pag-log in, subaybayan kung sino ang gumawa ng mga pagbabago sa mga record ng tao, bantayan ang mga update sa pahintulot, at panatilihin ang pananagutan sa buong team.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang B1 Admin account na may server admin access
- Pumunta sa **Settings** para makita ang Audit Log

</div>

## Pagtingin sa Audit Log

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at i-expand ang **Settings**.
2. I-click ang **Audit Log**.
3. Ipinapakita ng log ang mga kamakailang entry sa isang table na may mga sumusunod na column:
   - **Date** -- Kailan naganap ang aksyon.
   - **Category** -- Ang uri ng aksyon (may kulay para madaling makilala).
   - **Action** -- Ang ginawa (hal., create, update, delete, login_success).
   - **Entity** -- Ang uri at ID ng record na naapektuhan.
   - **IP Address** -- Ang IP address ng user na gumawa ng aksyon.
   - **Details** -- Buod ng mga partikular na pagbabagong ginawa.

## Pag-filter ng Log

Gamitin ang mga filter sa itaas ng pahina para paliitin ang mga resulta:

- **Category** -- I-filter ayon sa uri ng aksyon:
  - **All Categories** -- Ipakita ang lahat.
  - **Login** -- Mga matagumpay at nabigong pag-log in.
  - **People** -- Paglikha, pag-update, o pagbura ng mga person record.
  - **Permissions** -- Pagbibigay at pagbawi ng mga pahintulot.
  - **Donations** -- Mga pagbabago sa tala ng donasyon.
  - **Groups** -- Mga aksyon sa pamamahala ng grupo.
  - **Forms** -- Aktibidad sa pagsusumite ng form.
  - **Settings** -- Mga pagbabago sa configuration.
- **Start Date** -- Ipakita ang mga entry mula sa petsang ito pasulong.
- **End Date** -- Ipakita ang mga entry hanggang sa petsang ito.

I-click ang **Search** pagkatapos itakda ang iyong mga filter para i-update ang mga resulta.

## Pag-unawa sa mga Kategorya

May kulay ang bawat kategorya para madaling makilala:

- **Login** -- Asul na chip. Sinusubaybayan ang mga matagumpay at nabigong pagtatangkang mag-log in.
- **People** -- Lilang chip. Sinusubaybayan ang paglikha, pag-update, at pagbura ng mga person record.
- **Permissions** -- Pulang chip. Sinusubaybayan kapag may ibinigay o binawing karapatan sa access.
- **Donations** -- Berdeng chip. Sinusubaybayan ang mga pagbabago sa tala ng donasyon.
- **Groups** -- Abuhing chip. Sinusubaybayan ang mga operasyon sa pamamahala ng grupo.
- **Forms** -- Kahel na chip. Sinusubaybayan ang aktibidad sa pagsusumite ng form.
- **Settings** -- Dilaw na chip. Sinusubaybayan ang mga pagbabago sa configuration.

## Mga Kasaysayan ng Note sa mga Tao at Grupo

Kung mabubuksan mo ang audit log, makikita mo rin ang bakas ng mga binagong note mismo sa tab na **Notes** ng isang tao o grupo:

1. Ang na-edit na note ay nagpapakita ng **(edited · view history)** sa tabi ng petsa nito. I-click ito para buksan ang audit log na naka-filter sa kasaysayan ng note ng taong o grupong iyon.
2. Ang binurang note ay nag-iiwan ng kulay-abong marker na **Deleted note** sa puwesto nito, na nagpapakita kung sino ang sumulat nito, kailan ito na-post, at kailan ito binura. I-click ang **View history** para buksan ang parehong naka-filter na log.
3. Sa naka-filter na log, i-expand ang entry na **Note Updated** o **Note Deleted** para makita ang lumang teksto at ang account na gumawa ng pagbabago. I-click ang **Show all** para alisin ang filter.
4. Sa column na **Entity**, ang ID ng note ng isang tao o grupo ay nagli-link pabalik sa mga note ng taong o grupong iyon.

Ang mga staff na hindi makabukas ng audit log ay makikita ang listahan ng note nang walang mga marker na ito.

## Pag-e-export ng Log

Kapag may ipinapakitang mga entry ng log, lalabas ang button na **CSV download**. I-click ito para i-export ang kasalukuyang na-filter na mga resulta sa spreadsheet para sa offline na pagsusuri o pag-iingat ng tala.

## Pagination

Gamitin ang mga kontrol ng pagination sa ibaba ng table para mag-navigate sa mga resulta. Maaari kang magpakita ng 25, 50, o 100 entry kada pahina.

:::info
Awtomatikong iniingatan ang mga entry ng audit log sa loob ng isang taon. Inaalis ang mga entry na mas matanda sa 365 araw para mapanatiling mabilis ang sistema.
:::

:::tip
Regular na suriin ang audit log, lalo na pagkatapos mag-onboard ng mga bagong miyembro ng team o gumawa ng malalaking pagbabago sa configuration. Nakakatulong ito para maagang matukoy ang hindi inaasahang aktibidad.
:::

## Mga Kaugnay na Artikulo

- [Roles & Permissions](../settings/roles-permissions.md) -- Pamahalaan kung sino ang may access sa ano
- [Data Security](../settings/data-security.md) -- Unawain kung paano pinoprotektahan ang iyong datos
- [Reports Overview](./index.md) -- Tingnan ang lahat ng available na ulat
