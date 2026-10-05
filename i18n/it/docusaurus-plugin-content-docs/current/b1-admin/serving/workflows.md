---
title: "Flussi di lavoro"
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro spostano le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una scheda che si sposta da un passaggio al successivo, da un follow-up per i visitatori per la prima volta, a un processo di iscrizione, a un ringraziamento per il primo donatore, e qualsiasi altra cosa in cui è necessario tracciare molte persone attraverso la stessa serie di fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una chiamata, avere una conversazione) **e** eseguire azioni automatizzate da solo, inviare un'email o un SMS, attendere alcuni giorni, aggiungere la persona a un gruppo. Quindi i flussi di lavoro gestiscono sia il follow-up umano che il lavoro routinario. I flussi di lavoro estendono [Tasks](./tasks.md) in una bacheca Kanban con trascinamento in modo che nulla e nessuno cada attraverso le crepe.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che desideri tracciare esistano in B1 Admin
- Familiarizzati con il funzionamento di [Tasks](./tasks.md), poiché ogni scheda su una bacheca è un'attività
- Per utilizzare l'azione **Invia email**, crea prima i modelli di email che desideri inviare (gestiti in **Messaging → Manage Templates**)
- Per utilizzare l'azione **Invia SMS**, connetti prima un [provider di messaggistica](../settings/church-settings.md#texting)
- Avrai bisogno dell'autorizzazione Tasks appropriata. La visualizzazione, la modifica delle schede e la gestione dei flussi di lavoro sono livelli di autorizzazione separati (vedi [Roles & Permissions](../settings/roles-permissions.md))

</div>

## Visualizzazione dei flussi di lavoro

Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Serving**, e fai clic su **Workflows**. Vedrai i tuoi flussi di lavoro elencati e raggruppati per categoria, con i flussi di lavoro attivi evidenziati. Fai clic su qualsiasi flusso di lavoro per aprire la sua bacheca.

## Creazione di un flusso di lavoro

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso di lavoro vuoto** -- inizia da zero e costruisci i tuoi passaggi.
   - **Da un modello** -- inizia con una serie di passaggi predefiniti che puoi modificare. I modelli integrati includono:
     - **Seguiti per visitatori nuovi** -- Invia email di benvenuto → Chiamata telefonica personale → Invita al passaggio successivo → Connesso
     - **Classe di iscrizione** -- Esprimi interesse → Registrati per la lezione → Partecipa alla lezione → Iscrizione completata
     - **Ringraziamento per il primo donatore** -- Invia nota di ringraziamento → Condividi impatto donazione → Gestito
3. Assegna al flusso di lavoro un **Nome**.
4. Facoltativamente assegna una **Categoria** per raggruppare i flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
5. Lascia il flusso di lavoro **Attivo** in modo che le persone possano essere aggiunte, oppure impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta al flusso di lavoro.
6. Fai clic su **Salva**.

:::tip
Usa il pulsante **Duplicate** nell'elenco dei flussi di lavoro per copiare un flusso di lavoro esistente, inclusi i suoi passaggi, le azioni automatizzate e l'instradamento, come punto di partenza per uno nuovo.
:::

## Creazione della bacheca con i passaggi

Ogni bacheca del flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e utilizza **Aggiungi passaggio** per creare ogni fase del tuo processo.

Quando aggiungi o modifici un passaggio, puoi configurare:

- **Nome passaggio** -- l'intestazione della colonna (ad esempio, "Chiamata di benvenuto" o "In attesa di registrazione").
- **Dovuta in (giorni)** -- imposta automaticamente una data di scadenza quando una scheda entra in questo passaggio. Le schede che superano la data di scadenza sono contrassegnate come **Scadute**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui vengono automaticamente assegnate le nuove schede su questo passaggio.
- **Azioni automatizzate** -- cose che il sistema fa da solo quando una scheda arriva (vedi sotto).
- **Instradamento** -- dove va la scheda quando lascia il passaggio (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una scheda percorre quando non si applica nessun altro instradamento.

:::info
Salva prima un nuovo passaggio. Le azioni automatizzate e l'instradamento si collegano al passaggio, quindi l'editor sblocca quelle sezioni una volta che il passaggio esiste.
:::

## Azioni automatizzate

Ogni passaggio può portare un elenco di **azioni automatizzate** che si eseguono da sole nel momento in cui una scheda **entra** nel passaggio, prima che chiunque la tocchi. Questo è il modo in cui un passaggio sia richiede a un volontario *che* si prende cura del lavoro routinario intorno al follow-up.

Nell'editor dei passaggi, apri **Azioni automatizzate**, fai clic su **Aggiungi azione**, scegli un tipo, compila le sue impostazioni e fai clic sull'icona di salvataggio su quella azione. Aggiungine quante ne hai bisogno; si eseguono **da cima a fondo in ordine**.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia alla persona un modello di email che scegli. Puoi ignorare la riga dell'oggetto. |
| **Invia SMS** | Invia un SMS alla persona attraverso il [provider di messaggistica](../settings/church-settings.md#texting) della tua chiesa. |
| **Attesa** | Mette in pausa la scheda per un numero di giorni prima di continuare (vedi sotto). |
| **Aggiungi al gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Rimuovi dal gruppo** | Rimuove la persona da un gruppo che scegli. |
| **Aggiungi al flusso di lavoro** | Avvia la persona su un altro flusso di lavoro -- utile per passare tra processi. |
| **Aggiungi nota** | Registra una nota nella cronologia della scheda. |
| **Imposta campo** | Aggiorna un campo sul record della persona: Stato iscrizione, Stato civile, Genere, Città, Provincia, o CAP. |
| **Webhook** | Invia i dettagli della scheda a un indirizzo web esterno (URL) che fornisci, per la connessione con altri sistemi. |
| **Crea attività** | Crea un [attività](./tasks.md) con il titolo e la descrizione che inserisci, assegnato a chiunque scegli. |

Dopo che tutte le azioni di un passaggio sono finite, la scheda **riposa su quel passaggio** in modo che una persona possa lavorarci, a meno che il passaggio non abbia una route automatica che la sposti avanti (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatizzate si eseguono solo quando una scheda arriva attraverso il flusso normale, quando viene aggiunta per la prima volta, quando un risultato o una route automatica la porta dentro, o dopo che un'attesa finisce. Non si **rieseguono** quando un membro dello staff trascina manualmente una scheda sul passaggio o la rimanda, quindi una persona non riceverà la stessa email due volte.
:::

### Invio di email

Scegli **Invia email**, scegli uno dei tuoi modelli di email e facoltativamente digita un oggetto personalizzato. Quando una scheda entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email nel file, il passaggio semplicemente salta questa azione.) I [campi di unione](../settings/email-templates.md#merge-fields) nel modello, come `{{firstName}}`, vengono compilati con i dettagli della persona.

:::info
Le email del flusso di lavoro vanno solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano verso il limite di email giornaliero della tua chiesa. Vedi [Attivazione della posta elettronica di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Invio di un SMS

Scegli **Invia SMS** e digita il **Messaggio di testo** (fino a 1.600 caratteri). Quando una scheda entra nel passaggio, la persona riceve quel messaggio sul suo telefono cellulare. Puoi personalizzare il messaggio con `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, o `{{churchName}}`, che vengono compilati con i dettagli della persona quando il messaggio viene inviato.

- Se la persona non ha un numero di telefono cellulare nel file, l'azione viene saltata.
- Se la persona ha rinunciato, nessun SMS viene inviato e la cronologia della scheda registra **SMS saltato: rinunciato**.
- Quando il messaggio viene inviato, la cronologia della scheda registra **SMS inviato**. Se l'invio fallisce, ad esempio perché non è collegato un provider di messaggistica o la tua chiesa è a corto di crediti di testo, il fallimento viene registrato nella cronologia della scheda e le azioni rimanenti del passaggio vengono comunque eseguite.

:::warning
Gli SMS vengono inviati attraverso il [provider di messaggistica](../settings/church-settings.md#texting) della tua chiesa. Se nessun provider è collegato, l'editor dell'azione avverte "Nessun provider di messaggistica è impostato" e gli SMS non verranno inviati.
:::

### Attesa di alcuni giorni (sequenze di gocciolamento)

L'azione **Attesa** tiene una scheda per il numero di giorni che imposti. Mentre aspetta, la scheda viene visualizzata come **Sospesa**. Quando l'attesa è finita:

1. Qualsiasi **azione rimanente sullo stesso passaggio** si esegue, quindi puoi costruire un gocciolamento come **Invia email → Attesa 3 giorni → Invia un'email di promemoria**.
2. Quindi, se il passaggio ha una route automatica, la scheda si sposta avanti; altrimenti riposa sul passaggio per una persona da riprendere.

:::tip
Un'**Attesa** all'inizio di un passaggio è un modo semplice per "tenere" una scheda prima che venga visualizzata a un volontario, ad esempio, *Attendi 7 giorni, quindi un allenatore ti contatta*.
:::

## Aggiunta di persone come schede

Ci sono diversi modi per mettere persone su una bacheca:

- **Dalla bacheca** -- fai clic su **Aggiungi scheda** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo, e ogni membro di quel gruppo viene aggiunto come una scheda.
- **Dal record di una persona** -- utilizza **Aggiungi al flusso di lavoro** sulla pagina di una persona per lasciarla cadere su un flusso di lavoro.
- **Dalla ricerca di persone** -- seleziona più persone e utilizza l'azione bulk **Aggiungi al flusso di lavoro** per aggiungerle tutte in una volta.
- **Automaticamente con un trigger** -- aggiungi persone quando accade qualcosa, come un invio di modulo o una prima donazione (vedi [Trigger](#triggers) sotto).

## Utilizzo della bacheca

Apri un flusso di lavoro per vedere la sua bacheca. Ogni scheda mostra il nome della persona, a chi è assegnata, e un chip di data di scadenza o stato (**Scaduta** o **Sospesa**). Una colonna di passaggio mostra anche piccoli badge per qualsiasi azione automatizzata che esegue e annotazioni per il suo instradamento, dandoti una mappa a colpo d'occhio di come le schede fluiscono.

- **Sposta una scheda** -- trascina una scheda da una colonna all'altra mentre la persona progredisce.
- **Apri una scheda** -- fai doppio clic su una scheda (o fai clic su di essa) per aprire il suo cassetto dei dettagli, dove puoi cambiare il passaggio, riassegnarla, aggiungere note e rivedere cosa è già accaduto.

Dal cassetto della scheda puoi:

- **Assegna** la scheda a una persona o un gruppo diverso.
- **Sospendi** la scheda per 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua data di scadenza.
- **Invia indietro** al passaggio precedente o **Salta** al passaggio successivo.
- **Fissa assegnazione** -- mantieni lo stesso proprietario sulla scheda mentre si sposta tra i passaggi. Per impostazione predefinita, lo spostamento di una scheda a un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; il fissaggio mantiene la persona attuale responsabile durante tutto il processo.
- **Completa** la scheda per finirla, o scegli un pulsante **Risultato** se il passaggio ha risultati configurati (vedi [Instradamento](#routing-cards-with-outcomes-and-conditions)).
- **Aggiungi note** e rivedi la **cronologia** della scheda, incluso un registro delle azioni automatizzate che sono state eseguite (email inviate, attese, ecc.).

### Azioni in blocco

Seleziona le caselle di controllo su più schede per agire su di loro insieme. Appare una barra degli strumenti che ti consente di **Completare**, **Sospendere**, **Riassegnare** o **Spostare** tutte le schede selezionate in un altro passaggio in una volta.

## Instradamento delle schede con risultati e condizioni

L'instradamento controlla dove va una scheda quando lascia un passaggio. Apri l'editor di un passaggio per configurare due tipi di instradamento.

### Pulsanti di risultato

I risultati sono pulsanti mostrati nel cassetto della scheda quando stai completando una scheda su quel passaggio. Invece di un singolo pulsante **Completa**, puoi offrire scelte come "Unito a un gruppo" o "Non interessato". Ogni risultato può:

- Inviare la scheda a **un altro passaggio** in questo flusso di lavoro,
- **Consegnare la scheda** a un flusso di lavoro completamente diverso, o
- **Chiudere** la scheda.

Questo permette a una decisione di dirammare la persona giù per percorsi diversi.

### Instradamento automatico (condizionale)

Le route automatiche spostano una scheda avanti **nel momento in cui entra in un passaggio** (e dopo che le sue azioni automatizzate finiscono), senza che nessuno faccia clic, se la persona corrisponde a un set di condizioni. Aggiungi una route, scegli il passaggio di destinazione, e definisci una o più **condizioni** (ad esempio, il campus, l'età o lo stato di iscrizione di una persona). Una route senza condizioni corrisponde a tutti.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo instradamento, ad esempio un'etichetta di risultato o "se corrisponde" seguito da una freccia al passaggio di destinazione o al flusso di lavoro.
:::

## Passaggi completamente automatizzati

Puoi fare in modo che un passaggio si esegua interamente da solo, senza che nessuno lo lavori. Assegna al passaggio le sue **azioni automatizzate** e aggiungi una **route automatica** (senza condizioni) che punta al passaggio successivo. Quando una scheda entra, le azioni si eseguono, e poi la route la avanza immediatamente, la scheda passa direttamente.

:::tip
Combina questo con **Attesa**: *Invia email di benvenuto → Attesa 3 giorni → passa automaticamente al passaggio "Chiamata personale"*. L'email e il timing vengono gestiti per te, e un volontario vede la scheda solo quando è il momento per il tocco umano.
:::

## Trigger

I trigger aggiungono persone a un flusso di lavoro automaticamente quando accade qualcosa, quindi non devi mai aggiungere schede a mano. Su una bacheca del flusso di lavoro, fai clic sulla scheda **Trigger**, quindi **Aggiungi trigger**. Ci sono due tipi:

### Trigger di evento

Attivati non appena un record cambia in B1. Scegli l'evento, poi facoltativamente aggiungi **condizioni** in modo che solo le persone corrispondenti vengono aggiunte:

- **Persona · Creata / Aggiornata** -- ad esempio, aggiungi chiunque il cui stato diventa *Visitatore*.
- **Donazione · Creata** -- ad esempio, aggiungi un primo regalo o un regalo grande a un flusso di lavoro di ringraziamento (abbina per importo, fondo o metodo).
- **Gruppo · Membro iscritto** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invii un modulo scelto (ottimo per una scheda "Sono nuovo" o "Connetti").

### Trigger di programmazione

Esegui su base ricorrente -- giornaliera, settimanale, mensile o annuale -- rispetto a un set di condizioni. Usali per la sensibilizzazione basata sul tempo come *tutti coloro il cui anniversario di iscrizione è oggi* o un *mensile* controllo.

Per qualsiasi trigger puoi anche impostare:

- Il **passaggio di ingresso** su cui inizia la nuova scheda (per impostazione predefinita il primo passaggio).
- **Una volta per persona** -- in modo che la stessa persona non sia aggiunta al flusso di lavoro due volte dal trigger.
- **Attivo** -- attiva o disattiva il trigger senza eliminarlo.

:::tip
Abbina un trigger **Modulo · Inviato** al modello **Seguiti per visitatori nuovi** per trasformare il tuo modulo "Connect Card" o "Sono nuovo" in una pipeline di follow-up automatica.
:::

## Le mie schede

I volontari e lo staff non hanno bisogno di scavare attraverso ogni bacheca per trovare il loro lavoro. La pagina **Le mie schede** (collegata dalla pagina Flussi di lavoro) elenca ogni scheda assegnata all'utente attuale su tutti i flussi di lavoro. Fare clic su una scheda apre la bacheca a cui appartiene.

## Rapporti

Apri un flusso di lavoro e fai clic su **Rapporti** per visualizzare l'analittica per quel flusso di lavoro:

- **Scaduta** -- il numero di schede passate dalla data di scadenza.
- **Schede per passaggio** -- quante schede attualmente si trovano su ogni passaggio, mostrate come un grafico a colonne.
- **Completate (30 giorni)** -- il throughput negli ultimi 30 giorni, mostrato come un grafico a linee.

Usali per individuare i colli di bottiglia, ad esempio un passaggio in cui le schede si accumulano e non avanzano mai.

## Articoli correlati

- [Tasks](./tasks.md) -- gli elementi di azione individuale su cui sono costruite le schede del flusso di lavoro
- [Forms](../forms/index.md) -- costruisci i moduli che possono attivare i flussi di lavoro
- [Groups](../groups/index.md) -- i gruppi in cui un'azione "Aggiungi al gruppo" può mettere le persone
- [Roles & Permissions](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
