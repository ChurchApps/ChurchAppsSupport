---
title: "Kalendergenehmigungen"
description: "Ausstehende Raum- und Ressourcenbuchungen in B1 Admin prüfen, auf Konflikte kontrollieren, genehmigen oder ablehnen und frühere Entscheidungen unter Verlauf einsehen."
---

# Kalendergenehmigungen

<div class="article-intro">

Auf der Seite Genehmigungen prüfen Administratoren ausstehende Buchungsanfragen für Räume und Ressourcen sowie Kalenderveranstaltungen, die vor der Veröffentlichung genehmigt werden müssen, und entscheiden darüber.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Konfigurieren Sie Räume oder Ressourcen mit einer **Genehmigungsgruppe** unter [Räume & Ressourcen](./rooms-resources.md)
- Sie benötigen die Berechtigung **Kalender-Admin** oder die Berechtigung **content.edit**

</div>

## Genehmigungen öffnen

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Genehmigungen**. Hier werden ausstehende Buchungsanfragen und Veranstaltungen angezeigt, die auf eine Prüfung warten. Verwenden Sie die Schaltflächen **Ausstehend** und **Verlauf** oben, um zwischen Anfragen, die noch eine Entscheidung brauchen, und bereits entschiedenen Anfragen zu wechseln.

## Buchungsanfragen

Wenn eine Gruppe eine Veranstaltung anlegt und einen Raum oder eine Ressource anfragt, erscheint die Anfrage im Bereich **Raum- & Ressourcenanfragen**. Jede Zeile zeigt:

- Den Namen und das Datum/die Uhrzeit der Veranstaltung
- Den angefragten Raum oder die Ressource (bei Ressourcen mit mehreren Einheiten mit der Anzahl)
- **Angefragt von**, die Person, die die Anfrage gestellt hat, mit einem Link zu ihrem Datensatz
- Ein Statusabzeichen, das zeigt, ob die Anfrage Konflikte hat

### Konfliktanzeigen

Überschneidet sich eine Anfrage mit einer anderen Buchung oder Sperrzeit für denselben Raum oder dieselbe Ressource, zeigt ihr Status das Abzeichen **Konflikte**. Fahren Sie mit der Maus darüber, um die Details zu sehen. Anfragen ohne Überschneidungen zeigen **Keine Konflikte**. Prüfen Sie Anfragen mit Konflikten sorgfältig, bevor Sie eine davon genehmigen.

### Genehmigen oder Ablehnen

Klicken Sie bei einer Buchungsanfrage auf **Genehmigen** oder **Ablehnen** (beim Ablehnen wird zuerst eine Bestätigung verlangt). Die anfragende Person wird über die Entscheidung benachrichtigt. Genehmigte Buchungen sperren den Raum bzw. die Ressource für die Veranstaltung. Abgelehnte Buchungen geben den Termin für andere frei.

Wenn Sie auf **Genehmigen** klicken, öffnet sich der Dialog **Buchung genehmigen**, in dem Sie die Veranstaltung im selben Schritt auch veröffentlichen können:

1. Aktivieren Sie **Im öffentlichen Kalender veröffentlichen**, damit die Veranstaltung im Kalender ihrer Gruppe öffentlich sichtbar wird. Lassen Sie das Kästchen leer, um die Buchung zu genehmigen, ohne die Sichtbarkeit der Veranstaltung zu ändern.
2. Sobald **Im öffentlichen Kalender veröffentlichen** aktiviert ist, können Sie unter **Auch zum Kalender hinzufügen** optional einen kuratierten Kalender auswählen, um die Veranstaltung zusätzlich einem Ihrer [kuratierten Kalender](./curated-calendar.md) hinzuzufügen. Lassen Sie die Auswahl auf **Keine**, um dies zu überspringen. (Diese Option erscheint nur, wenn Sie die Berechtigung **content.edit** haben.)
3. Klicken Sie auf **Genehmigen**.

## Ausstehende Veranstaltungen

Wenn Ihr Kalenderablauf vorsieht, dass Veranstaltungen vor der öffentlichen Sichtbarkeit genehmigt werden, erscheinen ausstehende Veranstaltungen im Bereich **Veranstaltungsanfragen**. Klicken Sie auf **Genehmigen**, um eine Veranstaltung im Kalender zu veröffentlichen, oder auf **Ablehnen**, um die einreichende Person darüber zu informieren, dass Änderungen nötig sind.

:::tip
Richten Sie für einen Raum unter [Räume & Ressourcen](./rooms-resources.md) eine Genehmigungsgruppe ein, um für diesen Raum eine Genehmigung zu verlangen. Gruppen mit Zugriff können den Raum dann beim Anlegen von Veranstaltungen anfragen, und diese Anfragen landen auf dieser Seite.
:::

## Verlauf

Genehmigte und abgelehnte Anfragen bleiben auf der Seite erhalten. Klicken Sie oben bei Genehmigungen auf **Verlauf**, um sie zu sehen. Mit **Ausstehend** kehren Sie zu den offenen Anfragen zurück.

- **Raum- & Ressourcenanfragen** listet jede entschiedene Buchung mit Veranstaltung, Raum bzw. Ressource, **Angefragt von**, einem Abzeichen **Genehmigt** oder **Abgelehnt** sowie **Entschieden** auf. Die Spalte **Entschieden** zeigt, wer die Entscheidung getroffen hat und an welchem Datum. Die zuletzt entschiedenen Anfragen stehen oben.
- **Veranstaltungsanfragen** listet jede entschiedene Veranstaltung mit Beschreibung, **Angefragt von** und einem Abzeichen **Genehmigt** oder **Abgelehnt** auf. Wer eine Veranstaltungsanfrage entschieden hat und wann, wird nicht erfasst. Daher wird diese Spalte für Veranstaltungen nicht angezeigt.

Klicken Sie auf einen Namen unter **Angefragt von**, um den Datensatz dieser Person zu öffnen.

## Verwandte Artikel

- [Räume, Ressourcen & Planung](./rooms-resources.md) — buchbare Räume und Ressourcen einrichten
- [Kalender erstellen](./creating-calendars.md) — Kalender und Veranstaltungen verwalten
