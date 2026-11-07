---
title: "Proxy server Caddy pre vlastné domény"
---

# Proxy server Caddy pre vlastné domény

<div class="article-intro">

Vlastné domény cirkví (`mychurch.org` → webová stránka cirkvi v B1) sa ukončujú na jednom Windows EC2 serveri, na ktorom beží Caddy. Tento server spravuje certifikáty TLS, preloží každú doménu na jej webovú stránku `{sub}.b1.church` a reverzne preposiela požiadavky s upravenou hlavičkou Host. Jeho celá konfigurácia pozostáva z dvoch súborov: statického `Caddyfile` a `hosts.map`, ktorý sa obnovuje z Membership API. Vďaka tomu prežije reštart bez akéhokoľvek stavu za behu. Táto stránka popisuje, ako sa server buduje od nuly, ako sa prevádzkuje, a overené úskalia, na ktoré narazí každý, kto ho bude znovu budovať.

</div>

Ako sa požiadavka po doručení do B1App priradí k cirkvi a stránke, nájdete v článku [Smerovanie webov a viacero stránok](../architecture/websites).

## Komponenty

| Časť | Čo to je |
|---|---|
| EC2 inštancia | Windows Server; elastická IP **`3.23.251.61`** (nastavená v DNS cirkví po celom svete — IP je trvalá, inštancie sú jednorazové) |
| `C:\caddy\caddy.exe` | **Vlastný** build Caddy s modulom úložiska `techknowlogick/certmagic-s3` — štandardný Caddy nedokáže čítať úložisko certifikátov |
| `C:\caddy\Caddyfile` | Celá konfigurácia proxy: TLS na vyžiadanie, mapa `map` host→upstream, presmerovania www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Jeden riadok `{domain} {sub}.b1.church` pre každú smerovateľnú doménu, importovaný do bloku `map` v Caddyfile |
| `sync-hostmap.ps1` + úloha `CaddyHostmapSync` | Naplánovaná úloha (každých 5 minút a pri štarte, ako SYSTEM) obnovuje `hosts.map` z API a Caddy plynule znovu načíta konfiguráciu iba pri zmene |
| Služba Windows `caddy` (obal WinSW) | Spúšťa `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; automaticky sa reštartuje pri chybe. Caddy nepodporuje SCM, preto je obal potrebný |
| S3 bucket `churchapps-caddy-certs` | Zdieľané úložisko certifikátov (`region us-east-2`, prefix `certs`) — certifikáty prežijú znovuvytvorenie inštancie |
| IAM rola `CaddyRole` | Udeľuje inštancii prístup k S3; Caddy používa predvolený reťazec poverení AWS (žiadne kľúče v konfigurácii) |

## Dva koncové body API, na ktorých server závisí

Oba sú v Membership API. `authorize` je anonymný. `hostmap` od Api PR #67 (2026-08-16) vyžaduje hlavičku `x-internal-key: <INTERNAL_API_KEY>`. Skript `sync-hostmap.ps1` ju číta zo súboru `C:\caddy\internal-key.txt`:

| Koncový bod | Úloha |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Brána **`ask`** pre TLS na vyžiadanie v Caddy: `200 {"authorized":true}`, keď je hostiteľ (alebo pri hostiteľovi `www.` jeho apex) záznamom v `domains`; inak `404`. Toto je kontrola proti zneužitiu — Caddy nevydá certifikát pre hostiteľa, ktorý tento koncový bod odmietne |
| `GET /membership/domains/hostmap` | Vyžaduje `x-internal-key` (alebo JWT administrátora servera). Formát `text/plain`, zoradené a deduplikované riadky `{domain} {sub}.b1.church` (zohľadňuje stránky: doména priradená k sekundárnej stránke smeruje na subdoménu tejto stránky). Zdroj pre `map` |

## Priebeh požiadavky

1. Prehliadač preloží `mychurch.org` → `3.23.251.61` (záznam `A` pre apex alebo `CNAME proxy.b1.church`).
2. Caddy ukončí TLS. Ak je certifikát dostupný v S3, obslúži ho. Pri neznámom SNI sa opýta `authorize`; pri odpovedi 200 vydá certifikát na vyžiadanie cez Let's Encrypt; pri 404 **handshake odmietne** (žiadny certifikát, žiadna odpoveď — neznámy hostiteľ dostane odmietnutie TLS, nie chybu HTTP).
3. `map` preloží hostiteľa na `{sub}.b1.church`. `www.{apex}` dostane presmerovanie 302 na apex. Autorizovaný, ale nenamapovaný hostiteľ (čerstvo pridaná doména v rámci ≤5-minútového okna synchronizácie) dostane čistú chybu 404.
4. `reverse_proxy` sa pripojí na `{sub}.b1.church:443` s SNI a hlavičkou Host prepísanou na upstream, takže edge Vercel obslúži stránku B1App.
   Caddy tiež posiela pôvodnú doménu návštevníka ako `X-Church-Host` (Vercel prepisuje `X-Forwarded-Host` prepísaným hostiteľom). Middleware B1App ju akceptuje, iba ak `/domains/public/lookup/{host}` namapuje túto doménu na rovnaký `{sub}` ako hostiteľ požiadavky. Potom ju sprístupní ako `x-public-host` pre kanonickú hlavičku `Link`, `robots.txt` a `sitemap.xml`. Hlavička `x-public-host` poslaná klientom sa vždy odstráni. Schema.org `ChurchJsonLd` stále používa URL `b1.church`, pretože čítanie hlavičiek by tam stránky urobilo dynamickými.
5. Port 80 prepúšťa výzvy ACME HTTP-01 a všetko ostatné presmeruje pomocou 308 na https.

Propagácia novej domény: doména uložená v B1Admin sa stane smerovateľnou približne do 5 minút (úloha synchronizácie). Jej certifikát sa vytvorí pri prvej požiadavke HTTPS.

## Budovanie servera od nuly

Stručný postup vychádza z overenej praxe. Kompletný postup krok za krokom s príkazmi na kopírovanie je v prevádzkovom pracovnom priestore, nie v tomto repozitári. Najprv predpoklady, bez ktorých build nemá zmysel:

1. **IAM**: Pripojte `CaddyRole` (prístup k S3 do bucketu certifikátov) k inštancii. Overte cez IMDSv2 zo servera. Všimnite si, že holý GET na IMDS vracajúci 401 znamená len to, že IMDSv2 je vynútené, nie že chýba rola.
2. **Stav API**: `authorize` musí pre neexistujúcu doménu vrátiť 404 a `hostmap` (s hlavičkou `x-internal-key`) musí vrátiť 200, skôr než sa pustíte do ďalších krokov.

Potom:

3. **Binárny súbor**: Stiahnite vlastný build zo servisu buildov Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB oproti ~45 MB štandardnému; v čase písania v2.11.4). Výber modulu je dôležitý. `techknowlogick/certmagic-s3` používa kľúče `bucket`/`region`/`prefix`, ktoré zodpovedajú existujúcemu rozloženiu certifikátov. Fork `ss098` používa `host`/`endpoint` a **nenájde** existujúce certifikáty.
4. **Súbory**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (produkčný `INTERNAL_API_KEY`, jeden riadok) do `C:\caddy\`. Mapu raz naplňte cez `sync-hostmap.ps1 -NoReload`.
5. **Brány pred prvým spustením**: `caddy list-modules` musí zobraziť modul úložiska s3. `caddy adapt` musí v bloku úložiska vypísať `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`. `caddy validate` musí prejsť.
6. **Služba**: Nainštalujte cez WinSW (ID služby `caddy`, automatický reštart pri chybe, rotujúce logy). Beží ako LocalSystem, ktorý sa dostane na IMDS kvôli povereniam roly.
7. **Úloha synchronizácie**: Zaregistrujte `CaddyHostmapSync` (SYSTEM, každých 5 minút a pri štarte, limit vykonávania 4 minúty).
8. **Overenie pred prepnutím**: Vynúťte rozlíšenie domén na `127.0.0.1` pomocou `curl --resolve`. Server nemá skutočnú prevádzku, kým sa neprenesie EIP. Existujúca doména musí obsluhovať stránku s platným prenesenym certifikátom. `www.` musí dostať 302. Neznámy hostiteľ musí byť odmietnutý na úrovni TLS. A `Restart-Service caddy` musí naskočiť a obsluhovať **bez ručného opätovného nahrievania (priming)**. Práve tento test reštartu je zmyslom statického návrhu.
9. **Prepnutie**: Presuňte elastickú IP `3.23.251.61` na novú inštanciu. DNS cirkví sa nikdy nemení.

## Overené úskalia (získané na vlastnej koži — neregredovať)

| Úskalie | Príznak | Riešenie |
|---|---|---|
| `tls_server_name {vars.upstream}` v prenose reverse_proxy | Každá preposielaná doména vracia 502: zástupné symboly mapy sa **pri pokuse o TLS spojenie zmenia na prázdne** („either ServerName or InsecureSkipVerify must be specified“) | Použite zástupný symbol natívny pre prenos: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplicitné kľúče alebo nezmyselné riadky v `hosts.map` | Handler `map` v Caddy pri duplicitnom vstupnom kľúči **skončí chybou**. Jeden zlý riadok môže zhodiť celú konfiguráciu | Synchronizačný skript normalizuje medzery, zahadzuje chybne formátované riadky (celé odmietne až pri >20 % chybných), odstraňuje duplicity (vyhráva prvý výskyt) a zapisuje UTF-8 **bez BOM** (BOM poškodí prvý kľúč mapy). API tiež na zdroji filtruje prázdne domény a domény obsahujúce medzery |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Registrácia úlohy **potichu zlyhá** (XML mimo rozsahu, netermínovaná chyba) | Zostavte opakovanie ako inštanciu CIM `MSFT_TaskRepetitionPattern` s `Interval = "PT5M"` a bez trvania. Pridajte `ExecutionTimeLimit` 4 minúty, lebo prvé spustenie ako SYSTEM môže uviaznuť pri studenom vyhľadávaní TLS/CRL |

:::warning
Administratívne API počúva iba na `localhost:2019`. Starý režim runtime ho sprístupňoval vzdialene, aby Membership API mohlo posielať konfigurácie trás. Statický návrh vzdialené posielanie nepotrebuje a menší povrch je zámerný. `caddy reload` (spúšťaný lokálne synchronizačným skriptom) je jediný spotrebiteľ administratívneho API.
:::

:::info Starší režim: odosielanie konfigurácie za behu
`CaddyHelper` v API (a koncové body `/membership/domains/caddy` + `/caddy/init`) stále existujú ako návratová cesta k staremu režimu s konfiguráciou za behu. Plánuje sa ich odstránenie, keď bude statický server niekoľko týždňov stabilný. Potom budú jedinými bodmi integrácie `authorize` a `hostmap`.
:::

## Prevádzka

- **Logy**: rotujúce logy WinSW v `C:\caddy\` (štandardný výstup a chyby služby; chyby reverzného proxy sa zapisujú do `caddy-service.err.log`). História synchronizácie je v `C:\caddy\sync-hostmap.log`.
- **Vynútené obnovenie mapy**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Zmena konfigurácie**: Upravte `C:\caddy\Caddyfile`, potom spustite `caddy validate` a `caddy reload` (alebo `Restart-Service caddy`; reštarty sú bezpečné podľa návrhu).
- **Hromadné odstránenie domén** zámerne spustí ochranu proti zmenšeniu v synchronizačnom skripte. Starý `hosts.map` presuňte nabok a úlohu spustite znovu, aby sa prijalo zámerné veľké zmenšenie.
- **Pokyny DNS pre cirkvi sa nikdy nemenia**: apex `A 3.23.251.61` alebo `CNAME proxy.b1.church`.

## Súvisiace stránky

- [Smerovanie webov a viacero stránok](../architecture/websites) — ako sa preposlaná požiadavka priradí k cirkvi a stránke v B1App
- [Nasadenie API](./apis) — nasadenie Membership API, ktoré obsluhuje `authorize` a `hostmap`
