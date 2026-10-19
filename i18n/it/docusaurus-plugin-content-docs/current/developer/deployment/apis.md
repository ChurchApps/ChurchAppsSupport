---
title: "Deploy dell'API"
---

# Deploy dell'API

<div class="article-intro">

Le API di ChurchApps vengono distribuite come funzioni AWS Lambda usando il Serverless Framework. Questa pagina descrive il flusso di build, deploy e configurazione per gli ambienti demo e produzione.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura l'API in locale -- vedi [Configurazione locale dell'API](../api/local-setup)
- Configura le credenziali AWS sulla tua macchina
- Assicurati di avere accesso all'account AWS di destinazione

</div>

## Build

Le API vengono compilate per la produzione usando una configurazione TypeScript dedicata:

```bash
npm run build:prod
```

Questo comando usa `tsconfig.prod.json` per compilare il progetto per il runtime Lambda.

## Deploy

Per distribuire nell'ambiente demo:

```bash
npm run deploy-demo
```

Per distribuire in produzione:

```bash
npm run deploy-prod
```

In pratica l'Api viene distribuita da GitHub Actions: **Deploy Demo** viene eseguito a ogni push su `main`, mentre **Deploy Prod** viene avviato manualmente (workflow dispatch). Non esiste più un ambiente di staging.

## Migrazioni del database

**Deploy Prod** applica le migrazioni del database in sospeso come parte del deploy. I database di produzione accettano connessioni solo dall'interno della VPC, quindi subito dopo `serverless deploy` il workflow invoca la funzione Lambda `migrate` (`api-Prod-migrate`), che esegue le migrazioni in sospeso di ogni modulo e restituisce `{ ok, environment, modules }`. Se un modulo fallisce o viene rifiutato (ad esempio un database senza cronologia delle migrazioni), il job fallisce così lo schema non resta mai indietro rispetto al codice. **Rollback Prod** ripristina solo il codice Lambda; le migrazioni restano applicate, quindi scrivile in modo additivo. Vedi [Server Admin -- Migrazioni del database](../server-admin#database-migrations) per verificarne lo stato o eseguirle manualmente.

## Cosa viene creato

Ogni deploy dell'API crea o aggiorna le seguenti funzioni AWS Lambda:

| Funzione | Scopo |
|----------|---------|
| `web` | Gestore delle richieste HTTP tramite API Gateway |
| `socket` | Gestore delle connessioni WebSocket |
| `timer15Min` | Attività pianificata che viene eseguita ogni 30 minuti (il nome è storico) |
| `timerMidnight` | Attività pianificata che viene eseguita ogni giorno a mezzanotte |
| `migrate` | Applica le migrazioni del database in sospeso; invocata dal workflow Deploy Prod |

## Configurazione dell'ambiente

Negli ambienti distribuiti, la configurazione viene letta da **AWS SSM Parameter Store** invece che dai file `.env`. Questo mantiene i segreti fuori dal pacchetto di deploy e permette di modificare la configurazione senza ridistribuire.

:::warning
Non committare mai le credenziali di produzione nel repository. Tutta la configurazione sensibile deve essere archiviata in AWS SSM Parameter Store e letta a runtime.
:::

:::tip
Ogni merge su `main` viene distribuito prima nell'ambiente demo. Verifica la tua modifica lì (ad esempio su [demo.b1.church](https://demo.b1.church)) prima di eseguire Deploy Prod.
:::

## Articoli correlati

- **[Configurazione locale dell'API](../api/local-setup)** -- Configurare l'API per lo sviluppo
- **[Struttura dei moduli](../api/module-structure)** -- Comprendere l'architettura delle funzioni Lambda
- **[Deploy delle web app](./web-apps)** -- Distribuire le applicazioni frontend
