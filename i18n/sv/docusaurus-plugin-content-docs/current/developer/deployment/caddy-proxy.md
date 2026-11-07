---
title: "Caddy-proxy för egna domäner"
---

# Caddy-proxy för egna domäner

<div class="article-intro">

Egna domäner för kyrkor (`mychurch.org` → kyrkans B1-webbplats) tas emot av en enda Windows EC2-server som kör Caddy. Servern äger TLS-certifikaten, kopplar varje domän till dess `{sub}.b1.church`-webbplats och vidarebefordrar trafiken med ett omskrivet Host-huvud. Hela konfigurationen består av två filer, en statisk `Caddyfile` och en `hosts.map` som uppdateras från Membership API:t. Därför klarar servern omstarter utan något körtidstillstånd. Den här sidan beskriver hur servern byggs från grunden, hur den används i drift och de beprövade fallgropar som den som bygger om servern kommer att stöta på.

</div>

Information om hur en förfrågan kopplas till en kyrka eller webbplats i B1App, när den väl nått fram, finns i [Webbplatsroutning och flera webbplatser](../architecture/websites).

## Komponenter

| Del | Beskrivning |
|---|---|
| EC2-instans | Windows Server; Elastic IP **`3.23.251.61`** (finns i kyrkornas DNS världen över. IP-adressen är permanent, instanserna är utbytbara) |
| `C:\caddy\caddy.exe` | **Anpassad** Caddy-version med lagringsmodulen `techknowlogick/certmagic-s3`. Standard-Caddy kan inte läsa certifikatlagret |
| `C:\caddy\Caddyfile` | Hela proxykonfigurationen: TLS på begäran, `map` från värd till uppströmsserver, omdirigering från www till apex och från `:80` till https |
| `C:\caddy\hosts.map` | En rad `{domain} {sub}.b1.church` per domän som kan routas, importeras i `map`-blocket i Caddyfile |
| `sync-hostmap.ps1` + uppgiften `CaddyHostmapSync` | Schemalagd uppgift (var 5:e minut och vid start, som SYSTEM) som uppdaterar `hosts.map` från API:t och laddar om Caddy på ett kontrollerat sätt, endast när något har ändrats |
| Windows-tjänsten `caddy` (WinSW-omslag) | Kör `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` och startar om automatiskt vid fel. Caddy känner inte till SCM, så ett omslag krävs |
| S3-bucketen `churchapps-caddy-certs` | Gemensam lagring för certifikat (`region us-east-2`, prefix `certs`). Certifikaten överlever ombyggnad av instanser |
| IAM-rollen `CaddyRole` | Ger instansen åtkomst till S3. Caddy använder AWS standardkedjan för autentiseringsuppgifter, så inga nycklar finns i konfigurationen |

## De två API-endpoints som servern är beroende av

Båda finns i Membership API:t. `authorize` är anonym. `hostmap` kräver huvudet `x-internal-key: <INTERNAL_API_KEY>` sedan Api PR #67 (2026-08-16). `sync-hostmap.ps1` läser nyckeln från `C:\caddy\internal-key.txt`:

| Endpoint | Roll |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddys **`ask`-grind för TLS på begäran**: `200 {"authorized":true}` när värden (eller, för en värd som börjar med `www.`, dess apex) finns som rad i `domains`. Annars `404`. Det här är skyddet mot missbruk: Caddy utfärdar inget certifikat för en värd som den här endpointen avvisar |
| `GET /membership/domains/hostmap` | Kräver `x-internal-key` (eller en JWT för serveradministratör). `text/plain` med sorterade, deduplicerade rader `{domain} {sub}.b1.church`. Raderna är medvetna om webbplatser: en domän som tilldelats en sekundär webbplats pekar mot den webbplatsens subdomän. Källan för `map` |

## Förfrågningsflöde

