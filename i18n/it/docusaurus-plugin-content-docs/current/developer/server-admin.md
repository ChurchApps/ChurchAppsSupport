---
title: "Amministrazione del server"
---

# Amministrazione del server

<div class="article-intro">

Le funzioni di amministrazione del server di ChurchApps sono disponibili solo agli utenti con il permesso **Server.Admin**. Questi strumenti servono per le operazioni della piattaforma, il supporto e la risoluzione dei problemi su tutte le chiese del sistema.

</div>

:::warning Accesso limitato
Le funzioni descritte in questa pagina richiedono il permesso **Server.Admin** e non sono disponibili per i normali amministratori delle chiese. Sono destinate esclusivamente agli operatori della piattaforma e al personale di supporto.
:::

## Accedere all'amministrazione del server

Gli utenti con il permesso Server.Admin possono accedere al pannello di amministrazione del server da B1 Admin:

1. Accedi a [admin.b1.church](https://admin.b1.church)
2. Apri il [menu di navigazione rapida](../b1-admin/introduction.md#getting-around-with-the-jump-menu), espandi **Impostazioni** e clicca su **Amministrazione server**. (Puoi anche andare direttamente su `admin.b1.church/admin`.)
3. Il pannello di amministrazione del server elenca le sue sezioni sul lato sinistro, in tre gruppi: **Directory** (Chiese, Utenti, Impersona utente), **Operazioni** (Processi in background, Commons, Tendenze di utilizzo) e **Sistema** (Ricerche di traduzione, Stato del server, Migrazioni del database)

## Reimpostare l'accesso a due fattori

Se un utente ha attivato l'[accesso a due fattori](../b1-admin/profile/managing-profile.md#two-factor-sign-in) e ha perso sia il telefono sia i codici di backup, un amministratore del server può disattivarlo:

1. Apri la sezione **Utenti** del pannello di amministrazione del server e cerca l'utente.
2. Gli utenti con l'accesso a due fattori mostrano un badge **Due fattori attivo**. Clicca su **Reimposta 2FA** accanto ad esso.
3. Conferma la richiesta. Fallo solo dopo aver verificato con certezza chi hai di fronte.

L'utente può poi accedere con la sola password e configurare di nuovo l'accesso a due fattori dal proprio profilo. Le reimpostazioni vengono registrate nel registro di controllo come `mfa_reset`. L'endpoint è `POST /membership/users/mfa/reset/:userId` e richiede Server.Admin.

## Impersonificazione dell'utente

La funzione di impersonificazione permette agli amministratori del server di accedere come un altro utente a fini di supporto e risoluzione dei problemi. È utile per indagare sulle segnalazioni degli utenti o per aiutare le chiese a configurare i propri sistemi.

### Come impersonare un utente

1. Apri la sezione **Impersona utente** del pannello di amministrazione del server
2. Inserisci il nome o l'indirizzo email dell'utente nel campo di ricerca
3. Clicca su **Cerca** oppure premi Invio
4. Dai risultati della ricerca, clicca sull'utente che vuoi impersonare
5. Conferma l'impersonificazione nella finestra che compare
6. Verrai connesso come quell'utente e reindirizzato al suo account

### Note importanti

- L'impersonificazione crea una nuova sessione con i permessi e l'accesso alle chiese dell'utente di destinazione
- La tua sessione di amministratore originale termina quando impersoni un altro utente
- Tutte le azioni compiute mentre sei impersonato vengono registrate nel registro di controllo
- Per tornare al tuo account di amministratore, esci e accedi di nuovo con le tue credenziali
- Usa l'impersonificazione solo quando è necessario per il supporto e informa sempre gli utenti quando accedi ai loro account per assistenza

### Endpoint dell'API

La funzione di impersonificazione si basa sull'endpoint `/users/:userId/impersonate` dell'API di Membership. Per i dettagli tecnici, vedi [Endpoint Membership](/docs/developer/api/endpoints/membership#users).

### Considerazioni sulla sicurezza

- L'impersonificazione richiede il permesso Server.Admin -- questo permesso va concesso con parsimonia e solo a operatori della piattaforma di fiducia
- Ogni evento di impersonificazione viene registrato con l'ID dell'amministratore e l'ID dell'utente di destinazione
- Le chiese non vengono avvisate quando avviene un'impersonificazione, quindi stabilisci politiche chiare su quando e come usare questa funzione
- Valuta di documentare gli eventi di impersonificazione nel tuo sistema di ticket di supporto, per garantire la responsabilità

## Moderazione di Commons

Commons è la coda di moderazione condivisa per i contenuti inviati dagli utenti su più prodotti -- i canti di WorshipCommons, le lezioni di Lessons.church, i modelli di FreeShow e i modelli del costruttore di siti web di B1 passano tutti dalla stessa coda invece che da strumenti di revisione separati per ogni prodotto.

### Accedere a Commons

1. Vai alla scheda **Commons** nel pannello di amministrazione del server.
2. Vedrai tre sotto-schede: **Coda**, **Segnalazioni** e **Risorse**.

Un ruolo limitato di **editor musicale** può vedere anche la scheda Coda, ma non può approvare le proposte che modificano i diritti o le licenze di un canto.

### Coda

La Coda elenca ogni proposta in sospeso di tutti i prodotti, filtrabile per prodotto e tipo di risorsa. Ogni riga indica se la proposta è una nuova risorsa, una modifica del suo autore originale o una modifica di terzi, insieme allo storico di approvazioni di chi l'ha inviata e da quanto tempo la proposta è in attesa (segnalata dopo 72 ore).

Clicca su **Rivedi** per aprire un pannello con le differenze per campo, le anteprime dei file e un'anteprima in sola lettura incorporata dell'elemento. Usa le scorciatoie da tastiera **a**/**r** per approvare o rifiutare, e **j**/**k** per passare alla proposta successiva o precedente senza lasciare il pannello. Per rifiutare occorre selezionare un motivo (ad esempio qualità, duplicato, licenza, ccli, ia o fuori tema) e scrivere una nota.

### Segnalazioni

La scheda Segnalazioni gestisce le segnalazioni di copyright e di politica/qualità presentate per risorse già pubblicate, suddivise nelle code separate Copyright e Politica e altro, più uno storico Risolte. Prendi in carico una segnalazione per iniziare a lavorarci, poi risolvila con un esito (confermata, respinta o duplicato) e un'azione (nessuna, annulla pubblicazione o rimuovi).

### Risorse

La scheda Risorse è un elenco ricercabile dei contenuti pubblicati, con azioni per **Mettere in evidenza** una risorsa (la mostra nella home page del prodotto), **Annullare la pubblicazione** / **Ripubblicare** oppure **Rimuovere** (indicando un motivo di copyright o di politica).

Per i canti, è anche qui che un canto diventa **pronto per la domenica** e idoneo a comparire nella ricerca canti di B1 Admin di una chiesa: un revisore apre la risorsa e contrassegna ogni tonalità pubblicata come **Ascoltato** dopo averla ascoltata e aver confermato che spartito, accordi e diapositive sono presenti. Un canto diventa pronto per la domenica solo quando tutte le tonalità sono spuntate.

:::info
La moderazione di Commons è riservata allo staff -- le singole chiese non vedono mai questa coda. L'unico punto in cui B1 Admin di una singola chiesa tocca i dati di Commons è la sezione "WorshipCommons — gratuito" della [ricerca canti](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), che mostra solo i canti già passati da questa revisione.
:::

Vedi la pagina [Architettura di Content Commons](/docs/developer/architecture/commons) per il modello dei dati sottostante e il ciclo di vita delle proposte.

## Approvazione dell'email di gruppo

Le chiese non possono inviare email scritte dalla chiesa (email di gruppo, follow-up dei moduli, email dei flussi di lavoro e inviti agli account) finché un amministratore del server non le approva. Questo impedisce alle chiese registrate da bot di usare l'indirizzo di invio condiviso di ChurchApps per lo spam.

1. Apri la scheda **Chiese** nel pannello di amministrazione del server.
2. Ogni chiesa mostra un badge **Email di gruppo**: **Approvata** (verde) o **Non approvata** (contorno).
3. Clicca sul badge e conferma per approvare la chiesa, oppure per revocare un'approvazione.

Lo staff delle chiese chiede l'approvazione con il pulsante **Richiedi revisione** nella finestra Invia email di B1 Admin. La richiesta viene inviata via email all'indirizzo di supporto e riporta il nome della chiesa, l'ID, la data di registrazione, la località e chi l'ha richiesta. Una chiesa può inviare una richiesta a settimana. Vedi [Limiti delle email scritte dalla chiesa](/docs/developer/architecture/notifications#church-authored-email-limits) per il limite giornaliero e la pausa automatica in caso di rimbalzi e segnalazioni.

## Migrazioni del database {#database-migrations}

Il workflow **Deploy Prod** applica autonomamente le migrazioni in sospeso. I database ospitati accettano connessioni solo dalla rete dell'API, quindi un runner GitHub non può raggiungerli; invece, subito dopo `serverless deploy`, il workflow invoca la Lambda `migrate` dell'API (`api-Prod-migrate`), che esegue le migrazioni in sospeso di ogni modulo con lo stesso runner di questa scheda e fa fallire il deploy se un modulo genera un errore o viene rifiutato. **Rollback Prod** ripristina solo il codice della Lambda; le migrazioni già applicate restano applicate. La scheda **Migrazioni del database** serve a controllare lo stato, a eseguire ciò che un deploy non ha eseguito (ad esempio sull'ambiente demo, il cui deploy non esegue migrazioni) e a fissare la baseline dei moduli senza storico. (Le installazioni Docker self-hosted eseguono ancora le migrazioni automaticamente all'avvio del container dell'API.)

La scheda mostra l'ambiente attuale e una riga per modulo (membership, presenze, donazioni e così via) con il suo stato, il numero di migrazioni applicate e in sospeso, e l'ultima applicata.

- **Esegui migrazioni in sospeso** applica ogni migrazione in sospeso, un modulo alla volta, in ordine. Si ferma al primo errore e mostra cosa è stato applicato per ogni modulo.
- Un modulo contrassegnato come **Nessuno storico** ha un database precedente al monitoraggio delle migrazioni. Non viene mai eseguito automaticamente, perché significherebbe riprodurre vecchie migrazioni dei dati sulle tabelle in produzione. Clicca invece su **Controlla lo schema** per quel modulo. L'API confronta tabelle, colonne e indici creati da ogni migrazione con il database attivo e contrassegna ogni migrazione come **Già applicata**, **Mancante**, **Parzialmente applicata** oppure **Solo dati**. Il controllo non modifica nulla.
- Nei risultati del controllo, **Registra come già applicate** scrive le migrazioni rilevate nello storico delle migrazioni senza eseguirle (dopo conferma). Viene registrato tutto fino all'ultima migrazione **Già applicata**, incluse quelle **Solo dati** in quell'intervallo; quelle **Mancanti** restano in sospeso e possono poi essere eseguite normalmente con **Esegui migrazioni in sospeso**.
- Una migrazione **Parzialmente applicata** blocca la registrazione. Se la migrazione può essere eseguita di nuovo in sicurezza (leggila prima), spunta **Riesegui** così resta in sospeso ed esegue di nuovo dall'inizio.

Il pannello di amministrazione del server e la CLI (`yarn migrate:up`) usano lo stesso migratore Kysely e la stessa tabella `kysely_migration`, quindi concordano sempre su cosa è stato applicato. Gli endpoint di supporto sono `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, tutti riservati a Server.Admin.

## Pagine correlate

- [Autenticazione e permessi](/docs/developer/api/endpoints/authentication) — modello dei permessi e autenticazione JWT
- [Endpoint Membership](/docs/developer/api/endpoints/membership) — API di gestione di utenti e chiese
- [Registro di controllo](/docs/b1-admin/reports/audit-log) — visualizza i log di attività di una chiesa
- [Architettura di Content Commons](/docs/developer/architecture/commons) — modello delle risorse condivise e ciclo di moderazione
