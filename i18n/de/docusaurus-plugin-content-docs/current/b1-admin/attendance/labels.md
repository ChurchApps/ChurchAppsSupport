---
title: "Check-In-Etikett-Designer"
---

# Check-In-Etikett-Designer

<div class="article-intro">

Der Etikett-Designer ermöglicht es Ihnen, die Namensschilder und Abholschein-Vorlagen zu erstellen und anzupassen, die beim Check-In von Kindern durch Familien gedruckt werden. Sie können genau steuern, welche Informationen auf jedem Etikett angezeigt werden, wo es positioniert ist und wie es aussieht.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie [Anwesenheit](setup) ein und konfigurieren Sie mindestens eine Servicezeit mit aktiviertem Check-In
- Richten Sie [Check-In](check-in) ein, damit Etiketten gedruckt werden
- Sie benötigen administrative Berechtigung für den Abschnitt „Anwesenheit"

</div>

## Etikett-Designer öffnen

Gehen Sie in B1 Admin zu **Anwesenheit** in der linken Seitenleiste und wählen Sie **Etiketten**. Sie sehen eine Liste Ihrer gespeicherten Etikett-Vorlagen, getrennt nach Typ: **Namensschilder** und **Abholscheine**.

## Etikett-Typen

- **Namensschilder** – werden gedruckt und am Kind angebracht. Normalerweise enthalten sie den Namen des Kindes, seinen Klassenzimmer/seine Sitzung und einen Sicherheitscode.
- **Abholschein** – wird dem Elternteil oder Erziehungsberechtigten gegeben. Normalerweise enthält er den Sicherheitscode und eine Liste der Kinder, die sie eingecheckt haben.

B1 startet Sie mit einer Standard-Namensschilds-Vorlage und einer Standard-Abholschein-Vorlage mit einer Größe von 3,5 × 1,1 Zoll für Standard-Thermoetiketten.

## Etikett-Vorlage erstellen

1. Klicken Sie auf **Namensschilds hinzufügen** oder **Abholschein hinzufügen** (oder verwenden Sie das Dropdown-Menü zur Auswahl).
2. Eine neue Vorlage wird im Etikett-Editor geöffnet.

### Etikett-Editor

Der Editor zeigt eine skalierte Vorschau des Etiketts in der konfigurierten Größe. Im linken Bereich können Sie Folgendes konfigurieren:

- **Name** – der Name der Vorlage (nur zu Ihrer Information)
- **Etikett-Typ** – Namensschilds oder Abholschein
- **Breite / Höhe** – Etikett-Größe in Zoll

### Blöcke hinzufügen

Ein Etikett wird aus Blöcken erstellt – einzelnen Inhaltsteilen, die auf der Etikett-Leinwand positioniert sind. Klicken Sie auf **Block hinzufügen**, um einen neuen Block einzufügen, und wählen Sie seinen Typ:

- **Feld** – zieht einen Datenwert zur Druckzeit:
  - `person.displayName` – der vollständige Name der Person
  - `sessions` – der Service/Klassenzimmer, in den sie eingecheckt haben
  - `securityCode` – der zufällig generierte Abholsicherheitscode
  - `children` – Liste der Kinder (für Abholscheine)
  - `person.nametagNotes` – alle speziellen Notizen zur Personalakte
  - `campus` – der Campus-Name
- **Text** – statischer Text, den Sie eingeben (für Überschriften, Etiketten oder Anweisungen)
- **Barcode** – ein Barcode, der den Sicherheitscode kodiert

### Blöcke positionieren

Jeder Block hat **X**-, **Y**-, **Breite**- und **Höhe**-Felder, die in Prozentanteilen der Etikett-Leinwand ausgedrückt werden (0–100). Passen Sie diese an, um Inhalte genau zu positionieren. Sie können auch Folgendes einstellen:

- **Schriftgröße** – Textgröße in Punkten
- **Fett** – Fettdruck-Text umschalten
- **Ausrichtung** – linke, mittlere oder rechte Textausrichtung
- **Bedingung** – Block optional ausblenden, wenn ein Feld leer ist (zum Beispiel nametagNotes nur anzeigen, wenn es einen Wert hat)

### Speichern

Klicken Sie auf **Speichern**, um die Vorlage zu speichern. Die aktualisierte Vorlage wird beim nächsten Drucken von Etiketten in B1 Checkin verwendet.

## Vorlagen neu anordnen

Wenn Sie mehrere Namensschilds- oder Abholschein-Vorlagen haben, verwendet B1 Checkin standardmäßig die erste Vorlage in der Liste. Ziehen Sie Vorlagen per Drag & Drop, um sie neu anzuordnen.

## Vorlage löschen

Klicken Sie auf das Löschen-Symbol in einer Vorlagenzeile und bestätigen Sie. Das Löschen der letzten Vorlage eines Typs stellt die standardmäßig integrierte Vorlage wieder her.

:::tip
Machen Sie nach dem Bearbeiten einer Vorlage einen Testdruck, um zu bestätigen, dass das Layout korrekt aussieht, bevor Ihr nächster Service beginnt.
:::

## Verwandte Artikel

- [Check-In-Einrichtung](setup) – konfigurieren Sie Services und Gruppen für Check-In
- [Check-In durchführen](check-in) – der Check-In-Prozess für Familien
- [B1 Checkin Erste Schritte](../../b1-checkin/getting-started/index) – die Checkin-Kiosk-App
