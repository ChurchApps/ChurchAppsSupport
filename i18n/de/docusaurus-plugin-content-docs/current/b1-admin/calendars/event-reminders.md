---
title: "Ereigniserinnerungen"
---

# Ereigniserinnerungen

<div class="article-intro">

Ereigniserinnerungen benachrichtigen automatisch die richtigen Personen vor einem Ereignis — zum Beispiel „Verpassen Sie es nicht! Der Healthcare-Workshop beginnt morgen um 9:00 Uhr." Sie konfigurieren eine Erinnerung einmalig am Ereignis, und B1 sendet sie zum geplanten Zeitpunkt über Push-Benachrichtigungen und E-Mail aus. Mitglieder können kontrollieren, welche Erinnerungen sie von ihren eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie das Ereignis, an das Sie Personen erinnern möchten (siehe [Creating Calendars](creating-calendars))
- Um registrierte Teilnehmer zu erreichen, [aktivieren Sie die Registrierung](creating-calendars) beim Ereignis
- Um eine ganze Gruppe zu erreichen, stellen Sie sicher, dass das Ereignis zu einer [Gruppe](../groups/creating-groups) mit Mitgliedern gehört

</div>

## Einrichten einer Erinnerung

Sie konfigurieren Erinnerungen im Bereich **Reminders** des Ereignisses.

- Wenn Sie **ein neues Ereignis erstellen**, erweitern Sie den Bereich **Reminders** im Ereigniseditor, bevor Sie speichern.
- Für ein **vorhandenes Ereignis**, öffnen Sie die Seite **Registration Details** des Ereignisses (aus dem Bereich **Registrations**), um seine Erinnerung hinzuzufügen oder zu ändern.

1. Aktivieren Sie **Enable reminders**.
2. Wählen Sie **When** zum Senden aus. Wählen Sie bis zu drei Zeitpunkte: **7 days before**, **3 days before**, **1 day before** und **Day of**.
3. Legen Sie die **Time of day** fest, zu der die Erinnerung ausgehen soll (Standard ist **9:00 AM**, in der Zeitzone Ihrer Kirche).
4. Wählen Sie **Who** erinnert werden soll (siehe [Who Gets Reminded](#who-gets-reminded) unten).
5. Fügen Sie optional eine **Message** hinzu. Lassen Sie sie leer, um die Standardformulierung zu verwenden, oder schreiben Sie Ihre eigene — Sie können `{{eventTitle}}` einfügen, und es wird durch den Namen des Ereignisses ersetzt.
6. Wählen Sie die **Channels**: **Push**-Benachrichtigung, **Email** oder beides.
7. Speichern Sie das Ereignis.

Während Sie Änderungen vornehmen, zeigt eine **live preview** ungefähr, wie viele Personen erinnert werden, wie viele Teilnehmer nicht erreicht werden können, und die nächsten geplanten Sendezeiten — damit Sie bestätigen können, dass die Erinnerung vor dem Speichern korrekt aussieht.

## Wer wird erinnert

Die Einstellung **Who** kontrolliert, an wen die Erinnerung geht:

- **Registrants only** — Jeder, der sich für das Ereignis registriert hat und mit einem Personendatensatz verknüpft ist. Dies ist die Standardeinstellung, wenn das Ereignis die Registrierung aktiviert hat, sodass eine Erinnerung für ein kleines registriertes Ereignis niemals versehentlich an eine ganze Gruppe geht.
- **Heads / registrants only** — Eine Erinnerung pro Registrierung (die Person, die sich registriert hat), anstatt jeden Familienmitglied bei der Registrierung zu erinnern.
- **Group members** — Jeder in der Gruppe des Ereignisses. Dies ist die Standardeinstellung, wenn das Ereignis keine Registrierung verwendet.
- **Auto** — Verwendet Registranten, wenn die Registrierung aktiviert ist, ansonsten die Gruppe.

:::info
Gäste, die nur nach Name hinzugefügt wurden (ohne verknüpften Personendatensatz), können keine Erinnerung erhalten, da es kein Konto, kein Gerät oder keine E-Mail zum Senden gibt. Die Vorschau zeigt Ihnen, wie viele Teilnehmer in diese Gruppe fallen, damit es keine Überraschungen gibt. Mitglieder, die sich von der Kommunikation abgemeldet haben, werden ebenfalls übersprungen.
:::

## Wann Erinnerungen gesendet werden

- Erinnerungen werden zur **Zeit des Tages, die Sie wählen**, in der Zeitzone Ihrer Kirche gesendet, an jedem der gewählten Zeitpunkte.
- Wenn Sie **das Datum oder die Uhrzeit des Ereignisses ändern**, werden die ausstehenden Erinnerungen automatisch neu geplant — Sie müssen die Erinnerung nicht bearbeiten.
- Wenn Sie **das Ereignis löschen** (oder ein einzelnes Vorkommen eines wiederkehrenden Ereignisses abbrechen), werden dessen ausstehende Erinnerungen automatisch storniert.
- Wiederkehrende Ereignisse werden automatisch behandelt: Jedes bevorstehende Vorkommen erhält seine eigene Erinnerung.

:::tip
Erinnerungen werden **zuerst per Push gesendet, mit E-Mail als Fallback** gesendet. Wenn ein Mitglied Push-Benachrichtigungen aktiviert hat, erhält es eine Push-Benachrichtigung; wenn nicht, erhält es stattdessen eine E-Mail. Mitglieder wählen die gewünschten Kanäle pro Benachrichtigungstyp in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences).
:::

## Was Mitglieder kontrollieren können

Erinnerungen respektieren immer die [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) jedes Mitglieds. Ein Mitglied kann:

- **Event Reminders** für Push oder E-Mail ausschalten, während andere Benachrichtigungen eingeschaltet bleiben.
- **quiet hours** einstellen, damit nicht-dringende Benachrichtigungen bis zu einer angemessenen Zeit warten.

Sie können die Wahl eines Mitglieds, sich von Ereigniserinnerungen abzumelden, nicht außer Kraft setzen — dies hält B1 konform mit Anti-Spam-Regeln und gibt Mitgliedern die Kontrolle über ihren Posteingang.

## Serving Reminders

Freiwillige, die in einem Plan eingeplant sind, erhalten eine separate **serving reminder** mit den Plandetails und, wenn sie noch nicht geantwortet haben, **Accept / Decline**-Schaltflächen direkt in der E-Mail. Diese Erinnerungen werden auf dem Plantyp statt auf einem Kalenderereignis konfiguriert — siehe [Sunday Volunteers](../guides/sunday-volunteers), um zu erfahren, wie Freiwilligeneinsatzplanung und Erinnerungen funktionieren.

## Nächste Schritte

- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) — Was Mitglieder kontrollieren können
- [Event Registration Guide](../guides/event-registration) — Richten Sie die Registrierung ein, damit Erinnerungen Teilnehmer erreichen können
- [Creating Calendars](creating-calendars) — Zurück zur Kalendereinrichtung
