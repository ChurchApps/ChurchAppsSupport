---
title: "Flussi di lavoro"
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro fanno avanzare le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una scheda che passa da un passaggio al successivo -- dal follow-up di un ospite alla prima visita, a un percorso di adesione come membro, al ringraziamento per un primo donatore, e a qualsiasi altra situazione in cui devi seguire molte persone attraverso le stesse fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una telefonata, avere una conversazione) **e** eseguire da solo azioni automatiche -- inviare un'email o un SMS, attendere alcuni giorni, aggiungere la persona a un gruppo -- così i flussi di lavoro gestiscono sia il follow-up umano sia il lavoro di routine che lo circonda. I flussi di lavoro estendono le [Attività](./tasks.md) in una bacheca Kanban drag-and-drop, così nessuna persona e nessuna attività vengono trascurate.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che vuoi seguire esistano in B1 Admin
- Familiarizza con il funzionamento delle [Attività](./tasks.md), perché ogni scheda su una bacheca è un'attività
- Per usare l'azione **Invia email**, crea prima i modelli di email che vuoi inviare (gestiti in **Impostazioni → Modelli di email**)
- Per usare l'azione **Invia SMS**, collega prima un [fornitore di SMS](../settings/church-settings.md#texting)
- Ti serve il permesso Attività appropriato. Visualizzare, modificare le schede e gestire i flussi di lavoro sono livelli di permesso separati (vedi [Ruoli e permessi](../settings/roles-permissions.md))

</div>

## Visualizzare i flussi di lavoro

Apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Servizio** e clicca su **Flussi di lavoro**. I tuoi flussi di lavoro sono elencati in una tabella che mostra la **Categoria** e lo **Stato** (**Attivo** o **Inattivo**) di ciascuno. Se usi le categorie, le schede sopra l'elenco ti permettono di filtrarlo per categoria. Clicca su un flusso di lavoro qualsiasi per aprire la sua bacheca.

## Creare un flusso di lavoro

