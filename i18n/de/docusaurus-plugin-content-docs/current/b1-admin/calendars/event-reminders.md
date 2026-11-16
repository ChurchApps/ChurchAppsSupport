---
title: "Veranstaltungserinnerungen"
description: "Richten Sie in B1 Admin Veranstaltungserinnerungen per Push, E-Mail und SMS ein. Wählen Sie Zeitpunkt, Empfänger und eine eigene Nachricht, damit Menschen rechtzeitig benachrichtigt werden."
---

# Veranstaltungserinnerungen {#event-reminders}

<div class="article-intro">

Veranstaltungserinnerungen benachrichtigen die richtigen Personen automatisch, bevor eine Veranstaltung stattfindet – zum Beispiel „Nicht verpassen! Der Gesundheits-Workshop beginnt morgen um 9:00 Uhr.“ Sie konfigurieren eine Erinnerung einmal an der Veranstaltung, und B1 versendet sie termingerecht per Push-Benachrichtigung, E-Mail und, falls Ihre Kirche den Textversand eingerichtet hat, per SMS. Mitglieder können in ihren eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) steuern, welche Erinnerungen sie erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Erstellen Sie die Veranstaltung, an die Sie erinnern möchten (siehe [Kalender erstellen](./creating-calendars.md))
- Um registrierte Teilnehmende zu erreichen, [aktivieren Sie die Anmeldung](./creating-calendars.md) für die Veranstaltung
- Um eine ganze Gruppe zu erreichen, stellen Sie sicher, dass die Veranstaltung zu einer [Gruppe](../groups/creating-groups.md) mit Mitgliedern gehört

</div>

## Eine Erinnerung einrichten {#setting-up-a-reminder}

Sie konfigurieren Erinnerungen im Abschnitt **Erinnerungen** der Veranstaltung. Klappen Sie ihn auf, um die Einstellungen zu sehen.

- Wenn Sie eine **neue Veranstaltung anlegen**, klappen Sie unten im Editor **Neues Ereignis** den Abschnitt **Erinnerungen** auf. Die Erinnerung wird beim Speichern der Veranstaltung gespeichert.
- Bei einer **bestehenden Veranstaltung** verwenden Sie den Abschnitt **Erinnerungen** an einer dieser Stellen und klicken Sie im Abschnitt auf die Schaltfläche **Speichern**: im Dialog, der sich öffnet, wenn Sie die Veranstaltung im Kalender anklicken, im Editor **Ereignis bearbeiten** oder auf der Anmeldeseite der Veranstaltung (**Kalender > Anmeldungen**, dann die Veranstaltung).

