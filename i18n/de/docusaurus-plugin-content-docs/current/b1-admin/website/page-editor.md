---
title: "Den Seiteneditor verwenden"
---

# Den Seiteneditor verwenden

<div class="article-intro">

Der B1-Seiteneditor ist ein visueller Drag-and-Drop-Baukasten, mit dem Sie die Seiten Ihrer Kirchenwebsite gestalten können, ohne Code zu schreiben. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau betrachten und Änderungen rückgängig machen -- alles direkt in Ihrem Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](initial-setup) ab, um Ihre Website zu konfigurieren
- Erstellen Sie mindestens eine Seite unter [Seiten verwalten](managing-pages)
- Sie benötigen die Berechtigung **Inhalte bearbeiten** (content.edit), um auf den Editor zuzugreifen

</div>

## Den Editor öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie in der Seitentabelle die Seite, die Sie bearbeiten möchten, und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus. Das linke Bedienfeld zeigt die Struktur Ihrer Seite und die verfügbaren Inhaltselemente; im mittleren Bereich sehen Sie eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von der Designeinstellung Ihres B1 Admin, und verwendet die Überschriften- und Textschriften, die Sie unter [Erscheinungsbild](appearance) gewählt haben. So stimmt die Vorschau genau mit der Darstellung für Besucher Ihrer Website überein.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** -- Die obersten Container, die Ihre Seite in horizontale Bereiche unterteilen (zum Beispiel ein Hero-Abschnitt, ein Inhaltsblock oder ein Fußzeilenstreifen). Jede Seite muss mindestens einen Abschnitt haben, bevor Sie Inhalte hinzufügen können.
- **Elemente** -- Die einzelnen Inhaltsteile innerhalb eines Abschnitts, etwa Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder auf die Schaltfläche **+** oben im linken Bedienfeld).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** -- Durchsuchen Sie die Galerie der Abschnittsvorlagen, nach Kategorien geordnet (Hero, Über uns, Gottesdienste, Spenden usw.), und klicken Sie auf eine, um sie als vollständig gestalteten, vorausgefüllten Abschnitt einzufügen. Nach dem Einfügen können Sie alles anpassen.
   - **Leerer Abschnitt** -- Wählen Sie ein Spaltenlayout (einspaltig, zweispaltig, dreispaltig usw.) und bauen Sie den Abschnitt von Grund auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und Hintergrundfarbe, Innenabstand und weitere Stileinstellungen zu konfigurieren.

### Das Layout eines Abschnitts wechseln

