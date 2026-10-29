---
title: "Flussi di lavoro"
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro fanno avanzare le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una scheda che si sposta da un passaggio al successivo -- da un follow-up per un ospite che viene per la prima volta, a un processo di adesione, a un ringraziamento per chi dona per la prima volta, e a qualsiasi altra situazione in cui devi seguire molte persone attraverso le stesse fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una telefonata, avere una conversazione) **e** eseguire da solo azioni automatiche -- inviare un'email o un SMS, attendere alcuni giorni, aggiungere la persona a un gruppo -- così i flussi di lavoro gestiscono sia il follow-up umano sia le attività ripetitive che lo circondano. I flussi di lavoro estendono le [Attività](./tasks.md) in una bacheca Kanban con trascinamento, in modo che nulla e nessuno venga trascurato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che vuoi seguire esistano in B1 Admin
- Familiarizza con il funzionamento delle [Attività](./tasks.md), perché ogni scheda su una bacheca è un'attività
- Per usare l'azione **Invia email**, crea prima i modelli email che vuoi inviare (gestiti in **Impostazioni → Modelli email**)
- Per usare l'azione **Invia SMS**, collega prima un [provider SMS](../settings/church-settings.md#texting)
- Ti serve l'autorizzazione appropriata per le Attività. Visualizzare, modificare le schede e gestire i flussi di lavoro sono livelli di autorizzazione separati (vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md))

</div>

## Visualizzare i flussi di lavoro

Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Servizio** e fai clic su **Flussi di lavoro**. I tuoi flussi di lavoro sono elencati in una tabella che mostra la **Categoria** e lo **Stato** (**Attivo** o **Inattivo**) di ciascuno. Se usi le categorie, le schede sopra l'elenco ti permettono di filtrarlo per categoria. Fai clic su un flusso di lavoro per aprire la sua bacheca.

