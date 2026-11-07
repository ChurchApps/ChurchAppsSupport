---
title: "Caddy-proxy voor eigen domeinen"
---

# Caddy-proxy voor eigen domeinen

<div class="article-intro">

Eigen domeinen van kerken (`mychurch.org` → de B1-website van de kerk) komen binnen op één Windows EC2-server die Caddy draait. Die server beheert de TLS-certificaten, zet elk domein om naar de `{sub}.b1.church`-site en stuurt het verzoek door met een aangepaste Host-header. De volledige configuratie bestaat uit twee bestanden: een statische `Caddyfile` en een `hosts.map` die wordt ververst vanuit de Membership API. Daardoor overleeft de server een herstart zonder enige runtime-status. Deze pagina beschrijft hoe de server vanaf nul wordt opgebouwd, hoe hij werkt, en welke in de praktijk getoetste valkuilen iedereen moet kennen die hem opnieuw opbouwt.

</div>

Hoe een verzoek, zodra het bij B1App aankomt, wordt omgezet naar een kerk en site, staat beschreven in [Websiteroutering & meerdere sites](../architecture/websites).

## Onderdelen

| Onderdeel | Wat het is |
|---|---|
| EC2-instantie | Windows Server; Elastic IP **`3.23.251.61`** (wereldwijd opgenomen in de DNS van kerken; het IP is permanent, instanties zijn vervangbaar) |
| `C:\caddy\caddy.exe` | **Aangepaste** Caddy-build met de `techknowlogick/certmagic-s3`-opslagmodule; de standaard Caddy kan de certificaatopslag niet lezen |
| `C:\caddy\Caddyfile` | De volledige proxyconfiguratie: on-demand TLS, `map` van host naar upstream, redirects van www naar apex, en `:80` naar https |
| `C:\caddy\hosts.map` | Eén regel `{domain} {sub}.b1.church` per routeerbaar domein, geïmporteerd in het `map`-blok van de Caddyfile |
| `sync-hostmap.ps1` + taak `CaddyHostmapSync` | Geplande taak (elke 5 minuten en bij het opstarten, als SYSTEM) die `hosts.map` vanuit de API ververst en Caddy alleen bij een wijziging soepel herlaadt |
| Windows-service `caddy` (WinSW-wrapper) | Draait `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; herstart automatisch bij een fout. Caddy is niet SCM-bewust, dus een wrapper is nodig |
| S3-bucket `churchapps-caddy-certs` | Gedeelde certificaatopslag (`region us-east-2`, prefix `certs`); certificaten blijven behouden bij het opnieuw opbouwen van instanties |
| IAM-rol `CaddyRole` | Geeft de instantie toegang tot S3; Caddy gebruikt de standaard AWS-credentialketen (geen sleutels in de configuratie) |

## De twee API-eindpunten waarvan de server afhankelijk is

Beide zitten in de Membership API. `authorize` is anoniem; `hostmap` vereist sinds Api PR #67 (2026-08-16) de header `x-internal-key: <INTERNAL_API_KEY>`. `sync-hostmap.ps1` leest deze sleutel uit `C:\caddy\internal-key.txt`:

| Eindpunt | Rol |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | De **on-demand TLS `ask`-poort** van Caddy: `200 {"authorized":true}` wanneer de host (of, bij een `www.`-host, de apex) een rij in `domains` is; anders `404`. Dit is de misbruikbeveiliging: Caddy geeft geen certificaat uit voor een host die dit eindpunt afwijst |
| `GET /membership/domains/hostmap` | Vereist `x-internal-key` (of een server-admin-JWT). `text/plain`, gesorteerde en ontdubbelde regels `{domain} {sub}.b1.church` (sitebewust: een domein dat aan een secundaire site is toegewezen, verwijst naar het subdomein van die site). Bron van de `map` |

## Verloop van een verzoek

1. De browser zet `mychurch.org` om naar `3.23.251.61` (apex-`A`-record, of `CNAME proxy.b1.church`).
2. Caddy beëindigt de TLS-verbinding. Certificaat aanwezig in S3 → gebruiken; onbekende SNI → `authorize` wordt gevraagd; 200 → on demand uitgeven via Let's Encrypt; 404 → **de handshake wordt geweigerd** (geen certificaat, geen antwoord; een onbekende host krijgt een TLS-weigering, geen HTTP-fout).
3. De `map` zet de Host om naar `{sub}.b1.church`; `www.{apex}` krijgt een 302 naar de apex; een geautoriseerde maar niet-gemapte host (een gloednieuw domein binnen het synchronisatievenster van maximaal 5 minuten) krijgt een schone 404.
4. `reverse_proxy` verbindt met `{sub}.b1.church:443` met SNI en een Host die is herschreven naar de upstream, zodat de Vercel-edge de B1App-site serveert.
   Caddy stuurt het oorspronkelijke domein van de bezoeker ook mee als `X-Church-Host` (Vercel overschrijft `X-Forwarded-Host` met de herschreven Host). De B1App-middleware accepteert deze alleen wanneer `/domains/public/lookup/{host}` deze op hetzelfde `{sub}` afbeeldt als de aanvraag-host. Daarna stelt de middleware hem beschikbaar als `x-public-host` voor de canonieke `Link`-header, `robots.txt` en `sitemap.xml`. Door de client meegestuurde `x-public-host` wordt altijd verwijderd. Schema.org `ChurchJsonLd` gebruikt nog steeds de `b1.church`-URL (headers daar lezen zou de pagina's dynamisch maken).
5. Poort 80 verwerkt ACME HTTP-01-uitdagingen en stuurt al het overige met een 308 door naar https.

Propagatie van nieuwe domeinen: een domein dat in B1Admin is opgeslagen, wordt binnen ongeveer 5 minuten routeerbaar (de synchronisatietaak); het certificaat wordt uitgegeven bij de eerste HTTPS-aanvraag.

## De server vanaf nul opbouwen

Samengevat uit de in de praktijk getoetste procedure (de volledige stap-voor-stap-handleiding met kopieer-en-plakcommando's staat in de ops-werkruimte, niet in deze repository). Eerst de voorvereisten; zonder die lukt de opbouw niet:

1. **IAM**: koppel `CaddyRole` (S3-toegang tot de certificaatbucket) aan de instantie. Controleer via IMDSv2 vanaf de server. Let op: een kale IMDS-GET die 401 teruggeeft, betekent alleen dat IMDSv2 is afgedwongen, niet dat er geen rol is.
2. **API-status**: `authorize` moet 404 teruggeven voor een verzonnen domein, en `hostmap` (met de header `x-internal-key`) moet 200 teruggeven, vóór alles andere.

Daarna:

3. **Binary**: download een aangepaste build van de build-service van Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB tegenover ~45 MB voor de standaardversie; v2.11.4 op het moment van schrijven). De keuze van de module is belangrijk: `techknowlogick/certmagic-s3` gebruikt de sleutels `bucket`/`region`/`prefix`, die overeenkomen met de bestaande certificaatstructuur; de `ss098`-fork gebruikt `host`/`endpoint` en **vindt de bestaande certificaten niet**.
4. **Bestanden**: plaats `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (productie-`INTERNAL_API_KEY`, één regel) in `C:\caddy\`; vul de map eenmalig met `sync-hostmap.ps1 -NoReload`.
5. **Controles vóór de eerste start**: `caddy list-modules` moet de s3-opslagmodule tonen; `caddy adapt` moet in het opslagblok `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` uitvoeren; `caddy validate` moet slagen.
6. **Service**: installeer via WinSW (service-id `caddy`, automatisch herstarten bij een fout, roterende logs). Draait als LocalSystem, dat IMDS bereikt voor de rol-credentials.
7. **Synchronisatietaak**: registreer `CaddyHostmapSync` (SYSTEM, elke 5 minuten en bij het opstarten, uitvoeringslimiet van 4 minuten).
8. **Verificatie vóór de overschakeling**: forceer de omzetting van domeinen naar `127.0.0.1` met `curl --resolve` (de server heeft geen echt verkeer totdat het EIP is verplaatst). Een bestaand domein moet serveren met een geldig, overgenomen certificaat; `www.` moet een 302 geven; een onbekende host moet een TLS-weigering krijgen; en `Restart-Service caddy` moet terugkomen met serveren **zonder handmatig opnieuw voorbereiden**. Die herstarttest is het hele doel van het statische ontwerp.
9. **Livegang**: koppel het Elastic IP `3.23.251.61` opnieuw aan de nieuwe instantie. De DNS van kerken verandert nooit.

## In de praktijk getoetste valkuilen (op de harde manier geleerd; niet opnieuw introduceren)

| Valkuil | Symptoom | Oplossing |
|---|---|---|
| `tls_server_name {vars.upstream}` in de transport van reverse_proxy | Elk geproxied domein geeft een 502: de map-placeholders worden **leeg op het moment van de TLS-verbinding** ("either ServerName or InsecureSkipVerify must be specified") | Gebruik de transport-eigen placeholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dubbele sleutels of rommelregels in `hosts.map` | De `map`-handler van Caddy **geeft een harde fout bij een dubbele invoersleutel**; één foute regel kan de hele configuratie uitschakelen | Het synchronisatiescript normaliseert witruimte, laat foutieve regels vallen (weigert alleen als meer dan 20% fout is), ontdubbelt met de eerste waarde als winnaar, en schrijft UTF-8 **zonder BOM** (een BOM beschadigt de eerste map-sleutel). De API filtert ook lege domeinrijen of rijen met spaties bij de bron |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Het registreren van de taak **mislukt stilzwijgend** (XML buiten bereik, niet-beëindigende fout) | Bouw de herhaling als een CIM-instantie van `MSFT_TaskRepetitionPattern` met `Interval = "PT5M"` en zonder duur; voeg een `ExecutionTimeLimit` van 4 minuten toe (de eerste SYSTEM-uitvoering kan blijven hangen bij een koude TLS/CRL-opzoeking) |

:::warning
De admin-API luistert alleen op `localhost:2019`. De verouderde runtime-modus maakte deze op afstand bereikbaar, zodat de Membership API routeconfiguraties kon pushen. Het statische ontwerp heeft geen externe pushes nodig, en het kleinere oppervlak is bewust gekozen. `caddy reload` (lokaal uitgevoerd door het synchronisatiescript) is de enige gebruiker van de admin-API.
:::

:::info Verouderde runtime-push
`CaddyHelper` in de API (en de eindpunten `/membership/domains/caddy` + `/caddy/init`) bestaan nog steeds als terugvalroute naar de oude, runtime-geconfigureerde modus. Ze worden verwijderd zodra de statische server een paar weken stabiel heeft gedraaid. Daarna zijn `authorize` + `hostmap` de enige integratiepunten.
:::

## Beheer

- **Logs**: WinSW-logs met rotatie in `C:\caddy\` (stdout/stderr van de service; fouten van de reverse-proxy komen in `caddy-service.err.log` terecht); synchronisatiegeschiedenis in `C:\caddy\sync-hostmap.log`.
- **Hostmap geforceerd verversen**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Configuratiewijziging**: bewerk `C:\caddy\Caddyfile`, voer daarna `caddy validate` + `caddy reload` uit (of `Restart-Service caddy`; herstarts zijn ontworpen om veilig te zijn).
- **Massale verwijdering van domeinen** activeert de krimpbeveiliging van het synchronisatiescript, bewust; verplaats het oude `hosts.map` opzij en voer de taak opnieuw uit om een bewuste grote krimp te accepteren.
- **DNS-instructies voor kerken blijven voor altijd gelijk**: apex `A 3.23.251.61` of `CNAME proxy.b1.church`.

## Gerelateerde pagina's

- [Websiteroutering & meerdere sites](../architecture/websites): hoe het geproxied verzoek in B1App wordt omgezet naar een kerk en site
- [API-implementatie](./apis): de implementatie van de Membership API die `authorize`/`hostmap` levert
