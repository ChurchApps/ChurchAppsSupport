---
title: "Ereigniserinnerungen"
description: "Richten Sie in B1 Admin Ereigniserinnerungen per Push, E-Mail und Textnachricht ein, wählen Sie Zeitpunkt, Empfänger und eine eigene Nachricht, damit Personen rechtzeitig benachrichtigt werden."
---

# Ereigniserinnerungen

<div class="article-intro">

Ereigniserinnerungen benachrichtigen automatisch die richtigen Personen, bevor ein Ereignis stattfindet – zum Beispiel: „Nicht verpassen! Der Workshop zum Thema Gesundheit beginnt morgen um 9:00 Uhr.“ Sie konfigurieren eine Erinnerung einmal am Ereignis, und B1 versendet sie zum geplanten Zeitpunkt per Push-Benachrichtigung, E-Mail und – falls Ihre Kirche den Textversand eingerichtet hat – Textnachrichten. Mitglieder können über ihre eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) steuern, welche Erinnerungen sie erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie das Ereignis an, an das Sie erinnern möchten (siehe [Kalender erstellen](./creating-calendars.md))
- Um angemeldete Teilnehmende zu erreichen, [aktivieren Sie die Anmeldung](./creating-calendars.md) für das Ereignis
- Um eine ganze Gruppe zu erreichen, stellen Sie sicher, dass das Ereignis zu einer [Gruppe](../groups/creating-groups.md) mit Mitgliedern gehört

</div>

## Eine Erinnerung einrichten {#setting-up-a-reminder}

Sie konfigurieren Erinnerungen im Bereich **Erinnerungen** des Ereignisses. Klappen Sie ihn auf, um die Einstellungen zu sehen.

- Wenn Sie ein **neues Ereignis anlegen**, klappen Sie unten im Editor **Neues Ereignis** den Bereich **Erinnerungen** auf; die Erinnerung wird mit dem Speichern des Ereignisses gesichert.
- Bei einem **bestehenden Ereignis** verwenden Sie den Bereich **Erinnerungen** an einem dieser Orte und klicken Sie auf die Schaltfläche **Speichern** im Bereich: im Dialog, der sich öffnet, wenn Sie im Kalender auf das Ereignis klicken, im Editor **Ereignis bearbeiten** oder auf der Anmeldeseite des Ereignisses (**Kalender > Anmeldungen**, dann das Ereignis).

