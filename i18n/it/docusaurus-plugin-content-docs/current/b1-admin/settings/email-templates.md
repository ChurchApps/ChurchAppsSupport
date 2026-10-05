---
title: "Modelli di email"
---

# Modelli di email

<div class="article-intro">

I modelli di email ti permettono di salvare il contenuto dell'email riutilizzabile, un messaggio di benvenuto, un promemoria di evento, un ringraziamento per la donazione, in modo che tu (o un [flusso di lavoro](../serving/workflows.md)) possa inviarlo in un solo clic invece di scriverlo da zero ogni volta.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- È necessario l'accesso all'area Impostazioni in B1 Admin.

</div>

## Accesso ai modelli di email

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) e espandi **Settings**.
2. Fai clic su **Email Templates**.
3. Vedrai un elenco di modelli esistenti con il loro oggetto, categoria e data dell'ultima modifica.

## Creazione di un modello

1. Fai clic su **New Template**.
2. Immetti un **Template Name** per identificarlo nell'elenco, e scegli una **Category** (General, Events, Groups, Giving, o Welcome) per aiutare a organizzare i tuoi modelli.
3. Immetti la riga **Subject**.
4. Scrivi il **Body** utilizzando l'editor di testo ricco.
5. Fai clic su **Save**.

## Campi di unione

Fai clic su un chip di campo di unione sopra l'Oggetto o il Corpo per inserirlo nel tuo cursore, fai clic nel testo dove vuoi il campo per primo, quindi fai clic sul chip. Il tuo cursore rimane in posizione, quindi puoi continuare a digitare subito dopo il campo inserito. Se fai clic su un chip del Corpo senza prima fare clic nel corpo, il campo viene aggiunto alla fine del corpo. Quando l'email viene inviata, ogni campo di unione viene sostituito con le informazioni effettive del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Anteprima di un modello

Fai clic su **Preview** per vedere come apparirà l'oggetto e il corpo con i dati di esempio compilati per i campi di unione, prima di salvare o inviare.

## Utilizzo di un modello

I modelli salvati sono disponibili per la selezione quando si compone un'email a persone o a un gruppo, e come azione nei [Flussi di lavoro](../serving/workflows.md). Prima che la tua chiesa possa inviarli, il team di ChurchApps deve approvarlo per un'email di gruppo una volta. Vedi [Attivazione della posta elettronica di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modifica e eliminazione

Fai clic sull'icona **Edit** accanto a un modello per aggiornarlo, o sull'icona **Delete** per rimuoverlo permanentemente.

## Passaggi successivi

- [Workflows](../serving/workflows.md) -- Attiva automaticamente un'email di modello in base alle regole
