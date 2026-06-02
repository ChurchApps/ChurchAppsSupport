---
title: "Self-Hosting auf Railway"
---

# Self-Hosting auf Railway

<div class="article-intro">

ChurchApps veröffentlicht eine Ein-Klick-[Railway](https://railway.com)-Vorlage, die Ihrer Kirche ihre eigene private Instanz von B1 Admin, dem B1-Mitgliederportal, der API und einer MySQL-Datenbank gibt -- alles auf einer Infrastruktur, die Sie besitzen und direkt bezahlen.

</div>

## Quick Start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klicken Sie auf die **Deploy on Railway**-Schaltfläche oben.
2. Melden Sie sich bei Railway an (oder erstellen Sie ein kostenloses Konto) und fügen Sie eine Zahlungsmethode hinzu.
3. Klicken Sie auf **Deploy**, ohne etwas zu ändern.
4. Warten Sie 5–10 Minuten, bis die vier Services grün werden.
5. Öffnen Sie die **B1Admin**-Service-URL, klicken Sie auf **Registrieren** und erstellen Sie Ihr Konto.
6. Folgen Sie den In-App-Aufforderungen, um Ihre erste Kirche zu erstellen.

Das ist es. Sie haben jetzt eine vollständig funktionierende ChurchApps-Instanz.

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- Ein kostenlos [Railway](https://railway.com)-Konto
- Eine Kreditkarte bei Railway (~$15–25/Monat)
- Etwa 15 Minuten für die erste Bereitstellung

</div>

## What Gets Deployed

Die Vorlage stellt vier Services in einem einzigen Railway-Projekt bereit:

| Service | Zweck |
|---------|-------|
| **MySQL** | Speichert alle Daten |
| **Api** | Backend für Mitgliedschaft, Inhalte, Geben, Teilnahme |
| **B1Admin** | Personal-/Admin-Web-App |
| **B1App** | Mitgliedsorientiierte Web-App |

## Erstkonfiguration

### 1. E-Mail (Sehr empfohlen)

Ohne E-Mail können sich Mitglieder nicht vergessene Passwörter zurücksetzen.

Im Railway-Dashboard, öffnen Sie die **Api**-Service → **Variables**, und fügen Sie hinzu:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

### 2. Benutzerdefinierte Domains

Für jeden Web-Service (B1Admin und B1App):

1. Öffnen Sie den Service in Railway → **Settings** → **Networking**.
2. Klicken Sie auf **+ Custom Domain**.

### 3. Multi-Site (Multiple Kirchen auf einer Instanz)

ChurchApps ist Multi-Tenant von Design.

### 4. Online-Geben (Stripe / PayPal)

Geben ist per-Kirche innerhalb der Admin-UI konfiguriert.

### 5. Dateispeicherung

Die Vorlage stellt ein **1 GB persistentes Volumen** bereit.

### 6. Optionale Feature-Integrationen

Diese entsperren spezifische Features.

## Updating

Jeder Service ist mit seinem jeweiligen GitHub-Repo verlinkt.

## Costs

Realistische Bereiche für eine kleine Kirche:

| Komponente | Ungefähre monatliche Kosten |
|-----------|--------|
| Railway-Basis | $5 |
| MySQL-Plugin | $5 |
| 3 Web-Services | $3–10 |
| 1 GB Volume | $0.25 |
| **Gesamt** | **~$15–25/Monat** |

## Troubleshooting

| Symptom | Wahrscheinliche Ursache |
|---------|--------|
| Build schlägt mit `EBUSY` fehl | Nixpacks-Cache-Konflikt |
| Build schlägt auf B1Admin fehl | Nicht synchronisierte `package-lock.json` |
| Api-Deploy hängt fest | Healthcheck schlägt fehl |
| B1Admin zeigt "überprüfen Sie Ihre E-Mail" | `MAIL_SYSTEM=SMTP` mit falschen Anmeldedaten |
