---
title: "Flussi di lavoro"
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro guidano le persone attraverso una serie di passaggi su una bacheca visuale. Ogni persona diventa una carta che si sposta da un passaggio al successivo -- dal follow-up di un ospite al primo viaggio, a un processo di appartenenza, a un ringraziamento al primo donatore, e qualsiasi altro punto in cui devi tracciare molte persone attraverso la stessa serie di fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una chiamata, avere una conversazione) **e** eseguire azioni automatizzate da solo -- inviare un'email, aspettare alcuni giorni, aggiungere la persona a un gruppo -- così i flussi di lavoro gestiscono sia il follow-up umano che il lavoro noioso intorno ad esso. I flussi di lavoro estendono [Attività](./tasks.md) in una bacheca Kanban trascinabile in modo che nulla e nessuno cada tra le crepe.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che desideri tracciare esistano in B1 Admin
- Familiarizzati con il modo in cui funzionano le [Attività](./tasks.md), poiché ogni carta su una bacheca è un'attività
- Per utilizzare l'azione **Invia email**, crea prima i modelli di email che desideri inviare (gestiti in **Messaggistica → Gestisci modelli**)
- Avrai bisogno dell'autorizzazione appropriata per le Attività. Visualizzazione, modifica delle carte e gestione dei flussi di lavoro sono livelli di autorizzazione separati (vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md))

</div>

## Visualizzazione dei flussi di lavoro

Vai a **Servizio**, apri l'area **Attività** e seleziona **Flussi di lavoro** dal menu. Vedrai i tuoi flussi di lavoro elencati e raggruppati per categoria, con i flussi di lavoro attivi evidenziati. Fai clic su qualsiasi flusso di lavoro per aprire la sua bacheca.

## Creazione di un flusso di lavoro

1. Sulla pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso di lavoro vuoto** -- inizia da zero e crea i tuoi passaggi.
   - **Da un modello** -- inizia con una serie pronta di passaggi che puoi modificare. I modelli incorporati includono:
     - **Seguito ospiti al primo viaggio** -- Invia email di benvenuto → Chiamata telefonica personale → Invita al passo successivo → Connesso
     - **Classe di appartenenza** -- Manifesta interesse → Registrazione per classe → Frequenza della classe → Completa appartenenza
     - **Ringraziamento del primo donatore** -- Invia nota di ringraziamento → Condividi impatto delle donazioni → Amministrato
3. Dai al flusso di lavoro un **Nome**.
4. Facoltativamente assegna una **Categoria** per raggruppare i flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
5. Lascia il flusso di lavoro **Attivo** in modo che le persone possano essere aggiunte, o impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta al flusso di lavoro.
6. Fai clic su **Salva**.

:::tip
Usa il pulsante **Duplica** nell'elenco dei flussi di lavoro per copiare un flusso di lavoro esistente -- inclusi i suoi passaggi, le azioni automatizzate e il routing -- come punto di partenza per uno nuovo.
:::

## Costruzione della bacheca con i passaggi

