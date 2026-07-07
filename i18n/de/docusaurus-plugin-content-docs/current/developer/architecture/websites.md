---
title: "Website-Routing & Multi-Site"
---

# Website-Routing & Multi-Site

<div class="article-intro">

Eine einzelne Gemeinde kann jetzt mehr als eine unterschiedliche Website servieren, und jede kann auf einem `*.b1.church` Subdomain oder auf einer vollständig benutzerdefinierten, Gemeinde-besessenen Domain leben. Diese Seite zeigt das Routing-Layer, das unter dem Erstellungs-Tool sitzt: Wie eine eingehende Anfrage zu einer Gemeinde **und** zu einer bestimmten Site löst, das Multi-Site-Datenmodell (das `siteId` Sentinel, das jede bereits vorhandene Site rendering unverändert hält) und der benutzerdefinierte Domain-Edge — ein selbst-verwalteter Caddy-Proxy auf EC2, der TLS beendigt und jede Gemeinde-Domain auf ihre `*.b1.church` Upstream umschreibt.

</div>

## Überblick

```
grace.b1.church          www.gracechurch.org (benutzerdef. Domain)
(b1.church Subdomain)              │
       │                          ▼
       │        ┌──────────────────────────────────────┐
       │        │ Caddy Edge — EC2 3.23.251.61          │
       │        │ • TLS beenden (Pro-Domain LE Cert)    │
       │        │ • Host → {sub}.b1.church umschreiben  │
       │        │ • Zu B1App reverse-proxy              │
       │        └───────────────┬──────────────────────┘
       │             Host = {sub}.b1.church
       ▼                      ▼
┌────────────────────────────────────────┐
│ B1App src/middleware.ts                │
│ • immer: delete client-supplied x-site │
│ • *.b1.church Host ⇒ domains lookup    │
│ • benutzerdef Host ⇒ lookup → x-site   │
└────────────────┬───────────────────────┘
                 ▼  next.config.mjs → host label → /[sdSlug]/…
        ┌─────────────────────────┐
        │ [sdSlug]                │
        │ ConfigHelper.load()     │
        │ /churches/lookup/       │
        │ siteId threading        │
        └─────────────────────────┘
```

Drei Regeln gelten über diesen Layer:

1. **Ein Sentinel hält alles rückwärts kompatibel.** `siteId = ''` ist die primäre Site. Jede Seite, jeder Block, jeder Link, jede globale Stil und jede Domain-Zeile, die vor diesem Feature bestand, trägt `''` und rendert genau wie zuvor.
2. **Auflösung ist Host-Label-basiert und konvergiert.** Ein `*.b1.church` Subdomain leitet von seinem Host-Label direkt auf; eine benutzerdefinierte Domain wird bei dem Caddy-Edge auf ihr `{sub}.b1.church` Label umgeschrieben.
3. **Der Caddy-Edge ist statelos über eine Wahrheit.** Eine Domänen-Sicherung stößt eine einzelne beste-Anstrengung `CaddyHelper.updateCaddy()` auf, und Caddy liest auch die `domains` Tabelle direkt.

## Multi-Site-Datenmodell

Die neue `membership.sites` Tabelle:

| Spalte | Typ | Notizen |
|---|---|---|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Gemeinde-Besitzer |
| `name` | `varchar(255)` | Anzeige-Name |
| `subDomain` | `varchar(45)` | **Unique Index** — Global Namespace |

Site-Scoping ist dann eine einzelne nicht-Null-freie Spalte, die zu Inhalts- und Domain-Tabellen hinzugefügt wird:

| Tabelle | Spalte | `''` bedeutet |
|---|---|---|
| `domains` | `siteId` | Domain serviert die primäre Site |
| `pages`, `links`, `blocks` | `siteId` | Primäre Site |

## Benutzerdef. Domains: Caddy Edge

Jede benutzerdef. Kirchen-Domain zeigt DNS auf eine EC2-Box — `3.23.251.61`. Caddy beendete TLS mit einem Per-Domain Let's Encrypt Cert, schreibt den `Host` Header auf das Site-Upstream um und reverse-proxy zu B1App.

## Verwandte Artikel

- [Caddy Custom-Domain Proxy](../deployment/caddy-proxy) — Die Edge-Box: Setup, Sync-Task
- [Website-Erstellung](./website-builder) — Der Seiten/Abschnitt/Element Baum
- [Inhalts-Endpoints](../api/endpoints/content) — Vollständige REST-Oberfläche
- [B1App](../web-apps/b1-app) — Das Next.js App mit Middleware