1. Nella pagina Flussi di lavoro, clicca su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso di lavoro vuoto** -- parti da zero e costruisci i tuoi passaggi.
   - **Da un modello** -- parti da un insieme di passaggi già pronti che puoi modificare. I modelli integrati includono:
     - **Follow-up nuovo visitatore** -- Invia email di benvenuto → Telefonata personale → Invito al passo successivo → Collegato
     - **Corso di adesione** -- Esprimi interesse → Iscriviti al corso → Partecipa al corso → Completa l'adesione
     - **Ringraziamento al primo donatore** -- Invia una nota di ringraziamento → Condividi l'impatto delle offerte → Amministratore fedele
     - **Conferma assegnazione di servizio** -- Invia la richiesta e attendi la risposta → Telefona al volontario per la richiesta senza risposta (vedi [Conferme delle assegnazioni di servizio](#serving-assignment-confirmations))

   La creazione dei passaggi di un modello può richiedere un momento. Mentre lavora, il pulsante **Aggiungi flusso di lavoro** diventa **Creazione in corso...** e non può essere cliccato di nuovo, così non ti ritroverai con un duplicato. Se qualcosa va storto, la pagina mostra *"Impossibile creare il flusso di lavoro. Riprova."*
3. Assegna al flusso di lavoro un **Nome**.
4. Facoltativamente assegna una **Categoria** per raggruppare i flussi di lavoro affini. Puoi creare una nuova categoria direttamente dal menu a tendina.
   Per un flusso di lavoro vuoto, scegli anche la sua **Finalità del flusso di lavoro**: **Follow-up delle persone** (il tipo abituale) oppure **Conferma assegnazione di servizio**. La finalità non può essere cambiata dopo la creazione del flusso di lavoro.
5. Lascia il flusso di lavoro **Attivo** così le persone possono esservi aggiunte, oppure impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta ai flussi di lavoro.
6. Clicca su **Salva**.

:::tip
Usa il pulsante **Duplica** nell'elenco dei Flussi di lavoro per copiare un flusso di lavoro esistente -- compresi passaggi, azioni automatiche e instradamento -- come punto di partenza per uno nuovo.
:::

## Costruire la bacheca con i passaggi

Ogni bacheca di flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Aggiungi passaggio** per creare ogni fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Nome del passaggio** -- l'intestazione della colonna (ad esempio "Telefonata di benvenuto" oppure "In attesa di iscrizione").
- **Scadenza tra (giorni)** -- imposta automaticamente una data di scadenza quando una scheda entra in questo passaggio. Le schede oltre la data di scadenza vengono contrassegnate come **In ritardo**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui vengono assegnate automaticamente le nuove schede di questo passaggio. Quando l'assegnatario predefinito è una persona, riceve una notifica che una scheda le è stata assegnata.
- **Azioni automatiche** -- operazioni che il sistema esegue da solo quando una scheda arriva (vedi sotto).
- **Instradamento** -- dove va la scheda quando lascia il passaggio (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una scheda segue quando non si applica nessun altro instradamento.

:::info
Salva prima un nuovo passaggio. Azioni automatiche e instradamento sono collegati al passaggio, quindi l'editor sblocca quelle sezioni solo una volta che il passaggio esiste.
:::

## Azioni automatiche

Ogni passaggio può contenere un elenco di **azioni automatiche** che vengono eseguite da sole nel momento in cui una scheda **entra** nel passaggio -- prima che qualcuno ci metta mano. È così che un passaggio sia sollecita un volontario *sia* si occupa del lavoro di routine attorno al follow-up.

Nell'editor del passaggio, apri **Azioni automatiche**, clicca su **Aggiungi azione**, scegli un tipo e compila le sue impostazioni. Aggiungine quante ne servono; vengono eseguite **dall'alto in basso, in ordine**. Clicca su **Salva** sul passaggio per salvare insieme il passaggio e tutte le sue azioni. Rimuovere un'azione con la sua icona del cestino ha effetto immediato.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia alla persona un modello di email che scegli. Puoi sostituire l'oggetto. |
| **Invia SMS** | Invia alla persona un messaggio che scrivi, tramite il [fornitore di SMS](../settings/church-settings.md#texting) della tua chiesa. |
| **Attendi** | Mette in pausa la scheda per un numero di giorni prima di continuare (vedi sotto). |
| **Aggiungi al gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Rimuovi dal gruppo** | Rimuove la persona da un gruppo che scegli. |
| **Registra presenza** | Segna la persona come presente all'orario di culto in corso di un gruppo (vedi sotto). |
| **Aggiungi al flusso di lavoro** | Avvia la persona su un altro flusso di lavoro -- utile per passare da un processo all'altro. |
| **Aggiungi nota** | Registra una nota nella cronologia della scheda. |
| **Imposta campo** | Aggiorna un campo nella scheda della persona: Stato di appartenenza, Stato civile, Sesso, Città, Provincia o CAP. |
| **Webhook** | Invia i dettagli della scheda a un indirizzo web esterno (URL) che fornisci, per collegarsi ad altri sistemi. |
| **Crea attività** | Crea un'[attività](./tasks.md) con il titolo e la descrizione che inserisci, assegnata a chi scegli. |
| **Notifica persona** | Invia a un membro dello staff o a un volontario che scegli un'email e una notifica B1 sulla scheda (vedi sotto). |

Al termine di tutte le azioni di un passaggio, la scheda **resta su quel passaggio** così una persona può lavorarci -- a meno che il passaggio non abbia un instradamento automatico che la sposta avanti (vedi [Passaggi completamente automatici](#fully-automated-steps)).

:::info
Le azioni automatiche vengono eseguite solo quando una scheda arriva attraverso il flusso normale -- quando viene aggiunta per la prima volta, quando un esito o un instradamento automatico la fa entrare, oppure dopo che un'attesa è terminata. **Non** vengono rieseguite quando un membro dello staff trascina manualmente una scheda sul passaggio o la rimanda indietro, così una persona non riceve la stessa email due volte.
:::

### Inviare email

Scegli **Invia email**, seleziona uno dei tuoi modelli di email e, facoltativamente, scrivi un oggetto personalizzato. Quando una scheda entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email registrato, il passaggio salta semplicemente questa azione.) I [campi di unione](../settings/email-templates.md#merge-fields) nel modello, come `{{firstName}}`, vengono sostituiti con i dati della persona.

Quando l'email viene inviata, la cronologia della scheda registra **Email inviata**. Se non può essere inviata -- ad esempio perché l'email della tua chiesa non è ancora stata approvata oppure è stato raggiunto il limite giornaliero -- non viene aggiunta alcuna voce "Email inviata".

:::info
Le email dei flussi di lavoro vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano verso il limite giornaliero di email della chiesa. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). L'azione **Invia email** ti avvisa nell'editor del passaggio quando queste email non verranno inviate: *"L'email della tua chiesa non è ancora stata approvata..."* se l'approvazione è ancora in attesa, oppure *"L'email della tua chiesa è in pausa..."* se di recente alcuni messaggi sono stati respinti o segnalati come spam.
:::

### Registrare le presenze

Scegli **Registra presenza** e clicca su **Scegli gruppo** per selezionare il gruppo di cui registrare le presenze. Quando l'azione viene eseguita, la persona viene segnata come presente per l'orario di culto in corso di quel gruppo -- come se avesse effettuato il check-in. È utile con un trigger che aggiunge le persone al flusso di lavoro man mano che arrivano, così vengono conteggiate senza un check-in separato.

- La presenza viene misurata nel momento in cui la scheda è stata **creata**, quindi un'**Attesa** precedente nel flusso di lavoro non la spinge oltre la durata del culto.
- Contano solo gli orari di culto con un giorno e un orario di inizio. Se in quel momento nessuno degli orari di culto del gruppo è in corso, non viene registrato nulla e la cronologia della scheda riporta **Nessun culto programmato in corso — presenza non registrata**.
- Quando la presenza viene registrata, la cronologia della scheda mostra **Presenza registrata** seguito dal nome del gruppo. Eseguire di nuovo l'azione per lo stesso culto non conta la persona due volte.

### Notificare una persona

Scegli **Notifica persona**, clicca su **Scegli persona** e, facoltativamente, scrivi un **Messaggio**. Quando una scheda entra nel passaggio, quella persona riceve un'email e una notifica B1 con il nome della persona sulla scheda, i nomi del flusso di lavoro e del passaggio, il tuo messaggio e un link per aprire la scheda. Usalo per avvisare un membro dello staff o un leader di ministero -- ad esempio *"Avvisa il pastore quando qualcuno raggiunge il passaggio Colloquio per l'adesione."* La cronologia della scheda registra **Notificato** seguito dal nome della persona.

### Inviare un SMS {#sending-a-text}

Scegli **Invia SMS** e scrivi il **Messaggio di testo** (fino a 1.600 caratteri). Quando una scheda entra nel passaggio, la persona riceve quell'SMS sul proprio cellulare. Per personalizzare il messaggio, clicca su un chip sotto la casella del messaggio -- **Nome**, **Cognome**, **Nome visualizzato** oppure **Nome della chiesa** -- per inserire nel punto del cursore `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`. Ognuno viene sostituito con i dati della persona quando l'SMS viene inviato.

- Se la persona non ha un cellulare registrato, non viene inviato alcun SMS e la cronologia della scheda registra **SMS saltato: nessun cellulare**.
- Se la persona ha rifiutato, non viene inviato alcun SMS e la cronologia della scheda registra **SMS saltato: rifiutato**.
- Quando l'SMS viene inviato, la cronologia della scheda registra **SMS inviato**. Se l'invio fallisce -- ad esempio perché non è collegato alcun fornitore di SMS oppure la tua chiesa ha esaurito i crediti SMS -- il problema viene registrato nella cronologia della scheda e le azioni rimanenti del passaggio vengono comunque eseguite.

:::warning
Gli SMS vengono inviati tramite il [fornitore di SMS](../settings/church-settings.md#texting) della tua chiesa. Se non è collegato alcun fornitore, l'editor dell'azione ti avvisa *"Nessun fornitore di SMS configurato"* e gli SMS non verranno inviati.
:::

### Attendere alcuni giorni (sequenze programmate)

L'azione **Attendi** trattiene una scheda per il numero di giorni che imposti. Mentre attende, la scheda appare come **In pausa**. B1 controlla le attese terminate ogni 30 minuti, quindi una scheda riprende entro circa mezz'ora dalla fine della sua attesa. Quando l'attesa è terminata:

1. Vengono eseguite le **eventuali azioni rimanenti dello stesso passaggio** -- così puoi costruire una sequenza programmata come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Poi, se il passaggio ha un instradamento automatico, la scheda prosegue; altrimenti resta sul passaggio ad aspettare che una persona la prenda in carico.

:::tip
Un'**Attesa** all'inizio di un passaggio è un modo semplice per "trattenere" una scheda prima che arrivi a un volontario -- ad esempio *Attendi 7 giorni, poi un coach si mette in contatto*.
:::

## Aggiungere persone come schede

Ci sono diversi modi per mettere le persone su una bacheca:

- **Dalla bacheca** -- Clicca su **Aggiungi scheda** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo, e ogni membro di quel gruppo viene aggiunto come scheda.
- **Dalla scheda di una persona** -- Usa **Aggiungi al flusso di lavoro** nella pagina di una persona per inserirla in un flusso di lavoro.
- **Dalla ricerca Persone** -- Seleziona più persone e usa l'azione di gruppo **Aggiungi al flusso di lavoro** per aggiungerle tutte in una volta.
- **Automaticamente con un trigger** -- Aggiungi persone quando succede qualcosa, come l'invio di un modulo o una prima offerta (vedi [Trigger](#triggers) più sotto).

Aggiungere qualcuno a mano, oppure con un'azione del passaggio **Aggiungi al flusso di lavoro**, non gli fa mai ottenere una seconda scheda aperta sullo stesso flusso di lavoro. Se ha già una scheda aperta, viene saltato (in un'aggiunta multipla, solo le persone senza scheda ricevono una nuova scheda). Una volta chiusa la loro scheda, puoi aggiungerle di nuovo. I trigger seguono invece la propria impostazione **Una sola volta per persona**.

## Lavorare sulla bacheca {#working-the-board}

Apri un flusso di lavoro per vedere la sua bacheca. Ogni scheda mostra il nome della persona, a chi è assegnata e un chip con la data di scadenza o lo stato (**In ritardo** oppure **In pausa**). Una colonna di passaggio mostra anche piccoli badge per le azioni automatiche che esegue e annotazioni per il suo instradamento, offrendoti una mappa a colpo d'occhio di come scorrono le schede.

- **Spostare una scheda** -- Trascina una scheda da una colonna alla successiva man mano che la persona avanza.
- **Aprire una scheda** -- Fai doppio clic su una scheda (oppure cliccaci sopra) per aprire il suo pannello di dettaglio, dove puoi cambiare il passaggio, riassegnarla, aggiungere note e rivedere ciò che è già accaduto.

Dal pannello della scheda puoi:

- **Assegnare** la scheda a un'altra persona o a un altro gruppo.
- **Posticipare** la scheda di 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua scadenza.
- **Rimandare indietro** al passaggio precedente oppure **Saltare** al passaggio successivo.
- **Fissa assegnazione** -- mantieni lo stesso responsabile sulla scheda anche quando si sposta tra i passaggi. Per impostazione predefinita, spostare una scheda in un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; fissare l'assegnazione mantiene la persona attuale responsabile per tutto il percorso.
- **Completare** la scheda per chiuderla, oppure scegliere un pulsante **Esito** se il passaggio ha degli esiti configurati (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).
- **Rimuovi scheda** -- toglie una scheda dalla bacheca senza completarla, ad esempio quando qualcuno è stato aggiunto per errore. Dopo la conferma, la scheda viene chiusa e rimossa dalla lista di tutti. Non viene eseguito alcun esito, percorso o azione del passaggio, e la sua cronologia viene conservata con una voce **Rimossa**. Per una scheda di [conferma di assegnazione di servizio](#serving-assignment-confirmations), rimuoverla chiude la richiesta nello stesso modo.
- **Aggiungi note** e rivedi l'**Attività** della scheda -- un registro delle azioni automatiche eseguite (email inviate, attese, ecc.), ciascuna con la data e l'ora in cui è avvenuta.

Per una scheda relativa a una persona, il pannello mostra anche il cellulare e l'email della persona come link su cui puoi toccare per chiamarla o scriverle, più un link **Visualizza profilo** se hai il permesso di visualizzare le persone. La persona a cui è assegnata la scheda vede il telefono e l'email anche senza accesso a Persone.

Le note vengono salvate con la scheda. Chiunque possa aprire la scheda -- compresa la persona o il gruppo a cui è assegnata -- può leggere le note e aggiungere le proprie. Chi non può aprire la scheda non vede le sue note.

### Azioni multiple

Seleziona le caselle di più schede per agire su di esse insieme. Per scegliere in una volta ogni scheda di un passaggio, spunta la casella **Seleziona tutto** nell'intestazione della colonna di quel passaggio; spuntala di nuovo per deselezionarle. Compare una barra degli strumenti che ti permette di **Completare**, **Posticipare**, **Assegnare** (riassegnare) o **Spostare in…** un altro passaggio per tutte le schede selezionate in una volta.

## Instradare le schede con esiti e condizioni {#routing-cards-with-outcomes-and-conditions}

L'instradamento controlla dove va una scheda quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di instradamento.

### Pulsanti di esito

Gli esiti sono pulsanti mostrati nel pannello della scheda quando completi una scheda su quel passaggio. Invece di un singolo pulsante **Completa**, puoi offrire scelte come "Si è unito a un gruppo" o "Non interessato". Ogni esito può:

- Mandare la scheda a **un altro passaggio** di questo flusso di lavoro,
- **Passare la scheda** a un flusso di lavoro diverso, oppure
- **Chiudere** la scheda.

Questo permette a una sola decisione di far ramificare la persona su percorsi diversi.

### Instradamento automatico (condizionale)

Gli instradamenti automatici spostano una scheda avanti **nel momento stesso in cui entra in un passaggio** (e dopo il termine delle sue azioni automatiche), senza che nessuno clicchi, se la persona soddisfa un insieme di condizioni. Aggiungi un instradamento, scegli il passaggio di destinazione e definisci una o più **condizioni** (ad esempio il sede, l'età o lo stato di appartenenza di una persona). I campi di testo possono corrispondere esattamente oppure con **contiene**, **inizia con** o **finisce con**. Un instradamento senza condizioni corrisponde a tutti.

Le condizioni sulle date (Data odierna, Data di nascita o Anniversario) possono confrontare la data completa oppure solo una parte -- il giorno della settimana, il **Giorno del mese**, il **Mese** o gli anni trascorsi. Per la Data di nascita o l'Anniversario di una persona, il **Giorno del mese** offre un'opzione relativa **Oggi**, così una condizione come *Data di nascita · Giorno del mese = Oggi* corrisponde alle persone il cui compleanno cade nel giorno del mese corrente. Il **Mese** offre **Mese precedente**, **Mese corrente** e **Mese successivo**. I valori relativi come questi vengono calcolati usando il fuso orario della tua chiesa, così corrispondono al giorno del calendario della chiesa e non a quello del server.

Il gruppo di condizioni **Offerte** contiene **Donatore regolare interrotto**, che trova le persone che un tempo donavano regolarmente e poi hanno smesso. Imposta tre numeri: *Ha donato in almeno* **3** *delle ultime* **12** *settimane, poi nulla nelle ultime* **3** *settimane* (questi sono i valori predefiniti). Le settimane vengono contate a ritroso da oggi nel fuso orario della tua chiesa, e un'offerta rimborsata non conta. È più utile con un [trigger programmato](#schedule-triggers) -- ad esempio una regola settimanale che aggiunge i donatori interrotti a una bacheca di follow-up pastorale. La condizione guarda solo le date delle offerte, mai gli importi, e schede e avvisi non mostrano mai gli importi. Poiché rivela chi ha smesso di donare, questa opzione è visibile e modificabile solo a chi può visualizzare le donazioni.

Se le condizioni di un instradamento non possono essere verificate per qualche motivo, quell'instradamento viene considerato non corrispondente. La scheda resta sul passaggio (oppure segue un altro instradamento che corrisponde) invece di restare bloccata.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo instradamento -- ad esempio un'etichetta di esito oppure "se corrisponde" seguito da una freccia verso il passaggio o il flusso di lavoro di destinazione.
:::

## Passaggi completamente automatici {#fully-automated-steps}

Puoi fare in modo che un passaggio venga eseguito interamente da solo, senza che nessuno ci lavori. Assegna al passaggio le sue **azioni automatiche** e aggiungi un **instradamento automatico** (senza condizioni) che punti al passaggio successivo. Quando una scheda entra, le azioni vengono eseguite e poi l'instradamento la fa avanzare immediatamente -- la scheda passa direttamente oltre.

:::tip
Combinalo con **Attendi**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Telefonata personale".* L'email e i tempi vengono gestiti per te, e un volontario vede la scheda solo quando è il momento del contatto umano.
:::

## Trigger {#triggers}

I trigger aggiungono automaticamente le persone a un flusso di lavoro quando succede qualcosa, così non devi mai aggiungere schede a mano. Su una bacheca di flusso di lavoro, clicca sulla scheda **Trigger**, poi su **Aggiungi trigger**. Ci sono due tipi:

### Trigger di evento

Si attivano non appena un record cambia in B1. Scegli l'evento, poi facoltativamente aggiungi delle **condizioni** così vengono aggiunte solo le persone corrispondenti:

- **Persona · Creata / Aggiornata** -- ad esempio aggiungi chiunque il cui stato diventa *Visitatore* o *Ospite* (lo stato assegnato alle persone che si registrano da sole).
- **Donazione · Creata** -- ad esempio aggiungi una prima offerta o un'offerta importante a un flusso di ringraziamento (filtra per importo, fondo o metodo).
- **Gruppo · Membro aggiunto** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invii un modulo scelto (ottimo per una scheda "Sono nuovo" o "Connettiti").

### Trigger programmati {#schedule-triggers}

Vengono eseguiti su base ricorrente -- giornaliera, settimanale, mensile o annuale -- in base a un insieme di condizioni. Usali per attività di contatto basate sul tempo, come *tutti coloro il cui compleanno è oggi* (Data di nascita · Giorno del mese = **Oggi**, con il mese corrispondente a **Mese corrente**) oppure un controllo *mensile*. Anche senza **Una sola volta per persona**, un trigger programmato non aggiunge di nuovo la stessa persona nello stesso periodo di ripetizione (un giorno, una settimana, un mese o un anno, a seconda della frequenza di esecuzione).

Per qualsiasi trigger puoi anche impostare:

- Il **Passaggio iniziale** su cui atterra la nuova scheda (predefinito: il primo passaggio).
- **Una sola volta per persona** -- così la stessa persona non viene aggiunta al flusso di lavoro due volte dal trigger. Con questa opzione attiva, chiunque abbia già una scheda su questo flusso di lavoro viene saltato.
  - **Aggiungi di nuovo dopo la chiusura della scheda** -- compare quando **Una sola volta per persona** è attiva. Selezionala per permettere al trigger di aggiungere di nuovo qualcuno una volta chiusa la sua scheda precedente su questo flusso di lavoro. Una persona non avrà mai due schede aperte contemporaneamente sul flusso di lavoro. Usalo per cose che possono accadere più di una volta, come un ospite che ritorna o un processo annuale.
- **Attivo** -- attiva o disattiva il trigger senza eliminarlo.

:::tip
Abbina un trigger **Modulo · Inviato** al modello **Follow-up nuovo visitatore** per trasformare il tuo modulo "Scheda di contatto" o "Sono nuovo" in una pipeline di follow-up automatica.
:::

## Conferme delle assegnazioni di servizio {#serving-assignment-confirmations}

Un tipo speciale di flusso di lavoro può fare follow-up sulle [richieste di servizio](./plans.md#assigning-team-members) finché ogni volontario non accetta o rifiuta. Invece delle persone, ogni scheda su questa bacheca traccia **una sola assegnazione** -- una persona in una posizione su un piano. Due ruoli o due culti per la stessa persona ottengono schede separate. È una scelta facoltativa: nulla cambia per un piano finché non selezioni un flusso di lavoro di conferma nelle sue impostazioni.

### Configurarlo

1. Nella pagina Flussi di lavoro, clicca su **Aggiungi flusso di lavoro** e scegli il modello **Conferma assegnazione di servizio**. (Oppure parti da un **Flusso di lavoro vuoto** e imposta la sua **Finalità del flusso di lavoro** su **Conferma assegnazione di servizio**.) Creare dal modello richiede il permesso di inviare SMS, perché include un passaggio SMS.
2. Esamina i passaggi. Il modello inizia con:
   - **Invia la richiesta e attendi la risposta** -- invia la richiesta di servizio via email e via SMS, attende 2 giorni, invia un'email di promemoria, attende ancora 1 giorno, poi fa avanzare automaticamente la scheda.
   - **Telefona al volontario per la richiesta senza risposta** -- un passaggio in cui una persona chiama il volontario, con scadenza tra 1 giorno. Imposta un **Assegnatario predefinito** su questo passaggio. Se non ne ha uno, la scheda va al leader del ministero, oppure al team del ministero se non c'è un leader.
3. Modifica le attese, i messaggi e i passaggi per adattarli alla tua chiesa.
4. Apri le [impostazioni di un piano](./plans.md#plan-settings) e scegli questo flusso di lavoro in **Flusso di conferma**.

Questi flussi di lavoro usano un'azione **Invia richiesta di servizio** invece di **Invia email** e **Invia SMS**. Scegli **Email** o **Messaggio di testo** e, facoltativamente, scrivi un **Messaggio di richiesta**. La richiesta include sempre il ruolo, il piano, la data del servizio e un link per rispondere; puoi usare `{{planName}}`, `{{positionName}}` e `{{serviceDate}}` nel tuo messaggio. Lascia il messaggio vuoto per usare la richiesta predefinita. Si applicano le preferenze di notifica dei volontari, il consenso agli SMS, il tuo fornitore di SMS e l'approvazione dell'email della tua chiesa, e ogni tentativo saltato o bloccato viene registrato sulla scheda. **Invia email**, **Invia SMS** e **Aggiungi al flusso di lavoro** non sono disponibili su queste bacheche.

La scheda **Trigger** di un flusso di lavoro di conferma spiega come vengono avviate le schede invece di offrire dei trigger, e questi flussi di lavoro non compaiono negli elenchi **Aggiungi al flusso di lavoro** per le persone.

### Come vengono avviate e chiuse le schede

- Le schede partono quando **Notifichi** i volontari su un piano pubblicato (vedi [Notificare i volontari](./plan-validation.md#notifying-volunteers)). Ogni nuova assegnazione senza risposta ottiene una scheda. Salvare, pubblicare, copiare o riempire automaticamente un piano non contatta nessuno di per sé, e i piani a matita non inviano nulla.
- I volontari ricevono comunque il normale avviso nell'app. Il follow-up via email e SMS viene dal flusso di lavoro.
- Quando il volontario **accetta o rifiuta**, la sua scheda si chiude automaticamente, insieme a eventuali attività di follow-up collegate.
- Il pannello della scheda mostra la posizione, la data del servizio e un link al piano. Invece di **Completa**, il pulsante dice **Registra follow-up effettuato**. Cliccandolo si registra che è stato fatto un follow-up, ma la scheda resta aperta e assegnata (mostrata come **In attesa di risposta**) finché il volontario non risponde o non scade la scadenza per la risposta.
- La scadenza per la risposta è la fine dell'ultimo orario di culto in cui serve la squadra di quella posizione. Se il piano non ha orari corrispondenti, è la fine della giornata del servizio. Se nessuno ha risposto entro quel momento, la scheda si chiude con **Scadenza per la risposta superata** e un'attività **Verifica la richiesta di servizio senza risposta** va al responsabile attuale della scheda o al leader del ministero, così qualcuno può decidere come coprire il posto. L'assegnazione resta **Non confermata**.
- Rimuovere l'assegnazione, cambiarne la persona, la posizione o la data del piano, riportare il piano allo stato a matita, o passare il piano a un flusso di conferma diverso chiude la scheda. Una scheda chiusa non viene mai riaperta da un altro **Notifica**; aggiungi una nuova assegnazione per inviare una nuova richiesta.

:::info
Per le richieste inviate tramite un flusso di conferma, i [promemoria per i volontari](./plans.md#volunteer-reminders) vengono inviati solo ai volontari che hanno **accettato**, così le persone in attesa di risposta non ricevono promemoria in aggiunta ai follow-up del flusso di lavoro.
:::

## Le mie schede

I volontari e lo staff non devono cercare in ogni bacheca per trovare il proprio lavoro. L'elenco **Le mie schede** nella pagina **Il mio lavoro** mostra ogni scheda assegnata all'utente corrente in tutti i flussi di lavoro. Per arrivarci, clicca su **Le mie schede** in cima alla pagina Flussi di lavoro, oppure apri **Servizio > Il mio lavoro** nel menu di navigazione rapida. Cliccando su una scheda si apre il suo pannello di dettaglio direttamente nella pagina Il mio lavoro, dove puoi lavorare sulla scheda o rimuoverla senza lasciare la pagina. Se puoi visualizzare i flussi di lavoro, il pannello ha anche un link **Apri la bacheca del flusso di lavoro** alla bacheca a cui appartiene la scheda.

## Report

Apri un flusso di lavoro e clicca su **Report** per vedere le analisi di quel flusso:

- **In ritardo** -- il numero di schede oltre la data di scadenza.
- **Schede per passaggio** -- quante schede si trovano attualmente su ogni passaggio, mostrate come grafico a colonne.
- **Completate (30 giorni)** -- la produttività degli ultimi 30 giorni, mostrata come grafico a linee.

Usali per individuare i colli di bottiglia -- ad esempio un passaggio in cui le schede si accumulano senza mai avanzare.

## Articoli correlati

- [Attività](./tasks.md) -- le singole azioni su cui si basano le schede dei flussi di lavoro
- [Moduli](../forms/index.md) -- crea i moduli che possono attivare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui un'azione "Aggiungi al gruppo" può inserire le persone
- [Piani di servizio](./plans.md) -- scegli un flusso di conferma per le richieste di servizio di un piano
- [Ruoli e permessi](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
