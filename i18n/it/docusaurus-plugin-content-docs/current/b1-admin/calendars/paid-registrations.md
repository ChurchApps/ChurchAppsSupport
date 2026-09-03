---
title: "Registrazioni Pagate"
---

# Registrazioni Pagate

<div class="article-intro">

La registrazione agli eventi può andare oltre un semplice conteggio dei partecipanti. Puoi definire tipi di partecipanti con prezzo (come Adulto e Bambino), offrire componenti aggiuntivi facoltativi con i loro prezzi e quantità, creare codici di sconto e raccogliere il pagamento alla registrazione attraverso il tuo fornitore di donazioni esistente. Quando un evento si riempie, una lista d'attesa facoltativa mantiene i membri interessati in coda e li promuove automaticamente man mano che si aprono i posti.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Abilita la registrazione sull'evento per primo — vedi [Creazione di Calendari](creating-calendars#enabling-event-registration)
- Per raccogliere i pagamenti, la tua chiesa ha bisogno di [donazioni online configurate](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Gli eventi gratuiti non richiedono alcuna configurazione di donazione.

</div>

## Apertura delle Impostazioni di Registrazione

1. In B1 Admin, vai alla pagina **Registrations** e apri il tuo evento (oppure apri l'evento dal suo calendario).
2. La scheda **Registration Settings** mostra le nozioni di base — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** e **Registration Questions**.
3. Sotto le nozioni di base ci sono tre sezioni: **Attendee Types**, **Selections** e **Discount Codes**.

## Tipi di Partecipanti

I tipi di partecipanti ti permettono di addebitare prezzi diversi per diversi tipi di partecipanti e di limitarne ogni uno separatamente.

1. Espandi la sezione **Attendee Types** e fai clic su **Add Type**.
2. Immetti un **Name** (ad esempio "Adult", "Child", "Student").
3. Imposta un **Price**. Usa 0 per un tipo gratuito.
4. Facoltativamente imposta una **Capacity** solo per questo tipo (ad esempio, solo 20 posti per Child). Lascialo vuoto per nessun limite per tipo.
5. Fai clic su **Save**.

Durante la registrazione, ogni partecipante sceglie un tipo; i tipi esauriti vengono visualizzati come **Sold out** e non possono essere selezionati. L'elenco mostra il tipo di ogni partecipante e i conteggi per tipo in esecuzione.

## Selezioni

Le selezioni sono componenti aggiuntivi facoltativi con prezzo — magliette, piani pasto, aggiornamenti attività.

1. Espandi la sezione **Selections** e fai clic su **Add Selection**.
2. Immetti un **Name**, una **Description** facoltativa e un **Price** (0 viene visualizzato come "Free").
3. Facoltativamente imposta una **Capacity** (totale disponibile in tutte le registrazioni) e un **Max Qty** (il massimo che una registrazione può ordinare).
4. Fai clic su **Save**.

I registrati scelgono le quantità durante l'iscrizione e i totali si contano rispetto alla capacità in modo che tu non vendi mai più di quanto disponibile.

## Codici di Sconto

1. Espandi la sezione **Discount Codes** e fai clic su **Add Discount Code**.
2. Immetti il **Code** che i registrati digiteranno.
3. Scegli il **Type** — **Percent** o **Amount** — e il suo **Value**.
4. Facoltativamente limita il codice con una **Start Date** / **End Date**, un **Min Members** (numero minimo di partecipanti alla registrazione) e **Max Uses**.
5. Fai clic su **Save**.

Ogni codice mostra un conteggio di **Uses** così puoi vedere quante volte è stato riscattato. I registrati ricevono feedback istantaneo quando applicano un codice — inclusi messaggi chiari quando un codice è scaduto, non è ancora iniziato o richiede più partecipanti.

## Lista d'Attesa

Attiva **Enable Waitlist** nella scheda Registration Settings. Quando l'evento raggiunge la capacità:

- I nuovi registrati ricevono un posto in lista d'attesa invece di essere respinti. Completano la stessa iscrizione (il pagamento viene saltato mentre sono in lista d'attesa).
- Quando qualcuno si cancella, la registrazione più vecchia in lista d'attesa viene **promossa automaticamente** e riceve un'email che un posto si è aperto. Se devono un saldo, l'email li collega per completare il pagamento.
- Puoi promuovere qualcuno manualmente in qualsiasi momento con l'azione **Promote** su una riga in lista d'attesa — utile dopo aver aumentato la capacità dell'evento.

:::info
Le registrazioni promosse rimangono *pending* fino a quando qualsiasi saldo non viene pagato; pagare (o non avere nulla da pagare) le conferma.
:::

## Elenco di Registrazione

Apri un evento dalla pagina Registrations per vedere ogni registrazione. La tabella mostra **Name**, **Members**, **Type** (tipo di ogni partecipante), **Paid / Total** (con avviso di saldo quando denaro è ancora dovuto), **Status** e **Date**, più chip di conteggio per tipo sopra la tabella.

- Fai clic sull'icona dei dettagli di una riga per aprire la finestra di dialogo **Registration Details** — membri, selezioni, pagato/saldo e una tabella **Payments** che elenca ogni addebito (importo, metodo, data).
- **Export CSV** scarica l'elenco completo con colonne per membri, tipi di partecipanti, selezioni, pagato/totale/saldo, stato e una colonna per ogni domanda di registrazione.
- **Add Attendee** ti permette ancora di registrare iscritti offline manualmente.

:::info
I rimborsi non vengono elaborati all'interno di B1. Se hai bisogno di rimborsare una registrazione pagata annullata, emetti il rimborso dal dashboard del tuo fornitore di donazioni (ad esempio Stripe).
:::

## Come Funziona il Pagamento

I pagamenti vengono eseguiti attraverso lo stesso gateway di donazioni che la tua chiesa utilizza già per le donazioni — i dettagli della carta vanno direttamente al provider e non toccano mai i server di B1. I prezzi vengono sempre calcolati sul server dalle tue tipologie configurate, selezioni e codici di sconto, quindi un registrato non può manomettere il totale. I membri registrati possono pagare con una carta salvata; i guest inseriscono una carta al checkout.

## Articoli Correlati

- [Creazione di Calendari](creating-calendars#enabling-event-registration) — abilita la registrazione e le impostazioni di base
- [Configurazione Donazioni Online](../donations/online-giving-setup.md) — configura il gateway di pagamento utilizzato al checkout
- [Registrazione agli Eventi](../../b1-church/events/registering) — cosa vedono i membri quando si iscrivono
- [Le Mie Registrazioni](../../b1-church/events/my-registrations) — come i membri pagano i saldi e modificano le registrazioni
