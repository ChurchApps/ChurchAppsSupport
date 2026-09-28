---
title: "Seiten verwalten"
---

# Seiten verwalten

<div class="article-intro">

Die Website-Seiten-Ansicht ist dein zentraler Knotenpunkt für das Erstellen, Bearbeiten und Organisieren aller Seiten auf deiner Kirchenwebsite. Du kannst sowohl deinen Seiteninhalt als auch die Navigation deiner Website von diesem einen Bildschirm aus verwalten.

</div>

<div class="prereqs">
<h4>Bevor du anfängst</h4>

- Schließe die [Erste Einrichtung](initial-setup) ab, um deine Domain und grundlegenden Website-Einstellungen zu konfigurieren
- Habe deinen Inhalt und deine Bilder bereit. Verwende zuerst den [Dateien](files)-Manager, um Media-Assets hochzuladen.

</div>

:::info
Wenn deine Kirche mehr als eine Website hat (z. B. separate Websites pro Standort), verwende den Website-Switcher oben in der Website-Seiten-Ansicht, um zwischen ihnen zu wechseln. Jede Website hat ihre eigenen Seiten, Navigation und [Aussehen](appearance)-Einstellungen.
:::

## Seitentypen verstehen

Die Tabelle **Seiten** listet jede Seite auf deiner Website zusammen mit ihrem Status auf:

- **Generiert** – Seiten, die automatisch vom System basierend auf den Daten deiner Kirche erstellt wurden (z. B. eine Gruppenseite, eine Predigenseite oder eine einzelne Seite für jede Predigt in deiner Bibliothek). Diese Seiten aktualisieren sich selbst, wenn sich deine Daten ändern.
- **Benutzerdefiniert** – Seiten, die du selbst mit deinem eigenen Inhalt und Layout erstellt hast.

Du kannst jede automatisch generierte Seite in eine benutzerdefinierte Seite konvertieren, wenn du die volle Kontrolle über ihren Inhalt und Design möchtest.

## Seiten hinzufügen und bearbeiten

1. Klicke auf die Schaltfläche **Seite hinzufügen** in der oberen rechten Ecke der Seiten-Tabelle.
2. Wähle einen Seitentyp (leer oder eine Vorlage) und gib ihm einen Namen.
3. Klicke auf **Inhalt bearbeiten** neben einer Seite, um den [Seiten-Editor](page-editor) zu öffnen, in dem du Abschnitte, Text, Bilder und andere Elemente hinzufügen kannst.
4. Klicke auf **Seiteneinstellungen** (das Zahnradsymbol), um den Seitentitel, den URL-Pfad und andere Metadaten zu aktualisieren.
5. Verwende die Schaltfläche **Zeige Live-Seite an**, um deine Seite in einem neuen Fenster zu öffnen und genau zu sehen, wie sie für Besucher aussieht.

:::tip
Für deine Startseite setze den URL-Pfad auf nur `/`. Für alle anderen Seiten verwende einen beschreibenden Pfad wie `/about` oder `/contact`.
:::

### Seiteneinstellungen

Öffne **Seiteneinstellungen** auf einer beliebigen Seite, um zu konfigurieren:

- **Titel und URL-Pfad** – Der Seitenname und seine Adresse auf deiner Website.
- **Sichtbarkeit** – Wähle, wer die Seite sehen kann: jeder, nur Mitglieder, nur Personal oder Mitglieder bestimmter Gruppen. Dies ist eine schnelle Möglichkeit, eine private Seite (z. B. eine Personal-Ressourcenseite) ohne separates Passwort zu sperren.
- **Meta-Beschreibung** – Eine kurze Zusammenfassung, die in Suchmaschinen-Ergebnissen und Vorschauen von Social-Media-Links angezeigt wird.
- **Weiterleitungen** – Verweise einen alten URL-Pfad auf diese Seite, damit Links und Lesezeichen zu einer pensionierten Seite weiterhin funktionieren.

## Navigation verwalten

Die Website-Seiten-Ansicht zeigt deine Navigationslinks an. Diese Links steuern das Menü, das Besucher auf deiner Website sehen.

1. Klicke auf **Hinzufügen**, um einen neuen Navigationslink zu erstellen. Du kannst ihn auf jede Seite auf deiner Website oder auf eine externe URL verweisen.
2. Um Links neu zu ordnen, ziehe und versetze sie in die Reihenfolge, die du möchtest. Du kannst auch Links unter einem übergeordneten Element verschachteln, um Dropdown-Menüs zu erstellen.
3. Klicke auf das Symbol **Bearbeiten** neben einem Link, um sein Label, die URL oder Position zu ändern.
4. Um einen Link aus der Navigation zu entfernen, klicke auf das Symbol **Löschen**.

:::info
Das Entfernen eines Navigationslinks löscht die Seite selbst nicht. Die Seite existiert immer noch und kann über ihre URL direkt aufgerufen werden – sie erscheint einfach nicht im Menü.
:::

## Website-weite Schalter

Über **Hauptnavigation** auf der linken Seite der Website-Seiten-Ansicht befinden sich zwei Schalter, die für deine gesamte Kirchenwebsite gelten:

