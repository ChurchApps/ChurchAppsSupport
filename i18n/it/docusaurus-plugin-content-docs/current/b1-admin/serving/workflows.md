---
title: "Flussi di Lavoro"
---

# Flussi di Lavoro

<div class="article-intro">

I flussi di lavoro muovono le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una carta che viaggia da un passaggio al successivo — da un follow-up di ospiti per la prima volta, a un processo di adesione, a un ringraziamento per il primo donatore, e qualsiasi altra cosa in cui hai bisogno di tracciare molte persone attraverso la stessa serie di fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una chiamata, avere una conversazione) **e** eseguire azioni automatizzate da solo — inviare un'email, aspettare alcuni giorni, aggiungere la persona a un gruppo — quindi i Flussi di Lavoro gestiscono sia il follow-up umano che il lavoro routinario intorno ad esso. I Flussi di Lavoro estendono [Tasks](./tasks.md) in una bacheca Kanban drag-and-drop in modo che niente e nessuno cada tra le fessure.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Assicurati che le persone che desideri tracciare esistano in B1 Admin
- Familiarizza con il funzionamento di [Tasks](./tasks.md), poiché ogni carta su una bacheca è un'attività
- Per usare l'azione **Send email**, crea prima i modelli di email che desideri inviare (gestiti in **Messaging → Manage Templates**)
- Avrai bisogno del permesso Tasks appropriato. La visualizzazione, la modifica delle carte e la gestione dei flussi di lavoro sono livelli di permesso separati (vedi [Ruoli e Permessi](../settings/roles-permissions.md))

</div>

## Visualizzazione dei Flussi di Lavoro

Vai a **Serving**, apri l'area **Tasks** e seleziona **Workflows** dal menu. Vedrai i tuoi flussi di lavoro elencati e raggruppati per categoria, con i flussi di lavoro attivi evidenziati. Fai clic su qualsiasi flusso di lavoro per aprire la sua bacheca.

## Creazione di un Flusso di Lavoro

1. Sulla pagina Workflows, fai clic su **Add Workflow**.
2. Scegli come iniziare:
   - **Blank workflow** -- inizia da zero e crea i tuoi propri passaggi.
   - **From a template** -- inizia con un set pronto di passaggi che puoi modificare. I modelli integrati includono:
     - **New Visitor Follow-up** -- Send welcome email → Personal phone call → Invite to next step → Connected
     - **Membership Class** -- Express interest → Register for class → Attend class → Complete membership
     - **First-time Giver Thank-you** -- Send thank-you note → Share giving impact → Stewarded
3. Dai al flusso di lavoro un **Name**.
4. Facoltativamente assegna una **Category** per raggruppare i flussi di lavoro correlati insieme. Puoi creare una nuova categoria direttamente dal menu a discesa.
5. Lascia il flusso di lavoro **Active** in modo che le persone possano essere aggiunte, o impostalo su **Inactive** per nasconderlo dagli elenchi di aggiunta al flusso di lavoro.
6. Fai clic su **Save**.

:::tip
Usa il pulsante **Duplicate** nell'elenco dei Flussi di Lavoro per copiare un flusso di lavoro esistente — inclusi i suoi passaggi, le azioni automatizzate e il routing — come punto di partenza per uno nuovo.
:::

## Costruzione della Bacheca con Passaggi

