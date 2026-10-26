---
title: "Flussi di lavoro"
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro fanno avanzare le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una scheda che si sposta da un passaggio al successivo -- da un follow-up per un primo ospite, a un percorso di adesione, a un ringraziamento per il primo donatore, e a qualsiasi altra situazione in cui devi seguire molte persone attraverso le stesse fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una telefonata, avere una conversazione) **e** eseguire da solo azioni automatiche -- inviare un'email o un SMS, attendere alcuni giorni, aggiungere la persona a un gruppo -- così i Flussi di lavoro gestiscono sia il follow-up umano sia le attività ripetitive che lo circondano. I flussi di lavoro estendono [Tasks](./tasks.md) con una bacheca Kanban con trascinamento, così nessuno resta indietro.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che vuoi seguire esistano in B1 Admin
- Familiarizza con il funzionamento di [Tasks](./tasks.md), perché ogni scheda in una bacheca è un'attività
- Per usare l'azione **Send email**, crea prima i modelli di email che vuoi inviare (gestiti in **Settings → Email Templates**)
- Per usare l'azione **Send text**, collega prima un [servizio di messaggistica](../settings/church-settings.md#texting)
- Ti serve il permesso Tasks appropriato. Visualizzare, modificare le schede e gestire i flussi di lavoro sono livelli di permesso separati (vedi [Ruoli e permessi](../settings/roles-permissions.md))

</div>

## Visualizzare i flussi di lavoro

Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Serving** e clicca su **Workflows**. I tuoi flussi di lavoro sono elencati in una tabella che mostra la **Category** e lo **Status** di ciascuno (**Active** o **Inactive**). Se usi le categorie, le schede sopra l'elenco ti permettono di filtrarlo per categoria. Clicca su un flusso di lavoro per aprirne la bacheca.

## Creare un flusso di lavoro

