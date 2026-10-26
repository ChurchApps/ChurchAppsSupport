---
title: "Den Seiteneditor verwenden"
---

# Den Seiteneditor verwenden

<div class="article-intro">

Der B1-Seiteneditor ist ein visueller Drag-and-drop-Baukasten, mit dem Sie die Seiten Ihrer Gemeindewebsite ohne Programmierung gestalten können. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau prüfen und Änderungen rückgängig machen – alles direkt im Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](initial-setup) ab, um Ihre Website zu konfigurieren.
- Erstellen Sie mindestens eine Seite unter [Seiten verwalten](managing-pages).
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zuzugreifen.

</div>

## Den Editor öffnen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie in der Seitentabelle die Seite, die Sie bearbeiten möchten, und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus. Das linke Feld zeigt die Struktur Ihrer Seite und die verfügbaren Inhaltselemente; im mittleren Bereich sehen Sie eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von der Designeinstellung Ihres B1 Admin, und verwendet die Überschriften- und Fließtextschriften, die Sie unter [Erscheinungsbild](appearance) gewählt haben. So stimmt die Vorschau genau mit dem überein, wie Ihre Seite für Website-Besucher aussieht.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** – Die obersten Container, die Ihre Seite in horizontale Bereiche unterteilen (zum Beispiel ein Hero-Abschnitt, ein Inhaltsblock oder ein Fußzeilenstreifen). Jede Seite braucht mindestens einen Abschnitt, bevor Sie Inhalte hinzufügen können.
- **Elemente** – Die einzelnen Inhaltsstücke innerhalb eines Abschnitts, etwa Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder auf die Schaltfläche **+** oben im linken Feld).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** – Durchsuchen Sie die Galerie der Abschnittsvorlagen, nach Kategorien geordnet (Hero, Über uns, Gottesdienste, Spenden usw.), und klicken Sie auf eine Vorlage, um einen vollständig gestalteten, vorausgefüllten Abschnitt einzufügen. Sie können danach alles anpassen.
   - **Leerer Abschnitt** – Wählen Sie ein Spaltenlayout (einspaltig, zweispaltig, dreispaltig usw.) und bauen Sie den Abschnitt von Grund auf auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und Hintergrundfarbe, Innenabstand und weitere Stileinstellungen zu konfigurieren.

### Das Layout eines Abschnitts wechseln

