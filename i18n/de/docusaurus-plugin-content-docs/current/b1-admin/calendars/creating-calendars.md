---
title: "Kalender erstellen"
description: "Erstellen Sie in B1 Admin einen Kalender, verbinden Sie Gruppen oder importieren Sie .ics-Dateien und verwalten Sie seine Ereignisse, Anmeldungen und Notizen an einem Ort."
---

# Kalender erstellen

<div class="article-intro">

Mit einem Kalender in B1 Admin erstellen Sie eine kuratierte Ansicht von Ereignissen, indem Sie eine oder mehrere Gruppen verbinden. Ereignisse werden von den Gruppenleitern innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Ereignisse an einem Ort. Administratoren mit Bearbeitungsrechten können Ereignisse für jede Gruppe hinzufügen oder bearbeiten. Gruppenleiter ohne Administratorrechte können nur Ereignisse für Gruppen verwalten, die sie leiten.

</div>

## Schulungsvideo {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Kalender, Ereignisse und Raumbuchungen in B1 erstellen" next="Veranstaltungsanmeldung und kostenpflichtige Ereignisse in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Ereignisse Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen die Berechtigung **Inhalte bearbeiten**

</div>

## Einen neuen Kalender erstellen {#creating-a-new-calendar}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Kalender**.
2. Klicken Sie oben auf der Seite auf **Kalender hinzufügen**. Das Formular für den neuen Kalender öffnet sich unterhalb der Kalenderliste.
3. Geben Sie einen **Kalendernamen** ein (zum Beispiel „Jugendveranstaltungen“ oder „Haupt-Gemeindekalender“).
4. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

Um einen Kalender später umzubenennen oder zu löschen, fahren Sie auf der Seite Kalender mit der Maus über seine Zeile und klicken Sie auf **Bearbeiten** (oder auf der Detailseite des Kalenders auf **Bearbeiten**).

## Die Detailseite des Kalenders {#the-calendar-detail-page}

Nachdem Sie einen Kalender erstellt haben, klicken Sie auf seinen Namen (oder fahren Sie mit der Maus über seine Zeile und klicken Sie auf **Ereignisse verwalten**), um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** – Der Name des Kalenders mit seinen Aktionen (**Neues Ereignis**, **Bearbeiten**, **.ics importieren** und **Drucken**), ein Link zu ausstehenden Genehmigungen und die Liste **Gruppen im Kalender**, die zeigt, welche Gruppen in diesem Kalender enthalten sind. Klicken Sie neben einer Gruppe auf **Entfernen**, um sie aus dem Kalender zu nehmen.
- **Hauptbereich** – Die Ansicht **Kalenderereignisse** mit Ereignissen aus verbundenen Gruppen, darüber die Schaltflächen **Abonnieren** und **Gruppe hinzufügen**. Mit **Heute**, **Zurück**, **Weiter** und den Ansichten **Monat**, **Woche**, **Tag** und **Agenda** navigieren Sie durch den Kalender. Jedes Ereignis wird in der Farbe seiner Gruppe dargestellt. Farben werden automatisch vergeben, und eine Gruppe behält in jedem Kalender dieselbe Farbe.

Klicken Sie auf **Drucken**, um einen Monat druckbar anzuzeigen. Der Ausdruck beginnt mit dem hellen Hintergrundlogo Ihrer Kirche (aus [Erscheinungsbild](../website/appearance.md), falls Sie eines festgelegt haben), dem Namen der Kirche und dem Namen des Kalenders. Ereignisnamen werden auf mehrere Zeilen umgebrochen, statt abgeschnitten zu werden, und die Gruppenfarben bleiben erhalten.

## Gruppen verbinden {#connecting-groups}

Gruppen, die Ereignisse im Kalender haben, erscheinen automatisch in der Liste **Gruppen im Kalender** auf der linken Seite der Detailseite.

1. Klicken Sie über dem Kalender auf **Gruppe hinzufügen**, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe unter **Gruppe auswählen**. Die Liste enthält jede Gruppe Ihrer Kirche, nicht nur die Gruppen, denen Sie angehören.
3. Wählen Sie **Alle Ereignisse der Gruppe hinzufügen** oder **Bestimmte Ereignisse hinzufügen** und klicken Sie im kleinen Kalender, der erscheint, auf jedes gewünschte Ereignis.
4. Klicken Sie auf **Speichern**.

