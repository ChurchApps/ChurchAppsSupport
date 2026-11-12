---
title: "Attività"
description: "Crea, assegna e chiudi attività in B1 Admin, trovale in Servizio > Il mio lavoro e imposta promemoria con scadenza, così i punti di follow-up non vengono dimenticati."
---

# Attività

<div class="article-intro">

Le attività ti permettono di assegnare azioni da svolgere a persone o gruppi della tua chiesa. Che si tratti di un'attività una tantum o di una responsabilità ricorrente, le attività ti aiutano a tenere traccia di ciò che va fatto e di chi se ne occupa, così nulla viene trascurato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le persone o i [gruppi](../groups/creating-groups.md) a cui vuoi assegnare le attività esistano in B1 Admin
- Nel [menu di salto](../introduction.md#getting-around-with-the-jump-menu), scegli **Servizio > Il mio lavoro** per vedere le attività

</div>

## Visualizzare le attività {#viewing-tasks}

Nel menu di salto, scegli **Servizio > Il mio lavoro** (oppure cerca "Il mio lavoro"). L'elenco **Attività** mostra il titolo di ogni attività, con chi è associata, a chi è assegnata, quando è stata aperta e il suo stato. Le schede del tuo [flusso di lavoro](./workflows.md) compaiono accanto all'elenco, sotto **Le mie schede**. Anche gli assegnatari possono vedere e lavorare sulle proprie schede e attività aperte dalla schermata **Io** nell'app B1.

Usa le schede sopra l'elenco per passare tra le attività **Assegnate a me**, **Assegnate ai miei gruppi** e **Richieste da me**. Ogni scheda mostra quante attività contiene. Attività e **Le mie schede** sono elencate dalla più recente alla più vecchia, così ciò che è appena arrivato compare in cima.

:::tip
Per impostazione predefinita vengono mostrate solo le attività aperte. Scegli **Chiuse** sopra l'elenco per vedere invece le attività completate.
:::

## Creare un'attività {#creating-a-task}

1. Nella pagina **Il mio lavoro**, fai clic su **Aggiungi attività**. Si apre il modulo **Nuova attività**.
2. Se vuoi, fai clic sulla casella **Associa a** e scegli la persona o il gruppo a cui si riferisce l'attività. Lasciala vuota per un semplice promemoria che non riguarda nessuno in particolare, ad esempio un promemoria per te stesso.
3. Fai clic sulla casella **Assegna a**. Nella finestra **Seleziona una persona o un gruppo** cerca nella scheda **Persona**, oppure passa alla scheda **Gruppo** e cerca un gruppo, quindi seleziona il risultato.
4. Inserisci un **Titolo** per l'attività.
5. Se vuoi, scegli una **Data di scadenza**.
6. Aggiungi **Note** con dettagli o istruzioni per l'assegnatario.
7. Fai clic su **Salva**.

L'attività comparirà ora nell'elenco delle attività e sarà visibile all'assegnatario nella sua dashboard e nell'app mobile.

## Gestire un'attività {#managing-a-task}

Fai clic su un'attività qualsiasi per aprire la sua pagina di dettaglio. Da qui puoi:

- **Chiudere o riaprire l'attività** -- Fai clic su **Chiudi attività** quando il lavoro è completato, oppure su **Riapri attività** per riaprirla.
- **Riassegnare l'attività** -- Fai clic su **Assegna** per scegliere un'altra persona o un altro gruppo.
- **Cambiare a chi si riferisce** -- Fai clic su **Associa** per scegliere un'altra persona o un altro gruppo, oppure scegli **Nessuna persona o gruppo** per cancellare l'associazione.
- **Cambiare la data di scadenza** -- Scegli una data nel campo **Scadenza**; viene salvata quando clicchi altrove. (Le attività create per una [conferma di un'assegnazione di servizio](./workflows.md#serving-assignment-confirmations) mostrano la loro data di scadenza ma non possono essere modificate da qui.)
- **Aggiungere note** -- Pubblica aggiornamenti o dettagli per l'assegnatario nelle note dell'attività.
- **Impostare promemoria** -- Vedi [Promemoria delle attività](#task-reminders) più sotto.

## Promemoria delle attività {#task-reminders}

Un'attività con data di scadenza può ricordare al suo assegnatario la scadenza.

1. Nella pagina dell'attività, fai clic su **Modifica** accanto a **Promemoria**.
2. Attiva **Invia promemoria per questa attività**.
3. Sotto **Quando devono essere inviati i promemoria?**, scegli fino a tre tempistiche: **7 giorni prima**, **3 giorni prima**, **1 giorno prima** oppure **Il giorno stesso**.
4. Imposta l'**Orario del giorno** e, se vuoi, un **Messaggio**.
5. Sotto **Invia tramite**, scegli **Notifica push**, **Email** e, se la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting), **SMS**.
6. Fai clic su **Salva promemoria**.

Se l'attività non ha una data di scadenza, B1 ti avvisa che non verrà inviato alcun promemoria finché non ne imposti una nel campo **Scadenza**. I promemoria via SMS raggiungono solo le persone che hanno attivato **Messaggi di testo** nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md), e ogni SMS può comportare un costo per la tua chiesa.

## Ciclo di vita di un'attività {#task-lifecycle}

1. Una nuova attività inizia con lo stato **Aperta**.
2. L'assegnatario riceve una notifica e può vedere l'attività dalla sua dashboard, da **Servizio > Il mio lavoro** o dall'app mobile.
3. Quando il lavoro è completato, l'assegnatario (o un amministratore) fa clic su **Chiudi attività**.
4. Le attività chiuse vengono rimosse dalla vista predefinita, ma possono ancora essere trovate scegliendo **Chiuse** sopra l'elenco delle attività.

:::info
B1 Admin non crea più attività ricorrenti secondo una pianificazione. Per un follow-up ripetuto con le persone, usa un [flusso di lavoro](./workflows.md) con un [attivatore di pianificazione](./workflows.md#schedule-triggers).
:::

:::tip
Quando devi far passare molte persone attraverso le stesse fasi -- ad esempio il follow-up dei nuovi visitatori o un processo di iscrizione -- usa i [Flussi di lavoro](./workflows.md). I flussi di lavoro trasformano le attività in schede su una bacheca con trascinamento, con passaggi, date di scadenza e instradamento.
:::

:::info
Alcune attività vengono create automaticamente da altre parti di B1 e si aprono con una scheda di revisione speciale invece della consueta vista di note/riassegnazione: [richieste di adesione ai gruppi](../groups/group-join-requests.md#approving-from-the-tasks-page), [richieste di modifica del profilo](../profile/approving-profile-changes.md) e [richieste di eliminazione dell'account](../profile/account-deletion.md) funzionano in questo modo.
:::

## Passaggi successivi {#next-steps}

- Porta le persone attraverso un processo a più passaggi con i [Flussi di lavoro](./workflows.md)
- Usa i [Flussi di lavoro](./workflows.md) per far avanzare automaticamente le persone attraverso processi ripetibili
- Usa le attività insieme ai [Piani di servizio](./plans.md) per tenere traccia delle azioni di preparazione del servizio
