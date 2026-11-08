---
title: "Kalender erstellen"
description: "Erstellen Sie in B1 Admin einen Kalender, verbinden Sie Gruppen oder importieren Sie .ics-Dateien, und verwalten Sie Termine, Anmeldungen und Notizen an einem Ort."
---

# Kalender erstellen

<div class="article-intro">

Mit dem Erstellen eines Kalenders in B1 Admin können Sie eine gezielte Übersicht über Veranstaltungen zusammenstellen, indem Sie eine oder mehrere Gruppen verbinden. Die Veranstaltungen werden von den Gruppenleitungen innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen an einem Ort an. Administratoren mit Bearbeitungsrechten können Veranstaltungen für jede Gruppe hinzufügen oder bearbeiten. Gruppenleitungen ohne Administratorrechte können nur Veranstaltungen für Gruppen verwalten, die sie leiten.

</div>

## Schulungsvideo

<YouTube id="Ko3kgsCSLFs" title="Kalender, Veranstaltungen und Raumbuchungen in B1 erstellen" next="Veranstaltungsanmeldung und kostenpflichtige Veranstaltungen in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen Administratorzugriff auf den Bereich Kalender in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Kalender**.
2. Klicken Sie oben auf der Seite auf **Kalender hinzufügen**. Das Formular für neue Kalender öffnet sich unterhalb der Kalenderliste.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel „Jugendveranstaltungen“ oder „Hauptkalender der Kirche“).
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Detailseite des Kalenders

Nachdem Sie einen Kalender erstellt haben, klicken Sie in seiner Zeile auf **Veranstaltungen verwalten**, um die Detailseite zu öffnen. Diese Seite besteht aus zwei Hauptbereichen:

- **Linke Spalte** -- Der Name des Kalenders mit seinen Aktionen (**Neue Veranstaltung**, **Bearbeiten**, **.ics importieren** und **Drucken**), darunter die Liste **Gruppen im Kalender**, die zeigt, welche Gruppen in diesem Kalender enthalten sind. Klicken Sie neben einer Gruppe auf **Entfernen**, um sie aus dem Kalender zu nehmen.
- **Hauptbereich** -- Die Ansicht **Kalenderveranstaltungen** mit Veranstaltungen aus verbundenen Gruppen; darüber befinden sich die Schaltflächen **Abonnieren** und **Gruppe hinzufügen**.

## Gruppen verbinden

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Liste **Gruppen im Kalender** auf der linken Seite der Detailseite.

1. Klicken Sie oberhalb des Kalenders auf **Gruppe hinzufügen**, um dem Kalender eine Gruppe zuzuordnen.
2. Wählen Sie die Gruppe aus dem Dropdown-Menü aus. Die Liste enthält alle Gruppen Ihrer Kirche, nicht nur die Gruppen, denen Sie angehören.
3. Wählen Sie, ob **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** aufgenommen werden sollen.
4. Klicken Sie auf **Speichern**.

Jede Veranstaltung erscheint nur einmal im Kalender. Wenn Sie eine ganze Gruppe hinzufügen, werden alle ihre Veranstaltungen, die Sie bereits einzeln hinzugefügt hatten, in den Gruppeneintrag übernommen. Das Auswählen bestimmter Veranstaltungen aus einer Gruppe, die bereits im Kalender ist, fügt nichts Neues hinzu. Nur Gruppen, die als Ganzes hinzugefügt wurden, werden unter **Gruppen im Kalender** aufgeführt.

### Eine .ics-Datei importieren

Klicken Sie auf **.ics importieren**, um Veranstaltungen aus einem anderen Kalender zu übernehmen. Wählen Sie die **Gruppe** aus, zu der die Veranstaltungen gehören sollen, klicken Sie dann auf **.ics-Datei auswählen** oder fügen Sie den Inhalt der Datei ein, und klicken Sie auf **Importieren**. Die Veranstaltungen werden in dieser Gruppe angelegt, und die Gruppe wird dem Kalender hinzugefügt, aus dem Sie importiert haben, sodass die Veranstaltungen dort sofort angezeigt werden.

### Eine Veranstaltung aus dem Kalender entfernen

Klicken Sie im Kalender auf eine Veranstaltung und dann auf **Aus Kalender entfernen**. Dadurch wird die Veranstaltung nur aus diesem Kalender entfernt -- die Veranstaltung selbst bleibt in ihrer Gruppe erhalten. Wenn die Veranstaltung im Kalender ist, weil ihre gesamte Gruppe hinzugefügt wurde, werden beim Entfernen alle Veranstaltungen dieser Gruppe aus diesem Kalender genommen (die Veranstaltungen bleiben trotzdem in der Gruppe). Um eine Veranstaltung endgültig zu löschen, entfernen Sie sie im [Gruppenkalender](../groups/group-calendar.md).

