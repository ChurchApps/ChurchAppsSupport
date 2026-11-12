---
title: "Personen gesammelt bearbeiten"
description: "Aktualisieren Sie in B1 Admin für viele Personen gleichzeitig den Mitgliedschaftsstatus, den Familienstand, das Geschlecht, die Verzeichnis-Abmeldung, den Standort, Ja/Nein-Eigenfelder oder Gruppen."
---

# Personen gesammelt bearbeiten

<div class="article-intro">
Mit der Massenbearbeitung aktualisieren Sie mehrere Personen gleichzeitig. Das spart Zeit, wenn Sie dieselbe Änderung bei vielen Personen vornehmen möchten. Sie können Mitgliedschaftsstatus, Familienstand, Geschlecht, Abmeldung aus dem Verzeichnis, Standort, Ja/Nein-Eigenfelder, Gruppenmitgliedschaften und Workflows in einem Arbeitsgang aktualisieren oder Personen löschen.
</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung, Personendaten zu verwalten. Details finden Sie unter [Rollen & Berechtigungen](./roles-permissions.md).
- Sie sollten die Personen, die Sie bearbeiten möchten, bereits hinzugefügt oder importiert haben. Siehe bei Bedarf [Personen hinzufügen](./adding-people.md).
</div>

## Personen für die Massenbearbeitung auswählen {#selecting-people-for-bulk-editing}

1. Öffnen Sie in B1 Admin den Bereich **Personen**.
2. Nutzen Sie die Such- oder Filterwerkzeuge, um die Personen zu finden, die Sie aktualisieren möchten.
3. Setzen Sie die Häkchen, um Personen auszuwählen.
   - In der Ansicht **Haushalte** wählt das Anhaken eines Haushalts alle darin enthaltenen Personen aus.
   - In der Ansicht **Tabelle** (umschalten über den Schalter **Anzeigen als**) können Sie Personen einzeln auswählen.
   - Oder verwenden Sie das Kontrollkästchen über der Liste, um alle sichtbaren Personen auszuwählen.
4. Sobald Sie mindestens eine Person ausgewählt haben, zeigt die Leiste über der Liste, wie viele ausgewählt sind, zusammen mit **Auswahl aufheben** und einer Schaltfläche **Aktionen**.

:::tip
Wenn Sie eine große Gruppe von Personen anhand bestimmter Kriterien aktualisieren möchten, nutzen Sie die Funktion [KI-Suche](./ai-search.md) oder Filter, um Ihre Liste zuerst einzugrenzen, und wählen Sie dann alle passenden Personen aus.
:::

## Verfügbare Massenaktionen {#available-bulk-actions}

Das Menü **Aktionen** bietet die folgenden Optionen. Jede öffnet einen kleinen Dialog, der Ihnen sagt, wie viele Personen geändert werden; wählen Sie einen Wert und klicken Sie auf **Anwenden**. Der neue Wert ersetzt den bisherigen Wert jeder ausgewählten Person. Ist der Vorgang abgeschlossen, bestätigt eine Meldung am Seitenende, wie viele Personen aktualisiert wurden.

### Mitgliedschaftsstatus festlegen {#set-membership-status}

1. Klicken Sie auf **Aktionen** → **Mitgliedschaftsstatus festlegen**.
2. Wählen Sie den neuen **Mitgliedschaftsstatus**:
   - **Besucher** -- Erstbesucher oder gelegentliche Teilnehmer
   - **Gast** -- Gäste, etwa Familien, die an einem Check-in-Terminal registriert wurden
   - **Regelmäßiger Teilnehmer** -- häufige Teilnehmer, die keine Mitglieder sind
   - **Mitglied** -- offizielle Mitglieder der Gemeinde
   - **Mitarbeitend** -- Mitarbeitende der Gemeinde
   - **Inaktiv** -- Personen, die nicht mehr teilnehmen
   - **Verstorben** -- Personen, die verstorben sind
3. Klicken Sie auf **Anwenden**.

