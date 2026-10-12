---
title: "Massenbearbeitung von Personen"
---

# Massenbearbeitung von Personen

<div class="article-intro">
Mit der Massenbearbeitung können Sie mehrere Personen auf einmal aktualisieren. Das spart Zeit, wenn Sie dieselbe Änderung für viele Personen vornehmen möchten. Sie können Mitgliedschaftsstatus, Familienstand, Geschlecht, Abmeldepräferenzen und Gruppenmitgliedschaften in einem einzigen Vorgang aktualisieren.
</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Personendaten zu verwalten. Details finden Sie unter [Rollen & Berechtigungen](./roles-permissions.md).
- Sie sollten die Personen, die Sie bearbeiten möchten, bereits hinzugefügt oder importiert haben. Falls nötig, lesen Sie [Hinzufügen von Personen](./adding-people.md).
</div>

## Personen für die Massenbearbeitung auswählen

1. Öffnen Sie in B1 Admin den Bereich **Personen**.
2. Verwenden Sie die Such- oder Filterfunktionen, um die Personen zu finden, die Sie aktualisieren möchten.
3. Aktivieren Sie die Kontrollkästchen, um Personen auszuwählen.
   - In der Ansicht **Haushalte** wählt das Aktivieren eines Haushalts alle Personen darin aus.
   - In der Ansicht **Tabelle** (umschaltbar über den Schalter **Ansicht als**) können Sie Personen einzeln auswählen.
   - Oder verwenden Sie das Kontrollkästchen über der Liste, um alle sichtbaren Personen auszuwählen.
4. Sobald Sie mindestens eine Person ausgewählt haben, zeigt die Leiste über der Liste an, wie viele Personen ausgewählt sind, sowie die Schaltflächen **Auswahl aufheben** und **Aktionen**.

:::tip
Wenn Sie eine große Gruppe von Personen anhand bestimmter Kriterien aktualisieren möchten, verwenden Sie zuerst die [KI-Suche](./ai-search.md) oder Filter, um Ihre Liste einzugrenzen, und wählen Sie dann alle passenden Personen aus.
:::

## Verfügbare Massenaktionen

Das Menü **Aktionen** bietet mehrere Optionen:

### Mitgliedschaftsstatus aktualisieren

Aktualisieren Sie den Mitgliedschaftsstatus aller ausgewählten Personen:

1. Klicken Sie auf **Aktionen** → **Mitgliedschaftsstatus festlegen**.
2. Wählen Sie den neuen Status:
   - **Besucher** – Erstbesucher oder gelegentliche Gäste
   - **Gast** – Gäste, etwa Familien, die an einem Check-in-Terminal registriert wurden
   - **Regelmäßiger Teilnehmer** – Häufige Teilnehmer, die keine Mitglieder sind
   - **Mitglied** – Offizielle Gemeindemitglieder
   - **Mitarbeiter** – Hauptamtliche Mitarbeiter der Gemeinde
   - **Inaktiv** – Personen, die nicht mehr teilnehmen
   - **Verstorben** – Personen, die verstorben sind
3. Wählen Sie den Aktualisierungsmodus:
   - **Alle überschreiben** – Ersetzt den aktuellen Status bei allen ausgewählten Personen
   - **Nur leere aktualisieren** – Setzt den Status nur bei Personen, die noch keinen haben
4. Klicken Sie auf **Aktualisieren**.

### Familienstand aktualisieren

Aktualisieren Sie den Familienstand in der Massenbearbeitung:

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

Legen Sie fest, ob Personen sich von Mitteilungen abgemeldet haben:

1. Klicken Sie auf **Aktionen** → **Verzeichnis-Abmeldung festlegen**.
2. Wählen Sie:
   - **Nein** – Mitteilungen erlauben (Abmeldung aufheben)
   - **Ja** – Mitteilungen sperren (Abmeldung setzen)
3. Wählen Sie den Aktualisierungsmodus.
4. Klicken Sie auf **Aktualisieren**.

:::warning
Seien Sie vorsichtig beim Ändern des Abmeldestatus. Personen, die sich ausdrücklich abgemeldet haben, sollten keine Mitteilungen erhalten, es sei denn, sie haben erneut zugestimmt.
:::

### Benutzerdefiniertes Feld setzen

Setzen Sie für alle ausgewählten Personen gleichzeitig den Wert eines [benutzerdefinierten Felds](../settings/custom-fields.md) mit Ja/Nein:

1. Klicken Sie auf **Aktionen** → **Benutzerdefiniertes Feld setzen**.
2. Wählen Sie das benutzerdefinierte Feld mit Ja/Nein aus, das Sie setzen möchten.
3. Wählen Sie den anzuwendenden Wert (**Ja** oder **Nein**).
4. Klicken Sie auf **Aktualisieren**.

:::info
Für diese Massenaktion stehen nur benutzerdefinierte Felder mit Ja/Nein zur Verfügung. Um andere Feldtypen festzulegen, bearbeiten Sie jede Person einzeln.
:::

### Zu Gruppe hinzufügen

Fügen Sie alle ausgewählten Personen einer oder mehreren Gruppen hinzu:

