---
title: "Seiten verwalten"
description: "Erstellen, bearbeiten und ordnen Sie Seiten und Navigation in der Ansicht Website-Seiten von B1 Admin, einschließlich Seiteneinstellungen, Weiterleitungen und Site-Vorlagen."
---

# Seiten verwalten

<div class="article-intro">

Die Ansicht Website-Seiten ist Ihre zentrale Stelle, um alle Seiten Ihrer Gemeindewebsite zu erstellen, zu bearbeiten und zu ordnen. Sie verwalten Seiteninhalte und Navigation Ihrer Website von diesem einen Bildschirm aus.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Schließen Sie die [Ersteinrichtung](./initial-setup.md) ab, um Domain und grundlegende Website-Einstellungen zu konfigurieren
- Halten Sie Ihre Inhalte und Bilder bereit. Laden Sie Medien zuerst über den Dateiverwalter [Dateien](./files.md) hoch.
- Verwenden Sie einen Computer oder ein Tablet. Die Ansicht Website-Seiten und der Seiteneditor benötigen einen Bildschirm, der mindestens etwa 880 Pixel breit ist. Auf einem Telefon sehen Sie eine Meldung, die Sie bittet, zu einem größeren Bildschirm zu wechseln.

</div>

:::info
Hat Ihre Gemeinde mehr als eine Website (zum Beispiel eigene Websites pro Standort), wechseln Sie über den Website-Umschalter oben in der Ansicht Website-Seiten zwischen ihnen. Jede Website hat eigene Seiten, eigene Navigation und eigene [Erscheinungsbild](./appearance.md)-Einstellungen. Siehe unten [Mehrere Websites](#multiple-websites).
:::

## Seitentypen verstehen {#understanding-page-types}

Die Tabelle **Seiten** listet jede Seite Ihrer Website nach **Pfad** und **Titel** auf. Es gibt zwei Arten von Seiten:

- **Generiert** -- Seiten, die das System automatisch anhand der Daten Ihrer Gemeinde erstellt hat (zum Beispiel eine Seite Gruppen, eine Seite Predigten oder eine eigene Seite für jede Predigt in Ihrer Bibliothek). Diese Seiten tragen die Kennzeichnung **Generiert** und aktualisieren sich selbst, wenn sich Ihre Daten ändern.
- **Eigene** -- Seiten, die Sie selbst mit eigenen Inhalten und eigenem Layout erstellt haben.

Sie können jede automatisch erzeugte Seite in eine eigene Seite umwandeln, wenn Sie ihren Inhalt und ihr Design vollständig kontrollieren möchten. Klicken Sie neben der generierten Seite auf **Umwandeln** und dann auf **Bestätigen**. Das Dialogfeld **Neue Seite** öffnet sich; geben Sie der Seite einen Titel und klicken Sie auf **Speichern**. Ihre neue eigene Seite übernimmt den Pfad der generierten Seite, und Sie können sie anschließend im [Seiteneditor](./page-editor.md) gestalten.

## Seiten hinzufügen und bearbeiten {#adding-and-editing-pages}

1. Klicken Sie oben rechts in der Ansicht Website-Seiten auf die Schaltfläche **Seite hinzufügen**.
2. Wählen Sie einen Seitentyp und geben Sie einen **Seitentitel** ein, dann klicken Sie auf **Speichern**. **Leer** startet eine leere Seite; **Predigten**, **Über uns**, **Spenden** und **Standort** füllen einen passenden Vorschlagstitel für diesen Seitentyp ein; **KI** erstellt einen ersten Entwurf der Seite aus einer kurzen Beschreibung, die Sie eingeben. Der Pfad der Seite wird aus ihrem Titel gebildet (zum Beispiel wird „Unser Team“ zu `/our-team`), und Sie können ihn später unter **Seiteneinstellungen** ändern.
3. Klicken Sie neben einer beliebigen Seite auf **Inhalt bearbeiten**, um den [Seiteneditor](./page-editor.md) zu öffnen, wo Sie Abschnitte, Texte, Bilder und andere Elemente hinzufügen können.
4. Klicken Sie neben einer Seite auf **Seiteneinstellungen**, um Seitentitel, URL-Pfad und weitere Metadaten zu ändern.
5. Klicken Sie in der Spalte **Pfad** auf den Pfad einer Seite, um die Live-Seite in einem neuen Tab zu öffnen und genau zu sehen, wie sie für Besucher aussieht.

:::tip
Setzen Sie für Ihre Startseite den URL-Pfad auf nur `/`. Verwenden Sie für alle anderen Seiten einen aussagekräftigen Pfad wie `/about` oder `/contact`.
:::

### Seiteneinstellungen {#page-settings}

Öffnen Sie **Seiteneinstellungen** bei einer beliebigen Seite, um Folgendes festzulegen:

- **Seitentitel** -- Der Name der Seite.
- **Layout** -- **Kopfzeile und Fußzeile** (die Navigationsleiste und die Fußzeile Ihrer Website um die Seite herum, der Standard) oder **Schlichter zentrierter Inhalt** (nur der Seiteninhalt, in einer zentrierten Karte auf hellgrauem Hintergrund, ohne Navigationsleiste oder Fußzeile – praktisch für eine einfache Anmeldeseite oder Landingpage).
- **URL-Pfad** -- Die Adresse der Seite auf Ihrer Website. Klicken Sie auf den Stift, um sie zu ändern, und dann auf **Prüfen**, um sicherzustellen, dass der Pfad gültig ist und noch nicht verwendet wird.
- **Sichtbarkeit** -- Legen Sie fest, wer die Seite sehen kann: **Alle**, **Angemeldete Benutzer**, **Mitglieder und Mitarbeitende**, **Nur Mitarbeitende**, **Teammitglieder** oder **Bestimmte Gruppen** (dann die Gruppen anhaken). So schützen Sie eine nicht öffentliche Seite (etwa eine Arbeitshilfe für Mitarbeitende) ohne separates Passwort. Nicht angemeldete Besucher sehen „Diese Seite ist für Gemeindemitglieder“ mit einer Schaltfläche **Anmelden**; angemeldete Personen, mit denen die Seite nicht geteilt wird, sehen „Sie haben keinen Zugriff auf diese Seite.“ Geschützte Seiten werden aus Ihrer Sitemap ausgelassen.
- **Meta-Beschreibung** -- Eine kurze Zusammenfassung, die in Suchmaschinenergebnissen und in Linkvorschauen in sozialen Medien erscheint. Zielen Sie auf etwa 155 Zeichen, oder klicken Sie auf **Mit KI erstellen**, um eine aus dem Inhalt der Seite entwerfen zu lassen.

Das Dialogfeld hat außerdem eine Schaltfläche **Duplizieren**, die eine Kopie der Seite samt ihrem gesamten Inhalt erstellt, und eine Schaltfläche **Löschen**, die die Seite dauerhaft entfernt.

:::tip
Um eine alte Adresse auf eine Seite umzuleiten (zum Beispiel nachdem Sie `/about-us` in `/about` umbenannt haben), fügen Sie unter **Weiterleitungen und Analyse** im Bereich [Erscheinungsbild](./appearance.md#redirects--analytics) eine Weiterleitung hinzu.
:::

## Navigation verwalten {#managing-navigation}

Der Bereich **Hauptnavigation** auf der rechten Seite der Ansicht Website-Seiten zeigt Ihre Navigationslinks. Diese Links bestimmen das Menü, das Besucher auf Ihrer Website sehen.

1. Klicken Sie auf **Hinzufügen**, um einen neuen Navigationslink zu erstellen. Sie können ihn auf eine beliebige Seite Ihrer Website oder auf eine externe URL richten.
2. Um Links neu anzuordnen, ziehen Sie sie per Drag-and-Drop in die gewünschte Reihenfolge. Sie können Links auch unter einem übergeordneten Eintrag verschachteln, um Dropdown-Menüs zu erstellen.
3. Klicken Sie auf einen Link, um dessen **Linkeinstellungen** zu öffnen, wo Sie Text, URL oder übergeordnete Seite ändern können.
4. Um einen Link aus der Navigation zu entfernen, öffnen Sie seine **Linkeinstellungen** und klicken Sie auf **Löschen**.

:::info
Das Entfernen eines Navigationslinks löscht die Seite selbst nicht. Die Seite existiert weiterhin und ist direkt über ihre URL erreichbar – sie wird lediglich nicht mehr im Menü angezeigt.
:::

## Websiteweite Schalter {#site-wide-switches}

Unterhalb der Links im Bereich **Hauptnavigation** befinden sich zwei Schalter, die für Ihre gesamte Gemeindewebsite gelten:

- **Anmeldung anzeigen** -- Zeigt eine Schaltfläche **Anmelden** in der Navigationsleiste Ihrer Website an.
- **Öffentliche Website deaktivieren** -- Schaltet Ihre öffentliche Website ab. Nutzen Sie dies, wenn Ihre Gemeinde B1 nur für das Mitgliederportal, Spenden und Anmeldungen verwendet und ihre Hauptwebsite anderswo betreibt.

### Was das Deaktivieren der öffentlichen Website bewirkt {#what-disabling-the-public-website-does}

Ist **Öffentliche Website deaktivieren** aktiviert:

- Jede öffentliche Seite, auch die Startseite und Ihre eigenen Seiten, leitet nicht angemeldete Besucher zur Anmeldeseite weiter. Nach der Anmeldung kehren sie zu der Seite zurück, die sie aufrufen wollten.
- Angemeldete Mitglieder sehen die vollständige Website wie gewohnt, einschließlich Ihrer Navigation und der eingebauten **generierten** Seiten (etwa Gruppen und Predigten). Generierte Seiten erscheinen nicht mehr in der Tabelle Seiten.
- Suchmaschinen werden angewiesen, die Website nicht zu indexieren. Die Sitemap ist leer, und die `robots.txt` blockiert jedes Crawling.

Diese Links funktionieren weiterhin, sodass Mitglieder und Gäste sie erreichen können:

- Anmeldung und Abmeldung
- Das Mitgliederportal (alles unter `/mobile`)
- Links zur [Veranstaltungsanmeldung](../guides/event-registration.md) und zur Gästeanmeldung

Solange die öffentliche Website deaktiviert ist, erscheint unter dem Schalter eine Warnung. Schalten Sie den Schalter wieder aus, um Ihre Seiten zurückzubringen. Während die Website deaktiviert ist, wird nichts gelöscht.

:::info
Diese Einstellung gilt für Ihre gesamte Gemeinde. Haben Sie mehr als eine Website, schaltet sie alle ab – nicht nur die, die im Website-Umschalter ausgewählt ist.
:::

## Tipps zur Organisation Ihrer Website {#tips-for-organizing-your-site}

- Halten Sie Ihre oberste Navigationsebene bei fünf oder sechs Einträgen, damit Besucher schnell finden, was sie suchen.
- Verwenden Sie verschachtelte Links für zusammengehörige Unterseiten (etwa ein Dropdown „Über uns“ mit „Unser Team“, „Glaubensgrundsätze“ und „Geschichte“).
- Prüfen Sie Ihre Navigation auf einem Telefon, damit sie auf kleineren Bildschirmen gut funktioniert.
- Geben Sie Seiten klare, aussagekräftige Namen, die Besuchern verdeutlichen, was sie dort finden.

:::tip
Sie können Ihren Seiten [Formulare](../forms/creating-forms.md) hinzufügen, um Anmeldungen, Gebetsanliegen oder andere Informationen von Besuchern zu sammeln.
:::

## Mit einer Site-Vorlage beginnen {#starting-from-a-site-template}

Wenn Sie Ihre Website von Grund auf aufbauen, können Sie sie mit einer **Site-Vorlage** starten, statt Seiten einzeln anzulegen. Eine Site-Vorlage erstellt eine Reihe vorgefertigter Seiten – Startseite, Über uns, Kontakt, Spenden und weitere – mit Platzhalterinhalt und bereits verknüpften Navigationslinks.

1. Klicken Sie auf der Seite Seiten auf die Schaltfläche **Mit einer Vorlage starten** (neben der Schaltfläche **Seite hinzufügen**).
2. Durchsuchen Sie die verfügbaren Vorlagen (etwa **Klassisch**, **Modern**, **Gemeinschaft** und **Besucherorientiert**) und klicken Sie auf eine, um ihre Seiten und die Navigationslinks, die sie hinzufügt, in der Vorschau zu sehen.
3. Wenn Sie eine gefunden haben, die Ihnen gefällt, klicken Sie auf **Website erstellen**.
4. Seiten, die noch nicht existieren, werden angelegt und Ihrer Navigation hinzugefügt. Seiten, die Sie bereits haben, werden mit **Existiert bereits** markiert und unverändert gelassen. Die erste neue Seite öffnet sich danach, damit Sie sie durchsehen können.

Öffnen Sie nach dem Anwenden einer Vorlage jede Seite im [Seiteneditor](./page-editor.md), um den Platzhaltertext und die Bilder durch die echten Inhalte Ihrer Gemeinde zu ersetzen.

:::info
Eine Vorlage legt Farben und Schriften nur für eine Website fest, für die noch nie eine Farbpalette gespeichert wurde. Sobald Sie Ihre eigene Palette gewählt haben, lässt das Anwenden einer Vorlage Ihre Farben und Schriften unverändert – diese bleiben unter [Erscheinungsbild](./appearance.md).
:::

## Mehrere Websites {#multiple-websites}

Eine Gemeinde kann über dasselbe Konto mehr als eine Website betreiben – zum Beispiel eine pro Standort oder eine eigene Website für eine Schule.

1. Öffnen Sie in der Ansicht Seiten den Website-Umschalter (zunächst steht dort **Hauptwebsite**) und wählen Sie **Websites verwalten…**.
2. Geben Sie im Dialogfeld **Websites** einen **Namen** und eine **Subdomain** ein (nur Kleinbuchstaben und Ziffern – sie wird zu `{subdomain}.b1.church`) und klicken Sie auf **Website hinzufügen**.
3. Wählen Sie die neue Website im Website-Umschalter aus, um ihre Seiten, Navigation, Blöcke und ihr Erscheinungsbild zu gestalten.

Um eine Website zu entfernen, öffnen Sie **Websites verwalten…** und klicken Sie daneben auf **Löschen**. Ihre Seiten, Navigation und ihr Erscheinungsbild werden dauerhaft gelöscht, und eigene Domains, die sie hatte, wandern auf die Hauptwebsite.

## Bildvergrößerung {#image-lightbox}

Klickt ein Besucher auf Ihrer Website auf ein Bild, öffnet es sich in einer Vollbild-Überlagerung. So können sich Besucher Fotos in größerer Darstellung ansehen, ohne die Seite zu verlassen. Es ist keine Konfiguration nötig – die Vergrößerung ist für Bilder in Ihrem Seiteninhalt automatisch aktiviert.

## Nächste Schritte {#next-steps}

- [Ersteinrichtung](./initial-setup.md) -- Anleitung für die Ersteinrichtung
- [Den Seiteneditor verwenden](./page-editor.md) -- Erfahren Sie, wie Sie Seiteninhalte gestalten
- [Erscheinungsbild](./appearance.md) -- Das visuelle Design Ihrer Website anpassen
- [Dateien](./files.md) -- Medien für Ihre Seiten hochladen und verwalten
