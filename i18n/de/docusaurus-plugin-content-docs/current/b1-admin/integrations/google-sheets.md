---
title: "Google Tabellen"
description: "Verbinden Sie B1 Admin mit Google Tabellen über das Add-on B1 Export, um Personen, Spenden, Gruppen und Anwesenheit bei Bedarf in Tabellenreiter zu übernehmen."
---

# Google Tabellen

<div class="article-intro">

**B1 Export** ist das offizielle Add-on für Google Tabellen für B1.church. Es fügt jeder Tabelle eine Seitenleiste hinzu, mit der Sie Personen, Spenden, Gruppen oder Anwesenheit aus Ihrer B1-Gemeinde in benannte Reiter exportieren können – bei Bedarf, mit einem Klick. Das Add-on läuft vollständig im Google-Konto des Benutzers; abgesehen von den schreibgeschützten API-Aufrufen, die jeder Export ausführt, berührt es die Server von ChurchApps nicht.

</div>

:::caution Noch nicht verfügbar
Das Add-on B1 Export ist noch nicht im Google Workspace Marketplace veröffentlicht, daher können Sie es derzeit nicht installieren. Exportieren Sie Personen bis dahin aus B1Admin (siehe [Daten exportieren](../people/exporting-data.md)) und importieren Sie die CSV-Datei in Google Tabellen. Alles Folgende beschreibt, wie das Add-on nach der Veröffentlichung funktionieren wird.
:::

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Ein Google-Konto mit Bearbeitungszugriff auf die Tabelle, in die Sie exportieren möchten
- Eine Gemeindeadministration (oder eine Person mit Lesezugriff auf die Daten, die Sie exportieren möchten), die einen B1-API-Schlüssel erstellen kann
- Das Add-on B1 Export, installiert aus dem Google Workspace Marketplace

</div>

## Was exportiert wird {#what-it-exports}

| Menüpunkt | Tabellenreiter | Daten |
|---|---|---|
| Personen exportieren | `B1 People` | ID, Anzeigename, Vorname, Nachname, E-Mail, Mitgliedschaftsstatus |
| Spenden exportieren | `B1 Donations` | ID, Personen-ID, Datum, Betrag, Methode, Charge-ID |
| Gruppen exportieren | `B1 Groups` | ID, Name, Kategorie, Anzahl Mitglieder |
| Anwesenheit exportieren | `B1 Attendance` | ID, Personen-ID, Besuchsdatum, Gottesdienst-ID, Gruppen-ID |

Jeder Export **ersetzt** den Inhalt seines benannten Reiters – ein erneuter Export liefert einen aktuellen Stand, keine angehängten Zeilen. Andere Reiter in der Tabelle bleiben unverändert.

## Einrichtung {#setup}

### 1. Einen B1-API-Schlüssel mit den richtigen Berechtigungen erstellen {#1-create-a-b1-api-key-with-the-right-scopes}

1. Gehen Sie in B1Admin zu **Einstellungen → Entwickler → API-Schlüssel**.
2. Klicken Sie auf **Neuer API-Schlüssel**, benennen Sie ihn „Tabellen-Export“ und vergeben Sie die **Lese**-Berechtigungen für alles, was Sie exportieren möchten:
   - `people:read` für den Export der Personen
   - `donations:read` für Spenden
   - `groups:read` für Gruppen
   - `attendance:read` für Anwesenheit
3. Ein Schlüssel, der nur für Exporte dient, benötigt **kein** `settings:write` – diese Berechtigung ist nur für Connectors gedacht, die Webhooks registrieren (Zapier / Make). Halten Sie diesen Schlüssel eng begrenzt.
4. Speichern Sie und kopieren Sie den Schlüssel `cak_…`.

### 2. Das Add-on installieren {#2-install-the-add-on}

1. Öffnen Sie die Tabelle, in die Sie exportieren möchten.
2. **Erweiterungen → Add-ons → Add-ons abrufen**.
3. Suchen Sie nach **B1 Export** und installieren Sie es. Google bittet Sie, den Zugriff auf Ihre Tabellen und auf externe HTTP-Anfragen zu erlauben (damit das Add-on die B1-API aufrufen kann).

Nach der Installation erscheint ein Eintrag **B1 Export** im Menü **Erweiterungen** jeder Tabelle, die Sie mit diesem Google-Konto öffnen.

### 3. Den Schlüssel verbinden {#3-connect-the-key}

1. **Erweiterungen → B1 Export → Verbinden…** (oder **B1 Export → Verbinden…** in der Menüleiste nach dem ersten Öffnen).
2. Fügen Sie den API-Schlüssel in die Seitenleiste ein, lassen Sie die Basis-URL als `https://api.churchapps.org` (außer Sie testen gegen die Testumgebung) und klicken Sie auf **Speichern**.
3. Klicken Sie auf **Verbindung testen** – ein grünes „Verbindung OK“ bestätigt, dass der Schlüssel funktioniert.

