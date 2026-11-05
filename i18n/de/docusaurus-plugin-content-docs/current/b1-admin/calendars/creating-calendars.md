---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Mit einem Kalender in B1 Admin erstellen Sie eine übersichtliche Ansicht von Veranstaltungen, indem Sie eine oder mehrere Gruppen verbinden. Veranstaltungen werden von den Gruppenleitungen innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen an einer zentralen Stelle. Administratoren mit Bearbeitungsrechten können Veranstaltungen für jede Gruppe hinzufügen oder bearbeiten. Gruppenleitungen ohne Administratorrechte können nur Veranstaltungen für Gruppen verwalten, die sie leiten.

</div>

## Einführungsvideo

<YouTube id="Ko3kgsCSLFs" title="Kalender, Veranstaltungen und Raumbuchungen in B1 erstellen" next="Veranstaltungsanmeldung und kostenpflichtige Veranstaltungen in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen Administratorzugriff auf den Bereich Kalender in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Kalender**.
2. Klicken Sie oben auf der Seite auf **Kalender hinzufügen**. Das Formular für neue Kalender öffnet sich unterhalb der Kalenderliste.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel "Veranstaltungen der Jugendarbeit" oder "Haupt-Gemeindekalender").
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Detailseite des Kalenders

Nach dem Erstellen eines Kalenders klicken Sie in seiner Zeile auf **Veranstaltungen verwalten**, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Der Name des Kalenders mit seinen Aktionen (**Neue Veranstaltung**, **Bearbeiten**, **.ics importieren** und **Drucken**), gefolgt von der Liste **Gruppen im Kalender**, die zeigt, welche Gruppen in diesem Kalender enthalten sind. Klicken Sie neben einer Gruppe auf **Entfernen**, um sie aus dem Kalender zu nehmen.
- **Hauptbereich** -- Die Ansicht **Kalenderveranstaltungen** mit Veranstaltungen aus verbundenen Gruppen, darüber die Schaltflächen **Abonnieren** und **Gruppe hinzufügen**.

## Gruppen verbinden

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Liste **Gruppen im Kalender** auf der linken Seite der Detailseite.

1. Klicken Sie oberhalb des Kalenders auf **Gruppe hinzufügen**, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus dem Dropdown-Menü aus. Die Liste enthält jede Gruppe Ihrer Kirche, nicht nur die Gruppen, in denen Sie Mitglied sind.
3. Wählen Sie, ob Sie **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** aufnehmen möchten.
4. Klicken Sie auf **Speichern**.

Jede Veranstaltung erscheint nur einmal im Kalender. Wenn Sie eine ganze Gruppe hinzufügen, werden alle ihre Veranstaltungen, die Sie zuvor einzeln hinzugefügt hatten, in den Gruppeneintrag übernommen. Das Auswählen bestimmter Veranstaltungen aus einer Gruppe, die bereits im Kalender ist, fügt nichts Neues hinzu. Nur Gruppen, die als Ganzes hinzugefügt wurden, werden unter **Gruppen im Kalender** aufgelistet.

### Eine .ics-Datei importieren

Klicken Sie auf **.ics importieren**, um Veranstaltungen aus einem anderen Kalender zu übernehmen. Wählen Sie die **Gruppe**, zu der die Veranstaltungen gehören sollen, und klicken Sie dann auf **.ics-Datei auswählen** oder fügen Sie den Inhalt der Datei ein. Klicken Sie anschließend auf **Importieren**. Die Veranstaltungen werden in dieser Gruppe angelegt, und die Gruppe wird dem Kalender hinzugefügt, aus dem Sie importiert haben, sodass die Veranstaltungen dort sofort erscheinen.

### Eine Veranstaltung aus dem Kalender entfernen

Klicken Sie im Kalender auf eine Veranstaltung und dann auf **Aus Kalender entfernen**. Dadurch wird die Veranstaltung nur aus diesem Kalender entfernt -- die Veranstaltung selbst bleibt in ihrer Gruppe erhalten. Wenn die Veranstaltung nur deshalb im Kalender ist, weil die gesamte Gruppe hinzugefügt wurde, werden beim Entfernen alle Veranstaltungen dieser Gruppe aus diesem Kalender genommen (die Veranstaltungen bleiben trotzdem in der Gruppe). Um eine Veranstaltung endgültig zu löschen, entfernen Sie sie über den [Kalender der Gruppe](../groups/group-calendar.md).

