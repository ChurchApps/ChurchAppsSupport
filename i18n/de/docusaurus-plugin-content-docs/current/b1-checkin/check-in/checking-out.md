---
title: "Auschecken & Kindersicherheit"
---

# Auschecken & Kindersicherheit

<div class="article-intro">

Auschecken schließt die Schleife beim Kinder-Check-In: Ein Elternteil zeigt den Sicherheitscode von ihrem Abhol-Label vor, das Kiosk überprüft, wer abholt, und die Kinder werden ausgecheckt. Besetzte Stationen erhalten auch Sicherheits-Tools -- Überprüfung vertrauenswürdiger Abhol-Personen, Textnachrichten zum Auffinden von Eltern, Sicherheits-Label-Nachdrucke und einen Notfall-Rundfunk.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Auschecken ist auf Stationen verfügbar, die in den Kiosk-Admin-Einstellungen auf **manned**-Modus eingestellt sind
- Kinder müssen mit einem gedruckten Abhol-Label [eingecheckt](./completing-checkin) worden sein, das den Sicherheitscode trägt
- Paging und Notfall-Rundfunk erfordern, dass Ihre Kirche einen Textnachrichten-Provider in B1 Admin verbunden hat

</div>

## Einen Auschecken starten

1. Auf einer bemannten Station tippen Sie auf **Check Out** auf dem Lookup-Bildschirm.
2. Geben Sie den 4-stelligen **Sicherheitscode** vom Abhol-Label der Familie ein. Sie können ihn eingeben, den On-Screen-Zahlenblock verwenden oder den Barcode des Labels mit einem USB- oder Bluetooth-Scanner scannen -- der Code wird automatisch gesendet, sobald alle 4 Ziffern eingegeben sind.
   - Kein Scanner? Tippen Sie auf **Scan** unterhalb des Code-Feldes, um stattdessen die Tablet-Kamera zu verwenden. Halten Sie den QR-Code oder Barcode des Abhol-Labels vor die Kamera im **Scan pickup code**-Fenster und der Code wird für Sie eingegeben. Die Rückkamera wird standardmäßig verwendet; tippen Sie auf die Flip-Schaltfläche, um Kameras zu wechseln, oder tippen Sie auf **Cancel**, um zur Eingabe zurückzukehren.
3. Das Kiosk zeigt die unter diesem Code eingecheckten Kinder an.

## Überprüfung, wer abholt

Der Auschecken-Bildschirm fragt, wer die Kinder abholt:

- **Vertrauenswürdige Abhol-Personen** für den Haushalt erscheinen als anklickbare Karten mit Foto und Beziehung -- tippen Sie auf die Person, die vor Ihnen steht.
- **Haushalts-Erwachsene** erscheinen auch in einem Foto-Grid.
- **Other** ermöglicht es Ihnen, einen Namen für jemanden einzugeben, der nicht auf der Liste steht.

Wenn ein eingegebener Name mit jemandem übereinstimmt, der für diesen Haushalt als **Not Authorized** gekennzeichnet ist, blockiert das Kiosk das Auschecken mit einer Warnung. Ein Mitarbeiter kann **Override** wählen, um trotzdem fortzufahren -- das Override wird in der Anwesenheits-Aufzeichnung mit dem Namen der Person festgehalten.

Sobald die abhol-Person bestätigt ist, tippen Sie auschecken. Der Name der Abhol-Person wird in der Anwesenheits-Aufzeichnung gespeichert.

:::info
Vertrauenswürdige und nicht autorisierte Abhol-Personen werden vom Kirchenpersonal auf der Seite jeder Person in B1 Admin verwaltet -- siehe [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Seite nach Eltern

Benötigen Sie einen Elternteil während des Gottesdienstes -- ein Windelwechsel, ein weinendes Kind? Von der Auschecken-Bildschirm auf einer bemannten Station kann das Personal eine **Seite** senden: eine Textnachrricht an die Eltern oder Erziehungsberechtigten des Kindes über den Textnachrichten-Provider der Kirche. Eltern, die sich von Texten abgemeldet haben oder keine Handynummer haben, werden übersprungen, und das Kiosk zeigt an, wie viele Nachrichten gesendet wurden.

## Etiketten nachdrucken

Wenn ein Namensschild oder Abhol-Label verloren oder beschädigt wird, kann das Personal auf einer bemannten Station die Labels der Familie **nachdrucken**, nachdem der Sicherheitscode auf dem Auschecken-Bildschirm eingegeben wurde. Der Nachdruck verwendet den gleichen Drucker und die gleichen Label-Vorlagen wie das ursprüngliche Check-In.

## Notfall-Rundfunk

Im Notfall kann das Personal die Erziehungsberechtigten von **jedem eingecheckten Kind** des aktuellen Gottesdienstes auf einmal benachrichtigen:

1. Öffnen Sie die Kiosk **Admin-Einstellungen** (7 schnelle Taps auf dem Header-Logo, plus die PIN, falls gesetzt).
2. Tippen Sie auf **Emergency broadcast**.
3. Geben Sie die Nachricht ein, und geben Sie dann **EMERGENCY** in das Bestätigungs-Feld ein -- die **Send broadcast**-Schaltfläche bleibt deaktiviert, bis Sie es tun.
4. Das Kiosk zeigt an, wie viele Telefone die Nachricht erhalten haben und wie viele Personen übersprungen wurden (abgemeldet oder keine Handynummer).

:::warning
Der Rundfunk geht an jeden eingecheckten Haushalt für den ausgewählten Gottesdienst. Verwenden Sie ihn nur für echte Notfälle -- Evakuierungen, Sperrungen, extreme Wetterbedingun gen.
:::

## Verwandte Artikel

- [Check-In abschließen](./completing-checkin) -- wo Sicherheitscodes und Abhol-Labels herkommen
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) -- Konfiguration von Kapazitäten, Verhältnissen, Abhol-Personen und der Textnachrichten-Provider-Anforderung
- [Printer Setup](../getting-started/printer-setup) -- Konfiguration des Label-Druckers
