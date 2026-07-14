---
title: "Integrations- & Erweiterungs-Oberfläche"
---

# Integrations- & Erweiterungs-Oberfläche

<div class="article-intro">

Alles, woran ein Dritter einstecken kann, läuft durch eine API und ein Autorisierungs-Modell. Diese Seite ist die Karte: Sie nennt jede Integrations-Oberfläche, zeigt, wie sie verbunden sind, und verlinkt auf die detaillierte Referenz für jede.

</div>

## Die Oberflächen auf einen Blick

Es gibt sechs Wege ein oder aus, und sie alle teilen die gleiche Auth-Schicht:

- **[REST API](../api/api-keys)** – die gesamte Produktoberfläche, aufrufbar mit einem Bearer-Token von jeder Sprache aus.
- **[API-Schlüssel](../api/api-keys)** – das einfachste Anmeldedatum: ein `cak_…` Token, an eine Person in einer Kirche gebunden.
- **[OAuth 2.0 & verbundene Apps](../api/connected-apps)** – Per-Kirchen-Zustimmung für Multi-Tenant-Apps.
- **[Webhooks](../api/webhooks)** – signierte, dauerhaft gelieferte ausgehende Ereignisse.
- **[MCP-Server](../api/mcp)** – ein KI-Wrapper über die REST API.
- **[Inhalts-Anbieter](../freeplay-content-provider)** – der eingehende Pfad für externe Medienbibliotheken.

Alles außer Inhalts-Anbietern wird von einer einzigen monolithischen API (das [Api](https://github.com/ChurchApps/Api) Repository) bereitgestellt.
