---
title: "Architektur"
description: "Systemübersichten über mehrere Repositories, die zeigen, wie Spenden, Check-ins, Benachrichtigungen und Websites über B1 Admin, B1.church und die Api hinweg funktionieren, bevor Sie etwas ändern."
---

# Architektur

<div class="article-intro">

Diese Seiten sind repositoryübergreifende Systemübersichten: Sie beschreiben, wie ein zentrales ChurchApps-System von Anfang bis Ende funktioniert, über die Apps, die API-Module und die gemeinsam genutzten Bibliotheken hinweg, und nicht, wie ein einzelnes Projekt eingerichtet wird. Lesen Sie sie, bevor Sie das Verhalten eines Systems ändern. Lesen Sie [Einrichtung](../setup/index.md), um ein Projekt zum Laufen zu bringen, und den [API-Abschnitt](../api/index.md) für die Referenz auf Endpunktebene.

</div>

## Das Ökosystem auf einen Blick

ChurchApps besteht aus rund 20 unabhängigen Repositories (kein Monorepo). Client-Apps kommunizieren über HTTPS und WebSocket mit einer kleinen Gruppe von Backend-APIs und teilen Code über npm-Pakete, die unter dem Scope `@churchapps` veröffentlicht werden.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Zwei strukturelle Regeln prägen alles, was in diesem Abschnitt dokumentiert ist:

1. **Module sind isoliert.** Jedes Api-Modul besitzt seine eigene Datenbank und seine Tabellen. Andere Module und Apps erreichen seine Daten nur über dessen REST-Endpunkte. Siehe [Modulstruktur](../api/module-structure.md).
2. **Gemeinsamer Code wird als npm-Pakete bereitgestellt.** Apps importieren niemals den Quellcode der jeweils anderen. Alles, was wiederverwendet wird, überschreitet Repository-Grenzen über `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`. Siehe [Gemeinsam genutzte Bibliotheken](../shared-libraries/index.md).

## Systemübersichten

| Seite | Inhalt | Betrifft |
|------|----------------|-------|
| [Benachrichtigungen & Erinnerungen](./notifications.md) | Wie eine Person über etwas informiert wird: die beiden Versandwege, die Eskalationskette der Kanäle und die Erinnerungs-Engine | Api (messaging), B1Admin, B1App |
| [Echtzeit-Architektur](../realtime.md) | Das WebSocket-Auslieferungsframework hinter Chat, Anwesenheitsanzeige und In-App-Zustellung | Api (messaging), alle Web-Apps |
| [Web-Push-Benachrichtigungen](../web-push.md) | Der Push-Kanal im Browser: VAPID-Schlüssel, Speicherung von Abonnements, Zustellung | Api (messaging), alle Web-Apps |
| [Spenden](./giving.md) | Zahlungsanbieter und Gateways, Spendenabläufe, Fonds/Batches, Gateway-Webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Veranstaltungsanmeldungen](./registrations.md) | Das Modell für Anmeldungen als Handelsvorgang: Teilnehmertypen, Auswahlen, Rabattcodes, Zahlungen über das Spenden-Gateway und die Warteliste | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins.md) | Check-in am Kiosk und Selbst-Check-in, das Datenmodell der Anwesenheit, Raumzuordnung, die Kinderschutzebene, Etikettendruck | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website-Builder](./website-builder.md) | Der Baum aus Seiten, Abschnitten und Elementen, der Vertrag und die Renderer der Elementtypen, Blog, zugriffsbeschränkte Seiten, SEO und KI-Generierung | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website-Routing & Mehrfachstandorte](./websites.md) | Wie eine Anfrage einer Kirche und einer bestimmten Website zugeordnet wird, das Datenmodell für Mehrfachstandorte mit `siteId` und die Caddy-Edge für eigene Domains | B1App, Api (membership + content), B1Admin |
| [Integrationen](./integrations.md) | Die Erweiterungsschnittstelle: OAuth, API-Schlüssel, Webhooks, Content-Provider, MCP | Api, gemeinsam genutzte Bibliotheken, externe Apps |
| [Prüfprotokoll & rückgängig machbare Stapel](./audit-log.md) | Standardmäßig aktive Protokollierung jeder Änderung am zentralen Controller-Kontrollpunkt sowie die Stapelschicht, die Importe und Massenaktionen rückgängig machbar macht | Api (alle Module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Der kostenpflichtige Dienst für Speicher und SMS-Guthaben: Identität über ein geteiltes JWT, Service-Key-S2S, die Anbieterschnittstellen für Textnachrichten und Speicher, Stripe-Abrechnung | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-Pakete, B1Admin |
| [Eigener Speicher (Bring-Your-Own-Storage)](./byos-storage.md) | Kirchen verknüpfen Google Drive, Dropbox, OneDrive oder einen S3-kompatiblen Bucket für Uploads über die kostenlosen 100 MB hinaus: OAuth-Verbindung, Upload-Formate je Anbieter, die öffentliche Download-Weiterleitung | Api (content + membership), helpers/apphelper-Pakete, B1Admin, B1App |
| [Content Commons](./commons.md) | Die gemeinsame Basis für Assets und Einreichungen hinter anbieterübergreifenden nutzergenerierten Inhalten sowie die einzige, nur für Mitarbeiter zugängliche Moderationswarteschlange im Server Admin von B1Admin | Api (commons-Modul), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Wenn eine Änderung die Funktionsweise eines dieser Systeme verändert, nicht nur eine Seite innerhalb einer einzelnen App, sollte die passende Systemübersicht hier im selben Arbeitsschritt aktualisiert werden. So bleibt dieser Abschnitt verlässlich die erste Anlaufstelle für neue Mitwirkende.
:::

## Vorschläge

Diese Dokumente beschreiben geplante Arbeiten zur Prüfung und keine verfügbaren Produktfunktionen.

| Vorschlag | Inhalt |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Kircheneigenes Konto, Schlüssel, Dienst und Telefonnummer; Umfang der Integration, Einwilligung, Zustellung, Schätzungen und Freigabeprüfungen |
| [Twilio-Entwurf für das Onboarding von Kirchen](./twilio-byok-onboarding-draft.md) | Vorgeschlagene Einstellungen für das B1-Anmeldeformular, kirchenspezifische Kampagnenbeispiele sowie Checklisten für Freigabe und Betrieb |
