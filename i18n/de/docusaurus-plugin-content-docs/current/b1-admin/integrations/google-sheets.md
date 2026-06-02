---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** ist das offizielle Google Sheets Add-on für B1.church. Es fügt jeder Tabelle eine Seitenleiste hinzu, die Personen, Spenden, Gruppen oder Anwesenheit aus Ihrer B1 Gemeinde in benannte Reiter exportiert – auf Abruf, mit nur einem Klick. Das Add-on läuft vollständig im Google-Konto des Benutzers; nichts daran berührt ChurchApps-Server außer den schreibgeschützten API-Aufrufen, die jeder Export tätigt.

</div>

<div class="prereqs">
<h4>Bevor Sie Beginnen</h4>

- Ein Google-Konto mit Bearbeitungszugriff auf die Tabelle, die Sie exportieren möchten
- Ein Gemeinde-Admin (oder jemand mit Lesezugriff auf die Daten, die Sie exportieren möchten) kann einen B1 API-Schlüssel erstellen
- Das B1 Export Add-on, das aus dem Google Workspace Marketplace installiert ist

</div>

## Was es exportiert

| Menüeintrag | Sheet-Reiter | Daten |
|---|---|---|
| Personen exportieren | `B1 People` | ID, Anzeigename, Vorname, Nachname, E-Mail, Mitgliedschaftsstatus |
| Spenden exportieren | `B1 Donations` | ID, Personen-ID, Datum, Betrag, Methode, Batch-ID |
| Gruppen exportieren | `B1 Groups` | ID, Name, Kategorie, Mitgliederzahl |
| Anwesenheit exportieren | `B1 Attendance` | ID, Personen-ID, Besuchsdatum, Service-ID, Gruppen-ID |

Jeder Export **ersetzt** den Inhalt seines benannten Reiters – das erneute Ausführen eines Exports ergibt eine frische Momentaufnahme, nicht angehängte Reihen. Andere Reiter in der Tabelle bleiben unberührt.

## Setup

### 1. Erstellen Sie einen B1 API-Schlüssel mit den richtigen Geltungsbereichen

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, geben Sie ihm den Namen „Sheets Export" und gewähren Sie die **Lese**-Geltungsbereiche für alles, das Sie exportieren möchten:
   - `people:read` für den Personen-Export
   - `donations:read` für Spenden
   - `groups:read` für Gruppen
   - `attendance:read` für Anwesenheit
3. Ein Schlüssel, der nur Exporte tätigt, benötigt **nicht** `settings:write` – dieser Geltungsbereich ist nur für Connectors, die Webhooks registrieren (Zapier / Make). Halten Sie diesen Schlüssel eng.
4. Speichern und kopieren Sie den `cak_…`-Schlüssel.

### 2. Installieren Sie das Add-on

1. Öffnen Sie die Tabelle, in die Sie exportieren möchten.
2. **Erweiterungen → Add-ons → Add-ons abrufen**.
3. Suchen Sie nach **B1 Export** und installieren Sie es. Google fordert Sie auf, Zugriff auf Ihre Sheets und auf externe HTTP zu gewähren (damit das Add-on die B1 API aufrufen kann).

Nach der Installation erscheint ein **B1 Export**-Eintrag unter dem Menü **Erweiterungen** jeder Tabelle, die Sie mit diesem Google-Konto öffnen.

### 3. Verbinden Sie den Schlüssel

1. **Erweiterungen → B1 Export → Verbinden…** (oder **B1 Export → Verbinden…** aus der Menüleiste nach dem ersten Öffnen).
2. Fügen Sie den API-Schlüssel in die Seitenleiste ein, lassen Sie die Basis-URL als `https://api.churchapps.org` (es sei denn, Sie testen gegen Staging) und klicken Sie auf **Speichern**.
3. Klicken Sie auf **Verbindung testen** – ein grünes „Verbindung OK" bestätigt, dass der Schlüssel funktioniert.

Der Schlüssel wird in **Pro-Benutzer-Eigenschaften** (`PropertiesService.getUserProperties()`) gespeichert – er ist an Ihr Google-Konto gebunden, wird nie in die Tabelle geschrieben und ist für andere Bearbeiter der Tabelle nie sichtbar.

## Führen Sie einen Export aus

Entweder:

- **Aus dem Menü** – **Erweiterungen → B1 Export → Personen exportieren** (oder Spenden / Gruppen / Anwesenheit)
- **Aus der Seitenleiste** – Öffnen Sie die Seitenleiste (Verbinden…) und klicken Sie auf die entsprechende Schaltfläche für den Datensatz

Ein Toast bestätigt, wenn es fertig ist – „_N_ Zeile(n) in ‚B1 People' geschrieben."

## Berichte auf Basis aufbauen

Die exportierten Reiter sind einfache Google Sheets-Daten. Erstellen Sie Ihre eigenen Analysen auf Referenztabs:

- Ein **Zusammenfassungs-Reiter** mit `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` um Kartenschenkungen zu summieren
- Eine **gefilterte Ansicht** nur Mitglieder mit `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Ein **Diagramm** der Anwesenheitstrends von `B1 Attendance`

Das erneute Ausführen des Exports aktualisiert den zugrunde liegenden Reiter; Ihre Formeln aktualisieren sich automatisch.

## Wiederkehrende Exporte planen

Das Add-on ist standardmäßig auf Abruf. Für wöchentliche oder monatliche Exporte verwenden Sie die zeitgesteuerten Trigger von Apps Script:

1. **Erweiterungen → Apps Script** in der Tabelle (dies öffnet das gebundene Script des Add-ons).
2. Klicken Sie auf das **⏰ Trigger**-Symbol in der linken Seitenleiste.
3. **Trigger hinzufügen** für `exportPeople` (oder eine andere Export-Funktion) – wählen Sie *Zeitgesteuert*, *Wochen-Timer*, z.B. *Jeden Montag 6 Uhr*.

Der Export läuft im Hintergrund unter Ihrem Google-Konto. Wenn der API-Schlüssel rotiert oder widerrufen wird, sendet der Trigger Ihnen eine E-Mail, wenn er das nächste Mal fehlschlägt.

## Berechtigungen & Datenschutz

- Das Add-on fordert nur `spreadsheets.currentonly` an (es kann nur die Tabelle berühren, in die es geöffnet ist) und `script.external_request` (damit `UrlFetchApp` die B1 API aufrufen kann). Es sieht **nicht** Ihr Drive, Gmail oder andere Google-Daten.
- Der B1 API-Schlüssel wird pro Benutzer gespeichert – andere Bearbeiter derselben Tabelle können ihn nicht sehen.
- Alle B1 API-Aufrufe werden über HTTPS mit `Authorization: Bearer cak_…` getätigt.

## Fehlerbehebung

- **„Kein API-Schlüssel gesetzt"** – öffnen Sie **Erweiterungen → B1 Export → Verbinden…** und fügen Sie den Schlüssel ein.
- **„B1 hat den API-Schlüssel abgelehnt (401)"** – der Schlüssel wurde widerrufen oder ist falsch. Erstellen Sie ihn neu und fügen Sie ihn erneut ein.
- **„Dieser API-Schlüssel hat keine Berechtigung für /giving/donations (403)"** – der Schlüssel hat nicht `donations:read`. Aktualisieren Sie die Geltungsbereiche des Schlüssels in B1Admin.
- **Tabelle wird nach dem Ausführen nicht aktualisiert** – stellen Sie sicher, dass Sie den *richtigen* Reiternamen (`B1 People` usw.) ansehen. Der Export erstellt den Reiter, wenn er nicht existierte.
- **„Kontingent überschritten"** – Apps Script legt tägliche Pro-Benutzer-Kontingente für `UrlFetchApp` auf (normalerweise tausende Aufrufe pro Tag). Eine große Gemeinde mit vielen Aufzeichnungen muss möglicherweise Exporte auf mehrere Tage verteilen oder [Make](./make) / eine benutzerdefinierte Integration für Hochvolumen-Sync verwenden.

## Das Add-on anpassen

Das Add-on ist Open Source – das Apps Script-Projekt lebt im Repository `B1Integrations/GoogleSheetsAddon/`. Wenn Sie eine Spalte möchten, die wir nicht exportieren, einen zusätzlichen Datensatz oder ein anderes Ausgabeformat benötigen, öffnen Sie ein Problem oder PR dort.

## Siehe auch

- [Zapier](./zapier) – für Echtzeitsyncs statt Abruf-Export
- [Make](./make) – für Sync mit komplexeren Transformationen
- [API-Schlüssel (Entwickler-Referenz)](/docs/developer/api/api-keys)
