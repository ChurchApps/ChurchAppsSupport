---
title: "Datenbank"
---

# Datenbank

<div class="article-intro">

Die ChurchApps API verwendet eine **Datenbank-pro-Modul**-Architektur. Jedes der sechs Module hat seine eigene MySQL-Datenbank mit einem unabhängigen Connection Pool, was klare Datengrenzen bietet, während alles in einer einzigen Bereitstellung bleibt.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Installieren Sie **MySQL 8.0+** — siehe [Voraussetzungen](../setup/prerequisites)
- Konfigurieren Sie Datenbank-Verbindungszeichenfolgen in Ihrer `.env`-Datei — siehe [Umgebungsvariablen](../setup/environment-variables)

</div>

## Architekturübersicht

```
Api
├── membership_db   ← Personen, Gruppen, Berechtigungen
├── attendance_db   ← Dienste, Sessions, Aufzeichnungen
├── content_db      ← Seiten, Abschnitte, Elemente
├── giving_db       ← Spenden, Fonds, Zahlungen
├── messaging_db    ← Unterhaltungen, Benachrichtigungen
└── doing_db        ← Aufgaben, Pläne, Zuweisungen
```

### Wichtige Designentscheidungen

- **Eine Datenbank pro Modul** — Jedes Modul verwaltet seine eigene MySQL-Datenbank mit einem dedizierten Connection Pool (`EnhancedPoolHelper`). Dies hält Module entkoppelt und ermöglicht unabhängige Schemaentwicklung.
- **Repository-Muster mit direktem SQL** — Es gibt kein ORM. Alle Datenzugriffe erfolgen über Repository-Klassen, die SQL direkt mit `DB.query()` ausführen. Dies gibt volle Kontrolle über Query-Performance und Verhalten.
- **Multi-Tenant nach Design** — Jede Query wird durch `churchId` begrenzt. Alle Tabellen enthalten eine `churchId`-Spalte, und die Repository-Schicht erzwingt Tenant-Isolation automatisch.

## Verbindungszeichenfolgen

Jede Datenbankverbindung des Moduls wird in `.env` unter Verwendung von Standard-MySQL-Verbindungszeichenfolgen-Format konfiguriert:

```
mysql://user:password@host:port/database
```

Zum Beispiel könnte eine lokale Entwicklung so aussehen:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In Produktion werden Verbindungszeichenfolgen im AWS SSM Parameter Store gespeichert und von der `Environment`-Klasse beim Start gelesen.
:::

## Schema-Skripte

Datenbank-Schema-Skripte befinden sich im Verzeichnis `tools/dbScripts/`, organisiert nach Modul:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Diese Skripte definieren Tabellenerstellung, Indizes und alle erforderlichen Seed-Daten.

## Datenbankinitialisierung

### Alle Datenbanken initialisieren

```bash
npm run initdb
```

Dies erstellt alle sechs Datenbanken und führt die Schema-Skripte für jede aus.

### Ein einzelnes Modul initialisieren

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Beim Arbeiten mit einem bestimmten Modul können Sie nur die Datenbank dieses Moduls neu initialisieren, ohne andere zu beeinflussen.
:::

## Datenzugriffsmuster

Repositories greifen auf Daten über die `DB.query()`-Methode zu. Eine typische Repository-Methode sieht so aus:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Repositories werden über `RepositoryManager` erhalten:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Beziehen Sie immer `churchId` in Ihre Queries ein, um Multi-Tenant-Isolation zu wahren. Fragen Sie nie über Tenants hinweg ab, es sei denn, Sie haben einen spezifischen, autorisierten Grund dafür.
:::

## Verwandte Artikel

- **[Modulstruktur](./module-structure)** — Wie Controller und Repositories in jedem Modul organisiert sind
- **[Lokales API-Setup](./local-setup)** — Vollständiger Schritt-für-Schritt-Setup-Leitfaden