### Familienstand festlegen {#set-marital-status}

1. Klicken Sie auf **Aktionen** → **Familienstand festlegen**.
2. Wählen Sie **Unbekannt**, **Ledig**, **Verheiratet**, **Geschieden** oder **Verwitwet**.
3. Klicken Sie auf **Anwenden**.

### Geschlecht festlegen {#set-gender}

1. Klicken Sie auf **Aktionen** → **Geschlecht festlegen**.
2. Wählen Sie **Nicht angegeben**, **Männlich** oder **Weiblich**.
3. Klicken Sie auf **Anwenden**.

### Verzeichnis-Abmeldung festlegen {#set-directory-opt-out}

Die Verzeichnis-Abmeldung steuert, ob Personen im Mitgliederverzeichnis erscheinen -- im [gedruckten Verzeichnis](./print-directory.md) und im Mitgliederverzeichnis der B1-App. Es ist dieselbe Einstellung wie **Mich aus dem Mitgliederverzeichnis ausblenden** im Datensatz einer Person.

1. Klicken Sie auf **Aktionen** → **Verzeichnis-Abmeldung festlegen**.
2. Wählen Sie **Abgemeldet: Ja**, um die ausgewählten Personen aus dem Verzeichnis auszublenden, oder **Abgemeldet: Nein**, um sie wieder anzuzeigen.
3. Klicken Sie auf **Anwenden**.

:::warning
Personen, die sich selbst aus dem Verzeichnis ausgeblendet haben, sollten verborgen bleiben, sofern sie nicht ausdrücklich darum bitten, wieder aufgenommen zu werden.
:::

### Standort festlegen {#set-campus}

Diese Option erscheint, wenn in Ihrer Gemeinde [Standorte](../settings/campuses.md) eingerichtet sind.

1. Klicken Sie auf **Aktionen** → **Standort festlegen**.
2. Wählen Sie den Standort.
3. Klicken Sie auf **Anwenden**.

### Eigenfeld festlegen {#set-custom-field}

Setzen Sie einen Ja/Nein-Wert eines [Eigenfelds](../settings/custom-fields.md) für alle ausgewählten Personen auf einmal:

1. Klicken Sie auf **Aktionen** → **Eigenfeld festlegen**.
2. Wählen Sie das Ja/Nein-**Eigenfeld**, das Sie setzen möchten.
3. Wählen Sie den **Wert** (**Ja** oder **Nein**), der übernommen werden soll.
4. Klicken Sie auf **Anwenden**.

:::info
Für diese Massenaktion stehen nur Ja/Nein-Eigenfelder zur Verfügung. Um andere Feldtypen zu setzen, bearbeiten Sie jede Person einzeln. Hat Ihre Gemeinde keine Ja/Nein-Eigenfelder, weist der Dialog darauf hin.
:::

### Zur Gruppe hinzufügen {#add-to-group}

1. Klicken Sie auf **Aktionen** → **Zur Gruppe hinzufügen**.
2. Wählen Sie die **Gruppe**, zu der die Personen hinzugefügt werden sollen. Um sie stattdessen in eine brandneue Gruppe zu setzen, aktivieren Sie **Neue Gruppe erstellen** und geben Sie einen **Neuen Gruppennamen** ein.
3. Klicken Sie auf **Anwenden**.

Jede Person wird als reguläres Mitglied der Gruppe hinzugefügt. Einzelne Personen können Sie später auf der Seite [Gruppenmitglieder](../groups/group-members.md) zu Gruppenleitenden befördern. Um Personen mehreren Gruppen hinzuzufügen, wiederholen Sie dies für jede Gruppe.

### Aus Gruppe entfernen {#remove-from-group}

1. Klicken Sie auf **Aktionen** → **Aus Gruppe entfernen**.
2. Wählen Sie die **Gruppe**, aus der die Personen entfernt werden sollen.
3. Klicken Sie auf **Anwenden**.