:::tip
Das Verbinden von Gruppen mit Ihrem Kalender ist eine effektive Möglichkeit, Veranstaltungen automatisch zusammenzuführen. Wenn eine Gruppenleitung eine Veranstaltung zu ihrer [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand für Sie in Ihren kirchenweiten Kalender übernommen werden.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen Ihrer Kirche zusammenführt, lesen Sie [Kuratierter Kalender](./curated-calendar.md) für ein einfacheres Vorgehen.
:::

## Veranstaltungen hinzufügen und bearbeiten {#adding-and-editing-events}

Klicken Sie auf der Detailseite des Kalenders auf **Neue Veranstaltung**, um eine Veranstaltung hinzuzufügen, oder klicken Sie im Kalender auf eine Veranstaltung und dann auf **Bearbeiten**, um sie zu ändern. Das Formular **Neue Veranstaltung** bzw. **Veranstaltung bearbeiten** enthält folgende Felder:

- **Gruppe** -- Die Gruppe, zu der die Veranstaltung gehört. Wenn Ihre Kirche Veranstaltungsvorlagen verwendet, können Sie außerdem eine **Vorlage** auswählen, um das Formular vorzubefüllen.
- **Titel**
- **Veranstaltungsfoto** -- Klicken Sie auf **Foto hinzufügen** (oder auf das leere Fotofeld), um ein Bild auszuwählen oder hochzuladen; es wird auf ein breites Format mit 16:9 zugeschnitten. Klicken Sie auf **Foto ändern**, um es zu ersetzen. Das Foto wird oben auf der Seite der Veranstaltung auf Ihrer Website angezeigt und dient als Kachel, wenn ein Kalender-Element **Kommende Veranstaltungen** anzeigt (siehe [Veranstaltungen auf Ihrer Website anzeigen](#showing-events-on-your-website)).
- **Beschreibung** -- Wird auf der Seite der Veranstaltung auf Ihrer Website angezeigt. Fettschrift, Listen und Links werden unterstützt.
- **Beginn** und **Ende**, **Wiederholung** sowie **Sichtbarkeit** (**Öffentlich** oder **Privat**).
- **Schlagwörter** -- Durch Kommas getrennte Bezeichnungen, zum Beispiel `youth, students`. Ein Kalender-Element auf Ihrer Website kann so eingestellt werden, dass nur Veranstaltungen mit einem bestimmten Schlagwort angezeigt werden. Dies ist dasselbe Feld **Schlagwörter**, das auch in den Anmeldeeinstellungen der Veranstaltung erscheint.
- **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** -- Legt fest, wer die Notizen der Veranstaltung lesen und ergänzen darf (siehe [Notizen zu Veranstaltungen](#event-notes)). Wählen Sie **Nur Mitarbeitende** (die Voreinstellung), **Gruppenleitungen** (Leitungen der Gruppe der Veranstaltung) oder **Gruppenmitglieder** (alle Personen in der Gruppe der Veranstaltung, einschließlich ihrer Leitungen).
- **Räume** und **Ressourcen** -- Reservieren Sie Platz und Ausstattung für die Veranstaltung. Siehe [Räume, Ressourcen und Planung](./rooms-resources.md).

Klicken Sie auf **Speichern**. Wenn sich die Veranstaltung wiederholt, fragt B1 nach einer Bestätigung, da beim Speichern alle Termine der Reihe aktualisiert werden.

### Notizen zu Veranstaltungen {#event-notes}

Jede Veranstaltung hat einen eigenen Notizverlauf für Planung und Nachbereitung. Klicken Sie auf der Detailseite des Kalenders auf eine Veranstaltung; das Dialogfeld zeigt die Details der Veranstaltung, ihre Erinnerungen und darunter ihre **Notizen**. Geben Sie eine Notiz ein und senden Sie sie ab, um sie dem Verlauf hinzuzufügen.

Mitarbeitende mit der Berechtigung, Inhalte zu bearbeiten oder Kalender zu verwalten, können Notizen zu Veranstaltungen immer lesen und verfassen. Die Einstellungen **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** legen fest, ob auch die Gruppenleitungen oder Mitglieder der Gruppe der Veranstaltung dies dürfen.

### Veranstaltungen auf Ihrer Website anzeigen {#showing-events-on-your-website}

Um einen Kalender auf Ihrer Website anzuzeigen, fügen Sie einer Seite ein **Kalender**-Element hinzu und wählen Sie diesen Kalender aus. Das Element kann einen Monatskalender oder ein Raster mit Kacheln kommender Veranstaltungen anzeigen und lässt sich auf Veranstaltungen mit einem bestimmten Schlagwort beschränken. Besucher, die auf eine Veranstaltung klicken, öffnen deren eigene Veranstaltungsseite. Siehe [Das Kalender-Element verwenden](../website/page-editor.md#using-the-calendar-element).

## Veranstaltungsanmeldung aktivieren {#enabling-event-registration}

Sie können die Anmeldung für jede Kalenderveranstaltung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine bestehende Veranstaltung oder erstellen Sie eine neue.
2. Schalten Sie im Veranstaltungseditor die Option **Anmeldung** ein.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl an Anmeldungen fest. Lassen Sie das Feld leer für unbegrenzt.
   - **Anmeldung öffnet** -- Datum und Uhrzeit, ab denen die Anmeldung möglich ist.
   - **Anmeldung schließt** -- Datum und Uhrzeit, zu denen die Anmeldung endet.
   - **Schlagwörter** -- Durch Kommas getrennte Bezeichnungen (z. B. „youth, retreat, vbs“), die helfen, anmeldbare Veranstaltungen zu kategorisieren.
   - **Anmeldefragen** -- Optional können Sie ein [Formular](../forms/creating-forms.md) anhängen, damit Teilnehmende zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.) und diese bei der Anmeldung ausfüllen. Wählen Sie **Keine**, um keine Fragen zu stellen.
   - **Warteliste aktivieren** -- Wenn die Veranstaltung voll ist, können zusätzliche Interessierte auf eine Warteliste gesetzt werden, statt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](./paid-registrations.md#waitlist).
4. Speichern Sie die Veranstaltung.

Bei kostenpflichtigen Veranstaltungen können Sie auf derselben Einstellungsseite kostenpflichtige **Teilnehmerarten** festlegen, optional **Auswahlmöglichkeiten** (Zusatzoptionen) und **Rabattcodes** definieren; die Zahlung wird über den Zahlungsdienst Ihrer Kirche abgewickelt. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](./paid-registrations.md).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder die Schaltfläche **Für diese Veranstaltung anmelden**, wenn sie die Veranstaltung auf [B1.church oder in der B1 App](../../b1-church/events/registering.md) ansehen. Wenn Sie ein Formular angehängt haben, sehen Teilnehmende während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden zusammen mit der Anmeldung gespeichert.

:::info
Anmeldefragen funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Anmeldung automatisch übersprungen statt angezeigt. Verwenden Sie daher ein nicht eingeschränktes Formular, wenn Sie einer Veranstaltung Fragen zuordnen.
:::

### Anmeldungen verwalten

So zeigen Sie Anmeldungen für Ihre Veranstaltungen an und verwalten sie:

1. Wählen Sie im Sprungmenü **Kalender > Anmeldungen**.
2. Sie sehen eine Tabelle mit allen Veranstaltungen, für die die Anmeldung aktiviert ist, mit Veranstaltungstitel, Datum, aktueller Anzahl der Anmeldungen im Verhältnis zur Kapazität und Schlagwörtern.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Anmeldungen zu sehen, einschließlich Namen, Anzahl der Mitglieder, Teilnehmerarten, Zahlungsstatus und Anmeldedatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmende hinzufügen** -- Eine Person manuell anmelden, die offline oder telefonisch angemeldet hat.
   - Einzelne Anmeldungen **stornieren**
   - Anmeldungen dauerhaft **löschen**
   - Anmeldungen von der Warteliste **nachrücken lassen**, sobald ein Platz frei wird
   - **CSV exportieren** -- Alle Anmeldungen herunterladen, einschließlich Teilnehmerarten, Auswahlmöglichkeiten, Zahlungsbeträge und Antworten auf Fragen

Wenn der Veranstaltung Anmeldefragen zugeordnet sind, zeigt die Detailseite außerdem einen Filter **Nur unbeantwortete Fragen**, mit dem Sie schnell Teilnehmende finden, die noch keine Antworten eingereicht haben, sowie bei jeder beantworteten Anmeldung eine Schaltfläche **Antworten anzeigen**, um deren Antworten einzusehen. Bei kostenpflichtigen Veranstaltungen kommen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Anzahlen je Typ und ein Dialogfeld mit Zahlungsdetails hinzu -- siehe [Kostenpflichtige Anmeldungen](./paid-registrations.md#the-registration-roster).

:::tip
Nutzen Sie die Fortschrittsanzeige der Kapazität, um zu verfolgen, wie schnell sich Veranstaltungen füllen. Der Balken wird rot, sobald eine Veranstaltung die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](./curated-calendar.md) -- Einen Kalender erstellen, der Veranstaltungen aus mehreren Gruppen übernimmt
- [Kostenpflichtige Anmeldungen](./paid-registrations.md) -- Teilnehmerarten, Zusatzoptionen, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration.md) -- Schritt-für-Schritt-Anleitung zum Einrichten der Veranstaltungsanmeldung
- [Kalenderübersicht](./index.md) -- Zurück zur Kalenderübersicht
