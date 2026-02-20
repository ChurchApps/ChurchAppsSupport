---
title: "Distribuzione delle API"
---

# Distribuzione delle API

<div class="article-intro">

Le API di ChurchApps vengono distribuite come funzioni AWS Lambda utilizzando il Serverless Framework. Questa pagina copre il flusso di lavoro di build, distribuzione e configurazione per gli ambienti di staging e produzione.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Configura l'API in locale -- vedi [Configurazione API Locale](../api/local-setup)
- Configura le credenziali AWS sulla tua macchina
- Assicurati di avere accesso all'account AWS di destinazione

</div>

## Build

Le API vengono compilate per la produzione utilizzando una configurazione TypeScript dedicata:

```bash
npm run build:prod
```

Questo utilizza `tsconfig.prod.json` per compilare il progetto per il runtime Lambda.

## Distribuzione

Distribuisci in staging:

```bash
npm run deploy-staging
```

Distribuisci in produzione:

```bash
npm run deploy-prod
```

## Cosa Viene Creato

Ogni distribuzione dell'API crea o aggiorna le seguenti funzioni AWS Lambda:

| Funzione | Scopo |
|----------|-------|
| `web` | Gestore delle richieste HTTP tramite API Gateway |
| `socket` | Gestore delle connessioni WebSocket |
| `timer15Min` | Attività pianificata che viene eseguita ogni 15 minuti |
| `timerMidnight` | Attività pianificata che viene eseguita ogni giorno a mezzanotte |

## Configurazione dell'Ambiente

Negli ambienti distribuiti, la configurazione viene letta da **AWS SSM Parameter Store** anziché dai file `.env`. Questo mantiene i segreti fuori dal pacchetto di distribuzione e consente modifiche alla configurazione senza ridistribuire.

:::warning
Non committare mai le credenziali di produzione nel repository. Tutta la configurazione sensibile deve essere memorizzata in AWS SSM Parameter Store e accessibile a runtime.
:::

:::tip
Per testare una distribuzione senza influire sulla produzione, distribuisci sempre prima in staging utilizzando `npm run deploy-staging` e verifica le modifiche prima di promuoverle in produzione.
:::

## Articoli Correlati

- **[Configurazione API Locale](../api/local-setup)** -- Configurazione dell'API per lo sviluppo
- **[Struttura dei Moduli](../api/module-structure)** -- Comprensione dell'architettura delle funzioni Lambda
- **[Distribuzione delle Applicazioni Web](./web-apps)** -- Distribuzione delle applicazioni frontend
