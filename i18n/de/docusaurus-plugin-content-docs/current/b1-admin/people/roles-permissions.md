---
title: "Rollen zuweisen"
description: "Weisen Sie in B1 Admin Rollen zu, damit Mitarbeitende und Freiwillige nur auf die Bereiche für Personen, Spenden, Anwesenheit und Gruppen zugreifen, die sie benötigen."
---

# Rollen zuweisen

<div class="article-intro">

B1 Admin verwendet ein rollenbasiertes Berechtigungssystem, um festzulegen, was jeder Benutzer in Ihrem Team sehen und tun darf. Indem Sie Rollen zuweisen, geben Sie Mitarbeitenden und Ehrenamtlichen genau Zugriff auf die Bereiche, die sie brauchen – und nicht mehr. Eine saubere Verwaltung der Rollen schützt die Daten Ihrer Kirche und ermöglicht Ihrem Team effizientes Arbeiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen den Zugriff **Domänenadministrator** oder eine Rolle mit der Berechtigung, **Einstellungen** in B1 Admin zu verwalten.
- Die Personen, denen Sie Rollen zuweisen möchten, müssen bereits in Ihrem Verzeichnis stehen. Siehe [Personen hinzufügen](adding-people.md), falls Sie sie zuerst anlegen müssen.

</div>

## Rollen verstehen

Eine Rolle ist eine Gruppe von Berechtigungen, die Sie einem oder mehreren Benutzern zuweisen. Sie könnten zum Beispiel eine Rolle „Finanzteam“ anlegen, die Zugriff auf [Spendenaufzeichnungen](../donations/recording-donations.md) gewährt, oder eine Rolle „Check-in-Ehrenamtliche“, die nur Zugriff auf die [Anwesenheitsfunktionen](../attendance/check-in.md) erlaubt.

Jede Rolle steuert den Zugriff auf bestimmte Bereiche von B1 Admin, darunter:

- **Personen** – Anzeigen und Bearbeiten von Mitgliederprofilen. Der Bereich Notizen eines Personendatensatzes erfordert **Personen bearbeiten**; eine eigene Berechtigung **Vertrauliche Notizen anzeigen** steuert den Zugriff auf den Bereich Vertrauliche Notizen (für Seelsorge, persönliche Geschichte und ähnlich sensible Notizen). **Nur Namen von Personen anzeigen** erlaubt es, Personen nur über ihren Namen nachzuschlagen (es sind nur Name, Foto und Mitgliedsstatus sichtbar), ohne Zugriff auf das vollständige Verzeichnis. In Kombination mit **Anwesenheit anzeigen** oder **Anwesenheit bearbeiten** kann eine ehrenamtliche Person **Gruppen** öffnen und Klassenlisten nach Namen einsehen; mit **Anwesenheit bearbeiten** kann sie außerdem [Anwesenheit erfassen](../attendance/recording-attendance.md). Siehe [Nur Namen von Personen](../settings/roles-permissions.md#people-names-only).
- **Spenden** – Verwaltung von Zuwendungen und Finanzberichten. **Spenden erfassen** ist eine engere Option für Zählteams: Sie erlaubt es, Gaben zu erfassen, aber nur in [Stapeln](../donations/batches.md#who-can-change-a-batch), die noch offen sind.
- **Anwesenheit** – Erfassen und Anzeigen von Anwesenheitsdaten
- **Formulare** – Erstellen und Verwalten von [eigenen Formularen](../forms/creating-forms.md)
- **Gruppen** – Verwalten von [Gruppenmitgliedschaften](../groups/group-members.md) und Kalendern
- **Einstellungen** – Konfiguration der kirchenweiten Einstellungen

:::warning
**Domänenadministratoren** haben vollen Zugriff auf jeden Bereich von B1 Admin. Ihre Berechtigungen können nicht bearbeitet oder eingeschränkt werden. Verwenden Sie diese Rolle nur für Ihre wichtigsten Administratoren.
:::

## Rollen anzeigen und verwalten

1. Öffnen Sie das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links in B1 Admin) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **Rollen**.
3. Sie sehen eine Liste aller für Ihre Kirche eingerichteten Rollen mit einer Spalte **Mitglieder**, die zeigt, wie viele Benutzer in jeder Rolle sind.
4. Klicken Sie auf eine beliebige Rolle, um deren Mitglieder und Berechtigungen zu sehen.

## Benutzer einer Rolle hinzufügen

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, der Sie einen Benutzer hinzufügen möchten.
3. Suchen Sie im Abschnitt **Mitglieder** die Person nach Namen.
4. Klicken Sie auf **Hinzufügen**, um sie der Rolle zuzuweisen.

Der Benutzer hat bei seiner nächsten Anmeldung alle Berechtigungen dieser Rolle.

## Berechtigungen einer Rolle bearbeiten

1. Wählen Sie im Sprungmenü **Einstellungen > Rollen**.
2. Klicken Sie auf die Rolle, die Sie ändern möchten.
3. Aktivieren oder deaktivieren Sie im Abschnitt **Berechtigungen** die Bereiche, auf die die Rolle zugreifen soll. Jede Berechtigungsgruppe zeigt, wie viele ihrer Berechtigungen aktiviert sind (zum Beispiel **2 von 5**).
4. Jede Änderung wird sofort gespeichert, sobald Sie ein Kästchen aktivieren oder deaktivieren.

:::tip
Folgen Sie dem Prinzip der minimalen Rechte – geben Sie jeder Rolle nur die Berechtigungen, die sie wirklich braucht. Das schützt Ihre Daten und verringert das Risiko versehentlicher Änderungen.
:::

## Übliche Rollenbeispiele

- **Büropersonal** – Zugriff auf Personen, Spenden, Anwesenheit und Formulare
- **Gruppenleitende** – Zugriff nur auf [Gruppen](../groups/creating-groups.md)
- **Check-in-Ehrenamtliche** – die Berechtigung **Checkin** für Anwesenheit, die das Konto benötigt, mit dem man sich an einem [Check-in-Kiosk](../attendance/check-in.md) anmeldet
- **Finanzteam** – Zugriff auf [Spenden](../donations/recording-donations.md) und Berichte
- **Zählteam** – **Spenden erfassen** und **Spenden anzeigen**, damit Ehrenamtliche die Kollekte in offene Stapel eintragen können, ohne Spendenübersichten zu sehen

Einen genaueren Blick auf die Berechtigungen für Spenden und Personen finden Sie unter [Rollen & Berechtigungen](../settings/roles-permissions.md).
