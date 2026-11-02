---
title: "E-Mail-Vorlagen"
---

# E-Mail-Vorlagen

<div class="article-intro">

Mit E-Mail-Vorlagen speichern Sie wiederverwendbare E-Mail-Inhalte – eine Willkommensnachricht, eine Veranstaltungserinnerung, einen Dankesbrief für eine Gabe –, damit Sie (oder ein [Workflow](../serving/workflows.md)) sie mit einem Klick versenden können, statt sie jedes Mal neu zu schreiben. Dieselbe Liste enthält auch Textnachrichten-Vorlagen für die Fenster Text bei Gruppen und Personen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Zugriff auf den Bereich Einstellungen in B1 Admin.

</div>

## Auf E-Mail-Vorlagen zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (das Suchfeld oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **E-Mail-Vorlagen**.
3. Sie sehen eine Liste der vorhandenen Vorlagen mit Betreff, Kategorie und Datum der letzten Änderung.

## Eine Vorlage anlegen

1. Klicken Sie auf **Neue Vorlage**.
2. Geben Sie einen **Vorlagennamen** ein, unter dem sie in der Liste erscheint, und wählen Sie eine **Kategorie** (Allgemein, Veranstaltungen, Gruppen, Spenden, Willkommen oder Text), um Ihre Vorlagen zu ordnen. Wählen Sie **Text**, um stattdessen eine Vorlage für Textnachrichten anzulegen (siehe [Textvorlagen](#text-templates) unten).
3. Geben Sie die Betreffzeile ein.
4. Schreiben Sie den **Text** im Rich-Text-Editor.
5. Klicken Sie auf **Speichern**.

## Platzhalter {#merge-fields}

Klicken Sie auf einen Platzhalter-Chip oberhalb des Betreffs oder des Textes, um ihn an der Cursorposition einzufügen – klicken Sie zuerst in die Stelle, an der das Feld stehen soll, und dann auf den Chip. Der Cursor bleibt an seiner Stelle, sodass Sie direkt hinter dem eingefügten Feld weitertippen können. Klicken Sie auf einen Chip für den Text, ohne vorher in den Text geklickt zu haben, wird das Feld am Ende des Textes eingefügt. Beim Versand wird jeder Platzhalter durch die tatsächlichen Angaben des Empfängers ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` – Der Name des Empfängers
- `{{email}}` – Die E-Mail-Adresse des Empfängers
- `{{churchName}}` – Der Name Ihrer Kirche

## Textvorlagen {#text-templates}

Eine Vorlage mit der Kategorie **Text** ist eine schlichte Nachricht für Textnachrichten statt für E-Mails:

- Sie hat keinen Betreff. Der Rich-Text-Editor wird durch ein einfaches Feld **Textnachricht** ersetzt, das bis zu 1.600 Zeichen aufnimmt.
- Die Platzhalter-Chips oberhalb des Feldes fügen `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` oder `{{churchName}}` an der Cursorposition ein.
- Textvorlagen erscheinen in der Auswahl **Vorlage laden (optional)** im Textfenster für eine [Gruppe](../groups/group-members.md#texting-group-members) oder eine einzelne Person. Eine Auswahl füllt die Nachricht aus, und Sie können sie vor dem Senden weiterhin bearbeiten.
- Sie fehlen in den Auswahllisten für E-Mail-Vorlagen, einschließlich der Workflow-Aktion **E-Mail senden**.

Textnachrichten erfordern einen verbundenen [Anbieter für Textnachrichten](./church-settings.md#texting).

## Eine Vorlage ansehen

Klicken Sie auf **Vorschau**, um zu sehen, wie Betreff und Text mit Beispieldaten für die Platzhalter aussehen, bevor Sie speichern oder senden.

## Eine Vorlage verwenden

Gespeicherte Vorlagen können ausgewählt werden, wenn Sie eine E-Mail an Personen oder eine Gruppe verfassen, sowie als Aktion in [Workflows](../serving/workflows.md). Bevor Ihre Kirche sie versenden kann, muss das ChurchApps-Team sie einmal für Gruppen-E-Mails freigeben. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).

## Bearbeiten und Löschen

Klicken Sie neben einer Vorlage auf das Symbol **Bearbeiten**, um sie zu aktualisieren, oder auf das Symbol **Löschen**, um sie dauerhaft zu entfernen.

## Nächste Schritte

- [Workflows](../serving/workflows.md) – eine Vorlagen-E-Mail anhand von Regeln automatisch auslösen
