---
title: "Caddy proxy za domene cerkva"
---

# Caddy proxy za domene cerkva

<div class="article-intro">

Domene cerkva po meri (`mychurch.org` → spletno mesto cerkve B1) se končajo na enem samem Windows EC2 strežniku, na katerem teče Caddy. Ta strežnik hrani TLS certifikate, vsako domeno preslika na njeno spletno mesto `{sub}.b1.church` in zahteve posreduje naprej s prepisano glavo Host. Njegova celotna konfiguracija je sestavljena iz dveh datotek, statične `Caddyfile` in datoteke `hosts.map`, ki se osvežuje iz Membership API-ja. Zato po ponovnem zagonu deluje brez stanja med izvajanjem. Ta stran opisuje, kako je strežnik zgrajen od začetka, kako deluje in katere preizkušene pasti lahko prizadenejo vsakogar, ki ga ponovno gradi.

</div>

Za to, kako zahteva po prihodu v B1App pride do cerkve ali spletnega mesta, glejte [Usmerjanje spletnih mest in več spletnih mest](../architecture/websites).

## Sestavni deli

| Del | Kaj je |
|---|---|
| EC2 instanca | Windows Server; elastični IP **`3.23.251.61`** (vgrajen v DNS cerkva po svetu — IP je trajen, instance pa so zamenljive) |
| `C:\caddy\caddy.exe` | **Prilagojena** različica Caddy z modulom za shranjevanje `techknowlogick/certmagic-s3` — standardni Caddy ne more brati shrambe certifikatov |
| `C:\caddy\Caddyfile` | Celotna konfiguracija proxyja: TLS na zahtevo, preslikava `map` gostitelj→vir, preusmeritve www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Ena vrstica `{domain} {sub}.b1.church` za vsako domeno, ki jo je mogoče usmerjati; uvožena v blok `map` v Caddyfile |
| `sync-hostmap.ps1` + naloga `CaddyHostmapSync` | Načrtovana naloga (vsakih 5 minut in ob zagonu, kot SYSTEM) osveži `hosts.map` iz API-ja in Caddy elegantno ponovno naloži samo ob spremembi |
| Storitev Windows `caddy` (ovoj WinSW) | Izvaja `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; samodejni ponovni zagon ob napaki. Caddy ni SCM-aware, zato je ovoj obvezen |
| S3 bucket `churchapps-caddy-certs` | Skupna shramba certifikatov (`region us-east-2`, predpona `certs`) — certifikati preživijo ponovne gradnje instanc |
| IAM vloga `CaddyRole` | Instanci omogoča dostop do S3; Caddy uporablja privzeto verigo poverilnic AWS (v konfiguraciji ni ključev) |

## Dva API-ja, od katerih je strežnik odvisen

Oba sta na Membership API-ju. `authorize` je anonimen, `hostmap` pa od Api PR #67 (2026-08-16) zahteva glavo `x-internal-key: <INTERNAL_API_KEY>`. Skripta `sync-hostmap.ps1` jo prebere iz `C:\caddy\internal-key.txt`:

| Endpoint | Vloga |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Vrata **`ask` za TLS na zahtevo** pri Caddy: `200 {"authorized":true}`, če je gostitelj (ali pri gostitelju `www.` njegov apex) vrstica v `domains`; sicer `404`. To je nadzor zlorab — Caddy ne bo izdal certifikata za gostitelja, ki ga ta endpoint zavrne |
| `GET /membership/domains/hostmap` | Zahteva `x-internal-key` (ali JWT skrbniškega strežnika). Vrne `text/plain`, urejene in deduplicirane vrstice `{domain} {sub}.b1.church` (upoštevajo spletna mesta: domena, dodeljena sekundarnemu spletnemu mestu, kliče poddomeno tega spletnega mesta). Vir za `map` |

## Potek zahteve

1. Brskalnik razreši `mychurch.org` → `3.23.251.61` (zapis apex `A` ali `CNAME proxy.b1.church`).
2. Caddy zaključi TLS. Če je certifikat v S3, ga postreže; za neznani SNI se vpraša `authorize`; odgovor 200 → izda certifikat na zahtevo prek Let's Encrypt; odgovor 404 → **rokovanje je zavrnjeno** (brez certifikata, brez odgovora — neznan gostitelj dobi zavrnitev TLS, ne napake HTTP).
3. `map` razreši gostitelja v `{sub}.b1.church`; `www.{apex}` dobi preusmeritev 302 na apex; gostitelj, ki je odobren, a še ni preslikan (nova domena znotraj okna sinhronizacije ≤5 minut), dobi čist odgovor 404.
4. `reverse_proxy` se poveže na `{sub}.b1.church:443` s SNI, glava Host pa je prepisana na vir, tako da Vercelov rob postreže spletno mesto B1App.
   Caddy obiskovalčevo prvotno domeno pošlje tudi kot `X-Church-Host` (Vercel prepiše `X-Forwarded-Host` s prepisanim Host). Vmesna programska oprema B1App jo sprejme samo, če `/domains/public/lookup/{host}` to domeno preslika na isti `{sub}` kot gostitelj zahteve. Nato jo izpostavi kot `x-public-host` za kanonično glavo `Link`, `robots.txt` in `sitemap.xml`; s strani odjemalca poslani `x-public-host` je vedno odstranjen. Schema.org `ChurchJsonLd` še vedno uporablja URL `b1.church` (branje glav tam bi naredilo strani dinamične).
5. Vrata 80 posredujejo izzive ACME HTTP-01 in vse ostalo preusmerijo s 308 na https.

Širjenje nove domene: domena, shranjena v B1Admin, postane usmerljiva v približno 5 minutah (naloga sinhronizacije); njen certifikat se izda ob prvem zahtevku HTTPS.

## Gradnja strežnika od začetka

Strnjeno po preizkušenem postopku (celoten postopek po korakih s kopirnimi ukazi je v delovnem prostoru za operacije, ne v tem repozitoriju). Najprej predpogoji — brez njih gradnja ne deluje:

1. **IAM**: pripnite `CaddyRole` (dostop do S3 za shrambo certifikatov) na instanco. Preverite prek IMDSv2 z javnega strežnika — opomba: sam GET na IMDS, ki vrne 401, pomeni le, da je IMDSv2 vsiljen, ne pa »brez vloge«.
2. **Zdravje API-ja**: `authorize` mora za neobstoječo domeno vrniti 404, `hostmap` (z glavo `x-internal-key`) pa 200, preden karkoli drugega.

Nato:

3. **Binarna datoteka**: prenesite prilagojeno gradnjo iz storitve gradnje Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB v primerjavi z ~45 MB standardne različice; v2.11.4 ob pisanju). Izbira modula je pomembna: `techknowlogick/certmagic-s3` uporablja ključe `bucket`/`region`/`prefix`, ki ustrezajo obstoječi postavitvi certifikatov; vejica `ss098` uporablja `host`/`endpoint` in **ne bo našla obstoječih certifikatov**.
4. **Datoteke**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (produkcijski `INTERNAL_API_KEY`, ena vrstica) v `C:\caddy\`; enkrat napolnite preslikavo z `sync-hostmap.ps1 -NoReload`.
5. **Vrata pred prvim zagonom**: `caddy list-modules` mora prikazati modul za shranjevanje s3; `caddy adapt` mora v bloku shranjevanja izpisati `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`; `caddy validate` mora uspeti.
6. **Storitev**: namestite prek WinSW (ID storitve `caddy`, samodejni ponovni zagon ob napaki, sprotni dnevniki). Teče kot LocalSystem, ki doseže IMDS za poverilnice vloge.
7. **Naloga sinhronizacije**: registrirajte `CaddyHostmapSync` (SYSTEM, vsakih 5 minut in ob zagonu, omejitev izvajanja 4 minute).
8. **Preverjanje pred preklopom**: domene prisilno razrešite na `127.0.0.1` z `curl --resolve` (strežnik nima pravega prometa, dokler se EIP ne premakne): obstoječa domena mora strežati z veljavnim, prenesenim certifikatom; `www.` mora dati 302; neznan gostitelj mora dobiti zavrnitev TLS; `Restart-Service caddy` mora ponovno zagnati strežbo **brez ročnega ponovnega polnjenja** — prav ta test ponovnega zagona je bistvo statične zasnove.
9. **Prehod v produkcijo**: ponovno povežite elastični IP `3.23.251.61` z novo instanco. DNS cerkva se nikoli ne spremeni.

## Preizkušene pasti (spoznane na težek način — ne vračajte se k njim)

| Past | Simptom | Popravek |
|---|---|---|
| `tls_server_name {vars.upstream}` v transportu reverse_proxy | Vsaka posredovana domena vrne 502: nadomestni znaki v preslikavi se ob vzpostavitvi TLS izpraznijo ("either ServerName or InsecureSkipVerify must be specified") | Uporabite nadomestni znak, ki je del transporta: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Podvojeni ključi ali nesmiselne vrstice v `hosts.map` | Obdelovalnik `map` pri Caddy ob podvojenem vhodnem ključu **ustavi nalaganje z napako** — ena slaba vrstica lahko podre celotno konfiguracijo | Skripta za sinhronizacijo normalizira presledke, izpusti napačno oblikovane vrstice (zavrne v celoti le, če je >20 % slabih), odstrani podvojene vnose tako, da obdrži prvega, in zapiše UTF-8 **brez BOM** (BOM pokvari prvi ključ preslikave). API tudi filtrira prazne vrstice domen oziroma tiste, ki vsebujejo presledek, že pri viru |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Registracija naloge **tiho odpove** (XML z vrednostjo izven območja, nepreklicna napaka) | Ponovitev zgradite kot primerek CIM `MSFT_TaskRepetitionPattern` z `Interval = "PT5M"` in brez trajanja; dodajte `ExecutionTimeLimit` 4 minute (prvi zagon kot SYSTEM se lahko zatakne ob hladnem iskanju TLS/CRL) |

:::warning
Administrativni API se veže samo na `localhost:2019`. Zastareli način izvajanja je to izpostavil na daljavo, da je Membership API lahko potiskal konfiguracije poti; statična zasnova ne potrebuje potiskov na daljavo, manjša površina pa je namerna. `caddy reload` (ki ga lokalno zažene skripta za sinhronizacijo) je edini porabnik administrativnega API-ja.
:::

:::info Zastarel potisk med izvajanjem
`CaddyHelper` v API-ju (ter endpointa `/membership/domains/caddy` in `/caddy/init`) še vedno obstaja kot pot za vrnitev na stari način, konfiguriran med izvajanjem. Načrtovano je, da bodo izbrisani, ko bo statični strežnik nekaj tednov stabilen — potem sta `authorize` in `hostmap` edini točki vključitve.
:::

## Delovanje

- **Dnevniki**: sprotni dnevniki WinSW v `C:\caddy\` (standardni izhod/napake storitve — napake reverse-proxyja končajo v `caddy-service.err.log`); zgodovina sinhronizacije v `C:\caddy\sync-hostmap.log`.
- **Prisilno osveži preslikavo**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Sprememba konfiguracije**: uredite `C:\caddy\Caddyfile`, nato `caddy validate` + `caddy reload` (ali `Restart-Service caddy` — ponovni zagoni so po zasnovi varni).
- **Množično brisanje domen** sproži zaščito pred krčenjem skripte za sinhronizacijo, kar je namerno; stari `hosts.map` premaknite na stran in ponovno zaženite nalogo, da sprejmete namerno veliko krčenje.
- **Navodila DNS za cerkve se ne spremenijo nikoli**: apex `A 3.23.251.61` ali `CNAME proxy.b1.church`.

## Sorodne strani

- [Usmerjanje spletnih mest in več spletnih mest](../architecture/websites) — kako se posredovana zahteva razreši v cerkev/spletno mesto v B1App
- [Namestitev API-ja](./apis) — namestitev Membership API-ja, ki strežbo `authorize`/`hostmap`
