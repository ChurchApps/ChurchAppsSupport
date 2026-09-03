---
title: "Campuses"
---

# Campuses

<div class="article-intro">

Wenn sich Ihre Kirche an mehr als einem Ort trifft, ermöglichen **Campuses** es Ihnen zu verfolgen, welcher Standort jeder Person und Gruppe gehört. Nach der Konfiguration werden Campuses als Option in Personenprofilen, in der Anwesenheitseinrichtung und im Demographics-Dashboard angezeigt. Multi-Site-Kirchen können über B1 Admin nach Campus filtern, suchen und berichten.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Sie benötigen die Berechtigung **Edit Church Settings**, um Campuses zu verwalten. Siehe [Roles & Permissions](./roles-permissions.md).

</div>

## Öffnen der Campus-Einstellungen

Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil), wählen Sie **Settings** und wählen Sie **Campuses** in der Settings-Navigation. Sie sehen eine Liste aller konfigurierten Campuses mit ihrem Namen, Ort und Zeitzone.

## Hinzufügen eines Campus

1. Klicken Sie auf **Add Campus** (oder die Schaltfläche **+**, wenn noch keine Campuses vorhanden sind).
2. Füllen Sie die Campus-Details aus:
   - **Name** *(erforderlich)* — der Anzeigename, der in B1 Admin angezeigt wird (z. B. „Main Campus" oder „North Campus").
   - **Address** — die Straßenadresse des Campus (wird zu Informationszwecken verwendet; nicht identisch mit Ihrer Hauptkirchenadresse in Church Settings).
   - **City / State / Zip** — der Campus-Standort.
   - **Timezone** — die IANA-Zeitzone für diesen Campus (z. B. *America/Chicago*). Nützlich, wenn sich Campuses in verschiedenen Zeitzonen befinden.
   - **Website** — eine optionale URL für die eigene Webseite dieses Campus.
3. Klicken Sie auf **Save**.

## Bearbeiten eines Campus

Klicken Sie auf eine beliebige Campus-Zeile in der Liste, um seinen Editor im Bereich auf der rechten Seite zu öffnen. Aktualisieren Sie die Felder und klicken Sie auf **Save**.

## Löschen eines Campus

Öffnen Sie einen Campus zum Bearbeiten und klicken Sie auf **Delete**. Sie werden aufgefordert, zu bestätigen. Das Löschen eines Campus entfernt nicht die Personen, die ihm zugewiesen sind — ihr Campus-Feld wird einfach leer.

## Zuweisen von Personen zu einem Campus

Nach dem Erstellen von Campuses können Mitarbeiter eine Person einem Campus aus ihrem Profil zuweisen:

1. Öffnen Sie einen Personendatensatz in **People**.
2. Klicken Sie auf **Edit**.
3. Wählen Sie den Campus aus dem Dropdown **Campus**.
4. Klicken Sie auf **Save**.

Sie können auch den Campus in großen Mengen von der Personenseite aktualisieren. Wählen Sie mehrere Personen, verwenden Sie **Bulk Edit** und legen Sie das Feld Campus für alle auf einmal fest.

## Filtern nach Campus

Nach dem Einrichten von Campuses können Sie in B1 Admin nach Campus filtern:

- **People search** — fügen Sie eine Campus-Bedingung in der erweiterten Suche hinzu, oder laden Sie eine [Saved List](../people/lists.md), die auf einen Campus beschränkt ist.
- **Demographics** — das [Demographics dashboard](../people/demographics.md) zeigt ein Campus-Donut-Diagramm, wenn mindestens eine Person einem Campus zugewiesen hat.
- **Attendance Setup** — jede Servicezeit in Attendance kann an einen Campus gebunden werden.

:::tip
Einzelstandort-Kirchen müssen Campuses nicht konfigurieren. Alle Campus-Funktionen sind optional — wenn keine Campuses vorhanden sind, werden Campus-Felder und -Diagramme einfach nicht angezeigt.
:::

## Verwandte Artikel

- [Church Settings](./church-settings.md) — Ihre Hauptkirchenadresse und Branding (getrennt von Campus-Adressen)
- [Demographics](../people/demographics.md) — das Campus-Aufschlüsselungs-Diagramm
- [Attendance Setup](../attendance/setup.md) — verknüpfen Sie Servicezeiten mit einem Campus
- [Bulk Editing](../people/bulk-editing.md) — weisen Sie Campus vielen Personen auf einmal zu
