---
title: "Amministrazione del server"
---

# Amministrazione del server

<div class="article-intro">

Le funzionalità di amministrazione del server di ChurchApps sono disponibili solo agli utenti con il permesso **Server.Admin**. Questi strumenti servono per le operazioni della piattaforma, il supporto e la risoluzione dei problemi per tutte le chiese del sistema.

</div>

:::warning Accesso riservato
Le funzionalità descritte in questa pagina richiedono il permesso **Server.Admin** e non sono disponibili agli amministratori di chiesa ordinari. Sono destinate esclusivamente agli operatori della piattaforma e al personale di supporto.
:::

## Accedere all'amministrazione del server

Gli utenti con il permesso Server.Admin possono accedere al pannello di amministrazione del server da B1 Admin:

1. Accedete a [admin.b1.church](https://admin.b1.church)
2. Aprite il [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), espandete **Impostazioni** e fate clic su **Amministrazione server**. (Potete anche andare direttamente all'indirizzo `admin.b1.church/admin`.)
3. Il pannello di amministrazione del server elenca le sue sezioni sul lato sinistro, in tre gruppi: **Directory** (Chiese, Utenti, Impersona utente), **Operazioni** (Processi in background, Commons, Tendenze di utilizzo) e **Sistema** (Ricerche di traduzione, Stato del server, Migrazioni del database)

## Impersonare un utente

La funzione di impersonificazione consente agli amministratori del server di accedere come un altro utente, a fini di supporto e risoluzione dei problemi. È utile quando si indagano problemi segnalati dagli utenti o quando si aiutano le chiese a configurare i propri sistemi.

### Come impersonare un utente

1. Aprite la sezione **Impersona utente** del pannello di amministrazione del server
2. Inserite il nome o l'indirizzo email dell'utente nel campo di ricerca
3. Fate clic su **Cerca** oppure premete Invio
4. Dai risultati della ricerca, fate clic sull'utente che volete impersonare
5. Confermate l'impersonificazione nella finestra di dialogo che compare
6. Sarete connessi come quell'utente e reindirizzati al suo account

### Note importanti

- L'impersonificazione crea una nuova sessione con i permessi e l'accesso alle chiese dell'utente di destinazione
- La vostra sessione di amministratore originale termina quando impersonate un altro utente
- Tutte le azioni eseguite durante l'impersonificazione vengono registrate nel registro di controllo
- Per tornare al vostro account di amministratore, disconnettetevi e riaccedete con le vostre credenziali
- Usate l'impersonificazione solo quando necessario per il supporto e informate sempre gli utenti quando accedete ai loro account per assistenza

### Endpoint API

La funzione di impersonificazione si basa sull'endpoint `/users/:userId/impersonate` del modulo Membership API. Per i dettagli tecnici, vedere [Endpoint Membership](/docs/developer/api/endpoints/membership#users).

### Considerazioni sulla sicurezza

- L'impersonificazione richiede il permesso Server.Admin -- questo permesso va concesso con parsimonia e solo a operatori della piattaforma di fiducia
- Tutti gli eventi di impersonificazione vengono registrati con l'ID dell'utente amministratore e l'ID dell'utente di destinazione
- Le chiese non vengono avvisate quando avviene un'impersonificazione, quindi stabilite con chiarezza politiche su quando e come usare questa funzione
- Valutate di documentare gli eventi di impersonificazione nel vostro sistema di ticket di supporto, per garantire la responsabilità

## Moderazione dei Commons

Commons è la coda di moderazione condivisa per i contenuti inviati dagli utenti tra i vari prodotti: canti di WorshipCommons, lezioni di Lessons.church, modelli di FreeShow e modelli del website builder di B1 transitano tutti attraverso la stessa coda, invece di strumenti di revisione separati per ogni prodotto.

### Accedere a Commons

1. Passate alla scheda **Commons** nel pannello di amministrazione del server.
2. Vedrete tre sottoschede: **Coda**, **Segnalazioni** e **Asset**.

Un ruolo limitato di **editor musicale** può vedere anche la scheda Coda, ma non può approvare le proposte che modificano i diritti o le licenze di un canto.

### Coda

La Coda elenca tutte le proposte in attesa in tutti i prodotti, filtrabili per prodotto e tipo di asset. Ogni riga indica se la proposta è un nuovo asset, una modifica del suo autore originale o una modifica di un terzo, insieme allo storico di approvazioni dell'autore e al tempo trascorso in attesa (segnalato dopo 72 ore).

Fate clic su **Revisiona** per aprire un pannello con le differenze campo per campo, le anteprime dei file e un'anteprima in sola lettura dell'elemento. Usate le scorciatoie da tastiera **a**/**r** per approvare o rifiutare, e **j**/**k** per passare alla proposta successiva o precedente senza uscire dal pannello. Per rifiutare occorre selezionare un motivo (ad esempio qualità, duplicato, licenza, ccli, ai o fuori tema) e scrivere una nota.

### Segnalazioni

La scheda Segnalazioni gestisce le segnalazioni di copyright e di politica/qualità inviate su asset già pubblicati, suddivise nelle code separate Copyright e Politica e altro, più uno storico Risolte. Richiedete una segnalazione per iniziare a lavorarci, poi risolvetela indicando un esito (confermata, respinta o duplicata) e un'azione (nessuna, rimuovi dalla pubblicazione o elimina).

### Asset

La scheda Asset è un elenco consultabile dei contenuti pubblicati, con azioni per **Metti in evidenza** un asset (lo mostra nella home page del prodotto), **Rimuovi dalla pubblicazione** / **Ripubblica** oppure **Elimina** (indicando un motivo di copyright o di politica).

Per i canti in particolare, è anche qui che un canto diventa **pronto per la domenica** e idoneo a comparire nella ricerca canti di B1 Admin di una chiesa: un revisore apre l'asset e contrassegna ciascuna tonalità pubblicata come **Ascoltato** una volta che l'ha ascoltata per intero e ha confermato che spartito, accordi e diapositive sono tutti presenti. Un canto diventa pronto per la domenica solo quando tutte le tonalità sono contrassegnate.

:::info
La moderazione di Commons è riservata al personale -- le singole chiese non vedono mai questa coda. L'unico punto in cui B1 Admin di una singola chiesa utilizza i dati di Commons è la sezione "WorshipCommons — gratuito" della [ricerca canti](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), che mostra solo i canti già passati da questa revisione.
:::

Vedere la pagina [Architettura di Content Commons](/docs/developer/architecture/commons) per il modello dei dati sottostante e il ciclo di vita delle proposte.

## Approvazione dell'email di gruppo

Le chiese non possono inviare email scritte dalla chiesa (email di gruppo, follow-up dei moduli, email dei flussi di lavoro e inviti agli account) finché un amministratore del server non le approva. Questo impedisce alle chiese registrate tramite bot di usare l'indirizzo di invio condiviso di ChurchApps per lo spam.

1. Aprite la scheda **Chiese** nel pannello di amministrazione del server.
2. Ogni chiesa mostra un chip **Email di gruppo**: **Approvata** (verde) oppure **Non approvata** (contorno).
3. Fate clic sul chip e confermate per approvare la chiesa, oppure per revocare un'approvazione.

Il personale della chiesa richiede l'approvazione con il pulsante **Richiedi revisione** nella finestra Invia email di B1 Admin. La richiesta viene inviata via email all'indirizzo di supporto e riporta il nome della chiesa, l'ID, la data di registrazione, la località e chi l'ha richiesta. Una chiesa può inviare una richiesta a settimana. Vedere [Limiti delle email scritte dalla chiesa](/docs/developer/architecture/notifications#church-authored-email-limits) per il limite giornaliero e la sospensione automatica in caso di rimbalzi e reclami.

## Migrazioni del database {#database-migrations}

Il workflow **Deploy Prod** applica autonomamente le migrazioni in sospeso. I database ospitati accettano connessioni solo dall'interno della rete della Api, quindi un runner di GitHub non può raggiungerli; invece, subito dopo `serverless deploy`, il workflow invoca la Lambda `migrate` della Api (`api-Prod-migrate`), che esegue le migrazioni in sospeso di ogni modulo con lo stesso runner di questa scheda, e fa fallire il deploy se un modulo genera errori o viene rifiutato. **Rollback Prod** ripristina solo il codice della Lambda; le migrazioni già applicate restano applicate. La scheda **Migrazioni del database** serve per controllare lo stato, eseguire ciò che un deploy non ha eseguito (ad esempio sull'ambiente demo, il cui deploy non esegue migrazioni) e impostare la base di partenza per i moduli senza storico. (Le installazioni self-hosted con Docker eseguono ancora le migrazioni automaticamente all'avvio del container della Api.)

La scheda mostra l'ambiente corrente e una riga per modulo (membership, attendance, giving e così via), con il suo stato, il numero di migrazioni applicate e in sospeso, e l'ultima applicata.

- **Esegui migrazioni in sospeso** applica tutte le migrazioni in sospeso, un modulo alla volta, in ordine. Si interrompe al primo errore e mostra ciò che è stato applicato per ciascun modulo.
- Un modulo contrassegnato come **Nessuno storico** ha un database precedente al tracciamento delle migrazioni. Non viene mai eseguito automaticamente, perché significherebbe riapplicare vecchie migrazioni di dati sulle tabelle in produzione. Fate clic su **Verifica schema** per quel modulo. La Api confronta tabelle, colonne e indici creati da ciascuna migrazione con il database in produzione e contrassegna ogni migrazione come **Già applicata**, **Mancante**, **Parzialmente applicata** o **Solo dati**. La verifica non modifica nulla.
- Nei risultati della verifica, **Registra come già applicate** scrive le migrazioni rilevate nello storico delle migrazioni senza eseguirle (dopo una conferma). Vengono registrate tutte le migrazioni fino all'ultima **Già applicata** compresa, incluse quelle **Solo dati** in quell'intervallo; le migrazioni **Mancanti** restano in sospeso e possono poi essere eseguite normalmente con **Esegui migrazioni in sospeso**.
- Una migrazione **Parzialmente applicata** blocca la registrazione. Se la migrazione può essere rieseguita in sicurezza (leggetela prima), selezionate **Riesegui** così resta in sospeso ed è eseguita di nuovo dall'inizio.

Il pannello di amministrazione del server e la CLI (`yarn migrate:up`) usano lo stesso migratore Kysely e la stessa tabella `kysely_migration`, quindi concordano sempre su cosa è stato applicato. Gli endpoint di supporto sono `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, tutti riservati a Server.Admin.

## Pagine correlate

- [Autenticazione e permessi](/docs/developer/api/endpoints/authentication) -- Modello dei permessi e autenticazione JWT
- [Endpoint Membership](/docs/developer/api/endpoints/membership) -- API di gestione di utenti e chiese
- [Registro di controllo](/docs/b1-admin/reports/audit-log) -- Visualizzare il registro delle attività di una chiesa
- [Architettura di Content Commons](/docs/developer/architecture/commons) -- Modello degli asset condivisi e ciclo di vita della moderazione
