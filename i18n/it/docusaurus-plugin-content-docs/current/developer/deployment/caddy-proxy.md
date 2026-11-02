---
title: "Proxy Caddy per domini personalizzati"
---

# Proxy Caddy per domini personalizzati

<div class="article-intro">

I domini personalizzati delle chiese (`mychurch.org` → il sito B1 della chiesa) terminano su un unico server Windows EC2 che esegue Caddy. Il server gestisce i certificati TLS, risolve ogni dominio nel suo sito `{sub}.b1.church` ed esegue il reverse-proxy con un header Host riscritto. L'intera configurazione è composta da due file -- un `Caddyfile` statico e un `hosts.map` aggiornato dall'API di Membership -- quindi sopravvive ai riavvii senza stato di runtime. Questa pagina spiega come il server viene costruito da zero, come funziona e le trappole verificate sul campo che colpiscono chiunque lo ricostruisca.

</div>

Per capire come una richiesta si risolve in una chiesa/sito una volta arrivata a B1App, vedi [Routing del sito web e multi-sito](../architecture/websites).

## Componenti

| Elemento | Descrizione |
|---|---|
| Istanza EC2 | Windows Server; Elastic IP **`3.23.251.61`** (incorporato nel DNS delle chiese in tutto il mondo -- l'IP è permanente, le istanze sono sostituibili) |
| `C:\caddy\caddy.exe` | Build **personalizzata** di Caddy con il modulo di archiviazione `techknowlogick/certmagic-s3` -- Caddy standard non può leggere l'archivio dei certificati |
| `C:\caddy\Caddyfile` | L'intera configurazione del proxy: TLS on-demand, `map` host→upstream, redirect www→apice, `:80`→https |
| `C:\caddy\hosts.map` | Una riga `{domain} {sub}.b1.church` per ogni dominio instradabile, importata nel blocco `map` del Caddyfile |
| `sync-hostmap.ps1` + attività `CaddyHostmapSync` | Attività pianificata (ogni 5 minuti e all'avvio, come SYSTEM) che aggiorna `hosts.map` dall'API e ricarica Caddy in modo graduale solo se cambia |
| Servizio Windows `caddy` (wrapper WinSW) | Esegue `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; riavvio automatico in caso di errore. Caddy non è compatibile con SCM, quindi serve un wrapper |
| Bucket S3 `churchapps-caddy-certs` | Archivio condiviso dei certificati (`region us-east-2`, prefisso `certs`) -- i certificati sopravvivono alla ricostruzione delle istanze |
| Ruolo IAM `CaddyRole` | Concede all'istanza l'accesso S3; Caddy usa la catena di credenziali predefinita di AWS (nessuna chiave nella configurazione) |

## I due endpoint dell'API da cui dipende il server

Entrambi sull'API di Membership. `authorize` è anonimo; `hostmap` richiede l'header `x-internal-key: <INTERNAL_API_KEY>` dalla PR #67 dell'Api (2026-08-16) -- `sync-hostmap.ps1` lo legge da `C:\caddy\internal-key.txt`:

| Endpoint | Ruolo |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Il **gate `ask` del TLS on-demand** di Caddy: `200 {"authorized":true}` quando l'host (oppure, per un host `www.`, il suo apice) è una riga di `domains`; `404` altrimenti. È il controllo anti-abuso -- Caddy non emette un certificato per un host che questo endpoint rifiuta |
| `GET /membership/domains/hostmap` | Richiede `x-internal-key` (oppure un JWT di amministratore del server). `text/plain`, righe `{domain} {sub}.b1.church` ordinate e senza duplicati (consapevole dei siti: un dominio assegnato a un sito secondario punta al sottodominio di quel sito). Fonte della `map` |

## Flusso della richiesta

1. Il browser risolve `mychurch.org` → `3.23.251.61` (record `A` sull'apice, oppure `CNAME proxy.b1.church`).
2. Caddy termina il TLS. Se il certificato è disponibile in S3 → lo serve; SNI sconosciuto → viene interrogato `authorize`; 200 → emette on-demand tramite Let's Encrypt; 404 → **l'handshake viene rifiutato** (nessun certificato, nessuna risposta -- un host sconosciuto riceve un rifiuto TLS, non un errore HTTP).
3. La `map` risolve l'Host in `{sub}.b1.church`; `www.{apice}` riceve un 302 verso l'apice; un host autorizzato ma non ancora mappato (un dominio appena creato entro la finestra di sincronizzazione di ≤5 minuti) riceve un 404 pulito.
4. `reverse_proxy` si connette a `{sub}.b1.church:443` con SNI e Host riscritti sull'upstream, così il edge di Vercel serve il sito B1App.
   Caddy invia anche il dominio originale del visitatore come `X-Church-Host` (Vercel sovrascrive `X-Forwarded-Host` con l'Host riscritto). Il middleware di B1App lo accetta solo quando `/domains/public/lookup/{host}` lo associa allo stesso `{sub}` dell'host della richiesta, poi lo espone come `x-public-host` per l'header `Link` canonico, `robots.txt` e `sitemap.xml`; un `x-public-host` inviato dal client viene sempre eliminato. Lo schema JSON-LD `ChurchJsonLd` continua a usare l'URL `b1.church` (leggere gli header lì renderebbe le pagine dinamiche).
5. La porta 80 supera le sfide ACME HTTP-01 e reindirizza con 308 tutto il resto verso https.

Propagazione dei nuovi domini: un dominio salvato in B1Admin diventa instradabile entro circa 5 minuti (l'attività di sincronizzazione); il suo certificato viene emesso al primo accesso HTTPS.

## Costruire il server da zero

Riassunto della procedura verificata sul campo (la procedura completa passo per passo con i comandi da copiare si trova nello spazio di lavoro operativo, non in questo repository). Prima i prerequisiti -- senza di essi la costruzione non funziona:

1. **IAM**: collega `CaddyRole` (accesso S3 al bucket dei certificati) all'istanza. Verifica tramite IMDSv2 dal server -- nota che una semplice GET a IMDS che restituisce 401 significa solo che IMDSv2 è obbligatorio, non che manca il ruolo.
2. **Stato dell'API**: `authorize` deve restituire 404 per un dominio inesistente, e `hostmap` (con l'header `x-internal-key`) deve restituire 200 prima di qualsiasi altra cosa.

Poi:

3. **Binario**: scarica una build personalizzata dal servizio di build di Caddy -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB contro i ~45 MB della versione standard; v2.11.4 al momento della stesura). La scelta del modulo conta: `techknowlogick/certmagic-s3` usa le chiavi `bucket`/`region`/`prefix` che corrispondono al layout dei certificati esistente; il fork `ss098` usa `host`/`endpoint` e **non troverà** i certificati esistenti.
4. **File**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (la `INTERNAL_API_KEY` di produzione, una riga) in `C:\caddy\`; popola la mappa una volta con `sync-hostmap.ps1 -NoReload`.
5. **Controlli prima del primo avvio**: `caddy list-modules` deve mostrare il modulo di archiviazione s3; `caddy adapt` deve produrre `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` nel blocco di archiviazione; `caddy validate` deve passare.
6. **Servizio**: installa tramite WinSW (id del servizio `caddy`, riavvio automatico in caso di errore, log a rotazione). Viene eseguito come LocalSystem, che raggiunge IMDS per le credenziali del ruolo.
7. **Attività di sincronizzazione**: registra `CaddyHostmapSync` (SYSTEM, ogni 5 minuti + all'avvio, limite di esecuzione di 4 minuti).
8. **Verifica prima del passaggio**: risolvi forzatamente i domini su `127.0.0.1` con `curl --resolve` (il server non riceve traffico reale finché l'EIP non viene spostato): un dominio esistente deve servire con il certificato valido riportato; `www.` deve restituire 302; un host sconosciuto deve essere rifiutato a livello TLS; e `Restart-Service caddy` deve tornare a servire **senza alcuna riattivazione manuale** -- quel test di riavvio è l'intero scopo del progetto statico.
9. **Messa in produzione**: riassegna l'Elastic IP `3.23.251.61` alla nuova istanza. Il DNS delle chiese non cambia mai.

## Trappole verificate sul campo (apprese a caro prezzo -- non regredire)

| Trappola | Sintomo | Soluzione |
|---|---|---|
| `tls_server_name {vars.upstream}` nel transport di reverse_proxy | Ogni dominio proxato restituisce 502: i segnaposto della mappa si risolvono **vuoti al momento della connessione TLS** ("either ServerName or InsecureSkipVerify must be specified") | Usa il segnaposto nativo del transport: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chiavi duplicate o righe spazzatura in `hosts.map` | Il gestore `map` di Caddy **genera un errore fatale su una chiave di input duplicata** -- una sola riga errata può mandare giù l'intera configurazione | Lo script di sincronizzazione normalizza gli spazi, scarta le righe malformate (rifiutando tutto in blocco solo se >20% sono errate), elimina i duplicati tenendo il primo, e scrive UTF-8 **senza BOM** (un BOM danneggia la prima chiave della mappa). L'API filtra anche alla fonte le righe di dominio vuote o con spazi |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | La registrazione dell'attività **fallisce silenziosamente** (XML fuori intervallo, errore non terminante) | Costruisci la ripetizione come istanza CIM `MSFT_TaskRepetitionPattern` con `Interval = "PT5M"` e senza durata; aggiungi un `ExecutionTimeLimit` di 4 minuti (la prima esecuzione SYSTEM può bloccarsi su una ricerca TLS/CRL a freddo) |

:::warning
L'API di amministrazione è in ascolto solo su `localhost:2019`. La modalità runtime legacy la esponeva da remoto così l'API di Membership poteva inviare le configurazioni delle rotte; il progetto statico non richiede invii remoti, e la superficie più ridotta è voluta. `caddy reload` (eseguito localmente dallo script di sincronizzazione) è l'unico consumatore dell'API di amministrazione.
:::

:::info Modalità legacy a spinta runtime
`CaddyHelper` nell'API (e gli endpoint `/membership/domains/caddy` + `/caddy/init`) esistono ancora come percorso di rollback verso la vecchia modalità configurata a runtime. Sono previsti per l'eliminazione una volta che il server statico si sarà stabilizzato per un paio di settimane -- dopo di che, `authorize` + `hostmap` saranno gli unici punti di integrazione.
:::

## Operatività

- **Log**: log a rotazione di WinSW in `C:\caddy\` (stdout/err del servizio -- gli errori del reverse-proxy finiscono in `caddy-service.err.log`); cronologia della sincronizzazione in `C:\caddy\sync-hostmap.log`.
- **Forzare un aggiornamento della mappa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Modifica della configurazione**: modifica `C:\caddy\Caddyfile`, poi `caddy validate` + `caddy reload` (oppure `Restart-Service caddy` -- i riavvii sono sicuri per progettazione).
- **L'eliminazione massiva di domini fa scattare la guardia di riduzione dello script di sincronizzazione** per progettazione; sposta da parte il vecchio `hosts.map` e riesegui l'attività per accettare una riduzione voluta e ampia.
- **Le istruzioni DNS per le chiese non cambiano mai**: `A` sull'apice `3.23.251.61` oppure `CNAME proxy.b1.church`.

## Pagine correlate

- [Routing del sito web e multi-sito](../architecture/websites) — come la richiesta proxata si risolve in una chiesa/sito in B1App
- [Deployment dell'API](./apis) — distribuzione dell'API di Membership che serve `authorize`/`hostmap`
