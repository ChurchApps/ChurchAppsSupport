---
title: "Den Seiten-Editor verwenden"
---

# Den Seiten-Editor verwenden

<div class="article-intro">

Der B1-Seiten-Editor ist ein visueller Drag-and-Drop-Builder, mit dem Sie Website-Seiten Ihrer Kirche entwerfen können, ohne Code zu schreiben. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau anzeigen und Änderungen rückgängig machen -- alles von Ihrem Browser aus.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie [Initiale Einrichtung](initial-setup) durch, um Ihre Website zu konfigurieren
- Erstellen Sie mindestens eine Seite in [Seiten verwalten](managing-pages)
- Sie benötigen die **content.edit**-Berechtigung, um auf den Editor zuzugreifen

</div>

## Editor öffnen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Website** und klicken Sie auf **Pages**.
2. Finden Sie die Seite, die Sie bearbeiten möchten, in der Pages-Tabelle und klicken Sie auf **Edit**.

Der Editor wird im Vollbild-Modus geöffnet. Das linke Panel zeigt Ihre Seitenstruktur und verfügbare Inhalts-Elemente; der mittlere Bereich zeigt eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im Light-Mode angezeigt, unabhängig von Ihrer B1 Admin-Design-Einstellung. Dies stellt sicher, dass die Vorschau genau widerspiegelt, wie Ihre Seite für Website-Besucher aussieht.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Sections** -- Die Top-Level-Container, die Ihre Seite in horizontale Bänder unterteilen (zum Beispiel ein Hero-Abschnitt, ein Inhaltsblock oder ein Footer-Streifen). Jede Seite muss mindestens einen Abschnitt haben, bevor Sie Inhalte hinzufügen können.
- **Elements** -- Die einzelnen Inhalts-Teile, die in einem Abschnitt platziert sind, z. B. Text, Bilder, Buttons, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Add Section** (oder die **+**-Schaltfläche oben im linken Panel).
2. Wählen Sie, wie Sie beginnen:
   - **From a template** -- durchsuchen Sie die Abschnitts-Vorlagen-Galerie, organisiert nach Kategorie (Hero, About, Services, Giving, usw.), und klicken Sie auf eine, um sie als vollständig gestalteten, vorgefüllten Abschnitt einzufügen. Sie können alles danach anpassen.
   - **Blank section** -- wählen Sie ein Spalten-Layout (einzeln, zwei Spalten, drei Spalten, usw.) und bauen Sie von Grund auf.
3. Der neue Abschnitt wird in der Vorschau angezeigt. Klicken Sie darauf, um ihn auszuwählen, und konfigurieren Sie seine Hintergrundfarbe, Padding und andere Style-Optionen.

### Layout eines Abschnitts wechseln

