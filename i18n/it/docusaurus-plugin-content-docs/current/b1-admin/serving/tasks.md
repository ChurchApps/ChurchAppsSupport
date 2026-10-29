---
title: "Attività"
---

# Attività

<div class="article-intro">

Le attività ti permettono di assegnare azioni a persone o gruppi della tua chiesa. Che si tratti di un'attività da fare una sola volta o di una responsabilità ricorrente, le attività ti aiutano a tenere traccia di ciò che va fatto e di chi se ne occupa, così nulla viene dimenticato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone o i [gruppi](../groups/creating-groups.md) a cui vuoi assegnare attività esistano in B1 Admin
- Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Serving > My Work** per vedere le attività

</div>

## Visualizzare le attività

Nel menu Jump, scegli **Serving > My Work** (oppure cerca "My Work"). L'elenco **Tasks** mostra il titolo di ogni attività, a chi è associata, a chi è assegnata, quando è stata aperta e il suo stato. Le tue schede di [workflow](./workflows.md) compaiono accanto ad essa sotto **My Cards**.

Usa le schede sopra l'elenco per passare tra le attività **Assigned to Me**, **Assigned to My Groups** e **Requested by Me**. Ogni scheda mostra quante attività contiene.

:::tip
Per impostazione predefinita vengono mostrate solo le attività aperte. Scegli **Closed** sopra l'elenco per vedere invece le attività completate.
:::

## Creare un'attività

1. Nella pagina **My Work**, clicca su **Add Task**. Si apre un modulo **New Task**.
2. Clicca sulla casella **Associate with** e scegli la persona a cui si riferisce l'attività.
3. Clicca sulla casella **Assign to**. Nella finestra **Select a Person or Group**, cerca nella scheda **Person**, oppure passa alla scheda **Group** e cerca un gruppo, quindi seleziona il risultato.
4. Inserisci un **Title** per l'attività.
5. Facoltativamente, scegli una **Due date**.
6. Aggiungi delle **Notes** con eventuali dettagli o istruzioni per il destinatario.
7. Clicca su **Save**.

L'attività comparirà ora nell'elenco delle attività e sarà visibile al destinatario nella sua dashboard e nell'app mobile.

## Gestire un'attività

Clicca su un'attività qualsiasi per aprire la sua pagina di dettaglio. Da qui puoi:

- **Chiudere o riaprire l'attività** -- Clicca su **Close task** quando il lavoro è completato, oppure su **Reopen task** per riaprirla.
- **Riassegnare l'attività** -- Clicca su **Assign** per scegliere una persona o un gruppo diverso.
- **Cambiare a chi si riferisce** -- Clicca su **Associate** per scegliere un'altra persona.
- **Cambiare la scadenza** -- Scegli una data nel campo **Due**; viene salvata quando clicchi altrove. (Le attività create per una [conferma di assegnazione al servizio](./workflows.md#serving-assignment-confirmations) mostrano la loro scadenza ma non possono essere modificate qui.)
- **Aggiungere note** -- Pubblica aggiornamenti o dettagli per il destinatario nelle note dell'attività.
- **Impostare promemoria** -- Vedi [Promemoria delle attività](#task-reminders) più sotto.

## Promemoria delle attività {#task-reminders}

Un'attività con una scadenza può ricordare al suo destinatario la scadenza prima che arrivi.

1. Nella pagina dell'attività, clicca su **Edit** accanto a **Reminders**.
2. Attiva **Send reminders for this task**.
3. In **When should reminders go out?**, scegli fino a tre tempistiche: **7 days before**, **3 days before**, **1 day before** oppure **Day of**.
4. Imposta l'**Time of Day** e, facoltativamente, un **Message**.
5. In **Send By**, scegli **Push**, **Email** e, se la tua chiesa ha collegato un [provider di messaggistica](../settings/church-settings.md#texting), **Text**.
6. Clicca su **Save Reminders**.

Se l'attività non ha una scadenza, B1 ti avvisa che non verranno inviati promemoria finché non ne viene impostata una nel campo **Due**. I promemoria via SMS raggiungono solo le persone che hanno attivato **Text messages** nelle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md), e ogni SMS può comportare un costo per la chiesa.

## Ciclo di vita di un'attività

1. Una nuova attività inizia con lo stato **Open**.
2. Il destinatario riceve una notifica e può visualizzare l'attività dalla sua dashboard, da **Serving > My Work** o dall'app mobile.
3. Una volta completato il lavoro, il destinatario (o un amministratore) clicca su **Close task**.
4. Le attività chiuse vengono rimosse dalla vista predefinita, ma possono essere ritrovate scegliendo **Closed** sopra l'elenco delle attività.

:::info
B1 Admin non crea più attività ricorrenti secondo una pianificazione. Per i follow-up ripetuti con le persone, usa un [workflow](./workflows.md) con un [trigger di pianificazione](./workflows.md#schedule-triggers).
:::

:::tip
Quando devi far passare molte persone attraverso la stessa serie di fasi — come il follow-up dei nuovi visitatori o un percorso di adesione — usa i [Workflow](./workflows.md). I workflow trasformano le attività in schede su una bacheca drag-and-drop con passaggi, scadenze e instradamento.
:::

:::info
Alcune attività vengono create automaticamente da altre parti di B1 e si aprono con una scheda di revisione speciale invece della classica vista di note/riassegnazione — le [richieste di adesione a un gruppo](../groups/group-join-requests.md#approving-from-the-tasks-page), le [richieste di modifica del profilo](../profile/approving-profile-changes.md) e le [richieste di eliminazione dell'account](../profile/account-deletion.md) funzionano tutte in questo modo.
:::

## Prossimi passi

- Guida le persone attraverso un processo a più passaggi con i [Workflow](./workflows.md)
- Usa i [Workflow](./workflows.md) per far avanzare automaticamente le persone attraverso processi ripetibili
- Usa le attività insieme ai [Piani di servizio](./plans.md) per tenere traccia delle azioni di preparazione del servizio
