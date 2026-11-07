---
title: "Massenbearbeitung von Personen"
---

# Massenbearbeitung von Personen

<div class="article-intro">
Mit der Massenbearbeitung können Sie mehrere Personen gleichzeitig aktualisieren. So sparen Sie Zeit, wenn Sie dieselbe Änderung bei vielen Personen vornehmen möchten. Sie können Mitgliedschaftsstatus, Familienstand, Geschlecht, Abmeldeeinstellungen und Gruppenzugehörigkeiten in einem einzigen Vorgang ändern.
</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Personendaten zu verwalten. Details finden Sie unter [Rollen & Berechtigungen](./roles-permissions.md).
- Sie sollten die Personen, die Sie bearbeiten möchten, bereits hinzugefügt oder importiert haben. Falls nötig, lesen Sie [Personen hinzufügen](./adding-people.md).
</div>

## Personen für die Massenbearbeitung auswählen

1. Öffnen Sie in B1 Admin den Bereich **Personen**.
2. Verwenden Sie die Suche oder die Filter, um die Personen zu finden, die Sie aktualisieren möchten.
3. Aktivieren Sie die Kontrollkästchen, um Personen auszuwählen.
   - In der Ansicht **Haushalte** wählt das Aktivieren eines Haushalts alle Personen darin aus.
   - In der Ansicht **Tabelle** (umschalten über den Schalter **Anzeigen als**) können Sie Personen einzeln auswählen.
   - Oder verwenden Sie das Kontrollkästchen über der Liste, um alle sichtbaren Personen auszuwählen.
4. Sobald Sie mindestens eine Person ausgewählt haben, zeigt die Leiste über der Liste an, wie viele ausgewählt sind, zusammen mit **Auswahl aufheben** und einer Schaltfläche **Aktionen**.

:::tip
Wenn Sie eine große Gruppe von Personen anhand bestimmter Kriterien aktualisieren müssen, verwenden Sie zuerst die [KI-Suche](./ai-search.md) oder Filter, um Ihre Liste einzugrenzen, und wählen Sie dann alle passenden Personen aus.
:::

## Verfügbare Massenaktionen

Das Menü **Aktionen** bietet mehrere Optionen:

### Mitgliedschaftsstatus aktualisieren

Aktualisieren Sie den Mitgliedschaftsstatus für alle ausgewählten Personen:

1. Klicken Sie auf **Aktionen** → **Mitgliedschaftsstatus festlegen**.
2. Wählen Sie den neuen Status:
   - **Besucher** -- Erstbesucher oder gelegentliche Teilnehmer
   - **Gast** -- Gäste, etwa Familien, die an einem Check-in-Terminal angemeldet wurden
   - **Regelmäßiger Teilnehmer** -- Häufige Teilnehmer, die keine Mitglieder sind
   - **Mitglied** -- Offizielle Gemeindemitglieder
   - **Mitarbeiter** -- Hauptamtliche Mitarbeitende der Gemeinde
   - **Inaktiv** -- Personen, die nicht mehr teilnehmen
   - **Verstorben** -- Personen, die verstorben sind
3. Wählen Sie den Aktualisierungsmodus:
   - **Alle überschreiben** -- Ersetzt den aktuellen Status bei allen ausgewählten Personen
   - **Nur leere aktualisieren** -- Setzt den Status nur bei Personen, die noch keinen haben
4. Klicken Sie auf **Aktualisieren**.

### Familienstand aktualisieren

Aktualisieren Sie den Familienstand in der Masse:

1. Klicken Sie auf **Aktionen** → **Familienstand festlegen**.
2. Wählen Sie den neuen Status:
   - **Unbekannt**
   - **Ledig**
   - **Verheiratet**
   - **Geschieden**
   - **Verwitwet**
3. Wählen Sie, ob bestehende Werte überschrieben oder nur leere Felder aktualisiert werden sollen.
4. Klicken Sie auf **Aktualisieren**.

### Geschlecht aktualisieren

Aktualisieren Sie die Geschlechtsangabe für mehrere Personen:

1. Klicken Sie auf **Aktionen** → **Geschlecht festlegen**.
2. Wählen Sie den Wert:
   - **Nicht angegeben**
   - **Männlich**
   - **Weiblich**
3. Wählen Sie den Aktualisierungsmodus (alle überschreiben oder nur leere).
4. Klicken Sie auf **Aktualisieren**.

### Abmeldestatus aktualisieren

Steuern Sie, ob Personen sich von Mitteilungen abgemeldet haben:

1. Klicken Sie auf **Aktionen** → **Verzeichnis-Abmeldung festlegen**.
2. Wählen Sie:
   - **Nein** -- Mitteilungen erlauben (Abmeldung aufheben)
   - **Ja** -- Mitteilungen blockieren (Abmeldung setzen)
3. Wählen Sie den Aktualisierungsmodus.
4. Klicken Sie auf **Aktualisieren**.

:::warning
Seien Sie vorsichtig beim Ändern des Abmeldestatus. Personen, die sich ausdrücklich abgemeldet haben, sollten keine Mitteilungen erhalten, es sei denn, sie haben erneut zugestimmt.
:::

### Benutzerdefiniertes Feld festlegen

Legen Sie für alle ausgewählten Personen gleichzeitig den Wert eines [benutzerdefinierten Feldes](../settings/custom-fields.md) mit Ja/Nein fest:

1. Klicken Sie auf **Aktionen** → **Benutzerdefiniertes Feld festlegen**.
2. Wählen Sie das benutzerdefinierte Feld mit Ja/Nein, das Sie festlegen möchten.
3. Wählen Sie den anzuwendenden Wert (**Ja** oder **Nein**).
4. Klicken Sie auf **Aktualisieren**.

