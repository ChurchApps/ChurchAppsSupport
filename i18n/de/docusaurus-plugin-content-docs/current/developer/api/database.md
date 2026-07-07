---
title: "Datenbank"
---

# Datenbank

<div class="article-intro">

Die ChurchApps-API verwendet eine **Datenbank-pro-Modul**-Architektur. Jedes der sechs Datenmodule hat seine eigene MySQL-Datenbank mit einem unabhängigen Verbindungspool, was klare Datengrenzen bietet, während alles innerhalb einer einzelnen Bereitstellung bleibt.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **MySQL 8.0+** — siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Datenbankverbindungszeichenfolgen in Ihrer `.env`-Datei — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Architekturübersicht

```
Api
├── membership_db   ← Personen, Gruppen, Berechtigungen
├── attendance_db   ← Dienste, Sitzungen, Aufzeichnungen
├── content_db      ← Seiten, Abschnitte, Elemente
├── giving_db       ← Spenden, Fonds, Zahlungen
├── messaging_db    ← Gespräche, Benachrichtigungen
└── doing_db        ← Aufgaben, Pläne, Zuweisungen
```

### Wichtige Entwurfsentscheidungen

- **Eine Datenbank pro Modul** — Jedes Modul verwaltet seine eigene MySQL-Datenbank mit einem dedizierten Verbindungspool (verwaltet durch `KyselyPool`). Dies hält Module entkoppelt und ermöglicht eine unabhängige Schemaentwicklung.
- **Ausschließliches Eigentum** — Die Tabellen eines Moduls werden nur vom eigenen Code dieses Moduls gelesen und geschrieben. Wenn ein anderes Modul die Daten benötigt, ruft es das Gateway des besitzenden Moduls auf, anstatt die Tabellen selbst abzufragen — siehe [Modulübergreifende Kommunikation](./module-structure#cross-module-communication).
- **Repository-Muster ohne ORM** — Alle Datenzugriffe laufen durch Repository-Klassen, die typisierte SQL mit dem Kysely-Abfragegenerator gegen das Schema des Moduls erstellen. Dies gibt vollständige Kontrolle über Abfrageleistung und -verhalten.
- **Multi-Tenant nach Design** — Jede Abfrage ist auf `churchId` begrenzt. Alle Tabellen enthalten eine `churchId`-Spalte, und die Repository-Ebene erzwingt Mandantenisolation automatisch.

## Verbindungszeichenfolgen

Jede Datenbankverbindung eines Moduls wird in `.env` mit dem standardmäßigen MySQL-Verbindungszeichenfolgen-Format konfiguriert:

```
mysql://user:password@host:port/database
```

Ein lokales Entwicklungssetup könnte zum Beispiel so aussehen:

Jedes Modul liest seine Verbindung aus einer Umgebungsvariablen mit dem Namen `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In der Produktion werden Verbindungszeichenfolgen im AWS SSM Parameter Store gespeichert und von der `Environment`-Klasse beim Start gelesen.
:::

## Schema-Skripte

Tabellenschemata werden als Kysely-Migrationen im Verzeichnis `tools/migrations/` definiert, organisiert nach Modul:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrationen definieren Tabellenerstellung, Indizes und Schemaänderungen. Das Verzeichnis `tools/dbScripts/` enthält Demo- und Seed-Daten, die oben auf dem Schema geladen werden können.

## Datenbankinitialisierung

### Alle Datenbanken initialisieren

```bash
npm run initdb
```

Dies erstellt alle sechs Datenbanken und führt die Migrationen für jede aus.

### Ein einzelnes Modul initialisieren

```bash
npm run initdb -- --module=membership
```

:::tip
Wenn Sie an einem bestimmten Modul arbeiten, können Sie die Datenbank dieses Moduls neu initialisieren, ohne die anderen zu beeinflussen.
:::

## Datenzugriffsmuster

Repositories erstellen Abfragen mit dem Kysely-Abfragegenerator gegen das typisierte Datenbankschema des Moduls, das über die `getDb()`-Funktion des Moduls erhalten wird. Eine typische Repository-Methode sieht wie folgt aus:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositories werden über `RepoManager` erhalten:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Fügen Sie immer `churchId` in Ihre Abfragen ein, um die Multi-Tenant-Isolation zu erhalten. Fragen Sie nie Mandanten übergreifend ab, es sei denn, Sie haben einen bestimmten, autorisierten Grund dafür.
:::

## Modulübergreifende Verweise

Da die Daten jedes Moduls in einer separaten Datenbank vorhanden sind, gibt es keine Fremdschlüssel oder SQL-Joins über Modulgrenzen hinweg. Ein Datensatz, der sich auf Daten eines anderen Moduls bezieht, speichert die ID dieses Datensatzes — beispielsweise trägt eine Spende in der Spendendatenbank die `personId` einer Person in der Mitgliedschaftsdatenbank — und jede modulübergreifende Zusammensetzung erfolgt in Anwendungscode.

Diese Einschränkung ist es, was die Modulgrenzen real macht: Jedes Schema kann sich unabhängig entwickeln, die Datenbank eines Moduls kann auf seinen eigenen Server verschoben werden, und ein Modul könnte sogar in einen eigenständigen Service extrahiert werden, ohne freigegebene Tabellen oder Datenbanken übergreifende Abfragen zu entwirren.

## Verwandte Artikel

- **[Modulstruktur](./module-structure)** — Wie Controller und Repositories in jedem Modul organisiert sind
- **[Lokales API-Setup](./local-setup)** — Vollständige Schritt-für-Schritt-Anleitung zum Einrichten
