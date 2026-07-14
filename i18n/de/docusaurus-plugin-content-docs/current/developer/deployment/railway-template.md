---
title: "Selbst-Hosting auf Railway"
---

# Selbst-Hosting auf Railway

<div class="article-intro">

ChurchApps veröffentlicht ein Ein-Klick-[Railway](https://railway.com)-Template, das Ihrer Kirche ihre eigene private Instanz von B1 Admin, das B1 Mitglied-Portal, die API und eine MySQL-Datenbank gibt — alles läuft auf einer Infrastruktur, die Sie besitzen und direkt bezahlen. Dieser Guide bringt Sie in etwa 15 Minuten ans Netz und führt Sie dann durch die Post-Deploy-Konfiguration, die die meisten Kirchen eventuell möchten.

</div>

## Quick Start

1. Klicken Sie auf die Deploy on Railway Schaltfläche.
2. Melden Sie sich bei Railway an (oder erstellen Sie ein kostenloses Konto) und fügen Sie eine Zahlungsweise hinzu.
3. Klicken Sie auf Deploy ohne etwas zu ändern — jede Variable hat einen vernünftigen Standard.
4. Warten Sie 5–10 Minuten, bis alle vier Services grün werden.
5. Öffnen Sie die B1Admin Service-URL, klicken Sie auf Register und erstellen Sie Ihr Konto.
6. Folgen Sie den In-App-Eingabeaufforderungen, um Ihre erste Kirche zu erstellen.

Das ist alles. Sie haben nun eine vollständig funktionsfähige ChurchApps-Instanz.

:::tip
Die Bereitstellung ist derzeit in Beta. Wenn Sie etwas treffen, das die Docs nicht abdecken, öffnen Sie bitte einen Issue unter github.com/ChurchApps/Api/issues
:::

<div class="prereqs">
<h4>Was Sie brauchen</h4>

- Ein kostenloses Railway-Konto
- Eine Kreditkarte bei Railway (etwa 15-25 USD/Monat für eine kleine Gemeinde)
- Etwa 15 Minuten für die anfängliche Bereitstellung

</div>

## Was wird bereitgestellt

Das Template stellt vier Services in einem Railway-Projekt bereit.

## Erste-Zeit-Konfiguration

Jetzt, da Sie oben sind, hier sind die Dinge, die die meisten Kirchen dann einrichten.

### 1. E-Mail (Empfohlen)

Ohne E-Mail können Mitglieder sich registrieren, aber keine Passwörter zurücksetzen.

### 2. Benutzerdefinierte Domänen

Die Standard-URLs funktionieren, aber die meisten Kirchen möchten ihre eigenen.

### 3. Multi-Site (Mehrere Kirchen)

ChurchApps ist Multi-Tenant nach Design.

### 4. Online-Spenden

Spenden werden pro-Kirche in der Admin UI konfiguriert.

### 5. Dateispeicherung

Das Template stellt 1 GB persistentes Volume bereit.

### 6. Optionale Funktions-Integrationen

Diese entsperren spezifische Funktionen.

## Kosten

Real-World-Bereiche für eine kleine Kirche:

- Railway Base: $5
- MySQL Plugin: $5 + $1 Speicher
- 3 Web-Services: $3-10
- 1 GB Volume: $0.25
- Total: $15-25/Monat

## Problembehandlung

Verschiedene Probleme und Lösungen sind verfügbar.

## Verwandte Artikel

- Selbst-Hosting mit Docker
- Anfängliches Setup
- Website Setup
- Spenden-Einstellungen
- Lokales API Setup
- API Bereitstellung (AWS)
