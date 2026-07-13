---
title: "Integrations- & Erweiterungs-Oberfläche"
---

# Integrations- & Erweiterungs-Oberfläche

<div class="article-intro">

Alles, was eine Drittpartei einstecken kann, läuft durch eine API und ein Autorisierungsmodell. Diese Seite ist die Karte: sie nennt jede Integrations-Oberfläche, zeigt wie sie verbinden und verlinkt die Referenz. Wenn Sie gegen B1 bauen, starten Sie hier, um die richtige Tür zu wählen, dann folgen Sie dem Link zu der Seite, die sie dokumentiert.

</div>

## Die Oberflächen auf einen Blick

Es gibt sechs Wege rein oder raus, und sie teilen alle das gleiche Auth-Layer:

- **[REST API](../api/api-keys)** — Die ganze Produkt-Oberfläche, abrufbar mit Token von jeder Sprache
- **[API-Schlüssel](../api/api-keys)** — Das einfachste Anmeldeinformationen: ein `cak_…` Token
- **[OAuth 2.0 & Verbundene Apps](../api/connected-apps)** — Multi-Tenant-Zustimmung für Apps
- **[Webhooks](../api/webhooks)** — Signierte, dauerhaft gelieferte ausgehende Ereignisse
- **[MCP Server](../api`/mcp`)** — Ein KI-Facing-Wrapper über die REST API
- **[Inhalts-Anbieter](../freeplay-content-provider)** — Der eingehende Weg für externe Medienbibliotheken

Alles außer Inhalts-Anbieter wird von einer einzelnen monolithischen API (das [Api](https://github.com/ChurchApps/Api) Repository) serviert, dessen Module unter stabilen Basis-Wegen einhaken — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` und `/mcp`.

## Zusammenfassung

| Oberfläche | Auth-Mechanismus | Richtung | Wo implementiert | Referenz |
|---|---|---|---|---|
| REST API | `Bearer` JWT oder `cak_…` key | Eingehend | `Api/src/modules/*` | [API-Schlüssel](../api/api-keys) |
| API-Schlüssel | SHA-256-hashed `cak_` Token | Anmeldeinformationen | `Api/.../membership/controllers/ApiKeyController.ts` | [API-Schlüssel](../api/api-keys) |
| OAuth 2.0 | Auth-Code · Device · Refresh → JWT | Eingehend | `Api/.../membership/controllers/OAuthController.ts` | [Verbundene Apps](../api/connected-apps) |
| Webhooks | Pro-Hook Geheimnis, HMAC-SHA256 | Ausgehend | `Api/src/shared/webhooks/` | [Webhooks](../api/webhooks) |
| MCP Server | `Bearer` JWT oder `cak_…` key | Eingehend (AI) | `Api/src/modules/mcp/` | [MCP Server](../api`/mcp`) |
| Inhalts-Anbieter | Per-Provider: keine / OAuth | Eingehend Inhalt | `Packages/content-providers/` | [Inhalts-Anbieter](../freeplay-content-provider) |

## Verwandte Artikel

- [API-Schlüssel](../api/api-keys) — Das einfachste Anmeldeinformationen
- [Verbundene Apps & OAuth](../api/connected-apps) — Multi-Tenant-Zustimmungs-Flows
- [Webhooks](../api/webhooks) — Das ausgehende Ereignis-System
- [MCP Server](../api`/mcp`) — Der AI-Integrations-Wrapper
