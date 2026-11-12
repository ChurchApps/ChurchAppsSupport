---
title: "Flussi di lavoro"
description: "Crea bacheche in stile Kanban in B1 Admin per accompagnare le persone attraverso i passaggi di follow-up, con email e SMS automatici e attivatori che aggiungono le persone in automatico."
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro fanno avanzare le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una scheda che passa da un passaggio al successivo -- dal follow-up di un ospite alla prima visita, a un percorso di iscrizione, a un ringraziamento per il primo dono, e qualsiasi altro caso in cui devi seguire molte persone attraverso le stesse fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una telefonata, avere una conversazione) **e** eseguire da solo azioni automatiche -- inviare un'email o un SMS, attendere qualche giorno, aggiungere la persona a un gruppo -- così i flussi di lavoro gestiscono sia il follow-up umano sia le incombenze che lo circondano. I flussi di lavoro estendono le [Attività](./tasks.md) in una bacheca Kanban con trascinamento, così nessuno e nulla va perso.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che vuoi seguire esistano in B1 Admin
- Familiarizzati con il funzionamento delle [Attività](./tasks.md), perché ogni scheda di una bacheca è un'attività
- Per usare l'azione **Invia email**, crea prima i modelli di email che vuoi inviare (si gestiscono in **Impostazioni → Modelli di email**)
- Per usare l'azione **Invia SMS**, collega prima un [fornitore di SMS](../settings/church-settings.md#texting)
- Ti serve la relativa autorizzazione per le Attività. Visualizzare, modificare le schede e gestire i flussi di lavoro sono livelli di autorizzazione separati (vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md))

</div>

## Visualizzare i flussi di lavoro {#viewing-workflows}

Apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Servizio** e fai clic su **Flussi di lavoro**. I tuoi flussi di lavoro sono elencati in una tabella che mostra per ciascuno la **Categoria** e lo **Stato** (**Attivo** oppure **Inattivo**). Se usi le categorie, le schede sopra l'elenco ti permettono di filtrarlo per categoria. Fai clic su un flusso di lavoro qualsiasi per aprire la sua bacheca.

