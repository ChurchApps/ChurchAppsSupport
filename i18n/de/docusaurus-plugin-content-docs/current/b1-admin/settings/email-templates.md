---
title: "Email Templates"
---

# Email Templates

<div class="article-intro">

Email Templates ermöglichen es Ihnen, wiederverwendbare E-Mail-Inhalte zu speichern – eine Willkommensnachricht, eine Ereigniserinnerung, ein Dankesschreiben zum Geben – damit Sie (oder ein [Workflow](../serving/workflows.md)) diese in einem Klick senden können, anstatt sie jedes Mal von Grund auf zu schreiben.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Zugriff auf den Settings-Bereich in B1 Admin.

</div>

## Zugriff auf Email Templates

1. Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und erweitern Sie **Settings**.
2. Klicken Sie auf **Email Templates**.
3. Sie sehen eine Liste vorhandener Vorlagen mit ihrem Betreff, der Kategorie und dem Änderungsdatum.

## Ein Template erstellen

1. Klicken Sie auf **New Template**.
2. Geben Sie einen **Template Name** ein, um ihn in der Liste zu identifizieren, und wählen Sie eine **Category** (General, Events, Groups, Giving oder Welcome), um Ihre Vorlagen zu organisieren.
3. Geben Sie die **Subject**-Zeile ein.
4. Schreiben Sie den **Body** mit dem Rich-Text-Editor.
5. Klicken Sie auf **Save**.

## Merge Fields

Klicken Sie auf einen Merge-Field-Chip oberhalb des Betreff oder des Bodys, um ihn an Ihrem Cursor einzufügen – klicken Sie zuerst in den Text, wo Sie das Feld einfügen möchten, dann klicken Sie auf den Chip. Ihr Cursor bleibt an Ort und Stelle, daher können Sie direkt nach dem eingefügten Feld weiterschreiben. Wenn Sie auf einen Body-Chip klicken, ohne zuerst in den Body zu klicken, wird das Feld am Ende des Bodys hinzugefügt. Wenn die E-Mail versendet wird, wird jedes Merge Field durch die tatsächlichen Informationen des Empfängers ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Der Name des Empfängers
- `{{email}}` -- E-Mail-Adresse des Empfängers
- `{{churchName}}` -- Der Name Ihrer Kirche

## Anzeige in der Vorschau eines Templates

Klicken Sie auf **Preview**, um zu sehen, wie Betreff und Body mit Beispieldaten ausgefüllt aussehen, bevor Sie speichern oder senden.

## Verwendung eines Templates

Gespeicherte Vorlagen können ausgewählt werden, wenn Sie eine E-Mail an Personen oder eine Gruppe verfassen, und als Aktion in [Workflows](../serving/workflows.md). Bevor Ihre Kirche diese senden kann, muss das ChurchApps-Team es einmalig für Gruppen-E-Mail genehmigen. Siehe [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).

## Bearbeitung und Löschen

Klicken Sie auf das **Edit**-Symbol neben einer Vorlage, um sie zu aktualisieren, oder auf das **Delete**-Symbol, um sie dauerhaft zu entfernen.

## Nächste Schritte

- [Workflows](../serving/workflows.md) -- Lösen Sie eine Template-E-Mail automatisch basierend auf Regeln aus
