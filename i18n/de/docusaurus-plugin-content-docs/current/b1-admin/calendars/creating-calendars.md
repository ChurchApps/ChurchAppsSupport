---
title: "Kalender erstellen"
---
# Kalender erstellen

<div class="article-intro">

Wenn Sie in B1 Admin einen Kalender erstellen, können Sie eine kuratierte Ansicht von Veranstaltungen aufbauen, indem Sie eine oder mehrere Gruppen verknüpfen. Die Veranstaltungen werden von den Gruppenleitern innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen an einem Ort an. Administratoren mit Bearbeitungsrechten können Veranstaltungen für jede Gruppe hinzufügen oder bearbeiten. Gruppenleiter ohne Administratorrechte können nur Veranstaltungen für die von ihnen geleiteten Gruppen verwalten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen administrativen Zugriff auf den Bereich „Kalender" in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Navigieren Sie in B1 Admin im Hauptmenü zu **Kalender**.
2. Klicken Sie auf **Kalender hinzufügen**.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel „Jugendarbeit-Veranstaltungen" oder „Hauptkalender der Gemeinde").
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Kalender-Detailseite

Klicken Sie nach dem Erstellen eines Kalenders auf ihn, um die Detailseite zu öffnen. Diese Seite besteht aus zwei Hauptbereichen:

- **Linke Spalte** -- Eine Ansicht des Kalenders mit den Veranstaltungen aus den verknüpften Gruppen.
- **Rechte Spalte** -- Die Liste der zugeordneten Gruppen. Hier verwalten Sie, welche Gruppen in diesem Kalender enthalten sind.

## Gruppen verknüpfen

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Gruppenliste auf der rechten Seite der Detailseite.

1. Klicken Sie im Gruppenbereich auf **Hinzufügen**, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus der Dropdown-Liste aus.
3. Legen Sie fest, ob **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** aufgenommen werden sollen.
4. Klicken Sie auf **Speichern**.

:::tip
Das Verknüpfen von Gruppen mit Ihrem Kalender ist eine wirkungsvolle Möglichkeit, Veranstaltungen automatisch zusammenzuführen. Wenn ein Gruppenleiter eine Veranstaltung zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann diese ohne zusätzlichen Aufwand für Sie in Ihren gemeindeweiten Kalender einfließen.
:::

:::info
Wenn Sie einen einzelnen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen Ihrer Gemeinde zusammenführt, finden Sie unter [Kuratierter Kalender](curated-calendar) einen übersichtlichen Ansatz.
:::

## Veranstaltungsanmeldung aktivieren

Sie können für jede Kalenderveranstaltung die Anmeldung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine vorhandene Veranstaltung oder erstellen Sie eine neue.
2. Aktivieren Sie im Veranstaltungseditor den Schalter **Anmeldung**.
3. Konfigurieren Sie die Anmeldeeinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl von Anmeldungen fest. Lassen Sie das Feld leer für eine unbegrenzte Anzahl.
   - **Anmeldung öffnet** -- Datum und Uhrzeit, ab wann die Anmeldung verfügbar ist.
   - **Anmeldung schließt** -- Datum und Uhrzeit, wann die Anmeldung endet.
   - **Tags** -- Durch Kommas getrennte Bezeichnungen (z. B. „jugend, freizeit, kinderbibelwoche"), um anmeldepflichtige Veranstaltungen zu kategorisieren.
   - **Anmeldefragen** -- Hängen Sie optional ein [Formular](../forms/creating-forms.md) an, damit Angemeldete im Rahmen der Anmeldung zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um auf Fragen zu verzichten.
   - **Warteliste aktivieren** -- Wenn die Veranstaltung ausgebucht ist, können sich weitere Interessenten auf eine Warteliste setzen lassen, anstatt abgewiesen zu werden. Siehe [Kostenpflichtige Anmeldungen](paid-registrations#waitlist).
4. Speichern Sie die Veranstaltung.

Bei kostenpflichtigen Veranstaltungen können Sie auf derselben Einstellungsseite preislich gestaffelte **Teilnehmertypen**, optionale **Auswahlmöglichkeiten** (Zusatzleistungen) und **Rabattcodes** definieren, wobei die Zahlung über den Spendenanbieter Ihrer Gemeinde abgewickelt wird. Die vollständige Anleitung finden Sie unter [Kostenpflichtige Anmeldungen](paid-registrations).

Sobald die Anmeldung aktiviert ist, sehen Mitglieder eine Schaltfläche **Für diese Veranstaltung anmelden**, wenn sie die Veranstaltung auf der [B1-Website](../../b1-church/events/registering) oder in der [B1 Mobile App](../../b1-mobile/events/registering) ansehen. Wenn Sie ein Formular angehängt haben, sehen die Angemeldeten während der Anmeldung einen Schritt **Fragen**, und ihre Antworten werden zusammen mit ihrer Anmeldung gespeichert.

:::info
Anmeldefragen funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird während der Anmeldung automatisch übersprungen statt angezeigt. Verwenden Sie daher ein nicht eingeschränktes Formular, wenn Sie Fragen an eine Veranstaltung anhängen.
:::

### Anmeldungen verwalten

So sehen und verwalten Sie die Anmeldungen für Ihre Veranstaltungen:

1. Navigieren Sie in B1 Admin zur Seite **Anmeldungen**.
2. Sie sehen eine Tabelle aller Veranstaltungen mit aktivierter Anmeldung, einschließlich Veranstaltungstitel, Datum, aktueller Anmeldezahl im Verhältnis zur Kapazität sowie Tags.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Anmeldungen zu sehen, einschließlich Namen, Anzahl der Personen, Teilnehmertypen, Zahlungsstatus und Anmeldedatum.
4. Auf der Detailseite können Sie:
   - **Teilnehmer hinzufügen** -- Melden Sie jemanden manuell an, der sich offline oder telefonisch angemeldet hat.
   - Einzelne Anmeldungen **stornieren**
   - Anmeldungen dauerhaft **löschen**
   - Anmeldungen von der Warteliste **nachrücken lassen**, wenn ein Platz frei wird
   - **CSV exportieren** -- Laden Sie alle Anmeldungen herunter, einschließlich Teilnehmertypen, Auswahlmöglichkeiten, Zahlungsbeträgen und Antworten auf Fragen

Wenn der Veranstaltung Anmeldefragen zugeordnet sind, zeigt die Detailseite außerdem einen Filter **Nur unbeantwortete Fragen**, um Angemeldete ohne eingereichte Antworten schnell zu finden, sowie eine Schaltfläche **Antworten anzeigen** bei jeder beantworteten Anmeldung. Bei kostenpflichtigen Veranstaltungen kommen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Zählungen pro Typ und ein Dialog mit Zahlungsdetails hinzu -- siehe [Kostenpflichtige Anmeldungen](paid-registrations#the-registration-roster).

:::tip
Nutzen Sie den Fortschrittsbalken für die Kapazität, um zu beobachten, wie schnell sich Veranstaltungen füllen. Der Balken färbt sich rot, wenn eine Veranstaltung die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) -- Erstellen Sie einen Kalender, der Veranstaltungen aus mehreren Gruppen zusammenführt
- [Kostenpflichtige Anmeldungen](paid-registrations) -- Teilnehmertypen, Zusatzleistungen, Rabattcodes, Zahlungen und Wartelisten
- [Leitfaden zur Veranstaltungsanmeldung](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zum Einrichten der Veranstaltungsanmeldung
- [Kalender-Übersicht](./) -- Zurück zur Kalender-Übersicht