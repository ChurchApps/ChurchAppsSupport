---
title: "Gespeicherte Listen"
description: "Speichern Sie eine Personensuche in B1 Admin als benannte Liste und öffnen Sie sie dann mit einem Klick erneut. Listen bleiben aktuell, sodass neu passende Mitglieder automatisch erscheinen."
---

# Gespeicherte Listen

<div class="article-intro">

Mit **Gespeicherte Listen** speichern Sie eine Suchabfrage unter einem Namen und führen sie jederzeit mit einem Klick erneut aus. Erstellen Sie eine Liste einmal -- etwa „Aktive Mitglieder am Standort Nord“, „Besucher der letzten 90 Tage“ oder einen beliebigen erweiterten Filter -- und sie bleibt oben auf der Seite Personen, sodass Sie die Abfrage nie wieder neu aufbauen müssen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Führen Sie mindestens eine Suche im Bereich Personen aus, damit Sie Ergebnisse zum Speichern haben. Siehe [Personen suchen](./searching-people.md) oder [KI-Suche](./ai-search.md).
- Zum Speichern, Ändern und Löschen von Listen benötigen Sie die Berechtigung **Personen bearbeiten**. Siehe [Rollen zuweisen](./roles-permissions.md).

</div>

## Eine Suche als Liste speichern {#saving-a-search-as-a-list}

1. Führen Sie auf der Seite **Personen** eine Suche aus -- eine Schnellsuche, eine KI-Suche oder eine Suche mit erweitertem Filter.
2. Sobald die Suche mindestens eine Person findet, erscheint im Seitenkopf der Seite Personen die Schaltfläche **Als Liste speichern**.
3. Klicken Sie auf **Als Liste speichern**.
4. Geben Sie einen **Listennamen** ein (erforderlich).
5. Optional geben Sie eine **Kategorie** ein, um zusammengehörige Listen zu gruppieren (zum Beispiel „Öffentlichkeitsarbeit“ oder „Mitgliedschaft“).
6. Unter **Wer kann diese Liste sehen** wählen Sie **Alle Mitarbeitenden** oder **Nur ich**.
7. Unter **Passend** wählen Sie **Alle Filter** (Personen müssen jeden Filter erfüllen) oder **Beliebiger Filter** (Personen, die mindestens einen Filter erfüllen).
8. Unter **Haushalt einbeziehen** wählen Sie **Nur Treffer**, **Kinder der Treffer** (fügt zusätzlich die Kinder im Haushalt jeder passenden Person hinzu) oder **Gesamter Haushalt** (fügt alle Personen im Haushalt jeder passenden Person hinzu).
9. Optional aktivieren Sie **Nächtlich aktualisieren** (siehe unten [Nächtliche Aktualisierung](#nightly-refresh)). Ist sie aktiviert, können Sie zusätzlich **Mich bei Änderungen der Mitgliedschaft per E-Mail benachrichtigen** aktivieren.
10. Klicken Sie auf **Speichern**.

Die Liste ist nun gespeichert und erscheint als Schaltfläche in der Reihe gespeicherter Listen oben auf der Seite Personen, neben **Alle**. Listen mit der Einstellung **Nur ich** zeigen ein kleines Schloss-Symbol.

:::info
Listen mit der Einstellung **Alle Mitarbeitenden** werden in Ihrer Gemeinde geteilt -- jeder mit Zugriff auf Personen kann sie sehen und öffnen. Nur Mitarbeitende mit der passenden Berechtigung können Listen ändern oder löschen.
:::

## Eine gespeicherte Liste öffnen {#loading-a-saved-list}

Klicken Sie oben auf der Seite Personen auf einen beliebigen Listennamen. Die Suche wird mit der gespeicherten Abfrage sofort erneut ausgeführt und aktualisiert die Ergebnisse. Klicken Sie auf **Alle**, um zu Ihrem gesamten Verzeichnis zurückzukehren.

Listen werden nach Kategorie gruppiert (sofern Sie eine zugewiesen haben), Listen ohne Kategorie erscheinen zuletzt.

:::tip
Listen sind **Live-Abfragen**, keine Momentaufnahmen. Jedes Mal, wenn Sie eine Liste öffnen, läuft die Suche frisch mit Ihren aktuellen Daten, sodass neu passende Personen erscheinen.
:::

## Listen umbenennen und löschen {#renaming-and-deleting-lists}

Mitarbeitende mit Verwaltungsberechtigung können jede Liste auf der Seite Personen umbenennen oder löschen. Öffnen Sie dazu zuerst die Liste per Klick -- danach erscheinen neben ihrem Namen zwei Symbole:

- Klicken Sie auf das Symbol **Listeneinstellungen** (Zahnrad), um sie umzubenennen oder Kategorie und Freigabe zu ändern. Listen, die mit diesen Optionen gespeichert wurden, können hier außerdem **Haushalt einbeziehen**, **Nächtlich aktualisieren** und **Mich bei Änderungen der Mitgliedschaft per E-Mail benachrichtigen** ändern. Die Einstellung **Passend** kann nach dem Speichern der Liste nicht mehr geändert werden.
- Klicken Sie auf das Symbol **Löschen** (Papierkorb), um sie zu löschen (Sie werden um eine Bestätigung gebeten).

## Nächtliche Aktualisierung {#nightly-refresh}

Beim Öffnen einer Liste wird ihre Suche immer frisch ausgeführt, unabhängig davon, ob **Nächtlich aktualisieren** aktiviert ist. **Nächtlich aktualisieren** sorgt zusätzlich dafür, dass B1 die Liste jede Nacht erneut ausführt und festhält, wer hinzugekommen oder ausgeschieden ist. Haben Sie **Mich bei Änderungen der Mitgliedschaft per E-Mail benachrichtigen** aktiviert, sendet B1 Ihnen (der Person, die die Liste gespeichert hat) nach einer nächtlichen Aktualisierung, bei der Personen hinzugefügt oder entfernt wurden, eine E-Mail mit der Anzahl der hinzugefügten und entfernten Personen. Die nächtliche Aktualisierung übermittelt Änderungen der Listenmitgliedschaft außerdem an Ihre [Integrationen](../integrations/index.md), etwa Mailchimp-Markierungen.

## Anwendungsfälle {#use-cases}

| Szenario | So erstellen Sie die Liste |
|---|---|
| Alle Besucher | Erweiterte Suche: Mitgliedschaftsstatus = Besucher |
| Mitglieder an einem bestimmten Standort | Erweiterte Suche: Standort = [Ihr Standort] |
| Ehrenamtliche mit abgelaufener Hintergrundprüfung | Erweiterte Suche: [Eigenes Feld](../settings/custom-fields.md) „Hintergrundprüfung läuft ab“ liegt vor heute |
| Ergebnisse einer KI-Frage | Stellen Sie in der KI-Suche eine Frage und speichern Sie dann |

## Verwandte Artikel {#related-articles}

- [Personen suchen](./searching-people.md) — Schnellsuche und Anpassung der Spalten
- [KI-Suche](./ai-search.md) — Abfragen in natürlicher Sprache, die Sie als Listen speichern können
- [Eigene Felder](../settings/custom-fields.md) — eigene Personenfelder definieren und danach Listen darauf filtern und speichern
- [Demografie](./demographics.md) — ein Demografie-Diagramm in einen Personenfilter überführen und als Liste speichern
- [Personen gesammelt bearbeiten](./bulk-editing.md) — nach dem Öffnen einer Liste alle ihre Mitglieder auf einmal aktualisieren
