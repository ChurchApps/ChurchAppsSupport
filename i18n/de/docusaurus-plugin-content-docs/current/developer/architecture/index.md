---
title: "Architektur"
---

# Architektur

<div class="article-intro">

Diese Seiten sind repoübergreifende Systemkarten: Sie dokumentieren, wie ein zentrales ChurchApps-System durchgängig funktioniert — über die Apps, die API-Module und die gemeinsam genutzten Bibliotheken hinweg — statt wie ein einzelnes Projekt eingerichtet ist. Lies sie, bevor du das Verhalten eines Systems änderst; lies [Setup](../setup/), um ein Projekt zum Laufen zu bringen, und den [API-Abschnitt](../api/) für die Referenz auf Endpunkt-Ebene.

</div>

## Das Ökosystem auf einen Blick

ChurchApps besteht aus ~20 unabhängigen Repositories (kein Monorepo). Client-Apps sprechen über HTTPS und WebSocket mit einer kleinen Menge an Backend-APIs und teilen sich Code über npm-Pakete, die unter dem Scope `@churchapps` veröffentlicht werden.

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

1. **Module sind isoliert.** Jedes Api-Modul besitzt seine eigene Datenbank und seine eigenen Tabellen; andere Module und Apps erreichen seine Daten nur über seine REST-Endpunkte. Siehe [Modulstruktur](../api/module-structure).
2. **Gemeinsamer Code wird als npm-Pakete ausgeliefert.** Apps importieren niemals gegenseitig ihren Quellcode; alles Wiederverwendete überquert Repo-Grenzen über `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`. Siehe [Gemeinsame Bibliotheken](../shared-libraries/).

## Systemkarten

| Seite | Was sie abdeckt | Umfasst |
|------|----------------|-------|
| [Benachrichtigungen & Erinnerungen](./notifications) | Wie irgendetwas einer Person etwas mitteilt: die zwei Zustellwege, die Kanal-Eskalationskette und die Erinnerungs-Engine | Api (messaging), B1Admin, B1App |
| [Echtzeit-Architektur](../realtime) | Das WebSocket-Zustellframework hinter Chat, Präsenz und In-App-Zustellung | Api (messaging), alle Web-Apps |
| [Web-Push-Benachrichtigungen](../web-push) | Der Browser-Push-Kanal: VAPID-Schlüssel, Abo-Speicherung, Zustellung | Api (messaging), alle Web-Apps |
| [Giving](./giving) | Zahlungsanbieter und Gateways, Spendenabläufe, Fonds/Batches, Gateway-Webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Veranstaltungsanmeldungen](./registrations) | Das Commerce-Modell für Anmeldungen: Teilnehmertypen, Auswahlmöglichkeiten, Rabattcodes, Zahlungen über das Giving-Gateway und die Warteliste | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk- und Selbst-Check-in, das Anwesenheits-Datenmodell, Raum-Routing, die Kindersicherheitsschicht, Label-Druck | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website-Builder](./website-builder) | Der Seiten-/Abschnitts-/Element-Baum, der Elementtyp-Vertrag und die Renderer, Blog, zugangsbeschränkte Seiten, SEO und KI-Generierung | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website-Routing & Multi-Site](./websites) | Wie eine Anfrage zu einer Gemeinde und einer bestimmten Website aufgelöst wird, das Multi-Site-`siteId`-Datenmodell und die Caddy-Edge für benutzerdefinierte Domains | B1App, Api (membership + content), B1Admin |
| [Integrationen](./integrations) | Die Erweiterungsfläche: OAuth, API-Schlüssel, Webhooks, Content-Provider, MCP | Api, gemeinsame Bibliotheken, externe Apps |
| [Audit-Log & rückgängig machbare Batches](./audit-log) | Standardmäßig aktivierte Protokollierung jeder Mutation am Controller-Engpass und die Batch-Schicht, die Importe und Massenaktionen rückgängig machbar macht | Api (alle Module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Der kostenpflichtige Speicher- und SMS-Guthaben-Dienst: gemeinsame JWT-Identität, Service-Key-S2S, die Text- und Speicheranbieter-Schnittstellen, Stripe-Abrechnung | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting-/apihelper-Pakete, B1Admin |

:::tip
Wenn eine Änderung ändert, wie eines dieser Systeme funktioniert — nicht nur eine Seite innerhalb einer App —, sollte die passende Systemkarte hier im selben Arbeitsschritt aktualisiert werden. Das hält diesen Abschnitt als vertrauenswürdige erste Anlaufstelle für neue Mitwirkende.
:::
