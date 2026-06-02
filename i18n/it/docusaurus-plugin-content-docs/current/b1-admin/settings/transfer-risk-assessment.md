---
title: "Valutazione dei Rischi di Trasferimento"
---

# Valutazione dei Rischi di Trasferimento

<div class="article-intro">

Questo documento registra la valutazione dei rischi di ChurchApps associati ai trasferimenti internazionali di dati personali dal Regno Unito/SEE agli Stati Uniti, come richiesto da UK GDPR e EU GDPR. Questo è un record di conformità interno mantenuto da ChurchApps come data processor.

</div>

**Ultimo esame:** Aprile 2026

## 1. Dettagli del Trasferimento

| Elemento | Dettagli |
|---|---|
| **Data Exporter** | Chiese che utilizzano ChurchApps (Data Controllers) situate nel Regno Unito/SEE |
| **Data Importer** | ChurchApps (Data Processor), operante dagli Stati Uniti |
| **Categorie di Data Subjects** | Membri della chiesa, partecipanti, visitatori, donatori, volontari, bambini (gestiti da genitori/amministratori) |
| **Categorie di Dati Personali** | Nomi, indirizzi email, numeri di telefono, indirizzi postali, date di nascita, genere, stato matrimoniale, foto di profilo, record di donazione, record di presenza, iscrizioni ai gruppi, assegnazioni di volontari, cronologia dei messaggi |
| **Dati Sensibili** | Nessuno intenzionalmente raccolto. Nessun dato sanitario, dati biometrici o record penali sono archiviati. I dettagli degli account finanziari (carte di credito, conti bancari) non vengono mai archiviati da ChurchApps — questi vengono gestiti direttamente da Stripe. |
| **Scopo del Trasferimento** | Fornitura di servizi di software di gestione della chiesa (gestione dei membri, donazioni, tracciamento della presenza, comunicazioni, pianificazione del volontariato, registrazione agli eventi) |
| **Paese di Destinazione** | Stati Uniti |
| **Meccanismo di Trasferimento** | Clausole Contrattuali Standard dell'UE (SCC) e Addendum Internazionale di Trasferimento di Dati del Regno Unito (IDTA), incorporate tramite l'Addendum di Elaborazione Dati di AWS |

## 2. Sub-Processor

| Sub-Processor | Ruolo | Posizione | Meccanismo di Trasferimento |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hosting dell'infrastruttura, archiviazione dati, distribuzione di contenuti (regione us-east-2) | Stati Uniti | AWS DPA con SCC (automaticamente incluso nei Termini di Servizio di AWS) |
| **Stripe** | Elaborazione dei pagamenti per le donazioni | Stati Uniti | Stripe DPA con SCC |

I dati della carta di credito e del conto bancario vengono trasmessi direttamente dal browser dell'utente a Stripe e non vengono mai archiviati su o trasmessi attraverso i server di ChurchApps.

## 3. Valutazione dei Rischi

### 3.1 Crittografia

- **In transito:** Tutti i dati vengono crittografati utilizzando TLS/HTTPS per tutte le comunicazioni tra gli utenti e i server di ChurchApps.
- **A riposo:** I dati archiviati su AWS vengono crittografati a riposo utilizzando la crittografia gestita da AWS.

### 3.2 Controlli di Accesso

- L'accesso al server di produzione è limitato a due individui che sono membri del consiglio di amministrazione di ChurchApps.
- Gli sviluppatori, i volontari e gli altri membri del consiglio di amministrazione non hanno accesso ai server di produzione o ai database.
- I server del database sono dietro un firewall e non sono direttamente accessibili da Internet.
- I dati della chiesa sono logicamente separati — ogni chiesa può accedere solo ai propri dati attraverso controlli di accesso a livello di applicazione.

### 3.3 Segregazione dei Dati

I dati sono distribuiti su sei database indipendenti (Membership, Giving, Attendance, Messaging, Doing, Content). La compromissione di un database non espone dati degli altri. Ad esempio, il database Giving contiene importi di donazione e date ma non i nomi o le informazioni di contatto dei donatori (archiviati in Membership).

### 3.4 Minimizzazione dei Dati

- Nessuna informazione sulla carta di credito o sul conto bancario viene archiviata (gestita da Stripe).
- Le password vengono archiviate utilizzando hash unidirezionale e non possono essere recuperate.
- Le chiese controllano quali dati raccolgono dai loro membri.

### 3.5 Diritti dei Data Subject

ChurchApps fornisce strumenti tecnici che consentono alle chiese di adempiere alle richieste dei data subject:

- **Accesso e Portabilità:** Esportazione completa dei dati in formato JSON leggibile da macchina.
- **Erasure:** Anonimizzazione in tutti e sei i database, sostituendo i dati personali con valori generici preservando i record aggregati richiesti per la segnalazione finanziaria.
- **Restrizione:** Lo stato di iscrizione inattivo esclude gli individui dalla ricerca, dalla directory, dai rapporti e dalla messaggistica mantenendo il loro record.
- **Rettifica:** I membri e gli amministratori possono modificare le informazioni personali attraverso l'applicazione.

### 3.6 Notifica di Violazione

ChurchApps si impegna a notificare alle chiese interessate entro 72 ore da quando è diventata consapevole di una violazione di dati personali, come documentato nei [Termini di Servizio](https://churchapps.org/terms) (Sezione 11.6).

### 3.7 Rischio di Accesso del Governo degli Stati Uniti

Il rischio principale associato ai dati ospitati negli Stati Uniti è il potenziale accesso da parte delle autorità governative statunitensi secondo FISA Section 702 o Executive Order 12333. Questo rischio è valutato come **basso** per le seguenti ragioni:

- ChurchApps elabora i dati di appartenenza e frequenza della chiesa, non dati di valore di intelligence.
- I data subject sono membri della chiesa e partecipanti — non categorie tipicamente mirate dai programmi di sorveglianza.
- Nessun dato personale sensibile (salute, conti finanziari, opinioni politiche) viene archiviato.
- L'accordo DPA di AWS include impegni riguardanti le richieste di accesso del governo e la segnalazione della trasparenza.
- Il Framework sulla Privacy dei Dati UE-USA (stabilito nel 2023) fornisce ulteriori salvaguardie per i trasferimenti di dati verso organizzazioni statunitensi certificate.

## 4. Conclusione Complessiva del Rischio

Il rischio per i data subject da questo trasferimento internazionale è valutato come **basso**. La combinazione di:

- Clausole Contrattuali Standard come meccanismo di trasferimento legale
- Crittografia in transito e a riposo
- Severi controlli di accesso con solo due individui autorizzati
- Segregazione dei dati tra database indipendenti
- Nessun archiviamento di dettagli di account finanziari
- Bassa sensibilità e basso valore di intelligence dei dati elaborati
- Strumenti tecnici per esercitare tutti i diritti dei data subject

fornisce misure supplementari adeguate per garantire che i dati trasferiti ricevano un livello di protezione essenzialmente equivalente a quello garantito all'interno del Regno Unito/SEE.

## 5. Programma di Esame

Questa valutazione sarà esaminata annualmente o quando ci sarà un cambiamento significativo all'elaborazione dei dati, ai sub-processor o al quadro legale che disciplina i trasferimenti internazionali di dati.
