---
title: "Struttura dei Moduli"
---

# Struttura dei Moduli

<div class="article-intro">

Ogni modulo dell'API segue una struttura interna coerente con controller, repository, modelli e helper. Comprendere questo layout rende semplice orientarsi nel codebase e aggiungere nuove funzionalità a qualsiasi modulo.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura l'API in locale -- vedi [Configurazione Locale dell'API](./local-setup)
- Rivedi l'architettura del [Database](./database) per comprendere il livello di accesso ai dati

</div>

## Struttura delle Directory

I moduli risiedono sotto `src/modules/{name}/`. Un modulo tipico contiene quattro directory:

```
src/modules/{name}/
├── controllers/    ← Gestori delle rotte (endpoint Express)
├── repositories/   ← Livello di accesso ai dati (query SQL tipizzate)
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

I sei moduli dati principali -- membership, attendance, content, giving, messaging e doing -- seguono tutti questo layout. Alcuni moduli specializzati (come reporting, che serve report cross-modulo e non possiede dati propri) si trovano accanto ad essi sotto `src/modules/`.

## Un'Applicazione, Molti Moduli

L'API è un **monolite modulare**: i moduli segnano confini di organizzazione del codice e proprietà dei dati, non servizi separati. All'avvio, i controller di ogni modulo vengono registrati in un unico container di dependency injection dietro un'unica applicazione Express, così l'intera API viene compilata, eseguita e distribuita come un'unica unità -- le funzioni distribuite descritte di seguito sono tutte punti di ingresso in questa stessa applicazione.

Le rotte di ogni modulo risiedono sotto un prefisso URL corrispondente al nome del modulo:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Questo mantiene la superficie API di ogni modulo autonoma mentre i client continuano a parlare con un unico host.

## Controller

I controller definiscono le rotte API di un modulo. Ogni modulo ha il proprio controller base (ad esempio `MembershipBaseController`), che estende il `BaseController` condiviso -- a sua volta costruito su `CustomBaseController` da `@churchapps/apihelper`. Le rotte sono registrate con decoratori Inversify.

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
      // au = contesto dell'utente autenticato
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` autentica la richiesta e idrata `this.repos` con i repository del modulo prima di eseguire la tua azione.

### Decoratori di Rotta

| Decoratore | Metodo HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Il decoratore `@controller("/base")` imposta il percorso base per tutte le rotte nel controller.

## Repository

I repository gestiscono tutte le operazioni sul database. Non c'è un ORM -- le query sono scritte con il query builder Kysely, tipizzato rispetto allo schema del database del modulo. Il file `db/index.ts` di ogni modulo espone una funzione `getDb()` che restituisce l'istanza Kysely tipizzata del modulo.

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

All'interno di un controller, i repository del modulo sono disponibili come `this.repos`. Al di fuori dei controller, ottienili tramite `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Comunicazione Cross-Modulo

Ogni modulo possiede il proprio database (vedi [Database](./database)), e un modulo non interroga mai direttamente le tabelle di un altro modulo. Quando un modulo ha bisogno di dati posseduti da un altro -- ad esempio, il modulo doing che risolve le persone da membership -- passa attraverso il **gateway** del modulo proprietario in `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Ogni gateway (`MembershipModuleGateway`, `GivingModuleGateway`, e così via) è un'interfaccia TypeScript che definisce esattamente quali operazioni il modulo proprietario espone al resto dell'API. L'interfaccia è il contratto: le implementazioni attuali leggono il database del modulo proprietario in-process, ma poiché i chiamanti dipendono solo dall'interfaccia, un'implementazione potrebbe essere sostituita -- ad esempio, con una che effettua chiamate HTTP -- se un modulo venisse mai estratto in un servizio separato.

:::info
Se i dati di cui hai bisogno risiedono in un altro modulo e il suo gateway non espone un'operazione per essi, estendi l'interfaccia del gateway piuttosto che accedere direttamente ai repository o al database dell'altro modulo.
:::

## Autenticazione e Autorizzazione

### Autenticazione JWT

Tutte le richieste sono autenticate tramite token JWT gestiti da `CustomAuthProvider`. Il token viene validato automaticamente e il contesto dell'utente autenticato (`au`) è disponibile in ogni azione del controller.

### Controlli dei Permessi

Usa `au.checkAccess()` per verificare che l'utente corrente abbia il permesso richiesto. I permessi sono costanti predefinite che combinano un tipo di contenuto e un'azione:

```typescript
au.checkAccess(Permissions.people.view);    // Accesso in lettura
au.checkAccess(Permissions.people.edit);    // Accesso in scrittura
```

Se l'utente non ha il permesso richiesto, viene restituita automaticamente una risposta di errore.

:::warning
Chiama sempre `au.checkAccess()` prima di eseguire qualsiasi operazione sui dati. Non saltare mai i controlli dei permessi, anche per endpoint apparentemente di sola lettura.
:::

## Configurazione dell'Ambiente

La classe `Environment` gestisce la configurazione tra gli ambienti:

- **Sviluppo locale:** Legge dal file `.env` nella root del progetto
- **Ambienti distribuiti:** Legge da AWS SSM Parameter Store

```typescript
// Accesso alle variabili d'ambiente
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Questa astrazione significa che il tuo codice non ha bisogno di sapere da dove provenga la configurazione.

## Funzioni Lambda

Quando distribuita su AWS, l'API viene eseguita come sei funzioni Lambda:

| Funzione | Scopo |
|----------|-------|
| `web` | Gestisce tutte le richieste dell'API REST HTTP |
| `socket` | Gestisce le connessioni WebSocket per le funzionalità in tempo reale |
| `timer15Min` | Pianificata ogni 30 minuti per le notifiche email (il nome è storico) |
| `timerMidnight` | Pianificata quotidianamente per email di riepilogo e manutenzione |
| `timerScheduledTasks` | Pianificata quotidianamente per le automazioni in scadenza e l'elaborazione dei flussi di lavoro in ritardo |
| `timerWebhooks` | Pianificata ogni minuto per consegnare i webhook in uscita accodati |

:::info
Localmente, la funzione `web` viene eseguita sulla porta 8084 e la funzione `socket` sulla porta 8087. Le funzioni timer possono essere attivate manualmente durante lo sviluppo.
:::

## Articoli Correlati

- **[Database](./database)** -- Stringhe di connessione, script di schema e pattern di accesso ai dati
- **[Configurazione Locale dell'API](./local-setup)** -- Guida completa passo per passo
- **[ApiHelper](../shared-libraries/api-helper)** -- La libreria condivisa che fornisce `CustomBaseController` e il middleware di autenticazione
