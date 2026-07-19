---
title: "Architektur"
---

# Architektur

<div class="article-intro">

Diese Seiten sind repoübergreifende Systemkarten: Sie dokumentieren, wie ein zentrales ChurchApps-System end-to-end funktioniert – über die Apps, die API-Module und die gemeinsam genutzten Bibliotheken hinweg – statt wie ein einzelnes Projekt eingerichtet wird. Lesen Sie sie, bevor Sie das Verhalten eines Systems ändern; lesen Sie [Setup](../setup/), um ein Projekt zum Laufen zu bringen, und den [API-Abschnitt](../api/) für die Referenz auf Endpunkt-Ebene.

</div>

## Das Ökosystem auf einen Blick

ChurchApps besteht aus rund 20 unabhängigen Repositories (kein Monorepo). Client-Apps kommunizieren mit einer kleinen Anzahl Backend-APIs über HTTPS und WebSocket und teilen Code über npm-Pakete, die unter dem `@churchapps`-Scope veröffentlicht werden.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Zwei strukturelle Regeln prägen alles, was in diesem Abschnitt dokumentiert ist:

1. **Module sind isoliert.** Jedes Api-Modul besitzt seine eigene Datenbank und seine eigenen Tabellen; andere Module und Apps erreichen seine Daten nur über dessen REST-Endpunkte. Siehe [Modulstruktur](../api/module-structure).
2. **Gemeinsam genutzter Code wird als npm-Pakete ausgeliefert.** Apps importieren niemals gegenseitig ihren Quellcode; alles Wiederverwendete überquert Repo-Grenzen über `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`. Siehe [Gemeinsame Bibliotheken](../shared-libraries/).

## Systemkarten

| Seite | Was sie abdeckt | Umfasst |
|------|----------------|-------|
| [Benachrichtigungen & Erinnerungen](./notifications) | Wie irgendetwas einer Person etwas mitteilt: die beiden Versandtüren, die Kanal-Eskalationskette und die Erinnerungs-Engine | Api (messaging), B1Admin, B1App |
| [Echtzeit-Architektur](../realtime) | Das WebSocket-Zustellungs-Framework hinter Chat, Präsenz und In-App-Zustellung | Api (messaging), alle Web-Apps |
| [Web-Push-Benachrichtigungen](../web-push) | Der Browser-Push-Kanal: VAPID-Schlüssel, Speicherung von Abonnements, Zustellung | Api (messaging), alle Web-Apps |
| [Spenden](./giving) | Zahlungs-Provider und -Gateways, Spendenabläufe, Fonds/Batches, Gateway-Webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Event-Registrierungen](./registrations) | Das Commerce-Modell der Registrierung: Teilnehmertypen, Auswahlmöglichkeiten, Rabattcodes, Zahlungen über das Giving-Gateway und die Warteliste | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk- und Selbst-Check-in, das Anwesenheits-Datenmodell, Raumzuweisung, die Kindersicherheitsschicht, Etikettendruck | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website-Builder](./website-builder) | Der Seiten-/Abschnitts-/Element-Baum, der Element-Typ-Vertrag und die Renderer, Blog, zugriffsbeschränkte Seiten, SEO und KI-Generierung | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website-Routing & Multi-Site](./websites) | Wie eine Anfrage einer Gemeinde und einer bestimmten Site zugeordnet wird, das Multi-Site-`siteId`-Datenmodell und die Caddy-Edge für benutzerdefinierte Domains | B1App, Api (membership + content), B1Admin |
| [Integrationen](./integrations) | Die Erweiterungsoberfläche: OAuth, API-Schlüssel, Webhooks, Content-Provider, MCP | Api, gemeinsame Bibliotheken, externe Apps |
| [Audit-Log & rückgängig machbare Batches](./audit-log) | Standardmäßig aktiviertes Auditing jeder Mutation am Controller-Engpass sowie die Batch-Schicht, die Importe und Massenaktionen rückgängig machbar macht | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Der kostenpflichtige Speicher- und SMS-Guthaben-Dienst: gemeinsame JWT-Identität, Service-Key-S2S, die Provider-Schnittstellen für Texting und Speicher, Stripe-Abrechnung | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |

:::tip
Wenn eine Änderung verändert, wie eines dieser Systeme funktioniert – und nicht nur eine Seite innerhalb einer App –, sollte die entsprechende Systemkarte hier im selben Arbeitsschritt aktualisiert werden. Das hält diesen Abschnitt als erste Anlaufstelle für neue Mitwirkende vertrauenswürdig.
:::