1. Webbläsaren slår upp `mychurch.org` → `3.23.251.61` (apex-posten `A`, eller `CNAME proxy.b1.church`).
2. Caddy avslutar TLS. Finns certifikatet i S3 → servera det. Är SNI okänt → fråga `authorize`. Svar 200 → utfärda på begäran via Let's Encrypt. Svar 404 → **handskakningen avvisas** (inget certifikat, inget svar. En okänd värd får alltså ett TLS-avslag, inte ett HTTP-fel).
3. `map` matchar värden mot `{sub}.b1.church`. `www.{apex}` får en 302 till apex. En auktoriserad men ännu inte mappad värd (en helt ny domän inom det högst 5 minuter långa synkfönstret) får ett rent 404-svar.
4. `reverse_proxy` ansluter till `{sub}.b1.church:443` med SNI och med Host omskriven till uppströmsservern, så att Vercels edge levererar B1App-webbplatsen. Caddy skickar dessutom besökarens ursprungliga domän som `X-Church-Host` (Vercel skriver över `X-Forwarded-Host` med den omskrivna Host-värden). B1App-mellanlagret godkänner den bara när `/domains/public/lookup/{host}` kopplar den till samma `{sub}` som förfrågans värd. Därefter exponeras den som `x-public-host` för den kanoniska `Link`-headern, `robots.txt` och `sitemap.xml`. Klientskickad `x-public-host` tas alltid bort. Schema.org-typen `ChurchJsonLd` använder fortfarande URL:en på `b1.church`, eftersom läsning av headers där skulle göra sidorna dynamiska.
5. Port 80 släpper igenom ACME HTTP-01-utmaningar och skickar allt annat vidare med 308 till https.

Spridning av nya domäner: en domän som sparats i B1Admin blir routbar inom cirka 5 minuter (synkuppgiften). Certifikatet utfärdas vid första HTTPS-anropet.

## Bygga servern från grunden

Sammanfattning av det beprövade förfarandet. Den fullständiga steg-för-steg-guiden med kopierbara kommandon finns i driftsarbetsytan, inte i det här arkivet. Förutsättningarna måste uppfyllas först. Utan dem fungerar inte bygget:

1. **IAM**: koppla `CaddyRole` (S3-åtkomst till certifikatbucketen) till instansen. Kontrollera via IMDSv2 från servern. Observera att en vanlig IMDS-förfrågan som returnerar 401 bara betyder att IMDSv2 är påtvingat, inte att det saknas en roll.
2. **API-hälsa**: `authorize` måste returnera 404 för en påhittad domän, och `hostmap` (med huvudet `x-internal-key`) måste returnera 200 innan något annat görs.

Sedan:

