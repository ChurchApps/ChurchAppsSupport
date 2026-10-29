---
title: "Amministrazione del server"
---

# Amministrazione del server

<div class="article-intro">

Le funzionalità di amministrazione del server in ChurchApps sono disponibili solo agli utenti con il permesso **Server.Admin**. Questi strumenti servono per le operazioni della piattaforma, il supporto e la risoluzione dei problemi su tutte le chiese del sistema.

</div>

:::warning Accesso limitato
Le funzionalità descritte in questa pagina richiedono il permesso **Server.Admin** e non sono disponibili ai normali amministratori delle chiese. Sono destinate esclusivamente agli operatori della piattaforma e al personale di supporto.
:::

## Accesso all'amministrazione del server

Gli utenti con il permesso Server.Admin possono accedere al pannello di amministrazione del server da B1 Admin:

1. Accedi a [admin.b1.church](https://admin.b1.church)
2. Apri il [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), espandi **Impostazioni** e clicca su **Server Admin**. (Puoi anche andare direttamente a `admin.b1.church/admin`.)
3. Il pannello Server Admin elenca le proprie sezioni sul lato sinistro, in tre gruppi: **Directory** (Chiese, Utenti, Impersona utente), **Operazioni** (Processi in background, Commons, Tendenze di utilizzo) e **Sistema** (Ricerche di traduzione, Stato del server, Migrazioni del database)

## Reimpostazione dell'accesso a due fattori

Se un utente ha attivato l'[accesso a due fattori](../b1-admin/profile/managing-profile.md#two-factor-sign-in) e ha perso sia il telefono sia i codici di backup, un amministratore del server può disattivarlo:

1. Apri la sezione **Utenti** del pannello Server Admin e cerca l'utente.
2. Gli utenti con l'accesso a due fattori mostrano un badge **Two-factor on**. Clicca **Reset 2FA** accanto ad esso.
3. Conferma la richiesta. Procedi solo dopo aver verificato con certezza l'identità della persona con cui stai parlando.

L'utente può poi accedere con la sola password e configurare di nuovo l'accesso a due fattori dal proprio profilo. Le reimpostazioni vengono registrate nel log di controllo come `mfa_reset`. L'endpoint è `POST /membership/users/mfa/reset/:userId` e richiede Server.Admin.

## Impersonificazione dell'utente

La funzionalità di impersonificazione consente agli amministratori del server di accedere come un altro utente per attività di supporto e risoluzione dei problemi. È utile quando si indagano segnalazioni di problemi da parte degli utenti o si aiutano le chiese a configurare i propri sistemi.

### Come impersonare un utente

1. Apri la sezione **Impersona utente** del pannello Server Admin
2. Inserisci il nome o l'indirizzo email dell'utente nel campo di ricerca
3. Clicca su **Cerca** o premi Invio
4. Dai risultati della ricerca, clicca sull'utente che vuoi impersonare
5. Conferma l'impersonificazione nella finestra di dialogo che appare
6. Verrai effettuato l'accesso come quell'utente e reindirizzato al suo account

### Note importanti

- L'impersonificazione crea una nuova sessione con i permessi e l'accesso alle chiese dell'utente di destinazione
- La tua sessione di amministratore originale termina quando impersoni un altro utente
- Tutte le azioni compiute durante l'impersonificazione vengono registrate nel registro di controllo
- Per tornare al tuo account di amministratore, esci e accedi di nuovo con le tue credenziali
- Usa l'impersonificazione solo quando necessario per attività di supporto e informa sempre gli utenti quando accedi ai loro account per supporto

### Endpoint API

La funzionalità di impersonificazione si basa sull'endpoint `/users/:userId/impersonate` dell'API di Membership. Vedi [Endpoint di Membership](/docs/developer/api/endpoints/membership#users) per i dettagli tecnici.

### Considerazioni sulla sicurezza

- L'impersonificazione richiede il permesso Server.Admin — questo permesso va concesso con parsimonia e solo a operatori della piattaforma di fiducia
- Tutti gli eventi di impersonificazione vengono registrati con l'ID dell'amministratore e l'ID dell'utente di destinazione
- Le chiese non vengono notificate quando avviene un'impersonificazione, quindi definisci politiche chiare su quando e come usare questa funzionalità
- Valuta di documentare gli eventi di impersonificazione nel tuo sistema di ticket di supporto, per garantire la tracciabilità

## Moderazione di Commons

Commons è la coda di moderazione condivisa per i contenuti inviati dagli utenti su più prodotti — canti di WorshipCommons, lezioni di Lessons.church, template di FreeShow e template del sito web builder di B1 confluiscono tutti nella stessa coda invece che in strumenti di revisione separati per ogni prodotto.

### Accesso a Commons

1. Vai alla scheda **Commons** nel pannello Server Admin.
2. Vedrai tre sotto-schede: **Coda**, **Segnalazioni** e **Risorse**.

Un ruolo limitato di **editor musicale** può vedere anche la scheda Coda, ma non può approvare le proposte che modificano i diritti o la licenza di un canto.

### Coda

La Coda elenca tutte le proposte in attesa di tutti i prodotti, filtrabili per prodotto e tipo di risorsa. Ogni riga indica se la proposta è una nuova risorsa, una modifica del suo autore originale o una modifica di terzi, insieme allo storico di approvazioni dell'autore e a quanto tempo la proposta è in attesa (segnalata quando supera le 72 ore).

Clicca **Revisiona** per aprire un pannello laterale con le differenze a livello di campo, le anteprime dei file e un'anteprima integrata in sola lettura dell'elemento. Usa le scorciatoie da tastiera **a**/**r** per approvare o rifiutare, e **j**/**k** per passare alla proposta successiva o precedente senza lasciare il pannello. Per rifiutare è necessario selezionare un motivo (ad esempio qualità, duplicato, licenza, ccli, ai o fuori tema) e inserire una nota.

### Segnalazioni

La scheda Segnalazioni gestisce le segnalazioni di copyright e di policy/qualità presentate contro risorse già pubblicate, suddivise in code separate Copyright e Policy e altro, più lo storico Risolte. Prendi in carico una segnalazione per iniziare a lavorarci, poi risolvila indicando un esito (confermata, respinta o duplicata) e un'azione (nessuna, rimuovi dalla pubblicazione o rimuovi).

### Risorse

La scheda Risorse è un browser ricercabile dei contenuti pubblicati, con azioni per **Evidenziare** una risorsa (la mette in evidenza nella home page del prodotto), **Annullare la pubblicazione**/**Ripubblicare** o **Rimuovere** (con un motivo di copyright o di policy).

Per i canti in particolare, qui è anche dove un canto diventa **pronto per la domenica** ed eleggibile per comparire nella ricerca canti di B1 Admin di una chiesa: un revisore apre la risorsa e segna ogni tonalità pubblicata come **Ascoltata** dopo averla ascoltata e aver verificato che spartito, accordi e diapositive siano tutti presenti. Un canto diventa pronto per la domenica solo quando tutte le tonalità sono spuntate.

:::info
La moderazione di Commons è riservata al personale — le singole chiese non vedono mai questa coda. L'unico punto in cui B1 Admin di una singola chiesa tocca i dati di Commons è la sezione "WorshipCommons — gratuiti" della [ricerca canti](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), che mostra solo i canti già passati da questo processo di revisione.
:::

Vedi la pagina [architettura di Content Commons](/docs/developer/architecture/commons) per il modello dei dati sottostante e il ciclo di vita delle proposte.

## Approvazione dell'email di gruppo

Le chiese non possono inviare email scritte dalla chiesa (email di gruppo, follow-up dei moduli, email dei workflow e inviti agli account) finché un amministratore del server non le approva. Questo impedisce che chiese registrate da bot usino l'indirizzo di invio condiviso di ChurchApps per fare spam.

1. Apri la scheda **Chiese** nel pannello Server Admin.
2. Ogni chiesa mostra un badge **Email di gruppo**: **Approvata** (verde) oppure **Non approvata** (contorno).
3. Clicca il badge e conferma per approvare la chiesa o per revocare un'approvazione.

Il personale della chiesa richiede l'approvazione con il pulsante **Richiedi revisione** nella finestra di dialogo Invia email di B1 Admin. La richiesta viene inviata via email all'indirizzo di supporto e riporta il nome della chiesa, l'ID, la data di registrazione, la posizione e chi l'ha richiesta. Una chiesa può inviare una richiesta a settimana. Vedi [Limiti delle email scritte dalla chiesa](/docs/developer/architecture/notifications#church-authored-email-limits) per la quota giornaliera e la sospensione automatica in caso di rimbalzi e reclami.

## Migrazioni del database

Il workflow **Deploy Prod** applica autonomamente le migrazioni in sospeso. I database ospitati accettano connessioni solo dall'interno della rete dell'Api, quindi un runner di GitHub non può raggiungerli; invece, subito dopo `serverless deploy`, il workflow invoca la Lambda `migrate` dell'Api (`api-Prod-migrate`), che esegue le migrazioni in sospeso di ogni modulo con lo stesso runner di questa scheda e fa fallire il deploy se un modulo genera un errore o viene rifiutato. **Rollback Prod** ripristina solo il codice della Lambda; le migrazioni già applicate restano applicate. La scheda **Migrazioni del database** serve per controllarne lo stato, per eseguire quelle che un deploy non ha eseguito (ad esempio nell'ambiente demo, il cui deploy non esegue migrazioni), e per inizializzare la cronologia dei moduli che non ne hanno una. (Le installazioni Docker self-hosted eseguono ancora le migrazioni automaticamente all'avvio del container dell'Api.)

La scheda mostra l'ambiente corrente e una riga per modulo (membership, attendance, giving e così via) con il suo stato, il numero di migrazioni applicate e in sospeso e l'ultima applicata.

- **Esegui migrazioni in sospeso** applica ogni migrazione in sospeso, un modulo alla volta, in ordine. Si ferma alla prima anomalia e mostra cosa è stato applicato per ogni modulo.
- Un modulo contrassegnato come **Nessuna cronologia** ha un database precedente al tracciamento delle migrazioni. Non viene mai eseguito automaticamente, perché significherebbe riprodurre vecchie migrazioni di dati sulle tabelle attive. Clicca invece **Verifica schema** su quel modulo. L'Api confronta le tabelle, le colonne e gli indici che ogni migrazione crea con il database attivo e contrassegna ciascuna migrazione come **Già applicata**, **Mancante**, **Parzialmente applicata** o **Solo dati**. Il controllo non modifica nulla.
- Nei risultati del controllo, **Registra come già applicate** scrive le migrazioni rilevate nella cronologia delle migrazioni senza eseguirle (previa conferma). Vengono registrate tutte le migrazioni fino all'ultima **Già applicata** compresa, incluse quelle **Solo dati** in quell'intervallo; le migrazioni **Mancanti** restano in sospeso e possono poi essere eseguite normalmente con **Esegui migrazioni in sospeso**.
- Una migrazione **Parzialmente applicata** blocca la registrazione. Se la migrazione è sicura da rieseguire (leggila prima), spunta **Riesegui** così resta in sospeso ed esegue di nuovo dall'inizio.

Il pannello Server Admin e la CLI (`yarn migrate:up`) usano lo stesso migratore Kysely e la stessa tabella `kysely_migration`, quindi concordano sempre su cosa è stato applicato. Gli endpoint di supporto sono `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` e `POST .../:module/baseline`, tutti riservati a Server.Admin.

## Pagine correlate

- [Autenticazione e permessi](/docs/developer/api/endpoints/authentication) — Modello dei permessi e autenticazione JWT
- [Endpoint di Membership](/docs/developer/api/endpoints/membership) — API per la gestione di utenti e chiese
- [Registro di controllo](/docs/b1-admin/reports/audit-log) — Visualizza le attività di una chiesa
- [Architettura di Content Commons](/docs/developer/architecture/commons) — Modello delle risorse condivise e ciclo di vita della moderazione
