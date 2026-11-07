---
title: "API raktai"
---

# API raktai

<div class="article-intro">

API raktai (asmeniniai prieigos žetonai) yra paprasčiausias būdas autentifikuotis B1 API iš serverio pusės scenarijaus, trečiosios šalies jungties (Zapier, Make, Google Sheets) ar bet kur, kur pilnas OAuth srautas būtų per daug. Raktas susietas su konkrečiu asmeniu konkrečioje bažnyčioje ir paveldi to asmens leidimus, kuriuos galima susiaurinti pasirinktiniu apimčių (scopes) rinkiniu.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Raktus kuria ir tvarko bažnyčios administratorius, turintis leidimą **Edit Settings**
- Neapdorotas raktas rodomas **tik vieną kartą** sukūrimo metu – iškart išsaugokite jį saugioje vietoje
- Visos API užklausos turi naudoti **HTTPS**

</div>

## Rakto formatas

B1 API raktas atrodo taip:

```
cak_<prefix>.<secret>
```

- `cak_` – fiksuotas identifikatorius (API rakto priešdėlis, pagal kurį autentifikavimo sluoksnis atpažįsta raktą)
- `<prefix>` – 8 simbolių vieša paieškos dalis
- `<secret>` – 48 simbolių paslaptis; serveryje saugoma tik jos SHA-256 maiša

Visas raktas serveriui perduodamas standartinėje `Bearer` antraštėje:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Autentifikavimo sluoksnis bet kurį žetoną, prasidedantį `cak_`, nukreipia į API raktų kelią, sumaišo paslaptį, ieško rakto pagal priešdėlį ir nustato rakto asmens dabartinius leidimus. Todėl leidimo panaikinimas B1Admin įsigalioja jau kitoje užklausoje, o raktas niekada nenukrypsta nuo vaidmens.

## Rakto kūrimas (B1Admin)

1. Prisijunkite prie B1Admin kaip naudotojas, turintis leidimą **Edit Settings**.
2. Atidarykite **Settings → Developer → API Keys**.
3. Spustelėkite **New API Key**, suteikite lengvai atpažįstamą pavadinimą (pvz., „Zapier – aukų sinchronizavimas“), pasirinkite apimtis, kurias turės raktas, ir spustelėkite **Save**.
4. Visas `cak_…` raktas dialogo lange rodomas **tik vieną kartą**. Prieš uždarydami nukopijuokite jį į savo integracijos konfigūraciją – vėliau jo atkurti neįmanoma. Visada galite sukurti naują raktą.

## Apimtys

Apimtis **susiaurina**, ką raktas gali daryti – ji niekada negali suteikti leidimo, kurio pagrindinis asmuo neturi. Jei apimčių nenurodyta arba jų nėra, raktas turi visą asmens leidimų rinkinį.

