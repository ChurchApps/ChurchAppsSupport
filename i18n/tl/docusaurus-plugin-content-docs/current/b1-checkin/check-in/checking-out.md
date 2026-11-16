---
title: "Pag-check Out at Kaligtasan ng Bata"
description: "Mag-check out ng mga bata sa manned na B1 Checkin station gamit ang security code, beripikadong sundo, paging sa magulang, reprint ng label, at emergency broadcast."
---

# Pag-check Out at Kaligtasan ng Bata {#checking-out--child-safety}

<div class="article-intro">

Ang check-out ang nagtatapos sa proseso ng check-in ng bata: iprinisenta ng magulang ang security code mula sa kanyang pickup label, bini-verify ng kiosk kung sino ang susundo, at saka naka-check out ang mga bata. May mga kasangkapan din sa kaligtasan ang mga manned station — pag-verify ng mga pinagkakatiwalaang sundo, page-a-parent na mga text, muling pag-print ng mga security label, at emergency broadcast.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Available ang check-out sa mga station na nakatakda sa **manned** mode sa admin settings ng kiosk
- Dapat ay na-[check in](./completing-checkin.md) na ang mga bata at may naka-print na pickup label na may security code
- Para sa paging at emergency broadcast, kailangang may nakakonektang texting provider ang inyong simbahan sa B1 Admin

</div>

## Pagsisimula ng Check-Out {#starting-a-check-out}

1. Sa isang manned station, i-tap ang **Check Out** sa lookup screen.
2. Ilagay ang 4-na-karakter na **security code** mula sa pickup label ng pamilya. Maaari mo itong i-type, gamitin ang on-screen keypad, o i-scan ang barcode ng label gamit ang USB o Bluetooth scanner — kusang isusumite ang code kapag naipasok na ang lahat ng 4 na karakter.
   - Walang scanner? I-tap ang **Scan** sa ibaba ng code field para gamitin ang camera ng tablet. Itapat ang QR code o barcode ng pickup label sa camera sa window na **Scan pickup code** at awtomatikong maipapasok ang code. Ang likurang camera ang default na gamit; i-tap ang flip button para magpalit ng camera, o i-tap ang **Cancel** para bumalik sa pag-type.
3. Ipinapakita ng kiosk ang mga batang naka-check in sa ilalim ng code na iyon.

### Paghahanap ng Pamilya Kung Walang Code {#finding-a-family-without-the-code}

Kung nawala ng magulang ang kanyang pickup label, hanapin na lang ang pamilya:

1. Sa **Check Out** screen, i-tap ang **Search by name** (katabi ng **Scan**).
2. I-type ang apelyido ng pamilya at i-tap ang **Search**, o i-tap ang **Use phone number** para maglagay ng numero ng telepono (hindi bababa sa huling 4 na digit) sa keypad.
3. I-tap ang tao sa mga resulta. Hahanapin ng kiosk ang lahat ng nasa household na naka-check in ngayong araw at hindi pa naka-check out, at ipapakita ang mga ito na parang nailagay na ang code.

Kung walang sinuman sa household ang naka-check in, ipapakita ng kiosk ang "No one in this household is checked in right now." I-tap ang **New search** para maghanap muli, o ang **Enter code instead** para bumalik sa code field.

Nalalapat pa rin ang pagsusuri ng sundo sa ibaba: nakalista ang mga pinagkakatiwalaang sundo at mga adult ng household, at nananatiling naba-block ang mga pangalang not-authorized.

## Pag-verify Kung Sino ang Susundo {#verifying-who-is-picking-up}

Itinatanong ng check-out screen kung sino ang susundo sa mga bata:

- Ang **mga pinagkakatiwalaang sundo** ng household ay lumalabas bilang mga card na maaaring i-tap, kasama ang kanilang larawan at relasyon — i-tap ang taong nasa harap mo.
- Lumalabas din sa isang photo grid ang **mga adult ng household**.
- Hinahayaan ka ng **Other** na mag-type ng pangalan ng taong wala sa listahan.

Kung ang pangalang tinype ay tumutugma sa isang taong minarkahang **Not Authorized** para sa household na iyon, haharangin ng kiosk ang check-out at magpapakita ng babala. Maaaring piliin ng isang staff ang **Override** para ituloy pa rin — itinatala ang override sa attendance record kasama ang pangalan ng tao.

Kapag nakumpirma na ang sumundo, i-tap ang check out. Ang pangalan ng sumundo ay iniimbak kasama ng attendance record.

:::info
Ang mga pinagkakatiwalaan at hindi awtorisadong sundo ay pinamamahalaan ng mga staff ng simbahan sa pahina ng bawat tao sa B1 Admin — tingnan ang [Check-In Safety](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Pag-page sa Magulang {#paging-a-parent}

Kailangan mo ba ng magulang habang may serbisyo — kailangang palitan ng diaper, o umiiyak ang bata? Mula sa check-out screen sa isang manned station, maaaring magpadala ang mga staff ng **page**: isang text message sa mga magulang o guardian ng bata sa pamamagitan ng texting provider ng simbahan. Hindi isinasama ang mga magulang na nag-opt out sa mga text o walang mobile number, at ipinapakita ng kiosk kung ilang mensahe ang naipadala.

## Muling Pag-print ng mga Label {#reprinting-labels}

Kung nawala o nasira ang isang nametag o pickup label, maaaring **i-reprint** ng mga staff sa isang manned station ang mga label ng pamilya mula sa check-out screen matapos ilagay ang security code. Ginagamit ng reprint ang parehong printer at mga label template tulad ng orihinal na check-in.

## Emergency Broadcast {#emergency-broadcast}

Sa oras ng emergency, maaaring mag-text ang mga staff sa mga guardian ng **bawat batang naka-check in** para sa kasalukuyang serbisyo nang sabay-sabay:

1. Buksan ang **admin settings** ng kiosk (7 mabilis na tap sa logo sa header, kasama ang PIN kung may nakatakda).
2. I-tap ang **Emergency broadcast**.
3. Ilagay ang mensahe, pagkatapos ay i-type ang **EMERGENCY** sa confirmation field — mananatiling disabled ang **Send broadcast** na button hangga't hindi mo ito nagagawa.
4. Iuulat ng kiosk kung ilang telepono ang nakatanggap ng mensahe at kung ilang tao ang hindi isinama (nag-opt out o walang mobile number).

:::warning
Napupunta ang broadcast sa bawat household na naka-check in para sa napiling serbisyo. Gamitin ito para lamang sa tunay na mga emergency — paglikas, lockdown, matinding panahon.
:::

## Mga Kaugnay na Artikulo {#related-articles}

- [Pagkumpleto ng Check-In](./completing-checkin.md) — kung saan nanggagaling ang mga security code at pickup label
- [Check-In Safety](../../b1-admin/attendance/checkin-safety.md) — pag-configure ng mga kapasidad, ratio, mga sundo, at ng kinakailangang texting provider
- [Pag-setup ng Printer](../getting-started/printer-setup.md) — configuration ng label printer
