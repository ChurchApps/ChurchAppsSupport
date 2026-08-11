---
title: "Standorte"
---

# Standorte

<div class="article-intro">

Wenn Ihre Kirche sich an mehr als einem Ort trifft, ermöglichen **Standorte** es Ihnen, zu verfolgen, welcher Standort jede Person und Gruppe angehört. Nach der Konfiguration werden Standorte als Option auf Personenprofilen, in der Anwesenheit-Einrichtung und im Demografiedashboard angezeigt. Multi-Standort-Kirchen können nach Standort während B1 Admin filtern, suchen und berichten.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten**, um Standorte zu verwalten. Siehe [Rollen & Berechtigungen](./roles-permissions.md).

</div>

## Öffnen von Standort-Einstellungen

Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil), wählen Sie **Einstellungen** und wählen Sie **Standorte** aus der Navigationsleiste "Einstellungen". Sie sehen eine Liste aller konfigurierten Standorte mit ihrem Namen, Ort und Zeitzone.

## Hinzufügen eines Standorts

1. Klicken Sie auf **Standort hinzufügen** (oder die **+**-Schaltfläche, wenn noch keine Standorte vorhanden sind).
2. Füllen Sie die Standortdetails aus:
   - **Name** *(erforderlich)* -- der Anzeigename, der während B1 Admin angezeigt wird (z.B. "Hauptstandort" oder "Nordstandort").
   - **Adresse** -- die Straßenadresse des Standorts (verwendet für informative Anzeige; nicht die gleiche wie Ihre Hauptkirchenadresse in Kircheneinstellungen).
   - **Stadt / Bundesstaat / Postleitzahl** -- der Standortort.
   - **Zeitzone** -- die IANA-Zeitzone für diesen Standort (z.B. *America/Chicago*). Nützlich, wenn sich Standorte in verschiedenen Zeitzonen befinden.
   - **Website** -- eine optionale URL für den eigenen Online-Präsenz dieses Standorts.
3. Klicken Sie auf **Speichern**.

## Bearbeiten eines Standorts

Klicken Sie auf eine beliebige Standortreihe in der Liste, um seinen Editor im Panel auf der rechten Seite zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Speichern**.

## Löschen eines Standorts

Öffnen Sie einen Standort zur Bearbeitung und klicken Sie auf **Löschen**. Sie werden aufgefordert, zu bestätigen. Das Löschen eines Standorts entfernt nicht die Personen, die ihm zugewiesen sind -- ihr Standortfeld wird einfach leer.

## Zuweisen von Personen zu einem Standort

Nach dem Erstellen von Standorten können Mitarbeiter eine Person einem Standort aus ihrem Profil zuweisen:

1. Öffnen Sie einen Personendatensatz in **Personen**.
2. Klicken Sie auf **Bearbeiten**.
3. Wählen Sie den Standort aus dem **Standort**-Dropdown.
4. Klicken Sie auf **Speichern**.

Sie können den Standort auch in Massen aus der Seite "Personen" aktualisieren. Wählen Sie mehrere Personen, verwenden Sie **Massen-Bearbeitung** und stellen Sie das Standortfeld für alle gleichzeitig ein.

## Filtern nach Standort

Nachdem Standorte eingerichtet sind, können Sie über B1 Admin nach Standort filtern:

- **Personensuche** -- Fügen Sie eine Standortbedingung in der erweiterten Suche hinzu, oder laden Sie eine [gespeicherte Liste](../people/lists.md) mit Standort-Umfang.
- **Demografie** -- Das [Demografiedashboard](../people/demographics.md) zeigt ein Standort-Kuchen-Diagramm, wenn mindestens eine Person einen Standort zugewiesen hat.
- **Anwesenheit-Einrichtung** -- jede Dienstleistungszeit in der Anwesenheit kann an einen Standort gebunden sein.

:::tip
Single-Location-Kirchen müssen Standorte nicht konfigurieren. Alle Standort-Funktionen sind optional -- wenn keine Standorte vorhanden sind, erscheinen Standortfelder und Diagramme einfach nicht.
:::

## Verwandte Artikel

- [Kircheneinstellungen](./church-settings.md) -- Ihre Hauptkirchenadresse und Branding (separate von Standortadressen)
- [Demografie](../people/demographics.md) -- das Standort-Aufschlüsselungs-Diagramm
- [Anwesenheit-Einrichtung](../attendance/setup.md) -- Verbinden Sie Dienstleistungszeiten mit einem Standort
- [Massen-Bearbeitung](../people/bulk-editing.md) -- Weisen Sie den Standort vielen Personen gleichzeitig zu
