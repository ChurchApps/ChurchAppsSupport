---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) yi-API yeSMS yase-Australia — itfandvwa emabandla ase-AU ngobe iniketa tinombolo tendzaweni netinani letincono te-AU lapho i-Clearstream ne-Text In Church tigcile kakhulu ku-US. I-Mobile Message ayikanayo i-app ye-Zapier yekucala lamuhla, kodvwa ishicilela i-REST API yeluntfu, ngako-ke ungachumanisa imicimbi ye-B1 kumlayeto we-Mobile Message nge-**Webhooks by Zapier** (nobe i-module ye-HTTP ye-Make) ngemaminithi lambalwa.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-[Mobile Message](https://mobilemessage.com.au) lenendzawo ye-Sender ID lebhalisiwe kanye netinkhomba te-API (ligama lekusebentisa ne-API + libitomfihlo ngaphansi kwe-*Account → API Settings*)
- I-akhawunti ye-[Zapier](https://zapier.com) (nobe i-[Make](https://www.make.com))
- Umsebentisi we-B1Admin lonemvumo yekutfola **Kuhlela Tilungiselelo**

</div>

## Loko Lokungachumaniswa

I-API ye-Mobile Message yakhelwe "kutfumela i-SMS" — akukho tisicalisi, umlayeto lophumako kuphela. Ngako-ke tonkhe tinseluleko ti-B1 → SMS:

| Luhlangotsi | Sicalisi se-B1 | Umphumela |
|---|---|---|
| B1 → Mobile Message | `person.created` | Umlayeto wekwemukela kumuntfu lomusha |
| B1 → Mobile Message | `donation.created` | Umlayeto wekubonga kumniki |
| B1 → Mobile Message | `form.submission.created` | Bita licembu lelisebentako |
| B1 → Mobile Message | `event.created` | Kukhumbuta lokusakatwa kulushu |

## Kulungiselela

### 1. Khicita sikhiya se-API ye-B1

**Tilungiselelo → Sisebentisi Lesakhako → Tikhiya te-API → Sikhiya Lesisha se-API**:

- `settings:write` — kutsi i-webhook yesicalisi ibhalise
- `people:read` — kutfola inombolo yelucingo yemamukeli kusuka ku `personId`

### 2. Yakha i-Zap nge-Webhooks by Zapier

1. **Sicalisi** — B1.church: khetsa umcimbi lofunako (sib. Umnikelo Lomusha).
2. **Sento** — B1.church: Tfola Umuntfu (usebentisa `data.personId`) kutfola inombolo yelucingo neligama.
3. **Sento** — Webhooks by Zapier: **POST**. Lungisela njengangentasi.

Tilungiselelo tesinyatselo se-POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Luhlobo Lwepheyiloti** — JSON
- **Imininingwane** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Emaheda** — `Content-Type: application/json` (i-Webhooks by Zapier ingeta loku ngekutentekela)
- **Basic Auth** — beka inkambu ye-*Basic Auth* kutsi ibe `<api_username>|<api_password>` (i-Zapier iyaguca loko kubelesiheda lesilungile se-`Authorization: Basic …`)

Vula i-Zap. Tfumela sipho sekuhlola ku-B1Admin kutsi ucinisekise kutsi umlayeto uyafika.

## Tinseluleko Letijwayelekile

### Kukhumbuta kwemcimbi ekuseni ngalelo langa

- **Sicalisi** — Schedule by Zapier (onkhe malanga, ngu-7am)
- **Sento** — B1.church: Tfola Imicimbi yalelo langa (nobe sebentisa sinyatselo se-Find nesihlungi selusuku lolucinile, nobe gcina luhlu lwemicimbi yanamuhla ku-Google Sheet)
- **Sento** — Webhooks by Zapier: Fak' i-POST ku-Mobile Message ngeluhlu lwemcimbi kulicembu lelibhalisiwe lelibhalisiwe

### Sebentisa indzawo ye-batch yekusakata kulushu

Indzawo ye-`/v1/messages` ye-Mobile Message yemukela kufika ku-10,000 emlayeto ngekubita kunye. Kusakata kulicembu le-B1:

- **Sicalisi** — B1.church: Kutfunyelwa Kwefomu Lokusha (hlungwa kufomu lelitsite)
- **Sento** — B1.church: Luhlu Lwemalunga Elicembu lelicembu lelifunwako (nge sinyatselo se-*Webhooks by Zapier — GET* ku `/membership/groupmembers?groupId=…`)
- **Sento** — Formatter by Zapier → Utilities → Beka phansi tiphendvulo ku luhlu lwe-`messages`
- **Sento** — Webhooks by Zapier: Fak' i-POST luhlu lolugcwele ku `/v1/messages`

### Lenye indlela nge-Make

Nangabe utsandza i-Make, faka i-module ye-**HTTP — Make a request** ngemuva kwesicalisi se-B1 Watch Events, uyilungisele ngendlela lefanako (POST, Basic Auth, umtimba we-JSON). Buka [Make overview](../make) yeluhlangotsi lwe-B1.

## Imikhawulo & Ematiko

- **I-Basic Auth yindlela kuphela yekucinisekisa.** I-Mobile Message ikhipha ligama lekusebentisa nelibitomfihlo kusuka kubhodi. Phatsa kokubili njengetimfihlo.
- **`sender` kufanele ibe yi-Sender ID lebhalisiwe** ku-akhawunti yakho ye-Mobile Message, nobe kutfumela kutawubuyisa `400 Invalid sender`. Imitsetfo ye-AU idzinga kubhalisa umtfumeli.
- **Tinombolo telucingo te-AU** tingaba `0412345678` (yendzaweni) nobe `+61412345678` (yemhlaba wonkhe). I-API yemukela kokubili, kodvwa lungisa ku-`+61…` nangabe futsi utfumela phesheya.
- **Kufika ku-10,000 emlayeto ngesicelo sinye** — lokusitako yekusakata, kodvwa kulethwa kunye kwe-webhook ye-B1 kuyoze kukhiphe luhlu lolukhulu kangako; gcinela indzawo ye-batch tema-Zap lakhulu lahlelwe ngesikhatsi.

## Kulungisa Tinkinga

- **I-POST ibuyisela `401 Unauthorized`** — tinkhomba te-Basic Auth atisilungi. Kopela kabusha kusuka ku-*Account → API Settings* ye-Mobile Message. Cabanga kutsi ligama lekusebentisa yi-imeyili ye-akhawunti yakho ngekwehluleka, hhayi sikhiya lesahlukene se-API.
- **I-POST ibuyisela `400 Invalid sender`** — inani le-`sender` alisiyo Sender ID lebhalisiwe ku-akhawunti yakho. Libhalise kubhodi le-Mobile Message kucala.
- **Umlayeto uyafika kodvwa unqunyulwe** — I-Mobile Message ihlukanisa imilayeto lengetulu kwati-160 lezinhlamvu kube tincenye letinyenti; ubhadalwa ngencenye ngayinye. Hlola umtimba wempendvulo — ikutjela inani lencenye.

## Buka Nalokunye

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — labanye labaniketi be-SMS labanema-app aveleleko e-Zapier (akudzingeki sinyatselo se-Webhooks-by-Zapier)
- [Zapier (kubuka konkhe)](../zapier) — luhlangotsi lwe-B1 lweluseluko lonkhe lwe-Zapier
- [Emaphepha e-API e-Mobile Message](https://mobilemessage.com.au/api-documentation)