Haben Sie einen Abschnitt bereits aufgebaut, möchten aber eine andere Struktur? Verwenden Sie den Layout-Umschalter dieses Abschnitts, um seine Spaltenanordnung gegen eine andere aus der Galerie zu tauschen. Ihre vorhandenen Inhalte und Elemente bleiben dabei erhalten.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** – Überschriften, Absätze und Rich Text
   - **Bild** – Ein Foto hochladen oder darauf verlinken
   - **Schaltfläche** – Ein anklickbarer Handlungsaufruf-Link
   - **Karte** – Ein Bild mit Titel und Beschreibung
   - **Formular** – Ein [Formular](../forms/creating-forms) direkt auf der Seite einbetten. Hat das Formular ein [Kopfbild](../forms/creating-forms.md#adding-a-header-photo), wird es über den Fragen angezeigt
   - **Kalender** – Einen Veranstaltungskalender anzeigen
   - **FAQ** – Frage-und-Antwort-Blöcke im Akkordeon-Stil
   - **Video** – Ein Video über seine URL einbetten
   - **Gruppenübersicht** – Ein filterbares Verzeichnis aller Gruppen der Gemeinde mit optionaler Suche, Kategoriefilter und Bezeichnungsfilter
   - **Symbol-Feature** – Ein Symbol mit Titel und kurzer Beschreibung, für Highlights von Angeboten oder Diensten
   - **Galerie** – Ein Raster oder Masonry-Layout mit mehreren Fotos
   - **Zeugnis** – Ein oder mehrere Zitate mit Name, Rolle und Foto der Person
   - **Social-Media-Symbole** – Verlinkte Symbole für die Social-Media-Profile Ihrer Gemeinde: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo und Podcast. Tragen Sie für jedes Symbol, das Sie anzeigen möchten, einen Link ein. Verwenden Sie für **WhatsApp** einen Link der Form `https://wa.me/` mit Ihrer Nummer oder einem Gruppen-Einladungslink.
   - **Countdown** – Ein Timer, der auf ein Datum oder eine wöchentliche Gottesdienstzeit herunterzählt
   - **Statistiken** – Eine Reihe großer Zahlen mit Beschriftungen (Mitglieder, Jahre, Standorte)
   - **Kampagnenfortschritt** – Ein Live-Fortschrittsbalken für eine Spendenkampagne, der den bisher für ein Fondsziel gesammelten Betrag anzeigt
   - **Mitarbeitenden-Raster** – Fotokarten für die Mitglieder einer Gruppe; dafür muss bei der Gruppe die Option **öffentliche Liste** aktiviert sein
   - **Gottesdienstzeiten** – Der Gottesdienstplan Ihrer Standorte, der automatisch aus der Einrichtung der Anwesenheit übernommen wird
   - **Predigten** – Ihre Predigtbibliothek als vollständige Ansicht oder als Raster-, Listen- oder Layout mit hervorgehobener neuester Predigt
   - **Karte** – Eine eingebettete Karte, zentriert auf die Adresse Ihrer Gemeinde
   - **Tabelle** – Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** – Text und ein Bild nebeneinander
   - **Logo** – Das Logo Ihrer Gemeinde, übernommen aus [Erscheinungsbild](appearance)
   - **Livestream** – Ihr Livestream-Player, direkt auf der Seite eingebettet
   - **Podcast** – Eine Liste von Folgen aus einer externen Podcast-RSS-Feed-URL, die Sie angeben. Sie können festlegen, wie viele Folgen angezeigt werden und ob Datum und Beschreibungen erscheinen. Jede Folge auf der Live-Website hat einen Audioplayer und einen Link **Herunterladen**, der die Audiodatei der Folge unter ihrem Titel speichert. Dies dient dazu, beliebige Podcast-Feeds auf Ihrer Website hervorzuheben. Um Ihre eigenen Predigten als Podcast zu veröffentlichen, siehe stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed).
   - **Spenden** – Eine Schaltfläche zum Geben oder ein eingebettetes Spendenformular
   - **HTML** – Ihr eigenes unverarbeitetes HTML für fortgeschrittene Anwendungsfälle, etwa das Einbetten eines Drittanbieter-Widgets (siehe [Das HTML-Element verwenden](#using-the-html-element))
   - **iFrame** – Externe Inhalte über eine URL einbetten
3. Konfigurieren Sie das Element im Einstellungsbereich, der erscheint.

### Das HTML-Element verwenden

Das Element **HTML** hat zwei Felder:

- **HTML-Inhalt** – Der Markup-Code, der auf der Seite angezeigt wird. Alle `<script>`-Tags, die Sie hier einfügen, werden auf Ihrer Live-Website ausgeführt.
- **JavaScript (ohne Script-Tag)** – Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch den Einbettungscode eines Anbieters einschließlich seiner `<script>`-Tags einfügen; er wird auf der Live-Website ausgeführt.

Fügen Sie nur eine Webadresse (etwa einen Bildlink) in das JavaScript-Feld ein, wird das Feld rot und zeigt die Warnung *„Dies ist eine Webadresse, kein JavaScript.“* an. Eine bloße Adresse in diesem Feld bewirkt nichts. Um ein Bild anzuzeigen, verwenden Sie ein **Bild**-Element oder fügen `<img src="...">` in **HTML-Inhalt** ein.

### Das Kalenderelement verwenden {#using-the-calendar-element}

Das Element **Kalender** zeigt Termine aus einem Ihrer Kalender an:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (Termine einer Gruppe – die Liste zeigt Gruppen, denen Sie angehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** erstellt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender aus.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** – Ein Monatsraster, durch das Besucher blättern können.
   - **Kommende Termine** – Ein Raster aus Kacheln für die nächsten 12 Termine; ein wiederkehrender Termin wird nur an seinem nächsten Datum angezeigt. Jede Kachel zeigt das Foto des Termins (oder seinen Titel auf der dunklen Farbe Ihres Designs, falls kein Foto vorhanden ist), eine Datumsmarke, Tag und Uhrzeit sowie die erste Zeile der Beschreibung. Eine Schaltfläche **Abonnieren** über den Kacheln ermöglicht es Besuchern, den ICS-Link des Kalenders zu kopieren oder ihn herunterzuladen.
4. Um nur bestimmte Termine anzuzeigen, geben Sie unter **Nur Termine mit Schlagwort** ein Schlagwort ein, zum Beispiel `jugend`. Es erscheinen nur Termine, deren **Schlagwörter** dieses Wort enthalten. Lassen Sie das Feld leer, um alle Termine anzuzeigen. Schlagwörter werden bei jedem Termin festgelegt; siehe [Termine hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

In beiden Anzeigen öffnet ein Klick auf einen Termin seine eigene Seite auf Ihrer Website. Die Terminseite zeigt das Foto, den Titel, Datum und Uhrzeit sowie die Beschreibung des Termins und ein Feld mit **Wann** (einschließlich des Wiederholungsmusters bei wiederkehrenden Terminen) und **Wo** (die für den Termin gebuchten Räume). Ist die Anmeldung aktiviert, erscheint außerdem die Schaltfläche **Für diesen Termin anmelden**, und ein Link **Zu meinem Kalender hinzufügen** lädt den Termin als Kalenderdatei herunter. Die Seite ist so aufgebaut, dass Suchmaschinen Datum und Details des Termins in ihren Ergebnissen anzeigen können. Terminseiten aus kuratierten Kalendern, die auf Ihren Seiten angezeigt werden (für Termine in den nächsten sechs Monaten), werden außerdem in der Sitemap Ihrer Website aufgeführt, damit Suchmaschinen sie finden können.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente am Griffsymbol (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts verschieben oder zwischen Abschnitten bewegen.

## Ihre Seite gestalten

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilbereich zu öffnen. Sie können festlegen:

- **Hintergrund** – Einfarbig, Verlauf oder Bild. Bei einem Bild als Hintergrund können Sie mit dem Auswahlwerkzeug **Fokuspunkt** durch Klicken festlegen, welcher Bildteil beim Skalieren des Abschnitts zentriert bleibt. Mit der Option **Überlagerung** legen Sie eine halbtransparente Tönung über das Bild, um die Lesbarkeit des Textes zu verbessern.
- **Innenabstand** – Abstand oben und unten innerhalb des Abschnitts
- **Breite** – Volle Breite oder zentriert/begrenzt
- **Trenner** – Dekorative Formtrenner (Welle, Schräge, Bogen, Dreieck und weitere) an der oberen oder unteren Kante des Abschnitts, mit Farbe, Höhe und Spiegelungsoptionen

### Elementstile

Klicken Sie auf ein beliebiges Element, um dessen Stilbereich zu öffnen. Übliche Optionen sind Schriftgröße, Farbe, Ausrichtung, Außenabstand und Innenabstand. Bei Bildern können Sie Alternativtext und Linkziele festlegen.

### Benutzerdefiniertes CSS

Für fortgeschrittene Gestaltung besitzt jeder Abschnitt und jedes Element ein Feld **Benutzerdefiniertes CSS**, in das Sie eigene CSS-Regeln schreiben können. Diese gelten nur für das jeweilige Element und beeinflussen daher nicht ungewollt den Rest der Seite.

:::tip
Wenn Sie Stile über Ihre gesamte Website anwenden möchten – etwa eine eigene Schrift oder eine globale Farbe –, verwenden Sie die Einstellungen unter [Erscheinungsbild](appearance) statt benutzerdefiniertem CSS auf einzelnen Seiten.
:::

## Ihre Seite in der Vorschau anzeigen

Verwenden Sie die Vorschau-Steuerelemente in der Werkzeugleiste, um zu prüfen, wie Ihre Seite auf verschiedenen Bildschirmgrößen aussieht:

- **Desktop** – Ansicht in voller Browserbreite
- **Mobil** – Ansicht in der schmalen Größe eines Telefons

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, gehen Sie zurück zur Seitenliste und klicken Sie auf den Pfad der Seite. Er öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen

Klicken Sie in der Werkzeugleiste auf das Symbol **Barrierefreiheit**, um eine schnelle Prüfung auf typische Probleme durchzuführen – Bilder ohne Alternativtext, zu geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das betroffene Element, damit Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen

Der Editor speichert Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Schaltflächen der Werkzeugleiste oder Tastenkombinationen zur Navigation:

- **Rückgängig** (Strg+Z / Cmd+Z) – Die letzte Aktion zurücknehmen
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) – Eine rückgängig gemachte Aktion erneut ausführen

Sie können die Seite auch auf einen früheren Snapshot zurücksetzen. Klicken Sie in der Werkzeugleiste auf **Verlauf anzeigen**, um eine Liste gespeicherter Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Stand zurückzukehren.

:::warning
Das Wiederherstellen eines Snapshots ersetzt den aktuellen Seiteninhalt durch die Version des Snapshots. Dies lässt sich nicht mit der normalen Rückgängig-Schaltfläche rückgängig machen. Speichern Sie einen Snapshot Ihres aktuellen Stands, bevor Sie einen alten wiederherstellen, wenn Sie die Möglichkeit behalten möchten, dorthin zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden während der Arbeit automatisch gespeichert. Eine Statusanzeige in der Werkzeugleiste zeigt an, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und Veröffentlichungsstatus

Seiten können einen **veröffentlichten** Status haben, der bestimmt, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt einen Statusanzeiger mit dem aktuellen Zustand:

- **Sofort live bei Speichern** – Die Seite verwendet keinen Veröffentlichungsablauf. Jede gespeicherte Änderung geht sofort live. Dies ist der Standard für neue Seiten.
- **Nicht veröffentlichte Änderungen** – Die Seite wurde bereits veröffentlicht, Sie haben seitdem aber Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Version.
- **Veröffentlicht** – Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Werkzeugleiste auf die Schaltfläche **Veröffentlichen**. Die Seite ist sofort live.

Um zur zuletzt veröffentlichten Version zurückzukehren, ohne das zu beeinflussen, was Besucher sehen, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Nicht veröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsablauf nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung deaktivieren**. Änderungen gehen dann wieder sofort live.

:::tip
Nutzen Sie den Entwurfs- und Veröffentlichungsablauf, wenn Sie eine Seite vorbereiten möchten – zum Beispiel für einen bevorstehenden Termin – und sie erst im richtigen Moment live schalten wollen. Erstellen und prüfen Sie die Seite und klicken Sie dann auf Veröffentlichen, sobald Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](managing-pages) – Seiten erstellen, URLs festlegen und die Website-Navigation verwalten
- [Erscheinungsbild](appearance) – Website-weite Farben, Schriften und Branding festlegen
- [Dateien](files) – Bilder und Dokumente hochladen, die im Editor verwendet werden sollen
- [Formulare erstellen](../forms/creating-forms) – Formulare erstellen, die Sie auf Seiten einbetten können
