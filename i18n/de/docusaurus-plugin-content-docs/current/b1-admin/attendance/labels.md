---
title: "Check-In-Etikettengestalter"
description: "Passen Sie die Vorlagen für Namensschilder und Abholzettel an, die beim Check-in in B1 Admin gedruckt werden, einschließlich Feldern, Positionierung sowie Bedingungen für Geburtstag oder Notizen."
---

# Check-In-Etikettengestalter

<div class="article-intro">

Mit dem Etikettengestalter erstellen und bearbeiten Sie die Vorlagen für Namensschilder und Abholzettel, die gedruckt werden, wenn Familien ihre Kinder einchecken. Sie bestimmen genau, welche Informationen auf jedem Etikett erscheinen, wo sie positioniert werden und wie sie aussehen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Anwesenheit](./setup.md) ein und konfigurieren Sie mindestens eine Gottesdienstzeit mit aktiviertem Check-in
- Richten Sie den [Check-In](./check-in.md) ein, damit Etiketten gedruckt werden
- Sie benötigen die Berechtigung **Anwesenheit bearbeiten**

</div>

## Den Etikettengestalter öffnen {#opening-the-label-designer}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Mobil** auf und klicken Sie auf **Etiketten**. Alternativ klicken Sie auf **B1 CheckIn** und dann auf der Karte **Check-in-Etiketten** auf **Etiketten gestalten**.

Die Seite **Check-in-Etiketten** listet Ihre gespeicherten Vorlagen mit ihrem **Namen**, dem **Typ** (**Namensschild** oder **Abholzettel**) und der **Größe** auf. Wenn Sie noch keine erstellt haben, steht dort **Keine Etikettenvorlagen**, und B1 Checkin druckt sein eingebautes Namensschild und den eingebauten Abholzettel.

## Etikettentypen {#label-types}

- **Namensschild** – wird gedruckt und dem Kind angeheftet. Enthält in der Regel den Namen des Kindes, seine Klasse bzw. Sitzung und einen Sicherheitscode.
- **Abholzettel** – wird den Eltern oder Erziehungsberechtigten gegeben. Enthält in der Regel den Sicherheitscode und eine Liste der Kinder, die sie eingecheckt haben.

Beide Startvorlagen sind für standardmäßige thermische Etiketten im Format 3,5 × 1,1 Zoll (Brother DK-1201) ausgelegt.

## Eine Etikettenvorlage erstellen {#creating-a-label-template}

1. Klicken Sie auf **Etikett hinzufügen** und wählen Sie einen Ausgangspunkt: **Namensschild 3,5" x 1,1"**, **Abholzettel 3,5" x 1,1"** oder **Leer**.
2. Die Vorlage öffnet sich im Etiketteneditor, mit einer Vorschau des Etiketts, das mit Beispieldaten gefüllt ist.

### Etiketteneditor {#label-editor}

Oben im Editor können Sie Folgendes festlegen:

- **Name** – der Name der Vorlage (nur zu Ihrer Information; Pflichtfeld)
- **Typ** – Namensschild oder Abholzettel
- **Breite (in)** / **Höhe (in)** – Größe des Etiketts in Zoll

### Blöcke hinzufügen {#adding-blocks}

Ein Etikett besteht aus Blöcken – einzelnen Inhaltselementen, die auf dem Etikett platziert werden. Klicken Sie im Bereich **Block hinzufügen** auf eine Schaltfläche, um einen Block hinzuzufügen:

- **Felder** – übernehmen beim Drucken einen Wert. Namensschilder bieten **Anzeigename**, **Vorname**, **Nachname**, **Spitzname**, **Notizen für Namensschild** (die Notizen im Datensatz der Person), **Geburtstag diese Woche** (wahr, wenn der Geburtstag der Person innerhalb von 3 Tagen vor oder nach dem Check-in-Datum liegt), **Sitzungen** (die Gottesdienstzeiten und Räume, in die sie eingecheckt wurden), **Sicherheitscode**, **Datum** und **Name der Kirche**. Abholzettel bieten **Kinder**, **Kinder & Allergien**, **Sicherheitscode**, **Datum** und **Name der Kirche**.
- **Text** – fester Text, den Sie eingeben (für Überschriften, Beschriftungen oder Anweisungen)
- **Barcode** – ein Barcode nach Code 128 oder Code 39 eines Feldes, etwa des Sicherheitscodes
- **QR-Code** – ein QR-Code eines Feldes
- **Rahmen** – ein Rechteck mit optionaler Füllfarbe und Umrandung

### Blöcke positionieren und gestalten {#positioning-and-styling-blocks}

Ziehen Sie einen Block auf dem Etikett, um ihn zu verschieben, oder klicken Sie darauf und verwenden Sie den Bereich **Eigenschaften**. **X**, **Y**, **B** und **H** sind Prozentwerte des Etiketts (0–100). Je nach Block können Sie außerdem festlegen:

- **Schriftgröße** – Textgröße, bezogen auf die Höhe des Etiketts
- **Fett** und **Kursiv**
- **Ausrichtung** – Links, Zentriert oder Rechts
- **Symbologie** und **Wert** – für Barcodes und QR-Codes
- **Füllung** und **Umrandung** – für Rahmen
- **Bedingung** – **Immer** zeigt den Block an. Wählen Sie ein Feld, um den Block nur anzuzeigen, wenn dieses Feld **nicht leer ist**, **leer ist**, **gleich** oder **ungleich** einem Wert ist. Zum Beispiel: Notizen nur anzeigen, wenn sie ausgefüllt sind, oder eine Geburtstagsgrafik nur anzeigen, wenn **Geburtstag diese Woche** gleich `true` ist.

Klicken Sie auf **Block entfernen**, um den ausgewählten Block zu löschen.

### Speichern {#saving}

Klicken Sie auf **Speichern**, um die Vorlage zu sichern, oder auf **Abbrechen**, um Ihre Änderungen zu verwerfen. B1 Checkin verwendet die aktualisierte Vorlage, sobald es das nächste Mal seine Einstellungen lädt.

## Die Standardvorlage festlegen {#choosing-the-default-template}

Wenn Sie mehr als eine Vorlage eines Typs haben, klicken Sie bei der Vorlage, die B1 Checkin drucken soll, auf **Als Standard festlegen**. Sie erhält dann ein Abzeichen **Standard**, und jede andere Vorlage dieses Typs ist nicht mehr die Standardvorlage. Wenn keine Vorlage eines Typs als Standard markiert ist, verwendet der Kiosk die erste.

## Eine Vorlage löschen {#deleting-a-template}

Klicken Sie in der Zeile der Vorlage auf **Löschen** und bestätigen Sie. Wenn Sie alle Vorlagen eines Typs löschen, kehrt B1 Checkin für diesen Typ zu seinem eingebauten Etikett zurück.

:::tip
Drucken Sie nach dem Bearbeiten einer Vorlage ein Testexemplar, um vor dem nächsten Gottesdienst zu prüfen, ob das Layout stimmt.
:::

## Verwandte Artikel {#related-articles}

- [Anwesenheitseinrichtung](./setup.md) – Gottesdienste und Gruppen für den Check-in konfigurieren
- [Check-In](./check-in.md) – den Kiosk von B1 Checkin einrichten
- [B1 Checkin – Erste Schritte](../../b1-checkin/getting-started/index.md) – die Kiosk-App Checkin
