---
title: "Creare moduli"
---

# Creare moduli

<div class="article-intro">

Crea moduli personalizzati per raccogliere informazioni dalla tua comunità. Puoi creare moduli per iscrizioni a eventi, sondaggi, schede visitatori, domande di adesione e altro ancora. I moduli possono essere collegati alle persone presenti nel tuo database oppure usati come pagine autonome con un proprio URL pubblico.

</div>

## Video tutorial

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per i moduli **People** (collegati alle schede delle persone), ti servono prima [persone nel tuo database](../people/adding-people.md).
- Per i moduli che raccolgono **pagamenti**, devi aver configurato [Stripe per le offerte online](../donations/online-giving-setup.md).

</div>

## Creare un nuovo modulo

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **People** e fai clic su **Forms**.
2. Fai clic su **Add Form**.
3. Inserisci un **nome** per il modulo.
4. Scegli il tipo di modulo dal menu a tendina **Associate With**:
   - **People** — Associa le risposte ai [schede persona](../people/adding-people.md) nel tuo database. I moduli People vengono compilati a partire dalla scheda di una persona, quindi non hanno un link condivisibile.
   - **Stand Alone** — Crea un modulo indipendente con un proprio URL pubblico, ideale per iscrizioni esterne. Solo i moduli Stand Alone offrono una [foto di intestazione](#adding-a-header-photo), un [codice QR](#sharing-a-form-with-a-qr-code), un [gruppo collegato](#linking-a-form-to-a-group) e **Create a person record from submissions**.
5. Fai clic su **Save** per creare il modulo.

Il nuovo modulo comparirà nell'elenco. Fai clic su di esso per iniziare ad aggiungere domande.

## Stampare un modulo vuoto {#printing-a-blank-form}

Ti serve una copia cartacea da distribuire -- per una scheda visitatori alla postazione di accoglienza, o per un modulo che una persona senza accesso a internet possa compilare a mano? Fai clic su **Print** accanto a un modulo nell'elenco principale dei moduli per aprire un'anteprima, quindi fai clic su **Print**. I campi vuoti vengono stampati con una linea o una casella per ogni domanda, così le persone possono compilarli a mano; le domande obbligatorie sono contrassegnate con un asterisco. In cima alla pagina compaiono il logo della tua chiesa (il **Light Background Logo** da [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, poi il nome del modulo. Non ci sono altre opzioni di stampa -- si stampa l'intero modulo oppure niente.

## Condividere un modulo tramite codice QR {#sharing-a-form-with-a-qr-code}

I moduli Stand Alone hanno un link **QR Code** accanto a loro nell'elenco principale dei moduli (i moduli archiviati no). Fai clic su di esso per aprire un codice QR per l'URL pubblico del modulo, con il link mostrato sotto. Fai clic su **Download PNG** per salvare il codice come immagine da stampare sui bollettini o mostrare sulle slide. Chiunque lo scansioni apre il modulo sul proprio telefono.

## Aggiungere domande {#adding-questions}

1. Apri il tuo modulo e vai alla scheda **Questions**.
2. Fai clic su **Add Question**.
3. Seleziona un **field type** dal menu a tendina Provider. I tipi disponibili includono:
   - **Textbox** — Per risposte brevi di testo
   - **Date** — Per la selezione di date
   - **Email** — Per indirizzi email
   - **Phone Number** — Per l'inserimento di numeri di telefono
   - **Multiple Choice** — Per scegliere tra opzioni predefinite
   - **Payment** — Per raccogliere pagamenti
4. Inserisci un **Title** e una **Description** facoltativa per la domanda. La descrizione compare sotto la domanda quando le persone compilano il modulo, quindi usala per dare suggerimenti come "Indica eventuali allergie di cui dovremmo essere a conoscenza."
5. Seleziona **Require an answer** se il campo è obbligatorio.
6. Fai clic su **Save**.
7. Ripeti per aggiungere altre domande.

:::warning
Il tipo di campo **Payment** richiede che Stripe sia configurato. Se non hai ancora configurato le offerte online, consulta [Configurazione delle offerte online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Gestire i membri del modulo {#managing-form-members}

1. Apri il tuo modulo e vai alla scheda **Form Members**.
2. Cerca una persona e aggiungila con un ruolo:
   - **Admin** — Può modificare il modulo e visualizzare tutte le risposte.
   - **View Only** — Può visualizzare le risposte ma non può modificare il modulo.

## Collegare un modulo a un gruppo {#linking-a-form-to-a-group}

Puoi collegare qualsiasi modulo Stand Alone a un gruppo -- ad esempio un modulo per richieste di preghiera per un piccolo gruppo, oppure un modulo di autorizzazione medica per un viaggio dei giovani:

1. Apri i **Details** del tuo modulo.
2. In **Linked group**, seleziona il gruppo, oppure lascia l'impostazione su **None**.
3. Fai clic su **Save**.

Una volta collegato un modulo:

- I **membri del gruppo** vedono il modulo in una sezione **Forms** nella pagina del gruppo su B1.church, finché il modulo è aperto, con un pulsante **Fill out** che lo apre (vedi [Dettagli del gruppo](../../b1-church/groups/group-details.md#linked-forms)).
- I **leader del gruppo** vedono anche i moduli chiusi e possono leggere le risposte di ogni invio, stamparle (una singola risposta oppure **Print all**). I leader possono solo visualizzare le risposte -- non possono modificare il modulo, a meno che non siano anche [membri del modulo](#managing-form-members).
- **In B1 Admin**, la pagina del gruppo mostra una sezione **Linked forms** che elenca ogni modulo collegato come **Open** o **Closed**. Compare per i leader del gruppo e per le persone che possono amministrare i moduli. Vedi [Membri del gruppo](../groups/group-members.md#linked-forms).

Un modulo è chiuso quando si trova al di fuori del suo periodo di disponibilità. I moduli archiviati non vengono mostrati nella pagina del gruppo.

### Aggiungere automaticamente i partecipanti a un gruppo {#automatically-adding-submitters-to-a-group}

Collegare un modulo a un gruppo non aggiunge automaticamente nessuno al gruppo. Per aggiungere ogni partecipante all'elenco del gruppo collegato, attiva anche **Create a person record from submissions** nei dettagli del modulo e fai clic su **Save**.

Ogni volta che qualcuno invia il modulo, la persona trovata o appena creata viene aggiunta al gruppo (i membri già presenti vengono saltati). Questo è utile per cose come un modulo di iscrizione a un campo estivo che deve creare automaticamente l'elenco partecipanti del gruppo.

### Inviare un'email di follow-up

Con **Create a person record from submissions** attivo, puoi anche inviare un'email a ogni persona che invia il modulo. Compila **Follow-up Email Subject** e **Follow-up Email Body** nei dettagli del modulo. Puoi usare i segnaposto `{firstName}` e `{churchName}` in entrambi i campi. L'email viene inviata solo quando entrambi i campi sono compilati.

:::info
Le email di follow-up vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano nel limite giornaliero di email della chiesa. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicare un modulo

Per riutilizzare un modulo come punto di partenza per uno nuovo, fai clic su **Duplicate** accanto al modulo nell'elenco Forms e conferma. B1 crea una copia esatta del modulo -- comprese tutte le domande -- che puoi poi rinominare e modificare in modo indipendente.

:::tip
La duplicazione è utile per eventi ricorrenti in cui le domande di iscrizione restano le stesse di anno in anno. Duplica il modulo dell'anno scorso, aggiorna il nome e le date, ed è pronto.
:::

## Configurare le proprietà del modulo

Puoi aggiornare il nome e le impostazioni del modulo in qualsiasi momento. Per i moduli Stand Alone vedrai anche un **URL pubblico** unico che puoi condividere con chiunque, insieme a un campo **Description** -- testo mostrato sopra le domande nella pagina pubblica del modulo, utile per spiegare alle persone a cosa serve il modulo prima che inizino a compilarlo.

### Aggiungere una foto di intestazione {#adding-a-header-photo}

I moduli Stand Alone possono mostrare una **Header Photo** nella parte superiore del modulo. Nei dettagli del modulo, fai clic sul riquadro della foto o su **Add Photo**, quindi scegli o carica un'immagine (verrà ritagliata in formato 16:9). Fai clic su **Save**. La foto compare sotto il nome del modulo, sopra la descrizione, nella pagina dell'URL pubblico del modulo e ovunque il modulo sia incorporato con l'elemento **Form** del sito web. Usa **Change Photo** per sostituirla o **Remove** per eliminarla.

Usa il campo **Thank You Message** per impostare il messaggio che le persone vedono dopo aver inviato il modulo, anche nella pagina dell'URL pubblico del modulo. Se lo lasci vuoto, vedranno "Thank you for submitting the form!"

:::tip
I moduli Stand Alone sono ideali per le iscrizioni agli eventi. Condividi l'URL pubblico via email, sui social media, oppure incorpora direttamente il modulo nel sito web della tua chiesa.
:::

:::info
Per incorporare un modulo nel tuo sito B1, vai all'editor del sito, aggiungi una nuova sezione e seleziona l'elemento **Form**. Quindi scegli il modulo che vuoi mostrare. Vedi [Gestire le pagine](../website/managing-pages.md) per i dettagli su come modificare il tuo sito web.
:::