## Creare un flusso di lavoro {#creating-a-workflow}

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso di lavoro vuoto** -- parti da zero e costruisci i tuoi passaggi.
   - **Da un modello** -- parti da un insieme di passaggi già pronto che puoi modificare. I modelli integrati includono:
     - **Follow-up nuovo visitatore** -- Invia email di benvenuto → Telefonata personale → Invito al passaggio successivo → Connesso
     - **Corso di iscrizione** -- Manifesta interesse → Iscriviti al corso → Partecipa al corso → Completa l'iscrizione
     - **Ringraziamento al primo donatore** -- Invia biglietto di ringraziamento → Condividi l'impatto della donazione → Amministrato
     - **Conferma assegnazione di servizio** -- Invia la richiesta e attendi risposta → Telefona al volontario per la richiesta senza risposta (vedi [Conferme delle assegnazioni di servizio](#serving-assignment-confirmations))

   Costruire i passaggi di un modello può richiedere un momento. Mentre lavora, il pulsante **Aggiungi flusso di lavoro** riporta **Creazione in corso...** e non può essere cliccato di nuovo, così non finirai per creare un duplicato. Se qualcosa va storto, la pagina mostra *"Impossibile creare il flusso di lavoro. Riprova."*
3. Assegna al flusso di lavoro un **Nome**.
4. Se vuoi, assegna una **Categoria** per raggruppare i flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
   Per un flusso di lavoro vuoto, scegli anche la sua **Finalità**: **Follow-up delle persone** (il tipo abituale) oppure **Conferma assegnazione di servizio**. La finalità non può essere modificata dopo la creazione del flusso di lavoro.
5. Lascia il flusso di lavoro **Attivo** così che le persone possano esserci aggiunte, oppure impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta ai flussi di lavoro.
6. Fai clic su **Salva**.

:::tip
Usa il pulsante **Duplica** nell'elenco dei Flussi di lavoro per copiare un flusso di lavoro esistente -- inclusi i suoi passaggi, le azioni automatiche e l'instradamento -- come punto di partenza per uno nuovo.
:::

## Costruire la bacheca con i passaggi {#building-the-board-with-steps}

Ogni bacheca di un flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Aggiungi passaggio** per creare ogni fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Nome passaggio** -- l'intestazione della colonna (ad esempio, "Telefonata di benvenuto" oppure "In attesa di iscrizione").
- **Scadenza tra (giorni)** -- imposta automaticamente una data di scadenza quando una scheda entra in questo passaggio. Le schede oltre la data di scadenza vengono contrassegnate come **In ritardo**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui vengono assegnate automaticamente le nuove schede di questo passaggio. Quando l'assegnatario predefinito è una persona, riceve una notifica che una scheda le è stata assegnata.
- **Azioni automatiche** -- operazioni che il sistema esegue da solo quando una scheda arriva (vedi sotto).
- **Instradamento** -- dove va la scheda quando lascia il passaggio (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una scheda segue quando non si applica nessun altro instradamento.

:::info
Salva prima un nuovo passaggio. Le azioni automatiche e l'instradamento sono collegati al passaggio, quindi l'editor sblocca quelle sezioni solo quando il passaggio esiste.
:::

## Azioni automatiche {#automated-actions}

Ogni passaggio può contenere un elenco di **azioni automatiche** che vengono eseguite da sole nel momento in cui una scheda **entra** nel passaggio -- prima che qualcuno la tocchi. È così che un passaggio sollecita un volontario *e* si occupa del lavoro di routine intorno al follow-up.

Nell'editor del passaggio, apri **Azioni automatiche**, fai clic su **Aggiungi azione**, scegli un tipo e compila le sue impostazioni. Aggiungine quante ne servono: vengono eseguite **dall'alto verso il basso, in ordine**. Fai clic su **Salva** nel passaggio per salvare insieme il passaggio e tutte le sue azioni. Rimuovere un'azione con la sua icona del cestino ha effetto immediato.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia alla persona un modello di email a tua scelta. Puoi sostituire la riga dell'oggetto. |
| **Invia SMS** | Invia alla persona un messaggio che scrivi, tramite il [fornitore di SMS](../settings/church-settings.md#texting) della tua chiesa. |
| **Attesa** | Mette in pausa la scheda per un numero di giorni prima di proseguire (vedi sotto). |
| **Aggiungi a gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Rimuovi da gruppo** | Rimuove la persona da un gruppo che scegli. |
| **Registra presenza** | Segna la persona come presente all'orario di servizio in corso di un gruppo (vedi sotto). |
| **Aggiungi a flusso di lavoro** | Avvia la persona su un altro flusso di lavoro -- utile per passare la persona da un processo all'altro. |
| **Aggiungi nota** | Registra una nota nello storico della scheda. |
| **Imposta campo** | Aggiorna un campo nella scheda della persona: Stato di appartenenza, Stato civile, Genere, Città, Provincia o CAP. |
| **Webhook** | Invia i dettagli della scheda a un indirizzo web esterno (URL) che fornisci, per collegarsi ad altri sistemi. |
| **Crea attività** | Crea un'[attività](./tasks.md) con il titolo e la descrizione che inserisci, assegnata a chi scegli. |
| **Notifica persona** | Invia a un membro dello staff o a un volontario che scegli un'email e una notifica di B1 sulla scheda (vedi sotto). |

Dopo che tutte le azioni di un passaggio sono terminate, la scheda **resta su quel passaggio** così che una persona possa occuparsene -- a meno che il passaggio non abbia un instradamento automatico che la sposta più avanti (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatiche vengono eseguite solo quando una scheda arriva attraverso il flusso normale -- quando viene aggiunta per la prima volta, quando un esito o un instradamento automatico la porta nel passaggio, oppure al termine di un'Attesa. **Non** vengono rieseguite quando un membro dello staff trascina manualmente una scheda nel passaggio o la rimanda indietro, così una persona non riceve la stessa email due volte.
:::

### Inviare email {#sending-email}

Scegli **Invia email**, seleziona uno dei tuoi modelli di email e, se vuoi, digita un oggetto personalizzato. Quando una scheda entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email registrato, il passaggio salta semplicemente questa azione.) I [campi unione](../settings/email-templates.md#merge-fields) del modello, come `{{firstName}}`, vengono compilati con i dati della persona. Se un attivatore **Donazione · Creata** ha avviato il flusso di lavoro, i campi della donazione `{{amount}}`, `{{giftDate}}`, `{{fund}}` e `{{receipt}}` vengono compilati con i dati di quella donazione, anche nei passaggi che vengono eseguiti dopo un'Attesa. Vedi [Campi unione delle donazioni](../settings/email-templates.md#gift-merge-fields).

Quando l'email viene inviata, lo storico della scheda registra **Email inviata**. Se non può essere inviata -- ad esempio perché l'email della tua chiesa non è ancora stata approvata oppure è stato raggiunto il limite giornaliero -- non viene aggiunta alcuna voce "Email inviata".

:::info
Le email dei flussi di lavoro vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano nel limite giornaliero di email della chiesa. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). L'azione **Invia email** ti avvisa nell'editor del passaggio quando queste email non verranno inviate: *"L'email della tua chiesa non è ancora stata approvata..."* se l'approvazione è ancora in attesa, oppure *"L'email della tua chiesa è sospesa..."* se i messaggi recenti sono stati rimbalzati o segnalati come spam.
:::

### Registrare la presenza {#recording-attendance}

Scegli **Registra presenza** e fai clic su **Scegli gruppo** per selezionare il gruppo di cui registrare la presenza. Quando l'azione viene eseguita, la persona viene segnata come presente all'orario di servizio in corso di quel gruppo -- esattamente come se avesse fatto il check-in. È utile insieme a un attivatore che aggiunge le persone al flusso di lavoro man mano che arrivano, così vengono conteggiate senza un check-in separato.

- La presenza viene misurata nel momento in cui la scheda è stata **creata**, quindi un'**Attesa** precedente nel flusso di lavoro non la sposta oltre la durata del servizio.
- Contano solo gli orari di servizio con un giorno e un orario di inizio. Se in quel momento nessun orario di servizio del gruppo è in corso, non viene registrato nulla e lo storico della scheda riporta **Nessun servizio programmato in corso -- presenza non registrata**.
- Quando la presenza viene registrata, lo storico della scheda mostra **Presenza registrata** seguito dal nome del gruppo. Eseguire di nuovo l'azione per lo stesso servizio non conta due volte la stessa persona.

### Notificare una persona {#notifying-a-person}

Scegli **Notifica persona**, fai clic su **Scegli persona** e, se vuoi, digita un **Messaggio**. Quando una scheda entra nel passaggio, quella persona riceve un'email e una notifica di B1 con il nome della persona nella scheda, i nomi del flusso di lavoro e del passaggio, il tuo messaggio e un collegamento per aprire la scheda. Usala per avvisare con anticipo un membro dello staff o un responsabile del ministero -- ad esempio, *"Avvisa il pastore quando qualcuno raggiunge il passaggio Colloquio per l'iscrizione."* Lo storico della scheda registra **Notificato** seguito dal nome della persona.

### Inviare un SMS {#sending-a-text}

Scegli **Invia SMS** e digita il **Messaggio di testo** (fino a 1.600 caratteri). Se la tua chiesa ha salvato dei [modelli di testo](../settings/email-templates.md), sopra la casella compare un elenco **Inizia da un modello**. Scegliendone uno, il testo del modello viene copiato nel messaggio, che puoi comunque modificare. Il passaggio mantiene una propria copia, quindi le modifiche successive al modello non cambiano il passaggio. Quando una scheda entra nel passaggio, la persona riceve quel messaggio sul cellulare. Per personalizzare il messaggio, fai clic su un'etichetta sotto la casella del messaggio -- **Nome**, **Cognome**, **Nome visualizzato** oppure **Nome della chiesa** -- per inserire `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}` nel punto del cursore. Ognuno viene compilato con i dati della persona quando l'SMS viene inviato. Le etichette **Importo**, **Data donazione**, **Fondo** e **Ricevuta** inseriscono i campi della donazione, che vengono compilati solo quando un attivatore **Donazione · Creata** ha avviato il flusso di lavoro. Ad esempio: `Thanks {{firstName}} for your gift of {{amount}} to {{fund}}!`

- Se la persona non ha un cellulare registrato, non viene inviato alcun SMS e lo storico della scheda registra **SMS saltato: nessun cellulare**.
- Se la persona ha annullato l'iscrizione, non viene inviato alcun SMS e lo storico della scheda registra **SMS saltato: disiscritto**.
- Quando l'SMS viene inviato, lo storico della scheda registra **SMS inviato**. Se l'invio fallisce -- ad esempio perché non è collegato alcun fornitore di SMS oppure la tua chiesa ha esaurito i crediti -- l'errore viene registrato nello storico della scheda e le restanti azioni del passaggio vengono comunque eseguite.

:::warning
Gli SMS vengono inviati tramite il [fornitore di SMS](../settings/church-settings.md#texting) della tua chiesa. Se non è collegato alcun fornitore, l'editor dell'azione mostra l'avviso *"Nessun fornitore di SMS configurato"* e gli SMS non verranno inviati.
:::

### Attendere alcuni giorni (sequenze programmate) {#waiting-a-few-days-drip-sequences}

L'azione **Attesa** trattiene una scheda per il numero di giorni che imposti. Mentre attende, la scheda compare come **Posticipata**. B1 controlla le attese terminate ogni 30 minuti, quindi una scheda riprende entro circa mezz'ora dal termine dell'attesa. Quando l'attesa è finita:

1. Vengono eseguite le **azioni rimanenti dello stesso passaggio** -- così puoi costruire una sequenza come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Poi, se il passaggio ha un instradamento automatico, la scheda prosegue; altrimenti resta sul passaggio in attesa che una persona la prenda in carico.

:::tip
Un'**Attesa** all'inizio di un passaggio è un modo semplice per "trattenere" una scheda prima che arrivi a un volontario -- ad esempio, *Attendi 7 giorni, poi un coach si mette in contatto*.
:::

## Aggiungere persone come schede {#adding-people-as-cards}

Ci sono diversi modi per mettere le persone su una bacheca:

- **Dalla bacheca** -- Fai clic su **Aggiungi scheda** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo, e ogni membro di quel gruppo viene aggiunto come scheda.
- **Dalla scheda di una persona** -- Usa **Aggiungi a flusso di lavoro** nella pagina di una persona per inserirla in un flusso di lavoro.
- **Dalla ricerca Persone** -- Seleziona più persone e usa l'azione multipla **Aggiungi a flusso di lavoro** per aggiungerle tutte insieme.
- **Automaticamente con un attivatore** -- Aggiungi persone quando succede qualcosa, come l'invio di un modulo o un primo dono (vedi [Attivatori](#triggers) più sotto).

Aggiungere una persona a mano, oppure con un'azione del passaggio **Aggiungi a flusso di lavoro**, non le assegna mai una seconda scheda aperta nello stesso flusso di lavoro. Se ha già una scheda aperta, viene saltata (in un'aggiunta multipla, solo le persone senza scheda ricevono una nuova scheda). Una volta chiusa la scheda, puoi aggiungerla di nuovo. Gli attivatori seguono invece la propria impostazione **Solo una volta per persona**.

## Lavorare sulla bacheca {#working-the-board}

Apri un flusso di lavoro per vedere la sua bacheca. Ogni scheda mostra il nome della persona, a chi è assegnata e un'etichetta con la scadenza o lo stato (**In ritardo** oppure **Posticipata**). Una colonna di passaggio mostra anche piccole etichette per le azioni automatiche che esegue e annotazioni per il suo instradamento, offrendoti una mappa a colpo d'occhio di come si muovono le schede. All'interno di ogni colonna, la scheda entrata più di recente nel passaggio si trova in cima.

- **Sposta una scheda** -- Trascina una scheda dalla colonna corrente a quella successiva man mano che la persona avanza.
- **Apri una scheda** -- Fai doppio clic su una scheda (oppure fai clic) per aprire il suo pannello dei dettagli, dove puoi cambiare passaggio, riassegnarla, aggiungere note e rivedere ciò che è già successo.

Dal pannello della scheda puoi:

- **Assegnare** la scheda a un'altra persona o a un altro gruppo.
- **Posticipare** la scheda di 1 giorno, 3 giorni o 1 settimana per nasconderne temporaneamente la scadenza.
- **Rimandare indietro** la scheda al passaggio precedente oppure **Saltare** al passaggio successivo.
- **Blocca assegnazione** -- mantiene lo stesso responsabile sulla scheda anche quando si sposta tra i passaggi. Per impostazione predefinita, spostare una scheda in un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; il blocco mantiene la persona attuale responsabile per tutto il percorso.
- **Completare** la scheda per chiuderla, oppure scegliere un pulsante di **Esito** se il passaggio ha degli esiti configurati (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).
- **Rimuovi scheda** -- toglie una scheda dalla bacheca senza completarla, ad esempio quando qualcuno è stato aggiunto per errore. Dopo la conferma, la scheda viene chiusa e rimossa dall'elenco di tutti. Non viene eseguito alcun esito, percorso o azione del passaggio, e lo storico viene conservato con una voce **Rimossa**. Per una scheda di [conferma di un'assegnazione di servizio](#serving-assignment-confirmations), rimuoverla chiude la richiesta nello stesso modo.
- **Aggiungere note** e rivedere l'**Attività** della scheda -- un registro delle azioni automatiche eseguite (email inviate, attese e così via), ciascuna con la data e l'ora in cui è avvenuta.

Per una scheda relativa a una persona, il pannello mostra anche il cellulare e l'email di quella persona come collegamenti su cui puoi fare clic per chiamarla o scriverle, insieme a un collegamento **Visualizza profilo** se hai l'autorizzazione per vedere le persone. La persona a cui è assegnata la scheda vede il telefono e l'email anche senza accesso alle Persone.

Le note vengono salvate con la scheda. Chiunque possa aprire la scheda -- compresa la persona o il gruppo a cui è assegnata -- può leggere le note e aggiungerne di proprie. Chi non può aprire la scheda non ne vede le note.

### Azioni multiple {#bulk-actions}

Seleziona le caselle di più schede per agire su di esse insieme. Per selezionare tutte le schede di un passaggio in una volta, spunta la casella **Seleziona tutto** nell'intestazione della colonna di quel passaggio; spuntala di nuovo per deselezionarle. Compare una barra degli strumenti che ti permette di **Completare**, **Posticipare**, **Assegnare** (riassegnare) oppure **Sposta in…** un altro passaggio per tutte le schede selezionate contemporaneamente.

## Instradare le schede con esiti e condizioni {#routing-cards-with-outcomes-and-conditions}

L'instradamento controlla dove va una scheda quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di instradamento.

### Pulsanti di esito {#outcome-buttons}

Gli esiti sono pulsanti che compaiono nel pannello della scheda quando completi una scheda in quel passaggio. Invece di un unico pulsante **Completa**, puoi offrire scelte come "Si è unito a un gruppo" oppure "Non interessato". Ogni esito può:

- Inviare la scheda a **un altro passaggio** di questo flusso di lavoro,
- **Passare la scheda** a un flusso di lavoro diverso, oppure
- **Chiudere** la scheda.

In questo modo una sola decisione può indirizzare la persona su percorsi diversi.

### Instradamento automatico (condizionale) {#automatic-routing-conditional}

Gli instradamenti automatici spostano una scheda in avanti **nel momento stesso in cui entra in un passaggio** (e dopo che le sue azioni automatiche sono terminate), senza che nessuno clicchi, se la persona corrisponde a un insieme di condizioni. Aggiungi un instradamento, scegli il passaggio di destinazione e definisci una o più **condizioni** (ad esempio, il campus, l'età o lo stato di appartenenza di una persona). I campi di testo possono corrispondere in modo esatto oppure con **contiene**, **inizia con** o **finisce con**. Un instradamento senza condizioni corrisponde a tutti.

Le condizioni sulle date (Data odierna, Data di nascita o Anniversario) possono confrontare la data completa oppure solo una sua parte -- il giorno della settimana, il **Giorno del mese**, il **Mese** oppure gli anni trascorsi. Per la Data di nascita o l'Anniversario di una persona, **Giorno del mese** offre un'opzione relativa **Oggi**, così una condizione come *Data di nascita · Giorno del mese = Oggi* corrisponde alle persone il cui compleanno cade nel giorno del mese di oggi. **Mese** offre **Mese precedente**, **Mese corrente** e **Mese successivo**. Valori relativi come questi vengono calcolati con il fuso orario della tua chiesa, così corrispondono al giorno del calendario della chiesa e non a quello del server.

Il gruppo di condizioni **Donazioni** include **Donatore abituale in calo**, che individua le persone che donavano regolarmente e poi hanno smesso. Imposta tre numeri: *Ha donato in almeno* **3** *delle ultime* **12** *settimane, poi nulla nelle ultime* **3** *settimane* (questi sono i valori predefiniti). Le settimane sono conteggiate a ritroso da oggi nel fuso orario della tua chiesa, e una donazione rimborsata non viene conteggiata. È particolarmente utile con un [attivatore a pianificazione](#schedule-triggers) -- ad esempio, una regola settimanale che aggiunge i donatori in calo a una bacheca di cura pastorale. La condizione considera solo le date delle donazioni, mai gli importi, e schede e avvisi non mostrano mai gli importi. Poiché rivela chi ha smesso di donare, questa opzione è visibile e può essere aggiunta, modificata o rimossa solo da chi può visualizzare le donazioni.

Se le condizioni di un instradamento non possono essere verificate per qualche motivo, quell'instradamento viene considerato non corrispondente. La scheda resta sul passaggio (oppure segue un altro instradamento che corrisponde) invece di restare bloccata.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo instradamento -- ad esempio un'etichetta di esito oppure "se corrisponde" seguito da una freccia verso il passaggio o il flusso di lavoro di destinazione.
:::

## Passaggi completamente automatizzati {#fully-automated-steps}

Puoi far eseguire a un passaggio un'azione interamente da solo, senza che nessuno ci lavori. Assegna al passaggio le sue **azioni automatiche** e aggiungi un **instradamento automatico** (senza condizioni) che punta al passaggio successivo. Quando una scheda entra, le azioni vengono eseguite e poi l'instradamento la fa avanzare immediatamente -- la scheda passa direttamente oltre.

:::tip
Combinalo con **Attesa**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Telefonata personale"*. L'email e i tempi sono gestiti per te, e un volontario vede la scheda solo quando è il momento del contatto umano.
:::

## Attivatori {#triggers}

Gli attivatori aggiungono automaticamente le persone a un flusso di lavoro quando succede qualcosa, così non devi mai aggiungere schede a mano. Su una bacheca di un flusso di lavoro, fai clic sulla scheda **Attivatori**, poi su **Aggiungi attivatore**. Ci sono due tipi:

### Attivatori di evento {#event-triggers}

Si attivano non appena un dato cambia in B1. Scegli l'evento e, se vuoi, aggiungi **condizioni** in modo che vengano aggiunte solo le persone corrispondenti:

- **Persona · Creata / Aggiornata** -- ad esempio, aggiungi chiunque il cui stato diventa *Visitatore* o *Ospite* (lo stato assegnato alle persone che si registrano da sole).
- **Donazione · Creata** -- ad esempio, aggiungi un primo dono o un dono importante a un flusso di ringraziamento (corrispondenza per importo, fondo o metodo).
- **Gruppo · Membro aggiunto** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invii un modulo scelto (ottimo per una scheda "Sono nuovo" o "Connessione").

### Attivatori a pianificazione {#schedule-triggers}

Vengono eseguiti periodicamente -- ogni giorno, ogni settimana, ogni mese o ogni anno -- in base a un insieme di condizioni. Usali per iniziative legate al tempo, come *tutti quelli il cui compleanno è oggi* (Data di nascita · Giorno del mese = **Oggi**, con il mese corrispondente a **Mese corrente**) oppure un controllo *mensile*. Anche senza **Solo una volta per persona**, un attivatore a pianificazione non aggiunge di nuovo la stessa persona nello stesso periodo di ripetizione (un giorno, una settimana, un mese o un anno, a seconda della frequenza con cui viene eseguito).

Per qualsiasi attivatore puoi anche impostare:

- Il **Passaggio iniziale** su cui atterra la nuova scheda (per impostazione predefinita il primo passaggio).
- **Solo una volta per persona** -- così la stessa persona non viene aggiunta due volte al flusso di lavoro dall'attivatore. Con questa opzione attiva, chiunque abbia già una scheda in questo flusso di lavoro viene saltato.
  - **Aggiungi di nuovo dopo la chiusura della scheda** -- compare quando **Solo una volta per persona** è attiva. Selezionala per permettere all'attivatore di aggiungere di nuovo una persona una volta chiusa la sua precedente scheda in questo flusso di lavoro. Una persona non avrà mai due schede aperte contemporaneamente nel flusso di lavoro. Usalo per situazioni che possono ripetersi più volte, come un ospite che torna o un processo annuale.
- **Attivo** -- attiva o disattiva l'attivatore senza eliminarlo.

:::tip
Abbina un attivatore **Modulo · Inviato** al modello **Follow-up nuovo visitatore** per trasformare la tua scheda "Connessione" o il modulo "Sono nuovo" in una pipeline di follow-up automatica.
:::

## Conferme delle assegnazioni di servizio {#serving-assignment-confirmations}

Un tipo speciale di flusso di lavoro può seguire le [richieste di servizio](./plans.md#assigning-team-members) finché ogni volontario non accetta o rifiuta. Invece delle persone, ogni scheda di questa bacheca tiene traccia di **un'assegnazione** -- una persona in una posizione su un piano. Due ruoli o due servizi per la stessa persona hanno schede separate. È una funzione facoltativa: non cambia nulla per un piano finché non selezioni un flusso di lavoro di conferma nelle sue impostazioni.

### Come configurarne uno {#setting-one-up}

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro** e scegli il modello **Conferma assegnazione di servizio**. (Oppure parti da un **Flusso di lavoro vuoto** e imposta la sua **Finalità** su **Conferma assegnazione di servizio**.) Creare dal modello richiede l'autorizzazione per inviare SMS, perché include un passaggio di SMS.
2. Controlla i passaggi. Il modello inizia con:
   - **Invia la richiesta e attendi risposta** -- invia la richiesta di servizio via email e via SMS, attende 2 giorni, invia un'email di promemoria, attende ancora 1 giorno, poi sposta automaticamente la scheda avanti.
   - **Telefona al volontario per la richiesta senza risposta** -- un passaggio in cui una persona telefona al volontario, con scadenza tra 1 giorno. Imposta un **Assegnatario predefinito** su questo passaggio. Se non ne ha uno, la scheda va al responsabile del ministero, oppure al team del ministero se non ce n'è uno.
3. Modifica attese, messaggi e passaggi in base alle esigenze della tua chiesa.
4. Apri le [impostazioni di un piano](./plans.md#plan-settings) e scegli questo flusso di lavoro in **Flusso di conferma**.

Questi flussi di lavoro usano un'azione **Invia richiesta di servizio** al posto di **Invia email** e **Invia SMS**. Scegli **Email** oppure **Messaggio di testo** e, se vuoi, scrivi un **Messaggio di richiesta**. La richiesta include sempre il ruolo, il piano, la data del servizio e un collegamento per rispondere; nel tuo messaggio puoi usare `{{planName}}`, `{{positionName}}` e `{{serviceDate}}`. Lascia vuoto il messaggio per usare la richiesta predefinita. Valgono le preferenze di notifica dei volontari, il loro consenso agli SMS, il tuo fornitore di SMS e l'approvazione della tua chiesa per le email, e ogni tentativo saltato o bloccato viene registrato sulla scheda. Le azioni **Invia email**, **Invia SMS** e **Aggiungi a flusso di lavoro** non sono disponibili su queste bacheche.

La scheda **Attivatori** di un flusso di lavoro di conferma spiega come vengono avviate le schede invece di offrire attivatori, e questi flussi di lavoro non compaiono negli elenchi **Aggiungi a flusso di lavoro** delle persone.

### Come vengono avviate e chiuse le schede {#how-cards-are-started-and-closed}

- Le schede partono quando **notifichi** i volontari di un piano pubblicato (vedi [Notificare i volontari](./plan-validation.md#notifying-volunteers)). Ogni nuova assegnazione senza risposta ottiene una scheda. Salvare, pubblicare, copiare o riempire automaticamente un piano non contatta nessuno da solo, e i piani in bozza non inviano nulla.
- I volontari ricevono comunque il consueto avviso nell'app. Il follow-up via email e SMS arriva dal flusso di lavoro.
- Quando il volontario **accetta o rifiuta**, la sua scheda si chiude automaticamente, insieme a eventuali attività di follow-up collegate.
- Il pannello della scheda mostra la posizione, la data del servizio e un collegamento al piano. Invece di **Completa**, il pulsante riporta **Registra follow-up effettuato**. Facendo clic, si registra che qualcuno ha fatto il follow-up, ma la scheda resta aperta e assegnata (mostrata come **In attesa di risposta**) finché il volontario non risponde o non scade il termine di risposta.
- Il termine di risposta è la fine dell'ultimo orario di servizio in cui il team della posizione presta servizio. Se il piano non ha orari corrispondenti, è la fine della giornata di servizio. Se nessuno ha risposto entro quel momento, la scheda si chiude con **Termine di risposta scaduto** e un'attività **Verifica richiesta di servizio senza risposta** va al responsabile attuale della scheda o al responsabile del ministero, così qualcuno può decidere come coprire il posto. L'assegnazione resta **Non confermata**.
- Rimuovere l'assegnazione, cambiarne la persona, la posizione o la data del piano, riportare il piano in bozza oppure passare il piano a un altro flusso di lavoro di conferma chiude la scheda. Una scheda chiusa non viene mai riaperta da un altro **Notifica**; per inviare una nuova richiesta, aggiungi una nuova assegnazione.

:::info
Per le richieste inviate tramite un flusso di lavoro di conferma, i [promemoria ai volontari](./plans.md#volunteer-reminders) vengono inviati solo ai volontari che hanno **accettato**, così le persone in attesa di risposta non ricevono promemoria in aggiunta ai solleciti del flusso di lavoro.
:::

## Le mie schede {#my-cards}

I volontari e lo staff non devono cercare tra tutte le bacheche per trovare il proprio lavoro. L'elenco **Le mie schede** nella pagina **Il mio lavoro** mostra ogni scheda assegnata all'utente corrente in tutti i flussi di lavoro. Per arrivarci, fai clic su **Le mie schede** in cima alla pagina Flussi di lavoro, oppure apri **Servizio > Il mio lavoro** nel menu di salto. Facendo clic su una scheda si apre il suo pannello dei dettagli direttamente nella pagina Il mio lavoro, dove puoi lavorarla o rimuoverla senza lasciare la pagina. Se puoi visualizzare i flussi di lavoro, il pannello include anche un collegamento **Apri bacheca del flusso di lavoro** alla bacheca a cui appartiene la scheda.

## Report {#reports}

Apri un flusso di lavoro e fai clic su **Report** per vedere le statistiche di quel flusso di lavoro:

- **In ritardo** -- il numero di schede oltre la data di scadenza.
- **Schede per passaggio** -- quante schede si trovano attualmente su ciascun passaggio, mostrate come grafico a colonne.
- **Completate (30 giorni)** -- la produttività degli ultimi 30 giorni, mostrata come grafico a linee.

Usali per individuare i colli di bottiglia -- ad esempio, un passaggio in cui le schede si accumulano senza mai avanzare.

## Articoli correlati {#related-articles}

- [Attività](./tasks.md) -- le singole azioni su cui si basano le schede dei flussi di lavoro
- [Moduli](../forms/index.md) -- crea i moduli che possono avviare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui un'azione "Aggiungi a gruppo" può inserire le persone
- [Piani di servizio](./plans.md) -- scegli un flusso di lavoro di conferma per le richieste di servizio di un piano
- [Ruoli e autorizzazioni](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
