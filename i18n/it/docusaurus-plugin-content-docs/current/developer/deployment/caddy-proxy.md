---
title: "Proxy Personalizzato Caddy per Domini Personalizzati"
---

# Proxy Personalizzato Caddy per Domini Personalizzati

<div class="article-intro">

Domini di chiesa personalizzati (`mychurch.org` → il sito B1 della chiesa) terminano in una singola scatola Windows EC2 che esegue Caddy. La scatola possiede i certificati TLS, risolve ogni dominio al suo sito `{sub}.b1.church` e reverse-proxy con un'intestazione Host riscritta. La sua intera configurazione è due file -- una `Caddyfile` statica e una `hosts.map` aggiornata dall'API di Appartenenza.

</div>

Per come una richiesta si risolve in una chiesa/sito una volta che raggiunge B1App, vedi [Routing del Sito Web e Multi-Sito](../architecture/websites).

## Componenti

| Pezzo | Cosa è |
|---|---|
| Istanza EC2 | Windows Server; IP elastico **`3.23.251.61`** (incorporato nel DNS della chiesa mondiale) |
| `C:\caddy\caddy.exe` | Build di Caddy personalizzato con il modulo `techknowlogick/certmagic-s3` |
| `C:\caddy\Caddyfile` | L'intera configurazione del proxy |
| `C:\caddy\hosts.map` | Una riga `{domain} {sub}.b1.church` per dominio instradabile |
| `sync-hostmap.ps1` | Attività programmata (ogni 5 min) che aggiorna `hosts.map` dall'API |
| Servizio Windows `caddy` | Esegue `caddy.exe run --config C:\caddy\Caddyfile` |
| Bucket S3 `churchapps-caddy-certs` | Archiviazione di certificati condivisi |
| Ruolo IAM `CaddyRole` | Concede accesso S3 dell'istanza |

## I Due Endpoint API

Entrambi in Membership API:

| Endpoint | Ruolo |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Gate TLS su richiesta di Caddy |
| `GET /membership/domains/hostmap` | Sorgente della `map` (richiede `x-internal-key`) |

## Flusso di Richiesta

1. Browser risolve `mychurch.org` → `3.23.251.61` (record A in apex)
2. Caddy termina TLS. Certificato in S3 → servi; SNI sconosciuto → chiedi `authorize`
3. La `map` risolve l'Host a `{sub}.b1.church`
4. `reverse_proxy` compone `{sub}.b1.church:443` con SNI e Host rieritti
5. La porta 80 passa sfide ACME HTTP-01

Nuova propagazione dominio: un dominio salvato in B1Admin diventa instradabile entro ~5 minuti; il certificato è coniato al primo hit HTTPS.

## Costruzione della Scatola da Zero

Prerequisiti:

1. **IAM**: allega `CaddyRole`
2. **Salute dell'API**: `authorize` deve restituire 404 per un dominio falso

Quindi:

3. **Binario**: scarica una build personalizzata da Caddy
4. **File**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` in `C:\caddy\`
5. **Convalide**: `caddy list-modules` deve mostrare il modulo s3
6. **Servizio**: installa tramite WinSW
7. **Attività Sincronizzazione**: registra `CaddyHostmapSync`
8. **Verifica pre-cutover**
9. **Go-Live**: riassociare l'IP Elastico

## Gotcha Collaudati sul Campo

| Gotcha | Sintomo | Correzione |
|---|---|---|
| `tls_server_name {vars.upstream}` nel transport reverse_proxy | Ogni dominio proxied 502 | Usa il segnaposto nativo del transport |
| Chiavi duplicate in `hosts.map` | Caddy hard-error su chiave di input duplicata | Lo script di sincronizzazione normalizza e deduplica |
| `Register-ScheduledTask -RepetitionDuration` | Registrazione attività silent-falsa | Costruisci come istanza CIM `MSFT_TaskRepetitionPattern` |

## Operazioni

- **Log**: WinSW rolling logs in `C:\caddy\`
- **Forzare un aggiornamento della map**: `Start-ScheduledTask -TaskName CaddyHostmapSync`
- **Modifica config**: modifica `Caddyfile`, quindi `caddy validate` + `caddy reload`
- **Istruzioni DNS**: apex `A 3.23.251.61` o `CNAME proxy.b1.church`

## Pagine Correlate

- [Routing del Sito Web e Multi-Sito](../architecture/websites) — come la richiesta proxied si risolve in B1App
