---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Jedes API-Modul folgt einer konsistenten internen Struktur mit Controllern, Repositories, Modellen und Helpern. Das Verständnis dieses Layouts macht es unkompliziert, sich in der Codebasis zurechtzufinden und neue Funktionalität zu einem beliebigen Modul hinzuzufügen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die API lokal ein -- siehe [Lokale API-Einrichtung](./local-setup)
- Sehen Sie sich die [Datenbank](./database)-Architektur an, um die Datenzugriffsschicht zu verstehen

</div>

## Verzeichnis-Layout

Module liegen unter `src/modules/{name}/`. Ein typisches Modul enthält vier Verzeichnisse:

```
src/modules/{name}/
├── controllers/    ← Routen-Handler (Express-Endpunkte)
├── repositories/   ← Datenzugriffsschicht (typisierte SQL-Abfragen)
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

Die sechs Kern-Datenmodule -- membership, attendance, content, giving, messaging und doing -- folgen alle diesem Layout. Ein paar spezialisierte Module (etwa reporting, das modulübergreifende Berichte bedient und keine eigenen Daten besitzt) sitzen daneben unter `src/modules/`.

## Eine Anwendung, viele Module

Die API ist ein **modularer Monolith**: Module markieren Grenzen der Code-Organisation und des Datenbesitzes, nicht separate Services. Beim Start werden die Controller jedes Moduls in einem einzigen Dependency-Injection-Container hinter einer Express-Anwendung registriert, sodass die gesamte API als eine Einheit gebaut, ausgeführt und deployt wird -- die unten beschriebenen deployten Funktionen sind alle Einstiegspunkte in dieselbe Anwendung.

Die Routen jedes Moduls liegen unter einem URL-Präfix, das dem Modulnamen entspricht:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Das hält die API-Oberfläche jedes Moduls eigenständig, während Clients weiterhin mit einem einzigen Host sprechen.

## Controller

Controller definieren die API-Routen für ein Modul. Jedes Modul hat seinen eigenen Basis-Controller (zum Beispiel `MembershipBaseController`), der den gemeinsamen `BaseController` erweitert -- der selbst auf `CustomBaseController` aus `@churchapps/apihelper` aufbaut. Routen werden mit Inversify-Dekoratoren registriert.

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
      // au = authentifizierter Benutzerkontext
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Der `actionWrapper` authentifiziert die Anfrage und hydratisiert `this.repos` mit den Repositories des Moduls, bevor Ihre Aktion ausgeführt wird.

### Routen-Dekoratoren

| Dekorator | HTTP-Methode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Der Dekorator `@controller("/base")` legt den Basispfad für alle Routen im Controller fest.

## Repositories

Repositories übernehmen alle Datenbankoperationen. Es gibt kein ORM -- Abfragen werden mit dem Kysely-Query-Builder geschrieben, typisiert gegen das Datenbankschema des Moduls. Die `db/index.ts` jedes Moduls stellt eine `getDb()`-Funktion bereit, die die typisierte Kysely-Instanz des Moduls zurückgibt.

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

Innerhalb eines Controllers sind die Repositories des Moduls als `this.repos` verfügbar. Außerhalb von Controllern erhält man sie über `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Modulübergreifende Kommunikation

Jedes Modul besitzt seine eigene Datenbank (siehe [Datenbank](./database)), und ein Modul fragt niemals direkt die Tabellen eines anderen Moduls ab. Wenn ein Modul Daten benötigt, die einem anderen gehören -- zum Beispiel das doing-Modul, das Personen aus membership auflöst --, geschieht das über das **Gateway** des besitzenden Moduls in `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Jedes Gateway (`MembershipModuleGateway`, `GivingModuleGateway` und so weiter) ist eine TypeScript-Schnittstelle, die genau definiert, welche Operationen das besitzende Modul dem Rest der API zur Verfügung stellt. Die Schnittstelle ist der Vertrag: Die aktuellen Implementierungen lesen die Datenbank des besitzenden Moduls im selben Prozess, aber da sich Aufrufer nur auf die Schnittstelle verlassen, könnte eine Implementierung ausgetauscht werden -- zum Beispiel gegen eine, die HTTP-Aufrufe macht --, falls ein Modul jemals in einen separaten Service extrahiert würde.

:::info
Wenn die Daten, die Sie benötigen, in einem anderen Modul liegen und dessen Gateway keine Operation dafür bereitstellt, erweitern Sie die Gateway-Schnittstelle, statt in die Repositories oder die Datenbank des anderen Moduls hineinzugreifen.
:::

## Authentifizierung und Autorisierung

### JWT-Authentifizierung

Alle Anfragen werden über JWT-Tokens authentifiziert, verarbeitet von `CustomAuthProvider`. Das Token wird automatisch validiert, und der authentifizierte Benutzerkontext (`au`) ist in jeder Controller-Aktion verfügbar.

### Berechtigungsprüfungen

Verwenden Sie `au.checkAccess()`, um zu prüfen, ob der aktuelle Benutzer die erforderliche Berechtigung besitzt. Berechtigungen sind vordefinierte Konstanten, die einen Content-Typ und eine Aktion kombinieren:

```typescript
au.checkAccess(Permissions.people.view);    // Lesezugriff
au.checkAccess(Permissions.people.edit);    // Schreibzugriff
```

Fehlt dem Benutzer die erforderliche Berechtigung, wird automatisch eine Fehlerantwort zurückgegeben.

:::warning
Rufen Sie immer `au.checkAccess()` auf, bevor Sie Datenoperationen ausführen. Überspringen Sie niemals Berechtigungsprüfungen, auch nicht bei scheinbar nur lesenden Endpunkten.
:::

## Umgebungskonfiguration

Die `Environment`-Klasse übernimmt die Konfiguration über Umgebungen hinweg:

- **Lokale Entwicklung:** Liest aus der `.env`-Datei im Projekt-Root
- **Deployte Umgebungen:** Liest aus dem AWS SSM Parameter Store

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
| `web` | Verarbeitet alle HTTP-REST-API-Anfragen |
| `socket` | Verwaltet WebSocket-Verbindungen für Echtzeit-Funktionen |
| `timer15Min` | Alle 30 Minuten geplant für E-Mail-Benachrichtigungen (der Name ist historisch bedingt) |
| `timerMidnight` | Täglich geplant für Digest-E-Mails und Wartung |
| `timerScheduledTasks` | Täglich geplant für fällige Automatisierungen und überfällige Workflow-Verarbeitung |
| `timerWebhooks` | Jede Minute geplant, um in der Warteschlange befindliche ausgehende Webhooks zuzustellen |

:::info
Lokal läuft die `web`-Funktion auf Port 8084 und die `socket`-Funktion auf Port 8087. Die Timer-Funktionen können während der Entwicklung manuell ausgelöst werden.
:::

## Verwandte Artikel

- **[Datenbank](./database)** -- Verbindungszeichenfolgen, Schema-Skripte und Datenzugriffsmuster
- **[Lokale API-Einrichtung](./local-setup)** -- Vollständige Schritt-für-Schritt-Einrichtungsanleitung
- **[ApiHelper](../shared-libraries/api-helper)** -- Die gemeinsame Bibliothek, die `CustomBaseController` und Auth-Middleware bereitstellt
