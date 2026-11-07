---
title: "Savarankiškas diegimas naudojant Docker"
description: "Įdiekite privatų B1 Admin, narių portalo, API ir MySQL steką per Docker, tada atnaujinkite ir kurkite atsargines kopijas su b1 komanda."
---

# Savarankiškas diegimas naudojant Docker

<div class="article-intro">

Paleiskite savo privačią B1 Admin, B1 narių portalo ir svetainės, API bei MySQL duomenų bazės kopiją bet kuriame kompiuteryje su Docker – namų serveryje, mažame VPS ar vietinėje įrangoje. Diegimui pakanka vienos komandos, atnaujinimui – vienos komandos, o prieš kiekvieną atnaujinimą automatiškai sukuriama atsarginė kopija. Jei nenorite patys valdyti serverio, žr. [Savarankiškas diegimas Railway platformoje](./railway-template.md) – tai valdomas alternatyvus variantas.

</div>

## Greitasis startas

<div class="prereqs">
<h4>Ko jums reikės</h4>

- Linux kompiuteris (arba macOS / Windows su WSL ar Git Bash – `b1` pagalbinė priemonė yra bash scenarijus) su [Docker Engine](https://docs.docker.com/engine/install/) ir Compose v2 (įtrauktas į Docker Desktop)
- Apie 2 GB RAM ir 5 GB disko vietos
- Viešai veikiančiai svetainei: domeno vardas, nukreiptas į kompiuterį, ir pasiekiami 80 ir 443 prievadai

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Jei praleisite `--domain`, programa veiks adresu `http://localhost`. Diegimo programa sukuria aplanką `b1church`, įrašo `.env` failą su naujai sugeneruotais slaptais raktais, atsisiunčia paruoštus vaizdus iš GitHub Container Registry ir laukia, kol API pranešs, kad veikia tinkamai. Niekas nesikompiliuoja jūsų kompiuteryje, todėl pirmasis paleidimas trunka vieną ar dvi minutes.

Kai diegimas baigtas:

1. Atidarykite `https://church.example.org/admin` (arba http://localhost/admin) ir spustelėkite **Register**. Pirmoji paskyra automatiškai tampa serverio administratoriaus paskyra.
2. Vykdykite programos nurodymus ir sukurkite pirmąją bažnyčią. Jos svetainė ir narių portalas iš karto pasiekiami adresu `https://church.example.org/`, kai tik bažnyčia sukuriama.

Viskas veikia po vienu domenu:

| Kelias | Paslauga |
|--------|----------|
| `/` | B1App – bažnyčios svetainė ir narių portalas |
| `/admin` | B1Admin – darbuotojų valdymo skydelis |
| `/api` | API, įkeltos failai ir tiesioginių atnaujinimų websocket |

HTTPS įjungiamas automatiškai: įtaisytasis [Caddy](https://caddyserver.com/) tarpinis serveris gauna ir atnaujina Let's Encrypt sertifikatą `.env` faile nurodytam domenui. Išorėje atviri tik 80 ir 443 prievadai; duomenų bazė pasiekiama tik iš vidinio Docker tinklo.

## Komanda `b1`

Diegimo programa šalia `docker-compose.yml` palieka `deploy/b1` scenarijų. Kasdienai jums reikės tik jo:

| Komanda | Ką daro |
|---------|---------|
| `./deploy/b1 upgrade` | Atsisiunčia dabartinę versiją, sukuria atsarginę kopiją, paleidžia iš naujo ir patikrina, ar API veikia tinkamai |
| `./deploy/b1 upgrade 2026.10.1` | Tas pats, bet fiksuojama konkreti versija |
| `./deploy/b1 backup` | Įrašo duomenų bazės, įkeltų failų ir `.env` momentinę kopiją į `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Atkuria momentinę kopiją (kol vyksta atkūrimas, API sustabdomas) |
| `./deploy/b1 rollback` | Atkuria naujausią atsarginę kopiją kartu su versija, kuriai ji buvo sukurta |
| `./deploy/b1 status` | Įdiegta versija ir konteinerių būsena |
| `./deploy/b1 logs api` | Seka konkrečios paslaugos žurnalus |

Versijos publikuojamos kaip vienas paketas su numeriu, todėl trys vaizdai visada atitinka vienas kitą. `B1_VERSION=stable` faile `.env` seka naujausią versiją; nurodykite konkrečią versiją, jei norite ją fiksuoti. Informacija apie išleidimus pateikiama [B1Admin išleidimuose](https://github.com/ChurchApps/B1Admin/releases).

## Konfigūracija

Visi nustatymai saugomi `.env` faile šalia `docker-compose.yml`. Diegimo programa užpildo privalomus:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Pakeitę `.env` failą, taikykite pakeitimus komanda `docker compose up -d`. Žiniatinklio programos pačios nustato, su kuria API jungtis, pagal adresą naršyklėje, todėl pakeitus domeną pakanka atnaujinti `SITE_ADDRESS` ir `PUBLIC_URL` ir iš naujo paleisti – kurti iš naujo nereikia.

:::warning
Saugokite `.env` failą. `ENCRYPTION_KEY` apsaugo išsaugotus mokėjimų vartų ir saugyklos prisijungimo duomenis; atsarginė kopija be šio rakto negali jų iššifruoti. `./deploy/b1 backup` dėl to įtraukia šio rakto kopiją.
:::

### Vėliau perkėlimas į domeną

Jei diegėte `localhost` adresu ir vėliau norite viešos svetainės: nukreipkite DNS į kompiuterį, `.env` faile nustatykite `DOMAIN`, `SITE_ADDRESS` (tik domeno vardą) ir `PUBLIC_URL` (`https://` + domenas), tada paleiskite `docker compose up -d`. Caddy gaus sertifikatą su pirmąja užklausa.

## El. paštas, aukojimai, kelios svetainės ir integracijos

Šie dalykai veikia lygiai taip pat kaip Railway platformoje – tie patys aplinkos kintamieji, tik nustatomi `.env` faile, o ne Railway valdymo skydelyje:

- **[El. paštas / SMTP](./railway-template.md#1-email-highly-recommended)** – Resend, Brevo ir Gmail paslaugų teikėjų vadovai
- **[Kelios svetainės](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** – neribotas bažnyčių skaičius viename egzemplioriuje. `/` rodo bažnyčią, kurios slug yra `DEFAULT_CHURCH_SLUG` (pirmoji bažnyčia turi `church`); papildomus domenus nukreipkite į serverį ir priskirkite juos B1Admin skiltyje **Settings → Domains**
- **[Internetinis aukojimas](./railway-template.md#4-online-giving-stripe--paypal)** – konfigūruojamas kiekvienai bažnyčiai administravimo sąsajoje
- **[Papildomos integracijos](./railway-template.md#6-optional-feature-integrations)** – `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push pranešimai](#push-notifications)** – `WEB_PUSH_*`; diegimo programa šiuos laukus palieka tuščius, todėl push pranešimai išjungti, kol jų nepridėsite

Kvietimai ir kitas bažnyčios siunčiamas el. paštas savarankiško diegimo egzemplioriuje įjungiami automatiškai (paslaugoje, kurią teikia kiti, tai daroma tik po rankinės peržiūros, siekiant apsaugoti siuntėjo reputaciją).

## Push pranešimai

Naršyklės ir mobiliųjų žiniatinklio push pranešimai išjungti, kol serveryje nėra VAPID raktų poros. Diegimo programa jos nesukuria. Kol jos nepridėsite, mobiliosios žiniatinklio programos pranešimų puslapyje bus rodoma, kad svetainėje push pranešimai neįjungti.

1. Sugeneruokite raktų porą. Tam reikia tik Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Įrašykite abi reikšmes į `.env`. `WEB_PUSH_SUBJECT` yra neprivalomas – tai kontaktinis adresas, kurį mato push paslaugos:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Pritaikykite pakeitimus:

   ```bash
   docker compose up -d
   ```

4. Norėdami patikrinti, B1Admin atidarykite **Server Admin → Server Health**. Abu Web Push raktai turi būti rodomi kaip sukonfigūruoti. Tada nariai gali įjungti pranešimus mobiliosios žiniatinklio programoje.

:::warning
Kai nariai jau užsiregistravo, išlaikykite tuos pačius raktus. Pakeitus raktus, visos esamos prenumeratos nustoja galioti ir kiekvienas įrenginys turės užsiregistruoti iš naujo.
:::

## Duomenys, atsarginės kopijos ir failų saugykla

Visa būsena saugoma trijuose pavadintuose Docker tomuose:

| Tomas | Turinys |
|-------|---------|
| `b1church_mysql-data` | Visos duomenų bazių schemos |
| `b1church_api-content` | Įkelti failai – nuotraukos, dokumentai, svetainės vaizdai |
| `b1church_caddy-data` | TLS sertifikatai |

`./deploy/b1 backup` įrašo nuoseklią pirmųjų dviejų tomų momentinę kopiją ir `.env` į `backups/<timestamp>/`. Suplanuokite ją su cron ir nukopijuokite aplanką į vietą, kuri nėra tame pačiame kompiuteryje:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Dideliems medijos failų kiekiams galite perjungti failų saugyklą į S3 – nustatykite `FILE_STORE=S3` ir `AWS_*` kintamuosius, aprašytus [Railway vadovo skyriuje apie failų saugyklą](./railway-template.md#5-file-storage). Duomenų bazės atsarginėse kopijose S3 objektų nėra; tiems objektams įjunkite bucket versioning.

## Atnaujinimas

```bash
./deploy/b1 upgrade
```

Eiga: atsisiunčiama versija, sukuriama atsarginė kopija, konteineriai sukuriami iš naujo, API paleidimo metu vykdomos laukiančios duomenų bazės migracijos ir laukiama API sveikatos patikros. Jei kas nors nepavyksta, procesas sustoja ir praneša paleisti `./deploy/b1 rollback`, kuris atkuria tą atsarginę kopiją ir ankstesnę versiją. Migracijos vyksta tik į priekį, todėl grąžinti atgal visada reiškia atkurti momentinę kopiją.

Jei atnaujinate iš beta `compose` failo (tokio, kuris vaizdus kūrė iš pradinio kodo), procesas tas pats, kai jau turite `.env`: jame pagal nutylėjimą buvo `MYSQL_ROOT_PASSWORD=churchapps`, todėl įrašykite tai į `.env` kartu su `PUBLIC_URL` ir `SITE_ADDRESS`, pakeiskite `docker-compose.yml` ir `deploy/` dabartiniais failais ir paleiskite `./deploy/b1 upgrade`.

## Kūrimas iš pradinio kodo

Kūrėjai gali kurti vaizdus vietoje, o ne juos atsisiųsti:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` faile `API_CONTEXT` ir `B1APP_CONTEXT` nukreipia kūrimą į vietines kopijas (pvz., `../Api`) arba į git nuorodą.

## Trikčių šalinimas

| Simptomas | Galima priežastis | Sprendimas |
|-----------|-------------------|------------|
| `api` konteineris nuolat paleidžiamas iš naujo | migracijos klaida arba neteisingas duomenų bazės slaptažodis | `./deploy/b1 logs api` – migracija parodys, kuris modulis nepavyko |
| `api` žurnale rašoma „ENCRYPTION_KEY must be exactly 32 characters“ | `.env` rankiniu būdu pakeistas arba sutrumpintas raktas | atkurkite originalų 32 simbolių raktą (naują generuokite tik tada, jei dar neišsaugota jokių prisijungimo duomenų) |
| Naršyklėje rodomas sertifikato įspėjimas | DNS dar nenukreiptas į šį kompiuterį arba užblokuoti 80/443 prievadai | ištaisykite DNS arba ugniasienę; Caddy bandys iš naujo savarankiškai |
| `/` rodo valdymo skydelį, o ne svetainę | bažnyčios dar nėra arba `DEFAULT_CHURCH_SLUG` nesutampa | sukurkite bažnyčią arba nustatykite slug skiltyje **Settings → Church** |
| Rodomas „Check your email“, bet laiškas neatkeliauja | `MAIL_SYSTEM=SMTP` su neteisingais prisijungimo duomenimis | ištaisykite prisijungimo duomenis arba pašalinkite `MAIL_SYSTEM`, kad išjungtumėte el. paštą |
| Mobiliosios žiniatinklio programos tekste sakoma, kad push pranešimai neįjungti | serveryje nėra VAPID raktų | pridėkite juos, kaip aprašyta skyriuje [Push pranešimai](#push-notifications) |
| Pokalbiai / tiesioginės funkcijos neveikia | websocket užblokuotas kito tarpinio serverio, esančio priekyje | socket veikia `/api/` kelyje per tą patį prievadą; leiskite `Upgrade` antraštes |
| `install` atsisako su „database volume already exists“ | liekanos iš ankstesnio diegimo | `docker compose down -v`, kad viską pašalintumėte, arba įrašykite `.env` ir naudokite `upgrade` |

Vis dar nepavyksta? Sukurkite problemą adresu [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) ir pridėkite `./deploy/b1 logs` išvestį.

## Susiję straipsniai

- **[Savarankiškas diegimas Railway platformoje](./railway-template.md)** – valdomas talpinimo variantas ir bendri diegimo po paleidimo konfigūracijos vadovai
- **[Pradinis sąrankos](../../getting-started/initial-setup.md)** – pirmieji žingsniai sukūrus bažnyčią
- **[Vietinio API sąranka](../api/local-setup.md)** – tiesioginis visos sistemos paleidimas kūrimui
