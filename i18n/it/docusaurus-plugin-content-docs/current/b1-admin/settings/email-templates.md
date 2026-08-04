---
title: "Modelli di Email"
---

# Modelli di Email

<div class="article-intro">

I Modelli di Email ti permettono di salvare contenuti email riutilizzabili -- un messaggio di benvenuto, un promemoria di evento, un ringraziamento per una donazione -- così tu (o un [workflow](../serving/workflows.md)) potete inviarlo con un clic invece di scriverlo da zero ogni volta.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno dell'accesso all'area Settings in B1 Admin.

</div>

## Accedere ai Modelli di Email

1. Vai su **Settings** nella barra laterale sinistra.
2. Clicca su **Email Templates**.
3. Vedrai un elenco dei modelli esistenti con oggetto, categoria e data dell'ultima modifica.

## Creare un Modello

1. Clicca su **New Template**.
2. Inserisci un **Template Name** per identificarlo nell'elenco, e scegli una **Category** (General, Events, Groups, Giving o Welcome) per aiutarti a organizzare i tuoi modelli.
3. Inserisci la riga **Subject**.
4. Scrivi il **Body** utilizzando l'editor di testo formattato.
5. Clicca su **Save**.

## Campi di Unione

Clicca su un chip di campo di unione sopra Subject o Body per inserirlo alla posizione del cursore. Quando l'email viene inviata, ogni campo di unione viene sostituito con le informazioni effettive del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Anteprima di un Modello

Clicca su **Preview** per vedere come appariranno l'oggetto e il corpo con dati di esempio inseriti per i campi di unione, prima di salvare o inviare.

## Utilizzare un Modello

I modelli salvati sono disponibili da selezionare durante la composizione di un'email a persone o a un gruppo, e come azione nei [Workflow](../serving/workflows.md).

## Modificare ed Eliminare

Clicca sull'icona **Edit** accanto a un modello per aggiornarlo, oppure sull'icona **Delete** per rimuoverlo definitivamente.

## Prossimi Passi

- [Workflow](../serving/workflows.md) -- Attiva automaticamente l'invio di un'email modello in base a regole
