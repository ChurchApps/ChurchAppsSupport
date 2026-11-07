---
title: "Önálló üzemeltetés Dockerrel"
---

# Önálló üzemeltetés Dockerrel

<div class="article-intro">

Futtassa saját, privát példányát a B1 Adminból, a B1 tagi portálból és weboldalból, az API-ból és egy MySQL-adatbázisból bármely Dockert futtató gépen: otthoni szerveren, kis VPS-en vagy helyi szervergépen. Egy paranccsal telepítheti, egy paranccsal frissítheti, és minden frissítés előtt készül biztonsági mentés. Ha egyáltalán nem szeretne szervert kezelni, a felügyelt alternatívát a [Önálló üzemeltetés Railway-en](./railway-template) cikkben találja.

</div>

## Gyors kezdés

<div class="prereqs">
<h4>Amire szüksége lesz</h4>

- Linux gép (vagy macOS / Windows WSL-lel vagy Git Bash-sel – a `b1` segédprogram bash-szkript), telepített [Docker Engine](https://docs.docker.com/engine/install/) és Compose v2 (a Docker Desktop tartalmazza)
- Körülbelül 2 GB RAM és 5 GB szabad lemezterület
- Nyilvános webhelyhez: a gépre mutató domainnév, és a 80-as és 443-as port elérhető

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

A `--domain` elhagyásával a rendszer a `http://localhost` címen fut. A telepítő létrehoz egy `b1church` mappát, újonnan generált titkos kulcsokkal `.env` fájlt ír, lehúzza a kész image-eket a GitHub Container Registryből, és addig vár, amíg az API egészségesnek nem jelenti magát. Semmi nem épül a saját gépén, ezért az első indítás egy-két percet vesz igénybe.

A telepítés befejezése után:

1. Nyissa meg a **https://church.example.org/admin** címet (vagy a http://localhost/admin címet), és kattintson a **Regisztráció** gombra. Az első fiók automatikusan szerveradminisztrátor lesz.
2. Kövesse az alkalmazáson belüli utasításokat az első gyülekezet létrehozásához. Weboldala és tagi portálja a **https://church.example.org/** címen élő lesz, amint a gyülekezet létrejön.

Minden egyetlen domainen keresztül érhető el:

| Útvonal | Szolgáltatás |
|------|---------|
| `/` | B1App – gyülekezeti weboldal és tagi portál |
| `/admin` | B1Admin – munkatársi irányítópult |
| `/api` | API, feltöltött fájlok és az élő frissítések websocketje |

A HTTPS automatikus: a mellékelt [Caddy](https://caddyserver.com/) proxy beszerzi és megújítja a `.env` fájlban megadott domainhez tartozó Let's Encrypt tanúsítványt. Csak a 80-as és 443-as port van kitéve; az adatbázis kizárólag a Docker-hálózaton belülről érhető el.

## A `b1` parancs

A telepítő a `docker-compose.yml` mellé egy `deploy/b1` szkriptet helyez el. Ez az, amire a mindennapokban szüksége lesz:

| Parancs | Mit csinál |
|---------|--------------|
| `./deploy/b1 upgrade` | Lehúzza az aktuális kiadást, biztonsági mentést készít, újraindít, és ellenőrzi, hogy az API egészséges-e |
| `./deploy/b1 upgrade 2026.10.1` | Ugyanaz, de egy adott kiadáshoz rögzítve |
| `./deploy/b1 backup` | Pillanatfelvételt készít az adatbázisról, a feltöltött fájlokról és a `.env` fájlról a `backups/<időbélyeg>/` mappába |
| `./deploy/b1 restore backups/<időbélyeg>` | Visszaállít egy pillanatfelvételt (futtatás közben az API leáll) |
| `./deploy/b1 rollback` | Visszaállítja a legutóbbi biztonsági mentést, beleértve azt a kiadást is, amelyen készült |
| `./deploy/b1 status` | A telepített verzió és a konténerek állapota |
| `./deploy/b1 logs api` | Egy szolgáltatás naplóinak követése |

A kiadások egyetlen, verziószámozott csomagként jelennek meg, így a három image mindig egyezik. A `.env` fájlban a `B1_VERSION=stable` a legfrissebb kiadást követi; egy konkrét verzió megadásával rögzítheti. A kiadási jegyzetek a [B1Admin kiadások](https://github.com/ChurchApps/B1Admin/releases) alatt találhatók.

## Konfiguráció

Minden beállítás a `docker-compose.yml` melletti `.env` fájlban található. A telepítő kitölti a kötelezőket:

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

A `.env` módosítása után a `docker compose up -d` paranccsal alkalmazhatja. A webalkalmazások a böngészőben megadott címből határozzák meg, melyik API-hoz csatlakozzanak, ezért a domain megváltoztatásához elég a `SITE_ADDRESS` és a `PUBLIC_URL` frissítése, majd az újraindítás – újraépítésre nincs szükség.

:::warning
Őrizze biztonságban a `.env` fájlt. Az `ENCRYPTION_KEY` védi a tárolt fizetési átjáró- és tárhely-hitelesítő adatokat; kulcs nélkül egy biztonsági mentés nem fejthető vissza. A `./deploy/b1 backup` parancs ezért másolatot is készít róla.
:::

### Későbbi áttérés domainre

Ha `localhostra` telepített, és később nyilvánossá szeretné tenni: mutasson a DNS-rekord a géphez, állítsa be a `DOMAIN`, a `SITE_ADDRESS` (a puszta domain) és a `PUBLIC_URL` (`https://` + domain) értékeket a `.env` fájlban, majd futtassa a `docker compose up -d` parancsot. A Caddy az első kérésnél beszerzi a tanúsítványt.

## E-mail, adakozás, több webhely és integrációk

Ezek pontosan úgy működnek, mint a Railway-en: ugyanazok a környezeti változók, de a `.env` fájlban állítja be őket a Railway irányítópult helyett:

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** – részletes útmutatók a Resend, a Brevo és a Gmail szolgáltatókhoz
- **[Több webhely](./railway-template#3-multi-site-multiple-churches-on-one-instance)** – példányonként korlátlan számú gyülekezet. A `/` a `DEFAULT_CHURCH_SLUG` azonosítójú gyülekezetet szolgálja ki (az első gyülekezet azonosítója `church`); a további domainek a géphez mutassanak, és a B1Adminban a **Beállítások → Domainek** menüpontban rendelje őket hozzá
- **[Online adakozás](./railway-template#4-online-giving-stripe--paypal)** – gyülekezetenként, az adminisztrációs felületen állítható be
- **[Opcionális integrációk](./railway-template#6-optional-feature-integrations)** – `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push-értesítések](#push-notifications)** – `WEB_PUSH_*`; a telepítő ezeket üresen hagyja, ezért a push-értesítések addig ki vannak kapcsolva, amíg hozzá nem adja őket

A gyülekezet által küldött meghívók és egyéb e-mailek egy saját üzemeltetésű példányon automatikusan engedélyezve vannak. (A felügyelt szolgáltatás ezeket kézi felülvizsgálathoz köti, hogy védje a küldő hírnevét.)

## Push-értesítések

A böngészős és a mobil webes push-értesítések addig vannak kikapcsolva, amíg a szerveren nincs VAPID-kulcspár. A telepítő nem hoz létre ilyet. Amíg nem adja hozzá, a mobil webalkalmazás Értesítések oldala jelzi, hogy a push nincs bekapcsolva a webhelyen.

1. Generáljon egy kulcspárt. Ehhez csak a Docker szükséges:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Adja hozzá a két értéket a `.env` fájlhoz. A `WEB_PUSH_SUBJECT` opcionális; ez az a kapcsolattartási cím, amelyet a push-szolgáltatók látnak:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Alkalmazza őket:

   ```bash
   docker compose up -d
   ```

4. A megerősítéshez nyissa meg a B1Adminban a **Szerveradminisztráció → Szerver állapota** menüpontot. Mindkét Web Push-kulcsnak „beállítva” állapotot kell mutatnia. Ezután a tagok a mobil webalkalmazásból bekapcsolhatják az értesítéseket.

:::warning
Miután a tagok már feliratkoztak, tartsa meg ugyanazokat a kulcsokat. Ha megváltoztatja őket, minden meglévő feliratkozás érvénytelenné válik, és minden eszköznek újra regisztrálnia kell magát.
:::

## Adatok, biztonsági mentések és fájltárolás

Három elnevezett Docker-kötet tárolja az összes adatot:

| Kötet | Tartalom |
|--------|----------|
| `b1church_mysql-data` | Az összes adatbázis-séma |
| `b1church_api-content` | Feltöltött fájlok – fotók, dokumentumok, weboldal-képek |
| `b1church_caddy-data` | TLS-tanúsítványok |

A `./deploy/b1 backup` parancs az első kettőről, valamint a `.env` fájlról egy konzisztens pillanatfelvételt ír a `backups/<időbélyeg>/` mappába. Ütemezze cron-nal, és a mappát másolja át a gépen kívülre:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Nagy médiakönyvtárak esetén a fájltárolót S3-ra is átállíthatja: állítsa be a `FILE_STORE=S3` értéket, valamint a [Railway útmutató Fájltárolás szakaszában](./railway-template#5-file-storage) leírt `AWS_*` változókat. Az adatbázis-mentések nem tartalmazzák az S3-objektumokat; ehhez a bucketen kapcsolja be a verziókezelést.

## Frissítés

```bash
./deploy/b1 upgrade
```

A parancs a következő sorrendben dolgozik: lehúzza a kiadást, biztonsági mentést készít, újra létrehozza a konténereket, az API indulásakor lefuttatja a függőben lévő adatbázis-migrációkat, majd megvárja az API állapotellenőrzését. Ha valami meghiúsul, leáll, és felszólítja a `./deploy/b1 rollback` futtatására, amely visszaállítja az adott biztonsági mentést és az előző kiadást. A migrációk csak előre haladnak; a visszaállítás mindig a pillanatfelvétel visszatöltését jelenti.

A béta compose-fájlból (amely forráskódból épített image-eket használt) történő frissítés ugyanúgy működik, miután van `.env` fájlja: alapértelmezés szerint `MYSQL_ROOT_PASSWORD=churchapps` értéket használt, ezt tegye a `.env` fájlba a `PUBLIC_URL` és a `SITE_ADDRESS` mellé, cserélje le a `docker-compose.yml` fájlt és a `deploy/` mappát az aktuális fájlokra, majd futtassa a `./deploy/b1 upgrade` parancsot.

## Építés forráskódból

A fejlesztők az image-eket lehúzás helyett helyben is építhetik:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

A `.env` fájlban az `API_CONTEXT` és a `B1APP_CONTEXT` értékekkel az építések helyi másolatokra (pl. `../Api`) vagy egy git-referenciára mutathatnak.

## Hibaelhárítás

| Tünet | Valószínű ok | Megoldás |
|---------|--------------|-----|
| Az `api` konténer végtelen ciklusban újraindul | migrációs hiba vagy hibás adatbázis-jelszó | `./deploy/b1 logs api` – a migráció kiírja, melyik modul hibázott |
| Az `api` naplójában: „ENCRYPTION_KEY must be exactly 32 characters” | kézzel szerkesztett vagy csonkolt kulcs a `.env` fájlban | állítsa vissza az eredeti, 32 karakteres kulcsot (csak akkor generáljon újat, ha még nincs tárolt hitelesítő adat) |
| A böngésző tanúsítványhibát jelez | a DNS még nem ide mutat, vagy a 80-as/443-as port blokkolva van | javítsa a DNS-t vagy a tűzfalat; a Caddy magától újrapróbálkozik |
| A `/` irányítópultot mutat weboldal helyett | nincs még gyülekezet, vagy a `DEFAULT_CHURCH_SLUG` nem egyezik | hozzon létre gyülekezetet, vagy állítsa be az azonosítót a **Beállítások → Gyülekezet** menüpontban |
| „Ellenőrizze az e-mail-fiókját”, de nem érkezik e-mail | `MAIL_SYSTEM=SMTP` hibás hitelesítő adatokkal | javítsa a hitelesítő adatokat, vagy törölje a `MAIL_SYSTEM` értékét az e-mail kikapcsolásához |
| A mobil webalkalmazás szerint a push-értesítések nincsenek bekapcsolva | nincsenek VAPID-kulcsok a szerveren | adja hozzá őket a [Push-értesítések](#push-notifications) szakaszban leírtak szerint |
| A csevegés / élő funkciók nem működnek | egy előtte álló másik proxy blokkolja a websocketet | a socket ugyanazon a porton, a `/api/` útvonalon érhető el; engedélyezze az `Upgrade` fejléceket |
| Az `install` ezt utasítja el: „database volume already exists” | egy korábbi telepítés maradványai | `docker compose down -v` a törléshez, vagy írjon `.env` fájlt, és használja az `upgrade` parancsot |

Még mindig elakadt? Nyisson egy hibajegyet itt: [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues), és mellékelje a `./deploy/b1 logs` parancs kimenetét.

## Kapcsolódó cikkek

- **[Önálló üzemeltetés Railway-en](./railway-template)** – felügyelt tárhely-alternatíva, valamint a közös telepítés utáni konfigurációs útmutatók
- **[Kezdeti beállítás](../../getting-started/initial-setup)** – az első lépések a gyülekezet létrehozása után
- **[Helyi API-beállítás](../api/local-setup)** – a teljes környezet közvetlen futtatása fejlesztéshez
