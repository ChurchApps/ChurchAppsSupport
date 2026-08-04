---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Jedes API-Modul folgt einer konsistenten internen Struktur mit Controllern, Repositories, Modellen und Helfern. Dieses Layout zu verstehen, macht es einfach, sich in der Codebasis zurechtzufinden und neue Funktionalität zu einem beliebigen Modul hinzuzufügen.

</div>

<div class="prereqs">
<h4>Bevor Sie beginnen</h4>

- Richten Sie die API lokal ein -- siehe [Lokale API-Einrichtung](./local-setup)
- Lesen Sie die Architektur [Datenbank](./database), um die Datenzugriffsschicht zu verstehen

</div>

## Verzeichnislayout

Module befinden sich unter `src/modules/{name}/`. Ein typisches Modul enthält vier Verzeichnisse:

```
src/modules/{name}/
├── controllers/    ← Route-Handler (Express-Endpunkte)
├── repositories/   ← Datenzugriffsschicht (typisierte SQL-Abfragen)
├── models/         ← TypeScript-Interfaces und -Typen
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

Die sechs Kern-Datenmodule -- membership, attendance, content, giving, messaging und doing -- folgen alle diesem Layout. Einige spezialisierte Module (etwa reporting, das modulübergreifende Berichte bereitstellt und keine eigenen Daten besitzt) stehen daneben unter `src/modules/`.

## Eine Anwendung, viele Module

Die API ist ein **modularer Monolith**: Module markieren Grenzen der Code-Organisation und Datenverantwortung, keine separaten Dienste. Beim Start werden die Controller jedes Moduls in einem einzigen Dependency-Injection-Container hinter einer einzigen Express-Anwendung registriert, sodass die gesamte API als eine Einheit gebaut, ausgeführt und deployt wird -- die unten beschriebenen deployten Funktionen sind alle Einstiegspunkte in dieselbe Anwendung.

Die Routen jedes Moduls liegen unter einem URL-Präfix, das dem Modulnamen entspricht:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Dadurch bleibt die API-Oberfläche jedes Moduls in sich geschlossen, während Clients weiterhin mit einem einzigen Host sprechen.

## Controller

Controller definieren die API-Routen eines Moduls. Jedes Modul hat seinen eigenen Basis-Controller (zum Beispiel `MembershipBaseController`), der den gemeinsamen `BaseController` erweitert -- der selbst auf `CustomBaseController` aus `@churchapps/apihelper` aufbaut. Routen werden mit Inversify-Dekoratoren registriert.

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

Der `actionWrapper` authentifiziert die Anfrage und befüllt `this.repos` mit den Repositories des Moduls, bevor Ihre Aktion ausgeführt wird.

### Route-Dekoratoren

| Dekorator | HTTP-Methode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Der Dekorator `@controller("/base")` legt den Basis-Pfad für alle Routen im Controller fest.

## Repositories

Repositories übernehmen alle Datenbankoperationen. Es gibt kein ORM -- Abfragen werden mit dem Kysely-Query-Builder geschrieben, typisiert gegen das Datenbankschema des Moduls. Die `db/index.ts` jedes Moduls stellt eine Funktion `getDb()` bereit, die die typisierte Kysely-Instanz des Moduls zurückgibt.

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

Innerhalb eines Controllers stehen die Repositories des Moduls als `this.repos` zur Verfügung. Außerhalb von Controllern erhalten Sie sie über `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Modulübergreifende Kommunikation

