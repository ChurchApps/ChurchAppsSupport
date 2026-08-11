---
title: "E-Mail-Vorlagen"
---

# E-Mail-Vorlagen

<div class="article-intro">

E-Mail-Vorlagen ermöglichen es Ihnen, wiederverwendbare E-Mail-Inhalte zu speichern -- eine Willkommensnachricht, eine Veranstaltungserinnerung, eine Spendendanksagung -- sodass Sie (oder ein [Arbeitsablauf](../serving/workflows.md)) es mit einem Klick senden können, anstatt es jedes Mal von Grund auf zu schreiben.

</div>

<div class="prereqs">
<h4>Voraussetzungen</h4>

- Sie benötigen Zugriff auf den Einstellungen-Bereich in B1 Admin.

</div>

## Zugriff auf E-Mail-Vorlagen

1. Öffnen Sie in B1 Admin das **Bereichsmenü** in der oberen linken Ecke (der Bereichsname mit dem kleinen Pfeil) und wählen Sie **Einstellungen**.
2. Klicken Sie auf **E-Mail-Vorlagen**.
3. Sie sehen eine Liste der vorhandenen Vorlagen mit ihrem Betreff, der Kategorie und dem letzten Änderungsdatum.

## Erstellen einer Vorlage

1. Klicken Sie auf **Neue Vorlage**.
2. Geben Sie einen **Vorlagennamen** ein, um sie in der Liste zu identifizieren, und wählen Sie eine **Kategorie** (Allgemein, Veranstaltungen, Gruppen, Geben oder Willkommen), um Ihre Vorlagen zu organisieren.
3. Geben Sie die **Betreffzeile** ein.
4. Schreiben Sie den **Text** mit dem Rich-Text-Editor.
5. Klicken Sie auf **Speichern**.

## Merge-Felder

Klicken Sie auf einen Merge-Feld-Chip über dem Betreff oder Text, um ihn an Ihrer Cursor-Position einzufügen. Wenn die E-Mail gesendet wird, wird jedes Merge-Feld durch die tatsächlichen Informationen des Empfängers ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Der Name des Empfängers
- `{{email}}` -- Die E-Mail-Adresse des Empfängers
- `{{churchName}}` -- Der Name Ihrer Kirche

## Vorschau einer Vorlage

Klicken Sie auf **Vorschau**, um zu sehen, wie der Betreff und der Text mit Beispieldaten aussehen werden, die für die Merge-Felder gefüllt sind, bevor Sie speichern oder senden.

## Verwendung einer Vorlage

Gespeicherte Vorlagen sind verfügbar, um sie beim Verfassen einer E-Mail an Personen oder eine Gruppe auszuwählen, und als eine Aktion in [Arbeitsabläufen](../serving/workflows.md).

## Bearbeitung und Löschen

Klicken Sie auf das **Bearbeitungs**-Symbol neben einer Vorlage, um sie zu aktualisieren, oder auf das **Löschen**-Symbol, um sie dauerhaft zu entfernen.

## Nächste Schritte

- [Arbeitsabläufe](../serving/workflows.md) -- Trigger Sie eine Vorlagen-E-Mail automatisch basierend auf Regeln
