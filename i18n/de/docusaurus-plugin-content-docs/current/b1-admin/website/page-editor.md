---
title: "Den Seiteneditor verwenden"
description: "Erstellen Sie Website-Seiten im Seiteneditor von B1 Admin: Fügen Sie Abschnitte und Elemente hinzu, gestalten Sie sie, zeigen Sie eine Vorschau auf dem Telefon an, veröffentlichen Sie Entwürfe und nutzen Sie Rückgängig und den Bearbeitungsverlauf."
---

# Den Seiteneditor verwenden

<div class="article-intro">

Der Seiteneditor von B1 ist ein visueller Baukasten zum Ziehen und Ablegen, mit dem Sie die Seiten Ihrer Gemeindewebsite gestalten, ohne Code zu schreiben. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau ansehen und Änderungen rückgängig machen – alles direkt im Browser.

</div>

## Schulungsvideo {#training-video}

<YouTube id="m2B_JxmfFm4" title="Seiten und Navigation in B1 bearbeiten" next="Verbinden einer eigenen Domain in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](./initial-setup.md) ab, damit Ihre Website konfiguriert ist
- Legen Sie mindestens eine Seite unter [Seiten verwalten](./managing-pages.md) an
- Sie benötigen die Berechtigung **Inhalte bearbeiten** (content.edit), um auf den Editor zuzugreifen

</div>

## Den Editor öffnen {#opening-the-editor}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie in der Tabelle Seiten die Seite, die Sie bearbeiten möchten, und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus mit einer Live-Vorschau Ihrer Seite. Die Werkzeugleiste oben enthält **Beenden**, den Veröffentlichungsstatus der Seite, **Rückgängig** und **Wiederholen**, den Speicherstatus, **Veröffentlichen**, die Schaltflächen für die Vorschau am Desktop und auf dem Telefon, **Inhalt hinzufügen**, die Barrierefreiheitsprüfung sowie ein Menü **Mehr** (⋮). Klicken Sie auf **Inhalt hinzufügen**, um den Bereich **Elemente hinzufügen** links zu öffnen; klicken Sie auf einen Abschnitt oder ein Element, um rechts dessen Einstellungen zu öffnen.

Der Editor benötigt einen Bildschirm, der mindestens etwa 880 Pixel breit ist. Auf einem Telefon sehen Sie eine Meldung, die Sie bittet, die Seite auf einem Tablet oder Computer zu öffnen.

:::info
Der Editor wird immer im Hellmodus angezeigt, unabhängig von der Designeinstellung Ihres B1 Admin, und verwendet die Überschriften- und Fließtextschriften, die Sie unter [Erscheinungsbild](./appearance.md) gewählt haben. So entspricht die Vorschau genau dem, wie Ihre Seite für Besucher aussehen wird.
:::