1. Aktivieren Sie **Erinnerungen aktivieren**.
2. Wählen Sie unter **Wann (bis zu 3)** aus, wann gesendet werden soll: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** und **Am Tag**. Sobald drei ausgewählt sind, sind die übrigen deaktiviert, bis Sie eine davon abwählen.
3. Legen Sie unter **Uhrzeit** die Uhrzeit fest, zu der die Erinnerung versendet werden soll (Standard ist **9:00 Uhr**, in der [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche).
4. Wählen Sie, wer erinnert werden soll (siehe [Wer erhält eine Erinnerung](#who-gets-reminded) unten).
5. Fügen Sie optional unter **Nachricht (optional)** eine Nachricht hinzu. Lassen Sie das Feld leer, um den Standardtext zu verwenden, oder schreiben Sie Ihren eigenen Text. Sie können `{{eventTitle}}` einfügen; es wird durch den Namen der Veranstaltung ersetzt.
6. Wählen Sie die **Kanäle**: **Push**-Benachrichtigung und **E-Mail** (beide standardmäßig aktiviert) und, falls Ihre Kirche einen [Textnachrichten-Anbieter](../settings/church-settings.md#texting) verbunden hat, **Text**.
7. Klicken Sie auf **Speichern** (oder speichern Sie die neue Veranstaltung).

Um die Erinnerungen für eine Veranstaltung zu beenden, deaktivieren Sie **Erinnerungen aktivieren** und speichern Sie.

### Eine Erinnerung jetzt senden {#sending-a-reminder-now}

Klicken Sie bei einer bereits gespeicherten Veranstaltung neben **Speichern** auf **Jetzt senden**, um die Erinnerung sofort zu senden – etwa nach einer kurzfristigen Änderung. Es werden die gespeicherten Einstellungen verwendet und dieselben Personen erreicht, und zwar für den nächsten anstehenden Termin der Veranstaltung. B1 zeigt danach an, wie viele Personen erreicht wurden, zum Beispiel **An 12 Personen gesendet**. Ihre geplanten Erinnerungen werden weiterhin wie vorgesehen versendet.

**Jetzt senden** ist nur verfügbar, wenn Erinnerungen aktiviert und gespeichert sind. Speichern Sie Änderungen daher zuerst. Wenn die Erinnerung **Text** enthält, benötigen Sie außerdem die Berechtigung zum Versenden von Textnachrichten.

Bei einer bereits gespeicherten Veranstaltung zeigt eine **Live-Vorschau** beim Ändern ungefähr an, wie viele Personen erinnert werden, wie viele Teilnehmende nicht erreicht werden können und wann die nächsten geplanten Versände erfolgen. So können Sie vor dem Speichern prüfen, ob die Erinnerung richtig aussieht. Eine neu angelegte Veranstaltung hat erst eine Vorschau, wenn sie gespeichert wurde.

## Wer erhält eine Erinnerung {#who-gets-reminded}

Die Einstellung **Wer** legt fest, an wen die Erinnerung geht:

- **Nur Angemeldete** – Alle für die Veranstaltung Angemeldeten, die mit einem Personendatensatz verknüpft sind. Dies ist die Voreinstellung, wenn für die Veranstaltung die Anmeldung aktiviert ist. So geht eine Erinnerung für eine kleine Anmeldeveranstaltung nie versehentlich an eine ganze Gruppe.
- **Anmeldende Hauptpersonen / nur Angemeldete** – Eine Erinnerung pro Anmeldung (an die Person, die sich angemeldet hat), statt an jedes Familienmitglied auf der Anmeldung.
- **Gruppenmitglieder** – Alle Mitglieder der Gruppe der Veranstaltung. Dies ist die Voreinstellung, wenn die Veranstaltung keine Anmeldung verwendet.
- **Automatisch** – Verwendet die Angemeldeten, wenn die Anmeldung aktiviert ist, andernfalls die Gruppe.

:::info
Gäste, die nur mit Namen hinzugefügt wurden (ohne verknüpften Personendatensatz), können keine Erinnerung erhalten, weil kein Konto, Gerät und keine E-Mail-Adresse vorhanden ist, an die sie gesendet werden könnte. Die Vorschau zeigt an, wie viele Teilnehmende in diese Gruppe fallen, damit es keine Überraschungen gibt. Mitglieder, die der Kommunikation widersprochen haben, werden ebenfalls übersprungen.
:::

## Wann Erinnerungen versendet werden {#when-reminders-are-sent}

- Erinnerungen werden zur **Uhrzeit, die Sie gewählt haben**, in der lokalen Zeitzone Ihrer Kirche versendet, jeweils zu den von Ihnen ausgewählten Abständen.
- Wenn Sie das **Datum oder die Uhrzeit der Veranstaltung ändern**, werden ausstehende Erinnerungen automatisch neu geplant. Sie müssen die Erinnerung nicht bearbeiten.
- Wenn Sie die **Veranstaltung löschen** (oder ein einzelnes Vorkommen einer wiederkehrenden Veranstaltung absagen), werden die ausstehenden Erinnerungen automatisch storniert.
- Wiederkehrende Veranstaltungen werden automatisch behandelt: Jedes anstehende Vorkommen erhält eine eigene Erinnerung.

:::tip
Erinnerungen werden **zuerst per Push gesendet, mit E-Mail als Ersatz**. Wenn ein Mitglied Push-Benachrichtigungen aktiviert hat, erhält es einen Push. Wenn nicht, erhält es stattdessen eine E-Mail. Mitglieder wählen in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) pro Benachrichtigungstyp, welche Kanäle sie nutzen möchten.
:::

## Textnachricht-Erinnerungen {#text-reminders}

Der Kanal **Text** erscheint nur, wenn Ihre Kirche einen Textnachrichten-Anbieter verbunden hat. Textnachrichten werden über den Textnachrichten-Anbieter Ihrer Kirche verschickt, und jede Nachricht kann Ihre Kirche Geld kosten. Sie werden zusätzlich zu einer etwaigen Push- oder E-Mail-Erinnerung versendet, und zwar nur an Personen, die:

- in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) **Textnachrichten** aktiviert haben und
- eine Mobilnummer in ihrem Profil hinterlegt haben.

Jede Nachricht beginnt mit dem Namen Ihrer Kirche, besteht aus einer einzigen SMS und endet mit „Mit STOP antworten, um sich abzumelden.“ Wer mit STOP antwortet, erhält keine Textnachrichten mehr von Ihrer Kirche. Damit STOP-Antworten B1 erreichen, fügen Sie die **URL des Webhooks für eingehende STOP-Nachrichten** aus Ihren [Textnachrichten-Einstellungen](../settings/church-settings.md#texting) in den Webhook für eingehende Nachrichten Ihres Anbieters ein.

## Was Mitglieder steuern können {#what-members-can-control}

Erinnerungen berücksichtigen stets die [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) jedes Mitglieds. Ein Mitglied kann:

- **Ereigniserinnerungen** für Push, E-Mail oder Text ausschalten, während andere Benachrichtigungen eingeschaltet bleiben.
- Textnachricht-Erinnerungen mit **Textnachrichten** ein- oder ausschalten.
- **Ruhezeiten** festlegen, damit nicht dringende Benachrichtigungen zu einer angemessenen Zeit warten.

Die Entscheidung eines Mitglieds, sich von Veranstaltungserinnerungen abzumelden, können Sie nicht außer Kraft setzen. So bleibt B1 mit den Anti-Spam-Regeln konform, und Mitglieder behalten die Kontrolle über ihren Posteingang.

## Erinnerungen für Ehrenamtliche {#serving-reminders}

Ehrenamtliche, die für einen Plan eingeteilt sind, erhalten eine separate **Dienst-Erinnerung** mit den Plandetails und – wenn sie noch nicht geantwortet haben – Schaltflächen **Annehmen / Ablehnen** direkt in der E-Mail. Diese Erinnerungen werden am Planungstyp konfiguriert statt an einer Kalenderveranstaltung und können auch per SMS versendet werden. Siehe [Erinnerungen für Ehrenamtliche](../serving/plans.md#volunteer-reminders) und [Ehrenamtliche am Sonntag](../guides/sunday-volunteers.md), wie die Ehrenamtsplanung und ihre Erinnerungen funktionieren.

## Nächste Schritte {#next-steps}

- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences.md) – Was Mitglieder steuern können
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration.md) – Anmeldung einrichten, damit Erinnerungen Teilnehmende erreichen
- [Kalender erstellen](./creating-calendars.md) – Zurück zur Kalendereinrichtung
