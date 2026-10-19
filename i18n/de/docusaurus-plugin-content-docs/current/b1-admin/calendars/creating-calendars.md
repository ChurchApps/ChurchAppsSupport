---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Wenn Sie in B1 Admin einen Kalender erstellen, können Sie eine kuratierte Übersicht über Veranstaltungen anlegen, indem Sie eine oder mehrere Gruppen verknüpfen. Veranstaltungen werden von den Gruppenleitungen innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen gesammelt an einer Stelle an. Administratoren mit Bearbeitungsrechten können Veranstaltungen für jede Gruppe hinzufügen oder bearbeiten. Gruppenleitungen ohne Administratorrechte können nur Veranstaltungen für Gruppen verwalten, die sie leiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen Administratorzugriff auf den Bereich Kalender in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), klappen Sie **Kalender** auf und klicken Sie auf **Kalender**.
2. Klicken Sie oben auf der Seite auf **Kalender hinzufügen**. Das Formular für neue Kalender öffnet sich unterhalb der Kalenderliste.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel „Veranstaltungen der Jugendarbeit“ oder „Hauptkalender der Gemeinde“).
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Detailseite des Kalenders

Nachdem Sie einen Kalender erstellt haben, klicken Sie in seiner Zeile auf **Veranstaltungen verwalten**, um die Detailseite zu öffnen. Diese Seite besteht aus zwei Hauptbereichen:

- **Linke Spalte** — Der Name des Kalenders mit seinen Aktionen (**Neue Veranstaltung**, **Bearbeiten**, **.ics importieren** und **Drucken**), darunter die Liste **Gruppen im Kalender**, die zeigt, welche Gruppen in diesem Kalender enthalten sind. Klicken Sie neben einer Gruppe auf **Entfernen**, um sie aus dem Kalender zu nehmen.
- **Hauptbereich** — Die Ansicht **Kalenderveranstaltungen** mit Veranstaltungen aus verknüpften Gruppen, darüber die Schaltflächen **Abonnieren** und **Gruppe hinzufügen**.

## Gruppen verknüpfen

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Liste **Gruppen im Kalender** auf der linken Seite der Detailseite.

1. Klicken Sie oberhalb des Kalenders auf **Gruppe hinzufügen**, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe im Auswahlmenü aus.
3. Entscheiden Sie, ob **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** übernommen werden sollen.
4. Klicken Sie auf **Speichern**.