1. Klicken Sie auf **Aktionen** → **Zu Gruppe hinzufügen**.
2. Suchen Sie die gewünschte(n) Gruppe(n) und wählen Sie sie aus.
3. Sie können mehrere Gruppen auswählen, um Personen allen diesen Gruppen hinzuzufügen.
4. Klicken Sie auf **Zu Gruppen hinzufügen**.

Jede Person wird als regulärer Teilnehmer der ausgewählten Gruppe(n) hinzugefügt. Bei Bedarf können Sie einzelne Personen später auf der Seite [Gruppenmitglieder](../groups/group-members.md) zu Gruppenleitern befördern.

### Aus Gruppe entfernen

Entfernen Sie alle ausgewählten Personen aus einer oder mehreren Gruppen:

1. Klicken Sie auf **Aktionen** → **Aus Gruppe entfernen**.
2. Suchen Sie die gewünschte(n) Gruppe(n) und wählen Sie sie aus.
3. Sie können mehrere Gruppen auswählen.
4. Klicken Sie auf **Aus Gruppen entfernen**.

:::info
Bei dieser Aktion werden Personen nur aus den angegebenen Gruppen entfernt. Ihre Personendatensätze werden nicht gelöscht.
:::

### Personen löschen

Löschen Sie die ausgewählten Personen dauerhaft aus Ihrer Gemeindedatenbank:

1. Klicken Sie auf **Aktionen** → **Löschen**.
2. Im Dialog **Ausgewählte Personen löschen** wird bestätigt, wie viele Personen gelöscht werden.
3. Klicken Sie auf **Löschen**.

:::danger
Das Löschen von Personen ist dauerhaft und kann nicht rückgängig gemacht werden. Dabei werden alle zugehörigen Daten entfernt, darunter:
- Persönliche Informationen
- Gruppenmitgliedschaften
- Anwesenheitsaufzeichnungen
- Spendenhistorie
- Formulareinreichungen

Verwenden Sie diese Aktion nur, wenn Sie vollkommen sicher sind, dass Sie diese Personen aus Ihrem System entfernen möchten.
:::

## Ergebnisse der Massenbearbeitung

Nach Abschluss einer Massenaktion sehen Sie eine Zusammenfassung mit:

- **Insgesamt ausgewählt** – Wie viele Personen in den Vorgang einbezogen wurden
- **Erfolgreich aktualisiert** – Wie viele Datensätze geändert wurden
- **Fehlgeschlagen** – Datensätze, die nicht aktualisiert werden konnten (falls zutreffend)
- **Unverändert** – Datensätze, die keine Änderung benötigten (z. B. im Modus „Nur leere aktualisieren“)

Falls Aktualisierungen fehlgeschlagen sind, werden Fehlermeldungen mit Erläuterung angezeigt.

## Bewährte Vorgehensweisen

- **Klein anfangen** – Testen Sie Massenvorgänge zunächst an wenigen Datensätzen, um sicherzustellen, dass Sie die richtigen Änderungen vornehmen
- **Filter verwenden** – Grenzen Sie Ihre Liste mit Filtern oder der KI-Suche ein, bevor Sie Personen auswählen, damit nur die richtigen Personen aktualisiert werden
- **Auswahl doppelt prüfen** – Sehen Sie sich die ausgewählten Personen an, bevor Sie Massenänderungen anwenden
- **Modus „Nur leere aktualisieren“ verwenden** – Wenn Sie fehlende Daten ergänzen möchten, ohne vorhandene Informationen zu überschreiben
- **Wichtige Änderungen dokumentieren** – Halten Sie Notizen zu Massenaktualisierungen fest, falls Sie diese später nachvollziehen müssen
- **Im Team abstimmen** – Informieren Sie andere Administratoren, wenn Sie größere Massenänderungen vornehmen

## Typische Anwendungsfälle

### Neue Mitglieder aufnehmen

Nach einem Mitgliedskurs setzen Sie alle Teilnehmer auf den Status Mitglied:

1. Suchen Sie die Personen, die an dem Kurs teilgenommen haben.
2. Wählen Sie alle aus.
3. Verwenden Sie **Aktionen** → **Mitgliedschaftsstatus festlegen** → **Mitglied**.

### Kleingruppen organisieren

Fügen Sie mehrere Personen einer neuen Kleingruppe hinzu:

1. Suchen Sie die Personen, die in die Gruppe sollen.
2. Wählen Sie sie aus.
3. Verwenden Sie **Aktionen** → **Zu Gruppe hinzufügen** und wählen Sie die Kleingruppe aus.

### Daten bereinigen

Ergänzen Sie fehlende Familienstände bei verheirateten Paaren:

1. Filtern Sie nach verheirateten Personen (anhand der Haushaltsinformationen).
2. Wählen Sie diejenigen aus, bei denen der Familienstand leer ist.
3. Verwenden Sie **Aktionen** → **Familienstand festlegen** → **Verheiratet** → **Nur leere aktualisieren**.

## Verwandte Artikel

- [Personen durchsuchen](./searching-people.md) – Personen zum Bearbeiten finden
- [KI-Suche](./ai-search.md) – Natürliche Sprache verwenden, um bestimmte Personengruppen zu finden
- [Gruppenmitglieder](../groups/group-members.md) – Gruppenmitgliedschaft verwalten
- [Daten exportieren](./exporting-data.md) – Personendaten vor Massenänderungen exportieren
