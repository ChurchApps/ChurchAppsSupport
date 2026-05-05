---
title: "Kalender erstellen"
---

# Kalender erstellen

<div class="article-intro">

Durch das Erstellen eines Kalenders in B1 Admin können Sie eine kuratierte Ansicht von Veranstaltungen erstellen, indem Sie eine oder mehrere Gruppen verbinden. Veranstaltungen werden von Gruppenleitern innerhalb ihrer Gruppen verwaltet, und Ihr Kalender zeigt diese Veranstaltungen an einem Ort an. Selbst ein Domain-Administrator kann Veranstaltungen nicht direkt im Kalenderbereich hinzufügen oder bearbeiten, es sei denn, er ist Leiter der Gruppe, zu der die Veranstaltungen gehören.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Veranstaltungen Sie in Ihren Kalender aufnehmen möchten
- Sie benötigen administrativen Zugriff auf den Kalenderbereich in B1 Admin

</div>

## Einen neuen Kalender erstellen

1. Navigieren Sie in B1 Admin zu **Website** und dann zum Bereich **Calendars**.
2. Klicken Sie auf **Add Calendar**.
3. Geben Sie einen **Namen** für Ihren Kalender ein (z. B. "Jugendministeriums-Veranstaltungen" oder "Hauptkirchen-Kalender").
4. Fügen Sie eine optionale **Beschreibung** hinzu, um Ihrem Team zu helfen zu verstehen, wofür dieser Kalender gedacht ist.
5. Klicken Sie auf **Create**, um Ihren neuen Kalender zu speichern.

## Die Kalender-Detailseite

Nach dem Erstellen eines Kalenders klicken Sie darauf, um die Detailseite zu öffnen. Diese Seite hat zwei Hauptbereiche:

- **Linke Spalte** -- Eine Ansicht des Kalenders, die Veranstaltungen aus verbundenen Gruppen zeigt.
- **Rechte Spalte** -- Die Liste der zugeordneten Gruppen. Hier verwalten Sie, welche Gruppen in diesem Kalender enthalten sind.

## Gruppen verbinden

Gruppen, die Veranstaltungen im Kalender haben, erscheinen automatisch in der Gruppenliste auf der rechten Seite der Detailseite.

1. Klicken Sie auf **Add** im Gruppenbereich, um eine Gruppe mit Ihrem Kalender zu verknüpfen.
2. Wählen Sie die Gruppe aus der Dropdown-Liste aus.
3. Wählen Sie, ob **alle Veranstaltungen** aus dieser Gruppe oder nur **bestimmte Veranstaltungen** einbezogen werden sollen.
4. Klicken Sie auf **Save**.

:::tip
Das Verbinden von Gruppen mit Ihrem Kalender ist eine leistungsstarke Möglichkeit, Veranstaltungen automatisch zu aggregieren. Wenn ein Gruppenleiter eine Veranstaltung zu seiner [Gruppe](../groups/creating-groups.md) hinzufügt, kann sie ohne zusätzlichen Aufwand in Ihren kirchenweiten Kalender fließen.
:::

:::info
Wenn Sie einen einzelnen Kalender erstellen möchten, der Veranstaltungen aus vielen Gruppen in Ihrer Kirche zusammenführt, siehe [Curated Calendar](curated-calendar) für einen optimierten Ansatz.
:::

## Veranstaltungsregistrierung aktivieren

Sie können die Registrierung für jede Kalenderveranstaltung aktivieren, damit sich Mitglieder über die B1-Website oder die mobile App anmelden können.

1. Klicken Sie auf eine vorhandene Veranstaltung oder erstellen Sie eine neue.
2. Schalten Sie im Veranstaltungseditor **Registration** ein, um sie zu aktivieren.
3. Konfigurieren Sie die Registrierungseinstellungen:
   - **Capacity** (optional) -- Legen Sie eine maximale Anzahl von Registrierungen fest. Lassen Sie das Feld leer für unbegrenzte Registrierungen.
   - **Registration Opens** -- Das Datum und die Uhrzeit, wann die Registrierung verfügbar wird.
   - **Registration Closes** -- Das Datum und die Uhrzeit, wann die Registrierung endet.
   - **Tags** -- Durch Kommas getrennte Labels (z. B. "jugend, retreat, vbs"), um registrierbare Veranstaltungen zu kategorisieren.
4. Speichern Sie die Veranstaltung.

Sobald die Registrierung aktiviert ist, sehen Mitglieder eine Schaltfläche **Register for this Event**, wenn sie die Veranstaltung auf der [B1-Website](../../b1-church/events/registering) oder der [B1 Mobile-App](../../b1-mobile/events/registering) ansehen.

### Registrierungen verwalten

So zeigen Sie Registrierungen für Ihre Veranstaltungen an und verwalten sie:

1. Navigieren Sie zur Seite **Registrations** in B1 Admin.
2. Sie sehen eine Tabelle aller Veranstaltungen mit aktivierter Registrierung, die den Veranstaltungstitel, das Datum, die aktuelle Registrierungsanzahl im Vergleich zur Kapazität und Tags zeigt.
3. Klicken Sie auf eine Veranstaltung, um die vollständige Liste der Registrierungen anzuzeigen, einschließlich Namen, Mitgliederzahl, Status und Registrierungsdatum.
4. Von der Detailseite aus können Sie:
   - Einzelne Registrierungen **Cancel** (stornieren)
   - Registrierungen dauerhaft **Delete** (löschen)
   - Alle Registrierungen als CSV **Export** (exportieren)

:::tip
Verwenden Sie den Kapazitätsfortschrittsbalken, um zu überwachen, wie schnell sich Veranstaltungen füllen. Der Balken wird rot, wenn eine Veranstaltung die Kapazität erreicht hat oder überschritten hat.
:::

## Nächste Schritte

- [Curated Calendar](curated-calendar) -- Erstellen Sie einen Kalender, der aus mehreren Gruppen zusammengeführt wird
- [Event Registration Guide](../guides/event-registration) -- Schritt-für-Schritt-Anleitung zur Einrichtung der Veranstaltungsregistrierung
- [Calendars Overview](./) -- Zurück zur Kalenderübersicht
