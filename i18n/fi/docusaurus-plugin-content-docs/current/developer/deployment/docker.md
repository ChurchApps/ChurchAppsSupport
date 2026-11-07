---
title: "Self-Hosting with Docker"
---

# Self-Hosting with Docker

<div class="article-intro">

Käytä omaa yksityistä B1 Adminin, B1-jäsenportaalin ja verkkosivuston, API:n sekä MySQL-tietokannan instanssia millä tahansa koneella, jossa on Docker: kotipalvelimella, pienellä VPS:llä tai paikallisella laitteella. Yksi komento asentaa sen, yksi komento päivittää sen, ja jokainen päivitys ottaa ensin varmuuskopion. Jos et halua hallita palvelinta lainkaan, katso [Self-Hosting on Railway](./railway-template) hallitun vaihtoehdon osalta.

</div>

## Pikaopas

<div class="prereqs">
<h4>Mitä tarvitset</h4>

- Linux-kone (tai macOS / Windows WSL:llä tai Git Bashilla — `b1`-apuohjelma on bash-skripti) ja [Docker Engine](https://docs.docker.com/engine/install/) sekä Compose v2 (sisältyy Docker Desktopiin)
- Noin 2 Gt RAM-muistia ja 5 Gt levytilaa
- Julkista sivustoa varten: koneeseen osoittava verkkotunnus, ja portit 80 ja 443 ovat tavoitettavissa

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Jätä `--domain` pois, jos haluat ajaa instanssin osoitteessa `http://localhost`. Asennusohjelma luo kansion `b1church`, kirjoittaa `.env`-tiedoston juuri luoduilla salaisuuksilla, hakee valmiiksi rakennetut imagot GitHub Container Registrystä ja odottaa, kunnes API ilmoittaa olevansa terve. Mitään ei rakenneta koneellasi, joten ensimmäinen käynnistys kestää minuutin tai kaksi.

Kun asennus on valmis:

1. Avaa **https://church.example.org/admin** (tai http://localhost/admin) ja klikkaa **Register**. Ensimmäinen tili on automaattisesti palvelimen ylläpitäjä.
2. Luo ensimmäinen seurakuntasi sovelluksen ohjeiden mukaan. Sen verkkosivusto ja jäsenportaali ovat käytössä osoitteessa **https://church.example.org/** heti, kun seurakunta on luotu.

Kaikki toimii yhden verkkotunnuksen takana:

| Polku | Palvelu |
|------|---------|
| `/` | B1App — seurakunnan verkkosivusto ja jäsenportaali |
| `/admin` | B1Admin — henkilökunnan hallintanäkymä |
| `/api` | API, ladatut tiedostot ja reaaliaikaiset päivitykset websocketin kautta |

HTTPS on automaattinen: mukana tuleva [Caddy](https://caddyserver.com/)-välityspalvelin hankkii ja uusii Let's Encrypt -varmenteen `.env`-tiedostossa määritetylle verkkotunnukselle. Vain portit 80 ja 443 ovat avoimia; tietokantaan pääsee ainoastaan Docker-verkon sisältä.

## `b1`-komento

Asennusohjelma jättää `deploy/b1`-skriptin `docker-compose.yml`-tiedoston viereen. Se on ainoa asia, jota tarvitset päivittäin:

| Komento | Mitä se tekee |
|---------|--------------|
| `./deploy/b1 upgrade` | Hakee nykyisen julkaisun, ottaa varmuuskopion, käynnistää uudelleen ja varmistaa, että API on terve |
| `./deploy/b1 upgrade 2026.10.1` | Sama, mutta kiinnitettynä tiettyyn julkaisuun |
| `./deploy/b1 backup` | Tallentaa tietokannan, ladatut tiedostot ja `.env`-tiedoston kansioon `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Palauttaa varmuuskopion (API pysäytetään palautuksen ajaksi) |
| `./deploy/b1 rollback` | Palauttaa uusimman varmuuskopion, mukaan lukien julkaisun, jolla se otettiin |
| `./deploy/b1 status` | Asennettu versio ja konttien tila |
| `./deploy/b1 logs api` | Seuraa palvelun lokeja |

Julkaisut toimitetaan yhtenä versioituna pakettina, joten kolme imagoa ovat aina yhteensopivia keskenään. `.env`-tiedoston `B1_VERSION=stable` seuraa uusinta julkaisua; aseta tietty versio, jos haluat kiinnittää sen. Julkaisutiedot löytyvät kohdasta [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Määritykset

Kaikki asetukset ovat `.env`-tiedostossa `docker-compose.yml`-tiedoston vieressä. Asennusohjelma täyttää pakolliset:

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

Kun muokkaat `.env`-tiedostoa, ota muutokset käyttöön komennolla `docker compose up -d`. Verkkosovellukset selvittävät, mihin API:in ne yhdistävät selaimen osoitteen perusteella, joten verkkotunnuksen vaihtaminen vaatii vain `SITE_ADDRESS`- ja `PUBLIC_URL`-arvojen päivittämisen sekä uudelleenkäynnistyksen — ei uudelleenrakennusta.

:::warning
Pidä `.env`-tiedosto turvassa. `ENCRYPTION_KEY` suojaa tallennetut maksuyhdyskäytävän ja tallennustilan tunnukset; varmuuskopio ilman sitä ei pysty purkamaan niitä. `./deploy/b1 backup` sisältää kopion tästä syystä.
:::

### Siirtyminen myöhemmin verkkotunnukseen

Jos asensit palvelun `localhost`-osoitteeseen ja haluat myöhemmin julkisen osoitteen: osoita DNS koneeseen, aseta `.env`-tiedostossa `DOMAIN`, `SITE_ADDRESS` (pelkkä verkkotunnus) ja `PUBLIC_URL` (`https://` + verkkotunnus), ja aja sitten `docker compose up -d`. Caddy hakee varmenteen ensimmäisellä pyynnöllä.

## Sähköposti, lahjoitukset, usean sivuston tuki ja integraatiot

Nämä toimivat täsmälleen samoin kuin Railwayllä — samat ympäristömuuttujat, mutta asetettuna `.env`-tiedostoon Railwayn hallintapaneelin sijaan:

- **[Sähköposti / SMTP](./railway-template#1-email-highly-recommended)** — ohjeet palveluntarjoajille Resend, Brevo ja Gmail
- **[Usean sivuston tuki](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — rajaton määrä seurakuntia yhdessä instanssissa. `/` palvelee seurakuntaa, jonka slug on `DEFAULT_CHURCH_SLUG` (ensimmäinen seurakunta on `church`); osoita lisädomainit palvelimelle ja määritä ne B1Adminissa kohdassa **Settings → Domains**
- **[Verkkolahjoitukset](./railway-template#4-online-giving-stripe--paypal)** — määritetään seurakunnittain hallintanäkymässä
- **[Valinnaiset integraatiot](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push-ilmoitukset](#push-notifications)** — `WEB_PUSH_*`; asennusohjelma jättää nämä tyhjiksi, joten push-ilmoitukset ovat pois käytöstä, kunnes lisäät ne

Kutsut ja muut seurakunnan lähettämät sähköpostit otetaan automaattisesti käyttöön itse ylläpidetyssä instanssissa. (Hallitussa palvelussa nämä on rajattu manuaaliseen tarkastukseen lähettäjämaineen suojaamiseksi.)

## Push-ilmoitukset

Selain- ja mobiili-web-push-ilmoitukset pysyvät pois käytöstä, kunnes palvelimella on VAPID-avainpari. Asennusohjelma ei luo sitä. Ennen kuin lisäät sen, mobiili-web-sovelluksen Ilmoitukset-sivu kertoo, ettei push-ilmoituksia ole otettu käyttöön sivustolle.

1. Luo avainpari. Tähän tarvitaan vain Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Lisää kaksi arvoa `.env`-tiedostoon. `WEB_PUSH_SUBJECT` on valinnainen ja se on yhteysosoite, jonka push-palvelut näkevät:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Ota muutokset käyttöön:

   ```bash
   docker compose up -d
   ```

4. Vahvistaaksesi avaa B1Adminissa **Server Admin → Server Health**. Molempien Web Push -avainten pitäisi näkyä määritettyinä. Jäsenet voivat sen jälkeen ottaa ilmoitukset käyttöön mobiili-web-sovelluksesta.

:::warning
Käytä samoja avaimia, kun jäsenet ovat jo rekisteröityneet. Avainten vaihtaminen mitätöi kaikki olemassa olevat tilaukset, ja jokaisen laitteen on rekisteröidyttävä uudelleen.
:::

## Data, varmuuskopiot ja tiedostojen tallennus

Kolme nimettyä Docker-volyymiä sisältää kaiken tilatiedon:

| Volyymi | Sisältö |
|--------|----------|
| `b1church_mysql-data` | Kaikki tietokantaskeemat |
| `b1church_api-content` | Ladatut tiedostot — valokuvat, asiakirjat, verkkosivuston kuvat |
| `b1church_caddy-data` | TLS-varmenteet |

`./deploy/b1 backup` kirjoittaa johdonmukaisen tallenteen kahdesta ensimmäisestä sekä `.env`-tiedostosta kansioon `backups/<timestamp>/`. Ajasta se cronilla ja kopioi kansio koneen ulkopuolelle:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Suurten mediakirjastojen kohdalla voit siirtää tiedostotallennuksen S3:een — aseta `FILE_STORE=S3` sekä `AWS_*`-muuttujat, jotka on kuvattu [Railway-oppaan tiedostotallennus-osiossa](./railway-template#5-file-storage). Tietokantavarmuuskopiot eivät sisällä S3-objekteja; ota niille käyttöön bucketin versiointi.

## Päivittäminen

```bash
./deploy/b1 upgrade
```

Vaiheet järjestyksessä: hakee julkaisun, ottaa varmuuskopion, luo kontit uudelleen, ajaa odottavat tietokantamigraatiot API:n käynnistyessä ja odottaa API:n terveystarkistusta. Jos jokin epäonnistuu, prosessi pysähtyy ja kehottaa ajamaan `./deploy/b1 rollback`, joka palauttaa tuon varmuuskopion ja edellisen julkaisun. Migraatiot ovat vain eteenpäin suuntautuvia; peruuttaminen tarkoittaa aina tallenteen palauttamista.

Jos päivität beta-vaiheen compose-tiedostosta (joka rakensi imaget lähdekoodista), prosessi toimii samalla tavalla, kunhan sinulla on `.env`-tiedosto: siinä käytettiin oletuksena `MYSQL_ROOT_PASSWORD=churchapps`, joten lisää se `.env`-tiedostoon yhdessä `PUBLIC_URL`- ja `SITE_ADDRESS`-arvojen kanssa, korvaa `docker-compose.yml` ja `deploy/`-kansio nykyisillä tiedostoilla ja aja `./deploy/b1 upgrade`.

## Rakentaminen lähdekoodista

Kehittäjät voivat rakentaa imagot paikallisesti hakemisen sijaan:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env`-tiedoston `API_CONTEXT` ja `B1APP_CONTEXT` osoittavat rakennukset paikallisiin kopioihin (esim. `../Api`) tai git-viitteeseen.

## Vianmääritys

| Oire | Todennäköinen syy | Korjaus |
|---------|--------------|-----|
| `api`-kontti käynnistyy uudelleen jatkuvasti | migraatiovirhe tai väärä tietokannan salasana | `./deploy/b1 logs api` — migraatio kertoo, mikä moduuli epäonnistui |
| `api` lokittaa "ENCRYPTION_KEY must be exactly 32 characters" | `.env`-tiedoston avain on muokattu käsin tai katkaistu | palauta alkuperäinen 32 merkin avain (luo uusi vain, jos tallennettuja tunnuksia ei vielä ole) |
| Selain näyttää varoituksen varmenteesta | DNS ei vielä osoita tänne tai portti 80/443 on estetty | korjaa DNS tai palomuuri; Caddy yrittää uudelleen itsestään |
| `/` näyttää hallintanäkymän verkkosivuston sijaan | seurakuntaa ei ole vielä tai `DEFAULT_CHURCH_SLUG` ei täsmää | luo seurakunta tai aseta slug kohdasta **Settings → Church** |
| "Check your email", mutta sähköposti ei saavu | `MAIL_SYSTEM=SMTP` väärillä tunnuksilla | korjaa tunnukset tai poista `MAIL_SYSTEM` käytöstä sähköposti |
| Mobiili-web-sovellus kertoo, ettei push-ilmoituksia ole otettu käyttöön | palvelimella ei ole VAPID-avaimia | lisää ne kohdassa [Push-ilmoitukset](#push-notifications) kuvatulla tavalla |
| Chat- tai reaaliaikaominaisuudet eivät toimi | websocket estetty toisen välityspalvelimen takia | socket on `/api/`-polulla samassa portissa; salli `Upgrade`-otsakkeet |
| `install` kieltäytyy: "database volume already exists" | jäämiä aiemmasta asennuksesta | `docker compose down -v` tyhjentää kaiken, tai kirjoita `.env` ja käytä `upgrade`-komentoa |

Yhä jumissa? Avaa issue osoitteessa [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) ja liitä mukaan `./deploy/b1 logs` -komennon tuloste.

## Aiheeseen liittyvät artikkelit

- **[Self-Hosting on Railway](./railway-template)** — hallittu hosting-vaihtoehto sekä yhteiset julkaisun jälkeiset määritysoppaat
- **[Initial Setup](../../getting-started/initial-setup)** — ensimmäiset vaiheet seurakunnan luomisen jälkeen
- **[Local API Setup](../api/local-setup)** — pinon ajaminen suoraan kehitystä varten
