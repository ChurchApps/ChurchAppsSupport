---
title: "Rollen zuweisen"
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem, um zu steuern, was jeder Benutzer in Ihrem Team sehen und tun kann. Indem Sie Rollen zuweisen, können Sie Mitarbeitenden und Freiwilligen genau den Zugriff auf die Bereiche geben, den sie brauchen -- und nicht mehr. Eine saubere Rollenverwaltung schützt die Daten Ihrer Kirche und unterstützt Ihr Team dabei, effizient zu arbeiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Rolle **Domain-Admin** oder eine Rolle mit der Berechtigung, **Einstellungen** in B1 Admin zu verwalten.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis existieren. Siehe [Personen hinzufügen](adding-people.md), wenn Sie sie zuerst anlegen müssen.

</div>

## Rollen verstehen

Eine Rolle ist eine Sammlung von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Sie könnten zum Beispiel eine Rolle "Finanzteam" anlegen, die Zugriff auf [Spendenaufzeichnungen](../donations/recording-donations.md) gewährt, oder eine Rolle "Check-in-Freiwillige", die nur Zugriff auf [Anwesenheitsfunktionen](../attendance/check-in.md) erlaubt.

Jede Rolle steuert den Zugriff auf bestimmte Bereiche von B1 Admin, darunter:

- **Personen** -- Ansehen und Bearbeiten von Mitgliederprofilen. Der Bereich Notizen eines Personendatensatzes erfordert **Personen bearbeiten**, und eine eigene Berechtigung **Vertrauliche Notizen ansehen** steuert den Zugriff auf den Bereich Vertrauliche Notizen (für Seelsorge, persönliche Vorgeschichte und ähnlich sensible Notizen). **Nur Namen von Personen ansehen** erlaubt es, Personen anhand ihres Namens nachzuschlagen (es sind dann nur Name, Foto und Mitgliedsstatus sichtbar), ohne Zugriff auf das vollständige Verzeichnis. In Kombination mit **Anwesenheit ansehen** oder **Anwesenheit bearbeiten** können Freiwillige die **Gruppen** öffnen und Klassenlisten nach Namen einsehen; mit **Anwesenheit bearbeiten** können sie außerdem [Anwesenheit erfassen](../attendance/recording-attendance.md). Siehe [Nur Namen von Personen](../settings/roles-permissions.md#people-names-only).
- **Spenden** -- Verwaltung von Gaben und Finanzberichten. **Spenden erfassen** ist eine engere Option für Zählteams: Sie erlaubt es, Gaben einzutragen, aber nur in [Stapeln](../donations/batches.md#who-can-change-a-batch), die noch offen sind.
- **Anwesenheit** -- Erfassen und Ansehen von Anwesenheitsdaten
- **Formulare** -- Erstellen und Verwalten von [benutzerdefinierten Formularen](../forms/creating-forms.md)
- **Gruppen** -- Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** -- Konfigurieren kircheninterner Einstellungen

:::warning
**Domain-Admins** haben vollen Zugriff auf jeden Bereich von B1 Admin. Ihre Berechtigungen lassen sich nicht bearbeiten oder einschränken. Verwenden Sie diese Rolle nur für Ihre wichtigsten Administratoren.
:::

## Rollen anzeigen und verwalten

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links in B1 Admin) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Sie sehen eine Liste aller für Ihre Kirche eingerichteten Rollen, mit einer Spalte **Mitglieder**, die zeigt, wie viele Benutzer in jeder Rolle sind.
4. Klicken Sie auf eine beliebige Rolle, um ihre Mitglieder und Berechtigungen zu sehen.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, der Sie einen Benutzer hinzufügen möchten.
3. Suchen Sie im Bereich **Mitglieder** die Person über ihren Namen.
4. Klicken Sie auf **Hinzufügen**, um sie der Rolle zuzuweisen.

Der Benutzer hat beim nächsten Anmelden alle Berechtigungen, die mit dieser Rolle verbunden sind.

## Berechtigungen einer Rolle bearbeiten

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Markieren oder entfernen Sie im Bereich **Berechtigungen** die Bereiche, auf die die Rolle zugreifen soll. Jede Berechtigungsgruppe zeigt an, wie viele ihrer Berechtigungen markiert sind (zum Beispiel **2 von 5**).
4. Jede Änderung wird sofort gespeichert, sobald Sie ein Kästchen markieren oder die Markierung entfernen.

:::tip
Halten Sie sich an das Prinzip der minimalen Rechte -- geben Sie jeder Rolle nur die Berechtigungen, die sie wirklich braucht. So bleiben Ihre Daten sicher, und die Gefahr versehentlicher Änderungen sinkt.
:::

## Gängige Beispiele für Rollen

- **Büroteam** -- Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleitende** -- Zugriff nur auf [Gruppen](../groups/creating-groups.md)
- **Check-in-Freiwillige** -- Zugriff nur auf [Anwesenheit](../attendance/check-in.md)
- **Finanzteam** -- Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
- **Zählteam** -- **Spenden erfassen** und **Spenden ansehen**, damit Freiwillige die Kollekte in offene Stapel eintragen können, ohne Spendenübersichten zu sehen

Eine genauere Betrachtung der Berechtigungen für Spenden und Personen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
