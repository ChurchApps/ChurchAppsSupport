---
title: "Struttura dei Moduli"
---

# Struttura dei Moduli

<div class="article-intro">

Ogni modulo API segue una struttura interna coerente con controller, repository, modelli e helper. Comprendere questa organizzazione rende semplice navigare nella codebase e aggiungere nuove funzionalità a qualsiasi modulo.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura l'API localmente -- vedi [Setup Locale dell'API](./local-setup)
- Consulta l'architettura del [Database](./database) per comprendere il livello di accesso ai dati

</div>

## Struttura delle Directory

Ogni modulo risiede sotto `src/modules/{name}/` e contiene quattro directory:

```
src/modules/{name}/
├── controllers/    ← Gestori delle route (endpoint Express)
├── repositories/   ← Livello di accesso ai dati (SQL diretto)
├── models/         ← Interfacce e tipi TypeScript
└── helpers/        ← Logica di business specifica del modulo
```

Ad esempio, il modulo membership:

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

I controller definiscono le route API per un modulo. Estendono `CustomBaseController` da `@churchapps/apihelper` e usano i decoratori di Inversify per la registrazione delle route.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = contesto utente autenticato
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
      // ... logica di salvataggio
    });
  }
}
```

### Decoratori delle Route

| Decoratore | Metodo HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Il decoratore `@controller("/base")` imposta il percorso base per tutte le route nel controller.

## Repository

I repository gestiscono tutte le operazioni sul database usando SQL diretto tramite `DB.query()`. Non c'è ORM -- si scrive SQL direttamente.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // Logica INSERT o UPDATE
  }
}
```

Accedi ai repository tramite `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Autenticazione e Autorizzazione

### Autenticazione JWT

Tutte le richieste sono autenticate tramite token JWT gestiti da `CustomAuthProvider`. Il token viene validato automaticamente e il contesto dell'utente autenticato (`au`) è disponibile in ogni azione del controller.

### Controllo dei Permessi

Usa `au.checkAccess()` per verificare che l'utente corrente abbia il permesso richiesto:

```typescript
au.checkAccess("People", "View");    // Accesso in lettura
au.checkAccess("People", "Edit");    // Accesso in scrittura
```

Se l'utente non ha il permesso richiesto, viene restituita automaticamente una risposta di errore.

:::warning
Chiama sempre `au.checkAccess()` prima di eseguire operazioni sui dati. Non saltare mai i controlli dei permessi, nemmeno per endpoint apparentemente di sola lettura.
:::

## Configurazione dell'Ambiente

La classe `Environment` gestisce la configurazione tra gli ambienti:

- **Sviluppo locale:** Legge dal file `.env` nella root del progetto
- **Ambienti deployati:** Legge da AWS SSM Parameter Store

```typescript
// Accesso alle variabili d'ambiente
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Questa astrazione significa che il tuo codice non ha bisogno di sapere da dove proviene la configurazione.

## Funzioni Lambda

Quando distribuito su AWS, l'API viene eseguito come quattro funzioni Lambda:

| Funzione | Scopo |
|----------|-------|
| `web` | Gestisce tutte le richieste HTTP dell'API REST |
| `socket` | Gestisce le connessioni WebSocket per le funzionalità in tempo reale |
| `timer15Min` | Schedulato ogni 15 minuti per le notifiche email |
| `timerMidnight` | Schedulato giornalmente per email digest e manutenzione |

:::info
Localmente, la funzione `web` gira sulla porta 8084 e la funzione `socket` sulla porta 8087. Le funzioni timer possono essere attivate manualmente durante lo sviluppo.
:::

## Articoli Correlati

- **[Database](./database)** -- Stringhe di connessione, script dello schema e pattern di accesso ai dati
- **[Setup Locale dell'API](./local-setup)** -- Guida completa passo-passo al setup
- **[ApiHelper](../shared-libraries/api-helper)** -- La libreria condivisa che fornisce `CustomBaseController` e il middleware di autenticazione
