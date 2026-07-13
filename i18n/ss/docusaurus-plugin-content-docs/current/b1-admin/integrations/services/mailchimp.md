---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Faka bantfu labasha be-B1, baniki, nobe emalunga emacembu kuluchungechunge lwe-Mailchimp kuze luchungechunge lolulandzelako lwekwemukela, sicelo semnyaka lophelile, nobe incwadzi yebavolontiya ikhiphe kuluhlu lolusengeti lolusha njalo. B1 ayinako kufaniswa nge-Mailchimp lokwakhelwe ngekhatsi — kuchumana konkhe kuhlala ku-Zapier (nobe Make): B1 icalisa umcimbi, i-Mailchimp yemukela umbhaleli.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Mailchimp](https://mailchimp.com) lenekungenani luchungechunge lolulodwa lofuna bantfu be-B1 bafakwe kulo
- I-akhawunti ye-[Zapier](https://zapier.com) (lizinga lemahhala lifaka emabandla lamancane)
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo** kuze ukhone kukhicita sikhiya se-API

</div>

## Loko Lokungachumaniswa

| Luhlangotsi | Sicalisi se-B1 | Sento se-Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Engeta/Buyeketa Umbhaleli |
| B1 → Mailchimp | `donation.created` | Engeta Umbhaleli Kuluphawu (sib. "Gave in 2026") |
| B1 → Mailchimp | `group.member.added` | Engeta Umbhaleli Kuluphawu lolucondzelwe lelo licembu |
| Mailchimp → B1 | Umbhaleli Lomusha | B1 *Kwakha Umuntfu* |

Luhlangotsi lwe-Mailchimp luveza lokunyenti kakhulu (imikhankaso, tigaba, tinchubo letizenzakalelako) — buka [tisicalisi te-Zapier te-Mailchimp](https://zapier.com/apps/mailchimp/integrations) yeluhlu lolugcwele. Nome yini leyefanwa kusuka ku-envelope ye-B1 iyavuma.

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

Ku-B1Admin hamba uye ku **Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**. Nika sona timvumo letidzingwa yi-Zap:

- `settings:write` — kuyadzingeka kutsi sicalisi sibhalise iwebhook yaso
- `people:read` — kuze i-Zap ifundze ligama lekucala/lelisekugcina, i-imeyili, njlnj.
- (Lokungakhetsakala) `people:write` nangabe uphindze uhlela luhlangotsi lwe-Mailchimp → B1

Gcina bese ukhopela umbhalo we-`cak_…` — uboniswa kanye kuphela.

### 2. Yakha i-Zap

1. **Sicalisi:** `B1.church — New Person`. Kusetjentiswa kwekucala i-Zapier iyakubuta kutsi *Sign in to B1.church*; namathisela sikhiya se-API.
2. **Sento:** `Mailchimp — Add/Update Subscriber`. Fanisa umphumela wesicalisi:
   - `data.contactInfo.email` → Sikheli se-Imeyili
   - `data.name.first` → Ligama Lekucala
   - `data.name.last` → Ligama Lelisekugcina
   - (Lokungakhetsakala) `data.id` → inkambu ye-merge ye-Mailchimp nangabe ufuna kugcina i-id yemuntfu we-B1 eceleni.
3. Vula i-Zap. I-Zapier ibhalisa iwebhook ye-`person.created` ku-B1 — cinisekisa ku **Tilungiselelo → Sisebentisi Lesakhako → Ema-Webhooks** kutsi umugca lobitwa "Zapier — person.created" uyavela.

Nako-ke. Engeta umuntfu ku-B1Admin kucinisekisa — umbhaleli lomusha uvela ku-Mailchimp ngemasekondzi lambalwa.

## Tinseluleko Letijwayelekile

### Faka luphawu kubaniki ngekutentekela

- **Sicalisi** — B1: Umnikelo Lomusha
- **Sento** — B1: Tfola Umuntfu (kusesha nge `personId`) kutfola i-imeyili
- **Sento** — Mailchimp: Engeta Umbhaleli Kuluphawu (luphawu `Gave-2026`)

### Dvonsa luchungechunge lwekwemukela lolucondzene nelicembu

- **Sicalisi** — B1: Lilunga Lelicembu Lelisha, kuhlungwe nge `data.groupId`
- **Sento** — Mailchimp: Engeta Umbhaleli Kuluphawu lolubitwa ngelicembu; calisa luchungechunge lwakho lolukhona kuloluphawu

### Kokubili tinhlangothi: kubhaliswa lokusha kwe-Mailchimp kuba bantfu be-B1

- **Sicalisi** — Mailchimp: Umbhaleli Lomusha
- **Sento** — B1: Kwakha Umuntfu (fanisa Ligama Lekucala/Lelisekugcina/Imeyili)

## Lenye Indlela nge-Make

I-[app ye-Mailchimp](https://www.make.com/en/integrations/mailchimp) ye-Make ifaka ema-module lasi-44 — kuchumana kufana ncimingca, ngesicalisi se-B1 se-*Watch Events* lesitsatsa indzawo ye-Zapier. Buka [liphepha lekubuka le-Make](../make) yeluhlangotsi lwe-B1.

## Imikhawulo & Ematiko

- **Lizinga lemahhala le-Mailchimp livalela bantfu neluchungechunge.** I-Zap legcwalisa luchungechunge lwemahhala ngetulu komkhawulo wayo itawucala kuphuma iphutsa `4xx Member limit reached`. Emarekhodi e-Mailchimp akwenta loku kucace.
- **I-Mailchimp iyacoca lokuphindziwe nge-imeyili**, ngako-ke kubuyisela kuhambisa i-Zap etikwemuntfu lofanako we-B1 kuyambuyeketa yena yedvwa; ayakhi lokuphindziwe.
- **Kuyekwa kwe-Mailchimp akubuyeli ku-B1.** Nangabe ufuna kuyekwa kwe-Mailchimp kucoca luncumo lwe-B1 lwe-"Send Mail", yakha i-Zap lebuyako ngekhodi ngekucacile.

## Kulungisa Tinkinga

- **I-Zap ayikaze ichubeke** — hlola `Tilungiselelo → Sisebentisi Lesakhako → Ema-Webhooks` yemugca we `Zapier — person.created`. Nangabe awukho, sikhiya se-API besingenayo i-`settings:write` nakuvulwa i-Zap. Khicita kabusha, chumanisa kabusha, vala uvule i-Zap.
- **Sicwayiso se-`Member exists` etikwe-Add/Update** — shintja sento kusuka ku-*Add Subscriber* kuya ku-*Add/Update Subscriber* (libito liyabaluleka). Luhlobo lwe-upsert luyisimo lesingashintji.
- **Ligama lekucala / lelisekugcina lifika liyize** — `data.name.first` ne-`data.name.last` be-B1 kugcwaliswa kuphela nangabe letinkambu tibekiwe kulomuntfu. Fanisa `data.name.display` njengendlela yesibili.

## Buka Nalokunye

- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Make (kubuka konkhe)](../make) — kufanako, sakhi sekubona
- [Webhooks (inkomba yentfutfuki)](/docs/developer/api/webhooks#event-catalog)
