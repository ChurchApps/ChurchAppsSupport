---
title: "Caddy-proxy for egne domener"
---

# Caddy-proxy for egne domener

<div class="article-intro">

Egne kirkedomener (`minkirke.org` → kirkens B1-nettsted) avsluttes på én enkelt Windows EC2-boks som kjører Caddy. Boksen eier TLS-sertifikatene, løser hvert domene til dets `{sub}.b1.church`-nettsted, og reverse-proxyer med en omskrevet Host-header. Hele konfigurasjonen består av to filer — en statisk `Caddyfile` og en `hosts.map` som oppdateres fra Membership-API-et — så den overlever omstarter uten kjøretidstilstand. Denne siden dekker hvordan boksen bygges fra bunnen av, hvordan den drives, og de feltprøvede fallgruvene som biter alle som bygger den på nytt.

</div>

For hvordan en forespørsel løses til en kirke/et nettsted når den har nådd B1App, se [Nettstedsruting og flere nettsteder](../architecture/websites).

## Komponenter

| Del | Hva det er |
|---|---|
| EC2-instans | Windows Server; Elastic IP **`3.23.251.61`** (innebygd i kirkers DNS over hele verden — IP-en er permanent, instansene er engangsbruk) |
| `C:\caddy\caddy.exe` | **Egen** Caddy-bygg med modulen `techknowlogick/certmagic-s3` for lagring — standard Caddy kan ikke lese sertifikatlageret |
| `C:\caddy\Caddyfile` | Hele proxy-konfigurasjonen: on-demand TLS, vert→oppstrøms-`map`, www→apex-omdirigeringer, `:80`→https |
| `C:\caddy\hosts.map` | Én `{domain} {sub}.b1.church`-linje per rutbart domene, importert inn i `map`-blokken i Caddyfile |
| `sync-hostmap.ps1` + oppgaven `CaddyHostmapSync` | Planlagt oppgave (hvert 5. minutt + ved oppstart, som SYSTEM) oppdaterer `hosts.map` fra API-et og laster Caddy gradvis på nytt kun ved endring |
| Windows-tjeneste `caddy` (WinSW-wrapper) | Kjører `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; automatisk omstart ved feil. Caddy er ikke SCM-bevisst, så en wrapper er nødvendig |
| S3-bøtte `churchapps-caddy-certs` | Delt sertifikatlagring (`region us-east-2`, prefiks `certs`) — sertifikatene overlever ombygging av instanser |
| IAM-rolle `CaddyRole` | Gir instansen S3-tilgang; Caddy bruker AWS' standard legitimasjonskjede (ingen nøkler i konfigurasjonen) |

## De to API-endepunktene boksen er avhengig av

Begge ligger på Membership-API-et. `authorize` er anonym; `hostmap` har krevd headeren `x-internal-key: <INTERNAL_API_KEY>` siden Api PR #67 (2026-08-16) — `sync-hostmap.ps1` leser den fra `C:\caddy\internal-key.txt`:

| Endepunkt | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddys **on-demand TLS `ask`-port**: `200 {"authorized":true}` når verten (eller, for en `www.`-vert, apexen) er en rad i `domains`; `404` ellers. Dette er misbrukskontrollen — Caddy utsteder ikke et sertifikat for en vert dette endepunktet avviser |
| `GET /membership/domains/hostmap` | Krever `x-internal-key` (eller et server-admin-JWT). `text/plain`, sorterte, deduplikerte `{domain} {sub}.b1.church`-linjer (nettstedsbevisst: et domene tildelt et sekundært nettsted kobles til det nettstedets underdomene). Kilden til `map` |

## Forespørselsflyt

1. Nettleseren løser `minkirke.org` → `3.23.251.61` (apex-`A`-post, eller `CNAME proxy.b1.church`).
2. Caddy avslutter TLS. Sertifikat tilgjengelig i S3 → server det; ukjent SNI → `authorize` spørres; 200 → utsted på forespørsel via Let's Encrypt; 404 → **håndtrykket avvises** (ingen sertifikat, ingen respons — en ukjent vert blir TLS-avvist, ikke en HTTP-feil).
3. `map` løser Host til `{sub}.b1.church`; `www.{apex}` får en 302 til apexen; en autorisert men ikke-kartlagt vert (et helt nytt domene innenfor synkvinduet på ≤5 minutter) får en ren 404.
4. `reverse_proxy` kobler til `{sub}.b1.church:443` med SNI og Host omskrevet til oppstrøms, så Vercels kant serverer B1App-nettstedet.
   Caddy sender også besøkendes opprinnelige domene som `X-Church-Host` (Vercel overskriver `X-Forwarded-Host` med den omskrevne Host). B1App-middlewaren aksepterer det kun når `/domains/public/lookup/{host}` kartlegger det til samme `{sub}` som forespørselsverten, og eksponerer det deretter som `x-public-host` for den kanoniske `Link`-headeren, `robots.txt` og `sitemap.xml`; klientsendt `x-public-host` fjernes alltid. Schema.org-`ChurchJsonLd` bruker fortsatt `b1.church`-URL-en (å lese headere der ville gjort sidene dynamiske).
5. Port 80 slipper gjennom ACME HTTP-01-utfordringer og 308-omdirigerer alt annet til https.

Propagering av nye domener: et domene lagret i B1Admin blir rutbart innen ~5 minutter (synkoppgaven); sertifikatet utstedes ved første HTTPS-treff.

## Bygge boksen fra bunnen av

Kondensert fra den feltprøvde prosedyren (full steg-for-steg med kopierbare kommandoer ligger i driftsarbeidsområdet, ikke i dette repoet). Forutsetninger først — bygget er dødt uten dem:

1. **IAM**: fest `CaddyRole` (S3-tilgang til sertifikatbøtten) til instansen. Verifiser via IMDSv2 fra boksen — merk at en bar IMDS-GET som returnerer 401 bare betyr at IMDSv2 håndheves, ikke «ingen rolle».
2. **API-helse**: `authorize` må returnere 404 for et falskt domene, og `hostmap` (med `x-internal-key`-headeren) må returnere 200 før noe annet.

Deretter:

3. **Binær**: last ned et tilpasset bygg fra Caddys byggetjeneste — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB mot ~45 MB for standard; v2.11.4 på skrivetidspunktet). Modulvalget betyr noe: `techknowlogick/certmagic-s3` bruker `bucket`/`region`/`prefix`-nøkler som samsvarer med det eksisterende sertifikatoppsettet; `ss098`-forken bruker `host`/`endpoint` og **finner ikke** de eksisterende sertifikatene.
4. **Filer**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (prod `INTERNAL_API_KEY`, én linje) til `C:\caddy\`; så kartet én gang med `sync-hostmap.ps1 -NoReload`.
5. **Porter før første start**: `caddy list-modules` må vise s3-lagringsmodulen; `caddy adapt` må sende ut `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` i lagringsblokken sin; `caddy validate` må bestå.
6. **Tjeneste**: installer via WinSW (tjeneste-ID `caddy`, automatisk omstart ved feil, rullerende logger). Kjører som LocalSystem, som når IMDS for rollelegitimasjonene.
7. **Synkoppgave**: registrer `CaddyHostmapSync` (SYSTEM, hvert 5. minutt + ved oppstart, 4-minutters kjøringsgrense).
8. **Verifiser før overgang** ved å tvinge domener til `127.0.0.1` med `curl --resolve` (boksen har ingen ekte trafikk før EIP-en flyttes): et eksisterende domene må serveres med et gyldig overført sertifikat; `www.` må gi 302; en ukjent vert må TLS-avvises; og `Restart-Service caddy` må komme tilbake og servere **uten manuell re-priming** — den omstart-testen er hele poenget med den statiske designen.
9. **Gå live**: reassosier Elastic IP `3.23.251.61` til den nye instansen. Kirkers DNS endres aldri.

## Feltprøvde fallgruver (lært på den harde måten — ikke gjør dem igjen)

| Fallgruve | Symptom | Løsning |
|---|---|---|
| `tls_server_name {vars.upstream}` i reverse_proxy-transporten | Hvert proxiet domene gir 502: map-plassholdere løses til **tom streng ved TLS-oppringingstidspunkt** («either ServerName or InsecureSkipVerify must be specified») | Bruk transport-native plassholderen: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dupliserte nøkler eller søppellinjer i `hosts.map` | Caddys `map`-handler **feiler hardt på en duplisert inputnøkkel** — én dårlig linje kan ta ned hele konfigurasjonen | Synkskriptet normaliserer mellomrom, dropper feilformede linjer (avviser helt bare hvis >20 % er dårlige), deduplikerer først-vinner, og skriver **BOM-fri** UTF-8 (en BOM ødelegger den første kartnøkkelen). API-et filtrerer også tomme/mellomrom-holdige domenerader ved kilden |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Oppgaveregistreringen **feiler stille** (XML utenfor rekkevidde, ikke-terminerende feil) | Bygg repetisjonen som en `MSFT_TaskRepetitionPattern`-CIM-instans med `Interval = "PT5M"` og uten varighet; legg til en 4-minutters `ExecutionTimeLimit` (den første SYSTEM-kjøringen kan henge på en kald TLS/CRL-oppslag) |

:::warning
Admin-API-et binder kun til `localhost:2019`. Den legacy kjøretidsmodusen eksponerte det eksternt slik at Membership-API-et kunne pushe rutekonfigurasjoner; den statiske designen trenger ingen eksterne pushes, og den mindre flaten er bevisst. `caddy reload` (kjørt lokalt av synkskriptet) er den eneste forbrukeren av admin-API-et.
:::

:::info Legacy kjøretids-push
`CaddyHelper` i API-et (og endepunktene `/membership/domains/caddy` + `/caddy/init`) finnes fortsatt som tilbakerullingsveien til den gamle kjøretidskonfigurerte modusen. De er planlagt slettet når den statiske boksen har vært stabil i et par uker — etter det er `authorize` + `hostmap` de eneste integrasjonspunktene.
:::

## Drift

- **Logger**: WinSW-rullerende logger i `C:\caddy\` (tjenestens stdout/err — reverse-proxy-feil havner i `caddy-service.err.log`); synkhistorikk i `C:\caddy\sync-hostmap.log`.
- **Tving en kartoppdatering**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfigurasjonsendring**: rediger `C:\caddy\Caddyfile`, deretter `caddy validate` + `caddy reload` (eller `Restart-Service caddy` — omstarter er trygge med design).
- **Masse-sletting av domener** utløser synkskriptets krympevakt med vilje; flytt det gamle `hosts.map` til side og kjør oppgaven på nytt for å godta en tilsiktet stor krymping.
- **DNS-instruksjoner for kirker er uendret for alltid**: apex `A 3.23.251.61` eller `CNAME proxy.b1.church`.

## Relaterte sider

- [Nettstedsruting og flere nettsteder](../architecture/websites) — hvordan den proxiede forespørselen løses til en kirke/et nettsted i B1App
- [API-utrulling](./apis) — utrulling av Membership-API-et som betjener `authorize`/`hostmap`
