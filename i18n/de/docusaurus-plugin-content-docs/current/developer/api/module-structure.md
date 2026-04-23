---
title: "Modulstruktur"
---

# Modulstruktur

<div class="article-intro">

Jedes API-Modul folgt einer konsistenten internen Struktur mit Controllern, Repositories, Modellen und Helfern. Das Verständnis dieses Layouts macht es einfach, den Codebase zu navigieren und neue Funktionalität zu einem beliebigen Modul hinzuzufügen.

</div>

<div class="prereqs">
<h4>Vor dem Start</h4>

- Richten Sie die API lokal ein — siehe [Lokales API-Setup](./local-setup)
- Überprüfen Sie die [Datenbankarchitektur](./database), um die Datenzugriffschicht zu verstehen

</div>

## Verzeichnislayout

Jedes Modul lebt unter `src/modules/{name}/` und enthält vier Verzeichnisse:

```
src/modules/{name}/
├── controllers/    ← Route Handler (Express Endpoints)
├── repositories/   ← Datenzugriffschicht (direktes SQL)
├── models/         ← TypeScript-Interfaces und Typen
└── helpers/        ← Modul-spezifische Business-Logik
```

Zum Beispiel das Membership-Modul:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Controller

Controller definieren die API-Routen für ein Modul. Sie erweitern `CustomBaseController` von `@churchapps/apihelper` und nutzen Inversify-Dekoratoren für Route-Registrierung.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = authentifizierter Benutzer-Kontext
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... Speicherlogik
    });
  }
}
```

### Route-Dekoratoren

| Dekorator | HTTP-Methode |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Der `@controller("/base")`-Dekorator setzt den Basispfad für alle Routen im Controller.

## Repositories

Repositories verarbeiten alle Datenbankoperationen mit direktem SQL via `DB.query()`. Es gibt kein ORM — Sie schreiben SQL direkt.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT oder UPDATE Logik
  }
}
```

Greifen Sie auf Repositories über `RepositoryManager` zu:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Authentifizierung und Autorisierung

### JWT-Authentifizierung

Alle Anfragen werden über JWT-Tokens verarbeitet, die von `CustomAuthProvider` behandelt werden. Der Token wird automatisch validiert und der authentifizierte Benutzer-Kontext (`au`) ist in jeder Controller-Aktion verfügbar.

### Berechtigungsprüfungen

Nutzen Sie `au.checkAccess()`, um zu überprüfen, dass der aktuelle Benutzer die erforderliche Berechtigung hat:

```typescript
au.checkAccess("People", "View");    // Lesezugriff
au.checkAccess("People", "Edit");    // Schreibzugriff
```

Wenn der Benutzer die erforderliche Berechtigung nicht hat, wird automatisch eine Fehlerantwort zurückgegeben.

:::warning
Rufen Sie immer `au.checkAccess()` auf, bevor Sie Datenvorgänge durchführen. Überspringen Sie Berechtigungsprüfungen nicht, auch nicht bei scheinbar schreibgeschützten Endpoints.
:::

## Umgebungskonfiguration

Die `Environment`-Klasse verarbeitet die Konfiguration über Umgebungen:

- **Lokale Entwicklung:** Liest aus der `.env`-Datei im Projektroot
- **Bereitgestellte Umgebungen:** Liest aus AWS SSM Parameter Store

```typescript
// Zugriff auf Umgebungsvariablen
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Diese Abstraktion bedeutet, dass Ihr Code nicht wissen muss, woher die Konfiguration kommt.

## Lambda-Funktionen

Bei Deployment zu AWS läuft die API als vier Lambda-Funktionen:

| Funktion | Zweck |
|----------|---------|
| `web` | Verarbeitet alle HTTP REST-API-Anfragen |
| `socket` | Verwaltet WebSocket-Verbindungen für Real-Time-Features |
| `timer15Min` | Läuft alle 15 Minuten für E-Mail-Benachrichtigungen |
| `timerMidnight` | Läuft täglich für Digest-E-Mails und Wartung |

:::info
Lokal läuft die `web`-Funktion auf Port 8084 und die `socket`-Funktion auf Port 8087. Timer-Funktionen können während der Entwicklung manuell ausgelöst werden.
:::

## Verwandte Artikel

- **[Datenbank](./database)** — Verbindungszeichenfolgen, Schema-Skripte und Datenzugriffsmuster
- **[Lokales API-Setup](./local-setup)** — Vollständiger Schritt-für-Schritt-Setup-Leitfaden
- **[ApiHelper](../shared-libraries/api-helper)** — Die gemeinsame Bibliothek, die `CustomBaseController` und Auth-Middleware bereitstellt
