---
title: "Auschecken & Kindersicherheit"
---

# Auschecken & Kindersicherheit

<div class="article-intro">

Der Auschecken schließt den Kreis beim Kindergarten-Check-in: Ein Elternteil präsentiert den Sicherheitscode auf ihrem Abholungs-Etikett, der Kiosk überprüft wer abholt, und die Kinder werden ausgecheckt. Bemannte Stationen erhalten auch Sicherheitstools — Überprüfung vertrauenswürdiger Abhol-Personen, Text-Benachrichtigungen für Eltern, Neudrucke von Sicherheitsetiketten und Notfall-Broadcast.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Der Auschecken ist auf Stationen verfügbar, die in den Kiosk-Admin-Einstellungen auf **bemannt** eingestellt sind
- Kinder müssen [eingecheckt werden](./completing-checkin) mit einem gedruckten Abholungs-Etikett, das den Sicherheitscode trägt
- Benachrichtigungen und Notfall-Broadcast erfordern, dass Ihre Gemeinde einen Texting-Anbieter mit B1 Admin verbunden hat

</div>

## Auschecken starten

1. Tippen Sie auf einer bemannten Station auf **Auschecken** auf dem Recherche-Bildschirm.
2. Geben Sie den 4-stelligen **Sicherheitscode** von dem Abholungs-Etikett der Familie ein. Sie können ihn eingeben, die Tastatur auf dem Bildschirm verwenden oder den Barcode des Etiketts mit einem USB- oder Bluetooth-Scanner scannen — der Code wird automatisch übermittelt, sobald alle 4 Zeichen eingegeben sind.
3. Der Kiosk zeigt die Kinder, die unter diesem Code eingecheckt sind.

## Überprüfung wer abholt

Der Auschecken-Bildschirm fragt, wer die Kinder abholt:

- **Vertrauenswürdige Abhol-Personen** für den Haushalt erscheinen als tippbare Karten mit ihrem Foto und ihrer Beziehung — tippen Sie auf die Person, die vor Ihnen steht.
- **Haushalts-Erwachsene** erscheinen auch in einem Foto-Raster.
- **Andere** ermöglicht es Ihnen, einen Namen für jemanden einzugeben, der nicht auf der Liste steht.

Wenn ein eingegebener Name jemanden entspricht, der als **Nicht autorisiert** für diesen Haushalt markiert ist, blockiert der Kiosk den Auschecken mit einer Warnung. Ein Mitarbeiter kann **Überschreiben** auswählen, um trotzdem fortzufahren — die Überschreibung wird im Anwesenheitsdatensatz mit dem Namen der Person aufgezeichnet.

Sobald die Abhol-Person bestätigt ist, tippen Sie auf Auschecken. Der Name der Abhol-Person wird im Anwesenheitsdatensatz gespeichert.

:::info
Vertrauenswürdige und nicht autorisierte Abhol-Personen werden von Kirchenmitarbeitern auf der Seite jeder Person in B1 Admin verwaltet — siehe [Check-In-Sicherheit](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Benachrichtigung für Eltern

Brauchen Sie einen Elternteil während des Gottesdienstes — eine Windelwechsel, ein weinendes Kind? Von dem Auschecken-Bildschirm einer bemannten Station können Mitarbeiter eine **Benachrichtigung** senden: Eine Textnachricht an die Eltern oder Erziehungsberechtigten des Kindes über den Texting-Anbieter der Gemeinde. Eltern, die sich von Texten abgemeldet haben oder keine Mobiltelefonnummer haben, werden übersprungen, und der Kiosk zeigt, wie viele Nachrichten gesendet wurden.

## Neudrucken von Etiketten

Wenn ein Namensschild oder Abholungs-Etikett verloren geht oder beschädigt wird, können Mitarbeiter auf einer bemannten Station die Etiketten der Familie vom Auschecken-Bildschirm nach Eingabe des Sicherheitscodes **neu drucken**. Der Neudruck verwendet dieselbe Drucker und Etikett-Vorlagen wie der ursprüngliche Check-in.

## Notfall-Broadcast

In einem Notfall können Mitarbeiter die Erziehungsberechtigten von **jedem eingecheckten Kind** zum aktuellen Gottesdienst auf einmal benachrichtigen:

1. Öffnen Sie die Kiosk-**Admin-Einstellungen** (7 schnelle Taps auf das Header-Logo, plus die PIN, falls eine eingestellt ist).
2. Tippen Sie auf **Notfall-Broadcast**.
3. Geben Sie die Nachricht ein, dann geben Sie **EMERGENCY** in das Bestätigungs-Feld ein — die **Broadcast senden**-Schaltfläche bleibt deaktiviert, bis Sie das tun.
4. Der Kiosk zeigt, wie viele Telefone die Nachricht empfangen haben und wie viele Personen übersprungen wurden (abgemeldet oder keine Mobiltelefonnummer).

:::warning
Der Broadcast geht an jeden eingecheckten Haushalt zum ausgewählten Gottesdienst. Verwenden Sie ihn für echte Notfälle — Evakuierungen, Sperrungen, starkes Wetter.
:::

## Verwandte Artikel

- [Check-In abschließen](./completing-checkin) — woher Sicherheitscodes und Abholungs-Etiketten kommen
- [Check-In-Sicherheit](../../b1-admin/attendance/checkin-safety) — Kapazität, Quote, Abhol-Personen und die Texting-Anbieter-Anforderung konfigurieren
- [Drucker-Einrichtung](../getting-started/printer-setup) — Etiketten-Drucker-Konfiguration
