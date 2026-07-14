---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Jedes API-Modul folgt einer konsistenten internen Struktur mit Controllern, Repositories, Modellen und Helpern. Das Verständnis dieses Layouts macht es unkompliziert, sich in der Codebasis zurechtzufinden und neue Funktionalität zu einem beliebigen Modul hinzuzufügen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie die API lokal ein — siehe [Lokales API-Setup](./local-setup)
- Überprüfen Sie die [Datenbank](./database)-Architektur um die Datenzugriffschicht zu verstehen

</div>

## Verzeichnislayout

Module befinden sich unter `src/modules/{name}/`. Ein typisches Modul enthält vier Verzeichnisse:

```
src/modules/{name}/
├── controllers/    ← Route Handler (Express Endpunkte)
├── repositories/   ← Datenzugriffschicht (typisierte SQL Queries)
├── models/         ← TypeScript Interfaces und Typen
└── helpers/        ← Modulspezifische Geschäftslogik
```

Zum Beispiel das Membership-Modul:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Die sechs Kern-Datenmodule — membership, attendance, content, giving, messaging und doing — folgen alle diesem Layout. Ein paar spezialisierte Module (wie reporting, das Berichte über Module hinweg bereitstellt und keine eigenen Daten besitzt) befinden sich neben ihnen unter `src/modules/`.

## Eine Anwendung, viele Module

Die API ist ein **modulares Monolith**: Module kennzeichnen Grenzen der Code-Organisation und Datenverantwortung, keine separaten Dienste. Bei Start werden alle Module-Controller in einen einzelnen Dependency-Injection-Container hinter einer Express-Anwendung registriert, so wird die gesamte API gebaut, läuft und deployiert als eine Einheit — die bereitgestellten Funktionen werden alle zu Einstiegspunkten dieser gleichen Anwendung.

Alle Routes eines Moduls befinden sich unter einem URL-Präfix, der dem Modulnamen entspricht:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Dies hält jedes Modul der API-Oberfläche in sich geschlossen, während Clients immer noch mit einem einzelnen Host sprechen.

## Controller

Controller definieren die API-Routes für ein Modul. Jedes Modul hat seinen eigenen Base-Controller (zum Beispiel `MembershipBaseController`), der den gemeinsamen `BaseController` erweitert — selbst auf `CustomBaseController` aus `@churchapps/apihelper` gebaut. Routes werden mit Inversify Decorators registriert.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Der `actionWrapper` authentifiziert den Request und hydratisiert `this.repos` mit den Repositories des Moduls, bevor Ihre Action läuft.

### Route Decorators

| Decorator | HTTP-Methode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Der `@controller("/base")` Decorator setzt den Basispfad für alle Routes im Controller.

## Repositories

Repositories handhaben alle Datenbankoperationen. Es gibt kein ORM — Queries sind mit dem Kysely Query Builder geschrieben, typisiert gegen das Datenbankschema des Moduls. Jedes Modul's `db/index.ts` exponiert eine `getDb()`-Funktion, die eine typisierte Kysely-Instanz des Moduls zurückgibt.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Innerhalb eines Controllers sind die Repositories des Moduls als `this.repos` verfügbar. Außerhalb von Controllern, erhalten Sie sie durch `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Cross-Modul Kommunikation

Jedes Modul besitzt seine eigene Datenbank (siehe [Datenbank](./database)), und ein Modul fragt nie direkt eine andere Modultabelle ab. Wenn ein Modul Daten benötigt, die von einem anderen Modul besessen werden — zum Beispiel das doing-Modul, das Menschen aus membership auflöst — geht es durch das besitzende Modul's **Gateway** in `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Jedes Gateway (`MembershipModuleGateway`, `GivingModuleGateway` usw.) ist ein TypeScript Interface, das genau definiert, welche Operationen das besitzende Modul dem Rest der API exponiert. Das Interface ist der Vertrag: Die aktuellen Implementierungen lesen die besitzende Moduldatenbank in-process, aber da Aufrufer nur vom Interface abhängen, könnte eine Implementierung ausgetauscht werden — zum Beispiel für eine, die HTTP Aufrufe macht — wenn ein Modul je in einen separaten Service extrahiert werden würde.

:::info
Wenn die Daten, die Sie benötigen, in einem anderen Modul leben und sein Gateway keine Operation dafür exponiert, erweitern Sie das Gateway-Interface anstelle von Reaching in die anderen Modul-Repositories oder Datenbank.
:::

## Authentifizierung und Autorisierung

### JWT-Authentifizierung

Alle Requests werden durch JWT-Tokens authentifiziert, die von `CustomAuthProvider` behandelt werden. Das Token ist automatisch validiert und der authentifizierte Benutzer-Context (`au`) ist in jedem Controller-Action verfügbar.

### Berechtigungsprüfungen

Nutzen Sie `au.checkAccess()` um zu überprüfen, dass der aktuelle Benutzer die erforderliche Berechtigung hat. Berechtigungen sind vordefinierte Konstanten, die einen Inhaltstyp und eine Action kombinieren:

```typescript
au.checkAccess(Permissions.people.view);    // Lesezugriff
au.checkAccess(Permissions.people.edit);    // Schreibzugriff
```

Wenn der Benutzer die erforderliche Berechtigung nicht hat, wird automatisch eine Fehlerantwort zurückgegeben.

:::warning
Rufen Sie immer `au.checkAccess()` auf, bevor Sie Datenoperationen durchführen. Überspringen Sie nie Berechtigungsprüfungen, auch nicht bei scheinbar schreibgeschützten Endpunkten.
:::

## Umgebungs-Konfiguration

Die `Environment`-Klasse behandelt Konfiguration über Umgebungen hinweg:

- **Lokale Entwicklung:** Liest aus der `.env`-Datei im Projektstammverzeichnis
- **Bereitgestellte Umgebungen:** Liest aus AWS SSM Parameter Store

```typescript
// Zugriff auf Umgebungsvariablen
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Diese Abstraktion bedeutet, dass Ihr Code nicht wissen muss, woher die Konfiguration kommt.

## Lambda-Funktionen

Bei der Bereitstellung auf AWS läuft die API als sechs Lambda-Funktionen:

| Funktion | Zweck |
|----------|---------|
| `web` | Behandelt alle HTTP REST API Requests |
| `socket` | Verwaltet WebSocket-Verbindungen für Echtzeit-Features |
| `timer15Min` | Alle 30 Minuten geplant für E-Mail-Benachrichtigungen (Name ist historisch) |
| `timerMidnight` | Täglich geplant für Digest-E-Mails und Wartung |
| `timerScheduledTasks` | Täglich geplant für fällige Automationen und überfällige Workflow-Verarbeitung |
| `timerWebhooks` | Jede Minute geplant, um in der Warteschlange stehende ausgehende Webhooks zuzustellen |

:::info
Lokal läuft die `web`-Funktion auf Port 8084 und die `socket`-Funktion auf Port 8087. Die Timer-Funktionen können während der Entwicklung manuell ausgelöst werden.
:::

## Verwandte Artikel

- **[Datenbank](./database)** — Verbindungszeichenfolgen, Schema-Skripte und Datenzugriffsmuster
- **[Lokales API-Setup](./local-setup)** — Vollständiger Schritt-für-Schritt-Setup-Guide
- **[ApiHelper](../shared-libraries/api-helper)** — Die Shared Library, die `CustomBaseController` und Auth Middleware bereitstellt
