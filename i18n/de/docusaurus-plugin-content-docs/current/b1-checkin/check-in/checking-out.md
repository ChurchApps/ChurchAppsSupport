---
title: "Check-Out & Kindersicherheit"
---

# Check-Out & Kindersicherheit

<div class="article-intro">

Der Check-Out schließt den Kreis beim Kinder-Check-In: Ein Elternteil legt den Sicherheitscode von seinem Abholetikett vor, der Kiosk überprüft, wer abholt, und die Kinder werden ausgecheckt. Besetzte Stationen erhalten zudem Sicherheitswerkzeuge — Verifizierung vertrauenswürdiger Abholpersonen, Eltern-Aufruf-SMS, Neudruck von Sicherheitsetiketten und einen Notfall-Rundruf.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Der Check-Out ist an Stationen verfügbar, die in den Kiosk-Admin-Einstellungen auf den Modus **besetzt** eingestellt sind
- Kinder müssen [eingecheckt](./completing-checkin) worden sein und ein gedrucktes Abholetikett mit dem Sicherheitscode erhalten haben
- Aufrufe und Notfall-Rundrufe erfordern, dass Ihre Gemeinde einen SMS-Anbieter in B1 Admin verbunden hat

</div>

## Einen Check-Out starten

1. Tippen Sie an einer besetzten Station auf dem Suchbildschirm auf **Auschecken**.
2. Geben Sie den 4-stelligen **Sicherheitscode** vom Abholetikett der Familie ein. Sie können ihn eintippen, das Tastenfeld auf dem Bildschirm verwenden oder den Barcode des Etiketts mit einem USB- oder Bluetooth-Scanner scannen — der Code wird automatisch übermittelt, sobald alle 4 Zeichen eingegeben sind.
3. Der Kiosk zeigt die unter diesem Code eingecheckten Kinder an.

## Überprüfen, wer abholt

Der Check-Out-Bildschirm fragt, wer die Kinder abholt:

- **Vertrauenswürdige Abholpersonen** für den Haushalt erscheinen als antippbare Karten mit Foto und Beziehung — tippen Sie auf die Person, die vor Ihnen steht.
- **Erwachsene des Haushalts** erscheinen ebenfalls in einem Fotoraster.
- Mit **Andere** können Sie den Namen einer Person eingeben, die nicht auf der Liste steht.

Wenn ein eingegebener Name mit jemandem übereinstimmt, der für diesen Haushalt als **Nicht autorisiert** markiert ist, blockiert der Kiosk den Check-Out mit einer Warnung. Ein Mitarbeiter kann **Überschreiben** wählen, um trotzdem fortzufahren — die Überschreibung wird zusammen mit dem Namen der Person im Anwesenheitsdatensatz vermerkt.

Sobald die abholende Person bestätigt ist, tippen Sie auf Auschecken. Der Name der Abholperson wird zusammen mit dem Anwesenheitsdatensatz gespeichert.

:::info
Vertrauenswürdige und nicht autorisierte Abholpersonen werden von Mitarbeitern der Gemeinde auf der jeweiligen Personenseite in B1 Admin verwaltet — siehe [Check-In-Sicherheit](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Einen Elternteil aufrufen

Brauchen Sie während des Gottesdienstes einen Elternteil — ein Windelwechsel, ein weinendes Kind? Vom Check-Out-Bildschirm an einer besetzten Station aus können Mitarbeiter einen **Aufruf** senden: eine Textnachricht an die Eltern oder Erziehungsberechtigten des Kindes über den SMS-Anbieter der Gemeinde. Eltern, die SMS abbestellt haben oder keine Mobilnummer hinterlegt haben, werden übersprungen, und der Kiosk zeigt an, wie viele Nachrichten gesendet wurden.

## Etiketten neu drucken

Wenn ein Namensschild oder Abholetikett verloren geht oder beschädigt wird, können Mitarbeiter an einer besetzten Station nach Eingabe des Sicherheitscodes die Etiketten der Familie über den Check-Out-Bildschirm **neu drucken**. Der Neudruck verwendet denselben Drucker und dieselben Etikettenvorlagen wie der ursprüngliche Check-In.

## Notfall-Rundruf

Im Notfall können Mitarbeiter gleichzeitig eine SMS an die Erziehungsberechtigten **jedes eingecheckten Kindes** für den aktuellen Gottesdienst senden:

1. Öffnen Sie die **Admin-Einstellungen** des Kiosks (7 schnelle Taps auf das Logo im Header, plus die PIN, falls eine festgelegt ist).
2. Tippen Sie auf **Notfall-Rundruf**.
3. Geben Sie die Nachricht ein und tippen Sie dann **EMERGENCY** in das Bestätigungsfeld — die Schaltfläche **Rundruf senden** bleibt deaktiviert, bis Sie dies tun.
4. Der Kiosk meldet, wie viele Telefone die Nachricht erhalten haben und wie viele Personen übersprungen wurden (abbestellt oder keine Mobilnummer).

:::warning
Der Rundruf geht an jeden eingecheckten Haushalt für den ausgewählten Gottesdienst. Verwenden Sie ihn für echte Notfälle — Evakuierungen, Absperrungen, schweres Unwetter.
:::

## Verwandte Artikel

- [Check-In abschließen](./completing-checkin) — woher Sicherheitscodes und Abholetiketten stammen
- [Check-In-Sicherheit](../../b1-admin/attendance/checkin-safety) — Konfiguration von Kapazitäten, Verhältnissen, Abholpersonen und der Anforderung eines SMS-Anbieters
- [Drucker-Einrichtung](../getting-started/printer-setup) — Konfiguration des Etikettendruckers
