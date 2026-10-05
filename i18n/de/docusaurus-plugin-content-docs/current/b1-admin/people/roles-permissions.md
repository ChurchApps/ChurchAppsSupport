---
title: "Rollen zuweisen"
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem zur Kontrolle, was jeder Benutzer in Ihrem Team sehen und tun kann. Durch die Zuweisung von Rollen können Sie Mitarbeitern und Freiwilligen Zugriff auf genau die Bereiche gewähren, die sie benötigen -- und nichts mehr. Eine ordnungsgemäße Rollenverwaltung schützt Ihre Kirchendaten und ermöglicht Ihrem Team gleichzeitig effiziente Arbeit.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen **Domain-Administrator**-Zugriff oder eine Rolle mit Berechtigung zur Verwaltung von **Einstellungen** in B1 Admin.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis vorhanden sein. Weitere Informationen finden Sie unter [Personen hinzufügen](adding-people.md), falls Sie diese zuerst hinzufügen müssen.

</div>

## Rollen verstehen

Eine Rolle ist ein Satz von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Sie könnten beispielsweise eine Rolle „Finanzen" erstellen, die Zugriff auf [Spendendatensätze](../donations/recording-donations.md) gewährt, oder eine Rolle „Check-In-Freiwilliger", die nur Zugriff auf [Anwesenheitsfunktionen](../attendance/check-in.md) ermöglicht.

Jede Rolle kontrolliert den Zugriff auf bestimmte Bereiche von B1 Admin, einschließlich:

- **Personen** -- Anzeige und Bearbeitung von Mitgliederprofilen. Die Registerkarte „Notizen" in einem Personendatensatz erfordert **Personen bearbeiten**, und eine separate Berechtigung **Vertrauliche Notizen anzeigen** kontrolliert den Zugriff auf den Bereich „Vertrauliche Notizen" (für Seelsorge, persönliche Geschichte und ähnliche sensible Notizen).
- **Spenden** -- Verwaltung von Beiträgen und Finanzberichten
- **Anwesenheit** -- Aufzeichnung und Anzeige von Anwesenheitsdaten
- **Formulare** -- Erstellung und Verwaltung von [benutzerdefinierten Formularen](../forms/creating-forms.md)
- **Gruppen** -- Verwaltung von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** -- Konfiguration von kirchenweiten Einstellungen

:::warning
**Domain-Administratoren** haben vollständigen Zugriff auf jeden Bereich von B1 Admin. Ihre Berechtigungen können nicht bearbeitet oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre primären Administratoren.
:::

## Anzeige und Verwaltung von Rollen

1. Öffnen Sie das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und erweitern Sie **Einstellungen**.
2. Klicken Sie auf **Rollen**.
3. Ihnen wird eine Liste aller für Ihre Kirche konfigurierten Rollen angezeigt.
4. Klicken Sie auf eine beliebige Rolle, um ihre Mitglieder und Berechtigungen anzuzeigen.

## Benutzer zu einer Rolle hinzufügen

1. Wählen Sie im Jump-Menü **Einstellungen > Rollen** aus.
2. Klicken Sie auf die Rolle, zu der Sie einen Benutzer hinzufügen möchten.
3. Suchen Sie im Bereich **Mitglieder** nach der Person nach Name.
4. Klicken Sie auf **Hinzufügen**, um sie der Rolle zuzuweisen.

Der Benutzer hat nun beim nächsten Anmelden alle dieser Rolle zugeordneten Berechtigungen.

## Berechtigungen für Rollen bearbeiten

1. Wählen Sie im Jump-Menü **Einstellungen > Rollen** aus.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Aktivieren oder deaktivieren Sie im Bereich **Berechtigungen** die Bereiche, auf die die Rolle zugreifen soll.
4. Klicken Sie auf **Speichern**, um Ihre Änderungen anzuwenden.

:::tip
Folgen Sie dem Prinzip der geringsten Berechtigung -- gewähren Sie jeder Rolle nur die Berechtigungen, die sie wirklich benötigt. Dies schützt Ihre Daten und verringert die Gefahr versehentlicher Änderungen.
:::

## Häufige Rollenbeispiele

- **Büropersonal** -- Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleiter** -- Zugriff auf [Gruppen](../groups/creating-groups.md) nur
- **Check-In-Freiwillige** -- Zugriff auf [Anwesenheit](../attendance/check-in.md) nur
- **Finanzen-Team** -- Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
