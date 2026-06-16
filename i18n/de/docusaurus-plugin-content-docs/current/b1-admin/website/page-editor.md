---
title: "Seiten-Editor verwenden"
---

# Seiten-Editor verwenden

<div class="article-intro">

Der B1-Seiten-Editor ist ein visueller Drag-and-Drop-Builder, mit dem Sie Ihre Kirchenwebsite-Seiten gestalten können, ohne Code zu schreiben. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau anzeigen und Änderungen rückgängig machen – alles direkt in Ihrem Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie die [Anfangseinrichtung](initial-setup) durch, um Ihre Website zu konfigurieren
- Erstellen Sie mindestens eine Seite in [Seiten verwalten](managing-pages)
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zuzugreifen

</div>

## Editor öffnen

1. Klicken Sie in B1 Admin auf **Website** im linken Menü.
2. Suchen Sie die Seite, die Sie bearbeiten möchten, in der Tabelle „Seiten" und klicken Sie auf **Bearbeiten**.

Der Editor wird im Vollbildmodus geöffnet. Im linken Bereich sehen Sie Ihre Seitenstruktur und verfügbare Inhaltselemente; der mittlere Bereich zeigt eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im Light-Modus angezeigt, unabhängig von Ihrer B1 Admin-Designeinstellung. Dies gewährleistet, dass die Vorschau genau widerspiegelt, wie Ihre Seite für Website-Besucher aussieht.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** – Die Top-Level-Container, die Ihre Seite in horizontale Bänder unterteilen (zum Beispiel einen Hero-Abschnitt, einen Inhaltsblock oder einen Footer-Streifen). Jede Seite muss mindestens einen Abschnitt haben, bevor Sie Inhalt hinzufügen können.
- **Elemente** – Die einzelnen Inhaltselemente, die in einem Abschnitt platziert werden, wie Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder die Schaltfläche **+** oben im linken Bereich).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** – durchsuchen Sie die Vorlagengalerie für Abschnitte, organisiert nach Kategorie (Hero, Info, Services, Spenden usw.), und klicken Sie auf einen, um ihn als vollständig gestylten, vordefinierten Abschnitt einzufügen. Sie können alles nach dem Hinzufügen anpassen.
   - **Leerer Abschnitt** – wählen Sie ein Spaltenlayout (einspaltig, zwei Spalten, drei Spalten usw.) und bauen Sie von Grund auf auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen, und konfigurieren Sie seine Hintergrundfarbe, das Padding und andere Stiloptionen.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** – Überschriften, Absätze und Rich-Text
   - **Bild** – Laden Sie ein Foto hoch oder verlinken Sie auf eines
   - **Schaltfläche** – Ein anklickbarer Call-to-Action-Link
   - **Karte** – Ein Bild mit Titel und Beschreibung
   - **Formular** – Betten Sie ein [Formular](../forms/creating-forms) direkt auf der Seite ein
   - **Kalender** – Zeigen Sie einen Eventkalender an
   - **Häufig gestellte Fragen** – Akkordeon-ähnliche Frage- und Antwortblöcke
   - **Video** – Betten Sie ein Video über URL ein
   - **Gruppenbrowser** – Ein filterbares Verzeichnis aller Kirchengruppen mit optionaler Suche, Kategorie-Filter und Label-Filter
3. Konfigurieren Sie das Element mit dem Einstellungsbereich, der angezeigt wird.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente mit dem Griff-Symbol (sechs Punkte) auf der linken Seite jedes Elements, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts ziehen oder zwischen Abschnitten verschieben.

## Ihre Seite gestalten

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um sein Stilbereich zu öffnen. Sie können einstellen:

- **Hintergrund** – Vollfarbe, Verlauf oder Bild
- **Padding** – Oberer und unterer Abstand innerhalb des Abschnitts
- **Breite** – Vollbreite oder zentriert/begrenzt

### Elementstile

Klicken Sie auf ein beliebiges Element, um sein Stilbereich zu öffnen. Häufige Optionen umfassen Schriftgröße, Farbe, Ausrichtung, Rand und Padding. Für Bilder können Sie Alternativtext und Link-Ziele einstellen.

### Benutzerdefiniertes CSS

Für erweiterte Gestaltung hat jeder Abschnitt und jedes Element ein Feld **Benutzerdefiniertes CSS**, in dem Sie Ihre eigenen CSS-Regeln schreiben können. Diese sind auf das Element beschränkt, sodass sie den Rest der Seite nicht unbeabsichtlich beeinflussen.

