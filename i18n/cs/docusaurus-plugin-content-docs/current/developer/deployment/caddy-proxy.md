---
title: "Proxy Caddy pro vlastní domény"
description: "Sestavte a spusťte reverzní proxy Caddy, která obsluhuje vlastní domény církví pro weby B1.church, včetně certifikátů TLS, mapování hostitelů a úskalí."
---

# Proxy Caddy pro vlastní domény

<div class="article-intro">

Vlastní domény církví (`mychurch.org` → webové stránky církve v B1) končí na jediném počítači Windows na EC2, na kterém běží Caddy. Tento počítač spravuje certifikáty TLS, převádí každou doménu na její web `{sub}.b1.church` a přeposílá požadavky (reverse proxy) s přepsanou hlavičkou Host. Celá jeho konfigurace je tvořena dvěma soubory: statickým `Caddyfile` a souborem `hosts.map`, který se obnovuje z Membership API. Počítač proto přežije restart bez jakéhokoli stavu za běhu. Tato stránka popisuje, jak se počítač sestavuje od začátku, jak se provozuje a jaká osvědčená úskalí čekají každého, kdo ho bude znovu stavět.

</div>

Informace o tom, jak požadavek po dosažení B1App přiřadí církvi nebo webu, najdete v článku [Směrování webu a více webů](../architecture/websites.md).

## Komponenty

| Součást | Popis |
|---|---|
| Instance EC2 | Windows Server; elastická IP **`3.23.251.61`** (zapsaná v DNS církví po celém světě. IP je trvalá, instance jsou jednorázové) |
| `C:\caddy\caddy.exe` | **Vlastní** sestavení Caddy s modulem úložiště `techknowlogick/certmagic-s3`. Standardní Caddy nedokáže číst úložiště certifikátů |
| `C:\caddy\Caddyfile` | Celá konfigurace proxy: TLS na vyžádání, `map` host→upstream, přesměrování z www na apex, `:80`→https |
| `C:\caddy\hosts.map` | Jeden řádek `{domain} {sub}.b1.church` pro každou směrovatelnou doménu, importovaný do bloku `map` v Caddyfile |
| `sync-hostmap.ps1` a úloha `CaddyHostmapSync` | Naplánovaná úloha (každých 5 minut a při startu, jako SYSTEM) obnovuje `hosts.map` z API a Caddy znovu načte jen při změně |
| Služba Windows `caddy` (obal WinSW) | Spouští `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` s automatickým restartem při selhání. Caddy není integrován s SCM (Service Control Manager), proto je obal nutný |
| Bucket S3 `churchapps-caddy-certs` | Sdílené úložiště certifikátů (`region us-east-2`, prefix `certs`). Certifikáty přežijí přestavbu instance |
| Role IAM `CaddyRole` | Uděluje instanci přístup k S3. Caddy používá výchozí řetězec přihlašovacích údajů AWS (žádné klíče v konfiguraci) |

## Dva koncové body API, na kterých počítač závisí

Oba jsou v Membership API. `authorize` je anonymní. `hostmap` od Api PR #67 (2026-08-16) vyžaduje hlavičku `x-internal-key: <INTERNAL_API_KEY>`. Skript `sync-hostmap.ps1` ji čte ze souboru `C:\caddy\internal-key.txt`:

| Koncový bod | Účel |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Brána **`ask` pro TLS na vyžádání** v Caddy: vrací `200 {"authorized":true}`, pokud je hostitel (nebo u hostitele začínajícího na `www.` jeho apex) záznamem v `domains`, jinak `404`. Jde o kontrolu zneužití: Caddy nevystaví certifikát pro hostitele, který tento koncový bod odmítne |
| `GET /membership/domains/hostmap` | Vyžaduje `x-internal-key` (nebo JWT správce serveru). Vrací `text/plain` seřazené a deduplikované řádky `{domain} {sub}.b1.church` (s ohledem na weby: doména přiřazená druhotnému webu směřuje na subdoménu tohoto webu). Je zdrojem `map` |

## Průběh požadavku

