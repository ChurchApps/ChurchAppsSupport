---
title: "Standorte"
---

# Standorte

<div class="article-intro">

Wenn sich Ihre Kirche an mehr als einem Ort versammelt, können Sie mit **Standorten** festhalten, zu welchem Standort jede Person und jede Gruppe gehört. Nach der Einrichtung erscheinen Standorte als Option in Personenprofilen, im Anwesenheits-Setup und im Demografie-Dashboard. Kirchen mit mehreren Standorten können in B1 Admin überall nach Standort filtern, suchen und berichten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten**, um Standorte zu verwalten. Siehe [Rollen & Berechtigungen](./roles-permissions.md).

</div>

## Standort-Einstellungen öffnen

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links), wählen Sie **Einstellungen > Einstellungen** und klicken Sie in der linken Liste auf **Standorte**, um zum Abschnitt **Standorte** zu gelangen. Sie erreichen ihn auch direkt unter **/settings/campuses**. Sie sehen eine Liste aller eingerichteten Standorte mit Name, Ort und Zeitzone.

## Einen Standort hinzufügen

1. Klicken Sie auf **Standort hinzufügen**.
2. Füllen Sie die Angaben zum Standort aus:
   - **Name** *(erforderlich)* – der Anzeigename, der in B1 Admin überall erscheint (zum Beispiel „Hauptstandort“ oder „Nordstandort“).
   - **Adresse** – die Straßenadresse des Standorts (dient nur zur Anzeige; sie ist nicht dasselbe wie die Hauptadresse Ihrer Kirche unter den Kircheneinstellungen).
   - **Ort / Bundesland / Postleitzahl** – der Ort des Standorts.
   - **Zeitzone** – die IANA-Zeitzone dieses Standorts (zum Beispiel *Europe/Berlin*). [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) für Gottesdienste an diesem Standort öffnen und schließen in dieser Zeitzone. Ist sie auf **Keine** gesetzt, wird stattdessen die [Zeitzone](./church-settings.md#time-zone) Ihrer Kirche verwendet. Das ist nützlich, wenn Standorte in verschiedenen Zeitzonen liegen.
   - **Website** – eine optionale URL für den eigenen Webauftritt dieses Standorts.
3. Klicken Sie auf **Speichern**.

## Einen Standort bearbeiten

Klicken Sie in der Liste auf eine beliebige Zeile eines Standorts, um dessen Editor im Bereich rechts zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Speichern**.

## Einen Standort löschen

Öffnen Sie einen Standort zum Bearbeiten und klicken Sie auf **Löschen**. Sie werden gebeten, dies zu bestätigen. Das Löschen eines Standorts entfernt die ihm zugewiesenen Personen nicht – deren Feld „Standort“ wird einfach leer.

## Personen einem Standort zuweisen

Nachdem Sie Standorte angelegt haben, können Mitarbeitende eine Person über ihr Profil einem Standort zuweisen:

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie auf **Bearbeiten**.
3. Wählen Sie im Auswahlmenü **Standort** den Standort aus.
4. Klicken Sie auf **Speichern**.

Sie können den Standort auch gesammelt auf der Seite Personen aktualisieren. Wählen Sie mehrere Personen aus, verwenden Sie **Massenbearbeitung** und setzen Sie das Feld Standort für alle auf einmal.

## Nach Standort filtern

Sobald Standorte eingerichtet sind, können Sie in B1 Admin nach Standort filtern:

- **Personensuche** – fügen Sie in der erweiterten Suche eine Bedingung für den Standort hinzu oder laden Sie eine [gespeicherte Liste](../people/lists.md), die auf einen Standort begrenzt ist.
- **Demografie** – das [Demografie-Dashboard](../people/demographics.md) zeigt ein Ringdiagramm für den Standort, sobald mindestens einer Person ein Standort zugewiesen ist.
- **Anwesenheits-Setup** – jede Gottesdienstzeit in der Anwesenheit kann einem Standort zugeordnet werden.

:::tip
Kirchen mit nur einem Standort müssen keine Standorte einrichten. Alle Funktionen für Standorte sind optional. Gibt es keine Standorte, erscheinen die Felder und Diagramme dafür einfach nicht.
:::

## Verwandte Artikel

- [Kircheneinstellungen](./church-settings.md) – Ihre Hauptadresse und Ihr Erscheinungsbild (getrennt von den Adressen der Standorte)
- [Demografie](../people/demographics.md) – das Diagramm zur Verteilung nach Standort
- [Anwesenheits-Setup](../attendance/setup.md) – Gottesdienstzeiten mit einem Standort verknüpfen
- [Massenbearbeitung](../people/bulk-editing.md) – vielen Personen gleichzeitig einen Standort zuweisen