:::tip
Das Verbinden von Gruppen mit Ihrem Kalender ist eine effektive Möglichkeit, Veranstaltungen automatisch zusammenzuführen. Wenn eine Gruppenleitung eine Veranstaltung zu ihrer [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand für Sie in den gemeindeweiten Kalender übernommen werden.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen Ihrer Kirche zusammenführt, finden Sie unter [Kuratierter Kalender](curated-calendar) einen schlankeren Ansatz.
:::

## Veranstaltungen hinzufügen und bearbeiten {#adding-and-editing-events}

Klicken Sie auf der Detailseite des Kalenders auf **Neue Veranstaltung**, um eine Veranstaltung hinzuzufügen, oder klicken Sie im Kalender auf eine Veranstaltung und dann auf **Bearbeiten**, um sie zu ändern. Das Formular **Neue Veranstaltung** / **Veranstaltung bearbeiten** enthält folgende Felder:

- **Gruppe** -- Die Gruppe, zu der die Veranstaltung gehört. Wenn Ihre Kirche Veranstaltungsvorlagen hat, können Sie auch eine **Vorlage** auswählen, um das Formular vorauszufüllen.
- **Titel**
- **Veranstaltungsfoto** -- Klicken Sie auf **Foto hinzufügen** (oder auf das leere Fotofeld), um ein Bild auszuwählen oder hochzuladen; es wird auf ein breites Format von 16:9 zugeschnitten. Klicken Sie auf **Foto ändern**, um es zu ersetzen. Das Foto wird oben auf der Veranstaltungsseite Ihrer Website angezeigt und als Kachel, wenn ein Kalender-Element **Kommende Veranstaltungen** anzeigt (siehe [Veranstaltungen auf Ihrer Website anzeigen](#showing-events-on-your-website)).
- **Beschreibung** -- Wird auf der Veranstaltungsseite Ihrer Website angezeigt. Fettschrift, Listen und Links werden unterstützt.
- **Beginn** und **Ende**, **Wiederholung** und **Sichtbarkeit** (**Öffentlich** oder **Privat**).
- **Tags** -- Durch Kommas getrennte Schlagwörter, z. B. `jugend, schüler`. Ein Kalender-Element auf Ihrer Website kann so eingestellt werden, dass nur Veranstaltungen mit einem bestimmten Tag angezeigt werden. Dies ist dasselbe Feld **Tags**, das auch in den Anmeldeeinstellungen der Veranstaltung erscheint.
- **Wer Notizen sehen darf** und **Wer Notizen schreiben darf** -- Wer die Notizen der Veranstaltung lesen und ergänzen kann (siehe [Veranstaltungsnotizen](#event-notes)). Wählen Sie **Nur Mitarbeiter** (Standard), **Gruppenleitungen** (Leitungen der Gruppe der Veranstaltung) oder **Gruppenmitglieder** (alle Personen in der Gruppe der Veranstaltung, einschließlich ihrer Leitungen).
- **Räume** und **Ressourcen** -- Reservieren Sie Raum und Ausstattung für die Veranstaltung. Siehe [Räume, Ressourcen und Planung](rooms-resources).

Klicken Sie auf **Speichern**. Wenn sich die Veranstaltung wiederholt, fragt B1 nach einer Bestätigung, da beim Speichern alle Termine der Serie aktualisiert werden.

### Veranstaltungsnotizen {#event-notes}

Jede Veranstaltung hat einen eigenen Notizenverlauf für Planung und Nachbereitung. Klicken Sie auf der Detailseite des Kalenders auf eine Veranstaltung; das Dialogfeld zeigt die Details der Veranstaltung, ihre Erinnerungen und darunter ihre **Notizen**. Geben Sie eine Notiz ein und veröffentlichen Sie sie, um sie dem Verlauf hinzuzufügen.

Mitarbeiter mit der Berechtigung, Inhalte zu bearbeiten oder Kalender zu verwalten, können Veranstaltungsnotizen immer lesen und verfassen. Die Einstellungen **Wer Notizen sehen darf** und **Wer Notizen schreiben darf** der Veranstaltung legen fest, ob auch die Gruppenleitungen oder Mitglieder der Veranstaltungsgruppe dies können.

### Veranstaltungen auf Ihrer Website anzeigen {#showing-events-on-your-website}

Um einen Kalender auf Ihrer Website anzuzeigen, fügen Sie einer Seite ein **Kalender**-Element hinzu und wählen Sie diesen Kalender aus. Das Element kann einen Monatskalender oder ein Raster mit kommenden Veranstaltungen anzeigen und kann auf Veranstaltungen mit einem bestimmten Tag beschränkt werden. Besucher, die auf eine Veranstaltung klicken, öffnen deren eigene Veranstaltungsseite. Siehe [Verwendung des Kalender-Elements](../website/page-editor.md#using-the-calendar-element).

## Veranstaltungsanmeldung aktivieren {#enabling-event-registration}

Sie können die Anmeldung für jede Kalenderveranstaltung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine bestehende Veranstaltung oder erstellen Sie eine neue.
2. Schalten Sie im Veranstaltungseditor **Anmeldung** ein.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl an Anmeldungen fest. Leer lassen für unbegrenzt.
   - **Anmeldung öffnet** -- Datum und Uhrzeit, ab denen die Anmeldung möglich ist.
   - **Anmeldung schließt** -- Datum und Uhrzeit, zu denen die Anmeldung endet.
   - **Tags** -- Durch Kommas getrennte Schlagwörter (z. B. "jugend, freizeit, kinderbibelwoche") zur Kategorisierung anmeldbarer Veranstaltungen.
   - **Anmeldefragen** -- Hängen Sie optional ein [Formular](../forms/creating-forms.md) an, damit Teilnehmende bei der Anmeldung zusätzliche Fragen beantworten (Ernährungsgewohnheiten, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um keine Fragen zu stellen.
   - **Warteliste aktivieren** -- Wenn die Veranstaltung voll ist, können zusätzliche Teilnehmende auf eine Warteliste gesetzt werden, statt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](paid-registrations#waitlist).
4. Speichern Sie die Veranstaltung.

Bei kostenpflichtigen Veranstaltungen können Sie auf derselben Einstellungsseite preisgestaltete **Teilnehmertypen**, optionale **Auswahlmöglichkeiten** (Zusatzoptionen) und **Rabattcodes** festlegen. Die Zahlung wird über den Spendenanbieter Ihrer Kirche abgewickelt. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](paid-registrations).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder eine Schaltfläche **Für diese Veranstaltung anmelden**, wenn sie die Veranstaltung auf der [B1-Website](../../b1-church/events/registering) oder in der [B1-Mobile-App](../../b1-mobile/events/registering) ansehen. Wenn Sie ein Formular angehängt haben, sehen Anmeldende während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden zusammen mit der Anmeldung gespeichert.

:::info
Anmeldefragen funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Anmeldung automatisch übersprungen statt angezeigt. Verwenden Sie deshalb ein nicht eingeschränktes Formular, wenn Sie einer Veranstaltung Fragen beifügen.
:::

### Anmeldungen verwalten

Um Anmeldungen für Ihre Veranstaltungen anzusehen und zu verwalten:

1. Wählen Sie im Sprungmenü **Kalender > Anmeldungen**.
2. Sie sehen eine Tabelle aller Veranstaltungen mit aktivierter Anmeldung, mit Veranstaltungstitel, Datum, aktueller Anzahl der Anmeldungen im Verhältnis zur Kapazität sowie Tags.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Anmeldungen zu sehen, mit Namen, Anzahl der Mitglieder, Teilnehmertypen, Zahlungsstatus und Anmeldedatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmer hinzufügen** -- Jemanden manuell anmelden, der sich offline oder telefonisch angemeldet hat.
   - Einzelne Anmeldungen **stornieren**
   - Anmeldungen dauerhaft **löschen**
   - Auf der Warteliste stehende Anmeldungen **nachrücken lassen**, wenn ein Platz frei wird
   - **CSV exportieren** -- Alle Anmeldungen herunterladen, einschließlich Teilnehmertypen, Auswahlmöglichkeiten, Zahlungsbeträge und Antworten auf Fragen

Wenn der Veranstaltung Anmeldefragen zugeordnet sind, zeigt die Detailseite außerdem einen Filter **Nur unbeantwortete Fragen**, mit dem Sie schnell Anmeldende finden, die noch keine Antworten abgegeben haben, sowie bei jeder beantworteten Anmeldung eine Schaltfläche **Antworten anzeigen**, um deren Antworten zu sehen. Kostenpflichtige Veranstaltungen fügen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Zähler pro Typ und einen Dialog mit Zahlungsdetails hinzu -- siehe [Kostenpflichtige Anmeldungen](paid-registrations#the-registration-roster).

:::tip
Nutzen Sie die Fortschrittsleiste der Kapazität, um zu verfolgen, wie schnell sich Veranstaltungen füllen. Die Leiste wird rot, sobald eine Veranstaltung die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) -- Einen Kalender erstellen, der Veranstaltungen aus mehreren Gruppen übernimmt
- [Kostenpflichtige Anmeldungen](paid-registrations) -- Teilnehmertypen, Zusatzoptionen, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zur Einrichtung der Veranstaltungsanmeldung
- [Übersicht Kalender](./) -- Zurück zur Übersicht der Kalender