:::info
Für diese Massenaktion stehen nur benutzerdefinierte Felder mit Ja/Nein zur Verfügung. Um andere Feldtypen festzulegen, bearbeiten Sie jede Person einzeln.
:::

### Zu Gruppe hinzufügen

Fügen Sie alle ausgewählten Personen einer oder mehreren Gruppen hinzu:

1. Klicken Sie auf **Aktionen** → **Zu Gruppe hinzufügen**.
2. Suchen Sie die gewünschte(n) Gruppe(n) und wählen Sie sie aus.
3. Sie können mehrere Gruppen auswählen, um Personen allen hinzuzufügen.
4. Klicken Sie auf **Zu Gruppen hinzufügen**.

Jede Person wird als reguläres Mitglied der ausgewählten Gruppe(n) hinzugefügt. Später können Sie einzelne Personen auf der Seite [Gruppenmitglieder](../groups/group-members.md) bei Bedarf zu Gruppenleitenden befördern.

### Aus Gruppe entfernen

Entfernen Sie alle ausgewählten Personen aus einer oder mehreren Gruppen:

1. Klicken Sie auf **Aktionen** → **Aus Gruppe entfernen**.
2. Suchen Sie die gewünschte(n) Gruppe(n) und wählen Sie sie aus.
3. Sie können mehrere Gruppen auswählen.
4. Klicken Sie auf **Aus Gruppen entfernen**.

:::info
Diese Aktion entfernt Personen nur aus den angegebenen Gruppen. Ihre Personendatensätze werden nicht gelöscht.
:::

### Personen löschen

Löschen Sie die ausgewählten Personen dauerhaft aus der Datenbank Ihrer Gemeinde:

1. Klicken Sie auf **Aktionen** → **Löschen**.
2. Der Dialog **Ausgewählte Personen löschen** fragt Sie, wie viele Personen gelöscht werden sollen, und bittet um Bestätigung.
3. Klicken Sie auf **Löschen**.

:::danger
Das Löschen von Personen ist endgültig und kann nicht rückgängig gemacht werden. Dabei werden alle Daten entfernt, darunter:
- Persönliche Informationen
- Gruppenzugehörigkeiten
- Anwesenheitsdaten
- Spendenverlauf
- Formulareinreichungen

Verwenden Sie diese Aktion nur, wenn Sie absolut sicher sind, dass Sie diese Personen aus Ihrem System entfernen möchten.
:::

## Ergebnisse der Massenbearbeitung

Nach Abschluss einer Massenaktion sehen Sie eine Zusammenfassung mit:

- **Insgesamt ausgewählt** -- Wie viele Personen in den Vorgang einbezogen wurden
- **Erfolgreich aktualisiert** -- Wie viele Datensätze geändert wurden
- **Fehlgeschlagen** -- Datensätze, die nicht aktualisiert werden konnten (falls zutreffend)
- **Unverändert** -- Datensätze, die keine Änderung benötigten (z. B. im Modus „Nur leere aktualisieren“)

Wenn Aktualisierungen fehlgeschlagen sind, sehen Sie Fehlermeldungen mit dem Grund.

## Bewährte Vorgehensweisen

- **Klein anfangen** -- Testen Sie Massenvorgänge zuerst an wenigen Datensätzen, um sicherzugehen, dass Sie die richtigen Änderungen vornehmen.
- **Filter verwenden** -- Grenzen Sie Ihre Liste mit Filtern oder der KI-Suche ein, bevor Sie Personen auswählen, damit Sie nur die richtigen Personen aktualisieren.
- **Auswahl doppelt prüfen** -- Sehen Sie sich die ausgewählten Personen an, bevor Sie Massenänderungen anwenden.
- **Modus „Nur leere aktualisieren“ verwenden** -- Wenn Sie fehlende Daten ergänzen möchten, ohne vorhandene Informationen zu überschreiben.
- **Größere Änderungen dokumentieren** -- Halten Sie Notizen zu Massenaktualisierungen fest, falls Sie diese später nachschlagen müssen.
- **Mit dem Team abstimmen** -- Informieren Sie andere Administratoren, wenn Sie größere Massenänderungen vornehmen.

## Häufige Anwendungsfälle

### Neue Mitglieder aufnehmen

Nach einem Mitgliederkurs setzen Sie alle Teilnehmenden auf den Status Mitglied:

1. Suchen Sie die Personen, die am Kurs teilgenommen haben.
2. Wählen Sie alle aus.
3. Verwenden Sie **Aktionen** → **Mitgliedschaftsstatus festlegen** → **Mitglied**.

### Kleingruppen organisieren

Fügen Sie mehrere Personen einer neuen Kleingruppe hinzu:

1. Suchen Sie die Personen, die in die Gruppe sollen.
2. Wählen Sie sie aus.
3. Verwenden Sie **Aktionen** → **Zu Gruppe hinzufügen** und wählen Sie die Kleingruppe aus.

### Daten bereinigen

Ergänzen Sie den fehlenden Familienstand bei verheirateten Paaren:

1. Filtern Sie nach Personen, die verheiratet sind (anhand der Haushaltsinformationen).
2. Wählen Sie diejenigen aus, bei denen der Familienstand leer ist.
3. Verwenden Sie **Aktionen** → **Familienstand festlegen** → **Verheiratet** → **Nur leere aktualisieren**.

## Verwandte Artikel

- [Personen suchen](./searching-people.md) -- Personen zum Bearbeiten finden
- [KI-Suche](./ai-search.md) -- Mit natürlicher Sprache bestimmte Personengruppen finden
- [Gruppenmitglieder](../groups/group-members.md) -- Gruppenzugehörigkeit verwalten
- [Daten exportieren](./exporting-data.md) -- Personendaten vor Massenänderungen exportieren
