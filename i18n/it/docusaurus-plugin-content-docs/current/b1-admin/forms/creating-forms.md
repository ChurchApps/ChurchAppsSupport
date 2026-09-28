---
title: "Creazione di Moduli"
---

# Creazione di Moduli

<div class="article-intro">

Crea moduli personalizzati per raccogliere informazioni dalla tua congregazione. Puoi creare moduli per registrazioni agli eventi, sondaggi, schede di visitatori, applicazioni di iscrizione e altro. I moduli possono essere collegati a persone nel tuo database o utilizzati come pagine autonome con il loro proprio URL pubblico.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per i moduli **Persone** (collegati ai record delle persone), hai bisogno prima di [persone nel tuo database](../people/adding-people.md).
- Per i moduli che raccolgono **pagamenti**, devi avere [Stripe configurato per le donazioni online](../donations/online-giving-setup.md).

</div>

## Creazione di un nuovo modulo

1. Apri **Persone** dal menu della sezione, quindi fai clic su **Moduli** nella barra di navigazione.
2. Fai clic su **Aggiungi Modulo**.
3. Inserisci un **nome** per il tuo modulo.
4. Scegli il tipo di modulo dal menu a discesa:
   - **Persone** — Associa gli invii ai [record delle persone](../people/adding-people.md) nel tuo database.
   - **Autonomo** — Crea un modulo indipendente con il suo proprio URL pubblico, ideale per registrazioni esterne.
5. Fai clic su **Salva** per creare il modulo.

Il tuo nuovo modulo apparirà nell'elenco. Fai clic su di esso per iniziare ad aggiungere domande.

## Stampa di un modulo vuoto

Hai bisogno di una copia cartacea da distribuire -- per una scheda di visitatore al banco di accoglienza, o un modulo che qualcuno senza accesso a internet può compilare a mano? Fai clic sull'**icona di stampa** accanto a un modulo nell'elenco principale di Moduli per aprire un'anteprima, quindi fai clic su **Stampa**. I campi vuoti vengono stampati con una sottolineatura o una casella di controllo per ogni domanda in modo che le persone possono compilarli a mano; le domande obbligatorie sono contrassegnate con un asterisco. Non ci sono altre opzioni di stampa -- stampa il modulo intero o niente.

## Aggiunta di domande

1. Apri il tuo modulo e vai alla scheda **Domande**.
2. Fai clic su **Aggiungi Domanda**.
3. Seleziona un **tipo di campo** dal menu a discesa del Provider. I tipi disponibili includono:
   - **Casella di testo** — Per brevi risposte di testo
   - **Data** — Per le selezioni di data
   - **Email** — Per gli indirizzi email
   - **Numero di telefono** — Per l'input del telefono
   - **Scelta multipla** — Per la selezione da opzioni predefinite
   - **Pagamento** — Per la raccolta di pagamenti
4. Immetti un **Titolo** e una **Descrizione** opzionale per la domanda.
5. Seleziona **Richiedi una risposta** se il campo è obbligatorio.
6. Fai clic su **Salva**.
7. Ripeti per aggiungere altre domande.

:::warning
Il tipo di campo **Pagamento** richiede che Stripe sia configurato. Se non hai ancora configurato le donazioni online, consulta [Configurazione Donazioni Online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Gestione dei membri del modulo

1. Apri il tuo modulo e vai alla scheda **Membri**.
2. Cerca una persona e aggiungila con un ruolo:
   - **Admin** — Può modificare il modulo e visualizzare tutti gli invii.
   - **Solo visualizzazione** — Può visualizzare gli invii ma non può modificare il modulo.

## Aggiunta automatica dei mittenti a un gruppo

Quando **Crea un record di persona dagli invii** è abilitato, puoi anche collegare il modulo a un gruppo in modo che ogni mittente venga aggiunto automaticamente al roster del gruppo:

1. Apri i **Dettagli** del tuo modulo e attiva **Crea un record di persona dagli invii**.
2. Sotto **Aggiungi mittenti a un gruppo**, seleziona il gruppo al quale aggiungere i mittenti, o lascialo impostato su **Nessuno**.
3. Fai clic su **Salva**.

Ogni volta che qualcuno invia il modulo, la persona corrispondente o appena creata viene aggiunta al gruppo (i membri del gruppo esistente vengono saltati). Questo è utile per cose come un modulo di iscrizione al campo che dovrebbe costruire automaticamente il roster del gruppo del campo.

### Invio di un'email di follow-up

Con **Crea un record di persona dagli invii** attivato, puoi anche inviare un'email a ogni persona che invia il modulo. Compila **Oggetto Email Follow-up** e **Corpo Email Follow-up** nei dettagli del modulo. Puoi usare i token `{firstName}` e `{churchName}` in entrambi. L'email viene inviata solo quando entrambi i campi sono compilati.

:::info
Le email di follow-up vengono inviate solo dopo che la tua chiesa è stata approvata per l'invio di email di gruppo, e contano verso il limite di email giornaliero della tua chiesa. Consulta [Attivazione Email di Gruppo per la Tua Chiesa](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicazione di un modulo

Per riutilizzare un modulo come punto di partenza per uno nuovo, fai clic sull'**icona Duplica** (icona di copia) accanto al modulo nell'elenco di Moduli. B1 crea una copia esatta del modulo — incluse tutte le domande — che puoi quindi rinominare e modificare indipendentemente.

:::tip
La duplicazione è utile per eventi ricorrenti in cui le domande di registrazione rimangono le stesse di anno in anno. Duplica il modulo dell'anno scorso, aggiorna il nome e le date, e sei pronto.
:::

## Configurazione delle proprietà del modulo

Puoi aggiornare il nome e le impostazioni del tuo modulo in qualsiasi momento. Per i moduli Autonomi, vedrai anche un **URL pubblico** univoco che puoi condividere con chiunque, insieme a un campo **Descrizione** -- testo mostrato sopra le domande nella pagina del modulo pubblico, utile per dire alle persone a cosa serve il modulo prima di iniziare a compilarlo.

:::tip
I moduli Autonomi sono ottimi per le registrazioni agli eventi. Condividi l'URL pubblico via email, social media o incorpora il modulo direttamente sul tuo sito web della chiesa.
:::

:::info
Per incorporare un modulo sul tuo sito web B1, vai all'editor del tuo sito web, aggiungi una nuova sezione e seleziona l'elemento **Modulo**. Quindi scegli il modulo che vuoi visualizzare. Consulta [Gestione Pagine](../website/managing-pages.md) per i dettagli sulla modifica del tuo sito web.
:::
