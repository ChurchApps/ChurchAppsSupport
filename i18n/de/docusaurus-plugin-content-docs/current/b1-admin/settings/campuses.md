---
title: "Standorte"
description: "Richten Sie in B1 Admin Standorte ein, um zu erfassen, zu welchem Ort jede Person und Gruppe gehört, und filtern Sie dann Personen, Anwesenheit und Demografie nach Standort."
---

# Standorte

<div class="article-intro">

Wenn sich Ihre Gemeinde an mehr als einem Ort versammelt, erlauben Ihnen **Standorte**, zu erfassen, zu welchem Ort jede Person und Gruppe gehört. Sobald Standorte eingerichtet sind, erscheinen sie als Option in Personenprofilen, bei der Einrichtung der Anwesenheit und im Demografie-Dashboard. Gemeinden mit mehreren Standorten können in ganz B1 Admin nach Standort filtern, suchen und berichten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten**, um Standorte zu verwalten. Siehe [Rollen und Berechtigungen](./roles-permissions.md).

</div>

## Die Standorteinstellungen öffnen {#opening-campus-settings}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Einstellungen > Einstellungen** und klicken Sie in der linken Liste auf **Standorte**, um zum Abschnitt **Standorte** zu scrollen. Sie gelangen auch direkt unter **/settings/campuses** dorthin. Sie sehen eine Liste aller eingerichteten Standorte mit Name, Ort und Zeitzone.

## Einen Standort hinzufügen {#adding-a-campus}

1. Klicken Sie auf **Standort hinzufügen**.
2. Füllen Sie die Angaben zum Standort aus:
   - **Name** *(erforderlich)* — der Anzeigename, der in ganz B1 Admin erscheint (zum Beispiel „Hauptstandort“ oder „Nordstandort“).
   - **Adresse** und **Adresszusatz** — die Straßenadresse des Standorts (dient der Information; sie entspricht nicht der Hauptadresse Ihrer Gemeinde in den Kircheneinstellungen).
   - **Ort / Bundesland / Postleitzahl** — der Standort.
   - **Zeitzone** — die IANA-Zeitzone für diesen Standort (zum Beispiel *America/Chicago*). [Check-in-Zeitpläne](../attendance/setup.md#setting-a-check-in-schedule) für Gottesdienste an diesem Standort öffnen und schließen in dieser Zeitzone. Steht das Feld auf **Keine**, wird stattdessen die [Zeitzone](./church-settings.md#time-zone) Ihrer Gemeinde verwendet. Nützlich, wenn Standorte in verschiedenen Zeitzonen liegen.
   - **Website** — eine optionale URL für den eigenen Webauftritt dieses Standorts.
3. Klicken Sie auf **Speichern**.

Die Liste zeigt für jeden Standort den **Namen**, den **Ort** (Stadt und Bundesland) und die **Zeitzone**; der Eintrag **Standorte** in der linken Liste zeigt, wie viele Orte Sie haben.

## Einen Standort bearbeiten {#editing-a-campus}

Klicken Sie in der Liste auf eine beliebige Standortzeile, um deren Editor im Bereich rechts zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Speichern**, oder auf **Abbrechen**, um den Editor ohne Speichern zu schließen.

## Einen Standort löschen {#deleting-a-campus}

Öffnen Sie einen Standort zur Bearbeitung und klicken Sie auf **Löschen**. Sie werden um eine Bestätigung gebeten. Das Löschen eines Standorts entfernt die ihm zugeordneten Personen nicht – deren Feld Standort wird einfach leer.

## Personen einem Standort zuordnen {#assigning-people-to-a-campus}

Nachdem Sie Standorte angelegt haben, können Mitarbeitende eine Person über deren Profil einem Standort zuordnen:

1. Öffnen Sie den Datensatz einer Person unter **Personen**.
2. Klicken Sie auf **Bearbeiten**.
3. Wählen Sie den Standort im Auswahlfeld **Standort**.
4. Klicken Sie auf **Speichern**.

Sie können den Standort auch auf der Seite Personen für mehrere Personen auf einmal aktualisieren. Wählen Sie mehrere Personen aus, verwenden Sie **Massenbearbeitung** und setzen Sie das Feld Standort für alle gleichzeitig.

## Nach Standort filtern {#filtering-by-campus}

Sobald Standorte eingerichtet sind, können Sie in ganz B1 Admin nach Standort filtern:

- **Personensuche** — fügen Sie in der erweiterten Suche eine Bedingung für den Standort hinzu oder laden Sie eine [gespeicherte Liste](../people/lists.md), die auf einen Standort beschränkt ist.
- **Demografie** — das [Demografie-Dashboard](../people/demographics.md) zeigt ein Ringdiagramm für Standorte, sobald mindestens einer Person ein Standort zugewiesen ist.
- **Einrichtung der Anwesenheit** — jede Gottesdienstzeit in der Anwesenheit kann einem Standort zugeordnet werden.

:::tip
Gemeinden mit einem einzigen Ort müssen Standorte nicht einrichten. Alle Standortfunktionen sind optional – gibt es keine Standorte, erscheinen die Felder und Diagramme für Standorte einfach nicht.
:::

## Verwandte Artikel {#related-articles}

- [Kircheneinstellungen](./church-settings.md) — die Hauptadresse und das Erscheinungsbild Ihrer Gemeinde (getrennt von den Adressen der Standorte)
- [Demografie](../people/demographics.md) — das Diagramm zur Aufschlüsselung nach Standort
- [Einrichtung der Anwesenheit](../attendance/setup.md) — Gottesdienstzeiten einem Standort zuordnen
- [Massenbearbeitung](../people/bulk-editing.md) — vielen Personen auf einmal einen Standort zuweisen
