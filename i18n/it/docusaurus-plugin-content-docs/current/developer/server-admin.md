---
title: "Amministrazione del server"
---

# Amministrazione del server

<div class="article-intro">

Le funzioni di amministrazione del server in ChurchApps sono disponibili solo per gli utenti con il permesso **Server.Admin**. Questi strumenti sono utilizzati per le operazioni della piattaforma, il supporto e la risoluzione dei problemi in tutte le chiese del sistema.

</div>

:::warning Accesso limitato
Le funzioni descritte in questa pagina richiedono il permesso **Server.Admin** e non sono disponibili per gli amministratori regolari della chiesa. Sono destinate agli operatori della piattaforma e al personale di supporto solo.
:::

## Accesso all'amministrazione del server

Gli utenti con il permesso Server.Admin possono accedere al pannello di amministrazione del server da B1 Admin:

1. Accedi a [admin.b1.church](https://admin.b1.church)
2. Fai clic sulla scheda **Admin** nella navigazione principale
3. Il pannello di amministrazione del server include schede per la gestione di chiese, utenti e operazioni di sistema

## Rappresentazione dell'utente

La funzione di rappresentazione consente agli amministratori del server di accedere come un altro utente ai fini del supporto e della risoluzione dei problemi. Questo è utile quando si indagano su problemi segnalati dagli utenti o quando si aiutano le chiese a configurare i loro sistemi.

### Come rappresentare un utente

1. Vai alla scheda **Impersonate** nel pannello di amministrazione del server
2. Immetti il nome o l'indirizzo email dell'utente nel campo di ricerca
3. Fai clic su **Search** o premi Invio
4. Dai risultati della ricerca, fai clic sull'utente che desideri rappresentare
5. Conferma la rappresentazione nella finestra di dialogo che appare
6. Verrai registrato come quell'utente e reindirizzato al suo account

### Note importanti

- La rappresentazione crea una nuova sessione con i permessi e l'accesso alla chiesa dell'utente di destinazione
- La tua sessione di admin originale termina quando rappresenti un altro utente
- Tutte le azioni intraprese durante la rappresentazione vengono registrate nella traccia di audit
- Per tornare al tuo account di admin, esci e accedi di nuovo con le tue credenziali
- Utilizza la rappresentazione solo quando necessario per scopi di supporto e informa sempre gli utenti quando accedi ai loro account per supporto

### Endpoint API

La funzione di rappresentazione è supportata dall'endpoint `/users/:userId/impersonate` nell'API Membership. Vedi [Membership Endpoints](/docs/developer/api/endpoints/membership#users) per i dettagli tecnici.

### Considerazioni sulla sicurezza

- La rappresentazione richiede il permesso Server.Admin - questo permesso dovrebbe essere concesso con parsimonia e solo agli operatori della piattaforma affidabili
- Tutti gli eventi di rappresentazione vengono registrati con l'id utente admin e l'id utente di destinazione
- Le chiese non vengono notificate quando si verifica una rappresentazione, quindi stabilisci chiare politiche per quando e come questa funzione dovrebbe essere utilizzata
- Considera di documentare gli eventi di rappresentazione nel tuo sistema di ticket di supporto per la responsabilità

## Pagine correlate

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Modello di permesso e autenticazione JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API di gestione di utenti e chiese
- [Audit Log](/docs/b1-admin/reports/audit-log) — Visualizza i log di attività per una chiesa
