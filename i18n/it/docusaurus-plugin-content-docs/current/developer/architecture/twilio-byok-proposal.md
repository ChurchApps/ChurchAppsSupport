---
title: "BYOK Twilio (Proposta)"
description: "Integrazione Twilio di proprietà della chiesa proposta, modello di consenso, ambito di implementazione e criteri di rilascio."
---

# Proposta di integrazione BYOK con Twilio

:::caution Proposta — non è un'integrazione disponibile
Questo è un progetto da sottoporre alla revisione dei manutentori, basato su fonti pubbliche e sulla documentazione di Twilio esaminate il 22 ottobre 2026. Da allora è stato rilasciato un provider Twilio di base (`@churchapps/texting` 0.6.0 e **Settings > Texting** in B1 Admin): la chiesa inserisce il proprio Account SID, l'Auth Token e un numero di invio (il provider accetta anche un Messaging Service SID che inizia con `MG`, ma la colonna `fromNumber` è ancora `varchar(20)`, troppo corta per un SID di 34 caratteri), i messaggi vengono inviati con una richiesta per destinatario tramite l'API Messages di Twilio, e le risposte STOP raggiungono B1 tramite il webhook di ingresso esistente. Vedi [Impostazioni della chiesa: Texting](../../b1-admin/settings/church-settings.md#texting). Il modello di consenso, la gestione avanzata della disiscrizione (Advanced Opt-Out), lo stato di consegna e i controlli di prontezza della configurazione descritti sotto sono ancora proposte, non comportamenti rilasciati. La [bozza di onboarding per le chiese](./twilio-byok-onboarding-draft) contiene indicazioni di configurazione proposte ed esempi specifici per le chiese.
:::

## Percorso consigliato

Aggiungere Twilio al sistema di provider di messaggistica esistente di B1 usando **un account Twilio di proprietà della chiesa, le relative credenziali API, un Messaging Service e un numero abilitato agli SMS**. La chiesa registra la propria entità legale e la propria campagna di messaggistica, paga Twilio direttamente, mantiene il consenso dei destinatari e gestisce l'approvazione nella Console di Twilio. ChurchApps fornisce l'integrazione e la documentazione.

Partire da un solo programma di messaggistica, un solo Messaging Service e un solo mittente locale statunitense 10DLC per ogni chiesa di B1. Supportare messaggi individuali, messaggi di gruppo, messaggi dei flussi di lavoro e promemoria di adesione tramite le schermate esistenti di B1. Un primo programma ragionevole copre le variazioni dei servizi, i promemoria degli eventi e la programmazione dei volontari, purché tutti e tre siano descritti nel consenso della chiesa e nella campagna approvata. Il messaggio di raccolta fondi o promozionale richiede un ambito e un consenso valutati separatamente; non aggiungerlo silenziosamente a questo programma.

| Responsabilità | Chiesa | B1 / ChurchApps |
|---|---|---|
| Account Twilio, fatturazione, proprietà dei numeri | Ne è proprietaria e li amministra | Non crea un account di piattaforma né rivende crediti |
| Marchio, campagna, registrazione del numero | Invia informazioni accurate sulla chiesa; gestisce la revisione e le correzioni | Spiega i prerequisiti e legge le informazioni di prontezza disponibili |
| Pagina di iscrizione, politiche, finalità dei messaggi | Le pubblica e le mantiene | Fornisce controlli compatibili per i moduli, esempi e registri del consenso |
| Idoneità dei destinatari e gestione dei STOP | Esamina le prove del consenso e richiede quelle ricevute al di fuori di SMS | Applica consenso, soppressione, permessi e webhook firmati |
| Consegna e assistenza | Monitora gli errori di Twilio, lo stato dell'account e le risposte in arrivo | Mostra lo stato di invio e consegna senza garantire approvazioni |

Rinviare un account Twilio padre gestito da ChurchApps, sotto-account per i clienti, l'acquisto di numeri, le presentazioni a Trust Hub, la fatturazione, una casella di posta delle conversazioni, MMS/WhatsApp, l'invio internazionale e l'onboarding dei numeri verdi (toll-free). I numeri verdi sono un percorso separato di mittente verificato, non una scorciatoia per la registrazione. Questi limiti mantengono la prima versione allineata con il modello esistente di B1 basato su provider portati dal cliente (bring-your-own-provider).

## Fondamenta esistenti e lacune

Le seguenti osservazioni sono legate a snapshot dei sorgenti, e non a un'ipotesi su cosa sia attualmente in produzione:

| Componente | Comportamento attuale | Implicazione |
|---|---|---|
| [Registro dei provider e contratto](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` prevede invii singoli e in blocco, validazione, funzionalità opzionali di iscritti/liste e un ID messaggio del provider nei risultati. Nessun adattatore Twilio è registrato. | Aggiungere Twilio in `@churchapps/texting`; non richiede né la creazione di iscritti né liste gestite dal provider. |
| [Impostazioni di texting](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church e Nalo sono selezionabili; MinistryStuff è vincolato a una funzionalità. La modifica e il salvataggio del mittente sono attualmente specifici per Nalo. | Aggiungere campi Twilio espliciti, validazione, salvataggio del mittente e aiuto per l'onboarding. Una sola voce nel menu a tendina non basta. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) e [gateway del modulo](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Le credenziali sono cifrate e mascherate; gli invii manuali e automatici risolvono il provider della chiesa. Gli invii di gruppo eliminano i duplicati di numeri condivisi. | Riutilizzare questi percorsi e preservare l'autorizzazione. Inserire i nuovi controlli di consenso e prontezza in un percorso lato server comune, così che i flussi di lavoro non possano aggirarli. |
| [Helper STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Analizza `From`/`Body` in stile Twilio; valida un token URL della chiesa; imposta `person.optedOut` e disattiva i promemoria SMS. Le altre risposte vengono ignorate. | È un buon punto di partenza, non un webhook Twilio completo. Aggiungere le firme Twilio e uno stato di iscrizione SMS indipendente. |
| [Schema dei messaggi](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Memorizza `apiKey`, `apiSecret` e un `fromNumber` di 20 caratteri; i registri di consegna memorizzano il successo/errore immediato, non gli ID del provider né gli stati finali di consegna. | Un mittente E.164 è adatto; un Messaging Service SID di 34 caratteri richiede un campo proprio. Aggiungere una memorizzazione durevole dei messaggi e dello stato del provider. |
| [Pagina del modulo pubblico](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [renderer dei moduli condiviso](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) e [controller delle risposte](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Esistono moduli senza accesso limitato e caselle di controllo facoltative. Le descrizioni sono testo semplice. Le risposte conservano le risposte, ma il percorso di texting non ha un registro del consenso specifico per la campagna. | Aggiungere un controllo di consenso SMS configurato con link reali alle politiche e acquisizione lato server delle prove; una casella generica o l'appartenenza a un gruppo non deve autorizzare automaticamente gli SMS. |

La [documentazione utente sulle impostazioni della chiesa](../../b1-admin/settings/church-settings#texting) spiega inoltre che l'attuale flag di disiscrizione è condiviso con la privacy dell'elenco. Questo accoppiamento è un problema per il rilascio: rispondere START non deve mai cambiare la visibilità nell'elenco.

## Configurazione e progettazione delle credenziali

Usare campi di configurazione espliciti e aggiuntivi, senza sovraccaricare `fromNumber` né memorizzare dati strutturati in una stringa di chiave API:

| Campo | Scopo proposto |
|---|---|
| `accountSid` | Identificativo dell'account/progetto Twilio di proprietà della chiesa (`AC…`) |
| `apiKey`, `apiSecret` | SID della chiave API Twilio dedicata (`SK…`) e relativo segreto per l'accesso API in uscita; cifrati e mascherati |
| `webhookAuthToken` | Auth Token dell'account usato dall'SDK Twilio per validare le firme in ingresso; cifrato e mascherato separatamente |
| `messagingServiceSid` | Messaging Service della chiesa (`MG…`, 34 caratteri) |
| `fromNumber` | Numero abilitato agli SMS selezionato, in formato E.164, verificato come mittente nell'account/servizio |
| Configurazione del programma | ID stabile del programma, nome, finalità consentite, URL di iscrizione/politiche e versione dell'informativa |

Twilio [preferisce le chiavi API per l'autenticazione REST](https://www.twilio.com/docs/iam/api-keys). Usare i permessi di chiave più ristretti testati che coprono l'invio e i controlli di sola lettura necessari per la configurazione. L'Auth Token dell'account serve ancora per il [controllo standard della firma del webhook di Twilio](https://www.twilio.com/docs/usage/security). Spiegare questa distinzione nell'interfaccia; un segreto API non è un Auth Token per il webhook. Conservare le credenziali esclusivamente nello store delle impostazioni lato server, mai in pagine pubbliche, risposte ai moduli, richieste di invio dal browser o segnalazioni di supporto.

La chiesa crea e gestisce queste risorse nella Console. L'azione di validazione di B1 deve soltanto leggere il servizio, i mittenti e le informazioni di registrazione configurati. Non deve acquistare numeri, creare campagne, modificare le impostazioni di Twilio né inviare un messaggio di prova come effetto collaterale. Fornire un'azione separata e esplicita di invio di prova, limitata a un destinatario idoneo e consenziente.

Mantenere le credenziali mascherate solo quando si modifica lo stesso provider salvato. Passare a Twilio deve richiedere credenziali proprie e cancellare i valori obsoleti specifici del provider precedente; non trasferire una chiave mascherata di Clearstream o Nalo in una configurazione Twilio.

Limitare ogni caricamento/aggiornamento alla chiesa B1 autenticata. Vincolare i callback a un'integrazione salvata e all'account/servizio/mittente Twilio previsto, e rifiutare assegnazioni in conflitto tra chiese diverse. La rotazione delle credenziali e la disconnessione del provider devono invalidare la prontezza e sospendere gli invii in coda, senza cancellare consensi né registri storici di consegna.

## Il consenso e la soppressione sono lavoro necessario per il rilascio

Introdurre registri di iscrizione legati al telefono per il programma Twilio, più eventi di consenso/soppressione in sola aggiunta. Il minimo di prove suggerito è: ID della chiesa, ID del programma, telefono normalizzato, associazione facoltativa e verificata con la persona, azione affermativa, ID del modulo/risposta di origine o prova esterna verificata, timestamp del server, testo/versione dell'informativa, URL di origine, URL delle politiche ed eventi di revoca/ripresa. Limitare l'accesso e la conservazione secondo la politica di sicurezza dei dati della chiesa.

Usare stati come `unknown`, `pending`, `active` e `suppressed`. Numeri di cellulare esistenti, contatti importati, presenze, donazioni, appartenenza a gruppi, `person.optedOut = false` e `allowSms` non costituiscono un consenso affermativo al programma. Importare il consenso documentato deve essere un'azione autorizzata, verificata e tracciata, con una fonte registrata; una migrazione non deve iscrivere tutti.

Per il flusso web iniziale, usare la modalità standard dei moduli pubblici di B1. Aggiungere una domanda di consenso SMS configurata esplicitamente, che parte deselezionata, resta facoltativa, mostra link cliccabili alle politiche e corrisponde a un solo programma e a un solo campo di cellulare. Validare questa corrispondenza lato server e salvare uno snapshot dell'informativa mostrata quando si registra una risposta affermativa. Non ricavare mai il consenso da etichette arbitrarie delle domande, da intelligenza artificiale conversazionale o dall'appartenenza a un flusso di lavoro. Abilitare un equivalente conversazionale solo dopo aver testato la sua interazione affermativa esplicita e la registrazione delle prove.

Un modulo inviato senza la casella selezionata non crea alcuna iscrizione e non deve revocare un consenso già esistente di un'altra persona. Legare il consenso al telefono inviato; lo staff può risolvere le associazioni ambigue con le persone senza unire i record dei nuclei familiari. Un numero di cellulare modificato richiede un proprio consenso. Per i moduli anonimi, applicare controlli contro gli abusi e rendere esplicita qualsiasi verifica della titolarità del numero o passaggio di doppio consenso (double opt-in); una casella spuntata da sola non dimostra chi possiede il telefono. Se si usa una conferma, lasciare l'iscrizione in stato pending fino al suo completamento e descrivere quel flusso esatto nei materiali di registrazione.

Per Twilio, separare la soppressione SMS dalla visibilità nell'elenco. Migrare in modo prudente qualsiasi vecchia disiscrizione in un record di soppressione; lasciare gli altri destinatari storici come `unknown`. Una nuova iscrizione esplicita e documentata può stabilire il consenso SMS mentre la privacy dell'elenco resta invariata. Preservare il comportamento degli altri provider fino a quando le loro migrazioni non saranno valutate separatamente.

In ogni invio effettivo, richiedere che l'integrazione della chiesa sia abilitata/pronta, che esista un consenso attuale al programma per quello specifico telefono, che non vi sia alcuna soppressione a livello di telefono e che il chiamante abbia il permesso esistente. I promemoria devono inoltre rispettare `allowSms`, le preferenze per categoria e le ore di silenzio. Ricontrollare dopo l'accodamento, risolvere i campi di unione, normalizzare/validare i numeri e deduplicare per telefono. STOP sopprime tutti gli invii per il servizio/programma, inclusi quelli manuali e dei flussi di lavoro; deve coprire anche ogni persona che condivide quel telefono.

Visualizzare in modo coerente l'identità della chiesa e le istruzioni STOP nel percorso comune di invio Twilio, e mostrare in anteprima il conteggio finale di SMS/segmenti. L'espansione dei campi di unione e la gestione della lunghezza devono preservare questi elementi; non troncare silenziosamente l'istruzione per la disiscrizione. Mantenere allineati gli esempi e i modelli effettivi di promemoria/flussi di lavoro.

## Invii, risposte e stato di consegna di Twilio

Implementare `TwilioProvider.sendMessage` tramite l'API Messages con il Messaging Service e il mittente selezionati. Restituire un SID del messaggio del provider e un risultato di accettazione/invio; l'accettazione HTTP non equivale alla consegna sul dispositivo. Un invio di gruppo usa risultati per destinatario nell'ordine di input.

Limitare la concorrenza in uscita sia per `sendBulk` sia per gli invii individuali: il ramo attuale per i campi di unione distribuisce chiamate `sendMessage` in parallelo. Persistere l'intenzione di invio e i lavori reclamabili per i gruppi che non possono rientrare in un budget di richiesta; riutilizzare il modello di deployment esistente senza obbligare le chiese a eseguire un altro servizio. Riprovare i fallimenti transitori o di limite di frequenza noti con backoff. Trattare i timeout ambigui come esiti sconosciuti da riconciliare, non come un'istruzione a reinviare alla cieca, con il rischio di messaggi e addebiti duplicati.

Configurare URL di callback in ingresso e di stato specifici per la chiesa. Validare `X-Twilio-Signature` con l'SDK, l'URL esterno esatto configurato, i parametri originali del modulo e l'Auth Token dell'account corrispondente. Un URL segreto da solo non è sufficiente. Associare i callback ai record salvati di chiesa/account/messaggio, gestire i duplicati e i callback che arrivano prima che il risultato dell'invio sia stato registrato, e impedire che eventi più vecchi sovrascrivano uno stato terminale. Restituire TwiML vuoto come conferma dei messaggi in ingresso e una risposta di successo appropriata per gli eventi di stato. [Sicurezza di Twilio](https://www.twilio.com/docs/usage/security), [callback di stato](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Consigliare **Advanced Opt-Out** del Messaging Service. Twilio gestisce le conferme STOP/START/HELP; B1 consuma gli eventi `OptOutType` autenticati senza inviare conferme duplicate. STOP registra subito la soppressione; START ripristina solo un'iscrizione nota allo stesso programma informato, con un nuovo evento di ripresa, e non deve iscrivere un nuovo telefono a messaggi non correlati né attivare le preferenze dei promemoria. HELP non iscrive nessuno. Le altre risposte in arrivo restano fuori dall'ambito della casella di posta di B1; le chiese devono avere un modo documentato per monitorarle in Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Memorizzare l'SID del messaggio Twilio, il collegamento account/servizio, l'orario di invio, lo stato finale/codice di errore e l'orario del callback accanto al registro di consegna. Mostrare con precisione lo stato in coda/accettato, consegnato, non riuscito, non consegnato o sconosciuto. Mantenere il contratto di risposta esistente per gli altri provider e definire se i conteggi aggregati di successo rappresentano l'invio o la consegna.

## Prontezza della configurazione e validazione dell'approvazione

Mostrare checkpoint distinti per credenziali, proprietà del servizio/mittente, verifica della campagna, registrazione del numero, controlli dei webhook e un test di invio consegnato. Non mostrare mai un unico badge verde "approvato" solo perché le credenziali funzionano.

Per i numeri locali statunitensi, leggere la [risorsa della campagna Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) del servizio e richiedere che la campagna pertinente sia `VERIFIED`. Verificare a parte che il telefono selezionato sia associato a quel servizio e abbia completato la registrazione del numero: una campagna approvata può avere comunque un numero in attesa. Quando un'API di lettura supportata non espone un segnale richiesto, mostrare **verifica manuale nella Console richiesta** e registrare la conferma datata dell'amministratore della chiesa come tale; non etichettarla come verificata via API. Gli eventi automatici di registrazione del numero possono essere un'evoluzione successiva. [Errori di registrazione dei numeri](https://www.twilio.com/docs/api/errors/30035), [eventi di registrazione A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Richiedere controlli aggiornati prima di abilitare gli invii; registrare quando e come è stata verificata la prontezza, far scadere i controlli obsoleti e sospendere in caso di credenziali revocate, mittenti modificati, fallimenti di registrazione o errori persistenti dell'account. La consegna di un test di invio conferma il percorso testato, non un'approvazione universale da parte dei vettori né il consenso del destinatario. La bozza di accompagnamento specifica i controlli operativi della chiesa prima dell'invio, prima del lancio e in corso d'opera.

## Repository e piano di rilascio

La [guida al contributo dell'organizzazione](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) indirizza le richieste di funzionalità di B1 a ChurchAppsSupport e le PR di implementazione ai repository di competenza. Usare una sola richiesta di funzionalità centrale e collegare le PR di implementazione mirate:

1. **ChurchAppsSupport:** rivedere questo progetto e la sua bozza di onboarding prima di presentare Twilio come funzionalità disponibile per gli utenti.
2. **Packages:** aggiungere l'adattatore Twilio, la configurazione/le interfacce condivise esplicite e il rendering del controllo di consenso SMS dove è condiviso da B1Admin/B1App. Includere i changeset e pubblicare tramite il flusso di rilascio esistente prima di aggiornare i consumer.
3. **Api:** aggiungere migrazioni additive per i metadati dell'integrazione, il consenso/la soppressione e gli stati di consegna; implementare la validazione della configurazione, i controlli condivisi di invio, l'acquisizione delle prove dai moduli, la gestione dei webhook e la persistenza dell'invio.
4. **B1Admin:** aggiungere l'interfaccia di configurazione/prontezza di Twilio, la gestione di programma/consenso, il salvataggio del mittente consapevole del provider e il reporting accurato della consegna. Non esporre alcun override del consenso SMS tramite le normali modifiche alla persona.
5. **B1App:** verificare la pagina/il modulo pubblico e l'esperienza dei link alle politiche rispetto ai controlli condivisi, inclusi i visitatori anonimi e da mobile. Non serve un client browser separato per Twilio.
6. **ChurchAppsSupport:** dopo il rilascio, trasformare la bozza di onboarding in pagine di impostazioni/aiuto supportate, aggiungere screenshot effettivi, collegarla dalle impostazioni di Texting e organizzare le traduzioni.

Distribuire prima lo schema e i pacchetti condivisi, poi i consumer. Mantenere Twilio abilitato solo tramite funzionalità per un piccolo pilota con adesione volontaria; i provider esistenti devono continuare a funzionare. Il rollback disabilita l'invio tramite Twilio e annulla i lavori non inviati, preservando disiscrizioni e prove; non deve passare automaticamente i destinatari a un provider o a un mittente diverso.

## Valutazione dello sforzo

Stima di pianificazione per un contributore che conosce l'ecosistema; in questa valutazione non sono stati usati credenziali di produzione né SMS reali:

| Lavoro | Giornate di sviluppo |
|---|---|
| Adattatore, estensioni di configurazione/schema, interfaccia delle impostazioni | 2–3 |
| Consenso di telefono/programma, soppressione indipendente, controlli condivisi di invio, integrazione con i moduli pubblici | 3–5 |
| Callback firmati, persistenza della consegna, invio limitato e durevole | 2–3 |
| Interfaccia di prontezza, guida per la chiesa, test di integrazione e regressione, correzioni del pilota | 3–4 |
| **Ambito di lancio consigliato** | **10–15 in totale** |

Un prototipo di base dell'adattatore/delle impostazioni richiede circa 1–2 giornate. Una stima del solo mittente esclude il lavoro di consenso e di onboarding necessario per questa raccomandazione. I tempi di revisione esterni di Twilio e dei vettori sono separati e variabili; il progetto non deve promettere una data di approvazione né un esito dell'approvazione.

## Criteri di accettazione

- [ ] La chiesa possiede e paga l'account, il servizio, il mittente registrato e la campagna; non è richiesto alcun account Twilio gestito da ChurchApps.
- [ ] Le credenziali sono cifrate e mascherate, limitate al tenant, ruotabili e assenti da log e contenuti pubblici; la validazione è di sola lettura.
- [ ] La casella di consenso facoltativa e deselezionata mostra link reali alle politiche e salva lato server le prove di programma/telefono/informativa; rifiutarla consente comunque l'azione principale del modulo.
- [ ] Tutti i percorsi manuali, di gruppo, con campi di unione, dei flussi di lavoro e dei promemoria applicano la stessa verifica di idoneità per Twilio. I destinatari sconosciuti, non consenzienti, con telefono modificato o soppressi vengono saltati con un motivo utile; il rendering preserva l'identità della chiesa e le istruzioni STOP dopo l'espansione e la gestione della lunghezza.
- [ ] La vecchia privacy dell'elenco non iscrive i destinatari; STOP/START non modificano mai la visibilità nell'elenco né le preferenze non correlate. I casi di numero condiviso e di chiesa diversa sono testati.
- [ ] STOP/START/HELP firmati, firme non valide, account/servizi errati, eventi duplicati, invii di moduli ripetuti e mappature di consenso falsificate sono coperti.
- [ ] Dimensione dei gruppi/timeout, limiti di frequenza, fallimenti parziali, esiti ambigui, corse tra callback ed eventi di consegna fuori ordine sono testati senza invii duplicati.
- [ ] L'approvazione della campagna e la registrazione completata del numero sono distinte dalla validazione delle credenziali. Le prove manuali sono etichettate chiaramente; una prontezza obsoleta o revocata blocca gli invii.
- [ ] Una chiesa pilota verifica la sua pagina di iscrizione, i percorsi del modulo rifiutato e accettato, gli URL esatti delle politiche e un destinatario di prova consenziente attraverso invio, consegna, soppressione tramite STOP e nuova iscrizione consentita.
- [ ] Le impostazioni esistenti di Clearstream, Text In Church e Nalo e il comportamento di invio superano i controlli di regressione; il testo di aiuto distingue le proposte dalle funzionalità rilasciate.