:::tip
Gruppen mit Ihrem Kalender zu verknüpfen ist eine wirkungsvolle Methode, Veranstaltungen automatisch zusammenzuführen. Wenn eine Gruppenleitung eine Veranstaltung zu ihrer [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand für Sie in den gemeindeweiten Kalender übernommen werden.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen der Gemeinde sammelt, finden Sie unter [Kuratierter Kalender](curated-calendar) eine schlankere Vorgehensweise.
:::

## Veranstaltungen hinzufügen und bearbeiten {#adding-and-editing-events}

Klicken Sie auf der Detailseite des Kalenders auf **Neue Veranstaltung**, um eine Veranstaltung hinzuzufügen, oder klicken Sie im Kalender auf eine Veranstaltung und dann auf **Bearbeiten**, um sie zu ändern. Das Formular **Neue Veranstaltung** / **Veranstaltung bearbeiten** enthält folgende Felder:

- **Gruppe** — Die Gruppe, zu der die Veranstaltung gehört. Wenn Ihre Gemeinde Veranstaltungsvorlagen verwendet, können Sie außerdem eine **Vorlage** auswählen, um das Formular auszufüllen.
- **Titel**
- **Veranstaltungsfoto** — Klicken Sie auf **Foto hinzufügen** (oder auf das leere Fotofeld), um ein Bild auszuwählen oder hochzuladen; es wird auf das Breitformat 16:9 zugeschnitten. Klicken Sie auf **Foto ändern**, um es zu ersetzen. Das Foto wird oben auf der Seite der Veranstaltung auf Ihrer Website angezeigt und als Kachel, wenn ein Kalender-Element **Kommende Veranstaltungen** anzeigt (siehe [Veranstaltungen auf Ihrer Website anzeigen](#showing-events-on-your-website)).
- **Beschreibung** — Wird auf der Seite der Veranstaltung auf Ihrer Website angezeigt. Fettschrift, Listen und Links werden unterstützt.
- **Beginn** und **Ende**, **Wiederholung** und **Sichtbarkeit** (**Öffentlich** oder **Privat**).
- **Schlagwörter** — Durch Kommas getrennte Bezeichnungen, zum Beispiel `Jugend, Schüler`. Ein Kalender-Element auf Ihrer Website kann so eingestellt werden, dass nur Veranstaltungen mit einem bestimmten Schlagwort angezeigt werden. Dies ist dasselbe Feld **Schlagwörter**, das auch in den Anmeldeeinstellungen der Veranstaltung erscheint.
- **Wer Notizen sehen darf** und **Wer Notizen verfassen darf** — Wer die Notizen der Veranstaltung lesen und ergänzen darf (siehe [Notizen zu Veranstaltungen](#event-notes)). Wählen Sie **Nur Mitarbeitende** (die Voreinstellung), **Gruppenleitungen** (Leitungen der Gruppe der Veranstaltung) oder **Gruppenmitglieder** (alle in der Gruppe der Veranstaltung, einschließlich ihrer Leitungen).
- **Räume** und **Ressourcen** — Reservieren Sie Raum und Ausstattung für die Veranstaltung. Siehe [Räume, Ressourcen & Terminplanung](rooms-resources).

Klicken Sie auf **Speichern**. Wenn sich die Veranstaltung wiederholt, fragt B1 nach einer Bestätigung, denn beim Speichern werden alle Termine der Serie aktualisiert.

### Notizen zu Veranstaltungen {#event-notes}

Jede Veranstaltung hat einen eigenen Notizverlauf für Planung und Nachbereitung. Klicken Sie auf der Detailseite des Kalenders auf eine Veranstaltung; der Dialog zeigt die Details der Veranstaltung, ihre Erinnerungen und darunter ihre **Notizen**. Geben Sie eine Notiz ein und senden Sie sie, um sie dem Verlauf hinzuzufügen.

Mitarbeitende mit der Berechtigung, Inhalte zu bearbeiten oder Kalender zu verwalten, können Notizen zu Veranstaltungen immer lesen und verfassen. Mit den Einstellungen **Wer Notizen sehen darf** und **Wer Notizen verfassen darf** legen Sie für die Veranstaltung fest, ob auch die Leitungen oder Mitglieder der Gruppe der Veranstaltung das können.

### Veranstaltungen auf Ihrer Website anzeigen {#showing-events-on-your-website}

Um einen Kalender auf Ihrer Website anzuzeigen, fügen Sie einer Seite ein Element **Kalender** hinzu und wählen Sie diesen Kalender aus. Das Element kann einen Monatskalender oder ein Raster mit Kacheln für kommende Veranstaltungen zeigen und lässt sich auf Veranstaltungen mit einem bestimmten Schlagwort beschränken. Besucher, die auf eine Veranstaltung klicken, öffnen deren eigene Seite. Siehe [Das Kalender-Element verwenden](../website/page-editor.md#using-the-calendar-element).

## Veranstaltungsanmeldung aktivieren {#enabling-event-registration}

Sie können für jede Kalenderveranstaltung die Anmeldung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine bestehende Veranstaltung oder erstellen Sie eine neue.
2. Aktivieren Sie im Veranstaltungseditor den Schalter **Anmeldung**.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) — Legen Sie eine maximale Anzahl von Anmeldungen fest. Leer lassen für unbegrenzt.
   - **Anmeldung öffnet** — Datum und Uhrzeit, ab denen die Anmeldung möglich ist.
   - **Anmeldung schließt** — Datum und Uhrzeit, zu denen die Anmeldung endet.
   - **Schlagwörter** — Durch Kommas getrennte Bezeichnungen (z. B. „Jugend, Freizeit, VBS“), um anmeldbare Veranstaltungen zu kategorisieren.
   - **Fragen zur Anmeldung** — Optional können Sie ein [Formular](../forms/creating-forms.md) anhängen, damit Angemeldete bei der Anmeldung zusätzliche Fragen beantworten (Ernährungsbedürfnisse, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um keine Fragen zu stellen.
   - **Warteliste aktivieren** — Ist die Veranstaltung voll, können weitere Interessierte auf eine Warteliste gesetzt werden, statt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](paid-registrations#waitlist).
4. Speichern Sie die Veranstaltung.

Bei kostenpflichtigen Veranstaltungen können Sie auf derselben Einstellungsseite preisgestaffelte **Teilnehmerarten**, optionale **Auswahlmöglichkeiten** (Zusatzleistungen) und **Rabattcodes** festlegen. Die Zahlung wird über den Zahlungsanbieter Ihrer Gemeinde abgewickelt. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](paid-registrations).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder die Schaltfläche **Für diese Veranstaltung anmelden**, wenn sie die Veranstaltung auf der [B1-Website](../../b1-church/events/registering) oder in der [B1-App für mobile Geräte](../../b1-mobile/events/registering) ansehen. Wenn Sie ein Formular angehängt haben, sehen Angemeldete während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden zusammen mit der Anmeldung gespeichert.

:::info
Fragen zur Anmeldung funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Anmeldung automatisch übersprungen und nicht angezeigt. Verwenden Sie daher für Fragen zu einer Veranstaltung ein nicht eingeschränktes Formular.
:::

### Anmeldungen verwalten

So zeigen Sie Anmeldungen zu Ihren Veranstaltungen an und verwalten sie:

1. Wählen Sie im Jump-Menü **Kalender > Anmeldungen**.
2. Sie sehen eine Tabelle mit allen Veranstaltungen, für die die Anmeldung aktiviert ist. Sie zeigt Titel, Datum, aktuelle Anzahl der Anmeldungen im Verhältnis zur Kapazität und Schlagwörter der Veranstaltung.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Anmeldungen zu sehen, einschließlich Namen, Anzahl der Mitglieder, Teilnehmerarten, Zahlungsstatus und Anmeldedatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmer hinzufügen** — Eine Person manuell anmelden, die offline oder telefonisch angemeldet hat.
   - Einzelne Anmeldungen **stornieren**
   - Anmeldungen dauerhaft **löschen**
   - Anmeldungen von der Warteliste **nachrücken lassen**, sobald ein Platz frei wird
   - **CSV exportieren** — Alle Anmeldungen herunterladen, einschließlich Teilnehmerarten, Auswahlmöglichkeiten, Zahlungsbeträge und Antworten auf Fragen

Wenn der Veranstaltung Fragen zur Anmeldung zugeordnet sind, bietet die Detailseite außerdem einen Filter **Nur unbeantwortete Fragen**, mit dem Sie schnell Angemeldete finden, die noch keine Antworten abgegeben haben, sowie bei jeder beantworteten Anmeldung eine Schaltfläche **Antworten anzeigen**, um deren Antworten einzusehen. Bei kostenpflichtigen Veranstaltungen kommen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Zählungen je Typ und ein Dialog mit Zahlungsdetails hinzu – siehe [Kostenpflichtige Anmeldungen](paid-registrations#the-registration-roster).

:::tip
Mit dem Fortschrittsbalken der Kapazität behalten Sie im Blick, wie schnell sich Veranstaltungen füllen. Der Balken wird rot, sobald eine Veranstaltung die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) — Einen Kalender erstellen, der Veranstaltungen aus mehreren Gruppen übernimmt
- [Kostenpflichtige Anmeldungen](paid-registrations) — Teilnehmerarten, Zusatzauswahl, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration) — Schritt-für-Schritt-Anleitung zur Einrichtung der Veranstaltungsanmeldung
- [Übersicht Kalender](./) — Zurück zur Übersicht der Kalender