## Creare un flusso di lavoro

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso vuoto** -- parti da zero e costruisci i tuoi passaggi.
   - **Da un modello** -- parti da un insieme di passaggi già pronti che puoi modificare. I modelli integrati includono:
     - **Follow-up nuovo visitatore** -- Invia email di benvenuto → Telefonata personale → Invito al passo successivo → Connesso
     - **Corso di adesione** -- Esprimi interesse → Iscriviti al corso → Partecipa al corso → Completa l'adesione
     - **Ringraziamento per chi dona per la prima volta** -- Invia biglietto di ringraziamento → Condividi l'impatto della donazione → Amministrato
     - **Conferma assegnazione di servizio** -- Richiedi e attendi risposta → Chiama il volontario per la richiesta senza risposta (vedi [Conferme delle assegnazioni di servizio](#serving-assignment-confirmations))

   Costruire i passaggi di un modello può richiedere un momento. Mentre lavora, il pulsante **Aggiungi flusso di lavoro** riporta **Creazione in corso...** e non può essere cliccato di nuovo, così non creerai un duplicato. Se qualcosa va storto, la pagina mostra il messaggio *"Impossibile creare il flusso di lavoro. Riprova."*
3. Assegna al flusso di lavoro un **Nome**.
4. Facoltativamente, assegna una **Categoria** per raggruppare insieme flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
   Per un flusso vuoto, scegli anche la sua **Finalità del flusso di lavoro**: **Follow-up persone** (il tipo abituale) oppure **Conferma assegnazione di servizio**. La finalità non può essere modificata dopo la creazione del flusso di lavoro.
5. Lascia il flusso di lavoro **Attivo** in modo che si possano aggiungere persone, oppure impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta ai flussi di lavoro.
6. Fai clic su **Salva**.

:::tip
Usa il pulsante **Duplica** nell'elenco dei Flussi di lavoro per copiare un flusso di lavoro esistente -- inclusi i suoi passaggi, le azioni automatiche e l'instradamento -- come punto di partenza per un nuovo flusso.
:::

## Costruire la bacheca con i passaggi

Ogni bacheca di un flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Aggiungi passaggio** per creare ciascuna fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Nome passaggio** -- l'intestazione della colonna (ad esempio "Chiamata di benvenuto" o "In attesa di iscrizione").
- **Scadenza tra (giorni)** -- imposta automaticamente una data di scadenza quando una scheda entra in questo passaggio. Le schede oltre la data di scadenza vengono contrassegnate come **Scaduto**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui vengono assegnate automaticamente le nuove schede di questo passaggio. Quando l'assegnatario predefinito è una persona, riceve una notifica che una scheda le è stata assegnata.
- **Azioni automatiche** -- cose che il sistema fa da solo quando una scheda arriva (vedi sotto).
- **Instradamento** -- dove va la scheda quando lascia il passaggio (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una scheda segue quando non si applica nessun altro instradamento.

:::info
Salva prima un nuovo passaggio. Le azioni automatiche e l'instradamento sono collegati al passaggio, quindi l'editor sblocca queste sezioni solo quando il passaggio esiste.
:::

## Azioni automatiche

Ogni passaggio può contenere un elenco di **azioni automatiche** che vengono eseguite da sole nel momento in cui una scheda **entra** nel passaggio -- prima che qualcuno la tocchi. È così che un passaggio sollecita un volontario *e* si occupa del lavoro di routine che circonda il follow-up.

Nell'editor del passaggio, apri **Azioni automatiche**, fai clic su **Aggiungi azione**, scegli un tipo e compila le sue impostazioni. Aggiungine quante ne servono; vengono eseguite **dall'alto verso il basso, in ordine**. Fai clic su **Salva** nel passaggio per salvare il passaggio e tutte le sue azioni insieme. Rimuovere un'azione con la sua icona del cestino ha effetto immediato.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia alla persona un modello email a tua scelta. Puoi sostituire l'oggetto. |
| **Invia SMS** | Invia alla persona un messaggio che scrivi, tramite il [provider SMS](../settings/church-settings.md#texting) della tua chiesa. |
| **Attendi** | Mette in pausa la scheda per un certo numero di giorni prima di proseguire (vedi sotto). |
| **Aggiungi al gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Rimuovi dal gruppo** | Rimuove la persona da un gruppo che scegli. |
| **Registra presenza** | Segna la persona come presente al turno di servizio di un gruppo in corso (vedi sotto). |
| **Aggiungi a flusso di lavoro** | Avvia la persona su un altro flusso di lavoro -- utile per passare la persona da un processo all'altro. |
| **Aggiungi nota** | Registra una nota nella cronologia della scheda. |
| **Imposta campo** | Aggiorna un campo nella scheda della persona: Stato di appartenenza, Stato civile, Genere, Città, Provincia o CAP. |
| **Webhook** | Invia i dettagli della scheda a un indirizzo web esterno (URL) che fornisci, per collegarsi ad altri sistemi. |
| **Crea attività** | Crea un'[attività](./tasks.md) con il titolo e la descrizione che inserisci, assegnata alla persona che scegli. |
| **Notifica persona** | Invia a un membro dello staff o a un volontario che scegli un'email e una notifica B1 sulla scheda (vedi sotto). |

Dopo che tutte le azioni di un passaggio sono terminate, la scheda **resta su quel passaggio** in modo che una persona possa lavorarci -- a meno che il passaggio non abbia un instradamento automatico che la sposta avanti (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatiche vengono eseguite solo quando una scheda arriva tramite il flusso normale -- quando viene aggiunta per la prima volta, quando un esito o un instradamento automatico la porta lì, o dopo che un'attesa è terminata. **Non** vengono rieseguite quando un membro dello staff trascina manualmente una scheda sul passaggio o la rimanda indietro, così una persona non riceve due volte la stessa email.
:::

### Invio di email

Scegli **Invia email**, seleziona uno dei tuoi modelli email e, facoltativamente, digita un oggetto personalizzato. Quando una scheda entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email registrato, il passaggio salta semplicemente questa azione.) I [campi di unione](../settings/email-templates.md#merge-fields) nel modello, come `{{firstName}}`, vengono sostituiti con i dati della persona stessa.

Quando l'email viene inviata, la cronologia della scheda registra **Email inviata**. Se non può essere inviata -- ad esempio perché l'email della tua chiesa non è ancora approvata o perché è stato raggiunto il limite giornaliero -- non viene aggiunta alcuna voce "Email inviata".

:::info
Le email dei flussi di lavoro vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano nel limite giornaliero di email della tua chiesa. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). L'azione **Invia email** ti avvisa nell'editor del passaggio quando queste email non verranno inviate: *"L'email della tua chiesa non è ancora stata approvata..."* se l'approvazione è ancora in attesa, oppure *"L'email della tua chiesa è in pausa..."* se di recente sono stati respinti dei messaggi o sono stati segnalati come spam.
:::

### Registrare la presenza

Scegli **Registra presenza** e fai clic su **Scegli gruppo** per selezionare il gruppo di cui registrare la presenza. Quando l'azione viene eseguita, la persona viene segnata come presente per il turno di servizio di quel gruppo che è in corso -- esattamente come se avesse fatto il check-in. È utile con un trigger che aggiunge le persone al flusso di lavoro man mano che arrivano, così vengono conteggiate senza un check-in separato.

- La presenza viene misurata nel momento in cui la scheda è stata **creata**, quindi un'**Attesa** precedente nel flusso di lavoro non la sposta oltre il servizio.
- Contano solo i turni di servizio con un giorno e un orario di inizio. Se nessuno dei turni del gruppo è in corso in quel momento, non viene registrato nulla e la cronologia della scheda riporta **Nessun servizio programmato in corso -- presenza non registrata**.
- Quando la presenza viene registrata, la cronologia della scheda mostra **Presenza registrata** seguito dal nome del gruppo. Eseguire di nuovo l'azione per lo stesso servizio non conta due volte la persona.

### Notificare una persona

Scegli **Notifica persona**, fai clic su **Scegli persona** e, facoltativamente, digita un **Messaggio**. Quando una scheda entra nel passaggio, quella persona riceve un'email e una notifica B1 con il nome della persona sulla scheda, i nomi del flusso di lavoro e del passaggio, il tuo messaggio e un link per aprire la scheda. Usala per avvisare un membro dello staff o un responsabile di ministero -- ad esempio, *"Avvisa il pastore quando qualcuno raggiunge il passaggio Colloquio per l'adesione."* La cronologia della scheda registra **Notificato** seguito dal nome della persona.

### Inviare un SMS

Scegli **Invia SMS** e digita il **Messaggio di testo** (fino a 1.600 caratteri). Quando una scheda entra nel passaggio, la persona riceve quel messaggio sul proprio telefono cellulare. Per personalizzare il messaggio, fai clic su un'etichetta sotto la casella del messaggio -- **Nome**, **Cognome**, **Nome visualizzato** o **Nome chiesa** -- per inserire `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}` alla posizione del cursore. Ciascuno viene sostituito con i dati della persona quando l'SMS viene inviato.

- Se la persona non ha un cellulare registrato, non viene inviato alcun SMS e la cronologia della scheda registra **SMS saltato: nessun cellulare**.
- Se la persona ha revocato il consenso, non viene inviato alcun SMS e la cronologia della scheda registra **SMS saltato: consenso revocato**.
- Quando l'SMS viene inviato, la cronologia della scheda registra **SMS inviato**. Se l'invio non riesce -- ad esempio perché non è collegato alcun provider SMS o perché la tua chiesa ha esaurito i crediti SMS -- il problema viene registrato nella cronologia della scheda e le azioni rimanenti del passaggio vengono comunque eseguite.

:::warning
Gli SMS vengono inviati tramite il [provider SMS](../settings/church-settings.md#texting) della tua chiesa. Se non è collegato alcun provider, l'editor delle azioni mostra l'avviso *"Nessun provider SMS configurato"* e gli SMS non verranno inviati.
:::

### Attendere alcuni giorni (sequenze programmate)

L'azione **Attendi** trattiene una scheda per il numero di giorni che imposti. Mentre attende, la scheda appare come **Posticipata**. B1 controlla le attese terminate ogni 30 minuti, quindi una scheda riprende entro circa mezz'ora dal termine dell'attesa. Quando l'attesa è finita:

1. Vengono eseguite tutte le **azioni rimanenti dello stesso passaggio** -- così puoi costruire una sequenza come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Poi, se il passaggio ha un instradamento automatico, la scheda prosegue; altrimenti resta sul passaggio in attesa che una persona se ne occupi.

:::tip
Un'**Attesa** all'inizio di un passaggio è un modo semplice per "trattenere" una scheda prima che venga mostrata a un volontario -- ad esempio, *Attendi 7 giorni, poi un coach si mette in contatto*.
:::

## Aggiungere persone come schede

Ci sono diversi modi per inserire persone su una bacheca:

- **Dalla bacheca** -- Fai clic su **Aggiungi scheda** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo, e ogni membro di quel gruppo viene aggiunto come scheda.
- **Dalla scheda di una persona** -- Usa **Aggiungi a flusso di lavoro** nella pagina di una persona per inserirla in un flusso di lavoro.
- **Dalla ricerca Persone** -- Seleziona più persone e usa l'azione multipla **Aggiungi a flusso di lavoro** per aggiungerle tutte in una volta.
- **Automaticamente con un trigger** -- Aggiungi persone quando succede qualcosa, come l'invio di un modulo o la prima donazione (vedi [Trigger](#triggers) più sotto).

Aggiungere qualcuno a mano, o con un'azione **Aggiungi a flusso di lavoro**, non gli crea mai una seconda scheda aperta nello stesso flusso di lavoro. Se ha già una scheda aperta, viene saltata (in un'aggiunta multipla, ricevono una nuova scheda solo le persone che non ne hanno una). Una volta chiusa la scheda, puoi aggiungerli di nuovo. I trigger seguono invece la loro impostazione **Solo una volta per persona**.

## Lavorare sulla bacheca

Apri un flusso di lavoro per vedere la sua bacheca. Ogni scheda mostra il nome della persona, a chi è assegnata e un'etichetta con la scadenza o lo stato (**Scaduto** o **Posticipato**). Una colonna di passaggio mostra anche piccoli badge per le azioni automatiche che esegue e annotazioni per il suo instradamento, offrendoti una mappa a colpo d'occhio di come si muovono le schede.

- **Spostare una scheda** -- Trascina una scheda da una colonna alla successiva man mano che la persona procede.
- **Aprire una scheda** -- Fai doppio clic su una scheda (o fai clic su di essa) per aprire il suo pannello dei dettagli, dove puoi cambiare il passaggio, riassegnarla, aggiungere note e controllare cosa è già successo.

Dal pannello della scheda puoi:

- **Assegnare** la scheda a un'altra persona o gruppo.
- **Posticipare** la scheda di 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua scadenza.
- **Rimandare indietro** la scheda al passaggio precedente oppure **Saltare** al passaggio successivo.
- **Blocca assegnazione** -- mantieni lo stesso responsabile sulla scheda anche quando si sposta tra i passaggi. Per impostazione predefinita, spostare una scheda su un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; il blocco mantiene la persona attuale responsabile per tutto il percorso.
- **Completa** la scheda per chiuderla, oppure scegli un pulsante **Esito** se il passaggio ha degli esiti configurati (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).
- **Rimuovi scheda** -- togli una scheda dalla bacheca senza completarla, ad esempio quando qualcuno è stato aggiunto per errore. Dopo la conferma, la scheda viene chiusa e rimossa dall'elenco di tutti. Non viene eseguito alcun esito, instradamento o azione di passaggio, e la sua cronologia viene conservata con una voce **Rimossa**. Per una scheda di [conferma di assegnazione di servizio](#serving-assignment-confirmations), rimuoverla chiude la richiesta nello stesso modo.
- **Aggiungi note** e controlla l'**Attività** della scheda -- un registro delle azioni automatiche eseguite (email inviate, attese, ecc.), ciascuna con la data e l'ora in cui è avvenuta.

Per una scheda relativa a una persona, il pannello mostra anche il cellulare e l'email di quella persona come link su cui puoi toccare per chiamarla o scriverle, più un link **Vedi profilo** se hai l'autorizzazione per visualizzare le persone. La persona a cui è assegnata la scheda vede il telefono e l'email anche senza accesso a Persone.

Le note vengono salvate con la scheda. Chiunque possa aprire la scheda -- inclusa la persona o il gruppo a cui è assegnata -- può leggere le note e aggiungerne di proprie. Chi non può aprire la scheda non vede le sue note.

### Azioni multiple

Seleziona le caselle di più schede per agire su di esse insieme. Per selezionare tutte le schede di un passaggio in una volta, spunta la casella **Seleziona tutto** nell'intestazione della colonna di quel passaggio; spuntala di nuovo per deselezionarle. Compare una barra degli strumenti che ti permette di **Completa**, **Posticipa**, **Assegna** (riassegna) o **Sposta in…** un altro passaggio per tutte le schede selezionate contemporaneamente.

## Instradare le schede con esiti e condizioni

L'instradamento controlla dove va una scheda quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di instradamento.

### Pulsanti di esito

Gli esiti sono pulsanti mostrati nel pannello della scheda quando completi una scheda su quel passaggio. Invece di un singolo pulsante **Completa**, puoi offrire scelte come "Entrato in un gruppo" o "Non interessato". Ogni esito può:

- Inviare la scheda a **un altro passaggio** di questo flusso di lavoro,
- **Passare la scheda** a un flusso di lavoro diverso, oppure
- **Chiudere** la scheda.

Questo permette a una decisione di far seguire alla persona percorsi diversi.

### Instradamento automatico (condizionale)

I percorsi automatici spostano una scheda avanti **nel momento in cui entra in un passaggio** (e dopo che le sue azioni automatiche sono terminate), senza che nessuno clicchi, se la persona corrisponde a un insieme di condizioni. Aggiungi un percorso, scegli il passaggio di destinazione e definisci una o più **condizioni** (ad esempio, il campus, l'età o lo stato di appartenenza di una persona). I campi di testo possono corrispondere esattamente oppure con **contiene**, **inizia con** o **finisce con**. Un percorso senza condizioni corrisponde a tutti.

Le condizioni di data (Data odierna, Data di nascita o Anniversario) possono confrontare la data completa o solo una sua parte -- il giorno della settimana, il **Giorno del mese**, il **Mese** o gli anni trascorsi. Per la Data di nascita o l'Anniversario di una persona, **Giorno del mese** offre l'opzione relativa **Oggi**, quindi una condizione come *Data di nascita · Giorno del mese = Oggi* corrisponde alle persone il cui compleanno cade oggi. **Mese** offre **Mese precedente**, **Mese corrente** e **Mese successivo**. Valori relativi come questi vengono calcolati in base al fuso orario della tua chiesa, così corrispondono al giorno del calendario della chiesa e non a quello del server.

Il gruppo di condizioni **Donazioni** include **Donatore regolare sospeso**, che trova le persone che donavano regolarmente e poi hanno smesso. Imposta tre numeri: *Ha donato almeno* **3** *delle ultime* **12** *settimane, poi nulla nelle ultime* **3** *settimane* (questi sono i valori predefiniti). Le settimane vengono contate a ritroso da oggi, nel fuso orario della tua chiesa, e una donazione rimborsata non conta. È più utile con un [trigger pianificato](#schedule-triggers) -- ad esempio una regola settimanale che aggiunge i donatori sospesi a una bacheca di follow-up di cura pastorale. La condizione considera solo le date delle donazioni, mai gli importi, e schede e avvisi non mostrano mai gli importi. Poiché rivela chi ha smesso di donare, questa opzione è visibile e può essere aggiunta, modificata o rimossa solo da chi può visualizzare le donazioni.

Se le condizioni di un percorso non possono essere verificate per qualche motivo, quel percorso viene considerato non corrispondente. La scheda resta sul passaggio (oppure segue un altro percorso che corrisponde) invece di restare bloccata.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo instradamento -- ad esempio, l'etichetta di un esito oppure "se corrisponde" seguito da una freccia verso il passaggio o il flusso di lavoro di destinazione.
:::

## Passaggi completamente automatizzati

Puoi far sì che un passaggio funzioni interamente da solo, senza che nessuno ci lavori. Assegna al passaggio le sue **azioni automatiche** e aggiungi un **instradamento automatico** (senza condizioni) che punta al passaggio successivo. Quando una scheda entra, le azioni vengono eseguite, e poi il percorso la fa avanzare immediatamente -- la scheda attraversa il passaggio senza fermarsi.

:::tip
Combinalo con **Attendi**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Telefonata personale".* L'email e i tempi vengono gestiti per te, e un volontario vede la scheda solo quando è il momento del contatto umano.
:::

## Trigger

I trigger aggiungono automaticamente persone a un flusso di lavoro quando succede qualcosa, così non devi mai aggiungere le schede a mano. Su una bacheca di flusso di lavoro, fai clic sulla scheda **Trigger**, poi su **Aggiungi trigger**. Ci sono due tipi:

### Trigger di evento

Si attivano non appena un record cambia in B1. Scegli l'evento, poi, facoltativamente, aggiungi **condizioni** in modo che vengano aggiunte solo le persone corrispondenti:

- **Persona · Creata / Aggiornata** -- ad esempio, aggiungi chiunque il cui stato diventi *Visitatore* o *Ospite* (lo stato assegnato alle persone che si registrano da sole).
- **Donazione · Creata** -- ad esempio, aggiungi una donazione per la prima volta o di importo elevato a un flusso di ringraziamento (in base all'importo, al fondo o al metodo).
- **Gruppo · Membro entrato** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invii un modulo scelto (ottimo per una scheda "Sono nuovo" o "Connettiti").

### Trigger pianificati

Si eseguono su base ricorrente -- giornaliera, settimanale, mensile o annuale -- in base a un insieme di condizioni. Usali per attività di contatto basate sul tempo, come *tutti quelli il cui compleanno è oggi* (Data di nascita · Giorno del mese = **Oggi**, con il mese corrispondente a **Mese corrente**) oppure un controllo *mensile*. Anche senza **Solo una volta per persona**, un trigger pianificato non aggiunge di nuovo la stessa persona all'interno dello stesso periodo di ripetizione (un giorno, una settimana, un mese o un anno, in base alla frequenza con cui viene eseguito).

Per qualsiasi trigger puoi anche impostare:

- Il **Passaggio iniziale** su cui atterra la nuova scheda (per impostazione predefinita, il primo passaggio).
- **Solo una volta per persona** -- così la stessa persona non viene aggiunta due volte al flusso di lavoro dal trigger. Con questa opzione attiva, chiunque abbia già una scheda su questo flusso di lavoro viene saltato.
  - **Aggiungi di nuovo dopo la chiusura della scheda** -- compare quando **Solo una volta per persona** è attiva. Selezionala per permettere al trigger di aggiungere di nuovo una persona una volta chiusa la sua scheda precedente su questo flusso di lavoro. Una persona non avrà mai due schede aperte contemporaneamente sul flusso di lavoro. Usala per situazioni che possono ripetersi più volte, come un ospite che torna o un processo annuale.
- **Attivo** -- attiva o disattiva il trigger senza eliminarlo.

:::tip
Abbina un trigger **Modulo · Inviato** al modello **Follow-up nuovo visitatore** per trasformare il tuo modulo "Scheda di contatto" o "Sono nuovo" in una pipeline di follow-up automatica.
:::

## Conferme delle assegnazioni di servizio

Un tipo speciale di flusso di lavoro può seguire le [richieste di servizio](./plans.md#assigning-team-members) finché ogni volontario accetta o rifiuta. Invece delle persone, ogni scheda su questa bacheca tiene traccia di **una assegnazione** -- una persona in una posizione su un piano. Due ruoli o due servizi per la stessa persona generano schede separate. Questa funzione è facoltativa: nulla cambia per un piano finché non selezioni un flusso di lavoro di conferma nelle sue impostazioni.

### Come configurarlo

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro** e scegli il modello **Conferma assegnazione di servizio**. (Oppure parti da un **Flusso vuoto** e imposta la sua **Finalità del flusso di lavoro** su **Conferma assegnazione di servizio**.) Creare dal modello richiede l'autorizzazione a inviare SMS, perché include un passaggio SMS.
2. Controlla i passaggi. Il modello inizia con:
   - **Richiedi e attendi risposta** -- invia la richiesta di servizio via email e via SMS, attende 2 giorni, invia un'email di promemoria, attende ancora 1 giorno, poi fa avanzare la scheda automaticamente.
   - **Chiama il volontario per la richiesta senza risposta** -- un passaggio in cui una persona chiama il volontario, con scadenza tra 1 giorno. Imposta un **Assegnatario predefinito** per questo passaggio. Se non ne ha uno, la scheda va al responsabile del ministero, oppure al team del ministero se non ce n'è uno.
3. Modifica le attese, i messaggi e i passaggi in modo che si adattino alla tua chiesa.
4. Apri le [impostazioni di un piano](./plans.md#plan-settings) e scegli questo flusso di lavoro in **Flusso di lavoro di conferma**.

Questi flussi di lavoro usano un'azione **Invia richiesta di servizio** invece di **Invia email** e **Invia SMS**. Scegli **Email** o **Messaggio di testo** e, facoltativamente, scrivi un **Messaggio di richiesta**. La richiesta include sempre il ruolo, il piano, la data del servizio e un link per rispondere; nel tuo messaggio puoi usare `{{planName}}`, `{{positionName}}` e `{{serviceDate}}`. Lascia il messaggio vuoto per usare la richiesta predefinita. Si applicano le preferenze di notifica dei volontari, il consenso agli SMS, il tuo provider SMS e l'approvazione email della tua chiesa, e ogni tentativo saltato o bloccato viene registrato sulla scheda. **Invia email**, **Invia SMS** e **Aggiungi a flusso di lavoro** non sono disponibili su queste bacheche.

La scheda **Trigger** di un flusso di lavoro di conferma spiega come vengono avviate le schede invece di offrire trigger, e questi flussi di lavoro non compaiono negli elenchi **Aggiungi a flusso di lavoro** per le persone.

### Come vengono avviate e chiuse le schede

- Le schede iniziano quando **Notifichi** i volontari su un piano pubblicato (vedi [Notificare i volontari](./plan-validation.md#notifying-volunteers)). Ogni assegnazione nuova e senza risposta riceve una scheda. Salvare, pubblicare, copiare o compilare automaticamente un piano non contatta nessuno di per sé, e i piani in bozza non inviano nulla.
- I volontari ricevono comunque il solito avviso nell'app. Il follow-up via email e SMS proviene dal flusso di lavoro.
- Quando il volontario **accetta o rifiuta**, la sua scheda si chiude automaticamente, insieme a eventuali attività di follow-up collegate.
- Il pannello della scheda mostra la posizione, la data del servizio e un link al piano. Al posto di **Completa**, il pulsante riporta **Registra follow-up eseguito**. Facendo clic, si registra che qualcuno ha effettuato il follow-up, ma la scheda resta aperta e assegnata (mostrata come **In attesa di risposta**) finché il volontario non risponde o non scade la scadenza di risposta.
- La scadenza di risposta è la fine dell'ultimo turno di servizio in cui il team della posizione presta servizio. Se il piano non ha orari corrispondenti, è la fine della giornata di servizio. Se nessuno ha risposto entro quel momento, la scheda si chiude con **Scadenza di risposta superata** e un'attività **Verifica richiesta di servizio senza risposta** viene inviata all'attuale responsabile della scheda o al responsabile del ministero, così qualcuno può decidere come coprire il posto. L'assegnazione resta **Non confermata**.
- Rimuovere l'assegnazione, cambiarne la persona, la posizione o la data del piano, riportare il piano in bozza, oppure passare il piano a un flusso di lavoro di conferma diverso chiude la scheda. Una scheda chiusa non viene mai riaperta da un altro **Notifica**; aggiungi una nuova assegnazione per inviare una richiesta nuova.

:::info
Per le richieste inviate tramite un flusso di lavoro di conferma, i [promemoria ai volontari](./plans.md#volunteer-reminders) vengono inviati solo ai volontari che hanno **accettato**, così le persone in attesa di risposta non ricevono promemoria in aggiunta ai follow-up del flusso di lavoro.
:::

## Le mie schede

I volontari e lo staff non devono scorrere tutte le bacheche per trovare il proprio lavoro. L'elenco **Le mie schede** nella pagina **Il mio lavoro** mostra ogni scheda assegnata all'utente corrente in tutti i flussi di lavoro. Per arrivarci, fai clic su **Le mie schede** in alto nella pagina Flussi di lavoro, oppure apri **Servizio > Il mio lavoro** nel menu Jump. Facendo clic su una scheda si apre la bacheca a cui appartiene.

## Report

Apri un flusso di lavoro e fai clic su **Report** per vedere le statistiche di quel flusso di lavoro:

- **Scaduti** -- il numero di schede oltre la loro data di scadenza.
- **Schede per passaggio** -- quante schede si trovano attualmente su ciascun passaggio, mostrate come grafico a colonne.
- **Completate (30 giorni)** -- il flusso di lavoro degli ultimi 30 giorni, mostrato come grafico a linee.

Usali per individuare i colli di bottiglia -- ad esempio, un passaggio in cui le schede si accumulano e non avanzano mai.

## Articoli correlati

- [Attività](./tasks.md) -- le singole azioni su cui si basano le schede dei flussi di lavoro
- [Moduli](../forms/index.md) -- crea i moduli che possono avviare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui un'azione "Aggiungi al gruppo" può inserire le persone
- [Piani di servizio](./plans.md) -- scegli un flusso di lavoro di conferma per le richieste di servizio di un piano
- [Ruoli e autorizzazioni](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
