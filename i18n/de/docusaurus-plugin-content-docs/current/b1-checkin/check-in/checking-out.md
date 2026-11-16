---
title: "Check-out & Kinderschutz"
description: "Checken Sie Kinder an einer besetzten B1-Checkin-Station mit Sicherheitscodes, geprüften Abholpersonen, Eltern-Paging, Neudruck von Etiketten und Notfallbenachrichtigungen aus."
---

# Check-out & Kinderschutz {#checking-out--child-safety}

<div class="article-intro">

Der Check-out schließt den Kreislauf des Kinder-Check-ins: Ein Elternteil zeigt den Sicherheitscode von seinem Abholetikett vor, der Kiosk prüft, wer abholt, und die Kinder werden ausgecheckt. Besetzte Stationen erhalten außerdem Sicherheitswerkzeuge -- die Prüfung vertrauenswürdiger Abholpersonen, Textnachrichten an Eltern, den Neudruck von Sicherheitsetiketten und eine Notfallbenachrichtigung.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Der Check-out ist an Stationen verfügbar, die in den Kiosk-Administrationseinstellungen auf den Modus **besetzt** eingestellt sind
- Kinder müssen [eingecheckt](./completing-checkin.md) worden sein, wobei ein gedrucktes Abholetikett mit dem Sicherheitscode ausgegeben wurde
- Für Eltern-Paging und Notfallbenachrichtigungen muss Ihre Gemeinde in B1 Admin einen Anbieter für Textnachrichten verbunden haben

</div>

## Check-out starten {#starting-a-check-out}

1. Tippen Sie an einer besetzten Station auf dem Suchbildschirm auf **Auschecken**.
2. Geben Sie den vierstelligen **Sicherheitscode** vom Abholetikett der Familie ein. Sie können ihn eintippen, die Bildschirmtastatur nutzen oder den Barcode des Etiketts mit einem USB- oder Bluetooth-Scanner einlesen -- der Code wird automatisch übermittelt, sobald alle 4 Zeichen eingegeben sind.
   - Kein Scanner vorhanden? Tippen Sie unter dem Codefeld auf **Scannen**, um stattdessen die Kamera des Tablets zu verwenden. Halten Sie den QR-Code oder Barcode des Abholetiketts vor die Kamera im Fenster **Abholcode scannen**; der Code wird dann automatisch eingetragen. Standardmäßig wird die Rückkamera verwendet; tippen Sie auf die Wechseltaste, um die Kamera zu wechseln, oder auf **Abbrechen**, um zur Eingabe per Hand zurückzukehren.
3. Der Kiosk zeigt die Kinder an, die unter diesem Code eingecheckt sind.

### Familie ohne Code finden {#finding-a-family-without-the-code}

Hat ein Elternteil das Abholetikett verloren, suchen Sie stattdessen die Familie:

1. Tippen Sie auf dem Bildschirm **Auschecken** auf **Nach Name suchen** (neben **Scannen**).
2. Geben Sie den Nachnamen der Familie ein und tippen Sie auf **Suchen**, oder tippen Sie auf **Telefonnummer verwenden**, um auf dem Tastenfeld eine Telefonnummer (mindestens die letzten 4 Ziffern) einzugeben.
3. Tippen Sie in den Ergebnissen auf die Person. Der Kiosk findet alle Angehörigen dieses Haushalts, die heute eingecheckt und noch nicht ausgecheckt sind, und zeigt sie genauso an, als wäre der Code eingegeben worden.

Ist niemand aus dem Haushalt eingecheckt, zeigt der Kiosk „Zurzeit ist niemand in diesem Haushalt eingecheckt.“ an. Tippen Sie auf **Neue Suche**, um erneut zu suchen, oder auf **Stattdessen Code eingeben**, um zurück zum Codefeld zu gelangen.

Die Abholprüfung weiter unten gilt weiterhin: Die vertrauenswürdigen Abholpersonen und Erwachsenen des Haushalts werden aufgelistet, und Namen, die nicht zur Abholung berechtigt sind, bleiben gesperrt.

## Abholperson bestätigen {#verifying-who-is-picking-up}

