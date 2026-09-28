---
title: "Modelli di email"
---

# Modelli di email

<div class="article-intro">

I modelli di email ti consentono di salvare il contenuto di email riutilizzabile -- un messaggio di benvenuto, un promemoria di evento, un ringraziamento per il dono -- così tu (o un [flusso di lavoro](../serving/workflows.md)) puoi inviarlo con un clic invece di scriverlo da zero ogni volta.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'accesso all'area Impostazioni in B1 Admin.

</div>

## Accesso ai modelli di email

1. In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
2. Fai clic su **Modelli di email**.
3. Vedrai un elenco dei modelli esistenti con il loro oggetto, categoria e data di ultima modifica.

## Creazione di un modello

1. Fai clic su **Nuovo modello**.
2. Immetti un **Nome modello** per identificarlo nell'elenco e scegli una **Categoria** (Generale, Eventi, Gruppi, Donazione o Benvenuto) per aiutare a organizzare i tuoi modelli.
3. Immetti la riga **Oggetto**.
4. Scrivi il **Corpo** utilizzando l'editor di testo avanzato.
5. Fai clic su **Salva**.

## Campi di unione

Fai clic su un chip di campo di unione sopra l'oggetto o il corpo per inserirlo nel tuo cursore. Quando l'email viene inviata, ogni campo di unione viene sostituito con le informazioni effettive del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Anteprima di un modello

Fai clic su **Anteprima** per vedere come appariranno l'oggetto e il corpo con i dati di esempio compilati per i campi di unione, prima di salvare o inviare.

## Utilizzo di un modello

I modelli salvati sono disponibili da selezionare quando componi un'email a persone o un gruppo e come azione nei [Flussi di lavoro](../serving/workflows.md). Prima che la tua chiesa possa inviarli, il team di ChurchApps deve approvarlo una volta per l'email di gruppo. Vedi [Attivazione dell'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modifica e cancellazione

Fai clic sull'icona **Modifica** accanto a un modello per aggiornarlo, o l'icona **Elimina** per rimuoverlo permanentemente.

## Passaggi successivi

- [Flussi di lavoro](../serving/workflows.md) -- Attiva un'email modello automaticamente in base alle regole
