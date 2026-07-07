---
title: "Caddy egne-domene proxy"
---

# Caddy egne-domene proxy

<div class="article-intro">

Egne kirke domener (`mychurch.org` → kirken B1 nettsted) avslutter på en eneste Windows EC2 boks kjørende Caddy. Kassa eier TLS sertifikater, løse hver domene til sin `{sub}.b1.church` nettsted, og omvendt-proxy med ein reskriven vert header. Sin helt konfig er to filer — ein statisk `Caddyfile` og en `hosts.map` oppfrisk fra medlemskaps API — så den overlever omstart med null runtime tilstand. Denne siden dekker hvordan kassa er bygget fra bunnen av, hvordan den drift, og felt-testet fallgruver som vil bite noen som gjengir den.

</div>

For hvordan ein forespørsel løse til kirke/nettsted en gang det nå B1App, se [nettsted ruting og multi-nettsted](../architecture/websites).

## Komponenter

| Stykke | Hva det er |
|---|---|
| EC2 eksempel | Windows server; elast IP **`3.23.251.61`** (bakket inn i kirke DNS verden — IP er permanent, eksempler er disponibel) |
| `C:\caddy\caddy.exe` | **Egne** Caddy bygge med `techknowlogick/certmagic-s3` lagring modul — lager Caddy kan ikke les sert lagre |
| `C:\caddy\Caddyfile` | Hele proxy konfig: etterspørsmål TLS, vert→oppstrøm `map`, www→apex omdirigering, `:80`→https |
| `C:\caddy\hosts.map` | En `{domain} {sub}.b1.church` linje per rutbar domene, importert inn i Caddyfile `map` blokk |
| `sync-hostmap.ps1` + `CaddyHostmapSync` oppgave | Planlagt oppgave (hver 5 min + ved oppstart, som SYSTEM) oppfrisk `hosts.map` fra API og vennlig reload Caddy bare på endring |
| Windows tjeneste `caddy` (WinSW omslag) | Kjør `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-omstart på feil. Caddy er ikke SCM-medvitent, så omslag trengs |
| S3 sekk `churchapps-caddy-certs` | Delt sertifikat lagring (`region us-east-2`, prefiks `certs`) — sert overlev eksempel ombygging |
| IAM rolle `CaddyRole` | Gir eksemplet S3 tilgang; Caddy bruk AWS standard kredensial kjede (nei nøkler i konfig) |

## De to API endepunkter kassa avhenger av

Begge er anonym, på medlemskaps API:

| Endepunkt | Rolle |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy **etterspørsmål TLS `spør` port**: `200 {"authorized":true}` når vert (eller, for ein `www.` vert, dets apex) er en rad i `domains`; `404` ellers. Dette er overgrep kontroll — Caddy vil ikke utsted ein sert for ein vert denne endepunkt avvist |
| `GET /membership/domains/hostmap` | `text/plain`, sortert, deduplisert `{domain} {sub}.b1.church` linjer (nettsted-medvitent: ein domene tildelt ein andre nettsted ring den nettsted subdomene). Kilde av `map` |

## Forespørsel flyt

1. Nettleser løse `mychurch.org` → `3.23.251.61` (apex `A` posten, eller `CNAME proxy.b1.church`).
2. Caddy avslutter TLS. Sertifikat på hånd i S3 → betjene; ukjent SNI → `authorize` blir spurt; 200 → utsted på etterspørsmål via La oss krypter; 404 → **handskingen blir avvist** (nei sert, nei respons — ein ukjent vert får TLS-avvist, ikke ein HTTP feil).
3. Den `map` løse verten til `{sub}.b1.church`; `www.{apex}` få ein 302 til apex; ein autorisert-men-ukmappet vert (ein helt-ny domene innsiden ≤5-minutters synk vindu) få ein ren 404.
4. `reverse_proxy` ring `{sub}.b1.church:443` med SNI og vert gjenskrive til oppstrøm, så Vercel kant betjener B1App nettsted.
5. Port 80 passa ACME HTTP-01 utfordringer og 308-omdirigering alt annet til https.

Nye-domene propagering: ein domene lagret i B1Admin blir rutbar innsiden ~5 minutter (synk oppgave); dets sert blir laget på første HTTPS hit.

## Bygge kassa fra bunnen av

Kondensert fra felt-testet prosedyre (full trinn-for-trinn med copy-paste kommandoer lever i drift arbeidsområde, ikke denne repo). Forutsetninger først — bygg er død uten dem:

1. **IAM**: feste `CaddyRole` (S3 tilgang til sert sekk) til eksempel. Bekreft via IMDSv2 fra kassa — merk ein naken IMDS GET returnering 401 bare betyr IMDSv2 er håndhevet, ikke "nei rolle".
2. **API helse**: `authorize` må returnerer 404 for ein falsk domene og `hostmap` må returnerer 200 før noe som helst annet.

Så:

3. **Binær**: last ned ein egne bygge fra Caddy bygge tjeneste — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB mot ~45 MB lager; v2.11.4 på tids skriving). Modul valg betyr: `techknowlogick/certmagic-s3` bruker `bucket`/`region`/`prefix` nøkler som passer eksisterende sert layout; den `ss098` gaffel bruk `host`/`endpoint` og vil **ikke** finne eksisterende sert.
4. **Filer**: `Caddyfile` + `sync-hostmap.ps1` inn i `C:\caddy\`; frø kartet en gang med `sync-hostmap.ps1 -NoReload`.
5. **Porta før første start**: `caddy list-modules` må vise s3 lagring modul; `caddy adapt` må send `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` i dets lagring blokk; `caddy validate` må passa.
6. **Tjeneste**: installerer via WinSW (tjeneste id `caddy`, auto-omstart på feil, rullende logger). Kjør som lokalSystem, som når IMDS for rolle kredensial.
7. **Synk oppgave**: registrer `CaddyHostmapSync` (SYSTEM, hver 5 min + ved oppstart, 4-minutters utførelse grense).
8. **Bekreft pre-cutover** av kraft-løs domener til `127.0.0.1` med `curl --resolve` (kassa har nei ekte trafikk til EIP beveg): ein eksisterende domene må betjene med ein gyldig båret-over sert; `www.` må 302; ein ukjent vert må bli TLS-avvist; og `Restart-Service caddy` må kommer tilbake betjening **med nei manuell re-primer** — den omstart test er hele punkt av statisk design.
9. **Go-live**: re-assosiat elast IP `3.23.251.61` til ny eksempel. Kirke DNS aldri endringer.

## Felt-testet fallgruver (lært den harde måten — ikke regredert)

| Fallgruv | Symptom | Fix |
|---|---|---|
| `tls_server_name {vars.upstream}` i omvendt_proxy transport | Hver proxied domene 502s: kart plassholder løse **tom på TLS-ring tid** ("enten ServerName eller InsecureSkipVerify må bli oppgitt") | Bruk transport-innfødt plassholder: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Duplisert nøkler eller søppel linjer i `hosts.map` | Caddy `map` handler **hard-feil på ein duplisert inngang nøkkel** — en dårlig linje kan ta hele konfig ned | Synk script normaliser mellomrom, droppe velformat linjer (avvis helt bare hvis >20% er dårlig), dedup først-vin, og skriv **BOM-fri** UTF-8 (en BOM korrupt første kart nøkkel). API også filter tom/plass-innehål domene rader på kilden |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Oppgave registrering **stille mislykkes** (ut-av-område XML, ikke-avsluttende feil) | Bygge repetisjon som en `MSFT_TaskRepetitionPattern` CIM eksempel med `Interval = "PT5M"` og nei varigheit; legge til 4-minutters `ExecutionTimeLimit` (den første SYSTEM kjør kan henge på kaldt TLS/CRL oppslag) |

:::warning
Admin API bind til `localhost:2019` bare. Den eldre runtime modus avslørte det fjern så medlemskaps API kunne push rute konfig; statisk design trenger nei fjern push, og mindre overflate er bevisst. `caddy reload` (kjør lokalt av synk script) er den eneste admin-API forbruker.
:::

:::info eldre runtime push
`CaddyHelper` i API (og `/membership/domains/caddy` + `/caddy/init` endepunkter) fortsatt eksisterer som tilbakefallet sti til gamle runtime-konfigurert modus. De er planlagt for slettings en gang statisk boks har blitt stabil for et par uker — etter det, `authorize` + `hostmap` er den eneste integrasjon punkt.
:::

## Drift

- **Logger**: WinSW rullende logger i `C:\caddy\` (tjeneste stdout/err — omvendt-proxy feil lande i `caddy-service.err.log`); synk historie i `C:\caddy\sync-hostmap.log`.
- **Kraft ein kart oppfrisk**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfig endring**: redigering `C:\caddy\Caddyfile`, så `caddy validate` + `caddy reload` (eller `Restart-Service caddy` — omstart er sikker ved design).
- **Masse domene slettings** tripp synk script krympe vakt ved design; beveg gamle `hosts.map` til siden og re-kjør oppgave for å godta ein bevisst stor krympe.
- **DNS instruksjon for kirker er uendret på evig**: apex `A 3.23.251.61` eller `CNAME proxy.b1.church`.

## Relaterte sider

- [nettsted ruting og multi-nettsted](../architecture/websites) — hvordan proxied forespørsel løse til kirke/nettsted i B1App
- [API deployment](./apis) — deployment medlemskaps API som betjener `authorize`/`hostmap`
