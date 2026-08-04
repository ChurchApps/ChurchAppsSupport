---
title: "Caddy-proxy for egendefinerte domener"
---

# Caddy-proxy for egendefinerte domener

<div class="article-intro">

Egendefinerte kirkedomener (`mychurch.org` → kirkens B1-nettsted) avsluttes ved én enkelt Windows EC2-boks som kjører Caddy. Boksen eier TLS-sertifikatene, løser hvert domene til dets `{sub}.b1.church`-nettsted, og reverse-proxyer med en omskrevet Host-header. Hele konfigurasjonen er to filer — en statisk `Caddyfile` og en `hosts.map` oppfrisket fra Membership API-et — slik at den overlever omstarter med null kjøretidstilstand. Denne siden dekker hvordan boksen bygges fra bunnen av, hvordan den driftes, og de feltestede fallgruvene som vil bite alle som gjenskaper den.

</div>

For hvordan en forespørsel løses til en kirke/et nettsted når den når B1App, se [Nettstedruting og multi-nettsted](../architecture/websites).

## Komponenter

| Del | Hva det er |
|---|---|
| EC2-instans | Windows Server; elastisk IP **`3.23.251.61`** (bakt inn i kirke-DNS verden over — IP-en er permanent, instansene er forbruksvare) |
| `C:\caddy\caddy.exe` | **Egendefinert** Caddy-bygg med lagringsmodulen `techknowlogick/certmagic-s3` — vanlig Caddy kan ikke lese sertifikatlageret |
| `C:\caddy\Caddyfile` | Hele proxy-konfigurasjonen: on-demand TLS, verts-til-oppstrøms-`map`, www→apex-omdirigeringer, `:80`→https |
| `C:\caddy\hosts.map` | Én `{domain} {sub}.b1.church`-linje per rutbart domene, importert inn i Caddyfile-ens `map`-blokk |
| `sync-hostmap.ps1` + oppgaven `CaddyHostmapSync` | Planlagt oppgave (hvert 5. minutt + ved oppstart, som SYSTEM) oppfrisker `hosts.map` fra APIet og laster Caddy skånsomt på nytt bare ved endring |
| Windows-tjenesten `caddy` (WinSW-wrapper) | Kjører `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-omstart ved feil. Caddy er ikke SCM-bevisst, så en wrapper er nødvendig |
| S3-bøtte `churchapps-caddy-certs` | Delt sertifikatlagring (`region us-east-2`, prefiks `certs`) — sertifikater overlever instansombygginger |
| IAM-rolle `CaddyRole` | Gir instansen S3-tilgang; Caddy bruker AWS' standard legitimasjonskjede (ingen nøkler i konfigurasjonen) |

## De to API-endepunktene boksen er avhengig av

Begge er anonyme, på Membership API-et:

| Endepunkt | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddys **on-demand-TLS-`ask`-sperre**: `200 {"authorized":true}` når verten (eller, for en `www.`-vert, dens apex) er en rad i `domains`; `404` ellers. Dette er misbrukskontrollen — Caddy vil ikke utstede et sertifikat for en vert dette endepunktet avviser |
| `GET /membership/domains/hostmap` | `text/plain`, sorterte, dedupliserte `{domain} {sub}.b1.church`-linjer (nettstedbevisst: et domene tildelt et andre nettsted ringer opp det nettstedets subdomene). Kilden til `map`-en |

## Forespørselsflyt

1. Nettleseren løser `mychurch.org` → `3.23.251.61` (apex `A`-post, eller `CNAME proxy.b1.church`).
2. Caddy avslutter TLS. Sertifikat på hånden i S3 → betjener; ukjent SNI → `authorize` spørres; 200 → utstedes on-demand via Let's Encrypt; 404 → **håndtrykket avvises** (ikke noe sertifikat, ikke noe svar — en ukjent vert får TLS-avslag, ikke en HTTP-feil).
3. `map`-en løser Host til `{sub}.b1.church`; `www.{apex}` får en 302 til apex; en autorisert-men-ukartlagt vert (et helt nytt domene innenfor det ≤5-minutters synkroniseringsvinduet) får en ren 404.
4. `reverse_proxy` ringer opp `{sub}.b1.church:443` med SNI og Host omskrevet til oppstrømmen, slik at Vercels kant betjener B1App-nettstedet.
5. Port 80 slipper gjennom ACME HTTP-01-utfordringer og 308-omdirigerer alt annet til https.

Propagering av nytt domene: et domene lagret i B1Admin blir rutbart innen ~5 minutter (synkroniseringsoppgaven); sertifikatet dets genereres ved det første HTTPS-treffet.

## Å bygge boksen fra bunnen av

Kondensert fra den feltestede prosedyren (fullstendig trinn-for-trinn med kopier-og-lim-kommandoer ligger i driftsarbeidsområdet, ikke dette repoet). Forutsetninger først — bygget er dødt uten dem:

1. **IAM**: fest `CaddyRole` (S3-tilgang til sertifikatbøtten) til instansen. Bekreft via IMDSv2 fra boksen — merk at en bar IMDS GET som returnerer 401 bare betyr at IMDSv2 er håndhevet, ikke "ingen rolle".
2. **API-helse**: `authorize` må returnere 404 for et falskt domene, og `hostmap` må returnere 200 før noe annet.

Deretter:

3. **Binær**: last ned et egendefinert bygg fra Caddys byggetjeneste — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB mot ~45 MB standard; v2.11.4 ved skrivetidspunktet). Modulvalget betyr noe: `techknowlogick/certmagic-s3` bruker nøklene `bucket`/`region`/`prefix` som matcher det eksisterende sertifikatoppsettet; `ss098`-forken bruker `host`/`endpoint` og vil **ikke** finne de eksisterende sertifikatene.
4. **Filer**: `Caddyfile` + `sync-hostmap.ps1` inn i `C:\caddy\`; frø kartet én gang med `sync-hostmap.ps1 -NoReload`.
5. **Sperrer før første oppstart**: `caddy list-modules` må vise s3-lagringsmodulen; `caddy adapt` må sende ut `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` i sin lagringsblokk; `caddy validate` må passere.
6. **Tjeneste**: installer via WinSW (tjeneste-id `caddy`, auto-omstart ved feil, rullerende logger). Kjører som LocalSystem, som når IMDS for rolle-legitimasjonen.
7. **Synkroniseringsoppgave**: registrer `CaddyHostmapSync` (SYSTEM, hvert 5. minutt + ved oppstart, 4-minutters kjøretidsgrense).
8. **Verifiser før overgangen** ved å tvinge oppløsning av domener til `127.0.0.1` med `curl --resolve` (boksen har ingen ekte trafikk før den elastiske IP-en flyttes): et eksisterende domene må betjene med et gyldig medbrakt sertifikat; `www.` må gi 302; en ukjent vert må bli TLS-avvist; og `Restart-Service caddy` må komme tilbake og betjene **uten manuell re-priming** — den omstart-testen er hele poenget med den statiske designen.
9. **Live-lansering**: reassosier den elastiske IP-en `3.23.251.61` til den nye instansen. Kirke-DNS endres aldri.

## Feltestede fallgruver (lært den harde veien — må ikke gjeninnføres)

| Fallgruve | Symptom | Fiks |
|---|---|---|
| `tls_server_name {vars.upstream}` i reverse_proxy-transporten | Hvert proxyet domene gir 502: kartets plassholdere løses **tomme ved TLS-oppringingstidspunktet** ("either ServerName or InsecureSkipVerify must be specified") | Bruk den transportnative plassholderen: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dupliserte nøkler eller søppellinjer i `hosts.map` | Caddys `map`-håndterer **feiler hardt ved en duplisert inngangsnøkkel** — én dårlig linje kan ta ned hele konfigurasjonen | Synkroniseringsskriptet normaliserer mellomrom, dropper feilformede linjer (avviser bare i sin helhet hvis >20 % er dårlige), dedupliserer med først-vinner, og skriver **BOM-fri** UTF-8 (en BOM ødelegger den første kart-nøkkelen). APIet filtrerer også bort tomme/mellomrom-holdende domenerader ved kilden |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Oppgaveregistrering **feiler i stillhet** (XML utenfor gyldig område, ikke-avsluttende feil) | Bygg repetisjonen som en `MSFT_TaskRepetitionPattern`-CIM-instans med `Interval = "PT5M"` og ingen varighet; legg til en 4-minutters `ExecutionTimeLimit` (den første SYSTEM-kjøringen kan henge på et kaldt TLS-/CRL-oppslag) |

:::warning
Admin-APIet binder seg kun til `localhost:2019`. Den eldre kjøretidsmodusen eksponerte det eksternt slik at Membership API-et kunne pushe rutekonfigurasjoner; den statiske designen trenger ingen eksterne push, og den mindre overflaten er bevisst. `caddy reload` (kjørt lokalt av synkroniseringsskriptet) er den eneste admin-API-konsumenten.
:::

:::info Eldre kjøretids-push
`CaddyHelper` i APIet (og endepunktene `/membership/domains/caddy` + `/caddy/init`) eksisterer fortsatt som fallback-stien til den gamle kjøretidskonfigurerte modusen. De er planlagt for sletting når den statiske boksen har vært stabil et par uker — etter det er `authorize` + `hostmap` de eneste integrasjonspunktene.
:::

## Drift

- **Logger**: WinSW rullerende logger i `C:\caddy\` (tjeneste-stdout/-err — reverse-proxy-feil havner i `caddy-service.err.log`); synkroniseringshistorikk i `C:\caddy\sync-hostmap.log`.
- **Tving en kartoppfrisking**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfigurasjonsendring**: rediger `C:\caddy\Caddyfile`, deretter `caddy validate` + `caddy reload` (eller `Restart-Service caddy` — omstarter er trygge etter design).
- **Masseslettinger av domener** utløser synkroniseringsskriptets krympevakt etter design; flytt den gamle `hosts.map` til side og kjør oppgaven på nytt for å godta en tilsiktet stor krymping.
- **DNS-instruksjonene for kirker er uendret for alltid**: apex `A 3.23.251.61` eller `CNAME proxy.b1.church`.

## Relaterte sider

- [Nettstedruting og multi-nettsted](../architecture/websites) — hvordan den proxyerte forespørselen løses til en kirke/et nettsted i B1App
- [API-distribusjon](./apis) — distribuering av Membership API-et som betjener `authorize`/`hostmap`
