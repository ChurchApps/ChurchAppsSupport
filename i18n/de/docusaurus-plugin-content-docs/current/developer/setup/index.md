---
title: "Einrichtung"
---

# Einrichtung

<div class="article-intro">

Dieser Abschnitt führt Sie durch die Einrichtung einer lokalen Entwicklungsumgebung für ChurchApps-Projekte. Sie können Ihr Frontend für schnelle Entwicklung auf die gemeinsamen Demo-APIs ausrichten oder für Backend-Arbeiten den gesamten Stack lokal ausführen.

</div>

## Zwei Vorgehensweisen

Es gibt zwei Wege zur lokalen Entwicklung, je nachdem, wie viel vom Stack Sie benötigen:

### 1. Auf die Demo-APIs zeigen (am einfachsten)

Wenn Sie an einem **Frontend-Projekt** arbeiten (Web-App, mobile App oder Desktop-App), ist der schnellste Weg, Ihre lokale App auf die gemeinsamen Demo-APIs zeigen zu lassen. Es ist keine Datenbank- oder Backend-Einrichtung nötig.

Die Basis-URL der Demo-API lautet:

```
https://api.demo.churchapps.org
```

Jedes API-Modul ist unter einem Pfad unterhalb dieser Basis erreichbar, zum Beispiel:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Die Demo-Umgebung führt den neuesten Code aus `main` aus, und ihre Beispieldaten werden jede Nacht neu befüllt. Erwarten Sie daher nicht, dass dort Erstelltes dauerhaft erhalten bleibt. (Die frühere Staging-Umgebung `api.staging.churchapps.org` wurde eingestellt. Einige Beispiel-`.env`-Dateien verweisen womöglich noch auf Staging-URLs – ersetzen Sie diese durch die Demo- oder lokalen URLs.)

:::tip
Mit diesem Weg können Sie innerhalb weniger Minuten mit Frontend-Änderungen beginnen. Er ist für die meisten Mitwirkenden der empfohlene Weg.
:::

### 2. Alles lokal ausführen

Wenn Sie API-Code ändern oder offline arbeiten müssen, können Sie den gesamten Stack lokal ausführen. Dafür benötigen Sie MySQL 8.0 oder neuer und zusätzliche Konfiguration. Ausführliche Anleitungen finden Sie im Leitfaden zur [lokalen API-Einrichtung](../api/local-setup).

## Erste Schritte

Folgen Sie diesen Seiten in dieser Reihenfolge:

1. **[Voraussetzungen](prerequisites)** – Installieren Sie die benötigten Werkzeuge (Node.js, Git, MySQL usw.)
2. **[Projektübersicht](project-overview)** – Verstehen Sie, welche Projekte es gibt und was sie tun
3. **[Umgebungsvariablen](environment-variables)** – Konfigurieren Sie Ihre `.env`-Dateien, um alles miteinander zu verbinden

:::info
Jedes ChurchApps-Projekt ist ein eigenständiges Git-Repository. Sie müssen nur die Projekte klonen, an denen Sie arbeiten möchten.
:::
