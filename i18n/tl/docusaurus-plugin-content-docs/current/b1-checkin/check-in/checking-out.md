---
title: "Pag-checkout at Kaligtasan ng Bata"
---

# Pag-checkout at Kaligtasan ng Bata

<div class="article-intro">

Ang pag-checkout ay nagsasarado ng loop sa check-in ng bata: ang magulang ay nagpapakita ng security code mula sa kanilang pickup label, ang kiosk ay nagve-verify kung sino ang pumipick, at ang mga bata ay nise-checkout. Ang mga manned station ay makakakuha rin ng safety tools — trusted-pickup verification, page-a-parent texts, security-label reprints, at emergency broadcast.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Ang pag-checkout ay available sa mga station na naka-set sa **manned** mode sa kiosk admin settings
- Ang mga bata ay dapat na naka-[check in](./completing-checkin) na may printed pickup label na may security code
- Ang paging at emergency broadcasts ay nangangailangan ng iyong church na may texting provider na naka-connect sa B1 Admin

</div>

## Pagsisimula ng Pag-Checkout

1. Sa manned station, i-tap ang **Check Out** sa lookup screen.
2. Ipasok ang 4-character **security code** mula sa pickup label ng pamilya. Maaari mong i-type ito, gamitin ang on-screen keypad, o i-scan ang barcode ng label gamit ang USB o Bluetooth scanner — ang code ay awtomatikong maihahatid kapag lahat ng 4 na character ay na-enter na.
3. Ang kiosk ay nagpapakita ng mga batang naka-check in sa ilalim ng code na iyon.

## Pagve-verify kung Sino ang Pumipick

Ang check-out screen ay nagtanong kung sino ang bumibigay ng checkout sa mga bata:

- Ang **Trusted pickup people** para sa household ay lumilitaw bilang tappable cards na may kanilang photo at relationship — i-tap ang taong nakatayo sa harap mo.
- Ang **Household adults** ay lumalitaw din sa photo grid.
- Ang **Other** ay nagbibigay-daan sa iyo na mag-type ng pangalan para sa taong hindi sa list.

Kung ang nai-type na pangalan ay tumutugma sa taong minarka bilang **Not Authorized** para sa household na iyon, ang kiosk ay hinihigpitan ang pag-checkout gamit ang warning. Ang staff member ay maaaring pumili ng **Override** upang magpatuloy pa rin — ang override ay nire-record sa attendance record gamit ang pangalan ng tao.

Kapag na-confirm ang picker, i-tap ang check out. Ang pangalan ng pickup person ay ina-store kasama ang attendance record.

:::info
Ang Trusted at not-authorized pickup people ay pinamamahalaan ng church staff sa bawat person's page sa B1 Admin — tingnan ang [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Paging ng Magulang

Kailangan ng magulang sa panahon ng serbisyo — isang pagbabago ng diaper, isang umiiyak na bata? Mula sa check-out screen sa manned station, ang staff ay maaaring magpadala ng **page**: isang text message sa mga magulang o guardians ng bata sa pamamagitan ng texting provider ng church. Ang mga magulang na nag-opt out ng texts o walang mobile number ay nalalampasan, at ang kiosk ay nagpapakita kung gaano karaming mga mensahe ang naipadala.

## Muling Pag-print ng mga Label

Kung ang nametag o pickup label ay nawala o sira, ang staff sa manned station ay maaaring **reprint** ng family labels mula sa check-out screen pagkatapos ipasok ang security code. Ang reprint ay gumagamit ng parehong printer at label templates tulad ng original check-in.

## Emergency Broadcast

Sa isang emergency, ang staff ay maaaring mag-text sa mga guardians ng **bawat naka-check in na bata** para sa kasalukuyang serbisyo nang sabay-sabay:

1. Buksan ang kiosk **admin settings** (7 rapid taps sa header logo, plus ang PIN kung may naka-set).
2. I-tap ang **Emergency broadcast**.
3. Ipasok ang mensahe, pagkatapos i-type ang **EMERGENCY** sa confirmation field — ang **Send broadcast** button ay nanatiling disabled hanggang sa gawin mo ito.
4. Ang kiosk ay nag-report kung gaano karaming mga phone ang nakatanggap ng mensahe at gaano karaming tao ang naka-skip (opted out o walang mobile number).

:::warning
Ang broadcast ay napupunta sa bawat naka-check in na household para sa napiling serbisyo. Gamitin ito para sa tunay na emergencies — evacuations, lockdowns, malaking panahon.
:::

## Mga Kaugnay na Artikulo

- [Completing Check-In](./completing-checkin) — kung saan nagmula ang security codes at pickup labels
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) — pag-configure ng capacities, ratios, pickup people, at texting provider requirement
- [Printer Setup](../getting-started/printer-setup) — label printer configuration
