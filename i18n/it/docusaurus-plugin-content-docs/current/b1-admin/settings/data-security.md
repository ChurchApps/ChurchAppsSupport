---
title: "Sicurezza dei dati"
description: "Scopri come ChurchApps protegge i dati della tua chiesa in B1 Admin, dalle password con hash e HTTPS fino a database separati e strumenti GDPR."
---

# Sicurezza dei dati

<div class="article-intro">

Non esiste un sistema perfettamente sicuro, ma ChurchApps prende la sicurezza dei dati molto sul serio. Questa pagina spiega le misure adottate per proteggere tutti i dati inseriti in B1.church Admin e negli altri prodotti ChurchApps.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Leggi questa pagina per capire come vengono protetti i dati della tua chiesa
- Configura [Ruoli e autorizzazioni](./roles-permissions.md) per controllare chi può accedere alle informazioni sensibili
- Familiarizza con l'[informativa sulla privacy](https://churchapps.org/privacy)

</div>

## Limitare i dati sensibili conservati {#limiting-sensitive-data-stored}

Il nostro primo approccio è non conservare più dati sensibili del necessario. Questo significa non memorizzare mai i dati di carte di credito o di conti bancari usati per fare donazioni. Quando un utente fa una donazione tramite B1.church Admin o B1, i dati della carta di credito non vengono mai trasmessi ai nostri server, ma solo al tuo gateway di pagamento (Stripe). Così, in caso di violazione dei dati, nessuna informazione su carte di credito o conti bancari potrebbe essere compromessa.

Inoltre, non memorizziamo mai le password nel nostro sistema. Tutte le password vengono elaborate con un algoritmo di hashing unidirezionale che distrugge parte dei dati, rendendo impossibile a chiunque recuperare le password dal database, nemmeno a noi. Per verificare una password, il valore inserito deve passare attraverso lo stesso hash unidirezionale e produrre lo stesso risultato.

Eliminate queste due fonti, l'unico dato sensibile rimasto è un elenco di nomi e recapiti.

:::tip
Poiché ChurchApps non memorizza mai informazioni su carte di credito o conti bancari, anche nel peggiore scenario di violazione dei dati non verrebbero esposti i dettagli dei conti finanziari. A rischio ci sarebbero solo nomi e recapiti.
:::

## Applicare le buone pratiche standard {#using-standard-best-practices}

Adottiamo le buone pratiche standard del settore per la sicurezza, tra cui la cifratura di tutti i dati in transito da e verso i nostri server tramite HTTPS. Tutti i server sono ospitati in un data center fisico sicuro di Amazon Web Services. Tutti i server di database sono protetti da un firewall e non sono accessibili da Internet.

## Separazione dei dati {#data-segregation}

I dati sono separati in database diversi in base all'ambito. Ciascuno dei nostri moduli (Anagrafica, Donazioni, Presenze, Messaggistica, Operatività e Contenuti) è un silo di dati indipendente con database propri. Se uno di essi venisse compromesso, l'utilità dei dati resterebbe limitata senza che anche gli altri vengano compromessi. Ad esempio, se l'API/database delle donazioni fosse compromessa, un malintenzionato potrebbe ottenere un elenco di donazioni e date (ma mai dati di carte o conti bancari). Non avrebbe però accesso a quali utenti hanno fatto le donazioni o a quali chiese fossero destinate, perché questi dati sono conservati nel database Anagrafica separato.

:::info
La separazione dei dati significa che la compromissione di un sistema non dà accesso a tutti i dati della chiesa. Ogni API opera in modo indipendente, con il proprio database, limitando l'impatto di un'eventuale violazione.
:::

## Accesso limitato {#limited-access}

L'accesso ai server di produzione è strettamente limitato agli amministratori di server che ne hanno bisogno. Attualmente sono due persone, entrambe membri del consiglio. Sviluppatori, volontari e altri membri del consiglio non sono autorizzati ad accedere ai server di produzione.

## Informativa sulla privacy {#privacy-policy}

I tuoi dati sono tuoi e non verranno mai venduti a terze parti. Puoi leggere l'informativa completa sulla privacy [qui](https://churchapps.org/privacy).

## Conformità al GDPR {#gdpr-compliance}

ChurchApps supporta la conformità al GDPR per le chiese con membri nel Regno Unito o nell'Unione Europea. Ecco come affrontiamo i requisiti principali:

