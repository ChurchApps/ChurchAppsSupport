---
title: "Datenbank"
---

# Datenbank

<div class="article-intro">

Die ChurchApps-API verwendet eine **Datenbank-pro-Modul**-Architektur. Jedes der sechs Datenmodule besitzt seine eigene MySQL-Datenbank mit einem unabhängigen Connection-Pool, was klare Datengrenzen schafft und gleichzeitig alles innerhalb eines einzigen Deployments hält.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Installieren Sie **MySQL 8.0+** -- siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie die Datenbank-Verbindungszeichenfolgen in Ihrer `.env`-Datei -- siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Architekturübersicht

```
Api
├── membership_db   ← Personen, Gruppen, Berechtigungen
├── attendance_db   ← Gottesdienste, Sitzungen, Datensätze
├── content_db      ← Seiten, Abschnitte, Elemente
├── giving_db       ← Spenden, Fonds, Zahlungen
├── messaging_db    ← Konversationen, Benachrichtigungen
└── doing_db        ← Aufgaben, Pläne, Zuweisungen
```

### Wichtige Designentscheidungen

- **Eine Datenbank pro Modul** -- Jedes Modul unterhält seine eigene MySQL-Datenbank mit einem dedizierten Connection-Pool (verwaltet von `KyselyPool`). Dies hält die Module entkoppelt und ermöglicht eine unabhängige Schema-Entwicklung.
- **Exklusiver Besitz** -- Die Tabellen eines Moduls werden nur vom eigenen Code dieses Moduls gelesen und beschrieben. Wenn ein anderes Modul die Daten benötigt, ruft es das Gateway des besitzenden Moduls auf, anstatt die Tabellen selbst abzufragen -- siehe [Modulübergreifende Kommunikation](./module-structure#cross-module-communication).
- **Repository-Muster ohne ORM** -- Der gesamte Datenzugriff erfolgt über Repository-Klassen, die mit dem Kysely-Query-Builder typisiertes SQL gegen das Schema des Moduls erstellen. Dies bietet volle Kontrolle über Abfrageleistung und -verhalten.
- **Multi-Tenant per Design** -- Jede Abfrage ist nach `churchId` abgegrenzt. Alle Tabellen enthalten eine `churchId`-Spalte, und die Repository-Schicht erzwingt die Mandantenisolation automatisch.

## Verbindungszeichenfolgen

Die Datenbankverbindung jedes Moduls wird in `.env` im Standard-MySQL-Verbindungszeichenfolgenformat konfiguriert:

```
mysql://user:password@host:port/database
```

Ein lokales Entwicklungssetup könnte beispielsweise so aussehen:

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
In der Produktion werden Verbindungszeichenfolgen im AWS SSM Parameter Store gespeichert und beim Start von der `Environment`-Klasse gelesen.
:::

## Schema-Skripte

Tabellenschemas werden als Kysely-Migrationen im Verzeichnis `tools/migrations/` definiert, organisiert nach Modul:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrationen definieren Tabellenerstellung, Indizes und Schemaänderungen. Das Verzeichnis `tools/dbScripts/` enthält Demo- und Seed-Daten, die zusätzlich zum Schema geladen werden können.

## Datenbankinitialisierung

### Alle Datenbanken initialisieren

```bash
npm run initdb
```

Dies erstellt alle sechs Datenbanken und führt die Migrationen für jede von ihnen aus.

### Ein einzelnes Modul initialisieren

```bash
npm run initdb -- --module=membership
```

:::tip
Wenn Sie an einem bestimmten Modul arbeiten, können Sie nur die Datenbank dieses Moduls neu initialisieren, ohne die anderen zu beeinträchtigen.
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
Nehmen Sie immer `churchId` in Ihre Abfragen auf, um die Multi-Tenant-Isolation aufrechtzuerhalten. Fragen Sie niemals mandantenübergreifend ab, es sei denn, Sie haben einen konkreten, autorisierten Grund dafür.
:::

## Modulübergreifende Referenzen

Da die Daten jedes Moduls in einer separaten Datenbank liegen, gibt es keine Fremdschlüssel oder SQL-Joins über Modulgrenzen hinweg. Ein Datensatz, der sich auf Daten eines anderen Moduls bezieht, speichert die ID dieses Datensatzes -- zum Beispiel trägt eine Spende in der Giving-Datenbank die `personId` einer Person aus der Membership-Datenbank -- und jede modulübergreifende Zusammensetzung erfolgt im Anwendungscode.

Diese Einschränkung ist es, was die Modulgrenzen real macht: Jedes Schema kann sich unabhängig weiterentwickeln, die Datenbank eines Moduls kann auf einen eigenen Server verschoben werden, und ein Modul könnte sogar zu einem eigenständigen Dienst extrahiert werden, ohne gemeinsam genutzte Tabellen oder datenbankübergreifende Abfragen entwirren zu müssen.

## Verwandte Artikel

- **[Modulstruktur](./module-structure)** -- Wie Controller und Repositories innerhalb jedes Moduls organisiert sind
- **[Lokale API-Einrichtung](./local-setup)** -- Vollständige Schritt-für-Schritt-Anleitung zur Einrichtung
