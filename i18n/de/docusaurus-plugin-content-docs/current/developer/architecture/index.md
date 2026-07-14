---
title: "Architektur"
---

# Architektur

<div class="article-intro">

Diese Seiten sind Cross-Repo-System-Karten: Sie dokumentieren, wie ein Core-ChurchApps-System end-to-end funktioniert – über die Apps, die API-Module und die gemeinsamen Bibliotheken – statt wie ein einzelnes Projekt eingerichtet wird. Lesen Sie sie, bevor Sie ein System-Verhalten ändern; lesen Sie [Setup](../setup/), um ein Projekt zum Laufen zu bringen, und den [API-Abschnitt](../api/) für Endpoint-Level-Referenz.

</div>

## Das Ökosystem auf einen Blick

ChurchApps ist ~20 unabhängige Repositories (kein Monorepo). Client-Apps kommunizieren mit einem kleinen Satz Backend-APIs über HTTPS und WebSocket und teilen Code über npm-Pakete, die unter dem `@churchapps`-Bereich veröffentlicht werden.

Zwei Struktur-Regeln prägen alles in diesem Abschnitt:

1. **Module sind isoliert.** Jedes Api-Modul besitzt seine Datenbank und seine Tabellen; andere Module und Apps erreichen seine Daten nur über seine REST-Endpoints.
2. **Gemeinsamer Code wird als npm-Pakete versandt.** Apps importieren niemals Quellcode von einander; alles Wiederverwendete überquert Repository-Grenzen über `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`.

| System | Abdeckung |
|--------|----------|
| [Benachrichtigungen & Erinnerungen](./notifications) | Kanäle, Eskalation, Erinnerungs-Engine |
| [Spenden](./giving) | Zahlungs-Gateways, Spendenflüsse, Webhooks |
| [Event-Registrierungen](./registrations) | Commerce-Modell, Zahlungen, Warteliste |
| [Check-Ins](./check-ins) | Kiosk, Datenmodell, Sicherheit |
| [Website-Builder](./website-builder) | Element-Katalog, Renderer, SEO |
| [Website-Routing](./websites) | Multi-Site, benutzerdefinierte Domänen |
| [Integrations](./integrations) | OAuth, Webhooks, Inhalts-Anbieter |
| [Audit Log](./audit-log) | Auditing, rückgängig machbare Batches |
| [MinistryStuff](./ministrystuff) | Speicherung und SMS-Kredite |
