---
title: "Rollen & Berechtigungen"
---

# Rollen & Berechtigungen

<div class="article-intro">

Mit Rollen legen Sie fest, worauf verschiedene Benutzer innerhalb Ihres ChurchApps-Kontos zugreifen können. Sie können benutzerdefinierte Rollen für Mitarbeitende, Ehrenamtliche und andere Teammitglieder erstellen, jeweils mit eigener Zugriffsstufe, damit Ihre Daten geschützt bleiben.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Domain-Administrator-Zugriff oder eine Rolle mit der Berechtigung, Rollen zu verwalten
- Halten Sie eine Liste Ihrer Teammitglieder und der Bereiche bereit, auf die sie Zugriff benötigen
- Sehen Sie sich unten die verfügbaren Berechtigungskategorien an, um Ihre Rollen zu planen

</div>

## Auf Rollen zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Die Seite Rollen zeigt alle aktuell für Ihre Gemeinde definierten Rollen an.

## Die Seite Rollen verstehen

Die Seite Rollen ist in zwei Bereiche gegliedert:

- **Linke Seite** – zeigt die Liste der Mitglieder, die der ausgewählten Rolle zugeordnet sind.
- **Rechte Seite** – zeigt die Berechtigungseinstellungen, die Sie für diese Rolle festlegen können.

Klicken Sie auf einen Rollennamen, um dessen Mitglieder und Berechtigungen einzusehen und zu verwalten.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie die Rolle aus, der Sie Mitglieder hinzufügen möchten.
2. Verwenden Sie das **Suchfeld** auf der linken Seite, um die gewünschte Person zu finden.
3. Wählen Sie die Person aus den Suchergebnissen aus.
4. Sie werden sofort zur Rolle hinzugefügt.

## Benutzer aus einer Rolle entfernen

1. Wählen Sie die Rolle aus, der der zu entfernende Benutzer angehört.
2. Suchen Sie die Person in der Mitgliederliste auf der linken Seite.
3. Klicken Sie neben ihrem Namen auf die Schaltfläche **Entfernen**.

## Berechtigungen konfigurieren

Jede Rolle kann Zugriff auf bestimmte Bereiche von B1 Admin erhalten. Im Bereich **Berechtigungen bearbeiten** sind die Berechtigungen in Abschnitte gegliedert, die Sie aufklappen können, etwa **Anwesenheit**, **Inhalte**, **Spenden**, **Formulare und Pläne**, **Lektionen**, **Nachrichten**, **Personen und Gruppen** sowie **Aufgaben**. Geben Sie im Feld **Berechtigungen filtern** einen Begriff ein, um nur die passenden Berechtigungen anzuzeigen.

Aktivieren oder deaktivieren Sie eine Berechtigung, um sie der Rolle zu gewähren oder zu entziehen.

### Spenden-Berechtigungen

Der Abschnitt **Spenden** enthält diese Berechtigungen:

- **Spendenübersichten anzeigen** – den Bereich Spenden sehen, einschließlich der Seiten Übersicht, Stapel, Fonds, Kampagnen und Spendenbescheinigungen.
- **Spenden anzeigen** – einzelne Spenden sehen, etwa die Gaben innerhalb eines Stapels.
- **Spenden bearbeiten** – volle Kontrolle: Spenden und Stapel hinzufügen, bearbeiten und löschen sowie [Stapel schließen und wieder öffnen](../donations/batches.md#closing-and-reopening-a-batch).
- **Spenden erfassen** – Stapel hinzufügen und Spenden erfassen, bearbeiten oder löschen, aber nur in Stapeln, die noch offen sind. Personen mit nur dieser Berechtigung können keine Stapel löschen, sie nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Spenden eingegangen sind.
- **Spendeneinstellungen bearbeiten** – Spendeneinstellungen verwalten.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht im Bereich **Spenden** nur die Seite **Stapel**. Geben Sie einer Zählteam-Rolle sowohl **Spenden erfassen** als auch **Spenden anzeigen**, damit das Team einen Stapel öffnen und die von ihm erfassten Gaben sehen kann. Einzelheiten finden Sie unter [Wer einen Stapel ändern kann](../donations/batches.md#who-can-change-a-batch).

### Namen von Personen nur anzeigen

Der Abschnitt **Personen und Gruppen** enthält die Berechtigung **Nur Namen von Personen anzeigen**. Nutzen Sie sie für Ehrenamtliche, die Personen nur anhand des Namens nachschlagen müssen – zum Beispiel, um jemanden in einem Suchfeld auszuwählen –, ohne Zugriff auf das vollständige Verzeichnis. Mit dieser Berechtigung allein kann eine Person:

- nach Personen anhand des Namens suchen und die Liste der zuletzt hinzugefügten Personen sehen, sieht dabei aber nur den Namen, das Foto und den Mitgliedsstatus jeder Person
- nicht nach E-Mail-Adressen suchen, keine Kontaktdaten sehen und das Verzeichnis **Personen** nicht öffnen

B1 Admin blendet Links und Schaltflächen aus, für die einer Rolle die nötigen Berechtigungen fehlen. Die Liste **Alle Gruppen** ist zum Beispiel nur für Personen verfügbar, die Gruppen bearbeiten, Gruppenmitglieder oder Personen anzeigen können (andere werden zum Dashboard zurückgeleitet). Die Anwesenheitseinrichtung erscheint nur mit **Anwesenheit anzeigen** oder **Gottesdienste bearbeiten**. Die Schaltfläche **E-Mail** einer Gruppe erscheint nur für Personen mit **Gruppenmitglieder bearbeiten** (die Berechtigung, die für den Versand von Gruppen-E-Mails benötigt wird). Eine Gruppenliste zu drucken erfordert **Gruppenmitglieder anzeigen** oder die Leitung dieser Gruppe. Einen Kalendertermin zu löschen erfordert **Inhalte bearbeiten** (oder das Zurückziehen Ihrer eigenen ausstehenden Anfrage).

:::warning
**Domain-Administratoren** haben vollen Zugriff auf alle Bereiche Ihres ChurchApps-Kontos. Ihre Berechtigungen können nicht geändert oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre vertrauenswürdigsten Administratoren.
:::

:::tip
Erstellen Sie gezielte Rollen wie „Schatzmeister“ mit nur Zugriff auf **Spenden**, „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** oder „Check-in-Ehrenamtliche“ mit nur **Anwesenheit**-Zugriff. So folgen Sie dem Prinzip der minimalen Berechtigung und schützen Ihre Daten. Weitere Informationen dazu, wie ChurchApps Ihre Daten schützt, finden Sie unter [Datensicherheit](./data-security.md).
:::
