---
title: "Pag-checkout at Kaligtasan ng Bata"
---

# Pag-checkout at Kaligtasan ng Bata

<div class="article-intro">

Ang check-out ay nagsasara ng loop ng child check-in: nagpapakita ang isang magulang ng security code mula sa kanilang pickup label, bine-verify ng kiosk kung sino ang kumukuha, at nache-check out ang mga bata. May mga safety tool din ang mga manned station -- pag-verify ng pinagkakatiwalaang tagakuha, mga text ng page-a-parent, muling pag-print ng security label, at isang emergency broadcast.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Available ang check-out sa mga station na naka-set sa **manned** mode sa admin settings ng kiosk
- Dapat naka-[check in](./completing-checkin) na ang mga bata na may naka-print na pickup label na may dalang security code
- Ang paging at emergency broadcast ay nangangailangang may nakakonektang texting provider ang iyong simbahan sa B1 Admin

</div>

## Pagsisimula ng Check-Out

1. Sa isang manned station, i-tap ang **Check Out** sa lookup screen.
2. Ilagay ang 4-character na **security code** mula sa pickup label ng pamilya. Maaari mo itong i-type, gamitin ang on-screen keypad, o i-scan ang barcode ng label gamit ang isang USB o Bluetooth scanner -- awtomatikong sinusumite ang code kapag nailagay na ang lahat ng 4 na character.
3. Ipinapakita ng kiosk ang mga batang naka-check in sa ilalim ng code na iyon.

## Pag-verify Kung Sino ang Kumukuha

Tinatanong ng check-out screen kung sino ang kukuha sa mga bata:

- Ang mga **pinagkakatiwalaang tagakuha** para sa sambahayan ay lumalabas bilang mga matatapik na card na may kasamang litrato at relasyon nila -- i-tap ang taong nakatayo sa harap mo.
- Lumalabas din ang mga **household adult** sa isang photo grid.
- Pinapayagan ka ng **Other** na mag-type ng pangalan para sa taong wala sa listahan.

Kung ang isang na-type na pangalan ay tumugma sa taong minarkahang **Not Authorized** para sa sambahayang iyon, hinaharangan ng kiosk ang check-out na may babala. Maaaring piliin ng isang staff member ang **Override** para magpatuloy pa rin -- itinatala ang override sa attendance record kasama ang pangalan ng tao.

Kapag nakumpirma na ang tagakuha, i-tap ang check out. Naka-imbak ang pangalan ng tagakuha kasama ang attendance record.

:::info
Pinamamahalaan ng church staff ang mga pinagkakatiwalaan at hindi awtorisadong tagakuha sa pahina ng bawat tao sa B1 Admin -- tingnan ang [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Pag-page sa Isang Magulang

Kailangan ang isang magulang habang may serbisyo -- pagpapalit ng diaper, umiiyak na bata? Mula sa check-out screen ng isang manned station, maaaring magpadala ang staff ng **page**: isang text message sa mga magulang o tagapag-alaga ng bata sa pamamagitan ng texting provider ng simbahan. Nalalaktawan ang mga magulang na nag-opt-out sa mga text o walang mobile number, at ipinapakita ng kiosk kung ilang mensahe ang naipadala.

## Muling Pag-print ng mga Label

Kung nawala o nasira ang isang nametag o pickup label, maaaring **i-reprint** ng staff sa isang manned station ang mga label ng pamilya mula sa check-out screen pagkatapos ilagay ang security code. Ginagamit ng reprint ang parehong printer at label templates ng orihinal na check-in.

## Emergency Broadcast

Sa isang emergency, maaaring mag-text ang staff sa mga tagapag-alaga ng **bawat naka-check-in na bata** para sa kasalukuyang serbisyo nang sabay-sabay:

1. Buksan ang **admin settings** ng kiosk (7 mabilis na tap sa logo ng header, kasama ang PIN kung mayroon).
2. I-tap ang **Emergency broadcast**.
3. Ilagay ang mensahe, pagkatapos ay i-type ang **EMERGENCY** sa confirmation field -- nananatiling naka-disable ang button na **Send broadcast** hanggang magawa mo ito.
4. Iuulat ng kiosk kung ilang telepono ang nakatanggap ng mensahe at ilang tao ang nalaktawan (nag-opt-out o walang mobile number).

:::warning
Napupunta ang broadcast sa bawat naka-check-in na sambahayan para sa napiling serbisyo. Gamitin ito para sa tunay na emergency -- evacuation, lockdown, matinding panahon.
:::

## Kaugnay na mga Artikulo

- [Completing Check-In](./completing-checkin) — kung saan nanggagaling ang mga security code at pickup label
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) — pag-configure ng mga kapasidad, ratio, tagakuha, at kinakailangan ng texting provider
- [Printer Setup](../getting-started/printer-setup) — configuration ng label printer
