---
title: "Creare moduli"
description: "Crea moduli personalizzati in B1 Admin per iscrizioni agli eventi, sondaggi e schede visitatori, poi condividili tramite link, codice QR o stampa."
---

# Creare moduli

<div class="article-intro">

Crea moduli personalizzati per raccogliere informazioni dalla tua comunità. Puoi creare moduli per iscrizioni agli eventi, sondaggi, schede visitatori, domande di adesione e altro ancora. I moduli possono essere collegati alle persone presenti nel tuo database oppure usati come pagine autonome con un proprio URL pubblico.

</div>

## Video di formazione {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Creare moduli e gestire le risposte in B1" next="Lanciare il sito web della tua chiesa in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per i moduli **Persone** (collegati alle schede persona), ti servono prima [persone nel tuo database](../people/adding-people.md).
- Per i moduli che raccolgono **pagamenti**, devi avere [Stripe configurato per le donazioni online](../donations/online-giving-setup.md).

</div>

## Creare un nuovo modulo {#creating-a-new-form}

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Persone** e fai clic su **Moduli**.
2. Fai clic su **Aggiungi modulo**.
3. Inserisci un **nome** per il modulo.
4. Scegli il tipo di modulo dal menu a tendina **Associato a**:
   - **Persone** — Associa le risposte alle [schede persona](../people/adding-people.md) del tuo database. I moduli Persone si compilano dalla scheda di una persona, quindi non hanno un link condivisibile.
   - **Autonomo** — Crea un modulo indipendente con un proprio URL pubblico, ideale per iscrizioni esterne. Solo i moduli Autonomi offrono una [foto di intestazione](#adding-a-header-photo), un [codice QR](#sharing-a-form-with-a-qr-code), un [gruppo collegato](#linking-a-form-to-a-group) e **Crea una scheda persona dalle risposte**.
5. Per un modulo Autonomo, puoi compilare subito il resto delle sue [proprietà](#configuring-form-properties) oppure in seguito.
6. Fai clic su **Salva** per creare il modulo.

Il nuovo modulo comparirà nell'elenco. Fai clic su di esso per iniziare ad aggiungere domande.

## Stampare un modulo vuoto {#printing-a-blank-form}

Ti serve una copia cartacea da distribuire -- per una scheda visitatori alla postazione di accoglienza, oppure un modulo che qualcuno senza accesso a internet può compilare a mano? Fai clic su **Stampa** accanto a un modulo nell'elenco principale dei Moduli per aprire un'anteprima, poi fai clic su **Stampa**. I campi vuoti vengono stampati con una linea o una casella per ogni domanda, così le persone possono compilarli a mano; le domande obbligatorie sono contrassegnate con un asterisco. In alto alla pagina compaiono il logo della tua chiesa (il **Logo per sfondo chiaro** da [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, poi il nome del modulo. Non ci sono altre opzioni di stampa: stampi l'intero modulo oppure niente.

## Condividere un modulo con un codice QR {#sharing-a-form-with-a-qr-code}

I moduli Autonomi hanno un link **Codice QR** accanto a sé nell'elenco principale dei Moduli (i moduli archiviati no). Fai clic su di esso per aprire un codice QR per l'URL pubblico del modulo, con il link mostrato sotto. Fai clic su **Scarica PNG** per salvare il codice come immagine da stampare sui bollettini o mostrare sulle diapositive. Chiunque lo scansioni apre il modulo sul proprio telefono.

## Aggiungere domande {#adding-questions}

1. Apri il tuo modulo e vai alla scheda **Domande**.
2. Fai clic su **Aggiungi domanda**.
3. Seleziona un **Tipo di campo**:
   - **Campo di testo** — Per risposte brevi
   - **Numero intero** e **Decimale** — Per i numeri
   - **Data** — Per selezioni di date
   - **Sì/No** — Per una risposta sì o no
   - **Email** — Per indirizzi email
   - **Numero di telefono** — Per l'inserimento di un telefono
   - **Area di testo** — Per risposte più lunghe
   - **Scelta multipla** — Per scegliere una tra diverse opzioni
   - **Casella di controllo** — Per selezionare un numero qualsiasi di opzioni
   - **Pagamento** — Per riscuotere pagamenti
4. Inserisci un **Titolo** e una **Descrizione** facoltativa per la domanda. La descrizione appare sotto la domanda quando le persone compilano il modulo, quindi usala per suggerimenti come "Indica eventuali allergie che dovremmo conoscere."
5. Compila i campi extra per il tipo scelto:
   - Per le domande di testo, numero, data, email e telefono, un **Segnaposto** facoltativo mostra un testo di esempio dentro la casella vuota.
   - Per **Scelta multipla** e **Casella di controllo**, aggiungi ogni opzione in **Scelte**: inserisci un **Valore** (ciò che viene salvato) e un **Testo** (ciò che vedono le persone), poi fai clic sul pulsante di aggiunta. Fai clic sull'icona di rimozione per eliminare un'opzione.
   - Per il **Pagamento**, scegli il **Fondo** a cui va il denaro e l'**Importo**.
6. Seleziona **Richiedi una risposta per questa domanda** se il campo è obbligatorio. (Le domande di pagamento non hanno questa opzione.)
7. Fai clic su **Salva**.
8. Ripeti per aggiungere altre domande.

La scheda **Domande** elenca ogni domanda con il suo tipo e se è obbligatoria. Fai clic sul titolo di una domanda per modificarla, oppure fai clic su **Elimina** nel modulo della domanda e conferma per rimuoverla. Usa le frecce **Sposta su** e **Sposta giù** su una riga per cambiare l'ordine in cui compaiono le domande.

:::warning
Il tipo di campo **Pagamento** richiede che Stripe sia configurato. Se non hai ancora attivato le donazioni online, consulta [Configurazione delle donazioni online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento. Chi paga un modulo senza aver effettuato l'accesso deve spuntare la casella **Non sono un robot** prima che la carta venga accettata.
:::

## Gestire i membri del modulo {#managing-form-members}

I moduli Autonomi hanno una scheda **Membri del modulo** per dare accesso solo a quel modulo.

1. Apri il tuo modulo e vai alla scheda **Membri del modulo**.
2. In **Aggiungi persona**, cerca una persona e fai clic sull'icona di aggiunta accanto al suo nome. I nuovi membri partono come **Solo visualizzazione**.
3. Nella colonna **Permesso**, fai clic sul ruolo che desideri:
   - **Amministratore** — Può modificare il modulo e vedere tutte le risposte.
   - **Solo visualizzazione** — Può vedere le risposte ma non può modificare il modulo.
4. Attiva **Notifica email** per chiunque debba ricevere un'email ogni volta che il modulo viene inviato.

Per rimuovere qualcuno dal modulo, fai clic su **Rimuovi** nella sua riga e conferma.

## Collegare un modulo a un gruppo {#linking-a-form-to-a-group}

Puoi collegare qualsiasi modulo Autonomo a un gruppo -- ad esempio un modulo per le richieste di preghiera per un piccolo gruppo, oppure una liberatoria medica per un viaggio dei giovani:

1. Apri il modulo e fai clic su **Modifica modulo** (oppure fai clic su **Modifica** accanto al modulo nell'elenco dei Moduli).
2. In **Gruppo collegato**, seleziona il gruppo, oppure lascia **Nessuno**.
3. Fai clic su **Salva**.

Una volta collegato un modulo:

- **I membri del gruppo** vedono il modulo in una sezione **Moduli** nella pagina del gruppo su B1.church finché il modulo è aperto, con un pulsante **Compila** che lo apre (vedi [Dettagli del gruppo](../../b1-church/groups/group-details.md#linked-forms)).
- **I leader del gruppo** vedono anche i moduli chiusi, e possono leggere le risposte di ogni invio e stamparle (una singola risposta oppure **Stampa tutte**). I leader possono solo visualizzare le risposte -- non possono modificare il modulo, a meno che non siano anche [membri del modulo](#managing-form-members).
- **In B1 Admin**, la pagina del gruppo mostra una sezione **Moduli collegati** che elenca ogni modulo collegato come **Aperto** o **Chiuso**. Compare per i leader del gruppo e per chi può amministrare i moduli. Vedi [Membri del gruppo](../groups/group-members.md#linked-forms).

Un modulo è chiuso quando è al di fuori del suo periodo di disponibilità. I moduli archiviati non vengono mostrati nella pagina del gruppo.

### Aggiungere automaticamente chi invia il modulo a un gruppo {#automatically-adding-submitters-to-a-group}

Collegare un modulo a un gruppo non aggiunge da solo nessuno al gruppo. Per aggiungere ogni persona che invia il modulo all'elenco del gruppo collegato, seleziona anche **Crea una scheda persona dalle risposte** nelle impostazioni del modulo e fai clic su **Salva**.

Ogni volta che qualcuno invia il modulo, la persona abbinata o appena creata viene aggiunta al gruppo (i membri già presenti vengono saltati). È utile per casi come un modulo di iscrizione a un campo estivo che deve costruire automaticamente il gruppo-elenco del campo.

### Inviare un'email di follow-up {#sending-a-follow-up-email}

Con **Crea una scheda persona dalle risposte** selezionato, puoi anche inviare un'email a ogni persona che invia il modulo. Compila **Oggetto email di follow-up** e **Testo email di follow-up** nelle impostazioni del modulo. In entrambi puoi usare i segnaposto `{firstName}` e `{churchName}`. L'email viene inviata solo quando entrambi i campi sono compilati.

:::info
Le email di follow-up vengono inviate solo dopo che la tua chiesa è stata approvata per inviare email di gruppo, e contano nel limite giornaliero di email della chiesa. Vedi [Attivare l'email di gruppo per la tua chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicare un modulo {#duplicating-a-form}

Per riutilizzare un modulo come punto di partenza per uno nuovo, fai clic su **Duplica** accanto al modulo nell'elenco dei Moduli e conferma. Compare il messaggio **Modulo duplicato** e B1 crea una copia esatta del modulo -- incluse tutte le domande -- che puoi poi rinominare e modificare in modo indipendente.

:::tip
La duplicazione è utile per eventi ricorrenti in cui le domande di iscrizione restano le stesse di anno in anno. Duplica il modulo dell'anno scorso, aggiorna nome e date, e sei pronto.
:::

## Configurare le proprietà del modulo {#configuring-form-properties}

Puoi aggiornare nome e impostazioni del modulo in qualsiasi momento: apri il modulo e fai clic su **Modifica modulo** sul lato sinistro della pagina, oppure fai clic su **Modifica** accanto al modulo nell'elenco dei Moduli. Il lato sinistro della pagina del modulo mostra il tipo di modulo (**Persone** oppure **Autonomo**) e, per i moduli Autonomi, se è **Pubblico** oppure **Riservato** e il suo **URL pubblico** univoco che puoi condividere con chiunque.

Le impostazioni **Modifica modulo** sono:

- **Nome del modulo** -- Il nome mostrato in B1 Admin e in cima al modulo.
- **Descrizione** *(Autonomo)* -- Testo mostrato sopra le domande nella pagina pubblica del modulo, utile per spiegare a cosa serve il modulo prima che le persone inizino a compilarlo.
- **Foto di intestazione** *(Autonomo)* -- Vedi [Aggiungere una foto di intestazione](#adding-a-header-photo).
- **Accesso al modulo** *(Autonomo)* -- **Pubblico** permette a chiunque abbia il link di compilare il modulo; **Riservato** richiede che le persone accedano al sito della tua chiesa prima di poterlo aprire.
- **Imposta periodo di disponibilità del modulo** *(Autonomo)* -- Scegli **Sì** e imposta una **Data di inizio disponibilità** e una **Data di fine disponibilità** per accettare invii solo tra queste date. Al di fuori di esse, il modulo è chiuso.
- **Messaggio di ringraziamento** -- Ciò che le persone vedono dopo l'invio (vedi sotto).
- **Modalità di visualizzazione** -- **Standard** mostra tutte le domande in un'unica pagina; **Conversazionale (una domanda alla volta)** le presenta una per volta.
- **Crea una scheda persona dalle risposte** *(Autonomo)*, **Gruppo collegato** e i campi dell'email di follow-up -- Vedi [Collegare un modulo a un gruppo](#linking-a-form-to-a-group) e [Inviare un'email di follow-up](#sending-a-follow-up-email).

Fai clic su **Salva** per mantenere le modifiche. Per rimuovere definitivamente un modulo, fai clic su **Elimina** nelle impostazioni del modulo e conferma; per conservarlo ma nasconderlo dall'elenco, invece, [archivialo](./index.md#what-you-can-do).

### Aggiungere una foto di intestazione {#adding-a-header-photo}

I moduli Autonomi possono mostrare una **Foto di intestazione** in cima al modulo. Nei dettagli del modulo, fai clic sul riquadro della foto o su **Aggiungi foto**, poi scegli o carica un'immagine (viene ritagliata in formato 16:9). Fai clic su **Salva**. La foto compare sotto il nome del modulo, sopra la descrizione, nella pagina dell'URL pubblico del modulo e ovunque il modulo sia incorporato con l'elemento **Modulo** del sito web. Usa **Cambia foto** per sostituirla oppure **Rimuovi** per eliminarla.

Usa il campo **Messaggio di ringraziamento** per stabilire ciò che le persone vedono dopo l'invio del modulo, anche nella pagina con l'URL pubblico del modulo. Se lo lasci vuoto, vedranno "Grazie per aver inviato il modulo!"

:::tip
I moduli Autonomi sono ottimi per le iscrizioni agli eventi. Condividi l'URL pubblico via email, sui social, oppure incorpora il modulo direttamente nel sito web della tua chiesa.
:::

:::info
Per incorporare un modulo nel tuo sito B1, vai nell'editor del sito, aggiungi una nuova sezione e seleziona l'elemento **Modulo**. Poi scegli il modulo da mostrare. Vedi [Gestire le pagine](../website/managing-pages.md) per i dettagli su come modificare il tuo sito web.
:::
