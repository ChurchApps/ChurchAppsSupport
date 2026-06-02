---
title: "Seiten-Editor verwenden"
---

# Seiten-Editor verwenden

<div class="article-intro">

Der B1-Seiten-Editor ist ein visueller Drag-and-Drop-Builder, mit dem Sie Website-Seiten Ihrer Kirchengemeinde entwerfen können, ohne Code zu schreiben. Sie können Abschnitte und Inhalts-Blöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau ansehen und Änderungen rückgängig machen -- alles über Ihren Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Füllen Sie [Anfangseinrichtung](initial-setup) aus, um Ihre Website zu konfigurieren
- Erstellen Sie mindestens eine Seite in [Seiten verwalten](managing-pages)
- Sie benötigen die **content.edit**-Berechtigung, um auf den Editor zuzugreifen

</div>

## Editor öffnen

1. Klicken Sie in B1 Admin auf **Website** im linken Menü.
2. Finden Sie die Seite, die Sie bearbeiten möchten, in der Seiten-Tabelle und klicken Sie auf **Bearbeiten**.

Der Editor wird im Vollbildmodus geöffnet. Das linke Fenster zeigt Ihre Seiten-Struktur und verfügbare Inhalts-Elemente; der mittlere Bereich zeigt eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im Hellen Modus angezeigt, unabhängig von Ihrer B1 Admin-Theme-Einstellung. Dies stellt sicher, dass die Vorschau genau widerspiegelt, wie Ihre Seite für Website-Besucher aussieht.
:::

## Seiten-Struktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** -- Die Top-Level-Container, die Ihre Seite in horizontale Bänder unterteilen (zum Beispiel ein Hero-Abschnitt, ein Inhalts-Block oder eine Footer-Leiste). Jede Seite muss mindestens einen Abschnitt haben, bevor Sie Inhalte hinzufügen können.
- **Elemente** -- Die einzelnen Inhalts-Teile, die in einem Abschnitt platziert sind, wie Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder die **+**-Schaltfläche oben im linken Fenster).
2. Wählen Sie ein Layout für Ihren Abschnitt -- Optionen sind einzelne Spalte, zwei Spalten, drei Spalten und mehr.
3. Der neue Abschnitt wird in der Vorschau angezeigt. Klicken Sie darauf, um ihn auszuwählen, und konfigurieren Sie die Hintergrundfarbe, den Abstand und andere Stil-Optionen.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie im Vorschaufenster in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalte hinzufügen** und wählen Sie einen Element-Typ aus der Liste aus:
   - **Text** -- Überschriften, Absätze und Rich Text
   - **Bild** -- Ein Foto hochladen oder verlinken
   - **Schaltfläche** -- Ein anklickbarer Call-to-Action-Link
   - **Karte** -- Ein Bild mit Titel und Beschreibung
   - **Formular** -- Betten Sie ein [Formular](../forms/creating-forms) direkt auf der Seite ein
   - **Kalender** -- Zeigen Sie einen Ereignis-Kalender an
   - **FAQ** -- Akkordeon-Stil-Frage- und Antwort-Blöcke
   - **Video** -- Betten Sie ein Video über eine URL ein
   - **Gruppen-Browser** -- Ein filterbares Verzeichnis aller Kirchengemeinde-Gruppen mit optionaler Suche, Kategoriefilter und Beschriftungs-Filter
3. Konfigurieren Sie das Element mit dem Einstellungen-Fenster, das angezeigt wird.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente mit dem Griff-Symbol (sechs Punkte) auf der linken Seite jedes Elements, um sie neu zu ordnen. Sie können Elemente innerhalb eines Abschnitts ziehen oder zwischen Abschnitten verschieben.

## Ihre Seite formatieren

### Abschnitts-Stile

Klicken Sie auf einen beliebigen Abschnitt, um sein Stil-Fenster zu öffnen. Sie können festlegen:

- **Hintergrund** -- Einfache Farbe, Verlauf oder Bild
- **Abstand** -- Oben und unten Abstände innerhalb des Abschnitts
- **Breite** -- Vollbreite oder zentriert/begrenzt

### Element-Stile

Klicken Sie auf ein beliebiges Element, um sein Stil-Fenster zu öffnen. Häufige Optionen sind Schriftgröße, Farbe, Ausrichtung, Rand und Abstand. Für Bilder können Sie Alt-Text und Link-Ziele einstellen.

### Benutzerdefiniertes CSS

Für erweiterte Formatierung hat jeder Abschnitt und jedes Element ein **Benutzerdefiniertes CSS**-Feld, in dem Sie Ihre eigenen CSS-Regeln schreiben können. Diese sind auf dieses Element begrenzt, sodass sie den Rest der Seite nicht unbeabsichtlich beeinflussen.

:::tip
Wenn Sie Stile auf Ihrer gesamten Website anwenden möchten -- wie eine benutzerdefinierte Schriftart oder globale Farbe -- verwenden Sie die [Erscheinungsbild](appearance)-Einstellungen statt benutzerdefiniertes CSS auf einzelnen Seiten.
:::

## Ihre Seite in der Vorschau ansehen

Verwenden Sie die Vorschau-Steuerelemente in der Symbolleiste, um zu überprüfen, wie Ihre Seite bei verschiedenen Bildschirmgrößen aussieht:

- **Desktop** -- Vollbreite Browser-Ansicht
- **Mobilgerät** -- Schmale Telefonansicht

Klicken Sie auf **Vorschau**, um eine Live-Version der Seite in einem neuen Browser-Tab zu öffnen, genau wie Website-Besucher sie sehen.

## Änderungen rückgängig machen

Der Editor verfolgt Ihre Bearbeitungs-Historie automatisch. Verwenden Sie die Symbolleisten-Schaltflächen oder Tastenkombinationen zum Navigieren:

- **Rückgängig** (Strg+Z / Cmd+Z) -- Machen Sie Ihre letzte Aktion rückgängig
- **Wiederherstellen** (Strg+Y / Cmd+Y) -- Wenden Sie eine rückgängig gemachte Aktion erneut an

Sie können auch die Seite in einem früheren Snapshot wiederherstellen. Klicken Sie auf **Verlauf** in der Symbolleiste, um eine Liste der gespeicherten Snapshots mit Beschreibungen anzuzeigen, und klicken Sie auf einen Eintrag, um auf diesen Punkt zurückzukehren.

:::warning
Das Wiederherstellen eines Snapshots ersetzt Ihren aktuellen Seiten-Inhalt mit der Snapshot-Version. Dies kann nicht mit der Standard-Rückgängig-Schaltfläche rückgängig gemacht werden. Speichern Sie einen Snapshot Ihres aktuellen Zustands, bevor Sie einen alten Snapshot wiederherstellen, wenn Sie die Option haben möchten, zurückzukehren.
:::

## Ihre Arbeit speichern

Änderungen werden automatisch gespeichert, während Sie arbeiten. Ein Status-Indikator in der Symbolleiste zeigt, ob Ihre Änderungen gespeichert wurden. Sie können auch jederzeit auf **Speichern** klicken, um ein Speichern zu erzwingen.

## Verwandte Artikel

- [Seiten verwalten](managing-pages) -- Erstellen Sie Seiten, legen Sie URLs fest und verwalten Sie die Website-Navigation
- [Erscheinungsbild](appearance) -- Legen Sie Website-weite Farben, Schriftarten und Markenbildung fest
- [Dateien](files) -- Laden Sie Bilder und Dokumente hoch, um sie im Editor zu verwenden
- [Formulare erstellen](../forms/creating-forms) -- Erstellen Sie Formulare, die Sie auf Seiten einbetten können