:::tip
Wenn Sie Stile auf Ihre gesamte Website anwenden müssen – wie eine benutzerdefinierte Schriftart oder eine globale Farbe – verwenden Sie stattdessen die Einstellungen [Erscheinungsbild](appearance), anstatt benutzerdefiniertes CSS auf einzelnen Seiten zu verwenden.
:::

## Seite in der Vorschau anzeigen

Verwenden Sie die Vorschausteuerelemente in der Symbolleiste, um zu überprüfen, wie Ihre Seite auf verschiedenen Bildschirmgrößen aussieht:

- **Desktop** – Vollbreite Browser-Ansicht
- **Handy** – Enge Telefon-ähnliche Ansicht

Klicken Sie auf **Vorschau**, um eine Live-Version der Seite in einer neuen Browser-Registerkarte zu öffnen, genau wie Besucher sie sehen werden.

## Änderungen rückgängig machen

Der Editor verfolgt Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Symbolleisten-Schaltflächen oder Tastaturkürzel zum Navigieren:

- **Rückgängig** (Strg+Z / Cmd+Z) – Machen Sie Ihre letzte Aktion rückgängig
- **Wiederholen** (Strg+Y / Cmd+Y) – Machen Sie eine rückgängig gemachte Aktion erneut

Sie können die Seite auch in einem früheren Snapshot wiederherstellen. Klicken Sie auf **Verlauf** in der Symbolleiste, um eine Liste gespeicherter Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Punkt wiederherzustellen.

:::warning
Das Wiederherstellen eines Snapshots ersetzt Ihren aktuellen Seiteninhalt mit der Snapshot-Version. Dies kann nicht mit der Standard-Schaltfläche „Rückgängig" rückgängig gemacht werden. Speichern Sie einen Snapshot Ihres aktuellen Zustands, bevor Sie einen alten Snapshot wiederherstellen, wenn Sie die Möglichkeit haben möchten, zurückzukehren.
:::

## Speichern und veröffentlichen

Änderungen werden automatisch gespeichert, während Sie arbeiten. Ein Statusanzeiger in der Symbolleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und veröffentlichter Status

Seiten können einen **veröffentlichten** Status haben, der steuert, wann Besucher Ihre Änderungen sehen. Die Symbolleiste zeigt einen Status-Chip, der den aktuellen Status anzeigt:

- **Live beim Speichern** – Die Seite verwendet keinen Veröffentlichungs-Workflow. Jede gespeicherte Änderung wird sofort live geschaltet. Dies ist die Standardeinstellung für neue Seiten.
- **Unveröffentlichte Änderungen** – Die Seite wurde zuvor veröffentlicht, Sie haben aber Änderungen seit der letzten Veröffentlichung vorgenommen. Besucher sehen immer noch die zuvor veröffentlichte Version.
- **Veröffentlicht** – Die Seite ist live und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie auf die Schaltfläche **Veröffentlichen** in der Symbolleiste. Die Seite wird sofort live geschaltet.

Um zur letzten veröffentlichten Version zurückzukehren, ohne das zu beeinflussen, was Besucher sehen, öffnen Sie das Menü „Mehr" (⋮) und klicken Sie auf **Änderungen verwerfen**.

Um eine Seite vollständig offline zu nehmen, öffnen Sie das Menü „Mehr" und klicken Sie auf **Veröffentlichung aufheben**. Besucher sehen diese Seite nicht mehr, bis Sie sie erneut veröffentlichen.

:::tip
Verwenden Sie den Entwurfs-/Veröffentlichungs-Workflow, wenn Sie eine Seite vorbereiten möchten – zum Beispiel für eine bevorstehende Veranstaltung – und sie nur im richtigen Moment live schalten möchten. Erstellen und zeigen Sie die Seite in der Vorschau an, dann klicken Sie auf „Veröffentlichen", wenn Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](managing-pages) – Erstellen Sie Seiten, legen Sie URLs fest und verwalten Sie die Website-Navigation
- [Erscheinungsbild](appearance) – Legen Sie websiteweite Farben, Schriftarten und Branding fest
- [Dateien](files) – Laden Sie Bilder und Dokumente hoch, um sie im Editor zu verwenden
- [Formulare erstellen](../forms/creating-forms) – Erstellen Sie Formulare, die Sie auf Seiten einbetten können
