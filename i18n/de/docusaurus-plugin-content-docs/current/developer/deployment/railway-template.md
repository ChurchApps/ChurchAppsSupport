---
title: "Selbst-Hosting auf Railway"
---

# Selbst-Hosting auf Railway

<div class="article-intro">

ChurchApps stellt vorgefertigte Vorlagen für [Railway](https://railway.com) bereit, mit denen Sie per Klick eine eigene, private Instanz von B1 Admin, des B1-Mitgliederportals, der API und einer MySQL-Datenbank erhalten — alles auf einer Infrastruktur, die Sie besitzen und direkt bezahlen. Diese Anleitung bringt Sie in etwa 15 Minuten online und erläutert danach die Konfiguration nach der Bereitstellung, die sich die meisten Gemeinden irgendwann wünschen.

</div>

## Schnellstart

[![Auf Railway bereitstellen](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Klicken Sie oben auf die Schaltfläche **Deploy on Railway**.
2. Melden Sie sich bei Railway an (oder erstellen Sie ein kostenloses Konto) und hinterlegen Sie eine Zahlungsmethode.
3. Klicken Sie auf **Deploy**, ohne etwas zu ändern — jede Variable hat einen sinnvollen Standardwert.
4. Warten Sie 5–10 Minuten, bis die vier Dienste grün sind.
5. Öffnen Sie die URL des Dienstes **B1Admin**, klicken Sie auf **Register** und legen Sie Ihr Konto an. Das erste Konto wird automatisch Server-Admin.
6. Folgen Sie den Hinweisen in der Anwendung, um Ihre erste Gemeinde anzulegen.

Das war's. Sie haben nun eine voll funktionsfähige ChurchApps-Instanz. Alles Weitere unten ist optional.

:::tip
Die Bereitstellung befindet sich derzeit in der **Beta**. Wenn Sie auf etwas stoßen, das in der Dokumentation nicht behandelt wird, eröffnen Sie bitte ein Issue unter [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) und fügen Sie die Bereitstellungsprotokolle bei.
:::

<div class="prereqs">
<h4>Was Sie benötigen</h4>

- Ein kostenloses [Railway](https://railway.com)-Konto
- Eine Kreditkarte, die bei Railway hinterlegt ist (etwa 15–25 $ pro Monat für eine kleine Gemeinde; siehe [Kosten](#costs))
- Etwa 15 Minuten für die erste Bereitstellung
- *Optional, aber dringend später empfohlen:* SMTP-Zugangsdaten und eine eigene Domain

</div>

## Was bereitgestellt wird

Die Vorlage richtet vier Dienste in einem einzigen Railway-Projekt ein:

| Dienst | Zweck | URL nach der Bereitstellung |
|---------|---------|------------------|
| **MySQL** | Speichert alle Daten (eine Instanz, mehrere Schemata) | nur intern |
| **Api** | Backend für Membership, Content, Giving, Attendance usw. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Web-App für Mitarbeitende und Administration | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Web-App für Mitglieder und Website der Gemeinde | `https://b1app-<id>.up.railway.app` |

Die Datenbankschemata werden beim ersten Start automatisch durch die Startmigration der API angelegt.

## Erstkonfiguration

Jetzt läuft alles. Hier sind die Dinge, die die meisten Gemeinden als Nächstes einrichten, grob nach Priorität geordnet.

### 1. E-Mail (dringend empfohlen) {#1-email-highly-recommended}

Ohne E-Mail können sich Mitglieder zwar registrieren und das System nutzen, aber **sie können vergessene Passwörter nicht zurücksetzen** — ein Administrator muss dies für sie übernehmen. Die Einrichtung von SMTP dauert etwa 5 Minuten.

Öffnen Sie im Railway-Dashboard den Dienst **Api** → **Variables** und fügen Sie hinzu:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Drei Anbieter, die sich lohnen:

#### Resend — einfachste kostenlose Option (100 E-Mails pro Tag)

1. Registrieren Sie sich unter [resend.com](https://resend.com).
2. Verifizieren Sie eine Absenderdomain (oder verwenden Sie zum Start den Test-Absender `onboarding@resend.dev`).
3. Erstellen Sie einen API-Schlüssel.
4. Setzen Sie `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — kostenlos für den privaten Gebrauch (~500 pro Tag)

1. Aktivieren Sie die Zwei-Faktor-Authentifizierung für das Google-Konto.
2. Erstellen Sie ein [App-Passwort](https://myaccount.google.com/apppasswords).
3. Setzen Sie `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<das 16-stellige App-Passwort>`.

#### AWS SES — am günstigsten im großen Maßstab

1. Verifizieren Sie eine Absenderdomain in AWS.
2. Verlassen Sie die Sandbox von SES, wenn Sie an nicht verifizierte Adressen senden möchten.
3. Erstellen Sie SMTP-Zugangsdaten unter **SES → SMTP Settings → Create credentials**.
4. Setzen Sie `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES-SMTP-Passwort>`.

Nach dem Speichern der Variablen wird der Dienst Api automatisch neu bereitgestellt. Testen Sie es, indem Sie auf einem Testkonto ein Zurücksetzen des Passworts auslösen.

:::warning
Wenn Sie `MAIL_SYSTEM=SMTP` mit falschen Zugangsdaten setzen, scheint die Registrierung zu gelingen, aber die Bestätigungs-E-Mail kommt nie an. Korrigieren Sie entweder die Zugangsdaten oder entfernen Sie `MAIL_SYSTEM`, um in den Modus ohne E-Mail zurückzukehren.
:::

### 2. Eigene Domains

Die Standard-URLs `*.up.railway.app` funktionieren, aber die meisten Gemeinden möchten eigene.

Für jeden Web-Dienst (B1Admin und B1App):

1. Öffnen Sie den Dienst in Railway → **Settings** → **Networking**.
2. Klicken Sie auf **+ Custom Domain** und geben Sie den Hostnamen ein:
   - `admin.yourchurch.org` für B1Admin
   - `app.yourchurch.org` (oder `www`) für B1App
3. Tragen Sie den CNAME-Eintrag, den Railway anzeigt, bei Ihrem DNS-Anbieter ein.
4. Warten Sie ein paar Minuten, bis sich das DNS verbreitet hat. Railway stellt das TLS-Zertifikat automatisch bereit.

Aktualisieren Sie danach die Variablen des Dienstes **Api**, damit Links in E-Mails die neuen Domains verwenden:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Und auf dem Dienst **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (falls Sie außerdem eine eigene API-Domain setzen)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Der Platzhalter `{subdomain}` ist wörtlich zu verstehen — er wird zur Laufzeit durch die Subdomain jeder Gemeinde ersetzt (siehe Multi-Site unten).

### 3. Multi-Site (mehrere Gemeinden auf einer Instanz) {#3-multi-site-multiple-churches-on-one-instance}

ChurchApps ist von Grund auf mandantenfähig — eine Bereitstellung kann beliebig viele Gemeinden beherbergen, jede mit eigenen Personen, Gruppen und einer eigenen Website. Neue Gemeinden werden vollständig über die Administrationsoberfläche angelegt; Änderungen an der Infrastruktur sind nicht nötig.

#### Weitere Gemeinden hinzufügen

1. Navigieren Sie in **B1 Admin** zu **Settings → Manage Church → Switch Church → Create New**.
2. Jede Gemeinde hat einen eindeutigen **Subdomain-Slug** (z. B. `firstchurch`, `gracecommunity`).
3. Die neue Gemeinde erhält eigene Daten, Mitglieder, eine eigene Website und eine eigene Spendeneinrichtung, die vollständig von den anderen Gemeinden auf derselben Instanz getrennt sind.

#### Jede Gemeinde unter eigener URL erreichbar machen

Es gibt zwei Möglichkeiten, Gemeinden öffentlich zugänglich zu machen:

| Muster | Beispiel | Einrichtung |
|---------|---------|-------|
| **Pfadbasiert** (funktioniert sofort) | `app.yourchurch.org/firstchurch` | Keine zusätzliche Einrichtung |
| **Subdomain-basiert** (sauberere URLs) | `firstchurch.yourchurch.org` | Wildcard-DNS + Wildcard-Domain |

Für das **subdomain-basierte** Routing auf Railway:

1. Legen Sie bei Ihrem DNS-Anbieter einen Wildcard-CNAME an: `*.yourchurch.org → <b1app railway target>`.
2. Fügen Sie in Railway beim Dienst B1App unter **Settings → Networking** die Domain `*.yourchurch.org` als Custom Domain hinzu.
3. Setzen Sie beim Dienst **B1Admin** `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Nach der erneuten Bereitstellung wird die Website jeder Gemeinde automatisch unter `<ihre-subdomain>.yourchurch.org` ausgeliefert.

:::info
Wildcard-Domains erfordern einen kostenpflichtigen Railway-Tarif. Das pfadbasierte Routing funktioniert in jedem Tarif und ist funktional identisch — es sieht in der Adressleiste nur weniger schön aus.
:::

### 4. Online-Spenden (Stripe / PayPal) {#4-online-giving-stripe--paypal}

Spenden werden **pro Gemeinde innerhalb der Administrationsoberfläche** konfiguriert, nicht über Umgebungsvariablen — so kann jede Gemeinde ihr eigenes Händlerkonto verwenden.

1. Holen Sie sich Entwickler-Zugangsdaten bei [Stripe](https://dashboard.stripe.com/) (Developers → API keys) oder [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Gehen Sie in B1 Admin zu **Settings → Giving Settings**.
3. Wählen Sie Ihren Anbieter, fügen Sie die öffentlichen und die geheimen Schlüssel ein und konfigurieren Sie die Behandlung der Gebühren.
4. Optional fügen Sie `GOOGLE_RECAPTCHA_SECRET_KEY` zum Dienst **Api** in Railway hinzu, um öffentliche Spendenformulare vor Bots zu schützen.

### 5. Dateispeicher {#5-file-storage}

Die Vorlage stellt ein **1 GB großes persistentes Volume** bereit, das am Dienst Api eingehängt ist, für Mitgliederfotos, Predigtdateien und hochgeladene Dokumente.

Um es zu vergrößern: Öffnen Sie den Dienst Api → **Volumes** und passen Sie den Größenregler an.

Für größere Bereitstellungen (100+ GB oder viele gleichzeitige Uploads) stellen Sie auf S3 um, indem Sie folgende Variablen am Dienst **Api** setzen:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Vorhandene Dateien im Volume werden nicht automatisch übernommen — kopieren Sie sie in den Bucket, bevor Sie die Variable umstellen.

### 6. Optionale Funktionserweiterungen {#6-optional-feature-integrations}

Diese schalten bestimmte Funktionen frei und können jederzeit über das Railway-Dashboard ergänzt werden. Setzen Sie sie am Dienst **Api**.

| Variable | Freigeschaltete Funktion |
|----------|--------------------|
| `OPENAI_API_KEY` *oder* `OPENROUTER_API_KEY` | KI-gestützte Suche und Vorschläge für Inhalte |
| `YOUTUBE_API_KEY` | Suche und Einbettung von YouTube-Predigten |
| `PEXELS_KEY` | Auswahl von Stockfotos für den Website-Builder |
| `VIMEO_TOKEN` | Unterstützung für Vimeo-Predigten |
| `API_BIBLE_KEY` | Nachschlagen von Bibelversen in Lektionen und Inhalten |
| `YOUVERSION_API_KEY` | Integration der YouVersion-Bibel |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Browser-Push-Benachrichtigungen ([VAPID-Schlüsselpaar erzeugen](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Optionale CRM-Synchronisierung für neue Anmeldungen |

## Aktualisierung

Jeder Dienst ist mit dem jeweiligen GitHub-Repository verknüpft. Pushes auf `main` in `ChurchApps/Api`, `ChurchApps/B1Admin` oder `ChurchApps/B1App` lösen automatische Neubereitstellungen aus.

Um eine bestimmte Version festzulegen, ändern Sie bei jedem Dienst die Einstellung **Branch** auf ein Tag oder einen Release-Branch. Dies ist die empfohlene Einrichtung für die Produktion — eine automatische Bereitstellung von `main` übernimmt jede laufende Arbeit, die dort gerade eingecheckt wird.

## Kosten {#costs}

Realistische Größenordnungen für eine kleine Gemeinde (unter 200 Mitglieder, geringer Datenverkehr):

| Komponente | Ungefähre monatliche Kosten |
|-----------|---------------------|
| Railway-Grundgebühr | 5 $ |
| MySQL-Plugin | 5 $ + ~1 $ Speicher |
| Rechenleistung für 3 Web-Dienste | 3–10 $ zusammen |
| 1 GB-Volume | 0,25 $ |
| **Gesamt** | **~15–25 $ pro Monat** |

Die Kosten wachsen linear mit dem Datenverkehr, den Foto-Uploads und der Größe der Datenbank. Railway zeigt die aktuelle Nutzung im Tab **Usage** des Projekts an — setzen Sie dort Ausgabenlimits, um Ihr Risiko zu begrenzen.

## Fehlerbehebung

| Symptom | Wahrscheinliche Ursache | Lösung |
|---------|--------------|-----|
| Build schlägt fehl mit `EBUSY: rmdir '/app/node_modules/.cache'` | Konflikt beim Cache-Mount von Nixpacks | Setzen Sie `NIXPACKS_NO_CACHE=true` am betroffenen Dienst |
| Build von B1Admin schlägt fehl mit `Missing: @types/...` | Veraltete `package-lock.json` | Den neuesten Stand von `main` abrufen |
| Bereitstellung von Api hängt bei „Deploying“ | Health-Check schlägt fehl — `/health` liefert keine 200 | Bereitstellungsprotokolle ansehen; meist fehlt eine erforderliche Umgebungsvariable |
| B1Admin zeigt „check your email“, aber keine E-Mail kommt an | `MAIL_SYSTEM=SMTP` gesetzt, aber Zugangsdaten fehlen oder sind falsch | Zugangsdaten korrigieren oder `MAIL_SYSTEM` entfernen, um E-Mail zu deaktivieren |
| Anmeldung leitet auf `api.churchapps.org` um | `REACT_APP_STAGE` ist `prod` | Setzen Sie `REACT_APP_STAGE=custom` am Dienst B1Admin |
| Alle Gemeinden mit Subdomain zeigen denselben Inhalt | `REACT_APP_B1_WEBSITE_URL` enthält nicht den Platzhalter `{subdomain}` | Setzen Sie z. B. `https://{subdomain}.yourchurch.org` |
| Eigene Domain zeigt „Application not found“ | DNS noch nicht verbreitet oder Zertifikat von Railway ausstehend | 5 Minuten warten; DNS mit `dig admin.yourchurch.org` prüfen |

Falls Sie auf etwas stoßen, das hier nicht aufgeführt ist, eröffnen Sie ein Issue unter [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) und fügen Sie die Bereitstellungsprotokolle bei.

## Verwandte Artikel

- **[Selbst-Hosting mit Docker](./docker)** — derselbe Stack auf eigener Hardware oder einem VPS
- **[Ersteinrichtung](../../getting-started/initial-setup)** — erste Schritte, nachdem Ihre Gemeinde angelegt wurde
- **[Website-Ersteinrichtung](../../b1-admin/website/initial-setup)** — Konfiguration der öffentlichen Website Ihrer Gemeinde
- **[Spendeneinstellungen](../../b1-admin/donations/online-giving-setup)** — Stripe oder PayPal anbinden
- **[Lokale API-Einrichtung](../api/local-setup)** — den Stack lokal für die Entwicklung ausführen
- **[API-Bereitstellung (AWS)](./apis)** — wie das offizielle SaaS von ChurchApps bereitgestellt wird