- **Anmelden anzeigen** – Zeigt eine **Anmelden**-Schaltfläche in der Navigationsleiste deiner Website an.
- **Öffentliche Website deaktivieren** – Schaltet deine öffentliche Website aus. Verwende es, wenn deine Kirche B1 nur für ihr Mitgliederportal, Gaben und Registrierungen nutzt und ihre Hauptwebsite woanders hostet.

### Was das Deaktivieren der öffentlichen Website bewirkt

Wenn **Öffentliche Website deaktivieren** aktiviert ist:

- Jede öffentliche Seite, einschließlich der Startseite und deiner benutzerdefinierten Seiten, leitet Besucher zum Anmeldungsbildschirm weiter.
- Die eingebauten **Generiert**-Seiten (wie Gruppen und Predigten) werden nicht mehr bereitgestellt und erscheinen nicht mehr in der Seiten-Tabelle.
- Die Website-Kopfzeile zeigt nur die **Anmelden**-Schaltfläche ohne Navigationslinks.
- Suchmaschinen werden nicht zum Indexieren der Website angewiesen. Die Sitemap ist leer und `robots.txt` blockiert alle Durchsuchungen.

Diese Links bleiben funktionsfähig, damit Mitglieder und Gäste sie weiterhin erreichen können:

- Anmelden und Abmelden
- Das Mitgliederportal (alles unter `/mobile`)
- [Ereignisregistrierungs](../guides/event-registration.md)-Links und Gastregistrierung

Ein Warnhinweis erscheint unter dem Schalter, während die öffentliche Website aus ist. Schalte den Schalter erneut aus, um deine Seiten zurückzubringen. Nichts wird gelöscht, während die Website deaktiviert ist.

:::info
Diese Einstellung gilt für deine ganze Kirche. Wenn du mehr als eine Website hast, schaltet es alle aus, nicht nur die im Website-Switcher ausgewählte.
:::

## Tipps für die Organisation deiner Website

- Halte deine Navigation auf oberster Ebene auf fünf oder sechs Elemente begrenzt, damit Besucher Dinge schnell finden können.
- Verwende verschachtelte Links für verwandte Unterseiten (z. B. ein "Über uns"-Dropdown mit "Unser Team", "Überzeugungen" und "Geschichte").
- Überprüfe deine Navigation auf Mobilgeräten, indem du auf **Mobilvorschau** klickst, um sicherzustellen, dass es auf kleineren Bildschirmen gut funktioniert.
- Gib Seiten klare, beschreibende Namen, die Besuchern helfen zu verstehen, was sie finden werden.

:::tip
Du kannst [Formulare](../forms/creating-forms.md) auf deine Seiten hinzufügen, um Registrierungen, Gebetsanfragen oder andere Informationen von Besuchern zu sammeln.
:::

## Von einer Website-Vorlage starten

Wenn du deine Website von vorne aufbaust, kannst du sie mithilfe einer **Website-Vorlage** starten, statt Seiten einzeln zu erstellen. Eine Website-Vorlage erstellt einen Satz vorgefertigter Seiten – Startseite, Über uns, Verbinden, Geben und andere – mit Platzhalter-Inhaltem und bereits verdrahteten Navigationslinks.

1. Klicke auf dem Bildschirm Seiten auf die Schaltfläche **Website-Vorlagen** (neben der Schaltfläche **Seite hinzufügen**).
2. Durchsuche die verfügbaren Vorlagen und klicke auf eine, um ihre Seitenstruktur anzuzeigen.
3. Wenn du eine gefunden hast, die dir gefällt, klicke auf **Vorlage anwenden**.
4. Seiten, die noch nicht vorhanden sind, werden erstellt und zu deiner Navigation hinzugefügt. Bestehende Seiten bleiben unverändert.

Nachdem du eine Vorlage angewendet hast, öffne jede Seite im [Seiten-Editor](page-editor), um den Platzhalter-Text und die Bilder durch echten Inhalt deiner Kirche zu ersetzen.

:::info
Website-Vorlagen erstellen Seitenstruktur und Navigation. Sie überschreiben das Farbschema oder die Schriften deiner Website nicht – diese werden durch [Aussehen](appearance) gesteuert.
:::

## Bild-Lightbox

Wenn Besucher auf ein Bild auf deiner Website klicken, wird es in einer Vollbild-Lightbox-Überlagerung geöffnet. Dies ermöglicht es Personen, Fotos in größerer Größe anzuzeigen, ohne die Seite zu verlassen. Es ist keine Konfiguration erforderlich – die Lightbox ist automatisch für Bilder in deinem Seiteninhalt aktiviert.

## Nächste Schritte

- [Erste Einrichtung](initial-setup) – Erste Einrichtungsanweisungen
- [Verwenden des Seiten-Editors](page-editor) – Erfahre, wie du Seiteninhalt erstellst und stylst
- [Aussehen](appearance) – Passe das visuelle Design deiner Website an
- [Dateien](files) – Lade und verwalte Media-Assets für deine Seiten
