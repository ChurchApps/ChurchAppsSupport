---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Wenn Sie Subsplash für Ihre Gemeinde-App, Spenden oder Formulare nutzen, aber B1 als führendes System für Personen und Spenden verwenden möchten, kann die Zapier-App von Subsplash Spenden, neue Profile und Formularantworten in Echtzeit an B1 übermitteln. Beachten Sie, dass die Zapier-App von Subsplash derzeit **nur Auslöser** unterstützt -- die Verbindung ist einseitig (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Subsplash-Konto mit einem Tarif, der **API- + Zapier-Zugang** enthält (fragen Sie Ihren Client Success Manager bei Subsplash nach -- diese Funktionen hängen vom Tarif ab)
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können

Alle unten genannten Auslöser stammen von Subsplash. Die Aktionen stammen von B1.

| Subsplash-Auslöser | B1-Aktion |
|---|---|
| Neue Spende | Person suchen → Spende hinzufügen (Person anlegen, falls sie fehlt) |
| Neues Pledge | Spende hinzufügen (mit `notes` = "Pledge: …") |
| Neue Person erstellt | Person anlegen |
| Profil einer Person aktualisiert | (keine direkte B1-Aktion -- zur manuellen Prüfung in ein Google Sheet protokollieren) |
| Neue Formularantwort | Person anlegen + (optional) Gruppenmitglied hinzufügen, je nach Formular |

Subsplash → B1 ist derzeit die einzige Richtung, die die Subsplash-App unterstützt.

## Einrichtung

### 1. B1-API-Schlüssel erstellen

In B1Admin: **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Bereiche:

- `people:read` -- um den Spender anhand der E-Mail-Adresse zu finden
- `people:write` -- um ihn anzulegen, falls er nicht existiert
- `donations:write` -- um die Gabe zu erfassen
- (`settings:write` ist nicht nötig -- hier gehört der Auslöser Subsplash, nicht B1.)

### 2. Subsplash mit Zapier verbinden

Folgen Sie der [Anleitung zur Zapier-Integration von Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash stellt im Subsplash-Dashboard ein API-Token aus, mit dem Zapier die Auslöserseite authentifiziert.

### 3. Den Zap "Spende erfassen" erstellen

1. **Auslöser** -- Subsplash: Neue Spende
2. **Aktion** -- B1.church: Person suchen (nach E-Mail)
3. **Filter / Pfad** -- verzweigen nach "Person gefunden":
   - **Gefunden:** B1.church: Spende hinzufügen. Betrag, Datum, Fonds und Methode = "Online" zuordnen sowie notes = Transaktions-ID von Subsplash.
   - **Nicht gefunden:** B1.church: Person anlegen → B1.church: Spende hinzufügen (mit der ID der neu angelegten Person).

Schalten Sie den Zap ein. Künftige Spenden aus Subsplash erscheinen innerhalb von Sekunden unter **B1Admin → Spenden**.

## Gängige Anleitungen

### Eine Dankesnachricht senden, wenn eine Erstgabe eingeht

- **Auslöser** -- Subsplash: Neue Spende
- **Aktion** -- Filter von Zapier: nur fortfahren, wenn es die erste Gabe der Spenderin bzw. des Spenders ist (verwenden Sie eine *Suchtabelle* mit der E-Mail-Adresse des Spenders gegen ein Google Sheet mit früheren Gebern oder einen Zapier-Schritt *Pfade* anhand des Erstellungsdatums des Spenders)
- **Aktion** -- Mailchimp / SMTP / SendGrid: Dankesnachricht für die Erstgabe senden
- **Aktion** -- B1.church: Spende hinzufügen (wie üblich)

### Pledges aus dem regulären Spendenfluss herausfiltern

- **Auslöser** -- Subsplash: Neues Pledge
- **Aktion** -- B1.church: Spende hinzufügen mit `notes = "Pledge — Subsplash"` und einem Fonds namens `Pledges` (getrennt von Ihrem Betriebsfonds), damit Sie Pledges unabhängig unter **B1Admin → Spenden → Übersicht** auswerten können.

### Neue App-Nutzer als Personen in B1 synchronisieren

- **Auslöser** -- Subsplash: Neue Person erstellt
- **Aktion** -- B1.church: Person anlegen, mit Name, E-Mail und Telefon. Markieren Sie die Person in B1, indem Sie sie einer Gruppe wie "Subsplash-App-Nutzer" hinzufügen.

## Grenzen und Hinweise

- **Die Zapier-App von Subsplash unterstützt nur Auslöser.** Wenn Änderungen in B1 auch in Subsplash ankommen sollen (z. B. eine neue Person in B1, die auch in Subsplash erscheint), bräuchten Sie eine eigene Brücke: Auslöser der Zapier-App von B1 rufen die REST-API von Subsplash über die benutzerdefinierte Aktion *Webhooks by Zapier — POST* auf. Das ist eine individuelle Integration und keine fertige Anleitung.
- **Der API-Zugang hängt vom Tarif ab.** Wenn die Zapier-Verbindung mit `403 Forbidden` fehlschlägt, enthält Ihr Subsplash-Tarif wahrscheinlich keinen API-Zugang -- wenden Sie sich an Ihren Client Success Manager.
- **Die Fondszuordnung erfolgt manuell.** Subsplash übergibt einen Kampagnen- oder Kategorienamen, B1 benötigt jedoch eine numerische Fonds-ID. Entweder Sie fest im Zap hinterlegen oder Sie pflegen eine *Suchtabelle* in Zapier, die Subsplash-Kampagnen den B1-Fonds zuordnet.

## Fehlerbehebung

- **Nach einer Spende wird kein Auslöser ausgelöst** -- prüfen Sie im Zapier-Dashboard von Subsplash, ob die Verbindung noch als *Verbunden* angezeigt wird. Wurde das API-Token auf Seite von Subsplash erneuert, stoppt der Zap stillschweigend; verbinden Sie ihn neu.
- **B1 *Spende hinzufügen* schlägt mit 422 fehl** -- meistens fehlt die `fundId` oder ist unbekannt. Listen Sie Ihre Fonds unter **B1Admin → Spenden → Fonds** auf und kopieren Sie die genaue ID in den Zap-Schritt.
- **Die erste Gabe löst zweimal aus** -- Subsplash sendet einen Auslöser gelegentlich erneut, wenn Zapier die Bestätigung verpasst hat. Fügen Sie einen *Filter von Zapier* auf die Spenden-ID hinzu (Subsplash sendet sie in den Nutzdaten mit), um Duplikate zu verwerfen.

## Siehe auch

- [Donorbox](./donorbox) -- gleiche Anleitungsform, andere Spendenplattform
- [Zapier (Überblick)](../zapier) -- B1-Seite jeder Zapier-Anleitung
- [Anleitung zur Zapier-Integration von Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Dokumentation von Subsplash)
