---
title: "Registrazioni a Pagamento"
---

# Registrazioni a Pagamento

<div class="article-intro">

La registrazione agli eventi può andare oltre un semplice conteggio. Puoi definire tipi di partecipanti con prezzo (come Adulto e Bambino), offrire componenti aggiuntivi opzionali con i loro propri prezzi e quantità, creare codici di sconto e raccogliere il pagamento al momento della registrazione attraverso il provider di donazioni esistente della tua chiesa. Quando un evento si riempie, una lista d'attesa opzionale mantiene i membri interessati in fila e li promuove automaticamente man mano che si liberano posti.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Abilita la registrazione sull'evento per primo — vedi [Creazione di Calendari](creating-calendars#enabling-event-registration)
- Per raccogliere i pagamenti, la tua chiesa ha bisogno di [donazioni online configurate](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Gli eventi gratuiti non richiedono alcuna configurazione di donazioni.

</div>

## Apertura delle Impostazioni di Registrazione

1. In B1 Admin, vai alla pagina **Registrazioni** e apri il tuo evento (oppure apri l'evento dal suo calendario).
2. Il riquadro **Impostazioni di Registrazione** mostra le nozioni di base — **Abilita Registrazione**, **Capacità**, **Registrazione Aperta/Chiusa**, **Tag** e **Domande di Registrazione**.
3. Sotto le nozioni di base ci sono tre menu a soffietto: **Tipi di Partecipanti**, **Selezioni** e **Codici di Sconto**.

## Tipi di Partecipanti

I tipi di partecipanti ti permettono di addebitare prezzi diversi per diversi tipi di partecipanti — e di limitarne la capacità separatamente.

1. Espandi il menu a soffietto **Tipi di Partecipanti** e fai clic su **Aggiungi Tipo**.
2. Inserisci un **Nome** (ad es. "Adulto", "Bambino", "Studente").
3. Imposta un **Prezzo**. Usa 0 per un tipo gratuito.
4. Facoltativamente imposta una **Capacità** per solo questo tipo (ad es. solo 20 posti per Bambino). Lascia vuoto per nessun limite per tipo.
5. Fai clic su **Salva**.

Durante la registrazione, ogni partecipante sceglie un tipo; i tipi esauriti vengono mostrati come **Esaurito** e non possono essere selezionati. Il roster mostra il tipo di ogni partecipante e i conteggi in esecuzione per tipo.

## Selezioni

Le selezioni sono componenti aggiuntivi a prezzo opzionale — magliette, piani pasto, aggiornamenti di attività.

1. Espandi il menu a soffietto **Selezioni** e fai clic su **Aggiungi Selezione**.
2. Inserisci un **Nome**, una **Descrizione** opzionale e un **Prezzo** (0 viene mostrato come "Gratuito").
3. Facoltativamente imposta una **Capacità** (totale disponibile su tutte le registrazioni) e una **Quantità Massima** (la massima che una registrazione può ordinare).
4. Fai clic su **Salva**.

I registranti scelgono le quantità durante l'iscrizione, e i totali contano sulla capacità in modo che tu non venda mai più di quanto disponibile.

## Codici di Sconto

1. Espandi il menu a soffietto **Codici di Sconto** e fai clic su **Aggiungi Codice di Sconto**.
2. Inserisci il **Codice** che i registranti digiteranno.
3. Scegli il **Tipo** — **Percentuale** o **Importo** — e il suo **Valore**.
4. Facoltativamente limita il codice con una **Data di Inizio** / **Data di Fine**, un **Numero Minimo di Membri** (numero minimo di partecipanti nella registrazione) e **Usi Massimi**.
5. Fai clic su **Salva**.

Ogni codice mostra un conteggio **Usi** in modo che tu possa vedere quanto spesso è stato riscattato. I registranti ricevono un feedback istantaneo quando applicano un codice — inclusi messaggi chiari quando un codice è scaduto, non è ancora iniziato o ha bisogno di più partecipanti.

## Lista d'Attesa

Attiva **Abilita Lista d'Attesa** nel riquadro Impostazioni di Registrazione. Quando l'evento raggiunge la capacità:

- I nuovi registranti ricevono l'offerta di un posto in lista d'attesa invece di essere respinti. Completano la stessa iscrizione (il pagamento viene saltato mentre in lista d'attesa).
- Quando qualcuno annulla, la registrazione più vecchia in lista d'attesa viene **promossa automaticamente** e riceve un'email che si è liberato un posto. Se devono un saldo, l'email li collega per completare il pagamento.
- Puoi promuovere qualcuno manualmente in qualsiasi momento con l'azione **Promuovi** su una riga in lista d'attesa — utile dopo aver aumentato la capacità dell'evento.

:::info
Le registrazioni promosse rimangono *in sospeso* fino a quando qualsiasi saldo non è pagato; pagare (o non avere nulla da pagare) le conferma.
:::

## Il Roster di Registrazione

Apri un evento dalla pagina Registrazioni per vedere ogni registrazione. La tabella mostra **Nome**, **Membri**, **Tipo** (tipo di ogni partecipante), **Pagato / Totale** (con un avviso di saldo quando il denaro è ancora dovuto), **Stato** e **Data**, oltre a chip di conteggio per tipo sopra la tabella.

- Fai clic sull'icona dei dettagli di una riga per aprire il dialogo **Dettagli di Registrazione** — membri, selezioni, pagato/saldo e una tabella **Pagamenti** che elenca ogni addebito (importo, metodo, data).
- **Esporta CSV** scarica il roster completo con colonne per i membri, i tipi di partecipanti, le selezioni, pagato/totale/saldo, stato e una colonna per ogni domanda di registrazione.
- **Aggiungi Partecipante** ti permette di registrare le iscrizioni offline manualmente.

:::info
I rimborsi non vengono elaborati dentro B1. Se hai bisogno di rimborsare una registrazione pagata annullata, emetti il rimborso dal pannello del tuo provider di donazioni (ad es. Stripe).
:::

## Come Funziona il Pagamento

I pagamenti passano attraverso lo stesso gateway di donazioni che la tua chiesa usa già per le donazioni — i dettagli della carta vanno direttamente al provider e non toccano mai i server di B1. I prezzi vengono sempre calcolati sul server dalle tue selezioni, tipi e codici di sconto configurati, quindi un registrante non può manomettere il totale. I membri connessi possono pagare con una carta salvata; gli ospiti inseriscono una carta al checkout.

## Articoli Correlati

- [Creazione di Calendari](creating-calendars#enabling-event-registration) — abilita la registrazione e le impostazioni di base
- [Impostazione di Donazioni Online](../donations/online-giving-setup.md) — configura il gateway di pagamento usato al checkout
- [Registrazione agli Eventi](../../b1-church/events/registering) — cosa vedono i membri quando si iscrivono
- [Le Mie Registrazioni](../../b1-church/events/my-registrations) — come i membri pagano i saldi e modificano le registrazioni
