---
title: "Rollen & Berechtigungen"
---

# Rollen & Berechtigungen

<div class="article-intro">

Rollen legen fest, worauf verschiedene Benutzer innerhalb Ihres ChurchApps-Kontos zugreifen können. Sie können eigene Rollen für Mitarbeitende, Ehrenamtliche und andere Teammitglieder anlegen, jeweils mit eigener Zugriffsstufe, um Ihre Daten zu schützen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Domain-Administrator-Zugriff oder eine Rolle mit der Berechtigung, Rollen zu verwalten.
- Halten Sie eine Liste Ihrer Teammitglieder und der Bereiche bereit, auf die sie Zugriff benötigen.
- Sehen Sie sich die unten aufgeführten verfügbaren Berechtigungskategorien an, um Ihre Rollen zu planen.

</div>

## Auf Rollen zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Die Seite Rollen zeigt alle derzeit für Ihre Kirche definierten Rollen.

## Die Seite Rollen verstehen

Die Seite Rollen ist in zwei Bereiche unterteilt:

- **Linke Seite** – Zeigt die Liste der Mitglieder, die der gewählten Rolle zugewiesen sind.
- **Rechte Seite** – Zeigt die Berechtigungen, die Sie für diese Rolle festlegen können.

Klicken Sie auf einen Rollennamen, um dessen Mitglieder und Berechtigungen einzusehen und zu verwalten.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie die Rolle, der Sie Mitglieder hinzufügen möchten.
2. Verwenden Sie das **Suchfeld** auf der linken Seite, um die gewünschte Person zu finden.
3. Wählen Sie die Person aus den Suchergebnissen aus.
4. Sie wird der Rolle sofort hinzugefügt.

## Benutzer aus einer Rolle entfernen

1. Wählen Sie die Rolle, die den zu entfernenden Benutzer enthält.
2. Suchen Sie die Person in der Mitgliederliste auf der linken Seite.
3. Klicken Sie neben ihrem Namen auf die Schaltfläche **Entfernen**.

## Berechtigungen festlegen

Jede Rolle kann Zugriff auf bestimmte Bereiche von B1 Admin erhalten. Im Bereich **Berechtigungen bearbeiten** sind die Berechtigungen in Abschnitte gegliedert, die Sie aufklappen können, etwa **Anwesenheit**, **Inhalte**, **Spenden**, **Formulare und Pläne**, **Lektionen**, **Nachrichten**, **Personen und Gruppen** sowie **Aufgaben**. Geben Sie im Feld **Berechtigungen filtern** einen Begriff ein, um nur passende Berechtigungen anzuzeigen.

Aktivieren oder deaktivieren Sie eine Berechtigung, um sie der Rolle zu gewähren oder zu entziehen.

### Berechtigungen für Spenden

Der Abschnitt **Spenden** enthält folgende Berechtigungen:

- **Spendenübersichten anzeigen** – Zugriff auf den Bereich Spenden, einschließlich der Seiten Übersicht, Stapel, Fonds, Kampagnen und Spendenbescheinigungen.
- **Spenden anzeigen** – Einzelne Spenden einsehen, etwa die Gaben innerhalb eines Stapels.
- **Spenden bearbeiten** – Volle Kontrolle: Spenden und Stapel hinzufügen, bearbeiten und löschen sowie [Stapel abschließen und wieder öffnen](../donations/batches.md#closing-and-reopening-a-batch).
- **Spenden erfassen** – Stapel anlegen und Spenden erfassen, bearbeiten oder löschen, aber nur in Stapeln, die noch offen sind. Wer nur diese Berechtigung hat, kann keine Stapel löschen, sie nicht abschließen oder wieder öffnen und keine Gaben ändern, die über Online-Spenden eingegangen sind.
- **Einstellungen bearbeiten** – Einstellungen für Spenden verwalten.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht im Bereich **Spenden** nur die Seite **Stapel**. Geben Sie einem Zählteam sowohl **Spenden erfassen** als auch **Spenden anzeigen**, damit es einen Stapel öffnen und die selbst erfassten Gaben sehen kann. Einzelheiten finden Sie unter [Wer kann einen Stapel ändern](../donations/batches.md#who-can-change-a-batch).

### Nur Namen von Personen anzeigen {#people-names-only}

Im Abschnitt **Personen und Gruppen** gibt es die Berechtigung **Nur Namen von Personen anzeigen**. Sie eignet sich für Ehrenamtliche, die Personen anhand des Namens finden müssen – etwa um jemanden in einem Suchfeld auszuwählen –, ohne Zugriff auf das vollständige Verzeichnis. Mit dieser Berechtigung allein kann eine Person:

- nach Personen anhand des Namens suchen und die Liste der kürzlich hinzugefügten Personen sehen, dabei aber nur Name, Foto und Mitgliedsstatus jeder Person sehen,
- nicht nach E-Mail-Adressen suchen, keine Kontaktdaten sehen und das Verzeichnis **Personen** nicht öffnen.

Kombinieren Sie **Nur Namen von Personen anzeigen** mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** für Ehrenamtliche, die die Anwesenheit im Unterricht erfassen. Unter **Personen** öffnet sich dann für sie **Gruppen**, wo sie die Liste **Alle Gruppen** öffnen und die Mitgliedernamen und Sitzungen jeder Klasse sehen können. Mit **Anwesenheit bearbeiten** können sie außerdem [Anwesenheit erfassen](../attendance/recording-attendance.md) und Gäste hinzufügen, indem sie deren Namen suchen. Namen sind keine Links zu Personendatensätzen, und vertrauliche Gruppen bleiben verborgen, sofern der Ehrenamtliche nicht Mitglied ist.

B1 Admin blendet Links und Schaltflächen aus, die Berechtigungen erfordern, die eine Rolle nicht hat. Die Liste **Alle Gruppen** ist zum Beispiel nur für Personen verfügbar, die Gruppen bearbeiten, Gruppenmitglieder oder Personen anzeigen können, oder die **Nur Namen von Personen anzeigen** zusammen mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** haben (alle anderen werden zurück zum Dashboard geleitet). Das Anwesenheits-Setup erscheint nur mit **Anwesenheit anzeigen** oder **Gottesdienste bearbeiten**. Die Schaltfläche **E-Mail** einer Gruppe erscheint nur für Personen mit **Gruppenmitglieder bearbeiten** (die Berechtigung, die zum Versand von Gruppen-E-Mails nötig ist). Das Drucken einer Gruppenliste erfordert **Gruppenmitglieder anzeigen** oder dass man die Gruppe leitet. Das Löschen eines Kalendertermins erfordert **Inhalte bearbeiten** (oder das Zurückziehen der eigenen ausstehenden Anfrage).

:::warning
**Domain-Administratoren** haben vollen Zugriff auf alle Bereiche Ihres ChurchApps-Kontos. Ihre Berechtigungen können nicht geändert oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre vertrauenswürdigsten Administratoren.
:::

:::tip
Legen Sie gezielte Rollen an, etwa „Schatzmeister“ nur mit Zugriff auf **Spenden**, „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** oder „Check-in-Ehrenamtliche“ nur mit Zugriff auf **Anwesenheit**. So gilt das Prinzip der minimalen Rechte, und Ihre Daten bleiben geschützt. Wie ChurchApps Ihre Informationen schützt, erfahren Sie unter [Datensicherheit](./data-security.md).
:::