1. Nella pagina Workflows, clicca su **Add Workflow**.
2. Scegli come iniziare:
   - **Blank workflow** -- parti da zero e costruisci i tuoi passaggi.
   - **From a template** -- parti da un insieme di passaggi già pronto che puoi modificare. I modelli integrati includono:
     - **New Visitor Follow-up** -- Invia email di benvenuto → Telefonata personale → Invita al passo successivo → Connected
     - **Membership Class** -- Esprimi interesse → Iscriviti al corso → Partecipa al corso → Completa l'adesione
     - **First-time Giver Thank-you** -- Invia un biglietto di ringraziamento → Condividi l'impatto della donazione → Stewarded
     - **Serving Assignment Confirmation** -- Invia la richiesta e attendi risposta → Chiama il volontario per le richieste senza risposta (vedi [Conferme delle assegnazioni di servizio](#serving-assignment-confirmations))

   Creare i passaggi di un modello richiede qualche istante. Mentre è in corso, il pulsante **Add Workflow** mostra **Creating...** e non può essere cliccato di nuovo, così non creerai un duplicato. Se qualcosa va storto, la pagina mostra *"Impossibile creare il flusso di lavoro. Riprova."*
3. Assegna al flusso di lavoro un **Name**.
4. Facoltativamente, assegna una **Category** per raggruppare i flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
   Per un flusso di lavoro vuoto, scegli anche la sua **Workflow purpose**: **People follow-up** (il tipo più comune) oppure **Serving assignment confirmation**. Lo scopo non può essere modificato dopo la creazione del flusso di lavoro.
5. Lascia il flusso di lavoro **Active** così le persone possono esservi aggiunte, oppure impostalo su **Inactive** per nasconderlo dagli elenchi di aggiunta ai flussi di lavoro.
6. Clicca su **Save**.

:::tip
Usa il pulsante **Duplicate** nell'elenco dei Workflows per copiare un flusso di lavoro esistente -- inclusi i suoi passaggi, le azioni automatiche e l'instradamento -- come punto di partenza per uno nuovo.
:::

## Costruire la bacheca con i passaggi

Ogni bacheca di un flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Add Step** per creare ciascuna fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Step Name** -- l'intestazione della colonna (ad esempio "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- imposta automaticamente una data di scadenza quando una scheda entra in questo passaggio. Le schede oltre la scadenza vengono contrassegnate come **Overdue**.
- **Default assignee** -- la persona o il gruppo a cui vengono assegnate automaticamente le nuove schede di questo passaggio. Quando l'assegnatario predefinito è una persona, riceve una notifica che una scheda le è stata assegnata.
- **Automated actions** -- operazioni che il sistema esegue da solo quando una scheda arriva (vedi sotto).
- **Routing** -- dove va la scheda quando lascia il passaggio (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una scheda segue quando non si applica nessun altro instradamento.

:::info
Salva prima un nuovo passaggio. Le azioni automatiche e l'instradamento sono collegati al passaggio, quindi l'editor sblocca quelle sezioni solo quando il passaggio esiste.
:::

## Azioni automatiche

Ogni passaggio può contenere un elenco di **azioni automatiche** che vengono eseguite da sole nel momento in cui una scheda **entra** nel passaggio -- prima che qualcuno la tocchi. È così che un passaggio sollecita un volontario *e* si occupa del lavoro di routine che circonda il follow-up.

Nell'editor del passaggio, apri **Automated actions**, clicca su **Add Action**, scegli un tipo e compila le sue impostazioni. Aggiungine quante ne servono; vengono eseguite **dall'alto verso il basso, in ordine**. Clicca su **Save** nel passaggio per salvare il passaggio e tutte le sue azioni insieme. Rimuovere un'azione con la sua icona del cestino ha effetto immediato.

| Azione | Cosa fa |
|---|---|
| **Send email** | Invia alla persona un modello di email a tua scelta. Puoi sostituire l'oggetto. |
| **Send text** | Invia alla persona un messaggio che scrivi, tramite il [servizio di messaggistica](../settings/church-settings.md#texting) della tua chiesa. |
| **Wait** | Mette in pausa la scheda per un numero di giorni prima di proseguire (vedi sotto). |
| **Add to group** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Remove from group** | Rimuove la persona da un gruppo che scegli. |
| **Record Attendance** | Segna la persona come presente all'orario di servizio di un gruppo che è in corso (vedi sotto). |
| **Add to workflow** | Avvia la persona su un altro flusso di lavoro -- utile per passare il lavoro da un processo all'altro. |
| **Add note** | Registra una nota nella cronologia della scheda. |
| **Set field** | Aggiorna un campo nel profilo della persona: Membership Status, Marital Status, Gender, City, State o Zip. |
| **Webhook** | Invia i dettagli della scheda a un indirizzo web esterno (URL) che fornisci, per collegarsi ad altri sistemi. |
| **Create task** | Crea un [task](./tasks.md) con il titolo e la descrizione che inserisci, assegnato a chi scegli. |
| **Notify Person** | Invia a un membro dello staff o a un volontario che scegli un'email e una notifica B1 sulla scheda (vedi sotto). |

Quando tutte le azioni di un passaggio sono terminate, la scheda **resta su quel passaggio** così una persona può occuparsene -- a meno che il passaggio non abbia un instradamento automatico che la sposta oltre (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatiche vengono eseguite solo quando una scheda arriva attraverso il flusso normale -- quando viene aggiunta per la prima volta, quando un esito o un instradamento automatico la porta nel passaggio, oppure al termine di un Wait. **Non** vengono rieseguite quando un membro dello staff trascina manualmente una scheda nel passaggio o la rimanda indietro, così una persona non riceve due volte la stessa email.
:::

### Inviare email

Scegli **Send email**, seleziona uno dei tuoi modelli di email e, se vuoi, scrivi un oggetto personalizzato. Quando una scheda entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email registrato, il passaggio salta semplicemente questa azione.) I [campi unione](../settings/email-templates.md#merge-fields) nel modello, come `{{firstName}}`, vengono sostituiti con i dati personali della persona.

Quando l'email viene inviata, la cronologia della scheda registra **Email sent**. Se non può essere inviata -- ad esempio perché l'email della tua chiesa non è ancora stata approvata o è stato raggiunto il limite giornaliero -- non viene aggiunta alcuna voce "Email sent".

:::info
Le email dei flussi di lavoro vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano nel limite giornaliero di email della chiesa. Consulta [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church). L'azione **Send email** ti avvisa nell'editor del passaggio quando queste email non verranno inviate: *"L'email della tua chiesa non è ancora stata approvata..."* se l'approvazione è in attesa, oppure *"L'email della tua chiesa è sospesa..."* se di recente alcuni messaggi sono stati respinti o segnalati come spam.
:::

### Registrare la presenza

Scegli **Record Attendance** e clicca su **Pick group** per scegliere il gruppo di cui registrare la presenza. Quando l'azione viene eseguita, la persona viene segnata come presente all'orario di servizio in corso di quel gruppo -- esattamente come se avesse fatto il check-in. È utile con un trigger che aggiunge le persone al flusso di lavoro man mano che arrivano, così vengono conteggiate senza un check-in separato.

- La presenza viene misurata nel momento in cui la scheda è stata **creata**, quindi un **Wait** precedente nel flusso di lavoro non la sposta oltre l'inizio del servizio.
- Contano solo gli orari di servizio con un giorno e un orario di inizio. Se nessun orario di servizio del gruppo è in corso in quel momento, non viene registrato nulla e la cronologia della scheda riporta **No scheduled service in progress — attendance not recorded**.
- Quando la presenza viene registrata, la cronologia della scheda mostra **Attendance recorded** seguito dal nome del gruppo. Eseguire di nuovo l'azione per lo stesso servizio non conta la persona due volte.

### Notificare una persona

Scegli **Notify Person**, clicca su **Pick person** e, se vuoi, scrivi un **Message**. Quando una scheda entra nel passaggio, quella persona riceve un'email e una notifica B1 con il nome della persona sulla scheda, i nomi del flusso di lavoro e del passaggio, il tuo messaggio e un link per aprire la scheda. Usala per avvisare un membro dello staff o un leader di ministero -- ad esempio, *"Avvisa il pastore quando qualcuno raggiunge il passaggio Membership Interview."* La cronologia della scheda registra **Notified** seguito dal nome della persona.

### Inviare un SMS

Scegli **Send Text** e scrivi il **Text message** (fino a 1.600 caratteri). Quando una scheda entra nel passaggio, la persona riceve quel messaggio sul cellulare. Puoi personalizzare il messaggio con `{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`, che vengono sostituiti con i dati della persona quando il messaggio viene inviato.

- Se la persona non ha un numero di cellulare registrato, non viene inviato alcun SMS e la cronologia della scheda registra **Text skipped: no mobile phone**.
- Se la persona ha revocato il consenso, non viene inviato alcun SMS e la cronologia della scheda registra **Text skipped: opted out**.
- Quando l'SMS viene inviato, la cronologia della scheda registra **Text sent**. Se l'invio fallisce -- ad esempio perché non è collegato alcun servizio di messaggistica o perché la tua chiesa ha esaurito i crediti SMS -- l'errore viene registrato nella cronologia della scheda e le azioni rimanenti del passaggio vengono comunque eseguite.

:::warning
Gli SMS vengono inviati tramite il [servizio di messaggistica](../settings/church-settings.md#texting) della tua chiesa. Se non è collegato alcun servizio, l'editor dell'azione mostra l'avviso *"No texting provider is set up"* e gli SMS non verranno inviati.
:::

### Attendere alcuni giorni (sequenze di invio programmato)

L'azione **Wait** trattiene una scheda per il numero di giorni che imposti. Mentre attende, la scheda appare come **Snoozed**. B1 controlla le attese terminate ogni 30 minuti, quindi una scheda riprende entro circa mezz'ora dalla fine dell'attesa. Quando l'attesa termina:

1. Vengono eseguite tutte le **azioni rimanenti nello stesso passaggio** -- così puoi costruire una sequenza come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Poi, se il passaggio ha un instradamento automatico, la scheda prosegue; altrimenti resta nel passaggio in attesa che una persona se ne occupi.

:::tip
Un **Wait** all'inizio di un passaggio è un modo semplice per "trattenere" una scheda prima che arrivi a un volontario -- ad esempio, *Attendi 7 giorni, poi un coach si mette in contatto*.
:::

## Aggiungere persone come schede

Ci sono diversi modi per inserire persone in una bacheca:

- **Dalla bacheca** -- Clicca su **Add Card** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo, e ogni membro del gruppo viene aggiunto come scheda.
- **Dal profilo di una persona** -- Usa **Add to Workflow** nella pagina di una persona per inserirla in un flusso di lavoro.
- **Dalla ricerca delle persone** -- Seleziona più persone e usa l'azione in blocco **Add to Workflow** per aggiungerle tutte insieme.
- **Automaticamente con un trigger** -- Aggiungi persone quando accade qualcosa, come l'invio di un modulo o un primo dono (vedi [Trigger](#triggers) più sotto).

## Lavorare sulla bacheca

Apri un flusso di lavoro per vedere la sua bacheca. Ogni scheda mostra il nome della persona, a chi è assegnata e un badge con la scadenza o lo stato (**Overdue** o **Snoozed**). Una colonna di passaggio mostra anche piccoli badge per le azioni automatiche che esegue e annotazioni per il suo instradamento, offrendoti una mappa a colpo d'occhio di come scorrono le schede.

- **Sposta una scheda** -- Trascina una scheda da una colonna alla successiva man mano che la persona avanza.
- **Apri una scheda** -- Fai doppio clic su una scheda (oppure cliccala) per aprire il suo pannello di dettaglio, dove puoi cambiare passaggio, riassegnarla, aggiungere note e controllare cosa è già successo.

Dal pannello della scheda puoi:

- **Assign** la scheda a un'altra persona o gruppo.
- **Snooze** la scheda per 1 giorno, 3 giorni o 1 settimana, per nasconderne temporaneamente la scadenza.
- **Send Back** al passaggio precedente oppure **Skip** al passaggio successivo.
- **Pin assignment** -- mantieni lo stesso responsabile sulla scheda anche quando si sposta tra i passaggi. Per impostazione predefinita, spostare una scheda in un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; fissare l'assegnazione mantiene invece la responsabilità in capo alla persona attuale per tutto il percorso.
- **Complete** la scheda per concluderla, oppure scegli un pulsante **Outcome** se il passaggio ha degli esiti configurati (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** e consultare l'**Activity** della scheda -- un registro delle azioni automatiche eseguite (email inviate, attese, ecc.), ognuna con data e ora.

Per una scheda relativa a una persona, il pannello mostra anche il cellulare e l'email di quella persona come link su cui cliccare per chiamarla o scriverle, oltre a un link **View profile** se hai il permesso di visualizzare le persone. La persona a cui la scheda è assegnata vede il telefono e l'email anche senza accesso a People.

Le note vengono salvate con la scheda. Chiunque possa aprire la scheda -- inclusa la persona o il gruppo a cui è assegnata -- può leggere le note e aggiungere le proprie. Chi non può aprire la scheda non vede le sue note.

### Azioni in blocco

Seleziona le caselle su più schede per agire su di esse insieme. Per selezionare tutte le schede di un passaggio in una volta, spunta la casella **Select all** nell'intestazione della colonna di quel passaggio; spuntala di nuovo per deselezionare. Compare una barra degli strumenti che ti permette di **Complete**, **Snooze**, **Assign** (riassegnare) o **Move to…** un altro passaggio per tutte le schede selezionate contemporaneamente.

## Instradare le schede con esiti e condizioni

L'instradamento controlla dove va una scheda quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di instradamento.

### Pulsanti di esito

Gli esiti sono pulsanti mostrati nel pannello della scheda quando completi una scheda in quel passaggio. Invece di un unico pulsante **Complete**, puoi offrire scelte come "Joined a Group" o "Not Interested". Ogni esito può:

- Inviare la scheda a **un altro passaggio** di questo flusso di lavoro,
- **Trasferire la scheda** a un flusso di lavoro diverso, oppure
- **Chiudere** la scheda.

Così una sola decisione può far imboccare alla persona percorsi diversi.

### Instradamento automatico (condizionale)

Gli instradamenti automatici spostano una scheda in avanti **nel momento stesso in cui entra in un passaggio** (e dopo che le sue azioni automatiche sono terminate), senza che nessuno clicchi, se la persona soddisfa un insieme di condizioni. Aggiungi un instradamento, scegli il passaggio di destinazione e definisci una o più **conditions** (ad esempio, il campus, l'età o lo stato di membro di una persona). I campi di testo possono essere confrontati in modo esatto oppure con **contains**, **starts with** o **ends with**. Un instradamento senza condizioni corrisponde a tutti.

Le condizioni sulle date (Today's Date, Birth Date o Anniversary) possono confrontare la data completa o solo una sua parte -- il giorno della settimana, il **Day of Month**, il **Month** oppure gli anni trascorsi. Per la Birth Date o l'Anniversary di una persona, **Day of Month** offre l'opzione relativa **Today**, quindi una condizione come *Birth Date · Day of Month = Today* corrisponde alle persone il cui compleanno cade nel giorno del mese corrente. **Month** offre **Previous Month**, **Current Month** e **Next Month**. I valori relativi come questi vengono calcolati in base al fuso orario della tua chiesa, così corrispondono al giorno del calendario della chiesa e non a quello del server.

Se le condizioni di un instradamento non possono essere verificate per qualche motivo, quell'instradamento viene considerato non corrispondente. La scheda resta nel passaggio (oppure segue un altro instradamento che corrisponde) invece di restare bloccata.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo instradamento -- ad esempio l'etichetta di un esito oppure "if matches" seguito da una freccia verso il passaggio o il flusso di lavoro di destinazione.
:::

## Passaggi completamente automatizzati

Puoi far funzionare un passaggio interamente da solo, senza che nessuno lo gestisca. Dai al passaggio le sue **azioni automatiche** e aggiungi un **instradamento automatico** (senza condizioni) che punta al passaggio successivo. Quando una scheda entra, le azioni vengono eseguite e poi l'instradamento la fa avanzare immediatamente -- la scheda passa direttamente oltre.

:::tip
Combinalo con **Wait**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Personal call".* Email e tempistiche sono gestite per te, e un volontario vede la scheda solo quando è il momento del contatto umano.
:::

## Trigger

I trigger aggiungono automaticamente persone a un flusso di lavoro quando accade qualcosa, così non devi mai aggiungere schede a mano. Nella bacheca di un flusso di lavoro, clicca sulla scheda **Triggers**, poi su **Add Trigger**. Ce ne sono due tipi:

### Trigger di evento

Si attivano non appena un record cambia in B1. Scegli l'evento e, se vuoi, aggiungi **conditions** così che vengano aggiunte solo le persone corrispondenti:

- **Person · Created / Updated** -- ad esempio, aggiungi chiunque il cui stato diventi *Visitor* o *Guest* (lo stato assegnato alle persone che si registrano da sole).
- **Donation · Created** -- ad esempio, aggiungi un primo dono o un dono di importo elevato a un flusso di ringraziamento (filtra per importo, fondo o metodo).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- aggiungi chiunque invii un modulo scelto (ideale per una scheda "I'm New" o "Connect").

### Trigger pianificati

Vengono eseguiti su base ricorrente -- giornaliera, settimanale, mensile o annuale -- in base a un insieme di condizioni. Usali per attività di contatto legate al tempo, come *tutti quelli il cui compleanno è oggi* (Birth Date · Day of Month = **Today**, con il mese corrispondente a **Current Month**) oppure un controllo *mensile*. Anche senza **Only once per person**, un trigger pianificato non aggiunge di nuovo la stessa persona nello stesso periodo di ripetizione (un giorno, una settimana, un mese o un anno, a seconda della frequenza di esecuzione).

Per qualsiasi trigger puoi anche impostare:

- Il **Starting step** su cui atterra la nuova scheda (predefinito: il primo passaggio).
- **Only once per person** -- così la stessa persona non viene aggiunta due volte al flusso di lavoro dal trigger. Con questa opzione attiva, chiunque abbia già una scheda in questo flusso di lavoro viene saltato.
  - **Add again after their card is closed** -- compare quando **Only once per person** è attiva. Selezionala per permettere al trigger di aggiungere di nuovo una persona una volta chiusa la sua scheda precedente in questo flusso di lavoro. Una persona non avrà mai due schede aperte nello stesso flusso di lavoro contemporaneamente. Usala per eventi che possono ripetersi più volte, come un ospite che torna o un processo annuale.
- **Active** -- attiva o disattiva il trigger senza eliminarlo.

:::tip
Abbina un trigger **Form · Submitted** al modello **New Visitor Follow-up** per trasformare il tuo modulo "Connect Card" o "I'm New" in una pipeline di follow-up automatica.
:::

## Conferme delle assegnazioni di servizio

Un tipo speciale di flusso di lavoro può seguire le [richieste di servizio](./plans.md#assigning-team-members) finché ogni volontario non accetta o rifiuta. Invece delle persone, ogni scheda su questa bacheca tiene traccia di **una sola assegnazione** -- una persona in una posizione in un piano. Due ruoli o due servizi per la stessa persona hanno schede separate. Si tratta di una funzione facoltativa: nulla cambia per un piano finché non selezioni un flusso di lavoro di conferma nelle sue impostazioni.

### Come configurarlo

1. Nella pagina Workflows, clicca su **Add Workflow** e scegli il modello **Serving Assignment Confirmation**. (In alternativa, parti da un **Blank workflow** e imposta la sua **Workflow purpose** su **Serving assignment confirmation**.) Creare il flusso dal modello richiede il permesso di inviare SMS, perché include un passaggio di invio SMS.
2. Controlla i passaggi. Il modello inizia con:
   - **Request and wait for response** -- invia la richiesta di servizio via email e via SMS, attende 2 giorni, invia un'email di promemoria, attende ancora 1 giorno, poi fa avanzare automaticamente la scheda.
   - **Call volunteer about unanswered request** -- un passaggio in cui una persona chiama il volontario, con scadenza tra 1 giorno. Imposta un **Default assignee** su questo passaggio. Se non ne ha uno, la scheda va al leader del ministero o, se non c'è, al team del ministero.
3. Modifica attese, messaggi e passaggi in base alle esigenze della tua chiesa.
4. Apri le [impostazioni di un piano](./plans.md#plan-settings) e scegli questo flusso di lavoro in **Confirmation workflow**.

Questi flussi di lavoro usano un'azione **Send serving request** invece di **Send email** e **Send text**. Scegli **Email** o **Text message** e, se vuoi, scrivi un **Request message**. La richiesta include sempre il ruolo, il piano, la data del servizio e un link per rispondere; nel tuo messaggio puoi usare `{{planName}}`, `{{positionName}}` e `{{serviceDate}}`. Lascia vuoto il messaggio per usare la richiesta predefinita. Si applicano le preferenze di notifica dei volontari, il loro consenso agli SMS, il tuo servizio di messaggistica e l'approvazione email della tua chiesa, e ogni tentativo saltato o bloccato viene registrato sulla scheda. **Send email**, **Send text** e **Add to workflow** non sono disponibili su queste bacheche.

La scheda **Triggers** di un flusso di conferma spiega come vengono avviate le schede invece di offrire trigger, e questi flussi di lavoro non compaiono negli elenchi **Add to Workflow** delle persone.

### Come vengono avviate e chiuse le schede

- Le schede vengono avviate quando **Notify** i volontari di un piano pubblicato (vedi [Notificare i volontari](./plan-validation.md#notifying-volunteers)). Ogni nuova assegnazione senza risposta riceve una scheda. Salvare, pubblicare, copiare o riempire automaticamente un piano non contatta nessuno di per sé, e i piani in bozza non inviano nulla.
- I volontari ricevono comunque il normale avviso nell'app. Il follow-up via email e SMS è gestito dal flusso di lavoro.
- Quando il volontario **accetta o rifiuta**, la sua scheda si chiude automaticamente, insieme a eventuali attività di follow-up collegate.
- Il pannello della scheda mostra la posizione, la data del servizio e un link al piano. Invece di **Complete**, il pulsante dice **Record follow-up done**. Cliccandolo si registra che qualcuno ha effettuato il follow-up, ma la scheda resta aperta e assegnata (indicata come **Awaiting response**) finché il volontario non risponde o non scade il termine per la risposta.
- Il termine per la risposta è la fine dell'ultimo orario di servizio in cui il team della posizione presta servizio. Se il piano non ha orari corrispondenti, è la fine della giornata di servizio. Se nessuno ha risposto entro quel momento, la scheda si chiude con **Response deadline passed** e una attività **Review unanswered serving request** viene assegnata al responsabile attuale della scheda o al leader del ministero, così qualcuno può decidere come coprire il posto. L'assegnazione resta **Unconfirmed**.
- Rimuovere l'assegnazione, cambiarne la persona, la posizione o la data del piano, riportare il piano in bozza oppure passare il piano a un altro flusso di conferma chiude la scheda. Una scheda chiusa non viene mai riaperta da un altro **Notify**; per inviare una nuova richiesta, aggiungi una nuova assegnazione.

:::info
Per le richieste inviate tramite un flusso di conferma, i [promemoria per i volontari](./plans.md#volunteer-reminders) vanno solo ai volontari che hanno **accettato**, così le persone in attesa di risposta non ricevono promemoria in aggiunta ai solleciti del flusso di lavoro.
:::

## My Cards

Volontari e staff non devono scorrere tutte le bacheche per trovare il proprio lavoro. L'elenco **My Cards** nella pagina **My Work** mostra ogni scheda assegnata all'utente corrente in tutti i flussi di lavoro. Per accedervi, clicca su **My Cards** in alto nella pagina Workflows oppure apri **Serving > My Work** nel menu Jump. Cliccando su una scheda si apre la bacheca a cui appartiene.

## Report

Apri un flusso di lavoro e clicca su **Reports** per vedere le statistiche di quel flusso:

- **Overdue** -- il numero di schede oltre la data di scadenza.
- **Cards per Step** -- quante schede si trovano attualmente su ciascun passaggio, mostrate come grafico a colonne.
- **Completed (30 days)** -- il volume di lavoro completato negli ultimi 30 giorni, mostrato come grafico a linee.

Usali per individuare i colli di bottiglia -- ad esempio un passaggio in cui le schede si accumulano senza mai avanzare.

## Articoli correlati

- [Tasks](./tasks.md) -- le singole attività su cui si basano le schede dei flussi di lavoro
- [Moduli](../forms/index.md) -- crea i moduli che possono attivare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui un'azione "Add to group" può inserire le persone
- [Piani di servizio](./plans.md) -- scegli un flusso di conferma per le richieste di servizio di un piano
- [Ruoli e permessi](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