Haben Sie einen Abschnitt bereits ausgebaut, möchten aber eine andere Struktur? Verwenden Sie den Layout-Wechsler auf diesem Abschnitt, um seine Spalten-Anordnung gegen eine andere aus der Galerie auszutauschen und behalten Sie dabei Ihren bestehenden Inhalt und Ihre Elemente bei.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Add Content** und wählen Sie einen Element-Typ aus der Liste:
   - **Text** -- Überschriften, Absätze und Rich Text
   - **Image** -- Laden Sie ein Foto hoch oder verlinken Sie auf eines
   - **Button** -- Ein anklickbarer Call-to-Action-Link
   - **Card** -- Ein Bild mit Titel und Beschreibung
   - **Form** -- Betten Sie ein [Formular](../forms/creating-forms) direkt auf der Seite ein
   - **Calendar** -- Zeigen Sie einen Ereignis-Kalender an
   - **FAQ** -- Accordion-artige Frage- und Antwort-Blöcke
   - **Video** -- Betten Sie ein Video über URL ein
   - **Groups Browser** -- Ein filterbares Verzeichnis aller Kirchengruppen mit optionaler Suche, Kategorie-Filter und Label-Filter
   - **Icon Feature** -- Ein Icon mit Titel und kurzer Beschreibung für Funktions- oder Dienst-Highlights
   - **Gallery** -- Ein Multi-Foto-Grid oder Masonry-Layout
   - **Testimonial** -- Ein oder mehrere Zitate mit Autorname, Rolle und Foto
   - **Social Icons** -- Verlinkte Icons für die Social-Media-Profile Ihrer Kirche
   - **Countdown** -- Ein Timer, der bis zu einem Datum oder einer wöchentlichen Servicezeit herunterzählt
   - **Stats** -- Eine Reihe von großen Zahlen mit Etiketten (Mitglieder, Jahre, Campusse)
   - **Campaign Progress** -- Ein Live-Fortschrittsbalken für eine Spendenkampagne, der die Gesamtsumme im Vergleich zu einem Fonds-Ziel anzeigt
   - **Staff Grid** -- Fotos-Karten für die Mitglieder einer Gruppe; die Gruppe muss ihre **public roster**-Option aktiviert haben
   - **Service Times** -- Ihr Campus-Service-Zeitplan, automatisch aus der Anwesenheits-Einrichtung abgerufen
   - **Sermons** -- Ihre Predigt-Bibliothek als vollständiger Browser oder Grid-, Listenoder Featured-Latest-Layout
   - **Map** -- Eine eingebettete Karte zentriert auf die Adresse Ihrer Kirche
   - **Table** -- Ein einfaches Grid aus Zeilen und Spalten für tabellarische Inhalte
   - **Text with Photo** -- Text und ein Bild nebeneinander
   - **Logo** -- Ihr Kirchenlogo, abgerufen von [Appearance](appearance)
   - **Live Stream** -- Ihr Live-Stream-Player, direkt auf der Seite eingebettet
   - **Podcast** -- Eine Liste von Episoden, abgerufen von einer externen Podcast-RSS-Feed-URL, die Sie bereitstellen, mit Einstellungen für die Anzahl der angezeigten Episoden und ob Daten und Beschreibungen angezeigt werden. Dies ist zum Präsentieren eines beliebigen Podcast-Feeds auf Ihrer Website; zum Veröffentlichen Ihrer eigenen Predigten als Podcast, siehe [Managing Sermons](../sermons/managing-sermons.md#your-podcast-feed) stattdessen.
   - **Donation** -- Ein Spenden-Button oder eingebettetes Spenden-Formular
   - **Raw HTML** -- Benutzerdefiniertes HTML-Markup für fortgeschrittene Anwendungsfälle
   - **iFrame** -- Betten Sie externen Inhalt über URL ein
3. Konfigurieren Sie das Element mit dem angezeigten Settings-Panel.

### Inhalte neu ordnen

Ziehen Sie Abschnitte oder Elemente mit dem Handle-Icon (sechs Punkte) auf der linken Seite jedes Elements, um sie neu zu ordnen. Sie können Elemente innerhalb eines Abschnitts ziehen oder zwischen Abschnitten verschieben.

## Ihre Seite gestalten

### Abschnitts-Styles

Klicken Sie auf einen beliebigen Abschnitt, um sein Style-Panel zu öffnen. Sie können Folgendes einstellen:

- **Background** -- Einfarbig, Gradient oder Bild. Wenn Sie einen Bild-Hintergrund verwenden, können Sie mit einem **Focal Point**-Picker klicken, um einzustellen, welcher Teil des Bildes zentriert bleibt, während der Abschnitt skaliert wird, und eine **Overlay**-Farboption ermöglicht es, einen semi-transparenten Farbton über das Bild zu legen, um die Text-Lesbarkeit zu verbessern.
- **Padding** -- Oben und unten Abstände innerhalb des Abschnitts
- **Width** -- Volle Breite oder zentriert/enthalten
- **Dividers** -- Dekorative Form-Trennzeichen (Welle, Neigung, Kurve, Dreieck und mehr) an der oberen oder unteren Kante des Abschnitts, mit Farb-, Höhen- und Flip-Optionen

### Element-Styles

Klicken Sie auf ein Element, um sein Style-Panel zu öffnen. Häufige Optionen include Schriftgröße, Farbe, Ausrichtung, Rand und Padding. Für Bilder können Sie Alt-Text und Link-Ziele einstellen.

### Custom CSS

Für erweiterte Styling-Anforderungen hat jeder Abschnitt und jedes Element ein **Custom CSS**-Feld, in dem Sie Ihre eigenen CSS-Regeln schreiben können. Diese sind auf dieses Element beschränkt, daher beeinflussen sie nicht unbeabsichtigt den Rest der Seite.

:::tip
Wenn Sie Stile auf Ihrer gesamten Website anwenden müssen -- z. B. eine benutzerdefinierte Schriftart oder globale Farbe -- verwenden Sie stattdessen die [Appearance](appearance)-Einstellungen anstelle von Custom CSS auf einzelnen Seiten.
:::

## Seite in der Vorschau anzeigen

Verwenden Sie die Vorschau-Steuerelemente in der Werkzeugleiste, um zu überprüfen, wie Ihre Seite auf verschiedenen Bildschirmgrößen aussieht:

- **Desktop** -- Vollbreiten-Browser-Ansicht
- **Mobile** -- Schmale Telefon-Ansicht

Klicken Sie auf **Preview**, um eine Live-Version der Seite in einem neuen Browser-Tab zu öffnen, genau wie Besucher sie sehen werden.

## Barrierefreiheit überprüfen

Klicken Sie auf das **Accessibility**-Symbol in der Werkzeugleiste, um eine schnelle Überprüfung auf häufige Probleme durchzuführen -- Bilder ohne Alt-Text, niedriger Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das Element, das Aufmerksamkeit benötigt, damit Sie es vor Ort beheben können.

## Änderungen rückgängig machen

Der Editor verfolgt Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Werkzeugleisten-Schaltflächen oder Tastaturkürzel, um zu navigieren:

- **Undo** (Strg+Z / Cmd+Z) -- Machen Sie Ihre letzte Aktion rückgängig
- **Redo** (Strg+Y / Cmd+Y) -- Wenden Sie eine rückgängig gemachte Aktion erneut an

Sie können auch die Seite zu einem früheren Snapshot wiederherstellen. Klicken Sie auf **History** in der Werkzeugleiste, um eine Liste der gespeicherten Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Punkt wiederherzustellen.

:::warning
Das Wiederherstellen eines Snapshots ersetzt Ihren aktuellen Seiten-Inhalt durch die Snapshot-Version. Dies kann nicht mit der Standard-Rückgängig-Schaltfläche rückgängig gemacht werden. Speichern Sie einen Snapshot Ihres aktuellen Zustands, bevor Sie einen alten wiederherstellen, wenn Sie die Option haben möchten, zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden automatisch gespeichert, während Sie arbeiten. Ein Status-Indikator in der Werkzeugleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Draft und Published State

Seiten können einen **Published**-Status haben, der steuert, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt einen Status-Chip mit dem aktuellen Status:

- **Live on Save** -- Die Seite verwendet keinen Veröffentlichungs-Workflow. Jede gespeicherte Änderung wird sofort live. Dies ist die Voreinstellung für neue Seiten.
- **Unpublished Changes** -- Die Seite wurde zuvor veröffentlicht, aber Sie haben Änderungen seit der letzten Veröffentlichung vorgenommen. Besucher sehen weiterhin die zuvor veröffentlichte Version.
- **Published** -- Die Seite ist live und Ihr gespeicherter Inhalt stimmt mit dem überein, das Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie auf die **Publish**-Schaltfläche in der Werkzeugleiste. Die Seite wird sofort live.

Um zur letzten veröffentlichten Version zurückzukehren, ohne zu beeinflussen, was Besucher sehen, öffnen Sie das Overflow-Menü (⋮) und klicken Sie auf **Discard Changes**.

Um eine Seite ganz offline zu nehmen, öffnen Sie das Overflow-Menü und klicken Sie auf **Unpublish**. Besucher werden diese Seite nicht mehr sehen, bis Sie sie erneut veröffentlichen.

:::tip
Verwenden Sie den Draft/Publish-Workflow, wenn Sie eine Seite vorbereiten möchten -- zum Beispiel für ein bevorstehendes Ereignis -- und machen Sie sie nur live, wenn der richtige Moment kommt. Erstellen und zeigen Sie eine Vorschau der Seite an, und klicken Sie dann auf Publish, wenn Sie bereit sind.
:::

## Verwandte Artikel

- [Managing Pages](managing-pages) -- Erstellen Sie Seiten, legen Sie URLs fest und verwalten Sie die Website-Navigation
- [Appearance](appearance) -- Legen Sie Website-weite Farben, Schriftarten und Branding fest
- [Files](files) -- Laden Sie Bilder und Dokumente hoch, um sie im Editor zu verwenden
- [Creating Forms](../forms/creating-forms) -- Erstellen Sie Formulare, die Sie auf Seiten einbetten können
