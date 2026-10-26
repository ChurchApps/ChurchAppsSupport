---
title: "Veranstaltungserinnerungen"
---

# Veranstaltungserinnerungen

<div class="article-intro">

Veranstaltungserinnerungen benachrichtigen automatisch die richtigen Personen vor einer Veranstaltung, etwa mit "Nicht verpassen! Der Workshop zum Thema Gesundheit beginnt morgen um 9:00 Uhr." Sie konfigurieren eine Erinnerung einmal an der Veranstaltung, und B1 verschickt sie termingerecht per Push-Benachrichtigung, E-Mail und, wenn Ihre Kirche den Textnachrichtendienst eingerichtet hat, auch per SMS. Mitglieder können über ihre eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) steuern, welche Erinnerungen sie erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie die Veranstaltung an, an die Sie erinnern möchten (siehe [Kalender erstellen](creating-calendars)).
- Um registrierte Teilnehmende zu erreichen, [aktivieren Sie die Anmeldung](creating-calendars) für die Veranstaltung.
- Um eine ganze Gruppe zu erreichen, stellen Sie sicher, dass die Veranstaltung zu einer [Gruppe](../groups/creating-groups) mit Mitgliedern gehört.

</div>

## Eine Erinnerung einrichten

Sie konfigurieren Erinnerungen im Abschnitt **Erinnerungen** der Veranstaltung.

- Wenn Sie eine **neue Veranstaltung anlegen**, klappen Sie im Veranstaltungseditor vor dem Speichern den Abschnitt **Erinnerungen** auf.
- Bei einer **bestehenden Veranstaltung** öffnen Sie die Seite **Anmeldedetails** der Veranstaltung (aus dem Abschnitt **Anmeldungen**), um eine Erinnerung hinzuzufügen oder zu ändern.

