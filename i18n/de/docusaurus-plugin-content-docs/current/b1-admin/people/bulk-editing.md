---
title: "Massenbearbeitung von Personen"
---

# Massenbearbeitung von Personen

<div class="article-intro">
Die Massenbearbeitung ermöglicht es Ihnen, mehrere Personen gleichzeitig zu aktualisieren und spart Zeit, wenn Sie dieselbe Änderung bei vielen Personen vornehmen. Sie können Mitgliedschaftsstatus, Familienstand, Geschlecht, Abmeldepräferenzen und Gruppenmitgliedschaften in einer einzigen Operation aktualisieren.
</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung zur Verwaltung von Personendaten. Siehe [Rollen & Berechtigungen](./roles-permissions.md) für Details.
- Sie sollten die Personen, die Sie bearbeiten möchten, bereits hinzugefügt oder importiert haben. Siehe [Personen hinzufügen](./adding-people.md) falls erforderlich.
</div>

## Personen für die Massenbearbeitung auswählen

1. Navigieren Sie zu **Personen** in B1 Admin
2. Verwenden Sie die Such- oder Filterwerkzeuge, um die Personen zu finden, die Sie aktualisieren möchten
3. Aktivieren Sie die Kontrollkästchen neben dem Namen jeder Person, um sie auszuwählen
   - Sie können Personen einzeln auswählen
   - Oder verwenden Sie das Kontrollkästchen in der Kopfzeile, um alle sichtbaren Personen auf der aktuellen Seite auszuwählen
4. Sobald Sie mindestens eine Person ausgewählt haben, erscheint die Schaltfläche **Massenaktionen**

:::tip
Wenn Sie eine große Gruppe von Personen basierend auf bestimmten Kriterien aktualisieren müssen, verwenden Sie die Funktion [KI-Suche](./ai-search.md) oder Filter, um Ihre Liste zuerst einzugrenzen, und wählen Sie dann alle übereinstimmenden Personen aus.
:::

## Verfügbare Massenaktionen

Das Menü **Massenaktionen** bietet mehrere Optionen:

### Mitgliedschaftsstatus aktualisieren

Aktualisieren Sie den Mitgliedschaftsstatus für alle ausgewählten Personen:

1. Klicken Sie auf **Massenaktionen** → **Mitgliedschaftsstatus festlegen**
2. Wählen Sie den neuen Status:
   - **Besucher** -- Erstmalige oder gelegentliche Teilnehmer
   - **Regelmäßiger Teilnehmer** -- Häufige Teilnehmer, die keine Mitglieder sind
   - **Mitglied** -- Offizielle Kirchenmitglieder
   - **Mitarbeiter** -- Kirchenmitarbeiter
   - **Inaktiv** -- Personen, die nicht mehr teilnehmen
3. Wählen Sie den Aktualisierungsmodus:
   - **Alle überschreiben** -- Ersetzen Sie den aktuellen Status für alle ausgewählten Personen
   - **Nur leere aktualisieren** -- Setzen Sie den Status nur für Personen, die keinen haben
4. Klicken Sie auf **Aktualisieren**

### Familienstand aktualisieren

Aktualisieren Sie den Familienstand in großen Mengen:

1. Klicken Sie auf **Massenaktionen** → **Familienstand festlegen**
2. Wählen Sie den neuen Status:
   - **Unbekannt**
   - **Ledig**
   - **Verheiratet**
   - **Geschieden**
   - **Verwitwet**
3. Wählen Sie, ob vorhandene Werte überschrieben oder nur leere Felder aktualisiert werden sollen
4. Klicken Sie auf **Aktualisieren**

### Geschlecht aktualisieren

Aktualisieren Sie Geschlechtsinformationen für mehrere Personen:

1. Klicken Sie auf **Massenaktionen** → **Geschlecht festlegen**
2. Wählen Sie den Wert:
   - **Nicht angegeben**
   - **Männlich**
   - **Weiblich**
3. Wählen Sie den Aktualisierungsmodus (alle überschreiben oder nur leere)
4. Klicken Sie auf **Aktualisieren**

### Abmeldestatus aktualisieren

Kontrollieren Sie, ob Personen sich von der Kommunikation abgemeldet haben:

1. Klicken Sie auf **Massenaktionen** → **Abgemeldet festlegen**
2. Wählen Sie:
   - **Nein** -- Kommunikation erlauben (Abmeldung entfernen)
   - **Ja** -- Kommunikation blockieren (Abmeldung setzen)
3. Wählen Sie den Aktualisierungsmodus
4. Klicken Sie auf **Aktualisieren**

:::warning
Seien Sie vorsichtig beim Ändern des Abmeldestatus. Personen, die sich ausdrücklich abgemeldet haben, sollten keine Kommunikation erhalten, es sei denn, sie haben eine neue Zustimmung gegeben.
:::

### Zu Gruppe hinzufügen

Fügen Sie alle ausgewählten Personen zu einer oder mehreren Gruppen hinzu:

1. Klicken Sie auf **Massenaktionen** → **Zu Gruppe hinzufügen**
2. Suchen und wählen Sie die Gruppe(n), zu denen Personen hinzugefügt werden sollen
3. Sie können mehrere Gruppen auswählen, um Personen zu allen hinzuzufügen
4. Klicken Sie auf **Zu Gruppen hinzufügen**

