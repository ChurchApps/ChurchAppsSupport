---
title: "Designer ng Check-In Label"
---

# Designer ng Check-In Label

<div class="article-intro">

Ang Label Designer ay nagbibigay-daan sa iyo na lumikha at i-customize ang mga template ng name tag at pickup slip na nag-print kapag nag-check-in ang mga pamilya ng kanilang mga bata. Maaari mong kontrol kung eksaktong anong impormasyon ang lilitaw sa bawat label, kung saan ito nakaposisyon, at kung paano ito mukhang.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang [Attendance](setup) at i-configure ang hindi bababa sa isang oras ng serbisyo na may check-in enabled
- I-set up ang [Check-In](check-in) upang ang mga label ay nag-print
- Kailangan mo ng administrative access sa Attendance na seksyon

</div>

## Pagbubukas ng Label Designer

Sa B1 Admin, pumunta sa **Attendance** sa kaliwang sidebar at piliin ang **Labels**. Makikita mo ang isang listahan ng iyong naka-save na mga template ng label, na nakaisa sa pamamagitan ng uri: **Nametag** at **Pickup Slip**.

## Mga Uri ng Label

- **Nametag** — nai-print at nakakabit sa bata. Karaniwang nagsasama ng pangalan ng bata, kanilang classroom/session, at isang security code.
- **Pickup Slip** — ibinigay sa magulang o tagapag-alaga. Karaniwang nagsasama ng security code at isang listahan ng mga bata na na-check-in nila.

Ang B1 ay nagsisimula sa iyo na may isang default nametag at isang default na pickup slip template na sinusukat para sa standard na 3.5 × 1.1 inch thermal labels.

## Paglikha ng isang Label Template

1. Mag-click **Add Nametag** o **Add Pickup Slip** (o gamitin ang dropdown upang pumili).
2. Ang isang bagong template ay bumubukas sa label editor.

### Label Editor

Ang editor ay nagpapakita ng isang scaled preview ng label sa configured na laki. Sa kaliwang panel maaari mong i-configure:

- **Pangalan** -- ang pangalan ng template (para sa iyong reference lamang)
- **Uri ng Label** -- Nametag o Pickup Slip
- **Lapad / Taas** -- label size sa pulgada

### Pagdagdag ng mga Block

Ang isang label ay itinayo mula sa mga block -- ang indibidwal na mga piece ng nilalaman na nakaposisyon sa label canvas. Mag-click **Add Block** upang magpasok ng isang bagong block at pumili ng uri nito:

- **Field** -- naghihikayat ng isang data value sa print time:
  - `person.displayName` -- ang buong pangalan ng tao
  - `sessions` -- ang serbisyo/classroom na na-check-in nila
  - `securityCode` -- ang random na nakagenerasyong pickup security code
  - `children` -- listahan ng mga bata (para sa pickup slips)
  - `person.nametagNotes` -- anumang mga espesyal na tala sa tala ng tao
  - `campus` -- ang pangalan ng campus
- **Teksto** -- static text na iyong ini-type (para sa mga heading, label, o mga tagubilin)
- **Barcode** -- isang barcode na nag-encode ng security code

### Pagpoposisyon ng mga Block

Ang bawat block ay may **X**, **Y**, **Lapad**, at **Taas** na mga field na ipinahayag bilang mga porsyento ng label canvas (0–100). I-adjust ang mga ito upang maposisyon nang tumpak ang nilalaman. Maaari mo rin itakda:

- **Font Size** -- text size sa mga punto
- **Bold** -- toggle bold text
- **Align** -- kaliwa, center, o kanan na text alignment
- **Condition** -- bilang opsyonal na itago ang block kung ang isang field ay walang laman (halimbawa, ipakita lamang ang nametagNotes kung mayroon itong halaga)

### Pag-save

Mag-click **Save** upang i-save ang template. Ang na-update na template ay gagamitin sa susunod na pagkakataon na nag-print ang mga label sa B1 Checkin.

## Pag-reorder ng mga Template

Kung mayroon kang maraming nametag o pickup slip templates, ang B1 Checkin ay gagamitin ang unang template sa listahan ayon sa default. I-drag ang mga template upang i-reorder ang mga ito.

## Pag-delete ng isang Template

Mag-click sa delete icon sa anumang template row at kumpirmahin. Ang pag-delete ng huling template ng isang uri ay nagrerestora ng default na built-in template.

:::tip
Gumawa ng isang test print pagkatapos mag-edit ng template upang kumpirmahin na ang layout ay mukhang tama bago ang iyong susunod na serbisyo.
:::

## Mga Kaugnay na Artikulo

- [Check-In Setup](setup) -- i-configure ang mga serbisyo at grupo para sa check-in
- [Pagsasagawa ng Check-In](check-in) -- ang check-in flow para sa mga pamilya
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/index) -- ang Checkin kiosk app