3. **Binärfil**: hämta en anpassad version från Caddys byggtjänst: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (cirka 57 MB, mot cirka 45 MB för standardversionen. v2.11.4 när detta skrevs). Valet av modul spelar roll. `techknowlogick/certmagic-s3` använder nycklarna `bucket`/`region`/`prefix`, som matchar den befintliga certifikatlayouten. Forken `ss098` använder `host`/`endpoint` och kommer **inte** att hitta de befintliga certifikaten.
4. **Filer**: `Caddyfile`, `sync-hostmap.ps1` och `internal-key.txt` (produktionens `INTERNAL_API_KEY`, en rad) i `C:\caddy\`. Fyll i map-filen en gång med `sync-hostmap.ps1 -NoReload`.
5. **Kontroller före första start**: `caddy list-modules` måste visa lagringsmodulen s3. `caddy adapt` måste ge `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` i lagringsblocket. `caddy validate` måste lyckas.
6. **Tjänst**: installera med WinSW (tjänst-id `caddy`, automatisk omstart vid fel, roterande loggar). Körs som LocalSystem, som når IMDS för rollens autentiseringsuppgifter.
7. **Synkuppgift**: registrera `CaddyHostmapSync` (SYSTEM, var 5:e minut och vid start, med en gräns på 4 minuter för körningen).
8. **Verifiering före övergång**: testa genom att tvinga domänerna till `127.0.0.1` med `curl --resolve`. Servern har ingen riktig trafik förrän Elastic IP flyttats. En befintlig domän måste visa sidan med ett giltigt, överfört certifikat. `www.` måste ge 302. En okänd värd måste få TLS-avslag. Och `Restart-Service caddy` måste ge tillbaka en fungerande server **utan manuell återuppladdning av data**. Omstartstestet är hela poängen med den statiska designen.
9. **Övergång**: koppla om Elastic IP `3.23.251.61` till den nya instansen. Kyrkornas DNS ändras aldrig.

## Beprövade fallgropar (lärt på det hårda sättet, får inte återinföras)

| Fallgrop | Symptom | Åtgärd |
|---|---|---|
| `tls_server_name {vars.upstream}` i reverse_proxy-transporten | Varje proxad domän ger 502. Map-platshållarna blir **tomma vid TLS-anslutningen** ("either ServerName or InsecureSkipVerify must be specified") | Använd transportens egen platshållare: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dubbletter eller skräprader i `hosts.map` | Caddys `map`-hanterare **avbryter med fel vid en dubblett i indatanyckeln**. En enda felaktig rad kan slå ut hela konfigurationen | Synkskriptet normaliserar blanksteg, tar bort felaktiga rader (avvisar hela filen först om fler än 20 % är felaktiga), tar bort dubbletter så att den första vinner, och skriver UTF-8 **utan BOM** (en BOM förstör den första map-nyckeln). API:t filtrerar också bort tomma domänrader och rader med mellanslag redan vid källan |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Registreringen av uppgiften **misslyckas tyst** (XML utanför tillåtet intervall, icke-avbrytande fel) | Bygg upprepningen som en CIM-instans av `MSFT_TaskRepetitionPattern` med `Interval = "PT5M"` och utan varaktighet. Lägg till en `ExecutionTimeLimit` på 4 minuter, eftersom den första körningen som SYSTEM kan hänga sig vid en kall TLS- eller CRL-uppslagning |

:::warning
Admin-API:t lyssnar bara på `localhost:2019`. Det gamla körtidsläget exponerade det på distans, så att Membership API:t kunde skicka rutt-konfigurationer. Den statiska designen behöver inga fjärruppdateringar, och den mindre exponeringen är avsiktlig. `caddy reload` (som synkskriptet kör lokalt) är den enda konsumenten av admin-API:t.
:::

:::info Äldre push i körtid
`CaddyHelper` i API:t (samt endpointarna `/membership/domains/caddy` och `/caddy/init`) finns kvar som återställningsväg till det gamla läget med konfiguration i körtid. De ska tas bort när den statiska servern har varit stabil i ett par veckor. Därefter är `authorize` och `hostmap` de enda integrationspunkterna.
:::

## Drift

- **Loggar**: WinSW:s roterande loggar i `C:\caddy\` (tjänstens stdout/stderr. Fel i reverse proxy hamnar i `caddy-service.err.log`). Synkhistoriken finns i `C:\caddy\sync-hostmap.log`.
- **Tvinga fram en uppdatering av map-filen**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Ändring i konfigurationen**: redigera `C:\caddy\Caddyfile` och kör sedan `caddy validate` + `caddy reload` (eller `Restart-Service caddy`. Omstarter är säkra enligt designen).
- **Massradering av domäner** utlöser synkskriptets spärr mot krympning, vilket är avsiktligt. Flytta den gamla `hosts.map` åt sidan och kör uppgiften igen för att godkänna en avsiktlig stor minskning.
- **DNS-instruktionerna för kyrkor ändras aldrig**: apex `A 3.23.251.61` eller `CNAME proxy.b1.church`.

## Relaterade sidor

- [Webbplatsroutning och flera webbplatser](../architecture/websites): hur en proxad förfrågan kopplas till en kyrka eller webbplats i B1App
- [API-driftsättning](./apis): driftsättning av Membership API:t som tillhandahåller `authorize` och `hostmap`
