---
title: "Creazione di moduli"
---

# Creazione di moduli

<div class="article-intro">

Crea moduli personalizzati per raccogliere informazioni dalla tua congregazione. Puoi creare moduli per registrazioni a eventi, sondaggi, schede visitatore, domande di adesione e altro ancora. I moduli possono essere collegati alle persone nel tuo database o utilizzati come pagine autonome con il proprio URL pubblico.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per i moduli **People** (collegati ai record delle persone), devi prima avere [persone nel tuo database](../people/adding-people.md).
- Per i moduli che raccolgono **pagamenti**, devi avere [Stripe configurato per le donazioni online](../donations/online-giving-setup.md).

</div>

## Creazione di un nuovo modulo

1. Vai a **Forms** dal menu principale.
2. Clicca su **Add Form**.
3. Inserisci un **nome** per il tuo modulo.
4. Scegli il tipo di modulo dal menu a discesa:
   - **People** — Associa gli invii ai [record delle persone](../people/adding-people.md) nel tuo database.
   - **Stand Alone** — Crea un modulo indipendente con il proprio URL pubblico, ideale per le registrazioni esterne.
5. Clicca su **Save** per creare il modulo.

Il tuo nuovo modulo apparirà nell'elenco. Cliccaci sopra per iniziare ad aggiungere domande.

## Aggiunta di domande

1. Apri il tuo modulo e vai alla scheda **Questions**.
2. Clicca su **Add Question**.
3. Seleziona un **tipo di campo** dal menu a discesa Provider. I tipi disponibili includono:
   - **Textbox** — Per risposte testuali brevi
   - **Date** — Per la selezione delle date
   - **Email** — Per gli indirizzi email
   - **Phone Number** — Per l'inserimento del numero di telefono
   - **Multiple Choice** — Per selezionare tra opzioni predefinite
   - **Payment** — Per raccogliere pagamenti
4. Inserisci un **Titolo** e una **Descrizione** opzionale per la domanda.
5. Seleziona **Require an answer** se il campo è obbligatorio.
6. Clicca su **Save**.
7. Ripeti per aggiungere altre domande.

:::warning
Il tipo di campo **Payment** richiede che Stripe sia configurato. Se non hai ancora configurato le donazioni online, vedi [Configurazione donazioni online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Gestione dei membri del modulo

1. Apri il tuo modulo e vai alla scheda **Members**.
2. Cerca una persona e aggiungila con un ruolo:
   - **Admin** — Può modificare il modulo e visualizzare tutti gli invii.
   - **View Only** — Può visualizzare gli invii ma non può modificare il modulo.

## Configurazione delle proprietà del modulo

Puoi aggiornare il nome e le impostazioni del tuo modulo in qualsiasi momento. Per i moduli Stand Alone, vedrai anche un **URL pubblico** univoco che puoi condividere con chiunque.

:::tip
I moduli Stand Alone sono ottimi per le registrazioni agli eventi. Condividi l'URL pubblico via email, sui social media o incorpora il modulo direttamente nel sito web della tua chiesa.
:::

:::info
Per incorporare un modulo nel tuo sito web B1, vai all'editor del sito web, aggiungi una nuova sezione e seleziona l'elemento **Form**. Poi scegli il modulo che vuoi visualizzare. Vedi [Gestione delle pagine](../website/managing-pages.md) per i dettagli sulla modifica del tuo sito web.
:::
