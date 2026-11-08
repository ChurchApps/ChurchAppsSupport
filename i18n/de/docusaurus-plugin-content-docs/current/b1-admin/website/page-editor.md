---
title: "Verwenden des Seiteneditors"
description: "Richten Sie einen Seiteneditor in B1 Admin ein, indem Sie Abschnitte und Elemente hinzufügen, sie gestalten, auf dem Smartphone in der Vorschau anzeigen und Entwürfe veröffentlichen. Behandelt auch Rückgängig und Versionsverlauf."
---

# Verwenden des Seiteneditors

<div class="article-intro">

Der B1-Seiteneditor ist ein visueller Baukasten mit Drag-and-Drop, mit dem Sie die Seiten Ihrer Gemeinde-Website ohne Programmierung gestalten können. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau prüfen und Änderungen rückgängig machen – alles direkt in Ihrem Browser.

</div>

## Schulungsvideo

<YouTube id="m2B_JxmfFm4" title="Seiten und Navigation in B1 bearbeiten" next="Eine eigene Domain in B1 verbinden" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](./initial-setup.md) ab, damit Ihre Website konfiguriert ist
- Legen Sie mindestens eine Seite unter [Seiten verwalten](./managing-pages.md) an
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zuzugreifen

</div>

## Öffnen des Editors

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie die gewünschte Seite in der Seitentabelle und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus. Im linken Bereich sehen Sie die Struktur Ihrer Seite und die verfügbaren Inhaltselemente; im mittleren Bereich wird eine Live-Vorschau Ihrer Seite angezeigt.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von der Designeinstellung in B1 Admin, und verwendet die Überschriften- und Textschriftarten, die Sie unter [Erscheinungsbild](./appearance.md) gewählt haben. So stimmt die Vorschau genau mit dem Erscheinungsbild überein, das Website-Besucher sehen werden.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** – Die obersten Container, die Ihre Seite in horizontale Bänder unterteilen (zum Beispiel ein Hero-Abschnitt, ein Inhaltsblock oder eine Fußzeilenleiste). Jede Seite braucht mindestens einen Abschnitt, bevor Sie Inhalte hinzufügen können.
- **Elemente** – Die einzelnen Inhaltsstücke innerhalb eines Abschnitts, etwa Texte, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Hinzufügen eines Abschnitts

1. Klicken Sie auf **Abschnitt hinzufügen** (oder auf die Schaltfläche **+** oben im linken Bereich).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** – Durchsuchen Sie die nach Kategorien (Hero, Über uns, Angebote, Spenden usw.) geordnete Galerie der Abschnittsvorlagen und klicken Sie auf eine, um sie als vollständig gestalteten, vorausgefüllten Abschnitt einzufügen. Nach dem Einfügen können Sie alles anpassen.
   - **Leerer Abschnitt** – Wählen Sie ein Spaltenlayout (einspaltig, zweispaltig, dreispaltig usw.) und bauen Sie den Abschnitt von Grund auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und Hintergrundfarbe, Innenabstand und weitere Stileinstellungen zu konfigurieren.

### Ändern des Layouts eines Abschnitts

Sie haben einen Abschnitt bereits aufgebaut, möchten aber eine andere Struktur? Verwenden Sie den Layout-Umschalter dieses Abschnitts, um seine Spaltenanordnung gegen eine andere aus der Galerie zu tauschen, während Ihre vorhandenen Inhalte und Elemente erhalten bleiben.

