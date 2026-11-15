---
title: "Kalender-Genehmigungen"
description: "Prüfen Sie ausstehende Buchungsanfragen für Räume und Ressourcen in B1 Admin, kontrollieren Sie Konflikte, genehmigen oder lehnen Sie sie ab und sehen Sie frühere Entscheidungen unter Verlauf ein."
---

# Kalender-Genehmigungen

<div class="article-intro">

Auf der Seite Genehmigungen prüfen Administratoren ausstehende Buchungsanfragen für Räume und Ressourcen sowie Kalenderereignisse, die vor der Veröffentlichung eine Genehmigung benötigen, und entscheiden darüber.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Konfigurieren Sie Räume oder Ressourcen mit einer **Genehmigungsgruppe** unter [Räume & Ressourcen](./rooms-resources.md)
- Sie benötigen die Berechtigung **Inhalte bearbeiten** oder **Kalenderkonflikte & Genehmigungen klären** (beide im Bereich **Inhalte** von [Rollen & Berechtigungen](../settings/roles-permissions.md)). Ohne **Inhalte bearbeiten** wird das Menü **Kalender** nicht angezeigt – öffnen Sie die Genehmigungen dann über den Link zu ausstehenden Genehmigungen im **Dashboard** oder über die E-Mail zur Genehmigung.

</div>

## Genehmigungen öffnen {#opening-approvals}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Genehmigungen**. Hier sind ausstehende Buchungsanfragen und Ereignisse aufgeführt, die auf eine Prüfung warten. Verwenden Sie die Schaltflächen **Ausstehend** und **Verlauf** oben, um zwischen Anfragen zu wechseln, die noch eine Entscheidung brauchen, und solchen, die bereits entschieden wurden.

## Buchungsanfragen {#booking-requests}

Wenn jemand einen Raum oder eine Ressource bucht, die eine **Genehmigungsgruppe** hat, und die Person nicht Mitglied dieser Gruppe ist, erscheint die Anfrage im Bereich **Raum- & Ressourcenanfragen**. (Buchungen durch Mitglieder der Genehmigungsgruppe werden automatisch genehmigt.) Mitglieder der Genehmigungsgruppe erhalten außerdem eine E-Mail mit neuen ausstehenden Anfragen und einem Link zu dieser Seite. Jede Zeile zeigt:

- Den Namen und das Datum/die Uhrzeit des Ereignisses
- Den angefragten Raum oder die Ressource (mit der Menge bei Ressourcen mit mehreren Einheiten)
- **Angefragt von**, die Person, die sie beantragt hat, verknüpft mit ihrem Datensatz
- Ein Statusabzeichen, das zeigt, ob die Anfrage Konflikte hat

### Konflikthinweise {#conflict-indicators}

Wenn sich eine Anfrage mit einer anderen Buchung oder Sperrung für denselben Raum oder dieselbe Ressource überschneidet, zeigt ihr Status ein Abzeichen **Konflikte**; fahren Sie mit der Maus darüber, um die Details zu sehen. Anfragen ohne Überschneidungen zeigen **Keine Konflikte**. Prüfen Sie sich überschneidende Anfragen sorgfältig, bevor Sie eine davon genehmigen.

### Genehmigen oder ablehnen {#approving-or-rejecting}

Fahren Sie mit der Maus über eine Buchungsanfrage und klicken Sie auf **Genehmigen** oder **Ablehnen** (beim Ablehnen werden Sie zuerst um eine Bestätigung gebeten). Die anfragende Person wird über die Entscheidung informiert. Genehmigte Buchungen sind für dieses Ereignis für den Raum oder die Ressource gesperrt; abgelehnte Buchungen geben den Zeitraum für andere frei.

Wenn Sie auf **Genehmigen** klicken, öffnet sich ein Dialog **Buchung genehmigen**, mit dem Sie das Ereignis im selben Schritt auch veröffentlichen können:

1. Aktivieren Sie **Im öffentlichen Kalender veröffentlichen**, um das Ereignis im Kalender seiner Gruppe öffentlich zu machen. Lassen Sie das Kästchen leer, um die Buchung zu genehmigen, ohne die Sichtbarkeit des Ereignisses zu ändern.
2. Sobald **Im öffentlichen Kalender veröffentlichen** aktiviert ist, können Sie optional unter **Auch zum Kalender hinzufügen** einen kuratierten Kalender wählen, um das Ereignis zusätzlich zu einem Ihrer [kuratierten Kalender](./curated-calendar.md) hinzuzufügen. Belassen Sie die Auswahl auf **Keine**, um dies zu überspringen. (Diese Option erscheint nur, wenn Sie die Berechtigung **content.edit** haben.)
3. Klicken Sie auf **Genehmigen**.

## Ausstehende Ereignisse {#pending-events}

Ereignisse, die Mitglieder beantragen (etwa über **Meine Anfragen** in der B1-App), erscheinen im Bereich **Ereignisanfragen** mit Datum, **Beschreibung** und **Angefragt von**. Klicken Sie auf **Genehmigen**, um ein Ereignis im Kalender zu veröffentlichen, oder auf **Ablehnen**, um die einreichende Person darüber zu informieren, dass Änderungen nötig sind. Klicken Sie auf **Bearbeiten**, um die Angaben der Anfrage vor Ihrer Entscheidung zu korrigieren, oder auf **Löschen**, um sie zu entfernen.

:::tip
Richten Sie unter [Räume & Ressourcen](./rooms-resources.md) für einen Raum eine Genehmigungsgruppe ein, damit dieser Raum eine Genehmigung erfordert. Gruppen mit Zugriff können den Raum dann beim Erstellen von Ereignissen anfragen, und diese Anfragen landen auf dieser Seite.
:::

## Verlauf {#history}

Genehmigte und abgelehnte Anfragen bleiben auf der Seite erhalten. Klicken Sie oben auf **Genehmigungen** auf **Verlauf**, um sie zu sehen; klicken Sie auf **Ausstehend**, um zu den offenen Anfragen zurückzukehren.

- **Raum- & Ressourcenanfragen** listet jede entschiedene Buchung mit Ereignis, Raum oder Ressource, **Angefragt von**, einem Abzeichen **Genehmigt** oder **Abgelehnt** und **Entschieden** auf. Dort steht, wer die Entscheidung getroffen hat und an welchem Datum. Die zuletzt entschiedenen Anfragen stehen oben.
- **Ereignisanfragen** listet jedes entschiedene Ereignis mit seiner Beschreibung, **Angefragt von**, einem Abzeichen **Genehmigt** oder **Abgelehnt** und **Entschieden** auf. Dort steht, wer die Entscheidung getroffen hat und an welchem Datum. Ältere Ereignisanfragen, die entschieden wurden, bevor B1 dies zu erfassen begann, zeigen stattdessen einen Strich.

Sie können Ihre Meinung aus dem Verlauf heraus ändern: Eine genehmigte Anfrage hat die Aktion **Ablehnen**, eine abgelehnte die Aktion **Genehmigen**. Wenn Sie eine genehmigte Ereignisanfrage ablehnen, wird sie wieder aus dem öffentlichen Kalender entfernt. Ereignisanfragen können hier außerdem bearbeitet oder gelöscht werden.

Klicken Sie auf einen Namen unter **Angefragt von**, um den Datensatz dieser Person zu öffnen.

## Verwandte Artikel {#related-articles}

- [Räume, Ressourcen & Terminplanung](./rooms-resources.md) — buchbare Räume und Ressourcen konfigurieren
- [Kalender erstellen](./creating-calendars.md) — Kalender und Ereignisse verwalten