1. Aktivieren Sie **Erinnerungen aktivieren**.
2. Wählen Sie unter **Wann (bis zu 3)**, wann gesendet werden soll: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** und **Am Tag**. Sobald drei ausgewählt sind, sind die übrigen deaktiviert, bis Sie eine abwählen.
3. Legen Sie die **Uhrzeit** fest, zu der die Erinnerung versendet werden soll (Standard ist **9:00 Uhr**, in der [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche).
4. Wählen Sie unter **Wer** aus, wer erinnert werden soll (siehe unten [Wer erhält eine Erinnerung](#who-gets-reminded)).
5. Fügen Sie optional eine **Nachricht (optional)** hinzu. Lassen Sie das Feld leer, um den Standardtext zu verwenden, oder schreiben Sie Ihren eigenen – Sie können `{{eventTitle}}` verwenden; dieser Platzhalter wird durch den Namen des Ereignisses ersetzt.
6. Wählen Sie die **Kanäle**: **Push**-Benachrichtigung und **E-Mail** (beide standardmäßig aktiviert) sowie **Text**, falls Ihre Kirche einen [Anbieter für Textnachrichten](../settings/church-settings.md#texting) verbunden hat.
7. Klicken Sie auf **Speichern** (oder speichern Sie das neue Ereignis).

Um Erinnerungen für ein Ereignis zu beenden, deaktivieren Sie **Erinnerungen aktivieren** und speichern Sie.

Bei einem bereits gespeicherten Ereignis zeigt eine **Live-Vorschau** beim Ändern ungefähr an, wie viele Personen erinnert werden, wie viele Teilnehmende nicht erreicht werden können und wann die nächsten Versandtermine liegen – so können Sie prüfen, ob die Erinnerung richtig aussieht, bevor Sie speichern. Ein brandneues Ereignis hat keine Vorschau, bis es gespeichert wurde.

## Wer erhält eine Erinnerung {#who-gets-reminded}

Die Einstellung **Wer** legt fest, an wen die Erinnerung geht:

- **Nur Angemeldete** – Alle für das Ereignis angemeldeten Personen, die mit einem Personendatensatz verknüpft sind. Dies ist der Standard, wenn für das Ereignis die Anmeldung aktiviert ist, damit eine Erinnerung für ein kleines angemeldetes Ereignis nie versehentlich an eine ganze Gruppe geht.
- **Anmeldende Hauptpersonen / nur Angemeldete** – Eine Erinnerung pro Anmeldung (an die Person, die sich angemeldet hat), statt an jedes Familienmitglied auf der Anmeldung.
- **Gruppenmitglieder** – Alle Personen in der Gruppe des Ereignisses. Dies ist der Standard, wenn das Ereignis keine Anmeldung nutzt.
- **Automatisch** – Verwendet die Angemeldeten, wenn die Anmeldung aktiviert ist, andernfalls die Gruppe.

:::info
Gäste, die nur mit Namen eingetragen wurden (ohne verknüpften Personendatensatz), können keine Erinnerung erhalten, weil kein Konto, kein Gerät und keine E-Mail-Adresse zum Senden vorhanden ist. Die Vorschau zeigt Ihnen, wie viele Teilnehmende in diese Gruppe fallen, damit es keine Überraschungen gibt. Mitglieder, die sich von Mitteilungen abgemeldet haben, werden ebenfalls übersprungen.
:::

## Wann Erinnerungen versendet werden {#when-reminders-are-sent}

- Erinnerungen werden zur **von Ihnen gewählten Uhrzeit** in der Ortszeit Ihrer Kirche und zu jedem ausgewählten Zeitabstand ausgelöst.
- Wenn Sie das **Datum oder die Uhrzeit des Ereignisses ändern**, werden die ausstehenden Erinnerungen automatisch neu geplant – Sie müssen die Erinnerung nicht bearbeiten.
- Wenn Sie das **Ereignis löschen** (oder einen einzelnen Termin eines wiederkehrenden Ereignisses absagen), werden die ausstehenden Erinnerungen automatisch storniert.
- Wiederkehrende Ereignisse werden automatisch behandelt: Jeder kommende Termin erhält eine eigene Erinnerung.

:::tip
Erinnerungen werden **zuerst per Push, mit E-Mail als Rückfall** versendet. Hat ein Mitglied Push-Benachrichtigungen aktiviert, erhält es eine Push-Benachrichtigung; andernfalls erhält es stattdessen eine E-Mail. Mitglieder wählen in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) für jede Benachrichtigungsart, welche Kanäle sie möchten.
:::

## Textnachrichten als Erinnerung {#text-reminders}

Der Kanal **Text** erscheint nur, wenn Ihre Kirche einen Anbieter für Textnachrichten verbunden hat. Textnachrichten werden über den Anbieter Ihrer Kirche versendet, und jede Nachricht kann Ihre Kirche Geld kosten. Sie werden zusätzlich zu einer etwaigen Push- oder E-Mail-Erinnerung verschickt und nur an Personen, die:

- in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **Textnachrichten** aktiviert haben und
- in ihrem Profil eine Handynummer hinterlegt haben.

Mitarbeitende mit der Berechtigung, Textnachrichten zu versenden, können **Textnachrichten-Erinnerungen** für eine Person in deren [Datensatz](../people/adding-people.md#text-reminders) aktivieren, in der Zeile unter der Handynummer. Wenn Sie bei einer Erinnerung mit **Text** auf **Jetzt senden** klicken, zeigt B1 an, wie vielen Personen eine Textnachricht gesendet wurde und wie viele übersprungen wurden, zum Beispiel *An 2 Personen gesendet · 1 per Text, 1 übersprungen*.

Jede Nachricht beginnt mit dem Namen Ihrer Kirche, besteht aus einer einzigen Textnachricht und endet mit „Mit STOP antworten, um sich abzumelden.“ Wer mit STOP antwortet, erhält keine Textnachrichten mehr von Ihrer Kirche. Damit STOP-Antworten B1 erreichen, fügen Sie die **URL des Webhooks für eingehende STOP-Nachrichten** aus Ihren [Einstellungen für Textnachrichten](../settings/church-settings.md#texting) in den Webhook für eingehende Nachrichten Ihres Anbieters ein.

## Was Mitglieder steuern können {#what-members-can-control}

Erinnerungen berücksichtigen immer die [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) jedes Mitglieds. Ein Mitglied kann:

- **Ereigniserinnerungen** für Push, E-Mail oder Text ausschalten, während andere Benachrichtigungen aktiv bleiben.
- Textnachrichten-Erinnerungen über **Textnachrichten** ein- oder ausschalten.
- **Ruhezeiten** festlegen, damit nicht dringende Benachrichtigungen bis zu einer angemessenen Uhrzeit warten.

Die Entscheidung eines Mitglieds, sich von Ereigniserinnerungen abzumelden, können Sie nicht übergehen. So hält B1 die Anti-Spam-Regeln ein, und Mitglieder behalten die Kontrolle über ihr Postfach.

## Erinnerungen für Dienste {#serving-reminders}

Ehrenamtliche, die in einem Plan eingeplant sind, erhalten eine separate **Dienst-Erinnerung** mit den Plandetails und – solange sie noch nicht geantwortet haben – Schaltflächen **Annehmen / Ablehnen** direkt in der E-Mail. Diese Erinnerungen werden am Plantyp konfiguriert, nicht am Kalenderereignis, und können ebenfalls per Textnachricht versendet werden – siehe [Ehrenamt-Erinnerungen](../serving/plans.md#volunteer-reminders) und [Sonntags-Ehrenamt](../guides/sunday-volunteers.md), wie die Einteilung von Ehrenamtlichen und ihre Erinnerungen funktionieren.

## Nächste Schritte {#next-steps}

- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) – Was Mitglieder steuern können
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration.md) – Anmeldung einrichten, damit Erinnerungen Teilnehmende erreichen
- [Kalender erstellen](./creating-calendars.md) – Zurück zur Kalendereinrichtung
