---
title: "Rollen & Berechtigungen"
---

# Rollen & Berechtigungen

<div class="article-intro">

Mit Rollen legen Sie fest, worauf verschiedene Benutzer innerhalb Ihres ChurchApps-Kontos zugreifen dürfen. Sie können eigene Rollen für Mitarbeitende, Ehrenamtliche und andere Teammitglieder anlegen, jeweils mit eigener Zugriffsstufe, um Ihre Daten zu schützen.

</div>

## Schulungsvideo

<YouTube id="ZzCIkinVMnE" title="Rollen, Berechtigungen und Einladen Ihres Teams in B1" next="Gottesdienste und Anwesenheit in B1 einrichten" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Domänenadministrator-Zugriff oder eine Rolle mit der Berechtigung, Rollen zu verwalten
- Halten Sie eine Liste der Teammitglieder und der Bereiche bereit, die sie benötigen
- Sehen Sie sich die unten aufgeführten Berechtigungskategorien an, um Ihre Rollen zu planen

</div>

## Auf Rollen zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Die Seite Rollen zeigt alle derzeit definierten Rollen Ihrer Kirche. Die Spalte **Mitglieder** zeigt, wie viele Benutzer in jeder Rolle sind, und die Zeile **(Alle)** zeigt **Alle Benutzer**.

## Die Seite Rollen verstehen

Die Seite Rollen ist in zwei Bereiche unterteilt:

- **Linke Seite** -- Zeigt die Liste der Mitglieder, die der gewählten Rolle zugeordnet sind.
- **Rechte Seite** -- Zeigt die Berechtigungseinstellungen, die Sie für diese Rolle festlegen können.

Klicken Sie auf einen Rollennamen, um dessen Mitglieder und Berechtigungen anzusehen und zu verwalten.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie die Rolle, der Sie Mitglieder hinzufügen möchten.
2. Verwenden Sie das **Suchfeld** auf der linken Seite, um die gewünschte Person zu finden.
3. Wählen Sie die Person aus den Suchergebnissen.
4. Sie wird sofort der Rolle hinzugefügt.

## Benutzer aus einer Rolle entfernen

1. Wählen Sie die Rolle, die den gewünschten Benutzer enthält.
2. Suchen Sie die Person in der Mitgliederliste auf der linken Seite.
3. Klicken Sie neben ihrem Namen auf die Schaltfläche **Entfernen**.

## Berechtigungen festlegen

Jede Rolle kann Zugriff auf bestimmte Bereiche von B1 Admin erhalten. Im Bereich **Berechtigungen bearbeiten** sind Berechtigungen in Abschnitte gruppiert, die Sie aufklappen können, etwa **Anwesenheit**, **Inhalte**, **Spenden**, **Formulare und Pläne**, **Lektionen**, **Nachrichten**, **Personen und Gruppen** und **Aufgaben**. Geben Sie im Feld **Berechtigungen filtern** einen Begriff ein, um nur die passenden Berechtigungen anzuzeigen.

Setzen oder entfernen Sie ein Häkchen bei einer Berechtigung, um sie für die Rolle zu gewähren oder zu entziehen. Die Überschrift jedes Abschnitts zeigt, wie viele Berechtigungen die Rolle daraus hat, etwa **2 von 5**, und die Zahl aktualisiert sich beim Setzen und Entfernen der Häkchen.

### Berechtigungen für Spenden

Der Abschnitt **Spenden** enthält diese Berechtigungen:

