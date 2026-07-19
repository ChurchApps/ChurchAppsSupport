---
title: "Datenbank"
---

# Datenbank

<div class="article-intro">

Die ChurchApps-API verwendet eine **Datenbank-pro-Modul**-Architektur. Jedes der sechs Datenmodule hat seine eigene MySQL-Datenbank mit einem unabhängigen Verbindungspool, der klare Datengrenzen bietet und gleichzeitig alles innerhalb einer einzelnen Bereitstellung hält.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **MySQL 8.0+** – siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Datenbankverbindungszeichenfolgen in Ihrer `.env`-Datei – siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Architekturübersicht

```
Api
├── membership_db   ← Personen, Gruppen, Berechtigungen
├── attendance_db   ← Dienste, Sitzungen, Datensätze
├── content_db      ← Seiten, Abschnitte, Elemente
├── giving_db       ← Spenden, Fonds, Zahlungen
├── messaging_db    ← Unterhaltungen, Benachrichtigungen
└── doing_db        ← Aufgaben, Pläne, Zuordnungen
```

### Wichtige Designentscheidungen

- **Eine Datenbank pro Modul** – Jedes Modul verwaltet seine eigene MySQL-Datenbank mit einem dedizierten Verbindungspool (verwaltet durch `KyselyPool`). Dies hält Module entkoppelt und ermöglicht eine unabhängige Schemaentwicklung.
- **Ausschließliches Eigentum** – Die Tabellen eines Moduls werden nur vom Code dieses Moduls selbst gelesen und geschrieben. Wenn ein anderes Modul die Daten benötigt, ruft es das Gateway des Besitzermoduls auf, anstatt die Tabellen selbst abzufragen – siehe [Modulübergreifende Kommunikation](./module-structure#cross-module-communication).
- **Repository-Muster ohne ORM** – Alle Datenzugriffe erfolgen über Repository-Klassen, die typisiertes SQL mit dem Kysely Query Builder gegen das Schema des Moduls erstellen. Dies gibt volle Kontrolle über die Abfrageleistung und das Verhalten.
- **Multi-Tenant nach Design** – Jede Abfrage ist nach `churchId` scoped. Alle Tabellen enthalten eine `churchId`-Spalte und die Repository-Schicht erzwingt automatisch Mietisolation.

## Verbindungszeichenfolgen

Jede Modulendatenbankverbindung wird in `.env` unter Verwendung des Standard-MySQL-Verbindungszeichenfolgenformats konfiguriert:

```
mysql://user:password@host:port/database
```

Beispielsweise könnte eine lokale Entwicklungseinrichtung wie folgt aussehen:

Jedes Modul liest seine Verbindung aus einer Umgebungsvariablen namens `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In der Produktion werden Verbindungszeichenfolgen im AWS SSM Parameter Store gespeichert und beim Start von der `Environment`-Klasse gelesen.
:::

## Schemascripts

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

Migrationen definieren Tabellenerstellung, Indizes und Schemänderungen. Das Verzeichnis `tools/dbScripts/` enthält Demo- und Seed-Daten, die auf dem Schema laden können.

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
Wenn Sie an einem bestimmten Modul arbeiten, können Sie nur die Datenbank dieses Moduls neu initialisieren, ohne die anderen zu beeinflussen.
:::

## Datenzugriffsmuster

Repositories erstellen Abfragen mit dem Kysely Query Builder gegen das typisierte Datenbankschema des Moduls, das durch die `getDb()`-Funktion des Moduls erhalten wird. Eine typische Repository-Methode sieht so aus:

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
Schließen Sie immer `churchId` in Ihre Abfragen ein, um Multi-Tenant-Isolation zu gewährleisten. Fragen Sie niemals über Mandanten ab, es sei denn, Sie haben einen spezifischen, autorisierten Grund dafür.
:::

## Modulübergreifende Referenzen

Da die Daten jedes Moduls in einer separaten Datenbank leben, gibt es keine Fremdschlüssel oder SQL-Joins über Modulgrenzen hinweg. Ein Datensatz, der sich auf die Daten eines anderen Moduls bezieht, speichert die ID dieses Datensatzes – beispielsweise trägt eine Spende in der Giving-Datenbank die `personId` einer Person in der Membership-Datenbank – und jede modulübergreifende Zusammensetzung erfolgt im Anwendungscode.

Diese Einschränkung ist, was die Modulgrenzen real macht: Jedes Schema kann sich unabhängig entwickeln, die Datenbank eines Moduls kann auf seinen eigenen Server verschoben werden, und ein Modul könnte sogar in einen eigenständigen Service extrahiert werden, ohne gemeinsame Tabellen oder modulübergreifende Abfragen zu entwirren.

## Verwandte Artikel

- **[Modulstruktur](./module-structure)** – Wie Controller und Repositories innerhalb jedes Moduls organisiert sind
- **[Lokale API-Einrichtung](./local-setup)** – Vollständige Schritt-für-Schritt-Anleitung zur Einrichtung
