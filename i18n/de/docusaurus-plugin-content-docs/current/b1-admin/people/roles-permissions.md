---
title: "Rollen zuweisen"
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem, um zu kontrollieren, was jeder Benutzer in Ihrem Team sehen und tun kann. Durch das Zuweisen von Rollen können Sie dem Personal und den Freiwilligen Zugriff auf genau die Bereiche geben, die sie benötigen -- und nichts mehr. Eine angemessene Rollenverwaltung schützt Ihre Kirchendaten, während sie Ihrem Team ermöglicht, effizient zu arbeiten.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen **Domain Admin**-Zugriff oder eine Rolle mit Berechtigung zur Verwaltung von **Einstellungen** in B1 Admin.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis vorhanden sein. Siehe [Personen hinzufügen](adding-people.md), wenn Sie sie zuerst hinzufügen müssen.

</div>

## Verstehen von Rollen

Eine Rolle ist eine Reihe von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Zum Beispiel können Sie eine "Finanzteam"-Rolle erstellen, die Zugriff auf [Spendendatensätze](../donations/recording-donations.md) gewährt, oder eine "Check-In-Freiwilliger"-Rolle, die nur Zugriff auf [Anwesenheitsfunktionen](../attendance/check-in.md) erlaubt.

Jede Rolle kontrolliert den Zugriff auf bestimmte Bereiche von B1 Admin, einschließlich:

- **Personen** -- Anzeigen und Bearbeiten von Personenprofilen. Die Registerkarte "Notizen" auf einem Personendatensatz erfordert **Personen bearbeiten**, und eine separate Berechtigung **Vertrauliche Notizen anzeigen** kontrolliert den Zugriff auf den Abschnitt Vertrauliche Notizen (für pastorale Sorge, Personalgeschichte und ähnlich sensible Notizen).
- **Spenden** -- Verwaltung von Beiträgen und Finanzberichte
- **Anwesenheit** -- Aufzeichnung und Anzeige von Anwesenheitsdaten
- **Formulare** -- Erstellen und Verwalten von [benutzerdefinierten Formularen](../forms/creating-forms.md)
- **Gruppen** -- Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** -- Konfiguration von kirchenweiten Einstellungen

:::warning
**Domain Admins** haben vollständigen Zugriff auf jeden Bereich von B1 Admin. Ihre Berechtigungen können nicht bearbeitet oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre primären Administratoren.
:::

## Anzeigen und Verwalten von Rollen

1. Öffnen Sie das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
2. Klicken Sie auf **Rollen** in der oberen Navigation.
3. Sie sehen eine Liste aller für Ihre Kirche konfigurierten Rollen.
4. Klicken Sie auf eine beliebige Rolle, um ihre Mitglieder und Berechtigungen anzuzeigen.

## Benutzer zu einer Rolle hinzufügen

1. Navigieren Sie zu **Einstellungen** dann **Rollen**.
2. Klicken Sie auf die Rolle, der Sie einen Benutzer hinzufügen möchten.
3. Suchen Sie in der **Mitglieder**-Sektion nach der Person nach Name.
4. Klicken Sie auf **Hinzufügen**, um sie der Rolle zuzuweisen.

Der Benutzer wird ab der nächsten Anmeldung alle der Rolle zugeordneten Berechtigungen haben.

## Bearbeiten von Rollenberechtigungen

1. Navigieren Sie zu **Einstellungen** dann **Rollen**.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Aktivieren oder deaktivieren Sie in der **Berechtigungen**-Sektion die Bereiche, auf die die Rolle zugreifen soll.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen zu übernehmen.

:::tip
Befolgen Sie das Prinzip der geringsten Berechtigung -- geben Sie jeder Rolle nur die Berechtigungen, die sie wirklich benötigt. Dies schützt Ihre Daten und reduziert die Chance von versehentlichen Änderungen.
:::

## Beispiele für häufige Rollen

- **Büropersonal** -- Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleiter** -- Zugriff auf [Gruppen](../groups/creating-groups.md) nur
- **Check-In-Freiwillige** -- Zugriff auf [Anwesenheit](../attendance/check-in.md) nur
- **Finanzbegriff** -- Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