Jedes Ereignis erscheint nur einmal im Kalender. Wenn Sie eine ganze Gruppe hinzufügen, werden Ereignisse dieser Gruppe, die Sie bereits einzeln hinzugefügt hatten, in den Gruppeneintrag übernommen. Bestimmte Ereignisse aus einer Gruppe, die bereits im Kalender ist, hinzuzufügen, bewirkt nichts Neues. Nur Gruppen, die als Ganzes hinzugefügt wurden, werden unter **Gruppen im Kalender** aufgelistet.

### Eine .ics-Datei importieren {#importing-an-ics-file}

Klicken Sie auf **.ics importieren**, um Ereignisse aus einem anderen Kalender zu übernehmen. Wählen Sie die **Gruppe**, zu der die Ereignisse gehören sollen, klicken Sie dann auf **.ics-Datei auswählen** oder fügen Sie den Inhalt der Datei ein und klicken Sie auf **Importieren**. Die Ereignisse werden in dieser Gruppe angelegt, und die Gruppe wird dem Kalender hinzugefügt, aus dem Sie importiert haben, sodass die Ereignisse dort sofort erscheinen.

### Ein Ereignis aus dem Kalender entfernen {#removing-an-event-from-the-calendar}

Klicken Sie im Kalender auf ein Ereignis und dann auf **Aus Kalender entfernen**. Dadurch wird das Ereignis nur aus diesem Kalender genommen – das Ereignis selbst bleibt in seiner Gruppe. Wenn das Ereignis im Kalender ist, weil die ganze Gruppe hinzugefügt wurde, entfernt diese Aktion alle Ereignisse dieser Gruppe aus dem Kalender (die Ereignisse bleiben jedoch in der Gruppe). Um ein Ereignis endgültig zu löschen, entfernen Sie es im [Gruppenkalender](../groups/group-calendar.md).

:::tip
Gruppen mit Ihrem Kalender zu verbinden ist eine wirkungsvolle Methode, Ereignisse automatisch zu bündeln. Wenn ein Gruppenleiter ein Ereignis zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann es ohne zusätzlichen Aufwand für Sie in den gemeindeweiten Kalender einfließen.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Ereignisse aus vielen Gruppen Ihrer Kirche zusammenführt, lesen Sie [Kuratierter Kalender](./curated-calendar.md) für einen schlankeren Ansatz.
:::

## Ereignisse hinzufügen und bearbeiten {#adding-and-editing-events}

Klicken Sie auf der Detailseite des Kalenders auf **Neues Ereignis**, um ein Ereignis hinzuzufügen, oder klicken Sie im Kalender auf ein Ereignis und dann auf **Bearbeiten**, um es zu ändern. Das Formular **Neues Ereignis** / **Ereignis bearbeiten** enthält folgende Felder:

- **Gruppe** – Die Gruppe, zu der das Ereignis gehört. Wenn Ihre Kirche Ereignisvorlagen hat, können Sie außerdem eine **Vorlage** wählen, um das Formular auszufüllen.
- **Titel**
- **Ereignisfoto** – Klicken Sie auf **Foto hinzufügen** (oder auf das leere Fotofeld), um ein Bild auszuwählen oder hochzuladen, das im Format 16:9 zugeschnitten wird. Mit **Foto ändern** ersetzen Sie es. Das Foto wird oben auf der Seite des Ereignisses auf Ihrer Website angezeigt und als seine Kachel, wenn ein Element Kalender **Kommende Ereignisse** anzeigt (siehe [Ereignisse auf Ihrer Website anzeigen](#showing-events-on-your-website)).
- **Beschreibung** – Wird auf der Seite des Ereignisses auf Ihrer Website angezeigt. Fettschrift, Listen und Links werden unterstützt.
- **Beginn** und **Ende**, **Wiederholen** und **Sichtbarkeit** (**Öffentlich** oder **Privat**).
- **Schlagwörter** – durch Kommas getrennte Bezeichnungen, etwa `youth, students`. Ein Element Kalender auf Ihrer Website lässt sich so einstellen, dass nur Ereignisse mit einem bestimmten Schlagwort angezeigt werden. Dies ist dasselbe Feld **Schlagwörter**, das auch in den Anmeldeeinstellungen des Ereignisses erscheint.
- **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** – legt fest, wer die Notizen des Ereignisses lesen und ergänzen kann (siehe [Notizen zu Ereignissen](#event-notes)). Wählen Sie **Nur Mitarbeitende** (Standard), **Gruppenleitende** (Leitende der Gruppe des Ereignisses) oder **Gruppenmitglieder** (alle Personen in der Gruppe des Ereignisses, einschließlich ihrer Leitenden).
- **Räume** und **Ressourcen** – Reservieren Sie Raum und Ausstattung für das Ereignis. Siehe [Räume, Ressourcen & Terminplanung](./rooms-resources.md). Sobald eine Auswahl getroffen ist, können Sie außerdem Aufbau- und Abbauzeit oder ein eigenes Reservierungsfenster festlegen – siehe [Einen Raum oder eine Ressource buchen](./availability.md#booking-a-room-or-resource).
- **Erinnerungen** – Klappen Sie diesen Abschnitt auf, um vor dem Ereignis Erinnerungen zu versenden. Siehe [Ereigniserinnerungen](./event-reminders.md).

**Gruppe**, **Titel**, **Beginn** und **Ende** sind Pflichtfelder, und das Ende muss nach dem Beginn liegen. Klicken Sie auf **Speichern**. Wiederholt sich das Ereignis, bittet B1 um eine Bestätigung, da beim Speichern jeder Termin der Serie aktualisiert wird. Um ein Ereignis zu löschen, öffnen Sie es im Editor und klicken Sie auf **Löschen**.

### Notizen zu Ereignissen {#event-notes}

Jedes Ereignis hat einen eigenen Notizverlauf für Planung und Nachbereitung. Klicken Sie auf der Detailseite des Kalenders auf ein Ereignis; der Dialog zeigt die Details des Ereignisses, seine Erinnerungen und darunter seine **Notizen**, mit den Schaltflächen **Bearbeiten**, **Anmeldungen verwalten** und **Aus Kalender entfernen**. Geben Sie eine Notiz ein und veröffentlichen Sie sie, um sie dem Verlauf hinzuzufügen.

Mitarbeitende mit der Berechtigung, Inhalte zu bearbeiten oder Kalender zu verwalten, können Notizen zu Ereignissen immer lesen und verfassen. Die Einstellungen **Wer Notizen sehen kann** und **Wer Notizen verfassen kann** des Ereignisses bestimmen, ob auch die Leitenden oder Mitglieder der Gruppe des Ereignisses dies dürfen.

### Ereignisse auf Ihrer Website anzeigen {#showing-events-on-your-website}

Um einen Kalender auf Ihrer Website anzuzeigen, fügen Sie einer Seite ein Element **Kalender** hinzu und wählen Sie diesen Kalender. Das Element kann einen Monatskalender oder ein Raster mit Kacheln kommender Ereignisse anzeigen und lässt sich auf Ereignisse mit einem bestimmten Schlagwort beschränken. Besucher, die auf ein Ereignis klicken, öffnen dessen eigene Seite. Siehe [Das Element Kalender verwenden](../website/page-editor.md#using-the-calendar-element).

## Anmeldung zu Ereignissen aktivieren {#enabling-event-registration}

Sie können für jedes Kalenderereignis eine Anmeldung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie im Kalender auf ein bestehendes Ereignis (legen Sie es zuerst an, falls nötig) und klicken Sie auf **Anmeldungen verwalten**. Die Anmeldeseite des Ereignisses öffnet sich. (Die Schaltfläche **Anmeldung aktivieren** auf der Seite **Anmeldungen** führt Sie zu Ihren Kalendern, um ein Ereignis auszuwählen.)
2. Klicken Sie auf **Einstellungen bearbeiten** und aktivieren Sie dann in der Karte **Anmeldeeinstellungen** die Option **Anmeldung aktivieren**.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) – Legen Sie eine maximale Anzahl an Anmeldungen fest. Leer lassen für unbegrenzt.
   - **Anmeldung öffnet** – Datum und Uhrzeit, ab denen die Anmeldung verfügbar ist.
   - **Anmeldung schließt** – Datum und Uhrzeit, zu denen die Anmeldung endet.
   - **Schlagwörter** – durch Kommas getrennte Bezeichnungen (z. B. „Jugend, Freizeit, VBS“), die helfen, anmeldbare Ereignisse zu kategorisieren.
   - **Anmeldefragen** – Sie können optional ein [Formular](../forms/creating-forms.md) anhängen, damit Angemeldete bei der Anmeldung zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um keine Fragen zu stellen.
   - **Warteliste aktivieren** – Wenn das Ereignis voll ist, können zusätzliche Anmeldungen auf eine Warteliste gesetzt werden, statt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](./paid-registrations.md#waitlist).
4. Klicken Sie auf **Einstellungen speichern**.

Bei kostenpflichtigen Ereignissen können Sie auf derselben Einstellungsseite kostenpflichtige **Teilnehmerarten**, optionale **Auswahlmöglichkeiten** (Zusatzleistungen) und **Rabattcodes** festlegen. Die Zahlung wird über den Zahlungsanbieter Ihrer Kirche abgewickelt. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](./paid-registrations.md).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder eine Schaltfläche **Für dieses Ereignis anmelden**, wenn sie das Ereignis auf [B1.church oder in der B1-App](../../b1-church/events/registering.md) ansehen. Wenn Sie ein Formular angehängt haben, sehen Angemeldete während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden mit ihrer Anmeldung gespeichert.

:::info
Anmeldefragen funktionieren nur mit Formularen, die **nicht** als Eingeschränkt markiert sind. Ein eingeschränktes Formular wird bei der Anmeldung automatisch übersprungen, statt angezeigt zu werden. Verwenden Sie daher für Fragen an ein Ereignis ein nicht eingeschränktes Formular.
:::

### Anmeldungen verwalten {#managing-registrations}

So sehen und verwalten Sie die Anmeldungen zu Ihren Ereignissen:

1. Wählen Sie im Sprungmenü **Kalender > Anmeldungen**.
2. Sie sehen eine Tabelle aller Ereignisse mit aktivierter Anmeldung, mit Ereignistitel, Datum, aktueller Anzahl der Anmeldungen im Verhältnis zur Kapazität und Schlagwörtern. Geben Sie unter **Ereignisse suchen** einen Begriff ein, um die Tabelle zu filtern.
3. Klicken Sie auf den Namen eines Ereignisses, um die vollständige Liste der Anmeldungen mit den Spalten **Name**, **Mitglieder**, **Art**, **Bezahlt / Gesamt**, **Status** und **Datum** zu sehen.
4. Auf der Detailseite können Sie:
   - **Teilnehmende hinzufügen** – Manuell eine Person anmelden, die offline oder telefonisch angemeldet hat.
   - **Anmeldung stornieren** bei einzelnen Anmeldungen (fragt zur Bestätigung)
   - Anmeldungen dauerhaft **löschen** (fragt zur Bestätigung)
   - Angemeldete auf der Warteliste **nachrücken lassen**, sobald ein Platz frei wird
   - **CSV exportieren** – Alle Anmeldungen herunterladen, einschließlich Teilnehmerarten, Auswahlmöglichkeiten, Zahlungsbeträge und Antworten auf Fragen

   Diese Zeilenaktionen sind Symbole am Ende jeder Zeile; fahren Sie mit der Maus über ein Symbol, um seinen Namen zu sehen.

Wenn dem Ereignis Anmeldefragen angehängt sind, zeigt die Detailseite außerdem einen Filter **Nur unbeantwortete Fragen**, um Angemeldete schnell zu finden, die noch keine Antworten abgegeben haben, sowie eine Schaltfläche **Antworten anzeigen** bei jeder beantworteten Anmeldung, um deren Antworten zu sehen. Ereignisse mit Teilnehmerarten zeigen zusätzlich oberhalb der Tabelle die Anzahl pro Art, und jede Zeile hat einen Dialog **Anmeldedetails** mit den Zahlungen – siehe [Kostenpflichtige Anmeldungen](./paid-registrations.md#the-registration-roster).

Links auf der Detailseite sehen Sie, wie viele Personen angemeldet sind (die anmeldende Person und alle auf ihrer Anmeldung), mit einem Auslastungsbalken, der Anzahl auf der Warteliste, den Schlagwörtern des Ereignisses und seinen **Erinnerungen**. Der Titel der Karte **Anmeldungen** zählt dagegen die Anmeldungen, was auch für die Kapazitätsgrenze gilt – eine Familie mit vier Personen ist also eine Anmeldung, aber vier Personen.

:::tip
Nutzen Sie den Fortschrittsbalken der Kapazität auf der Seite Anmeldungen, um zu verfolgen, wie schnell sich Ereignisse füllen. Der Balken wird rot, wenn ein Ereignis die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte {#next-steps}

- [Kuratierter Kalender](./curated-calendar.md) – Einen Kalender erstellen, der aus mehreren Gruppen schöpft
- [Kostenpflichtige Anmeldungen](./paid-registrations.md) – Teilnehmerarten, Zusatzauswahl, Rabattcodes, Zahlungen und Wartelisten
- [Anleitung zur Veranstaltungsanmeldung](../guides/event-registration.md) – Schritt-für-Schritt-Anleitung zur Einrichtung der Veranstaltungsanmeldung
- [Übersicht Kalender](./index.md) – Zurück zur Übersicht der Kalender
