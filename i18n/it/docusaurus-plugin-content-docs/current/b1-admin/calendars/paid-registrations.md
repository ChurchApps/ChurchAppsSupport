---
title: "Registrazioni a Pagamento"
---

# Registrazioni a Pagamento

<div class="article-intro">

La registrazione agli eventi può andare oltre un semplice conteggio dei partecipanti. Puoi definire tipi di partecipante con prezzo (come Adulto e Bambino), offrire componenti aggiuntivi opzionali con prezzi e quantità propri, creare codici sconto e raccogliere pagamenti al momento della registrazione tramite il provider di raccolta fondi già in uso dalla tua chiesa. Quando un evento raggiunge la capienza massima, una lista d'attesa opzionale mantiene in coda i membri interessati e li promuove automaticamente man mano che si liberano posti.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Abilita prima la registrazione sull'evento -- vedi [Creare Calendari](creating-calendars#enabling-event-registration)
- Per raccogliere pagamenti, la tua chiesa deve avere [le donazioni online configurate](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Gli eventi gratuiti non richiedono alcuna configurazione delle donazioni.

</div>

## Apertura delle Impostazioni di Registrazione

1. In B1 Admin, vai alla pagina **Registrations** e apri il tuo evento (oppure apri l'evento dal suo calendario).
2. Il riquadro **Registration Settings** mostra le informazioni di base -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** e **Registration Questions**.
3. Sotto le informazioni di base ci sono tre sezioni a fisarmonica: **Attendee Types**, **Selections** e **Discount Codes**.

## Tipi di Partecipante

I tipi di partecipante ti permettono di applicare prezzi diversi a diversi tipi di partecipanti -- e di limitarne ciascuno separatamente.

1. Espandi la sezione **Attendee Types** e clicca su **Add Type**.
2. Inserisci un **Name** (ad es. "Adult", "Child", "Student").
3. Imposta un **Price**. Usa 0 per un tipo gratuito.
4. Facoltativamente imposta una **Capacity** solo per questo tipo (ad es. solo 20 posti per Child). Lascia vuoto per nessun limite specifico per tipo.
5. Clicca su **Save**.

Durante la registrazione, ogni partecipante sceglie un tipo; i tipi esauriti vengono mostrati come **Sold out** e non possono essere selezionati. L'elenco mostra il tipo di ciascun partecipante e i conteggi correnti per tipo.

## Selezioni

Le selezioni sono componenti aggiuntivi opzionali a pagamento -- magliette, piani pasto, upgrade per attività.

1. Espandi la sezione **Selections** e clicca su **Add Selection**.
2. Inserisci un **Name**, una **Description** facoltativa e un **Price** (0 viene mostrato come "Free").
3. Facoltativamente imposta una **Capacity** (totale disponibile su tutte le registrazioni) e una **Max Qty** (il massimo che una singola registrazione può ordinare).
4. Clicca su **Save**.

I partecipanti scelgono le quantità durante l'iscrizione, e i totali vengono conteggiati rispetto alla capienza, così non si rischia mai di vendere più del disponibile.

## Codici Sconto

1. Espandi la sezione **Discount Codes** e clicca su **Add Discount Code**.
2. Inserisci il **Code** che i partecipanti digiteranno.
3. Scegli il **Type** -- **Percent** o **Amount** -- e il relativo **Value**.
4. Facoltativamente limita il codice con una **Start Date** / **End Date**, un **Min Members** (numero minimo di partecipanti sulla registrazione) e **Max Uses**.
5. Clicca su **Save**.

Ogni codice mostra un conteggio **Uses** così puoi vedere quante volte è stato utilizzato. I partecipanti ricevono un riscontro immediato quando applicano un codice -- inclusi messaggi chiari quando un codice è scaduto, non è ancora iniziato o richiede più partecipanti.

## Lista d'Attesa

Attiva **Enable Waitlist** nel riquadro Registration Settings. Quando l'evento raggiunge la capienza massima:

- Ai nuovi partecipanti viene offerto un posto in lista d'attesa invece di essere respinti. Completano la stessa iscrizione (il pagamento viene saltato mentre sono in lista d'attesa).
- Quando qualcuno annulla, la registrazione più vecchia in lista d'attesa viene **promossa automaticamente** e riceve un'email che informa che si è liberato un posto. Se ha un saldo da pagare, l'email include un link per completare il pagamento.
- Puoi promuovere qualcuno manualmente in qualsiasi momento con l'azione **Promote** su una riga in lista d'attesa -- utile dopo aver aumentato la capienza dell'evento.

:::info
Le registrazioni promosse rimangono *pending* finché non viene pagato l'eventuale saldo; il pagamento (o l'assenza di un saldo da pagare) le conferma.
:::

## L'Elenco delle Registrazioni

Apri un evento dalla pagina Registrations per vedere ogni registrazione. La tabella mostra **Name**, **Members**, **Type** (il tipo di ciascun partecipante), **Paid / Total** (con un avviso di saldo quando è ancora dovuto del denaro), **Status** e **Date**, oltre a chip di conteggio per tipo sopra la tabella.

- Clicca sull'icona dei dettagli di una riga per aprire la finestra di dialogo **Registration Details** -- membri, selezioni, pagato/saldo e una tabella **Payments** che elenca ogni addebito (importo, metodo, data).
- **Export CSV** scarica l'elenco completo con colonne per membri, tipi di partecipante, selezioni, pagato/totale/saldo, stato e una colonna per ogni domanda di registrazione.
- **Add Attendee** ti permette comunque di registrare manualmente iscrizioni offline.

:::info
I rimborsi non vengono elaborati all'interno di B1. Se devi rimborsare una registrazione a pagamento annullata, emetti il rimborso dalla dashboard del tuo provider di raccolta fondi (ad es. Stripe).
:::

## Come Funziona il Pagamento

I pagamenti passano attraverso lo stesso gateway di raccolta fondi già utilizzato dalla tua chiesa per le donazioni -- i dettagli della carta vanno direttamente al provider e non toccano mai i server di B1. I prezzi vengono sempre calcolati sul server in base ai tipi, alle selezioni e ai codici sconto configurati, quindi un partecipante non può manomettere il totale. I membri con accesso effettuato possono pagare con una carta salvata; gli ospiti inseriscono una carta al momento del pagamento.

## Articoli Correlati

- [Creare Calendari](creating-calendars#enabling-event-registration) — abilitare la registrazione e le impostazioni di base
- [Configurazione delle Donazioni Online](../donations/online-giving-setup.md) — configurare il gateway di pagamento utilizzato al checkout
- [Registrarsi agli Eventi](../../b1-church/events/registering) — cosa vedono i membri quando si iscrivono
- [Le Mie Registrazioni](../../b1-church/events/my-registrations) — come i membri pagano i saldi e modificano le registrazioni
