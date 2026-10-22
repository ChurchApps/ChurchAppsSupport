---
title: "Den Seiteneditor verwenden"
---

# Den Seiteneditor verwenden

<div class="article-intro">

Der Seiteneditor von B1 ist ein visueller Baukasten zum Ziehen und Ablegen, mit dem Sie die Seiten Ihrer Kirchenwebsite gestalten können, ganz ohne Code. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau prüfen und Änderungen rückgängig machen – alles direkt im Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](initial-setup) ab, damit Ihre Website konfiguriert ist.
- Legen Sie mindestens eine Seite unter [Seiten verwalten](managing-pages) an.
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zuzugreifen.

</div>

## Den Editor öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie in der Tabelle der Seiten die Seite, die Sie bearbeiten möchten, und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus. Das linke Panel zeigt die Struktur Ihrer Seite und die verfügbaren Inhaltselemente; der mittlere Bereich zeigt eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von der Designeinstellung in B1 Admin, und verwendet die Schriften für Überschriften und Fließtext, die Sie unter [Erscheinungsbild](appearance) gewählt haben. So entspricht die Vorschau genau dem, wie Ihre Seite für Besucher aussehen wird.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** – Die obersten Container, die Ihre Seite in horizontale Bereiche gliedern (zum Beispiel ein Hauptbereich, ein Inhaltsblock oder eine Fußzeile). Jede Seite braucht mindestens einen Abschnitt, bevor Sie Inhalte hinzufügen können.
- **Elemente** – Die einzelnen Inhaltsstücke innerhalb eines Abschnitts, etwa Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder auf die Schaltfläche **+** oben im linken Panel).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** – Durchsuchen Sie die Galerie der Abschnittsvorlagen, geordnet nach Kategorie (Hauptbereich, Über uns, Dienste, Spenden usw.), und klicken Sie auf eine, um sie als vollständig gestalteten, vorausgefüllten Abschnitt einzufügen. Sie können danach alles anpassen.
   - **Leerer Abschnitt** – Wählen Sie ein Spaltenlayout (eine Spalte, zwei Spalten, drei Spalten usw.) und bauen Sie den Abschnitt von Grund auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und Hintergrundfarbe, Innenabstand und weitere Stileinstellungen zu konfigurieren.

### Das Layout eines Abschnitts ändern

