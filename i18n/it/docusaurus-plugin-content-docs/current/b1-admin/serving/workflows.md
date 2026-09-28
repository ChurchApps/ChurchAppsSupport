---
title: "Flussi di lavoro"
---

# Flussi di lavoro

<div class="article-intro">

I flussi di lavoro spostano le persone attraverso una serie di passaggi su una bacheca visiva. Ogni persona diventa una carta che si sposta da un passaggio al successivo -- da un follow-up per i visitatori per la prima volta, a un processo di iscrizione, a un ringraziamento per i donatori per la prima volta, e qualsiasi altra cosa dove è necessario tracciare molte persone attraverso la stessa serie di fasi. Un passaggio può chiedere a un volontario di fare qualcosa (fare una chiamata, avere una conversazione) **e** eseguire azioni automatizzate di per sé -- inviare un'email, attendere alcuni giorni, aggiungere la persona a un gruppo -- quindi i flussi di lavoro gestiscono sia il follow-up umano che il lavoro di routine ad esso correlato. I flussi di lavoro estendono i [Task](./tasks.md) in una bacheca Kanban trascinabile, in modo che nulla e nessuno cada attraverso le maglie della rete.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone che vuoi tracciare esistano in B1 Admin
- Familiarizza con il funzionamento dei [Task](./tasks.md), poiché ogni carta sulla bacheca è un task
- Per utilizzare l'azione **Invia email**, crea prima i modelli di email che desideri inviare (gestiti in **Messaggistica → Gestisci modelli**)
- Avrai bisogno dell'autorizzazione Task appropriata. La visualizzazione, la modifica delle carte e la gestione dei flussi di lavoro sono livelli di autorizzazione separati (vedi [Ruoli e permessi](../settings/roles-permissions.md))

</div>

## Visualizzazione dei flussi di lavoro

Accedi a **Serving** e seleziona **Flussi di lavoro** dal menu. Vedrai i tuoi flussi di lavoro elencati e raggruppati per categoria, con i flussi di lavoro attivi evidenziati. Fai clic su qualsiasi flusso di lavoro per aprire la sua bacheca.

## Creazione di un flusso di lavoro

1. Nella pagina Flussi di lavoro, fai clic su **Aggiungi flusso di lavoro**.
2. Scegli come iniziare:
   - **Flusso di lavoro vuoto** -- inizia da zero e costruisci i tuoi passaggi.
   - **Da un modello** -- inizia con una serie di passaggi pronta che puoi modificare. I modelli integrati includono:
     - **Follow-up per i nuovi visitatori** -- Invia email di benvenuto → Chiamata telefonica personale → Invita al passaggio successivo → Connesso
     - **Classe di iscrizione** -- Esprimi interesse → Registrati per la lezione → Partecipa alla lezione → Completa l'iscrizione
     - **Ringraziamento per i donatori per la prima volta** -- Invia nota di ringraziamento → Condividi l'impatto della donazione → Amministrato
3. Assegna un **Nome** al flusso di lavoro.
4. Facoltativamente assegna una **Categoria** per raggruppare i flussi di lavoro correlati. Puoi creare una nuova categoria direttamente dal menu a discesa.
5. Lascia il flusso di lavoro **Attivo** affinché le persone possano essere aggiunte, oppure impostalo su **Inattivo** per nasconderlo dagli elenchi di aggiunta al flusso di lavoro.
6. Fai clic su **Salva**.

:::tip
Usa il pulsante **Duplica** nell'elenco Flussi di lavoro per copiare un flusso di lavoro esistente -- inclusi i suoi passaggi, le azioni automatizzate e il routing -- come punto di partenza per uno nuovo.
:::

## Creazione della bacheca con i passaggi

Ogni bacheca del flusso di lavoro è composta da **passaggi**, mostrati come colonne da sinistra a destra. Apri un flusso di lavoro e utilizza **Aggiungi passaggio** per creare ogni fase del tuo processo.

Quando aggiungi o modifichi un passaggio, puoi configurare:

- **Nome del passaggio** -- l'intestazione della colonna (ad esempio, "Chiamata di benvenuto" o "In attesa di registrazione").
- **Dovuto tra (giorni)** -- imposta automaticamente una data di scadenza quando una carta entra in questo passaggio. Le carte dopo la loro data di scadenza sono contrassegnate come **Scadute**.
- **Assegnatario predefinito** -- la persona o il gruppo a cui le nuove carte su questo passaggio sono assegnate automaticamente.
- **Azioni automatizzate** -- cose che il sistema fa di per sé quando una carta arriva (vedi sotto).
- **Routing** -- dove va la carta quando esce dal passaggio (vedi [Routing delle carte con risultati e condizioni](#routing-cards-with-outcomes-and-conditions)).

Trascinare le colonne dei passaggi nell'ordine che corrisponde al tuo processo. L'ordine definisce anche il percorso predefinito che una carta prende quando non si applica alcun altro routing.

:::info
Salva prima un nuovo passaggio. Le azioni automatizzate e il routing si allegano al passaggio, quindi l'editor sblocca quelle sezioni una volta che il passaggio esiste.
:::

## Azioni automatizzate

Ogni passaggio può portare un elenco di **azioni automatizzate** che si eseguono di per sé nel momento in cui una carta **entra** nel passaggio -- prima che qualcuno la tocchi. Questo è il modo in cui un passaggio sia richiede a un volontario *che* si prende cura del lavoro di routine intorno al follow-up.

Nell'editor del passaggio, apri **Azioni automatizzate**, fai clic su **Aggiungi azione**, scegli un tipo, compila le sue impostazioni e fai clic sull'icona di salvataggio su quell'azione. Aggiungi quanti ne hai bisogno; si eseguono **dall'alto verso il basso in ordine**.

| Azione | Cosa fa |
|---|---|
| **Invia email** | Invia un modello di email che scegli alla persona. Puoi ignorare la riga dell'oggetto. |
| **Attendi** | Pausa la carta per un numero di giorni prima di continuare (vedi sotto). |
| **Aggiungi al gruppo** | Aggiunge la persona a un [gruppo](../groups/index.md) che scegli. |
| **Aggiungi al flusso di lavoro** | Avvia la persona su un altro flusso di lavoro -- utile per trasferire tra processi. |
| **Aggiungi nota** | Registra una nota nella cronologia della carta. |
| **Imposta campo** | Aggiorna un campo nel record della persona: Stato di iscrizione, Stato civile, Genere, Città, Provincia o CAP. |
| **Webhook** | Invia i dettagli della carta a un indirizzo web esterno (URL) che fornisci, per connettersi ad altri sistemi. |

Dopo che tutte le azioni di un passaggio finiscono, la carta **riposa su quel passaggio** in modo che una persona possa lavorarla -- a meno che il passaggio non abbia un percorso automatico che la sposti avanti (vedi [Passaggi completamente automatizzati](#fully-automated-steps)).

:::info
Le azioni automatizzate vengono eseguite solo quando una carta arriva attraverso il flusso normale -- quando viene aggiunta per la prima volta, quando un risultato o un percorso automatico la porta dentro, o dopo che un Attendi finisce. Essi **non** vengono rieseguiti quando un membro dello staff sposta manualmente una carta sul passaggio o la rimanda indietro, quindi una persona non riceverà la stessa email due volte.
:::

### Invio di email

Scegli **Invia email**, seleziona uno dei tuoi modelli di email e facoltativamente digita un oggetto personalizzato. Quando una carta entra nel passaggio, la persona riceve automaticamente quell'email. (Se la persona non ha un indirizzo email nel file, il passaggio semplicemente salta questa azione.)

:::info
Le email del flusso di lavoro vengono inviate solo dopo che la tua chiesa è stata approvata per l'invio di email di gruppo e vengono conteggiate verso il limite di email giornaliero della tua chiesa. Vedi [Attivazione dell'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Attendere alcuni giorni (sequenze di gocciolamento)

L'azione **Attendi** tiene una carta per il numero di giorni che hai impostato. Mentre aspetta, la carta si mostra come **Silenziata**. Quando l'attesa è finita:

1. Tutte le **azioni rimanenti sullo stesso passaggio** si eseguono -- in modo da poter costruire un gocciolamento come **Invia email → Attendi 3 giorni → Invia un'email di promemoria**.
2. Quindi, se il passaggio ha un percorso automatico, la carta si sposta avanti; altrimenti riposa sul passaggio per una persona da prendere.

:::tip
Un **Attendi** all'inizio di un passaggio è un modo semplice per "tenere" una carta prima che si presenti a un volontario -- ad esempio, *Attendi 7 giorni, quindi un allenatore ti contatta*.
:::

## Aggiunta di persone come carte

Ci sono diversi modi per mettere le persone su una bacheca:

- **Dalla bacheca** -- Fai clic su **Aggiungi carta** in fondo a una colonna di passaggio e scegli una persona. Puoi anche scegliere un gruppo e tutti i membri di quel gruppo vengono aggiunti come carta.
- **Dal record di una persona** -- Usa **Aggiungi al flusso di lavoro** nella pagina di una persona per metterla su un flusso di lavoro.
- **Dalla ricerca persone** -- Seleziona più persone e utilizza l'azione in blocco **Aggiungi al flusso di lavoro** per aggiungerle tutte contemporaneamente.
- **Automaticamente con un trigger** -- Aggiungi persone quando accade qualcosa, come un invio del modulo o un primo dono (vedi [Trigger](#triggers) sotto).

## Lavorare sulla bacheca

Apri un flusso di lavoro per vedere la sua bacheca. Ogni carta mostra il nome della persona, a chi è assegnata e un chip di data di scadenza o stato (**Scaduta** o **Silenziata**). Una colonna di passaggio mostra anche piccoli badge per qualsiasi azione automatizzata che esegue e annotazioni per il suo routing, dandoti una mappa al volo di come le carte scorrono.

- **Sposta una carta** -- Trascinare una carta da una colonna a quella successiva mentre la persona progredisce.
- **Apri una carta** -- Fai doppio clic su una carta (o fai clic su di essa) per aprire il suo cassetto dei dettagli, dove puoi cambiare il passaggio, riassegnarla, aggiungere note e rivedere quello che è già successo.

Dal cassetto della carta puoi:

- **Assegna** la carta a una persona o un gruppo diverso.
- **Silenzia** la carta per 1 giorno, 3 giorni o 1 settimana per nascondere temporaneamente la sua data di scadenza.
- **Rimanda indietro** al passaggio precedente o **Salta** al passaggio successivo.
- **Assegnazione pin** -- mantieni lo stesso proprietario sulla carta anche mentre si sposta tra i passaggi. Per impostazione predefinita, lo spostamento di una carta su un nuovo passaggio la riassegna all'assegnatario predefinito di quel passaggio; il pinning mantiene la persona responsabile in tutto il processo.
- **Completa** la carta per terminarla, oppure scegli un pulsante **Risultato** se il passaggio ha risultati configurati (vedi [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Aggiungi note** e rivedi la **cronologia** della carta -- incluso un registro di azioni automatizzate che sono state eseguite (email inviate, attese, ecc.).

### Azioni in blocco

Seleziona le caselle di controllo su più carte per agire su di esse insieme. Appare una barra degli strumenti che ti consente di **Completare**, **Silenziare**, **Riassegnare** o **Spostare** tutte le carte selezionate su un altro passaggio contemporaneamente.

## Routing delle carte con risultati e condizioni

Il routing controlla dove va una carta quando esce da un passaggio. Apri l'editor di un passaggio per configurare due tipi di routing.

### Pulsanti di risultato

I risultati sono pulsanti mostrati nel cassetto della carta quando stai completando una carta su quel passaggio. Invece di un singolo pulsante **Completa**, puoi offrire scelte come "Iscritto a un gruppo" o "Non interessato". Ogni risultato può:

- Inviare la carta a **un altro passaggio** in questo flusso di lavoro,
- **Trasferire la carta** a un flusso di lavoro completamente diverso, o
- **Chiudere** la carta.

Questo consente a una decisione di diramazione verso la persona percorsi diversi.

### Routing automatico (condizionale)

I percorsi automatici spostano una carta in avanti **nel momento in cui entra in un passaggio** (e dopo che le sue azioni automatizzate finiscono), senza che nessuno faccia clic, se la persona corrisponde a un insieme di condizioni. Aggiungi un percorso, scegli il passaggio di destinazione e definisci una o più **condizioni** (ad esempio, un campus, un'età o uno stato di iscrizione della persona). Un percorso senza condizioni corrisponde a tutti.

:::info
Sulla bacheca, ogni colonna di passaggio mostra piccole annotazioni che descrivono il suo routing -- ad esempio, un'etichetta di risultato o "se corrisponde" seguita da una freccia verso il passaggio di destinazione o il flusso di lavoro.
:::

## Passaggi completamente automatizzati

Puoi fare in modo che un passaggio si esegua completamente da solo, senza che nessuno lo lavori. Assegna al passaggio le sue **azioni automatizzate** e aggiungi un **percorso automatico** (senza condizioni) che punta al passaggio successivo. Quando una carta entra, le azioni si eseguono e poi il percorso l'avanza immediatamente -- la carta passa dritta.

:::tip
Combinalo con **Attendi**: *Invia email di benvenuto → Attendi 3 giorni → avanza automaticamente al passaggio "Chiamata personale".* L'email e i tempi sono gestiti per te, e un volontario vede la carta solo quando è il momento per il tocco umano.
:::

## Trigger

I trigger aggiungono persone a un flusso di lavoro automaticamente quando accade qualcosa, in modo che tu non debba mai aggiungere carte a mano. Su una bacheca del flusso di lavoro, fai clic sulla scheda **Trigger**, quindi su **Aggiungi trigger**. Ci sono due tipi:

### Trigger di evento

Si attivano non appena un record cambia in B1. Scegli l'evento, quindi facoltativamente aggiungi **condizioni** in modo che solo le persone corrispondenti vengano aggiunte:

- **Persona · Creata / Aggiornata** -- ad esempio, aggiungi chiunque il cui stato diventa *Visitatore*.
- **Donazione · Creata** -- ad esempio, aggiungi un dono per la prima volta o di grandi dimensioni a un flusso di lavoro di ringraziamento (abbina per importo, fondo o metodo).
- **Gruppo · Membro iscritto** / **Gruppo · Creato**.
- **Modulo · Inviato** -- aggiungi chiunque invia un modulo scelto (ottimo per una carta "Sono nuovo" o "Connetti").

### Trigger di pianificazione

Esegui su base ricorrente -- giornaliera, settimanale, mensile o annuale -- su un insieme di condizioni. Usali per il raggiungimento basato sul tempo come *tutti coloro il cui anniversario di iscrizione è oggi* o un *controllo mensile*.

Per qualsiasi trigger puoi anche impostare:

- Il **passaggio di ingresso** su cui la nuova carta inizia (per impostazione predefinita il primo passaggio).
- **Una volta per persona** -- in modo che la stessa persona non venga aggiunta al flusso di lavoro due volte dal trigger.
- **Attivo** -- accendi o spegni il trigger senza eliminarlo.

:::tip
Abbina un trigger **Modulo · Inviato** al modello **Follow-up per i nuovi visitatori** per trasformare il tuo modulo "Carta di connessione" o "Sono nuovo" in una pipeline di follow-up automatica.
:::

## Le mie carte

I volontari e lo staff non hanno bisogno di scavare in ogni bacheca per trovare il loro lavoro. La pagina **Le mie carte** (collegata dalla pagina Flussi di lavoro) elenca ogni carta assegnata all'utente corrente in tutti i flussi di lavoro. Facendo clic su una carta si apre la bacheca a cui appartiene.

## Report

Apri un flusso di lavoro e fai clic su **Report** per vedere gli analytics per quel flusso di lavoro:

- **Scadute** -- il numero di carte dopo la loro data di scadenza.
- **Carte per passaggio** -- quante carte attualmente si trovano su ogni passaggio, mostrate come un grafico a colonne.
- **Completato (30 giorni)** -- la velocità effettiva negli ultimi 30 giorni, mostrata come un grafico lineare.

Usali per individuare i colli di bottiglia -- ad esempio, un passaggio dove le carte si ammassano e mai avanzano.

## Articoli correlati

- [Task](./tasks.md) -- i singoli elementi di azione su cui sono costruite le carte del flusso di lavoro
- [Moduli](../forms/index.md) -- costruisci i moduli che possono attivare i flussi di lavoro
- [Gruppi](../groups/index.md) -- i gruppi in cui un'azione "Aggiungi al gruppo" può inserire le persone
- [Ruoli e permessi](../settings/roles-permissions.md) -- controlla chi può visualizzare, modificare e gestire i flussi di lavoro
