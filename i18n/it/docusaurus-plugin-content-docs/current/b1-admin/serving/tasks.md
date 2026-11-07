---
title: "Attività"
description: "Crea, assegna e chiudi attività in B1 Admin, trovale in Serving > My Work e imposta promemoria per la scadenza così nessun seguito viene dimenticato."
---

# Attività

<div class="article-intro">

Le attività ti permettono di assegnare azioni a persone o gruppi della tua chiesa. Che si tratti di un'attività una tantum o di una responsabilità ricorrente, le attività ti aiutano a tenere traccia di cosa va fatto e di chi è responsabile, così nulla viene trascurato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone o i [gruppi](../groups/creating-groups.md) a cui vuoi assegnare attività esistano in B1 Admin
- Nel [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu), scegli **Servizio > Il mio lavoro** per vedere le attività

</div>

## Visualizzare le attività

Nel menu di navigazione rapida, scegli **Servizio > Il mio lavoro** (oppure cerca "Il mio lavoro"). L'elenco **Attività** mostra il titolo di ciascuna attività, a chi è associata, a chi è assegnata, quando è stata aperta e il suo stato. Le tue schede del [flusso di lavoro](./workflows.md) compaiono accanto ad essa in **Le mie schede**.

Usa le schede sopra l'elenco per passare tra le attività **Assegnate a me**, **Assegnate ai miei gruppi** e **Richieste da me**. Ogni scheda mostra quante attività contiene.

:::tip
Per impostazione predefinita, vengono mostrate solo le attività aperte. Scegli **Chiuse** sopra l'elenco per vedere invece le attività completate.
:::

## Creare un'attività

1. Nella pagina **Il mio lavoro**, clicca su **Aggiungi attività**. Si apre il modulo **Nuova attività**.
2. Clicca sulla casella **Associa a** e scegli la persona a cui si riferisce l'attività.
3. Clicca sulla casella **Assegna a**. Nella finestra **Seleziona una persona o un gruppo**, cerca nella scheda **Persona**, oppure passa alla scheda **Gruppo** e cerca un gruppo, poi seleziona il risultato.
4. Inserisci un **Titolo** per l'attività.
5. Facoltativamente scegli una **Data di scadenza**.
6. Aggiungi delle **Note** con eventuali dettagli o istruzioni per chi la riceve.
7. Clicca su **Salva**.

L'attività comparirà ora nell'elenco delle attività e sarà visibile a chi la riceve nella sua dashboard e nell'app mobile.

## Gestire un'attività

Clicca su un'attività qualsiasi per aprire la sua pagina di dettaglio. Da qui puoi:

- **Chiudere o riaprire l'attività** -- Clicca su **Chiudi attività** quando il lavoro è completato, oppure su **Riapri attività** per riaprirla.
- **Riassegnare l'attività** -- Clicca su **Assegna** per scegliere un'altra persona o un altro gruppo.
- **Cambiare a chi si riferisce** -- Clicca su **Associa** per scegliere un'altra persona.
- **Cambiare la data di scadenza** -- Scegli una data nel campo **Scadenza**; viene salvata quando clicchi altrove. (Le attività create per una [conferma di assegnazione di servizio](./workflows.md#serving-assignment-confirmations) mostrano la loro data di scadenza ma non possono essere modificate qui.)
- **Aggiungere note** -- Pubblica aggiornamenti o dettagli per chi riceve l'attività nelle note dell'attività.
- **Impostare promemoria** -- Vedi [Promemoria delle attività](#task-reminders) più sotto.

## Promemoria delle attività {#task-reminders}

Un'attività con una data di scadenza può ricordare a chi la riceve la scadenza prima che arrivi.

1. Nella pagina dell'attività, clicca su **Modifica** accanto a **Promemoria**.
2. Attiva **Invia promemoria per questa attività**.
3. Sotto **Quando devono partire i promemoria?**, scegli fino a tre tempistiche: **7 giorni prima**, **3 giorni prima**, **1 giorno prima** oppure **Il giorno stesso**.
4. Imposta l'**Ora del giorno** e, facoltativamente, un **Messaggio**.
5. Sotto **Invia tramite**, scegli **Notifica push**, **Email** e, se la tua chiesa ha un [fornitore di SMS](../settings/church-settings.md#texting) collegato, **SMS**.
6. Clicca su **Salva promemoria**.

Se l'attività non ha una data di scadenza, B1 ti avvisa che non verrà inviato alcun promemoria finché non ne viene impostata una nel campo **Scadenza**. I promemoria via SMS raggiungono solo le persone che hanno attivato i **Messaggi di testo** nelle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md), e ogni SMS può avere un costo per la tua chiesa.

## Ciclo di vita di un'attività

1. Una nuova attività parte con lo stato **Aperta**.
2. Chi la riceve riceve una notifica e può visualizzare l'attività dalla propria dashboard, da **Servizio > Il mio lavoro** o dall'app mobile.
3. Quando il lavoro è completato, chi la riceve (oppure un amministratore) clicca su **Chiudi attività**.
4. Le attività chiuse vengono rimosse dalla vista predefinita, ma possono essere ritrovate scegliendo **Chiuse** sopra l'elenco delle attività.

:::info
B1 Admin non crea più attività ricorrenti secondo una pianificazione. Per un follow-up ripetuto con le persone, usa un [flusso di lavoro](./workflows.md) con un [trigger di pianificazione](./workflows.md#schedule-triggers).
:::

:::tip
Quando devi far passare molte persone attraverso gli stessi stadi -- come il follow-up dei nuovi visitatori o un processo di adesione come membri -- usa i [Flussi di lavoro](./workflows.md). I flussi di lavoro trasformano le attività in schede su una bacheca drag-and-drop, con passaggi, date di scadenza e instradamento.
:::

:::info
Alcune attività vengono create automaticamente da altre parti di B1 e si aprono su una scheda di revisione speciale invece che sulla normale vista di note/riassegnazione -- le [richieste di adesione ai gruppi](../groups/group-join-requests.md#approving-from-the-tasks-page), le [richieste di modifica del profilo](../profile/approving-profile-changes.md) e le [richieste di eliminazione dell'account](../profile/account-deletion.md) funzionano tutte così.
:::

## Passi successivi

- Fai avanzare le persone attraverso un processo a più passaggi con i [Flussi di lavoro](./workflows.md)
- Usa i [Flussi di lavoro](./workflows.md) per far avanzare automaticamente le persone attraverso processi ripetibili
- Usa le attività insieme ai [Piani di servizio](./plans.md) per tenere traccia delle azioni di preparazione del culto
