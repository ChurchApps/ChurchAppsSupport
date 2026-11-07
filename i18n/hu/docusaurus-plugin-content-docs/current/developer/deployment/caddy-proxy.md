---
title: "Caddy egyéni domain proxy"
description: "Építsd meg és futtasd a Caddy fordított proxyt, amely a B1.church oldalainak egyedi gyülekezeti domaineit szolgálja ki, TLS-tanúsítványokkal, host-leképezéssel és ismert buktatókkal."
---

# Caddy egyéni domain proxy

<div class="article-intro">

Az egyéni egyházi domainek (`mychurch.org` → az egyház B1 webhelye) egyetlen, Caddyt futtató Windows EC2 gépen érkeznek be. A gép kezeli a TLS-tanúsítványokat, minden domaint feloldja a hozzá tartozó `{sub}.b1.church` webhelyre, és átírt Host fejléccel továbbítja a kéréseket (reverse proxy). Teljes konfigurációja két fájlból áll: egy statikus `Caddyfile` és a Membership API-ból frissített `hosts.map`. Így újraindítás után is működik, futásidejű állapot nélkül. Ez az oldal azt ismerteti, hogyan épül fel a gép nulláról, hogyan üzemeltetik, és mely, a gyakorlatban már kipróbált buktatókba futhat bele, aki újraépíti.

</div>

Arról, hogy egy kérés hogyan jut el egy egyházhoz vagy webhelyhez, miután megérkezett a B1App-hoz, lásd: [Webhely-útválasztás és több webhely](../architecture/websites.md).

## Komponensek

| Elem | Leírás |
|---|---|
| EC2 példány | Windows Server; rugalmas IP-cím **`3.23.251.61`** (világszerte be van égetve az egyházak DNS-ébe — az IP állandó, a példányok eldobhatók) |
| `C:\caddy\caddy.exe` | **Egyedi** Caddy build a `techknowlogick/certmagic-s3` tárolómodullal — a szabványos Caddy nem tudja olvasni a tanúsítványtárat |
| `C:\caddy\Caddyfile` | A teljes proxy-konfiguráció: igény szerinti TLS, host→upstream `map`, www→apex átirányítások, `:80`→https |
| `C:\caddy\hosts.map` | Soronként egy `{domain} {sub}.b1.church` sor minden útválasztható domainhez; a Caddyfile `map` blokkjába importálva |
| `sync-hostmap.ps1` + `CaddyHostmapSync` feladat | Ütemezett feladat (5 percenként és rendszerindításkor, SYSTEM jogosultsággal) frissíti a `hosts.map` fájlt az API-ból, és csak változás esetén tölti újra a Caddyt, zökkenőmentesen |
| `caddy` Windows szolgáltatás (WinSW csomagoló) | Futtatja a `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` parancsot; hiba esetén automatikus újraindítás. A Caddy nem SCM-kompatibilis, ezért csomagoló szükséges |
| S3 bucket `churchapps-caddy-certs` | Megosztott tanúsítvány-tárolás (`region us-east-2`, prefix `certs`) — a tanúsítványok túlélik a példány újraépítését |
| IAM szerepkör `CaddyRole` | S3 hozzáférést biztosít a példánynak; a Caddy az AWS alapértelmezett hitelesítési láncát használja (kulcsok nincsenek a konfigurációban) |

## A két API-végpont, amelytől a gép függ

Mindkettő a Membership API-n található. Az `authorize` anonim; a `hostmap` az Api #67-es PR (2026-08-16) óta megköveteli az `x-internal-key: <INTERNAL_API_KEY>` fejlécet. A `sync-hostmap.ps1` ezt a `C:\caddy\internal-key.txt` fájlból olvassa:

| Végpont | Szerep |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | A Caddy **igény szerinti TLS `ask` kapuja**: `200 {"authorized":true}`, ha a host (vagy `www.` host esetén annak apex domainje) szerepel a `domains` táblában; egyébként `404`. Ez a visszaélés elleni védelem: a Caddy nem állít ki tanúsítványt olyan hostra, amelyet ez a végpont elutasít |
| `GET /membership/domains/hostmap` | Megköveteli az `x-internal-key` fejlécet (vagy szerveradmin JWT-t). `text/plain`, rendezett, deduplikált `{domain} {sub}.b1.church` sorok (webhelyfüggő: a másodlagos webhelyhez rendelt domain arra a webhely-aldomainre mutat). Ez a `map` forrása |

## Kérési folyamat

