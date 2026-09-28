---
title: "Amministrazione del Server"
---

# Amministrazione del Server

<div class="article-intro">

Le funzioni di amministrazione del server in ChurchApps sono disponibili solo agli utenti con il permesso **Server.Admin**. Questi strumenti vengono utilizzati per le operazioni della piattaforma, il supporto e la risoluzione dei problemi in tutte le chiese del sistema.

</div>

:::warning Accesso Limitato
Le funzioni descritte in questa pagina richiedono il permesso **Server.Admin** e non sono disponibili ai normali amministratori della chiesa. Sono destinate solo agli operatori della piattaforma e al personale di supporto.
:::

## Accesso ad Admin del Server

Gli utenti con permesso Server.Admin possono accedere al pannello admin del server da B1 Admin:

1. Accedi a [admin.b1.church](https://admin.b1.church)
2. Apri **Impostazioni**, quindi fai clic su **Server Admin** nel menu Impostazioni. (Puoi anche andare direttamente a `admin.b1.church/admin`.)
3. Il pannello Server Admin ha sezioni per Chiese, Utenti, Rappresentazione Utente, Lavori in Background, Commons, Tendenze di Utilizzo, Ricerche di Traduzione, Salute del Server e Migrazioni Database

## Rappresentazione dell'Utente

La funzione di rappresentazione consente ai server admin di accedere come un altro utente per scopi di supporto e risoluzione dei problemi. Questo è utile quando si indagano i problemi segnalati dagli utenti o si aiutano le chiese a configurare i loro sistemi.

### Come Rappresentare un Utente

1. Apri la sezione **Rappresentazione Utente** del pannello Server Admin
2. Inserisci il nome o l'indirizzo email dell'utente nel campo di ricerca
3. Fai clic su **Ricerca** o premi Invio
4. Dai risultati della ricerca, fai clic sull'utente che desideri rappresentare
5. Conferma la rappresentazione nella finestra di dialogo che appare
6. Sarai collegato come quell'utente e reindirizzato al suo account

### Note Importanti

- La rappresentazione crea una nuova sessione con i permessi dell'utente target e l'accesso della chiesa
- La tua sessione admin originale termina quando rappresenti un altro utente
- Tutte le azioni intraprese durante la rappresentazione vengono registrate nella traccia di audit
- Per tornare al tuo account admin, esci e accedi di nuovo con le tue credenziali
- Usa la rappresentazione solo quando necessario per scopi di supporto e informa sempre gli utenti quando accedi ai loro account per il supporto

### Endpoint API

La funzione di rappresentazione è supportata dall'endpoint `/users/:userId/impersonate` nell'API di Membership. Vedi [Membership Endpoints](/docs/developer/api/endpoints/membership#users) per i dettagli tecnici.

### Considerazioni sulla Sicurezza

- La rappresentazione richiede il permesso Server.Admin - questo permesso dovrebbe essere concesso raramente e solo agli operatori della piattaforma di fiducia
- Tutti gli eventi di rappresentazione vengono registrati con l'ID utente admin e l'ID utente target
- Le chiese non vengono notificate quando si verifica la rappresentazione, quindi stabilisci politiche chiare su quando e come questa funzione dovrebbe essere utilizzata
- Considera di documentare gli eventi di rappresentazione nel tuo sistema di ticket di supporto per l'accountability

## Moderazione Commons

Commons è la coda di moderazione condivisa per i contenuti inviati dagli utenti in tutti i prodotti — le canzoni di WorshipCommons, le lezioni di Lessons.church, i modelli di FreeShow e i modelli del website builder di B1 scorrono tutti attraverso la stessa coda invece di strumenti di revisione separati per prodotto.

### Accesso a Commons

1. Vai alla scheda **Commons** nel pannello Server Admin.
2. Vedrai tre sotto-schede: **Queue**, **Reports** e **Assets**.

Un ruolo limitato di **music editor** può anche vedere la scheda Queue, ma è bloccato dall'approvazione di sottomissioni che cambiano i diritti o le licenze di una canzone.

### Queue

La Queue elenca ogni sottomissione in sospeso su tutti i prodotti, filtrabile per prodotto e tipo di risorsa. Ogni riga mostra se la sottomissione è una nuova risorsa, una modifica da parte del suo autore originale o una modifica da parte di una terza parte, insieme alla traccia di approvazione del sottomittente e per quanto tempo la sottomissione è in attesa (contrassegnata una volta che supera 72 ore).

Fai clic su **Review** per aprire un drawer con diff a livello di campo, anteprime di file e un'anteprima di sola lettura incorporata dell'elemento. Usa i shortcut da tastiera **a**/**r** per approvare o rifiutare, e **j**/**k** per passare alla sottomissione successiva o precedente senza lasciare il drawer. Il rifiuto richiede la selezione di un motivo (ad esempio qualità, duplicato, licenza, ccli, ai o fuori argomento) e una nota.

### Reports

La scheda Reports gestisce i rapporti di copyright e le segnalazioni di politica/qualità presentate contro le risorse già pubblicate, suddivise in separate code Copyright e Policy & Other più una cronologia Resolved. Rivendica un rapporto per iniziare a lavorarci, quindi risolvilo con una risoluzione (accolto, respinto o duplicato) e un'azione (nessuno, unpublish o remove).

### Assets

La scheda Assets è un browser ricercabile dei contenuti pubblicati con azioni per **Feature** di una risorsa (la evidenzia nella home page del prodotto), **Unpublish**/**Republish** di essa, o **Remove** di essa (con un motivo di copyright o politica).

Per le canzoni in particolare, questo è anche il luogo in cui una canzone diventa **Sunday-ready** e idonea ad apparire in una ricerca di canzoni B1 Admin di una chiesa: un revisore apre la risorsa e contrassegna ogni chiave pubblicata come **Listened** una volta ascoltata e confermato che il punteggio, gli accordi e le diapositive sono tutti presenti. Una canzone diventa Sunday-ready solo quando ogni chiave è stata controllata.

:::info
La moderazione di Commons è solo per il personale — le chiese individuali non vedono mai questa coda. L'unico luogo in cui il B1 Admin di una chiesa individuale tocca i dati di Commons è la sezione "WorshipCommons — free" della [ricerca di canzoni](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), che fa emergere solo le canzoni che hanno già attraversato questo processo di revisione.
:::

Vedi la pagina [Content Commons architecture](/docs/developer/architecture/commons) per il modello dati sottostante e il ciclo di vita della sottomissione.

## Approvazione Email Gruppo

Le chiese non possono inviare email scritte dalla chiesa (email di gruppo, follow-up del form, email del workflow e inviti di account) fino a quando un server admin non le approva. Questo impedisce alle chiese registrate da bot di utilizzare l'indirizzo di invio condiviso di ChurchApps per lo spam.

1. Apri la scheda **Churches** nel pannello Server Admin.
2. Ogni chiesa mostra un chip **Group Email**: **Approved** (verde) o **Not approved** (delineato).
3. Fai clic sul chip e conferma per approvare la chiesa, o per revocare un'approvazione.

Il personale della chiesa chiede l'approvazione con il pulsante **Request review** nella finestra di dialogo Send Email di B1 Admin. La richiesta viene inviata all'indirizzo di supporto ed elenca il nome della chiesa, l'ID, la data di registrazione, la posizione e chi ha chiesto. Una chiesa può inviare una richiesta a settimana. Vedi [Church-authored email limits](/docs/developer/architecture/notifications#church-authored-email-limits) per l'indennità giornaliera e la pausa automatica su rimbalzi e reclami.

## Migrazioni Database

I deploy non modificano il database. I database ospitati accettano solo connessioni dall'interno della rete dell'Api, quindi dopo una release che aggiunge una migrazione, un server admin la applica dalla scheda **Database Migrations**. (Gli install Docker self-hosted eseguono comunque le migrazioni automaticamente all'avvio del container Api.)

La scheda mostra l'ambiente corrente e una riga per modulo (membership, attendance, giving e così via) con il suo stato, il numero di migrazioni applicate e in sospeso, e l'ultima applicata.

- **Run Pending Migrations** applica ogni migrazione in sospeso, un modulo alla volta, in ordine. Si ferma al primo fallimento e mostra cosa è stato applicato per ogni modulo.
- Un modulo contrassegnato **No history** ha un database che precede il tracciamento della migrazione. Non viene mai eseguito automaticamente, perché ciò comporterebbe la ripetizione di vecchie migrazioni di dati su tabelle live. Fai clic su **Check Schema** su quel modulo invece. L'Api confronta le tabelle, le colonne e gli indici che ogni migrazione crea con il database live e contrassegna ogni migrazione **Already applied**, **Missing**, **Partly applied** o **Data only**. Nulla viene modificato dal controllo.
- Nei risultati del controllo, **Record as Already Applied** scrive le migrazioni rilevate nella cronologia della migrazione senza eseguirle. Quelle mancanti rimangono in sospeso e possono quindi essere eseguite normalmente.
- Una migrazione **Partly applied** blocca la registrazione. Se la migrazione è sicura da eseguire di nuovo (leggerla prima), seleziona **Re-run** in modo che rimanga in sospeso e viene eseguita di nuovo dall'inizio.

Il pannello Server Admin e il CLI (`yarn migrate:up`) utilizzano lo stesso migrator Kysely e la tabella `kysely_migration`, quindi sono sempre d'accordo su cosa è stato applicato. Gli endpoint di supporto sono `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, tutti Server.Admin only.

## Pagine Correlate

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Modello di permesso e autenticazione JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API di gestione di utenti e chiese
- [Audit Log](/docs/b1-admin/reports/audit-log) — Visualizza i log delle attività per una chiesa
- [Content Commons Architecture](/docs/developer/architecture/commons) — Modello di risorsa condiviso e ciclo di vita della moderazione
