---
title: "Standorte"
---

# Standorte

<div class="article-intro">

Wenn sich Ihre Kirche an mehr als einem Ort versammelt, ermöglichen **Standorte** die Zuordnung jeder Person und jeder Gruppe zu ihrem Standort. Sobald sie eingerichtet sind, erscheinen Standorte als Auswahlmöglichkeit in Personenprofilen, bei der Anwesenheitseinrichtung und im Demografie-Dashboard. Kirchen mit mehreren Standorten können in B1 Admin überall nach Standort filtern, suchen und berichten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten**, um Standorte zu verwalten. Siehe [Rollen & Berechtigungen](./roles-permissions.md).

</div>

## Standort-Einstellungen öffnen

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Einstellungen > Einstellungen** und klicken Sie in der linken Liste auf **Standorte**, um zum Abschnitt **Standorte** zu scrollen. Sie können auch direkt unter **/settings/campuses** dorthin gelangen. Sie sehen eine Liste aller eingerichteten Standorte mit Name, Ort und Zeitzone.

## Einen Standort hinzufügen

1. Klicken Sie auf **Standort hinzufügen**.
2. Geben Sie die Standortdaten ein:
   - **Name** *(Pflichtfeld)* -- der Anzeigename, der in B1 Admin überall erscheint (zum Beispiel „Hauptstandort“ oder „Nordstandort“).
   - **Adresse** -- die Straßenadresse des Standorts (dient nur zur Information; sie entspricht nicht der Hauptadresse Ihrer Kirche in den Kircheneinstellungen).
   - **Stadt / Bundesland / Postleitzahl** -- der Ort des Standorts.
   - **Zeitzone** -- die IANA-Zeitzone für diesen Standort (zum Beispiel *Europe/Berlin*). [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) für Gottesdienste an diesem Standort öffnen und schließen in dieser Zeitzone. Ist sie auf **Keine** gesetzt, wird stattdessen die [Zeitzone](./church-settings.md#time-zone) Ihrer Kirche verwendet. Nützlich, wenn Standorte in verschiedenen Zeitzonen liegen.
   - **Website** -- eine optionale URL für den eigenen Webauftritt dieses Standorts.
3. Klicken Sie auf **Speichern**.

## Einen Standort bearbeiten

Klicken Sie auf eine beliebige Standortzeile in der Liste, um deren Editor im Bereich rechts davon zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Speichern**.

## Einen Standort löschen

Öffnen Sie einen Standort zur Bearbeitung und klicken Sie auf **Löschen**. Sie werden um eine Bestätigung gebeten. Das Löschen eines Standorts entfernt die ihm zugeordneten Personen nicht – ihr Standortfeld wird einfach leer.

## Personen einem Standort zuordnen

Nachdem Sie Standorte angelegt haben, können Mitarbeitende eine Person über ihr Profil einem Standort zuordnen:

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie auf **Bearbeiten**.
3. Wählen Sie den Standort im Dropdown **Standort** aus.
4. Klicken Sie auf **Speichern**.

Sie können den Standort auch auf der Seite Personen für mehrere Personen gleichzeitig aktualisieren. Wählen Sie mehrere Personen aus, verwenden Sie **Massenbearbeitung** und setzen Sie das Feld Standort für alle auf einmal.

## Nach Standort filtern

Sobald Standorte eingerichtet sind, können Sie in B1 Admin überall nach Standort filtern:

- **Personensuche** -- fügen Sie in der erweiterten Suche eine Bedingung für den Standort hinzu oder laden Sie eine [gespeicherte Liste](../people/lists.md), die auf einen Standort beschränkt ist.
- **Demografie** -- das [Demografie-Dashboard](../people/demographics.md) zeigt ein Ringdiagramm für Standorte, sobald mindestens einer Person ein Standort zugewiesen ist.
- **Anwesenheitseinrichtung** -- jeder Gottesdienstzeitpunkt in der Anwesenheit kann einem Standort zugeordnet werden.

:::tip
Kirchen mit einem einzigen Standort müssen keine Standorte einrichten. Alle Standortfunktionen sind optional – gibt es keine Standorte, erscheinen Standortfelder und -diagramme einfach nicht.
:::

## Verwandte Artikel

- [Kircheneinstellungen](./church-settings.md) -- Ihre Hauptadresse und Ihr Erscheinungsbild (getrennt von den Standortadressen)
- [Demografie](../people/demographics.md) -- das Diagramm zur Aufschlüsselung nach Standort
- [Anwesenheitseinrichtung](../attendance/setup.md) -- Gottesdienstzeiten einem Standort zuordnen
- [Massenbearbeitung](../people/bulk-editing.md) -- vielen Personen auf einmal einen Standort zuweisen
