---
title: "Auschecken & Kindersicherheit"
---

# Auschecken & Kindersicherheit

<div class="article-intro">

Das Auschecken schließt die Schleife auf dem Einchecken von Kindern: Ein Elternteil zeigt den Sicherheitscode von ihrem Abholkennzeichnung, der Kiosk überprüft, wer abholt, und die Kinder werden ausgecheckt. Bemannte Stationen erhalten auch Sicherheitswerkzeuge – vertrauenswürdige Abholbestätigung, Pager-Eltern-Texte, Sicherheitsetikett-Nachdrucke und einen Notfall-Broadcast.

</div>

<div class="prereqs">
<h4>Bevor Sie anfangen</h4>

- Das Auschecken ist auf Stationen verfügbar, die in den Kiosk-Admin-Einstellungen auf den Modus **manned** eingestellt sind
- Kinder müssen mit einem gedruckten Abholetikett, das den Sicherheitscode trägt, [eingecheckt](./completing-checkin) worden sein
- Paging und Notfall-Broadcasts erfordern, dass Ihre Kirche einen Texting-Anbieter in B1 Admin verbunden hat

</div>

## Auschecken starten

1. Tippen Sie auf einer bemannten Station auf der Suchseite auf **Check Out**.
2. Geben Sie den **Sicherheitscode** im 4-stelligen Format vom Abholetikett der Familie ein. Sie können ihn eingeben, das Bildschirm-Tastaturfeld verwenden oder das Barcode-Etikett mit einem USB- oder Bluetooth-Scanner scannen – der Code wird automatisch eingereicht, sobald alle 4 Ziffern eingegeben sind.
3. Der Kiosk zeigt die unter diesem Code eingecheckten Kinder.

## Überprüfen, wer abholt

Der Auschecken-Bildschirm fragt, wer die Kinder abholt:

- **Vertrauenswürdige Abholpersonen** für den Haushalt erscheinen als anklickbare Karten mit Foto und Beziehung – tippen Sie auf die Person, die vor Ihnen steht.
- **Haushaltserwachsene** erscheinen auch in einem Fotogrid.
- **Sonstiges** ermöglicht Ihnen, einen Namen für jemanden einzugeben, der nicht auf der Liste steht.

Wenn ein eingegebener Name mit jemandem übereinstimmt, der für diesen Haushalt als **Not Authorized** markiert ist, blockiert der Kiosk das Auschecken mit einer Warnung. Ein Mitarbeiter kann **Override** wählen, um trotzdem fortzufahren – die Außerkraftsetzung wird im Anwesenheitsdatensatz mit dem Namen der Person aufgezeichnet.

Nachdem der Abholer bestätigt ist, tippen Sie auf Auschecken. Der Name der Abholperson wird mit dem Anwesenheitsdatensatz gespeichert.

:::info
Vertrauenswürdige und nicht autorisierte Abholpersonen werden von Kirchenmitarbeitern auf der Seite jeder Person in B1 Admin verwaltet – siehe [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Einen Elternteil anrufen

Brauchen Sie einen Elternteil während des Dienstes – Windel wechseln, ein weinendes Kind? Von der Auschecken-Seite auf einer bemannten Station können Mitarbeiter einen **Pager** senden: eine Textnachricht an die Eltern oder Erziehungsberechtigten des Kindes über den Texting-Anbieter der Kirche. Eltern, die sich von Texten abgemeldet haben oder keine Handynummer haben, werden übersprungen, und der Kiosk zeigt an, wie viele Nachrichten gesendet wurden.

## Etiketten neu drucken

Wenn ein Namensschild oder Abholetikett verloren oder beschädigt ist, können Mitarbeiter auf einer bemannten Station die Etiketten der Familie von der Auschecken-Seite aus **erneut drucken**, nachdem sie den Sicherheitscode eingegeben haben. Der Nachdruck verwendet denselben Drucker und dieselben Etikett-Vorlagen wie das ursprüngliche Einchecken.

## Notfall-Broadcast

Im Notfall können Mitarbeiter die Erziehungsberechtigten von **jedem eingecheckten Kind** für den aktuellen Dienst auf einmal per Text benachrichtigen:

1. Öffnen Sie die Kiosk-**Admin-Einstellungen** (7 schnelle Tippvorgänge auf das Header-Logo, plus die PIN, falls eine eingestellt ist).
2. Tippen Sie auf **Emergency broadcast**.
3. Geben Sie die Nachricht ein, dann geben Sie **EMERGENCY** im Bestätigungsfeld ein – die Schaltfläche **Send broadcast** bleibt deaktiviert, bis Sie dies tun.
4. Der Kiosk zeigt an, wie viele Telefone die Nachricht erhalten haben und wie viele Personen übersprungen wurden (abgemeldet oder keine Handynummer).

:::warning
Der Broadcast geht an jeden eingecheckten Haushalt für den ausgewählten Dienst. Verwenden Sie ihn für echte Notfälle – Evakuierungen, Lockdowns, extreme Wetterbedingungen.
:::

## Verwandte Artikel

- [Einchecken abschließen](./completing-checkin) – Woher Sicherheitscodes und Abholetickets kommen
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) – Konfigurieren Sie Kapazitäten, Verhältnisse, Abholpersonen und die Anforderungen des Texting-Anbieters
- [Printer Setup](../getting-started/printer-setup) – Etiketten-Drucker-Konfiguration
