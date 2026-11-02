---
title: "Modelli di email"
---

# Modelli di email

<div class="article-intro">

I modelli di email ti permettono di salvare contenuti di email riutilizzabili -- un messaggio di benvenuto, un promemoria per un evento, un ringraziamento per un'offerta -- così tu (o un [flusso di lavoro](../serving/workflows.md)) puoi inviarli con un clic invece di scriverli da zero ogni volta. Lo stesso elenco contiene anche i modelli di messaggi di testo per le finestre SMS di gruppo e per le singole persone.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso all'area Impostazioni di B1 Admin.

</div>

## Accedere ai modelli di email

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Clicca su **Modelli di email**.
3. Vedrai un elenco dei modelli esistenti con il loro oggetto, la categoria e la data dell'ultima modifica.

## Creare un modello

1. Clicca su **Nuovo modello**.
2. Inserisci un **Nome del modello** per riconoscerlo nell'elenco, e scegli una **Categoria** (Generale, Eventi, Gruppi, Offerte, Benvenuto oppure Testo) per aiutare a organizzare i modelli. Scegli **Testo** per creare invece un modello di messaggio di testo (vedi [Modelli di testo](#text-templates) più sotto).
3. Inserisci la riga **Oggetto**.
4. Scrivi il **Corpo** usando l'editor di testo formattato.
5. Clicca su **Salva**.

## Campi di unione {#merge-fields}

Clicca su un chip di campo di unione sopra l'Oggetto o il Corpo per inserirlo nel punto del cursore -- clicca prima nel punto in cui vuoi il campo, poi clicca sul chip. Il cursore resta al suo posto, così puoi continuare a scrivere subito dopo il campo inserito. Se clicchi su un chip del Corpo senza prima cliccare nel corpo, il campo viene aggiunto alla fine del corpo. Quando l'email viene inviata, ogni campo di unione viene sostituito con le informazioni reali del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Modelli di testo {#text-templates}

Un modello con la categoria **Testo** è un messaggio di solo testo per gli SMS invece che per l'email:

- Non ha un oggetto. L'editor di testo formattato viene sostituito da una semplice casella **Messaggio di testo** che contiene fino a 1.600 caratteri.
- I chip dei campi di unione sopra la casella inseriscono `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` oppure `{{churchName}}` nel punto del cursore.
- I modelli di testo compaiono nel selettore **Carica modello (facoltativo)** della finestra SMS per un [gruppo](../groups/group-members.md#texting-group-members) o per una singola persona. Sceglierne uno compila il messaggio, e puoi comunque modificarlo prima di inviarlo.
- Sono esclusi dai selettori dei modelli di email, compresa l'azione **Invia email** dei flussi di lavoro.

Per inviare SMS serve un [fornitore di SMS](./church-settings.md#texting) collegato.

## Visualizzare in anteprima un modello

Clicca su **Anteprima** per vedere come appariranno l'oggetto e il corpo con dati di esempio inseriti nei campi di unione, prima di salvare o inviare.

## Usare un modello

I modelli salvati sono disponibili da selezionare quando componi un'email a delle persone o a un gruppo, e come azione nei [Flussi di lavoro](../serving/workflows.md). Prima che la tua chiesa possa inviarli, il team di ChurchApps deve approvarla una volta per l'email di gruppo. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modificare ed eliminare

Clicca sull'icona **Modifica** accanto a un modello per aggiornarlo, oppure sull'icona **Elimina** per rimuoverlo in modo definitivo.

## Passi successivi

- [Flussi di lavoro](../serving/workflows.md) -- Attiva automaticamente un'email da modello in base a delle regole
