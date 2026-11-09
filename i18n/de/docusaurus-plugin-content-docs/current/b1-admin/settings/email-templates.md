---
title: "E-Mail-Vorlagen"
description: "E-Mail- und Textnachrichtenvorlagen in B1 Admin einrichten, mit Platzhaltern, Optionen für Textnachrichten und Vorschauen für Massenkommunikation."
---

# E-Mail-Vorlagen

<div class="article-intro">

Mit E-Mail-Vorlagen speichern Sie wiederverwendbare E-Mail-Inhalte, etwa eine Willkommensnachricht, eine Veranstaltungserinnerung oder einen Dank für eine Spende. So können Sie (oder ein [Workflow](../serving/workflows.md)) sie mit einem Klick versenden, statt jedes Mal neu zu schreiben. In derselben Liste liegen auch Vorlagen für Textnachrichten, die für die Fenster zum Senden von Textnachrichten an Gruppen und Einzelpersonen sowie für die Workflow-Aktion **Textnachricht senden** gedacht sind.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen Zugriff auf den Bereich Einstellungen in B1 Admin.

</div>

## E-Mail-Vorlagen öffnen

1. Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links) und klappen Sie **Einstellungen** auf.
2. Klicken Sie auf **E-Mail-Vorlagen**.
3. Sie sehen eine Liste der vorhandenen Vorlagen mit Betreff, Kategorie und Datum der letzten Änderung.

## Eine Vorlage erstellen

1. Klicken Sie auf **Neue Vorlage**.
2. Geben Sie einen **Vorlagennamen** ein, damit Sie die Vorlage in der Liste wiederfinden, und wählen Sie eine **Kategorie** (Allgemein, Veranstaltungen, Gruppen, Spenden, Willkommen oder Text), um Ihre Vorlagen zu ordnen. Wählen Sie **Text**, um stattdessen eine Vorlage für Textnachrichten zu erstellen (siehe unten unter [Textvorlagen](#text-templates)).
3. Geben Sie die **Betreffzeile** ein.
4. Schreiben Sie den **Text** im Editor für formatierten Text.
5. Klicken Sie auf **Speichern**.

## Platzhalter {#merge-fields}

Klicken Sie auf einen Platzhalter-Chip oberhalb des Betreffs oder Textes, um ihn an Ihrer Cursorposition einzufügen. Klicken Sie zuerst in den Text, an die Stelle, an der der Platzhalter stehen soll, und dann auf den Chip. Der Cursor bleibt an seiner Position, sodass Sie direkt nach dem eingefügten Platzhalter weiterschreiben können. Klicken Sie auf einen Chip im Text, ohne vorher in den Text geklickt zu haben, wird der Platzhalter am Ende angehängt. Beim Versenden wird jeder Platzhalter durch die tatsächlichen Angaben der empfangenden Person ersetzt:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Der Name der empfangenden Person
- `{{email}}` -- Die E-Mail-Adresse der empfangenden Person
- `{{churchName}}` -- Der Name Ihrer Gemeinde

### Platzhalter für Spenden {#gift-merge-fields}

Diese Felder werden nur gefüllt, wenn die E-Mail von einem [Workflow](../serving/workflows.md#sending-email) versendet wird, den ein Auslöser **Spende · Erstellt** gestartet hat. In jeder anderen E-Mail bleiben sie leer.

- `{{amount}}` -- Der Betrag der Spende, zum Beispiel 50,00 €
- `{{giftDate}}` -- Das Datum der Spende
- `{{fund}}` -- Der Fonds oder die Fonds, an die die Spende ging
- `{{receipt}}` -- Eine Spendenübersicht: Datum und Zahlungsart, eine Zeile je Fonds mit Betrag und die Gesamtsumme. Damit schicken Sie Spendenden einen Beleg in derselben E-Mail wie Ihren Dank. Er wird nur für den Text angeboten, nicht für den Betreff.

## Textvorlagen {#text-templates}

Eine Vorlage mit der Kategorie **Text** ist eine schlichte Textnachricht für SMS statt für E-Mail:

- Sie hat keinen Betreff. Der Editor für formatierten Text wird durch ein einfaches Feld **Textnachricht** ersetzt, das bis zu 1.600 Zeichen aufnimmt.
- Die Platzhalter-Chips oberhalb des Feldes fügen `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` oder die [Platzhalter für Spenden](#gift-merge-fields) an der Cursorposition ein. In einer Textnachricht wird `{{receipt}}` zu einer einzigen Zeile, etwa *50,00 € an Allgemeiner Fonds am 8. Nov. 2026*.
- Textvorlagen erscheinen in der Auswahl **Vorlage laden (optional)** im Textfenster für eine [Gruppe](../groups/group-members.md#texting-group-members) oder eine einzelne Person. Wenn Sie eine auswählen, wird die Nachricht gefüllt, und Sie können sie vor dem Senden noch bearbeiten.
- Sie erscheinen außerdem in der Liste **Mit einer Vorlage beginnen** der Workflow-Aktion [Textnachricht senden](../serving/workflows.md#sending-a-text).
- Sie werden in den Auswahlen für E-Mail-Vorlagen weggelassen, auch in der Workflow-Aktion **E-Mail senden**.

Für das Versenden von Textnachrichten ist ein verbundener [Anbieter für Textnachrichten](./church-settings.md#texting) nötig.

## Eine Vorlage in der Vorschau ansehen

Klicken Sie auf **Vorschau**, um zu sehen, wie Betreff und Text mit Beispieldaten für die Platzhalter aussehen. Das ist möglich, bevor Sie speichern oder versenden.

## Eine Vorlage verwenden

Gespeicherte Vorlagen können Sie auswählen, wenn Sie eine E-Mail an Personen oder eine Gruppe verfassen, und sie sind als Aktion in den [Workflows](../serving/workflows.md) verfügbar. Bevor Ihre Gemeinde sie versenden kann, muss das ChurchApps-Team sie einmalig für Gruppen-E-Mails freigeben. Siehe [Gruppen-E-Mails für Ihre Kirche aktivieren](../groups/group-members.md#turning-on-group-email-for-your-church).

## Bearbeiten und Löschen

Klicken Sie neben einer Vorlage auf das Symbol **Bearbeiten**, um sie zu ändern, oder auf das Symbol **Löschen**, um sie dauerhaft zu entfernen.

## Nächste Schritte

- [Workflows](../serving/workflows.md) -- Eine Vorlagen-E-Mail anhand von Regeln automatisch auslösen
