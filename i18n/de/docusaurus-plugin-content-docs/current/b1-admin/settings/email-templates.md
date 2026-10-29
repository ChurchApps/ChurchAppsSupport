---
title: "E-Mail-Vorlagen"
---

# E-Mail-Vorlagen

<div class="article-intro">

Mit E-Mail-Vorlagen speichern Sie wiederverwendbare E-Mail-Inhalte -- eine Willkommensnachricht, eine Veranstaltungserinnerung, einen Dankesbrief für eine Gabe. So können Sie (oder ein [Workflow](../serving/workflows.md)) sie mit einem Klick versenden, statt sie jedes Mal neu zu schreiben. In derselben Liste werden auch SMS-Vorlagen für die Fenster SMS an Gruppen und an Personen gespeichert.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Zugriff auf den Bereich Einstellungen in B1 Admin.

</div>

## Auf E-Mail-Vorlagen zugreifen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **E-Mail-Vorlagen**.
3. Sie sehen eine Liste der vorhandenen Vorlagen mit Betreff, Kategorie und dem Datum der letzten Änderung.

## Eine Vorlage anlegen

1. Klicken Sie auf **Neue Vorlage**.
2. Geben Sie einen **Vorlagennamen** ein, unter dem sie in der Liste erscheint, und wählen Sie eine **Kategorie** (Allgemein, Veranstaltungen, Gruppen, Spenden, Willkommen oder SMS), um Ihre Vorlagen zu ordnen. Wählen Sie **SMS**, um stattdessen eine SMS-Vorlage anzulegen (siehe [SMS-Vorlagen](#text-templates) unten).
3. Geben Sie die **Betreffzeile** ein.
4. Schreiben Sie den **Text** mit dem Rich-Text-Editor.
5. Klicken Sie auf **Speichern**.

## Platzhalter

Klicken Sie oberhalb von Betreff oder Text auf einen Platzhalter-Chip, um ihn an der Cursorposition einzufügen. Klicken Sie zuerst in den Text an die Stelle, an der das Feld stehen soll, und klicken Sie dann auf den Chip. Der Cursor bleibt an Ort und Stelle, sodass Sie direkt nach dem eingefügten Feld weiterschreiben können. Klicken Sie auf einen Chip des Textes, ohne vorher in den Text zu klicken, wird das Feld am Ende des Textes eingefügt. Beim Versand wird jeder Platzhalter durch die tatsächlichen Angaben des Empfängers ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Der Name des Empfängers
- `{{email}}` -- Die E-Mail-Adresse des Empfängers
- `{{churchName}}` -- Der Name Ihrer Kirche

## SMS-Vorlagen

Eine Vorlage mit der Kategorie **SMS** ist eine reine Textnachricht für den SMS-Versand statt einer E-Mail:

- Sie hat keinen Betreff. Der Rich-Text-Editor wird durch ein einfaches Feld **SMS-Nachricht** ersetzt, das bis zu 1.600 Zeichen aufnimmt.
- Die Platzhalter-Chips oberhalb des Feldes fügen `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` oder `{{churchName}}` an der Cursorposition ein.
- SMS-Vorlagen erscheinen in der Auswahl **Vorlage laden (optional)** im SMS-Fenster für eine [Gruppe](../groups/group-members.md#texting-group-members) oder eine einzelne Person. Wählen Sie eine aus, wird die Nachricht eingefügt, und Sie können sie vor dem Senden noch bearbeiten.
- Sie werden in den Auswahlen für E-Mail-Vorlagen ausgelassen, auch in der Workflow-Aktion **E-Mail senden**.

Für den SMS-Versand ist ein verbundener [SMS-Anbieter](./church-settings.md#texting) erforderlich.

## Eine Vorlage in der Vorschau ansehen

Klicken Sie auf **Vorschau**, um zu sehen, wie Betreff und Text mit Beispieldaten für die Platzhalter aussehen, bevor Sie speichern oder senden.

## Eine Vorlage verwenden

Gespeicherte Vorlagen können Sie auswählen, wenn Sie eine E-Mail an Personen oder eine Gruppe verfassen, und als Aktion in [Workflows](../serving/workflows.md) nutzen. Bevor Ihre Kirche sie versenden kann, muss das Team von ChurchApps den Versand für die Gruppen-E-Mail einmalig freigeben. Siehe [Gruppen-E-Mail für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).

## Bearbeiten und Löschen

Klicken Sie neben einer Vorlage auf das Symbol **Bearbeiten**, um sie zu aktualisieren, oder auf das Symbol **Löschen**, um sie endgültig zu entfernen.

## Wie geht es weiter?

- [Workflows](../serving/workflows.md) -- eine Vorlagen-E-Mail anhand von Regeln automatisch auslösen
