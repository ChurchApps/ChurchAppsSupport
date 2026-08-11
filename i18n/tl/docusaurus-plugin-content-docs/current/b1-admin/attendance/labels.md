---
title: "Check-In Label Designer"
---

# Check-In Label Designer

<div class="article-intro">

Ang Label Designer ay nagbibigay-daan sa iyo na lumikha at mag-customize ng name tag at pickup slip template na nag-print kapag nag-check-in ang mga pamilya ng kanilang mga bata. Maaari mong kontrolin nang eksakto kung ano ang gumagana sa bawat label, kung saan ito nakaposisyon, at kung paano ito mukhang.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang [Attendance](setup) at mag-configure ng hindi bababa sa isang service time na may check-in enabled
- I-set up ang [Check-In](check-in) upang nag-print ang label
- Kailangan mo ng administrative access sa Attendance section

</div>

## Pagbubukas ng Label Designer

Sa B1 Admin, i-click ang **section menu** sa top-left corner (ang kasalukuyang pangalan ng section na may maliit na arrow sa tabi nito) at piliin ang **Mobile**. Sa navigation bar, piliin ang **B1 CheckIn**, pagkatapos i-click ang **Design Labels** button sa Check-in Labels card. Makikita mo ang listahan ng iyong saved label template, pinaghihiwalay sa uri: **Nametag** at **Pickup Slip**.

## Label Type

- **Nametag** — nag-print at naka-attach sa bata. Karaniwang kasama ang pangalan ng bata, kanilang kuwarto/session, at security code.
- **Pickup Slip** -- binibigay sa magulang o guardian. Karaniwang kasama ang security code at isang listahan ng mga batang na-check-in nila.

Ang B1 ay nagsisimula ka sa default nametag at default pickup slip template na nilagyan sa standard 3.5 × 1.1 inch thermal label.

## Lumilikha ng Label Template

1. I-click ang **Add Nametag** o **Add Pickup Slip** (o gamitin ang dropdown upang pumili).
2. Isang bagong template ay bumubukas sa label editor.

### Label Editor

Ang editor ay nagpapakita ng scaled preview ng label sa configured na laki. Sa kaliwang panel ay maaari mong i-configure:

- **Name** — ang pangalan ng template (para sa iyong reference lamang)
- **Label Type** — Nametag o Pickup Slip
- **Width / Height** — label size sa pulgada

### Pagdadagdag ng Block

Ang label ay itinayo mula sa block — individual na piraso ng nilalaman na nakaposisyon sa label canvas. I-click ang **Add Block** upang maglagay ng bagong block at piliin ang uri nito:

- **Field** — nag-pull ng data value sa print time:
  - `person.displayName` — ang buong pangalan ng tao
  - `sessions` — ang service/kuwarto na na-check-in nila
  - `securityCode` — ang random na ginawa na pickup security code
  - `children` — listahan ng mga bata (para sa pickup slip)
  - `person.nametagNotes` — anumang special note sa record ng tao
  - `campus` — ang pangalan ng campus
- **Text** — static text na iyong itinatype (para sa headings, label, o instruction)
- **Barcode** — isang barcode na nag-encode sa security code

### Pagposisyon ng Block

Bawat block ay may **X**, **Y**, **Width**, at **Height** fields na ipinahayag bilang porsyento ng label canvas (0–100). I-adjust ang mga ito upang tumpak na iposisyon ang nilalaman. Maaari mo rin itakda:

- **Font Size** — text size sa point
- **Bold** — i-toggle ang bold text
- **Align** — kaliwa, gitna, o kanang text alignment
- **Condition** — opsyonal na itago ang block kung walang laman ang field (halimbawa, ipakita lamang ang nametagNotes kung mayroon itong halaga)

### Pag-save

I-click ang **Save** upang i-save ang template. Ang updated template ay gagamitin sa susunod na pag-print ng label sa B1 Checkin.

## Pag-reorder ng Template

Kung mayroon kang maraming nametag o pickup slip template, ang B1 Checkin ay gagamitin ang unang template sa listahan bilang default. I-drag ang template upang i-reorder sila.

## Pagtanggal ng Template

I-click ang delete icon sa anumang template row at mag-confirm. Ang pagtanggal ng huling template ng isang uri ay nagpapanumbalik ng default built-in template.

:::tip
Gumawa ng test print pagkatapos mag-edit ng template upang mag-confirm na ang layout ay tama bago ang iyong susunod na serbisyo.
:::

## Mga Kaugnay na Artikulo

- [Check-In Setup](setup) — mag-configure ng service at group para sa check-in
- [Completing Check-In](check-in) — ang check-in flow para sa mga pamilya
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — ang Checkin kiosk app
