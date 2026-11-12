---
title: "Subsplash"
description: "Verbinden Sie Subsplash-Spenden, neue Personen und Formularantworten über Zapier mit B1, damit Gaben und Profile automatisch in B1 Admin landen."
---

# Subsplash

<div class="article-intro">

Wenn Sie Subsplash für Ihre Gemeinde-App, für Spenden oder für Formulare nutzen, B1 aber als führendes System für Personen und Spenden verwenden möchten, kann die Zapier-App von Subsplash Spenden, neue Profile und Formularantworten in Echtzeit in B1 einspeisen. Beachten Sie, dass die Zapier-App von Subsplash derzeit **nur Auslöser** unterstützt – die Verbindung läuft nur in eine Richtung (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Subsplash-Konto mit einem Tarif, der **API- + Zapier-Zugang** enthält (fragen Sie Ihren Client Success Manager bei Subsplash nach – diese Funktionen hängen vom Tarif ab)
- Ein [Zapier](https://zapier.com)-Konto
- Ein B1Admin-Benutzer mit der Berechtigung **Einstellungen bearbeiten**

</div>

## Was Sie verbinden können {#what-you-can-wire-up}

Alle unten genannten Auslöser stammen von Subsplash. Die Aktionen stammen aus B1.

| Auslöser bei Subsplash | Aktion in B1 |
|---|---|
| Neue Spende | Person suchen → Spende hinzufügen (Person erstellen, falls sie fehlt) |
| Neues Versprechen (Pledge) | Spende hinzufügen (mit `notes` = „Pledge: …“) |
| Neue Person angelegt | Person erstellen |
| Profil einer Person aktualisiert | (keine direkte Aktion in B1 – zur manuellen Prüfung in einer Google Tabelle protokollieren) |
| Neue Formularantwort | Person erstellen + (optional) Gruppenmitglied hinzufügen, abhängig vom Formular |

Subsplash → B1 ist derzeit die einzige Richtung, die die App von Subsplash unterstützt.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel erstellen {#1-mint-a-b1-api-key}

In B1Admin: **Einstellungen → Entwickler → API-Schlüssel → Neuer API-Schlüssel**. Berechtigungen:

- `people:read` – um den Spender anhand der E-Mail-Adresse nachzuschlagen
- `people:write` – um ihn anzulegen, falls er nicht existiert
- `donations:write` – um die Gabe zu erfassen
- `settings:write` – Zapier prüft beim Verbinden jeden B1-Schlüssel gegen die Webhook-Liste von B1; ohne diese Berechtigung schlägt die Verbindung fehl (auch wenn hier Subsplash und nicht B1 den Auslöser besitzt)

### 2. Subsplash mit Zapier verbinden {#2-connect-subsplash-to-zapier}

Folgen Sie dem [Leitfaden zur Zapier-Integration von Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash stellt im Subsplash-Dashboard ein API-Token aus, mit dem Zapier den Auslöser authentifiziert.

### 3. Den Zap „Spende erfassen“ erstellen {#3-build-the-record-a-donation-zap}

1. **Auslöser** – Subsplash: Neue Spende
2. **Aktion** – B1.church: Person suchen (anhand der E-Mail-Adresse)
3. **Aktion** – B1.church: Spende hinzufügen, mit der Personen-ID aus Schritt 2. Ordnen Sie Betrag, Datum, Fonds zu, setzen Sie Methode = „Online“ und Notizen = Transaktions-ID von Subsplash.

Die Funktion *Person suchen* von B1 bricht den Zap mit dem Fehler „No person found“ ab, wenn niemand passt. Daher kann ein Filter- oder Pfadschritt nicht darauf verzweigen. Um Erstspender zu behandeln, aktivieren Sie die Fehlerbehandlung von Zapier für den Schritt Person suchen und führen Sie im Fehlerpfad B1.church: Person erstellen → B1.church: Spende hinzufügen aus (mit der ID der neu angelegten Person).

Schalten Sie den Zap ein. Künftige Spenden über Subsplash landen innerhalb von Sekunden unter **B1Admin → Spenden**.

## Häufige Rezepte {#common-recipes}

### Dank senden, wenn die erste Gabe eingeht {#send-a-thank-you-when-a-first-time-gift-lands}

- **Auslöser** – Subsplash: Neue Spende
- **Aktion** – Filter von Zapier: nur fortfahren, wenn es die erste Gabe des Spenders ist (verwenden Sie eine *Nachschlagetabelle* zur E-Mail-Adresse des Spenders gegen eine Google Tabelle mit früheren Gebern oder einen Zapier-Schritt *Pfade* auf das Erstellungsdatum des Spenders)
- **Aktion** – Mailchimp / SMTP / SendGrid: Dank-Nachricht für die erste Gabe senden
- **Aktion** – B1.church: Spende hinzufügen (wie üblich)

### Versprechen aus dem regulären Spendenfluss herausfiltern {#filter-pledges-off-the-regular-giving-flow}

- **Auslöser** – Subsplash: Neues Versprechen (Pledge)
- **Aktion** – B1.church: Spende hinzufügen mit `notes = "Pledge — Subsplash"` und einem Fonds namens `Pledges` (getrennt von Ihrem Betriebsfonds), damit Sie Versprechen unabhängig in **B1Admin → Spenden → Übersicht** auswerten können.

### Neue App-Nutzer als B1-Personen synchronisieren {#sync-new-app-users-as-b1-people}

- **Auslöser** – Subsplash: Neue Person angelegt
- **Aktion** – B1.church: Person erstellen und Name, E-Mail-Adresse, Telefon übernehmen. Kennzeichnen Sie sie in B1, indem Sie die neue Person einer Gruppe wie „Subsplash-App-Nutzer“ hinzufügen.

## Einschränkungen und Hinweise {#limits--notes}

- **Die Zapier-App von Subsplash unterstützt nur Auslöser.** Wenn Sie Änderungen in B1 auch an Subsplash weitergeben möchten (z. B. dass eine neue B1-Person auch bei Subsplash erscheint), müssten Sie diese Brücke bauen: von den Auslösern der Zapier-App von B1 aus die REST-API von Subsplash über eine eigene Aktion *Webhooks by Zapier — POST* aufrufen. Das ist eine eigene Integration und kein Rezept.
- **Der API-Zugang hängt vom Tarif ab.** Wenn die Zapier-Verbindung mit `403 Forbidden` fehlschlägt, enthält Ihr Subsplash-Tarif vermutlich keinen API-Zugang – wenden Sie sich an Ihren Client Success Manager.
- **Die Zuordnung der Fonds erfolgt manuell.** Subsplash übergibt den Namen einer Kampagne oder Kategorie; B1 benötigt einen eigenen Fonds. Wählen Sie den Fonds entweder über das Dropdown **Fonds** im Schritt Spende hinzufügen oder pflegen Sie eine Zapier-*Nachschlagetabelle*, die Subsplash-Kampagnen B1-Fonds zuordnet.

## Fehlerbehebung {#troubleshooting}

- **Nach einer Spende feuert kein Auslöser** – prüfen Sie im Zapier-Dashboard von Subsplash, ob die Verbindung noch *Verbunden* anzeigt. Wurde das API-Token auf Seiten von Subsplash rotiert, stoppt der Zap stillschweigend; verbinden Sie ihn erneut.
- **B1 *Spende hinzufügen* erfasst die Gabe ohne Fonds** – das Feld **Fonds** war leer oder einem Wert zugeordnet, der keine B1-Fonds-ID ist. Wählen Sie den Fonds im Dropdown **Fonds** des Schritts (es listet die Fonds unter **Spenden → Fonds** in B1Admin auf) oder ordnen Sie eine Nachschlagetabelle zu, die B1-Fonds-IDs ausgibt.
- **Die erste Gabe löst zweimal aus** – Subsplash sendet einen Auslöser gelegentlich erneut, wenn Zapier dessen Bestätigung verpasst hat. Fügen Sie einen *Filter von Zapier* auf die Spenden-ID hinzu (Subsplash sendet sie in den Nutzdaten mit), um Dubletten zu verwerfen.

## Siehe auch {#see-also}

- [Donorbox](./donorbox.md) – dasselbe Rezept-Muster, andere Spendenplattform
- [Zapier (Überblick)](../zapier.md) – die B1-Seite jedes Zapier-Rezepts
- [Leitfaden zur Zapier-Integration von Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Dokumentation von Subsplash)
