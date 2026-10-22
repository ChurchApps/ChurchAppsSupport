---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Wenn Sie Subsplash für Ihre Kirchen-App, Spenden oder Formulare verwenden, B1 aber als führendes System für Personen und Spenden nutzen möchten, kann die Zapier-App von Subsplash Spenden, neue Profile und Formularantworten in Echtzeit an B1 weiterleiten. Beachten Sie, dass die Zapier-App von Subsplash derzeit nur **Auslöser** unterstützt – die Verbindung funktioniert nur in eine Richtung (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Subsplash-Konto mit einem Tarif, der den Zugang zu **API und Zapier** einschließt (fragen Sie Ihren Client Success Manager bei Subsplash nach – dies hängt vom Tarif ab)
- Ein [Zapier](https://zapier.com)-Konto
- Ein Benutzer in B1Admin mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können

Alle Auslöser unten stammen von Subsplash. Die Aktionen stammen von B1.

| Auslöser in Subsplash | Aktion in B1 |
|---|---|
| Neue Spende | Person suchen → Spende hinzufügen (Person anlegen, falls sie fehlt) |
| Neues Versprechen (Pledge) | Spende hinzufügen (mit `notes` = „Pledge: …“) |
| Neue Person angelegt | Person anlegen |
| Profil einer Person aktualisiert | (keine direkte Aktion in B1 – zur manuellen Prüfung in einer Google Tabelle protokollieren) |
| Neue Formularantwort | Person anlegen + (optional) Gruppenmitglied hinzufügen, abhängig vom Formular |

Derzeit unterstützt die App von Subsplash nur die Richtung Subsplash → B1.

## Einrichtung

### 1. Einen API-Schlüssel von B1 erstellen

Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Scopes:

- `people:read` – um Spender anhand der E-Mail-Adresse zu finden
- `people:write` – um sie anzulegen, falls sie nicht existieren
- `donations:write` – um die Gabe zu erfassen
- (`settings:write` ist nicht nötig – den Auslöser verwaltet hier Subsplash, nicht B1.)

### 2. Subsplash mit Zapier verbinden

Folgen Sie der [Anleitung zur Zapier-Integration von Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash stellt im Subsplash-Dashboard ein API-Token aus, mit dem Zapier den Auslöser authentifiziert.

### 3. Den Zap „Spende erfassen“ erstellen

1. **Auslöser** – Subsplash: Neue Spende
2. **Aktion** – B1.church: Person suchen (per E-Mail)
3. **Filter / Pfad** – verzweigen Sie nach „Person gefunden“:
   - **Gefunden:** B1.church: Spende hinzufügen. Ordnen Sie Betrag, Datum, Fonds und Methode = „Online“ zu sowie `notes` = Transaktions-ID von Subsplash.
   - **Nicht gefunden:** B1.church: Person anlegen → B1.church: Spende hinzufügen (mit der ID der neu angelegten Person).

Schalten Sie den Zap ein. Künftige Spenden über Subsplash erscheinen innerhalb von Sekunden unter **B1Admin → Spenden**.

## Übliche Rezepte

### Einen Dank senden, wenn eine Erstgabe eingeht

- **Auslöser** – Subsplash: Neue Spende
- **Aktion** – Filter von Zapier: nur fortfahren, wenn es die erste Gabe des Spenders ist (verwenden Sie eine *Nachschlagetabelle* mit der E-Mail-Adresse des Spenders gegen eine Google Tabelle mit früheren Spendern oder einen Zapier-Schritt *Pfade* anhand des Erstellungsdatums des Spenders)
- **Aktion** – Mailchimp / SMTP / SendGrid: Dankes-Nachricht für die Erstgabe senden
- **Aktion** – B1.church: Spende hinzufügen (wie gewohnt)

### Versprechen (Pledges) von der regulären Spendenabwicklung trennen

- **Auslöser** – Subsplash: Neues Versprechen
- **Aktion** – B1.church: Spende hinzufügen mit `notes = "Pledge — Subsplash"` und einem Fonds namens `Pledges` (getrennt von Ihrem laufenden Fonds), damit Sie Versprechen unabhängig davon unter **B1Admin → Spenden → Übersicht** auswerten können.

### Neue App-Nutzer als Personen in B1 übernehmen

- **Auslöser** – Subsplash: Neue Person angelegt
- **Aktion** – B1.church: Person anlegen und Name, E-Mail-Adresse und Telefon übernehmen. Markieren Sie die Person in B1, indem Sie sie einer Gruppe wie „Subsplash-App-Nutzer“ hinzufügen.

## Grenzen und Hinweise

- **Die Zapier-App von Subsplash unterstützt nur Auslöser.** Wenn eine neue Person in B1 auch in Subsplash erscheinen soll, müssten Sie diese Brücke selbst bauen: Ein Auslöser aus der Zapier-App von B1 ruft über die Aktion *Webhooks by Zapier — POST* die REST-API von Subsplash auf. Das ist eine eigene Integration und kein fertiges Rezept.
- **Der API-Zugang hängt vom Tarif ab.** Schlägt die Zapier-Verbindung mit `403 Forbidden` fehl, enthält Ihr Subsplash-Tarif wahrscheinlich keinen API-Zugang. Wenden Sie sich an Ihren Client Success Manager.
- **Die Zuordnung der Fonds erfolgt manuell.** Subsplash übermittelt einen Kampagnen- oder Kategorienamen, B1 benötigt aber eine numerische Fonds-ID. Entweder legen Sie den Fonds fest im Zap fest oder Sie pflegen eine Zapier-*Nachschlagetabelle*, die Subsplash-Kampagnen den Fonds in B1 zuordnet.

## Fehlerbehebung

- **Nach einer Spende wird kein Auslöser ausgelöst** – prüfen Sie im Zapier-Dashboard von Subsplash, ob die Verbindung noch als *Verbunden* angezeigt wird. Wurde das API-Token auf der Seite von Subsplash erneuert, stoppt der Zap stillschweigend; verbinden Sie ihn neu.
- **B1 *Spende hinzufügen* schlägt mit 422 fehl** – meist fehlt die `fundId` oder ist unbekannt. Listen Sie Ihre Fonds über **B1Admin → Spenden → Fonds** auf und kopieren Sie die genaue ID in den Zap-Schritt.
- **Die erste Gabe löst zweimal aus** – Subsplash sendet einen Auslöser gelegentlich erneut, wenn Zapier die Bestätigung verpasst hat. Fügen Sie einen *Filter von Zapier* auf die Spenden-ID hinzu (Subsplash sendet sie in den Nutzdaten), um Dubletten zu verwerfen.

## Siehe auch

- [Donorbox](./donorbox) – gleicher Aufbau des Rezepts, andere Spendenplattform
- [Zapier (Überblick)](../zapier) – B1-Seite jedes Zapier-Rezepts
- [Anleitung zur Zapier-Integration von Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Dokumentation von Subsplash)
