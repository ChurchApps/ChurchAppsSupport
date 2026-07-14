---
title: "Abholen & Kindersicherheit"
---

# Abholen & Kindersicherheit

<div class="article-intro">

Check-out schließt die Schleife beim Kinder-Check-in: Ein Elternteil präsentiert den Sicherheitscode auf seinem Abhol-Label, der Kiosk überprüft, wer abholt, und die Kinder werden ausgecheckt. Bemannte Stationen erhalten auch Sicherheitstools -- Überprüfung vertrauenswürdiger Abholpersonen, Page-a-Parent-Texte, Sicherheits-Label-Neudrucke und Notfall-Broadcast.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Check-out ist auf Stationen verfügbar, die in den Kiosk-Admin-Einstellungen auf den **bemannten** Modus eingestellt sind
- Kinder müssen mit einem gedruckten Abhol-Label mit dem Sicherheitscode [eingecheckt](./completing-checkin) worden sein
- Paging und Notfall-Broadcasts erfordern, dass Ihre Kirche einen Texting-Anbieter in B1 Admin verbunden hat

</div>

## Einen Check-Out starten

1. Tippen Sie auf einer bemannten Station auf dem Lookup-Bildschirm auf **Abholen**.
2. Geben Sie den **Sicherheitscode** (4 Zeichen) vom Abholp-Label der Familie ein. Sie können ihn eingeben, die auf dem Bildschirm angezeigte Tastatur verwenden oder das Barcode-Label des Labels mit einem USB- oder Bluetooth-Scanner scannen – der Code wird automatisch übermittelt, sobald alle 4 Zeichen eingegeben sind.
3. Der Kiosk zeigt die unter diesem Code eingecheckten Kinder an.

## Überprüfung, wer abholt

Der Check-out-Bildschirm fragt, wer die Kinder abholt:

- **Vertrauenswürdige Abholpersonen** für den Haushalt erscheinen als anklickbare Karten mit ihrem Foto und ihrer Beziehung – tippen Sie auf die Person vor Ihnen.
- **Haushaltserwachsene** erscheinen auch in einem Fotogitter.
- **Andere** ermöglicht es Ihnen, einen Namen für jemanden einzugeben, der nicht auf der Liste steht.

Falls ein eingegebener Name mit jemandem übereinstimmt, der für diesen Haushalt als **Nicht autorisiert** markiert ist, blockiert der Kiosk den Check-out mit einer Warnung. Ein Mitarbeiter kann **Außerkraft setzen** wählen, um trotzdem fortzufahren – die Außerkraftsetzung wird im Anwesenheitsdatensatz mit dem Namen der Person vermerkt.

Sobald die abholende Person bestätigt ist, tippen Sie auf abholen. Der Name der Abholperson wird mit dem Anwesenheitsdatensatz gespeichert.

:::info
Vertrauenswürdige und nicht autorisierte Abholpersonen werden von Kirchenmitarbeitern auf der Seite jeder Person in B1 Admin verwaltet – siehe [Check-in-Sicherheit](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Ein Elternteil anrufen

Benötigen Sie einen Elternteil während des Gottesdienstes – eine Windelwechsel, ein weinendes Kind? Von der Check-out-Bildschirm auf einer bemannten Station können Mitarbeiter einen **Page** senden: eine Textnachricht an die Eltern oder Erziehungsberechtigten eines eingecheckten Kindes über den Texting-Anbieter der Kirche. Eltern, die sich von Texten abgemeldet haben oder keine Mobilnummer haben, werden übersprungen, und der Kiosk zeigt, wie viele Nachrichten gesendet wurden.

## Labels erneut drucken

Falls ein Namensschildabels oder Abhol-Label verloren oder beschädigt ist, können Mitarbeiter auf einer bemannten Station die **Neudruck**-Labels der Familie vom Check-out-Bildschirm nach Eingabe des Sicherheitscodes.  Der Neudruck verwendet die gleiche Drucker und Label-Vorlagen wie das ursprüngliche Check-in.

## Notfall-Broadcast

Im Notfall können Mitarbeiter die Erziehungsberechtigten von **jedem eingecheckten Kind** für den aktuellen Dienst auf einmal per SMS kontaktieren:

1. Öffnen Sie die Kiosk-**Admin-Einstellungen** (7 schnelle Taps auf das Header-Logo, plus die PIN, falls eine eingestellt ist).
2. Tippen Sie auf **Notfall-Broadcast**.
3. Geben Sie die Nachricht ein, dann geben Sie **NOTFALL** im Bestätigungsfeld ein – die Schaltfläche **Broadcast senden** bleibt deaktiviert, bis Sie dies tun.
4. Der Kiosk meldet, wie viele Telefone die Nachricht erhielten und wie viele Personen übersprungen wurden (abgemeldet oder keine Mobilnummer).

:::warning
Der Broadcast geht an jeden eingecheckten Haushalt für den ausgewählten Dienst. Verwenden Sie ihn für echte Notfälle – Evakuierungen, Lockdowns, schweres Wetter.
:::

## Verwandte Artikel

- [Check-In abschließen](./completing-checkin) -- wo Sicherheitscodes und Abhol-Labels herkommen
- [Check-in-Sicherheit](../../b1-admin/attendance/checkin-safety) -- Konfiguration von Kapazitäten, Verhältnissen, Abholpersonen und der Texting-Anbieter-Anforderung
- [Drucker-Setup](../getting-started/printer-setup) -- Drucker-Konfiguration für Drucker
