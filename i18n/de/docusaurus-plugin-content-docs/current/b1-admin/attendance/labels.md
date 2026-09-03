---
title: "Check-In-Label-Designer"
---

# Check-In-Label-Designer

<div class="article-intro">

Mit dem Label Designer können Sie die Namensschild- und Abholscheinvorlagen anpassen, die beim Einchecken von Kindern von Familien gedruckt werden. Sie können genau kontrollieren, welche Informationen auf jedem Label angezeigt werden, wie sie positioniert sind und wie sie aussehen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie [Anwesenheit](setup) ein und konfigurieren Sie mindestens eine Servicezeit mit aktiviertem Check-in
- Richten Sie [Check-In](check-in) ein, so dass Labels gedruckt werden
- Sie benötigen Administratorzugriff auf den Bereich Anwesenheit

</div>

## Öffnen des Label Designer

In B1 Admin klicken Sie auf das **Bereichsmenü** in der oberen linken Ecke (der aktuelle Bereichsname mit dem kleinen Pfeil daneben) und wählen Sie **Mobil**. Wählen Sie in der Navigationsleiste **B1 CheckIn** und klicken Sie dann auf die Schaltfläche **Design Labels** auf der Karte Check-in Labels. Sie sehen eine Liste Ihrer gespeicherten Label-Vorlagen, unterteilt nach Typ: **Nametag** und **Pickup Slip**.

## Label-Typen

- **Nametag** — wird gedruckt und an das Kind angebracht. Enthält normalerweise den Namen des Kindes, seine Klasse/Sitzung und einen Sicherheitscode.
- **Pickup Slip** — wird dem Eltern- oder Erziehungsberechtigten gegeben. Enthält normalerweise den Sicherheitscode und eine Liste der Kinder, die sie eingecheckt haben.

B1 startet Sie mit einer Standard-Namensmarke und einer Standard-Abholscheinvorlage in der Größe für Standard-Thermolabel von 3,5 × 1,1 Zoll.

## Erstellen einer Label-Vorlage

1. Klicken Sie auf **Add Nametag** oder **Add Pickup Slip** (oder verwenden Sie das Dropdown-Menü).
2. Eine neue Vorlage wird im Label-Editor geöffnet.

### Label Editor

Der Editor zeigt eine skalierte Vorschau des Labels in der konfigurierten Größe. Im linken Panel können Sie folgendes konfigurieren:

- **Name** — der Vorlagenname (nur für Sie)
- **Label Type** — Nametag oder Pickup Slip
- **Width / Height** — Label-Größe in Zoll

### Blöcke hinzufügen

Ein Label wird aus Blöcken erstellt — einzelne Inhaltselemente, die auf der Label-Leinwand positioniert werden. Klicken Sie auf **Add Block**, um einen neuen Block einzufügen und wählen Sie seinen Typ:

- **Field** — zieht einen Datenwert zum Druckzeitpunkt:
  - `person.displayName` — vollständiger Name der Person
  - `sessions` — der Service/die Klasse, zu der sie eingecheckt haben
  - `securityCode` — der zufällig generierte Abholsicherheitscode
  - `children` — Liste der Kinder (für Abholscheine)
  - `person.nametagNotes` — alle Besonderheiten im Datensatz der Person
  - `campus` — der Campus-Name
- **Text** — statischer Text, den Sie eingeben (für Überschriften, Etiketten oder Anweisungen)
- **Barcode** — ein Barcode, der den Sicherheitscode kodiert

### Blöcke positionieren

Jeder Block hat **X**, **Y**, **Width** und **Height** Felder, die als Prozentsätze der Label-Leinwand ausgedrückt werden (0–100). Passen Sie diese an, um Inhalte genau zu positionieren. Sie können auch einstellen:

- **Font Size** — Textgröße in Punkten
- **Bold** — Fettdruck umschalten
- **Align** — Links-, Mittel- oder Rechtsbündigkeit
- **Condition** — Block optional ausblenden, wenn ein Feld leer ist (z. B. nametagNotes nur anzeigen, wenn es einen Wert hat)

### Speichern

Klicken Sie auf **Save**, um die Vorlage zu speichern. Die aktualisierte Vorlage wird beim nächsten Drucken von Labels in B1 Checkin verwendet.

## Neuanordnung von Vorlagen

Wenn Sie mehrere Nametag- oder Pickup Slip-Vorlagen haben, verwendet B1 Checkin standardmäßig die erste Vorlage in der Liste. Ziehen Sie Vorlagen, um sie neu anzuordnen.

## Löschen einer Vorlage

Klicken Sie auf das Löschsymbol in einer beliebigen Vorlagenzeile und bestätigen Sie. Das Löschen der letzten Vorlage eines Typs stellt die integrierte Standardvorlage wieder her.

:::tip
Führen Sie nach dem Bearbeiten einer Vorlage einen Testdruck durch, um zu überprüfen, dass das Layout korrekt aussieht, bevor Sie zum nächsten Service gehen.
:::

## Verwandte Artikel

- [Check-In-Setup](setup) — konfigurieren Sie Services und Gruppen für Check-in
- [Completing Check-In](check-in) — der Check-in-Ablauf für Familien
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — die Checkin-Kiosk-App
