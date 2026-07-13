---
title: "Tikhiya te-API"
---

# Tikhiya te-API

<div class="article-intro">

Tikhiya te-API (ema-token ekufinyelela lomuntfu) yindlela lelula kakhulu yekutivakalisa (authenticate) ku-B1 API kusuka ku-script lesebenta ku-server, ku-connector yenkampani yesitsatfu (Zapier, Make, Google Sheets), nobe nobe kuphi lapho inchubo lengiyo yonkhe ye-OAuth ingaba yinto lengephindze. Sikhiya sibotjelwe kumuntfu lotsite ebandleni lelitsite futsi sidla tinsayeya temuntfu loyo, lokuncishiswa licembu lelitsite le-scopes (lelikhetsekile).

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Umphatsi welibandla lonemvumo ye-**Edit Settings** nguye lodala futsi laphatse tikhiya
- Sikhiya lesingakahleleki sikhonjiswa **kanye kuphela** ngesikhatsi sakhiwa — sigcine endzaweni lephephile ngekushesha
- Tonkhe ticelo te-API kufanele tisebentise **HTTPS**

</div>

## Umumo Wesikhiya

Sikhiya se-B1 API sibukeka kanje:

```
cak_<prefix>.<secret>
```

- `cak_` — sikhombisi lesingashintji (isiqalo sesikhiya se-API lesisetjentiswa ngumcuba wekutivakalisa)
- `<prefix>` — incenye yekufuna leyaziwako yetinhlamvu letisi-8
- `<secret>` — imfihlo yetinhlamvu letingu-48; kugcinwa kuphela i-hash ye-SHA-256 ku-server

Sikhiya lesigcwele sinikwa ku-server ku-header levamile ye-bearer:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Umcuba wekutivakalisa we-API uhambisa nome ngutoken lesucala nge-`cak_` endleleni ye-API-key, u-hash imfihlo, uyifune nge-prefix, futsi asombulule tinsayeya taleso sikhatsi temuntfu lophetse sikhiya — ngako kususa imvumo ku-B1Admin kusebenta kucelo lelilandzelako, futsi sikhiya asikaze sihlukane nendzima yaso.

## Kwakha Sikhiya (B1Admin)

1. Ngena ku-B1Admin njengemsebentisi lonemvumo ye-**Edit Settings**.
2. Vula **Settings → Developer → API Keys**.
3. Chofota **New API Key**, unike ligama lelicaciswako (sibonelo "Zapier — donations sync"), ukhetse ema-scope lokufanele abe nawo sikhiya, bese **Save**.
4. Sikhiya lesigcwele se-`cak_…` sikhonjiswa **kanye kuphela** ku-dialog. Kopisha usifake ku-config yelucezu lwakho ngaphambi kwekuvala — akukho lendlela yekusitfola futsi. Ungasho wakha sikhiya lesisha noma nini.

## Ema-Scope

I-scope **iyancisha** loko sikhiya lesikwentako — ayikwati nakanjani kuniketa imvumo umuntfu longayinawo. Kungaba nema-scope lokungu-nga (empty) kusho kutsi sikhiya sitfwele lonkhe luhla lwetinsayeya temuntfu.

| Scope | Kuvumela |
|---|---|
| `people:read` / `people:write` | Kubuka / kuhlela bantfu, emakhaya, emalunga elicembu |
| `groups:read` / `groups:write` | Kubuka / kuhlela emacembu kanye nemalunga awo |
| `donations:read` / `donations:write` | Kubuka / kubhala phansi eminikelo |
| `attendance:read` / `attendance:write` | Kubuka / kubhala phansi kubakhona, tigcawu, ekungena |
| `forms:write` | Kuphatsa emafomu (kufinyelela kwekubuka kutfolakala ngekwentiwa nge-write) |
| `content:read` / `content:write` | Kubuka / kuhlela kucuketfwe kweliwebhusayithi, kubhalisa, kusakaza |
| `messaging:read` / `messaging:write` | Kufundza tigcwadi; kubhala kuphindze kuvumele kutfumela i-SMS |
| `roles:read` / `roles:write` | Kubuka / kuhlela tichazo te-role |
| `settings:read` / `settings:write` | Kubuka / kuhlela tilungiselelo telibandla (**kuyadzingeka** kubhalisa ema-webhook ngendlela ye-programu) |
| `offline_access` | Kuvumela ema-token e-refresh laphila sikhatsi lesidze (kumadlelo e-OAuth kuphela — akunamtselela kuma-API key) |

