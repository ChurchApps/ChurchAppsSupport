---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Die offizielle B1.church-App auf Zapier ermöglicht einem Zap, auf Ereignisse in deiner Kirche zu reagieren (neue Person, neue Spende, neues Gruppenmitglied, ...) und Datensätze an B1 zurückzuschreiben. Kein Coding, keine Infrastruktur - du verdrahteste es im Drag-and-Drop-Editor von Zapier, fügst einen API-Schlüssel ein und aktivierst den Zap.

</div>

<div class="prereqs">
<h4>Bevor du beginnst</h4>

- Ein [Zapier](https://zapier.com)-Konto (der kostenlose Tarif reicht für eine Handvoll Zaps)
- Ein Kirchenadmin mit der Berechtigung **Einstellungen bearbeiten** in B1Admin (du wirst einen API-Schlüssel erstellen)
- Eine Vorstellung davon, was du tun möchtest - z. B. "wenn eine Person in B1 hinzugefügt wird, füge sie zu meiner Mailchimp-Liste hinzu"

</div>

## Trigger und Aktionen

| Typ | Was | B1 Ereignis / Endpunkt |
|---|---|---|
| **Trigger** | Neue Person | `person.created` |
| **Trigger** | Aktualisierte Person | `person.updated` |
| **Trigger** | Neue Spende | `donation.created` |
| **Trigger** | Neues Gruppenmitglied | `group.member.added` |
| **Trigger** | Neue Formulareinreichung | `form.submission.created` |
| **Aktion** | Person erstellen | fügt eine neue Person hinzu |
| **Aktion** | Spende hinzufügen | erfasst eine Spende |
| **Aktion** | Gruppenmitglied hinzufügen | fügt eine Person zu einer Gruppe hinzu |
| **Aktion** | Person suchen | sucht eine Person nach ID, E-Mail oder Name; wenn niemand übereinstimmt, schlägt die Aufgabe fehl |

Kombiniere diese frei mit einer beliebigen von Zapier's 7.000+ unterstützten Apps.

## Einrichtung

### 1. Erstelle einen B1 API-Schlüssel

1. Gehe in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicke auf **Neuer API-Schlüssel**, gib ihm einen Namen wie "Zapier" und wähle die Scopes aus, die der Zap benötigt.
3. **Wichtig:** Zapier-Trigger registrieren einen Webhook in deinem Namen, wenn der Zap aktiviert wird, was den Scope **`settings:write`** erfordert. Beziehe immer `settings:write` ein, wenn einer deiner Zaps einen B1-Trigger verwendet.
4. Gewähre auch die Scopes, die die Aktionen benötigen - z. B. eine Aktion "Spende hinzufügen" benötigt `donations:write`, "Person erstellen" benötigt `people:write`.
5. Speichern. Der vollständige `cak_…` Schlüssel wird **einmal** angezeigt - kopiere ihn.

### 2. Verbinde Zapier mit B1

1. In Zapier, baue einen neuen Zap.
2. Wenn du zum ersten Mal einen B1-Trigger oder eine Aktion auswählst, fragt Zapier dich auf, dich **bei B1.church anzumelden**.
3. Füge den API-Schlüssel aus Schritt 1 ein und klicke auf **Ja, Weiter**. Zapier validiert ihn gegen deine Kirche.

Die Verbindung wird in Zapier gespeichert und von jedem Zap auf deinem Konto wiederverwendet.

### 3. Erstelle den Zap

Wähle einen Trigger und füge dann eine oder mehrere Aktionsschritte hinzu. Beispiele unten.

## Häufige Rezepte

### Füge neue B1-Personen zu Mailchimp hinzu

- **Trigger** — B1: Neue Person
- **Aktion** — Mailchimp: Abonnenten hinzufügen/aktualisieren. Ordne B1's `name__first`, `name__last`, `contactInfo__email` in Mailchimp's Vorname / Nachname / E-Mail-Felder.

### Poste Spenden mit einer reicheren Karte als der eingebauten Connector in einen Slack-Kanal

- **Trigger** — B1: Neue Spende
- **Aktion** — Slack: Kanalnachricht senden. Verfasse ein Layout - Schaltflächen, Anhänge usw. -, das der eingebaute [Slack-Connector](./slack-discord) nicht kann.

### Füge neue Gruppenmitglieder zu einer Google Group hinzu

- **Trigger** — B1: Neues Gruppenmitglied (gefiltert auf eine bestimmte `groupId`)
- **Aktion** — Nach Zapier filtern: fortfahren nur, wenn die B1-Gruppe diejenige ist, an der dir liegt
- **Aktion** — B1: Person suchen (verwende die Personen-ID des Triggers, um die E-Mail zu abrufen)
- **Aktion** — Google Groups: Mitglied hinzufügen

### Leite Formulareinreichungen an einen Projekt-Tracker weiter
