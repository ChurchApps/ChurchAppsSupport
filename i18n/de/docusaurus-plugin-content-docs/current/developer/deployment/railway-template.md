---
title: "Self-Hosting auf Railway"
---

# Self-Hosting auf Railway

<div class="article-intro">

ChurchApps veröffentlicht eine One-Click-[Railway](https://railway.com)-Vorlage, die Ihrer Kirche eine eigene private Instanz von B1 Admin, dem B1-Mitgliederportal, der API und einer MySQL-Datenbank bereitstellt — alles läuft auf Infrastruktur, die Sie selbst besitzen und direkt bezahlen. Diese Anleitung bringt Sie in etwa 15 Minuten live und führt Sie anschließend durch die Nachkonfiguration, die die meisten Kirchen irgendwann wünschen.

</div>

## Schnellstart

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klicken Sie oben auf die Schaltfläche **Deploy on Railway**.
2. Melden Sie sich bei Railway an (oder erstellen Sie ein kostenloses Konto) und hinterlegen Sie eine Zahlungsmethode.
3. Klicken Sie auf **Deploy**, ohne etwas zu ändern — jede Variable hat einen sinnvollen Standardwert.
4. Warten Sie 5–10 Minuten, bis die vier Dienste grün werden.
5. Öffnen Sie die URL des **B1Admin**-Dienstes, klicken Sie auf **Register** und legen Sie Ihr Konto an. Das erste Konto wird automatisch zu einem Server-Administrator.
6. Folgen Sie den Eingabeaufforderungen in der App, um Ihre erste Kirche anzulegen.

Das war's. Sie haben jetzt eine voll funktionsfähige ChurchApps-Instanz. Alles Weitere unten ist optionaler Feinschliff.

:::tip
Das Deployment befindet sich derzeit in der **Beta**. Wenn Sie auf etwas stoßen, das die Dokumentation nicht abdeckt, öffnen Sie bitte ein Issue unter [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) mit angehängten Deploy-Logs.
:::

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- Ein kostenloses [Railway](https://railway.com)-Konto
- Eine bei Railway hinterlegte Kreditkarte (~15–25 $/Monat für eine kleine Gemeinde; siehe [Kosten](#kosten))
- Etwa 15 Minuten für das anfängliche Deployment
- *Optional, aber später dringend empfohlen:* SMTP-Zugangsdaten und eine eigene Domain

</div>

## Was bereitgestellt wird

Die Vorlage stellt vier Dienste in einem einzigen Railway-Projekt bereit:

| Dienst | Zweck | URL nach dem Deployment |
|---------|---------|------------------|
| **MySQL** | Speichert alle Daten (eine Instanz, mehrere Schemas) | nur intern |
| **Api** | Backend für Mitgliedschaft, Inhalte, Spenden, Anwesenheit usw. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Mitarbeiter-/Admin-Webanwendung | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Mitglieder-Webanwendung und Kirchenwebsite | `https://b1app-<id>.up.railway.app` |

Datenbankschemas werden beim ersten Start automatisch durch die Startmigration der API erstellt.

## Erstkonfiguration

Nachdem Sie live sind, hier die Dinge, die die meisten Kirchen als Nächstes einrichten, grob nach Priorität geordnet.

### 1. E-Mail (dringend empfohlen)

Ohne E-Mail können sich Mitglieder zwar weiterhin registrieren und das System nutzen, aber **sie können vergessene Passwörter nicht zurücksetzen** — ein Administrator muss dies für sie erledigen. Die Einrichtung von SMTP dauert etwa 5 Minuten.

Öffnen Sie im Railway-Dashboard den **Api**-Dienst → **Variables** und fügen Sie hinzu:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Drei Anbieter, die es zu kennen lohnt:

#### Resend — einfachste kostenlose Option (100 E-Mails/Tag)

1. Registrieren Sie sich bei [resend.com](https://resend.com).
2. Verifizieren Sie eine Absender-Domain (oder verwenden Sie zunächst den Testabsender `onboarding@resend.dev`).
3. Erstellen Sie einen API-Schlüssel.
4. Setzen Sie `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — kostenlos für den persönlichen Gebrauch (~500/Tag)

1. Aktivieren Sie die Zwei-Faktor-Authentifizierung für das Google-Konto.
2. Erstellen Sie ein [App-Passwort](https://myaccount.google.com/apppasswords).
3. Setzen Sie `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<das 16-stellige App-Passwort>`.

#### AWS SES — am günstigsten bei großem Volumen

1. Verifizieren Sie eine Absender-Domain in AWS.
2. Verlassen Sie die SES-Sandbox, wenn Sie an nicht verifizierte Adressen senden möchten.
3. Erstellen Sie SMTP-Zugangsdaten unter **SES → SMTP Settings → Create credentials**.
4. Setzen Sie `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES-SMTP-Passwort>`.

Nach dem Speichern der Variablen wird der Api-Dienst automatisch neu bereitgestellt. Testen Sie es, indem Sie bei einem Testkonto ein Passwort-Reset auslösen.

:::warning
Wenn Sie `MAIL_SYSTEM=SMTP` mit falschen Zugangsdaten setzen, erscheint die Registrierung erfolgreich, aber die Bestätigungs-E-Mail kommt nie an. Korrigieren Sie entweder die Zugangsdaten, oder entfernen Sie `MAIL_SYSTEM`, um in den E-Mail-losen Modus zurückzufallen.
:::

### 2. Eigene Domains

Die Standard-URLs `*.up.railway.app` funktionieren, aber die meisten Kirchen möchten eine eigene Domain.

Für jeden Web-Dienst (B1Admin und B1App):

1. Öffnen Sie den Dienst in Railway → **Settings** → **Networking**.
2. Klicken Sie auf **+ Custom Domain** und geben Sie den Hostnamen ein:
   - `admin.yourchurch.org` für B1Admin
   - `app.yourchurch.org` (oder `www`) für B1App
3. Fügen Sie den von Railway angezeigten CNAME-Eintrag bei Ihrem DNS-Anbieter hinzu.
4. Warten Sie ein paar Minuten, bis sich das DNS verbreitet hat. Railway stellt das TLS-Zertifikat automatisch bereit.

Aktualisieren Sie anschließend die Variablen des **Api**-Dienstes, damit Links in E-Mails die neuen Domains verwenden:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Und beim **B1Admin**-Dienst:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (falls Sie auch eine eigene API-Domain gesetzt haben)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Das Token `{subdomain}` ist wörtlich zu verstehen — es wird zur Laufzeit durch die Subdomain jeder Kirche ersetzt (siehe Multi-Site unten).

### 3. Multi-Site (mehrere Kirchen auf einer Instanz)

ChurchApps ist von Natur aus mandantenfähig — ein Deployment kann beliebig viele Kirchen hosten, jede mit eigenen Personen, Gruppen und Website. Neue Kirchen werden vollständig über die Admin-Oberfläche hinzugefügt; es sind keine Infrastrukturänderungen nötig.

#### Weitere Kirchen hinzufügen

1. Navigieren Sie in **B1 Admin** zu **Settings → Manage Church → Switch Church → Create New**.
2. Jede Kirche erhält einen eindeutigen **Subdomain-Slug** (z. B. `firstchurch`, `gracecommunity`).
3. Die neue Kirche erhält ihre eigenen Daten, Mitglieder, Website und Spendeneinrichtung, vollständig isoliert von anderen Kirchen auf derselben Instanz.

#### Jede Kirche auf ihre eigene URL routen

Es gibt zwei Möglichkeiten, Kirchen öffentlich verfügbar zu machen:

| Muster | Beispiel | Einrichtung |
|---------|---------|-------|
| **Pfadbasiert** (funktioniert ohne Weiteres) | `app.yourchurch.org/firstchurch` | Keine zusätzliche Einrichtung |
| **Subdomain-basiert** (sauberere URLs) | `firstchurch.yourchurch.org` | Wildcard-DNS + Wildcard-Custom-Domain |

Für **Subdomain-basiertes** Routing auf Railway:

1. Erstellen Sie bei Ihrem DNS-Anbieter einen Wildcard-CNAME: `*.yourchurch.org → <b1app railway target>`.
2. Fügen Sie in Railway beim B1App-Dienst → **Settings → Networking** `*.yourchurch.org` als eigene Domain hinzu.
3. Setzen Sie beim **B1Admin**-Dienst `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Nach dem erneuten Deployment wird die Website jeder Kirche automatisch unter `<ihre-subdomain>.yourchurch.org` ausgeliefert.

:::info
Wildcard-Custom-Domains erfordern einen kostenpflichtigen Railway-Plan. Pfadbasiertes Routing funktioniert bei jedem Plan und ist funktional identisch — nur in der Adressleiste weniger ansehnlich.
:::

### 4. Online-Spenden (Stripe / PayPal)

Spenden werden **pro Kirche innerhalb der Admin-Oberfläche** konfiguriert, nicht über Umgebungsvariablen — so kann jede Kirche ihr eigenes Händlerkonto verwenden.

1. Holen Sie sich Entwickler-Zugangsdaten von [Stripe](https://dashboard.stripe.com/) (Developers → API keys) oder [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Gehen Sie in B1 Admin zu **Settings → Giving Settings**.
3. Wählen Sie Ihren Anbieter, fügen Sie die öffentlichen und geheimen Schlüssel ein und konfigurieren Sie die Gebührenbehandlung.
4. Fügen Sie optional `GOOGLE_RECAPTCHA_SECRET_KEY` beim **Api**-Dienst in Railway hinzu, um öffentliche Spendenformulare vor Bots zu schützen.

### 5. Dateispeicher

Die Vorlage stellt einen **1-GB-persistenten Datenträger** bereit, der am Api-Dienst gemountet ist, für Mitgliederfotos, Predigtdateien und hochgeladene Dokumente.

Um ihn zu vergrößern: Öffnen Sie den Api-Dienst → **Volumes** → passen Sie den Größenregler an.

Für größere Deployments (100+ GB oder viele gleichzeitige Uploads) wechseln Sie zu S3, indem Sie beim **Api**-Dienst Folgendes setzen:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Vorhandene Dateien im Datenträger werden nicht automatisch migriert — kopieren Sie sie in den Bucket, bevor Sie die Variable umstellen.

### 6. Optionale Feature-Integrationen

Diese schalten bestimmte Funktionen frei und können alle später über das Railway-Dashboard hinzugefügt werden. Setzen Sie sie beim **Api**-Dienst.

| Variable | Freigeschaltete Funktion |
|----------|--------------------|
| `OPENAI_API_KEY` *oder* `OPENROUTER_API_KEY` | KI-gestützte Suche und Inhaltsvorschläge |
| `YOUTUBE_API_KEY` | YouTube-Predigtsuche und -Einbettung |
| `PEXELS_KEY` | Bildauswahl für den Website-Baukasten |
| `VIMEO_TOKEN` | Vimeo-Predigtunterstützung |
| `API_BIBLE_KEY` | Bibelvers-Nachschlagen in Lektionen und Inhalten |
| `YOUVERSION_API_KEY` | YouVersion-Bibel-Integration |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Browser-Push-Benachrichtigungen (VAPID-Schlüsselpaar generieren) |
| `HUBSPOT_KEY` | Optionale CRM-Synchronisierung für neue Registrierungen |

## Aktualisieren

Jeder Dienst ist mit seinem jeweiligen GitHub-Repository verknüpft. Pushes nach `main` in `ChurchApps/Api`, `ChurchApps/B1Admin` oder `ChurchApps/B1App` lösen automatische erneute Deployments aus.

Um eine bestimmte Version festzupinnen, ändern Sie die **Branch**-Einstellung bei jedem Dienst auf einen Tag oder Release-Branch. Dies ist die empfohlene Einrichtung für die Produktion — das automatische Deployment von `main` bedeutet, dass Sie jede laufende Arbeit übernehmen.

## Kosten

Realistische Bandbreiten für eine kleine Kirche (unter 200 Mitglieder, geringer Traffic):

| Komponente | Ungefähre monatliche Kosten |
|-----------|---------------------|
| Railway-Basis | $5 |
| MySQL-Plugin | $5 + ~$1 Speicher |
| 3 Web-Dienste Compute | $3–10 kombiniert |
| 1-GB-Datenträger | $0,25 |
| **Gesamt** | **~$15–25/Monat** |

Die Kosten skalieren linear mit Traffic, Fotouploads und Datenbankgröße. Railway zeigt die Live-Nutzung im **Usage**-Tab des Projekts an — setzen Sie dort Ausgabenlimits, um Ihr Risiko zu begrenzen.

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Behebung |
|---------|--------------|-----|
| Build schlägt fehl mit `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks-Cache-Mount-Konflikt | Setzen Sie `NIXPACKS_NO_CACHE=true` beim betroffenen Dienst |
| Build schlägt bei B1Admin fehl mit `Missing: @types/...` | Veraltete `package-lock.json` | Aktuellsten `main`-Stand ziehen |
| Api-Deployment hängt bei „Deploying" | Healthcheck schlägt fehl — `/health` liefert keine 200 | Deploy-Logs ansehen; meist eine fehlende erforderliche Umgebungsvariable |
| B1Admin zeigt „check your email", aber keine E-Mail kommt an | `MAIL_SYSTEM=SMTP` gesetzt, aber Zugangsdaten fehlen/falsch | Zugangsdaten korrigieren, oder `MAIL_SYSTEM` entfernen, um E-Mail zu deaktivieren |
| Login leitet auf `api.churchapps.org` um | `REACT_APP_STAGE` ist `prod` | Setzen Sie `REACT_APP_STAGE=custom` beim B1Admin-Dienst |
| Subdomain-Kirchen zeigen alle denselben Inhalt | `REACT_APP_B1_WEBSITE_URL` enthält nicht das Token `{subdomain}` | Setzen Sie es z. B. auf `https://{subdomain}.yourchurch.org` |
| Eigene Domain zeigt „Application not found" | DNS noch nicht verbreitet, oder Railway-Zertifikat ausstehend | 5 Minuten warten; DNS mit `dig admin.yourchurch.org` prüfen |

Wenn Sie auf etwas stoßen, das hier nicht aufgeführt ist, öffnen Sie ein Issue unter [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) mit angehängten Deploy-Logs.

## Verwandte Artikel

- **[Self-Hosting mit Docker](./docker)** — Derselbe Stack auf Ihrer eigenen Hardware oder einem VPS
- **[Ersteinrichtung](../../getting-started/initial-setup)** — Erste Schritte, nachdem Ihre Kirche angelegt wurde
- **[Website-Ersteinrichtung](../../b1-admin/website/initial-setup)** — Die öffentliche Website Ihrer Kirche konfigurieren
- **[Spendeneinstellungen](../../b1-admin/donations/online-giving-setup)** — Stripe oder PayPal einrichten
- **[Lokale API-Einrichtung](../api/local-setup)** — Den Stack lokal für die Entwicklung ausführen
- **[API-Deployment (AWS)](./apis)** — Wie das offizielle ChurchApps-SaaS bereitgestellt wird
</content>
