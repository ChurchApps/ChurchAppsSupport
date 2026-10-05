---
title: "Registrazioni a Pagamento"
---

# Registrazioni a Pagamento

<div class="article-intro">

La registrazione agli eventi può andare oltre un semplice conteggio. Puoi definire tipi di partecipanti con prezzo (come Adulto e Bambino), offrire componenti aggiuntivi facoltativi con i loro prezzi e quantità, creare codici di sconto e raccogliere il pagamento al momento della registrazione attraverso il provider di donazioni esistente della tua chiesa. Quando un evento si riempie, una lista d'attesa facoltativa mantiene i membri interessati in coda e li promuove automaticamente quando i posti si aprono.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Abilita prima la registrazione sull'evento — vedi [Creazione di Calendari](creating-calendars#enabling-event-registration)
- Per raccogliere pagamenti, la tua chiesa ha bisogno di [donazioni online configurate](../donations/online-giving-setup.md) (Stripe, PayPal, o Kingdom Funding). Gli eventi gratuiti non hanno bisogno di configurazione di donazioni.

</div>

## Apertura delle Impostazioni di Registrazione

1. In B1 Admin, apri il [Menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Calendari > Registrazioni**, e apri il tuo evento (o apri l'evento dal suo calendario).
2. La scheda **Impostazioni di Registrazione** mostra le basi — **Abilita Registrazione**, **Capacità**, **Registrazione Aperta/Chiude**, **Tag**, e **Domande di Registrazione**.
3. Sotto le basi ci sono tre pannelli: **Tipi di Partecipanti**, **Selezioni**, e **Codici di Sconto**.

## Tipi di Partecipanti

I tipi di partecipanti ti permettono di addebitare prezzi diversi per diversi tipi di partecipanti -- e limitare ciascuno separatamente.

1. Espandi il pannello **Tipi di Partecipanti** e fai clic su **Aggiungi Tipo**.
2. Inserisci un **Nome** (ad esempio, "Adulto", "Bambino", "Studente").
3. Imposta un **Prezzo**. Usa 0 per un tipo gratuito.
4. Facoltativamente imposta una **Capacità** solo per questo tipo (ad esempio, solo 20 posti per Bambini). Lascia vuoto per nessun limite per tipo.
5. Fai clic su **Salva**.

Durante la registrazione, ogni partecipante sceglie un tipo; i tipi esauriti sono mostrati come **Esaurito** e non possono essere selezionati. Il roster mostra il tipo di ogni partecipante e i conteggi in esecuzione per tipo.

## Selezioni

Le selezioni sono componenti aggiuntivi con prezzo facoltativo — magliette, piani pasti, aggiornamenti di attività.

1. Espandi il pannello **Selezioni** e fai clic su **Aggiungi Selezione**.
2. Inserisci un **Nome**, **Descrizione** facoltativa, e un **Prezzo** (0 viene mostrato come "Gratuito").
3. Facoltativamente imposta una **Capacità** (totale disponibile in tutte le registrazioni) e una **Max Qtà** (il massimo che una registrazione può ordinare).
4. Fai clic su **Salva**.

I registranti scelgono le quantità durante l'iscrizione, e i totali contano rispetto alla capacità così non vendi mai più di quanto disponibile.

## Codici di Sconto

1. Espandi il pannello **Codici di Sconto** e fai clic su **Aggiungi Codice di Sconto**.
2. Inserisci il **Codice** che i registranti digiteranno.
3. Scegli il **Tipo** — **Percentuale** o **Importo** — e il suo **Valore**.
4. Facoltativamente limita il codice con una **Data di Inizio** / **Data di Fine**, un **Minimo di Membri** (numero minimo di partecipanti sulla registrazione), e **Usi Massimi**.
5. Fai clic su **Salva**.

Ogni codice mostra un conteggio **Usi** così puoi vedere quante volte è stato riscattato. I registranti ricevono feedback istantaneo quando applicano un codice -- inclusi messaggi chiari quando un codice è scaduto, non è ancora iniziato, o ha bisogno di più partecipanti.

## Lista d'Attesa

Attiva **Abilita Lista d'Attesa** nella scheda Impostazioni di Registrazione. Quando l'evento raggiunge la capacità:

- I nuovi registranti vengono offerti un posto in lista d'attesa invece di essere rifiutati. Completano la stessa iscrizione (il pagamento viene saltato mentre in lista d'attesa).
- Quando qualcuno si cancella, la registrazione in lista d'attesa più vecchia viene **promossa automaticamente** e riceve un'email che un posto si è aperto. Se devono un saldo, l'email li collega per completare il pagamento.
- Puoi promuovere qualcuno manualmente in qualsiasi momento con l'azione **Promuovi** su una riga in lista d'attesa -- utile dopo aver aumentato la capacità dell'evento.

:::info
Le registrazioni promosse rimangono *in sospeso* fino a quando qualsiasi saldo viene pagato; pagare (o non avere nulla da pagare) le conferma.
:::

## Il Roster di Registrazione

Apri un evento dalla pagina Registrazioni per vedere ogni registrazione. La tabella mostra **Nome**, **Membri**, **Tipo** (il tipo di ogni partecipante), **Pagato / Totale** (con un avvertimento di saldo quando denaro è ancora dovuto), **Stato**, e **Data**, più chip di conteggio per tipo sopra la tabella.

- Fai clic sull'icona dei dettagli di una riga per aprire la finestra di dialogo **Dettagli Registrazione** — membri, selezioni, pagato/saldo, e una tabella **Pagamenti** che elenca ogni addebito (importo, metodo, data).
- **Esporta CSV** scarica il roster completo con colonne per membri, tipi di partecipanti, selezioni, pagato/totale/saldo, stato, e una colonna per ogni domanda di registrazione.
- **Aggiungi Partecipante** ti permette ancora di registrare le iscrizioni offline manualmente.

:::info
I rimborsi non vengono elaborati all'interno di B1. Se hai bisogno di rimborsare una registrazione a pagamento cancellata, emetti il rimborso dalla dashboard del provider di donazioni della tua chiesa (ad es. Stripe).
:::

## Come Funziona il Pagamento

I pagamenti funzionano attraverso lo stesso gateway di donazioni che la tua chiesa utilizza già per le donazioni -- i dettagli della carta vanno direttamente al provider e non toccano mai i server di B1. I prezzi vengono sempre calcolati sul server dai tuoi tipi, selezioni e codici di sconto configurati, quindi un registrante non può alterare il totale. I membri connessi possono pagare con una carta salvata; gli ospiti inseriscono una carta al momento del pagamento.

## Articoli Correlati

- [Creazione di Calendari](creating-calendars#enabling-event-registration) — abilita la registrazione e le impostazioni di base
- [Configurazione Donazioni Online](../donations/online-giving-setup.md) — configura il gateway di pagamento utilizzato al momento del pagamento
- [Registrazione per Eventi](../../b1-church/events/registering) — cosa vedono i membri quando si iscrivono
- [Le Mie Registrazioni](../../b1-church/events/my-registrations) — come i membri pagano i saldi e modificano le registrazioni