Ogni bacheca del flusso di lavoro è costituita da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e usa **Aggiungi passaggio** per creare ogni fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Nome del passaggio** -- l'intestazione della colonna (ad esempio, "Chiamata di benvenuto" o "In attesa di registrazione").
- **Scadenza tra (giorni)** -- imposta automaticamente una data di scadenza quando una carta entra in questo passaggio. Le carte oltre la data di scadenza vengono contrassegnate come **Scadute**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui le nuove carte su questo passaggio vengono assegnate automaticamente.
- **Azioni automatizzate** -- cose che il sistema fa da solo quando una carta arriva (vedi sotto).
- **Routing** -- dove va la carta quando esce dal passaggio (vedi [Routing](#routing-cards-with-outcomes-and-conditions)).

Trascina le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una carta segue quando non si applica nessun altro routing.

:::info
Salva prima un nuovo passaggio. Le azioni automatizzate e il routing si allegano al passaggio, così l'editor sblocca quelle sezioni una volta che il passaggio esiste.
:::

## Azioni automatizzate

Ogni passaggio può portare un elenco di **azioni automatizzate** che vengono eseguite da sole nel momento in cui una carta **entra** nel passaggio -- prima che chiunque la tocchi. Questo è il modo in cui un passaggio sia richiede a un volontario *che* si prende cura del lavoro di routine intorno al follow-up.

Nell'editor del passaggio, apri **Azioni automatizzate**, fai clic su **Aggiungi azione**, scegli un tipo, compila le sue impostazioni e fai clic sull'icona di salvataggio su quell'azione. Aggiungine quante ne hai bisogno; vengono eseguite **dall'alto verso il basso in ordine**.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia alla persona un modello di email che scegli. Puoi ignorare la riga dell'oggetto. |
| **Attendi** | Mette in pausa la carta per un numero di giorni prima di continuare (vedi sotto). |
| **Aggiungi a gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Aggiungi a flusso di lavoro** | Avvia la persona in un altro flusso di lavoro -- utile per il passaggio tra processi. |
| **Aggiungi nota** | Registra una nota nella cronologia della carta. |
| **Imposta campo** | Aggiorna un campo nel record della persona: Stato di appartenenza, Stato civile, Genere, Città, Stato o CAP. |
| **Webhook** | Invia i dettagli della carta a un indirizzo web esterno (URL) che fornisci, per connettersi ad altri sistemi. |

Dopo che tutte le azioni di un passaggio terminano, la carta **riposa su quel passaggio** così una persona può lavorarci -- a meno che il passaggio non abbia una rotta automatica che la sposta avanti (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatizzate vengono eseguite solo quando una carta arriva attraverso il flusso normale -- quando viene aggiunta per la prima volta, quando un outcome o una rotta automatica la porta in, o dopo che un Attendi finisce. **Non** vengono rieseguite quando un membro dello staff trascina manualmente una carta sul passaggio o la rimanda, quindi una persona non riceverà due volte la stessa email.
:::

### Invio di email

Scegli **Invia email**, scegli uno dei tuoi modelli di email e facoltativamente digita un oggetto personalizzato. Quando una carta entra nel passaggio, la persona riceve quell'email automaticamente. (Se la persona non ha un indirizzo email su file, il passaggio semplicemente salta questa azione.)

### Attesa di alcuni giorni (sequenze gocciolanti)

L'azione **Attendi** contiene una carta per il numero di giorni che imposti. Mentre aspetta, la carta mostra come **Posticipata**. Quando l'attesa è finita:

1. Qualsiasi **azione rimanente sullo stesso passaggio** viene eseguita -- in modo che tu possa costruire una gocciolina come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Quindi, se il passaggio ha una rotta automatica, la carta si sposta; altrimenti riposa sul passaggio per una persona da prendere in carico.

:::tip
Un **Attendi** all'inizio stesso di un passaggio è un modo semplice per "contenere" una carta prima che arrivi a un volontario -- ad esempio, *Attendi 7 giorni, quindi un allenatore si mette in contatto*.
:::

## Aggiunta di persone come carte

Ci sono diversi modi per mettere le persone su una bacheca:

- **Dalla bacheca** -- Fai clic su **Aggiungi carta** in fondo a una colonna del passaggio e scegli una persona. Puoi anche scegliere un gruppo e ogni membro di quel gruppo viene aggiunto come carta.
- **Dal record di una persona** -- Usa **Aggiungi a flusso di lavoro** sulla pagina di una persona per lasciarla su un flusso di lavoro.
- **Da ricerca Persone** -- Seleziona più persone e usa l'azione in blocco **Aggiungi a flusso di lavoro** per aggiungerle tutte contemporaneamente.
- **Automaticamente con un trigger** -- Aggiungi persone quando qualcosa accade, come un invio di modulo o un primo regalo (vedi [Trigger](#triggers) sotto).

## Utilizzo della bacheca

Apri un flusso di lavoro per vedere la sua bacheca. Ogni carta mostra il nome della persona, a chi è assegnata e un chip di data di scadenza o stato (**Scaduta** o **Posticipata**). Una colonna del passaggio mostra anche piccoli badge per qualsiasi azione automatizzata che esegue e annotazioni per il suo routing, dandoti una mappa a colpo d'occhio di come le carte fluiscono.

- **Sposta una carta** -- Trascina una carta da una colonna alla successiva man mano che la persona progredisce.
- **Apri una carta** -- Fai doppio clic su una carta (o fai clic su di essa) per aprire il suo drawer di dettaglio, dove puoi cambiare il passaggio, riassegnarla, aggiungere note e rivedere ciò che è già accaduto.

Dal drawer della carta puoi:

- **Assegna** la carta a una persona o un gruppo diverso.
- **Posticipa** la carta per 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua data di scadenza.
- **Rimanda** al passaggio precedente o **Salta** al passaggio successivo.
- **Fissa l'assegnazione** -- mantieni lo stesso proprietario sulla carta mentre si sposta tra i passaggi. Per impostazione predefinita, lo spostamento di una carta in un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; il fissaggio mantiene la persona responsabile durante il processo.
- **Completa** la carta per terminarla, o scegli un pulsante di **Outcome** se il passaggio ha outcome configurati (vedi [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Aggiungi note** e rivedi la **cronologia** della carta -- incluso un registro di azioni automatizzate che sono state eseguite (email inviate, attese, ecc.).

### Azioni in blocco

Seleziona le caselle su più carte per agire su di loro insieme. Una barra degli strumenti appare permettendoti di **Completare**, **Posticipare**, **Riassegnare** o **Spostare** tutte le carte selezionate in un altro passaggio contemporaneamente.

## Routing delle carte con outcome e condizioni

Il routing controlla dove va una carta quando esce da un passaggio. Apri l'editor di un passaggio per configurare due tipi di routing.

### Pulsanti di outcome

Gli outcome sono pulsanti mostrati nel drawer della carta quando completi una carta su quel passaggio. Invece di un singolo pulsante **Completa**, puoi offrire scelte come "Unito a un gruppo" o "Non interessato". Ogni outcome può:

- Inviare la carta a **un altro passaggio** in questo flusso di lavoro,
- **Passare la carta** a un flusso di lavoro completamente diverso, o
- **Chiudere** la carta.

Questo permette a una decisione di ramificare la persona in percorsi diversi.

### Routing automatico (condizionale)

Le route automatiche spostano una carta **nel momento in cui entra in un passaggio** (e dopo che le sue azioni automatizzate terminano), senza che nessuno faccia clic, se la persona corrisponde a una serie di condizioni. Aggiungi una route, scegli il passaggio di destinazione e definisci una o più **condizioni** (ad esempio, il campus di una persona, l'età o lo stato di appartenenza). Una route senza condizioni corrisponde a tutti.

:::info
Sulla bacheca, ogni colonna del passaggio mostra piccole annotazioni che descrivono il suo routing -- ad esempio, un'etichetta di outcome o "se corrisponde" seguito da una freccia al passaggio o al flusso di lavoro di destinazione.
:::

## Passaggi completamente automatizzati

Puoi fare in modo che un passaggio venga eseguito completamente da solo, senza che nessuno lo lavori. Dai al passaggio le sue **azioni automatizzate** e aggiungi una **route automatica** (senza condizioni) che punta al passaggio successivo. Quando una carta entra, le azioni vengono eseguite, e poi la route la avanza immediatamente -- la carta passa direttamente.

:::tip
Combina questo con **Attendi**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Chiamata personale".* L'email e il timing vengono gestiti per te, e un volontario vede la carta solo quando è il momento per il tocco umano.
:::

## Trigger

I trigger aggiungono persone a un flusso di lavoro automaticamente quando qualcosa accade, in modo da non dover mai aggiungere carte manualmente. Su una bacheca del flusso di lavoro, fai clic sulla scheda **Trigger**, quindi su **Aggiungi trigger**. Ci sono due tipi:

### Trigger di evento

Si attivano non appena un record cambia in B1. Scegli l'evento, quindi aggiungi facoltativamente **condizioni** in modo che vengano aggiunte solo persone corrispondenti:

- **Persona · Creata / Aggiornata** -- ad esempio aggiungi chiunque il cui stato diventi *Visitatore*.
- **Donazione · Creata** -- ad esempio aggiungi un regalo al primo viaggio o un grande regalo a un flusso di lavoro di ringraziamento (corrispondi su importo, fondo o metodo).
- **Gruppo · Membro aggiunto** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invii un modulo scelto (ottimo per una carta "I'm New" o "Connect").

### Trigger di pianificazione

Eseguiti su base ricorrente -- giornalmente, settimanalmente, mensilmente o annualmente -- rispetto a una serie di condizioni. Usali per il raggiungimento basato sul tempo come *tutti coloro il cui anniversario di appartenenza è oggi* o un *controllo mensile*.

Per qualsiasi trigger puoi anche impostare:

- Il **passaggio di entrata** su cui inizia la nuova carta (predefinito è il primo passaggio).
- **Una volta per persona** -- in modo che la stessa persona non venga aggiunta al flusso di lavoro due volte dal trigger.
- **Attivo** -- accendi o spegni il trigger senza eliminarlo.

:::tip
Accoppia un trigger **Modulo · Inviato** con il modello **Seguito ospiti al primo viaggio** per trasformare la tua carta "Connect" o il modulo "I'm New" in una pipeline di follow-up automatica.
:::

## Le mie carte

I volontari e lo staff non hanno bisogno di scavare attraverso ogni bacheca per trovare il loro lavoro. La pagina **Le mie carte** (collegata dalla pagina Flussi di lavoro) elenca ogni carta assegnata all'utente corrente in tutti i flussi di lavoro. Facendo clic su una carta si apre la bacheca a cui appartiene.

## Report

Apri un flusso di lavoro e fai clic su **Report** per vedere l'analittica per quel flusso di lavoro:

- **Scadute** -- il numero di carte oltre la loro data di scadenza.
- **Carte per passaggio** -- quante carte attualmente si trovano su ogni passaggio, mostrate come grafico a colonne.
- **Completate (30 giorni)** -- throughput negli ultimi 30 giorni, mostrato come grafico a linee.

Usalo per individuare i colli di bottiglia -- ad esempio, un passaggio in cui le carte si ammassano e non avanzano mai.

## Articoli correlati

- [Attività](./tasks.md) -- gli elementi di azione individuali su cui vengono costruite le carte del flusso di lavoro
- [Automazioni](./automations.md) -- crea attività ricorrenti secondo una pianificazione
- [Moduli](../forms/index.md) -- costruisci i moduli che possono attivare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui un'azione "Aggiungi a gruppo" può inserire le persone
- [Ruoli e autorizzazioni](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
