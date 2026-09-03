---
title: "Check-In Label Designer"
---

# Check-In Label Designer

<div class="article-intro">

Ang Label Designer ay nagbibigay-daan sa iyo na lumikha at i-customize ang name tag at pickup slip templates na nag-print kapag nag-check in ang mga pamilya ng kanilang mga bata. Maaari mong kontrolin kung anong impormasyon ang lumalabas sa bawat label, kung saan ito nakaposisyon, at kung paano ito mukhang.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-setup ang [Attendance](setup) at i-configure ang hindi bababa sa isang oras ng serbisyo na may check-in na-enable
- I-setup ang [Check-In](check-in) upang ang mga label ay nag-print
- Kailangan mo ng administrative access sa Attendance section

</div>

## Pagbubukas ng Label Designer

Sa B1 Admin, i-click ang **section menu** sa top-left corner (ang kasalukuyang pangalan ng section na may maliit na arrow sa tabi nito) at pumili ng **Mobile**. Sa navigation bar, piliin ang **B1 CheckIn**, pagkatapos ay i-click ang **Design Labels** button sa Check-in Labels card. Makikita mo ang isang listahan ng iyong mga salvadong label templates, na pinaghiwalay ng uri: **Nametag** at **Pickup Slip**.

## Mga Uri ng Label

- **Nametag** — na-print at nakadikit sa bata. Karaniwang kasama ang pangalan ng bata, kanilang classroom/session, at security code.
- **Pickup Slip** — ibinigay sa magulang o guardian. Karaniwang kasama ang security code at isang listahan ng mga batang nag-check in nila.

Ang B1 ay nagsisimula sa iyo na may default na nametag at default na pickup slip template na may sukat para sa standard na 3.5 × 1.1 inch thermal labels.

## Lumilikha ng isang Label Template

1. I-click ang **Add Nametag** o **Add Pickup Slip** (o gamitin ang dropdown upang pumili).
2. Ang isang bagong template ay bumubukas sa label editor.

### Label Editor

Ang editor ay nagpapakita ng scaled preview ng label sa na-configure na sukat. Sa kaliwang panel ay maaari mong i-configure ang:

- **Name** — ang pangalan ng template (para sa iyong sanggunian lamang)
- **Label Type** — Nametag o Pickup Slip
- **Width / Height** — label size sa pulgada

### Pagdagdag ng Blocks

Ang isang label ay binuo mula sa mga block — mga indibidwal na piraso ng nilalaman na nakaposisyon sa label canvas. I-click ang **Add Block** upang magpasok ng isang bagong block at piliin ang uri nito:

- **Field** — naghihintay ng data value sa print time:
  - `person.displayName` — ang buong pangalan ng tao
  - `sessions` — ang serbisyo/classroom na nag-check in sila
  - `securityCode` — ang random na nabuong pickup security code
  - `children` — listahan ng mga bata (para sa pickup slips)
  - `person.nametagNotes` — anumang espesyal na mga tala sa record ng tao
  - `campus` — ang pangalan ng campus
- **Text** — static na teksto na iyong nai-type (para sa mga heading, label, o instruksyon)
- **Barcode** — isang barcode na nag-encode sa security code

### Pag-posisyon ng mga Block

Bawat block ay may **X**, **Y**, **Width**, at **Height** na mga field na ipinahayag bilang percentage ng label canvas (0–100). I-adjust ang mga ito upang i-posisyon ang nilalaman nang eksakto. Maaari mo ring i-set ang:

- **Font Size** — text size sa mga punto
- **Bold** -- i-toggle ang bold text
- **Align** — kaliwa, gitna, o kanang text alignment
- **Condition** — opsyonal na itago ang block kung ang isang field ay walang laman (halimbawa, ipakita lamang ang nametagNotes kung mayroon itong halaga)

### Pag-save

I-click ang **Save** upang i-save ang template. Ang na-update na template ay gagamitin sa susunod na pagprint ng mga label sa B1 Checkin.

## Pag-reorder ng mga Template

Kung mayroon kang maraming nametag o pickup slip templates, ang B1 Checkin ay gagamitin ang unang template sa listahan bilang default. I-drag ang mga template upang i-reorder ang mga ito.

## Pagbabura ng isang Template

I-click ang delete icon sa anumang row ng template at kumpirmahin. Ang pagbabura ng huling template ng isang uri ay nagre-restore ng default built-in template.

:::tip
Gumawa ng isang test print pagkatapos baguhin ang isang template upang kumpirmahin ang layout ay mukhang tama bago ang iyong susunod na serbisyo.
:::

## Mga Kaugnay na Artikulo

- [Check-In Setup](setup) — i-configure ang mga serbisyo at grupo para sa check-in
- [Completing Check-In](check-in) — ang check-in flow para sa mga pamilya
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — ang Checkin kiosk app
