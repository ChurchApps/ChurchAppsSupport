---
title: "Rollen & Berechtigungen"
---

# Rollen & Berechtigungen

<div class="article-intro">

Mit Rollen steuern Sie, worauf verschiedene Benutzer in Ihrem ChurchApps-Konto zugreifen können. Sie können eigene Rollen für Mitarbeitende, Ehrenamtliche und andere Teammitglieder anlegen, jeweils mit eigener Zugriffsstufe, um Ihre Daten zu schützen.

</div>

## Schulungsvideo

<YouTube id="ZzCIkinVMnE" title="Rollen, Berechtigungen und Ihr Team in B1 einladen" next="Dienstzeiten und Anwesenheit in B1 einrichten" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Zugriff als Domänenadministrator oder eine Rolle mit der Berechtigung, Rollen zu verwalten
- Halten Sie eine Liste der Teammitglieder und der Bereiche bereit, auf die sie Zugriff brauchen
- Prüfen Sie die unten aufgeführten Berechtigungskategorien, um Ihre Rollen zu planen

</div>

## Auf Rollen zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Die Seite Rollen zeigt alle für Ihre Kirche definierten Rollen. Die Spalte **Mitglieder** zeigt, wie viele Benutzer in jeder Rolle sind, und die Zeile **(Alle)** zeigt **Alle Benutzer**.

## Die Seite Rollen verstehen

Die Seite Rollen ist in zwei Bereiche geteilt:

- **Linke Seite** – Zeigt die Liste der Mitglieder, die der gewählten Rolle zugewiesen sind.
- **Rechte Seite** – Zeigt die Berechtigungen, die Sie für diese Rolle festlegen können.

Klicken Sie auf einen beliebigen Rollennamen, um dessen Mitglieder und Berechtigungen anzusehen und zu verwalten.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie die Rolle, der Sie Mitglieder hinzufügen möchten.
2. Verwenden Sie das **Suchfeld** auf der linken Seite, um die gewünschte Person zu finden.
3. Wählen Sie die Person aus den Suchergebnissen.
4. Sie wird sofort der Rolle hinzugefügt.

## Benutzer aus einer Rolle entfernen

1. Wählen Sie die Rolle, die den Benutzer enthält.
2. Suchen Sie die Person in der Mitgliederliste auf der linken Seite.
3. Klicken Sie neben ihrem Namen auf die Schaltfläche **Entfernen**.

## Berechtigungen festlegen

Jede Rolle kann Zugriff auf bestimmte Bereiche von B1 Admin erhalten. Im Bereich **Berechtigungen bearbeiten** sind die Berechtigungen in Abschnitte gegliedert, die Sie aufklappen können, etwa **Anwesenheit**, **Inhalt**, **Spenden**, **Formulare und Pläne**, **Lektionen**, **Nachrichten**, **Personen und Gruppen** und **Aufgaben**. Geben Sie ein Wort in das Feld **Berechtigungen filtern** ein, um nur die passenden Berechtigungen anzuzeigen.

Aktivieren oder deaktivieren Sie eine Berechtigung, um sie der Rolle zu gewähren oder zu entziehen. Jede Abschnittsüberschrift zeigt, wie viele ihrer Berechtigungen die Rolle hat, etwa **2 von 5**, und die Anzahl aktualisiert sich, während Sie Kästchen an- und abwählen.

### Berechtigungen für Spenden

Der Abschnitt **Spenden** enthält diese Berechtigungen:

- **Spendenübersichten anzeigen** – Sehen des Bereichs Spenden, einschließlich der Seiten Übersicht, Stapel, Fonds, Kampagnen und Spendenbescheinigungen.
- **Spenden anzeigen** – Einzelne Spenden sehen, etwa die Gaben innerhalb eines Stapels.
- **Spenden bearbeiten** – Volle Kontrolle: Spenden und Stapel hinzufügen, bearbeiten und löschen sowie [Stapel schließen und wieder öffnen](../donations/batches.md#closing-and-reopening-a-batch).
- **Spenden erfassen** – Stapel hinzufügen und Spenden erfassen, bearbeiten oder löschen, aber nur in Stapeln, die noch offen sind. Wer nur diese Berechtigung hat, kann keine Stapel löschen, sie nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Spenden eingegangen sind.
- **Spendeneinstellungen bearbeiten** – Verwalten der Einstellungen für Spenden.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht unter **Spenden** nur die Seite **Stapel**. Geben Sie einem Zählteam sowohl **Spenden erfassen** als auch **Spenden anzeigen**, damit es einen Stapel öffnen und die Gaben sehen kann, die es erfasst hat. Details finden Sie unter [Wer einen Stapel ändern kann](../donations/batches.md#who-can-change-a-batch).

### Nur Namen von Personen anzeigen {#people-names-only}

Der Abschnitt **Personen und Gruppen** enthält **Nur Namen von Personen anzeigen**. Verwenden Sie diese Berechtigung für Ehrenamtliche, die Personen nur über den Namen nachschlagen müssen – etwa um jemanden in einem Suchfeld auszuwählen –, ohne Zugriff auf das vollständige Verzeichnis. Mit dieser Berechtigung allein kann eine Person:

- Nach Personen über den Namen suchen und die Liste der kürzlich hinzugefügten Personen sehen, aber nur Name, Foto und Mitgliedsstatus jeder Person sehen
- Nicht nach E-Mail-Adressen suchen, keine Kontaktdaten sehen und das Verzeichnis **Personen** nicht öffnen

Kombinieren Sie **Nur Namen von Personen anzeigen** mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** für Ehrenamtliche, die die Anwesenheit im Unterricht erfassen. Unter **Personen** in ihrem Menü öffnet sich dann **Gruppen**, wo sie die Liste **Alle Gruppen** öffnen und die Namen der Mitglieder und die Sitzungen jeder Klasse sehen können. Mit **Anwesenheit bearbeiten** können sie außerdem [Anwesenheit erfassen](../attendance/recording-attendance.md) und Gäste über die Suche nach ihrem Namen hinzufügen. Namen sind keine Links zu Personendatensätzen, und vertrauliche Gruppen bleiben verborgen, solange die ehrenamtliche Person nicht Mitglied ist.

B1 Admin blendet Links und Schaltflächen aus, für die eine Rolle nicht die nötigen Berechtigungen hat. Die Liste **Alle Gruppen** ist zum Beispiel nur für Personen verfügbar, die Gruppen bearbeiten, Gruppenmitglieder oder Personen ansehen können, oder die **Nur Namen von Personen anzeigen** zusammen mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** haben (andere werden zum Dashboard zurückgeschickt). Die Einrichtung der Anwesenheit erscheint nur mit **Gottesdienste bearbeiten**. Die Schaltfläche **E-Mail** einer Gruppe erscheint nur für Personen mit **Gruppenmitglieder bearbeiten** (die Berechtigung, die zum Versand von Gruppen-E-Mails nötig ist). Eine Gruppenliste zu drucken erfordert **Gruppenmitglieder anzeigen** oder die Leitung dieser Gruppe. Das Löschen einer Kalenderveranstaltung erfordert **Inhalte bearbeiten** (oder das Zurückziehen der eigenen offenen Anfrage).

### Zugang für Check-in-Kioske {#check-in-kiosk-accounts}

Das Konto, mit dem man sich an einem [Kiosk für B1 Checkin](../../b1-checkin/getting-started/logging-in.md) anmeldet, braucht die Berechtigung **Checkin** im Bereich **Anwesenheit** (oder **Anwesenheit bearbeiten**). Mit **Checkin** allein kann der Kiosk Familien nach Name oder Telefonnummer suchen, sie ein- und auschecken und anzeigen, wer ein Kind abholen darf – ohne Zugriff auf das Personenverzeichnis.

Checkin wird nicht mehr über die Zeile **(Alle)** vergeben. Dass jemand in einer Rolle mit anderen Berechtigungen ist, erlaubt ihm nicht, den Kiosk zu betreiben; fügen Sie **Checkin** einer Rolle wie „Check-in-Ehrenamtliche“ hinzu und nehmen Sie die Kiosk-Konten in diese Rolle auf.

:::warning
**Domänenadministratoren** haben vollen Zugriff auf alle Bereiche Ihres ChurchApps-Kontos. Ihre Berechtigungen können nicht geändert oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre vertrauenswürdigsten Administratoren.
:::

:::tip
Legen Sie gezielte Rollen an, etwa „Schatzmeister“ nur mit Zugriff auf **Spenden**, „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** oder „Check-in-Ehrenamtliche“ nur mit Zugriff auf **Anwesenheit**. Das folgt dem Prinzip der minimalen Rechte und schützt Ihre Daten. Mehr dazu, wie ChurchApps Ihre Informationen schützt, finden Sie unter [Datensicherheit](./data-security.md).
:::
