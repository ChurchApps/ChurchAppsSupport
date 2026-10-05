---
title: "Campuses"
---

# Campuses

<div class="article-intro">

Wenn Ihre Kirche sich an mehreren Orten trifft, können Sie mit **Campuses** verfolgen, welcher Standort für jede Person und Gruppe relevant ist. Nach der Konfiguration werden Campuses als Option auf Personenprofilen, im Attendance-Setup und im Demographics-Dashboard angezeigt. Multi-Site-Kirchen können in B1 Admin nach Campus filtern, suchen und berichten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Edit Church Settings**, um Campuses zu verwalten. Siehe [Rollen & Berechtigungen](./roles-permissions.md).

</div>

## Öffnen der Campus-Einstellungen

Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), wählen Sie **Settings > Settings** und wählen Sie die **Campuses**-Karte. Sie können auch direkt unter **/settings/campuses** dorthin gehen. Sie sehen eine Liste aller konfigurierten Campuses mit Name, Standort und Zeitzone.

## Einen Campus hinzufügen

1. Klicken Sie auf **Add Campus** (oder die **+**-Schaltfläche, wenn noch keine Campuses existieren).
2. Füllen Sie die Campus-Details aus:
   - **Name** *(erforderlich)* — der Anzeigename in B1 Admin (z. B. "Main Campus" oder "North Campus").
   - **Address** — die Straße des Campus (wird zur Information angezeigt; ist nicht dasselbe wie Ihre Hauptadresse der Kirche in Church Settings).
   - **City / State / Zip** — der Standort des Campus.
   - **Timezone** — die IANA-Zeitzone für diesen Campus (z. B. *America/Chicago*). Nützlich, wenn sich Campuses in verschiedenen Zeitzonen befinden.
   - **Website** — eine optionale URL für die eigene Web-Präsenz dieses Campus.
3. Klicken Sie auf **Save**.

## Einen Campus bearbeiten

Klicken Sie auf eine Campus-Zeile in der Liste, um den Editor im Fenster auf der rechten Seite zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Save**.

## Einen Campus löschen

Öffnen Sie einen Campus zur Bearbeitung und klicken Sie auf **Delete**. Sie werden aufgefordert, die Aktion zu bestätigen. Das Löschen eines Campus entfernt nicht die Personen, die ihm zugewiesen sind – ihr Campus-Feld wird einfach leer.

## Personen einem Campus zuweisen

Nach dem Erstellen von Campuses können Mitarbeiter eine Person einem Campus aus ihrem Profil zuweisen:

1. Öffnen Sie die Datei einer Person unter **People**.
2. Klicken Sie auf **Edit**.
3. Wählen Sie den Campus aus der **Campus**-Dropdown aus.
4. Klicken Sie auf **Save**.

Sie können auch den Campus von der Seite People in Bulk aktualisieren. Wählen Sie mehrere Personen aus, verwenden Sie **Bulk Edit** und stellen Sie das Campus-Feld für alle auf einmal ein.

## Nach Campus filtern

Nachdem Campuses eingerichtet sind, können Sie in B1 Admin nach Campus filtern:

- **People search** — fügen Sie eine Campus-Bedingung in der erweiterten Suche hinzu oder laden Sie eine [Saved List](../people/lists.md), die auf einen Campus begrenzt ist.
- **Demographics** — das [Demographics-Dashboard](../people/demographics.md) zeigt ein Campus-Donut-Diagramm, wenn mindestens eine Person einen Campus zugewiesen hat.
- **Attendance Setup** — jeder Service-Zeit im Attendance kann an einen Campus gebunden werden.

:::tip
Kirchen an einem einzigen Ort müssen Campuses nicht konfigurieren. Alle Campus-Funktionen sind optional – wenn keine Campuses existieren, werden Campus-Felder und Diagramme einfach nicht angezeigt.
:::

## Verwandte Artikel

- [Church Settings](./church-settings.md) — Ihre Hauptadresse der Kirche und Branding (getrennt von Campus-Adressen)
- [Demographics](../people/demographics.md) — das Campus-Aufschlüsselungsdiagramm
- [Attendance Setup](../attendance/setup.md) — Service-Zeiten an einen Campus binden
- [Bulk Editing](../people/bulk-editing.md) — Campus vielen Personen auf einmal zuweisen
