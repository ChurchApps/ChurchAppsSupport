---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Das Erstellen eines Kalenders in B1 Admin ermöglicht es Ihnen, eine kuratierte Ansicht von Veranstaltungen zu erstellen, indem Sie eine oder mehrere Gruppen verbinden. Veranstaltungen werden von Gruppenleitern innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen an einem Ort an. Selbst ein Domain-Administrator kann Veranstaltungen im Kalenderbereich nicht direkt hinzufügen oder bearbeiten, es sei denn, er ist Leiter der Gruppe, zu der die Veranstaltungen gehören.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen administrativen Zugriff auf den Bereich Kalender in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Navigieren Sie in B1 Admin zu **Website** und dann zum Bereich **Kalender**.
2. Klicken Sie auf **Kalender hinzufügen**.
3. Geben Sie einen **Namen** für Ihren Kalender ein (zum Beispiel „Jugendveranstaltungen" oder „Hauptkirchenkalender").
4. Fügen Sie optional eine **Beschreibung** hinzu, damit Ihr Team versteht, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Erstellen**, um Ihren neuen Kalender zu speichern.

## Die Kalenderdetailseite

Nachdem Sie einen Kalender erstellt haben, klicken Sie darauf, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Eine Kalenderansicht mit Veranstaltungen aus verbundenen Gruppen.
- **Rechte Spalte** -- Die Liste der zugehörigen Gruppen. Hier verwalten Sie, welche Gruppen in diesem Kalender enthalten sind.

## Gruppen verbinden

Gruppen mit Veranstaltungen im Kalender erscheinen automatisch in der Gruppenliste auf der rechten Seite der Detailseite.

1. Klicken Sie im Gruppenbereich auf **Hinzufügen**, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus dem Dropdown-Menü.
3. Wählen Sie, ob **alle Veranstaltungen** dieser Gruppe oder nur **bestimmte Veranstaltungen** eingeschlossen werden sollen.
4. Klicken Sie auf **Speichern**.

:::tip
Das Verbinden von Gruppen mit Ihrem Kalender ist eine leistungsstarke Möglichkeit, Veranstaltungen automatisch zu sammeln. Wenn ein Gruppenleiter eine Veranstaltung zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand Ihrerseits in Ihren kirchenweiten Kalender einfließen.
:::

:::info
Wenn Sie einen einzigen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen in Ihrer Kirche zusammenführt, finden Sie unter [Kuratierter Kalender](curated-calendar) einen optimierten Ansatz.
:::

## Ereignisregistrierung aktivieren

