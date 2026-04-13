---
title: "Sicurezza dei Dati"
---

# Sicurezza dei Dati

<div class="article-intro">

Sebbene non esista un sistema perfettamente sicuro, ChurchApps prende la sicurezza dei dati molto seriamente. Questa pagina spiega le misure adottate per proteggere tutti i dati inseriti in B1.church Admin e altri prodotti ChurchApps.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Leggi questa pagina per capire come sono protetti i dati della tua chiesa
- Configura [Ruoli e Autorizzazioni](./roles-permissions.md) per controllare chi può accedere alle informazioni sensibili
- Familiarizza con la [politica sulla privacy](https://churchapps.org/privacy)

</div>

## Limitazione dei dati sensibili memorizzati

Il nostro primo approccio è non memorizzare più dati sensibili del necessario. Questo significa non memorizzare mai dettagli di carte di credito o conti bancari utilizzati per le donazioni. Quando un utente effettua una donazione tramite B1.church Admin o B1, i dati della carta di credito non vengono mai trasmessi ai nostri server, ma solo al tuo gateway di pagamento (Stripe). Ciò significa che in caso di violazione dei dati, nessun dato di carte di credito o bancario verrebbe compromesso.

Inoltre, non memorizziamo mai le password nel nostro sistema. Tutte le password vengono elaborate attraverso un algoritmo di hashing unidirezionale in cui parte dei dati viene distrutta, rendendo impossibile per chiunque recuperare le password dal database, nemmeno per noi. Per verificare le password, il valore inserito deve passare attraverso lo stesso hash unidirezionale e produrre lo stesso risultato.

Dopo aver rimosso queste due fonti, gli unici dati sensibili che rimangono sono un elenco di nomi e informazioni di contatto.

:::tip
Poiché ChurchApps non memorizza mai informazioni su carte di credito o bancarie, anche nel peggiore dei casi una violazione dei dati non esporrebbe i dettagli dei conti finanziari. Solo nomi e informazioni di contatto sarebbero a rischio.
:::

## Utilizzo delle migliori pratiche standard

Utilizziamo le migliori pratiche standard del settore per la sicurezza, inclusa la crittografia di tutti i dati in transito da e verso i nostri server tramite HTTPS. Tutti i server sono ospitati in un datacenter fisico sicuro con Amazon Web Services. Tutti i server di database sono protetti da un firewall e non sono accessibili da Internet.

## Segregazione dei dati

I dati sono separati in diversi database in base all'ambito. Ciascuna delle nostre API (Membership, Giving, Attendance, Messaging, Doing e Lessons) è un silo indipendente di dati con il proprio database. Se uno di essi viene compromesso, l'utilità dei dati è limitata senza che anche gli altri vengano compromessi. Ad esempio, se l'API/database Giving venisse compromesso, un malintenzionato potrebbe potenzialmente accedere a un elenco di donazioni e date (ma mai a dati di carte/bancari). Tuttavia, non avrebbe accesso a quali utenti hanno effettuato le donazioni o per quali chiese, poiché quei dati sono memorizzati nel database separato Membership.

:::info
La segregazione dei dati significa che compromettere un sistema non dà accesso a tutti i dati della chiesa. Ogni API opera in modo indipendente con il proprio database, limitando l'impatto di qualsiasi potenziale violazione.
:::

## Accesso limitato

L'accesso ai server di produzione è strettamente limitato agli amministratori di sistema che necessitano dell'accesso. Attualmente si tratta di due persone che sono anche membri del consiglio. Sviluppatori, volontari e altri membri del consiglio non hanno il permesso di accedere ai server di produzione.

## Politica sulla privacy

I tuoi dati sono tuoi e non saranno mai venduti a terze parti. Puoi leggere la nostra politica sulla privacy completa [qui](https://churchapps.org/privacy).

## Conformità al GDPR

ChurchApps supporta la conformità al GDPR per le chiese con membri nel Regno Unito o nell'Unione Europea. Ecco come affrontiamo i requisiti principali:

### Diritti dell'interessato

ChurchApps fornisce strumenti per aiutare le chiese a rispondere alle richieste degli interessati:

- **Diritto di accesso (Articolo 15)** — I membri possono scaricare tutti i propri dati personali dal portale dei membri utilizzando il pulsante "Scarica i miei dati". Gli amministratori possono anche esportare i dati di qualsiasi persona dalla pagina di dettaglio della persona.
- **Diritto alla cancellazione (Articolo 17)** — I membri possono eliminare il proprio account dal portale dei membri. Gli amministratori possono anonimizzare o eliminare definitivamente i dati di una persona in tutti i moduli. L'anonimizzazione sostituisce le informazioni personali con valori generici preservando i record aggregati (totali delle donazioni, conteggi delle presenze) necessari per la rendicontazione finanziaria della chiesa.
- **Diritto alla limitazione del trattamento (Articolo 18)** — I membri possono limitare il trattamento dei propri dati, inclusa la rinuncia alle comunicazioni.
- **Diritto alla portabilità dei dati (Articolo 20)** — La funzione di esportazione dei dati fornisce tutti i dati personali in un formato JSON strutturato e leggibile da macchina.

### Trattamento dei dati

ChurchApps agisce come **responsabile del trattamento** per conto della tua chiesa (il **titolare del trattamento**). Il nostro [Accordo sul trattamento dei dati](https://churchapps.org/terms) delinea le responsabilità di ciascuna parte, incluso l'utilizzo di sub-responsabili, le procedure di notifica delle violazioni e la gestione dei dati in caso di cessazione.

### Trasferimenti internazionali di dati

I dati di ChurchApps sono ospitati su Amazon Web Services (AWS) negli Stati Uniti. I trasferimenti internazionali di dati dal Regno Unito/UE sono coperti dalle Clausole Contrattuali Standard (SCCs) di AWS nell'ambito dell'[Addendum sul trattamento dei dati AWS](https://aws.amazon.com/compliance/data-processing-addendum/). L'hosting nell'UE non è richiesto quando sono in atto meccanismi di trasferimento appropriati come le SCCs.

### Sub-responsabili

- **Amazon Web Services (AWS)** — Hosting dell'infrastruttura, archiviazione dei dati e distribuzione dei contenuti
- **Stripe** — Elaborazione dei pagamenti per le donazioni (nessun dato delle carte viene memorizzato da ChurchApps)

:::info
Per tutti i dettagli su come gestiamo i dati personali, consulta la nostra [Informativa sulla privacy](https://churchapps.org/privacy) e i nostri [Termini di servizio](https://churchapps.org/terms). Per domande sulla conformità al GDPR, contattaci a support@churchapps.org.
:::
