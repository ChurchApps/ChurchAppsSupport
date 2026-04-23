---
title: "Setup"
---

# Setup

<div class="article-intro">

Dieser Abschnitt führt Sie durch das Setup einer lokalen Entwicklungsumgebung für ChurchApps-Projekte. Sie können entweder Ihr Frontend auf gemeinsame Staging-APIs zeigen für schnelle Entwicklung, oder den vollständigen Stack lokal für Backend-Arbeiten ausführen.

</div>

## Zwei Ansätze

Es gibt zwei Wege zur Entwicklung lokal, je nachdem, wie viel des Stacks Sie benötigen:

### 1. Zu Staging-APIs zeigen (Am einfachsten)

Wenn Sie an einem **Frontend-Projekt** arbeiten (Web-App, Mobile-App oder Desktop-App), ist der schnellste Pfad, Ihr lokales App auf die gemeinsamen Staging-APIs zu zeigen. Kein Datenbank- oder Backend-Setup erforderlich.

Die Staging-API-Basis-URL ist:

```
https://api.staging.churchapps.org
```

Jedes API-Modul ist unter einem Pfad verfügbar, zum Beispiel:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Dieser Ansatz ermöglicht es Ihnen, in Minuten mit Frontend-Änderungen zu beginnen. Es ist der empfohlene Pfad für die meisten Beitragenden.
:::

### 2. Alles lokal ausführen

Wenn Sie API-Code modifizieren oder offline arbeiten müssen, können Sie den vollständigen Stack lokal ausführen. Dies erfordert MySQL 8.0+ und zusätzliche Konfiguration. Siehe [API lokales Setup](../api/local-setup)-Leitfaden für detaillierte Anweisungen.

## Erste Schritte

Folgen Sie diesen Seiten in Reihenfolge:

1. **[Voraussetzungen](prerequisites)** — Installieren Sie die erforderlichen Werkzeuge (Node.js, Git, MySQL, usw.)
2. **[Projekt-Übersicht](project-overview)** — Verstehen Sie, welche Projekte existieren und was sie tun
3. **[Umgebungsvariablen](environment-variables)** — Konfigurieren Sie Ihre `.env`-Dateien, um alles zusammen zu verbinden

:::info
Jedes ChurchApps-Projekt ist ein unabhängiges Git-Repository. Sie müssen nur die spezifischen Projekte klonen, die Sie bearbeiten möchten.
:::
