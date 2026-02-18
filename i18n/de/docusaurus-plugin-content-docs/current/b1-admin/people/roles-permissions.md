---
title: "Rollen zuweisen"
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem, um zu steuern, was jeder Benutzer in Ihrem Team sehen und tun kann. Durch die Zuweisung von Rollen können Sie Mitarbeitern und Ehrenamtlichen genau den Zugang geben, den sie benötigen -- und nicht mehr. Eine ordnungsgemäße Rollenverwaltung hält Ihre Gemeindedaten sicher und ermöglicht gleichzeitig Ihrem Team, effizient zu arbeiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen **Domain Admin**-Zugang oder eine Rolle mit Berechtigung zur Verwaltung der **Einstellungen** in B1 Admin.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis vorhanden sein. Siehe [Personen hinzufügen](adding-people.md), falls Sie sie zuerst hinzufügen müssen.

</div>

## Rollen verstehen

Eine Rolle ist eine Sammlung von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Zum Beispiel könnten Sie eine Rolle „Finanzteam" erstellen, die Zugriff auf [Spendenaufzeichnungen](../donations/recording-donations.md) gewährt, oder eine Rolle „Check-in-Ehrenamtlicher", die nur Zugriff auf [Anwesenheitsfunktionen](../attendance/check-in.md) erlaubt.

Jede Rolle steuert den Zugriff auf bestimmte Bereiche von B1 Admin, darunter:

- **Personen** -- Anzeigen und Bearbeiten von Mitgliederprofilen
- **Spenden** -- Verwaltung von Spenden und Finanzberichten
- **Anwesenheit** -- Erfassung und Anzeige von Anwesenheitsdaten
- **Formulare** -- Erstellen und Verwalten [benutzerdefinierter Formulare](../forms/creating-forms.md)
- **Gruppen** -- Verwaltung von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** -- Konfiguration gemeindeweiter Einstellungen

:::warning
**Domain Admins** haben vollen Zugriff auf alle Bereiche von B1 Admin. Ihre Berechtigungen können nicht bearbeitet oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre primären Administratoren.
:::

## Rollen anzeigen und verwalten

1. Klicken Sie in der linken Seitenleiste auf **Einstellungen**.
2. Klicken Sie in der oberen Navigation auf **Rollen**.
3. Sie sehen eine Liste aller für Ihre Gemeinde konfigurierten Rollen.
4. Klicken Sie auf eine beliebige Rolle, um ihre Mitglieder und Berechtigungen anzuzeigen.

## Benutzer einer Rolle hinzufügen

1. Navigieren Sie zu **Einstellungen** und dann **Rollen**.
2. Klicken Sie auf die Rolle, der Sie einen Benutzer hinzufügen möchten.
3. Suchen Sie im Bereich **Mitglieder** nach dem Namen der Person.
4. Klicken Sie auf **Hinzufügen**, um sie der Rolle zuzuweisen.

Der Benutzer hat nun alle mit dieser Rolle verbundenen Berechtigungen bei der nächsten Anmeldung.

## Rollenberechtigungen bearbeiten

1. Navigieren Sie zu **Einstellungen** und dann **Rollen**.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Aktivieren oder deaktivieren Sie im Bereich **Berechtigungen** die Bereiche, auf die die Rolle zugreifen soll.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

:::tip
Folgen Sie dem Prinzip der geringsten Berechtigung -- geben Sie jeder Rolle nur die Berechtigungen, die sie wirklich braucht. Dies hält Ihre Daten sicher und reduziert die Gefahr versehentlicher Änderungen.
:::

## Häufige Rollenbeispiele

- **Büropersonal** -- Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleiter** -- Zugriff nur auf [Gruppen](../groups/creating-groups.md)
- **Check-in-Ehrenamtliche** -- Zugriff nur auf [Anwesenheit](../attendance/check-in.md)
- **Finanzteam** -- Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