1. A böngésző feloldja a `mychurch.org` → `3.23.251.61` címet (apex `A` rekord vagy `CNAME proxy.b1.church`).
2. A Caddy lezárja a TLS-t. Ha a tanúsítvány megvan az S3-ban → kiszolgálja. Ismeretlen SNI esetén az `authorize` végpontot kérdezi: 200 → igény szerint kiállítja a Let's Encrypt-en keresztül; 404 → **a kézfogást elutasítja** (nincs tanúsítvány, nincs válasz — egy ismeretlen host TLS-elutasítást kap, nem HTTP-hibát).
3. A `map` feloldja a hostot `{sub}.b1.church` címre. A `www.{apex}` 302-es átirányítást kap az apex domainre. Egy engedélyezett, de még nem leképezett host (egy frissen hozzáadott domain a legfeljebb 5 perces szinkronizálási ablakon belül) tiszta 404-et kap.
4. A `reverse_proxy` a `{sub}.b1.church:443` címet hívja SNI-val, a Host fejléc pedig át van írva az upstreamre, így a Vercel edge kiszolgálja a B1App webhelyet.
   A Caddy a látogató eredeti domainjét `X-Church-Host` fejlécként is elküldi (a Vercel felülírja az `X-Forwarded-Host` fejlécet az átírt Hosttal). A B1App middleware csak akkor fogadja el, ha a `/domains/public/lookup/{host}` ugyanarra a `{sub}`-ra képezi le, mint a kérés hostja. Ezután `x-public-host` néven teszi elérhetővé a kanonikus `Link` fejléchez, a `robots.txt`-hez és a `sitemap.xml`-hez. A kliens által küldött `x-public-host` mindig el lesz távolítva. A Schema.org `ChurchJsonLd` továbbra is a `b1.church` URL-t használja, mert ha itt olvasnánk a fejléceket, az oldalak dinamikussá válnának.
5. A 80-as port továbbítja az ACME HTTP-01 kihívásokat, a többi kérést 308-as átirányítással https-re irányítja.

Új domainek terjedése: a B1Admin-ban mentett domain körülbelül 5 percen belül útválaszthatóvá válik (a szinkronizálási feladat). Tanúsítványa az első HTTPS-kérésnél készül el.

## A gép újraépítése nulláról

A gyakorlatban bevált eljárásból tömörítve. A teljes, lépésenkénti, másolható parancsokat tartalmazó leírás az ops munkaterületen található, nem ebben a repóban. Előfeltételek először, mert előfeltételek nélkül az építés nem működik:

1. **IAM**: csatolja a `CaddyRole` szerepkört (S3 hozzáférés a tanúsítvány-buckethez) a példányhoz. Ellenőrizze a gépről IMDSv2-n keresztül. Vegye figyelembe, hogy egy sima IMDS GET 401-es válasza csak azt jelenti, hogy az IMDSv2 kényszerítve van, nem azt, hogy nincs szerepkör.
2. **API állapot**: az `authorize` 404-et kell adjon egy hamis domainre, a `hostmap` pedig (az `x-internal-key` fejléccel) 200-at, mielőtt bármi mást tenne.

Ezután:

3. **Bináris fájl**: töltse le az egyedi buildet a Caddy build szolgáltatásából: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB, a szabványos ~45 MB-os verzióhoz képest; v2.11.4 az írás idején). A modul megválasztása számít: a `techknowlogick/certmagic-s3` a `bucket`/`region`/`prefix` kulcsokat használja, amelyek megegyeznek a meglévő tanúsítvány-elrendezéssel. Az `ss098` fork `host`/`endpoint` kulcsokat használ, és **nem fogja megtalálni** a meglévő tanúsítványokat.
4. **Fájlok**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (az éles `INTERNAL_API_KEY`, egy sorban) a `C:\caddy\` mappába. A map-et egyszer töltse fel a `sync-hostmap.ps1 -NoReload` paranccsal.
5. **Kapuk az első indítás előtt**: a `caddy list-modules`-nak meg kell mutatnia az s3 tárolómodult. A `caddy adapt` kimenetének a tárolóblokkjában a `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` szerepelnie kell. A `caddy validate`-nek sikeresnek kell lennie.
6. **Szolgáltatás**: telepítse WinSW-n keresztül (szolgáltatás-azonosító `caddy`, automatikus újraindítás hiba esetén, forgó naplók). LocalSystem-ként fut, amely eléri az IMDS-t a szerepkör-hitelesítő adatokért.
7. **Szinkronizálási feladat**: regisztrálja a `CaddyHostmapSync` feladatot (SYSTEM, 5 percenként és induláskor, 4 perces végrehajtási korláttal).
8. **Ellenőrzés az átállás előtt**: a domaineket `127.0.0.1`-re kényszerítetten oldja fel a `curl --resolve` segítségével (a gépre nincs valós forgalom, amíg az EIP nem költözik). Egy meglévő domainnek érvényes, átvitt tanúsítvánnyal kell kiszolgálnia. A `www.` 302-est kell kapjon. Egy ismeretlen hostnak TLS-elutasítást kell kapnia. A `Restart-Service caddy` után a szolgáltatásnak **kézi újra-előkészítés nélkül** kell visszajönnie és kiszolgálnia. Ez az újraindítási teszt a statikus felépítés teljes célja.
9. **Éles indítás**: rendelje a `3.23.251.61` rugalmas IP-címet az új példányhoz. Az egyházak DNS-e soha nem változik.

## Gyakorlatban bevált buktatók (keservesen tanult tapasztalatok, ne térjen vissza hozzájuk)

| Buktató | Tünet | Megoldás |
|---|---|---|
| `tls_server_name {vars.upstream}` a reverse_proxy transzportban | Minden proxyzott domain 502-es hibát ad: a map helyőrzői **üresen oldódnak fel a TLS-kapcsolat kiépítésekor** ("either ServerName or InsecureSkipVerify must be specified") | Használja a transzport-natív helyőrzőt: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplikált kulcsok vagy szemét sorok a `hosts.map` fájlban | A Caddy `map` kezelője **kemény hibával leáll duplikált bemeneti kulcsnál**, így egyetlen hibás sor leállíthatja a teljes konfigurációt | A szinkronizáló szkript normalizálja a szóközöket, eldobja a hibás sorokat (csak akkor utasítja el az egészet, ha >20% hibás), duplikátumoknál az első előfordulást tartja meg, és **BOM nélküli** UTF-8-ban ír (a BOM elrontja az első map kulcsot). Az API is kiszűri a forrásnál az üres vagy szóközt tartalmazó domain sorokat |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | A feladat regisztrálása **csendben meghiúsul** (tartományon kívüli XML, nem végzetes hiba) | Építse az ismétlést `MSFT_TaskRepetitionPattern` CIM példányként, `Interval = "PT5M"` értékkel és időtartam nélkül. Adjon hozzá 4 perces `ExecutionTimeLimit` értéket (az első SYSTEM-futás hideg TLS/CRL lekérdezésnél beragadhat) |

:::warning
Az admin API csak a `localhost:2019` címen figyel. A régi futásidejű mód távolról is elérhetővé tette, hogy a Membership API útvonal-konfigurációkat tudjon küldeni. A statikus felépítés nem igényel távoli küldéseket, a kisebb felület szándékos. A `caddy reload` (amelyet a helyi szinkronizáló szkript futtat) az egyetlen admin API-fogyasztó.
:::

:::info Régi futásidejű push
Az API-ban lévő `CaddyHelper` (valamint a `/membership/domains/caddy` és `/caddy/init` végpontok) még mindig léteznek visszaállítási útvonalként a régi, futásidőben konfigurált módhoz. Törlésük tervben van, miután a statikus gép néhány hétig stabilan működött. Utána az `authorize` és a `hostmap` lesznek az egyetlen integrációs pontok.
:::

## Üzemeltetés

- **Naplók**: WinSW forgó naplók a `C:\caddy\` mappában (a szolgáltatás stdout/stderr, a reverse proxy hibái a `caddy-service.err.log` fájlba kerülnek). A szinkronizálás előzményei a `C:\caddy\sync-hostmap.log` fájlban találhatók.
- **Map frissítésének kényszerítése**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfigurációs módosítás**: szerkessze a `C:\caddy\Caddyfile` fájlt, majd futtassa a `caddy validate` + `caddy reload` parancsot (vagy `Restart-Service caddy`, az újraindítás tervezetten biztonságos).
- **Tömeges domain-törlés** szándékosan kiváltja a szinkronizáló szkript zsugorodás-védelmét. Egy szándékos nagy zsugorodás elfogadásához helyezze félre a régi `hosts.map` fájlt, és futtassa újra a feladatot.
- **Az egyházaknak szóló DNS-utasítások örökre változatlanok**: apex `A 3.23.251.61` vagy `CNAME proxy.b1.church`.

## Kapcsolódó oldalak

- [Webhely-útválasztás és több webhely](../architecture/websites.md): hogyan oldódik fel a proxyzott kérés egy egyházra vagy webhelyre a B1App-ban
- [API telepítés](./apis.md): a `authorize`/`hostmap` végpontokat kiszolgáló Membership API telepítése
