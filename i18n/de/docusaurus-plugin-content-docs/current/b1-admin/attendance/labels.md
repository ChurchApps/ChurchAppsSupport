---
title: TITEL: Check-in-Etiketten-Designer
---
INHALT:
# Check-in-Etiketten-Designer

<div class="article-intro">

Mit dem Etiketten-Designer erstellen und gestalten Sie die Vorlagen für Namensschilder und Abholscheine, die gedruckt werden, wenn Familien ihre Kinder einchecken. Sie legen genau fest, welche Informationen auf jedem Etikett erscheinen, wo sie positioniert sind und wie sie aussehen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie [Anwesenheit](setup) ein und konfigurieren Sie mindestens eine Gottesdienstzeit mit aktiviertem Check-in
- Richten Sie [Check-in](check-in) ein, damit Etiketten gedruckt werden
- Sie benötigen administrativen Zugriff auf den Bereich „Anwesenheit"

</div>

## Den Etiketten-Designer öffnen

Klicken Sie in B1 Admin auf das **Bereichsmenü** in der oberen linken Ecke (der aktuelle Bereichsname mit dem kleinen Pfeil daneben) und wählen Sie **Mobile**. Wählen Sie in der Navigationsleiste **B1 CheckIn** und klicken Sie dann auf der Karte „Check-in-Etiketten" auf die Schaltfläche **Etiketten entwerfen**. Sie sehen eine Liste Ihrer gespeicherten Etikettenvorlagen, getrennt nach Typ: **Namensschild** und **Abholschein**.

## Etikettentypen

- **Namensschild** — wird gedruckt und am Kind befestigt. Enthält in der Regel den Namen des Kindes, seinen Raum bzw. seine Gruppe und einen Sicherheitscode.
- **Abholschein** — wird dem Elternteil oder der Aufsichtsperson ausgehändigt. Enthält in der Regel den Sicherheitscode und eine Liste der eingecheckten Kinder.

B1 stellt Ihnen zu Beginn eine Standardvorlage für Namensschilder und eine für Abholscheine bereit, dimensioniert für gängige Thermoetiketten im Format 3,5 × 1,1 Zoll.

## Eine Etikettenvorlage erstellen

1. Klicken Sie auf **Namensschild hinzufügen** oder **Abholschein hinzufügen** (oder treffen Sie Ihre Auswahl über das Dropdown-Menü).
2. Eine neue Vorlage wird im Etiketteneditor geöffnet.

### Etiketteneditor

Der Editor zeigt eine skalierte Vorschau des Etiketts in der konfigurierten Größe. Im linken Bereich können Sie Folgendes konfigurieren:

- **Name** — der Vorlagenname (nur zu Ihrer eigenen Orientierung)
- **Etikettentyp** — Namensschild oder Abholschein
- **Breite / Höhe** — Etikettengröße in Zoll

### Blöcke hinzufügen

Ein Etikett besteht aus Blöcken — einzelnen Inhaltselementen, die auf der Etikettenfläche positioniert werden. Klicken Sie auf **Block hinzufügen**, um einen neuen Block einzufügen, und wählen Sie seinen Typ:

- **Feld** — ruft zum Druckzeitpunkt einen Datenwert ab:
  - `person.displayName` — der vollständige Name der Person
  - `sessions` — der Gottesdienst bzw. der Raum, in den eingecheckt wurde
  - `securityCode` — der zufällig generierte Sicherheitscode für die Abholung
  - `children` — Liste der Kinder (für Abholscheine)
  - `person.nametagNotes` — besondere Hinweise im Datensatz der Person
  - `person.isBirthdayWeek` — „true", wenn der Geburtstag der Person in die aktuelle Woche fällt
  - `campus` — der Name des Standorts
- **Text** — statischer Text, den Sie selbst eingeben (für Überschriften, Bezeichnungen oder Hinweise)
- **Barcode** — ein Barcode, der den Sicherheitscode kodiert

### Blöcke positionieren

Jeder Block verfügt über die Felder **X**, **Y**, **Breite** und **Höhe**, angegeben als Prozentwerte der Etikettenfläche (0–100). Passen Sie diese an, um Inhalte präzise zu positionieren. Außerdem können Sie einstellen:

- **Schriftgröße** — Textgröße in Punkt
- **Fett** — Fettschrift ein- oder ausschalten
- **Ausrichtung** — linksbündig, zentriert oder rechtsbündig
- **Bedingung** — blendet den Block optional aus, wenn ein Feld leer ist (zum Beispiel `nametagNotes` nur anzeigen, wenn ein Wert vorhanden ist). Dies funktioniert auch mit `person.isBirthdayWeek`, um eine Geburtstagsgrafik oder einen Geburtstagstext nur auf den Namensschildern von Kindern anzuzeigen, die in dieser Woche Geburtstag haben.

### Speichern

Klicken Sie auf **Speichern**, um die Vorlage zu sichern. Die aktualisierte Vorlage wird beim nächsten Etikettendruck in B1 Checkin verwendet.

## Vorlagen neu anordnen

Wenn Sie mehrere Vorlagen für Namensschilder oder Abholscheine haben, verwendet B1 Checkin standardmäßig die erste Vorlage in der Liste. Ziehen Sie die Vorlagen, um ihre Reihenfolge zu ändern.

## Eine Vorlage löschen

Klicken Sie in der jeweiligen Vorlagenzeile auf das Löschsymbol und bestätigen Sie. Wenn Sie die letzte Vorlage eines Typs löschen, wird die integrierte Standardvorlage wiederhergestellt.

:::tip
Führen Sie nach dem Bearbeiten einer Vorlage einen Testdruck durch, um zu prüfen, ob das Layout stimmt, bevor Ihr nächster Gottesdienst beginnt.
:::

## Verwandte Artikel

- [Check-in-Einrichtung](setup) — Gottesdienste und Gruppen für das Check-in konfigurieren
- [Check-in abschließen](check-in) — der Check-in-Ablauf für Familien
- [Erste Schritte mit B1 Checkin](../../b1-checkin/getting-started/) — die Checkin-Kiosk-App