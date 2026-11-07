---
title: "Tinsita Letichumene"
description: "Xhuma i-B1 Admin ku-Mailchimp, Donorbox, Subsplash, VOMO, Clearstream nemanye emathuluzi ngetindlela ze-Zapier noma Make, netinhlelo tekusetfula."
---

# Tinsita Letichumene

<div class="article-intro">

Indlela lesheshako yekuchumanisa B1 kulelinye lithulusi letekhono lelibandla ngalokujwayelekile yiseluleko se-Zapier nobe se-Make — awudzingi luchungechunge lolusha lwe-B1, futsi luhlangotsi lwesitsatfu lugcina luchungechunge. Leli khasi liluhlu lolukhethiwe lwetinsita lesicinisekise kutsi tingachunyaniswa lamuhla, kanye nemhlahlandlela lomfushane wekulungiselela longakhawulwa nekunanyathiselwa ngasinye.

</div>

## Ngekushesha

| Insita | Sigaba | Libhulotsi | Loko lokungachumaniswa |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Imeyili | Zapier nobe Make | Fanisa bantfu labasha be-B1 / baniki kuluchungechunge lwelalelisi le-Mailchimp |
| [Donorbox](./donorbox.md) | Imnikelo | Zapier | Fak' emnikelo ne-baniki be-Donorbox babuyele ku-B1 |
| [Subsplash](./subsplash.md) | I-App / Imnikelo | Zapier | Fak' kunikelwa nebantfu be-Subsplash babuyele ku-B1 |
| [VOMO](./vomo.md) | Kutivolontiya | Zapier | Fanisa kubhalisa kwebavolontiya emkatsi wemacembu e-B1 nemaphrojekthi e-VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Calisa umlayeto we-Clearstream kusuka kumcimbi we-B1; famukela tiphendvulo njengemarekhodi e-B1 |
| [Text In Church](./text-in-church.md) | SMS / Tinchubo | Zapier | Calisa tinchubo te-Text In Church kusuka ku-B1; famukela imininingwane ye-Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier nobe Make | Tfumela SMS kusuka kunoma yimuphi umcimbi we-B1 |
| [Checkr](./checkr.md) | Kuhlolwa kwemuva | Make | Cala kuhlolwa kwemuva nakukhona lojoyina licembu lekukhonta |

## Loko Lokufananako Kuto Tonkhe

1. **Luhlangotsi lwe-B1 lwekuchumanisa lufana konkhe** — yakha sikhiya se-API lesinemvumo lelungile ku **B1Admin → Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API**, bese uvumela libhulotsi kutsi libhalise i-webhook yesicalisi (i-Zapier / Make yenta loku ngekutentekela, kudzinga i-`settings:write`) nobe ubite tindzawo te-REST te-B1 kusuka kusento lesilandzelako.
2. **Libhulotsi likukhipha imali, hhayi tsina.** ChurchApps imahhala; Zapier ne-Make bobabili banelizinga lemahhala lelimbomboto yeseluleko lombalwa.
3. **Ungahlola kuchumana ngaphandle kwekuya live.** Emabhulotsi lamabili anale nkinobho "Test step" lecalisa sicalisi kanye ngasku-B1 futsi ikukhombise sakhiwo semininingwane ngaphambi kwekutsi uvule leseluleko.

## Kukhetsa Libhulotsi

- **I-Zapier** inebungani futsi ineluhlu lolukhulu lwema-app — sisebentise njengesigcini sakho ngaphandle kwekutsi imali iyinkinga.
- **I-Make** ishibhile nakukhula, futsi inelohlelo lwekucondzisa/kuhlunga lolutfobekile — sisebentise nangabe luchungechunge lunye lunemikhawulo lengetiwe, imibandzela, nobe tinyatselo letinyenti.
- **Webhooks by Zapier** (lesetjentiswa kuphepha le-Mobile Message) sikhoni lesijwayelekile lesikuvumela kutsi ufake i-POST kunoma yimuphi indzawo ye-HTTP kusuka ku-Zap nakute i-app ye-Zapier yesigaba sekucala kuleyo ndzawo.

Nangabe kukhona lokungekho kulolu luhlu, [i-REST API](/docs/developer/api) neta-[webhooks](/docs/developer/api/webhooks) te-B1 tivulekile — ungakwakha libhulotsi lelilodwa nge-[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) ngemahora lambalwa.

## Loko Lokungekho Lapha (Nekutsi Kungani)

Emathulusi lamanyenti latfandvwako etekhono lelibandla — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — akakabinawo i-app ye-Zapier nobe i-module ye-Make leshicilelwe lamuhla. Anemaphephandaba awo kodvwa kuwachumanisa ku-B1 kumsebenti welikhodi lelenteliwe ngekwesibopho, hhayi iseluleko, ngako-ke awafaneli lolu luhlu. Nangabe umtsengisi angetsa i-app ye-Zapier nobe i-module ye-Make, sitawengeta liphepha.

Siphindze sagwema ngekwenta sicinisekile emathulusi laphakathi kwe-Planning Center Services (umculo, kuboniswa), imikhicito lephikisanako ye-ChMS, tinjiniyela tekutfutfukisa, nemathulusi lacoca kuphela imininingwane lehambisana ne-PCO — akekho kuwo lonendlela lelusito yekuchumana ne-B1.

## Buka Nalokunye

- [Zapier (kubuka konkhe)](../zapier.md) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier lufana konkhe; leliphepha lifaka konkhe kanye
- [Make (kubuka konkhe)](../make.md) — kufanako yetintfo te-Make
- [Slack & Discord](../slack-discord.md) — tatiso letinyenti letingasedzingi libhulotsi
- [Google Sheets](../google-sheets.md) — kutfunyelwa nakudzingeka
- [Webhooks (inkomba yentfutfuki)](/docs/developer/api/webhooks) — luhlu lwemcimbi lesetjentiswa iseluleko ngasinye
