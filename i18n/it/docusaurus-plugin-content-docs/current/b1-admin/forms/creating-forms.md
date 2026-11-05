---
title: "Creare moduli"
---

# Creare moduli

<div class="article-intro">

Crea moduli personalizzati per raccogliere informazioni dalla tua comunità. Puoi creare moduli per iscrizioni agli eventi, sondaggi, schede visitatori, domande di adesione e altro ancora. I moduli possono essere collegati alle persone nel tuo database oppure usati come pagine indipendenti con un proprio URL pubblico.

</div>

## Video di formazione

<YouTube id="sr9wxEj9ghQ" title="Creare moduli e gestire le risposte in B1" next="Lanciare il sito web della tua chiesa in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per i moduli **Persone** (collegati alle schede persona), ti servono prima [persone nel tuo database](../people/adding-people.md).
- Per i moduli che raccolgono **pagamenti**, devi avere [Stripe configurato per le donazioni online](../donations/online-giving-setup.md).

</div>

## Creare un nuovo modulo

1. Apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e clicca su **Moduli**.
2. Clicca su **Aggiungi modulo**.
3. Inserisci un **nome** per il tuo modulo.
4. Scegli il tipo di modulo dal menu a tendina **Associato a**:
   - **Persone** — Associa le risposte alle [schede persona](../people/adding-people.md) nel tuo database. I moduli Persone vengono compilati a partire dalla scheda di una persona, quindi non hanno un link da condividere.
   - **Indipendente** — Crea un modulo autonomo con un proprio URL pubblico, ideale per iscrizioni esterne. Solo i moduli Indipendenti offrono una [foto di intestazione](#adding-a-header-photo), un [codice QR](#sharing-a-form-with-a-qr-code), un [gruppo collegato](#linking-a-form-to-a-group) e **Crea una scheda persona dalle risposte**.
5. Clicca su **Salva** per creare il modulo.

Il tuo nuovo modulo comparirà nell'elenco. Cliccaci sopra per iniziare ad aggiungere domande.

## Stampare un modulo vuoto {#printing-a-blank-form}

Ti serve una copia cartacea da distribuire -- ad esempio una scheda visitatori per la postazione di accoglienza, oppure un modulo che qualcuno senza accesso a internet può compilare a mano? Clicca su **Stampa** accanto a un modulo nell'elenco principale dei Moduli per aprire un'anteprima, poi clicca su **Stampa**. I campi vuoti vengono stampati con una linea o una casella per ogni domanda, così le persone possono compilarli a mano; le domande obbligatorie sono contrassegnate con un asterisco. In cima alla pagina compare il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, poi il nome del modulo. Non ci sono altre opzioni di stampa -- si stampa l'intero modulo oppure niente.

## Condividere un modulo con un codice QR {#sharing-a-form-with-a-qr-code}

I moduli Indipendenti hanno accanto a sé un link **Codice QR** nell'elenco principale dei Moduli (i moduli archiviati no). Cliccalo per aprire un codice QR per l'URL pubblico del modulo, con il link mostrato sotto. Clicca su **Scarica PNG** per salvare il codice come immagine da stampare sui bollettini o mostrare sulle diapositive. Chiunque lo scansioni apre il modulo sul proprio telefono.

## Aggiungere domande {#adding-questions}

1. Apri il tuo modulo e vai alla scheda **Domande**.
2. Clicca su **Aggiungi domanda**.
3. Seleziona un **tipo di campo** dal menu a tendina Fornitore. I tipi disponibili includono:
   - **Casella di testo** — Per risposte brevi di testo
   - **Data** — Per la selezione di una data
   - **Email** — Per indirizzi email
   - **Numero di telefono** — Per l'inserimento di un numero di telefono
   - **Scelta multipla** — Per selezionare tra opzioni predefinite
   - **Pagamento** — Per riscuotere pagamenti
4. Inserisci un **Titolo** e una **Descrizione** facoltativa per la domanda. La descrizione compare sotto la domanda quando le persone compilano il modulo, quindi usala per dare suggerimenti come "Indica eventuali allergie di cui dovremmo essere a conoscenza."
5. Seleziona **Richiedi una risposta** se il campo è obbligatorio.
6. Clicca su **Salva**.
7. Ripeti per aggiungere altre domande.

:::warning
Il tipo di campo **Pagamento** richiede che Stripe sia configurato. Se non hai ancora attivato le donazioni online, consulta la [Configurazione delle donazioni online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento. Chi paga tramite un modulo senza aver effettuato l'accesso deve spuntare la casella **Non sono un robot** prima che la carta venga accettata.
:::

## Gestire i membri del modulo {#managing-form-members}

1. Apri il tuo modulo e vai alla scheda **Membri del modulo**.
2. Cerca una persona e aggiungila con un ruolo:
   - **Amministratore** — Può modificare il modulo e visualizzare tutte le risposte.
   - **Solo visualizzazione** — Può visualizzare le risposte ma non può modificare il modulo.

## Collegare un modulo a un gruppo {#linking-a-form-to-a-group}

Puoi collegare qualsiasi modulo Indipendente a un gruppo -- ad esempio un modulo per richieste di preghiera per un piccolo gruppo, oppure un'autorizzazione medica per un viaggio dei giovani:

1. Apri i **Dettagli** del tuo modulo.
2. In **Gruppo collegato**, seleziona il gruppo, oppure lascia l'impostazione su **Nessuno**.
3. Clicca su **Salva**.

Una volta collegato un modulo:

- I **membri del gruppo** vedono il modulo in una sezione **Moduli** nella pagina del gruppo su B1.church finché il modulo è aperto, con un pulsante **Compila** che lo apre (vedi [Dettagli del gruppo](../../b1-church/groups/group-details.md#linked-forms)).
- I **leader del gruppo** vedono anche i moduli chiusi, e possono leggere le risposte di ogni invio e stamparle (un singolo invio oppure **Stampa tutto**). I leader possono solo visualizzare le risposte -- non possono modificare il modulo a meno che non siano anche [membri del modulo](#managing-form-members).
- **In B1 Admin**, la pagina del gruppo mostra una sezione **Moduli collegati** che elenca ogni modulo collegato come **Aperto** o **Chiuso**. La sezione compare per i leader del gruppo e per le persone che possono amministrare i moduli. Vedi [Membri del gruppo](../groups/group-members.md#linked-forms).

Un modulo è chiuso quando si trova al di fuori del suo periodo di disponibilità. I moduli archiviati non vengono mostrati nella pagina del gruppo.

### Aggiungere automaticamente chi invia il modulo a un gruppo {#automatically-adding-submitters-to-a-group}

Collegare un modulo a un gruppo non aggiunge di per sé nessuno al gruppo. Per aggiungere ogni persona che invia il modulo all'elenco del gruppo collegato, attiva anche **Crea una scheda persona dalle risposte** nei dettagli del modulo e clicca su **Salva**.

Ogni volta che qualcuno invia il modulo, la persona abbinata o appena creata viene aggiunta al gruppo (i membri già presenti vengono saltati). Questo è utile per situazioni come un modulo di iscrizione a un campo estivo che deve creare automaticamente l'elenco del gruppo del campo.

### Inviare un'email di follow-up {#sending-a-follow-up-email}

Con **Crea una scheda persona dalle risposte** attivato, puoi anche inviare un'email a ogni persona che invia il modulo. Compila **Oggetto dell'email di follow-up** e **Testo dell'email di follow-up** nei dettagli del modulo. Puoi usare i segnaposto `{firstName}` e `{churchName}` in entrambi. L'email viene inviata solo quando entrambi i campi sono compilati.

:::info
Le email di follow-up vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano verso il limite giornaliero di email della chiesa. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicare un modulo

Per riutilizzare un modulo come punto di partenza per uno nuovo, clicca su **Duplica** accanto al modulo nell'elenco dei Moduli e conferma. B1 crea una copia esatta del modulo -- comprese tutte le domande -- che puoi poi rinominare e modificare in modo indipendente.

:::tip
La duplicazione è utile per eventi ricorrenti in cui le domande di iscrizione restano le stesse di anno in anno. Duplica il modulo dell'anno scorso, aggiorna nome e date, ed è pronto.
:::

## Configurare le proprietà del modulo

Puoi aggiornare nome e impostazioni del modulo in qualsiasi momento. Per i moduli Indipendenti vedrai anche un **URL pubblico** unico che puoi condividere con chiunque, insieme a un campo **Descrizione** -- testo mostrato sopra le domande nella pagina pubblica del modulo, utile per spiegare a cosa serve il modulo prima che le persone inizino a compilarlo.

### Aggiungere una foto di intestazione {#adding-a-header-photo}

I moduli Indipendenti possono mostrare una **Foto di intestazione** in cima al modulo. Nei dettagli del modulo, clicca sul riquadro della foto o su **Aggiungi foto**, poi scegli o carica un'immagine (viene ritagliata in formato 16:9). Clicca su **Salva**. La foto compare sotto il nome del modulo, sopra la descrizione, nella pagina dell'URL pubblico del modulo e ovunque il modulo sia incorporato con l'elemento **Modulo** del sito web. Usa **Cambia foto** per sostituirla o **Rimuovi** per toglierla.

Usa il campo **Messaggio di ringraziamento** per impostare ciò che le persone vedono dopo aver inviato il modulo, anche nella pagina dell'URL pubblico del modulo. Se lo lasci vuoto, vedono "Grazie per aver inviato il modulo!"

:::tip
I moduli Indipendenti sono ottimi per le iscrizioni agli eventi. Condividi l'URL pubblico via email o sui social media, oppure incorpora il modulo direttamente sul sito web della chiesa.
:::

:::info
Per incorporare un modulo nel tuo sito B1, vai all'editor del sito, aggiungi una nuova sezione e seleziona l'elemento **Modulo**. Poi scegli il modulo che vuoi mostrare. Vedi [Gestire le pagine](../website/managing-pages.md) per i dettagli su come modificare il tuo sito web.
:::
