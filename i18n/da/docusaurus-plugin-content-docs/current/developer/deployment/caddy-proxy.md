---
title: "Caddy-proxy til egne domæner"
---

# Caddy-proxy til egne domæner

<div class="article-intro">

Kirkers egne domæner (`mychurch.org` → kirkens B1-hjemmeside) afsluttes på en enkelt Windows EC2-server, der kører Caddy. Serveren håndterer TLS-certifikaterne, slår hvert domæne op til dets `{sub}.b1.church`-side og videresender anmodningerne som reverse proxy med en omskrevet Host-header. Hele konfigurationen består af to filer: en statisk `Caddyfile` og en `hosts.map`, som opdateres fra Membership API'et. Derfor overlever den genstarter uden nogen tilstand under kørsel. Denne side beskriver, hvordan serveren bygges fra bunden, hvordan den drives, og de gotchas, der er afprøvet i praksis, og som rammer enhver, der genopbygger den.

</div>

Se [Websiteroutning og multi-site](../architecture/websites), for hvordan en anmodning finder frem til kirke og side i B1App, når den først er nået frem dertil.

## Komponenter

| Del | Hvad det er |
|---|---|
| EC2-instans | Windows Server; Elastic IP **`3.23.251.61`** (er indlejret i kirkers DNS over hele verden, så IP'en er permanent, mens instanser er engangsbrug) |
| `C:\caddy\caddy.exe` | **Tilpasset** Caddy-build med modulet `techknowlogick/certmagic-s3` til certifikatlagring. Standard-Caddy kan ikke læse certifikatlageret |
| `C:\caddy\Caddyfile` | Hele proxy-konfigurationen: TLS på forespørgsel, `map` fra host til upstream, omdirigeringer fra www til apex og fra `:80` til https |
| `C:\caddy\hosts.map` | Én linje `{domain} {sub}.b1.church` pr. domæne, der kan routes, importeret i `map`-blokken i Caddyfile |
| `sync-hostmap.ps1` + opgaven `CaddyHostmapSync` | Planlagt opgave (hvert 5. minut og ved opstart, som SYSTEM), der opdaterer `hosts.map` fra API'et og kun genindlæser Caddy gradvist, når der er ændringer |
| Windows-tjenesten `caddy` (WinSW-wrapper) | Kører `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` og genstarter automatisk ved fejl. Caddy understøtter ikke SCM, så en wrapper er nødvendig |
| S3-bucket `churchapps-caddy-certs` | Delt certifikatlager (`region us-east-2`, præfiks `certs`). Certifikaterne overlever genopbygning af instanser |
| IAM-rollen `CaddyRole` | Giver instansen S3-adgang. Caddy bruger AWS' standardkæde for legitimationsoplysninger, så der ligger ingen nøgler i konfigurationen |

## De to API-endpoints, serveren er afhængig af

Begge ligger i Membership API'et. `authorize` er anonymt. `hostmap` har krævet headeren `x-internal-key: <INTERNAL_API_KEY>` siden Api PR #67 (2026-08-16). `sync-hostmap.ps1` læser nøglen fra `C:\caddy\internal-key.txt`:

| Endpoint | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddys **`ask`-tjek for TLS på forespørgsel**: returnerer `200 {"authorized":true}`, når værten (eller, for en `www.`-vært, apex-domænet) findes som række i `domains`. Ellers `404`. Det er misbrugskontrollen: Caddy udsteder aldrig et certifikat for en vært, som dette endpoint afviser |
| `GET /membership/domains/hostmap` | Kræver `x-internal-key` (eller en JWT for server-admin). Returnerer `text/plain` med sorterede, deduplikerede linjer `{domain} {sub}.b1.church`. Er bevidst site-bevidst: et domæne, der er tildelt et sekundært site, peger på det sites subdomæne. Det er kilden til `map` |

## Forløb for en anmodning

1. Browseren slår `mychurch.org` op til `3.23.251.61` (apex-`A`-post eller `CNAME proxy.b1.church`).
2. Caddy afslutter TLS. Har den certifikatet liggende i S3, serveres det. Er SNI ukendt, spørges `authorize`. 200 betyder udstedelse på forespørgsel via Let's Encrypt. 404 betyder, at **handshaket afvises** (intet certifikat, intet svar). En ukendt vært får altså en TLS-afvisning, ikke en HTTP-fejl.
3. `map` oversætter værten til `{sub}.b1.church`. `www.{apex}` får en 302 til apex-domænet. En autoriseret, men ikke-kortlagt vært (et helt nyt domæne inden for det op til 5 minutter lange synkroniseringsvindue) får en ren 404.
4. `reverse_proxy` kontakter `{sub}.b1.church:443` med SNI, og Host omskrives til upstream, så Vercels edge serverer B1App-siden.
   Caddy sender også besøgendes oprindelige domæne som `X-Church-Host` (Vercel overskriver `X-Forwarded-Host` med den omskrevne Host). B1App-middleware accepterer den kun, når `/domains/public/lookup/{host}` kortlægger den til samme `{sub}` som anmodningens vært. Derefter eksponeres den som `x-public-host` til den kanoniske `Link`-header, `robots.txt` og `sitemap.xml`. Klientsendte `x-public-host` fjernes altid. Schema.org `ChurchJsonLd` bruger stadig `b1.church`-URL'en, for læsning af headere dér ville gøre siderne dynamiske.
5. Port 80 videresender ACME HTTP-01-udfordringer og sender alt andet videre med 308 til https.

Udbredelse af nye domæner: Et domæne, der gemmes i B1Admin, kan routes inden for ca. 5 minutter (synkroniseringsopgaven). Certifikatet udstedes ved første HTTPS-besøg.

## Opbygning af serveren fra bunden

Kondenseret fra den afprøvede procedure. Den fulde trin-for-trin-guide med kopierbare kommandoer findes i driftsarbejdsområdet og ikke i dette repo. Forudsætningerne kommer først, for uden dem fungerer opbygningen ikke:

1. **IAM**: Tilknyt `CaddyRole` (S3-adgang til certifikat-bucketen) til instansen. Bekræft det via IMDSv2 fra serveren. Bemærk, at et almindeligt IMDS-GET, der returnerer 401, blot betyder, at IMDSv2 er påkrævet, og ikke at der mangler en rolle.
2. **API-status**: `authorize` skal returnere 404 for et falsk domæne, og `hostmap` (med headeren `x-internal-key`) skal returnere 200, før noget andet gøres.

Derefter:

3. **Binær fil**: Hent en tilpasset build fra Caddys build-tjeneste: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (ca. 57 MB mod ca. 45 MB for standard, v2.11.4 på skrivetidspunktet). Valget af modul har betydning. `techknowlogick/certmagic-s3` bruger nøglerne `bucket`/`region`/`prefix`, som matcher det eksisterende certifikatlayout. Forken `ss098` bruger `host`/`endpoint` og **finder ikke** de eksisterende certifikater.
4. **Filer**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (produktions-`INTERNAL_API_KEY`, én linje) i `C:\caddy\`. Seed kortet én gang med `sync-hostmap.ps1 -NoReload`.
5. **Kontrol før første start**: `caddy list-modules` skal vise s3-lagringsmodulet. `caddy adapt` skal i lagringsblokken udlæse `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"`. `caddy validate` skal bestå.
6. **Tjeneste**: Installer via WinSW (tjeneste-id `caddy`, automatisk genstart ved fejl, roterende logs). Kører som LocalSystem, som kan nå IMDS for rollens legitimationsoplysninger.
7. **Synkroniseringsopgave**: Registrer `CaddyHostmapSync` (SYSTEM, hvert 5. minut og ved opstart, grænse for kørselstid på 4 minutter).
8. **Verificer før cutover** ved at tvinge domæner til `127.0.0.1` med `curl --resolve`. Serveren har ingen rigtig trafik, før EIP'en flyttes. Et eksisterende domæne skal serveres med et gyldigt, medflyttet certifikat. `www.` skal give 302. En ukendt vært skal TLS-afvises. Og `Restart-Service caddy` skal komme tilbage og servere **uden manuel genprimering**. Netop den genstarts-test er hele pointen med det statiske design.
9. **Go-live**: Flyt Elastic IP'en `3.23.251.61` til den nye instans. Kirkers DNS ændres aldrig.

## Gotchas fra praksis (lært på den hårde måde, må ikke regrediere)

| Gotcha | Symptom | Løsning |
|---|---|---|
| `tls_server_name {vars.upstream}` i reverse_proxy-transporten | Hvert proxiet domæne giver 502. Map-pladsholdere bliver **tomme på tidspunktet for TLS-forbindelsen** ("either ServerName or InsecureSkipVerify must be specified") | Brug transportens egen pladsholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dubletnøgler eller støjlinjer i `hosts.map` | Caddys `map`-handler **fejler hårdt ved en dubleret inputnøgle**. Én ødelagt linje kan slå hele konfigurationen ned | Synkroniseringsscriptet normaliserer whitespace, dropper misdannede linjer (afviser hele filen kun, hvis over 20 % er ugyldige), deduplikerer med første vinder og skriver UTF-8 **uden BOM** (en BOM ødelægger den første map-nøgle). API'et filtrerer også tomme domænerækker og rækker med mellemrum i domænet ved kilden |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Opgaveregistreringen **fejler stille** (XML uden for gyldigt interval, ikke-terminerende fejl) | Byg gentagelsen som en CIM-instans af `MSFT_TaskRepetitionPattern` med `Interval = "PT5M"` og uden varighed. Tilføj en `ExecutionTimeLimit` på 4 minutter, for den første SYSTEM-kørsel kan hænge på et koldt TLS/CRL-opslag |

:::warning
Admin-API'et binder kun til `localhost:2019`. Den ældre runtime-tilstand eksponerede det eksternt, så Membership API'et kunne sende routekonfigurationer. Det statiske design kræver ingen eksterne push, og den mindre overflade er bevidst. `caddy reload` (kørt lokalt af synkroniseringsscriptet) er det eneste, der bruger admin-API'et.
:::

:::info Ældre runtime-push
`CaddyHelper` i API'et (samt endpoints `/membership/domains/caddy` og `/caddy/init`) findes stadig som tilbagerulningssti til den gamle runtime-konfigurerede tilstand. De skal slettes, når den statiske server har været stabil i et par uger. Derefter er `authorize` og `hostmap` de eneste integrationspunkter.
:::

## Drift

- **Logs**: WinSW-roterende logs i `C:\caddy\` (tjenestens stdout/stderr. Fejl i reverse proxy havner i `caddy-service.err.log`). Synkroniseringshistorik i `C:\caddy\sync-hostmap.log`.
- **Tving opdatering af kortet**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Ændring af konfiguration**: Rediger `C:\caddy\Caddyfile` og kør derefter `caddy validate` + `caddy reload` (eller `Restart-Service caddy`. Genstarter er sikre by design).
- **Sletning af mange domæner** udløser synkroniseringsscriptets beskyttelse mod store fald, bevidst. Flyt den gamle `hosts.map` til side, og kør opgaven igen for at acceptere et bevidst stort fald.
- **DNS-instruktioner til kirker ændres aldrig**: apex `A 3.23.251.61` eller `CNAME proxy.b1.church`.

## Relaterede sider

- [Websiteroutning og multi-site](../architecture/websites). Hvordan den proxiede anmodning finder frem til kirke og side i B1App
- [API-udrulning](./apis). Udrulning af Membership API'et, der leverer `authorize`/`hostmap`
