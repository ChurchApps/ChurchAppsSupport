---
title: "Proxy Caddy Personalizzato Dominio"
---

# Proxy Caddy Personalizzato Dominio

<div class="article-intro">

I domini personalizzati della chiesa (`mychurch.org` → il sito B1 della chiesa) terminano in un'unica casella Windows EC2 che esegue Caddy. La casella possiede i certificati TLS, risolve ogni dominio al sito `{sub}.b1.church` della chiesa e fa il reverse-proxy con un header Host riscritto. L'intera configurazione è due file — un `Caddyfile` statico e un `hosts.map` aggiornato dall'API Membership.

</div>

## Componenti

| Pezzo | Cos'è |
|---|---|
| Istanza EC2 | Windows Server; Elastic IP **`3.23.251.61`** |
| `C:\caddy\caddy.exe` | Build Caddy **personalizzato** con il modulo di archiviazione `techknowlogick/certmagic-s3` |
| `C:\caddy\Caddyfile` | L'intera configurazione del proxy: TLS on-demand, host→upstream `map`, reindirizzamenti www→apex |
| `C:\caddy\hosts.map` | Una riga `{domain} {sub}.b1.church` per ogni dominio instradabile |
| `sync-hostmap.ps1` + `CaddyHostmapSync` task | Attività programmata che aggiorna `hosts.map` dall'API e ricarica Caddy |

## Flusso di Richiesta

1. Il browser risolve `mychurch.org` → `3.23.251.61`.
2. Caddy termina TLS. Certificato in S3 disponibile → serve; SNI sconosciuto → chiedi `authorize`; 200 → emetti on-demand via Let's Encrypt; 404 → **l'handshake è rifiutato**.
3. La `map` risolve l'Host a `{sub}.b1.church`.
4. `reverse_proxy` compone `{sub}.b1.church:443` con SNI e Host riscritto a monte.
5. La porta 80 passa sfide ACME HTTP-01 e reindirizza tutto il resto a https.
