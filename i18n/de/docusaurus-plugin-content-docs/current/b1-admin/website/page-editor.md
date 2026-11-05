---
title: "Den Seiteneditor verwenden"
---

# Den Seiteneditor verwenden

<div class="article-intro">

Der B1-Seiteneditor ist ein visueller Baukasten mit Drag & Drop, mit dem Sie die Seiten Ihrer Kirchenwebsite ohne Programmierkenntnisse gestalten. Sie können Abschnitte und Inhaltsblöcke hinzufügen, Stile anpassen, Ihre Arbeit in der Vorschau ansehen und Änderungen rückgängig machen -- alles direkt im Browser.

</div>

## Einführungsvideo

<YouTube id="m2B_JxmfFm4" title="Seiten und Navigation in B1 bearbeiten" next="Eine eigene Domain in B1 verbinden" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [erste Einrichtung](initial-setup) ab, damit Ihre Website konfiguriert ist
- Legen Sie mindestens eine Seite unter [Seiten verwalten](managing-pages) an
- Sie benötigen die Berechtigung **content.edit**, um auf den Editor zuzugreifen

</div>

## Den Editor öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Website** auf und klicken Sie auf **Seiten**.
2. Suchen Sie in der Tabelle der Seiten die Seite, die Sie bearbeiten möchten, und klicken Sie auf **Inhalt bearbeiten**.

Der Editor öffnet sich im Vollbildmodus. Das linke Feld zeigt die Struktur Ihrer Seite und die verfügbaren Inhaltselemente; im mittleren Bereich sehen Sie eine Live-Vorschau Ihrer Seite.

:::info
Der Editor wird immer im hellen Modus angezeigt, unabhängig von der Designeinstellung Ihres B1 Admin, und verwendet die Schriftarten für Überschriften und Fließtext, die Sie unter [Erscheinungsbild](appearance) gewählt haben. So stimmt die Vorschau genau mit dem überein, wie Ihre Seite für Besucher aussehen wird.
:::

## Seitenstruktur: Abschnitte und Elemente

Jede Seite besteht aus zwei Ebenen:

- **Abschnitte** -- Die obersten Container, die Ihre Seite in horizontale Bänder unterteilen (zum Beispiel ein Hero-Bereich, ein Inhaltsblock oder ein Fußbereich). Jede Seite braucht mindestens einen Abschnitt, bevor Sie Inhalte hinzufügen können.
- **Elemente** -- Die einzelnen Inhalte innerhalb eines Abschnitts, etwa Text, Bilder, Schaltflächen, Karten, Formulare und Kalender.

### Einen Abschnitt hinzufügen

1. Klicken Sie auf **Abschnitt hinzufügen** (oder auf die Schaltfläche **+** oben im linken Feld).
2. Wählen Sie, wie Sie beginnen möchten:
   - **Aus einer Vorlage** -- Durchsuchen Sie die Galerie der Abschnittsvorlagen, geordnet nach Kategorien (Hero, Über uns, Gottesdienste, Spenden usw.), und klicken Sie auf eine, um sie als vollständig gestalteten, vorbefüllten Abschnitt einzufügen. Sie können danach alles anpassen.
   - **Leerer Abschnitt** -- Wählen Sie ein Spaltenlayout (einspaltig, zweispaltig, dreispaltig usw.) und bauen Sie von Grund auf.
3. Der neue Abschnitt erscheint in der Vorschau. Klicken Sie darauf, um ihn auszuwählen und Hintergrundfarbe, Innenabstand und weitere Stileinstellungen zu konfigurieren.

### Das Layout eines Abschnitts wechseln

Haben Sie einen Abschnitt bereits gestaltet, möchten aber eine andere Struktur? Verwenden Sie den Layout-Umschalter dieses Abschnitts, um seine Spaltenanordnung gegen eine andere aus der Galerie zu tauschen. Ihre bestehenden Inhalte und Elemente bleiben dabei an Ort und Stelle.

### Elemente zu einem Abschnitt hinzufügen

