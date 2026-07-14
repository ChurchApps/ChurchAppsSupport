---
title: "Benachrichtigungen & Erinnerungen Architektur"
---

# Benachrichtigungen & Erinnerungen Architektur

<div class="article-intro">

Jede Nachricht, die ein Kirchenmitglied außerhalb der Seite sieht, die es betrachtet – ein Badge-Zähler, eine Push-Benachrichtigung, eine Digest-E-Mail – läuft durch eine von zwei Türen in der MessagingApi. Diese Seite dokumentiert den Trichter, den Erinnerungs-Engine, der ihn nach Zeitplan füttet, und das Präferenz-Modell, das entscheidet, was tatsächlich eine Person erreicht.

</div>

## Übersicht – zwei Türen

```
geplant alles ──▶ ReminderEngine (Definitionen → Vorkommen → Scan) ─┐
Chat / Anfragen ─────────────────────────────────────────────────────┼─▶ createNotifications()
                                                                      │    In-App-Gate → Socket → Push → E-Mail
Transaktions-E-Mail ──▶ TransactionalEmailHelper.sendTransactional()
```

1. **Alles, das jemandem etwas sagt**, läuft durch `NotificationHelper.createNotifications()` im Messaging-Modul.
2. **Alles Geplante** ist eine `reminderDefinition`, erweitert in `reminderOccurrences`, versendet durch `ReminderEngine.scan()`.
3. **Direkte E-Mail** existiert nur hinter `TransactionalEmailHelper.sendTransactional()`.

## Kanal-Eskalationskette

| Stufe | Kanal | Verhalten |
|-------|-------|----------|
| 0 | **in_app / Socket** | In-App-Gate zuerst. Wenn unterdrückt, stoppt Lieferung. |
| 1 | **Push** | Zu Expo-Push-Token und Web-Push-Abos |
| 2 | **E-Mail** | Sofort oder Batch-Digest |

## Erinnerungs-Engine

Geplante Erinnerungen – Event-Erinnerungen, Aufgaben-Fälligkeitsdaten, Serving/Plan-Zuweisungs-Erinnerungen – alle läuft durch einen generalisierten Engine.
