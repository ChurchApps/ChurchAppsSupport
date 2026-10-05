---
title: "Audit Log"
---

# Audit Log

<div class="article-intro">

Sinusubaybayan ng audit log ang lahat ng mahahalagang aksyon at pagbabago sa buong sistema ng pamamahala ng inyong simbahan. Gamitin ito para suriin ang aktibidad sa pag-log in, alamin kung sino ang gumawa ng mga pagbabago sa mga talaan ng tao, bantayan ang mga update sa pahintulot, at panatilihin ang pananagutan sa buong inyong team.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- B1 Admin account na may server admin access
- Pumunta sa **Settings** para makita ang Audit Log

</div>

## Pagtingin sa Audit Log

1. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas ng B1 Admin) at palawakin ang **Settings**.
2. I-click ang **Audit Log**.
3. Ipinapakita ng log ang mga kamakailang entry sa isang talahanayan na may mga sumusunod na column:
   - **Date** -- Kailan naganap ang aksyon.
   - **Category** -- Ang uri ng aksyon (may kulay para madaling makilala).
   - **Action** -- Ang ginawa (hal., create, update, delete, login_success).
   - **Entity** -- Ang uri at ID ng talaang naapektuhan.
   - **IP Address** -- Ang IP address ng user na gumawa ng aksyon.
   - **Details** -- Buod ng mga partikular na pagbabagong ginawa.

## Pag-filter ng Log

Gamitin ang mga filter sa itaas ng pahina para paliitin ang mga resulta:

- **Category** -- I-filter ayon sa uri ng aksyon:
  - **All Categories** -- Ipakita ang lahat.
  - **Login** -- Mga matagumpay at nabigong pag-log in.
  - **People** -- Paggawa, pag-update, o pagbura ng mga talaan ng tao.
  - **Permissions** -- Pagbibigay at pagbawi ng mga pahintulot.
  - **Donations** -- Mga pagbabago sa talaan ng donasyon.
  - **Groups** -- Mga aksyon sa pamamahala ng group.
  - **Forms** -- Aktibidad sa pagsusumite ng form.
  - **Settings** -- Mga pagbabago sa configuration.
- **Start Date** -- Ipakita ang mga entry mula sa petsang ito pasulong.
- **End Date** -- Ipakita ang mga entry hanggang sa petsang ito.

I-click ang **Search** matapos i-set ang inyong mga filter para i-update ang mga resulta.

## Pag-unawa sa mga Kategorya

May kulay ang bawat kategorya para madaling makilala:

- **Login** -- Asul na chip. Sinusubaybayan ang mga matagumpay at nabigong pagtatangkang mag-log in.
- **People** -- Lilang chip. Sinusubaybayan ang paggawa, pag-update, at pagbura ng mga talaan ng tao.
- **Permissions** -- Pulang chip. Sinusubaybayan kapag ibinibigay o binabawi ang mga karapatan sa access.
- **Donations** -- Berdeng chip. Sinusubaybayan ang mga pagbabago sa talaan ng donasyon.
- **Groups** -- Abuhing chip. Sinusubaybayan ang mga operasyon sa pamamahala ng group.
- **Forms** -- Kahel na chip. Sinusubaybayan ang aktibidad sa pagsusumite ng form.
- **Settings** -- Dilaw na chip. Sinusubaybayan ang mga pagbabago sa configuration.

## Pag-export ng Log

Kapag may ipinapakitang mga entry sa log, lalabas ang button na **CSV download**. I-click ito para i-export ang kasalukuyang na-filter na mga resulta sa isang spreadsheet para sa offline na pagsusuri o pag-iingat ng talaan.

## Pagination

Gamitin ang mga kontrol ng pagination sa ibaba ng talahanayan para mag-navigate sa mga resulta. Maaari kayong magpakita ng 25, 50, o 100 entry kada pahina.

:::info
Awtomatikong iniingatan ang mga entry ng audit log sa loob ng isang taon. Inaalis ang mga entry na mas matanda sa 365 araw para mapanatiling mabilis ang sistema.
:::

:::tip
Regular na suriin ang audit log, lalo na pagkatapos mag-onboard ng mga bagong miyembro ng team o gumawa ng malalaking pagbabago sa configuration. Nakakatulong ito para maagang matukoy ang hindi inaasahang aktibidad.
:::

## Mga Kaugnay na Artikulo

- [Mga Role at Pahintulot](../settings/roles-permissions) -- Pamahalaan kung sino ang may access sa ano
- [Seguridad ng Datos](../settings/data-security) -- Unawain kung paano pinoprotektahan ang inyong datos
- [Pangkalahatang-ideya ng mga Ulat](./index.md) -- Tingnan ang lahat ng available na ulat
