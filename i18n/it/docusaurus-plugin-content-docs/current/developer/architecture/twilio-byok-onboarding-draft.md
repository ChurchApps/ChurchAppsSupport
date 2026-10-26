---
title: "Onboarding Twilio per la chiesa (bozza)"
description: "Bozza della configurazione Twilio di proprietà della chiesa in B1, indicazioni per la registrazione pubblica, esempi di campagna e lista di controllo per l'approvazione."
---

# Bozza di onboarding Twilio di proprietà della chiesa

:::caution Bozza per l'integrazione proposta
Questo è un flusso di lavoro proposto. B1 dispone ora di una scelta di base **Twilio** in **Impostazioni > Messaggi di testo** (SID dell'account, Auth Token, numero di invio e il webhook STOP in arrivo) -- vedi [Impostazioni della chiesa: Messaggi di testo](../../b1-admin/settings/church-settings.md#texting). I controlli aggiuntivi di configurazione di B1, la mappatura del consenso e i passaggi di convalida descritti di seguito sono requisiti per una release futura, non istruzioni per trovare impostazioni già esistenti. Leggi la [proposta tecnica](./twilio-byok-proposal) per ambito e dipendenze. Le fonti Twilio sono state verificate il 22 ottobre 2026; verifica i requisiti attuali prima di inviare una campagna.
:::

## La configurazione consigliata

La tua chiesa possiede il proprio account Twilio a pagamento, il numero di telefono, il Messaging Service, la fatturazione e la registrazione della campagna. B1 invierebbe tramite queste risorse usando credenziali inserite in privato nelle impostazioni della chiesa. Mantieni almeno due amministratori della chiesa idonei con accesso all'account Twilio, attiva la sicurezza dell'account e assegna una persona responsabile del consenso, delle risposte in arrivo e delle comunicazioni di rifiuto.

La prima release proposta copre un solo numero locale statunitense e un unico programma di messaggistica della chiesa, chiaramente descritto. Gli esempi qui sotto usano il programma fittizio **Grace Community Church** chiamato **Grace Church Updates** per le variazioni del servizio, i promemoria degli eventi e la programmazione dei volontari. Sostituisci ogni nome, dominio, frequenza, contatto e scopo con la pratica reale della chiesa. Questi sono esempi specifici di chiesa delle regole di Twilio, non una campagna preapprovata né una garanzia di approvazione.

## 1. Preparare l'esperienza pubblica di registrazione a B1

Pubblica sul sito web B1 della chiesa una pagina come `https://www.example.org/text-updates`, con un modulo pubblico B1 incorporato oppure un collegamento evidente al suo modulo pubblico autonomo. Pubblica anche `https://www.example.org/privacy` e `https://www.example.org/sms-terms`. Questi indirizzi sono segnaposto; invia gli URL reali e raggiungibili.

Per il modulo di registrazione SMS proposto:

| Impostazione | Configurazione consigliata |
|---|---|
| Accesso | Pubblico/senza restrizioni; attivo durante la revisione e per l'iscrizione continua; disponibile senza accesso |
| Modalità del modulo | Modalità standard inizialmente; la modalità conversazionale richiede il supporto esplicito al consenso descritto nella proposta tecnica |
| Cellulare | Chiaramente etichettato con il prefisso internazionale; obbligatorio solo quando si sceglie la registrazione SMS se usato all'interno di un modulo generale di contatto/evento |
| Scelta SMS | Casella di controllo separata e facoltativa, deselezionata per impostazione predefinita, associata al programma specifico e al campo cellulare |
| Informative | Visibili accanto alla scelta SMS: chiesa/programma, scopo e frequenza dei messaggi, eventuali tariffe, STOP, HELP, contatto di supporto e collegamenti cliccabili reali all'Informativa sulla privacy e ai Termini SMS |
| Altre azioni | Gli ospiti possono inviare la scheda di contatto, iscriversi a un evento o richiedere informazioni senza aderire agli SMS |
| Prove | Salva programma, numero esatto, consenso selezionato, invio di origine, ora del server e versione dell'informativa/policy; una semplice risposta a un modulo, da sola, oggi non iscrive nessuno |
| Automazione di persone/gruppi | Mantieni disattivate la creazione automatica di persone e l'assegnazione ai gruppi per un primo progetto pilota di registrazione, a meno che non siano state verificate le regole di corrispondenza esistenti della chiesa. L'assegnazione a un gruppo non è mai l'autorizzazione SMS. |
| Automazioni esistenti | Non iscrivere ogni mittente di modulo o membro di gruppo in un workflow di messaggistica. Solo la mappatura del consenso verificata e proposta può autorizzare quel programma. |
| Messaggio di ringraziamento | Conferma che il modulo è stato ricevuto senza affermare che l'iscrizione SMS è avvenuta quando la casella è stata rifiutata o la conferma/revisione è ancora in sospeso. |

Una casella di controllo esistente può illustrare il modulo, ma B1 necessita comunque del registro dei consensi e dei controlli di invio. L'attuale renderer condiviso mostra le descrizioni come testo semplice; scrivere Markdown o un URL lì non basta a garantire che i collegamenti alle policy siano cliccabili. L'implementazione deve fornire un controllo del consenso accessibile con collegamenti reali. Vedi [creare moduli B1](../../b1-admin/forms/creating-forms) e la [proposta tecnica](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio richiede un opt-in volontario e verificabile. Non abbinare gli SMS a termini di appartenenza obbligatori, permessi per email/telefono, consenso alle donazioni o iscrizioni a eventi. Un numero di cellulare su una scheda visitatore non è di per sé un consenso SMS. Vedi i [requisiti di consenso volontario](https://www.twilio.com/docs/api/errors/30923) di Twilio e le [raccomandazioni per le campagne](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Testo di esempio per la registrazione

Usalo solo dopo che la chiesa ha scelto i propri scopi, mittente e frequenza effettivi. La casella è facoltativa e parte deselezionata; i collegamenti alle policy qui sotto devono essere link nel modulo visualizzato.

> Sì, desidero che Grace Community Church mi scriva tramite Grace Church Updates per variazioni del servizio, eventi della chiesa e programmazione dei volontari dal numero [numero registrato della chiesa]. Aspettatevi al massimo 4 messaggi al mese. Possono essere applicate tariffe per messaggi e dati. Rispondi STOP per annullare l'iscrizione oppure HELP per assistenza. L'iscrizione agli SMS è facoltativa e non è necessaria per partecipare, iscriversi o donare. Consulta la nostra Informativa sulla privacy e i Termini SMS. Domande: [email o telefono di supporto della chiesa].

“Al massimo 4” è un impegno di esempio, non un limite prescritto da Twilio. Sostituiscilo con una frequenza che la chiesa possa rispettare davvero; se la frequenza varia, dichiaralo in modo veritiero e descrivi la cadenza prevista. Tieni gli appelli promozionali o gli ulteriori programmi di ministero al di fuori di questa casella, a meno che i loro scopi e il consenso non siano stati valutati separatamente.

Per un modulo generale di visitatori/eventi, l'invio con questa casella deselezionata deve comunque riuscire. Un modulo dedicato solo agli SMS può spiegare che selezionarla richiede l'iscrizione, ma non deve mai far dipendere dall'iscrizione i normali servizi della chiesa. Verifica il comportamento reale sia su telefono sia su desktop.

### Contenuto delle policy da preparare

La pagina sulla privacy della chiesa deve spiegare quali informazioni raccoglie per la messaggistica, come le usa e le protegge, e le sue pratiche di conservazione/contatto. Deve affermare chiaramente che i numeri di cellulare e i consensi alla messaggistica non vengono venduti né condivisi con terzi o affiliati per scopi di marketing o promozionali. Spiega in modo accurato il trattamento necessario da parte dei fornitori di servizi; non affermare che la chiesa non usa mai un responsabile del trattamento mentre usa B1 e Twilio. Le [indicazioni sulla privacy](https://www.twilio.com/docs/api/errors/30908) e le [raccomandazioni per le campagne](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) di Twilio sono il riferimento per questa distinzione.

I Termini SMS devono identificare la chiesa e il programma, gli scopi, la frequenza effettiva, le possibili tariffe di messaggistica, le istruzioni STOP/HELP, il contatto di supporto e il collegamento alla privacy; includi le informative aggiuntive richieste dalla revisione attuale di Twilio. I collegamenti alle policy della pagina di opt-in devono corrispondere esattamente agli URL inviati nella campagna. Dal 30 giugno 2026, Twilio richiede URL pubblici dedicati per l'informativa sulla privacy e i termini per le nuove registrazioni di campagne via API; anche il suo flusso della Console li raccoglie. [Requisito Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Sono requisiti di contenuto da applicare alle policy reali della chiesa, non un sostituto delle sue pratiche sulla privacy già esistenti né una policy generica da incollare senza verificarla.

## 2. Registrare la chiesa e il suo programma di messaggistica in Twilio

1. Crea o usa un **account a pagamento di proprietà della chiesa** e un numero locale statunitense abilitato agli SMS. Usa in modo coerente la ragione sociale della chiesa, il codice fiscale/EIN e i dati di registrazione dell'attività, l'indirizzo, il sito web e il rappresentante autorizzato. Non sostituire l'identità di ChurchApps o di un'altra chiesa.
2. Segui il flusso di registrazione del **Brand** per cliente diretto di Twilio, per il tipo di entità effettivo della chiesa. Per un ente non profit idoneo, usa le [indicazioni per la registrazione non profit](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). I casi d'uso per enti di beneficenza/501(c)(3) dipendono dall'idoneità; il solo nome di una chiesa non stabilisce un'approvazione o un'esenzione da parte di Twilio.
3. Crea un Messaging Service dedicato e invia la campagna A2P 10DLC pertinente. Scegli il caso d'uso che corrisponde in modo veritiero ai messaggi reali e alle opzioni disponibili per quel Brand approvato; gli esempi qui non prescrivono un codice di caso d'uso universale per le chiese.
4. Fornisci l'URL pubblico di registrazione, gli URL delle policy, la descrizione completa del flusso di opt-in/messaggi e i messaggi di esempio richiesti. Includi ogni metodo di registrazione reale; imposta le dichiarazioni relative a link incorporati/numeri di telefono in modo che corrispondano al contenuto effettivo. Non elencare l'iscrizione tramite parole chiave o il doppio opt-in a meno che quel flusso non esista ed sia stato testato.
5. Associa il numero di invio al servizio e alla campagna approvata. Attendi sia la verifica della campagna **sia il completamento della registrazione del numero** prima di inviare messaggi.

Mantieni questi passaggi nella Console Twilio della chiesa. L'integrazione B1 proposta non invia registrazioni per conto delle chiese. La [guida rapida alla registrazione](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) e la [risorsa campagna](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) di Twilio spiegano i campi di registrazione e lo stato. Un numero in attesa può ancora bloccare l'invio anche dopo l'approvazione della campagna. [Registrazione del numero](https://www.twilio.com/docs/api/errors/30035)

### Esempio di descrizione della campagna

> Grace Community Church usa Grace Church Updates per inviare variazioni dell'orario delle funzioni, promemoria per gli eventi della chiesa e avvisi di programmazione dei volontari alle persone che scelgono questo programma sul nostro sito web pubblico. Non inviamo più di quattro messaggi al mese nell'ambito di questo programma. I destinatari possono interrompere questi messaggi in qualsiasi momento. Questo programma non include contatti acquistati, promozioni di terzi o appelli per raccolte fondi.

Questo esempio è adatto solo a una chiesa che rispetti davvero quei limiti ed esclusioni. Se i soli promemoria per i volontari superano la frequenza promessa, modifica il disegno del programma e l'informativa prima dell'invio.

### Esempio di descrizione del flusso di messaggi

> I visitatori aprono [URL reale di registrazione della chiesa], inseriscono il loro numero di cellulare e selezionano in modo indipendente la casella facoltativa Grace Church Updates. La casella è deselezionata all'apertura del modulo. L'informativa indica Grace Community Church, descrive variazioni del servizio, promemoria degli eventi e programmazione dei volontari, indica il limite mensile e le possibili tariffe, e spiega STOP e HELP. L'Informativa sulla privacy e i Termini SMS visualizzati rimandano a [URL reale della privacy] e [URL reale dei Termini SMS]. Rifiutare gli SMS non impedisce la partecipazione, l'iscrizione agli eventi, le donazioni o l'uso del modulo generale di contatto. B1 registra la selezione affermativa, il numero di telefono, l'ora dell'invio e la versione dell'informativa. Inviamo questo programma solo ai sottoscrittori così documentati e sopprimiamo le revoche prima di ulteriori invii.

Adatta questo paragrafo al flusso implementato. Se si usa una conferma telefonica o una revisione da parte dello staff, descrivi lo stato in sospeso e il passaggio di attivazione esatto. Se si usano altri metodi, includi ciascuno e le relative prove. Se l'iscrizione avviene dietro un login o su carta, Twilio chiede prove pubbliche e oscurate dell'esperienza di opt-in reale; non esporre mai moduli compilati o dati dei membri. [Indicazioni sull'opt-in verificabile](https://www.twilio.com/docs/api/errors/30923)

### Esempi di messaggi in uscita

Sono campioni fittizi da adattare; usa URL reali della chiesa e sostituisci i valori tra parentesi quadre prima dell'invio. L'API delle campagne di Twilio accetta da due a cinque campioni. I campioni devono identificare la chiesa, riflettere lo scopo dichiarato e includere un'istruzione per l'annullamento dell'iscrizione. [Campi dei campioni di campagna](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunday's service will start at [time] due to [reason]. Details: [church website URL]. Reply STOP to end texts.
```

```text
Grace Community Church: A reminder that [church event] is on [date] at [time]. Information: [church event URL]. Reply STOP to end texts.
```

```text
Grace Community Church: You are scheduled to serve on [team] this [day]. Please review your plan: [B1 church portal URL]. Reply STOP to end texts.
```

Gli URL tra parentesi quadre descrivono variabili di esempio; gli esempi inviati devono mostrare il dominio reale della chiesa e lo stile di link effettivo. Un collegamento a un piano potrebbe richiedere l'accesso, ma la pagina di registrazione e le policy usate per la verifica devono essere consultabili pubblicamente. Non includere note private, informazioni sui bambini o dettagli identificativi dei membri nei campioni per l'approvazione. Mantieni il contenuto dei campioni coerente con ciò che inviano realmente i modelli di B1; non promettere una casella di posta per le risposte né un particolare comportamento dei promemoria non disponibile.

### Risposte a STOP, START e HELP

Usa Twilio Messaging Service Advanced Opt-Out per queste conferme e personalizza l'identità di chiesa/programma e i dati di supporto. Esempio di intento della risposta:

- **STOP:** Conferma che Grace Church Updates ha interrotto l'invio e spiega il modo supportato per riprendere.
- **START:** Conferma la ripresa dello stesso programma, incluse identità, cadenza/tariffe e istruzioni di aiuto/annullamento come richiesto dal flusso configurato.
- **HELP:** Identifica Grace Community Church e fornisci il contatto di supporto reale e le istruzioni per annullare l'iscrizione.

Non inviare una seconda conferma B1 quando Twilio ha già risposto. Una risposta HELP non equivale a un'iscrizione. START non deve iscrivere nessuno a ulteriori programmi della chiesa né renderli visibili nella rubrica dei membri. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Verificare il pacchetto di approvazione prima dell'invio

- [ ] Le informazioni legali/di Brand reali della chiesa, l'identità del sito web e lo scopo della campagna coincidono.
- [ ] La pagina di registrazione e il modulo attivo si aprono senza login in una finestra di navigazione privata, anche da dispositivo mobile.
- [ ] La casella SMS è deselezionata all'avvio e può essere rifiutata mentre si completa l'azione principale del visitatore/evento.
- [ ] Scopo del programma, mittente, frequenza effettiva, eventuali costi, STOP, HELP, contatto di supporto e collegamenti cliccabili alle policy compaiono accanto alla scelta SMS.
- [ ] Gli URL esatti di privacy/termini forniti a Twilio sono pubblici, funzionano senza credenziali e identificano la stessa chiesa/programma. Il contenuto della policy corrisponde al trattamento effettivo.
- [ ] Ogni messaggio di esempio corrisponde al programma, all'identità reale del mittente e al comportamento previsto di link/numero di telefono. La campagna descrive ogni metodo di opt-in reale.
- [ ] Le schermate oscurate mostrano il modulo vuoto, la casella/le informative e i collegamenti alle policy così come li vedranno i revisori. Le prove non contengono record di membri o chiavi.
- [ ] La chiesa dispone di un modo operativo per conservare le prove del consenso e rispettare le revoche prima dell'invio, incluse le richieste ricevute per telefono/email.

Questi controlli riducono le discrepanze evitabili; la decisione di approvazione spetta a Twilio e ai suoi partner di revisione. Mantieni disponibili l'URL reale della registrazione e le URL delle policy anche dopo l'approvazione, non solo durante la revisione.

## 4. Collegare e convalidare la futura integrazione B1

Dopo il rilascio dell'integrazione, la configurazione proposta dei Messaggi di testo dovrebbe raccogliere lo SID dell'account della chiesa, la coppia API Key SID/secret dedicata, l'Auth Token separato del webhook, lo SID del Messaging Service e il mittente selezionato. Crea le chiavi solo nella Console della chiesa e inserisci i segreti solo nelle impostazioni private di B1. [Indicazioni sulle chiavi API di Twilio](https://www.twilio.com/docs/iam/api-keys)

Copia negli elementi di configurazione Twilio corrispondenti gli URL dei webhook in arrivo e dello stato di consegna della chiesa forniti da B1. Attiva Advanced Opt-Out e verifica che i messaggi in arrivo raggiungano il webhook configurato. B1 dovrebbe mostrare controlli separati per le credenziali, la proprietà del servizio/mittente, la campagna verificata, la registrazione del numero completata, la verifica dei messaggi in arrivo e il messaggio di prova consegnato. Una credenziale salvata o una richiesta API accettata non equivalgono alla consegna finale.

Se B1 non può verificare programmaticamente un segnale di registrazione, conferma direttamente nella Console; l'interfaccia deve etichettare il risultato datato come confermato dall'amministratore. Risolvi lo stato in sospeso/fallito prima di attivare i messaggi in produzione. Usa un test separato, esplicitamente richiesto, verso un destinatario di prova adulto che abbia dato il consenso, poi:

1. Verifica che una registrazione documentata corrispondente crei il corretto record di consenso telefono/programma; il rifiuto o un cambio di telefono non devono iscrivere in silenzio un destinatario.
2. Invia un messaggio di prova, conferma la ricezione e confronta lo stato in B1 con lo Message SID di Twilio e l'esito della consegna.
3. Rispondi STOP e verifica che messaggi manuali, messaggi di gruppo, workflow e promemoria saltino quel telefono. La visibilità nella rubrica non deve cambiare.
4. Esegui il flusso di nuova iscrizione allo stesso programma documentato e la risposta HELP; verifica che non ci siano conferme duplicate né modifiche non correlate alle preferenze.

## 5. Mantenere il programma

Designa un responsabile della chiesa che monitori stato della campagna/dell'account, avvisi su saldo e fatturazione, errori di invio e risposte in arrivo in Twilio. La prima release proposta di B1 non ha una casella di posta SMS conversazionale, quindi pubblica e controlla un contatto di aiuto reale e verifica le risposte, senza dare per scontato che lo staff le veda in B1.

Conserva lo storico dei consensi e delle revoche, le versioni correnti di informativa/policy, gli identificativi della campagna e le prove di approvazione oscurate in registri controllati dalla chiesa. Non incollare mai chiavi o elenchi di destinatari in ticket di supporto pubblici. Quando cambiano un numero, un servizio, le credenziali, il flusso di registrazione, la frequenza o lo scopo, ricontrolla l'integrazione e aggiorna registrazione/consenso dove richiesto prima di riprendere. Verifica con attenzione i numeri di famiglia condivisi e i numeri cambiati; l'idoneità segue il telefono consenziente e il programma, non il record di ogni membro della famiglia.

In caso di rifiuto, leggi il messaggio d'errore effettivo di Twilio, correggi la specifica incoerenza sia nel sito web sia nell'invio, e ripresenta tramite la Console della chiesa. Per mittenti non registrati o in sospeso, attendi il completamento della registrazione invece di cambiare numero per aggirarla. Usa la [guida alla risoluzione dei problemi di registrazione di Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) e il riferimento ai codici d'errore forniti. Non promettere tempi di risposta fissi.