### Diritti dell'interessato {#data-subject-rights}

ChurchApps fornisce strumenti per aiutare le chiese a rispondere alle richieste degli interessati:

- **Diritto di accesso (Articolo 15)** — I membri possono chiedere una copia dei propri dati personali contattando la chiesa. Gli amministratori possono esportare i dati di qualsiasi persona con **Esporta dati** nella scheda della persona, oppure dalla sezione **Gestione dati** del modulo di modifica della persona, in B1.church Admin.
- **Diritto alla cancellazione (Articolo 17)** — I membri possono chiedere da soli l'eliminazione del proprio account dalla pagina del Profilo (vedi [Gestire le richieste di eliminazione dell'account](../profile/account-deletion.md)), oppure contattando direttamente la chiesa. Gli amministratori possono anche anonimizzare i dati di una persona in tutti i moduli dalla sezione **Gestione dati** nella pagina di dettaglio della persona. L'anonimizzazione sostituisce le informazioni personali con valori generici, conservando però i dati aggregati (totali delle donazioni, conteggi delle presenze) necessari per la rendicontazione finanziaria della chiesa.
- **Diritto di limitazione (Articolo 18)** — I membri possono chiedere la limitazione del trattamento contattando la chiesa, anche revocando il consenso alle comunicazioni.
- **Diritto alla portabilità dei dati (Articolo 20)** — Gli amministratori possono esportare i dati personali in un formato JSON strutturato e leggibile da una macchina, per conto dei membri che lo richiedono.

### Usare gli strumenti di gestione dei dati {#using-the-data-management-tools}

Per accedere agli strumenti GDPR per una singola persona:

1. Vai su **Persone** in B1 Admin e apri la scheda della persona.
2. Fai clic su **Modifica** per entrare in modalità di modifica.
3. Scorri fino alla sezione **Gestione dati** (chiusa per impostazione predefinita) e fai clic per espanderla.
4. Usa **Esporta dati** per scaricare un file JSON con tutti i dati conservati per quella persona. (Lo stesso collegamento **Esporta dati** è anche tra le azioni sotto il nome della persona, senza bisogno di aprire il modulo di modifica.)
5. Usa **Anonimizza** per sostituire le informazioni personali con valori generici. Ti verrà chiesto di digitare `ANONYMIZE` per confermare — questa azione non può essere annullata.

:::warning
L'anonimizzazione è permanente. I totali delle donazioni e i conteggi delle presenze vengono conservati a fini di rendicontazione finanziaria, ma tutti gli identificativi personali (nome, email, indirizzo e così via) vengono rimossi e non possono essere recuperati.
:::

### Trattamento dei dati {#data-processing}

ChurchApps agisce come **responsabile del trattamento** per conto della tua chiesa (il **titolare del trattamento**). Il nostro [Accordo sul trattamento dei dati](https://churchapps.org/terms) descrive le responsabilità di ciascuna parte, incluso l'utilizzo di sub-responsabili, le procedure di notifica delle violazioni e il trattamento dei dati alla cessazione del servizio.

### Trasferimenti internazionali di dati {#international-data-transfers}

I dati di ChurchApps sono ospitati su Amazon Web Services (AWS) negli Stati Uniti. I trasferimenti internazionali di dati dal Regno Unito/UE sono coperti dalle Clausole contrattuali standard (SCC) di AWS, previste dal [Data Processing Addendum di AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Il DPA di AWS è automaticamente incorporato nei Termini di servizio AWS per tutti i clienti. Un hosting con sede nell'UE non è richiesto quando sono in vigore meccanismi di trasferimento appropriati come le SCC.

Per i dettagli su come sono stati valutati i rischi del trasferimento, vedi la [Valutazione del rischio di trasferimento](./transfer-risk-assessment.md).

### Sub-responsabili {#sub-processors}

- **Amazon Web Services (AWS)** — Hosting dell'infrastruttura, archiviazione dei dati e distribuzione dei contenuti
- **Stripe** — Elaborazione dei pagamenti per le donazioni (ChurchApps non conserva alcun dato di carte)

:::info
Per tutti i dettagli su come trattiamo i dati personali, consulta la nostra [Informativa sulla privacy](https://churchapps.org/privacy) e i [Termini di servizio](https://churchapps.org/terms). Per domande sulla conformità al GDPR, scrivi a support@churchapps.org.
:::
