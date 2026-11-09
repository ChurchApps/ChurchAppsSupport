---
title: "Kalender erstellen"
description: "Einen Kalender in B1 Admin anlegen, Gruppen verknüpfen oder .ics-Dateien importieren und Veranstaltungen, Anmeldungen und Notizen an einem Ort verwalten."
---

# Kalender erstellen

<div class="article-intro">

Wenn Sie in B1 Admin einen Kalender erstellen, können Sie eine gebündelte Übersicht über Veranstaltungen anlegen, indem Sie eine oder mehrere Gruppen verknüpfen. Veranstaltungen werden von den Gruppenleitungen innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen gesammelt an. Administratoren mit Bearbeitungsrechten können Veranstaltungen für jede Gruppe hinzufügen oder bearbeiten. Gruppenleitungen ohne Administratorrechte können nur Veranstaltungen ihrer eigenen Gruppen verwalten.

</div>

## Schulungsvideo

<YouTube id="Ko3kgsCSLFs" title="Kalender, Veranstaltungen und Raumbuchungen in B1 erstellen" next="Veranstaltungsanmeldung und kostenpflichtige Veranstaltungen in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen in Ihren Kalender aufgenommen werden sollen
- Sie benötigen Administratorzugriff auf den Bereich Kalender in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Kalender**.
2. Klicken Sie oben auf der Seite auf **Kalender hinzufügen**. Das Formular für den neuen Kalender öffnet sich unter der Kalenderliste.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel „Veranstaltungen Jugendarbeit“ oder „Hauptkalender der Gemeinde“).
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Detailseite des Kalenders

Nachdem Sie einen Kalender erstellt haben, klicken Sie in seiner Zeile auf **Veranstaltungen verwalten**, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Der Name des Kalenders mit seinen Aktionen (**Neue Veranstaltung**, **Bearbeiten**, **.ics importieren** und **Drucken**), darunter die Liste **Gruppen im Kalender** mit den Gruppen, die in diesem Kalender enthalten sind. Klicken Sie neben einer Gruppe auf **Entfernen**, um sie aus dem Kalender zu nehmen.
- **Hauptbereich** -- Die Ansicht **Kalenderveranstaltungen** mit Veranstaltungen aus verknüpften Gruppen, darüber die Schaltflächen **Abonnieren** und **Gruppe hinzufügen**. Jede Veranstaltung wird in der Farbe ihrer Gruppe dargestellt. Die Farben werden automatisch vergeben, und eine Gruppe behält in jedem Kalender dieselbe Farbe.

Klicken Sie auf **Drucken**, um einen druckbaren Monat zu erhalten. Der Ausdruck beginnt mit dem hellen Hintergrundlogo Ihrer Gemeinde (aus [Erscheinungsbild](../website/appearance.md), falls Sie eines festgelegt haben), dem Namen der Gemeinde und dem Namen des Kalenders. Veranstaltungsnamen werden über mehrere Zeilen umbrochen statt abgeschnitten, und die Gruppenfarben bleiben erhalten.

## Gruppen verknüpfen

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Liste **Gruppen im Kalender** auf der linken Seite der Detailseite.

1. Klicken Sie oberhalb des Kalenders auf **Gruppe hinzufügen**, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus dem Dropdown-Menü aus. Die Liste enthält alle Gruppen Ihrer Gemeinde, nicht nur die Gruppen, in denen Sie Mitglied sind.
3. Wählen Sie, ob **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** einbezogen werden sollen.
4. Klicken Sie auf **Speichern**.

Jede Veranstaltung erscheint nur einmal im Kalender. Wenn Sie eine ganze Gruppe hinzufügen, werden alle ihre Veranstaltungen, die Sie bereits einzeln hinzugefügt hatten, in den Gruppeneintrag übernommen. Bestimmte Veranstaltungen einer Gruppe auszuwählen, die bereits im Kalender ist, fügt nichts Neues hinzu. Unter **Gruppen im Kalender** werden nur Gruppen aufgeführt, die als Ganzes hinzugefügt wurden.

### Eine .ics-Datei importieren

Klicken Sie auf **.ics importieren**, um Veranstaltungen aus einem anderen Kalender zu übernehmen. Wählen Sie die **Gruppe**, zu der die Veranstaltungen gehören sollen, klicken Sie dann auf **.ics-Datei auswählen** oder fügen Sie den Inhalt der Datei ein, und klicken Sie auf **Importieren**. Die Veranstaltungen werden in dieser Gruppe angelegt, und die Gruppe wird dem Kalender hinzugefügt, aus dem Sie importiert haben. So erscheinen die Veranstaltungen sofort dort.

### Eine Veranstaltung aus dem Kalender entfernen

