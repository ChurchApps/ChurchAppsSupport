---
title: "Audit Log"
---

# Audit Log

<div class="article-intro">

Ang audit log ay sumusubaybay sa lahat ng mahalagang aksyon at pagbabago sa buong church management system. Gamitin ito upang suriin ang login activity, subaybayan kung sino ang gumawa ng mga pagbabago sa records ng mga tao, subaybayan ang mga pagbabago ng pahintulot, at panatilihing accountable ang inyong koponan.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- B1 Admin account na may server admin access
- Mag-navigate sa **Settings** upang mahanap ang Audit Log

</div>

## Pagtingin sa Audit Log

1. Magpunta sa **Settings** sa B1 Admin.
2. Piliin ang **Audit Log**.
3. Ang log ay nagpapakita ng mga kamakailan na entry sa isang table na may mga susunod na kolumn:
   - **Date** -- Kailan ang aksyon ay nangyari.
   - **Category** -- Ang uri ng aksyon (may kulay para sa mabilis na pagsusuri).
   - **Action** -- Kung ano ang ginawa (e.g., create, update, delete, login_success).
   - **Entity** -- Ang uri at ID ng record na naaapektuhan.
   - **IP Address** -- Ang IP address ng user na nagsagawa ng aksyon.
   - **Details** -- Isang summary ng tiyak na mga pagbabago na ginawa.

## Pag-filter ng Log

Gamitin ang mga filter sa itaas ng pahina upang mabawasan ang mga resulta:

- **Category** -- I-filter ayon sa uri ng aksyon:
  - **All Categories** -- Ipakita ang lahat.
  - **Login** -- Mga successful at failed login attempts.
  - **People** -- Paglikha, pag-update, o pagbura ng mga record ng tao.
  - **Permissions** -- Mga grant at revocation ng pahintulot.
  - **Donations** -- Mga pagbabago ng record ng donasyon.
  - **Groups** -- Mga aksyon ng pamamahala ng grupo.
  - **Forms** -- Aktibidad ng pag-submit ng form.
  - **Settings** -- Mga pagbabago ng pagsasaayos.
- **Start Date** -- Ipakita ang mga entry mula sa pinting na ito hanggang sa hinaharap.
- **End Date** -- Ipakita ang mga entry hanggang sa pinting na ito.

I-click ang **Search** pagkatapos itakda ang inyong mga filter upang i-update ang mga resulta.

## Pag-unawa sa Mga Kategorya

Bawat kategorya ay may kulay para sa mabilis na pagkilala:

- **Login** -- Blue chip. Sumusubaybay sa mga successful at failed login attempts.
- **People** -- Purple chip. Sumusubaybay sa paglikha, pag-update, at pagbura ng records ng tao.
- **Permissions** -- Red chip. Sumusubaybay sa pagbibigay o pagsasaad ng access rights.
- **Donations** -- Green chip. Sumusubaybay sa mga pagbabago ng record ng donasyon.
- **Groups** -- Gray chip. Sumusubaybay sa mga operasyon ng pamamahala ng grupo.
- **Forms** -- Orange chip. Sumusubaybay sa aktibidad ng pag-submit ng form.
- **Settings** -- Yellow chip. Sumusubaybay sa mga pagbabago ng pagsasaayos.

## Pag-export ng Log

Kapag ang mga entry ng log ay ipinapakita, isang **CSV download** button ay lilitaw. I-click ito upang i-export ang kasalukuyang filtered results sa isang spreadsheet para sa offline review o pag-recording.

## Pagination

Gamitin ang pagination controls sa ilalim ng table upang mag-navigate sa mga resulta. Maaari ninyong ipakita ang 25, 50, o 100 na mga entry bawat pahina.

:::info
Ang mga audit log entries ay awtomatikong pinanatili para sa isang taon. Ang mga entry na mas lumang kaysa 365 days ay tinanggal upang panatilihing performant ang system.
:::

:::tip
Suriin ang audit log nang regular, lalo na pagkatapos ng pag-onboard ng mga bagong miyembro ng koponan o gumawa ng mga malaking pagbabago sa pagsasaayos. Ito ay tumutulong na matukoy ang hindi inaasahang aktibidad nang maaga.
:::

## Related Articles

- [Roles & Permissions](../settings/roles-permissions) -- Pamahalaan kung sino ang may access sa ano
- [Data Security](../settings/data-security) -- Maunawaan kung paano ang inyong data ay protektado
- [Reports Overview](./index.md) -- Tingnan ang lahat ng available reports