Sie können die Registrierung für jede Kalenderveranstaltung aktivieren, damit Mitglieder sich über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine vorhandene Veranstaltung oder erstellen Sie eine neue.
2. Aktivieren Sie im Veranstaltungseditor die **Registrierung**, um sie zu aktivieren.
3. Konfigurieren Sie die Registrierungseinstellungen:
   - **Kapazität** (optional) -- Legen Sie eine maximale Anzahl von Anmeldungen fest. Leer lassen für unbegrenzt.
   - **Registrierung öffnet** -- Datum und Uhrzeit, zu dem die Registrierung verfügbar wird.
   - **Registrierung schließt** -- Datum und Uhrzeit, zu dem die Registrierung endet.
   - **Tags** -- Durch Kommas getrennte Bezeichnungen (z. B. „Jugend, Freizeit, VBS"), um registrierbare Veranstaltungen zu kategorisieren.
   - **Registrierungsfragen** -- Fügen Sie optional ein [Formular](../forms/creating-forms.md) an, damit Teilnehmer bei der Anmeldung zusätzliche Fragen beantworten (Ernährungseinschränkungen, T-Shirt-Größe, Notfallkontakt usw.). Wählen Sie **Keine**, um Fragen zu überspringen.
   - **Warteliste aktivieren** -- Wenn die Veranstaltung ausgebucht ist, können weitere Teilnehmer einer Warteliste beitreten, anstatt abgewiesen zu werden. Siehe [Bezahlte Registrierungen](paid-registrations#waitlist).
4. Speichern Sie die Veranstaltung.

Für kostenpflichtige Veranstaltungen können Sie auf derselben Einstellungsseite bepreiste **Teilnehmertypen**, optionale **Auswahlmöglichkeiten** (Zusatzoptionen) und **Rabattcodes** definieren, wobei die Zahlung über den Spendenanbieter Ihrer Kirche eingezogen wird. Die vollständige Anleitung finden Sie unter [Bezahlte Registrierungen](paid-registrations).

Sobald die Registrierung aktiviert ist, sehen Mitglieder eine Schaltfläche **Für diese Veranstaltung registrieren**, wenn sie die Veranstaltung auf der [B1-Website](../../b1-church/events/registering) oder in der [B1-Mobile-App](../../b1-mobile/events/registering) ansehen. Wenn Sie ein Formular angehängt haben, sehen Teilnehmer während der Registrierung einen Schritt **Fragen**, und ihre Antworten werden mit ihrer Registrierung gespeichert.

:::info
Registrierungsfragen funktionieren nur mit Formularen, die **nicht** als eingeschränkt markiert sind. Ein eingeschränktes Formular wird während der Registrierung automatisch übersprungen statt angezeigt. Verwenden Sie daher ein nicht eingeschränktes Formular, wenn Sie Fragen an eine Veranstaltung anhängen.
:::

### Registrierungen verwalten

So zeigen und verwalten Sie Registrierungen für Ihre Veranstaltungen:

1. Navigieren Sie zur Seite **Registrierungen** in B1 Admin.
2. Sie sehen eine Tabelle aller Veranstaltungen mit aktivierter Registrierung, mit Veranstaltungstitel, Datum, aktueller Anzahl der Registrierungen im Vergleich zur Kapazität und Tags.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Registrierungen zu sehen, einschließlich Namen, Mitgliederzahl, Teilnehmertypen, Zahlungsstatus und Registrierungsdatum.
4. Von der Detailseite aus können Sie:
   - **Teilnehmer hinzufügen** -- Registrieren Sie manuell jemanden, der sich offline oder telefonisch angemeldet hat.
   - Einzelne Registrierungen **stornieren**
   - Registrierungen dauerhaft **löschen**
   - Wartelisten-Registrierungen **befördern**, wenn ein Platz frei wird
   - **CSV exportieren** -- Alle Registrierungen herunterladen, einschließlich Teilnehmertypen, Auswahlmöglichkeiten, Zahlungsbeträgen und Antworten auf Fragen

Wenn die Veranstaltung Registrierungsfragen angehängt hat, zeigt die Detailseite außerdem einen Filter **Nur unbeantwortete Fragen** an, um schnell Teilnehmer zu finden, die noch keine Antworten übermittelt haben, sowie eine Schaltfläche **Antworten anzeigen** bei jeder beantworteten Registrierung, um deren Antworten zu sehen. Bei kostenpflichtigen Veranstaltungen kommen eine Spalte **Typ**, eine Spalte **Bezahlt / Gesamt**, Zählungen pro Typ und ein Zahlungsdetail-Dialog hinzu -- siehe [Bezahlte Registrierungen](paid-registrations#the-registration-roster).

:::tip
Verwenden Sie die Kapazitäts-Fortschrittsanzeige, um zu überwachen, wie schnell sich Veranstaltungen füllen. Die Anzeige wird rot, wenn eine Veranstaltung die Kapazität erreicht oder überschreitet.
:::

## Nächste Schritte

- [Kuratierter Kalender](curated-calendar) -- Einen Kalender erstellen, der aus mehreren Gruppen zusammenführt
- [Bezahlte Registrierungen](paid-registrations) -- Teilnehmertypen, Zusatzauswahlen, Rabattcodes, Zahlungen und Wartelisten
- [Leitfaden zur Ereignisregistrierung](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zur Einrichtung der Ereignisregistrierung
- [Kalenderübersicht](./) -- Zurück zur Kalenderübersicht
