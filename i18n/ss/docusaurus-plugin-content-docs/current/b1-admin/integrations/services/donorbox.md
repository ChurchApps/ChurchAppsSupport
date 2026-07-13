---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Nangabe libandla lakho lemukela imnikelo ngeDonorbox kodvwa ulandzelela bantfu netincwadzi temaphepha ku-B1, ungenta tento letisheshako te-Zapier te-Donorbox kutsi takhe emarekhodi emnikelo lafananako ngekhatsi ku-B1 — futsi takhe umniki njengemuntfu we-B1 nangabe akakho kadze. Akukho kuhlanganisa lokwentiwa ngesandla, akukho kutfunyelwa kwaphedlu.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Donorbox](https://donorbox.org) lenemshini bewukungenani munye
- I-akhawunti ye-[Zapier](https://zapier.com)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

| Luhlangotsi | Sicalisi se-Donorbox | Sento se-B1 |
|---|---|---|
| Donorbox → B1 | Umnikelo Lomusha nobe Lobuyeketiwe (lokusheshako) | Tfola Umuntfu → Engeta Umnikelo |
| Donorbox → B1 | Umniki Lomusha nobe Lobuyeketiwe | Kwakha Umuntfu |
| Donorbox → B1 | Luhlelo Lolusha nobe Lolubuyeketiwe (loluphindzaphindzako) | Tfola Umuntfu → Engeta Umnikelo (sebentisa i-id yeluhlelo njengeliphuzu) |

Donorbox ishicilela tisicalisi tayo njenge **letisheshako** — tichubeka emasekondzi lambalwa ngemuva kwemnikelo wangempela. Akukho kulibalela.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

Ku-B1Admin: **Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**. Timvumo:

- `people:read` — kutfola umniki nge-imeyili
- `people:write` — kumkha nangabe musha
- `donations:write` — kubhala sipho phasi

Tisicalisi kuloluhlangotsi ngete-Donorbox, hhayi te-B1, ngako-ke awudzingi `settings:write` lapha.

### 2. Yakha i-Zap "bhala umnikelo phasi"

1. **Sicalisi** — Donorbox: Umnikelo Lomusha. Chumana ngesikhiya se-API se-Donorbox (ku-Donorbox: *Account → Profile → API Settings*).
2. **Sento** — B1.church: Tfola Umuntfu. Fanisa i-imeyili yemniki kusuka kusicalisi kunkambu ye-*Email* yekusesha.
3. **Sento** — Sihlungi nge-Zapier (lokungakhetsakala): cinisela kuchubeka kuphela nangabe umniki angatfolakalanga, bese…
4. **Sento** — B1.church: Kwakha Umuntfu. Fanisa ligama lekucala/lelisekugcina/i-imeyili kuze umniki angene njengelilunga, hhayi rekhodi lesipho kuphela.
5. **Sento** — B1.church: Engeta Umnikelo. Fanisa:
   - Inani → `data.amount`
   - Lusuku Lwemnikelo → lusuku lwemnikelo lwesicalisi
   - Simali → khetsa simali se-B1 lesifanisa umkhankaso we-Donorbox (i-Zapier ikuvumela kutsi ushintje timali kususela kusihlungi nobe sinyatselo se-formatter)
   - Indlela → "Online"
   - Emaphuzu → i-id yesentwana se-Donorbox (kusita nakuhlanganiswa)

Vula i-Zap. Umnikelo lolandzelako wangempela nge-Donorbox ungena ku **B1Admin → Imnikelo** ngekutentekela.

## Tinseluleko Letijwayelekile

### I-Zap yinye ngesimali ngasinye

Nangabe usebentisa imikhankaso lemikhulu ye-Donorbox lefanisa netimali letehlukene te-B1, sakhiwo lesicocekile kutsi ube ne-Zap yinye ngemkhankaso ngasinye nesihlungi se-*campaign* se-Donorbox etikwako — ngaleyo ndlela, kufaniswa kwesimali kuba likhodi lelicinile futsi uyeke sinyatselo sekusesha.

### Phatsa imnikelo lebuyeketiwe njengekulungiswa

I-*Umnikelo Lomusha nobe Lobuyeketiwe* we-Donorbox iyachubeka nasekulungisweni futsi. Sebentisa sinyatselo se-*Path* se-Zapier ku `event_type` kuze wehlukanise: "new" → Engeta Umnikelo, "updated" → Tfola Umnikelo + Buyeketa (liphuzu: i-app ye-Zapier ye-B1 ayikanaso sento se-Update Donation njengamanje — okwamanje, bhala imicimbi "yebuyeketiwe" ku-Slack yekuhlolwa ngesandla).

### Fanisa kushintjwa kwehlelo loluphindzaphindzako ku-Slack

- **Sicalisi** — Donorbox: Luhlelo Lolusha nobe Lolubuyeketiwe
- **Sento** — Slack: Tfumela Umlayeto ku `#donations` (sib. "Luhlelo lushintjile — sipho sanyanga sanaSarah manje sisi-$200")

## Imikhawulo & Ematiko

- **Fanisa baniki nge-imeyili.** I-Donorbox ayabelani i-id yemuntfu ye-B1; sihluthulelo sekufanisa lesihlala njalo yi-imeyili kuphela. Baniki labanikela ngaphansi kwe-imeyili lehlukile bayakwakha umuntfu lomusha we-B1 — kuhlaganiswa kwakho kwanyanga onkhe kufanele kufune labo.
- **Kubuyiselwa akuboniswa ngekwehlukene** — i-Donorbox ikhupha kubuyeketa sisimo ngephatha kwalowo mnikelo. I-app ye-Zapier ye-B1 njengamanje ayikanaso sento se-*Update Donation*; indlela lephephile lamuhla kubhala imicimbi yekubuyiselwa ngephandle bese ulungisa umnikelo ngesandla.
- **Hlola ku-sandbox ye-Donorbox kucala** kuze ugweme kwakha imnikelo lengasiyo ku-B1 lesebentisako. I-Donorbox iniketa tinkomba tekuhlola letehlukile kuletisebentako.

## Kulungisa Tinkinga

- **Sicwayiso se-"Umuntfu akatfolakali" nyakoyaka** — loko kulungile nangabe uhlele tinyatselo kuze i-*Kwakha Umuntfu* ichubeke nakungatfolakala. Nangabe nesinyatselo se-Create Person asikaze sichubeke, cinisekisa kabusha kutsi sikhiya se-API sinayo i-`people:write`.
- **Inani lemnikelo libukeka likhulu nome lincane kakhulu ngesikhatsi lesili-100×** — I-Donorbox itfumela ema-cents kwezinye tinhlobo tepheyiloti bese itfumela emadola kwakunye. Sebentisa sinyatselo se-*Formatter by Zapier — Numbers* kwehlukanisa nge-100 nangabe kudzingekile.
- **Imnikelo lephindziwe kusuka kusipho sinye** — I-Donorbox ikhipha kokubili *New Donation* ne-*Updated Donation*. Hlungwa nge `event_type = "donation.succeeded"` nobe wakhe ema-Zap lamabili langahlangananga kusihlungi.

## Buka Nalokunye

- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Subsplash](./subsplash) — lenye inkundla yemnikelo lenele-app ye-Zapier
- [Mailchimp](./mailchimp) — hlanganisa "sipho lesisha" kuphawu le-imeyili
