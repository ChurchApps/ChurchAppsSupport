---
title: "Flussi di lavoro"
---

# Flussi di lavoro {#workflows}

<div class="article-intro">

I flussi di lavoro fanno avanzare le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una scheda che passa da un passaggio al successivo: da un follow-up per un primo ospite, a un percorso di adesione, a un ringraziamento per un primo donatore, e a qualsiasi altra situazione in cui devi seguire molte persone attraverso la stessa serie di fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una telefonata, avere una conversazione) **e** eseguire da solo azioni automatiche, come inviare un'email o un SMS, attendere alcuni giorni o aggiungere la persona a un gruppo. Così i flussi di lavoro gestiscono sia il follow-up umano sia le attività ripetitive che lo circondano. I flussi di lavoro estendono le [Attività](./tasks.md) in una bacheca Kanban con trascinamento, così nessuno viene dimenticato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che vuoi seguire esistano in B1 Admin
- Familiarizza con il funzionamento delle [Attività](./tasks.md), perché ogni scheda su una bacheca è un'attività
- Per usare l'azione **Invia email**, crea prima i modelli di email che vuoi inviare (gestiti in **Impostazioni → Modelli email**)
- Per usare l'azione **Invia SMS**, collega prima un [fornitore di SMS](../settings/church-settings.md#texting)
- Ti serve il permesso Attività appropriato. Visualizzare, modificare le schede e gestire i flussi di lavoro sono livelli di permesso separati (vedi [Ruoli e permessi](../settings/roles-permissions.md))

</div>

## Visualizzare i flussi di lavoro {#viewing-workflows}

Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Servizio** e fai clic su **Flussi di lavoro**. I tuoi flussi di lavoro sono elencati in una tabella che mostra la **Categoria** e lo **Stato** di ciascuno (**Attivo** o **Inattivo**). Se usi le categorie, le schede sopra l'elenco ti permettono di filtrarlo per categoria. Fai clic su un flusso di lavoro per aprire la sua bacheca.

## Creare un flusso di lavoro {#creating-a-workflow}

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso di lavoro vuoto** -- parti da zero e costruisci i tuoi passaggi.
   - **Da un modello** -- parti da un insieme di passaggi già pronti che puoi modificare. I modelli integrati includono:
     - **Follow-up per un nuovo visitatore** -- Invia email di benvenuto → Telefonata personale → Invito al passo successivo → Collegato
     - **Corso di adesione** -- Esprimi interesse → Iscriviti al corso → Partecipa al corso → Completa l'adesione
     - **Ringraziamento per il primo donatore** -- Invia biglietto di ringraziamento → Condividi l'impatto della donazione → Amministrato
3. Assegna al flusso di lavoro un **Nome**.
4. Facoltativamente, assegna una **Categoria** per raggruppare i flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
5. Lascia il flusso di lavoro **Attivo** così le persone possono essere aggiunte, oppure impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta ai flussi di lavoro.
6. Fai clic su **Salva**.

:::tip
Usa il pulsante **Duplica** nell'elenco dei flussi di lavoro per copiare un flusso di lavoro esistente, inclusi i suoi passaggi, le azioni automatiche e l'instradamento, come punto di partenza per uno nuovo.
:::

## Costruire la bacheca con i passaggi {#building-the-board-with-steps}