- **Spendenübersichten anzeigen** -- sieht den Bereich Spenden, einschließlich der Seiten Übersicht, Stapel, Fonds, Kampagnen und Spendenbescheinigungen.
- **Spenden anzeigen** -- sieht einzelne Spenden, etwa die Gaben innerhalb eines Stapels.
- **Spenden bearbeiten** -- volle Kontrolle: Spenden und Stapel hinzufügen, bearbeiten und löschen sowie [Stapel schließen und wieder öffnen](../donations/batches.md#closing-and-reopening-a-batch).
- **Spenden erfassen** -- Stapel anlegen und Spenden erfassen, bearbeiten oder löschen, aber nur in Stapeln, die noch offen sind. Wer nur diese Berechtigung hat, kann keine Stapel löschen, sie nicht schließen oder wieder öffnen und keine Gaben ändern, die über Online-Giving eingegangen sind.
- **Einstellungen bearbeiten** -- Spendeneinstellungen verwalten.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** hat, sieht unter **Spenden** nur die Seite **Stapel**. Geben Sie einem Zählteam sowohl **Spenden erfassen** als auch **Spenden anzeigen**, damit es einen Stapel öffnen und die selbst erfassten Gaben sehen kann. Details finden Sie unter [Wer einen Stapel ändern kann](../donations/batches.md#who-can-change-a-batch).

### Nur Namen von Personen anzeigen

Der Abschnitt **Personen und Gruppen** enthält **Nur Namen von Personen anzeigen**. Nutzen Sie es für Ehrenamtliche, die Personen nur über den Namen finden müssen -- etwa um jemanden in einem Suchfeld auszuwählen --, ohne Zugriff auf das vollständige Verzeichnis. Mit dieser Berechtigung allein gilt für eine Person:

- Sie kann Personen über den Namen suchen und die Liste der kürzlich hinzugefügten Personen sehen, aber sie sieht bei jeder Person nur Name, Foto und Mitgliedsstatus.
- Sie kann nicht nach E-Mail suchen, keine Kontaktdaten sehen und das Verzeichnis **Personen** nicht öffnen.

Kombinieren Sie **Nur Namen von Personen anzeigen** mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** für Ehrenamtliche, die die Anwesenheit im Unterricht erfassen. Unter **Personen** führt ihr Menü dann zu **Gruppen**, wo sie die Liste **Alle Gruppen** öffnen und die Mitgliedernamen und Sitzungen jedes Kurses sehen können. Mit **Anwesenheit bearbeiten** können sie außerdem [Anwesenheit erfassen](../attendance/recording-attendance.md) und Gäste hinzufügen, indem sie nach deren Namen suchen. Namen sind keine Links zu Personendatensätzen, und vertrauliche Gruppen bleiben verborgen, sofern der Ehrenamtliche nicht Mitglied ist.

B1 Admin blendet Links und Schaltflächen aus, für die eine Rolle keine Berechtigung hat. Beispielsweise ist die Liste **Alle Gruppen** nur für Personen verfügbar, die Gruppen bearbeiten, Gruppenmitglieder oder Personen ansehen dürfen, oder die **Nur Namen von Personen anzeigen** zusammen mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** haben (andere werden zurück zum Dashboard geschickt). Die Einrichtung der Anwesenheit erscheint nur mit **Anwesenheit anzeigen** oder **Gottesdienste bearbeiten**. Die Schaltfläche **E-Mail** einer Gruppe erscheint nur für Personen mit **Gruppenmitglieder bearbeiten** (die Berechtigung, die für den Versand von Gruppen-E-Mails nötig ist). Das Drucken einer Gruppenliste erfordert **Gruppenmitglieder anzeigen** oder die Leitung dieser Gruppe. Das Löschen eines Kalendertermins erfordert **Inhalte bearbeiten** (oder das Zurückziehen Ihrer eigenen offenen Anfrage).

:::warning
**Domänenadministratoren** haben vollen Zugriff auf alle Bereiche Ihres ChurchApps-Kontos. Ihre Berechtigungen lassen sich nicht ändern oder einschränken. Verwenden Sie diese Rolle nur für Ihre vertrauenswürdigsten Administratoren.
:::

:::tip
Legen Sie gezielte Rollen an, etwa "Schatzmeister" nur mit Zugriff auf **Spenden**, "Zählteam" mit **Spenden erfassen** und **Spenden anzeigen** oder "Check-in-Ehrenamtliche" nur mit Zugriff auf **Anwesenheit**. So folgen Sie dem Prinzip der geringsten Rechte und schützen Ihre Daten. Wie ChurchApps Ihre Informationen schützt, erfahren Sie unter [Datensicherheit](./data-security.md).
:::
