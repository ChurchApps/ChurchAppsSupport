---
title: "Check-In-Etikettendesigner"
---

# Check-In-Etikettendesigner

<div class="article-intro">

Der Etikettendesigner ermöglicht es Ihnen, die Namensschild- und Abholzettelvorlagen zu erstellen und anzupassen, die beim Check-in von Kindern gedruckt werden. Sie können genau kontrollieren, welche Informationen auf jedem Etikett angezeigt werden, wo es positioniert ist und wie es aussieht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie [Attendance](setup) ein und konfigurieren Sie mindestens eine Servicezeit mit aktiviertem Check-in
- Richten Sie [Check-In](check-in) so ein, dass Etiketten gedruckt werden
- Sie benötigen Administratorzugriff auf den Attendance-Bereich

</div>

## Öffnen des Etikettendesigners

In B1 Admin gehen Sie zu **Attendance** in der linken Seitenleiste und wählen Sie **Labels**. Sie sehen eine Liste Ihrer gespeicherten Etikettenvorlagen, getrennt nach Typ: **Nametag** und **Pickup Slip**.

## Etikettentypen

- **Nametag** — wird gedruckt und am Kind angebracht. Enthält normalerweise den Namen des Kindes, sein Klassenzimmer/seine Sitzung und einen Sicherheitscode.
- **Pickup Slip** — wird dem Elternteil oder Vormund übergeben. Enthält normalerweise den Sicherheitscode und eine Liste der eingechecked Kinder.

B1 startet Sie mit einer Standard-Namensschild- und einer Standard-Abholzettelvorlage im Standardformat 3,5 × 1,1 Zoll für Thermaldrucker.

## Erstellen einer Etikettenvorlage

1. Klicken Sie auf **Add Nametag** oder **Add Pickup Slip** (oder verwenden Sie das Dropdown-Menü, um auszuwählen).
2. Eine neue Vorlage wird im Etiketteneditor geöffnet.

### Etiketteneditor

Der Editor zeigt eine skalierte Vorschau des Etiketts in der konfigurierten Größe. Im linken Bereich können Sie Folgendes konfigurieren:

- **Name** — der Vorlagenname (nur als Referenz für Sie)
- **Label Type** — Nametag oder Pickup Slip
- **Width / Height** — Etiketengröße in Zoll

### Blöcke hinzufügen

Ein Etikett wird aus Blöcken aufgebaut — einzelne Inhaltsabschnitte, die auf der Etikettencanvas positioniert sind. Klicken Sie auf **Add Block**, um einen neuen Block einzufügen und wählen Sie seinen Typ:

- **Field** — ruft einen Datenwert zum Zeitpunkt des Drucks ab:
  - `person.displayName` — der vollständige Name der Person
  - `sessions` — der Service/das Klassenzimmer, in dem sie eingecheckt ist
  - `securityCode` — der zufällig generierte Abholsicherheitscode
  - `children` — Liste der Kinder (für Abholzettel)
  - `person.nametagNotes` — alle speziellen Notizen in der Personenakte
  - `campus` — der Name des Campus
- **Text** — statischer Text, den Sie eingeben (für Überschriften, Labels oder Anweisungen)
- **Barcode** — ein Barcode, der den Sicherheitscode kodiert

### Blöcke positionieren

Jeder Block hat **X**, **Y**, **Width** und **Height**-Felder, ausgedrückt als Prozentsätze der Etikettencanvas (0–100). Passen Sie diese an, um Inhalte präzise zu positionieren. Sie können auch Folgendes einstellen:

- **Font Size** — Textgröße in Punkten
- **Bold** — fettgedruckten Text aktivieren
- **Align** — Text-Ausrichtung: links, Mitte oder rechts
- **Condition** — Block optional verbergen, wenn ein Feld leer ist (zum Beispiel nur nametagNotes anzeigen, wenn es einen Wert hat)

### Speichern

Klicken Sie auf **Save**, um die Vorlage zu speichern. Die aktualisierte Vorlage wird beim nächsten Drucken von Etiketten in B1 Checkin verwendet.

## Neuordnung von Vorlagen

Wenn Sie mehrere Namensschild- oder Abholzettelvorlagen haben, verwendet B1 Checkin standardmäßig die erste Vorlage in der Liste. Ziehen Sie Vorlagen neu an, um sie neu zu ordnen.

## Löschen einer Vorlage

Klicken Sie auf das Löschsymbol in einer Vorlagenzeile und bestätigen Sie. Wenn Sie die letzte Vorlage eines Typs löschen, wird die integrierte Standardvorlage wiederhergestellt.

:::tip
Machen Sie einen Testdruck nach dem Bearbeiten einer Vorlage, um zu bestätigen, dass das Layout korrekt aussieht, bevor Ihr nächster Service beginnt.
:::

## Verwandte Artikel

- [Check-In Setup](setup) — konfigurieren Sie Services und Gruppen für Check-in
- [Completing Check-In](check-in) — der Check-in-Ablauf für Familien
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — die Checkin-Kiosk-App
