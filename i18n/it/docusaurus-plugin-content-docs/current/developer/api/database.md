---
title: "Database"
---

# Database

<div class="article-intro">

L'API di ChurchApps utilizza un'architettura **database-per-modulo**. Ciascuno dei sei moduli ha il proprio database MySQL con un pool di connessioni indipendente, fornendo confini dati chiari mantenendo tutto all'interno di un singolo deployment.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **MySQL 8.0+** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura le stringhe di connessione al database nel tuo file `.env` -- vedi [Variabili d'Ambiente](../setup/environment-variables)

</div>

## Panoramica dell'Architettura

```
Api
├── membership_db   ← Persone, gruppi, permessi
├── attendance_db   ← Servizi, sessioni, registrazioni
├── content_db      ← Pagine, sezioni, elementi
├── giving_db       ← Donazioni, fondi, pagamenti
├── messaging_db    ← Conversazioni, notifiche
└── doing_db        ← Attività, piani, assegnazioni
```

### Decisioni di Design Chiave

- **Un database per modulo** -- Ogni modulo mantiene il proprio database MySQL con un pool di connessioni dedicato (`EnhancedPoolHelper`). Questo mantiene i moduli disaccoppiati e consente l'evoluzione indipendente dello schema.
- **Pattern repository con SQL diretto** -- Non c'è ORM. Tutti gli accessi ai dati passano attraverso classi repository che eseguono SQL direttamente usando `DB.query()`. Questo offre pieno controllo sulle prestazioni e sul comportamento delle query.
- **Multi-tenant by design** -- Ogni query è delimitata da `churchId`. Tutte le tabelle includono una colonna `churchId`, e il livello repository applica automaticamente l'isolamento dei tenant.

## Stringhe di Connessione

La connessione al database di ogni modulo è configurata in `.env` usando il formato standard delle stringhe di connessione MySQL:

```
mysql://user:password@host:port/database
```

Ad esempio, una configurazione di sviluppo locale potrebbe apparire così:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In produzione, le stringhe di connessione sono memorizzate in AWS SSM Parameter Store e lette dalla classe `Environment` all'avvio.
:::

## Script dello Schema

Gli script dello schema del database si trovano nella directory `tools/dbScripts/`, organizzati per modulo:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Questi script definiscono la creazione delle tabelle, gli indici e tutti i dati iniziali necessari.

## Inizializzazione del Database

### Inizializza tutti i database

```bash
npm run initdb
```

Questo crea tutti e sei i database ed esegue gli script dello schema per ciascuno.

### Inizializza un singolo modulo

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Quando lavori su un modulo specifico, puoi re-inizializzare solo il database di quel modulo senza influenzare gli altri.
:::

## Pattern di Accesso ai Dati

I repository accedono ai dati attraverso il metodo `DB.query()`. Un metodo tipico del repository appare così:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

I repository si ottengono tramite `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Includi sempre `churchId` nelle tue query per mantenere l'isolamento multi-tenant. Non interrogare mai tra tenant diversi a meno che tu non abbia una ragione specifica e autorizzata per farlo.
:::

## Articoli Correlati

- **[Struttura dei Moduli](./module-structure)** -- Come sono organizzati controller e repository all'interno di ogni modulo
- **[Setup Locale dell'API](./local-setup)** -- Guida completa passo-passo al setup
