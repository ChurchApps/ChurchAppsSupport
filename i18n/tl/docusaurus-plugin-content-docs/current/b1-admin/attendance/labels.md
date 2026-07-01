---
title: "Disenyo ng Label para sa Check-In"
---

# Disenyo ng Label para sa Check-In

<div class="article-intro">

Ang Label Designer ay nagpapahintulot sa iyo na lumikha at i-customize ang mga template ng name tag at pickup slip na nila-print kapag nag-check in ang mga pamilya ng kanilang mga anak. Maaari mong kontrolin nang eksakto kung anong impormasyon ang makikita sa bawat label, kung nasaan ito nakaposisyon, at paano ito magmukhang.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang [Attendance](setup) at i-configure ang hindi bababa sa isang service time na may check-in na enabled
- I-set up ang [Check-In](check-in) upang ang mga label ay nag-print
- Kailangan mo ng administrative access sa Attendance section

</div>

## Pagbubukas ng Label Designer

Sa B1 Admin, pumunta sa **Attendance** sa kaliwang sidebar at piliin ang **Labels**. Makikita mo ang isang listahan ng iyong mga naka-save na label templates, na pinagsama ayon sa uri: **Nametag** at **Pickup Slip**.

## Mga Ukol ng Label

- **Nametag** — nila-print at inikakabit sa bata. Karaniwang naglalaman ng pangalan ng bata, kanilang classroom/session, at security code.
- **Pickup Slip** — ibinibigay sa magulang o guardian. Karaniwang naglalaman ng security code at isang listahan ng mga bata na kanilang na-check in.

Ang B1 ay nagsisimula ka sa isang default nametag at isang default pickup slip template na sizing para sa standard 3.5 × 1.1 inch thermal labels.

## Paglikha ng Label Template

1. I-click ang **Add Nametag** o **Add Pickup Slip** (o gamitin ang dropdown upang pumili).
2. Isang bagong template ay bubukas sa label editor.

### Label Editor

Ang editor ay nagpapakita ng scaled preview ng label sa na-configure na laki. Sa kaliwang panel maaari mong i-configure:

- **Name** — ang template name (para sa iyong reference lamang)
- **Label Type** — Nametag o Pickup Slip
- **Width / Height** — label size sa inches

### Pagdagdag ng Blocks

Ang isang label ay itinayo mula sa blocks — indibidwal na bahagi ng nilalaman na nakaposisyon sa label canvas. I-click ang **Add Block** upang magsingil ng bagong block at piliin ang uri nito:

- **Field** — nag-pull ng data value sa oras ng pag-print:
  - `person.displayName` — ang buong pangalan ng tao
  - `sessions` — ang service/classroom na kanilang na-check in
  - `securityCode` — ang random na generated pickup security code
  - `children` — listahan ng mga bata (para sa pickup slips)
  - `person.nametagNotes` — anumang special notes sa tala ng tao
  - `campus` — ang pangalan ng campus
- **Text** — static text na iyong tinatipe (para sa headings, labels, o instructions)
- **Barcode** — isang barcode na nag-encode ng security code

### Pag-position ng Blocks

Bawat block ay may **X**, **Y**, **Width**, at **Height** fields na ipinahayag bilang percentages ng label canvas (0–100). I-adjust ang mga ito upang iposisyon ang nilalaman nang tumpak. Maaari mo ring itakda:

- **Font Size** — text size sa points
- **Bold** — toggle bold text
- **Align** — left, center, o right text alignment
- **Condition** — opsyonal na itago ang block kung ang isang field ay walang laman (halimbawa, ipakita lamang ang nametagNotes kung mayroon itong halaga)

### Pag-save

I-click ang **Save** upang i-save ang template. Ang updated template ay gagamitin sa susunod na panahon na nag-print ng labels sa B1 Checkin.

## Pag-reorder ng Templates

Kung mayroon kang maraming nametag o pickup slip templates, ang B1 Checkin ay gagamitin ang unang template sa listahan bilang default. I-drag ang mga template upang baguhin ang kanilang pagkakasunod-sunod.

## Pagbubura ng Template

I-click ang delete icon sa anumang template row at kumpirmahin. Ang pagbubura ng huling template ng isang uri ay nagre-restore ng default built-in template.

:::tip
Gumawa ng test print pagkatapos mag-edit ng template upang kumpirmahin na ang layout ay tumitingin ng tama bago ang iyong susunod na service.
:::

## Mga Kaugnay na Artikulo

- [Check-In Setup](setup) — i-configure ang mga service at group para sa check-in
- [Pagkumpleto ng Check-In](check-in) — ang check-in flow para sa mga pamilya
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — ang Checkin kiosk app