Auf dem Check-out-Bildschirm wird gefragt, wer die Kinder abholt:

- **Vertrauenswürdige Abholpersonen** des Haushalts erscheinen als antippbare Karten mit Foto und Beziehung -- tippen Sie auf die Person, die vor Ihnen steht.
- **Erwachsene Haushaltsmitglieder** erscheinen ebenfalls in einem Fotoraster.
- **Andere** erlaubt es, den Namen einer Person einzugeben, die nicht auf der Liste steht.

Stimmt ein eingegebener Name mit einer Person überein, die für diesen Haushalt als **Nicht berechtigt** markiert ist, blockiert der Kiosk den Check-out mit einer Warnung. Eine Mitarbeitende oder ein Mitarbeitender kann **Außer Kraft setzen** wählen, um dennoch fortzufahren -- die Außerkraftsetzung wird mit dem Namen der Person im Anwesenheitsdatensatz vermerkt.

Sobald die abholende Person bestätigt ist, tippen Sie auf **Auschecken**. Der Name der Abholperson wird im Anwesenheitsdatensatz gespeichert.

:::info
Vertrauenswürdige und nicht abholberechtigte Personen werden von Mitarbeitenden der Gemeinde auf der Seite jeder Person in B1 Admin verwaltet -- siehe [Check-in-Sicherheit](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Einen Elternteil benachrichtigen {#paging-a-parent}

Brauchen Sie während des Gottesdienstes einen Elternteil -- etwa für einen Windelwechsel oder weil ein Kind weint? Vom Check-out-Bildschirm einer besetzten Station aus können Mitarbeitende einen **Ausruf** senden: eine Textnachricht an die Eltern oder Erziehungsberechtigten des Kindes über den Textnachrichtenanbieter der Gemeinde. Eltern, die sich von Textnachrichten abgemeldet haben oder keine Handynummer hinterlegt haben, werden übersprungen. Der Kiosk zeigt an, wie viele Nachrichten gesendet wurden.

## Etiketten neu drucken {#reprinting-labels}

Geht ein Namensschild oder Abholetikett verloren oder wird es beschädigt, können Mitarbeitende an einer besetzten Station nach Eingabe des Sicherheitscodes die Etiketten der Familie auf dem Check-out-Bildschirm **neu drucken**. Der Neudruck verwendet denselben Drucker und dieselben Etikettenvorlagen wie der ursprüngliche Check-in.

## Notfallbenachrichtigung {#emergency-broadcast}

Im Notfall können Mitarbeitende den Erziehungsberechtigten **aller eingecheckten Kinder** für den aktuellen Gottesdienst gleichzeitig eine Textnachricht senden:

1. Öffnen Sie die **Administrationseinstellungen** des Kiosks (7 schnelle Tipps auf das Logo in der Kopfzeile, plus die PIN, falls eine festgelegt ist).
2. Tippen Sie auf **Notfallbenachrichtigung**.
3. Geben Sie die Nachricht ein und geben Sie dann **EMERGENCY** in das Bestätigungsfeld ein -- die Schaltfläche **Benachrichtigung senden** bleibt deaktiviert, bis Sie das getan haben.
4. Der Kiosk meldet, wie viele Telefone die Nachricht erhalten haben und wie viele Personen übersprungen wurden (abgemeldet oder ohne Handynummer).

:::warning
Die Benachrichtigung geht an jeden eingecheckten Haushalt für den ausgewählten Gottesdienst. Verwenden Sie sie nur für echte Notfälle -- Evakuierungen, Abriegelungen oder schweres Wetter.
:::

## Verwandte Artikel {#related-articles}

- [Check-in abschließen](./completing-checkin.md) -- Woher Sicherheitscodes und Abholetiketten stammen
- [Check-in-Sicherheit](../../b1-admin/attendance/checkin-safety.md) -- Konfiguration von Kapazitäten, Betreuungsschlüsseln, Abholpersonen und der Anforderung an einen Anbieter für Textnachrichten
- [Druckereinrichtung](../getting-started/printer-setup.md) -- Konfiguration des Etikettendruckers
