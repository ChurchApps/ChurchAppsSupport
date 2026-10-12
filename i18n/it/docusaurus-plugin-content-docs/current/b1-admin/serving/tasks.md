---
title: "Attività"
---

# Attività

<div class="article-intro">

Le attività ti permettono di assegnare elementi d'azione alle persone o ai gruppi nella tua chiesa. Che si tratti di un compito una tantum o di una responsabilità ricorrente, le attività ti aiutano a tenere traccia di ciò che deve essere fatto e chi è responsabile in modo che nulla venga tralasciato.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Assicurati che le persone o i [gruppi](../groups/creating-groups.md) a cui vuoi assegnare le attività esistano in B1 Admin
- Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Servizio > Il Mio Lavoro** per vedere le attività

</div>

## Visualizzazione delle Attività

Nel menu Jump, scegli **Servizio > Il Mio Lavoro** (o ricerca "Il Mio Lavoro"). Vedrai l'elenco **Tasks** con il titolo di ogni attività, la persona a cui è associata, l'assegnatario, la data di apertura e lo stato. Le tue schede del [flusso di lavoro](./workflows.md) compaiono accanto all'elenco, sotto **My Cards**.

Usa le schede sopra l'elenco per passare tra le attività **Assigned to Me**, **Assigned to My Groups** e **Requested by Me**. Ogni scheda mostra quante attività contiene.

:::tip
Per impostazione predefinita, vengono mostrate solo le attività aperte. Scegli **Closed** sopra l'elenco per vedere invece le attività completate.
:::

## Creazione di un'Attività

1. Nella pagina **My Work**, fai clic su **Aggiungi Attività**. Si apre un modulo **New Task**.
2. Fai clic sulla casella **Associate with** e scegli la persona a cui si riferisce l'attività.
3. Fai clic sulla casella **Assign to**. Nella finestra **Select a Person or Group**, cerca nella scheda **Person**, oppure passa alla scheda **Group** e cerca un gruppo, quindi seleziona il risultato.
4. Inserisci un **Title** per l'attività.
5. Aggiungi **Notes** con qualsiasi dettaglio o istruzione per l'assegnatario.
6. Fai clic su **Salva**.

L'attività apparirà ora nell'elenco delle attività e sarà visibile all'assegnatario sulla loro dashboard e nell'app mobile.

## Gestione di un'Attività

Fai clic su qualsiasi attività per aprire la sua pagina di dettagli. Da qui puoi:

- **Chiudi o riapri l'attività** -- Fai clic su **Close task** quando il lavoro è completato, oppure su **Reopen task** per riaprirla.
- **Riassegna l'attività** -- Fai clic su **Assign** per scegliere un'altra persona o gruppo.
- **Cambia a chi si riferisce** -- Fai clic su **Associate** per scegliere un'altra persona.
- **Aggiungi note** -- Pubblica aggiornamenti o dettagli per l'assegnatario nelle note dell'attività.
- **Imposta promemoria** -- Vedi [Promemoria delle attività](#task-reminders) sotto.

## Promemoria delle Attività {#task-reminders}

Un'attività con una data di scadenza può ricordare al suo assegnatario la scadenza.

1. Nella pagina dell'attività, fai clic su **Edit** accanto a **Reminders**.
2. Attiva **Send reminders for this task**.
3. In **When should reminders go out?**, scegli fino a tre tempi: **7 days before**, **3 days before**, **1 day before** o **Day of**.
4. Imposta il **Time of Day** e, facoltativamente, un **Message**.
5. In **Send By**, scegli **Push**, **Email** e, se la tua chiesa ha collegato un [provider SMS](../settings/church-settings.md#texting), **Text**.
6. Fai clic su **Save Reminders**.

Se l'attività non ha una scadenza, B1 ti avvisa che non verrà inviato alcun promemoria finché non ne imposti una. I promemoria via SMS raggiungono solo le persone che hanno attivato **Text messages** nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md), e ogni SMS può comportare un costo per la tua chiesa.

## Ciclo di Vita dell'Attività

1. Una nuova attività inizia con uno stato di **Aperta**.
2. L'assegnatario riceve una notifica e può visualizzare l'attività dalla sua dashboard, **Servizio > Il Mio Lavoro** o dall'app mobile.
3. Una volta completato il lavoro, l'assegnatario (o un admin) fa clic su **Close task**.
4. Le attività chiuse vengono rimosse dalla visualizzazione predefinita ma possono comunque essere trovate scegliendo **Closed** sopra l'elenco delle attività.

:::info
B1 Admin non crea più attività ricorrenti su un programma. Per il follow-up ripetuto con le persone, utilizza un [flusso di lavoro](./workflows.md) con un [trigger di pianificazione](./workflows.md#schedule-triggers).
:::

:::tip
Quando hai bisogno di spostare molte persone attraverso lo stesso insieme di fasi -- come il follow-up del nuovo visitatore o un processo di appartenenza -- utilizza [Flussi di Lavoro](./workflows.md). I flussi di lavoro trasformano le attività in schede su una bacheca con trascinamento con fasi, date di scadenza e instradamento.
:::

:::info
Alcune attività vengono create automaticamente da altre parti di B1 e si aprono su una scheda di revisione speciale invece della visualizzazione nota/riassegnazione standard -- [richieste di adesione al gruppo](../groups/group-join-requests.md#approving-from-the-tasks-page), [richieste di modifica del profilo](../profile/approving-profile-changes.md) e [richieste di eliminazione dell'account](../profile/account-deletion.md) funzionano in questo modo.
:::

## Passi Successivi

- Sposta le persone attraverso un processo multifase con [Flussi di Lavoro](./workflows.md)
- Utilizza [Flussi di Lavoro](./workflows.md) per spostare le persone attraverso processi ripetibili automaticamente
- Utilizza le attività insieme a [Piani di Servizio](./plans.md) per tenere traccia degli elementi d'azione di preparazione del servizio