:::info
Diese Aktion entfernt Personen nur aus der Gruppe. Ihre Personendatensätze werden dadurch nicht gelöscht.
:::

### Zu Workflow hinzufügen {#add-to-workflow}

Fügen Sie die ausgewählten Personen als Karten einem [Workflow](../serving/workflows.md) hinzu:

1. Klicken Sie auf **Aktionen** → **Zum Workflow hinzufügen**.
2. Wählen Sie den Workflow.
3. Klicken Sie auf **Anwenden**.

### Personen löschen {#delete-people}

Löschen Sie die ausgewählten Personen aus der Datenbank Ihrer Gemeinde:

1. Klicken Sie auf **Aktionen** → **Löschen**.
2. Der Dialog **Ausgewählte Personen löschen** fragt Sie, die Anzahl der zu löschenden Personen zu bestätigen.
3. Klicken Sie auf **Löschen**.

:::danger
Gelöschte Personen verschwinden aus Ihrem Verzeichnis, aus Gruppen und aus Suchen. Verwenden Sie diese Aktion nur, wenn Sie sicher sind, dass Sie diese Personen aus Ihrem System entfernen möchten.
:::

Sie können sich selbst nicht auswählen, daher können Sie Ihren eigenen Datensatz nicht massenhaft löschen oder bearbeiten.


## Bewährte Vorgehensweisen {#best-practices}

- **Klein anfangen** -- Testen Sie Massenvorgänge zuerst an wenigen Datensätzen, um sicherzustellen, dass Sie die richtigen Änderungen vornehmen
- **Filter verwenden** -- Grenzen Sie Ihre Liste mit Filtern oder KI-Suche ein, bevor Sie Personen auswählen, damit Sie nur die richtigen Personen aktualisieren
- **Auswahl doppelt prüfen** -- Sehen Sie sich die ausgewählten Personen an, bevor Sie Massenänderungen übernehmen
- **Größere Änderungen dokumentieren** -- Halten Sie Notizen zu Massenaktualisierungen fest, falls Sie später darauf zurückgreifen müssen
- **Mit dem Team abstimmen** -- Informieren Sie andere Administrierende, wenn Sie größere Massenänderungen vornehmen

## Typische Anwendungsfälle {#common-use-cases}

### Neue Mitglieder aktualisieren {#updating-new-members}

Nach einem Mitgliedskurs setzen Sie alle Teilnehmenden auf den Status Mitglied:

1. Suchen Sie die Personen, die den Kurs besucht haben
2. Wählen Sie alle aus
3. Verwenden Sie **Aktionen** → **Mitgliedschaftsstatus festlegen** → **Mitglied**

### Kleingruppen organisieren {#organizing-small-groups}

Fügen Sie mehrere Personen einer neuen Kleingruppe hinzu:

1. Suchen Sie die Personen, die in die Gruppe sollen
2. Wählen Sie sie aus
3. Verwenden Sie **Aktionen** → **Zur Gruppe hinzufügen** und wählen Sie die Kleingruppe

### Daten bereinigen {#cleaning-up-data}

Markieren Sie eine Gruppe ehemaliger Teilnehmer als inaktiv:

1. Öffnen Sie die **erweiterte** Suche und filtern Sie die Personen, die Sie aktualisieren möchten (zum Beispiel alle, die seit Längerem nicht mehr teilgenommen haben)
2. Wählen Sie sie aus
3. Verwenden Sie **Aktionen** → **Mitgliedschaftsstatus festlegen** → **Inaktiv**

## Verwandte Artikel {#related-articles}

- [Personen suchen](./searching-people.md) -- Personen zum Bearbeiten finden
- [KI-Suche](./ai-search.md) -- Mit natürlicher Sprache bestimmte Gruppen von Personen finden
- [Gruppenmitglieder](../groups/group-members.md) -- Gruppenmitgliedschaften verwalten
- [Daten exportieren](./exporting-data.md) -- Personendaten vor Massenänderungen exportieren
