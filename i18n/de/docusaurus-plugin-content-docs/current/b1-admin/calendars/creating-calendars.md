---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Mit einem Kalender in B1 Admin erstellen Sie eine kuratierte Ansicht von Veranstaltungen, indem Sie eine oder mehrere Gruppen verbinden. Veranstaltungen werden von den Gruppenleitenden innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen an einem Ort. Administratoren mit Bearbeitungsrechten können Veranstaltungen für jede Gruppe hinzufügen oder bearbeiten. Gruppenleitende ohne Adminrechte können nur Veranstaltungen für Gruppen verwalten, die sie leiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten.
- Sie benötigen Administratorzugriff auf den Bereich Kalender in B1 Admin.

</div>

## Einen neuen Kalender anlegen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Kalender**.
2. Klicken Sie oben auf der Seite auf **Kalender hinzufügen**. Das Formular für den neuen Kalender öffnet sich unterhalb der Kalenderliste.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel "Veranstaltungen der Jugendarbeit" oder "Hauptkalender der Kirche").
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Detailseite des Kalenders

Nachdem Sie einen Kalender angelegt haben, klicken Sie in seiner Zeile auf **Veranstaltungen verwalten**, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Der Name des Kalenders mit seinen Aktionen (**Neue Veranstaltung**, **Bearbeiten**, **.ics importieren** und **Drucken**), gefolgt von der Liste **Gruppen im Kalender**, die zeigt, welche Gruppen in diesem Kalender enthalten sind. Klicken Sie neben einer Gruppe auf **Entfernen**, um sie aus dem Kalender zu nehmen.
- **Hauptbereich** -- Die Ansicht **Kalenderveranstaltungen** mit Veranstaltungen aus verbundenen Gruppen, darüber die Schaltflächen **Abonnieren** und **Gruppe hinzufügen**.

## Gruppen verbinden

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Liste **Gruppen im Kalender** auf der linken Seite der Detailseite.

1. Klicken Sie oberhalb des Kalenders auf **Gruppe hinzufügen**, um dem Kalender eine Gruppe zuzuordnen.
2. Wählen Sie die Gruppe im Dropdown-Menü aus. Die Liste enthält jede Gruppe Ihrer Kirche, nicht nur die Gruppen, denen Sie angehören.
3. Wählen Sie, ob Sie **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** aufnehmen möchten.
4. Klicken Sie auf **Speichern**.

Jede Veranstaltung erscheint nur einmal im Kalender. Wenn Sie eine ganze Gruppe hinzufügen, werden alle ihre Veranstaltungen, die Sie zuvor einzeln hinzugefügt haben, in den Gruppeneintrag übernommen. Das Auswählen bestimmter Veranstaltungen aus einer Gruppe, die bereits im Kalender ist, fügt nichts Neues hinzu. Unter **Gruppen im Kalender** werden nur Gruppen aufgeführt, die als Ganzes hinzugefügt wurden.

### Eine .ics-Datei importieren

Klicken Sie auf **.ics importieren**, um Veranstaltungen aus einem anderen Kalender zu übernehmen. Wählen Sie die **Gruppe** aus, zu der die Veranstaltungen gehören sollen, klicken Sie dann auf **.ics-Datei auswählen** oder fügen Sie den Inhalt der Datei ein, und klicken Sie auf **Importieren**. Die Veranstaltungen werden in dieser Gruppe angelegt, und die Gruppe wird dem Kalender hinzugefügt, aus dem Sie importiert haben, sodass die Veranstaltungen dort sofort erscheinen.

### Eine Veranstaltung aus dem Kalender entfernen

Klicken Sie auf eine Veranstaltung im Kalender und dann auf **Aus Kalender entfernen**. Dies nimmt die Veranstaltung nur aus diesem Kalender -- die Veranstaltung selbst bleibt in ihrer Gruppe. Ist die Veranstaltung im Kalender, weil ihre ganze Gruppe hinzugefügt wurde, entfernt dies alle Veranstaltungen dieser Gruppe aus diesem Kalender (die Veranstaltungen bleiben trotzdem in der Gruppe). Um eine Veranstaltung endgültig zu löschen, entfernen Sie sie über den [Gruppenkalender](../groups/group-calendar.md).

