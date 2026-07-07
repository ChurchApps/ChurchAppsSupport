---
title: "Database"
---

# Database

<div class="article-intro">

L'API di ChurchApps utilizza un'architettura **database-per-modulo**. Ognuno dei sei moduli di dati ha il suo proprio database MySQL con un pool di connessioni indipendente, fornendo confini di dati chiari mantenendo tutto all'interno di una singola distribuzione.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **MySQL 8.0+** -- vedi [Prerequisites](../setup/prerequisites)
- Configura le stringhe di connessione del database nel tuo file `.env` -- vedi [Environment Variables](../setup/environment-variables)

</div>

## Panoramica dell'Architettura

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Decisioni Chiave di Design

- **Un database per modulo** -- Ogni modulo mantiene il suo proprio database MySQL con un pool di connessioni dedicato (gestito da `KyselyPool`). Questo mantiene i moduli disaccoppiati e consente l'evoluzione dello schema indipendente.
- **Proprietà esclusiva** -- Le tabelle di un modulo sono lette e scritte solo dal codice di quel modulo. Quando un altro modulo ha bisogno dei dati, chiama il gateway del modulo proprietario piuttosto che interrogare direttamente le tabelle -- vedi [Cross-Module Communication](./module-structure#cross-module-communication).
- **Modello di repository senza ORM** -- Tutti gli accessi ai dati passano attraverso classi di repository che costruiscono SQL digitato con il generatore di query Kysely rispetto allo schema del modulo. Questo fornisce pieno controllo sulle prestazioni e il comportamento delle query.
- **Multi-tenant per progettazione** -- Ogni query è limitata da `churchId`. Tutte le tabelle includono una colonna `churchId` e il livello di repository applica automaticamente l'isolamento del tenant.

## Stringhe di Connessione

Ogni connessione al database del modulo è configurata in `.env` utilizzando il formato della stringa di connessione MySQL standard:

```
mysql://user:password@host:port/database
```

Ad esempio, una configurazione di sviluppo locale potrebbe assomigliare a:

Ogni modulo legge la sua connessione da una variabile di ambiente denominata `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In produzione, le stringhe di connessione sono archiviate in AWS SSM Parameter Store e lette dalla classe `Environment` all'avvio.
:::

## Script dello Schema

Gli schemi delle tabelle sono definiti come migrazioni Kysely nella directory `tools/migrations/`, organizzati per modulo:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Le migrazioni definiscono la creazione della tabella, gli indici e i cambiamenti dello schema. La directory `tools/dbScripts/` contiene dati demo e seed che possono essere caricati in cima allo schema.

## Inizializzazione del Database

### Inizializza tutti i database

```bash
npm run initdb
```

Ciò crea tutti e sei i database ed esegue le migrazioni per ciascuno.

### Inizializza un singolo modulo

```bash
npm run initdb -- --module=membership
```

:::tip
Quando lavori su un modulo specifico, puoi reinizializzare solo il database di quel modulo senza influenzare gli altri.
:::

## Modello di Accesso ai Dati

I repository costruiscono query con il generatore di query Kysely rispetto allo schema del database tipizzato del modulo, ottenuto attraverso la funzione `getDb()` del modulo. Un metodo di repository tipico si presenta così:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

I repository vengono ottenuti tramite `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Includi sempre `churchId` nelle tue query per mantenere l'isolamento multi-tenant. Non interrogare mai tra i tenant a meno che tu non abbia una ragione specifica e autorizzata per farlo.
:::

## Riferimenti Incrociati tra Moduli

Poiché i dati di ogni modulo risiedono in un database separato, non ci sono chiavi esterne o join SQL attraverso i confini del modulo. Un record che si relaziona ai dati di un altro modulo memorizza l'id di quel record -- ad esempio, una donazione nel database delle donazioni porta il `personId` di una persona nel database dei membri -- e qualsiasi composizione incrociata tra moduli avviene nel codice dell'applicazione.

Questo vincolo è ciò che rende reali i confini del modulo: ogni schema può evolversi indipendentemente, il database di un modulo può essere spostato sul suo server e un modulo potrebbe persino essere estratto in un servizio autonomo senza districare tabelle condivise o query incrociate tra database.

## Articoli Correlati

- **[Module Structure](./module-structure)** -- Come sono organizzati i controller e i repository all'interno di ogni modulo
- **[Local API Setup](./local-setup)** -- Guida completa passo dopo passo per l'installazione
