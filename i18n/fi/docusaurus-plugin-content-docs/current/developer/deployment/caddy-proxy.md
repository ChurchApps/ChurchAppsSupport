---
title: "Caddy-mukautetun domainin välityspalvelin"
---

# Caddy-mukautetun domainin välityspalvelin

<div class="article-intro">

Mukautetut seurakuntien domainit (`mychurch.org` → seurakunnan B1-verkkosivusto) päättyvät yhteen Windows EC2 -koneeseen, jolla on Caddy. Kone hallinnoi TLS-varmenteita, selvittää jokaisen domainin vastaavan `{sub}.b1.church`-sivuston ja välittää pyynnöt käänteisenä välityspalvelimena muokatulla Host-otsakkeella. Sen koko konfiguraatio koostuu kahdesta tiedostosta: staattisesta `Caddyfile`-tiedostosta ja Membership API:sta päivitettävästä `hosts.map`-tiedostosta. Siksi se selviää uudelleenkäynnistyksistä ilman ajonaikaista tilaa. Tämä sivu kattaa koneen rakentamisen alusta alkaen, sen käytön sekä koetellut sudenkuopat, joihin kaikki sen uudelleenrakentajat törmäävät.

</div>

Siitä, miten pyyntö selvitetään seurakunnaksi ja sivustoksi, kun se saavuttaa B1Appin, katso [Verkkosivujen reititys ja monisivustoisuus](../architecture/websites).

## Komponentit

