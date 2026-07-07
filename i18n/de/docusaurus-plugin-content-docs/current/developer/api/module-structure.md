---
title: "Modulstruktur"
---

# Modulstruktur

Jedes API-Modul folgt einer konsistenten internen Struktur mit Controllern, Repositories, Modellen und Helfern. Das Verständnis dieses Layouts macht es einfach, in der Codebasis zu navigieren und neue Funktionalität zu jedem Modul hinzuzufügen.

## Verzeichnis-Layout

Module leben unter `src/modules/{name}/`. Ein typisches Modul enthält vier Verzeichnisse:

```
src/modules/{name}/
├── controllers/    ← Route-Handler (Express-Endpunkte)
├── repositories/   ← Datenzugriffs-Ebene (typisierte SQL-Queries)
├── models/         ← TypeScript-Schnittstellen und Typen
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

Die sechs Kern-Datenmodule folgen alle dieser Anordnung.

## Eine Anwendung, viele Module

Die API ist ein **modulares Monolith**: Module markieren Grenzen der Code-Organisation und Dateneigentum, nicht separate Services. Beim Start werden die Controller jedes Moduls in einem einzelnen Dependency-Injection-Container hinter einer Express-Anwendung registriert.

Alle Module-Routen leben unter einem URL-Präfix, der dem Modulnamen entspricht:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

## Controller

Controller definieren die API-Routen für ein Modul. Jedes Modul hat seinen eigenen Basis-Controller (zum Beispiel `MembershipBaseController`), der den gemeinsamen `BaseController` erweitert.

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
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

## Repositories

Repositories behandeln alle Datenbankoperationen. Es gibt kein ORM -- Abfragen werden mit dem Kysely Query Builder geschrieben, typisiert gegen das Modul-Datenbankschema.

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

## Modulübergreifende Kommunikation

Jedes Modul besitzt seine eigene Datenbank, und ein Modul fragt niemals die Tabellen eines anderen Moduls direkt ab. Wenn ein Modul Daten benötigt, die einem anderen gehören, geht es durch das Besitzer-Modul-**Gateway**:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

## Authentifizierung und Autorisierung

### JWT-Authentifizierung

Alle Anfragen werden über JWT-Tokens von `CustomAuthProvider` authentifiziert.

### Berechtigung-Prüfungen

Verwenden Sie `au.checkAccess()` zum Überprüfen der erforderlichen Berechtigung:

```typescript
au.checkAccess(Permissions.people.view);    // Lesezugriff
au.checkAccess(Permissions.people.edit);    // Schreibzugriff
```

:::warning
Rufen Sie immer `au.checkAccess()` vor Datenvorgängen auf. Überspringen Sie niemals Berechtigung-Prüfungen.
:::

## Lambda-Funktionen

Beim Deployment auf AWS läuft die API als sechs Lambda-Funktionen:

| Funktion | Zweck |
|----------|---------|
| `web` | Verarbeitet alle HTTP REST API-Anfragen |
| `socket` | Verwaltet WebSocket-Verbindungen |
| `timer15Min` | Läuft alle 30 Minuten |
| `timerMidnight` | Läuft täglich |
| `timerScheduledTasks` | Läuft täglich |
| `timerWebhooks` | Läuft jede Minute |
