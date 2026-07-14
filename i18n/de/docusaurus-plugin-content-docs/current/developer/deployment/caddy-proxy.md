---
title: "Caddy Custom-Domain-Proxy"
---

# Caddy Custom-Domain-Proxy

<div class="article-intro">

Benutzerdefinierte Kirchendomains (`mychurch.org` → die B1-Website der Kirche) beenden bei einer einzigen Windows-EC2-Box, die Caddy ausführt. Die Box besitzt die TLS-Zertifikate, löst jede Domain zu ihrer `{sub}.b1.church` Website auf, und Reverse-Proxys mit einem umgeschriebenen Host-Header.

</div>

## Komponenten

| Komponente | Was es ist |
|---|---|
| EC2-Instanz | Windows Server; Elastic IP **`3.23.251.61`** |
| `C:\caddy\caddy.exe` | **Benutzerdefinierter** Caddy-Build mit dem `techknowlogick/certmagic-s3` Storage-Modul |
| `C:\caddy\Caddyfile` | Die gesamte Proxy-Konfiguration |
| `C:\caddy\hosts.map` | Ein `{domain} {sub}.b1.church` Zeile pro routbar-Domain |
| Scheduled Task | Aktualisiert `hosts.map` alle 5 Minuten von der API |
| S3-Bucket | `churchapps-caddy-certs` – Gemeinsamer Zertifikat-Speicher |

## Anfragepflus

1. Browser löst `mychurch.org` → `3.23.251.61` auf
2. Caddy beendet TLS; Zertifikat in S3 → servieren
3. Die `map` löst den Host zu `{sub}.b1.church` auf
4. `reverse_proxy` wählt `{sub}.b1.church:443` mit SNI um
5. Port 80 führt ACME HTTP-01 Herausforderungen durch und 308-Umleitungen alles andere zu https

Neue-Domain-Propagierung: Eine in B1Admin gespeicherte Domain wird innerhalb ~5 Minuten routbar.