| Osa | Mitä se on |
|---|---|
| EC2-instanssi | Windows Server; Elastic IP **`3.23.251.61`** (upotettu seurakuntien DNS-asetuksiin maailmanlaajuisesti. IP on pysyvä, instanssit ovat korvattavissa) |
| `C:\caddy\caddy.exe` | **Mukautettu** Caddy-koontiversio, jossa on `techknowlogick/certmagic-s3`-tallennusmoduuli. Vakio-Caddy ei pysty lukemaan varmennevarastoa |
| `C:\caddy\Caddyfile` | Koko välityspalvelimen konfiguraatio: pyynnöllinen TLS (on-demand), host→upstream `map`, www→apex-uudelleenohjaukset, `:80`→https |
| `C:\caddy\hosts.map` | Yksi `{domain} {sub}.b1.church`-rivi per reititettävä domain, tuodaan Caddyfilen `map`-lohkoon |
| `sync-hostmap.ps1` + `CaddyHostmapSync`-tehtävä | Ajastettu tehtävä (joka 5. minuutti ja käynnistyksessä, SYSTEM-oikeuksin) päivittää `hosts.map`-tiedoston API:sta ja lataa Caddyn uudelleen sulavasti vain muutosten yhteydessä |
| Windows-palvelu `caddy` (WinSW-kääre) | Ajaa `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; käynnistyy automaattisesti uudelleen virheen sattuessa. Caddy ei ole SCM-tietoinen, joten kääre on pakollinen |
| S3-tallennuspaikka `churchapps-caddy-certs` | Jaettu varmennetallennus (`region us-east-2`, etuliite `certs`). Varmenteet säilyvät koneen uudelleenrakentamisen yli |
| IAM-rooli `CaddyRole` | Antaa instanssille S3-käyttöoikeuden. Caddy käyttää AWS:n oletuksena olevaa tunnistusketjua, joten konfiguraatiossa ei ole avaimia |

## Kaksi API-päätepistettä, joista kone on riippuvainen

Molemmat ovat Membership API:ssa. `authorize` on anonyymi. `hostmap` on vaatinut `x-internal-key: <INTERNAL_API_KEY>`-otsakkeen Api PR #67:stä (2026-08-16) alkaen. `sync-hostmap.ps1` lukee avaimen tiedostosta `C:\caddy\internal-key.txt`:

| Päätepiste | Tehtävä |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddyn **on-demand TLS `ask` -portti**: `200 {"authorized":true}`, kun isäntä (tai `www.`-isännän tapauksessa sen apex) on rivi `domains`-taulussa; muuten `404`. Tämä on väärinkäytön esto. Caddy ei myönnä varmennetta isännälle, jonka tämä päätepiste hylkää |
| `GET /membership/domains/hostmap` | Vaatii `x-internal-key`-otsakkeen (tai palvelimen ylläpitäjän JWT:n). `text/plain`, lajiteltuja ja deduplikoituja `{domain} {sub}.b1.church`-rivejä (sivustotietoinen: toissijaiselle sivustolle määritetty domain osoittaa sen sivuston aliakseen). Tämä on `map`-lohkon lähde |

## Pyynnön kulku

1. Selain selvittää `mychurch.org` → `3.23.251.61` (apex-`A`-tietue tai `CNAME proxy.b1.church`).
2. Caddy päättää TLS-yhteyden. Jos varmenne löytyy S3:sta, palvellaan se. Tuntemattoman SNI:n kohdalla kysytään `authorize`-päätepisteeltä. 200 → varmenne myönnetään pyynnöstä Let's Encryptiltä. 404 → **kättely hylätään** (ei varmennetta, ei vastausta). Tuntematon isäntä saa TLS-hylkäyksen, ei HTTP-virhettä.
3. `map` selvittää Hostin `{sub}.b1.church`-muotoon. `www.{apex}` saa 302-uudelleenohjauksen apexiin. Valtuutettu mutta kartoittamaton isäntä (aivan uusi domain ≤5 minuutin synkronointi-ikkunassa) saa siistin 404-vastauksen.
4. `reverse_proxy` ottaa yhteyden `{sub}.b1.church:443`-osoitteeseen SNI:n kanssa, ja Host-otsake kirjoitetaan uudelleen upstreamille, jotta Vercelin reuna palvelee B1App-sivuston.
   Caddy lähettää lisäksi vierailijan alkuperäisen domainin `X-Church-Host`-otsakkeena (Vercel ylikirjoittaa `X-Forwarded-Host`-otsakkeen uudelleenkirjoitetulla Hostilla). B1Appin middleware hyväksyy sen vain, jos `/domains/public/lookup/{host}` kartoittaa sen samaan `{sub}`-arvoon kuin pyynnön isäntä. Sen jälkeen se tarjotaan `x-public-host`-otsakkeena kanonista `Link`-otsaketta, `robots.txt`:tä ja `sitemap.xml`:ää varten. Asiakkaan lähettämä `x-public-host` poistetaan aina. Schema.org `ChurchJsonLd` käyttää yhä `b1.church`-URL-osoitetta, sillä näiden otsakkeiden lukeminen siellä tekisi sivuista dynaamisia.
5. Portti 80 välittää ACME HTTP-01 -haasteet ja uudelleenohjaa kaiken muun https:lle 308-koodilla.

Uuden domainin leviäminen: B1Adminissa tallennettu domain tulee reititettäväksi noin 5 minuutissa (synkronointitehtävä). Sen varmenne luodaan ensimmäisellä HTTPS-osumalla.

## Koneen rakentaminen alusta

Tiivistetty kokeillusta menettelystä. Täydellinen vaiheittainen ohje kopioitavine komentoineen on operatiivisessa työtilassa, ei tässä repositoriossa. Esivaatimukset ensin, sillä rakennus ei toimi ilman niitä:

1. **IAM**: liitä `CaddyRole` (S3-käyttöoikeus varmennevarastoon) instanssiin. Varmista IMDSv2:lla koneelta. Huomaa, että pelkkä IMDS-GET, joka palauttaa 401:n, tarkoittaa vain, että IMDSv2 on pakotettu, ei sitä, ettei roolia ole.
2. **API:n kunto**: `authorize` täytyy palauttaa 404 tuntemattomalle domainille, ja `hostmap` (`x-internal-key`-otsakkeen kanssa) täytyy palauttaa 200 ennen mitään muuta.

Sitten:

3. **Binääri**: lataa mukautettu koontiversio Caddyn rakennuspalvelusta: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 Mt vs. ~45 Mt vakioversio; v2.11.4 kirjoitushetkellä). Moduulin valinnalla on merkitystä. `techknowlogick/certmagic-s3` käyttää `bucket`/`region`/`prefix`-avaimia, jotka vastaavat olemassa olevaa varmenteiden rakennetta. `ss098`-haarukka käyttää `host`/`endpoint`-avaimia eikä **löydä** olemassa olevia varmenteita.
4. **Tiedostot**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (tuotannon `INTERNAL_API_KEY`, yksi rivi) kansioon `C:\caddy\`. Siemennä kartta kerran komennolla `sync-hostmap.ps1 -NoReload`.
5. **Tarkistukset ennen ensimmäistä käynnistystä**: `caddy list-modules` täytyy näyttää s3-tallennusmoduulin. `caddy adapt` täytyy tuottaa tallennuslohkoonsa `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`. `caddy validate` täytyy onnistua.
6. **Palvelu**: asenna WinSW:llä (palvelun tunnus `caddy`, automaattinen uudelleenkäynnistys virheen sattuessa, rullaavat lokit). Palvelu ajetaan LocalSystem-tunnuksella, joka saa IMDS:stä roolin tunnistetiedot.
7. **Synkronointitehtävä**: rekisteröi `CaddyHostmapSync` (SYSTEM, joka 5. minuutti ja käynnistyksessä, 4 minuutin suoritusraja).
8. **Tarkistus ennen siirtoa**: pakota domainit osoittamaan `127.0.0.1`:een `curl --resolve`-komennolla. Koneella ei ole todellista liikennettä ennen kuin Elastic IP siirtyy. Olemassa olevan domainin täytyy palvella siirretyllä, voimassa olevalla varmenteella. `www.` täytyy antaa 302. Tuntemattomalle isännälle täytyy tulla TLS-hylkäys. Lisäksi `Restart-Service caddy` täytyy palata palvelemaan **ilman manuaalista uudelleenalustusta**. Tuo uudelleenkäynnistystesti on koko staattisen suunnittelun pointti.
9. **Käyttöönotto**: liitä Elastic IP `3.23.251.61` uudelleen uuteen instanssiin. Seurakuntien DNS ei koskaan muutu.

## Kokeillut sudenkuopat (opittu kantapään kautta, älä palaa niihin)

| Sudenkuoppa | Oire | Korjaus |
|---|---|---|
| `tls_server_name {vars.upstream}` reverse_proxy-siirtokerroksessa | Jokainen välitetty domain antaa 502:n. Map-paikanvaraajat ratkeavat **tyhjiksi TLS-yhteyden muodostamisen aikana** ("either ServerName or InsecureSkipVerify must be specified") | Käytä siirtokerroksen omaa paikanvaraajaa: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Kaksoiskappaleavaimet tai roskarivit `hosts.map`-tiedostossa | Caddyn `map`-käsittelijä **keskeyttää virheellä kaksoiskappaleavaimesta**, joten yksi huono rivi voi kaataa koko konfiguraation | Synkronointiskripti normalisoi välilyönnit, pudottaa virheelliset rivit (hylkää kaiken vain, jos yli 20 % on huonoja), poistaa kaksoiskappaleet niin, että ensimmäinen voittaa, ja kirjoittaa **BOM-vapaana** UTF-8:na (BOM turmelee ensimmäisen karttaavaimen). API suodattaa lisäksi lähteessä pois tyhjät tai välilyöntejä sisältävät domain-rivit |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Tehtävän rekisteröinti **epäonnistuu hiljaa** (alueen ulkopuolinen XML, ei-päättyvä virhe) | Rakenna toisto `MSFT_TaskRepetitionPattern`-CIM-instanssina, jossa `Interval = "PT5M"` ja ilman kestoa. Lisää 4 minuutin `ExecutionTimeLimit`, sillä ensimmäinen SYSTEM-ajo voi jumittua kylmän TLS/CRL-haun takia |

:::warning
Hallinta-API sitoutuu vain osoitteeseen `localhost:2019`. Vanha ajonaikainen tila paljasti sen etänä, jotta Membership API pystyi työntämään reittikonfiguraatioita. Staattinen suunnittelu ei tarvitse etätyönnöitä, ja pienempi pinta on tarkoituksellinen. `caddy reload` (jonka synkronointiskripti ajaa paikallisesti) on ainoa hallinta-API:n käyttäjä.
:::

:::info Vanha ajonaikainen työntö
API:n `CaddyHelper` (sekä `/membership/domains/caddy`- ja `/caddy/init`-päätepisteet) on yhä olemassa varmuuskopiopolkuna vanhaan ajonaikaisesti konfiguroituun tilaan. Ne on ajastettu poistettaviksi, kun staattinen kone on ollut vakaa pari viikkoa. Sen jälkeen `authorize` ja `hostmap` ovat ainoat integraatiopisteet.
:::

## Käyttö

- **Lokit**: WinSW:n rullaavat lokit kansiossa `C:\caddy\` (palvelun stdout/err; välityspalvelinvirheet menevät tiedostoon `caddy-service.err.log`). Synkronointihistoria on tiedostossa `C:\caddy\sync-hostmap.log`.
- **Kartan päivityksen pakottaminen**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfiguraatiomuutos**: muokkaa `C:\caddy\Caddyfile`-tiedostoa ja aja sitten `caddy validate` + `caddy reload` (tai `Restart-Service caddy`, sillä uudelleenkäynnistykset ovat suunnitelman mukaan turvallisia).
- **Domainien massapoisto** laukaisee synkronointiskriptin kutistumisvartijan tarkoituksella. Siirrä vanha `hosts.map` syrjään ja aja tehtävä uudelleen hyväksyäksesi tarkoituksellisen suuren kutistumisen.
- **Seurakuntien DNS-ohjeet pysyvät ennallaan ikuisesti**: apex `A 3.23.251.61` tai `CNAME proxy.b1.church`.

## Aiheeseen liittyvät sivut

- [Verkkosivujen reititys ja monisivustoisuus](../architecture/websites): miten välitetty pyyntö selvitetään seurakunnaksi ja sivustoksi B1Appissa
- [API-käyttöönotto](./apis): Membership API:n käyttöönotto, joka tarjoaa `authorize`- ja `hostmap`-päätepisteet
