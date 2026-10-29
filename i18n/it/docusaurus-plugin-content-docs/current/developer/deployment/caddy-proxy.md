---
title: "Proxy Caddy per domini personalizzati"
---

# Proxy Caddy per domini personalizzati

<div class="article-intro">

I domini personalizzati delle chiese (`mychurch.org` → il sito B1 della chiesa) terminano su un'unica istanza Windows EC2 che esegue Caddy. L'istanza gestisce i certificati TLS, risolve ogni dominio nel relativo sito `{sub}.b1.church` e fa da reverse proxy riscrivendo l'header Host. Tutta la sua configurazione è composta da due file — un `Caddyfile` statico e un `hosts.map` aggiornato dall'API di Membership — quindi sopravvive ai riavvii senza alcuno stato di runtime. Questa pagina descrive come si costruisce l'istanza da zero, come si gestisce e quali sono le insidie, verificate sul campo, in cui rischia di incappare chiunque la ricostruisca.

</div>

Per capire come una richiesta viene risolta in una chiesa/sito una volta arrivata a B1App, vedi [Routing dei siti web e multi-sito](../architecture/websites).

## Componenti

| Elemento | Descrizione |
|---|---|
| Istanza EC2 | Windows Server; Elastic IP **`3.23.251.61`** (inserito nel DNS delle chiese in tutto il mondo — l'IP è permanente, le istanze sono sostituibili) |
| `C:\caddy\caddy.exe` | Build **personalizzata** di Caddy con il modulo di storage `techknowlogick/certmagic-s3` — Caddy standard non può leggere l'archivio dei certificati |
| `C:\caddy\Caddyfile` | L'intera configurazione del proxy: TLS on-demand, `map` da host a upstream, redirect da www all'apex, `:80` → https |
| `C:\caddy\hosts.map` | Una riga `{domain} {sub}.b1.church` per ogni dominio instradabile, importata nel blocco `map` del Caddyfile |
| `sync-hostmap.ps1` + task `CaddyHostmapSync` | Task pianificato (ogni 5 minuti e all'avvio, come SYSTEM) aggiorna `hosts.map` dall'API e ricarica Caddy in modo graduale solo in caso di modifiche |
| Servizio Windows `caddy` (wrapper WinSW) | Esegue `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; riavvio automatico in caso di errore. Caddy non è compatibile con SCM, quindi serve un wrapper |
| Bucket S3 `churchapps-caddy-certs` | Archivio condiviso dei certificati (`region us-east-2`, prefisso `certs`) — i certificati sopravvivono alla ricostruzione delle istanze |
| Ruolo IAM `CaddyRole` | Concede all'istanza l'accesso a S3; Caddy usa la catena di credenziali predefinita di AWS (nessuna chiave nella configurazione) |

## I due endpoint API da cui dipende l'istanza

Entrambi sull'API di Membership. `authorize` è anonimo; `hostmap` richiede l'header `x-internal-key: <INTERNAL_API_KEY>` dalla PR #67 dell'Api (2026-08-16) — `sync-hostmap.ps1` lo legge da `C:\caddy\internal-key.txt`:

| Endpoint | Ruolo |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Il **gate `ask` del TLS on-demand** di Caddy: `200 {"authorized":true}` quando l'host (o, per un host `www.`, il suo apex) è una riga della tabella `domains`; `404` altrimenti. È il controllo contro gli abusi — Caddy non emette un certificato per un host che questo endpoint rifiuta |
| `GET /membership/domains/hostmap` | Richiede `x-internal-key` (oppure un JWT di server admin). `text/plain`, righe `{domain} {sub}.b1.church` ordinate e deduplicate (consapevole del sito: un dominio assegnato a un sito secondario punta al sottodominio di quel sito). Fonte del `map` |

## Flusso della richiesta

1. Il browser risolve `mychurch.org` → `3.23.251.61` (record `A` sull'apex, oppure `CNAME proxy.b1.church`).
2. Caddy termina il TLS. Certificato presente in S3 → viene servito; SNI sconosciuto → si interroga `authorize`; 200 → emissione on-demand tramite Let's Encrypt; 404 → **l'handshake viene rifiutato** (nessun certificato, nessuna risposta — un host sconosciuto riceve un rifiuto TLS, non un errore HTTP).
3. Il `map` risolve l'Host in `{sub}.b1.church`; `www.{apex}` riceve un 302 verso l'apex; un host autorizzato ma non presente nella mappa (un dominio appena creato, nella finestra di sincronizzazione di al massimo 5 minuti) riceve un 404 pulito.
4. `reverse_proxy` si connette a `{sub}.b1.church:443` con SNI e Host riscritti verso l'upstream, così l'edge di Vercel serve il sito B1App.
   Caddy invia anche il dominio originale del visitatore come `X-Church-Host` (Vercel sovrascrive `X-Forwarded-Host` con l'Host riscritto). Il middleware di B1App lo accetta solo quando `/domains/public/lookup/{host}` lo associa allo stesso `{sub}` dell'host della richiesta, quindi lo espone come `x-public-host` per l'header `Link` canonico, `robots.txt` e `sitemap.xml`; un `x-public-host` inviato dal client viene sempre rimosso. Il `ChurchJsonLd` di Schema.org usa ancora l'URL `b1.church` (leggere gli header in quel punto renderebbe le pagine dinamiche).
5. La porta 80 supera le sfide ACME HTTP-01 e reindirizza tutto il resto a https con un 308.

Propagazione di un nuovo dominio: un dominio salvato in B1Admin diventa instradabile entro circa 5 minuti (il task di sincronizzazione); il suo certificato viene emesso alla prima richiesta HTTPS.

## Costruire l'istanza da zero

Riassunto della procedura verificata sul campo (la guida passo passo con i comandi pronti all'uso si trova nello spazio operativo, non in questo repository). Prima i prerequisiti — senza di essi la build non funziona:

1. **IAM**: collega `CaddyRole` (accesso S3 al bucket dei certificati) all'istanza. Verificalo tramite IMDSv2 dall'istanza — nota che una semplice GET IMDS che restituisce 401 significa solo che IMDSv2 è obbligatorio, non che manca un ruolo.
2. **Stato dell'API**: `authorize` deve restituire 404 per un dominio inesistente e `hostmap` (con l'header `x-internal-key`) deve restituire 200 prima di qualsiasi altra operazione.

Poi:

3. **Binario**: scarica una build personalizzata dal servizio di build di Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (circa 57 MB contro i circa 45 MB della versione standard; v2.11.4 al momento della stesura). La scelta del modulo è importante: `techknowlogick/certmagic-s3` usa le chiavi `bucket`/`region`/`prefix`, corrispondenti alla struttura esistente dei certificati; il fork `ss098` usa `host`/`endpoint` e **non troverà** i certificati esistenti.
4. **File**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` di produzione, su una sola riga) in `C:\caddy\`; popola la mappa una volta con `sync-hostmap.ps1 -NoReload`.
5. **Controlli prima del primo avvio**: `caddy list-modules` deve mostrare il modulo di storage s3; `caddy adapt` deve produrre `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` nel blocco storage; `caddy validate` deve completarsi con successo.
6. **Servizio**: installalo con WinSW (id del servizio `caddy`, riavvio automatico in caso di errore, log con rotazione). Viene eseguito come LocalSystem, che raggiunge IMDS per le credenziali del ruolo.
7. **Task di sincronizzazione**: registra `CaddyHostmapSync` (SYSTEM, ogni 5 minuti e all'avvio, con limite di esecuzione di 4 minuti).
8. **Verifica prima del passaggio in produzione** risolvendo forzatamente i domini su `127.0.0.1` con `curl --resolve` (l'istanza non riceve traffico reale finché l'EIP non viene spostato): un dominio esistente deve essere servito con un certificato valido già presente; `www.` deve restituire 302; un host sconosciuto deve ricevere un rifiuto TLS; e `Restart-Service caddy` deve riprendere a servire **senza alcuna nuova inizializzazione manuale** — quel test di riavvio è il vero scopo della progettazione statica.
9. **Go-live**: riassocia l'Elastic IP `3.23.251.61` alla nuova istanza. Il DNS delle chiese non cambia mai.

## Insidie verificate sul campo (apprese a caro prezzo — non regredire)

| Insidia | Sintomo | Soluzione |
|---|---|---|
| `tls_server_name {vars.upstream}` nel transport di reverse_proxy | Ogni dominio proxato restituisce 502: i placeholder della mappa si risolvono **vuoti al momento della connessione TLS** ("either ServerName or InsecureSkipVerify must be specified") | Usa il placeholder nativo del transport: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chiavi duplicate o righe non valide in `hosts.map` | Il gestore `map` di Caddy **genera un errore bloccante su una chiave di input duplicata** — una sola riga errata può mandare in errore l'intera configurazione | Lo script di sincronizzazione normalizza gli spazi, scarta le righe malformate (rifiutando tutto solo se più del 20% è errato), elimina i duplicati con vittoria della prima occorrenza e scrive UTF-8 **senza BOM** (un BOM corrompe la prima chiave della mappa). L'API filtra inoltre alla fonte le righe di dominio vuote o contenenti spazi |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | La registrazione del task **fallisce silenziosamente** (XML fuori range, errore non terminante) | Costruisci la ripetizione come istanza CIM `MSFT_TaskRepetitionPattern` con `Interval = "PT5M"` e senza durata; aggiungi un `ExecutionTimeLimit` di 4 minuti (la prima esecuzione SYSTEM può bloccarsi su una ricerca TLS/CRL a freddo) |

:::warning
L'API di amministrazione è associata solo a `localhost:2019`. La modalità runtime legacy la esponeva da remoto così che l'API di Membership potesse inviare le configurazioni delle route; la progettazione statica non richiede invii remoti, e la superficie ridotta è una scelta deliberata. `caddy reload` (eseguito localmente dallo script di sincronizzazione) è l'unico consumatore dell'API di amministrazione.
:::

:::info Invio runtime legacy
`CaddyHelper` nell'API (e gli endpoint `/membership/domains/caddy` + `/caddy/init`) esistono ancora come percorso di rollback verso la vecchia modalità configurata a runtime. Sono previsti per l'eliminazione quando l'istanza statica sarà stata stabile per un paio di settimane — dopodiché, `authorize` + `hostmap` saranno gli unici punti di integrazione.
:::

## Operazioni

- **Log**: log con rotazione di WinSW in `C:\caddy\` (stdout/stderr del servizio — gli errori del reverse proxy finiscono in `caddy-service.err.log`); cronologia della sincronizzazione in `C:\caddy\sync-hostmap.log`.
- **Forzare l'aggiornamento della mappa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Modifica della configurazione**: modifica `C:\caddy\Caddyfile`, poi `caddy validate` + `caddy reload` (oppure `Restart-Service caddy` — i riavvii sono sicuri per progettazione).
- **Eliminazione massiva di domini**: fa scattare il controllo di riduzione dello script di sincronizzazione, per progettazione; sposta da parte il vecchio `hosts.map` e riesegui il task per accettare una riduzione grande ma intenzionale.
- **Le istruzioni DNS per le chiese non cambiano mai**: apex `A 3.23.251.61` oppure `CNAME proxy.b1.church`.

## Pagine correlate

- [Routing dei siti web e multi-sito](../architecture/websites) — come la richiesta proxata viene risolta in una chiesa/sito in B1App
- [Deploy dell'API](./apis) — deploy dell'API di Membership che espone `authorize`/`hostmap`
