---
title: "Check-In Label Designer"
---

# Check-In Label Designer

<div class="article-intro">

Hinahayaan kayo ng Label Designer na lumikha at mag-customize ng mga template ng name tag at pickup slip na napi-print kapag nag-check in ang mga pamilya ng kanilang mga anak. Makokontrol ninyo kung anong impormasyon ang lalabas sa bawat label, kung saan ito nakaposisyon, at kung ano ang itsura nito.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- I-set up ang [Attendance](setup) at mag-configure ng kahit isang oras ng serbisyo na naka-enable ang check-in
- I-set up ang [Check-In](check-in) para mag-print ang mga label
- Kailangan ninyo ng administratibong access sa seksyong Attendance

</div>

## Pagbubukas ng Label Designer

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Mobile**, at i-click ang **B1 CheckIn**. Pagkatapos, i-click ang button na **Design Labels** sa card na Check-in Labels. Makikita ninyo ang listahan ng inyong mga naka-save na template ng label, nakahiwalay ayon sa uri: **Nametag** at **Pickup Slip**.

## Mga Uri ng Label

- **Nametag** — ini-print at idinidikit sa bata. Karaniwang kasama rito ang pangalan ng bata, ang kanyang classroom/session, at isang security code.
- **Pickup Slip** — ibinibigay sa magulang o guardian. Karaniwang kasama rito ang security code at listahan ng mga batang kanyang na-check in.

Sisimulan kayo ng B1 sa isang default na nametag at default na template ng pickup slip na may sukat para sa karaniwang 3.5 × 1.1 pulgadang thermal label.

## Paglikha ng Template ng Label

1. I-click ang **Add** at pumili ng panimulang punto mula sa menu: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"**, o **Blank**.
2. Magbubukas ang bagong template sa label editor.

### Label Editor

Ipinapakita ng editor ang preview ng label na naka-scale sa naka-configure na sukat. Sa kaliwang panel, maaari ninyong i-configure ang:

- **Name** — ang pangalan ng template (para sa sarili ninyong sanggunian lamang)
- **Label Type** — Nametag o Pickup Slip
- **Width / Height** — ang sukat ng label sa pulgada

### Pagdaragdag ng mga Block

Binubuo ang label ng mga block — mga hiwalay na piraso ng nilalaman na nakaposisyon sa canvas ng label. I-click ang **Add Block** para magpasok ng bagong block at piliin ang uri nito:

- **Field** — kumukuha ng datos sa oras ng pag-print:
  - `person.displayName` — ang buong pangalan ng tao
  - `sessions` — ang serbisyo/classroom na kanyang pinag-check-inan
  - `securityCode` — ang random na nabuong security code para sa pagsundo
  - `children` — listahan ng mga bata (para sa mga pickup slip)
  - `person.nametagNotes` — anumang espesyal na tala sa record ng tao
  - `person.isBirthdayWeek` — totoo kung ang kaarawan ng tao (buwan at araw) ay nasa loob ng 3 araw bago o pagkatapos ng petsa ng check-in
  - `campus` — ang pangalan ng campus
- **Text** — nakapirming teksto na tina-type ninyo (para sa mga heading, label, o tagubilin)
- **Barcode** — barcode na nagsasaad ng security code

### Pagpoposisyon ng mga Block

May mga field na **X**, **Y**, **Width**, at **Height** ang bawat block na ipinapahayag bilang porsyento ng canvas ng label (0–100). Ayusin ang mga ito para eksaktong maiposisyon ang nilalaman. Maaari rin ninyong itakda ang:

- **Font Size** — laki ng teksto sa points
- **Bold** — i-toggle ang bold na teksto
- **Align** — kaliwa, gitna, o kanang pagkakahanay ng teksto
- **Condition** — opsyonal na itago ang block kung walang laman ang isang field (halimbawa, ipakita lang ang nametagNotes kung may halaga ito). Gumagana rin ito sa `person.isBirthdayWeek` para magpakita ng birthday graphic o teksto sa mga nametag lamang ng mga batang malapit na ang kaarawan sa araw ng check-in.

### Pag-save

I-click ang **Save** para i-save ang template. Gagamitin ang na-update na template sa susunod na pag-print ng mga label sa B1 Checkin.

## Pag-aayos ng Pagkakasunod-sunod ng mga Template

Kung marami kayong template ng nametag o pickup slip, gagamitin ng B1 Checkin ang unang template sa listahan bilang default. I-drag ang mga template para baguhin ang pagkakasunod-sunod.

## Pagtanggal ng Template

I-click ang delete icon sa anumang hilera ng template at kumpirmahin. Kapag tinanggal ang huling template ng isang uri, ibabalik ang default na built-in na template.

:::tip
Mag-test print pagkatapos mag-edit ng template para matiyak na maayos ang layout bago ang susunod ninyong serbisyo.
:::

## Mga Kaugnay na Artikulo

- [Check-In Setup](setup) — i-configure ang mga serbisyo at grupo para sa check-in
- [Pagkumpleto ng Check-In](check-in) — ang proseso ng check-in para sa mga pamilya
- [Pagsisimula sa B1 Checkin](../../b1-checkin/getting-started/) — ang Checkin kiosk app
