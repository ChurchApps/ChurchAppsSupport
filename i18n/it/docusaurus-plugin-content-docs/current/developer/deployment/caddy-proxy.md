---
title: "Proxy di dominio personalizzato Caddy"
---

# Proxy di dominio personalizzato Caddy

<div class="article-intro">

I domini della chiesa personalizzati (`mychurch.org` → il sito B1 della chiesa) terminano su una singola scatola Windows EC2 che esegue Caddy. La scatola possiede i certificati TLS, risolve ogni dominio al suo sito `{sub}.b1.church`, e reverse-proxy con un'intestazione Host riscritta. La sua intera configurazione è due file — un `Caddyfile` statico e un `hosts.map` aggiornato dall'API di appartenenza — così sopravvive ai riavvii senza stato runtime zero. Questa pagina copre come la scatola è costruita da zero, come opera, e i gotcha field-testati che morderanno chiunque la ricostruisca.

</div>

Per come una richiesta si risolve in una chiesa/sito una volta che raggiunge B1App, vedi [Website Routing e multi-sito](../architecture/websites).

## Componenti

| Pezzo | Cosa è |
|---|---|
| Istanza EC2 | Windows Server; Elastic IP **`3.23.251.61`** (infornato in DNS della chiesa mondiale — l'IP è permanente, le istanze sono usa e getta) |
| `C:\caddy\caddy.exe` | Build **personalizzato** di Caddy con il modulo di archiviazione `techknowlogick/certmagic-s3` — il Caddy stock non può leggere l'archivio di certificati |
| `C:\caddy\Caddyfile` | L'intera configurazione del proxy: TLS su richiesta, host→upstream `map`, www→apex reindirizzamenti, `:80`→https |
| `C:\caddy\hosts.map` | Una riga `{domain} {sub}.b1.church` per dominio rutabile, importata nel blocco `map` del Caddyfile |
| `sync-hostmap.ps1` + compito `CaddyHostmapSync` | Compito programmato (ogni 5 min + al boot, come SYSTEM) aggiorna `hosts.map` dall'API e ricarica Caddy elegantemente solo al cambiamento |
| Servizio Windows `caddy` (wrapper WinSW) | Esegue `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; auto-restart al fallimento. Caddy non è SCM-consapevole, così un wrapper è necessario |
| Bucket S3 `churchapps-caddy-certs` | Archiviazione di certificati condivisa (`region us-east-2`, prefisso `certs`) — i certificati sopravvivono alla ricostruzione dell'istanza |
| Ruolo IAM `CaddyRole` | Concede al'istanza accesso S3; Caddy usa la catena di credenziali AWS predefinita (nessuna chiave nella configurazione) |

## I due endpoint API da cui la scatola dipende

Entrambi sono anonimi, sull'API di appartenenza:

| Endpoint | Ruolo |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | **Gate `ask` TLS su richiesta** di Caddy: `200 {"authorized":true}` quando l'host (o, per un host `www.`, il suo apex) è una riga in `domains`; `404` altrimenti. Questo è il controllo dell'abuso — Caddy non emetterà un certificato per un host che questo endpoint rifiuta |
| `GET /membership/domains/hostmap` | `text/plain`, ordinato, deduplicated righe `{domain} {sub}.b1.church` (site-aware: un dominio assegnato a un sito secondario compone il subdominio di quel sito). Fonte della `map` |

## Flusso di richiesta

1. Il browser risolve `mychurch.org` → `3.23.251.61` (record apex `A`, o `CNAME proxy.b1.church`).
2. Caddy termina TLS. Certificato a portata di mano in S3 → servire; SNI sconosciuto → `authorize` viene chiesto; 200 → emettere su richiesta tramite Let's Encrypt; 404 → **l'handshake è rifiutato** (nessun certificato, nessuna risposta — un host sconosciuto è TLS-rifiutato, non un errore HTTP).
3. La `map` risolve l'Host a `{sub}.b1.church`; `www.{apex}` riceve un 302 all'apex; un host autorizzato-ma-non-mappato (un dominio brand-nuovo dentro la finestra di sincronizzazione ≤5 minuti) riceve un 404 pulito.
4. `reverse_proxy` compone `{sub}.b1.church:443` con SNI e Host riscritti all'upstream, così il bordo di Vercel serve il sito B1App.
5. La porta 80 passa le sfide ACME HTTP-01 e 308-reindirizza tutto il resto a https.

Propagazione di nuovo dominio: un dominio salvato in B1Admin diventa rutabile entro ~5 minuti (il compito di sincronizzazione); il suo certificato è coniato al primo colpo HTTPS.

## Costruzione della scatola da zero

Condensato dalla procedura field-testata (il passo-per-passo completo con comandi copy-paste vive nello spazio di operazioni, non in questo repo). Prima i prerequisiti — la costruzione è morta senza di loro:

1. **IAM**: allega `CaddyRole` (accesso S3 al bucket di certificato) al'istanza. Verifica tramite IMDSv2 dalla scatola — nota un GET IMDS nudo che ritorna 401 significa solo "IMDSv2 è applicato", non "nessun ruolo".
2. **Salute dell'API**: `authorize` deve ritornare 404 per un dominio falso e `hostmap` deve ritornare 200 prima di qualsiasi cosa.

Poi:

3. **Binario**: scarica un build personalizzato dal servizio di build di Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB vs ~45 MB stock; v2.11.4 al momento della scrittura). La scelta del modulo importa: `techknowlogick/certmagic-s3` usa chiavi `bucket`/`region`/`prefix` che corrispondono al layout di certificato esistente; il fork `ss098` usa `host`/`endpoint` e **non** troverà i certificati esistenti.
4. **File**: `Caddyfile` + `sync-hostmap.ps1` in `C:\caddy\`; semina la mappa una volta con `sync-hostmap.ps1 -NoReload`.
5. **Gate prima del primo avvio**: `caddy list-modules` deve mostrare il modulo di archiviazione s3; `caddy adapt` deve emettere `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` nel suo blocco di archiviazione; `caddy validate` deve passare.
6. **Servizio**: installa tramite WinSW (id servizio `caddy`, auto-restart al fallimento, registri rotanti). Esegue come LocalSystem, che raggiunge IMDS per le credenziali di ruolo.
7. **Compito di sincronizzazione**: registra `CaddyHostmapSync` (SYSTEM, ogni 5 min + all'avvio, limite di esecuzione di 4 minuti).
8. **Verifica pre-cutover** forzando la risoluzione di domini a `127.0.0.1` con `curl --resolve` (la scatola non ha traffico reale fino a quando l'EIP si muove): un dominio esistente deve servire con un certificato trasportato valido; `www.` deve 302; un host sconosciuto deve essere TLS-rifiutato; e `Restart-Service caddy` deve ritornare servendo **senza ri-priming manuale** — quel test di riavvio è l'intero punto del design statico.
9. **Go-live**: riasssocia l'Elastic IP `3.23.251.61` al'istanza nuova. DNS della chiesa non cambia mai.

## Gotcha field-testati (imparati nel modo difficile — non regredire)

| Gotcha | Sintomo | Correzione |
|---|---|---|
| `tls_server_name {vars.upstream}` nel trasporto reverse_proxy | Ogni dominio proxato 502s: i segnaposti della mappa si risolvono **vuoti al tempo di TLS-dial** ("either ServerName or InsecureSkipVerify must be specified") | Usa il segnaposto nativo del trasporto: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chiavi duplicate o linee spazzatura in `hosts.map` | L'handler `map` di Caddy **hard-error su una chiave di input duplicate** — una linea cattiva può portare giù l'intera configurazione | Lo script di sincronizzazione normalizza gli spazi, cade le linee malformate (rifiutando all'ingrosso solo se >20% sono cattive), dedupe first-wins, e scrive **BOM-free** UTF-8 (un BOM corrompe la prima chiave della mappa). L'API filtra anche righe di dominio vuote/contenenti spazi alla fonte |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | La registrazione del compito **silenziosamente fallisce** (XML fuori intervallo, errore non-terminante) | Costruisci la ripetizione come un'istanza `MSFT_TaskRepetitionPattern` CIM con `Interval = "PT5M"` e nessuna durata; aggiungi un `ExecutionTimeLimit` di 4 minuti (il primo run SYSTEM può bloccarsi su una ricerca TLS/CRL fredda) |

:::warning
L'admin API si collega a `localhost:2019` solo. La modalità runtime legacy la esponeva da remoto così l'API di appartenenza poteva spingere configurazioni di rotta; il design statico non ha bisogno di spinte da remoto, e la superficie più piccola è intenzionale. `caddy reload` (esegui localmente dallo script di sincronizzazione) è l'unico consumatore di admin-API.
:::

:::info Spinta runtime legacy
`CaddyHelper` nell'API (e gli endpoint `/membership/domains/caddy` + `/caddy/init`) ancora esistono come il percorso di rollback alla vecchia modalità configurata-runtime. Sono programmati per eliminazione una volta che la scatola statica è stata stabile per un paio di settimane — dopo quello, `authorize` + `hostmap` sono gli unici punti di integrazione.
:::

## Operazioni

- **Registri**: registri rotanti WinSW in `C:\caddy\` (servizio stdout/err — gli errori di reverse-proxy atterrano in `caddy-service.err.log`); cronologia di sincronizzazione in `C:\caddy\sync-hostmap.log`.
- **Forza un aggiornamento della mappa**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Cambiamento di configurazione**: modifica `C:\caddy\Caddyfile`, poi `caddy validate` + `caddy reload` (o `Restart-Service caddy` — i riavvii sono sicuri per design).
- **Eliminazione di dominio di massa** attiva la protezione di restringimento dello script di sincronizzazione per design; sposta il vecchio `hosts.map` da parte e ri-esegui il compito per accettare un restringimento intenzionalmente grande.
- **Istruzioni DNS per le chiese sono immutate per sempre**: apex `A 3.23.251.61` o `CNAME proxy.b1.church`.

## Pagine correlate

- [Website Routing e multi-sito](../architecture/websites) — come la richiesta proxata si risolve in una chiesa/sito in B1App
- [Distribuzione dell'API](./apis) — distribuzione dell'API di appartenenza che serve `authorize`/`hostmap`
