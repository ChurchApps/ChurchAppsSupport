---
title: "Self-Hosting with Docker"
description: "Nainštalujte súkromný stack B1 Admin, portál členov, API a MySQL na vlastný počítač pomocou Dockeru, potom ho aktualizujte a zálohujte príkazom b1."
---

# Self-Hosting with Docker

<div class="article-intro">

Spustite vlastnú súkromnú inštanciu B1 Admin, člensky portál a webovú stránku B1, API a databázu MySQL na ľubovoľnom počítači s Dockerom — domácom serveri, malom VPS alebo lokálnom zariadení. Jeden príkaz to nainštaluje, jeden príkaz to aktualizuje a každá aktualizácia najprv vytvorí zálohu. Ak nechcete spravovať server vôbec, pozrite si [Self-Hosting on Railway](./railway-template.md) ako spravovanú alternatívu.

</div>

## Rýchly štart

<div class="prereqs">
<h4>Čo potrebujete</h4>

- Počítač s Linuxom (alebo macOS / Windows s WSL alebo Git Bash — pomocný skript `b1` je bashový skript) s [Docker Engine](https://docs.docker.com/engine/install/) a Compose v2 (súčasť Docker Desktop)
- Približne 2 GB RAM a 5 GB miesta na disku
- Pre verejnú stránku: doménové meno nasmerované na tento počítač, s dostupnými portmi 80 a 443

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Ak vynecháte `--domain`, aplikácia sa spustí na `http://localhost`. Inštalátor vytvorí priečinok `b1church`, zapíše súbor `.env` s novo vygenerovanými tajomstvami, stiahne hotové obrazy z GitHub Container Registry a počká, kým API ohlási, že je v poriadku. Nič sa nekompiluje na vašom počítači, takže prvé spustenie trvá minútu alebo dve.

Po dokončení:

1. Otvorte **https://church.example.org/admin** (alebo http://localhost/admin) a kliknite na **Register**. Prvý účet automaticky dostane úlohu správcu servera.
2. Podľa výziev v aplikácii vytvorte svoj prvý kostol. Jeho webová stránka a člensky portál sú dostupné na **https://church.example.org/** hneď po jeho vytvorení.

Všetko beží pod jednou doménou:

| Cesta | Služba |
|------|---------|
| `/` | B1App — webová stránka kostola a člensky portál |
| `/admin` | B1Admin — panel pre zamestnancov |
| `/api` | API, nahrané súbory a websocket pre aktualizácie v reálnom čase |

HTTPS je automatické: priložený proxy server [Caddy](https://caddyserver.com/) získa a obnovuje certifikát Let's Encrypt pre doménu uvedenú v `.env`. Sú vystavené iba porty 80 a 443; databáza je dostupná len vo vnútri siete Docker.

## Príkaz `b1`

Inštalátor vytvorí skript `deploy/b1` vedľa súboru `docker-compose.yml`. Na každodenné používanie je to jediné, čo potrebujete:

| Príkaz | Čo robí |
|---------|--------------|
| `./deploy/b1 upgrade` | Stiahne aktuálne vydanie, vytvorí zálohu, reštartuje a overí, že API je v poriadku |
| `./deploy/b1 upgrade 2026.10.1` | Rovnaké, ale pripnuté na konkrétne vydanie |
| `./deploy/b1 backup` | Uloží snímku databázy, nahraných súborov a `.env` do `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Obnoví snímku (API počas behu zastaví) |
| `./deploy/b1 rollback` | Obnoví najnovšiu zálohu vrátane vydania, na ktorom bola vytvorená |
| `./deploy/b1 status` | Nainštalovaná verzia a stav kontajnerov |
| `./deploy/b1 logs api` | Sleduje záznamy konkrétnej služby |

Vydania sa publikujú ako jeden verzovaný balík, takže tri obrazy sú vždy zosúladené. `B1_VERSION=stable` v `.env` sleduje najnovšie vydanie; ak chcete pripnúť konkrétnu verziu, nastavte ju priamo. Poznámky k vydaniu nájdete v sekcii [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Konfigurácia

Všetky nastavenia sú v `.env` vedľa `docker-compose.yml`. Inštalátor vyplní povinné hodnoty:

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

Po úprave `.env` ju uplatníte príkazom `docker compose up -d`. Webové aplikácie zistia, s ktorým API sa majú spojiť, podľa adresy v prehliadači, takže pri zmene domény stačí aktualizovať `SITE_ADDRESS` a `PUBLIC_URL` a reštartovať — bez nového zostavovania.

:::warning
Uchovávajte `.env` v bezpečí. `ENCRYPTION_KEY` chráni uložené údaje platobných brán a úložiska; záloha bez neho ich nedokáže dešifrovať. `./deploy/b1 backup` z tohto dôvodu obsahuje kópiu tohto kľúča.
:::

### Neskorší prechod na doménu

Ak ste inštalovali na `localhost` a neskôr ju chcete sprístupniť verejne: nasmerujte DNS na tento počítač, v `.env` nastavte `DOMAIN`, `SITE_ADDRESS` (samotná doména) a `PUBLIC_URL` (`https://` + doména), potom spustite `docker compose up -d`. Caddy získa certifikát pri prvej požiadavke.

## E-mail, dary, viacero stránok a integrácie

Tieto funkcie fungujú presne rovnako ako na Railway — rovnaké premenné prostredia, nastavené v `.env` namiesto na paneli Railway:

- **[E-mail / SMTP](./railway-template.md#1-email-highly-recommended)** — návody pre poskytovateľov Resend, Brevo a Gmail
- **[Viacero stránok](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — neobmedzený počet kostolov na jednej inštancii. `/` zobrazuje kostol, ktorého slug je `DEFAULT_CHURCH_SLUG` (prvý kostol je `church`); ďalšie domény nasmerujte na tento počítač a namapujte ich v sekcii **Settings → Domains** v B1Admin
- **[Online dary](./railway-template.md#4-online-giving-stripe--paypal)** — nastavujú sa pre každý kostol v administračnom rozhraní
- **[Voliteľné integrácie](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push notifikácie](#push-notifications)** — `WEB_PUSH_*`; inštalátor ich nechá prázdne, takže push je vypnutý, kým ich nepridáte

Pozvánky a ďalšie e-maily odosielané kostolom sú na vlastnej inštancii povolené automaticky (hostovaná služba ich kvôli ochrane reputácie odosielateľa podmieňuje manuálnou kontrolou).

## Push notifikácie

Webové push notifikácie v prehliadači a mobilnom webe zostávajú vypnuté, kým server nemá pár kľúčov VAPID. Inštalátor ho nevytvára. Kým ho nepridáte, stránka Notifications v mobilnej webovej aplikácii oznamuje, že push pre túto stránku nie je zapnutý.

1. Vygenerujte pár kľúčov. Stačí na to Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Pridajte dve hodnoty do `.env`. `WEB_PUSH_SUBJECT` je voliteľné a je to kontaktná adresa, ktorú vidia push služby:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Uplatnite ich:

   ```bash
   docker compose up -d
   ```

4. Na overenie otvorte v B1Admin **Server Admin → Server Health**. Obidva kľúče Web Push by mali byť zobrazené ako nakonfigurované. Členovia potom môžu notifikácie zapnúť v mobilnej webovej aplikácii.

:::warning
Keď sa členovia prihlásia, ponechajte rovnaké kľúče. Ich zmena zneplatní všetky existujúce odbery a každé zariadenie sa musí znova zaregistrovať.
:::

## Dáta, zálohy a úložisko súborov

Všetky údaje uchovávajú tri pomenované zväzky Docker:

| Zväzok | Obsah |
|--------|----------|
| `b1church_mysql-data` | Všetky schémy databázy |
| `b1church_api-content` | Nahrané súbory — fotografie, dokumenty, obrázky webovej stránky |
| `b1church_caddy-data` | Certifikáty TLS |

`./deploy/b1 backup` zapíše konzistentnú snímku prvých dvoch zväzkov a `.env` do `backups/<timestamp>/`. Naplánujte ju cez cron a skopírujte priečinok mimo tohto počítača:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Pre veľké mediálne knižnice môžete úložisko súborov prepnúť na S3 — nastavte `FILE_STORE=S3` a premenné `AWS_*` popísané v sekcii [File Storage v návode pre Railway](./railway-template.md#5-file-storage). Zálohy databázy neobsahujú objekty S3; na tomto úložisku zapnite verzovanie bucketu.

## Aktualizácia

```bash
./deploy/b1 upgrade
```

Postup: stiahne vydanie, vytvorí zálohu, znovu vytvorí kontajnery, spustí čakajúce migrácie databázy pri štarte API a počká na kontrolu stavu API. Ak čokoľvek zlyhá, zastaví sa a vyzve vás na spustenie `./deploy/b1 rollback`, ktorý obnoví túto zálohu a predchádzajúce vydanie. Migrácie idú len dopredu; vrátenie späť vždy znamená obnovenie snímky.

Ak aktualizujete zo beta súboru compose (ktorý zostavoval obrazy zo zdrojového kódu), postup je rovnaký, keď už máte `.env`: predvolene používal `MYSQL_ROOT_PASSWORD=churchapps`, takže toto heslo uveďte v `.env` spolu s `PUBLIC_URL` a `SITE_ADDRESS`, nahraďte `docker-compose.yml` a `deploy/` aktuálnymi súbormi a spustite `./deploy/b1 upgrade`.

## Zostavenie zo zdrojového kódu

Vývojári môžu obrazy zostaviť lokálne namiesto ich sťahovania:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` a `B1APP_CONTEXT` v `.env` nasmerujú zostavenia na lokálne kópie (napr. `../Api`) alebo na git referenciu.

## Riešenie problémov

| Príznak | Pravdepodobná príčina | Riešenie |
|---------|--------------|-----|
| Kontajner `api` sa neustále reštartuje | zlyhanie migrácie alebo nesprávne heslo k databáze | `./deploy/b1 logs api` — migrácia vypíše, ktorý modul zlyhal |
| `api` zapisuje „ENCRYPTION_KEY must be exactly 32 characters“ | kľúč v `.env` bol upravený ručne alebo skrátený | obnovte pôvodný 32-znakový kľúč (nový vygenerujte, len ak ešte nie sú uložené žiadne údaje) |
| Prehliadač zobrazuje upozornenie na certifikát | DNS ešte nesmeruje sem, alebo sú porty 80/443 blokované | opravte DNS alebo firewall; Caddy sa pokúsi znova sám |
| `/` zobrazuje panel namiesto webovej stránky | ešte neexistuje kostol, alebo `DEFAULT_CHURCH_SLUG` nesedí | vytvorte kostol alebo nastavte slug v **Settings → Church** |
| „Check your email“, ale e-mail nepríde | `MAIL_SYSTEM=SMTP` s nesprávnymi údajmi | opravte údaje, alebo zrušte `MAIL_SYSTEM` a vypnite e-maily |
| Mobilná webová aplikácia hlási, že push notifikácie nie sú zapnuté | na serveri chýbajú kľúče VAPID | pridajte ich podľa návodu v sekcii [Push notifikácie](#push-notifications) |
| Chat / živé funkcie ticho | websocket je blokovaný iným proxy pred ním | socket beží na `/api/` na rovnakom porte; povoľte hlavičky `Upgrade` |
| `install` odmietne: „database volume already exists“ | zvyšky z predchádzajúcej inštalácie | `docker compose down -v` na vymazanie, alebo zapíšte `.env` a použite `upgrade` |

Stále máte problém? Otvorte issue na [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) a priložte výstup príkazu `./deploy/b1 logs`.

## Súvisiace články

- **[Self-Hosting on Railway](./railway-template.md)** — alternatíva spravovaného hostingu a spoločné návody na konfiguráciu po nasadení
- **[Initial Setup](../../getting-started/initial-setup.md)** — prvé kroky po vytvorení kostola
- **[Local API Setup](../api/local-setup.md)** — priame spustenie celého stacku na vývoj