Ogni bacheca del flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Add Step** per creare ogni fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Step Name** -- l'intestazione della colonna (ad esempio, "Welcome Call" o "Awaiting Registration").
- **Due in (days)** -- imposta automaticamente una data di scadenza quando una carta entra in questo passaggio. Le carte passate la loro data di scadenza vengono segnalate come **Overdue**.
- **Default assignee** -- la persona o il gruppo a cui le nuove carte su questo passaggio vengono assegnate automaticamente.
- **Automated actions** -- cose che il sistema fa da solo quando una carta arriva (vedi sotto).
- **Routing** -- dove va la carta quando lascia il passaggio (vedi [Routing](#routing-delle-carte-con-risultati-e-condizioni)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una carta prende quando non si applica altro routing.

:::info
Salva prima un nuovo passaggio. Le azioni automatizzate e il routing si allegano al passaggio, quindi l'editor sblocca quelle sezioni una volta che il passaggio esiste.
:::

## Azioni Automatizzate

Ogni passaggio può portare un elenco di **azioni automatizzate** che vengono eseguite da sole nel momento in cui una carta **entra** nel passaggio — prima che chiunque la tocchi. Ecco come un passaggio sia richiede a un volontario *che* si prende cura del lavoro routinario intorno al follow-up.

Nell'editor dei passaggi, apri **Automated actions**, fai clic su **Add Action**, scegli un tipo, compila le sue impostazioni e fai clic sull'icona di salvataggio su quell'azione. Aggiungine quanti ne hai bisogno; vengono eseguiti **dall'alto in basso in ordine**.

| Azione | Cosa fa |
|---|---|
| **Send email** | Invia alla persona un modello di email che scegli. Puoi sostituire la riga dell'oggetto. |
| **Wait** | Mette in pausa la carta per un numero di giorni prima di continuare (vedi sotto). |
| **Add to group** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Add to workflow** | Inizia la persona su un altro flusso di lavoro — utile per il passaggio tra processi. |
| **Add note** | Registra una nota nella cronologia della carta. |
| **Set field** | Aggiorna un campo nel record della persona: Membership Status, Marital Status, Gender, City, State, o Zip. |
| **Webhook** | Invia i dettagli della carta a un indirizzo web esterno (URL) che fornisci, per connettersi ad altri sistemi. |

Dopo che tutte le azioni di un passaggio sono finite, la carta **riposa su quel passaggio** in modo che una persona possa usarla — a meno che il passaggio non abbia un percorso automatico che la sposti (vedi [Fully automated steps](#fully-automated-steps)).

:::info
Le azioni automatizzate vengono eseguite solo quando una carta arriva attraverso il flusso normale — quando viene aggiunta per la prima volta, quando un risultato o un percorso automatico la porta, o dopo il completamento di un'attesa. Loro **non** vengono ri-eseguite quando un membro dello staff trascina manualmente una carta sul passaggio o la rimanda, quindi una persona non riceverà la stessa email due volte.
:::

### Invio di email

Scegli **Send email**, scegli uno dei tuoi modelli di email e facoltativamente digita un oggetto personalizzato. Quando una carta entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email nel file, il passaggio semplicemente salta questa azione.)

### Attesa di alcuni giorni (sequenze di sgocciolatura)

L'azione **Wait** tiene una carta per il numero di giorni che imposti. Mentre aspetta, la carta viene visualizzata come **Snoozed**. Quando l'attesa è finita:

1. Qualsiasi **azione rimanente sullo stesso passaggio** viene eseguita — così puoi costruire un gocciolamento come **Send email → Wait 3 days → Send a reminder email**.
2. Poi, se il passaggio ha un percorso automatico, la carta si sposta; altrimenti riposa sul passaggio per una persona da raccogliere.

:::tip
Un'**attesa** molto all'inizio di un passaggio è un modo semplice per "mantenere" una carta prima che emerga a un volontario — ad esempio, *Aspetta 7 giorni, poi un allenatore si mette in contatto*.
:::

## Aggiunta di Persone come Carte

Ci sono diversi modi per mettere le persone su una bacheca:

- **Dalla bacheca** -- Fai clic su **Add Card** in fondo a una colonna di passaggi e scegli una persona. Puoi anche scegliere un gruppo e ogni membro di quel gruppo viene aggiunto come carta.
- **Dal record di una persona** -- Usa **Add to Workflow** sulla pagina di una persona per lasciarla cadere su un flusso di lavoro.
- **Dalla ricerca People** -- Seleziona più persone e usa l'azione di massa **Add to Workflow** per aggiungerle tutte subito.
- **Automaticamente con un trigger** -- Aggiungi persone quando succede qualcosa, come un invio di modulo o un primo regalo (vedi [Triggers](#triggers) sotto).

## Utilizzo della Bacheca

Apri un flusso di lavoro per vedere la sua bacheca. Ogni carta mostra il nome della persona, a chi è assegnato e un chip di data di scadenza o stato (**Overdue** o **Snoozed**). Una colonna di passaggi mostra anche piccoli badge per qualsiasi azione automatizzata che esegue e annotazioni per il suo routing, offrendoti una mappa a colpo d'occhio di come fluiscono le carte.

- **Sposta una carta** -- Trascina una carta da una colonna all'altra man mano che la persona progredisce.
- **Apri una carta** -- Fai doppio clic su una carta (o fai clic) per aprire il suo cassetto di dettagli, dove puoi cambiare il passaggio, assegnarla di nuovo, aggiungere note e rivedere cosa è già accaduto.

Dal cassetto della carta puoi:

- **Assign** la carta a una persona o un gruppo diverso.
- **Snooze** la carta per 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua data di scadenza.
- **Send Back** al passaggio precedente o **Skip** al passaggio successivo.
- **Pin assignment** -- mantieni lo stesso proprietario sulla carta anche mentre si sposta tra i passaggi. Per impostazione predefinita, spostare una carta su un nuovo passaggio la riassegna al responsabile predefinito di quel passaggio; il pinning mantiene la persona corrente responsabile durante il corso.
- **Complete** la carta per completarla, o scegli un pulsante **Outcome** se il passaggio ha risultati configurati (vedi [Routing](#routing-delle-carte-con-risultati-e-condizioni)).
- **Add notes** e rivedi la **history** della carta — incluso un log di azioni automatizzate che sono state eseguite (email inviate, attese, ecc.).

### Azioni di massa

Seleziona le caselle di controllo su più carte per agire su di loro insieme. Appare una barra degli strumenti che ti permette di **Complete**, **Snooze**, **Reassign** o **Move** tutte le carte selezionate in un altro passaggio contemporaneamente.

## Routing delle Carte con Risultati e Condizioni

Il routing controlla dove va una carta quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di routing.

### Pulsanti di risultato

I risultati sono pulsanti visualizzati nel cassetto della carta quando completi una carta su quel passaggio. Invece di un singolo pulsante **Complete**, puoi offrire scelte come "Joined a Group" o "Not Interested". Ogni risultato può:

- Inviare la carta a **un altro passaggio** in questo flusso di lavoro,
- **Consegnare la carta** a un flusso di lavoro completamente diverso, o
- **Chiudere** la carta.

Questo permette a una decisione di diramazione la persona lungo percorsi diversi.

### Routing automatico (condizionale)

I percorsi automatici muovono una carta in avanti **nel momento in cui entra in un passaggio** (e dopo che le sue azioni automatizzate finiscono), senza che chiunque faccia clic, se la persona corrisponde a un insieme di condizioni. Aggiungi un percorso, scegli il passaggio di destinazione e definisci una o più **conditions** (ad esempio, un campus, l'età o lo stato di adesione di una persona). Un percorso senza condizioni corrisponde a tutti.

:::info
Sulla bacheca, ogni colonna di passaggi mostra piccole annotazioni che descrivono il suo routing — ad esempio un'etichetta di risultato o "if matches" seguita da una freccia verso il passaggio di destinazione o il flusso di lavoro.
:::

## Passaggi Completamente Automatizzati

Puoi fare un passaggio funzionare completamente da solo, senza che nessuno lo usi. Dai al passaggio le sue **azioni automatizzate** e aggiungi un **percorso automatico** (senza condizioni) che punta al passaggio successivo. Quando entra una carta, le azioni vengono eseguite e poi il percorso la avanza immediatamente — la carta passa direttamente.

:::tip
Combina questo con **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* L'email e il timing vengono gestiti per te, e un volontario vede la carta solo quando è il momento del tocco umano.
:::

## Trigger

I trigger aggiungono persone a un flusso di lavoro automaticamente quando succede qualcosa, così non devi mai aggiungere carte a mano. Su una bacheca del flusso di lavoro, fai clic sulla scheda **Triggers**, quindi su **Add Trigger**. Ci sono due tipi:

### Trigger di evento

Vengono attivati non appena un record cambia in B1. Scegli l'evento, quindi facoltativamente aggiungi **conditions** in modo che solo le persone corrispondenti vengano aggiunte:

- **Person · Created / Updated** -- ad esempio aggiungi chiunque il cui stato diventa *Visitor*.
- **Donation · Created** -- ad esempio aggiungi un regalo di prima volta o grande a un flusso di lavoro di ringraziamento (corrispondenza per importo, fondo o metodo).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- aggiungi chiunque invii un modulo scelto (fantastico per un "I'm New" o una carta "Connect").

### Trigger di programmazione

Vengono eseguiti su base ricorrente — giornaliera, settimanale, mensile o annuale — rispetto a un insieme di condizioni. Usali per il follow-up basato sul tempo come *tutti i cui anniversari di adesione è oggi* o un *controllo mensile*.

Per qualsiasi trigger puoi anche impostare:

- Il **passaggio di immissione** su cui la nuova carta inizia (impostazione predefinita sul primo passaggio).
- **Once per person** — in modo che la stessa persona non venga aggiunta al flusso di lavoro due volte dal trigger.
- **Active** — accendi o spegni il trigger senza eliminarlo.

:::tip
Associa un trigger **Form · Submitted** al modello **New Visitor Follow-up** per trasformare il tuo "Connect Card" o il modulo "I'm New" in una pipeline di follow-up automatica.
:::

## Le Mie Carte

I volontari e lo staff non hanno bisogno di scavare attraverso ogni bacheca per trovare il loro lavoro. La pagina **My Cards** (collegata dalla pagina dei Flussi di Lavoro) elenca ogni carta assegnata all'utente corrente in tutti i flussi di lavoro. Facendo clic su una carta apre la bacheca a cui appartiene.

## Rapporti

Apri un flusso di lavoro e fai clic su **Reports** per vedere l'analisi di quel flusso di lavoro:

- **Overdue** -- il numero di carte passate la loro data di scadenza.
- **Cards per Step** -- quante carte attualmente siedono su ogni passaggio, mostrate come un grafico a colonne.
- **Completed (30 days)** -- throughput negli ultimi 30 giorni, mostrato come un grafico a linee.

Usali per individuare colli di bottiglia — ad esempio un passaggio dove le carte si accumulano e non avanzano mai.

## Articoli Correlati

- [Tasks](./tasks.md) -- i singoli elementi d'azione su cui si basano le carte del flusso di lavoro
- [Automations](./automations.md) -- crea attività ricorrenti su una pianificazione
- [Forms](../forms/index.md) -- costruisci i moduli che possono attivare i flussi di lavoro
- [Groups](../groups/index.md) -- i gruppi che un'azione "Add to group" può inserire le persone in
- [Ruoli e Permessi](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
