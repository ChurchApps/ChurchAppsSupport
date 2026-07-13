---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Nangabe usebentisa i-Subsplash yeluchungechunge lwelibandla lakho, kunikela, nobe emafomu kodvwa ufuna B1 kutsi kube luchungechunge lwemarekhodi yebantfu nemnikelo, i-app ye-Zapier ye-Subsplash ingatfumela imnikelo, emaphrofayela lamasha, netiphendvulo tefomu ku-B1 ngesikhatsi lesingempela. Cabanga kutsi i-app ye-Zapier ye-Subsplash njengamanje **isicalisi kuphela** — kuchumanisa kunhlangotsi munye (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-Subsplash lenehlelo lelifaka kutfola i-**API + Zapier** (hlola ne-Subsplash Client Success Manager wakho — loku kuvalelwe emazingeni ehlelo)
- I-akhawunti ye-[Zapier](https://zapier.com)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

Tonkhe tisicalisi lapha ngete-Subsplash. Tento ngete-B1.

| Sicalisi se-Subsplash | Sento se-B1 |
|---|---|
| Umnikelo Lomusha | Tfola Umuntfu → Engeta Umnikelo (Kwakha Umuntfu nangabe akekho) |
| Sitembiso Lesisha | Engeta Umnikelo (nge `notes` = "Pledge: …") |
| Umuntfu Lomusha Lomkhiwe | Kwakha Umuntfu |
| Umuntfu Ubuyeketa Iphrofayela | (akukho sento lesicondzene se-B1 — bhala ku-Google Sheet yekuhlolwa ngesandla) |
| Impendvulo Lensha Yefomu | Kwakha Umuntfu + (lokungakhetsakala) Engeta Lilunga Lelicembu kususela kufomu |

Subsplash → B1 luhlangotsi lolukuphela lolusekelwa i-app ye-Subsplash njengamanje.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

Ku-B1Admin: **Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**. Timvumo:

- `people:read` — kutfola umniki nge-imeyili
- `people:write` — kumkha nangabe akekho
- `donations:write` — kubhala sipho phasi
- (Akudzingeki `settings:write` — i-Subsplash, hhayi B1, ingumniniyo wesicalisi lapha.)

### 2. Chumanisa i-Subsplash ne-Zapier

Landzela [umhlahlandlela wekuchumanisa we-Zapier we-Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Bakhipha i-tokheni ye-API kusuka ngekhatsi kwe-Subsplash Dashboard lesetjentiswa i-Zapier yekucinisekisa luhlangotsi lwesicalisi.

### 3. Yakha i-Zap "bhala umnikelo phasi"

1. **Sicalisi** — Subsplash: Umnikelo Lomusha
2. **Sento** — B1.church: Tfola Umuntfu (nge-imeyili)
3. **Sihlungi / Indlela** — yehlukanisa ku "umuntfu utfolakele":
   - **Utfolakele:** B1.church: Engeta Umnikelo. Fanisa inani, lusuku, simali, indlela = "Online", emaphuzu = i-id yesentwana se-Subsplash.
   - **Akatfolakalanga:** B1.church: Kwakha Umuntfu → B1.church: Engeta Umnikelo (usebentisa i-id yemuntfu lomusha lomkhiwe).

Vula i-Zap. Imnikelo yeSubsplash lengetako ingena ku **B1Admin → Imnikelo** ngemasekondzi lambalwa.

## Tinseluleko Letijwayelekile

### Tfumela umbongo nakufika sipho sekucala

- **Sicalisi** — Subsplash: Umnikelo Lomusha
- **Sento** — Sihlungi nge-Zapier: cinisela kuchubeka kuphela nangabe sisipho sekucala semniki (sebentisa i-*Lookup Table* etikwe-Imeyili Yemniki nge-Google Sheet yebaniki bangaphambili, nobe sinyatselo se-*Paths* se-Zapier etikwelusuku lwekukhiwa kwemniki)
- **Sento** — Mailchimp / SMTP / SendGrid: tfumela umlayeto wekubonga wesipho sekucala
- **Sento** — B1.church: Engeta Umnikelo (njengalokujwayelekile)

### Hlunga tibonelelo emkhatsini wekunikela lokujwayelekile

- **Sicalisi** — Subsplash: Sitembiso Lesisha
- **Sento** — B1.church: Engeta Umnikelo nge `notes = "Pledge — Subsplash"` nesimali lebitwa `Pledges` (lehlukene nesimali yakho lesebentako) kuze ubike ngetibonelelo ngekwehlukene ku **B1Admin → Imnikelo → Imibiko**.

### Fanisa basebentisi labasha be-app njengebantfu be-B1

- **Sicalisi** — Subsplash: Umuntfu Lomusha Lomkhiwe
- **Sento** — B1.church: Kwakha Umuntfu, ufaka ligama, i-imeyili, inombolo yelucingo. Faka luphawu ku-B1 ngekwengeta umuntfu lomusha kulicembu lelinjenge "Subsplash App Users".

## Imikhawulo & Ematiko

- **App ye-Zapier ye-Subsplash isicalisi kuphela.** Nangabe ufuna kushintjwa kuluhlangotsi lwe-B1 (sib. umuntfu lomusha we-B1 kutsi angene naku-Subsplash), utawudzinga kwakha lelo bhulotsi kusuka kutisicalisi te-app ye-Zapier ye-B1 letibita i-REST API ye-Subsplash nge sento lelenteliwe ngekwesibopho se-*Webhooks by Zapier — POST*. Loko kuchumanisa lokwenteliwe ngesibopho, hhayi iseluleko.
- **Kufika ku-API kuvalelwe ngehlelo.** Nangabe kuchumana ne-Zapier kwehluleka nge-`403 Forbidden`, hlelo lakho le-Subsplash kungenteka alifaki kufika ku-API — tsindzana ne-Client Success Manager wakho.
- **Kufaniswa kwesimali kwentiwa ngesandla.** I-Subsplash idlulisa ligama lemkhankaso nobe sigaba; B1 idzinga i-id yesimali yenombolo. Faka simali ngekhodi ku-Zap noma gcina i-*Lookup Table* ye-Zapier lefanisa imikhankaso ye-Subsplash netimali te-B1.

## Kulungisa Tinkinga

- **Akukho sicalisi lesichubekako ngemuva kwemnikelo** — cinisekisa ku-bhodi le-Zapier le-Subsplash kutsi luchumo lusabonisa *Connected*. Nangabe i-tokheni ye-API ishintjwe luhlangotsini lwe-Subsplash, i-Zap iyamiswa ngekuthula; chumanisa kabusha.
- **B1 *Engeta Umnikelo* yehluleka nge 422** — kanyenti kusuka ku `fundId` lengekho nobe lengaziwa. Buka timali takho nge **B1Admin → Imnikelo → Timali** bese ukopela i-id lecinile ngekhatsi kwesinyatselo se-Zap.
- **Sipho sekucala sichubeka kabili** — I-Subsplash ngesinye sikhatsi iphindza kulethwa kwesicalisi nangabe i-Zapier ayikange ibone kutsi kwemukelwe. Engeta *Filter by Zapier* etikwe-id yemnikelo (i-Subsplash itfumela leyo ku pheyiloti) kususa lokuphindziwe.

## Buka Nalokunye

- [Donorbox](./donorbox) — sakhiwo lesifananako seseluleko, inkundla yemnikelo lehlukile
- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Umhlahlandlela wekuchumanisa we-Zapier we-Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (emaphepha e-Subsplash)