Ema-scope e-`write` afaka ka-implicit lawo lafanako e-`read`. Timvumo te-server- kanye ne-domain-admin atikaziswanga khona kwenta kuba ema-scope ngasho — i-credential lenema-scope ayikwati nakanjani kukhushulwa kuya kuphatsa yonkhe indzawo.

:::tip
Nangabe utawusebentisa sikhiya kubhalisa ema-webhook (sibonelo kulucezu lwe-Zapier nobe Make), sikhiya sidzinga i-`settings:write`. Sikhiya lesinemvumo ye-`people:read` kuphela siyawa nge-403 ngekutfulwa ku-`POST /membership/webhooks`.
:::

## Kusebentisa Sikhiya

Njengaloko kunjalo nangayiphi i-token ye-bearer — nginyako yonkhe i-endpoint letivakalisiwe yamukela tikhiya te-API njengaloko yamukela ema-JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Sicelo lesinesikhiya lesingenawo emalunga ema-scope siphendvula nge-**403 Forbidden** ngendlela lefanako naleyo lesetjentiswa kuyo yonkhe iphutsa lelivimbela ngenca yemvumo.

## Kuphatsa Tikhiya nge-API

Tonkhe ema-endpoint asendleleni ye-`/membership/apiKeys` ye-module ye-Membership futsi adzinga i-JWT (hhayi sikhiya se-API) lesuka kumphatsi welibandla lonemvumo ye-**Edit Settings**.

| Inchubo & Umkhondvo | Injongo |
|---|---|
| `GET /membership/apiKeys` | Bala tikhiya telibandla (kute imfihlo — kuphela `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Luhla lwato tonkhe ema-scope latfolakalako — kwe-UI yekwakha sikhiya |
| `POST /membership/apiKeys` | Akha sikhiya lesisha. Umtimba: `{ "name": "...", "scopes": ["people:read"] }`. Imphendvulo ifaka sikhiya lesingakahleleki se-`cak_…` **kanye kuphela**. |
| `DELETE /membership/apiKeys/:id` | Susa sikhiya — kusebenta ngesikhatsi selicelo lelilandzelako |

Sikhiya lesisusiwe siyanyamalala ngekushesha — akukho sikhatsi sekulinda.

## Tindlela Letisebenta Kahle

- **Sikhiya sinye ngayinye i-integration.** Nangabe lokutsite kwephulwa, ususa sikhiya sinye ngaphandle kwekulimata leminye.
- **Nika ema-scope lancane kakhulu lasebentako.** I-export ye-Google Sheets idzinga kuphela `people:read`, hhayi `settings:write`.
- **Bopha sikhiya ku-akhawundi yesitembu, hhayi kumsebenti wangempela.** Nangabe umsebenti asuka, kufinyelela kwakhe ku-B1 kuyaphela — kanjalo nato tonkhe tikhiya letakhiwe ngaphansi kwesati sakhe.
- **Gcina tikhiya endzaweni yekugcina imfihlo** (ema-environment variable enkampani lenika i-hosting, AWS Secrets Manager, njll.) — ungakaze utifake ku-source control.
- **Shintja tikhiya** nangabe usola kutsi tembuliwe: akha sikhiya lesisha, buyeketa i-integration, bese usula lesidzala.

## Kwehluka Kwako ku-OAuth

Tikhiya te-API tifanele nangabe **libandla lakho lodvwa lelisebentisa i-integration**. Ku-connector ledzinga kufinyelela emabandla lamanyenti, ngamunye ngemvume yakhe leyicacile — njengengcinga ye-SaSS lehlanganyelwako emphakatsini we-B1 — sebentisa [OAuth ne-Connected Apps](./connected-apps) kunaloko.

| | Sikhiya se-API | OAuth |
|---|---|---|
| Ngubani lokufakako | Umphatsi lomunye welibandla | Wonkhe umphatsi welibandla uyayivumela i-app |
| Header yekutivakalisa | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Sikhatsi lokuphila token | Kuze kususwe | Kufinyelela ~emalanga lasi-7, i-refresh ~emalanga langu-90 |
| Kufanela ini | Ema-script angekhatsi, ema-connector e-Zapier/Make/Sheets | Ema-app ekunye lalucezu lwesitsatfu lasebentiselana emabandla lamanyenti |
