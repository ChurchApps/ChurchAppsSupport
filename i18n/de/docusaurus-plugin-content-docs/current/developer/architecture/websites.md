---
title: "Website-Routing & Multi-Site"
---

# Website-Routing & Multi-Site

<div class="article-intro">

Eine einzelne Kirche kann jetzt mehr als eine unterschiedliche Website bedienen, und jede kann auf einem `*.b1.church` Subdomain oder auf einer vollständig benutzerdefinierten, Kirchen-eigenen Domain leben. Diese Seite verweist die Routing-Schicht, die unter dem Builder sitzt: wie eine eingehende Anfrage zu einer Kirche **und** zu einer spezifischen Website auflöst, das Multi-Site-Datenmodell, und die benutzerdefinierte Domain-Edge – ein selbstverwalteter Caddy-Proxy auf EC2.

</div>

## Übersicht

```
grace.b1.church              www.gracechurch.org  (benutzerdefinierte Domain)
(b1.church Subdomain)                │
       │                             ▼
       │             ┌──────────────────────────────────────────┐
       │             │ Caddy Edge – EC2 3.23.251.61              │
       │             │  • beendet TLS (Pro-Domain LE-Zert)      │
       │             │  • schreibt Host → {sub}.b1.church um     │
       │             │  • Reverse-Proxy zu B1App                 │
       │             └────────────────────┬─────────────────────┘
       │                  Host = {sub}.b1.church
       ▼                                  ▼
   B1App [sdSlug] Route
        └─ GET /membership/churches/lookup/?subDomain=…
```

Drei Regeln:

1. **Ein Sentinel behält alles Rückwärts-kompatibel.** `siteId = ''` ist die primäre Website.
2. **Auflösung ist Host-Label-basiert.** Ein `*.b1.church` Subdomain routet nach seinem Host-Label direkt.
3. **Die Caddy Edge ist zustandslos.** Custom-Domains beenden bei einem selbstverwalteten Caddy-Proxy auf EC2.
