---
title: "Rollen & Berechtigungen"
---

# Rollen & Berechtigungen

<div class="article-intro">

Mit Rollen legen Sie fest, worauf verschiedene Benutzer innerhalb Ihres ChurchApps-Kontos zugreifen können. Sie können eigene Rollen für Mitarbeitende, Ehrenamtliche und andere Teammitglieder anlegen, jeweils mit einer eigenen Zugriffsstufe, damit Ihre Daten geschützt bleiben.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Domain-Administrator-Zugriff oder eine Rolle mit der Berechtigung, Rollen zu verwalten.
- Halten Sie eine Liste Ihrer Teammitglieder und der Bereiche bereit, auf die sie Zugriff benötigen.
- Sehen Sie sich die unten aufgeführten Berechtigungskategorien an, um Ihre Rollen zu planen.

</div>

## Auf Rollen zugreifen

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Die Seite Rollen zeigt alle aktuell definierten Rollen für Ihre Gemeinde an. In der Spalte **Mitglieder** sehen Sie, wie viele Benutzer in jeder Rolle sind, und in der Zeile **(Alle)** steht **Alle Benutzer**.

## Die Seite Rollen verstehen

Die Seite Rollen ist in zwei Bereiche unterteilt:

- **Linke Seite** – Zeigt die Liste der Mitglieder, die der ausgewählten Rolle zugewiesen sind.
- **Rechte Seite** – Zeigt die Berechtigungen, die Sie für diese Rolle festlegen können.

Klicken Sie auf einen Rollennamen, um dessen Mitglieder und Berechtigungen anzuzeigen und zu verwalten.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie die Rolle aus, der Sie Mitglieder hinzufügen möchten.
2. Suchen Sie mit dem **Suchfeld** auf der linken Seite nach der gewünschten Person.
3. Wählen Sie die Person aus den Suchergebnissen aus.
4. Die Person wird sofort der Rolle hinzugefügt.

## Benutzer aus einer Rolle entfernen

1. Wählen Sie die Rolle aus, die den Benutzer enthält, den Sie entfernen möchten.
2. Suchen Sie die Person in der Mitgliederliste auf der linken Seite.
3. Klicken Sie neben ihrem Namen auf die Schaltfläche **Entfernen**.

## Berechtigungen konfigurieren

Jede Rolle kann Zugriff auf bestimmte Bereiche von B1 Admin erhalten. Im Bereich **Berechtigungen bearbeiten** sind die Berechtigungen in aufklappbare Abschnitte gruppiert, etwa **Anwesenheit**, **Inhalte**, **Spenden**, **Formulare und Pläne**, **Lektionen**, **Nachrichten**, **Personen und Gruppen** und **Aufgaben**. Geben Sie im Feld **Berechtigungen filtern** einen Begriff ein, um nur passende Berechtigungen anzuzeigen.

Aktivieren oder deaktivieren Sie eine Berechtigung, um sie der Rolle zu gewähren oder zu entziehen. Jede Abschnittsüberschrift zeigt an, wie viele ihrer Berechtigungen die Rolle besitzt, etwa **2 von 5**. Diese Anzahl wird aktualisiert, sobald Sie Kästchen aktivieren oder deaktivieren.

### Berechtigungen für Spenden

Der Abschnitt **Spenden** enthält folgende Berechtigungen:

- **Spendenübersichten anzeigen** – Zeigt den Bereich Spenden an, einschließlich der Seiten Übersicht, Chargen, Fonds, Kampagnen und Spendenbescheinigungen.
- **Spenden anzeigen** – Zeigt einzelne Spenden an, etwa die Gaben innerhalb einer Charge.
- **Spenden bearbeiten** – Volle Kontrolle: Spenden und Chargen hinzufügen, bearbeiten und löschen sowie [Chargen schließen und wieder öffnen](../donations/batches.md#closing-and-reopening-a-batch).
- **Spenden erfassen** – Chargen anlegen sowie Spenden nur in noch offenen Chargen erfassen, bearbeiten oder löschen. Wer nur diese Berechtigung hat, kann Chargen weder löschen noch schließen oder wieder öffnen und auch keine Gaben ändern, die über Online-Spenden eingegangen sind.
- **Spendeneinstellungen bearbeiten** – Verwaltet die Einstellungen für Spenden.

Wer **Spenden erfassen**, aber nicht **Spendenübersichten anzeigen** besitzt, sieht unter **Spenden** nur die Seite **Chargen**. Geben Sie einem Zählteam sowohl **Spenden erfassen** als auch **Spenden anzeigen**, damit es eine Charge öffnen und die selbst erfassten Gaben einsehen kann. Einzelheiten finden Sie unter [Wer eine Charge ändern kann](../donations/batches.md#who-can-change-a-batch).

### Nur Namen von Personen anzeigen

Im Abschnitt **Personen und Gruppen** finden Sie die Berechtigung **Nur Namen von Personen anzeigen**. Sie eignet sich für Ehrenamtliche, die Personen anhand des Namens nachschlagen müssen – etwa um jemanden in einem Suchfeld auszuwählen –, ohne Zugriff auf das vollständige Personenverzeichnis zu haben. Mit dieser Berechtigung allein kann eine Person:

- nach Personen anhand des Namens suchen und die Liste kürzlich hinzugefügter Personen sehen, dabei aber nur den Namen, das Foto und den Mitgliedsstatus jeder Person erkennen
- nicht nach E-Mail-Adressen suchen, keine Kontaktdaten sehen und das Verzeichnis **Personen** nicht öffnen

Kombinieren Sie **Nur Namen von Personen anzeigen** mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** für Ehrenamtliche, die die Anwesenheit im Unterricht erfassen. Unter **Personen** in ihrem Menü öffnet sich dann **Gruppen**, wo sie die Liste **Alle Gruppen** öffnen und die Namen der Mitglieder sowie die Termine jeder Klasse sehen können. Mit **Anwesenheit bearbeiten** können sie zusätzlich [Anwesenheit erfassen](../attendance/recording-attendance.md) und Gäste hinzufügen, indem sie deren Namen suchen. Namen sind keine Links zu Personendatensätzen, und vertrauliche Gruppen bleiben verborgen, sofern die ehrenamtliche Person kein Mitglied ist.

B1 Admin blendet Links und Schaltflächen aus, für die einer Rolle die nötigen Berechtigungen fehlen. Die Liste **Alle Gruppen** ist zum Beispiel nur für Personen verfügbar, die Gruppen bearbeiten, Gruppenmitglieder anzeigen oder Personen anzeigen dürfen, oder die **Nur Namen von Personen anzeigen** zusammen mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** besitzen (alle anderen werden zum Dashboard zurückgeleitet). Die Einrichtung der Anwesenheit erscheint nur mit **Anwesenheit anzeigen** oder **Gottesdienste bearbeiten**. Die Schaltfläche **E-Mail** einer Gruppe erscheint nur für Personen mit **Gruppenmitglieder bearbeiten** (die Berechtigung, die zum Versenden von Gruppen-E-Mails nötig ist). Eine Gruppenliste zu drucken erfordert **Gruppenmitglieder anzeigen** oder die Leitung dieser Gruppe. Das Löschen eines Kalendertermins erfordert **Inhalte bearbeiten** (oder das Zurückziehen des eigenen ausstehenden Antrags).

:::warning
**Domain-Administratoren** haben vollen Zugriff auf alle Bereiche Ihres ChurchApps-Kontos. Ihre Berechtigungen können weder geändert noch eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre vertrauenswürdigsten Administratoren.
:::

:::tip
Erstellen Sie gezielte Rollen wie „Schatzmeister“ nur mit Zugriff auf **Spenden**, „Zählteam“ mit **Spenden erfassen** und **Spenden anzeigen** oder „Check-in-Ehrenamtliche“ nur mit Zugriff auf **Anwesenheit**. Das folgt dem Prinzip der minimalen Rechte und schützt Ihre Daten. Weitere Informationen dazu, wie ChurchApps Ihre Daten schützt, finden Sie unter [Datensicherheit](./data-security.md).
:::
