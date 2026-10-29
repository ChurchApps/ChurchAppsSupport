---
title: "Modelli email"
---

# Modelli email

<div class="article-intro">

I modelli email ti permettono di salvare contenuti email riutilizzabili -- un messaggio di benvenuto, un promemoria per un evento, un ringraziamento per le offerte -- così tu (o un [flusso di lavoro](../serving/workflows.md)) puoi inviarli con un clic invece di scriverli ogni volta da zero. Lo stesso elenco contiene anche i modelli di messaggi di testo per le finestre di invio SMS a gruppi e persone.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso all'area Impostazioni in B1 Admin.

</div>

## Accedere ai modelli email

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Clicca su **Modelli email**.
3. Vedrai un elenco dei modelli esistenti con oggetto, categoria e data dell'ultima modifica.

## Creare un modello

1. Clicca su **Nuovo modello**.
2. Inserisci un **Nome modello** per riconoscerlo nell'elenco e scegli una **Categoria** (Generale, Eventi, Gruppi, Offerte, Benvenuto o Testo) per organizzare i modelli. Scegli **Testo** per creare invece un modello di messaggio di testo (vedi [Modelli di testo](#text-templates) più sotto).
3. Inserisci la riga **Oggetto**.
4. Scrivi il **Corpo** usando l'editor di testo formattato.
5. Clicca su **Salva**.

## Campi unione

Clicca su un chip di campo unione sopra l'Oggetto o il Corpo per inserirlo nel punto del cursore -- prima clicca nel punto del testo dove vuoi il campo, poi clicca sul chip. Il cursore resta nella posizione, così puoi continuare a scrivere subito dopo il campo inserito. Se clicchi su un chip del Corpo senza prima cliccare nel corpo, il campo viene aggiunto alla fine del corpo. Al momento dell'invio dell'email, ogni campo unione viene sostituito con i dati reali del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Il nome del destinatario
- `{{email}}` -- L'indirizzo email del destinatario
- `{{churchName}}` -- Il nome della tua chiesa

## Modelli di testo

Un modello con la categoria **Testo** è un messaggio di solo testo per gli SMS, non un'email:

- Non ha un oggetto. L'editor di testo formattato viene sostituito da una casella **Messaggio di testo** semplice, che contiene fino a 1.600 caratteri.
- I chip dei campi unione sopra la casella inseriscono `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` o `{{churchName}}` nel punto del cursore.
- I modelli di testo compaiono nel selettore **Carica modello (facoltativo)** della finestra di invio SMS per un [gruppo](../groups/group-members.md#texting-group-members) o una singola persona. Sceglierne uno compila il messaggio, e puoi comunque modificarlo prima dell'invio.
- Sono esclusi dai selettori dei modelli email, incluso l'azione **Invia email** dei flussi di lavoro.

L'invio di SMS richiede un [fornitore di messaggi di testo](./church-settings.md#texting) collegato.

## Visualizzare l'anteprima di un modello

Clicca su **Anteprima** per vedere come appariranno oggetto e corpo con dati di esempio inseriti nei campi unione, prima di salvare o inviare.

## Usare un modello

I modelli salvati sono disponibili quando componi un'email per persone o gruppi, e come azione nei [Flussi di lavoro](../serving/workflows.md). Prima che la tua chiesa possa inviarli, il team ChurchApps deve approvare la chiesa per l'email di gruppo una volta sola. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modificare ed eliminare

Clicca sull'icona **Modifica** accanto a un modello per aggiornarlo, oppure sull'icona **Elimina** per rimuoverlo definitivamente.

## Passi successivi

- [Flussi di lavoro](../serving/workflows.md) -- Invia automaticamente un'email da modello in base a regole
