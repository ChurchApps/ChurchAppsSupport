---
title: "Auschecken & Kindersicherheit"
---

# Auschecken & Kindersicherheit

<div class="article-intro">

Der Checkout schließt die Schleife auf das Kinder-Check-in: Ein Eltern stellt den Sicherheitscode auf ihrem Abholschein vor, der Kiosk überprüft, wer abholt, und die Kinder werden ausgecheckt. Bemannte Stationen erhalten auch Sicherheitswerkzeuge — Überprüfung der vertrauenswürdigen Abholung, Page-a-Parent-Texte, Sicherheits-Label-Nachdrucke und ein Notfall-Broadcast.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Der Checkout ist auf Stationen verfügbar, die in den Kiosk-Admin-Einstellungen auf **manned**-Modus eingestellt sind
- Kinder müssen mit einem gedruckten Abholschein [eingecheckt werden](./completing-checkin), das den Sicherheitscode trägt
- Paging und Notfall-Broadcasts erfordern, dass Ihre Kirche einen Texting-Anbieter in B1 Admin verbunden hat

</div>

## Starten eines Checkouts

1. Tippen Sie auf einer bemannten Station auf dem Suchbildschirm auf **Check Out**.
2. Geben Sie den 4-stelligen **Sicherheitscode** von dem Abholschein der Familie ein. Sie können ihn eingeben, die On-Screen-Tastatur verwenden oder den Label-Barcode mit einem USB- oder Bluetooth-Scanner scannen — der Code wird automatisch eingereicht, sobald alle 4 Zeichen eingegeben sind.
3. Der Kiosk zeigt die Kinder an, die unter diesem Code eingecheckt sind.

## Überprüfung, wer abholt

Der Check-out-Bildschirm fragt, wer die Kinder abholt:

- **Trusted pickup people** für den Haushalt werden als anklickbare Karten mit ihrem Foto und ihrer Beziehung angezeigt — tippen Sie auf die Person, die vor Ihnen steht.
- **Household adults** werden auch in einem Fototisch angezeigt.
- **Other** ermöglicht es Ihnen, einen Namen für jemanden einzugeben, der nicht in der Liste steht.

Wenn ein eingegebener Name mit jemandem übereinstimmt, der als **Not Authorized** für diesen Haushalt markiert ist, blockiert der Kiosk den Checkout mit einer Warnung. Ein Mitarbeiter kann **Override** wählen, um trotzdem fortzufahren — das Override wird im Anwesenheitsdatensatz mit dem Namen der Person aufgezeichnet.

Sobald der Abhol-Person bestätigt ist, tippen Sie auf Checkout. Der Name der Abhol-Person wird mit dem Anwesenheitsdatensatz gespeichert.

:::info
Vertrauenswürdige und nicht autorisierte Abhol-Personen werden von Kirchenmitarbeitern auf der Seite jeder Person in B1 Admin verwaltet — siehe [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Paging eines Eltern

Brauchen Sie während des Services einen Eltern — eine Windelwechsel, ein weinendes Kind? Auf dem Checkout-Bildschirm auf einer bemannten Station können Mitarbeiter eine **page** senden: eine Textnachricht an die Eltern oder Erziehungsberechtigten des Kindes über den Texting-Anbieter der Kirche. Eltern, die sich von Texten abgemeldet haben oder keine Mobilnummer haben, werden übersprungen, und der Kiosk zeigt an, wie viele Nachrichten gesendet wurden.

## Nachdrucken von Labels

Wenn ein Namensschild oder Abholschein verloren oder beschädigt geht, können Mitarbeiter auf einer bemannten Station die Labels der Familie vom Checkout-Bildschirm nach Eingabe des Sicherheitscodes **erneut drucken**. Der Nachdruck verwendet die gleichen Drucker und Label-Vorlagen wie der ursprüngliche Check-in.

## Notfall-Broadcast

Im Notfall können Mitarbeiter die Erziehungsberechtigten von **jedem eingecheckten Kind** für den aktuellen Service auf einmal per SMS kontaktieren:

1. Öffnen Sie die **Admin-Einstellungen** des Kiosks (7 schnelle Taps auf das Header-Logo, plus die PIN, falls eine eingestellt ist).
2. Tippen Sie auf **Emergency broadcast**.
3. Geben Sie die Nachricht ein, geben Sie dann **EMERGENCY** im Bestätigungsfeld ein — die Schaltfläche **Send broadcast** bleibt deaktiviert, bis Sie dies tun.
4. Der Kiosk zeigt an, wie viele Telefone die Nachricht erhalten haben und wie viele Personen übersprungen wurden (abgemeldet oder keine Mobilnummer).

:::warning
Der Broadcast geht an jeden eingecheckten Haushalt für den ausgewählten Service. Verwenden Sie ihn für echte Notfälle — Evakuierungen, Sperrungen, schweres Wetter.
:::

## Verwandte Artikel

- [Completing Check-In](./completing-checkin) — wo Sicherheitscodes und Abholscheine herkommen
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) — konfigurieren Sie Kapazitäten, Verhältnisse, Abhol-Personen und das Texting-Anbieter-Anforderung
- [Printer Setup](../getting-started/printer-setup) — Label-Drucker-Konfiguration
