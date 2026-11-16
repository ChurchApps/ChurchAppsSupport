---
title: "Genehmigungen im Kalender"
description: "Prüfen Sie ausstehende Buchungsanfragen für Räume und Ressourcen in B1 Admin, kontrollieren Sie auf Konflikte, genehmigen oder lehnen Sie sie ab und sehen Sie unter Verlauf frühere Entscheidungen ein."
---

# Genehmigungen im Kalender {#calendar-approvals}

<div class="article-intro">

Auf der Seite Genehmigungen prüfen und bearbeiten Administratoren ausstehende Buchungsanfragen für Räume und Ressourcen sowie Kalenderveranstaltungen, die vor der Veröffentlichung eine Genehmigung benötigen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Konfigurieren Sie Räume oder Ressourcen mit einer **Genehmigungsgruppe** unter [Räume & Ressourcen](./rooms-resources.md)
- Sie benötigen die Berechtigung **Inhalte bearbeiten** oder **Kalenderkonflikte & Genehmigungen klären** (beide im Bereich **Inhalte** von [Rollen & Berechtigungen](../settings/roles-permissions.md)). Ohne **Inhalte bearbeiten** wird das Menü **Kalender** nicht angezeigt – öffnen Sie Genehmigungen in diesem Fall über den Link zu ausstehenden Genehmigungen auf dem **Dashboard** oder über die Genehmigungs-E-Mail.

</div>

## Genehmigungen öffnen {#opening-approvals}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Genehmigungen**. Hier werden ausstehende Buchungsanfragen und Veranstaltungen aufgelistet, die auf eine Prüfung warten. Mit den Schaltflächen **Ausstehend** und **Verlauf** oben wechseln Sie zwischen Anfragen, die noch eine Entscheidung benötigen, und bereits entschiedenen.

## Buchungsanfragen {#booking-requests}

Wenn jemand einen Raum oder eine Ressource bucht, für die eine **Genehmigungsgruppe** festgelegt ist, und die Person nicht Mitglied dieser Gruppe ist, erscheint die Anfrage im Bereich **Raum- & Ressourcenanfragen**. (Buchungen durch Mitglieder der Genehmigungsgruppe werden automatisch genehmigt.) Mitglieder der Genehmigungsgruppe erhalten außerdem eine E-Mail mit neuen ausstehenden Anfragen und einem Link zu dieser Seite. Jede Zeile zeigt:

- Den Namen und das Datum bzw. die Uhrzeit der Veranstaltung
- Den angefragten Raum oder die Ressource (bei Ressourcen mit mehreren Einheiten mit der Anzahl)
- **Angefragt von**, die Person, die die Anfrage gestellt hat, verlinkt auf ihren Datensatz
- Ein Statusabzeichen, das zeigt, ob die Anfrage Konflikte hat

### Konflikthinweise {#conflict-indicators}

Überschneidet sich eine Anfrage mit einer anderen Buchung oder Sperrung für denselben Raum oder dieselbe Ressource, zeigt ihr Status ein Abzeichen **Konflikte**; fahren Sie mit der Maus darüber, um die Details zu sehen. Anfragen ohne Überschneidungen zeigen **Keine Konflikte**. Prüfen Sie Anfragen mit Konflikten sorgfältig, bevor Sie eine davon genehmigen.

### Genehmigen oder Ablehnen {#approving-or-rejecting}

Bewegen Sie den Mauszeiger über eine Buchungsanfrage und klicken Sie auf **Genehmigen** oder **Ablehnen**. Die anfragende Person wird über die Entscheidung benachrichtigt. Genehmigte Buchungen sind für die Veranstaltung für diesen Raum oder diese Ressource reserviert; abgelehnte Buchungen geben den Zeitraum für andere frei.

Wenn Sie auf **Genehmigen** klicken, öffnet sich ein Dialog **Buchung genehmigen**, in dem Sie die Veranstaltung im selben Schritt auch veröffentlichen können:

1. Aktivieren Sie **Im öffentlichen Kalender veröffentlichen**, um die Veranstaltung im öffentlichen Kalender ihrer Gruppe sichtbar zu machen. Lassen Sie das Kästchen leer, um die Buchung zu genehmigen, ohne die Sichtbarkeit der Veranstaltung zu ändern.
2. Sobald **Im öffentlichen Kalender veröffentlichen** aktiviert ist, können Sie optional unter **Auch zum Kalender hinzufügen** einen kuratierten Kalender auswählen, um die Veranstaltung zusätzlich einem Ihrer [kuratierten Kalender](./curated-calendar.md) hinzuzufügen. Belassen Sie die Auswahl auf **Keine**, um dies zu überspringen. (Diese Option erscheint nur, wenn Sie die Berechtigung **Inhalte bearbeiten** besitzen.)
3. Klicken Sie auf **Genehmigen**.

