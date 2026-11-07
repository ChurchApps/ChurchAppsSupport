---
title: "Savarankiškas diegimas Railway platformoje"
description: "Diekite privatų ChurchApps egzempliorių Railway per ~15 min., tada sukonfigūruokite el. paštą, domenus, aukas ir failų saugyklą B1 Admin ir B1App."
---

# Savarankiškas diegimas Railway platformoje

<div class="article-intro">

ChurchApps skelbia vieno paspaudimo [Railway](https://railway.com) šabloną, kuris suteikia jūsų bažnyčiai savo privatų B1 Admin, B1 narių portalo, API ir MySQL duomenų bazės egzempliorių. Viskas veikia infrastruktūroje, kurią turite ir už kurią mokate tiesiogiai. Šis vadovas padės jums paleisti sistemą maždaug per 15 minučių, o po to aprašys diegimo po konfigūracijos veiksmus, kurių dauguma bažnyčių galiausiai nori.

</div>

## Greitasis startas

[![Diegti Railway platformoje](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Spustelėkite aukščiau esantį mygtuką **Deploy on Railway**.
2. Prisijunkite prie Railway (arba sukurkite nemokamą paskyrą) ir pridėkite mokėjimo būdą.
3. Spustelėkite **Deploy**, nieko nekeisdami. Kiekvienas kintamasis turi tinkamą numatytąją reikšmę.
4. Palaukite 5–10 minučių, kol keturios paslaugos taps žalios.
5. Atidarykite **B1Admin** paslaugos URL, spustelėkite **Registruotis** ir sukurkite savo paskyrą. Pirmoji paskyra automatiškai tampa serverio administratoriumi.
6. Vykdykite programos nurodymus, kad sukurtumėte pirmąją bažnyčią.

Viskas. Dabar turite visiškai veikiančią ChurchApps instanciją. Toliau aprašyti veiksmai yra neprivalomi.

:::tip
Diegimas šiuo metu yra **beta** versijos. Jei susidursite su kažkuo, ko dokumentacijoje nėra, prašome atidaryti problemą adresu [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) ir pridėti diegimo žurnalus.
:::

<div class="prereqs">
<h4>Ko jums reikia</h4>

- Nemokama [Railway](https://railway.com) paskyra
- Kredito kortelė, įrašyta Railway (~$15–25 per mėnesį mažai bendruomenei; žr. [Kainos](#costs))
- Apie 15 minučių pradiniam diegimui
- *Neprivaloma, bet vėliau labai rekomenduojama:* SMTP prisijungimo duomenys ir pasirinktinis domenas

</div>

## Kas bus įdiegta

Šablonas vienoje Railway projekte sukuria keturias paslaugas:

| Paslauga | Paskirtis | URL po diegimo |
|----------|-----------|----------------|
| **MySQL** | Saugo visus duomenis (viena instancija, keletas schemų) | tik vidiniai |
| **Api** | Serveris narystei, turiniui, aukoms, lankomumui ir kt. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Darbuotojų ir administratorių žiniatinklio programa | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Narių žiniatinklio programa ir bažnyčios svetainė | `https://b1app-<id>.up.railway.app` |

Duomenų bazės schemas automatiškai sukuria API paleidimo migracija pirmojo paleidimo metu.

## Pirminė konfigūracija

Dabar, kai sistema veikia, štai dalykai, kuriuos dauguma bažnyčių nustato toliau, maždaug pagal prioritetą.

### 1. El. paštas (labai rekomenduojama)

Be el. pašto nariai vis tiek gali registruotis ir naudotis sistema, tačiau **negali atkurti pamirštų slaptažodžių**. Tai turi padaryti administratorius. SMTP nustatymas trunka apie 5 minutes.

Railway valdymo skydelyje atidarykite **Api** paslaugą → **Variables** ir pridėkite:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Verta žinoti apie tris teikėjus:

#### Resend: paprasčiausia nemokama parinktis (100 laiškų per dieną)

1. Užsiregistruokite adresu [resend.com](https://resend.com).
2. Patvirtinkite siuntimo domeną (arba pradėkite naudodami bandomąjį siuntėją `onboarding@resend.dev`).
3. Sukurkite API raktą.
4. Nustatykite `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail: nemokama asmeniniam naudojimui (~500 per dieną)

1. Įjunkite dviejų veiksnių autentifikavimą Google paskyroje.
2. Sukurkite [programos slaptažodį](https://myaccount.google.com/apppasswords).
3. Nustatykite `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<the 16-character app password>`.

#### AWS SES: pigiausia didelei apimčiai

1. Patvirtinkite siuntimo domeną AWS.
2. Jei siųsite į nepatvirtintus adresus, pereikite iš SES smėlio dėžės režimo.
3. Sukurkite SMTP prisijungimo duomenis skiltyje **SES → SMTP Settings → Create credentials**.
4. Nustatykite `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

Išsaugoję kintamuosius, Api paslauga automatiškai perdiegiama. Patikrinkite tai inicijuodami slaptažodžio atkūrimą bandomojoje paskyroje.

:::warning
Jei nustatysite `MAIL_SYSTEM=SMTP` su neteisingais prisijungimo duomenimis, registracija atrodys sėkminga, bet patvirtinimo laiškas niekada neatkeliaus. Arba ištaisykite prisijungimo duomenis, arba pašalinkite `MAIL_SYSTEM`, kad grįžtumėte į režimą be el. pašto.
:::

### 2. Pasirinktiniai domenai

Numatytieji `*.up.railway.app` URL veikia, tačiau dauguma bažnyčių nori savų.

Kiekvienai žiniatinklio paslaugai (B1Admin ir B1App):

1. Railway atidarykite paslaugą → **Settings** → **Networking**.
2. Spustelėkite **+ Custom Domain** ir įveskite pagrindinio kompiuterio pavadinimą:
   - `admin.yourchurch.org` B1Admin paslaugai
   - `app.yourchurch.org` (arba `www`) B1App paslaugai
3. Pridėkite CNAME įrašą, kurį Railway rodo, į savo DNS teikėją.
4. Palaukite kelias minutes, kol DNS įrašai atsinaujins. Railway automatiškai suteikia TLS sertifikatą.

Tada atnaujinkite **Api** paslaugos kintamuosius, kad nuorodos el. laiškuose vestų į naujus domenus:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Ir **B1Admin** paslaugoje:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Žymė `{subdomain}` yra pažodinė. Veikimo metu ji pakeičiama kiekvienos bažnyčios subdomenu (žr. skyrių „Keli bažnyčių vienoje instancijoje“ žemiau).

### 3. Keli bažnyčių vienoje instancijoje (Multi-Site)

ChurchApps iš esmės yra daugianuomenė sistema. Vienas diegimas gali talpinti bet kokį bažnyčių skaičių, kiekviena su savo žmonėmis, grupėmis ir svetaine. Naujos bažnyčios pridedamos visiškai per administravimo sąsają, infrastruktūros pakeitimų nereikia.

#### Papildomų bažnyčių pridėjimas

1. **B1 Admin** programoje eikite į **Nustatymai → Tvarkyti bažnyčią → Perjungti bažnyčią → Sukurti naują**.
2. Kiekviena bažnyčia turi unikalų **subdomeno žymeklį** (pvz., `firstchurch`, `gracecommunity`).
3. Nauja bažnyčia gauna savo duomenis, narius, svetainę ir aukų nustatymus, visiškai atskirus nuo kitų tos pačios instancijos bažnyčių.

#### Kiekvienos bažnyčios nukreipimas į savo URL

Yra du būdai viešai pateikti bažnyčias:

| Modelis | Pavyzdys | Nustatymas |
|---------|----------|------------|
| **Pagal kelią** (veikia iš karto) | `app.yourchurch.org/firstchurch` | Papildomo nustatymo nereikia |
| **Pagal subdomeną** (švaresni URL) | `firstchurch.yourchurch.org` | Pakaitinis DNS įrašas ir pakaitinis pasirinktinis domenas |

Subdomenų nukreipimui Railway platformoje:

1. Savo DNS teikėjo valdymo skydelyje sukurkite pakaitinį CNAME įrašą: `*.yourchurch.org → <b1app railway target>`.
2. Railway, B1App paslaugoje → **Settings** → **Networking**, pridėkite `*.yourchurch.org` kaip pasirinktinį domeną.
3. B1Admin paslaugoje nustatykite `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Po perdiegimo kiekvienos bažnyčios svetainė automatiškai pasiekiama adresu `<jų-subdomenas>.yourchurch.org`.

:::info
Pakaitiniams pasirinktiniams domenams reikalingas mokamas Railway planas. Nukreipimas pagal kelią veikia visuose planuose ir yra funkciškai identiškas. Skirtumas tik tas, kad URL juostoje jis atrodo mažiau gražiai.
:::

### 4. Internetinės aukos (Stripe / PayPal)

Aukos konfigūruojamos **kiekvienai bažnyčiai atskirai administravimo sąsajoje**, o ne per aplinkos kintamuosius. Taip kiekviena bažnyčia gali naudoti savo prekybininko sąskaitą.

1. Gaukite kūrėjo prisijungimo duomenis iš [Stripe](https://dashboard.stripe.com/) (Developers → API keys) arba [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. B1 Admin programoje eikite į **Nustatymai → Aukų nustatymai**.
3. Pasirinkite teikėją, įklijuokite viešąjį ir slaptąjį raktus bei sukonfigūruokite mokesčių tvarkymą.
4. Neprivaloma: pridėkite `GOOGLE_RECAPTCHA_SECRET_KEY` į **Api** paslaugą Railway, kad apsaugotumėte viešas aukojimo formas nuo botų.

### 5. Failų saugykla

Šablonas sukuria **1 GB nuolatinį tomą**, prijungtą prie Api paslaugos. Jame saugomos narių nuotraukos, pamokslų failai ir įkelti dokumentai.

Norėdami jį padidinti, atidarykite Api paslaugą → **Volumes** ir pakeiskite dydžio slankiklį.

Didesniems diegimams (100+ GB arba daug vienu metu įkeliamų failų) pereikite prie S3. Tam nustatykite šiuos kintamuosius **Api** paslaugoje:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Esami failai tome automatiškai nekeliauja. Prieš pakeisdami kintamąjį, nukopijuokite juos į bucket.

### 6. Papildomos funkcijų integracijos

Šie kintamieji įjungia konkrečias funkcijas. Visus juos galima pridėti vėliau per Railway valdymo skydelį. Nustatykite juos **Api** paslaugoje.

| Kintamasis | Įjungiama funkcija |
|------------|--------------------|
| `OPENAI_API_KEY` *arba* `OPENROUTER_API_KEY` | DI pagalbinė paieška ir turinio pasiūlymai |
| `YOUTUBE_API_KEY` | YouTube pamokslų paieška ir įterpimas |
| `PEXELS_KEY` | Atsargų nuotraukų parinkiklis svetainių kūrėjui |
| `VIMEO_TOKEN` | Vimeo pamokslų palaikymas |
| `API_BIBLE_KEY` | Biblijos eilučių paieška pamokose ir turinyje |
| `YOUVERSION_API_KEY` | YouVersion Biblijos integracija |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Naršyklės push pranešimai ([sugeneruokite VAPID raktų porą](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Neprivaloma CRM sinchronizacija naujoms registracijoms |

## Atnaujinimas

Kiekviena paslauga susieta su atitinkama GitHub saugykla. Įkėlimai į `main` šaką `ChurchApps/Api`, `ChurchApps/B1Admin` arba `ChurchApps/B1App` automatiškai sukelia perdiegimą.

Norėdami fiksuoti konkrečią versiją, kiekvienos paslaugos **Branch** nustatyme pakeiskite šaką į žymę arba leidimo šaką. Tai rekomenduojama gamybos aplinkai, nes automatinis diegimas iš `main` perima visus nebaigtus pakeitimus.

## Kainos

Realios mažos bažnyčios (iki 200 narių, nedidelis srautas) kainų intervalai:

| Komponentas | Apytikslė mėnesio kaina |
|-------------|-------------------------|
| Railway bazė | $5 |
| MySQL priedas | $5 + ~$1 saugykla |
| 3 žiniatinklio paslaugų skaičiavimai | $3–10 kartu |
| 1 GB tomas | $0.25 |
| **Iš viso** | **~$15–25 per mėnesį** |

Kainos tiesiškai didėja kartu su srautu, nuotraukų įkėlimais ir duomenų bazės dydžiu. Realų naudojimą Railway rodo projekto skirtuke **Usage**. Nustatykite ten išlaidų limitus, kad apribotumėte savo riziką.

## Trikčių šalinimas

| Simptomas | Galima priežastis | Sprendimas |
|-----------|-------------------|------------|
| Kūrimas nepavyksta su `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks talpyklos montavimo konfliktas | Nustatykite `NIXPACKS_NO_CACHE=true` paveiktoje paslaugoje |
| B1Admin kūrimas nepavyksta su `Missing: @types/...` | Nesinchronizavęs `package-lock.json` | Atsisiųskite naujausią `main` šaką |
| Api diegimas stringa ties „Deploying“ | Sveikatos patikra nepavyksta: `/health` negrąžina 200 | Peržiūrėkite diegimo žurnalus. Dažniausiai trūksta privalomo aplinkos kintamojo |
| B1Admin rodo „check your email“, bet laiškas neatkeliauja | `MAIL_SYSTEM=SMTP` nustatytas, bet prisijungimo duomenys trūksta arba neteisingi | Ištaisykite prisijungimo duomenis arba pašalinkite `MAIL_SYSTEM`, kad išjungtumėte el. paštą |
| Prisijungimas nukreipia į `api.churchapps.org` | `REACT_APP_STAGE` yra `prod` | Nustatykite `REACT_APP_STAGE=custom` B1Admin paslaugoje |
| Visos subdomenų bažnyčios rodo tą patį turinį | `REACT_APP_B1_WEBSITE_URL` neturi `{subdomain}` žymės | Nustatykite, pvz., `https://{subdomain}.yourchurch.org` |
| Pasirinktinis domenas rodo „Application not found“ | DNS dar neatsinaujino arba Railway sertifikatas laukia | Palaukite 5 minutes ir patikrinkite DNS su `dig admin.yourchurch.org` |

Jei susidūrėte su kažkuo, ko nėra šiame sąraše, atidarykite problemą adresu [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) ir pridėkite diegimo žurnalus.

## Susiję straipsniai

- **[Savarankiškas diegimas su Docker](./docker.md)** — Tas pats rinkinys jūsų pačių įrangoje ar VPS serveryje
- **[Pradinis nustatymas](../../getting-started/initial-setup.md)** — Pirmieji žingsniai po bažnyčios sukūrimo
- **[Svetainės pradinis nustatymas](../../b1-admin/website/initial-setup.md)** — Bažnyčios viešosios svetainės konfigūravimas
- **[Aukų nustatymai](../../b1-admin/donations/online-giving-setup.md)** — Stripe arba PayPal prijungimas
- **[Vietinis API nustatymas](../api/local-setup.md)** — Rinkinio paleidimas vietoje kūrimui
- **[API diegimas (AWS)](./apis.md)** — Kaip diegiama oficiali ChurchApps SaaS paslauga
