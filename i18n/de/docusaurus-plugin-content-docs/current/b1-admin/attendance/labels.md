---
title: "Anmeldungs-Etikettendesigner"
---

# Anmeldungs-Etikettendesigner

<div class="article-intro">

Der Etikettendesigner ermöglicht es Ihnen, die Namensschild- und Abholquittungs-Vorlagen zu erstellen und anzupassen, die beim Einchecken von Kindern durch Familien ausgedruckt werden. Sie können genau steuern, welche Informationen auf jedem Etikett angezeigt werden, wo sie positioniert werden und wie sie aussehen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie [Anwesenheit](setup) ein und konfigurieren Sie mindestens eine Gottesdienstzeit mit aktivierter Anmeldung
- Richten Sie [Anmeldung](check-in) ein, damit Etiketten gedruckt werden
- Sie benötigen Verwaltungszugriff auf den Anwesenheitsbereich

</div>

## Öffnen des Etikettendesigners

Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Mobil**, und klicken Sie auf **B1 CheckIn**. Klicken Sie dann auf die Schaltfläche **Etiketten entwerfen** auf der Karte "Anmeldungs-Etiketten". Sie sehen eine Liste Ihrer gespeicherten Etikettenvorlagen, unterteilt nach Typ: **Namensschild** und **Abholquittung**.

## Etikettentypen

- **Namensschild** – wird ausgedruckt und an das Kind angebracht. Enthält typischerweise den Namen des Kindes, sein Klassenzimmer/seine Sitzung und einen Sicherheitscode.
- **Abholquittung** – wird an den Eltern oder Erziehungsberechtigten gegeben. Enthält typischerweise den Sicherheitscode und eine Liste der Kinder, die sie angemeldet haben.

B1 beginnt mit einer Standard-Namenschildvorlage und einer Standard-Abholquittungs-Vorlage in der Größe von Standard-Thermisk-Etiketten von 3,5 × 1,1 Zoll.

## Etikettenvorlage erstellen

1. Klicken Sie auf **Hinzufügen** und wählen Sie einen Startpunkt aus dem Menü: **Namensschild 3,5" x 1,1"**, **Abholquittung 3,5" x 1,1"** oder **Blank**.
2. Eine neue Vorlage wird im Etiketteneditor geöffnet.

### Etiketteneditor

Der Editor zeigt eine skalierte Vorschau des Etiketts in der konfigurierten Größe. Im linken Panel können Sie folgende Optionen konfigurieren:

- **Name** – der Vorlagenname (nur für Ihre Referenz)
- **Etikettentyp** – Namensschild oder Abholquittung
- **Breite / Höhe** – Etikettengröße in Zoll

### Blöcke hinzufügen

Ein Etikett wird aus Blöcken erstellt – einzelne Inhaltselemente, die auf der Etikettenleinwand positioniert werden. Klicken Sie auf **Block hinzufügen**, um einen neuen Block einzufügen und seinen Typ auszuwählen:

- **Feld** – zieht einen Datenwert zum Druckzeitpunkt:
  - `person.displayName` – der volle Name der Person
  - `sessions` – der Service/das Klassenzimmer, zu dem sie angemeldet wurden
  - `securityCode` – der zufällig generierte Abholsicherheitscode
  - `children` – Liste der Kinder (für Abholquittungen)
  - `person.nametagNotes` – spezielle Notizen im Datensatz der Person
  - `person.isBirthdayWeek` – true, wenn der Geburtstag der Person (Monat und Tag) innerhalb von 3 Tagen vor oder nach dem Anmeldedatum liegt
  - `campus` – der Standortname
- **Text** – statischer Text, den Sie eingeben (für Überschriften, Beschriftungen oder Anweisungen)
- **Barcode** – ein Barcode, der den Sicherheitscode codiert

### Blöcke positionieren

Jeder Block hat **X**, **Y**, **Breite** und **Höhe**-Felder, die als Prozentsätze der Etikettenleinwand ausgedrückt werden (0–100). Passen Sie diese an, um Inhalte genau zu positionieren. Sie können auch folgende Einstellungen vornehmen:

- **Schriftgröße** – Textgröße in Punkten
- **Fett** – Fettdruck umschalten
- **Ausrichten** – Linksbündige, mittenbündige oder rechtsbündige Textausrichtung
- **Bedingung** – Blöcke optional ausblenden, wenn ein Feld leer ist (z.B. nur Namensschild-Notizen anzeigen, wenn sie einen Wert haben). Dies funktioniert auch mit `person.isBirthdayWeek`, um ein Geburtstagsgrafik oder Text nur auf Namensschildern für Kinder anzuzeigen, deren Geburtstag einige Tage nach der Anmeldung liegt.

### Speichern

Klicken Sie auf **Speichern**, um die Vorlage zu speichern. Die aktualisierte Vorlage wird beim nächsten Drucken von Etiketten in B1 Checkin verwendet.

## Vorlagen neu ordnen

Wenn Sie mehrere Namensschild- oder Abholquittungs-Vorlagen haben, verwendet B1 Checkin standardmäßig die erste Vorlage in der Liste. Ziehen Sie Vorlagen, um sie neu zu ordnen.

## Vorlage löschen

Klicken Sie auf das Löschsymbol in einer Vorlagenseile und bestätigen Sie. Das Löschen der letzten Vorlage eines Typs stellt die Standard-integrierte Vorlage wieder her.

:::tip
Machen Sie einen Testdruck nach dem Bearbeiten einer Vorlage, um zu bestätigen, dass das Layout vor Ihrem nächsten Service richtig aussieht.
:::

## Verwandte Artikel

- [Anmeldungseinrichtung](setup) – konfigurieren Sie Services und Gruppen für die Anmeldung
- [Anmeldung abschließen](check-in) – der Anmeldungsablauf für Familien
- [B1 Checkin Erste Schritte](../../b1-checkin/getting-started/) – die Checkin-Kiosk-App
