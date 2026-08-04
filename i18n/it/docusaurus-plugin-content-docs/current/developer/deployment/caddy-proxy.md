---
title: "Proxy Caddy per domini personalizzati"
---

# Proxy Caddy per domini personalizzati

<div class="article-intro">

I domini personalizzati delle chiese (`mychurch.org` → il sito B1 della chiesa) terminano su un'unica macchina Windows EC2 che esegue Caddy. La macchina possiede i certificati TLS, risolve ogni dominio verso il suo sito `{sub}.b1.church`, e fa reverse-proxy con un header Host riscritto. La sua intera configurazione è composta da due file — un `Caddyfile` statico e un `hosts.map` aggiornato dalla Membership API — così sopravvive ai riavvii con zero stato a runtime. Questa pagina copre come la macchina viene costruita da zero, come opera, e i trabocchetti verificati sul campo che colpiranno chiunque la ricostruisca.

</div>

Per come una richiesta si risolve in una chiesa/sito una volta raggiunto B1App, vedi [Routing del sito web e multi-sito](../architecture/websites).

## Componenti

| Elemento | Cos'è |
|---|---|
| Istanza EC2 | Windows Server; Elastic IP **`3.23.251.61`** (incorporato nel DNS delle chiese in tutto il mondo — l'IP è permanente, le istanze sono usa e getta) |
| `C:\caddy\caddy.exe` | Build **personalizzata** di Caddy con il modulo di storage `techknowlogick/certmagic-s3` — il Caddy standard non può leggere l'archivio di certificati |
| `C:\caddy\Caddyfile` | L'intera configurazione del proxy: TLS su richiesta, `map` host→upstream, redirect www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Una riga `{domain} {sub}.b1.church` per ogni dominio instradabile, importata nel blocco `map` del Caddyfile |
| `sync-hostmap.ps1` + attività `CaddyHostmapSync` | Attività pianificata (ogni 5 min + all'avvio, come SYSTEM) che aggiorna `hosts.map` dall'API e ricarica Caddy in modo controllato solo quando c'è un cambiamento |
| Servizio Windows `caddy` (wrapper WinSW) | Esegue `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; riavvio automatico in caso di fallimento. Caddy non è consapevole di SCM, quindi è necessario un wrapper |
| Bucket S3 `churchapps-caddy-certs` | Storage condiviso dei certificati (`region us-east-2`, prefisso `certs`) — i certificati sopravvivono alla ricostruzione dell'istanza |
| Ruolo IAM `CaddyRole` | Concede all'istanza l'accesso a S3; Caddy usa la catena di credenziali predefinita di AWS (nessuna chiave nella configurazione) |

## I due endpoint API da cui dipende la macchina

Entrambi sono anonimi, sulla Membership API:

| Endpoint | Ruolo |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Il gate **`ask` TLS su richiesta** di Caddy: `200 {"authorized":true}` quando l'host (o, per un host `www.`, il suo apex) è una riga in `domains`; `404` altrimenti. Questo è il controllo anti-abuso — Caddy non emetterà un certificato per un host che questo endpoint rifiuta |
| `GET /membership/domains/hostmap` | `text/plain`, righe `{domain} {sub}.b1.church` ordinate e deduplicate (consapevole del sito: un dominio assegnato a un sito secondario compone il sottodominio di quel sito). Fonte della `map` |

## Flusso della richiesta

1. Il browser risolve `mychurch.org` → `3.23.251.61` (record apex `A`, o `CNAME proxy.b1.church`).
2. Caddy termina il TLS. Certificato già disponibile in S3 → servire; SNI sconosciuto → viene interrogato `authorize`; 200 → emette su richiesta tramite Let's Encrypt; 404 → **l'handshake viene rifiutato** (nessun certificato, nessuna risposta — un host sconosciuto viene rifiutato a livello TLS, non con un errore HTTP).
3. La `map` risolve l'Host in `{sub}.b1.church`; `www.{apex}` riceve un 302 verso l'apex; un host autorizzato-ma-non-mappato (un dominio nuovissimo dentro la finestra di sincronizzazione di ≤5 minuti) riceve un pulito 404.
4. `reverse_proxy` compone `{sub}.b1.church:443` con SNI e Host riscritti verso l'upstream, così il bordo di Vercel serve il sito B1App.
5. La porta 80 lascia passare le sfide ACME HTTP-01 e reindirizza con 308 tutto il resto verso https.

Propagazione di un nuovo dominio: un dominio salvato in B1Admin diventa instradabile entro ~5 minuti (l'attività di sincronizzazione); il suo certificato viene coniato al primo accesso HTTPS.

## Costruire la macchina da zero

Condensato dalla procedura verificata sul campo (i passaggi completi con comandi copia-incolla vivono nello spazio operativo, non in questo repository). Prima i prerequisiti — la build non funziona senza di essi:

1. **IAM**: collega `CaddyRole` (accesso S3 al bucket dei certificati) all'istanza. Verifica tramite IMDSv2 dalla macchina — nota che un semplice GET IMDS che restituisce 401 significa solo che IMDSv2 è imposto, non "nessun ruolo".
2. **Salute dell'API**: `authorize` deve restituire 404 per un dominio fasullo e `hostmap` deve restituire 200 prima di qualsiasi altra cosa.

Poi:

3. **Binario**: scarica una build personalizzata dal servizio di build di Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB contro ~45 MB dello standard; v2.11.4 al momento della stesura). La scelta del modulo è importante: `techknowlogick/certmagic-s3` usa le chiavi `bucket`/`region`/`prefix` corrispondenti al layout esistente dei certificati; il fork `ss098` usa `host`/`endpoint` e **non** troverà i certificati esistenti.
4. **File**: `Caddyfile` + `sync-hostmap.ps1` in `C:\caddy\`; semina la mappa una volta con `sync-hostmap.ps1 -NoReload`.
5. **Controlli prima del primo avvio**: `caddy list-modules` deve mostrare il modulo di storage s3; `caddy adapt` deve emettere `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` nel suo blocco di storage; `caddy validate` deve passare.
6. **Servizio**: installa tramite WinSW (id servizio `caddy`, riavvio automatico in caso di fallimento, log rotanti). Esegue come LocalSystem, che raggiunge IMDS per le credenziali del ruolo.
7. **Attività di sincronizzazione**: registra `CaddyHostmapSync` (SYSTEM, ogni 5 min + all'avvio, limite di esecuzione di 4 minuti).
8. **Verifica pre-cutover** forzando la risoluzione dei domini a `127.0.0.1` con `curl --resolve` (la macchina non ha traffico reale finché l'EIP non viene spostato): un dominio esistente deve servire con un certificato riportato valido; `www.` deve fare 302; un host sconosciuto deve essere rifiutato a livello TLS; e `Restart-Service caddy` deve tornare a servire **senza ri-inizializzazione manuale** — quel test di riavvio è l'intero senso del design statico.
9. **Go-live**: riassocia l'Elastic IP `3.23.251.61` alla nuova istanza. Il DNS delle chiese non cambia mai.

## Trabocchetti verificati sul campo (imparati nel modo difficile — da non reintrodurre)

| Trabocchetto | Sintomo | Correzione |
|---|---|---|
| `tls_server_name {vars.upstream}` nel trasporto reverse_proxy | Ogni dominio proxato dà 502: i segnaposto della mappa si risolvono **vuoti al momento del dial TLS** ("either ServerName or InsecureSkipVerify must be specified") | Usa il segnaposto nativo del trasporto: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chiavi duplicate o righe spazzatura in `hosts.map` | Il gestore `map` di Caddy **genera un errore fatale su una chiave di input duplicata** — una riga cattiva può far cadere l'intera configurazione | Lo script di sincronizzazione normalizza gli spazi bianchi, scarta le righe malformate (rifiutando in blocco solo se oltre il 20% sono cattive), deduplica dando priorità alla prima occorrenza, e scrive UTF-8 **senza BOM** (un BOM corrompe la prima chiave della mappa). Anche l'API filtra alla fonte le righe di dominio vuote o contenenti spazi |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | La registrazione dell'attività **fallisce silenziosamente** (XML fuori intervallo, errore non terminante) | Costruisci la ripetizione come un'istanza CIM `MSFT_TaskRepetitionPattern` con `Interval = "PT5M"` e nessuna durata; aggiungi un `ExecutionTimeLimit` di 4 minuti (la prima esecuzione SYSTEM può bloccarsi su una ricerca TLS/CRL a freddo) |

:::warning
L'API admin è vincolata solo a `localhost:2019`. La modalità runtime legacy la esponeva da remoto così la Membership API poteva spingere configurazioni di rotta; il design statico non necessita di push da remoto, e la superficie più piccola è deliberata. `caddy reload` (eseguito localmente dallo script di sincronizzazione) è l'unico consumatore dell'API admin.
:::

:::info Push runtime legacy
`CaddyHelper` nell'API (e gli endpoint `/membership/domains/caddy` + `/caddy/init`) esistono ancora come percorso di rollback verso la vecchia modalità configurata a runtime. Sono programmati per l'eliminazione una volta che la macchina statica sarà stata stabile per un paio di settimane — dopodiché, `authorize` + `hostmap` saranno gli unici punti di integrazione.
:::

## Operazioni

- **Log**: log rotanti WinSW in `C:\caddy\` (stdout/err del servizio — gli errori di reverse-proxy finiscono in `caddy-service.err.log`); cronologia di sincronizzazione in `C:\caddy\sync-hostmap.log`.
- **Forzare un aggiornamento della mappa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Modifica della configurazione**: modifica `C:\caddy\Caddyfile`, poi `caddy validate` + `caddy reload` (oppure `Restart-Service caddy` — i riavvii sono sicuri per design).
- **L'eliminazione massiva di domini** fa scattare per design la protezione anti-restringimento dello script di sincronizzazione; sposta da parte il vecchio `hosts.map` e riesegui l'attività per accettare un restringimento ampio intenzionale.
- **Le istruzioni DNS per le chiese sono invariate per sempre**: apex `A 3.23.251.61` o `CNAME proxy.b1.church`.

## Pagine correlate

- [Routing del sito web e multi-sito](../architecture/websites) — come la richiesta proxata si risolve in una chiesa/sito in B1App
- [Distribuzione API](./apis) — distribuire la Membership API che serve `authorize`/`hostmap`
