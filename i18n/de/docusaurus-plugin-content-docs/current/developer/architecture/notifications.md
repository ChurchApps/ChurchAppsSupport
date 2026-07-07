---
title: "Benachrichtigungen & Erinnerungen Architektur"
---

# Benachrichtigungen & Erinnerungen Architektur

<div class="article-intro">

Jede Nachricht, die ein Gemeindeangehöriger außerhalb der Seite sieht, die er anschaut — ein Badge-Zähler, eine Push-Benachrichtigung, eine Digest-E-Mail — geht durch eine von zwei Türen in der MessagingApi. Diese Seite dokumentiert den Trichter, den Erinnerungs-Motor, der ihn auf einem Zeitplan speist, und das Präferenzen-Modell, das entscheidet, was einen wirklich erreicht.

</div>

## Überblick — zwei Türen

```
geplant etwas ──▶ ReminderEngine (Definitionen → Vorkommen → Scan) ──┐
Chat / Anfragen / Workflow ─────────────────────────────────────────┼─▶ createNotifications()
Konto/Legal E-Mail ──▶ TransactionalEmailHelper ────────────────────│    In-App Gate → Socket
                                                                     │    → Push → E-Mail
```

1. **Alles, was jemandem etwas mitteilt** geht durch `NotificationHelper.createNotifications()` im Messaging-Modul. Es behält eine `notifications` Zeile und eskaliert Socket → Push → E-Mail, evaluiert `PreferenceGateHelper` pro Kanal.
2. **Alles Geplante** ist eine `reminderDefinition` (Entitäts- oder Umfang-Level) erweitert in `reminderOccurrences` und versandt von `ReminderEngine.scan()` auf einem wiederkehrenden Timer.
3. **Direkte E-Mail** existiert nur hinter `TransactionalEmailHelper.sendTransactional()`.

## Der Benachrichtigungs-Trichter

`NotificationHelper.createNotifications()` ist der einzelne Eintrag für alles, das nicht geplant oder transaktiv ist. Für jeden Empfänger speichert es eine Zeile in `notifications` und ruft `attemptDeliveryWithEscalation`, das die Kanal-Leiter unten geht.

## Kanal-Eskalationskette

| Stufe | Kanal | Verhalten |
|---|---|---|
| 0 | **In-App / Socket** | Socket-Push für offene Verbindungen; deaktiviert nach 30 Minuten wenn ungelesen |
| 1 | **Push** | Gefiel durch `allowPush` / Kategorie-Opt-out / ruhige Stunden |
| 2 | **E-Mail** | Gefiel auf `emailFrequency` und Kategorie-Opt-out; Batch oder sofort |

## Erinnerungs-Motor

Geplante Erinnerungen — Ereignis-Erinnerungen, Task-Fälligkeitsdaten, Dienst-Zuweisungs-Erinnerungen — laufen alle durch eine verallgemeinerte Engine. Definitionen sind Entitäts- oder Umfang-Level mit Offsets, Kanälen und Nachricht. Expansion verwaltet das Feuer-Fenster, Dispatch beansprucht fällige Vorkommen.

## Verwandte Artikel

- [Real-Zeit-Architektur](../realtime) — Das WebSocket-Protokoll
- [Web-Push-Benachrichtigungen](../web-push) — Browser-Push-API
- [Messaging-Endpoints](../api/endpoints/messaging) — Vollständige REST-Oberfläche
