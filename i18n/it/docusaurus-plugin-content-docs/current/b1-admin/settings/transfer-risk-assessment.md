---
title: "Valutazione del Rischio di Trasferimento"
---

# Valutazione del Rischio di Trasferimento

<div class="article-intro">

Questo documento registra la valutazione di ChurchApps dei rischi associati ai trasferimenti internazionali di dati personali dal Regno Unito/SEE agli Stati Uniti, come richiesto dal GDPR del Regno Unito e dal GDPR dell'UE. Questo è un record di conformità interno mantenuto da ChurchApps come responsabile del trattamento.

</div>

**Ultima revisione:** Aprile 2026

## 1. Dettagli del Trasferimento

| Elemento | Dettagli |
|---|---|
| **Esportatore di Dati** | Chiese che utilizzano ChurchApps (Responsabili del Trattamento) situate nel Regno Unito/SEE |
| **Importatore di Dati** | ChurchApps (Responsabile del Trattamento), operante dagli Stati Uniti |
| **Categorie di Interessati** | Membri della chiesa, partecipanti, visitatori, donatori, volontari, bambini (gestiti da genitori/amministratori) |
| **Categorie di Dati Personali** | Nomi, indirizzi email, numeri di telefono, indirizzi postali, date di nascita, genere, stato civile, foto del profilo, record di donazioni, record di partecipazione, appartenenze a gruppi, incarichi di volontari, cronologia dei messaggi |
| **Dati Sensibili** | Nessuno intenzionalmente raccolto. Nessun dato sulla salute, dati biometrici o record criminali vengono archiviati. I dettagli dei conti finanziari (carte di credito, conti bancari) non vengono mai archiviati da ChurchApps — questi sono gestiti direttamente da Stripe. |
| **Scopo del Trasferimento** | Fornitura di servizi software di gestione della chiesa (gestione dei membri, donazioni, tracciamento della partecipazione, comunicazioni, pianificazione dei volontari, registrazione degli eventi) |
| **Paese di Destinazione** | Stati Uniti |
| **Meccanismo di Trasferimento** | Clausole Contrattuali Standard dell'UE (SCC) e Allegato di Trasferimento Dati Internazionale del Regno Unito (IDTA), incorporati tramite l'Addendum di Elaborazione Dati di AWS |

## 2. Sub-Responsabili del Trattamento

| Sub-Responsabile | Ruolo | Ubicazione | Meccanismo di Trasferimento |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hosting dell'infrastruttura, archiviazione dei dati, consegna dei contenuti (regione us-east-2) | Stati Uniti | AWS DPA con SCC (automaticamente incluso nei Termini di Servizio di AWS) |
| **Stripe** | Elaborazione dei pagamenti per le donazioni | Stati Uniti | Stripe DPA con SCC |

I dati delle carte di credito e dei conti bancari vengono trasmessi direttamente dal browser dell'utente a Stripe e non vengono mai archiviati o trasmessi tramite i server di ChurchApps.

## 3. Valutazione del Rischio

### 3.1 Crittografia

- **In transito:** Tutti i dati sono crittografati utilizzando TLS/HTTPS per tutte le comunicazioni tra gli utenti e i server di ChurchApps.
- **A riposo:** I dati archiviati su AWS sono crittografati a riposo utilizzando la crittografia gestita da AWS.

### 3.2 Controlli di Accesso

- L'accesso ai server di produzione è limitato a due individui che sono membri del consiglio di amministrazione di ChurchApps.
- Gli sviluppatori, i volontari e gli altri membri del consiglio di amministrazione non hanno accesso ai server di produzione o ai database.
- I server dei database si trovano dietro un firewall e non sono direttamente accessibili da Internet.
- I dati della chiesa sono logicamente separati — ogni chiesa può accedere solo ai propri dati tramite controlli di accesso a livello di applicazione.

### 3.3 Segregazione dei Dati

I dati sono distribuiti su sei database indipendenti (Membership, Giving, Attendance, Messaging, Doing, Content). Il compromesso di un database non espone i dati degli altri. Ad esempio, il database Giving contiene importi e date di donazione ma non i nomi o le informazioni di contatto dei donatori (archiviati in Membership).

### 3.4 Minimizzazione dei Dati

- Nessuna informazione su carta di credito o conto bancario viene archiviata (gestita da Stripe).
- Le password vengono archiviate utilizzando l'hashing unidirezionale e non possono essere recuperate.
- Le chiese controllano quali dati raccolgono dai loro membri.

### 3.5 Diritti degli Interessati

ChurchApps fornisce strumenti tecnici che consentono alle chiese di adempiere alle richieste degli interessati:

- **Accesso e Portabilità:** Esportazione completa dei dati in formato JSON leggibile da macchina.
- **Cancellazione:** Anonimizzazione su tutti e sei i database, sostituendo i dati personali con valori generici mentre si preservano i record aggregati necessari per la rendicontazione finanziaria.
- **Restrizione:** Lo stato di adesione inattivo esclude gli individui dalla ricerca, dalla directory, dai rapporti e dal messaging mantenendo il loro record.
- **Rettifica:** I membri e gli amministratori possono modificare le informazioni personali tramite l'applicazione.

### 3.6 Notifica di Violazione

ChurchApps si impegna a notificare le chiese interessate entro 72 ore dal momento in cui viene a conoscenza di una violazione di dati personali, come documentato nei [Termini di Servizio](https://churchapps.org/terms) (Sezione 11.6).

### 3.7 Rischio di Accesso del Governo Statunitense

Il rischio principale associato ai dati ospitati negli Stati Uniti è il potenziale accesso da parte delle autorità governative statunitensi secondo la Sezione 702 del FISA o l'Ordine Esecutivo 12333. Questo rischio è valutato come **basso** per le seguenti ragioni:

- ChurchApps elabora dati di adesione e partecipazione della chiesa, non dati di valore di intelligence.
- Gli interessati sono membri della chiesa e partecipanti — non categorie tipicamente prese di mira dai programmi di sorveglianza.
- Nessun dato personale sensibile (salute, conti finanziari, opinioni politiche) viene archiviato.
- Il DPA di AWS include impegni riguardanti le richieste di accesso del governo e la rendicontazione sulla trasparenza.
- Il Quadro sulla Privacy dei Dati UE-USA (stabilito nel 2023) fornisce ulteriori salvaguardie per i trasferimenti di dati verso organizzazioni statunitensi certificate.

## 4. Conclusione Complessiva del Rischio

Il rischio per gli interessati da questo trasferimento internazionale è valutato come **basso**. La combinazione di:

- Clausole Contrattuali Standard come meccanismo di trasferimento legale
- Crittografia in transito e a riposo
- Rigidi controlli di accesso con solo due individui autorizzati
- Segregazione dei dati su database indipendenti
- Nessun archiviazione di dettagli dei conti finanziari
- Bassa sensibilità e basso valore di intelligence dei dati elaborati
- Strumenti tecnici per esercitare tutti i diritti degli interessati

fornisce misure supplementari adeguate per garantire che i dati trasferiti ricevano un livello di protezione essenzialmente equivalente a quello garantito all'interno del Regno Unito/SEE.

## 5. Calendario di Revisione

Questa valutazione sarà rivista annualmente o quando vi è una modifica significativa al trattamento dei dati, ai sub-responsabili o al quadro legale che disciplina i trasferimenti internazionali di dati.