Sie haben einen Abschnitt bereits gestaltet, möchten aber eine andere Struktur? Verwenden Sie den Layout-Umschalter dieses Abschnitts, um seine Spaltenanordnung gegen eine andere aus der Galerie auszutauschen, während Ihre vorhandenen Inhalte und Elemente erhalten bleiben.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** -- Überschriften, Absätze und formatierter Text
   - **Bild** -- Ein Foto hochladen oder darauf verlinken
   - **Schaltfläche** -- Ein klickbarer Aufruf zum Handeln (Call-to-Action-Link)
   - **Karte** -- Ein Bild mit Titel und Beschreibung
   - **Formular** -- Ein [Formular](../forms/creating-forms) direkt auf der Seite einbetten
   - **Kalender** -- Einen Veranstaltungskalender anzeigen
   - **FAQ** -- Frage-und-Antwort-Blöcke im Akkordeon-Stil
   - **Video** -- Ein Video über seine URL einbetten
   - **Gruppenverzeichnis** -- Ein filterbares Verzeichnis aller Gruppen der Kirche mit optionaler Suche, Kategorie- und Bezeichnungsfilter
   - **Symbol-Merkmal** -- Ein Symbol mit Titel und kurzer Beschreibung, für Hervorhebungen von Angeboten oder Diensten
   - **Galerie** -- Ein Raster oder Masonry-Layout mit mehreren Fotos
   - **Referenz** -- Ein oder mehrere Zitate mit Name, Rolle und Foto des Autors
   - **Social-Media-Symbole** -- Verlinkte Symbole für die Social-Media-Profile Ihrer Kirche
   - **Countdown** -- Ein Timer, der auf ein Datum oder eine wöchentliche Gottesdienstzeit herunterzählt
   - **Statistiken** -- Eine Reihe großer Zahlen mit Beschriftungen (Mitglieder, Jahre, Standorte)
   - **Kampagnenfortschritt** -- Ein Live-Fortschrittsbalken für eine Spendenkampagne, der den insgesamt für ein Fondsziel gesammelten Betrag anzeigt
   - **Mitarbeiterraster** -- Fotokarten für die Mitglieder einer Gruppe; die Gruppe muss die Option **öffentliche Liste** aktiviert haben
   - **Gottesdienstzeiten** -- Der Gottesdienstplan Ihrer Standorte, automatisch aus der Anwesenheitseinrichtung übernommen
   - **Predigten** -- Ihre Predigtbibliothek, als vollständige Ansicht oder in einem Raster-, Listen- oder Hervorhebungs-Layout für die neueste Predigt
   - **Karte** -- Eine eingebettete Karte, zentriert auf die Adresse Ihrer Kirche
   - **Tabelle** -- Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** -- Text und ein Bild nebeneinander
   - **Logo** -- Das Logo Ihrer Kirche, übernommen aus [Erscheinungsbild](appearance)
   - **Live-Stream** -- Ihr Live-Stream-Player, direkt auf der Seite eingebettet
   - **Podcast** -- Eine Liste von Episoden, die aus einer externen Podcast-RSS-Feed-URL abgerufen wird, die Sie angeben, mit Einstellungen, wie viele Episoden angezeigt werden und ob Datum und Beschreibungen erscheinen. Dies dient dazu, einen beliebigen Podcast-Feed auf Ihrer Website hervorzuheben; um Ihre eigenen Predigten als Podcast zu veröffentlichen, lesen Sie stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed)
   - **Spende** -- Eine Spendenschaltfläche oder ein eingebettetes Spendenformular
   - **HTML** -- Ihr eigenes HTML-Markup für fortgeschrittene Anwendungsfälle, etwa das Einbetten eines Widgets eines Drittanbieters (siehe [Das HTML-Element verwenden](#using-the-html-element))
   - **iFrame** -- Externe Inhalte über eine URL einbetten
3. Konfigurieren Sie das Element über das Einstellungsfeld, das erscheint.

### Das HTML-Element verwenden {#using-the-html-element}

Das Element **HTML** hat zwei Felder:

- **HTML-Inhalt** -- Das Markup, das auf der Seite angezeigt wird. Alle `<script>`-Tags, die Sie hier einfügen, werden auf Ihrer Live-Website ausgeführt.
- **JavaScript (ohne script-Tag)** -- Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch den Einbettungscode eines Anbieters einfügen, einschließlich der `<script>`-Tags, und er wird auf der Live-Website ausgeführt.

Wenn Sie in das JavaScript-Feld nur eine Webadresse (etwa einen Bildlink) einfügen, wird das Feld rot und zeigt die Warnung *„Dies ist eine Webadresse, kein JavaScript.“* an. Eine reine Adresse in diesem Feld bewirkt nichts. Um ein Bild anzuzeigen, verwenden Sie ein **Bild**-Element oder fügen `<img src="...">` in den **HTML-Inhalt** ein.

### Das Kalender-Element verwenden {#using-the-calendar-element}

Das Element **Kalender** zeigt Veranstaltungen aus einem Ihrer Kalender an:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (die Veranstaltungen einer Gruppe -- die Liste zeigt Gruppen, denen Sie angehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** erstellt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender aus.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** -- Ein Monatsraster, durch das Besucher blättern können.
   - **Kommende Veranstaltungen** -- Ein Raster aus Kacheln für die nächsten 12 Veranstaltungen; eine wiederkehrende Veranstaltung wird mit ihrem nächsten Termin einmal angezeigt. Jede Kachel zeigt das Foto der Veranstaltung (oder ihren Titel auf der dunklen Farbe Ihres Designs, wenn kein Foto vorhanden ist), ein Datumsabzeichen, den Tag und die Uhrzeit sowie die erste Zeile der Beschreibung. Eine Schaltfläche **Abonnieren** über den Kacheln ermöglicht es Besuchern, den ICS-Link des Kalenders zu kopieren oder ihn herunterzuladen.
4. Um nur bestimmte Veranstaltungen anzuzeigen, geben Sie unter **Nur Veranstaltungen mit dem Tag** einen Tag ein -- zum Beispiel `youth`. Es erscheinen nur Veranstaltungen, deren **Tags** dieses Wort enthalten. Lassen Sie das Feld leer, um alle Veranstaltungen anzuzeigen. Tags werden für jede Veranstaltung festgelegt; siehe [Veranstaltungen hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

In beiden Anzeigeformen öffnet ein Klick auf eine Veranstaltung deren eigene Seite auf Ihrer Website. Die Veranstaltungsseite zeigt das Veranstaltungsfoto, den Titel, Datum und Uhrzeit sowie die Beschreibung, außerdem einen Kasten mit **Wann** (einschließlich des Wiederholungsmusters bei einer wiederkehrenden Veranstaltung) und **Wo** (die für sie gebuchten Räume). Ist die Anmeldung aktiviert, gibt es zusätzlich eine Schaltfläche **Für diese Veranstaltung anmelden**, und ein Link **Zu meinem Kalender hinzufügen** lädt die Veranstaltung als Kalenderdatei herunter. Die Seite ist so eingerichtet, dass Suchmaschinen Datum und Details der Veranstaltung in ihren Ergebnissen anzeigen können.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente am Griffsymbol (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts verschieben oder zwischen Abschnitten bewegen.

## Ihre Seite gestalten

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilfeld zu öffnen. Sie können festlegen:

- **Hintergrund** -- Einfarbig, Verlauf oder Bild. Bei einem Bildhintergrund können Sie mit der Auswahl des **Fokuspunkts** anklicken, welcher Teil des Bildes beim Skalieren des Abschnitts zentriert bleibt, und mit der Option **Überlagerung** eine halbtransparente Tönung über das Bild legen, um die Lesbarkeit des Textes zu verbessern.
- **Innenabstand** -- Oberer und unterer Abstand innerhalb des Abschnitts
- **Breite** -- Volle Breite oder zentriert/begrenzt
- **Trennelemente** -- Dekorative Formtrenner (Welle, Schräge, Bogen, Dreieck und weitere) am oberen oder unteren Rand des Abschnitts, mit Farbe, Höhe und Spiegelungsoptionen

### Elementstile

Klicken Sie auf ein beliebiges Element, um dessen Stilfeld zu öffnen. Übliche Optionen sind Schriftgröße, Farbe, Ausrichtung, Außenabstand und Innenabstand. Bei Bildern können Sie den Alternativtext und die Linkziele festlegen.

### Benutzerdefiniertes CSS

Für fortgeschrittene Gestaltung besitzt jeder Abschnitt und jedes Element ein Feld **Benutzerdefiniertes CSS**, in dem Sie eigene CSS-Regeln schreiben können. Diese gelten nur für das jeweilige Element und beeinflussen daher nicht unbeabsichtigt den Rest der Seite.

:::tip
Wenn Sie Stile für Ihre gesamte Website anwenden möchten -- etwa eine benutzerdefinierte Schrift oder eine globale Farbe -- verwenden Sie die Einstellungen unter [Erscheinungsbild](appearance) statt benutzerdefiniertem CSS auf einzelnen Seiten.
:::

## Ihre Seite in der Vorschau betrachten

Verwenden Sie die Vorschau-Steuerelemente in der Werkzeugleiste, um zu prüfen, wie Ihre Seite bei verschiedenen Bildschirmgrößen aussieht:

- **Desktop** -- Ansicht in voller Browserbreite
- **Mobil** -- Ansicht in schmaler Smartphone-Größe

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, gehen Sie zurück zur Seitenliste und klicken Sie auf den Pfad der Seite. Er öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen

Klicken Sie in der Werkzeugleiste auf das Symbol **Barrierefreiheit**, um eine schnelle Prüfung auf häufige Probleme durchzuführen -- Bilder ohne Alternativtext, geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das betroffene Element, sodass Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen

Der Editor speichert Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Schaltflächen der Werkzeugleiste oder die Tastenkombinationen zur Navigation:

- **Rückgängig** (Strg+Z / Cmd+Z) -- Letzte Aktion zurücknehmen
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) -- Eine zurückgenommene Aktion erneut ausführen

Sie können die Seite auch auf einen früheren Snapshot zurücksetzen. Klicken Sie in der Werkzeugleiste auf **Verlauf anzeigen**, um eine Liste gespeicherter Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Stand zurückzukehren.

:::warning
Das Wiederherstellen eines Snapshots ersetzt Ihren aktuellen Seiteninhalt durch die Snapshot-Version. Dies kann nicht mit der Standard-Schaltfläche Rückgängig rückgängig gemacht werden. Speichern Sie einen Snapshot Ihres aktuellen Stands, bevor Sie einen alten wiederherstellen, wenn Sie die Möglichkeit behalten möchten, dorthin zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden während der Arbeit automatisch gespeichert. Eine Statusanzeige in der Werkzeugleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und Veröffentlichungsstatus

Seiten können einen Status **veröffentlicht** haben, der bestimmt, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt ein Statuskennzeichen mit dem aktuellen Zustand an:

- **Sofort live beim Speichern** -- Die Seite verwendet keinen Veröffentlichungsablauf. Jede gespeicherte Änderung geht sofort live. Dies ist die Standardeinstellung für neue Seiten.
- **Nicht veröffentlichte Änderungen** -- Die Seite wurde bereits zuvor veröffentlicht, aber Sie haben seit der letzten Veröffentlichung Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Version.
- **Veröffentlicht** -- Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Werkzeugleiste auf die Schaltfläche **Veröffentlichen**. Die Seite wird sofort live.

Um zur zuletzt veröffentlichten Version zurückzukehren, ohne das zu beeinflussen, was Besucher sehen, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Nicht veröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsablauf nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung deaktivieren**. Bearbeitungen gehen dann wieder sofort live.

:::tip
Nutzen Sie den Entwurfs- und Veröffentlichungsablauf, wenn Sie eine Seite vorbereiten möchten -- zum Beispiel für eine bevorstehende Veranstaltung -- und sie erst zum richtigen Zeitpunkt live schalten möchten. Erstellen und prüfen Sie die Seite in der Vorschau und klicken Sie dann auf Veröffentlichen, sobald Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](managing-pages) -- Seiten erstellen, URLs festlegen und die Website-Navigation verwalten
- [Erscheinungsbild](appearance) -- Website-weite Farben, Schriften und Branding festlegen
- [Dateien](files) -- Bilder und Dokumente hochladen, die im Editor verwendet werden sollen
- [Formulare erstellen](../forms/creating-forms) -- Formulare erstellen, die Sie auf Seiten einbetten können