:::tip
Gruppen mit Ihrem Kalender zu verbinden ist eine wirkungsvolle Möglichkeit, Veranstaltungen automatisch zusammenzuführen. Wenn eine Gruppenleitung eine Veranstaltung zu ihrer [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand für Sie in Ihren kirchenweiten Kalender übernommen werden.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen Ihrer Kirche zusammenführt, lesen Sie [Kuratierter Kalender](curated-calendar) für einen schlanken Ansatz.
:::

## Veranstaltungen hinzufügen und bearbeiten {#adding-and-editing-events}

Klicken Sie auf der Detailseite des Kalenders auf **Neue Veranstaltung**, um eine Veranstaltung hinzuzufügen, oder klicken Sie auf eine Veranstaltung im Kalender und dann auf **Bearbeiten**, um sie zu ändern. Das Formular **Neue Veranstaltung** / **Veranstaltung bearbeiten** enthält diese Felder:

- **Gruppe** -- Die Gruppe, zu der die Veranstaltung gehört. Wenn Ihre Kirche Veranstaltungsvorlagen hat, können Sie außerdem eine **Vorlage** auswählen, um das Formular vorauszufüllen.
- **Titel**
- **Veranstaltungsfoto** -- Klicken Sie auf **Foto hinzufügen** (oder auf das leere Fotofeld), um ein Bild auszuwählen oder hochzuladen, das auf ein breites 16:9-Format zugeschnitten wird. Klicken Sie auf **Foto ändern**, um es zu ersetzen. Das Foto wird oben auf der Seite der Veranstaltung auf Ihrer Website angezeigt und als ihre Kachel, wenn ein Kalenderelement **Kommende Veranstaltungen** anzeigt (siehe [Veranstaltungen auf Ihrer Website anzeigen](#showing-events-on-your-website)).
- **Beschreibung** -- Wird auf der Seite der Veranstaltung auf Ihrer Website angezeigt. Fettschrift, Listen und Links werden unterstützt.
- **Beginn** und **Ende**, **Wiederholung** und **Sichtbarkeit** (**Öffentlich** oder **Privat**).
- **Schlagwörter** -- Durch Kommas getrennte Bezeichnungen, etwa `Jugend, Schüler`. Ein Kalenderelement auf Ihrer Website kann so eingestellt werden, dass nur Veranstaltungen mit einem bestimmten Schlagwort angezeigt werden. Dies ist dasselbe Feld **Schlagwörter**, das auch in den Anmeldeeinstellungen der Veranstaltung erscheint.
- **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** -- Wer die Notizen der Veranstaltung lesen und ergänzen darf (siehe [Notizen zu Veranstaltungen](#event-notes)). Wählen Sie **Nur Mitarbeitende** (die Standardeinstellung), **Gruppenleitende** (Leitende der Gruppe der Veranstaltung) oder **Gruppenmitglieder** (alle Personen in der Gruppe der Veranstaltung, einschließlich der Leitenden).
- **Räume** und **Ressourcen** -- Reservieren Sie Räume und Ausstattung für die Veranstaltung. Siehe [Räume, Ressourcen & Terminplanung](rooms-resources).

Klicken Sie auf **Speichern**. Wiederholt sich die Veranstaltung, fragt B1 nach einer Bestätigung, da das Speichern alle Termine der Serie aktualisiert.

### Notizen zu Veranstaltungen {#event-notes}

Jede Veranstaltung hat einen eigenen Notizverlauf für Planung und Nachbereitung. Klicken Sie auf der Detailseite des Kalenders auf eine Veranstaltung; der Dialog zeigt die Details der Veranstaltung, ihre Erinnerungen und darunter ihre **Notizen**. Geben Sie eine Notiz ein und veröffentlichen Sie sie, um sie dem Verlauf hinzuzufügen.

Mitarbeitende mit der Berechtigung, Inhalte zu bearbeiten oder Kalender zu verwalten, können Notizen zu Veranstaltungen immer lesen und verfassen. Die Einstellungen **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** der Veranstaltung legen fest, ob auch die Leitenden oder Mitglieder der Gruppe der Veranstaltung dies können.

### Veranstaltungen auf Ihrer Website anzeigen {#showing-events-on-your-website}

Um einen Kalender auf Ihrer Website anzuzeigen, fügen Sie einer Seite ein **Kalender**-Element hinzu und wählen Sie diesen Kalender aus. Das Element kann einen Monatskalender oder ein Raster mit Kacheln kommender Veranstaltungen anzeigen und kann auf Veranstaltungen mit einem bestimmten Schlagwort beschränkt werden. Besucher, die auf eine Veranstaltung klicken, öffnen deren eigene Seite. Siehe [Verwendung des Kalenderelements](../website/page-editor.md#using-the-calendar-element).

## Veranstaltungsanmeldung aktivieren {#enabling-event-registration}

Sie können für jede Kalenderveranstaltung die Anmeldung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine bestehende Veranstaltung oder legen Sie eine neue an.
2. Schalten Sie im Veranstaltungseditor **Anmeldung** ein.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl an Anmeldungen fest. Leer lassen für unbegrenzt.
   - **Anmeldung öffnet** -- Datum und Uhrzeit, ab denen die Anmeldung verfügbar ist.
   - **Anmeldung schließt** -- Datum und Uhrzeit, zu denen die Anmeldung endet.
   - **Schlagwörter** -- Durch Kommas getrennte Bezeichnungen (z. B. "Jugend, Freizeit, VBS"), um anmeldbare Veranstaltungen zu kategorisieren.
   - **Anmeldefragen** -- Optional können Sie ein [Formular](../forms/creating-forms.md) anhängen, damit Teilnehmende bei der Anmeldung zusätzliche Fragen beantworten (Ernährungsbedürfnisse, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um Fragen zu überspringen.
   - **Warteliste aktivieren** -- Wenn die Veranstaltung voll ist, können zusätzliche Interessierte auf eine Warteliste gesetzt werden, statt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](paid-registrations#waitlist).
4. Speichern Sie die Veranstaltung.

Bei kostenpflichtigen Veranstaltungen können Sie auf derselben Einstellungsseite preisgestaffelte **Teilnehmerarten**, optionale **Auswahlmöglichkeiten** (Zusatzoptionen) und **Rabattcodes** festlegen. Die Zahlung wird über den Zahlungsanbieter Ihrer Kirche abgewickelt. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](paid-registrations).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder die Schaltfläche **Für diese Veranstaltung anmelden**, wenn sie die Veranstaltung auf der [B1-Website](../../b1-church/events/registering) oder in der [B1-Mobil-App](../../b1-mobile/events/registering) ansehen. Haben Sie ein Formular angehängt, sehen Teilnehmende während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden zusammen mit der Anmeldung gespeichert.

:::info
Anmeldefragen funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Anmeldung automatisch übersprungen, statt angezeigt zu werden. Verwenden Sie daher ein nicht eingeschränktes Formular, wenn Sie einer Veranstaltung Fragen beifügen möchten.
:::

### Anmeldungen verwalten

So sehen und verwalten Sie Anmeldungen für Ihre Veranstaltungen:

1. Wählen Sie im Sprungmenü **Kalender > Anmeldungen**.
2. Sie sehen eine Tabelle aller Veranstaltungen mit aktivierter Anmeldung, mit Veranstaltungstitel, Datum, aktueller Anzahl der Anmeldungen im Verhältnis zur Kapazität und Schlagwörtern.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Anmeldungen zu sehen, mit Namen, Anzahl der Personen, Teilnehmerarten, Zahlungsstatus und Anmeldedatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmende hinzufügen** -- Jemanden manuell anmelden, der sich offline oder telefonisch angemeldet hat.
   - Einzelne Anmeldungen **stornieren**
   - Anmeldungen dauerhaft **löschen**
   - Anmeldungen von der Warteliste **nachrücken lassen**, sobald ein Platz frei wird
   - **CSV exportieren** -- Alle Anmeldungen herunterladen, einschließlich Teilnehmerarten, Auswahlmöglichkeiten, Zahlungsbeträge und Antworten auf Fragen

Hat die Veranstaltung angehängte Anmeldefragen, bietet die Detailseite zusätzlich den Filter **Nur unbeantwortete Fragen**, um schnell Angemeldete zu finden, die ihre Antworten noch nicht abgeschickt haben, sowie die Schaltfläche **Antworten ansehen** bei jeder beantworteten Anmeldung. Bei kostenpflichtigen Veranstaltungen kommen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Zählungen pro Typ und ein Dialog mit Zahlungsdetails hinzu -- siehe [Kostenpflichtige Anmeldungen](paid-registrations#the-registration-roster).

:::tip
Nutzen Sie den Fortschrittsbalken der Kapazität, um zu verfolgen, wie schnell sich Veranstaltungen füllen. Der Balken wird rot, sobald eine Veranstaltung die Kapazität erreicht oder überschritten hat.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) -- Einen Kalender erstellen, der Veranstaltungen aus mehreren Gruppen übernimmt
- [Kostenpflichtige Anmeldungen](paid-registrations) -- Teilnehmerarten, Zusatzauswahl, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zur Einrichtung der Veranstaltungsanmeldung
- [Überblick über Kalender](./) -- Zurück zur Übersicht der Kalender
