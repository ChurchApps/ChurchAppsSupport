---
title: "Kalender-Genehmigungen"
---

# Kalender-Genehmigungen

<div class="article-intro">

Die Seite "Genehmigungen" ist der Ort, an dem Administratoren ausstehende Raum- und Ressourcenbuchungsanfragen sowie Kalenderereignisse, die vor der Veröffentlichung genehmigt werden müssen, überprüfen und bearbeiten.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Konfigurieren Sie Räume oder Ressourcen mit einer **Genehmigungsgruppe** in [Räume & Ressourcen](rooms-resources)
- Sie benötigen die Berechtigung **Kalender-Admin** oder die Berechtigung **content.edit**

</div>

## Genehmigungen öffnen

Öffnen Sie in B1 Admin das [Jump-Menü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), erweitern Sie **Kalender**, und klicken Sie auf **Genehmigungen**. Ausstehende Buchungsanfragen und Ereignisse, die auf Überprüfung warten, sind hier aufgelistet.

## Buchungsanfragen

Wenn eine Gruppe ein Ereignis erstellt und einen Raum oder eine Ressource anfordert, wird die Anfrage im Abschnitt **Raum- & Ressourcen-Anfragen** angezeigt. Jede Zeile zeigt:

- Der Ereignisname und Datum/Uhrzeit
- Der Raum oder die Ressource, die angefordert wird (mit der Menge bei Ressourcen mit mehreren Einheiten)
- Ein Statusabzeichen, das anzeigt, ob die Anfrage Konflikte hat

### Konflikt-Indikatoren

Wenn sich eine Anfrage mit einer anderen Buchung oder Sperrzeit für denselben Raum oder dieselbe Ressource überschneidet, zeigt ihr Status ein Abzeichen **Konflikte**; fahren Sie mit der Maus darüber, um die Details zu sehen. Anfragen ohne Überschneidungen zeigen **Keine Konflikte**. Überprüfen Sie konfliktreiche Anfragen sorgfältig, bevor Sie eine genehmigen.

### Genehmigung oder Ablehnung

Klicken Sie bei einer Buchungsanfrage auf **Genehmigen** oder **Ablehnen** (beim Ablehnen müssen Sie zuerst bestätigen). Die anfragende Gruppe wird über die Entscheidung benachrichtigt. Genehmigte Buchungen sind für diesen Raum oder Ressource des Ereignisses gesperrt; abgelehnte Buchungen geben den Slot für andere frei.

Wenn Sie auf **Genehmigen** klicken, wird ein Dialog **Buchung genehmigen** geöffnet, sodass Sie das Ereignis auch im gleichen Schritt veröffentlichen können:

1. Überprüfen Sie **Im öffentlichen Kalender veröffentlichen**, um das Ereignis im öffentlichen Kalender der Gruppe zu veröffentlichen. Lassen Sie es unchecked, um die Buchung zu genehmigen, ohne die Sichtbarkeit des Ereignisses zu ändern.
2. Sobald **Im öffentlichen Kalender veröffentlichen** geprüft ist, können Sie optional einen kuratierten Kalender aus **Auch zu Kalender hinzufügen** auswählen, um das Ereignis auch zu einem Ihrer [kuratierten Kalender](curated-calendar) hinzuzufügen. Lassen Sie es auf **Keine** eingestellt, um dies zu überspringen. (Diese Option wird nur angezeigt, wenn Sie die Berechtigung **content.edit** haben.)
3. Klicken Sie auf **Genehmigen**.

## Ausstehende Ereignisse

Wenn Ihr Kalender-Workflow eine Ereignisgenehmigung vor der Sichtbarkeit des Ereignisses für die Öffentlichkeit erfordert, werden ausstehende Ereignisse im Abschnitt **Ereignisanfragen** angezeigt. Klicken Sie auf **Genehmigen**, um ein Ereignis im Kalender zu veröffentlichen, oder auf **Ablehnen**, um den Einreicher zu benachrichtigen, dass Änderungen erforderlich sind.

:::tip
Richten Sie eine Genehmigungsgruppe auf einem Raum in [Räume & Ressourcen](rooms-resources) ein, um eine Genehmigung für diesen Raum zu erfordern. Gruppen mit Zugriff können dann den Raum anfordern, wenn sie Ereignisse erstellen, und diese Anfragen fließen auf diese Seite.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Zeitplanung](rooms-resources) – konfigurieren Sie buchbare Räume und Ressourcen
- [Kalender erstellen](creating-calendars) – verwalten Sie Kalender und Ereignisse