Klicken Sie im Kalender auf eine Veranstaltung und anschließend auf **Aus Kalender entfernen**. Dadurch wird die Veranstaltung nur aus diesem Kalender entfernt. Sie selbst bleibt in ihrer Gruppe erhalten. Ist die Veranstaltung im Kalender, weil ihre ganze Gruppe hinzugefügt wurde, entfernt diese Aktion alle Veranstaltungen dieser Gruppe aus dem Kalender (die Veranstaltungen bleiben aber in der Gruppe). Um eine Veranstaltung endgültig zu löschen, entfernen Sie sie im [Gruppenkalender](../groups/group-calendar.md).

:::tip
Gruppen mit Ihrem Kalender zu verknüpfen ist eine praktische Methode, Veranstaltungen automatisch zusammenzuführen. Wenn eine Gruppenleitung eine Veranstaltung zu ihrer [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand in Ihren gemeindeweiten Kalender übernommen werden.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen Ihrer Gemeinde zusammenführt, lesen Sie [Kuratierter Kalender](./curated-calendar.md) für einen schlankeren Ansatz.
:::

## Veranstaltungen hinzufügen und bearbeiten {#adding-and-editing-events}

Klicken Sie auf der Detailseite des Kalenders auf **Neue Veranstaltung**, um eine Veranstaltung hinzuzufügen. Oder klicken Sie im Kalender auf eine Veranstaltung und anschließend auf **Bearbeiten**, um sie zu ändern. Das Formular **Neue Veranstaltung** / **Veranstaltung bearbeiten** enthält diese Felder:

- **Gruppe** -- Die Gruppe, zu der die Veranstaltung gehört. Wenn Ihre Gemeinde Veranstaltungsvorlagen hat, können Sie außerdem eine **Vorlage** auswählen, um das Formular vorzubefüllen.
- **Titel**
- **Veranstaltungsfoto** -- Klicken Sie auf **Foto hinzufügen** (oder auf das leere Fotofeld), um ein Bild auszuwählen oder hochzuladen. Es wird auf ein breites Format von 16:9 zugeschnitten. Klicken Sie auf **Foto ändern**, um es zu ersetzen. Das Foto wird oben auf der Veranstaltungsseite Ihrer Website angezeigt und als Kachel, wenn ein Kalender-Element **Kommende Veranstaltungen** anzeigt (siehe [Veranstaltungen auf Ihrer Website anzeigen](#showing-events-on-your-website)).
- **Beschreibung** -- Wird auf der Veranstaltungsseite Ihrer Website angezeigt. Fettschrift, Listen und Links werden unterstützt.
- **Beginn** und **Ende**, **Wiederholung** und **Sichtbarkeit** (**Öffentlich** oder **Privat**).
- **Schlagwörter** -- Durch Kommas getrennte Bezeichnungen, zum Beispiel `Jugend, Schüler`. Ein Kalender-Element auf Ihrer Website kann so eingestellt werden, dass nur Veranstaltungen mit einem bestimmten Schlagwort angezeigt werden. Dies ist dasselbe Feld **Schlagwörter**, das auch in den Anmeldeeinstellungen der Veranstaltung erscheint.
- **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** -- Legt fest, wer die Notizen der Veranstaltung lesen und ergänzen darf (siehe [Notizen zu Veranstaltungen](#event-notes)). Wählen Sie **Nur Mitarbeitende** (die Standardeinstellung), **Gruppenleitungen** (Leitungen der Gruppe der Veranstaltung) oder **Gruppenmitglieder** (alle in der Gruppe der Veranstaltung, einschließlich ihrer Leitungen).
- **Räume** und **Ressourcen** -- Reservieren Sie Platz und Ausstattung für die Veranstaltung. Siehe [Räume, Ressourcen & Planung](./rooms-resources.md).

Klicken Sie auf **Speichern**. Wenn sich die Veranstaltung wiederholt, bittet B1 um eine Bestätigung, weil beim Speichern alle Termine der Reihe aktualisiert werden.

### Notizen zu Veranstaltungen {#event-notes}

Jede Veranstaltung hat einen eigenen Notizverlauf für Planung und Nachbereitung. Klicken Sie auf der Detailseite des Kalenders auf eine Veranstaltung. Der Dialog zeigt die Details der Veranstaltung, ihre Erinnerungen und darunter die **Notizen**. Schreiben Sie eine Notiz und veröffentlichen Sie sie, um sie dem Verlauf hinzuzufügen.

Mitarbeitende mit der Berechtigung, Inhalte zu bearbeiten oder Kalender zu verwalten, können Notizen zu Veranstaltungen immer lesen und verfassen. Die Einstellungen **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** der Veranstaltung bestimmen, ob auch die Gruppenleitungen oder Mitglieder der Veranstaltungsgruppe dies dürfen.

### Veranstaltungen auf Ihrer Website anzeigen {#showing-events-on-your-website}

Um einen Kalender auf Ihrer Website anzuzeigen, fügen Sie einer Seite ein **Kalender**-Element hinzu und wählen Sie diesen Kalender aus. Das Element kann einen Monatskalender oder ein Raster mit Kacheln kommender Veranstaltungen anzeigen und lässt sich auf Veranstaltungen mit einem bestimmten Schlagwort beschränken. Besucher, die auf eine Veranstaltung klicken, öffnen deren eigene Veranstaltungsseite. Siehe [Verwenden des Kalender-Elements](../website/page-editor.md#using-the-calendar-element).

## Veranstaltungsanmeldung aktivieren {#enabling-event-registration}

Sie können für jede Kalenderveranstaltung die Anmeldung aktivieren, damit sich Mitglieder über die B1-Website oder die B1-App anmelden können.

1. Klicken Sie auf eine bestehende Veranstaltung oder legen Sie eine neue an.
2. Aktivieren Sie im Veranstaltungseditor den Schalter **Anmeldung**.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl an Anmeldungen fest. Lassen Sie das Feld leer für unbegrenzt.
   - **Anmeldung öffnet** -- Datum und Uhrzeit, ab denen die Anmeldung möglich ist.
   - **Anmeldung schließt** -- Datum und Uhrzeit, zu denen die Anmeldung endet.
   - **Schlagwörter** -- Durch Kommas getrennte Bezeichnungen (z. B. „Jugend, Freizeit, Kinderbibelwoche“), um anmeldbare Veranstaltungen zu kategorisieren.
   - **Anmeldefragen** -- Optional können Sie ein [Formular](../forms/creating-forms.md) anhängen, damit Teilnehmende zusätzliche Fragen beantworten (Ernährungsbedürfnisse, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um keine Fragen zu stellen.
   - **Warteliste aktivieren** -- Wenn die Veranstaltung ausgebucht ist, können weitere Interessierte auf eine Warteliste gesetzt werden, statt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](./paid-registrations.md#waitlist).
4. Speichern Sie die Veranstaltung.

Bei kostenpflichtigen Veranstaltungen können Sie auf derselben Einstellungsseite Teilnehmendentypen mit Preisen, optionale **Auswahlmöglichkeiten** (Zusatzleistungen) und **Rabattcodes** festlegen. Die Zahlung wird über den Zahlungsanbieter Ihrer Gemeinde für Spenden abgewickelt. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](./paid-registrations.md).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder die Schaltfläche **Für diese Veranstaltung anmelden**, wenn sie die Veranstaltung auf [B1.church oder in der B1-App](../../b1-church/events/registering.md) ansehen. Wenn Sie ein Formular angehängt haben, sehen Teilnehmende während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden mit der Anmeldung gespeichert.

:::info
Anmeldefragen funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Anmeldung automatisch übersprungen und nicht angezeigt. Verwenden Sie daher beim Anhängen von Fragen an eine Veranstaltung ein nicht eingeschränktes Formular.
:::

### Anmeldungen verwalten

So zeigen und verwalten Sie die Anmeldungen zu Ihren Veranstaltungen:

1. Wählen Sie im Sprungmenü **Kalender > Anmeldungen**.
2. Sie sehen eine Tabelle mit allen Veranstaltungen, für die die Anmeldung aktiviert ist. Sie zeigt den Titel der Veranstaltung, das Datum, die aktuelle Anzahl der Anmeldungen im Verhältnis zur Kapazität und die Schlagwörter.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Anmeldungen zu sehen, mit Namen, Anzahl der Mitglieder, Teilnehmendentypen, Zahlungsstatus und Anmeldedatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmende hinzufügen** -- Eine Person manuell anmelden, die offline oder telefonisch angemeldet wurde.
   - Einzelne Anmeldungen **stornieren**
   - Anmeldungen dauerhaft **löschen**
   - Anmeldungen von der Warteliste **nachrücken lassen**, sobald ein Platz frei wird
   - **CSV exportieren** -- Alle Anmeldungen herunterladen, einschließlich Teilnehmendentypen, Auswahlmöglichkeiten, Zahlungsbeträgen und Antworten auf Fragen

Wenn an der Veranstaltung Anmeldefragen hängen, bietet die Detailseite außerdem den Filter **Nur unbeantwortete Fragen**, mit dem Sie schnell Teilnehmende finden, die noch keine Antworten abgegeben haben. Außerdem gibt es bei jeder beantworteten Anmeldung eine Schaltfläche **Antworten anzeigen**, mit der Sie die Antworten einsehen. Bei kostenpflichtigen Veranstaltungen kommen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Zahlen pro Typ und ein Dialog mit Zahlungsdetails hinzu. Siehe [Kostenpflichtige Anmeldungen](./paid-registrations.md#the-registration-roster).

:::tip
Mit der Fortschrittsleiste für die Kapazität sehen Sie, wie schnell sich Veranstaltungen füllen. Die Leiste wird rot, sobald eine Veranstaltung die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](./curated-calendar.md) -- Einen Kalender erstellen, der Veranstaltungen aus mehreren Gruppen zusammenführt
- [Kostenpflichtige Anmeldungen](./paid-registrations.md) -- Teilnehmendentypen, Zusatzauswahl, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration.md) -- Schritt-für-Schritt-Anleitung zur Einrichtung der Veranstaltungsanmeldung
- [Kalenderübersicht](./index.md) -- Zurück zur Kalenderübersicht