Der Schlüssel wird in den **benutzerbezogenen Eigenschaften** gespeichert (`PropertiesService.getUserProperties()`). Er ist an Ihr Google-Konto gebunden, wird nie in die Tabelle geschrieben und ist für andere Bearbeitende der Tabelle nicht sichtbar.

## Einen Export ausführen {#running-an-export}

Entweder:

- **Über das Menü** – **Erweiterungen → B1 Export → Personen exportieren** (oder Spenden / Gruppen / Anwesenheit)
- **Über die Seitenleiste** – öffnen Sie die Seitenleiste (Verbinden…) und klicken Sie auf die passende Schaltfläche für den Datensatz

Eine Meldung bestätigt, wenn der Vorgang abgeschlossen ist – „_N_ Zeile(n) in „B1 People“ geschrieben.“

## Auswertungen darauf aufbauen {#building-reports-on-top}

Die exportierten Reiter sind gewöhnliche Daten in Google Tabellen. Bauen Sie Ihre eigenen Auswertungen auf Verweisen auf diese Reiter auf:

- Ein **Übersichtsreiter** mit `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)`, um Kartenspenden zu summieren
- Eine **gefilterte Ansicht** nur der Mitglieder mit `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Ein **Diagramm** der Anwesenheitstrends aus `B1 Attendance`

Ein erneuter Export aktualisiert den zugrunde liegenden Reiter; Ihre Formeln werden automatisch aktualisiert.

## Wiederkehrende Exporte planen {#scheduling-recurring-exports}

Das Add-on arbeitet standardmäßig bei Bedarf. Für wöchentliche oder monatliche Exporte verwenden Sie die zeitgesteuerten Trigger von Apps Script:

1. **Erweiterungen → Apps Script** in der Tabelle (dies öffnet das gebundene Skript des Add-ons).
2. Klicken Sie in der linken Seitenleiste auf das Symbol **⏰ Trigger**.
3. **Trigger hinzufügen** für `exportPeople` (oder eine andere Exportfunktion) – wählen Sie *Zeitgesteuert*, *Wochentimer*, z. B. *Jeden Montag um 6 Uhr*.

Der Export läuft im Hintergrund unter Ihrem Google-Konto. Wird der API-Schlüssel rotiert oder widerrufen, schickt Ihnen der Trigger beim nächsten Fehlschlag eine E-Mail.

## Datenschutz und Berechtigungen {#permissions--privacy}

- Das Add-on fordert nur `spreadsheets.currentonly` an (es kann nur auf die Tabelle zugreifen, in der es geöffnet ist) sowie `script.external_request` (damit `UrlFetchApp` die B1-API aufrufen kann). Es sieht **nicht** Ihr Drive, Gmail oder andere Google-Daten.
- Der B1-API-Schlüssel wird pro Benutzer gespeichert – andere Bearbeitende derselben Tabelle können ihn nicht sehen.
- Alle B1-API-Aufrufe erfolgen über HTTPS mit `Authorization: Bearer cak_…`.

## Fehlerbehebung {#troubleshooting}

- **„No API key set“** – öffnen Sie **Erweiterungen → B1 Export → Verbinden…** und fügen Sie den Schlüssel ein.
- **„B1 rejected the API key (401)“** – der Schlüssel wurde gelöscht oder ist falsch. Erstellen Sie einen neuen Schlüssel und fügen Sie ihn ein.
- **„This API key lacks permission for /giving/donations (403)“** – dem Schlüssel fehlt `donations:read`. Berechtigungen lassen sich an einem vorhandenen Schlüssel nicht ändern; erstellen Sie daher in B1Admin einen neuen Schlüssel mit den richtigen Berechtigungen.
- **Die Tabelle aktualisiert sich nach dem Export nicht** – prüfen Sie, ob Sie den *richtigen* Reiternamen ansehen (`B1 People` usw.). Der Export legt den Reiter an, falls er noch nicht existiert.
- **„Quota exceeded“** – Apps Script begrenzt `UrlFetchApp` pro Benutzer mit täglichen Kontingenten (typischerweise einige Tausend Aufrufe pro Tag). Eine große Gemeinde mit vielen Datensätzen muss Exporte unter Umständen auf mehrere Tage verteilen oder für umfangreiche Synchronisation [Make](./make.md) bzw. eine eigene Integration nutzen.

## Fehlt eine Spalte? {#missing-a-column}

Wenn Sie eine Spalte, die wir nicht exportieren, einen zusätzlichen Datensatz oder ein anderes Ausgabeformat benötigen, schreiben Sie an [support@churchapps.org](mailto:support@churchapps.org).

## Siehe auch {#see-also}

- [Zapier](./zapier.md) – für Echtzeit-Synchronisation statt bedarfsgesteuertem Export
- [Make](./make.md) – für Synchronisation mit komplexeren Transformationen
- [API-Schlüssel (Entwickler-Referenz)](/docs/developer/api/api-keys)
