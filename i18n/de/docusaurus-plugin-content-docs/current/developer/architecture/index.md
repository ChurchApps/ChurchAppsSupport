---
title: "Architektur"
---

# Architektur

<div class="article-intro">

Diese Seiten sind Cross-Repo-System-Karten: Sie dokumentieren, wie ein Kern-ChurchApps-System von End-zu-End funktioniert — über die Apps, die API-Module und die gemeinsamen Bibliotheken — statt wie ein einzelnes Projekt eingerichtet wird. Lesen Sie sie, bevor Sie das Verhalten eines Systems ändern; lesen Sie [Setup](../setup/) um ein Projekt laufen zu lassen und den [API-Bereich](../api/) für Endpoint-Level-Referenz.

</div>

## Das Ökosystem auf einen Blick

ChurchApps ist etwa 20 unabhängige Repositories (nicht ein Monorepo). Client-Apps sprechen mit einer kleinen Menge Backend-APIs über HTTPS und WebSocket und teilen Code über npm-Pakete, die unter dem `@churchapps` Umfang veröffentlicht werden.

```
┌────────────────────────────────┐            ┌──────────────────────────────┐
│  Clients                       │            │  Api — Modular Monolith      │
│                                │            │                              │
│  B1Admin    Staff Dashboard    │   HTTPS    │  membership  attendance       │
│  B1App      Mitglieder-Portal  │ ─────────▶ │  content     giving          │
│  B1Checkin  Check-In Kiosk     │ ◀─WS────▶  │  messaging   doing           │
│  B1Mobile   (Wartung nur)      │            │                              │
│  FreePlay   TV-Inhalts-Player  │            │  eine MySQL DB pro Modul     │
└───────────────┬────────────────┘            └──────────────────────────────┘
                │
                │  gemeinsamer Code via npm (@churchapps/*)
                ▼
        helpers · apphelper · apihelper
```

Zwei strukturelle Regeln prägen alles:

1. **Module sind isoliert.** Jedes Api-Modul besitzt seine Datenbank; andere Module und Apps erreichen ihre Daten nur durch ihre REST-Endpoints.
2. **Gemeinsamer Code wird als npm-Pakete ausgeliefert.** Apps importieren nie gegenseitig Source; alles Wiederverwendete durchquert Repo-Grenzen durch `@churchapps/helpers`, `@churchapps/apphelper` oder `@churchapps/apihelper`.

## System-Karten

| Seite | Was sie abdeckt | Spannweite |
|------|--|--|
| [Benachrichtigungen & Erinnerungen](./notifications) | Wie etwas jemandem etwas mitteilt: Zwei Dispatch-Türen, Kanal-Eskalationskette und Erinnerungs-Motor | Api, B1Admin, B1App |
| [Echtzeit-Architektur](../realtime) | WebSocket-Delivery-Framework hinter Chat, Präsenz | Api, alle Web-Apps |
| [Web-Push-Benachrichtigungen](../web-push) | Browser-Push-Kanal | Api, alle Web-Apps |
| [Spenden](./giving) | Zahlungs-Anbieter, Gateways, Spenden-Flows | Api, B1App, B1Admin |
| [Ereignis-Registrierungen](./registrations) | Registrierungs-Handels-Modell, Zahlungen, Warteliste | Api, B1App, B1Admin |
| [Check-Ins](./check-ins) | Kiosk und Self Check-In, Anwesenheits-Datenmodell | B1Checkin, B1App, B1Admin, Api |
| [Website-Erstellung](./website-builder) | Seiten/Abschnitte/Elemente-Baum, Renderer, AI-Erzeugung | Api, B1Admin, B1App |
| [Website-Routing & Multi-Site](./websites) | Wie ein Anfrage zu einer Gemeinde/Site löst | B1App, Api, B1Admin |
| [Integrationen](./integrations) | Erweiterungs-Oberfläche: OAuth, API-Schlüssel, Webhooks | Api, Shared Libraries |
| [Audit-Protokoll & Undo](./audit-log) | Standard-Überwachung, Batch-Rückgängigmachen | Api, B1Admin |

:::tip
Wenn eine Änderung die Arbeit eines dieser Systeme ändert, sollte die passende System-Karte hier im gleichen Aufwand aktualisiert werden. Das hält diesen Bereich zuverlässig.
:::
