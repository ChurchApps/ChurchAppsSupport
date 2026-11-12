---
title: "Modelli di email"
description: "Configura modelli di email e di messaggi di testo in B1 Admin, con campi unione, opzioni per gli SMS e anteprime per le comunicazioni di massa."
---

# Modelli di email

<div class="article-intro">

I Modelli di email ti permettono di salvare contenuti di email riutilizzabili — un messaggio di benvenuto, un promemoria per un evento, un ringraziamento per le offerte — così puoi inviarli (oppure un [flusso di lavoro](../serving/workflows.md) può inviarli) con un solo clic, invece di scriverli da zero ogni volta. Lo stesso elenco contiene anche i modelli di messaggi di testo per le finestre SMS di gruppo e persona e per l'azione del flusso di lavoro **Invia SMS**.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione **Modifica impostazioni chiesa** (la voce di menu **Modelli di email** compare solo con essa). Anche chi ha **Modifica membri di gruppo** può aprire direttamente la pagina all'indirizzo **/settings/email-templates**.

</div>

## Accedere ai modelli di email {#accessing-email-templates}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Fai clic su **Modelli di email**.
3. Vedrai un elenco dei modelli esistenti con il loro **Nome**, **Oggetto**, **Categoria** e la data di **Ultima modifica**.

## Creare un modello {#creating-a-template}

1. Fai clic su **Nuovo modello**.
2. Inserisci un **Nome modello** per identificarlo nell'elenco, e scegli una **Categoria** (Generale, Eventi, Gruppi, Donazioni, Benvenuto oppure Testo) per organizzare i modelli. Scegli **Testo** per creare invece un modello di messaggio di testo (vedi [Modelli di testo](#text-templates) più sotto).
3. Inserisci la riga **Oggetto**.
4. Scrivi il **Corpo** usando l'editor di testo formattato.
5. Fai clic su **Salva**.

## Campi unione {#merge-fields}

Fai clic su un'etichetta di campo unione sopra l'Oggetto o il Corpo per inserirla nel punto del cursore — fai prima clic nel testo dove vuoi il campo, poi fai clic sull'etichetta. Il cursore resta al suo posto, così puoi continuare a scrivere subito dopo il campo inserito. Se fai clic su un'etichetta del Corpo senza prima cliccare nel corpo, il campo viene aggiunto alla fine del corpo. Quando l'email viene inviata, ogni campo unione viene sostituito con i dati effettivi del destinatario:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` — Il nome del destinatario
- `{{email}}` — L'indirizzo email del destinatario
- `{{churchName}}` — Il nome della tua chiesa

### Campi unione per le donazioni {#gift-merge-fields}

Questi campi vengono compilati solo quando l'email è inviata da un [flusso di lavoro](../serving/workflows.md#sending-email) avviato da un attivatore **Donazione · Creata**. In qualsiasi altra email restano vuoti.

- `{{amount}}` — L'importo della donazione, ad esempio $50.00
- `{{giftDate}}` — La data della donazione
- `{{fund}}` — Il fondo o i fondi a cui è andata la donazione
- `{{receipt}}` — Un riepilogo della donazione: la data e il metodo, una riga per ogni fondo con il relativo importo e il totale. Usalo per inviare al donatore una ricevuta nella stessa email del tuo ringraziamento. È disponibile solo per il corpo, non per l'oggetto.

## Modelli di testo {#text-templates}

Un modello con la categoria **Testo** è un messaggio di solo testo per gli SMS, non per le email:

- Non ha un oggetto. L'editor di testo formattato viene sostituito da una casella **Messaggio di testo** semplice che contiene fino a 1.600 caratteri.
- Le etichette dei campi unione sopra la casella inseriscono nel punto del cursore `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` oppure i [campi unione per le donazioni](#gift-merge-fields). In un SMS, `{{receipt}}` diventa una sola riga, come *$50.00 al Fondo generale l'8 nov 2026*.
- I modelli di testo compaiono nel selettore **Carica modello (facoltativo)** della finestra SMS per un [gruppo](../groups/group-members.md#texting-group-members) o per una singola persona. Sceglierne uno compila il messaggio, che puoi comunque modificare prima dell'invio.
- Compaiono anche nell'elenco **Inizia da un modello** dell'azione del flusso di lavoro [Invia SMS](../serving/workflows.md#sending-a-text).
- Sono esclusi dai selettori dei modelli di email, compresa l'azione del flusso di lavoro **Invia email**.

Per inviare SMS è necessario un [fornitore di SMS](./church-settings.md#texting) collegato.

## Visualizzare in anteprima un modello {#previewing-a-template}

Fai clic su **Anteprima** per vedere come appariranno oggetto e corpo con dati di esempio inseriti nei campi unione, prima di salvare o inviare.

## Usare un modello {#using-a-template}

I modelli salvati sono disponibili nella selezione quando componi un'email per delle persone o per un gruppo, e come azione nei [Flussi di lavoro](../serving/workflows.md). Prima che la tua chiesa possa inviarli, il team di ChurchApps deve approvarla una volta per l'email di gruppo. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).

## Modificare ed eliminare {#editing-and-deleting}

Fai clic su **Modifica** nella riga di un modello per aggiornarlo, oppure su **Elimina** per rimuoverlo in modo permanente. B1 chiede conferma prima di eliminare.

## Passaggi successivi {#next-steps}

- [Flussi di lavoro](../serving/workflows.md) — Avvia automaticamente l'invio di un modello di email in base a regole
