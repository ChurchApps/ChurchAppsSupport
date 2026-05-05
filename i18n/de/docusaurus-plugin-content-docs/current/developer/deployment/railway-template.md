---
title: "Self-Hosting auf Railway"
---

# Self-Hosting auf Railway

<div class="article-intro">

ChurchApps veröffentlicht eine One-Click-[Railway](https://railway.com)-Vorlage, die Ihrer Kirche eine eigene private Instanz von B1 Admin, dem B1-Mitgliederportal, der API und einer MySQL-Datenbank gibt -- alles läuft auf Infrastruktur, die Sie besitzen und direkt bezahlen. Diese Anleitung bringt Sie in etwa 15 Minuten live und führt Sie dann durch die Post-Deploy-Konfiguration, die die meisten Kirchen letztendlich benötigen.

</div>

## Schnellstart

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klicken Sie oben auf die Schaltfläche **Deploy on Railway**.
2. Melden Sie sich bei Railway an (oder erstellen Sie ein kostenloses Konto) und fügen Sie eine Zahlungsmethode hinzu.
3. Klicken Sie auf **Deploy**, ohne etwas zu ändern -- jede Variable hat einen vernünftigen Standardwert.
4. Warten Sie 5–10 Minuten, bis die vier Services grün werden.
5. Öffnen Sie die **B1Admin**-Service-URL, klicken Sie auf **Register** und erstellen Sie Ihr Konto. Das erste Konto ist automatisch ein Server-Administrator.
6. Folgen Sie den App-internen Anweisungen, um Ihre erste Kirche zu erstellen.

Das war's. Sie haben jetzt eine voll funktionsfähige ChurchApps-Instanz. Alles Folgende ist optionale Feinabstimmung.

:::tip
Das Deployment ist derzeit in **Beta**. Wenn Sie auf etwas stoßen, was die Dokumentation nicht abdeckt, öffnen Sie bitte ein Issue unter [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) mit beigefügten Deploy-Logs.
:::

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- Ein kostenloses [Railway](https://railway.com)-Konto
- Eine Kreditkarte bei Railway hinterlegt (~15–25 $/Monat für eine kleine Gemeinde; siehe [Costs](#costs))
- Etwa 15 Minuten für das anfängliche Deployment
- *Optional, aber später dringend empfohlen:* SMTP-Zugangsdaten und eine benutzerdefinierte Domain

</div>

## Was bereitgestellt wird

Die Vorlage stellt vier Services in einem einzelnen Railway-Projekt bereit:

| Service | Zweck | URL nach Deployment |
|---------|-------|---------------------|
| **MySQL** | Speichert alle Daten (eine Instanz, mehrere Schemas) | nur intern |
| **Api** | Backend für Mitgliedschaft, Inhalte, Spenden, Teilnahme usw. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Mitarbeiter-/Admin-Web-App | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Mitgliederbezogene Web-App und Kirchen-Website | `https://b1app-<id>.up.railway.app` |

Datenbank-Schemas werden beim ersten Start automatisch durch die Startup-Migration der API erstellt.

## Erstkonfiguration

Jetzt, da Sie live sind, hier sind die Dinge, die die meisten Kirchen als Nächstes einrichten, grob in Prioritätsreihenfolge.

### 1. E-Mail (dringend empfohlen)

Ohne E-Mail können sich Mitglieder weiterhin registrieren und das System nutzen, aber **sie können vergessene Passwörter nicht zurücksetzen** -- ein Administrator muss es für sie tun. Die Einrichtung von SMTP dauert etwa 5 Minuten.

Öffnen Sie im Railway-Dashboard den **Api**-Service → **Variables** und fügen Sie hinzu:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Drei Anbieter, die es wert sind, bekannt zu sein:

#### Resend — einfachste kostenlose Option (100 E-Mails/Tag)

1. Registrieren Sie sich bei [resend.com](https://resend.com).
2. Verifizieren Sie eine Absendedomain (oder verwenden Sie den `onboarding@resend.dev`-Testabsender zum Starten).
3. Erstellen Sie einen API-Schlüssel.
4. Setzen Sie `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — kostenlos für den persönlichen Gebrauch (~500/Tag)

1. Aktivieren Sie die 2-Faktor-Authentifizierung für das Google-Konto.
2. Erstellen Sie ein [App-Passwort](https://myaccount.google.com/apppasswords).
3. Setzen Sie `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<das 16-Zeichen-App-Passwort>`.

#### AWS SES — am günstigsten im großen Maßstab

1. Verifizieren Sie eine Absendedomain in AWS.
2. Verlassen Sie die SES-Sandbox, wenn Sie an nicht verifizierte Adressen senden werden.
3. Erstellen Sie SMTP-Zugangsdaten unter **SES → SMTP Settings → Create credentials**.
4. Setzen Sie `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

Nach dem Speichern der Variablen wird der Api-Service automatisch neu bereitgestellt. Testen Sie es, indem Sie eine Passwortzurücksetzung für ein Testkonto auslösen.

:::warning
Wenn Sie `MAIL_SYSTEM=SMTP` mit falschen Zugangsdaten setzen, scheint die Registrierung erfolgreich zu sein, aber die Verifizierungs-E-Mail kommt nie an. Beheben Sie entweder die Zugangsdaten oder heben Sie `MAIL_SYSTEM` auf, um in den Modus ohne E-Mail zurückzukehren.
:::

### 2. Benutzerdefinierte Domains

Die Standard-`*.up.railway.app`-URLs funktionieren, aber die meisten Kirchen möchten ihre eigenen.

Für jeden Web-Service (B1Admin und B1App):

1. Öffnen Sie den Service in Railway → **Settings** → **Networking**.
2. Klicken Sie auf **+ Custom Domain** und geben Sie den Hostnamen ein:
   - `admin.yourchurch.org` für B1Admin
   - `app.yourchurch.org` (oder `www`) für B1App
3. Fügen Sie den CNAME-Eintrag, den Railway Ihnen zeigt, zu Ihrem DNS-Anbieter hinzu.
4. Warten Sie ein paar Minuten, bis sich DNS verbreitet hat. Railway stellt das TLS-Zertifikat automatisch bereit.

Aktualisieren Sie dann die **Api**-Service-Variablen, damit Links in E-Mails die neuen Domains verwenden:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Und am **B1Admin**-Service:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (falls Sie auch eine benutzerdefinierte API-Domain festgelegt haben)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Das `{subdomain}`-Token ist wörtlich -- es wird zur Laufzeit durch die Subdomain jeder Kirche ersetzt (siehe Multi-Site unten).

### 3. Multi-Site (mehrere Kirchen auf einer Instanz)

ChurchApps ist von Natur aus mandantenfähig -- ein Deployment kann eine beliebige Anzahl von Kirchen hosten, jede mit eigenen Personen, Gruppen und Website. Neue Kirchen werden vollständig über die Admin-UI hinzugefügt; keine Infrastrukturänderungen erforderlich.

#### Zusätzliche Kirchen hinzufügen

1. Navigieren Sie in **B1 Admin** zu **Settings → Manage Church → Switch Church → Create New**.
2. Jede Kirche hat einen eindeutigen **Subdomain-Slug** (z. B. `firstchurch`, `gracecommunity`).
3. Die neue Kirche erhält eigene Daten, Mitglieder, Website und Spendeneinrichtung, vollständig isoliert von anderen Kirchen auf derselben Instanz.

#### Jede Kirche zu ihrer eigenen URL routen

Zwei Möglichkeiten, Kirchen öffentlich zugänglich zu machen:

| Muster | Beispiel | Einrichtung |
|--------|----------|-------------|
| **Pfadbasiert** (funktioniert sofort) | `app.yourchurch.org/firstchurch` | Keine zusätzliche Einrichtung |
| **Subdomainbasiert** (sauberer URLs) | `firstchurch.yourchurch.org` | Wildcard DNS + Wildcard Custom Domain |

Für **subdomainbasiertes** Routing auf Railway:

1. Erstellen Sie in Ihrem DNS-Anbieter einen Wildcard-CNAME: `*.yourchurch.org → <b1app railway target>`.
2. Fügen Sie in Railway am B1App-Service → **Settings → Networking** `*.yourchurch.org` als benutzerdefinierte Domain hinzu.
3. Setzen Sie am **B1Admin**-Service `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Nach dem erneuten Bereitstellen wird die Website jeder Kirche automatisch unter `<ihre-subdomain>.yourchurch.org` bereitgestellt.

:::info
Wildcard-Custom-Domains erfordern einen bezahlten Railway-Plan. Pfadbasiertes Routing funktioniert bei jedem Plan und ist funktional identisch -- nur weniger schön in der URL-Leiste.
:::

### 4. Online-Spenden (Stripe / PayPal)

Spenden werden **pro Kirche innerhalb der Admin-UI** konfiguriert, nicht über Umgebungsvariablen -- auf diese Weise kann jede Kirche ihr eigenes Händlerkonto verwenden.

1. Holen Sie sich Entwickler-Zugangsdaten von [Stripe](https://dashboard.stripe.com/) (Developers → API keys) oder [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Gehen Sie in B1 Admin zu **Settings → Giving Settings**.
3. Wählen Sie Ihren Anbieter, fügen Sie die Public- und Secret-Keys ein und konfigurieren Sie die Gebührenbehandlung.
4. Fügen Sie optional `GOOGLE_RECAPTCHA_SECRET_KEY` zum **Api**-Service in Railway hinzu, um öffentliche Spendenformulare vor Bots zu schützen.

### 5. Dateispeicherung

Die Vorlage stellt ein **1 GB persistentes Volume** bereit, das am Api-Service für Mitgliederfotos, Predigtdateien und hochgeladene Dokumente gemountet ist.

Um es zu vergrößern: Öffnen Sie den Api-Service → **Volumes** → passen Sie den Größenschieber an.

Für größere Deployments (100+ GB oder viele gleichzeitige Uploads) wechseln Sie zu S3, indem Sie diese am **Api**-Service setzen:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Vorhandene Dateien im Volume werden nicht automatisch migriert -- kopieren Sie sie in den Bucket, bevor Sie die Variable umstellen.

### 6. Optionale Feature-Integrationen

Diese schalten spezifische Features frei und können alle später über das Railway-Dashboard hinzugefügt werden. Setzen Sie sie am **Api**-Service.

| Variable | Feature, das sie freischaltet |
|----------|-------------------------------|
| `OPENAI_API_KEY` *oder* `OPENROUTER_API_KEY` | KI-gestützte Suche und Inhaltsvorschläge |
| `YOUTUBE_API_KEY` | YouTube-Predigtsuche und Einbettung |
| `PEXELS_KEY` | Stock-Image-Picker für Website-Builder |
| `VIMEO_TOKEN` | Vimeo-Predigtunterstützung |
| `API_BIBLE_KEY` | Bibelverssuche in Lektionen und Inhalten |
| `YOUVERSION_API_KEY` | YouVersion-Bibelintegration |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Browser-Push-Benachrichtigungen (VAPID-Keypair generieren) |
| `HUBSPOT_KEY` | Optionale CRM-Synchronisation für neue Registrierungen |

## Aktualisierung

Jeder Service ist mit seinem jeweiligen GitHub-Repo verlinkt. Pushes zu `main` auf `ChurchApps/Api`, `ChurchApps/B1Admin` oder `ChurchApps/B1App` lösen automatische Neubereitstellungen aus.

Um eine bestimmte Version anzuheften, ändern Sie die **Branch**-Einstellung bei jedem Service auf einen Tag oder Release-Branch. Dies ist die empfohlene Einrichtung für die Produktion -- automatisches Bereitstellen von `main` bedeutet, dass Sie laufende Arbeiten erben.

## Kosten

Realistische Bereiche für eine kleine Kirche (unter 200 Mitgliedern, geringer Traffic):

| Komponente | Ungefähre monatliche Kosten |
|------------|------------------------------|
| Railway-Basis | 5 $ |
| MySQL-Plugin | 5 $ + ~1 $ Speicher |
| 3 Web-Services-Compute | 3–10 $ kombiniert |
| 1 GB Volume | 0,25 $ |
| **Gesamt** | **~15–25 $/Monat** |

Die Kosten skalieren linear mit Traffic, Foto-Uploads und Datenbankgröße. Railway zeigt die Live-Nutzung im **Usage**-Tab des Projekts an -- legen Sie dort Ausgabenlimits fest, um Ihr Risiko zu begrenzen.

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Behebung |
|---------|-------------------------|----------|
| Build schlägt fehl mit `EBUSY: rmdir '/app/node_modules/.cache'` | Nixpacks-Cache-Mount-Konflikt | Setzen Sie `NIXPACKS_NO_CACHE=true` am betroffenen Service |
| Build schlägt bei B1Admin mit `Missing: @types/...` fehl | Nicht synchronisierte `package-lock.json` | Ziehen Sie das neueste `main` |
| Api-Deploy hängt bei "Deploying" | Healthcheck schlägt fehl -- `/health` gibt keine 200 zurück | Deploy-Logs ansehen; normalerweise eine fehlende erforderliche Umgebungsvariable |
| B1Admin zeigt "check your email", aber es kommt keine E-Mail an | `MAIL_SYSTEM=SMTP` gesetzt, aber Zugangsdaten fehlen/falsch | Beheben Sie die Zugangsdaten oder heben Sie `MAIL_SYSTEM` auf, um E-Mail zu deaktivieren |
| Login leitet zu `api.churchapps.org` weiter | `REACT_APP_STAGE` ist `prod` | Setzen Sie `REACT_APP_STAGE=custom` am B1Admin-Service |
| Subdomain-Kirchen zeigen alle denselben Inhalt | `REACT_APP_B1_WEBSITE_URL` enthält kein `{subdomain}`-Token | Setzen Sie es z. B. auf `https://{subdomain}.yourchurch.org` |
| Benutzerdefinierte Domain zeigt "Application not found" | DNS noch nicht verbreitet oder Railway-Zertifikat ausstehend | 5 Minuten warten; DNS mit `dig admin.yourchurch.org` prüfen |

Wenn Sie auf etwas stoßen, das nicht in dieser Liste steht, öffnen Sie ein Issue unter [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) mit beigefügten Deploy-Logs.

## Verwandte Artikel

- **[Initial Setup](../../getting-started/initial-setup)** — Erste Schritte nach der Erstellung Ihrer Kirche
- **[Website Initial Setup](../../b1-admin/website/initial-setup)** — Konfigurieren Sie die öffentliche Website Ihrer Kirche
- **[Giving Settings](../../b1-admin/donations/online-giving-setup)** — Verbinden Sie Stripe oder PayPal
- **[Local API Setup](../api/local-setup)** — Lokales Ausführen des Stacks für die Entwicklung
- **[API Deployment (AWS)](./apis)** — Wie das offizielle ChurchApps SaaS bereitgestellt wird