Wenn Sie auf **Ablehnen** klicken, öffnet sich der Dialog **Anfrage ablehnen**:

1. Geben Sie optional unter **Grund (optional)** einen Grund ein (bis zu 500 Zeichen) – zum Beispiel *„Die Turnhalle ist an diesem Wochenende belegt.“*
2. Klicken Sie zum Bestätigen auf **Ablehnen** oder auf **Abbrechen**, um die Anfrage ausstehend zu lassen.

Der Grund wird an das Ende der Benachrichtigung angehängt, die die anfragende Person erhält (zum Beispiel *Ihre Veranstaltungsanfrage „Youth Lock-In“ wurde abgelehnt: Die Turnhalle ist an diesem Wochenende belegt.*). Mitglieder sehen ihn außerdem auf ihrer Seite **Meine Anfragen** in der B1-App. Lassen Sie das Feld leer, um nur den einfachen Hinweis zu senden.

## Ausstehende Veranstaltungen {#pending-events}

Veranstaltungen, die Mitglieder anfragen (etwa über **Meine Anfragen** in der B1-App), erscheinen im Bereich **Veranstaltungsanfragen** mit Datum, **Beschreibung** und **Angefragt von**. Klicken Sie auf **Genehmigen**, um eine Veranstaltung im Kalender zu veröffentlichen, oder auf **Ablehnen**, um die einreichende Person zu benachrichtigen, dass Änderungen nötig sind (Sie können wie oben beschrieben einen Grund hinzufügen). Klicken Sie auf **Bearbeiten**, um die Angaben der Anfrage vor Ihrer Entscheidung zu korrigieren, oder auf **Löschen**, um sie zu entfernen. Veranstaltungsanfragen, die Mitglieder aus der App senden, haben keine Gruppe. Daher zeigt die Gruppenliste im Bearbeitungsdialog für sie **(keine Gruppe)** an, und Sie können Ihre Änderungen speichern, ohne eine Gruppe auszuwählen.

:::tip
Richten Sie für einen Raum unter [Räume & Ressourcen](./rooms-resources.md) eine Genehmigungsgruppe ein, um für diesen Raum eine Genehmigung zu verlangen. Gruppen mit Zugriff können den Raum dann beim Erstellen von Veranstaltungen anfragen, und diese Anfragen landen auf dieser Seite.
:::

## Verlauf {#history}

Genehmigte und abgelehnte Anfragen bleiben auf der Seite erhalten. Klicken Sie oben bei Genehmigungen auf **Verlauf**, um sie zu sehen; mit **Ausstehend** kehren Sie zu den offenen Anfragen zurück.

- **Raum- & Ressourcenanfragen** listet jede entschiedene Buchung mit der Veranstaltung, dem Raum oder der Ressource, **Angefragt von**, einem Abzeichen **Genehmigt** oder **Abgelehnt** und **Entschieden** auf. Letzteres zeigt, wer die Entscheidung getroffen hat und an welchem Datum. Die zuletzt entschiedenen Anfragen stehen oben.
- **Veranstaltungsanfragen** listet jede entschiedene Veranstaltung mit ihrer Beschreibung, **Angefragt von**, einem Abzeichen **Genehmigt** oder **Abgelehnt** und **Entschieden** auf. Letzteres zeigt, wer die Entscheidung getroffen hat und an welchem Datum. Ältere Veranstaltungsanfragen, die entschieden wurden, bevor B1 dies erfasste, zeigen stattdessen einen Strich.

Sie können Ihre Entscheidung im Verlauf ändern: Eine genehmigte Anfrage hat die Aktion **Ablehnen**, eine abgelehnte die Aktion **Genehmigen**. Wenn Sie eine genehmigte Veranstaltungsanfrage ablehnen, wird sie wieder aus dem öffentlichen Kalender entfernt. Veranstaltungsanfragen können hier auch bearbeitet oder gelöscht werden.

Klicken Sie auf einen Namen unter **Angefragt von**, um den Datensatz dieser Person zu öffnen.

## Verwandte Artikel {#related-articles}

- [Räume, Ressourcen & Terminplanung](./rooms-resources.md) – buchbare Räume und Ressourcen einrichten
- [Kalender erstellen](./creating-calendars.md) – Kalender und Veranstaltungen verwalten