1. Schalten Sie **Erinnerungen aktivieren** ein.
2. Wählen Sie unter **Wann** den Versandzeitpunkt. Wählen Sie bis zu drei Zeitpunkte: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** und **Am Tag selbst**.
3. Legen Sie die **Uhrzeit** fest, zu der die Erinnerung verschickt werden soll (Standard ist **9:00 Uhr**, in der [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche).
4. Wählen Sie unter **Wer** aus, wer erinnert werden soll (siehe unten [Wer erinnert wird](#who-gets-reminded)).
5. Fügen Sie optional eine **Nachricht** hinzu. Lassen Sie das Feld leer, um den Standardtext zu verwenden, oder schreiben Sie Ihren eigenen. Sie können `{{eventTitle}}` verwenden; dies wird durch den Namen der Veranstaltung ersetzt.
6. Wählen Sie die **Kanäle**: **Push**-Benachrichtigung, **E-Mail** und, wenn Ihre Kirche einen [SMS-Anbieter](../settings/church-settings.md#texting) verbunden hat, **SMS**.
7. Speichern Sie die Veranstaltung.

Während Sie Änderungen vornehmen, zeigt eine **Live-Vorschau** ungefähr an, wie viele Personen erinnert werden, wie viele Teilnehmende nicht erreicht werden können und wann die nächsten Versände geplant sind. So können Sie prüfen, ob die Erinnerung richtig aussieht, bevor Sie speichern.

## Wer erinnert wird

Die Einstellung **Wer** legt fest, an wen die Erinnerung geht:

- **Nur Angemeldete** -- Alle für die Veranstaltung angemeldeten Personen, die mit einem Personendatensatz verknüpft sind. Dies ist die Standardeinstellung, wenn für die Veranstaltung die Anmeldung aktiviert ist, damit eine Erinnerung für eine kleine Anmeldeveranstaltung nie versehentlich an eine ganze Gruppe geht.
- **Hauptanmeldende / nur Angemeldete** -- Eine Erinnerung pro Anmeldung (an die Person, die sich angemeldet hat), statt an jedes Familienmitglied auf der Anmeldung.
- **Gruppenmitglieder** -- Alle Personen in der Gruppe der Veranstaltung. Dies ist die Standardeinstellung, wenn die Veranstaltung keine Anmeldung verwendet.
- **Automatisch** -- Verwendet Angemeldete, wenn die Anmeldung aktiviert ist, andernfalls die Gruppe.

:::info
Gäste, die nur mit Namen erfasst wurden (ohne verknüpften Personendatensatz), können keine Erinnerung erhalten, weil es kein Konto, kein Gerät und keine E-Mail-Adresse gibt, an die sie gesendet werden könnte. Die Vorschau zeigt Ihnen, wie viele Teilnehmende in diese Gruppe fallen, damit es keine Überraschungen gibt. Mitglieder, die sich gegen Kommunikation entschieden haben, werden ebenfalls übersprungen.
:::

## Wann Erinnerungen verschickt werden

- Erinnerungen werden zu der **Uhrzeit verschickt, die Sie gewählt haben**, in der Ortszeit Ihrer Kirche, zu jedem der ausgewählten Zeitpunkte.
- Wenn Sie das **Datum oder die Uhrzeit der Veranstaltung ändern**, werden ausstehende Erinnerungen automatisch neu geplant -- Sie müssen die Erinnerung nicht bearbeiten.
- Wenn Sie die **Veranstaltung löschen** (oder einen einzelnen Termin einer wiederkehrenden Veranstaltung absagen), werden ihre ausstehenden Erinnerungen automatisch storniert.
- Wiederkehrende Veranstaltungen werden automatisch behandelt: Jeder kommende Termin erhält eine eigene Erinnerung.

:::tip
Erinnerungen werden **zuerst per Push, mit E-Mail als Rückfall** versendet. Hat ein Mitglied Push-Benachrichtigungen aktiviert, erhält es eine Push-Nachricht; ist dies nicht der Fall, erhält es stattdessen eine E-Mail. Mitglieder wählen in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) je Benachrichtigungstyp, welche Kanäle sie möchten.
:::

## Textnachrichten als Erinnerung

Der Kanal **SMS** erscheint nur, wenn Ihre Kirche einen Anbieter für Textnachrichten verbunden hat. Textnachrichten werden über den Anbieter Ihrer Kirche verschickt, und jede Nachricht kann Ihre Kirche etwas kosten. Sie werden zusätzlich zu einer Push- oder E-Mail-Erinnerung verschickt, und nur an Personen, die:

- in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) **Textnachrichten** aktiviert haben, und
- eine Handynummer in ihrem Profil hinterlegt haben.

Jede Nachricht beginnt mit dem Namen Ihrer Kirche, bleibt auf eine einzelne SMS beschränkt und endet mit "Antworte STOP, um dich abzumelden." Wer mit STOP antwortet, erhält keine Textnachrichten mehr von Ihrer Kirche. Damit STOP-Antworten B1 erreichen, fügen Sie die **Eingehende (STOP-)Webhook-URL** aus Ihren [Texteinstellungen](../settings/church-settings.md#texting) in den eingehenden Nachrichten-Webhook Ihres Anbieters ein.

## Was Mitglieder steuern können

Erinnerungen berücksichtigen immer die [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) jedes Mitglieds. Ein Mitglied kann:

- **Veranstaltungserinnerungen** für Push, E-Mail oder SMS ausschalten, während andere Benachrichtigungen eingeschaltet bleiben.
- SMS-Erinnerungen mit **Textnachrichten** ein- oder ausschalten.
- **Ruhezeiten** festlegen, damit nicht dringende Benachrichtigungen zu einer angemessenen Zeit zugestellt werden.

Sie können die Entscheidung eines Mitglieds, sich von Veranstaltungserinnerungen abzumelden, nicht außer Kraft setzen. Dies hält B1 mit den Anti-Spam-Regeln konform und lässt Mitglieder über ihren Posteingang entscheiden.

## Erinnerungen für Ehrenamtliche

Ehrenamtliche, die für einen Dienstplan eingeteilt sind, erhalten eine eigene **Dienst-Erinnerung** mit den Details des Plans und, wenn sie noch nicht geantwortet haben, die Schaltflächen **Annehmen / Ablehnen** direkt in der E-Mail. Diese Erinnerungen werden am Planungstyp konfiguriert, nicht an einer Kalenderveranstaltung, und können ebenfalls per SMS verschickt werden. Siehe [Ehrenamtliche erinnern](../serving/plans#volunteer-reminders) und [Sonntagsehrenamt](../guides/sunday-volunteers) dazu, wie Dienstplanung und Erinnerungen für Ehrenamtliche funktionieren.

## Nächste Schritte

- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) -- Was Mitglieder steuern können
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration) -- Anmeldung einrichten, damit Erinnerungen Teilnehmende erreichen können
- [Kalender erstellen](creating-calendars) -- Zurück zur Kalendereinrichtung
