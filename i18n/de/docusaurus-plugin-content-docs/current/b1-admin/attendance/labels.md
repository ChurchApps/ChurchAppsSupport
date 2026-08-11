---
title: "Check-In-Etikett-Designer"
---

# Check-In-Etikett-Designer

<div class="article-intro">

Der Label-Designer ermöglicht es Ihnen, die Namensschild- und Abholschein-Vorlagen zu erstellen und anzupassen, die beim Check-in von Kindern gedruckt werden. Sie können genau kontrollieren, welche Informationen auf jedem Etikett angezeigt werden, wo sie positioniert werden und wie sie aussehen.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Richten Sie [Anwesenheit](setup) ein und konfigurieren Sie mindestens eine Gottesdienstzeit mit aktiviertem Check-in
- Richten Sie [Check-In](check-in) ein, damit Etiketten drucken
- Sie benötigen administrativen Zugriff auf den Anwesenheitsbereich

</div>

## Öffnen des Label-Designers

Klicken Sie in B1 Admin auf das **Bereichsmenü** in der oberen linken Ecke (der aktuelle Bereichsname mit dem kleinen Pfeil daneben) und wählen Sie **Mobil**. Wählen Sie in der Navigationsleiste **B1 CheckIn**, dann klicken Sie auf die Schaltfläche **Etiketten entwerfen** auf der Check-in-Etiketten-Karte. Sie werden eine Liste Ihrer gespeicherten Etikett-Vorlagen sehen, die nach Typ unterteilt sind: **Namensschild** und **Abholschein**.

## Etikett-Typen

- **Namensschild** -- gedruckt und am Kind angebracht. Umfasst typischerweise den Namen des Kindes, sein Klassenzimmer/seine Sitzung und einen Sicherheitscode.
- **Abholschein** -- an den Eltern oder Erziehungsberechtigten übergeben. Umfasst typischerweise den Sicherheitscode und eine Liste der Kinder, die sie eingecheckt haben.

B1 startet Sie mit einer Standard-Namensschild- und Abholschein-Vorlage in Standardgröße für Thermoetiketten von 3,5 × 1,1 Zoll.

## Erstellen einer Etikett-Vorlage

1. Klicken Sie auf **Namensschild hinzufügen** oder **Abholschein hinzufügen** (oder verwenden Sie das Dropdown-Menü, um zu wählen).
2. Eine neue Vorlage wird im Label-Editor geöffnet.

### Label-Editor

Der Editor zeigt eine skalierte Vorschau des Etiketts in der konfigurierten Größe. Im linken Panel können Sie Folgendes konfigurieren:

- **Name** -- der Vorlagenname (nur zu Ihrer Referenz)
- **Etikett-Typ** -- Namensschild oder Abholschein
- **Breite / Höhe** -- Etikettengröße in Zoll

### Blöcke hinzufügen

Ein Etikett wird aus Blöcken gebaut -- einzelnen Inhaltseinheiten, die auf der Etikett-Canvas positioniert sind. Klicken Sie auf **Block hinzufügen**, um einen neuen Block einzufügen und wählen Sie seinen Typ:

- **Feld** -- zieht einen Datenwert zum Druckzeitpunkt:
  - `person.displayName` -- der vollständige Name der Person
  - `sessions` -- der Service/Klassenzimmer, in das sie eingecheckt wurde
  - `securityCode` -- der zufällig generierte Abhol-Sicherheitscode
  - `children` -- Liste der Kinder (für Abholscheine)
  - `person.nametagNotes` -- alle speziellen Notizen auf dem Personenstand
  - `campus` -- der Standortname
- **Text** -- statischer Text, den Sie eingeben (für Überschriften, Beschriftungen oder Anweisungen)
- **Barcode** -- ein Barcode, der den Sicherheitscode verschlüsselt

### Blöcke positionieren

Jeder Block hat **X**-, **Y**-, **Breite**- und **Höhe**-Felder, ausgedrückt als Prozentsätze der Etikett-Canvas (0–100). Passen Sie diese an, um Inhalte präzise zu positionieren. Sie können auch folgende Einstellungen vornehmen:

- **Schriftgröße** -- Textgröße in Punkten
- **Fett** -- Fetttext umschalten
- **Ausrichtung** -- linke, zentrierte oder rechte Textausrichtung
- **Bedingung** -- optional Blöcke ausblenden, wenn ein Feld leer ist (z.B. nametagNotes nur anzeigen, wenn es einen Wert hat)

### Speichern

Klicken Sie auf **Speichern**, um die Vorlage zu speichern. Die aktualisierte Vorlage wird beim nächsten Drucken von Etiketten in B1 Checkin verwendet.

## Neuordnung von Vorlagen

Wenn Sie mehrere Namensschild- oder Abholschein-Vorlagen haben, verwendet B1 Checkin standardmäßig die erste Vorlage in der Liste. Ziehen Sie Vorlagen, um sie neu zu ordnen.

## Löschen einer Vorlage

Klicken Sie auf das Löschsymbol in einer Vorlagenzeile und bestätigen Sie. Das Löschen der letzten Vorlage eines Typs stellt die standardmäßig eingebaute Vorlage wieder her.

:::tip
Machen Sie einen Testdruck nach dem Bearbeiten einer Vorlage, um zu bestätigen, dass das Layout richtig aussieht, bevor Ihr nächster Gottesdienst.
:::

## Verwandte Artikel

- [Check-In Einrichtung](setup) -- Konfigurieren Sie Dienstleistungen und Gruppen für Check-In
- [Check-In abschließen](check-in) -- der Check-In-Ablauf für Familien
- [B1 Checkin Erste Schritte](../../b1-checkin/getting-started/) -- die Checkin Kiosk-App
