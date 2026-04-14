---
title: "Messaging-Endpunkte"
---

# Messaging-Endpunkte

<div class="article-intro">

Das Messaging-Modul verwaltet Echtzeit-Gespräche, Chat-Nachrichten, Push-Benachrichtigungen, SMS-/E-Mail-Lieferung, WebSocket-Verbindungen, private Messaging, Geräte-Registrierung und Texting-Anbieter. Es bietet die Kommunikations-Schicht für alle ChurchApps-Anwendungen.

</div>

**Basis-Pfad:** `/messaging`

## Gespräche

Basis-Pfad: `/messaging/conversations`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Laden Sie Gespräche nach komma-separierten IDs |
| GET | `/messages/:contentType/:contentId` | JWT | — | Laden Sie Gespräche für Inhalte mit paginierten Nachrichten |
| POST | `/` | JWT | — | Erstellen oder aktualisieren Sie Gespräche (Batch) |
| DELETE | `/:churchId/:id` | JWT | — | Löschen Sie ein Gespräch |

## Nachrichten

Basis-Pfad: `/messaging/messages`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Laden Sie alle Nachrichten für ein Gespräch |
| POST | `/` | JWT | — | Speichern Sie Nachrichten (Batch) |
| DELETE | `/:churchId/:id` | JWT | — | Löschen Sie eine Nachricht |

## Benachrichtigungen

Basis-Pfad: `/messaging/notifications`

| Methode | Pfad | Auth | Berechtigung | Beschreibung |
|---------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Holen Sie die Anzahl der ungelesenen Benachrichtigungen |
| GET | `/my` | JWT | — | Laden Sie alle Benachrichtigungen für den aktuellen Benutzer |
| POST | `/` | JWT | — | Erstellen oder aktualisieren Sie Benachrichtigungen (Batch) |
| DELETE | `/:churchId/:id` | JWT | — | Löschen Sie eine Benachrichtigung |

## Verwandte Seiten

- [Membership-Endpunkte](./membership) — Personen, Gruppen, Rollen und Kern-Identität
- [Anwesenheits-Endpunkte](./attendance) — Dienst- und Besuchs-Verfolgung
