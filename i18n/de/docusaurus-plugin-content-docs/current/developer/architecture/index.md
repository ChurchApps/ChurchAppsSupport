---
title: "Architektur"
---

# Architektur

<div class="article-intro">

Diese Seiten sind bereichsübergreifende Systemkarten: Sie dokumentieren, wie ein Kern-ChurchApps-System end-to-end funktioniert -- über die Apps, die API-Module und die gemeinsamen Bibliotheken -- anstatt wie ein einzelnes Projekt eingerichtet wird. Lesen Sie diese vor dem Ändern des Verhaltens eines Systems; Lesen Sie [Setup](../setup/) zum Ausführen eines Projekts und der [API-Bereich](../api/) für Endpoint-Level-Referenz.

</div>

## Das Ökosystem auf einen Blick

ChurchApps ist ~20 unabhängige Repositories (nicht ein Monorepo). Client-Apps sprechen über HTTPS und WebSocket mit einem kleinen Satz von Backend-APIs und teilen Code über npm-Pakete, die unter dem `@churchapps`-Umfang veröffentlicht sind.

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

Zwei strukturelle Regeln prägen alles, das in diesem Bereich dokumentiert wird:

1. **Module sind isoliert.** Jedes Api-Modul besitzt seine Datenbank und seine Tabellen; andere Module und Apps erreichen ihre Daten nur über ihre REST-Endpunkte. Siehe [Modul-Struktur](../api/module-structure).
2. **Gemeinsamer Code sendet wie npm-Pakete.** Apps importieren nie den Quellcode voneinander; alles, das wiederverwendet wird, überquert Repo-Grenzen durch `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`. Siehe [Gemeinsame Bibliotheken](../shared-libraries/).

## System-Karten

| Seite | Was sie abdeckt | Bereiche |
|------|----------------|-------|
| [Benachrichtigungen & Erinnerungen](./notifications) | Wie alles jemandem etwas sagt: die zwei Abgänge, die Kanal-Eskalations-Kette und die Erinnerungs-Engine | Api (messaging), B1Admin, B1App |
| [Real-time-Architektur](../realtime) | Das WebSocket-Lieferwerk hinter Chat, Präsenz und In-App-Lieferung | Api (messaging), alle Web-Apps |
| [Web-Push-Benachrichtigungen](../web-push) | Der Browser-Push-Kanal: VAPID-Schlüssel, Abonnement-Speicherung, Lieferung | Api (messaging), alle Web-Apps |
| [Spenden](./giving) | Zahlungsanbieter und Gateways, Spenden-Flows, Fonds/Batches, Gateway-Webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Veranstaltungs-Registrierungen](./registrations) | Das Registierungs-Handels-Modell: Teilnehmer-Typen, Auswahlmöglichkeiten, Rabatt-Codes, Zahlungen über das Spendentor und die Warteliste | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk- und Self-Check-in, das Anwesenheits-Datenmodell, Raum-Routing, die Kindersicherheits-Schicht, Etikett-Druck | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website-Builder](./website-builder) | Der Seiten-/Abschnitts-/Element-Baum, der Element-Typ-Vertrag und Renderer, Blog, Zugangsgegründete Seiten, SEO und KI-Generierung | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website-Routing & Multi-Seite](./websites) | Wie eine Anfrage zu einer Kirche und einer bestimmten Seite auflöst, das Multi-Seite `siteId`-Datenmodell und die benutzerdefinierte Domäne der Caddy-Kante | B1App, Api (membership + content), B1Admin |
| [Integrationen](./integrations) | Die Erweiterungs-Oberfläche: OAuth, API-Schlüssel, Webhooks, Inhalts-Anbieter, MCP | Api, gemeinsame Bibliotheken, externe Apps |
| [Audit-Log & Undoable-Batches](./audit-log) | Standard-On-Auditing jeder Mutation am Controller-Erstickungspunkt, und die Batch-Schicht, die Importe und Massen-Aktionen rückgängig macht | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Der bezahlte Speicher- & SMS-Kredit-Service: gemeinsamer JWT-Identität, Service-Schlüssel S2S, die SMS- und Speicher-Anbieter-Nähte, Stripe-Abrechnung | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper packages, B1Admin |
| [Bring-Your-Own Storage](./byos-storage) | Kirchen verknüpfen Google Drive, Dropbox, OneDrive oder ihren eigenen S3-kompatiblen Bucket für Uploads jenseits des kostenlosen 100MB: OAuth verbinden, pro-Anbieter Upload-Formen, die öffentliche Download-Weiterleitung | Api (content + membership), helpers/apphelper packages, B1Admin, B1App |

:::tip
Wenn eine Änderung ändert, wie eines dieser Systeme funktioniert -- nicht nur eine Seite in einer App -- sollte die übereinstimmende Systemkarte hier in der gleichen Anstrengung aktualisiert werden. Das hält diesen Bereich vertrauenswürdig als die erste Anhaltstelle für neue Mitwirkende.
:::