1. Prohlížeč přeloží `mychurch.org` na `3.23.251.61` (záznam `A` pro apex nebo `CNAME proxy.b1.church`).
2. Caddy ukončí TLS. Pokud je certifikát k dispozici v S3, obslouží požadavek. Pokud je SNI neznámé, dotáže se `authorize`. Odpověď 200 znamená vystavení certifikátu na vyžádání přes Let's Encrypt. Odpověď 404 znamená, že se **handshake odmítne** (žádný certifikát, žádná odpověď). Neznámá doména tedy dostane odmítnutí TLS, ne chybu HTTP.
3. `map` převede hostitele na `{sub}.b1.church`. `www.{apex}` dostane přesměrování 302 na apex. Autorizovaný hostitel bez mapování (zcela nová doména v rámci synchronizačního okna maximálně 5 minut) dostane čistou odpověď 404.
4. `reverse_proxy` se připojí k `{sub}.b1.church:443` s SNI a s hlavičkou Host přepsanou na upstream, takže edge služby Vercel obslouží web B1App. Caddy také posílá původní doménu návštěvníka v hlavičce `X-Church-Host` (Vercel přepisuje `X-Forwarded-Host` přepsaným hostitelem). Middleware B1App ji přijme jen tehdy, když `/domains/public/lookup/{host}` mapuje tuto doménu na stejný `{sub}` jako hostitel požadavku. Poté ji zpřístupní jako `x-public-host` pro kanonickou hlavičku `Link`, `robots.txt` a `sitemap.xml`. Hodnota `x-public-host` poslaná klientem se vždy odstraní. Schema.org `ChurchJsonLd` stále používá URL `b1.church` (čtení hlaviček by tam stránky učinilo dynamickými).
5. Port 80 propouští výzvy ACME HTTP-01 a všechny ostatní požadavky přesměrovává kódem 308 na https.

Šíření nové domény: doména uložená v B1Admin se stane směrovatelnou během přibližně 5 minut (úloha synchronizace). Její certifikát se vystaví při prvním HTTPS požadavku.

## Sestavení počítače od začátku

Zhuštěno z osvědčeného postupu. Úplný krok za krokem s příkazy k zkopírování je v provozním pracovním prostoru, ne v tomto repozitáři. Nejprve předpoklady, bez nich sestavení nefunguje:

1. **IAM**: připojte k instanci roli `CaddyRole` (přístup k S3 pro bucket certifikátů). Ověřte přes IMDSv2 z tohoto počítače. Prosté GET na IMDS vracející 401 znamená jen, že je vynucen IMDSv2, a ne že chybí role.
2. **Stav API**: `authorize` musí pro neexistující doménu vrátit 404 a `hostmap` (s hlavičkou `x-internal-key`) musí vrátit 200, než cokoli dalšího.

Poté:

3. **Binárka**: stáhněte vlastní sestavení ze služby sestavení Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (přibližně 57 MB oproti 45 MB standardní verze; v době psaní v2.11.4). Volba modulu je důležitá. `techknowlogick/certmagic-s3` používá klíče `bucket`/`region`/`prefix`, které odpovídají stávajícímu rozložení certifikátů. Fork `ss098` používá `host`/`endpoint` a **nenajde** stávající certifikáty.
4. **Soubory**: `Caddyfile`, `sync-hostmap.ps1` a `internal-key.txt` (produkční `INTERNAL_API_KEY`, jeden řádek) zkopírujte do `C:\caddy\`. Mapu jednorázově naplňte příkazem `sync-hostmap.ps1 -NoReload`.
5. **Kontroly před prvním spuštěním**: `caddy list-modules` musí zobrazit modul úložiště s3. `caddy adapt` musí v bloku úložiště vypsat `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`. `caddy validate` musí projít.
6. **Služba**: nainstalujte přes WinSW (ID služby `caddy`, automatický restart při selhání, rotující logy). Běží jako LocalSystem, který se dostane na IMDS pro přihlašovací údaje role.
7. **Úloha synchronizace**: zaregistrujte `CaddyHostmapSync` (SYSTEM, každých 5 minut a při spuštění, limit provádění 4 minuty).
8. **Ověření před přepnutím**: vyřešte domény na `127.0.0.1` pomocí `curl --resolve` (dokud se EIP nepřesune, počítač nemá žádný skutečný provoz). Existující doména musí fungovat s platným přeneseným certifikátem. `www.` musí vracet 302. Neznámý hostitel musí dostat odmítnutí TLS. A `Restart-Service caddy` se musí vrátit do provozu **bez ručního opětovného načtení**. Právě tento test restartu je smyslem statického návrhu.
9. **Spuštění**: přidružte elastickou IP `3.23.251.61` k nové instanci. DNS církví se nikdy nemění.

## Osvědčená úskalí (zjištěná tvrdou cestou, nevracejte se k nim)

| Úskalí | Příznak | Řešení |
|---|---|---|
| `tls_server_name {vars.upstream}` v transportu reverse_proxy | Každá proxy doména vrací 502. Zástupné znaky mapy se při vytáčení TLS vyhodnotí **jako prázdné** (`either ServerName or InsecureSkipVerify must be specified`) | Použijte zástupný znak nativní pro transport: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplicitní klíče nebo nesmyslné řádky v `hosts.map` | Handler `map` v Caddy **na duplicitním vstupním klíči tvrdě selže**. Jeden špatný řádek může shodit celou konfiguraci | Synchronizační skript normalizuje mezery, zahazuje chybně formátované řádky (celek odmítne, jen pokud je špatných více než 20 %), deduplikuje podle prvního výskytu a zapisuje UTF-8 **bez BOM** (BOM poškodí první klíč mapy). API také filtruje prázdné řádky domén a řádky obsahující mezery už u zdroje |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Registrace úlohy **tiše selže** (XML mimo rozsah, nefatální chyba) | Opakování sestavte jako instanci CIM `MSFT_TaskRepetitionPattern` s `Interval = "PT5M"` a bez délky. Přidejte `ExecutionTimeLimit` 4 minuty (první spuštění jako SYSTEM se může zaseknout při studeném vyhledávání TLS/CRL) |

:::warning
Administrační API se váže pouze na `localhost:2019`. Starší režim za běhu jej zpřístupňoval vzdáleně, aby Membership API mohlo posílat konfigurace tras. Statický návrh vzdálené odesílání nepotřebuje a menší povrch je záměrný. Jediným konzumentem administračního API je `caddy reload` (spouštěný lokálně synchronizačním skriptem).
:::

:::info Starší push za běhu
`CaddyHelper` v API (a koncové body `/membership/domains/caddy` + `/caddy/init`) stále existují jako návratová cesta na starý režim s konfigurací za běhu. Jsou naplánované k odstranění, až bude statický počítač stabilní zhruba dva týdny. Potom budou jedinými body integrace `authorize` a `hostmap`.
:::

## Provoz

- **Logy**: rotující logy WinSW v `C:\caddy\` (stdout/stderr služby. Chyby reverse proxy končí v `caddy-service.err.log`). Historie synchronizace je v `C:\caddy\sync-hostmap.log`.
- **Vynucené obnovení mapy**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Změna konfigurace**: upravte `C:\caddy\Caddyfile` a poté spusťte `caddy validate` + `caddy reload` (nebo `Restart-Service caddy`. Restarty jsou díky návrhu bezpečné).
- **Hromadné smazání domén** záměrně spustí pojistku proti zmenšení v synchronizačním skriptu. Pokud chcete záměrné velké zmenšení přijmout, přesuňte staré `hosts.map` stranou a úlohu znovu spusťte.
- **Pokyny pro DNS církví se nemění nikdy**: apex `A 3.23.251.61` nebo `CNAME proxy.b1.church`.

## Související stránky

- [Směrování webu a více webů](../architecture/websites.md). Jak se proxovaný požadavek v B1App přiřadí církvi nebo webu
- [Nasazení API](./apis.md). Nasazení Membership API, které poskytuje `authorize` a `hostmap`