Jede Person wird als reguläres Mitglied der ausgewählten Gruppe(n) hinzugefügt. Sie können später einzelne Personen zu Gruppenleitern befördern, falls erforderlich, von der Seite [Gruppenmitglieder](../groups/group-members.md).

### Aus Gruppe entfernen

Entfernen Sie alle ausgewählten Personen aus einer oder mehreren Gruppen:

1. Klicken Sie auf **Massenaktionen** → **Aus Gruppe entfernen**
2. Suchen und wählen Sie die Gruppe(n), aus denen Personen entfernt werden sollen
3. Sie können mehrere Gruppen auswählen
4. Klicken Sie auf **Aus Gruppen entfernen**

:::info
Diese Aktion entfernt Personen nur aus den angegebenen Gruppen. Sie löscht ihre Personendatensätze nicht.
:::

### Personen löschen

Löschen Sie die ausgewählten Personen dauerhaft aus Ihrer Kirchendatenbank:

1. Klicken Sie auf **Massenaktionen** → **Löschen**
2. Überprüfen Sie die Liste der Personen, die gelöscht werden
3. Geben Sie **DELETE** in das Bestätigungsfeld ein
4. Klicken Sie auf **Löschen bestätigen**

:::danger
Das Löschen von Personen ist dauerhaft und kann nicht rückgängig gemacht werden. Dadurch werden alle ihre Daten entfernt, einschließlich:
- Persönliche Informationen
- Gruppenmitgliedschaften
- Anwesenheitsaufzeichnungen
- Spendenhistorie
- Formulareinreichungen

Verwenden Sie diese Aktion nur, wenn Sie absolut sicher sind, dass Sie diese Personen aus Ihrem System entfernen möchten.
:::

## Ergebnisse der Massenbearbeitung

Nach Abschluss einer Massenaktion sehen Sie eine Zusammenfassung, die Folgendes zeigt:

- **Insgesamt ausgewählt** -- Wie viele Personen in die Operation einbezogen wurden
- **Erfolgreich aktualisiert** -- Wie viele Datensätze geändert wurden
- **Fehlgeschlagen** -- Datensätze, die nicht aktualisiert werden konnten (falls zutreffend)
- **Unverändert** -- Datensätze, die keine Änderungen benötigten (z. B. bei Verwendung des Modus "nur leere aktualisieren")

Wenn Aktualisierungen fehlgeschlagen sind, sehen Sie Fehlerdetails, die erklären, warum.

## Best Practices

- **Klein anfangen** -- Testen Sie Massenoperationen zunächst an einigen Datensätzen, um sicherzustellen, dass Sie die richtigen Änderungen vornehmen
- **Filter verwenden** -- Grenzen Sie Ihre Liste mit Filtern oder KI-Suche ein, bevor Sie Personen auswählen, um sicherzustellen, dass Sie nur die richtigen Personen aktualisieren
- **Auswahl doppelt überprüfen** -- Überprüfen Sie die ausgewählten Personen, bevor Sie Massenänderungen anwenden
- **Modus "nur leere aktualisieren" verwenden** -- Wenn Sie fehlende Daten ausfüllen möchten, ohne vorhandene Informationen zu überschreiben
- **Wichtige Änderungen dokumentieren** -- Führen Sie Notizen über Massenaktualisierungen für den Fall, dass Sie später darauf zurückgreifen müssen
- **Mit Ihrem Team koordinieren** -- Informieren Sie andere Administratoren, wenn Sie große Massenänderungen vornehmen

## Häufige Anwendungsfälle

### Neue Mitglieder aktualisieren

Nach einem Mitgliedschaftskurs aktualisieren Sie alle Teilnehmer auf den Mitgliedsstatus:

1. Suchen Sie nach den Personen, die am Kurs teilgenommen haben
2. Wählen Sie sie alle aus
3. Verwenden Sie **Massenaktionen** → **Mitgliedschaftsstatus festlegen** → **Mitglied**

### Kleingruppen organisieren

Fügen Sie mehrere Personen zu einer neuen Kleingruppe hinzu:

1. Suchen Sie nach den Personen, die Sie in der Gruppe haben möchten
2. Wählen Sie sie aus
3. Verwenden Sie **Massenaktionen** → **Zu Gruppe hinzufügen** und wählen Sie die Kleingruppe

### Daten bereinigen

Füllen Sie fehlenden Familienstand für verheiratete Paare aus:

1. Filtern Sie nach Personen, die verheiratet sind (anhand von Haushaltsinformationen)
2. Wählen Sie diejenigen mit leerem Familienstand aus
3. Verwenden Sie **Massenaktionen** → **Familienstand festlegen** → **Verheiratet** → **Nur leere aktualisieren**

## Verwandte Artikel

- [Personen suchen](./searching-people.md) -- Finden Sie Personen zum Bearbeiten
- [KI-Suche](./ai-search.md) -- Verwenden Sie natürliche Sprache, um bestimmte Personengruppen zu finden
- [Gruppenmitglieder](../groups/group-members.md) -- Gruppenmitgliedschaft verwalten
- [Daten exportieren](./exporting-data.md) -- Exportieren Sie Personendaten, bevor Sie Massenänderungen vornehmen
