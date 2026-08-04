---
title: "Database"
---

# Database

<div class="article-intro">

L'API di ChurchApps utilizza un'architettura **database-per-modulo**. Ciascuno dei sei moduli dati ha il proprio database MySQL con un pool di connessioni indipendente, il che offre confini di dati chiari pur mantenendo tutto all'interno di un unico deployment.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **MySQL 8.0+** -- vedi [Prerequisiti](../setup/prerequisites)
- Configura le stringhe di connessione al database nel tuo file `.env` -- vedi [Variabili d'ambiente](../setup/environment-variables)

</div>

## Panoramica dell'architettura

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Decisioni chiave di progettazione

- **Un database per modulo** -- Ogni modulo mantiene il proprio database MySQL con un pool di connessioni dedicato (gestito da `KyselyPool`). Questo mantiene i moduli disaccoppiati e consente un'evoluzione indipendente dello schema.
- **Proprietà esclusiva** -- Le tabelle di un modulo vengono lette e scritte solo dal codice di quel modulo. Quando un altro modulo ha bisogno di quei dati, chiama il gateway del modulo proprietario invece di interrogare direttamente le tabelle -- vedi [Comunicazione tra moduli](./module-structure#cross-module-communication).
- **Pattern repository senza ORM** -- Tutti gli accessi ai dati passano attraverso classi repository che costruiscono SQL tipizzato con il query builder Kysely a fronte dello schema del modulo. Questo garantisce pieno controllo sulle prestazioni e sul comportamento delle query.
- **Multi-tenant per progettazione** -- Ogni query è ambitata per `churchId`. Tutte le tabelle includono una colonna `churchId`, e il livello repository applica automaticamente l'isolamento tra tenant.

## Stringhe di connessione

La connessione al database di ciascun modulo è configurata in `.env` usando il formato standard delle stringhe di connessione MySQL:

```
mysql://user:password@host:port/database
```

Ad esempio, una configurazione di sviluppo locale potrebbe assomigliare a:

Ogni modulo legge la propria connessione da una variabile d'ambiente denominata `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In produzione, le stringhe di connessione sono memorizzate in AWS SSM Parameter Store e lette dalla classe `Environment` all'avvio.
:::

## Script dello schema

Gli schemi delle tabelle sono definiti come migrazioni Kysely nella directory `tools/migrations/`, organizzate per modulo:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Le migrazioni definiscono la creazione delle tabelle, gli indici e le modifiche allo schema. La directory `tools/dbScripts/` contiene dati demo e di seed che possono essere caricati sopra lo schema.

## Inizializzazione del database

### Inizializzare tutti i database

```bash
npm run initdb
```

Questo crea tutti e sei i database ed esegue le migrazioni per ciascuno.

### Inizializzare un singolo modulo

```bash
npm run initdb -- --module=membership
```

:::tip
Quando lavori su un modulo specifico, puoi reinizializzare solo il database di quel modulo senza influire sugli altri.
:::

## Modello di accesso ai dati

I repository costruiscono query con il query builder Kysely a fronte dello schema tipizzato del database del modulo, ottenuto tramite la funzione `getDb()` del modulo. Un tipico metodo repository si presenta così:

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
Includi sempre `churchId` nelle tue query per mantenere l'isolamento multi-tenant. Non interrogare mai tra tenant diversi a meno che tu non abbia una ragione specifica e autorizzata per farlo.
:::

## Riferimenti tra moduli

Poiché i dati di ciascun modulo risiedono in un database separato, non ci sono chiavi esterne né join SQL tra i confini dei moduli. Un record che si riferisce ai dati di un altro modulo memorizza l'id di quel record -- ad esempio, una donazione nel database giving porta il `personId` di una persona nel database membership -- e qualsiasi composizione tra moduli avviene nel codice dell'applicazione.

Questo vincolo è ciò che rende reali i confini dei moduli: ogni schema può evolvere in modo indipendente, il database di un modulo può essere spostato su un proprio server, e un modulo potrebbe persino essere estratto come servizio autonomo senza dover districare tabelle condivise o query tra database.

## Articoli correlati

- **[Struttura dei moduli](./module-structure)** -- Come sono organizzati controller e repository all'interno di ogni modulo
- **[Configurazione API locale](./local-setup)** -- Guida completa passo passo alla configurazione