| Apimtis | Leidžia |
|---|---|
| `people:read` / `people:write` | Peržiūrėti / redaguoti asmenis, namų ūkius, grupių narius |
| `groups:read` / `groups:write` | Peržiūrėti / redaguoti grupes ir jų narystę |
| `donations:read` / `donations:write` | Peržiūrėti / registruoti aukas |
| `attendance:read` / `attendance:write` | Peržiūrėti / registruoti lankomumą, sesijas, registracijas |
| `forms:write` | Tvarkyti formas (skaitymo teisė įtraukta į rašymo teisę) |
| `content:read` / `content:write` | Peržiūrėti / redaguoti svetainės turinį, registracijas, transliacijas |
| `messaging:read` / `messaging:write` | Skaityti pranešimus; rašymo teisė leidžia ir siųsti SMS |
| `roles:read` / `roles:write` | Peržiūrėti / redaguoti vaidmenų apibrėžimus |
| `settings:read` / `settings:write` | Peržiūrėti / redaguoti bažnyčios nustatymus (**būtina**, norint programiškai registruoti webhook'us) |
| `workflows:read` / `workflows:write` | Peržiūrėti darbo eigas ir užduotis / vykdyti ir redaguoti darbo eigas. Darbo eigos vykdymas gali siųsti el. laiškus ir tekstines žinutes, paleisti webhook'us ir keisti grupių narystę |
| `offline_access` | Leidžia ilgalaikius atnaujinimo žetonus (tik OAuth srautams – API raktams neturi poveikio) |

`write` apimtys savaime apima atitinkamą `read` apimtį. Serverio ir domeno administratoriaus leidimai tyčia nėra rodomi kaip apimtys – apribotas prieigos duomenų rinkinys niekada negali įgyti svetainės administravimo teisių.

:::tip
Jei raktą ketinate naudoti webhook'ams registruoti (pvz., Zapier ar Make integracijai), raktui reikia `settings:write`. Raktas tik su `people:read` tyliai gauna 403 klaidą užklausai `POST /membership/webhooks`.
:::

## Rakto naudojimas

Naudojama kaip bet kuris kitas `Bearer` žetonas – kiekviena autentifikuota galutinė vieta priima API raktus lygiai taip pat, kaip JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Jei rakto apimčių nepakanka, užklausa grąžina **403 Forbidden** su tokia pačia struktūra, kokia naudojama visoms leidimo nesuteikimo klaidoms.

## Raktų valdymas per API

Visos galutinės vietos yra Membership modulio kelyje `/membership/apiKeys` ir reikalauja JWT (ne API rakto) iš bažnyčios administratoriaus, turinčio leidimą **Edit Settings**.

| Metodas ir kelias | Paskirtis |
|---|---|
| `GET /membership/apiKeys` | Išvardyti bažnyčios raktus (be paslapties – tik `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Visų galimų apimčių pavadinimų sąrašas – raktų kūrimo sąsajai |
| `POST /membership/apiKeys` | Sukurti naują raktą. Turinys: `{ "name": "...", "scopes": ["people:read"] }`. Atsakyme neapdorotas `cak_…` raktas pateikiamas **vieną kartą**. |
| `DELETE /membership/apiKeys/:id` | Panaikinti raktą – įsigalioja kitoje užklausoje |

Panaikintas raktas iškart nebegalioja – jokio papildomo laikotarpio nėra.

## Geriausia praktika

- **Vienas raktas vienai integracijai.** Jei kas nors bus pažeista, panaikinate tik vieną raktą, nesutrikdydami kitų.
- **Kurkite siauriausias veikiančias apimtis.** Google Sheets eksportui pakanka `people:read`, nereikia `settings:write`.
- **Susiekite raktą su paslaugos paskyra, o ne su tikru darbuotoju.** Jei darbuotojas išeina, jo B1 prieiga baigiasi – kartu baigiasi ir visi jo tapatybe sukurti raktai.
- **Saugokite raktus paslapčių tvarkytuvėje** (jūsų talpinimo paslaugos aplinkos kintamieji, AWS Secrets Manager ir pan.) – niekada versijų valdymo sistemoje.
- **Keiskite raktus**, jei įtariate, kad jie galėjo nutekėti: sukurkite naują raktą, atnaujinkite integraciją, tada ištrinkite senąjį.

## Kuo skiriasi nuo OAuth

API raktai tinka, kai **jūsų bažnyčia yra vienintelė, naudojanti integraciją**. Jungčiai, kuriai reikia prieigos prie daugelio bažnyčių, kiekvienai aiškiai sutikus – pavyzdžiui, SaaS programai, bendrinamai B1 bendruomenėje – vietoj to naudokite [OAuth ir prijungtos programos](./connected-apps).

| | API raktas | OAuth |
|---|---|---|
| Kas įdiegia | Vienas bažnyčios administratorius | Kiekvienas bažnyčios administratorius autorizuoja programą |
| Autentifikavimo antraštė | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Žetono galiojimo laikas | Iki panaikinimo | Prieiga ≈ 7 dienos, atnaujinimas ≈ 90 dienų |
| Geriausiai tinka | Vidiniams scenarijams, Zapier/Make/Sheets jungtims | Daugianuomininkėms trečiųjų šalių programoms |
