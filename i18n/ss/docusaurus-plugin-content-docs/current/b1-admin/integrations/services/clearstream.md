---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Calisa umlayeto we-[Clearstream](https://clearstream.io) kusukela kunoma yimuphi umcimbi we-B1 — umuntfu lomusha, sipho lesisha, kutfunyelwa kwefomu, kubuyeketa kwekhalenda — bese ubuyisela tiphendvulo njengemarekhodi e-B1. I-app ye-Zapier ye-Clearstream ivula tonkhe tinhlangothi letimbili, ngako-ke kuchumana kwako konkhe kusiseluleko lesihleliwe, hhayi likhodi lelenteliwe ngekwesibopho.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Clearstream](https://clearstream.io) lenebulukhulu bekungenani kanye kanye netincwadzi teSMS letivumelekile
- I-akhawunti ye-[Zapier](https://zapier.com)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

| Luhlangotsi | Sicalisi | Sento |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Kwakha/Kubuyeketa Umbhaleli + Kutfumela Umlayeto Enombolweni |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Kutfumela Umlayeto Kulushu (sib. kwati licembu letimali) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Kutfumela Umlayeto Kulushu lolucondzisako (sib. licembu lemthandazo) |
| Clearstream → B1 | Umlayeto Lomusha Longenako | B1: Kwakha Umuntfu; faka luphawu ngeligama lelifakiwe |

Tento te-Zapier te-Clearstream: *Kutfumela Umlayeto Enombolweni*, *Kutfumela Umlayeto Kulushu*, *Kwakha/Kubuyeketa Umbhaleli*, *Kwengeta Umbhaleli Kuluchungechunge Loluzenzakalelako*, *Kwengeta Luphawu Kumbhaleli*, *Kukhipha Umbhaleli Kulushu*.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

**Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**:

- `settings:write` — kuyadzingeka kutsi B1 ibhalise i-webhook yesicalisi
- `people:read` — kuyadzingeka kutfola umuntfu kusuka kumcimbi (`personId` → ligama/inombolo yelucingo/i-imeyili)
- (Lokungakhetsakala) `people:write` nangabe tiphendvulo te-Clearstream tifanele kwakhe bantfu be-B1

### 2. Yakha i-Zap "umlayeto ngesipho lesisha"

1. **Sicalisi** — B1.church: Umnikelo Lomusha
2. **Sento** — B1.church: Tfola Umuntfu (`personId` yemnikelo)
3. **Sento** — Clearstream: Kutfumela Umlayeto Enombolweni. Sebentisa inombolo yelucingo yemuntfu kusuka kunyatselo 2 njengalotfolako, wakhe umlayeto (`"Siyabonga ngesipho sakho, {first}! …"`).

Vula i-Zap. B1 ibhalisa i-webhook yemnikelo nayivulwa; utawubona `Zapier — donation.created` ivela ku **Tilungiselelo → Sisebentisi Lesakhako → Ema-Webhooks**.

### 3. (Lokungakhetsakala) Buyisela tiphendvulo njengemarekhodi e-B1

1. **Sicalisi** — Clearstream: Umlayeto Lomusha Longenako
2. **Sento** — Sihlungi nge-Zapier ngeligama — sib. cinisela kuchubeka kuphela nangabe umbhalo wemlayeto ucala nge `PRAY`
3. **Sento** — B1.church: Tfola Umuntfu (ngenombolo yelucingo)
4. **Sento** — Sihlungi / Indlela — nangabe angatfolakali, mkhe; kunoma yiphi indlela, faka umbhalo wemlayeto kutsi kwenteni (Slack, Google Sheet, nobe kutfunyelwa kwefomu le-B1 nge-Webhooks by Zapier).

## Tinseluleko Letijwayelekile

### Kubita licembu lebavolontiya

- **Sicalisi** — B1.church: Kutfunyelwa Kwefomu Lokusha (kuhlungwe ngesikhombakhomo sefomu semthandazo)
- **Sento** — Clearstream: Kutfumela Umlayeto Kulushu, lapho lushu kuliciembu lenu lebufundisi lelisebentako njalo. Yakha umbhalo njenge `Sicelo lesisha semthandazo: {data.questions.0.answer}`.

### Luchungechunge lekulandzela sivakashi sekucala

- **Sicalisi** — B1.church: Umuntfu Lomusha, kuhlungwe ngeluphawu lomuntfu lwe-B1 "Sivakashi sekucala"
- **Sento** — Clearstream: Kwengeta Umbhaleli Kuluchungechunge Loluzenzakalelako. Fanisa i-id yeluchungechunge ne-drip yemilayeto lelungiselelwe emalanga lasi-7.

### Kujoyina licembu ngeligama

- **Sicalisi** — Clearstream: Umlayeto Lomusha Longenako (hlungwa ngeligama `MENS`)
- **Sento** — B1.church: Tfola Umuntfu (ngenombolo yelucingo); yehlukanisa nangabe angatfolakali → Mkhe Umuntfu
- **Sento** — B1.church: Engeta Lilunga Lelicembu kulicembu Lebufundisi Bemadvodza

## Imikhawulo & Ematiko

- **I-Clearstream ibala nge-SMS ngemlayeto.** Sento sinye ngasinye seKutfumela Umlayeto sisebentisa lelinye nome makhulu emakhredithi kuya ngebudze nenani labemukeli — hlola bulukhulu bemcebo wakho.
- **Inombolo yelucingo kufanele ibe ngefomethi ye-E.164** (sib. `+15555550199`) ye *Kutfumela Umlayeto Enombolweni*. Irekhodi lemuntfu le-B1 ligcina konkhe lokwafakwa; sebentisa sinyatselo se-*Formatter by Zapier — Numbers → Format Phone Number* nangabe ungeke ucinisekise fomethi.
- **Akudzingeki liheda kusuka kuluhlangotsi lwe-B1** — kuchamuka kwe-Clearstream konkhe kuhlala ngekhatsi kuluchumo lwayo lwe-Zapier.

## Kulungisa Tinkinga

- **Sicalisi asikaze sichubeke** — `Tilungiselelo → Sisebentisi Lesakhako → Ema-Webhooks` kufanele kubonise umugca we-`Zapier — <mcimbi>` ngemuva kwekutsi i-Zap ivulwe. Nangabe kute, sikhiya se-API se-B1 asinaso i-`settings:write`. Khicita futsi uchumanise kabusha.
- **Clearstream ibuyisela "Inombolo yelucingo lengasiyo"** — inkambu yemamukeli ayisiyo yefomethi ye-E.164. Engeta sinyatselo se-Format Phone Number.
- **Kutfumela Umlayeto Kulushu kuyehluleka nge-`403`** — umsebentisi we-API we-Clearstream akanayo imvumo yalolo lushu, nobe i-id yelushu ayilungi. Ema-id elushu ayabonakala ekhasini lemininingwane yelushu le-Clearstream.

## Buka Nalokunye

- [Text In Church](./text-in-church) — inkundla lengashintjaniswa ye-SMS, sakhiwo lesifananako sekuchumanisa
- [Mobile Message](./mobile-message) — yemabandla langaphandle kwe-US
- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Emaphepha e-API e-Clearstream](https://api-docs.clearstream.io/) — yekuchumanisa lokwakhelwe ngesibopho ngaphandle kwe-app ye-Zapier
