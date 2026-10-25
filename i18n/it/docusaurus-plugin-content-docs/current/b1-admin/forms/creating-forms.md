---
title: "Creare moduli"
---

# Creare moduli

<div class="article-intro">

Crea moduli personalizzati per raccogliere informazioni dalla tua comunità. Puoi creare moduli per iscrizioni a eventi, sondaggi, schede visitatori, domande di adesione e altro ancora. I moduli possono essere collegati alle persone nel tuo database oppure usati come pagine autonome con un proprio URL pubblico.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per i moduli **Persone** (collegati alle schede persona), devi prima avere [persone nel tuo database](../people/adding-people.md).
- Per i moduli che raccolgono **pagamenti**, devi avere [Stripe configurato per le offerte online](../donations/online-giving-setup.md).

</div>

## Creare un nuovo modulo

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Moduli**.
2. Fai clic su **Aggiungi modulo**.
3. Inserisci un **nome** per il tuo modulo.
4. Scegli il tipo di modulo dal menu a tendina:
   - **Persone** — Associa le risposte alle [schede persona](../people/adding-people.md) nel tuo database.
   - **Autonomo** — Crea un modulo indipendente con un proprio URL pubblico, ideale per iscrizioni esterne.
5. Fai clic su **Salva** per creare il modulo.

Il tuo nuovo modulo comparirà nell'elenco. Fai clic su di esso per iniziare ad aggiungere domande.

## Stampare un modulo vuoto {#printing-a-blank-form}

Ti serve una copia cartacea da distribuire, ad esempio una scheda visitatori alla postazione di accoglienza, oppure un modulo che qualcuno senza accesso a internet possa compilare a mano? Fai clic su **Stampa** accanto a un modulo nell'elenco principale dei moduli per aprire un'anteprima, poi fai clic su **Stampa**. I campi vuoti vengono stampati con una linea o una casella per ogni domanda, così le persone possono compilarli a mano; le domande obbligatorie sono contrassegnate con un asterisco. In cima alla pagina compaiono il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, poi il nome del modulo. Non ci sono altre opzioni di stampa: si stampa l'intero modulo oppure nulla.

## Aggiungere domande {#adding-questions}

1. Apri il tuo modulo e vai alla scheda **Domande**.
2. Fai clic su **Aggiungi domanda**.
3. Seleziona un **tipo di campo** dal menu a tendina Provider. I tipi disponibili includono:
   - **Casella di testo** — Per risposte brevi
   - **Data** — Per la selezione di date
   - **Email** — Per indirizzi email
   - **Numero di telefono** — Per l'inserimento di numeri di telefono
   - **Scelta multipla** — Per selezionare tra opzioni predefinite
   - **Pagamento** — Per raccogliere pagamenti
4. Inserisci un **Titolo** e una **Descrizione** facoltativa per la domanda. La descrizione compare sotto la domanda quando le persone compilano il modulo, quindi usala per suggerimenti come "Indica eventuali allergie di cui dovremmo essere a conoscenza."
5. Seleziona **Richiedi una risposta** se il campo è obbligatorio.
6. Fai clic su **Salva**.
7. Ripeti per aggiungere altre domande.

:::warning
Il tipo di campo **Pagamento** richiede che Stripe sia configurato. Se non hai ancora attivato le offerte online, consulta [Configurazione delle offerte online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Gestire i membri del modulo

1. Apri il tuo modulo e vai alla scheda **Membri del modulo**.
2. Cerca una persona e aggiungila con un ruolo:
   - **Amministratore** — Può modificare il modulo e visualizzare tutte le risposte.
   - **Solo visualizzazione** — Può visualizzare le risposte ma non modificare il modulo.

## Aggiungere automaticamente i partecipanti a un gruppo {#automatically-adding-submitters-to-a-group}

Quando è attiva l'opzione **Crea una scheda persona dalle risposte**, puoi anche collegare il modulo a un gruppo così ogni partecipante viene aggiunto automaticamente all'elenco di quel gruppo:

1. Apri i **Dettagli** del tuo modulo e attiva **Crea una scheda persona dalle risposte**.
2. In **Aggiungi i partecipanti a un gruppo**, seleziona il gruppo a cui aggiungere i partecipanti, oppure lascia l'opzione su **Nessuno**.
3. Fai clic su **Salva**.

Ogni volta che qualcuno invia il modulo, la persona trovata o appena creata viene aggiunta al gruppo (i membri già presenti nel gruppo vengono saltati). È utile per cose come un modulo di iscrizione a un campo estivo che deve costruire automaticamente l'elenco del gruppo del campo.

### Inviare un'email di follow-up {#sending-a-follow-up-email}

Con l'opzione **Crea una scheda persona dalle risposte** attiva, puoi anche inviare un'email a ogni persona che invia il modulo. Compila **Oggetto dell'email di follow-up** e **Testo dell'email di follow-up** nei dettagli del modulo. Puoi usare i segnaposto `{firstName}` e `{churchName}` in entrambi i campi. L'email viene inviata solo se entrambi i campi sono compilati.

:::info
Le email di follow-up vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e vengono conteggiate nel limite giornaliero di email della chiesa. Consulta [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicare un modulo

Per riutilizzare un modulo come punto di partenza per uno nuovo, fai clic su **Duplica** accanto al modulo nell'elenco dei moduli e conferma. B1 crea una copia esatta del modulo, incluse tutte le domande, che puoi poi rinominare e modificare in modo indipendente.

:::tip
La duplicazione è utile per eventi ricorrenti in cui le domande di iscrizione restano le stesse di anno in anno. Duplica il modulo dell'anno precedente, aggiorna nome e date, e sei pronto.
:::

## Configurare le proprietà del modulo

Puoi aggiornare il nome e le impostazioni del tuo modulo in qualsiasi momento. Per i moduli Autonomi vedrai anche un **URL pubblico** univoco che puoi condividere con chiunque, insieme a un campo **Descrizione** -- un testo mostrato sopra le domande nella pagina pubblica del modulo, utile per spiegare alle persone a cosa serve il modulo prima che inizino a compilarlo.

Usa il campo **Messaggio di ringraziamento** per stabilire cosa vedono le persone dopo aver inviato il modulo, anche nella pagina dell'URL pubblico. Se lo lasci vuoto, vedranno "Grazie per aver inviato il modulo!"

:::tip
I moduli Autonomi sono ottimi per le iscrizioni agli eventi. Condividi l'URL pubblico via email, sui social media, oppure incorpora il modulo direttamente nel sito web della tua chiesa.
:::

:::info
Per incorporare un modulo nel tuo sito web B1, vai all'editor del sito, aggiungi una nuova sezione e seleziona l'elemento **Modulo**. Poi scegli il modulo da visualizzare. Consulta [Gestire le pagine](../website/managing-pages.md) per i dettagli su come modificare il sito web.
:::
