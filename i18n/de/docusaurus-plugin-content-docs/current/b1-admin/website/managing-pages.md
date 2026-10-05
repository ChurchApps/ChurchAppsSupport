---
title: "Seiten verwalten"
---

# Seiten verwalten

<div class="article-intro">

Die Website Pages-Ansicht ist Ihre zentrale Anlaufstelle zum Erstellen, Bearbeiten und Organisieren aller Seiten auf Ihrer Kirchenwebsite. Sie können sowohl den Seiteninhalt als auch die Navigation Ihrer Website von diesem einzigen Bildschirm aus verwalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie die [Initiale Einrichtung](initial-setup) durch, um Ihre Domäne und die grundlegenden Website-Einstellungen zu konfigurieren
- Halten Sie Ihren Inhalt und Ihre Bilder bereit. Verwenden Sie zunächst den [Files](files)-Manager, um Mediendateien hochzuladen.

</div>

:::info
Wenn Ihre Kirche mehr als eine Website hat (zum Beispiel separate Websites pro Campus), verwenden Sie die Site-Umschaltung oben in der Website Pages-Ansicht, um zwischen ihnen zu wechseln. Jede Website hat ihre eigenen Seiten, Navigation und [Appearance](appearance)-Einstellungen.
:::

## Verstehen von Seitentypen

Die **Pages**-Tabelle listet jede Seite auf Ihrer Website zusammen mit ihrem Status auf:

- **Generated** -- Seiten, die automatisch vom System basierend auf Ihren Kirchendaten erstellt wurden (zum Beispiel eine Gruppen-Seite, eine Sermons-Seite oder eine einzelne Seite für jede Predigt in Ihrer Bibliothek). Diese Seiten aktualisieren sich selbst, wenn sich Ihre Daten ändern.
- **Custom** -- Seiten, die Sie selbst mit Ihrem eigenen Inhalt und Layout erstellt haben.

Sie können jede automatisch generierte Seite in eine benutzerdefinierte Seite umwandeln, wenn Sie die vollständige Kontrolle über deren Inhalt und Design wünschen.

## Seiten hinzufügen und bearbeiten

1. Klicken Sie auf die **Add Page**-Schaltfläche in der oberen rechten Ecke der Pages-Tabelle.
2. Wählen Sie einen Seitentyp (leer oder eine Vorlage) und geben Sie ihm einen Namen.
3. Klicken Sie auf **Edit Content** neben einer Seite, um den [Seiten-Editor](page-editor) zu öffnen, in dem Sie Abschnitte, Text, Bilder und andere Elemente hinzufügen können.
4. Klicken Sie auf **Page Settings** (das Zahnrad-Symbol), um den Seitentitel, URL-Pfad und andere Metadaten zu aktualisieren.
5. Verwenden Sie die Schaltfläche **View live page**, um Ihre Seite in einem neuen Fenster zu öffnen und genau zu sehen, wie sie für Besucher aussieht.

:::tip
Für Ihre Startseite legen Sie den URL-Pfad auf nur `/` fest. Für alle anderen Seiten verwenden Sie einen beschreibenden Pfad wie `/about` oder `/contact`.
:::

### Page Settings

Öffnen Sie **Page Settings** auf einer beliebigen Seite, um Folgendes zu konfigurieren:

- **Title and URL Path** -- Der Seitenname und seine Adresse auf Ihrer Website.
- **Visibility** -- Wählen Sie, wer die Seite sehen kann: alle, nur Mitglieder, nur Personal oder Mitglieder bestimmter Gruppen. Dies ist eine schnelle Möglichkeit, eine private Seite zu sperren (wie eine Personal-Ressourcen-Seite), ohne ein separates Passwort.
- **Meta Description** -- Eine kurze Zusammenfassung, die in Suchmaschinenergebnissen und Social-Media-Link-Vorschaubildern angezeigt wird.
- **Redirects** -- Verweisen Sie einen alten URL-Pfad auf diese Seite, damit Links und Lesezeichen auf einer stillgelegten Seite funktionieren.

## Navigation verwalten

Die Website Pages-Ansicht zeigt Ihre Navigations-Links an. Diese Links steuern das Menü, das Besucher auf Ihrer Website sehen.

1. Klicken Sie auf **Add**, um einen neuen Navigations-Link zu erstellen. Sie können ihn auf eine Seite auf Ihrer Website oder auf eine externe URL verweisen.
2. Um Links neu zu ordnen, ziehen Sie sie per Drag & Drop in die gewünschte Reihenfolge. Sie können auch Links unter einem übergeordneten Element verschachteln, um Dropdown-Menüs zu erstellen.
3. Klicken Sie auf das **Edit**-Symbol neben einem Link, um seine Bezeichnung, URL oder Position zu ändern.
4. Um einen Link aus der Navigation zu entfernen, klicken Sie auf das **Delete**-Symbol.

:::info
Das Entfernen eines Navigations-Links löscht nicht die Seite selbst. Die Seite existiert weiterhin und kann über ihre URL direkt aufgerufen werden -- sie wird einfach nicht im Menü angezeigt.
:::

## Website-weite Schalter

Über **Main Navigation** auf der linken Seite der Website Pages-Ansicht befinden sich zwei Schalter, die für Ihre gesamte Kirchenwebsite gelten:

- **Show Login** -- Zeigt eine **Login**-Schaltfläche in der Navigationsleiste Ihrer Website an.
- **Disable Public Website** -- Deaktiviert Ihre öffentliche Website. Verwenden Sie es, wenn Ihre Kirche B1 nur für ihr Mitglieder-Portal, Spenden und Registrierungen nutzt und ihre Hauptwebsite anderswo führt.

### Was das Deaktivieren der öffentlichen Website bewirkt

Wenn **Disable Public Website** aktiviert ist:

- Jede öffentliche Seite, einschließlich der Startseite und Ihrer benutzerdefinierten Seiten, sendet Besucher, die nicht angemeldet sind, zum Anmeldungsbildschirm. Nach der Anmeldung werden sie auf die Seite zurückgeleitet, die sie angefordert haben.
- Angemeldete Mitglieder sehen die gesamte Website wie gewohnt, einschließlich Ihrer Navigation und der integrierten **Generated**-Seiten (z. B. Gruppen und Sermons). Generierte Seiten werden nicht mehr in der Pages-Tabelle angezeigt.
- Suchmaschinen wird mitgeteilt, die Website nicht zu indexieren. Die Sitemap ist leer und `robots.txt` blockiert alle Crawling-Aktivitäten.

Diese Links funktionieren weiterhin, damit Mitglieder und Gäste sie erreichen können:

- Anmeldung und Abmeldung
- Das Mitglieder-Portal (alles unter `/mobile`)
- [Event registration](../guides/event-registration.md)-Links und Gastregistrierung

Eine Warnung wird unter dem Schalter angezeigt, während die öffentliche Website deaktiviert ist. Schalten Sie den Schalter erneut aus, um Ihre Seiten zurückzubringen. Nichts wird gelöscht, während die Website deaktiviert ist.

:::info
Diese Einstellung gilt für Ihre gesamte Kirche. Wenn Sie mehr als eine Website haben, deaktiviert sie alle, nicht nur die im Site-Umschalter ausgewählte.
:::

## Tipps zum Organisieren Ihrer Website

- Halten Sie Ihre Top-Level-Navigation auf fünf oder sechs Elemente, damit Besucher Dinge schnell finden können.
- Verwenden Sie verschachtelte Links für verwandte Unterseiten (zum Beispiel ein "About"-Dropdown mit "Our Team", "Beliefs" und "History").
- Überprüfen Sie Ihre Navigation auf Mobilgeräten, indem Sie auf **Mobile Preview** klicken, um sicherzustellen, dass sie auf kleineren Bildschirmen gut funktioniert.
- Geben Sie Seiten klare, aussagekräftige Namen, die Besuchern helfen zu verstehen, was sie finden werden.

:::tip
Sie können [Formulare](../forms/creating-forms.md) zu Ihren Seiten hinzufügen, um Registrierungen, Gebetsanfragen oder andere Informationen von Besuchern zu erfassen.
:::

## Beginnen mit einer Website-Vorlage

Wenn Sie Ihre Website von Grund auf aufbauen, können Sie sie mit einer **Site Template** starten, statt Seiten einzeln zu erstellen. Eine Site-Vorlage erstellt eine Reihe vordefinierter Seiten -- Startseite, About, Connect, Give und andere -- mit Platzhalter-Inhalt und bereits verbundenen Navigations-Links.

1. Klicken Sie auf dem Pages-Bildschirm auf die Schaltfläche **Site Templates** (neben der **Add Page**-Schaltfläche).
2. Durchsuchen Sie die verfügbaren Vorlagen und klicken Sie auf eine, um ihre Seitenstruktur in der Vorschau anzuzeigen.
3. Wenn Sie eine gefallen hat, klicken Sie auf **Apply Template**.
4. Seiten, die noch nicht existieren, werden erstellt und zu Ihrer Navigation hinzugefügt. Bestehende Seiten bleiben unverändert.

Öffnen Sie nach dem Anwenden einer Vorlage jede Seite im [Seiten-Editor](page-editor), um den Platzhalter-Text und die Bilder durch den eigentlichen Inhalt Ihrer Kirche zu ersetzen.

:::info
Site-Vorlagen erstellen die Seitenstruktur und Navigation. Sie überschreiben nicht Ihr Website-Farbschema oder Ihre Schriftarten -- diese werden von [Appearance](appearance) gesteuert.
:::

## Bild-Lightbox

Wenn Besucher auf ein Bild auf Ihrer Website klicken, wird es in einer Vollbild-Lightbox-Überlagerung geöffnet. Dies ermöglicht es Personen, Fotos in größerer Größe anzuzeigen, ohne die Seite zu verlassen. Es ist keine Konfiguration erforderlich -- die Lightbox ist automatisch für Bilder in Ihrem Seiten-Inhalt aktiviert.

## Nächste Schritte

- [Initial Setup](initial-setup) -- Anweisungen zur erstmaligen Einrichtung
- [Using the Page Editor](page-editor) -- Erfahren Sie, wie Sie Seiten-Inhalte erstellen und gestalten
- [Appearance](appearance) -- Passen Sie das visuelle Design Ihrer Website an
- [Files](files) -- Laden Sie Mediendateien für Ihre Seiten hoch und verwalten Sie sie
