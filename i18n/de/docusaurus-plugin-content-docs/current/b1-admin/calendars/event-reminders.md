---
title: "Veranstaltungserinnerungen"
---

# Veranstaltungserinnerungen

<div class="article-intro">

Veranstaltungserinnerungen benachrichtigen automatisch die richtigen Personen vor einer Veranstaltung – zum Beispiel: „Nicht verpassen! Der Workshop zum Thema Gesundheit beginnt morgen um 9:00 Uhr.“ Sie richten eine Erinnerung einmal an der Veranstaltung ein, und B1 versendet sie termingerecht per Push-Benachrichtigung, E-Mail und, falls Ihre Kirche den Textnachrichtendienst eingerichtet hat, auch als SMS. Mitglieder können über ihre eigenen [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) steuern, welche Erinnerungen sie erhalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Legen Sie die Veranstaltung an, an die Sie erinnern möchten (siehe [Kalender erstellen](creating-calendars)).
- Um angemeldete Teilnehmende zu erreichen, [aktivieren Sie die Anmeldung](creating-calendars) für die Veranstaltung.
- Um eine ganze Gruppe zu erreichen, stellen Sie sicher, dass die Veranstaltung zu einer [Gruppe](../groups/creating-groups) mit Mitgliedern gehört.

</div>

## Eine Erinnerung einrichten

Sie konfigurieren Erinnerungen im Abschnitt **Erinnerungen** der Veranstaltung.

- Wenn Sie eine **neue Veranstaltung anlegen**, klappen Sie im Veranstaltungseditor vor dem Speichern den Abschnitt **Erinnerungen** auf.
- Für eine **bestehende Veranstaltung** öffnen Sie die Seite **Anmeldedetails** der Veranstaltung (über den Abschnitt **Anmeldungen**), um eine Erinnerung hinzuzufügen oder zu ändern.

