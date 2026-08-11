---
title: "Modelli di Email"
---

# Modelli di Email

<div class="article-intro">

I Modelli di Email ti permettono di salvare contenuti di email riutilizzabili -- un messaggio di benvenuto, un promemoria di evento, un ringraziamento per una donazione -- così che tu (o un [flusso di lavoro](../serving/workflows.md)) possa inviarlo con un clic invece di scriverlo da zero ogni volta.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di accesso all'area Impostazioni in B1 Admin.

</div>

## Accesso ai Modelli di Email

1. In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
2. Fai clic su **Modelli di Email**.
3. Vedrai un elenco dei modelli esistenti con il loro soggetto, categoria e data dell'ultima modifica.

## Creazione di un Modello

1. Fai clic su **Nuovo Modello**.
2. Inserisci un **Nome Modello** per identificarlo nell'elenco, e scegli una **Categoria** (Generale, Eventi, Gruppi, Donazioni, o Benvenuto) per aiutare a organizzare i tuoi modelli.
3. Inserisci la riga di **Oggetto**.
4. Scrivi il **Corpo** utilizzando l'editor di testo ricco.
5. Fai clic su **Salva**.

## Campi di Fusione

Fai clic su un chip di campo di fusione sopra l'Oggetto o il Corpo per inserirlo nel tuo cursore. Quando l'email viene inviata, ogni campo di fusione viene sostituito con le informazioni effettive del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Anteprima di un Modello

Fai clic su **Anteprima** per vedere come appariranno l'oggetto e il corpo con dati di esempio compilati per i campi di fusione, prima di salvare o inviare.

## Utilizzo di un Modello

I modelli salvati sono disponibili per essere selezionati quando componi un'email a persone o a un gruppo, e come azione nei [Flussi di Lavoro](../serving/workflows.md).

## Modifica ed Eliminazione

Fai clic sull'icona **Modifica** accanto a un modello per aggiornarlo, o l'icona **Elimina** per rimuoverlo permanentemente.

## Passaggi Successivi

- [Flussi di Lavoro](../serving/workflows.md) -- Attiva automaticamente un'email di modello in base alle regole