Jedes Modul besitzt seine eigene Datenbank (siehe [Datenbank](./database)), und ein Modul fragt niemals direkt die Tabellen eines anderen Moduls ab. Wenn ein Modul Daten benötigt, die einem anderen gehören -- zum Beispiel wenn das Doing-Modul Personen aus Membership auflöst -- geschieht dies über das **Gateway** des besitzenden Moduls in `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Jedes Gateway (`MembershipModuleGateway`, `GivingModuleGateway` und so weiter) ist ein TypeScript-Interface, das genau definiert, welche Operationen das besitzende Modul dem Rest der API zur Verfügung stellt. Das Interface ist der Vertrag: Die aktuellen Implementierungen lesen die Datenbank des besitzenden Moduls in-process, aber da Aufrufer nur von dem Interface abhängen, könnte eine Implementierung ausgetauscht werden -- zum Beispiel gegen eine, die HTTP-Aufrufe durchführt -- falls ein Modul jemals in einen separaten Dienst ausgelagert würde.

:::info
Wenn die benötigten Daten in einem anderen Modul liegen und dessen Gateway keine passende Operation dafür bereitstellt, erweitern Sie das Gateway-Interface, anstatt direkt auf die Repositories oder die Datenbank des anderen Moduls zuzugreifen.
:::

## Authentifizierung und Autorisierung

### JWT-Authentifizierung

Alle Anfragen werden über JWT-Tokens authentifiziert, die von `CustomAuthProvider` verarbeitet werden. Das Token wird automatisch validiert, und der authentifizierte Benutzerkontext (`au`) steht in jeder Controller-Aktion zur Verfügung.

### Berechtigungsprüfungen

Verwenden Sie `au.checkAccess()`, um zu überprüfen, ob der aktuelle Benutzer die erforderliche Berechtigung besitzt. Berechtigungen sind vordefinierte Konstanten, die einen Inhaltstyp mit einer Aktion kombinieren:

```typescript
au.checkAccess(Permissions.people.view);    // Lesezugriff
au.checkAccess(Permissions.people.edit);    // Schreibzugriff
```

Fehlt dem Benutzer die erforderliche Berechtigung, wird automatisch eine Fehlerantwort zurückgegeben.

:::warning
Rufen Sie immer `au.checkAccess()` auf, bevor Sie Datenoperationen durchführen. Überspringen Sie Berechtigungsprüfungen nie, auch nicht bei scheinbar rein lesenden Endpunkten.
:::

## Umgebungskonfiguration

Die Klasse `Environment` verwaltet die Konfiguration über verschiedene Umgebungen hinweg:

- **Lokale Entwicklung:** Liest aus der Datei `.env` im Projektstamm
- **Bereitgestellte Umgebungen:** Liest aus dem AWS SSM Parameter Store

```typescript
// Zugriff auf Umgebungsvariablen
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Diese Abstraktion bedeutet, dass Ihr Code nicht wissen muss, woher die Konfiguration stammt.

## Lambda-Funktionen

Im Deployment auf AWS läuft die API als sechs Lambda-Funktionen:

| Funktion | Zweck |
|----------|---------|
| `web` | Verarbeitet alle HTTP-REST-API-Anfragen |
| `socket` | Verwaltet WebSocket-Verbindungen für Echtzeit-Funktionen |
| `timer15Min` | Alle 30 Minuten geplant für E-Mail-Benachrichtigungen (der Name ist historisch bedingt) |
| `timerMidnight` | Täglich geplant für Digest-E-Mails und Wartung |
| `timerScheduledTasks` | Täglich geplant für fällige Automatisierungen und die Verarbeitung überfälliger Workflows |
| `timerWebhooks` | Jede Minute geplant, um wartende ausgehende Webhooks zuzustellen |

:::info
Lokal läuft die Funktion `web` auf Port 8084 und die Funktion `socket` auf Port 8087. Die Timer-Funktionen können während der Entwicklung manuell ausgelöst werden.
:::

## Verwandte Artikel

- **[Datenbank](./database)** -- Verbindungszeichenfolgen, Schema-Skripte und Datenzugriffsmuster
- **[Lokale API-Einrichtung](./local-setup)** -- Vollständige schrittweise Einrichtungsanleitung
- **[ApiHelper](../shared-libraries/api-helper)** -- Die gemeinsam genutzte Bibliothek, die `CustomBaseController` und Auth-Middleware bereitstellt
