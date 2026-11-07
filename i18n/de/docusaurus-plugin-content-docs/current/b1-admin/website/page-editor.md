---
title: "Den Seiteneditor verwenden"
description: "Seiteneditor in B1 Admin nutzen: Abschnitte und Elemente hinzufügen, gestalten, mobil prüfen und Entwürfe veröffentlichen; auch Rückgängig und Verlauf."
---

# Den Seiteneditor verwenden

<div class="article-intro">

Der Seiteneditor von B1 ist ein visueller Drag-and-Drop-Baukasten, mit dem Sie die Seiten Ihrer Kirchenwebsite ohne Programmierung gestalten. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit vorab ansehen und Änderungen rückgängig machen – alles direkt im Browser.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Erstkonfiguration](./initial-setup.md) ab, um Ihre Website einzurichten
- Legen Sie mindestens eine Seite unter [Seiten verwalten](./managing-pages.md) an
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zuzugreifen

</div>

## Den Editor öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie die Seite, die Sie bearbeiten möchten, in der Tabelle Seiten und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus. Das linke Feld zeigt die Struktur Ihrer Seite und die verfügbaren Inhaltselemente; der mittlere Bereich zeigt eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von der Designeinstellung Ihres B1-Admins, und verwendet die Schriften für Überschriften und Fließtext, die Sie unter [Erscheinungsbild](./appearance.md) gewählt haben. So stimmt die Vorschau genau mit dem überein, wie Ihre Seite Besuchern erscheinen wird.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** – Die obersten Container, die Ihre Seite in horizontale Bänder teilen (zum Beispiel ein Hero-Abschnitt, ein Inhaltsblock oder ein Fußbereich). Jede Seite braucht mindestens einen Abschnitt, bevor Sie Inhalte hinzufügen können.
- **Elemente** – Die einzelnen Inhaltsstücke innerhalb eines Abschnitts, etwa Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder auf die Schaltfläche **+** oben im linken Feld).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** – Durchsuchen Sie die Galerie der Abschnittsvorlagen, geordnet nach Kategorien (Hero, Über uns, Gottesdienste, Spenden usw.), und klicken Sie auf eine, um sie als voll gestalteten, vorausgefüllten Abschnitt einzufügen. Sie können danach alles anpassen.
   - **Leerer Abschnitt** – Wählen Sie ein Spaltenlayout (eine Spalte, zwei Spalten, drei Spalten usw.) und bauen Sie von Grund auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und seine Hintergrundfarbe, den Innenabstand und weitere Stiloptionen festzulegen.

### Das Layout eines Abschnitts wechseln

