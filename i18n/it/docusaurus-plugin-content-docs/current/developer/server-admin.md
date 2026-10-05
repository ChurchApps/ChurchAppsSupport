---
title: "Amministrazione del Server"
---

# Amministrazione del Server

<div class="article-intro">

Le funzioni di amministrazione del server in ChurchApps sono disponibili solo per gli utenti con la permissione **Server.Admin**. Questi strumenti vengono utilizzati per le operazioni della piattaforma, il supporto e la risoluzione dei problemi in tutte le chiese del sistema.

</div>

:::warning Accesso Limitato
Le funzioni descritte su questa pagina richiedono la permissione **Server.Admin** e non sono disponibili per gli amministratori di chiesa regolari. Sono destinate solo agli operatori di piattaforma e al personale di supporto.
:::

## Accesso a Server Admin

Gli utenti con permissione Server.Admin possono accedere al pannello di amministrazione del server da B1 Admin:

1. Accedi a [admin.b1.church](https://admin.b1.church)
2. Apri il [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), espandi **Settings** e fai clic su **Server Admin**. (Puoi anche andare direttamente a `admin.b1.church/admin`.)
3. Il pannello Server Admin ha sezioni per Chiese, Utenti, Personifica Utente, Lavori in Background, Commons, Tendenze di Utilizzo, Ricerche di Traduzione, Salute del Server e Migrazioni del Database

## Rappresentazione dell'Utente

La funzione di rappresentazione consente agli amministratori del server di accedere come un altro utente a scopo di supporto e risoluzione dei problemi. Questo è utile quando si investigano problemi segnalati dagli utenti o si aiutano le chiese a configurare i loro sistemi.

### Come Rappresentare un Utente

1. Apri la sezione **Impersonate User** del pannello Server Admin
2. Inserisci il nome o l'indirizzo email dell'utente nel campo di ricerca
3. Fai clic su **Search** o premi Invio
4. Dai risultati della ricerca, fai clic sull'utente che desideri rappresentare
5. Conferma la rappresentazione nella finestra di dialogo che appare
6. Verrai registrato come quell'utente e reindirizzato al suo account

### Note Importanti

- La rappresentazione crea una nuova sessione con le autorizzazioni dell'utente di destinazione e l'accesso alla chiesa
- La tua sessione di amministrazione originale termina quando rappresenti un altro utente
- Tutte le azioni intraprese durante la rappresentazione sono registrate nella traccia di audit
- Per tornare al tuo account di amministrazione, esci e accedi di nuovo con le tue credenziali
- Usa la rappresentazione solo quando necessario a scopo di supporto e informa sempre gli utenti quando accedi ai loro account per il supporto

### Endpoint API

La funzione di rappresentazione è supportata dall'endpoint `/users/:userId/impersonate` nell'API di Membership. Vedi [Membership Endpoints](/docs/developer/api/endpoints/membership#users) per i dettagli tecnici.

### Considerazioni di Sicurezza

- La rappresentazione richiede la permissione Server.Admin - questa permissione dovrebbe essere concessa raramente e solo agli operatori di piattaforma affidabili
- Tutti gli eventi di rappresentazione sono registrati con l'ID dell'utente amministratore e l'ID dell'utente di destinazione
- Le chiese non vengono notificate quando si verifica la rappresentazione, quindi stabilisci chiari criteri per quando e come questa funzione dovrebbe essere utilizzata
- Considera di documentare gli eventi di rappresentazione nel tuo sistema di ticket di supporto per la responsabilità

## Moderazione Commons

Commons è la coda di moderazione condivisa per il contenuto inviato dagli utenti tra prodotti — canzoni WorshipCommons, lezioni Lessons.church, modelli FreeShow e modelli del generatore di siti web B1 fluiscono tutti attraverso la stessa coda invece di strumenti di revisione separati per prodotto.

### Accesso a Commons

1. Naviga alla scheda **Commons** nel pannello Server Admin.
2. Vedrai tre sotto-schede: **Queue**, **Reports** e **Assets**.

Un ruolo **music editor** limitato può anche vedere la scheda Queue, ma è bloccato dall'approvare invii che cambiano i diritti o la concessione di licenze di una canzone.

### Queue

La Queue elenca ogni invio in sospeso tra tutti i prodotti, filtrabile per prodotto e tipo di asset. Ogni riga mostra se l'invio è un nuovo asset, una modifica da parte dell'autore originale o una modifica da parte di terzi, insieme al record di approvazione del mittente e al tempo che l'invio ha atteso (contrassegnato una volta che supera le 72 ore).

Fai clic su **Review** per aprire un drawer con diff a livello di campo, anteprime di file e un'anteprima di sola lettura incorporata dell'elemento. Usa i tasti **a**/**r** per approvare o rifiutare e **j**/**k** per spostarti all'invio successivo o precedente senza uscire dal drawer. Il rifiuto richiede la selezione di un motivo (ad esempio qualità, duplicato, licenza, ccli, ai o fuori tema) e una nota.

### Reports

La scheda Reports gestisce i rapporti di copyright e i rapporti di politica/qualità archiviati contro gli asset già pubblicati, divisi in code separate di Copyright e Policy & Other più una cronologia Resolved. Dichiara un rapporto per iniziare a lavorarci, quindi risolvilo con una risoluzione (sostenuto, respinto o duplicato) e un'azione (nessuno, annulla pubblicazione o rimuovi).

### Assets

La scheda Assets è un browser ricercabile di contenuto pubblicato con azioni per **Feature** un asset (lo evidenzia nella home page del prodotto), **Unpublish**/**Republish** esso, o **Remove** esso (con un motivo di copyright o politica).

Per le canzoni in particolare, è anche dove una canzone diventa **Sunday-ready** e idonea a comparire nella ricerca di canzoni B1 Admin di una chiesa: un revisore apre l'asset e contrassegna ogni chiave pubblicata come **Listened** una volta che l'ha ascoltata e ha confermato che il punteggio, gli accordi e le diapositive sono tutti presenti. Una canzone diventa Sunday-ready solo una volta che ogni chiave è stata verificata.

:::info
La moderazione di Commons è solo per il personale — le singole chiese non vedono mai questa coda. L'unico posto in cui un B1 Admin di una chiesa individuale tocca i dati di Commons è la sezione "WorshipCommons — free" della [ricerca di canzoni](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), che fa emergere solo le canzoni che hanno già attraversato questo processo di revisione.
:::

Vedi la pagina [architettura Content Commons](/docs/developer/architecture/commons) per il modello di dati sottostante e il ciclo di vita dell'invio.

## Approvazione Email Gruppo

Le chiese non possono inviare email scritte dalla chiesa (email di gruppo, follow-up di moduli, email di flusso di lavoro e inviti di account) finché un amministratore del server non le approva. Questo impedisce alle chiese auto-registrate da bot di utilizzare l'indirizzo di invio ChurchApps condiviso per spam.

1. Apri la scheda **Churches** nel pannello Server Admin.
2. Ogni chiesa mostra un chip **Group Email**: **Approved** (verde) o **Not approved** (contorno).
3. Fai clic sul chip e conferma per approvare la chiesa, oppure per revocare un'approvazione.

Il personale della chiesa chiede l'approvazione con il pulsante **Request review** nel dialogo Send Email di B1 Admin. La richiesta viene inviata via email all'indirizzo di supporto ed elenca il nome della chiesa, l'ID, la data di registrazione, la posizione e chi ha chiesto. Una chiesa può inviare una richiesta per settimana. Vedi [Limiti di email scritti da chiesa](/docs/developer/architecture/notifications#church-authored-email-limits) per l'indennità giornaliera e la pausa automatica su rimbalzi e reclami.

## Migrazioni Database

I deploy non cambiano il database. I database ospitati accettano solo connessioni dall'interno della rete di Api, quindi dopo una versione che aggiunge una migrazione, un amministratore del server l'applica dalla scheda **Database Migrations**. (Gli istall Docker auto-ospitati ancora eseguono migrazioni automaticamente quando il contenitore di Api si avvia.)

La scheda mostra l'ambiente attuale e una riga per modulo (membership, attendance, giving, ecc.) con il suo stato, il numero di migrazioni applicate e in sospeso, e l'ultima applicata.

- **Run Pending Migrations** applica ogni migrazione in sospeso, un modulo alla volta, in ordine. Si interrompe al primo errore e mostra cosa è stato applicato per ogni modulo.
- Un modulo contrassegnato **No history** ha un database che precede il tracciamento delle migrazioni. Non viene mai eseguito automaticamente, perché ciò riprodurrebbe vecchie migrazioni di dati su tabelle dal vivo. Invece fai clic su **Check Schema** su quel modulo. Api confronta le tabelle, le colonne e gli indici che ogni migrazione crea con il database dal vivo e contrassegna ogni migrazione **Already applied**, **Missing**, **Partly applied** o **Data only**. Nulla viene modificato dal check.
- Nei risultati del check, **Record as Already Applied** scrive le migrazioni rilevate nella cronologia delle migrazioni senza eseguirle (dopo una conferma). Tutto fino all'ultima migrazione **Already applied** è registrato, incluso quelle **Data only** in quell'intervallo; quelle **Missing** rimangono in sospeso e possono quindi essere eseguite normalmente con **Run Pending Migrations**.
- Una migrazione **Partly applied** blocca la registrazione. Se la migrazione è sicura da eseguire di nuovo (leggila prima), seleziona **Re-run** in modo che rimanga in sospeso ed esegui di nuovo dall'inizio.

Il pannello Server Admin e la CLI (`yarn migrate:up`) usano lo stesso migrator Kysely e la tabella `kysely_migration`, quindi sono sempre d'accordo su cosa è stato applicato. Gli endpoint di supporto sono `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, tutti Server.Admin soltanto.

## Pagine Correlate

- [Autenticazione e Autorizzazioni](/docs/developer/api/endpoints/authentication) — Modello di autorizzazione e autenticazione JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API di gestione utente e chiesa
- [Audit Log](/docs/b1-admin/reports/audit-log) — Visualizza i log attività per una chiesa
- [Content Commons Architecture](/docs/developer/architecture/commons) — Modello di asset condiviso e ciclo di vita della moderazione
