---
title: "Architektur"
---

# Architektur

<div class="article-intro">

Diese Seiten sind repositoryübergreifende Systemübersichten: Sie beschreiben, wie ein Kernsystem von ChurchApps von Anfang bis Ende funktioniert – über die Apps, die API-Module und die gemeinsamen Bibliotheken hinweg –, und nicht, wie ein einzelnes Projekt eingerichtet wird. Lesen Sie sie, bevor Sie das Verhalten eines Systems ändern; die [Einrichtung](../setup/) beschreibt, wie ein Projekt zum Laufen gebracht wird, und der [API-Bereich](../api/) enthält die Referenz auf Endpunktebene.

</div>

## Das Ökosystem im Überblick

ChurchApps besteht aus rund 20 unabhängigen Repositories (kein Monorepo). Die Client-Apps kommunizieren über HTTPS und WebSocket mit einer kleinen Zahl von Backend-APIs und teilen Code über npm-Pakete im Scope `@churchapps`.

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

Zwei strukturelle Regeln prägen alles, was in diesem Bereich dokumentiert ist:

1. **Module sind voneinander isoliert.** Jedes API-Modul besitzt seine eigene Datenbank und Tabellen; andere Module und Apps erreichen seine Daten ausschließlich über seine REST-Endpunkte. Siehe [Modulstruktur](../api/module-structure).
2. **Gemeinsamer Code wird als npm-Pakete ausgeliefert.** Apps importieren nie den Quellcode der jeweils anderen; alles Wiederverwendete überschreitet Repository-Grenzen über `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`. Siehe [Gemeinsame Bibliotheken](../shared-libraries/).

## Systemübersichten

| Seite | Inhalt | Umfasst |
|------|----------------|-------|
| [Benachrichtigungen & Erinnerungen](./notifications) | Wie jemand einer Person etwas mitteilt: die beiden Versandwege, die Eskalationskette der Kanäle und die Erinnerungs-Engine | Api (messaging), B1Admin, B1App |
| [Echtzeit-Architektur](../realtime) | Das WebSocket-Zustellungsframework hinter Chat, Anwesenheitsanzeige und In-App-Zustellung | Api (messaging), alle Web-Apps |
| [Web-Push-Benachrichtigungen](../web-push) | Der Push-Kanal im Browser: VAPID-Schlüssel, Speicherung der Abonnements, Zustellung | Api (messaging), alle Web-Apps |
| [Spenden](./giving) | Zahlungsanbieter und Gateways, Spendenabläufe, Fonds/Buchungen, Gateway-Webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Veranstaltungsanmeldungen](./registrations) | Das Handelsmodell für Anmeldungen: Teilnehmertypen, Auswahlen, Rabattcodes, Zahlungen über das Spenden-Gateway und die Warteliste | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins) | Kiosk- und Selbst-Check-in, das Anwesenheitsdatenmodell, Raumzuweisung, die Kindersicherheitsschicht, Etikettendruck | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website-Builder](./website-builder) | Der Baum aus Seiten, Abschnitten und Elementen, der Vertrag für Elementtypen und Renderer, Blog, zugriffsgeschützte Seiten, SEO und KI-Generierung | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website-Routing & Multi-Site](./websites) | Wie eine Anfrage einer Kirche und einer bestimmten Website zugeordnet wird, das Datenmodell für Multi-Site mit `siteId` und der Caddy-Edge für eigene Domains | B1App, Api (membership + content), B1Admin |
| [Integrationen](./integrations) | Die Erweiterungsschnittstelle: OAuth, API-Schlüssel, Webhooks, Content-Provider, MCP | Api, gemeinsame Bibliotheken, externe Apps |
| [Audit-Log & rückgängig machbare Stapel](./audit-log) | Standardmäßig aktive Protokollierung jeder Änderung am zentralen Controller-Zugangspunkt sowie die Stapelschicht, die Importe und Massenaktionen rückgängig machbar macht | Api (alle Module), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Der kostenpflichtige Speicher- und SMS-Guthabendienst: Identität über ein gemeinsames JWT, S2S mit Dienstschlüssel, die Schnittstellen für Text- und Speicheranbieter, Stripe-Abrechnung | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-Pakete, B1Admin |
| [Eigener Speicher (BYOS)](./byos-storage) | Kirchen verbinden Google Drive, Dropbox, OneDrive oder einen S3-kompatiblen Bucket für Uploads über die kostenlosen 100 MB hinaus: OAuth-Verbindung, Upload-Formate je Anbieter, öffentliche Download-Weiterleitung | Api (content + membership), helpers/apphelper-Pakete, B1Admin, B1App |
| [Inhalts-Gemeinschaft](./commons) | Die gemeinsame Basis für Assets und Einreichungen hinter anbieterübergreifenden nutzergenerierten Inhalten und die einzige, nur für das Personal bestimmte Moderationswarteschlange im Server-Admin von B1Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Wenn eine Änderung die Funktionsweise eines dieser Systeme betrifft – nicht nur eine Seite innerhalb einer App –, sollte die passende Systemübersicht hier im selben Arbeitsgang aktualisiert werden. So bleibt dieser Bereich vertrauenswürdig als erste Anlaufstelle für neue Mitwirkende.
:::

## Vorschläge

Diese Dokumente beschreiben vorgeschlagene Arbeiten zur Prüfung und keine verfügbaren Produktfunktionen.

| Vorschlag | Inhalt |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Kontrolle durch die Kirche über Konto, Schlüssel, Dienst und Telefonnummer; Umfang der Integration, Einwilligung, Zustellung, Schätzungen und Freigabeprüfungen |
| [Entwurf für die Twilio-Einführung in Kirchen](./twilio-byok-onboarding-draft) | Vorgeschlagene Einstellungen des B1-Anmeldeformulars, Beispiele für kirchenspezifische Kampagnen sowie Checklisten für Freigabe und Betrieb |