1. Klicken Sie in der Vorschau innerhalb eines Abschnitts, um ihn auszuwählen.
2. Klicken Sie auf **Inhalt hinzufügen** und wählen Sie einen Elementtyp aus der Liste:
   - **Text** -- Überschriften, Absätze und Rich-Text
   - **Bild** -- Ein Foto hochladen oder darauf verlinken
   - **Schaltfläche** -- Ein anklickbarer Aufruf zum Handeln (Call-to-Action)
   - **Karte** -- Ein Bild mit Titel und Beschreibung
   - **Formular** -- Ein [Formular](../forms/creating-forms) direkt auf der Seite einbetten. Hat das Formular ein [Kopfbild](../forms/creating-forms.md#adding-a-header-photo), erscheint es oberhalb der Fragen
   - **Kalender** -- Einen Veranstaltungskalender anzeigen
   - **FAQ** -- Aufklappbare Blöcke mit Fragen und Antworten
   - **Video** -- Ein Video über eine URL einbetten
   - **Gruppenübersicht** -- Ein filterbares Verzeichnis aller Gruppen der Kirche mit optionaler Suche, Kategorienfilter und Bezeichnungsfilter
   - **Symbol-Merkmal** -- Ein Symbol mit Titel und kurzer Beschreibung, für Highlights von Angeboten oder Diensten
   - **Galerie** -- Ein Raster oder Masonry-Layout mit mehreren Fotos
   - **Zeugnis** -- Ein oder mehrere Zitate mit Name, Rolle und Foto des Autors
   - **Social-Media-Symbole** -- Verlinkte Symbole für die Profile Ihrer Kirche in sozialen Netzwerken: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo und Podcast. Tragen Sie für jedes Symbol, das angezeigt werden soll, einen Link ein; bei **WhatsApp** verwenden Sie einen Link `https://wa.me/` mit Ihrer Nummer oder einen Gruppen-Einladungslink
   - **Countdown** -- Ein Timer, der auf ein Datum oder eine wöchentliche Gottesdienstzeit herunterzählt
   - **Statistiken** -- Eine Reihe großer Zahlen mit Bezeichnungen (Mitglieder, Jahre, Standorte)
   - **Spendenkampagne-Fortschritt** -- Ein Live-Fortschrittsbalken für eine Spendenkampagne, der den bisher gesammelten Betrag für ein Fondsziel zeigt
   - **Mitarbeiterraster** -- Fotokarten für die Mitglieder einer Gruppe; die Gruppe muss die Option **öffentliche Teilnehmerliste** aktiviert haben
   - **Gottesdienstzeiten** -- Die Gottesdienstpläne Ihrer Standorte, automatisch aus der Anwesenheitseinrichtung übernommen
   - **Predigten** -- Ihre Predigtbibliothek, als vollständige Ansicht oder als Raster, Liste oder hervorgehobene neueste Predigt
   - **Karte** -- Eine eingebettete Karte, zentriert auf die Adresse Ihrer Kirche
   - **Tabelle** -- Ein einfaches Raster aus Zeilen und Spalten für tabellarische Inhalte
   - **Text mit Foto** -- Text und ein Bild nebeneinander
   - **Logo** -- Das Logo Ihrer Kirche, übernommen aus [Erscheinungsbild](appearance)
   - **Livestream** -- Ihr Livestream-Player, direkt auf der Seite eingebettet
   - **Podcast** -- Eine Liste von Folgen, die aus einer externen Podcast-RSS-Feed-URL stammen, die Sie angeben, mit Einstellungen, wie viele Folgen angezeigt werden und ob Datum und Beschreibungen erscheinen. Jede Folge auf der Live-Website hat einen Audioplayer und einen Link **Herunterladen**, der die Audiodatei der Folge unter dem Folgentitel speichert. Damit lässt sich jeder Podcast-Feed auf Ihrer Website hervorheben; um Ihre eigenen Predigten als Podcast zu veröffentlichen, lesen Sie stattdessen [Predigten verwalten](../sermons/managing-sermons.md#your-podcast-feed)
   - **Spende** -- Eine Schaltfläche zum Geben oder ein eingebettetes Spendenformular
   - **HTML** -- Ihr eigenes rohes HTML, für fortgeschrittene Anwendungsfälle wie das Einbetten eines Widgets eines Drittanbieters (siehe [Das HTML-Element verwenden](#using-the-html-element))
   - **iFrame** -- Externe Inhalte über eine URL einbetten
3. Konfigurieren Sie das Element über das Einstellungsfeld, das erscheint.

### Das HTML-Element verwenden {#using-the-html-element}

Das Element **HTML** hat zwei Felder:

- **HTML-Inhalt** -- Das Markup, das auf der Seite angezeigt wird. Alle `<script>`-Tags, die Sie hier einfügen, laufen auf Ihrer Live-Website.
- **JavaScript (ohne script-Tag)** -- Skriptcode, der beim Laden der Seite ausgeführt wird. Sie können hier auch den Einbettungscode eines Anbieters einfügen, einschließlich seiner `<script>`-Tags, und er wird auf der Live-Website ausgeführt.

Fügen Sie in das JavaScript-Feld nur eine Webadresse ein (etwa einen Bildlink), wird das Feld rot und zeigt die Warnung *"Dies ist eine Webadresse, kein JavaScript."* Eine bloße Adresse in diesem Feld bewirkt nichts. Um ein Bild anzuzeigen, verwenden Sie ein Element **Bild** oder fügen `<img src="...">` in **HTML-Inhalt** ein.

### Das Kalender-Element verwenden {#using-the-calendar-element}

Das Element **Kalender** zeigt Veranstaltungen aus einem Ihrer Kalender an:

1. Wählen Sie unter **Auswahl** entweder **Gruppenkalender** (die Veranstaltungen einer Gruppe -- die Liste zeigt die Gruppen, zu denen Sie gehören) oder **Kuratierter Kalender** (ein Kalender, den Sie unter **Kalender** erstellt haben; siehe [Kuratierter Kalender](../calendars/curated-calendar)).
2. Wählen Sie unter **Kalender auswählen** die Gruppe oder den Kalender.
3. Wählen Sie unter **Anzeige**, wie er dargestellt werden soll:
   - **Monatskalender** -- Ein Monatsraster, durch das Besucher blättern können.
   - **Kommende Veranstaltungen** -- Ein Raster aus Kacheln für die nächsten 12 Veranstaltungen; eine wiederkehrende Veranstaltung wird an ihrem nächsten Termin einmal angezeigt. Jede Kachel zeigt das Foto der Veranstaltung (oder ihren Titel auf der dunklen Farbe Ihres Designs, falls kein Foto vorhanden ist), ein Datumsabzeichen, Tag und Uhrzeit sowie die erste Zeile der Beschreibung. Eine Schaltfläche **Abonnieren** oberhalb der Kacheln erlaubt Besuchern, den ICS-Link des Kalenders zu kopieren oder ihn herunterzuladen. Für diese Anzeige erscheint eine Einstellung **Layout**: **Raster** (der Standard) oder **Scrollend (automatisch)**, die die Kacheln in einer einzigen Zeile anordnet, die sich von selbst weiterbewegt.
4. Um nur bestimmte Veranstaltungen anzuzeigen, geben Sie unter **Nur Veranstaltungen mit Tag** einen Tag ein -- zum Beispiel `jugend`. Es erscheinen nur Veranstaltungen, deren **Tags** dieses Wort enthalten. Lassen Sie das Feld leer, um alle Veranstaltungen anzuzeigen. Die Tags werden bei jeder Veranstaltung festgelegt; siehe [Veranstaltungen hinzufügen und bearbeiten](../calendars/creating-calendars.md#adding-and-editing-events).

Bei beiden Anzeigen öffnet ein Klick auf eine Veranstaltung deren eigene Seite auf Ihrer Website. Die Veranstaltungsseite zeigt das Foto, den Titel, Datum und Uhrzeit sowie die Beschreibung der Veranstaltung, außerdem ein Feld mit **Wann** (einschließlich des Wiederholungsmusters bei wiederkehrenden Veranstaltungen) und **Wo** (die für sie gebuchten Räume). Sie enthält außerdem die Schaltfläche **Für diese Veranstaltung anmelden**, sofern die Anmeldung aktiviert ist, und einen Link **Zu meinem Kalender hinzufügen**, der die Veranstaltung als Kalenderdatei herunterlädt. Die Seite ist so aufgebaut, dass Suchmaschinen Datum und Details der Veranstaltung in ihren Ergebnissen anzeigen können. Veranstaltungsseiten aus kuratierten Kalendern, die auf Ihren Seiten angezeigt werden (für Veranstaltungen der nächsten sechs Monate), werden außerdem in der Sitemap Ihrer Website aufgeführt, damit Suchmaschinen sie finden können.

### Inhalte neu anordnen

Ziehen Sie Abschnitte oder Elemente am Griff (sechs Punkte) auf der linken Seite jedes Eintrags, um sie neu anzuordnen. Sie können Elemente innerhalb eines Abschnitts verschieben oder zwischen Abschnitten bewegen.

## Ihre Seite gestalten

### Abschnittsstile

Klicken Sie auf einen beliebigen Abschnitt, um dessen Stilfeld zu öffnen. Sie können festlegen:

- **Hintergrund** -- Volltonfarbe, Verlauf oder Bild. Bei einem Bildhintergrund können Sie mit dem Werkzeug **Fokuspunkt** durch Anklicken festlegen, welcher Teil des Bildes beim Skalieren des Abschnitts zentriert bleibt. Mit der Option **Überlagerung** legen Sie eine halbtransparente Tönung über das Bild, um die Lesbarkeit des Textes zu verbessern.
- **Innenabstand** -- Abstand oben und unten innerhalb des Abschnitts
- **Breite** -- Volle Breite oder zentriert/begrenzt
- **Trennlinien** -- Dekorative Formtrenner (Welle, Schräge, Bogen, Dreieck und weitere) an der oberen oder unteren Kante des Abschnitts, mit Farbe, Höhe und Spiegelung

### Elementstile

Klicken Sie auf ein beliebiges Element, um dessen Stilfeld zu öffnen. Übliche Optionen sind Schriftgröße, Farbe, Ausrichtung, Außenabstand und Innenabstand. Bei Bildern können Sie Alternativtext und Linkziele festlegen.

### Benutzerdefiniertes CSS

Für fortgeschrittene Gestaltung besitzt jeder Abschnitt und jedes Element ein Feld **Benutzerdefiniertes CSS**, in das Sie eigene CSS-Regeln schreiben können. Diese gelten nur für das jeweilige Element und beeinflussen daher nicht unbeabsichtigt den Rest der Seite.

:::tip
Wenn Sie Stile auf Ihre gesamte Website anwenden möchten -- etwa eine eigene Schriftart oder eine globale Farbe -- nutzen Sie die Einstellungen unter [Erscheinungsbild](appearance) statt benutzerdefiniertem CSS auf einzelnen Seiten.
:::

## Ihre Seite in der Vorschau ansehen

Nutzen Sie die Vorschau-Steuerung in der Werkzeugleiste, um zu prüfen, wie Ihre Seite auf verschiedenen Bildschirmgrößen aussieht:

- **Desktop** -- Ansicht in voller Browserbreite
- **Mobil** -- Schmale Ansicht im Telefonformat

Auf Telefonen werden die Spalten einer Zeile untereinander und in voller Breite angeordnet, sofern Sie in den Einstellungen der Zeile keine **Breite auf Mobilgeräten** festlegen. Auch Listen mit Predigten und Podcast-Folgen zeigen auf Telefonen den Text jeder Folge unter dem Vorschaubild.

Um die Live-Seite genau so zu sehen, wie Besucher sie sehen, gehen Sie zurück zur Liste der Seiten und klicken Sie auf den Pfad der Seite. Sie öffnet sich in einem neuen Browser-Tab.

## Barrierefreiheit prüfen

Klicken Sie in der Werkzeugleiste auf das Symbol **Barrierefreiheit**, um eine schnelle Prüfung auf häufige Probleme auszuführen -- Bilder ohne Alternativtext, geringer Farbkontrast oder Überschriften in falscher Reihenfolge. Jedes Problem führt direkt zu dem Element, das Aufmerksamkeit braucht, sodass Sie es an Ort und Stelle beheben können.

## Änderungen rückgängig machen

Der Editor verfolgt Ihren Bearbeitungsverlauf automatisch. Verwenden Sie die Schaltflächen der Werkzeugleiste oder Tastenkürzel zur Navigation:

- **Rückgängig** (Strg+Z / Cmd+Z) -- Macht Ihre letzte Aktion rückgängig
- **Wiederholen** (Strg+Umschalt+Z oder Strg+Y / Cmd+Umschalt+Z) -- Wendet eine rückgängig gemachte Aktion erneut an

Sie können die Seite auch auf einen früheren Snapshot zurücksetzen. Klicken Sie in der Werkzeugleiste auf **Verlauf anzeigen**, um eine Liste gespeicherter Snapshots mit Beschreibungen zu sehen, und klicken Sie auf einen Eintrag, um zu diesem Stand zurückzukehren.

:::warning
Das Wiederherstellen eines Snapshots ersetzt den aktuellen Seiteninhalt durch die Fassung des Snapshots. Dies lässt sich mit der normalen Rückgängig-Schaltfläche nicht rückgängig machen. Speichern Sie einen Snapshot Ihres aktuellen Stands, bevor Sie einen alten wiederherstellen, wenn Sie die Möglichkeit behalten möchten, zurückzukehren.
:::

## Speichern und Veröffentlichen

Änderungen werden während der Arbeit automatisch gespeichert. Eine Statusanzeige in der Werkzeugleiste zeigt, ob Ihre Änderungen gespeichert wurden.

### Entwurfs- und Veröffentlichungsstatus

Seiten können einen Status **veröffentlicht** haben, der steuert, wann Besucher Ihre Änderungen sehen. Die Werkzeugleiste zeigt einen Statusanzeiger mit dem aktuellen Zustand:

- **Sofort live beim Speichern** -- Die Seite verwendet keinen Veröffentlichungsablauf. Jede gespeicherte Änderung geht sofort live. Dies ist der Standard für neue Seiten.
- **Unveröffentlichte Änderungen** -- Die Seite wurde bereits veröffentlicht, aber Sie haben seit der letzten Veröffentlichung Änderungen vorgenommen. Besucher sehen weiterhin die zuletzt veröffentlichte Fassung.
- **Veröffentlicht** -- Die Seite ist live, und Ihr gespeicherter Inhalt entspricht dem, was Besucher sehen.

Um Ihre Änderungen zu veröffentlichen, klicken Sie in der Werkzeugleiste auf die Schaltfläche **Veröffentlichen**. Die Seite ist danach sofort live.

Um zur zuletzt veröffentlichten Fassung zurückzukehren, ohne die Ansicht der Besucher zu beeinflussen, öffnen Sie das Überlaufmenü (⋮) und klicken Sie auf **Unveröffentlichte Änderungen verwerfen**.

Um den Veröffentlichungsablauf nicht mehr zu verwenden, öffnen Sie das Überlaufmenü und klicken Sie auf **Veröffentlichung deaktivieren**. Änderungen gehen dann wieder sofort live.

:::tip
Nutzen Sie den Entwurfs- und Veröffentlichungsablauf, wenn Sie eine Seite vorbereiten möchten -- etwa für eine kommende Veranstaltung -- und sie erst im richtigen Moment live schalten wollen. Erstellen und prüfen Sie die Seite in der Vorschau und klicken Sie auf Veröffentlichen, wenn Sie bereit sind.
:::

## Verwandte Artikel

- [Seiten verwalten](managing-pages) -- Seiten erstellen, Adressen festlegen und die Navigation der Website verwalten
- [Erscheinungsbild](appearance) -- Website-weite Farben, Schriften und Branding festlegen
- [Dateien](files) -- Bilder und Dokumente für den Editor hochladen
- [Formulare erstellen](../forms/creating-forms) -- Formulare erstellen, die Sie auf Seiten einbetten können