### Hinzufügen von Elementen zu einem Abschnitt

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** – Überschriften, Absätze und Rich-Text
   - **Bild** – Ein Foto hochladen oder darauf verlinken
   - **Schaltfläche** – Ein anklickbarer Aufruf zur Handlung (Call-to-Action-Link)
   - **Karte** – Ein Bild mit Titel und Beschreibung
   - **Formular** – Ein [Formular](../forms/creating-forms.md) direkt auf der Seite einbetten. Wenn das Formular ein [Kopfbild](../forms/creating-forms.md#adding-a-header-photo) hat, wird es oberhalb der Fragen angezeigt
   - **Kalender** – Einen Veranstaltungskalender anzeigen
   - **FAQ** – Frage-und-Antwort-Blöcke im Akkordeon-Stil
   - **Video** – Ein Video über eine URL einbetten
   - **Gruppenübersicht** – Ein filterbares Verzeichnis aller Gemeindegruppen mit optionaler Suche, Kategorie- und Schlagwortfilter. Das **Layout** kann **Raster** (Standard) oder **Laufend (automatisch)** sein – siehe [Laufende Layouts](#scrolling-layouts)
   - **Gruppenliste** – Kacheln für Ihre öffentlichen Gruppen, optional nur für Gruppen mit einem bestimmten Schlagwort. Das **Layout** kann **Raster** (Standard; bis zu drei Kacheln pro Zeile) oder **Laufend (automatisch)** sein – siehe [Laufende Layouts](#scrolling-layouts)
   - **Icon-Merkmal** – Ein Symbol mit Titel und kurzer Beschreibung, etwa für Highlights zu Angeboten oder Diensten
   - **Galerie** – Ein Raster oder Masonry-Layout mit mehreren Fotos
   - **Referenz** – Ein oder mehrere Zitate mit Name, Rolle und Foto der Person
   - **Social-Media-Symbole** – Verlinkte Symbole für die Social-Media-Profile Ihrer Gemeinde: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo und Podcast. Tragen Sie für jedes Symbol, das Sie anzeigen möchten, einen Link ein; für **WhatsApp** verwenden Sie einen `https://wa.me/`-Link mit Ihrer Nummer oder einen Gruppen-Einladungslink
   - **Countdown** – Ein Timer, der auf ein Datum oder einen wöchentlichen Gottesdienstbeginn zählt
   - **Kennzahlen** – Eine Reihe großer Zahlen mit Beschriftungen (Mitglieder, Jahre, Standorte)
   - **Spendenfortschritt** – Ein Live-Fortschrittsbalken für eine Spendenkampagne, der den bisher für ein Fondsziel gesammelten Betrag anzeigt
   - **Mitarbeiterraster** – Fotokarten für die Mitglieder einer Gruppe; die Gruppe muss die Option **öffentliche Liste** aktiviert haben
   - **Gottesdienstzeiten** – Der Gottesdienstplan Ihrer Standorte, der automatisch aus der Anwesenheitseinrichtung übernommen wird
   - **Predigten** – Ihre Predigtbibliothek, als vollständige Ansicht oder im Raster-, Listen- oder Hervorgehoben-Neueste-Layout
   - **Karte** – Eine eingebettete Karte, zentriert auf die Adresse Ihrer Gemeinde
   - **Tabelle** – Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** – Text und ein Bild nebeneinander
   - **Logo** – Das Logo Ihrer Gemeinde, übernommen aus [Erscheinungsbild](./appearance.md)
   - **Livestream** – Ihr Livestream-Player, direkt auf der Seite eingebettet
   - **Podcast** – Eine Liste von Episoden, die aus einer externen Podcast-RSS-Feed-URL stammt, die Sie angeben, mit Einstellungen, wie viele Episoden angezeigt werden und ob Datum und Beschreibungen erscheinen. Jede Episode auf der Live-Website hat einen Audioplayer und einen Link **Herunterladen**, der die Audiodatei der Episode unter dem Episodentitel speichert. Dies dient dazu, einen beliebigen Podcast-Feed auf Ihrer Website hervorzuheben; um Ihre eigenen Predigten als Podcast zu veröffentlichen, siehe stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed)
   - **Spende** – Eine Schaltfläche zum Spenden oder ein eingebettetes Spendenformular
   - **HTML** – Ihr eigenes HTML-Markup für fortgeschrittene Anwendungsfälle, etwa das Einbetten eines Drittanbieter-Widgets (siehe [Verwenden des HTML-Elements](#using-the-html-element))
   - **iFrame** – Externe Inhalte über eine URL einbetten
3. Konfigurieren Sie das Element über das Einstellungsfeld, das erscheint.

### Verwenden des HTML-Elements

Das **HTML**-Element hat zwei Felder:

- **HTML-Inhalt** – Das Markup, das auf der Seite angezeigt werden soll. Alle `<script>`-Tags, die Sie hier einfügen, werden auf Ihrer Live-Website ausgeführt.
- **JavaScript (ohne Script-Tag)** – Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch den Einbettungscode eines Anbieters mit seinen `<script>`-Tags einfügen; er wird dann auf der Live-Website ausgeführt.

Wenn Sie in das JavaScript-Feld nur eine Webadresse (etwa einen Bildlink) einfügen, wird das Feld rot und zeigt die Warnung *„Dies ist eine Webadresse, kein JavaScript.“* an. Eine bloße Adresse in diesem Feld bewirkt nichts. Um ein Bild anzuzeigen, verwenden Sie ein **Bild**-Element oder fügen Sie `<img src="...">` in **HTML-Inhalt** ein.

### Verwenden des Kalender-Elements {#using-the-calendar-element}

Das **Kalender**-Element zeigt Veranstaltungen aus einem Ihrer Kalender an:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (Veranstaltungen einer Gruppe – die Liste zeigt Gruppen, denen Sie angehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** erstellt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar.md)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender aus.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** – Ein Monatsraster, durch das Besucher blättern können. Jede Veranstaltung ist in der Farbe der Gruppe eingefärbt, zu der sie gehört, sodass die Veranstaltungen einer Gruppe in jedem Kalender dieselbe Farbe haben. B1 wählt die Farben automatisch; Sie müssen nichts einrichten.
   - **Kommende Veranstaltungen** – Ein Raster aus Kacheln für die nächsten 12 anstehenden Veranstaltungen; eine wiederkehrende Veranstaltung wird mit ihrem nächsten Termin angezeigt. Jede Kachel zeigt das Foto der Veranstaltung (oder ihren Titel auf der dunklen Designfarbe Ihres Themes, falls kein Foto vorhanden ist), eine Datumsmarke, Tag und Uhrzeit sowie die erste Zeile der Beschreibung. Über den Kacheln befindet sich eine Schaltfläche **Abonnieren**, mit der Besucher den ICS-Link des Kalenders kopieren oder ihn herunterladen können. Für diese Anzeige erscheint eine Einstellung **Layout**: **Raster** (Standard) oder **Laufend (automatisch)**, bei der die Kacheln in einer einzelnen Zeile liegen, die sich von selbst weiterbewegt (siehe [Laufende Layouts](#scrolling-layouts)). Bei einem **Kuratierten Kalender** aktivieren Sie die Einstellung **Gruppenabzeichen**, um den Namen der Gruppe jeder Veranstaltung in der oberen rechten Ecke ihrer Kachel anzuzeigen, in der Kalenderfarbe dieser Gruppe. Veranstaltungen aus archivierten oder vertraulichen Gruppen erhalten kein Abzeichen.
4. Um nur bestimmte Veranstaltungen anzuzeigen, geben Sie unter **Nur Veranstaltungen mit Schlagwort** ein Schlagwort ein – zum Beispiel `Jugend`. Es erscheinen nur Veranstaltungen, deren **Schlagworte** dieses Wort enthalten. Lassen Sie das Feld leer, um alle Veranstaltungen anzuzeigen. Schlagworte werden bei jeder Veranstaltung festgelegt; siehe [Veranstaltungen hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

Bei beiden Anzeigen öffnet ein Klick auf eine Veranstaltung deren eigene Seite auf Ihrer Website. Die Veranstaltungsseite zeigt das Veranstaltungsfoto, den Titel, Datum und Uhrzeit sowie die Beschreibung, außerdem ein Feld mit **Wann** (einschließlich des Wiederholungsmusters bei einer wiederkehrenden Veranstaltung) und **Wo** (die für sie gebuchten Räume). Ist die Anmeldung aktiviert, gibt es zudem eine Schaltfläche **Für diese Veranstaltung anmelden**, und ein Link **Zu meinem Kalender hinzufügen** lädt die Veranstaltung als Kalenderdatei herunter. Die Seite ist so aufgebaut, dass Suchmaschinen Datum und Details der Veranstaltung in ihren Ergebnissen anzeigen können. Veranstaltungsseiten aus kuratierten Kalendern, die auf Ihren Seiten angezeigt werden (für Veranstaltungen in den nächsten sechs Monaten), werden außerdem in der Sitemap Ihrer Website aufgeführt, damit Suchmaschinen sie finden können.

### Laufende Layouts {#scrolling-layouts}

Das Layout **Laufend (automatisch)** bei der **Gruppenübersicht**, der **Gruppenliste** und der Anzeige **Kommende Veranstaltungen** des Kalender-Elements ordnet die Kacheln in einer Zeile statt in einem Raster an. Auf dem Smartphone füllt jede Kachel die Zeile aus; auf dem Computer passen zwei Kacheln nebeneinander. Wenn mehr Kacheln vorhanden sind, als hineinpassen, gilt Folgendes für die Zeile:

- Sie rückt etwa alle vier Sekunden um eine Kachel weiter und beginnt nach der letzten Kachel wieder bei der ersten.
- Sie hält an, während ein Besucher mit der Maus darüberfährt, sie berührt oder per Tabulatortaste darin navigiert, und läuft wenige Sekunden später wieder weiter.
- Darunter wird eine Reihe von Punkten angezeigt, einer pro Kachel; der Punkt der aktuellen Kachel ist ausgefüllt. Besucher können auf einen Punkt klicken, um direkt zu dieser Kachel zu springen.

Auf Geräten, die reduzierte Bewegung eingestellt haben, bleibt die Zeile stehen, und Besucher wischen oder scrollen selbst. Passen alle Kacheln hinein, bewegt sich die Zeile nicht und es erscheinen keine Punkte.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente am Griffsymbol (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts verschieben oder zwischen Abschnitten verschieben.

## Gestalten Ihrer Seite

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilfeld zu öffnen. Sie können festlegen:

- **Hintergrund** – Einfarbig, Verlauf oder Bild. Bei einem Bildhintergrund können Sie mit dem Werkzeug **Fokuspunkt** durch Klicken festlegen, welcher Bildteil beim Skalieren des Abschnitts zentriert bleibt. Mit der Option **Überlagerung** können Sie einen halbtransparenten Farbton über das Bild legen, um die Lesbarkeit des Textes zu verbessern.
- **Innenabstand** – Abstand oben und unten innerhalb des Abschnitts
- **Breite** – Volle Breite oder zentriert/begrenzt
- **Trennlinien** – Dekorative Formtrenner (Welle, Schräge, Bogen, Dreieck und mehr) an der oberen oder unteren Kante des Abschnitts, mit Farbe, Höhe und Spiegelungsoptionen

### Elementstile

Klicken Sie auf ein beliebiges Element, um dessen Stilfeld zu öffnen. Häufige Optionen sind Schriftgröße, Farbe, Ausrichtung, Außenabstand und Innenabstand. Bei Bildern können Sie Alternativtext und Linkziele festlegen.

### Benutzerdefiniertes CSS

Für fortgeschrittene Gestaltung besitzt jeder Abschnitt und jedes Element ein Feld **Benutzerdefiniertes CSS**, in das Sie eigene CSS-Regeln schreiben können. Diese gelten nur für das jeweilige Element und beeinflussen daher nicht ungewollt den Rest der Seite.

:::tip
Wenn Sie Stile auf Ihre gesamte Website anwenden möchten – etwa eine eigene Schriftart oder eine globale Farbe –, verwenden Sie stattdessen die Einstellungen unter [Erscheinungsbild](./appearance.md) und nicht benutzerdefiniertes CSS auf einzelnen Seiten.
:::

## Vorschau Ihrer Seite

Verwenden Sie die Vorschau-Steuerelemente in der Symbolleiste, um zu prüfen, wie Ihre Seite auf verschiedenen Bildschirmgrößen aussieht:

- **Desktop** – Ansicht in voller Browserbreite
- **Mobil** – Schmale Ansicht im Smartphone-Format

Auf Smartphones werden die Spalten einer Zeile untereinander in voller Breite gestapelt, sofern Sie in den Einstellungen der Zeile keine **mobile Breite** festlegen. Listen mit Predigten und Podcast-Episoden stapeln auf Smartphones außerdem den Text jeder Episode unter ihrem Vorschaubild.

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, kehren Sie zur Seitenliste zurück und klicken Sie auf den Pfad der Seite. Er öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen

Klicken Sie in der Symbolleiste auf das Symbol **Barrierefreiheit**, um eine schnelle Prüfung auf häufige Probleme auszuführen – fehlender Alternativtext bei Bildern, geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das betreffende Element, sodass Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen

Der Editor zeichnet Ihren Bearbeitungsverlauf automatisch auf. Verwenden Sie die Schaltflächen der Symbolleiste oder Tastenkürzel zur Navigation:

- **Rückgängig** (Strg+Z / Cmd+Z) – Die letzte Aktion zurücknehmen
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) – Eine rückgängig gemachte Aktion erneut ausführen

Sie können die Seite auch auf einen früheren Snapshot zurücksetzen. Klicken Sie in der Symbolleiste auf **Verlauf anzeigen**, um eine Liste gespeicherter Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Stand zurückzukehren.

:::warning
Das Wiederherstellen eines Snapshots ersetzt den aktuellen Seiteninhalt durch die Snapshot-Version. Dies lässt sich nicht mit der Standard-Schaltfläche „Rückgängig“ rückgängig machen. Speichern Sie einen Snapshot Ihres aktuellen Stands, bevor Sie einen alten wiederherstellen, wenn Sie die Möglichkeit behalten möchten, dorthin zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden automatisch gespeichert, während Sie arbeiten. Eine Statusanzeige in der Symbolleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und Veröffentlichungsstatus

Seiten können einen **Veröffentlicht**-Status haben, der bestimmt, wann Besucher Ihre Änderungen sehen. Die Symbolleiste zeigt ein Statuskennzeichen mit dem aktuellen Zustand an:

- **Sofort live beim Speichern** – Die Seite verwendet keinen Veröffentlichungsablauf. Jede gespeicherte Änderung geht sofort live. Dies ist der Standard für neue Seiten.
- **Nicht veröffentlichte Änderungen** – Die Seite wurde bereits veröffentlicht, Sie haben seitdem aber Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Version.
- **Veröffentlicht** – Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Symbolleiste auf die Schaltfläche **Veröffentlichen**. Die Seite geht sofort live.

Um zur zuletzt veröffentlichten Version zurückzukehren, ohne das zu beeinflussen, was Besucher sehen, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Nicht veröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsablauf nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung deaktivieren**. Änderungen gehen dann wieder sofort live.

:::tip
Verwenden Sie den Entwurfs- und Veröffentlichungsablauf, wenn Sie eine Seite vorbereiten möchten – etwa für eine bevorstehende Veranstaltung – und sie erst im richtigen Moment live schalten wollen. Erstellen und prüfen Sie die Seite, und klicken Sie dann auf Veröffentlichen, wenn Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](./managing-pages.md) – Seiten anlegen, URLs festlegen und die Website-Navigation verwalten
- [Erscheinungsbild](./appearance.md) – Website-weite Farben, Schriftarten und Branding festlegen
- [Dateien](./files.md) – Bilder und Dokumente hochladen, die im Editor verwendet werden sollen
- [Formulare erstellen](../forms/creating-forms.md) – Formulare erstellen, die Sie auf Seiten einbetten können
