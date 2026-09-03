---
title: "Modelli di Email"
---

# Modelli di Email

<div class="article-intro">

I Modelli di Email ti permettono di salvare il contenuto dell'email riutilizzabile — un messaggio di benvenuto, un promemoria di evento, un ringraziamento per una donazione — in modo che tu (o un [flusso di lavoro](../serving/workflows.md)) possa inviarlo con un clic anziché scriverlo da zero ogni volta.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno dell'accesso all'area Impostazioni in B1 Admin.

</div>

## Accesso ai Modelli di Email

1. In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Settings**.
2. Fai clic su **Email Templates**.
3. Vedrai un elenco di modelli esistenti con il loro oggetto, categoria e data dell'ultima modifica.

## Creazione di un Modello

1. Fai clic su **New Template**.
2. Immetti un **Template Name** per identificarlo nell'elenco e scegli una **Category** (General, Events, Groups, Giving o Welcome) per aiutare a organizzare i tuoi modelli.
3. Immetti la riga **Subject**.
4. Scrivi il **Body** utilizzando l'editor di testo ricco.
5. Fai clic su **Save**.

## Campi di Unione

Fai clic su un chip di campo di unione sopra l'Oggetto o il Corpo per inserirlo nel tuo cursore. Quando l'email viene inviata, ogni campo di unione viene sostituito con le informazioni effettive del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Anteprima di un Modello

Fai clic su **Preview** per vedere come l'oggetto e il corpo appariranno con dati di esempio riempiti nei campi di unione, prima di salvare o inviare.

## Utilizzo di un Modello

I modelli salvati sono disponibili da selezionare quando si redige un'email a persone o un gruppo, e come azione nei [Flussi di Lavoro](../serving/workflows.md).

## Modifica ed Eliminazione

Fai clic sull'icona **Edit** accanto a un modello per aggiornarlo, o sull'icona **Delete** per rimuoverlo permanentemente.

## Prossimi Passaggi

- [Flussi di Lavoro](../serving/workflows.md) -- Attiva un'email del modello automaticamente in base alle regole
