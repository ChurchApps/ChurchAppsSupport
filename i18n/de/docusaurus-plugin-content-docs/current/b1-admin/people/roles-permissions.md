---
title: "Rollen zuweisen"
description: "Weisen Sie in B1 Admin Rollen zu, damit Mitarbeitende und Ehrenamtliche nur auf die Bereiche für Personen, Spenden, Anwesenheit und Gruppen zugreifen, die sie benötigen."
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem, um festzulegen, was jeder Benutzer in Ihrem Team sehen und tun darf. Durch das Zuweisen von Rollen geben Sie Mitarbeitenden und Ehrenamtlichen Zugriff genau auf die Bereiche, die sie benötigen -- und nicht mehr. Eine saubere Rollenverwaltung schützt die Daten Ihrer Gemeinde und ermöglicht Ihrem Team effizientes Arbeiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen den Zugang **Domain-Administrator** oder eine Rolle mit der Berechtigung, **Einstellungen** in B1 Admin zu verwalten.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis vorhanden sein. Siehe [Personen hinzufügen](adding-people.md), falls Sie sie zuerst anlegen müssen.

</div>

## Rollen verstehen {#understanding-roles}

Eine Rolle ist eine Gruppe von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Sie könnten zum Beispiel eine Rolle „Finanzteam“ anlegen, die Zugriff auf [Spendenaufzeichnungen](../donations/recording-donations.md) gewährt, oder eine Rolle „Check-in-Ehrenamtliche“, die nur Zugriff auf [Anwesenheitsfunktionen](../attendance/check-in.md) erlaubt.

Jede Rolle steuert den Zugriff auf bestimmte Bereiche von B1 Admin, darunter:

- **Personen** -- Ansehen und Bearbeiten von Mitgliedsprofilen. Der Bereich Notizen eines Personendatensatzes erfordert **Personen bearbeiten**, und eine eigene Berechtigung **Vertrauliche Notizen ansehen** steuert den Zugriff auf den Bereich Vertrauliche Notizen (für Seelsorge, persönliche Hintergründe und ähnlich sensible Notizen). **Nur Namen der Personen ansehen** erlaubt jemandem, Personen anhand des Namens nachzuschlagen (es sind nur Name, Foto und Mitgliedschaftsstatus sichtbar), ohne Zugriff auf das vollständige Verzeichnis. In Verbindung mit **Anwesenheit ansehen** oder **Anwesenheit bearbeiten** kann ein Ehrenamtlicher **Gruppen** öffnen und Klasselisten nach Namen einsehen; mit **Anwesenheit bearbeiten** kann er außerdem [Anwesenheit erfassen](../attendance/recording-attendance.md). Siehe [Nur Namen der Personen](../settings/roles-permissions.md#people-names-only).
- **Spenden** -- Verwalten von Zuwendungen und Finanzberichten. **Spenden erfassen** ist eine engere Option für Zählteams: Sie erlaubt, Gaben einzutragen, aber nur in [Chargen](../donations/batches.md#who-can-change-a-batch), die noch offen sind.
- **Anwesenheit** -- Erfassen und Ansehen von Anwesenheitsdaten
- **Formulare** -- Erstellen und Verwalten von [eigenen Formularen](../forms/creating-forms.md)
- **Gruppen** -- Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** -- Konfigurieren gemeindeweiter Einstellungen

:::warning
**Domain-Administratoren** haben vollen Zugriff auf jeden Bereich von B1 Admin. Ihre Berechtigungen können nicht bearbeitet oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre wichtigsten Administrierenden.
:::

## Rollen anzeigen und verwalten {#viewing-and-managing-roles}

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Sie sehen eine Liste aller für Ihre Gemeinde eingerichteten Rollen, mit einer Spalte **Mitglieder**, die zeigt, wie viele Benutzer in jeder Rolle sind. Die Rolle **(Alle)** gilt für alle Benutzer.
4. Klicken Sie auf eine beliebige Rolle, um ihre Mitglieder und Berechtigungen zu sehen.

## Benutzer einer Rolle hinzufügen {#adding-users-to-a-role}

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, der Sie einen Benutzer hinzufügen möchten.
3. Klicken Sie im Abschnitt **Mitglieder** auf **Hinzufügen**.
4. Suchen Sie die Person nach Namen (oder wählen Sie sie aus **Zuletzt verwendete Personen**) und klicken Sie dann auf ihren Namen oder das Hinzufügen-Symbol daneben. Sie wird sofort der Rolle hinzugefügt.

Der Benutzer hat beim nächsten Anmelden alle Berechtigungen, die mit dieser Rolle verbunden sind.

## Berechtigungen einer Rolle bearbeiten {#editing-role-permissions}

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Klappen Sie im Abschnitt **Berechtigungen bearbeiten** eine Berechtigungsgruppe auf (etwa **Personen und Gruppen**, **Spenden** oder **Anwesenheit**) und setzen bzw. entfernen Sie die Häkchen bei den Berechtigungen, die die Rolle haben soll. Jede Gruppe zeigt, wie viele ihrer Berechtigungen angehakt sind (zum Beispiel **2 von 5**). Geben Sie unter **Berechtigungen filtern** einen Begriff ein, um eine Berechtigung nach Namen zu finden.
4. Jede Änderung wird gespeichert, sobald Sie ein Kästchen an- oder abhaken.

:::tip
Halten Sie sich an das Prinzip der minimalen Rechte -- geben Sie jeder Rolle nur die Berechtigungen, die sie wirklich braucht. So bleiben Ihre Daten sicher, und das Risiko versehentlicher Änderungen sinkt.
:::

## Typische Rollenbeispiele {#common-role-examples}

- **Büropersonal** -- Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleitende** -- nur Zugriff auf [Gruppen](../groups/creating-groups.md)
- **Check-in-Ehrenamtliche** -- die Anwesenheitsberechtigung **Checkin**, die das Konto benötigt, mit dem man sich an einem [Check-in-Terminal](../attendance/check-in.md) anmeldet
- **Finanzteam** -- Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
- **Zählteam** -- **Spenden erfassen** und **Spenden ansehen**, damit Ehrenamtliche die Kollekte in offene Chargen eintragen können, ohne Spendenübersichten zu sehen

Einen genaueren Blick auf die Berechtigungen für Spenden und Personen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