Ogni bacheca di un flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Aggiungi passaggio** per creare ogni fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Nome del passaggio** -- l'intestazione della colonna (ad esempio "Chiamata di benvenuto" o "In attesa di iscrizione").
- **Scadenza tra (giorni)** -- imposta automaticamente una data di scadenza quando una scheda entra in questo passaggio. Le schede oltre la data di scadenza sono contrassegnate come **In ritardo**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui vengono assegnate automaticamente le nuove schede di questo passaggio. Quando l'assegnatario predefinito è una persona, questa riceve una notifica che una scheda le è stata assegnata.
- **Azioni automatiche** -- operazioni che il sistema esegue da solo quando una scheda arriva (vedi sotto).
- **Instradamento** -- dove va la scheda quando lascia il passaggio (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una scheda segue quando non si applica un altro instradamento.

:::info
Salva prima un nuovo passaggio. Le azioni automatiche e l'instradamento sono collegati al passaggio, quindi l'editor sblocca queste sezioni solo dopo che il passaggio esiste.
:::

## Azioni automatiche {#automated-actions}

Ogni passaggio può contenere un elenco di **azioni automatiche** che vengono eseguite da sole nel momento in cui una scheda **entra** nel passaggio, prima che qualcuno la tocchi. È così che un passaggio sollecita un volontario *e* si occupa delle attività di routine legate al follow-up.

Nell'editor del passaggio, apri **Azioni automatiche**, fai clic su **Aggiungi azione**, scegli un tipo, compila le sue impostazioni e fai clic sull'icona di salvataggio di quell'azione. Puoi aggiungerne quante ne servono; vengono eseguite **dall'alto verso il basso, in ordine**.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia alla persona un modello email a tua scelta. Puoi sostituire l'oggetto. |
| **Invia SMS** | Invia alla persona un messaggio che scrivi, tramite il [fornitore di SMS](../settings/church-settings.md#texting) della tua chiesa. |
| **Attesa** | Mette in pausa la scheda per un numero di giorni prima di continuare (vedi sotto). |
| **Aggiungi al gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Rimuovi dal gruppo** | Rimuove la persona da un gruppo che scegli. |
| **Aggiungi al flusso di lavoro** | Avvia la persona su un altro flusso di lavoro, utile per passare la persona tra processi diversi. |
| **Aggiungi nota** | Registra una nota nella cronologia della scheda. |
| **Imposta campo** | Aggiorna un campo nella scheda della persona: Stato di membro, Stato civile, Genere, Città, Provincia o CAP. |
| **Webhook** | Invia i dettagli della scheda a un indirizzo web esterno (URL) che fornisci, per collegarsi ad altri sistemi. |
| **Crea attività** | Crea un'[attività](./tasks.md) con il titolo e la descrizione che inserisci, assegnata alla persona che scegli. |

Dopo che tutte le azioni di un passaggio sono terminate, la scheda **resta su quel passaggio** così una persona può occuparsene, a meno che il passaggio non abbia un instradamento automatico che la sposta avanti (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatiche vengono eseguite solo quando una scheda arriva tramite il normale flusso, cioè quando viene aggiunta per la prima volta, quando un esito o un instradamento automatico la fa entrare, o dopo la fine di un'Attesa. **Non** vengono rieseguite quando un membro dello staff trascina manualmente una scheda nel passaggio o la rimanda indietro, quindi una persona non riceve la stessa email due volte.
:::

### Invio di email {#sending-email}

Scegli **Invia email**, seleziona uno dei tuoi modelli di email e, facoltativamente, scrivi un oggetto personalizzato. Quando una scheda entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email registrato, il passaggio salta semplicemente questa azione.) I [campi unione](../settings/email-templates.md#merge-fields) nel modello, come `{{firstName}}`, vengono sostituiti con i dati della persona.

:::info
Le email dei flussi di lavoro vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano nel limite giornaliero di email della chiesa. Consulta [Attivare le email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Invio di un SMS {#sending-a-text}

Scegli **Invia SMS** e scrivi il **Messaggio di testo** (fino a 1.600 caratteri). Quando una scheda entra nel passaggio, la persona riceve quell'SMS sul proprio telefono cellulare. Puoi personalizzare il messaggio con `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`, che vengono sostituiti con i dati della persona al momento dell'invio.

- Se la persona non ha un numero di cellulare registrato, non viene inviato alcun SMS e la cronologia della scheda registra **SMS saltato: nessun cellulare**.
- Se la persona ha annullato l'iscrizione, non viene inviato alcun SMS e la cronologia della scheda registra **SMS saltato: iscrizione annullata**.
- Quando l'SMS viene inviato, la cronologia della scheda registra **SMS inviato**. Se l'invio fallisce, ad esempio perché non è collegato alcun fornitore di SMS o perché la tua chiesa ha esaurito i crediti SMS, l'errore viene registrato nella cronologia della scheda e le azioni rimanenti del passaggio vengono comunque eseguite.

:::warning
Gli SMS vengono inviati tramite il [fornitore di SMS](../settings/church-settings.md#texting) della tua chiesa. Se non è collegato alcun fornitore, l'editor delle azioni mostra l'avviso *"Nessun fornitore di SMS configurato"* e gli SMS non verranno inviati.
:::

### Attendere alcuni giorni (sequenze drip) {#waiting-a-few-days-drip-sequences}

L'azione **Attesa** tiene una scheda per il numero di giorni che imposti. Mentre attende, la scheda è mostrata come **Posticipata**. B1 controlla le attese terminate ogni 30 minuti, quindi una scheda riprende entro circa mezz'ora dalla fine dell'attesa. Al termine dell'attesa:

1. Vengono eseguite le **eventuali azioni rimanenti dello stesso passaggio**, così puoi costruire una sequenza drip come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Poi, se il passaggio ha un instradamento automatico, la scheda avanza; altrimenti resta sul passaggio in attesa che una persona se ne occupi.

:::tip
Un'**Attesa** all'inizio di un passaggio è un modo semplice per "trattenere" una scheda prima che arrivi a un volontario, ad esempio *Attendi 7 giorni, poi un coach contatta la persona*.
:::

## Aggiungere persone come schede {#adding-people-as-cards}

Ci sono diversi modi per inserire persone su una bacheca:

- **Dalla bacheca** -- Fai clic su **Aggiungi scheda** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo, e ogni membro del gruppo viene aggiunto come scheda.
- **Dalla scheda di una persona** -- Usa **Aggiungi al flusso di lavoro** nella pagina di una persona per inserirla in un flusso di lavoro.
- **Dalla ricerca Persone** -- Seleziona più persone e usa l'azione di massa **Aggiungi al flusso di lavoro** per aggiungerle tutte insieme.
- **Automaticamente con un trigger** -- Aggiungi persone quando accade qualcosa, come l'invio di un modulo o un primo dono (vedi [Trigger](#triggers) più sotto).

## Lavorare sulla bacheca {#working-the-board}

Apri un flusso di lavoro per vedere la sua bacheca. Ogni scheda mostra il nome della persona, a chi è assegnata e un'etichetta con la scadenza o lo stato (**In ritardo** o **Posticipata**). Una colonna di passaggio mostra anche piccoli badge per le azioni automatiche che esegue e annotazioni per il suo instradamento, offrendoti una mappa immediata di come si muovono le schede.

- **Sposta una scheda** -- Trascina una scheda da una colonna alla successiva man mano che la persona avanza.
- **Apri una scheda** -- Fai doppio clic su una scheda (o fai clic su di essa) per aprire il suo pannello dei dettagli, dove puoi cambiare il passaggio, riassegnarla, aggiungere note e vedere cosa è già successo.

Dal pannello della scheda puoi:

- **Assegnare** la scheda a un'altra persona o a un altro gruppo.
- **Posticipare** la scheda di 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua scadenza.
- **Rimandare indietro** al passaggio precedente oppure **Saltare** al passaggio successivo.
- **Blocca assegnatario** -- mantieni lo stesso responsabile sulla scheda anche quando si sposta tra i passaggi. Per impostazione predefinita, spostare una scheda in un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; bloccare l'assegnazione mantiene la persona attuale responsabile per tutto il percorso.
- **Completare** la scheda per concluderla, oppure scegliere un pulsante **Esito** se il passaggio ha esiti configurati (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).
- **Aggiungere note** e consultare l'**Attività** della scheda, un registro delle azioni automatiche eseguite (email inviate, attese, ecc.).

Per una scheda relativa a una persona, il pannello mostra anche il cellulare e l'email della persona come link su cui puoi fare clic per chiamarla o scriverle, più un link **Visualizza profilo** se hai il permesso di visualizzare le persone. La persona a cui è assegnata la scheda vede il telefono e l'email anche senza accesso a Persone.

Le note vengono salvate con la scheda. Chiunque possa aprire la scheda, incluso la persona o il gruppo a cui è assegnata, può leggere le note e aggiungere le proprie. Chi non può aprire la scheda non vede le sue note.

### Azioni di massa {#bulk-actions}

Seleziona le caselle di più schede per agire su di esse insieme. Compare una barra degli strumenti che ti permette di **Completare**, **Posticipare**, **Assegnare** (riassegnare) o **Sposta in…** un altro passaggio per tutte le schede selezionate contemporaneamente.

## Instradare le schede con esiti e condizioni {#routing-cards-with-outcomes-and-conditions}

L'instradamento controlla dove va una scheda quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di instradamento.

### Pulsanti di esito {#outcome-buttons}

Gli esiti sono pulsanti mostrati nel pannello della scheda quando completi una scheda in quel passaggio. Invece di un unico pulsante **Completa**, puoi offrire scelte come "Ha aderito a un gruppo" o "Non interessato". Ogni esito può:

- Inviare la scheda a **un altro passaggio** di questo flusso di lavoro,
- **Passare la scheda** a un flusso di lavoro diverso, oppure
- **Chiudere** la scheda.

In questo modo una sola decisione può far seguire alla persona percorsi diversi.

### Instradamento automatico (condizionale) {#automatic-routing-conditional}

Gli instradamenti automatici spostano una scheda in avanti **nel momento stesso in cui entra in un passaggio** (e dopo il termine delle sue azioni automatiche), senza che nessuno clicchi, se la persona soddisfa un insieme di condizioni. Aggiungi un instradamento, scegli il passaggio di destinazione e definisci una o più **condizioni** (ad esempio il campus, l'età o lo stato di membro di una persona). I campi di testo possono essere confrontati esattamente oppure con **contiene**, **inizia con** o **finisce con**. Un instradamento senza condizioni vale per tutti.

Se le condizioni di un instradamento non possono essere verificate per qualche motivo, quell'instradamento viene considerato non corrispondente. La scheda resta sul passaggio (oppure segue un altro instradamento che corrisponde) invece di rimanere bloccata.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo instradamento, ad esempio un'etichetta di esito o "se corrisponde" seguito da una freccia verso il passaggio o il flusso di lavoro di destinazione.
:::

## Passaggi completamente automatizzati {#fully-automated-steps}

Puoi far funzionare un passaggio interamente da solo, senza che nessuno se ne occupi. Dai al passaggio le sue **azioni automatiche** e aggiungi un **instradamento automatico** (senza condizioni) verso il passaggio successivo. Quando una scheda entra, le azioni vengono eseguite e poi l'instradamento la fa avanzare immediatamente: la scheda attraversa il passaggio senza fermarsi.

:::tip
Combinalo con **Attesa**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Telefonata personale"*. L'email e i tempi sono gestiti per te, e un volontario vede la scheda solo quando è il momento del contatto umano.
:::

## Trigger {#triggers}

I trigger aggiungono automaticamente persone a un flusso di lavoro quando accade qualcosa, così non devi mai aggiungere le schede a mano. Su una bacheca di un flusso di lavoro, fai clic sulla scheda **Trigger**, poi su **Aggiungi trigger**. Ci sono due tipi:

### Trigger di evento {#event-triggers}

Si attivano non appena un record cambia in B1. Scegli l'evento, poi, facoltativamente, aggiungi **condizioni** in modo che vengano aggiunte solo le persone corrispondenti:

- **Persona · Creata / Aggiornata** -- ad esempio, aggiungi chiunque il cui stato diventi *Visitatore*.
- **Donazione · Creata** -- ad esempio, aggiungi un primo dono o un dono importante a un flusso di ringraziamento (confronta per importo, fondo o metodo).
- **Gruppo · Membro aggiunto** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invii un modulo scelto (ottimo per una scheda "Sono nuovo" o "Connettiti").

### Trigger pianificati {#schedule-triggers}

Vengono eseguiti su base ricorrente (giornaliera, settimanale, mensile o annuale) in base a un insieme di condizioni. Usali per contatti periodici come *tutti quelli il cui anniversario di membership è oggi* o un controllo *mensile*.

Per qualsiasi trigger puoi anche impostare:

- Il **Passaggio iniziale** su cui atterra la nuova scheda (per impostazione predefinita il primo passaggio).
- **Solo una volta per persona** -- così la stessa persona non viene aggiunta due volte al flusso di lavoro dal trigger.
- **Attivo** -- attiva o disattiva il trigger senza eliminarlo.

:::tip
Abbina un trigger **Modulo · Inviato** al modello **Follow-up per un nuovo visitatore** per trasformare la tua scheda "Connect" o "Sono nuovo" in una pipeline di follow-up automatica.
:::

## Le mie schede {#my-cards}

I volontari e il personale non devono cercare tra ogni bacheca per trovare il proprio lavoro. L'elenco **Le mie schede** nella pagina **Il mio lavoro** mostra ogni scheda assegnata all'utente corrente in tutti i flussi di lavoro. Per arrivarci, fai clic su **Le mie schede** in alto nella pagina Flussi di lavoro, oppure apri **Servizio > Il mio lavoro** nel menu Jump. Facendo clic su una scheda si apre la bacheca a cui appartiene.

## Report {#reports}

Apri un flusso di lavoro e fai clic su **Report** per vedere le analisi di quel flusso di lavoro:

- **In ritardo** -- il numero di schede oltre la data di scadenza.
- **Schede per passaggio** -- quante schede si trovano attualmente su ciascun passaggio, mostrate come grafico a colonne.
- **Completate (30 giorni)** -- il volume di lavoro degli ultimi 30 giorni, mostrato come grafico a linee.

Usali per individuare i colli di bottiglia, ad esempio un passaggio dove le schede si accumulano e non avanzano mai.

## Articoli correlati {#related-articles}

- [Attività](./tasks.md) -- le singole azioni su cui sono costruite le schede dei flussi di lavoro
- [Moduli](../forms/index.md) -- crea i moduli che possono avviare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui l'azione "Aggiungi al gruppo" può inserire le persone
- [Ruoli e permessi](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
