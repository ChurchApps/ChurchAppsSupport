---
title: "Samostojna namestitev z Dockerjem"
description: "Namestite zasebni B1 Admin, portal za člane, API in MySQL na svoj računalnik z Dockerjem, nato pa posodabljajte in varnostno kopirajte z ukazom b1."
---

# Samostojna namestitev z Dockerjem

<div class="article-intro">

Zaženite lastno zasebno različico programa B1 Admin, spletnega mesta in portala za člane B1, API-ja in podatkovne baze MySQL na kateri koli napravi z Dockerjem: domačem strežniku, majhnem VPS-u ali strojni opremi v lastnih prostorih. Namestitev izvedete z enim ukazom, posodobitev z enim ukazom, pri čemer se vsaka posodobitev najprej varnostno kopira. Če ne želite sami upravljati strežnika, si oglejte [Samostojna namestitev na Railway](./railway-template.md) za upravljano alternativo.

</div>

## Hitri začetek

<div class="prereqs">
<h4>Kaj potrebujete</h4>

- Linux računalnik (ali macOS / Windows z WSL ali Git Bash, saj je pomočnik `b1` skripta bash) z [Docker Engine](https://docs.docker.com/engine/install/) in Compose v2 (vključen v Docker Desktop)
- Približno 2 GB RAM-a in 5 GB prostora na disku
- Za javno spletno mesto: domensko ime, usmerjeno na napravo, z dostopnimi vrati 80 in 443

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Izpustite `--domain`, če želite zagnati na `http://localhost`. Namestitveni program ustvari mapo `b1church`, zapiše datoteko `.env` s pravkar ustvarjenimi skrivnostmi, prenese pripravljene slike iz GitHub Container Registry in počaka, dokler API ne poroča, da je zdrav. Na vašem računalniku se nič ne gradi, zato prvi zagon traja minuto ali dve.

Ko je namestitev končana:

1. Odprite `https://church.example.org/admin` (ali http://localhost/admin) in kliknite **Registriraj se**. Prvi račun samodejno postane skrbnik strežnika.
2. Sledite navodilom v aplikaciji za ustvarjanje prve cerkve. Njeno spletno mesto in portal za člane sta na voljo na `https://church.example.org/`, takoj ko je cerkev ustvarjena.

Vse deluje za eno domeno:

| Pot | Storitev |
|-----|----------|
| `/` | B1App — spletno mesto cerkve in portal za člane |
| `/admin` | B1Admin — nadzorna plošča za osebje |
| `/api` | API, naložene datoteke in websocket za žive posodobitve |

HTTPS je samodejen: vgrajeni posrednik [Caddy](https://caddyserver.com/) pridobi in obnavlja certifikat Let's Encrypt za domeno v `.env`. Izpostavljeni sta samo vrata 80 in 443; do podatkovne baze je mogoče dostopati samo znotraj omrežja Docker.

## Ukaz `b1`

Namestitveni program pusti skripto `deploy/b1` poleg `docker-compose.yml`. Za vsakodnevno uporabo potrebujete samo to:

| Ukaz | Kaj naredi |
|------|------------|
| `./deploy/b1 upgrade` | Prenese trenutno izdajo, naredi varnostno kopijo, ponovno zažene in preveri, ali je API zdrav |
| `./deploy/b1 upgrade 2026.10.1` | Enako, vendar pripeto na določeno izdajo |
| `./deploy/b1 backup` | Posname podatkovno bazo, naložene datoteke in `.env` v `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Obnovi posnetek (API se med tem ustavi) |
| `./deploy/b1 rollback` | Obnovi najnovejšo varnostno kopijo, vključno z izdajo, na kateri je bila narejena |
| `./deploy/b1 status` | Nameščena različica in stanje vsebnikov |
| `./deploy/b1 logs api` | Spremljaj dnevnike storitve |

Izdaje so objavljene kot en različen paket, tako da so tri slike vedno usklajene. `B1_VERSION=stable` v `.env` sledi najnovejši izdaji; nastavite določeno različico, če jo želite pripeti. Opombe o izdajah so na voljo pod [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Konfiguracija

Vse nastavitve so v `.env` poleg `docker-compose.yml`. Namestitveni program izpolni obvezne:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # kar Caddy streže; http://localhost za lokalno namestitev
PUBLIC_URL=https://church.example.org    # kako brskalniki in e-poštna sporočila dosežejo spletno mesto
MYSQL_ROOT_PASSWORD=…                    # ustvarjeno
JWT_SECRET=…                             # ustvarjeno
ENCRYPTION_KEY=…                         # ustvarjeno, natanko 32 znakov — ne spreminjajte ga po shranjevanju poverilnic

# E-pošta — zelo priporočeno; brez nje člani ne morejo ponastaviti svojih gesel
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Po urejanju `.env` jih uveljavite z `docker compose up -d`. Spletne aplikacije same ugotovijo, s katerim API-jem naj komunicirajo, iz naslova v brskalniku, zato je ob spremembi domene treba posodobiti samo `SITE_ADDRESS` in `PUBLIC_URL` ter znova zagnati storitve. Ponovna gradnja ni potrebna.

:::warning
Shranite `.env` na varno. `ENCRYPTION_KEY` ščiti shranjene poverilnice plačilnih prehodov in shranjevanja; varnostna kopija brez njega jih ne more dešifrirati. `./deploy/b1 backup` zaradi tega vključuje kopijo.
:::

### Kasnejša preselitev na domeno

Če ste namestili na `localhost` in jo kasneje želite javno: usmerite DNS na napravo, v `.env` nastavite `DOMAIN`, `SITE_ADDRESS` (goli domena) in `PUBLIC_URL` (`https://` + domena), nato zaženite `docker compose up -d`. Caddy pridobi certifikat ob prvi zahtevi.

## E-pošta, darovanje, več spletnih mest in integracije

Ti delujejo povsem enako kot na Railway: iste okoljske spremenljivke, vendar nastavljene v `.env` namesto na nadzorni plošči Railway:

- **[E-pošta / SMTP](./railway-template.md#1-email-highly-recommended)** — navodila za ponudnike Resend, Brevo in Gmail
- **[Več spletnih mest](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — neomejeno število cerkva na namestitev. `/` streže cerkev, katere slug je `DEFAULT_CHURCH_SLUG` (prva cerkev je `church`). Dodatne domene usmerite na napravo in jih preslikajte pod **Nastavitve → Domene** v B1Admin.
- **[Spletno darovanje](./railway-template.md#4-online-giving-stripe--paypal)** — konfigurirano za vsako cerkev v skrbniškem vmesniku
- **[Izbirne integracije](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Potisna obvestila](#push-notifications)** — `WEB_PUSH_*`; namestitveni program jih pusti prazne, zato je potisno obveščanje izklopljeno, dokler jih ne dodate

Vabila in druga e-poštna sporočila, ki jih pošilja cerkev, so na samostojni namestitvi samodejno omogočena. Gostovana storitev jih zaradi zaščite ugleda pošiljatelja zadrži za ročni pregled.

## Potisna obvestila

Potisna obvestila v brskalniku in mobilnem spletu ostanejo izklopljena, dokler strežnik nima para ključev VAPID. Namestitveni program ga ne ustvari. Dokler ga ne dodate, na strani Obvestila v mobilni spletni aplikaciji piše, da potisna obvestila za to spletno mesto niso vklopljena.

1. Ustvarite par ključev. Potrebujete samo Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Dodajte dve vrednosti v `.env`. `WEB_PUSH_SUBJECT` je izbirna in je kontaktni naslov, ki ga vidijo potisne storitve:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Uveljavite jih:

   ```bash
   docker compose up -d
   ```

4. Za preverjanje odprite **Strežniški skrbnik → Stanje strežnika** v B1Admin. Oba ključa Web Push bi morala biti označena kot nastavljena. Člani nato lahko obvestila vklopijo v mobilni spletni aplikaciji.

:::warning
Ko so se člani prijavili, ohranite iste ključe. Če jih spremenite, bo vsaka obstoječa naročnina neveljavna in vsako napravo bo treba znova registrirati.
:::

## Podatki, varnostne kopije in shranjevanje datotek

Tri poimenovani nosilci Docker hranijo vse stanje:

| Nosilec | Vsebina |
|---------|---------|
| `b1church_mysql-data` | Vse sheme podatkovne baze |
| `b1church_api-content` | Naložene datoteke — fotografije, dokumenti, slike spletnega mesta |
| `b1church_caddy-data` | Certifikati TLS |

`./deploy/b1 backup` zapiše dosleden posnetek prvih dveh nosilcev in `.env` v `backups/<timestamp>/`. Načrtujte ga s cronom in kopirajte mapo na drugo napravo:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Za velike knjižnice medijev lahko shranjevanje datotek preklopite na S3. Nastavite `FILE_STORE=S3` ter spremenljivke `AWS_*`, opisane v [razdelku o shranjevanju datotek v vodniku za Railway](./railway-template.md#5-file-storage). Varnostne kopije podatkovne baze ne vključujejo predmetov S3, zato tam omogočite različice vedra.

## Posodabljanje

```bash
./deploy/b1 upgrade
```

Po vrsti: prenese izdajo, naredi varnostno kopijo, ponovno ustvari vsebnike, ob zagonu API-ja izvede morebitne čakajoče migracije podatkovne baze in počaka na preverjanje stanja API-ja. Če kaj ne uspe, se ustavi in vas pozove, naj zaženete `./deploy/b1 rollback`, ki obnovi to varnostno kopijo in prejšnjo izdajo. Migracije so samo naprej, zato povrnitev vedno pomeni obnovo posnetka.

Posodobitev iz beta datoteke compose (tiste, ki je gradila slike iz izvorne kode) poteka enako, ko imate `.env`. Privzeto je uporabljala `MYSQL_ROOT_PASSWORD=churchapps`, zato to vnesite v `.env` skupaj z `PUBLIC_URL` in `SITE_ADDRESS`, zamenjajte `docker-compose.yml` in `deploy/` z aktualnimi datotekami ter zaženite `./deploy/b1 upgrade`.

## Gradnja iz izvorne kode

Razvijalci lahko slike gradijo lokalno namesto da jih prenesejo:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` in `B1APP_CONTEXT` v `.env` kažeta gradnje na lokalne kopije (npr. `../Api`) ali git referenco.

## Odpravljanje težav

| Simptom | Verjeten vzrok | Rešitev |
|---------|----------------|---------|
| Vsebnik `api` se ponavlja v zanki | napaka pri migraciji ali napačno geslo podatkovne baze | `./deploy/b1 logs api` — migracija izpiše, kateri modul je odpovedal |
| `api` v dnevniku piše "ENCRYPTION_KEY must be exactly 32 characters" | ročno urejen ali okrnjen ključ v `.env` | obnovite izvirni 32-znakovni ključ (novega ustvarite samo, če še ni shranjenih poverilnic) |
| Brskalnik prikaže opozorilo o certifikatu | DNS še ne kaže sem ali so vrata 80/443 blokirana | popravite DNS ali požarni zid; Caddy poskuša znova samodejno |
| `/` prikazuje nadzorno ploščo namesto spletnega mesta | še ni cerkve ali se `DEFAULT_CHURCH_SLUG` ne ujema | ustvarite cerkev ali nastavite slug v **Nastavitve → Cerkev** |
| "Preverite svojo e-pošto", vendar ne prispe nobeno sporočilo | `MAIL_SYSTEM=SMTP` z napačnimi poverilnicami | popravite poverilnice ali odstranite `MAIL_SYSTEM`, da izklopite e-pošto |
| Mobilna spletna aplikacija pravi, da potisna obvestila niso vklopljena | na strežniku ni ključev VAPID | dodajte jih, kot je opisano v [Potisna obvestila](#push-notifications) |
| Klepet ali žive funkcije ne delujejo | websocket blokira drug posrednik pred tem | vtičnica je na `/api/` na istih vratih; dovolite glave `Upgrade` |
| `install` zavrne: "database volume already exists" | ostanki prejšnje namestitve | `docker compose down -v` za brisanje ali zapišite `.env` in uporabite `upgrade` |

Še vedno ste zataknjeni? Odprite težavo na [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) z izpisom `./deploy/b1 logs`.

## Sorodni članki

- **[Samostojna namestitev na Railway](./railway-template.md)**: alternativa upravljanega gostovanja, skupaj z vodniki za skupno konfiguracijo po namestitvi
- **[Začetna nastavitev](../../getting-started/initial-setup.md)**: prvi koraki po ustvarjenju cerkve
- **[Lokalna nastavitev API-ja](../api/local-setup.md)**: neposredni zagon sklada za razvoj
