---
title: "Website-Erstellungs-Architektur"
---

# Website-Erstellungs-Architektur

<div class="article-intro">

Jede von B1App servierte Gemeinde-Website wird aus einem Inhalts-Baum gerendert — Seiten, Abschnitte, Elemente — in der ContentApi gespeichert und in B1Admin visuell editiert. Eine gemeinsame Komponenten-Bibliothek rendert sowohl den Editor-Vorschau als auch die Live-Site, ein Elementtyp-Katalog definiert, was auf einer Seite erscheinen kann, und ein separater AI-Service kann diesen Baum generieren oder umschreiben. Diese Seite zeigt den ganzen Stack: das Element-Vertrag in `@churchapps/helpers`, die Render-Pipeline, Gemeinde-Daten-Elemente, Site-weite Widgets, die Blog-Schicht, Zugriff-gegatete Seiten, SEO, AI-Generierung und Konversations-Formulare.

</div>

## Überblick

```
B1Admin — Editor          Api — /content module
ContentEditor             pages — sections — elements
ElementEdit             ──────────▶  
                        HTTPS

shared render pipeline  ┌───────────────────────────┐
B1App — public site     │ @churchapps/helpers       │
Zone → Section → Element│ ElementTypes.ts (catalog) │
+ widgets, JSON-LD      │ @churchapps/apphelper     │
                        │ ElementRegistry, renderers│
                        └───────────────────────────┘

AskApi — /website (AI)
generateSite
rewriteSection
```

Drei Regeln gelten über den Stack:

1. **Ein Baum, zwei Renderer.** Eine Seite ist ein `pages → sections → elements` Baum, wo jeder Knoten seine Einstellungen als `answers` JSON-Blob trägt. Die gleichen Apphelper-Komponenten rendern den Drag-and-Drop-Editor in B1Admin und die Server-renderte öffentliche Site in B1App.
2. **Der Vertrag lebt in `@churchapps/helpers`.** `ElementTypes.ts` ist der einzelne Katalog von Elementtypen; Renderer lösen durch eine Registry in Apphelper auf.
3. **Die öffentliche Site liest anonyme Endpoints.** Alles, das B1App benötigt — der Seiten-Baum, Einstellungen, Blog-Beiträge, Umleitungen und Gemeinde-Daten-Endpoints in anderen Modulen — ist öffentlich.

## Der Inhalts-Baum

| Tabelle | Rolle |
|---|---|
| `pages` | Eine Seite pro URL: `url`, `title`, `layout`, plus `visibility`/`groupIds` |
| `sections` | Horizontale Bänder auf einer Seite: Hintergrund, Textfarbe, `answersJSON` |
| `elements` | Inhalts-Stücke innerhalb einer Sektion: `elementType` + `answersJSON` |
| `blocks` | Wiederverwendbare Sektion/Element-Gruppen |
| `posts` | Blog-Metadaten über einer regulären Seite |
| `redirects` | Per-Gemeinde `fromPath → toPath` Paare |
| `settings` | Key-Value Gemeinde-Einstellungen |

## Verwandte Artikel

- [Website-Routing & Multi-Site](./websites) — Wie die proxied Anfrage zu einer Gemeinde/Site löst
- [Inhalts-Endpoints](../api/endpoints/content) — Vollständige REST-Oberfläche
- [AppHelper](../shared-libraries/app-helper) — Renderer, Registry, Divider, Widgets
- [MCP Server](../api/mcp) — Inklusive des page_builder Führungs-Tools
