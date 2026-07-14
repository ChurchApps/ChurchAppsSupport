---
title: "Datenbank"
---

# Datenbank

<div class="article-intro">

Die ChurchApps-API verwendet eine Architektur mit einer Datenbank pro Modul. Jedes der sechs Datenmodule hat seine eigene MySQL-Datenbank mit einem unabhängigen Verbindungspool, was klare Datengrenzen bietet und gleichzeitig alles innerhalb einer einzigen Bereitstellung hält.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie MySQL 8.0+ -- siehe Voraussetzungen
- Konfigurieren Sie Datenbankverbindungszeichenfolgen in Ihrer `.env`-Datei -- siehe Umgebungsvariablen

</div>

## Architekturübersicht

```
Api
├── membership_db   ← Personen, Gruppen, Berechtigungen
├── attendance_db   ← Gottesdienste, Sitzungen, Datensätze
├── content_db      ← Seiten, Abschnitte, Elemente
├── giving_db       ← Spenden, Fonds, Zahlungen
├── messaging_db    ← Gespräche, Benachrichtigungen
└── doing_db        ← Aufgaben, Pläne, Zuweisungen
```

### Wichtige Designentscheidungen

- Eine Datenbank pro Modul -- Jedes Modul unterhält seine eigene MySQL-Datenbank mit einem dedizierten Verbindungspool (verwaltet von `KyselyPool`). Dies hält Module entkoppelt und ermöglicht eine unabhängige Schemaentwicklung.
- Exklusiver Besitz -- Die Tabellen eines Moduls werden nur vom eigenen Code dieses Moduls gelesen und geschrieben. Wenn ein anderes Modul die Daten benötigt, ruft es das Gateway des besitzenden Moduls auf, statt die Tabellen selbst abzufragen -- siehe modulübergreifende Kommunikation.
- Repository-Muster ohne ORM -- Aller Datenzugriff erfolgt über Repository-Klassen, die typisiertes SQL mit dem Kysely-Query-Builder gegen das Schema des Moduls erstellen. Dies gibt volle Kontrolle über Abfrageleistung und -verhalten.
- Multi-Tenant per Design -- Jede Abfrage ist nach `churchId` gescoped. Alle Tabellen enthalten eine `churchId`-Spalte, und die Repository-Ebene erzwingt automatisch die Mandantenisolation.

## Verbindungszeichenfolgen

Die Datenbankverbindung jedes Moduls wird in `.env` mit dem standardmäßigen MySQL-Verbindungsformat konfiguriert:

```
mysql://user:password@host:port/database
```

Zum Beispiel könnte eine lokale Entwicklungseinrichtung so aussehen:

Jedes Modul liest seine Verbindung aus einer Umgebungsvariable namens `<MODULE>_CONNECTION_STRING`:

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

Tabellenschemata sind als Kysely-Migrationen im Verzeichnis `tools/migrations/` definiert, organisiert nach Modul:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrationen definieren Tabellenerstellung, Indizes und Schemaänderungen. Das Verzeichnis `tools/dbScripts/` enthält Demo- und Beispieldaten, die auf dem Schema geladen werden können.

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
Wenn Sie an einem bestimmten Modul arbeiten, können Sie nur dessen Datenbank neu initialisieren, ohne die anderen zu beeinflussen.
:::

## Datenzugriffsmuster

Repositories erstellen Abfragen mit dem Kysely-Query-Builder gegen das typisierte Datenbankschema des Moduls, das über die `getDb()`-Funktion des Moduls bezogen wird. Eine typische Repository-Methode sieht so aus:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositories werden über `RepoManager` bezogen:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Fügen Sie immer `churchId` in Ihre Abfragen ein, um die Multi-Tenant-Isolation zu wahren. Fragen Sie niemals mandantenübergreifend ab, es sei denn, Sie haben einen spezifischen, autorisierten Grund dafür.
:::

## Modulübergreifende Referenzen

Da die Daten jedes Moduls in einer separaten Datenbank leben, gibt es keine Fremdschlüssel oder SQL-Joins über Modulgrenzen hinweg. Ein Datensatz, der sich auf die Daten eines anderen Moduls bezieht, speichert die ID dieses Datensatzes -- zum Beispiel trägt eine Spende in der Giving-Datenbank die `personId` einer Person in der Membership-Datenbank -- und jede modulübergreifende Zusammensetzung erfolgt im Anwendungscode.

Diese Einschränkung macht die Modulgrenzen real: Jedes Schema kann sich unabhängig weiterentwickeln, die Datenbank eines Moduls kann auf einen eigenen Server verschoben werden, und ein Modul könnte sogar in einen eigenständigen Dienst extrahiert werden, ohne gemeinsam genutzte Tabellen oder modulübergreifende Abfragen entwirren zu müssen.

## Verwandte Artikel

- Modulstruktur -- Wie Controller und Repositories innerhalb jedes Moduls organisiert sind
- Lokale API-Einrichtung -- Vollständige Schritt-für-Schritt-Anleitung zur Einrichtung
