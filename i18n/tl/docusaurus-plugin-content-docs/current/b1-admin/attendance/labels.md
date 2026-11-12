---
title: "Check-In Label Designer"
description: "I-customize ang mga template ng nametag at pickup slip na iniimprenta sa check-in sa B1 Admin, kabilang ang mga field, posisyon, at kondisyon ng kaarawan o notes."
---

# Check-In Label Designer

<div class="article-intro">

Hinahayaan ka ng Label Designer na gumawa at mag-customize ng mga template ng name tag at pickup slip na iniimprenta kapag nag-check in ang mga pamilya ng kanilang mga anak. Makokontrol mo kung eksaktong anong impormasyon ang lilitaw sa bawat label, saan ito nakaposisyon, at kung ano ang itsura nito.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-set up ang [Attendance](./setup.md) at i-configure ang kahit isang oras ng serbisyo na may naka-enable na check-in
- I-set up ang [Check-In](./check-in.md) para umiimprenta ang mga label
- Kailangan mo ang **Edit Attendance** na permission

</div>

## Pagbubukas ng Label Designer {#opening-the-label-designer}

Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Mobile**, at i-click ang **Labels**. Maaari mo ring i-click ang **B1 CheckIn** at pagkatapos ang **Design Labels** sa **Check-in Labels** card.

Nakalista sa **Check-in Labels** page ang iyong mga naka-save na template kasama ang kanilang **Name**, **Type** (**Nametag** o **Pickup Slip**), at **Size**. Kung wala ka pang nagawa, sinasabi nitong **No label templates**, at ang B1 Checkin ay magpi-print ng sarili nitong built-in na nametag at pickup slip.

## Mga Uri ng Label {#label-types}

- **Nametag** — iniimprenta at idinidikit sa bata. Karaniwang kasama ang pangalan ng bata, ang kanyang klase/session, at security code.
- **Pickup Slip** — ibinibigay sa magulang o tagapag-alaga. Karaniwang kasama ang security code at listahan ng mga batang kanyang ni-check in.

Parehong nakalaan ang dalawang panimulang template para sa karaniwang 3.5 × 1.1 inch na thermal label (Brother DK-1201).

## Paggawa ng Label Template {#creating-a-label-template}

1. I-click ang **Add label** at pumili ng panimulang punto: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"**, o **Blank**.
2. Bubukas ang template sa label editor, kasama ang preview ng label na puno ng sample data.

### Label Editor {#label-editor}

Sa itaas ng editor, maaari mong itakda ang:

- **Name** — ang pangalan ng template (para sa iyong sanggunian lamang; kinakailangan)
- **Type** — Nametag o Pickup Slip
- **Width (in)** / **Height (in)** — laki ng label sa pulgada

### Pagdagdag ng Blocks {#adding-blocks}

Binubuo ang label ng mga block — mga indibidwal na piraso ng nilalaman na inilalagay sa label. I-click ang isang button sa **Add Block** panel para magdagdag ng isa:

- **Fields** — kumukuha ng value sa oras ng pag-print. Ang nametag ay may **Display Name**, **First Name**, **Last Name**, **Nickname**, **Nametag Notes** (ang notes sa record ng tao), **Birthday This Week** (true kapag ang kaarawan ng tao ay nasa loob ng 3 araw bago o pagkatapos ng petsa ng check-in), **Sessions** (ang mga oras ng serbisyo at kuwartong pinagcheck-in-an niya), **Security Code**, **Date**, at **Church Name**. Ang pickup slip ay may **Children**, **Children & Allergies**, **Security Code**, **Date**, at **Church Name**.
- **Text** — static na teksto na tina-type mo (para sa mga heading, label, o tagubilin)
- **Barcode** — Code 128 o Code 39 barcode ng isang field, gaya ng security code
- **QR Code** — QR code ng isang field
- **Box** — parihaba na may opsyonal na fill color at border

### Pagpoposisyon at Pag-istilo ng Blocks {#positioning-and-styling-blocks}

I-drag ang isang block sa label para ilipat ito, o i-click ito at gamitin ang **Properties** panel. Ang **X**, **Y**, **W**, at **H** ay porsyento ng label (0–100). Depende sa block, maaari mo ring itakda ang:

- **Font Size** — laki ng teksto, kaugnay sa taas ng label
- **Bold** at **Italic**
- **Align** — Left, Center, o Right
- **Symbology** at **Value** — para sa mga barcode at QR code
- **Fill** at **Border** — para sa mga box
- **Condition** — ang **Always** ay palaging ipinapakita ang block. Pumili ng field para ipakita lamang ang block kapag ang field na iyon ay **Is not blank**, **Is blank**, **Equals**, o **Does not equal** ng isang value. Halimbawa, ipakita lamang ang nametag notes kapag may laman ang mga ito, o ipakita lamang ang birthday graphic kapag ang **Birthday This Week** ay katumbas ng `true`.

I-click ang **Remove Block** para burahin ang napiling block.

### Pag-save {#saving}

I-click ang **Save** para i-save ang template, o **Cancel** para itapon ang mga pagbabago. Gagamitin ng B1 Checkin ang na-update na template sa susunod nitong pag-load ng mga setting.

## Pagpili ng Default na Template {#choosing-the-default-template}

Kung higit sa isang template ang mayroon ka para sa isang uri, i-click ang **Set Default** sa template na dapat iprint ng B1 Checkin. Magpapakita ito ng **Default** badge, at ang anumang iba pang template ng parehong uri ay hihinto sa pagiging default. Kung walang template ng isang uri ang namarkahang default, gagamitin ng kiosk ang una.

## Pagbura ng Template {#deleting-a-template}

I-click ang **Delete** sa row ng template at kumpirmahin. Kapag binura mo ang lahat ng template ng isang uri, babalik ang B1 Checkin sa built-in na label nito para sa uring iyon.

:::tip
Mag-test print pagkatapos mag-edit ng template para makumpirmang tama ang layout bago ang susunod mong serbisyo.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Attendance Setup](./setup.md) — i-configure ang mga serbisyo at grupo para sa check-in
- [Check-In](./check-in.md) — i-set up ang B1 Checkin kiosk
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/index.md) — ang Checkin kiosk app