## Seitenaufbau: Abschnitte und Elemente {#page-structure-sections-and-elements}

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** -- Die obersten Container, die Ihre Seite in horizontale Bänder gliedern (zum Beispiel einen Titelbereich, einen Inhaltsblock oder eine Fußzeilenleiste). Jede Seite braucht mindestens einen Abschnitt, bevor Sie Inhalte hinzufügen können.
- **Elemente** -- Die einzelnen Inhaltsteile innerhalb eines Abschnitts, etwa Texte, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen {#adding-a-section}

1. Klicken Sie auf **Inhalt hinzufügen** und ziehen Sie **Abschnitt** auf die Seite. Sie können auch zwischen zwei Abschnitte fahren und auf die erscheinende Schaltfläche **+** (**Abschnitt hinzufügen**) klicken.
2. Wählen Sie im Dialogfeld **Abschnittslayout auswählen**, wie Sie beginnen möchten:
   - **Aus einer Vorlage** — Durchsuchen Sie die Abschnittsvorlagen nach Kategorie (Titelbereich, Über uns, Angebote, Personen, Medien, Spenden und Aufruf zum Handeln) und klicken Sie auf eine, um sie als vollständig gestalteten, vorausgefüllten Abschnitt einzufügen. Danach können Sie alles anpassen.
   - **Leerer Abschnitt** — Ein leerer Abschnitt, den Sie von Grund auf aufbauen. Um ihn in Spalten zu teilen, fügen Sie darin ein Element **Zeile** hinzu.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und Hintergrund, Farben und weitere Stileinstellungen zu konfigurieren.

Fahren Sie mit der Maus über einen Abschnitt, erscheint seine Werkzeugleiste: Griff zum Ziehen, **Abschnittseinstellungen**, **Abschnitt nach oben verschieben**, **Abschnitt nach unten verschieben**, **Abschnitt duplizieren**, **Anderes Layout ausprobieren** und **Abschnitt löschen**.

### Das Layout eines Abschnitts wechseln {#switching-a-sections-layout}

Haben Sie einen Abschnitt bereits ausgearbeitet, möchten aber eine andere Struktur? Klicken Sie in der Werkzeugleiste des Abschnitts auf **Anderes Layout ausprobieren**, um seine Anordnung gegen eine andere aus der Galerie zu tauschen. Ihre vorhandenen Inhalte und Elemente bleiben dabei an ihrem Platz.

### Elemente zu einem Abschnitt hinzufügen {#adding-elements-to-a-section}

1. Klicken Sie auf **Inhalt hinzufügen**, um den Bereich **Elemente hinzufügen** zu öffnen. Nutzen Sie **Elemente suchen** oder die Reiter (**Alle**, **Häufig**, **Medien**, **Gemeinde**, **Erweitert** und **Blöcke**, sobald Sie [wiederverwendbare Blöcke](./blocks.md) haben), um ein Element zu finden.
2. Ziehen Sie das Element in einen Abschnitt in der Vorschau, oder wählen Sie auf der Seite ein Element aus und klicken Sie dann auf eine Karte, um das neue Element direkt danach einzufügen. Die Elemente sind:
   - **Zeile** -- Teilt einen Abschnitt in nebeneinanderliegende Spalten
   - **Box** -- Gruppiert Elemente in einem gestalteten Container
   - **Karussell** -- Wechselt durch eine Reihe von Folien in voller Breite
   - **Leerraum** -- Fügt vertikalen Leerraum ein
   - **Text** -- Überschriften, Absätze und Rich-Text
   - **Bild** -- Ein Foto hochladen oder darauf verlinken
   - **Schaltflächen-Link** -- Eine anklickbare Schaltfläche für einen Aufruf zum Handeln
   - **Karte** -- Ein Bild mit Titel und Beschreibung
   - **Formular** -- Bettet ein [Formular](../forms/creating-forms.md) direkt auf der Seite ein. Hat das Formular ein [Kopfbild](../forms/creating-forms.md#adding-a-header-photo), erscheint es oberhalb der Fragen
   - **Kalender** -- Zeigt einen Veranstaltungskalender an
   - **Aufklappbar** -- Frage-und-Antwort-Blöcke im Akkordeon-Stil
   - **Video** -- Bettet ein Video über seine URL ein
   - **Gruppenübersicht** -- Ein filterbares Verzeichnis aller Gruppen der Gemeinde mit optionaler Suche, Kategoriefilter und Bezeichnungsfilter. Sein **Layout** kann **Raster** (Standard) oder **Scrollend (automatisch)** sein – siehe [Scrollende Layouts](#scrolling-layouts)
   - **Gruppenliste** -- Kacheln für Ihre öffentlichen Gruppen, optional nur die Gruppen mit einer bestimmten Bezeichnung. Sein **Layout** kann **Raster** (Standard; bis zu drei Kacheln pro Zeile) oder **Scrollend (automatisch)** sein – siehe [Scrollende Layouts](#scrolling-layouts)
   - **Symbol-Merkmal** -- Ein Symbol mit Titel und kurzer Beschreibung für Merkmale oder Schwerpunkte des Dienstes
   - **Galerie** -- Ein Raster oder Masonry-Layout mit mehreren Fotos
   - **Zeugnis** -- Ein oder mehrere Zitate mit Name, Rolle und Foto des Verfassers
   - **Social-Media-Symbole** -- Verlinkte Symbole für die Social-Media-Profile Ihrer Gemeinde: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo und Podcast. Tragen Sie für jedes Symbol, das Sie anzeigen möchten, einen Link ein; für **WhatsApp** verwenden Sie einen Link `https://wa.me/` mit Ihrer Nummer oder einen Einladungslink zu einer Gruppe
   - **Countdown** -- Ein Timer, der auf ein Datum oder eine wöchentliche Gottesdienstzeit herunterzählt
   - **Kennzahlen** -- Eine Reihe großer Zahlen mit Beschriftungen (Mitglieder, Jahre, Standorte)
   - **Kampagnenfortschritt** -- Ein Live-Fortschrittsbalken für eine Spendenkampagne, der die bisher gesammelte Summe zu einem Fondsziel zeigt
   - **Mitarbeitenden-Raster** -- Fotokarten für die Mitglieder einer Gruppe; die Gruppe muss die Option **öffentliche Mitgliederliste** aktiviert haben
   - **Gottesdienstzeiten** -- Der Gottesdienstplan Ihrer Standorte, automatisch aus der Einrichtung der Anwesenheit übernommen
   - **Predigten** -- Ihre Predigtbibliothek als vollständige Übersicht oder als Raster, Liste oder hervorgehobenes neuestes Layout
   - **Standort** -- Eine eingebettete Karte, die auf die Adresse Ihrer Gemeinde zentriert ist
   - **Tabelle** -- Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** -- Text und ein Bild nebeneinander
   - **Logo** -- Das Logo Ihrer Gemeinde, übernommen aus [Erscheinungsbild](./appearance.md)
   - **Stream** -- Der Player Ihres Livestreams, direkt auf der Seite eingebettet
   - **Podcast** -- Eine Liste von Folgen aus einer externen Podcast-RSS-Feed-URL, die Sie angeben, mit Einstellungen, wie viele Folgen angezeigt werden und ob Datum und Beschreibungen erscheinen. Jede Folge auf der Live-Website hat einen Audioplayer und einen Link **Herunterladen**, der die Audiodatei der Folge unter dem Titel der Folge speichert. Dies dient dazu, einen beliebigen Podcast-Feed auf Ihrer Website hervorzuheben; um Ihre eigenen Predigten als Podcast zu veröffentlichen, siehe stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed)
   - **Spenden** -- Ein vollständiges Spendenformular, auf der Seite eingebettet
   - **Spenden-Link** -- Eine Schaltfläche, die Ihre Spendenseite öffnet
   - **HTML** -- Ihr eigenes rohes HTML für fortgeschrittene Anwendungsfälle, etwa die Einbettung eines Widgets eines Drittanbieters (siehe [Das HTML-Element verwenden](#using-the-html-element))
   - **Eingebettete Seite** -- Bettet eine andere Webseite über ihre URL in einem Rahmen ein
3. Konfigurieren Sie das Element über den Einstellungsbereich, der erscheint.

### Das HTML-Element verwenden {#using-the-html-element}

Das Element **HTML** hat zwei Felder:

- **HTML-Inhalt** -- Das Markup, das auf der Seite angezeigt wird. Alle `<script>`-Tags, die Sie hier einfügen, werden auf Ihrer Live-Website ausgeführt.
- **JavaScript (ohne script-Tag)** -- Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch einen Einbettungscode eines Anbieters mit seinen `<script>`-Tags einfügen; er wird auf der Live-Website ausgeführt.

Fügen Sie in das JavaScript-Feld nur eine Web-Adresse (etwa einen Bildlink) ein, wird das Feld rot und zeigt die Warnung *„Dies ist eine Web-Adresse, kein JavaScript.“* Eine nackte Adresse in diesem Feld bewirkt nichts. Um ein Bild anzuzeigen, verwenden Sie ein Element **Bild** oder fügen Sie `<img src="...">` in **HTML-Inhalt** ein.

### Das Kalender-Element verwenden {#using-the-calendar-element}

Das Element **Kalender** zeigt Veranstaltungen aus einem Ihrer Kalender:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (die Veranstaltungen einer Gruppe – die Liste zeigt Gruppen, denen Sie angehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** erstellt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar.md)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** -- Ein Monatsraster, durch das Besucher blättern können. Jede Veranstaltung ist in der Farbe der Gruppe eingefärbt, zu der sie gehört, sodass die Veranstaltungen einer Gruppe in jedem Kalender dieselbe Farbe haben. B1 wählt die Farben automatisch; Sie müssen nichts einrichten.
   - **Anstehende Veranstaltungen** -- Ein Raster aus Kacheln für die nächsten 12 anstehenden Veranstaltungen; eine wiederkehrende Veranstaltung wird einmal an ihrem nächsten Termin gezeigt. Jede Kachel zeigt das Foto der Veranstaltung (oder ihren Titel auf der dunklen Farbe Ihres Designs, wenn kein Foto vorhanden ist), ein Datumsabzeichen, Tag und Uhrzeit sowie die erste Zeile der Beschreibung. Eine Schaltfläche **Abonnieren** über den Kacheln ermöglicht es Besuchern, den ICS-Link des Kalenders zu kopieren oder ihn herunterzuladen. Für diese Anzeige erscheint eine Einstellung **Layout**: **Raster** (Standard) oder **Scrollend (automatisch)**, bei der die Kacheln in einer einzigen Reihe liegen, die sich von selbst weiterbewegt (siehe [Scrollende Layouts](#scrolling-layouts)). Bei einem **Kuratierten Kalender** aktivieren Sie die Einstellung **Gruppen-Kennzeichen**, um den Namen der Gruppe jeder Veranstaltung oben rechts auf ihrer Kachel in der Kalenderfarbe dieser Gruppe anzuzeigen. Veranstaltungen archivierter oder vertraulicher Gruppen erhalten kein Kennzeichen.
4. Um nur bestimmte Veranstaltungen anzuzeigen, geben Sie unter **Nur Veranstaltungen mit Schlagwort** ein Schlagwort ein – zum Beispiel `youth`. Erscheinen werden nur Veranstaltungen, deren **Schlagwörter** dieses Wort enthalten. Lassen Sie das Feld leer, um alle Veranstaltungen anzuzeigen. Schlagwörter legen Sie bei jeder Veranstaltung fest; siehe [Veranstaltungen hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

Bei beiden Anzeigen öffnet ein Klick auf eine Veranstaltung ihre eigene Seite auf Ihrer Website. Die Veranstaltungsseite zeigt das Foto der Veranstaltung, Titel, Datum und Uhrzeit sowie die Beschreibung, außerdem einen Kasten mit **Wann** (einschließlich des Wiederholungsmusters bei wiederkehrenden Veranstaltungen) und **Wo** (die für sie gebuchten Räume). Ist die Anmeldung aktiviert, erscheint außerdem die Schaltfläche **Für diese Veranstaltung anmelden**, und ein Link **Zu meinem Kalender hinzufügen** lädt die Veranstaltung als Kalenderdatei herunter. Die Seite ist so eingerichtet, dass Suchmaschinen Datum und Einzelheiten der Veranstaltung in ihren Ergebnissen anzeigen können. Veranstaltungsseiten aus kuratierten Kalendern, die auf Ihren Seiten angezeigt werden (für Veranstaltungen der nächsten sechs Monate), werden außerdem in der Sitemap Ihrer Website aufgeführt, damit Suchmaschinen sie finden.

### Scrollende Layouts {#scrolling-layouts}

Das Layout **Scrollend (automatisch)** bei der **Gruppenübersicht**, der **Gruppenliste** und der Anzeige **Anstehende Veranstaltungen** des Kalender-Elements ordnet die Kacheln in einer Reihe statt in einem Raster an. Auf dem Telefon füllt jede Kachel die Reihe; auf dem Computer passen zwei Kacheln nebeneinander. Gibt es mehr Kacheln, als hineinpassen, dann:

- bewegt sich die Reihe etwa alle vier Sekunden um eine Kachel weiter und beginnt nach der letzten Kachel wieder bei der ersten.
- hält sie an, sobald ein Besucher mit der Maus darüberfährt, sie berührt oder per Tabulator hineinspringt, und setzt ein paar Sekunden später fort.
- zeigt sie darunter eine Reihe Punkte, einen pro Kachel, wobei der Punkt der aktuellen Kachel gefüllt ist. Besucher können auf einen Punkt klicken, um direkt zu dieser Kachel zu springen.

Auf Geräten mit reduzierter Bewegung bleibt die Reihe stehen, und Besucher wischen oder scrollen sie selbst. Passen alle Kacheln hinein, bewegt sich die Reihe nicht, und es erscheinen keine Punkte.

### Inhalte neu anordnen {#reordering-content}

Ziehen Sie Abschnitte oder Elemente am Griffsymbol (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts verschieben oder zwischen Abschnitten bewegen.

## Ihre Seite gestalten {#styling-your-page}

### Abschnittsstile {#section-styles}

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilbereich zu öffnen. Sie können Folgendes festlegen:

- **Farben** -- Auf dem Reiter **Vorgeschlagen** klicken Sie auf eine der Farbkombinationen aus Ihrer Palette. Auf dem Reiter **Benutzerdefiniert** legen Sie den **Hintergrundtyp** (**Farbe**, **Bild** oder **YouTube-Video**) sowie die Farben für Überschrift, Text und Links fest. Bei einem Bildhintergrund klicken Sie auf das Bild, um dessen Fokuspunkt festzulegen (den Teil, der beim Zuschneiden des Bildes sichtbar bleibt), und verwenden Sie **Überlagerungsfarbe** und **Hintergrunddeckkraft**, um das Bild zu tönen, damit der Text gut lesbar bleibt.
- **Sichtbarkeit** -- **Auf dem Computer ausblenden** oder **Auf dem Telefon ausblenden**
- **Stile** -- Fügen Sie einzelne Stileinstellungen hinzu, etwa oberes und unteres Innenabstand, für alle Geräte, nur den Computer oder nur das Telefon
- **Animationen** -- Ein Effekt und eine Geschwindigkeit, wenn der Abschnitt beim Scrollen ins Bild kommt
- **Formtrenner** -- Dekorative Formen (Welle, Wellen, Schräge, Bogen, Spitzen und Dreieck) am oberen oder unteren Rand des Abschnitts, mit Farb-, Höhen- und Spiegelungsoptionen

Die Abschnittseinstellungen haben außerdem **Duplizieren** und **In Block umwandeln**, wodurch der Abschnitt in einen neuen [wiederverwendbaren Block](./blocks.md) kopiert wird.

### Elementstile {#element-styles}

Klicken Sie auf ein beliebiges Element, um dessen Stilbereich zu öffnen. Übliche Optionen sind Schriftgröße, Farbe, Ausrichtung, Außen- und Innenabstand. Bei Bildern können Sie Alternativtext und Linkziele festlegen.

### Stile für einen einzelnen Abschnitt oder ein einzelnes Element {#styles-for-one-section-or-element}

Für eine feinere Steuerung öffnen Sie den Bereich **Stile** in den Einstellungen eines Abschnitts oder Elements und klicken Sie unter **Alle**, **Nur Computer** oder **Nur Telefon** auf **Stil hinzufügen**. Jeder Stil wirkt nur auf diesen Abschnitt oder dieses Element und beeinflusst daher nicht den Rest der Seite.

:::tip
Wenn Sie Stile für Ihre gesamte Website festlegen müssen – etwa eine eigene Schrift oder eine globale Farbe –, verwenden Sie die Einstellungen unter [Erscheinungsbild](./appearance.md) statt eigenem CSS auf einzelnen Seiten.
:::

## Die Seite in der Vorschau ansehen {#previewing-your-page}

Verwenden Sie die Vorschau-Steuerung in der Werkzeugleiste, um zu prüfen, wie Ihre Seite bei verschiedenen Bildschirmgrößen aussieht:

- **Desktop** -- Ansicht in voller Browserbreite
- **Mobil** -- Schmale Ansicht in Telefongröße

Auf dem Telefon werden die Spalten einer Zeile untereinander in voller Breite gestapelt, sofern Sie in den Einstellungen der Zeile nicht eine **Breite auf dem Telefon** festlegen. Listen von Predigten und Podcast-Folgen zeigen auf dem Telefon den Text jeder Folge außerdem unter ihrem Vorschaubild.

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, gehen Sie zurück zur Liste der Seiten und klicken Sie auf den Pfad der Seite. Sie öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen {#checking-accessibility}

Klicken Sie in der Werkzeugleiste auf das Symbol **Barrierefreiheit prüfen** (es zeigt eine Anzahl, wenn Probleme gefunden werden), um eine schnelle Prüfung auf häufige Probleme durchzuführen – fehlender Alternativtext bei Bildern, geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das betroffene Element, sodass Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen {#undoing-changes}

Der Editor erfasst Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Schaltflächen der Werkzeugleiste oder Tastenkürzel, um sich darin zu bewegen:

- **Rückgängig** (Strg+Z / Cmd+Z) -- Macht Ihre letzte Aktion rückgängig
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) -- Wendet eine rückgängig gemachte Aktion erneut an

Sie können auch zu einem früheren Zeitpunkt springen. Öffnen Sie in der Werkzeugleiste das Menü **Mehr** (⋮) und klicken Sie auf **Verlauf anzeigen**. Das Dialogfeld **Bearbeitungsverlauf** listet jede Änderung mit ihrer Uhrzeit auf und markiert Ihren aktuellen Stand als **(aktuell)**. Klicken Sie auf einen Eintrag (oder auf seine Schaltfläche **Zu diesem Stand zurückkehren**), um die Seite in den Zustand zu diesem Zeitpunkt zurückzuversetzen.

:::info
Änderungen, die nach dem wiederhergestellten Zeitpunkt vorgenommen wurden, bleiben im Verlauf erhalten, sodass Sie mit **Wiederholen** oder einem späteren Eintrag wieder vorwärtsgehen können. Sobald Sie eine neue Änderung vornehmen, werden diese späteren Einträge durch sie ersetzt.
:::

## Speichern und Veröffentlichen {#saving-and-publishing}

Änderungen werden während der Arbeit automatisch gespeichert. Eine Statusanzeige in der Werkzeugleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und Veröffentlichungsstatus {#draft-and-published-state}

Seiten können einen Veröffentlichungsstatus haben, der bestimmt, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt einen Statusmarker mit dem aktuellen Zustand:

- **Mit dem Speichern live** -- Die Seite nutzt keinen Veröffentlichungsprozess. Jede gespeicherte Änderung geht sofort live. Das ist der Standard für neue Seiten.
- **Nicht veröffentlichte Änderungen** -- Die Seite wurde schon einmal veröffentlicht, Sie haben seitdem aber Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Version.
- **Veröffentlicht** -- Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Werkzeugleiste auf **Veröffentlichen**. Die Seite geht sofort live.

Um zur letzten veröffentlichten Version zurückzukehren, ohne das zu beeinflussen, was Besucher sehen, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Nicht veröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsprozess nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung deaktivieren**. Bearbeitungen gehen dann wieder sofort live.

:::tip
Nutzen Sie den Entwurfs- und Veröffentlichungsprozess, wenn Sie eine Seite vorbereiten möchten – etwa für eine bevorstehende Veranstaltung – und sie erst im richtigen Moment live schalten wollen. Gestalten und prüfen Sie die Seite, und klicken Sie dann auf Veröffentlichen, wenn Sie bereit sind.
:::

## Verwandte Artikel {#related-articles}

- [Seiten verwalten](./managing-pages.md) -- Seiten erstellen, URLs festlegen und die Navigation der Website verwalten
- [Erscheinungsbild](./appearance.md) -- Websiteweite Farben, Schriften und Markenauftritt festlegen
- [Dateien](./files.md) -- Bilder und Dokumente für den Editor hochladen
- [Formulare erstellen](../forms/creating-forms.md) -- Formulare erstellen, die Sie auf Seiten einbetten können
