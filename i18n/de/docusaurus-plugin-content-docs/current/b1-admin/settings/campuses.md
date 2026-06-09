---
title: "Standorte"
---

# Standorte

<div class="article-intro">

Wenn sich Ihre Kirche an mehr als einem Ort trifft, ermöglichen **Standorte** es Ihnen, zu verfolgen, welcher Standort zu jeder Person und Gruppe gehört. Nach der Konfiguration erscheinen Standorte als Option auf Personenprofilen, in der Anwesenheits-Einrichtung und im Demografie-Dashboard. Kirchen mit mehreren Standorten können in B1 Admin nach Standort filtern, suchen und Berichte erstellen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten**, um Standorte zu verwalten. Weitere Informationen finden Sie unter [Rollen & Berechtigungen](./roles-permissions.md).

</div>

## Öffnen Sie die Standort-Einstellungen

Gehen Sie in B1 Admin zu **Einstellungen** in der linken Seitenleiste und wählen Sie **Standorte** aus der Navigationsleiste Einstellungen aus. Sie sehen eine Liste aller konfigurierten Standorte mit ihrem Namen, Ort und Zeitzone.

## Einen Standort hinzufügen

1. Klicken Sie auf **Standort hinzufügen** (oder die Schaltfläche **+**, wenn noch keine Standorte vorhanden sind).
2. Füllen Sie die Standort-Details aus:
   - **Name** *(erforderlich)* — der in B1 Admin angezeigte Name (z. B. „Haupt-Standort" oder „Nord-Standort").
   - **Adresse** – die Straßenadresse des Standorts (verwendet für informative Anzeige; nicht die gleiche wie Ihre Haupt-Kirchenadresse in Kircheneinstellungen).
   - **Stadt / Bundesland / PLZ** – der Standort des Standorts.
   - **Zeitzone** – die IANA-Zeitzone für diesen Standort (z. B. *Europe/Berlin*). Nützlich, wenn Standorte in verschiedenen Zeitzonen sind.
   - **Website** – eine optionale URL für die eigene Webpräsenz dieses Standorts.
3. Klicken Sie auf **Speichern**.

## Bearbeiten Sie einen Standort

Klicken Sie auf eine beliebige Standort-Reihe in der Liste, um seinen Editor im Bereich rechts zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Speichern**.

## Löschen Sie einen Standort

Öffnen Sie einen Standort zum Bearbeiten und klicken Sie auf **Löschen**. Sie werden aufgefordert zu bestätigen. Das Löschen eines Standorts entfernt nicht die Personen, die ihm zugewiesen sind – ihr Standort-Feld wird einfach leer.

## Weisen Sie Personen einem Standort zu

Nach dem Erstellen von Standorten können Mitarbeiter eine Person von ihrem Profil aus einem Standort zuweisen:

1. Öffnen Sie eine Personendatei unter **Personen**.
2. Klicken Sie auf **Bearbeiten**.
3. Wählen Sie den Standort aus dem Dropdown **Standort** aus.
4. Klicken Sie auf **Speichern**.

Sie können den Standort auch in Massen aktualisieren von der Seite Personen aus. Wählen Sie mehrere Personen aus, verwenden Sie **Massen-Bearbeitung**, und setzen Sie das Standort-Feld für alle auf einmal.

## Filtern nach Standort

Sobald Standorte eingerichtet sind, können Sie in B1 Admin nach Standort filtern:

- **Personensuche** – fügen Sie eine Standort-Bedingung in der erweiterten Suche hinzu, oder laden Sie eine [Gespeicherte Liste](../people/lists.md), die auf einen Standort begrenzt ist.
- **Demografie** – das [Demografie-Dashboard](../people/demographics.md) zeigt ein Standort-Ringdiagramm an, wenn mindestens eine Person einem Standort zugewiesen ist.
- **Anwesenheits-Einrichtung** – jede Gottesdienstzeit in Anwesenheit kann an einen Standort gebunden sein.

:::tip
Kirchen mit einem Standort müssen keine Standorte konfigurieren. Alle Standort-Funktionen sind optional – wenn es keine Standorte gibt, erscheinen Standort-Felder und Diagramme einfach nicht.
:::

## Verwandte Artikel

- [Kircheneinstellungen](./church-settings.md) – Ihre Haupt-Kirchenadresse und das Branding (getrennt von Standort-Adressen)
- [Demografie](../people/demographics.md) – die Standort-Aufschlüsselung Diagramm
- [Anwesenheits-Einrichtung](../attendance/setup.md) – verknüpfen Sie Gottesdienstzeiten mit einem Standort
- [Massen-Bearbeitung](../people/bulk-editing.md) – weisen Sie vielen Personen auf einmal Standort zu
