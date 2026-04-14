---
title: "Audit Log"
---

# Audit Log

<div class="article-intro">

Ang audit log ay sinusubaybayan ang lahat ng mga significant na aksyon at pagbabago sa buong inyong church management system. Gamitin ito upang suriin ang login activity, subaybayan kung sino ang gumawa ng mga pagbabago sa people records, subaybayan ang mga permission update, at panatilihin ang accountability sa buong inyong team.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- B1 Admin account na may server admin access
- Mag-navigate sa **Settings** upang mahanap ang Audit Log

</div>

## Pagtingin sa Audit Log

1. Pumunta sa **Settings** sa B1 Admin.
2. Piliin ang **Audit Log**.
3. Ang log ay nagpapakita ng mga recent entry sa isang table na may mga sumusunod na column:
   - **Date** -- Kailan nangyari ang aksyon.
   - **Category** -- Ang uri ng aksyon (color-coded para sa mabilis na pag-scan).
   - **Action** -- Ano ang ginawa (e.g., create, update, delete, login_success).
   - **Entity** -- Ang uri at ID ng record na naapektuhan.
   - **IP Address** -- Ang IP address ng user na nagsagawa ng aksyon.
   - **Details** -- Isang buod ng mga specific na pagbabago na ginawa.

## Pag-filter ng Log

Gamitin ang mga filter sa tuktok ng pahina upang paliitin ang mga resulta:

- **Category** -- I-filter ayon sa uri ng aksyon:
  - **All Categories** -- Ipakita ang lahat.
  - **Login** -- Mga login success at failure.
  - **People** -- Lumilikha, nag-update, o nag-delete ng person records.
  - **Permissions** -- Permission grants at revocations.
  - **Donations** -- Mga pagbabago sa donation record.
  - **Groups** -- Mga aksyon sa pamamahala ng grupo.
  - **Forms** -- Form submission activity.
  - **Settings** -- Mga pagbabago sa configuration.
- **Start Date** -- Ipakita ang mga entry mula sa date na ito pataas.
- **End Date** -- Ipakita ang mga entry hanggang sa date na ito.

I-click ang **Search** pagkatapos itakda ang inyong mga filter upang i-update ang mga resulta.

## Pag-unawa sa Mga Kategorya

Ang bawat kategorya ay color-coded para sa mabilis na pagkilala:

- **Login** -- Blue chip. Sinusubaybayan ang successful at failed login attempts.
- **People** -- Purple chip. Sinusubaybayan ang person record creates, updates, at deletes.
- **Permissions** -- Red chip. Sinusubaybayan kung kailan ang access rights ay ibinigay o inalis.
- **Donations** -- Green chip. Sinusubaybayan ang mga pagbabago sa donation record.
- **Groups** -- Gray chip. Sinusubaybayan ang mga operations sa pamamahala ng grupo.
- **Forms** -- Orange chip. Sinusubaybayan ang form submission activity.
- **Settings** -- Yellow chip. Sinusubaybayan ang mga pagbabago sa configuration.

## Pag-export ng Log

Kapag ipinapakita ang mga log entry, lumilitaw ang isang **CSV download** button. I-click ito upang mag-export ng mga kasalukuyang filtered result sa isang spreadsheet para sa offline review o record-keeping.

## Pagination

Gamitin ang mga pagination control sa ibaba ng table upang mag-navigate sa mga resulta. Maaari kayong magpakita ng 25, 50, o 100 entry bawat pahina.

:::info
Ang mga audit log entry ay awtomatikong napapanatili sa loob ng isang taon. Ang mga entry na mas lumang 365 days ay inalis upang panatilihing performant ang system.
:::

:::tip
Suriin ang audit log nang regular, lalo na pagkatapos onboarding ng mga bagong team member o gumawa ng mga significant na pagbabago sa configuration. Ito ay tumutulong na matukoy ang hindi inaasahang activity nang maaga.
:::

## Mga Kaugnay na Artikulo

- [Roles & Permissions](../settings/roles-permissions) -- Pamahalaan kung sino ang may access sa ano
- [Data Security](../settings/data-security) -- Maunawaan kung paano protektado ang inyong data
- [Reports Overview](./index) -- Tingnan ang lahat ng available reports