1. Schalten Sie **Erinnerungen aktivieren** ein.
2. Wählen Sie unter **Wann** den Versandzeitpunkt. Sie können bis zu drei Zeitpunkte wählen: **7 Tage vorher**, **3 Tage vorher**, **1 Tag vorher** und **Am Tag selbst**.
3. Legen Sie die **Uhrzeit**, zu der die Erinnerung versendet werden soll, fest (Standard ist **9:00 Uhr**, in der [Zeitzone](../settings/church-settings.md#time-zone) Ihrer Kirche).
4. Wählen Sie unter **Wer** aus, wer erinnert werden soll (siehe unten [Wer erhält eine Erinnerung](#who-gets-reminded)).
5. Fügen Sie optional eine **Nachricht** hinzu. Lassen Sie das Feld leer, um den Standardtext zu verwenden, oder schreiben Sie Ihren eigenen Text. Sie können `{{eventTitle}}` einfügen; das wird durch den Namen der Veranstaltung ersetzt.
6. Wählen Sie die **Kanäle**: **Push**-Benachrichtigung, **E-Mail** und, falls ein [Anbieter für Textnachrichten](../settings/church-settings.md#texting) mit Ihrer Kirche verbunden ist, **SMS**.
7. Speichern Sie die Veranstaltung.

Während Sie Änderungen vornehmen, zeigt eine **Live-Vorschau** ungefähr an, wie viele Personen erinnert werden, wie viele Teilnehmende nicht erreicht werden können und wann die nächsten Versendungen geplant sind. So können Sie prüfen, ob die Erinnerung richtig aussieht, bevor Sie speichern.

## Wer erhält eine Erinnerung {#who-gets-reminded}

Die Einstellung **Wer** legt fest, an wen die Erinnerung geht:

- **Nur Angemeldete** – Alle angemeldeten Personen, die mit einem Personendatensatz verknüpft sind. Das ist die Standardeinstellung, wenn die Anmeldung für die Veranstaltung aktiviert ist, damit eine Erinnerung für eine kleine Veranstaltung mit Anmeldung nie versehentlich an eine ganze Gruppe geht.
- **Hauptpersonen / nur Angemeldete** – Eine Erinnerung pro Anmeldung (an die Person, die sich angemeldet hat), statt an jedes Familienmitglied auf der Anmeldung.
- **Gruppenmitglieder** – Alle Personen in der Gruppe der Veranstaltung. Das ist die Standardeinstellung, wenn die Veranstaltung keine Anmeldung verwendet.
- **Automatisch** – Verwendet die Angemeldeten, wenn die Anmeldung aktiviert ist, andernfalls die Gruppe.

:::info
Gäste, die nur mit Namen erfasst wurden (ohne verknüpften Personendatensatz), können keine Erinnerung erhalten, da kein Konto, kein Gerät und keine E-Mail-Adresse vorhanden ist, an die sie gesendet werden könnte. Die Vorschau zeigt an, wie viele Teilnehmende in diese Gruppe fallen, damit es keine Überraschungen gibt. Mitglieder, die sich von Kommunikation abgemeldet haben, werden ebenfalls übersprungen.
:::

## Wann Erinnerungen versendet werden

- Erinnerungen werden zu der **Uhrzeit, die Sie wählen**, in der Ortszeit Ihrer Kirche und zu jedem der gewählten Zeitpunkte versendet.
- Wenn Sie **Datum oder Uhrzeit der Veranstaltung ändern**, werden ausstehende Erinnerungen automatisch neu geplant – Sie müssen die Erinnerung nicht selbst bearbeiten.
- Wenn Sie **die Veranstaltung löschen** (oder einen einzelnen Termin einer wiederkehrenden Veranstaltung absagen), werden deren ausstehende Erinnerungen automatisch abgebrochen.
- Wiederkehrende Veranstaltungen werden automatisch berücksichtigt: Jeder kommende Termin erhält eine eigene Erinnerung.

:::tip
Erinnerungen werden **zuerst per Push** versendet, **E-Mail dient als Ersatz**. Wenn ein Mitglied Push-Benachrichtigungen aktiviert hat, erhält es eine Push-Benachrichtigung; andernfalls eine E-Mail. Mitglieder wählen in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) für jeden Benachrichtigungstyp aus, welche Kanäle sie möchten.
:::

## SMS-Erinnerungen

Der Kanal **SMS** erscheint nur, wenn Ihre Kirche einen Anbieter für Textnachrichten verbunden hat. SMS werden über den Anbieter Ihrer Kirche versendet, und jede Nachricht kann Ihre Kirche etwas kosten. Sie werden zusätzlich zu einer Push- oder E-Mail-Erinnerung verschickt, und nur an Personen, die:

- in ihren [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) **Textnachrichten** aktiviert haben und
- in ihrem Profil eine Handynummer hinterlegt haben.

Jede SMS beginnt mit dem Namen Ihrer Kirche, besteht aus einer einzigen Textnachricht und endet mit „Antworten Sie mit STOP, um sich abzumelden.“ Wer mit STOP antwortet, erhält keine Textnachrichten mehr von Ihrer Kirche. Damit STOP-Antworten B1 erreichen, fügen Sie die **Eingehende (STOP-)Webhook-URL** aus Ihren [Einstellungen für Textnachrichten](../settings/church-settings.md#texting) in den eingehenden Nachrichten-Webhook Ihres Anbieters ein.

## Was Mitglieder steuern können

Erinnerungen berücksichtigen immer die [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) jedes Mitglieds. Ein Mitglied kann:

- **Veranstaltungserinnerungen** für Push, E-Mail oder SMS ausschalten, während andere Benachrichtigungen eingeschaltet bleiben.
- SMS-Erinnerungen mit **Textnachrichten** ein- oder ausschalten.
- **Ruhezeiten** festlegen, sodass nicht dringende Benachrichtigungen zu einer passenden Zeit zugestellt werden.

Sie können die Entscheidung eines Mitglieds, sich von Veranstaltungserinnerungen abzumelden, nicht außer Kraft setzen. So hält B1 die Anforderungen der Anti-Spam-Regeln ein, und Mitglieder behalten die Kontrolle über ihr Postfach.

## Erinnerungen für Helfende

Ehrenamtliche, die für einen Plan eingeteilt sind, erhalten eine eigene **Dienst-Erinnerung** mit den Angaben zum Plan und – solange sie noch nicht geantwortet haben – die Schaltflächen **Annehmen / Ablehnen** direkt in der E-Mail. Diese Erinnerungen werden am Plantyp konfiguriert, nicht an einer Kalenderveranstaltung, und können ebenfalls per SMS versendet werden. Wie die Einsatzplanung und die Erinnerungen für Ehrenamtliche funktionieren, erfahren Sie unter [Ehrenamtliche Erinnerungen](../serving/plans#volunteer-reminders) und [Ehrenamtliche am Sonntag](../guides/sunday-volunteers).

## Nächste Schritte

- [Benachrichtigungseinstellungen](../../b1-church/getting-started/notification-preferences) – Was Mitglieder steuern können
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration) – Anmeldung einrichten, damit Erinnerungen Teilnehmende erreichen
- [Kalender erstellen](creating-calendars) – Zurück zur Kalendereinrichtung
