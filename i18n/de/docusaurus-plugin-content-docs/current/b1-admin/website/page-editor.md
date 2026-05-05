---
title: "Verwendung des Seiten-Editors"
---

# Verwendung des Seiten-Editors

<div class="article-intro">

Der B1-Seiten-Editor ist ein visueller Drag-and-Drop-Builder, mit dem Sie die Seiten Ihrer Kirchenwebsite gestalten können, ohne Code schreiben zu müssen. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau ansehen und Änderungen rückgängig machen -- alles in Ihrem Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie [Initial Setup](initial-setup) durch, um Ihre Website zu konfigurieren
- Erstellen Sie mindestens eine Seite in [Managing Pages](managing-pages)
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zugreifen zu können

</div>

## Öffnen des Editors

1. Klicken Sie in B1 Admin im linken Menü auf **Website**.
2. Suchen Sie die Seite, die Sie bearbeiten möchten, in der Seitentabelle und klicken Sie auf **Edit**.

Der Editor öffnet sich im Vollbildmodus. Das linke Panel zeigt Ihre Seitenstruktur und verfügbare Inhaltselemente; der mittlere Bereich zeigt eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von Ihrer B1 Admin-Themeneinstellung. Dies stellt sicher, dass die Vorschau genau so aussieht, wie Ihre Seite für Website-Besucher aussehen wird.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Sections** -- Die Container der obersten Ebene, die Ihre Seite in horizontale Bänder unterteilen (z. B. ein Hero-Abschnitt, ein Inhaltsblock oder ein Footer-Streifen). Jede Seite muss mindestens einen Abschnitt haben, bevor Sie Inhalte hinzufügen können.
- **Elements** -- Die einzelnen Inhaltselemente, die in einem Abschnitt platziert werden, wie Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Add Section** (oder die **+**-Schaltfläche oben im linken Panel).
2. Wählen Sie ein Layout für Ihren Abschnitt -- Optionen umfassen eine Spalte, zwei Spalten, drei Spalten und mehr.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und seine Hintergrundfarbe, Abstände und andere Stiloptionen zu konfigurieren.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Add Content** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** -- Überschriften, Absätze und Rich Text
   - **Image** -- Laden Sie ein Foto hoch oder verlinken Sie darauf
   - **Button** -- Eine klickbare Call-to-Action-Verknüpfung
   - **Card** -- Ein Bild mit Titel und Beschreibung
   - **Form** -- Betten Sie ein [Formular](../forms/creating-forms) direkt auf der Seite ein
   - **Calendar** -- Zeigen Sie einen Veranstaltungskalender an
   - **FAQ** -- Akkordeon-Stil Frage-und-Antwort-Blöcke
   - **Video** -- Betten Sie ein Video per URL ein
3. Konfigurieren Sie das Element mithilfe des angezeigten Einstellungspanels.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente mithilfe des Handle-Symbols (sechs Punkte) auf der linken Seite jedes Elements, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts oder zwischen Abschnitten verschieben.

## Ihre Seite stylen

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um sein Stil-Panel zu öffnen. Sie können Folgendes festlegen:

- **Background** -- Volltonfarbe, Gradient oder Bild
- **Padding** -- Oberer und unterer Abstand innerhalb des Abschnitts
- **Width** -- Vollbreite oder zentriert/begrenzt

### Elementstile

Klicken Sie auf ein beliebiges Element, um sein Stil-Panel zu öffnen. Häufige Optionen umfassen Schriftgröße, Farbe, Ausrichtung, Rand und Abstand. Für Bilder können Sie Alt-Text und Linkziele festlegen.

### Benutzerdefiniertes CSS

Für erweiterte Stile hat jeder Abschnitt und jedes Element ein **Custom CSS**-Feld, in das Sie Ihre eigenen CSS-Regeln schreiben können. Diese sind auf dieses Element beschränkt, sodass sie den Rest der Seite nicht unbeabsichtigt beeinflussen.

:::tip
Wenn Sie Stile auf Ihre gesamte Website anwenden müssen -- wie eine benutzerdefinierte Schriftart oder globale Farbe -- verwenden Sie die [Appearance](appearance)-Einstellungen anstelle von benutzerdefiniertem CSS auf einzelnen Seiten.
:::

## Vorschau Ihrer Seite

Verwenden Sie die Vorschausteuerungen in der Symbolleiste, um zu überprüfen, wie Ihre Seite bei verschiedenen Bildschirmgrößen aussieht:

- **Desktop** -- Vollbreite-Browseransicht
- **Mobile** -- Schmale Telefonansicht

Klicken Sie auf **Preview**, um eine Live-Version der Seite in einem neuen Browser-Tab zu öffnen, genau so, wie Besucher sie sehen werden.

## Änderungen rückgängig machen

Der Editor verfolgt Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Symbolleistenschaltflächen oder Tastaturkürzel zur Navigation:

- **Undo** (Strg+Z / Cmd+Z) -- Machen Sie Ihre letzte Aktion rückgängig
- **Redo** (Strg+Y / Cmd+Y) -- Wenden Sie eine rückgängig gemachte Aktion erneut an

Sie können die Seite auch auf einen früheren Snapshot wiederherstellen. Klicken Sie in der Symbolleiste auf **History**, um eine Liste gespeicherter Snapshots mit Beschreibungen anzuzeigen, und klicken Sie auf einen Eintrag, um zu diesem Punkt wiederherzustellen.

:::warning
Das Wiederherstellen eines Snapshots ersetzt Ihren aktuellen Seiteninhalt durch die Snapshot-Version. Dies kann nicht mit der Standard-Rückgängig-Schaltfläche rückgängig gemacht werden. Speichern Sie einen Snapshot Ihres aktuellen Zustands, bevor Sie einen alten wiederherstellen, wenn Sie die Option behalten möchten, zurückzukehren.
:::

## Ihre Arbeit speichern

Änderungen werden automatisch gespeichert, während Sie arbeiten. Eine Statusanzeige in der Symbolleiste zeigt an, ob Ihre Änderungen gespeichert wurden. Sie können auch jederzeit auf **Save** klicken, um ein Speichern zu erzwingen.

## Verwandte Artikel

- [Managing Pages](managing-pages) -- Seiten erstellen, URLs festlegen und Website-Navigation verwalten
- [Appearance](appearance) -- Websiteweite Farben, Schriftarten und Branding festlegen
- [Files](files) -- Bilder und Dokumente hochladen, um sie im Editor zu verwenden
- [Creating Forms](../forms/creating-forms) -- Formulare erstellen, die Sie auf Seiten einbetten können
