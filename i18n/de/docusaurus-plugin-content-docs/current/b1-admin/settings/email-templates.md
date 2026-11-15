---
title: "E-Mail-Vorlagen"
description: "Richten Sie in B1 Admin E-Mail- und SMS-Vorlagen mit Platzhaltern, SMS-Optionen und Vorschauen für Massenkommunikation ein."
---

# E-Mail-Vorlagen

<div class="article-intro">

Mit E-Mail-Vorlagen speichern Sie wiederverwendbare E-Mail-Inhalte – eine Willkommensnachricht, eine Veranstaltungserinnerung, ein Dankeschön für eine Spende –, damit Sie (oder ein [Workflow](../serving/workflows.md)) sie mit einem Klick versenden können, statt sie jedes Mal neu zu schreiben. Dieselbe Liste enthält auch SMS-Vorlagen für die Fenster zum Senden von SMS an Gruppen und Personen sowie für die Workflow-Aktion **SMS senden**.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Kircheneinstellungen bearbeiten** (der Menüpunkt **E-Mail-Vorlagen** erscheint nur mit dieser Berechtigung). Personen mit der Berechtigung **Gruppenmitglieder bearbeiten** können die Seite auch direkt unter **/settings/email-templates** öffnen.

</div>

## E-Mail-Vorlagen öffnen {#accessing-email-templates}

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **E-Mail-Vorlagen**.
3. Sie sehen eine Liste vorhandener Vorlagen mit ihrem **Namen**, **Betreff**, ihrer **Kategorie** und dem Datum der **letzten Änderung**.

## Eine Vorlage erstellen {#creating-a-template}

1. Klicken Sie auf **Neue Vorlage**.
2. Geben Sie einen **Vorlagennamen** ein, unter dem sie in der Liste erscheint, und wählen Sie eine **Kategorie** (Allgemein, Veranstaltungen, Gruppen, Spenden, Willkommen oder SMS), um Ihre Vorlagen zu ordnen. Wählen Sie **SMS**, um stattdessen eine SMS-Vorlage zu erstellen (siehe unten [SMS-Vorlagen](#text-templates)).
3. Geben Sie die Betreffzeile ein.
4. Schreiben Sie den **Text** im Rich-Text-Editor.
5. Klicken Sie auf **Speichern**.

## Platzhalter {#merge-fields}

Klicken Sie oberhalb des Betreffs oder des Textes auf einen Platzhalter-Chip, um ihn an der Cursorposition einzufügen. Klicken Sie dazu zuerst in den Text, an die gewünschte Stelle, und dann auf den Chip. Der Cursor bleibt an seiner Position, sodass Sie direkt hinter dem eingefügten Feld weiterschreiben können. Klicken Sie auf einen Chip für den Text, ohne vorher in den Text geklickt zu haben, wird das Feld am Ende des Textes eingefügt. Beim Versand der E-Mail wird jeder Platzhalter durch die tatsächlichen Angaben des Empfängers ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Der Name des Empfängers
- `{{email}}` -- Die E-Mail-Adresse des Empfängers
- `{{churchName}}` -- Der Name Ihrer Gemeinde

### Platzhalter für Spenden {#gift-merge-fields}

Diese Felder werden nur gefüllt, wenn die E-Mail von einem [Workflow](../serving/workflows.md#sending-email) versendet wird, der durch einen Auslöser **Spende · Erstellt** gestartet wurde. In jeder anderen E-Mail bleiben sie leer.

- `{{amount}}` -- Der Betrag der Spende, etwa 50,00 €
- `{{giftDate}}` -- Das Datum der Spende
- `{{fund}}` -- Der Fonds bzw. die Fonds, dem bzw. denen die Spende zugutekam
- `{{receipt}}` -- Eine Spendenübersicht: das Datum und die Zahlungsart, eine Zeile für jeden Fonds mit seinem Betrag sowie die Summe. Damit senden Sie dem Spender eine Zuwendungsbestätigung in derselben E-Mail wie Ihr Dankeschön. Das Feld wird nur für den Text angeboten, nicht für den Betreff.

## SMS-Vorlagen {#text-templates}

Eine Vorlage in der Kategorie **SMS** ist eine reine Textnachricht für SMS statt für E-Mail:

- Sie hat keinen Betreff. Der Rich-Text-Editor wird durch ein einfaches Feld **Textnachricht** ersetzt, das bis zu 1.600 Zeichen aufnimmt.
- Die Platzhalter-Chips über dem Feld fügen `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` oder die [Platzhalter für Spenden](#gift-merge-fields) an der Cursorposition ein. In einer SMS wird `{{receipt}}` zu einer einzigen Zeile, etwa *50,00 € für Allgemeiner Fonds am 8. Nov. 2026*.
- SMS-Vorlagen erscheinen in der Auswahl **Vorlage laden (optional)** des SMS-Fensters für eine [Gruppe](../groups/group-members.md#texting-group-members) oder eine einzelne Person. Wählen Sie eine aus, wird die Nachricht ausgefüllt, und Sie können sie vor dem Senden trotzdem bearbeiten.
- Sie erscheinen außerdem in der Liste **Aus einer Vorlage starten** der Workflow-Aktion [SMS senden](../serving/workflows.md#sending-a-text).
- Sie werden aus den Auswahllisten für E-Mail-Vorlagen ausgeschlossen, auch aus der Workflow-Aktion **E-Mail senden**.

Für SMS ist ein verbundener [SMS-Anbieter](./church-settings.md#texting) erforderlich.

## Eine Vorschau der Vorlage anzeigen {#previewing-a-template}

Klicken Sie auf **Vorschau**, um zu sehen, wie Betreff und Text mit Beispieldaten für die Platzhalter aussehen, bevor Sie speichern oder versenden.

## Eine Vorlage verwenden {#using-a-template}

Gespeicherte Vorlagen können Sie auswählen, wenn Sie eine E-Mail an Personen oder eine Gruppe verfassen, und als Aktion in [Workflows](../serving/workflows.md) nutzen. Bevor Ihre Gemeinde sie versenden kann, muss das ChurchApps-Team sie einmal für Gruppen-E-Mails freigeben. Siehe [Gruppen-E-Mails für Ihre Gemeinde aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).

## Bearbeiten und Löschen {#editing-and-deleting}

Klicken Sie in der Zeile einer Vorlage auf **Bearbeiten**, um sie zu aktualisieren, oder auf **Löschen**, um sie dauerhaft zu entfernen. B1 bittet Sie vor dem Löschen um eine Bestätigung.

## Nächste Schritte {#next-steps}

- [Workflows](../serving/workflows.md) -- eine Vorlagen-E-Mail anhand von Regeln automatisch auslösen