Sie haben einen Abschnitt bereits gestaltet, möchten ihn aber anders aufbauen? Verwenden Sie den Layout-Umschalter dieses Abschnitts, um seine Spaltenanordnung gegen eine andere aus der Galerie zu tauschen. Ihre bestehenden Inhalte und Elemente bleiben dabei erhalten.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** – Überschriften, Absätze und Rich-Text
   - **Bild** – Ein Foto hochladen oder verlinken
   - **Schaltfläche** – Ein anklickbarer Aufruf zur Handlung (Link)
   - **Karte** – Ein Bild mit Titel und Beschreibung
   - **Formular** – Ein [Formular](../forms/creating-forms) direkt auf der Seite einbetten
   - **Kalender** – Einen Veranstaltungskalender anzeigen
   - **FAQ** – Fragen und Antworten als Akkordeon
   - **Video** – Ein Video über seine URL einbetten
   - **Gruppenübersicht** – Ein filterbares Verzeichnis aller Gruppen der Kirche mit optionaler Suche, Kategoriefilter und Etikettenfilter
   - **Symbol-Merkmal** – Ein Symbol mit Titel und kurzer Beschreibung, für Merkmale oder Dienstbereiche
   - **Galerie** – Ein Raster oder Masonry-Layout mit mehreren Fotos
   - **Zeugnis** – Ein oder mehrere Zitate mit Name, Rolle und Foto des Verfassers
   - **Soziale Symbole** – Verlinkte Symbole für die Profile Ihrer Kirche in den sozialen Medien
   - **Countdown** – Ein Timer, der auf ein Datum oder eine wöchentliche Gottesdienstzeit herunterzählt
   - **Kennzahlen** – Eine Reihe großer Zahlen mit Beschriftungen (Mitglieder, Jahre, Standorte)
   - **Kampagnenfortschritt** – Ein Live-Fortschrittsbalken für eine Spendenkampagne, der den bisher gesammelten Betrag im Verhältnis zum Fondsziel zeigt
   - **Mitarbeitenden-Raster** – Fotokarten für die Mitglieder einer Gruppe; die Gruppe muss die Option **öffentliche Liste** aktiviert haben
   - **Gottesdienstzeiten** – Der Gottesdienstplan Ihrer Standorte, automatisch aus dem Anwesenheits-Setup übernommen
   - **Predigten** – Ihre Predigtbibliothek als vollständige Ansicht oder als Raster, Liste oder hervorgehobenes neuestes Layout
   - **Landkarte** – Eine eingebettete Karte, zentriert auf die Adresse Ihrer Kirche
   - **Tabelle** – Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** – Text und ein Bild nebeneinander
   - **Logo** – Das Logo Ihrer Kirche, aus [Erscheinungsbild](appearance) übernommen
   - **Livestream** – Ihr Livestream-Player, direkt auf der Seite eingebettet
   - **Podcast** – Eine Liste von Folgen, die aus einer externen Podcast-RSS-Feed-URL stammen, die Sie angeben, mit Einstellungen, wie viele Folgen angezeigt werden und ob Datum und Beschreibungen erscheinen. Jede Folge auf der Live-Website hat einen Audioplayer und einen Link **Herunterladen**, der die Audiodatei der Folge unter dem Folgentitel speichert. Damit können Sie einen beliebigen Podcast-Feed auf Ihrer Website hervorheben. Um Ihre eigenen Predigten als Podcast zu veröffentlichen, lesen Sie stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed).
   - **Spende** – Eine Schaltfläche zum Geben oder ein eingebettetes Spendenformular
   - **HTML** – Ihr eigenes HTML für fortgeschrittene Anwendungsfälle, etwa das Einbetten eines Widgets eines Drittanbieters (siehe [Das HTML-Element verwenden](#using-the-html-element))
   - **iFrame** – Externe Inhalte über eine URL einbetten
3. Konfigurieren Sie das Element über das Einstellungsfenster, das erscheint.

### Das HTML-Element verwenden {#using-the-html-element}

Das Element **HTML** hat zwei Felder:

- **HTML-Inhalt** – Das Markup, das auf der Seite angezeigt wird. Alle `<script>`-Tags, die Sie hier einfügen, laufen auf Ihrer Live-Website.
- **JavaScript (ohne Script-Tag)** – Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch den Einbettungscode eines Anbieters mit seinen `<script>`-Tags einfügen; er wird auf der Live-Website ausgeführt.

Wenn Sie nur eine Webadresse (etwa einen Bildlink) in das JavaScript-Feld einfügen, wird das Feld rot und zeigt die Warnung *„Dies ist eine Webadresse, kein JavaScript.“* Eine nackte Adresse in diesem Feld bewirkt nichts. Um ein Bild anzuzeigen, verwenden Sie ein Element **Bild** oder fügen Sie `<img src="...">` in **HTML-Inhalt** ein.

### Das Kalender-Element verwenden {#using-the-calendar-element}

Das Element **Kalender** zeigt Veranstaltungen aus einem Ihrer Kalender:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (die Veranstaltungen einer Gruppe – die Liste zeigt die Gruppen, denen Sie angehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** angelegt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** – Ein Monatsraster, durch das Besucher blättern können.
   - **Kommende Veranstaltungen** – Ein Raster aus Kacheln für die nächsten 12 Veranstaltungen; eine wiederkehrende Veranstaltung wird mit ihrem nächsten Termin einmal angezeigt. Jede Kachel zeigt das Foto der Veranstaltung (oder ihren Titel auf der dunklen Farbe Ihres Designs, falls kein Foto vorhanden ist), ein Datumsschild, Tag und Uhrzeit sowie die erste Zeile der Beschreibung. Über den Kacheln befindet sich eine Schaltfläche **Abonnieren**, mit der Besucher den ICS-Link des Kalenders kopieren oder ihn herunterladen können.
4. Um nur bestimmte Veranstaltungen anzuzeigen, geben Sie unter **Nur Veranstaltungen mit dem Schlagwort** ein Schlagwort ein – zum Beispiel `jugend`. Es erscheinen nur Veranstaltungen, deren **Schlagwörter** dieses Wort enthalten. Lassen Sie das Feld leer, um alle Veranstaltungen anzuzeigen. Schlagwörter legen Sie bei jeder Veranstaltung fest; siehe [Veranstaltungen hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

Bei beiden Anzeigearten öffnet ein Klick auf eine Veranstaltung deren eigene Seite auf Ihrer Website. Die Veranstaltungsseite zeigt das Foto, den Titel, Datum und Uhrzeit sowie die Beschreibung, außerdem einen Kasten mit **Wann** (einschließlich des Wiederholungsmusters bei wiederkehrenden Veranstaltungen) und **Wo** (die für sie gebuchten Räume). Ist die Anmeldung aktiviert, erscheint außerdem die Schaltfläche **Für diese Veranstaltung anmelden**, und ein Link **Zu meinem Kalender hinzufügen** lädt die Veranstaltung als Kalenderdatei herunter. Die Seite ist so eingerichtet, dass Suchmaschinen Datum und Details der Veranstaltung in ihren Ergebnissen anzeigen können.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente am Griffsymbol (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts verschieben oder zwischen Abschnitten verschieben.

## Ihre Seite gestalten

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilpanel zu öffnen. Sie können festlegen:

- **Hintergrund** – Einfarbig, Verlauf oder Bild. Bei einem Bild als Hintergrund können Sie mit der Auswahl des **Fokuspunkts** anklicken, welcher Teil des Bildes beim Skalieren in der Mitte bleibt. Mit der Option **Überlagerung** legen Sie eine halbtransparente Farbtönung über das Bild, um die Lesbarkeit des Textes zu verbessern.
- **Innenabstand** – Abstand oben und unten innerhalb des Abschnitts
- **Breite** – Volle Breite oder zentriert/begrenzt
- **Trenner** – Dekorative Formtrenner (Welle, Schräge, Bogen, Dreieck und mehr) am oberen oder unteren Rand des Abschnitts, mit Farbe, Höhe und Spiegelung

### Elementstile

Klicken Sie auf ein beliebiges Element, um dessen Stilpanel zu öffnen. Übliche Optionen sind Schriftgröße, Farbe, Ausrichtung, Außenabstand und Innenabstand. Bei Bildern können Sie den Alternativtext und die Linkziele festlegen.

### Eigenes CSS

Für fortgeschrittene Gestaltung hat jeder Abschnitt und jedes Element ein Feld **Eigenes CSS**, in das Sie eigene CSS-Regeln schreiben können. Diese gelten nur für das jeweilige Element und beeinflussen den Rest der Seite nicht unbeabsichtigt.

:::tip
Wenn Sie Stile für Ihre gesamte Website anwenden möchten – etwa eine eigene Schrift oder eine globale Farbe –, verwenden Sie die Einstellungen unter [Erscheinungsbild](appearance) statt eigenem CSS auf einzelnen Seiten.
:::

## Die Seite in der Vorschau prüfen

Verwenden Sie die Vorschau-Steuerelemente in der Werkzeugleiste, um zu prüfen, wie Ihre Seite in verschiedenen Bildschirmgrößen aussieht:

- **Desktop** – Ansicht im Browser in voller Breite
- **Mobil** – Schmale Ansicht in Smartphone-Größe

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, gehen Sie zurück zur Liste der Seiten und klicken Sie auf den Pfad der Seite. Er öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen

Klicken Sie in der Werkzeugleiste auf das Symbol **Barrierefreiheit**, um eine schnelle Prüfung auf typische Probleme auszuführen – Bilder ohne Alternativtext, geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das betroffene Element, damit Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen

Der Editor speichert Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Schaltflächen der Werkzeugleiste oder Tastenkombinationen zur Navigation:

- **Rückgängig** (Strg+Z / Cmd+Z) – Die letzte Aktion zurücknehmen
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) – Eine rückgängig gemachte Aktion erneut anwenden

Sie können die Seite auch auf einen früheren Schnappschuss zurücksetzen. Klicken Sie in der Werkzeugleiste auf **Verlauf anzeigen**, um eine Liste gespeicherter Schnappschüsse mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Stand zurückzukehren.

:::warning
Das Wiederherstellen eines Schnappschusses ersetzt den aktuellen Seiteninhalt durch die Version des Schnappschusses. Das lässt sich mit der normalen Schaltfläche Rückgängig nicht rückgängig machen. Speichern Sie einen Schnappschuss Ihres aktuellen Stands, bevor Sie einen alten wiederherstellen, wenn Sie die Möglichkeit behalten möchten, zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden während der Arbeit automatisch gespeichert. Eine Statusanzeige in der Werkzeugleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und Veröffentlichungsstatus

Seiten können einen **Veröffentlichungsstatus** haben, der bestimmt, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt einen Statusanzeiger mit dem aktuellen Zustand:

- **Sofort live beim Speichern** – Die Seite verwendet keinen Veröffentlichungsablauf. Jede gespeicherte Änderung ist sofort live. Das ist die Standardeinstellung für neue Seiten.
- **Nicht veröffentlichte Änderungen** – Die Seite wurde bereits veröffentlicht, Sie haben seit der letzten Veröffentlichung aber Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Fassung.
- **Veröffentlicht** – Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Werkzeugleiste auf die Schaltfläche **Veröffentlichen**. Die Seite wird sofort live.

Um zur zuletzt veröffentlichten Fassung zurückzukehren, ohne dass Besucher etwas davon bemerken, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Nicht veröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsablauf nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung ausschalten**. Bearbeitungen gehen danach wieder sofort live.

:::tip
Nutzen Sie den Ablauf mit Entwurf und Veröffentlichung, wenn Sie eine Seite vorbereiten möchten – etwa für eine bevorstehende Veranstaltung – und sie erst im richtigen Moment live schalten wollen. Erstellen und prüfen Sie die Seite in der Vorschau und klicken Sie dann auf Veröffentlichen, wenn Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](managing-pages) – Seiten anlegen, URLs festlegen und die Navigation der Website verwalten
- [Erscheinungsbild](appearance) – Farben, Schriften und Branding für die gesamte Website festlegen
- [Dateien](files) – Bilder und Dokumente hochladen, um sie im Editor zu verwenden
- [Formulare erstellen](../forms/creating-forms) – Formulare erstellen, die Sie auf Seiten einbetten können