Haben Sie einen Abschnitt bereits aufgebaut, möchten aber eine andere Struktur? Verwenden Sie den Layout-Wechsler dieses Abschnitts, um seine Spaltenanordnung gegen eine andere aus der Galerie zu tauschen, während Ihre vorhandenen Inhalte und Elemente erhalten bleiben.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau in einen Abschnitt, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** – Überschriften, Absätze und Rich-Text
   - **Bild** – Ein Foto hochladen oder darauf verlinken
   - **Schaltfläche** – Ein anklickbarer Aufruf zum Handeln (Call-to-Action-Link)
   - **Karte** – Ein Bild mit Titel und Beschreibung
   - **Formular** – Ein [Formular](../forms/creating-forms.md) direkt auf der Seite einbetten. Hat das Formular ein [Kopfbild](../forms/creating-forms.md#adding-a-header-photo), erscheint es oberhalb der Fragen
   - **Kalender** – Einen Veranstaltungskalender anzeigen
   - **FAQ** – Frage-und-Antwort-Blöcke im Akkordeon-Stil
   - **Video** – Ein Video über eine URL einbetten
   - **Gruppenübersicht** – Ein filterbares Verzeichnis aller Gruppen der Kirche mit optionaler Suche, Kategorie- und Kennzeichnungsfilter
   - **Icon-Merkmal** – Ein Symbol mit Titel und kurzer Beschreibung, für Merkmale oder Dienstbereiche
   - **Galerie** – Ein Raster oder Mauerwerk mit mehreren Fotos
   - **Zeugnis** – Ein oder mehrere Zitate mit Name, Rolle und Foto des Autors
   - **Social-Media-Symbole** – Verlinkte Symbole für die Social-Media-Profile Ihrer Kirche: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo und Podcast. Tragen Sie für jedes Profil, das Sie anzeigen möchten, einen Link ein; für **WhatsApp** verwenden Sie einen Link `https://wa.me/` mit Ihrer Nummer oder einen Gruppen-Einladungslink
   - **Countdown** – Ein Timer, der auf ein Datum oder eine wöchentliche Gottesdienstzeit herunterzählt
   - **Kennzahlen** – Eine Reihe großer Zahlen mit Beschriftungen (Mitglieder, Jahre, Standorte)
   - **Spendenkampagne-Fortschritt** – Eine Live-Fortschrittsanzeige für eine Spendenkampagne, die den bisher für ein Fondsziel gesammelten Betrag zeigt
   - **Mitarbeiterraster** – Fotokarten für die Mitglieder einer Gruppe; die Gruppe muss die Option **öffentliche Liste** eingeschaltet haben
   - **Gottesdienstzeiten** – Der Gottesdienstplan Ihrer Standorte, automatisch aus der Anwesenheits-Einrichtung übernommen
   - **Predigten** – Ihre Predigtbibliothek als vollständige Ansicht oder als Raster-, Listen- oder hervorgehobenes Neueste-Layout
   - **Karte** – Eine eingebettete Karte, die auf die Adresse Ihrer Kirche zentriert ist
   - **Tabelle** – Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** – Text und ein Bild nebeneinander
   - **Logo** – Das Logo Ihrer Kirche, übernommen aus [Erscheinungsbild](./appearance.md)
   - **Livestream** – Ihr Livestream-Player, direkt auf der Seite eingebettet
   - **Podcast** – Eine Liste von Episoden aus einer externen Podcast-RSS-Feed-URL, die Sie angeben, mit Einstellungen, wie viele Episoden angezeigt werden und ob Datum und Beschreibungen erscheinen. Jede Episode auf der Live-Seite hat einen Audioplayer und einen Link **Herunterladen**, der die Audiodatei der Episode unter dem Episodentitel speichert. Dies dient dazu, einen beliebigen Podcast-Feed auf Ihrer Seite hervorzuheben; um Ihre eigenen Predigten als Podcast zu veröffentlichen, lesen Sie stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed)
   - **Spende** – Eine Schaltfläche zum Geben oder ein eingebettetes Spendenformular
   - **HTML** – Ihr eigenes rohes HTML für fortgeschrittene Anwendungsfälle, etwa das Einbetten eines Drittanbieter-Widgets (siehe [Das HTML-Element verwenden](#using-the-html-element))
   - **iFrame** – Externe Inhalte über eine URL einbetten
3. Konfigurieren Sie das Element über das Einstellungsfeld, das erscheint.

### Das HTML-Element verwenden {#using-the-html-element}

Das Element **HTML** hat zwei Felder:

- **HTML-Inhalt** – Der Markup-Code, der auf der Seite angezeigt wird. Alle `<script>`-Tags, die Sie hier einfügen, laufen auf Ihrer Live-Seite.
- **JavaScript (ohne Script-Tag)** – Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch einen Einbettungscode eines Anbieters mit seinen `<script>`-Tags einfügen; er läuft dann auf der Live-Seite.

Fügen Sie nur eine Webadresse (etwa einen Bildlink) in das JavaScript-Feld ein, wird das Feld rot mit dem Hinweis *„Dies ist eine Webadresse, kein JavaScript.“* Eine bloße Adresse in diesem Feld bewirkt nichts. Um ein Bild zu zeigen, verwenden Sie ein Element **Bild** oder setzen `<img src="...">` in **HTML-Inhalt**.

### Das Kalenderelement verwenden {#using-the-calendar-element}

Das Element **Kalender** zeigt Veranstaltungen aus einem Ihrer Kalender:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (die Veranstaltungen einer Gruppe – die Liste zeigt die Gruppen, denen Sie angehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** erstellt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar.md)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender aus.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** – Ein Monatsraster, durch das Besucher blättern können.
   - **Kommende Veranstaltungen** – Ein Raster aus Kacheln für die nächsten 12 kommenden Veranstaltungen; eine wiederkehrende Veranstaltung wird einmal an ihrem nächsten Datum gezeigt. Jede Kachel zeigt das Foto der Veranstaltung (oder ihren Titel auf der dunklen Farbe Ihres Designs, wenn kein Foto vorhanden ist), eine Datumsmarke, Tag und Uhrzeit sowie die erste Zeile der Beschreibung. Eine Schaltfläche **Abonnieren** oberhalb der Kacheln erlaubt Besuchern, den ICS-Link des Kalenders zu kopieren oder ihn herunterzuladen. Für diese Anzeige erscheint eine Einstellung **Layout**: **Raster** (die Voreinstellung) oder **Scrollend (automatisch)**, die die Kacheln in eine einzige Zeile setzt, die sich von selbst weiterbewegt.
4. Um nur einige Veranstaltungen anzuzeigen, geben Sie unter **Nur Veranstaltungen mit Schlagwort** ein Schlagwort ein – zum Beispiel `jugend`. Es erscheinen nur Veranstaltungen, deren **Schlagwörter** dieses Wort enthalten. Lassen Sie das Feld leer, um jede Veranstaltung anzuzeigen. Schlagwörter werden bei jeder Veranstaltung gesetzt; siehe [Veranstaltungen hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

Bei beiden Anzeigen öffnet ein Klick auf eine Veranstaltung deren eigene Seite auf Ihrer Website. Die Veranstaltungsseite zeigt das Veranstaltungsfoto, den Titel, Datum und Uhrzeit sowie die Beschreibung, außerdem einen Kasten mit **Wann** (einschließlich des Wiederholungsmusters bei einer wiederkehrenden Veranstaltung) und **Wo** (die für sie gebuchten Räume). Ist die Anmeldung aktiviert, erscheint außerdem eine Schaltfläche **Für diese Veranstaltung anmelden**, und ein Link **Zu meinem Kalender hinzufügen** lädt die Veranstaltung als Kalenderdatei herunter. Die Seite ist so aufgebaut, dass Suchmaschinen Datum und Details der Veranstaltung in ihren Ergebnissen anzeigen können. Veranstaltungsseiten aus kuratierten Kalendern, die auf Ihren Seiten angezeigt werden (für Veranstaltungen in den nächsten sechs Monaten), sind außerdem in der Sitemap Ihrer Website aufgeführt, damit Suchmaschinen sie finden.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente am Griffsymbol (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts ziehen oder zwischen Abschnitten verschieben.

## Ihre Seite gestalten

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilfeld zu öffnen. Sie können festlegen:

- **Hintergrund** – Einfarbig, Verlauf oder Bild. Bei einem Bildhintergrund können Sie mit dem Auswahlwerkzeug **Fokuspunkt** festlegen, welcher Teil des Bildes beim Skalieren des Abschnitts zentriert bleibt, und mit der Option **Überlagerung** eine halbtransparente Tönung über das Bild legen, um die Lesbarkeit des Textes zu verbessern.
- **Innenabstand** – Abstand oben und unten innerhalb des Abschnitts
- **Breite** – Volle Breite oder zentriert/begrenzt
- **Trenner** – Dekorative Formtrenner (Welle, Schräge, Bogen, Dreieck und mehr) an der oberen oder unteren Kante des Abschnitts, mit Farbe, Höhe und Spiegelungsoptionen

### Elementstile

Klicken Sie auf ein beliebiges Element, um dessen Stilfeld zu öffnen. Häufige Optionen sind Schriftgröße, Farbe, Ausrichtung, Außenabstand und Innenabstand. Bei Bildern können Sie den Alternativtext und die Linkziele festlegen.

### Eigenes CSS

Für fortgeschrittene Gestaltung hat jeder Abschnitt und jedes Element ein Feld **Eigenes CSS**, in das Sie eigene CSS-Regeln schreiben können. Diese gelten nur für das jeweilige Element und beeinflussen den Rest der Seite nicht ungewollt.

:::tip
Wenn Sie Stile über die gesamte Website anwenden möchten – etwa eine eigene Schrift oder eine globale Farbe –, verwenden Sie die Einstellungen unter [Erscheinungsbild](./appearance.md) statt eigenem CSS auf einzelnen Seiten.
:::

## Ihre Seite vorab ansehen

Verwenden Sie die Vorschau-Steuerelemente in der Werkzeugleiste, um zu prüfen, wie Ihre Seite in verschiedenen Bildschirmgrößen aussieht:

- **Desktop** – Ansicht in voller Browserbreite
- **Mobil** – Schmale Ansicht in Telefongröße

Auf Telefonen stapeln sich die Spalten einer Zeile untereinander in voller Breite, es sei denn, Sie legen in den Einstellungen der Zeile eine **Breite auf Mobilgeräten** fest. Predigt- und Podcast-Listen stapeln auf Telefonen außerdem den Text jeder Episode unter ihrem Vorschaubild.

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, gehen Sie zurück zur Liste der Seiten und klicken Sie auf den Pfad der Seite. Er öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen

Klicken Sie in der Werkzeugleiste auf das Symbol **Barrierefreiheit**, um eine schnelle Prüfung auf typische Probleme durchzuführen – Bilder ohne Alternativtext, geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem verlinkt direkt auf das betroffene Element, sodass Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen

Der Editor führt automatisch einen Verlauf Ihrer Bearbeitungen. Verwenden Sie die Schaltflächen der Werkzeugleiste oder Tastenkürzel, um zu navigieren:

- **Rückgängig** (Strg+Z / Cmd+Z) – Die letzte Aktion zurücknehmen
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) – Eine rückgängig gemachte Aktion erneut anwenden

Sie können die Seite außerdem auf einen früheren Snapshot zurücksetzen. Klicken Sie in der Werkzeugleiste auf **Verlauf anzeigen**, um eine Liste gespeicherter Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Stand zurückzukehren.

:::warning
Das Wiederherstellen eines Snapshots ersetzt den aktuellen Seiteninhalt durch die Snapshot-Version. Dies lässt sich nicht mit der normalen Rückgängig-Schaltfläche rückgängig machen. Speichern Sie einen Snapshot Ihres aktuellen Stands, bevor Sie einen alten wiederherstellen, wenn Sie die Möglichkeit behalten möchten, zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden während der Arbeit automatisch gespeichert. Eine Statusanzeige in der Werkzeugleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurf und veröffentlichter Zustand

Seiten können einen Zustand **veröffentlicht** haben, der steuert, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt einen Statuschip mit dem aktuellen Zustand:

- **Beim Speichern live** – Die Seite verwendet keinen Veröffentlichungsablauf. Jede gespeicherte Änderung geht sofort live. Dies ist die Voreinstellung für neue Seiten.
- **Nicht veröffentlichte Änderungen** – Die Seite wurde bereits veröffentlicht, Sie haben seitdem aber Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Version.
- **Veröffentlicht** – Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Werkzeugleiste auf die Schaltfläche **Veröffentlichen**. Die Seite ist sofort live.

Um zur zuletzt veröffentlichten Version zurückzukehren, ohne das zu beeinflussen, was Besucher sehen, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Nicht veröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsablauf nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung ausschalten**. Bearbeitungen gehen dann wieder sofort live.

:::tip
Nutzen Sie den Entwurfs- und Veröffentlichungsablauf, wenn Sie eine Seite vorbereiten möchten – etwa für eine bevorstehende Veranstaltung – und sie erst im richtigen Moment live schalten wollen. Bauen und prüfen Sie die Seite und klicken Sie dann auf Veröffentlichen, sobald Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](./managing-pages.md) – Seiten anlegen, Adressen festlegen und die Navigation der Website verwalten
- [Erscheinungsbild](./appearance.md) – Farben, Schriften und Branding der gesamten Website festlegen
- [Dateien](./files.md) – Bilder und Dokumente hochladen, die Sie im Editor verwenden möchten
- [Formulare erstellen](../forms/creating-forms.md) – Formulare bauen, die Sie auf Seiten einbetten können
