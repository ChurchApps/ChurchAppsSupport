---
title: "Räume, Ressourcen & Terminplanung"
description: "Richten Sie in B1 Admin Räume, Ausstattung, Sperrungen und Ereignisvorlagen ein, damit Gruppen Buchungen anfragen können und Sie diese genehmigen, um Doppelbuchungen zu vermeiden."
---

# Räume, Ressourcen & Terminplanung

<div class="article-intro">

Mit Räumen und Ressourcen verwalten Sie die buchbaren Flächen und die Ausstattung Ihrer Kirche. Möchte eine Gruppe oder ein Team für ein Ereignis einen Raum nutzen oder eine Ressource ausleihen, kann sie dies über B1 anfragen – und Sie können diese Anfragen genehmigen oder ablehnen, um Doppelbuchungen zu verhindern.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Sie benötigen die Berechtigung **Inhalte bearbeiten**
- Richten Sie die [Gruppen](../groups/creating-groups.md) ein, deren Mitglieder Buchungsanfragen stellen

</div>

## Räume & Ressourcen öffnen {#opening-rooms--resources}

Öffnen Sie in B1 Admin das [Sprungmenü](../introduction.md#getting-around-with-the-jump-menu) (die Suchleiste oben links), klappen Sie **Kalender** auf und klicken Sie auf **Räume & Ressourcen**. Die Seite hat vier Reiter: **Räume**, **Ressourcen**, **Sperrungen** und **Vorlagen**. Die Hinzufügen-Schaltfläche oben auf der Seite passt sich dem gewählten Reiter an, und ein Feld **Suchen** filtert die aktuelle Liste.

## Räume {#rooms}

Räume sind physische Flächen, die zusammen mit Kalenderereignissen reserviert werden können – ein Gottesdienstraum, ein Gemeindesaal, ein Klassenzimmer usw.

### Einen Raum hinzufügen {#adding-a-room}

1. Klicken Sie im Reiter **Räume** oben auf der Seite auf **Raum hinzufügen**.
2. Geben Sie einen **Raumnamen** ein.
3. Legen Sie optional eine **Kapazität** (maximale Personenzahl) und eine **Beschreibung** fest. Beides wird neben dem Raum angezeigt, wenn Personen für ein Ereignis Räume auswählen.
4. Legen Sie eine **Genehmigungsgruppe** fest, wenn Buchungen einer Freigabe bedürfen. Buchungen von Mitgliedern dieser Gruppe werden automatisch genehmigt; jede andere Buchung wartet als **Ausstehend**, bis sie auf der Seite [Genehmigungen](./approvals.md) bestätigt wird, und die Mitglieder der Gruppe erhalten eine E-Mail zu neuen Anfragen. Lassen Sie es auf **Keine Genehmigung erforderlich**, um jede Buchung automatisch zu genehmigen.
5. Klicken Sie auf **Speichern**.

Die Liste der Räume zeigt für jeden Raum den **Raumnamen**, die **Kapazität** und die **Genehmigungsgruppe**. Ausgeschaltete Räume zeigen neben ihrem Namen ein Abzeichen **Inaktiv**.

### Einen Raum bearbeiten oder löschen {#editing-or-deleting-a-room}

Fahren Sie mit der Maus über einen Raum und klicken Sie auf **Bearbeiten**, nehmen Sie Ihre Änderungen vor und klicken Sie auf **Speichern**. Mit **Löschen** entfernen Sie einen Raum dauerhaft.

Wenn ein Raum für eine Weile geschlossen ist – etwa wegen einer Renovierung, einer Saison oder ohne festes Rückgabedatum –, schalten Sie seinen Schalter **Aktiv** aus und klicken Sie auf **Speichern**, statt ihn zu löschen. Ein inaktiver Raum behält seine Angaben und alle früheren Buchungen, erscheint aber nicht mehr in den Raumlisten, wenn jemand ein Ereignis plant oder einen Raum anfragt. Schalten Sie den Schalter wieder ein, um den Raum erneut buchbar zu machen. Eine Sperrung ist besser, wenn der Raum an bestimmten Daten geschlossen ist, denn dann bleibt der Raum in der Liste und es wird vor Buchungen an diesen Daten gewarnt.

## Ressourcen {#resources}

Ressourcen sind Gegenstände, die zusammen mit einem Ereignis gebucht werden können – AV-Technik, Beamer, Stühle, ein Bus usw.

### Eine Ressource hinzufügen {#adding-a-resource}

1. Klicken Sie auf den Reiter **Ressourcen** und dann auf **Ressource hinzufügen**.
2. Geben Sie einen **Ressourcennamen** ein und optional eine **Beschreibung**.
3. Legen Sie die **Menge** fest, die Sie besitzen (zum Beispiel 3 Beamer). Jedes Ereignis bucht eines davon, und B1 warnt, wenn zur selben Zeit mehr Ereignisse sie buchen, als Sie besitzen.
4. Legen Sie eine **Genehmigungsgruppe** fest, wenn jemand die Ausleihe von Ressourcen freigeben muss. Dies funktioniert wie bei Räumen.
5. Klicken Sie auf **Speichern**.

Bearbeiten oder löschen Sie eine Ressource auf die gleiche Weise wie einen Raum. Eine Ressource hat außerdem einen Schalter **Aktiv**: Schalten Sie ihn aus, um sie aus den Ressourcenlisten zu entfernen, ohne ihre Angaben oder frühere Buchungen zu verlieren.

## Sperrungen {#blockouts}

Sperrungen verhindern, dass Räume oder Ressourcen zu bestimmten Zeiten gebucht werden – etwa für Renovierungen, reservierte Zeiträume oder Wartungsarbeiten.

### Eine Sperrung hinzufügen {#adding-a-blockout}

1. Klicken Sie auf den Reiter **Sperrungen** und dann auf **Sperrung hinzufügen**.
2. Wählen Sie unter **Gilt für** einen Raum, eine Ressource oder **Alle Räume & Ressourcen**.
3. Legen Sie **Beginn** und **Ende** der Sperrung als Datum/Uhrzeit fest.
4. Fügen Sie optional einen **Grund** hinzu. Er wird im [Verfügbarkeitskalender](./availability.md) als *Gesperrt: Grund* angezeigt.
5. Klicken Sie auf **Speichern**.

Ereignisse, die einen gesperrten Raum oder eine gesperrte Ressource buchen, zeigen im Ereignis-Editor eine Konfliktwarnung.

## Ereignisvorlagen {#event-templates}

Vorlagen speichern eine wiederverwendbare Ereignisvorlage – Titel, Beschreibung, Dauer, Räume und Ressourcen –, sodass häufig angelegte Ereignisse jedes Mal gleich eingerichtet werden.

### Eine Vorlage hinzufügen {#adding-a-template}

1. Klicken Sie auf den Reiter **Vorlagen** und dann auf **Vorlage hinzufügen**.
2. Geben Sie einen **Vorlagennamen** ein (wird bei der Auswahl einer Vorlage angezeigt).
3. Füllen Sie **Ereignistitel**, **Ereignisbeschreibung** und **Dauer (Minuten)** aus, die für neue Ereignisse verwendet werden.
4. Wählen Sie optional die **Räume** und **Ressourcen** aus, die gebucht werden sollen.
5. Klicken Sie auf **Speichern**.

Wenn Sie ein neues Ereignis anlegen, wählen Sie im Feld **Vorlage** des Editors die Vorlage, um Titel, Beschreibung, Räume und Ressourcen zu übernehmen und die Endzeit anhand der Dauer der Vorlage festzulegen (legen Sie zuerst den **Beginn** fest). Die **Gruppe** des Ereignisses wählen Sie weiterhin selbst. Das Feld **Vorlage** erscheint erst, wenn mindestens eine Vorlage existiert.

## Verwandte Artikel {#related-articles}

- [Verfügbarkeitskalender](./availability.md) — alle Buchungen auf einen Blick sehen und Räume oder Ressourcen direkt buchen
- [Kalender-Genehmigungen](./approvals.md) — Buchungsanfragen für Räume und Ressourcen genehmigen oder ablehnen
- [Kalender erstellen](./creating-calendars.md) — Ereigniskalender einrichten
- [Gruppen erstellen](../groups/creating-groups.md) — Gruppen einrichten, die Räume und Ressourcen buchen können
