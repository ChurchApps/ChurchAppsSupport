---
title: "Rollen zuweisen"
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem, um zu steuern, was jeder Benutzer in Ihrem Team sehen und tun kann. Indem Sie Rollen zuweisen, können Sie Mitarbeitern und Ehrenamtlichen genau Zugriff auf die Bereiche geben, die sie brauchen -- und nicht mehr. Eine sorgfältige Rollenverwaltung schützt die Daten Ihrer Kirche und ermöglicht Ihrem Team, effizient zu arbeiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen den Zugriff **Domain-Administrator** oder eine Rolle mit der Berechtigung, **Einstellungen** in B1 Admin zu verwalten.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis vorhanden sein. Falls Sie sie zuerst hinzufügen müssen, siehe [Personen hinzufügen](adding-people.md).

</div>

## Rollen verstehen

Eine Rolle ist eine Gruppe von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Sie könnten zum Beispiel eine Rolle „Finanzteam“ anlegen, die Zugriff auf die [Spendenaufzeichnungen](../donations/recording-donations.md) gewährt, oder eine Rolle „Check-in-Ehrenamt“, die nur Zugriff auf die [Anwesenheitsfunktionen](../attendance/check-in.md) erlaubt.

Jede Rolle steuert den Zugriff auf bestimmte Bereiche von B1 Admin, darunter:

- **Personen** -- Ansehen und Bearbeiten von Mitgliedsprofilen. Der Abschnitt Notizen eines Personendatensatzes erfordert **Personen bearbeiten**, und eine eigene Berechtigung **Vertrauliche Notizen anzeigen** steuert den Zugriff auf den Bereich Vertrauliche Notizen (für Seelsorge, persönliche Vorgeschichte und ähnlich sensible Notizen). **Nur Personennamen anzeigen** erlaubt es, Personen anhand ihres Namens nachzuschlagen (es werden nur Name, Foto und Mitgliedschaftsstatus angezeigt), ohne Zugriff auf das vollständige Verzeichnis.
- **Spenden** -- Verwalten von Zuwendungen und Finanzberichten. **Spenden erfassen** ist eine engere Option für Zählteams: Sie erlaubt, Gaben zu erfassen, aber nur in [Stapeln](../donations/batches.md#who-can-change-a-batch), die noch geöffnet sind.
- **Anwesenheit** -- Erfassen und Ansehen von Anwesenheitsdaten
- **Formulare** -- Erstellen und Verwalten von [benutzerdefinierten Formularen](../forms/creating-forms.md)
- **Gruppen** -- Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** -- Konfigurieren kirchenweiter Einstellungen

:::warning
**Domain-Administratoren** haben vollen Zugriff auf jeden Bereich von B1 Admin. Ihre Berechtigungen können nicht bearbeitet oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre wichtigsten Administratoren.
:::

## Rollen anzeigen und verwalten

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Sie sehen eine Liste aller für Ihre Kirche eingerichteten Rollen.
4. Klicken Sie auf eine beliebige Rolle, um ihre Mitglieder und Berechtigungen anzuzeigen.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, der Sie einen Benutzer hinzufügen möchten.
3. Suchen Sie im Abschnitt **Mitglieder** die Person über ihren Namen.
4. Klicken Sie auf **Hinzufügen**, um sie der Rolle zuzuweisen.

Der Benutzer hat beim nächsten Anmelden alle Berechtigungen, die mit dieser Rolle verbunden sind.

## Rollenberechtigungen bearbeiten

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Aktivieren oder deaktivieren Sie im Abschnitt **Berechtigungen** die Bereiche, auf die die Rolle Zugriff haben soll.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

:::tip
Folgen Sie dem Prinzip der geringsten Berechtigung -- geben Sie jeder Rolle nur die Berechtigungen, die sie wirklich braucht. So bleiben Ihre Daten sicher und die Gefahr versehentlicher Änderungen sinkt.
:::

## Häufige Rollenbeispiele

- **Büropersonal** -- Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleiter** -- Zugriff nur auf [Gruppen](../groups/creating-groups.md)
- **Check-in-Ehrenamtliche** -- Zugriff nur auf [Anwesenheit](../attendance/check-in.md)
- **Finanzteam** -- Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
- **Zählteam** -- **Spenden erfassen** und **Spenden anzeigen**, damit Ehrenamtliche die Kollekte in offene Stapel eintragen können, ohne Spendenübersichten zu sehen

Einen genaueren Blick auf die Berechtigungen für Spenden und Personen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
