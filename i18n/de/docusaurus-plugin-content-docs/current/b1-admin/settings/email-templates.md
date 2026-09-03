---
title: "E-Mail-Vorlagen"
---

# E-Mail-Vorlagen

<div class="article-intro">

Mit E-Mail-Vorlagen können Sie wiederverwendbare E-Mail-Inhalte speichern — eine Willkommensnachricht, eine Ereigniserinnerung, eine Spendenauszeichnung — damit Sie (oder ein [Workflow](../serving/workflows.md)) sie mit einem Klick senden können, anstatt sie jedes Mal von Grund auf neu zu schreiben.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Sie benötigen Zugriff auf den Bereich Settings in B1 Admin.

</div>

## Zugriff auf E-Mail-Vorlagen

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Settings**.
2. Klicken Sie auf **Email Templates**.
3. Sie sehen eine Liste der vorhandenen Vorlagen mit ihrer Betreffzeile, Kategorie und dem zuletzt geänderten Datum.

## Erstellen einer Vorlage

1. Klicken Sie auf **New Template**.
2. Geben Sie einen **Template Name** ein, um ihn in der Liste zu identifizieren, und wählen Sie eine **Kategorie** (General, Events, Groups, Giving oder Welcome), um Ihre Vorlagen zu organisieren.
3. Geben Sie die Zeile **Subject** ein.
4. Schreiben Sie den **Body** mit dem Rich-Text-Editor.
5. Klicken Sie auf **Save**.

## Zusammenführungsfelder

Klicken Sie auf einen Zusammenführungsfeld-Chip oberhalb der Betreffzeile oder des Body, um ihn an Ihrer Cursor-Position einzufügen. Wenn die E-Mail gesendet wird, wird jedes Zusammenführungsfeld durch die tatsächlichen Informationen des Empfängers ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` — Der Name des Empfängers
- `{{email}}` — Die E-Mail-Adresse des Empfängers
- `{{churchName}}` — Der Name Ihrer Kirche

## Vorschau einer Vorlage

Klicken Sie auf **Preview**, um zu sehen, wie die Betreffzeile und der Body mit Beispieldaten aussehen werden, die für die Zusammenführungsfelder ausgefüllt sind, bevor Sie speichern oder senden.

## Verwenden einer Vorlage

Gespeicherte Vorlagen stehen zur Auswahl zur Verfügung, wenn Sie eine E-Mail an Personen oder eine Gruppe verfassen, und als Aktion in [Workflows](../serving/workflows.md).

## Bearbeiten und Löschen

Klicken Sie auf das Symbol **Edit** neben einer Vorlage, um sie zu aktualisieren, oder auf das Symbol **Delete**, um sie dauerhaft zu entfernen.

## Nächste Schritte

- [Workflows](../serving/workflows.md) — Trigger Sie automatisch eine Template-E-Mail basierend auf Regeln
