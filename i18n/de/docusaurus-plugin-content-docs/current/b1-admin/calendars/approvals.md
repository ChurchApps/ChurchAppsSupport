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

Wenn eine Gruppe ein Ereignis erstellt und einen Raum oder eine Ressource anfordert, wird die Anfrage im Bereich **Raum- & Ressourcen-Anfragen** angezeigt. Jede Zeile zeigt:

- Der Raum oder die Ressource, die angefordert wird
- Der Ereignisname und Datum/Uhrzeit
- Die anfragende Gruppe

### Konflikt-Indikatoren

Wenn sich zwei Anfragen für denselben Raum oder Ressource überlappen, wird ein Konfliktwarn-Symbol angezeigt. Überprüfen Sie konfliktreiche Anfragen sorgfältig, bevor Sie eine genehmigen.

### Genehmigung oder Ablehnung

Klicken Sie auf das Symbol **✓** (genehmigen) oder **✗** (ablehnen) auf einer beliebigen Buchungsanfrage. Die anfragende Gruppe wird über die Entscheidung benachrichtigt. Genehmigte Buchungen sind für diesen Raum oder Ressource des Ereignisses gesperrt; abgelehnte Buchungen geben den Slot für andere frei.

Wenn Sie auf "Genehmigen" klicken, wird ein Dialog **Buchung genehmigen** geöffnet, sodass Sie das Ereignis auch im gleichen Schritt veröffentlichen können:

1. Überprüfen Sie **Im öffentlichen Kalender veröffentlichen**, um das Ereignis im öffentlichen Kalender der Gruppe zu veröffentlichen. Lassen Sie es unchecked, um die Buchung zu genehmigen, ohne die Sichtbarkeit des Ereignisses zu ändern.
2. Sobald **Im öffentlichen Kalender veröffentlichen** geprüft ist, können Sie optional einen kuratierten Kalender aus **Auch zu Kalender hinzufügen** auswählen, um das Ereignis auch zu einem Ihrer [kuratierten Kalender](curated-calendar) hinzuzufügen. Lassen Sie es auf **Keine** eingestellt, um dies zu überspringen. (Diese Option wird nur angezeigt, wenn Sie die Berechtigung **content.edit** haben.)
3. Klicken Sie auf **Genehmigen**.

## Ausstehende Ereignisse

Wenn Ihr Kalender-Workflow eine Ereignisgenehmigung vor der Sichtbarkeit des Ereignisses für die Öffentlichkeit erfordert, werden ausstehende Ereignisse im Bereich **Ereignisanfragen** angezeigt. Genehmigen Sie ein Ereignis, um es im Kalender zu veröffentlichen, oder lehnen Sie es ab, um den Submitter zu benachrichtigen, dass Änderungen erforderlich sind.

:::tip
Richten Sie eine Genehmigungsgruppe auf einem Raum in [Räume & Ressourcen](rooms-resources) ein, um eine Genehmigung für diesen Raum zu erfordern. Gruppen mit Zugriff können dann den Raum anfordern, wenn sie Ereignisse erstellen, und diese Anfragen fließen auf diese Seite.
:::

## Verwandte Artikel

- [Räume, Ressourcen & Zeitplanung](rooms-resources) – konfigurieren Sie buchbare Räume und Ressourcen
- [Kalender erstellen](creating-calendars) – verwalten Sie Kalender und Ereignisse
